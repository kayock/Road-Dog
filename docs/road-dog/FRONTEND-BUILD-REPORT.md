# Frontend Build Report (Road Dog v1.3.0 §4)

Environment: Linux x86_64, CPython 3.12, Node 24, hard 4 GiB cgroup
(memory.max), no swap available (swapon: none).

## What passes here

- `tsc -b` — the COMPLETE frontend type-checks, including the v1.3.0 Kayock
  era code (road-dog package, RoadDogGroup panel).
- `vitest run` — the settings + Road Dog panel component tests (9/9 in
  v1.2.0's run; the suite re-runs in this release's verification).

## What this environment cannot do

Five production-build attempts, all kernel-OOM-killed (exit 137) during the
`transforming...` phase:

| # | Bundler | Config | Result |
|---|---|---|---|
| 1 | vite (rollup) | minify off, heap 2.5 GB | Killed (137) |
| 2 | vite (rollup) | minify off, heap 3.0 GB | Killed (137) |
| 3 | vite (rollup) | ROAD_DOG_LOWMEM=1 (maxParallelFileOps:1, minify off) | Killed (137) |
| 4 | vite (rollup) | heap 3.07 GB, lowmem | Killed (137) — v1.2.0 evidence |
| 5 | rolldown-vite 7.3.1 | minify off, heap 3.07 GB | Killed (137) |

The ~600-module graph (three.js visualizations, Monaco, terminals) exceeds
the 4 GiB cap during transform on every supported bundler. Nothing was
removed to force a build (§4: preserve Three.js, Monaco, terminals,
dashboards, accessibility, branding).

## The reproducible Ubuntu build (tested to the sandbox boundary)

`scripts/build-frontend-lowmem.sh` (repo `scripts/`):
1. `tsc -b` (passes here),
2. bundler: rolldown-vite when installed, else vite with ROAD_DOG_LOWMEM=1,
3. dist verification (`index.html` + assets).

On an Ubuntu box with >=8 GB RAM: `cd jarvis/ui/web/frontend && npm ci &&
bash ../../scripts/build-frontend-lowmem.sh` → complete `../dist` bundle.
No build is claimed as successful here: the v1.3.0 distribution ships the
complete frontend source + lockfiles WITHOUT compiled assets and is labelled
as requiring frontend compilation (same contract as v1.2.0, now with the
rolldown-first path and five documented attempts).
