import { K as prettyProviderName, Oc as useQuery } from "./index-BOzhgzD7.js";
function actionsOf(day) {
	return day.dictations + day.voice_sessions + day.chat_messages + day.agent_sessions;
}
function wordsOf(day) {
	return day.dictation_words + day.voice_words;
}
function intensityLevels(values) {
	const sorted = values.filter((v) => v > 0).sort((a, b) => a - b);
	if (sorted.length === 0) return () => 0;
	const q = (p) => sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))];
	const [q1, q2, q3] = [
		q(.25),
		q(.5),
		q(.75)
	];
	return (v) => {
		if (v <= 0) return 0;
		if (v <= q1) return 1;
		if (v <= q2) return 2;
		if (v <= q3) return 3;
		return 4;
	};
}
function parseDay(iso) {
	return /* @__PURE__ */ new Date(`${iso}T00:00:00`);
}
function calendarWeeks(days) {
	const weeks = [];
	let current = [];
	let lastMonth = -1;
	let monthStart = null;
	for (const day of days) {
		const date = parseDay(day.date);
		const slot = (date.getDay() + 6) % 7;
		if (current.length === 0 && slot > 0) current = Array(slot).fill(null);
		if (date.getMonth() !== lastMonth) {
			lastMonth = date.getMonth();
			monthStart = lastMonth;
		}
		current.push(day);
		if (current.length === 7) {
			weeks.push({
				days: current,
				monthStart
			});
			current = [];
			monthStart = null;
		}
	}
	if (current.length > 0) {
		while (current.length < 7) current.push(null);
		weeks.push({
			days: current,
			monthStart
		});
	}
	return weeks;
}
function minutesSaved(words, seconds, typingWpm) {
	if (typingWpm <= 0) return 0;
	return Math.max(0, words / typingWpm - seconds / 60);
}
function wordsPerMinute(words, seconds) {
	return seconds > 0 ? words / (seconds / 60) : 0;
}
function trendPercent(current, previous) {
	if (previous <= 0) return null;
	return Math.round((current - previous) / previous * 100);
}
function usageMix(data) {
	const rows = [
		{
			key: "dictations",
			count: data.dictation.dictations
		},
		{
			key: "agent_sessions",
			count: data.agents.sessions
		},
		{
			key: "chat_messages",
			count: data.chats.messages
		},
		{
			key: "voice_sessions",
			count: data.voice.sessions
		}
	];
	const total = rows.reduce((sum, r) => sum + r.count, 0);
	return rows.map((r) => ({
		...r,
		share: total ? r.count / total : 0
	})).sort((a, b) => b.count - a.count);
}
function peakSlot(punch) {
	let best = null;
	punch.forEach((row, weekday) => row.forEach((value, hour) => {
		if (value > 0 && (!best || value > best.value)) best = {
			weekday,
			hour,
			value
		};
	}));
	return best;
}
function hourTotals(punch) {
	return Array.from({ length: 24 }, (_, h) => punch.reduce((s, row) => s + (row[h] ?? 0), 0));
}
function weekdayTotals(punch) {
	return punch.map((row) => row.reduce((s, v) => s + v, 0));
}
function weeklyTotals(days, count, minimum = count) {
	const totals = calendarWeeks(days).slice(-count).map((week) => {
		const present = week.days.filter((d) => d !== null);
		return {
			start: present[0]?.date ?? "",
			words: present.reduce((s, d) => s + wordsOf(d), 0),
			agentSessions: present.reduce((s, d) => s + d.agent_sessions, 0)
		};
	});
	const first = totals.findIndex((w) => w.words > 0);
	const cut = first < 0 ? 0 : Math.min(first, Math.max(0, totals.length - minimum));
	return totals.slice(cut);
}
var MILESTONES = [
	1e3,
	1e4,
	25e3,
	5e4,
	1e5,
	25e4,
	5e5,
	1e6,
	25e5,
	5e6,
	1e7
];
function milestoneProgress(words) {
	const next = MILESTONES.find((m) => m > words) ?? Math.ceil((words + 1) / 1e7) * 1e7;
	return {
		previous: [...MILESTONES].reverse().find((m) => m <= words) ?? 0,
		next
	};
}
var AGENT_LABELS = {
	"claude-cli": "Claude Code",
	"codex-cli": "Codex",
	"agy-cli": "Antigravity",
	"grok-cli": "Grok CLI",
	"opencode-cli": "OpenCode",
	"kimi-cli": "Kimi CLI",
	"glm-cli": "GLM CLI",
	"cursor-cli": "Cursor CLI",
	"kilo-code-cli": "Kilo Code",
	"z-code-cli": "Zed Code"
};
function agentLabel(id) {
	return AGENT_LABELS[id] ?? id.replace(/-cli$/, "");
}
var CHAT_PROVIDER_LABELS = {
	"claude-api": "Claude",
	"openai-codex": "Codex",
	antigravity: "Antigravity",
	"grok-build": "Grok Build"
};
function chatProviderLabel(id) {
	return CHAT_PROVIDER_LABELS[id] ?? prettyProviderName(id);
}
function compactNumber(n) {
	return new Intl.NumberFormat(void 0, {
		notation: n >= 1e4 ? "compact" : "standard",
		maximumFractionDigits: n >= 1e4 ? 1 : 0
	}).format(n);
}
function plural(t, baseKey, n) {
	return t(n === 1 ? `${baseKey}_one` : baseKey).replace("{0}", n.toLocaleString());
}
function formatDay(iso, lang) {
	const d = /* @__PURE__ */ new Date(`${iso}T00:00:00`);
	if (Number.isNaN(d.getTime())) return iso;
	return d.toLocaleDateString(lang, {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
async function fetchInsights() {
	const res = await fetch("/api/board/insights");
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json();
}
const boardInsightsQuery = {
	queryKey: ["board", "insights"],
	queryFn: fetchInsights,
	refetchInterval: 3e4,
	staleTime: 15e3
};
function useBoardInsights() {
	return useQuery(boardInsightsQuery);
}
export { weeklyTotals as _, chatProviderLabel as a, hourTotals as c, minutesSaved as d, peakSlot as f, weekdayTotals as g, usageMix as h, calendarWeeks as i, intensityLevels as l, trendPercent as m, actionsOf as n, compactNumber as o, plural as p, agentLabel as r, formatDay as s, useBoardInsights as t, milestoneProgress as u, wordsOf as v, wordsPerMinute as y };
