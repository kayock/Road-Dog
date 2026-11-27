import { Bc as require_jsx_runtime, Ln as cn, Xc as require_react, Yc as require_react_dom, gi as Search, oc as useT, tl as __toESM } from "./index-BOzhgzD7.js";
import { t as _e } from "./dist-B6qknip3.js";
import "./settingsSearch-CweIuixq.js";
import { t as QuickSwitchList } from "./QuickSwitchList-kH22Q9zT.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_react_dom = require_react_dom();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var PANEL_MIN_WIDTH = 420;
var VIEWPORT_GUTTER = 16;
function InlineQuickSwitch({ initialValue, autoFocus, accessibleName, placeholder, status, caps, onValueChange }) {
	const t = useT();
	const fieldRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	const [query, setQuery] = (0, import_react.useState)(initialValue);
	const [open, setOpen] = (0, import_react.useState)(autoFocus);
	const [rect, setRect] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)("");
	const setValue = (value) => {
		setQuery(value);
		onValueChange?.(value);
		setOpen(true);
	};
	const measure = (0, import_react.useCallback)(() => {
		if (fieldRef.current) setRect(fieldRef.current.getBoundingClientRect());
	}, []);
	(0, import_react.useLayoutEffect)(() => {
		if (!open) return;
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, [open, measure]);
	(0, import_react.useLayoutEffect)(() => {
		const input = inputRef.current;
		if (autoFocus && input) {
			input.focus();
			input.setSelectionRange(input.value.length, input.value.length);
		}
	}, [autoFocus]);
	const finish = () => {
		setValue("");
		setOpen(false);
		inputRef.current?.blur();
	};
	const width = rect ? Math.min(Math.max(rect.width, PANEL_MIN_WIDTH), window.innerWidth - rect.left - VIEWPORT_GUTTER) : PANEL_MIN_WIDTH;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e, {
		shouldFilter: false,
		loop: true,
		label: accessibleName,
		value: selected,
		onValueChange: setSelected,
		className: "min-w-0 flex-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: fieldRef,
			className: cn("flex h-8 w-full items-center gap-2 rounded-lg border px-2.5 text-sm transition-colors", open ? "border-accent bg-card ring-2 ring-ring" : "border-border bg-input hover:border-border-strong"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					className: "h-3.5 w-3.5 shrink-0 text-muted-foreground",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
					ref: inputRef,
					value: query,
					onValueChange: setValue,
					onFocus: () => setOpen(true),
					onBlur: () => setOpen(false),
					onKeyDown: (event) => {
						if (event.key !== "Escape") return;
						event.preventDefault();
						if (query) setValue("");
						else finish();
					},
					placeholder,
					"aria-label": accessibleName,
					title: accessibleName,
					"data-testid": "sidebar-search",
					className: "h-full min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
				}),
				status,
				!open && caps.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden shrink-0 items-center gap-0.5 sm:inline-flex",
					"aria-hidden": true,
					children: caps.map((cap) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
						className: "rounded border border-border bg-background px-1 font-sans text-[10px] leading-4 text-muted-foreground",
						children: cap
					}, cap))
				})
			]
		}), open && rect && query.trim() !== "" && (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-testid": "sidebar-search-results",
			onMouseDown: (event) => event.preventDefault(),
			className: cn("fixed z-[70] overflow-hidden rounded-xl border border-border bg-popover shadow-float", "animate-in fade-in-0 zoom-in-95 duration-100 motion-reduce:animate-none"),
			style: {
				top: rect.bottom + 6,
				left: rect.left,
				width
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickSwitchList, {
				query,
				onDone: finish,
				size: "compact",
				onFirstChange: setSelected,
				className: "max-h-[min(28rem,70dvh)]"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border-t border-border px-3 py-1.5 text-xs text-muted-foreground",
				children: t("quick_switch.inline_hint")
			})]
		}), document.body)]
	});
}
export { InlineQuickSwitch };
