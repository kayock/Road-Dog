import { $r as PhoneIcon, Bc as require_jsx_runtime, Cc as SECTION_LABELS, Ho as useHomeStore, Hr as NAV_GROUPS, Jr as ConnectorIcon, Kr as ChatIcon, Ln as cn, Ot as useIdeSidePanelStore, Pi as KeyRound, Qr as PaneGridIcon, Ur as SETTINGS_HUB_ONLY_ITEMS, Vr as NAV_FOOTER_ITEMS, Xc as require_react, Xr as FolderIcon, Yr as DictionaryIcon, Zr as LanguageIcon, ai as TestFlaskIcon, dn as chatRowLabel, ei as PluginIcon, eo as fetchIdeProjects, fn as formatChatWhen, fo as fetchWorkspacePanes, ii as TerminalIcon, lc as en_default, ni as ShortcutsIcon, oc as useT, oi as VoiceIcon, pn as useChatRows, ri as SkillIcon, sc as useUiLanguage, sn as useIdeProjectsStore, ti as SettingsIcon, tl as __toESM, wc as useEventStore } from "./index-BOzhgzD7.js";
import { t as _e } from "./dist-B6qknip3.js";
import { r as useSettingsJump, t as searchSettingsOptions } from "./settingsSearch-CweIuixq.js";
import { Y as de_default } from "./de-Cyk25Oqi.js";
import { at as es_default } from "./es-CddFcvWt.js";
var LOCALES = [
	en_default,
	de_default,
	es_default
];
var ALIASES = {
	voice: [
		"home",
		"start",
		"talk",
		"speak"
	],
	chat: [
		"home",
		"start",
		"message",
		"conversation"
	],
	"agentic-ide": [
		"ide",
		"code",
		"coding",
		"terminal",
		"panes",
		"workspace"
	],
	"agentic-ide-classic": [
		"terminal",
		"grid",
		"panes"
	],
	agents: [
		"society",
		"world",
		"team",
		"routines",
		"schedule",
		"automations"
	],
	settings: [
		"preferences",
		"options",
		"config",
		"configuration",
		"general"
	],
	apikeys: [
		"keys",
		"credentials",
		"tokens",
		"providers"
	],
	memory: [
		"notes",
		"knowledge",
		"obsidian"
	],
	visualization: [
		"outputs",
		"results",
		"images",
		"pages"
	],
	costs: [
		"tokens",
		"usage",
		"money",
		"billing",
		"budget"
	],
	sessions: [
		"transcripts",
		"recordings",
		"history"
	],
	computers: [
		"servers",
		"ssh",
		"vps",
		"remote",
		"machines"
	],
	"agent-instructions": [
		"assistant",
		"soul",
		"soul md",
		"character",
		"persona",
		"instructions",
		"memory md"
	],
	marketplace: [
		"store",
		"shop",
		"install"
	],
	board: [
		"stats",
		"dashboard",
		"activity"
	],
	docs: [
		"documentation",
		"help",
		"manual"
	],
	feedback: [
		"bug",
		"report",
		"issue"
	],
	appshots: ["screenshot", "capture"],
	dictation: [
		"voice",
		"speech",
		"microphone",
		"mic",
		"whisper"
	],
	shortcuts: [
		"hotkeys",
		"keybinds",
		"keyboard",
		"quick switcher"
	],
	"voice-shortcuts": ["dictation hotkeys", "dictation keys"],
	"voice-language": ["recognition language"],
	"voice-api-keys": ["speech to text", "stt"],
	dictionary: ["vocabulary", "words"],
	telephony: [
		"phone",
		"calls",
		"twilio"
	],
	languages: [
		"language",
		"locale",
		"translation"
	]
};
function entry(item, overrides = {}) {
	const key = overrides.key ?? item.id;
	return {
		key,
		section: item.id,
		labelKey: item.labelKey,
		fallbackLabel: item.fallbackLabel ?? SECTION_LABELS[item.id],
		icon: item.icon,
		aliases: ALIASES[key] ?? [],
		...overrides
	};
}
function tab(section, labelKey, icon, parentLabelKey) {
	return {
		key: section,
		section,
		labelKey,
		fallbackLabel: SECTION_LABELS[section],
		icon,
		parentLabelKey,
		aliases: ALIASES[section] ?? []
	};
}
function expand(item) {
	switch (item.id) {
		case "chats": return [entry(item, {
			key: "voice",
			surface: "voice",
			labelKey: "sidebar.surface_voice",
			fallbackLabel: "Voice",
			icon: VoiceIcon,
			aliases: ALIASES.voice
		}), entry(item, {
			key: "chat",
			surface: "chat",
			labelKey: "sidebar.surface_chat",
			fallbackLabel: "Chat",
			icon: ChatIcon,
			aliases: ALIASES.chat
		})];
		case "plugins": return [
			tab("plugins", "nav.plugins", PluginIcon, "nav.extensions"),
			tab("skills", "nav.skills", SkillIcon, "nav.extensions"),
			tab("mcps", "nav.mcps", ConnectorIcon, "nav.extensions")
		];
		case "clis": return [entry(item, {
			labelKey: "nav.clis",
			fallbackLabel: "CLIs"
		}), tab("cli-test-hub", "nav.cli_test_hub", TestFlaskIcon, "nav.clis")];
		case "agentic-ide": return [entry(item), tab("agentic-ide-classic", "quick_switch.terminal_grid", PaneGridIcon, "nav.agentic_ide")];
		case "apikeys": return [entry(item), tab("telephony", "nav.telephony", PhoneIcon, "nav.apikeys")];
		case "settings": return [entry(item), tab("languages", "nav.languages", LanguageIcon, "nav.settings")];
		case "dictation": return [
			entry(item),
			tab("dictionary", "nav.dictionary", DictionaryIcon, "nav.voice"),
			tab("voice-shortcuts", "nav.voice_shortcuts", ShortcutsIcon, "nav.voice"),
			tab("voice-language", "nav.voice_language", LanguageIcon, "nav.voice"),
			tab("voice-api-keys", "nav.voice_api_keys", KeyRound, "nav.voice")
		];
		default: return [entry(item)];
	}
}
const QUICK_SWITCH_ENTRIES = [
	...NAV_GROUPS.flat(),
	...SETTINGS_HUB_ONLY_ITEMS,
	...NAV_FOOTER_ITEMS
].flatMap(expand);
function normalizeQuery(value) {
	return value.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\{name\}/g, "").toLowerCase().trim();
}
function atPath(tree, path) {
	return path.split(".").reduce((node, part) => node && typeof node === "object" ? node[part] : void 0, tree);
}
function entryTerms(item, activeLabel) {
	const localized = LOCALES.map((tree) => atPath(tree, item.labelKey)).filter((value) => typeof value === "string");
	const terms = [
		activeLabel,
		item.fallbackLabel,
		SECTION_LABELS[item.section],
		...localized,
		...item.aliases
	];
	return [...new Set(terms.map(normalizeQuery).filter(Boolean))];
}
function initialsMatch(term, needle) {
	const initials = term.split(/[\s\-_.&/]+/).filter(Boolean).map((word) => word[0]).join("");
	return initials.length > 1 && initials.startsWith(needle);
}
function scoreTerm(term, needle) {
	if (!needle) return 0;
	if (term === needle) return 100;
	if (term.startsWith(needle)) return 80;
	if (term.split(/[\s\-_.&/]+/).some((word) => word.startsWith(needle))) return 60;
	if (initialsMatch(term, needle)) return 50;
	if (needle.length >= 4 && term.includes(needle)) return 40;
	return 0;
}
function compareLabels(a, b) {
	return a.localeCompare(b, void 0, {
		sensitivity: "base",
		numeric: true
	});
}
function compareMatches(a, b) {
	if (a.prefix !== b.prefix) return a.prefix ? -1 : 1;
	return compareLabels(a.label, b.label);
}
function labelStartsWith(label, needle) {
	return normalizeQuery(label).startsWith(needle);
}
function rankQuickSwitch(query, labelFor, entries = QUICK_SWITCH_ENTRIES) {
	const needle = normalizeQuery(query);
	if (!needle) return [];
	const rows = [];
	for (const item of entries) {
		const label = labelFor(item);
		const prefix = labelStartsWith(label, needle);
		if (prefix || needle.length > 2 && entryTerms(item, label).some((term) => scoreTerm(term, needle) > 0)) rows.push({
			entry: item,
			label,
			prefix
		});
	}
	return rows.sort((a, b) => compareMatches(a, b) || Number(Boolean(a.entry.parentLabelKey)) - Number(Boolean(b.entry.parentLabelKey)));
}
function strongSettingsMatches(query, matches, limit = 4) {
	const needle = normalizeQuery(query);
	if (!needle) return [];
	return matches.filter((match) => needle.length <= 2 ? labelStartsWith(match.label, needle) : [match.label, match.detail ?? ""].some((text) => scoreTerm(normalizeQuery(text), needle) >= 60)).map((match) => ({
		match,
		label: match.label,
		prefix: labelStartsWith(match.label, needle)
	})).sort(compareMatches).slice(0, limit).map((row) => row.match);
}
function ambiguousEntryKeys(labelFor, entries = QUICK_SWITCH_ENTRIES) {
	const seen = /* @__PURE__ */ new Map();
	for (const item of entries) {
		const label = normalizeQuery(labelFor(item));
		seen.set(label, [...seen.get(label) ?? [], item.key]);
	}
	return new Set([...seen.values()].filter((keys) => keys.length > 1).flat());
}
function matchScore(query, fields) {
	const words = normalizeQuery(query).split(/\s+/).filter(Boolean);
	if (words.length === 0) return 0;
	const texts = fields.map((field) => normalizeQuery(field ?? "")).filter(Boolean);
	let total = 0;
	for (const word of words) {
		const best = Math.max(0, ...texts.map((text) => scoreTerm(text, word)));
		if (best === 0) return 0;
		total += best;
	}
	return total / words.length;
}
function rankItems(query, items, fields, limit, labelOf = (item) => fields(item)[0] ?? "") {
	const needle = normalizeQuery(query);
	if (!needle) return [];
	return items.map((item) => {
		const label = labelOf(item);
		const prefix = labelStartsWith(label, needle);
		return {
			item,
			label,
			prefix,
			hit: needle.length <= 2 ? prefix : prefix || matchScore(query, fields(item)) > 0
		};
	}).filter((row) => row.hit).sort(compareMatches).slice(0, limit).map((row) => row.item);
}
function folderName(folder) {
	const parts = folder.split(/[\\/]+/).filter(Boolean);
	return parts[parts.length - 1] ?? folder;
}
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function useLabel() {
	const t = useT();
	return (key, fallback) => {
		const value = t(key);
		return value === key ? fallback : value;
	};
}
var ROW = cn("group flex cursor-default select-none items-center gap-3 rounded-lg px-2.5", "text-foreground outline-none", "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground");
var TILE = cn("grid shrink-0 place-items-center rounded-md bg-secondary text-muted-foreground", "group-data-[selected=true]:bg-white/20 group-data-[selected=true]:text-accent-foreground");
var DETAIL = cn("ml-auto shrink-0 truncate pl-3 text-muted-foreground", "group-data-[selected=true]:text-accent-foreground/80");
var GROUP = cn("[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-2.5", "[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium", "[&_[cmdk-group-heading]]:text-muted-foreground");
var LIMIT = {
	chats: 6,
	terminals: 6,
	workspaces: 4
};
var SIZE = {
	large: {
		row: "h-11 text-base",
		tile: "h-7 w-7",
		detail: "text-sm"
	},
	compact: {
		row: "h-9 text-sm",
		tile: "h-6 w-6",
		detail: "text-xs"
	}
};
function ResultRow({ value, testId, icon: Icon, label, detail, size, onSelect }) {
	const s = SIZE[size];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
		value,
		onSelect,
		"data-testid": testId,
		className: cn(ROW, s.row),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn(TILE, s.tile),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "h-4 w-4",
					"aria-hidden": true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 truncate",
				children: label
			}),
			detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn(DETAIL, s.detail),
				children: detail
			}) : null
		]
	});
}
function useIdeResults() {
	const [panes, setPanes] = (0, import_react.useState)([]);
	const [workspaces, setWorkspaces] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		let live = true;
		fetchWorkspacePanes().then((found) => {
			if (live) setPanes(found.panes.filter((pane) => !pane.archived));
		}).catch(() => {});
		fetchIdeProjects().then((found) => {
			if (!live) return;
			setWorkspaces(found.projects.flatMap((project) => project.workspaces.filter((workspace) => workspace.status === "open")).sort((a, b) => b.last_active_at - a.last_active_at));
		}).catch(() => {});
		return () => {
			live = false;
		};
	}, []);
	return {
		panes,
		workspaces
	};
}
function paneTitle(pane) {
	return pane.recap || pane.last_prompt || pane.display_name || pane.key;
}
function QuickSwitchList({ query, onDone, onFirstChange, size = "large", className }) {
	const t = useT();
	const label = useLabel();
	const language = useUiLanguage();
	const activeSection = useEventStore((s) => s.activeSection);
	const setActiveSection = useEventStore((s) => s.setActiveSection);
	const setSurface = useHomeStore((s) => s.setSurface);
	const requestSettingsJump = useSettingsJump((s) => s.request);
	const activateWorkspace = useIdeProjectsStore((s) => s.activateWorkspace);
	const setSpotlight = useIdeSidePanelStore((s) => s.setSpotlight);
	const { rows: chatRows, open: openChat } = useChatRows();
	const { panes, workspaces } = useIdeResults();
	const typed = query.trim() !== "";
	const labelFor = (item) => label(item.labelKey, item.fallbackLabel);
	const ambiguous = ambiguousEntryKeys(labelFor);
	const ranked = rankQuickSwitch(query, labelFor).map((row) => {
		const area = row.entry.parentLabelKey ? label(row.entry.parentLabelKey, "") : "";
		const shown = area && ambiguous.has(row.entry.key) ? `${area} › ${row.label}` : row.label;
		return {
			...row,
			area,
			shown,
			prefix: labelStartsWith(shown, normalizeQuery(query))
		};
	}).filter((row) => row.prefix || normalizeQuery(query).length > 2).sort((a, b) => compareMatches({
		...a,
		label: a.shown
	}, {
		...b,
		label: b.shown
	}));
	const settingsMatches = (0, import_react.useMemo)(() => strongSettingsMatches(query, searchSettingsOptions(language, query, t)), [
		query,
		language,
		t
	]);
	const chatHits = rankItems(query, chatRows, (row) => [row.title, row.preview], LIMIT.chats, (row) => row.title || row.preview);
	const paneHits = rankItems(query, panes, (pane) => [
		pane.recap,
		pane.last_prompt,
		pane.display_name,
		pane.key,
		pane.workspace_name
	], LIMIT.terminals, paneTitle);
	const workspaceHits = rankItems(query, workspaces, (workspace) => [
		workspace.name,
		folderName(workspace.folder),
		workspace.branch
	], LIMIT.workspaces, (workspace) => workspace.name);
	const rowValues = [
		...ranked.map(({ entry: entry$1 }) => `section:${entry$1.key}`),
		...chatHits.map((row) => `chat:${row.kind}:${row.id}`),
		...paneHits.map((pane) => `pane:${pane.workspace_id}:${pane.name}`),
		...workspaceHits.map((workspace) => `workspace:${workspace.id}`),
		...settingsMatches.map((match) => `setting:${match.id}`)
	];
	(0, import_react.useEffect)(() => {
		onFirstChange?.(rowValues[0] ?? "");
	}, [rowValues.join("|")]);
	if (!typed) return null;
	const go = (item) => {
		if (item.surface) setSurface(item.surface);
		setActiveSection(item.section);
		onDone();
	};
	const goToChat = (row) => {
		openChat(row);
		onDone();
	};
	const goToPane = (pane) => {
		setActiveSection("agentic-ide");
		if (!pane.workspace_active) activateWorkspace(pane.workspace_id);
		setSpotlight({
			workspaceId: pane.workspace_id,
			pane: pane.name
		});
		onDone();
	};
	const goToWorkspace = (workspace) => {
		setActiveSection("agentic-ide");
		if (!workspace.active) activateWorkspace(workspace.id);
		onDone();
	};
	const goToSetting = (groupId) => {
		requestSettingsJump(groupId);
		setActiveSection("settings");
		onDone();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.List, {
		className: cn("overflow-y-auto p-1.5 scrollbar-jarvis", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
				className: "px-3 py-6 text-center text-sm text-muted-foreground",
				children: t("quick_switch.no_results")
			}),
			ranked.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
				heading: t("quick_switch.group_sections"),
				className: GROUP,
				children: ranked.map(({ entry: item, label: text, area, shown }) => {
					const here = item.section === activeSection && !item.surface;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultRow, {
						value: `section:${item.key}`,
						testId: `quick-switch-${item.key}`,
						icon: item.icon,
						label: shown,
						detail: here ? t("quick_switch.current") : shown === text ? area : "",
						size,
						onSelect: () => go(item)
					}, item.key);
				})
			}),
			chatHits.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
				heading: t("quick_switch.group_chats"),
				className: GROUP,
				children: chatHits.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultRow, {
					value: `chat:${row.kind}:${row.id}`,
					testId: `quick-switch-chat-${row.id}`,
					icon: row.kind === "voice" ? VoiceIcon : ChatIcon,
					label: chatRowLabel(row, t).text,
					detail: formatChatWhen(row.updatedMs),
					size,
					onSelect: () => goToChat(row)
				}, `${row.kind}:${row.id}`))
			}),
			paneHits.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
				heading: t("quick_switch.group_terminals"),
				className: GROUP,
				children: paneHits.map((pane) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultRow, {
					value: `pane:${pane.workspace_id}:${pane.name}`,
					testId: `quick-switch-pane-${pane.workspace_id}-${pane.name}`,
					icon: TerminalIcon,
					label: paneTitle(pane),
					detail: `${pane.key} · ${pane.workspace_name}`,
					size,
					onSelect: () => goToPane(pane)
				}, `${pane.workspace_id}:${pane.name}`))
			}),
			workspaceHits.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
				heading: t("quick_switch.group_workspaces"),
				className: GROUP,
				children: workspaceHits.map((workspace) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultRow, {
					value: `workspace:${workspace.id}`,
					testId: `quick-switch-workspace-${workspace.id}`,
					icon: FolderIcon,
					label: workspace.name,
					detail: workspace.branch || folderName(workspace.folder),
					size,
					onSelect: () => goToWorkspace(workspace)
				}, workspace.id))
			}),
			settingsMatches.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
				heading: t("quick_switch.group_settings"),
				className: GROUP,
				children: settingsMatches.map((match) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultRow, {
					value: `setting:${match.id}`,
					testId: `quick-switch-setting-${match.id}`,
					icon: SettingsIcon,
					label: match.label,
					detail: label("nav.settings", "Settings"),
					size,
					onSelect: () => goToSetting(match.id)
				}, match.id))
			})
		]
	});
}
export { QuickSwitchList as t };
