import { Bc as require_jsx_runtime, Xc as require_react, tl as __toESM } from "./index-BOzhgzD7.js";
import { t as Combobox } from "./combobox-BL3mwl7r.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function BrandedSelect({ value, options, onValueChange, ariaLabel, placeholder, disabled = false, className, id, ariaDescribedBy, testId, searchPlaceholder, emptyLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox, {
		value,
		groups: (0, import_react.useMemo)(() => [{
			id: "options",
			options: [...options]
		}], [options]),
		onChange: onValueChange,
		ariaLabel,
		fallbackLabel: placeholder ?? value,
		searchPlaceholder,
		emptyLabel,
		disabled,
		className,
		id,
		ariaDescribedBy,
		testId
	});
}
export { BrandedSelect as t };
