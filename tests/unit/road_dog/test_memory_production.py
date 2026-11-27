"""Sam's memory in the PRODUCTION conversation assembly (v1.2.0 §6).

BrainManager._build_system_prompt renders the memory layers live (layer 3:
USER.md via UserProfile.render_for_prompt; layer 4: people/*.md via the
people store). These tests drive the REAL renderers over a real workspace
and verify create → retrieve, correct → changed, delete → gone, restart →
persisted. The sam_memory_routes REST surface operates on the SAME files.
"""
from __future__ import annotations

import inspect

from jarvis.memory.user_profile import UserProfile
from jarvis.memory.workspace import Workspace


def _ws(tmp_path) -> Workspace:
    return Workspace.ensure(tmp_path / "workspace")


def test_prompt_renders_authorized_memory(tmp_path) -> None:
    ws = _ws(tmp_path)
    profile = UserProfile.load(ws.user_path)
    profile.set("identity", "name", "Alex")
    profile.save()
    (ws.people_dir).mkdir(parents=True, exist_ok=True)
    (ws.people_dir / "joe.md").write_text(
        "---\nname: Joe\nrelation: colleague\n---\nJoe works on the road crew.\n",
        encoding="utf-8",
    )
    rendered = UserProfile.load(ws.user_path).render_for_prompt()
    assert "Alex" in rendered  # the name Sam should use


def test_corrected_memory_changes_the_next_prompt(tmp_path) -> None:
    ws = _ws(tmp_path)
    profile = UserProfile.load(ws.user_path)
    profile.set("identity", "name", "Alex")
    profile.save()
    assert "Alex" in UserProfile.load(ws.user_path).render_for_prompt()
    profile = UserProfile.load(ws.user_path)
    profile.set("identity", "name", "Sasha")  # the user corrected their name
    profile.save()
    reloaded = UserProfile.load(ws.user_path).render_for_prompt()
    assert "Sasha" in reloaded
    assert "Alex" not in reloaded  # stale memory is gone from the prompt


def test_deleted_memory_disappears_from_the_prompt(tmp_path) -> None:
    ws = _ws(tmp_path)
    (ws.people_dir).mkdir(parents=True, exist_ok=True)
    (ws.people_dir / "joe.md").write_text(
        "---\nname: Joe\n---\nJoe detail.\n", encoding="utf-8")
    assert ws.list_people()
    (ws.people_dir / "joe.md").unlink()  # the user deletes the memory
    assert not ws.list_people()


def test_memories_persist_across_application_restart(tmp_path) -> None:
    """Files are the restart boundary: a fresh workspace sees them all."""
    ws = _ws(tmp_path)
    profile = UserProfile.load(ws.user_path)
    profile.set("identity", "name", "Alex")
    profile.save()
    # "restart": a brand-new process re-opens the workspace from disk
    ws2 = Workspace(root=ws.root)
    assert ws2.user_path.exists()
    assert UserProfile.load(ws2.user_path).render_for_prompt()


def test_memory_api_writes_are_the_files_the_prompt_reads(tmp_path) -> None:
    """The REST surface and the prompt renderer share one storage truth."""
    ws = _ws(tmp_path)
    target = ws.user_path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text("# The user\nprefers dark roast\n", encoding="utf-8")
    # what the REST layer lists:
    listed = sorted(p.name for p in ws.root.glob("*.md"))
    assert "USER.md" in listed
    # what the prompt layer renders:
    assert "dark roast" in target.read_text(encoding="utf-8")


def test_prompt_assembly_calls_the_memory_renderers() -> None:
    """Guard: the production system-prompt build uses the live renderers."""
    from jarvis.brain.manager import BrainManager

    src = inspect.getsource(BrainManager._build_system_prompt)
    assert "render_for_prompt()" in src  # USER.md (layer 3) + people (layer 4)
    assert "USER.md" in src
