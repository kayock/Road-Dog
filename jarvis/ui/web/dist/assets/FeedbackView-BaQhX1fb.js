import { t as ArrowUpRight } from "./arrow-up-right-uLYmS_nN.js";
import { t as Bug } from "./bug-C9dS9sXv.js";
import "./TraceTimeline-hpw2Rng1.js";
import { t as CircleHelp } from "./circle-help-DKzY4WtF.js";
import { t as ImagePlus } from "./image-plus-BuPlA6zp.js";
import { t as Lightbulb } from "./lightbulb-c8CTbRJA.js";
import "./WorkTrace-CQMphqAB.js";
import { Bc as require_jsx_runtime, Et as openExternalUrl, Vi as ExternalLink, Xc as require_react, na as createLucideIcon, oc as useT, si as X, tl as __toESM } from "./index-BOzhgzD7.js";
import "./lib-BoWxqGgd.js";
import "./petStage-CMRGLgJ7.js";
import "./toolDiff-CkONUaSH.js";
import "./visualFence-DOGBhazZ.js";
import "./McpLogo-Xry4yg3E.js";
import "./VoiceWorkTrace-CbMeKDQm.js";
import "./DictationButton-Bx-A0TOD.js";
import "./ThinkingTrace-CiOesUk4.js";
import "./PageHeader-DcwsywY0.js";
import { t as ViewHeader } from "./ChatsView-vmGpziEG.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MessageSquareWarning = createLucideIcon("MessageSquareWarning", [
	["path", {
		d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
		key: "1lielz"
	}],
	["path", {
		d: "M12 7v2",
		key: "stiyo7"
	}],
	["path", {
		d: "M12 13h.01",
		key: "y0uutt"
	}]
]);
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ThumbsUp = createLucideIcon("ThumbsUp", [["path", {
	d: "M7 10v12",
	key: "1qc93n"
}], ["path", {
	d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
	key: "emmmcr"
}]]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var BASE = "/api/feedback";
async function fetchFeedbackStatus() {
	const res = await fetch(`${BASE}/status`, { cache: "no-store" });
	if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
	return await res.json();
}
async function fetchFeedbackBoard() {
	const res = await fetch(`${BASE}/board`, { cache: "no-store" });
	if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
	return await res.json();
}
async function submitFeedback(payload) {
	const res = await fetch(BASE, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		cache: "no-store",
		body: JSON.stringify(payload)
	});
	if (!res.ok) {
		let detail = `${res.status} ${res.statusText}`;
		try {
			const body = await res.json();
			if (typeof body.detail === "string") detail = body.detail;
		} catch {}
		throw new Error(detail);
	}
	return await res.json();
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var DISCORD_BUG_FORUM_URL = "https://discord.com/channels/1511102439066177656/1521522036709789736";
var DISCORD_INVITE_URL = "https://discord.gg/x7USduHxbc";
var SCREENSHOT_MAX_BYTES = 8 * 1024 * 1024;
var TITLE_MAX = 200;
var FIELD_MAX = 4e3;
var URL_MAX_CHARS = 6e3;
var FALLBACK_TEMPLATES = {
	bug: "bug_report.yml",
	idea: "feature_request.yml",
	question: null
};
var INPUT_CLS = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40";
function DiscordIcon({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "currentColor",
		className,
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.036A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" })
	});
}
function buildIssueUrl(channel, type, title, primary, secondary) {
	const templates = channel.templates ?? FALLBACK_TEMPLATES;
	const template = type in templates ? templates[type] : FALLBACK_TEMPLATES[type];
	if (!template) return null;
	const prefix = type === "bug" ? "[Bug]: " : "[Feature]: ";
	const base = `${channel.github_url}/new`;
	const compose = (a$1, b$1) => {
		const params = new URLSearchParams({ template });
		params.set("title", `${prefix}${title.trim()}`);
		if (type === "bug") {
			params.set("what-happened", a$1);
			if (b$1) params.set("steps", b$1);
			if (channel.context.os_choice) params.set("os", channel.context.os_choice);
			if (channel.context.python) params.set("python", channel.context.python);
		} else {
			params.set("problem", a$1);
			if (b$1) params.set("solution", b$1);
		}
		return `${base}?${params.toString()}`;
	};
	let a = primary.trim();
	let b = secondary.trim();
	let url = compose(a, b);
	if (url.length <= URL_MAX_CHARS) return {
		url,
		trimmed: false
	};
	const ELLIPSIS = "\n\n[…]";
	while (url.length > URL_MAX_CHARS && (a.length > 40 || b.length > 40)) {
		const step = Math.max(50, Math.ceil((url.length - URL_MAX_CHARS) / 6));
		if (a.length >= b.length) a = a.slice(0, Math.max(40, a.length - step));
		else b = b.slice(0, Math.max(40, b.length - step));
		url = compose(a ? a + ELLIPSIS : a, b ? b + ELLIPSIS : b);
	}
	return {
		url,
		trimmed: true
	};
}
function composePlainText(type, title, primary, secondary, channel) {
	const lines = [
		title.trim(),
		"",
		primary.trim()
	];
	if (secondary.trim()) lines.push("", secondary.trim());
	if (channel) lines.push("", "---", `- Type: ${type}`, `- App version: ${channel.context.app_version}`, `- OS: ${channel.context.os}`, `- Python: ${channel.context.python}`);
	return lines.join("\n");
}
function BoardRow({ entry, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => void openExternalUrl(entry.url),
		className: "group flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-muted/50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex shrink-0 items-center gap-1 rounded-md border border-border px-1.5 py-0.5 text-xs tabular-nums text-muted-foreground",
				"aria-label": `${entry.upvotes} ${label}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsUp, {
					className: "h-3 w-3",
					"aria-hidden": "true"
				}), entry.upvotes]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 flex-1 truncate text-sm text-foreground",
				children: entry.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
				className: "h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100",
				"aria-hidden": "true"
			})
		]
	}) });
}
function FeedbackView() {
	const t = useT();
	const [channel, setChannel] = (0, import_react.useState)(null);
	const [board, setBoard] = (0, import_react.useState)(null);
	const [type, setType] = (0, import_react.useState)("bug");
	const [title, setTitle] = (0, import_react.useState)("");
	const [primary, setPrimary] = (0, import_react.useState)("");
	const [secondary, setSecondary] = (0, import_react.useState)("");
	const [screenshot, setScreenshot] = (0, import_react.useState)(null);
	const [screenshotTooLarge, setScreenshotTooLarge] = (0, import_react.useState)(false);
	const [sending, setSending] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const fileRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		fetchFeedbackStatus().then((status) => {
			if (!cancelled) setChannel(status);
		}).catch(() => {});
		fetchFeedbackBoard().then((data) => {
			if (!cancelled) setBoard(data);
		}).catch(() => {});
		return () => {
			cancelled = true;
		};
	}, []);
	const canDispatchDirect = channel?.configured === true;
	const isQuestion = type === "question";
	const onPickScreenshot = (0, import_react.useCallback)((ev) => {
		const file = ev.target.files?.[0];
		ev.target.value = "";
		if (!file) return;
		if (file.size > SCREENSHOT_MAX_BYTES) {
			setScreenshotTooLarge(true);
			return;
		}
		setScreenshotTooLarge(false);
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === "string") setScreenshot(reader.result);
		};
		reader.readAsDataURL(file);
	}, []);
	const canSubmit = title.trim().length > 0 && primary.trim().length > 0 && !sending && channel !== null;
	const resetForm = (0, import_react.useCallback)(() => {
		setTitle("");
		setPrimary("");
		setSecondary("");
		setScreenshot(null);
	}, []);
	const onOpenGithub = (0, import_react.useCallback)(async () => {
		if (!canSubmit || !channel) return;
		setResult(null);
		const composed = buildIssueUrl(channel, type, title, primary, secondary);
		if (!composed) return;
		if (composed.trimmed) try {
			await navigator.clipboard.writeText(composePlainText(type, title, primary, secondary, channel));
		} catch {}
		await openExternalUrl(composed.url);
		setResult(composed.trimmed ? "github_opened_trimmed" : "github_opened");
	}, [
		canSubmit,
		channel,
		primary,
		secondary,
		title,
		type
	]);
	const onSendDirect = (0, import_react.useCallback)(async () => {
		if (!canSubmit) return;
		setResult(null);
		setSending(true);
		try {
			const description = secondary.trim() ? `${primary.trim()}\n\n${secondary.trim()}` : primary.trim();
			const res = await submitFeedback({
				type,
				title: title.trim(),
				description,
				screenshot
			});
			if (res.status === "sent") {
				setResult("sent");
				resetForm();
			} else if (res.status === "not_configured") {
				setResult("not_configured");
				if (channel) setChannel({
					...channel,
					configured: false
				});
			} else setResult("error");
		} catch {
			setResult("error");
		} finally {
			setSending(false);
		}
	}, [
		canSubmit,
		channel,
		primary,
		resetForm,
		screenshot,
		secondary,
		title,
		type
	]);
	const typeOptions = [
		{
			value: "bug",
			label: t("feedback.type_bug"),
			icon: Bug
		},
		{
			value: "idea",
			label: t("feedback.type_idea"),
			icon: Lightbulb
		},
		{
			value: "question",
			label: t("feedback.type_question"),
			icon: CircleHelp
		}
	];
	const fieldLabels = (0, import_react.useMemo)(() => {
		if (type === "bug") return {
			primary: t("feedback.bug_what_label"),
			primaryPh: t("feedback.bug_what_placeholder"),
			secondary: t("feedback.bug_steps_label"),
			secondaryPh: t("feedback.bug_steps_placeholder")
		};
		return {
			primary: t("feedback.idea_problem_label"),
			primaryPh: t("feedback.idea_problem_placeholder"),
			secondary: t("feedback.idea_solution_label"),
			secondaryPh: t("feedback.idea_solution_placeholder")
		};
	}, [t, type]);
	const resultBanner = {
		sent: {
			text: t("feedback.result_sent"),
			cls: "border-muted-foreground/40 bg-muted-foreground/10 text-muted-foreground"
		},
		error: {
			text: t("feedback.result_error"),
			cls: "border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400"
		},
		not_configured: {
			text: t("feedback.result_not_configured"),
			cls: "border-foreground/40 bg-foreground/10 text-foreground"
		},
		github_opened: {
			text: t("feedback.result_github_opened"),
			cls: "border-border bg-muted/30 text-muted-foreground"
		},
		github_opened_trimmed: {
			text: t("feedback.result_github_trimmed"),
			cls: "border-foreground/40 bg-foreground/10 text-foreground"
		}
	};
	const ideas = board?.available ? board.ideas : [];
	const bugs = board?.available ? board.bugs : [];
	const hasBoard = ideas.length > 0 || bugs.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col overflow-y-auto scrollbar-jarvis",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewHeader, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareWarning, { className: "h-4 w-4 text-primary" }),
			title: t("nav.feedback"),
			subtitle: t("feedback.subtitle")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid flex-1 items-start gap-8 px-8 pb-10 pt-2 lg:grid-cols-[minmax(0,1fr)_22rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					id: "feedback-type-label",
					className: "mb-1.5 block text-xs font-medium text-muted-foreground",
					children: t("feedback.type_label")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					role: "radiogroup",
					"aria-labelledby": "feedback-type-label",
					className: "grid grid-cols-3 gap-2",
					children: typeOptions.map(({ value, label, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "radio",
						"aria-checked": type === value,
						onClick: () => {
							setType(value);
							setResult(null);
						},
						className: "flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-sm transition " + (type === value ? "border-primary/60 bg-primary/15 font-medium text-foreground" : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "h-4 w-4",
							"aria-hidden": "true"
						}), label]
					}, value))
				})] }), isQuestion ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 rounded-2xl border border-[#5865F2]/40 bg-[#5865F2]/10 p-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#5865F2]/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiscordIcon, { className: "h-7 w-7 text-[#5865F2]" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-semibold text-foreground",
							children: t("feedback.question_title")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "pb-1 text-sm text-muted-foreground",
							children: t("feedback.question_hint")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void openExternalUrl(DISCORD_INVITE_URL),
							className: "w-full rounded-lg bg-[#5865F2] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4752c4]",
							children: t("feedback.question_discord_button")
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (ev) => {
						ev.preventDefault();
						onOpenGithub();
					},
					className: "space-y-4 rounded-2xl border border-border bg-card/60 p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "feedback-title",
							className: "mb-1.5 block text-xs font-medium text-muted-foreground",
							children: t("feedback.title_label")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "feedback-title",
							type: "text",
							value: title,
							maxLength: TITLE_MAX,
							onChange: (ev) => setTitle(ev.target.value),
							placeholder: t("feedback.title_placeholder"),
							className: INPUT_CLS
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "feedback-primary",
							className: "mb-1.5 block text-xs font-medium text-muted-foreground",
							children: fieldLabels.primary
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "feedback-primary",
							rows: 7,
							value: primary,
							maxLength: FIELD_MAX,
							onChange: (ev) => setPrimary(ev.target.value),
							placeholder: fieldLabels.primaryPh,
							className: `${INPUT_CLS} resize-y`
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "feedback-secondary",
							className: "mb-1.5 block text-xs font-medium text-muted-foreground",
							children: fieldLabels.secondary
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "feedback-secondary",
							rows: 5,
							value: secondary,
							maxLength: FIELD_MAX,
							onChange: (ev) => setSecondary(ev.target.value),
							placeholder: fieldLabels.secondaryPh,
							className: `${INPUT_CLS} resize-y`
						})] }),
						canDispatchDirect ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1.5 block text-xs font-medium text-muted-foreground",
								children: t("feedback.screenshot_label")
							}),
							screenshot ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative overflow-hidden rounded-lg border border-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: screenshot,
									alt: t("feedback.screenshot_preview_alt"),
									className: "max-h-48 w-full bg-background object-contain"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setScreenshot(null),
									"aria-label": t("feedback.screenshot_remove"),
									className: "absolute right-2 top-2 rounded-md bg-background/80 p-1 text-muted-foreground transition hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
										className: "h-4 w-4",
										"aria-hidden": "true"
									})
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => fileRef.current?.click(),
								className: "flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border px-3 py-4 text-sm text-muted-foreground transition hover:border-primary/50 hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, {
									className: "h-4 w-4",
									"aria-hidden": "true"
								}), t("feedback.screenshot_pick")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								type: "file",
								accept: "image/*",
								className: "hidden",
								onChange: onPickScreenshot
							}),
							screenshotTooLarge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-xs text-red-500",
								role: "alert",
								children: t("feedback.screenshot_too_large")
							}) : null
						] }) : null,
						result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "status",
							className: `rounded-lg border px-3 py-2 text-sm ${resultBanner[result].cls}`,
							children: resultBanner[result].text
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: !canSubmit,
								className: "flex items-center justify-center gap-2 rounded-lg bg-foreground/70 px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
									className: "h-4 w-4",
									"aria-hidden": "true"
								}), type === "bug" ? t("feedback.github_submit_bug") : t("feedback.github_submit_idea")]
							}), canDispatchDirect ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void onSendDirect(),
								disabled: !canSubmit,
								className: "order-first rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50",
								children: sending ? t("feedback.sending") : t("feedback.send_without_github")
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs leading-relaxed text-muted-foreground",
							children: t("feedback.github_login_note")
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "min-w-0 space-y-4 lg:sticky lg:top-2",
				children: [hasBoard ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 rounded-2xl border border-border bg-card/40 p-5",
					children: [
						ideas.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: t("feedback.board_ideas_title")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: ideas.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardRow, {
							entry,
							label: t("feedback.board_upvotes")
						}, entry.number)) })] }) : null,
						bugs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: t("feedback.board_bugs_title")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: bugs.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardRow, {
							entry,
							label: t("feedback.board_upvotes")
						}, entry.number)) })] }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => void openExternalUrl(channel?.github_url ?? ""),
							className: "flex w-full items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground",
							children: [t("feedback.board_see_all"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
								className: "h-3 w-3",
								"aria-hidden": "true"
							})]
						})
					]
				}) : null, !isQuestion ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 rounded-xl border border-border bg-card/30 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiscordIcon, { className: "h-5 w-5 shrink-0 text-[#5865F2]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-sm text-muted-foreground",
							children: t("feedback.community_hint")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void openExternalUrl(DISCORD_BUG_FORUM_URL),
						className: "shrink-0 text-sm font-medium text-[#5865F2] transition hover:underline",
						children: t("feedback.community_open")
					})]
				}) : null]
			})]
		})]
	});
}
export { FeedbackView };
