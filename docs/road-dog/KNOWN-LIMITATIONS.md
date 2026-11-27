# Road Dog v1.0.0 — Known limitations

1. **Platform builds not exercised here.** Windows/macOS installers
   (Inno Setup, PyInstaller dmg), tray/overlay binaries and TCC/registry
   code paths compile from rebranded sources but were not built or run on
   their target OSes in this Linux sandbox. The identity parity tests
   (spec ↔ branding) pass, which is the strongest guarantee available here.
2. **Internal namespace.** The Python package stays `jarvis`, the
   distribution `personal-jarvis`, the config `jarvis.toml` — deliberate
   compatibility choices, documented in the upgrade report.
3. **Update channel.** Road Dog ships no release repository; update checks
   fail honestly until you set `JARVIS_OFFICIAL_REPO_SLUG` to a fork repo.
4. **Kilo Code / Zed Code** remain upstream's registered-but-unverified
   integrations (placeholder binaries); they degrade safely without keys.
5. **E2E missions, live voice, phone calls** need credentials/hardware this
   environment lacks — untested here, not asserted anywhere.
6. **Upstream demo assets removed** (`assets/demo`, `videos/`,
   `wiki-video/`, `art/studies` excluded from the ZIP: old-brand pixels /
   146 MB design studies with no runtime references). The Remotion `video/`
   source project is retained.
7. **CHANGELOG.md** is upstream's verbatim history; Road Dog's changes live
   in `ROAD_DOG_CHANGELOG.md`.
8. **Voice German content** — upstream's closed-surface German strings are
   rebranded where they name the product/assistant; full de/es/zh copy
   translations of NEW strings fall back to English keys where absent.
9. **Budget note:** the full unit suite takes hours in this sandbox; the
   test report lists exactly which suites were executed to completion.

# v1.1.0 limitations (addendum)

1. **Live-model acceptance run not performed** — no inference credentials in
   this environment. The acceptance mission uses a deterministic simulated
   model, clearly labelled; the harness itself is production machinery and a
   live run plugs a real brain in behind the same dispatch boundary.
2. **Push-to-talk audio loop** — the key plumbing is restored and tested at
   config level; hold-to-record behavior needs real audio hardware to verify
   (upstream removed the desktop PTT feature; the pipeline compatibility
   slot is what Road Dog re-arms).
3. **Kilo Code / Zed Code** remain experimental/unavailable: upstream
   registered placeholders with TBC binary names; they cannot spawn unless a
   verified binary + credentials exist.
4. **The broad `tests/unit` sweep** remains budget-limited in this sandbox;
   executed suites are listed in the test report. Core suites and all new
   feature suites pass.
5. **`__all__` endpoint clear route** requires the explicit `?confirm=yes`
   guard — documented; there is no UI for it (intentional, destructive).
