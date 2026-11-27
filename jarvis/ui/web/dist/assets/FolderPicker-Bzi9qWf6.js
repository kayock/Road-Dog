import { t as Check } from "./check-vbwKkbPq.js";
import { t as ChevronRight } from "./chevron-right-BjVJ-R2c.js";
import { t as CornerDownLeft } from "./corner-down-left-BPT1dXdi.js";
import { t as EyeOff } from "./eye-off-DCMC9NUY.js";
import { n as FolderGit2, t as FolderPlus } from "./folder-plus-UScdmfu2.js";
import { t as Folder } from "./folder-Dd9IlgL2.js";
import { t as History } from "./history-BYrKpufo.js";
import { t as Monitor } from "./monitor-o-ftCNdT.js";
import { t as Pencil } from "./pencil-CD-5mlhp.js";
import { Bc as require_jsx_runtime, Bi as Eye, Fo as searchFolders, Ln as cn, Mo as resolveDroppedFolder, Os as useDragSessionEnd, Ri as FolderOpen, Xc as require_react, Ya as createFolder, Za as fetchFolders, gi as Search, ji as LoaderCircle, mo as forgetRecent, na as createLucideIcon, oo as fetchRecents, ro as fetchNativePickerSupport, si as X, tl as __toESM, yi as RefreshCw, yo as openNativePicker } from "./index-BOzhgzD7.js";
import { n as waitForNativeDrop } from "./nativeDrop-E5gNhPP6.js";
import { a as SectionLabel, i as IconButton, r as Field, t as Button } from "./controls-3r-tbmGH.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CornerLeftUp = createLucideIcon("CornerLeftUp", [["polyline", {
	points: "14 9 9 4 4 9",
	key: "m9oyvo"
}], ["path", {
	d: "M20 20h-7a4 4 0 0 1-4-4V4",
	key: "1blwi3"
}]]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var SEARCH_MIN = 2;
var SEARCH_DEBOUNCE_MS = 250;
var CRUMBS_MAX = 4;
function extractDropPayload(dt) {
	if (!dt) return {};
	const out = {};
	const uri = dt.getData("text/uri-list") || dt.getData("text/plain");
	if (uri) {
		const first = uri.split(/[\r\n]+/).find((line) => line.trim().length > 0);
		if (first) out.path = first.trim();
	}
	const items = dt.items ? Array.from(dt.items) : [];
	for (const item of items) {
		const getAsEntry = item.webkitGetAsEntry;
		const entry = typeof getAsEntry === "function" ? getAsEntry.call(item) : null;
		if (entry?.isDirectory && entry.name) {
			out.name = entry.name;
			break;
		}
	}
	if (!out.name && dt.files && dt.files.length > 0) {
		const rel = dt.files[0].webkitRelativePath;
		if (rel && rel.includes("/")) out.name = rel.split("/")[0];
	}
	return out;
}
function FolderPicker({ selected, onSelect, onSelectRecent, showSelection = true, className }) {
	const [path, setPath] = (0, import_react.useState)(null);
	const [parent, setParent] = (0, import_react.useState)(null);
	const [entries, setEntries] = (0, import_react.useState)([]);
	const [deviceName, setDeviceName] = (0, import_react.useState)("");
	const [home, setHome] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	const [searchHits, setSearchHits] = (0, import_react.useState)(null);
	const [searching, setSearching] = (0, import_react.useState)(false);
	const [recents, setRecents] = (0, import_react.useState)([]);
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	const [dropNote, setDropNote] = (0, import_react.useState)(null);
	const [dropChoices, setDropChoices] = (0, import_react.useState)([]);
	const dragDepth = (0, import_react.useRef)(0);
	const [nativePicker, setNativePicker] = (0, import_react.useState)(null);
	const [nativeOpen, setNativeOpen] = (0, import_react.useState)(false);
	const [nativeNote, setNativeNote] = (0, import_react.useState)(null);
	const [showHidden, setShowHidden] = (0, import_react.useState)(false);
	const showHiddenRef = (0, import_react.useRef)(showHidden);
	showHiddenRef.current = showHidden;
	const [pathLeaf, setPathLeaf] = (0, import_react.useState)(null);
	const [createOffer, setCreateOffer] = (0, import_react.useState)(null);
	const [naming, setNaming] = (0, import_react.useState)(false);
	const [newName, setNewName] = (0, import_react.useState)("");
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [createNote, setCreateNote] = (0, import_react.useState)(null);
	const [editingPath, setEditingPath] = (0, import_react.useState)(false);
	const onSelectRef = (0, import_react.useRef)(onSelect);
	onSelectRef.current = onSelect;
	const load = (0, import_react.useCallback)(async (target, hidden) => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetchFolders(target, hidden ?? showHiddenRef.current);
			setPath(res.path);
			setParent(res.parent);
			setEntries(res.entries);
			if (res.device_name) setDeviceName(res.device_name);
			if (target === null) {
				const homeEntry = res.entries.find((e) => e.name === "Home");
				if (homeEntry) setHome(homeEntry.path);
			}
			if (res.error) setError(res.error);
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load(null);
		fetchRecents().then((res) => {
			setRecents(res.recents);
			if (res.device_name) setDeviceName(res.device_name);
		}).catch(() => {});
		fetchNativePickerSupport().then(setNativePicker).catch(() => {
			setNativePicker({ available: false });
		});
	}, [load]);
	const navigate = (target) => {
		if (target) onSelect(target);
		setQuery("");
		setSearchHits(null);
		setPathLeaf(null);
		setCreateOffer(null);
		setEditingPath(false);
		load(target);
	};
	const browseNatively = () => {
		if (nativeOpen) return;
		setNativeOpen(true);
		setNativeNote(null);
		openNativePicker(selected ?? path).then((res) => {
			if (res.path) navigate(res.path);
			else if (res.error) setNativeNote(res.error);
		}).catch((e) => setNativeNote(e.message)).finally(() => setNativeOpen(false));
	};
	const goToTypedPath = (0, import_react.useCallback)((typed) => {
		const { dir, leaf } = splitTypedPath(typed);
		const hidden = showHiddenRef.current || leaf.startsWith(".");
		return fetchFolders(typed, hidden).then(async (res) => {
			if (res.device_name) setDeviceName(res.device_name);
			if (!res.error) {
				setPath(res.path);
				setParent(res.parent);
				setEntries(res.entries);
				setPathLeaf(null);
				setCreateOffer(null);
				setError(null);
				if (res.path) onSelectRef.current(res.path);
				return;
			}
			if (!dir || !leaf) {
				setError(res.error);
				setPathLeaf(null);
				setCreateOffer(null);
				return;
			}
			const above = await fetchFolders(dir, hidden);
			if (above.error) {
				setError(above.error);
				setPathLeaf(null);
				setCreateOffer(null);
				return;
			}
			setPath(above.path);
			setParent(above.parent);
			setEntries(above.entries);
			setError(null);
			setPathLeaf(leaf);
			setCreateOffer({
				parent: above.path,
				name: leaf
			});
		});
	}, []);
	(0, import_react.useEffect)(() => {
		const typed = normalizeTypedPath(query);
		if (looksLikePath(typed)) {
			setSearchHits(null);
			setSearching(true);
			const handle$1 = window.setTimeout(() => {
				goToTypedPath(typed).catch((e) => setError(e.message)).finally(() => setSearching(false));
			}, SEARCH_DEBOUNCE_MS);
			return () => window.clearTimeout(handle$1);
		}
		setPathLeaf(null);
		setCreateOffer(null);
		const trimmed = query.trim();
		if (trimmed.length < SEARCH_MIN) {
			setSearchHits(null);
			setSearching(false);
			return;
		}
		setSearching(true);
		const handle = window.setTimeout(() => {
			searchFolders(trimmed).then((res) => setSearchHits(res.entries)).catch(() => setSearchHits([])).finally(() => setSearching(false));
		}, SEARCH_DEBOUNCE_MS);
		return () => window.clearTimeout(handle);
	}, [query, goToTypedPath]);
	const needle = looksLikePath(normalizeTypedPath(query)) ? "" : query.trim().toLowerCase();
	const visible = (0, import_react.useMemo)(() => {
		if (searchHits !== null) return searchHits;
		if (pathLeaf !== null) {
			const leafNeedle = pathLeaf.toLowerCase();
			return entries.filter((e) => e.name.toLowerCase().startsWith(leafNeedle));
		}
		if (!needle) return entries;
		return entries.filter((e) => e.name.toLowerCase().includes(needle));
	}, [
		entries,
		needle,
		searchHits,
		pathLeaf
	]);
	const searchingMachine = searchHits !== null;
	const atStart = path === null && pathLeaf === null && !searchingMachine;
	const visibleRecents = (0, import_react.useMemo)(() => atStart ? recents.filter((r) => !needle || r.name.toLowerCase().includes(needle) || r.path.toLowerCase().includes(needle)) : [], [
		atStart,
		recents,
		needle
	]);
	const makeFolder = (parent$1, name) => {
		if (creating) return;
		setCreating(true);
		setCreateNote(null);
		createFolder({
			parent: parent$1,
			name
		}).then((res) => {
			if (res.error || !res.folder) {
				setCreateNote(res.error || "Could not create that folder.");
				return;
			}
			setNaming(false);
			setNewName("");
			setError(null);
			navigate(res.folder.path);
		}).catch((e) => setCreateNote(e.message)).finally(() => setCreating(false));
	};
	const toggleHidden = () => {
		const next = !showHidden;
		setShowHidden(next);
		showHiddenRef.current = next;
		if (searchHits === null) load(path, next);
	};
	const usePath = (raw) => {
		const value = raw.trim();
		if (!value) return Promise.resolve(false);
		setLoading(true);
		setError(null);
		const { dir, leaf } = splitTypedPath(value);
		return fetchFolders(value, showHiddenRef.current || leaf.startsWith(".")).then((res) => {
			if (res.device_name) setDeviceName(res.device_name);
			if (res.error) {
				setError(res.error);
				setCreateOffer(dir && leaf ? {
					parent: dir,
					name: leaf
				} : null);
				return false;
			}
			setPath(res.path);
			setParent(res.parent);
			setEntries(res.entries);
			setCreateOffer(null);
			setPathLeaf(null);
			onSelect(res.path ?? value);
			return true;
		}).catch((e) => {
			setError(e.message);
			return false;
		}).finally(() => setLoading(false));
	};
	const pickRecent = (recent) => {
		navigate(recent.path);
		onSelectRecent?.(recent);
	};
	const onDrop = (event) => {
		event.preventDefault();
		dragDepth.current = 0;
		setDragOver(false);
		setDropChoices([]);
		const payload = extractDropPayload(event.dataTransfer);
		if (!payload.path && !payload.name) {
			setDropNote("That was not a folder. Drop a folder here, or pick one from the list.");
			return;
		}
		setDropNote("Finding the folder you dropped…");
		(payload.path ? Promise.resolve(null) : waitForNativeDrop({ name: payload.name })).then((native) => resolveDroppedFolder(native?.paths[0] ? { path: native.paths[0] } : payload)).then((res) => {
			if (res.resolved) {
				setDropNote(res.detail || null);
				navigate(res.resolved);
			} else {
				setDropChoices(res.candidates);
				setDropNote(res.detail || "Could not find that folder.");
			}
		}).catch((e) => setDropNote(e.message));
	};
	useDragSessionEnd(dragOver, (0, import_react.useCallback)(() => {
		dragDepth.current = 0;
		setDragOver(false);
	}, []));
	const pathExample = home ? joinPath(home, "my-project") : null;
	const machine = deviceName || "This machine";
	const crumbs = path ? foldCrumbs(pathCrumbs(path)) : [];
	const listLabel = searchingMachine ? null : pathLeaf !== null ? `Folders starting with “${pathLeaf}”` : path ? `Folders in ${leafName(path)}` : "Places";
	const hasMessages = Boolean(error || nativeNote || dropNote || createNote);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		onDragEnter: (e) => {
			e.preventDefault();
			dragDepth.current += 1;
			setDragOver(true);
		},
		onDragOver: (e) => {
			e.preventDefault();
			e.dataTransfer.dropEffect = "copy";
		},
		onDragLeave: (e) => {
			e.preventDefault();
			dragDepth.current = Math.max(0, dragDepth.current - 1);
			if (dragDepth.current === 0) setDragOver(false);
		},
		onDrop,
		"data-testid": "folder-drop-zone",
		className: cn("relative flex min-h-0 flex-1 flex-col p-3", className),
		children: [
			dragOver && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center gap-2 rounded-surface border-2 border-dashed border-primary/60 bg-background/95",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "h-8 w-8 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium text-foreground",
					children: "Drop to choose this folder"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-0 flex-1",
						children: [
							searching ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: "Search by name or paste a path",
								"aria-label": "Search folders by name, or paste a path",
								"data-testid": "folder-search",
								"data-autofocus": true,
								className: "h-9 w-full pl-9 pr-8",
								spellCheck: false,
								autoComplete: "off"
							}),
							query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
								size: "sm",
								label: "Clear search",
								onClick: () => setQuery(""),
								className: "absolute right-1.5 top-1/2 -translate-y-1/2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
							})
						]
					}),
					nativePicker?.available && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: browseNatively,
						disabled: nativeOpen,
						"data-testid": "native-browse",
						title: "Choose the folder in this computer's own folder window",
						className: "h-9",
						children: [nativeOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "h-4 w-4" }), nativeOpen ? "Window open…" : "Browse…"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => {
							setNaming(true);
							setNewName("");
							setCreateNote(null);
						},
						disabled: naming,
						"data-testid": "new-folder",
						title: `Make a new folder in ${path ?? "your home folder"}`,
						className: "h-9",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPlus, { className: "h-4 w-4" }), "New folder"]
					})
				]
			}),
			nativeOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-primary",
				role: "status",
				children: "A folder window has opened. Choose your folder there. If you cannot see it, it is behind this window or in the taskbar."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex min-h-0 flex-1 flex-col rounded-surface border border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex h-10 shrink-0 items-center gap-0.5 rounded-t-surface border-b border-border bg-secondary/40 px-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
								label: "Go up one folder",
								onClick: () => navigate(parent),
								disabled: loading || searchingMachine || path === null,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerLeftUp, { className: "h-4 w-4" })
							}),
							editingPath ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PathInput, {
								base: path,
								initial: path ? withTrailingSeparator(path) : "",
								showHidden,
								onUse: (value) => usePath(value).then((ok) => {
									if (ok) setEditingPath(false);
								}),
								onCancel: () => setEditingPath(false)
							}) : searchingMachine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 flex-1 truncate px-2 text-xs text-muted-foreground",
								children: visible.length === 0 && !searching ? `Nothing on ${machine} is called “${query.trim()}”` : `Folders called “${query.trim()}” anywhere on ${machine}`
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
								"aria-label": "Folder path",
								className: "flex h-full min-w-0 flex-1 items-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => navigate(null),
										title: `Start: recent folders and places on ${machine}`,
										"aria-current": path === null ? "location" : void 0,
										className: cn(CRUMB, "max-w-[11rem] shrink", path === null && "font-medium text-foreground"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate",
											children: machine
										})]
									}),
									crumbs.map((crumb, index) => {
										const last = index === crumbs.length - 1;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground/60" }), crumb.path === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setEditingPath(true),
											title: `${crumb.hidden}\nClick to see and edit the whole path`,
											"aria-label": "Show the whole path",
											className: cn(CRUMB, "shrink-0"),
											children: "…"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => navigate(crumb.path),
											title: crumb.path,
											"aria-current": last ? "location" : void 0,
											className: cn(CRUMB, "min-w-[2.5rem] max-w-[12rem] shrink", last && "font-medium text-foreground"),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate",
												children: crumb.label
											})
										})] }, crumb.path ?? `fold-${index}`);
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										tabIndex: -1,
										"aria-hidden": "true",
										onClick: () => setEditingPath(true),
										className: "h-full min-w-4 flex-1 cursor-text"
									})
								]
							}),
							!editingPath && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
								label: "Type a path",
								title: "Type or paste a path — Tab completes folder names",
								onClick: () => setEditingPath(true),
								"data-testid": "edit-path",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
								label: showHidden ? "Hide hidden folders" : "Show hidden folders",
								title: showHidden ? "Hidden folders (names starting with a dot) are shown" : "Also list hidden folders — names starting with a dot",
								"aria-pressed": showHidden,
								onClick: toggleHidden,
								disabled: loading,
								"data-testid": "toggle-hidden",
								className: cn(showHidden && "text-primary"),
								children: showHidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
								label: "Reload this folder",
								onClick: () => void load(path),
								disabled: loading,
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" })
							})
						]
					}),
					naming && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						"data-testid": "new-folder-form",
						"data-escape-local": true,
						className: "shrink-0 border-b border-border px-3 py-2.5",
						onSubmit: (e) => {
							e.preventDefault();
							if (newName.trim()) makeFolder(path, newName);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPlus, { className: "h-4 w-4 shrink-0 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									autoFocus: true,
									value: newName,
									onChange: (e) => setNewName(e.target.value),
									onKeyDown: (e) => {
										if (e.key === "Escape") {
											setNaming(false);
											setCreateNote(null);
										}
									},
									placeholder: "Name of the new folder",
									"aria-label": "Name of the new folder",
									"data-testid": "new-folder-name",
									className: "min-w-0 flex-1",
									spellCheck: false,
									autoComplete: "off"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									variant: "primary",
									disabled: creating || !newName.trim(),
									"data-testid": "new-folder-create",
									children: [creating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), "Create"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
									label: "Cancel new folder",
									onClick: () => {
										setNaming(false);
										setCreateNote(null);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1.5 truncate pl-6 text-xs text-muted-foreground",
							children: [
								"Created in",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono",
									children: path ?? "your home folder"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-h-[14rem] flex-1 overflow-y-auto scrollbar-jarvis p-1.5",
						children: [
							visibleRecents.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								"aria-label": "Recent folders",
								className: "pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupLabel, { children: "Recent folders" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: visibleRecents.map((recent) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "group/row relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => pickRecent(recent),
										title: recent.path,
										className: cn(ROW, "pr-9", selected === recent.path ? "bg-primary/10" : "hover:bg-secondary"),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
												"data-testid": "recent-folder-icon",
												className: "h-4 w-4 shrink-0 text-muted-foreground"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "min-w-0 flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "block truncate font-medium",
													children: recent.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "block truncate font-mono text-micro text-muted-foreground",
													children: recent.path
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "shrink-0 text-right text-micro text-muted-foreground",
												children: [lastUsedLabel(recent.last_used), onSelectRecent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "block tabular-nums",
													children: [
														recent.terminals,
														" ",
														recent.terminals === 1 ? "terminal" : "terminals"
													]
												})]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
										size: "sm",
										label: `Forget ${recent.name}`,
										title: "Remove from this list (the folder itself stays)",
										onClick: (e) => {
											e.stopPropagation();
											setRecents((prev) => prev.filter((r) => r.path !== recent.path));
											forgetRecent(recent.path).catch(() => {});
										},
										className: "absolute right-2 top-1/2 -translate-y-1/2 opacity-0 focus-visible:opacity-100 group-hover/row:opacity-100",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
									})]
								}, recent.path)) })]
							}),
							createOffer && pathLeaf !== null && visible.length === 0 && !searching && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"data-testid": "create-offer",
								onClick: () => makeFolder(createOffer.parent, createOffer.name),
								disabled: creating,
								className: cn(ROW, "text-primary hover:bg-secondary"),
								children: [creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 shrink-0 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPlus, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block truncate",
										children: [
											"Create folder “",
											createOffer.name,
											"”"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block truncate font-mono text-micro text-muted-foreground",
										children: ["in ", createOffer.parent ?? "your home folder"]
									})]
								})]
							}),
							listLabel && visible.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupLabel, { children: listLabel }),
							visible.length === 0 && !loading && !searching ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-2.5 py-6 text-center text-sm text-muted-foreground",
								children: searchingMachine ? `No folder with that name was found.${pathExample ? ` To open one by where it is, type its full path — like ${pathExample}.` : ""}` : pathLeaf !== null ? `No folder here starts with “${pathLeaf}”.` : needle ? `No folder here matches “${query.trim()}”. Keep typing to search the whole machine.` : path ? "This folder has no folders inside. You can choose it as it is, or make a new folder in it." : "Nothing to list here — search above, drop a folder, or type its path."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: visible.map((item) => {
								const isSelected = selected === item.path;
								const Icon = item.is_repo ? FolderGit2 : Folder;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => navigate(item.path),
									title: item.path,
									className: cn(ROW, "group/item", isSelected ? "bg-primary/10" : "hover:bg-secondary"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("h-4 w-4 shrink-0", isSelected ? "text-primary" : "text-muted-foreground") }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("block truncate", isSelected && "font-medium text-primary"),
												children: item.name
											}), searchingMachine && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block truncate font-mono text-micro text-muted-foreground",
												children: item.path
											})]
										}),
										item.is_repo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "shrink-0 rounded border border-border px-1.5 font-mono text-micro text-muted-foreground",
											children: "git"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/item:opacity-100" })
									]
								}) }, item.path);
							}) })
						]
					})
				]
			}),
			showSelection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectedFolder, { selected }),
			hasMessages ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 space-y-1.5",
				children: [
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-control border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs",
						role: "alert",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-destructive",
								children: error
							}),
							pathExample && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 text-muted-foreground",
								children: [
									"A full path on this machine looks like",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "font-mono",
										children: pathExample
									}),
									"."
								]
							}),
							createOffer && pathLeaf === null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => makeFolder(createOffer.parent, createOffer.name),
								disabled: creating,
								"data-testid": "create-offer",
								className: "mt-2 h-7 text-xs",
								children: [
									creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPlus, { className: "h-3.5 w-3.5" }),
									"Create folder “",
									createOffer.name,
									"”"
								]
							})
						]
					}),
					createNote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-destructive",
						role: "alert",
						children: createNote
					}),
					nativeNote && !nativeOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						role: "alert",
						children: nativeNote
					}),
					dropNote && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: dropNote
					}), dropChoices.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: dropChoices.map((choice) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setDropNote(null);
							setDropChoices([]);
							navigate(choice.path);
						},
						className: "flex w-full items-center gap-2 rounded-control px-1.5 py-1 text-left text-xs hover:bg-secondary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "min-w-0 truncate font-mono",
							children: choice.path
						})]
					}) }, choice.path)) })] })
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: "Tip: you can also drag a folder here from your file manager."
			})
		]
	});
}
var CRUMB = "inline-flex h-7 min-w-0 items-center gap-1.5 rounded-control px-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60";
var ROW = "flex min-h-9 w-full items-center gap-3 rounded-control px-2.5 py-1.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60";
function GroupLabel({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-2.5 pb-1 pt-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children })
	});
}
function SelectedFolder({ selected }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-testid": "folder-selection",
		role: "status",
		"aria-live": "polite",
		className: cn("mt-3 flex min-h-[3.25rem] shrink-0 items-center gap-3 rounded-surface border px-3 py-2", selected ? "border-primary/40 bg-primary/5" : "border-dashed border-border"),
		children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				className: "h-3.5 w-3.5",
				strokeWidth: 3
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "block truncate text-sm font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Chosen folder: "
				}), leafName(selected)]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate font-mono text-micro text-muted-foreground",
				title: selected,
				children: selected
			})]
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { className: "h-4 w-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-muted-foreground",
			children: "No folder chosen yet. Open a folder in the list to choose it."
		})] })
	});
}
function splitTypedPath(value) {
	const cut = Math.max(value.lastIndexOf("/"), value.lastIndexOf("\\"));
	if (cut < 0) return {
		dir: "",
		leaf: value
	};
	return {
		dir: value.slice(0, cut + 1),
		leaf: value.slice(cut + 1)
	};
}
function separatorOf(fullPath) {
	return fullPath.includes("\\") ? "\\" : "/";
}
function joinPath(base, name) {
	const sep = separatorOf(base);
	return base.endsWith(sep) ? `${base}${name}` : `${base}${sep}${name}`;
}
function withTrailingSeparator(fullPath) {
	return /[\\/]$/.test(fullPath) ? fullPath : `${fullPath}${separatorOf(fullPath)}`;
}
function leafName(fullPath) {
	return fullPath.replace(/[\\/]+$/, "").split(/[\\/]/).pop() || fullPath;
}
function pathCrumbs(fullPath) {
	const sep = separatorOf(fullPath);
	let root = "";
	let rest = fullPath;
	const unc = fullPath.match(/^([\\/]{2}[^\\/]+[\\/]+[^\\/]+)[\\/]*(.*)$/);
	const drive = fullPath.match(/^([a-zA-Z]:)[\\/]*(.*)$/);
	if (unc) {
		root = unc[1];
		rest = unc[2];
	} else if (drive) {
		root = `${drive[1]}${sep}`;
		rest = drive[2];
	} else if (/^[\\/]/.test(fullPath)) {
		root = sep;
		rest = fullPath.replace(/^[\\/]+/, "");
	}
	const crumbs = [];
	if (root) crumbs.push({
		label: root === sep ? sep : root.replace(/[\\/]+$/, ""),
		path: root
	});
	let acc = root;
	for (const part of rest.split(/[\\/]+/).filter(Boolean)) {
		acc = acc ? joinPath(acc, part) : part;
		crumbs.push({
			label: part,
			path: acc
		});
	}
	return crumbs;
}
function foldCrumbs(crumbs) {
	if (crumbs.length <= CRUMBS_MAX) return crumbs;
	const folded = crumbs.slice(1, -2);
	return [
		crumbs[0],
		{
			label: "…",
			path: null,
			hidden: folded[folded.length - 1].path
		},
		...crumbs.slice(-2)
	];
}
function lastUsedLabel(lastUsed, now = Date.now()) {
	if (!lastUsed || !Number.isFinite(lastUsed)) return "";
	const ms = lastUsed > 0xe8d4a51000 ? lastUsed : lastUsed * 1e3;
	const dayStart = (t) => {
		const d = new Date(t);
		d.setHours(0, 0, 0, 0);
		return d.getTime();
	};
	const days = Math.round((dayStart(now) - dayStart(ms)) / 864e5);
	if (days <= 0) return "Today";
	if (days === 1) return "Yesterday";
	if (days < 7) return `${days} days ago`;
	if (days < 30) {
		const weeks = Math.floor(days / 7);
		return weeks === 1 ? "Last week" : `${weeks} weeks ago`;
	}
	return new Date(ms).toLocaleDateString(void 0, {
		day: "numeric",
		month: "short",
		year: days > 300 ? "numeric" : void 0
	});
}
function normalizeTypedPath(raw) {
	let value = raw.trim();
	value = value.replace(/^cd(?:\s+\/d)?(?:\s+|$)/i, "").trim();
	value = value.replace(/^PS\s+/, "").replace(/\s*>$/, "").trim();
	const quoted = value.match(/^(["'])(.*)\1$/);
	if (quoted) value = quoted[2].trim();
	return value;
}
function isAbsolutePath(value) {
	return /^(?:[a-zA-Z]:[\\/]|[\\/]|~)/.test(value);
}
function looksLikePath(value) {
	return isAbsolutePath(value) || /[\\/]/.test(value);
}
function resolveTypedPath(raw, base) {
	const typed = normalizeTypedPath(raw);
	if (!typed) return "";
	if (isAbsolutePath(typed) || !base) return typed;
	return joinPath(base, typed);
}
function PathInput({ base, initial, showHidden, onUse, onCancel }) {
	const [value, setValue] = (0, import_react.useState)(initial);
	const [options, setOptions] = (0, import_react.useState)([]);
	const [active, setActive] = (0, import_react.useState)(-1);
	const [open, setOpen] = (0, import_react.useState)(true);
	const inputRef = (0, import_react.useRef)(null);
	const { dir, leaf } = splitTypedPath(normalizeTypedPath(value));
	const lookupDir = dir ? isAbsolutePath(dir) || !base ? dir : joinPath(base, dir) : base || "";
	(0, import_react.useEffect)(() => {
		const input = inputRef.current;
		if (!input) return;
		input.focus();
		input.setSelectionRange(input.value.length, input.value.length);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!value.trim() && !base) {
			setOptions([]);
			return;
		}
		let cancelled = false;
		const handle = window.setTimeout(() => {
			fetchFolders(lookupDir || null, showHidden || leaf.startsWith(".")).then((res) => {
				if (cancelled) return;
				const needle = leaf.toLowerCase();
				setOptions(res.entries.filter((e) => !needle || e.name.toLowerCase().startsWith(needle)));
				setActive(-1);
			}).catch(() => {
				if (!cancelled) setOptions([]);
			});
		}, 160);
		return () => {
			cancelled = true;
			window.clearTimeout(handle);
		};
	}, [
		lookupDir,
		leaf,
		value,
		base,
		showHidden
	]);
	const complete = (item) => {
		setValue(`${item.path}${separatorOf(item.path)}`);
		setActive(-1);
		setOpen(true);
	};
	const submit = () => {
		if (active >= 0 && options[active]) onUse(options[active].path);
		else {
			const absolute = resolveTypedPath(value, base);
			if (absolute) onUse(absolute);
		}
		setOpen(false);
	};
	const onKeyDown = (e) => {
		if (e.key === "Tab" && options.length > 0) {
			e.preventDefault();
			complete(options[active >= 0 ? active : 0]);
			return;
		}
		if (e.key === "ArrowDown" && options.length > 0) {
			e.preventDefault();
			setOpen(true);
			setActive((prev) => (prev + 1) % options.length);
			return;
		}
		if (e.key === "ArrowUp" && options.length > 0) {
			e.preventDefault();
			setOpen(true);
			setActive((prev) => prev <= 0 ? options.length - 1 : prev - 1);
			return;
		}
		if (e.key === "Enter") {
			e.preventDefault();
			submit();
			return;
		}
		if (e.key === "Escape") {
			e.preventDefault();
			if (open && options.length > 0) setOpen(false);
			else onCancel();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-w-0 flex-1",
		"data-escape-local": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				ref: inputRef,
				value,
				onChange: (e) => {
					setValue(e.target.value);
					setOpen(true);
				},
				onKeyDown,
				onBlur: () => window.setTimeout(() => {
					if (document.activeElement !== inputRef.current) onCancel();
				}, 150),
				placeholder: "Type a path — Tab completes folder names",
				"aria-label": "Folder path",
				"data-testid": "folder-path-input",
				className: "h-8 w-full pr-8 font-mono text-xs",
				spellCheck: false,
				autoComplete: "off"
			}),
			value.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
				size: "sm",
				label: "Go to this path",
				onMouseDown: (e) => e.preventDefault(),
				onClick: submit,
				className: "absolute right-1 top-1/2 -translate-y-1/2 text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerDownLeft, { className: "h-3.5 w-3.5" })
			}),
			open && options.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				"data-testid": "path-suggestions",
				className: "absolute left-0 right-0 top-full z-30 mt-1.5 max-h-56 overflow-y-auto scrollbar-jarvis rounded-control border border-border bg-popover p-1 shadow-lg",
				children: options.slice(0, 40).map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onMouseDown: (e) => e.preventDefault(),
					onClick: () => complete(item),
					className: cn("flex w-full items-center gap-2 rounded-control px-2 py-1.5 text-left text-xs", index === active ? "bg-primary/15" : "hover:bg-secondary"),
					children: [item.is_repo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderGit2, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate font-mono",
						children: item.name
					})]
				}) }, item.path))
			})
		]
	});
}
export { lastUsedLabel as a, normalizeTypedPath as c, separatorOf as d, splitTypedPath as f, joinPath as i, pathCrumbs as l, extractDropPayload as n, leafName as o, isAbsolutePath as r, looksLikePath as s, FolderPicker as t, resolveTypedPath as u };
