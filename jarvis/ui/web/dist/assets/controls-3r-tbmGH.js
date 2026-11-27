import { Bc as require_jsx_runtime, Ln as cn, Xc as require_react, tl as __toESM } from "./index-BOzhgzD7.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
const FOCUS_RING = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60";
var BASE = `inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-control px-3 text-sm font-medium transition-colors ${FOCUS_RING} disabled:cursor-not-allowed disabled:opacity-40`;
var VARIANTS = {
	primary: "bg-foreground/70 text-primary-foreground hover:bg-primary/90",
	quiet: "border border-border bg-card text-foreground hover:border-border hover:bg-secondary",
	subtle: "text-muted-foreground hover:bg-secondary hover:text-foreground"
};
const Button = (0, import_react.forwardRef)(function Button$1({ variant = "quiet", className, type, ...rest }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		ref,
		type: type ?? "button",
		className: cn(BASE, VARIANTS[variant], className),
		...rest
	});
});
const IconButton = (0, import_react.forwardRef)(function IconButton$1({ label, size = "md", className, type, ...rest }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		ref,
		type: type ?? "button",
		"aria-label": label,
		title: rest.title ?? label,
		className: cn(`inline-flex shrink-0 items-center justify-center rounded-control text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground ${FOCUS_RING} disabled:cursor-not-allowed disabled:opacity-40`, size === "sm" ? "h-6 w-6" : "h-8 w-8", className),
		...rest
	});
});
const Field = (0, import_react.forwardRef)(function Field$1({ className, ...rest }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		ref,
		className: cn("h-8 min-w-0 rounded-control border border-border bg-background px-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary/60", className),
		...rest
	});
});
function SectionLabel({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("truncate text-micro font-semibold text-muted-foreground", className),
		children
	});
}
export { SectionLabel as a, IconButton as i, FOCUS_RING as n, Field as r, Button as t };
