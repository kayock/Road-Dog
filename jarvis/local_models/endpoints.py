"""Inference endpoint registry — Road Dog's own first-class endpoint list.

The registry is Road Dog-owned state (JSON under
:func:`jarvis.core.identity.road_dog_data_root`), independent of the upstream
provider catalog, so local/LAN servers can be added, edited, removed, tested
and selected for specific roles without touching hosted-provider config.

Ownership rules enforced here (v1.1.0 mission §2):

* adding/testing an endpoint NEVER launches a server, downloads a model or
  sends a completion — the test is a read-only metadata probe
  (:mod:`jarvis.diagnostics.model_profile`),
* removing/reconfiguring affects ONLY Road Dog's registry, never an external
  server,
* no credentials are stored here; auth-less local/LAN endpoints are the
  target, and an auth header (if a user pastes one) is kept in the OS
  keyring through :mod:`jarvis.core.secrets`, never in the JSON.
"""
from __future__ import annotations

import json
import os
import tempfile
from dataclasses import asdict, dataclass, field, replace
from pathlib import Path

from jarvis.diagnostics.model_profile import EndpointProfile, profile_local_endpoint

__all__ = [
    "InferenceEndpoint",
    "EndpointRegistry",
    "EndpointAlreadyExists",
    "UnknownEndpoint",
]


class EndpointAlreadyExists(ValueError):
    pass


class UnknownEndpoint(KeyError):
    pass


@dataclass
class InferenceEndpoint:
    """One user-configured inference server (local, LAN or remote)."""

    id: str
    name: str
    base_url: str
    flavor: str = "auto"  # auto | ollama | openai-compatible
    context_window: int | None = None  # user-declared; the probe may refine
    timeout_s: float = 60.0
    enabled: bool = True
    last_profile: dict | None = None  # the last test result (capabilities)
    auth_secret_key: str | None = None  # keyring slot name, never the secret

    def to_dict(self) -> dict:
        return asdict(self)


def _atomic_write_json(path: Path, payload: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp = tempfile.mkstemp(prefix=f".{path.name}.", suffix=".tmp", dir=str(path.parent))
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as handle:
            json.dump(payload, handle, indent=2, sort_keys=True)
        os.replace(tmp, path)
    except Exception:
        try:
            os.unlink(tmp)
        except OSError:
            pass
        raise


class EndpointRegistry:
    """CRUD + test + selection over ``endpoints.json`` in Road Dog's data root."""

    def __init__(self, path: str | Path | None = None) -> None:
        if path is None:
            from jarvis.core.identity import road_dog_data_root

            path = road_dog_data_root() / "endpoints.json"
        self.path = Path(path)
        self._endpoints: dict[str, InferenceEndpoint] = {}
        self._load()

    # -- persistence -------------------------------------------------------

    def _load(self) -> None:
        self._endpoints = {}
        if not self.path.exists():
            return
        try:
            raw = json.loads(self.path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            return  # a corrupt file yields an empty registry, never a crash
        for item in raw.get("endpoints", []):
            try:
                endpoint = InferenceEndpoint(**{
                    k: v for k, v in item.items()
                    if k in InferenceEndpoint.__dataclass_fields__
                })
            except TypeError:
                continue
            self._endpoints[endpoint.id] = endpoint

    def _save(self) -> None:
        _atomic_write_json(self.path, {
            "version": 1,
            "endpoints": [e.to_dict() for e in self._endpoints.values()],
        })

    # -- CRUD ----------------------------------------------------------------

    def list(self) -> list[InferenceEndpoint]:
        return sorted(self._endpoints.values(), key=lambda e: e.id)

    def get(self, endpoint_id: str) -> InferenceEndpoint:
        try:
            return self._endpoints[endpoint_id]
        except KeyError:
            raise UnknownEndpoint(endpoint_id) from None

    def add(
        self, *, endpoint_id: str, name: str, base_url: str,
        flavor: str = "auto", context_window: int | None = None,
        timeout_s: float = 60.0, enabled: bool = True,
    ) -> InferenceEndpoint:
        endpoint_id = (endpoint_id or "").strip()
        if not endpoint_id or not name.strip() or not base_url.strip():
            raise ValueError("endpoint id, name and base_url are required")
        if endpoint_id in self._endpoints:
            raise EndpointAlreadyExists(endpoint_id)
        endpoint = InferenceEndpoint(
            id=endpoint_id, name=name.strip(), base_url=base_url.strip().rstrip("/"),
            flavor=flavor, context_window=context_window,
            timeout_s=float(timeout_s), enabled=enabled,
        )
        self._endpoints[endpoint_id] = endpoint
        self._save()
        return endpoint

    def update(self, endpoint_id: str, **changes) -> InferenceEndpoint:
        current = self.get(endpoint_id)
        allowed = {
            k: v for k, v in changes.items()
            if k in InferenceEndpoint.__dataclass_fields__ and v is not None
            and k not in ("id",)
        }
        updated = replace(current, **allowed)
        self._endpoints[endpoint_id] = updated
        self._save()
        return updated

    def remove(self, endpoint_id: str) -> None:
        self.get(endpoint_id)
        del self._endpoints[endpoint_id]
        self._save()

    # -- test & routing ------------------------------------------------------

    def test(self, endpoint_id: str, *, fetch=None) -> EndpointProfile:
        """Probe one endpoint with a read-only metadata GET; records the result."""
        endpoint = self.get(endpoint_id)
        profile = profile_local_endpoint(endpoint.base_url, timeout_s=min(endpoint.timeout_s, 10.0), fetch=fetch)
        self.update(
            endpoint_id,
            last_profile=profile.to_dict(),
            flavor=profile.flavor if endpoint.flavor == "auto" and profile.flavor != "unknown" else endpoint.flavor,
        )
        return profile

    def pick(
        self, *,
        requires_tools: bool | None = None,
        min_context_window: int | None = None,
        enabled_only: bool = True,
    ) -> InferenceEndpoint | None:
        """Capability-aware routing over user-declared + probed capabilities.

        Returns the best endpoint whose DECLARED or PROBED capabilities match;
        ``None`` when nothing matches (never a guess, never a paid fallback).
        """
        candidates = [e for e in self.list() if (e.enabled or not enabled_only)]
        scored: list[tuple[int, InferenceEndpoint]] = []
        for endpoint in candidates:
            score = 0
            profile = endpoint.last_profile or {}
            models = profile.get("models", []) if isinstance(profile, dict) else []
            if requires_tools is not None:
                tool_ok = any(m.get("tool_calling") == "yes" for m in models)
                if requires_tools and not tool_ok:
                    continue
                if tool_ok:
                    score += 2
            context = endpoint.context_window
            if context is None and models:
                windows = [m.get("context_window") for m in models if m.get("context_window")]
                context = max(windows) if windows else None
            if min_context_window is not None:
                if context is None or context < min_context_window:
                    continue
                score += int(context / max(min_context_window, 1))
            if context:
                score += int(context / 8192)
            scored.append((score, endpoint))
        if not scored:
            return None
        scored.sort(key=lambda pair: (-pair[0], pair[1].id))
        return scored[0][1]
