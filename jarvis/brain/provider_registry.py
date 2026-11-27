"""Provider registry: entry_points discovery for jarvis.brain plugins.

Loads plugin classes lazily. Instantiation is performed explicitly by ``BrainManager``.
A plugin that cannot be loaded is silently skipped (missing dependency?), but
the error is recorded in the log.
"""
from __future__ import annotations

from importlib.metadata import entry_points
from typing import Any

from jarvis.core.protocols import Brain

PLUGIN_GROUP = "jarvis.brain"


class BrainProviderRegistry:
    """Cached entry-point discovery."""

    def __init__(self) -> None:
        self._classes: dict[str, type] = {}
        self._failed: dict[str, str] = {}
        self._loaded = False

    def _load(self) -> None:
        if self._loaded:
            return
        eps = entry_points(group=PLUGIN_GROUP)
        for ep in eps:
            try:
                cls = ep.load()
                self._classes[ep.name] = cls
            except Exception as exc:  # noqa: BLE001
                self._failed[ep.name] = f"{type(exc).__name__}: {exc}"
        self._loaded = True

    def available(self) -> list[str]:
        self._load()
        return sorted(self._classes.keys())

    def failed(self) -> dict[str, str]:
        self._load()
        return dict(self._failed)

    def instantiate(self, name: str, **kwargs: Any) -> Brain:
        """Instantiates the provider with kwargs."""
        self._load()
        if name not in self._classes:
            raise KeyError(
                f"Brain provider '{name}' not found. Available: {self.available()}. "
                f"Failed: {list(self._failed.keys())}"
            )
        cls = self._classes[name]
        from jarvis.brain.usage_meter import meter_brain

        # Every instance leaves here metered: whatever asks it for tokens —
        # a voice turn, the wiki curator, a dictation polish — is written to
        # the usage ledger without the caller having to know (BUG-178).
        metered = meter_brain(cls(**kwargs), name)
        # Road Dog v1.2.0 §3: small-model compatibility applied OUTSIDE the
        # metered wrapper, so every compat re-ask is itself metered and
        # budgeted at the dispatch door. Only local endpoint providers, only
        # when [brain] small_model_mode is enabled.
        from jarvis.brain.small_model_runtime import compat_brain

        return compat_brain(metered, name)

    def get_class(self, name: str) -> type:
        self._load()
        if name not in self._classes:
            raise KeyError(f"Brain provider '{name}' not found.")
        return self._classes[name]
