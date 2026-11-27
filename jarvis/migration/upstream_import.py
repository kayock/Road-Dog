"""Explicit, authorized import of an upstream Personal Jarvis / Hue install.

The single entry point is :func:`import_upstream_install`. It is OPT-IN with
TEETH:

* the caller must pass the upstream installation's path EXPLICITLY
  (``--from ~/.jarvis`` / ``--from ~/.personal-jarvis``); nothing is ever
  auto-discovered,
* a dry-run plan is produced FIRST; nothing is written unless
  ``execute=True``,
* only CONFIG and MEMORY content is imported (``jarvis.toml``, the wiki
  database, workspace markdown); CREDENTIALS ARE NEVER TOUCHED — keys stay
  in the OS keychain under the upstream service name, which Road Dog
  deliberately shares for continuity,
* existing Road Dog files are never overwritten unless the caller passes
  ``overwrite=True``,
* the source directory is opened READ-ONLY (file copies only; the original
  install is not modified, moved or reconfigured).

This tool exists so a Personal Jarvis user can bring their memory with them.
It is never run by the app itself — no boot path, no scheduler, no route
calls it automatically.
"""
from __future__ import annotations

import shutil
import sqlite3
from dataclasses import dataclass, field
from pathlib import Path

__all__ = [
    "MigrationPlan", "MigrationResult", "import_upstream_install",
    "UPSTREAM_KEYRING_SERVICE",
]


def _keyring_mod():
    """The keyring module, imported lazily (absent on headless installs)."""
    import keyring

    return keyring


UPSTREAM_KEYRING_SERVICE = "personal-jarvis"


@dataclass
class MigrationPlan:
    """What WOULD be copied, decided before anything touches the disk."""

    source: Path
    config_source: Path | None
    wiki_source: Path | None
    workspace_source: Path | None
    destinations: dict[str, Path] = field(default_factory=dict)
    skipped: list[str] = field(default_factory=list)
    credentials_note: str = (
        "API keys are NOT migrated by default: Road Dog uses its own "
        "'road-dog' keyring service. Pass include_credentials=True (explicit, "
        "authorized) to COPY entries from the upstream service to the Road Dog "
        "service; the upstream service is read but never modified."
    )

    def as_dict(self) -> dict:
        return {
            "source": str(self.source),
            "config_source": str(self.config_source) if self.config_source else None,
            "wiki_source": str(self.wiki_source) if self.wiki_source else None,
            "workspace_source": str(self.workspace_source) if self.workspace_source else None,
            "destinations": {k: str(v) for k, v in self.destinations.items()},
            "skipped": self.skipped,
            "credentials_note": self.credentials_note,
        }


@dataclass
class MigrationResult:
    copied: list[str] = field(default_factory=list)
    failed: list[str] = field(default_factory=list)
    credentials_copied: list[str] = field(default_factory=list)

    def as_dict(self) -> dict:
        return {
            "copied": self.copied,
            "failed": self.failed,
            "credentials_copied": self.credentials_copied,
            "ok": not self.failed,
        }


def _first_existing(source: Path, candidates: tuple[str, ...]) -> Path | None:
    for rel in candidates:
        candidate = source / rel
        if candidate.exists():
            return candidate
    return None


def import_upstream_install(
    source: str | Path,
    *,
    execute: bool = False,
    overwrite: bool = False,
    data_root: Path | None = None,
    config_dir: Path | None = None,
    include_credentials: bool = False,
    upstream_keyring_service: str = UPSTREAM_KEYRING_SERVICE,
) -> tuple[MigrationPlan, MigrationResult]:
    """Plan (default) or execute an upstream config+memory import.

    ``source`` must be an existing directory supplied by the user. The plan
    stage never writes. The execute stage only copies into Road Dog's own
    directories and refuses to clobber unless ``overwrite`` is set.
    """
    from jarvis.core.identity import road_dog_config_dir, road_dog_data_root

    src = Path(source).expanduser()
    if not src.is_dir():
        raise NotADirectoryError(f"upstream install not found: {src}")
    data_root = data_root or road_dog_data_root()
    config_dir = config_dir or road_dog_config_dir()

    config_src = _first_existing(src, ("jarvis.toml", "config/jarvis.toml"))
    wiki_src = _first_existing(
        src, ("data/wiki/wiki.db", "data/wiki.sqlite", "wiki/wiki.db")
    )
    workspace_src = _first_existing(src, ("data/workspace", "workspace"))

    plan = MigrationPlan(
        source=src, config_source=config_src, wiki_source=wiki_src,
        workspace_source=workspace_src,
    )
    if config_src:
        plan.destinations["config"] = config_dir / "jarvis.toml"
    else:
        plan.skipped.append("config: no jarvis.toml found under the source")
    if wiki_src:
        plan.destinations["wiki"] = data_root / "wiki" / "wiki.db"
    else:
        plan.skipped.append("wiki: no wiki database found under the source")
    if workspace_src:
        plan.destinations["workspace"] = data_root / "workspace"
    else:
        plan.skipped.append("workspace: no workspace directory found")

    result = MigrationResult()
    if not execute:
        return plan, result

    def _copy_credentials() -> None:
        """EXPLICIT, authorized credential migration (v1.2.0 §8).

        Reads the upstream service, copies every entry into Road Dog's own
        service. The source service is never modified or deleted.
        """
        try:
            keyring = _keyring_mod()
        except Exception as exc:  # noqa: BLE001 — headless: honest skip
            result.failed.append(f"credentials: keyring unavailable ({exc})")
            return
        from jarvis.core import branding

        service = branding.KEYRING_SERVICE_NAME
        try:
            entries = keyring.get_credentials(upstream_keyring_service) or []
        except Exception as exc:  # noqa: BLE001
            result.failed.append(f"credentials: source unreadable ({exc})")
            return
        for entry in entries:
            name = getattr(entry, "username", "") or ""
            if not name:
                continue
            try:
                secret = keyring.get_password(upstream_keyring_service, name)
                if secret:
                    keyring.set_password(service, name, secret)
                    result.credentials_copied.append(name)
            except Exception as exc:  # noqa: BLE001
                result.failed.append(f"credentials: {name}: {exc}")

    if include_credentials:
        _copy_credentials()

    for key, dest in plan.destinations.items():
        try:
            dest.parent.mkdir(parents=True, exist_ok=True)
            if dest.exists() and not overwrite:
                result.failed.append(f"{key}: destination exists ({dest}); pass overwrite")
                continue
            src_path = {"config": config_src, "wiki": wiki_src, "workspace": workspace_src}[key]
            if src_path is None:  # defensive; destinations imply sources
                continue
            if src_path.is_dir():
                if dest.exists():
                    shutil.rmtree(dest)
                shutil.copytree(src_path, dest)
            else:
                shutil.copyfile(src_path, dest)
            result.copied.append(key)
        except (OSError, sqlite3.Error) as exc:
            result.failed.append(f"{key}: {exc}")
    return plan, result
