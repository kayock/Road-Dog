import { t as AlignLeft } from "./align-left-C00Ipjex.js";
import { t as BookOpen } from "./book-open-DEmwG-44.js";
import { t as Check } from "./check-vbwKkbPq.js";
import { t as Clock } from "./clock-DMTiT8Bw.js";
import { t as FileCode2 } from "./file-code-2-XD1w1eX0.js";
import { t as FileText } from "./file-text-D8DI7Rfv.js";
import { t as FileWarning } from "./file-warning-Cea43YOp.js";
import { t as Lightbulb } from "./lightbulb-c8CTbRJA.js";
import { t as MessageSquare } from "./message-square-DJ9k0qrk.js";
import { t as NotebookPen } from "./notebook-pen-dOa4ZSSQ.js";
import { t as Rocket } from "./rocket-BN1uCWd_.js";
import { t as ShieldCheck } from "./shield-check-CO1F4Nzq.js";
import { t as SlidersHorizontal } from "./sliders-horizontal-Bjpys59J.js";
import { Bc as require_jsx_runtime, Cn as Portal, Et as openExternalUrl, F as robustCopy, Fi as Info, Ln as cn, Oc as useQuery, Qi as ArrowLeft, Sn as Overlay, Tn as Title, Us as isMacClient, Vi as ExternalLink, Wi as Copy, Xc as require_react, Y as ScrollArea, Zi as ArrowRight, bn as Content, gi as Search, ji as LoaderCircle, li as TriangleAlert, na as createLucideIcon, oc as useT, qi as ChevronDown, sc as useUiLanguage, tl as __toESM, wn as Root, xn as Description, yi as RefreshCw } from "./index-BOzhgzD7.js";
import { t as _e } from "./dist-B6qknip3.js";
import { a as SKIP, i as visit, n as Markdown, o as esm_default, t as remarkGfm } from "./lib-BoWxqGgd.js";
import { t as CodeBlock } from "./CodeBlock-BucrVDj0.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Blocks = createLucideIcon("Blocks", [["rect", {
	width: "7",
	height: "7",
	x: "14",
	y: "3",
	rx: "1",
	key: "6d4xhi"
}], ["path", {
	d: "M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3",
	key: "1fpvtg"
}]]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
const DIATAXIS_ORDER = [
	"tutorial",
	"howto",
	"explanation",
	"reference",
	"troubleshooting",
	"adr",
	"unclassified"
];
function buildDocSections(grouped) {
	const bySection = /* @__PURE__ */ new Map();
	for (const kind of DIATAXIS_ORDER) for (const doc of grouped?.[kind] ?? []) {
		const name = doc.section || "Other";
		const existing = bySection.get(name);
		if (existing) {
			existing.order = Math.min(existing.order, doc.section_order);
			existing.docs.push(doc);
		} else bySection.set(name, {
			name,
			order: doc.section_order,
			docs: [doc]
		});
	}
	return [...bySection.values()].map((section) => ({
		...section,
		docs: [...section.docs].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
	})).sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}
