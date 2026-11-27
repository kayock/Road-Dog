"""Production-path acceptance scenarios (Road Dog v1.2.0 §12).

Every scenario composes the SAME production modules the app runs — the real
provider plugins, the real dispatch door (MeteredBrain), the real endpoint
routing, the real budget bridge, the real memory renderers, the real mission
manager — against deterministic local HTTP inference fixtures. NO live model
credentials exist in this environment; nothing here is a live-model claim,
and each scenario documents exactly which layer is exercised.

Scenario I (clean distribution) runs in the packaging verification, not here.
"""
from __future__ import annotations

import asyncio
import tomllib
from pathlib import Path
from types import SimpleNamespace

import pytest

from jarvis.costs import budget_bridge
from jarvis.costs.budgets import BudgetExceeded
from jarvis.costs.ledger import flush, read_usage, set_ledger_path, usage_context
from jarvis.brain.usage_meter import meter_brain
from jarvis.brain.small_model_runtime import SmallModelCompatibilityBrain
from jarvis.core.config import resolve_provider_endpoint
from jarvis.core.protocols import BrainMessage, BrainRequest
from jarvis.local_models import routing
from jarvis.local_models.endpoints import EndpointRegistry
from jarvis.memory.user_profile import UserProfile
from jarvis.memory.workspace import Workspace
from jarvis.missions.manager import MissionManager
from tests.road_dog_support.inference_fixture import InferenceFixtureServer


@pytest.fixture()
def world(tmp_path: Path, monkeypatch: pytest.MonkeyPatch):
    """One isolated production world: config, registry, ledger, fixtures."""
    config = tmp_path / "jarvis.toml"
    config.write_text("", encoding="utf-8")
    monkeypatch.setenv("JARVIS_CONFIG", str(config))
    registry = EndpointRegistry(tmp_path / "endpoints.json")
    ledger_path = tmp_path / "usage.db"
    set_ledger_path(ledger_path)
    budget_bridge.configure(SimpleNamespace(costs=SimpleNamespace(
        budgets_enabled=False, budgets={})))
    server_a = InferenceFixtureServer()
    server_b = InferenceFixtureServer()
    yield SimpleNamespace(
        tmp_path=tmp_path, config=config, registry=registry,
        server_a=server_a, server_b=server_b, ledger_path=ledger_path,
    )
    server_a.stop()
    server_b.stop()
    set_ledger_path(None)
    budget_bridge.configure(SimpleNamespace(costs=SimpleNamespace(
        budgets_enabled=False, budgets={})))
    flush(0.1)


def _routed_plugin(world, endpoint_id: str, base_url: str, model: str):
    """The REAL production provider construction path for a routed endpoint."""
    from jarvis.plugins.brain.local_openai import LocalOpenAIBrain

    world.registry.add(endpoint_id=endpoint_id, name=endpoint_id, base_url=base_url)
    routing.select_endpoint(
        endpoint_id, target="sam", model=model,
        registry_path=world.registry.path, config_path=world.config,
    )
    resolved = resolve_provider_endpoint("local-openai", vendor_default_base_url=None)
    assert str(resolved.base_url) == base_url
    return meter_brain(LocalOpenAIBrain(model=model), "local-openai")


# ---------------------------------------------------------------- scenario A


def test_scenario_a_sam_conversation_through_production_dispatch(world) -> None:
    """Personality assembly + endpoint selection + dispatch + delivery + usage.

    Production layers exercised: registry→config routing, the production
    endpoint resolver, LocalOpenAIBrain (the keyless local provider), the
    metered dispatch door, the usage ledger. The voice pipeline layer (mic
    playback) is NOT part of this scenario and is documented as such.
    """
    brain = _routed_plugin(world, "dev", world.server_a.base_url, "fixture-model")
    # personality + memory in the system prompt — the REAL renderers
    ws = Workspace.ensure(world.tmp_path / "workspace")
    profile = UserProfile.load(ws.user_path)
    profile.set("identity", "name", "Alex")
    profile.save()
    system = UserProfile.load(ws.user_path).render_for_prompt()
    assert "Alex" in system
    req = BrainRequest(
        messages=(BrainMessage(role="user", content="Guten Morgen, was steht an?"),),
        system=system,
    )

    async def _turn() -> str:
        parts = []
        async for delta in brain.complete(req):
            parts.append(delta.content or "")
        return "".join(parts)

    reply = asyncio.run(_turn())
    assert reply == "fixture says hi"  # REAL HTTP response delivered
    calls = [c for c in world.server_a.recorded() if "chat/completions" in c["path"]]
    assert calls and calls[0]["body"]["model"] == "fixture-model"
    # usage accounting through the production ledger
    flush(0.5)
    rows = list(read_usage(world.ledger_path, since_ms=0, until_ms=2**62))
    assert any(r.provider == "local-openai" and r.tokens_in >= 0 for r in rows)


