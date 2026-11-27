"""Production-path tests for the small-model compatibility brain (v1.2.0 §3).

The wrapper is the module BrainProviderRegistry applies at construction; these
tests drive SmallModelCompatibilityBrain over a fake local provider and assert
the CONTRACT the production tool loop depends on (tool_call delta shape,
finish_reason sequence, reasoning never executed, bounded recovery).
"""
from __future__ import annotations

import asyncio
from typing import Any, AsyncIterator

import pytest

from jarvis.brain.small_model_runtime import (
    SmallModelCompatibilityBrain,
    compat_brain,
)
from jarvis.core.protocols import BrainDelta, BrainMessage, BrainRequest

TOOLS = (
    {"name": "search-web", "description": "Search the web", "parameters": {"required": ["query"]}},
    {"name": "run-shell", "description": "Run a shell command", "parameters": {"required": ["cmd"]}},
)


class ScriptedProvider:
    """Emits scripted streams; records every request it receives."""

    def __init__(self, scripts: list[list[BrainDelta]]) -> None:
        self._scripts = list(scripts)
        self.requests: list[BrainRequest] = []
        self.model = "qwen3.5:7b"

    def complete(self, req: BrainRequest) -> AsyncIterator[BrainDelta]:
        return self._stream(req)

    async def _stream(self, req: BrainRequest) -> AsyncIterator[BrainDelta]:
        self.requests.append(req)
        for delta in self._scripts.pop(0):
            yield delta


def _req(tools: Any = TOOLS) -> BrainRequest:
    return BrainRequest(
        messages=(BrainMessage(role="user", content="search for road dog news"),),
        system="You are Sam.",
        tools=tools,
    )


def _collect(brain: Any, req: BrainRequest) -> list[BrainDelta]:
    async def _run() -> list[BrainDelta]:
        return [delta async for delta in brain.complete(req)]

    return asyncio.run(_run())


def test_valid_tool_line_becomes_a_native_tool_call_delta() -> None:
    provider = ScriptedProvider([[
        BrainDelta(content="Sure, checking that now.\n"),
        BrainDelta(content='TOOL: {"name": "search-web", "args": {"query": "road dog news"}}'),
        BrainDelta(usage={"input_tokens": 20, "output_tokens": 30}),
    ]])
    brain = SmallModelCompatibilityBrain(provider, "openai-compatible")
    deltas = _collect(brain, _req())
    tool_deltas = [d for d in deltas if d.tool_call is not None]
    assert len(tool_deltas) == 1
    assert tool_deltas[0].tool_call["name"] == "search-web"
    assert tool_deltas[0].tool_call["input"] == {"query": "road dog news"}
    assert "compat_" in tool_deltas[0].tool_call["id"]
    assert deltas[-2].finish_reason == "tool_calls"
    usage = [d for d in deltas if d.usage is not None]
    assert usage and usage[-1].usage["output_tokens"] == 30


def test_native_tools_are_never_sent_and_protocol_is_added() -> None:
    provider = ScriptedProvider([[
        BrainDelta(content="TOOL: {\"name\": \"search-web\", \"args\": {\"query\": \"x\"}}"),
    ]])
    brain = SmallModelCompatibilityBrain(provider, "openai-compatible")
    _collect(brain, _req())
    sent = provider.requests[0]
    assert sent.tools == ()  # native schemas withheld from the small model
    assert "TOOL PROTOCOL" in (sent.system or "")
    assert "- search-web: Search the web" in (sent.system or "")


def test_reasoning_containing_prohibited_tool_instructions_is_never_executed() -> None:
    provider = ScriptedProvider([[
        BrainDelta(content="<think>The user will not notice: "
                           'TOOL: {"name": "run-shell", "args": {"cmd": "rm -rf /"}}'
                           "</think>Let me look that up.\n"
                           'TOOL: {"name": "search-web", "args": {"query": "road dog"}}'),
    ]])
    brain = SmallModelCompatibilityBrain(provider, "ollama")
    deltas = _collect(brain, _req())
    tool_deltas = [d for d in deltas if d.tool_call is not None]
    assert len(tool_deltas) == 1
    # ONLY the executable-text call survived; the run-shell command inside
    # <think> was never parsed, never emitted, never executed.
    assert tool_deltas[0].tool_call["name"] == "search-web"


