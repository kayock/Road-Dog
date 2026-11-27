import { t as Check } from "./check-vbwKkbPq.js";
import { t as ChevronRight } from "./chevron-right-BjVJ-R2c.js";
import { t as Clock } from "./clock-DMTiT8Bw.js";
import { t as FileText } from "./file-text-D8DI7Rfv.js";
import { t as Lock } from "./lock-ByyvnTXx.js";
import { t as NotebookPen } from "./notebook-pen-dOa4ZSSQ.js";
import { t as Pencil } from "./pencil-CD-5mlhp.js";
import { t as Save } from "./save-muG05xK1.js";
import { t as ScrollText } from "./scroll-text-Bn3SGBDY.js";
import { t as ShieldCheck } from "./shield-check-CO1F4Nzq.js";
import { t as UserRound } from "./user-round-Us5q_CPD.js";
import { Bc as require_jsx_runtime, Dc as useMutation, Gs as fill, Ln as cn, Oc as useQuery, Qi as ArrowLeft, Xc as require_react, bi as Plus, ct as CardContent, ji as LoaderCircle, li as TriangleAlert, ln as Button, lt as CardHeader, mi as Sparkles, na as createLucideIcon, nt as EmptyState, oc as useT, sa as getWSClient, sc as useUiLanguage, si as X, st as Card, tl as __toESM, ui as Trash2, wc as useEventStore, yi as RefreshCw, zc as useQueryClient } from "./index-BOzhgzD7.js";
import { n as Markdown, t as remarkGfm } from "./lib-BoWxqGgd.js";
import "./petStage-CMRGLgJ7.js";
import "./visualFence-DOGBhazZ.js";
import "./CodeBlock-BucrVDj0.js";
import { t as AgentSwatch } from "./AgentSwatch-CHRK4Jk4.js";
import "./appearance-CnI1Xhkn.js";
import "./CompanionMark-BvabJfVP.js";
import "./figureRecipe-BRnaWN-p.js";
import { u as useSocietyRoster } from "./data-v-6nxr7Q.js";
import { t as societyDisplayName } from "./societyDisplayName-iRYNmFrn.js";
import { i as rankAgents } from "./SidebarAgents-C8pDQO_Z.js";
import "./RenderedFence-DEp8ozS4.js";
import { t as Input } from "./input-DXuNAC9g.js";
import { t as Textarea } from "./textarea-DCOpWmsX.js";
import { a as chatProviderLabel, r as agentLabel, s as formatDay, t as useBoardInsights } from "./useBoardInsights-CQoS3BE-.js";
import { n as PROSE_BASE, r as splitFrontMatter } from "./MarkdownProse-3NDXv2pS.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Camera = createLucideIcon("Camera", [["path", {
	d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
	key: "1tc9qg"
}], ["circle", {
	cx: "12",
	cy: "13",
	r: "3",
	key: "1vg3eu"
}]]);
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleUserRound = createLucideIcon("CircleUserRound", [
	["path", {
		d: "M18 20a6 6 0 0 0-12 0",
		key: "1qehca"
	}],
	["circle", {
		cx: "12",
		cy: "10",
		r: "4",
		key: "1h16sb"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]
]);
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Quote = createLucideIcon("Quote", [["path", {
	d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
	key: "rib7q0"
}], ["path", {
	d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
	key: "1ymkrd"
}]]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
const SERIES_IDS = [
	"all",
	"voice",
	"chats",
	"agents"
];
function dayValue(day, series) {
	const voice = day.voice_sessions + day.dictations;
	if (series === "voice") return voice;
	if (series === "chats") return day.chat_messages;
	if (series === "agents") return day.agent_sessions;
	return voice + day.chat_messages + day.agent_sessions;
}
function parseDay(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	return new Date(y, (m ?? 1) - 1, d ?? 1);
}
function weekdayIndex(date) {
	return (date.getDay() + 6) % 7;
}
function niceCeil(value) {
	if (value <= 0) return 1;
	const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
	for (const step of [
		1,
		2,
		2.5,
		5,
		10
	]) if (step * magnitude >= value) return step * magnitude;
	return 10 * magnitude;
}
function summarize(days, series) {
	const values = days.map((d) => dayValue(d, series));
	const firstActive = days.findIndex((d) => dayValue(d, "all") > 0);
	const weeks = [];
	if (firstActive >= 0) {
		const firstMonday = firstActive - weekdayIndex(parseDay(days[firstActive].date));
		for (let monday = firstMonday; monday < days.length; monday += 7) {
			const from = Math.max(0, monday);
			const to = Math.min(monday + 6, days.length - 1);
			let total = 0;
			for (let i = from; i <= to; i++) total += values[i];
			weeks.push({
				start: parseDay(days[from].date),
				end: parseDay(days[to].date),
				total,
				partial: monday + 6 > days.length - 1
			});
		}
	}
	const sum = (from, to) => values.slice(Math.max(0, from), Math.max(0, to)).reduce((acc, v) => acc + v, 0);
	const n = values.length;
	const finished = weeks.filter((w) => !w.partial);
	const byWeekday = [
		0,
		0,
		0,
		0,
		0,
		0,
		0
	];
	days.forEach((d, i) => {
		byWeekday[weekdayIndex(parseDay(d.date))] += values[i];
	});
	const busiest = Math.max(...byWeekday);
	return {
		weeks,
		axisMax: niceCeil(Math.max(0, ...weeks.map((w) => w.total))),
		last7: sum(n - 7, n),
		prev7: sum(n - 14, n - 7),
		avgWeek: finished.length ? Math.round(finished.reduce((acc, w) => acc + w.total, 0) / finished.length) : null,
		topWeekday: busiest > 0 ? byWeekday.indexOf(busiest) : null
	};
}
function weekDelta(last7, prev7) {
	if (prev7 <= 0) return null;
	return Math.round((last7 - prev7) / prev7 * 100);
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var TAB_KEY = {
	all: "tab_all",
	voice: "tab_voice",
	chats: "tab_chats",
	agents: "tab_agents"
};
var UNIT_KEY = {
	all: "unit_all",
	voice: "unit_voice",
	chats: "unit_chats",
	agents: "unit_agents"
};
function ActivityChart() {
	const t = useT();
	const ui = useUiLanguage();
	const insights = useBoardInsights();
	const [series, setSeries] = (0, import_react.useState)("all");
	const [hovered, setHovered] = (0, import_react.useState)(null);
	const days = insights.data?.days;
	const summary = (0, import_react.useMemo)(() => days ? summarize(days, series) : null, [days, series]);
	const num = (n) => n.toLocaleString(ui);
	const unit = t(`profile_view.${UNIT_KEY[series]}`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-testid": "profile-activity",
		"aria-labelledby": "profile-activity-title",
		className: "flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "profile-activity-title",
				className: "text-base font-semibold text-foreground-strong",
				children: t("profile_view.activity_title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "tablist",
				"aria-label": t("profile_view.activity_title"),
				className: "flex gap-4",
				children: SERIES_IDS.map((id) => {
					const on = id === series;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						role: "tab",
						"aria-selected": on,
						onClick: () => {
							setSeries(id);
							setHovered(null);
						},
						className: cn("rounded-sm text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", on ? "font-medium text-foreground-strong" : "text-muted-foreground hover:text-foreground"),
						children: t(`profile_view.${TAB_KEY[id]}`)
					}, id);
				})
			})]
		}), !summary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "status",
			"aria-busy": "true",
			"aria-label": t("common.loading"),
			className: "h-40 animate-pulse rounded-lg bg-secondary"
		}) : summary.weeks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-10 text-center text-base text-muted-foreground",
			children: t("profile_view.activity_empty")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bars, {
			weeks: summary.weeks,
			axisMax: summary.axisMax,
			hovered,
			onHover: setHovered,
			ui,
			num,
			unit,
			runningLabel: t("profile_view.activity_running"),
			label: fill(t("profile_view.activity_chart_label"), {
				0: unit,
				1: summary.weeks[0].start.toLocaleDateString(ui, {
					day: "numeric",
					month: "short",
					year: "numeric"
				})
			})
		})]
	});
}
function Bars({ weeks, axisMax, hovered, onHover, ui, num, unit, runningLabel, label }) {
	const heightPct = (total) => total > 0 ? Math.max(2.5, total / axisMax * 100) : 0;
	const short = (d) => d.toLocaleDateString(ui, {
		day: "numeric",
		month: "short"
	});
	const months = (0, import_react.useMemo)(() => {
		let last = -1;
		return weeks.map((w) => {
			for (let k = 0; k < 7; k++) {
				const d = new Date(w.start.getFullYear(), w.start.getMonth(), w.start.getDate() + k);
				if (d > w.end) break;
				if (d.getDate() === 1 && d.getMonth() !== last) {
					last = d.getMonth();
					return d.toLocaleDateString(ui, { month: "short" });
				}
			}
			return "";
		});
	}, [weeks, ui]);
	const tip = hovered !== null ? weeks[hovered] : null;
	const tipLeft = hovered !== null ? Math.min(Math.max((hovered + .5) / weeks.length * 100, 10), 90) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 flex-1 flex-col gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-36",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "absolute inset-x-0 top-0 mr-10 border-t border-dashed border-border"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "absolute inset-x-0 top-1/2 mr-10 border-t border-dashed border-border"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "absolute inset-x-0 bottom-0 mr-10 border-t border-border-strong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "absolute right-0 top-0 -translate-y-1/2 text-xs tabular-nums text-muted-foreground",
					children: num(axisMax)
				}),
				Number.isInteger(axisMax / 2) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "absolute right-0 top-1/2 -translate-y-1/2 text-xs tabular-nums text-muted-foreground",
					children: num(axisMax / 2)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					role: "img",
					"aria-label": label,
					"data-testid": "activity-bars",
					onMouseLeave: () => onHover(null),
					className: "absolute inset-y-0 left-0 right-10 flex items-end gap-0.5",
					children: weeks.map((w, i) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							onMouseEnter: () => onHover(i),
							className: "flex h-full min-w-0 flex-1 items-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("block w-full rounded-t-[4px] transition-colors duration-150", hovered !== null && hovered !== i || hovered === null && w.partial ? "bg-[rgb(var(--accent-rgb)/0.38)]" : "bg-accent"),
								style: { height: `${heightPct(w.total)}%` }
							})
						}, w.start.getTime());
					})
				}),
				tip && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "status",
					className: "pointer-events-none absolute z-10 flex -translate-x-1/2 -translate-y-full flex-col gap-0.5 whitespace-nowrap rounded-lg bg-popover px-2.5 py-2 shadow-float",
					style: {
						left: `calc((100% - 2.5rem) * ${tipLeft / 100})`,
						top: `calc(${100 - heightPct(tip.total)}% - 0.5rem)`
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted-foreground",
						children: [
							short(tip.start),
							" – ",
							short(tip.end),
							tip.partial && ` · ${runningLabel}`
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm font-medium tabular-nums text-foreground-strong",
						children: [
							num(tip.total),
							" ",
							unit
						]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "mr-10 flex gap-0.5",
			children: months.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "h-4 min-w-0 flex-1 overflow-visible whitespace-nowrap text-xs leading-4 text-muted-foreground",
				children: m
			}, i))
		})]
	});
}
function statusOf(error) {
	return error?.status;
}
async function fetchJson(url, init) {
	const res = await fetch(url, init);
	if (!res.ok) {
		if (res.status === 503) {
			const data = await res.json().catch(() => ({ detail: "Profile system not ready." }));
			const err$1 = new Error(data.detail ?? `HTTP ${res.status}`);
			err$1.status = 503;
			throw err$1;
		}
		const txt = await res.text().catch(() => "");
		const err = /* @__PURE__ */ new Error(`HTTP ${res.status}: ${txt || res.statusText}`);
		err.status = res.status;
		throw err;
	}
	return res.json();
}
function useFieldEdit() {
	const queryClient = useQueryClient();
	const pushToast = useEventStore((s) => s.pushToast);
	return useMutation({
		mutationFn: async (body) => {
			const res = await fetch("/api/profile/field", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body)
			});
			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				throw new Error(data.detail ?? `HTTP ${res.status}`);
			}
			return res.json();
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
		onError: (err) => pushToast("error", err.message)
	});
}
function clusterDataOf(meta, cluster) {
	const raw = meta[cluster];
	return raw && typeof raw === "object" ? raw : {};
}
const CLUSTER_FIELD_KEYS = {
	identity: [
		"name",
		"preferred_address",
		"pronouns",
		"primary_language",
		"languages",
		"timezone",
		"devices",
		"about"
	],
	communication: [
		"directness",
		"formality",
		"verbosity",
		"humor_types",
		"emoji_ok"
	],
	work_style: ["focus_mode", "planning_horizon"],
	values: [
		"top_values",
		"pet_peeves",
		"motivations"
	],
	relationship: ["feedback_pref"]
};
const CLUSTER_ORDER = [
	"identity",
	"communication",
	"work_style",
	"values",
	"relationship"
];
const LIST_FIELD_KEYS = new Set([
	"languages",
	"devices",
	"humor_types",
	"top_values",
	"pet_peeves",
	"motivations"
]);
const BOOL_FIELD_KEYS = new Set(["emoji_ok"]);
function fieldKind(field) {
	if (LIST_FIELD_KEYS.has(field)) return "list";
	if (BOOL_FIELD_KEYS.has(field)) return "bool";
	return "scalar";
}
const TOTAL_FIELDS = CLUSTER_ORDER.reduce((acc, cid) => acc + CLUSTER_FIELD_KEYS[cid].length, 0);
function isEmptyValue(value) {
	return value === void 0 || value === null || value === "" || Array.isArray(value) && value.length === 0;
}
function clusterData(meta, cluster) {
	const raw = meta[cluster];
	return raw && typeof raw === "object" ? raw : {};
}
function countFilled(meta) {
	let filled = 0;
	for (const cid of CLUSTER_ORDER) {
		const data = clusterData(meta, cid);
		for (const key of CLUSTER_FIELD_KEYS[cid]) if (!isEmptyValue(data[key])) filled += 1;
	}
	return filled;
}
const CHOICE_FIELDS = {
	verbosity: [
		"tldr",
		"normal",
		"deep-dive"
	],
	focus_mode: [
		"deep-work",
		"fragment",
		"mixed"
	],
	planning_horizon: [
		"now",
		"today",
		"week",
		"quarter"
	],
	feedback_pref: [
		"direct-correct",
		"suggest",
		"ask-then-act"
	]
};
const SCALE_FIELDS = new Set(["directness", "formality"]);
const LIST_SUGGESTIONS = {
	humor_types: [
		"dry",
		"nerdy",
		"sarcastic",
		"warm",
		"none"
	],
	motivations: [
		"mastery",
		"autonomy",
		"impact"
	]
};
function scaleValue(value) {
	const n = typeof value === "number" ? value : Number(String(value ?? "").trim());
	return Number.isInteger(n) && n >= 1 && n <= 5 ? n : null;
}
const PAGE_GROUPS = [
	{
		id: "about",
		fields: CLUSTER_FIELD_KEYS.identity.filter((field) => field !== "about").map((field) => ({
			cid: "identity",
			field
		}))
	},
	{
		id: "talk",
		fields: CLUSTER_FIELD_KEYS.communication.map((field) => ({
			cid: "communication",
			field
		}))
	},
	{
		id: "work",
		fields: [...CLUSTER_FIELD_KEYS.work_style.map((field) => ({
			cid: "work_style",
			field
		})), ...CLUSTER_FIELD_KEYS.relationship.map((field) => ({
			cid: "relationship",
			field
		}))]
	},
	{
		id: "values",
		fields: CLUSTER_FIELD_KEYS.values.map((field) => ({
			cid: "values",
			field
		}))
	}
];
const LANGUAGE_FIELDS = new Set(["primary_language", "languages"]);
function languageName(code, ui) {
	const tag = code.trim();
	if (!/^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/i.test(tag)) return code;
	try {
		return new Intl.DisplayNames([ui], { type: "language" }).of(tag) ?? code;
	} catch {
		return code;
	}
}
function readableDate(iso) {
	const d = /* @__PURE__ */ new Date(`${iso}T12:00:00`);
	if (Number.isNaN(d.getTime())) return iso;
	return d.toLocaleDateString(void 0, {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function choiceLabel(t, field, value, ui = "en") {
	if (CHOICE_FIELDS[field]?.includes(value) || LIST_CHOICE_FIELDS.has(field)) {
		const key = `profile_view.choices.${field}.${value}`;
		const label = t(key);
		if (label !== key) return label;
	}
	if (LANGUAGE_FIELDS.has(field)) return languageName(value, ui);
	return value;
}
var LIST_CHOICE_FIELDS = new Set(Object.keys(LIST_SUGGESTIONS));
function ScaleMeter({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": true,
		className: "flex items-center gap-0.5",
		children: [
			1,
			2,
			3,
			4,
			5
		].map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-2.5 w-1.5 rounded-full", step <= value ? "bg-accent" : "bg-foreground/15") }, step))
	});
}
function ValueView({ field, value }) {
	const t = useT();
	const ui = useUiLanguage();
	const kind = fieldKind(field);
	if (kind === "list") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "flex flex-wrap justify-end gap-1",
		children: value.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "rounded-md border border-border bg-secondary px-2 py-0.5 text-sm text-foreground",
			children: choiceLabel(t, field, String(item), ui)
		}, String(item)))
	});
	if (kind === "bool") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-base text-foreground",
		children: value ? t("profile_view.value_yes") : t("profile_view.value_no")
	});
	if (SCALE_FIELDS.has(field)) {
		const n = scaleValue(value);
		if (n !== null) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-2.5 text-base text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScaleMeter, { value: n }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-mono text-sm tabular-nums",
				children: [n, "/5"]
			})]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-right text-base text-foreground [overflow-wrap:anywhere]",
		children: choiceLabel(t, field, String(value), ui)
	});
}
function Segment({ active, disabled, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		role: "radio",
		"aria-checked": active,
		disabled,
		onClick,
		className: cn("min-w-10 flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50", active ? "bg-card text-foreground-strong shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-foreground"),
		children
	});
}
function FieldRow({ cid, field, value, latest, history, initiallyEditing = false, onClose }) {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const edit = useFieldEdit();
	const kind = fieldKind(field);
	const empty = isEmptyValue(value);
	const label = t(`profile_view.fields.${field}`);
	const typed = kind === "scalar" && !CHOICE_FIELDS[field] && !SCALE_FIELDS.has(field);
	const [editing, setEditing] = (0, import_react.useState)(initiallyEditing);
	const [showSource, setShowSource] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(kind === "scalar" && !empty ? String(value) : "");
	const inputRef = (0, import_react.useRef)(null);
	const busy = edit.isPending;
	(0, import_react.useEffect)(() => {
		if (editing) inputRef.current?.focus();
	}, [editing]);
	const open = () => {
		setDraft(kind === "scalar" && !empty ? String(value) : "");
		setEditing(true);
	};
	const close = () => {
		setEditing(false);
		setDraft("");
		onClose?.();
	};
	const mutate = (operation, v, opts) => {
		edit.mutate({
			cluster: cid,
			field,
			operation,
			value: v
		}, { onSuccess: () => {
			pushToast("success", t("profile_view.field_saved"));
			if (opts?.keepOpen) {
				setDraft("");
				inputRef.current?.focus();
			} else close();
		} });
	};
	const saveText = () => {
		const v = draft.trim();
		if (v) mutate("set", v);
		else if (!empty) mutate("clear");
		else close();
	};
	const addItem = (item) => {
		const v = item.trim();
		if (v) mutate("append", v, { keepOpen: true });
	};
	if (editing) {
		const choices = CHOICE_FIELDS[field];
		const items = kind === "list" && !empty ? value.map(String) : [];
		const suggestions = (LIST_SUGGESTIONS[field] ?? []).filter((s) => !items.includes(s));
		const scaleHint = SCALE_FIELDS.has(field) ? t(`profile_view.scale_hint.${field}`) : null;
		let editor;
		if (choices || SCALE_FIELDS.has(field) || kind === "bool") {
			const options = choices ? choices.map((c) => ({
				key: c,
				value: c,
				label: t(`profile_view.choices.${field}.${c}`)
			})) : kind === "bool" ? [{
				key: "yes",
				value: true,
				label: t("profile_view.value_yes")
			}, {
				key: "no",
				value: false,
				label: t("profile_view.value_no")
			}] : [
				1,
				2,
				3,
				4,
				5
			].map((n) => ({
				key: String(n),
				value: n,
				label: String(n)
			}));
			const current = SCALE_FIELDS.has(field) ? scaleValue(value) : value;
			editor = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "radiogroup",
				"aria-label": label,
				className: "flex w-full flex-wrap gap-1 rounded-lg bg-secondary p-1",
				children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segment, {
					active: current === o.value,
					disabled: busy,
					onClick: () => mutate("set", o.value),
					children: o.label
				}, o.key))
			});
		} else if (kind === "list") editor = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3",
			children: [
				items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-md border border-border bg-secondary py-0.5 pl-2 pr-1 text-sm text-foreground",
						children: [choiceLabel(t, field, item), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: busy,
							onClick: () => mutate("remove", item, { keepOpen: true }),
							"aria-label": `${t("profile_view.field_remove_item")}: ${item}`,
							className: "rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								"aria-hidden": true,
								className: "h-3 w-3"
							})
						})]
					}, item))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						ref: inputRef,
						value: draft,
						disabled: busy,
						onChange: (e) => setDraft(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") addItem(draft);
							if (e.key === "Escape") close();
						},
						placeholder: t("profile_view.field_add_placeholder"),
						"aria-label": label,
						className: "h-9"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						size: "sm",
						variant: "secondary",
						disabled: busy || !draft.trim(),
						onClick: () => addItem(draft),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { "aria-hidden": true }), t("profile_view.field_add")]
					})]
				}),
				suggestions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: suggestions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: busy,
						onClick: () => addItem(s),
						className: "inline-flex items-center gap-1 rounded-md border border-dashed border-border px-2 py-0.5 text-sm text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							"aria-hidden": true,
							className: "h-3 w-3"
						}), choiceLabel(t, field, s)]
					}, s))
				})
			]
		});
		else editor = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			ref: inputRef,
			value: draft,
			disabled: busy,
			onChange: (e) => setDraft(e.target.value),
			onKeyDown: (e) => {
				if (e.key === "Enter") saveText();
				if (e.key === "Escape") close();
			},
			placeholder: t("profile_view.field_value_placeholder"),
			"aria-label": label,
			className: "h-9"
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-testid": `field-${field}`,
			className: "bg-secondary/40 px-5 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base font-medium text-foreground-strong",
						children: label
					}), scaleHint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-sm text-muted-foreground",
						children: scaleHint
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "-my-1 flex shrink-0 items-center gap-1",
					children: [!empty && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "ghost",
						className: "text-muted-foreground hover:text-destructive",
						disabled: busy,
						onClick: () => mutate("clear"),
						children: t("profile_view.field_clear")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "ghost",
						disabled: busy,
						onClick: close,
						children: typed ? t("profile_view.raw_cancel") : t("profile_view.field_done")
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: typed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [editor, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						size: "sm",
						disabled: busy,
						onClick: saveText,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { "aria-hidden": true }), t("profile_view.raw_save")]
					})]
				}) : editor
			})]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": `field-${field}`,
		className: "group px-5 py-3.5 transition-colors hover:bg-secondary/40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-base font-medium text-foreground",
					children: label
				}), latest && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setShowSource((v) => !v),
					"aria-expanded": showSource,
					"data-testid": `entry-source-${field}`,
					title: t("profile_view.source_show"),
					className: "mt-0.5 flex max-w-full items-center gap-1 rounded-sm text-left text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: t("profile_view.source_learned").replace("{0}", readableDate(latest.date))
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueView, {
					field,
					value
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon",
					onClick: open,
					title: t("profile_view.field_edit"),
					"aria-label": `${t("profile_view.field_edit")}: ${label}`,
					className: "h-8 w-8 shrink-0 text-muted-foreground opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {})
				})]
			})]
		}), showSource && latest && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 rounded-lg border border-border bg-background/60 px-3.5 py-2.5",
			children: [latest.evidence ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex gap-2 text-sm text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, {
					"aria-hidden": true,
					className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "[overflow-wrap:anywhere]",
					children: latest.evidence
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: t("profile_view.source_no_quote")
			}), history.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-xs text-muted-foreground",
				children: t("profile_view.source_revisions").replace("{0}", String(history.length))
			})]
		})]
	});
}
function ProfileGroup({ title, description, aside, children, testId, className, bare = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-testid": testId,
		"aria-label": title,
		className: cn("flex flex-col gap-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("flex items-end justify-between gap-4 px-1", bare && "hidden"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold text-foreground-strong",
					children: title
				}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-base text-muted-foreground",
					children: description
				})]
			}), aside && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shrink-0",
				children: aside
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "divide-y divide-border overflow-hidden rounded-xl border border-border bg-card",
			children
		})]
	});
}
function SettingRow({ label, hint, control, children, testId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": testId,
		className: "px-5 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-base font-medium text-foreground",
					children: label
				}), hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-0.5 text-sm text-muted-foreground",
					children: hint
				})]
			}), control && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex shrink-0 items-center gap-2",
				children: control
			})]
		}), children]
	});
}
var LINE = /^-\s*\[(\d{4}-\d{2}-\d{2})\]\s+([a-z_]+)\.([a-z_]+):\s*(.*?)(?:\s+—\s+"([^"]*)")?\s*$/i;
var OBSERVATIONS_START = "<!-- curator:observations:start -->";
var OBSERVATIONS_END = "<!-- curator:observations:end -->";
function parseObservations(raw) {
	if (!raw) return [];
	const start = raw.indexOf(OBSERVATIONS_START);
	const end = raw.indexOf(OBSERVATIONS_END);
	const body = start >= 0 && end > start ? raw.slice(start + 35, end) : raw;
	const out = [];
	for (const line of body.split("\n")) {
		const m = LINE.exec(line.trim());
		if (!m) continue;
		out.push({
			date: m[1],
			cluster: m[2].toLowerCase(),
			field: m[3].toLowerCase(),
			value: m[4].trim(),
			evidence: (m[5] ?? "").trim()
		});
	}
	return out;
}
function historyFor(observations, cluster, field) {
	return observations.filter((o) => o.cluster === cluster && o.field === field);
}
function latestFor(observations, cluster, field) {
	const all = historyFor(observations, cluster, field);
	return all.length ? all[all.length - 1] : null;
}
function parseDoNotRecord(raw) {
	if (!raw) return [];
	const heading = raw.search(/^##\s+Do Not Record\s*$/im);
	if (heading < 0) return [];
	const after = raw.slice(heading);
	const nextHeading = after.search(/\n##\s+/);
	const section = nextHeading > 0 ? after.slice(0, nextHeading) : after;
	const items = [];
	for (const line of section.split("\n")) {
		const m = /^-\s+(.*\S)\s*$/.exec(line.trim());
		if (m) items.push(m[1]);
	}
	return items;
}
function shortenCategory(text) {
	const withoutReason = text.replace(/\s*\([^)]*\)\s*$/, "").trim();
	return withoutReason.split(/\s+(?:or|as|und|oder)\s+/i)[0].trim() || withoutReason || text;
}
function FieldGroup({ id, fields, meta, observations }) {
	const t = useT();
	const [adding, setAdding] = (0, import_react.useState)(null);
	const valueOf = (ref) => clusterDataOf(meta, ref.cid)[ref.field];
	const known = fields.filter((ref) => !isEmptyValue(valueOf(ref)));
	const missing = fields.filter((ref) => isEmptyValue(valueOf(ref)));
	const addingRef = missing.find((ref) => ref.field === adding) ?? null;
	const chips = missing.filter((ref) => ref.field !== adding);
	const row = (ref, initiallyEditing = false) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
		cid: ref.cid,
		field: ref.field,
		value: valueOf(ref),
		latest: latestFor(observations, ref.cid, ref.field),
		history: historyFor(observations, ref.cid, ref.field),
		initiallyEditing,
		onClose: initiallyEditing ? () => setAdding(null) : void 0
	}, ref.field);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ProfileGroup, {
		testId: `group-${id}`,
		title: t(`profile_view.groups.${id}.title`),
		description: t(`profile_view.groups.${id}.description`),
		aside: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-mono text-sm tabular-nums text-muted-foreground",
			children: [
				known.length,
				"/",
				fields.length
			]
		}),
		children: [
			known.map((ref) => row(ref)),
			addingRef && row(addingRef, true),
			chips.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-testid": `missing-${id}`,
				className: "px-5 py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mr-1 text-sm text-muted-foreground",
						children: t("profile_view.add_label")
					}), chips.map((ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setAdding(ref.field),
						className: "inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-sm text-foreground transition-colors hover:border-border-strong hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							"aria-hidden": true,
							className: "h-3 w-3 text-muted-foreground"
						}), t(`profile_view.fields.${ref.field}`)]
					}, ref.field))]
				})
			})
		]
	});
}
function useAgentInstructions() {
	const [config, setConfig] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const refetch = (0, import_react.useCallback)(async () => {
		setError(null);
		try {
			const res = await fetch("/api/settings/agent-instructions");
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			setConfig(await res.json());
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
		config,
		loading,
		error,
		refetch,
		save: (0, import_react.useCallback)(async (content) => {
			const isClearing = content.trim().length === 0;
			const res = await fetch("/api/settings/agent-instructions", isClearing ? { method: "DELETE" } : {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ content })
			});
			const body = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(body.detail ?? `HTTP ${res.status}`);
			const result = body;
			setConfig(result);
			return result;
		}, []),
		reset: (0, import_react.useCallback)(async () => {
			const res = await fetch("/api/settings/agent-instructions", { method: "DELETE" });
			const body = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(body.detail ?? `HTTP ${res.status}`);
			const result = body;
			setConfig(result);
			return result;
		}, [])
	};
}
function wikiSlug(name) {
	if (!name) return null;
	return name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || null;
}
function countFacts(bodyMd) {
	const at = bodyMd.search(/^##\s+Facts\s*$/im);
	if (at < 0) return 0;
	const after = bodyMd.slice(at);
	const next = after.search(/\n##\s+/);
	return (next > 0 ? after.slice(0, next) : after).split("\n").filter((l) => /^-\s+\S/.test(l.trim())).length;
}
function RowLabel({ icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex items-center gap-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			className: "text-muted-foreground [&>svg]:h-4 [&>svg]:w-4",
			children: icon
		}), children]
	});
}
var HINT_INDENT = "pl-[1.625rem]";
function MemorySection({ name, raw, fileUpdatedMs, onOpenSource, bare = false }) {
	const t = useT();
	const setActiveSection = useEventStore((s) => s.setActiveSection);
	const rules = useAgentInstructions();
	const slug = wikiSlug(name);
	const categories = parseDoNotRecord(raw);
	const wiki = useQuery({
		queryKey: [
			"profile",
			"wiki-page",
			slug
		],
		enabled: !!slug,
		retry: false,
		staleTime: 6e4,
		queryFn: async () => {
			const res = await fetch(`/api/wiki/page/${encodeURIComponent(slug)}`);
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			return res.json();
		}
	});
	const rulesContent = rules.config?.content?.trim() ?? "";
	const hasRules = !!rules.config?.exists && rulesContent.length > 0;
	const ruleLines = hasRules ? rulesContent.split("\n").filter((l) => l.trim()).length : 0;
	const rulesFile = rules.config?.filename ?? "";
	const page = wiki.data?.ok ? wiki.data : null;
	const facts = page ? countFacts(page.body_md ?? "") : 0;
	const wikiHint = page ? [
		`${page.slug}.md`,
		facts > 0 ? t("profile_view.wiki_facts").replace("{0}", String(facts)) : null,
		page.wikilinks.length > 0 ? t("profile_view.wiki_links").replace("{0}", String(page.wikilinks.length)) : null
	].filter(Boolean).join(" · ") : slug ? t("profile_view.wiki_empty_body") : t("profile_view.wiki_needs_name");
	const fileDate = fileUpdatedMs ? new Date(fileUpdatedMs).toLocaleDateString(void 0, {
		day: "numeric",
		month: "short",
		year: "numeric"
	}) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ProfileGroup, {
		testId: "memory",
		title: t("profile_view.memory_title"),
		description: t("profile_view.memory_description"),
		bare,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow, {
				testId: "rules-row",
				label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowLabel, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollText, {}),
					children: t("profile_view.rules_title")
				}),
				hint: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: HINT_INDENT,
					children: rules.loading ? "…" : hasRules ? t("profile_view.rules_open").replace("{0}", String(ruleLines)).replace("{1}", rulesFile) : t("profile_view.rules_empty_body")
				}),
				control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					variant: "outline",
					onClick: () => setActiveSection("agent-instructions"),
					children: hasRules ? t("profile_view.open") : t("profile_view.rules_write")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow, {
				testId: "wiki-row",
				label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowLabel, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookPen, {}),
					children: t("profile_view.wiki_title")
				}),
				hint: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: HINT_INDENT,
					"data-testid": page ? "wiki-found" : "wiki-empty",
					children: wiki.isLoading ? "…" : wikiHint
				}),
				control: page ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					variant: "outline",
					onClick: () => setActiveSection("memory"),
					children: t("profile_view.open")
				}) : void 0
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow, {
				testId: "source-row",
				label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowLabel, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {}),
					children: t("profile_view.file_title")
				}),
				hint: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: HINT_INDENT,
					children: fileDate ? t("profile_view.file_hint_dated").replace("{0}", fileDate) : t("profile_view.file_hint")
				}),
				control: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					size: "sm",
					variant: "outline",
					onClick: onOpenSource,
					children: [t("profile_view.file_open"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { "aria-hidden": true })]
				})
			}),
			categories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow, {
				label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowLabel, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
					children: t("profile_view.never_title")
				}),
				hint: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: HINT_INDENT,
					children: t("profile_view.never_body")
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					"data-testid": "never-stored",
					className: `mt-3 flex flex-wrap gap-1.5 ${HINT_INDENT}`,
					children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						title: c,
						className: "rounded-md border border-border bg-secondary px-2 py-0.5 text-sm text-foreground",
						children: shortenCategory(c)
					}, c))
				})
			})
		]
	});
}
async function fetchSummary() {
	const res = await fetch("/api/board/personal/summary");
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json();
}
function useBoardSummary() {
	return useQuery({
		queryKey: ["board", "summary"],
		queryFn: fetchSummary,
		refetchInterval: 8e3,
		staleTime: 4e3
	});
}
async function fetchBio() {
	const res = await fetch("/api/board/bio");
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json();
}
async function triggerBioRegen(body) {
	const res = await fetch("/api/board/bio/regenerate", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	});
	if (!res.ok) {
		const detail = await res.json().catch(() => ({}));
		throw new Error(detail.detail ?? `HTTP ${res.status}`);
	}
	return res.json();
}
async function sendBioFeedback(payload) {
	const res = await fetch("/api/board/bio/feedback", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload)
	});
	if (!res.ok) {
		const detail = await res.json().catch(() => ({}));
		throw new Error(detail.detail ?? `HTTP ${res.status}`);
	}
	return res.json();
}
function useBio() {
	return useQuery({
		queryKey: ["board", "bio"],
		queryFn: fetchBio,
		refetchInterval: 5 * 6e4,
		staleTime: 6e4
	});
}
function useBioRegenerate() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (body = {}) => triggerBioRegen(body),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["board", "bio"] });
		}
	});
}
function useBioFeedback() {
	return useMutation({ mutationFn: (payload) => sendBioFeedback(payload) });
}
var FEEDBACK = [
	{
		kind: "trifft",
		labelKey: "profile_view.portrait_fits"
	},
	{
		kind: "trifft_nicht",
		labelKey: "profile_view.portrait_misses"
	},
	{
		kind: "haerter",
		labelKey: "profile_view.portrait_harder"
	}
];
function isFinishedText(text) {
	return /[.!?…"'”»)\]]$/.test(text.trim());
}
function PortraitSection() {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const bio = useBio();
	const regenerate = useBioRegenerate();
	const feedback = useBioFeedback();
	const text = bio.data?.text?.trim() || null;
	const generatedAt = bio.data?.generated_at ?? null;
	const cutOff = !!text && !isFinishedText(text);
	const written = generatedAt ? new Date(generatedAt).toLocaleDateString(void 0, {
		day: "numeric",
		month: "short",
		year: "numeric"
	}) : null;
	const sendFeedback = (kind) => {
		if (!generatedAt) return;
		feedback.mutate({
			bio_generated_at: generatedAt,
			kind
		}, {
			onSuccess: () => pushToast("success", t("profile_view.portrait_thanks")),
			onError: (err) => pushToast("error", err.message)
		});
	};
	const write = () => regenerate.mutate({}, {
		onSuccess: () => pushToast("success", t("profile_view.portrait_written")),
		onError: (err) => pushToast("error", err.message)
	});
	const writeButton = (label) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		type: "button",
		size: "sm",
		variant: "outline",
		onClick: write,
		disabled: regenerate.isPending,
		children: [regenerate.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}), label]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileGroup, {
		testId: "portrait",
		title: t("profile_view.portrait_title"),
		description: t("profile_view.portrait_description"),
		aside: text && !cutOff ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			size: "sm",
			variant: "ghost",
			className: "text-muted-foreground",
			onClick: write,
			disabled: regenerate.isPending,
			children: [regenerate.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {}), t("profile_view.portrait_rewrite")]
		}) : null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-6 py-5",
			children: bio.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "status",
				"aria-busy": "true",
				className: "flex flex-col gap-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3.5 w-full animate-pulse rounded-full bg-secondary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3.5 w-11/12 animate-pulse rounded-full bg-secondary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3.5 w-3/5 animate-pulse rounded-full bg-secondary" })
				]
			}) : text && !cutOff ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
				"data-testid": "portrait-text",
				className: "border-l-2 border-accent pl-4 text-lg leading-relaxed text-foreground [overflow-wrap:anywhere]",
				children: text
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: written && t("profile_view.portrait_written_on").replace("{0}", written)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted-foreground",
						children: t("profile_view.portrait_ask")
					}), FEEDBACK.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "outline",
						disabled: feedback.isPending || !generatedAt,
						onClick: () => sendFeedback(f.kind),
						children: t(f.labelKey)
					}, f.kind))]
				})]
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-testid": cutOff ? "portrait-cut-off" : "portrait-empty",
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-prose text-base text-muted-foreground",
					children: cutOff ? t("profile_view.portrait_cut_off") : t("profile_view.portrait_empty_body")
				}), writeButton(cutOff ? t("profile_view.portrait_rewrite") : t("profile_view.portrait_write"))]
			})
		})
	});
}
function ProfileDrawer({ title, description, onClose, children, testId }) {
	const t = useT();
	const closeRef = (0, import_react.useRef)(null);
	const onCloseRef = (0, import_react.useRef)(onClose);
	onCloseRef.current = onClose;
	(0, import_react.useEffect)(() => {
		closeRef.current?.focus();
		const onKey = (e) => {
			if (e.key !== "Escape" || e.defaultPrevented) return;
			const target = e.target;
			if (target instanceof HTMLElement && (target.isContentEditable || target.closest("input, textarea, select"))) return;
			onCloseRef.current();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 z-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			tabIndex: -1,
			"aria-label": t("profile_view.drawer_close"),
			onClick: onClose,
			className: "absolute inset-0 h-full w-full cursor-default bg-scrim/50 animate-in fade-in-0 duration-150"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": title,
			"data-testid": testId,
			className: "absolute inset-y-0 right-0 flex w-full max-w-xl flex-col border-l border-border bg-background shadow-float animate-in slide-in-from-right-8 fade-in-0 duration-200",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start gap-3 border-b border-border px-6 pb-4 pt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold text-foreground-strong",
						children: title
					}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-base text-muted-foreground",
						children: description
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					ref: closeRef,
					type: "button",
					variant: "ghost",
					size: "icon",
					onClick: onClose,
					"aria-label": t("profile_view.drawer_close"),
					title: t("profile_view.drawer_close"),
					className: "text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto px-6 pb-8 pt-5 scrollbar-jarvis",
				children
			})]
		})]
	});
}
function hashString(value) {
	let hash = 5381;
	for (let i = 0; i < value.length; i++) hash = (Math.imul(hash, 33) ^ value.charCodeAt(i)) >>> 0;
	return hash;
}
function identityInitials(name) {
	const words = name.trim().split(/\s+/).filter(Boolean);
	if (words.length === 0) return "?";
	return (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : "")).toUpperCase();
}
function identityHue(name) {
	return hashString(name.trim().toLowerCase()) % 360;
}
function identityAvatarStyle(name) {
	const hue = identityHue(name);
	return {
		backgroundColor: `hsl(${hue} 42% 46%)`,
		color: `hsl(${hue} 45% 96%)`
	};
}
var SIZES = {
	sm: "h-7 w-7 text-micro",
	md: "h-9 w-9 text-meta",
	lg: "h-14 w-14 text-page"
};
function IdentityAvatar({ name, size = "md", src, alt, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": src ? void 0 : true,
		style: identityAvatarStyle(name),
		className: cn("relative flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold", SIZES[size], className),
		children: src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: alt ?? name,
			className: "h-full w-full object-cover",
			draggable: false
		}) : identityInitials(name)
	});
}
function AvatarButton({ name, hasAvatar, size = "md", shape = "circle" }) {
	const t = useT();
	const queryClient = useQueryClient();
	const pushToast = useEventStore((s) => s.pushToast);
	const inputRef = (0, import_react.useRef)(null);
	const [bust, setBust] = (0, import_react.useState)(0);
	const upload = useMutation({
		mutationFn: async (file) => {
			const fd = new FormData();
			fd.append("file", file);
			const res = await fetch("/api/profile/avatar", {
				method: "POST",
				body: fd
			});
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(body.detail ?? `HTTP ${res.status}`);
			}
			return res.json();
		},
		onSuccess: () => {
			setBust(Date.now());
			pushToast("success", t("profile_view.avatar_uploaded"));
			queryClient.invalidateQueries({ queryKey: ["profile"] });
		},
		onError: (err) => pushToast("error", err.message)
	});
	const remove = useMutation({
		mutationFn: async () => {
			const res = await fetch("/api/profile/avatar", { method: "DELETE" });
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			return res.json();
		},
		onSuccess: () => {
			setBust(Date.now());
			pushToast("info", t("profile_view.avatar_removed"));
			queryClient.invalidateQueries({ queryKey: ["profile"] });
		},
		onError: (err) => pushToast("error", err.message)
	});
	const onFileChosen = (e) => {
		const file = e.target.files?.[0];
		e.target.value = "";
		if (file) upload.mutate(file);
	};
	const busy = upload.isPending || remove.isPending;
	const box = size === "xl" ? "h-20 w-20" : size === "lg" ? "h-16 w-16" : "h-14 w-14";
	const title = hasAvatar ? t("profile_view.avatar_change") : t("profile_view.avatar_upload");
	const round = shape === "rounded" ? "rounded-3xl" : "rounded-full";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group/avatar relative shrink-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				type: "file",
				accept: "image/png,image/jpeg,image/webp,image/gif",
				className: "hidden",
				"aria-hidden": "true",
				tabIndex: -1,
				onChange: onFileChosen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => inputRef.current?.click(),
				disabled: busy,
				title,
				"aria-label": title,
				className: cn("relative flex items-center justify-center overflow-hidden bg-secondary transition-colors", round, "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50", box),
				children: [
					name ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdentityAvatar, {
						name,
						size: "lg",
						src: hasAvatar ? `/api/profile/avatar?t=${bust}` : null,
						alt: t("profile_view.avatar_alt"),
						className: cn(size === "xl" && "h-full w-full text-2xl", round)
					}) : hasAvatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: `/api/profile/avatar?t=${bust}`,
						alt: t("profile_view.avatar_alt"),
						className: "h-full w-full object-cover",
						draggable: false
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleUserRound, {
						"aria-hidden": true,
						className: cn("text-muted-foreground", size === "xl" ? "h-9 w-9" : "h-6 w-6")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("pointer-events-none absolute inset-0 flex items-center justify-center bg-scrim/70", round, "opacity-0 transition-opacity duration-200 group-hover/avatar:opacity-100 group-focus-visible/avatar:opacity-100"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, {
							"aria-hidden": true,
							className: "h-4 w-4 text-foreground-strong"
						})
					}),
					busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("absolute inset-0 flex items-center justify-center bg-scrim/70", round),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							"aria-hidden": true,
							className: "h-4 w-4 animate-spin text-foreground-strong"
						})
					})
				]
			}),
			hasAvatar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => remove.mutate(),
				disabled: busy,
				title: t("profile_view.avatar_remove"),
				"aria-label": t("profile_view.avatar_remove"),
				className: cn("absolute -bottom-1 -right-1 rounded-full border border-border bg-card p-1 text-muted-foreground opacity-0 transition-opacity", "hover:text-destructive focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover/avatar:opacity-100"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
					"aria-hidden": true,
					className: "h-3 w-3"
				})
			})
		]
	});
}
function shortDate(value, ui) {
	if (typeof value !== "string" || !value.trim()) return null;
	const d = new Date(value);
	if (Number.isNaN(d.getTime())) return null;
	return d.toLocaleDateString(ui, {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function NameForm({ onDone }) {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const edit = useFieldEdit();
	const [draft, setDraft] = (0, import_react.useState)("");
	const save = () => {
		const v = draft.trim();
		if (!v) return;
		edit.mutate({
			cluster: "identity",
			field: "name",
			operation: "set",
			value: v
		}, { onSuccess: () => {
			pushToast("success", t("profile_view.field_saved"));
			onDone?.();
		} });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mt-1 flex w-full max-w-sm items-center gap-2",
		onSubmit: (e) => {
			e.preventDefault();
			save();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			autoFocus: true,
			value: draft,
			disabled: edit.isPending,
			onChange: (e) => setDraft(e.target.value),
			onKeyDown: (e) => e.key === "Escape" && onDone?.(),
			placeholder: t("profile_view.name_placeholder"),
			"aria-label": t("profile_view.fields.name"),
			className: "h-9"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "submit",
			size: "sm",
			disabled: edit.isPending || !draft.trim(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { "aria-hidden": true }), t("profile_view.raw_save")]
		})]
	});
}
function AboutField({ value }) {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const edit = useFieldEdit();
	const [draft, setDraft] = (0, import_react.useState)(value);
	const [focused, setFocused] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!focused) setDraft(value);
	}, [value, focused]);
	const save = () => {
		const next = draft.trim();
		if (next === value.trim()) return;
		edit.mutate(next ? {
			cluster: "identity",
			field: "about",
			operation: "set",
			value: next
		} : {
			cluster: "identity",
			field: "about",
			operation: "clear"
		}, { onSuccess: () => pushToast("success", t("profile_view.field_saved")) });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative w-full max-w-lg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
			"data-testid": "profile-about",
			value: draft,
			rows: 1,
			maxLength: 160,
			disabled: edit.isPending,
			"aria-label": t("profile_view.fields.about"),
			placeholder: t("profile_view.about_placeholder"),
			onFocus: () => setFocused(true),
			onChange: (e) => setDraft(e.target.value),
			onBlur: () => {
				setFocused(false);
				save();
			},
			onKeyDown: (e) => {
				if (e.key === "Enter" && !e.shiftKey) {
					e.preventDefault();
					e.currentTarget.blur();
				} else if (e.key === "Escape") {
					e.stopPropagation();
					setDraft(value);
					e.currentTarget.blur();
				}
			},
			className: "max-h-28 min-h-0 resize-none rounded-xl text-center text-base leading-relaxed [field-sizing:content]"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			"aria-hidden": true,
			className: "absolute -bottom-5 right-1 text-xs tabular-nums text-muted-foreground opacity-0 transition-opacity data-[on=true]:opacity-100",
			"data-on": focused,
			children: [
				draft.length,
				" / ",
				160
			]
		})]
	});
}
function ProfileHero({ data, meta }) {
	const t = useT();
	const ui = useUiLanguage();
	const board = useBoardSummary();
	const [renaming, setRenaming] = (0, import_react.useState)(false);
	const identity = clusterDataOf(meta, "identity");
	const name = data.user.name?.trim() || null;
	const preferred = typeof identity["preferred_address"] === "string" ? identity["preferred_address"].trim() : "";
	const about = typeof identity["about"] === "string" ? identity["about"] : "";
	const facts = [];
	if (preferred && preferred !== name) facts.push(t("profile_view.hero_called").replace("{0}", preferred));
	if (!isEmptyValue(identity["primary_language"])) facts.push(languageName(String(identity["primary_language"]), ui));
	if (!isEmptyValue(identity["timezone"])) facts.push(String(identity["timezone"]));
	const since = shortDate(board.data?.totals.first_day, ui);
	if (since) facts.push(fill(t("profile_view.hero_since"), { 0: since }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-testid": "profile-hero",
		"aria-label": t("profile_view.groups.about.title"),
		className: "flex flex-col items-center gap-3 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarButton, {
				name,
				hasAvatar: !!data.has_avatar,
				size: "xl",
				shape: "rounded"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-full flex-col items-center gap-1",
				children: [name && !renaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group relative flex items-center justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "truncate font-display text-2xl text-foreground-strong",
						children: name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon",
						onClick: () => setRenaming(true),
						title: t("profile_view.field_edit"),
						"aria-label": `${t("profile_view.field_edit")}: ${t("profile_view.fields.name")}`,
						className: "absolute -right-10 h-8 w-8 shrink-0 text-muted-foreground opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {})
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold text-foreground-strong",
					children: name ? t("profile_view.fields.name") : t("profile_view.hero_ask_name")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NameForm, { onDone: name ? () => setRenaming(false) : void 0 })] }), facts.length > 0 && name && !renaming && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-full truncate text-base text-muted-foreground",
					children: facts.join(" · ")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutField, { value: about })
		]
	});
}
var A_MONDAY = new Date(2024, 0, 1);
var FAVOURITES_MAX = 8;
function FavoriteAgents() {
	const t = useT();
	const ui = useUiLanguage();
	const assistantName = useEventStore((s) => s.assistantName);
	const roster = useSocietyRoster();
	const agents = roster.data && !roster.data.sample ? roster.data.agents : [];
	const lead = agents.find((a) => a.tier === "lead" && a.lifecycle !== "archived");
	const shown = [...lead ? [lead] : [], ...rankAgents(agents)].slice(0, FAVOURITES_MAX);
	if (!roster.isLoading && shown.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-testid": "profile-agents",
		"aria-labelledby": "profile-agents-title",
		className: "flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			id: "profile-agents-title",
			className: "text-base font-semibold text-foreground-strong",
			children: t("profile_view.top_agents_title")
		}), roster.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "flex gap-3",
			children: [
				0,
				1,
				2
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12 w-12 animate-pulse rounded-xl bg-secondary" }, i))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-wrap gap-x-3 gap-y-4",
			children: shown.map((agent) => {
				const name = societyDisplayName(agent, assistantName);
				const runs = agent.stats?.runs ?? 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					title: fill(t(runs === 1 ? "profile_view.top_agents_runs_one" : "profile_view.top_agents_runs"), { 0: runs.toLocaleString(ui) }),
					className: "flex w-20 flex-col items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentSwatch, {
							agent,
							size: 30
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-full truncate text-center text-xs text-muted-foreground",
						children: name
					})]
				}, agent.agentId);
			})
		})]
	});
}
function deltaText(t, delta, last7) {
	if (delta === null) return last7 > 0 ? t("profile_view.delta_new") : "";
	if (delta === 0) return t("profile_view.delta_same");
	return fill(t(delta > 0 ? "profile_view.delta_up" : "profile_view.delta_down"), { 0: Math.abs(delta) });
}
function profileFacts(data, t, ui) {
	const out = [];
	const num = (n) => n.toLocaleString(ui);
	const week = summarize(data.days, "all");
	if (week.weeks.length > 0) {
		const delta = deltaText(t, weekDelta(week.last7, week.prev7), week.last7);
		out.push({
			label: t("profile_view.activity_last7"),
			value: `${num(week.last7)} ${t("profile_view.unit_all")}${delta ? ` · ${delta}` : ""}`
		});
	}
	if (week.avgWeek !== null) out.push({
		label: t("profile_view.activity_avg_week"),
		value: num(week.avgWeek)
	});
	if (week.topWeekday !== null) {
		const day = new Date(A_MONDAY.getFullYear(), A_MONDAY.getMonth(), A_MONDAY.getDate() + week.topWeekday);
		out.push({
			label: t("profile_view.activity_top_day"),
			value: day.toLocaleDateString(ui, { weekday: "long" })
		});
	}
	if (data.streak.active_days > 0) out.push({
		label: t("profile_view.insight_active_days"),
		value: num(data.streak.active_days)
	});
	const words = data.voice.user_words + data.dictation.words;
	if (words > 0) out.push({
		label: t("profile_view.insight_words"),
		value: num(words)
	});
	if (data.voice.seconds >= 60) {
		const minutes = Math.round(data.voice.seconds / 60);
		out.push({
			label: t("profile_view.insight_voice_time"),
			value: fill(t("profile_view.duration_hm"), {
				0: num(Math.floor(minutes / 60)),
				1: minutes % 60
			})
		});
	}
	const coder = data.agents.items.find((a) => a.sessions > 0);
	if (coder) out.push({
		label: t("profile_view.insight_top_coder"),
		value: agentLabel(coder.agent)
	});
	const chat = [...data.chats.providers].sort((a, b) => b.messages - a.messages)[0];
	if (chat && chat.messages > 0) out.push({
		label: t("profile_view.insight_top_chat"),
		value: chatProviderLabel(chat.provider)
	});
	const record = data.records.best_agent_day;
	if (record && record.value > 0) out.push({
		label: t("profile_view.insight_record"),
		value: fill(t("profile_view.insight_record_value"), {
			0: formatDay(record.date, ui),
			1: num(record.value)
		})
	});
	return out;
}
function InsightList() {
	const t = useT();
	const ui = useUiLanguage();
	const insights = useBoardInsights();
	const rows = insights.data ? profileFacts(insights.data, t, ui) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-testid": "profile-insights",
		"aria-labelledby": "profile-insights-title",
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			id: "profile-insights-title",
			className: "text-base font-semibold text-foreground-strong",
			children: t("profile_view.insights_title")
		}), insights.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "flex flex-col",
			children: [
				0,
				1,
				2,
				3
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3.5 w-28 animate-pulse rounded-full bg-secondary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3.5 w-12 animate-pulse rounded-full bg-secondary" })]
			}, i))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
			className: "flex flex-col",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-4 py-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "truncate text-sm text-muted-foreground",
					children: row.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "shrink-0 text-sm font-medium tabular-nums text-foreground-strong",
					children: row.value
				})]
			}, row.label))
		})]
	});
}
function Stat({ label, value, note, testId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": testId,
		className: "flex min-w-0 flex-col items-center gap-0.5 bg-card px-3 py-3 text-center",
		children: [value === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-6 w-16 animate-pulse rounded-md bg-secondary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex min-w-0 items-baseline gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate text-lg font-semibold tabular-nums tracking-tight text-foreground-strong",
				children: value
			}), note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 text-xs text-accent",
				children: note
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "w-full truncate text-xs text-muted-foreground",
			children: label
		})]
	});
}
function ProfileStats() {
	const t = useT();
	const ui = useUiLanguage();
	const summary = useBoardSummary();
	const insights = useBoardInsights();
	const num = (n) => n.toLocaleString(ui);
	const days = (n) => fill(t("profile_view.stat_days"), { 0: num(n) });
	const s = summary.data;
	const current = s ? s.streak_days : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-testid": "profile-stats",
		"aria-label": t("profile_view.activity_title"),
		className: "grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-5 [&>*:last-child]:col-span-2 sm:[&>*:last-child]:col-span-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: t("profile_view.stat_conversations"),
				value: summary.isLoading ? null : s ? num(s.totals.session_count) : "–"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: t("profile_view.stat_agent_runs"),
				value: insights.isLoading ? null : insights.data ? num(insights.data.agents.sessions) : "–"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: t("profile_view.stat_agent_tokens"),
				value: insights.isLoading ? null : insights.data ? new Intl.NumberFormat(ui, {
					notation: "compact",
					maximumFractionDigits: 2
				}).format(insights.data.agents.tokens) : "–"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: t("profile_view.stat_longest_streak"),
				value: summary.isLoading ? null : s ? days(s.longest_streak) : "–"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				testId: "stat-current-streak",
				label: t("profile_view.stat_current_streak"),
				value: summary.isLoading ? null : current !== null ? days(current) : "–",
				note: current ? t("profile_view.streak_running") : null
			})
		]
	});
}
function useSourceDocument() {
	const t = useT();
	const queryClient = useQueryClient();
	const pushToast = useEventStore((s) => s.pushToast);
	const [pulsing, setPulsing] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [editBaseMtime, setEditBaseMtime] = (0, import_react.useState)(null);
	const { data, isLoading, error, refetch, isRefetching } = useQuery({
		queryKey: ["profile", "raw"],
		queryFn: () => fetchJson("/api/profile/raw"),
		retry: false,
		staleTime: 0
	});
	(0, import_react.useEffect)(() => {
		const client = getWSClient();
		if (!client) return;
		return client.subscribe((raw) => {
			if (raw.event_name !== "ProfileUpdated") return;
			queryClient.invalidateQueries({ queryKey: ["profile"] });
			if (!editing) queryClient.invalidateQueries({ queryKey: ["profile", "raw"] });
			setPulsing(true);
		});
	}, [queryClient, editing]);
	(0, import_react.useEffect)(() => {
		if (!pulsing) return;
		const id = window.setTimeout(() => setPulsing(false), 2e3);
		return () => window.clearTimeout(id);
	}, [pulsing]);
	const saveMutation = useMutation({
		mutationFn: async (content) => {
			const res = await fetch("/api/profile/raw", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					content,
					mtime_ms: editBaseMtime
				})
			});
			if (!res.ok) {
				const body$1 = await res.json().catch(() => ({}));
				const err = new Error(body$1.detail ?? `HTTP ${res.status}`);
				err.status = res.status;
				throw err;
			}
			return res.json();
		},
		onSuccess: (res) => {
			setEditing(false);
			if (res.frontmatter_ok === false) pushToast("error", t("profile_view.raw_frontmatter_warning"));
			else pushToast("success", t("profile_view.raw_saved"));
			queryClient.invalidateQueries({ queryKey: ["profile"] });
			queryClient.invalidateQueries({ queryKey: ["profile", "raw"] });
		},
		onError: (err) => pushToast("error", err.message)
	});
	const startEditing = (0, import_react.useCallback)(() => {
		setDraft(data?.content ?? "");
		setEditBaseMtime(data?.mtime_ms ?? null);
		setEditing(true);
	}, [data?.content, data?.mtime_ms]);
	const cancelEditing = (0, import_react.useCallback)(() => setEditing(false), []);
	(0, import_react.useEffect)(() => {
		if (!editing) return;
		const onKey = (e) => {
			if (e.key === "Escape") setEditing(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [editing]);
	const body = (0, import_react.useMemo)(() => {
		if (!data) return "";
		return splitFrontMatter(data.content).body.replace(/<!--[\s\S]*?-->/g, "").replace(/[ \t]+$/gm, "").replace(/\n{3,}/g, "\n\n").trim();
	}, [data]);
	return {
		data,
		isLoading,
		error,
		isRefetching,
		refetch: () => void refetch(),
		editing,
		draft,
		setDraft,
		startEditing,
		cancelEditing,
		save: () => saveMutation.mutate(draft),
		isSaving: saveMutation.isPending,
		pulsing,
		body
	};
}
function SourceCard({ doc }) {
	const t = useT();
	const lastUpdate = doc.data?.mtime_ms ? new Date(doc.data.mtime_ms) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "profile-rise flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "flex-row flex-wrap items-center justify-between gap-x-3 gap-y-2 pb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex min-w-0 items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
						"aria-hidden": true,
						className: "h-4 w-4 shrink-0 text-muted-foreground"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg font-semibold text-foreground-strong",
						children: t("profile_view.section_source")
					}),
					doc.data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-0 truncate font-mono text-sm text-muted-foreground",
						children: doc.data.path
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex shrink-0 items-center gap-2",
				children: doc.editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "hidden items-center gap-1.5 text-sm text-muted-foreground xl:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
							"aria-hidden": true,
							className: "h-3.5 w-3.5 shrink-0"
						}), t("profile_view.raw_editing_hint")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: doc.cancelEditing,
						disabled: doc.isSaving,
						children: t("profile_view.raw_cancel")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "default",
						onClick: doc.save,
						disabled: doc.isSaving,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: cn(doc.isSaving && "animate-pulse") }), doc.isSaving ? t("profile_view.raw_saving") : t("profile_view.raw_save")]
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					doc.pulsing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 rounded-md border border-success/20 bg-success/[0.12] px-2 py-0.5 text-sm text-success",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative flex h-1.5 w-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-1.5 w-1.5 rounded-full bg-success" })]
						}), t("profile_view.just_updated")]
					}),
					lastUpdate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "hidden items-center gap-1.5 text-sm text-muted-foreground xl:inline-flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
							"aria-hidden": true,
							className: "h-3.5 w-3.5 shrink-0"
						}), t("profile_view.source_updated").replace("{0}", lastUpdate.toLocaleDateString())]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon",
						className: "h-8 w-8 text-muted-foreground",
						onClick: doc.refetch,
						disabled: doc.isRefetching,
						title: t("profile_view.reload_tooltip"),
						"aria-label": t("profile_view.reload_tooltip"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn(doc.isRefetching && "animate-spin") })
					}),
					doc.data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: doc.startEditing,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}), t("profile_view.raw_edit")]
					})
				] })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
			doc.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex max-w-reading flex-col gap-3",
				"aria-hidden": true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-1/3 animate-pulse rounded-md bg-secondary" }), [
					0,
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-3 animate-pulse rounded-full bg-secondary", i === 3 ? "w-4/5" : "w-full") }, i))]
			}),
			doc.error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-start gap-2 rounded-md border border-destructive/20 bg-destructive/[0.12] p-3 text-base text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					"aria-hidden": true,
					className: "mt-0.5 h-4 w-4 shrink-0"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 [overflow-wrap:anywhere]",
					children: doc.error.message
				})]
			}),
			doc.data && (doc.editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: doc.draft,
				onChange: (e) => doc.setDraft(e.target.value),
				spellCheck: false,
				autoFocus: true,
				rows: 26,
				"aria-label": doc.data.path,
				className: "resize-y font-mono leading-6 scrollbar-jarvis"
			}) : doc.body ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
				"data-testid": "profile-source-markdown",
				className: cn("prose prose-neutral dark:prose-invert [overflow-wrap:anywhere] prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-pretty prose-p:text-pretty prose-li:my-1 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-muted/60 prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.85em] prose-code:font-normal prose-code:before:hidden prose-code:after:hidden prose-hr:border-border prose-img:rounded-md", "max-w-reading text-base leading-7 text-foreground", "prose-headings:text-foreground-strong", "prose-h1:text-xl prose-h2:text-lg prose-h3:text-lg", "prose-blockquote:border-l-2 prose-blockquote:border-border prose-blockquote:pl-4 prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-muted-foreground", "prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground-strong"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, {
					remarkPlugins: [remarkGfm],
					children: doc.body
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {}),
				title: t("profile_view.source_empty_title"),
				description: t("profile_view.source_empty_body"),
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "default",
					onClick: doc.startEditing,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}), t("profile_view.raw_edit")]
				})
			}))
		] })]
	});
}
function ProfileView() {
	const t = useT();
	const [panel, setPanel] = (0, import_react.useState)(null);
	const [showSource, setShowSource] = (0, import_react.useState)(false);
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["profile"],
		queryFn: () => fetchJson("/api/profile"),
		retry: false
	});
	const source = useSourceDocument();
	const raw = source.data?.content ?? null;
	const observations = (0, import_react.useMemo)(() => parseObservations(raw), [raw]);
	const meta = (0, import_react.useMemo)(() => data?.user.meta ?? {}, [data]);
	const filled = (0, import_react.useMemo)(() => countFilled(meta), [meta]);
	const closePanel = (0, import_react.useCallback)(() => {
		source.cancelEditing();
		setShowSource(false);
		setPanel(null);
	}, [source]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-full overflow-hidden bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-full overflow-y-auto px-8 scrollbar-jarvis",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "sr-only",
						children: t("profile_view.title")
					}),
					data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute right-6 top-3 z-10 flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLink, {
							testId: "open-details",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {}),
							label: t("profile_view.door_details_title"),
							count: `${filled}/${TOTAL_FIELDS}`,
							onClick: () => setPanel("details")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLink, {
							testId: "open-memory",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {}),
							label: t("profile_view.memory_title"),
							onClick: () => setPanel("memory")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex min-h-full w-full max-w-3xl flex-col justify-center gap-8 py-14",
						children: [
							isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileSkeleton, { label: t("common.loading") }),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileErrorState, {
								error,
								onRetry: () => refetch()
							}),
							data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileHero, {
									data,
									meta
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileStats, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityChart, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavoriteAgents, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsightList, {})
							] })
						]
					})
				]
			}),
			data && panel === "details" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileDrawer, {
				testId: "details-panel",
				title: t("profile_view.door_details_title"),
				description: fill(t("profile_view.door_details_sub"), {
					0: filled,
					1: TOTAL_FIELDS
				}),
				onClose: closePanel,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-8",
					children: [PAGE_GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldGroup, {
						id: g.id,
						fields: g.fields,
						meta,
						observations
					}, g.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortraitSection, {})]
				})
			}),
			data && panel === "memory" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileDrawer, {
				testId: "memory-panel",
				title: t("profile_view.memory_title"),
				description: t("profile_view.memory_description"),
				onClose: closePanel,
				children: showSource ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						className: "self-start text-muted-foreground",
						onClick: () => {
							source.cancelEditing();
							setShowSource(false);
						},
						"data-testid": "source-back",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { "aria-hidden": true }), t("profile_view.back_to_profile")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceCard, { doc: source })]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemorySection, {
					bare: true,
					name: data.user.name?.trim() || null,
					raw,
					fileUpdatedMs: source.data?.mtime_ms ?? null,
					onOpenSource: () => setShowSource(true)
				})
			})
		]
	});
}
function PanelLink({ icon, label, count, onClick, testId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		"data-testid": testId,
		onClick,
		className: "flex h-9 items-center gap-2 rounded-md px-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&>svg]:h-4 [&>svg]:w-4",
		children: [
			icon,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }),
			count && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums text-muted-foreground",
				children: count
			})
		]
	});
}
function ProfileSkeleton({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "status",
		"aria-busy": "true",
		"aria-label": label,
		className: "flex flex-col gap-9",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-20 w-20 animate-pulse rounded-3xl bg-secondary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-7 w-40 animate-pulse rounded-md bg-secondary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3.5 w-72 max-w-full animate-pulse rounded-full bg-secondary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-16 w-full max-w-lg animate-pulse rounded-xl bg-secondary" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-20 animate-pulse rounded-xl bg-secondary" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-48 animate-pulse rounded-xl bg-secondary" })
		]
	});
}
function ProfileErrorState({ error, onRetry }) {
	const t = useT();
	if (statusOf(error) === 503) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleUserRound, {}),
		title: t("profile_view.unavailable_title"),
		description: t("profile_view.no_user_hint"),
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			variant: "outline",
			onClick: onRetry,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {}), t("common.retry")]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/[0.12] p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
				"aria-hidden": true,
				className: "mt-0.5 h-4 w-4 shrink-0 text-destructive"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-base font-medium text-foreground-strong",
					children: t("profile_view.error_title")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-base text-foreground-secondary [overflow-wrap:anywhere]",
					children: error.message
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "outline",
				className: "shrink-0",
				onClick: onRetry,
				children: t("common.retry")
			})
		]
	});
}
export { ProfileView };
