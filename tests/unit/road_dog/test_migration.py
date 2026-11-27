"""Tests for the authorized upstream import (v1.1.0 §1)."""
from __future__ import annotations

from pathlib import Path

import pytest

from jarvis.migration.upstream_import import import_upstream_install


@pytest.fixture()
def upstream_install(tmp_path: Path) -> Path:
    src = tmp_path / "jarvis"  # a pretend Personal Jarvis install
    (src / "data" / "wiki").mkdir(parents=True)
    (src / "jarvis.toml").write_text('[ui]\ntheme = "dark"\n', encoding="utf-8")
    (src / "data" / "wiki" / "wiki.db").write_bytes(b"sqlite")
    (src / "data" / "workspace").mkdir()
    (src / "data" / "workspace" / "USER.md").write_text("# The user\n", encoding="utf-8")
    return src


def test_unknown_source_is_rejected(tmp_path: Path) -> None:
    with pytest.raises(NotADirectoryError):
        import_upstream_install(tmp_path / "does-not-exist")


def test_plan_is_dry_run_by_default(upstream_install: Path, tmp_path: Path) -> None:
    plan, result = import_upstream_install(upstream_install, execute=False)
    assert plan.config_source is not None
    assert plan.wiki_source is not None
    assert result.copied == [] and result.failed == []
    # nothing was written
    assert not (tmp_path / "rd").exists() or not list((tmp_path / "rd").rglob("*"))


def test_execute_copies_config_and_memory_never_credentials(
    upstream_install: Path, tmp_path: Path,
) -> None:
    data_root = tmp_path / "rd" / "data"
    config_dir = tmp_path / "rd" / "config"
    plan, result = import_upstream_install(
        upstream_install, execute=True,
        data_root=data_root, config_dir=config_dir,
    )
    assert result.copied == ["config", "wiki", "workspace"]
    assert result.failed == []
    assert (config_dir / "jarvis.toml").read_text(encoding="utf-8").startswith("[ui]")
    assert (data_root / "wiki" / "wiki.db").read_bytes() == b"sqlite"
    assert (data_root / "workspace" / "USER.md").exists()
    # the credentials note reflects the v1.2.0 isolation contract: Road Dog
    # uses its own service; keys cross only via explicit include_credentials
    assert "road-dog" in plan.credentials_note
    assert result.credentials_copied == []


def test_existing_destinations_are_not_clobbered_without_overwrite(
    upstream_install: Path, tmp_path: Path,
) -> None:
    data_root = tmp_path / "rd" / "data"
    config_dir = tmp_path / "rd" / "config"
    config_dir.mkdir(parents=True)
    (config_dir / "jarvis.toml").write_text("[ui]\ntheme = \"light\"\n", encoding="utf-8")
    _, result = import_upstream_install(
        upstream_install, execute=True, data_root=data_root, config_dir=config_dir
    )
    assert any("destination exists" in f for f in result.failed)
    assert (config_dir / "jarvis.toml").read_text(encoding="utf-8") == '[ui]\ntheme = "light"\n'
    # with overwrite the copy proceeds
    _, result2 = import_upstream_install(
        upstream_install, execute=True, overwrite=True,
        data_root=data_root, config_dir=config_dir,
    )
    assert result2.copied == ["config", "wiki", "workspace"]
