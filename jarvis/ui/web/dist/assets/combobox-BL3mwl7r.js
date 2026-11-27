import { t as Check } from "./check-vbwKkbPq.js";
import { t as ChevronRight } from "./chevron-right-BjVJ-R2c.js";
import { Bc as require_jsx_runtime, Ln as cn, Xc as require_react, Yc as require_react_dom, gi as Search, qi as ChevronDown, tl as __toESM } from "./index-BOzhgzD7.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_react_dom = require_react_dom();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var MAX_PANEL_HEIGHT = 340;
var MIN_PANEL_WIDTH = 288;
var VIEWPORT_MARGIN = 8;
function isComboboxPanelEvent(event) {
	const node = event.detail?.originalEvent?.target ?? event.target;
	return node instanceof Element && node.closest(`[data-combobox-panel]`) !== null;
}
function panelHost(trigger) {
	return trigger?.closest("[role=\"dialog\"]") ?? document.body;
}
function isRootHost(host) {
	return host === document.body || host === document.documentElement;
}
function trapsPanel(host) {
	return !isRootHost(host);
}
function hostBox(host) {
	const rect = host.getBoundingClientRect();
	const left = rect.left + host.clientLeft;
	const top = rect.top + host.clientTop;
	const width = host.clientWidth || rect.width;
	const height = host.clientHeight || rect.height;
	return {
		left,
		top,
		width,
		height,
		right: left + width,
		bottom: top + height
	};
}
function fold(value) {
	return value.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}
