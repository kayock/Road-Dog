const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/freemarker2-BlWZszCh.js","assets/editor.api-DMQ2fqLq.js","assets/index-BOzhgzD7.js","assets/index-CA6QM4ps.css","assets/editor-wEE_K0i3.css","assets/handlebars-D36kCDJ2.js","assets/html-B9ntg9CR.js","assets/javascript-C-vhZLMb.js","assets/typescript-Bg5KM5ZU.js","assets/liquid-VFtdO0NL.js","assets/mdx-DxKqd0CR.js","assets/python-Dg-KXuBF.js","assets/razor-Vs6SqbYl.js","assets/xml-C62gg-qn.js","assets/yaml-CIRO4g_3.js","assets/jsonMode-ChFNWYV3.js","assets/lspLanguageFeatures-tGRV_Cd9.js","assets/toggleHighContrast-DP7NF7KJ.js","assets/toggleHighContrast-BqTtwJGU.css","assets/workers-BGcmZXQy.js","assets/cssMode-B3QLgqr_.js","assets/htmlMode-TXXR0QKq.js"])))=>i.map(i=>d[i]);
import { t as FileWarning } from "./file-warning-Cea43YOp.js";
import { Bc as require_jsx_runtime, Gs as fill, Ln as cn, Vi as ExternalLink, Vo as workspaceFileUrl, Xc as require_react, cc as __vitePreload, ji as LoaderCircle, lo as fetchWorkspaceFilePreview, oc as useT, tl as __toESM } from "./index-BOzhgzD7.js";
import { a as Selection, c as editor_api_exports, i as Range, l as languages, s as editor, t as Emitter } from "./editor.api-DMQ2fqLq.js";
import { s as FindWidget } from "./toggleHighContrast-DP7NF7KJ.js";
import { a as javascriptDefaults, i as ScriptTarget, n as ModuleKind, o as typescriptDefaults, r as ModuleResolutionKind, t as JsxEmit } from "./register-DypJsvLM.js";
import { n as Markdown, t as remarkGfm } from "./lib-BoWxqGgd.js";
import { i as useCodeEditorStore } from "./codeEditor-BpQSQnN9.js";
import { P as renderKindOf, b as setMonaco, c as loadFile, d as modelOf, i as fileUri, j as pythonIntel, l as loadHead, m as rememberViewState, o as languageFor, r as fileOfUri, u as loadHeadText, x as viewStateOf } from "./editorModels-COCPi24i.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
const MAX_EDIT_DISTANCE = 1e3;
var splitLines = (text) => text.split(/\r\n|\r|\n/);
function editScript(a, b) {
	const n = a.length;
	const m = b.length;
	const max = Math.min(n + m, MAX_EDIT_DISTANCE);
	const offset = max + 1;
	const trace = [];
	let v = new Int32Array(2 * max + 3);
	for (let d = 0; d <= max; d += 1) {
		const next = v.slice();
		for (let k = -d; k <= d; k += 2) {
			let x = k === -d || k !== d && v[offset + k - 1] < v[offset + k + 1] ? v[offset + k + 1] : v[offset + k - 1] + 1;
			let y = x - k;
			while (x < n && y < m && a[x] === b[y]) {
				x += 1;
				y += 1;
			}
			next[offset + k] = x;
			if (x >= n && y >= m) {
				trace.push(next);
				return backtrack(trace, n, m, offset);
			}
		}
		trace.push(next);
		v = next;
	}
	return null;
}
function backtrack(trace, n, m, offset) {
	const steps = [];
	let x = n;
	let y = m;
	for (let d = trace.length - 1; d > 0; d -= 1) {
		const v = trace[d - 1];
		const k = x - y;
		const down = k === -d || k !== d && v[offset + k - 1] < v[offset + k + 1];
		const prevK = down ? k + 1 : k - 1;
		const prevX = v[offset + prevK];
		const prevY = prevX - prevK;
		while (x > prevX && y > prevY) {
			steps.push("=");
			x -= 1;
			y -= 1;
		}
		steps.push(down ? "+" : "-");
		x = prevX;
		y = prevY;
	}
	while (x > 0 && y > 0) {
		steps.push("=");
		x -= 1;
		y -= 1;
	}
	return steps.reverse();
}
function gutterChanges(base, current) {
	if (base === current) return [];
	const a = splitLines(base);
	const b = splitLines(current);
	if (a.length + b.length > 2e4) return null;
	const steps = editScript(a, b);
	if (!steps) return null;
	const changes = [];
	let line = 1;
	let index = 0;
	while (index < steps.length) {
		if (steps[index] === "=") {
			line += 1;
			index += 1;
			continue;
		}
		let removed = 0;
		let added = 0;
		while (index < steps.length && steps[index] !== "=") {
			if (steps[index] === "-") removed += 1;
			else added += 1;
			index += 1;
		}
		if (added === 0) changes.push({
			kind: "deleted",
			start: line,
			end: line
		});
		else {
			const kind = removed > 0 ? "modified" : "added";
			changes.push({
				kind,
				start: line,
				end: line + added - 1
			});
			line += added;
		}
	}
	return changes;
}
var tabIndexPatchKey = "__monacoFindWidgetTabIndexPatchApplied";
var originalTabIndexKey = "__monacoFindWidgetOriginalTabIndex";
function setFindWidgetTabbableState(widget, visible) {
	const domNode = widget?._domNode;
	if (!domNode) return;
	const focusableElements = domNode.querySelectorAll("input, textarea, [tabindex], [role=\"button\"], [role=\"checkbox\"]");
	for (const element of focusableElements) {
		if (!(element instanceof HTMLElement)) continue;
		if (visible) {
			if (!(originalTabIndexKey in element.dataset)) continue;
			const originalTabIndex = element.dataset[originalTabIndexKey];
			if (originalTabIndex === "") element.removeAttribute("tabindex");
			else element.tabIndex = Number(originalTabIndex);
			delete element.dataset[originalTabIndexKey];
		} else {
			if (!(originalTabIndexKey in element.dataset)) element.dataset[originalTabIndexKey] = element.getAttribute("tabindex") ?? "";
			element.tabIndex = -1;
		}
	}
}
if (!FindWidget[tabIndexPatchKey]) {
	const originalReveal = FindWidget.prototype._reveal;
	const originalHide = FindWidget.prototype._hide;
	FindWidget.prototype._reveal = function(...args) {
		originalReveal.apply(this, args);
		setFindWidgetTabbableState(this, true);
	};
	FindWidget.prototype._hide = function(...args) {
		originalHide.apply(this, args);
		setFindWidgetTabbableState(this, false);
	};
	FindWidget[tabIndexPatchKey] = true;
}
var languageDefinitions = {};
var lazyLanguageLoaders = {};
var LazyLanguageLoader = class LazyLanguageLoader {
	static getOrCreate(languageId) {
		if (!lazyLanguageLoaders[languageId]) lazyLanguageLoaders[languageId] = new LazyLanguageLoader(languageId);
		return lazyLanguageLoaders[languageId];
	}
	constructor(languageId) {
		this._languageId = languageId;
		this._loadingTriggered = false;
		this._lazyLoadPromise = new Promise((resolve, reject) => {
			this._lazyLoadPromiseResolve = resolve;
			this._lazyLoadPromiseReject = reject;
		});
	}
	load() {
		if (!this._loadingTriggered) {
			this._loadingTriggered = true;
			languageDefinitions[this._languageId].loader().then((mod) => this._lazyLoadPromiseResolve(mod), (err) => this._lazyLoadPromiseReject(err));
		}
		return this._lazyLoadPromise;
	}
};
function registerLanguage(def) {
	const languageId = def.id;
	languageDefinitions[languageId] = def;
	languages.register(def);
	const lazyLanguageLoader = LazyLanguageLoader.getOrCreate(languageId);
	languages.registerTokensProviderFactory(languageId, { create: async () => {
		return (await lazyLanguageLoader.load()).language;
	} });
	languages.onLanguageEncountered(languageId, async () => {
		const mod = await lazyLanguageLoader.load();
		languages.setLanguageConfiguration(languageId, mod.conf);
	});
}
registerLanguage({
	id: "abap",
	extensions: [".abap"],
	aliases: ["abap", "ABAP"],
	loader: () => __vitePreload(() => import("./abap-DY4s9sBz.js"), [])
});
registerLanguage({
	id: "apex",
	extensions: [".cls"],
	aliases: ["Apex", "apex"],
	mimetypes: ["text/x-apex-source", "text/x-apex"],
	loader: () => __vitePreload(() => import("./apex-CEJVncUQ.js"), [])
});
registerLanguage({
	id: "azcli",
	extensions: [".azcli"],
	aliases: ["Azure CLI", "azcli"],
	loader: () => __vitePreload(() => import("./azcli-BN1oiEaS.js"), [])
});
registerLanguage({
	id: "bat",
	extensions: [".bat", ".cmd"],
	aliases: ["Batch", "bat"],
	loader: () => __vitePreload(() => import("./bat-ra3MNI_w.js"), [])
});
registerLanguage({
	id: "bicep",
	extensions: [".bicep"],
	aliases: ["Bicep"],
	loader: () => __vitePreload(() => import("./bicep-BYgvabH8.js"), [])
});
registerLanguage({
	id: "cameligo",
	extensions: [".mligo"],
	aliases: ["Cameligo"],
	loader: () => __vitePreload(() => import("./cameligo-C2miWPfE.js"), [])
});
registerLanguage({
	id: "clojure",
	extensions: [
		".clj",
		".cljs",
		".cljc",
		".edn"
	],
	aliases: ["clojure", "Clojure"],
	loader: () => __vitePreload(() => import("./clojure-D7Fi6pUP.js"), [])
});
registerLanguage({
	id: "coffeescript",
	extensions: [".coffee"],
	aliases: [
		"CoffeeScript",
		"coffeescript",
		"coffee"
	],
	mimetypes: ["text/x-coffeescript", "text/coffeescript"],
	loader: () => __vitePreload(() => import("./coffee-WnBm9AG3.js"), [])
});
registerLanguage({
	id: "c",
	extensions: [".c", ".h"],
	aliases: ["C", "c"],
	loader: () => __vitePreload(() => import("./cpp-DElN6Iuz.js"), [])
});
registerLanguage({
	id: "cpp",
	extensions: [
		".cpp",
		".cc",
		".cxx",
		".hpp",
		".hh",
		".hxx"
	],
	aliases: [
		"C++",
		"Cpp",
		"cpp"
	],
	loader: () => __vitePreload(() => import("./cpp-DElN6Iuz.js"), [])
});
registerLanguage({
	id: "csharp",
	extensions: [
		".cs",
		".csx",
		".cake"
	],
	aliases: ["C#", "csharp"],
	loader: () => __vitePreload(() => import("./csharp-Cwy7z7gr.js"), [])
});
registerLanguage({
	id: "csp",
	extensions: [".csp"],
	aliases: ["CSP", "csp"],
	loader: () => __vitePreload(() => import("./csp-CGBIy03A.js"), [])
});
registerLanguage({
	id: "css",
	extensions: [".css"],
	aliases: ["CSS", "css"],
	mimetypes: ["text/css"],
	loader: () => __vitePreload(() => import("./css-CKn-2cgu.js"), [])
});
registerLanguage({
	id: "cypher",
	extensions: [".cypher", ".cyp"],
	aliases: ["Cypher", "OpenCypher"],
	loader: () => __vitePreload(() => import("./cypher-DVdhhHlL.js"), [])
});
registerLanguage({
	id: "dart",
	extensions: [".dart"],
	aliases: ["Dart", "dart"],
	mimetypes: ["text/x-dart-source", "text/x-dart"],
	loader: () => __vitePreload(() => import("./dart-Bxup8cRK.js"), [])
});
registerLanguage({
	id: "dockerfile",
	extensions: [".dockerfile"],
	filenames: ["Dockerfile"],
	aliases: ["Dockerfile"],
	loader: () => __vitePreload(() => import("./dockerfile-KjVmHa6d.js"), [])
});
registerLanguage({
	id: "ecl",
	extensions: [".ecl"],
	aliases: [
		"ECL",
		"Ecl",
		"ecl"
	],
	loader: () => __vitePreload(() => import("./ecl-ClnP1gc6.js"), [])
});
registerLanguage({
	id: "elixir",
	extensions: [".ex", ".exs"],
	aliases: [
		"Elixir",
		"elixir",
		"ex"
	],
	loader: () => __vitePreload(() => import("./elixir-Bv3pt84s.js"), [])
});
registerLanguage({
	id: "flow9",
	extensions: [".flow"],
	aliases: [
		"Flow9",
		"Flow",
		"flow9",
		"flow"
	],
	loader: () => __vitePreload(() => import("./flow9-HKzlIMMs.js"), [])
});
registerLanguage({
	id: "fsharp",
	extensions: [
		".fs",
		".fsi",
		".ml",
		".mli",
		".fsx",
		".fsscript"
	],
	aliases: [
		"F#",
		"FSharp",
		"fsharp"
	],
	loader: () => __vitePreload(() => import("./fsharp-CaG457FX.js"), [])
});
registerLanguage({
	id: "freemarker2",
	extensions: [
		".ftl",
		".ftlh",
		".ftlx"
	],
	aliases: ["FreeMarker2", "Apache FreeMarker2"],
	loader: () => {
		return __vitePreload(() => import("./freemarker2-BlWZszCh.js"), __vite__mapDeps([0,1,2,3,4])).then((m) => m.TagAutoInterpolationDollar);
	}
});
registerLanguage({
	id: "freemarker2.tag-angle.interpolation-dollar",
	aliases: ["FreeMarker2 (Angle/Dollar)", "Apache FreeMarker2 (Angle/Dollar)"],
	loader: () => {
		return __vitePreload(() => import("./freemarker2-BlWZszCh.js"), __vite__mapDeps([0,1,2,3,4])).then((m) => m.TagAngleInterpolationDollar);
	}
});
registerLanguage({
	id: "freemarker2.tag-bracket.interpolation-dollar",
	aliases: ["FreeMarker2 (Bracket/Dollar)", "Apache FreeMarker2 (Bracket/Dollar)"],
	loader: () => {
		return __vitePreload(() => import("./freemarker2-BlWZszCh.js"), __vite__mapDeps([0,1,2,3,4])).then((m) => m.TagBracketInterpolationDollar);
	}
});
registerLanguage({
	id: "freemarker2.tag-angle.interpolation-bracket",
	aliases: ["FreeMarker2 (Angle/Bracket)", "Apache FreeMarker2 (Angle/Bracket)"],
	loader: () => {
		return __vitePreload(() => import("./freemarker2-BlWZszCh.js"), __vite__mapDeps([0,1,2,3,4])).then((m) => m.TagAngleInterpolationBracket);
	}
});
registerLanguage({
	id: "freemarker2.tag-bracket.interpolation-bracket",
	aliases: ["FreeMarker2 (Bracket/Bracket)", "Apache FreeMarker2 (Bracket/Bracket)"],
	loader: () => {
		return __vitePreload(() => import("./freemarker2-BlWZszCh.js"), __vite__mapDeps([0,1,2,3,4])).then((m) => m.TagBracketInterpolationBracket);
	}
});
registerLanguage({
	id: "freemarker2.tag-auto.interpolation-dollar",
	aliases: ["FreeMarker2 (Auto/Dollar)", "Apache FreeMarker2 (Auto/Dollar)"],
	loader: () => {
		return __vitePreload(() => import("./freemarker2-BlWZszCh.js"), __vite__mapDeps([0,1,2,3,4])).then((m) => m.TagAutoInterpolationDollar);
	}
});
registerLanguage({
	id: "freemarker2.tag-auto.interpolation-bracket",
	aliases: ["FreeMarker2 (Auto/Bracket)", "Apache FreeMarker2 (Auto/Bracket)"],
	loader: () => {
		return __vitePreload(() => import("./freemarker2-BlWZszCh.js"), __vite__mapDeps([0,1,2,3,4])).then((m) => m.TagAutoInterpolationBracket);
	}
});
registerLanguage({
	id: "go",
	extensions: [".go"],
	aliases: ["Go"],
	loader: () => __vitePreload(() => import("./go-DX_mSIpo.js"), [])
});
registerLanguage({
	id: "graphql",
	extensions: [".graphql", ".gql"],
	aliases: [
		"GraphQL",
		"graphql",
		"gql"
	],
	mimetypes: ["application/graphql"],
	loader: () => __vitePreload(() => import("./graphql-C8yqg9W7.js"), [])
});
registerLanguage({
	id: "handlebars",
	extensions: [".handlebars", ".hbs"],
	aliases: [
		"Handlebars",
		"handlebars",
		"hbs"
	],
	mimetypes: ["text/x-handlebars-template"],
	loader: () => __vitePreload(() => import("./handlebars-D36kCDJ2.js"), __vite__mapDeps([5,1,2,3,4]))
});
registerLanguage({
	id: "hcl",
	extensions: [
		".tf",
		".tfvars",
		".hcl"
	],
	aliases: [
		"Terraform",
		"tf",
		"HCL",
		"hcl"
	],
	loader: () => __vitePreload(() => import("./hcl-BFMgZQTI.js"), [])
});
registerLanguage({
	id: "html",
	extensions: [
		".html",
		".htm",
		".shtml",
		".xhtml",
		".mdoc",
		".jsp",
		".asp",
		".aspx",
		".jshtm"
	],
	aliases: [
		"HTML",
		"htm",
		"html",
		"xhtml"
	],
	mimetypes: [
		"text/html",
		"text/x-jshtm",
		"text/template",
		"text/ng-template"
	],
	loader: () => __vitePreload(() => import("./html-B9ntg9CR.js"), __vite__mapDeps([6,1,2,3,4]))
});
registerLanguage({
	id: "ini",
	extensions: [
		".ini",
		".properties",
		".gitconfig"
	],
	filenames: [
		"config",
		".gitattributes",
		".gitconfig",
		".editorconfig"
	],
	aliases: ["Ini", "ini"],
	loader: () => __vitePreload(() => import("./ini-8j_jZGFx.js"), [])
});
registerLanguage({
	id: "java",
	extensions: [".java", ".jav"],
	aliases: ["Java", "java"],
	mimetypes: ["text/x-java-source", "text/x-java"],
	loader: () => __vitePreload(() => import("./java-B5Gmy23d.js"), [])
});
registerLanguage({
	id: "javascript",
	extensions: [
		".js",
		".es6",
		".jsx",
		".mjs",
		".cjs"
	],
	firstLine: "^#!.*\\bnode",
	filenames: ["jakefile"],
	aliases: [
		"JavaScript",
		"javascript",
		"js"
	],
	mimetypes: ["text/javascript"],
	loader: () => __vitePreload(() => import("./javascript-C-vhZLMb.js"), __vite__mapDeps([7,1,2,3,4,8]))
});
registerLanguage({
	id: "julia",
	extensions: [".jl"],
	aliases: ["julia", "Julia"],
	loader: () => __vitePreload(() => import("./julia-CxPMHh1B.js"), [])
});
registerLanguage({
	id: "kotlin",
	extensions: [".kt", ".kts"],
	aliases: ["Kotlin", "kotlin"],
	mimetypes: ["text/x-kotlin-source", "text/x-kotlin"],
	loader: () => __vitePreload(() => import("./kotlin-Be2_0oGa.js"), [])
});
registerLanguage({
	id: "less",
	extensions: [".less"],
	aliases: ["Less", "less"],
	mimetypes: ["text/x-less", "text/less"],
	loader: () => __vitePreload(() => import("./less-CPw-A2gh.js"), [])
});
registerLanguage({
	id: "lexon",
	extensions: [".lex"],
	aliases: ["Lexon"],
	loader: () => __vitePreload(() => import("./lexon-BQsnSyl3.js"), [])
});
registerLanguage({
	id: "lua",
	extensions: [".lua"],
	aliases: ["Lua", "lua"],
	loader: () => __vitePreload(() => import("./lua-CiJYZHv3.js"), [])
});
registerLanguage({
	id: "liquid",
	extensions: [".liquid", ".html.liquid"],
	aliases: ["Liquid", "liquid"],
	mimetypes: ["application/liquid"],
	loader: () => __vitePreload(() => import("./liquid-VFtdO0NL.js"), __vite__mapDeps([9,1,2,3,4]))
});
registerLanguage({
	id: "m3",
	extensions: [
		".m3",
		".i3",
		".mg",
		".ig"
	],
	aliases: [
		"Modula-3",
		"Modula3",
		"modula3",
		"m3"
	],
	loader: () => __vitePreload(() => import("./m3-C2drj9Kk.js"), [])
});
registerLanguage({
	id: "markdown",
	extensions: [
		".md",
		".markdown",
		".mdown",
		".mkdn",
		".mkd",
		".mdwn",
		".mdtxt",
		".mdtext"
	],
	aliases: ["Markdown", "markdown"],
	loader: () => __vitePreload(() => import("./markdown-D9z3fHSy.js"), [])
});
registerLanguage({
	id: "mdx",
	extensions: [".mdx"],
	aliases: ["MDX", "mdx"],
	loader: () => __vitePreload(() => import("./mdx-DxKqd0CR.js"), __vite__mapDeps([10,1,2,3,4]))
});
registerLanguage({
	id: "mips",
	extensions: [".s"],
	aliases: ["MIPS", "MIPS-V"],
	mimetypes: [
		"text/x-mips",
		"text/mips",
		"text/plaintext"
	],
	loader: () => __vitePreload(() => import("./mips-PD3wstc5.js"), [])
});
registerLanguage({
	id: "msdax",
	extensions: [".dax", ".msdax"],
	aliases: ["DAX", "MSDAX"],
	loader: () => __vitePreload(() => import("./msdax-vJGLaaS2.js"), [])
});
registerLanguage({
	id: "mysql",
	extensions: [],
	aliases: ["MySQL", "mysql"],
	loader: () => __vitePreload(() => import("./mysql-ij9nqVyt.js"), [])
});
registerLanguage({
	id: "objective-c",
	extensions: [".m"],
	aliases: ["Objective-C"],
	loader: () => __vitePreload(() => import("./objective-c-DqwVMt1M.js"), [])
});
registerLanguage({
	id: "pascal",
	extensions: [
		".pas",
		".p",
		".pp"
	],
	aliases: ["Pascal", "pas"],
	mimetypes: ["text/x-pascal-source", "text/x-pascal"],
	loader: () => __vitePreload(() => import("./pascal-CqiNiOk_.js"), [])
});
registerLanguage({
	id: "pascaligo",
	extensions: [".ligo"],
	aliases: ["Pascaligo", "ligo"],
	loader: () => __vitePreload(() => import("./pascaligo-C9z2Hqb0.js"), [])
});
registerLanguage({
	id: "perl",
	extensions: [".pl", ".pm"],
	aliases: ["Perl", "pl"],
	loader: () => __vitePreload(() => import("./perl-CpRidN_J.js"), [])
});
registerLanguage({
	id: "pgsql",
	extensions: [],
	aliases: [
		"PostgreSQL",
		"postgres",
		"pg",
		"postgre"
	],
	loader: () => __vitePreload(() => import("./pgsql-DEsR3r2v.js"), [])
});
registerLanguage({
	id: "php",
	extensions: [
		".php",
		".php4",
		".php5",
		".phtml",
		".ctp"
	],
	aliases: ["PHP", "php"],
	mimetypes: ["application/x-php"],
	loader: () => __vitePreload(() => import("./php-UKkFYm-I.js"), [])
});
registerLanguage({
	id: "pla",
	extensions: [".pla"],
	loader: () => __vitePreload(() => import("./pla-BvZh0-zI.js"), [])
});
registerLanguage({
	id: "postiats",
	extensions: [
		".dats",
		".sats",
		".hats"
	],
	aliases: ["ATS", "ATS/Postiats"],
	loader: () => __vitePreload(() => import("./postiats-COyufUhp.js"), [])
});
registerLanguage({
	id: "powerquery",
	extensions: [".pq", ".pqm"],
	aliases: [
		"PQ",
		"M",
		"Power Query",
		"Power Query M"
	],
	loader: () => __vitePreload(() => import("./powerquery-CEL3jZog.js"), [])
});
registerLanguage({
	id: "powershell",
	extensions: [
		".ps1",
		".psm1",
		".psd1"
	],
	aliases: [
		"PowerShell",
		"powershell",
		"ps",
		"ps1"
	],
	loader: () => __vitePreload(() => import("./powershell-D5vHb05G.js"), [])
});
registerLanguage({
	id: "proto",
	extensions: [".proto"],
	aliases: ["protobuf", "Protocol Buffers"],
	loader: () => __vitePreload(() => import("./protobuf-BYgGuDSb.js"), [])
});
registerLanguage({
	id: "pug",
	extensions: [".jade", ".pug"],
	aliases: [
		"Pug",
		"Jade",
		"jade"
	],
	loader: () => __vitePreload(() => import("./pug-DpVnuTsN.js"), [])
});
registerLanguage({
	id: "python",
	extensions: [
		".py",
		".rpy",
		".pyw",
		".cpy",
		".gyp",
		".gypi"
	],
	aliases: ["Python", "py"],
	firstLine: "^#!/.*\\bpython[0-9.-]*\\b",
	loader: () => __vitePreload(() => import("./python-Dg-KXuBF.js"), __vite__mapDeps([11,1,2,3,4]))
});
registerLanguage({
	id: "qsharp",
	extensions: [".qs"],
	aliases: ["Q#", "qsharp"],
	loader: () => __vitePreload(() => import("./qsharp-ChfLo46r.js"), [])
});
registerLanguage({
	id: "r",
	extensions: [
		".r",
		".rhistory",
		".rmd",
		".rprofile",
		".rt"
	],
	aliases: ["R", "r"],
	loader: () => __vitePreload(() => import("./r-Cjl8kz63.js"), [])
});
registerLanguage({
	id: "razor",
	extensions: [".cshtml"],
	aliases: ["Razor", "razor"],
	mimetypes: ["text/x-cshtml"],
	loader: () => __vitePreload(() => import("./razor-Vs6SqbYl.js"), __vite__mapDeps([12,1,2,3,4]))
});
registerLanguage({
	id: "redis",
	extensions: [".redis"],
	aliases: ["redis"],
	loader: () => __vitePreload(() => import("./redis-KCDjnHFh.js"), [])
});
registerLanguage({
	id: "redshift",
	extensions: [],
	aliases: ["Redshift", "redshift"],
	loader: () => __vitePreload(() => import("./redshift-BdUsqREX.js"), [])
});
registerLanguage({
	id: "restructuredtext",
	extensions: [".rst"],
	aliases: ["reStructuredText", "restructuredtext"],
	loader: () => __vitePreload(() => import("./restructuredtext-D6E7UyIv.js"), [])
});
registerLanguage({
	id: "ruby",
	extensions: [
		".rb",
		".rbx",
		".rjs",
		".gemspec",
		".pp"
	],
	filenames: ["rakefile", "Gemfile"],
	aliases: ["Ruby", "rb"],
	loader: () => __vitePreload(() => import("./ruby-Hvocuz9P.js"), [])
});
registerLanguage({
	id: "rust",
	extensions: [".rs", ".rlib"],
	aliases: ["Rust", "rust"],
	loader: () => __vitePreload(() => import("./rust-BF0MOezD.js"), [])
});
registerLanguage({
	id: "sb",
	extensions: [".sb"],
	aliases: ["Small Basic", "sb"],
	loader: () => __vitePreload(() => import("./sb-BKaI6jrz.js"), [])
});
registerLanguage({
	id: "scala",
	extensions: [
		".scala",
		".sc",
		".sbt"
	],
	aliases: [
		"Scala",
		"scala",
		"SBT",
		"Sbt",
		"sbt",
		"Dotty",
		"dotty"
	],
	mimetypes: [
		"text/x-scala-source",
		"text/x-scala",
		"text/x-sbt",
		"text/x-dotty"
	],
	loader: () => __vitePreload(() => import("./scala-Dt7qiTeC.js"), [])
});
registerLanguage({
	id: "scheme",
	extensions: [
		".scm",
		".ss",
		".sch",
		".rkt"
	],
	aliases: ["scheme", "Scheme"],
	loader: () => __vitePreload(() => import("./scheme-DTxxLBYu.js"), [])
});
registerLanguage({
	id: "scss",
	extensions: [".scss"],
	aliases: [
		"Sass",
		"sass",
		"scss"
	],
	mimetypes: ["text/x-scss", "text/scss"],
	loader: () => __vitePreload(() => import("./scss-Dlwaaosa.js"), [])
});
registerLanguage({
	id: "shell",
	extensions: [".sh", ".bash"],
	aliases: ["Shell", "sh"],
	loader: () => __vitePreload(() => import("./shell-CGIILoJR.js"), [])
});
registerLanguage({
	id: "sol",
	extensions: [".sol"],
	aliases: [
		"sol",
		"solidity",
		"Solidity"
	],
	loader: () => __vitePreload(() => import("./solidity-BenT4E5y.js"), [])
});
registerLanguage({
	id: "aes",
	extensions: [".aes"],
	aliases: [
		"aes",
		"sophia",
		"Sophia"
	],
	loader: () => __vitePreload(() => import("./sophia-DW-q7gYI.js"), [])
});
registerLanguage({
	id: "sparql",
	extensions: [".rq"],
	aliases: ["sparql", "SPARQL"],
	loader: () => __vitePreload(() => import("./sparql-CIpFkZWz.js"), [])
});
registerLanguage({
	id: "sql",
	extensions: [".sql"],
	aliases: ["SQL"],
	loader: () => __vitePreload(() => import("./sql-Ezbkvi6L.js"), [])
});
registerLanguage({
	id: "st",
	extensions: [
		".st",
		".iecst",
		".iecplc",
		".lc3lib",
		".TcPOU",
		".TcDUT",
		".TcGVL",
		".TcIO"
	],
	aliases: [
		"StructuredText",
		"scl",
		"stl"
	],
	loader: () => __vitePreload(() => import("./st-CfsOqzz5.js"), [])
});
registerLanguage({
	id: "swift",
	aliases: ["Swift", "swift"],
	extensions: [".swift"],
	mimetypes: ["text/swift"],
	loader: () => __vitePreload(() => import("./swift-BM03pHEE.js"), [])
});
registerLanguage({
	id: "systemverilog",
	extensions: [".sv", ".svh"],
	aliases: [
		"SV",
		"sv",
		"SystemVerilog",
		"systemverilog"
	],
	loader: () => __vitePreload(() => import("./systemverilog-DB39lDW1.js"), [])
});
registerLanguage({
	id: "verilog",
	extensions: [".v", ".vh"],
	aliases: [
		"V",
		"v",
		"Verilog",
		"verilog"
	],
	loader: () => __vitePreload(() => import("./systemverilog-DB39lDW1.js"), [])
});
registerLanguage({
	id: "tcl",
	extensions: [".tcl"],
	aliases: [
		"tcl",
		"Tcl",
		"tcltk",
		"TclTk",
		"tcl/tk",
		"Tcl/Tk"
	],
	loader: () => __vitePreload(() => import("./tcl-B1pUNMmS.js"), [])
});
registerLanguage({
	id: "twig",
	extensions: [".twig"],
	aliases: ["Twig", "twig"],
	mimetypes: ["text/x-twig"],
	loader: () => __vitePreload(() => import("./twig-Cf-txhKK.js"), [])
});
registerLanguage({
	id: "typescript",
	extensions: [
		".ts",
		".tsx",
		".cts",
		".mts"
	],
	aliases: [
		"TypeScript",
		"ts",
		"typescript"
	],
	mimetypes: ["text/typescript"],
	loader: () => {
		return __vitePreload(() => import("./typescript-Bg5KM5ZU.js"), __vite__mapDeps([8,1,2,3,4]));
	}
});
registerLanguage({
	id: "typespec",
	extensions: [".tsp"],
	aliases: ["TypeSpec"],
	loader: () => __vitePreload(() => import("./typespec-BsyaPq9d.js"), [])
});
registerLanguage({
	id: "vb",
	extensions: [".vb"],
	aliases: ["Visual Basic", "vb"],
	loader: () => __vitePreload(() => import("./vb-0U0kGZz6.js"), [])
});
registerLanguage({
	id: "wgsl",
	extensions: [".wgsl"],
	aliases: [
		"WebGPU Shading Language",
		"WGSL",
		"wgsl"
	],
	loader: () => __vitePreload(() => import("./wgsl-B3WKDaBi.js"), [])
});
registerLanguage({
	id: "xml",
	extensions: [
		".xml",
		".xsd",
		".dtd",
		".ascx",
		".csproj",
		".config",
		".props",
		".targets",
		".wxi",
		".wxl",
		".wxs",
		".xaml",
		".svg",
		".svgz",
		".opf",
		".xslt",
		".xsl"
	],
	firstLine: "(\\<\\?xml.*)|(\\<svg)|(\\<\\!doctype\\s+svg)",
	aliases: ["XML", "xml"],
	mimetypes: [
		"text/xml",
		"application/xml",
		"application/xaml+xml",
		"application/xml-dtd"
	],
	loader: () => __vitePreload(() => import("./xml-C62gg-qn.js"), __vite__mapDeps([13,1,2,3,4]))
});
registerLanguage({
	id: "yaml",
	extensions: [".yaml", ".yml"],
	aliases: [
		"YAML",
		"yaml",
		"YML",
		"yml"
	],
	mimetypes: ["application/x-yaml", "text/x-yaml"],
	loader: () => __vitePreload(() => import("./yaml-CIRO4g_3.js"), __vite__mapDeps([14,1,2,3,4]))
});
var LanguageServiceDefaultsImpl$2 = class {
	constructor(languageId, diagnosticsOptions, modeConfiguration) {
		this._onDidChange = new Emitter();
		this._languageId = languageId;
		this.setDiagnosticsOptions(diagnosticsOptions);
		this.setModeConfiguration(modeConfiguration);
	}
	get onDidChange() {
		return this._onDidChange.event;
	}
	get languageId() {
		return this._languageId;
	}
	get modeConfiguration() {
		return this._modeConfiguration;
	}
	get diagnosticsOptions() {
		return this._diagnosticsOptions;
	}
	setDiagnosticsOptions(options) {
		this._diagnosticsOptions = options || /* @__PURE__ */ Object.create(null);
		this._onDidChange.fire(this);
	}
	setModeConfiguration(modeConfiguration) {
		this._modeConfiguration = modeConfiguration || /* @__PURE__ */ Object.create(null);
		this._onDidChange.fire(this);
	}
};
var jsonDefaults = new LanguageServiceDefaultsImpl$2("json", {
	validate: true,
	allowComments: true,
	schemas: [],
	enableSchemaRequest: false,
	schemaRequest: "warning",
	schemaValidation: "warning",
	comments: "error",
	trailingCommas: "error"
}, {
	documentFormattingEdits: true,
	documentRangeFormattingEdits: true,
	completionItems: true,
	hovers: true,
	documentSymbols: true,
	tokens: true,
	colors: true,
	foldingRanges: true,
	diagnostics: true,
	selectionRanges: true
});
function getMode$2() {
	return __vitePreload(() => import("./jsonMode-ChFNWYV3.js"), __vite__mapDeps([15,16,1,2,3,4,17,18,19]));
}
languages.register({
	id: "json",
	extensions: [
		".json",
		".bowerrc",
		".jshintrc",
		".jscsrc",
		".eslintrc",
		".babelrc",
		".har"
	],
	aliases: ["JSON", "json"],
	mimetypes: ["application/json"]
});
languages.onLanguage("json", () => {
	getMode$2().then((mode2) => mode2.setupMode(jsonDefaults));
});
var LanguageServiceDefaultsImpl$1 = class {
	constructor(languageId, options, modeConfiguration) {
		this._onDidChange = new Emitter();
		this._languageId = languageId;
		this.setOptions(options);
		this.setModeConfiguration(modeConfiguration);
	}
	get onDidChange() {
		return this._onDidChange.event;
	}
	get languageId() {
		return this._languageId;
	}
	get modeConfiguration() {
		return this._modeConfiguration;
	}
	get diagnosticsOptions() {
		return this.options;
	}
	get options() {
		return this._options;
	}
	setOptions(options) {
		this._options = options || /* @__PURE__ */ Object.create(null);
		this._onDidChange.fire(this);
	}
	setDiagnosticsOptions(options) {
		this.setOptions(options);
	}
	setModeConfiguration(modeConfiguration) {
		this._modeConfiguration = modeConfiguration || /* @__PURE__ */ Object.create(null);
		this._onDidChange.fire(this);
	}
};
var optionsDefault$1 = {
	validate: true,
	lint: {
		compatibleVendorPrefixes: "ignore",
		vendorPrefix: "warning",
		duplicateProperties: "warning",
		emptyRules: "warning",
		importStatement: "ignore",
		boxModel: "ignore",
		universalSelector: "ignore",
		zeroUnits: "ignore",
		fontFaceProperties: "warning",
		hexColorLength: "error",
		argumentsInColorFunction: "error",
		unknownProperties: "warning",
		ieHack: "ignore",
		unknownVendorSpecificProperties: "ignore",
		propertyIgnoredDueToDisplay: "warning",
		important: "ignore",
		float: "ignore",
		idSelector: "ignore"
	},
	data: { useDefaultDataProvider: true },
	format: {
		newlineBetweenSelectors: true,
		newlineBetweenRules: true,
		spaceAroundSelectorSeparator: false,
		braceStyle: "collapse",
		maxPreserveNewLines: void 0,
		preserveNewLines: true
	}
};
var modeConfigurationDefault = {
	completionItems: true,
	hovers: true,
	documentSymbols: true,
	definitions: true,
	references: true,
	documentHighlights: true,
	rename: true,
	colors: true,
	foldingRanges: true,
	diagnostics: true,
	selectionRanges: true,
	documentFormattingEdits: true,
	documentRangeFormattingEdits: true
};
var cssDefaults = new LanguageServiceDefaultsImpl$1("css", optionsDefault$1, modeConfigurationDefault);
var scssDefaults = new LanguageServiceDefaultsImpl$1("scss", optionsDefault$1, modeConfigurationDefault);
var lessDefaults = new LanguageServiceDefaultsImpl$1("less", optionsDefault$1, modeConfigurationDefault);
function getMode$1() {
	return __vitePreload(() => import("./cssMode-B3QLgqr_.js"), __vite__mapDeps([20,16,1,2,3,4,17,18,19]));
}
languages.onLanguage("less", () => {
	getMode$1().then((mode2) => mode2.setupMode(lessDefaults));
});
languages.onLanguage("scss", () => {
	getMode$1().then((mode2) => mode2.setupMode(scssDefaults));
});
languages.onLanguage("css", () => {
	getMode$1().then((mode2) => mode2.setupMode(cssDefaults));
});
var LanguageServiceDefaultsImpl = class {
	constructor(languageId, options, modeConfiguration) {
		this._onDidChange = new Emitter();
		this._languageId = languageId;
		this.setOptions(options);
		this.setModeConfiguration(modeConfiguration);
	}
	get onDidChange() {
		return this._onDidChange.event;
	}
	get languageId() {
		return this._languageId;
	}
	get options() {
		return this._options;
	}
	get modeConfiguration() {
		return this._modeConfiguration;
	}
	setOptions(options) {
		this._options = options || /* @__PURE__ */ Object.create(null);
		this._onDidChange.fire(this);
	}
	setModeConfiguration(modeConfiguration) {
		this._modeConfiguration = modeConfiguration || /* @__PURE__ */ Object.create(null);
		this._onDidChange.fire(this);
	}
};
var optionsDefault = {
	format: {
		tabSize: 4,
		insertSpaces: false,
		wrapLineLength: 120,
		unformatted: "default\": \"a, abbr, acronym, b, bdo, big, br, button, cite, code, dfn, em, i, img, input, kbd, label, map, object, q, samp, select, small, span, strong, sub, sup, textarea, tt, var",
		contentUnformatted: "pre",
		indentInnerHtml: false,
		preserveNewLines: true,
		maxPreserveNewLines: void 0,
		indentHandlebars: false,
		endWithNewline: false,
		extraLiners: "head, body, /html",
		wrapAttributes: "auto"
	},
	suggest: {},
	data: { useDefaultDataProvider: true }
};
function getConfigurationDefault(languageId) {
	return {
		completionItems: true,
		hovers: true,
		documentSymbols: true,
		links: true,
		documentHighlights: true,
		rename: true,
		colors: true,
		foldingRanges: true,
		selectionRanges: true,
		diagnostics: languageId === htmlLanguageId,
		documentFormattingEdits: languageId === htmlLanguageId,
		documentRangeFormattingEdits: languageId === htmlLanguageId
	};
}
var htmlLanguageId = "html";
var handlebarsLanguageId = "handlebars";
var razorLanguageId = "razor";
registerHTMLLanguageService(htmlLanguageId, optionsDefault, getConfigurationDefault(htmlLanguageId)).defaults;
registerHTMLLanguageService(handlebarsLanguageId, optionsDefault, getConfigurationDefault(handlebarsLanguageId)).defaults;
registerHTMLLanguageService(razorLanguageId, optionsDefault, getConfigurationDefault(razorLanguageId)).defaults;
function getMode() {
	return __vitePreload(() => import("./htmlMode-TXXR0QKq.js"), __vite__mapDeps([21,16,1,2,3,4,17,18,19]));
}
function registerHTMLLanguageService(languageId, options = optionsDefault, modeConfiguration = getConfigurationDefault(languageId)) {
	const defaults = new LanguageServiceDefaultsImpl(languageId, options, modeConfiguration);
	let mode2;
	const onLanguageListener = languages.onLanguage(languageId, async () => {
		mode2 = (await getMode()).setupMode(defaults);
	});
	return {
		defaults,
		dispose() {
			onLanguageListener.dispose();
			mode2?.dispose();
			mode2 = void 0;
		}
	};
}
function WorkerWrapper(options) {
	return new Worker("/assets/editor.worker-Cv9aE7MZ.js", { name: options?.name });
}
function WorkerWrapper$1(options) {
	return new Worker("/assets/json.worker-QVsdhQrT.js", { name: options?.name });
}
function WorkerWrapper$2(options) {
	return new Worker("/assets/css.worker-XrFCQdxz.js", { name: options?.name });
}
function WorkerWrapper$3(options) {
	return new Worker("/assets/html.worker-C5d-GZBA.js", { name: options?.name });
}
function WorkerWrapper$4(options) {
	return new Worker("/assets/ts.worker-CPdy8PTG.js", { name: options?.name });
}
function registerPythonLanguage(monaco) {
	const kinds = {
		module: monaco.languages.CompletionItemKind.Module,
		class: monaco.languages.CompletionItemKind.Class,
		function: monaco.languages.CompletionItemKind.Function,
		instance: monaco.languages.CompletionItemKind.Variable,
		statement: monaco.languages.CompletionItemKind.Variable,
		param: monaco.languages.CompletionItemKind.Variable,
		keyword: monaco.languages.CompletionItemKind.Keyword,
		property: monaco.languages.CompletionItemKind.Property,
		path: monaco.languages.CompletionItemKind.File
	};
	const request = (model, position) => {
		const file = fileOfUri(model.uri);
		if (!file) return null;
		const at = {
			path: file.path,
			text: model.getValue(),
			line: position.lineNumber,
			column: position.column
		};
		return {
			workspaceId: file.workspaceId,
			at
		};
	};
	const signalOf = (token) => {
		const controller = new AbortController();
		token.onCancellationRequested(() => controller.abort());
		return controller.signal;
	};
	monaco.languages.registerCompletionItemProvider("python", {
		triggerCharacters: ["."],
		async provideCompletionItems(model, position, _context, token) {
			const call = request(model, position);
			if (!call) return { suggestions: [] };
			let items = [];
			try {
				items = await pythonIntel(call.workspaceId, "complete", call.at, signalOf(token));
			} catch {
				return { suggestions: [] };
			}
			const word = model.getWordUntilPosition(position);
			const range = new monaco.Range(position.lineNumber, word.startColumn, position.lineNumber, word.endColumn);
			return { suggestions: items.map((item, index) => ({
				label: item.name,
				kind: kinds[item.type] ?? monaco.languages.CompletionItemKind.Text,
				detail: item.detail,
				insertText: item.name,
				sortText: String(index).padStart(5, "0"),
				range
			})) };
		}
	});
	monaco.languages.registerHoverProvider("python", { async provideHover(model, position, token) {
		const call = request(model, position);
		if (!call || !model.getWordAtPosition(position)) return null;
		try {
			const text = await pythonIntel(call.workspaceId, "hover", call.at, signalOf(token));
			return text ? { contents: [{ value: text }] } : null;
		} catch {
			return null;
		}
	} });
	monaco.languages.registerDefinitionProvider("python", { async provideDefinition(model, position, token) {
		const call = request(model, position);
		if (!call) return null;
		try {
			return (await pythonIntel(call.workspaceId, "definition", call.at, signalOf(token))).map((location) => ({
				uri: fileUri(call.workspaceId, location.path),
				range: new monaco.Range(location.line, location.column, location.line, location.column)
			}));
		} catch {
			return null;
		}
	} });
	monaco.editor.registerEditorOpener({ openCodeEditor(_source, resource, selectionOrPosition) {
		const file = fileOfUri(resource);
		if (!file) return false;
		const start = selectionOrPosition && "startLineNumber" in selectionOrPosition ? {
			line: selectionOrPosition.startLineNumber,
			column: selectionOrPosition.startColumn
		} : selectionOrPosition ? {
			line: selectionOrPosition.lineNumber,
			column: selectionOrPosition.column
		} : {
			line: 1,
			column: 1
		};
		useCodeEditorStore.getState().openFile(file.workspaceId, file.path, {
			preview: false,
			...start
		});
		return true;
	} });
}
self.MonacoEnvironment = { getWorker(_workerId, label) {
	if (label === "json") return new WorkerWrapper$1();
	if (label === "css" || label === "scss" || label === "less") return new WorkerWrapper$2();
	if (label === "html" || label === "handlebars" || label === "razor") return new WorkerWrapper$3();
	if (label === "typescript" || label === "javascript") return new WorkerWrapper$4();
	return new WorkerWrapper();
} };
for (const defaults of [typescriptDefaults, javascriptDefaults]) {
	defaults.setDiagnosticsOptions({
		noSemanticValidation: true,
		noSyntaxValidation: false
	});
	defaults.setCompilerOptions({
		target: ScriptTarget.ESNext,
		module: ModuleKind.ESNext,
		moduleResolution: ModuleResolutionKind.NodeJs,
		jsx: JsxEmit.ReactJSX,
		allowJs: true,
		allowNonTsExtensions: true,
		esModuleInterop: true
	});
}
setMonaco(editor_api_exports);
registerPythonLanguage(editor_api_exports);
var probe;
function tokenHex(name, fallback) {
	const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
	if (!raw) return fallback;
	if (probe === void 0) probe = document.createElement("canvas").getContext("2d");
	if (!probe) return fallback;
	probe.fillStyle = fallback;
	probe.fillStyle = /^[\d.]+(deg)?\s/.test(raw) ? `hsl(${raw})` : raw;
	const value = String(probe.fillStyle);
	if (value.startsWith("#")) return value;
	const parts = value.match(/[\d.]+/g)?.map(Number) ?? [];
	if (parts.length < 3) return fallback;
	const [red, green, blue, alpha = 1] = parts;
	return `#${[
		red,
		green,
		blue,
		Math.round(alpha * 255)
	].map((part) => part.toString(16).padStart(2, "0")).join("")}`;
}
function applyTheme(dark) {
	const background = tokenHex("--background", dark ? "#171717" : "#ffffff");
	const foreground = tokenHex("--foreground", dark ? "#e5e5e5" : "#171717");
	const muted = tokenHex("--muted-foreground", dark ? "#a3a3a3" : "#737373");
	const border = tokenHex("--border", dark ? "#2e2e2e" : "#e5e5e5");
	const lift = tokenHex("--secondary", dark ? "#262626" : "#f5f5f5");
	const popover = tokenHex("--popover", background);
	const thumb = tokenHex("--border-strong", dark ? "#404040" : "#bdbdbd");
	editor.defineTheme("jarvis", {
		base: dark ? "vs-dark" : "vs",
		inherit: true,
		rules: [],
		colors: {
			"editor.background": background,
			"editor.foreground": foreground,
			"editorGutter.background": background,
			"minimap.background": background,
			"editorLineNumber.foreground": `${muted.slice(0, 7)}99`,
			"editorLineNumber.activeForeground": foreground,
			"editor.lineHighlightBackground": `${lift.slice(0, 7)}aa`,
			"editor.lineHighlightBorder": "#00000000",
			"editorIndentGuide.background1": border,
			"editorWidget.background": popover,
			"editorWidget.border": border,
			"editorSuggestWidget.background": popover,
			"editorSuggestWidget.border": border,
			"editorHoverWidget.background": popover,
			"editorHoverWidget.border": border,
			"input.background": lift,
			"input.border": border,
			"focusBorder": border,
			"scrollbar.shadow": "#00000000",
			"scrollbarSlider.background": thumb.slice(0, 7),
			"scrollbarSlider.hoverBackground": `${muted.slice(0, 7)}aa`,
			"scrollbarSlider.activeBackground": `${muted.slice(0, 7)}dd`,
			"diffEditor.border": border
		}
	});
	editor.setTheme("jarvis");
}
const EDITOR_OPTIONS = {
	automaticLayout: true,
	fontFamily: "\"JetBrains Mono\", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
	fontSize: 13,
	lineHeight: 20,
	minimap: {
		enabled: true,
		renderCharacters: false,
		maxColumn: 100
	},
	stickyScroll: { enabled: true },
	bracketPairColorization: { enabled: true },
	guides: {
		bracketPairs: "active",
		indentation: true
	},
	smoothScrolling: true,
	scrollbar: {
		verticalScrollbarSize: 10,
		horizontalScrollbarSize: 10,
		useShadows: false
	},
	cursorSmoothCaretAnimation: "on",
	renderWhitespace: "selection",
	scrollBeyondLastLine: false,
	padding: {
		top: 8,
		bottom: 8
	},
	fixedOverflowWidgets: true,
	mouseWheelZoom: false,
	find: {
		addExtraSpaceOnTop: false,
		seedSearchStringFromSelection: "selection"
	}
};
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var baseName = (path) => path.split("/").pop() ?? path;
var folderOf = (path) => path.includes("/") ? path.slice(0, path.lastIndexOf("/") + 1) : "";
function resolveRelative(fromFile, href) {
	let target = href.split("#", 1)[0].split("?", 1)[0];
	try {
		target = decodeURIComponent(target);
	} catch {
		return null;
	}
	if (!target) return null;
	const parts = target.startsWith("/") ? target.slice(1).split("/") : `${folderOf(fromFile)}${target}`.split("/");
	const resolved = [];
	for (const part of parts) {
		if (!part || part === ".") continue;
		if (part === "..") {
			if (!resolved.length) return null;
			resolved.pop();
		} else resolved.push(part);
	}
	return resolved.length ? resolved.join("/") : null;
}
function OpenExternallyButton({ onClick }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-3 text-xs text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
			className: "h-3.5 w-3.5",
			"aria-hidden": true
		}), t("code_editor.open_externally")]
	});
}
function MediaViewer({ kind, workspaceId, path, onOpenExternally }) {
	const t = useT();
	const [failed, setFailed] = (0, import_react.useState)(false);
	const url = (0, import_react.useMemo)(() => `${workspaceFileUrl(workspaceId, path)}&v=${Date.now()}`, [workspaceId, path]);
	(0, import_react.useEffect)(() => setFailed(false), [url]);
	if (failed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		message: t("code_editor.media_failed"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenExternallyButton, { onClick: onOpenExternally })
	});
	if (kind === "pdf") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
		"data-testid": "code-editor-pdf",
		title: baseName(path),
		src: url,
		className: "h-full w-full border-0 bg-white"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full w-full items-center justify-center overflow-auto p-6",
		children: [
			kind === "image" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: url,
				alt: baseName(path),
				onError: () => setFailed(true),
				className: "max-h-full max-w-full rounded-md border border-border/60 object-contain"
			}),
			kind === "audio" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
				src: url,
				controls: true,
				onError: () => setFailed(true),
				className: "w-full max-w-xl"
			}),
			kind === "video" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				src: url,
				controls: true,
				onError: () => setFailed(true),
				className: "max-h-full max-w-full bg-black"
			})
		]
	});
}
function ExtractedPreview({ workspaceId, path, note, onOpenExternally }) {
	const t = useT();
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let alive = true;
		setPreview(null);
		setError("");
		fetchWorkspaceFilePreview(workspaceId, path).then((answer) => alive && setPreview(answer)).catch((err) => alive && setError(err.message));
		return () => {
			alive = false;
		};
	}, [workspaceId, path]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "scrollbar-jarvis h-full overflow-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 z-[1] flex flex-wrap items-center gap-2 border-b border-border/60 bg-background/95 px-4 py-2 text-xs text-muted-foreground backdrop-blur-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileWarning, {
					className: "h-3.5 w-3.5 shrink-0",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 flex-1",
					children: note
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenExternallyButton, { onClick: onOpenExternally })
			]
		}), error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-4 py-3 text-xs text-destructive",
			children: error
		}) : !preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "flex items-center gap-2 px-4 py-3 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
				className: "h-3.5 w-3.5 animate-spin",
				"aria-hidden": true
			}), t("code_editor.loading")]
		}) : preview.text ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [preview.truncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-4 pt-3 text-xs text-muted-foreground",
			children: t("code_editor.truncated")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			"data-testid": "code-editor-extracted",
			className: "whitespace-pre-wrap break-words px-4 py-3 font-mono text-[12.5px] leading-relaxed text-foreground",
			children: preview.text
		})] }) : preview.hex_preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			"data-testid": "code-editor-extracted",
			className: "whitespace-pre-wrap break-words px-4 py-3 font-mono text-[12.5px] leading-relaxed text-muted-foreground",
			children: preview.hex_preview
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-4 py-3 text-xs text-muted-foreground",
			children: t("code_editor.empty")
		})]
	});
}
function useModelText(fileKey) {
	const [text, setText] = (0, import_react.useState)(() => modelOf(fileKey)?.getValue() ?? "");
	(0, import_react.useEffect)(() => {
		const model = modelOf(fileKey);
		if (!model) return;
		setText(model.getValue());
		const listener = model.onDidChangeContent(() => setText(model.getValue()));
		return () => listener.dispose();
	}, [fileKey]);
	return text;
}
function RenderedPreview({ kind, fileKey, workspaceId, path }) {
	const t = useT();
	const text = useModelText(fileKey);
	const svgUrl = (0, import_react.useMemo)(() => kind === "svg" ? URL.createObjectURL(new Blob([text], { type: "image/svg+xml" })) : "", [kind, text]);
	(0, import_react.useEffect)(() => () => {
		if (svgUrl) URL.revokeObjectURL(svgUrl);
	}, [svgUrl]);
	const components = (0, import_react.useMemo)(() => ({
		a: ({ href, children, ...props }) => {
			if (!href || /^(https?:|mailto:)/i.test(href)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href,
				target: "_blank",
				rel: "noreferrer noopener",
				...props,
				children
			});
			if (href.startsWith("#")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href,
				...props,
				children
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href,
				...props,
				onClick: (event) => {
					event.preventDefault();
					const target = resolveRelative(path, href);
					if (target) useCodeEditorStore.getState().openFile(workspaceId, target, { preview: false });
				},
				children
			});
		},
		img: ({ src, alt, ...props }) => {
			if (!src || /^[a-z][a-z0-9+.-]*:/i.test(src) || src.startsWith("//")) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-xs text-muted-foreground",
				children: [
					"[",
					alt || src,
					"]"
				]
			});
			const target = resolveRelative(path, src);
			return target ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: workspaceFileUrl(workspaceId, target),
				alt: alt ?? "",
				loading: "lazy",
				...props
			}) : null;
		}
	}), [path, workspaceId]);
	if (kind === "html") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
		"data-testid": "code-editor-rendered",
		title: t("code_editor.preview"),
		sandbox: "",
		srcDoc: text,
		className: "h-full w-full border-0 bg-white"
	});
	if (kind === "svg") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-testid": "code-editor-rendered",
		className: "flex h-full w-full items-center justify-center overflow-auto p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: svgUrl,
			alt: baseName(path),
			className: "max-h-full max-w-full"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "scrollbar-jarvis h-full overflow-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
			"data-testid": "code-editor-rendered",
			className: "prose prose-neutral mx-auto max-w-3xl px-8 py-6 text-sm dark:prose-invert prose-code:text-foreground prose-pre:border prose-pre:border-border prose-pre:bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, {
				remarkPlugins: [remarkGfm],
				components,
				children: text
			})
		})
	});
}
function Notice({ message, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full w-full items-center justify-center p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex max-w-sm flex-col items-center gap-3 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileWarning, {
					className: "h-8 w-8 text-muted-foreground/70",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: message
				}),
				children
			]
		})
	});
}
function reportCursor(editor$1) {
	const model = editor$1.getModel();
	const position = editor$1.getPosition();
	if (!model || !position) {
		useCodeEditorStore.getState().setCursor(null);
		return;
	}
	const selected = (editor$1.getSelections() ?? []).reduce((sum, range) => sum + model.getValueLengthInRange(range), 0);
	const options = model.getOptions();
	useCodeEditorStore.getState().setCursor({
		line: position.lineNumber,
		column: position.column,
		selected,
		language: model.getLanguageId(),
		insertSpaces: options.insertSpaces,
		tabSize: options.tabSize
	});
}
function watchCursor(editor$1) {
	return [
		editor$1.onDidChangeCursorSelection(() => reportCursor(editor$1)),
		editor$1.onDidChangeModel(() => reportCursor(editor$1)),
		editor$1.onDidChangeModelOptions(() => reportCursor(editor$1))
	];
}
var keepContextMenu = (event) => event.stopPropagation();
function EditorSurface({ tab, rendered, onOpenExternally }) {
	const t = useT();
	const codeHost = (0, import_react.useRef)(null);
	const diffHost = (0, import_react.useRef)(null);
	const editorRef = (0, import_react.useRef)(null);
	const diffRef = (0, import_react.useRef)(null);
	const shown = (0, import_react.useRef)(null);
	const handledReveal = (0, import_react.useRef)(0);
	const file = useCodeEditorStore((state) => state.files[tab.fileKey]);
	const reveal = useCodeEditorStore((state) => state.reveal);
	const status = file?.status ?? "loading";
	const ready = status === "ready";
	const renderKind = renderKindOf(tab.path);
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		const sync = () => applyTheme(root.classList.contains("dark"));
		sync();
		const observer = new MutationObserver(sync);
		observer.observe(root, {
			attributes: true,
			attributeFilter: ["class", "style"]
		});
		return () => observer.disconnect();
	}, []);
	(0, import_react.useEffect)(() => {
		const editor$1 = editor.create(codeHost.current, {
			...EDITOR_OPTIONS,
			model: null,
			theme: "jarvis"
		});
		editorRef.current = editor$1;
		const watchers = watchCursor(editor$1);
		return () => {
			if (shown.current) rememberViewState(shown.current, editor$1.saveViewState());
			for (const watcher of watchers) watcher.dispose();
			editor$1.dispose();
			diffRef.current?.dispose();
			diffRef.current = null;
			editorRef.current = null;
			useCodeEditorStore.getState().setCursor(null);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (status === "loading") loadFile(tab.fileKey);
	}, [tab.fileKey, status]);
	(0, import_react.useEffect)(() => {
		const editor$1 = editorRef.current;
		const model = modelOf(tab.fileKey);
		if (tab.mode !== "edit" || !ready || !editor$1 || !model) return;
		if (editor$1.getModel() !== model || shown.current !== tab.key) {
			if (shown.current && editor$1.getModel()) rememberViewState(shown.current, editor$1.saveViewState());
			editor$1.setModel(model);
			const state = viewStateOf(tab.key);
			if (state) editor$1.restoreViewState(state);
			shown.current = tab.key;
		}
		reportCursor(editor$1);
		editor$1.focus();
	}, [
		tab.key,
		tab.fileKey,
		tab.mode,
		ready
	]);
	(0, import_react.useEffect)(() => {
		const editor$1 = editorRef.current;
		const model = modelOf(tab.fileKey);
		if (tab.mode !== "edit" || !ready || !editor$1 || !model) return;
		let alive = true;
		let base = null;
		let timer;
		const collection = editor$1.createDecorationsCollection();
		const paint = () => {
			if (!alive || base === null || editor$1.getModel() !== model) {
				collection.clear();
				return;
			}
			const lines = model.getLineCount();
			const changes = gutterChanges(base, model.getValue()) ?? [];
			collection.set(changes.map((change) => {
				const below = change.kind === "deleted" && change.start > lines;
				return {
					range: new Range(Math.min(change.start, lines), 1, Math.min(change.end, lines), 1),
					options: {
						isWholeLine: true,
						linesDecorationsClassName: below ? "jarvis-gutter-deleted-below" : `jarvis-gutter-${change.kind}`
					}
				};
			}));
		};
		loadHeadText(tab.fileKey).then((text) => {
			base = text;
			paint();
		});
		const listener = model.onDidChangeContent(() => {
			window.clearTimeout(timer);
			timer = window.setTimeout(paint, 250);
		});
		return () => {
			alive = false;
			window.clearTimeout(timer);
			listener.dispose();
			collection.clear();
		};
	}, [
		tab.key,
		tab.fileKey,
		tab.mode,
		ready
	]);
	const diffBaseRef = useCodeEditorStore((state) => state.diffBases[tab.fileKey]?.ref ?? "");
	(0, import_react.useEffect)(() => {
		if (tab.mode !== "diff" || !ready) return;
		let alive = true;
		let watchers = [];
		loadHead(tab.fileKey).then((original) => {
			const modified = modelOf(tab.fileKey);
			if (!alive || !original || !modified || !diffHost.current) return;
			let diff = diffRef.current;
			if (!diff) {
				diff = editor.createDiffEditor(diffHost.current, {
					...EDITOR_OPTIONS,
					minimap: { enabled: false },
					stickyScroll: { enabled: false },
					scrollbar: {
						...EDITOR_OPTIONS.scrollbar,
						vertical: "hidden",
						verticalScrollbarSize: 0
					},
					originalEditable: false,
					renderSideBySide: true,
					useInlineViewWhenSpaceIsLimited: true,
					renderSideBySideInlineBreakpoint: 900,
					theme: "jarvis"
				});
				diffRef.current = diff;
			}
			diff.setModel({
				original,
				modified
			});
			const right = diff.getModifiedEditor();
			watchers = watchCursor(right);
			reportCursor(right);
			right.focus();
		});
		return () => {
			alive = false;
			for (const watcher of watchers) watcher.dispose();
		};
	}, [
		tab.key,
		tab.fileKey,
		tab.mode,
		ready,
		diffBaseRef
	]);
	(0, import_react.useEffect)(() => {
		if (!ready || !reveal || reveal.fileKey !== tab.fileKey || reveal.nonce === handledReveal.current) return;
		const editor$1 = tab.mode === "diff" ? diffRef.current?.getModifiedEditor() : editorRef.current;
		if (!editor$1 || editor$1.getModel() !== modelOf(tab.fileKey)) return;
		handledReveal.current = reveal.nonce;
		const position = {
			lineNumber: reveal.line,
			column: reveal.column
		};
		if (reveal.length > 0) editor$1.setSelection(new Selection(reveal.line, reveal.column, reveal.line, reveal.column + reveal.length));
		else editor$1.setPosition(position);
		editor$1.revealPositionInCenter(position);
		editor$1.focus();
	}, [
		reveal,
		ready,
		tab.fileKey,
		tab.mode,
		tab.key
	]);
	const external = () => onOpenExternally(tab.path);
	const overlay = (() => {
		if (status === "loading") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "flex h-full items-center justify-center gap-2 text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
				className: "h-4 w-4 animate-spin",
				"aria-hidden": true
			}), t("code_editor.loading")]
		});
		if (status === "ready") return rendered && renderKind && tab.mode === "edit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RenderedPreview, {
			kind: renderKind,
			fileKey: tab.fileKey,
			workspaceId: tab.workspaceId,
			path: tab.path
		}) : null;
		if (status === "image" || status === "pdf" || status === "audio" || status === "video") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaViewer, {
			kind: status,
			workspaceId: tab.workspaceId,
			path: tab.path,
			onOpenExternally: external
		});
		if (status === "document" || status === "binary" || status === "too_large") {
			const note = status === "document" ? t("code_editor.document_note") : status === "binary" ? t("code_editor.binary") : t("code_editor.too_large");
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtractedPreview, {
				workspaceId: tab.workspaceId,
				path: tab.path,
				note,
				onOpenExternally: external
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { message: fill(t("code_editor.load_failed"), { error: file?.error ?? "" }) });
	})();
	const showCode = ready && tab.mode === "edit";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-full min-h-0 w-full",
		"data-testid": "code-editor-surface",
		"data-language": languageFor(tab.path),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: codeHost,
				onContextMenu: keepContextMenu,
				className: cn("absolute inset-0", !showCode && "invisible")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: diffHost,
				onContextMenu: keepContextMenu,
				className: cn("absolute inset-0", (tab.mode !== "diff" || !ready) && "hidden")
			}),
			overlay && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 bg-background",
				children: overlay
			})
		]
	});
}
export { EditorSurface as default };
