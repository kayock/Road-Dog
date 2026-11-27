"""Budget enforcement — limits that actually STOP work, not just display it.

A :class:`BudgetGuard` owns the token/request/cost allowances for agents and
missions. The contract is simple and enforced at the DISPATCH boundary:

* ``check_and_reserve(...)`` is called BEFORE a model request is sent; it
  raises :class:`BudgetExceeded` when the request would exceed any limit,
  reserving the estimated tokens so concurrent dispatchers cannot race past
  the cap. It returns the reservation (the estimated amount) which the
  caller passes back to :meth:`record_usage` as ``settle_tokens``.
* ``record_usage(...)`` settles a reservation with the measured usage
  (measured values replace estimates; the escrow is released).
* ``report(...)`` returns per-scope state for the spend dashboard, clearly
  separating measured usage, reservations and limits. Cost figures are
  ESTIMATES unless the provider reported actual cost.

The guard is pure accounting: it never talks to a provider. The PRODUCTION
dispatch path (:mod:`jarvis.providers.budget_bridge`) calls
``check_and_reserve`` before every model request — that is what "budget
checks occur before additional requests are dispatched" means.
"""
from __future__ import annotations

import threading
from dataclasses import dataclass, field
from typing import Any

__all__ = ["BudgetExceeded", "Budget", "BudgetGuard", "ScopeUsage"]


class BudgetExceeded(RuntimeError):
    """Raised BEFORE a request is dispatched when a limit would be crossed."""

    def __init__(self, scope: str, limit_kind: str, detail: str) -> None:
        super().__init__(f"[{scope}] {limit_kind} limit exceeded: {detail}")
        self.scope = scope
        self.limit_kind = limit_kind


@dataclass
class Budget:
    """Limits per scope. ``None`` = unlimited (explicitly)."""

    max_tokens: int | None = None
    max_requests: int | None = None
    max_cost_usd: float | None = None

    def as_dict(self) -> dict[str, Any]:
        return {
            "max_tokens": self.max_tokens,
            "max_requests": self.max_requests,
            "max_cost_usd": self.max_cost_usd,
        }


@dataclass
class ScopeUsage:
    tokens_measured: int = 0        # settled, real usage
    tokens_reserved: int = 0        # outstanding escrow from check_and_reserve
    requests: int = 0
    cost_usd: float = 0.0           # settled cost (ESTIMATE unless reported)
    cost_reserved: float = 0.0      # outstanding cost escrow

    @property
    def tokens_committed(self) -> int:
        """What the cap sees: everything measured plus outstanding escrow."""
        return self.tokens_measured + self.tokens_reserved

    def as_dict(self) -> dict[str, Any]:
        return {
            "tokens_committed": self.tokens_committed,
            "tokens_measured": self.tokens_measured,
            "tokens_reserved": self.tokens_reserved,
            "requests": self.requests,
            "cost_usd_estimated": self.cost_usd + self.cost_reserved,
            "note": "cost is an ESTIMATE unless the provider reported actual cost",
        }


