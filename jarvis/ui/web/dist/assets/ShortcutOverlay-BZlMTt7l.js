import { Bc as require_jsx_runtime, Cn as Portal, E as appZoomCaps, Ln as cn, Ni as Keyboard, Sn as Overlay, Tn as Title, bn as Content, g as useAppZoomSettings, oc as useT, si as X, tl as __toESM, tn as useQuickSwitchSettings, wn as Root, xn as Description, y as useAppChordSettings, yn as Close } from "./index-BOzhgzD7.js";
import { h as detectKeyboardPlatform, u as useKeybinds } from "./useHotkey-DslvxXH_.js";
import { i as shortcutsForArea, n as SHORTCUT_AREAS, r as keyLabel } from "./shortcutRegistry-DjNDjw9D.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var APP_ZOOM_SETTING_INTENT = {
	app_zoom_in: "in",
	app_zoom_out: "out",
	app_zoom_reset: "reset"
};
function Cap({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
		className: cn("inline-flex min-w-[1.75rem] items-center justify-center rounded-md border border-border", "bg-muted px-1.5 py-0.5 font-mono text-xs font-medium text-foreground", "shadow-[inset_0_-1px_0_rgba(0,0,0,0.12)]"),
		children
	});
}
function Chord({ keys, isMac }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex items-center gap-1",
		children: keys.map((token, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1",
			children: [i > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-micro text-muted-foreground",
				children: "+"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cap, { children: keyLabel(token, isMac) })]
		}, i))
	});
}
function comboTokens(combo) {
	return combo.split("+").map((t) => t.trim()).filter(Boolean).map((t) => t.length === 1 ? t.toUpperCase() : t[0].toUpperCase() + t.slice(1));
}
function ShortcutRow({ shortcut, isMac }) {
	const t = useT();
	const { config } = useKeybinds();
	const quickSwitch = useQuickSwitchSettings();
	const appZoom = useAppZoomSettings();
	const appChords = useAppChordSettings((s) => s.bindings);
	let chord;
	if (shortcut.kind === "app") {
		const zoomIntent = APP_ZOOM_SETTING_INTENT[shortcut.setting];
		const appChordId = shortcut.setting in appChords ? shortcut.setting : null;
		const on = appChordId ? true : zoomIntent ? appZoom.enabled : quickSwitch.enabled;
		const combo = appChordId ? appChords[appChordId] : zoomIntent ? appZoom.bindings[zoomIntent] : quickSwitch.combo;
		chord = on && combo ? zoomIntent || appChordId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chord, {
			keys: appZoomCaps(combo),
			isMac: false
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chord, {
			keys: comboTokens(combo),
			isMac
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs italic text-muted-foreground",
			children: t(on ? "shortcut_overlay.unassigned" : "shortcut_overlay.off")
		});
	} else {
		const combo = config?.keybinds?.[shortcut.action];
		chord = combo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chord, {
			keys: comboTokens(combo),
			isMac
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs italic text-muted-foreground",
			children: t("shortcut_overlay.unassigned")
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex items-center justify-between gap-4 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "min-w-0 text-xs text-foreground",
			children: t(shortcut.labelKey)
		}), chord]
	});
}
function Section({ area, isMac }) {
	const t = useT();
	const rows = shortcutsForArea(area);
	if (rows.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
		children: t(`shortcut_overlay.area.${area}`)
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "divide-y divide-border/60",
		children: rows.map((shortcut, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortcutRow, {
			shortcut,
			isMac
		}, i))
	})] });
}
function ShortcutOverlay({ open, onOpenChange }) {
	const t = useT();
	const isMac = detectKeyboardPlatform() === "mac";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 z-[80] bg-[#090909]/75 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
			"data-testid": "shortcut-overlay",
			className: cn("fixed left-1/2 top-1/2 z-[90] flex max-h-[min(88dvh,40rem)] w-[min(520px,calc(100vw-2rem))]", "-translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg", "bg-popover shadow-float outline-none", "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 motion-reduce:animate-none"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-start justify-between gap-4 border-b border-border px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, {
								className: "h-4 w-4 text-primary",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
								className: "font-display text-base font-semibold tracking-tight text-foreground",
								children: t("shortcut_overlay.title")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
							className: "text-xs leading-relaxed text-muted-foreground",
							children: t("shortcut_overlay.description")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": t("shortcut_overlay.close"),
							className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								className: "h-4 w-4",
								"aria-hidden": "true"
							})
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-5 py-5 scrollbar-jarvis",
					children: SHORTCUT_AREAS.map((area) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						area,
						isMac
					}, area))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
					className: "border-t border-border px-5 py-3 text-xs text-muted-foreground",
					children: t("shortcut_overlay.footer")
				})
			]
		})] })
	});
}
export { ShortcutOverlay };
