"""Production routing tests for the endpoint registry (v1.2.0 §4).

Real HTTP: every test that claims a request was constructed asserts against a
live ``InferenceFixtureServer`` (recorded path/body/headers). No paid API, no
mocked transport, and no launched inference server.
"""
from __future__ import annotations

import json
from pathlib import Path
from types import SimpleNamespace

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from tests.road_dog_support.inference_fixture import InferenceFixtureServer
from jarvis.local_models import routing
from jarvis.local_models.endpoints import EndpointRegistry
from jarvis.ui.web.local_endpoint_routes import router, set_registry


@pytest.fixture()
def fixture_server():
    server = InferenceFixtureServer()
    yield server
    server.stop()


@pytest.fixture()
def sandbox(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> Path:
    config = tmp_path / "jarvis.toml"
    config.write_text("", encoding="utf-8")
    monkeypatch.setenv("JARVIS_CONFIG", str(config))
    registry = EndpointRegistry(tmp_path / "endpoints.json")
    set_registry(registry)
    yield tmp_path
    set_registry(None)


def _add(registry: EndpointRegistry, endpoint_id: str, base_url: str) -> None:
    registry.add(endpoint_id=endpoint_id, name=endpoint_id, base_url=base_url)


def test_select_persists_provider_base_url_and_model(sandbox: Path) -> None:
    import tomllib

    server = InferenceFixtureServer()
    try:
        registry = EndpointRegistry(sandbox / "endpoints.json")
        _add(registry, "dev-box", server.base_url)
        assignment = routing.select_endpoint(
            "dev-box", target="sam", model="fixture-model",
            registry_path=sandbox / "endpoints.json",
            config_path=sandbox / "jarvis.toml",
        )
        assert assignment.endpoint_id == "dev-box"
        doc = tomllib.loads((sandbox / "jarvis.toml").read_text(encoding="utf-8"))
        provider = doc["brain"]["providers"]["local-openai"]
        assert provider["base_url"] == server.base_url
        assert provider["deep_model"] == "fixture-model"
    finally:
        server.stop()


def test_provider_endpoint_resolution_consumes_the_selection(sandbox: Path) -> None:
    """The production endpoint resolver is the runtime consumer of the selection.

    LocalOpenAIBrain._resolve_root() -> cfg.resolve_provider_endpoint("local-openai")
    -> the W1a explicit override that the registry selection wrote.
    """
    from jarvis.core.config import resolve_provider_endpoint

    server = InferenceFixtureServer()
    try:
        registry = EndpointRegistry(sandbox / "endpoints.json")
        _add(registry, "dev", server.base_url)
        routing.select_endpoint("dev", target="sam",
                                registry_path=sandbox / "endpoints.json",
                                config_path=sandbox / "jarvis.toml")
        endpoint = resolve_provider_endpoint("local-openai", vendor_default_base_url=None)
        assert str(endpoint.base_url) == server.base_url
    finally:
        server.stop()


def test_production_plugin_reaches_the_fixture_with_real_http(sandbox: Path) -> None:
    """LocalOpenAIBrain (the keyless local provider) vs the fixture server."""
    server = InferenceFixtureServer()
    server.models = ["fixture-model"]
    try:
        from jarvis.plugins.brain.local_openai import LocalOpenAIBrain

        registry = EndpointRegistry(sandbox / "endpoints.json")
        _add(registry, "dev", server.base_url)
        routing.select_endpoint("dev", target="sam", model="fixture-model",
                                registry_path=sandbox / "endpoints.json",
                                config_path=sandbox / "jarvis.toml")
        brain = LocalOpenAIBrain(model="fixture-model")
        from jarvis.core.protocols import BrainMessage, BrainRequest

        req = BrainRequest(
            messages=(BrainMessage(role="user", content="say hi"),),
            system="You are Sam.",
        )

        async def _run() -> list:
            return [delta async for delta in brain.complete(req)]

        deltas = __import__("asyncio").run(_run())
        text = "".join(d.content or "" for d in deltas)
        assert "fixture says hi" in text
        calls = server.recorded()
        chat_calls = [c for c in calls if c["path"].startswith("/v1/chat/completions")]
        assert chat_calls, "no real HTTP chat request was constructed"
        body = chat_calls[0]["body"]
        assert body["model"] == "fixture-model"
        contents = [m.get("content") for m in body["messages"]]
        assert "say hi" in contents  # the user turn reached the server
    finally:
        server.stop()


def test_streaming_request_construction_is_real_sse(sandbox: Path) -> None:
    server = InferenceFixtureServer()
    try:
        from jarvis.plugins.brain.local_openai import LocalOpenAIBrain

        registry = EndpointRegistry(sandbox / "endpoints.json")
        _add(registry, "dev", server.base_url)
        routing.select_endpoint("dev", target="sam", model="fixture-model",
                                registry_path=sandbox / "endpoints.json",
                                config_path=sandbox / "jarvis.toml")
        brain = LocalOpenAIBrain(model="fixture-model")
        from jarvis.core.protocols import BrainMessage, BrainRequest

        req = BrainRequest(
            messages=(BrainMessage(role="user", content="hello"),), stream=True)

        async def _run() -> list:
            return [delta async for delta in brain.complete(req)]

        deltas = __import__("asyncio").run(_run())
        assert any(d.content for d in deltas)
        calls = [c for c in server.recorded() if "chat/completions" in c["path"]]
        assert calls[-1]["body"]["stream"] is True
    finally:
        server.stop()


def test_registry_test_probe_hits_the_fixture_metadata_only(sandbox: Path) -> None:
    server = InferenceFixtureServer()
    try:
        registry = EndpointRegistry(sandbox / "endpoints.json")
        _add(registry, "probe", server.base_url)
        profile = registry.test("probe")
        assert profile.reachable is True
        assert profile.models[0].tool_calling == "yes"  # /api/show declares tools
        paths = {c["path"] for c in server.recorded()}
        assert "/api/tags" in paths and "/api/show" in paths
        assert not any("chat/completions" in p for p in paths)  # zero-spend probe
    finally:
        server.stop()


def test_rest_select_route_writes_routing_and_persists(sandbox: Path) -> None:
    server = InferenceFixtureServer()
    try:
        registry = EndpointRegistry(sandbox / "endpoints.json")
        _add(registry, "lan", server.base_url)
        # the route module resolves the SHARED registry instance — reload it
        # so the just-added endpoint is visible to the route
        set_registry(EndpointRegistry(sandbox / "endpoints.json"))
        app = FastAPI()
        app.include_router(router)
        client = TestClient(app)
        res = client.post("/api/local-endpoints/lan/select",
                          json={"target": "sam", "model": "fixture-model"})
        assert res.status_code == 200
        assert res.json()["routed_provider"] == "local-openai"
        state = client.get("/api/local-endpoints/routing").json()
        assert state["assignments"]["sam"]["endpoint_id"] == "lan"
        import tomllib

        doc = tomllib.loads((sandbox / "jarvis.toml").read_text(encoding="utf-8"))
        assert doc["brain"]["providers"]["local-openai"]["base_url"] == server.base_url
        # clearing removes the provider override again
        assert client.delete("/api/local-endpoints/routing/sam").status_code == 200
        doc = tomllib.loads((sandbox / "jarvis.toml").read_text(encoding="utf-8"))
        assert doc["brain"]["providers"]["local-openai"]["base_url"] == ""
    finally:
        server.stop()


def test_agent_target_assignment_is_stored_and_reported(sandbox: Path) -> None:
    server = InferenceFixtureServer()
    try:
        registry = EndpointRegistry(sandbox / "endpoints.json")
        _add(registry, "nas", server.base_url)
        assignment = routing.select_endpoint(
            "nas", target="agent:builder",
            registry_path=sandbox / "endpoints.json",
            config_path=sandbox / "jarvis.toml",
        )
        assert assignment.target == "agent:builder"
        state = routing.routing_status(sandbox / "endpoints.json")
        assert state["assignments"]["agent:builder"]["endpoint_id"] == "nas"
        # a non-sam assignment does NOT touch the primary provider card
        import tomllib

        doc = tomllib.loads((sandbox / "jarvis.toml").read_text(encoding="utf-8"))
        assert "local-openai" not in doc.get("brain", {}).get("providers", {})
    finally:
        server.stop()


def test_unknown_endpoint_select_is_404(sandbox: Path) -> None:
    app = FastAPI()
    app.include_router(router)
    client = TestClient(app)
    res = client.post("/api/local-endpoints/ghost/select", json={"target": "sam"})
    assert res.status_code == 404
