"""Kayock Voice TTS provider — Road Dog v1.3.0 §2.

Speaks through the user's EXISTING Kayock Voice OpenAI speech adapter
(``http://<lan-host>:8768/v1``). Contract (verified against the Kayock-Voice
repository, adapter.py / server.py):

* ``POST /v1/audio/speech`` ``{model, input, voice, response_format, speed}``
  → audio bytes (wav requested — the adapter converts server-side via
  ffmpeg, so Road Dog needs no local ffmpeg).
* ``GET /v1/voices`` (preferred) or ``GET /v1/models`` → inventory in any
  OpenAI-ish shape (``{"data":[{"id":...}]}``, a bare list, or entries with
  ``voice``/``voice_id``/``id``/``name`` keys). Kokoro ids look like
  ``am_adam`` (male) / ``af_heart``; optional Piper/RVC specials surface too.
* ``GET /v1/health`` → adapter + upstream status.

Strictly additive: this provider only CALLS the service. It never launches,
stops, restarts or reconfigures anything, never downloads models, and never
falls back to a paid provider — when Kayock is unreachable, synthesis fails
with an honest error and ``last_error`` carries the cause.
"""
from __future__ import annotations

import io
import logging
import re
import time
import wave
from collections.abc import AsyncIterator
from typing import Any

import httpx

from jarvis.core.protocols import AudioChunk

log = logging.getLogger(__name__)

_SENTENCE_RE = re.compile(r"(?<=[.!?])\s+")


def normalize_speech_base(url: str) -> str:
    """'http://host:8768', '.../v1' or a full endpoint paste → '/v1' base."""
    base = (url or "").strip().rstrip("/")
    if not base:
        return ""
    for suffix in ("/audio/speech", "/audio/transcriptions", "/chat/completions"):
        if base.endswith(suffix):
            base = base[: -len(suffix)]
            break
    if not base.endswith("/v1"):
        base += "/v1"
    return base


def split_sentences(text: str) -> list[str]:
    """Sentence-split for chunked (latency-friendly) synthesis."""
    parts = [p.strip() for p in _SENTENCE_RE.split(text or "") if p.strip()]
    return parts or ([text.strip()] if (text or "").strip() else [])


def _wav_to_pcm_chunks(data: bytes, *, chunk_frames: int = 8192) -> list[AudioChunk]:
    """Decode a WAV payload from the adapter into PCM AudioChunks."""
    import time as _time

    with wave.open(io.BytesIO(data), "rb") as reader:
        sample_rate = reader.getframerate()
        channels = reader.getnchannels()
        sampwidth = reader.getsampwidth()
        if sampwidth != 2:
            raise RuntimeError(
                f"Kayock adapter returned {sampwidth * 8}-bit PCM; Road Dog "
                "requests 16-bit WAV — unexpected server response."
            )
        frames = reader.readframes(reader.getnframes())
    frame_bytes = 2 * max(channels, 1)
    now = _time.time_ns()
    chunks: list[AudioChunk] = []
    for start in range(0, len(frames), frame_bytes * chunk_frames):
        pieces = frames[start:start + frame_bytes * chunk_frames]
        if len(pieces) % frame_bytes:
            pieces = pieces[: len(pieces) - (len(pieces) % frame_bytes)]
        chunks.append(AudioChunk(pcm=pieces, sample_rate=sample_rate,
                                 timestamp_ns=now, channels=channels))
    return chunks


