"""Sam memory REST surface (``/api/sam/memories``) — inspect, edit, delete, export.

Sam's personal memory about the user lives in the workspace markdown files
(``USER.md``, ``people/*.md``, ``BOOTSTRAP.md``) and the wiki store. This
surface gives the user direct control over the WORKSPACE layer:

* ``GET /api/sam/memories``          — list every memory file (with search),
* ``GET /api/sam/memories/export``   — download everything as JSON,
* ``PUT /api/sam/memories/{name}``   — edit one file (atomic write),
* ``DELETE /api/sam/memories/{name}``— delete one file (the user's call).

The wiki DATABASE is untouched here (its own review UI covers it). Paths are
validated against traversal: a ``name`` is a file NAME inside the workspace
directory, never a path. Untrusted content stored in memories is data — it
can never reach tool execution or permission boundaries through this route.
"""
from __future__ import annotations

import logging
import re

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field

log = logging.getLogger(__name__)

router = APIRouter(prefix="/api/sam/memories", tags=["sam-memory"])

_NAME_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._-]{0,80}$")


def _workspace_dir(request: Request):
    from jarvis.core.identity import road_dog_data_root

    cfg = getattr(request.app.state, "config", None)
    data_dir = getattr(getattr(cfg, "memory", None), "data_dir", None)
    from pathlib import Path as _Path

    base = _Path(data_dir) if data_dir else road_dog_data_root()
    path = base / "workspace" if not str(base).endswith("workspace") else base
    path.mkdir(parents=True, exist_ok=True)
    return path


def _resolve(request: Request, name: str):
    if not _NAME_RE.match(name or ""):
        raise HTTPException(status_code=400, detail="memory name must be a plain file name")
    path = (_workspace_dir(request) / name).resolve()
    if path.parent != _workspace_dir(request).resolve():
        raise HTTPException(status_code=400, detail="path traversal rejected")
    return path


class MemoryBody(BaseModel):
    content: str = Field(..., max_length=200_000)


@router.get("")
def list_memories(request: Request, q: str | None = None) -> dict[str, object]:
    root = _workspace_dir(request)
    memories = []
    for path in sorted(root.glob("*.md")):
        try:
            content = path.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        if q and q.lower() not in content.lower():
            continue
        memories.append({
            "name": path.name,
            "bytes": path.stat().st_size,
            "preview": content[:400],
        })
    return {"memories": memories, "root": str(root)}


@router.get("/export")
def export_memories(request: Request) -> dict[str, object]:
    root = _workspace_dir(request)
    export = {
        path.name: path.read_text(encoding="utf-8", errors="replace")
        for path in sorted(root.glob("*.md"))
    }
    return {"format": "json", "workspace": str(root), "memories": export}


@router.get("/{name}")
def read_memory(request: Request, name: str) -> dict[str, object]:
    path = _resolve(request, name)
    if not path.exists():
        raise HTTPException(status_code=404, detail=f"no such memory: {name}")
    return {"name": name, "content": path.read_text(encoding="utf-8", errors="replace")}


@router.put("/{name}")
def write_memory(request: Request, name: str, body: MemoryBody) -> dict[str, object]:
    path = _resolve(request, name)
    # atomic write, matching the workspace's own conventions
    import os
    import tempfile

    fd, tmp = tempfile.mkstemp(prefix=f".{name}.", suffix=".tmp", dir=str(path.parent))
    try:
        with os.fdopen(fd, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(body.content)
        os.replace(tmp, path)
    except Exception:
        try:
            os.unlink(tmp)
        except OSError:
            pass
        raise
    return {"ok": True, "name": name, "bytes": path.stat().st_size}


@router.delete("/{name}")
def delete_memory(request: Request, name: str) -> dict[str, object]:
    path = _resolve(request, name)
    if not path.exists():
        raise HTTPException(status_code=404, detail=f"no such memory: {name}")
    path.unlink()
    return {"ok": True, "deleted": name}
