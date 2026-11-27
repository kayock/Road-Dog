"""Tests for the restored push-to-talk hotkey plumbing (v1.1.0 §7).

Scope honesty: this covers the CONFIG → HOTKEY ARMING contract (what the
compatibility window of ``SpeechPipeline`` consumes). The live audio loop
(hold-to-record, echo prevention) needs real audio hardware and is verified
separately; these tests pin that a configured PTT key REACHES the pipeline
and that the default stays empty (wake word is the default activation).
"""
from __future__ import annotations

from jarvis.core.config import TriggerConfig


def test_ptt_key_default_is_empty() -> None:
    cfg = TriggerConfig()
    call_hotkeys, ptt_hotkeys = cfg.resolve_hotkeys()
    assert ptt_hotkeys == ()  # wake word remains the default activation


def test_ptt_key_reaches_the_pipeline_slot() -> None:
    cfg = TriggerConfig(push_to_talk_key="alt+win+space")
    call_hotkeys, ptt_hotkeys = cfg.resolve_hotkeys()
    assert ptt_hotkeys == ("alt+win+space",)
    assert call_hotkeys == (cfg.hotkey_call,)  # call key unaffected


def test_blank_ptt_key_is_ignored() -> None:
    cfg = TriggerConfig(push_to_talk_key="  ")
    _, ptt_hotkeys = cfg.resolve_hotkeys()
    assert ptt_hotkeys == ()

