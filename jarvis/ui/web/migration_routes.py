"""Migration REST surface (``/api/migration/plan`` + ``/api/migration/import``).

Upstream Personal Jarvis / Hue import — the same explicit, authorized flow as
``jarvis.migration.upstream_import``: the caller must NAME the source
directory; the default is a dry-run plan; credentials are never touched.
"""
from __future__ import annotations

import logging

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from jarvis.migration.upstream_import import import_upstream_install

log = logging.getLogger(__name__)

router = APIRouter(prefix="/api/migration", tags=["migration"])


class MigrationBody(BaseModel):
    source: str = Field(..., min_length=1, description="absolute path of the upstream install")
    execute: bool = Field(default=False, description="false = plan only (default)")
    overwrite: bool = Field(default=False)


@router.post("/plan")
def plan_migration(body: MigrationBody) -> dict[str, object]:
    try:
        plan, _ = import_upstream_install(body.source, execute=False)
    except NotADirectoryError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    return {"ok": True, "plan": plan.as_dict()}


@router.post("/import")
def run_migration(body: MigrationBody) -> dict[str, object]:
    try:
        plan, result = import_upstream_install(
            body.source, execute=True, overwrite=body.overwrite
        )
    except NotADirectoryError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    return {"ok": not result.failed, "plan": plan.as_dict(), "result": result.as_dict()}
