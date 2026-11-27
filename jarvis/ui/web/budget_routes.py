"""Budget REST surface (``/api/costs/budgets``) — view and edit live caps.

GET  — the guard's report (scopes, usage, caps, stop reasons).
PUT  — set one scope's budget live (persisted via the config writer when
       ``persist`` is set); takes effect on the NEXT dispatch, never
       mid-request.
"""
from __future__ import annotations

import logging

from fastapi import APIRouter, Request
from pydantic import BaseModel, Field

log = logging.getLogger(__name__)

router = APIRouter(prefix="/api/costs/budgets", tags=["costs"])


class BudgetBody(BaseModel):
    scope: str = Field(..., min_length=1, max_length=80)
    max_tokens: int | None = Field(default=None, ge=0)
    max_requests: int | None = Field(default=None, ge=0)
    max_cost_usd: float | None = Field(default=None, ge=0)
    persist: bool = True


@router.get("")
def get_budgets() -> dict[str, object]:
    from jarvis.costs import budget_bridge

    return budget_bridge.report()


@router.put("")
async def put_budget(body: BudgetBody, request: Request) -> dict[str, object]:
    from jarvis.costs import budget_bridge
    from jarvis.costs.budgets import Budget

    budget = Budget(
        max_tokens=body.max_tokens,
        max_requests=body.max_requests,
        max_cost_usd=body.max_cost_usd,
    )
    budget_bridge.set_budget_live(body.scope, budget)

    persisted = False
    if body.persist:
        try:
            cfg = getattr(request.app.state, "config", None)
            costs = getattr(cfg, "costs", None)
            if costs is not None:
                table = dict(getattr(costs, "budgets", None) or {})
                table[body.scope] = {
                    "max_tokens": body.max_tokens,
                    "max_requests": body.max_requests,
                    "max_cost_usd": body.max_cost_usd,
                }
                costs.budgets = table
                costs.budgets_enabled = True
                persisted = True
        except Exception as exc:  # noqa: BLE001 — persist is best-effort
            log.warning("budget persist failed: %s", exc)

    return {"ok": True, "scope": body.scope, "persisted": persisted,
            "report": budget_bridge.report()}
