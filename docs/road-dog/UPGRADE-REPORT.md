# Road Dog v1.0.0 — Upgrade report

**Source:** Personal Jarvis (Hue), commit `49ee3258` (v3.1.1), cloned from
https://github.com/tbwcheatwood-hue/Hue. **Result:** Road Dog v1.0.0.

## Preserved (verified by the existing suites)
- Layered architecture (protocols.py boundaries, frozen EventBus events with
  trace ids), risk-tier safety, config-writer contract, credential layer.
- Voice stack (wake chain, realtime sessions, dictation, telephony), computer
  use, marketplace, MCP, skills, wiki memory, missions, Agentic IDE with all
  registered coding agents (Kilo Code / Zed Code remain honestly labelled
  placeholder-pending-live-install, degrading safely without their keys).
- All upstream user data contracts: jarvis.toml, keyring service, user-data
  folders, wiki store — a Personal Jarvis install migrates in place.

## Added
See `ROAD_DOG_CHANGELOG.md` for the full list: Road Dog identity + artwork,
Sam persona/seed, companionship module, readiness diagnostics, endpoint
capability profiler, high-contrast mode, purple signal hue, rebranded
installers, `roaddog` CLI alias, update-channel guard.

## Bugs fixed
1. `tests/unit/core/test_path_augment.py` — Windows node-lookup test failed
   on Linux CPython 3.12.16 because `shutil.which` now re-reads
   `sys.platform` dynamically; the test now isolates its PATH stub. Real bug
   class: platform-mocked tests leaking into stdlib.
2. `tests/unit/{plugins/tool,conductor}/__init__.py` missing — two
   `test_http_pool.py` basenames collided under pytest's default import mode
   and blocked ANY full-suite run. Added package markers (additive).
3. Environment gaps documented: `google-auth` (Vertex tests), `asyncssh`,
   `anthropic`, `twilio`, `mss`, `openai` needed in this sandbox.

## Architectural notes
- New modules follow the existing rules: no boot-critical-path init (AP-26),
  config only through `config_writer` (AP-7), `ConfigDict(extra="allow")` for
  the new `[sam]` section (AP-16), events as frozen dataclasses on the bus.
- Internal namespace (`jarvis`, `personal-jarvis` distribution) intentionally
  retained for compatibility.

## Security improvements
- Update channel default no longer points at upstream releases (an update
  check cannot replace a Road Dog install with an upstream build).
- Readiness/model-profile probes are GET-metadata-only; no completions, no
  pulls, no server lifecycle calls, no paid calls.
- No embedded credentials anywhere in the added code or assets; installers
  project the same identity constants as before with credential continuity.

# v1.1.0 upgrade report (functional refinement)

Built on the v1.0.0 branch of the v1.0.0 fork. Every §-numbered mission
requirement and its disposition:

| Requirement | Disposition | Evidence |
|---|---|---|
| §1 Independent identity | Newly implemented (data-root layer) + existing installer-level independence verified | `jarvis/core/identity.py`, `tests/unit/road_dog/test_migration.py` |
| §1 Upstream migration | Newly implemented | `jarvis/migration/upstream_import.py`, `/api/migration/*`, MIGRATION.md |
| §2 Local endpoints | Newly implemented registry + REST; upstream provider health verified | `jarvis/local_models/endpoints.py`, `test_endpoints.py` (11 tests) |
| §3 Small-model kit | Newly implemented | `jarvis/brain/small_model.py`, `test_small_model.py` (13 tests) |
| §4 Crew handoffs | Newly implemented; upstream mission pipeline verified as-is | `jarvis/missions/handoff.py`, `test_handoffs.py` (8 tests) |
| §5 Acceptance mission | Newly implemented (deterministic harness; real files/tests/CLI) | `jarvis/acceptance/mission.py`, 8 acceptance tests |
| §6 Sam memory surface | Newly implemented; persona/check-ins from v1.0.0 verified | `sam_memory_routes.py`, `test_sam_memory.py` |
| §7 Push-to-talk | Substantially improved (config→hotkey arming restored); live audio unverified (no hardware) | `[trigger] push_to_talk_key`, `test_ptt.py` |
| §8 Onboarding | Endpoint-test step added; upstream wizard verified | `/api/onboarding/test-local-endpoint` |
| §9 Budgets | Newly implemented enforcement | `jarvis/costs/budgets.py`, `test_budgets.py` (6 tests incl. race) |
| §10 Kilo/Zed | Classified: experimental/unavailable (upstream placeholders, spawn-gated) | `jarvis/workspace/agents.py` gating + docs |
| §11 Packaging | v1.1.0 ZIP with built frontend dist | packaging script + verification output |
| §12 Security review | Updated — see SECURITY-REVIEW v1.1.0 section | docs/road-dog/SECURITY-REVIEW.md |
| §13 Regression testing | 56 road_dog + 8 acceptance + replay suites green; broad unit sweep budget-limited | docs/road-dog/TEST-REPORT.md |

Defects found by the new tests and FIXED during development: request-cap
counting at the dispatch boundary (settle-time counting let extra dispatches
through), cost escrow not visible to the cap check, reasoning-tag capture
(returned tags with the content), route shadowing (`/__all__` under
`/{endpoint_id}`), dual-scope budget dispatch in the mission harness.
