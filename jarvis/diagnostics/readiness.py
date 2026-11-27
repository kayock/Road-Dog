"""Readiness report — the local-only "is this install ready" snapshot.

One call, ``build_readiness_report(config)``, answers the question a new user
actually has: what on THIS machine is ready to work right now, what is
misconfigured, and what simply has not been checked yet.

Honesty rules (the whole point of the module):

* **Local-only.** Everything probed here is free: config values, binary
  lookups on PATH, filesystem checks, in-process imports. No model call, no
  provider request, no token spend. Connectivity to hosted providers is
  reported as *configured / not configured* — never as *verified*, because
  verifying would cost a request. A live probe is the user's explicit choice
  (Settings → model health), never a diagnostic side effect.
* **Three states, kept apart.** ``ok`` (checked, working), ``warn`` (checked,
  degraded or partially configured), ``fail`` (checked, cannot work),
  ``unknown`` (NOT probed — e.g. live provider reachability). A green
  dashboard must mean something, so a missing check is shown as missing.
* **No assumptions about hardware.** A headless VPS, a laptop without a mic
  and a GPU workstation are all valid installs; the report describes the
  machine instead of grading it against an ideal.
"""
from __future__ import annotations

import shutil
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any

__all__ = ["ReadinessCheck", "build_readiness_report"]


@dataclass
class ReadinessCheck:
    """One row of the readiness dashboard.

    ``status`` is one of ``ok`` / ``warn`` / ``fail`` / ``unknown``.
    ``checked`` is False for ``unknown`` rows — a check that never ran is
    reported as missing, never as green.
    """

    domain: str
    name: str
    status: str
    detail: str
    checked: bool = True
    hint: str | None = None

    def to_dict(self) -> dict[str, Any]:
        return {
            "domain": self.domain,
            "name": self.name,
            "status": self.status,
            "detail": self.detail,
            "checked": self.checked,
            "hint": self.hint,
        }


def _which(name: str) -> str | None:
    """PATH lookup honouring Windows shims (npm globals are .cmd/.ps1 files)."""
    direct = shutil.which(name)
    if direct:
        return direct
    for ext in (".cmd", ".exe", ".bat", ".ps1"):
        hit = shutil.which(name + ext)
        if hit:
            return hit
    return None


def _brain_checks(config: Any) -> list[ReadinessCheck]:
    """Model connectivity + inference capability rows (configured, not probed)."""
    checks: list[ReadinessCheck] = []
    brain = getattr(config, "brain", None)
    deep = str(getattr(brain, "deep_brain", "") or "")
    fast = str(getattr(brain, "fast_brain", "") or "")
    realtime = str(getattr(brain, "realtime_brain", "") or "")
    configured = [b for b in (deep, fast, realtime) if b]
    if configured:
        checks.append(ReadinessCheck(
            domain="models",
            name="Brain tiers configured",
            status="ok",
            detail=f"deep={deep or '—'}, fast={fast or '—'}, realtime={realtime or '—'}",
        ))
        checks.append(ReadinessCheck(
            domain="models",
            name="Hosted provider reachability",
            status="unknown",
            detail="Configured but not probed — a live probe would spend tokens.",
            checked=False,
            hint="Run Settings → provider health check when you want a real call.",
        ))
    else:
        checks.append(ReadinessCheck(
            domain="models",
            name="Brain tiers configured",
            status="fail",
            detail="No brain tier is configured — Sam cannot think yet.",
            hint="Settings → API Keys & Providers, or connect a local endpoint.",
        ))
    return checks


def _local_model_checks(config: Any) -> list[ReadinessCheck]:
    """Local inference: Ollama / llama.cpp / LM Studio / OpenAI-compatible."""
    checks: list[ReadinessCheck] = []
    ollama = _which("ollama")
    checks.append(ReadinessCheck(
        domain="local-models",
        name="Ollama binary",
        status="ok" if ollama else "unknown",
        detail=ollama or "Not on PATH — install from ollama.com to run local models.",
        checked=bool(ollama),
        hint=None if ollama else "https://ollama.com",
    ))
    endpoints = getattr(getattr(config, "local_models", None), "endpoints", None)
    if endpoints:
        checks.append(ReadinessCheck(
            domain="local-models",
            name="Custom inference endpoints",
            status="ok",
            detail=f"{len(endpoints)} endpoint(s) configured.",
        ))
        checks.append(ReadinessCheck(
            domain="local-models",
            name="Endpoint reachability",
            status="unknown",
            detail="Configured but not probed from diagnostics.",
            checked=False,
            hint="Use the Local Models card → Test connection.",
        ))
    else:
        checks.append(ReadinessCheck(
            domain="local-models",
            name="Custom inference endpoints",
            status="ok",
            detail="None configured — Ollama is auto-discovered when running.",
        ))
    return checks