var DOC_REQUEST_TIMEOUT_MS = 8e3;
async function fetchDocsJson(url, init) {
	const controller = new AbortController();
	const timeout = window.setTimeout(() => controller.abort(), DOC_REQUEST_TIMEOUT_MS);
	try {
		const res = await fetch(url, {
			...init,
			signal: controller.signal
		});
		const body = await res.json().catch(() => null);
		if (!res.ok) {
			const detail = body && typeof body === "object" && "detail" in body ? String(body.detail) : `HTTP ${res.status}`;
			throw new Error(detail);
		}
		return body;
	} catch (error) {
		if (error instanceof DOMException && error.name === "AbortError") throw new Error("Documentation request timed out");
		throw error;
	} finally {
		window.clearTimeout(timeout);
	}
}
async function fetchDocsGrouped() {
	return fetchDocsJson("/api/docs/grouped?compact=true");
}
async function fetchDocDetail(slug$1) {
	return fetchDocsJson(`/api/docs/${encodeURIComponent(slug$1)}`);
}
async function fetchDocSearch(q, diataxis, limit = 20) {
	const params = new URLSearchParams({
		q,
		limit: String(limit)
	});
	if (diataxis) params.set("diataxis", diataxis);
	return fetchDocsJson(`/api/docs/search?${params}`);
}
function useDocsGrouped() {
	return useQuery({
		queryKey: ["docs", "grouped"],
		queryFn: fetchDocsGrouped,
		staleTime: 5 * 6e4,
		retry: false
	});
}
function useDocDetail(slug$1) {
	return useQuery({
		queryKey: [
			"docs",
			"detail",
			slug$1
		],
		queryFn: () => fetchDocDetail(slug$1),
		enabled: slug$1 !== null,
		staleTime: 6e4,
		retry: false
	});
}
function useDocSearch(q, diataxis, enabled = true) {
	return useQuery({
		queryKey: [
			"docs",
			"search",
			q,
			diataxis
		],
		queryFn: () => fetchDocSearch(q, diataxis),
		enabled: enabled && q.trim().length > 0,
		staleTime: 5e3,
		retry: false
	});
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
const DOCS_REPO_URL = "https://github.com/tbwcheatwood-hue/Hue";
const ONLINE_DOCS_URL = `${DOCS_REPO_URL}/tree/main/docs`;
function docSourceUrl(path) {
	return `${DOCS_REPO_URL}/blob/main/${path.replace(/^\/+/, "")}`;
}
var SECTION_ICONS = [
	[/start/i, Rocket],
	[/everyday|use/i, MessageSquare],
	[/personali[sz]e|connect/i, SlidersHorizontal],
	[/knowledge|shar/i, BookOpen],
	[/extend|automat/i, Blocks],
	[/privacy|safety|support/i, ShieldCheck],
	[/reference/i, FileCode2]
];
function sectionIcon(name) {
	for (const [pattern, icon] of SECTION_ICONS) if (pattern.test(name)) return icon;
	return FileText;
}
function searchShortcutLabel() {
	return typeof navigator !== "undefined" && isMacClient(navigator.userAgent) ? "⌘K" : "Ctrl K";
}
function readingMinutes(markdown) {
	const words = markdown.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / 220));
}
function SearchTrigger({ onClick, size = "md", className }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		"aria-label": t("docs.search_modal_title"),
		className: cn("group flex w-full items-center gap-2.5 rounded-md border border-border bg-input text-left text-muted-foreground transition-colors", "hover:border-border-strong hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", size === "lg" ? "h-11 px-4 text-lg" : "h-9 px-3 text-base", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
				className: cn("shrink-0", size === "lg" ? "h-4 w-4" : "h-3.5 w-3.5"),
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex-1 truncate",
				children: size === "lg" ? t("docs.search_hero") : t("docs.search_button")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
				className: "shrink-0 rounded-sm border border-border px-1.5 py-0.5 font-sans text-xs font-medium text-foreground-faint",
				children: searchShortcutLabel()
			})
		]
	});
}
function DocsSidebar({ selectedSlug, onSelect, onShowOverview, onOpenSearch }) {
	const t = useT();
	const { data, isLoading, isFetching, error, refetch } = useDocsGrouped();
	const [collapsed, setCollapsed] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const sections = (0, import_react.useMemo)(() => buildDocSections(data), [data]);
	(0, import_react.useEffect)(() => {
		if (!selectedSlug) return;
		const owner = sections.find((section) => section.docs.some((doc) => doc.slug === selectedSlug));
		if (!owner) return;
		setCollapsed((prev) => {
			if (!prev.has(owner.name)) return prev;
			const next = new Set(prev);
			next.delete(owner.name);
			return next;
		});
	}, [selectedSlug, sections]);
	const toggle = (name) => {
		setCollapsed((prev) => {
			const next = new Set(prev);
			if (next.has(name)) next.delete(name);
			else next.add(name);
			return next;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		"aria-label": t("docs_sidebar.title"),
		className: "flex h-full w-64 shrink-0 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 pb-3 pt-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchTrigger, { onClick: onOpenSearch })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "px-3 pb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
							label: t("docs_sidebar.overview"),
							active: selectedSlug === null,
							onClick: onShowOverview
						}),
						isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarSkeleton, {}),
						error && !isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => void refetch(),
							className: "mt-4 inline-flex items-center gap-1.5 rounded-sm px-3 text-sm text-destructive transition-colors hover:text-destructive/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
								className: cn("h-3 w-3", isFetching && "animate-spin motion-reduce:animate-none"),
								"aria-hidden": "true"
							}), t("docs_sidebar.retry")]
						}),
						sections.map((section) => {
							const isCollapsed = collapsed.has(section.name);
							const groupId = `docs-nav-${section.order}-${section.docs[0]?.slug ?? "group"}`;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => toggle(section.name),
									"aria-expanded": !isCollapsed,
									"aria-controls": groupId,
									className: "group flex w-full items-center justify-between gap-2 rounded-sm px-3 py-1 text-left text-sm font-semibold text-foreground-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: section.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
										className: cn("h-3.5 w-3.5 shrink-0 text-foreground-faint opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100", isCollapsed && "-rotate-90 opacity-100"),
										"aria-hidden": "true"
									})]
								}), !isCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									id: groupId,
									className: "mt-1 space-y-px",
									children: section.docs.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
										label: doc.title,
										active: doc.slug === selectedSlug,
										onClick: () => onSelect(doc.slug)
									}) }, doc.slug))
								})]
							}, section.name);
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: ONLINE_DOCS_URL,
					onClick: (event) => {
						event.preventDefault();
						openExternalUrl(ONLINE_DOCS_URL);
					},
					rel: "noopener noreferrer",
					className: "inline-flex items-center gap-1.5 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					children: [t("docs_sidebar.github"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
						className: "h-3 w-3",
						"aria-hidden": "true"
					})]
				})
			})
		]
	});
}
function NavRow({ label, active, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		"data-active": active || void 0,
		"aria-current": active ? "page" : void 0,
		title: label,
		className: cn("block w-full rounded-md px-3 py-1.5 text-left text-base transition-colors", "hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", active ? "jarvis-nav-active font-medium text-foreground-strong" : "text-muted-foreground hover:text-foreground"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "line-clamp-2 break-words",
			children: label
		})
	});
}
function SidebarSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-5 animate-pulse space-y-6 px-3 motion-reduce:animate-none",
		"aria-hidden": "true",
		children: [
			5,
			4,
			6
		].map((rows, group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2.5 w-24 rounded-full bg-muted" }), Array.from({ length: rows }, (_, row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-2.5 rounded-full bg-muted/70",
				style: { width: `${55 + (row + group) % 3 * 14}%` }
			}, row))]
		}, group))
	});
}
const regex = /[\0-\x1F!-,\.\/:-@\[-\^`\{-\xA9\xAB-\xB4\xB6-\xB9\xBB-\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0378\u0379\u037E\u0380-\u0385\u0387\u038B\u038D\u03A2\u03F6\u0482\u0530\u0557\u0558\u055A-\u055F\u0589-\u0590\u05BE\u05C0\u05C3\u05C6\u05C8-\u05CF\u05EB-\u05EE\u05F3-\u060F\u061B-\u061F\u066A-\u066D\u06D4\u06DD\u06DE\u06E9\u06FD\u06FE\u0700-\u070F\u074B\u074C\u07B2-\u07BF\u07F6-\u07F9\u07FB\u07FC\u07FE\u07FF\u082E-\u083F\u085C-\u085F\u086B-\u089F\u08B5\u08C8-\u08D2\u08E2\u0964\u0965\u0970\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09F2-\u09FB\u09FD\u09FF\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF0-\u0AF8\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B54\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B70\u0B72-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BF0-\u0BFF\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C7F\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0CFF\u0D0D\u0D11\u0D45\u0D49\u0D4F-\u0D53\u0D58-\u0D5E\u0D64\u0D65\u0D70-\u0D79\u0D80\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF4-\u0E00\u0E3B-\u0E3F\u0E4F\u0E5A-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F01-\u0F17\u0F1A-\u0F1F\u0F2A-\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F48\u0F6D-\u0F70\u0F85\u0F98\u0FBD-\u0FC5\u0FC7-\u0FFF\u104A-\u104F\u109E\u109F\u10C6\u10C8-\u10CC\u10CE\u10CF\u10FB\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u1360-\u137F\u1390-\u139F\u13F6\u13F7\u13FE-\u1400\u166D\u166E\u1680\u169B-\u169F\u16EB-\u16ED\u16F9-\u16FF\u170D\u1715-\u171F\u1735-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17D4-\u17D6\u17D8-\u17DB\u17DE\u17DF\u17EA-\u180A\u180E\u180F\u181A-\u181F\u1879-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u1945\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DA-\u19FF\u1A1C-\u1A1F\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1AA6\u1AA8-\u1AAF\u1AC1-\u1AFF\u1B4C-\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BF4-\u1BFF\u1C38-\u1C3F\u1C4A-\u1C4C\u1C7E\u1C7F\u1C89-\u1C8F\u1CBB\u1CBC\u1CC0-\u1CCF\u1CD3\u1CFB-\u1CFF\u1DFA\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FBD\u1FBF-\u1FC1\u1FC5\u1FCD-\u1FCF\u1FD4\u1FD5\u1FDC-\u1FDF\u1FED-\u1FF1\u1FF5\u1FFD-\u203E\u2041-\u2053\u2055-\u2070\u2072-\u207E\u2080-\u208F\u209D-\u20CF\u20F1-\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F-\u215F\u2189-\u24B5\u24EA-\u2BFF\u2C2F\u2C5F\u2CE5-\u2CEA\u2CF4-\u2CFF\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D70-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E00-\u2E2E\u2E30-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u3040\u3097\u3098\u309B\u309C\u30A0\u30FB\u3100-\u3104\u3130\u318F-\u319F\u31C0-\u31EF\u3200-\u33FF\u4DC0-\u4DFF\u9FFD-\u9FFF\uA48D-\uA4CF\uA4FE\uA4FF\uA60D-\uA60F\uA62C-\uA63F\uA673\uA67E\uA6F2-\uA716\uA720\uA721\uA789\uA78A\uA7C0\uA7C1\uA7CB-\uA7F4\uA828-\uA82B\uA82D-\uA83F\uA874-\uA87F\uA8C6-\uA8CF\uA8DA-\uA8DF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA954-\uA95F\uA97D-\uA97F\uA9C1-\uA9CE\uA9DA-\uA9DF\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A-\uAA5F\uAA77-\uAA79\uAAC3-\uAADA\uAADE\uAADF\uAAF0\uAAF1\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB5B\uAB6A-\uAB6F\uABEB\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB29\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFC-\uFDFF\uFE10-\uFE1F\uFE30-\uFE32\uFE35-\uFE4C\uFE50-\uFE6F\uFE75\uFEFD-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF3E\uFF40\uFF5B-\uFF65\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDD3F\uDD75-\uDDFC\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEE1-\uDEFF\uDF20-\uDF2C\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDF9F\uDFC4-\uDFC7\uDFD0\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56-\uDC5F\uDC77-\uDC7F\uDC9F-\uDCDF\uDCF3\uDCF6-\uDCFF\uDD16-\uDD1F\uDD3A-\uDD7F\uDDB8-\uDDBD\uDDC0-\uDDFF\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE36\uDE37\uDE3B-\uDE3E\uDE40-\uDE5F\uDE7D-\uDE7F\uDE9D-\uDEBF\uDEC8\uDEE7-\uDEFF\uDF36-\uDF3F\uDF56-\uDF5F\uDF73-\uDF7F\uDF92-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCFF\uDD28-\uDD2F\uDD3A-\uDE7F\uDEAA\uDEAD-\uDEAF\uDEB2-\uDEFF\uDF1D-\uDF26\uDF28-\uDF2F\uDF51-\uDFAF\uDFC5-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC47-\uDC65\uDC70-\uDC7E\uDCBB-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD40-\uDD43\uDD48-\uDD4F\uDD74\uDD75\uDD77-\uDD7F\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDFF\uDE12\uDE38-\uDE3D\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEA9-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC4B-\uDC4F\uDC5A-\uDC5D\uDC62-\uDC7F\uDCC6\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDC1-\uDDD7\uDDDE-\uDDFF\uDE41-\uDE43\uDE45-\uDE4F\uDE5A-\uDE7F\uDEB9-\uDEBF\uDECA-\uDEFF\uDF1B\uDF1C\uDF2C-\uDF2F\uDF3A-\uDFFF]|\uD806[\uDC3B-\uDC9F\uDCEA-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD36\uDD39\uDD3A\uDD44-\uDD4F\uDD5A-\uDD9F\uDDA8\uDDA9\uDDD8\uDDD9\uDDE2\uDDE5-\uDDFF\uDE3F-\uDE46\uDE48-\uDE4F\uDE9A-\uDE9C\uDE9E-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC41-\uDC4F\uDC5A-\uDC71\uDC90\uDC91\uDCA8\uDCB7-\uDCFF\uDD07\uDD0A\uDD37-\uDD39\uDD3B\uDD3E\uDD48-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8F\uDD92\uDD99-\uDD9F\uDDAA-\uDEDF\uDEF7-\uDFAF\uDFB1-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD824-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83D\uD83F\uD87B-\uD87D\uD87F\uD885-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDECF\uDEEE\uDEEF\uDEF5-\uDEFF\uDF37-\uDF3F\uDF44-\uDF4F\uDF5A-\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE80-\uDEFF\uDF4B-\uDF4E\uDF88-\uDF8E\uDFA0-\uDFDF\uDFE2\uDFE5-\uDFEF\uDFF2-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD823[\uDCD6-\uDCFF\uDD09-\uDFFF]|\uD82C[\uDD1F-\uDD4F\uDD53-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A-\uDC9C\uDC9F-\uDFFF]|\uD834[\uDC00-\uDD64\uDD6A-\uDD6C\uDD73-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDE41\uDE45-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3\uDFCC\uDFCD]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDCFF\uDD2D-\uDD2F\uDD3E\uDD3F\uDD4A-\uDD4D\uDD4F-\uDEBF\uDEFA-\uDFFF]|\uD83A[\uDCC5-\uDCCF\uDCD7-\uDCFF\uDD4C-\uDD4F\uDD5A-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDFFF]|\uD83C[\uDC00-\uDD2F\uDD4A-\uDD4F\uDD6A-\uDD6F\uDD8A-\uDFFF]|\uD83E[\uDC00-\uDFEF\uDFFA-\uDFFF]|\uD869[\uDEDE-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]/g;
var own = Object.hasOwnProperty;
var BananaSlug = class {
	constructor() {
		this.occurrences;
		this.reset();
	}
	slug(value, maintainCase) {
		const self = this;
		let result = slug(value, maintainCase === true);
		const originalSlug = result;
		while (own.call(self.occurrences, result)) {
			self.occurrences[originalSlug]++;
			result = originalSlug + "-" + self.occurrences[originalSlug];
		}
		self.occurrences[result] = 0;
		return result;
	}
	reset() {
		this.occurrences = Object.create(null);
	}
};
function slug(value, maintainCase) {
	if (typeof value !== "string") return "";
	if (!maintainCase) value = value.toLowerCase();
	return value.replace(regex, "").replace(/ /g, "-");
}
function headingRank(node) {
	const name = node.type === "element" ? node.tagName.toLowerCase() : "";
	const code = name.length === 2 && name.charCodeAt(0) === 104 ? name.charCodeAt(1) : 0;
	return code > 48 && code < 55 ? code - 48 : void 0;
}
function toString(node) {
	if ("children" in node) return all(node);
	return "value" in node ? node.value : "";
}
function one(node) {
	if (node.type === "text") return node.value;
	return "children" in node ? all(node) : "";
}
function all(node) {
	let index = -1;
	const result = [];
	while (++index < node.children.length) result[index] = one(node.children[index]);
	return result.join("");
}
var emptyOptions$1 = {};
var slugs = new BananaSlug();
function rehypeSlug(options) {
	const prefix = (options || emptyOptions$1).prefix || "";
	return function(tree) {
		slugs.reset();
		visit(tree, "element", function(node) {
			if (headingRank(node) && !node.properties.id) node.properties.id = prefix + slugs.slug(toString(node));
		});
	};
}
const convertElement = (function(test) {
	if (test === null || test === void 0) return element;
	if (typeof test === "string") return tagNameFactory(test);
	if (typeof test === "object") return anyFactory(test);
	if (typeof test === "function") return castFactory(test);
	throw new Error("Expected function, string, or array as `test`");
});
function anyFactory(tests) {
	const checks = [];
	let index = -1;
	while (++index < tests.length) checks[index] = convertElement(tests[index]);
	return castFactory(any);
	function any(...parameters) {
		let index$1 = -1;
		while (++index$1 < checks.length) if (checks[index$1].apply(this, parameters)) return true;
		return false;
	}
}
function tagNameFactory(check) {
	return castFactory(tagName);
	function tagName(element$1) {
		return element$1.tagName === check;
	}
}
function castFactory(testFunction) {
	return check;
	function check(value, index, parent) {
		return Boolean(looksLikeAnElement(value) && testFunction.call(this, value, typeof index === "number" ? index : void 0, parent || void 0));
	}
}
function element(element$1) {
	return Boolean(element$1 && typeof element$1 === "object" && "type" in element$1 && element$1.type === "element" && "tagName" in element$1 && typeof element$1.tagName === "string");
}
function looksLikeAnElement(value) {
	return value !== null && typeof value === "object" && "type" in value && "tagName" in value;
}
var contentDefaults = {
	type: "element",
	tagName: "span",
	properties: { className: ["icon", "icon-link"] },
	children: []
};
var emptyOptions = {};
function rehypeAutolinkHeadings(options) {
	const settings = options || emptyOptions;
	let properties = settings.properties;
	const headingOroperties = settings.headingProperties;
	const behavior = settings.behavior || "prepend";
	const content = settings.content;
	const group = settings.group;
	const is = convertElement(settings.test);
	let method;
	if (behavior === "after" || behavior === "before") method = around;
	else if (behavior === "wrap") method = wrap;
	else {
		method = inject;
		if (!properties) properties = {
			ariaHidden: "true",
			tabIndex: -1
		};
	}
	return function(tree) {
		visit(tree, "element", function(node, index, parent) {
			if (headingRank(node) && node.properties.id && is(node, index, parent)) {
				Object.assign(node.properties, toProperties(headingOroperties, node));
				return method(node, index, parent);
			}
		});
	};
	function inject(node) {
		const children = toChildren(content || contentDefaults, node);
		node.children[behavior === "prepend" ? "unshift" : "push"](create(node, toProperties(properties, node), children));
		return [SKIP];
	}
	function around(node, index, parent) {
		/* c8 ignore next -- uncommon */
		if (typeof index !== "number" || !parent) return;
		const children = toChildren(content || contentDefaults, node);
		const link = create(node, toProperties(properties, node), children);
		let nodes = behavior === "before" ? [link, node] : [node, link];
		if (group) {
			const grouping = toNode(group, node);
			if (grouping && !Array.isArray(grouping) && grouping.type === "element") {
				grouping.children = nodes;
				nodes = [grouping];
			}
		}
		parent.children.splice(index, 1, ...nodes);
		return [SKIP, index + nodes.length];
	}
	function wrap(node) {
		let before = node.children;
		let after = [];
		if (typeof content === "function") {
			before = [];
			after = content(node);
		} else if (content) after = clone(content);
		node.children = [create(node, toProperties(properties, node), Array.isArray(after) ? [...before, ...after] : [...before, after])];
		return [SKIP];
	}
}
function clone(thing) {
	return esm_default(thing);
}
function create(node, properties, children) {
	return {
		type: "element",
		tagName: "a",
		properties: {
			...properties,
			href: "#" + node.properties.id
		},
		children
	};
}
function toChildren(value, node) {
	const result = toNode(value, node);
	return Array.isArray(result) ? result : [result];
}
function toNode(value, node) {
	if (typeof value === "function") return value(node);
	return clone(value);
}
function toProperties(value, node) {
	if (typeof value === "function") return value(node);
	return value ? clone(value) : {};
}
var STORAGE_KEY = "docs.recent.v1";
var MAX_ENTRIES = 5;
var CHANGE_EVENT = "docs-recent-changed";
function useRecentDocs() {
	const [recent, setRecent] = (0, import_react.useState)(() => loadFromStorage());
	(0, import_react.useEffect)(() => {
		const reload = () => setRecent(loadFromStorage());
		window.addEventListener("storage", (e) => {
			if (e.key === STORAGE_KEY) reload();
		});
		window.addEventListener(CHANGE_EVENT, reload);
		return () => {
			window.removeEventListener(CHANGE_EVENT, reload);
		};
	}, []);
	return {
		recent,
		push: (0, import_react.useCallback)((doc) => {
			setRecent((prev) => {
				const filtered = prev.filter((d) => d.slug !== doc.slug);
				const next = [{
					...doc,
					openedAt: Date.now()
				}, ...filtered].slice(0, MAX_ENTRIES);
				saveToStorage(next);
				return next;
			});
			window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
		}, []),
		clear: (0, import_react.useCallback)(() => {
			setRecent([]);
			try {
				window.localStorage.removeItem(STORAGE_KEY);
			} catch {}
			window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
		}, [])
	};
}
function loadFromStorage() {
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter((e) => e && typeof e === "object" && typeof e.slug === "string" && typeof e.title === "string").slice(0, MAX_ENTRIES);
	} catch {
		return [];
	}
}
function saveToStorage(entries) {
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
	} catch {}
}
var TOPIC_PREVIEW_COUNT = 4;
function DocsOverview({ onSelect, onOpenSearch }) {
	const t = useT();
	const { data, isLoading, isFetching, error, refetch } = useDocsGrouped();
	const { recent } = useRecentDocs();
	const sections = (0, import_react.useMemo)(() => buildDocSections(data), [data]);
	const sectionBySlug = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const section of sections) for (const doc of section.docs) map.set(doc.slug, section.name);
		return map;
	}, [sections]);
	const [startSection, ...topics] = sections;
	const recentDocs = recent.filter((doc) => sectionBySlug.has(doc.slug)).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-page pb-20 pt-14",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "max-w-reading",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-accent",
					children: t("docs_overview.eyebrow")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-2xl text-foreground-strong",
					children: t("docs_overview.title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-lg text-muted-foreground",
					children: t("docs_overview.description")
				}),
				onOpenSearch && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchTrigger, {
					size: "lg",
					onClick: onOpenSearch,
					className: "mt-8 max-w-xl"
				})
			]
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewSkeleton, {}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-12 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/[0.06] p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileWarning, {
				className: "mt-0.5 h-5 w-5 shrink-0 text-destructive",
				"aria-hidden": "true"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold text-foreground-strong",
					children: t("docs_overview.load_failed_title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-base text-muted-foreground",
					children: t("docs_overview.load_failed_description")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => void refetch(),
					className: "mt-4 inline-flex h-8 items-center gap-2 rounded-md border border-border-strong px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						className: cn("h-3.5 w-3.5", isFetching && "animate-spin motion-reduce:animate-none"),
						"aria-hidden": "true"
					}), t("docs_overview.retry")]
				})
			] })]
		}) : !startSection ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-12 rounded-lg border border-border p-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
					className: "mx-auto h-6 w-6 text-foreground-faint",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-lg font-semibold text-foreground-strong",
					children: t("docs_overview.empty_title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-base text-muted-foreground",
					children: t("docs_overview.empty_description")
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartPath, {
				section: startSection,
				onSelect
			}),
			recentDocs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				"aria-labelledby": "docs-recent-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "docs-recent-title",
					className: "text-sm font-semibold text-foreground-strong",
					children: t("docs_overview.recent_title")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: recentDocs.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onSelect(doc.slug),
						className: "group flex items-center justify-between gap-3 rounded-md border border-border px-4 py-3 text-left transition-colors hover:border-border-strong hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-base font-medium text-foreground",
								children: doc.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 block truncate text-sm text-muted-foreground",
								children: sectionBySlug.get(doc.slug)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							className: "h-3.5 w-3.5 shrink-0 text-foreground-faint transition-colors group-hover:text-foreground",
							"aria-hidden": "true"
						})]
					}, doc.slug))
				})]
			}),
			topics.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16",
				"aria-labelledby": "docs-topics-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "docs-topics-title",
						className: "text-xl font-semibold text-foreground-strong",
						children: t("docs_overview.browse_by_topic")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-base text-muted-foreground",
						children: t("docs_overview.browse_description")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3",
						children: topics.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopicCard, {
							section,
							onSelect
						}, section.name))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16 flex flex-col gap-5 border-t border-border pt-8 md:flex-row md:items-center md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold text-foreground-strong",
					children: t("docs_overview.help_title")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-base text-muted-foreground",
					children: t("docs_overview.help_description")
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 flex-wrap gap-2",
					children: [onOpenSearch && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onOpenSearch,
						className: "inline-flex h-9 items-center gap-2 rounded-md border border-border-strong px-4 text-base font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							className: "h-3.5 w-3.5",
							"aria-hidden": "true"
						}), t("docs.search_button")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: ONLINE_DOCS_URL,
						onClick: (event) => {
							event.preventDefault();
							openExternalUrl(ONLINE_DOCS_URL);
						},
						rel: "noopener noreferrer",
						className: "inline-flex h-9 items-center gap-2 rounded-md border border-border-strong px-4 text-base font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
						children: [t("docs_overview.online_docs"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
							className: "h-3.5 w-3.5",
							"aria-hidden": "true"
						})]
					})]
				})]
			})
		] })]
	});
}
function StartPath({ section, onSelect }) {
	const t = useT();
	const Icon = sectionIcon(section.name);
	const first = section.docs[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-14 grid overflow-hidden rounded-lg border border-border bg-card lg:grid-cols-5",
		"aria-labelledby": "docs-start-title",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col border-b border-border p-7 lg:col-span-2 lg:border-b-0 lg:border-r",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-9 w-9 items-center justify-center rounded-md bg-accent-soft text-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "h-4 w-4",
						"aria-hidden": "true"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "docs-start-title",
					className: "mt-5 text-xl font-semibold text-foreground-strong",
					children: t("docs_overview.start_title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-base text-muted-foreground",
					children: t("docs_overview.start_description")
				}),
				first && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onSelect(first.slug),
					className: "mt-6 inline-flex h-9 w-fit items-center gap-2 rounded-md bg-primary px-4 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
					children: [t("docs_overview.start_reading"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "h-3.5 w-3.5",
						"aria-hidden": "true"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "p-3 lg:col-span-3",
			children: section.docs.map((doc, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onSelect(doc.slug),
				className: "group flex w-full items-start gap-4 rounded-md px-4 py-3 text-left transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border-strong text-xs font-medium tabular-nums text-muted-foreground transition-colors group-hover:border-accent group-hover:text-accent",
					children: index + 1
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-base font-medium text-foreground",
						children: doc.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 line-clamp-1 text-sm text-muted-foreground",
						children: doc.summary
					})]
				})]
			}) }, doc.slug))
		})]
	});
}
function TopicCard({ section, onSelect }) {
	const t = useT();
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	const Icon = sectionIcon(section.name);
	const visible = expanded ? section.docs : section.docs.slice(0, TOPIC_PREVIEW_COUNT);
	const hidden = section.docs.length - TOPIC_PREVIEW_COUNT;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex flex-col rounded-lg border border-border bg-card p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary text-foreground-secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "h-4 w-4",
						"aria-hidden": "true"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-semibold text-foreground-strong",
					children: section.name
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 flex-1 space-y-px",
				children: visible.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onSelect(doc.slug),
					title: doc.summary,
					className: "group flex w-full items-center justify-between gap-3 rounded-sm py-1.5 text-left text-base text-foreground-secondary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-0 truncate",
						children: doc.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100",
						"aria-hidden": "true"
					})]
				}) }, doc.slug))
			}),
			hidden > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setExpanded((value) => !value),
				"aria-expanded": expanded,
				className: "mt-3 w-fit rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				children: expanded ? t("docs_overview.show_less") : t("docs_overview.show_all").replace("{0}", String(section.docs.length))
			})
		]
	});
}
function OverviewSkeleton() {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-14",
		role: "status",
		"aria-live": "polite",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-sm text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					className: "h-3.5 w-3.5 animate-spin text-accent motion-reduce:animate-none",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-foreground",
					children: t("docs_overview.indexing_title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "hidden sm:inline",
					children: ["— ", t("docs_overview.indexing_description")]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 animate-pulse motion-reduce:animate-none",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-56 rounded-lg border border-border bg-card" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-14 h-4 w-40 rounded-full bg-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3",
					children: [
						0,
						1,
						2
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "h-48 rounded-lg border border-border bg-card p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-1/2 rounded-full bg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2.5 w-4/5 rounded-full bg-muted/70" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2.5 w-3/5 rounded-full bg-muted/70" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2.5 w-2/3 rounded-full bg-muted/70" })
							]
						})]
					}, item))
				})
			]
		})]
	});
}
var VARIANTS = {
	note: {
		frame: "border-border bg-secondary/40",
		tone: "text-foreground-secondary",
		icon: NotebookPen,
		label: "docs_content.callout_note"
	},
	info: {
		frame: "border-accent/30 bg-accent-soft",
		tone: "text-accent",
		icon: Info,
		label: "docs_content.callout_info"
	},
	tip: {
		frame: "border-success/30 bg-success/[0.06]",
		tone: "text-success",
		icon: Lightbulb,
		label: "docs_content.callout_tip"
	},
	warning: {
		frame: "border-warning/35 bg-warning/[0.07]",
		tone: "text-warning",
		icon: TriangleAlert,
		label: "docs_content.callout_warning"
	}
};
function Callout({ type = "note", children }) {
	const t = useT();
	const variant = VARIANTS[type];
	const Icon = variant.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: cn("not-prose my-6 rounded-lg border px-4 py-3.5", variant.frame),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("mb-1 flex items-center gap-2 text-sm font-semibold", variant.tone),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "h-4 w-4 shrink-0",
				"aria-hidden": "true"
			}), t(variant.label)]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-base leading-6 text-foreground-secondary [&_a]:text-accent [&_a]:underline [&_a]:decoration-accent/40 [&_a]:underline-offset-2 [&_code]:rounded-sm [&_code]:bg-secondary [&_code]:px-1 [&_code]:font-mono [&_code]:text-sm [&_strong]:font-semibold [&_strong]:text-foreground-strong [&>p]:m-0 [&>p+p]:mt-2",
			children
		})]
	});
}
var TAG_ALIASES = {
	info: "info",
	important: "info",
	warning: "warning",
	caution: "warning",
	tip: "tip",
	note: "note"
};
function parseCalloutTag(text) {
	const m = text.match(/^\s*\[!(info|important|warning|caution|tip|note)\]\s*/i);
	if (!m) return null;
	return {
		type: TAG_ALIASES[m[1].toLowerCase()],
		rest: text.slice(m[0].length)
	};
}
function localeForUiLanguage(language) {
	if (language === "de") return "de-DE";
	if (language === "es") return "es-ES";
	if (language === "zh") return "zh-CN";
	return "en-US";
}
function DocsContent({ slug: slug$1, onSelect, onShowOverview, onOpenSearch }) {
	if (!slug$1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocsOverview, {
		onSelect,
		onOpenSearch
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocsContentInner, {
		slug: slug$1,
		onSelect,
		onShowOverview
	});
}
var ARTICLE_PROSE = [
	"docs-prose prose max-w-none",
	"prose-p:text-pretty prose-li:my-1 prose-li:marker:text-foreground-faint",
	"prose-headings:scroll-mt-8 prose-headings:text-pretty prose-headings:font-semibold prose-headings:text-foreground-strong",
	"prose-h2:mb-4 prose-h2:mt-12 prose-h2:text-xl",
	"prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-lg",
	"prose-h4:text-base",
	"prose-a:font-normal prose-a:text-accent prose-a:underline prose-a:decoration-accent/30 prose-a:underline-offset-4 hover:prose-a:decoration-accent",
	"prose-strong:font-semibold prose-strong:text-foreground-strong",
	"prose-code:rounded-sm prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:font-normal prose-code:text-foreground-strong prose-code:before:hidden prose-code:after:hidden",
	"prose-hr:my-10 prose-hr:border-border",
	"prose-img:rounded-lg prose-img:border prose-img:border-border"
].join(" ");
function DocsContentInner({ slug: slug$1, onSelect, onShowOverview }) {
	const t = useT();
	const uiLanguage = useUiLanguage();
	const { data, isLoading, isFetching, error, refetch } = useDocDetail(slug$1);
	const grouped = useDocsGrouped();
	const neighbors = computeNeighbors(grouped.data, slug$1);
	const knownSlugs = (0, import_react.useMemo)(() => {
		const slugs$1 = [];
		for (const kind of DIATAXIS_ORDER) for (const doc of grouped.data?.[kind] ?? []) slugs$1.push(doc.slug);
		return new Set(slugs$1);
	}, [grouped.data]);
	const relatedDocs = (0, import_react.useMemo)(() => {
		const bySlug = new Map(buildDocSections(grouped.data).flatMap((section) => section.docs).map((doc) => [doc.slug, doc]));
		return data?.related.map((relatedSlug) => bySlug.get(relatedSlug)).filter((doc) => doc !== void 0) ?? [];
	}, [data?.related, grouped.data]);
	const reviewedDate = (0, import_react.useMemo)(() => formatReviewDate(data?.last_reviewed, uiLanguage), [data?.last_reviewed, uiLanguage]);
	const minutes = (0, import_react.useMemo)(() => readingMinutes(data?.body ?? ""), [data?.body]);
	const markdownComponents = (0, import_react.useMemo)(() => makeMarkdownComponents({
		knownSlugs,
		onInternalNavigate: onSelect
	}), [knownSlugs, onSelect]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocPageSkeleton, {});
	if (error || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-full items-center justify-center px-8 py-20 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileWarning, {
					className: "mx-auto h-6 w-6 text-destructive",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-lg font-semibold text-foreground-strong",
					children: t("docs.could_not_load")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void refetch(),
						className: "inline-flex h-8 items-center gap-2 rounded-md border border-border-strong px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							className: isFetching ? "h-3.5 w-3.5 animate-spin motion-reduce:animate-none" : "h-3.5 w-3.5",
							"aria-hidden": "true"
						}), t("docs_overview.retry")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onShowOverview,
						className: "inline-flex h-8 items-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
						children: t("docs_sidebar.overview")
					})]
				})
			]
		})
	});
	const markdownPage = `# ${data.title}\n\n${data.body}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto w-full max-w-reading pb-20 pt-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-10 border-b border-border pb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						"aria-label": "Breadcrumb",
						className: "flex items-center gap-1.5 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onShowOverview,
								className: "rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								children: t("docs_content.breadcrumb")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground-faint",
								"aria-hidden": "true",
								children: "/"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-accent",
								"aria-current": "page",
								children: data.section
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 text-pretty font-display text-2xl text-foreground-strong",
						children: data.title
					}),
					data.summary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-pretty text-lg text-muted-foreground",
						children: data.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("docs_content.reading_time").replace("{0}", String(minutes)) }), data.last_reviewed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground-faint",
								"aria-hidden": "true",
								children: "·"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("docs_content.reviewed").replace("{0}", reviewedDate) })] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyPageButton, { markdown: markdownPage }), data.path && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: docSourceUrl(data.path),
								onClick: (event) => {
									event.preventDefault();
									openExternalUrl(docSourceUrl(data.path));
								},
								rel: "noopener noreferrer",
								className: "inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								children: [t("docs_content.view_source"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
									className: "h-3 w-3",
									"aria-hidden": "true"
								})]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: ARTICLE_PROSE,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, {
					remarkPlugins: [remarkGfm],
					rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
					components: markdownComponents,
					children: data.body
				})
			}),
			relatedDocs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelatedGuides, {
				docs: relatedDocs,
				onSelect
			}),
			(neighbors.prev || neighbors.next) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				"aria-label": t("docs_content.pagination"),
				className: "mt-14 grid grid-cols-1 gap-3 border-t border-border pt-8 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavCard, {
					doc: neighbors.prev,
					direction: "prev",
					onSelect
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavCard, {
					doc: neighbors.next,
					direction: "next",
					onSelect
				})]
			})
		]
	});
}
function CopyPageButton({ markdown }) {
	const t = useT();
	const [copied, setCopied] = (0, import_react.useState)(false);
	const timer = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => () => {
		if (timer.current !== null) window.clearTimeout(timer.current);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => {
			robustCopy(markdown).then((ok) => {
				if (!ok) return;
				setCopied(true);
				if (timer.current !== null) window.clearTimeout(timer.current);
				timer.current = window.setTimeout(() => setCopied(false), 1500);
			});
		},
		className: "inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
		children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
			className: "h-3.5 w-3.5 text-success",
			"aria-hidden": "true"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
			className: "h-3.5 w-3.5",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-live": "polite",
			children: copied ? t("docs_content.page_copied") : t("docs_content.copy_page")
		})]
	});
}
function computeNeighbors(grouped, currentSlug) {
	if (!grouped) return {
		prev: null,
		next: null
	};
	const flat = buildDocSections(grouped).flatMap((section) => section.docs);
	const idx = flat.findIndex((d) => d.slug === currentSlug);
	if (idx === -1) return {
		prev: null,
		next: null
	};
	return {
		prev: idx > 0 ? flat[idx - 1] : null,
		next: idx < flat.length - 1 ? flat[idx + 1] : null
	};
}
function NavCard({ doc, direction, onSelect }) {
	const t = useT();
	if (!doc) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden sm:block" });
	const next = direction === "next";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onSelect(doc.slug),
		className: `group flex flex-col gap-1 rounded-lg border border-border px-5 py-4 transition-colors hover:border-border-strong hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${next ? "items-end text-right sm:col-start-2" : "items-start text-left"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1.5 text-sm text-muted-foreground",
			children: [
				!next && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					className: "h-3.5 w-3.5 transition-transform motion-safe:group-hover:-translate-x-0.5",
					"aria-hidden": "true"
				}),
				next ? t("docs_content.next") : t("docs_content.prev"),
				next && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
					className: "h-3.5 w-3.5 transition-transform motion-safe:group-hover:translate-x-0.5",
					"aria-hidden": "true"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-lg font-medium text-foreground-strong",
			children: doc.title
		})]
	});
}
function formatReviewDate(value, locale) {
	if (!value) return "";
	const date = /* @__PURE__ */ new Date(`${value}T00:00:00Z`);
	if (Number.isNaN(date.getTime())) return value;
	return new Intl.DateTimeFormat(localeForUiLanguage(locale), {
		dateStyle: "medium",
		timeZone: "UTC"
	}).format(date);
}
function RelatedGuides({ docs, onSelect }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-14",
		"aria-labelledby": "related-guides-title",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			id: "related-guides-title",
			className: "text-sm font-semibold text-foreground-strong",
			children: t("docs_content.related_guides")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 grid gap-3 sm:grid-cols-2",
			children: docs.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onSelect(doc.slug),
				className: "group rounded-lg border border-border px-4 py-3.5 text-left transition-colors hover:border-border-strong hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center justify-between gap-3 text-base font-medium text-foreground",
					children: [doc.title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "h-3.5 w-3.5 shrink-0 text-foreground-faint transition-colors group-hover:text-foreground",
						"aria-hidden": "true"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 line-clamp-2 text-sm text-muted-foreground",
					children: doc.summary
				})]
			}, doc.slug))
		})]
	});
}
function DocPageSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-reading pb-20 pt-12",
		role: "status",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: useT()("docs_overview.loading_page")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "animate-pulse motion-reduce:animate-none",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-40 rounded-full bg-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-5 h-7 w-3/5 rounded-md bg-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-3.5 w-4/5 rounded-full bg-muted/70" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 h-px bg-border" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 space-y-3.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-full rounded-full bg-muted/70" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-11/12 rounded-full bg-muted/70" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-4/5 rounded-full bg-muted/70" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-12 h-4 w-2/5 rounded-full bg-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 space-y-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-full rounded-full bg-muted/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-5/6 rounded-full bg-muted/70" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-6 h-28 rounded-lg border border-border bg-card" })
			]
		})]
	});
}
function resolveLink(href, knownSlugs) {
	if (!href) return { kind: "default" };
	if (href.startsWith("#")) return { kind: "anchor" };
	if (href.startsWith("http://") || href.startsWith("https://")) return { kind: "external" };
	if (knownSlugs.has(href)) return {
		kind: "internal",
		slug: href
	};
	const cleaned = href.replace(/^\.?\//, "").replace(/\.md$/, "");
	if (knownSlugs.has(cleaned)) return {
		kind: "internal",
		slug: cleaned
	};
	const parts = cleaned.split("/");
	const lastSegment = parts[parts.length - 1];
	if (knownSlugs.has(lastSegment)) return {
		kind: "internal",
		slug: lastSegment
	};
	if (parts.length >= 2 && parts[parts.length - 2] === "adr") {
		const adrSlug = `adr-${lastSegment}`;
		if (knownSlugs.has(adrSlug)) return {
			kind: "internal",
			slug: adrSlug
		};
	}
	return { kind: "default" };
}
function makeMarkdownComponents(ctx) {
	return {
		pre({ children }) {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
		},
		code({ className, children, ...rest }) {
			const match = /language-(\w+)/.exec(className || "");
			if (!match) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
				className,
				...rest,
				children
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
				language: match[1],
				code: String(children).replace(/\n$/, "")
			});
		},
		blockquote({ children }) {
			const tagged = parseTaggedBlockquote(children);
			if (tagged) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
				type: tagged.type,
				children: tagged.children
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
				className: "border-l-2 border-border-strong pl-4 not-italic text-foreground-secondary [&_p:before]:content-none [&_p:after]:content-none",
				children
			});
		},
		a({ href, children, ...rest }) {
			const resolved = href ? resolveLink(href, ctx.knownSlugs) : { kind: "default" };
			if (resolved.kind === "internal" && ctx.onInternalNavigate) {
				const slug$1 = resolved.slug;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `#${slug$1}`,
					onClick: (e) => {
						e.preventDefault();
						ctx.onInternalNavigate?.(slug$1);
					},
					...rest,
					children
				});
			}
			if (resolved.kind === "external") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href,
				onClick: (event) => {
					event.preventDefault();
					openExternalUrl(href ?? "");
				},
				rel: "noopener noreferrer",
				...rest,
				children
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href,
				...rest,
				children
			});
		},
		table({ children }) {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "not-prose my-6 overflow-x-auto rounded-lg border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
					className: "w-full border-collapse text-left text-base",
					children
				})
			});
		},
		thead({ children }) {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "bg-secondary/50",
				children
			});
		},
		th({ children, style }) {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
				style,
				className: "border-b border-border px-4 py-2.5 text-sm font-semibold text-foreground-strong",
				children
			});
		},
		td({ children, style }) {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				style,
				className: "border-t border-border px-4 py-2.5 align-top text-foreground-secondary first:font-medium first:text-foreground [&_code]:rounded-sm [&_code]:bg-secondary [&_code]:px-1 [&_code]:font-mono [&_code]:text-sm",
				children
			});
		}
	};
}
function parseTaggedBlockquote(children) {
	const arr = Array.isArray(children) ? children : [children];
	for (const node of arr) {
		if (typeof node === "string") {
			if (!node.trim()) continue;
			const tag = parseCalloutTag(node);
			if (tag) return {
				type: tag.type,
				children: tag.rest
			};
			return null;
		}
		if (typeof node === "object" && node !== null && "type" in node && node.type === "p") {
			const pChildren = node.props.children;
			const firstText = typeof pChildren === "string" ? pChildren : Array.isArray(pChildren) && typeof pChildren[0] === "string" ? pChildren[0] : null;
			if (firstText) {
				const tag = parseCalloutTag(firstText);
				if (tag) {
					if (typeof pChildren === "string") return {
						type: tag.type,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: tag.rest })
					};
					const tail = pChildren.slice(1);
					const newChildren = [tag.rest, ...tail];
					return {
						type: tag.type,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: newChildren }), arr.slice(arr.indexOf(node) + 1)] })
					};
				}
			}
			return null;
		}
	}
	return null;
}
function DocsToc({ headings, contentRef }) {
	const t = useT();
	const [activeSlug, setActiveSlug] = (0, import_react.useState)(null);
	const tocHeadings = (0, import_react.useMemo)(() => headings.filter((heading) => heading.level >= 2 && heading.level <= 3), [headings]);
	(0, import_react.useEffect)(() => {
		if (!tocHeadings.length || !contentRef.current) return;
		const container = contentRef.current;
		const observed = [];
		for (const h of tocHeadings) {
			const el = container.querySelector(`#${cssEscape(h.slug)}`);
			if (el) observed.push(el);
		}
		if (!observed.length) return;
		setActiveSlug(observed[0].id);
		const observer = new IntersectionObserver((entries) => {
			const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.target.offsetTop - b.target.offsetTop);
			if (visible.length > 0) setActiveSlug(visible[0].target.id);
		}, {
			root: container,
			rootMargin: "0px 0px -80% 0px",
			threshold: 0
		});
		for (const el of observed) observer.observe(el);
		const onScroll = () => {
			if (container.scrollTop + container.clientHeight >= container.scrollHeight - 4) setActiveSlug(observed[observed.length - 1].id);
		};
		container.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			observer.disconnect();
			container.removeEventListener("scroll", onScroll);
		};
	}, [tocHeadings, contentRef]);
	if (!tocHeadings.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "sticky top-0 hidden max-h-screen w-56 shrink-0 self-start overflow-y-auto pb-10 pt-12 xl:block",
		"aria-label": t("docs_content.on_this_page"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-3 flex items-center gap-2 text-sm font-semibold text-foreground-strong",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlignLeft, {
				className: "h-3.5 w-3.5 text-muted-foreground",
				"aria-hidden": "true"
			}), t("docs_content.on_this_page")]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "border-l border-border text-sm",
			children: tocHeadings.map((h) => {
				const active = activeSlug === h.slug;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `#${h.slug}`,
					onClick: (e) => handleClick(e, h.slug),
					"aria-current": active ? "location" : void 0,
					className: cn("-ml-px block border-l py-1 pr-2 transition-colors", h.level === 3 ? "pl-7" : "pl-4", active ? "border-accent font-medium text-accent" : "border-transparent text-muted-foreground hover:border-border-strong hover:text-foreground"),
					children: h.text
				}) }, h.slug);
			})
		})]
	});
}
function handleClick(e, slug$1) {
	e.preventDefault();
	const el = document.getElementById(slug$1);
	if (el) {
		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		el.scrollIntoView({
			behavior: reduceMotion ? "auto" : "smooth",
			block: "start"
		});
		window.history.replaceState(null, "", `#${slug$1}`);
	}
}
function cssEscape(value) {
	if (typeof CSS !== "undefined" && CSS.escape) return CSS.escape(value);
	return value.replace(/[^a-zA-Z0-9_-]/g, "\\$&");
}
function DocsSearchModal({ open, onOpenChange, onSelect }) {
	const t = useT();
	const [query, setQuery] = (0, import_react.useState)("");
	const debouncedQuery = useDebounced(query, 150);
	const { data: results = [], isFetching, error, refetch } = useDocSearch(debouncedQuery, void 0, open);
	const grouped = useDocsGrouped();
	const { recent } = useRecentDocs();
	const suggestions = (0, import_react.useMemo)(() => {
		const sections = buildDocSections(grouped.data);
		const known = /* @__PURE__ */ new Map();
		for (const section of sections) for (const doc of section.docs) known.set(doc.slug, {
			title: doc.title,
			section: section.name
		});
		const recentRows = [];
		for (const doc of recent) {
			const entry = known.get(doc.slug);
			if (entry) recentRows.push({
				slug: doc.slug,
				...entry
			});
		}
		const start = sections[0];
		const startRows = (start?.docs ?? []).filter((doc) => !recentRows.some((row) => row.slug === doc.slug)).map((doc) => ({
			slug: doc.slug,
			title: doc.title,
			section: start.name
		}));
		return {
			recentRows,
			startName: start?.name ?? "",
			startRows
		};
	}, [grouped.data, recent]);
	(0, import_react.useEffect)(() => {
		if (!open) setQuery("");
	}, [open]);
	const choose = (slug$1) => {
		onSelect(slug$1);
		onOpenChange(false);
	};
	const hasSuggestions = suggestions.recentRows.length + suggestions.startRows.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 z-40 bg-scrim/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
			className: "fixed left-1/2 top-[12%] z-50 w-[min(680px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-lg bg-popover shadow-float data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 motion-reduce:animate-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					className: "sr-only",
					children: t("docs.search_modal_title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
					className: "sr-only",
					children: t("docs.search_hint")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e, {
					shouldFilter: false,
					loop: true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-14 items-center gap-3 border-b border-border px-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									className: "h-4 w-4 shrink-0 text-muted-foreground",
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
									value: query,
									onValueChange: setQuery,
									placeholder: t("docs.search_modal_placeholder"),
									"aria-label": t("docs.search_modal_title"),
									name: "docs-search",
									autoComplete: "off",
									autoFocus: true,
									className: "h-full flex-1 bg-transparent text-lg text-foreground outline-none placeholder:text-foreground-faint"
								}),
								isFetching && debouncedQuery.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									className: "h-4 w-4 shrink-0 animate-spin text-muted-foreground motion-reduce:animate-none",
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
									className: "shrink-0 rounded-sm border border-border px-1.5 py-0.5 font-sans text-xs font-medium text-muted-foreground",
									children: "Esc"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.List, {
							className: "max-h-96 overflow-y-auto p-2",
							children: !debouncedQuery.trim() ? !hasSuggestions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-3 py-10 text-center text-base text-muted-foreground",
								children: t("docs.search_hint")
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [suggestions.recentRows.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
								heading: t("docs.recent"),
								className: GROUP_CLASS,
								children: suggestions.recentRows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuggestionItem, {
									value: `recent-${row.slug}`,
									icon: Clock,
									row,
									onSelect: () => choose(row.slug)
								}, `recent-${row.slug}`))
							}), suggestions.startRows.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
								heading: suggestions.startName,
								className: GROUP_CLASS,
								children: suggestions.startRows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuggestionItem, {
									value: `start-${row.slug}`,
									icon: FileText,
									row,
									onSelect: () => choose(row.slug)
								}, `start-${row.slug}`))
							})] }) : isFetching && results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-3 py-10 text-center text-base text-muted-foreground",
								children: t("docs.search_loading")
							}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center px-3 py-10 text-center text-base text-muted-foreground",
								role: "alert",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileWarning, {
										className: "mb-2 h-4 w-4 text-destructive",
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("docs.search_failed") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => void refetch(),
										className: "mt-3 inline-flex h-8 items-center gap-1.5 rounded-md border border-border-strong px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
											className: "h-3 w-3",
											"aria-hidden": "true"
										}), t("docs.search_retry")]
									})
								]
							}) : results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
								className: "px-3 py-10 text-center text-base text-muted-foreground",
								children: t("docs.no_results").replace("{0}", debouncedQuery)
							}) : results.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
								value: r.slug,
								onSelect: () => choose(r.slug),
								className: cn("group flex cursor-pointer gap-3 rounded-md px-3 py-2.5", "data-[selected=true]:bg-secondary"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
									className: "mt-0.5 h-4 w-4 shrink-0 text-foreground-faint group-data-[selected=true]:text-accent",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate text-base font-medium text-foreground-strong",
											children: r.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "shrink-0 text-xs text-muted-foreground",
											children: r.section
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-0.5 line-clamp-2 text-sm text-muted-foreground [&>mark]:rounded-sm [&>mark]:bg-accent-soft [&>mark]:px-0.5 [&>mark]:text-foreground-strong",
										children: renderSearchSnippet(r.snippet)
									})]
								})]
							}, r.slug))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 border-t border-border px-4 py-2 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
										className: KBD_CLASS,
										children: "↑"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
										className: KBD_CLASS,
										children: "↓"
									}),
									t("docs_search_modal.navigate")
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
									className: KBD_CLASS,
									children: "↵"
								}), t("docs_search_modal.open")]
							})]
						})
					]
				})
			]
		})] })
	});
}
var GROUP_CLASS = "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground";
var KBD_CLASS = "inline-flex h-5 min-w-5 items-center justify-center rounded-sm border border-border px-1 font-sans text-xs font-medium";
function SuggestionItem({ value, icon: Icon, row, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
		value,
		onSelect,
		className: "group flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 data-[selected=true]:bg-secondary",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "h-4 w-4 shrink-0 text-foreground-faint group-data-[selected=true]:text-accent",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 flex-1 truncate text-base text-foreground",
				children: row.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 text-xs text-muted-foreground",
				children: row.section
			})
		]
	});
}
function cleanSnippetMarkdown(value) {
	return value.replace(/\]\([^)]*\)/g, "]").replace(/[[\]]/g, "").replace(/(\*\*|__|`)/g, "").replace(/(^|\s)#{1,6}\s/g, "$1").replace(/\s*\|\s*/g, " · ").replace(/\s{2,}/g, " ").trim();
}
function renderSearchSnippet(value) {
	const parts = cleanSnippetMarkdown(value).split(/(<mark>|<\/mark>)/gi);
	let marked = false;
	return parts.map((part, index) => {
		if (part.toLowerCase() === "<mark>") {
			marked = true;
			return null;
		}
		if (part.toLowerCase() === "</mark>") {
			marked = false;
			return null;
		}
		return marked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mark", { children: part }, index) : part;
	});
}
function useDebounced(value, delayMs) {
	const [debounced, setDebounced] = (0, import_react.useState)(value);
	(0, import_react.useEffect)(() => {
		const t = window.setTimeout(() => setDebounced(value), delayMs);
		return () => window.clearTimeout(t);
	}, [value, delayMs]);
	return debounced;
}
function DocsView() {
	const t = useT();
	const [selectedSlug, setSelectedSlug] = (0, import_react.useState)(() => {
		return new URLSearchParams(window.location.search).get("doc");
	});
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const contentRef = (0, import_react.useRef)(null);
	const { push: pushRecent } = useRecentDocs();
	const detail = useDocDetail(selectedSlug);
	const headings = detail.data?.headings ?? [];
	(0, import_react.useEffect)(() => {
		if (detail.data) pushRecent({
			slug: detail.data.slug,
			title: detail.data.title,
			diataxis: detail.data.diataxis
		});
	}, [detail.data, pushRecent]);
	(0, import_react.useEffect)(() => {
		if (!detail.data || !window.location.hash) return;
		const headingId = decodeURIComponent(window.location.hash.slice(1));
		window.requestAnimationFrame(() => {
			document.getElementById(headingId)?.scrollIntoView({ block: "start" });
		});
	}, [detail.data]);
	const selectDoc = (0, import_react.useCallback)((slug$1) => {
		setSelectedSlug(slug$1);
		const url = new URL(window.location.href);
		url.searchParams.set("doc", slug$1);
		url.hash = "";
		window.history.replaceState(null, "", url);
		contentRef.current?.scrollTo({ top: 0 });
	}, []);
	const showOverview = (0, import_react.useCallback)(() => {
		setSelectedSlug(null);
		const url = new URL(window.location.href);
		url.searchParams.delete("doc");
		url.hash = "";
		window.history.replaceState(null, "", url);
		contentRef.current?.scrollTo({ top: 0 });
	}, []);
	(0, import_react.useEffect)(() => {
		const handler = (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setSearchOpen(true);
			}
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "jarvis-nav-surface flex h-full min-h-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#docs-content",
				className: "sr-only z-50 rounded-md bg-background px-3 py-2 text-sm text-foreground focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus-visible:ring-2 focus-visible:ring-ring",
				children: t("docs_content.skip_to_content")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocsSidebar, {
				selectedSlug,
				onSelect: selectDoc,
				onShowOverview: showOverview,
				onOpenSearch: () => setSearchOpen(true)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "jarvis-sheet flex min-w-0 flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					id: "docs-content",
					ref: contentRef,
					tabIndex: -1,
					className: "min-w-0 flex-1 overflow-y-auto focus-visible:outline-none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex w-full max-w-6xl gap-12 px-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-w-0 flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocsContent, {
								slug: selectedSlug,
								onSelect: selectDoc,
								onShowOverview: showOverview,
								onOpenSearch: () => setSearchOpen(true)
							})
						}), selectedSlug && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocsToc, {
							headings,
							contentRef
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocsSearchModal, {
				open: searchOpen,
				onOpenChange: setSearchOpen,
				onSelect: selectDoc
			})
		]
	});
}
export { DocsView };
