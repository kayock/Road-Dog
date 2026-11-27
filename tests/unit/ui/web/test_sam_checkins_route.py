"""Tests for the Sam check-in REST surface (``/api/sam/checkins``)."""
from __future__ import annotations

import tomllib
from pathlib import Path
from types import SimpleNamespace

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from jarvis.ui.web import sam_routes
from jarvis.ui.web.sam_routes import router


@pytest.fixture()
def config_path(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> Path:
    path = tmp_path / "jarvis.toml"
    path.write_text("", encoding="utf-8")
    monkeypatch.setenv("JARVIS_CONFIG", str(path))
    return path


def _client(enabled: bool = False) -> TestClient:
    app = FastAPI()
    app.include_router(router)
    app.state.config = SimpleNamespace(
        sam=SimpleNamespace(
            checkins_enabled=enabled,
            checkin_interval_minutes=120,
            quiet_hours_start="22:00",
            quiet_hours_end="08:00",
            checkin_lines=[],
        ),
    )
    app.state.bus = None
    return TestClient(app)


def _read_sam(path: Path) -> dict:
    return tomllib.loads(path.read_text(encoding="utf-8")).get("sam", {})


def test_get_answers_settings_and_defaults(config_path: Path) -> None:
    client = _client()
    data = client.get("/api/sam/checkins").json()
    assert data["enabled"] is False
    assert data["interval_minutes"] == 120
    assert data["checkin_lines"]
    assert data["default_lines"]
    assert data["running"] is False


def test_put_persists_checkin_settings(config_path: Path) -> None:
    client = _client()
    res = client.put(
        "/api/sam/checkins",
        json={
            "enabled": True,
            "interval_minutes": 90,
            "quiet_hours_start": "23:00",
            "quiet_hours_end": "07:00",
            "persist": True,
        },
    )
    assert res.status_code == 200
    sam = _read_sam(config_path)
    assert sam["checkins_enabled"] is True
    assert sam["checkin_interval_minutes"] == 90
    assert sam["quiet_hours_start"] == "23:00"
    assert sam["quiet_hours_end"] == "07:00"


def test_put_rejects_malformed_quiet_hours(config_path: Path) -> None:
    client = _client()
    res = client.put(
        "/api/sam/checkins",
        json={
            "enabled": True,
            "interval_minutes": 90,
            "quiet_hours_start": "25:99",
            "quiet_hours_end": "07:00",
        },
    )
    assert res.status_code == 400
    assert _read_sam(config_path) == {}


def test_put_lifts_too_small_interval(config_path: Path) -> None:
    client = _client()
    res = client.put(
        "/api/sam/checkins",
        json={"enabled": True, "interval_minutes": 1, "quiet_hours_start": "", "quiet_hours_end": ""},
    )
    assert res.status_code == 200
    assert res.json()["interval_minutes"] == 5


def test_mount_scheduler_disabled_by_default(config_path: Path) -> None:
    assert sam_routes.mount_checkin_scheduler(None, _client().app.state.config) is None
    sam_routes.stop_checkin_scheduler()
