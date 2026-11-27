"""Kayock Voice diagnostics (``/api/voice/kayock``) — Road Dog v1.3.0 §2.

GET /status — local-only, zero-spend probes of the user's configured Kayock
services: reachability, discovered voices, last errors. Synthesis and
transcription live in the speech plugins; this surface exists so the settings
panel can show LISTENING/THINKING/SPEAKING-adjacent connection health without
touching any paid service.
"""
from __future__ import annotations

import logging
from typing import Any

from fastapi import APIRouter

log = logging.getLogger(__name__)

router = APIRouter(prefix="/api/voice/kayock", tags=["voice"])


@router.get("/status")
async def kayock_status() -> dict[str, object]:
    from jarvis.plugins.stt.kayock_stt import KayockSTT
    from jarvis.plugins.tts.kayock_tts import kayock_tts_from_config

    from jarvis.core.config import load_config

    try:
        cfg = load_config()
    except Exception as exc:  # noqa: BLE001 — diagnostics must never 500
        return {
            "provider": "kayock",
            "note": "Local-first voice: Kayock Voice on your LAN. No fallback to "
                    "paid speech services is ever performed.",
            "tts": {"configured": False, "error": f"config unavailable: {exc}"[:160]},
            "stt": {"configured": False, "error": f"config unavailable: {exc}"[:160]},
        }
    result: dict[str, object] = {
        "provider": "kayock",
        "note": "Local-first voice: Kayock Voice on your LAN. No fallback to "
                "paid speech services is ever performed.",
        "tts": {"configured": False},
        "stt": {"configured": False},
    }
    try:
        tts_cfg = getattr(cfg, "tts", None)
        tts = kayock_tts_from_config(
            type("View", (), {
                "provider": "kayock",
                "model_extra": {"kayock": dict(
                    (getattr(tts_cfg, "model_extra", None) or {}).get("kayock") or {})},
                "speed": getattr(tts_cfg, "speed", 1.0),
                "kayock_base_url": getattr(tts_cfg, "kayock_base_url", ""),
                "kayock_voice": getattr(tts_cfg, "kayock_voice", "am_adam"),
            })(),
        ) if (getattr(tts_cfg, "model_extra", None) or {}).get("kayock") or \
            getattr(tts_cfg, "kayock_base_url", "") else None
        if tts is not None:
            reachable = await tts.healthcheck()
            voices, voices_error = await tts.list_voices()
            result["tts"] = {
                "configured": True,
                "base_url": tts.endpoint,
                "voice": tts.voice,
                "reachable": reachable,
                "voices": (voices or [])[:64],
                "voices_error": voices_error,
                "last_error": tts.last_error,
            }
    except Exception as exc:  # noqa: BLE001 — diagnostics never throw
        result["tts"] = {"configured": True, "error": str(exc)[:200]}

    try:
        stt_cfg = getattr(cfg, "stt", None)
        extra = (getattr(stt_cfg, "model_extra", None) or {})
        table = dict(extra.get("kayock") or {})
        base_url = str(table.get("base_url") or getattr(stt_cfg, "kayock_base_url", "") or "")
        if base_url:
            stt = KayockSTT(
                base_url=base_url,
                model=str(table.get("model") or "base.en"),
                language=table.get("language") or getattr(stt_cfg, "language", None),
                api_key=str(table.get("api_key") or ""),
            )
            reachable = await stt.healthcheck()
            result["stt"] = {
                "configured": True,
                "base_url": stt.endpoint,
                "reachable": reachable,
                "last_error": stt.last_error,
            }
    except Exception as exc:  # noqa: BLE001 — diagnostics never throw
        result["stt"] = {"configured": True, "error": str(exc)[:200]}

    return result


__all__ = ["router"]
