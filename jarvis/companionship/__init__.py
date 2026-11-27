"""Sam companionship — optional proactive check-ins.

Road Dog's companion Sam can check in on the user between conversations. This
is strictly OPT-IN (``[sam] checkins_enabled``, default off), purely local
(canned Sam lines published on the EventBus — no model call, no network, no
spend), and fully under the user's control:

* configurable interval (``checkin_interval_minutes``),
* quiet hours (``quiet_hours_start`` / ``quiet_hours_end``) — a check-in that
  falls inside the window is skipped, never queued for later,
* no notification while a voice session is active (the UI decides; the event
  carries no obligation).

Personality and memory never override security policy: a check-in is a
notification, never an action — it carries no tool call and no permission.
"""
from jarvis.companionship.checkins import (
    DEFAULT_CHECKIN_LINES,
    SamCheckinScheduler,
    SamCheckinSettings,
    in_quiet_hours,
    next_checkin_delay_seconds,
    parse_hhmm,
)

__all__ = [
    "DEFAULT_CHECKIN_LINES",
    "SamCheckinScheduler",
    "SamCheckinSettings",
    "in_quiet_hours",
    "next_checkin_delay_seconds",
    "parse_hhmm",
]
