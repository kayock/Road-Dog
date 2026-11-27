import { t as ChevronRight } from "./chevron-right-BjVJ-R2c.js";
import { t as CodeXml } from "./code-xml-CMzRaK0o.js";
import { t as Lock } from "./lock-ByyvnTXx.js";
import { Bc as require_jsx_runtime, J as ScrollToEndButton, Ln as cn, Xc as require_react, cn as useIdeThreadsStore, et as useStickToBottom, na as createLucideIcon, oc as useT, si as X, tl as __toESM, wc as useEventStore } from "./index-BOzhgzD7.js";
import { r as ChatMarkdown } from "./toolDiff-CkONUaSH.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowLeftRight = createLucideIcon("ArrowLeftRight", [
	["path", {
		d: "M8 3 4 7l4 4",
		key: "9rb6wj"
	}],
	["path", {
		d: "M4 7h16",
		key: "6tx8e3"
	}],
	["path", {
		d: "m16 21 4-4-4-4",
		key: "siv7j2"
	}],
	["path", {
		d: "M20 17H4",
		key: "h6l3hr"
	}]
]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var PairContext = (0, import_react.createContext)(null);
const useOpenPairConversation = () => (0, import_react.useContext)(PairContext);
function pairMessages(events, first, second) {
	return events.filter((event) => (event.from_agent === first && event.to_agent === second || event.from_agent === second && event.to_agent === first) && typeof event.payload.text === "string" && event.payload.text.trim().length > 0);
}
function PairConversationBoundary({ recipient, children }) {
	const [pair, setPair] = (0, import_react.useState)(null);
	const trigger = (0, import_react.useRef)(null);
	const close = () => {
		setPair(null);
		requestAnimationFrame(() => trigger.current?.focus());
	};
	(0, import_react.useEffect)(() => {
		setPair(null);
	}, [recipient.id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PairContext.Provider, {
		value: (sender) => {
			if (!sender.id || sender.id === "user" || sender.id === recipient.id) return;
			trigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
			setPair([recipient, sender]);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-full min-h-0 w-full flex-1 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				hidden: pair !== null,
				className: pair ? "hidden" : "flex min-h-0 flex-1 flex-col",
				children
			}), pair && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PairConversation, {
				pair,
				onClose: close
			}, JSON.stringify(pair.map((p) => p.id).sort()))]
		})
	});
}
function PairConversation({ pair, onClose }) {
	const t = useT();
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(false);
	const closeRef = (0, import_react.useRef)(null);
	const { rootRef, contentRef, atEnd, jumpToEnd, follow } = useStickToBottom();
	const first = pair[0].id;
	const second = pair[1].id;
	(0, import_react.useLayoutEffect)(() => {
		closeRef.current?.focus();
	}, []);
	(0, import_react.useLayoutEffect)(follow, [follow, messages.length]);
	(0, import_react.useEffect)(() => {
		const controller = new AbortController();
		let cursor = 0;
		let timer;
		const read = async () => {
			try {
				if (document.hidden) return;
				let more = true;
				while (more && !controller.signal.aborted) {
					const response = await fetch(`/api/society/events?after_seq=${cursor}&limit=1000`, { signal: controller.signal });
					if (!response.ok) throw new Error(`HTTP ${response.status}`);
					const data = await response.json();
					if (controller.signal.aborted) return;
					const rows = pairMessages(data.events, first, second);
					if (rows.length) setMessages((previous) => [...previous, ...rows]);
					const next = data.events.at(-1)?.seq ?? cursor;
					more = data.events.length === 1e3 && next > cursor;
					cursor = next;
				}
				setError(false);
				setLoading(false);
			} catch (cause) {
				if (controller.signal.aborted) return;
				console.warn("Could not load the agent conversation", cause);
				setError(true);
				setLoading(false);
			} finally {
				if (!controller.signal.aborted) timer = setTimeout(() => void read(), 3e3 + Math.random() * 2e3);
			}
		};
		read();
		return () => {
			controller.abort();
			clearTimeout(timer);
		};
	}, [first, second]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex min-h-0 flex-1 flex-col",
		"data-testid": "agent-pair-conversation",
		onKeyDown: (event) => {
			if (event.key === "Escape") {
				event.stopPropagation();
				onClose();
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex shrink-0 items-center gap-2 border-b border-border px-4 py-3 text-sm text-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate font-medium",
						children: pair[0].name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, {
						className: "h-4 w-4 shrink-0 text-muted-foreground",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate font-medium",
						children: pair[1].name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						ref: closeRef,
						type: "button",
						onClick: onClose,
						"aria-label": t("agent_chat.pair_close"),
						className: "ml-auto rounded-md p-1.5 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex min-h-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: rootRef,
					className: "min-h-0 flex-1 overflow-y-auto px-4 py-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						ref: contentRef,
						className: "mx-auto flex w-full max-w-[820px] flex-col gap-5",
						children: [
							loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								role: "status",
								className: "text-center text-xs text-muted-foreground",
								children: t("agent_chat.pair_loading")
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								role: "alert",
								className: "text-center text-xs text-destructive",
								children: t("agent_chat.pair_error")
							}),
							!loading && !error && messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-center text-xs text-muted-foreground",
								children: t("agent_chat.pair_empty")
							}),
							messages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: cn("max-w-[90%]", message.from_agent === first ? "self-start" : "self-end"),
								"data-message-id": message.event_id,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("mb-1 flex flex-wrap items-baseline gap-2 text-xs", message.from_agent !== first && "justify-end"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: pair.find((person) => person.id === message.from_agent)?.name ?? message.from_agent
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
										className: "text-muted-foreground",
										dateTime: new Date(message.ts_ms).toISOString(),
										children: new Date(message.ts_ms).toLocaleString()
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-2xl border border-border bg-card px-3.5 py-2.5 text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "prose prose-sm prose-neutral max-w-none dark:prose-invert prose-p:my-1 prose-pre:overflow-x-auto [overflow-wrap:anywhere]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatMarkdown, { text: String(message.payload.text) })
									})
								})]
							}, message.event_id))
						]
					})
				}), !atEnd && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollToEndButton, {
					onClick: jumpToEnd,
					className: "top-auto bottom-3"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "flex shrink-0 flex-wrap items-center justify-center gap-2 border-t border-border px-4 py-3 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
						className: "h-3.5 w-3.5",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("agent_chat.pair_read_only") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "rounded-full border border-border px-3 py-1 text-foreground hover:bg-secondary",
						children: t("agent_chat.pair_close")
					})
				]
			})
		]
	});
}
function openCodingThread(sessionId) {
	if (!sessionId) return;
	const threads = useIdeThreadsStore.getState();
	threads.setLayout("threads");
	threads.openThread(sessionId, "");
	useEventStore.getState().setActiveSection("agentic-ide");
}
function codingThreadOf(senderId) {
	return senderId.startsWith("coding-thread:") ? senderId.slice(14) : "";
}
function foldRepeatedThreadStatus(items) {
	const last = /* @__PURE__ */ new Map();
	const out = items.filter((item) => {
		if (item.type !== "internal") return true;
		const thread = codingThreadOf(item.message.sender_id);
		if (!thread) return true;
		const text = item.message.text.trim();
		if (last.get(thread) === text) return false;
		last.set(thread, text);
		return true;
	});
	return out.length === items.length ? items : out;
}
function CodingThreadActivity({ label, threadId, failed = false }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => openCodingThread(threadId),
		title: t("society.chat.coding_thread_open"),
		"data-testid": "coding-thread-activity",
		className: cn("mx-auto my-3 flex max-w-[min(100%,36rem)] items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", failed && "text-destructive"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, {
				"aria-hidden": true,
				className: "h-3.5 w-3.5 shrink-0"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 truncate",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 underline underline-offset-4",
				children: t("society.chat.coding_thread_open")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
				"aria-hidden": true,
				className: "h-3 w-3 shrink-0"
			})
		]
	});
}
export { useOpenPairConversation as a, PairConversationBoundary as i, codingThreadOf as n, foldRepeatedThreadStatus as r, CodingThreadActivity as t };
