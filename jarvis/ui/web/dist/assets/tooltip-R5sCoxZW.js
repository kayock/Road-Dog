import { Bc as require_jsx_runtime, Ln as cn, Xc as require_react, Yc as require_react_dom, tl as __toESM } from "./index-BOzhgzD7.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_react_dom = require_react_dom();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var SHOW_DELAY_MS = 180;
var MAX_WIDTH = 320;
var GAP = 8;
var VIEWPORT_MARGIN = 8;
function place(anchor, bubble, side) {
	let left;
	let top;
	if (side === "right") {
		left = anchor.right + GAP;
		top = anchor.top + anchor.height / 2 - bubble.height / 2;
		if (left + bubble.width > window.innerWidth - VIEWPORT_MARGIN) {
			left = anchor.left;
			top = anchor.bottom + GAP;
		}
	} else if (side === "top") {
		left = anchor.left + anchor.width / 2 - bubble.width / 2;
		top = anchor.top - GAP - bubble.height;
	} else {
		left = anchor.left + anchor.width / 2 - bubble.width / 2;
		top = anchor.bottom + GAP;
	}
	left = Math.min(Math.max(left, VIEWPORT_MARGIN), window.innerWidth - bubble.width - VIEWPORT_MARGIN);
	top = Math.min(Math.max(top, VIEWPORT_MARGIN), window.innerHeight - bubble.height - VIEWPORT_MARGIN);
	return {
		left,
		top
	};
}
function QuickTooltip({ content, side = "right", disabled = false, className, children }) {
	const anchorRef = (0, import_react.useRef)(null);
	const bubbleRef = (0, import_react.useRef)(null);
	const timerRef = (0, import_react.useRef)(null);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [position, setPosition] = (0, import_react.useState)(null);
	const cancel = (0, import_react.useCallback)(() => {
		if (timerRef.current !== null) {
			window.clearTimeout(timerRef.current);
			timerRef.current = null;
		}
		setOpen(false);
		setPosition(null);
	}, []);
	const schedule = (0, import_react.useCallback)(() => {
		if (disabled || !content.trim()) return;
		if (timerRef.current !== null) window.clearTimeout(timerRef.current);
		timerRef.current = window.setTimeout(() => {
			timerRef.current = null;
			setOpen(true);
		}, SHOW_DELAY_MS);
	}, [disabled, content]);
	(0, import_react.useEffect)(() => cancel, [cancel]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const anchor = anchorRef.current?.getBoundingClientRect();
		const bubble = bubbleRef.current?.getBoundingClientRect();
		if (!anchor || !bubble) return;
		setPosition(place(anchor, bubble, side));
	}, [open, side]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		ref: anchorRef,
		className,
		onMouseEnter: schedule,
		onMouseLeave: cancel,
		onFocus: schedule,
		onBlur: cancel,
		onClick: cancel,
		children: [children, open && (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: bubbleRef,
			role: "tooltip",
			style: {
				position: "fixed",
				left: position?.left ?? 0,
				top: position?.top ?? 0,
				maxWidth: MAX_WIDTH,
				visibility: position ? "visible" : "hidden"
			},
			className: cn("pointer-events-none z-[70] rounded-lg border border-border-strong bg-popover px-2.5 py-1.5 shadow-float", "whitespace-pre-line text-sm text-popover-foreground", position && "animate-in fade-in-0 zoom-in-95 duration-100"),
			children: content
		}), document.body)]
	});
}
export { QuickTooltip as t };
