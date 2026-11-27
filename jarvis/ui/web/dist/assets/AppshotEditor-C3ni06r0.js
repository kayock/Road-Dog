import { t as Check } from "./check-vbwKkbPq.js";
import { t as Columns2 } from "./columns-2-BJ94Qe_J.js";
import { t as ImagePlus } from "./image-plus-BuPlA6zp.js";
import { B as startNativeFileDrag, Bc as require_jsx_runtime, Gs as fill, L as saveOrDownload, Li as GripVertical, Ln as cn, Ri as FolderOpen, Ui as Download, Wi as Copy, Xc as require_react, ji as LoaderCircle, ln as Button, na as createLucideIcon, nc as useLocaleChunk, oc as useT, ot as useCapabilities, qi as ChevronDown, si as X, tl as __toESM, ui as Trash2, vi as RotateCcw, wc as useEventStore, z as canNativeDrag } from "./index-BOzhgzD7.js";
import { t as Switch } from "./switch-hmH-TV55.js";
import { a as appshotLibraryImageUrl, f as fetchAppshotLibrary, y as latestAppshotImageUrl } from "./appshotApi-Dd25bfhQ.js";
import { t as QuickTooltip } from "./tooltip-R5sCoxZW.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var PictureInPicture2 = createLucideIcon("PictureInPicture2", [["path", {
	d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4",
	key: "daa4of"
}], ["rect", {
	width: "10",
	height: "7",
	x: "12",
	y: "13",
	rx: "2",
	key: "1nb8gs"
}]]);
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Redo2 = createLucideIcon("Redo2", [["path", {
	d: "m15 14 5-5-5-5",
	key: "12vg1m"
}], ["path", {
	d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13",
	key: "6uklza"
}]]);
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Rows2 = createLucideIcon("Rows2", [["rect", {
	width: "18",
	height: "18",
	x: "3",
	y: "3",
	rx: "2",
	key: "afitv7"
}], ["path", {
	d: "M3 12h18",
	key: "1i2n21"
}]]);
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Undo2 = createLucideIcon("Undo2", [["path", {
	d: "M9 14 4 9l5-5",
	key: "102s5s"
}], ["path", {
	d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",
	key: "f3b9sd"
}]]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
async function copyAppshotPng(blob, options) {
	const fetchImpl = options.fetchImpl ?? fetch;
	let nativeReason = "";
	if (options.native) try {
		const response = await fetchImpl("/api/appshot/clipboard", {
			method: "POST",
			headers: { "content-type": "image/png" },
			body: blob
		});
		if (response.ok) return "native";
		nativeReason = (await response.json().catch(() => null))?.detail || `HTTP ${response.status}`;
	} catch (error) {
		nativeReason = error.message;
	}
	const clipboard = options.clipboard !== void 0 ? options.clipboard : typeof navigator !== "undefined" ? navigator.clipboard : null;
	if (!clipboard || typeof ClipboardItem === "undefined") throw new Error(nativeReason || "no clipboard is available here");
	let timer;
	try {
		await Promise.race([clipboard.write([new ClipboardItem({ "image/png": blob })]), new Promise((_, reject) => {
			timer = setTimeout(() => reject(new Error(options.timeoutMessage)), options.timeoutMs ?? 5e3);
		})]);
	} finally {
		if (timer !== void 0) clearTimeout(timer);
	}
	return "browser";
}
const ARROW_STYLES = [
	"tapered",
	"classic",
	"double"
];
const TOOL_KEYS = [
	{
		tool: "move",
		key: "v"
	},
	{
		tool: "arrow",
		key: "a"
	},
	{
		tool: "line",
		key: "l"
	},
	{
		tool: "rect",
		key: "r"
	},
	{
		tool: "filled",
		key: "f"
	},
	{
		tool: "ellipse",
		key: "e"
	},
	{
		tool: "pen",
		key: "d"
	},
	{
		tool: "highlight",
		key: "m"
	},
	{
		tool: "text",
		key: "t"
	},
	{
		tool: "counter",
		key: "c"
	},
	{
		tool: "spotlight",
		key: "h"
	},
	{
		tool: "redact",
		key: "p"
	},
	{
		tool: "crop",
		key: "k"
	},
	{
		tool: "background",
		key: "b"
	}
];
function grabScope(tool) {
	if (tool === "move") return "any";
	if (tool === "pen" || tool === "highlight") return "grips";
	if (tool === "crop" || tool === "background") return "none";
	return "shapes";
}
function curveAt(a, via, b, t) {
	const u = 1 - t;
	return {
		x: u * u * a.x + 2 * u * t * via.x + t * t * b.x,
		y: u * u * a.y + 2 * u * t * via.y + t * t * b.y
	};
}
function segmentPath(op, steps = 32) {
	if (!op.via) return [op.from, op.to];
	const via = op.via;
	return Array.from({ length: steps + 1 }, (_, i) => curveAt(op.from, via, op.to, i / steps));
}
function segmentMiddle(op) {
	if (!op.via) return {
		x: (op.from.x + op.to.x) / 2,
		y: (op.from.y + op.to.y) / 2
	};
	return curveAt(op.from, op.via, op.to, .5);
}
var STRAIGHT_SNAP = 4;
function toolForKey(key) {
	const lower = key.toLowerCase();
	return TOOL_KEYS.find((entry) => entry.key === lower)?.tool ?? null;
}
const COLORS = [
	"#ff3b30",
	"#ff9500",
	"#ffcc00",
	"#34c759",
	"#0a84ff",
	"#af52de",
	"#ffffff",
	"#1c1c1e"
];
const CROP_RATIOS = [
	{
		id: "free",
		ratio: null
	},
	{
		id: "1:1",
		ratio: 1
	},
	{
		id: "4:3",
		ratio: 4 / 3
	},
	{
		id: "16:9",
		ratio: 16 / 9
	}
];
var nextId = 1;
function withId(shape) {
	nextId += 1;
	return {
		...shape,
		id: nextId
	};
}
const STROKE_LEVELS = [
	2,
	4,
	6,
	9,
	13
];
function strokeWidths(width, height) {
	const unit = Math.max(1, Math.max(width, height) / 1400);
	return STROKE_LEVELS.map((level) => Math.round(level * unit));
}
function textSize(stroke) {
	return Math.max(14, Math.round(stroke * 5));
}
function counterSize(stroke) {
	return Math.max(12, Math.round(stroke * 3));
}
function rectFrom(a, b) {
	return {
		x: Math.min(a.x, b.x),
		y: Math.min(a.y, b.y),
		w: Math.abs(b.x - a.x),
		h: Math.abs(b.y - a.y)
	};
}
function constrainEnd(tool, start, end, shift, ratio) {
	const dx = end.x - start.x;
	const dy = end.y - start.y;
	if ((tool === "arrow" || tool === "line") && shift) {
		const angle = Math.round(Math.atan2(dy, dx) / (Math.PI / 4)) * (Math.PI / 4);
		const length = Math.hypot(dx, dy);
		return {
			x: start.x + Math.cos(angle) * length,
			y: start.y + Math.sin(angle) * length
		};
	}
	const boxRatio = tool === "crop" ? ratio : shift ? 1 : null;
	if (boxRatio !== null && boxRatio > 0 && (tool === "crop" || isBoxTool(tool))) {
		const w = Math.abs(dx);
		const h = Math.abs(dy);
		const width = Math.max(w, h * boxRatio);
		const height = width / boxRatio;
		return {
			x: start.x + Math.sign(dx || 1) * width,
			y: start.y + Math.sign(dy || 1) * height
		};
	}
	return end;
}
function isBoxTool(tool) {
	return tool === "rect" || tool === "filled" || tool === "ellipse" || tool === "spotlight" || tool === "redact";
}
function unionRect(a, b) {
	const x = Math.min(a.x, b.x);
	const y = Math.min(a.y, b.y);
	return {
		x,
		y,
		w: Math.max(a.x + a.w, b.x + b.w) - x,
		h: Math.max(a.y + a.h, b.y + b.h) - y
	};
}
function extent(ops, width, height) {
	let area = {
		x: 0,
		y: 0,
		w: width,
		h: height
	};
	for (const op of ops) if (op.kind === "image") area = unionRect(area, op.rect);
	return area;
}
function viewport(ops, width, height) {
	for (let i = ops.length - 1; i >= 0; i -= 1) {
		const op = ops[i];
		if (op.kind === "crop") return op.rect;
	}
	return extent(ops, width, height);
}
function clampInto(rect, area) {
	const x = Math.max(area.x, Math.min(area.x + area.w, rect.x));
	const y = Math.max(area.y, Math.min(area.y + area.h, rect.y));
	const right = Math.max(area.x, Math.min(area.x + area.w, rect.x + rect.w));
	const bottom = Math.max(area.y, Math.min(area.y + area.h, rect.y + rect.h));
	if (right - x < 2 || bottom - y < 2) return null;
	return {
		x,
		y,
		w: right - x,
		h: bottom - y
	};
}
var MIN_CROP = 8;
function cropHandles(rect, ratio) {
	const { x, y, w, h } = rect;
	const corners = [
		{
			id: "nw",
			at: {
				x,
				y
			}
		},
		{
			id: "ne",
			at: {
				x: x + w,
				y
			}
		},
		{
			id: "se",
			at: {
				x: x + w,
				y: y + h
			}
		},
		{
			id: "sw",
			at: {
				x,
				y: y + h
			}
		}
	];
	if (ratio !== null) return corners;
	return [
		...corners,
		{
			id: "n",
			at: {
				x: x + w / 2,
				y
			}
		},
		{
			id: "e",
			at: {
				x: x + w,
				y: y + h / 2
			}
		},
		{
			id: "s",
			at: {
				x: x + w / 2,
				y: y + h
			}
		},
		{
			id: "w",
			at: {
				x,
				y: y + h / 2
			}
		}
	];
}
function cropHandleAt(rect, p, radius, ratio) {
	let best = null;
	let bestDistance = radius;
	for (const handle of cropHandles(rect, ratio)) {
		const distance = Math.hypot(handle.at.x - p.x, handle.at.y - p.y);
		if (distance <= bestDistance) {
			best = handle.id;
			bestDistance = distance;
		}
	}
	return best;
}
function resizeCrop(original, handle, p, area, ratio) {
	const left = original.x;
	const top = original.y;
	const right = original.x + original.w;
	const bottom = original.y + original.h;
	const px = Math.max(area.x, Math.min(area.x + area.w, p.x));
	const py = Math.max(area.y, Math.min(area.y + area.h, p.y));
	if (handle === "n") {
		const y = Math.min(py, bottom - MIN_CROP);
		return {
			x: left,
			y,
			w: original.w,
			h: bottom - y
		};
	}
	if (handle === "s") return {
		x: left,
		y: top,
		w: original.w,
		h: Math.max(py, top + MIN_CROP) - top
	};
	if (handle === "w") {
		const x = Math.min(px, right - MIN_CROP);
		return {
			x,
			y: top,
			w: right - x,
			h: original.h
		};
	}
	if (handle === "e") return {
		x: left,
		y: top,
		w: Math.max(px, left + MIN_CROP) - left,
		h: original.h
	};
	const anchor = {
		x: handle === "nw" || handle === "sw" ? right : left,
		y: handle === "nw" || handle === "ne" ? bottom : top
	};
	const dirX = handle === "ne" || handle === "se" ? 1 : -1;
	const dirY = handle === "sw" || handle === "se" ? 1 : -1;
	const roomX = dirX > 0 ? area.x + area.w - anchor.x : anchor.x - area.x;
	const roomY = dirY > 0 ? area.y + area.h - anchor.y : anchor.y - area.y;
	let w = Math.max(MIN_CROP, Math.min(roomX, (px - anchor.x) * dirX));
	let h = Math.max(MIN_CROP, Math.min(roomY, (py - anchor.y) * dirY));
	if (ratio !== null && ratio > 0) {
		w = Math.max(w, h * ratio);
		h = w / ratio;
		if (w > roomX) {
			w = roomX;
			h = w / ratio;
		}
		if (h > roomY) {
			h = roomY;
			w = h * ratio;
		}
	}
	return {
		x: dirX > 0 ? anchor.x : anchor.x - w,
		y: dirY > 0 ? anchor.y : anchor.y - h,
		w,
		h
	};
}
function moveCrop(rect, dx, dy, area) {
	return {
		...rect,
		x: Math.max(area.x, Math.min(area.x + area.w - rect.w, rect.x + dx)),
		y: Math.max(area.y, Math.min(area.y + area.h - rect.h, rect.y + dy))
	};
}
function fitRatio(rect, ratio) {
	const w = Math.min(rect.w, rect.h * ratio);
	const h = w / ratio;
	return {
		x: rect.x + (rect.w - w) / 2,
		y: rect.y + (rect.h - h) / 2,
		w,
		h
	};
}
function coversAll(rect, area) {
	return Math.abs(rect.x - area.x) < .5 && Math.abs(rect.y - area.y) < .5 && Math.abs(rect.w - area.w) < .5 && Math.abs(rect.h - area.h) < .5;
}
function withCrop(ops, rect) {
	const rest = ops.filter((op) => op.kind !== "crop");
	return rect ? [...rest, withId({
		kind: "crop",
		rect
	})] : rest;
}
const PLACEMENTS = [
	"beside",
	"below",
	"over"
];
function placeImage(view, width, height, placement) {
	const aspect = Math.max(1, width) / Math.max(1, height);
	if (placement === "beside") return {
		x: view.x + view.w,
		y: view.y,
		w: view.h * aspect,
		h: view.h
	};
	if (placement === "below") return {
		x: view.x,
		y: view.y + view.h,
		w: view.w,
		h: view.w / aspect
	};
	const w = Math.min(view.w * .45, view.h * .45 * aspect, width);
	const h = w / aspect;
	return {
		x: view.x + (view.w - w) / 2,
		y: view.y + (view.h - h) / 2,
		w,
		h
	};
}
function addImage(ops, width, height, image, placement) {
	const view = viewport(ops, width, height);
	const rect = placeImage(view, image.width, image.height, placement);
	const layer = withId({
		kind: "image",
		rect,
		src: image.src
	});
	const next = [...ops, layer];
	return {
		ops: ops.some((op) => op.kind === "crop") ? withCrop(next, unionRect(view, rect)) : next,
		id: layer.id
	};
}
function nextCounter(ops) {
	let highest = 0;
	for (const op of ops) if (op.kind === "counter") highest = Math.max(highest, op.n);
	return highest + 1;
}
var roughMeasure = (text, size) => text.length * size * .55;
function textLines(text) {
	return text.split("\n");
}
function bounds(op, measure = roughMeasure) {
	switch (op.kind) {
		case "arrow":
		case "line": {
			if (!op.via) return rectFrom(op.from, op.to);
			const path = segmentPath(op);
			const xs = path.map((p) => p.x);
			const ys = path.map((p) => p.y);
			return {
				x: Math.min(...xs),
				y: Math.min(...ys),
				w: Math.max(...xs) - Math.min(...xs),
				h: Math.max(...ys) - Math.min(...ys)
			};
		}
		case "pen":
		case "highlight": {
			const xs = op.points.map((p) => p.x);
			const ys = op.points.map((p) => p.y);
			return {
				x: Math.min(...xs),
				y: Math.min(...ys),
				w: Math.max(...xs) - Math.min(...xs),
				h: Math.max(...ys) - Math.min(...ys)
			};
		}
		case "text": {
			const lines = textLines(op.text);
			const width = Math.max(...lines.map((line) => measure(line, op.size)));
			const pad = op.style === "label" ? op.size * .4 : 0;
			return {
				x: op.at.x - pad,
				y: op.at.y - pad,
				w: width + pad * 2,
				h: lines.length * op.size * 1.25 + pad * 2
			};
		}
		case "counter": return {
			x: op.at.x - op.size,
			y: op.at.y - op.size,
			w: op.size * 2,
			h: op.size * 2
		};
		default: return op.rect;
	}
}
function distanceToSegment(p, a, b) {
	const dx = b.x - a.x;
	const dy = b.y - a.y;
	const lengthSq = dx * dx + dy * dy;
	const t = lengthSq === 0 ? 0 : Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / lengthSq));
	return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}
