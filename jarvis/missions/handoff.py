"""Structured crew handoffs — who finished what, and what may NOT happen.

An :class:`AgentHandoff` is the only contract by which one crew agent's work
reaches another. Every handoff records sender, receiver, completed work,
remaining work, artifacts, known failures, required verification and resource
usage — and the validator enforces the anti-abuse rules of the v1.1.0
mission (§4):

* no self-handoffs and no unknown roles,
* no CIRCULAR chains (a→b→a, directly or transitively) — cycle detection
  over the handoff graph of a mission,
* no PERMISSION ELEVATION: a handoff CANNOT grant capabilities. The
  receiver's permissions are computed from ITS role's allow-list only; any
  permission key present in the handoff's ``granted_permissions`` that the
  receiver's role does not already hold is REJECTED, not silently clipped,
* delegation depth is bounded (``max_depth``) so A→B→C→D→… cannot run away.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

__all__ = [
    "ROLES",
    "ROLE_PERMISSIONS",
    "HandoffError",
    "AgentHandoff",
    "HandoffLedger",
]

#: Crew roles (custom roles are added by extending this registry + mapping).
ROLES: tuple[str, ...] = (
    "commander", "architect", "developer", "debugger",
    "tester", "reviewer", "researcher", "docs",
)

#: The fixed permission allow-list per role. Agents CANNOT transfer
#: permissions; a receiver only ever holds what its own role grants.
ROLE_PERMISSIONS: dict[str, frozenset[str]] = {
    "commander": frozenset({"spawn", "read_artifacts", "handoff"}),
    "architect": frozenset({"read_artifacts", "write_spec", "handoff"}),
    "developer": frozenset({"read_artifacts", "write_code", "handoff"}),
    "debugger": frozenset({"read_artifacts", "write_code", "handoff"}),
    "tester": frozenset({"read_artifacts", "run_tests", "handoff"}),
    "reviewer": frozenset({"read_artifacts", "handoff"}),
    "researcher": frozenset({"read_artifacts", "handoff"}),
    "docs": frozenset({"read_artifacts", "write_docs", "handoff"}),
}

_MAX_DEPTH = 8


class HandoffError(ValueError):
    """A handoff that must not proceed, with the exact reason."""


@dataclass
class AgentHandoff:
    sender: str
    receiver: str
    mission_id: str
    completed_work: list[str] = field(default_factory=list)
    remaining_work: list[str] = field(default_factory=list)
    artifacts: list[str] = field(default_factory=list)  # artifact ids/paths
    known_failures: list[str] = field(default_factory=list)
    verification_required: list[str] = field(default_factory=list)
    resource_usage: dict[str, Any] = field(default_factory=dict)
    granted_permissions: tuple[str, ...] = ()  # validated AGAINST the receiver
    depth: int = 0

    def to_dict(self) -> dict[str, Any]:
        return {
            "sender": self.sender, "receiver": self.receiver,
            "mission_id": self.mission_id,
            "completed_work": list(self.completed_work),
            "remaining_work": list(self.remaining_work),
            "artifacts": list(self.artifacts),
            "known_failures": list(self.known_failures),
            "verification_required": list(self.verification_required),
            "resource_usage": dict(self.resource_usage),
            "granted_permissions": list(self.granted_permissions),
            "depth": self.depth,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "AgentHandoff":
        return cls(
            sender=data["sender"], receiver=data["receiver"],
            mission_id=data["mission_id"],
            completed_work=list(data.get("completed_work", [])),
            remaining_work=list(data.get("remaining_work", [])),
            artifacts=list(data.get("artifacts", [])),
            known_failures=list(data.get("known_failures", [])),
            verification_required=list(data.get("verification_required", [])),
            resource_usage=dict(data.get("resource_usage", {})),
            granted_permissions=tuple(data.get("granted_permissions", ())),
            depth=int(data.get("depth", 0)),
        )


def effective_permissions(role: str) -> frozenset[str]:
    """What a role may do — the ONLY source of agent permissions."""
    if role not in ROLE_PERMISSIONS:
        raise HandoffError(f"unknown role {role!r}; known: {sorted(ROLE_PERMISSIONS)}")
    return ROLE_PERMISSIONS[role]


class HandoffLedger:
    """Validated handoffs for one mission + the anti-abuse graph checks."""

    def __init__(self, *, max_depth: int = _MAX_DEPTH) -> None:
        self.max_depth = max_depth
        self.handoffs: list[AgentHandoff] = []

    def record(self, handoff: AgentHandoff, *, receiver_role: str) -> AgentHandoff:
        """Validate and record one handoff; raises :class:`HandoffError`."""
        if handoff.sender == handoff.receiver:
            raise HandoffError("self-handoffs are not allowed")
        if handoff.sender not in ROLES or handoff.receiver not in ROLES:
            raise HandoffError(
                f"sender and receiver must be crew roles, got "
                f"{handoff.sender!r} → {handoff.receiver!r}"
            )
        if handoff.depth >= self.max_depth:
            raise HandoffError(
                f"handoff depth {handoff.depth} exceeds the bound {self.max_depth}"
            )
        if handoff.mission_id and any(
            existing.mission_id != handoff.mission_id for existing in self.handoffs
        ):
            raise HandoffError("one ledger tracks one mission; cross-mission handoff")
        if self._creates_cycle(handoff.sender, handoff.receiver):
            raise HandoffError(
                f"circular assignment: {handoff.sender!r} → {handoff.receiver!r} "
                "closes a cycle in this mission's handoff graph"
            )
        receiver_permissions = effective_permissions(receiver_role)
        granted = set(handoff.granted_permissions)
        ungrantable = granted - receiver_permissions
        if ungrantable:
            raise HandoffError(
                "permission elevation blocked: receiver role "
                f"{receiver_role!r} does not hold {sorted(ungrantable)}; "
                "handoffs cannot grant capabilities"
            )
        self.handoffs.append(handoff)
        return handoff

    def _creates_cycle(self, sender: str, receiver: str) -> bool:
        """Would recording sender→receiver close a cycle in the handoff graph?"""
        edges: dict[str, set[str]] = {}
        for existing in self.handoffs:
            edges.setdefault(existing.sender, set()).add(existing.receiver)
        # walk forward from receiver; reaching sender again means a cycle
        stack, seen = [receiver], set()
        while stack:
            node = stack.pop()
            if node == sender:
                return True
            if node in seen:
                continue
            seen.add(node)
            stack.extend(edges.get(node, ()))
        return False
