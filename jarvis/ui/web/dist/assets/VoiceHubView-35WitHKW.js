import { t as BookOpen } from "./book-open-DEmwG-44.js";
import "./TraceTimeline-hpw2Rng1.js";
import { t as Check } from "./check-vbwKkbPq.js";
import { t as Cloud } from "./cloud-BsupiYNR.js";
import { a as Cpu, i as useTierHealth, r as makeProviderCategories, t as ProviderCategory } from "./ProviderTierSection-BgNdnN0l.js";
import "./ProviderLogo-BxoN_q6P.js";
import { t as Pencil } from "./pencil-CD-5mlhp.js";
import { t as PlugZap } from "./plug-zap-Bf7gZfvH.js";
import "./WorkTrace-CQMphqAB.js";
import { Bc as require_jsx_runtime, Di as Mic, F as robustCopy, Fi as Info, Fr as useProviders, Gs as fill, Ln as cn, Ni as Keyboard, Oa as DICTATION_SETTINGS_EVENT, Pi as KeyRound, Wi as Copy, Xc as require_react, Yc as require_react_dom, Zi as ArrowRight, bi as Plus, ci as Volume2, di as Square, gi as Search, ji as LoaderCircle, ka as announceDictationSettings, li as TriangleAlert, ln as Button, na as createLucideIcon, oc as useT, qi as ChevronDown, qt as useUserName, si as X, st as Card, tl as __toESM, ui as Trash2, vi as RotateCcw, wc as useEventStore } from "./index-BOzhgzD7.js";
import { u as useKeybinds } from "./useHotkey-DslvxXH_.js";
import "./lib-BoWxqGgd.js";
import "./petStage-CMRGLgJ7.js";
import "./toolDiff-CkONUaSH.js";
import "./visualFence-DOGBhazZ.js";
import "./McpLogo-Xry4yg3E.js";
import "./VoiceWorkTrace-CbMeKDQm.js";
import { t as Combobox } from "./combobox-BL3mwl7r.js";
import "./select-vogX_D37.js";
import { t as Switch } from "./switch-hmH-TV55.js";
import "./DictationButton-Bx-A0TOD.js";
import "./ThinkingTrace-CiOesUk4.js";
import { i as formatCombo, r as KeybindRow } from "./KeybindRow-CsBDhzH4.js";
import { t as ApiKeyForm } from "./ApiKeyForm-DwgnNKoR.js";
import { t as Badge } from "./badge-yXLOnH3Y.js";
import "./PageHeader-DcwsywY0.js";
import { t as SectionTabBar } from "./SectionTabBar-Cj6UhxEH.js";
import { t as ViewHeader } from "./ChatsView-vmGpziEG.js";
import { t as LanguageSelect } from "./language-select-DymEvwpT.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var BookA = createLucideIcon("BookA", [
	["path", {
		d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
		key: "k3hazp"
	}],
	["path", {
		d: "m8 13 4-7 4 7",
		key: "4rari8"
	}],
	["path", {
		d: "M9.1 11h5.7",
		key: "1gkovt"
	}]
]);
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Languages = createLucideIcon("Languages", [
	["path", {
		d: "m5 8 6 6",
		key: "1wu5hv"
	}],
	["path", {
		d: "m4 14 6-6 2-3",
		key: "1k1g8d"
	}],
	["path", {
		d: "M2 5h12",
		key: "or177f"
	}],
	["path", {
		d: "M7 2h1",
		key: "1t2jsx"
	}],
	["path", {
		d: "m22 22-5-10-5 10",
		key: "don7ne"
	}],
	["path", {
		d: "M14 18h6",
		key: "1m8k6r"
	}]
]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function SkeletonBar({ className, style }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": true,
		className: cn("block rounded-md bg-sheen/[0.06]", className),
		style
	});
}
const DICTATION_OUTCOMES = [
	"inserted",
	"paste_sent",
	"clipboard_only",
	"unavailable",
	"chat",
	"partial",
	"empty",
	"cancelled",
	"failed"
];
const STT_FAILURE_REASONS = [
	"rate_limited",
	"no_credit",
	"bad_key",
	"unavailable",
	"rejected",
	"engine_busy",
	"recording_interrupted",
	"no_stt",
	"unknown"
];
const POLISH_STATUSES = [
	"applied",
	"translated",
	"unchanged",
	"off",
	"unavailable",
	"local_only",
	"skipped_short",
	"skipped_long",
	"timeout",
	"provider_error",
	"rejected_drift",
	"prompted"
];
const DICTATION_CLEANUP_REASONS = [
	"disabled",
	"no_rules",
	"ceiling",
	"empty",
	"error"
];
var KNOWN_POLISH_STATUSES = new Set(POLISH_STATUSES);
var KNOWN_CLEANUP_REASONS = new Set(DICTATION_CLEANUP_REASONS);
function polishStatusLabel(t, status) {
	return KNOWN_POLISH_STATUSES.has(status) ? t(`dictation.polish_status.${status}`) : status;
}
function cleanupReasonLabel(t, reason) {
	return KNOWN_CLEANUP_REASONS.has(reason) ? t(`dictation.cleanup_reason.${reason}`) : reason;
}
async function unwrap$1(res) {
	const body = await res.json().catch(() => ({}));
	if (!res.ok) throw new Error(body.detail ?? `HTTP ${res.status}`);
	return body;
}
async function testDictationPolish() {
	return unwrap$1(await fetch("/api/dictation/polish/test", { method: "POST" }));
}
function useDictation() {
	const [status, setStatus] = (0, import_react.useState)(null);
	const [settings, setSettings] = (0, import_react.useState)(null);
	const [choices, setChoices] = (0, import_react.useState)(null);
	const [wordingProvider, setWordingProvider] = (0, import_react.useState)(null);
	const [custom, setCustom] = (0, import_react.useState)(null);
	const [entries, setEntries] = (0, import_react.useState)([]);
	const [stats, setStats] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const refetchStatus = (0, import_react.useCallback)(async () => {
		try {
			setStatus(await unwrap$1(await fetch("/api/dictation/status")));
		} catch (e) {
			setError(e.message);
		}
	}, []);
	const refetchHistory = (0, import_react.useCallback)(async () => {
		try {
			setEntries((await unwrap$1(await fetch("/api/dictation/history?limit=50&include_discarded=true"))).entries ?? []);
		} catch (e) {
			setError(e.message);
		}
	}, []);
	const refetchStats = (0, import_react.useCallback)(async () => {
		try {
			setStats(await unwrap$1(await fetch("/api/dictation/stats")));
		} catch {
			setStats(null);
		}
	}, []);
	const refetch = (0, import_react.useCallback)(async () => {
		setError(null);
		try {
			const data = await unwrap$1(await fetch("/api/dictation/settings"));
			setSettings(data.settings);
			setChoices(data.choices);
			setCustom(data.custom ?? null);
			setWordingProvider(data.wording_provider ?? null);
			await Promise.all([
				refetchStatus(),
				refetchHistory(),
				refetchStats()
			]);
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}, [
		refetchStatus,
		refetchHistory,
		refetchStats
	]);
	(0, import_react.useEffect)(() => {
		refetch();
	}, [refetch]);
	(0, import_react.useEffect)(() => {
		const onSettings = (ev) => {
			const detail = ev.detail;
			if (!detail?.settings) return;
			setSettings((prev) => prev ? {
				...prev,
				...detail.settings
			} : prev);
		};
		window.addEventListener(DICTATION_SETTINGS_EVENT, onSettings);
		return () => window.removeEventListener(DICTATION_SETTINGS_EVENT, onSettings);
	}, []);
	const start = (0, import_react.useCallback)(async (target = "auto") => {
		await unwrap$1(await fetch("/api/dictation/start", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ target })
		}));
		await refetchStatus();
	}, [refetchStatus]);
	const stop = (0, import_react.useCallback)(async () => {
		await unwrap$1(await fetch("/api/dictation/stop", { method: "POST" }));
		await refetchStatus();
		await refetchHistory();
		await refetchStats();
	}, [
		refetchStatus,
		refetchHistory,
		refetchStats
	]);
	const saveSettings = (0, import_react.useCallback)(async (patch) => {
		const data = await unwrap$1(await fetch("/api/dictation/settings", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				...patch,
				persist: true
			})
		}));
		setSettings(data.settings);
		announceDictationSettings(data.settings);
		if ("polish_provider" in patch) {
			setWordingProvider(null);
			try {
				setWordingProvider((await unwrap$1(await fetch("/api/dictation/settings"))).wording_provider ?? null);
			} catch (e) {
				setError(e.message);
			}
		}
		await refetchStatus();
	}, [refetchStatus]);
	const discardEntry = (0, import_react.useCallback)(async (id) => {
		const data = await unwrap$1(await fetch(`/api/dictation/history/${encodeURIComponent(id)}/discard`, { method: "POST" }));
		setEntries((prev) => prev.map((e) => e.id === id ? data.entry ?? {
			...e,
			discarded: true
		} : e));
	}, []);
	const restoreEntry = (0, import_react.useCallback)(async (id) => {
		const data = await unwrap$1(await fetch(`/api/dictation/history/${encodeURIComponent(id)}/restore`, { method: "POST" }));
		setEntries((prev) => prev.map((e) => e.id === id ? data.entry ?? {
			...e,
			discarded: false
		} : e));
		return data;
	}, []);
	const deleteEntry = (0, import_react.useCallback)(async (id) => {
		await unwrap$1(await fetch(`/api/dictation/history/${encodeURIComponent(id)}`, { method: "DELETE" }));
		setEntries((prev) => prev.filter((e) => e.id !== id));
	}, []);
	const clearHistory = (0, import_react.useCallback)(async () => {
		await unwrap$1(await fetch("/api/dictation/history", { method: "DELETE" }));
		setEntries([]);
		await refetchStats();
	}, [refetchStats]);
	return {
		status,
		settings,
		choices,
		wordingProvider,
		custom,
		entries,
		stats,
		loading,
		error,
		start,
		stop,
		saveSettings,
		copyEntry: (0, import_react.useCallback)(async (id) => {
			const entry = entries.find((e) => e.id === id);
			if (!entry) return false;
			return robustCopy(entry.text || entry.raw_text);
		}, [entries]),
		discardEntry,
		restoreEntry,
		deleteEntry,
		clearHistory,
		refetch,
		refetchStatus,
		refetchHistory,
		refetchStats
	};
}
var dictation_hero_default = "/assets/dictation-hero-Dh4olzV0.webp";
var PLATE = "#050507";
function DictationHero({ status, loading, busy, onToggle, onOpenShortcuts }) {
	const t = useT();
	const active = Boolean(status?.active);
	const available = Boolean(status?.available);
	const hotkey = status?.hotkey ?? "";
	const handsFree = status?.hotkey_toggle ?? "";
	const stateLabel = active ? t("dictation.state_active") : available ? t("dictation.state_ready") : t("dictation.state_unavailable");
	const dotFill = active ? "bg-success motion-safe:animate-pulse" : available ? "bg-white/70" : "bg-destructive";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate overflow-hidden rounded-2xl ring-1 ring-border",
		style: { backgroundColor: PLATE },
		"data-testid": "dictation-hero",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: dictation_hero_default,
				alt: "",
				"aria-hidden": "true",
				draggable: false,
				className: "pointer-events-none absolute inset-y-0 right-0 h-full w-full select-none object-cover object-right sm:w-[78%]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute inset-0",
				style: { background: `linear-gradient(90deg, ${PLATE} 0%, ${PLATE} 30%, rgb(5 5 7 / 0.82) 48%, rgb(5 5 7 / 0.25) 72%, rgb(5 5 7 / 0) 100%)` }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex min-h-[232px] flex-col justify-center gap-5 px-6 py-7 sm:px-9",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/85 ring-1 ring-white/10 backdrop-blur-sm",
						"data-testid": "dictation-state",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-1.5 w-1.5 shrink-0 rounded-full", dotFill) }), loading ? t("dictation.loading") : stateLabel]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-[520px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-[30px] font-semibold leading-[36px] tracking-[-0.02em] text-white [text-wrap:balance]",
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-8 w-72 max-w-full animate-pulse rounded-md bg-white/10" }) : active ? t("dictation.hero_listening") : available && hotkey ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldTitle, {
									template: t("dictation.hero_hold"),
									combo: hotkey
								}) : t("dictation.hero_no_key")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-base text-white/70",
								children: !loading && !available ? status?.reason || t("dictation.state_unavailable") : active ? t("dictation.hero_body_active") : t("dictation.hero_body")
							}),
							available && !active && handsFree && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-white/50",
								children: t("dictation.hero_hands_free").replace("{0}", formatCombo(handsFree))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: loading || busy || !available,
							"data-testid": "dictation-toggle",
							onClick: onToggle,
							className: "inline-flex h-9 items-center gap-2 rounded-md bg-white px-4 text-base font-medium text-neutral-900 transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:cursor-not-allowed disabled:opacity-50",
							children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								"aria-hidden": "true",
								className: "h-4 w-4 animate-spin motion-reduce:animate-none"
							}) : active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, {
								"aria-hidden": "true",
								className: "h-4 w-4"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, {
								"aria-hidden": "true",
								className: "h-4 w-4"
							}), active ? t("dictation.stop") : t("dictation.start")]
						}), !loading && available && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onOpenShortcuts,
							"data-testid": "dictation-open-shortcuts",
							className: "inline-flex h-9 items-center gap-2 rounded-md px-3 text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, {
								"aria-hidden": "true",
								className: "h-4 w-4"
							}), hotkey ? t("dictation.hero_shortcuts") : t("dictation.hero_assign")]
						})]
					})
				]
			})
		]
	});
}
function HoldTitle({ template, combo }) {
	const [before, after = ""] = template.split("{0}");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		before,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "whitespace-nowrap rounded-lg bg-white/10 px-2 py-0.5 font-semibold text-white ring-1 ring-white/15",
			children: formatCombo(combo)
		}),
		after
	] });
}
function DictationStatsCard({ stats }) {
	const t = useT();
	const windowLabel = stats.source === "lifetime" ? t("dictation.stats.window_lifetime") : t("dictation.stats.window_days").replace("{0}", String(stats.window.days));
	const days = (0, import_react.useMemo)(() => lastDays(stats.by_day, 14), [stats.by_day]);
	const peak = Math.max(1, ...days.map((d) => d.words));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-card p-5 shadow-rim",
		"data-testid": "dictation-stats",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground",
				"data-testid": "dictation-stats-window",
				children: windowLabel
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: formatCompact(stats.totals.words),
						exact: formatCount(stats.totals.words),
						unit: t("dictation.stats.words_unit"),
						label: t("dictation.stats.words"),
						testId: "dictation-stat-words"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: formatWpm(stats.totals.wpm),
						unit: t("dictation.stats.wpm_unit"),
						label: t("dictation.stats.wpm"),
						testId: "dictation-stat-wpm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: formatCount(stats.streak.current_days),
						unit: t("dictation.stats.streak_unit"),
						label: t("dictation.stats.streak"),
						testId: "dictation-stat-streak"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 border-t border-border pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("dictation.stats.activity") }), stats.streak.longest_days > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-testid": "dictation-stat-best",
							children: t("dictation.stats.best_streak").replace("{0}", formatCount(stats.streak.longest_days))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex h-14 items-end gap-[3px]",
						role: "img",
						"aria-label": t("dictation.stats.activity"),
						"data-testid": "dictation-activity",
						children: days.map((day, i) => {
							const today = i === days.length - 1;
							const pct = day.words > 0 ? Math.max(8, day.words / peak * 100) : 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								title: t("dictation.stats.activity_day").replace("{0}", day.label).replace("{1}", formatCount(day.words)),
								className: cn("min-h-[2px] flex-1 rounded-[3px] transition-colors", day.words === 0 ? "bg-secondary" : today ? "bg-foreground-strong" : "bg-muted-foreground/45 hover:bg-muted-foreground/70"),
								style: { height: day.words > 0 ? `${pct}%` : void 0 }
							}, day.date);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-foreground-secondary",
						children: t("dictation.stats.today").replace("{0}", formatCount(stats.today.words))
					})
				]
			})
		]
	});
}
function Stat({ value, exact, unit, label, testId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "sr-only",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
			className: "flex items-baseline gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[28px] font-semibold leading-[32px] tracking-[-0.02em] tabular-nums text-foreground-strong",
				title: exact && exact !== value ? exact : void 0,
				"data-testid": testId,
				children: value
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-base text-muted-foreground",
				children: unit
			})]
		})]
	});
}
function lastDays(byDay, count) {
	const words = /* @__PURE__ */ new Map();
	for (const day of byDay ?? []) words.set(day.date, day.words);
	const out = [];
	const cursor = /* @__PURE__ */ new Date();
	cursor.setHours(12, 0, 0, 0);
	cursor.setDate(cursor.getDate() - (count - 1));
	for (let i = 0; i < count; i += 1) {
		const key = localKey(cursor);
		out.push({
			date: key,
			label: cursor.toLocaleDateString(void 0, {
				month: "short",
				day: "numeric"
			}),
			words: words.get(key) ?? 0
		});
		cursor.setDate(cursor.getDate() + 1);
	}
	return out;
}
function localKey(date) {
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${date.getFullYear()}-${month}-${day}`;
}
function formatCount(value) {
	if (!Number.isFinite(value)) return "—";
	return Math.round(value).toLocaleString();
}
function formatCompact(value) {
	if (!Number.isFinite(value)) return "—";
	if (Math.abs(value) < 1e4) return formatCount(value);
	return new Intl.NumberFormat(void 0, {
		notation: "compact",
		maximumFractionDigits: 1
	}).format(value);
}
function formatWpm(value) {
	if (!Number.isFinite(value) || value <= 0) return "—";
	return value >= 10 ? String(Math.round(value)) : value.toFixed(1);
}
function DictationEngineCard({ engine }) {
	const t = useT();
	const Icon = engine.local ? Cpu : Cloud;
	const detail = engine.local ? engine.fallback ? t("dictation.engine_fallback").replace("{0}", engine.fallback) : "" : engine.detail ? t("dictation.engine_local_off").replace("{0}", engine.detail) : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-card p-5 shadow-rim",
		"data-testid": "dictation-engine",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground",
				children: t("dictation.engine_title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						"aria-hidden": "true",
						className: "h-4 w-4"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base font-medium text-foreground-strong",
						children: engine.local ? t("dictation.engine_on_device") : t("dictation.engine_cloud_short")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm text-muted-foreground",
						title: engine.model || engine.provider,
						children: engine.model || engine.provider
					})]
				})]
			}),
			detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: detail
			})
		]
	});
}
function DictationVocabularyCard({ onOpen }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-card p-5 shadow-rim",
		"data-testid": "dictation-vocabulary",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
					"aria-hidden": "true",
					className: "h-4 w-4"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 text-base font-semibold text-foreground-strong",
				children: t("dictation.vocab_title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: t("dictation.vocab_body")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onOpen,
				"data-testid": "dictation-open-dictionary",
				className: "mt-4 inline-flex h-9 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				children: [t("dictation.vocab_cta"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
					"aria-hidden": "true",
					className: "h-4 w-4"
				})]
			})
		]
	});
}
function DictationHistoryGroup({ label, entries, onCopy, onDiscard, onRestore, onDelete, busyIds, copiedId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-testid": "dictation-history-group",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
			className: "px-1 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground",
			"data-testid": "dictation-history-group-label",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-2 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card shadow-rim",
			children: entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryRow, {
				entry,
				busy: busyIds.has(entry.id),
				copied: copiedId === entry.id,
				onCopy: () => onCopy(entry),
				onDiscard: () => onDiscard(entry),
				onRestore: () => onRestore(entry),
				onDelete: () => onDelete(entry)
			}, entry.id))
		})]
	});
}
function outcomeVariant(outcome) {
	if (outcome === "failed") return "fault";
	if (outcome === "unavailable" || outcome === "partial" || outcome === "empty") return "degraded";
	return null;
}
function HistoryRow({ entry, busy, copied, onCopy, onDiscard, onRestore, onDelete }) {
	const t = useT();
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(false);
	const [showRaw, setShowRaw] = (0, import_react.useState)(false);
	const cleaned = Boolean(entry.raw_text) && entry.text !== entry.raw_text;
	const polishBadge = entry.polish_status && entry.polish_status !== "off" ? entry.polish_status : "";
	const polishTitle = [entry.polish_provider || "", entry.polish_latency_ms ? `${Math.round(entry.polish_latency_ms)} ms` : ""].filter(Boolean).join(" · ");
	const cleanupBadge = entry.cleanup_reason && entry.cleanup_reason !== "disabled" ? entry.cleanup_reason : "";
	const canRestore = entry.discarded || entry.audio_available || entry.outcome === "failed" || entry.outcome === "partial";
	const variant = entry.outcome ? outcomeVariant(entry.outcome) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "group grid grid-cols-[64px_minmax(0,1fr)_auto] gap-x-4 px-5 py-4 transition-colors hover:bg-secondary/60 focus-within:bg-secondary/60 sm:grid-cols-[84px_minmax(0,1fr)_auto]",
		"data-testid": "dictation-history-row",
		"data-entry-id": entry.id,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
				dateTime: entry.created_at,
				className: "pt-0.5 text-sm tabular-nums text-muted-foreground",
				children: formatTime(entry.created_at)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("whitespace-pre-wrap break-words text-base leading-6", entry.discarded ? "text-muted-foreground line-through" : "text-foreground"),
						children: entry.text || entry.raw_text
					}),
					entry.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 break-words text-sm text-destructive",
						"data-testid": "dictation-failure-reason",
						children: failureLabel(t, entry.error)
					}),
					cleaned && showRaw && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 break-words border-l-2 border-border-strong pl-3 text-sm text-muted-foreground",
						"data-testid": "dictation-raw-text",
						children: [
							t("dictation.raw_prefix"),
							" ",
							entry.raw_text
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground",
						children: [
							entry.outcome && (variant ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant,
								"data-testid": "dictation-outcome-badge",
								children: outcomeLabel(t, entry.outcome)
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-testid": "dictation-outcome-badge",
								children: outcomeLabel(t, entry.outcome)
							})),
							entry.discarded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								"data-testid": "dictation-discarded-badge",
								children: t("dictation.discarded_badge")
							}),
							polishBadge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaItem, {
								testId: "dictation-polish-badge",
								title: polishTitle || void 0,
								children: polishStatusLabel(t, polishBadge)
							}),
							cleanupBadge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaItem, {
								testId: "dictation-cleanup-reason-badge",
								children: cleanupReasonLabel(t, cleanupBadge)
							}),
							entry.audio_available && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MetaItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {
								"aria-hidden": "true",
								className: "h-3 w-3"
							}), t("dictation.audio_kept")] }),
							cleaned && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setShowRaw((v) => !v),
								"aria-expanded": showRaw,
								"data-testid": "dictation-toggle-raw",
								className: "inline-flex items-center gap-0.5 rounded-sm text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-strong",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, {}),
									showRaw ? t("dictation.hide_original") : t("dictation.show_original"),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
										"aria-hidden": "true",
										className: cn("h-3 w-3 transition-transform", showRaw && "rotate-180")
									})
								]
							}),
							entry.discarded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: busy,
								onClick: () => {
									if (!confirmDelete) {
										setConfirmDelete(true);
										return;
									}
									onDelete();
								},
								"data-testid": "dictation-delete-permanently",
								className: cn("rounded-sm text-xs transition-colors hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-strong disabled:opacity-50", confirmDelete ? "font-medium text-destructive" : "text-muted-foreground"),
								children: confirmDelete ? `${t("dictation.delete_permanently")} ?` : t("dictation.delete_permanently")
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "-my-1 flex shrink-0 items-start gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowAction, {
						onClick: onCopy,
						label: copied ? t("dictation.copied") : t("dictation.copy"),
						testId: "dictation-copy-entry",
						children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							"aria-hidden": "true",
							className: "h-4 w-4"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							"aria-hidden": "true",
							className: "h-4 w-4"
						})
					}),
					canRestore && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowAction, {
						disabled: busy,
						onClick: onRestore,
						label: t("dictation.restore"),
						title: t("dictation.restore_hint"),
						testId: "dictation-restore-entry",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
							"aria-hidden": "true",
							className: "h-4 w-4"
						})
					}),
					!entry.discarded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowAction, {
						disabled: busy,
						onClick: onDiscard,
						label: t("dictation.discard"),
						testId: "dictation-discard-entry",
						destructive: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
							"aria-hidden": "true",
							className: "h-4 w-4"
						})
					})
				]
			})
		]
	});
}
function MetaItem({ children, testId, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "inline-flex items-center gap-1",
			"data-testid": testId,
			title,
			children
		})]
	});
}
function Dot() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": "true",
		className: "mr-1 text-faint-foreground",
		children: "·"
	});
}
function RowAction({ children, label, title, testId, onClick, disabled, destructive }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		disabled,
		onClick,
		"aria-label": label,
		title: title ?? label,
		"data-testid": testId,
		className: cn("rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-strong disabled:opacity-50", destructive ? "hover:text-destructive" : "hover:text-foreground"),
		children
	});
}
function formatTime(iso) {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return "";
	return date.toLocaleTimeString(void 0, {
		hour: "numeric",
		minute: "2-digit"
	});
}
var KNOWN_OUTCOMES = new Set(DICTATION_OUTCOMES);
var KNOWN_FAILURES = new Set(STT_FAILURE_REASONS);
function outcomeLabel(t, outcome) {
	return KNOWN_OUTCOMES.has(outcome) ? t(`dictation.outcome.${outcome}`) : outcome;
}
function failureLabel(t, reason) {
	return KNOWN_FAILURES.has(reason) ? t(`dictation.failure.${reason}`) : t("dictation.failure.unknown");
}
function DictationView({ hideHeader = false } = {}) {
	const t = useT();
	const userName = useUserName();
	const { status, entries, stats, loading, error, start, stop, copyEntry, discardEntry, restoreEntry, deleteEntry, clearHistory } = useDictation();
	const pushToast = useEventStore((s) => s.pushToast);
	const setActiveSection = useEventStore((s) => s.setActiveSection);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [busyIds, setBusyIds] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [copiedId, setCopiedId] = (0, import_react.useState)(null);
	async function onToggle() {
		setBusy(true);
		try {
			if (status?.active) await stop();
			else await start("auto");
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setBusy(false);
		}
	}
	async function withRowBusy(id, run) {
		setBusyIds((prev) => new Set(prev).add(id));
		try {
			await run();
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setBusyIds((prev) => {
				const next = new Set(prev);
				next.delete(id);
				return next;
			});
		}
	}
	async function onCopy(entry) {
		if (!await copyEntry(entry.id)) return;
		setCopiedId(entry.id);
		pushToast("success", t("dictation.copied"));
		window.setTimeout(() => setCopiedId((current) => current === entry.id ? null : current), 1500);
	}
	async function onRestore(entry) {
		await withRowBusy(entry.id, async () => {
			const result = await restoreEntry(entry.id);
			if (result.retranscribed || !result.detail) pushToast("success", t("dictation.restored"));
			else pushToast("warning", result.detail);
		});
	}
	const blocked = status?.insertion && !status.insertion.can_insert;
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		if (!q) return entries;
		return entries.filter((e) => e.text.toLowerCase().includes(q) || e.raw_text.toLowerCase().includes(q));
	}, [entries, query]);
	const groups = (0, import_react.useMemo)(() => groupByDay(filtered), [filtered]);
	const greeting = fill(t("dictation.welcome"), { name_part: userName ? `, ${userName}` : "" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [!hideHeader && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewHeader, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-4 w-4 text-foreground" }),
			title: t("dictation.title"),
			subtitle: t("dictation.description")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto scrollbar-jarvis",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full max-w-[1120px] px-6 pb-12 pt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold text-foreground-strong",
					"data-testid": "dictation-welcome",
					children: greeting
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid grid-cols-1 gap-6 [grid-template-areas:'hero'_'side'_'list'] xl:grid-cols-[minmax(0,1fr)_300px] xl:grid-rows-[auto_1fr] xl:[grid-template-areas:'hero_side'_'list_side']",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 flex-col gap-4 [grid-area:hero]",
							children: [
								error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-meta text-destructive",
									children: error
								}),
								blocked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-rim",
									"data-testid": "dictation-insert-warning",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
										"aria-hidden": "true",
										className: "mt-0.5 h-4 w-4 shrink-0 text-warning"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-title font-semibold text-foreground-strong",
											children: t("dictation.cannot_insert_title")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-meta text-muted-foreground",
											children: status?.insertion.detail || t("dictation.cannot_insert_generic")
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DictationHero, {
									status,
									loading,
									busy,
									onToggle: () => void onToggle(),
									onOpenShortcuts: () => setActiveSection("voice-shortcuts")
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
							className: "flex min-w-0 flex-col gap-4 [grid-area:side] xl:sticky xl:top-0 xl:self-start",
							children: [
								loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border bg-card p-5 shadow-rim",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, { className: "h-3 w-20" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 flex flex-col gap-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, { className: "h-8 w-40" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, { className: "h-8 w-32" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, { className: "h-8 w-36" })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, { className: "mt-5 h-14 w-full" })
									]
								}) : stats && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DictationStatsCard, { stats }),
								!loading && status?.available && status.engine?.provider && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DictationEngineCard, { engine: status.engine }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DictationVocabularyCard, { onOpen: () => setActiveSection("dictionary") })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-w-0 [grid-area:list]",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2",
								"aria-busy": "true",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, { className: "h-3 w-24" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, { className: "h-[220px] w-full rounded-xl" })]
							}) : entries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyHistory, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-base font-semibold text-foreground-strong",
									children: t("dictation.history_title")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
											"aria-hidden": "true",
											className: "pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: query,
											onChange: (e) => setQuery(e.target.value),
											placeholder: t("dictation.search_placeholder"),
											"aria-label": t("dictation.search_placeholder"),
											"data-testid": "dictation-search",
											className: "h-8 w-56 rounded-md bg-input pl-8 pr-3 text-sm text-foreground placeholder:text-faint-foreground focus:outline-none focus:ring-2 focus:ring-border-strong"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "ghost",
										className: "gap-2 text-muted-foreground",
										title: t("dictation.clear_history_hint"),
										"data-testid": "dictation-clear-history",
										onClick: () => {
											clearHistory().catch((e) => pushToast("error", e.message));
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
											"aria-hidden": "true",
											className: "h-3.5 w-3.5"
										}), t("dictation.clear_history")]
									})]
								})]
							}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 rounded-xl border border-dashed border-border px-block py-12 text-center text-body text-muted-foreground",
								"data-testid": "dictation-no-matches",
								children: t("dictionary.no_matches")
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex flex-col gap-6",
								"data-testid": "dictation-history",
								children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DictationHistoryGroup, {
									label: dayLabel(t, group.key),
									entries: group.entries,
									busyIds,
									copiedId,
									onCopy: (entry) => void onCopy(entry),
									onRestore: (entry) => void onRestore(entry),
									onDiscard: (entry) => {
										withRowBusy(entry.id, () => discardEntry(entry.id));
									},
									onDelete: (entry) => {
										withRowBusy(entry.id, () => deleteEntry(entry.id));
									}
								}, group.key))
							})] })
						})
					]
				})]
			})
		})]
	});
}
function EmptyHistory() {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center rounded-xl border border-dashed border-border px-6 py-12 text-center",
		"data-testid": "dictation-empty",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, {
					"aria-hidden": "true",
					className: "h-4 w-4"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 text-base font-semibold text-foreground-strong",
				children: t("dictation.empty_title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-sm text-sm text-muted-foreground",
				children: t("dictation.empty_body")
			})
		]
	});
}
function groupByDay(entries) {
	const byKey = /* @__PURE__ */ new Map();
	for (const entry of [...entries].sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))) {
		const key = localDateKey(entry.created_at);
		const bucket = byKey.get(key);
		if (bucket) bucket.push(entry);
		else byKey.set(key, [entry]);
	}
	return [...byKey.entries()].map(([key, groupEntries]) => ({
		key,
		entries: groupEntries
	})).sort((a, b) => a.key < b.key ? 1 : a.key > b.key ? -1 : 0);
}
function dateKey(date) {
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${date.getFullYear()}-${month}-${day}`;
}
function localDateKey(iso) {
	const date = new Date(iso);
	return Number.isNaN(date.getTime()) ? iso : dateKey(date);
}
function dayLabel(t, key) {
	const now = /* @__PURE__ */ new Date();
	if (key === dateKey(now)) return t("dictation.group.today");
	const yesterday = new Date(now);
	yesterday.setDate(yesterday.getDate() - 1);
	if (key === dateKey(yesterday)) return t("dictation.group.yesterday");
	const parsed = /* @__PURE__ */ new Date(`${key}T00:00:00`);
	return Number.isNaN(parsed.getTime()) ? key : parsed.toLocaleDateString(void 0, {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
}
var import_react_dom = require_react_dom();
async function unwrap(res) {
	const body = await res.json().catch(() => ({}));
	if (!res.ok) throw new Error(body.detail ?? `HTTP ${res.status}`);
	return body;
}
function useDictionary() {
	const [entries, setEntries] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const refetch = (0, import_react.useCallback)(async () => {
		setError(null);
		try {
			setEntries((await unwrap(await fetch("/api/dictionary"))).entries ?? []);
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		refetch();
	}, [refetch]);
	return {
		entries,
		loading,
		error,
		refetch,
		createEntry: (0, import_react.useCallback)(async (payload) => {
			const created = await unwrap(await fetch("/api/dictionary", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			}));
			setEntries((prev) => [...prev, created]);
			return created;
		}, []),
		updateEntry: (0, import_react.useCallback)(async (id, payload) => {
			const updated = await unwrap(await fetch(`/api/dictionary/${encodeURIComponent(id)}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			}));
			setEntries((prev) => prev.map((e) => e.id === id ? updated : e));
			return updated;
		}, []),
		removeEntry: (0, import_react.useCallback)(async (id) => {
			await unwrap(await fetch(`/api/dictionary/${encodeURIComponent(id)}`, { method: "DELETE" }));
			setEntries((prev) => prev.filter((e) => e.id !== id));
		}, [])
	};
}
function DictionaryView({ hideHeader = false } = {}) {
	const t = useT();
	const { entries, loading, error, createEntry, updateEntry, removeEntry } = useDictionary();
	const pushToast = useEventStore((s) => s.pushToast);
	const [query, setQuery] = (0, import_react.useState)("");
	const [dialogOpen, setDialogOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [deletingId, setDeletingId] = (0, import_react.useState)(null);
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		if (!q) return entries;
		return entries.filter((e) => e.word.toLowerCase().includes(q) || e.misheard.some((m) => m.toLowerCase().includes(q)));
	}, [entries, query]);
	async function onDelete(entry) {
		setDeletingId(entry.id);
		try {
			await removeEntry(entry.id);
			pushToast("success", t("dictionary.deleted").replace("{0}", entry.word));
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setDeletingId(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [
			!hideHeader && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewHeader, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookA, { className: "h-4 w-4 text-primary" }),
				title: t("dictionary.title"),
				titleBadge: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-micro font-medium uppercase tracking-wide text-primary",
					children: t("dictionary.research_preview")
				}),
				subtitle: t("dictionary.description")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto scrollbar-jarvis p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: query,
										onChange: (e) => setQuery(e.target.value),
										placeholder: t("dictionary.search"),
										"data-testid": "dictionary-search",
										className: "w-full rounded-md border border-input bg-background py-1.5 pl-8 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
									})]
								}),
								entries.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full border border-border bg-muted/60 px-2 py-0.5 text-micro font-medium text-muted-foreground",
									children: entries.length
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									className: "gap-1.5",
									"data-testid": "dictionary-add",
									onClick: () => {
										setEditing(null);
										setDialogOpen(true);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), t("dictionary.add")]
								})
							]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-destructive",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 rounded-lg border border-border bg-card/60 px-4 py-2",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 py-3 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), t("dictionary.loading")]
							}) : entries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "py-3 text-xs text-muted-foreground",
								children: t("dictionary.empty")
							}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "py-3 text-xs text-muted-foreground",
								children: t("dictionary.no_matches")
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "divide-y divide-border/60",
								"data-testid": "dictionary-list",
								children: filtered.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "group flex items-center gap-2 py-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "min-w-0 flex-1 text-sm",
											children: entry.misheard.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex flex-wrap items-center gap-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted-foreground",
														children: entry.misheard.join(", ")
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3 shrink-0 text-muted-foreground" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium",
														children: entry.word
													})
												]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: entry.word
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": t("dictionary.edit"),
											"data-testid": `dictionary-edit-${entry.id}`,
											onClick: () => {
												setEditing(entry);
												setDialogOpen(true);
											},
											className: "text-muted-foreground opacity-0 transition-opacity hover:text-foreground focus:opacity-100 group-hover:opacity-100",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": t("dictionary.delete"),
											"data-testid": `dictionary-delete-${entry.id}`,
											disabled: deletingId === entry.id,
											onClick: () => void onDelete(entry),
											className: "text-muted-foreground opacity-0 transition-opacity hover:text-destructive focus:opacity-100 group-hover:opacity-100 disabled:opacity-50",
											children: deletingId === entry.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
										})
									]
								}, entry.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: t("dictionary.applies_note")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: t("dictionary.applies_to_dictation")
						})
					]
				})
			}),
			dialogOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DictionaryEntryDialog, {
				initial: editing,
				onClose: () => setDialogOpen(false),
				onSave: async (payload) => {
					if (editing) {
						await updateEntry(editing.id, payload);
						pushToast("success", t("dictionary.saved"));
					} else {
						await createEntry(payload);
						pushToast("success", t("dictionary.added").replace("{0}", payload.word));
					}
					setDialogOpen(false);
				}
			})
		]
	});
}
var inputClass = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary";
function DictionaryEntryDialog({ initial, onClose, onSave }) {
	const t = useT();
	const [word, setWord] = (0, import_react.useState)(initial?.word ?? "");
	const [misheardText, setMisheardText] = (0, import_react.useState)(initial?.misheard.join(", ") ?? "");
	const [isCorrection, setIsCorrection] = (0, import_react.useState)((initial?.misheard.length ?? 0) > 0);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const misheard = isCorrection ? misheardText.split(",").map((m) => m.trim()).filter(Boolean) : [];
	const valid = word.trim().length > 0 && (!isCorrection || misheard.length > 0);
	async function submit() {
		if (!valid || saving) return;
		setSaving(true);
		setError(null);
		try {
			await onSave({
				word: word.trim(),
				misheard
			});
		} catch (e) {
			setError(e.message);
			setSaving(false);
		}
	}
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-scrim/50",
		onClick: onClose,
		role: "presentation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-lg bg-popover shadow-float p-6",
			onClick: (e) => e.stopPropagation(),
			"data-testid": "dictionary-dialog",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "dictionary-dialog-title",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-4 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "dictionary-dialog-title",
						className: "flex-1 font-display text-base font-semibold",
						children: initial ? t("dictionary.dialog_edit_title") : t("dictionary.dialog_add_title")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						"aria-label": t("dictionary.cancel"),
						className: "text-muted-foreground hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: t("dictionary.correction_toggle")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: isCorrection,
								onCheckedChange: setIsCorrection,
								"data-testid": "dictionary-correction-toggle"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "-mt-2 text-xs text-muted-foreground",
							children: isCorrection ? t("dictionary.correction_hint_on") : t("dictionary.correction_hint_off")
						}),
						isCorrection ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: misheardText,
									onChange: (e) => setMisheardText(e.target.value),
									placeholder: t("dictionary.misheard_placeholder"),
									"data-testid": "dictionary-misheard-input",
									className: inputClass,
									autoFocus: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 shrink-0 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: word,
									onChange: (e) => setWord(e.target.value),
									placeholder: t("dictionary.word_correct_placeholder"),
									"data-testid": "dictionary-word-input",
									className: inputClass,
									onKeyDown: (e) => e.key === "Enter" && void submit()
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: word,
							onChange: (e) => setWord(e.target.value),
							placeholder: t("dictionary.word_placeholder"),
							"data-testid": "dictionary-word-input",
							className: inputClass,
							autoFocus: true,
							onKeyDown: (e) => e.key === "Enter" && void submit()
						}),
						isCorrection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "-mt-2 text-xs text-muted-foreground",
							children: t("dictionary.misheard_comma_hint")
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-destructive",
							children: error
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-end gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: onClose,
						disabled: saving,
						children: t("dictionary.cancel")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => void submit(),
						disabled: !valid || saving,
						"data-testid": "dictionary-save",
						className: "gap-1.5",
						children: [saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), initial ? t("dictionary.save") : t("dictionary.add_confirm")]
					})]
				})
			]
		})
	}), document.body);
}
var ROWS = [
	{
		action: "dictate",
		labelKey: "voice.shortcuts.ptt_label",
		hintKey: "voice.shortcuts.ptt_hint"
	},
	{
		action: "dictate_toggle",
		labelKey: "voice.shortcuts.toggle_label",
		hintKey: "voice.shortcuts.toggle_hint"
	},
	{
		action: "paste_last",
		labelKey: "voice.shortcuts.paste_last_label",
		hintKey: "voice.shortcuts.paste_last_hint"
	}
];
function ShortcutsTab({ hideHeader = false } = {}) {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const { config, loading, error, saveKeybind } = useKeybinds();
	const [status, setStatus] = (0, import_react.useState)(null);
	const refetchStatus = (0, import_react.useCallback)(async () => {
		try {
			const res = await fetch("/api/dictation/status");
			if (!res.ok) return;
			setStatus(await res.json());
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		refetchStatus();
	}, [refetchStatus]);
	const pinHoldMode = (0, import_react.useCallback)(async () => {
		try {
			const res = await fetch("/api/dictation/settings", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					mode: "hold",
					persist: true
				})
			});
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			await refetchStatus();
		} catch (e) {
			pushToast("warning", e.message);
		}
	}, [pushToast, refetchStatus]);
	const pttIsToggle = status?.mode === "toggle";
	const insertionBlocked = status?.insertion?.can_insert === false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [!hideHeader && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewHeader, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, { className: "h-4 w-4 text-foreground" }),
			title: t("voice.shortcuts.title"),
			subtitle: t("voice.shortcuts.description")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto scrollbar-jarvis p-6",
			"data-testid": "voice-shortcuts-tab",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-form flex-col gap-group",
				children: [
					hideHeader && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-meta text-muted-foreground",
						children: t("voice.shortcuts.description")
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-meta text-destructive",
						children: error
					}),
					pttIsToggle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "flex items-start gap-3 p-5",
						"data-testid": "shortcuts-mode-notice",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
							"aria-hidden": "true",
							className: "mt-0.5 h-4 w-4 shrink-0 text-warning"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-meta text-muted-foreground",
								children: t("voice.shortcuts.mode_notice")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								className: "mt-stack",
								"data-testid": "shortcuts-mode-fix",
								onClick: () => void pinHoldMode(),
								children: t("voice.shortcuts.mode_notice_fix")
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-stack",
						children: ROWS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeybindRow, {
								action: row.action,
								variant: "voice",
								label: t(row.labelKey),
								hint: t(row.hintKey),
								config,
								loading,
								onSave: saveKeybind,
								suggestions: config?.suggestions,
								onSaved: row.action === "dictate" ? pinHoldMode : void 0
							}), row.action === "paste_last" && insertionBlocked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-meta text-warning",
								"data-testid": "shortcuts-paste-last-blocked",
								children: t("voice.shortcuts.paste_last_blocked")
							})]
						}, row.action))
					})
				]
			})
		})]
	});
}
var POLISH_PROVIDER_LABELS = {
	groq: "Groq",
	cerebras: "Cerebras",
	gemini: "Google Gemini",
	openai: "OpenAI",
	openrouter: "OpenRouter",
	ollama: "Ollama (local)"
};
function LanguageTab({ hideHeader = false } = {}) {
	const t = useT();
	const { settings, choices, wordingProvider, loading, error, saveSettings: persistSettings, refetch } = useDictation();
	const { providers, refetch: refetchProviders } = useProviders();
	const pushToast = useEventStore((s) => s.pushToast);
	const [testing, setTesting] = (0, import_react.useState)(false);
	const [testResult, setTestResult] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const writing = (0, import_react.useRef)(false);
	const testVersion = (0, import_react.useRef)(0);
	const controlsBusy = loading || saving || testing;
	(0, import_react.useEffect)(() => {
		testVersion.current += 1;
		setTestResult(null);
	}, [settings]);
	async function saveSettings(patch) {
		if (writing.current) return;
		writing.current = true;
		testVersion.current += 1;
		setTestResult(null);
		setSaving(true);
		try {
			await persistSettings(patch);
		} finally {
			writing.current = false;
			setSaving(false);
		}
	}
	async function onPick(language) {
		try {
			await saveSettings({ language });
			pushToast("success", t("dictation.saved"));
		} catch (e) {
			pushToast("error", e.message);
		}
	}
	async function onTogglePolish(next) {
		setTestResult(null);
		try {
			await saveSettings({ polish: next });
			pushToast("success", t("dictation.saved"));
		} catch (e) {
			pushToast("error", e.message);
		}
	}
	async function onPickPolishProvider(provider) {
		setTestResult(null);
		try {
			await saveSettings({
				polish_provider: provider,
				polish_model: ""
			});
			pushToast("success", t("dictation.saved"));
		} catch (e) {
			pushToast("error", e.message);
		}
	}
	async function onToggleConversation(next) {
		try {
			await saveSettings({ polish_conversation: next });
			pushToast("success", t("dictation.saved"));
		} catch (e) {
			pushToast("error", e.message);
		}
	}
	async function onTogglePrecision(next) {
		setTestResult(null);
		try {
			await saveSettings({ polish_precision: next });
			pushToast("success", t("dictation.saved"));
		} catch (e) {
			pushToast("error", e.message);
		}
	}
	async function onTogglePromptMode(next) {
		setTestResult(null);
		try {
			await saveSettings({ prompt_mode: next });
			pushToast("success", t("dictation.saved"));
		} catch (e) {
			pushToast("error", e.message);
		}
	}
	async function onToggleTranslate(next) {
		setTestResult(null);
		try {
			await saveSettings({ translate: next });
			pushToast("success", t("dictation.saved"));
		} catch (e) {
			pushToast("error", e.message);
		}
	}
	async function onPickTranslateTarget(translate_target) {
		setTestResult(null);
		try {
			await saveSettings({ translate_target });
			pushToast("success", t("dictation.saved"));
		} catch (e) {
			pushToast("error", e.message);
		}
	}
	async function runPolishTest() {
		if (controlsBusy) return;
		const version = ++testVersion.current;
		setTesting(true);
		setTestResult(null);
		try {
			const result = await testDictationPolish();
			if (version === testVersion.current) setTestResult(result);
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setTesting(false);
		}
	}
	const languageCodes = choices?.language ?? [];
	const value = settings?.language ?? "auto";
	const polishOn = settings?.polish ?? true;
	const precisionOn = settings?.polish_precision ?? false;
	const conversationOn = settings?.polish_conversation ?? false;
	const polishProvider = settings?.polish_provider ?? "auto";
	const served = choices?.polish_provider ?? ["auto"];
	const polishProviders = served.includes(polishProvider) ? served : [...served, polishProvider];
	const translateOn = settings?.translate ?? false;
	const promptModeOn = settings?.prompt_mode ?? false;
	const wordingOn = polishOn || precisionOn;
	const processingOn = wordingOn || promptModeOn || translateOn;
	const translateTarget = settings?.translate_target ?? "en";
	const translateTargets = choices?.translate_target ?? [];
	const targetEqualsSource = value !== "auto" && value === translateTarget;
	const wordingCard = wordingProvider?.spec_id ? providers.find((entry) => entry.id === wordingProvider.spec_id) ?? null : null;
	const wordingNeedsKey = Boolean(wordingProvider && !wordingProvider.ready && wordingProvider.secret_key);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [!hideHeader && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewHeader, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "h-4 w-4 text-foreground" }),
			title: t("voice.language.title"),
			subtitle: t("voice.language.description")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto scrollbar-jarvis p-6",
			"data-testid": "voice-language-tab",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-form flex-col gap-group",
				children: [
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-meta text-destructive",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-title font-semibold text-foreground-strong",
								children: t("voice.language.title")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-meta text-muted-foreground",
								children: t("voice.language.description")
							}),
							loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-block max-w-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBar, { className: "h-9 w-full" })
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-block max-w-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSelect, {
									value,
									codes: languageCodes,
									onChange: (code) => void onPick(code),
									autoLabel: t("voice.language.auto"),
									ariaLabel: t("voice.language.title"),
									testId: "dictation-language"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-block flex items-start gap-2 rounded-md bg-secondary p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									"aria-hidden": "true",
									className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-meta text-muted-foreground",
									"data-testid": "dictation-language-hint",
									children: t("voice.language.auto_hint")
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5",
						"data-testid": "dictation-polish-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-title font-semibold text-foreground-strong",
											children: t("voice.polish.title")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-meta text-muted-foreground",
											"data-testid": "dictation-polish-description",
											children: t("voice.polish.description")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-meta text-muted-foreground",
											"data-testid": "dictation-polish-sends-text",
											children: t("voice.polish.sends_text")
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: polishOn,
									disabled: controlsBusy,
									onCheckedChange: (next) => void onTogglePolish(next),
									"aria-label": t("voice.polish.title"),
									"data-testid": "dictation-polish-toggle"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-block flex items-start justify-between gap-4 border-t border-border pt-block",
								"data-testid": "dictation-precision-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
											className: "text-title font-semibold text-foreground",
											children: t("voice.polish.precision_title")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-meta text-muted-foreground",
											"data-testid": "dictation-precision-description",
											children: t("voice.polish.precision_description")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-meta text-muted-foreground",
											"data-testid": "dictation-precision-tradeoff",
											children: t("voice.polish.precision_tradeoff")
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: precisionOn,
									disabled: controlsBusy,
									onCheckedChange: (next) => void onTogglePrecision(next),
									"aria-label": t("voice.polish.precision_title"),
									"data-testid": "dictation-precision-toggle"
								})]
							}),
							processingOn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								wordingOn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-block flex items-start justify-between gap-4 border-t border-border pt-block",
									"data-testid": "dictation-conversation-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
												className: "text-title font-semibold text-foreground",
												children: t("voice.polish.conversation_title")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-meta text-muted-foreground",
												"data-testid": "dictation-conversation-description",
												children: t("voice.polish.conversation_description")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-meta text-muted-foreground",
												"data-testid": "dictation-conversation-latency",
												children: t("voice.polish.conversation_latency")
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: conversationOn,
										disabled: controlsBusy,
										onCheckedChange: (next) => void onToggleConversation(next),
										"aria-label": t("voice.polish.conversation_title"),
										"data-testid": "dictation-conversation-toggle"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-block flex max-w-xs flex-col gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-meta text-muted-foreground",
										children: t("voice.polish.provider_label")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox, {
										value: polishProvider,
										ariaLabel: t("voice.polish.provider_label"),
										onChange: (id) => void onPickPolishProvider(id),
										testId: "dictation-polish-provider",
										disabled: controlsBusy,
										groups: [{
											id: "providers",
											options: polishProviders.map((id) => ({
												value: id,
												label: id === "auto" ? t("voice.polish.provider_auto") : POLISH_PROVIDER_LABELS[id] ?? id
											}))
										}]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-meta text-muted-foreground",
									children: t("voice.polish.provider_hint")
								}),
								wordingNeedsKey && wordingProvider && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-block",
									"data-testid": "dictation-wording-key",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApiKeyForm, {
										secretKey: wordingProvider.secret_key,
										dashboardUrl: wordingCard?.dashboard_url ?? null,
										configured: Boolean(wordingCard?.secrets_set?.[wordingProvider.secret_key]),
										credentialHelp: wordingCard?.credential_help ?? null,
										sharedWith: wordingCard?.secret_shared_with?.[wordingProvider.secret_key],
										onChanged: () => {
											refetchProviders();
											refetch();
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-meta text-muted-foreground",
										children: t("voice.translate.key_saved_hint")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-block flex flex-wrap items-center gap-2 border-t border-border pt-block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										onClick: () => void runPolishTest(),
										disabled: controlsBusy,
										"data-testid": "dictation-polish-test",
										className: "gap-2",
										children: [testing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											"aria-hidden": "true",
											className: "h-3.5 w-3.5 animate-spin motion-reduce:animate-none"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlugZap, {
											"aria-hidden": "true",
											className: "h-3.5 w-3.5"
										}), testing ? t("voice.polish.testing") : t("voice.polish.test")]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-meta text-muted-foreground",
										children: t("voice.polish.test_hint")
									})]
								}),
								testResult && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-block space-y-stack rounded-md bg-secondary p-3",
									"data-testid": "dictation-polish-test-result",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-meta text-muted-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-foreground",
													children: polishStatusLabel(t, testResult.status)
												}),
												testResult.provider ? ` · ${testResult.provider}` : "",
												testResult.model ? ` · ${testResult.model}` : "",
												testResult.latency_ms ? ` · ${Math.round(testResult.latency_ms)} ms` : "",
												testResult.reason ? ` · ${testResult.reason}` : ""
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-meta text-muted-foreground",
											children: t("voice.polish.sample_before")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 break-words text-reading text-muted-foreground",
											"data-testid": "dictation-polish-sample-in",
											children: testResult.sample_in
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-meta text-muted-foreground",
											children: t("voice.polish.sample_after")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 break-words text-reading text-foreground",
											"data-testid": "dictation-polish-sample-out",
											children: testResult.sample_out
										})] })
									]
								})
							] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5",
						"data-testid": "dictation-prompt-mode-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-title font-semibold text-foreground-strong",
										children: t("voice.prompt_mode.title")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-meta text-muted-foreground",
										"data-testid": "dictation-prompt-mode-description",
										children: t("voice.prompt_mode.description")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-meta text-muted-foreground",
										"data-testid": "dictation-prompt-mode-sends-text",
										children: t("voice.prompt_mode.sends_text")
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: promptModeOn,
								disabled: controlsBusy,
								onCheckedChange: (next) => void onTogglePromptMode(next),
								"aria-label": t("voice.prompt_mode.title"),
								"data-testid": "dictation-prompt-mode-toggle"
							})]
						}), promptModeOn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-block flex items-start gap-2 rounded-md bg-secondary p-3",
							"data-testid": "dictation-prompt-mode-outranks",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								"aria-hidden": "true",
								className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-meta text-muted-foreground",
								children: t("voice.prompt_mode.outranks")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-meta text-muted-foreground",
							"data-testid": "dictation-prompt-mode-writer-hint",
							children: t("voice.prompt_mode.writer_hint")
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5",
						"data-testid": "dictation-translate-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-title font-semibold text-foreground-strong",
										children: t("voice.translate.title")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-meta text-muted-foreground",
										"data-testid": "dictation-translate-description",
										children: t("voice.translate.description")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-meta text-muted-foreground",
										"data-testid": "dictation-translate-sends-text",
										children: t("voice.translate.sends_text")
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: translateOn,
								disabled: controlsBusy,
								onCheckedChange: (next) => void onToggleTranslate(next),
								"aria-label": t("voice.translate.title"),
								"data-testid": "dictation-translate-toggle"
							})]
						}), translateOn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-block rounded-md bg-secondary p-3",
								"data-testid": "dictation-translate-provider",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-meta text-muted-foreground",
									children: t("voice.translate.answers_label")
								}), wordingProvider?.ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-title font-semibold text-foreground",
									"data-testid": "dictation-translate-provider-name",
									children: POLISH_PROVIDER_LABELS[wordingProvider.family] ?? wordingProvider.label ?? wordingProvider.family
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-meta text-warning",
									"data-testid": "dictation-translate-no-provider",
									children: t("voice.translate.no_provider")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-block flex max-w-xs flex-col gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-meta text-muted-foreground",
									children: t("voice.translate.target_label")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSelect, {
									value: translateTarget,
									codes: translateTargets,
									onChange: (code) => void onPickTranslateTarget(code),
									autoLabel: t("voice.language.auto"),
									ariaLabel: t("voice.translate.target_label"),
									disabled: controlsBusy,
									testId: "dictation-translate-target"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-meta text-muted-foreground",
								children: t("voice.translate.target_hint")
							}),
							targetEqualsSource && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-block flex items-start gap-2 rounded-md bg-secondary p-3",
								"data-testid": "dictation-translate-same-language",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									"aria-hidden": "true",
									className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-meta text-muted-foreground",
									children: t("voice.translate.same_language_notice")
								})]
							})
						] })]
					})
				]
			})
		})]
	});
}
function VoiceApiKeysTab({ hideHeader = false } = {}) {
	const t = useT();
	const { providers, loading, error, refetch, setActiveOptimistic } = useProviders();
	const health = useTierHealth(providers);
	const categories = makeProviderCategories(t);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [!hideHeader && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewHeader, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-4 w-4 text-foreground" }),
			title: t("voice.api_keys.title"),
			subtitle: t("voice.api_keys.description")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 overflow-y-auto scrollbar-jarvis p-6",
			"data-testid": "voice-api-keys-tab",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-page flex-col gap-group",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderCategory, {
					meta: categories.stt,
					tier: "stt",
					providers,
					loading,
					error,
					onChanged: refetch,
					onActivateOptimistic: setActiveOptimistic,
					health: health.stt
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderCategory, {
					meta: categories.dictation,
					tier: "dictation",
					providers,
					loading,
					error,
					onChanged: refetch,
					onActivateOptimistic: setActiveOptimistic,
					health: health.dictation
				})]
			})
		})]
	});
}
var TABS = [
	{
		id: "dictation",
		labelKey: "nav.dictation"
	},
	{
		id: "dictionary",
		labelKey: "nav.dictionary"
	},
	{
		id: "voice-shortcuts",
		labelKey: "nav.voice_shortcuts"
	},
	{
		id: "voice-language",
		labelKey: "nav.voice_language"
	},
	{
		id: "voice-api-keys",
		labelKey: "nav.voice_api_keys"
	}
];
function VoiceHubView() {
	const t = useT();
	const active = useEventStore((s) => s.activeSection);
	const current = TABS.some((tab) => tab.id === active) ? active : "dictation";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewHeader, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-4 w-4 text-foreground" }),
				title: t("nav.voice"),
				subtitle: t("voice.hub.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTabBar, {
				tabs: TABS,
				align: "center"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 overflow-hidden",
				children: [
					current === "dictation" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DictationView, { hideHeader: true }),
					current === "dictionary" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DictionaryView, { hideHeader: true }),
					current === "voice-shortcuts" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortcutsTab, { hideHeader: true }),
					current === "voice-language" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageTab, { hideHeader: true }),
					current === "voice-api-keys" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceApiKeysTab, { hideHeader: true })
				]
			})
		]
	});
}
export { VoiceHubView };
