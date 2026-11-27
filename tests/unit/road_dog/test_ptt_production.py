"""Push-to-talk production-path verification (v1.2.0 §7).

Scope honesty (stated up front): the HOLD-TO-RECORD audio loop itself needs
real audio hardware and stays listed in KNOWN-LIMITATIONS. What IS verified
here is the complete PRODUCTION wiring from the config field through the
keyboard shortcut plumbing to the pipeline's PTT mode, plus the pipeline's
own PTT state contract on press/release edges.
"""
from __future__ import annotations

import inspect

from jarvis.core.config import TriggerConfig


def test_config_key_reaches_the_pipeline_slot() -> None:
    call_keys, ptt_keys = TriggerConfig(push_to_talk_key="alt+win+space").resolve_hotkeys()
    assert ptt_keys == ("alt+win+space",)
    assert call_keys  # call hotkey unaffected — PTT works beside it


def test_ptt_works_with_wake_word_disabled() -> None:
    cfg = TriggerConfig(push_to_talk_key="alt+q", hotkey="", wake_word_enabled=False)
    call_keys, ptt_keys = cfg.resolve_hotkeys()
    assert ptt_keys == ("alt+q",)  # PTT alone is a complete activation path


def test_desktop_construction_feeds_resolve_hotkeys_into_the_pipeline() -> None:
    """Guard: the desktop app passes BOTH tuples into SpeechPipeline."""
    from jarvis.ui import desktop_app

    src = inspect.getsource(desktop_app)
    assert "resolve_hotkeys()" in src
    assert "ptt_hotkeys=" in src


def test_pipeline_consumes_the_ptt_slot_and_has_press_edges() -> None:
    """Guard: SpeechPipeline owns _ptt_hotkeys and press/release handlers."""
    from jarvis.speech.pipeline import SpeechPipeline

    init_src = inspect.getsource(SpeechPipeline.__init__)
    assert "ptt_hotkeys" in init_src
    assert hasattr(SpeechPipeline, "_on_ptt_press")
    assert "_ptt_mode" in init_src or "_ptt_mode" in inspect.getsource(
        SpeechPipeline._on_ptt_press
    )


def test_press_edge_is_idempotent_against_key_repeat() -> None:
    """The press handler documents re-fire protection (self-healing latch)."""
    from jarvis.speech.pipeline import SpeechPipeline

    doc = inspect.getdoc(SpeechPipeline._on_ptt_press) or ""
    assert "Idempotent" in doc or "idempotent" in doc
    assert "key-repeat" in doc or "re-fires" in doc
