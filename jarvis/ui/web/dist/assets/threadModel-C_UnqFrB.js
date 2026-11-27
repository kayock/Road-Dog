import { Bc as require_jsx_runtime, Ln as cn, Uo as createAgentChatStore, Xc as require_react, Yc as require_react_dom, tl as __toESM } from "./index-BOzhgzD7.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_react_dom = require_react_dom();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function ThreadPopover({ anchor, open, onClose, align = "start", side = "bottom", width = 260, className, label, children }) {
	const panel = (0, import_react.useRef)(null);
	const [place, setPlace] = (0, import_react.useState)(null);
	const measure = (0, import_react.useCallback)(() => {
		const host = anchor.current;
		if (!host) return;
		const rect = host.getBoundingClientRect();
		const margin = 8;
		const height = panel.current?.offsetHeight ?? 0;
		const below = window.innerHeight - rect.bottom - margin;
		const above = rect.top - margin;
		const wantTop = side === "top" ? above > Math.min(height, 240) || above > below : below < Math.min(height, 240) && above > below;
		const left = align === "end" ? rect.right - width : rect.left;
		const clampedLeft = Math.max(margin, Math.min(left, window.innerWidth - width - margin));
		const room = Math.max(120, wantTop ? above - 4 : below - 4);
		setPlace({
			left: clampedLeft,
			top: wantTop ? Math.max(margin, rect.top - 4 - Math.min(height, room)) : rect.bottom + 4,
			maxHeight: room
		});
	}, [
		anchor,
		align,
		side,
		width
	]);
	(0, import_react.useLayoutEffect)(() => {
		if (!open) {
			setPlace(null);
			return;
		}
		measure();
		const frame = requestAnimationFrame(measure);
		return () => cancelAnimationFrame(frame);
	}, [open, measure]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onDown = (event) => {
			const target = event.target;
			if (!target) return;
			if (panel.current?.contains(target) || anchor.current?.contains(target)) return;
			onClose();
		};
		const onKey = (event) => {
			if (event.key !== "Escape") return;
			event.stopPropagation();
			onClose();
			anchor.current?.focus();
		};
		window.addEventListener("pointerdown", onDown, true);
		window.addEventListener("keydown", onKey, true);
		window.addEventListener("resize", measure);
		return () => {
			window.removeEventListener("pointerdown", onDown, true);
			window.removeEventListener("keydown", onKey, true);
			window.removeEventListener("resize", measure);
		};
	}, [
		open,
		onClose,
		anchor,
		measure
	]);
	if (!open) return null;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: panel,
		role: "dialog",
		"aria-label": label,
		style: {
			left: place?.left ?? -9999,
			top: place?.top ?? -9999,
			width,
			maxHeight: place?.maxHeight
		},
		className: cn("fixed z-[90] overflow-y-auto rounded-xl border border-border bg-popover p-1 text-sm text-popover-foreground shadow-float scrollbar-jarvis", className),
		children
	}), document.body);
}
function ThreadMenuItem({ icon, label, hint, onSelect, disabled = false, danger = false, selected = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		role: "menuitem",
		disabled,
		onClick: onSelect,
		className: cn("flex min-h-8 w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-45", danger ? "text-destructive hover:bg-destructive/10" : "hover:bg-secondary", selected && "bg-secondary text-foreground-strong"),
		children: [
			icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 flex-1 truncate",
				children: label
			}),
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 text-xs text-muted-foreground",
				children: hint
			})
		]
	});
}
function ThreadMenuHeading({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-2 pb-1 pt-2 text-xs font-medium text-muted-foreground",
		children
	});
}
function ThreadMenuSeparator() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "separator",
		className: "my-1 h-px bg-border"
	});
}
const useThreadChatStore = createAgentChatStore("agent", "threads");
function threadTitle(session) {
	return session?.cli_title?.trim() || session?.title?.trim() || "New thread";
}
function comparablePath(path) {
	let text = path.trim().replace(/\\/g, "/");
	while (text.length > 1 && text.endsWith("/") && !/^[A-Za-z]:\/$/.test(text)) text = text.slice(0, -1);
	return /^[A-Za-z]:\//.test(text) || text.startsWith("//") ? text.toLowerCase() : text;
}
function isInside(child, parent) {
	const a = comparablePath(child);
	const b = comparablePath(parent);
	if (!a || !b) return false;
	return a === b || a.startsWith(b.endsWith("/") ? b : `${b}/`);
}
function projectIdFor(session, projects, projectOf) {
	const remembered = projectOf[session.session_id];
	if (remembered && projects.some((project) => project.id === remembered)) return remembered;
	let best = null;
	for (const project of projects) {
		if (!project.path || !isInside(session.cwd, project.path)) continue;
		if (!best || comparablePath(project.path).length > comparablePath(best.path).length) best = project;
	}
	return best?.id ?? null;
}
function threadsByProject(sessions, projects, projectOf) {
	const out = /* @__PURE__ */ new Map();
	for (const session of sessions) {
		const projectId = projectIdFor(session, projects, projectOf);
		if (!projectId) continue;
		const list = out.get(projectId);
		if (list) list.push(session);
		else out.set(projectId, [session]);
	}
	for (const list of out.values()) list.sort((a, b) => b.updated_ms - a.updated_ms);
	return out;
}
function arrangeThreads(threads, order) {
	if (!order || order.length === 0) return [...threads];
	const place = new Map(order.map((id, index) => [id, index]));
	const loose = threads.filter((thread) => !place.has(thread.session_id)).sort((a, b) => b.updated_ms - a.updated_ms);
	const placed = threads.filter((thread) => place.has(thread.session_id)).sort((a, b) => (place.get(a.session_id) ?? 0) - (place.get(b.session_id) ?? 0));
	return [...loose, ...placed];
}
function moveThreadId(ids, sourceId, targetId, before) {
	if (sourceId === targetId || !ids.includes(sourceId) || !ids.includes(targetId)) return [...ids];
	const rest = ids.filter((id) => id !== sourceId);
	const at = rest.indexOf(targetId) + (before ? 0 : 1);
	return [
		...rest.slice(0, at),
		sourceId,
		...rest.slice(at)
	];
}
function threadStatus(session, seen, openSessionId) {
	if (session.pending_approvals && session.pending_approvals.length > 0) return "approval";
	if (session.running) return "running";
	if (session.session_id !== openSessionId && session.updated_ms > (seen[session.session_id] ?? Number.POSITIVE_INFINITY)) return "unseen";
	return "idle";
}
function threadAgents(options) {
	return options.filter((option) => Boolean(option.agent)).sort((a, b) => Number(b.connected) - Number(a.connected));
}
function shortAge(ms, now = Date.now()) {
	const seconds = Math.max(0, Math.round((now - ms) / 1e3));
	if (seconds < 60) return "now";
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return `${minutes}m`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours}h`;
	const days = Math.floor(hours / 24);
	if (days < 7) return `${days}d`;
	return `${Math.floor(days / 7)}w`;
}
function folderLabel(path) {
	const parts = path.split(/[\\/]/).filter(Boolean);
	return parts[parts.length - 1] ?? path;
}
var SEAT_KEY = "jarvis.ide.threadSeat.v1";
function rememberSeat(seat) {
	if (!seat.provider) return;
	try {
		localStorage.setItem(SEAT_KEY, JSON.stringify({
			provider: seat.provider,
			model: seat.model,
			effort: seat.effort,
			permissionMode: seat.permissionMode
		}));
	} catch {}
}
function rememberedSeat() {
	try {
		const raw = JSON.parse(localStorage.getItem(SEAT_KEY) ?? "null");
		if (!raw || typeof raw !== "object") return null;
		const row = raw;
		if (typeof row.provider !== "string" || !row.provider) return null;
		const text = (value) => typeof value === "string" ? value : "";
		return {
			provider: row.provider,
			model: text(row.model),
			effort: text(row.effort),
			permissionMode: text(row.permissionMode)
		};
	} catch {
		return null;
	}
}
export { rememberSeat as a, threadAgents as c, threadsByProject as d, useThreadChatStore as f, ThreadPopover as g, ThreadMenuSeparator as h, projectIdFor as i, threadStatus as l, ThreadMenuItem as m, folderLabel as n, rememberedSeat as o, ThreadMenuHeading as p, moveThreadId as r, shortAge as s, arrangeThreads as t, threadTitle as u };
