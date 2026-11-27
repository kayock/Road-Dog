import { Bc as require_jsx_runtime, Xc as require_react, tl as __toESM } from "./index-BOzhgzD7.js";
import { t as PageHeader } from "./PageHeader-DcwsywY0.js";
require_react();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function ViewHeader({ icon, title, titleBadge, subtitle, right }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "shrink-0 px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			icon,
			title,
			description: subtitle,
			className: "pb-4",
			actions: titleBadge || right ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [titleBadge, right] }) : void 0
		})
	});
}
export { ViewHeader as t };
