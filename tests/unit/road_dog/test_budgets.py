"""Tests for budget ENFORCEMENT (v1.1.0 §9) — limits stop work before dispatch."""
from __future__ import annotations

import threading

import pytest

from jarvis.costs.budgets import Budget, BudgetExceeded, BudgetGuard


def test_token_limit_blocks_before_dispatch() -> None:
    guard = BudgetGuard()
    guard.set_budget("mission:qr", Budget(max_tokens=1000))
    guard.check_and_reserve("mission:qr", estimated_tokens=600)  # ok, reserves
    with pytest.raises(BudgetExceeded) as excinfo:
        guard.check_and_reserve("mission:qr", estimated_tokens=600)  # 600+600 > 1000
    assert excinfo.value.limit_kind == "token"
    # the failed request was stopped BEFORE dispatch — exactly one stop recorded
    assert len(guard.stopped_reasons()) == 1


def test_request_limit_stops_the_second_call() -> None:
    guard = BudgetGuard()
    guard.set_budget("agent:dev", Budget(max_requests=1))
    guard.check_and_reserve("agent:dev", estimated_tokens=10)
    guard.record_usage("agent:dev", tokens_in=8, tokens_out=2, settle_tokens=10)
    with pytest.raises(BudgetExceeded, match="request"):
        guard.check_and_reserve("agent:dev", estimated_tokens=10)


def test_cost_limit_uses_estimates_and_records_estimates_clearly() -> None:
    guard = BudgetGuard()
    guard.set_budget("mission:qr", Budget(max_cost_usd=0.10))
    guard.check_and_reserve("mission:qr", estimated_tokens=1, estimated_cost_usd=0.05)
    assert guard.report()["mission:qr"]["usage"]["cost_usd_estimated"] == 0.05
    with pytest.raises(BudgetExceeded, match="cost"):
        guard.check_and_reserve("mission:qr", estimated_tokens=1, estimated_cost_usd=0.06)
    report = guard.report()["mission:qr"]
    assert report["usage"]["note"].startswith("cost is an ESTIMATE")


def test_measured_usage_settles_reservations() -> None:
    guard = BudgetGuard()
    guard.set_budget("mission:qr", Budget(max_tokens=1000))
    reservation = guard.check_and_reserve("mission:qr", estimated_tokens=500)
    guard.record_usage("mission:qr", tokens_in=90, tokens_out=10,
                       settle_tokens=reservation)  # measured 100 replaces the estimate
    usage = guard.report()["mission:qr"]["usage"]
    assert usage["tokens_measured"] == 100
    # reservation released; the next 900-token request still fits under 1000
    guard.check_and_reserve("mission:qr", estimated_tokens=900)
    assert guard.report()["mission:qr"]["usage"]["tokens_committed"] == 1000


def test_stops_are_safe_and_recorded() -> None:
    guard = BudgetGuard()
    guard.set_budget("agent:x", Budget(max_requests=1))
    guard.check_and_reserve("agent:x", estimated_tokens=1)
    with pytest.raises(BudgetExceeded):
        guard.check_and_reserve("agent:x", estimated_tokens=1)
    reasons = guard.stopped_reasons()
    assert reasons and reasons[0]["scope"] == "agent:x"


def test_concurrent_reservations_cannot_race_past_the_cap() -> None:
    guard = BudgetGuard()
    guard.set_budget("mission:race", Budget(max_tokens=100))
    succeeded, failed = [], []

    def worker() -> None:
        try:
            guard.check_and_reserve("mission:race", estimated_tokens=40)
            succeeded.append(1)
        except BudgetExceeded:
            failed.append(1)

    threads = [threading.Thread(target=worker) for _ in range(5)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    # 100-token cap: at most 2 of the 5 40-token reservations can fit
    assert len(succeeded) <= 2
    assert len(failed) >= 3
