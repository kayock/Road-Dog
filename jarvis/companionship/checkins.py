"""Sam check-ins — the scheduling core behind optional proactive companionship.

Design notes:

* **Local-only.** A check-in is one canned Sam line published on the EventBus
  as :class:`jarvis.core.events.SamCheckinDue`. The desktop UI surfaces it as
  a notification; nothing here calls a model, spends tokens, or touches a
  tool. Sam's companionship must never bill a key on its own (the project's
  background-work rule).
* **Skipped, never queued.** A check-in due inside quiet hours is dropped;
  the next one is computed from the regular interval afterwards. Buffering
  overnight check-ins would deliver a 7 a.m. pile of stale nudges — worse
  than silence.
* **Boot-critical-path free.** Nothing here runs unless ``[sam]
  checkins_enabled`` is true; the server starts the scheduler as a detached
  task after the app is up (see ``sam_routes.mount_checkin_scheduler``).
"""
from __future__ import annotations

import asyncio
import logging
import random
from dataclasses import dataclass, field
from datetime import datetime, time as dt_time, timedelta
from typing import Callable

log = logging.getLogger(__name__)

DEFAULT_CHECKIN_INTERVAL_MINUTES = 120
DEFAULT_QUIET_HOURS_START = "22:00"
DEFAULT_QUIET_HOURS_END = "08:00"

#: Sam's own lines — written in his voice, short enough to read as a nudge
#: rather than a lecture. The list is user-replaceable in jarvis.toml.
DEFAULT_CHECKIN_LINES: tuple[str, ...] = (
    "You've been grinding for a while. How are you holding up?",
    "Quick pulse check: everything running smooth on your end?",
    "Still with me? Stretch your legs if you haven't in a bit.",
    "Nothing's on fire over here. Wanted to make sure the same is true for you.",
    "Been a minute. Anything you want off your plate?",
)


def parse_hhmm(value: str) -> dt_time:
    """Parse ``HH:MM`` (24-hour) into a time; raises ``ValueError`` when malformed."""
    text = (value or "").strip()
    parts = text.split(":")
    if len(parts) != 2:
        raise ValueError(f"expected HH:MM, got {value!r}")
    hour_s, minute_s = parts
    if not (hour_s.isdigit() and minute_s.isdigit()):
        raise ValueError(f"expected HH:MM, got {value!r}")
    hour, minute = int(hour_s), int(minute_s)
    if not (0 <= hour <= 23 and 0 <= minute <= 59):
        raise ValueError(f"hour/minute out of range: {value!r}")
    return dt_time(hour=hour, minute=minute)


def in_quiet_hours(now: datetime, start: str, end: str) -> bool:
    """True when ``now`` (its clock time) falls inside the quiet-hours window.

    The window may wrap midnight (22:00 → 08:00). An empty start or end
    disables quiet hours entirely. Start == end means "always quiet" — an
    explicit user choice the scheduler honours rather than second-guesses.
    """
    if not start or not end:
        return False
    start_t = parse_hhmm(start)
    end_t = parse_hhmm(end)
    now_t = now.time()
    if start_t == end_t:
        return True
    if start_t < end_t:
        return start_t <= now_t < end_t
    # window wraps midnight
    return now_t >= start_t or now_t < end_t


def next_checkin_delay_seconds(
    now: datetime,
    interval_minutes: int,
    quiet_start: str,
    quiet_end: str,
    *,
    jitter_fraction: float = 0.0,
    rng: random.Random | None = None,
) -> float:
    """Seconds until the next check-in, honouring quiet hours and a cap.

    The first candidate is ``interval_minutes`` from ``now``. When it (or,
    after advancing, any later candidate) lands inside quiet hours, the delay
    extends to the END of the quiet window — the check-in happens when the
    user becomes reachable again, never inside the quiet window itself.
    ``jitter_fraction`` (0..1) spreads the delay so a fleet of clients does
    not nudge in lockstep.
    """
    if interval_minutes <= 0:
        raise ValueError("interval_minutes must be positive")
    if not 0.0 <= jitter_fraction <= 1.0:
        raise ValueError("jitter_fraction must be within 0..1")
    delay = float(interval_minutes * 60)
    if jitter_fraction > 0.0:
        rng = rng or random.Random()
        delay *= 1.0 + rng.uniform(0.0, jitter_fraction)
    # A due-time inside quiet hours slides to the end of the window; a wrapped
    # window slides to the end on the FOLLOWING day boundary.
    for _ in range(3):  # bounded: at most a couple of window hops
        due = now.timestamp() + delay
        due_dt = datetime.fromtimestamp(due)
        if not in_quiet_hours(due_dt, quiet_start, quiet_end):
            return delay
        end_t = parse_hhmm(quiet_end)
        candidate = due_dt.replace(
            hour=end_t.hour, minute=end_t.minute, second=0, microsecond=0
        )
        if candidate <= due_dt:
            # quiet end already passed on this clock — roll to tomorrow
            candidate = (due_dt + timedelta(days=1)).replace(
                hour=end_t.hour, minute=end_t.minute, second=0, microsecond=0
            )
        delay = max(1.0, (candidate - now).total_seconds())
    return delay


