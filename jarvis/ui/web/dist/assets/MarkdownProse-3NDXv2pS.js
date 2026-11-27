import { t as Check } from "./check-vbwKkbPq.js";
import { Bc as require_jsx_runtime, Et as openExternalUrl, F as robustCopy, Ln as cn, Wi as Copy, Xc as require_react, oc as useT, tl as __toESM } from "./index-BOzhgzD7.js";
import { n as Markdown, t as remarkGfm } from "./lib-BoWxqGgd.js";
import { n as visualFenceLanguage, t as readFence } from "./visualFence-DOGBhazZ.js";
import { t as CodeBlock } from "./CodeBlock-BucrVDj0.js";
import { i as RenderedFence } from "./RenderedFence-DEp8ozS4.js";
import { r as artifactInlineUrl } from "./useOutputs-DmTkcj4O.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var CELL = "px-3 py-1.5 align-top text-foreground/90";
function AsciiTableFence({ grid, code }) {
	const t = useT();
	const [mode, setMode] = (0, import_react.useState)("rendered");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const copy = () => {
		robustCopy(code).then((ok) => {
			if (!ok) return;
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1500);
		});
	};
	const segment = (value, label) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": mode === value,
		onClick: () => setMode(value),
		className: cn("rounded-sm px-2 py-0.5 text-micro font-medium transition-colors", mode === value ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground"),
		children: label
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "not-prose my-4 overflow-hidden rounded-md border border-border bg-muted/40",
		"data-testid": "ascii-table-fence",
		"data-mode": mode,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2 border-b border-border/40 bg-muted/20 px-3 py-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-micro uppercase tracking-wider text-muted-foreground",
				children: "table"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "group",
					className: "inline-flex rounded border border-border/60 bg-muted/40 p-0.5",
					children: [segment("rendered", t("outputs_view.fence_rendered")), segment("source", t("outputs_view.fence_source"))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: copy,
					className: "rounded p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground",
					title: t("docs_content.copy_code"),
					"aria-label": copied ? t("docs_content.code_copied") : t("docs_content.copy_code"),
					children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: "h-3 w-3 text-muted-foreground",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						className: "h-3 w-3",
						"aria-hidden": "true"
					})
				})]
			})]
		}), mode === "source" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
			language: "text",
			code,
			chrome: false
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full border-collapse text-sm leading-snug",
				children: [
					grid.caption !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
						className: "border-b border-border/40 bg-muted/20 px-3 py-1.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: grid.caption
					}),
					grid.head !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-muted/30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: grid.head.map((cell, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							className: cn(CELL, "text-left font-semibold text-foreground"),
							children: cell
						}, i)) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: grid.rows.map((row, ri) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "border-t border-border/60",
						children: row.length === 1 && grid.columns > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: grid.columns,
							className: cn(CELL, "bg-muted/20 font-medium text-foreground"),
							children: row[0]
						}) : Array.from({ length: grid.columns }, (_, ci) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: CELL,
							children: row[ci] ?? ""
						}, ci))
					}, ri)) })
				]
			})
		})]
	});
}
var RULE_SHAPE = /^[+|][-=+|\s]*[+|]$/;
function isRule(line) {
	return RULE_SHAPE.test(line) && /[-=]/.test(line);
}
function isRow(line) {
	return line.length > 2 && line.startsWith("|") && line.endsWith("|");
}
function cellsOf(line) {
	return line.slice(1, -1).split("|").map((cell) => cell.trim());
}
function parseAsciiTable(text) {
	const lines = text.split(/\r?\n/).map((line) => line.trim()).filter((line) => line.length > 0);
	if (lines.length < 3) return null;
	const sections = [];
	let current = [];
	let rules = 0;
	for (const line of lines) {
		if (isRule(line)) {
			rules += 1;
			if (current.length > 0) {
				sections.push(current);
				current = [];
			}
			continue;
		}
		if (!isRow(line)) return null;
		current.push(cellsOf(line));
	}
	if (current.length > 0) sections.push(current);
	if (rules === 0 || sections.length === 0) return null;
	const columns = Math.max(...sections.flat().map((row) => row.length));
	if (columns < 2) return null;
	let rest = sections;
	let caption = null;
	if (rest[0].length === 1 && rest[0][0].length === 1) {
		caption = rest[0][0][0];
		rest = rest.slice(1);
	}
	let head = null;
	if (rest.length > 1 && rest[0].length === 1 && rest[0][0].length === columns) {
		head = rest[0][0];
		rest = rest.slice(1);
	}
	const rows = rest.flat();
	if (rows.length === 0) return null;
	return {
		caption,
		head,
		rows,
		columns
	};
}
var FENCE_MARKER = /^\s*(?:```|~~~)/;
function fenceLooseAsciiTables(text) {
	const out = [];
	let block = [];
	let insideFence = false;
	const flush = () => {
		if (block.length === 0) return;
		if (block.some((line) => {
			const trimmed = line.trim();
			return isRule(trimmed) && trimmed.includes("+");
		}) && parseAsciiTable(block.join("\n")) !== null) out.push("```", ...block, "```");
		else out.push(...block);
		block = [];
	};
	for (const raw of text.split("\n")) {
		const line = raw.trim();
		if (FENCE_MARKER.test(raw)) {
			flush();
			insideFence = !insideFence;
			out.push(raw);
			continue;
		}
		if (!insideFence && (isRule(line) || isRow(line))) {
			block.push(raw);
			continue;
		}
		flush();
		out.push(raw);
	}
	flush();
	return out.join("\n");
}
function splitFrontMatter(text) {
	const match = /^﻿?---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(text);
	if (!match) return {
		meta: null,
		body: text
	};
	const meta = match[1].trim();
	return {
		meta: meta.length > 0 ? meta : null,
		body: text.slice(match[0].length)
	};
}
function resolveSiblingPath(fromPath, href) {
	if (!href || /^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("#") || href.startsWith("/")) return null;
	const clean = href.split(/[?#]/)[0];
	const base = fromPath.split("/").slice(0, -1);
	for (const seg of clean.split("/")) {
		if (seg === "" || seg === ".") continue;
		if (seg === "..") {
			if (base.length === 0) return null;
			base.pop();
		} else base.push(seg);
	}
	return base.join("/");
}
var PLAIN_FENCE_LANGUAGES = new Set([
	"",
	"text",
	"txt",
	"plain",
	"plaintext",
	"ascii"
]);
const PROSE_BASE = "prose prose-neutral dark:prose-invert [overflow-wrap:anywhere] prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-pretty prose-p:text-pretty prose-li:my-1 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-muted/60 prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.85em] prose-code:font-normal prose-code:before:hidden prose-code:after:hidden prose-hr:border-border prose-img:rounded-md";
function MarkdownProse({ slug, path, files, text, onSelectSibling, className, testId = "artifact-markdown" }) {
	const known = (0, import_react.useMemo)(() => new Set(files.map((f) => f.path)), [files]);
	const { meta, body } = (0, import_react.useMemo)(() => {
		const split = splitFrontMatter(text);
		return {
			meta: split.meta,
			body: fenceLooseAsciiTables(split.body)
		};
	}, [text]);
	const components = (0, import_react.useMemo)(() => ({
		pre({ children }) {
			const fence = readFence(children);
			if (fence === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { children });
			const { language, code } = fence;
			const visualLanguage = visualFenceLanguage(language, code);
			if (visualLanguage) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenderedFence, {
				language: visualLanguage,
				code
			});
			if (PLAIN_FENCE_LANGUAGES.has(language)) {
				const grid = parseAsciiTable(code);
				if (grid !== null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AsciiTableFence, {
					grid,
					code
				});
			}
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
				language,
				code
			});
		},
		code({ node: _node, className: codeClass, children, ...rest }) {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
				className: codeClass,
				...rest,
				children
			});
		},
		a({ node: _node, href, children, ...rest }) {
			const sibling = href ? resolveSiblingPath(path, href) : null;
			if (sibling && known.has(sibling) && onSelectSibling) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: `#${sibling}`,
				onClick: (e) => {
					e.preventDefault();
					onSelectSibling(sibling);
				},
				...rest,
				children
			});
			if (href && /^https?:\/\//i.test(href)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href,
				rel: "noopener noreferrer",
				onClick: (e) => {
					e.preventDefault();
					openExternalUrl(href);
				},
				...rest,
				children
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href,
				...rest,
				children
			});
		},
		img({ node: _node, src, alt, ...rest }) {
			const sibling = typeof src === "string" ? resolveSiblingPath(path, src) : null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: sibling && known.has(sibling) ? artifactInlineUrl(slug, sibling) : src,
				alt: alt ?? "",
				loading: "lazy",
				...rest
			});
		},
		table({ children }) {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "not-prose my-5 overflow-x-auto rounded-md border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
					className: "w-full text-sm [&_td]:px-3 [&_td]:py-1.5 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_thead]:bg-muted/40 [&_tr]:border-t [&_tr]:border-border/60 [&_thead_tr]:border-t-0",
					children
				})
			});
		},
		blockquote({ children }) {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
				className: "border-l-2 border-primary/50 pl-4 not-italic text-muted-foreground",
				children
			});
		}
	}), [
		known,
		onSelectSibling,
		path,
		slug
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		"data-testid": testId,
		className: cn(PROSE_BASE, className),
		children: [meta !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-testid": "markdown-front-matter",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
				language: "yaml",
				code: meta
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, {
			remarkPlugins: [remarkGfm],
			components,
			children: body
		})]
	});
}
export { PROSE_BASE as n, splitFrontMatter as r, MarkdownProse as t };
