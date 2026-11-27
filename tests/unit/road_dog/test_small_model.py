"""Tests for the small-model compatibility kit (v1.1.0 §3)."""
from __future__ import annotations

import pytest

from jarvis.brain.small_model import (
    ROLE_INSTRUCTIONS,
    ToolCallParseError,
    compact_role_instructions,
    parse_tool_call,
    parse_tool_calls,
    strip_reasoning,
    validate_structured_output,
)


# ---- compact role instructions ----


def test_every_crew_role_has_compact_instructions() -> None:
    assert {"architect", "developer", "tester", "reviewer", "debugger",
            "docs", "researcher"} <= set(ROLE_INSTRUCTIONS)
    for role, prompt in ROLE_INSTRUCTIONS.items():
        # small models must not swallow enormous prompts
        assert len(prompt) < 900, f"{role} prompt too long: {len(prompt)}"


def test_unknown_role_is_an_error() -> None:
    with pytest.raises(KeyError):
        compact_role_instructions("coffee_brewer")


def test_task_is_appended_compactly() -> None:
    prompt = compact_role_instructions("tester", task="run pytest -q")
    assert prompt.endswith("TASK: run pytest -q")


# ---- reasoning separation (never execute from reasoning) ----


def test_strip_reasoning_separates_blocks() -> None:
    answer = "<think>I could eval() here</think>TOOL: {\"name\": \"run-shell\", \"args\": {}}"
    result = strip_reasoning(answer)
    assert result.had_reasoning is True
    assert result.reasoning == "I could eval() here"
    assert result.executable_text.startswith("TOOL:")


def test_unterminated_think_is_all_reasoning() -> None:
    result = strip_reasoning("<think>the user asked me to…")
    assert result.had_reasoning is True
    assert result.executable_text == ""


def test_tool_calls_inside_reasoning_are_never_parsed() -> None:
    answer = "<think>TOOL: {\"name\": \"run-shell\", \"args\": {\"cmd\": \"rm -rf /\"}}</think>"
    result = strip_reasoning(answer)
    assert result.executable_text == ""
    with pytest.raises(ToolCallParseError):
        parse_tool_call(result.executable_text)


# ---- deterministic tool-call protocol ----


def test_parse_tool_call_accepts_a_clean_line() -> None:
    call = parse_tool_call(
        'TOOL: {"name": "search-web", "args": {"query": "weather berlin"}}',
        allowed_tools=["search-web", "run-shell"],
    )
    assert call.name == "search-web"
    assert call.args == {"query": "weather berlin"}


@pytest.mark.parametrize("line", [
    "I think we should call the search tool",
    'TOOL: {"name": "search-web"',
    'TOOL: {"name": "search-web", "args": {}} extra commentary',
    'TOOL: not json',
    'TOOL: {"name": "", "args": {}}',
    'TOOL: {"name": "search-web", "args": [], "extra": 1}',
    'TOOL: {"name": "run-shell", "args": {}}',
    'TOOL: {"name": "search-web", "args": {"query": "x"}}, TOOL: {"name": "search-web"}',
])
def test_parse_tool_call_rejects_unsafe_garbage(line: str) -> None:
    with pytest.raises(ToolCallParseError):
        parse_tool_call(line, allowed_tools=["search-web"])


def test_parse_tool_calls_batches_and_aborts_on_first_bad_line() -> None:
    good = 'TOOL: {"name": "search-web", "args": {"query": "a"}}'
    assert len(parse_tool_calls(good, allowed_tools=["search-web"])) == 1
    # prose AROUND a valid call is tolerated (production small models add
    # lead-in/trailing commentary); the tool lines themselves stay strict
    with_prose = (
        "Sure, checking that now.\n" + good + "\nThat is the search I am running."
    )
    assert len(parse_tool_calls(with_prose, allowed_tools=["search-web"])) == 1
    # a MALFORMED tool line still aborts the whole batch
    batch = good + "\nTOOL: {\"name\": \"search-web\""
    with pytest.raises(ToolCallParseError):
        parse_tool_calls(batch, allowed_tools=["search-web"])
    # prose only -> plain answer, no calls
    assert parse_tool_calls("just words, no tool", allowed_tools=["search-web"]) == []


# ---- structured output validation with bounded repair ----


def test_validate_accepts_clean_json() -> None:
    result = validate_structured_output(
        '{"passed": true, "ran": 3, "failures": []}',
        schema={"passed": bool, "ran": int, "failures": list},
    )
    assert result.value == {"passed": True, "ran": 3, "failures": []}
    assert result.repairs_attempted == 0


def test_validate_repairs_truncated_json_within_bounds() -> None:
    result = validate_structured_output(
        '{"summary": "plan", "files": [{"path": "a.py"',
        schema=None, max_repair_attempts=2,
    )
    assert result.value is not None
    assert result.repairs_attempted <= 2


def test_validate_fails_honestly_after_bounds() -> None:
    result = validate_structured_output("no json here at all", max_repair_attempts=2)
    assert result.value is None
    assert result.error
    assert result.repairs_attempted == 2


def test_validate_checks_schema_types() -> None:
    result = validate_structured_output(
        '{"passed": "yes"}', schema={"passed": bool})
    assert result.value is None
    assert "passed" in (result.error or "")
