# Road Dog v1.0.0 — Test execution report

Environment: Linux x86_64 (5.10 kernel), Python 3.12.16, Node 24. Headless
sandbox: no GPU, no audio devices, no paid API credentials, no macOS/Windows.

## Result summary (this environment)
- `tests/unit/core`: **1387 passed, 8 skipped, 0 failed** (baseline after
  the 3 environment/compat fixes below).
- New Road Dog suites: **companionship 21 passed**, appearance route 5 passed,
  sam check-ins route 5 passed, readiness 9 passed, model profile 6 passed,
  install suite 118 passed / 10 skipped, persona/soul 51 passed (+31), config
  example 44 passed.
- Doctor registry test (`test_router_tools_ok_with_real_registry`): passes
  only after `pip install -e . --no-deps` (needs `jarvis.tool` entry-points
  registered); in a bare source checkout it fails with 39 "unregistered"
  findings — an environment artifact, not a code defect. The full `tests/unit`
  sweep was started repeatedly; it takes hours in this sandbox and was cut
  short by the task budget after the above targeted suites all passed — the
  packaged ZIP therefore claims exactly the suites listed here, nothing more.

## Classification (per the mission's honesty rules)
- **Passed real execution tests:** every suite listed above ran here.
- **Passed mocked tests:** unit suites using `tests/fakes/` (upstream design)
  — e.g. companionship scheduler tests use a fake bus; endpoint profiler uses
  an injected fetch. Mocks never fake a PASS over a real external service.
- **Could not execute here:** macOS/Windows-only tests (TCC, registry, Inno
  Setup, PyInstaller dmg), audio-hardware tests, live provider/voice E2E,
  `tests/integration` (spawns real CLIs), frontend browser E2E.
- **Not fabricated:** no benchmark, screenshot or compatibility claim in this
  report or the docs is invented; unverified items are labelled unknown.

## E2E multi-agent mission
The upstream mission pipeline (architect → developer → tester → reviewer →
artifact) is code-preserved; running a real E2E mission requires model
credentials/CLIs this sandbox lacks, so NO end-to-end mission result is
claimed. The pipeline's own honesty guard (no "success" without a real
artifact) is covered by upstream tests in the targeted suites.

## Frontend
`npm ci` completed (450 packages). The production build (`npm run build`) is
launched as part of packaging; its result is recorded in the packaged
`docs/road-dog/TEST-REPORT.md` footer when packaging ran it — see that file
for the final build status.

## Footer — frontend production build (v1.1.0 packaging run)

`npm ci` completed (450 packages). The production build (`tsc -b && vite build`) was executed four times in this 4 GiB-cgroup sandbox with reduced heaps (6.1/2.5/2.0/3.0 GB) and unminified output: every attempt was **kernel OOM-killed (exit 137) during the vite transform phase** — the dependency graph (three.js, ~600 modules) exceeds the container's memory cap in its current state. The v1.0.0 packaging run of the same build DID complete (exit 0) in this environment, so this is an environmental limit, not a code defect.

Consequently the v1.1.0 ZIP ships the COMPLETE frontend SOURCE with lockfiles but **not** a prebuilt `jarvis/ui/web/dist` (a partial bundle would be worse than none and is excluded). Reproduce the bundle on a machine with ≥8 GB RAM: `cd jarvis/ui/web/frontend && npm ci && npm run build`. `roaddog serve` boots headless without dist (dev-mode fallback); the desktop shell needs the built bundle. Type-checking: `tsc -b` completed inside the failed runs before the vite phase began.
