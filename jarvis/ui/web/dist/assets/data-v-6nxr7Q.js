import { Ec as create, Oc as useQuery, Tc as NEUTRAL_ASSISTANT_NAME, Xc as require_react, m as useCreateAgentDialog, tl as __toESM, wc as useEventStore, zc as useQueryClient } from "./index-BOzhgzD7.js";
import { a as resolvePalette, n as PALETTE_PRESETS } from "./figureRecipe-BRnaWN-p.js";
var SAMPLE_LAST_ACTIVE_MS = Date.UTC(2026, 7, 20, 12, 0, 0);
var SAMPLE_CREATED_MS = Date.UTC(2026, 7, 1, 9, 0, 0);
const SAMPLE_ROSTER = [
	{
		agentId: "jarvis",
		name: "Sam",
		title: "Chief executive — leads and delegates the whole team",
		description: [
			"You are the lead of this agent society: its chief executive.",
			"You own the goals, not the tasks. Every request that reaches you is triaged,",
			"shaped into a clear assignment and handed to the orchestrator or specialist",
			"whose title fits; you never do a specialist's work yourself.",
			"You keep the team small, the hand-offs written (what was done, evidence, what",
			"remains, who owns the next step) and the spend inside the daily budget.",
			"Ask-tier actions always wait for the person; you never route around an approval.",
			"You speak for the team in the person's language and report outcomes, not activity."
		].join(" "),
		tier: "lead",
		provider: "anthropic",
		providerLabel: "Anthropic",
		model: "claude-sonnet-5",
		figure: {
			contract: 1,
			archetype: "spirit",
			base: "gigi",
			parts: {},
			style: "spirit"
		},
		palette: {
			primary: "#1f2a44",
			secondary: "#f2f2ee",
			accent: "#c9a227"
		},
		grantMode: "all",
		effort: "",
		focus: [],
		denies: [],
		approvalRules: {
			requireApproval: [],
			alwaysAllow: []
		},
		lifecycle: "active",
		toolGrants: [
			"delegate-to-agent",
			"society-status",
			"approvals"
		],
		permissionCeiling: "ask",
		dailyBudgetUsd: 10,
		checkpoint: "idle",
		state: "idle",
		createdMs: SAMPLE_CREATED_MS,
		chatSessionId: null,
		routines: [{
			id: "jarvis-daily-standup",
			label: "Morning stand-up digest",
			schedule: "daily 08:00",
			nextFire: "2026-09-02T08:00:00Z"
		}],
		maxConcurrentRuns: 1,
		workspaceDir: "society/jarvis/workspace",
		wikiNamespace: "society/jarvis/",
		stats: {
			runs: 42,
			totalCostUsd: 6.1,
			spentTodayUsd: .4,
			lastActiveMs: SAMPLE_LAST_ACTIVE_MS
		}
	},
	{
		agentId: "scout",
		name: "Scout",
		title: "Research orchestrator",
		description: "You own research. You break a question into sources, read broadly, keep evidence links and hand back a brief with what remains open.",
		tier: "orchestrator",
		provider: "anthropic",
		providerLabel: "Anthropic",
		model: "claude-sonnet-5",
		figure: {
			contract: 1,
			archetype: "biped",
			base: "rogue",
			parts: { back: "back-rogue-cape" },
			palette: {
				skin: "#d8a37c",
				hair: "#2a1d15",
				primary: "#c05b3c",
				secondary: "#efe0cd",
				accent: "#8fd0a0",
				shoes: "#2b2b2b"
			}
		},
		palette: {
			primary: "#c05b3c",
			secondary: "#efe0cd",
			accent: "#8fd0a0"
		},
		grantMode: "all",
		effort: "",
		focus: [],
		denies: [],
		approvalRules: {
			requireApproval: [],
			alwaysAllow: []
		},
		lifecycle: "active",
		toolGrants: [
			"web_search",
			"web_fetch",
			"files_read",
			"knowledge_write"
		],
		permissionCeiling: "monitor",
		dailyBudgetUsd: 5,
		checkpoint: "desk",
		state: "working",
		createdMs: SAMPLE_CREATED_MS,
		chatSessionId: null,
		routines: [{
			id: "scout-morning-brief",
			label: "Morning research brief",
			schedule: "daily 07:00",
			nextFire: "2026-09-02T07:00:00Z"
		}],
		maxConcurrentRuns: 1,
		workspaceDir: "society/scout/workspace",
		wikiNamespace: "society/scout/",
		stats: {
			runs: 128,
			totalCostUsd: 14.7,
			spentTodayUsd: 1.2,
			lastActiveMs: SAMPLE_LAST_ACTIVE_MS
		}
	},
	{
		agentId: "archivist",
		name: "Archivist",
		title: "Knowledge curator",
		description: "You own the shared memory. You turn finished work into short, sourced wiki notes under your namespace and propose what deserves promotion to shared knowledge.",
		tier: "specialist",
		provider: "ollama",
		providerLabel: "Ollama (local)",
		model: "qwen3:8b",
		figure: {
			contract: 1,
			archetype: "biped",
			base: "mage",
			parts: { hand_l: "hand_l-spellbook" },
			palette: {
				skin: "#e9c3a3",
				hair: "#6b6b6b",
				primary: "#5a7a4f",
				secondary: "#e8dcc4",
				accent: "#e8c46b",
				shoes: "#3a2a1e"
			},
			heightM: 1.7
		},
		palette: {
			primary: "#5a7a4f",
			secondary: "#e8dcc4",
			accent: "#e8c46b"
		},
		grantMode: "allowlist",
		effort: "",
		focus: [],
		denies: [],
		approvalRules: {
			requireApproval: [],
			alwaysAllow: []
		},
		lifecycle: "active",
		toolGrants: [
			"knowledge_write",
			"knowledge_search",
			"files_read"
		],
		permissionCeiling: "safe",
		dailyBudgetUsd: .5,
		checkpoint: "archive",
		state: "waiting",
		createdMs: SAMPLE_CREATED_MS,
		chatSessionId: null,
		routines: [{
			id: "archivist-nightly-curation",
			label: "Nightly curation pass",
			schedule: "daily 23:30",
			nextFire: "2026-09-01T23:30:00Z"
		}],
		maxConcurrentRuns: 1,
		workspaceDir: "society/archivist/workspace",
		wikiNamespace: "society/archivist/",
		stats: {
			runs: 311,
			totalCostUsd: .9,
			spentTodayUsd: .05,
			lastActiveMs: SAMPLE_LAST_ACTIVE_MS
		}
	}
];
const CEREMONY_TIMEOUT_MS = 9e4;
const ATTACH_GRACE_MS = 2e3;
var overrides = /* @__PURE__ */ new Map();
var attachTimer = null;
var capTimer = null;
function clearTimers() {
	if (attachTimer !== null) clearTimeout(attachTimer);
	if (capTimer !== null) clearTimeout(capTimer);
	attachTimer = null;
	capTimer = null;
}
const useRetireStore = create((set, get) => ({
	ceremony: null,
	phase: "done",
	begin: (ceremony) => {
		if (get().ceremony !== null) return false;
		overrides.clear();
		clearTimers();
		set({
			ceremony: {
				...ceremony,
				startedMs: Date.now()
			},
			phase: "march"
		});
		attachTimer = setTimeout(() => {
			attachTimer = null;
			if (get().ceremony !== null) get().cutShort();
		}, ATTACH_GRACE_MS);
		capTimer = setTimeout(() => {
			capTimer = null;
			if (get().ceremony !== null) get().cutShort();
		}, CEREMONY_TIMEOUT_MS);
		return true;
	},
	attach: () => {
		if (attachTimer === null) return;
		clearTimeout(attachTimer);
		attachTimer = null;
	},
	setPhase: (phase) => {
		if (get().phase === phase) return;
		set({ phase });
	},
	finish: () => {
		const active = get().ceremony;
		overrides.clear();
		clearTimers();
		set({
			ceremony: null,
			phase: "done"
		});
		active?.commit();
	},
	cutShort: () => {
		const active = get().ceremony;
		overrides.clear();
		clearTimers();
		set({
			ceremony: null,
			phase: "done"
		});
		active?.commit();
	}
}));
function beginRetirement(ceremony) {
	return useRetireStore.getState().begin(ceremony);
}
var mountedStages = 0;
function retirementStageMounted() {
	return mountedStages > 0;
}
function retirementRunning() {
	return useRetireStore.getState().ceremony !== null;
}
var SEEN_KEY = "jarvis.world.foundry.seen.v2";
function readSeen() {
	try {
		const raw = sessionStorage.getItem(SEEN_KEY);
		if (!raw) return /* @__PURE__ */ new Map();
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return /* @__PURE__ */ new Map();
		const rows = parsed.filter((v) => Array.isArray(v) && typeof v[0] === "string" && typeof v[1] === "number");
		return new Map(rows);
	} catch {
		return /* @__PURE__ */ new Map();
	}
}
function writeSeen(seen) {
	try {
		sessionStorage.setItem(SEEN_KEY, JSON.stringify([...seen].slice(-200)));
	} catch {}
}
const useSpawnStore = create((set, get) => ({
	portalOpenedMs: 0,
	focusRequestedMs: 0,
	announced: /* @__PURE__ */ new Set(),
	seen: typeof sessionStorage === "undefined" ? /* @__PURE__ */ new Map() : readSeen(),
	announce: (agentId) => {
		const announced = new Set(get().announced);
		announced.add(agentId);
		set({
			announced,
			focusRequestedMs: Date.now()
		});
	},
	clearFocus: () => set({ focusRequestedMs: 0 }),
	claim: (agentId, createdMs, now = Date.now()) => {
		const { seen, announced } = get();
		const decided = seen.get(agentId);
		if (decided !== void 0) return decided > 0 && now - decided < 15e3;
		const wasAnnounced = announced.has(agentId);
		const isFresh = Number.isFinite(createdMs) && now - createdMs < 6e4;
		const owed = wasAnnounced || isFresh;
		const nextSeen = new Map(seen);
		nextSeen.set(agentId, owed ? now : 0);
		writeSeen(nextSeen);
		if (!owed) {
			set({ seen: nextSeen });
			return false;
		}
		const nextAnnounced = new Set(announced);
		nextAnnounced.delete(agentId);
		set({
			seen: nextSeen,
			announced: nextAnnounced,
			portalOpenedMs: now
		});
		return true;
	}
}));
function announceSpawn(agentId) {
	useSpawnStore.getState().announce(agentId);
}
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var AgentNameTaken = class extends Error {
	constructor() {
		super("An agent with this name already exists");
		this.name = "AgentNameTaken";
	}
};
var RuntimeProviderUnsupported = class extends Error {
	constructor(detail) {
		super(detail);
		this.name = "RuntimeProviderUnsupported";
	}
};
function requestError(body, fallback) {
	const reason = body?.detail;
	if (typeof reason === "string") return new Error(reason);
	if (reason && typeof reason === "object") {
		const typed = reason;
		const text = typeof typed.detail === "string" ? typed.detail : fallback;
		return typed.reason === "runtime_provider_unsupported" ? new RuntimeProviderUnsupported(text) : new Error(text);
	}
	return new Error(fallback);
}
var RETIRED_SAMPLE = /* @__PURE__ */ new Set();
function defaultFigureFor(agentId, tier) {
	if (tier === "lead") return {
		contract: 1,
		archetype: "spirit",
		base: "gigi",
		parts: {},
		style: "spirit"
	};
	let h = 0;
	for (let i = 0; i < agentId.length; i++) h = h * 31 + agentId.charCodeAt(i) | 0;
	return {
		contract: 1,
		archetype: "biped",
		base: "rogue",
		parts: {},
		palette: { ...PALETTE_PRESETS[Math.abs(h) % PALETTE_PRESETS.length].palette }
	};
}
function recipeFromAvatar(avatar) {
	if (!avatar || avatar.contract !== 1 || typeof avatar.base !== "string") return null;
	return avatar;
}
function paletteFor(figure) {
	const p = resolvePalette(figure);
	return {
		primary: p.primary,
		secondary: p.secondary,
		accent: p.accent
	};
}
var PROVIDER_LABELS = {
	anthropic: "Anthropic",
	openai: "OpenAI",
	google: "Google",
	gemini: "Google Gemini",
	xai: "xAI",
	groq: "Groq",
	mistral: "Mistral",
	deepseek: "DeepSeek",
	ollama: "Ollama (local)",
	"local-openai": "Local server",
	"claude-api": "Anthropic Claude",
	"openai-codex": "OpenAI Codex",
	grok: "xAI Grok",
	openrouter: "OpenRouter",
	nvidia: "NVIDIA NIM"
};
function rowToAgent(row) {
	const tier = row.tier;
	const stored = recipeFromAvatar(row.avatar);
	const companion = row.avatar && typeof row.avatar === "object" ? row.avatar.companion : void 0;
	const figure = stored ?? (companion ? {
		...defaultFigureFor(row.agent_id, tier),
		companion
	} : defaultFigureFor(row.agent_id, tier));
	const runState = row.state === "paused" ? "paused" : row.run_state ?? "idle";
	return {
		agentId: row.agent_id,
		name: row.name,
		title: row.title,
		description: row.description,
		tier,
		provider: row.provider,
		providerLabel: row.provider ? PROVIDER_LABELS[row.provider] ?? row.provider : "",
		model: row.model,
		accountId: row.account_id,
		computerId: row.computer_id ?? null,
		runtime: row.runtime ?? "jarvis",
		effort: row.effort,
		figure,
		palette: paletteFor(figure),
		grantMode: row.grant_mode,
		toolGrants: row.grants ?? [],
		focus: row.focus ?? [],
		denies: row.denies ?? [],
		approvalRules: {
			requireApproval: row.approval_rules?.require_approval ?? [],
			alwaysAllow: row.approval_rules?.always_allow ?? []
		},
		permissionCeiling: row.permission_ceiling,
		approvalMode: row.approval_mode ?? null,
		dailyBudgetUsd: row.daily_budget_usd,
		checkpoint: row.checkpoint,
		state: runState,
		lifecycle: row.state,
		createdMs: row.created_ms,
		maxConcurrentRuns: row.max_concurrent_runs ?? 1,
		workspaceDir: row.workspace_dir ?? "",
		wikiNamespace: row.wiki_namespace ?? "",
		chatSessionId: row.session_id || null,
		routines: [],
		stats: {
			runs: row.stats?.runs ?? 0,
			totalCostUsd: row.stats?.total_cost_usd ?? 0,
			spentTodayUsd: row.stats?.spent_today_usd ?? 0,
			lastActiveMs: row.stats?.last_active_ms ?? null
		}
	};
}
var ROSTER_QUERY_KEY = ["society", "roster"];
var CAPABILITIES_QUERY_KEY = ["society", "capabilities"];
async function fetchSocietyRoster() {
	try {
		const res = await fetch("/api/society/agents");
		if (res.ok) {
			const rows = (await res.json()).agents ?? [];
			if (rows.length > 0) return {
				agents: rows.map(rowToAgent),
				sample: false
			};
		}
	} catch {}
	return {
		agents: [...SAMPLE_ROSTER].filter((a) => !RETIRED_SAMPLE.has(a.agentId)),
		sample: true
	};
}
function patchRoster(client, change) {
	client.setQueryData(ROSTER_QUERY_KEY, (prev) => prev && !prev.sample ? {
		...prev,
		agents: change(prev.agents)
	} : prev);
	client.invalidateQueries({ queryKey: ROSTER_QUERY_KEY });
}
function withLeadName(data, assistantName) {
	const name = assistantName.trim();
	if (!name || name === "Assistant") return data;
	if (!data.agents.some((a) => a.tier === "lead" && a.name !== name)) return data;
	return {
		...data,
		agents: data.agents.map((a) => a.tier === "lead" ? {
			...a,
			name
		} : a)
	};
}
function useSocietyRoster(enabled = true) {
	const assistantName = useEventStore((s) => s.assistantName) ?? "";
	return useQuery({
		queryKey: ROSTER_QUERY_KEY,
		queryFn: fetchSocietyRoster,
		enabled,
		select: (0, import_react.useCallback)((data) => withLeadName(data, assistantName), [assistantName]),
		staleTime: 15e3,
		refetchInterval: () => retirementRunning() ? false : 3e4
	});
}
function useSocietyAgent(agentId) {
	const roster = useSocietyRoster();
	const agent = agentId === null ? null : roster.data?.agents.find((a) => a.agentId === agentId) ?? null;
	return {
		...roster,
		agent
	};
}
async function fetchCapabilities() {
	const res = await fetch("/api/society/capabilities", { cache: "no-store" });
	if (!res.ok) throw new Error(`capabilities ${res.status}`);
	return (await res.json()).capabilities ?? [];
}
function useSocietyCapabilities(enabled = true, mentionOpen = false) {
	const query = useQuery({
		queryKey: CAPABILITIES_QUERY_KEY,
		queryFn: fetchCapabilities,
		enabled,
		staleTime: 6e4,
		retry: false
	});
	const plugins = useQuery({
		queryKey: ["marketplace-plugins"],
		queryFn: async () => {
			const res = await fetch("/api/marketplace/plugins", { cache: "no-store" });
			if (!res.ok) throw new Error(`plugins ${res.status}`);
			return res.json();
		},
		enabled: enabled && mentionOpen,
		staleTime: 0,
		retry: false
	});
	const { refetch } = query;
	(0, import_react.useEffect)(() => {
		if (enabled && mentionOpen) refetch();
	}, [
		enabled,
		mentionOpen,
		refetch
	]);
	return {
		...query,
		plugins: plugins.data?.plugins ?? [],
		inventoryError: query.isError || plugins.isError,
		retryInventory: () => {
			refetch();
			plugins.refetch();
		}
	};
}
function useQuickCreateAgent() {
	return (0, import_react.useCallback)(() => useCreateAgentDialog.getState().request(), []);
}
function useCreateSocietyAgent() {
	const client = useQueryClient();
	return (0, import_react.useCallback)(async (choice = {}) => {
		const body = { tier: "specialist" };
		if (choice.name?.trim()) body.name = choice.name.trim();
		if (choice.runtime && choice.runtime !== "jarvis") body.runtime = choice.runtime;
		if (choice.provider) {
			body.provider = choice.provider;
			if (choice.model) body.model = choice.model;
			if (choice.accountId) body.account_id = choice.accountId;
		}
		if (choice.companion) body.avatar = { companion: choice.companion };
		const res = await fetch("/api/society/agents", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body)
		});
		if (!res.ok) throw requestError(await res.json().catch(() => null), `create ${res.status}`);
		const created = await res.json();
		if (created.created === false) throw new AgentNameTaken();
		announceSpawn(created.agent.agent_id);
		const agent = rowToAgent(created.agent);
		patchRoster(client, (agents) => [...agents.filter((a) => a.agentId !== agent.agentId), agent]);
		return agent;
	}, [client]);
}
function useResolveProposal() {
	const client = useQueryClient();
	return (0, import_react.useCallback)(async (proposalId, approve, note = "") => {
		const res = await fetch(`/api/society/proposals/${encodeURIComponent(proposalId)}/resolve`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				approve,
				note
			})
		});
		if (!res.ok) throw new Error(`proposal ${res.status}`);
		await client.invalidateQueries({ queryKey: ROSTER_QUERY_KEY });
	}, [client]);
}
function useUpdateAgentModel() {
	const client = useQueryClient();
	return (0, import_react.useCallback)(async (agentId, choice) => {
		const res = await fetch(`/api/society/agents/${encodeURIComponent(agentId)}/model`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(choice)
		});
		if (!res.ok) throw requestError(await res.json().catch(() => null), `HTTP ${res.status}`);
		const updated = rowToAgent((await res.json()).agent);
		client.setQueryData(ROSTER_QUERY_KEY, (previous) => previous ? {
			...previous,
			agents: previous.agents.map((agent) => agent.agentId === agentId ? updated : agent)
		} : previous);
		await client.invalidateQueries({ queryKey: ROSTER_QUERY_KEY });
	}, [client]);
}
function useRetireAgent() {
	const client = useQueryClient();
	return (0, import_react.useCallback)(async (agent, executioner) => {
		if (agent.tier === "lead") throw new Error("the lead cannot be retired");
		const sample = SAMPLE_ROSTER.includes(agent);
		if (sample) RETIRED_SAMPLE.add(agent.agentId);
		else {
			const res = await fetch(`/api/society/agents/${encodeURIComponent(agent.agentId)}`, { method: "DELETE" });
			if (!res.ok) {
				const detail = await res.json().catch(() => null);
				const reason = detail && typeof detail.detail === "object" && detail.detail !== null ? String(detail.detail.reason ?? res.status) : String(detail?.detail ?? res.status);
				throw new Error(`retire ${reason}`);
			}
		}
		if (sample || !retirementStageMounted()) {
			patchRoster(client, (agents) => agents.filter((a) => a.agentId !== agent.agentId));
			if (sample) await client.invalidateQueries({ queryKey: ROSTER_QUERY_KEY });
			return;
		}
		if (!beginRetirement({
			agentId: agent.agentId,
			name: agent.name,
			figure: agent.figure,
			palette: agent.palette,
			executionerId: executioner?.agentId ?? null,
			commit: () => {
				client.invalidateQueries({ queryKey: ROSTER_QUERY_KEY });
			}
		})) await client.invalidateQueries({ queryKey: ROSTER_QUERY_KEY });
	}, [client]);
}
function findLead(agents) {
	return agents.find((a) => a.tier === "lead") ?? null;
}
export { useQuickCreateAgent as a, useSocietyAgent as c, useUpdateAgentModel as d, useCreateSocietyAgent as i, useSocietyCapabilities as l, RuntimeProviderUnsupported as n, useResolveProposal as o, findLead as r, useRetireAgent as s, AgentNameTaken as t, useSocietyRoster as u };