function defaultMatches(option, query) {
	const needle = fold(query).trim();
	if (!needle) return true;
	const haystack = fold([
		option.label,
		option.hint,
		option.searchText,
		option.value
	].filter(Boolean).join(" "));
	return needle.split(/\s+/).every((word) => haystack.includes(word));
}
function allOptions(group) {
	return group.more ? [...group.options, ...group.more.options] : group.options;
}
function optionOccurrenceId(listId, groupId, groupIndex, optionIndex, value) {
	return `${listId}-option-${encodeURIComponent(groupId)}-${groupIndex}-${optionIndex}-${encodeURIComponent(value)}`;
}
function Combobox({ value, groups, onChange, ariaLabel, fallbackLabel, searchPlaceholder, emptyLabel, matches = defaultMatches, disabled = false, className, id, ariaDescribedBy, testId, triggerHint = true, iconOnly = false, triggerIcon = true, chevron = true, triggerPrefix, browseGroups, aside, browseHeader, onOpenChange, panelMinWidth = MIN_PANEL_WIDTH }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
	const [position, setPosition] = (0, import_react.useState)(null);
	const [unfolded, setUnfolded] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const triggerRef = (0, import_react.useRef)(null);
	const panelRef = (0, import_react.useRef)(null);
	const searchRef = (0, import_react.useRef)(null);
	const listRef = (0, import_react.useRef)(null);
	const listId = (0, import_react.useId)();
	const searchable = Boolean(searchPlaceholder);
	const selected = (0, import_react.useMemo)(() => {
		for (const group of groups) for (const option of allOptions(group)) if (option.value === value) return option;
		return null;
	}, [groups, value]);
	const visibleGroups = (0, import_react.useMemo)(() => {
		if (!query.trim()) return (browseGroups ?? groups).map((group) => ({
			id: group.id,
			label: group.label,
			options: group.options,
			fold: group.more?.options.length ? {
				label: group.more.label,
				count: group.more.options.length,
				open: unfolded.has(group.id),
				options: group.more.options
			} : void 0
		}));
		const seen = /* @__PURE__ */ new Set();
		const hits = [];
		for (const group of groups) for (const option of allOptions(group)) {
			if (seen.has(option.value)) continue;
			if (!matches(option, query)) continue;
			seen.add(option.value);
			hits.push(option);
		}
		return hits.length ? [{
			id: "results",
			options: hits
		}] : [];
	}, [
		groups,
		browseGroups,
		matches,
		query,
		unfolded
	]);
	const flat = (0, import_react.useMemo)(() => visibleGroups.flatMap((group, groupIndex) => [...group.options.map((option, optionIndex) => ({
		option,
		id: optionOccurrenceId(listId, group.id, groupIndex, optionIndex, option.value)
	})), ...group.fold ? [{
		option: {
			value: `\u0000fold:${group.id}`,
			label: group.fold.label
		},
		id: `${listId}-fold-${encodeURIComponent(group.id)}-${groupIndex}`,
		fold: group.id
	}, ...group.fold.open ? group.fold.options.map((option, optionIndex) => ({
		option,
		id: optionOccurrenceId(listId, `${group.id}-more`, groupIndex, optionIndex, option.value)
	})) : []] : []]), [listId, visibleGroups]);
	const enabled = (0, import_react.useMemo)(() => flat.filter(({ option }) => !option.disabled), [flat]);
	const measure = (0, import_react.useCallback)(() => {
		const trigger = triggerRef.current;
		if (!trigger) return;
		const host = panelHost(trigger);
		const box = trapsPanel(host) ? hostBox(host) : {
			left: 0,
			top: 0,
			right: window.innerWidth,
			bottom: window.innerHeight,
			width: window.innerWidth,
			height: window.innerHeight
		};
		const rect = trigger.getBoundingClientRect();
		const maxWidth = Math.max(MIN_PANEL_WIDTH, box.width - 2 * VIEWPORT_MARGIN);
		const width = Math.min(Math.max(rect.width, panelMinWidth), maxWidth);
		const spaceBelow = box.bottom - rect.bottom - VIEWPORT_MARGIN;
		const spaceAbove = rect.top - box.top - VIEWPORT_MARGIN;
		const flipUp = spaceBelow < 220 && spaceAbove > spaceBelow;
		const maxHeight = Math.max(160, Math.min(MAX_PANEL_HEIGHT, flipUp ? spaceAbove : spaceBelow));
		const leftViewport = Math.min(Math.max(box.left + VIEWPORT_MARGIN, rect.left), Math.max(box.left + VIEWPORT_MARGIN, box.right - width - VIEWPORT_MARGIN));
		setPosition(flipUp ? {
			left: leftViewport - box.left,
			bottom: box.bottom - rect.top + 6,
			width,
			maxHeight
		} : {
			left: leftViewport - box.left,
			top: rect.bottom + 6 - box.top,
			width,
			maxHeight
		});
	}, [panelMinWidth]);
	(0, import_react.useLayoutEffect)(() => {
		if (!open) return;
		measure();
		const onScroll = () => measure();
		window.addEventListener("scroll", onScroll, true);
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll, true);
			window.removeEventListener("resize", onScroll);
		};
	}, [open, measure]);
	const focusOnMount = (0, import_react.useCallback)((node) => {
		node?.focus({ preventScroll: true });
	}, []);
	const attachSearch = (0, import_react.useCallback)((node) => {
		searchRef.current = node;
		focusOnMount(node);
	}, [focusOnMount]);
	const attachList = (0, import_react.useCallback)((node) => {
		listRef.current = node;
		if (!searchable) focusOnMount(node);
	}, [focusOnMount, searchable]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const index = enabled.findIndex(({ option }) => option.value === value);
		setActiveIndex(index >= 0 ? index : 0);
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (!open || !query) return;
		setActiveIndex(0);
	}, [query, open]);
	(0, import_react.useEffect)(() => {
		if (!open || !browseGroups) return;
		const index = enabled.findIndex(({ option }) => option.value === value);
		setActiveIndex(index >= 0 ? index : 0);
	}, [browseGroups]);
	const openChangeRef = (0, import_react.useRef)(onOpenChange);
	openChangeRef.current = onOpenChange;
	const wasOpen = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (wasOpen.current === open) return;
		wasOpen.current = open;
		openChangeRef.current?.(open);
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		(listRef.current?.querySelector("[data-active=\"true\"]"))?.scrollIntoView?.({ block: "nearest" });
	}, [activeIndex, open]);
	const close = (0, import_react.useCallback)((refocus = true) => {
		setOpen(false);
		setQuery("");
		setPosition(null);
		if (refocus) triggerRef.current?.focus();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		function onPointerDown(event) {
			const target = event.target;
			if (panelRef.current?.contains(target)) return;
			if (triggerRef.current?.contains(target)) return;
			close(false);
		}
		document.addEventListener("pointerdown", onPointerDown, true);
		return () => document.removeEventListener("pointerdown", onPointerDown, true);
	}, [open, close]);
	function openPanel() {
		setUnfolded(new Set(groups.filter((group) => group.more?.options.some((option) => option.value === value)).map((group) => group.id)));
		setOpen(true);
	}
	function toggleFold(groupId) {
		setUnfolded((current) => {
			const next = new Set(current);
			if (!next.delete(groupId)) next.add(groupId);
			return next;
		});
	}
	function activate(occurrence) {
		if (occurrence.fold) toggleFold(occurrence.fold);
		else commit(occurrence.option);
	}
	function commit(option) {
		if (option.disabled) return;
		close();
		if (option.value !== value) onChange(option.value);
	}
	function onKeyDown(event) {
		if (event.key === "Escape") {
			event.preventDefault();
			close();
			return;
		}
		if (event.key === "Tab") {
			close(false);
			return;
		}
		if (event.key === "ArrowDown" || event.key === "ArrowUp") {
			event.preventDefault();
			if (!enabled.length) return;
			const step = event.key === "ArrowDown" ? 1 : -1;
			setActiveIndex((index) => (index + step + enabled.length) % enabled.length);
			return;
		}
		if (event.key === "Home" || event.key === "End") {
			event.preventDefault();
			setActiveIndex(event.key === "Home" ? 0 : Math.max(0, enabled.length - 1));
			return;
		}
		if (event.key === "Enter") {
			event.preventDefault();
			const occurrence = enabled[activeIndex];
			if (occurrence) activate(occurrence);
		}
	}
	function onTriggerKeyDown(event) {
		if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			if (!disabled && !open) openPanel();
		}
	}
	const triggerLabel = selected?.triggerLabel ?? selected?.label ?? fallbackLabel ?? value;
	const activeOption = enabled[activeIndex];
	const trapped = trapsPanel(panelHost(triggerRef.current));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		ref: triggerRef,
		id,
		type: "button",
		role: "combobox",
		"aria-haspopup": "listbox",
		"aria-expanded": open,
		"aria-controls": open ? listId : void 0,
		"aria-label": ariaLabel,
		"aria-describedby": ariaDescribedBy,
		disabled,
		"data-testid": testId,
		"data-value": value,
		onClick: () => {
			if (disabled) return;
			if (open) close(false);
			else openPanel();
		},
		onKeyDown: onTriggerKeyDown,
		className: cn("flex w-full items-center gap-2 rounded-md bg-input px-3 py-2 text-left text-sm text-foreground", "transition-colors duration-150 hover:bg-popover focus:outline-none focus-visible:ring-2 focus-visible:ring-border-strong", open && "bg-popover ring-2 ring-border-strong", disabled && "cursor-not-allowed opacity-50", className),
		children: [
			triggerPrefix,
			triggerIcon && selected?.icon,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: iconOnly ? "sr-only" : "min-w-0 flex-1 truncate",
				children: triggerLabel
			}),
			!iconOnly && triggerHint && selected?.hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 truncate text-sm text-muted-foreground",
				children: selected.hint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
				"aria-hidden": "true",
				className: cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", (iconOnly || !chevron) && "hidden", open && "rotate-180 text-foreground")
			})
		]
	}), open && position && (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: panelRef,
		"data-testid": testId ? `${testId}-panel` : void 0,
		"data-combobox-panel": "",
		style: {
			left: position.left,
			top: position.top,
			bottom: position.bottom,
			width: position.width,
			maxHeight: position.maxHeight
		},
		onKeyDown,
		className: cn("pointer-events-auto z-[70] flex overflow-hidden rounded-lg border border-border-strong bg-popover shadow-float", trapped ? "absolute" : "fixed"),
		children: [aside, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col",
			children: [
				searchable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 border-b border-border px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						"aria-hidden": "true",
						className: "h-3.5 w-3.5 shrink-0 text-muted-foreground"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: attachSearch,
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: searchPlaceholder,
						"aria-label": searchPlaceholder,
						"aria-controls": listId,
						"aria-autocomplete": "list",
						"aria-activedescendant": activeOption?.id,
						"data-testid": testId ? `${testId}-search` : void 0,
						className: "w-full bg-transparent text-sm text-foreground outline-none placeholder:text-faint-foreground"
					})]
				}),
				!query.trim() && browseHeader,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: attachList,
					id: listId,
					role: "listbox",
					"aria-label": ariaLabel,
					"aria-activedescendant": !searchable ? activeOption?.id : void 0,
					tabIndex: searchable ? -1 : 0,
					className: "scrollbar-jarvis flex-1 overflow-y-auto p-1",
					children: [flat.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-3 py-6 text-center text-sm text-muted-foreground",
						"data-testid": testId ? `${testId}-empty` : void 0,
						children: emptyLabel ?? "—"
					}), visibleGroups.map((group, groupIndex) => {
						const renderOption = (option, occurrenceId) => {
							const isActive = activeOption?.id === occurrenceId;
							const isSelected = option.value === value;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								id: occurrenceId,
								role: "option",
								"aria-selected": isSelected,
								"aria-disabled": option.disabled || void 0,
								"data-active": isActive,
								"data-value": option.value,
								onPointerMove: () => {
									if (!option.disabled) setActiveIndex(enabled.findIndex(({ id: id$1 }) => id$1 === occurrenceId));
								},
								onClick: () => commit(option),
								className: cn("relative flex cursor-pointer flex-col rounded-md px-3 py-1.5 text-sm transition-colors", isActive && "bg-sheen/[0.08] text-foreground", isSelected && "font-medium text-foreground-strong", option.disabled && "cursor-not-allowed text-faint-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex min-w-0 items-center gap-2",
									children: [
										option.icon,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-0 truncate",
											children: option.label
										}),
										option.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "shrink-0 rounded-md border border-border-strong px-1.5 text-micro font-medium leading-5 text-muted-foreground",
											children: option.badge
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1" }),
										option.hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "shrink-0 truncate text-sm font-normal text-muted-foreground",
											children: option.hint
										}),
										option.trailing,
										isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											"aria-hidden": "true",
											className: "h-3.5 w-3.5 shrink-0 text-foreground-strong"
										})
									]
								}), option.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("mt-0.5 line-clamp-2 text-xs font-normal leading-4 text-muted-foreground", option.icon && "pl-6"),
									children: option.description
								})]
							}, option.value);
						};
						const foldId = `${listId}-fold-${encodeURIComponent(group.id)}-${groupIndex}`;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							group.label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-3 pb-1 pt-2 text-xs font-medium text-muted-foreground",
								children: group.label
							}),
							group.options.map((option, optionIndex) => renderOption(option, optionOccurrenceId(listId, group.id, groupIndex, optionIndex, option.value))),
							group.fold && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								id: foldId,
								role: "option",
								"aria-selected": false,
								"aria-expanded": group.fold.open,
								"data-active": activeOption?.id === foldId,
								"data-testid": testId ? `${testId}-fold` : void 0,
								onPointerMove: () => setActiveIndex(enabled.findIndex(({ id: id$1 }) => id$1 === foldId)),
								onMouseDown: (event) => event.preventDefault(),
								onClick: () => toggleFold(group.id),
								className: cn("flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors", activeOption?.id === foldId && "bg-sheen/[0.08] text-foreground"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-0 flex-1 truncate",
										children: group.fold.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "shrink-0 text-xs",
										children: group.fold.count
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
										"aria-hidden": "true",
										className: cn("h-3.5 w-3.5 shrink-0 transition-transform", group.fold.open && "rotate-90")
									})
								]
							}),
							group.fold?.open && group.fold.options.map((option, optionIndex) => renderOption(option, optionOccurrenceId(listId, `${group.id}-more`, groupIndex, optionIndex, option.value)))
						] }, group.id);
					})]
				})
			]
		})]
	}), panelHost(triggerRef.current))] });
}
export { isComboboxPanelEvent as n, Combobox as t };
