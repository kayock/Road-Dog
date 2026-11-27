import { t as PenLine } from "./pen-line-BkOUczC3.js";
import { t as Play } from "./play-B4Hl_QRo.js";
import { B as startNativeFileDrag, Bc as require_jsx_runtime, Cn as Portal, Hs as useAppshotEditor, Li as GripVertical, Ln as cn, Ps as setWorkspaceDragPaths, Sn as Overlay, Tn as Title, Ui as Download, Xc as require_react, bn as Content, di as Square, ji as LoaderCircle, ln as Button, na as createLucideIcon, nc as useLocaleChunk, oc as useT, si as X, tl as __toESM, ui as Trash2, wc as useEventStore, wn as Root, yn as Close, z as canNativeDrag } from "./index-BOzhgzD7.js";
import "./useHotkey-DslvxXH_.js";
import "./combobox-BL3mwl7r.js";
import { t as BrandedSelect } from "./select-vogX_D37.js";
import { t as Switch } from "./switch-hmH-TV55.js";
import { S as requestRecordingPermission, T as takeAppshot, _ as forgetAppshots, a as appshotLibraryImageUrl, b as openAppshotEditorWindow, c as clearAppshotLibrary, f as fetchAppshotLibrary, h as fetchLatestAppshot, i as appshotLibraryFileName, l as controlAppshotRecording, m as fetchAppshotSettings, n as KEEP_NEWEST_CHOICES, p as fetchAppshotRecording, t as CARD_SECONDS_CHOICES, u as deleteAppshotLibraryItem, v as formatAppshotHotkey, w as saveAppshotSettings, x as openAppshotLibraryItem, y as latestAppshotImageUrl } from "./appshotApi-Dd25bfhQ.js";
import { t as QuickTooltip } from "./tooltip-R5sCoxZW.js";
import { t as PageHeader } from "./PageHeader-DcwsywY0.js";
import { n as gestureFamily, t as AppshotShortcutField } from "./AppshotShortcutField-huuNLu2A.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Video = createLucideIcon("Video", [["path", {
	d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
	key: "ftymec"
}], ["rect", {
	x: "2",
	y: "6",
	width: "14",
	height: "12",
	rx: "2",
	key: "158x01"
}]]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function isWindowsRoot(root) {
	return /^[a-zA-Z]:[\\/]/.test(root) || root.startsWith("\\\\");
}
function absoluteWorkspacePath(root, path) {
	const base = root.replace(/[\\/]+$/, "");
	const relative = path;
	if (!base) return "";
	if (!relative) return root;
	return isWindowsRoot(base) ? `${base}\\${relative.replace(/\//g, "\\")}` : `${base}/${relative}`;
}
function workspaceFileUri(absolute) {
	const posix = isWindowsRoot(absolute) ? absolute.replace(/\\/g, "/") : absolute;
	const encoded = posix.split("/").map((segment) => encodeURIComponent(segment)).join("/").replace(/^([A-Za-z])%3A/, "$1:");
	if (posix.startsWith("//")) return `file:${encoded}`;
	return `file:///${encoded.replace(/^\/+/, "")}`;
}
function setWorkspaceEntryDrag(dt, entry) {
	const absolute = absoluteWorkspacePath(entry.root, entry.path);
	if (!absolute) return false;
	if (!setWorkspaceDragPaths(dt, [absolute])) return false;
	dt.setData("text/uri-list", workspaceFileUri(absolute));
	dt.setData("text/plain", absolute);
	dt.effectAllowed = "copy";
	return true;
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function AppshotRecordingPlayer({ item, onClose }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		open: item !== null,
		onOpenChange: (open) => {
			if (!open) onClose();
		},
		children: item && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 z-[90] bg-scrim/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
			className: "fixed left-1/2 top-1/2 z-[91] flex max-h-[90vh] w-[min(90vw,64rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-xl border border-border bg-card p-5 text-foreground shadow-2xl",
			"aria-describedby": void 0,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					className: "pr-9 text-base font-medium",
					children: t("appshots.recording_title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
					className: "absolute right-4 top-4 rounded-md p-1 text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-border-strong",
					"aria-label": t("appshot_editor.close"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						className: "h-5 w-5",
						"aria-hidden": true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: appshotLibraryImageUrl(item),
					controls: true,
					preload: "metadata",
					poster: appshotLibraryImageUrl(item, true),
					className: "min-h-0 w-full flex-1 rounded-lg bg-secondary object-contain",
					"aria-label": t("appshots.recording_title"),
					"data-testid": "appshot-library-player"
				}, item.id),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: appshotLibraryImageUrl(item),
					download: appshotLibraryFileName(item),
					className: "inline-flex items-center gap-2 self-start text-sm underline underline-offset-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
						className: "h-4 w-4",
						"aria-hidden": true
					}), t("appshots.recording_download")]
				})
			]
		})] })
	});
}
var ROWS = 2;
var PAGE = 48;
var FALLBACK_COLUMNS = 6;
function useGridColumns(grid) {
	const [columns, setColumns] = (0, import_react.useState)(FALLBACK_COLUMNS);
	(0, import_react.useEffect)(() => {
		if (!grid) return;
		const measure = () => {
			const tracks = getComputedStyle(grid).gridTemplateColumns.split(" ").filter(Boolean).length;
			if (tracks > 0) setColumns(tracks);
		};
		measure();
		if (typeof ResizeObserver === "undefined") return;
		const observer = new ResizeObserver(measure);
		observer.observe(grid);
		return () => observer.disconnect();
	}, [grid]);
	return columns;
}
var tileKey = (item) => `${item.id}:${item.variant}`;
var isRecording = (item) => item.mime.startsWith("video/");
function duration(seconds) {
	const whole = Math.max(0, Math.floor(seconds));
	return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}
