const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ObsidianButton-Dv1jnhGj.js","assets/index-BOzhgzD7.js","assets/index-CA6QM4ps.css","assets/obsidian-L_mA5p20.js","assets/WikiGraph-IDCmX85x.js","assets/wikiGraph-DRDUqbgx.js","assets/ordinal-BcDMmRjO.js","assets/string-ByKlHLQg.js","assets/locate-fixed-3-Tbi-pC.js","assets/KindGlyph-BCcFbsIV.js"])))=>i.map(i=>d[i]);
import { t as Activity } from "./activity-D8OdjOtY.js";
import { t as ArrowUpRight } from "./arrow-up-right-uLYmS_nN.js";
import { t as BookOpen } from "./book-open-DEmwG-44.js";
import { t as Check } from "./check-vbwKkbPq.js";
import { t as ChevronRight } from "./chevron-right-BjVJ-R2c.js";
import { t as CircleHelp } from "./circle-help-DKzY4WtF.js";
import { t as FileText } from "./file-text-D8DI7Rfv.js";
import { t as Maximize2 } from "./maximize-2-BK4_PjjK.js";
import { t as Minimize2 } from "./minimize-2-7t9R1z2X.js";
import { Bc as require_jsx_runtime, Ki as CircleCheck, Ln as cn, Oc as useQuery, Uc as keepPreviousData, Ui as Download, Vi as ExternalLink, Xc as require_react, cc as __vitePreload, dt as useWikiPanelStore, gi as Search, ji as LoaderCircle, li as TriangleAlert, ln as Button, na as createLucideIcon, nt as EmptyState, oc as useT, sc as useUiLanguage, si as X, tl as __toESM, ut as WIKI_INSPECTOR_ID, vc as WSClient, wc as useEventStore, yi as RefreshCw, zc as useQueryClient } from "./index-BOzhgzD7.js";
import { t as _e } from "./dist-B6qknip3.js";
import { n as Markdown, t as remarkGfm } from "./lib-BoWxqGgd.js";
import "./combobox-BL3mwl7r.js";
import { t as BrandedSelect } from "./select-vogX_D37.js";
import { n as fetchObsidianVaults, r as registerObsidianVault, t as buildObsidianUrl } from "./obsidian-L_mA5p20.js";
import { _ as uniqueEdges, a as cleanTitle, c as groupOfKind, d as libraryItems, f as matchesFilter, h as relativeAge, m as recentItems, n as GROUP_LABEL_KEY, o as compactAge, p as readableSnippet, s as degreeOf, t as KindGlyph, u as libraryGroups } from "./KindGlyph-BCcFbsIV.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Network = createLucideIcon("Network", [
	["rect", {
		x: "16",
		y: "16",
		width: "6",
		height: "6",
		rx: "1",
		key: "4q2zg0"
	}],
	["rect", {
		x: "2",
		y: "16",
		width: "6",
		height: "6",
		rx: "1",
		key: "8cvhb9"
	}],
	["rect", {
		x: "9",
		y: "2",
		width: "6",
		height: "6",
		rx: "1",
		key: "1egb70"
	}],
	["path", {
		d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3",
		key: "1jsf9p"
	}],
	["path", {
		d: "M12 12V8",
		key: "2874zd"
	}]
]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
async function getJson(url) {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
	return await res.json();
}
async function fetchWikiTree() {
	return getJson("/api/wiki/tree");
}
async function fetchWikiPage(slug) {
	return getJson(`/api/wiki/page/${encodeURIComponent(slug)}`);
}
async function fetchWikiGraph() {
	return getJson("/api/wiki/graph");
}
async function fetchWikiBacklinks(slug) {
	return getJson(`/api/wiki/backlinks/${encodeURIComponent(slug)}`);
}
async function fetchWikiHealth() {
	try {
		const res = await fetch("/api/wiki/health");
		if (!res.ok) return null;
		const body = await res.json();
		return body.ok && body.health ? body.health : null;
	} catch {
		return null;
	}
}
async function rebuildWikiIndex() {
	const res = await fetch("/api/wiki/reindex", { method: "POST" });
	if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
	return await res.json();
}
function isPageChanged(value) {
	if (typeof value !== "object" || value === null) return false;
	const message = value;
	return message.type === "page_changed" && typeof message.slug === "string" && typeof message.path === "string" && (message.kind === "created" || message.kind === "modified" || message.kind === "deleted");
}
function buildWsUrl() {
	return `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}/api/wiki/live`;
}
function useWikiLive() {
	const queryClient = useQueryClient();
	const [connected, setConnected] = (0, import_react.useState)(false);
	const [lastEventAt, setLastEventAt] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		const invalidateWikiProjection = () => {
			for (const queryKey of [
				["wiki", "tree"],
				["wiki", "graph"],
				["wiki", "health"],
				["wiki", "search"],
				["wiki", "page"],
				["wiki", "backlinks"]
			]) queryClient.invalidateQueries({ queryKey });
		};
		const client = new WSClient({
			url: buildWsUrl(),
			onOpen: () => {
				if (!active) return;
				setConnected(true);
				invalidateWikiProjection();
			},
			onMessage: (message) => {
				if (!active || !isPageChanged(message)) return;
				invalidateWikiProjection();
				setLastEventAt(Date.now());
			},
			onClose: () => {
				if (!active) return;
				setConnected(false);
			}
		});
		client.connect();
		return () => {
			active = false;
			client.close();
		};
	}, [queryClient]);
	return {
		connected,
		lastEventAt
	};
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var DEFAULT_OPEN = new Set([
	"entity",
	"project",
	"concept"
]);
function WikiLibrary({ folders, isLoading, isError, selectedSlug, onSelect, header }) {
	const t = useT();
	const language = useUiLanguage();
	const [query, setQuery] = (0, import_react.useState)("");
	const [openGroups, setOpenGroups] = (0, import_react.useState)(() => new Set(DEFAULT_OPEN));
	const items = (0, import_react.useMemo)(() => libraryItems(folders), [folders]);
	const filtered = (0, import_react.useMemo)(() => query.trim() ? items.filter((item) => matchesFilter(item, query)) : items, [items, query]);
	const groups = (0, import_react.useMemo)(() => libraryGroups(filtered), [filtered]);
	const recent = (0, import_react.useMemo)(() => recentItems(items, 5), [items]);
	const filtering = query.trim().length > 0;
	const now = Date.now();
	const toggle = (id) => setOpenGroups((prev) => {
		const next = new Set(prev);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		return next;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "flex h-full min-h-0 w-[264px] shrink-0 flex-col",
		"data-testid": "wiki-tree-sidebar",
		"aria-label": t("wiki_ui.library_label"),
		children: [
			header,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shrink-0 px-3 pb-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							className: "pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground-faint",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "search",
							value: query,
							onChange: (event) => setQuery(event.target.value),
							onKeyDown: (event) => {
								if (event.key === "Escape") setQuery("");
							},
							placeholder: t("wiki_ui.filter_placeholder"),
							"aria-label": t("wiki_ui.filter_placeholder"),
							"data-testid": "wiki-library-filter",
							className: cn("h-8 w-full rounded-lg border border-transparent bg-transparent pl-8 pr-7 text-sm text-foreground hover:bg-secondary/60", "placeholder:text-foreground-faint [&::-webkit-search-cancel-button]:hidden", "transition-colors focus-visible:border-border focus-visible:bg-input focus-visible:outline-none")
						}),
						filtering && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setQuery(""),
							"aria-label": t("wiki_ui.filter_clear"),
							className: "absolute right-1.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-sm text-foreground-faint hover:bg-secondary hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								className: "h-3 w-3",
								"aria-hidden": true
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "min-h-0 flex-1 overflow-y-auto px-2 pb-3",
				"data-testid": "wiki-library-list",
				children: [
					isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LibrarySkeleton, {}),
					isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "px-2 py-2 text-sm text-destructive",
						children: t("tree_sidebar.load_error")
					}),
					!isLoading && !isError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						!filtering && recent.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							label: t("wiki_ui.recent"),
							testId: "wiki-library-recent",
							children: recent.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								item,
								age: compactAge(item.mtime, language, now),
								active: item.slug === selectedSlug,
								onSelect,
								testId: "wiki-library-recent-item"
							}, `recent:${item.folder}/${item.slug}`))
						}),
						groups.map((group) => {
							const open = filtering || openGroups.has(group.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 first:mt-0",
								"data-folder": group.id,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => toggle(group.id),
									disabled: filtering,
									"aria-expanded": open,
									"data-open": open ? "true" : "false",
									className: cn("group flex h-7 w-full items-center gap-1.5 rounded-md px-2 text-sm font-medium text-foreground-faint transition-colors", !filtering && "hover:text-foreground"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
											className: cn("h-3 w-3 shrink-0 transition-transform", open && "rotate-90"),
											"aria-hidden": true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex-1 truncate text-left",
											children: t(GROUP_LABEL_KEY[group.id])
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tabular-nums",
											children: group.items.length
										})
									]
								}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-0.5 space-y-px",
									"data-testid": `wiki-folder-${group.id}`,
									children: group.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										item,
										age: compactAge(item.mtime, language, now),
										active: item.slug === selectedSlug,
										onSelect
									}) }, `${item.folder}/${item.slug}`))
								})]
							}, group.id);
						}),
						filtering && groups.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-2 py-6 text-center text-sm text-muted-foreground",
							"data-testid": "wiki-library-no-match",
							children: t("wiki_ui.filter_no_match")
						})
					] })
				]
			})
		]
	});
}
function Section({ label, testId, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1",
		"data-testid": testId,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-7 items-center px-2 text-sm font-medium text-foreground-faint",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-px",
			children
		})]
	});
}
function Row({ item, age, active, onSelect, testId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onSelect(item.slug),
		"data-slug": item.slug,
		"data-active": active ? "true" : "false",
		"data-testid": testId,
		title: item.title,
		className: cn("flex h-8 w-full items-center gap-2.5 rounded-lg px-2 text-left text-base transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", active ? "bg-secondary text-foreground-strong" : "text-foreground-secondary hover:bg-secondary hover:text-foreground"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindGlyph, {
				group: item.group,
				className: cn("h-2.5 w-2.5", active ? "text-accent" : "text-foreground-faint")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 flex-1 truncate",
				children: item.title
			}),
			age && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 text-xs tabular-nums text-foreground-faint",
				children: age
			})
		]
	});
}
function LibrarySkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2 px-2 py-2",
		"data-testid": "wiki-tree-skeleton",
		"aria-busy": "true",
		children: [
			72,
			56,
			64,
			48,
			60,
			52
		].map((width, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-4 animate-pulse rounded-sm bg-foreground/10",
			style: { width: `${width}%` }
		}, i))
	});
}
var ObsidianButton = (0, import_react.lazy)(() => __vitePreload(() => import("./ObsidianButton-Dv1jnhGj.js"), __vite__mapDeps([0,1,2,3])).then((mod) => ({ default: mod.ObsidianButton })));
var FRIENDLY_LABELS = {
	type: "type",
	entity_kind: "kind",
	status: "status",
	created: "created",
	updated: "updated",
	started: "started",
	last_activity: "last activity"
};
var MAX_PILLS = 6;
function PageHeader({ slug, kind, title, frontmatter, vaultRoot, vaultRelPath, mtime, words }) {
	const t = useT();
	const language = useUiLanguage();
	const pills = buildPills(frontmatter);
	const breadcrumb = breadcrumbFromPath(vaultRelPath);
	const group = groupOfKind(kind);
	const changed = mtime ? relativeAge(mtime, language) : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex flex-col",
		"data-testid": "wiki-page-header",
		"data-slug": slug,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex min-w-0 items-center gap-1.5 text-sm text-foreground-faint",
					"data-testid": "wiki-page-crumb",
					"aria-label": t("wiki_ui.crumb_label"),
					children: breadcrumb.map((part, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex min-w-0 items-center gap-1.5",
						children: [idx > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							children: "/"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("truncate", idx === breadcrumb.length - 1 && "text-muted-foreground"),
							children: part
						})]
					}, idx))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObsidianButtonPlaceholder, {}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObsidianButton, {
						vaultRoot,
						vaultRelPath,
						size: "sm"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-5 text-display font-semibold text-foreground-strong",
				"data-testid": "wiki-page-title",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 text-foreground-secondary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindGlyph, {
							group,
							className: "h-2.5 w-2.5"
						}), t(GROUP_LABEL_KEY[group])]
					}),
					changed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "text-foreground-faint",
						children: "·"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("wiki_ui.page_changed").replace("{0}", changed) })] }),
					words !== void 0 && words > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "text-foreground-faint",
						children: "·"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("wiki_ui.page_words").replace("{0}", new Intl.NumberFormat(language).format(words)) })] })
				]
			}),
			pills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-1.5 text-xs",
				"data-testid": "wiki-page-pills",
				children: pills.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex h-6 items-center gap-1 rounded-sm border border-border px-2 text-muted-foreground",
					"data-pill-key": p.key,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: p.value
					})]
				}, p.key))
			})
		]
	});
}
function buildPills(fm) {
	const out = [];
	for (const [key, raw] of Object.entries(fm)) {
		if (key === "slug" || key === "aliases") continue;
		if (!(key in FRIENDLY_LABELS)) continue;
		const value = Array.isArray(raw) ? raw.join(", ") : raw;
		if (!value || value.trim() === "") continue;
		out.push({
			key,
			label: FRIENDLY_LABELS[key],
			value
		});
		if (out.length >= MAX_PILLS) break;
	}
	return out;
}
function breadcrumbFromPath(relPath) {
	const parts = relPath.split(/[\\/]/).filter(Boolean);
	return parts.length > 0 ? parts : [relPath];
}
function ObsidianButtonPlaceholder() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "h-8 w-36 shrink-0",
		"data-testid": "obsidian-button-placeholder",
		"aria-hidden": true
	});
}
var WIKILINK_PREFIX = "#wiki:";
var WIKILINK_RE = /\[\[([^\]|\n]+)(?:\|([^\]\n]+))?\]\]/g;
var AS_OF_RE = /\s*\(as of (\d{4}-\d{2}-\d{2})\)/g;
function PageRenderer({ slug, onWikilinkClick }) {
	const t = useT();
	const language = useUiLanguage();
	const qc = useQueryClient();
	const pageQuery = useQuery({
		queryKey: [
			"wiki",
			"page",
			slug
		],
		queryFn: () => fetchWikiPage(slug),
		staleTime: 5e3
	});
	const treeQuery = useQuery({
		queryKey: ["wiki", "tree"],
		queryFn: fetchWikiTree,
		staleTime: 5e3
	});
	const knownSlugs = (0, import_react.useMemo)(() => buildKnownSlugSet(treeQuery.data), [treeQuery.data]);
	const page = pageQuery.data;
	const title = cleanTitle(page?.title, slug);
	const preprocessedBody = (0, import_react.useMemo)(() => {
		return preprocessWikilinks(stripLeadingTitle(pageQuery.data?.body_md ?? "", title));
	}, [pageQuery.data?.body_md, title]);
	const dateFormat = (0, import_react.useMemo)(() => {
		try {
			return new Intl.DateTimeFormat(language, { dateStyle: "medium" });
		} catch {
			return null;
		}
	}, [language]);
	const components = (0, import_react.useMemo)(() => {
		const decorate = (children) => decorateAsOf(children, dateFormat, t("wiki_ui.as_of"));
		return {
			a: ({ href, children, node: _node, ...rest }) => {
				if (typeof href === "string" && href.startsWith("#wiki:")) {
					const target = href.slice(6);
					const isBroken = knownSlugs.size > 0 && !knownSlugs.has(target);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						...rest,
						href,
						"data-target-slug": target,
						title: isBroken ? t("wiki_ui.link_missing") : void 0,
						className: cn("wikilink rounded-sm underline underline-offset-4 transition-colors", isBroken ? "broken text-muted-foreground decoration-destructive/60 decoration-dashed hover:text-foreground" : "text-accent decoration-accent/30 hover:decoration-accent"),
						onClick: (e) => {
							e.preventDefault();
							if (knownSlugs.size > 0 && !knownSlugs.has(target)) qc.invalidateQueries({ queryKey: ["wiki", "tree"] });
							onWikilinkClick(target);
						},
						children
					});
				}
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					...rest,
					href,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent",
					children
				});
			},
			h1: ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 mt-10 text-lg font-semibold text-foreground-strong first:mt-0",
				children
			}),
			h2: ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mb-3 mt-10 flex items-center gap-3 text-lg font-semibold text-foreground-strong first:mt-0",
				children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "h-px flex-1 bg-border"
				})]
			}),
			h3: ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-2 mt-7 text-base font-semibold text-foreground-strong",
				children
			}),
			h4: ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "mb-2 mt-6 text-base font-medium text-foreground",
				children
			}),
			p: ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "my-4 text-foreground",
				children: decorate(children)
			}),
			ul: ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "my-4 space-y-2 pl-5 text-foreground marker:text-foreground-faint [list-style-type:'–__']",
				children
			}),
			ol: ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "my-4 list-decimal space-y-2 pl-6 text-foreground marker:text-sm marker:tabular-nums marker:text-foreground-faint",
				children
			}),
			li: ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "pl-1",
				children: decorate(children)
			}),
			blockquote: ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
				className: "my-5 border-l-2 border-border-strong pl-4 text-foreground-secondary",
				children
			}),
			hr: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-8 border-border" }),
			strong: ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
				className: "font-semibold text-foreground-strong",
				children
			}),
			table: ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "my-5 overflow-x-auto rounded-md border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
					className: "w-full border-collapse text-sm",
					children
				})
			}),
			th: ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
				className: "border-b border-border bg-secondary px-3 py-2 text-left font-medium text-foreground",
				children
			}),
			td: ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "border-b border-border px-3 py-2 align-top text-foreground-secondary",
				children
			}),
			pre: ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "my-5 overflow-x-auto rounded-md border border-border bg-secondary p-4 font-mono text-sm leading-6 text-foreground [&>code]:bg-transparent [&>code]:p-0",
				children
			}),
			code: ({ children, node: _node, ...rest }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
				...rest,
				className: "rounded-sm bg-secondary px-1 py-0.5 font-mono text-sm text-foreground",
				children
			})
		};
	}, [
		dateFormat,
		knownSlugs,
		onWikilinkClick,
		qc,
		t
	]);
	if (pageQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, {});
	if (pageQuery.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto w-full max-w-reading px-10 py-10",
		"data-testid": "wiki-page-error",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			role: "alert",
			className: "text-base text-destructive",
			children: t("page_renderer.load_error")
		})
	});
	if (!page || !page.ok) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto w-full max-w-reading px-10 py-10",
		"data-testid": "wiki-page-error",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			role: "alert",
			className: "text-base text-destructive",
			children: page?.error ?? t("page_renderer.not_found")
		})
	});
	const kind = page.kind ?? "entity";
	const vaultRelPath = page.path ?? `${kind}/${slug}.md`;
	const frontmatter = page.frontmatter ?? {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "profile-rise mx-auto flex w-full max-w-reading flex-col px-10 pb-24 pt-10",
		"data-testid": "wiki-page-renderer",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			slug,
			kind,
			title,
			frontmatter,
			vaultRoot: treeQuery.data?.vault_root ?? "",
			vaultRelPath,
			mtime: page.stats?.mtime,
			words: page.stats?.words
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 border-t border-border pt-8 text-reading text-foreground",
			"data-testid": "wiki-page-body",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, {
				remarkPlugins: [remarkGfm],
				components,
				children: preprocessedBody
			})
		})]
	});
}
function preprocessWikilinks(body) {
	return body.replace(WIKILINK_RE, (_match, target, label) => {
		const slug = lastSegment(target.trim());
		return `[${(label ? label.trim() : slug).replace(/\\/g, "\\\\").replace(/]/g, "\\]")}](${WIKILINK_PREFIX}${slug})`;
	});
}
function stripLeadingTitle(body, title) {
	const match = /^\s*#\s+(.+?)\s*#*\s*(?:\r?\n|$)/.exec(body);
	if (!match) return body;
	return cleanTitle(match[1]).toLowerCase() === cleanTitle(title).toLowerCase() ? body.slice(match[0].length) : body;
}
function decorateAsOf(children, dateFormat, label) {
	return import_react.Children.map(children, (child, index) => {
		if (typeof child === "string") {
			if (!AS_OF_RE.test(child)) return child;
			AS_OF_RE.lastIndex = 0;
			const parts = [];
			let last = 0;
			for (const match of child.matchAll(AS_OF_RE)) {
				const at = match.index ?? 0;
				if (at > last) parts.push(child.slice(last, at));
				const iso = match[1];
				const date = /* @__PURE__ */ new Date(`${iso}T12:00:00`);
				const text = dateFormat && !Number.isNaN(date.getTime()) ? dateFormat.format(date) : iso;
				parts.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
					dateTime: iso,
					title: `${label} ${iso}`,
					className: "ml-2 inline-flex whitespace-nowrap align-baseline text-sm text-foreground-faint",
					children: text
				}, `${index}-${at}`));
				last = at + match[0].length;
			}
			if (last < child.length) parts.push(child.slice(last));
			return parts;
		}
		if ((0, import_react.isValidElement)(child) && child.type === "p") return (0, import_react.cloneElement)(child, void 0, decorateAsOf(child.props.children, dateFormat, label));
		return child;
	});
}
function lastSegment(target) {
	const idx = Math.max(target.lastIndexOf("/"), target.lastIndexOf("\\"));
	return idx >= 0 ? target.slice(idx + 1) : target;
}
function buildKnownSlugSet(tree) {
	const out = /* @__PURE__ */ new Set();
	if (!tree?.folders) return out;
	for (const folder of tree.folders) for (const file of folder.files) out.add(file.slug);
	return out;
}
function PageSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-reading space-y-stack px-10 pt-10",
		"data-testid": "wiki-page-skeleton",
		role: "status",
		"aria-busy": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-40 animate-pulse rounded-sm bg-foreground/10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-5 h-8 w-72 animate-pulse rounded-md bg-foreground/10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-56 animate-pulse rounded-sm bg-foreground/10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-stack border-t border-border pt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-full animate-pulse rounded-sm bg-foreground/10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-5/6 animate-pulse rounded-sm bg-foreground/10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-4/6 animate-pulse rounded-sm bg-foreground/10" })
				]
			})
		]
	});
}
const HEALTH_DOT_STYLE = {
	green: "bg-success",
	amber: "bg-warning",
	red: "bg-destructive",
	unknown: "bg-faint-foreground"
};
const HEALTH_LABEL_KEY = {
	green: "wiki_ui.health_green",
	amber: "wiki_ui.health_amber",
	red: "wiki_ui.health_red",
	unknown: "wiki_ui.health_unknown"
};
function classifyWikiHealth(health) {
	if (health.bootstrap_ok === false || health.last_write?.ok === false || health.last_chain_failure) return "red";
	if (health.journal_backlog > 0 || health.vault_legacy_conflict || health.index_state === "stale") return "amber";
	if (health.bootstrap_ok) return "green";
	return "unknown";
}
function describeWikiWriteStatus(health, t) {
	if (health.bootstrap_ok === false) return health.bootstrap_error ? t("wiki_health.bootstrap_failed").replace("{0}", health.bootstrap_error) : t("wiki_health.bootstrap_failed_unknown");
	if (health.last_chain_failure) return t("wiki_health.chain_failure").replace("{0}", health.last_chain_failure.detail);
	if (health.last_write?.ok === false) return health.last_write.error ? t("wiki_health.last_write_failed").replace("{0}", health.last_write.error) : t("wiki_health.last_write_failed_unknown");
	if (health.last_write?.ok) {
		const page = health.last_write.pages.join(", ") || health.last_write.source;
		return t("wiki_health.last_write_ok").replace("{0}", page);
	}
	if (health.journal_backlog > 0) return t("wiki_health.pending_writes").replace("{0}", String(health.journal_backlog));
	return t("wiki_health.no_writes_yet");
}
function WikiInspector(props) {
	const t = useT();
	const onPage = Boolean(props.selectedSlug);
	const HeadIcon = onPage ? FileText : Activity;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		id: WIKI_INSPECTOR_ID,
		className: "flex h-full min-h-0 w-[300px] shrink-0 flex-col border-l border-border bg-card/40",
		"data-testid": onPage ? "wiki-inspector-page" : "wiki-backlinks-placeholder",
		"aria-label": t("wiki_ui.inspector_label"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-11 shrink-0 items-center gap-2 border-b border-border px-4 text-sm font-medium text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadIcon, {
				className: "h-4 w-4 text-muted-foreground",
				"aria-hidden": true
			}), t(onPage ? "wiki_ui.inspector_page" : "wiki_ui.inspector_overview")]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 overflow-y-auto",
			children: props.selectedSlug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageContext, {
				slug: props.selectedSlug,
				itemsBySlug: props.itemsBySlug,
				onSelect: props.onSelect
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, { ...props })
		})]
	});
}
function Overview({ health, healthLoading, isReindexing, reindexError, onReindex, onSelect, itemsBySlug }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthBlock, {
				health,
				isLoading: healthLoading,
				isReindexing,
				reindexError,
				onReindex
			}),
			health?.capture_funnel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaptureFlow, {
				funnel: health.capture_funnel,
				error: health.capture_error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubsBlock, {
				onSelect,
				itemsBySlug
			})
		]
	});
}
function Block({ title, aside, children, testId, ariaLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border-b border-border px-5 py-5 last:border-b-0",
		"data-testid": testId,
		"aria-label": ariaLabel,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-3 flex items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-semibold text-foreground-strong",
				children: title
			}), aside && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shrink-0 whitespace-nowrap text-sm text-foreground-faint",
				children: aside
			})]
		}), children]
	});
}
function HealthBlock({ health, isLoading, isReindexing, reindexError, onReindex }) {
	const t = useT();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
		title: t("wiki_ui.health_title"),
		testId: "wiki-health-strip",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "h-2 w-2 shrink-0 animate-pulse rounded-full bg-faint-foreground",
				"data-testid": "wiki-health-dot",
				"data-visual": "loading",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-testid": "wiki-health-checking",
				children: t("wiki_health.checking")
			})]
		})
	});
	if (!health) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
		title: t("wiki_ui.health_title"),
		testId: "wiki-health-strip",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "h-2 w-2 shrink-0 rounded-full bg-faint-foreground",
				"data-testid": "wiki-health-dot",
				"data-visual": "unknown",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-testid": "wiki-health-unavailable",
				children: t("wiki_health.unavailable")
			})]
		})
	});
	const visual = classifyWikiHealth(health);
	const vaultText = health.vault_root ? t("wiki_health.vault_prefix").replace("{0}", health.vault_root) : t("wiki_health.vault_unknown");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Block, {
		title: t("wiki_ui.health_title"),
		testId: "wiki-health-strip",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "relative flex h-2 w-2 shrink-0",
					"aria-hidden": true,
					children: [visual === "green" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 animate-ping rounded-full bg-success opacity-40 motion-reduce:hidden" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("relative h-2 w-2 rounded-full", HEALTH_DOT_STYLE[visual]),
						"data-testid": "wiki-health-dot",
						"data-visual": visual
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-base font-medium text-foreground",
					children: t(HEALTH_LABEL_KEY[visual])
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-testid": "wiki-health-write",
				className: cn("mt-2 break-words text-sm", visual === "red" ? "text-destructive" : "text-muted-foreground"),
				children: describeWikiWriteStatus(health, t)
			}),
			(health.journal_backlog > 0 || health.index_state === "stale" || health.vault_legacy_conflict) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-center gap-2 text-sm",
				children: [
					health.journal_backlog > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						testId: "wiki-health-backlog",
						children: t("wiki_health.backlog_count").replace("{0}", String(health.journal_backlog))
					}),
					health.index_state === "stale" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						testId: "wiki-health-index-stale",
						children: t("wiki_health.index_stale").replace("{0}", String(health.indexed_pages)).replace("{1}", String(health.vault_pages))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onReindex,
						disabled: isReindexing,
						"data-testid": "wiki-health-reindex",
						className: "inline-flex h-7 items-center gap-1.5 rounded-md border border-border-strong px-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							className: cn("h-3 w-3", isReindexing && "animate-spin"),
							"aria-hidden": true
						}), t(isReindexing ? "wiki_health.reindexing" : "wiki_health.reindex")]
					})] }),
					health.vault_legacy_conflict && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						testId: "wiki-health-legacy-conflict",
						children: t("wiki_health.legacy_conflict")
					})
				]
			}),
			reindexError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				"data-testid": "wiki-health-reindex-error",
				className: "mt-2 text-sm text-destructive",
				children: t("wiki_health.reindex_failed_detail").replace("{0}", reindexError)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-testid": "wiki-health-vault",
				className: "mt-3 truncate font-mono text-xs text-foreground-faint",
				title: vaultText,
				children: vaultText
			})
		]
	});
}
function Badge({ children, testId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-testid": testId,
		className: "inline-flex h-6 items-center rounded-sm bg-warning/10 px-2 text-xs font-medium text-warning",
		children
	});
}
function CaptureFlow({ funnel, error }) {
	const t = useT();
	const windowHours = Math.max(1, Math.round(funnel.window_hours));
	const stages = [
		[
			"reviewed",
			t("wiki_health.capture_reviewed"),
			funnel.total
		],
		[
			"candidate-reviews",
			t("wiki_health.capture_candidate_reviews"),
			funnel.candidates
		],
		[
			"candidate-facts",
			t("wiki_health.capture_candidate_facts"),
			funnel.facts
		],
		[
			"writes",
			t("wiki_health.capture_writes"),
			funnel.writes
		]
	];
	const ledger = [
		[
			"noop",
			t("wiki_health.capture_noop"),
			funnel.stage2_noop
		],
		[
			"rejected",
			t("wiki_health.capture_rejected"),
			funnel.stage2_rejected
		],
		[
			"skipped",
			t("wiki_health.capture_skipped"),
			funnel.stage2_skipped
		],
		[
			"pending",
			t("wiki_health.capture_pending"),
			funnel.stage2_pending
		],
		[
			"filtered",
			t("wiki_health.capture_filtered"),
			funnel.filtered
		],
		[
			"empty",
			t("wiki_health.capture_empty"),
			funnel.empty
		],
		[
			"failed",
			t("wiki_health.capture_failed"),
			funnel.failed
		],
		[
			"in-progress",
			t("wiki_health.capture_in_progress"),
			funnel.started
		],
		[
			"session-sweeps",
			t("wiki_health.capture_session_sweeps"),
			funnel.sessions_swept
		]
	];
	const scale = Math.max(1, ...stages.map(([, , value]) => value));
	const errorText = error === "capture_store_unavailable" ? t("wiki_health.capture_store_unavailable") : error ? t("wiki_health.capture_store_error").replace("{0}", error) : null;
	const quiet = !error && funnel.total === 0 && funnel.started === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Block, {
		title: t("wiki_ui.capture_title"),
		aside: t("wiki_ui.capture_window").replace("{0}", String(windowHours)),
		testId: "wiki-capture-funnel",
		ariaLabel: t("wiki_health.capture_aria").replace("{0}", String(windowHours)),
		children: [
			errorText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-destructive",
				"data-testid": "wiki-capture-error",
				role: "alert",
				children: errorText
			}),
			!error && funnel.failed > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-destructive",
				"data-testid": "wiki-capture-failed-detail",
				role: "status",
				children: t("wiki_health.capture_failed_detail").replace("{0}", String(funnel.failed))
			}),
			quiet && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-muted-foreground",
				"data-testid": "wiki-capture-quiet",
				children: t("wiki_ui.capture_quiet")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-2.5",
				children: stages.map(([key, label, value], index) => {
					const last = index === stages.length - 1;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						"data-testid": `wiki-capture-${key}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-foreground",
								children: value
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 h-1 overflow-hidden rounded-full bg-foreground/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("h-full rounded-full transition-[width] duration-500", last ? "bg-accent" : "bg-foreground/45"),
								style: { width: `${value > 0 ? Math.max(2, value / scale * 100) : 0}%` }
							})
						})]
					}, key);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-4 space-y-1 border-t border-border pt-3 text-sm",
				children: ledger.map(([key, label, value]) => {
					const alarm = key === "failed" && value > 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex items-baseline gap-2", alarm && "text-destructive"),
						"data-testid": `wiki-capture-${key}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: alarm ? void 0 : "text-muted-foreground",
								children: label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "mb-1 min-w-4 flex-1 border-b border-dotted border-border-strong"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: cn("tabular-nums", alarm ? "text-destructive" : value > 0 ? "text-foreground" : "text-foreground-faint"),
								children: value
							})
						]
					}, key);
				})
			})
		]
	});
}
function HubsBlock({ onSelect, itemsBySlug }) {
	const t = useT();
	const { data, isLoading } = useQuery({
		queryKey: ["wiki", "graph"],
		queryFn: fetchWikiGraph,
		staleTime: 3e4
	});
	const hubs = (0, import_react.useMemo)(() => {
		if (!data?.ok || !data.nodes) return [];
		const degree = degreeOf(uniqueEdges(data.edges ?? []));
		return data.nodes.map((node) => ({
			slug: node.id,
			title: cleanTitle(node.title, node.id),
			group: groupOfKind(node.kind),
			degree: degree.get(node.id) ?? 0
		})).filter((node) => node.degree > 0).sort((a, b) => b.degree - a.degree).slice(0, 6);
	}, [data]);
	if (!isLoading && hubs.length === 0) return null;
	const top = hubs[0]?.degree ?? 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
		title: t("wiki_ui.hubs_title"),
		testId: "wiki-inspector-hubs",
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			"aria-busy": "true",
			children: [
				80,
				64,
				52
			].map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-4 animate-pulse rounded-sm bg-foreground/10",
				style: { width: `${w}%` }
			}, w))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "-mx-2 space-y-px",
			children: hubs.map((hub) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onSelect(hub.slug),
				className: "group flex w-full flex-col gap-1 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-secondary",
				"data-testid": "wiki-hub-item",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex w-full items-center gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindGlyph, {
							group: itemsBySlug.get(hub.slug)?.group ?? hub.group,
							className: "h-2.5 w-2.5 text-foreground-faint"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 flex-1 truncate text-foreground",
							children: hub.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-foreground-faint",
							children: hub.degree
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-[18px] block h-0.5 overflow-hidden rounded-full bg-foreground/[0.06]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block h-full rounded-full bg-foreground/30 transition-colors group-hover:bg-accent",
						style: { width: `${hub.degree / top * 100}%` }
					})
				})]
			}) }, hub.slug))
		})
	});
}
function PageContext({ slug, itemsBySlug, onSelect }) {
	const t = useT();
	const language = useUiLanguage();
	const backlinksQuery = useQuery({
		queryKey: [
			"wiki",
			"backlinks",
			slug
		],
		queryFn: () => fetchWikiBacklinks(slug),
		staleTime: 5e3
	});
	const pageQuery = useQuery({
		queryKey: [
			"wiki",
			"page",
			slug
		],
		queryFn: () => fetchWikiPage(slug),
		staleTime: 5e3
	});
	const backlinks = (backlinksQuery.data?.backlinks ?? []).filter((bl) => bl.slug !== slug);
	const outgoing = (0, import_react.useMemo)(() => {
		const seen = /* @__PURE__ */ new Set();
		const out = [];
		for (const link of pageQuery.data?.wikilinks ?? []) {
			if (!link || link === slug || seen.has(link)) continue;
			seen.add(link);
			out.push(link);
		}
		return out;
	}, [pageQuery.data?.wikilinks, slug]);
	const page = pageQuery.data?.ok ? pageQuery.data : null;
	const item = itemsBySlug.get(slug);
	const facts = [];
	if (page) {
		facts.push([t("wiki_ui.fact_kind"), t(GROUP_LABEL_KEY[item?.group ?? groupOfKind(page.kind)])]);
		if (item?.folder) facts.push([t("wiki_ui.fact_folder"), item.folder]);
		if (page.stats?.words !== void 0) facts.push([t("wiki_ui.fact_words"), new Intl.NumberFormat(language).format(page.stats.words)]);
		if (page.stats?.mtime) facts.push([t("wiki_ui.fact_changed"), relativeAge(page.stats.mtime, language)]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Block, {
				title: t("wiki_ui.linked_from"),
				aside: backlinksQuery.isLoading ? void 0 : String(backlinks.length),
				testId: "wiki-backlinks-panel",
				children: [
					backlinksQuery.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineSkeleton, {}),
					backlinksQuery.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "text-sm text-destructive",
						children: t("backlinks_panel.load_error")
					}),
					!backlinksQuery.isLoading && !backlinksQuery.isError && backlinks.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						"data-testid": "wiki-backlinks-empty",
						children: t("wiki_ui.linked_from_empty")
					}),
					backlinks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "-mx-2 space-y-px",
						children: backlinks.map((bl) => {
							const snippet = bl.snippet ? readableSnippet(bl.snippet) : "";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => onSelect(bl.slug),
								className: "flex w-full items-start gap-2.5 rounded-md px-2 py-2 text-left transition-colors hover:bg-secondary",
								"data-testid": "wiki-backlink-item",
								"data-target-slug": bl.slug,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindGlyph, {
									group: itemsBySlug.get(bl.slug)?.group ?? "other",
									className: "mt-1 h-2.5 w-2.5 text-foreground-faint"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-sm text-foreground",
										children: cleanTitle(bl.title, bl.slug)
									}), snippet && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-0.5 line-clamp-2 block text-xs leading-4 text-muted-foreground",
										children: snippet
									})]
								})]
							}) }, bl.slug);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Block, {
				title: t("wiki_ui.links_to"),
				aside: pageQuery.isLoading ? void 0 : String(outgoing.length),
				testId: "wiki-outgoing-panel",
				children: [
					pageQuery.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineSkeleton, {}),
					!pageQuery.isLoading && outgoing.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: t("wiki_ui.links_to_empty")
					}),
					outgoing.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "-mx-2 space-y-px",
						children: outgoing.map((target) => {
							const known = itemsBySlug.get(target);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: known ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => onSelect(target),
								className: "group flex h-8 w-full items-center gap-2.5 rounded-md px-2 text-left text-sm text-foreground transition-colors hover:bg-secondary",
								"data-testid": "wiki-outgoing-item",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindGlyph, {
										group: known.group,
										className: "h-2.5 w-2.5 text-foreground-faint"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-0 flex-1 truncate",
										children: known.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
										className: "h-3 w-3 shrink-0 text-foreground-faint opacity-0 transition-opacity group-hover:opacity-100",
										"aria-hidden": true
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex h-8 items-center gap-2.5 px-2 text-sm text-foreground-faint",
								title: t("wiki_ui.link_missing"),
								"data-testid": "wiki-outgoing-missing",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-2.5 w-2.5 shrink-0 rounded-full border border-dashed border-current",
									"aria-hidden": true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0 flex-1 truncate line-through decoration-foreground-faint/60",
									children: target
								})]
							}) }, target);
						})
					})
				]
			}),
			facts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
				title: t("wiki_ui.facts_title"),
				testId: "wiki-page-facts",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "space-y-1.5 text-sm",
					children: facts.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "mb-1 min-w-4 flex-1 border-b border-dotted border-border-strong"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "max-w-[60%] truncate text-foreground",
								title: value,
								children: value
							})
						]
					}, label))
				})
			})
		]
	});
}
function LineSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		"aria-busy": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-3/4 animate-pulse rounded-sm bg-foreground/10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-1/2 animate-pulse rounded-sm bg-foreground/10" })]
	});
}
var SEARCH_DEBOUNCE_MS = 200;
var SEARCH_LIMIT = 8;
var RECENT_LIMIT = 5;
function groupOfPath(path) {
	const top = path.split(/[\\/]/)[0] ?? "";
	if (top === "entities") return "entity";
	if (top === "projects") return "project";
	if (top === "concepts") return "concept";
	if (top === "sessions") return "session";
	if (top === "society") return "agent";
	return path.includes("/") ? "other" : "system";
}
async function fetchSearch(query) {
	const url = `/api/wiki/search?q=${encodeURIComponent(query)}&k=${SEARCH_LIMIT}`;
	const res = await fetch(url);
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json();
}
function selectRecentPages(tree) {
	if (!tree?.ok) return [];
	const flat = [];
	for (const folder of tree.folders) for (const file of folder.files) flat.push({
		slug: file.slug,
		title: file.title,
		path: `${folder.name}/${file.slug}.md`,
		kind: folder.kind,
		mtime: file.mtime
	});
	flat.sort((a, b) => b.mtime - a.mtime);
	return flat.slice(0, RECENT_LIMIT);
}
function buildHighlightPattern(query) {
	const trimmed = query.trim();
	if (!trimmed) return null;
	const terms = trimmed.split(/\s+/).filter(Boolean).map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
	if (terms.length === 0) return null;
	return new RegExp(`(${terms.join("|")})`, "ig");
}
function highlightSnippet(snippet, pattern) {
	if (!pattern || !snippet) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: snippet });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: snippet.split(pattern).map((part, idx) => idx % 2 === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mark", {
		className: "rounded-sm bg-accent-soft text-foreground",
		children: part
	}, idx) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part }, idx)) });
}
const WikiSearch = (0, import_react.forwardRef)(function WikiSearch$1({ onResultClick }, ref) {
	const t = useT();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [rawQuery, setRawQuery] = (0, import_react.useState)("");
	const [debouncedQuery, setDebouncedQuery] = (0, import_react.useState)("");
	(0, import_react.useImperativeHandle)(ref, () => ({ open: () => setOpen(true) }), []);
	(0, import_react.useEffect)(() => {
		function onKeyDown(event) {
			if (event.key.toLowerCase() === "k" && (event.ctrlKey || event.metaKey)) {
				event.preventDefault();
				setOpen((prev) => !prev);
			}
		}
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, []);
	(0, import_react.useEffect)(() => {
		const handle = window.setTimeout(() => setDebouncedQuery(rawQuery.trim()), SEARCH_DEBOUNCE_MS);
		return () => window.clearTimeout(handle);
	}, [rawQuery]);
	(0, import_react.useEffect)(() => {
		if (!open) {
			setRawQuery("");
			setDebouncedQuery("");
		}
	}, [open]);
	const enabled = open && debouncedQuery.length > 0;
	const { data, isFetching, isError, refetch } = useQuery({
		queryKey: [
			"wiki",
			"search",
			debouncedQuery
		],
		queryFn: () => fetchSearch(debouncedQuery),
		enabled,
		staleTime: 1e4,
		placeholderData: keepPreviousData
	});
	const highlightPattern = (0, import_react.useMemo)(() => buildHighlightPattern(debouncedQuery), [debouncedQuery]);
	const { data: tree } = useQuery({
		queryKey: ["wiki", "tree"],
		queryFn: async () => {
			const res = await fetch("/api/wiki/tree");
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			return res.json();
		},
		enabled: false
	});
	const recent = (0, import_react.useMemo)(() => selectRecentPages(tree), [tree]);
	const [selectedValue, setSelectedValue] = (0, import_react.useState)("");
	const firstValue = debouncedQuery.length === 0 ? recent[0] ? `recent:${recent[0].slug}` : "" : data?.ok && data.hits[0] ? `hit:${data.hits[0].slug}` : "";
	(0, import_react.useEffect)(() => {
		setSelectedValue(firstValue);
	}, [firstValue]);
	const handlePick = (0, import_react.useCallback)((slug) => {
		onResultClick(slug);
		setOpen(false);
	}, [onResultClick]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Dialog, {
		open,
		onOpenChange: setOpen,
		value: selectedValue,
		onValueChange: setSelectedValue,
		label: t("wiki_search.dialog_label"),
		shouldFilter: false,
		"data-testid": "wiki-search-dialog",
		contentClassName: "fixed left-1/2 top-[18vh] z-50 w-[min(640px,90vw)] -translate-x-1/2 overflow-hidden rounded-lg bg-popover shadow-float",
		overlayClassName: "fixed inset-0 z-40 bg-scrim/40 backdrop-blur-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "sr-only",
				children: t("wiki_search.dialog_label")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "sr-only",
				id: "wiki-search-description",
				children: t("wiki_search.dialog_description")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-12 items-center gap-3 border-b border-border px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						className: "h-4 w-4 shrink-0 text-foreground-faint",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
						value: rawQuery,
						onValueChange: setRawQuery,
						placeholder: t("wiki_search.input_placeholder"),
						"data-testid": "wiki-search-input",
						className: "flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-foreground-faint",
						autoFocus: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
						className: "rounded-sm border border-border px-1.5 py-0.5 font-mono text-xs text-foreground-faint",
						children: "Esc"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.List, {
				"data-testid": "wiki-search-list",
				className: "max-h-[60vh] overflow-y-auto p-2 text-base [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-foreground-faint",
				children: debouncedQuery.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
					heading: t("wiki_search.recent_heading"),
					"data-testid": "wiki-search-recent",
					children: recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-2 py-3 text-muted-foreground",
						"data-testid": "wiki-search-recent-empty",
						children: t("wiki_search.no_pages")
					}) : recent.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
						value: `recent:${entry.slug}`,
						onSelect: () => handlePick(entry.slug),
						"data-testid": "wiki-search-recent-item",
						"data-slug": entry.slug,
						className: "flex h-9 cursor-pointer items-center gap-2.5 rounded-md px-2 text-foreground aria-selected:bg-secondary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindGlyph, {
								group: groupOfKind(entry.kind),
								className: "h-2.5 w-2.5 text-foreground-faint"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: cleanTitle(entry.title, entry.slug)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto truncate text-sm text-foreground-faint",
								children: entry.path
							})
						]
					}, entry.slug))
				}) : isFetching && !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-2 py-3 text-muted-foreground",
					"data-testid": "wiki-search-loading",
					children: t("wiki_search.searching")
				}) : isError || !data?.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-start gap-2 px-2 py-3 text-muted-foreground",
					"data-testid": "wiki-search-error",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("wiki_search.unavailable") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => refetch(),
						className: "text-xs underline hover:text-foreground",
						children: t("common.retry")
					})]
				}) : data.hits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Empty, {
					"data-testid": "wiki-search-empty",
					children: [
						t("wiki_search.no_hits_prefix"),
						"\"",
						debouncedQuery,
						"\"",
						t("wiki_search.no_hits_suffix")
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
					heading: t("wiki_search.hits_heading"),
					"data-testid": "wiki-search-hits",
					children: data.hits.map((hit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
						value: `hit:${hit.slug}`,
						onSelect: () => handlePick(hit.slug),
						"data-testid": "wiki-search-hit",
						"data-slug": hit.slug,
						className: "flex cursor-pointer flex-col gap-1 rounded-md px-2 py-2 aria-selected:bg-secondary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindGlyph, {
									group: groupOfPath(hit.path),
									className: "h-2.5 w-2.5 text-foreground-faint"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-foreground",
									children: cleanTitle(hit.title, hit.slug)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-auto truncate text-sm text-foreground-faint",
									children: hit.path
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "line-clamp-2 pl-5 text-sm text-muted-foreground",
							children: highlightSnippet(readableSnippet(hit.snippet), highlightPattern)
						})]
					}, hit.slug))
				})
			})
		]
	});
});
var DEFAULT_POLL_MS = 3e4;
var STATUS_URL = "/api/setup/obsidian/status";
function classify(status, errored) {
	if (errored) return "unclear";
	if (status === null) return "loading";
	if (status.note && status.note.trim().length > 0) return "unclear";
	if (!status.installed) return "install";
	if (!status.vault_registered) return "register";
	if (status.recommended_action === "ok") return "ok";
	return "unclear";
}
var VISUAL_STYLE = {
	loading: "text-muted-foreground cursor-default",
	ok: "text-muted-foreground cursor-default [&>svg]:text-success",
	register: "text-warning cursor-pointer hover:bg-warning/10",
	install: "text-warning cursor-pointer hover:bg-warning/10",
	unclear: "text-muted-foreground cursor-pointer hover:bg-secondary hover:text-foreground"
};
function visualLabels(t) {
	return {
		loading: t("obsidian_status.loading"),
		ok: t("obsidian_status.connected"),
		register: t("obsidian_status.not_registered"),
		install: t("obsidian_status.not_installed"),
		unclear: t("obsidian_status.unclear")
	};
}
function VisualIcon({ visual }) {
	if (visual === "ok") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
		className: "h-3.5 w-3.5",
		"aria-hidden": true
	});
	if (visual === "install") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
		className: "h-3.5 w-3.5",
		"aria-hidden": true
	});
	if (visual === "register") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
		className: "h-3.5 w-3.5",
		"aria-hidden": true
	});
	if (visual === "unclear") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, {
		className: "h-3.5 w-3.5",
		"aria-hidden": true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-0.5",
		"aria-hidden": true,
		"data-testid": "obsidian-status-spinner",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-1 w-1 animate-pulse rounded-full bg-current" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block h-1 w-1 animate-pulse rounded-full bg-current",
				style: { animationDelay: "150ms" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block h-1 w-1 animate-pulse rounded-full bg-current",
				style: { animationDelay: "300ms" }
			})
		]
	});
}
function ObsidianStatus({ onOpenSetup, fetchImpl, pollIntervalMs = DEFAULT_POLL_MS }) {
	const t = useT();
	const [status, setStatus] = (0, import_react.useState)(null);
	const [errored, setErrored] = (0, import_react.useState)(false);
	const [resolvedOnce, setResolvedOnce] = (0, import_react.useState)(false);
	const fetchRef = (0, import_react.useRef)(fetchImpl ?? globalThis.fetch);
	(0, import_react.useEffect)(() => {
		fetchRef.current = fetchImpl ?? globalThis.fetch;
	}, [fetchImpl]);
	const doFetch = (0, import_react.useCallback)(async () => {
		try {
			const fn = fetchRef.current;
			const res = await fn(STATUS_URL, { method: "GET" });
			if (!res.ok) {
				setErrored(true);
				setStatus(null);
				return;
			}
			setStatus(await res.json());
			setErrored(false);
		} catch {
			setErrored(true);
			setStatus(null);
		} finally {
			setResolvedOnce(true);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		doFetch();
		const interval = window.setInterval(() => {
			doFetch();
		}, pollIntervalMs);
		return () => {
			window.clearInterval(interval);
		};
	}, [doFetch, pollIntervalMs]);
	const visual = resolvedOnce ? classify(status, errored) : "loading";
	const label = visualLabels(t)[visual];
	const tooltip = visual === "ok" && status ? status.version ? `${status.vault_path} · Obsidian ${status.version}` : status.vault_path : visual === "loading" ? t("obsidian_status.loading_tooltip") : status?.note ? status.note : t("obsidian_status.click_for_setup");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: (0, import_react.useCallback)(() => {
			if (visual === "loading" || visual === "ok") return;
			if (!status && !errored) return;
			onOpenSetup(status ?? {
				installed: false,
				version: null,
				config_exists: false,
				vault_registered: false,
				vault_path: "",
				recommended_action: "install_obsidian",
				note: t("obsidian_status.load_failed_note")
			});
		}, [
			visual,
			status,
			errored,
			onOpenSetup,
			t
		]),
		disabled: !(visual !== "ok" && visual !== "loading"),
		title: tooltip,
		"data-testid": "obsidian-status-pill",
		"data-visual": visual,
		"aria-label": label,
		className: cn("inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium transition-colors", "disabled:opacity-100", VISUAL_STYLE[visual]),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisualIcon, { visual }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
	});
}
var REGISTER_URL = "/api/setup/obsidian/register";
var OBSIDIAN_DOWNLOAD_URL = "https://obsidian.md/download";
var TROUBLESHOOT_SLUG = "connect-obsidian";
var RESTART_URL = "/api/settings/restart-app";
function decideInitialStep(status) {
	if (!status.installed) return 1;
	if (!status.vault_registered) return 2;
	return 3;
}
function StepHeader({ current, reached }) {
	const t = useT();
	const stepLabels = {
		1: t("obsidian_setup_dialog.step_install"),
		2: t("obsidian_setup_dialog.step_connect"),
		3: t("obsidian_setup_dialog.step_live_test")
	};
	function stateOf(step) {
		if (step === current) return "active";
		if (reached.has(step) && step < current) return "done";
		return "future";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "flex items-center justify-between gap-2 px-1 pb-4",
		"data-testid": "obsidian-setup-stepper",
		children: [
			1,
			2,
			3
		].map((step, idx) => {
			const state = stateOf(step);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-1 items-center gap-2",
				"data-testid": `obsidian-setup-step-marker-${step}`,
				"data-state": state,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold", state === "done" && "border-[#5bd4a4]/60 bg-[#5bd4a4]/15 text-[#5bd4a4]", state === "active" && "border-primary bg-primary/20 text-primary ring-2 ring-primary/30", state === "future" && "border-border bg-secondary/30 text-muted-foreground"),
						children: state === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }) : step
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("text-xs font-medium", state === "active" ? "text-foreground" : "text-muted-foreground"),
						children: stepLabels[step]
					}),
					idx < 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: cn("ml-1 h-px flex-1 bg-border", state === "done" && "bg-[#5bd4a4]/40")
					})
				]
			}, step);
		})
	});
}
function ObsidianSetupDialog({ open, onClose, initialStatus, onStatusRefresh, onComplete, fetchImpl }) {
	const t = useT();
	const [currentStep, setCurrentStep] = (0, import_react.useState)(() => decideInitialStep(initialStatus));
	const [reached] = (0, import_react.useState)(() => {
		const set = /* @__PURE__ */ new Set();
		const start = decideInitialStep(initialStatus);
		for (let s = 1; s <= start; s++) set.add(s);
		return set;
	});
	const [vaultPath, setVaultPath] = (0, import_react.useState)(initialStatus.vault_path);
	const [refreshing, setRefreshing] = (0, import_react.useState)(false);
	const [installRetryHint, setInstallRetryHint] = (0, import_react.useState)(null);
	const [registering, setRegistering] = (0, import_react.useState)(false);
	const [registerHint, setRegisterHint] = (0, import_react.useState)(null);
	const [registerError, setRegisterError] = (0, import_react.useState)(null);
	const [registerMode, setRegisterMode] = (0, import_react.useState)("separate");
	const [vaults, setVaults] = (0, import_react.useState)([]);
	const [selectedVaultPath, setSelectedVaultPath] = (0, import_react.useState)(null);
	const [activeVaultRoot, setActiveVaultRoot] = (0, import_react.useState)(null);
	const [restartRequired, setRestartRequired] = (0, import_react.useState)(false);
	const [restarting, setRestarting] = (0, import_react.useState)(false);
	const fetchRef = (0, import_react.useRef)(fetchImpl ?? window.fetch.bind(window));
	(0, import_react.useEffect)(() => {
		fetchRef.current = fetchImpl ?? window.fetch.bind(window);
	}, [fetchImpl]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		let cancelled = false;
		(async () => {
			try {
				const list = await fetchObsidianVaults(fetchRef.current);
				if (cancelled) return;
				setVaults(list);
				setSelectedVaultPath((prev) => prev ?? list[0]?.path ?? null);
			} catch {}
		})();
		return () => {
			cancelled = true;
		};
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		function onKey(event) {
			if (event.key === "Escape") {
				event.preventDefault();
				onClose();
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);
	const advance = (0, import_react.useCallback)((to) => {
		setCurrentStep(to);
	}, []);
	const handleInstallContinue = (0, import_react.useCallback)(async () => {
		setInstallRetryHint(null);
		if (!onStatusRefresh) {
			advance(2);
			return;
		}
		setRefreshing(true);
		try {
			const next = await onStatusRefresh();
			if (next && next.installed) {
				setVaultPath(next.vault_path || vaultPath);
				if (next.vault_registered) advance(3);
				else advance(2);
			} else setInstallRetryHint(t("obsidian_setup_dialog.not_detected_hint"));
		} catch {
			setInstallRetryHint(t("obsidian_setup_dialog.status_check_failed"));
		} finally {
			setRefreshing(false);
		}
	}, [
		advance,
		onStatusRefresh,
		vaultPath,
		t
	]);
	const handleRegister = (0, import_react.useCallback)(async () => {
		setRegisterHint(null);
		setRegisterError(null);
		setRegistering(true);
		try {
			const res = await fetchRef.current(REGISTER_URL, {
				method: "POST",
				headers: { "content-type": "application/json" }
			});
			if (res.status === 200) {
				let body = null;
				try {
					body = await res.json();
				} catch {
					body = null;
				}
				if (body === null || body.status === "added" || body.status === "already_registered") {
					setActiveVaultRoot(body?.active_vault_root ?? null);
					setRestartRequired(Boolean(body?.restart_required));
					advance(3);
				} else setRegisterError(`${t("obsidian_setup_dialog.register_failed")}: ${body.error ?? t("obsidian_setup_dialog.unknown_status")}`);
				return;
			}
			if (res.status === 409) {
				setRegisterHint(t("obsidian_setup_dialog.restart_obsidian_hint"));
				return;
			}
			let errMsg = `HTTP ${res.status}`;
			try {
				const payload = await res.json();
				if (typeof payload?.detail === "object" && payload.detail?.error) errMsg = payload.detail.error;
				else if (typeof payload?.detail === "string") errMsg = payload.detail;
				else if (payload?.error) errMsg = payload.error;
			} catch {}
			setRegisterError(`${t("obsidian_setup_dialog.register_failed")}: ${errMsg}`);
		} catch (exc) {
			const msg = exc instanceof Error ? exc.message : String(exc);
			setRegisterError(`${t("obsidian_setup_dialog.register_failed")}: ${msg}`);
		} finally {
			setRegistering(false);
		}
	}, [advance, t]);
	const handleRegisterExisting = (0, import_react.useCallback)(async () => {
		if (!selectedVaultPath) return;
		setRegisterHint(null);
		setRegisterError(null);
		setRegistering(true);
		try {
			const body = await registerObsidianVault("existing", selectedVaultPath, fetchRef.current);
			if (body.status === "added" || body.status === "already_registered") {
				setActiveVaultRoot(body.active_vault_root ?? null);
				setRestartRequired(Boolean(body.restart_required));
				setVaultPath(selectedVaultPath);
				advance(3);
			} else setRegisterError(`${t("obsidian_setup_dialog.register_failed")}: ${body.error ?? t("obsidian_setup_dialog.unknown_status")}`);
		} catch (exc) {
			const msg = exc instanceof Error ? exc.message : String(exc);
			setRegisterError(`${t("obsidian_setup_dialog.register_failed")}: ${msg}`);
		} finally {
			setRegistering(false);
		}
	}, [
		advance,
		selectedVaultPath,
		t
	]);
	const handleConfirmRegister = (0, import_react.useCallback)(() => {
		if (registerMode === "existing") handleRegisterExisting();
		else handleRegister();
	}, [
		registerMode,
		handleRegisterExisting,
		handleRegister
	]);
	const handleRestartNow = (0, import_react.useCallback)(async () => {
		setRestarting(true);
		try {
			await fetchRef.current(RESTART_URL, { method: "POST" });
		} catch {
			setRestarting(false);
		}
	}, []);
	const handleLaunchObsidian = (0, import_react.useCallback)(() => {
		const url = buildObsidianUrl(activeVaultRoot ?? vaultPath);
		try {
			window.location.href = url;
		} catch {}
	}, [activeVaultRoot, vaultPath]);
	const handleComplete = (0, import_react.useCallback)(() => {
		onComplete?.();
		onClose();
	}, [onComplete, onClose]);
	const handleTroubleshoot = (0, import_react.useCallback)(() => {
		const url = new URL(window.location.href);
		url.searchParams.set("doc", TROUBLESHOOT_SLUG);
		window.history.replaceState(null, "", url);
		useEventStore.getState().setActiveSection("docs");
		onClose();
	}, [onClose]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[70] flex items-center justify-center bg-background/80 backdrop-blur-sm",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "obsidian-setup-title",
		"data-testid": "obsidian-setup-dialog",
		onClick: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-xl rounded-lg bg-popover shadow-float p-6",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:bg-secondary/40 hover:text-foreground",
					"aria-label": t("obsidian_setup_dialog.close_dialog"),
					"data-testid": "obsidian-setup-close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "obsidian-setup-title",
					className: "mb-1 text-base font-semibold text-foreground",
					children: t("obsidian_setup_dialog.title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: t("obsidian_setup_dialog.subtitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHeader, {
					current: currentStep,
					reached
				}),
				currentStep === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"data-testid": "obsidian-setup-step-1",
					className: "space-y-3",
					"aria-labelledby": "obsidian-setup-step-1-title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							id: "obsidian-setup-step-1-title",
							className: "text-sm font-semibold text-foreground",
							children: t("obsidian_setup_dialog.install_heading")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								t("obsidian_setup_dialog.install_body_1"),
								" ",
								t("obsidian_setup_dialog.install_body_2"),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Obsidian" }),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: OBSIDIAN_DOWNLOAD_URL,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "inline-flex items-center gap-1.5 text-sm text-primary underline-offset-4 hover:underline",
							"data-testid": "obsidian-setup-download-link",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
								className: "h-3.5 w-3.5",
								"aria-hidden": true
							}), t("obsidian_setup_dialog.download_link")]
						}),
						installRetryHint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-md border border-[#ffb84d]/40 bg-[#ffb84d]/10 px-3 py-2 text-xs text-[#ffb84d]",
							"data-testid": "obsidian-setup-install-hint",
							role: "status",
							children: installRetryHint
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "sm",
								onClick: onClose,
								"data-testid": "obsidian-setup-cancel",
								children: t("common.cancel")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "sm",
								onClick: () => void handleInstallContinue(),
								disabled: refreshing,
								"data-testid": "obsidian-setup-installed-continue",
								children: refreshing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									className: "mr-1.5 h-3.5 w-3.5 animate-spin",
									"aria-hidden": true
								}), t("obsidian_setup_dialog.checking")] }) : t("obsidian_setup_dialog.installed_continue")
							})]
						})
					]
				}),
				currentStep === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"data-testid": "obsidian-setup-step-2",
					className: "space-y-3",
					"aria-labelledby": "obsidian-setup-step-2-title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							id: "obsidian-setup-step-2-title",
							className: "text-sm font-semibold text-foreground",
							children: t("obsidian_setup_dialog.connect_heading")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								t("obsidian_setup_dialog.connect_body_1"),
								" ",
								t("obsidian_setup_dialog.connect_body_2"),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									className: "rounded bg-background px-1 py-0.5 font-mono text-xs",
									children: "obsidian://"
								}),
								" ",
								t("obsidian_setup_dialog.connect_body_3")
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							role: "radiogroup",
							"aria-label": t("obsidian_setup_dialog.vault_choice_heading"),
							className: "space-y-2",
							"data-testid": "obsidian-setup-vault-choice",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									role: "radio",
									"aria-checked": registerMode === "separate",
									onClick: () => setRegisterMode("separate"),
									"data-testid": "obsidian-setup-mode-separate",
									className: cn("w-full rounded-md border px-3 py-2 text-left transition-colors", registerMode === "separate" ? "border-primary bg-primary/5 ring-1 ring-primary/50" : "border-border bg-background/40 hover:border-primary/50"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-sm font-medium text-foreground",
										children: t("obsidian_setup_dialog.mode_separate_label")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-muted-foreground",
										children: t("obsidian_setup_dialog.mode_separate_hint")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									role: "radio",
									"aria-checked": registerMode === "existing",
									disabled: vaults.length === 0,
									onClick: () => setRegisterMode("existing"),
									"data-testid": "obsidian-setup-mode-existing",
									className: cn("w-full rounded-md border px-3 py-2 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-60", registerMode === "existing" ? "border-primary bg-primary/5 ring-1 ring-primary/50" : "border-border bg-background/40 hover:border-primary/50"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-sm font-medium text-foreground",
										children: t("obsidian_setup_dialog.mode_existing_label")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-muted-foreground",
										children: vaults.length === 0 ? t("obsidian_setup_dialog.mode_existing_disabled_hint") : t("obsidian_setup_dialog.mode_existing_hint")
									})]
								}),
								registerMode === "existing" && vaults.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedSelect, {
									ariaLabel: t("obsidian_setup_dialog.vault_select_label"),
									value: selectedVaultPath ?? "",
									onValueChange: setSelectedVaultPath,
									testId: "obsidian-setup-vault-select",
									options: vaults.map((vault) => ({
										value: vault.path,
										label: vault.name,
										hint: vault.path
									}))
								})
							]
						}),
						registerMode === "separate" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "rounded-md border border-border bg-background/40 px-3 py-2 text-xs text-muted-foreground",
							"data-testid": "obsidian-setup-vault-path",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-micro uppercase tracking-wide text-muted-foreground/70",
								children: t("obsidian_setup_dialog.vault_path_label")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-foreground",
								children: vaultPath
							})]
						}),
						registerHint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-md border border-[#ffb84d]/40 bg-[#ffb84d]/10 px-3 py-2 text-xs text-[#ffb84d]",
							"data-testid": "obsidian-setup-register-hint",
							role: "status",
							children: registerHint
						}),
						registerError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive",
							"data-testid": "obsidian-setup-register-error",
							role: "alert",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: registerError }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `?doc=${TROUBLESHOOT_SLUG}`,
								onClick: (event) => {
									event.preventDefault();
									handleTroubleshoot();
								},
								className: "inline-flex items-center gap-1 text-xs underline hover:no-underline",
								"data-testid": "obsidian-setup-help-link",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
									className: "h-3 w-3",
									"aria-hidden": true
								}), t("obsidian_setup_dialog.open_help")]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "sm",
								onClick: onClose,
								"data-testid": "obsidian-setup-cancel",
								children: t("common.cancel")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "sm",
								onClick: handleConfirmRegister,
								disabled: registering || registerMode === "existing" && !selectedVaultPath,
								"data-testid": "obsidian-setup-register",
								children: registering ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									className: "mr-1.5 h-3.5 w-3.5 animate-spin",
									"aria-hidden": true
								}), t("obsidian_setup_dialog.registering")] }) : t("obsidian_setup_dialog.register_now")
							})]
						})
					]
				}),
				currentStep === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"data-testid": "obsidian-setup-step-3",
					className: "space-y-3",
					"aria-labelledby": "obsidian-setup-step-3-title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							id: "obsidian-setup-step-3-title",
							className: "text-sm font-semibold text-foreground",
							children: t("obsidian_setup_dialog.step_live_test")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: t("obsidian_setup_dialog.live_test_body")
						}),
						activeVaultRoot && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "rounded-md border border-border bg-background/40 px-3 py-2 text-xs text-muted-foreground",
							"data-testid": "obsidian-setup-active-vault-root",
							children: [
								t("obsidian_setup_dialog.active_vault_label"),
								":",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-foreground",
									children: activeVaultRoot
								})
							]
						}),
						restartRequired && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 rounded-md border border-primary/40 bg-primary/5 p-3",
							"data-testid": "obsidian-setup-restart-hint",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: t("obsidian_setup_dialog.restart_required_hint")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: () => void handleRestartNow(),
								disabled: restarting,
								"data-testid": "obsidian-setup-restart-now",
								children: restarting ? t("obsidian_setup_dialog.restarting") : t("obsidian_setup_dialog.restart_now")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-start gap-2 pt-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								size: "sm",
								onClick: handleLaunchObsidian,
								"data-testid": "obsidian-setup-launch",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
									className: "mr-1.5 h-3.5 w-3.5",
									"aria-hidden": true
								}), t("obsidian_setup_dialog.open_in_obsidian")]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-stretch gap-2 pt-2 sm:flex-row sm:items-center sm:justify-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "sm",
								onClick: handleTroubleshoot,
								"data-testid": "obsidian-setup-troubleshoot",
								children: t("obsidian_setup_dialog.did_not_work")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "sm",
								onClick: handleComplete,
								"data-testid": "obsidian-setup-finish",
								children: t("obsidian_setup_dialog.it_worked")
							})]
						})
					]
				})
			]
		})
	});
}
var WikiGraph = (0, import_react.lazy)(() => __vitePreload(() => import("./WikiGraph-IDCmX85x.js"), __vite__mapDeps([4,1,2,5,6,7,8,9])).then((mod) => ({ default: mod.WikiGraph })));
var IS_MAC = typeof navigator !== "undefined" && /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent);
function WikiView() {
	const t = useT();
	const language = useUiLanguage();
	useWikiLive();
	const [selectedSlug, setSelectedSlug] = (0, import_react.useState)(null);
	const [centreTab, setCentreTab] = (0, import_react.useState)("graph");
	const [isGraphExpanded, setIsGraphExpanded] = (0, import_react.useState)(false);
	const [toast, setToast] = (0, import_react.useState)(null);
	const [setupHint, setSetupHint] = (0, import_react.useState)(null);
	const [dialogOpen, setDialogOpen] = (0, import_react.useState)(false);
	const [isReindexing, setIsReindexing] = (0, import_react.useState)(false);
	const [reindexError, setReindexError] = (0, import_react.useState)(null);
	const searchRef = (0, import_react.useRef)(null);
	const inspectorOpen = useWikiPanelStore((s) => s.open);
	const setInspectorOpen = useWikiPanelStore((s) => s.setOpen);
	const wikiPageRequest = useEventStore((s) => s.wikiPageRequest);
	(0, import_react.useEffect)(() => {
		if (wikiPageRequest) setSelectedSlug(wikiPageRequest.slug);
	}, [wikiPageRequest]);
	const treeQuery = useQuery({
		queryKey: ["wiki", "tree"],
		queryFn: fetchWikiTree,
		staleTime: 5e3
	});
	const stats = treeQuery.data?.stats;
	const totalPages = stats?.total_pages ?? 0;
	const totalLinks = stats?.total_links ?? 0;
	const folders = (0, import_react.useMemo)(() => treeQuery.data?.folders ?? [], [treeQuery.data?.folders]);
	const items = (0, import_react.useMemo)(() => libraryItems(folders), [folders]);
	const itemsBySlug = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const item of items) if (!map.has(item.slug)) map.set(item.slug, item);
		return map;
	}, [items]);
	const healthQuery = useQuery({
		queryKey: ["wiki", "health"],
		queryFn: fetchWikiHealth,
		refetchInterval: 3e4,
		staleTime: 5e3
	});
	(0, import_react.useEffect)(() => {
		if (selectedSlug) {
			setCentreTab("page");
			setIsGraphExpanded(false);
		}
	}, [selectedSlug]);
	(0, import_react.useEffect)(() => {
		if (!isGraphExpanded) return;
		const onKey = (event) => {
			if (event.key === "Escape") setIsGraphExpanded(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [isGraphExpanded]);
	(0, import_react.useEffect)(() => {
		const controller = new AbortController();
		let cancelled = false;
		(async () => {
			try {
				const [statusResp, stateResp] = await Promise.all([fetch("/api/setup/obsidian/status", { signal: controller.signal }), fetch("/api/setup/state", { signal: controller.signal })]);
				if (cancelled || !statusResp.ok || !stateResp.ok) return;
				const status = await statusResp.json();
				const state = await stateResp.json();
				if (cancelled) return;
				if (state.obsidian_setup_seen === false && status.recommended_action !== "ok") {
					setSetupHint(status);
					setDialogOpen(true);
				}
			} catch (err) {
				if (err?.name !== "AbortError") console.debug("[WikiView] first-run setup probe failed:", err);
			}
		})();
		return () => {
			cancelled = true;
			controller.abort();
		};
	}, []);
	const showToast = (0, import_react.useCallback)((message) => {
		const id = Date.now();
		setToast({
			message,
			id
		});
		window.setTimeout(() => {
			setToast((prev) => prev?.id === id ? null : prev);
		}, 3e3);
	}, []);
	const handleReindex = (0, import_react.useCallback)(async () => {
		setIsReindexing(true);
		setReindexError(null);
		try {
			const result = await rebuildWikiIndex();
			if (!result.ok) throw new Error(result.error ?? t("wiki_health.reindex_failed"));
			await Promise.all([healthQuery.refetch(), treeQuery.refetch()]);
		} catch (error) {
			setReindexError(error instanceof Error ? error.message : t("wiki_health.reindex_failed"));
			showToast(t("wiki_health.reindex_failed"));
		} finally {
			setIsReindexing(false);
		}
	}, [
		healthQuery,
		showToast,
		t,
		treeQuery
	]);
	const handleSelect = (0, import_react.useCallback)((slug) => {
		if (itemsBySlug.size > 0 && !itemsBySlug.has(slug)) {
			showToast(t("wiki_view.page_not_found"));
			return;
		}
		setIsGraphExpanded(false);
		setCentreTab("page");
		setSelectedSlug(slug);
	}, [
		itemsBySlug,
		showToast,
		t
	]);
	const closePage = (0, import_react.useCallback)(() => {
		setSelectedSlug(null);
		setCentreTab("graph");
	}, []);
	const health = healthQuery.data;
	const healthVisual = health ? classifyWikiHealth(health) : "unknown";
	const curated = stats?.last_curator_run ? relativeAge(Date.parse(stats.last_curator_run) / 1e3, language) : "";
	const subtitle = treeQuery.isLoading ? t("wiki_view.loading_vault") : totalPages === 0 ? t("wiki_view.vault_empty") : [t("wiki_ui.subtitle_pages").replace("{0}", formatCount(totalPages, language)), t("wiki_ui.subtitle_links").replace("{0}", formatCount(totalLinks, language))].filter(Boolean).join(" · ");
	const selectedTitle = selectedSlug ? itemsBySlug.get(selectedSlug)?.title ?? cleanTitle(selectedSlug) : "";
	const inspector = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WikiInspector, {
		selectedSlug,
		itemsBySlug,
		health,
		healthLoading: healthQuery.isLoading,
		isReindexing,
		reindexError,
		onReindex: handleReindex,
		onSelect: handleSelect
	});
	const healthChip = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => {
			closePage();
			setInspectorOpen(true);
		},
		"data-testid": "wiki-health-chip",
		"data-visual": healthQuery.isLoading ? "loading" : healthVisual,
		title: t("wiki_ui.health_chip_title"),
		className: "inline-flex h-8 items-center gap-2 rounded-md px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("h-2 w-2 rounded-full", healthQuery.isLoading ? "animate-pulse bg-faint-foreground" : HEALTH_DOT_STYLE[healthVisual]),
			"aria-hidden": true
		}), healthQuery.isLoading ? t("wiki_health.checking") : t(HEALTH_LABEL_KEY[healthVisual])]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 bg-sidebar",
		"data-testid": "wiki-view",
		children: [
			dialogOpen && setupHint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObsidianSetupDialog, {
				open: dialogOpen,
				onClose: () => setDialogOpen(false),
				initialStatus: setupHint,
				onComplete: async () => {
					try {
						await fetch("/api/setup/state/obsidian-seen", { method: "POST" });
					} catch (err) {
						console.debug("[WikiView] mark-obsidian-seen failed:", err);
					}
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WikiSearch, {
				ref: searchRef,
				onResultClick: handleSelect
			}),
			!isGraphExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WikiLibrary, {
				folders,
				isLoading: treeQuery.isLoading,
				isError: treeQuery.isError,
				selectedSlug,
				onSelect: handleSelect,
				header: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 pb-3 pt-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
								className: "h-4 w-4 shrink-0 text-muted-foreground",
								"aria-hidden": true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "truncate text-lg font-semibold text-foreground-strong",
								children: t("wiki_ui.title")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 truncate text-sm text-muted-foreground",
							title: subtitle,
							"data-testid": "wiki-subtitle",
							children: subtitle
						}),
						curated && totalPages > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm text-foreground-faint",
							children: t("wiki_ui.subtitle_curated").replace("{0}", curated)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => searchRef.current?.open(),
							"data-testid": "wiki-search-trigger",
							className: "mt-4 flex h-8 w-full items-center gap-2 rounded-lg border border-border bg-input px-2.5 text-sm text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									className: "h-3.5 w-3.5 shrink-0",
									"aria-hidden": true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1 truncate text-left",
									children: t("wiki_ui.search_placeholder")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex shrink-0 items-center gap-0.5",
									"aria-hidden": true,
									children: (IS_MAC ? ["⌘", "K"] : ["Ctrl", "K"]).map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
										className: "rounded border border-border bg-background px-1 font-sans text-xs leading-4 text-muted-foreground",
										children: key
									}, key))
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "wiki-workspace",
				className: cn("flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-background", isGraphExpanded ? "fixed inset-0 z-[100]" : "rounded-tl-xl border-l border-t border-border"),
				"data-testid": "wiki-workspace",
				"data-graph-expanded": isGraphExpanded ? "true" : "false",
				children: treeQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-1 items-center justify-center p-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "max-w-reading text-base text-destructive",
						"data-testid": "wiki-tree-error",
						children: t("wiki_view.load_error")
					})
				}) : !treeQuery.isLoading && totalPages === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex min-w-0 flex-1 items-center justify-center p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WikiEmptyState, {})
					}), inspectorOpen && inspector]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "flex min-w-0 flex-1 flex-col",
						"aria-label": t("wiki_ui.stage_label"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-11 shrink-0 items-stretch gap-1 border-b border-border px-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageTab, {
									active: centreTab === "graph",
									onClick: () => setCentreTab("graph"),
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, {
										className: "h-3.5 w-3.5",
										"aria-hidden": true
									}),
									label: t("wiki_ui.tab_map"),
									testId: "wiki-tab-graph"
								}),
								selectedSlug && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageTab, {
									active: centreTab === "page",
									onClick: () => {
										setCentreTab("page");
										setIsGraphExpanded(false);
									},
									label: selectedTitle,
									testId: "wiki-tab-page",
									onClose: closePage,
									closeLabel: t("wiki_ui.close_page")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ml-auto flex items-center gap-1 self-center",
									children: [
										healthChip,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObsidianStatus, { onOpenSetup: (s) => {
											setSetupHint(s);
											setDialogOpen(true);
										} }),
										centreTab === "graph" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
											onClick: () => setIsGraphExpanded((expanded) => !expanded),
											"aria-controls": "wiki-workspace",
											"aria-expanded": isGraphExpanded,
											"aria-label": t(isGraphExpanded ? "wiki_graph.restore_view_title" : "wiki_graph.expand_view_title"),
											title: t(isGraphExpanded ? "wiki_graph.restore_view_title" : "wiki_graph.expand_view_title"),
											"data-testid": "wiki-graph-expand-toggle",
											children: [isGraphExpanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimize2, {
												className: "h-3.5 w-3.5",
												"aria-hidden": true
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, {
												className: "h-3.5 w-3.5",
												"aria-hidden": true
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(isGraphExpanded ? "wiki_graph.restore" : "wiki_graph.expand") })]
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("relative min-h-0 flex-1", centreTab === "page" ? "overflow-y-auto" : "overflow-hidden"),
							children: [centreTab === "graph" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
								fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraphSkeleton, {}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WikiGraph, {
									onNodeClick: handleSelect,
									highlightSlug: selectedSlug ?? void 0
								})
							}), centreTab === "page" && selectedSlug && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageRenderer, {
								slug: selectedSlug,
								onWikilinkClick: handleSelect
							}, selectedSlug)]
						})]
					}), !isGraphExpanded && inspectorOpen && inspector]
				})
			}),
			toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed bottom-12 right-6 z-[110] max-w-sm rounded-lg bg-popover px-4 py-3 text-base text-foreground shadow-float",
				"data-testid": "wiki-toast",
				role: "status",
				children: toast.message
			})
		]
	});
}
function formatCount(value, language) {
	try {
		return new Intl.NumberFormat(language).format(value);
	} catch {
		return String(value);
	}
}
function StageTab({ active, onClick, icon, label, testId, onClose, closeLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative -mb-px flex min-w-0 items-center border-b-2 transition-colors", active ? "border-accent" : "border-transparent"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick,
			"aria-current": active ? "page" : void 0,
			"data-active": active ? "true" : "false",
			"data-testid": testId,
			className: cn("flex h-full min-w-0 max-w-[280px] items-center gap-2 px-2 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring", active ? "text-foreground-strong" : "text-muted-foreground hover:text-foreground"),
			children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: label
			})]
		}), onClose && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onClose,
			"aria-label": closeLabel,
			title: closeLabel,
			"data-testid": `${testId}-close`,
			className: "mr-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm text-foreground-faint transition-colors hover:bg-secondary hover:text-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
				className: "h-3 w-3",
				"aria-hidden": true
			})
		})]
	});
}
function WikiEmptyState() {
	const t = useT();
	const assistantName = useEventStore((s) => s.assistantName);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": "wiki-empty-state",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {}),
			title: t("wiki_view.empty_title"),
			description: `${t("wiki_view.empty_body_a")} ${assistantName} ${t("wiki_view.empty_body_b")}`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mx-auto -mt-6 max-w-[420px] text-center text-sm text-foreground-faint",
			children: [
				t("wiki_view.manual_a"),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
					className: "rounded-sm bg-secondary px-1 py-0.5 font-mono text-xs text-foreground",
					children: ".md"
				}),
				t("wiki_view.manual_b"),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
					className: "rounded-sm bg-secondary px-1 py-0.5 font-mono text-xs text-foreground",
					children: "wiki/obsidian-vault/entities/"
				}),
				" ",
				t("wiki_view.manual_c")
			]
		})]
	});
}
function GraphSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full items-center justify-center p-6",
		"data-testid": "wiki-graph-skeleton",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 w-24 animate-pulse rounded-full bg-foreground/10" })
	});
}
export { WikiView };
