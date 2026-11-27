# Dependency Cleanup Report (Road Dog v1.3.0 §3)

Scope: what Road Dog still pulls from upstream Personal Jarvis release
infrastructure, what is optional, and what the base install actually needs.

| Item | Status | Action |
|---|---|---|
| Distribution name `personal-jarvis` | REMOVED | pyproject renamed to `road-dog`; dev/full extras self-reference `road-dog[...]`; docs share path `share/road-dog/docs` |
| Custom cryptography wheel repository (personaljarvis.github.io/RoadDog/native-crypto) | OPTIONAL, Linux unaffected | Only maintainer lock-generation + Intel-mac/Windows-ARM64 cells use it. On Ubuntu/standard Windows, upstream PyPI wheels install (documented in install/README.md). Browser-sidecar reference re-pointed to the Road Dog publication |
| Upstream release-signing / TUF infrastructure | NOT PRESENT | No TUF/update-framework code exists in the tree; the installer updater targets `road-dog/road-dog` releases (branding DEFAULT_OFFICIAL_REPO_SLUG), never the upstream repo |
| macOS signing / notarization | ISOLATED | `[desktop-macos]` extra only (pre-existing upstream split); not installed by any Ubuntu/Windows profile |
| Peer-networking (Kafka/MQTT/Redis streams) | ISOLATED | `[trigger-streams]` extra only; base never imports them |
| Telephony + chat channels (Twilio etc.) | ISOLATED | `[telephony]` / `[channels]` extras; routes degrade honestly when absent |
| Cloud provider SDKs (anthropic, openai, google-genai) | BASE imports, ZERO runtime requirement | Brain plugins import them lazily/at module load but require NO credentials and make NO network calls unless the user configures a hosted provider. Local operation works credential-free: provider = ollama / openai-compatible / local-openai via the endpoint registry. Removing the SDKs from base would break module imports for hosted support (kept, per §3: "Preserve optional commercial provider support") |
| Cloud brain as startup requirement | REMOVED (v1.2.0) | Local endpoints are first-class routing targets; no automatic hosted fallback exists |
| Paid speech fallback | PROHIBITED (v1.3.0) | Kayock Voice provider fails honestly; no code path builds a paid speech provider as a fallback |
| `dev` extra self-reference | FIXED | was `personal-jarvis[...]` (upstream package), now `road-dog[...]` |

Install contract after cleanup: `pip install road-dog` (or `pip install -e .`)
from a plain checkout needs ONLY PyPI — no supplemental index, no GitHub Pages
artifacts, no signing keys. `pip install 'road-dog[local-first]'` documents the
explicit local-only profile (currently identical to base: local voice needs
httpx, already core).