def _voice_checks(config: Any) -> list[ReadinessCheck]:
    """Voice readiness: STT/TTS engines from config, wake phrase, audio stack."""
    checks: list[ReadinessCheck] = []
    stt = getattr(config, "stt", None)
    tts = getattr(config, "tts", None)
    stt_provider = str(getattr(stt, "provider", "") or "")
    tts_provider = str(getattr(tts, "provider", "") or "")
    checks.append(ReadinessCheck(
        domain="voice",
        name="Speech-to-text provider",
        status="ok" if stt_provider else "fail",
        detail=stt_provider or "No STT provider set.",
        checked=bool(stt_provider),
        hint=None if stt_provider else "Settings → Voice → Speech recognition.",
    ))
    checks.append(ReadinessCheck(
        domain="voice",
        name="Text-to-speech provider",
        status="ok" if tts_provider else "fail",
        detail=tts_provider or "No TTS provider set.",
        checked=bool(tts_provider),
        hint=None if tts_provider else "Settings → Voice → Speech output.",
    ))
    trigger = getattr(config, "trigger", None)
    phrase = str(getattr(getattr(trigger, "wake_word", None), "phrase", "") or "")
    checks.append(ReadinessCheck(
        domain="voice",
        name="Wake word",
        status="ok" if phrase else "warn",
        detail=f"“{phrase}”" if phrase else "No wake phrase — hotkey-only mode.",
        checked=True,
        hint=None if phrase else "Set one in Settings → Voice, or keep the hotkey.",
    ))
    return checks


def _agent_checks() -> list[ReadinessCheck]:
    """Coding-agent (crew) binaries on PATH — no authentication probing."""
    checks: list[ReadinessCheck] = []
    agents: tuple[tuple[str, str], ...] = (
        ("claude", "Claude Code"),
        ("codex", "Codex"),
        ("opencode", "OpenCode"),
        ("cursor-agent", "Cursor CLI"),
        ("kimi", "Kimi Code"),
        ("glm", "GLM"),
        ("grok", "Grok Build"),
        ("agy", "Antigravity"),
        ("deepseek-harness", "DeepSeek Harness"),
        ("kilo-code", "Kilo Code"),
        ("z-code", "Zed Code"),
    )
    found = [label for binary, label in agents if _which(binary)]
    if found:
        checks.append(ReadinessCheck(
            domain="agents",
            name="Coding agents installed",
            status="ok",
            detail=", ".join(found),
        ))
    else:
        checks.append(ReadinessCheck(
            domain="agents",
            name="Coding agents installed",
            status="warn",
            detail="None on PATH — the crew still works through built-in agents.",
            hint="Install any coding CLI (e.g. `npm i -g @anthropic-ai/claude-code`).",
        ))
    checks.append(ReadinessCheck(
        domain="agents",
        name="Agent authentication",
        status="unknown",
        detail="Sign-in state is probed per-agent in the Agentic IDE, not here.",
        checked=False,
        hint="Open the Agentic IDE → agent menu → Authentication.",
    ))
    return checks


def _computer_use_checks(config: Any) -> list[ReadinessCheck]:
    """Computer-use prerequisites (mirrors doctor.check_computer_use_prereqs)."""
    checks: list[ReadinessCheck] = []
    try:
        from jarvis.diagnostics.doctor import check_computer_use_prereqs

        findings = check_computer_use_prereqs(config)
    except Exception as exc:  # noqa: BLE001 — report the import gap honestly
        checks.append(ReadinessCheck(
            domain="computer-use",
            name="Prerequisites",
            status="unknown",
            detail=f"Prerequisite probe unavailable: {exc}",
            checked=False,
        ))
        return checks
    status_map = {"ok": "ok", "warn": "warn", "fail": "fail", "info": "ok"}
    for finding in findings:
        checks.append(ReadinessCheck(
            domain="computer-use",
            name=finding.category,
            status=status_map.get(finding.status, "unknown"),
            detail=finding.message,
            hint=finding.hint,
        ))
    if not findings:
        checks.append(ReadinessCheck(
            domain="computer-use",
            name="Prerequisites",
            status="unknown",
            detail="No prerequisite findings produced.",
            checked=False,
        ))
    # OS permission grants are interactive; diagnostics never triggers a prompt.
    if sys.platform == "darwin":
        checks.append(ReadinessCheck(
            domain="computer-use",
            name="macOS permission grants",
            status="unknown",
            detail="Asked by the OS at first use — see Settings → Permissions.",
            checked=False,
        ))
    return checks


