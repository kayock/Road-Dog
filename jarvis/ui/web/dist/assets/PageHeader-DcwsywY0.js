import { Bc as require_jsx_runtime, Ln as cn, tl as __toESM } from "./index-BOzhgzD7.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function PageHeader({ icon, title, description, actions, tabs, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		"data-testid": "section-header",
		className: cn("flex shrink-0 flex-col pt-6", tabs ? "pb-0" : "pb-6", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [
				icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "mt-1 flex h-5 w-5 shrink-0 items-center justify-center text-muted-foreground [&>svg]:h-5 [&>svg]:w-5",
					children: icon
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "truncate text-xl font-semibold text-foreground-strong",
						children: title
					}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-base text-muted-foreground",
						children: description
					})]
				}),
				actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex shrink-0 items-center gap-2",
					children: actions
				})
			]
		}), tabs && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: tabs
		})]
	});
}
export { PageHeader as t };
