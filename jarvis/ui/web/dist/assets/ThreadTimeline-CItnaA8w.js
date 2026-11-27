import { t as Bot } from "./bot-G9U5SeGm.js";
import { A as MessageCircleQuestion, C as QuestionCard, c as readableOutput, l as summarize, n as StretchMark, o as buildTimeline, s as plural, t as CallMark, u as traceDuration, w as CredentialCard } from "./TraceTimeline-hpw2Rng1.js";
import { t as Check } from "./check-vbwKkbPq.js";
import { t as ChevronRight } from "./chevron-right-BjVJ-R2c.js";
import { t as FileText } from "./file-text-D8DI7Rfv.js";
import { k as Hammer } from "./AgentComposer-DoSrpnSm.js";
import { t as MessageSquare } from "./message-square-DJ9k0qrk.js";
import { $i as ArrowDown, Bc as require_jsx_runtime, F as robustCopy, Gs as fill, Ko as EMPTY_TIMELINE, Ln as cn, Qi as ArrowLeft, Qo as waitsOnCard, Wi as Copy, Xc as require_react, Xo as reduceEvents, Yi as Brain, hi as ShieldAlert, ji as LoaderCircle, na as createLucideIcon, oc as useT, qi as ChevronDown, si as X, tl as __toESM } from "./index-BOzhgzD7.js";
import { n as toolDiff, r as ChatMarkdown } from "./toolDiff-CkONUaSH.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleSlash = createLucideIcon("CircleSlash", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["line", {
	x1: "9",
	x2: "15",
	y1: "15",
	y2: "9",
	key: "1dfufj"
}]]);
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Diff = createLucideIcon("Diff", [
	["path", {
		d: "M12 3v14",
		key: "7cf3v8"
	}],
	["path", {
		d: "M5 10h14",
		key: "elsbfy"
	}],
	["path", {
		d: "M5 21h14",
		key: "11awu3"
	}]
]);
var SPAWN_TOOLS = new Set([
	"task",
	"agent",
	"spawn_agent",
	"spawnagent",
	"subagent",
	"sub_agent",
	"spawn_subagent",
	"launch_agent",
	"dispatch_agent",
	"run_agent",
	"delegate_task"
]);
function isSpawnTool(name) {
	const bare = name.split("__").pop() ?? name;
	return SPAWN_TOOLS.has(bare.toLowerCase());
}
function isSubagentCall(block) {
	return Boolean(block.subagent) || isSpawnTool(block.name);
}
function text(value) {
	return typeof value === "string" ? value.trim() : "";
}
function record(value) {
	return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
function isLaunchReceipt(output) {
	return Boolean(output && /^(Async agent launched|agentId:)/i.test(output.trim()));
}
function firstLine$1(value, max = 80) {
	const line = value.split(/\r?\n/).find((part) => part.trim())?.trim() ?? "";
	return line.length > max ? `${line.slice(0, max - 1).trimEnd()}…` : line;
}
function waitsForPerson$1(blocks) {
	return blocks.some((b) => b.kind === "tool" && (b.approval !== null && b.approval.decision === null || b.question !== void 0 && !b.question.closed || b.credential !== void 0 && b.credential.status === null));
}
function derived(block, turnStatus) {
	const input = record(block.input);
	const prompt = text(input.prompt) || text(input.message) || text(input.task) || text(input.instructions);
	const output = block.output;
	const status = output !== null && !isLaunchReceipt(output) ? block.isError ? "failed" : "done" : turnStatus === "running" ? "running" : "stopped";
	return {
		description: text(input.description) || text(input.title) || text(input.name),
		agentType: text(input.subagent_type) || text(input.agent_type) || text(input.agent) || text(input.role),
		prompt,
		background: Boolean(input.run_in_background),
		threadId: "",
		status,
		summary: status === "running" || isLaunchReceipt(output) ? "" : output ?? "",
		activity: "",
		lastTool: "",
		tokens: null,
		toolUses: null,
		durationMs: block.durationMs,
		startedMs: block.startedMs,
		finishedMs: block.durationMs !== null ? block.startedMs + block.durationMs : null,
		blocks: []
	};
}
function entryOf(block, turn, depth, parentId) {
	const sub = block.subagent ?? derived(block, turn.status);
	const input = record(block.input);
	const title = sub.description || text(input.description) || firstLine$1(sub.prompt) || sub.agentType || "Sub-agent";
	return {
		id: block.callId,
		turnId: turn.id,
		depth,
		parentId,
		title,
		agentType: sub.agentType || text(input.subagent_type),
		prompt: sub.prompt || text(input.prompt),
		status: sub.status,
		summary: sub.summary,
		activity: sub.activity,
		tokens: sub.tokens,
		toolUses: sub.toolUses ?? (sub.blocks.length ? sub.blocks.filter((b) => b.kind === "tool").length : null),
		durationMs: sub.durationMs,
		startedMs: sub.startedMs,
		finishedMs: sub.finishedMs,
		background: sub.background,
		waiting: block.approval?.decision === null || waitsForPerson$1(sub.blocks),
		blocks: sub.blocks,
		streamed: sub.blocks.length > 0,
		block
	};
}
function walk(blocks, turn, depth, parentId, out) {
	for (const block of blocks) {
		if (block.kind !== "tool" || !isSubagentCall(block)) continue;
		const entry = entryOf(block, turn, depth, parentId);
		out.push(entry);
		walk(entry.blocks, turn, depth + 1, entry.id, out);
	}
}
function listSubagents(items) {
	const out = [];
	for (const item of items) if (item.type === "turn") walk(item.blocks, item, 0, null, out);
	return out;
}
function subagentEntry(block, turn) {
	return entryOf(block, turn, 0, null);
}
function subagentPath(entries, id) {
	const byId = new Map(entries.map((entry) => [entry.id, entry]));
	const path = [];
	let at = byId.get(id);
	while (at) {
		path.unshift(at);
		at = at.parentId ? byId.get(at.parentId) : void 0;
	}
	return path;
}
function subagentCounts(entries) {
	return {
		total: entries.length,
		running: entries.filter((entry) => entry.status === "running").length,
		failed: entries.filter((entry) => entry.status === "failed").length,
		waiting: entries.filter((entry) => entry.waiting).length
	};
}
var TURN_STATUS = {
	running: "running",
	done: "done",
	failed: "error",
	stopped: "cancelled"
};
function subagentTurn(entry) {
	const answer = !entry.streamed && entry.summary.trim() ? [{
		kind: "text",
		id: `answer:${entry.id}`,
		text: entry.summary
	}] : [];
	const running = entry.status === "running";
	return {
		type: "turn",
		id: `agent:${entry.id}`,
		provider: "",
		model: "",
		effort: "",
		runner: "",
		status: TURN_STATUS[entry.status],
		blocks: [...entry.blocks, ...answer],
		startedMs: entry.startedMs,
		durationMs: running ? null : entry.durationMs ?? (entry.finishedMs !== null ? Math.max(0, entry.finishedMs - entry.startedMs) : null),
		usage: null,
		liveUsage: null,
		costUsd: null,
		error: entry.status === "failed" ? firstLine$1(entry.summary, 300) || null : null
	};
}
function shortCount(value) {
	if (value < 1e3) return String(value);
	if (value < 1e5) return `${(value / 1e3).toFixed(1).replace(/\.0$/, "")}k`;
	if (value < 1e6) return `${Math.round(value / 1e3)}k`;
	return `${(value / 1e6).toFixed(1).replace(/\.0$/, "")}M`;
}
async function fetchDiscoveredAgents(sessionId) {
	const res = await fetch(`/api/agent-chat/sessions/${encodeURIComponent(sessionId)}/subagents`);
	if (!res.ok) throw new Error(`sub-agents unavailable (${res.status})`);
	const body = await res.json();
	return Array.isArray(body.agents) ? body.agents : [];
}
function discoveredStatus(raw) {
	return raw === "done" || raw === "failed" || raw === "stopped" ? raw : "running";
}
function pathTitle(path) {
	return (path.split("/").filter(Boolean).pop() ?? "").replace(/[_-]+/g, " ").trim();
}
function discoveredBlocks(agent) {
	const scratch = "discovered";
	return reduceEvents(EMPTY_TIMELINE, [{
		seq: 0,
		ts_ms: agent.started_ms,
		kind: "turn_started",
		payload: { turn_id: scratch }
	}, ...agent.events.map((event) => ({
		...event,
		seq: 0,
		payload: {
			...event.payload,
			turn_id: scratch
		}
	}))]).items.find((item) => item.type === "turn")?.blocks ?? [];
}
function findThread(blocks, threadId) {
	return blocks.some((b) => b.kind === "tool" && (b.subagent?.threadId === threadId || (b.subagent ? findThread(b.subagent.blocks, threadId) : false)));
}
function patchThread(blocks, threadId, fn) {
	let changed = false;
	const next = blocks.map((b) => {
		if (b.kind !== "tool" || !b.subagent) return b;
		if (b.subagent.threadId === threadId) {
			changed = true;
			return fn(b);
		}
		const inner = patchThread(b.subagent.blocks, threadId, fn);
		if (inner === b.subagent.blocks) return b;
		changed = true;
		return {
			...b,
			subagent: {
				...b.subagent,
				blocks: inner
			}
		};
	});
	return changed ? next : blocks;
}
function insertAt(blocks, startedMs, finished) {
	const later = blocks.findIndex((b) => b.kind === "tool" && b.startedMs > startedMs);
	if (later >= 0) return later;
	if (!finished) return blocks.length;
	let at = blocks.length;
	while (at > 0 && blocks[at - 1].kind === "text") at -= 1;
	return at;
}
function mergeDiscovered(items, agents, rootThread) {
	if (!agents.length) return items;
	let next = items;
	for (const agent of agents) {
		const blocks = discoveredBlocks(agent);
		const status = discoveredStatus(agent.status);
		const turnIndex = next.findIndex((item) => item.type === "turn" && findThread(item.blocks, agent.thread_id));
		if (turnIndex >= 0) {
			const turn$1 = next[turnIndex];
			const patched = patchThread(turn$1.blocks, agent.thread_id, (b) => {
				const sub = b.subagent;
				return {
					...b,
					subagent: {
						...sub,
						blocks: sub.blocks.length ? sub.blocks : blocks,
						summary: sub.summary || agent.summary,
						status: sub.status === "running" && status !== "running" ? status : sub.status
					}
				};
			});
			next = next.map((item, index) => index === turnIndex ? {
				...turn$1,
				blocks: patched
			} : item);
			continue;
		}
		const spawn = {
			kind: "tool",
			callId: `codex:${agent.thread_id}`,
			name: "spawn_agent",
			input: null,
			output: null,
			isError: false,
			durationMs: null,
			approval: null,
			startedMs: agent.started_ms,
			subagent: {
				description: pathTitle(agent.path) || agent.nickname,
				agentType: agent.nickname || (agent.role !== "default" ? agent.role : ""),
				prompt: "",
				background: true,
				threadId: agent.thread_id,
				status,
				summary: agent.summary,
				activity: "",
				lastTool: "",
				tokens: null,
				toolUses: null,
				durationMs: null,
				startedMs: agent.started_ms,
				finishedMs: status === "running" ? null : agent.updated_ms || null,
				blocks
			}
		};
		if (agent.parent_thread_id && agent.parent_thread_id !== rootThread) {
			const parentIndex = next.findIndex((item) => item.type === "turn" && findThread(item.blocks, agent.parent_thread_id));
			if (parentIndex < 0) continue;
			const turn$1 = next[parentIndex];
			const patched = patchThread(turn$1.blocks, agent.parent_thread_id, (b) => ({
				...b,
				subagent: {
					...b.subagent,
					blocks: [...b.subagent.blocks, spawn]
				}
			}));
			next = next.map((item, index) => index === parentIndex ? {
				...turn$1,
				blocks: patched
			} : item);
			continue;
		}
		let turnAt = -1;
		next.forEach((item, index) => {
			if (item.type === "turn" && item.startedMs <= agent.started_ms) turnAt = index;
		});
		if (turnAt < 0) continue;
		const turn = next[turnAt];
		const running = turn.status === "running";
		const placed = !running && status === "running" ? {
			...spawn,
			subagent: {
				...spawn.subagent,
				status: "stopped",
				finishedMs: agent.updated_ms || agent.started_ms
			}
		} : spawn;
		const at = insertAt(turn.blocks, agent.started_ms, !running);
		next = next.map((item, index) => index === turnAt ? {
			...turn,
			blocks: [
				...turn.blocks.slice(0, at),
				placed,
				...turn.blocks.slice(at)
			]
		} : item);
	}
	return next;
}
function isFailed(call) {
	return call.status === "failed" || call.status === "blocked" || call.status === "declined";
}
function thoughtGist(text$1) {
	const source = text$1.trim();
	const heading = /^(?:#{1,6}\s+(.+)|\*\*([^*\n]+)\*\*\s*(?:\n|$))/.exec(source);
	const plain = (heading ? heading[1] ?? heading[2] : source.split(/\n\s*\n/)[0]).replace(/```[^\n]*\n?/g, " ").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/^\s{0,3}(>|[-*+]|\d+[.)])\s+/gm, "").replace(/(\*\*|__|~~|`)/g, "").replace(/\s+/g, " ").trim();
	const sentence = /^.+?[.!?:](?=\s|$)/.exec(plain)?.[0] ?? plain;
	if (sentence.length <= 140) return sentence;
	const cut = sentence.slice(0, 140);
	const space = cut.lastIndexOf(" ");
	return `${(space > 140 / 2 ? cut.slice(0, space) : cut).replace(/[\s,;:]+$/, "")}…`;
}
function soleKind(items) {
	const calls = items.flatMap((item) => item.kind === "call" ? [item.call] : []);
	if (calls.length === 0) return "thought";
	return new Set(calls.map((call) => call.kind)).size === 1 ? calls[0].kind : null;
}
function buildThreadRows(blocks, options) {
	const timeline = buildTimeline(blocks, {
		...options,
		live: true
	});
	const started = /* @__PURE__ */ new Map();
	for (const block of blocks) if (block.kind === "tool") started.set(block.callId, block.startedMs);
	else if (block.kind === "reasoning") started.set(block.id, block.startedMs);
	const running = options.status === "running";
	const rows = [];
	let items = [];
	const flush = () => {
		if (!items.length) return;
		const calls = items.flatMap((item) => item.kind === "call" ? [item.call] : []);
		rows.push({
			kind: "work",
			id: `work:${items[0].id}`,
			items,
			summary: calls.length ? summarize(calls, options.t, options.lang) : "Thinking",
			sole: soleKind(items),
			added: calls.reduce((sum, call) => sum + call.added, 0),
			removed: calls.reduce((sum, call) => sum + call.removed, 0),
			startedMs: items[0].startedMs,
			live: false
		});
		items = [];
	};
	for (const entry of timeline.entries) {
		if (entry.kind === "activity") {
			for (const call of entry.calls) if (isSubagentCall(call.block)) {
				flush();
				rows.push({
					kind: "agent",
					id: `agent:${call.id}`,
					block: call.block
				});
			} else items.push({
				kind: "call",
				id: call.id,
				call,
				startedMs: started.get(call.id) ?? 0
			});
			continue;
		}
		const block = entry.block;
		if (block.kind === "reasoning") {
			const live = running && block.live;
			const text$1 = block.text.trim();
			if (text$1) {
				flush();
				rows.push({
					kind: "thought",
					id: block.id,
					text: text$1,
					block,
					live
				});
			} else if (live) items.push({
				kind: "thought",
				id: block.id,
				block,
				startedMs: started.get(block.id) ?? 0
			});
			continue;
		}
		flush();
		if (block.kind === "text") rows.push({
			kind: "text",
			id: entry.id,
			text: block.text,
			block
		});
		else if (isSubagentCall(block)) rows.push({
			kind: "agent",
			id: `agent:${block.callId}`,
			block
		});
		else rows.push({
			kind: "pending",
			id: entry.id,
			block
		});
	}
	flush();
	const last = rows[rows.length - 1];
	if (running && last?.kind === "work") last.live = true;
	return rows;
}
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
const OpenSubagent = (0, import_react.createContext)(null);
var STATUS_WORD = {
	running: "Working",
	done: "Done",
	failed: "Failed",
	stopped: "Stopped"
};
function SubagentMark({ status, waiting = false, className }) {
	const box = cn("h-3.5 w-3.5 shrink-0", className);
	if (waiting && status === "running") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
		"aria-hidden": true,
		className: cn(box, "text-warning")
	});
	if (status === "running") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
		"aria-hidden": true,
		className: cn(box, "animate-spin text-muted-foreground")
	});
	if (status === "done") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
		"aria-hidden": true,
		className: cn(box, "text-success")
	});
	if (status === "failed") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
		"aria-hidden": true,
		className: cn(box, "text-destructive")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleSlash, {
		"aria-hidden": true,
		className: cn(box, "text-muted-foreground")
	});
}
function LiveClock({ since }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const tick = () => {
			if (ref.current) ref.current.textContent = traceDuration(Math.max(0, Date.now() - since));
		};
		tick();
		const timer = window.setInterval(tick, 1e3);
		return () => window.clearInterval(timer);
	}, [since]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref,
		className: "tabular-nums",
		children: traceDuration(Math.max(0, Date.now() - since))
	});
}
function firstLine(text$1) {
	return text$1.split(/\r?\n/).map((line) => line.replace(/^[#>*\-\s]+/, "").trim()).find(Boolean) ?? "";
}
function SubagentMeta({ entry }) {
	const parts = [];
	if (entry.toolUses) parts.push(`${entry.toolUses} ${entry.toolUses === 1 ? "tool" : "tools"}`);
	if (entry.tokens) parts.push(`${shortCount(entry.tokens)} tokens`);
	const running = entry.status === "running";
	const duration = !running && entry.durationMs ? traceDuration(entry.durationMs) : "";
	if (duration) parts.push(duration);
	if (!parts.length && !running) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "shrink-0 tabular-nums",
		children: [parts.join(" · "), running && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [parts.length ? " · " : "", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveClock, { since: entry.startedMs })] })]
	});
}
function statusLine(entry) {
	if (entry.status === "running") {
		if (entry.waiting) return "Waiting for your approval";
		return entry.activity || (entry.block.subagent?.lastTool ? `Using ${entry.block.subagent.lastTool}` : "Working");
	}
	if (entry.status === "failed") return firstLine(entry.summary) || "Failed";
	if (entry.status === "stopped") return "Stopped before it answered";
	return firstLine(entry.summary) || "Finished";
}
function SubagentCard({ block, turn }) {
	const open = (0, import_react.useContext)(OpenSubagent);
	const entry = (0, import_react.useMemo)(() => subagentEntry(block, turn), [block, turn]);
	const running = entry.status === "running";
	const card = "group/agent flex w-full min-w-0 items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5 text-left";
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubagentCardBody, {
		entry,
		running
	});
	if (!open) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-testid": "thread-subagent-card",
		"data-status": entry.status,
		className: card,
		children: body
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => open(entry.id),
		"data-testid": "thread-subagent-card",
		"data-status": entry.status,
		"aria-label": `Open sub-agent ${entry.title}, ${STATUS_WORD[entry.status].toLowerCase()}`,
		className: cn(card, "transition-colors hover:border-border-strong hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"),
		children: [body, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex shrink-0 items-center gap-1 text-xs text-muted-foreground transition-colors group-hover/agent:text-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
					"aria-hidden": true,
					className: "h-3.5 w-3.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden sm:inline",
					children: "Open"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					"aria-hidden": true,
					className: "h-3.5 w-3.5"
				})
			]
		})]
	});
}
function SubagentCardBody({ entry, running }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"aria-hidden": true,
		className: "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, {
			className: "h-4 w-4",
			strokeWidth: 1.75
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubagentMark, {
				status: entry.status,
				waiting: entry.waiting,
				className: "h-2.5 w-2.5"
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "min-w-0 flex-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex min-w-0 items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate text-sm font-medium text-foreground-strong",
				children: entry.title
			}), entry.agentType && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 rounded-md border border-border px-1.5 text-[11px] leading-4 text-muted-foreground",
				children: entry.agentType
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "mt-0.5 flex min-w-0 items-center gap-2 text-xs text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("min-w-0 truncate", running && !entry.waiting && "live-tool-shine", entry.waiting && "text-warning", entry.status === "failed" && "text-destructive"),
					children: statusLine(entry)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "text-muted-foreground/50",
					children: "·"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubagentMeta, { entry })
			]
		})]
	})] });
}
function subagentSummary(entries) {
	const counts = subagentCounts(entries);
	const parts = [`${counts.total} ${counts.total === 1 ? "sub-agent" : "sub-agents"}`];
	if (counts.running) parts.push(`${counts.running} working`);
	if (counts.waiting) parts.push(`${counts.waiting} waiting`);
	if (counts.failed) parts.push(`${counts.failed} failed`);
	return parts.join(" · ");
}
function SubagentSwitcher({ entries, openId, onOpen }) {
	const strip = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		(strip.current?.querySelector("[aria-current=true]"))?.scrollIntoView?.({
			block: "nearest",
			inline: "nearest"
		});
	}, [openId]);
	if (entries.length === 0) return null;
	const tab = (active) => cn("flex h-7 max-w-[15rem] shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", active ? "bg-secondary text-foreground-strong" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		"aria-label": "Sub-agents",
		"data-testid": "thread-subagent-switcher",
		className: "flex min-w-0 items-center gap-2 border-b border-border/70 bg-background px-3 py-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: strip,
			className: "flex min-w-0 flex-1 items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-current": openId === null,
					onClick: () => onOpen(null),
					className: tab(openId === null),
					"data-testid": "thread-subagent-main",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
						"aria-hidden": true,
						className: "h-3.5 w-3.5 shrink-0"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: "Main thread"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "mx-1 h-4 w-px shrink-0 bg-border"
				}),
				entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-current": openId === entry.id,
					onClick: () => onOpen(entry.id),
					title: entry.prompt || entry.title,
					className: tab(openId === entry.id),
					"data-testid": "thread-subagent-tab",
					"data-status": entry.status,
					children: [
						entry.depth > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							className: "shrink-0 text-muted-foreground/60",
							children: "›".repeat(entry.depth)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubagentMark, {
							status: entry.status,
							waiting: entry.waiting
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: entry.title
						})
					]
				}, entry.id))
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden shrink-0 text-xs tabular-nums text-muted-foreground md:inline",
			"data-testid": "thread-subagent-count",
			children: subagentSummary(entries)
		})]
	});
}
function SubagentHeader({ entry, path, onOpen }) {
	const [taskOpen, setTaskOpen] = (0, import_react.useState)(false);
	const long = entry.prompt.length > 280 || entry.prompt.split("\n").length > 5;
	const parent = path.length > 1 ? path[path.length - 2] : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		"data-testid": "thread-subagent-header",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-w-0 items-center gap-2 text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onOpen(parent ? parent.id : null),
					"data-testid": "thread-subagent-back",
					className: "flex h-7 shrink-0 items-center gap-1.5 rounded-md px-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						"aria-hidden": true,
						className: "h-4 w-4"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: parent ? parent.title : "Main thread" })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-foreground-secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, {
						className: "h-5 w-5",
						strokeWidth: 1.75
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex min-w-0 items-center gap-2 text-base font-semibold text-foreground-strong",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: entry.title
						}), entry.agentType && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 rounded-md border border-border px-1.5 text-[11px] font-normal leading-4 text-muted-foreground",
							children: entry.agentType
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubagentMark, {
									status: entry.status,
									waiting: entry.waiting
								}), entry.waiting && entry.status === "running" ? "Waiting for your approval" : STATUS_WORD[entry.status]]
							}),
							entry.background && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								children: "·"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "In the background" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubagentMeta, { entry })
						]
					})]
				})]
			}),
			entry.prompt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-label": "Task",
				className: "rounded-xl border border-border bg-card px-3 py-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 text-xs font-medium text-muted-foreground",
						children: ["Task from ", parent ? parent.title : "the main agent"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("relative text-sm leading-6 text-foreground-secondary [overflow-wrap:anywhere]", long && !taskOpen && "max-h-32 overflow-hidden"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "prose prose-neutral max-w-none text-sm dark:prose-invert prose-p:my-1 prose-p:text-foreground-secondary prose-li:text-foreground-secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatMarkdown, { text: entry.prompt })
						}), long && !taskOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-card to-transparent"
						})]
					}),
					long && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-expanded": taskOpen,
						onClick: () => setTaskOpen(!taskOpen),
						className: "mt-1 text-xs text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
						children: taskOpen ? "Show less" : "Show the whole task"
					})
				]
			}),
			!entry.streamed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				"data-testid": "thread-subagent-unstreamed",
				children: entry.status === "running" ? "This agent's CLI does not stream a sub-agent's steps. Its answer shows here when it finishes." : "This agent's CLI reported only the task and the answer, not the sub-agent's steps."
			})
		]
	});
}
const PROSE = cn("py-1 prose prose-neutral max-w-none text-base leading-6 text-foreground dark:prose-invert dark:text-foreground [overflow-wrap:anywhere]", "[&>div>:first-child]:mt-0 [&>div>:last-child]:mb-0", "prose-p:my-2 prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground-strong", "prose-headings:mb-1.5 prose-headings:mt-4 prose-headings:font-semibold prose-headings:tracking-normal prose-headings:text-foreground-strong", "prose-h1:text-lg prose-h2:text-base prose-h3:text-base prose-h4:text-base", "prose-a:text-foreground-strong prose-a:underline prose-a:decoration-border-strong prose-a:underline-offset-2", "prose-code:rounded prose-code:bg-secondary prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:font-normal prose-code:before:hidden prose-code:after:hidden", "prose-pre:my-2 prose-pre:rounded-lg prose-pre:border prose-pre:border-border prose-pre:bg-card prose-pre:text-sm", "prose-li:my-0.5 prose-ul:my-2 prose-ol:my-2 prose-ul:pl-5 prose-ol:pl-5", "prose-table:my-3 prose-table:text-sm prose-th:text-foreground-strong prose-td:text-foreground");
function WorkRow({ icon, label, trailing, expanded, onToggle, grouped = false, live = false, stamp, ariaLabel, children }) {
	const line = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("flex min-h-6 min-w-0 items-center gap-2.5 leading-6", grouped ? "text-sm" : "text-base"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "flex h-6 w-4 shrink-0 items-center justify-center text-muted-foreground [&_svg]:h-4 [&_svg]:w-4",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("min-w-0 truncate transition-colors", "text-muted-foreground", onToggle && !live && "group-hover/row:text-foreground", live && "live-tool-shine"),
				children: label
			}),
			trailing,
			onToggle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "flex h-4 w-4 shrink-0 items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: cn("h-3.5 w-3.5 text-muted-foreground opacity-0 transition duration-200 group-hover/row:opacity-70 group-focus-visible/row:opacity-70", expanded && "rotate-90 opacity-70") })
			}),
			stamp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-auto shrink-0 pl-2 text-xs tabular-nums text-muted-foreground opacity-0 transition-opacity group-hover/row:opacity-100 group-focus-visible/row:opacity-100",
				children: clock(stamp)
			}) : null
		]
	});
	const row = cn("group/row relative block w-full min-w-0 rounded-md text-left", grouped ? "py-0" : "py-1.5");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [onToggle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-expanded": expanded,
			"aria-label": ariaLabel,
			onClick: onToggle,
			className: cn(row, "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"),
			children: line
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: row,
			children: line
		}), expanded && children]
	});
}
function DiffStat({ added, removed }) {
	if (!added && !removed) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "shrink-0 font-mono text-xs tabular-nums",
		children: [
			added > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-success",
				children: ["+", added]
			}),
			added > 0 && removed > 0 && " ",
			removed > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-destructive",
				children: ["−", removed]
			})
		]
	});
}
function DiffView({ files }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2",
		children: files.map((file, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-lg border border-border bg-card",
			children: [file.path && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 border-b border-border px-3 py-1.5 font-mono text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 flex-1 truncate",
					children: file.path
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiffStat, {
					added: file.added,
					removed: file.removed
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pre", {
				className: "m-0 max-h-80 overflow-auto py-1 font-mono text-xs leading-5 scrollbar-jarvis",
				children: [file.lines.map((line, i) => line.kind === "gap" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-3 text-muted-foreground",
					children: "⋯"
				}, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("whitespace-pre px-3", line.kind === "add" && "diff-line-add", line.kind === "del" && "diff-line-del"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "mr-2 select-none opacity-60",
						children: line.kind === "add" ? "+" : line.kind === "del" ? "-" : " "
					}), line.text]
				}, i)), file.truncated > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-3 text-muted-foreground",
					children: [
						"… ",
						file.truncated,
						" more lines"
					]
				})]
			})]
		}, `${file.path}:${index}`))
	});
}
function inputText(input) {
	if (input == null) return "";
	if (typeof input === "string") return input;
	try {
		return JSON.stringify(input, null, 2);
	} catch {
		return String(input);
	}
}
var CallMedia = (0, import_react.createContext)(/* @__PURE__ */ new Map());
function callPictures(blocks) {
	const byCall = /* @__PURE__ */ new Map();
	const moved = /* @__PURE__ */ new Set();
	let call = null;
	for (const block of blocks) if (block.kind === "tool") call = block.callId;
	else if (block.kind === "text" && block.id.startsWith("media-") && call) {
		byCall.set(call, [...byCall.get(call) ?? [], block.text]);
		moved.add(block.id);
	} else if (block.kind === "text") call = null;
	return {
		byCall,
		moved
	};
}
function CallDetails({ call }) {
	const t = useT();
	const block = call.block;
	const pictures = (0, import_react.useContext)(CallMedia).get(block.callId);
	const diff = (0, import_react.useMemo)(() => toolDiff(block.name, block.input, block.output), [
		block.name,
		block.input,
		block.output
	]);
	const output = readableOutput(block).trim();
	if (pictures?.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mb-1.5 ml-7 mt-0.5", PROSE, THREAD_MEDIA),
		children: pictures.map((text$1, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatMarkdown, { text: text$1 }, index))
	});
	if (diff && diff.length > 0 && !block.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-1.5 ml-7 mt-0.5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiffView, { files: diff })
	});
	const input = call.kind === "command" ? "" : inputText(block.input);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1.5 ml-7 mt-0.5 space-y-1.5 select-text",
		children: [
			call.kind === "command" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pre", {
				className: "m-0 overflow-x-auto rounded-lg bg-secondary px-3 py-2 font-mono text-xs leading-5 text-foreground scrollbar-jarvis",
				children: ["$ ", inputText(block.input?.command ?? call.text)]
			}),
			input && input !== "{}" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "m-0 max-h-48 overflow-auto rounded-lg bg-secondary px-3 py-2 font-mono text-xs leading-5 text-muted-foreground scrollbar-jarvis",
				children: input
			}),
			output ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: cn("m-0 max-h-72 overflow-auto whitespace-pre-wrap rounded-lg border border-border px-3 py-2 font-mono text-xs leading-5 scrollbar-jarvis", block.isError ? "text-destructive" : "text-foreground-secondary"),
				children: output
			}) : block.output === null ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: t("thread_turn.no_output")
			})
		]
	});
}
function useDisclosure(onOpenChange) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return [open, (0, import_react.useCallback)(() => {
		setOpen(!open);
		onOpenChange?.(!open);
	}, [open, onOpenChange])];
}
function CallRow({ call, stamp, grouped = false, onOpenChange }) {
	const t = useT();
	const [open, toggle] = useDisclosure(onOpenChange);
	const failed = isFailed(call);
	const running = call.status === "running";
	const detail = call.detail || call.result;
	const tail = failed && call.reason ? call.reason : call.status === "interrupted" ? t("thread_turn.interrupted") : "";
	const label = running ? [call.text, detail].filter(Boolean).join("  ") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: call.text }),
		detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "ml-1.5 text-muted-foreground/70",
			children: detail
		}),
		tail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "ml-1.5 text-muted-foreground/70",
			children: ["— ", tail]
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkRow, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("flex items-center justify-center", failed && "text-destructive/70"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CallMark, { call })
		}),
		label,
		ariaLabel: failed ? fill(t("thread_turn.call_failed"), { call: call.text }) : void 0,
		trailing: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiffStat, {
			added: call.added,
			removed: call.removed
		}), failed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
			"aria-hidden": true,
			className: "h-3 w-3 shrink-0 text-destructive/70"
		})] }),
		stamp,
		grouped,
		live: running,
		expanded: open,
		onToggle: toggle,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CallDetails, { call })
	});
}
var THOUGHT_PROSE = cn(PROSE, "text-foreground-secondary dark:text-foreground-secondary prose-p:text-foreground-secondary prose-li:text-foreground-secondary");
function ThoughtView({ text: text$1 }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const gist = (0, import_react.useMemo)(() => thoughtGist(text$1), [text$1]);
	const more = gist !== text$1.trim();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		"data-testid": "thread-thought",
		children: [more ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			"aria-expanded": open,
			onClick: () => setOpen((value) => !value),
			className: "group/thought block w-full rounded-md py-1 text-left text-base leading-6 text-foreground-secondary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
			children: [gist, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
				"aria-hidden": true,
				className: cn("ml-1 inline h-3.5 w-3.5 align-[-2px] text-muted-foreground opacity-0 transition duration-200 group-hover/thought:opacity-70 group-focus-visible/thought:opacity-70", open && "rotate-90 opacity-70")
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "m-0 py-1 text-base leading-6 text-foreground-secondary",
			children: gist
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn(THOUGHT_PROSE, "border-l border-border pl-3 text-sm"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatMarkdown, { text: text$1 })
		})]
	});
}
function ThinkingRow({ grouped = false }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkRow, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { strokeWidth: 1.75 }),
		label: t("thread_turn.thinking"),
		grouped,
		live: true
	});
}
const THREAD_MEDIA = "[&_[data-kind=image]_img]:max-h-48 [&_[data-kind=image]_img]:max-w-sm [&_[data-kind=image]_img]:border [&_[data-kind=image]_img]:border-border";
function StepRow({ item, running, grouped, onOpenChange }) {
	if (item.kind === "call") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CallRow, {
		call: item.call,
		stamp: item.startedMs,
		grouped,
		onOpenChange
	});
	return running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThinkingRow, { grouped }) : null;
}
var FADE = "1.5rem";
function StepList({ items, running, follow }) {
	const t = useT();
	const box = (0, import_react.useRef)(null);
	const atEnd = (0, import_react.useRef)(true);
	const [edges, setEdges] = (0, import_react.useState)({
		top: false,
		bottom: false
	});
	const [openSteps, setOpenSteps] = (0, import_react.useState)(0);
	const onOpenChange = (0, import_react.useCallback)((open) => setOpenSteps((count) => Math.max(0, count + (open ? 1 : -1))), []);
	const measure = (0, import_react.useCallback)(() => {
		const el = box.current;
		if (!el) return;
		const rest = el.scrollHeight - el.clientHeight - el.scrollTop;
		atEnd.current = rest <= 1;
		const next = {
			top: el.scrollTop > 1,
			bottom: rest > 1
		};
		setEdges((prev) => prev.top === next.top && prev.bottom === next.bottom ? prev : next);
	}, []);
	(0, import_react.useLayoutEffect)(() => {
		const el = box.current;
		if (el && follow && atEnd.current) el.scrollTop = el.scrollHeight;
		measure();
	}, [
		items.length,
		follow,
		measure
	]);
	(0, import_react.useEffect)(() => {
		const el = box.current;
		if (!el || typeof ResizeObserver === "undefined") return;
		const observer = new ResizeObserver(measure);
		observer.observe(el);
		if (el.firstElementChild) observer.observe(el.firstElementChild);
		return () => observer.disconnect();
	}, [measure]);
	const mask = edges.top || edges.bottom ? `linear-gradient(to bottom, ${edges.top ? "transparent" : "black"} 0, black ${FADE}, black calc(100% - ${FADE}), ${edges.bottom ? "transparent" : "black"} 100%)` : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: box,
		role: "region",
		"aria-label": t("thread_turn.steps"),
		tabIndex: -1,
		onScroll: measure,
		className: "overflow-y-auto overflow-x-hidden rounded-md scrollbar-jarvis",
		style: {
			maxHeight: openSteps > 0 ? void 0 : "min(18rem, 50dvh)",
			maskImage: mask,
			WebkitMaskImage: mask
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-w-0 flex-col",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepRow, {
				item,
				running,
				grouped: true,
				onOpenChange
			}, item.id))
		})
	});
}
function hasBrand(call) {
	return Boolean(call.brand) && (call.kind === "command" || call.kind === "service");
}
function GroupMark({ group }) {
	if (group.sole === "thought") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { strokeWidth: 1.75 });
	const calls = group.items.flatMap((item) => item.kind === "call" ? [item.call] : []);
	if (calls.some(hasBrand)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StretchMark, { calls });
	if (group.sole) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CallMark, { call: calls[0] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hammer, { strokeWidth: 1.75 });
}
function WorkGroupView({ group, running }) {
	const t = useT();
	const [open, setOpen] = (0, import_react.useState)(group.live);
	if (group.items.length === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepRow, {
		item: group.items[0],
		running
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkRow, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupMark, { group }),
		label: group.summary,
		ariaLabel: group.live ? fill(t("thread_turn.steps_so_far"), {
			summary: group.summary,
			count: group.items.length
		}) : void 0,
		trailing: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiffStat, {
			added: group.added,
			removed: group.removed
		}),
		stamp: group.startedMs,
		live: group.live,
		expanded: open,
		onToggle: () => setOpen((value) => !value),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepList, {
			items: group.items,
			running,
			follow: group.live
		})
	});
}
function Elapsed({ since }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const tick = () => {
			if (ref.current) ref.current.textContent = traceDuration(Math.max(0, Date.now() - since));
		};
		tick();
		const timer = window.setInterval(tick, 1e3);
		return () => window.clearInterval(timer);
	}, [since]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref,
		className: "tabular-nums",
		children: traceDuration(Math.max(0, Date.now() - since))
	});
}
function CopyButton({ text: text$1, label }) {
	const [done, setDone] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		title: label,
		onClick: () => {
			robustCopy(text$1).then(() => {
				setDone(true);
				window.setTimeout(() => setDone(false), 1200);
			});
		},
		className: "rounded p-1 text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
		children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" })
	});
}
function clock(ms) {
	return new Date(ms).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function UserBubble({ item }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group flex flex-col items-end gap-1",
		"data-testid": "thread-user-message",
		children: [
			item.author && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 pr-1 text-xs text-muted-foreground",
				"data-testid": "thread-message-author",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, {
					"aria-hidden": true,
					className: "h-3.5 w-3.5 shrink-0"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: t("society.chat.coding_thread_author").replace("{0}", item.author.name)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-[80%] rounded-2xl bg-secondary px-4 py-2.5 text-foreground",
				children: [item.attachments.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 flex flex-wrap justify-end gap-2",
					children: item.attachments.map((file) => file.url && file.kind === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: file.url,
						alt: file.name,
						className: "h-24 max-w-[200px] rounded-lg border border-border object-cover"
					}, file.name) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex max-w-[240px] items-center gap-1.5 rounded-md border border-border bg-background/60 px-2 py-1 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
							"aria-hidden": true,
							className: "h-3.5 w-3.5 shrink-0"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: file.name
						})]
					}, file.name))
				}), item.text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "whitespace-pre-wrap text-base leading-6 [overflow-wrap:anywhere]",
					children: item.text
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1 pr-1 text-xs text-muted-foreground opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums",
					children: clock(item.tsMs)
				}), item.text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, {
					text: item.text,
					label: "Copy message"
				})]
			})
		]
	});
}
function changedFiles(turn) {
	const byPath = /* @__PURE__ */ new Map();
	for (const block of turn.blocks) {
		if (block.kind !== "tool" || block.isError || block.output === null) continue;
		for (const file of toolDiff(block.name, block.input, block.output) ?? []) {
			if (!file.path) continue;
			const row = byPath.get(file.path) ?? {
				path: file.path,
				added: 0,
				removed: 0,
				files: []
			};
			row.added += file.added;
			row.removed += file.removed;
			row.files.push(file);
			byPath.set(file.path, row);
		}
	}
	return [...byPath.values()];
}
var ThreadFolder = (0, import_react.createContext)("");
function slashes(path) {
	return path.replace(/\\/g, "/");
}
function projectPath(path, root) {
	const clean = slashes(path);
	const base = slashes(root).replace(/\/+$/, "");
	if (base && clean.toLowerCase().startsWith(`${base.toLowerCase()}/`)) return clean.slice(base.length + 1);
	const absolute = clean.startsWith("/") || /^[A-Za-z]:\//.test(clean);
	const parts = clean.split("/").filter(Boolean);
	return absolute && parts.length > 3 ? `…/${parts.slice(-3).join("/")}` : clean;
}
function splitPath(path) {
	const clean = slashes(path);
	const cut = clean.lastIndexOf("/");
	return cut < 0 ? {
		folder: "",
		name: clean
	} : {
		folder: clean.slice(0, cut + 1),
		name: clean.slice(cut + 1)
	};
}
function ChangeCount({ added, removed, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("shrink-0 tabular-nums", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-success",
				children: ["+", added]
			}),
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-destructive",
				children: ["-", removed]
			})
		]
	});
}
function ChangedFiles({ turn }) {
	const t = useT();
	const lang = t("trace_report.locale");
	const root = (0, import_react.useContext)(ThreadFolder);
	const rows = (0, import_react.useMemo)(() => changedFiles(turn), [turn]);
	const [openPaths, setOpenPaths] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	if (rows.length === 0) return null;
	const added = rows.reduce((sum, row) => sum + row.added, 0);
	const removed = rows.reduce((sum, row) => sum + row.removed, 0);
	const hidden = Math.max(0, rows.length - 3);
	const shown = expanded ? rows : rows.slice(0, 3);
	const allOpen = rows.every((row) => openPaths.has(row.path));
	const togglePath = (path) => setOpenPaths((prev) => {
		const next = new Set(prev);
		if (next.has(path)) next.delete(path);
		else next.add(path);
		return next;
	});
	const toggleAll = () => {
		if (allOpen) {
			setOpenPaths(/* @__PURE__ */ new Set());
			return;
		}
		setOpenPaths(new Set(rows.map((row) => row.path)));
		setExpanded(true);
	};
	const title = fill(t(`thread_turn.files_changed_${plural(lang, rows.length)}`), { count: rows.length });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-label": t("thread_turn.changed_files"),
		"data-testid": "thread-changed-files",
		className: "mt-3 overflow-hidden rounded-xl border border-border bg-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 border-b border-border px-3 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-5 w-5 items-center justify-center rounded-[5px] border-[1.5px] border-current",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Diff, {
								className: "h-3 w-3",
								strokeWidth: 2.25
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-sm font-semibold text-foreground-strong",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChangeCount, {
							added,
							removed,
							className: "text-sm"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": allOpen,
						onClick: toggleAll,
						className: "shrink-0 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
						children: t(allOpen ? "thread_turn.hide_changes" : "thread_turn.show_changes")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: shown.map((row) => {
				const { folder, name } = splitPath(projectPath(row.path, root));
				const open = openPaths.has(row.path);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-expanded": open,
					onClick: () => togglePath(row.path),
					title: row.path,
					className: "flex w-full items-center gap-3 px-3 py-1.5 text-left text-sm hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex min-w-0 flex-1",
						children: [folder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							dir: "rtl",
							className: "min-w-0 shrink-[999] truncate text-left text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("bdi", {
								dir: "ltr",
								children: folder
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 max-w-full shrink-0 truncate text-foreground",
							children: name
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChangeCount, {
						added: row.added,
						removed: row.removed
					})]
				}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-3 pb-2 pt-0.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiffView, { files: row.files.map((file) => ({
						...file,
						path: ""
					})) })
				})] }, row.path);
			}) }),
			hidden > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"aria-expanded": expanded,
				onClick: () => setExpanded(!expanded),
				className: "flex w-full items-center gap-1.5 px-3 py-2 text-left text-sm text-foreground-secondary hover:bg-secondary/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
				children: [expanded ? t("thread_turn.collapse_files") : fill(t(`thread_turn.more_files_${plural(lang, hidden)}`), { count: hidden }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					"aria-hidden": true,
					className: cn("h-4 w-4 transition-transform duration-200", expanded && "rotate-180")
				})]
			})
		]
	});
}
function answerText(turn) {
	return turn.blocks.filter((block) => block.kind === "text").map((block) => block.text.trim()).filter(Boolean).join("\n\n");
}
function waitsForPerson(block) {
	return waitsOnCard(block) || Boolean(block.approval && block.approval.decision === null);
}
function pendingLabel(block, t) {
	if (block.question && !block.question.closed) return {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircleQuestion, { className: "h-3.5 w-3.5" }),
		text: t("thread_turn.waiting_answer")
	};
	if (block.approval && block.approval.decision === null) return {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-3.5 w-3.5" }),
		text: fill(t("thread_turn.waiting_approval"), { summary: block.approval.summary || block.name })
	};
	return null;
}
function ApprovalPrompt({ block, onDecide }) {
	const t = useT();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const approval = block.approval;
	if (!approval) return null;
	const decide = async (decision) => {
		if (!onDecide || busy) return;
		setBusy(true);
		setError(null);
		try {
			await onDecide(approval.approvalId, decision);
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		role: "group",
		"aria-label": t("work_trace.approval"),
		"data-testid": "thread-approval",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkRow, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { strokeWidth: 1.75 }),
			label: t("thread_turn.approval_waiting"),
			live: true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-1.5 ml-7 space-y-2 text-sm",
			children: [
				approval.summary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "m-0 text-foreground [overflow-wrap:anywhere]",
					children: approval.summary
				}),
				onDecide ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						"allow",
						"allow_always",
						"deny"
					].map((decision) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: busy,
						onClick: () => void decide(decision),
						className: cn("rounded-md px-3 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50", decision === "allow" ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border text-foreground hover:bg-secondary"),
						children: t(`work_trace.${decision}`)
					}, decision))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "m-0 text-xs text-muted-foreground",
					children: t("work_trace.approval_elsewhere")
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					className: "m-0 text-xs text-destructive",
					children: error
				})
			]
		})]
	});
}
function foldFinished(rows) {
	let last = -1;
	rows.forEach((row, index) => {
		if (row.kind === "work" || row.kind === "thought") last = index;
	});
	return {
		work: rows.slice(0, last + 1),
		answer: rows.slice(last + 1)
	};
}
function WorkingFor({ since }) {
	const [before, after = ""] = useT()("thread_turn.working_for").split("{duration}");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		before,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Elapsed, { since }),
		after
	] });
}
const ThreadTurn = (0, import_react.memo)(function ThreadTurn$1({ turn, prompts = "composer", onDecide, extras, receipt }) {
	const t = useT();
	const lang = t("trace_report.locale");
	const running = turn.status === "running";
	const inline = prompts === "inline";
	const pictures = (0, import_react.useMemo)(() => callPictures(turn.blocks), [turn.blocks]);
	const credentials = turn.blocks.filter((block) => block.kind === "tool" && Boolean(block.credential));
	const rows = (0, import_react.useMemo)(() => buildThreadRows(turn.blocks, {
		t,
		lang,
		status: turn.status
	}).filter((row) => !(row.kind === "text" && pictures.moved.has(row.block.id)) && !(row.kind === "pending" && row.block.credential)), [
		turn.blocks,
		t,
		lang,
		turn.status,
		pictures
	]);
	const answer = answerText(turn);
	const [workOpen, setWorkOpen] = (0, import_react.useState)(false);
	const { work, answer: tail } = (0, import_react.useMemo)(() => running ? {
		work: rows,
		answer: []
	} : foldFinished(rows), [rows, running]);
	const agents = (0, import_react.useMemo)(() => work.filter((row) => row.kind === "agent"), [work]);
	const waiting = (0, import_react.useMemo)(() => work.filter((row) => row.kind === "pending" && waitsForPerson(row.block)), [work]);
	const agentsWorking = (0, import_react.useMemo)(() => running ? listSubagents([turn]).filter((entry) => entry.status === "running").length : 0, [turn, running]);
	const extraRows = extras ?? [];
	const folded = !running && (work.length > 0 || extraRows.length > 0);
	const duration = turn.durationMs != null ? traceDuration(turn.durationMs) : "";
	const timed = (key) => duration ? fill(t(`thread_turn.${key}_after`), { duration }) : t(`thread_turn.${key}`);
	const workedFor = duration ? fill(t("thread_turn.worked_for"), { duration }) : "";
	const foldLabel = turn.status === "cancelled" ? timed("stopped") : turn.status === "error" ? timed("failed") : workedFor || t("thread_turn.worked");
	const closing = turn.status === "cancelled" ? timed("stopped") : turn.status === "error" ? timed("failed") : answer ? workedFor : timed("no_answer");
	const renderRow = (row) => {
		if (row.kind === "work") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkGroupView, {
			group: row,
			running
		}, row.id);
		if (row.kind === "thought") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThoughtView, { text: row.text }, row.id);
		if (row.kind === "text") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn(PROSE, THREAD_MEDIA),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatMarkdown, { text: row.text })
		}, row.id);
		if (row.kind === "agent") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubagentCard, {
			block: row.block,
			turn
		}, row.id);
		if (row.block.credential) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CredentialCard, { credential: row.block.credential }, row.id);
		if (inline) {
			if (row.block.question) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionCard, { question: row.block.question }, row.id);
			if (row.block.approval && row.block.approval.decision === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApprovalPrompt, {
				block: row.block,
				onDecide
			}, row.id);
			return null;
		}
		const pending = pendingLabel(row.block, t);
		return pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkRow, {
			icon: pending.icon,
			label: pending.text,
			live: true
		}, row.id) : null;
	};
	const extraNodes = extraRows.map((extra) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-w-0",
		children: extra.node
	}, `extra:${extra.key}`));
	const shown = folded ? tail : rows;
	let extraAt = shown.length;
	if (!folded) while (extraAt > 0 && shown[extraAt - 1].kind === "text") extraAt--;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CallMedia.Provider, {
		value: pictures.byCall,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 space-y-1.5",
			"data-testid": "thread-turn",
			"data-status": turn.status,
			children: [
				folded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-expanded": workOpen,
						onClick: () => setWorkOpen((value) => !value),
						"data-testid": "thread-worked-for",
						className: "flex h-7 items-center gap-1 rounded-md px-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: foldLabel
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
							"aria-hidden": true,
							className: cn("h-3.5 w-3.5 transition-transform duration-150", workOpen && "rotate-90")
						})]
					}),
					workOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 pb-2 pt-1",
						"data-testid": "thread-worked-steps",
						children: [work.filter((row) => row.kind !== "agent" && !waiting.includes(row)).map(renderRow), extraNodes]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "mt-1 border-b border-border/70"
					})
				] }),
				folded && agents.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-1.5 pt-1",
					"data-testid": "thread-turn-subagents",
					children: agents.map(renderRow)
				}),
				folded && waiting.map(renderRow),
				credentials.map((block) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CredentialCard, { credential: block.credential }, block.credential.requestId)),
				shown.slice(0, extraAt).map(renderRow),
				!folded && extraNodes,
				shown.slice(extraAt).map(renderRow),
				running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-6 min-w-0 items-center px-1 text-sm leading-relaxed text-muted-foreground",
					"data-testid": "thread-working",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "whitespace-nowrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkingFor, { since: turn.startedMs }), agentsWorking > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", fill(t(`thread_turn.subagents_working_${plural(lang, agentsWorking)}`), { count: agentsWorking })] })]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					turn.status === "error" && turn.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive",
						children: turn.error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChangedFiles, { turn }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 pt-1 text-xs text-muted-foreground",
						"data-testid": "thread-turn-closing",
						children: [
							!folded && closing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: closing }),
							folded && !answer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("thread_turn.no_answer") }),
							receipt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 tabular-nums",
								children: [(!folded && closing || folded && !answer) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									className: "text-muted-foreground/50",
									children: "·"
								}), receipt]
							}),
							answer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, {
								text: answer,
								label: t("thread_turn.copy_answer")
							})
						]
					})
				] })
			]
		})
	});
});
function ErrorLine({ text: text$1 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "alert",
		className: "rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive",
		children: text$1
	});
}
function ItemView({ item }) {
	if (item.type === "user") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserBubble, { item });
	if (item.type === "turn") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThreadTurn, { turn: item });
	if (item.type === "error") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorLine, { text: item.text });
	if (item.type === "notice") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-center text-xs text-muted-foreground",
		children: [item.agentName ? `${item.agentName}: ` : "", item.text]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border px-3 py-2 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-1 text-xs text-muted-foreground",
			children: ["Message from ", item.message.sender_name]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: PROSE,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatMarkdown, { text: item.message.text })
		})]
	});
}
function ThreadTimeline({ items, sessionId, bottomInset, folder = "", lead }) {
	const scroller = (0, import_react.useRef)(null);
	const pinned = (0, import_react.useRef)(true);
	const [away, setAway] = (0, import_react.useState)(false);
	(0, import_react.useLayoutEffect)(() => {
		pinned.current = true;
		setAway(false);
		const box = scroller.current;
		if (box) box.scrollTop = box.scrollHeight;
	}, [sessionId]);
	(0, import_react.useLayoutEffect)(() => {
		const box = scroller.current;
		if (box && pinned.current) box.scrollTop = box.scrollHeight;
	});
	(0, import_react.useEffect)(() => {
		const box = scroller.current;
		if (!box || typeof ResizeObserver === "undefined") return;
		const observer = new ResizeObserver(() => {
			if (pinned.current) box.scrollTop = box.scrollHeight;
		});
		const content = box.firstElementChild;
		if (content) observer.observe(content);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThreadFolder.Provider, {
		value: folder,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative min-h-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: scroller,
				"data-testid": "thread-timeline",
				onScroll: (event) => {
					const box = event.currentTarget;
					const atBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 48;
					pinned.current = atBottom;
					setAway(!atBottom);
				},
				className: "h-full overflow-y-auto scrollbar-jarvis",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-full max-w-3xl flex-col gap-5 px-5 pt-6",
					style: { paddingBottom: bottomInset + 24 },
					children: [lead, items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemView, { item }, item.id))]
				})
			}), away && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Scroll to the newest message",
				onClick: () => {
					const box = scroller.current;
					if (box) box.scrollTo({
						top: box.scrollHeight,
						behavior: "smooth"
					});
				},
				style: { bottom: bottomInset + 12 },
				className: "absolute left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-popover text-muted-foreground shadow-float hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "h-4 w-4" })
			})]
		})
	});
}
export { OpenSubagent as a, SubagentSwitcher as c, listSubagents as d, mergeDiscovered as f, ThreadTimeline as i, fetchDiscoveredAgents as l, subagentTurn as m, PROSE as n, SubagentCard as o, subagentPath as p, THREAD_MEDIA as r, SubagentHeader as s, ApprovalPrompt as t, isSubagentCall as u };