var LIFT_DIALOG_CSS = `
html[data-appshot-drag] body { pointer-events: auto !important; }
html[data-appshot-drag] [data-testid="settings-hub-dialog"],
html[data-appshot-drag] [data-state]:has(+ [data-testid="settings-hub-dialog"]) {
  opacity: 0;
  pointer-events: none !important;
  transition: opacity 120ms ease-out;
}`;
function liftDialog(lifted) {
	const root = document.documentElement;
	if (lifted) root.dataset.appshotDrag = "1";
	else delete root.dataset.appshotDrag;
}
function when(item) {
	return (/* @__PURE__ */ new Date((item.edited_at || item.taken_at) * 1e3)).toLocaleString([], {
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function Tile({ item, busy, onOpen, onDelete }) {
	const t = useT();
	const imageRef = (0, import_react.useRef)(null);
	const video = isRecording(item);
	const where = video ? t("appshots.recording_title") : item.app_name || item.label || t("appshots.preview_front_window");
	const edited = item.variant === "edited";
	const nativeDrag = canNativeDrag();
	const onDragStart = (event) => {
		const dt = event.dataTransfer;
		const lastSlash = Math.max(item.path.lastIndexOf("/"), item.path.lastIndexOf("\\"));
		setWorkspaceEntryDrag(dt, {
			root: item.path.slice(0, lastSlash),
			path: item.path.slice(lastSlash + 1)
		});
		const absoluteUrl = new URL(appshotLibraryImageUrl(item), window.location.href).toString();
		dt.setData("DownloadURL", `${item.mime}:${appshotLibraryFileName(item)}:${absoluteUrl}`);
		if (imageRef.current) dt.setDragImage(imageRef.current, 24, 24);
		window.setTimeout(() => liftDialog(true), 0);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		draggable: true,
		onDragStart,
		onDragEnd: () => liftDialog(false),
		"data-testid": "appshot-library-tile",
		"data-variant": item.variant,
		"data-media": video ? "video" : "image",
		className: "group relative flex cursor-grab flex-col overflow-hidden rounded-lg border border-border bg-background active:cursor-grabbing",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onOpen,
				disabled: busy,
				"aria-label": `${t(video ? "appshot_editor.library_play" : "appshot_editor.library_edit")}: ${where}`,
				className: "relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-secondary/60 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-strong",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					ref: imageRef,
					src: appshotLibraryImageUrl(item, true),
					alt: t("appshots.preview_alt").replace("{0}", where),
					loading: "lazy",
					draggable: false,
					className: "max-h-full max-w-full rounded-sm object-contain shadow-sm ring-1 ring-border transition-opacity group-hover:opacity-90"
				}), video && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute rounded-full border border-border bg-card/90 p-3 text-foreground shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
						className: "h-5 w-5",
						"aria-hidden": true
					})
				})]
			}),
			video && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "pointer-events-none absolute bottom-[4.25rem] right-3 inline-flex items-center gap-1 rounded-md bg-card/95 px-2 py-0.5 text-xs text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, {
					className: "h-3 w-3",
					"aria-hidden": true
				}), item.duration_s ? duration(item.duration_s) : t("appshot_editor.library_video")]
			}),
			edited && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "pointer-events-none absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, {
					className: "h-3 w-3",
					"aria-hidden": true
				}), t("appshot_editor.library_edited_badge")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute right-1.5 top-1.5 flex items-center gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100",
				children: [nativeDrag && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
					content: t("appshot_editor.library_drag_out"),
					side: "top",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						role: "button",
						tabIndex: -1,
						"aria-label": t("appshot_editor.library_drag_out"),
						"data-testid": "appshot-library-drag-out",
						onPointerDown: (event) => {
							if (event.button !== 0) return;
							event.preventDefault();
							event.stopPropagation();
							startNativeFileDrag(item.path);
						},
						className: "inline-flex h-7 w-7 cursor-grab items-center justify-center rounded-md border border-border bg-card text-muted-foreground shadow-sm hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, {
							className: "h-3.5 w-3.5",
							"aria-hidden": true
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
					content: t(video ? "appshot_editor.library_delete_recording_hint" : edited ? "appshot_editor.library_delete_edit_hint" : "appshot_editor.library_delete_original_hint"),
					side: "top",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onDelete,
						disabled: busy,
						"aria-label": t("appshot_editor.library_delete"),
						"data-testid": "appshot-library-delete",
						className: "inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground shadow-sm hover:text-destructive focus:outline-none focus-visible:ring-2 focus-visible:ring-border-strong",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
							className: "h-3.5 w-3.5",
							"aria-hidden": true
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm font-medium text-foreground",
					children: where
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-xs text-muted-foreground",
					children: [when(item), item.width > 0 && item.height > 0 ? `${item.width} × ${item.height}` : ""].filter(Boolean).join(" · ")
				})]
			})
		]
	});
}
function AppshotLibrary({ enabled, refreshKey, recordingsOnly = false }) {
	const t = useT();
	const ready = useLocaleChunk("appshot_editor");
	const pushToast = useEventStore((s) => s.pushToast);
	const openEditor = useAppshotEditor((s) => s.open);
	const [items, setItems] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)(recordingsOnly ? "recordings" : "all");
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	const [limit, setLimit] = (0, import_react.useState)(PAGE);
	const [grid, setGrid] = (0, import_react.useState)(null);
	const columns = useGridColumns(grid);
	const [busyKey, setBusyKey] = (0, import_react.useState)("");
	const [confirmClear, setConfirmClear] = (0, import_react.useState)(false);
	const [clearing, setClearing] = (0, import_react.useState)(false);
	const [playing, setPlaying] = (0, import_react.useState)(null);
	const confirmTimer = (0, import_react.useRef)(null);
	const load = (0, import_react.useCallback)(async () => {
		try {
			setItems((await fetchAppshotLibrary()).items);
			setError("");
		} catch (failure) {
			setError(failure.message);
			setItems((current) => current ?? []);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load, refreshKey]);
	(0, import_react.useEffect)(() => {
		const onFocus = () => void load();
		window.addEventListener("focus", onFocus);
		return () => window.removeEventListener("focus", onFocus);
	}, [load]);
	(0, import_react.useEffect)(() => () => {
		if (confirmTimer.current !== null) window.clearTimeout(confirmTimer.current);
	}, []);
	(0, import_react.useEffect)(() => {
		const settle = () => {
			if (document.documentElement.dataset.appshotDrag) liftDialog(false);
		};
		const events = [
			"drop",
			"dragend",
			"pointermove",
			"pointerdown",
			"keydown",
			"blur"
		];
		for (const name of events) window.addEventListener(name, settle, true);
		return () => {
			for (const name of events) window.removeEventListener(name, settle, true);
			liftDialog(false);
		};
	}, []);
	const editedCount = (0, import_react.useMemo)(() => (items ?? []).filter((item) => item.variant === "edited").length, [items]);
	const recordingCount = (0, import_react.useMemo)(() => (items ?? []).filter(isRecording).length, [items]);
	const shown = (0, import_react.useMemo)(() => (items ?? []).filter((item) => filter === "all" || (filter === "recordings" ? isRecording(item) : item.variant === "edited")), [items, filter]);
	const open = (0, import_react.useCallback)(async (item) => {
		if (isRecording(item)) {
			setPlaying(item);
			return;
		}
		setBusyKey(tileKey(item));
		try {
			const result = await openAppshotLibraryItem(item);
			if (!result.window) openEditor(result.id);
		} catch (failure) {
			pushToast("error", t("appshot_editor.library_open_failed").replace("{0}", failure.message));
			load();
		} finally {
			setBusyKey("");
		}
	}, [
		load,
		openEditor,
		pushToast,
		t
	]);
	const remove = (0, import_react.useCallback)(async (item) => {
		setBusyKey(tileKey(item));
		try {
			await deleteAppshotLibraryItem(item);
		} catch (failure) {
			pushToast("error", failure.message);
		} finally {
			setBusyKey("");
			load();
		}
	}, [load, pushToast]);
	const clearAll = (0, import_react.useCallback)(async () => {
		if (!confirmClear) {
			setConfirmClear(true);
			confirmTimer.current = window.setTimeout(() => setConfirmClear(false), 4e3);
			return;
		}
		if (confirmTimer.current !== null) window.clearTimeout(confirmTimer.current);
		setConfirmClear(false);
		setClearing(true);
		try {
			await clearAppshotLibrary();
			pushToast("success", t("appshot_editor.library_deleted_all"));
		} catch (failure) {
			pushToast("error", failure.message);
		} finally {
			setClearing(false);
			load();
		}
	}, [
		confirmClear,
		load,
		pushToast,
		t
	]);
	const total = items?.length ?? 0;
	const empty = items !== null && shown.length === 0;
	const folded = columns * ROWS;
	const visible = expanded ? Math.max(limit, folded) : folded;
	const titleId = recordingsOnly ? "appshot-recordings-title" : "appshot-library-title";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-testid": recordingsOnly ? "appshot-recordings" : "appshot-library",
		className: recordingsOnly ? "mt-4 border-t border-border pt-4" : "mt-5 rounded-xl border border-border bg-card p-5",
		"aria-labelledby": titleId,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: LIFT_DIALOG_CSS }),
			recordingsOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				id: titleId,
				className: "text-sm font-medium text-foreground",
				children: [t("appshot_editor.library_filter_recordings"), shown.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 font-normal text-muted-foreground",
					children: t("appshot_editor.library_count").replace("{0}", String(shown.length))
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-x-6 gap-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-[min(100%,16rem)] flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						id: titleId,
						className: "text-base font-medium text-foreground",
						children: [t("appshot_editor.library_title"), total > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 text-sm font-normal text-muted-foreground",
							children: t("appshot_editor.library_count").replace("{0}", String(total))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-sm text-muted-foreground",
						children: enabled === false ? t("appshot_editor.library_off") : t("appshot_editor.library_subtitle")
					})]
				}), total > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex max-w-full flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						role: "tablist",
						className: "flex items-center rounded-lg bg-secondary p-0.5",
						children: [
							"all",
							"edited",
							"recordings"
						].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							role: "tab",
							"aria-selected": filter === value,
							"data-testid": `appshot-library-filter-${value}`,
							onClick: () => {
								setFilter(value);
								setExpanded(false);
								setLimit(PAGE);
							},
							className: cn("h-7 rounded-md px-3 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-border-strong", filter === value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"),
							children: value === "all" ? t("appshot_editor.library_filter_all") : value === "edited" ? `${t("appshot_editor.library_filter_edited")} ${editedCount}` : `${t("appshot_editor.library_filter_recordings")} ${recordingCount}`
						}, value))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: confirmClear ? "destructive" : "ghost",
						size: "sm",
						disabled: clearing,
						onClick: () => void clearAll(),
						"data-testid": "appshot-library-clear",
						children: [clearing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							className: "animate-spin",
							"aria-hidden": true
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { "aria-hidden": true }), confirmClear ? t("appshot_editor.library_delete_all_confirm") : t("appshot_editor.library_delete_all")]
					})]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-destructive",
				role: "alert",
				children: t("appshot_editor.library_load_failed").replace("{0}", error)
			}),
			items === null || !ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-32 items-center justify-center",
				role: "status",
				"aria-busy": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					className: "h-5 w-5 animate-spin text-muted-foreground",
					"aria-hidden": true
				})
			}) : empty ? !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 rounded-lg border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground",
				children: filter === "recordings" ? t("appshot_editor.library_empty_recordings") : filter === "edited" ? t("appshot_editor.library_empty_edited") : t("appshot_editor.library_empty")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				ref: setGrid,
				className: "mt-4 grid grid-cols-[repeat(auto-fill,minmax(min(100%,12rem),1fr))] gap-3",
				children: shown.slice(0, visible).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					item,
					busy: busyKey === tileKey(item),
					onOpen: () => void open(item),
					onDelete: () => void remove(item)
				}, tileKey(item)))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: t("appshot_editor.library_drag_hint")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-2",
					children: [expanded && shown.length > folded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						onClick: () => {
							setExpanded(false);
							setLimit(PAGE);
							grid?.scrollIntoView?.({ block: "nearest" });
						},
						"data-testid": "appshot-library-less",
						children: t("appshot_editor.library_show_less")
					}), shown.length > visible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						size: "sm",
						onClick: () => {
							if (expanded) setLimit((value) => value + PAGE);
							else {
								setExpanded(true);
								setLimit(Math.max(PAGE, folded));
							}
						},
						"data-testid": "appshot-library-more",
						children: t("appshot_editor.library_show_more")
					})]
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppshotRecordingPlayer, {
				item: playing,
				onClose: () => setPlaying(null)
			})
		]
	});
}
var fieldClass = "mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50";
function AppshotRecordingSettings({ settings, recording, disabled, onSave, onDirty }) {
	const t = useT();
	const id = (0, import_react.useId)();
	const resolution = settings.recording_resolution ?? "1080p";
	const fps = settings.recording_fps ?? 60;
	const bitrate = settings.recording_bitrate_mbps ?? 12;
	const audio = settings.recording_system_audio ?? false;
	const [draft, setDraft] = (0, import_react.useState)({
		resolution,
		fps,
		bitrate: String(bitrate),
		audio
	});
	(0, import_react.useEffect)(() => {
		setDraft({
			resolution,
			fps,
			bitrate: String(bitrate),
			audio
		});
	}, [
		resolution,
		fps,
		bitrate,
		audio
	]);
	const dirty = draft.resolution !== resolution || draft.fps !== fps || draft.bitrate !== String(bitrate) || draft.audio !== audio;
	(0, import_react.useEffect)(() => {
		onDirty(dirty);
	}, [dirty, onDirty]);
	const validBitrate = /^\d+$/.test(draft.bitrate) && Number(draft.bitrate) >= 1 && Number(draft.bitrate) <= 100;
	const audioCapability = recording?.capability?.system_audio;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mt-4 space-y-3 border-t border-border pt-4",
		onSubmit: (event) => {
			event.preventDefault();
			if (!validBitrate || disabled || !dirty) return;
			onSave({
				recording_resolution: draft.resolution,
				recording_fps: draft.fps,
				recording_bitrate_mbps: Number(draft.bitrate),
				recording_system_audio: draft.audio
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				disabled,
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "sr-only",
						children: t("appshots.recording_quality")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						htmlFor: `${id}-resolution`,
						className: "text-sm text-foreground",
						children: [t("appshots.recording_resolution"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedSelect, {
							id: `${id}-resolution`,
							className: fieldClass,
							value: draft.resolution,
							ariaLabel: t("appshots.recording_resolution"),
							disabled,
							onValueChange: (value) => setDraft({
								...draft,
								resolution: value
							}),
							options: [
								{
									value: "720p",
									label: "720p · HD"
								},
								{
									value: "1080p",
									label: "1080p · Full HD"
								},
								{
									value: "1440p",
									label: "1440p · QHD"
								},
								{
									value: "2160p",
									label: "2160p · 4K"
								},
								{
									value: "native",
									label: t("appshots.recording_native")
								}
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						htmlFor: `${id}-fps`,
						className: "text-sm text-foreground",
						children: [t("appshots.recording_fps"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedSelect, {
							id: `${id}-fps`,
							className: fieldClass,
							value: String(draft.fps),
							ariaLabel: t("appshots.recording_fps"),
							disabled,
							onValueChange: (value) => setDraft({
								...draft,
								fps: Number(value)
							}),
							options: [
								30,
								60,
								120
							].map((value) => ({
								value: String(value),
								label: `${value} FPS`
							}))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						htmlFor: `${id}-bitrate`,
						className: "text-sm text-foreground",
						children: [t("appshots.recording_bitrate"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: `${id}-bitrate`,
							className: fieldClass,
							type: "number",
							min: 1,
							max: 100,
							step: 1,
							value: draft.bitrate,
							"aria-invalid": !validBitrate,
							"aria-describedby": `${id}-bitrate-help`,
							onChange: (event) => setDraft({
								...draft,
								bitrate: event.target.value
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				id: `${id}-bitrate-help`,
				className: `text-xs ${validBitrate ? "text-muted-foreground" : "text-destructive"}`,
				children: t("appshots.recording_bitrate_hint")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-sm text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: draft.audio,
					className: "h-4 w-4 accent-primary",
					disabled: disabled || !draft.audio && !audioCapability?.available,
					onChange: (event) => setDraft({
						...draft,
						audio: event.target.checked
					})
				}), t("appshots.recording_system_audio")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: t("appshots.recording_audio_hint")
			}),
			audioCapability?.detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: audioCapability.detail
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: t("appshots.recording_monitor_hint")
			}),
			dirty && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				variant: "secondary",
				disabled: disabled || !validBitrate,
				children: t("appshots.recording_apply")
			})
		]
	});
}
function AppshotRecordingPanel({ settings, saving, onSaved, onSettings }) {
	const t = useT();
	const [recording, setRecording] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [loadError, setLoadError] = (0, import_react.useState)("");
	const [revision, setRevision] = (0, import_react.useState)(0);
	const [settingsDirty, setSettingsDirty] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (recording?.phase === "saved" && recording.id) onSaved?.(recording.id);
	}, [
		recording?.phase,
		recording?.id,
		onSaved
	]);
	(0, import_react.useEffect)(() => {
		const controller = new AbortController();
		let timer;
		let failures = 0;
		async function refresh() {
			try {
				const next = await fetchAppshotRecording(controller.signal);
				if (controller.signal.aborted) return;
				setRecording(next);
				failures = 0;
				setLoadError("");
			} catch (cause) {
				if (controller.signal.aborted) return;
				failures += 1;
				setLoadError(cause.message);
			}
			if (!controller.signal.aborted) {
				const delay = document.hidden ? 1e4 : Math.min(3e4, 1500 * 2 ** failures);
				timer = setTimeout(refresh, delay + Math.random() * 500);
			}
		}
		refresh();
		return () => {
			controller.abort();
			clearTimeout(timer);
		};
	}, [revision]);
	const active = recording && [
		"selecting",
		"recording",
		"stopping"
	].includes(recording.phase);
	const stop = recording?.phase === "recording";
	async function control() {
		setBusy(true);
		setError("");
		try {
			const next = await controlAppshotRecording(active ? "stop" : "start");
			setRecording((current) => ({
				...current,
				...next
			}));
			setRevision((value) => value + 1);
		} catch (cause) {
			setError(cause.message);
		} finally {
			setBusy(false);
		}
	}
	const elapsed = Math.floor(recording?.duration_s ?? 0);
	const time = `${Math.floor(elapsed / 60).toString().padStart(2, "0")}:${(elapsed % 60).toString().padStart(2, "0")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-label": t("appshots.recording_title"),
		className: "mt-5 rounded-xl border border-border bg-card p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2 text-base font-medium text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, {
							className: "h-4 w-4",
							"aria-hidden": true
						}), t("appshots.recording_title")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: t("appshots.recording_hint")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: active ? "secondary" : "default",
					disabled: busy || recording?.phase === "stopping" || !active && (saving || settingsDirty || !settings.enabled || !recording?.capability?.available),
					onClick: () => void control(),
					"data-testid": "appshots-recording-control",
					children: [busy || recording?.phase === "stopping" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						className: "animate-spin",
						"aria-hidden": true
					}) : active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { "aria-hidden": true }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { "aria-hidden": true }), active ? t(stop ? "appshots.recording_stop" : "appshots.recording_cancel") : t("appshots.recording_start")]
				})]
			}),
			onSettings && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppshotRecordingSettings, {
				settings,
				recording,
				disabled: saving || busy || Boolean(active),
				onSave: onSettings,
				onDirty: setSettingsDirty
			}),
			recording?.capability?.detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: recording.capability.detail
			}),
			recording?.capability?.permission_required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "secondary",
				className: "mt-2",
				disabled: busy,
				onClick: async () => {
					setBusy(true);
					try {
						await requestRecordingPermission();
						setRevision((value) => value + 1);
					} catch (cause) {
						setError(cause.message);
					} finally {
						setBusy(false);
					}
				},
				children: t("appshots.recording_permission")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				role: "status",
				"aria-live": "polite",
				className: "mt-3 text-sm text-muted-foreground",
				children: [recording && !["idle", "error"].includes(recording.phase) ? t(`appshots.recording_${recording.phase}`) : "", recording?.phase === "recording" || recording?.phase === "saved" ? ` · ${time}` : ""]
			}),
			recording?.width && recording?.height && recording?.fps && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: [
					recording.display_name ? `${recording.display_name} · ` : "",
					recording.width,
					" × ",
					recording.height,
					" · ",
					recording.fps,
					" FPS · ",
					recording.bitrate_mbps,
					" Mbps"
				]
			}),
			Boolean(recording?.dropped_frames) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: t("appshots.recording_dropped_hint")
			}),
			(error || loadError || recording?.message) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "mt-2 text-sm text-destructive",
				children: error || loadError || recording?.message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppshotLibrary, {
				enabled: void 0,
				recordingsOnly: true,
				refreshKey: (recording?.recent ?? []).map((video) => video.id).join(",")
			})
		]
	});
}
var IS_MAC = typeof navigator !== "undefined" && /Mac/i.test(navigator.platform || "");
function gestureKeyName(family) {
	if (family === "alt") return IS_MAC ? "Option" : "Alt";
	if (family === "ctrl") return IS_MAC ? "Control" : "Ctrl";
	return "Shift";
}
var TRY_DELAY_S = 3;
function AppshotGlyph({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		fill: "none",
		"aria-hidden": true,
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M4 11V8a4 4 0 0 1 4-4h3M21 4h3a4 4 0 0 1 4 4v3M28 21v3a4 4 0 0 1-4 4h-3M11 28H8a4 4 0 0 1-4-4v-3",
			stroke: "currentColor",
			strokeWidth: "2.6",
			strokeLinecap: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "9.5",
			y: "13",
			width: "13",
			height: "6",
			rx: "3",
			fill: "currentColor"
		})]
	});
}
function Row({ label, hint, control, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-x-6 gap-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-[min(100%,14rem)] flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-base font-medium text-foreground",
					children: label
				}), hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-muted-foreground",
					children: hint
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ml-auto shrink-0",
				children: control
			})]
		}), children]
	});
}
function DemoWindow({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5 border-b border-border px-3 py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-foreground/20" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-foreground/20" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-foreground/20" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ml-3 h-2 w-1/3 rounded-full bg-foreground/10" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 gap-3 p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-1/4 space-y-2",
				children: [
					0,
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-2 rounded-full bg-foreground/10" }, i))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-3 w-1/2 rounded-full bg-foreground/15" }),
					[
						0,
						1,
						2,
						3,
						4
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("block h-2 rounded-full bg-foreground/10", i % 2 ? "w-4/5" : "w-full") }, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-3 block h-14 rounded-md bg-accent/15" })
				]
			})]
		})]
	});
}
function PreviewDemo() {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-secondary/60 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoWindow, { className: "h-full w-full" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "appshot-demo-card pointer-events-none absolute inset-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoWindow, { className: "h-full w-full ring-4 ring-white/90" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "appshot-demo-flash pointer-events-none absolute inset-5 rounded-lg bg-white" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-muted-foreground",
			children: t("appshots.preview_empty")
		})]
	});
}
function deliveredLabel(t, deliveredTo) {
	switch (deliveredTo) {
		case "voice": return t("appshots.preview_sent_voice");
		case "message": return t("appshots.preview_sent_message");
		case "turn": return t("appshots.preview_sent_turn");
		case "none": return t("appshots.preview_sent_none");
		default: return "";
	}
}
function LatestPreview({ shot, revision, onForget, onEdit }) {
	const t = useT();
	const time = (/* @__PURE__ */ new Date(shot.taken_at * 1e3)).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
	const where = shot.app_name || t("appshots.preview_front_window");
	const delivered = deliveredLabel(t, shot.delivered_to);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onEdit,
			title: t("appshots.editor.open"),
			className: "group flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-lg bg-secondary/60 p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-strong",
			"data-testid": "appshots-preview-edit",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: latestAppshotImageUrl(shot.id, revision),
				alt: t("appshots.preview_alt").replace("{0}", where),
				className: "max-h-full max-w-full rounded-md object-contain shadow-sm ring-1 ring-border transition-opacity group-hover:opacity-90"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-base font-medium text-foreground",
					children: where
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						time,
						`${shot.width} × ${shot.height}`,
						delivered
					].filter(Boolean).join(" · ")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: onEdit,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { "aria-hidden": true }), t("appshots.editor.open")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: onForget,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { "aria-hidden": true }), t("appshots.forget")]
				})]
			})]
		})]
	});
}
function AppshotsView() {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const lastAppshotEvent = useEventStore((s) => s.events.find((event) => event.name === "AppshotTaken")?.id ?? "");
	const [settings, setSettings] = (0, import_react.useState)(null);
	const [latest, setLatest] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [countdown, setCountdown] = (0, import_react.useState)(null);
	const [picking, setPicking] = (0, import_react.useState)(false);
	const [savedRecording, setSavedRecording] = (0, import_react.useState)("");
	const openEditor = useAppshotEditor((s) => s.open);
	const revision = useAppshotEditor((s) => s.revision);
	const [fieldStatus, setFieldStatus] = (0, import_react.useState)({
		window: null,
		region: null,
		recording: null
	});
	const windowStatus = (0, import_react.useCallback)((text) => setFieldStatus((s) => s.window === text ? s : {
		...s,
		window: text
	}), []);
	const regionStatus = (0, import_react.useCallback)((text) => setFieldStatus((s) => s.region === text ? s : {
		...s,
		region: text
	}), []);
	const recordingStatus = (0, import_react.useCallback)((text) => setFieldStatus((s) => s.recording === text ? s : {
		...s,
		recording: text
	}), []);
	const countdownTimer = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		fetchAppshotSettings().then((next) => active && setSettings(next)).catch((error) => pushToast("error", error.message));
		return () => {
			active = false;
		};
	}, [pushToast]);
	(0, import_react.useEffect)(() => {
		let active = true;
		fetchLatestAppshot().then((body) => active && setLatest(body.appshot)).catch(() => active && setLatest(null));
		return () => {
			active = false;
		};
	}, [lastAppshotEvent, revision]);
	(0, import_react.useEffect)(() => () => {
		if (countdownTimer.current !== null) window.clearInterval(countdownTimer.current);
	}, []);
	const save = (0, import_react.useCallback)(async (patch) => {
		setSaving(true);
		setSettings((current) => current ? {
			...current,
			...patch
		} : current);
		try {
			setSettings(await saveAppshotSettings(patch));
		} catch (error) {
			pushToast("error", t("appshots.save_error").replace("{0}", error.message));
			fetchAppshotSettings().then(setSettings).catch(() => void 0);
		} finally {
			setSaving(false);
		}
	}, [pushToast, t]);
	const tryIt = (0, import_react.useCallback)(async () => {
		if (countdown !== null) return;
		setCountdown(TRY_DELAY_S);
		countdownTimer.current = window.setInterval(() => {
			setCountdown((value) => value !== null && value > 1 ? value - 1 : value);
		}, 1e3);
		try {
			const result = await takeAppshot(TRY_DELAY_S);
			if (result.ok) {
				setLatest(result.appshot);
				pushToast("success", t("appshots.try_done"));
			} else pushToast("warning", t("appshots.toast_refused").replace("{0}", result.message));
		} catch (error) {
			pushToast("error", error.message);
		} finally {
			if (countdownTimer.current !== null) window.clearInterval(countdownTimer.current);
			countdownTimer.current = null;
			setCountdown(null);
		}
	}, [
		countdown,
		pushToast,
		t
	]);
	const tryRegion = (0, import_react.useCallback)(async () => {
		if (picking || countdown !== null) return;
		setPicking(true);
		try {
			const result = await takeAppshot(0, "region");
			if (result.ok) {
				setLatest(result.appshot);
				pushToast("success", t("appshots.try_done"));
			} else if (result.reason !== "cancelled") pushToast("warning", t("appshots.toast_refused").replace("{0}", result.message));
		} catch (error) {
			pushToast("error", error.message);
		} finally {
			setPicking(false);
		}
	}, [
		countdown,
		picking,
		pushToast,
		t
	]);
	const forget = (0, import_react.useCallback)(async () => {
		try {
			await forgetAppshots();
			setLatest(null);
		} catch (error) {
			pushToast("error", error.message);
		}
	}, [pushToast]);
	const editorReady = useLocaleChunk("appshot_editor");
	const cardOptions = (0, import_react.useMemo)(() => CARD_SECONDS_CHOICES.map((seconds) => ({
		value: String(seconds),
		label: seconds === 0 ? t("appshot_editor.card_until_closed") : seconds >= 60 ? t("appshot_editor.card_minutes_option").replace("{0}", String(seconds / 60)) : t("appshot_editor.card_seconds_option").replace("{0}", String(seconds))
	})), [t, editorReady]);
	const keepOptions = (0, import_react.useMemo)(() => KEEP_NEWEST_CHOICES.map((count) => ({
		value: String(count),
		label: count === 0 ? t("appshot_editor.keep_all") : t("appshot_editor.keep_option").replace("{0}", String(count))
	})), [t, editorReady]);
	const targetOptions = (0, import_react.useMemo)(() => [
		{
			value: "auto",
			label: t("appshots.target_auto")
		},
		{
			value: "message",
			label: t("appshots.target_message")
		},
		{
			value: "voice",
			label: t("appshots.target_voice")
		}
	], [t]);
	const shortcutHint = (() => {
		if (!settings) return "";
		if (!settings.hotkey) return t("appshots.shortcut_hint_off");
		if (settings.enabled && !settings.shortcut.armed && settings.shortcut.detail) return t("appshots.shortcut_unavailable").replace("{0}", settings.shortcut.detail);
		if (settings.hotkey === "alt+alt") return IS_MAC ? t("appshots.shortcut_both_option_hint") : t("appshots.shortcut_both_alt_hint");
		const family = gestureFamily(settings.hotkey);
		if (family) return t("appshots.shortcut_both_keys_hint").replace("{0}", gestureKeyName(family));
		return t("appshots.shortcut_combo_hint").replace("{0}", formatAppshotHotkey(settings.hotkey, IS_MAC));
	})();
	const regionSupported = typeof settings?.region_hotkey === "string";
	const regionShortcutHint = (() => {
		if (!settings || !regionSupported) return "";
		if (!settings.readiness.region) return t("appshots.effect_unavailable").replace("{0}", settings.readiness.region_detail);
		if (!settings.region_hotkey) return t("appshots.region_shortcut_hint_off");
		if (settings.enabled && !settings.region_shortcut.armed && settings.region_shortcut.detail) return t("appshots.shortcut_unavailable").replace("{0}", settings.region_shortcut.detail);
		const family = gestureFamily(settings.region_hotkey);
		if (family) return t("appshots.region_shortcut_both_keys_hint").replace("{0}", gestureKeyName(family));
		return t("appshots.region_shortcut_hint").replace("{0}", formatAppshotHotkey(settings.region_hotkey, IS_MAC));
	})();
	const recordingSupported = typeof settings?.recording_hotkey === "string";
	const recordingShortcutHint = (() => {
		if (!settings || !recordingSupported) return "";
		if (!settings.recording_hotkey) return t("appshots.recording_shortcut_hint_off");
		const detail = settings.recording_shortcut?.detail;
		if (settings.enabled && !settings.recording_shortcut?.armed && detail) return t("appshots.shortcut_unavailable").replace("{0}", detail);
		return t("appshots.recording_shortcut_hint").split("{0}").join(formatAppshotHotkey(settings.recording_hotkey, IS_MAC));
	})();
	const targetHint = settings?.target === "message" ? t("appshots.target_message_hint") : settings?.target === "voice" ? t("appshots.target_voice_hint") : t("appshots.target_auto_hint");
	const disabled = !settings || !settings.enabled;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-testid": "appshots-view",
		className: "flex h-full flex-col overflow-y-auto bg-background px-8 pb-10 scrollbar-jarvis",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-[1400px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppshotGlyph, {}),
					title: t("appshots.title"),
					description: t("appshots.subtitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4 rounded-xl border border-border bg-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppshotGlyph, { className: "mt-0.5 h-8 w-8 shrink-0 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-semibold text-foreground",
							children: t("appshots.hero_title")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-base text-muted-foreground",
							children: t("appshots.hero_body")
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,28rem),1fr))] gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-border self-start rounded-xl border border-border bg-card",
						children: !settings ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-40 items-center justify-center",
							role: "status",
							"aria-busy": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								className: "h-5 w-5 animate-spin text-muted-foreground",
								"aria-hidden": true
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: t("appshots.enabled_label"),
								hint: t("appshots.enabled_hint"),
								control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: settings.enabled,
									disabled: saving,
									"aria-label": t("appshots.enabled_label"),
									"data-testid": "appshots-enabled",
									onCheckedChange: (enabled) => void save({ enabled })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: t("appshots.shortcut_label"),
								hint: fieldStatus.window ?? shortcutHint,
								control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppshotShortcutField, {
									value: settings.hotkey,
									isMac: IS_MAC,
									disabled: disabled || saving,
									testId: "appshots-hotkey",
									label: t("appshots.shortcut_label"),
									className: "w-44",
									onSave: (hotkey) => save({ hotkey }),
									onStatus: windowStatus
								})
							}),
							regionSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: t("appshots.region_shortcut_label"),
								hint: fieldStatus.region ?? regionShortcutHint,
								control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppshotShortcutField, {
									value: settings.region_hotkey,
									isMac: IS_MAC,
									disabled: disabled || saving,
									testId: "appshots-region-hotkey",
									label: t("appshots.region_shortcut_label"),
									className: "w-44",
									onSave: (regionHotkey) => save({ region_hotkey: regionHotkey }),
									onStatus: regionStatus
								})
							}),
							recordingSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: t("appshots.recording_shortcut_label"),
								hint: fieldStatus.recording ?? recordingShortcutHint,
								control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppshotShortcutField, {
									value: settings.recording_hotkey ?? "",
									isMac: IS_MAC,
									disabled: disabled || saving,
									testId: "appshots-recording-hotkey",
									label: t("appshots.recording_shortcut_label"),
									className: "w-44",
									onSave: (recordingHotkey) => save({ recording_hotkey: recordingHotkey }),
									onStatus: recordingStatus
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: t("appshots.target_label"),
								hint: targetHint,
								control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedSelect, {
									value: settings.target,
									options: targetOptions,
									ariaLabel: t("appshots.target_label"),
									disabled: disabled || saving,
									testId: "appshots-target",
									className: "w-44",
									onValueChange: (value) => void save({ target: value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: t("appshots.sound_label"),
								hint: settings.sound_effects_master ? void 0 : t("appshots.sound_master_off"),
								control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: settings.sound,
									disabled: disabled || saving,
									"aria-label": t("appshots.sound_label"),
									"data-testid": "appshots-sound",
									onCheckedChange: (sound) => void save({ sound })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: t("appshots.effect_label"),
								hint: settings.readiness.effect ? t("appshots.effect_hint") : t("appshots.effect_unavailable").replace("{0}", settings.readiness.effect_detail),
								control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: settings.effect,
									disabled: disabled || saving,
									"aria-label": t("appshots.effect_label"),
									"data-testid": "appshots-effect",
									onCheckedChange: (effect) => void save({ effect })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: editorReady ? t("appshot_editor.card_seconds") : "",
								hint: editorReady ? t("appshot_editor.card_seconds_hint") : "",
								control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedSelect, {
									value: String(settings.card_seconds ?? 6),
									options: cardOptions,
									ariaLabel: editorReady ? t("appshot_editor.card_seconds") : "",
									disabled: disabled || saving || !settings.effect,
									testId: "appshots-card-seconds",
									onValueChange: (value) => void save({ card_seconds: Number(value) })
								})
							}),
							typeof settings.library === "boolean" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: editorReady ? t("appshot_editor.library_label") : "",
								hint: editorReady ? t("appshot_editor.library_hint") : "",
								control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: settings.library,
									disabled: saving,
									"aria-label": editorReady ? t("appshot_editor.library_label") : "",
									"data-testid": "appshots-library",
									onCheckedChange: (library) => void save({ library })
								})
							}),
							typeof settings.keep_newest === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: editorReady ? t("appshot_editor.keep_label") : "",
								hint: editorReady ? t("appshot_editor.keep_hint") : "",
								control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedSelect, {
									value: String(settings.keep_newest),
									options: keepOptions,
									ariaLabel: editorReady ? t("appshot_editor.keep_label") : "",
									disabled: saving,
									testId: "appshots-keep-newest",
									onValueChange: (value) => void save({ keep_newest: Number(value) })
								})
							}),
							typeof settings.copy_to_clipboard === "boolean" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: editorReady ? t("appshot_editor.clipboard_label") : "",
								hint: editorReady ? t("appshot_editor.clipboard_hint") : "",
								control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: settings.copy_to_clipboard,
									disabled: saving,
									"aria-label": editorReady ? t("appshot_editor.clipboard_label") : "",
									"data-testid": "appshots-clipboard",
									onCheckedChange: (copy_to_clipboard) => void save({ copy_to_clipboard })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: t("appshots.try_label"),
								hint: countdown !== null ? t("appshots.try_counting").replace("{0}", String(countdown)) : picking ? t("appshots.try_picking") : settings.readiness.capture === false ? t("appshots.effect_unavailable").replace("{0}", settings.readiness.capture_detail) : t("appshots.try_hint"),
								control: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [regionSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "secondary",
										size: "sm",
										disabled: disabled || picking || !settings.readiness.capture || !settings.readiness.region || countdown !== null,
										onClick: () => void tryRegion(),
										"data-testid": "appshots-try-region",
										children: [picking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											className: "animate-spin",
											"aria-hidden": true
										}), t("appshots.try_region_button")]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "secondary",
										size: "sm",
										disabled: disabled || picking || !settings.readiness.capture || countdown !== null,
										onClick: () => void tryIt(),
										"data-testid": "appshots-try",
										children: [countdown !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											className: "animate-spin",
											"aria-hidden": true
										}), t("appshots.try_button")]
									})]
								})
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-3 text-base font-medium text-foreground",
							children: t("appshots.preview_title")
						}), latest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LatestPreview, {
							shot: latest,
							revision,
							onForget: () => void forget(),
							onEdit: () => {
								openAppshotEditorWindow(latest.id).then((inWindow) => {
									if (!inWindow) openEditor(latest.id);
								});
							}
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewDemo, {})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppshotLibrary, {
					enabled: settings?.library,
					refreshKey: `${lastAppshotEvent}:${revision}:${savedRecording}`
				}),
				settings && typeof settings.recording_hotkey === "string" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppshotRecordingPanel, {
					settings,
					saving,
					onSettings: save,
					onSaved: setSavedRecording
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-sm text-muted-foreground",
					children: t("appshots.voice_hint")
				})
			]
		})
	});
}
export { AppshotGlyph, AppshotsView };
