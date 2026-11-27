import { t as Check } from "./check-vbwKkbPq.js";
import { n as CloudUpload, t as Store } from "./store-DvnTMCAH.js";
import { Bc as require_jsx_runtime, Dc as useMutation, Et as openExternalUrl, F as robustCopy, Ln as cn, Oc as useQuery, Vi as ExternalLink, Wi as Copy, Xc as require_react, gi as Search, ji as LoaderCircle, li as TriangleAlert, ln as Button, na as createLucideIcon, tl as __toESM, ui as Trash2, wc as useEventStore, yi as RefreshCw, zc as useQueryClient } from "./index-BOzhgzD7.js";
import { r as PRODUCT_NAME } from "./branding-DNImmT_K.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var FolderUp = createLucideIcon("FolderUp", [
	["path", {
		d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
		key: "1kt360"
	}],
	["path", {
		d: "M12 10v6",
		key: "1bos4e"
	}],
	["path", {
		d: "m9 13 3-3 3 3",
		key: "1pxg3c"
	}]
]);
var NAME_RE = /^[a-z0-9](?:[a-z0-9.-]{0,62}[a-z0-9])?$/;
var GITHUB_SEGMENT_RE = /^[A-Za-z0-9._-]{1,100}$/;
function stripRefPrefix(segments) {
	if (segments[0] === "refs" && (segments[1] === "heads" || segments[1] === "tags")) return segments.slice(3);
	return segments.slice(1);
}
function safeSegment(value) {
	if (!value) return null;
	if (value === "." || value === "..") return null;
	return GITHUB_SEGMENT_RE.test(value) ? value : null;
}
function skillsShTarget(name, source = {}) {
	const raw = parseRawUrl(source.rawUrl);
	if (raw) return raw;
	const repo = parseRepoUrl(source.sourceUrl);
	if (!repo) return null;
	return {
		repo,
		skill: safeSegment(name)
	};
}
function parseRawUrl(rawUrl) {
	const url = parseHttpsUrl(rawUrl);
	if (!url || url.hostname !== "raw.githubusercontent.com") return null;
	const parts = url.pathname.split("/").filter(Boolean);
	const owner = safeSegment(parts[0]);
	const repo = safeSegment(stripGitSuffix(parts[1]));
	if (!owner || !repo) return null;
	const path = stripRefPrefix(parts.slice(2));
	if (path[path.length - 1] !== "SKILL.md") return null;
	const folder = path.length >= 2 ? safeSegment(path[path.length - 2]) : null;
	return {
		repo: `${owner}/${repo}`,
		skill: folder
	};
}
function parseRepoUrl(sourceUrl) {
	const url = parseHttpsUrl(sourceUrl);
	if (!url) return null;
	if (url.hostname !== "github.com" && url.hostname !== "www.github.com") return null;
	const parts = url.pathname.split("/").filter(Boolean);
	const owner = safeSegment(parts[0]);
	const repo = safeSegment(stripGitSuffix(parts[1]));
	if (!owner || !repo) return null;
	return `${owner}/${repo}`;
}
function stripGitSuffix(value) {
	return value?.endsWith(".git") ? value.slice(0, -4) : value;
}
function parseHttpsUrl(value) {
	if (!value) return null;
	try {
		const url = new URL(value);
		return url.protocol === "https:" ? url : null;
	} catch {
		return null;
	}
}
function skillsShCommand(target) {
	const base = `npx skills add ${target.repo}`;
	return target.skill ? `${base} --skill ${target.skill}` : base;
}
function installBlock(name, kind, source = {}) {
	if (!NAME_RE.test(name) || name.includes("..")) return null;
	const cli = `jarvis marketplace install ${name}`;
	const commands = [{
		id: "jarvis",
		label: "Road Dog",
		command: cli,
		note: "Runs in any terminal while Road Dog is running."
	}];
	if (kind === "skill") {
		const target = skillsShTarget(name, source);
		if (target) commands.push({
			id: "skills",
			label: "skills.sh",
			command: skillsShCommand(target),
			note: "Installs the same skill into Claude Code, Cursor, Codex, and other agents."
		});
	}
	return {
		cli,
		runner: `uvx --from road-dog ${cli}`,
		prompt: `Install the "${name}" ${kind} from the community marketplace.`,
		commands
	};
}
function shellPrompt() {
	if (typeof navigator === "undefined") return "$";
	const ua = navigator.userAgent;
	return /windows/i.test(ua) ? "PS>" : "$";
}
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function InstallTerminal({ commands, path, comment, className }) {
	const [activeId, setActiveId] = (0, import_react.useState)(commands[0]?.id);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const resetTimer = (0, import_react.useRef)(void 0);
	(0, import_react.useEffect)(() => () => window.clearTimeout(resetTimer.current), []);
	const active = commands.find((c) => c.id === activeId) ?? commands[0];
	const onCopy = (0, import_react.useCallback)(async () => {
		if (!active) return;
		if (!await robustCopy(active.command)) return;
		setCopied(true);
		window.clearTimeout(resetTimer.current);
		resetTimer.current = window.setTimeout(() => setCopied(false), 2e3);
	}, [active]);
	if (!active) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [
			commands.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "tablist",
				"aria-label": "Install method",
				className: "mb-1.5 flex gap-1",
				children: commands.map((cmd) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": cmd.id === active.id,
					onClick: () => {
						setActiveId(cmd.id);
						window.clearTimeout(resetTimer.current);
						setCopied(false);
					},
					className: cn("rounded-md border px-2 py-1 font-mono text-xs transition-colors", cmd.id === active.id ? "border-accent bg-accent/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground"),
					children: cmd.label
				}, cmd.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-xl border border-border bg-card/60",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 border-b border-border bg-muted/40 px-3 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"aria-hidden": true,
								className: "flex shrink-0 gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "h-2 w-2 rounded-full bg-accent/70" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "h-2 w-2 rounded-full bg-muted-foreground/30" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "h-2 w-2 rounded-full bg-muted-foreground/30" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate font-mono text-xs text-muted-foreground",
								children: path
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: onCopy,
								"aria-label": "Copy the install command",
								className: cn("ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-xs transition-colors", copied ? "border-accent bg-accent text-accent-foreground" : "border-border text-muted-foreground hover:text-foreground"),
								children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3 w-3" }), copied ? "Copied" : "Copy"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-3 py-2.5",
						children: [comment && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "install-cmd text-xs text-muted-foreground",
							children: comment
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "install-cmd text-xs text-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mr-1.5 select-none font-semibold text-accent",
									children: shellPrompt()
								}),
								active.command,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									className: "install-caret"
								})
							]
						})]
					})
				]
			}),
			active.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-xs text-muted-foreground",
				children: active.note
			})
		]
	});
}
const MARKETPLACE_SUBMIT_URL = "https://github.com/RoadDog/marketplace";
function portableNote(skill) {
	if (skill.flavor !== "portable") return null;
	const agents = (skill.compatible_agents ?? []).filter(Boolean);
	return agents.length > 0 ? `Portable skill · also runs in ${agents.join(", ")}` : "Portable skill · also runs in other agents";
}
async function fetchCommunity() {
	const res = await fetch("/api/marketplace/community", { cache: "no-store" });
	if (!res.ok) throw new Error(`Community index request failed (${res.status})`);
	return res.json();
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
function formatBytes(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	return `${(bytes / 1024).toFixed(1)} kB`;
}
var AUTH_MODE_LABEL = {
	pat_paste: "Personal access token",
	oauth_device_flow: "Device sign-in",
	hosted_mcp_oauth_dcr: "OAuth sign-in",
	oauth_pkce_loopback: "OAuth sign-in",
	hosted_mcp_allowlist: "Account allowlist"
};
function CommunityTab({ onInstalled } = {}) {
	const queryClient = useQueryClient();
	const setActiveSection = useEventStore((s) => s.setActiveSection);
	const { data, isLoading, error } = useQuery({
		queryKey: ["marketplace-community"],
		queryFn: fetchCommunity
	});
	const [query, setQuery] = (0, import_react.useState)("");
	const [consentPlugin, setConsentPlugin] = (0, import_react.useState)(null);
	const [consentSkill, setConsentSkill] = (0, import_react.useState)(null);
	const refreshMutation = useMutation({
		mutationFn: async () => {
			const res = await fetch("/api/marketplace/community/refresh", { method: "POST" });
			if (!res.ok) throw new Error(`Refresh failed (${res.status})`);
			return res.json();
		},
		onSuccess: (fresh) => {
			queryClient.setQueryData(["marketplace-community"], fresh);
		}
	});
	const installMutation = useMutation({
		mutationFn: async (name) => {
			const res = await fetch(`/api/marketplace/community/plugins/${encodeURIComponent(name)}/install`, { method: "POST" });
			if (!res.ok) {
				const detail = await res.json().then((body) => body.detail).catch(() => void 0);
				throw new Error(detail ?? `Install failed (${res.status})`);
			}
			return res.json();
		},
		onSuccess: (_data, name) => {
			setConsentPlugin(null);
			queryClient.invalidateQueries({ queryKey: ["marketplace-community"] });
			queryClient.invalidateQueries({ queryKey: ["marketplace-plugins"] });
			onInstalled?.(name);
		}
	});
	const uninstallMutation = useMutation({
		mutationFn: async (name) => {
			const res = await fetch(`/api/marketplace/community/plugins/${encodeURIComponent(name)}`, { method: "DELETE" });
			if (!res.ok) throw new Error(`Remove failed (${res.status})`);
			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["marketplace-community"] });
			queryClient.invalidateQueries({ queryKey: ["marketplace-plugins"] });
		}
	});
	const skillInstallMutation = useMutation({
		mutationFn: async (skill) => {
			const res = await fetch(`/api/marketplace/community/install/${encodeURIComponent(skill.name)}`, { method: "POST" });
			if (!res.ok) {
				const detail = await res.json().then((body) => body.detail).catch(() => void 0);
				throw new Error(detail ?? `Install failed (${res.status})`);
			}
			return res.json();
		},
		onSuccess: () => {
			setConsentSkill(null);
			queryClient.invalidateQueries({ queryKey: ["marketplace-community"] });
			queryClient.invalidateQueries({ queryKey: ["skills"] });
		}
	});
	const q = query.trim().toLowerCase();
	const plugins = (0, import_react.useMemo)(() => (data?.plugins ?? []).filter((p) => {
		if (!q) return true;
		return p.name.toLowerCase().includes(q) || (p.display_name ?? "").toLowerCase().includes(q) || (p.description ?? "").toLowerCase().includes(q);
	}), [data, q]);
	const skills = (0, import_react.useMemo)(() => (data?.skills ?? []).filter((s) => {
		if (!q) return true;
		return s.name.toLowerCase().includes(q) || s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
	}), [data, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-base font-semibold tracking-tight text-foreground",
							children: "Community marketplace"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Plugins and skills published by anyone. Nothing here is reviewed by the ",
								PRODUCT_NAME,
								" team — read what a card would connect to before installing it."
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => setActiveSection("marketplace"),
						title: "The whole marketplace — plugins and skills — in its own section",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "mr-1.5 h-3.5 w-3.5" }), "Marketplace section"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => openExternalUrl(MARKETPLACE_SUBMIT_URL),
						title: "Publish your own plugin or skill on the marketplace website",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "mr-1.5 h-3.5 w-3.5" }), "Publish your own"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => refreshMutation.mutate(),
						disabled: refreshMutation.isPending,
						title: "Re-fetch the community index",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("h-3.5 w-3.5", refreshMutation.isPending && "animate-spin") })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusNotice, {
				status: data?.status,
				error,
				isLoading
			}),
			(data?.plugins.length ?? 0) + (data?.skills.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Search community plugins and skills…",
					className: "w-full bg-transparent text-sm text-foreground outline-none placeholder:text-faint-foreground"
				})]
			}),
			plugins.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-3 font-display text-xs font-semibold text-muted-foreground",
				children: "Plugins"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2 sm:grid-cols-2",
				children: plugins.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommunityPluginRow, {
					plugin: p,
					onInstall: () => setConsentPlugin(p),
					onUninstall: () => uninstallMutation.mutate(p.name),
					uninstalling: uninstallMutation.isPending && uninstallMutation.variables === p.name
				}, p.name))
			})] }),
			skills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-3 font-display text-xs font-semibold text-muted-foreground",
				children: "Skills"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2 sm:grid-cols-2",
				children: skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommunitySkillRow, {
					skill: s,
					onInstall: () => setConsentSkill(s),
					installing: skillInstallMutation.isPending && skillInstallMutation.variables?.name === s.name,
					installError: skillInstallMutation.variables?.name === s.name && skillInstallMutation.error instanceof Error ? skillInstallMutation.error.message : null
				}, s.name))
			})] }),
			consentPlugin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallConsentDialog, {
				plugin: consentPlugin,
				isPending: installMutation.isPending,
				errorMessage: installMutation.error instanceof Error ? installMutation.error.message : null,
				onCancel: () => {
					setConsentPlugin(null);
					installMutation.reset();
				},
				onConfirm: () => installMutation.mutate(consentPlugin.name)
			}),
			consentSkill && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillInstallConsentDialog, {
				skill: consentSkill,
				isPending: skillInstallMutation.isPending,
				errorMessage: skillInstallMutation.error instanceof Error ? skillInstallMutation.error.message : null,
				onCancel: () => {
					setConsentSkill(null);
					skillInstallMutation.reset();
				},
				onConfirm: () => skillInstallMutation.mutate(consentSkill)
			})
		]
	});
}
function StatusNotice({ status, error, isLoading }) {
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "flex items-center gap-2 text-sm text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), " Loading community index…"]
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		tone: "error",
		children: "The community index could not be loaded. Check the connection and try Refresh."
	});
	if (status === "disabled") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		tone: "muted",
		children: "The community marketplace is switched off in the configuration (marketplace.community_index_url is empty)."
	});
	if (status === "unavailable") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		tone: "error",
		children: "The community index is unreachable and no saved copy exists yet. Connect to the internet once to load it."
	});
	if (status === "stale") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		tone: "warn",
		children: "Showing a saved copy — the index could not be refreshed just now."
	});
	return null;
}
function Notice({ tone, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: cn("flex items-start gap-2 rounded-lg border px-3 py-2 text-xs", tone === "muted" && "border-border bg-card text-muted-foreground", tone === "warn" && "bg-secondary text-foreground", tone === "error" && "bg-secondary text-destructive"),
		children: [tone !== "muted" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children })]
	});
}
function ContentsPanel({ name }) {
	const { data, isLoading, error } = useEntryContents(name);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "flex items-center gap-2 text-xs text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), " Reading the published files…"]
	});
	if (error || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		tone: "warn",
		children: "The published files could not be read just now. The install below is unaffected — but you would be installing something you have not seen."
	});
	if (data.error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		tone: "warn",
		children: data.error
	});
	if (data.files.length === 0) return null;
	const total = data.files.reduce((sum, file) => sum + file.size, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-1.5 flex items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium text-foreground",
				children: "What's inside"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "shrink-0 text-micro text-muted-foreground",
				children: [
					data.files.length === 1 ? "1 file" : `${data.files.length} files`,
					" ·",
					" ",
					formatBytes(total)
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-md border border-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border-b border-border bg-muted px-2.5 py-1.5 font-mono text-micro text-muted-foreground",
				children: data.root
			}), data.files.map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border last:border-b-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3 bg-card px-2.5 py-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate font-mono text-micro text-foreground",
							children: file.path
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 font-mono text-micro text-muted-foreground",
							children: formatBytes(file.size)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "max-h-[420px] overflow-auto bg-background px-2.5 py-2 font-mono text-micro text-muted-foreground",
						children: file.text
					}),
					file.truncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "bg-card px-2.5 py-1.5 text-micro text-foreground",
						children: "Shown up to 256 kB — the published file is longer. Open the source to read the rest."
					})
				]
			}, file.path))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1.5 text-micro text-muted-foreground",
			children: [
				"Exactly as published. These are the bytes ",
				PRODUCT_NAME,
				" downloads when you install it — nothing is added or rewritten in between."
			]
		})
	] });
}
function CommunityTile({ plugin }) {
	const [failed, setFailed] = (0, import_react.useState)(false);
	const raw = (plugin.logo_color ?? "").trim();
	const tile = /^[0-9a-fA-F]{6}$/.test(raw) ? `#${raw}` : "#3f3f46";
	const src = plugin.logo_url ?? (plugin.logo_slug ? `https://cdn.simpleicons.org/${plugin.logo_slug}/F4F4F5` : void 0);
	const name = plugin.display_name ?? plugin.name;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg border border-border",
		style: { backgroundColor: tile },
		children: failed || !src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-semibold text-white/90",
			children: name.slice(0, 1).toUpperCase()
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: "",
			className: "h-5 w-5",
			loading: "lazy",
			onError: () => setFailed(true)
		})
	});
}
function CommunityPluginRow({ plugin, onInstall, onUninstall, uninstalling }) {
	const name = plugin.display_name ?? plugin.name;
	if (!plugin.valid) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 opacity-70",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-muted-foreground" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "truncate text-sm font-semibold text-foreground",
				children: plugin.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "truncate text-xs text-muted-foreground",
				title: plugin.error,
				children: ["Not installable: ", plugin.error]
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("group flex items-center gap-3 rounded-lg border bg-card px-3 py-2.5 transition-[colors,box-shadow]", plugin.installed ? "border-primary/30" : "border-border hover:border-border-strong hover:bg-secondary"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommunityTile, { plugin }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onInstall,
				className: "min-w-0 flex-1 text-left",
				title: `Read what ${name} contains`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-x-2 gap-y-0.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "min-w-0 max-w-full truncate text-sm font-semibold tracking-tight text-foreground",
								children: name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 text-micro font-medium text-foreground",
								children: "Community · not reviewed"
							}),
							plugin.installed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 text-micro font-medium text-foreground-strong",
								children: "· Installed"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-xs text-muted-foreground",
						title: plugin.description,
						children: plugin.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "truncate text-micro text-muted-foreground",
						children: [plugin.publisher ? `by ${plugin.publisher}` : "unknown publisher", plugin.version ? ` · v${plugin.version}` : ""]
					})
				]
			}),
			plugin.source_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => openExternalUrl(plugin.source_url ?? ""),
				className: "grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
				title: "View the published source",
				"aria-label": `View source of ${name}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" })
			}),
			plugin.installed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "ghost",
				onClick: onUninstall,
				disabled: uninstalling,
				title: "Remove this plugin and its stored access",
				children: uninstalling ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
			}) : plugin.seed_conflict ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 text-micro text-muted-foreground",
				title: "A built-in plugin already uses this name",
				children: "Name taken"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "outline",
				onClick: onInstall,
				children: "Install"
			})
		]
	});
}
function CommunitySkillRow({ skill, onInstall, installing, installError }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("flex items-center gap-3 rounded-lg border bg-card px-3 py-2.5", skill.installed ? "border-primary/30" : "border-border hover:border-border-strong hover:bg-secondary"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onInstall,
				className: "min-w-0 flex-1 text-left",
				title: `Read what ${skill.title} tells the assistant`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-x-2 gap-y-0.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "min-w-0 max-w-full truncate text-sm font-semibold tracking-tight text-foreground",
								children: skill.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 text-micro font-medium text-foreground",
								children: "Community · not reviewed"
							}),
							skill.flavor === "portable" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 rounded-full border border-border px-1.5 text-micro font-medium text-muted-foreground",
								title: portableNote(skill) ?? void 0,
								children: "Portable"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-xs text-muted-foreground",
						title: skill.description,
						children: skill.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "truncate text-micro text-muted-foreground",
						children: [skill.publisher ? `by ${skill.publisher}` : "unknown publisher", installError ? ` · ${installError}` : ""]
					})
				]
			}),
			skill.source_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => openExternalUrl(skill.source_url ?? ""),
				className: "grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
				title: "View the published source",
				"aria-label": `View source of ${skill.title}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" })
			}),
			skill.installed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex shrink-0 items-center gap-1 text-micro font-medium text-foreground-strong",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }), " Installed"]
			}) : skill.raw_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "outline",
				onClick: onInstall,
				disabled: installing,
				children: installing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : "Install"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 text-micro text-muted-foreground",
				title: "No direct download — open the source and follow its steps",
				children: "Manual"
			})
		]
	});
}
function SkillInstallConsentDialog({ skill, isPending, errorMessage, onCancel, onConfirm }) {
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape" && !isPending) onCancel();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onCancel, isPending]);
	const skillInstall = installBlock(skill.name, "skill", {
		sourceUrl: skill.source_url,
		rawUrl: skill.raw_url
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "community-skill-install-title",
		className: "fixed inset-0 z-50 flex items-center justify-center bg-scrim/70 backdrop-blur-sm",
		onClick: (e) => {
			if (e.target === e.currentTarget && !isPending) onCancel();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-popover shadow-float",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "border-b border-border px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "community-skill-install-title",
						className: "font-display text-base font-semibold tracking-tight",
						children: skill.installed ? skill.title : `Install ${skill.title}?`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-micro text-foreground",
						children: ["Community skill · not reviewed", skill.installed ? " · installed" : ""]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-h-0 flex-1 space-y-3 overflow-y-auto px-5 py-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: skill.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Published by",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground",
									children: skill.publisher ?? "an unknown author"
								}),
								skill.version ? ` · version ${skill.version}` : ""
							]
						}),
						portableNote(skill) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								portableNote(skill),
								". ",
								"Road Dog",
								" follows its instructions and ignores the settings meant for other agents."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentsPanel, { name: skill.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-1 text-xs font-medium text-foreground",
							children: "The instructions are downloaded from:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "block break-all rounded-md border border-border bg-muted px-2 py-1.5 text-xs text-foreground",
							children: skill.raw_url
						})] }),
						skillInstall && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallTerminal, {
							commands: skillInstall.commands,
							path: `~/marketplace/${skill.name}`,
							comment: "# The same install, from a terminal."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "A skill is a set of instructions the assistant follows — the text above is exactly what it would be told to do."
						}),
						errorMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-start gap-2 rounded-md bg-secondary px-2 py-1.5 text-xs text-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), errorMessage]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "flex shrink-0 justify-end gap-2 border-t border-border px-5 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: onCancel,
						disabled: isPending,
						children: skill.installed ? "Close" : "Cancel"
					}), !skill.installed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: onConfirm,
						disabled: isPending,
						children: [isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }) : null, "Install"]
					})]
				})
			]
		})
	});
}
function InstallConsentDialog({ plugin, isPending, errorMessage, onCancel, onConfirm }) {
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape" && !isPending) onCancel();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onCancel, isPending]);
	const name = plugin.display_name ?? plugin.name;
	const mcp = plugin.mcp_server ?? null;
	const authLabel = plugin.auth ? AUTH_MODE_LABEL[plugin.auth.mode] : void 0;
	const pluginInstall = installBlock(plugin.name, "plugin");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "community-install-title",
		className: "fixed inset-0 z-50 flex items-center justify-center bg-scrim/70 backdrop-blur-sm",
		onClick: (e) => {
			if (e.target === e.currentTarget && !isPending) onCancel();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-popover shadow-float",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center gap-3 border-b border-border px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommunityTile, { plugin }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "community-install-title",
							className: "font-display text-base font-semibold tracking-tight",
							children: plugin.installed ? name : `Install ${name}?`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-micro text-foreground",
							children: ["Community plugin · not reviewed", plugin.installed ? " · installed" : ""]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-h-0 flex-1 space-y-3 overflow-y-auto px-5 py-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: plugin.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Published by",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground",
									children: plugin.publisher ?? "an unknown author"
								}),
								plugin.version ? ` · version ${plugin.version}` : ""
							]
						}),
						mcp?.transport === "http" && mcp.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-1 text-xs font-medium text-foreground",
							children: [
								"After you connect it, requests and your ",
								name,
								" access token go to:"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "block break-all rounded-md border border-border bg-muted px-2 py-1.5 text-xs text-foreground",
							children: mcp.url
						})] }),
						mcp?.transport === "stdio" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-1 text-xs font-medium text-foreground",
							children: "After you connect it, this command runs on your computer:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "block break-all rounded-md border border-border bg-muted px-2 py-1.5 text-xs text-foreground",
							children: (mcp.install ?? []).join(" ")
						})] }),
						!mcp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "This entry is metadata only — it adds no server and runs no command."
						}),
						authLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Sign-in method: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground",
									children: authLabel
								}),
								" ",
								"— installing does not connect anything yet."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentsPanel, { name: plugin.name }),
						pluginInstall && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallTerminal, {
							commands: pluginInstall.commands,
							path: `~/marketplace/${plugin.name}`,
							comment: "# The same install, from a terminal."
						}),
						errorMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-start gap-2 rounded-md bg-secondary px-2 py-1.5 text-xs text-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), errorMessage]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "flex shrink-0 justify-end gap-2 border-t border-border px-5 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: onCancel,
						disabled: isPending,
						children: plugin.installed ? "Close" : "Cancel"
					}), !plugin.installed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: onConfirm,
						disabled: isPending,
						children: [isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }) : null, "Install"]
					})]
				})
			]
		})
	});
}
export { MARKETPLACE_SUBMIT_URL as n, FolderUp as r, CommunityTab as t };