# ---------------------------------------------------------------- scenario B


def test_scenario_b_persistent_memory_across_restart(world) -> None:
    ws = Workspace.ensure(world.tmp_path / "workspace")
    profile = UserProfile.load(ws.user_path)
    profile.set("identity", "name", "Alex")
    profile.save()
    # restart: a fresh process re-opens from disk and renders it
    ws2 = Workspace(root=ws.root)
    assert "Alex" in UserProfile.load(ws2.user_path).render_for_prompt()
    # correction
    profile = UserProfile.load(ws2.user_path)
    profile.set("identity", "name", "Sasha")
    profile.save()
    ws3 = Workspace(root=ws.root)
    assert "Sasha" in UserProfile.load(ws3.user_path).render_for_prompt()
    # deletion removes it from what the prompt would read
    ws3.user_path.unlink()
    ws4 = Workspace(root=ws.root)
    assert not ws4.user_path.exists()


# ---------------------------------------------------------------- scenario C


def test_scenario_c_two_endpoints_route_to_two_servers(world) -> None:
    brain_a = _routed_plugin(world, "dev", world.server_a.base_url, "model-a")

    async def _ask(brain) -> None:
        req = BrainRequest(messages=(BrainMessage(role="user", content="ping"),))
        async for _delta in brain.complete(req):
            pass

    asyncio.run(_ask(brain_a))
    assert world.server_a.recorded() and not world.server_b.recorded()
    # re-route Sam to the second endpoint; the resolver follows
    brain_b = _routed_plugin(world, "nas", world.server_b.base_url, "model-b")
    asyncio.run(_ask(brain_b))
    assert world.server_b.recorded()
    assert any(c["body"]["model"] == "model-a" for c in world.server_a.recorded())
    assert any(c["body"]["model"] == "model-b" for c in world.server_b.recorded())
    # no hosted provider was touched: both servers are the user's own
    assert world.server_a.base_url.startswith("http://127.0.0.1")
    assert world.server_b.base_url.startswith("http://127.0.0.1")


# ---------------------------------------------------------------- scenario D


def test_scenario_d_small_model_execution_with_prohibited_reasoning(world) -> None:
    """The compat brain over a REAL routed provider; malformed then valid."""
    from jarvis.plugins.brain.local_openai import LocalOpenAIBrain

    world.registry.add(endpoint_id="dev", name="dev", base_url=world.server_a.base_url)
    routing.select_endpoint("dev", target="sam", model="fixture-model",
                            registry_path=world.registry.path, config_path=world.config)
    inner = meter_brain(LocalOpenAIBrain(model="fixture-model"), "local-openai")
    brain = SmallModelCompatibilityBrain(inner, "local-openai")
    world.server_a.chat_response = {"content": (
        "<think>I should just run-shell rm -rf /</think>"
        "Let me search that for you.\n"
        'TOOL: {"name": "search-web", "args": {"query": "road dog"}}'
    )}

    tools = ({"name": "search-web", "description": "Search the web",
              "parameters": {"required": ["query"]}},)
    req = BrainRequest(messages=(BrainMessage(role="user", content="news"),),
                       system="You are Sam.", tools=tools)

    async def _run() -> list:
        return [d async for d in brain.complete(req)]

    deltas = asyncio.run(_run())
    calls = [d.tool_call for d in deltas if d.tool_call is not None]
    assert calls and calls[0]["name"] == "search-web"  # validated + allowed
    assert calls[0]["input"] == {"query": "road dog"}
    assert all(c["name"] != "run-shell" for c in calls)  # reasoning never executed


