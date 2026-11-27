import { Bc as require_jsx_runtime, Ln as cn, tl as __toESM } from "./index-BOzhgzD7.js";
import { t as BrandedSelect } from "./select-vogX_D37.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function SettingsPage({ title, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-3xl px-6 pb-20 pt-10 sm:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold text-foreground-strong",
				children: title
			}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-base text-muted-foreground",
				children: description
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-10",
			children
		})]
	});
}
function SettingsSection({ title, description, actions, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("space-y-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold text-foreground-strong",
					children: title
				}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-muted-foreground",
					children: description
				})]
			}), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex shrink-0 items-center gap-2",
				children: actions
			})]
		}), children]
	});
}
function SettingsCard({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("divide-y divide-border rounded-lg border border-border bg-card", className),
		children
	});
}
function SettingsRow({ title, description, control, children, id, testId, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id,
		"data-testid": testId,
		className: cn("scroll-mt-6 px-4 py-3.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-x-6 gap-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1 basis-64",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-base font-medium text-foreground",
					children: title
				}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-0.5 text-sm text-muted-foreground",
					children: description
				})]
			}), control && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex shrink-0 items-center gap-2",
				children: control
			})]
		}), children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 space-y-2",
			children
		})]
	});
}
function SettingsNote({ children, tone = "default", className, testId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-testid": testId,
		className: cn("rounded-md bg-secondary px-3 py-2.5 text-sm", tone === "default" && "text-foreground", tone === "success" && "text-success", tone === "warning" && "text-warning", tone === "error" && "text-destructive", className),
		children
	});
}
function SettingsSelect({ value, options, onValueChange, ariaLabel, placeholder, disabled, testId, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedSelect, {
		value,
		options,
		onValueChange,
		ariaLabel,
		placeholder,
		disabled,
		testId,
		className: cn(settingsSelectCls, className)
	});
}
const settingsSelectCls = "h-8 w-auto max-w-[16rem] gap-1.5 bg-transparent py-0 pl-2.5 pr-2 hover:bg-secondary";
function SettingsSegmented({ value, options, onChange, ariaLabel, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "radiogroup",
		"aria-label": ariaLabel,
		className: "inline-flex items-center gap-0.5 rounded-md border border-border p-0.5",
		children: options.map((option) => {
			const active = option.value === value;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "radio",
				"aria-checked": active,
				disabled,
				onClick: () => onChange(option.value),
				className: cn("inline-flex h-7 items-center gap-1.5 rounded px-2.5 text-sm font-medium transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50", "[&>svg]:h-3.5 [&>svg]:w-3.5", active ? "bg-secondary text-foreground-strong" : "text-muted-foreground hover:text-foreground"),
				children: [option.icon, option.label]
			}, option.value);
		})
	});
}
const settingsRangeCls = "h-1.5 w-full cursor-pointer accent-accent disabled:cursor-not-allowed disabled:opacity-50";
function SettingsValue({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "min-w-[3.5rem] text-right text-sm font-medium tabular-nums text-foreground",
		children
	});
}
function SettingsLinkButton({ children, onClick, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		disabled,
		className: "text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
		children
	});
}
export { SettingsRow as a, SettingsSelect as c, settingsSelectCls as d, SettingsPage as i, SettingsValue as l, SettingsLinkButton as n, SettingsSection as o, SettingsNote as r, SettingsSegmented as s, SettingsCard as t, settingsRangeCls as u };
