# Road Dog — The Crew guide

The Crew is Road Dog's multi-agent system (upstream's "Jarvis Agents" +
Society + missions), re-presented under Road Dog's identity.

## Roles
Ships with specialized seats: Commander, Architect, Developer, Debugger,
Researcher, Tester, Reviewer, Documentation — plus custom roles you define.
Each seat keeps one endless chat, private notes learned from its own work,
and its own model assignment — a small local model can hold a specialized
seat while a bigger model plans.

## Working together
- Visual agent dashboard (the Society office) with live status, goals and
  assignments; shared scratchpads and structured agent-to-agent handoffs.
- Missions run in an isolated `git worktree` with kill-on-crash containment;
  parallel and sequential workflows, mission dependencies, continue/restart/
  branch, failure recovery, human approval checkpoints, and an independent
  reviewer pass before you see the result.
- Guardrails: bounded retries/iterations, concurrency limits, stalled-mission
  detection, token/spend budgets (Spend dashboard) — no unbounded loops or
  runaway delegation.
- Agents must not report success unless the deliverable exists; verification
  is part of the mission pipeline (builder → tester → reviewer → critic).

## Everyday control
- Start/stop/pause per agent; per-agent auth status shown in the Agentic IDE.
- Voice routing: brief a pane by call sign ("Tell T1 to write the tests").
- Artifacts land in the artifact library with full tool-run history.

## v1.1.0: structured handoffs & enforced budgets

Handoffs are now a validated contract (`jarvis/missions/handoff.py`): every
transfer records sender, receiver, completed work, remaining work, artifacts,
known failures, required verification and resource usage — and the ledger
BLOCKS self-handoffs, unknown roles, circular chains (direct or transitive),
runaway depth, and any attempt to grant the receiver permissions its role
does not hold. Budgets (`jarvis/costs/budgets.py`) are enforced at the
dispatch boundary: per-agent and per-mission token/request/cost caps raise
`BudgetExceeded` BEFORE a request goes out; measured usage settles the
escrow. A mission stops safely and legibly at its limit (see the acceptance
mission's stop-proof test).
