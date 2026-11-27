"""Road Dog application identity — independent directories for the fork.

Road Dog coexists with a Personal Jarvis / Hue install on the same machine.
The upstream compatibility contracts (the ``jarvis`` package name, the
``personal-jarvis`` keyring service, ``jarvis.toml`` discovery) are preserved
so a migrated install keeps working — but everything Road Dog OWNES lives
under one independent root, ``~/.road-dog``:

* ``~/.road-dog/data``    — Road Dog data (companionship state, endpoint
  registry, acceptance artifacts, memory exports)
* ``~/.road-dog/config``  — Road Dog config copies written by the migration
  tool and the onboarding endpoint-test step
* the install dir itself is ``~/.road-dog`` (installer contract)

Env overrides (checked in order):

* ``ROAD_DOG_DATA_DIR``  — replace the data root entirely
* ``ROAD_DOG_HOME``      — replace the ``~/.road-dog`` root

Nothing here reads or writes another application's files; see
:mod:`jarvis.migration.upstream_import` for the EXPLICIT, authorized import.
"""
from __future__ import annotations

import os
from pathlib import Path

__all__ = [
    "road_dog_home",
    "road_dog_data_root",
    "road_dog_config_dir",
    "ensure_road_dog_dirs",
]


def road_dog_home() -> Path:
    """The Road Dog root: ``$ROAD_DOG_HOME`` or ``~/.road-dog``."""
    override = os.environ.get("ROAD_DOG_HOME", "").strip()
    if override:
        return Path(override).expanduser()
    return Path.home() / ".road-dog"


def road_dog_data_root() -> Path:
    """Road Dog's own data root: ``$ROAD_DOG_DATA_DIR`` or ``~/.road-dog/data``."""
    override = os.environ.get("ROAD_DOG_DATA_DIR", "").strip()
    if override:
        return Path(override).expanduser()
    return road_dog_home() / "data"


def road_dog_config_dir() -> Path:
    """Road Dog's own config dir: ``$ROAD_DOG_CONFIG_DIR`` or ``~/.road-dog/config``."""
    override = os.environ.get("ROAD_DOG_CONFIG_DIR", "").strip()
    if override:
        return Path(override).expanduser()
    return road_dog_home() / "config"


def ensure_road_dog_dirs() -> dict[str, Path]:
    """Create the Road Dog-owned directories; returns what exists afterwards."""
    dirs = {
        "home": road_dog_home(),
        "data": road_dog_data_root(),
        "config": road_dog_config_dir(),
    }
    for path in dirs.values():
        path.mkdir(parents=True, exist_ok=True)
    return dirs
