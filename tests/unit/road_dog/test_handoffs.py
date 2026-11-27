"""Tests for structured crew handoffs (v1.1.0 §4)."""
from __future__ import annotations

import pytest

from jarvis.missions.handoff import (
    AgentHandoff,
    HandoffError,
    HandoffLedger,
    effective_permissions,
)


def _h(sender: str, receiver: str, *, depth: int = 0,
       granted: tuple[str, ...] = ()) -> AgentHandoff:
    return AgentHandoff(sender=sender, receiver=receiver, mission_id="m1",
                        depth=depth, granted_permissions=granted)


def test_role_permissions_are_fixed_and_typed() -> None:
    assert "handoff" in effective_permissions("developer")
    assert "write_code" in effective_permissions("developer")
    assert "write_code" not in effective_permissions("reviewer")
    assert "spawn" in effective_permissions("commander")
    assert "spawn" not in effective_permissions("developer")


def test_self_handoff_rejected() -> None:
    with pytest.raises(HandoffError):
        HandoffLedger().record(_h("developer", "developer"), receiver_role="developer")


def test_unknown_roles_rejected() -> None:
    with pytest.raises(HandoffError):
        HandoffLedger().record(_h("developer", "coffee_brewer"), receiver_role="developer")


def test_permission_elevation_is_blocked() -> None:
    ledger = HandoffLedger()
    # developer tries to grant "spawn" (a commander-only capability) to reviewer
    with pytest.raises(HandoffError, match="permission elevation"):
        ledger.record(_h("developer", "reviewer", granted=("spawn",)),
                      receiver_role="reviewer")


def test_legal_permissions_pass_when_role_holds_them() -> None:
    ledger = HandoffLedger()
    h = ledger.record(_h("commander", "reviewer", granted=("read_artifacts",)),
                      receiver_role="reviewer")
    assert h.depth == 0


def test_direct_cycle_is_blocked() -> None:
    ledger = HandoffLedger()
    ledger.record(_h("architect", "developer"), receiver_role="developer")
    with pytest.raises(HandoffError, match="circular"):
        ledger.record(_h("developer", "architect"), receiver_role="architect")


def test_transitive_cycle_is_blocked() -> None:
    ledger = HandoffLedger()
    ledger.record(_h("architect", "developer"), receiver_role="developer")
    ledger.record(_h("developer", "tester"), receiver_role="tester")
    ledger.record(_h("tester", "reviewer"), receiver_role="reviewer")
    # reviewer → architect would close architect→developer→tester→reviewer→architect
    with pytest.raises(HandoffError, match="circular"):
        ledger.record(_h("reviewer", "architect"), receiver_role="architect")


def test_acyclic_diamond_is_allowed() -> None:
    ledger = HandoffLedger()
    ledger.record(_h("architect", "developer"), receiver_role="developer")
    ledger.record(_h("architect", "tester"), receiver_role="tester")
    ledger.record(_h("developer", "tester"), receiver_role="tester")  # joins, no cycle
    assert len(ledger.handoffs) == 3


def test_depth_bound_blocks_runaway_delegation() -> None:
    ledger = HandoffLedger(max_depth=3)
    chain = [("commander", "architect"), ("architect", "developer"),
             ("developer", "tester"), ("tester", "reviewer")]
    for i, (sender, receiver) in enumerate(chain):
        if i == 3:
            with pytest.raises(HandoffError, match="depth"):
                ledger.record(_h(sender, receiver, depth=i), receiver_role=receiver)
        else:
            ledger.record(_h(sender, receiver, depth=i), receiver_role=receiver)


def test_handoff_payload_roundtrip() -> None:
    h = AgentHandoff(
        sender="developer", receiver="tester", mission_id="m1",
        completed_work=["wrote checksum.py"], remaining_work=["run tests"],
        artifacts=["checksum.py"], known_failures=[], verification_required=["pytest"],
        resource_usage={"tokens": 1200},
    )
    data = h.to_dict()
    assert AgentHandoff.from_dict(data).completed_work == ["wrote checksum.py"]
    # every mission-required field is present in the payload
    assert {"sender", "receiver", "completed_work", "remaining_work", "artifacts",
            "known_failures", "verification_required", "resource_usage"} <= set(data)
