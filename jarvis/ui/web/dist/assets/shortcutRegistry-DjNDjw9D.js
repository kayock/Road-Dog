const SHORTCUTS = [
	{
		kind: "rebindable",
		area: "voice",
		scope: "global",
		action: "dictate",
		labelKey: "shortcut_overlay.voice.dictate"
	},
	{
		kind: "rebindable",
		area: "voice",
		scope: "global",
		action: "dictate_toggle",
		labelKey: "shortcut_overlay.voice.dictate_toggle"
	},
	{
		kind: "rebindable",
		area: "voice",
		scope: "global",
		action: "call",
		labelKey: "shortcut_overlay.voice.call"
	},
	{
		kind: "rebindable",
		area: "voice",
		scope: "global",
		action: "hangup",
		labelKey: "shortcut_overlay.voice.hangup"
	},
	{
		kind: "rebindable",
		area: "voice",
		scope: "global",
		action: "paste_last",
		labelKey: "shortcut_overlay.voice.paste_last"
	},
	{
		kind: "app",
		area: "workspace",
		scope: "window",
		setting: "quick_switch",
		labelKey: "shortcut_overlay.workspace.quick_switch"
	},
	{
		kind: "app",
		area: "workspace",
		scope: "window",
		setting: "app_zoom_in",
		labelKey: "shortcut_overlay.workspace.app_zoom_in"
	},
	{
		kind: "app",
		area: "workspace",
		scope: "window",
		setting: "app_zoom_out",
		labelKey: "shortcut_overlay.workspace.app_zoom_out"
	},
	{
		kind: "app",
		area: "workspace",
		scope: "window",
		setting: "app_zoom_reset",
		labelKey: "shortcut_overlay.workspace.app_zoom_reset"
	},
	{
		kind: "app",
		area: "workspace",
		scope: "window",
		setting: "shortcut_overlay",
		labelKey: "shortcut_overlay.workspace.open_overlay"
	},
	{
		kind: "app",
		area: "workspace",
		scope: "terminal",
		setting: "terminal_zoom_in",
		labelKey: "shortcut_overlay.workspace.zoom_in"
	},
	{
		kind: "app",
		area: "workspace",
		scope: "terminal",
		setting: "terminal_zoom_out",
		labelKey: "shortcut_overlay.workspace.zoom_out"
	},
	{
		kind: "app",
		area: "workspace",
		scope: "terminal",
		setting: "terminal_zoom_reset",
		labelKey: "shortcut_overlay.workspace.zoom_reset"
	},
	{
		kind: "app",
		area: "workspace",
		scope: "terminal",
		setting: "ide_menu",
		labelKey: "shortcut_overlay.workspace.ide_menu"
	}
];
const SHORTCUT_AREAS = ["voice", "workspace"];
function shortcutsForArea(area) {
	return SHORTCUTS.filter((s) => s.area === area);
}
function keyLabel(token, isMac) {
	if (token === "Mod") return isMac ? "⌘" : "Ctrl";
	if (isMac) {
		const glyph = MAC_GLYPHS[token.toLowerCase()];
		if (glyph) return glyph;
	}
	return token;
}
var MAC_GLYPHS = {
	ctrl: "⌃",
	alt: "⌥",
	right_alt: "⌥",
	cmd: "⌘",
	command: "⌘",
	meta: "⌘",
	win: "⌘",
	super: "⌘"
};
export { shortcutsForArea as i, SHORTCUT_AREAS as n, keyLabel as r, SHORTCUTS as t };
