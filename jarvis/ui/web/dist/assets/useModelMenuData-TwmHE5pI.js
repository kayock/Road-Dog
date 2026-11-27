import { t as useQueries } from "./useQueries-DtCtIgyt.js";
import { Ba as unknownType, Fa as literalType, Ia as numberType, La as objectType, Ma as arrayType, Na as booleanType, Oc as useQuery, Pa as enumType, Ra as recordType, Wo as joinProviderOptions, Xc as require_react, _s as isApiRunner, fs as fetchAgentChatCatalog, hs as fetchProviderModels, ms as fetchAgentConnections, tl as __toESM, za as stringType, zc as useQueryClient } from "./index-BOzhgzD7.js";
import { s as useSavedHiddenModels } from "./agentProviderPrefs-3Ey03m7Z.js";
var KIND_ORDER$1 = {
	subscription: 0,
	api: 1,
	local: 2
};
function kindOf(option, row) {
	if (isApiRunner(option.runner)) return option.keyless ? "local" : "api";
	if (row ? row.subscription : !isApiRunner(option.runner)) return "subscription";
	return option.keyless ? "local" : "api";
}
function brainSeats(options, society, liveModels = {}, known = /* @__PURE__ */ new Set()) {
	const byId = new Map(society.map((r) => [r.id, r]));
	return options.filter((o) => o.connected && o.enabled !== false).filter((o) => !o.keyless || (liveModels[o.id]?.length ?? 0) > 0).flatMap((option) => {
		const listed = liveModels[option.id] ?? option.curated_models;
		const hidden = new Set(option.hidden_models ?? []);
		const models = hidden.size ? listed.filter((m) => !hidden.has(m.id)) : listed;
		if (listed.length > 0 && models.length === 0) return [];
		const provider = models !== option.curated_models ? {
			...option,
			curated_models: models
		} : option;
		const row = byId.get(provider.id);
		const kind = kindOf(provider, row);
		return [{
			provider,
			kind,
			accounts: kind === "subscription" ? (row?.accounts ?? []).filter((a) => a.connected) : []
		}];
	}).filter((s) => s.kind !== "subscription" || s.accounts.length > 0 || known.has(s.provider.id)).sort((a, b) => KIND_ORDER$1[a.kind] - KIND_ORDER$1[b.kind] || a.provider.label.localeCompare(b.provider.label));
}
function effortsFor(seat, modelId) {
	if (!seat) return [];
	const model$1 = seat.provider.curated_models.find((m) => m.id === modelId);
	if (model$1 && Array.isArray(model$1.efforts)) return model$1.efforts;
	return seat.provider.effort_levels ?? [];
}
function accountChoice(seat) {
	return seat && seat.accounts.length > 1 ? seat.accounts : [];
}
function accountHint(account) {
	return account.email || account.tier || "";
}
function modelGroupOrder(seat) {
	if (seat.provider.runner === "opencode-cli") return 1;
	return {
		subscription: 0,
		api: 2,
		local: 3
	}[seat.kind];
}
function collapsibleModels(seat) {
	return seat.provider.runner === "opencode-cli" || seat.provider.family === "openrouter";
}
function isFreeOpenCodeModel(model$1) {
	return model$1.id === "opencode/big-pickle" || /(?:-free|:free)$/i.test(model$1.id);
}
function visibleModels(seat, models, expanded, search) {
	if (expanded || search.trim() || !collapsibleModels(seat)) return models;
	return seat.provider.runner === "opencode-cli" ? models.filter((model$1) => model$1.id === "" || isFreeOpenCodeModel(model$1)) : [];
}
function modelSeats(options, providers, live, defaultModelLabel = "Default model") {
	const usable = options.map((option) => ({
		...option,
		connected: option.connected || option.cli_installed === true && providers.some((row) => row.id === option.id && row.subscription && row.accounts.some((account) => account.connected))
	}));
	return brainSeats(usable, providers, Object.fromEntries(Object.entries(live).map(([id, models]) => {
		const metadata = new Map(options.find((option) => option.id === id)?.curated_models.map((model$1) => [model$1.id, model$1]));
		return [id, models.map((model$1) => ({
			...metadata.get(model$1.id),
			...model$1
		}))];
	})), new Set(usable.filter((option) => option.connected).map((option) => option.id))).map((seat) => {
		const models = [...new Map(seat.provider.curated_models.filter((model$1) => model$1.tools !== false).map((model$1) => [model$1.id, model$1])).values()];
		if (seat.kind === "subscription" && models.length === 0) models.push({
			id: "",
			label: defaultModelLabel
		});
		return {
			...seat,
			provider: {
				...seat.provider,
				curated_models: models
			}
		};
	});
}
function runtimeSeats(all, supported, gateway = [], login = []) {
	const usable = new Set(supported);
	const served = new Set(gateway);
	const onLogin = new Set(login);
	return all.filter((seat) => usable.has(seat.provider.id)).map((seat) => seat.kind === "subscription" && !served.has(seat.provider.id) ? {
		...seat,
		kind: onLogin.has(seat.provider.id) ? "subscription" : "api",
		accounts: [],
		extraUsage: onLogin.has(seat.provider.id),
		provider: {
			...seat.provider,
			curated_models: apiModels(seat.provider.curated_models)
		}
	} : seat);
}
function seatBlocked(seat, blocked, pinnedAccount = "") {
	const refused = blocked?.[seat.provider.id];
	if (!refused || typeof refused !== "object") return "";
	const way = seat.extraUsage || pinnedAccount === "subscription" ? "subscription" : seat.kind;
	return typeof refused[way] === "string" ? refused[way] : "";
}
function apiModels(models) {
	return models.filter((model$1) => /\d/.test(model$1.id));
}
function providerTitle(seat, t) {
	const names = {
		"claude-cli": "model_group_anthropic",
		"codex-cli": "model_group_chatgpt",
		"grok-cli": "model_group_grok",
		"agy-cli": "model_group_google"
	};
	if (seat.kind === "subscription") {
		const key = names[seat.provider.runner];
		const title = key ? t(`society.chat.${key}`) : seat.provider.label;
		return seat.extraUsage ? `${title} · ${t("society.chat.model_extra_usage")}` : title;
	}
	return `${seat.provider.label} · ${t(`society.create.kind_${seat.kind}`)}`;
}
function modelEffort(seat, model$1, preferred) {
	const levels = effortsFor(seat, model$1);
	return levels.includes(preferred) ? preferred : levels.includes(seat.provider.default_effort) ? seat.provider.default_effort : levels[0] ?? "";
}
function matchesModel(seat, model$1, query, title) {
	if (!query.trim()) return true;
	const fold = (value) => value.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[-_./]/g, " ");
	const haystack = fold([
		title,
		seat.provider.id,
		seat.provider.label,
		model$1.id,
		model$1.label,
		...seat.accounts.map((account) => `${account.label} ${account.email ?? ""}`)
	].join(" "));
	return fold(query).trim().split(/\s+/).every((word) => haystack.includes(word));
}
const AGENT_RUNTIMES = [
	"jarvis",
	"hermes",
	"openclaw"
];
async function fetchSocietyProviders() {
	const res = await fetch("/api/society/providers");
	if (!res.ok) throw new Error(`society providers ${res.status}`);
	const body = await res.json();
	return Array.isArray(body.providers) ? body.providers : [];
}
const MODEL_MENU_SNAPSHOT_KEY = "jarvis.society.model-menu.v1";
var MAX_BYTES = 2e6;
var text = stringType().max(1024);
var model = objectType({
	id: text,
	label: text,
	efforts: arrayType(text).optional(),
	note: text.optional()
});
var snapshotSchema = objectType({
	version: literalType(1),
	savedAt: numberType().finite().positive(),
	catalog: objectType({
		default_cwd: unknownType().transform(() => ""),
		shell: unknownType().transform(() => ""),
		providers: arrayType(objectType({
			id: text,
			label: text,
			family: text,
			runner: text,
			models_source: enumType(["live", "curated"]),
			curated_models: arrayType(model).max(2e4),
			default_model: text,
			keyless: booleanType(),
			native_resume: booleanType(),
			effort_levels: arrayType(text),
			default_effort: text,
			permission_modes: arrayType(objectType({
				id: text,
				label: text,
				description: text
			})),
			default_permission_mode: text,
			cli_installed: booleanType().nullable(),
			agent: text.optional(),
			enabled: booleanType().optional(),
			hidden_models: arrayType(text).max(2e4).optional()
		})).max(100)
	}),
	connections: arrayType(objectType({
		jarvis: text,
		label: text.optional(),
		key_set: booleanType(),
		api_key_set: booleanType().optional(),
		oauth_connected: booleanType().optional(),
		is_active_brain: booleanType().default(false),
		keyless: booleanType().optional()
	})).max(100),
	providers: arrayType(objectType({
		id: text,
		label: text,
		family: text,
		runner: text,
		subscription: booleanType(),
		keyless: booleanType(),
		platform: text.nullable(),
		accounts: arrayType(objectType({
			id: text,
			label: text,
			connected: booleanType(),
			mode: text,
			message: unknownType().transform(() => ""),
			email: unknownType().transform(() => null),
			tier: unknownType().transform(() => null),
			warning: unknownType().transform(() => null)
		})).max(100)
	})).max(100),
	live: recordType(arrayType(model).max(2e4)),
	liveUpdatedAt: recordType(numberType().finite().nonnegative()).default({})
});
var memory;
var lastSource;
function readModelMenuSnapshot() {
	if (memory !== void 0) return memory;
	memory = null;
	try {
		const raw = localStorage.getItem(MODEL_MENU_SNAPSHOT_KEY);
		if (!raw || raw.length > MAX_BYTES) return null;
		const result = snapshotSchema.safeParse(JSON.parse(raw));
		if (result.success && result.data.savedAt <= Date.now() + 6e4) memory = result.data;
	} catch {}
	return memory;
}
function writeModelMenuSnapshot(snapshot) {
	if (lastSource?.catalog === snapshot.catalog && lastSource.connections === snapshot.connections && lastSource.providers === snapshot.providers && lastSource.savedAt === snapshot.savedAt && Object.keys(lastSource.live).length === Object.keys(snapshot.live).length && Object.keys(snapshot.live).every((id) => lastSource.live[id] === snapshot.live[id] && lastSource.liveUpdatedAt?.[id] === snapshot.liveUpdatedAt?.[id])) return;
	const result = snapshotSchema.safeParse(snapshot);
	if (!result.success) return;
	lastSource = snapshot;
	memory = result.data;
	try {
		const raw = JSON.stringify(result.data);
		if (raw.length <= MAX_BYTES) localStorage.setItem(MODEL_MENU_SNAPSHOT_KEY, raw);
	} catch {}
}
var VERSION = /(\d+(?:[.-]\d+)*)/;
var NOISE = /(?:[-_]?\d{8}\b)|\[[^\]]*\]|\(\s*[^)]*\)/g;
function parse(model$1) {
	for (const source of [model$1.label, model$1.id.split("/").pop() ?? model$1.id]) {
		const text$1 = (source ?? "").replace(NOISE, " ").trim();
		const match = VERSION.exec(text$1);
		if (!match) continue;
		const version = match[1].split(/[.-]/).map(Number);
		if (version.some((part) => !Number.isFinite(part)) || version[0] > 999) continue;
		return {
			line: (text$1.slice(0, match.index) + " " + text$1.slice(match.index + match[0].length)).toLocaleLowerCase().replace(/[^a-z]+/g, " ").trim(),
			version
		};
	}
	return null;
}
function compareVersions(a, b) {
	for (let i = 0; i < Math.max(a.length, b.length); i++) {
		const diff = (a[i] ?? 0) - (b[i] ?? 0);
		if (diff) return diff;
	}
	return 0;
}
function rankModels(models) {
	const parsed = models.map((model$1) => ({
		model: model$1,
		info: model$1.id ? parse(model$1) : null
	}));
	if (!parsed.some((entry) => entry.info)) return {
		current: [...models],
		older: []
	};
	const newest = /* @__PURE__ */ new Map();
	for (const { info } of parsed) {
		if (!info) continue;
		const best = newest.get(info.line);
		if (!best || compareVersions(info.version, best) > 0) newest.set(info.line, info.version);
	}
	const byVersion = (a, b) => compareVersions(b.info?.version ?? [], a.info?.version ?? []);
	const current = [];
	const older = [];
	for (const entry of parsed) if (!entry.model.id) current.unshift(entry);
	else if (entry.info && compareVersions(entry.info.version, newest.get(entry.info.line)) === 0) current.push(entry);
	else older.push(entry);
	const head = current.filter((entry) => !entry.model.id);
	const rest = current.filter((entry) => entry.model.id).sort(byVersion);
	return {
		current: [...head, ...rest].map((entry) => entry.model),
		older: older.sort(byVersion).map((entry) => entry.model)
	};
}
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
const MODEL_ACCESS_KEY = "jarvis.modelAccess.v1";
var listeners = /* @__PURE__ */ new Set();
var cached = {
	raw: null,
	value: {}
};
var EMPTY = {};
function modelAccessFamily(family) {
	return family === "antigravity" ? "gemini" : family;
}
function read() {
	let raw;
	try {
		raw = window.localStorage.getItem(MODEL_ACCESS_KEY);
	} catch {
		return cached.value;
	}
	if (raw === cached.raw) return cached.value;
	let value = {};
	try {
		const parsed = JSON.parse(raw ?? "{}");
		if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) value = Object.fromEntries(Object.entries(parsed).filter(([, kind]) => kind === "subscription" || kind === "api" || kind === "local"));
	} catch {}
	cached = {
		raw,
		value
	};
	return value;
}
function subscribe(listener) {
	listeners.add(listener);
	const storage = (event) => {
		if (event.key === "jarvis.modelAccess.v1" || event.key === null) listener();
	};
	window.addEventListener("storage", storage);
	return () => {
		listeners.delete(listener);
		window.removeEventListener("storage", storage);
	};
}
function useModelAccess() {
	return [(0, import_react.useSyncExternalStore)(subscribe, read, () => EMPTY), (0, import_react.useCallback)((family, kind) => {
		const value = {
			...read(),
			[modelAccessFamily(family)]: kind
		};
		let raw = cached.raw;
		try {
			const serialized = JSON.stringify(value);
			window.localStorage.setItem(MODEL_ACCESS_KEY, serialized);
			raw = serialized;
		} catch {}
		cached = {
			raw,
			value
		};
		listeners.forEach((listener) => listener());
	}, [])];
}
function preferredModelAccess(options, preferred) {
	const available = options.filter((option) => !option.disabled);
	return available.find((option) => option.kind === preferred) ?? available.find((option) => option.kind === "subscription") ?? available[0] ?? options[0];
}
const API_KEY_ACCOUNT = "api-key";
const SUBSCRIPTION_ACCOUNT = "subscription";
var KIND_ORDER = {
	subscription: 0,
	api: 1,
	local: 2
};
var BRANDS = {
	claude: {
		label: "Anthropic Claude",
		logo: "claude-api"
	},
	openai: {
		label: "OpenAI",
		logo: "openai"
	},
	xai: {
		label: "xAI Grok",
		logo: "grok"
	},
	gemini: {
		label: "Google Gemini",
		logo: "gemini"
	}
};
function brandOf(seat) {
	return modelAccessFamily(seat.provider.family || seat.provider.id);
}
function optionsFor(seat, named, external, blocked = {}) {
	const single = {
		kind: seat.kind,
		seat,
		accountId: "",
		extraUsage: Boolean(seat.extraUsage)
	};
	const refused = Object.keys(blocked).filter((way) => !named?.includes(way));
	if (!named && !refused.length) return [single];
	const ways = [...named ?? [], ...refused];
	const viaKey = {
		...seat,
		kind: "api",
		accounts: [],
		extraUsage: false,
		provider: {
			...seat.provider,
			curated_models: apiModels(seat.provider.curated_models)
		}
	};
	const options = [];
	if (ways.includes("subscription") && (external || seat.provider.cli_installed !== false)) options.push(external ? {
		kind: "subscription",
		seat: {
			...viaKey,
			kind: "subscription",
			extraUsage: true
		},
		accountId: SUBSCRIPTION_ACCOUNT,
		extraUsage: true
	} : {
		kind: "subscription",
		seat: {
			...seat,
			kind: "subscription"
		},
		accountId: SUBSCRIPTION_ACCOUNT,
		extraUsage: false
	});
	if (ways.includes("api")) options.push({
		kind: "api",
		seat: viaKey,
		accountId: API_KEY_ACCOUNT,
		extraUsage: false
	});
	for (const option of options) if (blocked[option.kind]) option.blocked = blocked[option.kind];
	return options;
}
var BLOCKED_REASONS = new Set(["extra_usage_off", "extra_usage_spent"]);
function blockedReasonKey(code) {
	return BLOCKED_REASONS.has(code) ? `society.create_agent.access_blocked_${code}` : "society.create_agent.access_blocked";
}
function pickableOption(choice, kind = "") {
	const open = choice?.options.filter((option) => !option.blocked) ?? [];
	return open.find((option) => option.kind === kind) ?? open[0] ?? null;
}
function providerChoices(seats, access = {}, external = false, accessBlocked = {}) {
	const byBrand = /* @__PURE__ */ new Map();
	for (const seat of seats) {
		const id = brandOf(seat);
		let choice = byBrand.get(id);
		if (!choice) {
			const brand = BRANDS[id];
			choice = {
				id,
				label: brand?.label ?? seat.provider.label,
				logo: brand?.logo ?? seat.provider.id,
				mark: brand ? void 0 : seat.provider.agentMark || void 0,
				logoUrl: brand ? void 0 : seat.provider.logoUrl,
				options: []
			};
			byBrand.set(id, choice);
		}
		const blocked = accessBlocked[seat.provider.id];
		for (const option of optionsFor(seat, access[seat.provider.id], external, blocked && typeof blocked === "object" ? blocked : {})) if (!choice.options.some((known) => known.kind === option.kind)) choice.options.push(option);
	}
	const best = (choice) => Math.min(...choice.options.map((option) => (option.blocked ? 10 : 0) + KIND_ORDER[option.kind]));
	return [...byBrand.values()].filter((choice) => choice.options.length > 0).map((choice) => ({
		...choice,
		options: [...choice.options].sort((a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind])
	})).sort((a, b) => best(a) - best(b) || a.label.localeCompare(b.label));
}
function accessModels(option) {
	if (!option) return [];
	const models = option.seat.provider.curated_models;
	if (option.kind === "local") return models;
	const ranked = rankModels(models);
	return [...ranked.current, ...ranked.older];
}
function defaultModel(option) {
	const models = accessModels(option);
	const preferred = option?.seat.provider.default_model ?? "";
	if (models.some((model$1) => model$1.id === preferred)) return preferred;
	return models[0]?.id ?? "";
}
var EMPTY_CONNECTIONS = [];
var QUERY_POLICY = {
	staleTime: 6e4,
	gcTime: 30 * 6e4,
	refetchOnWindowFocus: false
};
var isLogin = (account) => Boolean(account) && account !== "api-key" && account !== "subscription";
function useModelMenuData(chatCatalog = null, chatConnections = EMPTY_CONNECTIONS, accountIds = {}, behavior = {}) {
	const client = useQueryClient();
	const savedHidden = useSavedHiddenModels((state) => state.hidden);
	const refetchOnMount = behavior.refreshOnMount ? "always" : true;
	const previousChatCatalog = (0, import_react.useRef)(chatCatalog);
	const [saved] = (0, import_react.useState)(readModelMenuSnapshot);
	const catalog = useQuery({
		queryKey: [
			"agent-chat",
			"catalog",
			"society"
		],
		queryFn: () => fetchAgentChatCatalog("society"),
		initialData: saved?.catalog,
		initialDataUpdatedAt: saved?.savedAt,
		...QUERY_POLICY,
		refetchOnMount
	});
	const connections = useQuery({
		queryKey: ["agent-chat", "connections"],
		queryFn: fetchAgentConnections,
		initialData: saved?.connections,
		initialDataUpdatedAt: saved?.savedAt,
		placeholderData: chatCatalog ? chatConnections : void 0,
		...QUERY_POLICY
	});
	const providers = useQuery({
		queryKey: ["society", "providers"],
		queryFn: fetchSocietyProviders,
		initialData: saved?.providers,
		initialDataUpdatedAt: saved?.savedAt,
		...QUERY_POLICY
	});
	const fallbackCatalog = (0, import_react.useMemo)(() => chatCatalog ? {
		...chatCatalog,
		providers: chatCatalog.providers.map((provider) => provider.runner.endsWith("-cli") ? {
			...provider,
			curated_models: []
		} : provider)
	} : void 0, [chatCatalog]);
	const availableCatalog = catalog.data ?? fallbackCatalog;
	const availableConnections = connections.data ?? (chatCatalog ? chatConnections : void 0);
	const cliProviders = new Set((availableCatalog?.providers ?? []).filter((provider) => provider.runner.endsWith("-cli")).map((provider) => provider.id));
	const scopedIds = [...new Set(Object.entries(accountIds).filter(([provider, account]) => cliProviders.has(provider) && isLogin(account)).map(([, account]) => account))].sort();
	const scopeKey = JSON.stringify(scopedIds);
	const accountKey = JSON.stringify(accountIds);
	const combineScoped = (0, import_react.useCallback)((queries) => ({
		data: Object.fromEntries(queries.map((query, index) => [JSON.parse(scopeKey)[index], query.data])),
		pending: queries.some((query) => query.isPending),
		fetching: queries.some((query) => query.isFetching),
		failed: queries.some((query) => query.isError),
		refresh: () => Promise.all(queries.map((query) => query.refetch()))
	}), [scopeKey]);
	const scopedCatalogs = useQueries({
		queries: scopedIds.map((accountId) => ({
			queryKey: [
				"agent-chat",
				"catalog",
				"society",
				accountId
			],
			queryFn: () => fetchAgentChatCatalog("society", { accountId }),
			...QUERY_POLICY,
			refetchOnMount
		})),
		combine: combineScoped
	});
	const options = (0, import_react.useMemo)(() => {
		const seats = JSON.parse(accountKey);
		return joinProviderOptions((availableCatalog?.providers ?? []).map((provider) => {
			const accountId = seats[provider.id];
			if (!isLogin(accountId) || !provider.runner.endsWith("-cli")) return provider;
			return scopedCatalogs.data[accountId]?.providers.find((row) => row.id === provider.id) ?? {
				...provider,
				curated_models: []
			};
		}), availableConnections ?? []).map((option) => savedHidden ? {
			...option,
			hidden_models: savedHidden[option.id] ?? []
		} : option);
	}, [
		availableCatalog,
		availableConnections,
		accountKey,
		scopedCatalogs.data,
		savedHidden
	]);
	const liveProviders = (0, import_react.useMemo)(() => options.filter((option) => option.connected && option.enabled !== false && option.models_source === "live"), [options]);
	const combine = (0, import_react.useCallback)((queries) => ({
		live: Object.fromEntries(queries.flatMap((query, index) => query.data ? [[liveProviders[index].id, query.data]] : [])),
		updatedAt: Object.fromEntries(queries.map((query, index) => [liveProviders[index].id, query.dataUpdatedAt])),
		fetching: queries.some((query) => query.isFetching),
		errors: queries.flatMap((query, index) => query.isError ? [liveProviders[index].id] : []),
		refresh: () => Promise.all(queries.map((query) => query.refetch()))
	}), [liveProviders]);
	const models = useQueries({
		queries: liveProviders.map((provider) => ({
			queryKey: [
				"society",
				"model-menu",
				"live",
				provider.id
			],
			queryFn: async () => (await fetchProviderModels(provider.id, { strict: true })).map((model$1) => ({
				...model$1,
				label: model$1.label ?? model$1.name ?? model$1.id
			})),
			initialData: saved?.live[provider.id],
			initialDataUpdatedAt: saved?.liveUpdatedAt?.[provider.id] ?? saved?.savedAt,
			enabled: Boolean(availableConnections),
			...QUERY_POLICY,
			staleTime: 10 * 6e4,
			retry: false,
			refetchOnMount
		})),
		combine
	});
	(0, import_react.useEffect)(() => {
		if (chatCatalog && previousChatCatalog.current !== chatCatalog) {
			client.invalidateQueries({ queryKey: [
				"agent-chat",
				"catalog",
				"society"
			] });
			client.setQueryData(["agent-chat", "connections"], chatConnections);
		}
		previousChatCatalog.current = chatCatalog;
	}, [
		client,
		chatCatalog,
		chatConnections
	]);
	(0, import_react.useEffect)(() => {
		if (!catalog.data || !availableConnections || !providers.data) return;
		const timer = window.setTimeout(() => writeModelMenuSnapshot({
			version: 1,
			savedAt: Math.min(catalog.dataUpdatedAt || Date.now(), connections.dataUpdatedAt || Date.now(), providers.dataUpdatedAt || Date.now()),
			catalog: catalog.data,
			connections: availableConnections,
			providers: providers.data,
			live: models.live,
			liveUpdatedAt: models.updatedAt
		}), 100);
		return () => window.clearTimeout(timer);
	}, [
		catalog.data,
		availableConnections,
		providers.data,
		models.live,
		models.updatedAt,
		catalog.dataUpdatedAt,
		connections.dataUpdatedAt,
		providers.dataUpdatedAt
	]);
	return {
		options,
		live: models.live,
		providers: providers.data,
		modelErrors: models.errors,
		loading: !availableCatalog || !availableConnections || scopedCatalogs.pending,
		refreshing: scopedCatalogs.fetching || catalog.isFetching || connections.isFetching || providers.isFetching || models.fetching,
		failed: scopedCatalogs.failed || !availableCatalog && catalog.isError || !availableConnections && connections.isError,
		refreshFailed: scopedCatalogs.failed || catalog.isError || connections.isError || providers.isError,
		refresh: () => Promise.all([
			catalog.refetch(),
			connections.refetch(),
			providers.refetch(),
			models.refresh(),
			scopedCatalogs.refresh()
		])
	};
}
export { accountChoice as C, visibleModels as S, effortsFor as T, modelGroupOrder as _, blockedReasonKey as a, runtimeSeats as b, providerChoices as c, useModelAccess as d, rankModels as f, modelEffort as g, matchesModel as h, accessModels as i, modelAccessFamily as l, collapsibleModels as m, API_KEY_ACCOUNT as n, defaultModel as o, AGENT_RUNTIMES as p, SUBSCRIPTION_ACCOUNT as r, pickableOption as s, useModelMenuData as t, preferredModelAccess as u, modelSeats as v, accountHint as w, seatBlocked as x, providerTitle as y };
