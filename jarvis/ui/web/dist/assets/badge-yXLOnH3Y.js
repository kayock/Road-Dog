import { Bc as require_jsx_runtime, Ln as cn, Xc as require_react, tl as __toESM, un as cva } from "./index-BOzhgzD7.js";
require_react();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var badgeVariants = cva("inline-flex h-6 items-center gap-1 whitespace-nowrap rounded-md border px-2 text-xs font-medium ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:shrink-0", {
	variants: { variant: {
		default: "border-border bg-secondary text-muted-foreground",
		secondary: "border-transparent bg-secondary text-muted-foreground",
		outline: "border-border-strong bg-transparent text-muted-foreground",
		solid: "border-transparent bg-primary text-primary-foreground",
		accent: "border-accent/20 bg-accent-soft text-accent",
		success: "border-success/20 bg-success/[0.12] text-success",
		warning: "border-warning/20 bg-warning/[0.12] text-warning",
		destructive: "border-destructive/20 bg-destructive/[0.12] text-destructive",
		life: "border-success/20 bg-success/[0.12] text-success",
		fault: "border-destructive/20 bg-destructive/[0.12] text-destructive",
		degraded: "border-warning/20 bg-warning/[0.12] text-warning",
		info: "border-accent/20 bg-accent-soft text-accent"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
export { badgeVariants as n, Badge as t };
