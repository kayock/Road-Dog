import { t as FileText } from "./file-text-D8DI7Rfv.js";
import { t as Globe } from "./globe-DYHt2aUm.js";
import { Bc as require_jsx_runtime, Ln as cn, Xc as require_react, ji as LoaderCircle, oc as useT, si as X, ta as AppWindow, tl as __toESM } from "./index-BOzhgzD7.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function openerLabel(o, t) {
	if (o.id === "default") return t("outputs_view.opener_default");
	if (o.id === "browser") return t("outputs_view.opener_browser");
	return o.label;
}
function OpenerIcon({ id }) {
	const cls = "h-4 w-4 text-muted-foreground";
	if (id === "default") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: cls });
	if (id === "browser") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: cls });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppWindow, { className: cls });
}
function OpenWithDialog({ openers, loading = false, onPick, onClose }) {
	const t = useT();
	const [remember, setRemember] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm",
		onClick: onClose,
		role: "presentation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm rounded-lg bg-popover shadow-float p-5",
			onClick: (e) => e.stopPropagation(),
			role: "dialog",
			"aria-modal": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: t("outputs_view.open_with_title")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "rounded p-1 text-muted-foreground hover:bg-secondary/40",
						"aria-label": t("common.cancel"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				openers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center gap-2 py-4 text-center text-xs text-muted-foreground",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), t("outputs_view.open_with_loading")] }) : t("outputs_view.open_with_empty")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-1",
					children: openers.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onPick(o.id, remember),
						className: cn("flex w-full items-center gap-2.5 rounded-lg border border-transparent", "px-3 py-2 text-left text-sm text-foreground/90", "hover:border-primary/40 hover:bg-primary/10"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenerIcon, { id: o.id }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: openerLabel(o, t)
						})]
					}) }, o.id))
				}),
				openers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 flex cursor-pointer items-center gap-2 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: remember,
						onChange: (e) => setRemember(e.target.checked),
						className: "h-3.5 w-3.5 accent-primary"
					}), t("outputs_view.open_with_remember")]
				})
			]
		})
	});
}
export { OpenWithDialog as t };
