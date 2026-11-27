import { t as Globe } from "./globe-DYHt2aUm.js";
import { t as Pencil } from "./pencil-CD-5mlhp.js";
import { A as appZoomIntentFor, Bc as require_jsx_runtime, C as appChordProblem, D as appZoomChordMatches, E as appZoomCaps, Ei as Minus, Ln as cn, M as nextAppZoom, Ni as Keyboard, O as appZoomComboFromEvent, S as APP_CHORD_IDS, T as APP_ZOOM_INTENTS, Xc as require_react, an as parseChord, b as isTextEntryTarget, bi as Plus, fi as SquareTerminal, g as useAppZoomSettings, h as useAppZoomSupport, in as hostChordPlatform, j as defaultAppZoomBindings, k as appZoomComboProblem, ln as Button, nn as defaultQuickSwitchCombo, oc as useT, on as quickSwitchComboProblem, rn as eventMatchesChord, si as X, ta as AppWindow, tl as __toESM, tn as useQuickSwitchSettings, v as terminalZoomBindings, w as defaultAppChords, wc as useEventStore, x as shouldOpenShortcutOverlay, y as useAppChordSettings } from "./index-BOzhgzD7.js";
import { c as modifierTokens, h as detectKeyboardPlatform, l as normalizedComboTokens, o as eventToCombo, u as useKeybinds } from "./useHotkey-DslvxXH_.js";
import { t as SHORTCUTS } from "./shortcutRegistry-DjNDjw9D.js";
import { t as Switch } from "./switch-hmH-TV55.js";
import { m as fetchAppshotSettings, v as formatAppshotHotkey, w as saveAppshotSettings } from "./appshotApi-Dd25bfhQ.js";
import { i as formatCombo, n as ComboChips, r as KeybindRow, t as ACTION_LABEL_KEY } from "./KeybindRow-CsBDhzH4.js";
import { o as isLeaderChord } from "./ideHotkeys-C2WKjeLJ.js";
import { t as PageHeader } from "./PageHeader-DcwsywY0.js";
import { t as AppshotShortcutField } from "./AppshotShortcutField-huuNLu2A.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var ACTION = "quick_switch";
var PROBLEM_KEY$1 = {
	one_key: "settings_view.quick_switch.problem_one_key",
	typing_key: "settings_view.quick_switch.problem_typing_key",
	os_reserved: "settings_view.quick_switch.problem_os_reserved",
	app_reserved: "settings_view.quick_switch.problem_app_reserved"
};
function chordKey(combo) {
	const { mods, keys } = parseChord(combo);
	return [...[...mods].sort(), ...[...keys].sort()].join("+");
}
function QuickSwitchKeybind({ voiceConfig, part = "all" }) {
	const t = useT();
	const enabled = useQuickSwitchSettings((s) => s.enabled);
	const combo = useQuickSwitchSettings((s) => s.combo);
	const setEnabled = useQuickSwitchSettings((s) => s.setEnabled);
	const setCombo = useQuickSwitchSettings((s) => s.setCombo);
	const mac = hostChordPlatform() === "mac";
	const label = t("settings_view.quick_switch.title");
	const config = {
		keybinds: { [ACTION]: combo },
		defaults: { [ACTION]: defaultQuickSwitchCombo() },
		suggestions: [],
		restart_required: false,
		mouse_buttons: {
			supported: false,
			reason: t("settings_view.quick_switch.keys_only")
		}
	};
	const save = async (_action, hotkey) => {
		if (hotkey) {
			const problem = quickSwitchComboProblem(hotkey);
			if (problem) throw new Error(t(PROBLEM_KEY$1[problem]));
			if (Object.entries(voiceConfig?.keybinds ?? {}).find(([, other]) => other && chordKey(other) === chordKey(hotkey))) throw new Error(t("settings_view.quick_switch.problem_voice_taken"));
		}
		setCombo(hotkey);
		return {
			ok: true,
			action: ACTION,
			hotkey,
			persisted: true,
			restart_required: false
		};
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-stack",
		"data-testid": "quick-switch-settings",
		children: [
			part !== "editor" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base font-medium text-foreground",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-sm text-muted-foreground",
						children: t("settings_view.quick_switch.description")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: enabled,
					onCheckedChange: setEnabled,
					"aria-label": label,
					"data-testid": "quick-switch-enabled"
				})]
			}),
			enabled && part !== "toggle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeybindRow, {
				action: ACTION,
				label: t("settings_view.quick_switch.shortcut_label"),
				config,
				loading: false,
				onSave: save
			}),
			enabled && mac && part !== "toggle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				"data-testid": "quick-switch-mac-note",
				children: t("settings_view.quick_switch.mac_note")
			})
		]
	});
}
var SCOPE = {
	global: {
		icon: Globe,
		labelKey: "shortcuts_view.scope_global"
	},
	window: {
		icon: AppWindow,
		labelKey: "shortcuts_view.scope_window"
	},
	terminal: {
		icon: SquareTerminal,
		labelKey: "shortcuts_view.scope_terminal"
	}
};
function KeyCaps({ caps }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex flex-wrap items-center justify-end gap-1",
		children: caps.map((cap, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [i > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground/50",
			children: "+"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
			className: "rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-micro text-foreground shadow-[inset_0_-1px_0_rgba(0,0,0,0.35)]",
			children: cap
		})] }, `${cap}-${i}`))
	});
}
function NoKeys({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-sm italic text-muted-foreground",
		children
	});
}
function ShortcutListRow({ title, scope, chord, actions, children, testId, recording = false }) {
	const t = useT();
	const { icon: ScopeIcon, labelKey } = SCOPE[scope];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		"data-testid": testId,
		"data-keybind-recording": recording ? "true" : void 0,
		className: "px-5 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-foreground",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 flex items-center gap-1.5 text-micro text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScopeIcon, {
							className: "h-3 w-3 shrink-0",
							"aria-hidden": true
						}), t(labelKey)]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex shrink-0 items-center justify-end",
					children: chord
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-[4.5rem] shrink-0 items-center justify-end gap-0.5",
					children: actions
				})
			]
		}), children]
	});
}
function CharacterChordRow({ title, scope, combo, fallback, off = false, rowTestId, testIdSuffix, problemFor, onChange }) {
	const t = useT();
	const [recording, setRecording] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!recording) return;
		const onKeyDown = (event) => {
			event.preventDefault();
			event.stopPropagation();
			if (event.key === "Escape") {
				setError(null);
				setRecording(false);
				return;
			}
			const next = appZoomComboFromEvent(event);
			if (next === null) return;
			const problem = problemFor(next);
			if (problem) {
				setError(problem);
				return;
			}
			setError(null);
			onChange(next);
			setRecording(false);
		};
		window.addEventListener("keydown", onKeyDown, true);
		return () => window.removeEventListener("keydown", onKeyDown, true);
	}, [
		recording,
		problemFor,
		onChange
	]);
	const finish = (next) => {
		setError(null);
		onChange(next);
		setRecording(false);
	};
	const buttonLabel = recording ? t("settings_view.keybinds.stop") : t("shortcuts_view.edit");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ShortcutListRow, {
		testId: rowTestId,
		recording,
		title,
		scope,
		chord: recording ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm italic text-muted-foreground",
			"aria-live": "polite",
			children: t("settings_view.keybinds.recording")
		}) : off ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoKeys, { children: t("shortcut_overlay.off") }) : combo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyCaps, { caps: appZoomCaps(combo) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoKeys, { children: t("shortcut_overlay.unassigned") }),
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			size: "icon",
			variant: recording ? "secondary" : "ghost",
			className: "h-8 w-8",
			"data-testid": `chord-record-${testIdSuffix}`,
			"aria-label": buttonLabel,
			title: buttonLabel,
			disabled: off,
			onClick: () => {
				setError(null);
				setRecording((r) => !r);
			},
			children: recording ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {})
		}),
		children: [recording && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-micro text-muted-foreground",
				children: t("shortcuts_view.record_hint")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [combo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"data-testid": `chord-clear-${testIdSuffix}`,
					className: "text-micro text-muted-foreground underline hover:text-foreground",
					onClick: () => finish(""),
					children: t("shortcuts_view.remove")
				}), combo !== fallback && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-micro text-muted-foreground underline hover:text-foreground",
					onClick: () => finish(fallback),
					children: t("settings_view.keybinds.reset")
				})]
			})]
		}), error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-destructive",
			role: "alert",
			children: error
		})]
	});
}
var PROBLEM_KEY = {
	typing_key: "settings_view.app_zoom.problem_typing_key",
	os_reserved: "settings_view.app_zoom.problem_os_reserved",
	duplicate: "settings_view.app_zoom.problem_duplicate",
	quick_switch: "settings_view.app_zoom.problem_quick_switch"
};
function sameChord(a, b) {
	const fold = (combo) => {
		const { mods, keys } = parseChord(combo);
		return [...[...mods].sort(), ...keys].join("+");
	};
	return Boolean(a && b) && fold(a) === fold(b);
}
function AppZoomChordRow({ intent, title }) {
	const t = useT();
	const enabled = useAppZoomSettings((s) => s.enabled);
	const bindings = useAppZoomSettings((s) => s.bindings);
	const setBinding = useAppZoomSettings((s) => s.setBinding);
	const quickSwitch = useQuickSwitchSettings();
	const problemFor = (0, import_react.useCallback)((next) => {
		const problem = appZoomComboProblem(next, APP_ZOOM_INTENTS.filter((other) => other !== intent).map((other) => bindings[other]));
		if (problem) return t(PROBLEM_KEY[problem]);
		if (quickSwitch.enabled && sameChord(next, quickSwitch.combo)) return t(PROBLEM_KEY.quick_switch);
		return null;
	}, [
		intent,
		bindings,
		quickSwitch.enabled,
		quickSwitch.combo,
		t
	]);
	const onChange = (0, import_react.useCallback)((combo) => setBinding(intent, combo), [intent, setBinding]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterChordRow, {
		rowTestId: `app-zoom-row-${intent}`,
		testIdSuffix: `app-zoom-${intent}`,
		title,
		scope: "window",
		combo: bindings[intent],
		fallback: defaultAppZoomBindings()[intent],
		off: !enabled,
		problemFor,
		onChange
	});
}
function AppZoomKeybinds() {
	const t = useT();
	const enabled = useAppZoomSettings((s) => s.enabled);
	const level = useAppZoomSettings((s) => s.level);
	const setEnabled = useAppZoomSettings((s) => s.setEnabled);
	const setLevel = useAppZoomSettings((s) => s.setLevel);
	const support = useAppZoomSupport((s) => s.support);
	const label = t("settings_view.app_zoom.title");
	const percent = `${Math.round(level * 100)} %`;
	const stepper = support !== "browser" && support !== "unsupported";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-stack",
		"data-testid": "app-zoom-settings",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base font-medium text-foreground",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-sm text-muted-foreground",
						children: t("settings_view.app_zoom.description")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: enabled,
					onCheckedChange: setEnabled,
					"aria-label": label,
					"data-testid": "app-zoom-enabled"
				})]
			}),
			stepper && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-foreground",
					children: t("settings_view.app_zoom.level_label")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "icon",
							variant: "outline",
							className: "h-8 w-8",
							"aria-label": t("settings_view.app_zoom.out_label"),
							"data-testid": "app-zoom-step-out",
							disabled: level <= nextAppZoom(level, "out"),
							onClick: () => setLevel(nextAppZoom(level, "out")),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-w-16 rounded-md px-2 py-1 text-center font-mono text-sm tabular-nums text-foreground hover:bg-secondary",
							title: t("settings_view.app_zoom.reset_label"),
							"data-testid": "app-zoom-level",
							onClick: () => setLevel(1),
							children: percent
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "icon",
							variant: "outline",
							className: "h-8 w-8",
							"aria-label": t("settings_view.app_zoom.in_label"),
							"data-testid": "app-zoom-step-in",
							disabled: level >= nextAppZoom(level, "in"),
							onClick: () => setLevel(nextAppZoom(level, "in")),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				"data-testid": "app-zoom-note",
				children: support === "browser" ? t("settings_view.app_zoom.note_browser") : support === "unsupported" ? t("settings_view.app_zoom.note_unsupported") : t("settings_view.app_zoom.note_terminal")
			})
		]
	});
}
var ZOOM_INTENTS = [
	"in",
	"out",
	"reset"
];
var KEYPAD_IN = "NumpadAdd";
var KEYPAD_OUT = "NumpadSubtract";
var KEYPAD_RESET = "Numpad0";
function zoomIntentFor(event, { isMac }) {
	if (event.altKey) return null;
	if (isMac ? !event.metaKey || event.ctrlKey : !event.ctrlKey || event.metaKey) return null;
	if (event.key === "+" || event.key === "=" || event.code === KEYPAD_IN) return "in";
	if (event.key === "-" || event.key === "_" || event.code === KEYPAD_OUT) return "out";
	if (event.key === "0" || event.code === KEYPAD_RESET) return "reset";
	return null;
}
function defaultTerminalZoomBindings(isMac) {
	const mod = isMac ? "cmd" : "ctrl";
	return {
		in: `${mod}+plus`,
		out: `${mod}+minus`,
		reset: `${mod}+0`
	};
}
function zoomIntentForBindings(event, { isMac, bindings }) {
	const shipped = defaultTerminalZoomBindings(isMac);
	const legacy = zoomIntentFor(event, { isMac });
	for (const intent of ZOOM_INTENTS) {
		const combo = bindings[intent];
		if (!combo) continue;
		if (combo === shipped[intent] ? legacy === intent : appZoomChordMatches(event, combo)) return intent;
	}
	return null;
}
var APP_ZOOM_LABEL = {
	in: "settings_view.app_zoom.in_label",
	out: "settings_view.app_zoom.out_label",
	reset: "settings_view.app_zoom.reset_label"
};
var APP_ZOOM_SETTING = {
	app_zoom_in: "in",
	app_zoom_out: "out",
	app_zoom_reset: "reset"
};
var ZOOM_LABEL = {
	in: "shortcut_overlay.workspace.zoom_in",
	out: "shortcut_overlay.workspace.zoom_out",
	reset: "shortcut_overlay.workspace.zoom_reset"
};
var LABEL_OVERRIDE = { "shortcut_overlay.workspace.open_overlay": "shortcuts_view.open_overlay" };
var CHORD_PROBLEM_KEY = {
	typing_key: "shortcuts_view.problem_typing_key",
	os_reserved: "shortcuts_view.problem_os_reserved",
	duplicate: "shortcuts_view.problem_duplicate"
};
var APPSHOT_ROWS = [
	{
		field: "hotkey",
		labelKey: "shortcuts_view.appshot_window"
	},
	{
		field: "region_hotkey",
		labelKey: "shortcuts_view.appshot_region"
	},
	{
		field: "recording_hotkey",
		labelKey: "shortcuts_view.appshot_recording"
	}
];
var SCOPE_ORDER = {
	global: 0,
	window: 1,
	terminal: 2
};
function entryRank(entry) {
	if (entry.kind === "appshot") return [SCOPE_ORDER.global, 1];
	return [SCOPE_ORDER[entry.shortcut.scope], 0];
}
var LIST_ENTRIES = [...SHORTCUTS.map((shortcut) => ({
	kind: "registry",
	shortcut
})), ...APPSHOT_ROWS.map((row) => ({
	kind: "appshot",
	...row
}))].map((entry, index) => ({
	entry,
	index
})).sort((a, b) => {
	const [scopeA, rankA] = entryRank(a.entry);
	const [scopeB, rankB] = entryRank(b.entry);
	return scopeA - scopeB || rankA - rankB || a.index - b.index;
}).map(({ entry }) => entry);
function BigCap({ children, ghost = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
		className: cn("inline-flex h-16 min-w-16 items-center justify-center rounded-xl border px-5", "font-sans text-2xl font-semibold tracking-tight", "shadow-[inset_0_-4px_0_hsl(var(--border)),0_1px_2px_rgb(var(--scrim-rgb)/0.12)]", ghost ? "border-dashed border-border text-muted-foreground/60" : "border-border bg-card text-foreground animate-in zoom-in-95 duration-150 motion-reduce:animate-none"),
		children
	});
}
function KeyTester({ config }) {
	const t = useT();
	const isMac = detectKeyboardPlatform() === "mac";
	const quickSwitch = useQuickSwitchSettings();
	const appZoom = useAppZoomSettings();
	const appChords = useAppChordSettings((s) => s.bindings);
	const [pressed, setPressed] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let seq = 0;
		const onKeyDown = (event) => {
			if (event.repeat) return;
			if (!(event.ctrlKey || event.altKey || event.metaKey) && isTextEntryTarget(event.target)) return;
			if (document.querySelector("[data-keybind-recording=\"true\"]")) return;
			const combo = eventToCombo(event);
			const mods = modifierTokens(event);
			const printable = event.key.length === 1 && event.key !== " " ? event.key.toUpperCase() : null;
			const caps = combo ? formatCombo(combo).split(" + ") : [...mods.length ? formatCombo(mods.join("+")).split(" + ") : [], ...printable && ![
				"Control",
				"Alt",
				"Shift",
				"Meta"
			].includes(event.key) ? [printable] : []];
			if (caps.length === 0) return;
			let meaningKey = "";
			const zoom = zoomIntentForBindings(event, {
				isMac,
				bindings: terminalZoomBindings(appChords)
			});
			const appZoomIntent = appZoom.enabled ? appZoomIntentFor(event, appZoom.bindings) : null;
			const overview = shouldOpenShortcutOverlay({
				key: event.key,
				code: event.code,
				shiftKey: event.shiftKey,
				ctrlKey: event.ctrlKey,
				metaKey: event.metaKey,
				altKey: event.altKey,
				defaultPrevented: false,
				target: null
			}, appChords.shortcut_overlay);
			if (quickSwitch.enabled && quickSwitch.combo && eventMatchesChord(event, quickSwitch.combo)) meaningKey = "settings_view.quick_switch.title";
			else if (appZoomIntent) meaningKey = APP_ZOOM_LABEL[appZoomIntent];
			else if (zoom) meaningKey = ZOOM_LABEL[zoom];
			else if (overview) meaningKey = "shortcut_overlay.workspace.open_overlay";
			else if (isLeaderChord(event, appChords.ide_menu)) meaningKey = "shortcut_overlay.workspace.ide_menu";
			else if (combo) {
				const mine = [...normalizedComboTokens(combo)].sort().join("+");
				const hit = Object.entries(config?.keybinds ?? {}).find(([, other]) => other && [...normalizedComboTokens(other)].sort().join("+") === mine);
				if (hit) meaningKey = ACTION_LABEL_KEY[hit[0]] ?? "";
			} else if (!printable) meaningKey = null;
			seq += 1;
			setPressed({
				seq,
				caps,
				meaningKey
			});
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [
		config,
		quickSwitch.enabled,
		quickSwitch.combo,
		appZoom.enabled,
		appZoom.bindings,
		appChords,
		isMac
	]);
	const ghost = quickSwitch.combo ? formatCombo(quickSwitch.combo).split(" + ") : ["Ctrl", "Space"];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-testid": "shortcut-tester",
		className: "relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "pointer-events-none absolute inset-0",
			style: { background: "radial-gradient(60% 80% at 50% 0%, rgb(var(--accent-rgb) / 0.10), transparent 70%)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex flex-col items-center gap-5 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium uppercase tracking-wide text-muted-foreground",
					children: t("shortcuts_view.tester_title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-h-16 flex-wrap items-center justify-center gap-2.5",
					"aria-live": "polite",
					children: (pressed?.caps ?? ghost).map((cap, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2.5",
						children: [i > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xl text-muted-foreground/60",
							children: "+"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BigCap, {
							ghost: !pressed,
							children: cap
						})]
					}, `${pressed?.seq ?? "ghost"}-${i}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-testid": "shortcut-tester-meaning",
					className: cn("inline-flex min-h-8 items-center rounded-full px-4 text-sm font-medium", !pressed || pressed.meaningKey === null ? "text-muted-foreground" : pressed.meaningKey ? "bg-accent text-accent-foreground" : "bg-secondary text-foreground"),
					children: !pressed ? t("shortcuts_view.tester_hint") : pressed.meaningKey === null ? t("shortcuts_view.tester_modifiers") : pressed.meaningKey ? t(pressed.meaningKey) : t("shortcuts_view.tester_free")
				})
			]
		})]
	});
}
function Chips({ combo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex flex-wrap items-center justify-end gap-1",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboChips, { combo })
	});
}
function EditToggle({ open, disabled = false, onToggle, testId }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		size: "icon",
		variant: open ? "secondary" : "ghost",
		className: "h-8 w-8",
		"data-testid": testId,
		"aria-expanded": open,
		"aria-label": t("shortcuts_view.edit"),
		title: t("shortcuts_view.edit"),
		disabled,
		onClick: onToggle,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {})
	});
}
function VoiceKeyRow({ shortcut, keybinds }) {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const [open, setOpen] = (0, import_react.useState)(false);
	const { config, loading, saveKeybind } = keybinds;
	const combo = config?.keybinds?.[shortcut.action] ?? "";
	const pinHoldMode = (0, import_react.useCallback)(async () => {
		try {
			const res = await fetch("/api/dictation/settings", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					mode: "hold",
					persist: true
				})
			});
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
		} catch (e) {
			pushToast("warning", e.message);
		}
	}, [pushToast]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortcutListRow, {
		testId: `shortcut-row-${shortcut.action}`,
		title: t(shortcut.labelKey),
		scope: shortcut.scope,
		chord: !config ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoKeys, { children: "—" }) : combo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, { combo }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoKeys, { children: t("shortcut_overlay.unassigned") }),
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditToggle, {
			open,
			onToggle: () => setOpen((o) => !o),
			testId: `shortcuts-edit-${shortcut.action}`
		}),
		children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeybindRow, {
				action: shortcut.action,
				label: t("shortcuts_view.new_keys"),
				config,
				loading,
				onSave: saveKeybind,
				onSaved: shortcut.action === "dictate" ? pinHoldMode : void 0
			})
		})
	});
}
function QuickSwitchRow({ shortcut, voiceConfig }) {
	const t = useT();
	const enabled = useQuickSwitchSettings((s) => s.enabled);
	const combo = useQuickSwitchSettings((s) => s.combo);
	const [open, setOpen] = (0, import_react.useState)(false);
	const editing = open && enabled;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortcutListRow, {
		testId: "shortcut-row-quick_switch",
		title: t(shortcut.labelKey),
		scope: shortcut.scope,
		chord: !enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoKeys, { children: t("shortcut_overlay.off") }) : combo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyCaps, { caps: formatCombo(combo).split(" + ") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoKeys, { children: t("shortcut_overlay.unassigned") }),
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditToggle, {
			open: editing,
			disabled: !enabled,
			onToggle: () => setOpen((o) => !o),
			testId: "shortcuts-edit-quick_switch"
		}),
		children: editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickSwitchKeybind, {
				voiceConfig,
				part: "editor"
			})
		})
	});
}
function AppChordRow({ shortcut, id }) {
	const t = useT();
	const bindings = useAppChordSettings((s) => s.bindings);
	const setBinding = useAppChordSettings((s) => s.setBinding);
	const appZoom = useAppZoomSettings((s) => s.bindings);
	const quickSwitch = useQuickSwitchSettings();
	const problemFor = (0, import_react.useCallback)((next) => {
		const others = APP_CHORD_IDS.filter((other) => other !== id).map((other) => bindings[other]);
		if (id === "shortcut_overlay" || id === "ide_menu") others.push(...Object.values(appZoom));
		const problem = appChordProblem(id, next, others);
		if (problem) return t(CHORD_PROBLEM_KEY[problem]);
		if (quickSwitch.enabled && sameChord(next, quickSwitch.combo)) return t("settings_view.app_zoom.problem_quick_switch");
		return null;
	}, [
		id,
		bindings,
		appZoom,
		quickSwitch.enabled,
		quickSwitch.combo,
		t
	]);
	const onChange = (0, import_react.useCallback)((combo) => setBinding(id, combo), [id, setBinding]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterChordRow, {
		rowTestId: `shortcut-row-${id}`,
		testIdSuffix: id,
		title: t(LABEL_OVERRIDE[shortcut.labelKey] ?? shortcut.labelKey),
		scope: shortcut.scope,
		combo: bindings[id],
		fallback: defaultAppChords()[id],
		problemFor,
		onChange
	});
}
function AppshotRow({ field, labelKey, settings, onSaved, isMac }) {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [status, setStatus] = (0, import_react.useState)(null);
	const hotkey = settings?.[field] ?? "";
	const save = async (next) => {
		try {
			onSaved(await saveAppshotSettings({ [field]: next }));
		} catch (error) {
			pushToast("error", t("appshots.save_error").replace("{0}", error.message));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortcutListRow, {
		testId: `shortcut-row-appshot-${field}`,
		title: t(labelKey),
		scope: "global",
		chord: !settings ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoKeys, { children: "—" }) : !settings.enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoKeys, { children: t("shortcut_overlay.off") }) : hotkey ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyCaps, { caps: formatAppshotHotkey(hotkey, isMac).split(" + ") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoKeys, { children: t("shortcut_overlay.unassigned") }),
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditToggle, {
			open,
			disabled: !settings,
			onToggle: () => setOpen((o) => !o),
			testId: `shortcuts-edit-appshot-${field}`
		}),
		children: open && settings && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex flex-wrap items-center gap-3 rounded-md border border-border bg-background p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppshotShortcutField, {
				value: hotkey,
				isMac,
				disabled: false,
				testId: `shortcuts-appshot-field-${field}`,
				label: t(labelKey),
				className: "w-44",
				onSave: save,
				onStatus: setStatus
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "min-w-0 flex-1 text-micro text-muted-foreground",
				children: status ?? t("shortcuts_view.appshot_record_hint")
			})]
		})
	});
}
function ShortcutList({ keybinds }) {
	const t = useT();
	const isMac = detectKeyboardPlatform() === "mac";
	const [appshots, setAppshots] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		let alive = true;
		fetchAppshotSettings().then((settings) => {
			if (alive) setAppshots(settings);
		}).catch((error) => {
			console.warn("[shortcuts] appshot settings unavailable", error);
			if (alive) setAppshots(null);
		});
		return () => {
			alive = false;
		};
	}, []);
	const rows = LIST_ENTRIES.map((entry) => {
		if (entry.kind === "appshot") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppshotRow, {
			field: entry.field,
			labelKey: entry.labelKey,
			settings: appshots,
			onSaved: setAppshots,
			isMac
		}, `appshot-${entry.field}`);
		const { shortcut } = entry;
		if (shortcut.kind === "rebindable") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceKeyRow, {
			shortcut,
			keybinds
		}, shortcut.labelKey);
		if (shortcut.setting === "quick_switch") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickSwitchRow, {
			shortcut,
			voiceConfig: keybinds.config
		}, shortcut.labelKey);
		const zoomIntent = APP_ZOOM_SETTING[shortcut.setting];
		if (zoomIntent) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppZoomChordRow, {
			intent: zoomIntent,
			title: t(shortcut.labelKey)
		}, shortcut.labelKey);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppChordRow, {
			shortcut,
			id: shortcut.setting
		}, shortcut.labelKey);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-testid": "shortcuts-list",
		className: "rounded-xl border border-border bg-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-4 border-b border-border px-5 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold text-foreground",
					children: t("shortcuts_view.list_title")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-micro tabular-nums text-muted-foreground",
					"data-testid": "shortcuts-count",
					children: t("shortcuts_view.list_count").replace("{count}", String(rows.length))
				})]
			}),
			keybinds.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-5 pt-3 text-sm text-destructive",
				children: keybinds.error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border",
				children: rows
			})
		]
	});
}
function OptionsCard({ voiceConfig }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-testid": "shortcuts-options",
		className: "rounded-xl border border-border bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-border px-5 py-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold text-foreground",
				children: t("shortcuts_view.options_title")
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "divide-y divide-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-5 py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickSwitchKeybind, {
					voiceConfig,
					part: "toggle"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-5 py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppZoomKeybinds, {})
			})]
		})]
	});
}
function ShortcutsView() {
	const t = useT();
	const keybinds = useKeybinds();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-testid": "shortcuts-view",
		className: "flex h-full flex-col overflow-y-auto bg-background px-8 pb-10 scrollbar-jarvis",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, {}),
				title: t("shortcuts_view.title"),
				description: t("shortcuts_view.description")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyTester, { config: keybinds.config }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortcutList, { keybinds }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionsCard, { voiceConfig: keybinds.config })
				]
			})]
		})
	});
}
export { ShortcutsView };
