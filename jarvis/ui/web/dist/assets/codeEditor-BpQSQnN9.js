import { Ec as create, at as setReloadHold } from "./index-BOzhgzD7.js";
const fileKeyOf = (workspaceId, path) => `${workspaceId}\u0000${path}`;
const tabKeyOf = (mode, fileKey) => `${mode}:${fileKey}`;
const isUnder = (path, root) => path === root || path.startsWith(`${root}/`);
var MAX_CLOSED = 20;
var newFile = (workspaceId, path) => ({
	workspaceId,
	path,
	status: "loading",
	error: "",
	version: null,
	encoding: "utf-8",
	eol: "\n",
	dirty: false,
	deleted: false,
	conflict: null,
	mixedEol: false,
	saving: false
});
function prune(files, tabs) {
	const used = new Set(tabs.map((tab) => tab.fileKey));
	const next = {};
	for (const [key, file] of Object.entries(files)) if (used.has(key)) next[key] = file;
	return next;
}
function successor(own, key, closing) {
	const index = own.findIndex((tab) => tab.key === key);
	const right = own.slice(index + 1).find((tab) => !closing.has(tab.key));
	const left = own.slice(0, Math.max(index, 0)).reverse().find((tab) => !closing.has(tab.key));
	return (right ?? left)?.key ?? null;
}
var revealNonce = 0;
const useCodeEditorStore = create((set, get) => ({
	tabs: [],
	active: {},
	files: {},
	visible: false,
	quickOpen: false,
	cursor: null,
	reveal: null,
	closed: [],
	diffBases: {},
	openFile: (workspaceId, path, options = {}) => {
		const mode = options.mode ?? "edit";
		const preview = options.preview ?? true;
		const fileKey = fileKeyOf(workspaceId, path);
		const key = tabKeyOf(mode, fileKey);
		set((state) => {
			let tabs = state.tabs;
			const existing = tabs.find((tab) => tab.key === key);
			if (existing) {
				if (!preview && existing.preview) tabs = tabs.map((tab) => tab.key === key ? {
					...tab,
					preview: false
				} : tab);
			} else {
				const tab = {
					key,
					fileKey,
					workspaceId,
					path,
					mode,
					preview
				};
				const replaced = tabs.find((entry) => entry.workspaceId === workspaceId && entry.preview && !state.files[entry.fileKey]?.dirty);
				if (replaced) tabs = tabs.map((entry) => entry.key === replaced.key ? tab : entry);
				else {
					const activeKey = state.active[workspaceId];
					const at = activeKey ? tabs.findIndex((entry) => entry.key === activeKey) : -1;
					tabs = at < 0 ? [...tabs, tab] : [
						...tabs.slice(0, at + 1),
						tab,
						...tabs.slice(at + 1)
					];
				}
			}
			const files = state.files[fileKey] ? state.files : {
				...state.files,
				[fileKey]: newFile(workspaceId, path)
			};
			const reveal = options.line != null ? {
				fileKey,
				line: options.line,
				column: options.column ?? 1,
				length: options.length ?? 0,
				nonce: ++revealNonce
			} : state.reveal;
			let diffBases = state.diffBases;
			if (mode === "diff" && diffBases[fileKey]?.ref !== options.base?.ref) {
				diffBases = { ...diffBases };
				if (options.base) diffBases[fileKey] = options.base;
				else delete diffBases[fileKey];
			}
			return {
				tabs,
				files: prune(files, tabs),
				active: {
					...state.active,
					[workspaceId]: key
				},
				visible: true,
				reveal,
				diffBases
			};
		});
	},
	closeTab: (key) => get().closeTabs([key]),
	closeTabs: (keys) => set((state) => {
		const closing = new Set(keys);
		const gone = state.tabs.filter((tab) => closing.has(tab.key));
		if (gone.length === 0) return {};
		const tabs = state.tabs.filter((tab) => !closing.has(tab.key));
		const active = { ...state.active };
		for (const workspaceId of new Set(gone.map((tab) => tab.workspaceId))) {
			const current = active[workspaceId];
			if (!current || !closing.has(current)) continue;
			active[workspaceId] = successor(state.tabs.filter((tab) => tab.workspaceId === workspaceId), current, closing);
		}
		const closed = [...state.closed, ...gone.map(({ workspaceId, path, mode }) => ({
			workspaceId,
			path,
			mode
		}))];
		return {
			tabs,
			active,
			files: prune(state.files, tabs),
			closed: closed.slice(-MAX_CLOSED)
		};
	}),
	activate: (key) => set((state) => {
		const tab = state.tabs.find((entry) => entry.key === key);
		return tab ? {
			active: {
				...state.active,
				[tab.workspaceId]: key
			},
			visible: true
		} : {};
	}),
	pinTab: (key) => set((state) => ({ tabs: state.tabs.map((tab) => tab.key === key && tab.preview ? {
		...tab,
		preview: false
	} : tab) })),
	cycle: (workspaceId, step) => set((state) => {
		const own = state.tabs.filter((tab) => tab.workspaceId === workspaceId);
		if (own.length === 0) return {};
		const next = own[(own.findIndex((tab) => tab.key === state.active[workspaceId]) + step + own.length) % own.length];
		return { active: {
			...state.active,
			[workspaceId]: next.key
		} };
	}),
	reopenClosed: (workspaceId) => {
		const closed = [...get().closed];
		for (let index = closed.length - 1; index >= 0; index -= 1) {
			const entry = closed[index];
			if (entry.workspaceId !== workspaceId) continue;
			closed.splice(index, 1);
			set({ closed });
			get().openFile(entry.workspaceId, entry.path, {
				mode: entry.mode,
				preview: false
			});
			return;
		}
	},
	patchFile: (fileKey, patch) => set((state) => {
		const current = state.files[fileKey];
		if (!current) return {};
		const file = {
			...current,
			...patch
		};
		const tabs = patch.dirty && !current.dirty ? state.tabs.map((tab) => tab.fileKey === fileKey && tab.preview ? {
			...tab,
			preview: false
		} : tab) : state.tabs;
		return {
			files: {
				...state.files,
				[fileKey]: file
			},
			tabs
		};
	}),
	setVisible: (visible) => set({ visible }),
	setQuickOpen: (quickOpen) => set({ quickOpen }),
	setCursor: (cursor) => set({ cursor }),
	renamePath: (workspaceId, from, to) => set((state) => {
		const moved = (path) => isUnder(path, from) ? to + path.slice(from.length) : path;
		const tabs = state.tabs.map((tab) => {
			if (tab.workspaceId !== workspaceId || !isUnder(tab.path, from)) return tab;
			const path = moved(tab.path);
			const fileKey = fileKeyOf(workspaceId, path);
			return {
				...tab,
				path,
				fileKey,
				key: tabKeyOf(tab.mode, fileKey)
			};
		});
		const files = {};
		for (const [key, file] of Object.entries(state.files)) if (file.workspaceId !== workspaceId || !isUnder(file.path, from)) files[key] = file;
		else {
			const path = moved(file.path);
			files[fileKeyOf(workspaceId, path)] = {
				...file,
				path
			};
		}
		const activeKey = state.active[workspaceId];
		const activeTab = activeKey ? state.tabs.findIndex((tab) => tab.key === activeKey) : -1;
		return {
			tabs,
			files,
			active: {
				...state.active,
				[workspaceId]: activeTab >= 0 ? tabs[activeTab].key : activeKey ?? null
			}
		};
	}),
	restoreTabs: (workspaceId, restored, activePath) => set((state) => {
		const known = new Set(state.tabs.map((tab) => tab.key));
		const files = { ...state.files };
		const added = [];
		for (const entry of restored) {
			const fileKey = fileKeyOf(workspaceId, entry.path);
			const key = tabKeyOf(entry.mode, fileKey);
			if (known.has(key)) continue;
			known.add(key);
			added.push({
				key,
				fileKey,
				workspaceId,
				path: entry.path,
				mode: entry.mode,
				preview: entry.preview
			});
			files[fileKey] ??= newFile(workspaceId, entry.path);
		}
		if (added.length === 0) return {};
		const tabs = [...state.tabs, ...added];
		const activeKey = state.active[workspaceId] ?? added.find((tab) => tab.path === activePath && tab.mode === "edit")?.key ?? added.find((tab) => tab.path === activePath)?.key ?? added[0].key;
		return {
			tabs,
			files,
			active: {
				...state.active,
				[workspaceId]: activeKey
			}
		};
	}),
	markDeleted: (workspaceId, path) => set((state) => {
		const files = { ...state.files };
		for (const [key, file] of Object.entries(files)) if (file.workspaceId === workspaceId && isUnder(file.path, path)) files[key] = {
			...file,
			deleted: true,
			version: null
		};
		return { files };
	})
}));
function tabsOf(state, workspaceId) {
	return workspaceId ? state.tabs.filter((tab) => tab.workspaceId === workspaceId) : [];
}
useCodeEditorStore.subscribe((state) => {
	setReloadHold("code-editor", Object.values(state.files).some((file) => file.dirty));
});
export { useCodeEditorStore as i, isUnder as n, tabsOf as r, fileKeyOf as t };
