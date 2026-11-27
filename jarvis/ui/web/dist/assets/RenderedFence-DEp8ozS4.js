import { t as Check } from "./check-vbwKkbPq.js";
import { Bc as require_jsx_runtime, F as robustCopy, Ln as cn, Wi as Copy, Xc as require_react, ja as useThemeValue, oc as useT, tl as __toESM } from "./index-BOzhgzD7.js";
import { t as CodeBlock } from "./CodeBlock-BucrVDj0.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
const INLINE_HTML_CSP = "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; media-src data: blob:; connect-src 'none'; form-action 'none'; frame-src 'none'; base-uri 'none';";
const INLINE_HTML_SIZE_MESSAGE = "jarvis-inline-html-size";
var MIN_FRAME_PX = 96;
var MAX_FRAME_PX = 720;
var FRAGMENT_SKIN = {
	light: {
		bg: "#ffffff",
		ink: "#141413"
	},
	dark: {
		bg: "#30302e",
		ink: "#f5f4ef"
	}
};
function headBits() {
	return `<meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="${INLINE_HTML_CSP}">`;
}
function reporterScript(token) {
	return `<script>(function(){var h=document.documentElement;function r(){try{parent.postMessage({type:"${INLINE_HTML_SIZE_MESSAGE}",token:"${token.replace(/[^\w:-]/g, "")}",height:h.scrollHeight},"*")}catch(e){}}try{new ResizeObserver(r).observe(h)}catch(e){}addEventListener("load",r);r()})();<\/script>`;
}
function wrapInlineHtml(html, theme, token) {
	const script = reporterScript(token);
	if (/<html[\s>]/i.test(html)) {
		let doc = html;
		if (!/<html[^>]*\sdata-theme=/i.test(doc)) doc = doc.replace(/<html(\s[^>]*)?>/i, (_m, attrs) => `<html${attrs ?? ""} data-theme="${theme}">`);
		if (/<head[^>]*>/i.test(doc)) doc = doc.replace(/<head[^>]*>/i, (m) => `${m}${headBits()}`);
		else doc = doc.replace(/<html[^>]*>/i, (m) => `${m}<head>${headBits()}</head>`);
		return /<\/body>/i.test(doc) ? doc.replace(/<\/body>/i, `${script}</body>`) : `${doc}${script}`;
	}
	const skin = FRAGMENT_SKIN[theme];
	return `<!doctype html><html lang="en" data-theme="${theme}"><head>${headBits()}<style>:root{color-scheme:${theme}}html,body{margin:0}body{padding:12px;background:${skin.bg};color:${skin.ink};font:14px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}svg,img,canvas,video{max-width:100%}</style></head><body>${html}${script}</body></html>`;
}
function svgDataUrl(svg) {
	const document = svg.replace(/<svg(?=[\s>])[^>]*>/, (root) => /\sxmlns\s*=/.test(root) ? root : root.replace("<svg", "<svg xmlns=\"http://www.w3.org/2000/svg\""));
	return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(document)}`;
}
function InlineHtmlFrame({ html, title }) {
	const theme = useThemeValue();
	const token = (0, import_react.useId)();
	const ref = (0, import_react.useRef)(null);
	const [height, setHeight] = (0, import_react.useState)(MIN_FRAME_PX * 2);
	(0, import_react.useEffect)(() => {
		const onMessage = (event) => {
			const frame = ref.current;
			if (!frame || event.source !== frame.contentWindow) return;
			const data = event.data;
			if (typeof data !== "object" || data === null || data.type !== "jarvis-inline-html-size" || data.token !== token.replace(/[^\w:-]/g, "")) return;
			const reported = Number(data.height);
			if (!Number.isFinite(reported)) return;
			setHeight(Math.min(MAX_FRAME_PX, Math.max(MIN_FRAME_PX, Math.ceil(reported) + 2)));
		};
		window.addEventListener("message", onMessage);
		return () => window.removeEventListener("message", onMessage);
	}, [token]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
		ref,
		title,
		srcDoc: (0, import_react.useMemo)(() => wrapInlineHtml(html, theme, token), [
			html,
			theme,
			token
		]),
		sandbox: "allow-scripts",
		referrerPolicy: "no-referrer",
		style: { height },
		className: "block w-full border-0 bg-transparent",
		"data-testid": "inline-html-frame"
	}, theme);
}
function RenderedFence({ language, code }) {
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
		"data-testid": "rendered-fence",
		"data-language": language,
		"data-mode": mode,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2 border-b border-border/40 bg-muted/20 px-3 py-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-micro uppercase tracking-wider text-muted-foreground",
				children: language
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
			language,
			code,
			chrome: false
		}) : language === "svg" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-center bg-card p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: svgDataUrl(code),
				alt: "SVG",
				className: "max-w-full",
				"data-testid": "inline-svg"
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineHtmlFrame, {
			html: code,
			title: "HTML"
		})]
	});
}
export { svgDataUrl as a, RenderedFence as i, INLINE_HTML_SIZE_MESSAGE as n, wrapInlineHtml as o, InlineHtmlFrame as r, INLINE_HTML_CSP as t };