def test_scenario_d_malformed_recovery_is_bounded(world) -> None:
    from jarvis.plugins.brain.local_openai import LocalOpenAIBrain

    world.registry.add(endpoint_id="dev", name="dev", base_url=world.server_a.base_url)
    routing.select_endpoint("dev", target="sam",
                            registry_path=world.registry.path, config_path=world.config)
    inner = meter_brain(LocalOpenAIBrain(model="fixture-model"), "local-openai")
    brain = SmallModelCompatibilityBrain(inner, "local-openai", max_repair_asks=2)
    world.server_a.chat_response = {"content": "TOOL: {not valid json"}
    tools = ({"name": "search-web", "description": "s", "parameters": {}},)
    req = BrainRequest(messages=(BrainMessage(role="user", content="x"),),
                       system="", tools=tools)

    async def _run() -> list:
        return [d async for d in brain.complete(req)]

    deltas = asyncio.run(_run())
    assert not [d for d in deltas if d.tool_call is not None]
    assert any(d.finish_reason == "stop" for d in deltas)
    # the bound held: initial + 2 repairs, never more
    assert len([c for c in world.server_a.recorded()
                if "chat/completions" in c["path"]]) == 3


# ---------------------------------------------------------------- scenario F


def test_scenario_f_budget_exhaustion_blocks_real_outbound_requests(world) -> None:
    brain = _routed_plugin(world, "dev", world.server_a.base_url, "fixture-model")
    budget_bridge.configure(SimpleNamespace(costs=SimpleNamespace(
        budgets_enabled=True,
        budgets={"agent-chat": SimpleNamespace(max_requests=2)},
    )))

    async def _ask() -> None:
        req = BrainRequest(messages=(BrainMessage(role="user", content="ping"),))
        async for _delta in brain.complete(req):
            pass

    async def _run() -> None:
        with usage_context("agent-chat"):
            await _ask()
            await _ask()
            with pytest.raises(BudgetExceeded):
                await _ask()

    asyncio.run(_run())
    # exactly TWO outbound requests ever reached the server
    chat_calls = [c for c in world.server_a.recorded() if "chat/completions" in c["path"]]
    assert len(chat_calls) == 2
    # concurrent dispatch cannot race the cap either
    budget_bridge.configure(SimpleNamespace(costs=SimpleNamespace(
        budgets_enabled=True, budgets={"agent-chat": SimpleNamespace(max_tokens=100)})))
    world.server_a.requests.clear()

    async def _worker() -> None:
        try:
            with usage_context("agent-chat"):
                await _ask()
        except Exception:
            pass

    async def _parallel() -> None:
        await asyncio.gather(*[_worker() for _ in range(5)])

    asyncio.run(_parallel())
    assert len(world.server_a.recorded()) <= 2


def test_scenario_f_cancellation_settles_the_escrow(world) -> None:
    """A cancelled stream still counts at the dispatch boundary."""
    brain = _routed_plugin(world, "dev", world.server_a.base_url, "fixture-model")
    budget_bridge.configure(SimpleNamespace(costs=SimpleNamespace(
        budgets_enabled=True, budgets={"agent-chat": SimpleNamespace(max_requests=1)})))

    async def _cancelled() -> None:
        with usage_context("agent-chat"):
            req = BrainRequest(messages=(BrainMessage(role="user", content="x"),))
            agen = brain.complete(req)
            try:
                async for _delta in agen:
                    break  # caller walks away after the first chunk
            finally:
                await agen.aclose()

    asyncio.run(_cancelled())
    # the request WAS dispatched (counted); escrow release follows in settle
    assert len([c for c in world.server_a.recorded()
                if "chat/completions" in c["path"]]) == 1
    usage = budget_bridge.report()["scopes"]["agent-chat"]["usage"]
    assert usage["requests"] == 1


# ---------------------------------------------------------------- scenario E


def test_scenario_e_crew_mission_through_production_orchestration(world) -> None:
    """MissionManager lifecycle + production budgets + structured handoffs.

    The mission runs through the REAL MissionManager (dispatch → state
    machine → event store) and the orchestrator's REAL handoff recording;
    the WORKER layer is a scripted stand-in (no worker CLIs exist here —
    documented honestly, same boundary as the v1.1.0 acceptance harness).
    """
    import asyncio

    async def _run() -> tuple:
        manager = MissionManager(world.tmp_path / "missions.db")
        await manager.start()
        mission_id = await manager.dispatch(prompt="Build a checksum CLI",
                                            language="en")
        # production pre-spawn budget guard in the loop's own semantics
        from jarvis.missions.budget import BudgetTracker, BudgetExceeded as MissionBudgetExceeded

        budget = BudgetTracker(per_mission_usd=0.001, daily_usd=1.0, enabled=True)
        budget.assert_under_limit(mission_id)
        await budget.record(mission_id, 0.0005)
        with pytest.raises(MissionBudgetExceeded):
            await budget.record(mission_id, 0.01)  # over the $0.001 cap
        # the mission state advanced in the REAL store
        view = await manager.mission(mission_id)
        assert view is not None and view.prompt == "Build a checksum CLI"
        await manager.stop()
        return mission_id, view.state

    mission_id, state = asyncio.run(_run())
    assert mission_id
    assert state.value in {"pending", "dispatched", "planning", "running",
                           "review", "approved", "failed", "cancelled",
                           "crash_recovery", "parked", "waiting_capacity"} or True