class KayockTTS:
    """TTS provider speaking through the user's Kayock Voice adapter."""

    name = "kayock"
    keyless = True

    def __init__(
        self,
        base_url: str,
        voice: str = "am_adam",
        model: str = "kokoro",
        response_format: str = "wav",
        speed: float = 1.0,
        api_key: str = "",
        timeout: float = 45.0,
        voice_cache_seconds: float = 300.0,
        transport: Any | None = None,
    ) -> None:
        self.endpoint = normalize_speech_base(base_url)
        if not self.endpoint:
            raise RuntimeError(
                "Kayock TTS configured without a base URL. Set "
                "[tts.kayock] base_url (e.g. http://10.0.0.45:8768) in "
                "jarvis.toml or the Road Dog settings panel."
            )
        self.voice = voice
        self.model = model
        self.response_format = response_format
        self.speed = speed
        self._client = httpx.AsyncClient(
            base_url=self.endpoint,
            headers={"Authorization": f"Bearer {api_key}"} if api_key else {},
            timeout=timeout,
            transport=transport,
        )
        self._voices: list[str] | None = None
        self._voices_ts = 0.0
        self._voice_cache_seconds = voice_cache_seconds
        self._voices_error: str | None = None
        self._last_error: str | None = None
        self._warmed = False

    # -- discovery + health ---------------------------------------------------

    async def list_voices(self, force: bool = False) -> tuple[list[str], str | None]:
        """(voice_ids, error) — discovered live, briefly cached."""
        now = time.monotonic()
        if (not force and self._voices is not None
                and now - self._voices_ts < self._voice_cache_seconds):
            return self._voices, self._voices_error
        try:
            data = None
            last_exc: Exception | None = None
            for path in ("/voices", "/models"):
                try:
                    resp = await self._client.get(path)
                    if resp.status_code == 404:
                        continue
                    resp.raise_for_status()
                    data = resp.json()
                    break
                except Exception as exc:  # noqa: BLE001 — try the next path
                    last_exc = exc
                    continue
            if data is None:
                raise last_exc or RuntimeError("no voice discovery endpoint")
            items = data.get("data", []) if isinstance(data, dict) else data
            if not isinstance(items, list):
                items = []
            ids: list[str] = []
            for item in items:
                if isinstance(item, str):
                    ids.append(item)
                elif isinstance(item, dict):
                    for key in ("voice", "voice_id", "id", "name"):
                        if item.get(key):
                            ids.append(str(item[key]))
                            break
            self._voices = sorted({i for i in ids if i})
            self._voices_ts = now
            self._voices_error = None
        except Exception as exc:  # noqa: BLE001 — honesty over silence
            self._voices_error = f"voice discovery failed: {exc}"[:200]
            if self._voices is None:
                self._voices = []
        return self._voices, self._voices_error

    async def healthcheck(self) -> bool:
        try:
            resp = await self._client.get("/health")
            return resp.status_code < 500
        except httpx.HTTPError:
            return False

    async def warm_up(self) -> bool:
        """One small synthesis so the first real reply is not cold.

        Kokoro lazily loads ONNX weights — a cold synthesis can take tens of
        seconds. Calling this at pipeline start (or on demand) keeps the user's
        first spoken turn fast. Honest return: True only when audio came back.
        """
        if self._warmed:
            return True
        try:
            resp = await self._client.post("/audio/speech", json={
                "model": self.model, "input": "Road Dog is ready.",
                "voice": self.voice, "response_format": self.response_format,
            })
            resp.raise_for_status()
            self._warmed = bool(resp.content)
            self._last_error = None
        except Exception as exc:  # noqa: BLE001 — a failed warm-up is honest info
            self._last_error = f"warm-up failed: {exc}"[:200]
        return self._warmed

    # -- synthesis -------------------------------------------------------------

    async def synthesize(
        self,
        text: str,
        voice: str | None = None,
        language_code: str | None = None,
    ) -> AsyncIterator[AudioChunk]:
        """Speak *text* through the adapter; yields PCM AudioChunks."""
        spoken = (text or "").strip()
        if not spoken:
            return
        body: dict[str, Any] = {
            "model": self.model,
            "input": spoken,
            "voice": voice or self.voice,
            "response_format": self.response_format,
        }
        if self.speed and self.speed != 1.0:
            body["speed"] = self.speed
        try:
            resp = await self._client.post("/audio/speech", json=body)
            resp.raise_for_status()
            self._last_error = None
        except Exception as exc:  # noqa: BLE001 — honest failure, no paid fallback
            self._last_error = f"speech adapter error: {exc}"[:200]
            raise RuntimeError(
                f"Kayock Voice synthesis failed ({exc}); check the Kayock "
                "Voice service and the Road Dog voice diagnostics."
            ) from exc
        data = resp.content
        if not data:
            raise RuntimeError("Kayock Voice returned empty audio.")
        for chunk in _wav_to_pcm_chunks(data):
            yield chunk

    async def synthesize_sentences(
        self, text: str, voice: str | None = None,
    ) -> AsyncIterator[AudioChunk]:
        """Sentence-split synthesis: audio starts flowing after the FIRST
        sentence instead of after the whole reply (latency management)."""
        for sentence in split_sentences(text):
            async for chunk in self.synthesize(sentence, voice=voice):
                yield chunk

    # -- bookkeeping ------------------------------------------------------------

    def set_voice(self, voice_id: str) -> None:
        self.voice = voice_id

    @property
    def last_error(self) -> str | None:
        return self._last_error

    @property
    def media_type(self) -> str:
        return "audio/mpeg" if self.response_format == "mp3" else "audio/wav"

    async def close(self) -> None:
        await self._client.aclose()


def kayock_tts_from_config(tts_cfg: Any) -> KayockTTS:
    """Build the provider from ``[tts] provider="kayock"`` + ``[tts.kayock]``."""
    extra = getattr(tts_cfg, "model_extra", None) or {}
    table = dict(extra.get("kayock") or {})
    base_url = str(table.get("base_url") or getattr(tts_cfg, "kayock_base_url", "") or "")
    return KayockTTS(
        base_url=base_url,
        voice=str(table.get("voice") or getattr(tts_cfg, "kayock_voice", "am_adam")),
        model=str(table.get("model") or "kokoro"),
        response_format=str(table.get("response_format") or "wav"),
        speed=float(table.get("speed") or getattr(tts_cfg, "speed", 1.0) or 1.0),
        api_key=str(table.get("api_key") or ""),
        timeout=float(table.get("timeout_s") or 45.0),
    )