class BudgetGuard:
    """Thread-safe budget accounting with dispatch-boundary enforcement."""

    def __init__(self, *, default_est_cost_per_1k_tokens: float = 0.0) -> None:
        self._lock = threading.Lock()
        self._budgets: dict[str, Budget] = {}
        self._usage: dict[str, ScopeUsage] = {}
        self._est_cost_per_1k = default_est_cost_per_1k_tokens
        self.stops: list[dict[str, Any]] = []

    # -- configuration -------------------------------------------------------

    def set_budget(self, scope: str, budget: Budget) -> None:
        with self._lock:
            self._budgets[scope] = budget

    def _scope_usage(self, scope: str) -> ScopeUsage:
        if scope not in self._usage:
            self._usage[scope] = ScopeUsage()
        return self._usage[scope]

    # -- the dispatch boundary -------------------------------------------------

    def check_and_reserve(
        self, scope: str, *, estimated_tokens: int, estimated_cost_usd: float | None = None
    ) -> int:
        """Raise :class:`BudgetExceeded` BEFORE dispatch, else reserve tokens.

        Returns the reserved token amount — pass it back as ``settle_tokens``
        in :meth:`record_usage` to release the escrow with measured usage.
        """
        if estimated_tokens < 0:
            raise ValueError("estimated_tokens must be >= 0")
        with self._lock:
            budget = self._budgets.get(scope, Budget())
            usage = self._scope_usage(scope)
            # A dispatched request counts at the boundary — even if its
            # response never settles (crash, cancel), the spend attempt was real.
            dispatched_requests = usage.requests + 1
            if budget.max_requests is not None and dispatched_requests > budget.max_requests:
                self.stops.append({"scope": scope, "kind": "requests",
                                   "detail": f"{usage.requests}/{budget.max_requests} used"})
                raise BudgetExceeded(scope, "request", f"{usage.requests} sent, cap {budget.max_requests}")
            if budget.max_tokens is not None and usage.tokens_committed + estimated_tokens > budget.max_tokens:
                self.stops.append({"scope": scope, "kind": "tokens",
                                   "detail": f"{usage.tokens_committed}+{estimated_tokens} > {budget.max_tokens}"})
                raise BudgetExceeded(scope, "token",
                                     f"{usage.tokens_committed} committed + {estimated_tokens} "
                                     f"requested > cap {budget.max_tokens}")
            cost = (estimated_cost_usd if estimated_cost_usd is not None
                    else estimated_tokens / 1000.0 * self._est_cost_per_1k)
            if budget.max_cost_usd is not None and usage.cost_usd + usage.cost_reserved + cost > budget.max_cost_usd:
                self.stops.append({"scope": scope, "kind": "cost",
                                   "detail": f"{usage.cost_usd + usage.cost_reserved:.4f}+{cost:.4f} > {budget.max_cost_usd}"})
                raise BudgetExceeded(scope, "cost",
                                     f"estimated {usage.cost_usd + usage.cost_reserved + cost:.4f} USD > cap {budget.max_cost_usd}")
            usage.requests = dispatched_requests
            usage.tokens_reserved += estimated_tokens
            usage.cost_reserved += cost
            return estimated_tokens

    def record_usage(
        self, scope: str, *, tokens_in: int = 0, tokens_out: int = 0,
        settle_tokens: int | None = None, settle_cost_usd: float | None = None,
        cost_usd: float | None = None,
    ) -> None:
        """Settle a dispatched request with MEASURED usage.

        ``settle_tokens`` / ``settle_cost_usd`` release the escrow returned by
        ``check_and_reserve`` (the estimate), replacing it with the measured
        amount. Without them the reservation stays outstanding — correct for
        providers that fail mid-request or report no usage (the conservative
        reading keeps the estimate held, never under-counts).
        """
        measured = tokens_in + tokens_out
        with self._lock:
            usage = self._scope_usage(scope)
            usage.tokens_measured += measured
            if settle_tokens is not None:
                usage.tokens_reserved = max(0, usage.tokens_reserved - int(settle_tokens))
            released_cost = settle_cost_usd if settle_cost_usd is not None else cost_usd
            if released_cost is not None:
                usage.cost_reserved = max(0.0, usage.cost_reserved - float(released_cost))
            if cost_usd is not None:
                usage.cost_usd += float(cost_usd)

    # -- reporting ---------------------------------------------------------------

    def report(self) -> dict[str, Any]:
        with self._lock:
            scopes = sorted(set(self._budgets) | set(self._usage))
            return {
                scope: {
                    "usage": self._usage.get(scope, ScopeUsage()).as_dict(),
                    "budget": self._budgets.get(scope, Budget()).as_dict(),
                }
                for scope in scopes
            }

    def stopped_reasons(self) -> list[dict[str, Any]]:
        with self._lock:
            return list(self.stops)
