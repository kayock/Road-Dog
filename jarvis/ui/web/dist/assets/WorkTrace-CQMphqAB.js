const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MemoryFileViewer-Dd-5bzzI.js","assets/index-BOzhgzD7.js","assets/index-CA6QM4ps.css","assets/tabs-CBD7-HHM.js","assets/lib-BoWxqGgd.js","assets/lib-B_8abcSJ.js","assets/file-text-D8DI7Rfv.js","assets/toolDiff-CkONUaSH.js","assets/circle-alert-BujlF6G8.js","assets/maximize-2-BK4_PjjK.js","assets/visualFence-DOGBhazZ.js","assets/MemoryDocument-KfnL_NN5.js"])))=>i.map(i=>d[i]);
import { A as MessageCircleQuestion, C as QuestionCard, _ as traceToolIdentity, a as useTimeline, f as ToolChoiceIcon, g as activityParts, i as timelineItems, u as traceDuration, v as traceToolName, w as CredentialCard, x as toolIdentityStyle } from "./TraceTimeline-hpw2Rng1.js";
import { t as Check } from "./check-vbwKkbPq.js";
import { t as ChevronRight } from "./chevron-right-BjVJ-R2c.js";
import { t as CircleAlert } from "./circle-alert-BujlF6G8.js";
import { n as CircleDashed, t as FolderSearch } from "./folder-search-Bp6QmvPC.js";
import { t as FileText } from "./file-text-D8DI7Rfv.js";
import { t as Terminal } from "./terminal-CG2JP6MB.js";
import { Bc as require_jsx_runtime, Jo as isCredentialTool, Jt as PetMark, Ln as cn, Qo as waitsOnCard, Xc as require_react, Yi as Brain, Yo as isQuestionTool, cc as __vitePreload, na as createLucideIcon, oc as useT, qo as hasPersonCard, tl as __toESM, zi as FilePenLine } from "./index-BOzhgzD7.js";
import { n as Markdown, t as remarkGfm } from "./lib-BoWxqGgd.js";
import { t as PetStageContext } from "./petStage-CMRGLgJ7.js";
import { n as toolDiff, r as ChatMarkdown } from "./toolDiff-CkONUaSH.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ShieldQuestion = createLucideIcon("ShieldQuestion", [
	["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}],
	["path", {
		d: "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3",
		key: "mhlwft"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]);
function formatTokens(n) {
	if (!Number.isFinite(n) || n < 0) return "0";
	if (n < 1e3) return String(Math.round(n));
	if (n < 1e6) return `${trimZero((n / 1e3).toFixed(1))}k`;
	return `${trimZero((n / 1e6).toFixed(1))}M`;
}
function trimZero(s) {
	return s.endsWith(".0") ? s.slice(0, -2) : s;
}
function outputTokens(usage) {
	if (!usage) return null;
	const v = usage.output_tokens ?? usage.output ?? usage.completion_tokens;
	return typeof v === "number" && Number.isFinite(v) ? v : null;
}
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var TraceLookContext = (0, import_react.createContext)("rail");
var useRail = () => (0, import_react.useContext)(TraceLookContext) === "rail";
function useClock(start, live) {
	const [now, setNow] = (0, import_react.useState)(Date.now);
	(0, import_react.useEffect)(() => {
		if (!live) return;
		setNow(Date.now());
		const timer = window.setInterval(() => setNow(Date.now()), 1e3);
		return () => window.clearInterval(timer);
	}, [start, live]);
	return Math.max(0, now - start);
}
function operation(name) {
	const key = name.toLowerCase().replace(/[-_]/g, "");
	if (/^(read|readfile|viewfile|cat|openfile|readmediafile)$/.test(key)) return "read";
	if (/^(ls|listdir|listdirectory|listfiles|glob)$/.test(key)) return "list";
	if (/^(grep|rg|search|searchfiles|grepsearch|codesearch|findbyname)$/.test(key)) return "search";
	return null;
}
function attention(block) {
	return block.isError || Boolean(block.approval) || hasPersonCard(block);
}
function isOpenQuestion(block) {
	return block.kind === "tool" && waitsOnCard(block);
}
function groupTrace(blocks) {
	const groups = [];
	for (const block of blocks) {
		const family = block.kind === "tool" && !attention(block) && block.output !== null ? operation(block.name) : null;
		const previous = groups[groups.length - 1];
		if (family && previous?.family === family) previous.blocks.push(block);
		else groups.push({
			id: block.kind === "tool" ? block.callId : block.id,
			blocks: [block],
			family
		});
	}
	return groups;
}
function groupConversationTrace(blocks) {
	const groups = [];
	for (const block of blocks) {
		const family = block.kind === "reasoning" || block.kind === "tool" && !attention(block) && block.output !== null ? "activity" : null;
		const previous = groups.at(-1);
		if (family && previous?.family === family) previous.blocks.push(block);
		else groups.push({
			id: block.kind === "tool" ? block.callId : block.id,
			blocks: [block],
			family
		});
	}
	return groups;
}
function splitConversationTurn(blocks) {
	let lastText = -1;
	for (let i = blocks.length - 1; i >= 0; i--) {
		const block = blocks[i];
		if (block.kind === "text" && block.text.trim()) {
			lastText = i;
			break;
		}
	}
	if (lastText < 0) return {
		work: blocks,
		answer: [],
		after: []
	};
	let firstText = lastText;
	while (firstText > 0 && blocks[firstText - 1].kind === "text") firstText--;
	return {
		work: blocks.slice(0, firstText),
		answer: blocks.slice(firstText, lastText + 1),
		after: blocks.slice(lastText + 1)
	};
}
function isPendingApproval(block) {
	return block.kind === "tool" && Boolean(block.approval && block.approval.decision === null) || isOpenQuestion(block);
}
function needsAttention(block) {
	return block.kind === "tool" && (block.isError || isPendingApproval(block));
}
function hasFoldableWork(blocks) {
	return blocks.some((block) => {
		if (needsAttention(block)) return false;
		return block.kind !== "text" || Boolean(block.text.trim());
	});
}
function groupActivityTrace(blocks) {
	const groups = [];
	let pending = [];
	const flush = () => {
		if (!pending.length) return;
		const reads = groupTrace(pending);
		groups.push(...reads.length === 1 || pending.length === 1 ? reads : [{
			id: pending[0].callId,
			blocks: pending,
			family: "activity"
		}]);
		pending = [];
	};
	for (const block of blocks) if (block.kind === "tool" && !attention(block) && block.output !== null) pending.push(block);
	else {
		flush();
		groups.push({
			id: block.kind === "tool" ? block.callId : block.id,
			blocks: [block],
			family: null
		});
	}
	flush();
	return groups;
}
function pretty(value) {
	if (typeof value === "string") return value;
	return JSON.stringify(value, null, 2) ?? "";
}
var rowButton = "group/trace flex w-full min-w-0 items-start gap-2.5 rounded-md py-2 text-left text-[13px] leading-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:text-foreground";
var railRowButton = "group/trace flex w-full min-w-0 items-start gap-3 rounded-md py-1 text-left text-sm leading-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:text-foreground disabled:cursor-default";
var iconClass = "mt-0.5 h-4 w-4 shrink-0";
var nodeIcon = "h-3.5 w-3.5 shrink-0";
function Rail({ items }) {
	const out = [];
	let run = [];
	const flush = () => {
		if (!run.length) return;
		out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "trace-rail",
			children: run.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "trace-step",
				children: item.node
			}, item.key))
		}, `rail:${run[0].key}`));
		run = [];
	};
	for (const item of items) if (item.rail) run.push(item);
	else {
		flush();
		out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: item.node }, item.key));
	}
	flush();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: out });
}
function Node({ children, live = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": true,
		className: cn("trace-node", live && "trace-node-live"),
		children
	});
}
function livePetState(blocks) {
	const last = blocks[blocks.length - 1];
	return last?.kind === "text" && last.text.trim() ? "talking" : "working";
}
function Live({ on, children }) {
	return on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "trace-shimmer",
		children
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var FoldExpandContext = (0, import_react.createContext)(0);
function Disclosure({ label, children, forced = false, initiallyOpen = false, icon, trailing, tone, summary, resetKey = "", live = false }) {
	const id = (0, import_react.useId)();
	const rail = useRail();
	const foldSeq = (0, import_react.useContext)(FoldExpandContext);
	const phase = `${initiallyOpen}:${resetKey}:${foldSeq}`;
	const [choice, setChoice] = (0, import_react.useState)(null);
	const open = forced || (choice?.phase === phase ? choice.open : foldSeq > 0 || initiallyOpen);
	if (rail) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("min-w-0 text-muted-foreground", tone),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: railRowButton,
				"aria-expanded": children ? open : void 0,
				"aria-controls": children ? id : void 0,
				disabled: !children || forced,
				onClick: () => setChoice({
					phase,
					open: !open
				}),
				children: [
					icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Node, {
						live,
						children: icon
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-0 flex-1 [overflow-wrap:anywhere]",
						children: label
					}),
					trailing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 text-xs leading-6 tabular-nums text-muted-foreground",
						children: trailing
					}) : null,
					children && !forced ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
						"aria-hidden": true,
						className: cn("mt-[5px] h-3.5 w-3.5 shrink-0 opacity-40 transition group-hover/trace:opacity-90", open && "rotate-90")
					}) : null
				]
			}),
			summary,
			children && open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id,
				className: cn("min-w-0 pb-1.5", icon ? "pl-7" : "pl-0"),
				children
			}) : null
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("min-w-0 text-muted-foreground", tone),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: rowButton,
				"aria-expanded": children ? open : void 0,
				"aria-controls": children ? id : void 0,
				disabled: !children || forced,
				onClick: () => setChoice({
					phase,
					open: !open
				}),
				children: [
					icon,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-0 flex-1 [overflow-wrap:anywhere]",
						children: label
					}),
					trailing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 text-xs tabular-nums",
						children: trailing
					}) : null,
					children ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
						"aria-hidden": true,
						className: cn(iconClass, "mt-1 h-3.5 w-3.5 opacity-50 transition-transform group-hover/trace:opacity-100", open && "rotate-90")
					}) : null
				]
			}),
			summary,
			children && open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id,
				className: "mb-2 ml-[7px] min-w-0 border-l border-border/70 pb-1 pl-5",
				children
			}) : null
		]
	});
}
function ReasoningBody({ text, live }) {
	const ref = (0, import_react.useRef)(null);
	const rail = useRail();
	const [clipped, setClipped] = (0, import_react.useState)(false);
	(0, import_react.useLayoutEffect)(() => {
		const el = ref.current;
		if (!el || !live) return;
		el.scrollTop = el.scrollHeight;
		if (rail) setClipped(el.scrollHeight > el.clientHeight + 1);
	}, [
		text,
		live,
		rail
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		"data-testid": "reasoning-body",
		className: rail ? cn("prose prose-sm max-h-60 max-w-none overflow-auto pb-1 text-sm leading-6 text-foreground-secondary dark:prose-invert [overflow-wrap:anywhere] prose-p:my-1 prose-p:text-foreground-secondary prose-li:text-foreground-secondary prose-strong:text-foreground prose-pre:overflow-auto", live && clipped && "trace-scratch-live") : "prose prose-sm max-h-64 max-w-none overflow-auto text-xs leading-6 text-muted-foreground dark:prose-invert [overflow-wrap:anywhere] prose-p:my-1 prose-pre:overflow-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, {
			remarkPlugins: [remarkGfm],
			children: text
		})
	});
}
function ReasoningTrace({ block, turnLive, compact = false }) {
	const t = useT();
	const rail = useRail();
	const live = turnLive && block.live;
	const elapsed = useClock(block.startedMs, live);
	const text = block.text.trim();
	const duration = live ? elapsed : block.durationMs;
	const label = duration === null ? t("work_trace.thought") : t(live ? "work_trace.thinking_for" : "work_trace.thought_for").replace("{duration}", traceDuration(duration));
	const gist = text.replace(/```[\s\S]*?```/g, " ").replace(/[`*_#>~]/g, "").replace(/\s+/g, " ").trim();
	const showGist = !compact && !turnLive && gist;
	if (rail) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclosure, {
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Live, {
			on: live,
			children: label
		}),
		live,
		forced: live,
		initiallyOpen: compact ? live : turnLive,
		resetKey: compact ? String(turnLive) : "",
		summary: showGist ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-1.5 line-clamp-2 text-sm leading-6 text-muted-foreground",
			children: gist.slice(0, 280)
		}) : void 0,
		children: text ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReasoningBody, {
			text,
			live
		}) : void 0
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclosure, {
		label,
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, {
			"aria-hidden": true,
			className: cn(iconClass, live && "motion-safe:animate-pulse")
		}),
		forced: live,
		initiallyOpen: compact ? live : turnLive,
		resetKey: compact ? String(turnLive) : "",
		summary: showGist ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 ml-6 line-clamp-2 text-xs leading-5",
			children: gist.slice(0, 240)
		}) : void 0,
		children: text ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReasoningBody, {
			text,
			live
		}) : void 0
	});
}
function ToolDetails({ block }) {
	const t = useT();
	const rail = useRail();
	const diff = (0, import_react.useMemo)(() => toolDiff(block.name, block.input, block.output), [
		block.name,
		block.input,
		block.output
	]);
	const memoryFile = (0, import_react.useMemo)(() => memoryFileFromBlock(block), [block]);
	const [memoryOpen, setMemoryOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("text-xs", rail ? "space-y-2.5 pb-1 pt-0.5" : "space-y-3 py-1"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
				label: t("work_trace.tool"),
				text: block.name
			}),
			block.input !== void 0 && block.input !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
				label: t("work_trace.input"),
				text: pretty(block.input)
			}) : null,
			diff ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-label": t("work_trace.diff"),
				className: cn("max-h-72 overflow-auto font-mono text-xs", rail && "rounded-md bg-muted/60 px-3 py-2"),
				children: diff.map((file, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 last:mb-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex items-center gap-2 [overflow-wrap:anywhere]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "min-w-0 flex-1",
								children: file.path
							}), memoryFile && file.path === memoryFile.path ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMemoryOpen(true),
								className: "shrink-0 rounded-md border border-border px-2 py-0.5 text-[11px] text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								children: t("society.chat.memory_open_file")
							}) : null]
						}),
						file.lines.map((line, n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("whitespace-pre-wrap [overflow-wrap:anywhere]", line.kind === "add" && "diff-line-add", line.kind === "del" && "diff-line-del"),
							children: [line.kind === "add" ? "+ " : line.kind === "del" ? "− " : "  ", line.text]
						}, n)),
						file.truncated > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("work_trace.truncated").replace("{count}", String(file.truncated)) }) : null
					]
				}, i))
			}) : null,
			memoryFile && !diff ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setMemoryOpen(true),
				className: "rounded-md border border-border px-2 py-1 text-[11px] text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				children: [
					t("society.chat.memory_open_file"),
					": ",
					memoryFile.path
				]
			}) : null,
			block.output !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
				label: t(block.isError ? "work_trace.error" : "work_trace.output"),
				text: block.output || t("work_trace.empty_output")
			}) : null,
			memoryOpen && memoryFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryFileDialog, {
				path: memoryFile.path,
				before: memoryFile.before,
				after: memoryFile.after,
				onClose: () => setMemoryOpen(false)
			}) : null
		]
	});
}
function memoryFileFromBlock(block) {
	const key = traceToolName(block.name).toLowerCase().replace(/[-_]/g, "");
	if (!/^(societywikinote|societymemoryrecall|remember|societymemory)$/.test(key)) return null;
	const out = parseToolOutput(block.output);
	const inputPath = typeof block.input === "object" && block.input !== null ? String(block.input.path ?? "") : "";
	const path = out?.path || inputPath;
	if (!path || !path.startsWith("society/")) return null;
	return {
		path,
		before: out?.before,
		after: out?.after
	};
}
function parseToolOutput(output) {
	if (!output || !output.trim().startsWith("{")) return null;
	try {
		const parsed = JSON.parse(output);
		if (!parsed || typeof parsed !== "object") return null;
		const path = typeof parsed.path === "string" ? parsed.path : void 0;
		const before = typeof parsed.before === "string" ? parsed.before : void 0;
		const after = typeof parsed.after === "string" ? parsed.after : void 0;
		if (!path && before === void 0 && after === void 0) return null;
		return {
			path,
			before,
			after
		};
	} catch {
		return null;
	}
}
function MemoryFileDialog({ path, before, after, onClose }) {
	const [Viewer, setViewer] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let alive = true;
		__vitePreload(() => import("./MemoryFileViewer-Dd-5bzzI.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11])).then((mod) => {
			if (alive) setViewer(() => mod.MemoryFileViewer);
		});
		return () => {
			alive = false;
		};
	}, []);
	if (!Viewer) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewer, {
		path,
		before,
		after,
		onClose
	});
}
function Detail({ label, text }) {
	if (useRail()) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-1 text-xs font-medium text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
		tabIndex: 0,
		className: "max-h-64 overflow-auto whitespace-pre-wrap rounded-md bg-muted/60 px-3 py-2 font-mono text-xs leading-5 text-foreground-secondary [overflow-wrap:anywhere] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
		children: text
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-1 font-medium text-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
		tabIndex: 0,
		className: "max-h-64 overflow-auto whitespace-pre-wrap font-mono text-xs leading-5 [overflow-wrap:anywhere] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
		children: text
	})] });
}
const TraceTool = (0, import_react.memo)(function TraceTool$1({ block, status, onDecide }) {
	if (block.question) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionCard, { question: block.question });
	if (block.credential) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CredentialCard, { credential: block.credential });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TraceToolRow, {
		block,
		status,
		onDecide
	});
});
function TraceToolRow({ block, status, onDecide }) {
	const t = useT();
	const rail = useRail();
	const pending = Boolean(block.approval && block.approval.decision === null);
	const denied = block.approval?.decision === "deny";
	const running = status === "running" && block.output === null && !pending && !denied;
	const elapsed = useClock(block.startedMs, running);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const submitting = (0, import_react.useRef)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const view = traceToolIdentity(block);
	const { description, action } = view;
	const readable = description.label.charAt(0).toUpperCase() + description.label.slice(1);
	const label = action ? t(`work_trace.${action}`) : description.labelKey ? t(description.labelKey) : readable;
	const detail = description.detail || (typeof block.input === "object" && block.input !== null ? String(block.input.file_path ?? block.input.path ?? "") : "");
	const state = pending ? "approval" : denied ? "denied" : block.isError ? "failed" : running ? "running" : block.output === null ? "interrupted" : "completed";
	const ActionIcon = action === "command" ? Terminal : action === "edit" || action === "write" || action === "memory" ? FilePenLine : action === "read" ? FileText : action === "search" || action === "list" ? FolderSearch : view.identity.Glyph;
	const Icon = pending ? ShieldQuestion : block.isError ? CircleAlert : ActionIcon;
	const decide = async (decision) => {
		if (!onDecide || !block.approval || submitting.current) return;
		submitting.current = true;
		setBusy(true);
		setError(null);
		try {
			await onDecide(block.approval.approvalId, decision);
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		} finally {
			submitting.current = false;
			setBusy(false);
		}
	};
	const branded = view.identity.logo && !pending && !block.isError;
	const approvalUi = pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("space-y-2 text-sm", rail ? "mb-2 pl-7" : "mb-3 ml-6"),
		role: "group",
		"aria-label": t("work_trace.approval"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("[overflow-wrap:anywhere]", rail && "text-foreground"),
				children: block.approval?.summary
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
					className: cn("rounded-md px-3 py-1.5 text-xs focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50", rail && decision === "allow" ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border text-foreground hover:bg-secondary"),
					children: t(`work_trace.${decision}`)
				}, decision))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: t("work_trace.approval_elsewhere")
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-xs text-destructive",
				children: error
			}) : null
		]
	}) : null;
	if (rail) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-trace-tool": block.callId,
		"data-state": state,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclosure, {
			label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex min-w-0 items-baseline gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("shrink-0", block.isError ? "text-destructive" : pending ? "text-foreground" : "text-foreground-secondary", view.integration && "font-medium"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Live, {
						on: running,
						children: label
					})
				}), detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 truncate font-mono text-xs text-muted-foreground",
					children: [" ", detail]
				}) : null]
			}),
			icon: branded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tool-identity inline-flex",
				style: toolIdentityStyle(view.row),
				"data-trace-brand": view.identity.key,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolChoiceIcon, {
					row: view.row,
					size: 14
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: nodeIcon }),
			live: running,
			trailing: running ? traceDuration(elapsed) : block.durationMs !== null ? traceDuration(block.durationMs) : null,
			tone: block.isError ? "text-destructive" : pending ? "text-foreground" : void 0,
			summary: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [state !== "completed" && state !== "running" && state !== "approval" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mb-1 pl-7 text-xs", block.isError && "text-destructive"),
				children: t(`work_trace.${state}`)
			}) : null, block.isError && block.output ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-1.5 pl-7 line-clamp-4 whitespace-pre-wrap font-mono text-xs leading-5 text-destructive [overflow-wrap:anywhere]",
				children: block.output.slice(0, 500)
			}) : null] }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolDetails, { block })
		}), approvalUi]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-trace-tool": block.callId,
		"data-state": state,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclosure, {
			label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: view.integration ? "font-medium" : void 0,
				children: label
			}), detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "ml-2 text-xs text-muted-foreground",
				children: [" ", detail]
			}) : null] }),
			icon: branded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("tool-identity mt-1 shrink-0", running && "motion-safe:animate-pulse"),
				style: toolIdentityStyle(view.row),
				"data-trace-brand": view.identity.key,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolChoiceIcon, {
					row: view.row,
					size: 16
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				"aria-hidden": true,
				className: cn(iconClass, "mt-1", running && "motion-safe:animate-pulse")
			}),
			trailing: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5",
				children: [running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDashed, {
					"aria-hidden": true,
					className: "h-3 w-3 motion-safe:animate-spin"
				}) : null, running ? traceDuration(elapsed) : block.durationMs !== null ? traceDuration(block.durationMs) : null]
			}),
			tone: block.isError ? "text-destructive" : pending ? "text-foreground" : void 0,
			summary: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [state !== "completed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mb-1 ml-6 text-xs", block.isError && "text-destructive"),
				children: t(`work_trace.${state}`)
			}) : null, block.isError && block.output ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 ml-6 whitespace-pre-wrap text-xs text-destructive [overflow-wrap:anywhere]",
				children: block.output.slice(0, 500)
			}) : null] }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolDetails, { block })
		}), approvalUi]
	});
}
function ActivitySummary({ blocks, live }) {
	const t = useT();
	const rail = useRail();
	const parts = activityParts(blocks.filter((block) => block.kind === "tool"));
	if (!parts.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Live, {
		on: rail && live,
		children: t("work_trace.thought")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex flex-wrap items-center gap-x-1.5 gap-y-1", rail && "text-foreground-secondary"),
		children: parts.map((part, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1.5",
			children: [
				index > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "text-muted-foreground/50",
					children: "·"
				}) : null,
				part.row && index > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tool-identity inline-flex",
					style: toolIdentityStyle(part.row),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolChoiceIcon, {
						row: part.row,
						size: 14
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Live, {
					on: rail && live,
					children: t(`work_trace.${live ? "live_" : ""}${part.key}`).replace("{service}", part.service ?? "")
				})
			]
		}, `${part.key}:${part.service ?? ""}`))
	});
}
function ActivityIcon({ blocks, live }) {
	const rail = useRail();
	const first = activityParts(blocks.filter((block) => block.kind === "tool"))[0];
	if (first?.row) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("tool-identity shrink-0", rail ? "inline-flex" : "mt-1", !rail && live && "motion-safe:animate-pulse"),
		style: toolIdentityStyle(first.row),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolChoiceIcon, {
			row: first.row,
			size: rail ? 14 : 16
		})
	});
	if (rail && !first) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "trace-dot" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(live && !rail ? CircleDashed : first?.key === "activity_command" ? Terminal : first?.key === "activity_edit" || first?.key === "activity_write" || first?.key === "activity_memory" ? FilePenLine : first ? FileText : Brain, {
		"aria-hidden": true,
		className: rail ? nodeIcon : cn(iconClass, "mt-1", live && "motion-safe:animate-spin")
	});
}
function ConversationWorkFold({ durationMs, attention: attention$1, children, expandInner = true, failureCount = 0 }) {
	const t = useT();
	const id = (0, import_react.useId)();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [seq, setSeq] = (0, import_react.useState)(0);
	const label = durationMs !== null && durationMs > 0 ? t("work_trace.thought_for").replace("{duration}", traceDuration(durationMs)) : t("work_trace.thought");
	const toggle = () => {
		if (!open) setSeq((s) => s + 1);
		setOpen(!open);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		"data-testid": "conversation-work-fold",
		"data-open": open ? "true" : "false",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			"aria-expanded": open,
			"aria-controls": id,
			className: "group/fold mb-1 inline-flex max-w-full items-center gap-1 rounded-md px-1.5 py-1 text-left text-xs leading-5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
			onClick: toggle,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					"aria-hidden": true,
					className: cn("h-3 w-3 shrink-0 opacity-70 transition-transform group-hover/fold:opacity-100", open && "rotate-90")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: label
				}),
				failureCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-destructive",
					children: t(`trace_report.failed_count_${failureCount === 1 ? "one" : "other"}`).replace("{count}", String(failureCount))
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			id,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoldExpandContext.Provider, {
				value: expandInner ? seq : 0,
				children
			})
		}) : attention$1]
	});
}
function traceGroupItems({ groups, live, status, onDecide, renderText, conversation, rail, t }) {
	const items = [];
	for (const group of groups) {
		const first = group.blocks[0];
		if (group.family === "activity" && group.blocks.length > 1) {
			const inner = group.blocks.map((block) => block.kind === "tool" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TraceTool, {
				block,
				status,
				onDecide
			}, block.callId) : block.kind === "reasoning" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReasoningTrace, {
				block,
				turnLive: live,
				compact: true
			}, block.id) : null);
			const disclosure = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclosure, {
				label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivitySummary, {
					blocks: group.blocks,
					live
				}),
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityIcon, {
					blocks: group.blocks,
					live
				}),
				initiallyOpen: live,
				forced: live,
				live,
				children: rail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, { items: group.blocks.map((block, i) => ({
					key: block.kind === "tool" ? block.callId : block.id,
					node: inner[i],
					rail: !(block.kind === "tool" && hasPersonCard(block))
				})) }) : inner
			});
			items.push({
				key: group.id,
				rail: true,
				node: rail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-trace-summary": true,
					children: disclosure
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("py-1", conversation && "w-full"),
					"data-trace-summary": true,
					children: disclosure
				})
			});
			continue;
		}
		if (group.blocks.length > 1) {
			const tools = group.blocks.map((block) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TraceTool, {
				block,
				status,
				onDecide
			}, block.callId));
			items.push({
				key: group.id,
				rail: true,
				node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclosure, {
					label: rail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground-secondary",
						children: t(`work_trace.group_${group.family}`).replace("{count}", String(group.blocks.length))
					}) : t(`work_trace.group_${group.family}`).replace("{count}", String(group.blocks.length)),
					icon: rail ? group.family === "read" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: nodeIcon }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderSearch, { className: nodeIcon }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						"aria-hidden": true,
						className: iconClass
					}),
					initiallyOpen: live,
					children: rail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, { items: tools.map((node, i) => ({
						key: group.blocks[i].callId,
						node,
						rail: true
					})) }) : tools
				})
			});
			continue;
		}
		if (first.kind === "tool") {
			const tool = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TraceTool, {
				block: first,
				status,
				onDecide
			});
			items.push({
				key: group.id,
				rail: !hasPersonCard(first),
				node: rail ? tool : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: conversation ? "w-full py-1 text-xs [&_button]:text-xs" : void 0,
					children: tool
				})
			});
			continue;
		}
		if (first.kind === "reasoning") {
			const thought = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReasoningTrace, {
				block: first,
				turnLive: live,
				compact: conversation
			});
			items.push({
				key: group.id,
				rail: true,
				node: rail ? thought : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: conversation ? "w-full text-xs [&_button]:text-xs" : void 0,
					children: thought
				})
			});
			continue;
		}
		if (!first.text.trim()) continue;
		items.push({
			key: group.id,
			rail: false,
			node: replyNode(first, conversation, renderText)
		});
	}
	return items;
}
function replyNode(block, conversation, renderText) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("min-w-0 py-2", conversation && "w-fit max-w-[min(85%,42rem)] rounded-2xl rounded-bl-md bg-secondary px-4 py-2.5"),
		children: renderText ? renderText(block.text, block.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "prose prose-sm max-w-none text-foreground dark:prose-invert [overflow-wrap:anywhere]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatMarkdown, { text: block.text })
		})
	});
}
function withoutQuestionPolls(blocks) {
	const kept = blocks.filter((block) => !(block.kind === "tool" && !block.isError && (isQuestionTool(block.name) && !block.question || isCredentialTool(block.name) && !block.credential)));
	return kept.length === blocks.length ? blocks : kept;
}
var NO_BLOCKS = [];
function WorkTrace({ look = "rail", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TraceLookContext.Provider, {
		value: look,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkTraceBody, { ...props })
	});
}
function WorkTraceBody({ blocks: rawBlocks, status, startedMs, durationMs, error, onDecide, renderText, className, receipt, completionLabel, conversation = false, companion = false, face, extras }) {
	const t = useT();
	const rail = useRail();
	const blocks = (0, import_react.useMemo)(() => withoutQuestionPolls(rawBlocks), [rawBlocks]);
	const live = status === "running";
	const elapsed = useClock(startedMs, live);
	const split = (0, import_react.useMemo)(() => (conversation || rail) && !live ? splitConversationTurn(blocks) : null, [
		blocks,
		conversation,
		rail,
		live
	]);
	const fold = (0, import_react.useMemo)(() => {
		if (!split || rail) return null;
		const workAll = [...split.work, ...split.after];
		if (!hasFoldableWork(workAll)) return null;
		return {
			answer: split.answer,
			workAll,
			attention: workAll.filter(needsAttention)
		};
	}, [split, rail]);
	const groups = (0, import_react.useMemo)(() => conversation ? groupConversationTrace(fold ? fold.workAll : blocks) : groupActivityTrace(blocks), [
		blocks,
		conversation,
		fold
	]);
	const restGroups = (0, import_react.useMemo)(() => fold ? groupConversationTrace(fold.answer) : null, [fold]);
	const timeline = useTimeline(rail ? split ? split.work : blocks : NO_BLOCKS, status, live);
	const afterAnswer = useTimeline(rail && split ? split.after : NO_BLOCKS, status, live);
	const answerGroups = (0, import_react.useMemo)(() => rail && split ? groupConversationTrace(split.answer) : null, [rail, split]);
	const asking = blocks.some(isOpenQuestion);
	const pending = asking || blocks.some((block) => block.kind === "tool" && block.approval?.decision === null);
	const toolFailed = blocks.some((block) => block.kind === "tool" && block.isError);
	const failed = status === "error";
	const outcome = asking ? "question" : pending ? "approval" : live ? "working" : failed ? "failed" : status === "cancelled" ? "stopped" : "done";
	const Icon = asking ? MessageCircleQuestion : pending ? ShieldQuestion : live ? CircleDashed : failed ? CircleAlert : Check;
	const groupProps = {
		live,
		status,
		onDecide,
		renderText,
		conversation,
		rail,
		t
	};
	const answered = fold ? fold.answer.length > 0 : blocks.some((block) => block.kind === "text" && block.text.trim());
	const foldedError = fold && answered && error ? error : null;
	const visibleError = error && !foldedError ? error : null;
	const outcomeLabel = outcome === "done" && completionLabel ? completionLabel : t(`work_trace.${outcome}`);
	const receiptNode = receipt ? conversation ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "ml-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
			className: "cursor-pointer rounded-sm focus-visible:ring-2 focus-visible:ring-ring",
			children: t("society.chat.activity_details")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2 py-1",
			children: receipt
		})]
	}) : receipt : null;
	if (rail) {
		const working = live && !pending;
		const statusOnRail = !fold && (!conversation || live);
		const petState = (companion || face) && working ? livePetState(blocks) : null;
		const statusItem = {
			key: "trace:status",
			node: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "status",
				"aria-live": "polite",
				"data-trace-status": outcome,
				className: cn("flex min-w-0 flex-wrap items-start gap-x-3 text-xs leading-6 text-muted-foreground", statusOnRail ? "py-1" : "pb-2 pt-1", failed && "text-destructive", pending && "text-foreground"),
				children: [petState ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "trace-node trace-node-pet",
					"data-trace-pet": petState,
					children: face ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetStageContext.Provider, {
						value: petState,
						children: face
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetMark, {
						size: 32,
						state: petState
					})
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex min-w-0 flex-1 flex-wrap items-center gap-x-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Live, {
							on: working,
							children: outcomeLabel
						}) }),
						toolFailed && !live && !failed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: t("work_trace.tool_failed")
						}) : null,
						live || durationMs !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-live": "off",
							className: "tabular-nums",
							children: traceDuration(live ? elapsed : durationMs ?? 0)
						}) : null,
						receiptNode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							className: "text-muted-foreground/50",
							children: "·"
						}) : null,
						receiptNode
					]
				})]
			}),
			rail: statusOnRail
		};
		const errorItem = (text, key) => ({
			key,
			rail: false,
			node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "py-1.5 text-sm text-destructive [overflow-wrap:anywhere]",
				children: text
			})
		});
		const renderers = {
			renderLive: (block) => block.kind === "tool" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TraceTool, {
				block,
				status,
				onDecide
			}) : block.kind === "reasoning" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReasoningTrace, {
				block,
				turnLive: live,
				compact: conversation
			}) : replyNode(block, conversation, renderText),
			liveOnRail: (block) => block.kind === "reasoning" || block.kind === "tool" && !hasPersonCard(block),
			renderNarration: (text, id) => renderText ? renderText(text, id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "prose prose-sm max-w-none text-foreground dark:prose-invert [overflow-wrap:anywhere]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatMarkdown, { text })
			}),
			renderDetails: (block) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolDetails, { block })
		};
		const work = timelineItems(timeline, renderers);
		let extraAt = work.length;
		if (!split) while (extraAt > 0 && !work[extraAt - 1].rail) extraAt--;
		const extraItems = (extras ?? []).map((extra) => ({
			key: `extra:${extra.key}`,
			node: extra.node,
			rail: true
		}));
		const workItems = [
			...work.slice(0, extraAt),
			...extraItems,
			...work.slice(extraAt),
			...timelineItems(afterAnswer, renderers)
		];
		const answerItems = answerGroups ? traceGroupItems({
			groups: answerGroups,
			...groupProps
		}) : [];
		if (split && answerItems.length > 0 && workItems.length > 0) {
			const waiting = [...split.work, ...split.after].filter(needsAttention);
			const items$1 = [...answerItems];
			if (visibleError) items$1.push(errorItem(visibleError, "trace:error"));
			if (toolFailed && !failed) items$1.push({
				key: "trace:tool-failed",
				rail: false,
				node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-testid": "tool-failure-warning",
					className: "py-1 text-xs text-destructive",
					children: t("work_trace.tool_failed")
				})
			});
			items$1.push(statusItem);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("min-w-0", conversation && "w-full max-w-[44rem] self-start", className),
				"data-testid": "work-trace",
				"data-look": "rail",
				"data-state": status,
				...conversation ? { "data-conversation": "" } : {},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationWorkFold, {
					durationMs,
					expandInner: false,
					failureCount: waiting.filter((block) => block.isError).length,
					attention: waiting.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, { items: waiting.map((block) => ({
						key: block.callId,
						rail: !hasPersonCard(block),
						node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TraceTool, {
							block,
							status,
							onDecide
						})
					})) }) : void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, { items: workItems })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, { items: items$1 })]
			});
		}
		const items = [...workItems, ...answerItems];
		if (visibleError) items.push(errorItem(visibleError, "trace:error"));
		if (toolFailed && !live && !failed) items.push({
			key: "trace:tool-failed",
			rail: false,
			node: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-testid": "tool-failure-warning",
				className: "flex items-center gap-1.5 py-1 pl-7 text-xs text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
					"aria-hidden": true,
					className: "h-3.5 w-3.5"
				}), t("work_trace.tool_failed")]
			})
		});
		items.push(statusItem);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("min-w-0", conversation && "w-full max-w-[44rem] self-start", className),
			"data-testid": "work-trace",
			"data-look": "rail",
			"data-state": status,
			...conversation ? { "data-conversation": "" } : {},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, { items })
		});
	}
	const classicGroups = (list) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: traceGroupItems({
		groups: list,
		...groupProps
	}).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: item.node }, item.key)) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("min-w-0 space-y-0.5", conversation && "w-full max-w-[44rem] self-start", className),
		"data-testid": "work-trace",
		"data-state": status,
		...conversation ? { "data-conversation": "" } : {},
		children: [
			fold ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConversationWorkFold, {
				durationMs,
				attention: fold.attention.map((block) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full py-1 text-xs [&_button]:text-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TraceTool, {
						block,
						status,
						onDecide
					})
				}, block.callId)),
				children: [classicGroups(groups), foldedError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					className: "py-2 text-sm text-destructive [overflow-wrap:anywhere]",
					children: foldedError
				}) : null]
			}) : classicGroups(groups),
			extras?.map((extra) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: extra.node }, `extra:${extra.key}`)),
			restGroups ? classicGroups(restGroups) : null,
			visibleError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "py-2 text-sm text-destructive [overflow-wrap:anywhere]",
				children: visibleError
			}) : null,
			toolFailed && !live && !failed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-testid": "tool-failure-warning",
				className: "flex items-center gap-1.5 px-1 py-1 text-xs text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
					"aria-hidden": true,
					className: "h-3.5 w-3.5"
				}), t("work_trace.tool_failed")]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "status",
				"aria-live": "polite",
				className: cn("flex flex-wrap items-center gap-2 text-xs text-muted-foreground", conversation ? "px-1 pb-2 pt-1" : "border-t border-border pt-3", failed && "text-destructive"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						"aria-hidden": true,
						className: cn("h-3.5 w-3.5", live && !pending && "motion-safe:animate-spin")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: outcomeLabel }),
					toolFailed && !live && !failed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: t("work_trace.tool_failed")
					}) : null,
					live || durationMs !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-live": "off",
						className: "tabular-nums",
						children: traceDuration(live ? elapsed : durationMs ?? 0)
					}) : null,
					receiptNode
				]
			})
		]
	});
}
function TurnTrace({ turn, ...props }) {
	const t = useT();
	const tokens = outputTokens(turn.usage ?? turn.liveUsage);
	const answered = turn.blocks.some((block) => block.kind === "text" && block.text.trim());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkTrace, {
		...props,
		blocks: turn.blocks,
		status: turn.status,
		startedMs: turn.startedMs,
		durationMs: turn.durationMs,
		error: turn.error,
		completionLabel: !answered ? t("agent_chat.turn_no_answer") : void 0,
		receipt: tokens !== null && tokens > 0 || turn.costUsd !== null && turn.costUsd > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [tokens !== null && tokens > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			"aria-live": "off",
			className: "tabular-nums",
			children: [
				formatTokens(tokens),
				" ",
				t("agent_chat.tokens")
			]
		}) : null, turn.costUsd !== null && turn.costUsd > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "tabular-nums",
			children: ["$", turn.costUsd.toFixed(4)]
		}) : null] }) : void 0
	});
}
export { WorkTrace as n, ShieldQuestion as r, TurnTrace as t };
