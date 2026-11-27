"""Kayock Voice integration tests (Road Dog v1.3.0 §2).

Deterministic HTTP fixtures implement the ACTUAL Kayock Voice contracts
(verified against the Kayock-Voice repository): the OpenAI speech adapter on
:8768 (POST /v1/audio/speech, GET /v1/voices, GET /v1/models, GET /v1/health)
and the Faster-Whisper STT service on :8769 (POST /v1/audio/transcriptions,
health where 404 counts as up). Providers are built through the PRODUCTION
factories (build_tts_from_config / build_stt_from_config), not constructed
directly, so the config→plugin path is what gets exercised.
"""
from __future__ import annotations

import asyncio
import io
import json
import threading
import wave
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any
from urllib.parse import urlparse

import pytest

from jarvis.core.protocols import AudioChunk
from jarvis.plugins.stt.kayock_stt import KayockSTT
from jarvis.plugins.tts.kayock_tts import (
    KayockTTS,
    normalize_speech_base,
    split_sentences,
)


def _tiny_wav(sample_rate: int = 16_000, seconds: float = 0.05) -> bytes:
    import math

    buffer = io.BytesIO()
    with wave.open(buffer, "wb") as writer:
        writer.setnchannels(1)
        writer.setsampwidth(2)
        writer.setframerate(sample_rate)
        frames = int(sample_rate * seconds)
        writer.writeframes(b"".join(
            int(8000 * math.sin(2 * math.pi * 440 * i / sample_rate)).to_bytes(
                2, "little", signed=True).ljust(2, b"\x00")
            for i in range(frames)))
    return buffer.getvalue()


class KayockTTSFixture:
    """The OpenAI speech adapter contract on an ephemeral port."""

    def __init__(self) -> None:
        self.requests: list[dict[str, Any]] = []
        self.lock = threading.Lock()
        self.voices = ["af_heart", "am_adam", "am_fenrir", "data", "picard"]
        self.speak_fail = False
        self._server = ThreadingHTTPServer(("127.0.0.1", 0), self._make())
        self._thread = threading.Thread(target=self._server.serve_forever, daemon=True)
        self._thread.start()

    @property
    def base_url(self) -> str:
        host, port = self._server.server_address[:2]
        return f"http://{host}:{port}"

    def stop(self) -> None:
        self._server.shutdown()
        self._server.server_close()

    def recorded(self) -> list[dict[str, Any]]:
        with self.lock:
            return list(self.requests)

    def _make(self):  # noqa: ANN202
        outer = self

        class Handler(BaseHTTPRequestHandler):
            def log_message(self, *args: Any) -> None:
                return

            def _json(self, payload: Any, status: int = 200) -> None:
                raw = json.dumps(payload).encode()
                self.send_response(status)
                self.send_header("Content-Type", "application/json")
                self.send_header("Content-Length", str(len(raw)))
                self.end_headers()
                self.wfile.write(raw)

            def _audio(self) -> None:
                length = int(self.headers.get("Content-Length") or 0)
                raw = self.rfile.read(length) if length else b"{}"
                try:
                    body = json.loads(raw)
                except json.JSONDecodeError:
                    body = {}
                with outer.lock:
                    outer.requests.append({"path": self.path, "body": body,
                                           "auth": self.headers.get("Authorization")})
                if outer.speak_fail:
                    self._json({"error": "kokoro engine busy"}, status=503)
                    return
                audio = _tiny_wav()
                self.send_response(200)
                self.send_header("Content-Type", "audio/wav")
                self.send_header("Content-Length", str(len(audio)))
                self.end_headers()
                self.wfile.write(audio)

            def do_GET(self) -> None:  # noqa: N802
                path = urlparse(self.path).path
                with outer.lock:
                    outer.requests.append({"path": path, "body": None})
                if path == "/v1/voices":
                    self._json({"data": [{"voice": v} for v in outer.voices]})
                elif path == "/v1/models":
                    self._json({"data": [{"id": v} for v in outer.voices]})
                elif path == "/v1/health":
                    self._json({"ok": True, "upstream": "kokoro+rvc"})
                else:
                    self._json({"error": "not found"}, status=404)

            def do_POST(self) -> None:  # noqa: N802
                if urlparse(self.path).path == "/v1/audio/speech":
                    self._audio()
                else:
                    self._json({"error": "not found"}, status=404)

        return Handler


