"""Deterministic local inference fixture — a real HTTP server for tests.

Serves the OpenAI-compatible surface (``/v1/models``, ``/v1/chat/completions``
with SSE streaming and non-streaming JSON) and the Ollama surface
(``/api/tags``, ``/api/show``) on an ephemeral localhost port. Records every
request (path, body, headers) so tests can assert REAL request construction —
model selection, streaming mode, tool transport — without any paid API and
without launching any real inference server.

This is a TEST fixture for Road Dog's OWN outbound requests. It never spawns
a model, never downloads weights, and never reconfigures anything: the
production ownership rules are respected by simply not owning a server.
"""
from __future__ import annotations

import json
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any


class InferenceFixtureServer:
    """A scriptable OpenAI-compatible/Ollama fixture on 127.0.0.1:<ephemeral>."""

    def __init__(self) -> None:
        self.requests: list[dict[str, Any]] = []
        self._lock = threading.Lock()
        # the canned chat response: content and/or tool_calls
        self.chat_response: dict[str, Any] = {"content": "fixture says hi"}
        self.models: list[str] = ["fixture-model"]
        self.fail_next_status: int | None = None
        self._server = ThreadingHTTPServer(("127.0.0.1", 0), self._make_handler())
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
        with self._lock:
            return list(self.requests)

    # -- handlers -----------------------------------------------------------

    def _make_handler(self):  # noqa: ANN202 — BaseHTTPRequestHandler factory
        outer = self

        class Handler(BaseHTTPRequestHandler):
            def log_message(self, *args: Any) -> None:  # silence test noise
                return

            def _record(self, body: Any) -> None:
                with outer._lock:
                    outer.requests.append({
                        "path": self.path,
                        "body": body,
                        "auth": self.headers.get("Authorization"),
                    })

            def _json(self, payload: Any, status: int = 200) -> None:
                raw = json.dumps(payload).encode("utf-8")
                self.send_response(status)
                self.send_header("Content-Type", "application/json")
                self.send_header("Content-Length", str(len(raw)))
                self.end_headers()
                self.wfile.write(raw)

            def do_GET(self) -> None:  # noqa: N802 — stdlib API
                self._record(None)
                if self.path.startswith("/v1/models"):
                    self._json({"data": [{"id": m, "object": "model"} for m in outer.models]})
                elif self.path.startswith("/api/tags"):
                    self._json({"models": [{"name": m} for m in outer.models]})
                elif self.path.startswith("/api/show"):
                    self._json({"model_info": {"context_length": 8192},
                                "capabilities": ["tools"]})
                else:
                    self._json({"error": "not found"}, status=404)

            def do_POST(self) -> None:  # noqa: N802 — stdlib API
                length = int(self.headers.get("Content-Length") or 0)
                raw = self.rfile.read(length) if length else b"{}"
                try:
                    body = json.loads(raw)
                except json.JSONDecodeError:
                    body = {"_raw": raw.decode("utf-8", "replace")}
                self._record(body)
                if outer.fail_next_status is not None:
                    self._json({"error": "fixture failure"}, status=outer.fail_next_status)
                    outer.fail_next_status = None
                    return
                if self.path.startswith("/v1/chat/completions"):
                    response = dict(outer.chat_response)
                    if body.get("stream"):
                        self.send_response(200)
                        self.send_header("Content-Type", "text/event-stream")
                        self.end_headers()
                        chunk = {
                            "choices": [{"delta": {"content": response.get("content", "")}}],
                        }
                        self.wfile.write(f"data: {json.dumps(chunk)}\n\n".encode("utf-8"))
                        usage_chunk = {
                            "choices": [{"delta": {}}],
                            "usage": {"prompt_tokens": 12, "completion_tokens": 8},
                        }
                        self.wfile.write(f"data: {json.dumps(usage_chunk)}\n\n".encode("utf-8"))
                        self.wfile.write(b"data: [DONE]\n\n")
                        return
                    self._json({
                        "id": "fixture-1",
                        "choices": [{
                            "message": {
                                "role": "assistant",
                                "content": response.get("content", ""),
                                "tool_calls": response.get("tool_calls"),
                            },
                            "finish_reason": (
                                "tool_calls" if response.get("tool_calls") else "stop"
                            ),
                        }],
                        "usage": {"prompt_tokens": 12, "completion_tokens": 8},
                    })
                    return
                self._json({"error": "not found"}, status=404)

        return Handler


__all__ = ["InferenceFixtureServer"]
