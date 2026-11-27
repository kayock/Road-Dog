import { Bc as require_jsx_runtime, Ln as cn, oc as useT, tl as __toESM, wc as useEventStore } from "./index-BOzhgzD7.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function SectionTabBar({ tabs, align = "start", className }) {
	const t = useT();
	const active = useEventStore((s) => s.activeSection);
	const setActive = useEventStore((s) => s.setActiveSection);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBar, {
		tabs: tabs.map((tab) => ({
			id: tab.id,
			label: t(tab.labelKey)
		})),
		active,
		onChange: (id) => setActive(id),
		align,
		className
	});
}
function TabBar({ tabs, active, onChange, className, align = "start" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex items-center gap-6 border-b border-border", align === "center" ? "justify-center" : "justify-start", className),
		children: tabs.map((tab) => {
			const isActive = active === tab.id;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"aria-current": isActive ? "page" : void 0,
				onClick: () => onChange(tab.id),
				className: cn("relative -mb-px flex h-10 items-center gap-2 border-b-2 text-base font-medium transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background", isActive ? "border-accent text-foreground-strong" : "border-transparent text-muted-foreground hover:text-foreground"),
				children: [tab.label, tab.count !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm tabular-nums text-foreground-faint",
					children: tab.count
				})]
			}, tab.id);
		})
	});
}
export { TabBar as n, SectionTabBar as t };
