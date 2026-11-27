import { t as FileText } from "./file-text-D8DI7Rfv.js";
import { Bc as require_jsx_runtime, Cn as Portal, Sn as Overlay, Tn as Title, Xc as require_react, bn as Content, oc as useT, si as X, tl as __toESM, wn as Root, xn as Description, yn as Close } from "./index-BOzhgzD7.js";
import "./lib-BoWxqGgd.js";
import "./toolDiff-CkONUaSH.js";
import "./visualFence-DOGBhazZ.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CBD7-HHM.js";
import { n as MemoryMarkdown, t as MemoryChanges } from "./MemoryDocument-KfnL_NN5.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function MemoryFileViewer({ path, before, after, patch, onClose }) {
	const t = useT();
	const [file, setFile] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(false);
	const opener = (0, import_react.useRef)(document.activeElement instanceof HTMLElement ? document.activeElement : null);
	const hasChange = before !== void 0 && after !== void 0;
	(0, import_react.useEffect)(() => {
		const abort = new AbortController();
		setFile(null);
		setError(false);
		fetch(`/api/society/memory/file?path=${encodeURIComponent(path)}`, { signal: abort.signal }).then(async (response) => {
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			return response.json();
		}).then((data) => {
			if (!abort.signal.aborted) setFile(data);
		}).catch(() => {
			if (!abort.signal.aborted) setError(true);
		});
		return () => abort.abort();
	}, [path]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		open: true,
		onOpenChange: (open) => {
			if (!open) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 z-50 bg-scrim/60 backdrop-blur-sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
			onCloseAutoFocus: (event) => {
				event.preventDefault();
				opener.current?.focus();
			},
			className: "fixed left-1/2 top-1/2 z-50 flex h-[min(82dvh,780px)] w-[min(800px,calc(100vw-24px))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-border bg-popover text-foreground shadow-float outline-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex shrink-0 items-center gap-3 border-b border-border p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
						size: 18,
						"aria-hidden": true,
						className: "shrink-0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
							className: "truncate text-sm font-semibold",
							children: path.split("/").at(-1)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
							className: "mt-1 truncate font-mono text-xs text-muted-foreground",
							children: path
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": t("society.world.drawer_close"),
							className: "rounded-md p-2 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								size: 16,
								"aria-hidden": true
							})
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: hasChange ? "changes" : "file",
				className: "flex min-h-0 flex-1 flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "mx-4 mt-3 w-fit shrink-0",
						children: [
							hasChange && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "changes",
								children: t("society.chat.memory_changes")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "file",
								children: t("society.chat.memory_current")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "raw",
								children: t("society.chat.memory_raw")
							})
						]
					}),
					hasChange && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "changes",
						className: "min-h-0 flex-1 overflow-auto p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-4 text-xs text-muted-foreground",
							children: t("society.chat.memory_change_legend")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryChanges, {
							before,
							after,
							patch
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "file",
						className: "min-h-0 flex-1 overflow-auto p-5",
						children: error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							className: "text-sm text-destructive",
							children: t("society.chat.memory_file_failed")
						}) : file ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryMarkdown, { text: file.content }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "status",
							className: "text-sm text-muted-foreground",
							children: t("society.chat.memory_file_loading")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "raw",
						className: "min-h-0 flex-1 overflow-auto p-5",
						children: error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							className: "text-sm text-destructive",
							children: t("society.chat.memory_file_failed")
						}) : file ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "whitespace-pre-wrap break-words font-mono text-xs leading-6",
							children: file.content
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "status",
							className: "text-sm text-muted-foreground",
							children: t("society.chat.memory_file_loading")
						})
					})
				]
			})]
		})] })
	});
}
export { MemoryFileViewer };
