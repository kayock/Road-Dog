import { t as CornerDownLeft } from "./corner-down-left-BPT1dXdi.js";
import { Bc as require_jsx_runtime, Cn as Portal, Ln as cn, Sn as Overlay, Tn as Title, Xc as require_react, bn as Content, gi as Search, oc as useT, tl as __toESM, wn as Root } from "./index-BOzhgzD7.js";
import { t as _e } from "./dist-B6qknip3.js";
import "./settingsSearch-CweIuixq.js";
import { t as QuickSwitchList } from "./QuickSwitchList-kH22Q9zT.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function QuickSwitcher({ open, onOpenChange, initialQuery = "" }) {
	const t = useT();
	const [query, setQuery] = (0, import_react.useState)(initialQuery);
	const [selected, setSelected] = (0, import_react.useState)("");
	const close = () => {
		onOpenChange(false);
		setQuery("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		open,
		onOpenChange: (next) => {
			if (!next) setQuery("");
			onOpenChange(next);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 z-[80]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
			"data-testid": "quick-switcher",
			"aria-describedby": void 0,
			className: cn("fixed left-1/2 top-[18%] z-[90] w-[min(640px,calc(100vw-2rem))] -translate-x-1/2", "overflow-hidden rounded-2xl border border-border shadow-float", "backdrop-blur-2xl backdrop-saturate-150", "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", "motion-reduce:animate-none"),
			style: { backgroundColor: "hsl(var(--popover) / 0.86)" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
				className: "sr-only",
				children: t("quick_switch.title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e, {
				shouldFilter: false,
				loop: true,
				label: t("quick_switch.title"),
				value: selected,
				onValueChange: setSelected,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 px-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							className: "h-6 w-6 shrink-0 text-muted-foreground",
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
							autoFocus: true,
							value: query,
							onValueChange: setQuery,
							placeholder: t("quick_switch.placeholder"),
							"data-testid": "quick-switcher-input",
							className: "h-14 flex-1 bg-transparent text-2xl font-light text-foreground outline-none placeholder:text-muted-foreground"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickSwitchList, {
						query,
						onDone: close,
						onFirstChange: setSelected,
						className: "max-h-[min(30rem,62dvh)] border-t border-border"
					}),
					query.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-end gap-4 border-t border-border px-4 py-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
								className: "inline-flex h-5 items-center rounded border border-border px-1 font-sans",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerDownLeft, {
									className: "h-3 w-3",
									"aria-hidden": true
								})
							}), t("quick_switch.hint_open")]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
								className: "inline-flex h-5 items-center rounded border border-border px-1 font-sans",
								children: "esc"
							}), t("quick_switch.hint_close")]
						})]
					})
				]
			})]
		})] })
	});
}
export { QuickSwitcher };