function inside(p, box, slop) {
	return p.x >= box.x - slop && p.x <= box.x + box.w + slop && p.y >= box.y - slop && p.y <= box.y + box.h + slop;
}
var AREA_KINDS = new Set([
	"spotlight",
	"redact",
	"image"
]);
function hits(op, p, slop, measure) {
	switch (op.kind) {
		case "crop": return false;
		case "arrow":
		case "line": {
			const path = segmentPath(op);
			for (let j = 1; j < path.length; j += 1) if (distanceToSegment(p, path[j - 1], path[j]) <= slop + op.width) return true;
			return false;
		}
		case "pen":
		case "highlight": {
			const reach = slop + (op.kind === "highlight" ? op.width * 2 : op.width);
			if (op.points.length === 1) return Math.hypot(p.x - op.points[0].x, p.y - op.points[0].y) <= reach;
			for (let j = 1; j < op.points.length; j += 1) if (distanceToSegment(p, op.points[j - 1], op.points[j]) <= reach) return true;
			return false;
		}
		case "rect": {
			const reach = slop + op.width;
			const r = op.rect;
			return inside(p, r, reach) && !inside(p, {
				x: r.x + reach,
				y: r.y + reach,
				w: r.w - reach * 2,
				h: r.h - reach * 2
			}, 0);
		}
		case "ellipse": {
			const rx = Math.max(1, op.rect.w / 2);
			const ry = Math.max(1, op.rect.h / 2);
			const dx = (p.x - (op.rect.x + rx)) / rx;
			const dy = (p.y - (op.rect.y + ry)) / ry;
			return Math.abs(Math.hypot(dx, dy) - 1) * Math.min(rx, ry) <= slop + op.width;
		}
		default: return inside(p, bounds(op, measure), slop);
	}
}
function hitTest(ops, p, slop, measure, { areas: withAreas = true } = {}) {
	for (const areas of withAreas ? [false, true] : [false]) for (let i = ops.length - 1; i >= 0; i -= 1) {
		const op = ops[i];
		if (AREA_KINDS.has(op.kind) !== areas) continue;
		if (hits(op, p, slop, measure)) return op;
	}
	return null;
}
function shiftPoint(p, dx, dy) {
	return {
		x: p.x + dx,
		y: p.y + dy
	};
}
function translate(op, dx, dy) {
	switch (op.kind) {
		case "arrow":
		case "line": return {
			...op,
			from: shiftPoint(op.from, dx, dy),
			to: shiftPoint(op.to, dx, dy),
			...op.via ? { via: shiftPoint(op.via, dx, dy) } : {}
		};
		case "pen":
		case "highlight": return {
			...op,
			points: op.points.map((p) => shiftPoint(p, dx, dy))
		};
		case "text":
		case "counter": return {
			...op,
			at: shiftPoint(op.at, dx, dy)
		};
		default: return {
			...op,
			rect: {
				...op.rect,
				x: op.rect.x + dx,
				y: op.rect.y + dy
			}
		};
	}
}
var OPPOSITE = {
	nw: "se",
	ne: "sw",
	sw: "ne",
	se: "nw"
};
function corner(box, id) {
	return {
		x: id === "nw" || id === "sw" ? box.x : box.x + box.w,
		y: id === "nw" || id === "ne" ? box.y : box.y + box.h
	};
}
function handles(op, measure) {
	switch (op.kind) {
		case "arrow":
		case "line": return [
			{
				id: "from",
				at: op.from
			},
			{
				id: "mid",
				at: segmentMiddle(op)
			},
			{
				id: "to",
				at: op.to
			}
		];
		case "crop": return [];
		case "counter": return [{
			id: "size",
			at: {
				x: op.at.x + op.size,
				y: op.at.y
			}
		}];
		default: {
			const box = bounds(op, measure);
			return [
				"nw",
				"ne",
				"sw",
				"se"
			].map((id) => ({
				id,
				at: corner(box, id)
			}));
		}
	}
}
function handleAt(op, p, radius, measure) {
	let best = null;
	let bestDistance = radius;
	for (const handle of handles(op, measure)) {
		const distance = Math.hypot(handle.at.x - p.x, handle.at.y - p.y);
		if (distance <= bestDistance) {
			best = handle.id;
			bestDistance = distance;
		}
	}
	return best;
}
function reshape(original, handle, p, measure) {
	const op = original;
	switch (op.kind) {
		case "arrow":
		case "line":
			if (handle === "from") return {
				...op,
				from: p
			};
			if (handle === "to") return {
				...op,
				to: p
			};
			if (handle === "mid") {
				const middle = {
					x: (op.from.x + op.to.x) / 2,
					y: (op.from.y + op.to.y) / 2
				};
				if (Math.hypot(p.x - middle.x, p.y - middle.y) < STRAIGHT_SNAP) {
					const { via: _via, ...straight } = op;
					return straight;
				}
				return {
					...op,
					via: {
						x: 2 * p.x - middle.x,
						y: 2 * p.y - middle.y
					}
				};
			}
			return original;
		case "crop": return original;
		case "image": {
			if (handle === "from" || handle === "to" || handle === "mid" || handle === "size") return original;
			const anchor = corner(op.rect, OPPOSITE[handle]);
			const aspect = op.rect.w / Math.max(1e-6, op.rect.h);
			const w = Math.max(8, Math.abs(p.x - anchor.x), Math.abs(p.y - anchor.y) * aspect);
			const h = w / aspect;
			const x = handle === "ne" || handle === "se" ? anchor.x : anchor.x - w;
			const y = handle === "sw" || handle === "se" ? anchor.y : anchor.y - h;
			return {
				...op,
				rect: {
					x,
					y,
					w,
					h
				}
			};
		}
		case "counter": return {
			...op,
			size: Math.max(8, Math.hypot(p.x - op.at.x, p.y - op.at.y))
		};
		case "text": {
			if (handle === "from" || handle === "to" || handle === "mid" || handle === "size") return original;
			const box = bounds(op, measure);
			const anchor = corner(box, OPPOSITE[handle]);
			const factor = Math.max(.1, Math.abs(p.y - anchor.y) / Math.max(1, box.h));
			const sized = {
				...op,
				size: Math.max(8, Math.round(op.size * factor))
			};
			const grown = bounds({
				...sized,
				at: {
					x: 0,
					y: 0
				}
			}, measure);
			const pad = sized.style === "label" ? sized.size * .4 : 0;
			const left = handle === "ne" || handle === "se" ? anchor.x : anchor.x - grown.w;
			const top = handle === "sw" || handle === "se" ? anchor.y : anchor.y - grown.h;
			return {
				...sized,
				at: {
					x: left + pad,
					y: top + pad
				}
			};
		}
		case "pen":
		case "highlight": {
			if (handle === "from" || handle === "to" || handle === "mid" || handle === "size") return original;
			const box = bounds(op);
			const anchor = corner(box, OPPOSITE[handle]);
			const grip = corner(box, handle);
			const sx = Math.abs(grip.x - anchor.x) < 1e-6 ? 1 : (p.x - anchor.x) / (grip.x - anchor.x);
			const sy = Math.abs(grip.y - anchor.y) < 1e-6 ? 1 : (p.y - anchor.y) / (grip.y - anchor.y);
			return {
				...op,
				points: op.points.map((q) => ({
					x: anchor.x + (q.x - anchor.x) * sx,
					y: anchor.y + (q.y - anchor.y) * sy
				}))
			};
		}
		default:
			if (handle === "from" || handle === "to" || handle === "mid" || handle === "size") return original;
			return {
				...op,
				rect: rectFrom(corner(op.rect, OPPOSITE[handle]), p)
			};
	}
}
function handleCursor(handle) {
	if (handle === "nw" || handle === "se") return "nwse-resize";
	if (handle === "ne" || handle === "sw") return "nesw-resize";
	if (handle === "size" || handle === "e" || handle === "w") return "ew-resize";
	if (handle === "n" || handle === "s") return "ns-resize";
	return "grab";
}
function isMeaningful(op) {
	switch (op.kind) {
		case "arrow":
		case "line": return Math.hypot(op.to.x - op.from.x, op.to.y - op.from.y) >= 4;
		case "pen":
		case "highlight": return op.points.length > 0;
		case "text": return op.text.trim().length > 0;
		case "counter": return true;
		default: return op.rect.w >= 4 && op.rect.h >= 4;
	}
}
var HISTORY_LIMIT = 100;
function emptyHistory() {
	return {
		past: [],
		present: [],
		future: []
	};
}
function commit(history, next) {
	return {
		past: [...history.past, history.present].slice(-HISTORY_LIMIT),
		present: next,
		future: []
	};
}
function undo(history) {
	if (history.past.length === 0) return history;
	return {
		past: history.past.slice(0, -1),
		present: history.past[history.past.length - 1],
		future: [history.present, ...history.future]
	};
}
function redo(history) {
	if (history.future.length === 0) return history;
	return {
		past: [...history.past, history.present],
		present: history.future[0],
		future: history.future.slice(1)
	};
}
const BACKGROUND_PRESETS = [
	{
		id: "dawn",
		stops: [
			"#ff9a8b",
			"#ff6a88",
			"#ff99ac"
		]
	},
	{
		id: "lagoon",
		stops: ["#43cea2", "#185a9d"]
	},
	{
		id: "dusk",
		stops: [
			"#7f7fd5",
			"#86a8e7",
			"#91eae4"
		]
	},
	{
		id: "ember",
		stops: ["#f7971e", "#ffd200"]
	},
	{
		id: "orchid",
		stops: ["#c471f5", "#fa71cd"]
	},
	{
		id: "slate",
		stops: ["#434343", "#1c1c1e"]
	},
	{
		id: "paper",
		stops: ["#f5f5f7"]
	},
	{
		id: "ink",
		stops: ["#111113"]
	}
];
const DEFAULT_BACKGROUND = {
	enabled: false,
	preset: "dusk",
	padding: .08,
	radius: 12,
	shadow: true
};
function presetById(id) {
	return BACKGROUND_PRESETS.find((preset) => preset.id === id) ?? BACKGROUND_PRESETS[0];
}
function frameLayout(width, height, background) {
	if (!background.enabled) return {
		width,
		height,
		image: {
			x: 0,
			y: 0,
			w: width,
			h: height
		},
		radius: 0
	};
	const pad = Math.round(Math.max(width, height) * Math.max(0, Math.min(.25, background.padding)));
	const unit = Math.max(1, Math.max(width, height) / 1400);
	return {
		width: width + pad * 2,
		height: height + pad * 2,
		image: {
			x: pad,
			y: pad,
			w: width,
			h: height
		},
		radius: Math.round(Math.max(0, background.radius) * unit)
	};
}
function presetCss(preset) {
	if (preset.stops.length === 1) return preset.stops[0];
	return `linear-gradient(135deg, ${preset.stops.join(", ")})`;
}
function contrastOn(hex) {
	const value = hex.replace("#", "");
	const full = value.length === 3 ? value.split("").map((c) => c + c).join("") : value;
	const r = parseInt(full.slice(0, 2), 16);
	const g = parseInt(full.slice(2, 4), 16);
	const b = parseInt(full.slice(4, 6), 16);
	return (.2126 * r + .7152 * g + .0722 * b) / 255 > .6 ? "#111111" : "#ffffff";
}
function taperedArrowOutline(from, to, width, via) {
	if (via) return curvedArrowOutline(from, to, width, via);
	const dx = to.x - from.x;
	const dy = to.y - from.y;
	const length = Math.hypot(dx, dy);
	if (length < 2) return [];
	const ux = dx / length;
	const uy = dy / length;
	const nx = -uy;
	const ny = ux;
	const head = Math.min(Math.max(12, width * 4.6 + 6), length * .62);
	const barb = head * .56;
	const neckAt = length - head * .7;
	const tail = Math.max(.6, width * .14);
	const neck = Math.max(1.4, width * .78);
	const at = (along, across) => ({
		x: from.x + ux * along + nx * across,
		y: from.y + uy * along + ny * across
	});
	return [
		at(0, tail),
		at(neckAt, neck),
		at(length - head, barb),
		at(length, 0),
		at(length - head, -barb),
		at(neckAt, -neck),
		at(0, -tail)
	];
}
function curvedArrowOutline(from, to, width, via) {
	const path = segmentPath({
		from,
		to,
		via
	}, 48);
	const lengths = [0];
	for (let i = 1; i < path.length; i += 1) lengths.push(lengths[i - 1] + Math.hypot(path[i].x - path[i - 1].x, path[i].y - path[i - 1].y));
	const length = lengths[lengths.length - 1];
	if (length < 2) return [];
	const head = Math.min(Math.max(12, width * 4.6 + 6), length * .62);
	const barb = head * .56;
	const neckAt = length - head * .7;
	const tail = Math.max(.6, width * .14);
	const neck = Math.max(1.4, width * .78);
	const left = [];
	const right = [];
	for (let i = 0; i < path.length && lengths[i] <= neckAt; i += 1) {
		const a = path[Math.max(0, i - 1)];
		const b = path[Math.min(path.length - 1, i + 1)];
		const span$1 = Math.hypot(b.x - a.x, b.y - a.y) || 1;
		const nx = -(b.y - a.y) / span$1;
		const ny = (b.x - a.x) / span$1;
		const half = tail + (neck - tail) * (lengths[i] / Math.max(1, neckAt));
		left.push({
			x: path[i].x + nx * half,
			y: path[i].y + ny * half
		});
		right.push({
			x: path[i].x - nx * half,
			y: path[i].y - ny * half
		});
	}
	const span = Math.hypot(to.x - via.x, to.y - via.y) || 1;
	const ux = (to.x - via.x) / span;
	const uy = (to.y - via.y) / span;
	const base = {
		x: to.x - ux * head,
		y: to.y - uy * head
	};
	return [
		...left,
		{
			x: base.x - uy * barb,
			y: base.y + ux * barb
		},
		to,
		{
			x: base.x + uy * barb,
			y: base.y - ux * barb
		},
		...right.reverse()
	];
}
function taperedArrow(ctx, from, to, width, via) {
	const outline = taperedArrowOutline(from, to, width, via);
	if (outline.length === 0) return;
	ctx.beginPath();
	ctx.moveTo(outline[0].x, outline[0].y);
	for (const point of outline.slice(1)) ctx.lineTo(point.x, point.y);
	ctx.closePath();
	ctx.shadowColor = "rgba(0,0,0,0.32)";
	ctx.shadowBlur = Math.max(3, width * 1.1);
	ctx.shadowOffsetY = Math.max(1, width * .3);
	ctx.fill();
	ctx.shadowColor = "transparent";
	ctx.lineWidth = Math.max(1, width * .22);
	ctx.lineJoin = "round";
	ctx.stroke();
}
function curvedArrow(ctx, from, to, width, via, double) {
	ctx.beginPath();
	ctx.moveTo(from.x, from.y);
	ctx.quadraticCurveTo(via.x, via.y, to.x, to.y);
	ctx.stroke();
	const head = Math.max(10, width * 4);
	const tips = double ? [[to, via], [from, via]] : [[to, via]];
	for (const [tip, toward] of tips) {
		const angle = Math.atan2(tip.y - toward.y, tip.x - toward.x);
		ctx.beginPath();
		ctx.moveTo(tip.x, tip.y);
		ctx.lineTo(tip.x - Math.cos(angle - .45) * head, tip.y - Math.sin(angle - .45) * head);
		ctx.lineTo(tip.x - Math.cos(angle + .45) * head, tip.y - Math.sin(angle + .45) * head);
		ctx.closePath();
		ctx.fill();
	}
}
function arrow(ctx, from, to, width) {
	const angle = Math.atan2(to.y - from.y, to.x - from.x);
	const head = Math.max(10, width * 4);
	const back = {
		x: to.x - Math.cos(angle) * head * .8,
		y: to.y - Math.sin(angle) * head * .8
	};
	ctx.beginPath();
	ctx.moveTo(from.x, from.y);
	ctx.lineTo(back.x, back.y);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(to.x, to.y);
	ctx.lineTo(to.x - Math.cos(angle - .45) * head, to.y - Math.sin(angle - .45) * head);
	ctx.lineTo(to.x - Math.cos(angle + .45) * head, to.y - Math.sin(angle + .45) * head);
	ctx.closePath();
	ctx.fill();
}
function smoothStroke(ctx, points) {
	ctx.beginPath();
	ctx.moveTo(points[0].x, points[0].y);
	if (points.length === 1) ctx.lineTo(points[0].x + .1, points[0].y);
	else {
		for (let i = 1; i < points.length - 1; i += 1) {
			const mid = {
				x: (points[i].x + points[i + 1].x) / 2,
				y: (points[i].y + points[i + 1].y) / 2
			};
			ctx.quadraticCurveTo(points[i].x, points[i].y, mid.x, mid.y);
		}
		const last = points[points.length - 1];
		ctx.lineTo(last.x, last.y);
	}
	ctx.stroke();
}
function makeCanvas(width, height) {
	const canvas = document.createElement("canvas");
	canvas.width = Math.max(1, Math.round(width));
	canvas.height = Math.max(1, Math.round(height));
	return canvas;
}
function buildScene(base, width, height, ops, sources) {
	const area = extent(ops, width, height);
	const layers = ops.filter((op) => op.kind === "image");
	if (layers.length === 0) return {
		source: base,
		origin: {
			x: 0,
			y: 0
		},
		area
	};
	const canvas = makeCanvas(area.w, area.h);
	const ctx = canvas.getContext("2d");
	if (!ctx) return {
		source: base,
		origin: {
			x: 0,
			y: 0
		},
		area
	};
	ctx.drawImage(base, -area.x, -area.y);
	for (const layer of layers) {
		const picture = sources?.get(layer.src);
		if (picture) ctx.drawImage(picture, layer.rect.x - area.x, layer.rect.y - area.y, layer.rect.w, layer.rect.h);
	}
	return {
		source: canvas,
		origin: {
			x: area.x,
			y: area.y
		},
		area
	};
}
function redact(ctx, scene, rect, mode, block) {
	const w = Math.max(1, Math.round(rect.w / block));
	const h = Math.max(1, Math.round(rect.h / block));
	const small = makeCanvas(w, h);
	const sctx = small.getContext("2d");
	if (!sctx) return;
	sctx.imageSmoothingEnabled = true;
	sctx.drawImage(scene.source, rect.x - scene.origin.x, rect.y - scene.origin.y, rect.w, rect.h, 0, 0, w, h);
	ctx.save();
	ctx.beginPath();
	ctx.rect(rect.x, rect.y, rect.w, rect.h);
	ctx.clip();
	if (mode === "pixelate") {
		ctx.imageSmoothingEnabled = false;
		ctx.drawImage(small, 0, 0, w, h, rect.x, rect.y, rect.w, rect.h);
	} else {
		const tiny = makeCanvas(Math.max(1, Math.round(w / 2)), Math.max(1, Math.round(h / 2)));
		const tctx = tiny.getContext("2d");
		ctx.imageSmoothingEnabled = true;
		if (tctx) {
			tctx.imageSmoothingEnabled = true;
			tctx.drawImage(small, 0, 0, tiny.width, tiny.height);
			ctx.drawImage(tiny, 0, 0, tiny.width, tiny.height, rect.x, rect.y, rect.w, rect.h);
		} else ctx.drawImage(small, 0, 0, w, h, rect.x, rect.y, rect.w, rect.h);
	}
	ctx.restore();
}
function roundedRect(ctx, rect, radius) {
	ctx.beginPath();
	roundedRectPath(ctx, rect, radius);
}
function textFont(size) {
	return `600 ${size}px Inter, "Segoe UI", system-ui, -apple-system, sans-serif`;
}
function canvasMeasure(ctx) {
	if (!ctx) return roughMeasure;
	return (text, size) => {
		ctx.font = textFont(size);
		return ctx.measureText(text).width;
	};
}
function paintText(ctx, op) {
	ctx.font = textFont(op.size);
	ctx.textBaseline = "top";
	const lines = textLines(op.text);
	const lineHeight = op.size * 1.25;
	if (op.style === "label") {
		const pad = op.size * .4;
		const width = Math.max(...lines.map((line) => ctx.measureText(line).width));
		ctx.fillStyle = op.color;
		roundedRect(ctx, {
			x: op.at.x - pad,
			y: op.at.y - pad,
			w: width + pad * 2,
			h: lines.length * lineHeight + pad * 2
		}, pad);
		ctx.fill();
		ctx.fillStyle = contrastOn(op.color);
	} else if (op.style === "outline") {
		ctx.lineJoin = "round";
		ctx.lineWidth = Math.max(2, op.size / 6);
		ctx.strokeStyle = contrastOn(op.color);
		lines.forEach((line, i) => ctx.strokeText(line, op.at.x, op.at.y + i * lineHeight));
		ctx.fillStyle = op.color;
	} else {
		ctx.fillStyle = op.color;
		ctx.shadowColor = "rgba(0,0,0,0.45)";
		ctx.shadowBlur = Math.max(2, op.size / 8);
	}
	lines.forEach((line, i) => ctx.fillText(line, op.at.x, op.at.y + i * lineHeight));
}
function paintCounter(ctx, op) {
	ctx.beginPath();
	ctx.arc(op.at.x, op.at.y, op.size, 0, Math.PI * 2);
	ctx.fillStyle = op.color;
	ctx.shadowColor = "rgba(0,0,0,0.35)";
	ctx.shadowBlur = Math.max(2, op.size / 4);
	ctx.fill();
	ctx.shadowColor = "transparent";
	ctx.lineWidth = Math.max(1.5, op.size / 9);
	ctx.strokeStyle = "rgba(255,255,255,0.9)";
	ctx.stroke();
	ctx.fillStyle = contrastOn(op.color);
	ctx.font = textFont(Math.round(op.size * (op.n > 9 ? .95 : 1.15)));
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText(String(op.n), op.at.x, op.at.y + op.size * .06);
}
function paintShape(ctx, scene, op) {
	ctx.save();
	ctx.lineCap = "round";
	ctx.lineJoin = "round";
	switch (op.kind) {
		case "arrow":
			ctx.strokeStyle = op.color;
			ctx.fillStyle = op.color;
			ctx.lineWidth = op.width;
			if (op.via && (op.style === "classic" || op.style === "double")) curvedArrow(ctx, op.from, op.to, op.width, op.via, op.style === "double");
			else if (op.style === "classic") arrow(ctx, op.from, op.to, op.width);
			else if (op.style === "double") {
				arrow(ctx, op.from, op.to, op.width);
				arrow(ctx, op.to, op.from, op.width);
			} else taperedArrow(ctx, op.from, op.to, op.width, op.via);
			break;
		case "line":
			ctx.strokeStyle = op.color;
			ctx.lineWidth = op.width;
			ctx.beginPath();
			ctx.moveTo(op.from.x, op.from.y);
			if (op.via) ctx.quadraticCurveTo(op.via.x, op.via.y, op.to.x, op.to.y);
			else ctx.lineTo(op.to.x, op.to.y);
			ctx.stroke();
			break;
		case "rect":
			ctx.strokeStyle = op.color;
			ctx.lineWidth = op.width;
			roundedRect(ctx, op.rect, op.width);
			ctx.stroke();
			break;
		case "filled":
			ctx.fillStyle = op.color;
			roundedRect(ctx, op.rect, op.width);
			ctx.fill();
			break;
		case "ellipse":
			ctx.strokeStyle = op.color;
			ctx.lineWidth = op.width;
			ctx.beginPath();
			ctx.ellipse(op.rect.x + op.rect.w / 2, op.rect.y + op.rect.h / 2, Math.max(1, op.rect.w / 2), Math.max(1, op.rect.h / 2), 0, 0, Math.PI * 2);
			ctx.stroke();
			break;
		case "pen":
		case "highlight":
			if (op.points.length === 0) break;
			ctx.strokeStyle = op.color;
			ctx.lineWidth = op.kind === "highlight" ? op.width * 4 : op.width;
			if (op.kind === "highlight") {
				ctx.globalAlpha = .4;
				ctx.globalCompositeOperation = "multiply";
				ctx.lineCap = "butt";
			}
			smoothStroke(ctx, op.points);
			break;
		case "text":
			paintText(ctx, op);
			break;
		case "counter":
			paintCounter(ctx, op);
			break;
		case "redact":
			redact(ctx, scene, op.rect, op.mode, op.block);
			break;
		case "spotlight":
		case "crop":
		case "image": break;
	}
	ctx.restore();
}
function paintSpotlights(ctx, spots, area) {
	if (spots.length === 0) return;
	ctx.save();
	ctx.fillStyle = "rgba(0,0,0,0.55)";
	ctx.beginPath();
	ctx.rect(area.x, area.y, area.w, area.h);
	for (const spot of spots) roundedRectPath(ctx, spot, Math.min(spot.w, spot.h) * .06);
	ctx.fill("evenodd");
	ctx.restore();
}
function roundedRectPath(ctx, rect, radius) {
	const r = Math.max(0, Math.min(radius, rect.w / 2, rect.h / 2));
	ctx.moveTo(rect.x + r, rect.y);
	ctx.arcTo(rect.x + rect.w, rect.y, rect.x + rect.w, rect.y + rect.h, r);
	ctx.arcTo(rect.x + rect.w, rect.y + rect.h, rect.x, rect.y + rect.h, r);
	ctx.arcTo(rect.x, rect.y + rect.h, rect.x, rect.y, r);
	ctx.arcTo(rect.x, rect.y, rect.x + rect.w, rect.y, r);
	ctx.closePath();
}
function paintOps(ctx, scene, ops) {
	ctx.drawImage(scene.source, scene.origin.x, scene.origin.y);
	const spots = [];
	for (const op of ops) if (op.kind === "spotlight") spots.push(op.rect);
	else paintShape(ctx, scene, op);
	paintSpotlights(ctx, spots, scene.area);
}
function renderResult(base, ops, background, sources) {
	const iw = base.naturalWidth;
	const ih = base.naturalHeight;
	const view = viewport(ops, iw, ih);
	const picture = makeCanvas(view.w, view.h);
	const pctx = picture.getContext("2d");
	if (!pctx) throw new Error("No 2D canvas available.");
	pctx.translate(-view.x, -view.y);
	paintOps(pctx, buildScene(base, iw, ih, ops, sources), ops);
	if (!background.enabled) return picture;
	const layout = frameLayout(picture.width, picture.height, background);
	const framed = makeCanvas(layout.width, layout.height);
	const ctx = framed.getContext("2d");
	if (!ctx) throw new Error("No 2D canvas available.");
	const preset = presetById(background.preset);
	if (preset.stops.length === 1) ctx.fillStyle = preset.stops[0];
	else {
		const gradient = ctx.createLinearGradient(0, 0, layout.width, layout.height);
		preset.stops.forEach((stop, i) => gradient.addColorStop(i / (preset.stops.length - 1), stop));
		ctx.fillStyle = gradient;
	}
	ctx.fillRect(0, 0, layout.width, layout.height);
	if (background.shadow) {
		ctx.save();
		ctx.shadowColor = "rgba(0,0,0,0.35)";
		ctx.shadowBlur = Math.max(12, layout.image.x * .5);
		ctx.shadowOffsetY = Math.max(4, layout.image.x * .12);
		ctx.fillStyle = "#000";
		roundedRect(ctx, layout.image, layout.radius);
		ctx.fill();
		ctx.restore();
	}
	ctx.save();
	roundedRect(ctx, layout.image, layout.radius);
	ctx.clip();
	ctx.drawImage(picture, layout.image.x, layout.image.y);
	ctx.restore();
	return framed;
}
async function exportPng(base, ops, background, sources) {
	const canvas = renderResult(base, ops, background, sources);
	return await new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(/* @__PURE__ */ new Error("Export failed.")), "image/png"));
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var TOOL_ORDER = [
	"move",
	"rect",
	"filled",
	"ellipse",
	"line",
	"arrow",
	"text",
	"redact",
	"spotlight",
	"counter",
	"pen",
	"highlight"
];
var KEY_OF = Object.fromEntries(TOOL_KEYS.map(({ tool, key }) => [tool, key]));
var ZOOMS = [
	.5,
	1,
	2
];
var COLOR_KEY = "jarvis.appshotEditor.color";
var GRIP_RADIUS = 5;
var ARROW_KEY = "jarvis.appshotEditor.arrowStyle";
var BACKGROUND_KEY = "jarvis.appshotEditor.background";
function readStored(key, fallback, valid) {
	try {
		const raw = localStorage.getItem(key);
		if (raw === null) return fallback;
		const value = JSON.parse(raw);
		return valid(value) ? value : fallback;
	} catch {
		return fallback;
	}
}
function writeStored(key, value) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {}
}
var isArrowStyle = (value) => typeof value === "string" && ARROW_STYLES.includes(value);
var isColor = (value) => typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value);
var isBackground = (value) => typeof value === "object" && value !== null && "preset" in value && "padding" in value;
function stamp() {
	return (/* @__PURE__ */ new Date()).toISOString().replace(/[-:]/g, "").replace(/\..*$/, "").replace("T", "-");
}
var PLACEMENT_KEY = "jarvis.appshotEditor.placement";
var isPlacement = (value) => typeof value === "string" && PLACEMENTS.includes(value);
function imageFile(items) {
	if (!items) return null;
	for (const entry of Array.from(items)) {
		const file = entry instanceof File ? entry : entry.kind === "file" ? entry.getAsFile() : null;
		if (file && file.type.startsWith("image/")) return file;
	}
	return null;
}
function insideRect(p, rect) {
	return p.x >= rect.x && p.x <= rect.x + rect.w && p.y >= rect.y && p.y <= rect.y + rect.h;
}
function loadPicture(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject(/* @__PURE__ */ new Error("The picture could not be loaded."));
		img.src = src;
	});
}
function AppshotEditor({ appshotId, onClose, onApplied, variant = "overlay" }) {
	const t = useT();
	const ready = useLocaleChunk("appshot_editor");
	const native = useCapabilities().data?.native_file_actions ?? false;
	const pushToast = useEventStore((s) => s.pushToast);
	const assistantName = useEventStore((s) => s.assistantName);
	const [image, setImage] = (0, import_react.useState)(null);
	const [load, setLoad] = (0, import_react.useState)("loading");
	const [history, setHistory] = (0, import_react.useState)(emptyHistory);
	const ops = history.present;
	const [tool, setTool] = (0, import_react.useState)("arrow");
	const [color, setColorState] = (0, import_react.useState)(() => readStored(COLOR_KEY, COLORS[0], isColor));
	const [widthIndex, setWidthIndex] = (0, import_react.useState)(2);
	const [arrowStyle, setArrowStyleState] = (0, import_react.useState)(() => readStored(ARROW_KEY, "tapered", isArrowStyle));
	const setArrowStyle = (next) => {
		setArrowStyleState(next);
		writeStored(ARROW_KEY, next);
	};
	const [zoom, setZoom] = (0, import_react.useState)("fit");
	const [menu, setMenu] = (0, import_react.useState)("");
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const holdingRef = (0, import_react.useRef)(false);
	const [textStyle, setTextStyle] = (0, import_react.useState)("plain");
	const [redactMode, setRedactMode] = (0, import_react.useState)("pixelate");
	const [cropRatio, setCropRatio] = (0, import_react.useState)("free");
	const [background, setBackgroundState] = (0, import_react.useState)(() => ({
		...readStored(BACKGROUND_KEY, DEFAULT_BACKGROUND, isBackground),
		enabled: false
	}));
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [sources, setSources] = (0, import_react.useState)(() => /* @__PURE__ */ new Map());
	const blobUrls = (0, import_react.useRef)([]);
	const [importOpen, setImportOpen] = (0, import_react.useState)(false);
	const [importing, setImporting] = (0, import_react.useState)(false);
	const [placement, setPlacementState] = (0, import_react.useState)(() => readStored(PLACEMENT_KEY, "beside", isPlacement));
	const setPlacement = (next) => {
		setPlacementState(next);
		writeStored(PLACEMENT_KEY, next);
	};
	const [dropping, setDropping] = (0, import_react.useState)(false);
	const [typing, setTypingState] = (0, import_react.useState)(null);
	const typingRef = (0, import_react.useRef)(null);
	const setTyping = (0, import_react.useCallback)((next) => {
		typingRef.current = next;
		setTypingState(next);
	}, []);
	const [busy, setBusy] = (0, import_react.useState)("");
	const [dirty, setDirty] = (0, import_react.useState)(false);
	const [confirmDiscard, setConfirmDiscard] = (0, import_react.useState)(false);
	const gestureRef = (0, import_react.useRef)(null);
	const [gesture, setGestureState] = (0, import_react.useState)(null);
	const setGesture = (0, import_react.useCallback)((next) => {
		gestureRef.current = next;
		setGestureState(next);
	}, []);
	const stageRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const [stage, setStage] = (0, import_react.useState)({
		w: 0,
		h: 0
	});
	const measure = (0, import_react.useMemo)(() => {
		let ctx = null;
		try {
			ctx = document.createElement("canvas").getContext("2d");
		} catch {
			ctx = null;
		}
		return canvasMeasure(ctx);
	}, []);
	const setColor = (next) => {
		setColorState(next);
		writeStored(COLOR_KEY, next);
	};
	const setBackground = (0, import_react.useCallback)((patch) => {
		setBackgroundState((current) => ({
			...current,
			...patch
		}));
	}, []);
	(0, import_react.useEffect)(() => writeStored(BACKGROUND_KEY, background), [background]);
	(0, import_react.useEffect)(() => {
		let alive = true;
		const img = new Image();
		img.onload = () => {
			if (!alive) return;
			setImage(img);
			setLoad("ready");
		};
		img.onerror = () => alive && setLoad("failed");
		img.src = latestAppshotImageUrl(appshotId);
		return () => {
			alive = false;
		};
	}, [appshotId]);
	(0, import_react.useLayoutEffect)(() => {
		const el = stageRef.current;
		if (!el) return;
		const measureStage = () => setStage({
			w: el.clientWidth,
			h: el.clientHeight
		});
		measureStage();
		if (typeof ResizeObserver === "undefined") {
			window.addEventListener("resize", measureStage);
			return () => window.removeEventListener("resize", measureStage);
		}
		const observer = new ResizeObserver(measureStage);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	const iw = image?.naturalWidth ?? 0;
	const ih = image?.naturalHeight ?? 0;
	const width = strokeWidths(iw || 1, ih || 1)[widthIndex];
	const view = viewport(ops, iw, ih);
	const area = extent(ops, iw, ih);
	const shown = tool === "crop" ? area : view;
	const framing = tool === "crop" ? {
		...background,
		enabled: false
	} : background;
	const layout = frameLayout(shown.w || 1, shown.h || 1, framing);
	const fitScale = shown.w > 0 && stage.w > 0 ? Math.min((stage.w - 48) / layout.width, (stage.h - 48) / layout.height, 1) : 1;
	const scale = zoom === "fit" ? fitScale : zoom;
	const cw = Math.max(1, Math.round(shown.w * scale));
	const ch = Math.max(1, Math.round(shown.h * scale));
	const ratio = CROP_RATIOS.find((entry) => entry.id === cropRatio)?.ratio ?? null;
	const cropRect = gesture?.kind === "draw" && gesture.shape.kind === "crop" ? gesture.shape.rect : gesture?.kind === "crop-resize" ? resizeCrop(gesture.original, gesture.handle, gesture.at, area, ratio) : gesture?.kind === "crop-move" ? moveCrop(gesture.original, gesture.at.x - gesture.start.x, gesture.at.y - gesture.start.y, area) : view;
	const live = (0, import_react.useCallback)((op) => {
		if (gesture?.kind === "move" && gesture.id === op.id) return translate(op, gesture.dx, gesture.dy);
		if (gesture?.kind === "resize" && gesture.id === op.id) return reshape(gesture.original, gesture.handle, gesture.at, measure);
		return op;
	}, [gesture, measure]);
	const drawn = (0, import_react.useMemo)(() => {
		const shapes = ops.map(live);
		if (gesture?.kind === "draw" && gesture.shape.kind !== "crop") shapes.push(gesture.shape);
		return shapes;
	}, [
		gesture,
		live,
		ops
	]);
	const selected = selectedId === null ? null : ops.find((op) => op.id === selectedId) ?? null;
	const selectedLive = selected ? live(selected) : null;
	const [hoverCursor, setHoverCursor] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas || !image) return;
		const dpr = window.devicePixelRatio || 1;
		canvas.width = Math.round(cw * dpr);
		canvas.height = Math.round(ch * dpr);
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		ctx.setTransform(dpr * scale, 0, 0, dpr * scale, -shown.x * dpr * scale, -shown.y * dpr * scale);
		ctx.clearRect(shown.x, shown.y, shown.w, shown.h);
		paintOps(ctx, buildScene(image, iw, ih, drawn, sources), drawn);
		if (tool === "crop") {
			const crop = cropRect;
			ctx.save();
			ctx.fillStyle = "rgba(0,0,0,0.55)";
			ctx.beginPath();
			ctx.rect(area.x, area.y, area.w, area.h);
			ctx.rect(crop.x, crop.y, crop.w, crop.h);
			ctx.fill("evenodd");
			ctx.strokeStyle = "rgba(255,255,255,0.35)";
			ctx.lineWidth = 1 / scale;
			ctx.beginPath();
			for (const third of [1 / 3, 2 / 3]) {
				ctx.moveTo(crop.x + crop.w * third, crop.y);
				ctx.lineTo(crop.x + crop.w * third, crop.y + crop.h);
				ctx.moveTo(crop.x, crop.y + crop.h * third);
				ctx.lineTo(crop.x + crop.w, crop.y + crop.h * third);
			}
			ctx.stroke();
			ctx.strokeStyle = "#ffffff";
			ctx.lineWidth = 1.5 / scale;
			ctx.strokeRect(crop.x, crop.y, crop.w, crop.h);
			ctx.lineWidth = 4 / scale;
			ctx.lineCap = "round";
			ctx.shadowColor = "rgba(0,0,0,0.5)";
			ctx.shadowBlur = 3 / scale;
			const arm = Math.min(18 / scale, crop.w / 3, crop.h / 3);
			ctx.beginPath();
			for (const grip of cropHandles(crop, ratio)) {
				const { x, y } = grip.at;
				if (grip.id === "n" || grip.id === "s") {
					ctx.moveTo(x - arm / 2, y);
					ctx.lineTo(x + arm / 2, y);
				} else if (grip.id === "e" || grip.id === "w") {
					ctx.moveTo(x, y - arm / 2);
					ctx.lineTo(x, y + arm / 2);
				} else {
					const sx = grip.id === "nw" || grip.id === "sw" ? 1 : -1;
					const sy = grip.id === "nw" || grip.id === "ne" ? 1 : -1;
					ctx.moveTo(x + sx * arm, y);
					ctx.lineTo(x, y);
					ctx.lineTo(x, y + sy * arm);
				}
			}
			ctx.stroke();
			ctx.restore();
		}
		if (selectedLive) {
			ctx.save();
			if (selectedLive.kind !== "arrow" && selectedLive.kind !== "line") {
				const box = bounds(selectedLive, measure);
				const pad = 6 / scale;
				ctx.lineWidth = 1.5 / scale;
				ctx.setLineDash([5 / scale, 4 / scale]);
				ctx.strokeStyle = "rgba(0,0,0,0.6)";
				ctx.strokeRect(box.x - pad, box.y - pad, box.w + pad * 2, box.h + pad * 2);
				ctx.lineDashOffset = 4.5 / scale;
				ctx.strokeStyle = "#ffffff";
				ctx.strokeRect(box.x - pad, box.y - pad, box.w + pad * 2, box.h + pad * 2);
				ctx.setLineDash([]);
			}
			for (const grip of handles(selectedLive, measure)) {
				ctx.beginPath();
				ctx.arc(grip.at.x, grip.at.y, GRIP_RADIUS / scale, 0, Math.PI * 2);
				ctx.fillStyle = "#ffffff";
				ctx.shadowColor = "rgba(0,0,0,0.45)";
				ctx.shadowBlur = 4 / scale;
				ctx.fill();
				ctx.shadowColor = "transparent";
				ctx.lineWidth = 1.5 / scale;
				ctx.strokeStyle = "#0a84ff";
				ctx.stroke();
			}
			ctx.restore();
		}
	}, [
		image,
		drawn,
		tool,
		cw,
		ch,
		scale,
		shown.x,
		shown.y,
		shown.w,
		shown.h,
		iw,
		ih,
		area,
		cropRect,
		ratio,
		sources,
		selectedLive,
		measure
	]);
	const apply = (0, import_react.useCallback)((next) => {
		setHistory((current) => commit(current, next));
		setDirty(true);
	}, []);
	const push = (0, import_react.useCallback)((shape) => {
		const op = withId(shape);
		apply([...history.present, op]);
		return op.id;
	}, [apply, history.present]);
	const undo$1 = (0, import_react.useCallback)(() => {
		setHistory(undo);
		setSelectedId(null);
	}, []);
	const redo$1 = (0, import_react.useCallback)(() => {
		setHistory(redo);
		setSelectedId(null);
	}, []);
	const removeSelected = (0, import_react.useCallback)(() => {
		if (selectedId === null) return;
		apply(ops.filter((op) => op.id !== selectedId));
		setSelectedId(null);
	}, [
		apply,
		ops,
		selectedId
	]);
	const nudgeSelected = (0, import_react.useCallback)((dx, dy) => {
		if (selectedId === null) return;
		apply(ops.map((op) => op.id === selectedId ? translate(op, dx, dy) : op));
	}, [
		apply,
		ops,
		selectedId
	]);
	const chooseTool = (0, import_react.useCallback)((next) => {
		setTool(next);
		if (next !== "move") setSelectedId(null);
		if (next === "background") setBackground({ enabled: true });
	}, [setBackground]);
	const setCrop = (0, import_react.useCallback)((rect) => {
		const next = rect && !coversAll(rect, area) ? rect : null;
		if (!next && !ops.some((op) => op.kind === "crop")) return;
		apply(withCrop(ops, next));
	}, [
		apply,
		area,
		ops
	]);
	const chooseRatio = (id) => {
		setCropRatio(id);
		const next = CROP_RATIOS.find((entry) => entry.id === id)?.ratio ?? null;
		if (next !== null) setCrop(fitRatio(view, next));
	};
	const opsRef = (0, import_react.useRef)(ops);
	opsRef.current = ops;
	(0, import_react.useEffect)(() => {
		const urls = blobUrls.current;
		return () => urls.forEach((url) => URL.revokeObjectURL(url));
	}, []);
	const addPicture = (0, import_react.useCallback)(async (src) => {
		if (!image) return;
		setImporting(true);
		try {
			const picture = await loadPicture(src);
			setSources((current) => new Map(current).set(src, picture));
			const added = addImage(opsRef.current, iw, ih, {
				src,
				width: picture.naturalWidth,
				height: picture.naturalHeight
			}, placement);
			apply(added.ops);
			setImportOpen(false);
			setTool("move");
			setSelectedId(added.id);
		} catch {
			pushToast("error", t("appshot_editor.import_failed"));
		} finally {
			setImporting(false);
		}
	}, [
		apply,
		ih,
		image,
		iw,
		placement,
		pushToast,
		t
	]);
	const addFile = (0, import_react.useCallback)((file) => {
		const url = URL.createObjectURL(file);
		blobUrls.current.push(url);
		addPicture(url);
	}, [addPicture]);
	const toImage = (event) => {
		const rect = canvasRef.current.getBoundingClientRect();
		return {
			x: shown.x + (event.clientX - rect.left) / scale,
			y: shown.y + (event.clientY - rect.top) / scale
		};
	};
	const commitText = (0, import_react.useCallback)(() => {
		const current = typingRef.current;
		setTyping(null);
		if (!current) return;
		const text = current.text.replace(/\s+$/, "");
		if (current.replaceId !== null) {
			const id = current.replaceId;
			apply(text ? ops.map((op) => op.id === id && op.kind === "text" ? {
				...op,
				text
			} : op) : ops.filter((op) => op.id !== id));
		} else if (text.trim()) setSelectedId(push({
			kind: "text",
			at: current.at,
			text,
			color,
			size: textSize(width),
			style: textStyle
		}));
	}, [
		apply,
		color,
		ops,
		push,
		setTyping,
		textStyle,
		width
	]);
	const editTextAt = (p) => {
		const hit = hitTest(ops, p, 6 / scale, measure);
		if (!hit || hit.kind !== "text") return false;
		setTyping({
			at: hit.at,
			text: hit.text,
			replaceId: hit.id
		});
		return true;
	};
	const grabbable = (p) => {
		const scope = grabScope(tool);
		if (scope === "none" || scope === "grips") return null;
		const hit = hitTest(ops, p, 6 / scale, measure, { areas: scope === "any" });
		if (!hit || tool === "text" && hit.kind === "text") return null;
		return hit;
	};
	const onPointerDown = (event) => {
		if (!image || event.button !== 0) return;
		const p = toImage(event);
		if (tool === "background") return;
		if (tool === "crop") {
			event.preventDefault();
			event.currentTarget.setPointerCapture?.(event.pointerId);
			const grip = cropHandleAt(view, p, (GRIP_RADIUS + 6) / scale, ratio);
			if (grip) setGesture({
				kind: "crop-resize",
				handle: grip,
				original: view,
				at: p
			});
			else if (!coversAll(view, area) && insideRect(p, view)) setGesture({
				kind: "crop-move",
				original: view,
				start: p,
				at: p
			});
			else setGesture({
				kind: "draw",
				shape: {
					kind: "crop",
					rect: {
						x: p.x,
						y: p.y,
						w: 0,
						h: 0
					}
				},
				start: p
			});
			return;
		}
		if (grabScope(tool) !== "none" && selected && selectedLive) {
			const grip = handleAt(selectedLive, p, (GRIP_RADIUS + 4) / scale, measure);
			if (grip) {
				event.preventDefault();
				event.currentTarget.setPointerCapture?.(event.pointerId);
				setGesture({
					kind: "resize",
					id: selected.id,
					handle: grip,
					original: selected,
					at: p
				});
				return;
			}
		}
		const hit = grabbable(p);
		if (hit) {
			event.preventDefault();
			if (typing) commitText();
			event.currentTarget.setPointerCapture?.(event.pointerId);
			setSelectedId(hit.id);
			setGesture({
				kind: "move",
				id: hit.id,
				start: p,
				dx: 0,
				dy: 0
			});
			return;
		}
		setSelectedId(null);
		if (tool === "text") {
			event.preventDefault();
			if (typing) commitText();
			if (!editTextAt(p)) setTyping({
				at: p,
				text: "",
				replaceId: null
			});
			return;
		}
		if (tool === "counter") {
			setSelectedId(push({
				kind: "counter",
				at: p,
				n: nextCounter(ops),
				color,
				size: counterSize(width)
			}));
			return;
		}
		event.currentTarget.setPointerCapture?.(event.pointerId);
		if (tool === "move") return;
		const zero = {
			x: p.x,
			y: p.y,
			w: 0,
			h: 0
		};
		let shape;
		switch (tool) {
			case "arrow":
				shape = {
					kind: "arrow",
					from: p,
					to: p,
					color,
					width,
					style: arrowStyle
				};
				break;
			case "line":
				shape = {
					kind: "line",
					from: p,
					to: p,
					color,
					width
				};
				break;
			case "rect":
			case "filled":
			case "ellipse":
				shape = {
					kind: tool,
					rect: zero,
					color,
					width
				};
				break;
			case "pen":
			case "highlight":
				shape = {
					kind: tool,
					points: [p],
					color,
					width
				};
				break;
			case "spotlight":
				shape = {
					kind: "spotlight",
					rect: zero
				};
				break;
			default: shape = {
				kind: "redact",
				rect: zero,
				mode: redactMode,
				block: Math.max(8, width * 3)
			};
		}
		setGesture({
			kind: "draw",
			shape,
			start: p
		});
	};
	const onPointerMove = (event) => {
		const current = gestureRef.current;
		const p = toImage(event);
		if (!current) {
			if (!image || tool === "background") return setHoverCursor(null);
			if (tool === "crop") {
				const cropGrip = cropHandleAt(view, p, (GRIP_RADIUS + 6) / scale, ratio);
				if (cropGrip) return setHoverCursor(handleCursor(cropGrip));
				return setHoverCursor(!coversAll(view, area) && insideRect(p, view) ? "move" : null);
			}
			const grip = selectedLive && grabScope(tool) !== "none" ? handleAt(selectedLive, p, (GRIP_RADIUS + 4) / scale, measure) : null;
			if (grip) return setHoverCursor(handleCursor(grip));
			setHoverCursor(grabbable(p) ? "move" : null);
			return;
		}
		if (current.kind === "resize" || current.kind === "crop-resize" || current.kind === "crop-move") {
			setGesture({
				...current,
				at: p
			});
			return;
		}
		if (current.kind === "move") {
			setGesture({
				...current,
				dx: p.x - current.start.x,
				dy: p.y - current.start.y
			});
			return;
		}
		const shape = current.shape;
		const end = constrainEnd(tool, current.start, p, event.shiftKey, ratio);
		let next = shape;
		if (shape.kind === "arrow" || shape.kind === "line") next = {
			...shape,
			to: end
		};
		else if (shape.kind === "pen" || shape.kind === "highlight") next = {
			...shape,
			points: [...shape.points, p]
		};
		else if ("rect" in shape) next = {
			...shape,
			rect: rectFrom(current.start, end)
		};
		setGesture({
			...current,
			shape: next
		});
	};
	const onPointerUp = () => {
		const current = gestureRef.current;
		if (!current) return;
		setGesture(null);
		if (current.kind === "resize") {
			const reshaped = reshape(current.original, current.handle, current.at, measure);
			if ("rect" in reshaped && (reshaped.rect.w < 2 || reshaped.rect.h < 2)) return;
			apply(ops.map((op) => op.id === current.id ? reshaped : op));
			return;
		}
		if (current.kind === "move") {
			if (current.dx !== 0 || current.dy !== 0) apply(ops.map((op) => op.id === current.id ? translate(op, current.dx, current.dy) : op));
			return;
		}
		if (current.kind === "crop-resize") {
			setCrop(resizeCrop(current.original, current.handle, current.at, area, ratio));
			return;
		}
		if (current.kind === "crop-move") {
			const dx = current.at.x - current.start.x;
			const dy = current.at.y - current.start.y;
			if (dx !== 0 || dy !== 0) setCrop(moveCrop(current.original, dx, dy, area));
			return;
		}
		let shape = current.shape;
		if (shape.kind === "crop" || shape.kind === "redact" || shape.kind === "spotlight") {
			const rect = clampInto(shape.rect, area);
			if (!rect) return;
			shape = {
				...shape,
				rect
			};
		}
		if (!isMeaningful(shape)) return;
		if (shape.kind === "crop") return setCrop(shape.rect);
		setSelectedId(push(shape));
	};
	const onDoubleClick = (event) => {
		if (!image || typing || tool !== "move" && tool !== "text") return;
		editTextAt(toImage(event));
	};
	const render = (0, import_react.useCallback)(async () => {
		if (!image) throw new Error(t("appshot_editor.gone"));
		return await exportPng(image, ops, background, sources);
	}, [
		background,
		image,
		ops,
		sources,
		t
	]);
	const copy = (0, import_react.useCallback)(async () => {
		setBusy("copy");
		try {
			await copyAppshotPng(await render(), {
				native,
				timeoutMessage: t("appshot_editor.copy_timeout")
			});
			setDirty(false);
			pushToast("success", t("appshot_editor.copied"));
		} catch (error) {
			pushToast("error", fill(t("appshot_editor.copy_failed"), { 0: error.message }));
		} finally {
			setBusy("");
		}
	}, [
		native,
		pushToast,
		render,
		t
	]);
	const flyFrom = (0, import_react.useCallback)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return void 0;
		const r = canvas.getBoundingClientRect();
		const chromeX = Math.max(0, (window.outerWidth - window.innerWidth) / 2);
		const chromeY = Math.max(0, window.outerHeight - window.innerHeight - chromeX);
		return [
			window.screenX + chromeX + r.left,
			window.screenY + chromeY + r.top,
			r.width,
			r.height
		];
	}, []);
	const save = (0, import_react.useCallback)(async () => {
		setBusy("save");
		let saved = false;
		try {
			const blob = await render();
			const filename = `appshot-${stamp()}.png`;
			const path = await saveOrDownload({
				filename,
				blob,
				native
			});
			setDirty(false);
			saved = true;
			if (path) pushToast("success", fill(t("appshot_editor.saved_to"), { 0: path }), {
				filePath: path,
				filename
			});
			await fetch(`/api/appshot/latest/image?id=${encodeURIComponent(appshotId)}`, {
				method: "PUT",
				headers: { "content-type": "image/png" },
				body: blob
			}).catch(() => void 0);
		} catch (error) {
			pushToast("error", fill(t("appshot_editor.save_failed"), { 0: error.message }));
		} finally {
			setBusy("");
		}
		if (saved) onClose({ flyFrom: flyFrom() });
	}, [
		appshotId,
		flyFrom,
		native,
		onClose,
		pushToast,
		render,
		t
	]);
	const use = (0, import_react.useCallback)(async () => {
		setBusy("apply");
		try {
			const blob = await render();
			const response = await fetch(`/api/appshot/latest/image?id=${encodeURIComponent(appshotId)}`, {
				method: "PUT",
				headers: { "content-type": "image/png" },
				body: blob
			});
			if (!response.ok) {
				const body = await response.json().catch(() => null);
				throw new Error(body?.detail || `HTTP ${response.status}`);
			}
			const where = (await response.json().catch(() => null))?.appshot?.delivered_to;
			pushToast("success", fill(t(where === "voice" ? "appshot_editor.applied_voice" : where === "none" ? "appshot_editor.applied_none" : "appshot_editor.applied_message"), { name: assistantName }));
			setDirty(false);
			onApplied?.();
			onClose({ flyFrom: flyFrom() });
		} catch (error) {
			pushToast("error", fill(t("appshot_editor.apply_failed"), { 0: error.message }));
		} finally {
			setBusy("");
		}
	}, [
		appshotId,
		assistantName,
		flyFrom,
		onApplied,
		onClose,
		pushToast,
		render,
		t
	]);
	const requestClose = (0, import_react.useCallback)(() => {
		if (dirty && ops.length > 0) setConfirmDiscard(true);
		else onClose();
	}, [
		dirty,
		onClose,
		ops.length
	]);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (typing) return;
			const target = event.target;
			if (target && (target.tagName === "INPUT" || target.tagName === "SELECT" || target.isContentEditable)) return;
			const mod = event.ctrlKey || event.metaKey;
			const key = event.key.toLowerCase();
			if (event.key === "Escape") {
				event.preventDefault();
				if (menu) setMenu("");
				else if (confirmDiscard) setConfirmDiscard(false);
				else if (importOpen) setImportOpen(false);
				else if (gestureRef.current) setGesture(null);
				else if (selectedId !== null) setSelectedId(null);
				else if (tool === "crop") chooseTool("move");
				else requestClose();
				return;
			}
			if (confirmDiscard) return;
			if (event.key === "Enter" && !event.shiftKey && !mod && tool === "crop") {
				event.preventDefault();
				chooseTool("move");
				return;
			}
			if (!mod && !event.altKey && key === "i") {
				event.preventDefault();
				setImportOpen((open) => !open);
				return;
			}
			if (mod && key === "z" && !event.shiftKey) {
				event.preventDefault();
				undo$1();
			} else if (mod && (key === "y" || key === "z" && event.shiftKey)) {
				event.preventDefault();
				redo$1();
			} else if (mod && key === "c") {
				event.preventDefault();
				copy();
			} else if (mod && key === "s") {
				event.preventDefault();
				save();
			} else if (event.key === "Enter" && !event.shiftKey) {
				event.preventDefault();
				use();
			} else if ((event.key === "Delete" || event.key === "Backspace") && selectedId !== null) {
				event.preventDefault();
				removeSelected();
			} else if (event.key.startsWith("Arrow") && selectedId !== null) {
				event.preventDefault();
				const step = (event.shiftKey ? 10 : 1) / Math.max(scale, .01);
				nudgeSelected(event.key === "ArrowLeft" ? -step : event.key === "ArrowRight" ? step : 0, event.key === "ArrowUp" ? -step : event.key === "ArrowDown" ? step : 0);
			} else if (!mod && !event.altKey && /^[1-5]$/.test(event.key)) setWidthIndex(Number(event.key) - 1);
			else if (!mod && !event.altKey) {
				const next = toolForKey(event.key);
				if (next) chooseTool(next);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		chooseTool,
		confirmDiscard,
		copy,
		importOpen,
		menu,
		nudgeSelected,
		redo$1,
		removeSelected,
		requestClose,
		save,
		scale,
		selectedId,
		setGesture,
		tool,
		typing,
		undo$1,
		use
	]);
	(0, import_react.useEffect)(() => {
		const onPaste = (event) => {
			if (typingRef.current || !image) return;
			const file = imageFile(event.clipboardData?.items);
			if (!file) return;
			event.preventDefault();
			addFile(file);
		};
		window.addEventListener("paste", onPaste);
		return () => window.removeEventListener("paste", onPaste);
	}, [addFile, image]);
	const canDragOut = native && canNativeDrag();
	(0, import_react.useEffect)(() => {
		const release = () => {
			holdingRef.current = false;
		};
		window.addEventListener("pointerup", release);
		window.addEventListener("blur", release);
		return () => {
			window.removeEventListener("pointerup", release);
			window.removeEventListener("blur", release);
		};
	}, []);
	const dragOut = async (event) => {
		if (event.button !== 0 || !image || dragging) return;
		event.preventDefault();
		holdingRef.current = true;
		setDragging(true);
		try {
			const blob = await render();
			const response = await fetch("/api/appshot/drag-file", {
				method: "POST",
				headers: { "content-type": "image/png" },
				body: blob
			});
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			const { path } = await response.json();
			if (holdingRef.current) startNativeFileDrag(path);
			else pushToast("info", t("appshot_editor.drag_release"));
		} catch (error) {
			pushToast("error", fill(t("appshot_editor.drag_failed"), { 0: error.message }));
		} finally {
			setDragging(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (!menu) return;
		const close = (event) => {
			if (!event.target?.closest?.("[data-editor-menu]")) setMenu("");
		};
		window.addEventListener("pointerdown", close, true);
		return () => window.removeEventListener("pointerdown", close, true);
	}, [menu]);
	const label = (key) => ready ? t(`appshot_editor.${key}`) : "";
	const toolLabel = (name) => label(`tool_${name}`);
	const textScreen = typing ? {
		left: (typing.at.x - shown.x) * scale,
		top: (typing.at.y - shown.y) * scale
	} : null;
	const toolCursor = tool === "text" ? "text" : tool === "move" || tool === "background" ? "default" : "crosshair";
	const cursor = gesture?.kind === "move" ? "grabbing" : gesture?.kind === "resize" ? handleCursor(gesture.handle) : hoverCursor ?? toolCursor;
	const frameOn = framing.enabled;
	const preset = presetById(background.preset);
	const zoomLabel = zoom === "fit" ? label("zoom_fit") : `${Math.round(zoom * 100)}%`;
	const hint = tool === "move" ? label("hint_move") : tool === "counter" ? label("hint_counter") : tool === "spotlight" ? label("hint_spotlight") : tool === "crop" ? label("hint_crop") : "";
	const showCapsule = tool === "text" || tool === "redact" || tool === "crop" || tool === "background" || hint !== "";
	const toolButton = (name) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
			content: `${toolLabel(name)} (${KEY_OF[name].toUpperCase()})`,
			side: "bottom",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": toolLabel(name),
				"aria-pressed": tool === name,
				onClick: () => chooseTool(name),
				"data-testid": `appshot-editor-tool-${name}`,
				className: cn("flex h-7 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors", "hover:bg-foreground/10 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-border-strong", tool === name && "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolGlyph, { name })
			})
		}, name);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex h-full w-full items-center justify-center", variant === "overlay" && "bg-black/45 p-2 backdrop-blur-[2px] sm:p-5"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("relative flex h-full w-full flex-col overflow-hidden bg-popover text-popover-foreground", variant === "overlay" && "max-w-[1800px] rounded-2xl border border-border shadow-2xl"),
			"data-testid": "appshot-editor",
			"data-variant": variant,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-12 shrink-0 items-center gap-2 border-b border-border px-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-center gap-0.5 overflow-x-auto rounded-xl border border-border bg-foreground/[0.04] p-0.5",
							role: "toolbar",
							"aria-label": label("tools"),
							children: [
								TOOL_ORDER.map(toolButton),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mx-0.5 h-5 w-px shrink-0 bg-border",
									"aria-hidden": true
								}),
								toolButton("crop"),
								toolButton("background"),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mx-0.5 h-5 w-px shrink-0 bg-border",
									"aria-hidden": true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
									content: `${label("import")} (I)`,
									side: "bottom",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": label("import"),
										"aria-pressed": importOpen,
										onClick: () => setImportOpen((open) => !open),
										disabled: !image,
										"data-testid": "appshot-editor-import",
										className: cn("flex h-7 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors", "hover:bg-foreground/10 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-border-strong disabled:opacity-40", importOpen && "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground"),
										children: importing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											className: "h-[17px] w-[17px] animate-spin",
											"aria-hidden": true
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, {
											className: "h-[17px] w-[17px]",
											"aria-hidden": true
										})
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative shrink-0",
							"data-editor-menu": true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
								content: label("color"),
								side: "bottom",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									"aria-label": label("color"),
									"aria-expanded": menu === "style",
									onClick: () => setMenu(menu === "style" ? "" : "style"),
									"data-testid": "appshot-editor-style",
									className: "flex h-7 items-center gap-1 rounded-lg border border-border bg-foreground/[0.04] pl-1.5 pr-1 transition-colors hover:bg-foreground/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-4 w-4 rounded-md border border-border-strong",
										style: { backgroundColor: color }
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
										className: "h-3.5 w-3.5 text-muted-foreground",
										"aria-hidden": true
									})]
								})
							}), menu === "style" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute left-0 top-full z-10 mt-2 w-[208px] rounded-xl border border-border bg-popover p-2.5 shadow-2xl",
								role: "group",
								"aria-label": label("color"),
								"data-testid": "appshot-editor-style-menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-5 gap-2",
									children: [COLORS.map((swatch) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": swatch,
										"aria-pressed": color === swatch,
										onClick: () => {
											setColor(swatch);
											setMenu("");
										},
										className: cn("h-7 w-7 rounded-full border border-border-strong transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-strong", color === swatch && "ring-2 ring-foreground/70 ring-offset-2 ring-offset-popover"),
										style: { backgroundColor: swatch }
									}, swatch)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: cn("relative h-7 w-7 cursor-pointer overflow-hidden rounded-full border border-border-strong", !COLORS.includes(color) && "ring-2 ring-foreground/70 ring-offset-2 ring-offset-popover"),
										style: { background: "conic-gradient(#ff3b30, #ffcc00, #34c759, #0a84ff, #af52de, #ff3b30)" },
										title: label("custom_color"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "color",
											value: color,
											onChange: (event) => setColor(event.target.value),
											"aria-label": label("custom_color"),
											className: "absolute inset-0 cursor-pointer opacity-0",
											"data-testid": "appshot-editor-custom-color"
										})
									})]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
							content: `${label("size")} (1–5)`,
							side: "bottom",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex shrink-0 items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: label("size")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: 0,
									max: STROKE_LEVELS.length - 1,
									step: 1,
									value: widthIndex,
									onChange: (event) => setWidthIndex(Number(event.currentTarget.value)),
									"aria-label": label("size"),
									"data-testid": "appshot-editor-size",
									className: "h-1 w-24 cursor-pointer accent-primary"
								})]
							})
						}),
						tool === "arrow" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex shrink-0 items-center gap-0.5",
							role: "group",
							"aria-label": label("arrow_style"),
							"data-testid": "appshot-editor-arrow-style",
							children: ARROW_STYLES.map((style) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
								content: label(`arrow_${style}`),
								side: "bottom",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": label(`arrow_${style}`),
									"aria-pressed": arrowStyle === style,
									onClick: () => setArrowStyle(style),
									className: cn("flex h-7 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground", arrowStyle === style && "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowStyleIcon, { style })
								})
							}, style))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("h-full min-w-4 flex-1", variant === "window" && "pywebview-drag-region"),
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
									content: `${label("save_hint")} (Ctrl+S)`,
									side: "bottom",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => void save(),
										disabled: !image || busy !== "",
										"data-testid": "appshot-editor-save",
										className: "flex h-7 items-center gap-1.5 rounded-lg border border-border px-3 text-[13px] font-medium text-foreground transition-colors hover:bg-foreground/10 disabled:opacity-50",
										children: [busy === "save" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											className: "h-3.5 w-3.5 animate-spin",
											"aria-hidden": true
										}), label("save")]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
									content: `${fill(label("done_hint"), { name: assistantName })} (Ctrl+Enter)`,
									side: "bottom",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => void use(),
										disabled: !image || busy !== "",
										"data-testid": "appshot-editor-apply",
										className: "flex h-7 items-center gap-1.5 rounded-lg bg-accent px-3.5 text-[13px] font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-50",
										children: [busy === "apply" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											className: "h-3.5 w-3.5 animate-spin",
											"aria-hidden": true
										}), label("done")]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mx-0.5 h-5 w-px shrink-0 bg-border",
									"aria-hidden": true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
									content: `${label("close")} (Esc)`,
									side: "bottom",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: requestClose,
										"aria-label": label("close"),
										"data-testid": "appshot-editor-close",
										className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
											className: "h-4 w-4",
											"aria-hidden": true
										})
									})
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-h-0 flex-1 bg-background/70",
					onDragOver: (event) => {
						if (!image || !Array.from(event.dataTransfer.types).includes("Files")) return;
						event.preventDefault();
						event.dataTransfer.dropEffect = "copy";
						setDropping(true);
					},
					onDragLeave: (event) => {
						if (!event.currentTarget.contains(event.relatedTarget)) setDropping(false);
					},
					onDrop: (event) => {
						setDropping(false);
						const file = imageFile(event.dataTransfer.files);
						if (!file || !image) return;
						event.preventDefault();
						addFile(file);
					},
					children: [
						dropping && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none absolute inset-3 z-30 flex items-center justify-center rounded-2xl border-2 border-dashed border-accent bg-accent/10 text-sm font-medium text-foreground",
							"data-testid": "appshot-editor-drop",
							children: fill(label("import_drop"), { 0: label(`place_${placement}`) })
						}),
						importOpen && image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportPanel, {
							label,
							placement,
							onPlacement: setPlacement,
							busy: importing,
							onPick: (item) => void addPicture(appshotLibraryImageUrl(item)),
							onFile: addFile,
							onClose: () => setImportOpen(false)
						}),
						showCapsule && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center px-3 pt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pointer-events-auto flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-1.5 rounded-2xl border border-border bg-popover/95 px-3 py-1.5 text-[13px] shadow-lg backdrop-blur",
								"data-testid": "appshot-editor-options",
								children: [
									tool === "text" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
										label: label("text_style"),
										value: textStyle,
										onChange: (value) => setTextStyle(value),
										options: [
											{
												value: "plain",
												label: label("text_plain")
											},
											{
												value: "label",
												label: label("text_label")
											},
											{
												value: "outline",
												label: label("text_outline")
											}
										],
										testId: "appshot-editor-text-style"
									}),
									tool === "redact" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
										label: label("redact_mode"),
										value: redactMode,
										onChange: (value) => setRedactMode(value),
										options: [{
											value: "pixelate",
											label: label("redact_pixelate")
										}, {
											value: "blur",
											label: label("redact_blur")
										}],
										testId: "appshot-editor-redact-mode"
									}),
									tool === "crop" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
											label: label("crop_ratio"),
											value: cropRatio,
											onChange: chooseRatio,
											options: CROP_RATIOS.map((entry) => ({
												value: entry.id,
												label: entry.id === "free" ? label("crop_free") : entry.id
											})),
											testId: "appshot-editor-crop-ratio"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "tabular-nums text-muted-foreground",
											"data-testid": "appshot-editor-crop-size",
											children: [
												Math.round(cropRect.w),
												" × ",
												Math.round(cropRect.h)
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setCrop(null),
											disabled: coversAll(view, area),
											"data-testid": "appshot-editor-crop-reset",
											className: "flex h-7 items-center gap-1.5 rounded-lg px-2 text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground disabled:pointer-events-none disabled:opacity-40",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
												className: "h-3.5 w-3.5",
												"aria-hidden": true
											}), label("crop_reset")]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
											content: `${label("crop_apply")} (Enter)`,
											side: "bottom",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => chooseTool("move"),
												"data-testid": "appshot-editor-crop-apply",
												className: "flex h-7 items-center gap-1.5 rounded-lg bg-accent px-2.5 font-medium text-accent-foreground transition-colors hover:bg-accent/90",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
													className: "h-3.5 w-3.5",
													"aria-hidden": true
												}), label("crop_apply")]
											})
										})
									] }),
									tool === "background" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2 text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
												checked: background.enabled,
												onCheckedChange: (enabled) => setBackground({ enabled }),
												"aria-label": label("background_enabled"),
												"data-testid": "appshot-editor-background-enabled"
											}), label("background_enabled")]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-1.5",
											role: "group",
											"aria-label": label("background_preset"),
											children: BACKGROUND_PRESETS.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												"aria-label": entry.id,
												"aria-pressed": background.preset === entry.id,
												onClick: () => setBackground({
													preset: entry.id,
													enabled: true
												}),
												className: cn("h-6 w-6 rounded-md border border-border-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-border-strong", background.preset === entry.id && background.enabled && "ring-2 ring-foreground/70 ring-offset-2 ring-offset-popover"),
												style: { background: presetCss(entry) }
											}, entry.id))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
											label: label("background_padding"),
											min: 0,
											max: .2,
											step: .01,
											value: background.padding,
											onChange: (padding) => setBackground({
												padding,
												enabled: true
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
											label: label("background_radius"),
											min: 0,
											max: 40,
											step: 1,
											value: background.radius,
											onChange: (radius) => setBackground({
												radius,
												enabled: true
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2 text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
												checked: background.shadow,
												onCheckedChange: (shadow) => setBackground({ shadow }),
												"aria-label": label("background_shadow")
											}), label("background_shadow")]
										})
									] }),
									hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground",
										children: hint
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							ref: stageRef,
							className: "h-full w-full overflow-auto",
							"data-testid": "appshot-editor-stage",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex min-h-full min-w-full items-center justify-center p-6",
								style: { width: "max-content" },
								children: load === "failed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex max-w-sm flex-col items-center gap-3 text-center",
									"data-testid": "appshot-editor-failed",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-base text-muted-foreground",
										children: label("gone")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "secondary",
										size: "sm",
										onClick: () => onClose(),
										children: label("close")
									})]
								}) : !image ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
										className: "h-4 w-4 animate-spin",
										"aria-hidden": true
									}), label("loading")]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn(frameOn ? "" : "shadow-2xl ring-1 ring-border"),
									style: frameOn ? {
										padding: layout.image.x * scale,
										background: presetCss(preset),
										borderRadius: 6
									} : void 0,
									"data-testid": "appshot-editor-frame",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative overflow-hidden",
										style: {
											width: cw,
											height: ch,
											borderRadius: frameOn ? layout.radius * scale : 0,
											boxShadow: frameOn && background.shadow ? "0 12px 40px rgba(0,0,0,0.35)" : void 0
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
											ref: canvasRef,
											style: {
												width: cw,
												height: ch,
												cursor,
												touchAction: "none",
												display: "block"
											},
											onPointerDown,
											onPointerMove,
											onPointerUp,
											onPointerCancel: () => setGesture(null),
											onPointerLeave: () => setHoverCursor(null),
											onDoubleClick,
											onWheel: (event) => {
												if (zoom !== "fit" || event.ctrlKey || event.deltaY === 0) return;
												setWidthIndex((index) => Math.max(0, Math.min(STROKE_LEVELS.length - 1, index + (event.deltaY < 0 ? 1 : -1))));
											},
											"data-testid": "appshot-editor-canvas"
										}), typing && textScreen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											autoFocus: true,
											value: typing.text,
											placeholder: label("text_placeholder"),
											onChange: (event) => setTyping({
												...typing,
												text: event.target.value
											}),
											onBlur: commitText,
											onKeyDown: (event) => {
												if (event.key === "Enter" && !event.shiftKey) {
													event.preventDefault();
													commitText();
												} else if (event.key === "Escape") {
													event.preventDefault();
													event.stopPropagation();
													setTyping(null);
												}
											},
											rows: Math.max(1, typing.text.split("\n").length),
											"data-testid": "appshot-editor-text-input",
											className: "absolute resize-none border border-dashed border-white/70 bg-black/25 p-0 font-semibold leading-tight outline-none placeholder:text-white/60",
											style: {
												left: textScreen.left,
												top: textScreen.top,
												color,
												fontSize: textSize(width) * scale,
												minWidth: 140
											}
										})]
									})
								})
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid h-12 shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-2 border-t border-border px-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									"data-editor-menu": true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										"aria-label": label("zoom"),
										"aria-expanded": menu === "zoom",
										onClick: () => setMenu(menu === "zoom" ? "" : "zoom"),
										"data-testid": "appshot-editor-zoom",
										className: "flex h-7 items-center gap-1 rounded-lg border border-border px-2.5 text-[13px] font-medium tabular-nums transition-colors hover:bg-foreground/10",
										children: [zoomLabel, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
											className: "h-3.5 w-3.5 text-muted-foreground",
											"aria-hidden": true
										})]
									}), menu === "zoom" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute bottom-full left-0 z-10 mb-2 min-w-[96px] rounded-xl border border-border bg-popover p-1 shadow-2xl",
										role: "menu",
										children: ["fit", ...ZOOMS].map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											role: "menuitemradio",
											"aria-checked": zoom === entry,
											onClick: () => {
												setZoom(entry);
												setMenu("");
											},
											className: cn("flex w-full rounded-lg px-2.5 py-1.5 text-left text-[13px] tabular-nums hover:bg-foreground/10", zoom === entry && "bg-foreground/10 font-medium"),
											children: entry === "fit" ? label("zoom_fit") : `${Math.round(entry * 100)}%`
										}, String(entry)))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
									content: `${label("undo")} (Ctrl+Z)`,
									side: "top",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: undo$1,
										disabled: history.past.length === 0,
										"aria-label": label("undo"),
										"data-testid": "appshot-editor-undo",
										className: ROUND_ICON,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, {
											className: "h-[15px] w-[15px]",
											"aria-hidden": true
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
									content: `${label("redo")} (Ctrl+Shift+Z)`,
									side: "top",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: redo$1,
										disabled: history.future.length === 0,
										"aria-label": label("redo"),
										"data-testid": "appshot-editor-redo",
										className: ROUND_ICON,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Redo2, {
											className: "h-[15px] w-[15px]",
											"aria-hidden": true
										})
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-center",
							children: canDragOut && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
								content: label("drag_hint"),
								side: "top",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onPointerDown: (event) => void dragOut(event),
									onDragStart: (event) => event.preventDefault(),
									disabled: !image,
									"data-testid": "appshot-editor-drag",
									className: "flex h-7 cursor-grab select-none items-center gap-1.5 rounded-lg border border-border px-3 text-[13px] font-medium text-foreground transition-colors hover:bg-foreground/10 active:cursor-grabbing disabled:opacity-50",
									children: [
										dragging ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											className: "h-3.5 w-3.5 animate-spin",
											"aria-hidden": true
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, {
											className: "h-3.5 w-3.5 text-muted-foreground",
											"aria-hidden": true
										}),
										label("drag_me"),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, {
											className: "h-3.5 w-3.5 text-muted-foreground",
											"aria-hidden": true
										})
									]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end gap-1",
							children: [
								selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
									content: `${label("delete")} (Del)`,
									side: "top",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: removeSelected,
										"aria-label": label("delete"),
										"data-testid": "appshot-editor-delete",
										className: ROUND_ICON,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
											className: "h-[15px] w-[15px]",
											"aria-hidden": true
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
									content: `${label("save_hint")} (Ctrl+S)`,
									side: "top",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => void save(),
										disabled: !image || busy !== "",
										"aria-label": label("save"),
										className: ROUND_ICON,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
											className: "h-[15px] w-[15px]",
											"aria-hidden": true
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
									content: `${label("copy")} (Ctrl+C)`,
									side: "top",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => void copy(),
										disabled: !image || busy !== "",
										"aria-label": label("copy"),
										"data-testid": "appshot-editor-copy",
										className: ROUND_ICON,
										children: busy === "copy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											className: "h-[15px] w-[15px] animate-spin",
											"aria-hidden": true
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
											className: "h-[15px] w-[15px]",
											"aria-hidden": true
										})
									})
								})
							]
						})
					]
				}),
				confirmDiscard && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 z-20 flex items-center justify-center bg-background/60 backdrop-blur-[2px]",
					"data-testid": "appshot-editor-discard",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-[min(360px,calc(100%-2rem))] rounded-2xl border border-border bg-popover p-5 text-popover-foreground shadow-2xl",
						role: "alertdialog",
						"aria-label": label("discard_title"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-base font-semibold",
								children: label("discard_title")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm text-muted-foreground",
								children: label("discard_body")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex justify-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "secondary",
									size: "sm",
									autoFocus: true,
									onClick: () => setConfirmDiscard(false),
									children: label("discard_keep")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "destructive",
									size: "sm",
									onClick: () => onClose(),
									"data-testid": "appshot-editor-discard-confirm",
									children: label("discard_confirm")
								})]
							})
						]
					})
				})
			]
		})
	});
}
var ARROW_GLYPH = taperedArrowOutline({
	x: 3.5,
	y: 14.5
}, {
	x: 15,
	y: 3
}, 2.2).map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
function ToolGlyph({ name }) {
	const line = {
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.6,
		strokeLinecap: "round",
		strokeLinejoin: "round"
	};
	let body;
	switch (name) {
		case "move":
			body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M4 3 L4 15 L7.5 11.5 L10 16.5 L12 15.5 L9.6 10.6 L14.5 10.6 Z",
				...line
			});
			break;
		case "rect":
			body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: 3,
				y: 4.5,
				width: 12,
				height: 9,
				rx: 2,
				...line
			});
			break;
		case "filled":
			body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: 3,
				y: 4.5,
				width: 12,
				height: 9,
				rx: 2,
				...line,
				fill: "currentColor"
			});
			break;
		case "ellipse":
			body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: 9,
				cy: 9,
				rx: 6.5,
				ry: 5,
				...line
			});
			break;
		case "line":
			body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M4 14 L14 4",
				...line
			});
			break;
		case "arrow":
			body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: ARROW_GLYPH,
				fill: "currentColor"
			});
			break;
		case "text":
			body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: 1.5,
				y: 1.5,
				width: 15,
				height: 15,
				rx: 3,
				...line,
				strokeWidth: 1.1,
				strokeDasharray: "2.2 1.8",
				opacity: .6
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M5.5 5.5 L12.5 5.5 M9 5.5 L9 13",
				...line,
				strokeWidth: 2.3
			})] });
			break;
		case "redact":
			body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: [
				0,
				1,
				2
			].flatMap((i) => [
				0,
				1,
				2
			].map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: 3 + i * 4.2,
				y: 3 + j * 4.2,
				width: 3.6,
				height: 3.6,
				fill: "currentColor",
				opacity: (i + j) % 2 === 0 ? 1 : .43
			}, `${i}${j}`))) });
			break;
		case "spotlight":
			body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: 9,
				cy: 9,
				r: 4.5,
				...line
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M9 1.5 L9 3 M9 15 L9 16.5 M1.5 9 L3 9 M15 9 L16.5 9",
				...line
			})] });
			break;
		case "counter":
			body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: 9,
				cy: 9,
				r: 6.5,
				...line
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 9,
				y: 12.2,
				textAnchor: "middle",
				fontSize: 9,
				fontWeight: 700,
				fill: "currentColor",
				children: "1"
			})] });
			break;
		case "pen":
			body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M3 15 L4 11.5 L12 3.5 L14.5 6 L6.5 14 Z",
				...line
			});
			break;
		case "highlight":
			body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: 5,
				y: 3,
				width: 8,
				height: 8,
				rx: 1.5,
				...line
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M7 11 L7 13.5 M11 11 L11 13.5 M3 15.5 L15 15.5",
				...line
			})] });
			break;
		case "crop":
			body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M5 1.5 L5 13 L16.5 13 M1.5 5 L13 5 L13 16.5",
				...line
			});
			break;
		case "background":
			body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: 2,
					y: 3,
					width: 14,
					height: 12,
					rx: 2.5,
					...line
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: 6.5,
					cy: 7,
					r: 1.4,
					...line
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M2.5 13.5 L7 9.5 L10 12 L12.5 10 L15.5 13",
					...line
				})
			] });
			break;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 18 18",
		className: "h-[17px] w-[17px]",
		"aria-hidden": true,
		children: body
	});
}
function ArrowStyleIcon({ style }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 20 20",
		className: "h-[15px] w-[15px]",
		"aria-hidden": true,
		children: style === "tapered" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: ARROW_GLYPH,
			transform: "translate(1 1)",
			fill: "currentColor"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M4 16 L15 5",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16.5 3.5 L10.8 5.2 L14.8 9.2 Z",
				fill: "currentColor"
			}),
			style === "double" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M2.5 17.5 L4.2 11.8 L8.2 15.8 Z",
				fill: "currentColor"
			})
		] })
	});
}
var PLACEMENT_ICON = {
	beside: Columns2,
	below: Rows2,
	over: PictureInPicture2
};
function ImportPanel({ label, placement, onPlacement, busy, onPick, onFile, onClose }) {
	const [items, setItems] = (0, import_react.useState)(null);
	const [failed, setFailed] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let alive = true;
		fetchAppshotLibrary().then((body) => alive && setItems(Array.isArray(body.items) ? body.items.filter((item) => item.mime.startsWith("image/")) : [])).catch(() => {
			if (alive) {
				setFailed(true);
				setItems([]);
			}
		});
		return () => {
			alive = false;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute bottom-3 right-3 top-3 z-20 flex w-[min(340px,calc(100%-1.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-popover/95 text-[13px] shadow-2xl backdrop-blur",
		role: "dialog",
		"aria-label": label("import"),
		"data-testid": "appshot-editor-import-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2 border-b border-border px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold",
					children: label("import")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					"aria-label": label("close"),
					className: ROUND_ICON,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						className: "h-4 w-4",
						"aria-hidden": true
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1.5 border-b border-border px-3 py-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: label("import_place")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-1 rounded-lg bg-foreground/10 p-0.5",
					role: "group",
					"aria-label": label("import_place"),
					children: PLACEMENTS.map((entry) => {
						const Icon = PLACEMENT_ICON[entry];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-pressed": placement === entry,
							onClick: () => onPlacement(entry),
							"data-testid": `appshot-editor-place-${entry}`,
							className: cn("flex h-8 items-center justify-center gap-1.5 rounded-md text-muted-foreground transition-colors hover:bg-popover hover:text-foreground", placement === entry && "bg-popover text-foreground shadow-sm"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "h-3.5 w-3.5",
								"aria-hidden": true
							}), label(`place_${entry}`)]
						}, entry);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 overflow-y-auto px-3 py-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-muted-foreground",
					children: label("import_library")
				}), items === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						className: "h-3.5 w-3.5 animate-spin",
						"aria-hidden": true
					}), label("loading")]
				}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					"data-testid": "appshot-editor-import-empty",
					children: label(failed ? "import_library_failed" : "import_library_empty")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-2 gap-2",
					"data-testid": "appshot-editor-import-list",
					children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: busy,
						onClick: () => onPick(item),
						title: item.app_name || item.label,
						"data-testid": "appshot-editor-import-item",
						className: "group relative block w-full overflow-hidden rounded-lg border border-border bg-background transition-colors hover:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-border-strong disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: appshotLibraryImageUrl(item, true),
							alt: item.app_name || item.label,
							loading: "lazy",
							draggable: false,
							className: "aspect-[4/3] w-full object-cover"
						}), item.variant === "edited" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute left-1 top-1 rounded bg-accent px-1.5 py-px text-[11px] font-medium text-accent-foreground",
							children: label("library_edited_badge")
						})]
					}) }, `${item.id}:${item.variant}`))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border px-3 py-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "image/*",
						className: "hidden",
						"data-testid": "appshot-editor-import-file",
						onChange: (event) => {
							const file = imageFile(event.currentTarget.files);
							event.currentTarget.value = "";
							if (file) onFile(file);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: busy,
						onClick: () => fileRef.current?.click(),
						className: "flex h-8 w-full items-center justify-center gap-2 rounded-lg border border-border font-medium transition-colors hover:bg-foreground/10 disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {
							className: "h-4 w-4 text-muted-foreground",
							"aria-hidden": true
						}), label("import_file")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-center text-[12px] text-muted-foreground",
						children: label("import_paste_hint")
					})
				]
			})
		]
	});
}
var ROUND_ICON = "flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground disabled:pointer-events-none disabled:opacity-40";
function Segmented({ label, value, onChange, options, testId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		"data-testid": testId,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-0.5 rounded-lg bg-foreground/10 p-0.5",
			role: "group",
			"aria-label": label,
			children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": value === option.value,
				onClick: () => onChange(option.value),
				className: cn("h-7 rounded-md px-2.5 text-sm text-muted-foreground transition-colors hover:bg-popover hover:text-foreground", value === option.value && "bg-popover text-foreground shadow-sm"),
				children: option.label
			}, option.value))
		})]
	});
}
function Slider({ label, min, max, step, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex items-center gap-2 text-muted-foreground",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "range",
			min,
			max,
			step,
			value,
			"aria-label": label,
			onChange: (event) => onChange(Number(event.currentTarget.value)),
			className: "h-1 w-24 cursor-pointer accent-primary"
		})]
	});
}
export { AppshotEditor };
