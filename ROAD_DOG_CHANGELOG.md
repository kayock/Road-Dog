# Road Dog Changelog

## v1.3.0 — Local Integration and Release Completion

- **Kayock Voice provider** (§2): TTS + STT plugins in the production speech
  factories (`provider = "kayock"`), speaking to the user's existing LAN
  services — Kokoro/Piper/RVC voices, male default (`am_adam`), warm-up,
  sentence-chunked synthesis, honest diagnostics at `/api/voice/kayock/status`,
  zero paid fallback. 10 contract-fixture tests through the production
  factories.
- **Dependency/install cleanup** (§3): distribution renamed `road-dog`
  (no upstream package references); browser-sidecar index re-pointed;
  `[local-first]` extra documents the offline-capable profile; macOS/telephony/
  streams remain isolated extras; the updater targets `road-dog/road-dog`.
  Report: docs/road-dog/DEPENDENCY-CLEANUP.md.
- **Frontend** (§4): rolldown-vite-first low-memory build script; complete
  frontend still type-checks here; the vite/rolldown transform phase remains
  OOM-killed under the 4 GiB cgroup (5 documented attempts, two bundlers).
  Report: docs/road-dog/FRONTEND-BUILD-REPORT.md. Distribution labelled
  source-only (same contract as v1.2.0).
- **Runtime verification fixes** (§7): the check-in scheduler mount crashed in
  the headless path (`WebServer.config` → `cfg`) — proactive companionship
  now really mounts on `serve`; the Kayock diagnostics route hardened against
  config errors; the bundled .ico restored to its 7-layer taskbar ladder
  (Pillow base-frame rule); socials identity test re-pointed to Road Dog.
- **Regression**: broad batched sweep executed (16,416 passed / 113 failed
  upstream-wide, triaged: pre-existing drift + environment-bound; every Road
  Dog area green) + the v1.3.0 release gate 215/215 (road_dog, acceptance,
  scenarios, companionship, diagnostics in one process).

## v1.2.0 — Runtime Integration, Repair and Release Qualification

The audit findings were investigated and — where correct — FIXED at the
production level. Every new module is now on a real execution path; see
ROAD-DOG-V1.2.0-RUNTIME-INTEGRATION-MATRIX.md for the caller-per-feature map.

- **Budgets at the dispatch door** (§2): `jarvis/costs/budget_bridge.py` is
  invoked by `MeteredBrain.complete` — the wrapper every provider passes
  through — so Sam turns, agent chat, computer use, wiki/memory processing,
  mission workers/critics, retries and parallel workers are all gated BEFORE
  dispatch, with escrow settlement on success, cancellation and failure.
  Budgets are OFF by default (`[costs] budgets_enabled`); Settings → Budgets
  edits caps live. 10 production-path tests drive the real door.
- **Small-model mode in the runtime** (§3): `SmallModelCompatibilityBrain`
  wraps local providers (ollama / openai-compatible / lm-studio / llama.cpp)
  at `BrainProviderRegistry` construction when `[brain] small_model_mode` is
  on — compact tool protocol, reasoning never parsed, validated calls,
  bounded corrective re-asks (each re-ask metered + budgeted). Hosted
  providers are never wrapped. 9 runtime tests.
- **Endpoint registry → production routing** (§4): selecting an endpoint
  persists `[brain.providers."local-openai"].base_url` (+ model) through the
  canonical config writer; the endpoint resolver, brain construction and crew
  worker path all read it. Real-HTTP fixture tests prove request
  construction, streaming, model selection and two-endpoint routing.
- **Handoffs in the production orchestrator** (§5): `Kontrollierer` records
  validated AgentHandoffs at task dispatch and draft→critic; cycle/depth
  rejection applies to live missions; `GET /api/missions/{id}/handoffs`.
- **Sam's memory verified in conversation assembly** (§6): the prompt
  renders USER.md/people live (create→retrieve, correct→changed, delete→gone,
  restart→persisted) — the REST surface and the prompt share one storage.
- **PTT production wiring verified** (§7): config→hotkeys→SpeechPipeline
  press edges (audio loop remains hardware-verified-only).
- **Credential isolation** (§8): Road Dog owns the `road-dog` keyring
  service; upstream keys move only via explicit `include_credentials=True`.
- **Frontend** (§9): the Road Dog settings panel (endpoints, budgets,
  memory, PTT, small-model, readiness, migration) — vitest-tested against
  the real API contract.
- **Frontend build** (§10): low-memory build script + config; type check
  completes; the vite transform phase is still kernel-OOM-killed under this
  4 GiB cgroup (evidence + reproducible script shipped; distribution labelled).