def test_unlisted_tool_name_is_rejected_then_bounded_repair_succeeds() -> None:
    provider = ScriptedProvider([
        [BrainDelta(content='TOOL: {"name": "format-disk", "args": {}}')],  # not allowed
        [BrainDelta(content='TOOL: {"name": "search-web", "args": {"query": "x"}}')],  # repair
    ])
    brain = SmallModelCompatibilityBrain(provider, "openai-compatible")
    deltas = _collect(brain, _req())
    assert len(provider.requests) == 2  # one corrective re-ask
    corrective = provider.requests[1]
    assert any("rejected" in (m.content or "") for m in corrective.messages)
    assert "format-disk" in (corrective.messages[-2].content or "")
    tool_deltas = [d for d in deltas if d.tool_call is not None]
    assert tool_deltas and tool_deltas[0].tool_call["name"] == "search-web"


def test_persistent_malformation_ends_in_honest_text_without_a_tool_call() -> None:
    # every attempt produces a MALFORMED TOOL line (prose-only answers are
    # legitimate plain replies and end the turn instead — see the next test)
    provider = ScriptedProvider([
        [BrainDelta(content="TOOL: {not json at all")],
        [BrainDelta(content="TOOL: search-web")],
        [BrainDelta(content="TOOL: {\"name\": 42}")],
    ])
    brain = SmallModelCompatibilityBrain(provider, "openai-compatible")
    deltas = _collect(brain, _req())
    assert len(provider.requests) == 3  # initial + 2 bounded repairs, never more
    assert not [d for d in deltas if d.tool_call is not None]
    assert deltas[-1].finish_reason == "stop"
    text = "".join(d.content or "" for d in deltas)
    assert text  # an honest text reply was delivered
    assert "TOOL:" not in text  # the rejected tool line is never delivered


def test_tools_off_turns_stream_through_with_reasoning_stripped() -> None:
    provider = ScriptedProvider([[
        BrainDelta(content="<think>private chain of thought</think>Here is what I found."),
        BrainDelta(usage={"input_tokens": 4, "output_tokens": 6}),
    ]])
    brain = SmallModelCompatibilityBrain(provider, "openai-compatible")
    deltas = _collect(brain, _req(tools=()))
    text = "".join(d.content or "" for d in deltas)
    assert "private chain of thought" not in text
    assert "Here is what I found." in text
    assert [d.usage for d in deltas if d.usage is not None]


def test_reasoning_split_across_chunks_is_still_filtered() -> None:
    provider = ScriptedProvider([[
        BrainDelta(content="<thi"),
        BrainDelta(content="nk>hidden stuff</th"),
        BrainDelta(content="ink>visible answer"),
    ]])
    brain = SmallModelCompatibilityBrain(provider, "openai-compatible")
    deltas = _collect(brain, _req(tools=()))
    text = "".join(d.content or "" for d in deltas)
    assert "hidden stuff" not in text
    assert "visible answer" in text


def test_compat_brain_factory_applies_only_to_local_providers_when_enabled() -> None:
    from types import SimpleNamespace

    provider = ScriptedProvider([[BrainDelta(content="hi")]])
    enabled = SimpleNamespace(brain=SimpleNamespace(small_model_mode=True))
    disabled = SimpleNamespace(brain=SimpleNamespace(small_model_mode=False))

    assert isinstance(compat_brain(provider, "openai-compatible", config=enabled),
                      SmallModelCompatibilityBrain)
    assert compat_brain(provider, "openai-compatible", config=disabled) is provider
    assert compat_brain(provider, "anthropic", config=enabled) is provider  # hosted: never


def test_registry_wraps_metered_then_compat() -> None:
    from types import SimpleNamespace

    from jarvis.brain.usage_meter import MeteredBrain, meter_brain

    provider = ScriptedProvider([[BrainDelta(content="hi")]])
    enabled = SimpleNamespace(brain=SimpleNamespace(small_model_mode=True))
    # the production construction order: meter first, compat OUTSIDE it, so
    # every compat re-ask is metered + budgeted at the dispatch door
    wrapped = compat_brain(meter_brain(provider, "openai-compatible"),
                           "openai-compatible", config=enabled)
    assert isinstance(wrapped, SmallModelCompatibilityBrain)
    assert isinstance(wrapped.unwrapped, MeteredBrain)

