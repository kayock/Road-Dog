"""Production-path budget enforcement tests (v1.2.0 §2).

These tests exercise the REAL production dispatch door —
``MeteredBrain.complete`` (the wrapper BrainProviderRegistry applies to every
provider) — with a fake provider that counts inner calls. A direct BudgetGuard
unit test is NOT sufficient and none of these touch the guard directly: the
budget check must fire inside the production call path, before the provider
request goes out, and settle on every exit path.
"""
from __future__ import annotations

import asyncio
import threading
from types import SimpleNamespace
from typing import Any, AsyncIterator

import pytest

from jarvis.brain.usage_meter import MeteredBrain, meter_brain
from jarvis.costs import budget_bridge
from jarvis.costs.ledger import usage_context
from jarvis.core.protocols import BrainMessage, BrainRequest


class _FakeProvider:
    """A minimal production-shaped provider: complete() yields one delta with usage."""

    def __init__(self, *, usage: dict[str, Any] | None = None,
                 fail_after_yield: bool = False) -> None:
        self.calls = 0
        self.model = "fixture-model"
        self._usage = usage
        self._fail_after_yield = fail_after_yield

    def complete(self, req: BrainRequest) -> AsyncIterator[Any]:
        return self._stream(req)

    async def _stream(self, req: BrainRequest) -> AsyncIterator[Any]:
        self.calls += 1
        from jarvis.core.protocols import BrainDelta

        payload = {"content": "ok"}
        if self._usage is not None:
            payload["usage"] = dict(self._usage)
        yield BrainDelta(**payload) if hasattr(BrainDelta, "__init__") else payload
        if self._fail_after_yield:
            raise RuntimeError("connection dropped mid-stream")


def _req(prompt: str = "hello road dog") -> BrainRequest:
    return BrainRequest(
        messages=(BrainMessage(role="user", content=prompt),),
        system="You are Sam.",
    )


def _configure(**scope_caps: dict) -> None:
    # configure() takes the ROOT config object and reads config.costs
    budget_bridge.configure(SimpleNamespace(costs=SimpleNamespace(
        budgets_enabled=True,
        budgets={name: SimpleNamespace(**caps) for name, caps in scope_caps.items()},
    )))


@pytest.fixture(autouse=True)
def _restore_default_state():
    yield
    budget_bridge.configure(SimpleNamespace(budgets_enabled=False, budgets={}))


def test_disabled_by_default_allows_everything() -> None:
    budget_bridge.configure(SimpleNamespace(costs=SimpleNamespace(budgets_enabled=False, budgets={})))
    provider = _FakeProvider(usage={"input_tokens": 10, "output_tokens": 5})
    brain = meter_brain(provider, "fixture")

    async def _run() -> None:
        for _ in range(5):
            async for _delta in brain.complete(_req()):
                pass

    asyncio.run(_run())
    assert provider.calls == 5


def test_request_cap_blocks_second_dispatch_at_the_production_door() -> None:
    _configure(**{"voice-turn": {"max_requests": 1}})
    provider = _FakeProvider(usage={"input_tokens": 10, "output_tokens": 5})
    brain = meter_brain(provider, "fixture")

    async def _one() -> None:
        with usage_context("voice-turn"):
            async for _delta in brain.complete(_req()):
                pass

    async def _two() -> None:
        await _one()
        from jarvis.costs.budgets import BudgetExceeded

        with pytest.raises(BudgetExceeded):
            await _one()

    asyncio.run(_two())
    # the second request NEVER reached the provider
    assert provider.calls == 1
    reasons = budget_bridge.stopped_reasons()
    assert reasons and reasons[-1]["scope"] == "voice-turn"


def test_token_cap_blocks_before_dispatch_using_production_estimate() -> None:
    _configure(**{"voice-turn": {"max_tokens": 100}})
    provider = _FakeProvider(usage={"input_tokens": 5, "output_tokens": 5})
    brain = meter_brain(provider, "fixture")
    long_prompt = "x" * 1000  # estimate ≈ 256 + 250 > 100

    async def _run() -> None:
        from jarvis.costs.budgets import BudgetExceeded

        with pytest.raises(BudgetExceeded):
            with usage_context("voice-turn"):
                async for _delta in brain.complete(_req(long_prompt)):
                    pass

    asyncio.run(_run())
    assert provider.calls == 0  # blocked BEFORE the provider call


