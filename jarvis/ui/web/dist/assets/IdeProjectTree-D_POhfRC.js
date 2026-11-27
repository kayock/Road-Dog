import { t as ArrowUpRight } from "./arrow-up-right-uLYmS_nN.js";
import { t as Check } from "./check-vbwKkbPq.js";
import { t as CopyPlus } from "./copy-plus-C9ZOAyBm.js";
import { n as FolderGit2, t as FolderPlus } from "./folder-plus-UScdmfu2.js";
import { t as Folder } from "./folder-Dd9IlgL2.js";
import { t as GitBranch } from "./git-branch-CqSUH7rn.js";
import { t as Globe } from "./globe-DYHt2aUm.js";
import { t as Pencil } from "./pencil-CD-5mlhp.js";
import { t as Server } from "./server-UsFxH5G7.js";
import { Bc as require_jsx_runtime, Co as placeWorkspace, Di as Mic, Do as removeWorkspace, F as robustCopy, Ga as addTerminal, Hi as Ellipsis, Io as startIdeSession, Ri as FolderOpen, Si as PinOff, Ua as IdeApiError, Wi as Copy, Xc as require_react, Yc as require_react_dom, bi as Plus, fo as fetchWorkspacePanes, go as interruptTerminal, ji as LoaderCircle, jo as reorderWorkspaces, ko as renameWorkspace, na as createLucideIcon, si as X, sn as useIdeProjectsStore, tl as __toESM, ui as Trash2, wc as useEventStore, xi as Pin } from "./index-BOzhgzD7.js";
import { a as openProjectIn, c as revealProject, i as openProject, n as deleteProject, o as patchProject, r as fetchProjectLaunchers, s as reorderProjects, t as ChatLibraryError } from "./chatLibraryApi-Brv_lyLK.js";
import { o as useComputerChoices } from "./useComputers-DbCUX_5s.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var OctagonPause = createLucideIcon("OctagonPause", [
	["path", {
		d: "M10 15V9",
		key: "1lckn7"
	}],
	["path", {
		d: "M14 15V9",
		key: "1muqhk"
	}],
	["path", {
		d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
		key: "2d38gg"
	}]
]);
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var SquareCode = createLucideIcon("SquareCode", [
	["path", {
		d: "M10 9.5 8 12l2 2.5",
		key: "3mjy60"
	}],
	["path", {
		d: "m14 9.5 2 2.5-2 2.5",
		key: "1bir2l"
	}],
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}]
]);
var import_react_dom = require_react_dom();
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var cursor_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%3e%3ctitle%3eCursor%3c/title%3e%3cdefs%3e%3clinearGradient%20id='top-left'%20x1='0'%20y1='0'%20x2='1'%20y2='0'%3e%3cstop%20offset='0'%20stop-color='%239b9b9b'/%3e%3cstop%20offset='1'%20stop-color='%233a3a3a'/%3e%3c/linearGradient%3e%3clinearGradient%20id='top-right'%20x1='0'%20y1='0'%20x2='1'%20y2='0'%3e%3cstop%20offset='0'%20stop-color='%23121212'/%3e%3cstop%20offset='1'%20stop-color='%235a5a5a'/%3e%3c/linearGradient%3e%3clinearGradient%20id='left'%20x1='0'%20y1='0'%20x2='1'%20y2='0'%3e%3cstop%20offset='0'%20stop-color='%23565656'/%3e%3cstop%20offset='1'%20stop-color='%232c2c2c'/%3e%3c/linearGradient%3e%3clinearGradient%20id='bottom-left'%20x1='0'%20y1='0'%20x2='0'%20y2='1'%3e%3cstop%20offset='0'%20stop-color='%235a5a5a'/%3e%3cstop%20offset='1'%20stop-color='%23d2d2d2'/%3e%3c/linearGradient%3e%3clinearGradient%20id='right'%20x1='0'%20y1='0'%20x2='0'%20y2='1'%3e%3cstop%20offset='0'%20stop-color='%231c1c1c'/%3e%3cstop%20offset='1'%20stop-color='%233c3c3c'/%3e%3c/linearGradient%3e%3clinearGradient%20id='bottom-right'%20x1='0'%20y1='0'%20x2='0'%20y2='1'%3e%3cstop%20offset='0'%20stop-color='%239a9a9a'/%3e%3cstop%20offset='1'%20stop-color='%23e8e8e8'/%3e%3c/linearGradient%3e%3c/defs%3e%3crect%20width='24'%20height='24'%20rx='5.4'%20fill='%23000'/%3e%3cpath%20d='M12%204.26%205.292%208.13H12z'%20fill='url(%23top-left)'/%3e%3cpath%20d='M12%204.26V8.13h6.708z'%20fill='url(%23top-right)'/%3e%3cpath%20d='M5.292%208.13%2012%2012%205.292%2015.87z'%20fill='url(%23left)'/%3e%3cpath%20d='M5.292%2015.87%2012%2012v7.74z'%20fill='url(%23bottom-left)'/%3e%3cpath%20d='M18.708%208.13v7.74l-3.32-1.995z'%20fill='url(%23right)'/%3e%3cpath%20d='M15.388%2013.875%2018.708%2015.87%2012%2019.74z'%20fill='url(%23bottom-right)'/%3e%3cpath%20d='M12%2012%2018.708%208.13%2012%2019.74z'%20fill='%23e3e3e3'/%3e%3cpath%20d='M5.292%208.13h13.416L12%2012z'%20fill='%23fff'/%3e%3c/svg%3e";
var vscode_default = "/assets/vscode-BC_h-9TH.svg";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var EXPANSION_KEY = "jarvis.ide.projectExpansion.v1";
var WORKSPACE_DRAG_MIME = "application/x-jarvis-workspace-id";
var PROJECT_DRAG_MIME = "application/x-jarvis-project-id";
function paneDropProps(workspace) {
	return workspace?.status === "open" ? {
		"data-pane-drop-workspace": workspace.id,
		"data-pane-drop-name": workspace.name
	} : {};
}
var PANE_DROP_ACTIVE = "data-[pane-drop-active=true]:bg-primary/10 data-[pane-drop-active=true]:ring-1 data-[pane-drop-active=true]:ring-inset data-[pane-drop-active=true]:ring-primary/60";
var REORDER_NEEDS_RESTART = "This view is newer than the backend — restart the app and try again.";
function reorderErrorMessage(error) {
	if (error instanceof IdeApiError && error.status === 405) return REORDER_NEEDS_RESTART;
	if (error instanceof ChatLibraryError && error.status === 405) return REORDER_NEEDS_RESTART;
	return error instanceof Error ? error.message : String(error);
}
function revealErrorMessage(error) {
	if (error instanceof ChatLibraryError && error.message === "native-file-actions-disabled") return "Opening folders works in the desktop app only.";
	if (error instanceof ChatLibraryError && (error.status === 405 || error.status === 404 && error.message === "Not Found")) return REORDER_NEEDS_RESTART;
	return error instanceof Error ? error.message : String(error);
}
function removalErrorMessage(error) {
	if (error instanceof IdeApiError && (error.status === 405 || error.status === 404 && error.message === "Not Found")) return REORDER_NEEDS_RESTART;
	return error instanceof Error ? error.message : String(error);
}
var NO_LAUNCHERS = {
	file_manager: false,
	editors: [],
	remote_url: null,
	remote_label: null
};
var launcherCache = /* @__PURE__ */ new Map();
var launcherRequests = /* @__PURE__ */ new Map();
function loadLaunchers(projectId) {
	const pending = launcherRequests.get(projectId);
	if (pending) return pending;
	const request = fetchProjectLaunchers(projectId).catch(() => NO_LAUNCHERS).then((found) => {
		launcherCache.set(projectId, found);
		return found;
	}).finally(() => {
		launcherRequests.delete(projectId);
	});
	launcherRequests.set(projectId, request);
	return request;
}
function resetLauncherCacheForTests() {
	launcherCache.clear();
	launcherRequests.clear();
}
function soloWorkspace(project) {
	if (project.workspaces.length !== 1) return null;
	const [workspace] = project.workspaces;
	return workspace.name.trim().toLowerCase() === project.name.trim().toLowerCase() ? workspace : null;
}
function SessionCount({ count, hover }) {
	const fade = hover === "group" ? "group-hover:opacity-0 group-focus-within:opacity-0" : "group-hover/space:opacity-0 group-focus-within/space:opacity-0";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-label": `${count} agent ${count === 1 ? "session" : "sessions"}`,
		className: `shrink-0 text-[13px] tabular-nums text-muted-foreground/70 transition-opacity [@media(hover:none)]:opacity-0 ${fade}`,
		children: count
	});
}
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
function IdeProjectTree() {
	const projects = useIdeProjectsStore((state) => state.projects);
	const activeWorkspaceId = useIdeProjectsStore((state) => state.activeWorkspaceId);
	const pendingWorkspaceId = useIdeProjectsStore((state) => state.pendingWorkspaceId);
	const connectProject = useIdeProjectsStore((state) => state.connectProject);
	const newWorkspace = useIdeProjectsStore((state) => state.newWorkspace);
	const activateWorkspace = useIdeProjectsStore((state) => state.activateWorkspace);
	const openGitPanel = useIdeProjectsStore((state) => state.openGitPanel);
	const toggleVoice = useIdeProjectsStore((state) => state.toggleVoice);
	const requestRefresh = useIdeProjectsStore((state) => state.requestRefresh);
	const pushToast = useEventStore((state) => state.pushToast);
	const [expansion, setExpansion] = (0, import_react.useState)(readExpansion);
	const [renamingId, setRenamingId] = (0, import_react.useState)(null);
	const [draftName, setDraftName] = (0, import_react.useState)("");
	const [mutatingId, setMutatingId] = (0, import_react.useState)(null);
	const [draggedId, setDraggedId] = (0, import_react.useState)(null);
	const [dropTarget, setDropTarget] = (0, import_react.useState)(null);
	const [draggedProjectId, setDraggedProjectId] = (0, import_react.useState)(null);
	const [projectDropTarget, setProjectDropTarget] = (0, import_react.useState)(null);
	const [reordering, setReordering] = (0, import_react.useState)(false);
	const [contextMenu, setContextMenu] = (0, import_react.useState)(null);
	const [renamingWorkspaceId, setRenamingWorkspaceId] = (0, import_react.useState)(null);
	const [draftWorkspaceName, setDraftWorkspaceName] = (0, import_react.useState)("");
	const [confirmWorkspace, setConfirmWorkspace] = (0, import_react.useState)(null);
	const [launchers, setLaunchers] = (0, import_react.useState)(() => Object.fromEntries(launcherCache));
	const [menuPanes, setMenuPanes] = (0, import_react.useState)(null);
	const [confirmProject, setConfirmProject] = (0, import_react.useState)(null);
	const [confirmBusy, setConfirmBusy] = (0, import_react.useState)(false);
	const sawProjectSnapshot = (0, import_react.useRef)(false);
	const lastActiveId = (0, import_react.useRef)(null);
	const lastPendingId = (0, import_react.useRef)(null);
	const knownProjectIds = (0, import_react.useRef)(null);
	const mutatingProjects = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const visible = projects.filter((project) => !project.archived && !project.scratch);
	const activeProject = visible.find((project) => project.workspaces.some((workspace) => workspace.id === activeWorkspaceId));
	const setProjectOpen = (id, open) => setExpansion((previous) => {
		const next = {
			...previous,
			[id]: open
		};
		saveExpansion(next);
		return next;
	});
	(0, import_react.useEffect)(() => {
		if (!sawProjectSnapshot.current) {
			if (visible.length === 0) return;
			sawProjectSnapshot.current = true;
			lastActiveId.current = activeWorkspaceId;
			return;
		}
		if (lastActiveId.current !== activeWorkspaceId) {
			lastActiveId.current = activeWorkspaceId;
			if (activeProject) setProjectOpen(activeProject.id, true);
		}
	}, [
		activeWorkspaceId,
		activeProject?.id,
		projects
	]);
	(0, import_react.useEffect)(() => {
		if (pendingWorkspaceId === null) {
			lastPendingId.current = null;
			return;
		}
		if (lastPendingId.current === pendingWorkspaceId) return;
		const project = visible.find((entry) => entry.workspaces.some((workspace) => workspace.id === pendingWorkspaceId));
		if (project) {
			lastPendingId.current = pendingWorkspaceId;
			setProjectOpen(project.id, true);
		}
	}, [pendingWorkspaceId, projects]);
	(0, import_react.useEffect)(() => {
		const ids = new Set(visible.map((project) => project.id));
		if (knownProjectIds.current) {
			for (const id of ids) if (!knownProjectIds.current.has(id)) setProjectOpen(id, true);
		}
		if (ids.size > 0) knownProjectIds.current = ids;
	}, [projects]);
	const mutate = async (project, changes) => {
		if (mutatingProjects.current.has(project.id)) return;
		mutatingProjects.current.add(project.id);
		setMutatingId(project.id);
		try {
			try {
				await patchProject(project.id, changes);
			} catch (error) {
				if (!(error instanceof ChatLibraryError) || error.status !== 404) throw error;
				await openProject(project.path);
				await patchProject(project.id, changes);
			}
			const solo = soloWorkspace(project);
			if (changes.name && solo?.status === "open") await renameWorkspace(solo.id, changes.name);
			setRenamingId(null);
			requestRefresh();
		} catch (error) {
			pushToast("error", error.message);
		} finally {
			mutatingProjects.current.delete(project.id);
			setMutatingId(null);
		}
	};
	const moveWorkspace = async (sourceId, targetId, before) => {
		if (reordering || sourceId === targetId) return;
		const globalOrder = visible.flatMap((project) => project.workspaces).filter((workspace) => workspace.status === "open").map((workspace) => workspace.id);
		const sourceProject = visible.find((project) => project.workspaces.some((workspace) => workspace.id === sourceId));
		const targetProject = visible.find((project) => project.workspaces.some((workspace) => workspace.id === targetId));
		if (!sourceProject || !targetProject || sourceProject.id !== targetProject.id) return;
		const without = globalOrder.filter((id) => id !== sourceId);
		const targetIndex = without.indexOf(targetId);
		if (targetIndex < 0) return;
		const insertAt = before ? targetIndex : targetIndex + 1;
		const next = [
			...without.slice(0, insertAt),
			sourceId,
			...without.slice(insertAt)
		];
		if (next.join("\0") === globalOrder.join("\0")) return;
		setReordering(true);
		try {
			await reorderWorkspaces(next);
			requestRefresh();
		} catch (error) {
			pushToast("error", reorderErrorMessage(error));
		} finally {
			setReordering(false);
			setDraggedId(null);
			setDropTarget(null);
		}
	};
	const clearDragState = () => {
		setDraggedId(null);
		setDropTarget(null);
	};
	const clearProjectDragState = () => {
		setDraggedProjectId(null);
		setProjectDropTarget(null);
	};
	const openProjectMenu = (event, projectId) => {
		event.preventDefault();
		event.stopPropagation();
		setContextMenu({
			kind: "project",
			projectId,
			x: event.clientX,
			y: event.clientY
		});
	};
	const openWorkspaceMenu = (event, projectId, workspaceId) => {
		event.preventDefault();
		event.stopPropagation();
		setContextMenu({
			kind: "workspace",
			projectId,
			workspaceId,
			x: event.clientX,
			y: event.clientY
		});
	};
	const toggleAnchoredMenu = (event, target) => {
		event.stopPropagation();
		if (contextMenu !== null && contextMenu.kind === target.kind && contextMenu.projectId === target.projectId && (target.kind === "project" || contextMenu.kind === "workspace" && contextMenu.workspaceId === target.workspaceId)) {
			setContextMenu(null);
			return;
		}
		const rect = event.currentTarget.getBoundingClientRect();
		setContextMenu({
			...target,
			x: rect.right - TREE_MENU_WIDTH,
			y: rect.bottom + 4
		});
	};
	const copyPath = async (path) => {
		const copied = await robustCopy(path);
		pushToast(copied ? "success" : "error", copied ? "Folder path copied" : "Could not copy the folder path");
	};
	const revealFolder = async (projectId) => {
		try {
			await revealProject(projectId);
		} catch (error) {
			pushToast("error", revealErrorMessage(error));
		}
	};
	const menuProjectId = contextMenu?.projectId ?? null;
	const menuWorkspaceId = contextMenu?.kind === "workspace" ? contextMenu.workspaceId : null;
	const visibleProjectKey = visible.map((project) => project.id).join("\0");
	(0, import_react.useEffect)(() => {
		let live = true;
		(async () => {
			for (const id of visibleProjectKey ? visibleProjectKey.split("\0") : []) {
				if (!live) return;
				if (launcherCache.has(id)) continue;
				const found = await loadLaunchers(id);
				if (live) setLaunchers((previous) => ({
					...previous,
					[id]: found
				}));
			}
		})();
		return () => {
			live = false;
		};
	}, [visibleProjectKey]);
	(0, import_react.useEffect)(() => {
		if (!menuProjectId) return;
		let live = true;
		loadLaunchers(menuProjectId).then((found) => {
			if (live) setLaunchers((previous) => ({
				...previous,
				[menuProjectId]: found
			}));
		});
		return () => {
			live = false;
		};
	}, [menuProjectId]);
	(0, import_react.useEffect)(() => {
		setMenuPanes(null);
		if (!menuWorkspaceId) return;
		let live = true;
		fetchWorkspacePanes().then((found) => {
			if (live) setMenuPanes(found.panes.filter((pane) => pane.workspace_id === menuWorkspaceId));
		}).catch(() => {
			if (live) setMenuPanes([]);
		});
		return () => {
			live = false;
		};
	}, [menuWorkspaceId]);
	const openIn = async (projectId, target, label) => {
		pushToast("info", `Opening ${label}…`);
		try {
			if (!await openProjectIn(projectId, target)) pushToast("error", `${label} could not be started`);
		} catch (error) {
			pushToast("error", revealErrorMessage(error));
		}
	};
	const addAgent = async (workspace) => {
		try {
			await addTerminal({ workspace_id: workspace.id });
			if (workspace.id !== activeWorkspaceId) activateWorkspace(workspace.id);
			requestRefresh();
		} catch (error) {
			pushToast("error", error.message);
		}
	};
	const duplicateWorkspace = async (project, workspace, panes) => {
		try {
			await startIdeSession(workspace.folder || project.path, panes.map((pane) => ({
				agent: pane.agent,
				...pane.account ? { account: pane.account } : {}
			})), {
				projectId: project.id,
				name: `${workspace.name} copy`
			});
			requestRefresh();
		} catch (error) {
			pushToast("error", error.message);
		}
	};
	const interruptAgents = async (workspace, panes) => {
		const failed = (await Promise.allSettled(panes.map((pane) => interruptTerminal(pane.key, workspace.id)))).filter((result) => result.status === "rejected").length;
		if (failed) pushToast("error", `${failed} of ${panes.length} agents could not be interrupted.`);
		else pushToast("success", `Interrupted ${panes.length} ${panes.length === 1 ? "agent" : "agents"}.`);
	};
	const computers = useComputerChoices();
	const placeWorkspaceOn = async (workspace, computerId) => {
		const target = computerId ? computers.find((c) => c.id === computerId)?.name ?? "the computer" : "this computer";
		pushToast("info", `Moving ${workspace.name} to ${target}. This can take a minute.`);
		try {
			const { message } = await placeWorkspace(workspace.id, computerId);
			window.dispatchEvent(new CustomEvent("jarvis:ide-panes-reconnect", { detail: { workspaceId: workspace.id } }));
			pushToast("success", `${workspace.name} now runs on ${target}. ${message}`.trim());
		} catch (error) {
			pushToast("error", error.message);
		}
	};
	const submitWorkspaceRename = async (workspace) => {
		const name = draftWorkspaceName.trim();
		if (!name || name === workspace.name) {
			setRenamingWorkspaceId(null);
			return;
		}
		if (mutatingId) return;
		setMutatingId(workspace.id);
		try {
			await renameWorkspace(workspace.id, name);
			setRenamingWorkspaceId(null);
			setContextMenu(null);
			requestRefresh();
		} catch (error) {
			pushToast("error", error.message);
		} finally {
			setMutatingId(null);
		}
	};
	const confirmCloseWorkspace = async () => {
		if (!confirmWorkspace || confirmBusy) return;
		const target = visible.flatMap((project) => project.workspaces.map((workspace) => ({
			project,
			workspace
		}))).find((entry) => entry.workspace.id === confirmWorkspace.workspaceId);
		if (!target) {
			setConfirmWorkspace(null);
			return;
		}
		setConfirmBusy(true);
		try {
			await removeWorkspace(target.workspace.id);
			setConfirmWorkspace(null);
			setContextMenu(null);
			requestRefresh();
		} catch (error) {
			pushToast("error", removalErrorMessage(error));
		} finally {
			setConfirmBusy(false);
		}
	};
	const confirmDeleteProject = async () => {
		if (!confirmProject || confirmBusy) return;
		const target = visible.find((project) => project.id === confirmProject);
		if (!target) {
			setConfirmProject(null);
			return;
		}
		setConfirmBusy(true);
		try {
			for (const workspace of target.workspaces) await removeWorkspace(workspace.id);
			await deleteProject(target.id);
			setConfirmProject(null);
			setContextMenu(null);
			requestRefresh();
		} catch (error) {
			pushToast("error", removalErrorMessage(error));
		} finally {
			setConfirmBusy(false);
		}
	};
	const moveProject = async (sourceId, targetId, before) => {
		if (reordering || sourceId === targetId) return;
		const pinned = visible.filter((project) => project.pinned);
		const unpinned = visible.filter((project) => !project.pinned);
		const section = pinned.some((project) => project.id === sourceId) ? pinned : unpinned;
		if (!section.some((project) => project.id === targetId)) return;
		const without = section.map((project) => project.id).filter((id) => id !== sourceId);
		const targetIndex = without.indexOf(targetId);
		if (targetIndex < 0) return;
		const insertAt = before ? targetIndex : targetIndex + 1;
		const sectionNext = [
			...without.slice(0, insertAt),
			sourceId,
			...without.slice(insertAt)
		];
		if (sectionNext.join("\0") === section.map((project) => project.id).join("\0")) return;
		const orderOf = (ids) => {
			const rank = new Map(ids.map((id, index) => [id, index]));
			return (left, right) => (rank.get(left.id) ?? 0) - (rank.get(right.id) ?? 0);
		};
		const pinnedNext = section === pinned ? sectionNext : pinned.map((project) => project.id);
		const unpinnedNext = section === unpinned ? sectionNext : unpinned.map((project) => project.id);
		const next = [...[...pinned].sort(orderOf(pinnedNext)).map((project) => project.id), ...[...unpinned].sort(orderOf(unpinnedNext)).map((project) => project.id)];
		setReordering(true);
		try {
			await reorderProjects(next);
			requestRefresh();
		} catch (error) {
			pushToast("error", reorderErrorMessage(error));
		} finally {
			setReordering(false);
			clearProjectDragState();
		}
	};
	const projectRow = (project) => {
		const open = expansion[project.id] ?? (project.id === activeProject?.id || !activeWorkspaceId && visible[0]?.id === project.id);
		const active = project.id === activeProject?.id;
		const working = mutatingId === project.id;
		const projectDraggable = renamingId !== project.id && !working && !reordering;
		const isProjectDragged = draggedProjectId === project.id;
		const isProjectDropBefore = projectDropTarget?.id === project.id && projectDropTarget.before;
		const isProjectDropAfter = projectDropTarget?.id === project.id && !projectDropTarget.before;
		const solo = soloWorkspace(project);
		const count = project.workspaces.reduce((total, workspace) => total + workspace.terminals, 0);
		const soloSelected = solo !== null && solo.id === activeWorkspaceId;
		const soloPending = solo !== null && solo.id === pendingWorkspaceId;
		const soloBlocked = solo !== null && solo.status === "closed" && !solo.restorable;
		const projectMenuOpen = contextMenu?.projectId === project.id && (solo ? contextMenu.kind === "workspace" && contextMenu.workspaceId === solo.id : contextMenu.kind === "project");
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-px",
			"data-testid": `ide-project-${project.id}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				draggable: projectDraggable,
				"data-testid": `ide-project-header-${project.id}`,
				...paneDropProps(solo),
				onContextMenu: (event) => solo ? openWorkspaceMenu(event, project.id, solo.id) : openProjectMenu(event, project.id),
				onDragStart: (event) => {
					if (!projectDraggable) {
						event.preventDefault();
						return;
					}
					event.dataTransfer.setData(PROJECT_DRAG_MIME, project.id);
					event.dataTransfer.setData("text/plain", project.id);
					event.dataTransfer.effectAllowed = "move";
					setDraggedProjectId(project.id);
				},
				onDragEnd: clearProjectDragState,
				onDragOver: (event) => {
					if (!draggedProjectId || draggedProjectId === project.id) return;
					if (event.dataTransfer.types.includes(WORKSPACE_DRAG_MIME)) return;
					if (!event.dataTransfer.types.includes(PROJECT_DRAG_MIME) && !event.dataTransfer.types.includes("text/plain")) return;
					event.preventDefault();
					event.dataTransfer.dropEffect = "move";
					const rect = event.currentTarget.getBoundingClientRect();
					const before = event.clientY - rect.top < rect.height / 2;
					setProjectDropTarget((current) => current?.id === project.id && current.before === before ? current : {
						id: project.id,
						before
					});
				},
				onDragLeave: (event) => {
					const next = event.relatedTarget;
					if (next && event.currentTarget.contains(next)) return;
					setProjectDropTarget((current) => current?.id === project.id ? null : current);
				},
				onDrop: (event) => {
					if (!draggedProjectId) return;
					event.preventDefault();
					const sourceId = event.dataTransfer.getData(PROJECT_DRAG_MIME) || draggedProjectId;
					const rect = event.currentTarget.getBoundingClientRect();
					const before = event.clientY - rect.top < rect.height / 2;
					clearProjectDragState();
					moveProject(sourceId, project.id, before);
				},
				className: `group relative flex min-h-8 items-center rounded-md transition-colors hover:bg-muted ${active ? "text-foreground" : ""} ${soloSelected || soloPending ? "bg-muted" : ""} ${isProjectDragged ? "opacity-40" : ""} ${isProjectDropBefore ? "before:absolute before:-top-0.5 before:left-2 before:right-2 before:h-0.5 before:rounded-full before:bg-primary" : ""} ${isProjectDropAfter ? "after:absolute after:-bottom-0.5 after:left-2 after:right-2 after:h-0.5 after:rounded-full after:bg-primary" : ""} ${projectDraggable ? "cursor-grab active:cursor-grabbing" : ""} ${PANE_DROP_ACTIVE}`,
				children: renamingId === project.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex min-w-0 flex-1 items-center gap-1 px-2",
					onSubmit: (event) => {
						event.preventDefault();
						const name = draftName.trim();
						if (name && name !== project.name) mutate(project, { name });
						else setRenamingId(null);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							autoFocus: true,
							"aria-label": `Rename ${project.name}`,
							value: draftName,
							maxLength: 80,
							disabled: working,
							onChange: (event) => setDraftName(event.target.value),
							onKeyDown: (event) => {
								if (event.key === "Escape") {
									event.stopPropagation();
									setRenamingId(null);
								}
							},
							className: "min-w-0 flex-1 rounded border border-input bg-background px-2 py-1 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							"aria-label": `Save ${project.name}`,
							disabled: working || !draftName.trim(),
							className: "rounded p-1 text-muted-foreground hover:text-foreground disabled:opacity-40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Cancel renaming ${project.name}`,
							onClick: () => setRenamingId(null),
							className: "rounded p-1 text-muted-foreground hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-label": solo ? `Open ${project.name}` : `${open ? "Collapse" : "Expand"} ${project.name}`,
					"aria-expanded": solo ? void 0 : open,
					"aria-current": soloSelected ? "page" : void 0,
					"aria-busy": soloPending || void 0,
					"data-testid": solo ? `ide-workspace-${solo.id}` : void 0,
					disabled: soloBlocked,
					onClick: () => solo ? activateWorkspace(solo.id) : setProjectOpen(project.id, !open),
					onKeyDown: (event) => {
						if (!event.altKey) return;
						if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
						event.preventDefault();
						const section = visible.filter((entry) => (entry.pinned || false) === (project.pinned || false));
						const index = section.findIndex((entry) => entry.id === project.id);
						const neighbour = event.key === "ArrowUp" ? section[index - 1] : section[index + 1];
						if (!neighbour) return;
						moveProject(project.id, neighbour.id, event.key === "ArrowUp");
					},
					title: soloBlocked ? "This workspace cannot be restored on this machine" : `${project.name} — drag to reorder, or press Alt plus arrow keys to move`,
					className: `flex min-h-8 min-w-0 flex-1 items-center gap-2.5 rounded-md px-2 text-left text-[15px] [@media(hover:none)]:pr-14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-45 ${solo && solo.status !== "open" && !soloSelected && !soloPending ? "text-muted-foreground" : "text-foreground"}`,
					children: [
						soloPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							"aria-hidden": true,
							className: "h-4 w-4 shrink-0 animate-spin text-muted-foreground"
						}) : open && !solo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {
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
						soloPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Switching workspace"
						}),
						count > 0 && (solo || !open) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionCount, {
							count,
							hover: "group"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `absolute inset-y-0 right-0 flex items-center rounded-r-md bg-gradient-to-l from-muted from-60% to-transparent pl-5 pr-1 transition-opacity ${projectMenuOpen ? "opacity-100" : "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:opacity-100"}`,
					"data-project-menu": project.id,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": `Project actions for ${project.name}`,
						title: "Project actions",
						"aria-haspopup": "menu",
						"aria-expanded": projectMenuOpen,
						"data-tree-menu-anchor": true,
						onClick: (event) => toggleAnchoredMenu(event, solo ? {
							kind: "workspace",
							projectId: project.id,
							workspaceId: solo.id
						} : {
							kind: "project",
							projectId: project.id
						}),
						className: `rounded p-1 hover:bg-background/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${projectMenuOpen ? "bg-background/70 text-foreground" : "text-muted-foreground"}`,
						children: working ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-3.5 w-3.5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": `New workspace in ${project.name}`,
						title: "New workspace",
						onClick: () => newWorkspace(project.id),
						className: "rounded p-1 text-muted-foreground hover:bg-background/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
					})]
				})] })
			}), open && !solo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-1 flex flex-col gap-px",
				children: [project.workspaces.map((workspace) => {
					const pending = workspace.id === pendingWorkspaceId;
					const selected = workspace.id === activeWorkspaceId;
					const draggable = workspace.status === "open" && !pending && !reordering;
					const isDragged = draggedId === workspace.id;
					const isDropBefore = dropTarget?.id === workspace.id && dropTarget.before;
					const isDropAfter = dropTarget?.id === workspace.id && !dropTarget.before;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-testid": `ide-workspace-row-${workspace.id}`,
						...paneDropProps(workspace),
						draggable,
						onContextMenu: (event) => openWorkspaceMenu(event, project.id, workspace.id),
						onDragStart: (event) => {
							if (!draggable) {
								event.preventDefault();
								return;
							}
							event.dataTransfer.setData(WORKSPACE_DRAG_MIME, workspace.id);
							event.dataTransfer.setData("text/plain", workspace.id);
							event.dataTransfer.effectAllowed = "move";
							setDraggedId(workspace.id);
						},
						onDragEnd: clearDragState,
						onDragOver: (event) => {
							if (!draggedId || draggedId === workspace.id || workspace.status !== "open") return;
							if (!event.dataTransfer.types.includes(WORKSPACE_DRAG_MIME) && !event.dataTransfer.types.includes("text/plain")) return;
							event.preventDefault();
							event.dataTransfer.dropEffect = "move";
							const rect = event.currentTarget.getBoundingClientRect();
							const before = event.clientY - rect.top < rect.height / 2;
							setDropTarget((current) => current?.id === workspace.id && current.before === before ? current : {
								id: workspace.id,
								before
							});
						},
						onDragLeave: (event) => {
							const next = event.relatedTarget;
							if (next && event.currentTarget.contains(next)) return;
							setDropTarget((current) => current?.id === workspace.id ? null : current);
						},
						onDrop: (event) => {
							if (!draggedId) return;
							event.preventDefault();
							const sourceId = event.dataTransfer.getData(WORKSPACE_DRAG_MIME) || draggedId;
							const rect = event.currentTarget.getBoundingClientRect();
							const before = event.clientY - rect.top < rect.height / 2;
							clearDragState();
							moveWorkspace(sourceId, workspace.id, before);
						},
						className: `group/space relative flex min-h-8 items-center rounded-md transition-colors hover:bg-muted ${selected ? "bg-muted text-foreground" : ""} ${pending ? "bg-muted/80 text-foreground" : ""} ${isDragged ? "opacity-40" : ""} ${isDropBefore ? "before:absolute before:-top-0.5 before:left-2 before:right-2 before:h-0.5 before:rounded-full before:bg-primary" : ""} ${isDropAfter ? "after:absolute after:-bottom-0.5 after:left-2 after:right-2 after:h-0.5 after:rounded-full after:bg-primary" : ""} ${PANE_DROP_ACTIVE}`,
						children: renamingWorkspaceId === workspace.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "flex min-w-0 flex-1 items-center gap-1 px-2 py-1",
							onSubmit: (event) => {
								event.preventDefault();
								submitWorkspaceRename(workspace);
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									autoFocus: true,
									"aria-label": `Rename ${workspace.name}`,
									value: draftWorkspaceName,
									maxLength: 80,
									disabled: mutatingId === workspace.id,
									onChange: (event) => setDraftWorkspaceName(event.target.value),
									onKeyDown: (event) => {
										if (event.key === "Escape") {
											event.stopPropagation();
											setRenamingWorkspaceId(null);
										}
									},
									className: "min-w-0 flex-1 rounded border border-input bg-background px-2 py-1 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									"aria-label": `Save ${workspace.name}`,
									disabled: mutatingId === workspace.id || !draftWorkspaceName.trim(),
									className: "rounded p-1 text-muted-foreground hover:text-foreground disabled:opacity-40",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": `Cancel renaming ${workspace.name}`,
									onClick: () => setRenamingWorkspaceId(null),
									className: "rounded p-1 text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"data-testid": `ide-workspace-${workspace.id}`,
							"aria-current": selected ? "page" : void 0,
							"aria-busy": pending || void 0,
							title: workspace.status === "closed" && !workspace.restorable ? "This workspace cannot be restored on this machine" : workspace.status === "open" ? `${workspace.name} — drag to reorder, or press Alt plus arrow keys to move` : void 0,
							disabled: workspace.status === "closed" && !workspace.restorable,
							onClick: () => activateWorkspace(workspace.id),
							onKeyDown: (event) => {
								if (!event.altKey || workspace.status !== "open") return;
								if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
								event.preventDefault();
								const openInProject = project.workspaces.filter((entry) => entry.status === "open");
								const index = openInProject.findIndex((entry) => entry.id === workspace.id);
								const neighbour = event.key === "ArrowUp" ? openInProject[index - 1] : openInProject[index + 1];
								if (!neighbour) return;
								moveWorkspace(workspace.id, neighbour.id, event.key === "ArrowUp");
							},
							className: `flex min-h-8 min-w-0 flex-1 items-center gap-2 rounded-md py-1 pl-[34px] pr-2 text-left text-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-45 ${selected || pending ? "text-foreground" : workspace.status === "open" ? "text-foreground/80" : "text-muted-foreground"} ${draggable ? "cursor-grab active:cursor-grabbing" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0 flex-1 truncate",
									children: workspace.name
								}),
								pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"aria-hidden": true,
									className: "h-3 w-3 shrink-0 animate-spin text-muted-foreground"
								}) : workspace.terminals > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionCount, {
									count: workspace.terminals,
									hover: "group/space"
								}),
								pending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: "Switching workspace"
								})
							]
						}), (() => {
							const spaceMenuOpen = contextMenu?.kind === "workspace" && contextMenu.workspaceId === workspace.id;
							const reveal = pending && !spaceMenuOpen ? "pointer-events-none opacity-0" : `focus-visible:opacity-100 group-hover/space:opacity-100 group-focus-within/space:opacity-100 [@media(hover:none)]:opacity-100 ${spaceMenuOpen ? "bg-background/70 text-foreground opacity-100" : "opacity-0"}`;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": `Workspace actions for ${workspace.name}`,
								title: "Workspace actions",
								"aria-haspopup": "menu",
								"aria-expanded": spaceMenuOpen,
								"data-tree-menu-anchor": true,
								tabIndex: pending && !spaceMenuOpen ? -1 : void 0,
								onClick: (event) => toggleAnchoredMenu(event, {
									kind: "workspace",
									projectId: project.id,
									workspaceId: workspace.id
								}),
								className: `absolute right-1 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground transition-opacity hover:bg-background/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${reveal}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-3.5 w-3.5" })
							});
						})()] })
					}, workspace.id);
				}), project.workspaces.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => newWorkspace(project.id),
					className: "px-2 py-1.5 text-left text-[13px] text-muted-foreground hover:text-foreground",
					children: "Create workspace"
				})]
			})]
		}, project.id);
	};
	const run = (action) => () => {
		setContextMenu(null);
		action();
	};
	const launcherItems = (project, scope) => {
		const found = launchers[project.id];
		if (!found) return [];
		const items = found.editors.map((editor) => {
			const installed = editor.installed !== false;
			return {
				id: `editor-${editor.id}`,
				label: `Open in ${editor.label}`,
				icon: SquareCode,
				image: EDITOR_LOGOS[editor.id],
				testId: `ide-${scope}-menu-editor-${editor.id}`,
				disabled: !installed,
				hint: installed ? void 0 : "Not installed",
				onSelect: run(() => void openIn(project.id, editor.id, editor.label))
			};
		});
		if (scope === "project" && found.file_manager) items.push({
			id: "reveal",
			label: FILE_MANAGER_LABEL,
			icon: FolderOpen,
			testId: "ide-project-menu-reveal",
			onSelect: run(() => void revealFolder(project.id))
		});
		if (scope === "project" && found.remote_url) items.push({
			id: "remote",
			label: `Open on ${found.remote_label ?? "the web"}`,
			icon: Globe,
			testId: "ide-project-menu-remote",
			onSelect: run(() => void openIn(project.id, "remote", found.remote_label ?? "the web page"))
		});
		return items;
	};
	const projectMenuSections = (project) => [
		[
			{
				id: "new",
				label: "New workspace",
				icon: FolderPlus,
				testId: "ide-project-menu-new",
				onSelect: run(() => newWorkspace(project.id))
			},
			{
				id: "new-worktree",
				label: "New workspace in a worktree",
				icon: FolderGit2,
				testId: "ide-project-menu-new-worktree",
				hint: "Own folder and branch for its agents",
				onSelect: run(() => newWorkspace(project.id, { worktree: true }))
			},
			...launcherItems(project, "project")
		],
		[{
			id: "rename",
			label: "Rename project",
			icon: Pencil,
			testId: "ide-project-menu-rename",
			onSelect: run(() => {
				setDraftName(project.name);
				setRenamingId(project.id);
			})
		}, {
			id: "pin",
			label: project.pinned ? "Unpin project" : "Pin project",
			icon: project.pinned ? PinOff : Pin,
			testId: "ide-project-menu-pin",
			onSelect: run(() => void mutate(project, { pinned: !project.pinned }))
		}],
		[{
			id: "delete",
			label: "Delete project",
			icon: Trash2,
			testId: "ide-project-menu-delete",
			destructive: true,
			onSelect: run(() => setConfirmProject(project.id))
		}]
	];
	const workspaceMenuSections = (project, workspace) => {
		const isOpen = workspace.status === "open";
		const panes = menuPanes ?? [];
		const busy = panes.filter((pane) => pane.activity === "working" || pane.activity === "asking");
		return [
			isOpen ? [
				{
					id: "add",
					label: "Add another agent",
					icon: Plus,
					testId: "ide-workspace-menu-add",
					onSelect: run(() => void addAgent(workspace))
				},
				{
					id: "duplicate",
					label: "Duplicate workspace",
					icon: CopyPlus,
					testId: "ide-workspace-menu-duplicate",
					disabled: panes.length === 0,
					hint: panes.length ? `Starts ${panes.length} fresh ${panes.length === 1 ? "agent" : "agents"}` : void 0,
					onSelect: run(() => void duplicateWorkspace(project, workspace, panes))
				},
				...busy.length ? [{
					id: "interrupt",
					label: `Interrupt ${busy.length} working ${busy.length === 1 ? "agent" : "agents"}`,
					icon: OctagonPause,
					testId: "ide-workspace-menu-interrupt",
					hint: "Stops the current task, keeps the chat",
					onSelect: run(() => void interruptAgents(workspace, busy))
				}] : []
			] : [{
				id: "reopen",
				label: "Reopen workspace",
				icon: ArrowUpRight,
				testId: "ide-workspace-menu-open",
				disabled: !workspace.restorable,
				hint: workspace.restorable ? void 0 : "Its folder is not reachable",
				onSelect: run(() => {
					activateWorkspace(workspace.id);
					setProjectOpen(project.id, true);
				})
			}],
			[...launcherItems(project, "workspace"), {
				id: "copy",
				label: "Copy folder path",
				icon: Copy,
				testId: "ide-workspace-menu-copy",
				onSelect: run(() => void copyPath(workspace.folder || project.path))
			}],
			isOpen ? [...computers.filter((computer) => computer.health.status !== "provisioning").map((computer) => ({
				id: `place-${computer.id}`,
				label: `Move workspace to ${computer.name}`,
				icon: Server,
				testId: `ide-workspace-menu-place-${computer.id}`,
				hint: "Keeps running while this PC is off",
				onSelect: run(() => void placeWorkspaceOn(workspace, computer.id))
			})), ...computers.length ? [{
				id: "place-home",
				label: "Bring workspace back here",
				icon: ArrowUpRight,
				testId: "ide-workspace-menu-place-home",
				onSelect: run(() => void placeWorkspaceOn(workspace, null))
			}] : []] : [],
			isOpen ? [{
				id: "git",
				label: "Git",
				icon: GitBranch,
				testId: "ide-workspace-menu-git",
				hint: "Commit, push, pull request, worktrees",
				onSelect: run(() => openGitPanel(workspace.id))
			}] : [],
			isOpen ? [{
				id: "rename",
				label: "Rename workspace",
				icon: Pencil,
				testId: "ide-workspace-menu-rename",
				onSelect: run(() => {
					setDraftWorkspaceName(workspace.name);
					setRenamingWorkspaceId(workspace.id);
					setProjectOpen(project.id, true);
				})
			}] : [],
			[{
				id: "remove",
				label: "Remove workspace",
				icon: Trash2,
				testId: "ide-workspace-menu-close",
				destructive: true,
				onSelect: run(() => setConfirmWorkspace({
					projectId: project.id,
					workspaceId: workspace.id
				}))
			}]
		];
	};
	const soloMenuSections = (project, workspace) => {
		const [agentActions, , place = [], git = []] = workspaceMenuSections(project, workspace);
		const [projectCreate, projectMeta, projectDelete] = projectMenuSections(project);
		return [
			agentActions,
			[...projectCreate, {
				id: "copy",
				label: "Copy folder path",
				icon: Copy,
				testId: "ide-workspace-menu-copy",
				onSelect: run(() => void copyPath(workspace.folder || project.path))
			}],
			place,
			git,
			projectMeta,
			projectDelete
		];
	};
	const menuProject = contextMenu ? visible.find((project) => project.id === contextMenu.projectId) ?? null : null;
	const menuWorkspace = contextMenu?.kind === "workspace" && menuProject ? menuProject.workspaces.find((workspace) => workspace.id === contextMenu.workspaceId) ?? null : null;
	const confirmWorkspaceTarget = confirmWorkspace ? visible.flatMap((project) => project.workspaces.map((workspace) => ({
		project,
		workspace
	}))).find((entry) => entry.workspace.id === confirmWorkspace.workspaceId) ?? null : null;
	const confirmProjectTarget = confirmProject ? visible.find((project) => project.id === confirmProject) ?? null : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": "ide-project-tree",
		className: "flex-1 px-2 pb-3 pt-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-8 items-center justify-between pl-2 pr-1 text-[15px] font-semibold text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Workspaces" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-0.5",
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
			contextMenu && menuProject && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TreeContextMenu, {
				x: contextMenu.x,
				y: contextMenu.y,
				onDismiss: () => setContextMenu(null),
				label: contextMenu.kind === "workspace" && menuWorkspace ? menuWorkspace.name : menuProject.name,
				kind: contextMenu.kind,
				busy: mutatingId !== null || reordering || confirmBusy,
				sections: contextMenu.kind === "workspace" && menuWorkspace ? soloWorkspace(menuProject)?.id === menuWorkspace.id ? soloMenuSections(menuProject, menuWorkspace) : workspaceMenuSections(menuProject, menuWorkspace) : projectMenuSections(menuProject)
			}),
			confirmWorkspaceTarget && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmTreeAction, {
				title: `Remove ${confirmWorkspaceTarget.workspace.name}?`,
				body: confirmWorkspaceTarget.workspace.status === "open" ? `Its ${confirmWorkspaceTarget.workspace.terminals} coding ${confirmWorkspaceTarget.workspace.terminals === 1 ? "agent" : "agents"} will stop and the workspace leaves the sidebar. The folder on disk and its chats stay untouched.` : "The workspace leaves the sidebar. The folder on disk and its chats stay untouched.",
				confirmLabel: confirmBusy ? "Removing…" : `Remove ${confirmWorkspaceTarget.workspace.name}`,
				busy: confirmBusy,
				testId: "ide-workspace-confirm-close",
				onCancel: () => {
					if (!confirmBusy) setConfirmWorkspace(null);
				},
				onConfirm: () => void confirmCloseWorkspace()
			}),
			confirmProjectTarget && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmTreeAction, {
				title: `Delete ${confirmProjectTarget.name}?`,
				body: (() => {
					const openSpaces = confirmProjectTarget.workspaces.filter((workspace) => workspace.status === "open");
					if (openSpaces.length === 0) return `This forgets the project and its chats. The folders on disk stay untouched.`;
					const agents = openSpaces.reduce((total, workspace) => total + workspace.terminals, 0);
					return `This stops ${agents} running ${agents === 1 ? "agent" : "agents"} in ${openSpaces.length} open ${openSpaces.length === 1 ? "workspace" : "workspaces"} and forgets the project and its chats. The folders on disk stay untouched.`;
				})(),
				confirmLabel: confirmBusy ? "Deleting…" : `Delete ${confirmProjectTarget.name}`,
				busy: confirmBusy,
				testId: "ide-project-confirm-delete",
				onCancel: () => {
					if (!confirmBusy) setConfirmProject(null);
				},
				onConfirm: () => void confirmDeleteProject()
			})
		]
	});
}
var TREE_MENU_WIDTH = 240;
var FILE_MANAGER_LABEL = (() => {
	const platform = typeof navigator === "undefined" ? "" : navigator.userAgent;
	if (/Windows/i.test(platform)) return "Show in Explorer";
	if (/Mac OS X|Macintosh/i.test(platform)) return "Show in Finder";
	return "Show in file manager";
})();
var TREE_MENU_MARGIN = 8;
var EDITOR_LOGOS = {
	code: vscode_default,
	cursor: cursor_default
};
function TreeContextMenu({ x, y, onDismiss, label, kind, busy, sections }) {
	const menuRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const onKeyDown = (event) => {
			if (event.key === "Escape") {
				event.stopPropagation();
				onDismiss();
			}
		};
		const onPointerDown = (event) => {
			const target = event.target;
			if (menuRef.current?.contains(target)) return;
			if (target instanceof Element && target.closest("[data-tree-menu-anchor]")) return;
			onDismiss();
		};
		window.addEventListener("keydown", onKeyDown, true);
		window.addEventListener("pointerdown", onPointerDown, true);
		window.addEventListener("resize", onDismiss);
		window.addEventListener("blur", onDismiss);
		document.addEventListener("scroll", onDismiss, true);
		return () => {
			window.removeEventListener("keydown", onKeyDown, true);
			window.removeEventListener("pointerdown", onPointerDown, true);
			window.removeEventListener("resize", onDismiss);
			window.removeEventListener("blur", onDismiss);
			document.removeEventListener("scroll", onDismiss, true);
		};
	}, [onDismiss]);
	(0, import_react.useLayoutEffect)(() => {
		const node = menuRef.current;
		if (!node) return;
		const { width, height } = node.getBoundingClientRect();
		const maxX = window.innerWidth - width - TREE_MENU_MARGIN;
		const maxY = window.innerHeight - height - TREE_MENU_MARGIN;
		node.style.left = `${Math.max(TREE_MENU_MARGIN, Math.min(x, maxX))}px`;
		node.style.top = `${Math.max(TREE_MENU_MARGIN, Math.min(y, maxY))}px`;
		node.style.visibility = "visible";
		node.querySelector("button:not([disabled])")?.focus();
	}, [x, y]);
	const onMenuKeyDown = (event) => {
		if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
		event.preventDefault();
		const items = Array.from(menuRef.current?.querySelectorAll("button:not([disabled])") ?? []);
		if (!items.length) return;
		items[(items.indexOf(document.activeElement) + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length]?.focus();
	};
	const visibleSections = sections.filter((section) => section.length > 0);
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: menuRef,
		role: "menu",
		"aria-label": `${kind === "workspace" ? "Workspace" : "Project"} actions for ${label}`,
		"data-testid": kind === "workspace" ? "ide-workspace-menu" : "ide-project-menu",
		onKeyDown: onMenuKeyDown,
		style: {
			width: TREE_MENU_WIDTH,
			visibility: "hidden"
		},
		className: "fixed z-[100] overflow-hidden rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-float",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 px-2.5 pb-1.5 pt-1 text-[11px] font-medium text-muted-foreground",
			children: [kind === "workspace" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, {
				"aria-hidden": true,
				className: "h-3 w-3 shrink-0"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 truncate",
				children: label
			})]
		}), visibleSections.map((section, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "group",
			className: index > 0 ? "mt-1 border-t border-border/70 pt-1" : "",
			children: section.map((item) => {
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "menuitem",
					disabled: busy || item.disabled,
					onClick: item.onSelect,
					"data-testid": item.testId,
					className: `flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[13px] transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-45 ${item.destructive ? "text-destructive hover:bg-destructive/10 focus-visible:bg-destructive/10" : "text-foreground hover:bg-muted focus-visible:bg-muted"}`,
					children: [item.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: item.image,
						alt: "",
						"aria-hidden": true,
						draggable: false,
						"data-testid": `${item.testId}-logo`,
						className: `h-4 w-4 shrink-0 object-contain ${item.disabled ? "grayscale" : ""}`
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						"aria-hidden": true,
						className: `h-4 w-4 shrink-0 ${item.destructive ? "" : "text-muted-foreground"}`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex min-w-0 flex-1 flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: item.label
						}), item.hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-[11px] text-muted-foreground",
							children: item.hint
						})]
					})]
				}, item.id);
			})
		}, section[0]?.id ?? index))]
	}), document.body);
}
function ConfirmTreeAction({ title, body, confirmLabel, busy, testId, onCancel, onConfirm }) {
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": title,
		"data-testid": testId,
		className: "fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-6 backdrop-blur-sm",
		onClick: (event) => {
			if (event.target === event.currentTarget && !busy) onCancel();
		},
		onKeyDown: (event) => {
			if (event.key === "Escape" && !busy) onCancel();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm rounded-lg border border-border bg-popover shadow-float p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-base font-semibold text-popover-foreground",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex items-center justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 disabled:opacity-50",
						autoFocus: true,
						disabled: busy,
						onClick: onCancel,
						children: "Keep"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"data-testid": `${testId}-confirm`,
						className: "rounded-lg bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground shadow transition-opacity hover:opacity-90 disabled:opacity-50",
						disabled: busy,
						onClick: onConfirm,
						children: confirmLabel
					})]
				})
			]
		})
	}), document.body);
}
export { IdeProjectTree, resetLauncherCacheForTests };
