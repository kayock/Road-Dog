"""Inference endpoint REST surface (``/api/local-endpoints``).

Road Dog's own endpoint registry: add, edit, remove, test and select
inference servers directly from the UI. Every write is Road-Dog-scoped
(``endpoints.json`` in the Road Dog data root); ``POST .../test`` is a
read-only metadata probe that never launches a server, downloads a model or
spends tokens.
"""
from __future__ import annotations

import logging

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field

from jarvis.local_models.endpoints import (
    EndpointAlreadyExists,
    EndpointRegistry,
    UnknownEndpoint,
)

log = logging.getLogger(__name__)

router = APIRouter(prefix="/api/local-endpoints", tags=["local-endpoints"])

_registry: EndpointRegistry | None = None


def get_registry() -> EndpointRegistry:
    global _registry
    if _registry is None:
        _registry = EndpointRegistry()
    return _registry


def set_registry(registry: EndpointRegistry | None) -> None:
    """Swap the module registry (tests)."""
    global _registry
    _registry = registry


class EndpointBody(BaseModel):
    id: str = Field(..., min_length=1, max_length=64, description="stable handle")
    name: str = Field(..., min_length=1, max_length=120)
    base_url: str = Field(..., min_length=1, description="e.g. http://localhost:11434")
    flavor: str = Field(default="auto")
    context_window: int | None = Field(default=None, ge=256)
    timeout_s: float = Field(default=60.0, gt=0, le=600)
    enabled: bool = True


class EndpointPatch(BaseModel):
    name: str | None = None
    base_url: str | None = None
    flavor: str | None = None
    context_window: int | None = None
    timeout_s: float | None = Field(default=None, gt=0, le=600)
    enabled: bool | None = None


def _http_error(exc: Exception) -> HTTPException:
    if isinstance(exc, EndpointAlreadyExists):
        return HTTPException(status_code=409, detail=str(exc))
    if isinstance(exc, UnknownEndpoint):
        return HTTPException(status_code=404, detail=f"unknown endpoint: {exc}")
    if isinstance(exc, ValueError):
        return HTTPException(status_code=400, detail=str(exc))
    return HTTPException(status_code=500, detail=type(exc).__name__)


@router.get("")
def list_endpoints() -> dict[str, object]:
    return {"endpoints": [e.to_dict() for e in get_registry().list()]}


@router.post("")
def add_endpoint(body: EndpointBody) -> dict[str, object]:
    try:
        endpoint = get_registry().add(
            endpoint_id=body.id, name=body.name, base_url=body.base_url,
            flavor=body.flavor, context_window=body.context_window,
            timeout_s=body.timeout_s, enabled=body.enabled,
        )
    except Exception as exc:  # noqa: BLE001 — mapped below
        raise _http_error(exc) from exc
    return {"ok": True, "endpoint": endpoint.to_dict()}


@router.delete("/__all__")
def remove_all_endpoints(request: Request) -> dict[str, object]:
    """DANGER: clears the registry. Guarded by the confirm query parameter."""
    if request.query_params.get("confirm") != "yes":
        raise HTTPException(status_code=400, detail="pass ?confirm=yes to clear")
    for endpoint in get_registry().list():
        get_registry().remove(endpoint.id)
    return {"ok": True}

@router.get("/pick")
def pick_endpoint(
    requires_tools: bool | None = None,
    min_context_window: int | None = None,
) -> dict[str, object]:
    """Capability-aware selection over the registry (never a paid fallback)."""
    endpoint = get_registry().pick(
        requires_tools=requires_tools, min_context_window=min_context_window
    )
    return {"endpoint": endpoint.to_dict() if endpoint else None}



@router.patch("/{endpoint_id}")
def update_endpoint(endpoint_id: str, body: EndpointPatch) -> dict[str, object]:
    try:
        endpoint = get_registry().update(endpoint_id, **body.model_dump(exclude_none=True))
    except Exception as exc:  # noqa: BLE001 — mapped below
        raise _http_error(exc) from exc
    return {"ok": True, "endpoint": endpoint.to_dict()}


class SelectBody(BaseModel):
    target: str = Field(default="sam", description="'sam' or 'agent:<id>'")
    model: str | None = Field(default=None, description="pin a model on the endpoint")


@router.post("/{endpoint_id}/select")
def select_route(endpoint_id: str, body: SelectBody) -> dict[str, object]:
    """Route a target's production inference at this endpoint (v1.2.0 §4).

    Persists ``[brain.providers."local-openai"].base_url`` through the config
    writer for the ``sam`` target — the brain resolver and crew worker
    construction read it on their next build. Never launches/reconfigures a
    server, never downloads, never touches a hosted provider.
    """
    from jarvis.local_models import routing

    try:
        assignment = routing.select_endpoint(
            endpoint_id, target=body.target, model=body.model
        )
    except UnknownEndpoint as exc:
        raise HTTPException(status_code=404, detail=f"unknown endpoint: {exc}") from exc
    except Exception as exc:  # noqa: BLE001 — mapped below
        raise _http_error(exc) from exc
    return {"ok": True, "assignment": assignment.to_dict(),
            "routed_provider": routing.ROUTED_PROVIDER}


@router.get("/routing")
def routing_state() -> dict[str, object]:
    """Current production routing (assignments + known endpoints)."""
    from jarvis.local_models import routing

    return routing.routing_status()


@router.delete("/routing/{target}")
def clear_routing(target: str) -> dict[str, object]:
    from jarvis.local_models import routing

    routing.clear_target(target)
    return {"ok": True, "cleared": target}


@router.delete("/{endpoint_id}")
def remove_endpoint(endpoint_id: str) -> dict[str, object]:
    try:
        get_registry().remove(endpoint_id)
    except Exception as exc:  # noqa: BLE001 — mapped below
        raise _http_error(exc) from exc
    return {"ok": True}


@router.post("/{endpoint_id}/test")
async def test_endpoint(endpoint_id: str) -> dict[str, object]:
    """Read-only capability probe — GET metadata only, zero spend."""
    try:
        profile = get_registry().test(endpoint_id)
    except Exception as exc:  # noqa: BLE001 — mapped below
        raise _http_error(exc) from exc
    return {"ok": True, "profile": profile.to_dict()}


