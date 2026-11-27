"""Small-model compatibility kit — 1B..30B models that actually work.

Local quantized models cannot swallow a 15k-character system prompt plus a
40-tool catalog and still produce parseable output. This module gives them a
fair chance WITHOUT lying about their abilities:

* :func:`compact_role_instructions` — a role-scoped micro-prompt (a few
  hundred chars, not thousands) naming the ONE job, the output contract and
  the refusal rule.
* :func:`strip_reasoning` — separates hidden reasoning from executable text.
  The returned executable text is the ONLY thing downstream parsing may act
  on; reasoning content is returned for display/audit and is never parsed
  for tool calls (v1.1.0 mission §3: "Never execute commands extracted from
  hidden reasoning or unvalidated text").
* :func:`validate_structured_output` — schema validation with BOUNDED
  repair: at most ``max_repair_attempts`` deterministic repairs (json-repair
  when installed, a brace-rebalance fallback otherwise), then an honest
  ``None`` — no infinite loops, no fabricated data.
* :func:`parse_tool_call` — the single-line deterministic tool protocol for
  models WITHOUT native tool calling::

      TOOL: {"name": "search-web", "args": {"query": "weather berlin"}}

  one call per line, JSON-validated, name-checked against the allow-list.
  Anything else (prose, partial JSON, two calls on one line) is rejected
  with a reason — the harness may then re-ask the model with a corrective
  micro-prompt, bounded by the caller.

Honesty: nothing here makes a 1B model equal to a frontier model. The kit
makes FAILURES deterministic, cheap and legible instead of silent garbage.
"""
from __future__ import annotations

import json
import re
from dataclasses import dataclass
from typing import Any, Iterable

__all__ = [
    "ROLE_INSTRUCTIONS",
    "compact_role_instructions",
    "strip_reasoning",
    "StructuredOutput",
    "validate_structured_output",
    "ToolCall",
    "ToolCallParseError",
    "parse_tool_call",
    "parse_tool_calls",
]

#: Compact, role-specific instructions — the whole system prompt for a small
#: model is these ~200-500 chars plus the tool protocol, never the full
#: persona. Each ends with the output contract and the refusal rule.
ROLE_INSTRUCTIONS: dict[str, str] = {
    "architect": (
        'You are the Architect of a small coding crew. Output a short plan '
        'as JSON: {"summary": str, "files": [{"path": str, "purpose": str}], '
        '"tests": [str]}. Keep it under 200 words. No prose outside the JSON. '
        'If you cannot, output {"error": "why"}.'
    ),
    "developer": (
        "You are the Developer. You will be given a file path, its purpose "
        "and its test list. Output exactly one fenced code block tagged with "
        "the file's language, containing the COMPLETE file content. No "
        "explanations. If a requirement is impossible, output a fenced block "
        "containing a comment '# UNIMPLEMENTED: reason'."
    ),
    "tester": (
        'You are the Tester. Run the tests you are given and report facts '
        'only, as JSON: {"passed": bool, "ran": int, "failures": [str], '
        '"notes": str}. Never claim a pass you did not observe. If you '
        'cannot run anything, set passed=false and say so.'
    ),
    "reviewer": (
        'You are the Reviewer. Inspect the files listed and report JSON: '
        '{"findings": [{"file": str, "issue": str, "severity": '
        '"low"|"medium"|"high"}], "verdict": "approve"|"request-changes"}. '
        'Report only what you can see in the provided content.'
    ),
    "debugger": (
        'You are the Debugger. Given failing output, output JSON: '
        '{"diagnosis": str, "fix": str, "confidence": "low"|"medium"|"high"}. '
        'One fix per report. Say "unknown diagnosis" rather than guessing.'
    ),
    "docs": (
        "You are the Documentation specialist. Output a short markdown "
        "usage guide (usage, options, examples) for the provided tool. Only "
        "document behaviour shown in the provided material."
    ),
    "researcher": (
        'You are the Researcher. Answer ONLY from the provided material, as '
        'JSON: {"facts": [str], "sources": [str], "gaps": [str]}. '
        'Never invent a source.'
    ),
}

_THINK_RE = re.compile(
    r"<think(?:ing)?>(.*?)</think(?:ing)?>", re.DOTALL | re.IGNORECASE
)
_THINK_OPEN_RE = re.compile(r"<think(?:ing)?>", re.IGNORECASE)
_TOOL_LINE_RE = re.compile(r"^\s*TOOL:\s*(\{.*\})\s*$")


def compact_role_instructions(role: str, *, task: str | None = None) -> str:
    """The micro system-prompt for ``role`` (+ optional one-line task)."""
    base = ROLE_INSTRUCTIONS.get(role)
    if base is None:
        raise KeyError(f"unknown role {role!r}; known: {sorted(ROLE_INSTRUCTIONS)}")
    if task:
        return f"{base}\n\nTASK: {task.strip()}"
    return base


@dataclass
class StructuredOutput:
    """The separated result of a small-model answer."""

    executable_text: str      # parsed further / acted on — NEVER the reasoning
    reasoning: str            # audit/display only
    had_reasoning: bool


