import "./CodingThreadLink-DIqtFuRz.js";
import { T as AgentChatStoreProvider } from "./TraceTimeline-hpw2Rng1.js";
import "./AgentComposer-DoSrpnSm.js";
import "./ProviderLogo-BxoN_q6P.js";
import { i as Send, n as routineTask, t as legacyRoutineEvents } from "./routineExecution-BAZui0s9.js";
import "./WorkTrace-CQMphqAB.js";
import { Bc as require_jsx_runtime, Ko as EMPTY_TIMELINE, Qi as ArrowLeft, Uo as createAgentChatStore, Xc as require_react, Xo as reduceEvents, Zo as runningTurn, di as Square, et as useStickToBottom, oc as useT, ps as fetchAgentChatSession, tl as __toESM } from "./index-BOzhgzD7.js";
import "./lib-BoWxqGgd.js";
import "./petStage-CMRGLgJ7.js";
import { r as ChatMarkdown } from "./toolDiff-CkONUaSH.js";
import "./visualFence-DOGBhazZ.js";
import "./McpLogo-Xry4yg3E.js";
import "./AgentMark-Bw7Rhl-a.js";
import "./combobox-BL3mwl7r.js";
import "./select-vogX_D37.js";
import "./switch-hmH-TV55.js";
import "./useModelMenuData-TwmHE5pI.js";
import "./agentProviderPrefs-3Ey03m7Z.js";
import "./AgentSwatch-CHRK4Jk4.js";
import "./appearance-CnI1Xhkn.js";
import "./CompanionMark-BvabJfVP.js";
import "./figureRecipe-BRnaWN-p.js";
import "./data-v-6nxr7Q.js";
import "./DictationButton-Bx-A0TOD.js";
import { t as AgentTimeline } from "./AgentTimeline-B2PJrfWO.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function displayItems(items) {
	return items.map((item) => item.type === "user" ? {
		...item,
		text: routineTask(item.text) ?? item.text
	} : item);
}
function RoutineChat({ target, onClose, face }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex h-full min-h-0 flex-1 flex-col bg-background p-4 text-foreground sm:p-6",
		"data-testid": "routine-chat",
		"data-session-id": target.sessionId,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2 border-b border-border pb-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex items-center gap-1 text-[12px] text-muted-foreground hover:text-foreground",
					onClick: onClose,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 14 }), t("society.routine_detail.back_to_agent")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "truncate text-sm font-medium",
						children: target.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
						className: "text-[11px] text-muted-foreground",
						dateTime: new Date(target.timestamp).toISOString(),
						children: new Date(target.timestamp).toLocaleString()
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-muted-foreground",
					children: t(target.kind === "conversation" ? "society.conversations.badge" : "society.routine_detail.background_chat")
				})
			]
		}), target.legacy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoricalExecution, { target }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveExecution, {
			sessionId: target.sessionId,
			conversation: target.kind === "conversation",
			face
		})]
	});
}
function HistoricalExecution({ target }) {
	const t = useT();
	const [snapshot, setSnapshot] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let alive = true;
		fetchAgentChatSession(target.sessionId).then(({ session, events }) => {
			if (!alive) return;
			const items = displayItems(reduceEvents(EMPTY_TIMELINE, legacyRoutineEvents(events, target)).items).map((item) => item.type === "turn" ? {
				...item,
				blocks: item.blocks.map((block) => block.kind === "tool" ? {
					...block,
					approval: null
				} : block)
			} : item);
			const replies = items.flatMap((item) => item.type === "turn" ? item.blocks.flatMap((block) => block.kind === "text" ? [block.text] : []) : []).join("\n");
			setSnapshot({
				name: session.title,
				items,
				resultInChat: Boolean(target.result?.trim() && replies.includes(target.result.trim()))
			});
		}).catch((err) => {
			if (alive) setError(err instanceof Error ? err.message : String(err));
		});
		return () => {
			alive = false;
		};
	}, [target]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-0 flex-1 space-y-4 overflow-y-auto py-4",
		"data-testid": "routine-historical-transcript",
		children: [
			!snapshot && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: t("tasks_view.loading_details")
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-sm text-destructive",
				children: error
			}),
			snapshot?.items.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentTimeline, {
				items: snapshot.items,
				assistantName: snapshot.name,
				providerLabel: (id) => id,
				onDecide: async () => {}
			}) : null,
			(snapshot?.items.length === 0 || error) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: t("society.routine_detail.trace_unavailable")
			}) }),
			(snapshot || error) && target.result && !snapshot?.resultInChat && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2 border-t border-border pt-3",
				"data-testid": "routine-saved-result",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-xs font-medium text-muted-foreground",
					children: t("society.routine_detail.saved_result")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatMarkdown, { text: target.result })]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "shrink-0 border-t border-border pt-3 text-xs text-muted-foreground",
		children: t("society.routine_detail.historical_chat")
	})] });
}
function LiveExecution({ sessionId, conversation = false, face }) {
	const t = useT();
	const label = (key) => t(`society.routine_detail.${key}`);
	const followUp = conversation ? t("society.conversations.follow_up") : label("follow_up");
	const [store] = (0, import_react.useState)(() => createAgentChatStore("society", "routine"));
	const timeline = store((state) => state.timeline);
	const visibleItems = (0, import_react.useMemo)(() => displayItems(timeline.items), [timeline.items]);
	const session = store((state) => state.activeSession);
	const busy = store((state) => state.busy);
	const socketState = store((state) => state.socketState);
	const error = store((state) => state.lastError);
	const [message, setMessage] = (0, import_react.useState)("");
	const running = Boolean(runningTurn(timeline)) || busy;
	const ready = session?.session_id === sessionId && socketState === "open";
	const scroll = useStickToBottom();
	(0, import_react.useEffect)(() => {
		store.getState().openSession(sessionId);
		return () => store.getState().disconnect();
	}, [sessionId, store]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AgentChatStoreProvider, {
		store,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: scroll.rootRef,
				className: "min-h-0 flex-1 overflow-y-auto py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: scroll.contentRef,
					className: "space-y-3",
					children: [!ready && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "status",
						className: "text-sm",
						children: t("tasks_view.loading_details")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentTimeline, {
						items: visibleItems,
						assistantName: session?.title.split(" · ")[0] ?? "",
						providerLabel: (id) => id,
						onDecide: store.getState().decide,
						traceFace: face
					})]
				})
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-sm text-destructive",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3 flex shrink-0 items-end gap-2",
				onSubmit: (event) => {
					event.preventDefault();
					if (!message.trim() || !ready || running) return;
					store.getState().send(message).then(() => {
						if (!store.getState().lastError) setMessage("");
					});
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "min-w-0 flex-1 rounded-lg border border-border bg-background p-2 text-sm",
					rows: 2,
					"aria-label": followUp,
					placeholder: followUp,
					value: message,
					onChange: (event) => setMessage(event.target.value)
				}), running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "rounded p-2 hover:bg-secondary",
					"aria-label": label("stop_run"),
					onClick: () => void store.getState().cancel(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { size: 16 })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "rounded p-2 hover:bg-secondary disabled:opacity-50",
					disabled: !ready || !message.trim(),
					"aria-label": label("send"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 16 })
				})]
			})
		]
	});
}
export { RoutineChat as default };
