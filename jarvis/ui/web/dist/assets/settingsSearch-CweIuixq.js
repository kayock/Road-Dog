import { Ec as create, ec as uiDictionary, lc as en_default } from "./index-BOzhgzD7.js";
import { Y as de_default } from "./de-Cyk25Oqi.js";
import { at as es_default } from "./es-CddFcvWt.js";
const useSettingsJump = create((set, get) => ({
	target: null,
	request: (target) => set({ target }),
	take: () => {
		const { target } = get();
		if (target !== null) set({ target: null });
		return target;
	}
}));
var LOCALES = {
	en: en_default,
	de: de_default,
	es: es_default
};
var localeTree = (language) => LOCALES[language] ?? uiDictionary(language);
var SEARCH_GROUPS = [
	{
		id: "languages",
		keys: ["language", "languages_group_title"]
	},
	{
		id: "app",
		keys: [
			"app_settings_group_title",
			"autostart",
			"appearance",
			"jarvis_api"
		]
	},
	{
		id: "realtime-voice",
		keys: ["realtime_voice"]
	},
	{
		id: "system-prompt",
		keys: ["system_prompt"]
	},
	{
		id: "wake-word",
		keys: ["wake_word"]
	},
	{
		id: "volume",
		keys: ["volume"]
	},
	{
		id: "audio-devices",
		keys: ["audio_devices"]
	},
	{
		id: "music",
		keys: ["music", "music_group_title"]
	},
	{
		id: "more",
		keys: [
			"rows",
			"team_proxy",
			"codex_title",
			"safety_title"
		]
	},
	{
		id: "overlay-taskbar",
		keys: [
			"overlay_style",
			"bar_size",
			"overlay_taskbar_group_title"
		]
	}
];
var SEARCH_PAGES = [
	{
		id: "profile",
		keys: ["profile_view"]
	},
	{
		id: "agent-instructions",
		keys: ["assistant_view"]
	},
	{
		id: "socials",
		keys: ["socials"]
	},
	{
		id: "apikeys",
		keys: [
			"apikeys_view",
			"apikeys_voice",
			"apikeys_model",
			"apikeys_cu_model"
		]
	},
	{
		id: "appshots",
		keys: ["appshots"]
	},
	{
		id: "shortcuts",
		keys: [
			"shortcuts_view",
			"settings_view.keybinds",
			"settings_view.quick_switch"
		]
	},
	{
		id: "pets",
		keys: ["pets"]
	},
	{
		id: "costs",
		keys: ["costs_view"]
	},
	{
		id: "feedback",
		keys: ["feedback"]
	}
];
function normalize(value) {
	return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
function atPath(tree, path) {
	return path.split(".").reduce((node, part) => node && typeof node === "object" ? node[part] : void 0, tree);
}
function stringsIn(node) {
	if (typeof node === "string") return [node];
	if (!node || typeof node !== "object") return [];
	return Object.values(node).flatMap(stringsIn);
}
function matchingCopy(tree, keys, needle) {
	return keys.flatMap((key) => stringsIn(atPath(tree, key))).filter((value) => normalize(value).includes(needle));
}
function shortDetail(matches, label) {
	const detail = matches.filter((value) => value !== label).sort((a, b) => a.length - b.length)[0];
	return detail && detail.length <= 100 ? detail : void 0;
}
function searchSettingsOptions(language, query, translate) {
	const needle = normalize(query.trim());
	if (!needle) return [];
	const settings = atPath(localeTree(language), "settings_view");
	return SEARCH_GROUPS.flatMap(({ id, keys }) => {
		const label = translate(`settings_view.nav.${id.replaceAll("-", "_")}`);
		const matches = matchingCopy(settings, keys, needle);
		if (!normalize(label).includes(needle) && matches.length === 0) return [];
		return [{
			id,
			label,
			detail: shortDetail(matches, label)
		}];
	});
}
function searchSettingsPages(language, query, translate) {
	const needle = normalize(query.trim());
	if (!needle) return [];
	const locale = localeTree(language);
	return SEARCH_PAGES.flatMap(({ id, keys }) => {
		const label = translate(`nav.${id === "agent-instructions" ? "agent_instructions" : id}`);
		const matches = matchingCopy(locale, keys, needle);
		if (!normalize(label).includes(needle) && matches.length === 0) return [];
		return [{
			id,
			label,
			detail: shortDetail(matches, label)
		}];
	});
}
export { searchSettingsPages as n, useSettingsJump as r, searchSettingsOptions as t };
