import { t as ProviderLogo } from "./ProviderLogo-BxoN_q6P.js";
import { Bc as require_jsx_runtime, Ln as cn, oc as useT, tl as __toESM } from "./index-BOzhgzD7.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function RuntimeMark({ runtime, label }) {
	return runtime === "jarvis" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/jarvis-gigi-256.png",
		alt: "",
		"aria-hidden": "true",
		width: 16,
		height: 16,
		className: "size-4 shrink-0 rounded-[4px]",
		"data-testid": "runtime-mark-jarvis"
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderLogo, {
		providerId: runtime,
		label,
		size: "sm"
	});
}
function RuntimeBadge({ runtime, className }) {
	const t = useT();
	const resolved = runtime ?? "jarvis";
	const label = t("society.runtime.runs_on").replace("{0}", t(`society.runtime.${resolved}`));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		role: "img",
		"aria-label": label,
		title: label,
		"data-testid": `runtime-badge-${resolved}`,
		className: cn("pointer-events-auto inline-flex h-[18px] w-[18px] items-center justify-center overflow-hidden rounded-full bg-secondary ring-2 ring-sidebar [&_img]:size-3.5", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuntimeMark, {
			runtime: resolved,
			label: t(`society.runtime.${resolved}`)
		})
	});
}
export { RuntimeMark as n, RuntimeBadge as t };
