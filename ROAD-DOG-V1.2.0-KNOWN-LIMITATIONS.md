# ROAD-DOG-V1.2.0-KNOWN-LIMITATIONS.md

1. **No live-model acceptance run.** No inference credentials exist in this
   environment. Scenarios A-H compose production modules against
   deterministic local HTTP fixtures; the model turns in the mission harness
   are scripted and labelled. Nothing simulated is presented as live.
2. **Frontend production bundle.** `tsc -b` completes; the vite transform
   phase is kernel-OOM-killed (exit 137) under this environment's 4 GiB
   cgroup even with `maxParallelFileOps: 1`, bounded heaps (2.0-3.0 GB) and
   minify disabled — the dependency graph (three.js, ~600 modules) exceeds
   the cap in transform. Evidence: work/logs/build-lowmem{1,2,3}.log.
   Reproduce on >=8 GB: `scripts/build-frontend-lowmem.sh` (repo scripts/).
   The ZIP ships complete frontend source + lockfiles, type-checked and
   vitest-verified (9/9), WITHOUT a dist bundle; the distribution is
   labelled as requiring frontend compilation. `roaddog serve` runs headless
   without it.
3. **Push-to-talk audio loop.** Config→pipeline wiring verified; hold-to-
   record needs a microphone. The pipeline press-edge machinery is upstream
   code exercised by upstream tests; Road Dog's restoration is the key
   plumbing.
4. **Voice/phone E2E.** Live STT/TTS/telephony need credentials/hardware;
   upstream engines ship and their unit suites run here.
5. **Crew worker CLIs.** The mission orchestrator drives real coding-agent
   CLIs at runtime; none are installed in this sandbox, so scenario E
   exercises MissionManager + budget + handoff production paths with the
   worker layer scripted (labelled).
6. **Windows/macOS installers** are not built here (Linux is the verified
   path); the packaging scripts carry the v1.2.0 identity.
7. **Budget token caps vs usage-less providers** disclosed in
   budget_bridge (request caps always bind; cost caps are estimates unless
   the provider reports cost).
8. **Kilo Code / Zed Code** remain experimental/unavailable (upstream
   placeholders; spawn-gated).
