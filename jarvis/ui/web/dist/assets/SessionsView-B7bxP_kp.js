import { t as Check } from "./check-vbwKkbPq.js";
import { t as CircleAlert } from "./circle-alert-BujlF6G8.js";
import { Bc as require_jsx_runtime, F as robustCopy, Gs as fill, L as saveOrDownload, N as buildSessionFilename, Oc as useQuery, P as mimeFor, Qi as ArrowLeft, Ui as Download, Vi as ExternalLink, Wi as Copy, Xc as require_react, Xi as AudioLines, Zi as ArrowRight, gi as Search, ji as LoaderCircle, ln as Button, oc as useT, ot as useCapabilities, qi as ChevronDown, sc as useUiLanguage, si as X, tl as __toESM, wc as useEventStore, yi as RefreshCw, zc as useQueryClient } from "./index-BOzhgzD7.js";
import "./combobox-BL3mwl7r.js";
import { t as BrandedSelect } from "./select-vogX_D37.js";
import { _ as usePreferredOpener, p as useOpeners, y as useSetPreferredOpener } from "./useOutputs-DmTkcj4O.js";
import { t as OpenWithDialog } from "./OpenWithDialog-BFu4mW9z.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
async function fetchSessions(limit = 100) {
	const res = await fetch(`/api/sessions?limit=${limit}`);
	if (!res.ok) throw new Error(`HTTP ${res.status} — sessions list`);
	return await res.json();
}
async function fetchSessionDetail(id) {
	const res = await fetch(`/api/sessions/${encodeURIComponent(id)}`);
	if (!res.ok) throw new Error(`HTTP ${res.status} — session detail`);
	return await res.json();
}
async function fetchSessionExport(id, format = "markdown") {
	const res = await fetch(`/api/sessions/${encodeURIComponent(id)}/export?format=${format}`);
	if (!res.ok) throw new Error(`HTTP ${res.status} — session export`);
	return await res.text();
}
function sessionExportUrl(id, format) {
	return `/api/sessions/${encodeURIComponent(id)}/export?format=${format}`;
}
async function openSessionWith(id, format, opener) {
	const res = await fetch(`/api/sessions/${encodeURIComponent(id)}/open-with?format=${format}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ opener })
	});
	if (!res.ok) throw new Error(`HTTP ${res.status} — session open-with`);
	return (await res.json()).opened ?? false;
}
var SESSIONS_QUERY_KEY = ["sessions"];
function useSessions() {
	const queryClient = useQueryClient();
	const events = useEventStore((s) => s.events);
	const listQuery = useQuery({
		queryKey: SESSIONS_QUERY_KEY,
		queryFn: () => fetchSessions(100),
		refetchInterval: 3e4,
		retry: (failureCount, err) => {
			if (err instanceof Error && /HTTP 503/.test(err.message)) return false;
			return failureCount < 1;
		}
	});
	const lastVoiceEvent = (0, import_react.useMemo)(() => {
		for (let i = events.length - 1; i >= 0; i--) {
			const ev = events[i];
			if (ev.name === "VoiceSessionStarted" || ev.name === "VoiceSessionEnded") return ev;
		}
		return null;
	}, [events]);
	(0, import_react.useEffect)(() => {
		if (lastVoiceEvent === null) return;
		queryClient.invalidateQueries({ queryKey: SESSIONS_QUERY_KEY });
		if (lastVoiceEvent.name === "VoiceSessionEnded") {
			const sid = lastVoiceEvent.payload?.session_id;
			if (typeof sid === "string" && sid.length > 0) queryClient.invalidateQueries({ queryKey: ["session-detail", sid] });
		}
	}, [lastVoiceEvent, queryClient]);
	return listQuery;
}
function useSessionDetail(sessionId) {
	return useQuery({
		queryKey: ["session-detail", sessionId],
		queryFn: () => {
			if (!sessionId) throw new Error("sessionId required");
			return fetchSessionDetail(sessionId);
		},
		enabled: sessionId !== null
	});
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function TranscriptActions({ detail }) {
	const t = useT();
	const panelId = (0, import_react.useId)();
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	const [format, setFormat] = (0, import_react.useState)("plain");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const [failed, setFailed] = (0, import_react.useState)(false);
	const [chooseOpener, setChooseOpener] = (0, import_react.useState)(false);
	const native = useCapabilities().data?.native_file_actions ?? false;
	async function perform(action, selectedFormat) {
		setBusy(true);
		setMessage("");
		setFailed(false);
		try {
			const text = await fetchSessionExport(detail.session.id, selectedFormat);
			if (action === "copy") {
				if (!await robustCopy(text)) throw new Error("Clipboard unavailable");
			} else await saveOrDownload({
				filename: buildSessionFilename(detail.session, detail.turns.find((turn) => turn.user_text)?.user_text ?? "", selectedFormat),
				text,
				mime: mimeFor(selectedFormat),
				native
			});
			setMessage(t(action === "copy" ? "transcription.copied" : "transcription.saved"));
		} catch {
			setFailed(true);
			setMessage(t(action === "copy" ? "session_detail.copy_failed_clipboard" : "session_detail.download_failed"));
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "transcript-actions",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "transcript-action-buttons",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					disabled: busy,
					onClick: () => void perform("copy", "plain"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { "aria-hidden": true }), t("transcription.copy")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					"aria-expanded": expanded,
					"aria-controls": panelId,
					onClick: () => setExpanded(!expanded),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { "aria-hidden": true }),
						t("session_detail.export_label"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { "aria-hidden": true })
					]
				})]
			}),
			expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "transcript-export",
				id: panelId,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: `${panelId}-format`,
						children: t("transcription.format")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedSelect, {
						id: `${panelId}-format`,
						value: format,
						ariaLabel: t("transcription.format"),
						onValueChange: (value) => setFormat(value),
						options: [
							{
								value: "plain",
								label: t("transcription.plain_text")
							},
							{
								value: "markdown",
								label: "Markdown"
							},
							{
								value: "json",
								label: "JSON"
							}
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						disabled: busy,
						onClick: () => void perform("download", format),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { "aria-hidden": true }), t("transcription.download")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						disabled: busy,
						onClick: () => void perform("copy", format),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { "aria-hidden": true }), t("turn_card.copy")]
					}),
					native ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						disabled: busy,
						onClick: () => setChooseOpener(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { "aria-hidden": true }), t("transcription.open_with")]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: sessionExportUrl(detail.session.id, format),
							target: "_blank",
							rel: "noopener noreferrer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { "aria-hidden": true }), t("transcription.open_file")]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: failed ? "transcript-feedback is-error" : "transcript-feedback",
				role: failed ? "alert" : "status",
				children: busy ? t("transcription.preparing") : message && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [failed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { "aria-hidden": true }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { "aria-hidden": true }), message] })
			}),
			chooseOpener && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranscriptOpener, {
				sessionId: detail.session.id,
				format,
				onClose: () => setChooseOpener(false),
				onResult: (ok) => {
					setFailed(!ok);
					setMessage(t(ok ? "session_detail.opened_in_editor" : "session_detail.open_failed"));
				}
			})
		]
	});
}
function TranscriptOpener({ sessionId, format, onClose, onResult }) {
	const openers = useOpeners();
	const preferred = usePreferredOpener();
	const setPreferred = useSetPreferredOpener();
	const autoOpened = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!preferred.data || autoOpened.current) return;
		autoOpened.current = true;
		const opener = preferred.data;
		onClose();
		openSessionWith(sessionId, format, opener).then(onResult).catch(() => onResult(false));
	}, [
		preferred.data,
		sessionId,
		format,
		onClose,
		onResult
	]);
	async function pick(opener, remember) {
		onClose();
		try {
			const opened = await openSessionWith(sessionId, format, opener);
			if (opened && remember && preferred.data !== opener) setPreferred.mutate(opener);
			onResult(opened);
		} catch {
			onResult(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenWithDialog, {
		openers: preferred.isLoading ? [] : openers.data ?? [],
		loading: openers.isLoading || preferred.isLoading,
		onPick: (opener, remember) => void pick(opener, remember),
		onClose
	});
}
function transcriptExchanges(detail) {
	const spoken = /* @__PURE__ */ new Map();
	for (const event of detail.events) {
		if (event.kind !== "SpeechSpoken" || typeof event.payload.text !== "string" || !event.payload.text.trim()) continue;
		const key = event.turn_id ?? "";
		const lines = spoken.get(key) ?? [];
		lines.push({
			turn_id: event.turn_id,
			ts_ms: event.ts_ms,
			text: event.payload.text,
			spoken_kind: typeof event.payload.spoken_kind === "string" ? event.payload.spoken_kind : "other"
		});
		spoken.set(key, lines);
	}
	const exchanges = detail.turns.map((turn, index) => ({
		id: turn.id,
		number: index + 1,
		passages: turnPassages(turn, spoken.get(turn.id) ?? [])
	}));
	const turnIds = new Set(detail.turns.map((turn) => turn.id));
	for (const [id, lines] of spoken) {
		if (turnIds.has(id)) continue;
		for (const [index, line] of lines.entries()) exchanges.push({
			id: `spoken-${id}-${index}`,
			number: null,
			passages: [spokenPassage(line, `${id}-${index}`)]
		});
	}
	return exchanges.map((exchange) => ({
		...exchange,
		passages: exchange.passages.sort((a, b) => a.at - b.at)
	})).filter((exchange) => exchange.passages.length > 0).sort((a, b) => a.passages[0].at - b.passages[0].at);
}
function spokenPassage(line, id) {
	return {
		id,
		speaker: "assistant",
		text: line.text,
		at: line.ts_ms,
		kind: line.spoken_kind
	};
}
function turnPassages(turn, spoken) {
	const passages = [];
	if (turn.user_text) {
		const polished = turn.user_text_polished?.trim();
		passages.push({
			id: `${turn.id}-you`,
			speaker: "you",
			at: turn.started_ms,
			text: polished || turn.user_text,
			original: polished && polished !== turn.user_text.trim() ? turn.user_text : void 0
		});
	}
	for (const [index, line] of spoken.entries()) passages.push({
		...spokenPassage(line, `${turn.id}-spoken-${index}`),
		pending: line.spoken_kind === "reply" && turn.awaiting_confirmation
	});
	if (!spoken.some((line) => line.spoken_kind === "reply") && turn.jarvis_text) passages.push({
		id: `${turn.id}-reply`,
		speaker: "assistant",
		text: turn.jarvis_text,
		at: turn.ended_ms ?? turn.started_ms,
		pending: turn.awaiting_confirmation
	});
	return passages;
}
function passageText(passage, original) {
	return original && passage.original ? passage.original : passage.text;
}
function elapsedTime(ms) {
	const seconds = Math.max(0, Math.floor(ms / 1e3));
	return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}
function exchangeText(exchange, original, you, assistant) {
	return exchange.passages.map((p) => `${p.speaker === "you" ? you : assistant}\n${passageText(p, original)}`).join("\n\n");
}
function TranscriptState({ kind = "empty", title, body, retry, children }) {
	const t = useT();
	const Icon = kind === "error" ? CircleAlert : kind === "loading" ? LoaderCircle : AudioLines;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `transcription-state is-${kind}`,
		role: kind === "error" ? "alert" : "status",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				"aria-hidden": true,
				className: kind === "loading" ? "motion-safe:animate-spin" : void 0
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: title }),
			body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: body }),
			retry && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				onClick: retry,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { "aria-hidden": true }), t("transcription.retry")]
			}),
			children
		]
	});
}
function TranscriptReader({ session, onBack }) {
	const t = useT();
	const locale = useUiLanguage();
	const detail = useSessionDetail(session.id);
	const [search, setSearch] = (0, import_react.useState)("");
	const [original, setOriginal] = (0, import_react.useState)(false);
	const heading = (0, import_react.useRef)(null);
	const exchanges = (0, import_react.useMemo)(() => detail.data ? transcriptExchanges(detail.data) : [], [detail.data]);
	const term = search.trim().toLocaleLowerCase(locale);
	const visible = (0, import_react.useMemo)(() => term ? exchanges.filter((exchange) => exchange.passages.some((p) => passageText(p, original).toLocaleLowerCase(locale).includes(term))) : exchanges, [
		exchanges,
		term,
		original,
		locale
	]);
	const hasPolished = exchanges.some((exchange) => exchange.passages.some((p) => p.original));
	const current = detail.data?.session ?? session;
	const finished = current.ended_ms !== null;
	(0, import_react.useEffect)(() => {
		heading.current?.focus();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "transcription-reader",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "transcription-reader-bar",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "ghost",
				onClick: onBack,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { "aria-hidden": true }), t("transcription.all_conversations")]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("sessions_view.title") })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "transcription-page",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "transcription-document-header",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "transcription-eyebrow",
						children: [
							new Date(current.started_ms).toLocaleDateString(locale, {
								day: "numeric",
								month: "long",
								year: "numeric"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								children: " / "
							}),
							new Date(current.started_ms).toLocaleTimeString(locale, {
								hour: "2-digit",
								minute: "2-digit"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						ref: heading,
						tabIndex: -1,
						children: session.preview || t("transcription.untitled")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "transcription-document-meta",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: !finished ? "transcription-live" : void 0,
								children: t(finished ? "transcription.saved_conversation" : "transcription.in_progress")
							}),
							finished && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: elapsedTime(current.ended_ms - current.started_ms) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fill(t("transcription.exchanges"), { count: current.turn_count }) })
						]
					}),
					detail.data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranscriptActions, { detail: detail.data })
				]
			}), detail.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranscriptState, {
				kind: "loading",
				title: t("session_detail.loading")
			}) : detail.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranscriptState, {
				kind: "error",
				title: t("session_detail.load_error"),
				body: t("transcription.retry_help"),
				retry: () => void detail.refetch()
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				!finished && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "transcription-recording-note",
					role: "status",
					children: [t("transcription.live_help"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						disabled: detail.isFetching,
						onClick: () => void detail.refetch(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { "aria-hidden": true }), t("transcription.refresh")]
					})]
				}),
				exchanges.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "transcription-reading-tools",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "transcription-search",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { "aria-hidden": true }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "search",
								"aria-label": t("transcription.find"),
								placeholder: t("transcription.find"),
								value: search,
								onChange: (event) => setSearch(event.target.value)
							}),
							search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": t("transcription.clear_search"),
								onClick: () => setSearch(""),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { "aria-hidden": true })
							})
						]
					}), hasPolished && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "transcription-original",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: original,
							onChange: (event) => setOriginal(event.target.checked)
						}), t("transcription.original_wording")]
					})]
				}),
				term && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "transcription-find-count",
					role: "status",
					children: fill(t("transcription.results"), { count: visible.length })
				}),
				visible.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "transcription-passages",
					"aria-label": t("transcription.transcript"),
					children: [visible.map((exchange) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Exchange, {
						exchange,
						original,
						search: search.trim(),
						started: current.started_ms
					}, exchange.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "transcription-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
							t(finished ? "transcription.end" : "transcription.latest"),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
						]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranscriptState, {
					title: t(term ? "transcription.no_matches" : "transcription.no_speech"),
					body: t(term ? "transcription.find_help" : "transcription.no_speech_help"),
					children: term && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setSearch(""),
						children: t("transcription.clear_search")
					})
				})
			] })]
		})]
	});
}
function Exchange({ exchange, original, search, started }) {
	const t = useT();
	const assistant = useEventStore((state) => state.assistantName);
	const native = useCapabilities().data?.native_file_actions ?? false;
	const [feedback, setFeedback] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [failed, setFailed] = (0, import_react.useState)(false);
	async function exportExchange(download) {
		setBusy(true);
		setFeedback("");
		setFailed(false);
		try {
			const text = exchangeText(exchange, original, t("session_detail.you"), assistant);
			if (download) await saveOrDownload({
				filename: `voice-excerpt-${Math.floor(started)}-${exchange.number ?? "spoken"}.txt`,
				text,
				mime: "text/plain;charset=utf-8",
				native
			});
			else if (!await robustCopy(text)) throw new Error("Clipboard unavailable");
			setFeedback(t(download ? "transcription.saved" : "transcription.copied"));
		} catch {
			setFailed(true);
			setFeedback(t(download ? "session_detail.download_failed" : "session_detail.copy_failed_clipboard"));
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "transcription-exchange",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "transcription-exchange-rule",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: exchange.number === null ? t("transcription.spoken_output") : fill(t("transcription.exchange"), { number: String(exchange.number).padStart(2, "0") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					disabled: busy,
					"aria-label": t("turn_card.copy_turn"),
					title: t("turn_card.copy_turn"),
					onClick: () => void exportExchange(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { "aria-hidden": true })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					disabled: busy,
					"aria-label": t("turn_card.download_turn"),
					title: t("turn_card.download_turn"),
					onClick: () => void exportExchange(true),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { "aria-hidden": true })
				})] })]
			}),
			exchange.passages.map((passage) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "transcription-passage",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "transcription-speaker",
					"data-speaker": passage.speaker,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: passage.speaker === "you" ? t("session_detail.you") : assistant }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: elapsedTime(passage.at - started) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "transcription-words",
					children: [
						passage.original && !original && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "transcription-wording-note",
							children: t("session_turn.polished")
						}),
						passage.pending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "transcription-pending",
							children: t("transcription.pending")
						}),
						passage.kind && passage.kind !== "reply" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "transcription-wording-note",
							children: t(`transcription.spoken_${passage.kind}`) === `transcription.spoken_${passage.kind}` ? t("transcription.spoken_output") : t(`transcription.spoken_${passage.kind}`)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, {
							text: passageText(passage, original),
							term: search
						}) })
					]
				})]
			}, passage.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: failed ? "transcript-feedback is-error" : "transcript-feedback",
				role: failed ? "alert" : "status",
				children: feedback
			})
		]
	});
}
function Highlight({ text, term }) {
	if (!term) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: text });
	const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: text.split(new RegExp(`(${escaped})`, "gi")).map((part, index) => index % 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mark", { children: part }, index) : part) });
}
function SessionsView() {
	const t = useT();
	const locale = useUiLanguage();
	const sessions = useSessions();
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [search, setSearch] = (0, import_react.useState)("");
	const lastOpened = (0, import_react.useRef)(null);
	const setSection = useEventStore((state) => state.setActiveSection);
	const groups = (0, import_react.useMemo)(() => {
		const byDay = /* @__PURE__ */ new Map();
		for (const session of [...sessions.data ?? []].sort((a, b) => b.started_ms - a.started_ms)) {
			if (search.trim() && !session.preview.toLocaleLowerCase(locale).includes(search.trim().toLocaleLowerCase(locale))) continue;
			const day = new Date(session.started_ms).toLocaleDateString(locale, {
				weekday: "long",
				month: "long",
				day: "numeric",
				year: "numeric"
			});
			const list = byDay.get(day) ?? [];
			list.push(session);
			byDay.set(day, list);
		}
		return [...byDay];
	}, [
		sessions.data,
		search,
		locale
	]);
	const disabledRecorder = sessions.error instanceof Error && /HTTP 503/.test(sessions.error.message);
	function back() {
		setSelected(null);
		requestAnimationFrame(() => lastOpened.current?.focus());
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "transcription-workspace",
		"aria-label": t("sessions_view.title"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "transcription-library",
			hidden: selected !== null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "transcription-library-inner",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "transcription-masthead",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "transcription-eyebrow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioLines, { "aria-hidden": true }), t("transcription.archive")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: t("sessions_view.title") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "transcription-intro",
								children: t("transcription.intro")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "transcription-library-tools",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "transcription-search",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { "aria-hidden": true }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									"aria-label": t("transcription.search_sessions"),
									placeholder: t("transcription.search_sessions"),
									value: search,
									onChange: (event) => setSearch(event.target.value),
									type: "search"
								}),
								search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": t("transcription.clear_search"),
									onClick: () => setSearch(""),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { "aria-hidden": true })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							disabled: sessions.isFetching,
							onClick: () => void sessions.refetch(),
							"aria-label": t("transcription.refresh"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
								"aria-hidden": true,
								className: sessions.isFetching ? "motion-safe:animate-spin" : void 0
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("transcription.refresh") })]
						})]
					}),
					sessions.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranscriptState, {
						kind: "error",
						title: t(disabledRecorder ? "transcription.recorder_off" : "transcription.list_error"),
						body: t(disabledRecorder ? "transcription.recorder_help" : "transcription.retry_help"),
						retry: () => void sessions.refetch()
					}),
					sessions.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranscriptState, {
						kind: "loading",
						title: t("transcription.loading_library")
					}) : groups.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "transcription-library-count",
						role: "status",
						children: fill(t(search.trim() ? "transcription.results" : "transcription.recent_count"), { count: groups.reduce((count, [, list]) => count + list.length, 0) })
					}), groups.map(([day, list]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "transcription-day",
						"aria-label": day,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: day }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: list.map((session) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "transcription-session",
							type: "button",
							onClick: (event) => {
								lastOpened.current = event.currentTarget;
								setSelected(session);
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									className: "transcription-session-time",
									dateTime: new Date(session.started_ms).toISOString(),
									children: new Date(session.started_ms).toLocaleTimeString(locale, {
										hour: "2-digit",
										minute: "2-digit"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "transcription-session-main",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "transcription-session-title",
										children: session.preview || t("transcription.untitled")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "transcription-session-meta",
										children: [
											session.ended_ms === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "transcription-live",
												children: t("transcription.in_progress")
											}) : session.duration_s !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: elapsedTime(session.duration_s * 1e3) }) : null,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fill(t("transcription.exchanges"), { count: session.turn_count }) }),
											session.language && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: session.language.toLocaleUpperCase(locale) })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
									"aria-hidden": true,
									className: "transcription-session-arrow"
								})
							]
						}) }, session.id)) })]
					}, day))] }) : !sessions.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranscriptState, {
						title: t(search.trim() ? "transcription.no_matches" : "transcription.empty_title"),
						body: t(search.trim() ? "transcription.search_help" : "transcription.empty_body"),
						children: search.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setSearch(""),
							children: t("transcription.clear_search")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => setSection("chats"),
							children: [t("transcription.open_chat"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "aria-hidden": true })]
						})
					})
				]
			})
		}), selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranscriptReader, {
			session: selected,
			onBack: back
		}, selected.id)]
	});
}
export { SessionsView };
