const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/dist-vlNPj3Mt.js","assets/index-BOzhgzD7.js","assets/index-CA6QM4ps.css","assets/lib-B_8abcSJ.js"])))=>i.map(i=>d[i]);
import { t as Check } from "./check-vbwKkbPq.js";
import { Bc as require_jsx_runtime, F as robustCopy, Ln as cn, Wi as Copy, Xc as require_react, cc as __vitePreload, oc as useT, tl as __toESM } from "./index-BOzhgzD7.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var CODE_THEMES = {
	light: "github-light",
	dark: "github-dark-default"
};
var highlighterPromises = /* @__PURE__ */ new Map();
var SUPPORTED_LANGS = [
	"bash",
	"shell",
	"sh",
	"powershell",
	"ps1",
	"python",
	"py",
	"typescript",
	"ts",
	"tsx",
	"javascript",
	"js",
	"jsx",
	"json",
	"yaml",
	"yml",
	"toml",
	"ini",
	"xml",
	"html",
	"css",
	"rust",
	"go",
	"java",
	"c",
	"cpp",
	"csharp",
	"kotlin",
	"swift",
	"sql",
	"diff",
	"markdown",
	"md"
];
var LANGUAGE_ALIASES = {
	shell: "bash",
	sh: "bash",
	ps1: "powershell",
	py: "python",
	ts: "typescript",
	js: "javascript",
	yml: "yaml",
	md: "markdown"
};
function canonicalLanguage(language) {
	return LANGUAGE_ALIASES[language] ?? language;
}
async function loadHighlighter(language) {
	const cached = highlighterPromises.get(language);
	if (cached) return cached;
	const promise = __vitePreload(() => import("./dist-vlNPj3Mt.js"), __vite__mapDeps([0,1,2,3])).then(async (shiki) => {
		return await shiki.createHighlighter({
			themes: [CODE_THEMES.light, CODE_THEMES.dark],
			langs: [language]
		});
	});
	highlighterPromises.set(language, promise);
	return promise;
}
function CodeBlock({ language, code, chrome = true }) {
	const t = useT();
	const [html, setHtml] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const mountedRef = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const lang = SUPPORTED_LANGS.includes(language) ? canonicalLanguage(language) : "txt";
		if (lang === "txt") {
			setHtml(null);
			return;
		}
		loadHighlighter(lang).then((highlighter) => {
			if (cancelled || !mountedRef.current) return;
			try {
				setHtml(highlighter.codeToHtml(code, {
					lang,
					themes: CODE_THEMES,
					defaultColor: "light"
				}));
			} catch {
				setHtml(null);
			}
		}).catch(() => {
			highlighterPromises.delete(lang);
			if (!cancelled && mountedRef.current) setHtml(null);
		});
		return () => {
			cancelled = true;
		};
	}, [language, code]);
	const handleCopy = () => {
		robustCopy(code).then((copied$1) => {
			if (!copied$1) return;
			setCopied(true);
			window.setTimeout(() => {
				if (mountedRef.current) setCopied(false);
			}, 1500);
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("not-prose group relative overflow-hidden", chrome && "my-6 rounded-lg border border-border bg-card"),
		children: [chrome && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-9 items-center justify-between border-b border-border pl-4 pr-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs text-muted-foreground",
				children: language || "text"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: handleCopy,
				className: cn("inline-flex h-7 items-center gap-1.5 rounded-sm px-2 text-xs font-medium text-muted-foreground transition-colors", "hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"),
				title: t("docs_content.copy_code"),
				"aria-label": copied ? t("docs_content.code_copied") : t("docs_content.copy_code"),
				children: [
					copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: "h-3.5 w-3.5 text-success",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						className: "h-3.5 w-3.5",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						children: copied ? t("docs_content.code_copied") : t("docs_content.copy")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						"aria-live": "polite",
						children: copied ? t("docs_content.code_copied") : ""
					})
				]
			})]
		}), html ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto px-4 py-3.5 font-mono text-sm leading-6 [&_pre]:m-0 [&_pre]:!bg-transparent [&_pre]:font-mono",
			dangerouslySetInnerHTML: { __html: html }
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			className: "m-0 overflow-x-auto px-4 py-3.5 font-mono text-sm leading-6 text-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: code })
		})]
	});
}
export { CodeBlock as t };
