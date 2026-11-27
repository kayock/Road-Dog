# Upstream attribution (legally required notices)

Road Dog is a fork of **Personal Jarvis (Hue)** by Ruben Lütke and
contributors, https://github.com/tbwcheatwood-hue/Hue, licensed under the
Apache License 2.0 (upstream releases up to and including 1.6.0 were MIT).

- Upstream source revision for this fork: commit `49ee3258` on `main`
  (upstream version 3.1.1).
- The original `LICENSE`, `NOTICE`, `TRADEMARK.md` and `CHANGELOG.md` are
  retained in this repository unmodified.
- `jarvis/core/branding.py` carries the fork provenance constants
  (`UPSTREAM_REPO_SLUG` / `UPSTREAM_REPO_URL`).
- All Road Dog-specific additions (logo and icon artwork, Sam persona and
  companionship module, readiness diagnostics, endpoint profiler, theme
  changes, installer rebrand) are distributed under the same Apache 2.0
  license.
- The upstream installer trust artifacts (`install/tuf/`,
  `install/in-toto/`) are upstream's signed release-channel metadata; they
  are kept verbatim and are NOT Road Dog's trust roots.
- Third-party dependency notices are bundled with their distributions;
  the frontend ships `jarvis/ui/web/frontend/public/THIRD_PARTY_NOTICES.txt`.
