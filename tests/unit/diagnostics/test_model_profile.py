"""Tests for the local endpoint capability profiler (model_profile.py).

Network-free: every test injects a fake ``fetch``. The contract under test:

- only GET metadata is requested (no completion, no pull, no lifecycle call),
- Ollama flavor wins when /api/tags answers; OpenAI-compatible is the fallback,
- context windows surface where declared and stay None where not,
- tool-calling/vision are "yes" ONLY when declared — "unknown", never invented,
- an unreachable endpoint is reachable=False with an honest error.
"""
from __future__ import annotations

from typing import Any

import pytest

from jarvis.diagnostics.model_profile import (
    PROBE_METHOD,
    EndpointProfile,
    ModelProfile,
    profile_local_endpoint,
)


def _fetch_ok(url: str, timeout_s: float = 4.0) -> dict[str, Any] | None:
    if url.endswith("/api/tags"):
        return {"models": [{"name": "qwen3.5:7b"}]}
    if url.endswith("/api/show"):
        return {
            "model_info": {"context_length": 32768},
            "capabilities": ["tools", "vision"],
        }
    return None


def test_probe_method_is_get_only() -> None:
    assert PROBE_METHOD == "GET"


def test_ollama_flavor_with_declared_capabilities() -> None:
    calls: list[str] = []

    def fetch(url: str, timeout_s: float = 4.0) -> dict[str, Any] | None:
        calls.append(url)
        return _fetch_ok(url, timeout_s)

    profile = profile_local_endpoint("http://localhost:11434", fetch=fetch)
    assert isinstance(profile, EndpointProfile)
    assert profile.flavor == "ollama"
    assert profile.reachable is True
    assert [m.name for m in profile.models] == ["qwen3.5:7b"]
    model = profile.models[0]
    assert model.context_window == 32768
    assert model.tool_calling == "yes"
    assert model.vision == "yes"
    assert all("tags" in c or "show" in c for c in calls)


def test_ollama_undeclared_capabilities_stay_unknown() -> None:
    def fetch(url: str, timeout_s: float = 4.0) -> dict[str, Any] | None:
        if url.endswith("/api/tags"):
            return {"models": [{"name": "tiny-quant"}]}
        return {}

    model = profile_local_endpoint("http://x", fetch=fetch).models[0]
    assert model.tool_calling == "unknown"
    assert model.vision == "unknown"
    assert model.context_window is None


def test_openai_compatible_fallback() -> None:
    def fetch(url: str, timeout_s: float = 4.0) -> dict[str, Any] | None:
        if url.endswith("/v1/models"):
            return {
                "data": [
                    {
                        "id": "mistral-7b",
                        "context_length": 8192,
                        "supported_parameters": ["temperature"],
                        "input_modalities": ["text"],
                    }
                ]
            }
        return None

    profile = profile_local_endpoint("http://lm-studio:1234", fetch=fetch)
    assert profile.flavor == "openai-compatible"
    model = profile.models[0]
    assert model.context_window == 8192
    assert model.tool_calling == "unknown"  # "tools" NOT in supported_parameters
    assert model.vision == "unknown"


def test_unreachable_endpoint_is_honest() -> None:
    def fetch(url: str, timeout_s: float = 4.0) -> dict[str, Any] | None:
        raise ConnectionError("refused")

    profile = profile_local_endpoint("http://dark:11434", fetch=fetch)
    assert profile.reachable is False
    assert profile.error


def test_empty_base_url_is_refused() -> None:
    profile = profile_local_endpoint("", fetch=_fetch_ok)
    assert profile.reachable is False
    assert profile.error


def test_profile_to_dict_shape() -> None:
    model = ModelProfile(name="m", context_window=4096, tool_calling="yes", vision="no", source="s")
    data = model.to_dict()
    assert set(data) == {"name", "context_window", "tool_calling", "vision", "source"}
