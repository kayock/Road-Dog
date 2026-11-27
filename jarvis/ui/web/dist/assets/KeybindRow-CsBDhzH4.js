import { t as Pencil } from "./pencil-CD-5mlhp.js";
import { Bc as require_jsx_runtime, Xc as require_react, bi as Plus, ln as Button, oc as useT, si as X, tl as __toESM, wc as useEventStore } from "./index-BOzhgzD7.js";
import { _ as mouseButtonCode, a as composeCombo, d as validateCombo, f as ARROW_ROWS, g as mainRows, h as detectKeyboardPlatform, i as comboTokens, m as NAV_ROWS, n as codeToKeyToken, p as MOUSE_CAPS, r as codeToModifierToken, t as chordToCombo, v as mouseButtonToToken } from "./useHotkey-DslvxXH_.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function capToken(cap, platform) {
	if (cap.dead) return null;
	if (cap.token) return cap.token;
	return codeToModifierToken(cap.code, platform) ?? codeToKeyToken(cap.code);
}
function Key({ cap, platform, pressedCodes, selectedTokens, boundTokens, onToggleToken }) {
	const token = capToken(cap, platform);
	const bindable = token !== null;
	const pressed = pressedCodes.has(cap.code);
	const selected = bindable && selectedTokens.has(token);
	const boundLabel = bindable ? boundTokens[token] : void 0;
	const cls = pressed ? "border-border-strong bg-primary text-primary-foreground" : selected ? "bg-secondary text-foreground-strong" : boundLabel ? "bg-secondary text-foreground" : bindable ? "border-input bg-background text-foreground hover:border-border-strong hover:bg-secondary" : "border-transparent bg-muted text-muted-foreground";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		"data-testid": `key-${cap.code}`,
		"aria-label": cap.code,
		"aria-pressed": selected,
		title: boundLabel ? `${cap.label} — ${boundLabel}` : cap.label,
		disabled: !bindable,
		onClick: bindable ? () => onToggleToken(token) : void 0,
		style: {
			flexGrow: cap.width ?? 1,
			flexBasis: 0
		},
		className: `relative flex h-7 min-w-0 items-center justify-center rounded border px-0.5 font-mono text-micro transition-colors ${cls} ${bindable ? "cursor-pointer" : "cursor-default"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: cap.label
		}), boundLabel && !pressed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-foreground" })]
	});
}
function Row({ row, ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex gap-1",
		children: row.map((cap) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, {
			cap,
			...rest
		}, cap.code))
	});
}
function KeyboardMap({ pressedCodes, selectedTokens, boundTokens, platform, onToggleToken, mouseSupported = true, mouseReason }) {
	const t = useT();
	const keyProps = {
		pressedCodes,
		selectedTokens,
		boundTokens,
		platform,
		onToggleToken
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 rounded-md border border-border bg-background p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-w-[280px] flex-1 flex-col gap-1",
				children: (0, import_react.useMemo)(() => mainRows(platform), [platform]).map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					row,
					...keyProps
				}, i))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-1",
						children: NAV_ROWS.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1",
							children: row.map((cap) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, {
									cap,
									...keyProps
								})
							}, cap.code))
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-1",
						children: ARROW_ROWS.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1",
							children: row.map((cap, j) => cap ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, {
									cap,
									...keyProps
								})
							}, cap.code) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10" }, `pad-${j}`))
						}, i))
					}),
					mouseSupported ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1",
						children: MOUSE_CAPS.map((cap) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-[3.25rem]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, {
								cap,
								...keyProps
							})
						}, cap.code))
					}) : mouseReason && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-testid": "mouse-unavailable",
						className: "max-w-[10rem] text-micro text-muted-foreground",
						children: mouseReason
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-micro text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-2.5 w-2.5 rounded-sm bg-secondary" }), t("settings_view.keybinds.keyboard.legend_pressed")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-2.5 w-2.5 rounded-sm bg-secondary" }), t("settings_view.keybinds.keyboard.legend_selected")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-2.5 w-2.5 rounded-full bg-foreground" }), t("settings_view.keybinds.keyboard.legend_bound")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-auto",
					children: t("settings_view.keybinds.keyboard.hint")
				})
			]
		})]
	});
}
var _LOST_KEYUP_MS = 900;
var _NATIVE_HELD_MS = 80;
function useChordCapture(capturing, onEvents) {
	const handlers = (0, import_react.useRef)(onEvents);
	handlers.current = onEvents;
	(0, import_react.useEffect)(() => {
		if (!capturing) return;
		handlers.current.onPressed?.(/* @__PURE__ */ new Set());
		const held = /* @__PURE__ */ new Set();
		const pressed = /* @__PURE__ */ new Set();
		let pending = null;
		let idle;
		function commit() {
			if (pending) handlers.current.onCommit(pending);
		}
		function staleKeysOnly() {
			if (pressed.size === 0) return false;
			for (const code of pressed) {
				if (codeToModifierToken(code) !== null) return false;
				if (code.startsWith("MouseButton")) return false;
			}
			return true;
		}
		function familyOfCode(code) {
			if (code.startsWith("Control")) return "ctrl";
			if (code.startsWith("Alt")) return "alt";
			if (code.startsWith("Shift")) return "shift";
			if (code.startsWith("Meta")) return "meta";
			return null;
		}
		function codesForFamily(family) {
			switch (family) {
				case "ctrl": return ["ControlLeft", "ControlRight"];
				case "alt": return [
					"AltLeft",
					"AltRight",
					"AltGraph"
				];
				case "shift": return ["ShiftLeft", "ShiftRight"];
				case "meta": return ["MetaLeft", "MetaRight"];
			}
		}
		function canonicalCode(family) {
			switch (family) {
				case "ctrl": return "ControlLeft";
				case "alt": return "AltLeft";
				case "shift": return "ShiftLeft";
				case "meta": return "MetaLeft";
			}
		}
		function flagsFromEvent(e) {
			return {
				ctrl: e.ctrlKey,
				alt: e.altKey,
				shift: e.shiftKey,
				meta: e.metaKey
			};
		}
		function dropReleasedModifiers(flags) {
			let changed = false;
			for (const code of [...pressed]) {
				const family = familyOfCode(code);
				if (family === null) continue;
				if (!flags[family]) {
					pressed.delete(code);
					changed = true;
				}
			}
			return changed;
		}
		function ensureFlaggedModifiers(flags) {
			let changed = false;
			for (const family of [
				"ctrl",
				"alt",
				"shift",
				"meta"
			]) {
				if (!flags[family]) continue;
				if (codesForFamily(family).some((c) => pressed.has(c))) continue;
				pressed.add(canonicalCode(family));
				changed = true;
			}
			return changed;
		}
		function previewFromPressed() {
			const next = chordToCombo({
				code: "",
				ctrlKey: codesForFamily("ctrl").some((c) => pressed.has(c)),
				altKey: codesForFamily("alt").some((c) => pressed.has(c)),
				shiftKey: codesForFamily("shift").some((c) => pressed.has(c)),
				metaKey: codesForFamily("meta").some((c) => pressed.has(c))
			}, held);
			if (next) {
				pending = next;
				handlers.current.onPreview(next);
			}
		}
		function finishIfReleased() {
			if (pressed.size === 0 && pending) {
				if (idle) clearTimeout(idle);
				commit();
				return true;
			}
			return false;
		}
		const nativeSeen = /* @__PURE__ */ new Set();
		let nativeUnavailable = false;
		function applyNativeTokens(tokens) {
			const set = new Set(tokens);
			const nativeFlags = {
				ctrl: set.has("ctrl"),
				alt: set.has("alt"),
				shift: set.has("shift"),
				meta: set.has("cmd") || set.has("win") || set.has("command") || set.has("window") || set.has("meta") || set.has("super")
			};
			let changed = false;
			for (const family of [
				"ctrl",
				"alt",
				"shift",
				"meta"
			]) if (nativeFlags[family]) {
				nativeSeen.add(family);
				if (!codesForFamily(family).some((c) => pressed.has(c))) {
					pressed.add(canonicalCode(family));
					changed = true;
				}
			} else if (nativeSeen.has(family)) {
				nativeSeen.delete(family);
				for (const code of codesForFamily(family)) if (pressed.delete(code)) changed = true;
			}
			if (!changed) return;
			handlers.current.onPressed?.(new Set(pressed));
			previewFromPressed();
			finishIfReleased();
		}
		function armRescue() {
			if (idle) clearTimeout(idle);
			idle = setTimeout(() => {
				if (!staleKeysOnly()) return;
				commit();
			}, _LOST_KEYUP_MS);
		}
		function onKeyDown(e) {
			e.preventDefault();
			e.stopPropagation();
			if (e.key === "Escape") {
				if (idle) clearTimeout(idle);
				handlers.current.onCancel();
				return;
			}
			if (e.repeat) {
				armRescue();
				return;
			}
			pressed.add(e.code);
			const flags = flagsFromEvent(e);
			ensureFlaggedModifiers(flags);
			dropReleasedModifiers(flags);
			handlers.current.onPressed?.(new Set(pressed));
			const tok = codeToKeyToken(e.code);
			if (tok) held.add(tok);
			const next = chordToCombo(e, held);
			if (next) {
				pending = next;
				handlers.current.onPreview(next);
			}
			armRescue();
		}
		function onKeyUp(e) {
			e.preventDefault();
			e.stopPropagation();
			pressed.delete(e.code);
			dropReleasedModifiers(flagsFromEvent(e));
			handlers.current.onPressed?.(new Set(pressed));
			if (finishIfReleased()) return;
			armRescue();
		}
		function onWindowBlur() {
			if (idle) clearTimeout(idle);
			commit();
		}
		function syncModifiers(e) {
			if (!dropReleasedModifiers(flagsFromEvent(e))) return;
			handlers.current.onPressed?.(new Set(pressed));
			finishIfReleased();
		}
		function asKeyEventLike(e) {
			return {
				code: "",
				ctrlKey: e.ctrlKey,
				altKey: e.altKey,
				shiftKey: e.shiftKey,
				metaKey: e.metaKey,
				getModifierState: (k) => e.getModifierState(k)
			};
		}
		function onMouseDown(e) {
			const tok = mouseButtonToToken(e.button);
			if (tok === null) return;
			e.preventDefault();
			e.stopPropagation();
			const code = mouseButtonCode(e.button);
			pressed.add(code);
			handlers.current.onPressed?.(new Set(pressed));
			held.add(tok);
			const next = chordToCombo(asKeyEventLike(e), held);
			if (next) {
				pending = next;
				handlers.current.onPreview(next);
			}
			armRescue();
		}
		function onMouseUp(e) {
			if (mouseButtonToToken(e.button) === null) return;
			e.preventDefault();
			e.stopPropagation();
			pressed.delete(mouseButtonCode(e.button));
			handlers.current.onPressed?.(new Set(pressed));
			if (pressed.size === 0 && pending) {
				if (idle) clearTimeout(idle);
				commit();
				return;
			}
			armRescue();
		}
		function onAuxClick(e) {
			if (mouseButtonToToken(e.button) === null) return;
			e.preventDefault();
			e.stopPropagation();
		}
		window.addEventListener("keydown", onKeyDown, true);
		window.addEventListener("keyup", onKeyUp, true);
		window.addEventListener("mousedown", onMouseDown, true);
		window.addEventListener("mouseup", onMouseUp, true);
		window.addEventListener("auxclick", onAuxClick, true);
		window.addEventListener("mousemove", syncModifiers, true);
		window.addEventListener("blur", onWindowBlur);
		async function tickNative() {
			if (nativeUnavailable) return;
			try {
				const res = await fetch("/api/settings/keybinds/held");
				if (!res.ok) return;
				const data = await res.json();
				if (nativeUnavailable) return;
				if (data.available !== true) {
					nativeUnavailable = true;
					return;
				}
				applyNativeTokens(Array.isArray(data.tokens) ? data.tokens : []);
			} catch {}
		}
		const nativeTimer = setInterval(() => {
			tickNative();
		}, _NATIVE_HELD_MS);
		tickNative();
		return () => {
			if (idle) clearTimeout(idle);
			clearInterval(nativeTimer);
			nativeUnavailable = true;
			window.removeEventListener("keydown", onKeyDown, true);
			window.removeEventListener("keyup", onKeyUp, true);
			window.removeEventListener("mousedown", onMouseDown, true);
			window.removeEventListener("mouseup", onMouseUp, true);
			window.removeEventListener("auxclick", onAuxClick, true);
			window.removeEventListener("mousemove", syncModifiers, true);
			window.removeEventListener("blur", onWindowBlur);
		};
	}, [capturing]);
}
var _KB_PLATFORM = detectKeyboardPlatform();
var _CLICK_SETTLE_MS = 1200;
function formatCombo(combo) {
	const labels = {
		ctrl: _KB_PLATFORM === "mac" ? "⌃" : "Ctrl",
		control: _KB_PLATFORM === "mac" ? "⌃" : "Ctrl",
		right_ctrl: _KB_PLATFORM === "mac" ? "⌃" : "Right-Ctrl",
		alt: _KB_PLATFORM === "mac" ? "⌥" : "Alt",
		left_alt: _KB_PLATFORM === "mac" ? "⌥" : "Left-Alt",
		right_alt: _KB_PLATFORM === "mac" ? "⌥" : "AltGr",
		altgr: _KB_PLATFORM === "mac" ? "⌥" : "AltGr",
		shift: "Shift",
		win: _KB_PLATFORM === "mac" ? "⌘" : "Win",
		window: _KB_PLATFORM === "mac" ? "⌘" : "Win",
		super: _KB_PLATFORM === "mac" ? "⌘" : "Win",
		meta: _KB_PLATFORM === "mac" ? "⌘" : "Win",
		cmd: "⌘",
		command: "⌘",
		space: "Space",
		mouse_middle: "Middle Click",
		mouse_x1: "Mouse Back",
		mouse_x2: "Mouse Fwd",
		up: "↑",
		down: "↓",
		left: "←",
		right: "→",
		insert: "Insert",
		delete: "Delete",
		home: "Home",
		end: "End",
		page_up: "PageUp",
		page_down: "PageDown",
		enter: "Enter",
		tab: "Tab",
		backspace: "Backspace",
		add_key: "Num +",
		subtract_key: "Num −",
		multiply_key: "Num *",
		divide_key: "Num /",
		decimal_key: "Num ."
	};
	const numpad = (p) => /^numpad_[0-9]$/.test(p) ? "Num " + p.slice(7) : null;
	return (combo ?? "").split("+").map((p) => labels[p] ?? numpad(p) ?? p.toUpperCase()).join(" + ");
}
const ACTION_LABEL_KEY = {
	call: "settings_view.keybinds.call_label",
	hangup: "settings_view.keybinds.hangup_label",
	dictate: "settings_view.keybinds.dictate_label",
	dictate_toggle: "settings_view.keybinds.dictate_toggle_label",
	paste_last: "settings_view.keybinds.paste_last_label",
	pet_toggle: "settings_view.keybinds.pet_toggle_label"
};
var CAUTION_KEY = {
	modifier_only: "settings_view.keybinds.caution_modifier_only",
	os_shortcut: "settings_view.keybinds.caution_os_shortcut",
	mouse_button: "settings_view.keybinds.caution_os_shortcut",
	overlap: "settings_view.keybinds.caution_overlap",
	solo_typing_key: "settings_view.keybinds.validation.solo_typing_key",
	solo_nav: "settings_view.keybinds.validation.solo_nav"
};
function ComboChips({ combo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: formatCombo(combo).split(" + ").map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [i > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-muted-foreground/50",
		children: "+"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
		className: "rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-micro text-foreground shadow-[inset_0_-1px_0_rgba(0,0,0,0.35)]",
		children: p
	})] }, `${p}-${i}`)) });
}
function validationText(v, t, actionLabel) {
	if (v.status === "error" && v.reason === "collision" && v.conflict) {
		const labelKey = ACTION_LABEL_KEY[v.conflict.action];
		const named = actionLabel?.(v.conflict.action) ?? (labelKey ? t(labelKey) : void 0);
		return t("settings_view.keybinds.validation.collision").replace("{action}", named ?? v.conflict.action).replace("{combo}", formatCombo(v.conflict.combo));
	}
	const cautions = v.cautions ?? [];
	if (cautions.length === 0) return null;
	return [...new Set(cautions.map((c) => t(CAUTION_KEY[c])))].join(" ");
}
function KeybindRow({ action, label, config, loading, onSave, hint, variant = "settings", suggestions, onSaved, actionLabel }) {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const current = config?.keybinds?.[action] ?? "";
	const def = config?.defaults?.[action];
	const [combo, setCombo] = (0, import_react.useState)("");
	const [capturing, setCapturing] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [pressedCodes, setPressedCodes] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	(0, import_react.useEffect)(() => {
		if (config) setCombo(config.keybinds?.[action] ?? "");
	}, [config, action]);
	const boundTokens = (0, import_react.useMemo)(() => {
		const out = {};
		if (!config?.keybinds) return out;
		for (const [act, c] of Object.entries(config.keybinds)) {
			if (act === action) continue;
			const labelKey = ACTION_LABEL_KEY[act];
			const lbl = actionLabel?.(act) ?? (labelKey ? t(labelKey) : act);
			for (const tok of comboTokens(c ?? "")) out[tok] = lbl;
		}
		return out;
	}, [
		config,
		action,
		t,
		actionLabel
	]);
	const otherCombos = (0, import_react.useMemo)(() => {
		const out = {};
		if (!config?.keybinds) return out;
		for (const [act, c] of Object.entries(config.keybinds)) if (act !== action) out[act] = c ?? "";
		return out;
	}, [config, action]);
	const validation = (0, import_react.useMemo)(() => validateCombo(combo, otherCombos), [combo, otherCombos]);
	const validationMsg = validationText(validation, t, actionLabel);
	function onToggleToken(token) {
		setCombo((prev) => {
			const tokens = comboTokens(prev);
			if (tokens.has(token)) tokens.delete(token);
			else tokens.add(token);
			return composeCombo(tokens);
		});
		setSaved(false);
		editVia.current = "click";
		setEdits((n) => n + 1);
	}
	const currentRef = (0, import_react.useRef)(current);
	currentRef.current = current;
	const comboBeforeCapture = (0, import_react.useRef)(combo);
	const [edits, setEdits] = (0, import_react.useState)(0);
	const editVia = (0, import_react.useRef)("chord");
	const savingRef = (0, import_react.useRef)(false);
	const persistRef = (0, import_react.useRef)(async () => {});
	persistRef.current = async (next) => {
		const trimmed = next.trim().toLowerCase();
		if (!trimmed || trimmed === current) return;
		if (validateCombo(trimmed, otherCombos).status === "error") return;
		if (savingRef.current) return;
		savingRef.current = true;
		setSaving(true);
		try {
			setSaved((await onSave(action, trimmed)).restart_required);
			setCapturing(false);
			pushToast("success", t("settings_view.keybinds.saved"));
			await onSaved?.(trimmed);
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			savingRef.current = false;
			setSaving(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (edits === 0) return;
		const delay = editVia.current === "click" ? _CLICK_SETTLE_MS : 0;
		const timer = setTimeout(() => {
			persistRef.current(combo);
		}, delay);
		return () => clearTimeout(timer);
	}, [edits, combo]);
	(0, import_react.useEffect)(() => {
		if (capturing) comboBeforeCapture.current = combo;
	}, [capturing]);
	useChordCapture(capturing, {
		onPreview: (next) => {
			setCombo(next);
			setSaved(false);
		},
		onCommit: (next) => {
			setCombo(next);
			setSaved(false);
			setCapturing(false);
			editVia.current = "chord";
			setEdits((n) => n + 1);
		},
		onCancel: () => {
			setCombo(currentRef.current || comboBeforeCapture.current);
			setCapturing(false);
		},
		onPressed: setPressedCodes
	});
	(0, import_react.useEffect)(() => {
		if (!capturing) setPressedCodes(/* @__PURE__ */ new Set());
	}, [capturing]);
	function assign(next) {
		setCombo(next);
		setSaved(false);
		editVia.current = "chord";
		setEdits((n) => n + 1);
	}
	async function onClearClick() {
		setSaving(true);
		try {
			const res = await onSave(action, "");
			setCombo("");
			setCapturing(false);
			setSaved(res.restart_required);
			pushToast("success", t("settings_view.keybinds.cleared"));
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setSaving(false);
		}
	}
	const showReset = !!def && combo.trim().toLowerCase() !== def;
	const freeSuggestions = (0, import_react.useMemo)(() => {
		if (!suggestions?.length) return [];
		const taken = new Set(Object.values(otherCombos).map((c) => c.trim().toLowerCase()).filter(Boolean));
		return suggestions.map((s) => s.trim().toLowerCase()).filter((s) => s && !taken.has(s) && s !== combo.trim().toLowerCase()).slice(0, 4);
	}, [
		suggestions,
		otherCombos,
		combo
	]);
	const comboField = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		"data-testid": `combo-field-${action}`,
		"data-keybind-recording": capturing ? "true" : void 0,
		onClick: () => setCapturing((c) => !c),
		disabled: loading,
		className: `flex min-h-[34px] flex-wrap items-center gap-1 rounded-md border px-3 py-1.5 text-left text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-border-strong disabled:opacity-50 ${variant === "voice" ? "" : "flex-1"} ${capturing ? "bg-secondary" : "border-input bg-background"}`,
		children: [capturing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "relative mr-1 flex h-2 w-2 shrink-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-secondary" })]
		}), combo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboChips, { combo }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: capturing ? "text-foreground" : "text-muted-foreground",
			children: capturing ? t("settings_view.keybinds.record_prompt") : loading ? "—" : t("settings_view.keybinds.unbound")
		})]
	});
	const holding = capturing && pressedCodes.size > 0;
	const isError = !!validationMsg && validation.status === "error";
	const showValidation = !!validationMsg && (isError || !holding);
	const statusText = showValidation ? validationMsg : holding ? t("settings_view.keybinds.record_prompt_holding") : capturing ? t("settings_view.keybinds.record_prompt_hint") : null;
	const statusLine = statusText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-testid": showValidation ? `keybind-validation-${action}` : void 0,
		className: `mt-2 text-micro ${showValidation ? isError ? "text-destructive" : "text-foreground" : "text-muted-foreground"}`,
		children: statusText
	});
	const keyboard = capturing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyboardMap, {
		pressedCodes,
		selectedTokens: comboTokens(combo),
		boundTokens,
		platform: _KB_PLATFORM,
		onToggleToken,
		mouseSupported: config?.mouse_buttons?.supported ?? true,
		mouseReason: config?.mouse_buttons?.reason
	});
	const restartHint = saved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-2 text-micro text-muted-foreground",
		children: t("settings_view.keybinds.restart_required")
	});
	if (variant === "voice") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-foreground",
						children: label
					}), hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs text-muted-foreground",
						children: hint
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-2",
					children: [
						comboField,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "outline",
							"data-testid": `record-keybind-${action}`,
							"aria-label": capturing ? t("settings_view.keybinds.stop") : t("settings_view.keybinds.record"),
							title: capturing ? t("settings_view.keybinds.stop") : t("settings_view.keybinds.record"),
							onClick: () => setCapturing((c) => !c),
							disabled: loading,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "outline",
							"data-testid": `add-keybind-${action}`,
							"aria-label": t("settings_view.keybinds.keyboard.hint"),
							title: t("settings_view.keybinds.keyboard.hint"),
							onClick: () => setCapturing(true),
							disabled: loading,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "ghost",
							"data-testid": `clear-keybind-${action}`,
							"aria-label": t("settings_view.keybinds.clear"),
							title: t("settings_view.keybinds.clear"),
							onClick: onClearClick,
							disabled: saving || loading || !current,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
						})
					]
				})]
			}),
			freeSuggestions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-micro text-muted-foreground",
					children: t("voice.shortcuts.suggestions_title")
				}), freeSuggestions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"data-testid": `suggestion-${action}-${s}`,
					onClick: () => assign(s),
					className: "rounded-full border border-border bg-background px-2 py-0.5 font-mono text-micro text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground",
					children: formatCombo(s)
				}, s))]
			}),
			statusLine,
			showReset && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap items-center gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-micro text-muted-foreground underline hover:text-foreground",
					onClick: () => {
						if (def) assign(def);
					},
					children: t("settings_view.keybinds.reset")
				})
			}),
			keyboard,
			restartHint
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-background p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-semibold text-foreground",
					children: label
				}), showReset && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-micro text-muted-foreground underline hover:text-foreground",
					onClick: () => {
						if (def) assign(def);
					},
					children: t("settings_view.keybinds.reset")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex items-center gap-2",
				children: [
					comboField,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => setCapturing((c) => !c),
						disabled: loading,
						children: capturing ? t("settings_view.keybinds.stop") : t("settings_view.keybinds.record")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "ghost",
						"data-testid": `clear-keybind-${action}`,
						"aria-label": t("settings_view.keybinds.clear"),
						title: t("settings_view.keybinds.clear"),
						onClick: onClearClick,
						disabled: saving || loading || !current,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
					})
				]
			}),
			statusLine,
			keyboard,
			restartHint
		]
	});
}
export { validationText as a, formatCombo as i, ComboChips as n, useChordCapture as o, KeybindRow as r, ACTION_LABEL_KEY as t };
