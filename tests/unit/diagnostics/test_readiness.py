"""Tests for the readiness report (jarvis.diagnostics.readiness).

The contract under test is HONESTY, more than any single row:

- the report is local-only (``spend == "none"``) and never claims a network
  probe it did not run,
- every row carries ``checked``; an unchecked row is ``unknown``, never green,
- a config with no brain tier fails loudly instead of showing green,
- the domain set covers the mission's dashboard: models, local-models, voice,
  agents, computer-use, storage, integrations.
"""
from __future__ import annotations

from types import SimpleNamespace

from jarvis.diagnostics.readiness import build_readiness_report


def _cfg(**overrides: object) -> SimpleNamespace:
    base = dict(
        brain=SimpleNamespace(deep_brain="anthropic", fast_brain="", realtime_brain=""),
        local_models=SimpleNamespace(endpoints=[]),
        stt=SimpleNamespace(provider="faster-whisper"),
        tts=SimpleNamespace(provider="local"),
        trigger=SimpleNamespace(wake_word=SimpleNamespace(phrase="Hey Sam")),
        computer_use=SimpleNamespace(),
        channels=None,
    )
    base.update(overrides)
    return SimpleNamespace(**base)


def _rows(report: dict, domain: str) -> dict[str, dict]:
    return {row["name"]: row for row in report["checks"] if row["domain"] == domain}


def test_report_is_local_only_and_never_spends() -> None:
    report = build_readiness_report(_cfg())
    assert report["local_only"] is True
    assert report["spend"] == "none"


def test_report_domains_cover_the_dashboard() -> None:
    report = build_readiness_report(_cfg())
    domains = {row["domain"] for row in report["checks"]}
    assert {
        "models", "local-models", "voice", "agents",
        "computer-use", "storage", "integrations",
    } <= domains


def test_unchecked_rows_are_unknown_and_marked() -> None:
    report = build_readiness_report(_cfg())
    hosted = _rows(report, "models")["Hosted provider reachability"]
    assert hosted["status"] == "unknown"
    assert hosted["checked"] is False


def test_missing_brain_tier_fails_loudly() -> None:
    cfg = _cfg(brain=SimpleNamespace(deep_brain="", fast_brain="", realtime_brain=""))
    report = build_readiness_report(cfg)
    tier_row = _rows(report, "models")["Brain tiers configured"]
    assert tier_row["status"] == "fail"
    assert report["counts"]["fail"] >= 1


def test_configured_brain_is_ok_but_not_verified() -> None:
    report = build_readiness_report(_cfg())
    models = _rows(report, "models")
    assert models["Brain tiers configured"]["status"] == "ok"
    assert "anthropic" in models["Brain tiers configured"]["detail"]


def test_voice_rows_reflect_config() -> None:
    report = build_readiness_report(_cfg())
    voice = _rows(report, "voice")
    assert voice["Speech-to-text provider"]["status"] == "ok"
    assert voice["Wake word"]["status"] == "ok"
    assert "Hey Sam" in voice["Wake word"]["detail"]


def test_missing_wake_word_warns_not_fails() -> None:
    cfg = _cfg(trigger=SimpleNamespace(wake_word=SimpleNamespace(phrase="")))
    report = build_readiness_report(cfg)
    assert _rows(report, "voice")["Wake word"]["status"] == "warn"


def test_storage_reports_writable_data_dir(tmp_path) -> None:
    report = build_readiness_report(_cfg())
    storage = _rows(report, "storage")
    assert storage["Data directory writable"]["status"] in {"ok", "fail"}
    assert "Free disk space" in storage


def test_every_row_has_required_fields() -> None:
    report = build_readiness_report(_cfg())
    assert report["checks"]
    for row in report["checks"]:
        assert set(row) == {"domain", "name", "status", "detail", "checked", "hint"}
        assert row["status"] in {"ok", "warn", "fail", "unknown"}
        assert isinstance(row["checked"], bool)
