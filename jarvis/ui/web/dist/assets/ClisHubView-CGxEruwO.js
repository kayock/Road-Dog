import { t as CliLogo } from "./CliLogo-BNSkt8v8.js";
import { t as Check } from "./check-vbwKkbPq.js";
import { t as ChevronRight } from "./chevron-right-BjVJ-R2c.js";
import { t as Clock } from "./clock-DMTiT8Bw.js";
import { t as FlaskConical } from "./flask-conical-BH493MkU.js";
import { t as LogIn } from "./log-in-BJs4e2l4.js";
import { t as LogOut } from "./log-out-CV5z6kDy.js";
import { t as Play } from "./play-B4Hl_QRo.js";
import { t as ShieldCheck } from "./shield-check-CO1F4Nzq.js";
import { t as Shield } from "./shield-_k--vlBY.js";
import { t as Terminal } from "./terminal-CG2JP6MB.js";
import { $s as translate, Bc as require_jsx_runtime, Dc as useMutation, F as robustCopy, Gs as fill, Ln as cn, Oc as useQuery, Vi as ExternalLink, Wi as Copy, Xc as require_react, Y as ScrollArea, Zi as ArrowRight, bi as Plus, fi as SquareTerminal, gi as Search, hi as ShieldAlert, ji as LoaderCircle, ln as Button, mi as Sparkles, na as createLucideIcon, oc as useT, qi as ChevronDown, si as X, tl as __toESM, ui as Trash2, wc as useEventStore, yi as RefreshCw, zc as useQueryClient } from "./index-BOzhgzD7.js";
import "./combobox-BL3mwl7r.js";
import { t as BrandedSelect } from "./select-vogX_D37.js";
import { _ as Table, a as DetailHeader, c as IconButton, d as Panel, f as PanelHeader, g as StatusDot, l as InlineSearch, m as SoftButton, n as BackLink, o as EmptyRow, p as SegmentedFilter, r as Cell, s as FactRows, t as ActionMenu, v as TableHead, y as TableRow } from "./primitives-C1uNwbNH.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Ban = createLucideIcon("Ban", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m4.9 4.9 14.2 14.2",
	key: "1m5liu"
}]]);
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ListFilter = createLucideIcon("ListFilter", [
	["path", {
		d: "M3 6h18",
		key: "d0wm0j"
	}],
	["path", {
		d: "M7 12h10",
		key: "b7w52i"
	}],
	["path", {
		d: "M10 18h4",
		key: "1ulq68"
	}]
]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
async function getJson(url) {
	const res = await fetch(url);
	if (!res.ok) {
		const text = await res.text().catch(() => "");
		throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
	}
	return res.json();
}
async function postJson(url, body, method = "POST") {
	const res = await fetch(url, {
		method,
		headers: body ? { "Content-Type": "application/json" } : void 0,
		body: body ? JSON.stringify(body) : void 0
	});
	if (!res.ok) {
		const text = await res.text().catch(() => "");
		throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
	}
	return res.json();
}
function useClisList() {
	return useQuery({
		queryKey: ["clis"],
		queryFn: () => getJson("/api/clis"),
		refetchInterval: 5e3
	});
}
function useCliDetail(name) {
	return useQuery({
		queryKey: ["cli", name],
		queryFn: () => getJson(`/api/clis/${name}`),
		enabled: Boolean(name),
		staleTime: 3e4
	});
}
function useCliUsage(name, opts = {}) {
	const { page = 1, pageSize = 50, successOnly = false, search } = opts;
	const params = new URLSearchParams();
	params.set("page", String(page));
	params.set("page_size", String(pageSize));
	if (successOnly) params.set("success_only", "true");
	if (search) params.set("search", search);
	const queryString = params.toString();
	return useQuery({
		queryKey: [
			"cli-usage",
			name,
			page,
			pageSize,
			successOnly,
			search
		],
		queryFn: () => getJson(`/api/clis/${name}/usage?${queryString}`),
		enabled: Boolean(name),
		staleTime: 1e4
	});
}
function useCliStats(name) {
	return useQuery({
		queryKey: ["cli-usage-stats", name],
		queryFn: () => getJson(`/api/clis/${name}/usage/stats`),
		enabled: Boolean(name),
		staleTime: 3e4
	});
}
function useCheckCli() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (name) => postJson(`/api/clis/${name}/check`),
		onSuccess: (_res, name) => {
			qc.invalidateQueries({ queryKey: ["clis"] });
			qc.invalidateQueries({ queryKey: ["cli", name] });
		}
	});
}
function useSpawnExternalTerminal() {
	return useMutation({ mutationFn: async ({ name, kind, method }) => {
		const r = await fetch(`/api/clis/${name}/spawn-external`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				kind,
				method: method ?? null
			})
		});
		if (!r.ok) throw new Error(`HTTP ${r.status}: ${await r.text()}`);
		return await r.json();
	} });
}
function useConnectCli() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ name, mode, secrets }) => postJson(`/api/clis/${name}/connect`, {
			mode,
			secrets: secrets ?? null,
			validate_creds: true
		}),
		onSuccess: (_res, vars) => {
			qc.invalidateQueries({ queryKey: ["clis"] });
			qc.invalidateQueries({ queryKey: ["cli", vars.name] });
		}
	});
}
function useDisconnectCli() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (name) => postJson(`/api/clis/${name}/disconnect`),
		onSuccess: (_res, name) => {
			qc.invalidateQueries({ queryKey: ["clis"] });
			qc.invalidateQueries({ queryKey: ["cli", name] });
		}
	});
}
function useRegisterCustomCli() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (payload) => postJson("/api/clis/custom", payload),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["clis"] });
		}
	});
}
function useDeleteCustomCli() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (name) => postJson(`/api/clis/custom/${name}`, void 0, "DELETE"),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["clis"] });
		}
	});
}
function useClearUsage() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (name) => postJson(`/api/clis/${name}/usage`, void 0, "DELETE"),
		onSuccess: (_res, name) => {
			qc.invalidateQueries({ queryKey: ["cli-usage", name] });
			qc.invalidateQueries({ queryKey: ["cli-usage-stats", name] });
		}
	});
}
function useCliTestRun() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (req) => postJson("/api/clis/test-run", {
			instruction: req.instruction,
			...req.cli_hint ? { cli_hint: req.cli_hint } : {}
		}),
		onSuccess: (res) => {
			qc.invalidateQueries({ queryKey: ["clis"] });
			if (res.tool_called) {
				const cliName = res.tool_called.replace(/^cli_/, "");
				qc.invalidateQueries({ queryKey: ["cli-usage", cliName] });
				qc.invalidateQueries({ queryKey: ["cli-usage-stats", cliName] });
			}
		}
	});
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var STATUS_TONES = {
	connected: {
		labelKey: "clis_view.status_connected",
		tone: "ok"
	},
	disconnected: {
		labelKey: "clis_view.status_disconnected",
		tone: "off"
	},
	not_installed: {
		labelKey: "clis_view.status_not_installed",
		tone: "off"
	},
	error: {
		labelKey: "clis_view.status_error",
		tone: "error"
	},
	checking: {
		labelKey: "clis_view.status_checking",
		tone: "busy"
	}
};
function statusLabel(status) {
	return translate(STATUS_TONES[status].labelKey);
}
function ago(value) {
	return [
		translate("clis_view.ago_prefix"),
		value,
		translate("clis_view.ago_suffix")
	].filter(Boolean).join(" ");
}
function formatRelativeTime(ts) {
	if (!ts) return "—";
	const diff = Math.max(0, Date.now() - ts);
	const mins = Math.floor(diff / 6e4);
	if (mins < 1) return translate("clis_view.just_now");
	if (mins < 60) return ago(`${mins}m`);
	const hrs = Math.floor(mins / 60);
	if (hrs < 24) return ago(`${hrs}h`);
	return ago(`${Math.floor(hrs / 24)}d`);
}
function formatDateTime(ts) {
	return new Date(ts).toLocaleString(void 0, {
		day: "2-digit",
		month: "2-digit",
		year: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	});
}
function ClisView() {
	const t = useT();
	const assistantName = useEventStore((s) => s.assistantName);
	const { data, isLoading, error, refetch, isFetching } = useClisList();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [categoryFilter, setCategoryFilter] = (0, import_react.useState)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [selectedName, setSelectedName] = (0, import_react.useState)(null);
	const [showWizard, setShowWizard] = (0, import_react.useState)(false);
	const [usageFor, setUsageFor] = (0, import_react.useState)(null);
	const customCount = data?.clis.filter((c) => c.is_custom).length ?? 0;
	const filtered = (0, import_react.useMemo)(() => {
		if (!data) return [];
		let list = data.clis;
		if (filter === "connected") list = list.filter((c) => c.status === "connected");
		if (filter === "installed") list = list.filter((c) => c.installed);
		if (filter === "custom") list = list.filter((c) => c.is_custom);
		if (categoryFilter) list = list.filter((c) => c.category === categoryFilter);
		const needle = query.trim().toLowerCase();
		if (needle) list = list.filter((c) => [
			c.display_name,
			c.name,
			c.description,
			c.category
		].join(" ").toLowerCase().includes(needle));
		return list;
	}, [
		data,
		filter,
		categoryFilter,
		query
	]);
	const columns = [
		{
			id: "name",
			label: t("clis_view.col_name")
		},
		{
			id: "version",
			label: "Version",
			width: "96px"
		},
		{
			id: "status",
			label: t("clis_view.col_status"),
			width: "150px"
		},
		{
			id: "activity",
			label: t("clis_view.col_activity"),
			width: "136px"
		}
	];
	const closeSearch = () => {
		setSearchOpen(false);
		setQuery("");
	};
	const dialogs = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [showWizard && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomCliWizard, { onClose: () => setShowWizard(false) }), usageFor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageDrawer, {
		name: usageFor,
		onClose: () => setUsageFor(null)
	})] });
	if (selectedName) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CliDetailPage, {
			name: selectedName,
			onBack: () => setSelectedName(null),
			onShowUsage: () => setUsageFor(selectedName)
		}), dialogs]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
			className: "flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full max-w-5xl px-8 py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
						title: "CLIs",
						subtitle: data ? `${data.connected} ${t("clis_view.subtitle_connected")} · ${data.installed} ${t("clis_view.subtitle_installed")} · ${data.total} ${t("clis_view.subtitle_in_catalog")}` : t("common.loading"),
						actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
								label: t("clis_view.search_placeholder"),
								active: searchOpen,
								onClick: () => searchOpen ? closeSearch() : setSearchOpen(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
								label: t("clis_view.reload"),
								onClick: () => void refetch(),
								busy: isFetching && !data,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SoftButton, {
								onClick: () => setShowWizard(true),
								className: "ml-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), t("clis_view.add_custom")]
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
								placeholder: t("clis_view.search_placeholder"),
								autoFocus: true
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
							label: t("common.close"),
							onClick: closeSearch,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedFilter, {
							label: t("clis_view.filter_label"),
							value: filter,
							onChange: setFilter,
							options: [
								{
									id: "all",
									label: t("clis_view.filter_all"),
									count: data?.total ?? 0
								},
								{
									id: "connected",
									label: t("clis_view.filter_connected"),
									count: data?.connected ?? 0
								},
								{
									id: "installed",
									label: t("clis_view.filter_installed"),
									count: data?.installed ?? 0
								},
								{
									id: "custom",
									label: t("clis_view.filter_custom"),
									count: customCount
								}
							]
						}), data && data.categories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryMenu, {
							categories: data.categories,
							value: categoryFilter,
							onChange: setCategoryFilter
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 max-w-2xl text-xs leading-relaxed text-muted-foreground",
						children: [
							assistantName,
							" ",
							t("clis_view.intro_can_call"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground",
								children: t("clis_view.intro_connected_word")
							}),
							" ",
							t("clis_view.intro_appear")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [
							isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "py-8 text-center text-sm text-muted-foreground",
								children: t("common.loading")
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive",
								children: [
									t("common.error"),
									": ",
									error.message
								]
							}),
							!isLoading && !error && !data?.total && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyCatalog, {}),
							!isLoading && !error && Boolean(data?.total) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
								label: "CLIs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { columns }),
									filtered.map((cli) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CliRow, {
										cli,
										columns,
										onSelect: () => setSelectedName(cli.name),
										onShowUsage: () => setUsageFor(cli.name)
									}, cli.name)),
									filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyRow, { children: query.trim() ? t("clis_view.search_no_hits") : t(`clis_view.empty_${filter}`) })
								]
							})
						]
					})
				]
			})
		}), dialogs]
	});
}
function CategoryMenu({ categories, value, onChange }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionMenu, {
		label: t("clis_view.category_label"),
		actions: [{
			id: "__all",
			label: t("clis_view.category_all"),
			icon: value === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }) : void 0,
			onSelect: () => onChange(null)
		}, ...categories.map((cat, index) => ({
			id: cat,
			label: cat,
			icon: value === cat ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }) : void 0,
			separatorAbove: index === 0,
			onSelect: () => onChange(value === cat ? null : cat)
		}))],
		trigger: ({ open, toggle }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SoftButton, {
			onClick: toggle,
			ariaExpanded: open,
			ariaHasPopup: "menu",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListFilter, { className: "h-3.5 w-3.5" }), value ?? t("clis_view.category_all_categories")]
		})
	});
}
function CliRow({ cli, columns, onSelect, onShowUsage }) {
	const t = useT();
	const status = STATUS_TONES[cli.status];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
		columns,
		onClick: onSelect,
		ariaLabel: cli.display_name,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CliLogo, {
					cliName: cli.name,
					category: cli.category
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-reading font-medium",
								children: cli.display_name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 font-mono text-xs text-muted-foreground",
								children: cli.name
							}),
							cli.is_custom && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "shrink-0 text-xs text-muted-foreground",
								children: ["· ", t("clis_view.custom_word")]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate text-xs text-muted-foreground",
						children: cli.description
					})]
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
				muted: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs tabular-nums",
					children: cli.version ?? "—"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				title: cli.error ?? void 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, {
					tone: status.tone,
					label: statusLabel(cli.status),
					pulse: cli.status === "checking"
				})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
				stop: true,
				children: cli.usage_count_7d > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onShowUsage,
					title: t("clis_view.open_usage_history"),
					className: "text-left text-xs text-muted-foreground transition-colors hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: fill(t("clis_view.usage_7d"), { count: cli.usage_count_7d })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-micro text-muted-foreground",
						children: formatRelativeTime(cli.last_used_at)
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: t("clis_view.never_used")
				})
			})
		]
	});
}
function EmptyCatalog() {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center gap-5 py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "h-7 w-7 text-muted-foreground" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-display text-xl font-semibold tracking-tight",
			children: t("clis_view.empty_no_clis")
		})]
	});
}
function CliDetailPage({ name, onBack, onShowUsage }) {
	const t = useT();
	const { data, isLoading, error } = useCliDetail(name);
	const check = useCheckCli();
	const disconnect = useDisconnectCli();
	const deleteCustom = useDeleteCustomCli();
	const pushToast = useEventStore((s) => s.pushToast);
	const [apiKeyDialog, setApiKeyDialog] = (0, import_react.useState)(false);
	const [installDialog, setInstallDialog] = (0, import_react.useState)(false);
	const status = data ? STATUS_TONES[data.status] : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollArea, {
		className: "flex-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full max-w-5xl space-y-6 px-8 py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {
						label: t("clis_view.back_to_list"),
						onClick: onBack
					}),
					isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-8 text-sm text-muted-foreground",
						children: t("clis_view.loading_details")
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive",
						children: error.message
					}),
					data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailHeader, {
							leading: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CliLogo, {
								cliName: data.name,
								category: data.category,
								size: "lg"
							}),
							title: data.display_name,
							titleAccessory: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-md bg-secondary px-2 py-0.5 font-mono text-meta text-muted-foreground",
								children: data.name
							}),
							byline: data.description,
							actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
								label: t("clis_view.recheck_status"),
								busy: check.isPending,
								onClick: () => check.mutate(name, { onError: (err) => pushToast("error", `${t("clis_view.status_check_failed")}: ${err.message}`) }),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, {
								tone: status.tone,
								label: statusLabel(data.status),
								pulse: data.status === "checking"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ml-auto flex flex-wrap items-center gap-2",
								children: [
									!data.installed && data.install_methods.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoftButton, {
										primary: true,
										onClick: () => setInstallDialog(true),
										children: t("clis_view.install")
									}),
									data.installed && !data.connected && data.auth_mode === "oauth_cli" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectOAuthButton, {
										name,
										displayName: data.display_name,
										loginCommand: data.login_command ?? "",
										statusCommand: data.status_command ?? null
									}),
									data.installed && !data.connected && data.auth_mode === "api_key" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SoftButton, {
										primary: true,
										onClick: () => setApiKeyDialog(true),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-3.5 w-3.5" }), t("clis_view.set_api_key")]
									}),
									data.connected && data.auth_mode !== "none" && data.auth_mode !== "config_file" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SoftButton, {
										disabled: disconnect.isPending,
										onClick: () => disconnect.mutate(name, {
											onSuccess: (res) => {
												if (res.ok) pushToast("success", `${name} ${t("clis_view.disconnected_suffix")}`);
												else pushToast("error", res.error || t("clis_view.disconnect_failed"));
											},
											onError: (err) => pushToast("error", `${t("clis_view.disconnect_failed")}: ${err.message}`)
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), t("clis_view.disconnect")]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SoftButton, {
										onClick: onShowUsage,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }), t("clis_view.history")]
									}),
									data.homepage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SoftButton, {
										onClick: () => window.open(data.homepage, "_blank", "noopener,noreferrer"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" }), t("clis_view.documentation")]
									}),
									data.is_custom && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
										label: t("clis_view.remove_custom_cli"),
										disabled: deleteCustom.isPending,
										className: "text-destructive hover:text-destructive",
										onClick: () => {
											if (window.confirm(`${t("clis_view.confirm_remove_custom_prefix")} "${name}" ${t("clis_view.confirm_remove_custom_suffix")}`)) deleteCustom.mutate(name, {
												onSuccess: () => {
													pushToast("success", `${name} ${t("clis_view.removed_suffix")}`);
													onBack();
												},
												onError: (err) => pushToast("error", `${t("common.error")}: ${err.message}`)
											});
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})
								]
							})]
						}),
						data.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive",
							children: data.error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 lg:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailPanel, {
									title: t("clis_view.section_binary"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FactRows, { rows: [
										{
											label: "Binary",
											value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mono, { children: data.binary_name })
										},
										{
											label: t("clis_view.kv_path"),
											value: data.binary_path ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mono, { children: data.binary_path }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: t("clis_view.not_found")
											})
										},
										{
											label: "Version",
											value: data.version ?? "—"
										},
										{
											label: t("clis_view.auth_mode_short"),
											value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mono, { children: data.auth_mode })
										},
										{
											label: t("clis_view.field_category"),
											value: data.category
										}
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailPanel, {
									title: t("clis_view.section_commands"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FactRows, { rows: [
										{
											label: "Check",
											value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mono, { children: data.check_command })
										},
										{
											label: "Login",
											value: data.login_command ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mono, { children: data.login_command }) : ""
										},
										{
											label: t("clis_view.auth_status_label"),
											value: data.status_command ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mono, { children: data.status_command }) : ""
										},
										{
											label: "Logout",
											value: data.logout_command ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mono, { children: data.logout_command }) : ""
										}
									] })
								}),
								data.secret_keys.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailPanel, {
									title: t("clis_view.section_secrets"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FactRows, { rows: data.secret_keys.map((sk) => ({
										label: sk.env_var,
										value: data.secrets_set[sk.name] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground",
											children: ["●●●●● ", t("clis_view.secret_set")]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: t("clis_view.secret_unset")
										})
									})) })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DetailPanel, {
									title: t("clis_view.risk_tier_label"),
									className: "lg:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FactRows, { rows: [{
										label: t("clis_view.default_tier"),
										value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mono, { children: data.risk_tier })
									}] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [data.deny_patterns.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatternList, {
											title: t("clis_view.blocked_patterns"),
											patterns: data.deny_patterns,
											tone: "deny"
										}), data.allow_patterns.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatternList, {
											title: t("clis_view.allowed_patterns"),
											patterns: data.allow_patterns,
											tone: "allow"
										})]
									})]
								}),
								data.tool_schema_examples.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailPanel, {
									title: t("clis_view.section_tool_examples"),
									className: "lg:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "space-y-1",
										children: data.tool_schema_examples.map((example) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mono, { children: example }) }, example))
									})
								})
							]
						})
					] })
				]
			}),
			apiKeyDialog && data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApiKeyDialog, {
				detail: data,
				onClose: () => setApiKeyDialog(false)
			}),
			installDialog && data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallDialog, {
				detail: data,
				onClose: () => setInstallDialog(false)
			})
		]
	});
}
function DetailPanel({ title, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: cn("p-5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
			className: "mb-3 text-micro font-medium text-muted-foreground",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children
		})]
	});
}
function Mono({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "break-all font-mono text-xs",
		children
	});
}
function PatternList({ title, patterns, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-1.5 text-xs text-muted-foreground",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-0.5",
		children: patterns.map((pattern) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: cn("break-all font-mono text-xs", tone === "deny" ? "text-destructive" : "text-muted-foreground"),
			children: pattern
		}, pattern))
	})] });
}
function ConnectOAuthButton({ name, displayName, loginCommand, statusCommand }) {
	const t = useT();
	const spawn = useSpawnExternalTerminal();
	const pushToast = useEventStore((s) => s.pushToast);
	const setCoach = useEventStore((s) => s.setCliConnectCoach);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SoftButton, {
		primary: true,
		disabled: spawn.isPending,
		onClick: () => spawn.mutate({
			name,
			kind: "login"
		}, {
			onSuccess: (res) => {
				if (res.ok) {
					setCoach({
						cliName: name,
						displayName,
						authMode: "oauth_cli",
						loginCommand,
						statusCommand
					});
					pushToast("info", `${t("clis_view.terminal_opened")} (${res.method}) — ${t("clis_view.follow_browser_login")}`);
				} else pushToast("error", res.error || t("clis_view.terminal_spawn_failed"));
			},
			onError: (err) => pushToast("error", err.message)
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-3.5 w-3.5" }), t("clis_view.browser_login")]
	});
}
function DialogShell({ title, help, onClose, width = "max-w-md", footer, children }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-scrim/60 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("flex w-full flex-col overflow-hidden rounded-lg bg-popover shadow-float", width),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-4 border-b border-border p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-base font-semibold",
							children: title
						}), help && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs leading-relaxed text-muted-foreground",
							children: help
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						label: t("common.close"),
						onClick: onClose,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-[60vh] overflow-y-auto p-5",
					children
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-end gap-2 border-t border-border p-4",
					children: footer
				})
			]
		})
	});
}
function ApiKeyDialog({ detail, onClose }) {
	const t = useT();
	const connect = useConnectCli();
	const pushToast = useEventStore((s) => s.pushToast);
	const [values, setValues] = (0, import_react.useState)({});
	const [error, setError] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogShell, {
		title: `${detail.display_name} — ${t("clis_view.set_api_key")}`,
		help: t("clis_view.api_key_help"),
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "ghost",
			onClick: onClose,
			disabled: connect.isPending,
			children: t("common.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			className: "btn-primary",
			disabled: connect.isPending,
			onClick: () => {
				setError(null);
				connect.mutate({
					name: detail.name,
					mode: "api_key",
					secrets: values
				}, {
					onSuccess: (res) => {
						if (res.ok) {
							pushToast("success", `${detail.name} ${t("clis_view.connected_suffix")}`);
							onClose();
						} else setError(res.error || t("clis_view.validation_failed"));
					},
					onError: (err) => setError(err.message)
				});
			},
			children: connect.isPending ? t("clis_view.validating") : t("clis_view.save_and_validate")
		})] }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [detail.secret_keys.map((sk) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: sk.env_var
					}), sk.required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-micro text-muted-foreground",
						children: t("clis_view.required_word")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "password",
					autoComplete: "new-password",
					value: values[sk.name] ?? "",
					onChange: (e) => setValues((v) => ({
						...v,
						[sk.name]: e.target.value
					})),
					className: "w-full rounded-md border border-input bg-background px-3 py-1.5 font-mono text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
					placeholder: detail.secrets_set[sk.name] ? `●●●●● ${t("clis_view.api_key_already_set")}` : t("clis_view.api_key_enter")
				})]
			}, sk.name)), error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-md border border-destructive/40 bg-destructive/10 p-2 text-xs text-destructive",
				children: error
			})]
		})
	});
}
function InstallDialog({ detail, onClose }) {
	const t = useT();
	const spawn = useSpawnExternalTerminal();
	const pushToast = useEventStore((s) => s.pushToast);
	const [selected, setSelected] = (0, import_react.useState)(detail.recommended_install ?? detail.install_methods[0]?.manager ?? "manual");
	const selectedMethod = detail.install_methods.find((m) => m.manager === selected);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogShell, {
		title: `${detail.display_name}${t("clis_view.install_lowercase")}`,
		help: t("clis_view.install_help"),
		onClose,
		width: "max-w-lg",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "ghost",
			onClick: onClose,
			children: t("common.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			className: "btn-primary",
			disabled: spawn.isPending,
			onClick: () => {
				if (selected === "manual") {
					if (selectedMethod?.command) window.open(selectedMethod.command, "_blank", "noopener,noreferrer");
					onClose();
					return;
				}
				spawn.mutate({
					name: detail.name,
					kind: "install",
					method: selected
				}, {
					onSuccess: (res) => {
						if (res.ok) {
							pushToast("info", res.method === "in-app" ? t("clis_view.install_running_in_app") : `${t("clis_view.external_terminal_opened")} (${res.method}) — ${t("clis_view.install_running")}`);
							onClose();
						} else pushToast("error", res.error || t("clis_view.terminal_spawn_failed"));
					},
					onError: (err) => pushToast("error", err.message)
				});
			},
			children: spawn.isPending ? t("clis_view.spawning") : selected === "manual" ? t("clis_view.open") : t("clis_view.install_in_terminal")
		})] }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2 text-xs text-muted-foreground",
				children: t("clis_view.choose_method")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-1",
				children: detail.install_methods.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: cn("flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 transition-colors", selected === m.manager ? "border-primary/40 bg-primary/10" : "border-border hover:bg-secondary"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "radio",
							name: "install-method",
							value: m.manager,
							checked: selected === m.manager,
							onChange: () => setSelected(m.manager),
							className: "accent-primary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: m.manager
						}),
						m.manager === detail.recommended_install && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground",
							children: ["· ", t("clis_view.recommended")]
						})
					]
				}, m.manager))
			})] }), selectedMethod && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-1.5 text-xs text-muted-foreground",
				children: t("clis_view.command_label")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
				className: "block break-all rounded-md border border-border bg-background px-3 py-2 font-mono text-xs",
				children: selectedMethod.command
			})] })]
		})
	});
}
function CustomCliWizard({ onClose }) {
	const t = useT();
	const register = useRegisterCustomCli();
	const pushToast = useEventStore((s) => s.pushToast);
	const [step, setStep] = (0, import_react.useState)(1);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		display_name: "",
		description: "",
		binary_name: "",
		check_command: "",
		version_command: "",
		version_parse_regex: "v?(\\S+)",
		auth_mode: "none",
		login_command: "",
		status_command: "",
		secret_keys: "",
		env_vars: "",
		risk_tier: "monitor",
		allow_patterns: "",
		deny_patterns: "",
		category: "other",
		homepage: ""
	});
	const [error, setError] = (0, import_react.useState)(null);
	const canNext = () => {
		if (step === 1) return form.name.length >= 2 && form.display_name.length >= 1 && form.binary_name.length >= 1;
		if (step === 2) return form.check_command.length >= 1;
		return true;
	};
	const submit = () => {
		setError(null);
		const payload = {
			name: form.name,
			display_name: form.display_name,
			description: form.description,
			homepage: form.homepage,
			binary_name: form.binary_name,
			check_command: form.check_command.split(/\s+/).filter(Boolean),
			version_parse_regex: form.version_parse_regex || "(\\S+)",
			install_manual_url: form.homepage,
			auth_mode: form.auth_mode,
			login_command: form.login_command ? form.login_command.split(/\s+/).filter(Boolean) : null,
			status_command: form.status_command.split(/\s+/).filter(Boolean),
			status_parse: "text_nonempty",
			secret_keys: form.secret_keys.split(",").map((s) => s.trim()).filter(Boolean),
			env_vars: form.env_vars.split(",").map((s) => s.trim()).filter(Boolean),
			risk_tier: form.risk_tier,
			allow_patterns: form.allow_patterns.split("\n").map((s) => s.trim()).filter(Boolean),
			deny_patterns: form.deny_patterns.split("\n").map((s) => s.trim()).filter(Boolean),
			category: form.category,
			icon: ""
		};
		register.mutate(payload, {
			onSuccess: () => {
				pushToast("success", `${form.name} ${t("clis_view.registered_suffix")}`);
				onClose();
			},
			onError: (err) => setError(err.message)
		});
	};
	const stepHelp = [
		t("clis_view.wizard_step1_identity"),
		t("clis_view.wizard_step2_check"),
		t("clis_view.wizard_step3_auth"),
		t("clis_view.wizard_step4_risk")
	][step - 1];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogShell, {
		title: `${t("clis_view.add_custom_cli_title")} · ${t("clis_view.step")} ${step}/4`,
		help: stepHelp,
		onClose,
		width: "max-w-2xl",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mr-auto text-xs text-muted-foreground",
				children: step < 4 ? t("clis_view.steps_skippable") : t("clis_view.done")
			}),
			step > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				onClick: () => setStep(step - 1),
				children: t("common.back")
			}),
			step < 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "btn-primary",
				disabled: !canNext(),
				onClick: () => setStep(step + 1),
				children: t("clis_view.next")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "btn-primary",
				onClick: submit,
				disabled: register.isPending,
				children: register.isPending ? t("common.saving") : t("common.save")
			})
		] }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 text-xs",
			children: [
				step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: t("clis_view.field_name_id"),
						val: form.name,
						onChange: (v) => setForm({
							...form,
							name: v.toLowerCase()
						}),
						placeholder: t("clis_view.eg_mytool")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: t("clis_view.field_display_name"),
						val: form.display_name,
						onChange: (v) => setForm({
							...form,
							display_name: v
						}),
						placeholder: t("clis_view.eg_my_tool_cli")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: t("clis_view.field_binary_name"),
						val: form.binary_name,
						onChange: (v) => setForm({
							...form,
							binary_name: v
						}),
						placeholder: t("clis_view.eg_mytool")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: t("clis_view.field_description"),
						val: form.description,
						onChange: (v) => setForm({
							...form,
							description: v
						}),
						placeholder: t("clis_view.what_does_cli_do")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: t("clis_view.field_category"),
						val: form.category,
						onChange: (v) => setForm({
							...form,
							category: v
						}),
						placeholder: "cloud / git / payments / other"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: t("clis_view.field_homepage_url"),
						val: form.homepage,
						onChange: (v) => setForm({
							...form,
							homepage: v
						}),
						placeholder: "https://..."
					})
				] }),
				step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: t("clis_view.field_check_command"),
					val: form.check_command,
					onChange: (v) => setForm({
						...form,
						check_command: v
					}),
					placeholder: "mytool --version",
					mono: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: t("clis_view.field_version_regex"),
					val: form.version_parse_regex,
					onChange: (v) => setForm({
						...form,
						version_parse_regex: v
					}),
					placeholder: "v(\\\\S+)",
					mono: true
				})] }),
				step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-1 text-xs text-muted-foreground",
							children: t("clis_view.auth_mode_label")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedSelect, {
							value: form.auth_mode,
							onValueChange: (value) => setForm({
								...form,
								auth_mode: value
							}),
							ariaLabel: t("clis_view.auth_mode_label"),
							className: "py-1.5 text-xs",
							options: [
								{
									value: "none",
									label: t("clis_view.auth_none")
								},
								{
									value: "oauth_cli",
									label: t("clis_view.auth_oauth_cli")
								},
								{
									value: "api_key",
									label: t("clis_view.auth_api_key")
								},
								{
									value: "config_file",
									label: t("clis_view.auth_config_file")
								}
							]
						})]
					}),
					form.auth_mode === "oauth_cli" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: t("clis_view.field_login_command"),
						val: form.login_command,
						onChange: (v) => setForm({
							...form,
							login_command: v
						}),
						placeholder: "mytool login",
						mono: true
					}),
					form.auth_mode !== "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: t("clis_view.field_status_command"),
						val: form.status_command,
						onChange: (v) => setForm({
							...form,
							status_command: v
						}),
						placeholder: "mytool whoami",
						mono: true
					}),
					form.auth_mode === "api_key" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: t("clis_view.field_secret_keys"),
						val: form.secret_keys,
						onChange: (v) => setForm({
							...form,
							secret_keys: v
						}),
						placeholder: "mytool_api_key",
						mono: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: t("clis_view.field_env_vars"),
						val: form.env_vars,
						onChange: (v) => setForm({
							...form,
							env_vars: v
						}),
						placeholder: "MYTOOL_API_KEY",
						mono: true
					})] })
				] }),
				step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-1 text-xs text-muted-foreground",
							children: t("clis_view.risk_tier_label")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedSelect, {
							value: form.risk_tier,
							onValueChange: (value) => setForm({
								...form,
								risk_tier: value
							}),
							ariaLabel: t("clis_view.risk_tier_label"),
							className: "py-1.5 text-xs",
							options: [
								{
									value: "safe",
									label: t("clis_view.risk_safe")
								},
								{
									value: "monitor",
									label: t("clis_view.risk_monitor")
								},
								{
									value: "ask",
									label: t("clis_view.risk_ask")
								},
								{
									value: "block",
									label: t("clis_view.risk_block")
								}
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
						label: t("clis_view.field_allow_patterns"),
						val: form.allow_patterns,
						onChange: (v) => setForm({
							...form,
							allow_patterns: v
						}),
						placeholder: "mytool get *\nmytool list*"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
						label: t("clis_view.field_deny_patterns"),
						val: form.deny_patterns,
						onChange: (v) => setForm({
							...form,
							deny_patterns: v
						}),
						placeholder: "mytool delete *\nmytool rm *"
					})
				] }),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-md border border-destructive/40 bg-destructive/10 p-2 text-xs text-destructive",
					children: error
				})
			]
		})
	});
}
function TextField({ label, val, onChange, placeholder, mono }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-1 text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "text",
			value: val,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			className: cn("w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring", mono && "font-mono text-xs")
		})]
	});
}
function TextArea({ label, val, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-1 text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value: val,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			className: "h-24 w-full resize-none rounded-md border border-input bg-background px-3 py-1.5 font-mono text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
		})]
	});
}
function UsageDrawer({ name, onClose }) {
	const t = useT();
	const [page, setPage] = (0, import_react.useState)(1);
	const [successOnly, setSuccessOnly] = (0, import_react.useState)(false);
	const [search, setSearch] = (0, import_react.useState)("");
	const { data: usage } = useCliUsage(name, {
		page,
		pageSize: 50,
		successOnly,
		search
	});
	const { data: stats } = useCliStats(name);
	const clear = useClearUsage();
	const pushToast = useEventStore((s) => s.pushToast);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-stretch justify-end bg-scrim/60 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex w-[560px] max-w-full flex-col border-l border-border bg-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3 border-b border-border px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "truncate text-sm font-semibold",
							children: [
								t("clis_view.history"),
								" · ",
								name
							]
						}), stats && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 text-xs text-muted-foreground tabular-nums",
							children: fill(t("clis_view.usage_stats"), {
								total: stats.total_calls,
								rate: Math.round(stats.success_rate * 100),
								avg: stats.avg_duration_ms
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						label: t("common.close"),
						onClick: onClose,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 border-b border-border px-5 py-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineSearch, {
							value: search,
							onChange: (v) => {
								setPage(1);
								setSearch(v);
							},
							placeholder: t("clis_view.search_command")
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: successOnly,
							onChange: (e) => {
								setPage(1);
								setSuccessOnly(e.target.checked);
							},
							className: "accent-primary"
						}), t("clis_view.success_only")]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [
							!usage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground",
								children: t("common.loading")
							}),
							usage && usage.entries.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "py-10 text-center text-sm text-muted-foreground",
								children: t("clis_view.no_entries")
							}),
							usage && usage.entries.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-1.5",
								children: usage.entries.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "rounded-lg border border-border bg-background px-3 py-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
												className: "min-w-0 flex-1 break-all font-mono text-xs",
												children: e.full_command
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("shrink-0 font-mono text-xs tabular-nums", e.exit_code === 0 ? "text-muted-foreground" : "text-destructive"),
												children: e.exit_code === 0 ? "✓" : e.exit_code !== null ? `✗ ${e.exit_code}` : "…"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-micro text-muted-foreground tabular-nums",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDateTime(e.started_at) }),
												e.duration_ms !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [e.duration_ms, " ms"] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: e.caller }),
												e.trace_id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													title: e.trace_id,
													children: ["T:", e.trace_id.slice(0, 8)]
												})
											]
										}),
										e.stderr_preview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1.5 rounded border border-destructive/30 bg-destructive/5 px-2 py-1 font-mono text-micro text-destructive",
											children: e.stderr_preview
										})
									]
								}, e.id))
							})
						]
					})
				}),
				stats && stats.top_commands.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border px-5 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-1.5 text-micro font-medium text-muted-foreground",
						children: t("clis_view.top_commands")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-0.5",
						children: stats.top_commands.slice(0, 3).map(([cmd, count]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "truncate font-mono",
								children: cmd
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums text-muted-foreground",
								children: [count, "×"]
							})]
						}, cmd))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2 border-t border-border p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						disabled: clear.isPending,
						onClick: () => {
							if (window.confirm(`${t("clis_view.confirm_clear_history_prefix")} "${name}" ${t("clis_view.confirm_clear_history_suffix")}`)) clear.mutate(name, {
								onSuccess: (res) => pushToast("success", `${res.deleted} ${t("clis_view.entries_deleted")}`),
								onError: (err) => pushToast("error", err.message)
							});
						},
						className: "text-destructive hover:text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1.5",
							children: t("clis_view.clear")
						})]
					}), usage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								disabled: page === 1,
								onClick: () => setPage(Math.max(1, page - 1)),
								children: "‹"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: [
									(page - 1) * 50 + 1,
									"–",
									Math.min(page * 50, usage.total),
									" / ",
									usage.total
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								disabled: page * 50 >= usage.total,
								onClick: () => setPage(page + 1),
								children: "›"
							})
						]
					})]
				})
			]
		})
	});
}
var RISK_STYLES = {
	safe: {
		label: "safe",
		badge: "border-muted-foreground/40 bg-muted-foreground/10 text-muted-foreground",
		Icon: ShieldCheck
	},
	monitor: {
		label: "monitor",
		badge: "border-primary/40 bg-primary/10 text-primary",
		Icon: Shield
	},
	ask: {
		label: "ask",
		badge: "border-foreground/40 bg-foreground/10 text-foreground",
		Icon: ShieldAlert
	},
	block: {
		label: "block",
		badge: "border-destructive/50 bg-destructive/10 text-destructive",
		Icon: Ban
	}
};
function RiskBadge({ tier }) {
	const t = useT();
	if (!tier || !(tier in RISK_STYLES)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-testid": "risk-badge",
		"data-risk": "unknown",
		className: "inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-0.5 text-micro font-medium text-muted-foreground",
		children: t("cli_test_hub_view.no_risk_tier")
	});
	const style = RISK_STYLES[tier];
	const Icon = style.Icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-testid": "risk-badge",
		"data-risk": tier,
		className: cn("inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-micro font-medium", style.badge),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3 w-3" }), style.label]
	});
}
function cliOfRun(run) {
	const tool = run.result?.tool_called;
	if (tool && tool.startsWith("cli_")) return tool.slice(4);
	return run.hint || null;
}
function CliTestHubView() {
	const t = useT();
	const assistantName = useEventStore((s) => s.assistantName);
	const { data, isLoading: listLoading, error: listError, refetch, isFetching } = useClisList();
	const testRun = useCliTestRun();
	const [instruction, setInstruction] = (0, import_react.useState)("");
	const [cliHint, setCliHint] = (0, import_react.useState)("");
	const [runs, setRuns] = (0, import_react.useState)([]);
	const [expanded, setExpanded] = (0, import_react.useState)(null);
	const nextId = (0, import_react.useRef)(1);
	const connected = (0, import_react.useMemo)(() => (data?.clis ?? []).filter((c) => c.status === "connected"), [data]);
	const canRun = instruction.trim().length > 0 && !testRun.isPending;
	const record = (entry) => {
		const id = nextId.current++;
		setRuns((prev) => [{
			...entry,
			id
		}, ...prev]);
		setExpanded(id);
	};
	const handleRun = () => {
		const trimmed = instruction.trim();
		if (!trimmed || testRun.isPending) return;
		const hint = cliHint;
		testRun.mutate({
			instruction: trimmed,
			cli_hint: cliHint || void 0
		}, {
			onSuccess: (result) => record({
				instruction: trimmed,
				hint,
				result,
				error: null
			}),
			onError: (err) => record({
				instruction: trimmed,
				hint,
				result: null,
				error: err
			})
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
			className: "flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full max-w-4xl px-8 py-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
					title: t("cli_test_hub_view.title"),
					subtitle: `${t("cli_test_hub_view.subtitle_tell")} ${assistantName} ${t("cli_test_hub_view.subtitle_rest")}`,
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						label: t("clis_view.reload"),
						onClick: () => void refetch(),
						busy: isFetching && !data,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Composer, {
							instruction,
							onInstructionChange: setInstruction,
							cliHint,
							onCliHintChange: setCliHint,
							connectedClis: connected,
							canRun,
							isPending: testRun.isPending,
							onRun: handleRun
						}),
						runs.length === 0 && !testRun.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starters, {
							connectedClis: connected,
							onPick: (cli, text) => {
								setCliHint(cli);
								setInstruction(text);
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectedClisPanel, {
							clis: connected,
							isLoading: listLoading,
							error: listError
						}),
						testRun.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultSkeleton, {}),
						runs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunLog, {
							runs,
							expanded,
							onToggle: (id) => setExpanded((cur) => cur === id ? null : id),
							onClear: () => {
								setRuns([]);
								setExpanded(null);
							}
						})
					]
				})]
			})
		})
	});
}
function Composer({ instruction, onInstructionChange, cliHint, onCliHintChange, connectedClis, canRun, isPending, onRun }) {
	const t = useT();
	const assistantName = useEventStore((s) => s.assistantName);
	const handleKeyDown = (e) => {
		if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && canRun) {
			e.preventDefault();
			onRun();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-2xl border border-border bg-card transition-colors", "focus-within:border-foreground/25"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			id: "cli-test-instruction",
			value: instruction,
			onChange: (e) => onInstructionChange(e.target.value),
			onKeyDown: handleKeyDown,
			disabled: isPending,
			rows: 3,
			"aria-label": `${t("cli_test_hub_view.instruction_to")} ${assistantName}`,
			placeholder: `${t("cli_test_hub_view.subtitle_tell")} ${assistantName}, ${t("cli_test_hub_view.placeholder_rest")}`,
			className: "w-full resize-none bg-transparent px-4 pb-2 pt-4 text-reading placeholder:text-muted-foreground focus:outline-none disabled:opacity-60"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2 border-t border-border px-3 py-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TargetPicker, {
				value: cliHint,
				onChange: onCliHintChange,
				connectedClis,
				disabled: isPending
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ml-auto flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden text-micro text-muted-foreground sm:inline",
					children: t("cli_test_hub_view.ctrl_cmd_enter")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					className: "btn-primary",
					disabled: !canRun,
					onClick: onRun,
					"aria-label": t("cli_test_hub_view.run_instruction"),
					children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1.5",
						children: t("cli_test_hub_view.running")
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1.5",
						children: t("cli_test_hub_view.run")
					})] })
				})]
			})]
		})]
	});
}
function TargetPicker({ value, onChange, connectedClis, disabled }) {
	const t = useT();
	const assistantName = useEventStore((s) => s.assistantName);
	const selected = connectedClis.find((c) => c.name === value) ?? null;
	const anyLabel = `${assistantName} ${t("cli_test_hub_view.let_decide")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionMenu, {
		align: "start",
		label: t("cli_test_hub_view.cli_hint_aria"),
		actions: [{
			id: "__any",
			label: anyLabel,
			icon: value === "" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }),
			onSelect: () => onChange("")
		}, ...connectedClis.map((cli, index) => ({
			id: cli.name,
			label: cli.display_name,
			separatorAbove: index === 0,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CliLogo, {
				cliName: cli.name,
				category: cli.category,
				size: "sm",
				className: "h-4 w-4 rounded border-0 bg-transparent"
			}),
			onSelect: () => onChange(cli.name)
		}))],
		trigger: ({ open, toggle }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SoftButton, {
			onClick: toggle,
			disabled,
			ariaExpanded: open,
			ariaHasPopup: "menu",
			ariaLabel: t("cli_test_hub_view.cli_hint_aria"),
			children: [selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CliLogo, {
				cliName: selected.name,
				category: selected.category,
				size: "sm",
				className: "h-4 w-4 rounded border-0 bg-transparent"
			}), selected.display_name] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-muted-foreground" }), anyLabel] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("h-3.5 w-3.5 transition-transform", open && "rotate-180") })]
		})
	});
}
function starterFor(cliName) {
	const key = `cli_test_hub_view.starters.${cliName}`;
	const text = translate(key);
	return text === key ? null : text;
}
function Starters({ connectedClis, onPick }) {
	const t = useT();
	const suggestions = (0, import_react.useMemo)(() => connectedClis.map((cli) => ({
		cli,
		text: starterFor(cli.name)
	})).filter((s) => s.text !== null).slice(0, 4), [connectedClis]);
	if (suggestions.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-2 text-xs text-muted-foreground",
		children: t("cli_test_hub_view.try_one")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-wrap gap-2",
		children: suggestions.map(({ cli, text }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => onPick(cli.name, text),
			className: "inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-1.5 text-left text-body text-foreground transition-colors hover:bg-popover",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CliLogo, {
				cliName: cli.name,
				category: cli.category,
				size: "sm",
				className: "h-4 w-4 rounded border-0 bg-transparent"
			}), text]
		}) }, cli.name))
	})] });
}
function ConnectedClisPanel({ clis, isLoading, error }) {
	const t = useT();
	const setActiveSection = useEventStore((s) => s.setActiveSection);
	const assistantName = useEventStore((s) => s.assistantName);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 text-xs text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), t("cli_test_hub_view.loading_connected")]
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": "clis-load-error",
		className: "rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive",
		children: [
			t("cli_test_hub_view.list_load_failed"),
			": ",
			error.message
		]
	});
	if (clis.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-testid": "clis-empty",
		className: "rounded-xl border border-border bg-card p-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-start gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "h-4 w-4 text-muted-foreground" }), t("cli_test_hub_view.no_cli_connected")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs leading-relaxed text-muted-foreground",
					children: [
						assistantName,
						" ",
						t("cli_test_hub_view.no_cli_help")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SoftButton, {
					onClick: () => setActiveSection("clis"),
					children: [t("cli_test_hub_view.go_to_clis"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-2 text-xs text-muted-foreground",
		children: [
			t("cli_test_hub_view.connected_clis"),
			" · ",
			clis.length
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-wrap gap-1.5",
		"data-testid": "clis-chips",
		children: clis.map((cli) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "inline-flex items-center gap-1.5 rounded-lg border border-border bg-card py-1 pl-1.5 pr-2.5 text-xs",
			title: cli.description,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CliLogo, {
					cliName: cli.name,
					category: cli.category,
					size: "sm",
					className: "h-5 w-5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: cli.name
				}),
				cli.version && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-micro text-muted-foreground",
					children: cli.version
				})
			]
		}, cli.name))
	})] });
}
function ResultSkeleton() {
	const t = useT();
	const assistantName = useEventStore((s) => s.assistantName);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": "result-skeleton",
		"aria-busy": "true",
		className: "space-y-3 rounded-xl border border-border bg-card p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin text-primary" }),
					assistantName,
					" ",
					t("cli_test_hub_view.picking_tool")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-2/3 animate-jarvis-pulse rounded bg-muted-foreground/15" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-1/2 animate-jarvis-pulse rounded bg-muted-foreground/15" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-20 w-full animate-jarvis-pulse rounded bg-muted-foreground/10" })
		]
	});
}
function RunLog({ runs, expanded, onToggle, onClear }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-2 flex items-center justify-between gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-xs text-muted-foreground",
			children: [
				t("cli_test_hub_view.runs"),
				" · ",
				runs.length
			]
		}), runs.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onClear,
			className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), t("cli_test_hub_view.clear_runs")]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2",
		children: runs.map((run) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunCard, {
			run,
			open: expanded === run.id,
			onToggle: () => onToggle(run.id)
		}, run.id))
	})] });
}
function RunCard({ run, open, onToggle }) {
	const t = useT();
	const cli = cliOfRun(run);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: cn("overflow-hidden", Boolean(run.error) || run.result?.ok === false || Boolean(run.result?.error) ? "border-destructive/35" : open && "border-foreground/15"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onToggle,
			"aria-expanded": open,
			className: "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary",
			children: [
				cli ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CliLogo, {
					cliName: cli,
					category: "other",
					size: "sm"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-background",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "h-4 w-4 text-muted-foreground" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate text-sm",
						children: run.instruction
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 block truncate font-mono text-micro text-muted-foreground",
						children: run.result?.command ?? run.error?.message ?? t("cli_test_hub_view.no_command")
					})]
				}),
				run.result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExitCodeBadge, {
					code: run.result.exit_code,
					compact: !open
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-90") })
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border px-4 py-4",
			children: run.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestErrorPanel, { error: run.error }) : run.result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultPanel, { result: run.result }) : null
		})]
	});
}
function RequestErrorPanel({ error }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": "request-error",
		className: "rounded-lg border border-destructive/40 bg-destructive/10 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-1 text-sm font-semibold text-destructive",
				children: t("cli_test_hub_view.request_failed")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "break-words text-xs text-destructive",
				children: error.message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-micro text-muted-foreground",
				children: [
					t("cli_test_hub_view.backend_check_prefix"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "mx-1 font-mono",
						children: "/api/clis/test-run"
					}),
					" ",
					t("cli_test_hub_view.backend_check_suffix")
				]
			})
		]
	});
}
function ResultPanel({ result }) {
	const t = useT();
	const assistantName = useEventStore((s) => s.assistantName);
	const failed = result.ok === false || Boolean(result.error);
	const hasSteps = result.steps && result.steps.length > 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": "result-panel",
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-1 flex items-center gap-1.5 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }),
					assistantName,
					" ",
					t("cli_test_hub_view.says")
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-testid": "result-summary",
				className: "text-reading text-foreground",
				children: result.summary || (failed ? t("cli_test_hub_view.command_failed") : "—")
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaChip, {
						label: "Tool",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-testid": "result-tool",
							className: "font-mono",
							children: result.tool_called ?? "—"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, { tier: result.risk_tier }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExitCodeBadge, {
						code: result.exit_code,
						testId: "result-exit-code"
					}),
					typeof result.duration_ms === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaChip, {
						label: t("cli_test_hub_view.duration"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							"data-testid": "result-duration",
							className: "tabular-nums",
							children: [result.duration_ms, " ms"]
						})
					})
				]
			}),
			result.command && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
				title: t("cli_test_hub_view.command_label"),
				content: result.command,
				testId: "result-command"
			}),
			result.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-testid": "result-error",
				className: "rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive",
				children: result.error
			}),
			result.stdout && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutputBlock, {
				title: "stdout",
				content: result.stdout,
				testId: "result-stdout",
				tone: "default"
			}),
			result.stderr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutputBlock, {
				title: "stderr",
				content: result.stderr,
				testId: "result-stderr",
				tone: "error"
			}),
			hasSteps && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-1.5 text-xs text-muted-foreground",
				children: [
					t("cli_test_hub_view.steps"),
					" (",
					result.steps.length,
					")"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				"data-testid": "result-steps",
				className: "space-y-1.5",
				children: result.steps.map((step, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-2.5 rounded-lg border border-border bg-background px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-micro font-medium tabular-nums text-muted-foreground",
						children: idx + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-micro text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono",
									children: step.tool
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepExitCode, { code: step.exit_code })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "mt-0.5 block break-all font-mono text-micro text-foreground",
							children: step.command
						})]
					})]
				}, `${step.tool}-${idx}`))
			})] }),
			!result.tool_called && !result.command && !result.error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted-foreground",
				children: [
					assistantName,
					" ",
					t("cli_test_hub_view.no_tool_found")
				]
			})
		]
	});
}
function MetaChip({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-0.5 text-micro",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-foreground",
			children
		})]
	});
}
function ExitCodeBadge({ code, compact, testId }) {
	if (code === null || code === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-testid": testId,
		"data-exit": "null",
		className: "inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-background px-2 py-0.5 text-micro text-muted-foreground",
		children: [!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: "Exit"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "—" })]
	});
	const ok = code === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-testid": testId,
		"data-exit": String(code),
		className: cn("inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2 py-0.5 text-micro font-medium tabular-nums", ok ? "border-muted-foreground/40 bg-muted-foreground/10 text-muted-foreground" : "border-destructive/50 bg-destructive/10 text-destructive"),
		children: [!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-normal text-muted-foreground",
			children: "Exit"
		}), code]
	});
}
function StepExitCode({ code }) {
	if (code === null || code === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-muted-foreground",
		children: "exit —"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("tabular-nums", code === 0 ? "text-muted-foreground" : "text-destructive"),
		children: ["exit ", code]
	});
}
function CodeBlock({ title, content, testId }) {
	const t = useT();
	const [copied, setCopied] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1 flex items-center justify-between gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-muted-foreground",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			"aria-label": t("cli_test_hub_view.copy"),
			onClick: () => {
				robustCopy(content).then((ok) => {
					if (!ok) return;
					setCopied(true);
					window.setTimeout(() => setCopied(false), 1500);
				});
			},
			className: "inline-flex items-center gap-1 text-micro text-muted-foreground transition-colors hover:text-foreground",
			children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3 w-3" }), copied ? t("cli_test_hub_view.copied") : t("cli_test_hub_view.copy")]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
		"data-testid": testId,
		className: "overflow-x-auto rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs text-foreground scrollbar-jarvis",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: content })
	})] });
}
function OutputBlock({ title, content, testId, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-1 text-xs text-muted-foreground",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
		className: "max-h-60 rounded-lg border border-border bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			"data-testid": testId,
			className: cn("whitespace-pre-wrap break-words px-3 py-2 font-mono text-micro", tone === "error" ? "text-destructive" : "text-foreground"),
			children: content
		})
	})] });
}
var AREAS = [{
	id: "clis",
	labelKey: "nav.clis",
	icon: SquareTerminal
}, {
	id: "cli-test-hub",
	labelKey: "nav.cli_test_hub",
	icon: FlaskConical
}];
function ClisHubView() {
	const t = useT();
	const active = useEventStore((s) => s.activeSection);
	const setActive = useEventStore((s) => s.setActiveSection);
	const current = AREAS.some((a) => a.id === active) ? active : "clis";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			"aria-label": t("clis_view.group_label"),
			className: "flex w-[200px] shrink-0 flex-col border-r border-border px-3 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-2.5 pb-2 text-xs font-medium uppercase tracking-wide text-foreground-faint",
				children: t("clis_view.group_label")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-0.5",
				children: AREAS.map((area) => {
					const Icon = area.icon;
					const isActive = area.id === current;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActive(area.id),
						"aria-current": isActive ? "page" : void 0,
						className: cn("flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-meta font-medium transition-colors", isActive ? "jarvis-nav-active" : "text-foreground hover:bg-secondary hover:text-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("h-4 w-4 shrink-0", isActive ? "text-foreground" : "text-foreground") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex-1 truncate",
							children: t(area.labelKey)
						})]
					}) }, area.id);
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-0 min-w-0 flex-1",
			children: [current === "clis" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClisView, {}), current === "cli-test-hub" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CliTestHubView, {})]
		})]
	});
}
export { ClisHubView };
