import { Bc as require_jsx_runtime, Ln as cn, Xc as require_react, ji as LoaderCircle, oc as useT, si as X, tl as __toESM } from "./index-BOzhgzD7.js";
import { a as composeCombo, n as codeToKeyToken, r as codeToModifierToken, s as isModifierToken } from "./useHotkey-DslvxXH_.js";
import { v as formatAppshotHotkey } from "./appshotApi-Dd25bfhQ.js";
var GESTURES = [
	[
		"AltLeft",
		"AltRight",
		"alt+alt"
	],
	[
		"ShiftLeft",
		"ShiftRight",
		"shift+shift"
	],
	[
		"ControlLeft",
		"ControlRight",
		"ctrl+ctrl"
	]
];
function chordFromCodes(codes, characterTokens = /* @__PURE__ */ new Map()) {
	const set = new Set(codes);
	set.delete("Escape");
	if (set.delete("AltGraph")) set.add("AltRight");
	if (set.size === 0) return { problem: "empty" };
	if (set.size === 3 && set.has("AltLeft") && set.has("AltRight") && set.has("ControlLeft")) return { combo: "alt+alt" };
	if (set.size === 2) {
		for (const [left, right, gesture] of GESTURES) if (set.has(left) && set.has(right)) return { combo: gesture };
	}
	const tokens = /* @__PURE__ */ new Set();
	let unmapped = false;
	for (const code of set) {
		const token = codeToModifierToken(code) ?? characterTokens.get(code) ?? codeToKeyToken(code);
		if (token) tokens.add(token);
		else unmapped = true;
	}
	if (![...tokens].some((token) => !isModifierToken(token))) return { problem: unmapped ? "unmapped" : "modifier_only" };
	return { combo: composeCombo(tokens) };
}
function gestureFamily(hotkey) {
	if (hotkey === "alt+alt") return "alt";
	if (hotkey === "shift+shift") return "shift";
	if (hotkey === "ctrl+ctrl") return "ctrl";
	return null;
}
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var LOST_KEYUP_MS = 900;
function flagsOf(event) {
	return {
		ctrl: event.ctrlKey,
		alt: event.altKey,
		shift: event.shiftKey,
		meta: event.metaKey
	};
}
function familyOf(code) {
	if (code.startsWith("Control")) return "ctrl";
	if (code.startsWith("Alt")) return "alt";
	if (code.startsWith("Shift")) return "shift";
	if (code.startsWith("Meta")) return "meta";
	return null;
}
function codesFor(family) {
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
function canonical(family) {
	switch (family) {
		case "ctrl": return "ControlLeft";
		case "alt": return "AltLeft";
		case "shift": return "ShiftLeft";
		case "meta": return "MetaLeft";
	}
}
function typedCharacter(event) {
	if (event.key.length !== 1 || event.key < " " || event.key === " ") return null;
	return event.key.toLowerCase();
}
function AppshotShortcutField({ value, isMac, disabled, testId, label, className, onSave, onStatus }) {
	const t = useT();
	const tRef = (0, import_react.useRef)(t);
	tRef.current = t;
	const valueRef = (0, import_react.useRef)(value);
	valueRef.current = value;
	const isMacRef = (0, import_react.useRef)(isMac);
	isMacRef.current = isMac;
	const [recording, setRecording] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [problem, setProblem] = (0, import_react.useState)("");
	const [draft, setDraft] = (0, import_react.useState)("");
	const onSaveRef = (0, import_react.useRef)(onSave);
	onSaveRef.current = onSave;
	const onStatusRef = (0, import_react.useRef)(onStatus);
	onStatusRef.current = onStatus;
	const finishGesture = (0, import_react.useRef)(() => {});
	(0, import_react.useEffect)(() => {
		const text = problem ? problem : recording ? t("appshots.shortcut_recording_hint") : null;
		onStatusRef.current?.(text);
	}, [
		recording,
		problem,
		t
	]);
	const commit = (0, import_react.useCallback)(async (hotkey) => {
		setSaving(true);
		try {
			await onSaveRef.current(hotkey);
			setProblem("");
		} catch (error) {
			setProblem((error instanceof Error ? error.message : "") || tRef.current("appshots.save_error").replace("{0}", ""));
		} finally {
			setSaving(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (!recording) return;
		const pressed = /* @__PURE__ */ new Set();
		const seen = /* @__PURE__ */ new Set();
		const characters = /* @__PURE__ */ new Map();
		let closed = false;
		let idle;
		let nativeUnavailable = false;
		const nativeSeen = /* @__PURE__ */ new Set();
		function preview() {
			const result = chordFromCodes(seen, characters);
			if ("combo" in result) {
				setDraft(result.combo);
				return;
			}
			if (result.problem !== "modifier_only") {
				setDraft("");
				return;
			}
			const tokens = /* @__PURE__ */ new Set();
			for (const code of seen) {
				const token = codeToModifierToken(code);
				if (token) tokens.add(token);
			}
			setDraft(composeCombo(tokens));
		}
		function close(save) {
			if (closed) return;
			closed = true;
			if (idle) clearTimeout(idle);
			const snapshot = new Set(seen);
			const typed = new Map(characters);
			setRecording(false);
			setDraft("");
			if (!save) return;
			const result = chordFromCodes(snapshot, typed);
			if ("combo" in result) {
				setProblem("");
				if (result.combo !== valueRef.current) commit(result.combo);
				return;
			}
			if (result.problem === "modifier_only") setProblem(tRef.current("appshots.shortcut_modifier_only"));
			else if (result.problem === "unmapped") setProblem(tRef.current("appshots.shortcut_unmapped"));
		}
		function endIfReleased() {
			if (closed || pressed.size > 0 || seen.size === 0) return;
			const result = chordFromCodes(seen, characters);
			if ("combo" in result) {
				close(true);
				return;
			}
			if (result.problem === "modifier_only") {
				setProblem(tRef.current("appshots.shortcut_modifier_only"));
				return;
			}
			if (result.problem === "unmapped") {
				setProblem(tRef.current("appshots.shortcut_unmapped"));
				close(false);
			}
		}
		function staleKeysOnly() {
			if (pressed.size === 0) return false;
			for (const code of pressed) if (familyOf(code) !== null) return false;
			return true;
		}
		function armRescue() {
			if (idle) clearTimeout(idle);
			if (!staleKeysOnly()) return;
			idle = setTimeout(() => {
				if (!staleKeysOnly()) return;
				for (const code of [...pressed]) pressed.delete(code);
				endIfReleased();
			}, LOST_KEYUP_MS);
		}
		function dropReleased(flags, exceptCode) {
			let changed = false;
			for (const code of [...pressed]) {
				if (code === exceptCode) continue;
				const family = familyOf(code);
				if (family !== null && !flags[family]) {
					pressed.delete(code);
					changed = true;
				}
			}
			return changed;
		}
		function ensureFlagged(flags) {
			for (const family of [
				"ctrl",
				"alt",
				"shift",
				"meta"
			]) {
				if (!flags[family]) continue;
				if (codesFor(family).some((code$1) => pressed.has(code$1) || seen.has(code$1))) continue;
				const code = canonical(family);
				pressed.add(code);
				seen.add(code);
			}
		}
		function onKeyDown(event) {
			event.preventDefault();
			event.stopPropagation();
			if (event.code === "Escape") {
				close(false);
				return;
			}
			if (event.repeat) {
				armRescue();
				return;
			}
			pressed.add(event.code);
			seen.add(event.code);
			if (!isMacRef.current) {
				const typed = typedCharacter(event);
				if (typed) characters.set(event.code, typed);
			}
			const flags = flagsOf(event);
			ensureFlagged(flags);
			dropReleased(flags, event.code);
			setProblem("");
			preview();
			armRescue();
		}
		function onKeyUp(event) {
			event.preventDefault();
			event.stopPropagation();
			pressed.delete(event.code);
			dropReleased(flagsOf(event), event.code);
			preview();
			endIfReleased();
			if (!closed && pressed.size > 0) armRescue();
		}
		function onMouseMove(event) {
			if (!dropReleased(flagsOf(event))) return;
			preview();
			endIfReleased();
			if (!closed && pressed.size > 0) armRescue();
		}
		function onBlur() {
			if ("combo" in chordFromCodes(seen, characters)) close(true);
			else close(false);
		}
		finishGesture.current = () => {
			close("combo" in chordFromCodes(seen, characters));
		};
		function applyNative(tokens) {
			const down = new Set(tokens);
			const nativeFlags = {
				ctrl: down.has("ctrl"),
				alt: down.has("alt"),
				shift: down.has("shift"),
				meta: [
					"cmd",
					"win",
					"command",
					"window",
					"meta",
					"super"
				].some((token) => down.has(token))
			};
			let changed = false;
			for (const family of [
				"ctrl",
				"alt",
				"shift",
				"meta"
			]) if (nativeFlags[family]) nativeSeen.add(family);
			else if (nativeSeen.has(family)) {
				nativeSeen.delete(family);
				for (const code of codesFor(family)) if (pressed.delete(code)) changed = true;
			}
			if (!changed) return;
			preview();
			endIfReleased();
			if (!closed && pressed.size > 0) armRescue();
		}
		async function tickNative() {
			if (nativeUnavailable || closed) return;
			try {
				const response = await fetch("/api/settings/keybinds/held");
				if (!response.ok || closed) return;
				const data = await response.json();
				if (data.available !== true) {
					nativeUnavailable = true;
					return;
				}
				applyNative(Array.isArray(data.tokens) ? data.tokens : []);
			} catch {}
		}
		window.addEventListener("keydown", onKeyDown, true);
		window.addEventListener("keyup", onKeyUp, true);
		window.addEventListener("mousemove", onMouseMove, true);
		window.addEventListener("blur", onBlur);
		const nativeTimer = setInterval(() => void tickNative(), 80);
		tickNative();
		return () => {
			closed = true;
			if (idle) clearTimeout(idle);
			clearInterval(nativeTimer);
			finishGesture.current = () => {};
			window.removeEventListener("keydown", onKeyDown, true);
			window.removeEventListener("keyup", onKeyUp, true);
			window.removeEventListener("mousemove", onMouseMove, true);
			window.removeEventListener("blur", onBlur);
		};
	}, [recording, commit]);
	const shown = recording && draft ? draft : value;
	const keys = shown ? formatAppshotHotkey(shown, isMac).split(" + ") : [];
	const busy = disabled || saving;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative", className),
		"data-testid": testId,
		"data-keybind-recording": recording ? "true" : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: busy,
				"aria-label": `${label}: ${recording ? t("appshots.shortcut_recording") : keys.join(" + ") || t("appshots.shortcut_off")}`,
				"aria-pressed": recording,
				title: recording ? void 0 : t("appshots.shortcut_change"),
				onClick: () => {
					if (recording) {
						finishGesture.current();
						return;
					}
					setProblem("");
					setDraft("");
					setRecording(true);
				},
				"data-testid": `${testId}-change`,
				className: cn("flex h-9 w-full items-center gap-1 rounded-md bg-input py-2 pl-3 text-left text-sm text-foreground", "transition-colors duration-150 hover:bg-popover focus:outline-none focus-visible:ring-2 focus-visible:ring-border-strong", value && !recording ? "pr-8" : "pr-3", recording && "bg-popover ring-2 ring-border-strong", busy && "cursor-not-allowed opacity-50"),
				children: saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					className: "h-4 w-4 animate-spin text-muted-foreground",
					"aria-hidden": true
				}) : recording && !draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate text-muted-foreground",
					children: t("appshots.shortcut_recording")
				}) : keys.length > 0 ? keys.map((key, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [i > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "px-0.5 text-xs text-muted-foreground",
					children: "+"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
					className: "rounded border border-border bg-background px-1.5 py-px font-sans text-xs font-medium leading-5 text-foreground",
					children: key
				})] }, `${key}-${i}`)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate text-muted-foreground",
					children: t("appshots.shortcut_off")
				})
			}),
			value && !recording && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: busy,
				"aria-label": t("appshots.shortcut_clear"),
				title: t("appshots.shortcut_clear"),
				onClick: () => void commit(""),
				"data-testid": `${testId}-clear`,
				className: "absolute right-1.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-border-strong disabled:opacity-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
					className: "h-3.5 w-3.5",
					"aria-hidden": true
				})
			}),
			problem && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				role: "alert",
				children: problem
			})
		]
	});
}
export { gestureFamily as n, AppshotShortcutField as t };