def test_measured_usage_settles_the_production_escrow() -> None:
    _configure(**{"voice-turn": {"max_tokens": 1000}})
    provider = _FakeProvider(usage={"input_tokens": 90, "output_tokens": 10})
    brain = meter_brain(provider, "fixture")

    async def _run() -> None:
        # first call: estimate held ~256+; measured 100 replaces it
        with usage_context("voice-turn"):
            async for _delta in brain.complete(_req("a" * 400)):
                pass
        # second call fits again under the 1000 cap
        with usage_context("voice-turn"):
            async for _delta in brain.complete(_req("b" * 400)):
                pass

    asyncio.run(_run())
    assert provider.calls == 2
    usage = budget_bridge.report()["scopes"]["voice-turn"]["usage"]
    assert usage["tokens_measured"] == 200


def test_stream_failure_still_settles_and_counts_the_attempt() -> None:
    _configure(**{"voice-turn": {"max_requests": 3}})
    provider = _FakeProvider(usage={"input_tokens": 7, "output_tokens": 3},
                             fail_after_yield=True)
    brain = meter_brain(provider, "fixture")

    async def _run() -> None:
        for _ in range(3):
            with usage_context("voice-turn"):
                with pytest.raises(RuntimeError):
                    async for _delta in brain.complete(_req()):
                        pass

    asyncio.run(_run())
    assert provider.calls == 3
    usage = budget_bridge.report()["scopes"]["voice-turn"]["usage"]
    assert usage["tokens_measured"] == 30
    # the 4th attempt is blocked
    from jarvis.costs.budgets import BudgetExceeded

    async def _fourth() -> None:
        with usage_context("voice-turn"):
            with pytest.raises(BudgetExceeded):
                async for _delta in brain.complete(_req()):
                    pass

    asyncio.run(_fourth())
    assert provider.calls == 3


def test_usage_less_provider_releases_escrow_request_cap_still_binds() -> None:
    _configure(**{"voice-turn": {"max_requests": 2}})
    provider = _FakeProvider(usage=None)  # never reports usage
    brain = meter_brain(provider, "fixture")

    async def _run() -> None:
        for _ in range(2):
            with usage_context("voice-turn"):
                async for _delta in brain.complete(_req()):
                    pass

    asyncio.run(_run())
    usage = budget_bridge.report()["scopes"]["voice-turn"]["usage"]
    assert usage["tokens_measured"] == 0
    assert usage["tokens_reserved"] == 0  # escrow released, disclosed limitation
    assert usage["requests"] == 2


def test_concurrent_dispatch_cannot_race_past_the_cap_through_the_door() -> None:
    _configure(**{"voice-turn": {"max_tokens": 100}})
    provider = _FakeProvider(usage={"input_tokens": 5, "output_tokens": 5})
    brain = meter_brain(provider, "fixture")
    entered: list[int] = []

    async def _worker() -> None:
        try:
            with usage_context("voice-turn"):
                async for _delta in brain.complete(_req("p" * 300)):  # est > 100/2
                    entered.append(1)
        except Exception:
            pass

    async def _run() -> None:
        await asyncio.gather(*[_worker() for _ in range(5)])

    asyncio.run(_run())
    # at most 2 of the 5 concurrent requests may pass the 100-token cap
    assert provider.calls <= 2
    assert len(entered) <= 2


def test_mission_callers_share_the_mission_scope() -> None:
    _configure(**{"mission": {"max_requests": 1}})
    provider = _FakeProvider(usage={"input_tokens": 1, "output_tokens": 1})
    brain = meter_brain(provider, "fixture")

    async def _run() -> None:
        from jarvis.costs.ledger import usage_context
        from jarvis.costs.budgets import BudgetExceeded

        with usage_context("mission-worker"):
            async for _delta in brain.complete(_req()):
                pass
            with pytest.raises(BudgetExceeded):
                async for _delta in brain.complete(_req()):
                    pass
        # the critic hits the same shared mission budget
        with usage_context("mission-critic"):
            with pytest.raises(BudgetExceeded):
                async for _delta in brain.complete(_req()):
                    pass

    asyncio.run(_run())
    assert provider.calls == 1


def test_default_scope_guards_every_caller() -> None:
    _configure(**{"default": {"max_requests": 1}})
    provider = _FakeProvider(usage={"input_tokens": 1, "output_tokens": 1})
    brain = meter_brain(provider, "fixture")

    async def _run() -> None:
        from jarvis.costs.ledger import usage_context
        from jarvis.costs.budgets import BudgetExceeded

        with usage_context("agent-chat"):
            async for _delta in brain.complete(_req()):
                pass
        with usage_context("computer-use"):
            with pytest.raises(BudgetExceeded):
                async for _delta in brain.complete(_req()):
                    pass

    asyncio.run(_run())
    assert provider.calls == 1


def test_realistic_production_request_shape_is_estimated() -> None:
    req = _req("a" * 400)  # user message 400 chars + system 14 chars
    estimate = budget_bridge.estimate_tokens_for(req)
    assert estimate == 256 + (400 + len("You are Sam.")) // 4
