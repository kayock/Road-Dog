"""Small-model compatibility mode — the PRODUCTION brain wrapper (v1.2.0 §3).

Applied by :class:`jarvis.brain.provider_registry.BrainProviderRegistry` at
provider construction (the same door that metering is applied at), ONLY for
local endpoint providers (``ollama`` / ``openai-compatible``) and ONLY when
``[brain] small_model_mode`` is enabled. Capable larger models are never
restricted by it.

What the production runtime gains in this mode (driven by
:mod:`jarvis.brain.small_model`, the kit unit-tested separately):

* **Compact tool surface.** Native tool schemas are NOT sent to the model.
  The wrapper replaces them with a compact allow-list block in the system
  prompt and a strict single-line protocol (``TOOL: {"name": …, "args": …}``).
* **Reasoning/executable separation.** ``<think>`` blocks are stripped from
  the stream and NEVER parsed for tool calls — hidden reasoning cannot move
  tools.
* **Validated structured outputs, bounded recovery.** The reply text is
  parsed with :func:`jarvis.brain.small_model.parse_tool_calls` (strict
  allow-list). A rejected answer triggers a corrective re-ask to the SAME
  provider, at most ``max_repair_asks`` times; each re-ask is a REAL
  provider call, so it passes through the metered door and is budgeted.
  After the bound, the wrapper yields an honest no-tool text turn — it never
  executes a guess.
* **Native tool-call delta contract.** Valid calls are re-emitted as the
  exact ``BrainDelta(tool_call={"id","name","input"})`` + ``finish_reason``
  sequence the production tool loop (``jarvis.brain.tool_use_loop``)
  consumes, so the rest of the pipeline is unchanged.
"""
from __future__ import annotations

import json
import logging
from collections.abc import AsyncIterator
from typing import Any

from jarvis.brain.small_model import (
    ToolCallParseError,
    parse_tool_calls,
    strip_reasoning,
)
from jarvis.core.protocols import BrainDelta, BrainMessage, BrainRequest

log = logging.getLogger(__name__)

#: Provider slugs the compatibility mode may apply to — local endpoints only.
COMPAT_PROVIDERS = frozenset({"ollama", "openai-compatible", "lm-studio", "llama.cpp"})

_PROTOCOL_HEADER = (
    "TOOL PROTOCOL (strict): you may use exactly ONE tool per reply. "
    "End your reply with a single line of the form:\n"
    'TOOL: {"name": "<tool-name>", "args": {<json arguments>}}\n'
    "No other JSON, no markdown fences, no commentary after that line.\n"
    "AVAILABLE TOOLS:\n"
)

_CORRECTIVE = (
    "Your previous reply was rejected: {reason}\n"
    "Send ONE tool call, exactly one line: TOOL: {{\"name\": \"<tool-name>\", "
    "\"args\": {{…}}}} — or reply in plain words without a TOOL line."
)


def _tool_listing(tools: tuple[dict[str, Any], ...]) -> tuple[str, list[str]]:
    """Compact allow-list text + the accepted names (context-efficient)."""
    lines: list[str] = []
    names: list[str] = []
    for tool in tools:
        name = str(tool.get("name") or "")
        if not name:
            continue
        names.append(name)
        description = str(tool.get("description") or "")[:160]
        schema = tool.get("parameters") or tool.get("input_schema") or {}
        props = ""
        try:
            required = schema.get("required") if isinstance(schema, dict) else None
            props = ", ".join(str(item) for item in (required or []))
        except Exception:  # noqa: BLE001 — schema quirks must not break the turn
            props = ""
        lines.append(f"- {name}: {description}" + (f" (required: {props})" if props else ""))
    return "\n".join(lines), names