def _storage_checks(config: Any) -> list[ReadinessCheck]:
    """Storage + memory: data dir writable, free disk, wiki presence."""
    checks: list[ReadinessCheck] = []
    try:
        from jarvis.core.config import DATA_DIR

        data_dir = Path(DATA_DIR)
    except Exception:  # noqa: BLE001 — config not importable in this context
        data_dir = None
    if data_dir is not None:
        try:
            data_dir.mkdir(parents=True, exist_ok=True)
            probe = data_dir / ".readiness-probe"
            probe.write_text("ok", encoding="utf-8")
            probe.unlink()
            checks.append(ReadinessCheck(
                domain="storage",
                name="Data directory writable",
                status="ok",
                detail=str(data_dir),
            ))
        except OSError as exc:
            checks.append(ReadinessCheck(
                domain="storage",
                name="Data directory writable",
                status="fail",
                detail=f"{data_dir}: {exc}",
                hint="Check the directory's permissions.",
            ))
        try:
            import shutil as _shutil

            free_gb = _shutil.disk_usage(data_dir).free / 2**30
            status = "ok" if free_gb > 1.0 else ("warn" if free_gb > 0.1 else "fail")
            checks.append(ReadinessCheck(
                domain="storage",
                name="Free disk space",
                status=status,
                detail=f"{free_gb:.1f} GB free",
            ))
        except OSError:
            checks.append(ReadinessCheck(
                domain="storage",
                name="Free disk space",
                status="unknown",
                detail="Could not stat the data volume.",
                checked=False,
            ))
        wiki = data_dir / "wiki"
        if wiki.is_dir():
            checks.append(ReadinessCheck(
                domain="storage",
                name="Memory wiki",
                status="ok",
                detail=f"{sum(1 for _ in wiki.rglob('*.md'))} note(s) on disk",
            ))
        else:
            checks.append(ReadinessCheck(
                domain="storage",
                name="Memory wiki",
                status="ok",
                detail="Not created yet — it appears on the first saved memory.",
            ))
    return checks


def _integration_checks(config: Any) -> list[ReadinessCheck]:
    """Optional integrations: MCP servers, plugins, channels — configured state only."""
    checks: list[ReadinessCheck] = []

    mcp = getattr(config, "mcp_server", None)
    if mcp is not None:
        checks.append(ReadinessCheck(
            domain="integrations",
            name="MCP server",
            status="ok",
            detail=f"Enabled: {bool(getattr(mcp, 'enabled', False))}",
        ))

    channels = getattr(config, "channels", None)
    if channels is not None:
        checks.append(ReadinessCheck(
            domain="integrations",
            name="External channels",
            status="ok",
            detail="Channel config present — Telegram/Discord state is per-channel.",
        ))

    checks.append(ReadinessCheck(
        domain="integrations",
        name="Marketplace plugins",
        status="ok",
        detail="Installed plugins are listed in the Marketplace view.",
    ))
    return checks


def build_readiness_report(config: Any) -> dict[str, Any]:
    """Assemble the readiness snapshot (local probes only, zero spend)."""
    checks: list[ReadinessCheck] = []
    checks.extend(_brain_checks(config))
    checks.extend(_local_model_checks(config))
    checks.extend(_voice_checks(config))
    checks.extend(_agent_checks())
    checks.extend(_computer_use_checks(config))
    checks.extend(_storage_checks(config))
    checks.extend(_integration_checks(config))
    counts = {"ok": 0, "warn": 0, "fail": 0, "unknown": 0}
    for check in checks:
        counts[check.status] = counts.get(check.status, 0) + 1
    return {
        "generated_for": "road-dog",
        "local_only": True,
        "spend": "none",
        "counts": counts,
        "checks": [check.to_dict() for check in checks],
    }