def strip_reasoning(text: str) -> StructuredOutput:
    """Split hidden reasoning out of a model answer.

    Both closed ``<think>…</think>`` blocks and an unterminated opening tag
    (a truncated generation) are treated as reasoning. The executable text is
    what remains; it is the only text downstream code may act on.
    """
    if not text:
        return StructuredOutput(executable_text="", reasoning="", had_reasoning=False)
    reasoning_parts = _THINK_RE.findall(text)
    remainder = _THINK_RE.sub("", text)
    unterminated = _THINK_OPEN_RE.search(remainder)
    had = bool(reasoning_parts)
    if unterminated:
        # generation truncated mid-think: everything from the tag is reasoning
        reasoning_parts.append(remainder[unterminated.end():])
        remainder = remainder[: unterminated.start()]
        had = True
    return StructuredOutput(
        executable_text=remainder.strip(),
        reasoning="\n".join(reasoning_parts).strip(),
        had_reasoning=had,
    )


@dataclass
class ToolCall:
    name: str
    args: dict[str, Any]


class ToolCallParseError(ValueError):
    """A tool-call line that must not be executed, with the reason."""


def parse_tool_call(line: str, *, allowed_tools: Iterable[str] | None = None) -> ToolCall:
    """Parse ONE deterministic tool-call line; raise on anything unsafe.

    Rules (all enforced): the line must match ``TOOL: {json}``; the JSON must
    be an object with a string ``name`` and (optional) object ``args``; the
    name must be in ``allowed_tools`` when provided. Prose, markdown fences,
    multiple JSON objects, or trailing commentary are all rejected — the
    harness re-asks instead of guessing.
    """
    match = _TOOL_LINE_RE.match(line or "")
    if match is None:
        raise ToolCallParseError("line is not a single 'TOOL: {json}' call")
    try:
        payload = json.loads(match.group(1))
    except json.JSONDecodeError as exc:
        raise ToolCallParseError(f"tool JSON is malformed: {exc.msg}") from exc
    if not isinstance(payload, dict) or set(payload) - {"name", "args"}:
        raise ToolCallParseError("tool payload must be an object with only 'name' and 'args'")
    name = payload.get("name")
    if not isinstance(name, str) or not name.strip():
        raise ToolCallParseError("'name' must be a non-empty string")
    args = payload.get("args", {})
    if not isinstance(args, dict):
        raise ToolCallParseError("'args' must be an object")
    if allowed_tools is not None and name not in set(allowed_tools):
        raise ToolCallParseError(f"tool {name!r} is not in the allowed set")
    return ToolCall(name=name, args=args)


def parse_tool_calls(
    text: str, *, allowed_tools: Iterable[str] | None = None
) -> list[ToolCall]:
    """Parse every tool-call line in executable text (reasoning already stripped).

    STRICT protocol: the executable text may contain ONLY tool-call lines
    (and blank lines). Any prose that slips through is a malformed answer —
    the whole batch aborts so the caller re-asks instead of executing a
    partial guess. A bare ``TOOL:`` prefix line is tolerated as noise.
    """
    tool_lines: list[str] = []
    for raw in (text or "").splitlines():
        if not raw.strip() or raw.strip().upper() == "TOOL:":
            continue
        if raw.lstrip().upper().startswith("TOOL:"):
            tool_lines.append(raw)
    if not tool_lines:
        return []
    return [parse_tool_call(line, allowed_tools=allowed_tools) for line in tool_lines]


@dataclass
class StructuredValidation:
    value: dict[str, Any] | None
    error: str | None = None
    repairs_attempted: int = 0


def _brace_rebalance(text: str) -> str:
    """Deterministic last-resort repair: drop trailing junk, close braces."""
    depth = 0
    last_good = 0
    for index, char in enumerate(text):
        if char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0:
                last_good = index + 1
                break
    candidate = text[:last_good] if last_good else text.strip()
    if depth > 0:
        candidate = candidate + ("}" * depth)
    return candidate


def validate_structured_output(
    text: str,
    schema: dict[str, type] | None = None,
    *,
    max_repair_attempts: int = 2,
) -> StructuredValidation:
    """Parse + validate a small model's structured answer; bounded repairs.

    ``schema`` maps required top-level keys to expected python types
    (``str``, ``bool``, ``int``, ``list``, ``dict``). Repairs are attempted
    at most ``max_repair_attempts`` times (json-repair when installed, then
    the brace-rebalance fallback); failure is an honest ``None`` + reason.
    """
    attempts = 0
    candidate = (text or "").strip()
    # strip a markdown fence if the model wrapped its JSON in one
    fence = re.match(r"^```[a-zA-Z]*\s*(.*?)\s*```$", candidate, re.DOTALL)
    if fence:
        candidate = fence.group(1).strip()
    error: str | None = None
    while True:
        try:
            value = json.loads(candidate)
        except json.JSONDecodeError as exc:
            error = f"invalid JSON: {exc.msg}"
        else:
            if schema is not None:
                if not isinstance(value, dict):
                    error = "expected a JSON object"
                else:
                    problems = [
                        f"key {key!r} must be {expected.__name__}"
                        for key, expected in schema.items()
                        if key not in value or not isinstance(value[key], expected)
                    ]
                    if problems:
                        error = "; ".join(problems)
                    else:
                        return StructuredValidation(value=value, repairs_attempted=attempts)
            else:
                return StructuredValidation(value=value, repairs_attempted=attempts)
        if attempts >= max_repair_attempts:
            return StructuredValidation(value=None, error=error, repairs_attempted=attempts)
        attempts += 1
        if attempts == 1:
            try:
                import json_repair  # type: ignore[import-not-found]

                candidate = json_repair.repair_json(candidate)
                continue
            except Exception:  # noqa: BLE001 — fall through to the fallback
                pass
        candidate = _brace_rebalance(candidate)
