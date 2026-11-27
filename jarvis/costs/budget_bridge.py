"""Production budget enforcement at the inference dispatch door.

Road Dog v1.2.0 connects :class:`jarvis.costs.budgets.BudgetGuard` to the ONE
place every production inference request passes through:
:meth:`jarvis.brain.usage_meter.MeteredBrain.complete` (applied by
:class:`jarvis.brain.provider_registry.BrainProviderRegistry` — "the one door
every provider instance comes through"). Every brain call — Sam's voice
turns, agent chat, computer use, wiki/memory processing, mission workers and
critics, society seat brains, agent runtimes, retries and parallel workers —
is a ``MeteredBrain.complete`` call tagged with a production caller
(``jarvis.costs.ledger.usage_context``).

Enforcement contract:

* ``pre_dispatch`` runs BEFORE the provider request is sent and raises
  :class:`jarvis.costs.budgets.BudgetExceeded` when a configured cap would be
  crossed. Concurrent dispatchers cannot race past the cap (the guard is
  lock-protected; see the race tests).
* ``settle`` records the MEASURED usage after the stream ends — including the
  failure/cancellation path (the ``finally`` block), so aborted requests
  still count what was actually spent.
* When a provider reports NO usage block (some local servers), the token
  escrow is released UNCOUNTED and only the REQUEST counter has bound the
  call. That limitation is real and disclosed here rather than pretending
  token caps work for usage-less providers.

Scopes are the production caller tags, e.g. ``voice-turn`` (Sam), ``agent-chat``
(background agents), ``computer-use``, ``wiki`` (memory processing),
``mission-worker`` / ``mission-critic`` (the crew), plus the ``default`` scope
that applies to every caller as a global guard. Mission-level $ budgets are
enforced by the upstream :class:`jarvis.missions.budget.BudgetTracker` — this
bridge adds the token/request/cost layer from ``[costs.budgets]`` in
jarvis.toml.

Budgets are OFF by default (``[costs] budgets_enabled = false``) — an install
without configured caps behaves exactly as upstream. Enabling them is the
user's explicit decision (Settings → Budgets).
"""
from __future__ import annotations

import logging
import threading
from typing import Any

from jarvis.costs.budgets import Budget, BudgetExceeded, BudgetGuard

log = logging.getLogger(__name__)

# Production caller tags observed at real dispatch sites (grep usage_context).
KNOWN_CALLERS: tuple[str, ...] = (
    "voice-turn",      # Sam conversations (manager._generate)
    "agent-chat",      # background agent chat
    "computer-use",    # CU brain calls
    "wiki",            # wiki/memory processing
    "mission-worker",  # crew workers
    "mission-critic",  # crew critic
    "society",         # society seat brains (their own caller tags)
    "agent-runtime",   # agent runtimes gateway
)

#: Callers that belong to the crew/mission family — the ``mission`` scope
#: (a shared per-crew budget) applies on top of their own scope.
MISSION_CALLERS = frozenset({"mission-worker", "mission-critic"})

_lock = threading.Lock()
_guard = BudgetGuard()
_enabled = False


def configure(config: Any) -> None:
    """Load ``[costs]`` from the live config: ``budgets_enabled`` + ``budgets``.

    Expected TOML shape::

        [costs]
        budgets_enabled = true

        [costs.budgets."voice-turn"]
        max_tokens = 200000
        max_requests = 500
        max_cost_usd = 5.0

        [costs.budgets."default"]   # applies to every caller
        max_tokens = 1000000

    Unknown scopes in the table are accepted as-is: a user may budget a
    caller tag this build does not enumerate yet.
    """
    global _enabled
    with _lock:
        _guard = BudgetGuard()  # reset: reconfigure replaces everything
        globals()["_guard"] = _guard
        costs = getattr(config, "costs", None)
        enabled = bool(getattr(costs, "budgets_enabled", False))
        table = getattr(costs, "budgets", None) or {}
        for scope, spec in dict(table).items():
            if isinstance(spec, dict):
                get = spec.get
            else:
                get = lambda name, _s=spec: getattr(_s, name, None)  # noqa: E731
            _guard.set_budget(scope, Budget(
                max_tokens=_opt_int(get("max_tokens")),
                max_requests=_opt_int(get("max_requests")),
                max_cost_usd=_opt_float(get("max_cost_usd")),
            ))
        _enabled = enabled
        log.info("budget bridge configured: enabled=%s scopes=%s", enabled, sorted(table))


def _opt_int(value: Any) -> int | None:
    try:
        return int(value) if value is not None else None
    except (TypeError, ValueError):
        return None


def _opt_float(value: Any) -> float | None:
    try:
        return float(value) if value is not None else None
    except (TypeError, ValueError):
        return None


def enabled() -> bool:
    return _enabled


def _scopes_for(caller: str) -> list[str]:
    """The scopes a caller is accounted under (checked in order)."""
    scopes = ["default"]
    if caller:
        scopes.append(caller)
    if caller in MISSION_CALLERS:
        scopes.append("mission")
    return scopes


def estimate_tokens_for(req: Any, model: str = "") -> int:
    """A conservative pre-dispatch token estimate for a BrainRequest.

    ~4 chars per token over the prompt text plus a reserve for the reply and
    tool schemas. The MEASURED usage replaces it at settle time; the estimate
    only decides whether the request may go out at all.
    """
    prompt_chars = 0
    for attr in ("prompt", "text", "system", "message"):
        value = getattr(req, attr, None)
        if isinstance(value, str):
            prompt_chars += len(value)
    messages = getattr(req, "messages", None)
    if isinstance(messages, (list, tuple)):
        for message in messages:
            content = getattr(message, "content", message)
            if isinstance(content, str):
                prompt_chars += len(content)
    return 256 + prompt_chars // 4


def pre_dispatch(caller: str, estimated_tokens: int) -> int | None:
    """Check every applicable scope and reserve; returns the reservation.

    Raises :class:`BudgetExceeded` BEFORE the request is dispatched. Returns
    ``None`` when budgets are disabled (the no-op contract).
    """
    if not _enabled:
        return None
    reservation = None
    for scope in _scopes_for(caller):
        got = _guard.check_and_reserve(scope, estimated_tokens=estimated_tokens)
        if reservation is None:
            reservation = got
    return reservation


def settle(
    caller: str,
    *,
    tokens_in: int = 0,
    tokens_out: int = 0,
    tokens_cached: int = 0,
    reservation: int | None = None,
) -> None:
    """Settle the escrow with MEASURED usage (safe on every exit path)."""
    if not _enabled or reservation is None:
        return
    for scope in _scopes_for(caller):
        _guard.record_usage(
            scope,
            tokens_in=tokens_in,
            tokens_out=tokens_out,
            settle_tokens=reservation,
            settle_cost_usd=0.0,
        )


def report() -> dict[str, Any]:
    """The live spend dashboard (scopes with usage and/or configured caps)."""
    return {"enabled": _enabled, "scopes": _guard.report()}


def stopped_reasons() -> list[dict[str, Any]]:
    return _guard.stopped_reasons()


def set_budget_live(scope: str, budget: Budget) -> None:
    """Runtime override (Settings → Budgets); survives until reconfigure."""
    _guard.set_budget(scope, budget)


__all__ = [
    "KNOWN_CALLERS",
    "configure",
    "enabled",
    "estimate_tokens_for",
    "pre_dispatch",
    "report",
    "set_budget_live",
    "settle",
    "stopped_reasons",
]
