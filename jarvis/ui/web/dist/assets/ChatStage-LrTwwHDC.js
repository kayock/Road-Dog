import { i as PairConversationBoundary } from "./CodingThreadLink-DIqtFuRz.js";
import { E as useAgentChat } from "./TraceTimeline-hpw2Rng1.js";
import { A as FolderCode, O as useTranscriptView, b as folderLeaf, t as AgentComposer } from "./AgentComposer-DoSrpnSm.js";
import "./ProviderLogo-BxoN_q6P.js";
import "./WorkTrace-CQMphqAB.js";
import { $ as scrollViewportOf, Bc as require_jsx_runtime, Di as Mic, Gs as fill, Ho as useHomeStore, J as ScrollToEndButton, Ln as cn, Xc as require_react, Xi as AudioLines, Y as ScrollArea, et as useStickToBottom, gn as speakInConversation, hn as ChatsApiError, oc as useT, q as Greeting, tl as __toESM, vn as useHistoryPolling, wc as useEventStore, zs as transcriptFromMessages } from "./index-BOzhgzD7.js";
import "./lib-BoWxqGgd.js";
import "./petStage-CMRGLgJ7.js";
import { r as ChatMarkdown } from "./toolDiff-CkONUaSH.js";
import "./visualFence-DOGBhazZ.js";
import "./McpLogo-Xry4yg3E.js";
import "./VoiceWorkTrace-CbMeKDQm.js";
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
import { t as ThoughtTraceDisclosure } from "./ThinkingTrace-CiOesUk4.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function VoiceThreadStage({ onContinueByVoice } = {}) {
	const t = useT();
	const messages = useEventStore((s) => s.messages);
	const activeThreadId = useEventStore((s) => s.activeThreadId);
	const conversations = useEventStore((s) => s.conversations);
	const setSurface = useHomeStore((s) => s.setSurface);
	const seedTranscript = useHomeStore((s) => s.seedTranscript);
	const setJarvisCardMode = useHomeStore((s) => s.setJarvisCardMode);
	const pushToast = useEventStore((s) => s.pushToast);
	const [starting, setStarting] = (0, import_react.useState)(false);
	const startingRef = (0, import_react.useRef)(false);
	const title = (0, import_react.useMemo)(() => conversations.find((c) => c.kind === "voice" && c.id === activeThreadId)?.title ?? "", [activeThreadId, conversations]);
	const { rootRef, contentRef, atEnd, jumpToEnd, follow } = useStickToBottom();
	(0, import_react.useLayoutEffect)(follow, [
		follow,
		activeThreadId,
		messages.length
	]);
	const continueByVoice = async () => {
		if (startingRef.current) return;
		const threadId = activeThreadId;
		if (onContinueByVoice) onContinueByVoice();
		else {
			seedTranscript(transcriptFromMessages(messages));
			setSurface("voice");
			setJarvisCardMode("voice");
		}
		if (!threadId) return;
		startingRef.current = true;
		setStarting(true);
		try {
			const { armed } = await speakInConversation("voice", threadId);
			if (!armed) pushToast("warning", t("voice_thread.continue_busy"));
		} catch (error) {
			pushToast(error instanceof ChatsApiError && error.status === 503 ? "warning" : "error", t("chats_view.speak_unavailable"));
		} finally {
			startingRef.current = false;
			setStarting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col items-center",
		"data-testid": "voice-thread-stage",
		"data-thread": activeThreadId ?? "",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
			ref: rootRef,
			className: "min-h-0 w-full flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: contentRef,
				className: "mx-auto flex w-full max-w-[760px] flex-col gap-4 px-6 pb-6 pt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center gap-2.5 border-b border-border pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary/50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, {
							"aria-hidden": true,
							className: "h-3.5 w-3.5 text-primary"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate font-display text-sm font-semibold tracking-tight text-foreground",
							children: title || t("voice_thread.untitled")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs text-muted-foreground",
							children: fill(t("voice_thread.subtitle"), { count: String(messages.length) })
						})]
					})]
				}), messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-10 text-center text-xs text-muted-foreground",
					children: t("voice_thread.empty")
				}) : messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpokenTurn, { message: m }, m.id))]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-[760px] px-6 pb-5 pt-2",
			children: [messages.length > 0 && !atEnd && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollToEndButton, { onClick: jumpToEnd }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 rounded-2xl border border-border bg-card/60 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "min-w-0 flex-1 text-xs leading-relaxed text-muted-foreground",
					children: t("voice_thread.read_only")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => void continueByVoice(),
					disabled: starting,
					"data-testid": "continue-by-voice",
					className: cn("flex shrink-0 items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-3 py-1.5", "text-xs font-medium text-primary transition-colors hover:bg-primary/20", "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring", "disabled:cursor-default disabled:opacity-60"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioLines, {
						"aria-hidden": true,
						className: "h-3.5 w-3.5"
					}), t("voice_thread.continue")]
				})]
			})]
		})]
	});
}
function SpokenTurn({ message }) {
	const assistantName = useEventStore((s) => s.assistantName);
	const trace = useEventStore((s) => s.thinkingTraces[message.id]);
	const isUser = message.role === "user";
	if (message.role === "system") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-[85%] rounded-lg border border-border px-3 py-2 text-center text-xs italic text-muted-foreground",
		children: message.content
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex", isUser ? "justify-end" : "justify-start"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("max-w-[80%] px-4 py-3 text-sm leading-relaxed", isUser ? "jarvis-user-bubble rounded-2xl rounded-br-sm" : "jarvis-message-surface rounded-2xl rounded-bl-sm text-foreground"),
			children: [
				!isUser && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 font-mono text-micro uppercase tracking-[0.14em] text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "h-1 w-1 rounded-full bg-foreground/70"
					}), assistantName]
				}),
				!isUser && trace && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThoughtTraceDisclosure, { trace }),
				isUser ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "whitespace-pre-wrap",
					children: message.content
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatMarkdown, {
					text: message.content,
					className: "prose prose-sm mt-1.5 max-w-none dark:prose-invert"
				})
			]
		})
	});
}
function ChatStage() {
	const assistantName = useEventStore((s) => s.assistantName);
	const surface = useAgentChat((s) => s.surface);
	const sessionId = useAgentChat((s) => s.activeSessionId);
	return surface === "jarvis" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PairConversationBoundary, {
		recipient: {
			id: "jarvis",
			name: assistantName
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatStageContent, {})
	}, sessionId) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatStageContent, {});
}
function ChatStageContent() {
	const t = useT();
	const assistantName = useEventStore((s) => s.assistantName);
	const surface = useAgentChat((s) => s.surface);
	const allItems = useAgentChat((s) => s.timeline.items);
	const cwd = useAgentChat((s) => s.draft.cwd);
	const activeSessionId = useAgentChat((s) => s.activeSessionId);
	const items = useTranscriptView(surface === "jarvis" ? activeSessionId : null, allItems).items;
	const catalog = useAgentChat((s) => s.catalog);
	const catalogStale = useAgentChat((s) => s.catalogStale);
	const decide = useAgentChat((s) => s.decide);
	const loadCatalog = useAgentChat((s) => s.loadCatalog);
	const loadSessions = useAgentChat((s) => s.loadSessions);
	const voiceThreadId = useEventStore((s) => s.activeKind === "voice" ? s.activeThreadId : null);
	const hasContent = items.length > 0;
	(0, import_react.useEffect)(() => {
		if (!catalog || catalogStale) loadCatalog();
	}, [
		catalog,
		catalogStale,
		loadCatalog
	]);
	useHistoryPolling(loadSessions);
	const providerLabel = (0, import_react.useCallback)((id) => catalog?.providers.find((p) => p.id === id)?.label ?? id, [catalog]);
	const onDecide = (0, import_react.useCallback)((approvalId, decision) => decide(approvalId, decision), [decide]);
	const rootRef = (0, import_react.useRef)(null);
	const columnRef = (0, import_react.useRef)(null);
	const spacerRef = (0, import_react.useRef)(null);
	const { rootRef: stickRootRef, atEnd, jumpToEnd, follow } = useStickToBottom();
	const setRoot = (0, import_react.useCallback)((node) => {
		rootRef.current = node;
		stickRootRef(node);
	}, [stickRootRef]);
	const anchorIdRef = (0, import_react.useRef)(null);
	const lastItemIdRef = (0, import_react.useRef)(null);
	const sessionRef = (0, import_react.useRef)(activeSessionId);
	const applySpacer = () => {
		const viewport = scrollViewportOf(rootRef.current);
		const spacer = spacerRef.current;
		if (!viewport || !spacer) return false;
		const anchor = anchorIdRef.current ? messageElement(viewport, anchorIdRef.current) : null;
		if (!anchor) {
			spacer.style.minHeight = "0px";
			return false;
		}
		const turnHeight = spacer.getBoundingClientRect().top - anchor.getBoundingClientRect().top;
		const room = viewport.clientHeight - turnHeight - TURN_BOTTOM_PAD_PX;
		spacer.style.minHeight = `${Math.max(0, Math.round(room))}px`;
		return room > 0;
	};
	const lastItem = items[items.length - 1];
	const lastItemId = lastItem?.id ?? null;
	const lastItemIsUser = lastItem?.type === "user";
	(0, import_react.useLayoutEffect)(() => {
		if (sessionRef.current !== activeSessionId) {
			sessionRef.current = activeSessionId;
			anchorIdRef.current = null;
			lastItemIdRef.current = null;
		}
		const viewport = scrollViewportOf(rootRef.current);
		const isNew = lastItemId !== lastItemIdRef.current;
		lastItemIdRef.current = lastItemId;
		if (!viewport || !lastItemId) return;
		if (isNew && lastItemIsUser) {
			anchorIdRef.current = lastItemId;
			applySpacer();
			scrollMessageToTop(viewport, lastItemId);
			return;
		}
		if (!applySpacer()) follow();
	}, [
		lastItemId,
		lastItemIsUser,
		activeSessionId,
		items,
		follow
	]);
	(0, import_react.useEffect)(() => {
		const column = columnRef.current;
		const viewport = scrollViewportOf(rootRef.current);
		if (!column || !viewport || typeof ResizeObserver === "undefined") return;
		const ro = new ResizeObserver(() => {
			if (!applySpacer()) follow();
		});
		ro.observe(column);
		ro.observe(viewport);
		return () => ro.disconnect();
	}, [hasContent, follow]);
	const isJarvis = surface === "jarvis";
	const subtitle = (0, import_react.useMemo)(() => t(isJarvis ? "agent_chat.empty_subtitle" : "agent_chat.empty_subtitle_agent"), [t, isJarvis]);
	if (surface === "jarvis" && voiceThreadId && !activeSessionId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceThreadStage, {});
	if (!hasContent && isJarvis) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col items-center",
		"data-testid": "chat-stage",
		"data-empty": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex w-full flex-1 flex-col items-center justify-center px-6 pb-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Greeting, {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative w-full max-w-[720px] px-6 pb-5 pt-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentComposer, { autoFocus: true })
		})]
	});
	if (!hasContent) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-0 flex-1 flex-col items-center",
		"data-testid": "chat-stage",
		"data-empty": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex w-full max-w-[720px] flex-1 flex-col justify-center gap-8 px-6 pb-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderHeadline, {
				folder: cwd,
				subtitle
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentComposer, { autoFocus: true })]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col items-center",
		"data-testid": "chat-stage",
		"data-empty": "false",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
			ref: setRoot,
			className: "min-h-0 w-full flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: columnRef,
				className: "relative mx-auto flex w-full max-w-[720px] flex-col gap-6 px-6 pb-6 pt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentTimeline, {
					items,
					assistantName: isJarvis ? assistantName : t("agent_chat.surface_agent"),
					providerLabel,
					onDecide,
					bubbles: isJarvis,
					traceLook: isJarvis ? "rail" : "classic",
					traceCompanion: isJarvis
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: spacerRef,
					"aria-hidden": true,
					"data-testid": "chat-bottom-spacer",
					className: "shrink-0"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-[720px] px-6 pb-5 pt-2",
			children: [!atEnd && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollToEndButton, {
				onClick: jumpToEnd,
				testId: "chat-scroll-end"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentComposer, {})]
		})]
	});
}
function FolderHeadline({ folder, subtitle }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center text-center",
		"data-testid": "chat-folder-headline",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "flex items-center gap-3 text-2xl font-semibold text-foreground-strong [text-wrap:balance]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderCode, {
				className: "h-[30px] w-[30px] shrink-0 text-muted-foreground",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fill(t("agent_chat.empty_title_agent"), { folder: folderLeaf(folder) }) })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-md text-base text-muted-foreground",
			children: subtitle
		})]
	});
}
var TURN_BOTTOM_PAD_PX = 24;
function messageElement(viewport, id) {
	for (const el of Array.from(viewport.querySelectorAll("[data-message-id]"))) if (el.dataset.messageId === id) return el;
	return null;
}
function prefersReducedMotion() {
	return typeof window !== "undefined" && typeof window.matchMedia === "function" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;
}
function scrollViewport(viewport, top) {
	const behavior = prefersReducedMotion() ? "auto" : "smooth";
	if (typeof viewport.scrollTo === "function") viewport.scrollTo({
		top,
		behavior
	});
	else viewport.scrollTop = top;
}
function scrollMessageToTop(viewport, id) {
	const el = messageElement(viewport, id);
	if (!el) return;
	const top = el.getBoundingClientRect().top - viewport.getBoundingClientRect().top + viewport.scrollTop - 12;
	scrollViewport(viewport, Math.max(0, top));
}
export { ChatStage };
