# Road Dog v1.0.0 — Security review

Scope: full-tree review of the fork + all new code. Upstream's model (risk
tiers safe/monitor/ask/block; only `ToolExecutor.execute()` authorized; keys
via `get_secret`; voice/chat never accepts secrets) is preserved unchanged.

## Findings & actions
1. **Update channel hijack risk (fork-specific).** Pointing the default
   official-repo slug at upstream would let "check for updates" pull upstream
   builds over Road Dog. Fixed: default slug is the fork placeholder
   (`road-dog/road-dog`), resolution fails closed and honestly; upstream kept
   as `UPSTREAM_REPO_SLUG` for attribution only.
2. **Credential continuity.** Keyring service name kept on the upstream value
   so migrated installs keep their keys and uninstall removes exactly what it
   can reach. No insecure default credentials anywhere; no secrets in
   `jarvis.toml` (writer contract unchanged).
3. **Diagnostics cannot spend.** Readiness + capability profiler perform
   local/config/PATH/filesystem reads and GET-metadata requests to the
   user-configured endpoint only. No completion calls, no model pulls, no
   server lifecycle operations.
4. **Network exposure.** Default listener stays local (upstream behavior
   preserved); remote access remains an explicit opt-in; channels/cloud
   integrations remain opt-in.
5. **Prompt injection.** Unchanged upstream posture preserved and re-asserted
   in the new persona: screen/web/plugin content is untrusted data; only the
   user's own requests are commands; no permission can be granted by content
   (risk tiering is code, not prompt).
6. **New config surface.** `[sam]` and `[ui] high_contrast` validated
   (interval floor, HH:MM parsing, bool persistence through the canonical
   config writer); `checkins_enabled` defaults to false (no background
   activity unless asked).
7. **New tests** pin the honesty contract of diagnostics (no network claims,
   `unknown` for unprobed) and the identity freeze (branding test updated).

## Residual risks (documented, unchanged from upstream)
- Upstream signed trust artifacts (`install/tuf/`, `install/in-toto/`) belong
  to upstream's release channel; Road Dog has no signed release pipeline yet
  — verify source installs yourself until a fork release channel exists.
- Plugin/MCP trust boundaries are upstream's: install only what you trust.

# v1.1.0 security review (addendum)

1. **Migration tool is the only cross-application surface.** It requires the
   caller to name the source path, plans before writing, copies only
   config/wiki/workspace, never credentials, and refuses to overwrite. No
   boot path, scheduler or route invokes it automatically.
2. **Endpoint registry.** No secrets in `endpoints.json`; probes are GET
   metadata to user-configured servers only — no completions, no model
   pulls, no lifecycle calls, no paid calls. `pick()` returns None rather
   than silently falling back to a hosted provider.
3. **Small-model kit hardening.** Reasoning text is structurally separated
   and NEVER parsed for tool calls (tested: a `TOOL:` line inside
   `<think>` is unreachable); the tool protocol is allow-listed and rejects
   malformed lines rather than guessing.
4. **Handoffs cannot grant permissions.** Receiver permissions come only
   from its role's fixed allow-list; a handoff naming a permission the
   receiver lacks is REJECTED (tested), preventing privilege transfer
   through crew delegation.
5. **Budgets stop work before spend.** `check_and_reserve` raises before
   dispatch; concurrent dispatch races are bounded (thread test); stops are
   recorded with scope/kind/detail.
6. **Sam memory surface.** File names are validated against a strict
   pattern and resolved under the workspace dir (traversal tests); content
   is stored/returned as data only — it cannot reach tool execution.
7. **Bounded loops.** Structured-output repair is capped (default 2
   attempts), handoff depth is capped, check-in scheduling skips rather
   than queues — no unbounded retries anywhere in the new code.