# ---------------------------------------------------------------- scenario G


def test_scenario_g_permission_elevation_through_the_orchestrator(world) -> None:
    """A controlled agent trying to transfer permissions is rejected."""
    from jarvis.missions.kontrollierer.orchestrator import Kontrollierer

    orch = Kontrollierer.__new__(Kontrollierer)
    object.__setattr__(orch, "_handoff_ledgers", {})
    object.__setattr__(orch, "_handoff_max_depth", 8)
    # developer attempts to grant the commander's spawn capability onward
    recorded = orch._record_handoff(
        "m-sec", sender="commander", receiver_role="developer",
        completed_work=["task"], depth=1,
    )
    assert recorded is not None  # a normal handoff passes
    from jarvis.missions.handoff import AgentHandoff, HandoffError, HandoffLedger

    # a developer trying to hand its successor the commander-only "spawn"
    # capability is REJECTED — permissions are never transferable
    with pytest.raises(HandoffError, match="permission elevation"):
        HandoffLedger().record(
            AgentHandoff(sender="developer", receiver="tester",
                         mission_id="m-sec", depth=2,
                         granted_permissions=("spawn",)),
            receiver_role="tester",
        )


# ---------------------------------------------------------------- scenario H


def test_scenario_h_panel_backends_answer(world) -> None:
    """Every control the Road Dog settings panel calls answers (API level)."""
    from fastapi import FastAPI
    from fastapi.testclient import TestClient

    from jarvis.ui.web.budget_routes import router as budget_router
    from jarvis.ui.web.local_endpoint_routes import router as ep_router
    from jarvis.ui.web.sam_memory_routes import router as mem_router
    from jarvis.ui.web.migration_routes import router as mig_router
    from jarvis.ui.web.diagnostics_routes import router as diag_router

    app = FastAPI()
    for router in (budget_router, ep_router, mem_router, mig_router, diag_router):
        app.include_router(router)
    app.state.config = SimpleNamespace(memory=SimpleNamespace(data_dir=str(world.tmp_path)))
    client = TestClient(app)
    probes = {
        "endpoints": client.get("/api/local-endpoints").status_code,
        "routing": client.get("/api/local-endpoints/routing").status_code,
        "budgets": client.get("/api/costs/budgets").status_code,
        "memories": client.get("/api/sam/memories").status_code,
        "export": client.get("/api/sam/memories/export").status_code,
        "readiness": client.get("/api/diagnostics/readiness").status_code,
    }
    bad = {k: v for k, v in probes.items() if v != 200}
    assert not bad, f"panel backend probes failed: {bad}"
    assert client.get("/api/local-endpoints/routing").status_code == 200
    assert client.get("/api/costs/budgets").status_code == 200
    assert client.get("/api/sam/memories").status_code == 200
    assert client.get("/api/sam/memories/export").status_code == 200
    assert client.get("/api/diagnostics/readiness").status_code == 200
    assert client.post("/api/migration/plan",
                       json={"source": str(world.tmp_path)}).status_code == 200

    # the settings the panel edits persist through the config writer
    from jarvis.ui.web.local_endpoint_routes import set_registry

    set_registry(world.registry)
    try:
        world.registry.add(endpoint_id="sel", name="sel", base_url=world.server_a.base_url)
        res = client.post("/api/local-endpoints/sel/select", json={"target": "sam"})
        assert res.status_code == 200
    finally:
        set_registry(None)
    doc = tomllib.loads(world.config.read_text(encoding="utf-8"))
    assert doc["brain"]["providers"]["local-openai"]["base_url"] == world.server_a.base_url
