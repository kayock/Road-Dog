const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AgentProfileDialog-6XOPVb8m.js","assets/index-BOzhgzD7.js","assets/index-CA6QM4ps.css","assets/tabs-CBD7-HHM.js","assets/switch-hmH-TV55.js","assets/lib-BoWxqGgd.js","assets/lib-B_8abcSJ.js","assets/file-text-D8DI7Rfv.js","assets/CompanionEditor-DhymGKvY.js","assets/check-vbwKkbPq.js","assets/image-up-JXfip9X_.js","assets/lock-ByyvnTXx.js","assets/save-muG05xK1.js","assets/shuffle-DXk0Yi_k.js","assets/petStage-CMRGLgJ7.js","assets/CompanionMark-BvabJfVP.js","assets/appearance-CnI1Xhkn.js","assets/CompanionMark-kAm6WwP_.css","assets/progressionApi-DG7iMoRa.js","assets/figureRecipe-BRnaWN-p.js","assets/toolDiff-CkONUaSH.js","assets/circle-alert-BujlF6G8.js","assets/maximize-2-BK4_PjjK.js","assets/visualFence-DOGBhazZ.js","assets/AgentSwatch-CHRK4Jk4.js","assets/AgentSwatch-B0KVKOcH.css","assets/MemoryDocument-KfnL_NN5.js","assets/badge-yXLOnH3Y.js","assets/societyDisplayName-iRYNmFrn.js"])))=>i.map(i=>d[i]);
import { t as EyeOff } from "./eye-off-DCMC9NUY.js";
import { t as Pencil } from "./pencil-CD-5mlhp.js";
import { Bc as require_jsx_runtime, Bi as Eye, Cn as Portal, Ln as cn, Oc as useQuery, Sn as Overlay, Tn as Title, Xc as require_react, Y as ScrollArea, Yc as require_react_dom, bi as Plus, bn as Content, cc as __vitePreload, gi as Search, ji as LoaderCircle, ln as Button, na as createLucideIcon, oc as useT, tl as __toESM, ui as Trash2, wc as useEventStore, wn as Root, xn as Description, zc as useQueryClient } from "./index-BOzhgzD7.js";
import { t as AgentSwatch } from "./AgentSwatch-CHRK4Jk4.js";
import { r as findLead, s as useRetireAgent } from "./data-v-6nxr7Q.js";
import { t as societyDisplayName } from "./societyDisplayName-iRYNmFrn.js";
import { t as RuntimeBadge } from "./RuntimeBadge-BWtE1Tji.js";
import { t as Badge } from "./badge-yXLOnH3Y.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var UsersRound = createLucideIcon("UsersRound", [
	["path", {
		d: "M18 21a8 8 0 0 0-16 0",
		key: "3ypg7q"
	}],
	["circle", {
		cx: "10",
		cy: "8",
		r: "5",
		key: "o932ke"
	}],
	["path", {
		d: "M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3",
		key: "10s06x"
	}]
]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_react_dom$1 = require_react_dom();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function AgentRosterActions({ agent, roster, sample, hidden, x, y, onVisibilityChange, onDismiss }) {
	const t = useT();
	const client = useQueryClient();
	const retire = useRetireAgent();
	const menuRef = (0, import_react.useRef)(null);
	const [mode, setMode] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)(agent.name);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(false);
	const isLead = agent.tier === "lead";
	(0, import_react.useEffect)(() => {
		if (mode) return;
		const onPointerDown = (event) => {
			if (!menuRef.current?.contains(event.target)) onDismiss();
		};
		const onKeyDown = (event) => {
			if (event.key === "Escape") onDismiss();
		};
		document.addEventListener("pointerdown", onPointerDown, true);
		document.addEventListener("keydown", onKeyDown, true);
		document.addEventListener("scroll", onDismiss, true);
		window.addEventListener("resize", onDismiss);
		return () => {
			document.removeEventListener("pointerdown", onPointerDown, true);
			document.removeEventListener("keydown", onKeyDown, true);
			document.removeEventListener("scroll", onDismiss, true);
			window.removeEventListener("resize", onDismiss);
		};
	}, [mode, onDismiss]);
	(0, import_react.useLayoutEffect)(() => {
		const menu = menuRef.current;
		if (!menu || mode) return;
		const { width, height } = menu.getBoundingClientRect();
		menu.style.left = `${Math.max(8, Math.min(x, window.innerWidth - width - 8))}px`;
		menu.style.top = `${Math.max(8, Math.min(y, window.innerHeight - height - 8))}px`;
		menu.style.visibility = "visible";
		menu.querySelector("button:not([disabled])")?.focus();
	}, [
		x,
		y,
		mode
	]);
	const onMenuKeyDown = (event) => {
		if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
		event.preventDefault();
		const items = Array.from(menuRef.current?.querySelectorAll("button:not([disabled])") ?? []);
		if (!items.length) return;
		items[(items.indexOf(document.activeElement) + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length]?.focus();
	};
	const rename = (0, import_react.useCallback)(async () => {
		const cleaned = name.trim();
		if (!cleaned || cleaned === agent.name || busy) return;
		setBusy(true);
		setError(false);
		try {
			const response = await fetch(`/api/society/agents/${encodeURIComponent(agent.agentId)}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: cleaned })
			});
			if (!response.ok) throw new Error(`rename ${response.status}`);
			await client.invalidateQueries({ queryKey: ["society", "roster"] });
			onDismiss();
		} catch {
			setError(true);
		} finally {
			setBusy(false);
		}
	}, [
		agent.agentId,
		agent.name,
		busy,
		client,
		name,
		onDismiss
	]);
	const remove = (0, import_react.useCallback)(async () => {
		if (busy) return;
		setBusy(true);
		setError(false);
		try {
			await retire(agent, findLead(roster));
			onDismiss();
		} catch {
			setError(true);
		} finally {
			setBusy(false);
		}
	}, [
		agent,
		busy,
		onDismiss,
		retire,
		roster
	]);
	const closeDialog = (open) => {
		if (!open && !busy) onDismiss();
	};
	return (0, import_react_dom$1.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [!mode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: menuRef,
		role: "menu",
		"aria-label": t("society.roster.menu"),
		onKeyDown: onMenuKeyDown,
		style: {
			width: 260,
			visibility: "hidden"
		},
		className: "fixed z-[100] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-float",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "menuitem",
				disabled: sample || isLead,
				onClick: () => {
					setMode("rename");
					setError(false);
				},
				className: "flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-secondary focus:bg-secondary focus:outline-none disabled:opacity-40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
					className: "h-4 w-4",
					"aria-hidden": true
				}), t("society.roster.rename")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "menuitem",
				onClick: () => {
					onVisibilityChange(agent.agentId, !hidden);
					onDismiss();
				},
				className: "flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-secondary focus:bg-secondary focus:outline-none",
				children: [hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
					className: "h-4 w-4",
					"aria-hidden": true
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, {
					className: "h-4 w-4",
					"aria-hidden": true
				}), t(hidden ? "society.roster.show" : "society.roster.hide")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "my-1 border-t border-border",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "menuitem",
				disabled: isLead,
				onClick: () => {
					setMode("delete");
					setError(false);
				},
				className: "flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:outline-none disabled:opacity-40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
					className: "h-4 w-4",
					"aria-hidden": true
				}), t("society.roster.delete")]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		open: mode !== null,
		onOpenChange: closeDialog,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 z-[101] bg-scrim/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
			className: "fixed left-1/2 top-1/2 z-[102] w-[min(400px,calc(100vw-24px))] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-popover p-5 text-popover-foreground shadow-float outline-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					className: "text-base font-semibold",
					children: t(mode === "rename" ? "society.roster.rename" : "society.roster.delete")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
					className: "mt-2 text-sm text-muted-foreground",
					children: mode === "rename" ? t("society.roster.rename_hint") : t("society.roster.delete_confirm").replace("{0}", agent.name)
				}),
				mode === "rename" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (event) => {
						event.preventDefault();
						rename();
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							autoFocus: true,
							value: name,
							maxLength: 40,
							onChange: (event) => setName(event.target.value),
							"aria-label": t("society.roster.name"),
							className: "mt-4 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							className: "mt-2 text-sm text-destructive",
							children: t("society.roster.rename_error")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								disabled: busy,
								onClick: onDismiss,
								children: t("society.roster.cancel")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: busy || !name.trim() || name.trim() === agent.name,
								children: t("society.roster.save")
							})]
						})
					]
				}),
				mode === "delete" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					className: "mt-2 text-sm text-destructive",
					children: t("society.roster.delete_error")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						disabled: busy,
						onClick: onDismiss,
						children: t("society.roster.cancel")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "destructive",
						disabled: busy,
						onClick: () => void remove(),
						children: t("society.roster.delete")
					})]
				})] })
			]
		})] })
	})] }), document.body);
}
async function json(url, init) {
	const response = await fetch(url, init);
	if (!response.ok) {
		const body$1 = await response.json().catch(() => null);
		throw new Error(typeof body$1?.detail === "string" ? body$1.detail : `HTTP ${response.status}`);
	}
	return response.json();
}
var body = (data) => ({
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify(data)
});
function useSocietyChatGroups(enabled = true) {
	return useQuery({
		queryKey: ["society", "chat-groups"],
		queryFn: async () => (await json("/api/society/chat-groups")).groups,
		enabled,
		staleTime: 15e3,
		refetchInterval: 1e4
	});
}
async function createSocietyChatGroup(name, members) {
	return (await json("/api/society/chat-groups", body({
		name,
		members
	}))).group;
}
async function updateSocietyChatGroup(groupId, name, members) {
	return (await json(`/api/society/chat-groups/${encodeURIComponent(groupId)}`, {
		...body({
			name,
			members
		}),
		method: "PATCH"
	})).group;
}
async function deleteSocietyChatGroup(groupId) {
	await json(`/api/society/chat-groups/${encodeURIComponent(groupId)}`, { method: "DELETE" });
}
var meetingUrl = (groupId) => `/api/society/chat-groups/${encodeURIComponent(groupId)}/meeting`;
function useSocietyMeeting(groupId) {
	return useQuery({
		queryKey: [
			"society",
			"meeting",
			groupId
		],
		queryFn: () => json(meetingUrl(groupId)),
		refetchInterval: (query) => query.state.data?.running ? 2e3 : false
	});
}
async function sendSocietyMeeting(groupId, text) {
	return json(meetingUrl(groupId), body({ text }));
}
async function stopSocietyMeeting(groupId) {
	return json(`${meetingUrl(groupId)}/stop`, { method: "POST" });
}
var import_react_dom = require_react_dom();
function GroupRosterActions({ group, x, y, onEdit, onDismiss }) {
	const t = useT();
	const client = useQueryClient();
	const menuRef = (0, import_react.useRef)(null);
	const [confirmUngroup, setConfirmUngroup] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (confirmUngroup) return;
		const onPointerDown = (event) => {
			if (!menuRef.current?.contains(event.target)) onDismiss();
		};
		const onKeyDown = (event) => {
			if (event.key === "Escape") onDismiss();
		};
		document.addEventListener("pointerdown", onPointerDown, true);
		document.addEventListener("keydown", onKeyDown, true);
		document.addEventListener("scroll", onDismiss, true);
		window.addEventListener("resize", onDismiss);
		return () => {
			document.removeEventListener("pointerdown", onPointerDown, true);
			document.removeEventListener("keydown", onKeyDown, true);
			document.removeEventListener("scroll", onDismiss, true);
			window.removeEventListener("resize", onDismiss);
		};
	}, [confirmUngroup, onDismiss]);
	(0, import_react.useLayoutEffect)(() => {
		const menu = menuRef.current;
		if (!menu || confirmUngroup) return;
		const { width, height } = menu.getBoundingClientRect();
		menu.style.left = `${Math.max(8, Math.min(x, window.innerWidth - width - 8))}px`;
		menu.style.top = `${Math.max(8, Math.min(y, window.innerHeight - height - 8))}px`;
		menu.style.visibility = "visible";
		menu.querySelector("button")?.focus();
	}, [
		confirmUngroup,
		x,
		y
	]);
	const onMenuKeyDown = (event) => {
		if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
		event.preventDefault();
		const items = Array.from(menuRef.current?.querySelectorAll("button") ?? []);
		items[(items.indexOf(document.activeElement) + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length]?.focus();
	};
	const remove = async () => {
		if (busy) return;
		setBusy(true);
		setError("");
		try {
			await deleteSocietyChatGroup(group.group_id);
			await client.invalidateQueries({ queryKey: ["society", "chat-groups"] });
			onDismiss();
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : String(cause));
		} finally {
			setBusy(false);
		}
	};
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [!confirmUngroup && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: menuRef,
		role: "menu",
		"aria-label": group.name,
		onKeyDown: onMenuKeyDown,
		style: {
			width: 240,
			visibility: "hidden"
		},
		className: "fixed z-[100] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-float",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			role: "menuitem",
			onClick: () => {
				onEdit();
				onDismiss();
			},
			className: "flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-secondary focus:bg-secondary focus:outline-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
				className: "h-4 w-4",
				"aria-hidden": true
			}), t("society.groups.edit")]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			role: "menuitem",
			onClick: () => setConfirmUngroup(true),
			className: "flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:outline-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
				className: "h-4 w-4",
				"aria-hidden": true
			}), t("society.groups.delete")]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		open: confirmUngroup,
		onOpenChange: (open) => {
			if (!open && !busy) onDismiss();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 z-[101] bg-scrim/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
			className: "fixed left-1/2 top-1/2 z-[102] w-[min(400px,calc(100vw-24px))] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-popover p-5 text-popover-foreground shadow-float outline-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					className: "text-base font-semibold",
					children: t("society.groups.delete")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
					className: "mt-2 text-sm text-muted-foreground",
					children: t("society.groups.delete_confirm")
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					className: "mt-2 text-sm text-destructive",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						disabled: busy,
						onClick: onDismiss,
						children: t("society.groups.cancel")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "destructive",
						disabled: busy,
						onClick: () => void remove(),
						children: t("society.groups.delete")
					})]
				})
			]
		})] })
	})] }), document.body);
}
var STORAGE_KEY = "society.rosterUnread.v1";
function readStored() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return /* @__PURE__ */ new Set();
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return /* @__PURE__ */ new Set();
		return new Set(parsed.filter((entry) => typeof entry === "string"));
	} catch {
		return /* @__PURE__ */ new Set();
	}
}
function useRosterUnread(agents, activeAgentId) {
	const [unread, setUnread] = (0, import_react.useState)(() => readStored());
	const prevStates = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const initialized = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const ids = new Set(agents.map((agent) => agent.agentId));
		const current = new Map(agents.map((agent) => [agent.agentId, agent.state]));
		if (!initialized.current) {
			prevStates.current = current;
			initialized.current = true;
			setUnread((prev) => {
				if ([...prev].every((id) => ids.has(id) && id !== activeAgentId)) return prev;
				const copy = new Set(prev);
				for (const id of [...copy]) if (!ids.has(id) || id === activeAgentId) copy.delete(id);
				return copy;
			});
			return;
		}
		const finished = [];
		for (const [id, state] of current) if (prevStates.current.get(id) === "working" && state !== "working" && state !== "paused") {
			if (id !== activeAgentId) finished.push(id);
		}
		prevStates.current = current;
		setUnread((prev) => {
			if (finished.length === 0) {
				if (!(activeAgentId !== null && prev.has(activeAgentId) || [...prev].some((id) => !ids.has(id)))) return prev;
				const copy$1 = new Set(prev);
				if (activeAgentId) copy$1.delete(activeAgentId);
				for (const id of [...copy$1]) if (!ids.has(id)) copy$1.delete(id);
				return copy$1;
			}
			const copy = new Set(prev);
			for (const id of finished) copy.add(id);
			if (activeAgentId) copy.delete(activeAgentId);
			for (const id of [...copy]) if (!ids.has(id)) copy.delete(id);
			return copy;
		});
	}, [agents, activeAgentId]);
	(0, import_react.useEffect)(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify([...unread]));
		} catch {}
	}, [unread]);
	return unread;
}
function ChatGroupDialog({ group, agents, onClose, onSaved }) {
	const t = useT();
	const client = useQueryClient();
	const assistantName = useEventStore((s) => s.assistantName);
	const [name, setName] = (0, import_react.useState)(group?.name ?? "");
	const [members, setMembers] = (0, import_react.useState)(group?.members.filter((id) => agents.some((agent) => agent.agentId === id && agent.lifecycle !== "archived")) ?? []);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const choices = agents.filter((agent) => agent.lifecycle !== "archived");
	const submit = async (event) => {
		event.preventDefault();
		if (!name.trim() || members.length < 2) return;
		setBusy(true);
		setError("");
		try {
			const saved = group ? await updateSocietyChatGroup(group.group_id, name.trim(), members) : await createSocietyChatGroup(name.trim(), members);
			await client.invalidateQueries({ queryKey: ["society", "chat-groups"] });
			onSaved(saved.group_id);
			onClose();
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : String(cause));
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		open: true,
		onOpenChange: (open) => {
			if (!open) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 z-[150] bg-scrim/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
			className: "fixed left-1/2 top-1/2 z-[151] flex max-h-[80vh] w-[min(28rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl border border-border bg-card p-5 text-foreground shadow-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					className: "font-display text-lg font-semibold",
					children: t(group ? "society.groups.edit" : "society.groups.create")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
					className: "mt-1 text-sm text-muted-foreground",
					children: t("society.groups.description")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (event) => void submit(event),
					className: "mt-4 flex min-h-0 flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm font-medium",
							children: [t("society.groups.name"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								autoFocus: true,
								maxLength: 80,
								value: name,
								onChange: (event) => setName(event.target.value),
								className: "mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-medium",
							children: [
								t("society.groups.members"),
								" (",
								members.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-h-0 overflow-y-auto rounded-md border border-border p-1",
							children: choices.map((agent) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 hover:bg-secondary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: members.includes(agent.agentId),
										onChange: () => setMembers((current) => current.includes(agent.agentId) ? current.filter((id) => id !== agent.agentId) : [...current, agent.agentId])
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentSwatch, {
										agent,
										size: 28
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-0 truncate text-sm",
										children: societyDisplayName(agent, assistantName)
									})
								]
							}, agent.agentId))
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							className: "text-sm text-destructive",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onClose,
								className: "rounded-md px-3 py-2 text-sm hover:bg-secondary",
								children: t("society.groups.cancel")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: busy || !name.trim() || members.length < 2,
								className: "rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground disabled:opacity-50",
								children: t("society.groups.save")
							})]
						})
					]
				})
			]
		})] })
	});
}
var HIDDEN_AGENTS_KEY = "society.roster.hidden-agent-ids";
var ORDER_KEY = "society.roster.order";
var PRESS_DRAG_THRESHOLD_PX = 6;
var GROUP_HOLD_MS = 750;
function readHiddenAgents() {
	try {
		const value = JSON.parse(localStorage.getItem(HIDDEN_AGENTS_KEY) ?? "[]");
		return Array.isArray(value) ? value.filter((id) => typeof id === "string") : [];
	} catch {
		return [];
	}
}
function readRosterOrder() {
	try {
		const value = JSON.parse(localStorage.getItem(ORDER_KEY) ?? "[]");
		return Array.isArray(value) ? value.filter((id) => typeof id === "string") : [];
	} catch {
		return [];
	}
}
var AgentProfileDialog = (0, import_react.lazy)(() => __vitePreload(() => import("./AgentProfileDialog-6XOPVb8m.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28])).then((module) => ({ default: module.AgentProfileDialog })));
var STATE_DOT = {
	idle: "bg-muted-foreground/50",
	working: "bg-success",
	waiting: "bg-warning",
	paused: "bg-muted-foreground/30"
};
function RosterRail({ agents, groups = [], activeGroupId = null, onOpenGroup, onGroupAgents, onAddAgentToGroup, loading, sample, activeAgentId, onOpen, onCreate, side = "right", className, header, footer }) {
	const t = useT();
	const [query, setQuery] = (0, import_react.useState)("");
	const [creatingGroup, setCreatingGroup] = (0, import_react.useState)(false);
	const [profileId, setProfileId] = (0, import_react.useState)(null);
	const [hiddenIds, setHiddenIds] = (0, import_react.useState)(readHiddenAgents);
	const [orderIds, setOrderIds] = (0, import_react.useState)(readRosterOrder);
	const [dragId, setDragId] = (0, import_react.useState)(null);
	const [dropId, setDropId] = (0, import_react.useState)(null);
	const [dropAfter, setDropAfter] = (0, import_react.useState)(false);
	const [groupHover, setGroupHover] = (0, import_react.useState)(null);
	const [groupReady, setGroupReady] = (0, import_react.useState)(false);
	const [showHidden, setShowHidden] = (0, import_react.useState)(false);
	const [menu, setMenu] = (0, import_react.useState)(null);
	const [groupMenu, setGroupMenu] = (0, import_react.useState)(null);
	const [editingGroupId, setEditingGroupId] = (0, import_react.useState)(null);
	const profile = agents.find((agent) => agent.agentId === profileId);
	const menuAgent = agents.find((agent) => agent.agentId === menu?.agentId);
	const menuGroup = groups.find((group) => group.group_id === groupMenu?.groupId);
	const editingGroup = groups.find((group) => group.group_id === editingGroupId);
	const unread = useRosterUnread(agents, activeAgentId);
	const assistantName = useEventStore((state) => state.assistantName);
	const setHidden = (0, import_react.useCallback)((agentId, hidden) => {
		setHiddenIds((current) => {
			const next = hidden ? [...new Set([...current, agentId])] : current.filter((id) => id !== agentId);
			localStorage.setItem(HIDDEN_AGENTS_KEY, JSON.stringify(next));
			return next;
		});
	}, []);
	const closeMenu = (0, import_react.useCallback)(() => setMenu(null), []);
	const openMenu = (event, agentId) => {
		event.preventDefault();
		event.stopPropagation();
		setGroupMenu(null);
		setMenu({
			agentId,
			x: event.clientX,
			y: event.clientY
		});
	};
	const openGroupMenu = (event, groupId) => {
		event.preventDefault();
		event.stopPropagation();
		setMenu(null);
		setGroupMenu({
			groupId,
			x: event.clientX,
			y: event.clientY
		});
	};
	const lead = (0, import_react.useMemo)(() => agents.find((a) => a.tier === "lead") ?? null, [agents]);
	const groupedIds = (0, import_react.useMemo)(() => new Set(groups.flatMap((group) => group.members)), [groups]);
	const memberName = (id) => {
		const agent = agents.find((row) => row.agentId === id);
		return agent ? societyDisplayName(agent, assistantName) : id;
	};
	const visibleGroups = groups.filter((group) => `${group.name} ${group.members.map(memberName).join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()));
	const { leadVisible, rows } = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		const filtered = agents.filter((a) => {
			if (!showHidden && hiddenIds.includes(a.agentId)) return false;
			if (!q) return true;
			return `${a.name} ${societyDisplayName(a, assistantName)} ${a.title}`.toLowerCase().includes(q);
		});
		const masterVisible = lead ? filtered.some((a) => a.agentId === lead.agentId) : false;
		const rank = {
			lead: 0,
			orchestrator: 1,
			specialist: 2
		};
		const rest = filtered.filter((a) => a.agentId !== lead?.agentId && !groupedIds.has(a.agentId));
		const position = new Map(orderIds.map((id, index) => [id, index]));
		const custom = rest.some((a) => position.has(a.agentId));
		rest.sort((a, b) => {
			if (custom) {
				const ai = position.get(a.agentId);
				const bi = position.get(b.agentId);
				if (ai !== void 0 && bi !== void 0) return ai - bi;
				if (ai !== void 0) return -1;
				if (bi !== void 0) return 1;
			}
			return rank[a.tier] - rank[b.tier];
		});
		return {
			leadVisible: masterVisible,
			rows: rest
		};
	}, [
		agents,
		assistantName,
		groupedIds,
		hiddenIds,
		lead,
		orderIds,
		query,
		showHidden
	]);
	const reorderable = query.trim() === "";
	const moveToPosition = (0, import_react.useCallback)((fromId, toId, after) => {
		if (fromId === toId) return;
		setOrderIds((current) => {
			const base = rows.map((a) => a.agentId);
			const known = new Set(base);
			for (const id of current) if (!known.has(id)) base.push(id);
			const without = base.filter((id) => id !== fromId);
			const at = without.indexOf(toId);
			if (at === -1) {
				const next$1 = [...without, fromId];
				try {
					localStorage.setItem(ORDER_KEY, JSON.stringify(next$1));
				} catch {}
				return next$1;
			}
			const insert = after ? at + 1 : at;
			const next = [
				...without.slice(0, insert),
				fromId,
				...without.slice(insert)
			];
			try {
				localStorage.setItem(ORDER_KEY, JSON.stringify(next));
			} catch {}
			return next;
		});
	}, [rows]);
	const moveStep = (0, import_react.useCallback)((agentId, delta) => {
		setOrderIds((current) => {
			const base = rows.map((a) => a.agentId);
			const known = new Set(base);
			for (const id of current) if (!known.has(id)) base.push(id);
			const at = base.indexOf(agentId);
			const swap = at + delta;
			if (at === -1 || swap < 0 || swap >= base.length) return current;
			const next = [...base];
			[next[at], next[swap]] = [next[swap], next[at]];
			try {
				localStorage.setItem(ORDER_KEY, JSON.stringify(next));
			} catch {}
			return next;
		});
	}, [rows]);
	const onRowKeyDown = (event, agentId) => {
		if (!reorderable || !event.altKey) return;
		if (event.key === "ArrowUp" || event.key === "ArrowDown") {
			event.preventDefault();
			moveStep(agentId, event.key === "ArrowUp" ? -1 : 1);
		}
	};
	const listRef = (0, import_react.useRef)(null);
	const railRef = (0, import_react.useRef)(null);
	const pendingRef = (0, import_react.useRef)(null);
	const pointerDragRef = (0, import_react.useRef)(false);
	const suppressClickRef = (0, import_react.useRef)(false);
	const dragIdRef = (0, import_react.useRef)(null);
	const dropIdRef = (0, import_react.useRef)(null);
	const dropAfterRef = (0, import_react.useRef)(false);
	const groupHoverRef = (0, import_react.useRef)(null);
	const groupReadyRef = (0, import_react.useRef)(false);
	const holdTimerRef = (0, import_react.useRef)(null);
	const reorderableRef = (0, import_react.useRef)(reorderable);
	const moveToRef = (0, import_react.useRef)(moveToPosition);
	const groupAgentsRef = (0, import_react.useRef)(onGroupAgents);
	const addToGroupRef = (0, import_react.useRef)(onAddAgentToGroup);
	dragIdRef.current = dragId;
	dropIdRef.current = dropId;
	dropAfterRef.current = dropAfter;
	reorderableRef.current = reorderable;
	moveToRef.current = moveToPosition;
	groupAgentsRef.current = onGroupAgents;
	addToGroupRef.current = onAddAgentToGroup;
	(0, import_react.useEffect)(() => {
		const rowElements = () => {
			const list = listRef.current;
			if (!list) return [];
			return [...list.querySelectorAll("[data-agent-id]")];
		};
		const hit = (element, x, y) => {
			const rect = element.getBoundingClientRect();
			return rect.width > 0 && rect.height > 0 && x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
		};
		const groupTargetAt = (x, y, sourceId) => {
			if (groupAgentsRef.current) {
				const agent = rowElements().find((element) => element.dataset.agentId !== sourceId && hit(element, x, y));
				if (agent?.dataset.agentId) return {
					kind: "agent",
					id: agent.dataset.agentId
				};
			}
			if (addToGroupRef.current) {
				const group = [...railRef.current?.querySelectorAll("[data-group-id]") ?? []].find((element) => hit(element, x, y));
				if (group?.dataset.groupId) return {
					kind: "group",
					id: group.dataset.groupId
				};
			}
			return null;
		};
		const clearHold = () => {
			if (holdTimerRef.current !== null) window.clearTimeout(holdTimerRef.current);
			holdTimerRef.current = null;
			groupHoverRef.current = null;
			groupReadyRef.current = false;
			setGroupHover(null);
			setGroupReady(false);
		};
		const updateHold = (target) => {
			const previous = groupHoverRef.current;
			if (previous?.kind === target?.kind && previous?.id === target?.id) return;
			clearHold();
			if (!target) return;
			groupHoverRef.current = target;
			setGroupHover(target);
			holdTimerRef.current = window.setTimeout(() => {
				groupReadyRef.current = true;
				setGroupReady(true);
			}, GROUP_HOLD_MS);
		};
		const onMove = (event) => {
			if (!reorderableRef.current) return;
			let sourceId = pointerDragRef.current ? dragIdRef.current : null;
			if (!sourceId) {
				const pending = pendingRef.current;
				if (!pending) return;
				if (event.pointerId !== pending.pointerId) return;
				if (Math.max(Math.abs(event.clientX - pending.startX), Math.abs(event.clientY - pending.startY)) < PRESS_DRAG_THRESHOLD_PX) return;
				pointerDragRef.current = true;
				sourceId = pending.id;
				setDragId(pending.id);
				setDropId(null);
				setDropAfter(false);
			}
			if (!sourceId) return;
			{
				const elements = rowElements();
				const sourceEl = elements.find((el) => el.getAttribute("data-agent-id") === sourceId);
				if (sourceEl) {
					const rect = sourceEl.getBoundingClientRect();
					if (rect.height > 0 && event.clientY >= rect.top && event.clientY <= rect.bottom) {
						updateHold(null);
						if (dropIdRef.current !== null) {
							setDropId(null);
							setDropAfter(false);
						}
						return;
					}
				}
				const groupTarget = groupTargetAt(event.clientX, event.clientY, sourceId);
				updateHold(groupTarget);
				if (groupTarget?.kind === "group") {
					if (dropIdRef.current !== null) setDropId(null);
					if (event.cancelable) event.preventDefault();
					return;
				}
				let target = null;
				for (const el of elements) {
					const id = el.getAttribute("data-agent-id");
					if (!id || id === sourceId) continue;
					const rect = el.getBoundingClientRect();
					if (rect.height === 0) continue;
					if (event.clientY < rect.top + rect.height / 2) {
						target = {
							id,
							after: false
						};
						break;
					}
				}
				if (!target) {
					const others = elements.filter((el) => el.getAttribute("data-agent-id") !== sourceId);
					const lastId = others[others.length - 1]?.getAttribute("data-agent-id");
					if (lastId) target = {
						id: lastId,
						after: true
					};
				}
				if (target) {
					if (dropIdRef.current !== target.id || dropAfterRef.current !== target.after) {
						setDropId(target.id);
						setDropAfter(target.after);
					}
				} else if (dropIdRef.current !== null) {
					setDropId(null);
					setDropAfter(false);
				}
				if (event.cancelable) event.preventDefault();
				return;
			}
		};
		const finish = (commit, event) => {
			if (pointerDragRef.current && dragIdRef.current) {
				const from = dragIdRef.current;
				const toId = dropIdRef.current;
				const after = dropAfterRef.current;
				const held = groupReadyRef.current ? groupHoverRef.current : null;
				const releasedOn = event ? groupTargetAt(event.clientX, event.clientY, from) : null;
				pendingRef.current = null;
				pointerDragRef.current = false;
				setDragId(null);
				setDropId(null);
				setDropAfter(false);
				clearHold();
				if (commit && held && releasedOn?.kind === held.kind && releasedOn.id === held.id) if (held.kind === "agent") groupAgentsRef.current?.(from, held.id);
				else addToGroupRef.current?.(from, held.id);
				else if (commit && releasedOn?.kind !== "group" && toId && toId !== from) moveToRef.current(from, toId, after);
				suppressClickRef.current = true;
				window.setTimeout(() => {
					suppressClickRef.current = false;
				}, 0);
			} else {
				pendingRef.current = null;
				clearHold();
			}
		};
		const onUp = (event) => finish(true, event);
		const onCancel = () => finish(false);
		const onKey = (event) => {
			if (event.key === "Escape") finish(false);
		};
		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onUp);
		window.addEventListener("pointercancel", onCancel);
		window.addEventListener("keydown", onKey);
		return () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onUp);
			window.removeEventListener("pointercancel", onCancel);
			window.removeEventListener("keydown", onKey);
			if (holdTimerRef.current !== null) window.clearTimeout(holdTimerRef.current);
		};
	}, []);
	const onRowPointerDown = (event, agentId) => {
		if (!reorderable) return;
		if (event.pointerType === "touch") return;
		if (event.button !== void 0 && event.button !== 0) return;
		pendingRef.current = {
			id: agentId,
			startX: event.clientX,
			startY: event.clientY,
			pointerId: event.pointerId
		};
	};
	const onRowClickCapture = (event) => {
		if (suppressClickRef.current) {
			event.preventDefault();
			event.stopPropagation();
		}
	};
	const openAgent = (agentId) => {
		if (suppressClickRef.current) return;
		onOpen(agentId);
	};
	const openProfile = (agentId) => {
		if (suppressClickRef.current) return;
		setProfileId(agentId);
	};
	const hiddenCount = agents.filter((agent) => hiddenIds.includes(agent.agentId)).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		ref: railRef,
		"data-testid": "society-roster-rail",
		className: cn("flex h-full min-h-0 flex-col border-border bg-sidebar", side === "left" ? "border-r border-border" : "border-l border-border", className ?? "w-[300px] shrink-0"),
		children: [
			header,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2 px-3 pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-sm font-semibold tracking-tight text-foreground",
						children: t("society.roster.title")
					}), sample ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: "text-xs",
						children: t("society.sample_badge")
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [!sample && onOpenGroup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						className: "h-8 px-2",
						onClick: () => setCreatingGroup(true),
						"data-testid": "society-create-group-button",
						"aria-label": t("society.groups.create"),
						title: t("society.groups.create"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {
							className: "h-4 w-4",
							"aria-hidden": true
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "secondary",
						className: "h-8 gap-1 px-2.5",
						onClick: onCreate,
						"data-testid": "society-create-button",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							className: "h-3.5 w-3.5",
							"aria-hidden": true
						}), t("society.roster.create")]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "relative mx-3 mt-3 block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					className: "pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground",
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "search",
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: t("society.roster.search"),
					"aria-label": t("society.roster.search"),
					className: "h-8 w-full rounded-md border border-border bg-background pl-8 pr-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-strong"
				})]
			}),
			hiddenCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setShowHidden((value) => !value),
				className: "mx-3 mt-2 flex items-center gap-1.5 rounded-md px-2 py-1 text-left text-xs text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
					className: "h-3.5 w-3.5",
					"aria-hidden": true
				}), t(showHidden ? "society.roster.hide_hidden" : "society.roster.show_hidden").replace("{0}", String(hiddenCount))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollArea, {
				className: "mt-2 min-h-0 flex-1",
				children: [
					lead && leadVisible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center px-2 pb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-testid": "society-lead-hero",
							onContextMenu: (event) => openMenu(event, lead.agentId),
							className: cn("flex flex-col items-center gap-1.5 rounded-xl bg-secondary/50 px-5 py-3 text-center transition-colors hover:bg-secondary/80", lead.agentId === activeAgentId && "bg-secondary"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => openProfile(lead.agentId),
								"aria-label": t("society.profile_card.open").replace("{0}", societyDisplayName(lead, assistantName)),
								className: "relative rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentSwatch, {
									agent: lead,
									size: 56
								}), lead.state === "working" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									role: "status",
									"aria-label": t("society.roster.thinking"),
									title: t("society.roster.thinking"),
									className: "absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-sidebar ring-2 ring-sidebar",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
										className: "h-3.5 w-3.5 animate-spin text-muted-foreground",
										"aria-hidden": true
									})
								}) : unread.has(lead.agentId) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-label": t("society.roster.unread"),
									title: t("society.roster.unread"),
									className: "absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-sky-400 ring-2 ring-sidebar"
								}) : null]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => openAgent(lead.agentId),
								"aria-current": lead.agentId === activeAgentId ? "true" : void 0,
								className: "flex max-w-full items-center justify-center gap-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-sm font-medium text-foreground",
									children: societyDisplayName(lead, assistantName)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									className: "shrink-0 px-1.5 py-0 text-xs",
									children: t("society.tier.lead")
								})]
							})]
						})
					}) : null,
					leadVisible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-3 mb-1 border-t border-border/60",
						"aria-hidden": true
					}) : null,
					visibleGroups.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-0.5 px-2 pb-2",
						children: visibleGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"data-group-id": group.group_id,
							onClick: () => onOpenGroup?.(group.group_id),
							onContextMenu: (event) => openGroupMenu(event, group.group_id),
							"aria-current": activeGroupId === group.group_id ? "true" : void 0,
							className: cn("flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", activeGroupId === group.group_id && "bg-secondary", groupHover?.kind === "group" && groupHover.id === group.group_id && (groupReady ? "ring-2 ring-primary" : "ring-1 ring-border-strong")),
							"data-testid": `society-group-${group.group_id}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex w-12 shrink-0 items-center justify-center",
								children: group.members.slice(0, 3).map((id, index) => {
									const member = agents.find((agent) => agent.agentId === id);
									return member ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("rounded-full ring-2 ring-sidebar", index > 0 && "-ml-3"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentSwatch, {
											agent: member,
											size: 26
										})
									}, id) : null;
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm font-medium text-foreground",
									children: group.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-xs text-muted-foreground",
									children: groupHover?.kind === "group" && groupHover.id === group.group_id ? t(groupReady ? "society.groups.release_to_group" : "society.groups.hold_to_group") : group.members.map(memberName).join(", ")
								})]
							})]
						}) }, group.group_id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						ref: listRef,
						className: "flex flex-col gap-0.5 px-2 pb-3",
						children: [
							loading && !leadVisible && rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "px-2 py-3 text-xs text-muted-foreground",
								children: t("society.roster.loading")
							}) : null,
							!loading && !leadVisible && rows.length === 0 && visibleGroups.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "px-2 py-3 text-xs text-muted-foreground",
								children: t("society.roster.empty")
							}) : null,
							rows.map((agent) => {
								const isDragging = dragId === agent.agentId;
								const isDropTarget = dropId === agent.agentId && dragId !== agent.agentId;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "relative",
									children: [
										isDropTarget && !dropAfter && !groupReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"aria-hidden": true,
											className: "pointer-events-none absolute inset-x-2 top-0 z-10 h-0.5 -translate-y-1/2 rounded-full bg-sky-400"
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-agent-id": agent.agentId,
											onPointerDown: (event) => onRowPointerDown(event, agent.agentId),
											onClickCapture: onRowClickCapture,
											onKeyDown: (event) => onRowKeyDown(event, agent.agentId),
											onContextMenu: (event) => openMenu(event, agent.agentId),
											title: reorderable ? `${t("society.roster.reorder")} · ${t("society.roster.reorder_keys")}` : void 0,
											"aria-keyshortcuts": reorderable ? "Alt+ArrowUp Alt+ArrowDown" : void 0,
											className: cn("flex w-full select-none items-center rounded-md px-2 text-left transition-colors hover:bg-secondary", reorderable ? "cursor-grab" : null, isDragging ? "cursor-grabbing opacity-40" : null, agent.agentId === activeAgentId && "bg-secondary", hiddenIds.includes(agent.agentId) && "opacity-60", isDropTarget && "bg-secondary ring-1 ring-inset ring-border-strong", groupHover?.kind === "agent" && groupHover.id === agent.agentId && groupReady && "ring-2 ring-primary"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => openProfile(agent.agentId),
												"aria-label": t("society.profile_card.open").replace("{0}", agent.name),
												className: "shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "relative flex",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentSwatch, {
														agent,
														size: 48
													}), agent.tier !== "lead" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuntimeBadge, {
														runtime: agent.runtime,
														className: "absolute bottom-0.5 right-0.5"
													}) : null]
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => openAgent(agent.agentId),
												"aria-current": agent.agentId === activeAgentId ? "true" : void 0,
												className: "flex min-w-0 flex-1 select-none items-center gap-2.5 rounded-md py-2 pl-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "min-w-0 flex-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "flex items-center gap-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "truncate text-sm font-medium text-foreground",
															children: agent.name
														}), agent.tier === "lead" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
															variant: "secondary",
															className: "px-1.5 py-0 text-xs",
															children: t("society.tier.lead")
														}) : null]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block truncate text-xs text-muted-foreground",
														children: agent.title
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowStatus, {
													agent,
													hasUnread: unread.has(agent.agentId)
												})]
											})]
										}),
										groupHover?.kind === "agent" && groupHover.id === agent.agentId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-testid": "society-group-drop-hint",
											className: "pointer-events-none absolute right-2 top-1 rounded bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground",
											children: t(groupReady ? "society.groups.release_to_group" : "society.groups.hold_to_group")
										}),
										isDropTarget && dropAfter && !groupReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"aria-hidden": true,
											className: "pointer-events-none absolute inset-x-2 bottom-0 z-10 h-0.5 translate-y-1/2 rounded-full bg-sky-400"
										}) : null
									]
								}, agent.agentId);
							})
						]
					})
				]
			}),
			footer,
			menu && menuAgent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentRosterActions, {
				agent: menuAgent,
				roster: agents,
				sample,
				hidden: hiddenIds.includes(menu.agentId),
				x: menu.x,
				y: menu.y,
				onVisibilityChange: setHidden,
				onDismiss: closeMenu
			}, menu.agentId),
			groupMenu && menuGroup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupRosterActions, {
				group: menuGroup,
				x: groupMenu.x,
				y: groupMenu.y,
				onEdit: () => setEditingGroupId(menuGroup.group_id),
				onDismiss: () => setGroupMenu(null)
			}, groupMenu.groupId),
			profile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentProfileDialog, {
					agent: profile,
					sample,
					onClose: () => setProfileId(null)
				}, profile.agentId)
			}),
			creatingGroup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatGroupDialog, {
				agents,
				onClose: () => setCreatingGroup(false),
				onSaved: (id) => onOpenGroup?.(id)
			}),
			editingGroup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatGroupDialog, {
				group: editingGroup,
				agents,
				onClose: () => setEditingGroupId(null),
				onSaved: (id) => onOpenGroup?.(id)
			})
		]
	});
}
function RowStatus({ agent, hasUnread }) {
	const t = useT();
	if (agent.state === "working") {
		const label = t("society.roster.thinking");
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			role: "status",
			"aria-label": label,
			title: label,
			className: "grid h-4 w-4 shrink-0 place-items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
				className: "h-3 w-3 animate-spin text-muted-foreground",
				"aria-hidden": true
			})
		});
	}
	if (hasUnread) {
		const label = t("society.roster.unread");
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "h-2 w-2 shrink-0 rounded-full bg-sky-400",
			title: label,
			"aria-label": label
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("h-2 w-2 shrink-0 rounded-full", STATE_DOT[agent.state]),
		title: t(`society.state.${agent.state}`),
		"aria-label": t(`society.state.${agent.state}`)
	});
}
export { sendSocietyMeeting as a, useSocietyChatGroups as c, deleteSocietyChatGroup as i, useSocietyMeeting as l, ChatGroupDialog as n, stopSocietyMeeting as o, createSocietyChatGroup as r, updateSocietyChatGroup as s, RosterRail as t };