class SmallModelCompatibilityBrain:
    """Production brain wrapper for tool-less small local models."""

    __slots__ = ("_inner", "_provider_name", "_max_repair_asks")

    def __init__(self, inner: Any, provider_name: str, *, max_repair_asks: int = 2) -> None:
        object.__setattr__(self, "_inner", inner)
        object.__setattr__(self, "_provider_name", provider_name)
        object.__setattr__(self, "_max_repair_asks", max(max_repair_asks, 0))

    # -- forwarding (mirror MeteredBrain's contract) -------------------------

    def __getattr__(self, name: str) -> Any:
        return getattr(self._inner, name)

    def __setattr__(self, name: str, value: Any) -> None:
        setattr(self._inner, name, value)

    def __repr__(self) -> str:  # pragma: no cover
        return f"SmallModelCompatibilityBrain({self._inner!r})"

    @property
    def unwrapped(self) -> Any:
        return self._inner

    @property  # type: ignore[misc]
    def __class__(self) -> type:  # type: ignore[override]
        return type(self._inner)

    def estimate_cost(self, req: BrainRequest) -> float:
        return float(self._inner.estimate_cost(req))

    # -- the production entry point ------------------------------------------

    def complete(self, req: BrainRequest) -> AsyncIterator[BrainDelta]:
        if getattr(req, "tools", None):
            return self._compat_turn(req)
        return self._reasoning_filtered(req)

    # -- no-tools turns: stream through, reasoning stripped -------------------

    async def _reasoning_filtered(self, req: BrainRequest) -> AsyncIterator[BrainDelta]:
        """Stream the inner provider with <think> content removed.

        A chunk that splits a tag is handled by holding back a trailing
        partial marker (never more than a few characters) so streaming stays
        live while the filter stays correct. Non-content deltas (usage,
        finish, native tool calls) propagate untouched.
        """
        buffer = ""
        swallowing = False
        async for delta in self._inner.complete(req):
            content = delta.content
            if content is None:
                yield delta
                continue
            text = buffer + content
            buffer = ""
            emitted: list[str] = []
            while text:
                if swallowing:
                    end = text.lower().find("</think>")
                    if end < 0:
                        keep = min(len(text), 8)
                        buffer = text[-keep:]
                        text = ""
                        break
                    text = text[end + len("</think>"):]
                    swallowing = False
                    continue
                start = text.lower().find("<think")
                if start < 0:
                    # hold back a possible split opening marker
                    held = ""
                    for cut in range(min(len(text), 7), 0, -1):
                        if "<think"[:cut] == text[-cut:].lower():
                            held = text[-cut:]
                            text = text[:-cut]
                            break
                    if text:
                        emitted.append(text)
                    buffer = held
                    text = ""
                    break
                if start > 0:
                    emitted.append(text[:start])
                text = text[start:]
                swallowing = True
                if text.lower().startswith("<think>"):
                    text = text[len("<think>"):]
                elif text.lower().startswith("<thinking>"):
                    text = text[len("<thinking>"):]
            joined = "".join(emitted)
            if joined:
                yield BrainDelta(content=joined)
            if delta.tool_call is not None:
                yield BrainDelta(tool_call=delta.tool_call)
            if delta.finish_reason is not None:
                yield BrainDelta(finish_reason=delta.finish_reason)
            if delta.usage is not None:
                yield BrainDelta(usage=delta.usage)
        if buffer and not swallowing:
            yield BrainDelta(content=buffer)

    # -- tool turns: compact protocol + validated calls + bounded recovery ----

    async def _compat_turn(self, req: BrainRequest) -> AsyncIterator[BrainDelta]:
        listing, names = _tool_listing(req.tools)
        system = (req.system or "") + "\n\n" + _PROTOCOL_HEADER + listing + "\n"
        messages = req.messages
        usage_in = usage_out = usage_cached = 0
        total_tokens_seen = False

        for attempt in range(self._max_repair_asks + 1):
            turn_req = BrainRequest(
                messages=messages,
                tools=(),  # the protocol replaces native schemas
                system=system,
                temperature=req.temperature,
                max_tokens=req.max_tokens,
                stream=req.stream,
            )
            answer_parts: list[str] = []
            async for delta in self._inner.complete(turn_req):
                if delta.content:
                    answer_parts.append(delta.content)
                if isinstance(delta.usage, dict) and delta.usage:
                    usage_in = int(delta.usage.get("input_tokens", 0) or 0)
                    usage_out = int(delta.usage.get("output_tokens", 0) or 0)
                    usage_cached = int(delta.usage.get("cache_hit_tokens", 0) or 0)
                    total_tokens_seen = True
            raw_answer = "".join(answer_parts)
            separated = strip_reasoning(raw_answer)
            # reasoning is NEVER parsed; only the executable text is checked
            try:
                calls = parse_tool_calls(separated.executable_text, allowed_tools=names)
            except ToolCallParseError as exc:
                if attempt >= self._max_repair_asks:
                    log.info(
                        "small-model compat: %s answer rejected (%s); delivering text",
                        self._provider_name, exc,
                    )
                    # deliver any PROSE the model produced, never the rejected
                    # tool line itself; fall back to an honest short line
                    prose = "\n".join(
                        line for line in separated.executable_text.splitlines()
                        if not line.lstrip().upper().startswith("TOOL:")
                    ).strip()
                    yield BrainDelta(
                        content=prose
                        or "I could not produce a valid tool call for that request.",
                    )
                    yield BrainDelta(finish_reason="stop")
                    if total_tokens_seen:
                        yield BrainDelta(usage={
                            "input_tokens": usage_in,
                            "output_tokens": usage_out,
                            "cache_hit_tokens": usage_cached,
                        })
                    return
                # bounded corrective re-ask — a REAL provider call (budgeted)
                messages = tuple(messages) + (
                    BrainMessage(role="assistant", content=raw_answer),
                    BrainMessage(role="user", content=_CORRECTIVE.format(reason=str(exc))),
                )
                continue
            if not calls:
                # an honest plain-words answer without a tool call
                yield BrainDelta(content=separated.executable_text)
                yield BrainDelta(finish_reason="stop")
                if total_tokens_seen:
                    yield BrainDelta(usage={
                        "input_tokens": usage_in,
                        "output_tokens": usage_out,
                        "cache_hit_tokens": usage_cached,
                    })
                return
            for index, call in enumerate(calls):
                yield BrainDelta(tool_call={
                    "id": f"compat_{attempt}_{index}",
                    "name": call.name,
                    "input": call.args,
                })
            yield BrainDelta(finish_reason="tool_calls")
            if total_tokens_seen:
                yield BrainDelta(usage={
                    "input_tokens": usage_in,
                    "output_tokens": usage_out,
                    "cache_hit_tokens": usage_cached,
                })
            return


def compat_brain(provider: Any, provider_name: str, *, config: Any = None) -> Any:
    """Wrap when the provider is a local endpoint AND the mode is enabled."""
    if type(provider) is SmallModelCompatibilityBrain:
        return provider
    if provider_name not in COMPAT_PROVIDERS:
        return provider
    if config is None:
        try:
            from jarvis.core.config import load_config

            config = load_config()
        except Exception:  # noqa: BLE001 — no config in this context: no mode
            return provider
    brain_cfg = getattr(config, "brain", None)
    if not bool(getattr(brain_cfg, "small_model_mode", False)):
        return provider
    log.info("small-model compatibility mode active for %s", provider_name)
    return SmallModelCompatibilityBrain(provider, provider_name)


__all__ = [
    "COMPAT_PROVIDERS",
    "SmallModelCompatibilityBrain",
    "compat_brain",
]
