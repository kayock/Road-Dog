import { Bc as require_jsx_runtime, Xc as require_react, oc as useT, sc as useUiLanguage, tl as __toESM } from "./index-BOzhgzD7.js";
import { t as Combobox } from "./combobox-BL3mwl7r.js";
var CODE_ALIASES = {
	jw: "jv",
	yue: "yue",
	haw: "haw"
};
var FALLBACK_NAMES = {
	jw: "Javanese",
	jv: "Javanese",
	yue: "Cantonese",
	haw: "Hawaiian",
	ln: "Lingala",
	ba: "Bashkir",
	br: "Breton",
	tk: "Turkmen",
	tt: "Tatar",
	sa: "Sanskrit",
	oc: "Occitan",
	nn: "Norwegian Nynorsk",
	as: "Assamese",
	bo: "Tibetan",
	mi: "Maori",
	sn: "Shona"
};
const COMMON_LANGUAGE_CODES = [
	"en",
	"de",
	"es",
	"zh",
	"fr",
	"it",
	"pt",
	"nl",
	"pl",
	"sv",
	"no",
	"da",
	"fi"
];
var TRAILING_LANGUAGE_CODES = ["hi", "ar"];
function compareLanguageOptions(a, b, collator) {
	const aTrailing = TRAILING_LANGUAGE_CODES.indexOf(a.code);
	const bTrailing = TRAILING_LANGUAGE_CODES.indexOf(b.code);
	if (aTrailing >= 0 || bTrailing >= 0) {
		if (aTrailing < 0) return -1;
		if (bTrailing < 0) return 1;
		return aTrailing - bTrailing;
	}
	return collator.compare(a.label, b.label);
}
var displayNamesCache = /* @__PURE__ */ new Map();
function displayNamesFor(uiLanguage) {
	const cached = displayNamesCache.get(uiLanguage);
	if (cached !== void 0) return cached;
	let instance = null;
	try {
		instance = new Intl.DisplayNames([uiLanguage], { type: "language" });
	} catch {
		instance = null;
	}
	displayNamesCache.set(uiLanguage, instance);
	return instance;
}
function languageName(code, uiLanguage, autoLabel) {
	if (code === "auto") return autoLabel ?? "Automatic";
	const resolved = CODE_ALIASES[code] ?? code;
	const intl = displayNamesFor(uiLanguage);
	if (intl) try {
		const name = intl.of(resolved);
		if (name && name.toLowerCase() !== resolved.toLowerCase()) return name;
	} catch {}
	return FALLBACK_NAMES[code] ?? FALLBACK_NAMES[resolved] ?? code;
}
function languageEndonym(code, uiLanguage) {
	if (code === "auto") return "";
	const resolved = CODE_ALIASES[code] ?? code;
	const own = displayNamesFor(resolved);
	if (!own) return "";
	let name;
	try {
		name = own.of(resolved);
	} catch {
		return "";
	}
	if (!name || name.toLowerCase() === resolved.toLowerCase()) return "";
	return name === languageName(code, uiLanguage) ? "" : name;
}
function foldForSearch(value) {
	return value.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}
function languageSearchText(code, uiLanguage) {
	return foldForSearch([
		languageName(code, uiLanguage),
		languageEndonym(code, uiLanguage),
		languageName(code, "en"),
		code
	].filter(Boolean).join(" "));
}
function languageMatches(code, uiLanguage, query) {
	const needle = foldForSearch(query).trim();
	if (!needle) return true;
	const haystack = languageSearchText(code, uiLanguage);
	return needle.split(/\s+/).every((word) => haystack.includes(word));
}
function groupedLanguageOptions(codes, uiLanguage, autoLabel, options = {}) {
	const { preferred, keepInCommon } = options;
	const collator = new Intl.Collator(uiLanguage);
	const served = new Set(codes);
	const decorate = (code, label) => ({
		code,
		label: label ?? languageName(code, uiLanguage),
		endonym: languageEndonym(code, uiLanguage)
	});
	const lead = codes.filter((c) => c === "auto").map((code) => decorate(code, languageName(code, uiLanguage, autoLabel)));
	const commonCodes = [];
	for (const code of [
		...COMMON_LANGUAGE_CODES,
		preferred,
		keepInCommon
	]) {
		if (!code || code === "auto") continue;
		if (!served.has(code)) continue;
		if (commonCodes.includes(code)) continue;
		commonCodes.push(code);
	}
	const all = codes.filter((c) => c !== "auto").map((code) => decorate(code)).sort((a, b) => compareLanguageOptions(a, b, collator));
	const groups = [];
	if (lead.length) groups.push({
		id: "",
		options: lead
	});
	if (commonCodes.length && all.length > commonCodes.length + 3) groups.push({
		id: "common",
		options: commonCodes.map((code) => decorate(code))
	});
	if (all.length) groups.push({
		id: "all",
		options: all
	});
	return groups;
}
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function LanguageSelect({ value, codes, onChange, autoLabel, ariaLabel, disabled = false, className, testId }) {
	const t = useT();
	const uiLanguage = useUiLanguage();
	const groups = (0, import_react.useMemo)(() => {
		const bands = groupedLanguageOptions(codes, uiLanguage, autoLabel, {
			preferred: uiLanguage,
			keepInCommon: value
		});
		const headings = {
			common: t("language_select.group_common"),
			all: t("language_select.group_all")
		};
		return bands.map((band) => ({
			id: band.id || "lead",
			label: headings[band.id],
			options: band.options.map((option) => ({
				value: option.code,
				label: option.label,
				hint: option.endonym
			}))
		}));
	}, [
		codes,
		uiLanguage,
		autoLabel,
		value,
		t
	]);
	const matches = (0, import_react.useCallback)((option, query) => option.value === "auto" ? languageMatches("auto", uiLanguage, query) || option.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()) : languageMatches(option.value, uiLanguage, query), [uiLanguage]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox, {
		value,
		groups,
		onChange,
		ariaLabel,
		fallbackLabel: languageName(value, uiLanguage, autoLabel),
		searchPlaceholder: t("language_select.search"),
		emptyLabel: t("language_select.empty"),
		matches,
		disabled,
		className,
		testId
	});
}
export { LanguageSelect as t };
