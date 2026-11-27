import { t as Monitor } from "./monitor-o-ftCNdT.js";
import { t as PawPrint } from "./paw-print-2IImm041.js";
import { $s as translate, Aa as useTheme, Bc as require_jsx_runtime, Gs as fill, Js as hydrateUiLanguage, Ks as hydrateReplyLanguage, Ln as cn, Lr as useVoiceMode, Ni as Keyboard, Q as useWakeWord, Qs as setUiLanguage, Ws as useRestartApp, Xc as require_react, Xs as setReplyLanguage, Z as useLocalSpeechInstall, Zs as setSttLanguage, _c as setAutopilotToastsEnabled, ac as useSttLanguageOptions, d as OVERLAY_STYLES, f as useOverlayStyle, gc as isAutopilotToastsEnabled, ic as useSttLanguage, ji as LoaderCircle, li as TriangleAlert, ln as Button, na as createLucideIcon, nc as useLocaleChunk, oc as useT, qs as hydrateSttLanguage, rc as useReplyLanguage, s as StylePreview, sc as useUiLanguage, t as SETUP_REPLAY_EVENT, tl as __toESM, vi as RotateCcw, wc as useEventStore, yi as RefreshCw, zr as realtimeTransportIssueKey } from "./index-BOzhgzD7.js";
import { u as useKeybinds } from "./useHotkey-DslvxXH_.js";
import "./combobox-BL3mwl7r.js";
import "./select-vogX_D37.js";
import { t as Switch } from "./switch-hmH-TV55.js";
import { n as useAutostart, t as deriveAssistantName } from "./deriveAssistantName-DT_UBkhV.js";
import { r as KeybindRow } from "./KeybindRow-CsBDhzH4.js";
import { t as Input } from "./input-DXuNAC9g.js";
import { r as settingsInputCls } from "./SettingsBlock-Lvn1e90l.js";
import { a as SettingsRow, c as SettingsSelect, d as settingsSelectCls, i as SettingsPage, l as SettingsValue, n as SettingsLinkButton, o as SettingsSection, r as SettingsNote, s as SettingsSegmented, t as SettingsCard, u as settingsRangeCls } from "./SettingsLayout-D5LY8ehs.js";
import { t as LanguageSelect } from "./language-select-DymEvwpT.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Moon = createLucideIcon("Moon", [["path", {
	d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",
	key: "a7tn18"
}]]);
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Sun = createLucideIcon("Sun", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "4",
		key: "4exip2"
	}],
	["path", {
		d: "M12 2v2",
		key: "tus03m"
	}],
	["path", {
		d: "M12 20v2",
		key: "1lh1kg"
	}],
	["path", {
		d: "m4.93 4.93 1.41 1.41",
		key: "149t6j"
	}],
	["path", {
		d: "m17.66 17.66 1.41 1.41",
		key: "ptbguv"
	}],
	["path", {
		d: "M2 12h2",
		key: "1t8f8n"
	}],
	["path", {
		d: "M20 12h2",
		key: "1q8mjw"
	}],
	["path", {
		d: "m6.34 17.66-1.41 1.41",
		key: "1m8zz5"
	}],
	["path", {
		d: "m19.07 4.93-1.41 1.41",
		key: "1shlcs"
	}]
]);
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Zap = createLucideIcon("Zap", [["path", {
	d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
	key: "1xq2db"
}]]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useBarPersistent() {
	const [enabled, setEnabledState] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const refetch = (0, import_react.useCallback)(async () => {
		setError(null);
		try {
			const res = await fetch("/api/settings/bar-persistent");
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const data = await res.json();
			setEnabledState(Boolean(data.enabled));
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		refetch();
	}, [refetch]);
	return {
		enabled,
		loading,
		error,
		refetch,
		setEnabled: (0, import_react.useCallback)(async (next) => {
			const res = await fetch("/api/settings/bar-persistent", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ enabled: next })
			});
			const body = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(body.detail ?? `HTTP ${res.status}`);
			setEnabledState(Boolean(body.enabled));
			return body;
		}, [])
	};
}
function useBarFollowCursor() {
	const [enabled, setEnabledState] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const refetch = (0, import_react.useCallback)(async () => {
		setError(null);
		try {
			const res = await fetch("/api/settings/bar-follow-cursor");
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const data = await res.json();
			setEnabledState(Boolean(data.enabled));
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		refetch();
	}, [refetch]);
	return {
		enabled,
		loading,
		error,
		refetch,
		setEnabled: (0, import_react.useCallback)(async (next) => {
			const res = await fetch("/api/settings/bar-follow-cursor", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ enabled: next })
			});
			const body = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(body.detail ?? `HTTP ${res.status}`);
			setEnabledState(Boolean(body.enabled));
			return body;
		}, [])
	};
}
function useBarSize() {
	const [config, setConfig] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const refetch = (0, import_react.useCallback)(async () => {
		setError(null);
		try {
			const res = await fetch("/api/settings/bar-size");
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			setConfig(await res.json());
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		refetch();
	}, [refetch]);
	return {
		config,
		loading,
		error,
		refetch,
		setScale: (0, import_react.useCallback)(async (scale, persist = true) => {
			const res = await fetch("/api/settings/bar-size", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					scale,
					persist
				})
			});
			const body = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(body.detail ?? `HTTP ${res.status}`);
			const result = body;
			setConfig((prev) => prev ? {
				...prev,
				scale: result.scale
			} : prev);
			return result;
		}, [])
	};
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var LIVE_THROTTLE_MS = 60;
function BarSizeGroup() {
	const t = useT();
	const { config, loading, setScale } = useBarSize();
	const pushToast = useEventStore((s) => s.pushToast);
	const [pct, setLocalPct] = (0, import_react.useState)(135);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const committedRef = (0, import_react.useRef)(135);
	const lastLiveRef = (0, import_react.useRef)(0);
	const pendingRef = (0, import_react.useRef)(null);
	const min = Math.round((config?.min ?? .5) * 100);
	const max = Math.round((config?.max ?? 2) * 100);
	const def = Math.round((config?.default ?? 1.35) * 100);
	(0, import_react.useEffect)(() => {
		if (config) {
			const p = Math.round(config.scale * 100);
			setLocalPct(p);
			committedRef.current = p;
		}
	}, [config]);
	(0, import_react.useEffect)(() => () => {
		if (pendingRef.current) clearTimeout(pendingRef.current);
	}, []);
	function sendLive(nextPct) {
		setScale(nextPct / 100, false).catch(() => {});
	}
	function onDrag(nextPct) {
		setLocalPct(nextPct);
		const now = Date.now();
		if (pendingRef.current) {
			clearTimeout(pendingRef.current);
			pendingRef.current = null;
		}
		if (now - lastLiveRef.current >= LIVE_THROTTLE_MS) {
			lastLiveRef.current = now;
			sendLive(nextPct);
		} else pendingRef.current = setTimeout(() => {
			lastLiveRef.current = Date.now();
			pendingRef.current = null;
			sendLive(nextPct);
		}, LIVE_THROTTLE_MS);
	}
	async function commit(nextPct) {
		if (pendingRef.current) {
			clearTimeout(pendingRef.current);
			pendingRef.current = null;
		}
		if (nextPct === committedRef.current) return;
		committedRef.current = nextPct;
		setSaving(true);
		try {
			const res = await setScale(nextPct / 100, true);
			pushToast(res.applied_live ? "success" : "warning", res.applied_live ? t("settings_view.bar_size.saved_toast").replace("{0}", `${nextPct}%`) : t("settings_view.bar_size.restart_caption"));
		} catch (e) {
			pushToast("error", e.message);
			setLocalPct(committedRef.current);
			sendLive(committedRef.current);
		} finally {
			setSaving(false);
		}
	}
	function onReset() {
		setLocalPct(def);
		sendLive(def);
		commit(def);
	}
	const showReset = pct !== def;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsRow, {
		title: t("settings_view.bar_size.title"),
		description: t("settings_view.bar_size.description"),
		control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsValue, { children: `${pct}%` }),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "range",
			"aria-label": t("settings_view.bar_size.title"),
			min,
			max,
			step: 5,
			value: pct,
			disabled: loading,
			onChange: (e) => onDrag(Number(e.target.value)),
			onMouseUp: () => void commit(pct),
			onKeyUp: () => void commit(pct),
			onTouchEnd: () => void commit(pct),
			className: settingsRangeCls
		}), showReset && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsLinkButton, {
				onClick: onReset,
				disabled: saving,
				children: t("settings_view.bar_size.reset")
			})
		})]
	});
}
function useMuteMusic() {
	const [enabled, setEnabledState] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const refetch = (0, import_react.useCallback)(async () => {
		setError(null);
		try {
			const res = await fetch("/api/settings/mute-music");
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const data = await res.json();
			setEnabledState(Boolean(data.enabled));
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		refetch();
	}, [refetch]);
	return {
		enabled,
		loading,
		error,
		refetch,
		setEnabled: (0, import_react.useCallback)(async (next) => {
			const res = await fetch("/api/settings/mute-music", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ enabled: next })
			});
			const body = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(body.detail ?? `HTTP ${res.status}`);
			setEnabledState(Boolean(body.enabled));
			return body;
		}, [])
	};
}
function useSoundEffects() {
	const [enabled, setEnabledState] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const refetch = (0, import_react.useCallback)(async () => {
		setError(null);
		try {
			const res = await fetch("/api/settings/sound-effects");
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const data = await res.json();
			setEnabledState(Boolean(data.enabled));
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		refetch();
	}, [refetch]);
	return {
		enabled,
		loading,
		error,
		refetch,
		setEnabled: (0, import_react.useCallback)(async (next) => {
			const res = await fetch("/api/settings/sound-effects", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ enabled: next })
			});
			const body = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(body.detail ?? `HTTP ${res.status}`);
			setEnabledState(Boolean(body.enabled));
			return body;
		}, [])
	};
}
function OverlayTaskbarGroup() {
	const t = useT();
	const overlay = useOverlayStyle();
	const isBar = (overlay.config?.style ?? "jarvis_bar") === "jarvis_bar";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsSection, {
		title: t("settings_view.overlay_taskbar_group_title"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverlayStylePanel, { overlay }), isBar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarSizeGroup, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsCard, { children: [
			isBar && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarPersistentRow, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FollowCursorRow, {})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MuteMusicRow, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoundEffectsRow, {})
		] })]
	});
}
function ToggleRow({ title, description, checked, disabled, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
		title,
		description,
		control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked,
			disabled,
			"aria-label": title,
			onCheckedChange: onToggle
		})
	});
}
function BarPersistentRow() {
	const t = useT();
	const { enabled, loading, setEnabled } = useBarPersistent();
	const pushToast = useEventStore((s) => s.pushToast);
	const [saving, setSaving] = (0, import_react.useState)(false);
	async function onToggle(next) {
		setSaving(true);
		try {
			const res = await setEnabled(next);
			pushToast(res.applied_live ? "success" : "warning", res.applied_live ? t("taskbar_view.bar_persistent.saved") : t("taskbar_view.restart_required"));
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
		title: t("taskbar_view.bar_persistent.title"),
		description: t("taskbar_view.bar_persistent.description"),
		checked: enabled ?? true,
		disabled: loading || saving,
		onToggle
	});
}
function FollowCursorRow() {
	const t = useT();
	const { enabled, loading, setEnabled } = useBarFollowCursor();
	const pushToast = useEventStore((s) => s.pushToast);
	const [saving, setSaving] = (0, import_react.useState)(false);
	async function onToggle(next) {
		setSaving(true);
		try {
			const res = await setEnabled(next);
			pushToast(res.applied_live ? "success" : "warning", res.applied_live ? t("taskbar_view.follow_cursor.saved") : t("taskbar_view.restart_required"));
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
		title: t("taskbar_view.follow_cursor.title"),
		description: t("taskbar_view.follow_cursor.description"),
		checked: enabled ?? true,
		disabled: loading || saving,
		onToggle
	});
}
function MuteMusicRow() {
	const t = useT();
	const { enabled, loading, setEnabled } = useMuteMusic();
	const pushToast = useEventStore((s) => s.pushToast);
	const [saving, setSaving] = (0, import_react.useState)(false);
	async function onToggle(next) {
		setSaving(true);
		try {
			await setEnabled(next);
			pushToast("success", next ? t("taskbar_view.mute_music.enabled_toast") : t("taskbar_view.mute_music.disabled_toast"));
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
		title: t("taskbar_view.mute_music.title"),
		description: t("taskbar_view.mute_music.description"),
		checked: enabled ?? false,
		disabled: loading || saving,
		onToggle
	});
}
function SoundEffectsRow() {
	const t = useT();
	const { enabled, loading, setEnabled } = useSoundEffects();
	const pushToast = useEventStore((s) => s.pushToast);
	const [saving, setSaving] = (0, import_react.useState)(false);
	async function onToggle(next) {
		setSaving(true);
		try {
			await setEnabled(next);
			pushToast("success", next ? t("taskbar_view.sound_effects.enabled_toast") : t("taskbar_view.sound_effects.disabled_toast"));
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
		title: t("taskbar_view.sound_effects.title"),
		description: t("taskbar_view.sound_effects.description"),
		checked: enabled ?? true,
		disabled: loading || saving,
		onToggle
	});
}
function OverlayStylePanel({ overlay }) {
	const t = useT();
	const { config, loading, error, saveStyle } = overlay;
	const pushToast = useEventStore((s) => s.pushToast);
	const setActiveSection = useEventStore((s) => s.setActiveSection);
	const [style, setStyle] = (0, import_react.useState)("jarvis_bar");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [needsRestart, setNeedsRestart] = (0, import_react.useState)(false);
	const { restart, restarting, buttonLabel: restartLabel } = useRestartApp();
	(0, import_react.useEffect)(() => {
		if (config) setStyle(config.style);
	}, [config]);
	const options = config?.options ?? OVERLAY_STYLES;
	async function onPick(opt) {
		if (saving) return;
		setStyle(opt);
		setSaving(true);
		setNeedsRestart(false);
		try {
			if ((await saveStyle(opt)).applied_live) pushToast("success", t("settings_view.overlay_style.saved"));
			else {
				setNeedsRestart(true);
				pushToast("warning", t("settings_view.overlay_style.restart_required"));
			}
		} catch (e) {
			setStyle(config?.style ?? "jarvis_bar");
			pushToast("error", e.message);
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsRow, {
		title: t("settings_view.overlay_style.title"),
		description: t("settings_view.overlay_style.description"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] gap-2.5 pt-1",
				children: options.map((opt) => {
					const active = opt === style;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onPick(opt),
						disabled: saving || loading,
						"aria-pressed": active,
						className: cn("flex flex-col items-center gap-2 rounded-md border p-2 transition-colors disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", active ? "border-accent bg-accent-soft" : "border-border hover:border-border-strong hover:bg-secondary"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-16 w-full items-center justify-center overflow-hidden rounded bg-background",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StylePreview, { style: opt })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("text-sm font-medium", active ? "text-foreground-strong" : "text-muted-foreground"),
							children: t(`settings_view.overlay_style.options.${opt}`)
						})]
					}, opt);
				})
			}),
			style === "pet" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"data-testid": "overlay-style-open-pets",
				onClick: () => setActiveSection("pets"),
				className: "inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PawPrint, {
					className: "h-3.5 w-3.5",
					"aria-hidden": true
				}), t("pets.open_settings")]
			}),
			needsRestart && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 rounded-md bg-secondary px-3 py-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-foreground",
					children: t("settings_view.overlay_style.restart_required")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					onClick: () => void restart(),
					disabled: restarting,
					children: restartLabel
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-destructive",
				children: error
			})
		]
	});
}
var UI_OPTIONS = [
	"en",
	"de",
	"es",
	"zh"
];
var REPLY_OPTIONS = [
	"auto",
	"en",
	"de",
	"es"
];
function LanguagesGroup() {
	const t = useT();
	const ui = useUiLanguage();
	const reply = useReplyLanguage();
	const stt = useSttLanguage();
	const sttCodes = useSttLanguageOptions();
	const sttChoices = sttCodes.includes(stt) ? sttCodes : [...sttCodes, stt];
	(0, import_react.useEffect)(() => {
		hydrateReplyLanguage();
		hydrateUiLanguage();
		hydrateSttLanguage();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSection, {
		title: t("settings_view.languages_group_title"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsCard, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
				title: t("languages_view.ui_section"),
				description: t("languages_view.ui_hint"),
				control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSelect, {
					value: ui,
					onValueChange: (code) => setUiLanguage(code),
					ariaLabel: t("languages_view.ui_section"),
					testId: "ui-language",
					options: UI_OPTIONS.map((code) => ({
						value: code,
						label: t(`languages_view.options.${code}.label`)
					}))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
				title: t("languages_view.stt_section"),
				description: t("languages_view.stt_hint"),
				control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSelect, {
					value: stt,
					codes: sttChoices,
					onChange: (code) => setSttLanguage(code),
					autoLabel: t("languages_view.options.auto.label"),
					ariaLabel: t("languages_view.stt_section"),
					testId: "stt-language",
					className: settingsSelectCls
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
				title: t("languages_view.reply_section"),
				description: t("languages_view.reply_hint"),
				control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSelect, {
					value: reply,
					onValueChange: (code) => setReplyLanguage(code),
					ariaLabel: t("languages_view.reply_section"),
					testId: "reply-language",
					options: REPLY_OPTIONS.map((code) => ({
						value: code,
						label: t(`languages_view.options.${code}.label`),
						description: t(`languages_view.reply_options.${code}`)
					}))
				})
			})
		] })
	});
}
function useMusicSettings() {
	const [settings, setSettings] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const refetch = (0, import_react.useCallback)(async () => {
		setError(null);
		try {
			const res = await fetch("/api/settings/music");
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			setSettings(await res.json());
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		refetch();
	}, [refetch]);
	return {
		settings,
		loading,
		error,
		refetch,
		save: (0, import_react.useCallback)(async (patch) => {
			const res = await fetch("/api/settings/music", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(patch)
			});
			const body = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(body.detail ?? `HTTP ${res.status}`);
			setSettings((prev) => prev ? {
				...prev,
				preferred_service: body.preferred_service,
				playback: body.playback
			} : prev);
			return body;
		}, [])
	};
}
const MUSIC_SERVICES = [
	"auto",
	"spotify",
	"youtube_music"
];
const MUSIC_PLAYBACK_MODES = ["background", "browser"];
function MusicGroup() {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const { settings, loading, save } = useMusicSettings();
	const connected = new Set(settings?.connected ?? []);
	const playerAvailable = settings?.background_player_available ?? true;
	const choose = async (patch) => {
		try {
			await save(patch);
			pushToast("success", t("settings_view.music.saved_toast"));
		} catch (e) {
			pushToast("error", e.message);
		}
	};
	const serviceDescription = (service) => {
		if (service === "auto") return t("settings_view.music.service_options.auto");
		const state = connected.has(service) ? t("settings_view.music.connected") : t("settings_view.music.not_connected");
		return `${t(`settings_view.music.service_options.${service}`)} — ${state}`;
	};
	const playbackDescription = (mode) => {
		const base = t(`settings_view.music.playback_options.${mode}`);
		if (mode === "background" && !playerAvailable) return `${base} — ${t("settings_view.music.player_unavailable")}`;
		return base;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSection, {
		title: t("settings_view.music_group_title"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
			title: t("settings_view.music.service_section"),
			description: t("settings_view.music.service_hint"),
			control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSelect, {
				value: settings?.preferred_service ?? "auto",
				disabled: loading,
				testId: "music-service",
				ariaLabel: t("settings_view.music.service_section"),
				onValueChange: (service) => void choose({ preferred_service: service }),
				options: MUSIC_SERVICES.map((service) => ({
					value: service,
					label: t(`settings_view.music.service_labels.${service}`),
					description: serviceDescription(service)
				}))
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
			title: t("settings_view.music.playback_section"),
			description: t("settings_view.music.playback_hint"),
			control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSelect, {
				value: settings?.playback ?? "background",
				disabled: loading,
				testId: "music-playback",
				ariaLabel: t("settings_view.music.playback_section"),
				onValueChange: (mode) => void choose({ playback: mode }),
				options: MUSIC_PLAYBACK_MODES.map((mode) => ({
					value: mode,
					label: t(`settings_view.music.playback_labels.${mode}`),
					description: playbackDescription(mode)
				}))
			})
		})] })
	});
}
function useBackgroundAgents() {
	const [config, setConfig] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const refetch = (0, import_react.useCallback)(async () => {
		setError(null);
		try {
			const res = await fetch("/api/settings/background");
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			setConfig(await res.json());
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		refetch();
	}, [refetch]);
	return {
		config,
		loading,
		error,
		refetch,
		save: (0, import_react.useCallback)(async (patch) => {
			const res = await fetch("/api/settings/background", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(patch)
			});
			const body = await res.json().catch(() => ({}));
			if (!res.ok) {
				const detail = body.detail;
				const message = typeof detail === "string" ? detail : Array.isArray(detail) ? detail.map((item) => item.msg ?? "Invalid setting").join("; ") : `HTTP ${res.status}`;
				throw new Error(message);
			}
			setConfig(body);
			return body;
		}, [])
	};
}
function AppSettingsGroup({ children } = {}) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSection, {
		title: useT()("settings_view.app_settings_group_title"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsCard, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppearanceRow, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutostartRow, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundAgentsRows, {}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TourRow, {})
		] })
	});
}
function TourRow() {
	const t = useT();
	if (!useLocaleChunk("onboarding")) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
		title: t("app_tour.replay_title"),
		description: t("app_tour.replay_body"),
		control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: "secondary",
			onClick: () => window.dispatchEvent(new CustomEvent(SETUP_REPLAY_EVENT)),
			"data-testid": "settings-replay-tour",
			children: t("app_tour.replay")
		})
	});
}
var THEME_OPTIONS = [
	{
		value: "dark",
		icon: Moon,
		labelKey: "settings_view.appearance.dark"
	},
	{
		value: "light",
		icon: Sun,
		labelKey: "settings_view.appearance.light"
	},
	{
		value: "system",
		icon: Monitor,
		labelKey: "settings_view.appearance.system"
	}
];
function AppearanceRow() {
	const t = useT();
	const { preference, theme, setPreference } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
		title: t("settings_view.appearance.title"),
		description: preference === "system" ? `${t("settings_view.appearance.description")} ${t(theme === "dark" ? "settings_view.appearance.system_now_dark" : "settings_view.appearance.system_now_light")}` : t("settings_view.appearance.description"),
		control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSegmented, {
			value: preference,
			onChange: setPreference,
			ariaLabel: t("settings_view.appearance.title"),
			options: THEME_OPTIONS.map(({ value, icon: Icon, labelKey }) => ({
				value,
				label: t(labelKey),
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { "aria-hidden": true })
			}))
		})
	});
}
function AutostartRow() {
	const t = useT();
	const { config, loading, error, setEnabled } = useAutostart();
	const pushToast = useEventStore((s) => s.pushToast);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const supported = config?.supported ?? true;
	const enabled = config?.enabled ?? false;
	const canUpgradeInstantStart = supported && enabled && config?.platform === "win32" && config?.mechanism === "shortcut";
	const instantStartActive = config?.platform === "win32" && config?.mechanism === "scheduled_task";
	async function onToggle(next) {
		setSaving(true);
		try {
			const res = await setEnabled(next);
			if (next && res.supported && res.applied_live) pushToast("success", t("settings_view.autostart.enabled_toast"));
			else if (next && !res.supported) pushToast("warning", res.detail || t("settings_view.autostart.unsupported"));
			else if (!next) pushToast("success", t("settings_view.autostart.disabled_toast"));
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setSaving(false);
		}
	}
	async function onEnableInstantStart() {
		setSaving(true);
		try {
			if ((await setEnabled(true)).mechanism === "scheduled_task") pushToast("success", t("settings_view.autostart.instant_start_enabled_toast"));
			else pushToast("warning", t("settings_view.autostart.instant_start_declined_toast"));
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setSaving(false);
		}
	}
	const hasDetails = Boolean(error || !supported && !loading || instantStartActive || canUpgradeInstantStart || supported && config?.entry_path);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
		title: t("settings_view.autostart.title"),
		description: t("settings_view.autostart.description"),
		control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked: enabled,
			disabled: loading || saving || !supported,
			"aria-label": t("settings_view.autostart.title"),
			onCheckedChange: onToggle
		}),
		children: hasDetails && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-destructive",
				children: error
			}),
			!supported && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-foreground",
				children: config?.detail || t("settings_view.autostart.unsupported")
			}),
			instantStartActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: t("settings_view.autostart.instant_start_active")
			}),
			canUpgradeInstantStart && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsNote, {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 flex-1 text-muted-foreground",
					children: t("settings_view.autostart.instant_start_hint")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					disabled: saving,
					onClick: onEnableInstantStart,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { "aria-hidden": true }), t("settings_view.autostart.enable_instant_start")]
				})]
			}),
			supported && config?.entry_path && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "break-all font-mono text-xs text-muted-foreground",
				children: config.entry_path
			})
		] })
	});
}
var CHANNEL_LABELS = {
	telegram: "Telegram",
	discord: "Discord"
};
function BackgroundAgentsRows() {
	const t = useT();
	const { config, loading, error, save } = useBackgroundAgents();
	const pushToast = useEventStore((s) => s.pushToast);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [serverDraft, setServerDraft] = (0, import_react.useState)(null);
	const restartApp = useRestartApp();
	if (config && !config.supported) return null;
	async function apply(patch) {
		setSaving(true);
		try {
			await save(patch);
			pushToast("success", t("settings_view.background_agents.saved_toast"));
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setSaving(false);
		}
	}
	const keep = config?.keep_agents_running ?? true;
	const work = config?.work;
	const parts = [];
	if (work?.routines) parts.push(fill(t("settings_view.background_agents.routines"), { count: work.routines }));
	for (const channel of work?.channels ?? []) parts.push(CHANNEL_LABELS[channel] ?? channel);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		!config?.persistent_server && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
			title: t("settings_view.background_agents.title"),
			description: t("settings_view.background_agents.description"),
			control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
				checked: keep,
				disabled: loading || saving,
				"aria-label": t("settings_view.background_agents.title"),
				onCheckedChange: (next) => void apply({ keep_agents_running: next })
			}),
			children: (error || config?.running_as_service || config && keep) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-destructive",
					children: error
				}),
				config?.running_as_service && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-foreground",
					children: t(config.running_as_server ? "settings_view.background_agents.server_active" : "settings_view.background_agents.service_active")
				}),
				config && keep && !config.running_as_service && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: parts.length > 0 ? fill(t("settings_view.background_agents.keeps_now"), { what: parts.join(", ") }) : t("settings_view.background_agents.keeps_nothing")
				})
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
			title: t("settings_view.background_agents.login_title"),
			description: t("settings_view.background_agents.login_description"),
			control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
				checked: config?.background_only_at_login ?? false,
				disabled: loading || saving || !config?.autostart_enabled,
				"aria-label": t("settings_view.background_agents.login_title"),
				onCheckedChange: (next) => void apply({ background_only_at_login: next })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsRow, {
			title: t("settings_view.background_agents.server_title"),
			description: t(config && typeof config.persistent_server !== "boolean" ? "settings_view.background_agents.server_backend_update" : "settings_view.background_agents.server_description"),
			control: config && typeof config.persistent_server !== "boolean" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				disabled: restartApp.restarting,
				onClick: () => void restartApp.restart(),
				children: restartApp.buttonLabel
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
				checked: config?.persistent_server ?? false,
				disabled: loading || saving,
				"aria-label": t("settings_view.background_agents.server_title"),
				onCheckedChange: (next) => void apply({ persistent_server: next })
			}),
			children: [config?.running_as_server && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-foreground",
				children: t("settings_view.background_agents.server_active")
			}), config?.persistent_server && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-2",
				onSubmit: (event) => {
					event.preventDefault();
					apply({ server_url: (serverDraft ?? config.server_url).trim() });
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm text-muted-foreground",
						htmlFor: "agent-server-url",
						children: t("settings_view.background_agents.server_url_label")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "agent-server-url",
							type: "url",
							autoComplete: "off",
							value: serverDraft ?? config.server_url ?? "",
							placeholder: "https://jarvis.example.com",
							className: "min-w-56 flex-1",
							onChange: (event) => setServerDraft(event.target.value)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "outline",
							disabled: saving,
							children: t("settings_view.background_agents.server_save")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: t("settings_view.background_agents.server_hint")
					})
				]
			})]
		})
	] });
}
async function jsonFetch(url, init) {
	const res = await fetch(url, {
		credentials: "same-origin",
		headers: init?.body ? { "Content-Type": "application/json" } : void 0,
		...init
	});
	if (!res.ok) {
		const detail = await res.json().catch(() => ({}));
		throw new Error(String(detail.detail ?? res.status));
	}
	return await res.json();
}
function RoadDogGroup() {
	const [endpoints, setEndpoints] = (0, import_react.useState)([]);
	const [newId, setNewId] = (0, import_react.useState)("");
	const [newName, setNewName] = (0, import_react.useState)("");
	const [newUrl, setNewUrl] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [budgets, setBudgets] = (0, import_react.useState)({
		enabled: false,
		scopes: {}
	});
	const [memories, setMemories] = (0, import_react.useState)([]);
	const [memoryQuery, setMemoryQuery] = (0, import_react.useState)("");
	const [pttKey, setPttKey] = (0, import_react.useState)("");
	const [smallModel, setSmallModel] = (0, import_react.useState)(false);
	const [readiness, setReadiness] = (0, import_react.useState)(null);
	const [migrationSource, setMigrationSource] = (0, import_react.useState)("");
	const [migrationNote, setMigrationNote] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const refresh = (0, import_react.useCallback)(async () => {
		try {
			setEndpoints((await jsonFetch("/api/local-endpoints")).endpoints);
			setBudgets(await jsonFetch("/api/costs/budgets"));
			setMemories((await jsonFetch("/api/sam/memories")).memories);
			const cfg = await jsonFetch("/api/settings/app-config");
			setPttKey(cfg.trigger?.push_to_talk_key ?? "");
			setSmallModel(Boolean(cfg.brain?.small_model_mode));
			setReadiness(await jsonFetch("/api/diagnostics/readiness"));
			setError(null);
		} catch (err) {
			setError(String(err));
		}
	}, []);
	(0, import_react.useEffect)(() => {
		refresh();
	}, [refresh]);
	const addEndpoint = async () => {
		setBusy(true);
		try {
			await jsonFetch("/api/local-endpoints", {
				method: "POST",
				body: JSON.stringify({
					id: newId.trim(),
					name: newName.trim() || newId.trim(),
					base_url: newUrl.trim()
				})
			});
			setNewId("");
			setNewName("");
			setNewUrl("");
			await refresh();
		} catch (err) {
			setError(String(err));
		} finally {
			setBusy(false);
		}
	};
	const testEndpoint = async (id) => {
		setBusy(true);
		try {
			await jsonFetch(`/api/local-endpoints/${encodeURIComponent(id)}/test`, { method: "POST" });
			await refresh();
		} catch (err) {
			setError(String(err));
		} finally {
			setBusy(false);
		}
	};
	const selectEndpoint = async (id) => {
		setBusy(true);
		try {
			await jsonFetch(`/api/local-endpoints/${encodeURIComponent(id)}/select`, {
				method: "POST",
				body: JSON.stringify({ target: "sam" })
			});
			await refresh();
		} catch (err) {
			setError(String(err));
		} finally {
			setBusy(false);
		}
	};
	const removeEndpoint = async (id) => {
		setBusy(true);
		try {
			await jsonFetch(`/api/local-endpoints/${encodeURIComponent(id)}`, { method: "DELETE" });
			await refresh();
		} catch (err) {
			setError(String(err));
		} finally {
			setBusy(false);
		}
	};
	const setBudgetCap = async (scope, maxTokens) => {
		setBusy(true);
		try {
			await jsonFetch("/api/costs/budgets", {
				method: "PUT",
				body: JSON.stringify({
					scope,
					max_tokens: maxTokens,
					persist: true
				})
			});
			await refresh();
		} catch (err) {
			setError(String(err));
		} finally {
			setBusy(false);
		}
	};
	const deleteMemory = async (name) => {
		setBusy(true);
		try {
			await jsonFetch(`/api/sam/memories/${encodeURIComponent(name)}`, { method: "DELETE" });
			await refresh();
		} catch (err) {
			setError(String(err));
		} finally {
			setBusy(false);
		}
	};
	const savePttKey = async () => {
		setBusy(true);
		try {
			await jsonFetch("/api/settings/push-to-talk", {
				method: "PUT",
				body: JSON.stringify({
					push_to_talk_key: pttKey.trim(),
					persist: true
				})
			});
			await refresh();
		} catch (err) {
			setError(String(err));
		} finally {
			setBusy(false);
		}
	};
	const toggleSmallModel = async (next) => {
		setBusy(true);
		try {
			await jsonFetch("/api/settings/small-model-mode", {
				method: "PUT",
				body: JSON.stringify({
					enabled: next,
					persist: true
				})
			});
			setSmallModel(next);
		} catch (err) {
			setError(String(err));
		} finally {
			setBusy(false);
		}
	};
	const planMigration = async () => {
		setBusy(true);
		try {
			const plan = await jsonFetch("/api/migration/plan", {
				method: "POST",
				body: JSON.stringify({ source: migrationSource.trim() })
			});
			setMigrationNote(`Plan: ${Object.keys(plan.plan.destinations).join(", ") || "nothing found"}` + (plan.plan.skipped.length ? ` · skipped: ${plan.plan.skipped.join("; ")}` : "") + ` · ${plan.plan.credentials_note}`);
		} catch (err) {
			setMigrationNote(String(err));
		} finally {
			setBusy(false);
		}
	};
	const runMigration = async () => {
		setBusy(true);
		try {
			setMigrationNote(`Imported: ${(await jsonFetch("/api/migration/import", {
				method: "POST",
				body: JSON.stringify({
					source: migrationSource.trim(),
					execute: true
				})
			})).result.copied.join(", ") || "nothing"}`);
			await refresh();
		} catch (err) {
			setMigrationNote(String(err));
		} finally {
			setBusy(false);
		}
	};
	const filtered = memories.filter((m) => !memoryQuery || m.name.toLowerCase().includes(memoryQuery.toLowerCase()));
	const counts = readiness?.counts ?? {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsSection, {
		title: "Road Dog",
		description: "Endpoints, budgets, memory, voice and migration — all local-first.",
		children: [
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-destructive text-sm",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsRow, {
				title: "Local inference endpoints",
				description: "Add, test (zero-spend), select for Sam, or remove.",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "w-full space-y-2",
					children: endpoints.map((ep) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center gap-2 rounded border p-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: ep.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground text-xs",
								children: ep.base_url
							}),
							ep.last_profile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: ep.last_profile.reachable ? "text-success text-xs" : "text-destructive text-xs",
								children: ep.last_profile.reachable ? "reachable" : "unreachable"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ml-auto flex gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										disabled: busy,
										onClick: () => void testEndpoint(ep.id),
										children: "Test"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										disabled: busy,
										onClick: () => void selectEndpoint(ep.id),
										children: "Route Sam here"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "destructive",
										disabled: busy,
										onClick: () => void removeEndpoint(ep.id),
										children: "Remove"
									})
								]
							})
						]
					}, ep.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-full flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "id",
							value: newId,
							onChange: (e) => setNewId(e.target.value),
							className: "w-28"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "name",
							value: newName,
							onChange: (e) => setNewName(e.target.value),
							className: "w-36"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "http://localhost:11434",
							value: newUrl,
							onChange: (e) => setNewUrl(e.target.value),
							className: "w-64"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: busy || !newId.trim() || !newUrl.trim(),
							onClick: () => void addEndpoint(),
							children: "Add endpoint"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
				title: "Enforced budgets",
				description: budgets.enabled ? "Caps are enforced before every dispatch." : "Caps are stored but NOT enforced until a cap is set below.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "w-full space-y-1",
					children: [Object.entries(budgets.scopes).map(([scope, info]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "rounded bg-muted px-1",
								children: scope
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [
									String(info.usage.tokens_measured ?? 0),
									" tok measured · ",
									String(info.usage.requests ?? 0),
									" req"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								disabled: busy,
								onClick: () => void setBudgetCap(scope, 1e5),
								children: "Cap 100k tok"
							})
						]
					}, scope)), !Object.keys(budgets.scopes).length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-muted-foreground text-sm",
						children: "No usage recorded yet."
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsRow, {
				title: "Sam's memories",
				description: "Inspect, search and delete; export via /api/sam/memories/export.",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "filter…",
						value: memoryQuery,
						onChange: (e) => setMemoryQuery(e.target.value),
						className: "w-48"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "w-full space-y-1",
						children: [filtered.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									className: "rounded bg-muted px-1",
									children: m.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: [m.bytes, " B"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "destructive",
									disabled: busy,
									onClick: () => void deleteMemory(m.name),
									children: "Delete"
								})
							]
						}, m.name)), !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-muted-foreground text-sm",
							children: "No memories yet."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "text-xs underline",
						href: "/api/sam/memories/export",
						target: "_blank",
						rel: "noreferrer",
						children: "Export all as JSON"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsRow, {
				title: "Push-to-talk key",
				description: "Hold to talk — independent of the wake word.",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: pttKey,
					onChange: (e) => setPttKey(e.target.value),
					placeholder: "alt+win+space",
					className: "w-48"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: busy,
					onClick: () => void savePttKey(),
					children: "Save"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
				title: "Small-model compatibility",
				description: "Compact tool protocol + validated outputs for small local models. Never applied to hosted providers.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: smallModel,
					onCheckedChange: (v) => void toggleSmallModel(v),
					disabled: busy
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
				title: "Readiness",
				description: "Local-only diagnostics (zero spend).",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						counts.ok ?? 0,
						" ok · ",
						counts.warn ?? 0,
						" warn · ",
						counts.fail ?? 0,
						" fail · ",
						counts.unknown ?? 0,
						" not probed"
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsRow, {
				title: "Import from Personal Jarvis / Hue",
				description: "Explicit + authorized: plan first; credentials only via include_credentials.",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "/home/you/.jarvis",
						value: migrationSource,
						onChange: (e) => setMigrationSource(e.target.value),
						className: "w-64"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						disabled: busy || !migrationSource.trim(),
						onClick: () => void planMigration(),
						children: "Plan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: busy || !migrationSource.trim(),
						onClick: () => void runMigration(),
						children: "Import"
					}),
					migrationNote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "w-full text-xs text-muted-foreground",
						children: migrationNote
					})
				]
			})
		]
	});
}
function RealtimeVoiceGroup() {
	const t = useT();
	const { mode, realtimeAvailable, connecting, requiresWebRtcOffer, transportOfferReady, transportOfferDetail, transportIssue, sessionActive, activeSessionMode, activeSessionProvider, activeSessionModel, transitioning, lastStartError, setMode, isLoading, isSaving } = useVoiceMode();
	const on = mode === "realtime";
	const runtimeDetail = [activeSessionProvider, activeSessionModel].filter(Boolean).join(" · ");
	const runtimeText = connecting ? t("apikeys_view.runtime_connecting") : transitioning ? t("apikeys_view.runtime_switching") : sessionActive && activeSessionMode === "realtime" ? `${t("apikeys_view.runtime_realtime")}${runtimeDetail ? ` · ${runtimeDetail}` : ""}` : sessionActive && activeSessionMode === "pipeline" && on ? t("apikeys_view.runtime_fallback_pipeline") : sessionActive ? t("apikeys_view.runtime_pipeline") : t("apikeys_view.runtime_idle");
	const offerDetail = !(on && requiresWebRtcOffer && transportOfferReady === false) ? "" : transportIssue ? t(realtimeTransportIssueKey(transportIssue)) : transportOfferDetail;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsRow, {
		id: "settings-realtime-voice",
		title: t("settings_view.realtime_voice.title"),
		description: realtimeAvailable ? t("settings_view.realtime_voice.description") : t("settings_view.realtime_voice.unavailable"),
		control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked: on,
			disabled: isLoading || isSaving || !on && !realtimeAvailable,
			"aria-label": t("settings_view.realtime_voice.title"),
			onCheckedChange: (next) => setMode(next ? "realtime" : "pipeline")
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				"aria-live": "polite",
				children: runtimeText
			}),
			on && lastStartError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-testid": "realtime-last-start-error",
				className: "text-sm text-foreground",
				"aria-live": "polite",
				children: t("voice_state.connect_failed").replace("{0}", lastStartError.provider || "?").replace("{1}", lastStartError.message)
			}),
			offerDetail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-testid": "realtime-transport-offer-detail",
				className: "text-sm text-foreground",
				"aria-live": "polite",
				children: offerDetail
			})
		]
	});
}
function useTtsVolume() {
	const [config, setConfig] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const refetch = (0, import_react.useCallback)(async () => {
		setError(null);
		try {
			const res = await fetch("/api/settings/tts-volume");
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			setConfig(await res.json());
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		refetch();
	}, [refetch]);
	return {
		config,
		loading,
		error,
		refetch,
		setVolume: (0, import_react.useCallback)(async (volume) => {
			const res = await fetch("/api/settings/tts-volume", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					volume,
					persist: true
				})
			});
			const body = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(body.detail ?? `HTTP ${res.status}`);
			const result = body;
			setConfig((prev) => prev ? {
				...prev,
				volume: result.volume
			} : prev);
			return result;
		}, [])
	};
}
function VolumeGroup() {
	const t = useT();
	const { config, loading, setVolume } = useTtsVolume();
	const pushToast = useEventStore((s) => s.pushToast);
	const [pct, setLocalPct] = (0, import_react.useState)(100);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const committedRef = (0, import_react.useRef)(100);
	(0, import_react.useEffect)(() => {
		if (config) {
			const p = Math.round(config.volume * 100);
			setLocalPct(p);
			committedRef.current = p;
		}
	}, [config]);
	async function commit(nextPct) {
		if (nextPct === committedRef.current) return;
		committedRef.current = nextPct;
		setSaving(true);
		try {
			const res = await setVolume(nextPct / 100);
			pushToast("success", t("settings_view.volume.saved_toast").replace("{0}", `${Math.round(res.volume * 100)}%`));
			if (res.restart_required) pushToast("warning", t("settings_view.volume.restart_caption"));
		} catch (e) {
			pushToast("error", e.message);
			setLocalPct(committedRef.current);
		} finally {
			setSaving(false);
		}
	}
	function onReset() {
		const def = Math.round((config?.default ?? 1) * 100);
		setLocalPct(def);
		commit(def);
	}
	const showReset = pct !== Math.round((config?.default ?? 1) * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsRow, {
		id: "settings-volume",
		title: t("settings_view.volume.title"),
		description: t("settings_view.volume.description"),
		control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsValue, { children: `${pct}%` }),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "range",
			"aria-label": t("settings_view.volume.title"),
			min: 0,
			max: 100,
			step: 1,
			value: pct,
			disabled: loading || saving,
			onChange: (e) => setLocalPct(Number(e.target.value)),
			onMouseUp: () => void commit(pct),
			onKeyUp: () => void commit(pct),
			onTouchEnd: () => void commit(pct),
			className: settingsRangeCls
		}), showReset && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsLinkButton, {
				onClick: onReset,
				disabled: saving,
				children: t("settings_view.volume.reset")
			})
		})]
	});
}
function useAudioDevices() {
	const [config, setConfig] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const refetch = (0, import_react.useCallback)(async () => {
		setError(null);
		setLoading(true);
		try {
			const res = await fetch("/api/settings/audio-devices");
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			setConfig(await res.json());
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		refetch();
	}, [refetch]);
	(0, import_react.useEffect)(() => {
		const mediaDevices = navigator.mediaDevices;
		if (!mediaDevices?.addEventListener) return;
		const onDeviceChange = () => void refetch();
		mediaDevices.addEventListener("devicechange", onDeviceChange);
		return () => mediaDevices.removeEventListener("devicechange", onDeviceChange);
	}, [refetch]);
	return {
		config,
		loading,
		error,
		refetch,
		select: (0, import_react.useCallback)(async (kind, device) => {
			const body = kind === "output" ? {
				output_device: device,
				persist: true
			} : {
				input_device: device,
				persist: true
			};
			const res = await fetch("/api/settings/audio-devices", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body)
			});
			const payload = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(payload.detail ?? `HTTP ${res.status}`);
			const result = payload;
			setConfig((prev) => prev ? {
				...prev,
				selected_output: result.selected_output,
				selected_input: result.selected_input
			} : prev);
			return result;
		}, [])
	};
}
function AudioDevicesGroup() {
	const t = useT();
	const { config, loading, error, refetch, select } = useAudioDevices();
	const pushToast = useEventStore((s) => s.pushToast);
	const [saving, setSaving] = (0, import_react.useState)(null);
	async function onSelect(kind, device) {
		setSaving(kind);
		try {
			const res = await select(kind, device);
			pushToast("success", t(kind === "output" ? "settings_view.audio_devices.output_saved_toast" : "settings_view.audio_devices.input_saved_toast"));
			if (res.restart_required) pushToast("warning", t("settings_view.audio_devices.restart_caption"));
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setSaving(null);
		}
	}
	const autoValue = config?.auto_value ?? "auto-headset";
	const rescan = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => void refetch(),
		disabled: loading,
		title: t("settings_view.audio_devices.rescan"),
		"aria-label": t("settings_view.audio_devices.rescan"),
		className: "flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-3.5 w-3.5 ${loading ? "animate-spin" : ""}` })
	});
	if (config && !config.available) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
		id: "settings-audio-devices",
		title: t("settings_view.audio_devices.title"),
		description: t("settings_view.audio_devices.none_found"),
		control: rescan,
		children: error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-destructive",
			children: error
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "divide-y divide-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DevicePicker, {
			id: "settings-audio-devices",
			label: t("settings_view.audio_devices.output_label"),
			description: t("settings_view.audio_devices.description"),
			testId: "audio-output-select",
			devices: config?.outputs ?? [],
			selected: config?.selected_output ?? autoValue,
			autoValue,
			autoLabel: t("settings_view.audio_devices.auto_option"),
			defaultSuffix: t("settings_view.audio_devices.default_suffix"),
			disabled: loading || saving !== null,
			onSelect: (device) => void onSelect("output", device),
			trailing: rescan,
			error
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DevicePicker, {
			label: t("settings_view.audio_devices.input_label"),
			testId: "audio-input-select",
			devices: config?.inputs ?? [],
			selected: config?.selected_input ?? autoValue,
			autoValue,
			autoLabel: t("settings_view.audio_devices.auto_option"),
			defaultSuffix: t("settings_view.audio_devices.default_suffix"),
			disabled: loading || saving !== null,
			onSelect: (device) => void onSelect("input", device)
		})]
	});
}
function DevicePicker({ id, label, description, testId, devices, selected, autoValue, autoLabel, defaultSuffix, disabled, onSelect, trailing, error }) {
	const known = devices.some((d) => d.name === selected);
	const showOrphan = selected !== autoValue && !known;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
		id,
		title: label,
		description,
		control: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSelect, {
			testId,
			value: selected,
			onValueChange: onSelect,
			ariaLabel: label,
			disabled,
			className: "max-w-[18rem]",
			options: [
				{
					value: autoValue,
					label: autoLabel
				},
				...devices.map((device) => ({
					value: device.name,
					label: device.is_default ? `${device.name} ${defaultSuffix}` : device.name
				})),
				...showOrphan ? [{
					value: selected,
					label: selected
				}] : []
			]
		}), trailing] }),
		children: error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-destructive",
			children: error
		})
	});
}
function useSystemPrompt() {
	const [config, setConfig] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const refetch = (0, import_react.useCallback)(async () => {
		setError(null);
		try {
			const res = await fetch("/api/settings/system-prompt");
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			setConfig(await res.json());
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		refetch();
	}, [refetch]);
	return {
		config,
		loading,
		error,
		refetch,
		savePrompt: (0, import_react.useCallback)(async (content) => {
			const res = await fetch("/api/settings/system-prompt", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ content })
			});
			const body = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(body.detail ?? `HTTP ${res.status}`);
			const result = body;
			setConfig(result);
			return result;
		}, []),
		resetPrompt: (0, import_react.useCallback)(async () => {
			const res = await fetch("/api/settings/system-prompt", { method: "DELETE" });
			const body = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(body.detail ?? `HTTP ${res.status}`);
			const result = body;
			setConfig(result);
			return result;
		}, [])
	};
}
function SystemPromptGroup() {
	const t = useT();
	const { config, loading, error, savePrompt, resetPrompt } = useSystemPrompt();
	const pushToast = useEventStore((s) => s.pushToast);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [resetting, setResetting] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (config) setDraft(config.content ?? "");
	}, [config]);
	const dirty = !!config && draft !== (config.content ?? "");
	const isCustom = !!config?.is_custom;
	const canReset = isCustom || dirty;
	const trimmedEmpty = draft.trim().length === 0;
	async function onSave() {
		if (trimmedEmpty || !dirty) return;
		setSaving(true);
		try {
			await savePrompt(draft);
			pushToast("success", t("settings_view.system_prompt.saved"));
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setSaving(false);
		}
	}
	async function onReset() {
		setResetting(true);
		try {
			await resetPrompt();
			pushToast("success", t("settings_view.system_prompt.reset_done"));
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setResetting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSection, {
		title: t("settings_view.system_prompt.title"),
		description: t("settings_view.system_prompt.description"),
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `rounded-md border px-2 py-0.5 text-xs font-medium ${isCustom ? "border-accent/40 text-accent" : "border-border text-muted-foreground"}`,
			children: isCustom ? t("settings_view.system_prompt.custom_badge") : t("settings_view.system_prompt.default_badge")
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsCard, {
			className: "p-4",
			children: [
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm text-destructive",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "system-prompt-editor",
					className: "sr-only",
					children: t("settings_view.system_prompt.editor_label")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					id: "system-prompt-editor",
					"data-testid": "system-prompt-editor",
					value: draft,
					onChange: (e) => setDraft(e.target.value),
					disabled: loading,
					spellCheck: false,
					rows: 14,
					placeholder: t("settings_view.system_prompt.placeholder"),
					className: "block w-full resize-y rounded-md border border-border bg-background px-3 py-2.5 font-mono text-sm leading-relaxed text-foreground placeholder:text-foreground-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono tabular-nums",
								children: t("settings_view.system_prompt.chars").replace("{0}", String(draft.length))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								children: " · "
							}),
							trimmedEmpty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground",
								children: t("settings_view.system_prompt.empty_hint")
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("settings_view.system_prompt.applies_next_turn") })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: onReset,
							disabled: resetting || loading || !canReset,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { "aria-hidden": true }), t("settings_view.system_prompt.reset")]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: onSave,
							disabled: saving || loading || !dirty || trimmedEmpty,
							children: saving ? t("settings_view.saving") : t("settings_view.system_prompt.save")
						})]
					})]
				})
			]
		})
	});
}
var SettingsGroupBoundary = class extends import_react.Component {
	state = {
		hasError: false,
		message: "",
		attempt: 0
	};
	static getDerivedStateFromError(error) {
		return {
			hasError: true,
			message: error instanceof Error ? error.message : String(error)
		};
	}
	componentDidCatch(error, info) {
		console.error("Sam settings group crashed", {
			group: this.props.group,
			error,
			componentStack: info.componentStack
		});
	}
	retry = () => {
		this.setState((s) => ({
			hasError: false,
			message: "",
			attempt: s.attempt + 1
		}));
	};
	render() {
		if (!this.state.hasError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: this.props.children }, this.state.attempt);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: this.props.inline ? "px-4 py-3.5" : "rounded-lg border border-destructive/30 bg-card p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-4 w-4 shrink-0 text-destructive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-base font-medium text-foreground",
							children: translate("view_error_boundary.group_title")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-sm text-muted-foreground",
							children: translate("view_error_boundary.group_hint")
						}),
						this.state.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "mt-2 max-h-24 overflow-auto rounded-md border border-border bg-background p-2 text-micro text-muted-foreground",
							children: this.state.message
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "mt-3",
							size: "sm",
							variant: "outline",
							onClick: this.retry,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1.5",
								children: translate("view_error_boundary.group_retry")
							})]
						})
					]
				})]
			})
		});
	}
};
const WAKE_ENGINES = [
	"auto",
	"openwakeword",
	"vosk_kws",
	"stt_match",
	"custom_onnx"
];
const WAKE_ENGINE_I18N_KEY = {
	auto: "settings_view.wake_word.engine_options.auto",
	openwakeword: "settings_view.wake_word.engine_options.openwakeword",
	vosk_kws: "settings_view.wake_word.engine_options.vosk_kws",
	stt_match: "settings_view.wake_word.engine_options.stt_match",
	custom_onnx: "settings_view.wake_word.engine_options.custom_onnx"
};
var _KEYBIND_ROWS = [{
	action: "call",
	labelKey: "settings_view.keybinds.call_label"
}, {
	action: "hangup",
	labelKey: "settings_view.keybinds.hangup_label"
}];
function KeybindsPanel({ bare = false } = {}) {
	const t = useT();
	const { config, loading, error, saveKeybind } = useKeybinds();
	const rows = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-meta text-destructive",
		children: error
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-stack",
		children: _KEYBIND_ROWS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeybindRow, {
			action: row.action,
			label: t(row.labelKey),
			config,
			loading,
			onSave: saveKeybind
		}, row.action))
	})] });
	if (bare) return rows;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-lg border border-border bg-card p-block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, { className: "mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-title font-semibold text-foreground-strong",
						children: t("settings_view.keybinds.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-meta text-muted-foreground",
						children: t("settings_view.keybinds.description")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-block",
						children: rows
					})
				]
			})]
		})
	});
}
var WAKE_LANGUAGES = [
	"en",
	"de",
	"es"
];
function SettingsView({ searchTarget, onSearchTargetHandled } = {}) {
	const t = useT();
	(0, import_react.useEffect)(() => {
		if (!searchTarget) return;
		const target = document.getElementById(`settings-${searchTarget}`);
		if (!target) return;
		target.scrollIntoView?.({
			block: "start",
			behavior: "smooth"
		});
		onSearchTargetHandled?.();
	}, [searchTarget, onSearchTargetHandled]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-testid": "settings-scroll",
		className: "h-full min-h-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPage, {
			title: t("settings_hub.general"),
			children: SECTIONS.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: `settings-${section.id}`,
				"data-settings-section": section.id,
				"data-tour": `settings-${section.id}`,
				className: "scroll-mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsGroupBoundary, {
					group: section.id,
					children: section.render()
				})
			}, section.id))
		})
	});
}
function VoiceSettingsGroup() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSection, {
		title: useT()("settings_view.sections.voice"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsCard, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsGroupBoundary, {
				group: "realtime-voice",
				inline: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RealtimeVoiceGroup, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsGroupBoundary, {
				group: "volume",
				inline: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeGroup, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsGroupBoundary, {
				group: "audio-devices",
				inline: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioDevicesGroup, {})
			})
		] })
	});
}
var SECTIONS = [
	{
		id: "languages",
		render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguagesGroup, {})
	},
	{
		id: "app",
		render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppSettingsGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutopilotToastsRow, {}) })
	},
	{
		id: "voice",
		render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceSettingsGroup, {})
	},
	{
		id: "wake-word",
		render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WakeWordPanel, {})
	},
	{
		id: "system-prompt",
		render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemPromptGroup, {})
	},
	{
		id: "music",
		render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MusicGroup, {})
	},
	{
		id: "overlay-taskbar",
		render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverlayTaskbarGroup, {})
	},
	{
		id: "road-dog",
		render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoadDogGroup, {})
	}
];
function AutopilotToastsRow() {
	const t = useT();
	const [autopilotToasts, setAutopilotToasts] = (0, import_react.useState)(isAutopilotToastsEnabled);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
		id: "settings-more",
		title: t("settings_view.rows.toasts_title"),
		description: t("settings_view.rows.toasts_description"),
		control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked: autopilotToasts,
			"aria-label": t("settings_view.rows.toasts_title"),
			onCheckedChange: (next) => {
				setAutopilotToasts(next);
				setAutopilotToastsEnabled(next);
			}
		})
	});
}
function LanguageDropdown({ value, options, placeholder, labelFor, onChange, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSelect, {
		value,
		onValueChange: (code) => onChange(code),
		ariaLabel: placeholder,
		placeholder,
		disabled,
		options: options.map((code) => ({
			value: code,
			label: labelFor(code)
		}))
	});
}
function WakeWordPanel() {
	const t = useT();
	const { config, loading, error, saveWakeWord, refetch, setWakeLanguage, setWakeActivation } = useWakeWord();
	const pushToast = useEventStore((s) => s.pushToast);
	const { status: installStatus, install } = useLocalSpeechInstall(refetch);
	const [wakeLang, setWakeLangLocal] = (0, import_react.useState)("auto");
	const [phrase, setPhrase] = (0, import_react.useState)("");
	const [engine, setEngine] = (0, import_react.useState)("auto");
	const [customModelPath, setCustomModelPath] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const [selfTest, setSelfTest] = (0, import_react.useState)({
		state: "idle",
		data: null
	});
	const [enabled, setEnabled] = (0, import_react.useState)(false);
	const [togglingActivation, setTogglingActivation] = (0, import_react.useState)(false);
	const [wakeModelDownload, setWakeModelDownload] = (0, import_react.useState)({
		state: "idle",
		message: ""
	});
	(0, import_react.useEffect)(() => {
		if (!config) return;
		setPhrase(config.phrase ?? "");
		setEngine(config.engine || "auto");
		setCustomModelPath(config.custom_model_path ?? "");
		setWakeLangLocal(config.language ?? "auto");
		setEnabled(config.enabled ?? false);
	}, [config]);
	async function onPickWakeLanguage(code) {
		const previous = wakeLang;
		setWakeLangLocal(code);
		try {
			await setWakeLanguage(code);
		} catch (e) {
			setWakeLangLocal(previous);
			pushToast("error", e.message);
		}
	}
	async function onToggleActivation(next) {
		setTogglingActivation(true);
		setEnabled(next);
		try {
			const activation = await setWakeActivation(next);
			pushToast(activation.restart_required ? "info" : "success", t(activation.restart_required ? "settings_view.wake_word.restart_required" : "settings_view.wake_word.activation_saved"));
		} catch (e) {
			setEnabled(!next);
			pushToast("error", e.message);
		} finally {
			setTogglingActivation(false);
		}
	}
	const localWhisperAvailable = config?.local_whisper_available ?? true;
	const trimmedPhrase = phrase.trim();
	const showNeedsWhisperHint = !localWhisperAvailable && trimmedPhrase.length > 0;
	const derivedName = deriveAssistantName(phrase);
	async function onSave() {
		if (!trimmedPhrase) return;
		setSaving(true);
		setResult(null);
		setWakeModelDownload({
			state: "idle",
			message: ""
		});
		try {
			const res = await saveWakeWord({
				phrase: trimmedPhrase,
				engine,
				custom_model_path: engine === "custom_onnx" ? customModelPath.trim() : void 0,
				persist: true
			});
			setResult(res);
			if (res.degraded) pushToast("warning", res.message);
			else pushToast("success", t("settings_view.wake_word.saved"));
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setSaving(false);
		}
	}
	async function onDownloadWakeModel() {
		setWakeModelDownload({
			state: "running",
			message: ""
		});
		try {
			const res = await fetch("/api/settings/wake-word/download-model", { method: "POST" });
			const data = await res.json().catch(() => ({}));
			const backendMessage = typeof data.message === "string" ? data.message : "";
			if (!res.ok) {
				setWakeModelDownload({
					state: "error",
					message: backendMessage || `HTTP ${res.status}`
				});
				return;
			}
			if (data.present) {
				setWakeModelDownload({
					state: "done",
					message: backendMessage
				});
				await onSave();
			} else setWakeModelDownload({
				state: "error",
				message: backendMessage || t("settings_view.wake_word.download_model_error")
			});
		} catch (e) {
			setWakeModelDownload({
				state: "error",
				message: e.message
			});
		}
	}
	async function onSelfTest() {
		setSelfTest({
			state: "running",
			data: null
		});
		try {
			setSelfTest({
				state: "done",
				data: await (await fetch("/api/settings/wake-word/self-test", { method: "POST" })).json().catch(() => null)
			});
		} catch (e) {
			setSelfTest({
				state: "done",
				data: {
					ok: false,
					phrase,
					engine,
					language: wakeLang,
					wake_available: false,
					phrase_in_vocab: null,
					mic_ok: false,
					message: e.message,
					hint: ""
				}
			});
		}
	}
	const showResultNote = selfTest.state === "done" && selfTest.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSection, {
		title: t("settings_view.wake_word.title"),
		description: t("settings_view.wake_word.description"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsCard, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
				title: t("settings_view.wake_word.activation_title"),
				description: t("settings_view.wake_word.activation_hint"),
				control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: enabled,
					disabled: loading || togglingActivation,
					"aria-label": t("settings_view.wake_word.activation_title"),
					onCheckedChange: onToggleActivation
				}),
				children: error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-destructive",
					children: error
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
				title: t("settings_view.wake_word.phrase_label"),
				description: derivedName ? t("settings_view.wake_word.derived_name").replace("{0}", derivedName) : void 0,
				control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: phrase,
					onChange: (e) => setPhrase(e.target.value),
					maxLength: 64,
					placeholder: t("settings_view.wake_word.phrase_placeholder"),
					"aria-label": t("settings_view.wake_word.phrase_label"),
					disabled: loading,
					className: settingsInputCls + " h-8 w-56 disabled:opacity-50"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
				title: t("settings_view.wake_word.language_label"),
				description: t("settings_view.wake_word.language_callout_title"),
				control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageDropdown, {
					value: wakeLang,
					options: WAKE_LANGUAGES,
					placeholder: t("settings_view.wake_word.language_placeholder"),
					labelFor: (code) => t(`languages_view.options.${code}.label`),
					onChange: (code) => void onPickWakeLanguage(code),
					disabled: loading
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: t("settings_view.wake_word.language_hint")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsRow, {
				title: t("settings_view.wake_word.engine_label"),
				control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSelect, {
					value: engine,
					onValueChange: setEngine,
					ariaLabel: t("settings_view.wake_word.engine_label"),
					disabled: loading,
					options: WAKE_ENGINES.map((wakeEngine) => ({
						value: wakeEngine,
						label: t(WAKE_ENGINE_I18N_KEY[wakeEngine])
					}))
				}),
				children: [engine === "custom_onnx" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1.5 block text-sm text-muted-foreground",
						children: t("settings_view.wake_word.custom_model_path_label")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: customModelPath,
						onChange: (e) => setCustomModelPath(e.target.value),
						placeholder: "C:\\\\Users\\\\...\\\\my_wakeword.onnx",
						disabled: loading,
						className: "h-9 w-full rounded-md border border-border-strong bg-input px-3 text-base text-foreground placeholder:text-foreground-faint transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background font-mono text-sm disabled:opacity-50"
					})]
				}), showNeedsWhisperHint && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsNote, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-warning",
						children: t("settings_view.wake_word.needs_whisper_hint")
					}),
					installStatus.state === "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						className: "mt-stack",
						onClick: () => void install(),
						children: t("settings_view.wake_word.enable_local_button")
					}),
					installStatus.state === "running" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-stack flex items-center gap-2 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), t("settings_view.wake_word.enable_local_installing")]
					}),
					installStatus.state === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-stack text-destructive",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("settings_view.wake_word.enable_local_error") }),
							installStatus.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-micro text-muted-foreground",
								children: installStatus.message
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								className: "mt-stack",
								onClick: () => void install(),
								children: t("settings_view.wake_word.enable_local_retry")
							})
						]
					}),
					installStatus.state === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-stack text-success",
						children: t("settings_view.wake_word.enable_local_done")
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 px-4 py-3.5",
				children: [
					showResultNote && selfTest.data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsNote, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: selfTest.data.ok ? "text-success" : "text-destructive",
							children: selfTest.data.message
						}),
						selfTest.data.hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-muted-foreground",
							children: selfTest.data.hint
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-xs text-muted-foreground",
							children: [
								"engine: ",
								selfTest.data.engine,
								" · language: ",
								selfTest.data.language,
								selfTest.data.phrase_in_vocab === false ? " · not in vocabulary" : "",
								selfTest.data.mic_ok ? "" : " · mic quiet"
							]
						})
					] }),
					result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsNote, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: result.degraded ? "text-warning" : "text-success",
							children: result.degraded ? t("settings_view.wake_word.degraded_warning") : result.message
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-xs text-muted-foreground",
							children: ["engine: ", result.resolved_engine]
						}),
						result.degraded && result.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-muted-foreground",
							children: result.message
						}),
						result.restart_required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-muted-foreground",
							children: t("settings_view.wake_word.restart_required")
						}),
						result.degraded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-stack",
							children: [
								wakeModelDownload.state === "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									onClick: () => void onDownloadWakeModel(),
									children: t("settings_view.wake_word.download_model_button")
								}),
								wakeModelDownload.state === "running" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), t("settings_view.wake_word.download_model_downloading")]
								}),
								wakeModelDownload.state === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-success",
									children: wakeModelDownload.message || t("settings_view.wake_word.download_model_done")
								}),
								wakeModelDownload.state === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-destructive",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: wakeModelDownload.message || t("settings_view.wake_word.download_model_error") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										className: "mt-stack",
										onClick: () => void onDownloadWakeModel(),
										children: t("settings_view.wake_word.download_model_retry")
									})]
								})
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => void onSelfTest(),
							disabled: selfTest.state === "running" || loading || !trimmedPhrase,
							children: selfTest.state === "running" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), t("settings_view.wake_word.self_test_running")] }) : t("settings_view.wake_word.self_test_button")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: onSave,
							disabled: saving || loading || !trimmedPhrase,
							children: saving ? t("settings_view.saving") : t("settings_view.wake_word.save")
						})]
					})
				]
			})
		] })
	});
}
export { KeybindsPanel, SettingsView };
