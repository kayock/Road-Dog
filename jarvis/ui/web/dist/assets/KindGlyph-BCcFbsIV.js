import { Bc as require_jsx_runtime, Ln as cn, tl as __toESM } from "./index-BOzhgzD7.js";
const WIKI_GROUPS = [
	"entity",
	"project",
	"concept",
	"session",
	"agent",
	"system",
	"other"
];
const GROUP_LABEL_KEY = {
	entity: "wiki_ui.group_entity",
	project: "wiki_ui.group_project",
	concept: "wiki_ui.group_concept",
	session: "wiki_ui.group_session",
	agent: "wiki_ui.group_agent",
	system: "wiki_ui.group_system",
	other: "wiki_ui.group_other"
};
function groupOfKind(kind) {
	switch (kind) {
		case "entity":
		case "concept":
		case "project":
		case "session": return kind;
		case "society": return "agent";
		case "meta": return "system";
		default: return "other";
	}
}
function cleanTitle(title, fallback = "") {
	return (title ?? "").trim().replace(/^["'\p{Pi}\p{Pf}]+|["'\p{Pi}\p{Pf}]+$/gu, "").trim() || fallback;
}
function libraryItems(folders) {
	const out = [];
	for (const folder of folders) {
		const group = groupOfKind(folder.kind);
		for (const file of folder.files) out.push({
			slug: file.slug,
			title: cleanTitle(file.title, file.slug),
			mtime: file.mtime,
			folder: folder.name,
			group
		});
	}
	return out;
}
function libraryGroups(items) {
	const byGroup = /* @__PURE__ */ new Map();
	for (const item of items) {
		const list = byGroup.get(item.group) ?? [];
		list.push(item);
		byGroup.set(item.group, list);
	}
	const collator = new Intl.Collator(void 0, {
		sensitivity: "base",
		numeric: true
	});
	return WIKI_GROUPS.filter((id) => (byGroup.get(id)?.length ?? 0) > 0).map((id) => ({
		id,
		items: [...byGroup.get(id) ?? []].sort((a, b) => collator.compare(a.title, b.title))
	}));
}
function recentItems(items, limit = 5) {
	return [...items].sort((a, b) => b.mtime - a.mtime).slice(0, limit);
}
function matchesFilter(item, query) {
	const q = normalise(query);
	if (!q) return true;
	return normalise(item.title).includes(q) || normalise(item.slug).includes(q);
}
function normalise(value) {
	return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().trim();
}
function compactAge(mtimeSeconds, language, nowMs = Date.now()) {
	if (!Number.isFinite(mtimeSeconds) || mtimeSeconds <= 0) return "";
	const seconds = Math.max(0, nowMs / 1e3 - mtimeSeconds);
	for (const [size, unit] of [
		[3600 * 24 * 365, "year"],
		[3600 * 24 * 30, "month"],
		[3600 * 24 * 7, "week"],
		[3600 * 24, "day"],
		[3600, "hour"],
		[60, "minute"]
	]) if (seconds >= size) {
		const value = Math.floor(seconds / size);
		try {
			return new Intl.NumberFormat(language, {
				style: "unit",
				unit,
				unitDisplay: "narrow"
			}).format(value);
		} catch {
			return `${value}${String(unit).charAt(0)}`;
		}
	}
	try {
		return new Intl.RelativeTimeFormat(language, { numeric: "auto" }).format(0, "second");
	} catch {
		return "now";
	}
}
function relativeAge(mtimeSeconds, language, nowMs = Date.now()) {
	if (!Number.isFinite(mtimeSeconds) || mtimeSeconds <= 0) return "";
	const diff = mtimeSeconds - nowMs / 1e3;
	const abs = Math.abs(diff);
	for (const [size, unit] of [
		[3600 * 24 * 365, "year"],
		[3600 * 24 * 30, "month"],
		[3600 * 24 * 7, "week"],
		[3600 * 24, "day"],
		[3600, "hour"],
		[60, "minute"],
		[1, "second"]
	]) if (abs >= size || unit === "second") try {
		return new Intl.RelativeTimeFormat(language, { numeric: "auto" }).format(Math.round(diff / size), unit);
	} catch {
		return "";
	}
	return "";
}
function uniqueEdges(edges) {
	const byPair = /* @__PURE__ */ new Map();
	for (const edge of edges) {
		if (edge.source === edge.target) continue;
		const key = `${edge.source}\u0000${edge.target}`;
		const existing = byPair.get(key);
		if (existing) {
			existing.weight += 1;
			if (!existing.context && edge.context) existing.context = edge.context;
		} else byPair.set(key, {
			source: edge.source,
			target: edge.target,
			weight: 1,
			context: edge.context ?? ""
		});
	}
	return [...byPair.values()];
}
function degreeOf(edges) {
	const neighbours = /* @__PURE__ */ new Map();
	const add = (a, b) => {
		const set = neighbours.get(a) ?? /* @__PURE__ */ new Set();
		set.add(b);
		neighbours.set(a, set);
	};
	for (const edge of edges) {
		if (edge.source === edge.target) continue;
		add(edge.source, edge.target);
		add(edge.target, edge.source);
	}
	return new Map([...neighbours].map(([id, set]) => [id, set.size]));
}
const GROUP_SHAPE = {
	entity: "circle",
	project: "square",
	concept: "triangle",
	session: "hexagon",
	agent: "ring",
	system: "diamond",
	other: "dot"
};
function traceKindShape(ctx, shape, x, y, r) {
	ctx.beginPath();
	switch (shape) {
		case "square": {
			const s = r * .9;
			const k = s * .35;
			ctx.moveTo(x - s + k, y - s);
			ctx.arcTo(x + s, y - s, x + s, y + s, k);
			ctx.arcTo(x + s, y + s, x - s, y + s, k);
			ctx.arcTo(x - s, y + s, x - s, y - s, k);
			ctx.arcTo(x - s, y - s, x + s, y - s, k);
			ctx.closePath();
			break;
		}
		case "triangle": {
			const s = r * 1.15;
			ctx.moveTo(x, y - s);
			ctx.lineTo(x + s * .92, y + s * .62);
			ctx.lineTo(x - s * .92, y + s * .62);
			ctx.closePath();
			break;
		}
		case "hexagon":
			for (let i = 0; i < 6; i += 1) {
				const a = Math.PI / 3 * i + Math.PI / 6;
				const px = x + Math.cos(a) * r;
				const py = y + Math.sin(a) * r;
				if (i === 0) ctx.moveTo(px, py);
				else ctx.lineTo(px, py);
			}
			ctx.closePath();
			break;
		case "diamond": {
			const s = r * 1.2;
			ctx.moveTo(x, y - s);
			ctx.lineTo(x + s, y);
			ctx.lineTo(x, y + s);
			ctx.lineTo(x - s, y);
			ctx.closePath();
			break;
		}
		case "dot":
			ctx.arc(x, y, r * .7, 0, Math.PI * 2);
			break;
		case "ring":
		case "circle":
		default:
			ctx.arc(x, y, r, 0, Math.PI * 2);
			break;
	}
}
function isHollowShape(shape) {
	return shape === "ring";
}
var SNIPPET_LINK_RE = /\[\[([^\]|\n]+)(?:\|([^\]\n]+))?\]\]/g;
function readableSnippet(snippet) {
	return snippet.replace(SNIPPET_LINK_RE, (_m, target, label) => {
		if (label) return label.trim();
		const text = target.trim();
		const idx = Math.max(text.lastIndexOf("/"), text.lastIndexOf("\\"));
		return idx >= 0 ? text.slice(idx + 1) : text;
	}).replace(/(^|\s)#{1,6}\s+/g, "$1").replace(/\*+|__|`/g, "").replace(/\s+/g, " ").trim();
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function KindGlyph({ group, className, title }) {
	const shape = GROUP_SHAPE[group];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 16 16",
		"aria-hidden": title ? void 0 : true,
		role: title ? "img" : void 0,
		className: cn("h-3 w-3 shrink-0", className),
		"data-kind-shape": shape,
		children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShapePath, { shape })]
	});
}
function ShapePath({ shape }) {
	switch (shape) {
		case "square": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "2.5",
			y: "2.5",
			width: "11",
			height: "11",
			rx: "3",
			fill: "currentColor"
		});
		case "triangle": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M8 2 L14 13 H2 Z",
			fill: "currentColor",
			strokeLinejoin: "round"
		});
		case "hexagon": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M8 1.8 L13.4 4.9 V11.1 L8 14.2 L2.6 11.1 V4.9 Z",
			fill: "currentColor"
		});
		case "diamond": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M8 1.5 L14.5 8 L8 14.5 L1.5 8 Z",
			fill: "currentColor"
		});
		case "ring": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "8",
			cy: "8",
			r: "5",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2.2"
		});
		case "dot": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "8",
			cy: "8",
			r: "3.5",
			fill: "currentColor"
		});
		case "circle":
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "8",
			cy: "8",
			r: "6",
			fill: "currentColor"
		});
	}
}
export { uniqueEdges as _, cleanTitle as a, groupOfKind as c, libraryItems as d, matchesFilter as f, traceKindShape as g, relativeAge as h, WIKI_GROUPS as i, isHollowShape as l, recentItems as m, GROUP_LABEL_KEY as n, compactAge as o, readableSnippet as p, GROUP_SHAPE as r, degreeOf as s, KindGlyph as t, libraryGroups as u };
