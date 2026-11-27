import { Xc as require_react, tl as __toESM } from "./index-BOzhgzD7.js";
var FUNCTION_ROW = [
	{
		code: "Escape",
		label: "Esc",
		dead: true
	},
	{
		code: "F1",
		label: "F1"
	},
	{
		code: "F2",
		label: "F2"
	},
	{
		code: "F3",
		label: "F3"
	},
	{
		code: "F4",
		label: "F4"
	},
	{
		code: "F5",
		label: "F5"
	},
	{
		code: "F6",
		label: "F6"
	},
	{
		code: "F7",
		label: "F7"
	},
	{
		code: "F8",
		label: "F8"
	},
	{
		code: "F9",
		label: "F9"
	},
	{
		code: "F10",
		label: "F10"
	},
	{
		code: "F11",
		label: "F11"
	},
	{
		code: "F12",
		label: "F12"
	}
];
var NUMBER_ROW = [
	{
		code: "Backquote",
		label: "`",
		dead: true
	},
	{
		code: "Digit1",
		label: "1"
	},
	{
		code: "Digit2",
		label: "2"
	},
	{
		code: "Digit3",
		label: "3"
	},
	{
		code: "Digit4",
		label: "4"
	},
	{
		code: "Digit5",
		label: "5"
	},
	{
		code: "Digit6",
		label: "6"
	},
	{
		code: "Digit7",
		label: "7"
	},
	{
		code: "Digit8",
		label: "8"
	},
	{
		code: "Digit9",
		label: "9"
	},
	{
		code: "Digit0",
		label: "0"
	},
	{
		code: "Minus",
		label: "-",
		dead: true
	},
	{
		code: "Equal",
		label: "=",
		dead: true
	},
	{
		code: "Backspace",
		label: "⌫",
		width: 2
	}
];
var TOP_ROW = [
	{
		code: "Tab",
		label: "Tab",
		width: 1.5
	},
	{
		code: "KeyQ",
		label: "Q"
	},
	{
		code: "KeyW",
		label: "W"
	},
	{
		code: "KeyE",
		label: "E"
	},
	{
		code: "KeyR",
		label: "R"
	},
	{
		code: "KeyT",
		label: "T"
	},
	{
		code: "KeyY",
		label: "Y"
	},
	{
		code: "KeyU",
		label: "U"
	},
	{
		code: "KeyI",
		label: "I"
	},
	{
		code: "KeyO",
		label: "O"
	},
	{
		code: "KeyP",
		label: "P"
	},
	{
		code: "BracketLeft",
		label: "[",
		dead: true
	},
	{
		code: "BracketRight",
		label: "]",
		dead: true
	},
	{
		code: "Backslash",
		label: "\\",
		width: 1.5,
		dead: true
	}
];
var HOME_ROW = [
	{
		code: "CapsLock",
		label: "Caps",
		width: 1.75,
		dead: true
	},
	{
		code: "KeyA",
		label: "A"
	},
	{
		code: "KeyS",
		label: "S"
	},
	{
		code: "KeyD",
		label: "D"
	},
	{
		code: "KeyF",
		label: "F"
	},
	{
		code: "KeyG",
		label: "G"
	},
	{
		code: "KeyH",
		label: "H"
	},
	{
		code: "KeyJ",
		label: "J"
	},
	{
		code: "KeyK",
		label: "K"
	},
	{
		code: "KeyL",
		label: "L"
	},
	{
		code: "Semicolon",
		label: ";",
		dead: true
	},
	{
		code: "Quote",
		label: "'",
		dead: true
	},
	{
		code: "Enter",
		label: "Enter",
		width: 2.25
	}
];
var BOTTOM_ALPHA_ROW = [
	{
		code: "ShiftLeft",
		label: "Shift",
		width: 2.25
	},
	{
		code: "KeyZ",
		label: "Z"
	},
	{
		code: "KeyX",
		label: "X"
	},
	{
		code: "KeyC",
		label: "C"
	},
	{
		code: "KeyV",
		label: "V"
	},
	{
		code: "KeyB",
		label: "B"
	},
	{
		code: "KeyN",
		label: "N"
	},
	{
		code: "KeyM",
		label: "M"
	},
	{
		code: "Comma",
		label: ",",
		dead: true
	},
	{
		code: "Period",
		label: ".",
		dead: true
	},
	{
		code: "Slash",
		label: "/",
		dead: true
	},
	{
		code: "ShiftRight",
		label: "Shift",
		width: 2.75
	}
];
function modifierRow(platform) {
	if (platform === "mac") return [
		{
			code: "ControlLeft",
			label: "⌃",
			width: 1.25
		},
		{
			code: "AltLeft",
			label: "⌥",
			width: 1.25
		},
		{
			code: "MetaLeft",
			label: "⌘",
			width: 1.25
		},
		{
			code: "Space",
			label: "Space",
			width: 6.25
		},
		{
			code: "MetaRight",
			label: "⌘",
			width: 1.25
		},
		{
			code: "AltRight",
			label: "⌥",
			width: 1.25
		},
		{
			code: "ControlRight",
			label: "⌃",
			width: 1.25
		}
	];
	return [
		{
			code: "ControlLeft",
			label: "Ctrl",
			width: 1.25
		},
		{
			code: "MetaLeft",
			label: "Win",
			width: 1.25
		},
		{
			code: "AltLeft",
			label: "Alt",
			width: 1.25
		},
		{
			code: "Space",
			label: "Space",
			width: 6.25
		},
		{
			code: "AltRight",
			label: "AltGr",
			width: 1.25
		},
		{
			code: "MetaRight",
			label: "Win",
			width: 1.25
		},
		{
			code: "ControlRight",
			label: "Ctrl",
			width: 1.25
		}
	];
}
function mainRows(platform) {
	return [
		FUNCTION_ROW,
		NUMBER_ROW,
		TOP_ROW,
		HOME_ROW,
		BOTTOM_ALPHA_ROW,
		modifierRow(platform)
	];
}
const NAV_ROWS = [[
	{
		code: "Insert",
		label: "Ins"
	},
	{
		code: "Home",
		label: "Home"
	},
	{
		code: "PageUp",
		label: "PgUp"
	}
], [
	{
		code: "Delete",
		label: "Del"
	},
	{
		code: "End",
		label: "End"
	},
	{
		code: "PageDown",
		label: "PgDn"
	}
]];
const ARROW_ROWS = [[
	null,
	{
		code: "ArrowUp",
		label: "↑"
	},
	null
], [
	{
		code: "ArrowLeft",
		label: "←"
	},
	{
		code: "ArrowDown",
		label: "↓"
	},
	{
		code: "ArrowRight",
		label: "→"
	}
]];
function detectKeyboardPlatform() {
	if (typeof navigator === "undefined") return "pc";
	const probe = `${navigator.platform ?? ""} ${navigator.userAgent ?? ""}`;
	return /Mac|iPhone|iPad|iPod/i.test(probe) ? "mac" : "pc";
}
const MOUSE_BUTTON_TOKENS = [
	"mouse_middle",
	"mouse_x1",
	"mouse_x2"
];
function mouseButtonToToken(button) {
	switch (button) {
		case 1: return "mouse_middle";
		case 3: return "mouse_x1";
		case 4: return "mouse_x2";
		default: return null;
	}
}
function mouseButtonCode(button) {
	return `MouseButton${button}`;
}
const MOUSE_CAPS = [
	{
		code: mouseButtonCode(1),
		label: "Middle",
		token: "mouse_middle"
	},
	{
		code: mouseButtonCode(3),
		label: "Back",
		token: "mouse_x1"
	},
	{
		code: mouseButtonCode(4),
		label: "Forward",
		token: "mouse_x2"
	}
];
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var _NAMED_KEY_TOKENS = {
	ArrowUp: "up",
	ArrowDown: "down",
	ArrowLeft: "left",
	ArrowRight: "right",
	Insert: "insert",
	Delete: "delete",
	Home: "home",
	End: "end",
	PageUp: "page_up",
	PageDown: "page_down",
	Enter: "enter",
	NumpadEnter: "enter",
	Tab: "tab",
	Backspace: "backspace",
	NumpadAdd: "add_key",
	NumpadSubtract: "subtract_key",
	NumpadMultiply: "multiply_key",
	NumpadDivide: "divide_key",
	NumpadDecimal: "decimal_key"
};
function codeToKeyToken(code) {
	if (code.startsWith("Control") || code.startsWith("Alt") || code.startsWith("Shift") || code.startsWith("Meta") || code === "AltGraph" || code === "Escape") return null;
	if (/^Key[A-Z]$/.test(code)) return code.slice(3).toLowerCase();
	if (/^Digit[0-9]$/.test(code)) return code.slice(5);
	if (/^F[0-9]{1,2}$/.test(code)) return code.toLowerCase();
	if (code === "Space") return "space";
	if (/^Numpad[0-9]$/.test(code)) return "numpad_" + code.slice(6);
	if (code in _NAMED_KEY_TOKENS) return _NAMED_KEY_TOKENS[code];
	return null;
}
function metaToken(platform) {
	return platform === "mac" ? "cmd" : "win";
}
function modifierTokens(e, platform = detectKeyboardPlatform()) {
	const mods = [];
	const altGr = e.getModifierState?.("AltGraph") === true || e.code === "AltRight";
	if (e.ctrlKey && !altGr) mods.push("ctrl");
	if (altGr) mods.push("right_alt");
	else if (e.altKey) mods.push("alt");
	if (e.shiftKey) mods.push("shift");
	if (e.metaKey) mods.push(metaToken(platform));
	return mods;
}
function eventToCombo(e, platform = detectKeyboardPlatform()) {
	const key = codeToKeyToken(e.code);
	if (key === null) return null;
	return [...modifierTokens(e, platform), key].join("+");
}
function chordToCombo(e, heldTokens, platform = detectKeyboardPlatform()) {
	const keys = [...new Set(heldTokens)].sort();
	const mods = modifierTokens(e, platform);
	if (keys.length === 0 && mods.length === 0) return null;
	return [...mods, ...keys].join("+");
}
const MODIFIER_TOKENS = [
	"ctrl",
	"control",
	"right_ctrl",
	"right_control",
	"right_alt",
	"left_alt",
	"altgr",
	"alt",
	"shift",
	"win",
	"window",
	"super",
	"meta",
	"cmd",
	"command"
];
function isModifierToken(token) {
	return MODIFIER_TOKENS.includes(token);
}
function codeToModifierToken(code, platform = detectKeyboardPlatform()) {
	switch (code) {
		case "ControlLeft":
		case "ControlRight": return "ctrl";
		case "ShiftLeft":
		case "ShiftRight": return "shift";
		case "AltLeft": return "alt";
		case "AltRight":
		case "AltGraph": return "right_alt";
		case "MetaLeft":
		case "MetaRight": return metaToken(platform);
		default: return null;
	}
}
function composeCombo(tokens) {
	const set = new Set(tokens);
	const mods = MODIFIER_TOKENS.filter((m) => set.has(m));
	const keys = [...set].filter((t) => !isModifierToken(t)).sort();
	return [...mods, ...keys].join("+");
}
function comboTokens(combo) {
	return new Set((combo ?? "").split("+").map((p) => p.trim().toLowerCase()).filter(Boolean));
}
var _NAV_SOLO_TOKENS = new Set([
	"up",
	"down",
	"left",
	"right",
	"home",
	"end",
	"page_up",
	"page_down",
	"insert",
	"delete"
]);
var _SOLO_SAFE_TOKENS = new Set([...Array.from({ length: 24 }, (_, i) => `f${i + 1}`), ..._NAV_SOLO_TOKENS]);
var _RESERVED_TOKENS = new Set(["f12"]);
var _WINDOWS_CRITICAL_KEYS = new Set([
	"d",
	"e",
	"l",
	"r",
	"x",
	"i",
	"s",
	"v",
	"a",
	"p",
	"tab",
	"left",
	"right",
	"up",
	"down"
]);
var _MACOS_CRITICAL_KEYS = new Set([
	"c",
	"v",
	"x",
	"z",
	"q",
	"w",
	"a",
	"s",
	"space",
	"tab"
]);
var _CTRL_FAMILY = new Set([
	"ctrl",
	"control",
	"right_ctrl",
	"right_control"
]);
var _ALT_FAMILY = new Set([
	"alt",
	"right_alt",
	"left_alt",
	"altgr"
]);
var _META_FAMILY = new Set([
	"win",
	"window",
	"super",
	"meta"
]);
var _CMD_FAMILY = new Set([
	"cmd",
	"command",
	"meta",
	"super"
]);
var _NORMALIZE_FOLD = {
	ctrl: "control",
	right_ctrl: "right_control",
	right_alt: "alt",
	left_alt: "alt",
	altgr: "alt",
	win: "window",
	super: "window",
	meta: "window",
	cmd: "window",
	command: "window"
};
function normalizedComboTokens(combo) {
	return new Set([...comboTokens(combo)].map((t) => _NORMALIZE_FOLD[t] ?? t));
}
function validateCombo(combo, others = {}, platform = detectKeyboardPlatform()) {
	const tokens = comboTokens(combo);
	if (tokens.size === 0) return {
		status: "empty",
		cautions: []
	};
	const mods = [...tokens].filter((t) => isModifierToken(t));
	const keys = [...tokens].filter((t) => !isModifierToken(t));
	const mouse = keys.filter((k) => MOUSE_BUTTON_TOKENS.includes(k));
	const cautions = [];
	if (keys.length === 0) cautions.push("modifier_only");
	else if (mods.length === 0 && keys.length === 1 && mouse.length === 0 && !_SOLO_SAFE_TOKENS.has(keys[0])) cautions.push("solo_typing_key");
	const onlyFrom = (family) => mods.length > 0 && mods.every((m) => family.has(m));
	const altHeld = mods.some((m) => _ALT_FAMILY.has(m));
	if (keys.some((k) => _RESERVED_TOKENS.has(k))) cautions.push("os_shortcut");
	if (altHeld && keys.includes("f4")) cautions.push("os_shortcut");
	if (onlyFrom(_CTRL_FAMILY) && keys.length === 1 && keys[0] === "c") cautions.push("os_shortcut");
	if (onlyFrom(_META_FAMILY) && keys.length === 1 && (platform === "mac" ? _MACOS_CRITICAL_KEYS.has(keys[0]) : _WINDOWS_CRITICAL_KEYS.has(keys[0]))) cautions.push("os_shortcut");
	if (onlyFrom(_CMD_FAMILY) && keys.length === 1 && _MACOS_CRITICAL_KEYS.has(keys[0])) cautions.push("os_shortcut");
	if (mouse.length > 0) cautions.push("mouse_button");
	if (mods.length === 0 && keys.length === 1 && _NAV_SOLO_TOKENS.has(keys[0])) cautions.push("solo_nav");
	const unique = [...new Set(cautions)];
	const normalized = normalizedComboTokens(combo);
	let overlap;
	const isSubset = (a, b) => [...a].every((t) => b.has(t));
	for (const [action, other] of Object.entries(others)) {
		const otherTokens = normalizedComboTokens(other);
		if (otherTokens.size === 0) continue;
		const mineInTheirs = isSubset(normalized, otherTokens);
		const theirsInMine = isSubset(otherTokens, normalized);
		if (!mineInTheirs && !theirsInMine) continue;
		if (mineInTheirs && theirsInMine) return {
			status: "error",
			reason: "collision",
			conflict: {
				action,
				combo: other.trim().toLowerCase()
			},
			cautions: unique
		};
		unique.push("overlap");
		overlap = {
			action,
			combo: other.trim().toLowerCase()
		};
	}
	return {
		status: "ok",
		cautions: [...new Set(unique)],
		conflict: overlap
	};
}
function useKeybinds() {
	const [config, setConfig] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const refetch = (0, import_react.useCallback)(async () => {
		setError(null);
		try {
			const res = await fetch("/api/settings/keybinds");
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
		const onChanged = () => void refetch();
		window.addEventListener("jarvis:keybinds-changed", onChanged);
		return () => {
			window.removeEventListener("jarvis:keybinds-changed", onChanged);
		};
	}, [refetch]);
	return {
		config,
		loading,
		error,
		refetch,
		saveKeybind: (0, import_react.useCallback)(async (action, hotkey) => {
			const res = await fetch("/api/settings/keybinds", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					action,
					hotkey,
					persist: true
				})
			});
			const body = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(body.detail ?? `HTTP ${res.status}`);
			window.dispatchEvent(new CustomEvent("jarvis:keybinds-changed"));
			return body;
		}, [])
	};
}
export { mouseButtonCode as _, composeCombo as a, modifierTokens as c, validateCombo as d, ARROW_ROWS as f, mainRows as g, detectKeyboardPlatform as h, comboTokens as i, normalizedComboTokens as l, NAV_ROWS as m, codeToKeyToken as n, eventToCombo as o, MOUSE_CAPS as p, codeToModifierToken as r, isModifierToken as s, chordToCombo as t, useKeybinds as u, mouseButtonToToken as v };
