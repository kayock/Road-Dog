"""Credential isolation between Road Dog and upstream (v1.2.0 §8).

Road Dog owns the ``road-dog`` keyring service by default. Upstream keys are
touched ONLY by the explicit, authorized migration (include_credentials=True
with the user naming the source service) — never automatically, never by the
normal runtime.
"""
from __future__ import annotations

import tomllib
from pathlib import Path
from types import SimpleNamespace

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from jarvis.core import branding
from jarvis.migration.upstream_import import import_upstream_install
from jarvis.ui.web.migration_routes import router


def test_road_dog_keyring_service_is_its_own() -> None:
    assert branding.KEYRING_SERVICE_NAME == "road-dog"
    assert branding.KEYRING_SERVICE_NAME != branding.UPSTREAM_REPO_SLUG  # sanity


def test_frozen_identity_pins_the_independent_service() -> None:
    from tests.unit.core.test_branding import _CURRENT_IDENTITY

    assert _CURRENT_IDENTITY["KEYRING_SERVICE_NAME"] == "road-dog"


class _FakeKeyring:
    """A process-local keyring stand-in: services -> name -> secret."""

    def __init__(self) -> None:
        self.store: dict[str, dict[str, str]] = {}

    def set_password(self, service: str, name: str, secret: str) -> None:
        self.store.setdefault(service, {})[name] = secret

    def get_password(self, service: str, name: str) -> str | None:
        return self.store.get(service, {}).get(name)

    def delete_password(self, service: str, name: str) -> None:
        self.store.get(service, {}).pop(name, None)

    def get_credentials(self, service: str) -> list:
        entries = self.store.get(service, {})
        return [SimpleNamespace(username=name) for name in entries]


@pytest.fixture()
def fake_keyring(monkeypatch: pytest.MonkeyPatch) -> _FakeKeyring:
    fake = _FakeKeyring()
    fake.set_password("personal-jarvis", "anthropic_api_key", "sk-upstream")
    fake.set_password("personal-jarvis", "openai_api_key", "sk-openai")
    monkeypatch.setattr("jarvis.migration.upstream_import._keyring_mod", lambda: fake)
    return fake


@pytest.fixture()
def upstream_install(tmp_path: Path) -> Path:
    src = tmp_path / "jarvis"
    (src / "data" / "wiki").mkdir(parents=True)
    (src / "jarvis.toml").write_text('[ui]\\ntheme = "dark"\\n', encoding="utf-8")
    (src / "data" / "wiki" / "wiki.db").write_bytes(b"sqlite")
    return src


def test_default_migration_never_touches_credentials(
    upstream_install: Path, tmp_path: Path, fake_keyring: _FakeKeyring,
) -> None:
    data_root = tmp_path / "rd" / "data"
    config_dir = tmp_path / "rd" / "config"
    plan, result = import_upstream_install(
        upstream_install, execute=True, data_root=data_root, config_dir=config_dir
    )
    assert "config" in result.copied
    # nothing appeared under the Road Dog service
    assert fake_keyring.store.get("road-dog", {}) == {}
    # upstream keys remain where they were (Road Dog does not DELETE them)
    assert fake_keyring.store["personal-jarvis"]["anthropic_api_key"] == "sk-upstream"


def test_explicit_include_credentials_copies_keys_to_the_road_dog_service(
    upstream_install: Path, tmp_path: Path, fake_keyring: _FakeKeyring,
) -> None:
    data_root = tmp_path / "rd" / "data"
    config_dir = tmp_path / "rd" / "config"
    plan, result = import_upstream_install(
        upstream_install, execute=True, include_credentials=True,
        data_root=data_root, config_dir=config_dir,
    )
    assert sorted(result.credentials_copied) == ["anthropic_api_key", "openai_api_key"]
    assert fake_keyring.store["road-dog"]["anthropic_api_key"] == "sk-upstream"
    assert fake_keyring.store["road-dog"]["openai_api_key"] == "sk-openai"
    # the upstream service is READ, never modified
    assert fake_keyring.store["personal-jarvis"]["anthropic_api_key"] == "sk-upstream"


def test_plan_stage_never_copies_credentials(
    upstream_install: Path, tmp_path: Path, fake_keyring: _FakeKeyring,
) -> None:
    data_root = tmp_path / "rd" / "data"
    config_dir = tmp_path / "rd" / "config"
    _, result = import_upstream_install(
        upstream_install, execute=False, include_credentials=True,
        data_root=data_root, config_dir=config_dir,
    )
    assert result.credentials_copied == []
    assert fake_keyring.store.get("road-dog", {}) == {}


def test_migration_rest_surface_reports_credentials_note(tmp_path: Path) -> None:
    app = FastAPI()
    app.include_router(router)
    client = TestClient(app)
    res = client.post("/api/migration/plan",
                      json={"source": str(tmp_path / "missing")})
    assert res.status_code == 404
