const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/RenderedFence-Bi8iuplA.js","assets/CodeBlock-BucrVDj0.js","assets/index-BOzhgzD7.js","assets/index-CA6QM4ps.css","assets/check-vbwKkbPq.js","assets/RenderedFence-DEp8ozS4.js"])))=>i.map(i=>d[i]);
import { t as CircleAlert } from "./circle-alert-BujlF6G8.js";
import { t as Maximize2 } from "./maximize-2-BK4_PjjK.js";
import { Bc as require_jsx_runtime, Cn as Portal, En as Trigger, Et as openExternalUrl, Ln as cn, Sn as Overlay, Tn as Title, Ui as Download, Xc as require_react, bn as Content, cc as __vitePreload, oc as useT, si as X, tl as __toESM, wn as Root, yn as Close } from "./index-BOzhgzD7.js";
import { n as Markdown, r as defaultUrlTransform, t as remarkGfm } from "./lib-BoWxqGgd.js";
import { n as visualFenceLanguage, t as readFence } from "./visualFence-DOGBhazZ.js";
async function openLocalPath(path) {
	if (!path) return false;
	try {
		const res = await fetch("/api/settings/open-path", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ path })
		});
		if (!res.ok) return false;
		return (await res.json().catch(() => null))?.opened === true;
	} catch {
		return false;
	}
}
var LOCAL_PREFIX = "#jarvis-local=";
function decodePath(value) {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}
function pathFromFileUri(value) {
	const rest = value.replace(/^file:/i, "");
	if (!rest.startsWith("//")) return decodePath(rest) || null;
	const hostAndPath = rest.slice(2);
	const slash = hostAndPath.indexOf("/");
	const host = slash === -1 ? hostAndPath : hostAndPath.slice(0, slash);
	const path = slash === -1 ? "" : hostAndPath.slice(slash);
	if (/^[A-Za-z]:$/.test(host)) return decodePath(host + path) || null;
	if (host && host.toLowerCase() !== "localhost") return null;
	const decoded = decodePath(path);
	return /^\/[A-Za-z]:\//.test(decoded) ? decoded.slice(1) : decoded || null;
}
function stripAngles(raw) {
	const text = raw.trim();
	if (text.length >= 2 && text.startsWith("<") && text.endsWith(">")) return text.slice(1, -1).trim();
	return text;
}
function looksLikeLocalFile(raw) {
	const text = stripAngles(raw);
	if (!text || text.length > 240 || /[\u0000\r\n]/.test(text)) return false;
	if (/^[a-z][a-z0-9+.-]*:/i.test(text)) return false;
	if (text.startsWith("/api/") || text === "/api" || text.startsWith("//")) return false;
	const parts = text.replace(/\\/g, "/").split("/");
	if (parts.some((part) => part === ".." || part === "")) return false;
	const name = parts[parts.length - 1] ?? "";
	return /^[^\\/:*?"<>|]+\.[A-Za-z0-9]{1,12}$/.test(name);
}
function nativePathFromMarkdownUrl(raw) {
	let text = stripAngles(raw);
	if (!text || /[\u0000\r\n]/.test(text)) return null;
	const lower = text.toLowerCase();
	if (lower.startsWith("http://") || lower.startsWith("https://") || lower.startsWith("javascript:") || lower.startsWith("vbscript:") || lower.startsWith("data:") || lower.startsWith("mailto:")) return null;
	if (lower.startsWith("file:")) {
		const converted = pathFromFileUri(text);
		if (!converted) return null;
		text = converted;
	}
	if (text.startsWith("\\\\") || text.startsWith("//")) return null;
	if (text.startsWith("~/") || text.startsWith("~\\")) return text;
	if (/^[A-Za-z]:[\\/]/.test(text)) return text;
	if (text.startsWith("/") && text !== "/api" && !text.startsWith("/api/")) return text;
	return null;
}
function openableLinkTarget(raw) {
	return nativePathFromMarkdownUrl(raw) || (looksLikeLocalFile(raw) ? stripAngles(raw) : null);
}
function chatUrlTransform(url) {
	const local = openableLinkTarget(url);
	if (local) return LOCAL_PREFIX + encodeURIComponent(local);
	return defaultUrlTransform(url);
}
function localPathFromChatHref(href) {
	if (!href.startsWith(LOCAL_PREFIX)) return null;
	return decodePath(href.slice(14)) || null;
}
function chatLinkAction(href, label = "") {
	const local = localPathFromChatHref(href) || openableLinkTarget(href);
	if (local) return {
		type: "local",
		path: local
	};
	if (/^https?:\/\//i.test(href)) return {
		type: "external",
		url: href
	};
	if (href.startsWith("//")) return {
		type: "external",
		url: `https:${href}`
	};
	if (href.startsWith("mailto:") || href.startsWith("/api/")) return { type: "allow" };
	const named = openableLinkTarget(label);
	if (named) return {
		type: "local",
		path: named
	};
	return { type: "stay" };
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function parseToolResult(code) {
	if (code.length > 1e5) return null;
	let value;
	try {
		value = JSON.parse(code);
	} catch {
		return null;
	}
	if (!value || typeof value !== "object" || Array.isArray(value)) return null;
	const result = value;
	if (typeof result.ok !== "boolean" || typeof result.final_result !== "string" || !Array.isArray(result.urls) || !Array.isArray(result.errors)) return null;
	if (!result.urls.every((url) => typeof url === "string") || !result.errors.every((error) => typeof error === "string")) return null;
	const errors = [...result.errors];
	if (typeof result.error === "string" && result.error.trim()) errors.push(result.error);
	return {
		ok: result.ok,
		final_result: result.final_result,
		urls: result.urls,
		errors: [...new Set(errors)]
	};
}
function safeResultUrl(raw) {
	try {
		const url = new URL(raw);
		return ["http:", "https:"].includes(url.protocol) && !url.username && !url.password;
	} catch {
		return false;
	}
}
function ToolResultCard({ result, code }) {
	const t = useT();
	const failed = !result.ok || result.errors.length > 0;
	const urls = [...new Set(result.urls)].filter(safeResultUrl);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "not-prose my-3 min-w-0 rounded-lg border border-border bg-muted/30 p-3 text-sm",
		"data-testid": "tool-result-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-2 font-medium text-foreground",
				children: [
					t("work_trace.output"),
					" · ",
					t(failed ? "work_trace.failed" : "work_trace.completed")
				]
			}),
			result.final_result.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "whitespace-pre-wrap text-foreground [overflow-wrap:anywhere]",
				children: result.final_result
			}) : null,
			result.errors.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-1 text-destructive",
				children: result.errors.map((error, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "whitespace-pre-wrap [overflow-wrap:anywhere]",
					children: error
				}, index))
			}) : null,
			urls.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-1",
				children: urls.map((url) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: url,
					className: "text-primary underline [overflow-wrap:anywhere]",
					onClick: (event) => {
						event.preventDefault();
						openExternalUrl(url);
					},
					children: url
				}) }, url))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "mt-3 border-t border-border pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
					className: "cursor-pointer text-xs text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					children: [t("outputs_view.fence_source"), " · JSON"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					tabIndex: 0,
					className: "mt-2 max-h-64 overflow-auto whitespace-pre-wrap font-mono text-xs text-muted-foreground [overflow-wrap:anywhere]",
					children: code
				})]
			})
		]
	});
}
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var RenderedFence = (0, import_react.lazy)(() => __vitePreload(() => import("./RenderedFence-Bi8iuplA.js"), __vite__mapDeps([0,1,2,3,4,5])).then((module) => ({ default: module.RenderedFence })));
var EXTENSIONS = {
	png: "image",
	jpg: "image",
	jpeg: "image",
	gif: "image",
	webp: "image",
	avif: "image",
	svg: "image",
	bmp: "image",
	ico: "image",
	tif: "image",
	tiff: "image",
	heic: "image",
	heif: "image",
	mp4: "video",
	webm: "video",
	mov: "video",
	m4v: "video",
	ogv: "video",
	avi: "video",
	mkv: "video",
	mpeg: "video",
	mpg: "video",
	wmv: "video",
	mp3: "audio",
	wav: "audio",
	ogg: "audio",
	m4a: "audio",
	flac: "audio",
	aac: "audio"
};
function safeMediaUrl(raw) {
	if (/^data:image\/(?:png|jpeg|gif|webp|avif);base64,[a-zA-Z0-9+/=]+$/.test(raw) && raw.length <= 32 * 1024 * 1024) return raw;
	try {
		const url = new URL(raw, "http://chat.local");
		if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) return null;
		if (!raw.startsWith("/") && !/^https?:\/\//i.test(raw)) return null;
		return raw;
	} catch {
		return null;
	}
}
function mediaKind(raw) {
	if (!safeMediaUrl(raw)) return null;
	if (raw.startsWith("data:image/")) return "image";
	const url = new URL(raw, "http://chat.local");
	const hint = new URLSearchParams(url.hash.slice(1)).get("jarvis-media")?.split("/")[0];
	if (hint === "image" || hint === "video" || hint === "audio") return hint;
	let path;
	try {
		path = decodeURIComponent(url.pathname);
	} catch {
		return null;
	}
	path = path.replace(/\/(download|raw|view)$/, "");
	return EXTENSIONS[path.split(".").pop()?.toLowerCase() ?? ""] ?? null;
}
function assetKey(raw) {
	try {
		const url = new URL(raw, "http://chat.local");
		url.hash = "";
		if (url.pathname.startsWith("/api/outputs/")) url.searchParams.delete("disposition");
		return url.href;
	} catch {
		return raw;
	}
}
function normalizeMediaMarkup(text) {
	const attr = (markup, name) => markup.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, "i"))?.[1];
	const parts = [""];
	let fence = null;
	for (const line of text.match(/[^\n]*\n|[^\n]+$/g) ?? []) {
		const marker = /^ {0,3}(`{3,}|~{3,})(.*?)(?:\r?\n)?$/.exec(line);
		if (!fence && marker && !(marker[1][0] === "`" && marker[2].includes("`"))) {
			fence = marker[1];
			parts.push(line);
		} else if (fence) {
			parts[parts.length - 1] += line;
			if (marker && marker[1][0] === fence[0] && marker[1].length >= fence.length && !marker[2].trim()) {
				fence = null;
				parts.push("");
			}
		} else parts[parts.length - 1] += line;
	}
	return parts.map((part, i) => i % 2 ? part : part.replace(/<(video|audio)\b([^>]*)>([\s\S]*?)<\/\1>/gi, (original, kind, head, body) => {
		const source = attr(head, "src") ?? attr(body.match(/<source\b[^>]*>/i)?.[0] ?? "", "src");
		if (!source || !safeMediaUrl(source)) return original;
		return `\n\n[${kind}](<${source}${source.includes("#") ? "&" : "#"}jarvis-media=${kind}%2F${kind === "video" ? "mp4" : "mpeg"}>)\n\n`;
	}).replace(/<img\b[^>]*>/gi, (original) => {
		const src = attr(original, "src");
		if (!src || !safeMediaUrl(src)) return original;
		return `![${(attr(original, "alt") ?? "image").replace(/[\[\]\r\n]/g, " ")}](<${src}>)`;
	})).join("");
}
function MediaPreview({ src, label, kind }) {
	const t = useT();
	const [failedSource, setFailedSource] = (0, import_react.useState)(null);
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	const [revision, setRevision] = (0, import_react.useState)(0);
	const safe = safeMediaUrl(src);
	const failed = !safe || failedSource === src;
	const unavailable = t("chat_media.unavailable");
	const playerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const player = playerRef.current;
		return () => {
			if (!player) return;
			if (!player.paused) player.pause();
			if (player.networkState !== player.NETWORK_EMPTY) {
				player.removeAttribute("src");
				player.load();
			}
		};
	}, [
		safe,
		kind,
		failed,
		revision
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		open: expanded,
		onOpenChange: setExpanded,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "my-3 block min-w-0 max-w-full",
			"data-testid": "chat-media",
			"data-kind": kind,
			children: [
				failed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					role: "status",
					className: "flex items-center gap-2 py-3 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
							"aria-hidden": true,
							className: "h-4 w-4 shrink-0"
						}),
						unavailable,
						safe ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setFailedSource(null);
								setRevision((value) => value + 1);
							},
							className: "shrink-0 rounded px-2 py-1 text-foreground underline focus-visible:ring-2 focus-visible:ring-ring",
							children: t("chat_media.retry")
						}) : null
					]
				}) : kind === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-label": t("chat_media.expand").replace("{file}", label),
						className: "group relative block max-w-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: safe,
							alt: label,
							loading: "lazy",
							decoding: "async",
							onError: () => {
								setFailedSource(src);
								setExpanded(false);
							},
							className: "m-0 max-h-[520px] max-w-full rounded-lg object-contain"
						}, revision), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, {
							"aria-hidden": true,
							className: "absolute bottom-2 right-2 h-6 w-6 rounded bg-background/90 p-1 text-foreground opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
						})]
					})
				}) : kind === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					ref: (node) => {
						playerRef.current = node;
					},
					src: safe,
					"aria-label": label,
					controls: true,
					playsInline: true,
					preload: "metadata",
					onError: () => {
						setFailedSource(src);
						setExpanded(false);
					},
					className: "max-h-[520px] w-full rounded-lg bg-muted"
				}, `${revision}:${safe}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
					ref: (node) => {
						playerRef.current = node;
					},
					src: safe,
					"aria-label": label,
					controls: true,
					preload: "metadata",
					onError: () => {
						setFailedSource(src);
						setExpanded(false);
					},
					className: "w-full"
				}, `${revision}:${safe}`),
				safe ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: safe,
					download: safe.startsWith("/api/outputs/") ? true : void 0,
					onClick: (event) => {
						if (!safe.startsWith("/api/outputs/")) {
							event.preventDefault();
							openExternalUrl(new URL(safe, window.location.href).href);
						}
					},
					className: "mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground underline underline-offset-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
							"aria-hidden": true,
							className: "h-3 w-3"
						}),
						t(safe.startsWith("/api/outputs/") ? "chat_media.download" : "chat_media.open_file"),
						" · ",
						label
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: label
				}),
				kind === "image" && safe ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 z-50 bg-background/90" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
					"aria-describedby": void 0,
					className: "fixed left-1/2 top-1/2 z-50 grid max-h-[95vh] w-max max-w-[95vw] -translate-x-1/2 -translate-y-1/2 gap-3 overflow-auto rounded-lg border border-border bg-background p-4 text-foreground shadow-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
							className: "pr-8 text-sm",
							children: label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
							"aria-label": t("common.close"),
							className: "absolute right-3 top-3 rounded p-1 focus-visible:ring-2 focus-visible:ring-ring",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								"aria-hidden": true,
								className: "h-4 w-4"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: safe,
							alt: label,
							className: "mx-auto max-h-[80vh] max-w-full object-contain"
						})
					]
				})] }) : null
			]
		})
	});
}
var ImageKeysContext = (0, import_react.createContext)(/* @__PURE__ */ new Set());
function onChatLinkClick(event, href, label = "") {
	const action = chatLinkAction(href, label);
	if (action.type === "allow") return;
	event.preventDefault();
	if (action.type === "local") openLocalPath(action.path);
	else if (action.type === "external") openExternalUrl(action.url);
}
var MARKDOWN_COMPONENTS = {
	img: ({ src = "", alt = "image" }) => {
		const local = localPathFromChatHref(src);
		if (local) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: src,
			title: local,
			onClick: (event) => onChatLinkClick(event, src, alt || local),
			children: alt || local
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaPreview, {
			src,
			label: alt || "image",
			kind: mediaKind(src) ?? "image"
		});
	},
	a: function MediaLink({ href = "", children }) {
		const imageKeys = (0, import_react.useContext)(ImageKeysContext);
		const kind = mediaKind(href);
		const label = import_react.Children.toArray(children).filter((child) => typeof child === "string").join("") || kind || "media";
		if (kind && !imageKeys.has(assetKey(href))) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaPreview, {
			src: href,
			label,
			kind
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href,
			title: localPathFromChatHref(href) || void 0,
			onClick: (event) => onChatLinkClick(event, href, label),
			children
		});
	},
	pre: ({ children, node: _node, ...props }) => {
		const fence = readFence(children);
		if (fence) {
			if (fence.language === "json" || fence.language === "") {
				const result = parseToolResult(fence.code);
				if (result) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolResultCard, {
					result,
					code: fence.code
				});
			}
			const language = visualFenceLanguage(fence.language, fence.code);
			if (language) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { children }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenderedFence, {
					language,
					code: fence.code
				})
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			...props,
			children
		});
	}
};
function ChatMarkdown({ text, className }) {
	const body = (0, import_react.useMemo)(() => normalizeMediaMarkup(text), [text]);
	const imageKeys = (0, import_react.useMemo)(() => new Set(Array.from(body.matchAll(/!\[[^\]]*\]\(<?([^)>]+)>?\)/g), (match) => assetKey(match[1]))), [body]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("min-w-0 [overflow-wrap:anywhere]", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageKeysContext.Provider, {
			value: imageKeys,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, {
				remarkPlugins: [remarkGfm],
				urlTransform: (url) => url.startsWith("data:") ? safeMediaUrl(url) ?? "" : chatUrlTransform(url),
				components: MARKDOWN_COMPONENTS,
				children: body
			})
		})
	});
}
var CONTEXT_LINES = 3;
var MAX_LINES = 400;
var MATCH_CAP = 1200;
function isDiffTool(name) {
	const raw = (name ?? "").trim();
	if (/^(society_wiki_note|society_memory|society_memory_recall|remember)$/i.test(raw)) return true;
	return /^(edit|multi_?edit|write|create_?file|write_?file|apply_?patch|str_replace(_based_edit_tool)?|notebook_?edit|update_?file|patch_?file)$/i.test(raw);
}
function lines(text) {
	const out = text.replace(/\r\n/g, "\n").split("\n");
	if (out.length > 1 && out[out.length - 1] === "") out.pop();
	return out;
}
function str(obj, ...keys) {
	for (const key of keys) {
		const v = obj[key];
		if (typeof v === "string") return v;
	}
	return null;
}
function parseOutput(output) {
	if (!output) return null;
	if (typeof output === "object" && !Array.isArray(output)) return output;
	if (typeof output === "string" && output.trim().startsWith("{")) try {
		const parsed = JSON.parse(output);
		if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
	} catch {
		return null;
	}
	return null;
}
function memoryDiff(name, input, output) {
	if (!/^(society_wiki_note|society_memory|society_memory_recall|remember)$/i.test((name ?? "").trim())) return null;
	const out = parseOutput(output);
	const path = (out && str(out, "path")) ?? "";
	const before = out ? str(out, "before") : null;
	const after = out ? str(out, "after") : null;
	if (before !== null || after !== null) {
		if (before === null && after === null) return null;
		const created = !before?.trim();
		return [build(path, before ?? "", after ?? "", created)];
	}
	const obj = typeof input === "object" && input !== null && !Array.isArray(input) ? input : null;
	const text = obj ? str(obj, "text") : null;
	if (text !== null) return [build(path, "", text, true)];
	return null;
}
function diffLines(before, after) {
	const a = lines(before);
	const b = lines(after);
	if (a.length > MATCH_CAP || b.length > MATCH_CAP) return [...a.map((text) => ({
		kind: "del",
		text
	})), ...b.map((text) => ({
		kind: "add",
		text
	}))];
	const table = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
	for (let i$1 = a.length - 1; i$1 >= 0; i$1--) for (let j$1 = b.length - 1; j$1 >= 0; j$1--) table[i$1][j$1] = a[i$1] === b[j$1] ? table[i$1 + 1][j$1 + 1] + 1 : Math.max(table[i$1 + 1][j$1], table[i$1][j$1 + 1]);
	const out = [];
	let i = 0;
	let j = 0;
	while (i < a.length && j < b.length) if (a[i] === b[j]) {
		out.push({
			kind: "ctx",
			text: a[i]
		});
		i++;
		j++;
	} else if (table[i + 1][j] >= table[i][j + 1]) {
		out.push({
			kind: "del",
			text: a[i]
		});
		i++;
	} else {
		out.push({
			kind: "add",
			text: b[j]
		});
		j++;
	}
	while (i < a.length) out.push({
		kind: "del",
		text: a[i++]
	});
	while (j < b.length) out.push({
		kind: "add",
		text: b[j++]
	});
	return out;
}
function trimContext(all) {
	const keep = new Array(all.length).fill(false);
	let anyChange = false;
	for (let i = 0; i < all.length; i++) {
		if (all[i].kind === "ctx") continue;
		anyChange = true;
		for (let k = Math.max(0, i - CONTEXT_LINES); k <= Math.min(all.length - 1, i + CONTEXT_LINES); k++) keep[k] = true;
	}
	if (!anyChange) return all.slice(0, CONTEXT_LINES * 2);
	const out = [];
	let skipped = 0;
	for (let i = 0; i < all.length; i++) if (keep[i]) {
		if (skipped > 0) {
			out.push({
				kind: "gap",
				text: String(skipped)
			});
			skipped = 0;
		}
		out.push(all[i]);
	} else skipped++;
	if (skipped > 0) out.push({
		kind: "gap",
		text: String(skipped)
	});
	return out;
}
function build(path, before, after, created = false) {
	const all = created ? lines(after).map((text) => ({
		kind: "add",
		text
	})) : diffLines(before, after);
	const trimmed = trimContext(all);
	const shown = trimmed.slice(0, MAX_LINES);
	return {
		path,
		lines: shown,
		added: all.filter((l) => l.kind === "add").length,
		removed: all.filter((l) => l.kind === "del").length,
		created,
		truncated: Math.max(0, trimmed.length - shown.length)
	};
}
function parsePatchText(patch) {
	const files = [];
	let path = "";
	let created = false;
	let acc = [];
	const flush = () => {
		if (!acc.length && !path) return;
		const trimmed = trimContext(acc);
		const shown = trimmed.slice(0, MAX_LINES);
		files.push({
			path,
			lines: shown,
			added: acc.filter((l) => l.kind === "add").length,
			removed: acc.filter((l) => l.kind === "del").length,
			created,
			truncated: Math.max(0, trimmed.length - shown.length)
		});
		acc = [];
	};
	for (const raw of patch.replace(/\r\n/g, "\n").split("\n")) {
		const envelope = /^\*\*\* (Add|Update|Delete) File: (.+)$/.exec(raw);
		if (envelope) {
			flush();
			path = envelope[2].trim();
			created = envelope[1] === "Add";
			continue;
		}
		if (/^\*\*\* (Begin|End) Patch\s*$/.test(raw)) continue;
		const unified = /^\+\+\+ (?:b\/)?(.+)$/.exec(raw);
		if (unified) {
			if (acc.length) flush();
			path = unified[1].trim();
			continue;
		}
		if (/^--- /.test(raw) || /^(diff |index |new file|deleted file|similarity |rename )/.test(raw)) continue;
		if (/^@@/.test(raw)) {
			if (acc.length) acc.push({
				kind: "gap",
				text: ""
			});
			continue;
		}
		if (raw.startsWith("+")) acc.push({
			kind: "add",
			text: raw.slice(1)
		});
		else if (raw.startsWith("-")) acc.push({
			kind: "del",
			text: raw.slice(1)
		});
		else if (raw.startsWith(" ")) acc.push({
			kind: "ctx",
			text: raw.slice(1)
		});
		else if (raw.trim()) acc.push({
			kind: "ctx",
			text: raw
		});
	}
	flush();
	return files.filter((f) => f.lines.length > 0);
}
function toolDiff(name, input, output) {
	const raw = (name ?? "").trim();
	if (!isDiffTool(raw)) return null;
	const memory = memoryDiff(raw, input, output);
	if (memory) return memory;
	if (typeof input === "string") {
		const files = parsePatchText(input);
		return files.length ? files : null;
	}
	if (!input || typeof input !== "object" || Array.isArray(input)) return null;
	const obj = input;
	const patch = str(obj, "patch", "input", "diff", "content_patch");
	if (patch && /^\s*(\*\*\* |--- |diff --git|@@)/m.test(patch)) {
		const files = parsePatchText(patch);
		if (files.length) return files;
	}
	const path = str(obj, "file_path", "path", "notebook_path", "filename", "file") ?? "";
	const edits = obj.edits;
	if (Array.isArray(edits) && edits.length) {
		const out = [];
		for (const entry of edits) {
			if (!entry || typeof entry !== "object") continue;
			const e = entry;
			const before$1 = str(e, "old_string", "old_str", "old", "old_source");
			const after$1 = str(e, "new_string", "new_str", "new", "new_source");
			if (before$1 === null && after$1 === null) continue;
			out.push(build(path, before$1 ?? "", after$1 ?? ""));
		}
		if (out.length) return out;
	}
	const before = str(obj, "old_string", "old_str", "old_source", "old_text");
	const after = str(obj, "new_string", "new_str", "new_source", "new_text");
	if (before !== null || after !== null) {
		const created = !before?.trim();
		return [build(path, before ?? "", after ?? "", created)];
	}
	const content = str(obj, "content", "file_text", "text", "source");
	if (content !== null) return [build(path, "", content, true)];
	return null;
}
export { mediaKind as a, MediaPreview as i, toolDiff as n, ChatMarkdown as r, memoryDiff as t };
