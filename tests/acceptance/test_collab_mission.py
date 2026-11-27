"""The mandatory end-to-end collaboration acceptance test (v1.1.0 §5).

Runs the FULL acceptance mission and verifies with REAL observations, never
agent-reported success:

- actual files exist on disk,
- the application LAUNCHES (subprocess) and hashes correctly,
- the generated app's own pytest suite PASSES (subprocess, real execution),
- agent handoffs are recorded and structurally complete,
- mission state (budgets) stays consistent and budgets actually STOP work,
- resource consumption is recorded per stage.

The model turns are a deterministic simulation (no credentials in this
environment); everything else — file creation, test execution, CLI launch,
handoff validation, budget accounting — is real production machinery. The
result payload distinguishes simulated vs live parts explicitly, so this can
never be mistaken for a live-model acceptance run.
"""
from __future__ import annotations

import hashlib
import subprocess
import sys
from pathlib import Path

import pytest

from jarvis.acceptance.mission import run_acceptance_mission


@pytest.fixture(scope="module")
def mission(tmp_path_factory: pytest.TempPathFactory) -> dict:
    work = tmp_path_factory.mktemp("acceptance-mission")
    result = run_acceptance_mission(work)
    return result.as_dict()


def test_mission_overall_verdict(mission: dict) -> None:
    assert mission["ok"] is True, mission["stages"]


def test_actual_files_exist(mission: dict) -> None:
    app_dir = Path(mission["app_dir"])
    for name in ("rd_checksum.py", "tests/test_rd_checksum.py",
                 "spec.md", "README.md"):
        path = app_dir / name
        assert path.is_file(), f"missing artifact: {name}"
        assert path.stat().st_size > 100


def test_application_launches_and_hashes_correctly(mission: dict) -> None:
    app_dir = Path(mission["app_dir"])
    probe = app_dir / "launch-probe.bin"
    probe.write_bytes(b"launch verification payload")
    run = subprocess.run(
        [sys.executable, str(app_dir / "rd_checksum.py"), str(probe)],
        capture_output=True, text=True, timeout=60,
    )
    assert run.returncode == 0, run.stderr
    expected = hashlib.sha256(probe.read_bytes()).hexdigest()
    assert f"{expected}  {probe}" in run.stdout


def test_generated_app_test_suite_passes(mission: dict) -> None:
    app_dir = Path(mission["app_dir"])
    run = subprocess.run(
        [sys.executable, "-m", "pytest", "tests/", "-q", "--no-header"],
        cwd=str(app_dir), capture_output=True, text=True, timeout=180,
    )
    assert run.returncode == 0, run.stdout + run.stderr
    assert "no tests ran" not in run.stdout


def test_handoffs_are_recorded_and_complete(mission: dict) -> None:
    handoffs = mission["handoffs"]
    assert len(handoffs) == 4  # architect→developer→tester→reviewer→docs
    chain = [(h["sender"], h["receiver"]) for h in handoffs]
    assert chain == [("architect", "developer"), ("developer", "tester"),
                     ("tester", "reviewer"), ("reviewer", "docs")]
    for h in handoffs:
        assert {"sender", "receiver", "completed_work", "remaining_work",
                "artifacts", "known_failures", "verification_required",
                "resource_usage"} <= set(h)


def test_resource_consumption_is_recorded(mission: dict) -> None:
    budgets = mission["budgets"]
    mission_usage = budgets["mission:acceptance"]["usage"]
    assert mission_usage["tokens_measured"] > 0
    assert mission_usage["requests"] >= 5
    assert "agent:developer" in budgets


def test_budget_enforcement_actually_stops_work(mission: dict) -> None:
    assert mission["live_checks"]["budget_stop_proven"] is True
    assert mission["stopped_reasons"]


def test_honesty_labelling(mission: dict) -> None:
    honesty = mission["honesty"]
    assert honesty["deterministic_harness"] is True
    assert "developer model turn" in honesty["simulated_parts"]
    assert "pytest execution" in honesty["live_parts"]
