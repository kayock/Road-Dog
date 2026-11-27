import { Bc as require_jsx_runtime, Ln as cn, Xc as require_react, tl as __toESM } from "./index-BOzhgzD7.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var Input = import_react.forwardRef(({ className, type = "text", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	type,
	ref,
	className: cn("flex h-9 w-full rounded-md border border-border-strong bg-input px-3 text-base text-foreground", "placeholder:text-foreground-faint", "transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background", "disabled:cursor-not-allowed disabled:opacity-50", "file:border-0 file:bg-transparent file:text-base file:font-medium", className),
	...props
}));
Input.displayName = "Input";
export { Input as t };
