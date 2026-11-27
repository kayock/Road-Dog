"""Local endpoint capability profile — what can THIS inference server do?

One call, ``profile_local_endpoint``, asks a user-configured OpenAI-compatible
or Ollama endpoint what it offers and answers with a structured profile:

* model list (``/v1/models`` on OpenAI-compatible servers, ``/api/tags`` on
  Ollama),
* per-model context window where the endpoint exposes one (Ollama ``/api/show``
  reports ``context_length``; OpenRouter-shaped metadata reports
  ``context_length`` / ``context_window``),
* tool-calling support where it is DECLARED. Undeclared is reported as
  ``"unknown"`` — never "yes". The product's honesty rule (AP-21) is that a
  capability is gated on evidence, and a small quantized model that merely
  exists is not tool-capable until something says so.

Server-ownership rules (mission §5): the probe is read-only GET metadata to
the endpoint the user already configured. It never starts, restarts, stops or
reconfigures a server, never pulls or downloads a model, and never sends a
completion request — so it cannot spend tokens or disturb an externally
managed server.
"""
from __future__ import annotations

import logging
from dataclasses import dataclass, field
from typing import Any, Callable

log = logging.getLogger(__name__)

#: Only GET requests go out; no completion, no pull, no lifecycle call.
PROBE_METHOD = "GET"

Fetch = Callable[[str, float], dict[str, Any] | None]


@dataclass
class ModelProfile:
    """One model as the endpoint describes it — unknowns stay unknown."""

    name: str
    context_window: int | None = None
    tool_calling: str = "unknown"  # "yes" | "no" | "unknown"
    vision: str = "unknown"  # "yes" | "no" | "unknown"
    source: str = ""  # which metadata field backed the claims

    def to_dict(self) -> dict[str, Any]:
        return {
            "name": self.name,
            "context_window": self.context_window,
            "tool_calling": self.tool_calling,
            "vision": self.vision,
            "source": self.source,
        }


@dataclass
class EndpointProfile:
    """What a local endpoint exposes — plus the probe's own honesty header."""

    base_url: str
    flavor: str  # "ollama" | "openai-compatible" | "unknown"
    reachable: bool
    error: str | None = None
    models: list[ModelProfile] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {
            "base_url": self.base_url,
            "flavor": self.flavor,
            "reachable": self.reachable,
            "error": self.error,
            "probe_method": PROBE_METHOD,
            "models": [model.to_dict() for model in self.models],
        }


def _positive_int(value: object) -> int | None:
    try:
        number = int(value)  # type: ignore[arg-type]
    except (TypeError, ValueError):
        return None
    return number if number > 0 else None


def _profile_from_openai_models(payload: dict[str, Any]) -> list[ModelProfile]:
    models: list[ModelProfile] = []
    for entry in payload.get("data", []) or []:
        if not isinstance(entry, dict):
            continue
        name = str(entry.get("id") or "").strip()
        if not name:
            continue
        context = _positive_int(entry.get("context_length") or entry.get("context_window"))
        supported = entry.get("supported_parameters") or []
        arch = entry.get("architecture")
        modalities = (
            entry.get("input_modalities")
            or (arch.get("input_modalities", []) if isinstance(arch, dict) else [])
        )
        tools = "yes" if isinstance(supported, (list, tuple)) and "tools" in supported else "unknown"
        vision = (
            "yes"
            if isinstance(modalities, (list, tuple)) and "image" in modalities
            else "unknown"
        )
        source = "models.data" + (" (declared capabilities)" if tools == "yes" or vision == "yes" else "")
        models.append(ModelProfile(name=name, context_window=context, tool_calling=tools,
                                   vision=vision, source=source))
    return models


def _profile_from_ollama(
    base_url: str, tags: dict[str, Any], show: Fetch, timeout_s: float
) -> list[ModelProfile]:
    models: list[ModelProfile] = []
    for entry in tags.get("models", []) or []:
        if not isinstance(entry, dict):
            continue
        name = str(entry.get("name") or entry.get("model") or "").strip()
        if not name:
            continue
        profile = ModelProfile(name=name, source="api/tags")
        # /api/show names the exact model (tag included); it is a cheap local
        # metadata GET on the SAME server the user already runs.
        detail = show(f"{base_url.rstrip('/')}/api/show", timeout_s)
        if isinstance(detail, dict):
            model_info = detail.get("model_info", {}) or {}
            context = model_info.get("context_length") or detail.get("context_length")
            profile.context_window = _positive_int(context)
            capabilities = detail.get("capabilities") or []
            if isinstance(capabilities, (list, tuple)):
                if "tools" in capabilities or "function_calling" in capabilities:
                    profile.tool_calling = "yes"
                    profile.source += "+api/show.capabilities"
            if isinstance(capabilities, (list, tuple)) and "vision" in capabilities:
                profile.vision = "yes"
        models.append(profile)
    return models


def profile_local_endpoint(
    base_url: str,
    *,
    timeout_s: float = 4.0,
    fetch: Fetch | None = None,
) -> EndpointProfile:
    """Profile one endpoint. ``fetch`` performs a GET and returns parsed JSON.

    The injected ``fetch`` keeps tests network-free; production passes an
    httpx-based GET against the user's own server.
    """
    if fetch is None:
        import httpx

        def _http_get(url: str, timeout: float) -> dict[str, Any] | None:
            response = httpx.get(url, timeout=timeout)
            if response.status_code != 200:
                return None
            return response.json()

        fetch = _http_get
    base = (base_url or "").rstrip("/")
    if not base:
        return EndpointProfile(base_url=base_url, flavor="unknown",
                               reachable=False, error="no base_url configured")

    def _get(url: str, _timeout: float = timeout_s) -> dict[str, Any] | None:
        try:
            return fetch(url, _timeout)
        except Exception as exc:  # noqa: BLE001 — any probe failure is a profile result
            log.debug("endpoint probe failed for %s: %s", url, exc)
            return None

    ollama_tags = _get(f"{base}/api/tags")
    if ollama_tags is not None:
        return EndpointProfile(
            base_url=base_url,
            flavor="ollama",
            reachable=True,
            models=_profile_from_ollama(base, ollama_tags, _get, timeout_s),
        )

    openai_models = _get(f"{base}/v1/models")
    if openai_models is not None:
        return EndpointProfile(
            base_url=base_url,
            flavor="openai-compatible",
            reachable=True,
            models=_profile_from_openai_models(openai_models),
        )

    return EndpointProfile(
        base_url=base_url,
        flavor="unknown",
        reachable=False,
        error="no /api/tags or /v1/models answered — is the server running?",
    )
