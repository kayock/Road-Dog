"""Kayock Voice STT provider — Road Dog v1.3.0 §2.

Transcribes through the user's EXISTING Faster-Whisper service
(``http://<lan-host>:8769/v1``, the kayock-craft-stt systemd unit). Contract
(verified against the Kayock-Voice + Aurora-Companion repositories):

* ``POST /v1/audio/transcriptions`` — multipart ``file`` (webm/opus, wav, …)
  plus optional ``model``/``language`` fields → ``{"text": ...}`` (also
  accepted: ``transcription`` / ``result`` keys).
* Health: ``GET /models`` | ``/health`` | ``/`` — 404 counts as UP (the
  reference client treats any non-5xx as "service reachable").

The service lazy-loads Whisper weights and auto-unloads them; Road Dog simply
sends WAV-encoded PCM and reads the text. Strictly additive: never loads,
unloads or configures the service. No API key on the local interface
(optional Bearer supported). If the service is down, transcription fails
honestly — there is no silent crossing to a paid recognizer.
"""
from __future__ import annotations

import io
import logging
import mimetypes
import wave
from collections.abc import AsyncIterator
from typing import Any

import httpx

from jarvis.core.protocols import AudioChunk, Transcript
from jarvis.plugins.tts.kayock_tts import normalize_speech_base

log = logging.getLogger(__name__)


def _pcm_to_wav(pcm: bytes, sample_rate: int, channels: int = 1) -> bytes:
    """int16 PCM → a 16-bit WAV container the transcription service accepts."""
    buffer = io.BytesIO()
    with wave.open(buffer, "wb") as writer:
        writer.setnchannels(channels)
        writer.setsampwidth(2)
        writer.setframerate(sample_rate)
        writer.writeframes(pcm)
    return buffer.getvalue()


class KayockSTT:
    """STT provider transcribing through the user's Faster-Whisper service."""

    name = "kayock"
    keyless = True

    def __init__(
        self,
        base_url: str,
        model: str = "base.en",
        language: str | None = None,
        api_key: str = "",
        timeout: float = 60.0,
        transport: Any | None = None,
    ) -> None:
        self.endpoint = normalize_speech_base(base_url)
        if not self.endpoint:
            raise RuntimeError(
                "Kayock STT configured without a base URL. Set "
                "[stt.kayock] base_url (e.g. http://10.0.0.45:8769) in "
                "jarvis.toml or the Road Dog settings panel."
            )
        self.model = model
        self.language = language
        self._client = httpx.AsyncClient(
            base_url=self.endpoint,
            headers={"Authorization": f"Bearer {api_key}"} if api_key else {},
            timeout=timeout,
            transport=transport,
        )
        self.available: bool | None = None  # None = not probed yet
        self._last_error: str | None = None

    async def healthcheck(self) -> bool:
        """True when the STT service answers at all (404 also means up)."""
        for path in ("/models", "/health", "/"):
            try:
                resp = await self._client.get(path)
                if resp.status_code < 500:
                    self.available = True
                    self._last_error = None
                    return True
            except httpx.HTTPError:
                continue
        self.available = False
        self._last_error = "transcription service unreachable"
        return False

    async def _transcribe_bytes(
        self, audio_bytes: bytes, filename: str = "speech.wav",
        content_type: str | None = None, language: str | None = None,
    ) -> str:
        ctype = content_type or mimetypes.guess_type(filename)[0] or "audio/wav"
        data: dict[str, Any] = {}
        if self.model:
            data["model"] = self.model
        effective_language = language or self.language
        if effective_language:
            data["language"] = effective_language
        try:
            resp = await self._client.post(
                "/audio/transcriptions",
                files={"file": (filename, audio_bytes, ctype)},
                data=data,
            )
            resp.raise_for_status()
            self.available = True
            self._last_error = None
        except Exception as exc:  # noqa: BLE001 — honest failure
            self.available = False
            self._last_error = f"transcription error: {exc}"[:200]
            return ""
        payload = resp.json()
        text = payload.get("text")
        if text is None and isinstance(payload, dict):
            text = payload.get("transcription") or payload.get("result")
        return str(text or "").strip()

    async def transcribe(self, audio: AsyncIterator[AudioChunk]) -> Transcript:
        """Collects all chunks, transcribes them in one go."""
        sample_rate = 16_000
        channels = 1
        pieces: list[bytes] = []
        async for chunk in audio:
            pieces.append(chunk.pcm)
            sample_rate = chunk.sample_rate
            channels = chunk.channels
        if not pieces:
            return Transcript(text="", language="unknown", confidence=0.0)
        text = await self._transcribe_bytes(
            _pcm_to_wav(b"".join(pieces), sample_rate, channels))
        return Transcript(text=text, language=language_or_unknown(self.language),
                          confidence=1.0 if text else 0.0)

    async def transcribe_pcm(
        self, pcm_bytes: bytes, sample_rate: int = 16_000,
        language: str | None = None,
        ignore_initial_prompt: bool = False,
    ) -> Transcript:
        """Direct path for VAD output: int16 PCM bytes → transcript."""
        del ignore_initial_prompt  # the remote service has no phrase bias
        text = await self._transcribe_bytes(
            _pcm_to_wav(pcm_bytes, sample_rate), language=language)
        return Transcript(text=text, language=language_or_unknown(language or self.language),
                          confidence=1.0 if text else 0.0)

    @property
    def last_error(self) -> str | None:
        return self._last_error

    async def close(self) -> None:
        await self._client.aclose()


def language_or_unknown(language: str | None) -> str:
    return language or "unknown"


def kayock_stt_from_config(stt_cfg: Any) -> KayockSTT:
    """Build the provider from ``[stt] provider="kayock"`` + ``[stt.kayock]``."""
    extra = getattr(stt_cfg, "model_extra", None) or {}
    table = dict(extra.get("kayock") or {})
    return KayockSTT(
        base_url=str(table.get("base_url") or getattr(stt_cfg, "kayock_base_url", "") or ""),
        model=str(table.get("model") or getattr(stt_cfg, "model", "") or "base.en"),
        language=table.get("language") or getattr(stt_cfg, "language", None),
        api_key=str(table.get("api_key") or ""),
        timeout=float(table.get("timeout_s") or 60.0),
    )
