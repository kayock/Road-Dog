"""The zero-spend local-endpoint test step for onboarding (v1.1.0 §8)."""
from __future__ import annotations

from fastapi import FastAPI
from fastapi.testclient import TestClient

from jarvis.diagnostics.model_profile import EndpointProfile
from jarvis.ui.web import onboarding_routes


def _client() -> TestClient:
    app = FastAPI()
    app.include_router(onboarding_routes.router)
    return TestClient(app)


def test_local_endpoint_step_is_metadata_only(monkeypatch) -> None:
    calls: list[str] = []

    def fake_profile(base_url: str, *, timeout_s: float = 4.0, fetch=None):
        calls.append(base_url)
        return EndpointProfile(
            base_url=base_url, flavor="ollama", reachable=True,
            models=[type("M", (), {"to_dict": lambda self: {
                "name": "qwen3.5:7b", "context_window": 32768,
                "tool_calling": "unknown", "vision": "unknown",
                "source": "api/tags"}})()],
        )

    monkeypatch.setattr(
        "jarvis.diagnostics.model_profile.profile_local_endpoint", fake_profile)
    client = _client()
    res = client.post("/api/onboarding/test-local-endpoint",
                      json={"base_url": "http://localhost:11434"})
    assert res.status_code == 200
    body = res.json()
    assert body["ok"] is True
    assert body["profile"]["reachable"] is True
    # zero spend: no real network call left this test
    assert calls == ["http://localhost:11434"]
