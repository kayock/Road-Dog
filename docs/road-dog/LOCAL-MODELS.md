# Road Dog — Local AI & remote inference guide

Local AI is a first-class citizen: a fresh install runs entirely on local
endpoints with zero paid credentials.

## Supported servers
- **Ollama** (auto-discovered when running; `http://localhost:11434` default)
- **LM Studio** and **llama.cpp** (`llama-server`) via their OpenAI-compatible
  endpoints (e.g. `http://localhost:1234/v1`)
- **Any OpenAI-compatible endpoint** (vLLM, LiteLLM, TabbyAPI, remote boxes)
- All hosted providers and subscription routes from upstream continue to work.

## Configure an endpoint
Settings → API Keys & Providers: local providers are keyless — set the base
URL (`PUT /api/providers/{id}/base-url`), pick a model, and assign different
models to different brains (deep / fast / realtime) or to individual crew
agents. Multiple endpoints are supported simultaneously.

## Capability profiling
`jarvis/diagnostics/model_profile.py` (exposed through the diagnostics API)
probes ONLY read-only metadata (`GET /api/tags`, `/api/show`, `/v1/models`):
model list, context window where declared, and tool-calling/vision **only
where the endpoint declares them** — an undeclared capability shows as
`unknown`, never invented. The probe never starts/stops a server, never
pulls a model, never sends a completion, so it cannot spend tokens or
disturb an externally managed server.

## Small & quantized models
The compact persona block (`## System-Prompt (Compact)` in
`jarvis/brain/JARVIS_PERSONA.md`) is loaded for small local realtime brains;
structured-output repair and deterministic tool wrappers keep small models
usable. Ollama context is pinned with explicit `num_ctx` (the supervisor
sizes it from the machine — it is never silently reduced).

## Health checks & metrics
Per-provider health dots come from on-demand probes you trigger; the local
models health monitor records endpoint state; the Spend dashboard shows
tokens in/out, per-agent/per-mission usage and estimated costs, and clearly
distinguishes measured values from estimates. Local-first operation never
silently falls back to a paid cloud call.

## v1.1.0: the endpoint registry (add / test / select in the UI)

`/api/local-endpoints` is Road Dog's own registry (`~/.road-dog/data/
endpoints.json`): add an endpoint (id, name, base_url, optional context
window + timeout), PATCH any field, DELETE, POST `/{id}/test` for a
zero-spend capability probe (model list, context window, declared
tool/vision support), and `GET /pick?requires_tools=...` for capability-aware
selection that returns nothing rather than guessing or falling back to a
paid provider. The onboarding wizard uses the same probe
(`/api/onboarding/test-local-endpoint`). Small quantized models get compact
role instructions, schema-validated outputs with bounded repair, and a
strict single-line tool protocol — with honest unknowns, never invented
capabilities.
