import { t as Check } from "./check-vbwKkbPq.js";
import { t as ChevronRight } from "./chevron-right-BjVJ-R2c.js";
import { t as Folder } from "./folder-Dd9IlgL2.js";
import { t as Pencil } from "./pencil-CD-5mlhp.js";
import { Bc as require_jsx_runtime, Di as Mic, Hi as Ellipsis, Ln as cn, Ri as FolderOpen, Xc as require_react, bi as Plus, cn as useIdeThreadsStore, ea as Archive, ji as LoaderCircle, na as createLucideIcon, qi as ChevronDown, si as X, sn as useIdeProjectsStore, tl as __toESM, ui as Trash2, vs as patchAgentChatSession, wc as useEventStore } from "./index-BOzhgzD7.js";
import { t as AgentMark } from "./AgentMark-Bw7Rhl-a.js";
import { d as threadsByProject, f as useThreadChatStore, g as ThreadPopover, h as ThreadMenuSeparator, l as threadStatus, m as ThreadMenuItem, r as moveThreadId, s as shortAge, t as arrangeThreads, u as threadTitle } from "./threadModel-C_UnqFrB.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArchiveRestore = createLucideIcon("ArchiveRestore", [
	["rect", {
		width: "20",
		height: "5",
		x: "2",
		y: "3",
		rx: "1",
		key: "1wp1u1"
	}],
	["path", {
		d: "M4 8v11a2 2 0 0 0 2 2h2",
		key: "tvwodi"
	}],
	["path", {
		d: "M20 8v11a2 2 0 0 1-2 2h-2",
		key: "1gkqxj"
	}],
	["path", {
		d: "m9 15 3-3 3 3",
		key: "1pd0qc"
	}],
	["path", {
		d: "M12 12v9",
		key: "192myk"
	}]
]);
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var SquarePlus = createLucideIcon("SquarePlus", [
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}],
	["path", {
		d: "M8 12h8",
		key: "1wcyev"
	}],
	["path", {
		d: "M12 8v8",
		key: "napkw2"
	}]
]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var EXPANSION_KEY = "jarvis.ide.threadExpansion.v1";
var FOLDED_COUNT = 6;
var POLL_MS = 4e3;
var THREAD_DRAG_MIME = "application/x-jarvis-thread";
function readExpansion() {
	try {
		const value = JSON.parse(localStorage.getItem(EXPANSION_KEY) ?? "{}");
		if (!value || typeof value !== "object" || Array.isArray(value)) return {};
		return Object.fromEntries(Object.entries(value).filter(([, open]) => typeof open === "boolean"));
	} catch {
		return {};
	}
}
function saveExpansion(value) {
	try {
		localStorage.setItem(EXPANSION_KEY, JSON.stringify(value));
	} catch {}
}
function StatusMark({ status }) {
	if (status === "approval") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		role: "img",
		"aria-label": "Waiting for your approval",
		title: "Waiting for your approval",
		className: "h-2 w-2 shrink-0 rounded-full bg-warning"
	});
	if (status === "running") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
		role: "img",
		"aria-label": "Working",
		className: "h-3.5 w-3.5 shrink-0 animate-spin text-muted-foreground"
	});
	if (status === "unseen") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		role: "img",
		"aria-label": "New activity",
		title: "New activity",
		className: "h-2 w-2 shrink-0 rounded-full bg-accent"
	});
	return null;
}
function ThreadTree() {
	const projects = useIdeProjectsStore((state) => state.projects);
	const connectProject = useIdeProjectsStore((state) => state.connectProject);
	const toggleVoice = useIdeProjectsStore((state) => state.toggleVoice);
	const pushToast = useEventStore((state) => state.pushToast);
	const sessions = useThreadChatStore((state) => state.sessions);
	const catalog = useThreadChatStore((state) => state.catalog);
	const activeSessionId = useThreadChatStore((state) => state.activeSessionId);
	const selection = useIdeThreadsStore((state) => state.selection);
	const projectOf = useIdeThreadsStore((state) => state.projectOf);
	const seen = useIdeThreadsStore((state) => state.seen);
	const openThread = useIdeThreadsStore((state) => state.openThread);
	const newThread = useIdeThreadsStore((state) => state.newThread);
	const forgetThread = useIdeThreadsStore((state) => state.forgetThread);
	const archived = useIdeThreadsStore((state) => state.archived);
	const order = useIdeThreadsStore((state) => state.order);
	const archiveThread = useIdeThreadsStore((state) => state.archiveThread);
	const restoreThread = useIdeThreadsStore((state) => state.restoreThread);
	const setThreadOrder = useIdeThreadsStore((state) => state.setThreadOrder);
	const [expansion, setExpansion] = (0, import_react.useState)(readExpansion);
	const [showAll, setShowAll] = (0, import_react.useState)({});
	const [renaming, setRenaming] = (0, import_react.useState)(null);
	const [menu, setMenu] = (0, import_react.useState)(null);
	const [archiveOpen, setArchiveOpen] = (0, import_react.useState)({});
	const [dragged, setDragged] = (0, import_react.useState)(null);
	const [dropTarget, setDropTarget] = (0, import_react.useState)(null);
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(null);
	const menuAnchor = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const store = useThreadChatStore.getState();
		if (!store.catalog || store.catalogStale) store.loadCatalog();
		store.loadSessions();
		const timer = window.setInterval(() => {
			useThreadChatStore.getState().loadSessions();
		}, POLL_MS);
		return () => window.clearInterval(timer);
	}, []);
	const visible = (0, import_react.useMemo)(() => projects.filter((project) => !project.archived && !project.scratch), [projects]);
	const grouped = (0, import_react.useMemo)(() => threadsByProject(sessions, visible, projectOf), [
		sessions,
		visible,
		projectOf
	]);
	const agentOf = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const provider of catalog?.providers ?? []) if (provider.agent) map.set(provider.id, {
			agent: provider.agent,
			label: provider.label
		});
		return map;
	}, [catalog]);
	const openSessionId = selection.sessionId ?? activeSessionId;
	const setProjectOpen = (id, open) => setExpansion((previous) => {
		const next = {
			...previous,
			[id]: open
		};
		saveExpansion(next);
		return next;
	});
	const rename = async (session, title) => {
		const clean = title.trim();
		setRenaming(null);
		if (!clean || clean === threadTitle(session)) return;
		setBusy(session.session_id);
		try {
			await patchAgentChatSession(session.session_id, { title: clean });
			await useThreadChatStore.getState().loadSessions();
		} catch (error) {
			pushToast("error", error instanceof Error ? error.message : String(error));
		} finally {
			setBusy(null);
		}
	};
	const move = (projectId, ids, sourceId, targetId, before) => {
		const next = moveThreadId(ids, sourceId, targetId, before);
		if (next.some((id, index) => id !== ids[index])) setThreadOrder(projectId, next);
	};
	const clearDrag = () => {
		setDragged(null);
		setDropTarget(null);
	};
	const remove = async (sessionId) => {
		setConfirmDelete(null);
		setBusy(sessionId);
		try {
			await useThreadChatStore.getState().removeSession(sessionId);
			forgetThread(sessionId);
		} finally {
			setBusy(null);
		}
	};
	const projectRow = (project) => {
		const all = grouped.get(project.id) ?? [];
		const threads = arrangeThreads(all.filter((thread) => !(thread.session_id in archived)), order[project.id]);
		const stored = all.filter((thread) => thread.session_id in archived).sort((a, b) => (archived[b.session_id] ?? 0) - (archived[a.session_id] ?? 0));
		const ids = threads.map((thread) => thread.session_id);
		const archiveShown = archiveOpen[project.id] ?? false;
		const draftHere = selection.sessionId === null && selection.projectId === project.id;
		const open = expansion[project.id] ?? (threads.length > 0 || draftHere);
		const shown = showAll[project.id] ? threads : threads.slice(0, FOLDED_COUNT);
		const running = threads.filter((thread) => thread.running).length;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-px",
			"data-testid": `thread-project-${project.id}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group relative flex min-h-8 items-center rounded-md transition-colors hover:bg-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-expanded": open,
					"aria-label": `${open ? "Collapse" : "Expand"} ${project.name}`,
					onClick: () => setProjectOpen(project.id, !open),
					title: project.path,
					className: "flex min-h-8 min-w-0 flex-1 items-center gap-2.5 rounded-md px-2 text-left text-[15px] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					children: [
						open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {
							"aria-hidden": true,
							className: "h-4 w-4 shrink-0 text-muted-foreground",
							strokeWidth: 1.75
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, {
							"aria-hidden": true,
							className: "h-4 w-4 shrink-0 text-muted-foreground",
							strokeWidth: 1.75
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 flex-1 truncate",
							children: project.name
						}),
						!open && running > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							"aria-label": `${running} working`,
							className: "h-3.5 w-3.5 shrink-0 animate-spin text-muted-foreground"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": `New thread in ${project.name}`,
					title: "New thread",
					"data-testid": `thread-new-${project.id}`,
					onClick: () => {
						setProjectOpen(project.id, true);
						newThread(project.id);
					},
					className: "mr-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground/80 transition-colors hover:bg-background/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePlus, {
						className: "h-4 w-4",
						strokeWidth: 1.75
					})
				})]
			}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-1 flex flex-col gap-px",
				children: [
					draftHere && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-current": "page",
						className: "flex min-h-8 items-center gap-2 rounded-md bg-muted px-2 pl-8 text-[15px] text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 flex-1 truncate",
							children: "New thread"
						})
					}),
					shown.map((session) => {
						const selected = session.session_id === openSessionId && selection.sessionId !== null;
						const status = threadStatus(session, seen, openSessionId);
						const mark = agentOf.get(session.provider);
						const menuOpen = menu?.sessionId === session.session_id;
						if (renaming?.sessionId === session.session_id) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "flex min-h-8 items-center gap-1 pl-6 pr-1",
							onSubmit: (event) => {
								event.preventDefault();
								rename(session, renaming.title);
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									autoFocus: true,
									"aria-label": `Rename ${threadTitle(session)}`,
									value: renaming.title,
									maxLength: 120,
									onChange: (event) => setRenaming({
										sessionId: session.session_id,
										title: event.target.value
									}),
									onKeyDown: (event) => {
										if (event.key === "Escape") {
											event.stopPropagation();
											setRenaming(null);
										}
									},
									onBlur: () => void rename(session, renaming.title),
									className: "min-w-0 flex-1 rounded border border-input bg-background px-2 py-1 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									"aria-label": "Save name",
									className: "rounded p-1 text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Cancel renaming",
									onMouseDown: (event) => event.preventDefault(),
									onClick: () => setRenaming(null),
									className: "rounded p-1 text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
								})
							]
						}, session.session_id);
						const dropHere = dropTarget?.sessionId === session.session_id ? dropTarget : null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-testid": `thread-row-${session.session_id}`,
							draggable: true,
							onDragStart: (event) => {
								event.dataTransfer.setData(THREAD_DRAG_MIME, session.session_id);
								event.dataTransfer.effectAllowed = "move";
								setDragged({
									sessionId: session.session_id,
									projectId: project.id
								});
							},
							onDragEnd: clearDrag,
							onDragOver: (event) => {
								if (!dragged || dragged.projectId !== project.id || dragged.sessionId === session.session_id) return;
								if (!event.dataTransfer.types.includes(THREAD_DRAG_MIME)) return;
								event.preventDefault();
								event.dataTransfer.dropEffect = "move";
								const rect = event.currentTarget.getBoundingClientRect();
								const before = event.clientY - rect.top < rect.height / 2;
								setDropTarget((current) => current?.sessionId === session.session_id && current.before === before ? current : {
									sessionId: session.session_id,
									before
								});
							},
							onDragLeave: (event) => {
								const next = event.relatedTarget;
								if (next && event.currentTarget.contains(next)) return;
								setDropTarget((current) => current?.sessionId === session.session_id ? null : current);
							},
							onDrop: (event) => {
								if (!dragged || dragged.projectId !== project.id) return;
								event.preventDefault();
								const rect = event.currentTarget.getBoundingClientRect();
								const before = event.clientY - rect.top < rect.height / 2;
								const sourceId = dragged.sessionId;
								clearDrag();
								move(project.id, ids, sourceId, session.session_id, before);
							},
							className: cn("group/thread relative flex min-h-8 items-center rounded-md transition-colors hover:bg-muted", (selected || menuOpen) && "bg-muted", dragged?.sessionId === session.session_id && "opacity-40", dropHere?.before && "before:absolute before:-top-0.5 before:left-2 before:right-2 before:h-0.5 before:rounded-full before:bg-primary", dropHere && !dropHere.before && "after:absolute after:-bottom-0.5 after:left-2 after:right-2 after:h-0.5 after:rounded-full after:bg-primary"),
							onContextMenu: (event) => {
								event.preventDefault();
								event.stopPropagation();
								menuAnchor.current = event.currentTarget;
								setMenu({
									sessionId: session.session_id,
									projectId: project.id
								});
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-current": selected ? "page" : void 0,
								onClick: () => openThread(session.session_id, project.id),
								onDoubleClick: () => setRenaming({
									sessionId: session.session_id,
									title: threadTitle(session)
								}),
								onKeyDown: (event) => {
									if (!event.altKey || event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
									event.preventDefault();
									const index = ids.indexOf(session.session_id);
									const neighbour = ids[event.key === "ArrowUp" ? index - 1 : index + 1];
									if (neighbour) move(project.id, ids, session.session_id, neighbour, event.key === "ArrowUp");
								},
								title: `${threadTitle(session)} — drag to reorder, or press Alt plus arrow keys to move`,
								className: cn("flex min-h-8 min-w-0 flex-1 items-center gap-2 rounded-md py-1 pl-8 pr-2 text-left text-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", selected ? "text-foreground-strong" : "text-foreground"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-0 flex-1 truncate",
										children: threadTitle(session)
									}),
									busy === session.session_id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
										"aria-hidden": true,
										className: "h-3.5 w-3.5 shrink-0 animate-spin text-muted-foreground"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusMark, { status }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex shrink-0 items-center transition-opacity group-hover/thread:opacity-0 [@media(hover:none)]:opacity-0",
										children: mark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentMark, {
											agent: mark.agent,
											label: mark.label,
											variant: "plain",
											size: "sm"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs tabular-nums text-muted-foreground",
											children: shortAge(session.updated_ms)
										})
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("absolute inset-y-0 right-0 flex items-center gap-1 rounded-r-md bg-gradient-to-l from-muted from-60% to-transparent pl-5 pr-1 transition-opacity", menuOpen ? "opacity-100" : "pointer-events-none opacity-0 group-hover/thread:pointer-events-auto group-hover/thread:opacity-100 group-focus-within/thread:pointer-events-auto group-focus-within/thread:opacity-100 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:opacity-100"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs tabular-nums text-muted-foreground",
									title: new Date(session.updated_ms).toLocaleString(),
									children: shortAge(session.updated_ms)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": `Thread actions for ${threadTitle(session)}`,
									"aria-haspopup": "menu",
									"aria-expanded": menuOpen,
									onClick: (event) => {
										menuAnchor.current = event.currentTarget;
										setMenu(menuOpen ? null : {
											sessionId: session.session_id,
											projectId: project.id
										});
									},
									className: "rounded p-1 text-muted-foreground hover:bg-background/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-3.5 w-3.5" })
								})]
							})]
						}, session.session_id);
					}),
					threads.length > FOLDED_COUNT && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setShowAll((current) => ({
							...current,
							[project.id]: !current[project.id]
						})),
						className: "flex min-h-7 items-center rounded-md pl-8 text-left text-[13px] text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
						children: showAll[project.id] ? "Show less" : `Show ${threads.length - FOLDED_COUNT} more`
					}),
					threads.length === 0 && !draftHere && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => newThread(project.id),
						className: "flex min-h-7 items-center gap-2 rounded-md pl-8 text-left text-[13px] text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							"aria-hidden": true,
							className: "h-3.5 w-3.5"
						}), "Start a thread"]
					}),
					stored.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-expanded": archiveShown,
						"data-testid": `thread-archived-${project.id}`,
						onClick: () => setArchiveOpen((current) => ({
							...current,
							[project.id]: !archiveShown
						})),
						className: "flex min-h-7 items-center gap-1 rounded-md pl-8 text-left text-[13px] text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
						children: [
							archiveShown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
								"aria-hidden": true,
								className: "h-3.5 w-3.5"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
								"aria-hidden": true,
								className: "h-3.5 w-3.5"
							}),
							"Archived (",
							stored.length,
							")"
						]
					}),
					archiveShown && stored.map((session) => {
						const selected = session.session_id === openSessionId && selection.sessionId !== null;
						const menuOpen = menu?.sessionId === session.session_id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-testid": `thread-archived-row-${session.session_id}`,
							className: cn("group/thread relative flex min-h-8 items-center rounded-md transition-colors hover:bg-muted", (selected || menuOpen) && "bg-muted"),
							onContextMenu: (event) => {
								event.preventDefault();
								event.stopPropagation();
								menuAnchor.current = event.currentTarget;
								setMenu({
									sessionId: session.session_id,
									projectId: project.id
								});
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-current": selected ? "page" : void 0,
								onClick: () => openThread(session.session_id, project.id),
								title: threadTitle(session),
								className: "flex min-h-8 min-w-0 flex-1 items-center gap-2 rounded-md py-1 pl-8 pr-2 text-left text-[15px] text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0 flex-1 truncate",
									children: threadTitle(session)
								}), busy === session.session_id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"aria-hidden": true,
									className: "h-3.5 w-3.5 shrink-0 animate-spin text-muted-foreground"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 text-xs tabular-nums transition-opacity group-hover/thread:opacity-0 [@media(hover:none)]:opacity-0",
									children: shortAge(session.updated_ms)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("absolute inset-y-0 right-0 flex items-center rounded-r-md bg-gradient-to-l from-muted from-60% to-transparent pl-5 pr-1 transition-opacity", menuOpen ? "opacity-100" : "pointer-events-none opacity-0 group-hover/thread:pointer-events-auto group-hover/thread:opacity-100 group-focus-within/thread:pointer-events-auto group-focus-within/thread:opacity-100 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:opacity-100"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": `Restore ${threadTitle(session)}`,
									title: "Restore",
									onClick: () => restoreThread(session.session_id),
									className: "rounded p-1 text-muted-foreground hover:bg-background/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveRestore, { className: "h-3.5 w-3.5" })
								})
							})]
						}, session.session_id);
					})
				]
			})]
		}, project.id);
	};
	const menuSession = menu ? sessions.find((session) => session.session_id === menu.sessionId) ?? null : null;
	const menuArchived = menuSession !== null && menuSession.session_id in archived;
	const menuBusy = Boolean(menuSession?.running) || Boolean(menuSession?.pending_approvals?.length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": "ide-thread-tree",
		className: "flex-1 px-2 pb-3 pt-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-8 items-center justify-between gap-2 pl-2 pr-1 text-[15px] font-semibold text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Threads" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Sam Live",
						title: "Sam Live",
						onClick: toggleVoice,
						className: "rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-3.5 w-3.5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Connect project",
						title: "Connect project folder",
						onClick: connectProject,
						className: "rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
					})]
				})]
			}),
			visible.some((project) => project.pinned) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-2 pb-1 pt-3 text-[13px] font-medium text-muted-foreground/80",
					children: "Pinned"
				}),
				visible.filter((project) => project.pinned).map(projectRow),
				visible.some((project) => !project.pinned) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-2 pb-1 pt-4 text-[13px] font-medium text-muted-foreground/80",
					children: "Other projects"
				})
			] }),
			visible.filter((project) => !project.pinned).map(projectRow),
			visible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-2 py-2 text-[13px] text-muted-foreground",
				children: "Connect a folder to start a project."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThreadPopover, {
				anchor: menuAnchor,
				open: menu !== null && menuSession !== null,
				onClose: () => {
					setMenu(null);
					setConfirmDelete(null);
				},
				label: "Thread actions",
				width: 220,
				children: menu && menuSession && (confirmDelete === menu.sessionId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-foreground",
							children: "Delete this thread?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Its conversation leaves the list. The coding agent's own history stays on disk."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setConfirmDelete(null),
								className: "rounded-md px-2.5 py-1 text-sm text-muted-foreground hover:bg-secondary",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									const id = menu.sessionId;
									setMenu(null);
									remove(id);
								},
								className: "rounded-md bg-destructive px-2.5 py-1 text-sm text-destructive-foreground",
								children: "Delete"
							})]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "menu",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThreadMenuItem, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" }),
							label: "Rename",
							onSelect: () => {
								setRenaming({
									sessionId: menuSession.session_id,
									title: threadTitle(menuSession)
								});
								setMenu(null);
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThreadMenuItem, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePlus, { className: "h-3.5 w-3.5" }),
							label: "New thread in this project",
							onSelect: () => {
								newThread(menu.projectId);
								setMenu(null);
							}
						}),
						menuArchived ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThreadMenuItem, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveRestore, { className: "h-3.5 w-3.5" }),
							label: "Restore",
							onSelect: () => {
								restoreThread(menuSession.session_id);
								setMenu(null);
							}
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThreadMenuItem, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "h-3.5 w-3.5" }),
							label: "Archive",
							disabled: menuBusy,
							onSelect: () => {
								archiveThread(menuSession.session_id);
								setMenu(null);
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThreadMenuSeparator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThreadMenuItem, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }),
							label: "Delete",
							danger: true,
							disabled: Boolean(menuSession.running),
							onSelect: () => setConfirmDelete(menu.sessionId)
						})
					]
				}))
			})
		]
	});
}
export { ThreadTree };
