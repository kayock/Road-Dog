# Road Dog — Sam's personality configuration

Sam(wise) is the shipped companion. His character is data, not code — you can
read, edit and reset every piece.

## The editable seeds
| File | Role |
|---|---|
| `jarvis/brain/JARVIS_PERSONA.md` | The voice persona (full + compact blocks). Editable in-app: Settings → System Prompt; your override lives in `data/custom_system_prompt.md`, one-click reset restores the shipped text. |
| `SOUL.md` (created in your data dir) | Sam's own character file: Name line, vibe, tone rules, limits — user-editable by hand; the `## Calibration` section is maintained by the learning loop. |
| `USER.md`, `people/*.md`, `BOOTSTRAP.md` | What Sam remembers about you (and deliberately does not — see the Do-Not-Record list). |

## Name
The name is derived from your wake phrase ("Hey Sam" → "Sam"). No phrase set?
He falls back to the shipped default **Sam**. Anything you choose overrides
it; the app title follows along.

## Memory that grows
Sam keeps durable facts you tell him in the local wiki and his notebooks, with
source citations and conflict handling. Inspect everything: Settings → Memory
shows what Sam remembers, with correction and deletion per entry. Memory
import/export and backups live in the wiki tooling; migrations never destroy
existing memory data.

## Proactive companionship (opt-in)
`[sam]` in `jarvis.toml` (or Settings → Sam):

```toml
[sam]
checkins_enabled = false          # off until you turn it on
checkin_interval_minutes = 120
quiet_hours_start = "22:00"       # may wrap midnight
quiet_hours_end = "08:00"
checkin_lines = []                # empty = Sam's own lines
```

Check-ins are **local-only notifications** — canned Sam lines published on the
EventBus; no model call, no spend, no tools, and personality never overrides
security boundaries. A check-in inside quiet hours is skipped, never queued.

## v1.1.0: your memories, under your control

`/api/sam/memories` lists, searches, reads, edits, deletes and exports the
workspace memory files (USER.md, people/*.md). Names are strict file names
(traversal-proof); writes are atomic; export returns everything as JSON.
The wiki database keeps its own review UI. Untrusted content inside a
memory is data — it can never reach tool execution or permission boundaries.
