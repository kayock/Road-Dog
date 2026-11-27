const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/CustomApisView-E3xVQzvb.js","assets/index-BOzhgzD7.js","assets/index-CA6QM4ps.css","assets/check-vbwKkbPq.js","assets/chevron-right-BjVJ-R2c.js","assets/ProviderLogo-BxoN_q6P.js","assets/server-UsFxH5G7.js","assets/xai-CmmNaoW9.js","assets/pause-3aM4bP8F.js","assets/play-B4Hl_QRo.js","assets/users-WSH2xBOP.js","assets/pluginLogos-2ICNq49h.js","assets/primitives-C1uNwbNH.js","assets/input-DXuNAC9g.js","assets/CustomApisView-B_dOL7DL.css"])))=>i.map(i=>d[i]);
import { t as Check } from "./check-vbwKkbPq.js";
import { t as ChevronRight } from "./chevron-right-BjVJ-R2c.js";
import { t as Store } from "./store-DvnTMCAH.js";
import { t as CodeXml } from "./code-xml-CMzRaK0o.js";
import { t as FileCode } from "./file-code-Dpdmue7b.js";
import { t as FileJson } from "./file-json-sGKKbS0x.js";
import { t as FileText } from "./file-text-D8DI7Rfv.js";
import { r as FolderUp, t as CommunityTab } from "./PluginsCommunity-DZgzaAG9.js";
import { t as Folder } from "./folder-Dd9IlgL2.js";
import { n as Link2, t as Upload } from "./upload-r67O4hVg.js";
import { t as Plug } from "./plug-U1VLH2_U.js";
import { t as RotateCw } from "./rotate-cw-B2KgOpkU.js";
import { $s as translate, Bc as require_jsx_runtime, Bi as Eye, Dc as useMutation, Et as openExternalUrl, F as robustCopy, Gs as fill, Hi as Ellipsis, Ln as cn, Oc as useQuery, Ri as FolderOpen, Vi as ExternalLink, Wi as Copy, Xc as require_react, Y as ScrollArea, Zi as ArrowRight, bi as Plus, cc as __vitePreload, gi as Search, ji as LoaderCircle, li as TriangleAlert, ln as Button, na as createLucideIcon, nc as useLocaleChunk, oc as useT, qi as ChevronDown, si as X, tl as __toESM, ui as Trash2, wc as useEventStore, yi as RefreshCw, zc as useQueryClient } from "./index-BOzhgzD7.js";
import { n as Markdown, t as remarkGfm } from "./lib-BoWxqGgd.js";
import { n as bundledPluginLogo } from "./pluginLogos-2ICNq49h.js";
import { t as BrandedSelect } from "./select-vogX_D37.js";
import { i as takePluginFocus, n as removeAddedPlugin, t as addCustomConnector } from "./customConnector-gQm2cmP7.js";
import { _ as Table, a as DetailHeader, c as IconButton, d as Panel, f as PanelHeader, g as StatusDot, i as ClampedText, l as InlineSearch, m as SoftButton, n as BackLink, o as EmptyRow, p as SegmentedFilter, r as Cell, s as FactRows, t as ActionMenu, u as MenuPill, v as TableHead, y as TableRow } from "./primitives-C1uNwbNH.js";
import { r as PRODUCT_NAME } from "./branding-DNImmT_K.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var FileArchive = createLucideIcon("FileArchive", [
	["path", {
		d: "M10 12v-1",
		key: "v7bkov"
	}],
	["path", {
		d: "M10 18v-2",
		key: "1cjy8d"
	}],
	["path", {
		d: "M10 7V6",
		key: "dljcrl"
	}],
	["path", {
		d: "M14 2v4a2 2 0 0 0 2 2h4",
		key: "tnqrlb"
	}],
	["path", {
		d: "M15.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 .274 1.01",
		key: "gkbcor"
	}],
	["circle", {
		cx: "10",
		cy: "20",
		r: "2",
		key: "1xzdoj"
	}]
]);
function normalisePath(raw) {
	return raw.replace(/\\/g, "/").replace(/^\/+/, "").replace(/^\.\//, "");
}
function filesFromInput(fileList) {
	if (!fileList) return [];
	return Array.from(fileList).map((file) => ({
		file,
		path: normalisePath(file.webkitRelativePath || file.name)
	}));
}
async function collectDroppedFiles(dataTransfer) {
	if (!dataTransfer) return [];
	const entries = [];
	const looseFiles = [];
	for (const item of Array.from(dataTransfer.items ?? [])) {
		const getEntry = item.webkitGetAsEntry;
		const entry = getEntry ? getEntry.call(item) : null;
		if (entry) {
			entries.push(entry);
			continue;
		}
		const file = item.getAsFile?.();
		if (file) looseFiles.push(file);
	}
	if (entries.length === 0) return (looseFiles.length > 0 ? looseFiles : Array.from(dataTransfer.files ?? [])).map((file) => ({
		file,
		path: normalisePath(file.name)
	}));
	const picked = [];
	for (const entry of entries) await walkEntry(entry, "", picked);
	return picked;
}
async function walkEntry(entry, parentPath, out) {
	if (entry.isFile && entry.file) {
		const file = await new Promise((resolve) => {
			entry.file?.(resolve, () => resolve(null));
		});
		if (!file) return;
		const path = entry.fullPath ? normalisePath(entry.fullPath) : normalisePath(parentPath ? `${parentPath}/${file.name}` : file.name);
		out.push({
			file,
			path
		});
		return;
	}
	if (!entry.isDirectory || !entry.createReader) return;
	const basePath = entry.fullPath ? normalisePath(entry.fullPath) : normalisePath(parentPath ? `${parentPath}/${entry.name}` : entry.name);
	const reader = entry.createReader();
	while (true) {
		const batch = await new Promise((resolve) => {
			reader.readEntries(resolve, () => resolve([]));
		});
		if (batch.length === 0) break;
		for (const child of batch) await walkEntry(child, basePath, out);
	}
}
function formatBytes(bytes) {
	if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
	const units = [
		"B",
		"KB",
		"MB",
		"GB"
	];
	let size = bytes;
	let unit = 0;
	while (size >= 1024 && unit < units.length - 1) {
		size /= 1024;
		unit += 1;
	}
	return `${size.toFixed(size < 10 && unit > 0 ? 1 : 0)} ${units[unit]}`;
}
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function useUploadInputs(onPick, testIdPrefix) {
	const folderRef = (0, import_react.useRef)(null);
	const archiveRef = (0, import_react.useRef)(null);
	const setFolderRef = (node) => {
		folderRef.current = node;
		if (node) {
			node.setAttribute("webkitdirectory", "");
			node.setAttribute("directory", "");
		}
	};
	const handleChange = (event) => {
		onPick(filesFromInput(event.target.files));
		event.target.value = "";
	};
	return {
		inputs: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: setFolderRef,
			type: "file",
			multiple: true,
			className: "sr-only",
			"data-testid": `${testIdPrefix}-folder-input`,
			onChange: handleChange
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: archiveRef,
			type: "file",
			accept: ".zip,.tgz,.tar.gz",
			className: "sr-only",
			"data-testid": `${testIdPrefix}-archive-input`,
			onChange: handleChange
		})] }),
		openFolder: () => folderRef.current?.click(),
		openArchive: () => archiveRef.current?.click()
	};
}
function UploadDropzone({ dragging, title, hint, folderLabel, archiveLabel, onChooseFolder, onChooseArchive }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col items-center gap-3 rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors", dragging ? "border-primary bg-primary/5" : "border-border bg-muted/20"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-5 w-5 text-muted-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: hint
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: onChooseFolder,
					className: "gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "h-3.5 w-3.5" }), folderLabel]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: onChooseArchive,
					className: "gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileArchive, { className: "h-3.5 w-3.5" }), archiveLabel]
				})]
			})
		]
	});
}
function buildUploadBody(picked) {
	const body = new FormData();
	for (const { file } of picked) body.append("files", file);
	body.append("paths", JSON.stringify(picked.map((entry) => entry.path)));
	return body;
}
async function postUpload(url, picked) {
	const res = await fetch(url, {
		method: "POST",
		body: buildUploadBody(picked)
	});
	if (!res.ok) {
		const body = await res.json().catch(() => ({}));
		throw new Error(body.detail ?? `HTTP ${res.status}`);
	}
	return res.json();
}
function inspectPluginUpload(picked) {
	return postUpload("/api/marketplace/plugins/upload/inspect", picked);
}
function uploadPlugin(picked) {
	return postUpload("/api/marketplace/plugins/upload", picked);
}
function PluginUploadDialog({ open, onClose, onInstalled, tabs }) {
	const t = useT();
	useLocaleChunk("marketplace");
	const qc = useQueryClient();
	const [picked, setPicked] = (0, import_react.useState)([]);
	const [report, setReport] = (0, import_react.useState)(null);
	const [inspecting, setInspecting] = (0, import_react.useState)(false);
	const [installing, setInstalling] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const reset = (0, import_react.useCallback)(() => {
		setPicked([]);
		setReport(null);
		setInspecting(false);
		setInstalling(false);
		setError(null);
		setDragging(false);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!open) reset();
	}, [open, reset]);
	const inspect = (0, import_react.useCallback)(async (files) => {
		setPicked(files);
		setReport(null);
		setError(null);
		if (files.length === 0) return;
		setInspecting(true);
		try {
			setReport(await inspectPluginUpload(files));
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		} finally {
			setInspecting(false);
		}
	}, []);
	const { inputs, openFolder, openArchive } = useUploadInputs((files) => void inspect(files), "plugin");
	const install = async () => {
		if (picked.length === 0) return;
		setInstalling(true);
		setError(null);
		try {
			const result = await uploadPlugin(picked);
			await qc.invalidateQueries({ queryKey: ["marketplace-plugins"] });
			onInstalled?.(result.plugin.id);
			onClose();
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		} finally {
			setInstalling(false);
		}
	};
	if (!open) return null;
	const blocker = picked.length === 0 ? t("plugin_upload.blocker_no_files") : report ? report.problems.length > 0 ? t("plugin_upload.blocked") : t("plugin_upload.ready") : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-scrim/60 p-6",
		onDragOver: (event) => {
			event.preventDefault();
			setDragging(true);
		},
		onDragLeave: () => setDragging(false),
		onDrop: (event) => {
			event.preventDefault();
			setDragging(false);
			collectDroppedFiles(event.dataTransfer).then(inspect);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex max-h-full w-[640px] max-w-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-float",
			"data-testid": "plugin-upload-dialog",
			children: [
				tabs ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "px-6 pt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold tracking-tight text-foreground-strong",
							children: t("custom_connector.dialog_title")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: onClose,
							"aria-label": t("common.cancel"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: tabs
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-start justify-between gap-4 border-b border-border px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "flex items-center gap-2 text-base font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4 text-primary" }), t("plugin_upload.title")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: t("plugin_upload.subtitle")
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: onClose,
						"aria-label": t("common.cancel"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
					className: "min-h-0 flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4 px-6 py-5",
						children: [
							inputs,
							tabs && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: t("plugin_upload.subtitle")
							}),
							picked.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadDropzone, {
								dragging,
								title: t("plugin_upload.drop_title"),
								hint: t("plugin_upload.drop_hint"),
								folderLabel: t("plugin_upload.choose_folder"),
								archiveLabel: t("plugin_upload.choose_archive"),
								onChooseFolder: openFolder,
								onChooseArchive: openArchive
							}) : inspecting || !report ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 rounded-lg border border-border bg-muted/20 px-4 py-6 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), t("plugin_upload.inspecting")]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-4 rounded-lg border border-border bg-muted/20 px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [report.plugin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "flex items-center gap-1.5 truncate text-sm font-semibold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plug, { className: "h-3.5 w-3.5 shrink-0 text-primary" }), report.plugin.display_name]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-0.5 line-clamp-2 text-xs text-muted-foreground",
												children: report.plugin.description
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1.5 text-xs text-muted-foreground",
												children: [`${report.plugin.category} · ${t("plugin_upload.auth_mode")}: ${report.plugin.auth_mode}`, report.has_mcp ? ` · ${t("plugin_upload.with_mcp")}` : ""]
											})
										] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-muted-foreground",
											children: t("plugin_upload.no_plugin_detected")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1.5 text-xs text-muted-foreground",
											children: `${report.files.length} ${t("plugin_upload.files")} · ${formatBytes(report.total_bytes)}`
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex shrink-0 items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "outline",
											onClick: openFolder,
											children: t("plugin_upload.replace")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "ghost",
											onClick: () => void inspect([]),
											children: t("plugin_upload.clear")
										})]
									})]
								}),
								report.files.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "max-h-[180px] overflow-y-auto rounded-lg border border-border bg-background",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "flex flex-col gap-0.5 p-2",
										children: report.files.map((path) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
											className: "truncate rounded px-2 py-1 font-mono text-xs text-muted-foreground",
											title: path,
											children: path
										}, path))
									})
								}),
								report.problems.map((problem) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									role: "alert",
									className: "flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), problem]
								}, problem)),
								report.ready && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "rounded-md border border-foreground/40 bg-foreground/10 px-3 py-2 text-xs text-foreground",
									children: t("plugin_upload.unreviewed")
								})
							] }),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-start gap-2 text-sm text-destructive",
								role: "alert",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), error]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "flex items-center justify-between gap-4 border-t border-border px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "min-w-0 text-xs text-muted-foreground",
						children: blocker
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: onClose,
							children: t("common.cancel")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: () => void install(),
							disabled: !report?.ready || installing || inspecting,
							className: "gap-1.5",
							children: [installing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }), t("plugin_upload.install")]
						})]
					})]
				})
			]
		})
	});
}
function AddPluginTabs({ mode, onChange }) {
	const t = useT();
	useLocaleChunk("marketplace");
	const tabs = [{
		id: "connector",
		label: t("custom_connector.tab_connector"),
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "h-4 w-4" })
	}, {
		id: "folder",
		label: t("custom_connector.tab_folder"),
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderUp, { className: "h-4 w-4" })
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "tablist",
		"aria-label": t("custom_connector.dialog_title"),
		className: "flex items-center gap-6 border-b border-border",
		children: tabs.map((tab) => {
			const active = tab.id === mode;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "tab",
				"aria-selected": active,
				"data-testid": `add-plugin-tab-${tab.id}`,
				onClick: () => onChange(tab.id),
				className: cn("relative -mb-px inline-flex h-10 items-center gap-2 border-b-2 text-sm font-medium transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", active ? "border-accent text-foreground-strong" : "border-transparent text-muted-foreground hover:text-foreground"),
				children: [tab.icon, tab.label]
			}, tab.id);
		})
	});
}
var SIGN_IN_CHOICES = [
	"auto",
	"oauth",
	"token",
	"none"
];
var INPUT = "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-border-strong/30 disabled:opacity-60";
function AddConnectorDialog({ open, onClose, onAdded, tabs }) {
	const t = useT();
	useLocaleChunk("marketplace");
	const nameId = (0, import_react.useId)();
	const urlId = (0, import_react.useId)();
	const headerId = (0, import_react.useId)();
	const nameRef = (0, import_react.useRef)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [url, setUrl] = (0, import_react.useState)("");
	const [advanced, setAdvanced] = (0, import_react.useState)(false);
	const [signIn, setSignIn] = (0, import_react.useState)("auto");
	const [headerName, setHeaderName] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setError(null);
		setPending(false);
		nameRef.current?.focus();
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (event) => {
			if (event.key === "Escape" && !pending) onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		open,
		pending,
		onClose
	]);
	if (!open) return null;
	const canSubmit = url.trim().length > 0 && !pending;
	const submit = async () => {
		if (!canSubmit) return;
		setPending(true);
		setError(null);
		try {
			const result = await addCustomConnector({
				name,
				url,
				auth: signIn,
				headerName: signIn === "token" || signIn === "auto" ? headerName : ""
			});
			setName("");
			setUrl("");
			setHeaderName("");
			setSignIn("auto");
			setAdvanced(false);
			onAdded(result);
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		} finally {
			setPending(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-scrim/60 p-6",
		onMouseDown: (event) => {
			if (event.target === event.currentTarget && !pending) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": `${nameId}-title`,
			"data-testid": "add-connector-dialog",
			className: "flex max-h-full w-[640px] max-w-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-float",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: cn("px-6 pt-5", tabs ? "pb-0" : "border-b border-border pb-4"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							id: `${nameId}-title`,
							className: "text-lg font-semibold tracking-tight text-foreground-strong",
							children: tabs ? t("custom_connector.dialog_title") : t("custom_connector.tab_connector")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: onClose,
							disabled: pending,
							"aria-label": t("common.cancel"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})]
					}), tabs && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: tabs
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
					className: "min-h-0 flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "flex flex-col gap-5 px-6 py-5",
						onSubmit: (event) => {
							event.preventDefault();
							submit();
						},
						onKeyDown: (event) => {
							if (event.key === "Enter" && event.target instanceof HTMLInputElement) {
								event.preventDefault();
								submit();
							}
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: t("custom_connector.intro")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: nameId,
									className: "mb-1.5 block text-xs font-medium text-muted-foreground",
									children: t("custom_connector.name_label")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: nameRef,
									id: nameId,
									type: "text",
									value: name,
									maxLength: 80,
									autoComplete: "off",
									spellCheck: false,
									onChange: (event) => setName(event.target.value),
									placeholder: t("custom_connector.name_label"),
									disabled: pending,
									className: INPUT
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-xs text-muted-foreground",
									children: t("custom_connector.name_help")
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: urlId,
									className: "mb-1.5 block text-xs font-medium text-muted-foreground",
									children: t("custom_connector.url_label")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: urlId,
									type: "text",
									inputMode: "url",
									value: url,
									maxLength: 2048,
									autoComplete: "off",
									spellCheck: false,
									onChange: (event) => setUrl(event.target.value),
									placeholder: "https://mcp.example.com/mcp",
									disabled: pending,
									"data-testid": "connector-url",
									className: cn(INPUT, "font-mono text-[13px]")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-xs text-muted-foreground",
									children: t("custom_connector.url_help")
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setAdvanced((value) => !value),
								"aria-expanded": advanced,
								className: "inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-foreground transition-colors hover:text-foreground-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: cn("h-4 w-4 text-muted-foreground transition-transform", advanced && "rotate-90") }), t("custom_connector.advanced")]
							}), advanced && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-col gap-4 rounded-xl border border-border bg-secondary/40 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-2 text-xs font-medium text-muted-foreground",
										children: t("custom_connector.signin_label")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										role: "radiogroup",
										"aria-label": t("custom_connector.signin_label"),
										className: "grid grid-cols-2 gap-1 rounded-lg border border-border bg-background p-1 sm:grid-cols-4",
										children: SIGN_IN_CHOICES.map((choice) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											role: "radio",
											"aria-checked": signIn === choice,
											onClick: () => setSignIn(choice),
											disabled: pending,
											className: cn("rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", signIn === choice ? "bg-secondary text-foreground-strong" : "text-muted-foreground hover:text-foreground"),
											children: t(`custom_connector.signin_${choice}`)
										}, choice))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-muted-foreground",
										children: t(`custom_connector.signin_${signIn}_help`)
									})
								] }), (signIn === "token" || signIn === "auto") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: headerId,
										className: "mb-1.5 block text-xs font-medium text-muted-foreground",
										children: t("custom_connector.header_label")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: headerId,
										type: "text",
										value: headerName,
										maxLength: 64,
										autoComplete: "off",
										spellCheck: false,
										onChange: (event) => setHeaderName(event.target.value),
										placeholder: "Authorization",
										disabled: pending,
										className: cn(INPUT, "font-mono text-[13px]")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1.5 text-xs text-muted-foreground",
										children: t("custom_connector.header_help")
									})
								] })]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs leading-relaxed text-muted-foreground",
								children: t("custom_connector.trust_note")
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								role: "alert",
								className: "flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), error]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "flex items-center justify-between gap-4 border-t border-border px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "min-w-0 truncate text-xs text-muted-foreground",
						role: "status",
						children: pending ? t("custom_connector.checking") : ""
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: onClose,
							disabled: pending,
							children: t("common.cancel")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: () => void submit(),
							disabled: !canSubmit,
							"data-testid": "connector-continue",
							className: "gap-1.5",
							children: [pending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), t("custom_connector.continue")]
						})]
					})]
				})
			]
		})
	});
}
function fileIconFor(path) {
	if (/\.(md|markdown)$/i.test(path)) return FileText;
	if (/\.json$/i.test(path)) return FileJson;
	return FileCode;
}
function MarkdownBody({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "prose prose-neutral max-w-none text-reading dark:prose-invert prose-headings:font-display prose-headings:tracking-tight prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-a:text-foreground-strong prose-code:text-foreground prose-pre:border prose-pre:border-border prose-pre:bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, {
			remarkPlugins: [remarkGfm],
			components: { a: ({ href, children, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href,
				target: "_blank",
				rel: "noreferrer noopener",
				...props,
				children
			}) },
			children: text
		})
	});
}
function ModeButton({ active, label, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		role: "tab",
		"aria-selected": active,
		"aria-label": label,
		title: label,
		onClick,
		className: cn("grid h-7 w-8 place-items-center rounded transition-colors", active ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"),
		children
	});
}
function buildTree(paths) {
	const root = [];
	for (const path of paths) {
		const parts = path.split("/").filter(Boolean);
		let level = root;
		let prefix = "";
		parts.forEach((part, i) => {
			prefix = prefix ? `${prefix}/${part}` : part;
			const leaf = i === parts.length - 1;
			let node = level.find((n) => n.name === part && Boolean(n.children) !== leaf);
			if (!node) {
				node = leaf ? {
					name: part,
					path
				} : {
					name: part,
					path: prefix,
					children: []
				};
				level.push(node);
			}
			if (!leaf) level = node.children;
		});
	}
	const sort = (nodes) => {
		const folders = nodes.filter((n) => n.children).sort((a, b) => a.name.localeCompare(b.name));
		const files = nodes.filter((n) => !n.children);
		folders.forEach((f) => f.children = sort(f.children));
		return [...folders, ...files];
	};
	return sort(root);
}
function FileTree({ rootLabel, paths, openPath, onOpen, className }) {
	const t = useT();
	const tree = (0, import_react.useMemo)(() => buildTree(paths), [paths]);
	const [collapsed, setCollapsed] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const toggle = (p) => setCollapsed((prev) => {
		const next = new Set(prev);
		if (next.has(p)) next.delete(p);
		else next.add(p);
		return next;
	});
	const renderNodes = (nodes, depth) => nodes.map((node) => {
		const pad = { paddingLeft: `${12 + depth * 14}px` };
		if (node.children) {
			const closed = collapsed.has(node.path);
			const Icon$1 = closed ? Folder : FolderOpen;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => toggle(node.path),
				"aria-expanded": !closed,
				style: pad,
				className: "flex h-8 w-full items-center gap-1.5 pr-2 text-left text-meta text-foreground hover:bg-secondary",
				children: [
					closed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon$1, { className: "h-4 w-4 shrink-0 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: node.name
					})
				]
			}), !closed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: renderNodes(node.children, depth + 1) })] }, `d:${node.path}`);
		}
		const Icon = fileIconFor(node.name);
		const active = node.path === openPath;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => onOpen(node.path),
			"aria-current": active ? "true" : void 0,
			title: node.path,
			style: { paddingLeft: `${12 + depth * 14 + 20}px` },
			className: cn("flex h-8 w-full items-center gap-2 pr-2 text-left font-mono text-meta transition-colors", active ? "bg-secondary text-foreground" : "text-foreground hover:bg-secondary hover:text-foreground"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("h-4 w-4 shrink-0", active ? "text-foreground" : "text-muted-foreground") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: node.name
			})]
		}) }, `f:${node.path}`);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		"aria-label": t("extensions.files_menu"),
		className: cn("min-w-0", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-8 items-center gap-1.5 px-3 text-meta font-medium text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "h-4 w-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: rootLabel
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: renderNodes(tree, 0) })]
	});
}
function FileCard({ rootLabel, files, loading, error, emptyLabel, className }) {
	const t = useT();
	const [openPath, setOpenPath] = (0, import_react.useState)(null);
	const [mode, setMode] = (0, import_react.useState)("preview");
	(0, import_react.useEffect)(() => {
		if (files.length === 0) {
			setOpenPath(null);
			return;
		}
		if (!openPath || !files.some((f) => f.path === openPath)) setOpenPath(files[0].path);
	}, [files, openPath]);
	const open = (0, import_react.useMemo)(() => files.find((f) => f.path === openPath) ?? null, [files, openPath]);
	const isMarkdown = open ? /\.(md|markdown)$/i.test(open.path) : false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 border-b border-border px-3 py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex h-8 min-w-0 items-center gap-2 px-1 font-mono text-meta text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(open ? fileIconFor(open.path) : FileText, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: open?.path ?? "—"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted-foreground",
					children: files.length === 1 ? t("extensions.file_one") : fill(t("extensions.files"), { n: files.length })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center rounded-md bg-secondary p-0.5",
					role: "tablist",
					"aria-label": t("extensions.view_mode"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeButton, {
						active: mode === "preview",
						label: t("extensions.view_preview"),
						onClick: () => setMode("preview"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeButton, {
						active: mode === "source",
						label: t("extensions.view_source"),
						onClick: () => setMode("source"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { className: "h-4 w-4" })
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-[160px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTree, {
				className: "w-56 shrink-0 border-r border-border py-2",
				rootLabel,
				paths: files.map((f) => f.path),
				openPath,
				onOpen: setOpenPath
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-6 py-6 text-sm text-muted-foreground",
						children: t("common.loading")
					}),
					!loading && error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-6 py-6 text-sm text-destructive",
						children: error
					}),
					!loading && !error && !open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-6 py-6 text-sm text-muted-foreground",
						children: emptyLabel ?? t("extensions.no_files")
					}),
					!loading && !error && open && (mode === "preview" && isMarkdown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-h-[60vh] overflow-auto px-6 py-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownBody, { text: open.text })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pre", {
						className: "max-h-[60vh] overflow-auto whitespace-pre-wrap break-words px-6 py-5 font-mono text-meta ",
						children: [open.text, open.truncated ? "\n…" : ""]
					}))
				]
			})]
		})]
	});
}
function MarketplaceBadge({ publisher, compact = false, className }) {
	const label = translate("marketplace_origin.badge");
	const title = publisher ? `${translate("marketplace_origin.tooltip")} · ${publisher}` : translate("marketplace_origin.tooltip");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		title,
		"aria-label": title,
		className: cn("inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/30", "bg-primary/10 text-primary", compact ? "px-1.5 py-0.5" : "px-2 py-0.5", "text-micro font-medium uppercase tracking-wide", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, {
			className: "h-3 w-3",
			"aria-hidden": true
		}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
	});
}
var CustomApisView = (0, import_react.lazy)(() => __vitePreload(() => import("./CustomApisView-E3xVQzvb.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14])).then((module) => ({ default: module.CustomApisView })));
var REAUTH_EXPLANATION = {
	provider_rejected: "The provider no longer accepts this authorization",
	client_rejected: "The provider no longer accepts this app's OAuth client",
	client_missing: "Connected before Sam stored the OAuth client",
	rotation_lost: "A renewed token could not be saved, so it was retired",
	refresh_missing: "The access token expired and cannot be renewed automatically"
};
function retriesItself(reason) {
	return reason !== "rotation_lost" && reason !== "refresh_missing";
}
function flaggedAgo(stamp, now = Date.now()) {
	if (!stamp) return null;
	const then = Date.parse(stamp);
	if (Number.isNaN(then)) return null;
	const days = Math.floor(Math.max(0, now - then) / 864e5);
	if (days < 1) return "today";
	if (days === 1) return "yesterday";
	return `${days} days ago`;
}
function cachePluginStatus(queryClient, pluginId, status) {
	queryClient.setQueryData(["marketplace-plugins"], (catalog) => {
		if (!catalog) return catalog;
		let found = false;
		const plugins = catalog.plugins.map((plugin) => {
			if (plugin.id !== pluginId) return plugin;
			found = true;
			return {
				...plugin,
				status,
				reauth_reason: null,
				reauth_at: null,
				refresh_expires_at: null,
				...status === "not_connected" ? { live_callable: false } : {}
			};
		});
		if (!found) return catalog;
		return {
			...catalog,
			plugins,
			connected: plugins.filter((plugin) => plugin.status === "connected").length
		};
	});
}
function adapt(p) {
	return {
		id: p.id,
		name: p.display_name,
		description: p.description,
		category: p.category,
		logoSlug: p.logo_slug,
		logoColor: p.logo_color ?? void 0,
		logoUrl: p.logo_url ?? void 0,
		authMode: p.auth.mode,
		authConfig: p.auth,
		status: p.status,
		featured: p.featured ?? false,
		liveCallable: p.live_callable ?? false,
		unavailableReason: p.unavailable_reason ?? void 0,
		longevity: p.longevity ?? "self_renewing",
		longevityNote: p.longevity_note ?? void 0,
		acceptance: p.acceptance ?? "preview",
		oauthClientFamily: p.oauth_client_family ?? void 0,
		reauthReason: p.reauth_reason ?? void 0,
		reauthAt: p.reauth_at ?? void 0,
		refreshExpiresAt: p.refresh_expires_at ?? void 0,
		oauthClientConfigured: p.oauth_client_configured ?? false,
		fallbackAuth: p.fallback_auth != null && typeof p.fallback_auth === "object" ? p.fallback_auth : null,
		browserReady: p.auth_standard?.ready ?? p.oauth_client_configured ?? false,
		fromMarketplace: p.source === "community",
		selfUploaded: p.source === "local",
		publisher: p.publisher ?? void 0,
		sourceUrl: p.source_url ?? void 0,
		mcpUrl: typeof p.mcp_server?.url === "string" ? p.mcp_server.url : void 0
	};
}
var DEFAULT_BRAND_TILE = "#3F3F46";
function brandTile(p) {
	const raw = (p.logoColor ?? "").trim();
	if (!raw) return DEFAULT_BRAND_TILE;
	return raw.startsWith("#") ? raw : `#${raw}`;
}
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
function resolveLogoUrl(p) {
	const bundled = p.id ? bundledPluginLogo(p.id) : void 0;
	if (bundled) return bundled;
	if (p.logoUrl) return p.logoUrl;
	return `https://cdn.simpleicons.org/${p.logoSlug}/${glyphColor(brandTile(p))}`;
}
function isFullColourMark(p) {
	return Boolean(p.id && bundledPluginLogo(p.id) || p.logoUrl);
}
var LONGEVITY_LABEL = {
	permanent: "Stays connected",
	self_renewing: "Renews itself",
	provider_limited: "Sign in again periodically"
};
async function fetchCatalog() {
	const res = await fetch("/api/marketplace/plugins", { cache: "no-store" });
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json();
}
var AUTH_LABELS = {
	instance_browser: "Browser Login",
	local: "Local device",
	oauth_device_flow: "Device Flow",
	pat_paste: "Access Token",
	hosted_mcp_oauth_dcr: "One-Click",
	oauth_pkce_loopback: "Browser Login",
	hosted_mcp_allowlist: "Allowlist",
	hosted_mcp_open: "No sign-in"
};
var OAUTH_CLIENT_FAMILY_FALLBACK = {
	gmail: "google",
	google_drive: "google",
	google_calendar: "google",
	slack: "slack",
	asana: "asana"
};
var OAUTH_FAMILY_LABEL = {
	google: "Google",
	slack: "Slack",
	asana: "Asana",
	microsoft: "Microsoft",
	spotify: "Spotify",
	github: "GitHub",
	gitlab: "GitLab",
	figma: "Figma",
	hubspot: "HubSpot"
};
function oauthClientFamily(plugin) {
	const family = plugin.oauthClientFamily ?? OAUTH_CLIENT_FAMILY_FALLBACK[plugin.id];
	if (!family) return void 0;
	return {
		family,
		label: OAUTH_FAMILY_LABEL[family] ?? family[0].toUpperCase() + family.slice(1)
	};
}
var OAUTH_CLIENT_CONSOLE = {
	microsoft: "https://entra.microsoft.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade",
	x: "https://developer.x.com/portal/dashboard",
	linkedin: "https://www.linkedin.com/developers/apps",
	zoom: "https://marketplace.zoom.us/develop/create",
	salesforce: "https://help.salesforce.com/s/articleView?id=sf.external_client_apps.htm&type=5",
	google: "https://console.cloud.google.com/auth/clients",
	slack: "https://api.slack.com/apps",
	asana: "https://app.asana.com/0/my-apps",
	spotify: "https://developer.spotify.com/dashboard",
	github: "https://github.com/settings/applications/new",
	gitlab: "https://gitlab.com/-/profile/applications",
	figma: "https://www.figma.com/developers/apps",
	hubspot: "https://developers.hubspot.com/"
};
var OAUTH_CLIENT_ID_PLACEHOLDER = {
	google: "…apps.googleusercontent.com",
	spotify: "32-character id from the app's settings",
	slack: "1234567890123.1234567890123",
	asana: "1234567890123456",
	github: "Iv1.… from the OAuth App settings",
	gitlab: "64-character application id",
	figma: "client id from the app's settings",
	hubspot: "UUID from the app's Auth settings"
};
var OAUTH_NO_SECRET_NEEDED = {
	microsoft: "not needed for a public/native app",
	x: "not needed for a Native App",
	spotify: "not needed — leave this empty",
	google: "usually not needed",
	github: "not needed — leave this empty",
	gitlab: "usually not needed",
	figma: "usually not needed"
};
function loopbackRedirectUri(plugin) {
	if (plugin.authMode !== "oauth_pkce_loopback") return void 0;
	const auth = plugin.authConfig;
	const port = typeof auth?.callback_port === "number" ? auth.callback_port : 0;
	if (!port) return void 0;
	return `http://127.0.0.1:${port}${typeof auth?.callback_path === "string" ? auth.callback_path : "/oauth/callback"}`;
}
function orderedCategories(catalog, plugins) {
	const declared = catalog?.category_order ?? [];
	const present = new Set(plugins.map((p) => p.category));
	const known = declared.filter((c) => present.has(c));
	const extra = [...present].filter((c) => !declared.includes(c)).sort();
	return [...known, ...extra];
}
function matchesQuery(plugin, query) {
	const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
	if (words.length === 0) return true;
	const haystack = [
		plugin.name,
		plugin.description,
		plugin.category,
		plugin.id,
		oauthClientFamily(plugin)?.label ?? ""
	].join(" ").toLowerCase();
	return words.every((word) => haystack.includes(word));
}
function matchesNamePrefix(plugin, query) {
	const normalized = query.trim().toLowerCase();
	if (normalized.length === 0) return true;
	if (plugin.name.toLowerCase().startsWith(normalized)) return true;
	if (plugin.id.toLowerCase().startsWith(normalized)) return true;
	const family = oauthClientFamily(plugin)?.label.toLowerCase() ?? "";
	if (family && family.startsWith(normalized)) return true;
	return false;
}
function sortPluginsByName(a, b) {
	return a.name.localeCompare(b.name, void 0, { sensitivity: "base" });
}
var WINDOW_CATEGORY_ORDER = [
	"Calendar & Mail",
	"Files & Photos",
	"Knowledge & Reading",
	"Messaging",
	"Lists & Tasks",
	"Developer",
	"Media & Creativity",
	"Home & Devices"
];
function PluginsView({ inDialog = false } = {}) {
	const qc = useQueryClient();
	const setActiveSection = useEventStore((s) => s.setActiveSection);
	const [view, setView] = (0, import_react.useState)("list");
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [listFilter, setListFilter] = (0, import_react.useState)(inDialog ? "recommended" : "all");
	const [addMode, setAddMode] = (0, import_react.useState)(null);
	const [removingPlugin, setRemovingPlugin] = (0, import_react.useState)(null);
	const pushToast = useEventStore((s) => s.pushToast);
	useLocaleChunk("marketplace");
	(0, import_react.useEffect)(() => {
		const focus = takePluginFocus();
		if (focus) setSelectedId(focus);
	}, []);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [connectingPlugin, setConnectingPlugin] = (0, import_react.useState)(null);
	const [instancePlugin, setInstancePlugin] = (0, import_react.useState)(null);
	const [connectFailure, setConnectFailure] = (0, import_react.useState)(null);
	const [pkceSetupPlugin, setPkceSetupPlugin] = (0, import_react.useState)(null);
	const [disconnectingPlugin, setDisconnectingPlugin] = (0, import_react.useState)(null);
	const { data, isLoading, error, refetch, isFetching } = useQuery({
		queryKey: ["marketplace-plugins"],
		queryFn: fetchCatalog,
		refetchInterval: 3e4
	});
	const publishPluginStatus = (pluginId, status) => {
		cachePluginStatus(qc, pluginId, status);
		qc.refetchQueries({ queryKey: ["marketplace-plugins"] });
	};
	const connectMutation = useMutation({
		mutationFn: async ({ pluginId, token, allowedUserId, instanceUrl }) => {
			const body = { token };
			if (allowedUserId != null) body.allowed_user_id = allowedUserId;
			if (instanceUrl) body.instance_url = instanceUrl;
			const res = await fetch(`/api/marketplace/plugins/${pluginId}/connect/pat`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body)
			});
			if (!res.ok) {
				const err = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }));
				throw new Error(err.detail || `connect failed (HTTP ${res.status})`);
			}
			return res.json();
		},
		onSuccess: (_result, variables) => {
			publishPluginStatus(variables.pluginId, "connected");
			setConnectingPlugin(null);
		}
	});
	const disconnectMutation = useMutation({
		mutationFn: async (pluginId) => {
			const res = await fetch(`/api/marketplace/plugins/${pluginId}`, { method: "DELETE" });
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			return res.json();
		},
		onSuccess: (_result, pluginId) => {
			publishPluginStatus(pluginId, "not_connected");
			setDisconnectingPlugin(null);
		}
	});
	const oauthStart = useMutation({ mutationFn: async ({ pluginId, instanceUrl }) => {
		const res = await fetch(`/api/marketplace/plugins/${pluginId}/connect/start`, instanceUrl ? {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ instance_url: instanceUrl })
		} : { method: "POST" });
		if (!res.ok) {
			const err = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }));
			throw new Error(err.error_code ?? err.error ?? err.detail ?? `HTTP ${res.status}`);
		}
		return res.json();
	} });
	const [oauthSession, setOauthSession] = (0, import_react.useState)(null);
	const [deviceSession, setDeviceSession] = (0, import_react.useState)(null);
	const startOAuthFlow = async (p, instanceUrl) => {
		setConnectFailure(null);
		try {
			const r = await oauthStart.mutateAsync({
				pluginId: p.id,
				instanceUrl
			});
			if (r.kind === "local") {
				await qc.invalidateQueries({ queryKey: ["marketplace-plugins"] });
				return true;
			}
			if (r.kind === "device_flow") {
				const verifyUrl = r.verification_uri;
				const verifyUrlComplete = r.verification_uri_complete;
				const userCode = r.user_code;
				if (!verifyUrl || !userCode) {
					setConnectFailure("The sign-in session could not be created. Please try again.");
					return false;
				}
				if (verifyUrlComplete) await openExternalUrl(verifyUrlComplete);
				setDeviceSession({
					flowId: r.flow_id,
					pluginId: r.plugin_id,
					pluginName: p.name,
					userCode,
					verificationUri: verifyUrl,
					verificationUriComplete: verifyUrlComplete ?? null,
					expiresAtMs: r.expires_at_ms
				});
				return true;
			}
			if (!r.open_url) {
				setConnectFailure("The sign-in page is unavailable. Please try again.");
				return false;
			}
			await openExternalUrl(r.open_url);
			setOauthSession({
				flowId: r.flow_id,
				pluginId: r.plugin_id,
				pluginName: p.name,
				openUrl: r.open_url,
				redirectUri: r.redirect_uri ?? null
			});
			return true;
		} catch (e) {
			const code = e instanceof Error ? e.message : "connect_failed";
			setConnectFailure({
				denied: "Sign-in was declined. You can try again when ready.",
				timeout: "Sign-in timed out. Please try again.",
				provider_unreachable: "The provider could not be reached. Please try again later.",
				port_in_use: "The sign-in callback is busy. Close the other sign-in attempt and try again.",
				misconfigured: "Browser sign-in is pending publisher setup. No developer setup is required from you."
			}[code] ?? code);
			return false;
		}
	};
	const cancelOAuthSession = (session) => {
		fetch(`/api/marketplace/plugins/${session.pluginId}/connect/${session.flowId}`, { method: "DELETE" }).catch(() => void 0).finally(() => {
			qc.invalidateQueries({ queryKey: ["marketplace-plugins"] });
		});
	};
	const openFallback = (p, notice) => {
		if (!p.fallbackAuth) return;
		setConnectingPlugin({
			...p,
			authMode: "pat_paste",
			authConfig: {
				...p.fallbackAuth,
				mode: "pat_paste"
			},
			fallbackNotice: notice ?? "Browser login needs the publisher client, which isn't provisioned yet — you can connect with a token meanwhile."
		});
	};
	const handleConnect = async (p) => {
		setConnectFailure(null);
		if (p.unavailableReason) return;
		if (p.authMode === "instance_browser") {
			setInstancePlugin(p);
			return;
		}
		if (p.authMode === "pat_paste") {
			setConnectingPlugin(p);
			return;
		}
		if ((p.authMode === "oauth_pkce_loopback" || p.authMode === "oauth_device_flow") && !p.browserReady) {
			setPkceSetupPlugin(p);
			return;
		}
		if (p.authMode === "hosted_mcp_oauth_dcr" || p.authMode === "hosted_mcp_open" || p.authMode === "local" || p.authMode === "oauth_device_flow" || p.authMode === "oauth_pkce_loopback") {
			await startOAuthFlow(p);
			return;
		}
		setConnectFailure("This connection is pending publisher setup. Please try again when browser sign-in is available.");
	};
	const allPlugins = (0, import_react.useMemo)(() => data?.plugins.map(adapt) ?? [], [data]);
	const handleDisconnect = (id) => setDisconnectingPlugin(allPlugins.find((p) => p.id === id) ?? null);
	const handleFreshInstall = async (pluginId) => {
		setView("list");
		setListFilter("installed");
		try {
			const fresh = await fetchCatalog();
			qc.setQueryData(["marketplace-plugins"], fresh);
			const found = fresh.plugins.map(adapt).find((p) => p.id === pluginId);
			if (found) {
				await handleConnect(found);
				return;
			}
		} catch {}
		qc.refetchQueries({ queryKey: ["marketplace-plugins"] });
	};
	const categoryOrder = (0, import_react.useMemo)(() => orderedCategories(data, allPlugins), [data, allPlugins]);
	const installed = (0, import_react.useMemo)(() => allPlugins.filter((p) => p.status === "connected" || p.status === "needs_reauth" || p.status === "error" || p.fromMarketplace || p.selfUploaded), [allPlugins]);
	const connectedCount = (0, import_react.useMemo)(() => allPlugins.filter((p) => p.status === "connected").length, [allPlugins]);
	const attentionPlugins = (0, import_react.useMemo)(() => allPlugins.filter((p) => p.status === "needs_reauth" || p.status === "error"), [allPlugins]);
	const visible = (0, import_react.useMemo)(() => {
		const base = listFilter === "recommended" ? allPlugins.filter((p) => p.featured || p.status === "connected") : listFilter === "installed" ? installed : listFilter === "attention" ? attentionPlugins : allPlugins;
		const inCategory = (p) => filter === "all" || p.category === filter;
		const trimmed = query.trim();
		if (trimmed !== "") {
			const candidates = base.filter(inCategory);
			const prefixed = candidates.filter((p) => matchesNamePrefix(p, trimmed));
			if (prefixed.length > 0) return [...prefixed].sort(sortPluginsByName);
			return candidates.filter((p) => matchesQuery(p, trimmed)).sort(sortPluginsByName);
		}
		const order = inDialog ? [...WINDOW_CATEGORY_ORDER, ...categoryOrder] : categoryOrder;
		return [...base].sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category) || (inDialog ? a.name.localeCompare(b.name) : 0)).filter((p) => {
			if (filter !== "all" && p.category !== filter) return false;
			return true;
		});
	}, [
		listFilter,
		query,
		filter,
		allPlugins,
		installed,
		attentionPlugins,
		categoryOrder,
		inDialog
	]);
	const filtersActive = query.trim() !== "" || filter !== "all";
	const resetFilters = () => {
		setQuery("");
		setFilter("all");
	};
	const closeSearch = () => {
		resetFilters();
		setSearchOpen(false);
	};
	const selectedPlugin = selectedId ? allPlugins.find((p) => p.id === selectedId) ?? null : null;
	const dialogs = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		connectFailure && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "alertdialog",
			"aria-modal": "true",
			"aria-label": "Connection unavailable",
			className: "fixed inset-0 z-[60] flex items-center justify-center bg-scrim/70",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-md rounded-lg bg-popover p-5 text-sm text-foreground shadow-float",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Connection unavailable"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2",
						children: connectFailure
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setConnectFailure(null),
						className: "mt-4 rounded-md border border-border px-3 py-1.5",
						children: "Close"
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddConnectorDialog, {
			open: addMode === "connector",
			onClose: () => setAddMode(null),
			tabs: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddPluginTabs, {
				mode: "connector",
				onChange: setAddMode
			}),
			onAdded: (result) => {
				setAddMode(null);
				pushToast("success", fill(translate("custom_connector.added"), { name: result.plugin.display_name }));
				handleFreshInstall(result.plugin.id);
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginUploadDialog, {
			open: addMode === "folder",
			onClose: () => setAddMode(null),
			tabs: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddPluginTabs, {
				mode: "folder",
				onChange: setAddMode
			}),
			onInstalled: (id) => {
				setAddMode(null);
				handleFreshInstall(id);
			}
		}),
		removingPlugin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RemovePluginDialog, {
			plugin: removingPlugin,
			onCancel: () => setRemovingPlugin(null),
			onRemoved: () => {
				const name = removingPlugin.name;
				setRemovingPlugin(null);
				setSelectedId(null);
				pushToast("success", fill(translate("custom_connector.removed"), { name }));
				qc.refetchQueries({ queryKey: ["marketplace-plugins"] });
			}
		}),
		connectingPlugin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatConnectDialog, {
			plugin: connectingPlugin,
			notice: connectingPlugin.fallbackNotice ?? null,
			onClose: () => {
				setConnectingPlugin(null);
				connectMutation.reset();
			},
			onSubmit: (token, allowedUserId, instanceUrl) => connectMutation.mutate({
				pluginId: connectingPlugin.id,
				token,
				allowedUserId,
				instanceUrl
			}),
			isPending: connectMutation.isPending,
			errorMessage: connectMutation.error instanceof Error ? connectMutation.error.message : null
		}),
		instancePlugin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstanceBrowserDialog, {
			plugin: instancePlugin,
			isPending: oauthStart.isPending,
			onClose: () => setInstancePlugin(null),
			onSubmit: async (url) => {
				if (await startOAuthFlow(instancePlugin, url)) setInstancePlugin(null);
			}
		}),
		pkceSetupPlugin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PkceConnectDialog, {
			plugin: pkceSetupPlugin,
			onClose: () => setPkceSetupPlugin(null),
			onProceed: () => startOAuthFlow(pkceSetupPlugin),
			onUseFallback: pkceSetupPlugin.fallbackAuth ? () => {
				const cur = pkceSetupPlugin;
				setPkceSetupPlugin(null);
				openFallback(cur);
			} : null
		}),
		disconnectingPlugin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisconnectConfirmDialog, {
			plugin: disconnectingPlugin,
			isPending: disconnectMutation.isPending,
			onCancel: () => {
				setDisconnectingPlugin(null);
				disconnectMutation.reset();
			},
			onConfirm: () => disconnectMutation.mutate(disconnectingPlugin.id),
			errorMessage: disconnectMutation.error instanceof Error ? disconnectMutation.error.message : null
		}),
		oauthSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OAuthRedirectDialog, {
			flowId: oauthSession.flowId,
			pluginId: oauthSession.pluginId,
			pluginName: oauthSession.pluginName,
			openUrl: oauthSession.openUrl,
			redirectUri: oauthSession.redirectUri,
			onClose: () => {
				cancelOAuthSession(oauthSession);
				setOauthSession(null);
			},
			onSuccess: () => {
				setOauthSession(null);
			}
		}),
		deviceSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeviceCodeDialog, {
			flowId: deviceSession.flowId,
			pluginId: deviceSession.pluginId,
			pluginName: deviceSession.pluginName,
			userCode: deviceSession.userCode,
			verificationUri: deviceSession.verificationUri,
			verificationUriComplete: deviceSession.verificationUriComplete,
			expiresAtMs: deviceSession.expiresAtMs,
			onClose: () => {
				cancelOAuthSession(deviceSession);
				setDeviceSession(null);
			},
			onSuccess: () => {
				setDeviceSession(null);
			}
		})
	] });
	const shell = (content) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col bg-transparent",
		children: [inDialog && view === "list" && !selectedId ? content : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
			className: "flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("mx-auto w-full max-w-4xl px-8 py-6", inDialog && (view === "custom-apis" ? "px-6 pt-5" : "pt-12")),
				children: content
			})
		}), dialogs]
	});
	if (view === "custom-apis") return shell(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: translate("custom_apis.loading") }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomApisView, { onBack: () => setView("list") })
	}));
	if (view === "community") return shell(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {
		label: translate("plugins_view.title"),
		onClick: () => setView("list")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommunityTab, { onInstalled: (name) => void handleFreshInstall(name) })
	})] }));
	if (selectedId) return shell(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {
		label: translate("plugins_view.title"),
		onClick: () => setSelectedId(null)
	}), selectedPlugin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginDetail, {
		plugin: selectedPlugin,
		onConnect: handleConnect,
		onDisconnect: handleDisconnect,
		onRemove: setRemovingPlugin
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-6 text-sm text-muted-foreground",
		children: isLoading ? translate("plugins_view.loading") : translate("plugins_view.not_found")
	})] }));
	const subtitle = isLoading ? translate("plugins_view.loading") : error ? translate("plugins_view.unreachable") : fill(translate("plugins_view.count"), {
		n: allPlugins.length,
		connected: connectedCount
	});
	if (inDialog) return shell(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginWindowCatalog, {
		plugins: visible,
		installed,
		total: allPlugins.length,
		listFilter,
		onListFilter: (value) => {
			setListFilter(value);
			setFilter("all");
		},
		query,
		onQuery: (value) => {
			setQuery(value);
			if (value.trim()) setListFilter("all");
		},
		category: filter,
		categories: categoryOrder,
		onCategory: (value) => {
			setFilter(value);
			setListFilter("all");
		},
		loading: isLoading,
		error: error instanceof Error ? error.message : null,
		refreshing: isFetching,
		onRefresh: () => void refetch(),
		onBrowse: () => setView("community"),
		onAdd: setAddMode,
		onCustomApis: () => setView("custom-apis"),
		onOpen: setSelectedId,
		onConnect: handleConnect,
		onDisconnect: handleDisconnect,
		onReset: () => {
			resetFilters();
			setListFilter("all");
		},
		attention: attentionPlugins.length,
		subtitle
	}));
	return shell(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
			title: translate("plugins_view.title"),
			subtitle,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
					label: translate("plugins_view.search_placeholder"),
					active: searchOpen,
					onClick: () => searchOpen ? closeSearch() : setSearchOpen(true),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
					label: translate("plugins_view.refresh"),
					onClick: () => void refetch(),
					busy: isFetching && !data,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoftButton, {
					onClick: () => setView("community"),
					className: "ml-1",
					children: translate("plugins_view.browse")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoftButton, {
					onClick: () => setView("custom-apis"),
					children: translate("custom_apis.title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionMenu, {
					label: translate("plugins_view.add"),
					actions: [
						{
							id: "connector",
							label: translate("custom_connector.menu_connector"),
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "h-3.5 w-3.5" }),
							onSelect: () => setAddMode("connector")
						},
						{
							id: "upload",
							label: translate("custom_connector.menu_folder"),
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderUp, { className: "h-3.5 w-3.5" }),
							onSelect: () => setAddMode("folder")
						},
						{
							id: "community",
							label: translate("plugins_view.add_community"),
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-3.5 w-3.5" }),
							separatorAbove: true,
							onSelect: () => setView("community")
						},
						{
							id: "marketplace",
							label: translate("plugins_view.add_marketplace"),
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" }),
							separatorAbove: true,
							onSelect: () => setActiveSection("marketplace")
						}
					],
					trigger: ({ open, toggle }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPill, {
						open,
						toggle,
						children: translate("plugins_view.add")
					})
				})
			] })
		}),
		searchOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineSearch, {
					value: query,
					onChange: setQuery,
					placeholder: translate("plugins_view.search_placeholder"),
					autoFocus: true
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
				label: translate("common.close"),
				onClick: closeSearch,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedFilter, {
				label: translate("plugins_view.filter_label"),
				value: listFilter,
				onChange: setListFilter,
				options: [
					{
						id: "all",
						label: translate("plugins_view.filter_all"),
						count: allPlugins.length
					},
					{
						id: "installed",
						label: translate("plugins_view.filter_installed"),
						count: installed.length
					},
					...attentionPlugins.length > 0 ? [{
						id: "attention",
						label: translate("plugins_view.filter_attention"),
						count: attentionPlugins.length
					}] : []
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ml-auto flex items-center gap-2",
				children: [filtersActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-micro text-muted-foreground",
					children: fill(translate("plugins_view.matches"), { n: visible.length })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: resetFilters,
					className: "text-micro text-muted-foreground underline-offset-2 hover:text-foreground hover:underline",
					children: translate("plugins_view.clear_filters")
				})] }), categoryOrder.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedSelect, {
					value: filter,
					onValueChange: (v) => setFilter(v || "all"),
					ariaLabel: translate("plugins_view.col_category"),
					className: "h-7 w-auto rounded-md px-2 py-0 text-micro",
					options: [{
						value: "all",
						label: translate("plugins_view.all_categories")
					}, ...categoryOrder.map((c) => ({
						value: c,
						label: c
					}))]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttentionBanner, {
					plugins: attentionPlugins,
					onJump: () => {
						const target = attentionPlugins[0];
						if (target) setSelectedId(target.id);
					}
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg bg-secondary p-3 text-sm text-destructive",
					children: error.message
				}),
				!error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginTable, {
					plugins: visible,
					loading: isLoading,
					filtersActive: filtersActive || listFilter !== "all",
					onOpen: (id) => setSelectedId(id),
					onConnect: handleConnect,
					onDisconnect: handleDisconnect,
					onReset: () => {
						resetFilters();
						setListFilter("all");
					}
				})
			]
		})
	] }));
}
function PluginWindowCatalog({ plugins, installed, total, listFilter, onListFilter, query, onQuery, category, categories, onCategory, loading, error, refreshing, onRefresh, onBrowse, onAdd, onCustomApis, onOpen, onConnect, onDisconnect, onReset, attention, subtitle }) {
	const tabs = [
		{
			id: "all",
			label: translate("plugins_view.filter_all"),
			count: total
		},
		{
			id: "recommended",
			label: translate("plugins_view.filter_recommended")
		},
		{
			id: "installed",
			label: translate("plugins_view.filter_installed"),
			count: installed.length
		},
		...attention ? [{
			id: "attention",
			label: translate("plugins_view.filter_attention"),
			count: attention
		}] : []
	];
	const grouped = listFilter === "all" && !query.trim() && category === "all";
	const heading = query.trim() ? fill(translate("plugins_view.matches"), { n: plugins.length }) : category !== "all" ? category : tabs.find((tab) => tab.id === listFilter)?.label;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "shrink-0 px-5 pb-4 pt-7 sm:px-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 pr-9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold tracking-tight text-foreground-strong",
					children: translate("plugins_view.title")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
							label: translate("plugins_view.refresh"),
							onClick: onRefresh,
							busy: refreshing,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoftButton, {
							onClick: onBrowse,
							children: translate("plugins_view.browse")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoftButton, {
							onClick: onCustomApis,
							children: translate("custom_apis.title")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionMenu, {
							label: translate("plugins_view.add"),
							actions: [{
								id: "connector",
								label: translate("custom_connector.menu_connector"),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "h-3.5 w-3.5" }),
								onSelect: () => onAdd("connector")
							}, {
								id: "upload",
								label: translate("custom_connector.menu_folder"),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderUp, { className: "h-3.5 w-3.5" }),
								onSelect: () => onAdd("folder")
							}],
							trigger: ({ open, toggle }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
								label: translate("plugins_view.add"),
								onClick: toggle,
								active: open,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "sr-only",
				children: subtitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onListFilter("installed"),
				className: "my-4 flex max-w-full items-center gap-3 rounded-lg py-1 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				children: [
					installed.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex -space-x-2",
						"aria-hidden": true,
						children: installed.slice(0, 4).map((plugin) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandTile, {
							plugin,
							size: "sm"
						}, plugin.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						installed.length,
						" ",
						translate("plugins_view.filter_installed").toLocaleLowerCase()
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "h-3.5 w-3.5",
						"aria-hidden": true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex h-10 items-center gap-2 rounded-xl border border-border/70 bg-secondary px-3 text-muted-foreground focus-within:ring-2 focus-within:ring-ring",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					className: "h-4 w-4 shrink-0",
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "search",
					value: query,
					onChange: (event) => onQuery(event.target.value),
					placeholder: translate("plugins_view.search_placeholder"),
					"aria-label": translate("plugins_view.search_placeholder"),
					className: "min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					role: "tablist",
					"aria-label": translate("plugins_view.filter_label"),
					className: "flex flex-wrap gap-1.5",
					children: tabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "tab",
						"aria-selected": listFilter === tab.id && category === "all",
						onClick: () => onListFilter(tab.id),
						className: cn("rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", listFilter === tab.id && category === "all" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"),
						children: [tab.label, tab.count !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1.5 opacity-65",
							children: tab.count
						})]
					}, tab.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedSelect, {
					value: category,
					onValueChange: onCategory,
					ariaLabel: translate("plugins_view.col_category"),
					testId: "plugin-window-category",
					className: "h-8 w-auto max-w-full rounded-full bg-secondary px-3 text-xs",
					options: [{
						value: "all",
						label: translate("plugins_view.all_categories")
					}, ...[...categories].sort((a, b) => WINDOW_CATEGORY_ORDER.indexOf(a) - WINDOW_CATEGORY_ORDER.indexOf(b)).map((name) => ({
						value: name,
						label: name
					}))]
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
		className: "min-h-0 flex-1",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 pb-6 sm:px-6",
			children: [
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					role: "alert",
					className: "rounded-xl bg-secondary p-4 text-sm text-destructive",
					children: error
				}),
				loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "status",
					className: "p-4 text-sm text-muted-foreground",
					children: translate("plugins_view.loading")
				}),
				!error && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					!grouped && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "px-2 pb-3 pt-2 text-sm font-semibold text-foreground-strong",
						children: heading
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						"aria-label": translate("plugins_view.title"),
						children: plugins.map((plugin, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [grouped && (index === 0 || plugins[index - 1].category !== plugin.category) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: cn("px-2 pb-2 text-sm font-semibold text-foreground-strong", index ? "pt-5" : "pt-2"),
							children: plugin.category
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group flex min-h-[76px] items-center gap-3 rounded-xl px-2 py-3 hover:bg-secondary/70",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => onOpen(plugin.id),
								"aria-label": plugin.name,
								className: "flex min-w-0 flex-1 items-center gap-3.5 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandTile, {
									plugin,
									size: "window"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate text-[15px] font-medium leading-6 text-foreground-strong",
											children: plugin.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate text-[13px] leading-5 text-muted-foreground",
											title: plugin.description,
											children: plugin.description
										}),
										plugin.unavailableReason && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-xs text-muted-foreground",
											title: plugin.unavailableReason,
											children: "Unsupported on this device"
										}),
										plugin.status === "needs_reauth" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-xs text-warning",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReauthExplanation, {
												plugin,
												inline: true
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrantExpiry, { plugin })
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindowConnectButton, {
								plugin,
								onConnect,
								onDisconnect
							})]
						})] }, plugin.id))
					}),
					plugins.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-12 text-center text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: translate("plugins_view.no_hits") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onReset,
							className: "mt-3 underline underline-offset-4",
							children: translate("plugins_view.show_all")
						})]
					})
				] })
			]
		})
	})] });
}
function WindowConnectButton({ plugin, onConnect, onDisconnect }) {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const connected = plugin.status === "connected";
	const reconnect = plugin.status === "needs_reauth" || plugin.status === "error";
	const act = async () => {
		if (busy) return;
		setBusy(true);
		try {
			if (connected) await onDisconnect(plugin.id);
			else await onConnect(plugin);
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		disabled: busy || Boolean(plugin.unavailableReason),
		title: plugin.unavailableReason,
		onClick: () => void act(),
		"aria-label": translate(connected ? "plugins_view.disconnect" : reconnect ? "plugins_view.reconnect" : "plugins_view.connect"),
		className: cn("flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50", connected ? "text-muted-foreground hover:bg-secondary" : "bg-secondary text-foreground hover:bg-accent-soft"),
		children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : connected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 text-success" }) : reconnect ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-3.5 w-3.5" }) : null, translate(connected ? "plugins_view.status_connected" : reconnect ? "plugins_view.reconnect" : "plugins_view.connect")]
	});
}
function statusTone(status) {
	switch (status) {
		case "connected": return "ok";
		case "needs_reauth": return "warn";
		case "error": return "error";
		default: return "off";
	}
}
function statusLabel(plugin) {
	if (plugin.unavailableReason) return "Unsupported on this device";
	switch (plugin.status) {
		case "connected": return plugin.liveCallable ? `${translate("plugins_view.status_connected")} · ${translate("plugins_view.status_live")}` : translate("plugins_view.status_connected");
		case "needs_reauth": return translate("plugins_view.status_reauth");
		case "error": return translate("plugins_view.status_error");
		default: return translate("plugins_view.status_not_connected");
	}
}
function PluginTable({ plugins, loading, filtersActive, onOpen, onConnect, onDisconnect, onReset }) {
	const columns = [
		{
			id: "plugin",
			label: translate("plugins_view.col_plugin")
		},
		{
			id: "category",
			label: translate("plugins_view.col_category"),
			width: "150px"
		},
		{
			id: "status",
			label: translate("plugins_view.col_status"),
			width: "180px"
		},
		{
			id: "action",
			label: translate("plugins_view.col_action"),
			width: "36px",
			srOnly: true,
			align: "right"
		}
	];
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "py-8 text-center text-sm text-muted-foreground",
		children: translate("plugins_view.loading")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
		label: translate("plugins_view.title"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { columns }),
			plugins.map((plugin) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginTableRow, {
				plugin,
				columns,
				onOpen: () => onOpen(plugin.id),
				onConnect,
				onDisconnect
			}, plugin.id)),
			plugins.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EmptyRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: filtersActive ? translate("plugins_view.no_hits") : translate("plugins_view.empty") }), filtersActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onReset,
				className: "mt-3 text-xs text-foreground-strong hover:underline",
				children: translate("plugins_view.show_all")
			})] })
		]
	});
}
function PluginTableRow({ plugin, columns, onOpen, onConnect, onDisconnect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
		id: `plugin-row-${plugin.id}`,
		columns,
		onClick: onOpen,
		ariaLabel: plugin.name,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				title: plugin.description,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandTile, {
					plugin,
					size: "sm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-title font-medium",
									children: plugin.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewBadge, { plugin }),
								plugin.fromMarketplace && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketplaceBadge, { publisher: plugin.publisher }),
								plugin.selfUploaded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-secondary px-1.5 text-micro font-medium text-foreground",
									title: translate("plugin_upload.unreviewed"),
									children: translate("plugin_upload.self_badge")
								})
							]
						}),
						plugin.status === "needs_reauth" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 truncate text-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReauthExplanation, {
								plugin,
								inline: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrantExpiry, { plugin })
					]
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
				muted: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: plugin.category
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, {
				tone: statusTone(plugin.status),
				label: statusLabel(plugin)
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
				align: "right",
				stop: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectIconButton, {
					status: plugin.status,
					unavailableReason: plugin.unavailableReason,
					onConnect: () => onConnect(plugin),
					onDisconnect: () => onDisconnect(plugin.id)
				})
			})
		]
	});
}
async function fetchPluginFiles(pluginId) {
	const res = await fetch(`/api/marketplace/plugins/${encodeURIComponent(pluginId)}/files`, { cache: "no-store" });
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json();
}
function PluginDetail({ plugin, onConnect, onDisconnect, onRemove }) {
	const { busy, run } = useConnectLock(() => onConnect(plugin));
	const filesQuery = useQuery({
		queryKey: ["marketplace-plugin-files", plugin.id],
		queryFn: () => fetchPluginFiles(plugin.id)
	});
	const connected = plugin.status === "connected";
	const needsReconnect = plugin.status === "needs_reauth" || plugin.status === "error";
	const family = oauthClientFamily(plugin);
	const menuActions = [
		...plugin.sourceUrl ? [{
			id: "source",
			label: translate("plugins_view.view_source"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" }),
			onSelect: () => void openExternalUrl(plugin.sourceUrl ?? "")
		}] : [],
		...connected || needsReconnect ? [{
			id: "disconnect",
			label: translate("plugins_view.disconnect"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" }),
			destructive: true,
			separatorAbove: Boolean(plugin.sourceUrl),
			onSelect: () => onDisconnect(plugin.id)
		}] : [],
		...onRemove && (plugin.selfUploaded || plugin.fromMarketplace) ? [{
			id: "remove",
			label: translate("custom_connector.remove"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }),
			destructive: true,
			separatorAbove: Boolean(plugin.sourceUrl) || connected || needsReconnect,
			onSelect: () => onRemove(plugin)
		}] : []
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailHeader, {
				leading: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandTile, { plugin }),
				title: plugin.name,
				titleAccessory: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewBadge, { plugin }),
					plugin.fromMarketplace && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketplaceBadge, { publisher: plugin.publisher }),
					plugin.selfUploaded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-secondary px-1.5 text-micro font-medium text-foreground",
						title: translate("plugin_upload.unreviewed"),
						children: translate("plugin_upload.self_badge")
					})
				] }),
				byline: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, {
							tone: statusTone(plugin.status),
							label: statusLabel(plugin)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· ", plugin.category] }),
						plugin.publisher && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· ", fill(translate("plugins_view.by"), { publisher: plugin.publisher })] })
					]
				}),
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [connected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex h-8 items-center gap-1.5 rounded-md bg-secondary px-3 text-xs font-medium text-foreground-strong",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }), translate("plugins_view.status_connected")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoftButton, {
					onClick: () => void run(),
					disabled: busy || Boolean(plugin.unavailableReason),
					children: translate("plugins_view.reconnect")
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => void run(),
					disabled: busy || Boolean(plugin.unavailableReason),
					title: plugin.unavailableReason,
					"aria-busy": busy,
					className: cn("inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60", needsReconnect ? "bg-secondary text-foreground hover:bg-popover" : "bg-primary text-primary-foreground hover:bg-primary/90"),
					children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : needsReconnect ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), needsReconnect ? translate("plugins_view.reconnect") : translate("plugins_view.connect")]
				}), menuActions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionMenu, {
					label: translate("plugins_view.more_actions"),
					actions: menuActions,
					trigger: ({ open, toggle }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						label: translate("plugins_view.more_actions"),
						onClick: toggle,
						active: open,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-4 w-4" })
					})
				})] })
			}),
			plugin.unavailableReason && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: plugin.unavailableReason
			}),
			plugin.status === "needs_reauth" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 rounded-md bg-secondary px-3 py-2.5 text-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReauthExplanation, { plugin })
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrantExpiry, { plugin }),
			plugin.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClampedText, {
				className: "mt-4",
				text: plugin.description,
				moreLabel: translate("common.see_more"),
				lessLabel: translate("common.see_less")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-5 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FactRows, { rows: [
						{
							label: translate("plugins_view.col_status"),
							value: statusLabel(plugin)
						},
						{
							label: translate("plugins_view.fact_signin"),
							value: AUTH_LABELS[plugin.authMode]
						},
						{
							label: translate("plugins_view.fact_connection"),
							value: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: cn(plugin.longevity === "provider_limited" && "text-foreground"),
								children: [LONGEVITY_LABEL[plugin.longevity], plugin.longevityNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xs text-muted-foreground",
									children: plugin.longevityNote
								}) : null]
							})
						},
						{
							label: translate("plugins_view.fact_oauth_client"),
							value: family ? plugin.oauthClientConfigured ? fill(translate("plugins_view.oauth_client_own"), { family: family.label }) : "Browser sign-in is pending publisher setup. No developer setup is required from you." : null
						},
						{
							label: translate("custom_connector.fact_server"),
							value: plugin.selfUploaded && plugin.mcpUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "break-all font-mono text-meta",
								children: plugin.mcpUrl
							}) : null
						},
						{
							label: translate("plugins_view.fact_publisher"),
							value: plugin.publisher ?? null
						},
						{
							label: translate("plugins_view.fact_source"),
							value: plugin.selfUploaded ? translate("plugin_upload.unreviewed") : plugin.fromMarketplace ? translate("marketplace_origin.tooltip") : null
						}
					] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCard, {
				className: "mt-4",
				rootLabel: plugin.id,
				files: filesQuery.data?.files ?? [],
				loading: filesQuery.isPending,
				error: filesQuery.error ? filesQuery.error.message : null
			})
		]
	});
}
function AttentionBanner({ plugins, onJump }) {
	if (plugins.length === 0) return null;
	const names = plugins.map((p) => p.name);
	const one = plugins.length === 1;
	const headline = one ? `${names[0]} needs reconnecting` : `${plugins.length} connections need reconnecting`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4 flex items-center gap-3 rounded-lg bg-secondary px-3 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 shrink-0 text-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-meta font-medium text-foreground",
					children: headline
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-xs text-muted-foreground",
					children: one ? `${plugins[0].reauthReason && plugins[0].reauthReason in REAUTH_EXPLANATION ? REAUTH_EXPLANATION[plugins[0].reauthReason] : "The authorization stopped working"} — reconnect to keep it working.` : `Reconnect to keep them working: ${names.join(", ")}`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onJump,
				className: "inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md bg-secondary px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-popover",
				children: [one ? "Jump to it" : "Jump to first", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
			})
		]
	});
}
function BrandTile({ plugin, size = "md" }) {
	const [failed, setFailed] = (0, import_react.useState)(false);
	const tile = brandTile(plugin);
	const fullColour = isFullColourMark(plugin);
	const showMonogram = failed || !plugin.logoSlug;
	const small = size === "sm";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid shrink-0 place-items-center overflow-hidden rounded-lg border", small ? "h-7 w-7 rounded-md" : size === "window" ? "h-12 w-12 rounded-xl" : "h-10 w-10", fullColour && !showMonogram ? "bg-[hsl(var(--plugin-icon-surface))]" : "border-border/60"),
		style: fullColour && !showMonogram ? void 0 : { backgroundColor: tile },
		children: showMonogram ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("font-semibold", small ? "text-xs" : "text-sm"),
			style: { color: `#${glyphColor(tile)}` },
			children: plugin.name.slice(0, 1).toUpperCase()
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: resolveLogoUrl(plugin),
			alt: "",
			className: cn(fullColour ? small ? "h-5 w-5" : size === "window" ? "h-9 w-9" : "h-7 w-7" : small ? "h-3.5 w-3.5" : size === "window" ? "h-8 w-8" : "h-5 w-5", [
				"github",
				"vercel",
				"notion",
				"cal_com"
			].includes(plugin.id) && "invert"),
			loading: "lazy",
			onError: () => setFailed(true)
		})
	});
}
function PreviewBadge({ plugin }) {
	if (plugin.acceptance !== "preview" || plugin.fromMarketplace || plugin.selfUploaded) return null;
	const title = translate("plugins_view.preview_tooltip");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		title,
		"aria-label": title,
		className: "shrink-0 rounded-full border border-border px-1.5 text-micro font-medium text-muted-foreground",
		children: translate("plugins_view.preview_badge")
	});
}
function GrantExpiry({ plugin }) {
	const stamp = plugin.refreshExpiresAt;
	const end = stamp ? Date.parse(stamp) : NaN;
	if (plugin.status !== "connected" || !Number.isFinite(end)) return null;
	const expired = end <= Date.now();
	const date = new Date(end).toLocaleString();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("block text-xs", expired ? "text-warning" : "text-muted-foreground"),
		children: fill(translate(expired ? "plugins_view.grant_expired" : "plugins_view.grant_ends"), { date })
	});
}
function ReauthExplanation({ plugin, inline }) {
	const reason = plugin.reauthReason;
	const explanation = reason && reason in REAUTH_EXPLANATION ? REAUTH_EXPLANATION[reason] : "The authorization stopped working";
	const ago = flaggedAgo(plugin.reauthAt);
	const headline = ago ? `${explanation} · ${ago}` : explanation;
	const retrying = retriesItself(reason);
	const fix = plugin.longevity === "provider_limited" ? plugin.longevityNote : void 0;
	if (inline) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-foreground/90",
		children: headline
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "truncate text-xs text-foreground",
		title: retrying ? `${headline}. Sam retries this once a day; reconnect to fix it now.` : `${headline}. This one cannot be retried automatically — reconnect to fix it.`,
		children: headline
	}), fix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "truncate text-micro text-muted-foreground",
		title: fix,
		children: fix
	})] });
}
function useConnectLock(onConnect) {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const busyRef = (0, import_react.useRef)(false);
	const run = async () => {
		if (busyRef.current) return;
		busyRef.current = true;
		setBusy(true);
		try {
			await onConnect();
		} finally {
			busyRef.current = false;
			setBusy(false);
		}
	};
	return {
		busy,
		run
	};
}
function ConnectIconButton({ status, onConnect, onDisconnect, busy: busyFromRow, unavailableReason }) {
	const lock = useConnectLock(onConnect);
	const busy = busyFromRow ?? lock.busy;
	if (status === "connected") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: (e) => {
			e.stopPropagation();
			onDisconnect();
		},
		className: "grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-foreground-strong transition-colors hover:bg-popover hover:text-destructive",
		"aria-label": "Disconnect plugin",
		title: "Disconnect",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" })
	});
	const handleClick = (e) => {
		e.stopPropagation();
		lock.run();
	};
	if (status === "needs_reauth" || status === "error") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: handleClick,
		disabled: busy || Boolean(unavailableReason),
		"aria-busy": busy,
		className: cn("grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-foreground transition-all hover:bg-popover group-hover:scale-105", busy && "cursor-not-allowed opacity-60 group-hover:scale-100"),
		"aria-label": "Reconnect plugin",
		title: unavailableReason ?? "Reconnect",
		children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-3.5 w-3.5" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: handleClick,
		disabled: busy || Boolean(unavailableReason),
		"aria-busy": busy,
		className: cn("grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-all hover:border-border-strong hover:bg-secondary hover:text-foreground-strong group-hover:scale-105", busy && "cursor-not-allowed opacity-60 hover:bg-secondary hover:text-muted-foreground group-hover:scale-100"),
		title: unavailableReason,
		"aria-label": "Connect plugin",
		children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
	});
}
function CopyableUrl({ url, hint }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const copy = async () => {
		if (await robustCopy(url)) {
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1400);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full text-left",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-stretch gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "text",
				readOnly: true,
				value: url,
				onFocus: (e) => e.currentTarget.select(),
				"aria-label": "Authorization link",
				className: "min-w-0 flex-1 rounded-md border border-border bg-background px-2.5 py-1.5 font-mono text-micro text-muted-foreground focus:border-border-strong focus:outline-none"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: copy,
				className: "inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-card px-3 text-micro font-medium text-foreground transition-colors hover:border-border-strong hover:text-foreground-strong",
				title: "Copy link",
				children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3 text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3 w-3" }), copied ? "Copied" : "Copy"]
			})]
		}), hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1.5 text-micro text-muted-foreground",
			children: hint
		})]
	});
}
function usePublishConnectedPlugin(pluginId, state, onSuccess) {
	const qc = useQueryClient();
	const onSuccessRef = (0, import_react.useRef)(onSuccess);
	(0, import_react.useEffect)(() => {
		onSuccessRef.current = onSuccess;
	}, [onSuccess]);
	(0, import_react.useEffect)(() => {
		if (state !== "connected") return;
		cachePluginStatus(qc, pluginId, "connected");
		qc.refetchQueries({ queryKey: ["marketplace-plugins"] });
		const timer = window.setTimeout(() => onSuccessRef.current(), 800);
		return () => window.clearTimeout(timer);
	}, [
		pluginId,
		qc,
		state
	]);
}
function OAuthRedirectDialog({ flowId, pluginId, pluginName, openUrl, redirectUri, onClose, onSuccess }) {
	const poll = useQuery({
		queryKey: ["marketplace-oauth-poll", flowId],
		queryFn: async () => {
			const res = await fetch(`/api/marketplace/plugins/${pluginId}/connect/poll/${flowId}`, { cache: "no-store" });
			if (!res.ok) {
				const err = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }));
				throw new Error(err.detail || `poll failed (HTTP ${res.status})`);
			}
			return res.json();
		},
		refetchInterval: (q) => {
			const s = q.state.data?.state;
			return s === "connected" || s === "error" ? false : 1500;
		},
		refetchIntervalInBackground: true
	});
	usePublishConnectedPlugin(pluginId, poll.data?.state, onSuccess);
	const state = poll.data?.state ?? "pending";
	const errorMessage = state === "error" ? poll.data?.error ?? "Unknown error" : poll.error instanceof Error ? poll.error.message : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "dialog",
		"aria-modal": "true",
		className: "fixed inset-0 z-50 flex items-center justify-center bg-scrim/70 backdrop-blur-sm",
		onClick: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md overflow-hidden rounded-lg bg-popover shadow-float",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between border-b border-border px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-base font-semibold tracking-tight",
						children: ["Connecting ", pluginName]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-micro text-muted-foreground",
						children: "Browser login"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5 px-5 py-6",
					children: [
						state === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-4 py-4 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-foreground-strong" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-medium text-foreground",
									children: [
										"Authorize ",
										"Road Dog",
										" in your browser"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs leading-relaxed text-muted-foreground",
									children: [
										"Continue in the browser tab for ",
										pluginName,
										" — sign in if prompted, click \"Authorize\", then come back here. No tab visible? Open it again or copy the link below. The plugin stays \"Not connected\" until you finish there."
									]
								})] }),
								redirectUri && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full rounded-md border border-border bg-background px-3 py-2 text-left",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-micro text-muted-foreground",
											children: [
												"Waiting for ",
												pluginName,
												" to call back at"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											className: "mt-0.5 block select-all break-all font-mono text-micro text-foreground",
											children: redirectUri
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-micro text-muted-foreground",
											children: "If the provider shows an error instead of asking for approval, allow exactly this address in your provider app's redirect settings, then open the sign-in again."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => void openExternalUrl(openUrl),
									className: "inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90",
									children: [
										"Open ",
										pluginName,
										" again",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyableUrl, {
									url: openUrl,
									hint: "Or copy this link and paste it into your browser's address bar."
								})
							]
						}),
						state === "connected" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-3 py-6 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-12 w-12 place-items-center rounded-full bg-secondary text-foreground-strong",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-6 w-6" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-base font-semibold tracking-tight text-foreground",
								children: [pluginName, " connected"]
							})]
						}),
						state === "error" && errorMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-md bg-secondary px-3 py-2 text-xs text-destructive",
							children: errorMessage
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
					className: "flex items-center justify-end gap-2 border-t border-border px-5 py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
						children: state === "pending" ? "Cancel" : "Close"
					})
				})
			]
		})
	});
}
function DeviceCodeDialog({ flowId, pluginId, pluginName, userCode, verificationUri, verificationUriComplete, expiresAtMs, onClose, onSuccess }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [secondsLeft, setSecondsLeft] = (0, import_react.useState)(() => expiresAtMs ? Math.max(0, Math.floor((expiresAtMs - Date.now()) / 1e3)) : 0);
	(0, import_react.useEffect)(() => {
		if (!expiresAtMs) return;
		const t = window.setInterval(() => {
			setSecondsLeft(Math.max(0, Math.floor((expiresAtMs - Date.now()) / 1e3)));
		}, 1e3);
		return () => window.clearInterval(t);
	}, [expiresAtMs]);
	const poll = useQuery({
		queryKey: ["marketplace-device-poll", flowId],
		queryFn: async () => {
			const res = await fetch(`/api/marketplace/plugins/${pluginId}/connect/poll/${flowId}`, { cache: "no-store" });
			if (!res.ok) {
				const err = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }));
				throw new Error(err.detail || `poll failed (HTTP ${res.status})`);
			}
			return res.json();
		},
		refetchInterval: (q) => {
			const s = q.state.data?.state;
			return s === "connected" || s === "error" ? false : 2e3;
		},
		refetchIntervalInBackground: true
	});
	usePublishConnectedPlugin(pluginId, poll.data?.state, onSuccess);
	const copyCode = async () => {
		if (await robustCopy(userCode)) {
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1200);
		}
	};
	const state = poll.data?.state ?? "pending";
	const errorMessage = state === "error" ? poll.data?.error ?? "Unknown error" : poll.error instanceof Error ? poll.error.message : null;
	const mins = Math.floor(secondsLeft / 60);
	const secs = secondsLeft % 60;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "dialog",
		"aria-modal": "true",
		className: "fixed inset-0 z-50 flex items-center justify-center bg-scrim/70 backdrop-blur-sm",
		onClick: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md overflow-hidden rounded-lg bg-popover shadow-float",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between border-b border-border px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-base font-semibold tracking-tight",
						children: ["Connect ", pluginName]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-micro text-muted-foreground",
						children: "Device flow"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5 px-5 py-6",
					children: [
						state === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-micro text-muted-foreground",
								children: "Step 1 — copy this code"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: copyCode,
								className: "group mt-2 flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-background px-4 py-3 transition-colors hover:border-border-strong hover:bg-secondary",
								title: "Copy",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-2xl font-semibold tracking-[0.3em] tabular-nums text-foreground",
									children: userCode
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-micro text-muted-foreground group-hover:text-foreground-strong",
									children: copied ? "Copied!" : "Copy"
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-micro text-muted-foreground",
									children: ["Step 2 — paste it on ", pluginName]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: verificationUriComplete ?? verificationUri,
									target: "_blank",
									rel: "noopener noreferrer",
									onClick: (e) => {
										e.preventDefault();
										openExternalUrl(verificationUriComplete ?? verificationUri);
									},
									className: "mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90",
									children: [
										"Open ",
										pluginName,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyableUrl, {
										url: verificationUri,
										hint: "Or copy this link, open it in your browser, and enter the code above."
									})
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-micro text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin text-muted-foreground" }),
									"Waiting for authorization…",
									secondsLeft > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "ml-auto font-mono tabular-nums",
										children: [
											String(mins).padStart(2, "0"),
											":",
											String(secs).padStart(2, "0")
										]
									})
								]
							})
						] }),
						state === "connected" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-3 py-6 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-12 w-12 place-items-center rounded-full bg-secondary text-foreground-strong",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-6 w-6" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-base font-semibold tracking-tight text-foreground",
								children: [pluginName, " connected"]
							})]
						}),
						state === "error" && errorMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-md bg-secondary px-3 py-2 text-xs text-destructive",
							children: errorMessage
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
					className: "flex items-center justify-end gap-2 border-t border-border px-5 py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
						children: state === "pending" ? "Cancel" : "Close"
					})
				})
			]
		})
	});
}
function PkceConnectDialog({ plugin, onClose, onProceed, onUseFallback }) {
	const fam = oauthClientFamily(plugin);
	const clientRequired = !(plugin.browserReady ?? plugin.oauthClientConfigured);
	const redirectUri = loopbackRedirectUri(plugin);
	const [showClient, setShowClient] = (0, import_react.useState)(clientRequired);
	const [clientId, setClientId] = (0, import_react.useState)("");
	const [clientSecret, setClientSecret] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	const busyRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape" && !busyRef.current) onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onClose]);
	const writeSecret = async (key, value) => {
		const res = await fetch(`/api/secrets/${key}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ value })
		});
		if (!res.ok) {
			const e = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }));
			throw new Error(e.detail || `could not save ${key}`);
		}
	};
	const handleContinue = async () => {
		if (busyRef.current) return;
		busyRef.current = true;
		setBusy(true);
		setErr(null);
		try {
			const cid = clientId.trim();
			const csec = clientSecret.trim();
			if (fam && cid) {
				await writeSecret(`${fam.family}_oauth_client_id`, cid);
				if (csec) await writeSecret(`${fam.family}_oauth_client_secret`, csec);
			}
			if (await onProceed() !== false) onClose();
		} catch (e) {
			setErr("Could not save the connection settings. Please try again.");
		} finally {
			busyRef.current = false;
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "pkce-connect-title",
		className: "fixed inset-0 z-50 flex items-center justify-center bg-scrim/70 backdrop-blur-sm",
		onClick: (e) => {
			if (e.target === e.currentTarget && !busy) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md overflow-hidden rounded-lg bg-popover shadow-float",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center gap-3 border-b border-border px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandTile, { plugin }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							id: "pkce-connect-title",
							className: "font-display text-sm font-semibold tracking-tight",
							children: ["Connect ", plugin.name]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-micro text-muted-foreground",
							children: clientRequired ? "Browser sign-in is not available yet." : `You'll sign in with your ${fam?.label ?? "provider"} account in the browser.`
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 px-5 py-4",
					children: [
						clientRequired ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md bg-secondary px-3 py-2 text-micro text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"Browser sign-in is pending publisher setup. Connect today with your own free ",
								fam?.label ?? "provider",
								" app — a few minutes, no code. Continue opens the real ",
								plugin.name,
								" login in your browser once the client below is filled in."
							] }), fam && OAUTH_CLIENT_CONSOLE[fam.family] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void openExternalUrl(OAUTH_CLIENT_CONSOLE[fam.family]),
								className: "mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-micro font-semibold text-primary-foreground transition-all hover:bg-primary/90",
								children: [
									"Step 1 — open the ",
									fam.label,
									" app console",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })
								]
							})]
						}) : null,
						fam && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowClient((v) => !v),
							"aria-expanded": showClient,
							className: "text-micro font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground",
							children: clientRequired ? "Your OAuth client" : "Use your own OAuth client (advanced)"
						}), showClient && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-micro text-muted-foreground",
									children: clientRequired ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										"Step 2 — paste the client from the app you just created",
										fam.family === "google" && ". One client covers Gmail, Drive, Calendar and YouTube Music",
										"."
									] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										"Optional expert override. Paste a client from your own",
										" ",
										fam.label,
										" ",
										OAUTH_CLIENT_CONSOLE[fam.family] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: OAUTH_CLIENT_CONSOLE[fam.family],
											target: "_blank",
											rel: "noreferrer",
											className: "underline underline-offset-2 hover:text-foreground",
											children: "console"
										}),
										".",
										" ",
										fam.family === "google" && "One client covers Gmail, Drive, Calendar and YouTube Music."
									] })
								}),
								redirectUri && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border border-border bg-background px-2.5 py-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-micro text-muted-foreground",
											children: [
												clientRequired ? "Step 3 — while" : "While",
												" creating the app, register this as its",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-medium text-foreground",
													children: "redirect URI"
												}),
												", character for character:"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											className: "mt-1 block select-all break-all rounded bg-muted px-1.5 py-1 text-micro text-foreground",
											children: redirectUri
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-micro text-muted-foreground",
											children: [
												"It must be the numeric address, not",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
													className: "text-micro",
													children: "localhost"
												}),
												", and carry no trailing slash."
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "pkce-client-id",
									className: "block text-micro font-medium text-muted-foreground",
									children: "Client ID"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "pkce-client-id",
									value: clientId,
									onChange: (e) => setClientId(e.target.value),
									className: "mt-1 h-8 w-full rounded-md border border-border bg-background px-2 text-xs text-foreground placeholder:text-faint-foreground focus:border-border-strong focus:outline-none",
									placeholder: OAUTH_CLIENT_ID_PLACEHOLDER[fam.family] ?? `Client ID from ${fam.label}`
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "pkce-client-secret",
									className: "block text-micro font-medium text-muted-foreground",
									children: "Client Secret"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "pkce-client-secret",
									type: "password",
									value: clientSecret,
									onChange: (e) => setClientSecret(e.target.value),
									className: "mt-1 h-8 w-full rounded-md border border-border bg-background px-2 text-xs text-foreground placeholder:text-faint-foreground focus:border-border-strong focus:outline-none",
									placeholder: OAUTH_NO_SECRET_NEEDED[fam.family] ?? "optional for some providers"
								})] })
							]
						})] }),
						err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-md bg-secondary px-3 py-2 text-xs text-destructive",
							children: err
						}),
						onUseFallback && plugin.fallbackAuth && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "rounded-md border border-border px-3 py-2.5 text-micro text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
									className: "cursor-pointer",
									children: "Expert token alternative"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The shared browser login isn't provisioned yet. You can connect with a provider token meanwhile — the browser flow stays the default and takes over automatically once ready." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: onUseFallback,
									disabled: busy,
									className: "mt-1.5 font-medium text-foreground underline underline-offset-2 hover:text-foreground disabled:opacity-60",
									children: "Paste a token instead"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "flex items-center justify-end gap-2 border-t border-border px-5 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						disabled: busy,
						className: "rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-60",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleContinue,
						disabled: busy || clientRequired && !clientId.trim(),
						className: "inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60",
						children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }), "Continue"]
					})]
				})
			]
		})
	});
}
function DisconnectConfirmDialog({ plugin, isPending, onCancel, onConfirm, errorMessage }) {
	const assistantName = useEventStore((s) => s.assistantName);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape" && !isPending) onCancel();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onCancel, isPending]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "disconnect-dialog-title",
		className: "fixed inset-0 z-50 flex items-center justify-center bg-scrim/70 backdrop-blur-sm",
		onClick: (e) => {
			if (e.target === e.currentTarget && !isPending) onCancel();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-sm overflow-hidden rounded-lg bg-popover shadow-float",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between border-b border-border px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandTile, { plugin }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							id: "disconnect-dialog-title",
							className: "font-display text-base font-semibold tracking-tight",
							children: [
								"Remove ",
								plugin.name,
								"?"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-micro text-muted-foreground",
							children: "Disconnect plugin"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onCancel,
						disabled: isPending,
						className: "grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30",
						"aria-label": "Cancel",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm leading-relaxed text-muted-foreground",
						children: [
							"This disconnects",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: plugin.name
							}),
							" and deletes its stored credentials. ",
							assistantName,
							" loses access until you reconnect it."
						]
					}), errorMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 rounded-md bg-secondary px-3 py-2 text-xs text-destructive",
						children: errorMessage
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "flex items-center justify-end gap-2 border-t border-border px-5 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onCancel,
						disabled: isPending,
						className: "rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onConfirm,
						disabled: isPending,
						className: "inline-flex items-center gap-1.5 rounded-md bg-destructive px-3.5 py-1.5 text-xs font-semibold text-destructive-foreground transition-all hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40",
						children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }), "Removing…"] }) : "Remove"
					})]
				})
			]
		})
	});
}
function RemovePluginDialog({ plugin, onCancel, onRemoved }) {
	const [pending, setPending] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape" && !pending) onCancel();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onCancel, pending]);
	const remove = async () => {
		setPending(true);
		setError(null);
		try {
			await removeAddedPlugin(plugin.id);
			onRemoved();
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
			setPending(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "remove-plugin-title",
		className: "fixed inset-0 z-50 flex items-center justify-center bg-scrim/70 backdrop-blur-sm",
		onClick: (e) => {
			if (e.target === e.currentTarget && !pending) onCancel();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-sm overflow-hidden rounded-lg bg-popover shadow-float",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center gap-3 border-b border-border px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandTile, { plugin }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "remove-plugin-title",
						className: "font-display text-base font-semibold tracking-tight",
						children: fill(translate("custom_connector.remove_title"), { name: plugin.name })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted-foreground",
						children: translate("custom_connector.remove_body")
					}), error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						role: "alert",
						className: "mt-3 rounded-md bg-secondary px-3 py-2 text-xs text-destructive",
						children: error
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "flex items-center justify-end gap-2 border-t border-border px-5 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onCancel,
						disabled: pending,
						className: "rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30",
						children: translate("common.cancel")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void remove(),
						disabled: pending,
						className: "inline-flex items-center gap-1.5 rounded-md bg-destructive px-3.5 py-1.5 text-xs font-semibold text-destructive-foreground transition-all hover:bg-destructive/90 disabled:cursor-not-allowed disabled:opacity-40",
						children: [pending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }), translate("custom_connector.remove")]
					})]
				})
			]
		})
	});
}
var OWNER_LOCK_PLUGIN_IDS = new Set(["telegram", "discord"]);
function InstanceBrowserDialog({ plugin, isPending, onClose, onSubmit }) {
	const [address, setAddress] = (0, import_react.useState)("");
	let valid = false;
	try {
		const url = new URL(address.trim());
		valid = ["http:", "https:"].includes(url.protocol) && !url.username && !url.password;
	} catch {}
	(0, import_react.useEffect)(() => {
		const close = (event) => {
			if (event.key === "Escape" && !isPending) onClose();
		};
		window.addEventListener("keydown", close);
		return () => window.removeEventListener("keydown", close);
	}, [isPending, onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "instance-browser-title",
		className: "fixed inset-0 z-50 flex items-center justify-center bg-scrim/70 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "w-full max-w-md space-y-4 rounded-lg bg-popover p-5 text-foreground shadow-float",
			onSubmit: (event) => {
				event.preventDefault();
				if (valid && !isPending) onSubmit(address.trim());
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					id: "instance-browser-title",
					className: "font-semibold",
					children: ["Connect ", plugin.name]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Enter your instance address, then sign in and approve access in your browser."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "block text-sm",
					htmlFor: "instance-browser-address",
					children: "Instance address"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "instance-browser-address",
					type: "url",
					autoFocus: true,
					required: true,
					value: address,
					disabled: isPending,
					onChange: (event) => setAddress(event.target.value),
					placeholder: "http://homeassistant.local:8123",
					className: "w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: isPending,
						onClick: onClose,
						className: "rounded-md border border-border px-3 py-2 text-sm",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: !valid || isPending,
						className: "rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground disabled:opacity-50",
						children: isPending ? "Opening browser…" : "Continue in browser"
					})]
				})
			]
		})
	});
}
function PatConnectDialog({ plugin, notice, onClose, onSubmit, isPending, errorMessage }) {
	const [token, setToken] = (0, import_react.useState)("");
	const [userId, setUserId] = (0, import_react.useState)("");
	const [instanceUrl, setInstanceUrl] = (0, import_react.useState)("");
	const ownerLock = OWNER_LOCK_PLUGIN_IDS.has(plugin.id);
	const discordHelpers = plugin.id === "discord";
	const [discordIdLoading, setDiscordIdLoading] = (0, import_react.useState)(false);
	const [discordIdError, setDiscordIdError] = (0, import_react.useState)(null);
	const [discordInviteLoading, setDiscordInviteLoading] = (0, import_react.useState)(false);
	const [discordInviteError, setDiscordInviteError] = (0, import_react.useState)(null);
	const fetchDiscordId = async () => {
		setDiscordIdLoading(true);
		setDiscordIdError(null);
		try {
			const res = await fetch("/api/marketplace/plugins/discord/identity");
			if (!res.ok) {
				const err = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }));
				throw new Error(err.detail || `Could not read your Discord ID (HTTP ${res.status})`);
			}
			const data = await res.json();
			if (!data.user_id) throw new Error("Discord returned no user id.");
			setUserId(String(data.user_id));
		} catch (e) {
			setDiscordIdError(e instanceof Error ? e.message : "Could not read your Discord ID.");
		} finally {
			setDiscordIdLoading(false);
		}
	};
	const openDiscordInvite = async () => {
		setDiscordInviteLoading(true);
		setDiscordInviteError(null);
		try {
			const res = await fetch("/api/marketplace/plugins/discord/invite");
			if (!res.ok) {
				const err = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }));
				throw new Error(err.detail || `Could not build the invite link (HTTP ${res.status})`);
			}
			const data = await res.json();
			if (!data.invite_url) throw new Error("Discord returned no invite link.");
			await openExternalUrl(data.invite_url);
		} catch (e) {
			setDiscordInviteError(e instanceof Error ? e.message : "Could not build the invite link.");
		} finally {
			setDiscordInviteLoading(false);
		}
	};
	const auth = plugin.authConfig;
	const instanceField = auth.instance_url ?? null;
	const expectedPrefixes = [auth.token_prefix ?? "", ...auth.token_prefixes ?? []].filter((p) => p.length > 0);
	const prefixOk = expectedPrefixes.length === 0 || expectedPrefixes.some((p) => token.trim().startsWith(p));
	const userIdTrimmed = userId.trim();
	const userIdOk = !ownerLock || userIdTrimmed === "" || /^\d+$/.test(userIdTrimmed);
	const parsedUserId = ownerLock && /^\d+$/.test(userIdTrimmed) ? Number(userIdTrimmed) : null;
	const instanceOk = !instanceField || instanceUrl.trim().length > 0;
	const canSubmit = token.trim().length > 0 && prefixOk && userIdOk && instanceOk && !isPending;
	const submit = () => onSubmit(token.trim(), parsedUserId, instanceField ? instanceUrl.trim() : null);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape" && !isPending) onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onClose, isPending]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "pat-dialog-title",
		className: "fixed inset-0 z-50 flex items-center justify-center bg-scrim/70 backdrop-blur-sm",
		onClick: (e) => {
			if (e.target === e.currentTarget && !isPending) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md overflow-hidden rounded-lg bg-popover shadow-float",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between border-b border-border px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandTile, { plugin }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							id: "pat-dialog-title",
							className: "font-display text-base font-semibold tracking-tight",
							children: ["Connect ", plugin.name]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-micro text-muted-foreground",
							children: ["Access token · ", AUTH_LABELS[plugin.authMode]]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						disabled: isPending,
						className: "grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30",
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5 px-5 py-5",
					children: [
						notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-md bg-secondary px-3 py-2 text-micro text-foreground",
							children: notice
						}),
						auth.token_creation_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Step, {
							num: 1,
							title: `Generate a token at ${plugin.name}`,
							body: auth.instruction_md,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: auth.token_creation_url,
								target: "_blank",
								rel: "noopener noreferrer",
								onClick: (e) => {
									e.preventDefault();
									openExternalUrl(auth.token_creation_url);
								},
								className: "mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90",
								children: [
									"Open ",
									plugin.name,
									" tokens",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyableUrl, {
									url: auth.token_creation_url,
									hint: "Or copy this link and open it in your browser yourself."
								})
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
							num: 1,
							title: `Get the key for ${plugin.name}`,
							body: auth.instruction_md
						}),
						instanceField && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
							num: 2,
							title: instanceField.label,
							body: instanceField.help_md ?? void 0,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								inputMode: "url",
								autoComplete: "off",
								spellCheck: false,
								value: instanceUrl,
								onChange: (e) => setInstanceUrl(e.target.value),
								onKeyDown: (e) => {
									if (e.key === "Enter" && canSubmit) submit();
								},
								placeholder: instanceField.placeholder,
								className: "mt-2 w-full rounded-md bg-input px-3 py-2 font-mono text-xs text-foreground placeholder:text-faint-foreground focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-border-strong/30",
								disabled: isPending
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Step, {
							num: instanceField ? 3 : 2,
							title: "Paste the token below",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								autoComplete: "off",
								spellCheck: false,
								value: token,
								onChange: (e) => setToken(e.target.value),
								onKeyDown: (e) => {
									if (e.key === "Enter" && canSubmit) submit();
								},
								placeholder: expectedPrefixes.length > 0 ? `${expectedPrefixes.join(" or ")}…` : "Token",
								className: "mt-2 w-full rounded-md bg-input px-3 py-2 font-mono text-xs text-foreground placeholder:text-faint-foreground focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-border-strong/30",
								autoFocus: true,
								disabled: isPending
							}), token && expectedPrefixes.length > 0 && !prefixOk && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1.5 text-micro text-foreground",
								children: [
									"Should start with",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono",
										children: expectedPrefixes.join(" or ")
									})
								]
							})]
						}),
						ownerLock && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Step, {
							num: 3,
							title: "Lock the bot to you (recommended)",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									inputMode: "numeric",
									autoComplete: "off",
									spellCheck: false,
									"aria-label": "Your numeric user id",
									value: userId,
									onChange: (e) => setUserId(e.target.value),
									onKeyDown: (e) => {
										if (e.key === "Enter" && canSubmit) submit();
									},
									placeholder: "123456789",
									className: "mt-2 w-full rounded-md bg-input px-3 py-2 font-mono text-xs text-foreground placeholder:text-faint-foreground focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-border-strong/30",
									disabled: isPending
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-micro text-muted-foreground",
									children: "Only this user id can command the bot. Leave blank to let the first person who messages it claim access instead."
								}),
								discordHelpers && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: isPending || discordIdLoading,
										onClick: () => void fetchDiscordId(),
										className: "rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30",
										children: discordIdLoading ? "Looking up…" : "Fill in my Discord ID"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: isPending || discordInviteLoading,
										onClick: () => void openDiscordInvite(),
										className: "rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30",
										children: discordInviteLoading ? "Opening…" : "Add the bot to my server"
									})]
								}),
								(discordIdError || discordInviteError) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-micro text-destructive",
									children: discordIdError ?? discordInviteError
								}),
								userIdTrimmed !== "" && !userIdOk && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-micro text-foreground",
									children: "User id must be digits only."
								})
							]
						}),
						errorMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-md bg-secondary px-3 py-2 text-xs text-destructive",
							children: errorMessage
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "flex items-center justify-end gap-2 border-t border-border px-5 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						disabled: isPending,
						className: "rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: submit,
						disabled: !canSubmit,
						className: "inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40",
						children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }), "Validating…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Connect", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })] })
					})]
				})
			]
		})
	});
}
function Step({ num, title, body, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border text-micro font-semibold text-muted-foreground",
			children: num
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold text-foreground",
					children: title
				}),
				body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 whitespace-pre-line text-xs leading-relaxed text-muted-foreground",
					children: body
				}),
				children
			]
		})]
	});
}
export { FileTree as a, UploadDropzone as c, formatBytes as d, FileCard as i, useUploadInputs as l, PluginsView as n, MarkdownBody as o, MarketplaceBadge as r, ModeButton as s, BrandTile as t, collectDroppedFiles as u };