@dataclass
class SamCheckinSettings:
    """The ``[sam]`` section, resolved and validated."""

    enabled: bool = False
    interval_minutes: int = DEFAULT_CHECKIN_INTERVAL_MINUTES
    quiet_hours_start: str = DEFAULT_QUIET_HOURS_START
    quiet_hours_end: str = DEFAULT_QUIET_HOURS_END
    lines: tuple[str, ...] = field(default_factory=lambda: DEFAULT_CHECKIN_LINES)

    @classmethod
    def from_config(cls, config: object) -> "SamCheckinSettings":
        """Build settings from a ``JarvisConfig`` (its ``sam`` section, if any)."""
        sam = getattr(config, "sam", None)
        if sam is None:
            return cls()
        lines_raw = getattr(sam, "checkin_lines", None) or list(DEFAULT_CHECKIN_LINES)
        lines = tuple(
            line for line in (str(item).strip() for item in lines_raw) if line
        )
        interval_raw = getattr(sam, "checkin_interval_minutes", DEFAULT_CHECKIN_INTERVAL_MINUTES)
        try:
            interval = max(1, int(interval_raw))
        except (TypeError, ValueError):
            interval = DEFAULT_CHECKIN_INTERVAL_MINUTES
        return cls(
            enabled=bool(getattr(sam, "checkins_enabled", False)),
            interval_minutes=interval,
            quiet_hours_start=str(
                getattr(sam, "quiet_hours_start", DEFAULT_QUIET_HOURS_START) or ""
            ),
            quiet_hours_end=str(
                getattr(sam, "quiet_hours_end", DEFAULT_QUIET_HOURS_END) or ""
            ),
            lines=lines or DEFAULT_CHECKIN_LINES,
        )


class SamCheckinScheduler:
    """Publishes ``SamCheckinDue`` events at the configured cadence.

    Runs as one asyncio task. ``stop()`` cancels it cleanly; the loop never
    lets an exception escape — a failed publish logs and continues, so a bus
    hiccup cannot end companionship.
    """

    def __init__(
        self,
        bus: object,
        settings: SamCheckinSettings,
        *,
        clock: Callable[[], datetime] | None = None,
        rng: random.Random | None = None,
        jitter_fraction: float = 0.02,
    ) -> None:
        self._bus = bus
        self._settings = settings
        self._clock = clock or datetime.now
        self._rng = rng
        self._jitter_fraction = jitter_fraction
        self._task: asyncio.Task | None = None
        self.checkins_sent = 0

    @property
    def running(self) -> bool:
        return self._task is not None and not self._task.done()

    def start(self) -> None:
        if self.running:
            return
        self._task = asyncio.create_task(self._run(), name="sam-checkins")

    def stop(self) -> None:
        if self._task is not None:
            self._task.cancel()
            self._task = None

    async def _run(self) -> None:
        while True:
            now = self._clock()
            delay = next_checkin_delay_seconds(
                now,
                self._settings.interval_minutes,
                self._settings.quiet_hours_start,
                self._settings.quiet_hours_end,
                jitter_fraction=self._jitter_fraction,
                rng=self._rng,
            )
            await asyncio.sleep(delay)
            now = self._clock()
            if in_quiet_hours(
                now, self._settings.quiet_hours_start, self._settings.quiet_hours_end
            ):
                continue  # skipped, never queued
            await self._publish()

    async def _publish(self) -> None:
        from jarvis.core.events import SamCheckinDue

        lines = self._settings.lines or DEFAULT_CHECKIN_LINES
        message = lines[self.checkins_sent % len(lines)]
        try:
            await self._bus.publish(SamCheckinDue(message=message))
            self.checkins_sent += 1
        except Exception:  # noqa: BLE001 — a bus hiccup must not end the loop
            log.exception("SamCheckinDue publish failed; continuing")
