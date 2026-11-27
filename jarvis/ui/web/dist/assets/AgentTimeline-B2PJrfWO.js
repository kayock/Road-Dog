import { a as useOpenPairConversation, n as codingThreadOf, r as foldRepeatedThreadStatus, t as CodingThreadActivity } from "./CodingThreadLink-DIqtFuRz.js";
import { d as MessageWithChips, j as Image, r as TraceMessageLine } from "./TraceTimeline-hpw2Rng1.js";
import { t as CircleAlert } from "./circle-alert-BujlF6G8.js";
import { t as FileText } from "./file-text-D8DI7Rfv.js";
import { r as effortLabel } from "./AgentComposer-DoSrpnSm.js";
import { t as ProviderLogo } from "./ProviderLogo-BxoN_q6P.js";
import { t as TurnTrace } from "./WorkTrace-CQMphqAB.js";
import { Bc as require_jsx_runtime, Ln as cn, Xc as require_react, Zi as ArrowRight, ki as MessagesSquare, oc as useT, qi as ChevronDown, tl as __toESM } from "./index-BOzhgzD7.js";
import { a as mediaKind, i as MediaPreview, r as ChatMarkdown } from "./toolDiff-CkONUaSH.js";
import { t as AgentSwatch } from "./AgentSwatch-CHRK4Jk4.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function internalPreview(text, max = 140) {
	const flat = text.replace(/```[\s\S]*?```/g, " ").replace(/[`*_#>~|]+/g, "").replace(/\s+/g, " ").trim();
	if (!flat) return "";
	const sentence = (flat.split(new RegExp("(?<=[.!?…])\\s", ""))[0] ?? flat).trim();
	if (sentence.length <= max) return sentence;
	return `${sentence.slice(0, Math.max(0, max - 1)).trimEnd()}…`;
}
function internalNeedsFold(text) {
	const trimmed = text.trim();
	if (!trimmed) return false;
	return internalPreview(trimmed) !== trimmed.replace(/\s+/g, " ").trim();
}
function Initials({ name, size = 20 }) {
	const letter = name.trim().charAt(0).toUpperCase() || "?";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": true,
		className: "inline-flex shrink-0 items-center justify-center rounded-full border border-border bg-secondary font-medium text-muted-foreground",
		style: {
			width: size,
			height: size,
			fontSize: size * .5
		},
		children: letter
	});
}
function Face({ who, size = 20 }) {
	if (!who) return null;
	if (who.figure || who.palette) try {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentSwatch, {
			agent: who,
			size
		});
	} catch {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Initials, {
			name: who.name,
			size
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Initials, {
		name: who.name,
		size
	});
}
function InternalMessageBubble({ item, sender, recipient, recipientName }) {
	const t = useT();
	const openPair = useOpenPairConversation();
	const canOpenPair = Boolean(openPair && item.message.sender_kind !== "user");
	const [open, setOpen] = (0, import_react.useState)(false);
	const text = item.message.text.trim();
	const preview = internalPreview(text);
	const foldable = internalNeedsFold(text);
	const shown = !foldable || open;
	const senderName = sender?.name || item.message.sender_name;
	const toName = item.outgoing?.recipientName || recipient?.name || recipientName || "";
	const counterpart = item.outgoing ? {
		id: item.outgoing.recipientId,
		name: toName
	} : {
		id: item.message.sender_id,
		name: senderName
	};
	const status = item.message.status;
	const statusLabel = item.outgoing && status !== "failed" ? t("agent_chat.delivery_sent") : t(`agent_chat.delivery_${status}`);
	const statusTone = status === "failed" ? "text-destructive" : status === "delivered" ? "text-success" : "text-muted-foreground";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": "agent-message-internal",
		"data-message-id": item.id,
		"data-state": !foldable ? "whole" : open ? "open" : "folded",
		className: "max-w-[85%] self-start overflow-hidden rounded-xl border border-border bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => canOpenPair ? openPair?.(counterpart) : foldable && setOpen((v) => !v),
			"aria-expanded": !canOpenPair && foldable ? open : void 0,
			"aria-label": canOpenPair ? t("agent_chat.pair_open") : foldable ? open ? t("agent_chat.internal_collapse") : t("agent_chat.internal_expand") : void 0,
			"data-testid": "agent-message-internal-toggle",
			disabled: !canOpenPair && !foldable,
			className: cn("flex w-full items-center gap-1.5 px-3 py-2 text-left", (canOpenPair || foldable) && "cursor-pointer hover:bg-secondary/50", !canOpenPair && !foldable && "cursor-default"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessagesSquare, {
					className: "h-3.5 w-3.5 shrink-0 text-muted-foreground",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, { who: sender ?? {
					name: senderName,
					figure: null,
					palette: {
						primary: "#888",
						secondary: "#555",
						accent: "#aaa"
					}
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate text-xs font-medium text-foreground",
					children: senderName
				}),
				toName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "h-3 w-3 shrink-0 text-muted-foreground",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, { who: recipient ?? {
						name: toName,
						figure: null,
						palette: {
							primary: "#888",
							secondary: "#555",
							accent: "#aaa"
						}
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate text-xs text-muted-foreground",
						children: toName
					})
				] }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ml-auto flex shrink-0 items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("hidden rounded-full border border-border px-1.5 py-px text-[10px] sm:inline", "text-muted-foreground"),
							children: t("agent_chat.internal_message")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("flex items-center gap-1 text-[11px]", statusTone),
							"aria-live": "polite",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: cn("h-1.5 w-1.5 rounded-full", status === "failed" ? "bg-destructive" : status === "delivered" ? "bg-success" : "bg-muted-foreground")
							}), statusLabel]
						}),
						foldable && !canOpenPair ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
							className: cn("h-3.5 w-3.5 text-muted-foreground transition-transform", open && "rotate-180"),
							"aria-hidden": true
						}) : null
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-3 pb-2.5 pl-[30px]",
			onClick: canOpenPair ? () => openPair?.(counterpart) : void 0,
			style: canOpenPair ? { cursor: "pointer" } : void 0,
			children: [shown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-testid": "agent-message-internal-full",
				className: "whitespace-pre-wrap text-sm leading-relaxed text-foreground [overflow-wrap:anywhere]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatMarkdown, { text })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-testid": "agent-message-internal-preview",
				className: "truncate text-xs leading-relaxed text-muted-foreground",
				title: text,
				children: preview
			}), item.message.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-xs text-destructive",
				children: item.message.error
			}) : null]
		})]
	});
}
var ECHO_KINDS = new Set(["society_message", "delegation_report"]);
var ECHO_WINDOW_MS = 5e3;
var TURN_GRACE_MS = 2e3;
function messageOf(item) {
	return {
		id: item.id,
		name: item.outgoing ? item.outgoing.recipientName : item.message.sender_name,
		outgoing: Boolean(item.outgoing),
		text: item.message.text,
		failed: item.message.status === "failed"
	};
}
function noticeMessage(item) {
	return {
		id: item.id,
		name: item.agentName,
		outgoing: false,
		text: item.text,
		failed: item.status === "blocked"
	};
}
function attachTurnMessages(items) {
	const messagesByTurn = /* @__PURE__ */ new Map();
	if (!items.some((item) => item.type === "internal" || item.type === "notice" && ECHO_KINDS.has(item.kind))) return {
		items,
		messagesByTurn
	};
	const internals = items.filter((item) => item.type === "internal");
	const isEcho = (notice) => notice.kind === "society_message" && internals.some((item) => !item.outgoing && item.message.sender_name === notice.agentName && Math.abs(item.tsMs - notice.tsMs) <= ECHO_WINDOW_MS);
	const kept = [];
	let turn = null;
	const attach = (turnId, message) => {
		const list = messagesByTurn.get(turnId) ?? [];
		messagesByTurn.set(turnId, [...list, message]);
	};
	for (const item of items) {
		if (item.type === "turn") {
			turn = {
				id: item.id,
				endsMs: item.status === "running" || item.durationMs === null ? Number.POSITIVE_INFINITY : item.startedMs + item.durationMs + TURN_GRACE_MS
			};
			kept.push(item);
			continue;
		}
		if (item.type === "user") turn = null;
		const inTurn = turn !== null && item.type !== "user" && "tsMs" in item && item.tsMs <= turn.endsMs;
		if (item.type === "notice" && ECHO_KINDS.has(item.kind)) {
			if (isEcho(item)) continue;
			if (item.kind === "delegation_report" && turn !== null && inTurn) {
				if (!messagesByTurn.get(turn.id)?.some((m) => m.name === item.agentName && !m.outgoing)) attach(turn.id, noticeMessage(item));
				continue;
			}
			if (turn !== null && inTurn) {
				attach(turn.id, noticeMessage(item));
				continue;
			}
			kept.push(item);
			continue;
		}
		if (item.type === "internal" && turn !== null && inTurn) {
			attach(turn.id, messageOf(item));
			continue;
		}
		kept.push(item);
	}
	return {
		items: kept,
		messagesByTurn
	};
}
function AgentTimeline({ items, assistantName, providerLabel, onDecide, recipientName, agentsById, bubbles = false, traceLook = "rail", traceCompanion = false, traceFace }) {
	const t = useT();
	const { items: shown, messagesByTurn } = (0, import_react.useMemo)(() => {
		const folded = foldRepeatedThreadStatus(items);
		return traceLook === "rail" ? attachTurnMessages(folded) : {
			items: folded,
			messagesByTurn: NO_MESSAGES
		};
	}, [items, traceLook]);
	const stamps = bubbles ? timeStamps(shown) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: shown.map((item) => {
		const stamp = stamps?.get(item.id);
		const node = renderItem(item);
		return stamp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-center pt-2",
			"data-testid": "agent-time-stamp",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-medium text-muted-foreground",
				children: stamp
			})
		}), node] }, item.id) : node;
	}) });
	function renderItem(item) {
		if (item.type === "internal" && codingThreadOf(item.message.sender_id)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodingThreadActivity, {
			label: item.message.text,
			threadId: codingThreadOf(item.message.sender_id),
			failed: item.message.status === "failed"
		}, item.id);
		if (item.type === "internal") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InternalMessageBubble, {
			item,
			sender: agentsById?.[item.message.sender_id] ?? null,
			recipientName: recipientName ?? assistantName
		}, item.id);
		if (item.type === "user") {
			if (item.origin === "control") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-message-id": item.id,
				className: "text-xs text-muted-foreground",
				children: [t("slash.control_turn"), item.attachments.map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2",
					children: file.name
				}, file.name))]
			}, item.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				"data-testid": "agent-message-user",
				"data-message-id": item.id,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("text-[15px] leading-[23px]", bubbles ? "jarvis-user-bubble max-w-[80%] rounded-[20px] px-4 py-2.5" : "jarvis-user-bubble max-w-[85%] rounded-lg px-4 py-3"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageWithChips, {
						text: item.text,
						choices: item.toolChoices ?? []
					}), item.attachments.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-testid": "agent-message-attachments",
						className: cn("flex flex-wrap gap-row", item.text && "mt-2.5"),
						children: item.attachments.map((file) => file.url && (mediaKind(file.url) === "video" || mediaKind(file.url) === "audio") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaPreview, {
							src: file.url,
							label: file.name,
							kind: mediaKind(file.url)
						}, file.name) : (file.kind === "image" || file.url && mediaKind(file.url) === "image") && file.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: file.url,
							alt: file.name,
							title: file.name,
							loading: "lazy",
							decoding: "async",
							"data-testid": "agent-message-image",
							className: "max-h-60 max-w-full rounded-lg object-contain"
						}, file.name) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							title: file.describedBy === "none" ? t("agent_chat.attach_not_described") : file.name,
							className: "flex items-center gap-1.5 text-micro opacity-80",
							children: [file.kind === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
								className: "h-3 w-3 shrink-0",
								"aria-hidden": true
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
								className: "h-3 w-3 shrink-0",
								"aria-hidden": true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "max-w-[12rem] truncate font-mono",
								children: file.name
							})]
						}, file.name))
					})]
				})
			}, item.id);
		}
		if (item.type === "error") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-message-id": item.id,
			className: "mx-auto flex max-w-[85%] items-center gap-row rounded-lg bg-card px-4 py-3 text-body text-destructive",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
				className: "h-3.5 w-3.5 shrink-0",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.text })]
		}, item.id);
		if (item.type === "notice") {
			if (item.kind === "native_goal_verdict") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: t("slash.verifying")
			}, item.id);
			if (item.kind === "coding_thread") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodingThreadActivity, {
				label: `${t("society.chat.coding_thread_started").replace("{0}", String(item.data.agent ?? ""))} · ${String(item.data.title ?? "")}`,
				threadId: String(item.data.thread_id ?? "")
			}, item.id);
			const headline = item.kind === "society_result" ? t(item.status === "done" ? "society.chat.result_done" : "society.chat.result_blocked").replace("{0}", item.agentName || t("society.chat.result_agent")) : item.agentName;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-message-id": item.id,
				className: "mx-auto flex max-w-[85%] flex-col gap-0.5 rounded-lg bg-card px-4 py-3 text-body",
				children: [headline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-foreground",
					children: headline
				}) : null, item.text ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatMarkdown, {
					text: item.text,
					className: "text-muted-foreground"
				}) : null]
			}, item.id);
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Turn, {
			turn: item,
			assistantName,
			providerLabel: providerLabel(item.provider),
			onDecide,
			bubbles,
			traceLook,
			traceCompanion,
			traceFace,
			messages: messagesByTurn.get(item.id)
		}, item.id);
	}
}
var STAMP_GAP_MS = 1200 * 1e3;
function itemTime(item) {
	return item.type === "turn" ? item.startedMs : item.tsMs;
}
function timeStamps(items, now = /* @__PURE__ */ new Date()) {
	const out = /* @__PURE__ */ new Map();
	let last = 0;
	for (const item of items) {
		const ts = itemTime(item);
		if (!ts || !Number.isFinite(ts)) continue;
		if (!last || ts - last >= STAMP_GAP_MS) out.set(item.id, stampLabel(new Date(ts), now));
		last = ts;
	}
	return out;
}
function stampLabel(at, now) {
	const time = at.toLocaleTimeString(void 0, {
		hour: "numeric",
		minute: "2-digit"
	});
	if (at.toDateString() === now.toDateString()) return time;
	return `${at.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		...at.getFullYear() === now.getFullYear() ? {} : { year: "numeric" }
	})}, ${time}`;
}
var NO_MESSAGES = /* @__PURE__ */ new Map();
var Turn = (0, import_react.memo)(function Turn$1({ turn, assistantName, providerLabel, onDecide, bubbles = false, traceLook, traceCompanion = false, traceFace, messages }) {
	const t = useT();
	const extras = (0, import_react.useMemo)(() => messages?.map((message) => ({
		key: message.id,
		node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TraceMessageLine, { message })
	})), [messages]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-3",
		"data-testid": "agent-turn",
		"data-message-id": turn.id,
		"data-status": turn.status,
		children: [!bubbles && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-foreground",
					children: assistantName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderLogo, {
					providerId: turn.provider,
					label: providerLabel,
					size: "sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [providerLabel, turn.model ? ` · ${turn.model}` : ""] }),
				turn.effort ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: effortLabel(turn.effort, t) }) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TurnTrace, {
			turn,
			look: traceLook,
			companion: traceCompanion,
			face: traceFace,
			extras,
			onDecide,
			renderText: (text, id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prose, { block: {
				kind: "text",
				text,
				id
			} })
		})]
	});
});
function Prose({ block }) {
	if (!block.text.trim()) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-testid": "agent-text",
		className: cn("prose prose-neutral max-w-none text-[15px] leading-[25px] text-foreground dark:prose-invert dark:text-foreground [overflow-wrap:anywhere]", "[&>div>:first-child]:mt-0 [&>div>:last-child]:mb-0", "prose-p:my-2.5 prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground-strong", "prose-headings:mb-1.5 prose-headings:mt-5 prose-headings:font-semibold prose-headings:tracking-normal prose-headings:text-foreground-strong", "prose-h1:text-[17px] prose-h1:leading-[25px] prose-h2:text-[16px] prose-h2:leading-[25px] prose-h3:text-[15px] prose-h3:leading-[25px] prose-h4:text-[15px]", "prose-a:text-foreground-strong prose-a:underline prose-a:decoration-border-strong prose-a:underline-offset-2", "prose-code:rounded prose-code:bg-secondary prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.85em] prose-code:font-normal prose-code:before:hidden prose-code:after:hidden", "prose-pre:my-2.5 prose-pre:bg-card prose-pre:text-[13px] prose-pre:leading-[20px]", "prose-li:my-1 prose-ul:my-2.5 prose-ol:my-2.5 prose-ul:pl-5 prose-ol:pl-5 prose-li:pl-1", "prose-hr:my-5", "prose-table:my-3 prose-table:text-[14px] prose-table:leading-[21px]", "prose-thead:text-foreground-strong prose-th:text-foreground-strong prose-td:text-foreground"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatMarkdown, { text: block.text })
	});
}
export { AgentTimeline as t };
