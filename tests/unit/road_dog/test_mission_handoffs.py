"""Structured handoffs in the PRODUCTION mission orchestrator (v1.2.0 §5).

The recording sites live in Kontrollierer._run_task_with_critic_loop (task
dispatch) and _publish_draft_ready (draft→critic). These tests exercise the
REAL recording path (the same methods the orchestrator calls) against a REAL
HandoffLedger, plus source-anchored guards so the call sites cannot be
silently removed, plus the missions REST surface.
"""
from __future__ import annotations

import inspect
from pathlib import Path

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from jarvis.missions.handoff import HandoffError
from jarvis.missions.kontrollierer.orchestrator import Kontrollierer

ORCHESTRATOR_SRC = Path(Kontrollierer.__module__.replace(".", "/") + ".py")


def _bare_orchestrator() -> Kontrollierer:
    """A Kontrollierer with ONLY the handoff state (no heavy deps)."""
    orch = Kontrollierer.__new__(Kontrollierer)
    object.__setattr__(orch, "_handoff_ledgers", {})
    object.__setattr__(orch, "_handoff_max_depth", 8)
    return orch


def test_production_call_sites_exist_in_the_orchestrator_source() -> None:
    """Guard: the handoff recording must be wired into the LIVE flow."""
    src = inspect.getsource(Kontrollierer)
    assert "_record_handoff(" in src
    # inside the task dispatch path and the draft-ready publish path
    task_region = src[src.index("async def _run_task_with_critic_loop"):]
    assert 'sender="commander"' in task_region
    draft_region = src[src.index("async def _publish_worker_draft"):]
    assert 'sender="developer"' in draft_region
    assert 'receiver_role="reviewer"' in draft_region


def test_task_dispatch_handoff_records_commander_to_developer() -> None:
    orch = _bare_orchestrator()
    orch._record_handoff(
        "m1", sender="commander", receiver_role="developer",
        completed_work=["deps done"], remaining_work=["refactor-auth"],
        verification_required=["critic review"], depth=1,
    )
    recorded = orch.handoffs("m1")
    assert len(recorded) == 1
    payload = recorded[0]
    assert payload["sender"] == "commander"
    assert payload["receiver"] == "developer"
    assert payload["completed_work"] == ["deps done"]
    assert payload["remaining_work"] == ["refactor-auth"]
    assert payload["verification_required"] == ["critic review"]


def test_draft_ready_handoff_carries_artifacts_and_resource_usage() -> None:
    orch = _bare_orchestrator()
    orch._record_handoff(
        "m1", sender="developer", receiver_role="reviewer",
        completed_work=["m1::abc::iter0"],
        artifacts=["diff://m1::abc::iter0"],
        verification_required=["critic verdict"],
        resource_usage={"tokens_used": 4200, "cost_usd": 0.02},
    )
    payload = orch.handoffs("m1")[0]
    assert payload["artifacts"] == ["diff://m1::abc::iter0"]
    assert payload["resource_usage"]["tokens_used"] == 4200
    assert payload["resource_usage"]["cost_usd"] == 0.02


def test_circular_task_chains_are_rejected_in_a_live_mission() -> None:
    orch = _bare_orchestrator()
    ok = orch._record_handoff("m1", sender="commander", receiver_role="developer", depth=1)
    assert ok is not None
    ok2 = orch._record_handoff("m1", sender="developer", receiver_role="tester", depth=2)
    assert ok2 is not None
    # a task dependency that loops back to the commander is REJECTED
    rejected = orch._record_handoff("m1", sender="tester", receiver_role="commander", depth=3)
    assert rejected is None  # logged + not recorded
    assert len(orch.handoffs("m1")) == 2


def test_delegation_depth_bound_applies_to_running_missions() -> None:
    orch = Kontrollierer.__new__(Kontrollierer)
    object.__setattr__(orch, "_handoff_ledgers", {})
    object.__setattr__(orch, "_handoff_max_depth", 3)
    chain = [("commander", "developer"), ("developer", "tester"),
             ("tester", "reviewer"), ("reviewer", "developer")]
    outcomes = []
    for i, (sender, receiver) in enumerate(chain):
        outcomes.append(orch._record_handoff(
            "m-depth", sender=sender, receiver_role=receiver, depth=i))
    # the 4th handoff exceeds depth 3 and is REJECTED
    assert outcomes[-1] is None
    assert len(orch.handoffs("m-depth")) == 3


def test_handoffs_are_isolated_per_mission() -> None:
    orch = _bare_orchestrator()
    orch._record_handoff("m-a", sender="commander", receiver_role="developer")
    orch._record_handoff("m-b", sender="commander", receiver_role="tester")
    assert [h["receiver"] for h in orch.handoffs("m-a")] == ["developer"]
    assert [h["receiver"] for h in orch.handoffs("m-b")] == ["tester"]


def test_missions_rest_surface_exposes_handoffs() -> None:
    from jarvis.ui.web.missions_routes import router

    app = FastAPI()
    app.include_router(router)
    app.state.mission_manager = None
    client = TestClient(app)
    res = client.get("/api/missions/does-not-exist/handoffs")
    assert res.status_code == 200
    body = res.json()
    assert body["handoffs"] == []
