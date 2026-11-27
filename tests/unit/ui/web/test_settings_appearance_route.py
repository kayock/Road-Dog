"""Tests for the Settings → Appearance REST surface (``/api/settings/appearance``).

Covers the Road Dog appearance contract:

- GET answers the theme AND the high-contrast flag (both read fresh from disk),
- PUT persists ``high_contrast`` through the config writer into jarvis.toml,
- a PUT that carries only ``theme`` leaves high contrast untouched (older
  clients keep working unchanged),
- an unknown theme is still rejected with 400.
"""
from __future__ import annotations

import tomllib
from pathlib import Path
from types import SimpleNamespace

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from jarvis.ui.web.settings_routes import router


@pytest.fixture()
def config_path(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> Path:
    """A sandbox jarvis.toml + JARVIS_CONFIG pointed at it."""
    path = tmp_path / "jarvis.toml"
    path.write_text('[ui]\ntheme = "dark"\n', encoding="utf-8")
    monkeypatch.setenv("JARVIS_CONFIG", str(path))
    return path


def _client() -> TestClient:
    app = FastAPI()
    app.include_router(router)
    app.state.config = SimpleNamespace(ui=SimpleNamespace(theme="dark", high_contrast=False))
    return TestClient(app)


def _read_ui(path: Path) -> dict:
    return tomllib.loads(path.read_text(encoding="utf-8")).get("ui", {})


def test_get_answers_theme_and_high_contrast(config_path: Path) -> None:
    client = _client()
    data = client.get("/api/settings/appearance").json()
    assert data["theme"] == "dark"
    assert data["high_contrast"] is False
    assert "light" in data["options"]


def test_put_persists_high_contrast(config_path: Path) -> None:
    client = _client()
    res = client.put(
        "/api/settings/appearance",
        json={"theme": "light", "high_contrast": True, "persist": True},
    )
    assert res.status_code == 200
    body = res.json()
    assert body["high_contrast"] is True
    ui = _read_ui(config_path)
    assert ui["theme"] == "light"
    assert ui["high_contrast"] is True


def test_put_theme_only_leaves_high_contrast_unchanged(config_path: Path) -> None:
    client = _client()
    assert (
        client.put(
            "/api/settings/appearance",
            json={"theme": "light", "high_contrast": True, "persist": True},
        ).status_code
        == 200
    )
    res = client.put("/api/settings/appearance", json={"theme": "dark", "persist": True})
    assert res.status_code == 200
    ui = _read_ui(config_path)
    assert ui["theme"] == "dark"
    assert ui["high_contrast"] is True


def test_put_high_contrast_false_persists_false(config_path: Path) -> None:
    client = _client()
    res = client.put(
        "/api/settings/appearance",
        json={"theme": "dark", "high_contrast": False, "persist": True},
    )
    assert res.status_code == 200
    assert _read_ui(config_path)["high_contrast"] is False


def test_put_unknown_theme_is_rejected(config_path: Path) -> None:
    client = _client()
    res = client.put("/api/settings/appearance", json={"theme": "neon", "persist": True})
    assert res.status_code == 400
