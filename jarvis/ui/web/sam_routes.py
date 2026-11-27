"""Sam companionship routes — read/update the optional check-in settings.

``GET  /api/sam/checkins``  — the resolved settings + Sam's default lines.
``PUT  /api/sam/checkins``  — toggle enable/interval/quiet hours/lines; with
                              ``persist`` the values land in ``[sam]`` of
                              jarvis.toml via the canonical config writer.

The scheduler itself lives in ``jarvis.companionship.checkins``; the server
mounts one instance when the app boots (``mount_checkin_scheduler``) and this
surface restarts it live after a settings change. A check-in is a local
notification — nothing here can spend tokens or touch a tool.
"""
from __future__ import annotations

import logging

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field

from jarvis.companionship.checkins import (
    DEFAULT_CHECKIN_LINES,
    DEFAULT_CHECKIN_INTERVAL_MINUTES,
    DEFAULT_QUIET_HOURS_END,
    DEFAULT_QUIET_HOURS_START,
    SamCheckinScheduler,
    SamCheckinSettings,
    parse_hhmm,
)

log = logging.getLogger(__name__)

router = APIRouter(prefix="/api/sam", tags=["sam"])

#: Mounted by the server after boot; None when check-ins never started.
_scheduler: SamCheckinScheduler | None = None


def mount_checkin_scheduler(bus: object, config: object) -> SamCheckinScheduler | None:
    """Start Sam's check-in scheduler when enabled (post-boot, off critical path).

    Returns the scheduler (for tests) or None when check-ins are disabled.
    Called again after every settings change — the old task is cancelled and a
    fresh one picks up the new settings.
    """
    global _scheduler
    settings = SamCheckinSettings.from_config(config)
    if _scheduler is not None:
        _scheduler.stop()
        _scheduler = None
    if not settings.enabled:
        return None
    if bus is None:
        log.info("Sam check-ins enabled but no EventBus — scheduler not mounted")
        return None
    _scheduler = SamCheckinScheduler(bus, settings)
    _scheduler.start()
    log.info(
        "Sam check-ins on: every %d min, quiet %s-%s",
        settings.interval_minutes,
        settings.quiet_hours_start or "off",
        settings.quiet_hours_end or "off",
    )
    return _scheduler


def stop_checkin_scheduler() -> None:
    """Cancel the scheduler (shutdown path)."""
    global _scheduler
    if _scheduler is not None:
        _scheduler.stop()
        _scheduler = None


def _settings_from_request(request: Request) -> SamCheckinSettings:
    cfg = getattr(request.app.state, "config", None)
    return SamCheckinSettings.from_config(cfg)


class SamCheckinsBody(BaseModel):
    enabled: bool = Field(..., description="Whether Sam checks in proactively")
    interval_minutes: int = Field(..., ge=1, le=24 * 60)
    quiet_hours_start: str = Field(..., description="HH:MM or empty to disable")
    quiet_hours_end: str = Field(..., description="HH:MM or empty to disable")
    checkin_lines: list[str] | None = Field(
        default=None, description="Replacement lines; omit to keep Sam's own"
    )
    persist: bool = Field(default=True)


@router.get("/checkins")
def get_checkins(request: Request) -> dict[str, object]:
    """The resolved check-in settings plus Sam's default lines."""
    settings = _settings_from_request(request)
    return {
        "enabled": settings.enabled,
        "interval_minutes": settings.interval_minutes,
        "quiet_hours_start": settings.quiet_hours_start,
        "quiet_hours_end": settings.quiet_hours_end,
        "checkin_lines": list(settings.lines),
        "default_lines": list(DEFAULT_CHECKIN_LINES),
        "running": bool(_scheduler is not None and _scheduler.running),
    }


@router.put("/checkins")
async def put_checkins(body: SamCheckinsBody, request: Request) -> dict[str, object]:
    """Update the check-in settings; the scheduler restarts live."""
    start = body.quiet_hours_start.strip()
    end = body.quiet_hours_end.strip()
    for label, value in (("quiet_hours_start", start), ("quiet_hours_end", end)):
        if value:
            try:
                parse_hhmm(value)
            except ValueError as exc:
                raise HTTPException(status_code=400, detail=f"{label}: {exc}") from exc

    interval = max(5, int(body.interval_minutes))
    lines = (
        [line.strip() for line in body.checkin_lines if line.strip()]
        if body.checkin_lines is not None
        else None
    )

    if body.persist:
        try:
            from jarvis.core import config_writer
            from jarvis.core.config import resolve_config_path

            config_writer.set_sam_checkins(
                enabled=bool(body.enabled),
                interval_minutes=interval,
                quiet_hours_start=start,
                quiet_hours_end=end,
                checkin_lines=lines,
                path=resolve_config_path(),
            )
        except Exception as exc:  # noqa: BLE001 — persist is best-effort
            log.warning("sam checkins persist failed: %s", exc)

    cfg = getattr(request.app.state, "config", None)
    if cfg is not None and getattr(cfg, "sam", None) is not None:
        try:
            cfg.sam.checkins_enabled = bool(body.enabled)
            cfg.sam.checkin_interval_minutes = interval
            cfg.sam.quiet_hours_start = start
            cfg.sam.quiet_hours_end = end
            if lines is not None:
                cfg.sam.checkin_lines = lines
        except Exception as exc:  # noqa: BLE001 — frozen model is not an error
            log.debug("in-memory cfg.sam update skipped: %s", exc)

    # Restart the live scheduler with the new settings.
    bus = getattr(request.app.state, "bus", None)
    scheduler = mount_checkin_scheduler(bus, cfg)

    return {
        "ok": True,
        "enabled": bool(body.enabled),
        "interval_minutes": interval,
        "quiet_hours_start": start,
        "quiet_hours_end": end,
        "running": bool(scheduler is not None and scheduler.running),
    }


__all__ = [
    "DEFAULT_CHECKIN_INTERVAL_MINUTES",
    "DEFAULT_QUIET_HOURS_END",
    "DEFAULT_QUIET_HOURS_START",
    "mount_checkin_scheduler",
    "router",
    "stop_checkin_scheduler",
]
