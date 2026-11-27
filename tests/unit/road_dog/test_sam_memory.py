"""Tests for the Sam memory REST surface (v1.1.0 §6)."""
from __future__ import annotations

from pathlib import Path
from types import SimpleNamespace

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from jarvis.ui.web.sam_memory_routes import router


@pytest.fixture()
def client(tmp_path: Path) -> TestClient:
    app = FastAPI()
    app.include_router(router)
    cfg = SimpleNamespace(memory=SimpleNamespace(data_dir=str(tmp_path / "data")))
    app.state.config = cfg
    return TestClient(app)


def test_list_edit_delete_roundtrip(client: TestClient) -> None:
    res = client.put("/api/sam/memories/USER.md",
                     json={"content": "# The user\nlikes dark roast\n"})
    assert res.status_code == 200
    res = client.get("/api/sam/memories/USER.md")
    assert "dark roast" in res.json()["content"]
    listing = client.get("/api/sam/memories").json()["memories"]
    assert [m["name"] for m in listing] == ["USER.md"]
    # search filter
    assert client.get("/api/sam/memories", params={"q": "espresso"}).json()["memories"] == []
    assert client.get("/api/sam/memories", params={"q": "DARK"}).json()["memories"]
    # delete
    assert client.delete("/api/sam/memories/USER.md").json()["deleted"] == "USER.md"
    assert client.get("/api/sam/memories/USER.md").status_code == 404


def test_export_covers_everything(client: TestClient) -> None:
    client.put("/api/sam/memories/USER.md", json={"content": "a"})
    client.put("/api/sam/memories/people-Jo.md", json={"content": "b"})
    export = client.get("/api/sam/memories/export").json()["memories"]
    assert export == {"USER.md": "a", "people-Jo.md": "b"}


def test_path_traversal_is_rejected(client: TestClient) -> None:
    for bad in ("../escape.md", "..%2Fescape.md", ".gitignore", "sub/dir.md"):
        assert client.get(f"/api/sam/memories/{bad}").status_code in (400, 404), bad
        assert client.put(f"/api/sam/memories/{bad}", json={"content": "x"}).status_code in (400, 404)


def test_missing_memory_is_404(client: TestClient) -> None:
    assert client.get("/api/sam/memories/ghost.md").status_code == 404
    assert client.delete("/api/sam/memories/ghost.md").status_code == 404