class KayockSTTFixture:
    """The Faster-Whisper transcription service contract."""

    def __init__(self) -> None:
        self.requests: list[dict[str, Any]] = []
        self.lock = threading.Lock()
        self.transcript = "hello road dog"
        self._server = ThreadingHTTPServer(("127.0.0.1", 0), self._make())
        self._thread = threading.Thread(target=self._server.serve_forever, daemon=True)
        self._thread.start()

    @property
    def base_url(self) -> str:
        host, port = self._server.server_address[:2]
        return f"http://{host}:{port}"

    def stop(self) -> None:
        self._server.shutdown()
        self._server.server_close()

    def recorded(self) -> list[dict[str, Any]]:
        with self.lock:
            return list(self.requests)

    def _make(self):  # noqa: ANN202
        outer = self

        class Handler(BaseHTTPRequestHandler):
            def log_message(self, *args: Any) -> None:
                return

            def do_GET(self) -> None:  # noqa: N802
                path = urlparse(self.path).path
                with outer.lock:
                    outer.requests.append({"path": path, "body": None})
                # /health answers 404 on the real service — 404 counts as UP
                self.send_response(404)
                self.end_headers()
                self.wfile.write(b"{}")

            def do_POST(self) -> None:  # noqa: N802
                length = int(self.headers.get("Content-Length") or 0)
                raw = self.rfile.read(length) if length else b""
                ctype = self.headers.get("Content-Type", "")
                fields: dict[str, str] = {}
                if "multipart/form-data" in ctype and raw:
                    boundary = ctype.split("boundary=")[-1].encode()
                    for part in raw.split(b"--" + boundary):
                        if b"name=\"" not in part:
                            continue
                        name = part.split(b"name=\"")[1].split(b"\"")[0].decode()
                        _, _, payload = part.partition(b"\r\n\r\n")
                        payload = payload.rsplit(b"\r\n", 1)[0]
                        fields[name] = (payload[:200] if name == "file"
                                        else payload.decode("utf-8", "replace"))
                with outer.lock:
                    outer.requests.append({"path": self.path, "fields": fields})
                self.send_response(200)
                body = json.dumps({"text": outer.transcript}).encode()
                self.send_header("Content-Type", "application/json")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)

        return Handler


def test_url_normalization_matches_the_reference_dialect() -> None:
    assert normalize_speech_base("http://10.0.0.45:8768") == "http://10.0.0.45:8768/v1"
    assert normalize_speech_base("http://10.0.0.45:8768/v1") == "http://10.0.0.45:8768/v1"
    assert normalize_speech_base(
        "http://10.0.0.45:8768/v1/audio/speech") == "http://10.0.0.45:8768/v1"
    assert normalize_speech_base(
        "http://10.0.0.45:8769/v1/audio/transcriptions") == "http://10.0.0.45:8769/v1"


def test_sentence_split_for_chunked_synthesis() -> None:
    assert split_sentences("Hello there. How is the road? Great!") == \
        ["Hello there.", "How is the road?", "Great!"]
    assert split_sentences("no terminator here") == ["no terminator here"]
    assert split_sentences("") == []


def test_tts_synthesis_through_the_production_factory() -> None:
    """build_tts_from_config(provider='kayock') → real HTTP synthesis."""
    from types import SimpleNamespace

    from jarvis.plugins.tts import build_tts_from_config

    server = KayockTTSFixture()
    try:
        cfg = SimpleNamespace(
            provider="kayock", model=None, voice_en=None, voice_de=None,
            language_code="en-US", speed=1.0, allow_sapi5_fallback=False,
            model_extra={"kayock": {"base_url": server.base_url,
                                    "voice": "am_adam"}},
            kayock_base_url="", kayock_voice="",
        )
        provider = build_tts_from_config(cfg)
        assert isinstance(provider, KayockTTS)
        assert provider.endpoint.endswith("/v1")

        async def _run() -> list[AudioChunk]:
            return [chunk async for chunk in provider.synthesize("Guten Morgen")]

        chunks = asyncio.run(_run())
        assert chunks and chunks[0].sample_rate == 16_000 and chunks[0].pcm
        calls = [c for c in server.recorded() if c["path"] == "/v1/audio/speech"]
        assert calls, "no real HTTP request reached the adapter"
        body = calls[0]["body"]
        assert body["voice"] == "am_adam"  # male voice for Sam
        assert body["response_format"] == "wav"
        assert body["input"] == "Guten Morgen"
    finally:
        server.stop()


def test_tts_voice_discovery_prefers_voices_then_models() -> None:
    server = KayockTTSFixture()
    try:
        tts = KayockTTS(base_url=server.base_url)

        async def _run() -> tuple[list[str], str | None]:
            return await tts.list_voices()

        voices, error = asyncio.run(_run())
        assert error is None
        assert "am_adam" in voices and "picard" in voices  # kokoro + piper ids
        paths = [c["path"] for c in server.recorded()]
        assert "/v1/voices" in paths  # preferred endpoint used
    finally:
        server.stop()


