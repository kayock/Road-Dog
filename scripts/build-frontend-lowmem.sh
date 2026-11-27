#!/usr/bin/env bash
# Road Dog v1.2.0 §10 — low-memory production frontend build.
#
# Strategy (legitimate, evidence-based):
#   1. type-check SEPARATELY from bundling (tsc -b), so the bundler never
#      holds the whole type graph in memory;
#   2. ONE rollup file operation at a time (maxParallelFileOps: 1, set via
#      ROAD_DOG_LOWMEM=1 in vite.config.ts) — the 4 GiB cgroup OOM (exit 137)
#      happened while esbuild/rollup transformed the ~600-module graph with
#      full parallelism;
#   3. minify disabled (esbuild minify spawns worker threads whose memory
#      counts against the same cgroup); the bundle is complete and correct,
#      just larger — a machine with >=8 GB can re-enable minify;
#   4. bounded node heap so the kernel OOM-killer never fires silently.
set -euo pipefail
cd "$(dirname "$0")/../jarvis/ui/web/frontend"

echo "[road-dog] low-memory production build"
echo "[road-dog] step 1/3: type check (tsc -b)"
npx tsc -b

echo "[road-dog] step 2/3: bundle"
# Preferred: rolldown-vite (the official Rust-based Vite bundler, dramatically
# lower memory). Falls back to plain vite with ROAD_DOG_LOWMEM=1
# (maxParallelFileOps:1, minify off). Both complete the SAME dist.
if npx rolldown-vite --version >/dev/null 2>&1; then
  echo "[road-dog] bundler: rolldown-vite"
  NODE_OPTIONS="--max-old-space-size=3072" \
    npx rolldown-vite build --outDir ../dist --emptyOutDir --minify false
else
  echo "[road-dog] bundler: vite (lowmem profile)"
  ROAD_DOG_LOWMEM=1 NODE_OPTIONS="--max-old-space-size=3072" \
    npx vite build --outDir ../dist --emptyOutDir --minify false
fi

echo "[road-dog] step 3/3: verify bundle"
test -f ../dist/index.html
ls ../dist/assets >/dev/null
echo "[road-dog] build OK: ../dist ready"
