import { t as FileText } from "./file-text-D8DI7Rfv.js";
import { Bc as require_jsx_runtime, Cn as Portal, Dc as useMutation, Ln as cn, Oc as useQuery, Sn as Overlay, Tn as Title, Xc as require_react, bn as Content, gi as Search, ln as Button, nc as useLocaleChunk, oc as useT, si as X, tl as __toESM, wc as useEventStore, wn as Root, xn as Description, yi as RefreshCw, zc as useQueryClient } from "./index-BOzhgzD7.js";
import "./lib-BoWxqGgd.js";
import "./petStage-CMRGLgJ7.js";
import "./toolDiff-CkONUaSH.js";
import "./visualFence-DOGBhazZ.js";
import "./switch-hmH-TV55.js";
import { t as AgentSwatch } from "./AgentSwatch-CHRK4Jk4.js";
import { a as resolveCompanion } from "./appearance-CnI1Xhkn.js";
import "./CompanionMark-BvabJfVP.js";
import { r as defaultRecipe } from "./figureRecipe-BRnaWN-p.js";
import { t as societyDisplayName } from "./societyDisplayName-iRYNmFrn.js";
import { t as Badge } from "./badge-yXLOnH3Y.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CBD7-HHM.js";
import { n as MemoryMarkdown } from "./MemoryDocument-KfnL_NN5.js";
import { CompanionEditor } from "./CompanionEditor-DhymGKvY.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
async function get(url, signal) {
	const response = await fetch(url, { signal });
	if (!response.ok) throw new Error(`HTTP ${response.status}`);
	return response.json();
}
function useAgentKnowledge(agentId, sample) {
	return useQuery({
		queryKey: [
			"society",
			"agent-knowledge",
			agentId
		],
		enabled: !sample,
		retry: false,
		staleTime: 1e4,
		refetchInterval: () => 12e3 + Math.random() * 4e3,
		queryFn: async ({ signal }) => {
			const response = await fetch(`/api/society/agents/${encodeURIComponent(agentId)}/knowledge`, { signal });
			if (response.status !== 404) {
				if (!response.ok) throw new Error(`HTTP ${response.status}`);
				return response.json();
			}
			const tree = await get("/api/wiki/tree", signal);
			if (!tree.ok) throw new Error("Memory listing unavailable");
			const namespace = `society/${agentId}/`;
			return {
				files: tree.folders.filter((folder) => `${folder.name}/`.startsWith(namespace)).flatMap((folder) => folder.files.map((file) => {
					const name = `${folder.name}/${file.slug}.md`.slice(namespace.length);
					return {
						path: `memory/${name}`,
						name,
						kind: "memory",
						updated_ms: file.mtime * 1e3,
						size: file.size
					};
				})),
				learned_instructions: [],
				reviews: {
					pending: 0,
					done: 0
				},
				last_review: null,
				legacy: true
			};
		}
	});
}
function LearnedInstructions({ agentId, sample }) {
	const t = useT();
	const query = useAgentKnowledge(agentId, sample);
	if (sample) return null;
	const data = query.data;
	const status = data?.last_review?.state === "reviewing" ? "reviewing" : data?.reviews.pending ? "pending" : data?.reviews.done ? "done" : "waiting";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-5 rounded-xl border border-border p-4",
		"aria-label": t("society.profile_card.learned_instructions"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: t("society.profile_card.learned_instructions")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					disabled: query.isFetching,
					onClick: () => void query.refetch(),
					"aria-label": t("society.profile_card.refresh"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						size: 14,
						"aria-hidden": true
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-xs leading-relaxed text-muted-foreground",
				children: t("society.profile_card.learned_hint")
			}),
			query.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-sm text-destructive",
				children: t("society.profile_card.load_error")
			}) : query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: t("society.profile_card.loading")
			}) : data?.legacy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				className: "text-xs text-muted-foreground",
				children: t("society.profile_card.runtime_pending")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				data?.learned_instructions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "list-disc space-y-2 pl-4 text-sm",
					children: data.learned_instructions.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: rule }, rule))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: t("society.profile_card.no_instructions")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-muted-foreground",
					role: "status",
					children: [t(`society.profile_card.review_${status}`), data?.reviews.pending ? ` (${data.reviews.pending})` : ""]
				}),
				data?.last_review && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: [
						t("society.profile_card.last_review"),
						": ",
						new Date(data.last_review.updated_ms).toLocaleString()
					]
				})
			] })
		]
	});
}
function AgentMemoryFiles({ agentId, sample }) {
	const t = useT();
	const [search, setSearch] = (0, import_react.useState)("");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const query = useAgentKnowledge(agentId, sample);
	const files = query.data?.files ?? [];
	const booksReady = files.some((file$1) => file$1.name === "USER.md") && files.some((file$1) => file$1.name === "MEMORY.md");
	const visible = files.filter((file$1) => file$1.path.toLowerCase().includes(search.toLowerCase()));
	const current = files.find((file$1) => file$1.path === selected) ?? files[0];
	const file = useQuery({
		queryKey: [
			"society",
			"profile-knowledge-file",
			agentId,
			current?.path,
			current?.updated_ms,
			Boolean(query.data?.legacy)
		],
		enabled: !sample && Boolean(current),
		retry: false,
		queryFn: ({ signal }) => get(query.data?.legacy ? `/api/society/memory/file?path=${encodeURIComponent(`society/${agentId}/${current.name}`)}` : `/api/society/agents/${encodeURIComponent(agentId)}/knowledge/file?path=${encodeURIComponent(current.path)}`, signal)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-6 mb-3 text-xs leading-relaxed text-muted-foreground",
				children: t(query.data && !booksReady ? "society.profile_card.runtime_pending" : "society.profile_card.knowledge_hint")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-6 mb-3 flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						size: 16,
						className: "shrink-0 text-muted-foreground",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "search",
						value: search,
						onChange: (event) => setSearch(event.target.value),
						placeholder: t("society.profile_card.search"),
						"aria-label": t("society.profile_card.search"),
						className: "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						disabled: sample || query.isFetching || file.isFetching,
						"aria-label": t("society.profile_card.refresh"),
						onClick: () => {
							query.refetch();
							if (current) file.refetch();
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							size: 16,
							"aria-hidden": true
						})
					})
				]
			}),
			sample || query.isError || query.isLoading || files.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-6 py-4 text-sm text-muted-foreground",
				role: query.isError ? "alert" : "status",
				children: [t(sample ? "society.profile_card.sample_hint" : query.isError ? "society.profile_card.load_error" : query.isLoading ? "society.profile_card.loading" : "society.profile_card.empty"), query.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: () => void query.refetch(),
					children: t("society.profile_card.retry")
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-h-0 flex-1 grid-rows-[140px_minmax(0,1fr)] border-t border-border sm:grid-cols-[240px_minmax(0,1fr)] sm:grid-rows-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": t("society.profile_card.memory"),
					className: "overflow-y-auto border-b border-border bg-card p-2 sm:border-b-0 sm:border-r",
					children: [visible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "p-3 text-xs text-muted-foreground",
						children: t("society.profile_card.no_results")
					}), visible.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-current": entry.path === current?.path ? "true" : void 0,
						onClick: () => setSelected(entry.path),
						className: cn("mb-1 flex w-full select-none items-start gap-2 rounded-lg p-3 text-left text-sm hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", entry.path === current?.path && "bg-secondary"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
							size: 16,
							className: "mt-0.5 shrink-0 text-muted-foreground",
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block break-all font-medium",
								children: entry.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-xs text-muted-foreground",
								children: t(entry.name === "USER.md" ? "society.profile_card.user_book" : entry.name === "MEMORY.md" ? "society.profile_card.memory_book" : `society.profile_card.kind_${entry.kind}`)
							})]
						})]
					}, entry.path))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"aria-label": current?.path,
					className: "min-w-0 overflow-auto p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 border-b border-border pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "break-all font-mono text-xs",
							children: current?.path
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: t("society.profile_card.read_only")
						})]
					}), file.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "status",
						className: "text-sm text-muted-foreground",
						children: t("society.profile_card.loading")
					}) : file.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						role: "alert",
						className: "text-sm text-destructive",
						children: [
							t("society.profile_card.load_error"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => void file.refetch(),
								children: t("society.profile_card.retry")
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryMarkdown, { text: file.data?.content || t("society.profile_card.empty_file") })]
				})]
			})
		]
	});
}
var fieldClass = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60";
async function readJson(url, signal) {
	const response = await fetch(url, { signal });
	if (!response.ok) throw new Error(`HTTP ${response.status}`);
	return response.json();
}
function AgentProfileDialog({ agent, sample, onClose }) {
	const t = useT();
	useLocaleChunk("society");
	const client = useQueryClient();
	const displayName = societyDisplayName(agent, useEventStore((s) => s.assistantName));
	const opener = (0, import_react.useRef)(document.activeElement instanceof HTMLElement ? document.activeElement : null);
	const lead = agent.tier === "lead";
	const [title, setTitle] = (0, import_react.useState)(agent.title);
	const [description, setDescription] = (0, import_react.useState)(agent.description);
	const [leadDraft, setLeadDraft] = (0, import_react.useState)(null);
	const [saved, setSaved] = (0, import_react.useState)({
		title: agent.title,
		description: agent.description
	});
	const [discard, setDiscard] = (0, import_react.useState)(false);
	const [tab, setTab] = (0, import_react.useState)("profile");
	const [look, setLook] = (0, import_react.useState)(() => resolveCompanion(agent.agentId, agent.figure?.companion));
	const [savedLook, setSavedLook] = (0, import_react.useState)(() => JSON.stringify(look));
	const lookDirty = !lead && JSON.stringify(look) !== savedLook;
	const instructions = useQuery({
		queryKey: [
			"society",
			"profile-instructions",
			agent.agentId
		],
		enabled: lead && !sample,
		retry: false,
		queryFn: ({ signal }) => readJson("/api/settings/agent-instructions", signal)
	});
	const content = lead ? leadDraft ?? instructions.data?.content ?? "" : description;
	const dirty = lead ? leadDraft !== null && leadDraft !== (instructions.data?.content ?? "") : title !== saved.title || description !== saved.description || lookDirty;
	const save = useMutation({
		mutationFn: async () => {
			const response = await fetch(lead ? "/api/settings/agent-instructions" : `/api/society/agents/${encodeURIComponent(agent.agentId)}`, {
				method: lead ? "PUT" : "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(lead ? { content } : {
					title: title.trim(),
					description,
					...lookDirty ? { avatar: {
						...agent.figure ?? defaultRecipe(),
						companion: look
					} } : {}
				})
			});
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			return response.json();
		},
		onSuccess: (result) => {
			if (lead) {
				client.setQueryData([
					"society",
					"profile-instructions",
					agent.agentId
				], result);
				setLeadDraft(null);
			} else {
				setTitle(title.trim());
				setSaved({
					title: title.trim(),
					description
				});
				setSavedLook(JSON.stringify(look));
			}
			setDiscard(false);
			client.invalidateQueries({ queryKey: ["society", "roster"] });
			if (!lead) client.invalidateQueries({ queryKey: ["mars"] });
		}
	});
	const close = () => {
		if (save.isPending) return;
		if (dirty) setDiscard(true);
		else onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		open: true,
		onOpenChange: (open) => {
			if (!open) close();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 z-50 bg-scrim/60 backdrop-blur-sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
			"data-testid": "agent-profile-dialog",
			onCloseAutoFocus: (event) => {
				event.preventDefault();
				opener.current?.focus();
			},
			className: "fixed left-1/2 top-1/2 z-50 flex h-[min(82dvh,780px)] w-[min(800px,calc(100vw-24px))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-border bg-popover text-foreground shadow-float outline-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex shrink-0 items-center gap-4 border-b border-border p-6",
					children: [
						lead ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentSwatch, {
							agent,
							size: 56
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setTab("look"),
							"aria-label": t("society.profile_card.look"),
							title: t("society.profile_card.look"),
							className: "rounded-xl p-1 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentSwatch, {
								agent: {
									...agent,
									figure: {
										...agent.figure ?? defaultRecipe(),
										companion: look
									}
								},
								size: 56
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
									className: "truncate text-xl font-semibold",
									children: displayName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
									className: "mt-1 truncate text-sm text-muted-foreground",
									children: agent.title || t("society.profile_card.subtitle")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "secondary",
											children: t(`society.tier.${agent.tier}`)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											children: t(`society.state.${agent.state}`)
										}),
										sample && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											children: t("society.sample_badge")
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: close,
							"aria-label": t("society.card.close"),
							className: "self-start rounded-lg p-2 text-muted-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								size: 18,
								"aria-hidden": true
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					value: tab,
					onValueChange: setTab,
					className: "flex min-h-0 flex-1 flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "mx-6 mt-4 w-fit shrink-0",
							"aria-label": t("society.profile_card.subtitle"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "profile",
									children: t("society.profile_card.profile")
								}),
								!lead && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "look",
									children: t("society.profile_card.look")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "memory",
									children: t("society.profile_card.memory")
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "profile",
							className: "min-h-0 flex-1 overflow-y-auto px-6 pb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "space-y-1.5 text-sm",
										children: [t("society.profile_card.name"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: fieldClass,
											value: displayName,
											readOnly: true
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "space-y-1.5 text-sm",
										children: [t("society.profile_card.role"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: fieldClass,
											value: title,
											onChange: (event) => setTitle(event.target.value),
											disabled: lead || sample || save.isPending
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "agent-profile-instructions",
											className: "text-sm font-medium",
											children: t("society.profile_card.instructions")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mb-2 mt-1 text-xs leading-relaxed text-muted-foreground",
											children: t(lead ? "society.card.instructions_hint" : "society.profile_card.instructions_hint")
										}),
										instructions.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											role: "alert",
											className: "mb-2 text-sm text-destructive",
											children: [
												t("society.profile_card.load_error"),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													size: "sm",
													onClick: () => void instructions.refetch(),
													children: t("society.profile_card.retry")
												})
											]
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											id: "agent-profile-instructions",
											className: cn(fieldClass, "min-h-[220px] resize-y leading-relaxed"),
											value: content,
											onChange: (event) => lead ? setLeadDraft(event.target.value) : setDescription(event.target.value),
											disabled: sample || save.isPending || lead && !instructions.data,
											placeholder: t("society.card.no_description")
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnedInstructions, {
									agentId: agent.agentId,
									sample
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "mt-5 grid gap-4 rounded-xl border border-border p-4 text-sm sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-xs text-muted-foreground",
											children: t("society.profile_card.model")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "mt-1 break-words",
											children: lead || !agent.model ? t("society.card.default_brain") : `${agent.providerLabel || agent.provider} · ${agent.model}`
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-xs text-muted-foreground",
											children: t("society.profile_card.access")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "mt-1",
											children: t(`society.profile_card.access_${agent.grantMode}`)
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-xs text-muted-foreground",
											children: t("society.profile_card.id")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "mt-1 break-all font-mono text-xs",
											children: agent.agentId
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-xs text-muted-foreground",
											children: t("society.profile_card.location")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "mt-1 break-all font-mono text-xs",
											children: `society/${agent.agentId}/`
										})] })
									]
								})
							]
						}),
						!lead && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "look",
							className: "min-h-0 flex-1 overflow-y-auto px-2 pb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanionEditor, {
								value: look,
								onChange: setLook,
								disabled: sample || save.isPending,
								preview3d: false,
								agentId: agent.agentId
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "memory",
							className: "mt-3 min-h-0 flex-1 overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentMemoryFiles, {
								agentId: agent.agentId,
								sample
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
					className: "flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-border px-6 py-4",
					children: discard ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							role: "alert",
							className: "mr-auto text-sm",
							children: t("society.profile_card.unsaved")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => setDiscard(false),
							children: t("society.profile_card.keep_editing")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: onClose,
							children: t("society.profile_card.discard")
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						save.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							role: "alert",
							className: "mr-auto text-sm text-destructive",
							children: t("society.profile_card.save_error")
						}),
						save.isSuccess && !dirty && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							role: "status",
							className: "mr-auto text-sm text-muted-foreground",
							children: t("society.profile_card.saved")
						}),
						sample && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mr-auto text-xs text-muted-foreground",
							children: t("society.profile_card.sample_hint")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: close,
							disabled: save.isPending,
							children: t("society.card.close")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => save.mutate(),
							disabled: !dirty || sample || save.isPending,
							children: t(save.isPending ? "society.card.saving" : "society.card.save")
						})
					] })
				})
			]
		})] })
	});
}
export { AgentProfileDialog };