def test_tts_healthcheck_and_warm_up() -> None:
    server = KayockTTSFixture()
    try:
        tts = KayockTTS(base_url=server.base_url)

        async def _run() -> tuple[bool, bool]:
            healthy = await tts.healthcheck()
            warmed = await tts.warm_up()
            return healthy, warmed

        healthy, warmed = asyncio.run(_run())
        assert healthy is True
        assert warmed is True
        warm_calls = [c for c in server.recorded()
                      if c["path"] == "/v1/audio/speech" and
                      c["body"]["input"] == "Road Dog is ready."]
        assert warm_calls  # the cold-start synthesis happened
    finally:
        server.stop()


def test_tts_failure_is_honest_and_never_falls_back_to_paid() -> None:
    server = KayockTTSFixture()
    server.speak_fail = True
    try:
        tts = KayockTTS(base_url=server.base_url)

        async def _run() -> None:
            with pytest.raises(RuntimeError, match="Kayock Voice synthesis failed"):
                async for _chunk in tts.synthesize("hello"):
                    pass

        asyncio.run(_run())
        assert "503" in (tts.last_error or "")
        # the ONLY outbound calls went to the configured Kayock endpoint —
        # no commercial speech provider was ever contacted
        assert all("audio/speech" in c["path"] or c["path"] in
                   ("/v1/voices", "/v1/models", "/v1/health")
                   for c in server.recorded())
    finally:
        server.stop()


def test_stt_transcription_through_the_production_factory() -> None:
    from types import SimpleNamespace

    from jarvis.plugins.stt import build_stt_from_config

    server = KayockSTTFixture()
    try:
        cfg = SimpleNamespace(
            provider="kayock", model="base.en", language="en",
            model_extra={"kayock": {"base_url": server.base_url}},
            kayock_base_url="",
        )
        provider = build_stt_from_config(cfg, dictionary_bias=False)
        assert isinstance(provider, KayockSTT)

        async def _run() -> tuple:
            text = await provider.transcribe_pcm(
                b"\x01\x00" * 800, sample_rate=16_000)
            chunks = iter([AudioChunk(pcm=b"\x01\x00" * 400, sample_rate=16_000,
                                      timestamp_ns=0, channels=1)])

            async def _gen():
                yield chunks.__next__()

            transcript = await provider.transcribe(_gen())
            return text, transcript

        text, transcript = asyncio.run(_run())
        assert text.text == "hello road dog"
        assert transcript.text == "hello road dog"
        calls = [c for c in server.recorded() if c["path"] == "/v1/audio/transcriptions"]
        assert calls and calls[0]["fields"].get("model") == "base.en"
    finally:
        server.stop()


def test_stt_health_counts_404_as_up_like_the_reference_client() -> None:
    server = KayockSTTFixture()
    try:
        stt = KayockSTT(base_url=server.base_url)

        async def _run() -> bool:
            return await stt.healthcheck()

        assert asyncio.run(_run()) is True  # the fixture answers 404 — still UP
    finally:
        server.stop()


def test_stt_service_down_is_honest() -> None:
    # a port nothing listens on
    stt = KayockSTT(base_url="http://127.0.0.1:1")

    async def _run() -> tuple[bool, str]:
        healthy = await stt.healthcheck()
        transcript = await stt.transcribe_pcm(b"\x00\x00" * 100, sample_rate=16_000)
        return healthy, transcript.text

    healthy, text = asyncio.run(_run())
    assert healthy is False
    assert text == ""  # empty transcript + last_error, never a crash
    assert "unreachable" in (stt.last_error or "").lower() or stt.last_error


def test_kayock_status_route_reports_both_services(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch,
) -> None:
    from fastapi import FastAPI
    from fastapi.testclient import TestClient

    from jarvis.ui.web.kayock_voice_routes import router

    config_path = tmp_path / "jarvis.toml"
    monkeypatch.setenv("JARVIS_CONFIG", str(config_path))
    tts_server = KayockTTSFixture()
    stt_server = KayockSTTFixture()
    try:
        config_path.write_text(
            '[tts]\nprovider = "kayock"\n'
            f'[tts.kayock]\nbase_url = "{tts_server.base_url}"\nvoice = "am_adam"\n'
            '[stt]\nprovider = "kayock"\n'
            f'[stt.kayock]\nbase_url = "{stt_server.base_url}"\n',
            encoding="utf-8",
        )
        app = FastAPI()
        app.include_router(router)
        client = TestClient(app)
        status = client.get("/api/voice/kayock/status").json()
        assert status["provider"] == "kayock"
        assert status["tts"]["reachable"] is True
        assert "am_adam" in status["tts"]["voices"]
        assert status["stt"]["reachable"] is True
    finally:
        tts_server.stop()
        stt_server.stop()
