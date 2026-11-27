import { Bc as require_jsx_runtime, Ln as cn, Qi as ArrowLeft, Xc as require_react, ji as LoaderCircle, qi as ChevronDown, tl as __toESM } from "./index-BOzhgzD7.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function PanelHeader({ title, subtitle, actions, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-start justify-between gap-4", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold text-foreground-strong",
				children: title
			}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-base text-muted-foreground",
				children: subtitle
			}) : null]
		}), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex shrink-0 items-center gap-1",
			children: actions
		}) : null]
	});
}
function IconButton({ label, onClick, children, active, disabled, busy, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		disabled: disabled || busy,
		"aria-label": label,
		"aria-pressed": active,
		title: label,
		className: cn("grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition-colors", "hover:bg-secondary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background", active && "bg-secondary text-foreground", className),
		children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : children
	});
}
function SoftButton({ children, onClick, disabled, primary, className, ariaLabel, ariaExpanded, ariaHasPopup }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		disabled,
		"aria-label": ariaLabel,
		"aria-expanded": ariaExpanded,
		"aria-haspopup": ariaHasPopup,
		className: cn("inline-flex h-9 items-center gap-2 rounded-md px-3 text-base font-medium transition-colors", "disabled:cursor-not-allowed disabled:opacity-50", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background", "[&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0", primary ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-foreground hover:bg-surface-raised", className),
		children
	});
}
function ActionMenu({ actions, trigger, align = "end", label }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const rootRef = (0, import_react.useRef)(null);
	const menuId = (0, import_react.useId)();
	const close = (0, import_react.useCallback)(() => setOpen(false), []);
	const toggle = (0, import_react.useCallback)(() => setOpen((v) => !v), []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onDown = (e) => {
			if (!rootRef.current?.contains(e.target)) close();
		};
		const onKey = (e) => {
			if (e.key === "Escape") close();
		};
		document.addEventListener("mousedown", onDown);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onDown);
			document.removeEventListener("keydown", onKey);
		};
	}, [open, close]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: rootRef,
		className: "relative",
		children: [trigger({
			open,
			toggle
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			id: menuId,
			role: "menu",
			"aria-label": label,
			className: cn("absolute z-40 mt-1 min-w-[200px] overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground", align === "end" ? "right-0" : "left-0"),
			children: actions.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [a.separatorAbove && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-1 h-px bg-border" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "menuitem",
				disabled: a.disabled,
				onClick: () => {
					close();
					a.onSelect();
				},
				className: cn("flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-xs transition-colors", "hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50", a.destructive && "text-destructive hover:bg-secondary"),
				children: [a.icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-4 w-4 place-items-center text-muted-foreground",
					children: a.icon
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex-1 truncate",
					children: a.label
				})]
			})] }, a.id))
		})]
	});
}
function MenuPill({ children, open, toggle, primary }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SoftButton, {
		onClick: toggle,
		primary,
		ariaExpanded: open,
		ariaHasPopup: "menu",
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("h-3.5 w-3.5 transition-transform", open && "rotate-180") })]
	});
}
function Table({ children, className, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "table",
		"aria-label": label,
		className: cn("w-full text-sm", className),
		children
	});
}
function gridTemplate(columns) {
	return columns.map((c) => c.width ?? "minmax(0, 1fr)").join(" ");
}
function TableHead({ columns }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "row",
		className: "grid items-center gap-x-5 border-b border-border px-3 py-2.5 text-sm text-muted-foreground",
		style: { gridTemplateColumns: gridTemplate(columns) },
		children: columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "columnheader",
			className: cn("truncate", c.align === "right" && "text-right", c.align === "center" && "text-center"),
			children: c.srOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: c.label
			}) : c.label
		}, c.id))
	});
}
function TableRow({ columns, children, onClick, id, className, selected, ariaLabel }) {
	const clickable = typeof onClick === "function";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		id,
		role: "row",
		"aria-label": ariaLabel,
		"aria-selected": selected,
		tabIndex: clickable ? 0 : void 0,
		onClick,
		onKeyDown: clickable ? (e) => {
			if (e.target !== e.currentTarget) return;
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onClick?.();
			}
		} : void 0,
		className: cn("group grid min-h-[48px] items-center gap-x-5 border-b border-border px-3 py-2 transition-colors last:border-b-0", clickable && "cursor-pointer hover:bg-secondary focus:outline-none focus-visible:bg-secondary", selected && "bg-accent-soft", className),
		style: { gridTemplateColumns: gridTemplate(columns) },
		children
	});
}
function Cell({ children, align, className, muted, stop }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "cell",
		onClick: stop ? (e) => e.stopPropagation() : void 0,
		onKeyDown: stop ? (e) => e.stopPropagation() : void 0,
		className: cn("min-w-0", align === "right" && "flex justify-end text-right", align === "center" && "flex justify-center text-center", muted && "text-sm text-muted-foreground", className),
		children
	});
}
function EmptyRow({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-lg border border-dashed border-border px-6 py-10 text-center text-base text-muted-foreground",
		children
	});
}
function BackLink({ label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "inline-flex items-center gap-1.5 rounded-sm text-base font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), label]
	});
}
function DetailHeader({ leading, title, titleAccessory, byline, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 items-start gap-3",
			children: [leading, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "truncate text-xl font-semibold text-foreground-strong",
						children: title
					}), titleAccessory]
				}), byline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-base text-muted-foreground",
					children: byline
				}) : null]
			})]
		}), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex shrink-0 items-center gap-2",
			children: actions
		}) : null]
	});
}
function ClampedText({ text, moreLabel, lessLabel, className }) {
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	const [overflows, setOverflows] = (0, import_react.useState)(false);
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		setOverflows(el.scrollHeight > el.clientHeight + 1);
	}, [text]);
	if (!text) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("text-reading text-foreground", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			ref,
			className: cn(!expanded && "line-clamp-2"),
			children: [text, expanded && overflows && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setExpanded(false),
				className: "text-primary hover:underline",
				children: lessLabel
			})] })]
		}), !expanded && overflows && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setExpanded(true),
			className: "mt-0.5 text-sm text-foreground-strong hover:underline",
			children: moreLabel
		})]
	});
}
function Panel({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("jarvis-quiet-panel", className),
		children
	});
}
function FactRows({ rows, className }) {
	const visible = rows.filter((r) => r.value !== null && r.value !== void 0 && r.value !== "");
	if (visible.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
		className: cn("grid grid-cols-[max-content_minmax(0,1fr)] gap-x-8 gap-y-2.5 text-title", className),
		children: visible.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "contents",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-sm leading-6 text-muted-foreground",
				children: r.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "min-w-0 break-words leading-6",
				children: r.value
			})]
		}, r.label))
	});
}
function StatusDot({ tone, label, pulse }) {
	const color = {
		ok: "bg-success",
		off: "bg-muted-foreground/40",
		warn: "bg-foreground",
		error: "bg-destructive",
		busy: "bg-success"
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-2 text-sm text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-2 w-2 shrink-0 rounded-full", color, pulse && "animate-pulse") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: label
		})]
	});
}
function formatShortDate(iso, locale) {
	if (!iso) return "—";
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return "—";
	try {
		return new Intl.DateTimeFormat(locale, {
			year: "2-digit",
			month: "numeric",
			day: "numeric"
		}).format(d);
	} catch {
		return d.toISOString().slice(0, 10);
	}
}
function InlineSearch({ value, onChange, placeholder, autoFocus }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "text",
		value,
		autoFocus,
		onChange: (e) => onChange(e.target.value),
		placeholder,
		"aria-label": placeholder,
		className: "h-9 w-full rounded-md border border-border-strong bg-input px-3 text-base placeholder:text-foreground-faint transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
	});
}
function SegmentedFilter({ value, onChange, options, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "tablist",
		"aria-label": label,
		className: "flex items-center gap-6 border-b border-border",
		children: options.map((o) => {
			const active = o.id === value;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "tab",
				"aria-selected": active,
				onClick: () => onChange(o.id),
				className: cn("relative -mb-px inline-flex h-10 items-center gap-2 border-b-2 text-base font-medium transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background", active ? "border-accent text-foreground-strong" : "border-transparent text-muted-foreground hover:text-foreground"),
				children: [o.label, typeof o.count === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm tabular-nums text-foreground-faint",
					children: o.count
				})]
			}, o.id);
		})
	});
}
function StatTile({ icon, label, value, hint, tone = "ok", loading, cell = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "group",
		"aria-label": label,
		className: cell ? "min-w-0 px-5 py-4" : "jarvis-stat-tile",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-sm text-muted-foreground",
				children: [icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn(tone === "warn" && "text-foreground", tone === "danger" && "text-destructive", tone === "primary" && "text-primary", tone === "success" && "text-success"),
					children: icon
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: label
				})]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1.5 h-[26px] py-1",
				role: "status",
				"aria-label": `${label}: …`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[18px] w-20 animate-pulse rounded bg-foreground/15" })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("mt-1.5 truncate text-2xl font-semibold tabular-nums", tone === "danger" ? "text-destructive" : "text-foreground-strong"),
				title: typeof value === "string" ? value : void 0,
				children: value
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-0.5 h-[15px] py-[3px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[9px] w-28 animate-pulse rounded bg-foreground/10" })
			}) : hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-0.5 truncate text-sm text-foreground-faint",
				title: typeof hint === "string" ? hint : void 0,
				children: hint
			}) : null
		]
	});
}
export { Table as _, DetailHeader as a, formatShortDate as b, IconButton as c, Panel as d, PanelHeader as f, StatusDot as g, StatTile as h, ClampedText as i, InlineSearch as l, SoftButton as m, BackLink as n, EmptyRow as o, SegmentedFilter as p, Cell as r, FactRows as s, ActionMenu as t, MenuPill as u, TableHead as v, TableRow as y };
