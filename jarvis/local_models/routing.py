"""Endpoint registry → production inference routing (Road Dog v1.2.0 §4).

The registry stops being a configuration database and becomes the SOURCE of
the production provider routing:

* :func:`select_endpoint` persists the selection through the canonical config
  writer — ``[brain.providers."local-openai"].base_url`` (+
  ``set_brain_provider_model`` when a model is pinned). From the NEXT brain
  construction on, :mod:`jarvis.brain.resolver` passes that ``base_url`` into
  the keyless local provider plugin (:class:`jarvis.plugins.brain.local_openai.
  LocalOpenAIBrain`), which is also the worker plugin crew missions use for
  keyless local servers (``jarvis/missions/workers/api_agent_worker.py``).
* Per-target assignments (``sam`` / ``agent:<id>``) are stored in the
  registry and surfaced at ``GET /api/local-endpoints/routing``.

Ownership rules carried over from v1.1.0 (all unchanged): selecting an
endpoint NEVER launches, restarts or reconfigures a server, NEVER downloads
a model, NEVER touches a hosted provider and NEVER falls back to paid
inference — a selection only ever re-points Road Dog's OWN provider config
at a server the user already runs.
"""
from __future__ import annotations

import logging
from dataclasses import asdict, dataclass, field
from pathlib import Path

log = logging.getLogger(__name__)

#: The provider slug the registry drives. Keyless by design: a local endpoint
#: needs no credential, and the plugin tolerates a missing key.
ROUTED_PROVIDER = "local-openai"

#: Targets an endpoint can be assigned to. ``sam`` is the primary brain;
#: ``agent:<id>`` entries are crew/agent assignments.
SAM_TARGET = "sam"


@dataclass
class EndpointAssignment:
    target: str          # "sam" | "agent:<id>"
    endpoint_id: str
    model: str | None = None

    def to_dict(self) -> dict:
        return asdict(self)


def _registry(registry_path: Path | None):
    """The registry to act on: an explicit path, else the live module one."""
    if registry_path is not None:
        from jarvis.local_models.endpoints import EndpointRegistry

        return EndpointRegistry(registry_path)
    from jarvis.ui.web.local_endpoint_routes import get_registry

    return get_registry()


def _assignments_path(registry_path: Path) -> Path:
    return registry_path.parent / "endpoint_assignments.json"


def load_assignments(registry_path: Path) -> dict[str, EndpointAssignment]:
    import json

    path = _assignments_path(registry_path)
    if not path.exists():
        return {}
    try:
        raw = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return {}
    out: dict[str, EndpointAssignment] = {}
    for target, item in dict(raw).items():
        try:
            out[target] = EndpointAssignment(
                target=str(item.get("target", target)),
                endpoint_id=str(item.get("endpoint_id", "")),
                model=item.get("model"),
            )
        except (AttributeError, TypeError):
            continue
    return out


def save_assignments(registry_path: Path, assignments: dict[str, EndpointAssignment]) -> None:
    import json
    import os
    import tempfile

    path = _assignments_path(registry_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp = tempfile.mkstemp(prefix=f".{path.name}.", suffix=".tmp", dir=str(path.parent))
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as handle:
            json.dump({k: v.to_dict() for k, v in assignments.items()}, handle, indent=2)
        os.replace(tmp, path)
    except Exception:
        try:
            os.unlink(tmp)
        except OSError:
            pass
        raise


def select_endpoint(
    endpoint_id: str,
    *,
    target: str = SAM_TARGET,
    model: str | None = None,
    registry_path: Path | None = None,
    config_path: Path | None = None,
) -> EndpointAssignment:
    """Point a target's production inference at a registry endpoint.

    Persists the routing through the config writer (the same setters the
    Settings → API Keys card uses), so the brain resolver and crew worker
    construction both pick the endpoint up on their next build.
    """
    from jarvis.core import config_writer
    from jarvis.core.config import resolve_config_path
    from jarvis.local_models.endpoints import EndpointRegistry, UnknownEndpoint

    reg = _registry(registry_path)
    endpoint = reg.get(endpoint_id)  # raises UnknownEndpoint for bad ids
    if config_path is None:
        config_path = resolve_config_path()

    assignments = load_assignments(reg.path)
    assignment = EndpointAssignment(
        target=target, endpoint_id=endpoint.id, model=model
    )
    assignments[target] = assignment
    save_assignments(reg.path, assignments)

    if target == SAM_TARGET:
        # the PRIMARY brain routes through the local-openai provider card
        config_writer.set_provider_base_url(
            ROUTED_PROVIDER, endpoint.base_url, path=config_path
        )
        if model:
            config_writer.set_brain_provider_model(
                ROUTED_PROVIDER, deep_model=model, path=config_path
            )
        log.info(
            "sam brain routed to endpoint %s (%s) model=%s",
            endpoint.id, endpoint.base_url, model or "endpoint default",
        )
    else:
        log.info("agent target %s assigned to endpoint %s", target, endpoint.id)
    return assignment


def clear_target(target: str, *, registry_path: Path | None = None,
                 config_path: Path | None = None) -> None:
    """Remove an assignment; the sam target's provider override is cleared too."""
    from jarvis.core import config_writer
    from jarvis.core.config import resolve_config_path
    from jarvis.local_models.endpoints import EndpointRegistry

    reg = _registry(registry_path)
    assignments = load_assignments(reg.path)
    assignments.pop(target, None)
    save_assignments(reg.path, assignments)
    if target == SAM_TARGET and config_path is None:
        config_path = resolve_config_path()
    if target == SAM_TARGET:
        config_writer.set_provider_base_url(ROUTED_PROVIDER, "", path=config_path)


def routing_status(registry_path: Path | None = None) -> dict:
    """What production inference is currently pointed at, and by what."""
    from jarvis.local_models.endpoints import EndpointRegistry

    reg = _registry(registry_path)
    assignments = load_assignments(reg.path)
    return {
        "routed_provider": ROUTED_PROVIDER,
        "assignments": {k: v.to_dict() for k, v in assignments.items()},
        "known_endpoints": [e.to_dict() for e in reg.list()],
    }
