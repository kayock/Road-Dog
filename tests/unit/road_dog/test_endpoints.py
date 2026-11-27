"""Tests for the inference endpoint registry + REST surface (v1.1.0 §2)."""
from __future__ import annotations

import json
from pathlib import Path
from types import SimpleNamespace

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from jarvis.local_models.endpoints import (
    EndpointAlreadyExists,
    EndpointRegistry,
    UnknownEndpoint,
)
from jarvis.ui.web.local_endpoint_routes import router, set_registry


@pytest.fixture()
def registry(tmp_path: Path) -> EndpointRegistry:
    return EndpointRegistry(tmp_path / "endpoints.json")


def test_add_list_update_remove_roundtrip(registry: EndpointRegistry) -> None:
    registry.add(endpoint_id="local", name="Ollama dev box",
                 base_url="http://localhost:11434/", context_window=32768)
    registry.add(endpoint_id="lan", name="vLLM on the NAS",
                 base_url="http://192.168.1.20:8000")
    assert [e.id for e in registry.list()] == ["lan", "local"]
    updated = registry.update("local", enabled=False, context_window=16384)
    assert updated.enabled is False and updated.context_window == 16384
    registry.remove("lan")
    with pytest.raises(UnknownEndpoint):
        registry.get("lan")
    # persisted: a fresh registry sees the same state
    reloaded = EndpointRegistry(registry.path)
    assert reloaded.get("local").context_window == 16384


def test_add_rejects_duplicates_and_blanks(registry: EndpointRegistry) -> None:
    registry.add(endpoint_id="x", name="X", base_url="http://a:1")
    with pytest.raises(EndpointAlreadyExists):
        registry.add(endpoint_id="x", name="again", base_url="http://b:2")
    for bad in ({"endpoint_id": "", "name": "n", "base_url": "u"},
                {"endpoint_id": "y", "name": " ", "base_url": "u"},
                {"endpoint_id": "y", "name": "n", "base_url": " "}):
        with pytest.raises(ValueError):
            registry.add(**bad)


def test_test_is_metadata_only_and_records_profile(registry: EndpointRegistry) -> None:
    calls: list[str] = []

    def fetch(url: str, timeout_s: float = 4.0):
        calls.append(url)
        if url.endswith("/api/tags"):
            return {"models": [{"name": "qwen3.5:7b"}]}
        if url.endswith("/api/show"):
            return {"model_info": {"context_length": 32768},
                    "capabilities": ["tools"]}
        return None

    registry.add(endpoint_id="ollama", name="dev", base_url="http://localhost:11434")
    profile = registry.test("ollama", fetch=fetch)
    assert profile.reachable is True
    assert profile.models[0].tool_calling == "yes"
    assert all(u.endswith(("/api/tags", "/api/show")) for u in calls), calls
    stored = registry.get("ollama").last_profile
    assert stored["reachable"] is True


def test_pick_is_capability_aware_and_never_falls_back(registry: EndpointRegistry) -> None:
    def tools_fetch(url: str, timeout_s: float = 4.0):
        if url.endswith("/api/tags"):
            return {"models": [{"name": "m"}]}
        if url.endswith("/api/show"):
            return {"model_info": {"context_length": 32768}, "capabilities": ["tools"]}
        return None

    def notools_fetch(url: str, timeout_s: float = 4.0):
        if url.endswith("/api/tags"):
            return {"models": [{"name": "tiny"}]}
        return {}

    registry.add(endpoint_id="big", name="big", base_url="http://a:1")
    registry.test("big", fetch=tools_fetch)
    registry.add(endpoint_id="tiny", name="tiny", base_url="http://b:2")
    registry.test("tiny", fetch=notools_fetch)

    assert registry.pick(requires_tools=True).id == "big"
    assert registry.pick(min_context_window=4096).id == "big"
    # nothing matches -> None (never a guess, never a paid fallback)
    registry.remove("big")
    assert registry.pick(requires_tools=True) is None


def test_disabled_endpoints_are_skipped_by_pick(registry: EndpointRegistry) -> None:
    registry.add(endpoint_id="off", name="off", base_url="http://a:1", enabled=False)
    registry.get("off").last_profile = {
        "models": [{"name": "m", "tool_calling": "yes"}]}
    assert registry.pick(requires_tools=True) is None
    assert registry.pick(requires_tools=True, enabled_only=False) is not None


# ---- REST surface ----


@pytest.fixture()
def client(tmp_path: Path) -> TestClient:
    app = FastAPI()
    app.include_router(router)
    set_registry(EndpointRegistry(tmp_path / "endpoints.json"))
    yield TestClient(app)
    set_registry(None)


def test_rest_crud_roundtrip(client: TestClient) -> None:
    res = client.post("/api/local-endpoints", json={
        "id": "ollama", "name": "Ollama", "base_url": "http://localhost:11434"})
    assert res.status_code == 200
    assert res.json()["endpoint"]["id"] == "ollama"
    res = client.get("/api/local-endpoints")
    assert [e["id"] for e in res.json()["endpoints"]] == ["ollama"]
    res = client.patch("/api/local-endpoints/ollama", json={"enabled": False})
    assert res.json()["endpoint"]["enabled"] is False
    res = client.delete("/api/local-endpoints/ollama")
    assert res.status_code == 200
    assert client.get("/api/local-endpoints").json()["endpoints"] == []


def test_rest_duplicate_conflict_and_unknown_404(client: TestClient) -> None:
    body = {"id": "a", "name": "A", "base_url": "http://a:1"}
    assert client.post("/api/local-endpoints", json=body).status_code == 200
    assert client.post("/api/local-endpoints", json=body).status_code == 409
    assert client.patch("/api/local-endpoints/ghost", json={"enabled": False}).status_code == 404
    assert client.delete("/api/local-endpoints/ghost").status_code == 404


def test_rest_clear_requires_explicit_confirm(client: TestClient) -> None:
    client.post("/api/local-endpoints", json={"id": "a", "name": "A", "base_url": "http://a:1"})
    assert client.delete("/api/local-endpoints/__all__").status_code == 400
    assert client.delete("/api/local-endpoints/__all__?confirm=yes").status_code == 200