- **Production defect fixed** (§11): the readiness REST route was BROKEN
  (missing `Request` import → FastAPI 422) — found by scenario H and fixed.

## v1.0.0 — the Road Dog release

Forked from Personal Jarvis (Hue) at upstream commit `49ee3258` ("feat: add
Kilo Code and Zed Code integrations with desktop shortcut"), upstream release
v3.1.1. Upstream history: see `CHANGELOG.md` (kept verbatim as the upstream
record).

### Identity
- Product rebrand: Personal Jarvis / Hue → **Road Dog**. Companion identity:
  **Sam (Sam(wise))**. Taglines: "Every road is better with a Road Dog." /
  "Your AI. Your crew. Your road."
- Original logo, application mark, ICO/ICNS/PNG icon sets and README diagrams
  drawn for Road Dog (graphite black, charcoal, electric purple, clean type).
- `jarvis/core/branding.py` identity constants updated and re-frozen in tests.
  Windows/macOS/Linux product names, mutex, bundle ids, desktop entries and
  the branded launcher derive from the new identity.
- Compatibility kept on purpose: `jarvis.toml`, the `jarvis` CLI, the pip
  distribution name, the keyring service name (`personal-jarvis`), session
  cookie, control-key prefix and user-data folder names are unchanged so an
  upstream install migrates without losing credentials or data.
- New `roaddog` console entry point identical to `jarvis`.
- Update channel default no longer points at the upstream release repo
  (an update check cannot silently replace Road Dog with an upstream build);
  set `JARVIS_OFFICIAL_REPO_SLUG` to your fork's release repo to re-enable.

### Sam(wise) — personality & companionship
- New voice persona in `jarvis/brain/JARVIS_PERSONA.md` (full + compact
  blocks) written in Sam's voice; all pipeline contracts preserved.
- SOUL.md / BOOTSTRAP.md seeds rewritten for Sam; shipped assistant-name
  fallback is now "Sam" (wake phrase still overrides).
- New `jarvis/companionship/` module: optional proactive check-ins, interval
  + quiet-hours (midnight-wrap aware), skipped-never-queued semantics,
  `SamCheckinDue` events, REST surface `/api/sam/checkins`, config `[sam]`
  section, scheduler mounted off the boot critical path. 26 new tests.
- `DEFAULT_CHECKIN_LINES` carry Sam's register from the mission dialogue.

### Diagnostics & local AI
- New readiness report `jarvis/diagnostics/readiness.py` +
  `GET /api/diagnostics/readiness`: local-only, zero-spend snapshot across
  models, local-models, voice, agents, computer-use, storage, integrations
  with honest `unknown` rows for anything not probed.
- New endpoint capability profiler `jarvis/diagnostics/model_profile.py`:
  read-only GET metadata for Ollama/OpenAI-compatible endpoints — model list,
  context window, declared tool/vision capabilities ("unknown" stays unknown).
- Readiness integrated into the diagnostics router; 15 new tests.

### Appearance & accessibility
- Signal hue (accent/ring/info/chat-bubble-out/viz-trigger/terminal themes)
  moved from blue to electric purple in both themes; tokens re-documented.
- New high-contrast accessibility ladder: `[ui] high_contrast` config +
  `set_ui_high_contrast` writer + appearance REST carrying `high_contrast` +
  frontend ThemeProvider `contrast` state + boot-script pre-paint class +
  `.high-contrast` token block (light and dark). 5 new route tests.

### Installers & packaging
- All installer surfaces rebranded (bash/PowerShell, Inno Setup, PyInstaller
  spec, uninstallers): names, paths (`~/.road-dog`), electric-purple palette,
  "ROAD DOG" ASCII banner, Inno `RoadDog.iss`.
- macOS DMG identity literals aligned with branding (`ai.roaddog.desktop`,
  `Road Dog.app`, executable `RoadDog`).

### Tests & fixes
- Full unit suite runs again on CPython 3.12.16:
  - `test_path_augment.py`: Windows node-lookup test no longer trips over
    CPython 3.12.16's dynamic `sys.platform` check inside `shutil.which`
    (the test stubs PATH hygiene explicitly; assertions unchanged).
  - Two `tests/unit/*/test_http_pool.py` collision fixed by adding the two
    missing `__init__.py` package markers (collection under default import
    mode), no test changes.
  - `test_google_vertex_project_path.py` needed `google-auth` in the env.
  - `assistant-name` fallback contract updated for the shipped "Sam" default
    (wake-phrase override still pinned by tests).
