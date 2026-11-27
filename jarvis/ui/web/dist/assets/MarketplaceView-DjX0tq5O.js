import { t as ArrowUpRight } from "./arrow-up-right-uLYmS_nN.js";
import "./TraceTimeline-hpw2Rng1.js";
import { t as Check } from "./check-vbwKkbPq.js";
import { t as ChevronRight } from "./chevron-right-BjVJ-R2c.js";
import { n as CloudUpload, t as Store } from "./store-DvnTMCAH.js";
import { t as FileText } from "./file-text-D8DI7Rfv.js";
import { n as MARKETPLACE_SUBMIT_URL, r as FolderUp } from "./PluginsCommunity-DZgzaAG9.js";
import { t as Github } from "./github-BU95hQ1Y.js";
import { t as PencilLine } from "./pencil-line-iI9lAOdU.js";
import { t as Plug } from "./plug-U1VLH2_U.js";
import "./WorkTrace-CQMphqAB.js";
import { Bc as require_jsx_runtime, Dc as useMutation, Et as openExternalUrl, F as robustCopy, Gs as fill, Ln as cn, Oc as useQuery, Qi as ArrowLeft, Vi as ExternalLink, Wi as Copy, Xc as require_react, Y as ScrollArea, gi as Search, hi as ShieldAlert, ji as LoaderCircle, li as TriangleAlert, ln as Button, mi as Sparkles, na as createLucideIcon, nc as useLocaleChunk, nt as EmptyState, oc as useT, si as X, tc as useI18nStore, tl as __toESM, wc as useEventStore, yi as RefreshCw, zc as useQueryClient } from "./index-BOzhgzD7.js";
import "./lib-BoWxqGgd.js";
import "./petStage-CMRGLgJ7.js";
import "./toolDiff-CkONUaSH.js";
import "./visualFence-DOGBhazZ.js";
import { n as bundledPluginLogo } from "./pluginLogos-2ICNq49h.js";
import "./McpLogo-Xry4yg3E.js";
import "./VoiceWorkTrace-CbMeKDQm.js";
import { a as resolveCompanion } from "./appearance-CnI1Xhkn.js";
import { t as CompanionMark } from "./CompanionMark-BvabJfVP.js";
import "./DictationButton-Bx-A0TOD.js";
import "./ThinkingTrace-CiOesUk4.js";
import { n as badgeVariants, t as Badge } from "./badge-yXLOnH3Y.js";
import "./branding-DNImmT_K.js";
import { c as readFileText, f as GithubSignInDialog, g as usePublishIdentity, h as PublisherChip, m as PublisherAvatar, o as installAgentTemplate, p as PublishIdentityCard } from "./agentShare-CZH1gogG.js";
import "./PageHeader-DcwsywY0.js";
import { n as TabBar } from "./SectionTabBar-Cj6UhxEH.js";
import { t as ViewHeader } from "./ChatsView-vmGpziEG.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var FileInput = createLucideIcon("FileInput", [
	["path", {
		d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",
		key: "1pf5j1"
	}],
	["path", {
		d: "M14 2v4a2 2 0 0 0 2 2h4",
		key: "tnqrlb"
	}],
	["path", {
		d: "M2 15h10",
		key: "jfw4w8"
	}],
	["path", {
		d: "m9 18 3-3-3-3",
		key: "112psh"
	}]
]);
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Package = createLucideIcon("Package", [
	["path", {
		d: "m7.5 4.27 9 5.15",
		key: "1c824w"
	}],
	["path", {
		d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
		key: "hh9hay"
	}],
	["path", {
		d: "m3.3 7 8.7 5 8.7-5",
		key: "g66t2b"
	}],
	["path", {
		d: "M12 22V12",
		key: "d0xqtd"
	}]
]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var INSTALL_TABS = [
	{
		id: "cli",
		label: "CLI",
		hint: "Runs in any terminal while the app is running."
	},
	{
		id: "runner",
		label: "uvx",
		hint: "No install needed — uv fetches the CLI and runs the same command."
	},
	{
		id: "prompt",
		label: "Prompt",
		hint: "Paste this to your assistant — it runs the install for you."
	}
];
function InstallStandard({ install, heading = "Install", note }) {
	const [tab, setTab] = (0, import_react.useState)("cli");
	const [copied, setCopied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!copied) return;
		const t = setTimeout(() => setCopied(false), 2e3);
		return () => clearTimeout(t);
	}, [copied]);
	const active = INSTALL_TABS.find((t) => t.id === tab) ?? INSTALL_TABS[0];
	const value = install[tab];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-xs font-semibold uppercase tracking-wider text-foreground",
				children: heading
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center",
				children: INSTALL_TABS.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center",
					children: [i > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "mx-1.5 select-none text-muted-foreground/40",
						children: "|"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setTab(t.id);
							setCopied(false);
						},
						className: cn("text-xs font-medium transition-colors", tab === t.id ? "text-primary" : "text-muted-foreground hover:text-foreground"),
						children: t.label
					})]
				}, t.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 rounded-md border border-border bg-muted/40 py-1 pl-2.5 pr-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("code", {
				className: "min-w-0 flex-1 overflow-x-auto whitespace-nowrap py-1 text-xs text-foreground",
				children: [tab !== "prompt" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					"aria-hidden": true,
					className: "select-none text-muted-foreground",
					children: ["$", " "]
				}), value]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: async () => {
					if (await robustCopy(value)) setCopied(true);
				},
				className: "grid h-7 w-7 shrink-0 place-items-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
				title: copied ? "Copied" : "Copy",
				"aria-label": `Copy the ${active.label} install command`,
				children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1.5 text-xs text-muted-foreground",
			children: note ?? active.hint
		})
	] });
}
var MAX_READ_BYTES = 512 * 1024;
const MAX_SKILL_MD_BYTES = 64 * 1024;
var INTERESTING = /(^|\/)(plugin\.json|mcp\.json|SKILL\.md|usage-card\.md)$/;
function readText(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result ?? ""));
		reader.onerror = () => reject(reader.error ?? /* @__PURE__ */ new Error("file read failed"));
		reader.readAsText(file);
	});
}
function frontmatterValues(skillMd) {
	const out = {};
	if (!skillMd.startsWith("---")) return out;
	const rest = skillMd.slice(3);
	const end = rest.indexOf("\n---");
	if (end === -1) return out;
	for (const line of rest.slice(0, end).split("\n")) {
		const m = /^([A-Za-z_][A-Za-z0-9_-]*)\s*:\s*(.*)$/.exec(line);
		if (!m) continue;
		let value = m[2].trim();
		if (value.startsWith("\"") && value.endsWith("\"") || value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
		out[m[1]] = value;
	}
	return out;
}
function mcpServersMissingType(mcpJsonText) {
	try {
		const servers = JSON.parse(mcpJsonText).mcpServers;
		if (!servers || typeof servers !== "object") return [];
		return Object.entries(servers).filter(([, server]) => !server || typeof server !== "object" || typeof server.type !== "string").map(([name]) => name);
	} catch {
		return [];
	}
}
async function collectDroppedFiles(items) {
	const roots = [];
	for (const item of Array.from(items)) {
		const entry = item.webkitGetAsEntry?.();
		if (entry) roots.push(entry);
	}
	const found = [];
	async function walk(entry, prefix) {
		if (found.length > 400) return;
		if (entry.isFile) {
			const file = await new Promise((resolve, reject) => entry.file(resolve, reject));
			found.push({
				path: prefix + entry.name,
				file
			});
			return;
		}
		if (entry.isDirectory) {
			const dirReader = entry.createReader();
			for (;;) {
				const batch = await new Promise((resolve, reject) => dirReader.readEntries(resolve, reject));
				if (batch.length === 0) break;
				for (const child of batch) await walk(child, prefix + entry.name + "/");
			}
		}
	}
	for (const root of roots) await walk(root, "");
	return found;
}
function collectPickedFiles(list) {
	return Array.from(list).map((file) => ({
		path: (file.webkitRelativePath || file.name).replace(/\\/g, "/"),
		file
	}));
}
function normalizePaths(files) {
	if (files.length === 0) return files;
	const first = files[0].path;
	const slash = first.indexOf("/");
	if (slash === -1) return files;
	const prefix = first.slice(0, slash + 1);
	if (files.every((f) => f.path.startsWith(prefix))) return files.map((f) => ({
		...f,
		file: f.file,
		path: f.path.slice(prefix.length)
	}));
	return files;
}
async function loneSkillFile(files) {
	if (files.length !== 1) return null;
	const only = files[0];
	const base = only.path.split("/").pop() ?? only.path;
	if (!/\.md$/i.test(base)) return null;
	const stem = base.replace(/\.md$/i, "");
	const named = /^skill$/i.test(stem);
	if (!named && only.file.size <= MAX_READ_BYTES) {
		if (!(await readText(only.file.slice(0, 16))).replace(/^﻿/, "").startsWith("---")) return null;
	} else if (!named) return null;
	return {
		files: [{
			path: "SKILL.md",
			file: only.file
		}],
		stem: named ? "" : stem
	};
}
function slugFromStem(stem) {
	return stem.toLowerCase().replace(/[^a-z0-9.-]+/g, "-").replace(/-{2,}/g, "-").replace(/^[-.]+|[-.]+$/g, "");
}
async function folderToDraft(input) {
	const lone = await loneSkillFile(input);
	const files = (lone ? lone.files : normalizePaths(input)).filter((f) => INTERESTING.test(f.path) && f.file.size <= MAX_READ_BYTES);
	const warnings = [];
	const used = [];
	const byPath = (p) => files.find((f) => f.path === p);
	const read = async (f) => {
		if (!f) return "";
		used.push(f.path);
		return (await readText(f.file)).replace(/^﻿/, "");
	};
	const draft = {
		kind: "skill",
		name: "",
		version: "1.0.0",
		title: "",
		description: "",
		categories: "",
		skill_md: "",
		plugin_json_text: "",
		mcp_json_text: "",
		usage_card: "",
		skills: [],
		warnings,
		files: used
	};
	const pluginJsonFile = byPath("plugin.json");
	if (pluginJsonFile) {
		draft.kind = "plugin";
		draft.plugin_json_text = await read(pluginJsonFile);
		try {
			const manifest = JSON.parse(draft.plugin_json_text);
			if (typeof manifest.name === "string") draft.name = manifest.name;
			if (typeof manifest.version === "string") draft.version = manifest.version;
			if (typeof manifest.description === "string") draft.description = manifest.description;
		} catch {
			warnings.push("plugin.json is not valid JSON — fix it before publishing.");
		}
		draft.mcp_json_text = await read(byPath("mcp.json"));
		draft.usage_card = await read(byPath("io.github.personaljarvis/usage-card.md"));
		if (!draft.mcp_json_text) warnings.push("No mcp.json found — fine when the auth block points at a hosted MCP server or the package is skills-only.");
		else {
			const missingType = mcpServersMissingType(draft.mcp_json_text);
			if (missingType.length > 0) warnings.push(`mcp.json server${missingType.length === 1 ? "" : "s"} ${missingType.map((n) => `"${n}"`).join(", ")} missing "type" — the store requires "type": "streamable-http" | "stdio" | "sse" on every server.`);
		}
		for (const f of files) {
			const m = /^skills\/([^/]+)\/SKILL\.md$/.exec(f.path);
			if (!m) continue;
			if (draft.skills.length >= 10) {
				warnings.push("More than 10 bundled skills — the store accepts at most 10.");
				break;
			}
			draft.skills.push({
				name: m[1],
				skill_md: await read(f)
			});
		}
		return draft;
	}
	const skillFile = byPath("SKILL.md") ?? files.find((f) => f.path.endsWith("/SKILL.md")) ?? void 0;
	if (!skillFile) throw new Error("No plugin.json and no SKILL.md found — a package folder needs one of the two at its top level. A single file works too when it is named SKILL.md or starts with YAML frontmatter (---).");
	draft.skill_md = await read(skillFile);
	const fm = frontmatterValues(draft.skill_md);
	const dirName = skillFile.path.includes("/") ? skillFile.path.split("/")[0] : "";
	draft.name = fm.name || dirName || (lone ? slugFromStem(lone.stem) : "");
	if (fm.version) draft.version = fm.version;
	draft.description = fm.description ?? "";
	draft.title = fm.title || (draft.name ? draft.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "");
	if (fm.category) draft.categories = fm.category;
	if (!draft.skill_md.startsWith("---")) warnings.push("SKILL.md does not start with YAML frontmatter (---) — the store requires it.");
	return draft;
}
var API = "https://api.github.com";
var UA_HEADERS = { Accept: "application/vnd.github+json" };
async function gh(path) {
	const res = await fetch(`${API}${path}`, { headers: UA_HEADERS });
	if (res.status === 403 || res.status === 429) throw new Error("GitHub rate limit reached — wait a few minutes and try again.");
	if (res.status === 404) throw new Error("Not found on GitHub — check the name.");
	if (!res.ok) throw new Error(`GitHub request failed (${res.status})`);
	return await res.json();
}
function toRepoSummary(r) {
	return {
		full_name: String(r.full_name ?? ""),
		description: typeof r.description === "string" ? r.description : null,
		default_branch: String(r.default_branch ?? "main"),
		pushed_at: typeof r.pushed_at === "string" ? r.pushed_at : null,
		stargazers_count: Number(r.stargazers_count ?? 0)
	};
}
async function listRepos(login) {
	return (await gh(`/users/${encodeURIComponent(login)}/repos?sort=pushed&per_page=50`)).map(toRepoSummary);
}
async function getRepo(owner, repo) {
	return toRepoSummary(await gh(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`));
}
function parseRepoRef(text) {
	const trimmed = text.trim().replace(/\.git$/, "");
	const url = /github\.com\/([^/\s]+)\/([^/\s#?]+)/.exec(trimmed);
	if (url) return {
		owner: url[1],
		repo: url[2]
	};
	const plain = /^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)$/.exec(trimmed);
	if (plain) return {
		owner: plain[1],
		repo: plain[2]
	};
	return null;
}
async function scanRepo(owner, repo, branch) {
	const tree = await gh(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/trees/${encodeURIComponent(branch)}?recursive=1`);
	const paths = tree.tree.filter((t) => t.type === "blob").map((t) => t.path);
	const pathSet = new Set(paths);
	const pluginDirs = paths.filter((p) => p === "plugin.json" || p.endsWith("/plugin.json")).map((p) => p === "plugin.json" ? "" : p.slice(0, -12));
	const candidates = pluginDirs.map((dir) => {
		const prefix = dir ? `${dir}/` : "";
		const wanted = [
			`${prefix}plugin.json`,
			`${prefix}mcp.json`,
			`${prefix}io.github.personaljarvis/usage-card.md`
		].filter((p) => pathSet.has(p));
		const skillMds = paths.filter((p) => p.startsWith(`${prefix}skills/`) && p.endsWith("/SKILL.md"));
		return {
			dir,
			kind: "plugin",
			paths: [...wanted, ...skillMds.slice(0, 10)]
		};
	});
	const insidePlugin = (p) => pluginDirs.some((dir) => p.startsWith(dir ? `${dir}/` : "") && p.includes("skills/"));
	for (const p of paths) {
		if (!(p === "SKILL.md" || p.endsWith("/SKILL.md"))) continue;
		if (insidePlugin(p)) continue;
		const dir = p === "SKILL.md" ? "" : p.slice(0, -9);
		candidates.push({
			dir,
			kind: "skill",
			paths: [p]
		});
		if (candidates.length >= 40) break;
	}
	return {
		candidates,
		truncated: tree.truncated === true
	};
}
async function fetchRepoFile(owner, repo, branch, path) {
	const data = await gh(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${path.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(branch)}`);
	if (!data.content || data.encoding !== "base64") throw new Error(`GitHub did not return file content for ${path}`);
	const bytes = Uint8Array.from(atob(data.content.replace(/\n/g, "")), (c) => c.charCodeAt(0));
	return new TextDecoder("utf-8").decode(bytes);
}
var EMPTY_DRAFT = {
	kind: "skill",
	name: "",
	version: "1.0.0",
	title: "",
	description: "",
	categories: "",
	skill_md: "",
	plugin_json_text: "",
	mcp_json_text: "",
	usage_card: "",
	skills: []
};
var SKILL_TEMPLATE = `---
name: my-skill
description: One sentence on when the assistant should reach for this skill.
version: 1.0.0
---

# My Skill

Write the instructions the assistant follows, step by step.
`;
var PLUGIN_TEMPLATE = `{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "One sentence on what the plugin connects.",
  "extensions": {
    "io.github.personaljarvis": {
      "display_name": "My Plugin",
      "category": "Productivity",
      "auth": { "mode": "pat_paste", "pat_help_url": "https://example.com/settings/tokens" }
    }
  }
}
`;
var MCP_TEMPLATE = `{
  "mcpServers": {
    "my-plugin": { "type": "streamable-http", "url": "https://mcp.example.com/mcp" }
  }
}
`;
function draftToBody(draft, t) {
	const base = {
		kind: draft.kind,
		name: draft.name.trim(),
		version: draft.version.trim()
	};
	if (draft.kind === "skill") return { body: {
		...base,
		title: draft.title.trim(),
		description: draft.description.trim(),
		categories: draft.categories.split(",").map((c) => c.trim()).filter(Boolean),
		skill_md: draft.skill_md
	} };
	let pluginJson;
	try {
		pluginJson = draft.plugin_json_text.trim() ? JSON.parse(draft.plugin_json_text) : null;
	} catch {
		return { parseError: {
			field: "plugin_json",
			error: t("marketplace.studio_err_plugin_json")
		} };
	}
	let mcpJson = null;
	try {
		mcpJson = draft.mcp_json_text.trim() ? JSON.parse(draft.mcp_json_text) : null;
	} catch {
		return { parseError: {
			field: "mcp_json",
			error: t("marketplace.studio_err_mcp_json")
		} };
	}
	const body = {
		...base,
		plugin_json: pluginJson,
		mcp_json: mcpJson,
		usage_card: draft.usage_card.trim() ? draft.usage_card : null
	};
	if (draft.skills.length > 0) body.skills = draft.skills;
	return { body };
}
function PublishStudio({ onClose }) {
	const t = useT();
	const localeReady = useLocaleChunk("marketplace");
	const queryClient = useQueryClient();
	const identity = usePublishIdentity();
	const [stage, setStage] = (0, import_react.useState)("source");
	const [draft, setDraft] = (0, import_react.useState)(EMPTY_DRAFT);
	const [prefill, setPrefill] = (0, import_react.useState)(null);
	const [errors, setErrors] = (0, import_react.useState)([]);
	const [checked, setChecked] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (event.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onClose]);
	const set = (patch) => {
		setDraft((d) => ({
			...d,
			...patch
		}));
		setChecked(false);
	};
	const applyFolderDraft = (folder, origin) => {
		setDraft({
			kind: folder.kind,
			name: folder.name,
			version: folder.version,
			title: folder.title,
			description: folder.description,
			categories: folder.categories,
			skill_md: folder.skill_md,
			plugin_json_text: folder.plugin_json_text,
			mcp_json_text: folder.mcp_json_text,
			usage_card: folder.usage_card,
			skills: folder.skills
		});
		setPrefill({
			origin,
			files: folder.files,
			warnings: folder.warnings
		});
		setErrors([]);
		setChecked(false);
		setStage("form");
	};
	const startBlank = (kind) => {
		setDraft({
			...EMPTY_DRAFT,
			kind,
			skill_md: kind === "skill" ? SKILL_TEMPLATE : "",
			plugin_json_text: kind === "plugin" ? PLUGIN_TEMPLATE : "",
			mcp_json_text: kind === "plugin" ? MCP_TEMPLATE : ""
		});
		setPrefill(null);
		setErrors([]);
		setChecked(false);
		setStage("form");
	};
	const startOver = () => {
		setStage("source");
		setDraft(EMPTY_DRAFT);
		setPrefill(null);
		setErrors([]);
		setChecked(false);
		setResult(null);
	};
	const validateMutation = useMutation({
		mutationFn: async () => {
			const converted = draftToBody(draft, t);
			if ("parseError" in converted) return [converted.parseError];
			const res = await fetch("/api/marketplace/publish/validate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(converted.body)
			});
			if (!res.ok) throw new Error(`Validation request failed (${res.status})`);
			return (await res.json()).errors;
		},
		onSuccess: (errs) => {
			setErrors(errs);
			setChecked(true);
		}
	});
	const submitMutation = useMutation({
		mutationFn: async () => {
			const converted = draftToBody(draft, t);
			if ("parseError" in converted) {
				setErrors([converted.parseError]);
				throw new Error(converted.parseError.error);
			}
			const res = await fetch("/api/marketplace/publish/submit", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(converted.body)
			});
			const data = await res.json().catch(() => ({}));
			if (!res.ok) {
				const detail = data.detail;
				if (detail?.error) {
					setErrors([{
						field: detail.field ?? null,
						error: detail.error
					}]);
					throw new Error(detail.error);
				}
				throw new Error(`Publish failed (${res.status})`);
			}
			return data;
		},
		onSuccess: (r) => {
			setResult(r);
			setErrors([]);
			setStage("done");
			queryClient.invalidateQueries({ queryKey: ["marketplace-community"] });
		}
	});
	const signedIn = identity.data?.signed_in === true;
	const disabled = identity.data ? !identity.data.enabled : false;
	const station = stage === "done" ? 4 : stage === "form" ? 3 : signedIn ? 2 : 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": t("marketplace.studio_title"),
		"data-testid": "publish-studio",
		className: "fixed inset-0 z-[60] flex bg-background backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": t("marketplace.close"),
			onClick: onClose,
			className: "absolute inset-0 cursor-default"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative m-auto flex h-[min(92vh,56rem)] w-[min(96vw,72rem)] overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "relative isolate hidden w-60 shrink-0 flex-col border-r bg-secondary p-5 md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "pointer-events-none absolute -z-10 -left-20 top-0 h-64 w-64 rounded-full bg-secondary blur-3xl"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-micro font-semibold text-muted-foreground",
						children: t("marketplace.studio_eyebrow")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-lg font-semibold tracking-tight text-foreground",
						children: t("marketplace.studio_title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "mt-6 space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Station, {
								n: 1,
								active: station === 1,
								done: signedIn,
								label: t("marketplace.studio_station_who")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Station, {
								n: 2,
								active: station === 2,
								done: station > 2,
								label: t("marketplace.studio_station_what")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Station, {
								n: 3,
								active: station === 3,
								done: station > 3,
								label: t("marketplace.studio_station_check")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Station, {
								n: 4,
								active: station === 4,
								done: false,
								label: t("marketplace.studio_station_live")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-auto space-y-2 text-micro text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("marketplace.studio_rail_note_public") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("marketplace.studio_rail_note_rules") })]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center gap-3 border-b border-border px-5 py-3",
					children: [
						stage !== "source" && stage !== "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => setStage("source"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-1.5 h-3.5 w-3.5" }), t("marketplace.studio_back")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-w-0 flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-sm font-semibold text-foreground",
								children: [
									stage === "source" && t("marketplace.studio_h_source"),
									stage === "github" && t("marketplace.studio_h_github"),
									stage === "form" && t("marketplace.studio_h_form"),
									stage === "done" && t("marketplace.studio_h_done")
								]
							})
						}),
						signedIn && identity.data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden items-center gap-2 rounded-full border border-border bg-background py-0.5 pl-0.5 pr-2.5 text-micro text-foreground sm:flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublisherAvatar, {
									login: identity.data.login,
									url: identity.data.avatar_url,
									size: 20
								}),
								"@",
								identity.data.login
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: onClose,
							"aria-label": t("marketplace.close"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
					className: "min-h-0 flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-5 py-5",
						children: !localeReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "flex items-center gap-2 py-10 text-sm text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" })
						}) : disabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: t("marketplace.studio_disabled")
						}) : stage === "done" && result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublishedCard, {
							result,
							onPublishAnother: startOver,
							t
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublishIdentityCard, {
									identity: identity.data,
									loading: identity.isLoading
								}),
								stage === "source" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourcePicker, {
									onFolder: applyFolderDraft,
									onGithub: () => setStage("github"),
									onBlank: startBlank,
									t
								}),
								stage === "github" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GithubImportPanel, {
									login: signedIn ? identity.data?.login ?? "" : "",
									onImported: applyFolderDraft,
									t
								}),
								stage === "form" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DraftForm, {
									draft,
									set,
									prefill,
									errors,
									checked,
									signedIn,
									validating: validateMutation.isPending,
									submitting: submitMutation.isPending,
									onCheck: () => validateMutation.mutate(),
									onPublish: () => submitMutation.mutate(),
									onStartOver: startOver,
									t
								})
							]
						})
					})
				})]
			})]
		})]
	});
}
function Station({ n, active, done, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: cn("flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors", active ? "bg-background text-foreground" : "text-muted-foreground"),
		"data-active": active ? "yes" : "no",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("grid h-6 w-6 shrink-0 place-items-center rounded-full border text-micro font-bold", done ? "border-border-strong bg-primary text-primary-foreground" : active ? "border-border-strong text-foreground-strong" : "border-border text-muted-foreground"),
			children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }) : n
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: label
		})]
	});
}
function SourcePicker({ onFolder, onGithub, onBlank, t }) {
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [dropError, setDropError] = (0, import_react.useState)(null);
	const pickerRef = (0, import_react.useRef)(null);
	const filePickerRef = (0, import_react.useRef)(null);
	const handleFiles = async (load, origin) => {
		setBusy(true);
		setDropError(null);
		try {
			onFolder(await folderToDraft(await load()), origin);
		} catch (err) {
			setDropError(err instanceof Error ? err.message : t("marketplace.studio_err_folder"));
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-baseline gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-semibold text-foreground",
					children: t("marketplace.studio_source_label")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-micro text-muted-foreground",
					children: t("marketplace.studio_source_hint")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						role: "button",
						tabIndex: 0,
						"aria-label": t("marketplace.studio_door_folder"),
						"data-testid": "studio-door-folder",
						onClick: () => pickerRef.current?.click(),
						onKeyDown: (e) => {
							if (e.key === "Enter" || e.key === " ") pickerRef.current?.click();
						},
						onDragOver: (e) => {
							e.preventDefault();
							setDragOver(true);
						},
						onDragLeave: () => setDragOver(false),
						onDrop: (e) => {
							e.preventDefault();
							setDragOver(false);
							const items = e.dataTransfer.items;
							handleFiles(() => collectDroppedFiles(items), t("marketplace.studio_origin_folder"));
						},
						className: cn("group relative isolate flex min-h-44 cursor-pointer flex-col justify-end overflow-hidden rounded-2xl border border-dashed p-5 text-left transition-colors md:row-span-2", "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring", dragOver ? "bg-secondary" : "border-border bg-gradient-to-br from-primary/10 via-card to-card hover:border-border-strong"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"aria-hidden": true,
								className: "pointer-events-none absolute -z-10 -right-10 -top-10 h-40 w-40 rounded-full bg-secondary blur-3xl transition-transform duration-500 group-hover:scale-125"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground",
								children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderUp, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-display text-base font-semibold tracking-tight text-foreground",
								children: t("marketplace.studio_door_folder")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs leading-relaxed text-muted-foreground",
								children: t("marketplace.studio_door_folder_hint")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"data-testid": "studio-door-skill-file",
								className: "mt-3 inline-flex w-fit items-center gap-1.5 text-xs font-medium text-foreground-strong underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								onClick: (e) => {
									e.stopPropagation();
									filePickerRef.current?.click();
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5" }), t("marketplace.studio_door_skill_file")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: pickerRef,
								type: "file",
								multiple: true,
								className: "hidden",
								webkitdirectory: "",
								onChange: (e) => {
									const list = e.currentTarget.files;
									if (list && list.length > 0) handleFiles(() => Promise.resolve(collectPickedFiles(list)), t("marketplace.studio_origin_folder"));
									e.currentTarget.value = "";
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: filePickerRef,
								type: "file",
								accept: ".md,text/markdown,.json,application/json",
								multiple: true,
								className: "hidden",
								"data-testid": "studio-skill-file-input",
								onChange: (e) => {
									const list = e.currentTarget.files;
									if (list && list.length > 0) handleFiles(() => Promise.resolve(collectPickedFiles(list)), t("marketplace.studio_origin_file"));
									e.currentTarget.value = "";
								}
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Door, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "h-4 w-4" }),
						title: t("marketplace.studio_door_github"),
						hint: t("marketplace.studio_door_github_hint"),
						onClick: onGithub,
						testId: "studio-door-github"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col rounded-2xl border border-border bg-card p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-9 w-9 place-items-center rounded-lg bg-secondary text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PencilLine, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm font-semibold text-foreground",
								children: t("marketplace.studio_door_blank")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: t("marketplace.studio_door_blank_hint")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => onBlank("skill"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mr-1.5 h-3.5 w-3.5" }), t("marketplace.kind_skill")]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => onBlank("plugin"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plug, { className: "mr-1.5 h-3.5 w-3.5" }), t("marketplace.kind_plugin")]
								})]
							})
						]
					})
				]
			}),
			dropError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-start gap-2 rounded-md bg-secondary px-2 py-1.5 text-xs text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), dropError]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowPublishingWorks, { t })
		]
	});
}
function Door({ icon, title, hint, onClick, testId, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		"data-testid": testId,
		className: cn("flex flex-col rounded-2xl border border-border bg-card p-4 text-left transition-colors", "hover:border-border-strong hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-9 w-9 place-items-center rounded-lg bg-secondary text-foreground",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm font-semibold text-foreground",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: hint
			})
		]
	});
}
function HowPublishingWorks({ t }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-border bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold text-foreground",
				children: t("marketplace.studio_how_title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-2 grid gap-2 text-xs text-muted-foreground sm:grid-cols-4",
				children: [
					1,
					2,
					3,
					4
				].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-5 w-5 shrink-0 place-items-center rounded-full border border-border-strong text-micro font-bold text-muted-foreground",
						children: n
					}), t(`marketplace.studio_how_step_${n}`)]
				}, n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setOpen((o) => !o),
				className: "mt-3 text-micro font-medium text-foreground-strong hover:underline",
				children: open ? t("marketplace.studio_how_hide_layout") : t("marketplace.studio_how_show_layout")
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 overflow-x-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "rounded-md border border-border bg-background p-3 font-mono text-micro text-foreground",
					children: `my-plugin/
├── plugin.json                  ← required: name, description, version
├── mcp.json                     ← the server your plugin talks to (optional)
├── skills/                      ← instructions that ship with it (optional)
│   └── my-skill/SKILL.md
└── io.github.personaljarvis/
    └── usage-card.md            ← when the assistant should use it (optional)

my-skill/
└── SKILL.md                     ← a standalone skill: one file, YAML frontmatter first`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-micro text-muted-foreground",
					children: t("marketplace.studio_how_layout_note")
				})]
			})
		]
	});
}
function GithubImportPanel({ login, onImported, t }) {
	const [account, setAccount] = (0, import_react.useState)(login);
	const [refText, setRefText] = (0, import_react.useState)("");
	const [repos, setRepos] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [candidates, setCandidates] = (0, import_react.useState)(null);
	const [truncated, setTruncated] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const loadRepos = async (user) => {
		if (!user.trim()) return;
		setBusy("repos");
		setError(null);
		setSelected(null);
		setCandidates(null);
		setTruncated(false);
		try {
			setRepos(await listRepos(user.trim()));
		} catch (err) {
			setRepos(null);
			setError(err instanceof Error ? err.message : t("marketplace.studio_err_repos"));
		} finally {
			setBusy(null);
		}
	};
	const autoLoaded = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (login && !autoLoaded.current) {
			autoLoaded.current = true;
			loadRepos(login);
		}
	}, [login]);
	const openRepo = async (owner, repo, branch) => {
		setBusy(`scan:${owner}/${repo}`);
		setError(null);
		setSelected({
			owner,
			repo,
			branch
		});
		setCandidates(null);
		setTruncated(false);
		try {
			const { candidates: found, truncated: cutOff } = await scanRepo(owner, repo, branch);
			setCandidates(found);
			setTruncated(cutOff);
			if (found.length === 0) setError(cutOff ? t("marketplace.studio_err_scan_truncated") : t("marketplace.studio_err_scan_empty"));
		} catch (err) {
			setError(err instanceof Error ? err.message : t("marketplace.studio_err_scan"));
		} finally {
			setBusy(null);
		}
	};
	const importCandidate = async (candidate) => {
		if (!selected) return;
		setBusy(`import:${candidate.dir}`);
		setError(null);
		try {
			const prefix = candidate.dir ? `${candidate.dir}/` : "";
			onImported(await folderToDraft(await Promise.all(candidate.paths.map(async (path) => {
				const text = await fetchRepoFile(selected.owner, selected.repo, selected.branch, path);
				return {
					path: path.slice(prefix.length),
					file: new File([text], path)
				};
			}))), `${selected.owner}/${selected.repo}`);
		} catch (err) {
			setError(err instanceof Error ? err.message : t("marketplace.studio_err_import"));
		} finally {
			setBusy(null);
		}
	};
	const openRef = async () => {
		const parsed = parseRepoRef(refText);
		if (!parsed) {
			setError(t("marketplace.studio_err_ref"));
			return;
		}
		setBusy(`resolve:${parsed.owner}/${parsed.repo}`);
		setError(null);
		try {
			const info = await getRepo(parsed.owner, parsed.repo);
			await openRepo(parsed.owner, parsed.repo, info.default_branch);
		} catch (err) {
			setError(err instanceof Error ? err.message : t("marketplace.studio_err_resolve"));
			setBusy(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-4 rounded-2xl border border-border bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-micro text-muted-foreground",
				children: t("marketplace.studio_github_note")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-48 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-xs font-medium text-foreground",
							htmlFor: "gh-account",
							children: t("marketplace.studio_github_account")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "gh-account",
							value: account,
							onChange: (e) => setAccount(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter") loadRepos(account);
							},
							placeholder: "your-github-name",
							className: inputCls(false)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => void loadRepos(account),
						disabled: busy === "repos" || !account.trim(),
						children: [busy === "repos" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "mr-1.5 h-3.5 w-3.5" }), t("marketplace.studio_github_list")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-48 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-xs font-medium text-foreground",
							htmlFor: "gh-ref",
							children: t("marketplace.studio_github_one_repo")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "gh-ref",
							value: refText,
							onChange: (e) => setRefText(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter") openRef();
							},
							placeholder: "owner/repo",
							className: inputCls(false)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => void openRef(),
						disabled: busy !== null,
						children: [busy?.startsWith("resolve:") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }) : null, t("marketplace.studio_github_scan")]
					})
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-start gap-2 rounded-md bg-secondary px-2 py-1.5 text-xs text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), error]
			}),
			repos && !selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "max-h-72 space-y-1 overflow-y-auto",
				children: [repos.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						const [owner, repo] = r.full_name.split("/");
						openRepo(owner, repo, r.default_branch);
					},
					className: cn("flex w-full items-baseline gap-2 rounded-md border border-transparent px-2 py-1.5 text-left transition-colors", "hover:border-border hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-foreground",
							children: r.full_name
						}),
						busy === `scan:${r.full_name}` && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin text-muted-foreground" }),
						r.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-micro text-muted-foreground",
							children: r.description
						})
					]
				}) }, r.full_name)), repos.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "px-2 py-1.5 text-xs text-muted-foreground",
					children: t("marketplace.studio_github_no_repos")
				})]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setSelected(null);
									setCandidates(null);
									setTruncated(false);
									setError(null);
								},
								className: "text-micro font-medium text-foreground-strong hover:underline",
								children: ["← ", t("marketplace.studio_github_all_repos")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs text-foreground",
								children: [
									selected.owner,
									"/",
									selected.repo
								]
							}),
							busy?.startsWith("scan:") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin text-muted-foreground" })
						]
					}),
					truncated && candidates && candidates.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-start gap-1.5 text-micro text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-3 w-3 shrink-0" }), t("marketplace.studio_github_truncated")]
					}),
					candidates && candidates.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1",
						children: candidates.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-center gap-2 rounded-md border border-border bg-background px-2.5 py-2",
							children: [
								c.kind === "plugin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plug, { className: "h-3.5 w-3.5 text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium text-foreground",
									children: c.kind === "plugin" ? t("marketplace.kind_plugin") : t("marketplace.kind_skill")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-micro text-muted-foreground",
									children: ["/", c.dir || ""]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-micro text-muted-foreground",
									children: fill(t("marketplace.studio_github_files"), { count: c.paths.length })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "outline",
									className: "ml-auto",
									onClick: () => void importCandidate(c),
									disabled: busy !== null,
									children: [busy === `import:${c.dir}` ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }) : null, t("marketplace.studio_github_review")]
								})
							]
						}, `${c.kind}:${c.dir}`))
					})
				]
			})
		]
	});
}
function DraftForm({ draft, set, prefill, errors, checked, signedIn, validating, submitting, onCheck, onPublish, onStartOver, t }) {
	const errorFor = (field) => errors.filter((e) => e.field === field);
	const generalErrors = errors.filter((e) => e.field === null);
	const skillBytes = new TextEncoder().encode(draft.skill_md).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "space-y-4",
			"data-testid": "studio-form",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold text-foreground",
						children: t("marketplace.studio_form_label")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindButton, {
							active: draft.kind === "skill",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5" }),
							label: t("marketplace.kind_skill"),
							onClick: () => set({ kind: "skill" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindButton, {
							active: draft.kind === "plugin",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plug, { className: "h-3.5 w-3.5" }),
							label: t("marketplace.kind_plugin"),
							onClick: () => set({ kind: "plugin" })
						})]
					})]
				}),
				prefill && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-secondary px-3 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-1 inline h-3.5 w-3.5 text-muted-foreground" }), fill(t("marketplace.studio_prefilled_from"), { origin: prefill.origin })]
						}),
						prefill.files.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-micro text-muted-foreground",
							children: prefill.files.join(" · ")
						}),
						prefill.warnings.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 flex items-start gap-1.5 text-micro text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-3 w-3 shrink-0" }), w]
						}, i))
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("marketplace.studio_f_name"),
						hint: t("marketplace.studio_f_name_hint"),
						errors: errorFor("name"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: draft.name,
							onChange: (e) => set({ name: e.target.value }),
							placeholder: "my-skill",
							className: inputCls(errorFor("name").length > 0),
							"data-testid": "studio-name"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("marketplace.studio_f_version"),
						hint: t("marketplace.studio_f_version_hint"),
						errors: errorFor("version"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: draft.version,
							onChange: (e) => set({ version: e.target.value }),
							placeholder: "1.0.0",
							className: inputCls(errorFor("version").length > 0)
						})
					})]
				}),
				draft.kind === "skill" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("marketplace.studio_f_title"),
						errors: errorFor("title"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: draft.title,
							onChange: (e) => set({ title: e.target.value }),
							placeholder: "My Skill",
							className: inputCls(errorFor("title").length > 0)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("marketplace.studio_f_description"),
						hint: fill(t("marketplace.studio_f_description_hint"), { count: draft.description.length }),
						errors: errorFor("description"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: draft.description,
							onChange: (e) => set({ description: e.target.value }),
							rows: 2,
							className: inputCls(errorFor("description").length > 0)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("marketplace.studio_f_categories"),
						hint: t("marketplace.studio_f_categories_hint"),
						errors: [],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: draft.categories,
							onChange: (e) => set({ categories: e.target.value }),
							placeholder: "writing, research",
							className: inputCls(false)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "SKILL.md",
						hint: fill(t("marketplace.studio_f_skill_md_hint"), {
							kb: (skillBytes / 1024).toFixed(1),
							max: MAX_SKILL_MD_BYTES / 1024
						}),
						errors: errorFor("skill_md"),
						action: draft.skill_md.trim() === "" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => set({ skill_md: SKILL_TEMPLATE }),
							className: "text-micro font-medium text-foreground-strong hover:underline",
							children: t("marketplace.studio_insert_template")
						}) : null,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: draft.skill_md,
							onChange: (e) => set({ skill_md: e.target.value }),
							rows: 12,
							spellCheck: false,
							className: cn(inputCls(errorFor("skill_md").length > 0), "font-mono text-xs")
						})
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "plugin.json",
						hint: t("marketplace.studio_f_plugin_json_hint"),
						errors: errorFor("plugin_json"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: draft.plugin_json_text,
							onChange: (e) => set({ plugin_json_text: e.target.value }),
							rows: 10,
							spellCheck: false,
							placeholder: "{ \"name\": \"my-plugin\", \"version\": \"1.0.0\", … }",
							className: cn(inputCls(errorFor("plugin_json").length > 0), "font-mono text-xs")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "mcp.json",
						hint: t("marketplace.studio_f_mcp_json_hint"),
						errors: errorFor("mcp_json"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: draft.mcp_json_text,
							onChange: (e) => set({ mcp_json_text: e.target.value }),
							rows: 6,
							spellCheck: false,
							placeholder: "{ \"mcpServers\": { \"my-plugin\": { \"type\": \"streamable-http\", \"url\": \"https://…\" } } }",
							className: cn(inputCls(errorFor("mcp_json").length > 0), "font-mono text-xs")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("marketplace.studio_f_skills"),
						hint: t("marketplace.studio_f_skills_hint"),
						errors: errorFor("skills"),
						children: draft.skills.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-md border border-dashed border-border px-2.5 py-2 text-micro text-muted-foreground",
							children: t("marketplace.studio_f_skills_none")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "flex flex-wrap gap-1.5",
							children: draft.skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3 w-3 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-micro text-foreground",
										children: s.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-micro text-muted-foreground",
										children: [Math.max(1, Math.round(s.skill_md.length / 1024)), " KB"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": `Remove ${s.name}`,
										onClick: () => set({ skills: draft.skills.filter((x) => x.name !== s.name) }),
										className: "grid h-4 w-4 place-items-center rounded text-muted-foreground hover:text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
									})
								]
							}, s.name))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("marketplace.studio_f_usage_card"),
						hint: t("marketplace.studio_f_usage_card_hint"),
						errors: [],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: draft.usage_card,
							onChange: (e) => set({ usage_card: e.target.value }),
							rows: 4,
							spellCheck: false,
							className: cn(inputCls(false), "font-mono text-xs")
						})
					})
				] }),
				generalErrors.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-start gap-2 rounded-md bg-secondary px-2 py-1.5 text-xs text-destructive",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), e.error]
				}, i)),
				checked && errors.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-xs text-foreground",
					"data-testid": "studio-check-ok",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 text-muted-foreground" }), t("marketplace.studio_check_ok")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-end gap-2 border-t border-border pt-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: onStartOver,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-1.5 h-3.5 w-3.5" }), t("marketplace.studio_start_over")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: onCheck,
							disabled: validating,
							children: [validating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }) : null, t("marketplace.studio_check")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: onPublish,
							disabled: submitting || !signedIn,
							title: signedIn ? void 0 : t("marketplace.studio_sign_in_first"),
							"data-testid": "studio-publish",
							children: [submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "mr-1.5 h-3.5 w-3.5" }), t("marketplace.studio_publish")]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "lg:sticky lg:top-0 lg:self-start",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardPreview, {
				draft,
				t
			})
		})]
	});
}
function CardPreview({ draft, t }) {
	const preview = (0, import_react.useMemo)(() => {
		if (draft.kind === "skill") return {
			title: draft.title.trim() || draft.name.trim() || t("marketplace.studio_preview_untitled"),
			description: draft.description.trim() || t("marketplace.studio_preview_no_description"),
			detail: draft.categories.split(",").map((c) => c.trim()).filter(Boolean).join(" · "),
			initial: (draft.title.trim() || draft.name.trim() || "S").slice(0, 1).toUpperCase()
		};
		let displayName = draft.name.trim();
		let description = "";
		let category = "Community";
		try {
			const manifest = JSON.parse(draft.plugin_json_text || "{}");
			description = manifest.description ?? "";
			const ext = manifest.extensions?.["io.github.personaljarvis"];
			if (ext?.display_name) displayName = ext.display_name;
			if (ext?.category) category = ext.category;
		} catch {}
		let server = "";
		try {
			const mcp = JSON.parse(draft.mcp_json_text || "{}");
			const first = Object.values(mcp.mcpServers ?? {})[0];
			if (first?.url) server = first.url;
			else if (first?.command) server = [first.command, ...first.args ?? []].join(" ");
		} catch {}
		const bits = [category];
		if (draft.skills.length > 0) bits.push(fill(t("marketplace.studio_preview_bundled"), { count: draft.skills.length }));
		if (server) bits.push(server);
		return {
			title: displayName || t("marketplace.studio_preview_untitled"),
			description: description || t("marketplace.studio_preview_no_description"),
			detail: bits.join(" · "),
			initial: (displayName || "P").slice(0, 1).toUpperCase()
		};
	}, [draft, t]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": "studio-card-preview",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-micro font-semibold text-muted-foreground",
				children: t("marketplace.studio_preview_label")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-2xl border border-border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 px-3.5 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary/70 to-primary/30 text-sm font-semibold text-primary-foreground",
						children: draft.kind === "skill" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }) : preview.initial
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-sm font-semibold text-foreground",
								children: preview.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 rounded-full border border-border px-1.5 py-px text-micro font-semibold text-muted-foreground",
								children: draft.kind === "skill" ? t("marketplace.kind_skill") : t("marketplace.kind_plugin")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: preview.description
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-t border-border px-3.5 py-2 text-micro text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: preview.detail || "—"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-2 shrink-0 tabular-nums",
						children: ["v", draft.version.trim() || "?"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-micro text-muted-foreground",
				children: t("marketplace.studio_preview_note")
			})
		]
	});
}
function inputCls(hasError) {
	return cn("w-full rounded-lg border bg-background px-2.5 py-1.5 text-sm text-foreground", "placeholder:text-faint-foreground focus:outline-none focus:ring-2 focus:ring-ring", hasError ? "border-destructive/60" : "border-border");
}
function Field({ label, hint, errors, action, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-1 flex items-baseline justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "text-xs font-medium text-foreground",
				children: label
			}), action]
		}),
		children,
		hint && errors.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-micro text-muted-foreground",
			children: hint
		}),
		errors.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-micro text-destructive",
			children: e.error
		}, i))
	] });
}
function KindButton({ active, icon, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		"aria-pressed": active,
		className: cn("inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors", active ? "bg-secondary text-foreground" : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground"),
		children: [icon, label]
	});
}
function PublishedCard({ result, onPublishAnother, t }) {
	const [live, setLive] = (0, import_react.useState)(false);
	const [waitedOut, setWaitedOut] = (0, import_react.useState)(false);
	const queryClient = useQueryClient();
	(0, import_react.useEffect)(() => {
		if (live) queryClient.invalidateQueries({ queryKey: ["marketplace-community"] });
	}, [live, queryClient]);
	(0, import_react.useEffect)(() => {
		if (live) return;
		let ticks = 0;
		const timer = setInterval(async () => {
			ticks += 1;
			if (ticks > 20) {
				setWaitedOut(true);
				clearInterval(timer);
				return;
			}
			try {
				const params = new URLSearchParams({
					name: result.name,
					version: result.version,
					force: "true"
				});
				const res = await fetch(`/api/marketplace/publish/status?${params.toString()}`, { cache: "no-store" });
				if (!res.ok) return;
				if ((await res.json()).live) {
					setLive(true);
					clearInterval(timer);
				}
			} catch {}
		}, 2e4);
		return () => clearInterval(timer);
	}, [live, result]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		"data-testid": "studio-published",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative isolate overflow-hidden rounded-2xl border border-border-strong bg-gradient-to-br from-primary/15 via-card to-card p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "pointer-events-none absolute -z-10 -right-16 -top-16 h-56 w-56 rounded-full bg-secondary blur-3xl"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-micro font-semibold text-muted-foreground",
					children: t("marketplace.studio_done_eyebrow")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5 text-muted-foreground" }),
						result.name,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: ["v", result.version]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-xs leading-relaxed text-muted-foreground",
					children: t("marketplace.studio_done_body")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center gap-2",
					children: [(result.issue_url ?? result.pr_url) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => openExternalUrl(result.issue_url ?? result.pr_url ?? ""),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "mr-1.5 h-3.5 w-3.5" }), t("marketplace.studio_done_view_pr")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: onPublishAnother,
						children: t("marketplace.studio_done_another")
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "space-y-4 rounded-2xl border border-border bg-card p-4",
			children: [live ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-2 text-sm text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-muted-foreground" }), fill(t("marketplace.studio_done_live"), {
					name: result.name,
					version: result.version
				})]
			}) : waitedOut ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: t("marketplace.studio_done_waited_out")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "relative flex h-2 w-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-secondary" })]
				}), t("marketplace.studio_done_watching")]
			}), live && result.install && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallStandard, {
				install: result.install,
				heading: t("marketplace.studio_done_share_heading"),
				note: t("marketplace.studio_done_share_note")
			})]
		})]
	});
}
var MARKETPLACE_WEB_URL = "https://github.com/RoadDog/marketplace";
var HOME_SECTION = {
	plugin: "plugins",
	skill: "skills",
	agent: "agents"
};
function readableText(raw) {
	const text = (raw ?? "").trim();
	return /[\p{L}\p{N}]/u.test(text) ? text : null;
}
function pluginEntry(p) {
	const raw = (p.logo_color ?? "").trim();
	const installedVersion = p.installed_version ?? null;
	return {
		kind: "plugin",
		name: p.id ?? p.name,
		title: p.display_name ?? p.name,
		description: readableText(p.description),
		publisher: p.publisher,
		version: p.version,
		publishedAt: p.published_at ?? null,
		categories: p.category ? [p.category] : [],
		sourceUrl: p.source_url,
		installed: Boolean(p.installed),
		installedVersion,
		updateAvailable: Boolean(p.installed && installedVersion && p.version && installedVersion !== p.version),
		featured: Boolean(p.featured),
		logoSlug: p.logo_slug ?? null,
		logoUrl: p.logo_url ?? null,
		logoColor: /^[0-9a-fA-F]{6}$/.test(raw) ? `#${raw}` : null,
		broken: !p.valid,
		problem: p.error ?? null,
		mcp: p.mcp_server ?? null,
		authMode: p.auth?.mode ?? null,
		seedConflict: Boolean(p.seed_conflict),
		postInstallHint: readableText(p.post_install_hint_md)
	};
}
function skillEntry(s) {
	return {
		kind: "skill",
		name: s.name,
		title: s.title || s.name,
		description: readableText(s.description),
		publisher: s.publisher,
		version: s.version,
		publishedAt: s.published_at ?? null,
		categories: s.categories ?? [],
		sourceUrl: s.source_url,
		installed: Boolean(s.installed),
		portableAgents: s.flavor === "portable" ? s.compatible_agents ?? [] : null
	};
}
function agentEntry(a) {
	return {
		kind: "agent",
		name: a.name,
		title: a.title || a.name,
		description: a.description ?? "",
		publisher: a.publisher,
		version: a.version,
		categories: a.categories ?? [],
		sourceUrl: a.source_url,
		installed: Boolean(a.installed),
		broken: !a.valid,
		problem: a.error ?? null,
		agent: a.agent
	};
}
function AgentTile({ entry }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanionMark, {
			appearance: resolveCompanion(entry.agent?.name || entry.name, entry.agent?.avatar?.companion),
			size: 30
		})
	});
}
function matches(entry, needle) {
	if (!needle) return true;
	return [
		entry.title,
		entry.name,
		entry.description ?? "",
		entry.publisher ?? "",
		entry.categories.join(" ")
	].join(" ").toLowerCase().includes(needle);
}
function passesFilter(entry, filter, login) {
	switch (filter) {
		case "all": return true;
		case "installed": return entry.installed;
		case "mine": return login !== null && entry.publisher === login;
		default: return entry.kind === filter;
	}
}
function storeOrder(a, b) {
	if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1;
	const at = a.publishedAt ? Date.parse(a.publishedAt) : 0;
	const bt = b.publishedAt ? Date.parse(b.publishedAt) : 0;
	if (at !== bt) return bt - at;
	return a.title.localeCompare(b.title);
}
function categoryLabel(category) {
	const spaced = category.replace(/[-_]+/g, " ").trim();
	return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
async function fetchCommunity() {
	const res = await fetch("/api/marketplace/community", { cache: "no-store" });
	if (!res.ok) throw new Error(`Marketplace request failed (${res.status})`);
	return res.json();
}
function MarketplaceView() {
	const t = useT();
	const localeReady = useLocaleChunk("marketplace");
	const queryClient = useQueryClient();
	const setActiveSection = useEventStore((s) => s.setActiveSection);
	const [query, setQuery] = (0, import_react.useState)("");
	const [kindFilter, setKindFilter] = (0, import_react.useState)("all");
	const [openEntry, setOpenEntry] = (0, import_react.useState)(null);
	const [landing, setLanding] = (0, import_react.useState)(null);
	const [studioOpen, setStudioOpen] = (0, import_react.useState)(false);
	const [signInOpen, setSignInOpen] = (0, import_react.useState)(false);
	const searchRef = (0, import_react.useRef)(null);
	const identity = usePublishIdentity();
	const login = identity.data?.signed_in ? identity.data.login ?? null : null;
	const publishEnabled = identity.data?.enabled !== false;
	const { data, isLoading, error, refetch, isRefetching } = useQuery({
		queryKey: ["marketplace-community"],
		queryFn: fetchCommunity,
		refetchInterval: 6e4,
		refetchIntervalInBackground: false
	});
	const refresh = useMutation({
		mutationFn: async () => {
			const res = await fetch("/api/marketplace/community/refresh", { method: "POST" });
			if (!res.ok) throw new Error(`Refresh failed (${res.status})`);
			return res.json();
		},
		onSuccess: (fresh) => queryClient.setQueryData(["marketplace-community"], fresh)
	});
	const install = useMutation({
		mutationFn: async (entry) => {
			const res = await fetch(`/api/marketplace/community/install/${encodeURIComponent(entry.name)}`, { method: "POST" });
			if (!res.ok) {
				const detail = await res.json().then((body) => body.detail).catch(() => void 0);
				throw new Error(detail ?? `Install failed (${res.status})`);
			}
			return res.json();
		},
		onSuccess: (result, installed) => {
			setOpenEntry((current) => current?.name === installed.name ? null : current);
			setLanding(result);
			queryClient.invalidateQueries({ queryKey: ["marketplace-community"] });
			queryClient.invalidateQueries({ queryKey: ["marketplace-plugins"] });
			queryClient.invalidateQueries({ queryKey: ["skills"] });
			queryClient.invalidateQueries({ queryKey: ["society", "roster"] });
		}
	});
	const importAgent = useMutation({
		mutationFn: async (file) => {
			let parsed;
			try {
				parsed = JSON.parse(await readFileText(file));
			} catch {
				throw new Error(fill(t("marketplace.import_failed"), { error: file.name }));
			}
			try {
				const done = await installAgentTemplate(parsed);
				return {
					ok: true,
					kind: "agent",
					id: done.agent.agent_id,
					title: done.agent.name,
					ready: true
				};
			} catch (err) {
				throw new Error(fill(t("marketplace.import_failed"), { error: err.message }));
			}
		},
		onSuccess: (result) => {
			setLanding(result);
			queryClient.invalidateQueries({ queryKey: ["society", "roster"] });
			queryClient.invalidateQueries({ queryKey: ["marketplace-community"] });
		}
	});
	const openDetail = (entry) => {
		if (!install.isPending) install.reset();
		setOpenEntry(entry);
	};
	const modalOpen = openEntry !== null || studioOpen || signInOpen;
	const modalOpenRef = (0, import_react.useRef)(modalOpen);
	modalOpenRef.current = modalOpen;
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey) return;
			if (modalOpenRef.current) return;
			if (event.target?.closest("input, textarea, [contenteditable='true']")) return;
			event.preventDefault();
			searchRef.current?.focus();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	const entries = (0, import_react.useMemo)(() => {
		if (!data) return [];
		return [
			...(data.plugins ?? []).map(pluginEntry),
			...(data.skills ?? []).map(skillEntry),
			...(data.agents ?? []).map(agentEntry)
		].sort(storeOrder);
	}, [data]);
	const needle = query.trim().toLowerCase();
	const searched = (0, import_react.useMemo)(() => entries.filter((e) => matches(e, needle)), [entries, needle]);
	const counts = (0, import_react.useMemo)(() => ({
		all: searched.length,
		plugin: searched.filter((e) => e.kind === "plugin").length,
		skill: searched.filter((e) => e.kind === "skill").length,
		agent: searched.filter((e) => e.kind === "agent").length,
		installed: searched.filter((e) => e.installed).length,
		mine: login ? searched.filter((e) => e.publisher === login).length : 0
	}), [searched, login]);
	const visible = (0, import_react.useMemo)(() => searched.filter((e) => passesFilter(e, kindFilter, login)), [
		searched,
		kindFilter,
		login
	]);
	const plugins = visible.filter((e) => e.kind === "plugin");
	const skills = visible.filter((e) => e.kind === "skill");
	const agents = visible.filter((e) => e.kind === "agent");
	const status = data?.status;
	const offline = status === "stale" || status === "unavailable";
	const ready = !isLoading && !error && localeReady;
	const indexDown = entries.length === 0 && (status === "disabled" || status === "unavailable");
	const frontPage = kindFilter === "all" && !needle;
	const clearAll = () => {
		setQuery("");
		setKindFilter("all");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-full min-h-0 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewHeader, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-4 w-4 text-muted-foreground" }),
				title: t("marketplace.title"),
				subtitle: subtitleFor(t, data, isLoading, localeReady),
				right: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => refresh.mutate(),
							disabled: refresh.isPending,
							title: t("marketplace.refresh"),
							"aria-label": t("marketplace.refresh"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("h-4 w-4", refresh.isPending && "animate-spin") })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => openExternalUrl(MARKETPLACE_WEB_URL),
							title: t("marketplace.open_web"),
							children: [t("marketplace.open_web"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "ml-1.5 h-3.5 w-3.5" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublisherChip, {
							onSignIn: () => setSignInOpen(true),
							onMine: () => {
								setKindFilter("mine");
								setQuery("");
							}
						}),
						publishEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: () => setStudioOpen(true),
							"data-testid": "marketplace-publish",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "mr-1.5 h-3.5 w-3.5" }), t("marketplace.publish_cta")]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shrink-0 border-b border-border px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-full max-w-6xl flex-wrap items-center gap-x-6 gap-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterTabs, {
						active: kindFilter,
						onChange: setKindFilter,
						counts,
						showInstalled: localeReady && entries.some((e) => e.installed),
						showMine: localeReady && login !== null,
						t
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
						inputRef: searchRef,
						value: query,
						onChange: setQuery,
						placeholder: t("marketplace.search_placeholder"),
						clearLabel: t("marketplace.empty_clear")
					})]
				})
			}),
			refresh.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shrink-0 border-b border-destructive/20 bg-destructive/[0.08] px-8 py-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					role: "alert",
					className: "flex w-full max-w-6xl items-center gap-2 text-xs text-destructive",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3.5 w-3.5 shrink-0" }), refresh.error.message]
				})
			}),
			offline && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shrink-0 border-b border-warning/20 bg-warning/[0.08] px-8 py-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-full max-w-6xl items-center gap-2 text-xs text-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3.5 w-3.5 shrink-0 text-warning" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 flex-1",
							children: status === "unavailable" ? t("marketplace.status_unavailable") : t("marketplace.status_stale")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => refresh.mutate(),
							disabled: refresh.isPending,
							children: [refresh.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }), localeReady ? t("marketplace.retry") : t("marketplace.refresh")]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				className: "min-h-0 flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-[calc(72rem+4rem)] px-8 py-6",
					children: [
						(isLoading || !error && !localeReady) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonGrid, {}),
						error && !isLoading && localeReady && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
							title: t("marketplace.error_title"),
							description: error.message,
							actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: () => refetch(),
								disabled: isRefetching,
								children: [isRefetching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }), t("marketplace.retry")]
							})
						}),
						ready && frontPage && !indexDown && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {
							publishEnabled,
							t
						}),
						ready && indexDown && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: status === "disabled" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
							title: status === "disabled" ? t("marketplace.status_disabled") : t("marketplace.error_title"),
							description: status === "unavailable" ? t("marketplace.status_unavailable") : void 0
						}),
						ready && visible.length === 0 && !indexDown && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoResults, {
							query: query.trim(),
							filter: kindFilter,
							onClear: clearAll,
							onPublish: publishEnabled ? () => setStudioOpen(true) : null,
							onBrowseBuiltIn: () => setActiveSection("plugins"),
							t
						}),
						ready && plugins.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shelf, {
							title: t("marketplace.shelf_plugins"),
							hint: t("marketplace.shelf_plugins_hint"),
							count: plugins.length,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntryGrid, {
								entries: plugins,
								onOpen: openDetail,
								t
							})
						}),
						ready && skills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shelf, {
							title: t("marketplace.shelf_skills"),
							hint: t("marketplace.shelf_skills_hint"),
							count: skills.length,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntryGrid, {
								entries: skills,
								onOpen: openDetail,
								t
							})
						}),
						agents.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shelf, {
							title: t("marketplace.shelf_agents"),
							hint: t("marketplace.shelf_agents_hint"),
							count: agents.length,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntryGrid, {
								entries: agents,
								onOpen: openDetail,
								t
							})
						}),
						ready && visible.length > 0 && !indexDown && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublishInvite, {
							enabled: publishEnabled,
							onPublish: () => setStudioOpen(true),
							onImport: (file) => importAgent.mutate(file),
							importing: importAgent.isPending,
							importError: importAgent.error ? importAgent.error.message : null,
							t
						})
					]
				})
			}),
			openEntry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntrySheet, {
				entry: openEntry,
				onClose: () => setOpenEntry(null),
				onInstall: () => install.mutate(openEntry),
				onOpenHome: () => {
					setOpenEntry(null);
					setActiveSection(HOME_SECTION[openEntry.kind]);
				},
				installing: install.isPending && install.variables?.name === openEntry.name,
				installError: install.error && install.variables?.name === openEntry.name ? install.error.message : null,
				t
			}),
			landing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingToast, {
				result: landing,
				onClose: () => setLanding(null),
				t
			}),
			studioOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublishStudio, { onClose: () => setStudioOpen(false) }),
			signInOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GithubSignInDialog, { onClose: () => setSignInOpen(false) })
		]
	});
}
function subtitleFor(t, data, loading, localeReady) {
	if (loading) return t("marketplace.loading");
	if (!data) return "";
	if (data.status === "disabled") return t("marketplace.status_disabled");
	const total = (data.plugins?.length ?? 0) + (data.skills?.length ?? 0) + (data.agents?.length ?? 0);
	const parts = [fill(t("marketplace.subtitle_count"), { count: total })];
	if (data.generated_at && localeReady) parts.push(fill(t("marketplace.subtitle_updated"), { date: formatDate(data.generated_at) }));
	return parts.join(" · ");
}
function formatDate(iso) {
	const parsed = new Date(iso);
	if (Number.isNaN(parsed.getTime())) return iso;
	return parsed.toLocaleDateString(useI18nStore.getState().ui, {
		year: "numeric",
		month: "short",
		day: "numeric"
	});
}
function SearchField({ inputRef, value, onChange, placeholder, clearLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative my-1.5 min-w-[240px] max-w-md flex-1 sm:ml-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				value,
				onChange: (event) => onChange(event.target.value),
				onKeyDown: (event) => {
					if (event.key === "Escape" && value) {
						event.stopPropagation();
						onChange("");
					}
				},
				placeholder,
				"aria-label": placeholder,
				className: cn("h-9 w-full rounded-md border border-border-strong bg-input pl-9 pr-16", "text-base text-foreground placeholder:text-foreground-faint", "transition-colors focus-visible:border-accent focus-visible:outline-none", "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1",
				children: value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						onChange("");
						inputRef.current?.focus();
					},
					"aria-label": clearLabel,
					title: clearLabel,
					className: "grid h-6 w-6 place-items-center rounded text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
					"aria-hidden": true,
					className: "grid h-5 min-w-5 place-items-center rounded border border-border px-1 font-mono text-xs text-muted-foreground",
					children: "/"
				})
			})
		]
	});
}
function FilterTabs({ active, onChange, counts, showInstalled, showMine, t }) {
	const ids = [
		"all",
		"plugin",
		"skill",
		"agent"
	];
	if (showInstalled || active === "installed") ids.push("installed");
	if (showMine) ids.push("mine");
	const label = {
		all: t("marketplace.filter_all"),
		plugin: t("marketplace.filter_plugins"),
		skill: t("marketplace.filter_skills"),
		agent: t("marketplace.filter_agents"),
		installed: t("marketplace.installed"),
		mine: t("marketplace.filter_mine")
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBar, {
		tabs: ids.map((id) => ({
			id,
			label: label[id],
			count: counts[id]
		})),
		active,
		onChange: (id) => onChange(id),
		className: "shrink-0 border-b-0"
	});
}
function Shelf({ title, hint, count, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-10 last:mb-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex flex-wrap items-baseline gap-x-2 gap-y-0.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold text-foreground-strong",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm tabular-nums text-muted-foreground",
					children: count
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-full text-sm text-muted-foreground sm:ml-2 sm:w-auto",
					children: hint
				})
			]
		}), children]
	});
}
var GRID = "grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))]";
function SkeletonGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "status",
		"aria-busy": "true",
		"data-testid": "marketplace-skeleton",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mb-3 h-5 w-32 rounded bg-secondary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: GRID,
			children: Array.from({ length: 6 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-[148px] flex-col gap-3 rounded-lg border border-border bg-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-10 rounded-lg bg-secondary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3.5 w-2/5 rounded bg-secondary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-1/4 rounded bg-secondary" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-full rounded bg-secondary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-3/4 rounded bg-secondary" })]
				})]
			}, index))
		})]
	});
}
var DEFAULT_BRAND_TILE = "#3F3F46";
var INVERTED_MARKS = new Set([
	"github",
	"vercel",
	"notion",
	"cal_com"
]);
function glyphColor(tileHex) {
	const hex = tileHex.replace("#", "");
	if (hex.length !== 6) return "ffffff";
	const [r, g, b] = [
		0,
		2,
		4
	].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
	const lin = (c) => c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
	return .2126 * lin(r) + .7152 * lin(g) + .0722 * lin(b) > .6 ? "111111" : "ffffff";
}
function EntryMark({ entry, size = "md" }) {
	const [failed, setFailed] = (0, import_react.useState)(false);
	const box = size === "lg" ? "h-12 w-12 rounded-xl" : "h-10 w-10 rounded-lg";
	if (entry.broken) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid shrink-0 place-items-center border border-border bg-muted", box),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-muted-foreground" })
	});
	if (entry.kind === "agent") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentTile, { entry });
	if (entry.kind === "skill") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid shrink-0 place-items-center border border-border bg-secondary font-semibold text-foreground", box, size === "lg" ? "text-lg" : "text-base"),
		children: entry.title.slice(0, 1).toUpperCase()
	});
	const tile = entry.logoColor ?? DEFAULT_BRAND_TILE;
	const fullColour = bundledPluginLogo(entry.name) ?? entry.logoUrl ?? null;
	const src = fullColour ?? (entry.logoSlug ? `https://cdn.simpleicons.org/${entry.logoSlug}/${glyphColor(tile)}` : null);
	const monogram = failed || !src;
	const onWhite = Boolean(fullColour) && !monogram;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid shrink-0 place-items-center overflow-hidden border", box, onWhite ? "border-border bg-[hsl(var(--plugin-icon-surface))]" : "border-border/60"),
		style: onWhite ? void 0 : { backgroundColor: tile },
		children: monogram ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-semibold",
			style: { color: `#${glyphColor(tile)}` },
			children: entry.title.slice(0, 1).toUpperCase()
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: "",
			loading: "lazy",
			className: cn(onWhite && INVERTED_MARKS.has(entry.name.replace(/-/g, "_")) && "invert", onWhite ? size === "lg" ? "h-8 w-8" : "h-7 w-7" : size === "lg" ? "h-6 w-6" : "h-5 w-5"),
			onError: () => setFailed(true)
		})
	});
}
function EntryState({ entry, t }) {
	if (entry.updateAvailable) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant: "accent" }), "shrink-0"),
		children: t("marketplace.update_available")
	});
	if (entry.installed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn(badgeVariants({ variant: "success" }), "shrink-0"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}), t("marketplace.installed")]
	});
	return null;
}
function EntryGrid({ entries, onOpen, t }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: GRID,
		children: entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntryCard, {
			entry,
			onOpen,
			t
		}, `${entry.kind}:${entry.name}`))
	});
}
function EntryCard({ entry, onOpen, t }) {
	const meta = [
		entry.categories[0] ? categoryLabel(entry.categories[0]) : null,
		entry.version ? `v${entry.version}` : null,
		entry.publishedAt ? formatDate(entry.publishedAt) : null
	].filter(Boolean);
	const description = entry.broken ? entry.problem ?? t("marketplace.entry_unreadable") : entry.description ?? t("marketplace.description_missing");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onOpen(entry),
		"data-testid": `marketplace-card-${entry.name}`,
		className: cn("group flex min-w-0 flex-col gap-3 rounded-lg border border-border bg-card p-4 text-left shadow-rim", "transition-colors hover:border-border-strong", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-full min-w-0 items-start gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntryMark, { entry }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-base font-semibold text-foreground-strong",
							children: entry.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-sm text-muted-foreground",
							children: entry.publisher ? `@${entry.publisher}` : t(`marketplace.kind_${entry.kind}`)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntryState, {
						entry,
						t
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("line-clamp-2 min-h-[40px] text-base", entry.description || entry.broken ? "text-muted-foreground" : "italic text-foreground-faint"),
				children: description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto flex w-full items-center gap-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 flex-1 truncate tabular-nums",
					children: meta.join(" · ")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 shrink-0 text-foreground-faint transition-colors group-hover:text-foreground" })]
			})
		]
	});
}
function NoResults({ query, filter, onClear, onPublish, onBrowseBuiltIn, t }) {
	if (filter === "mine" && !query) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-testid": "marketplace-empty-mine",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {}),
			title: t("marketplace.empty_mine"),
			actions: onPublish && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				onClick: onPublish,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "mr-1.5 h-3.5 w-3.5" }), t("marketplace.publish_cta")]
			})
		})
	});
	if (query) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {}),
		title: fill(t("marketplace.empty_search"), { query }),
		description: t("marketplace.empty_search_builtin"),
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			onClick: onBrowseBuiltIn,
			children: t("marketplace.browse_builtin")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: "outline",
			onClick: onClear,
			children: t("marketplace.empty_clear")
		})] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, {}),
		title: t("marketplace.empty"),
		actions: filter !== "all" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: "outline",
			onClick: onClear,
			children: t("marketplace.show_all")
		}) : void 0
	});
}
function Hero({ publishEnabled, t }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-8 rounded-lg border border-border bg-card px-5 py-4 shadow-rim",
		"data-testid": "marketplace-hero",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium text-accent",
				children: t("marketplace.hero_eyebrow")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-0.5 text-lg font-semibold text-foreground-strong",
				children: t("marketplace.hero_title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-2xl text-base text-muted-foreground",
				children: publishEnabled ? t("marketplace.hero_body") : t("marketplace.hero_body_browse")
			})
		]
	});
}
function PublishInvite({ enabled, onPublish, onImport, importing, importError, t }) {
	const fileInput = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-10 flex flex-wrap items-center gap-4 rounded-lg border border-dashed border-border-strong px-5 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-4 w-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1 basis-[280px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base font-semibold text-foreground-strong",
						children: t("marketplace.publish_card_title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: enabled ? t("marketplace.publish_card_body") : t("marketplace.publish_hint")
					}),
					importError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						role: "alert",
						className: "mt-1 flex items-start gap-1.5 text-xs text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), importError]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileInput,
						type: "file",
						accept: ".json,application/json",
						className: "hidden",
						"data-testid": "marketplace-import-agent-input",
						onChange: (event) => {
							const file = event.target.files?.[0];
							event.target.value = "";
							if (file) onImport(file);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => fileInput.current?.click(),
						disabled: importing,
						"data-testid": "marketplace-import-agent",
						children: [importing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileInput, { className: "mr-1.5 h-3.5 w-3.5" }), t("marketplace.import_agent")]
					}),
					!enabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => openExternalUrl("https://github.com/RoadDog/marketplace"),
						title: t("marketplace.publish_on_web"),
						children: [t("marketplace.publish_on_web"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "ml-1.5 h-3.5 w-3.5" })]
					}),
					enabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: onPublish,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "mr-1.5 h-3.5 w-3.5" }), t("marketplace.publish_cta")]
					})
				]
			})
		]
	});
}
function useEntryContents(name) {
	return useQuery({
		queryKey: ["marketplace-community-contents", name],
		enabled: name !== null,
		staleTime: 300 * 1e3,
		queryFn: async () => {
			const res = await fetch(`/api/marketplace/community/${encodeURIComponent(name ?? "")}/contents`, { cache: "no-store" });
			if (!res.ok) throw new Error(`Could not read that entry (${res.status})`);
			return res.json();
		}
	});
}
var FOCUSABLE = "a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex=\"-1\"])";
function EntrySheet({ entry, onClose, onInstall, onOpenHome, installing, installError, t }) {
	const contents = useEntryContents(entry.name);
	const sheetRef = (0, import_react.useRef)(null);
	const titleId = `marketplace-sheet-${entry.kind}-${entry.name}`;
	const closeRef = (0, import_react.useRef)(onClose);
	closeRef.current = onClose;
	(0, import_react.useEffect)(() => {
		const opener = document.activeElement;
		sheetRef.current?.querySelector("[data-autofocus]")?.focus();
		const onKey = (event) => {
			if (event.key === "Escape") {
				closeRef.current();
				return;
			}
			if (event.key !== "Tab" || !sheetRef.current) return;
			const stops = Array.from(sheetRef.current.querySelectorAll(FOCUSABLE));
			if (stops.length === 0) return;
			const first = stops[0];
			const last = stops[stops.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => {
			window.removeEventListener("keydown", onKey);
			opener?.focus?.();
		};
	}, []);
	const byline = [
		entry.publisher ? `@${entry.publisher}` : null,
		entry.version ? `v${entry.version}` : null,
		entry.publishedAt ? formatDate(entry.publishedAt) : null
	].filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 z-40 flex justify-end",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			tabIndex: -1,
			"aria-label": t("marketplace.close"),
			onClick: onClose,
			className: "absolute inset-0 bg-scrim/40 backdrop-blur-[2px]"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			ref: sheetRef,
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": titleId,
			className: "relative flex h-full w-full max-w-[520px] flex-col border-l border-border bg-popover shadow-float",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b border-border px-6 pb-5 pt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntryMark, {
							entry,
							size: "lg"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: t(`marketplace.kind_${entry.kind}`)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									id: titleId,
									className: "truncate text-xl font-semibold text-foreground-strong",
									children: entry.title
								}),
								byline && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm text-muted-foreground",
									children: byline
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: onClose,
							"aria-label": t("marketplace.close"),
							"data-autofocus": true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetAction, {
						entry,
						onInstall,
						onOpenHome,
						installing,
						installError,
						t
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				className: "min-h-0 flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6 px-6 py-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetSection, {
							title: t("marketplace.section_about"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: cn("text-base leading-relaxed", entry.description ? "text-foreground" : "italic text-foreground-faint"),
								children: entry.description ?? t("marketplace.description_missing")
							}), entry.categories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex flex-wrap gap-1.5",
								children: entry.categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: categoryLabel(category) }, category))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Destination, {
							entry,
							t
						}),
						entry.postInstallHint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetSection, {
							title: t("marketplace.section_after"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "whitespace-pre-line text-sm text-muted-foreground",
								children: entry.postInstallHint
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetSection, {
							title: t("marketplace.section_trust"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2.5 rounded-lg border border-warning/20 bg-warning/[0.08] px-3 py-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "mt-0.5 h-4 w-4 shrink-0 text-warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm leading-relaxed text-foreground",
									children: t("marketplace.unreviewed_note")
								})]
							}), entry.sourceUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => openExternalUrl(entry.sourceUrl),
								className: "mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline",
								children: [t("marketplace.view_source"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3.5 w-3.5" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetSection, {
							title: t("marketplace.files"),
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5" }),
							children: [
								contents.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), t("marketplace.files_loading")]
								}),
								contents.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-destructive",
									children: contents.error.message
								}),
								contents.data?.error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									role: "alert",
									className: "mb-2 flex items-start gap-2 rounded-lg border border-warning/20 bg-warning/[0.08] px-3 py-2 text-sm text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" }), contents.data.error]
								}),
								contents.data && !(contents.data.error && contents.data.files.length === 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "overflow-hidden rounded-lg border border-border",
									children: [contents.data.files.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "px-3 py-2.5 text-sm text-muted-foreground",
										children: t("marketplace.files_none")
									}), contents.data.files.map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
										open: true,
										className: "group/file border-b border-border bg-background last:border-b-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
											className: "flex cursor-pointer select-none list-none items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary [&::-webkit-details-marker]:hidden",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-open/file:rotate-90" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "min-w-0 flex-1 truncate font-mono",
													children: file.path
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "shrink-0 text-xs tabular-nums text-muted-foreground",
													children: file.size < 1024 ? `${file.size} B` : `${(file.size / 1024).toFixed(1)} kB`
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pre", {
											className: "max-h-72 overflow-auto whitespace-pre-wrap break-words border-t border-border bg-muted px-3 py-2 font-mono text-xs text-muted-foreground",
											children: [file.text, file.truncated ? `\n${t("marketplace.files_truncated")}` : ""]
										})]
									}, file.path))]
								})
							]
						})
					]
				})
			})]
		})]
	});
}
function SheetSection({ title, icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
		className: "mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground-strong",
		children: [icon, title]
	}), children] });
}
function SheetAction({ entry, onInstall, onOpenHome, installing, installError, t }) {
	const home = entry.kind === "plugin" ? t("marketplace.filter_plugins") : t("marketplace.filter_skills");
	let action;
	if (entry.broken) action = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "flex items-start gap-2 text-sm text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), entry.problem ?? t("marketplace.entry_unreadable")]
	});
	else if (entry.installed && !entry.updateAvailable) action = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
			variant: "success",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}), t("marketplace.installed")]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			variant: "outline",
			onClick: onOpenHome,
			children: [fill(t("marketplace.open_in"), { section: home }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "ml-1.5 h-3.5 w-3.5" })]
		})]
	});
	else action = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: onInstall,
			disabled: installing,
			className: "min-w-[120px]",
			children: [installing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), entry.updateAvailable ? fill(t("marketplace.update_to"), { version: entry.version ?? "" }) : t("marketplace.install")]
		}), entry.updateAvailable && entry.installedVersion && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-muted-foreground",
			children: fill(t("marketplace.installed_version"), { version: entry.installedVersion })
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [action, installError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			role: "alert",
			className: "flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/[0.08] px-3 py-2 text-sm text-destructive",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), installError]
		})]
	});
}
function Destination({ entry, t }) {
	const rows = [];
	if (entry.kind === "plugin") {
		const mcp = entry.mcp;
		if (mcp?.transport === "stdio") rows.push({
			label: t("marketplace.runs_command"),
			code: (mcp.install ?? []).join(" ")
		});
		else if (mcp?.url) rows.push({
			label: t("marketplace.sends_data_to"),
			code: mcp.url
		});
		else rows.push({ label: t("marketplace.metadata_only") });
		const auth = entry.authMode ? AUTH_MODE_LABEL[entry.authMode] : void 0;
		if (auth) rows.push({
			label: t("marketplace.sign_in_method"),
			value: auth
		});
	}
	if (entry.kind === "agent" && entry.agent) {
		rows.push({ label: t("marketplace.agent_model") });
		if (entry.agent.focus.length > 0) rows.push({
			label: t("marketplace.agent_focus"),
			value: entry.agent.focus.join(", ")
		});
		rows.push({
			label: t("marketplace.agent_asks"),
			value: entry.agent.require_approval.length > 0 ? entry.agent.require_approval.join(", ") : t("marketplace.agent_asks_default")
		});
		rows.push({
			label: t("marketplace.agent_instructions"),
			text: entry.agent.instructions
		});
	}
	if (entry.portableAgents) rows.push({
		label: t("marketplace.portable_skill"),
		value: entry.portableAgents.length > 0 ? entry.portableAgents.join(", ") : t("marketplace.portable_any")
	});
	if (rows.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetSection, {
		title: entry.kind === "plugin" ? t("marketplace.section_data") : t("marketplace.section_runs"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [entry.seedConflict && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-start gap-2 rounded-lg border border-warning/20 bg-warning/[0.08] px-3 py-2 text-sm text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" }), t("marketplace.seed_conflict")]
			}), rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1 text-sm text-muted-foreground",
					children: row.label
				}),
				row.code && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
					className: "block break-all rounded-md border border-border bg-muted px-2.5 py-1.5 font-mono text-sm text-foreground",
					children: row.code
				}),
				row.text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-h-56 overflow-auto whitespace-pre-wrap text-sm text-foreground",
					children: row.text
				}),
				row.value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-foreground",
					children: row.value
				})
			] }, row.label))]
		})
	});
}
var AUTH_MODE_LABEL = {
	pat_paste: "Personal access token",
	oauth_device_flow: "Device sign-in",
	hosted_mcp_oauth_dcr: "OAuth sign-in",
	oauth_pkce_loopback: "OAuth sign-in",
	hosted_mcp_allowlist: "Account allowlist"
};
function LandingToast({ result, onClose, t }) {
	const setActiveSection = useEventStore((s) => s.setActiveSection);
	const target = HOME_SECTION[result.kind] ?? "skills";
	const ready = result.ready !== false;
	const warn = Boolean(result.problem) || !ready && result.kind !== "plugin";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute inset-x-0 bottom-0 z-50 flex justify-center p-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "status",
			className: "pointer-events-auto flex w-full max-w-lg items-start gap-3 rounded-xl border border-border-strong bg-popover px-4 py-3 shadow-float",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg", warn ? "bg-warning/[0.12] text-warning" : "bg-success/[0.12] text-success"),
					children: warn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base font-medium text-foreground-strong",
						children: fill(t("marketplace.landed_title"), { title: result.title ?? result.id ?? "" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: result.problem ? result.problem : ready || result.kind === "plugin" ? t(`marketplace.landed_${result.kind}`) : t("marketplace.landed_needs_connect")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => {
							onClose();
							setActiveSection(target);
						},
						children: t("marketplace.landed_open")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: onClose,
						"aria-label": t("marketplace.close"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				})
			]
		})
	});
}
export { MarketplaceView };
