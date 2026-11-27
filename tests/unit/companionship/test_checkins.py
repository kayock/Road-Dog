"""Tests for Sam's optional check-in scheduler (jarvis.companionship.checkins).

Pure-function coverage first (quiet hours, delay computation), then the live
scheduler against a fake bus: publishing cadence, quiet-hour skipping, and
clean shutdown.
"""
from __future__ import annotations

import asyncio
import random
from datetime import datetime
from types import SimpleNamespace
from typing import Any

import pytest

from jarvis.companionship.checkins import (
    DEFAULT_CHECKIN_LINES,
    SamCheckinScheduler,
    SamCheckinSettings,
    in_quiet_hours,
    next_checkin_delay_seconds,
    parse_hhmm,
)
from jarvis.core.events import SamCheckinDue


# ---------------------------------------------------------------------------
# parse_hhmm
# ---------------------------------------------------------------------------


def test_parse_hhmm_accepts_valid_times() -> None:
    assert parse_hhmm("22:00") is not None
    assert parse_hhmm("08:30").minute == 30
    assert parse_hhmm("0:00").hour == 0


@pytest.mark.parametrize("value", ["", "22", "24:00", "12:60", "ab:cd", "12-30"])
def test_parse_hhmm_rejects_garbage(value: str) -> None:
    with pytest.raises(ValueError):
        parse_hhmm(value)


# ---------------------------------------------------------------------------
# in_quiet_hours
# ---------------------------------------------------------------------------


def test_quiet_hours_normal_window() -> None:
    assert in_quiet_hours(datetime(2026, 1, 1, 14, 0), "13:00", "15:00")
    assert not in_quiet_hours(datetime(2026, 1, 1, 16, 0), "13:00", "15:00")


def test_quiet_hours_wrap_midnight() -> None:
    assert in_quiet_hours(datetime(2026, 1, 1, 23, 30), "22:00", "08:00")
    assert in_quiet_hours(datetime(2026, 1, 1, 3, 0), "22:00", "08:00")
    assert not in_quiet_hours(datetime(2026, 1, 1, 12, 0), "22:00", "08:00")


def test_quiet_hours_disabled_when_boundary_empty() -> None:
    assert not in_quiet_hours(datetime(2026, 1, 1, 3, 0), "", "08:00")
    assert not in_quiet_hours(datetime(2026, 1, 1, 3, 0), "22:00", "")


def test_quiet_hours_equal_boundaries_means_always_quiet() -> None:
    assert in_quiet_hours(datetime(2026, 1, 1, 12, 0), "09:00", "09:00")


# ---------------------------------------------------------------------------
# next_checkin_delay_seconds
# ---------------------------------------------------------------------------


def _dt(hour: int, minute: int = 0) -> datetime:
    return datetime(2026, 6, 1, hour, minute)


def test_delay_is_the_interval_outside_quiet_hours() -> None:
    delay = next_checkin_delay_seconds(_dt(10), 120, "22:00", "08:00")
    assert delay == pytest.approx(120 * 60, rel=0.01)


def test_delay_inside_quiet_hours_slides_to_window_end() -> None:
    # 23:00 + 2h = 01:00 → inside 22:00-08:00 → slide to 08:00 next day.
    delay = next_checkin_delay_seconds(_dt(23), 120, "22:00", "08:00")
    due = datetime.fromtimestamp(_dt(23).timestamp() + delay)
    assert (due.hour, due.minute) == (8, 0)


def test_delay_jitter_never_lands_in_quiet_hours() -> None:
    rng = random.Random(7)
    for _ in range(20):
        delay = next_checkin_delay_seconds(
            _dt(9, 30), 120, "22:00", "08:00", jitter_fraction=0.5, rng=rng
        )
        due = datetime.fromtimestamp(_dt(9, 30).timestamp() + delay)
        assert not in_quiet_hours(due, "22:00", "08:00")


def test_delay_rejects_bad_inputs() -> None:
    with pytest.raises(ValueError):
        next_checkin_delay_seconds(_dt(10), 0, "", "")
    with pytest.raises(ValueError):
        next_checkin_delay_seconds(_dt(10), 60, "", "", jitter_fraction=2.0)


# ---------------------------------------------------------------------------
# settings
# ---------------------------------------------------------------------------


class _Sam:
    def __init__(self, **kw: Any) -> None:
        self.checkins_enabled = kw.get("checkins_enabled", False)
        self.checkin_interval_minutes = kw.get("checkin_interval_minutes", 120)
        self.quiet_hours_start = kw.get("quiet_hours_start", "22:00")
        self.quiet_hours_end = kw.get("quiet_hours_end", "08:00")
        self.checkin_lines = kw.get("checkin_lines", [])


def _cfg_with_sam(sam: Any):
    return SimpleNamespace(sam=sam)


def test_settings_default_is_disabled() -> None:
    settings = SamCheckinSettings.from_config(_cfg_with_sam(None))
    assert settings.enabled is False
    assert settings.lines == DEFAULT_CHECKIN_LINES


def test_settings_read_from_config() -> None:
    cfg = _cfg_with_sam(
        _Sam(checkins_enabled=True, checkin_interval_minutes=45, checkin_lines=["  hi  ", ""])
    )
    settings = SamCheckinSettings.from_config(cfg)
    assert settings.enabled is True
    assert settings.interval_minutes == 45
    assert settings.lines == ("hi",)


def test_settings_bad_interval_falls_back() -> None:
    cfg = _cfg_with_sam(_Sam(checkin_interval_minutes="bogus"))
    assert SamCheckinSettings.from_config(cfg).interval_minutes == 120


# ---------------------------------------------------------------------------
# scheduler (live, fake bus)
# ---------------------------------------------------------------------------


class FakeBus:
    def __init__(self) -> None:
        self.published: list[Any] = []

    async def publish(self, event: Any) -> None:
        self.published.append(event)


class FailingBus(FakeBus):
    async def publish(self, event: Any) -> None:
        raise RuntimeError("bus hiccup")


@pytest.mark.asyncio
async def test_scheduler_publishes_canned_lines_and_rotates() -> None:
    bus = FakeBus()
    settings = SamCheckinSettings(enabled=True, interval_minutes=1, lines=("a", "b"))
    sched = SamCheckinScheduler(
        bus, settings, clock=lambda: _dt(10), jitter_fraction=0.0
    )
    for _ in range(3):
        await sched._publish()
    assert [event.message for event in bus.published] == ["a", "b", "a"]
    assert all(isinstance(event, SamCheckinDue) for event in bus.published)


@pytest.mark.asyncio
async def test_scheduler_survives_a_failing_bus() -> None:
    bus = FailingBus()
    settings = SamCheckinSettings(enabled=True, interval_minutes=1)
    sched = SamCheckinScheduler(bus, settings, clock=lambda: _dt(10), jitter_fraction=0.0)
    await sched._publish()
    await sched._publish()
    assert sched.checkins_sent == 0  # nothing recorded, loop still alive


@pytest.mark.asyncio
async def test_scheduler_start_and_stop_are_clean() -> None:
    bus = FakeBus()
    settings = SamCheckinSettings(enabled=True, interval_minutes=100_000)
    sched = SamCheckinScheduler(bus, settings, clock=lambda: _dt(10), jitter_fraction=0.0)
    sched.start()
    assert sched.running
    sched.stop()
    await asyncio.sleep(0)
    assert not sched.running
    sched.stop()  # idempotent
