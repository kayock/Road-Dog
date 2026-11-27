import { t as Check } from "./check-vbwKkbPq.js";
import { t as CircleAlert } from "./circle-alert-BujlF6G8.js";
import { t as GitFork } from "./git-fork-ZDEEudc6.js";
import { r as HardDrive, t as ProviderLogo } from "./ProviderLogo-BxoN_q6P.js";
import { t as LogIn } from "./log-in-BJs4e2l4.js";
import { t as LogOut } from "./log-out-CV5z6kDy.js";
import { t as Play } from "./play-B4Hl_QRo.js";
import { t as PlugZap } from "./plug-zap-Bf7gZfvH.js";
import { t as Star } from "./star-MoccyyD6.js";
import { t as Terminal } from "./terminal-CG2JP6MB.js";
import { t as WandSparkles } from "./wand-sparkles-CkQjFpyB.js";
import { Ar as switchSttProvider, Bc as require_jsx_runtime, Bn as codexLogout, Br as requestRealtimeTransportOffer, Cr as startGpuLibrariesInstall, Di as Mic, Dr as switchComputerUseProvider, Ec as create, Er as switchBrainProvider, Et as openExternalUrl, F as robustCopy, Gi as CircleX, Gn as getRealtimeOptions, Hn as fetchRealtimeVoicePreview, Ir as useSectionHealth, Jn as localInstallStatus, Kn as getTtsVoices, Ln as cn, Mr as switchTtsProvider, Or as switchDictationPolishProvider, Pi as KeyRound, Pr as testProvider, Qn as logoutAntigravity, Rr as putVoiceMode, Sr as startCodexLogin, Tr as startModelPull, Ui as Download, Un as fetchTtsPreview, Vi as ExternalLink, Wi as Copy, Wn as getBrainProviderModels, Xc as require_react, Yi as Brain, Yn as loginAntigravity, _r as saveRealtimeOptions, ar as managedServerStart, br as sectionHealthForSubject, ci as Volume2, cr as managedServerUninstall, dc as agentsBrand, di as Square, dr as ollamaRuntime, fr as ollamaRuntimeInstall, gi as Search, gr as saveProviderBaseUrl, hr as saveBrainProviderModel, ir as managedServerSetup, ji as LoaderCircle, kr as switchRealtimeProvider, ln as Button, lr as modelLibraryTags, na as createLucideIcon, nr as managedServerModelCatalog, oc as useT, or as managedServerStatus, pr as ollamaRuntimeStart, qi as ChevronDown, qn as gpuLibrariesInstallStatus, rr as managedServerPreflight, sc as useUiLanguage, sr as managedServerStop, tl as __toESM, tr as managedServerInstall, uc as agentBrand, ur as modelPullStatus, vr as saveTtsVoice, wc as useEventStore, wr as startLocalInstall, yi as RefreshCw, yr as searchModelLibrary, zn as PROVIDER_BACKEND_UNREACHABLE } from "./index-BOzhgzD7.js";
import { t as BrandedSelect } from "./select-vogX_D37.js";
import { t as ApiKeyForm } from "./ApiKeyForm-DwgnNKoR.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Cpu = createLucideIcon("Cpu", [
	["rect", {
		width: "16",
		height: "16",
		x: "4",
		y: "4",
		rx: "2",
		key: "14l7u7"
	}],
	["rect", {
		width: "6",
		height: "6",
		x: "9",
		y: "9",
		rx: "1",
		key: "5aljv4"
	}],
	["path", {
		d: "M15 2v2",
		key: "13l42r"
	}],
	["path", {
		d: "M15 20v2",
		key: "15mkzm"
	}],
	["path", {
		d: "M2 15h2",
		key: "1gxd5l"
	}],
	["path", {
		d: "M2 9h2",
		key: "1bbxkp"
	}],
	["path", {
		d: "M20 15h2",
		key: "19e6y8"
	}],
	["path", {
		d: "M20 9h2",
		key: "19tzq7"
	}],
	["path", {
		d: "M9 2v2",
		key: "165o2o"
	}],
	["path", {
		d: "M9 20v2",
		key: "i2bqo8"
	}]
]);
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Radio = createLucideIcon("Radio", [
	["path", {
		d: "M4.9 19.1C1 15.2 1 8.8 4.9 4.9",
		key: "1vaf9d"
	}],
	["path", {
		d: "M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5",
		key: "u1ii0m"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "2",
		key: "1c9p78"
	}],
	["path", {
		d: "M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5",
		key: "1j5fej"
	}],
	["path", {
		d: "M19.1 4.9C23 8.8 23 15.1 19.1 19",
		key: "10b0cb"
	}]
]);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function AltCredentialNote({ alt }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "group text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
			className: "inline-flex cursor-pointer list-none items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitFork, {
					"aria-hidden": "true",
					className: "h-3 w-3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-foreground/90",
					children: t("apikeys_view.alt_credential_title").replace("{0}", alt.label)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted-foreground",
					children: ["· ", t(`provider_billing.${alt.billing}`)]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					"aria-hidden": "true",
					className: "h-3 w-3 transition-transform group-open:rotate-180 motion-reduce:transition-none"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-1.5 space-y-1 pl-[18px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-prose leading-relaxed text-muted-foreground",
					children: alt.credential_help
				}),
				alt.credential_path_hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-muted-foreground/80",
					children: alt.credential_path_hint
				}),
				alt.dashboard_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: alt.dashboard_url,
					target: "_blank",
					rel: "noreferrer",
					className: "inline-flex items-center gap-1 text-muted-foreground hover:text-primary",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
							"aria-hidden": "true",
							className: "h-3 w-3"
						}),
						" ",
						t("apikeys_view.alt_credential_setup").replace("{0}", alt.label)
					]
				})
			]
		})]
	});
}
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function modelProviderUrl(providerId, modelId) {
	if (providerId === "openrouter" && modelId) return `https://openrouter.ai/${modelId}`;
	return null;
}
var MODEL_FILTERS = [
	"all",
	"starred",
	"free",
	"frontier",
	"value"
];
function matchesFilter(m, f) {
	switch (f) {
		case "starred": return !!m.starred;
		case "free": return !!m.free;
		case "frontier": return !!m.frontier;
		case "value": return !!m.value;
		default: return true;
	}
}
var STATUS_TONE = {
	ok: "border-muted-foreground/30 bg-muted-foreground/10 text-muted-foreground",
	not_configured: "border-border bg-muted text-muted-foreground",
	bad_key: "bg-secondary text-foreground",
	no_credits: "bg-secondary text-foreground",
	rate_limited: "bg-secondary text-foreground",
	model_unavailable: "bg-secondary text-foreground",
	unreachable: "bg-secondary text-destructive",
	error: "bg-secondary text-destructive"
};
function BrainModelSelector({ providerId, currentModel, recommendedModel, onSave, healthSection, healthActive = false, headingLabel, placeholder, controlled, visionOnly, loadModels, fixedCatalog = false }) {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const rootRef = (0, import_react.useRef)(null);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [models, setModels] = (0, import_react.useState)([]);
	const [source, setSource] = (0, import_react.useState)(null);
	const [sourceNote, setSourceNote] = (0, import_react.useState)("");
	const [selects, setSelects] = (0, import_react.useState)("model");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [pinned, setPinned] = (0, import_react.useState)(currentModel ?? "");
	const [probe, setProbe] = (0, import_react.useState)(null);
	const [slowProbe, setSlowProbe] = (0, import_react.useState)(false);
	async function load(refresh = false) {
		setLoading(true);
		try {
			const res = loadModels ? await loadModels(refresh) : await getBrainProviderModels(providerId, refresh);
			setModels(Array.isArray(res.models) ? res.models : []);
			setSource(res.source);
			setSourceNote(typeof res.reason === "string" ? res.reason : "");
			setSelects(res.selects === "voice" ? "voice" : "model");
			if (!controlled && !pinned && res.current_model) setPinned(res.current_model);
		} catch (e) {
			pushToast("error", `${t("apikeys_model.load_failed")}: ${e.message}`);
		} finally {
			setLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		load();
	}, [providerId]);
	(0, import_react.useEffect)(() => {
		if (controlled) setPinned(currentModel ?? "");
	}, [controlled, currentModel]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		function onDown(e) {
			if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
		}
		document.addEventListener("mousedown", onDown);
		return () => document.removeEventListener("mousedown", onDown);
	}, [open]);
	const matched = (0, import_react.useMemo)(() => {
		let list = Array.isArray(models) ? models : [];
		if (visionOnly) list = list.filter((m) => m.vision !== false);
		const q = query.trim().toLowerCase();
		if (!q) return list;
		const squash = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
		const sq = squash(query);
		return list.filter((m) => {
			const id = m.id.toLowerCase();
			const label = m.label.toLowerCase();
			return id.includes(q) || label.includes(q) || sq.length > 0 && (squash(m.id).includes(sq) || squash(m.label).includes(sq));
		});
	}, [
		models,
		query,
		visionOnly
	]);
	const trimmed = query.trim();
	const exactMatch = matched.some((m) => m.id === trimmed);
	const filterCounts = (0, import_react.useMemo)(() => {
		const counts = {
			all: matched.length,
			starred: 0,
			free: 0,
			frontier: 0,
			value: 0
		};
		for (const m of matched) {
			if (m.starred) counts.starred += 1;
			if (m.free) counts.free += 1;
			if (m.frontier) counts.frontier += 1;
			if (m.value) counts.value += 1;
		}
		return counts;
	}, [matched]);
	const hasTags = (0, import_react.useMemo)(() => models.some((m) => m.starred || m.free || m.frontier || m.value), [models]);
	const visible = (0, import_react.useMemo)(() => matched.filter((m) => matchesFilter(m, filter)), [matched, filter]);
	const pinnedLabel = models.find((m) => m.id === pinned)?.label ?? pinned;
	(0, import_react.useEffect)(() => {
		if (filter !== "all" && filterCounts[filter] === 0) setFilter("all");
	}, [filter, filterCounts]);
	async function save(value) {
		const model = value.trim();
		setSaving(true);
		setSlowProbe(false);
		const slowTimer = window.setTimeout(() => setSlowProbe(true), 6e3);
		setProbe(null);
		setOpen(false);
		setQuery("");
		if (healthSection && healthActive) window.dispatchEvent(new CustomEvent("jarvis:provider-selection-pending", { detail: {
			section: healthSection,
			provider: providerId
		} }));
		try {
			const res = onSave ? await onSave(model) : await saveBrainProviderModel(providerId, model);
			setPinned(res.model);
			setProbe(res.probe ?? null);
			if (healthSection && healthActive) if (res.probe) window.dispatchEvent(new CustomEvent("jarvis:provider-tested", { detail: {
				section: healthSection,
				provider: res.provider,
				active: true,
				result: {
					provider: res.provider,
					...res.probe
				}
			} }));
			else window.dispatchEvent(new CustomEvent("jarvis:provider-config-changed", { detail: {
				section: healthSection,
				provider: res.provider
			} }));
			const note = res.restart_required ? ` ${t("apikeys_model.restart_note")}` : res.applied_live ? ` ${t("apikeys_model.live_note")}` : "";
			pushToast("success", `${t("apikeys_model.saved")}${note}`);
		} catch (e) {
			if (healthSection && healthActive) window.dispatchEvent(new CustomEvent("jarvis:provider-switch-failed", { detail: {
				section: healthSection,
				provider: providerId
			} }));
			pushToast("error", e.message);
		} finally {
			window.clearTimeout(slowTimer);
			setSlowProbe(false);
			setSaving(false);
		}
	}
	if (fixedCatalog && models.length === 1) {
		const only = models[0];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-1.5",
			onClick: (e) => e.stopPropagation(),
			onDoubleClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-micro text-muted-foreground",
				children: headingLabel ?? (selects === "voice" ? t("apikeys_model.heading_voice") : t("apikeys_model.heading"))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-foreground",
				"data-testid": "fixed-model",
				children: only.label || only.id
			})]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: rootRef,
		className: "space-y-1.5",
		onClick: (e) => e.stopPropagation(),
		onDoubleClick: (e) => e.stopPropagation(),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-micro text-muted-foreground",
					children: headingLabel ?? (selects === "voice" ? t("apikeys_model.heading_voice") : t("apikeys_model.heading"))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => void load(true),
					disabled: loading,
					className: "inline-flex items-center gap-1 text-micro text-muted-foreground hover:text-foreground",
					title: t("apikeys_model.refresh"),
					children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3 w-3" }), t("apikeys_model.refresh")]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"aria-label": t("apikeys_model.model_label"),
				"aria-expanded": open,
				onClick: () => setOpen((o) => !o),
				disabled: saving,
				className: cn("flex w-full items-center justify-between gap-2 rounded-md border bg-background px-3 py-2 text-left transition-colors", open ? "border-border-strong ring-1 ring-primary/20" : "border-input hover:border-border-strong"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("truncate text-xs", !pinned && "text-muted-foreground"),
					children: pinnedLabel || placeholder || (selects === "voice" ? t("apikeys_model.choose_voice") : t("apikeys_model.choose_placeholder"))
				}), saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 shrink-0 animate-spin text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform", open && "rotate-180") })]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-md border border-border bg-popover",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 border-b border-border px-2.5 py-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							autoFocus: true,
							"aria-label": t("apikeys_model.search_placeholder"),
							value: query,
							placeholder: t("apikeys_model.search_placeholder"),
							onChange: (e) => setQuery(e.target.value),
							className: "w-full bg-transparent font-mono text-xs focus:outline-none"
						})]
					}),
					hasTags && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-center gap-1 px-2 py-1.5",
							children: MODEL_FILTERS.map((f) => {
								const count = filterCounts[f];
								const isActive = filter === f;
								const disabled = f !== "all" && count === 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setFilter(f),
									disabled,
									"aria-pressed": isActive,
									"aria-label": t(`apikeys_model.filter_${f}`),
									title: t(`apikeys_model.filter_hint_${f}`),
									className: cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-micro transition-colors", isActive ? "bg-secondary text-foreground-strong" : "border-border bg-muted text-muted-foreground hover:text-foreground", disabled && "cursor-not-allowed opacity-40 hover:text-muted-foreground"),
									children: [
										f === "starred" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-2.5 w-2.5 fill-current" }),
										t(`apikeys_model.filter_${f}`),
										f !== "all" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tabular-nums opacity-60",
											children: count
										})
									]
								}, f);
							})
						}), filter !== "all" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-2.5 pb-1.5 text-micro text-muted-foreground",
							children: t(`apikeys_model.filter_hint_${filter}`)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "max-h-56 overflow-y-auto p-1 scrollbar-jarvis",
						children: [
							visible.map((m) => {
								const link = modelProviderUrl(providerId, m.id);
								const isPinned = m.id === pinned;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("flex items-center rounded hover:bg-secondary", isPinned && "bg-primary/20"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => void save(m.id),
										className: "flex min-w-0 flex-1 items-center justify-between gap-2 px-2 py-1.5 text-left",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: cn("flex min-w-0 items-center gap-1.5 truncate text-xs", isPinned && "font-medium text-foreground-strong"),
											children: [
												m.starred && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
													"aria-label": t("apikeys_model.starred_label"),
													className: "h-3 w-3 shrink-0 fill-primary text-muted-foreground"
												}),
												m.label,
												recommendedModel && m.id === recommendedModel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "shrink-0 rounded-full bg-primary px-1.5 py-0.5 text-micro font-medium text-primary-foreground",
													children: t("apikeys_model.recommended_tag")
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "shrink-0 font-mono text-micro text-muted-foreground",
											children: m.id
										})]
									}), link && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => void openExternalUrl(link),
										"aria-label": t("apikeys_model.open_on_provider"),
										title: t("apikeys_model.open_on_provider"),
										className: "mr-1 shrink-0 rounded p-1 text-muted-foreground transition-colors hover:text-foreground-strong",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })
									})]
								}) }, m.id);
							}),
							trimmed && !exactMatch && !fixedCatalog && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"data-testid": "use-custom-row",
								onClick: () => void save(trimmed),
								className: "flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-secondary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3 shrink-0 text-muted-foreground" }), t("apikeys_model.use_custom").replace("{0}", trimmed)]
							}) }),
							!visible.length && !trimmed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "px-2 py-2 text-micro text-muted-foreground",
								children: loading ? t("apikeys_model.loading") : t("apikeys_model.no_models")
							})
						]
					}),
					matched.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-border px-2.5 py-1 text-micro text-muted-foreground",
						children: t("apikeys_model.count_hint").replace("{0}", String(matched.length))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					source === "static" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-micro text-foreground",
						title: t("apikeys_model.source_static_note"),
						children: t("apikeys_model.source_static")
					}),
					sourceNote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-micro text-muted-foreground",
						children: sourceNote
					}),
					probe && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProbeChip, { probe }),
					slowProbe && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-testid": "brain-model-probe-slow",
						className: "text-micro text-muted-foreground",
						children: t("apikeys_model.probe_slow_note")
					})
				]
			})
		]
	});
}
function ProbeChip({ probe }) {
	const t = useT();
	const tone = STATUS_TONE[probe.status];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-testid": "brain-model-probe",
		className: cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-micro", tone),
		title: [probe.detail, probe.latency_ms ? `${Math.round(probe.latency_ms)} ms` : ""].filter(Boolean).join("\n"),
		children: [probe.status === "ok" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }) : probe.integration_ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3 w-3" }), t(`apikeys_test.status_${probe.status}`)]
	});
}
function OpenRouterTtsControls({ providerId, recommendedModel, healthActive = false }) {
	const [model, setModel] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let alive = true;
		getBrainProviderModels(providerId).then((r) => {
			if (alive) setModel(r.current_model || "");
		}).catch(() => {});
		return () => {
			alive = false;
		};
	}, [providerId]);
	async function handleModelSave(m) {
		const res = await saveBrainProviderModel(providerId, m);
		setModel(res.model);
		return res;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainModelSelector, {
			providerId,
			recommendedModel,
			onSave: handleModelSave,
			healthSection: "tts",
			healthActive
		}), model && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoicePicker, {
			model,
			providerId,
			healthActive
		})]
	});
}
function languageChip(t, code) {
	switch (code) {
		case "de": return {
			flag: "🇩🇪",
			label: "DE"
		};
		case "en": return {
			flag: "🇬🇧",
			label: "EN"
		};
		case "es": return {
			flag: "🇪🇸",
			label: "ES"
		};
		case "fr": return {
			flag: "🇫🇷",
			label: "FR"
		};
		case "multi": return {
			flag: "🌐",
			label: t("apikeys_voice.multilingual")
		};
		default: return {
			flag: "",
			label: code.toUpperCase()
		};
	}
}
function LanguageChip({ code }) {
	const { flag, label } = languageChip(useT(), code);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex shrink-0 items-center gap-1 rounded-full border border-border bg-muted px-1.5 py-0.5 text-xs uppercase tracking-wide text-muted-foreground",
		children: [flag && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			children: flag
		}), label]
	});
}
function VoicePicker({ model, providerId, healthActive }) {
	const t = useT();
	const uiLang = useUiLanguage();
	const pushToast = useEventStore((s) => s.pushToast);
	const [voices, setVoices] = (0, import_react.useState)([]);
	const [pinned, setPinned] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [previewLang, setPreviewLang] = (0, import_react.useState)(uiLang === "de" ? "de" : uiLang === "es" ? "es" : "en");
	const [previewingId, setPreviewingId] = (0, import_react.useState)(null);
	const [loadingId, setLoadingId] = (0, import_react.useState)(null);
	const rootRef = (0, import_react.useRef)(null);
	const audioRef = (0, import_react.useRef)(null);
	const urlRef = (0, import_react.useRef)(null);
	function stopPreview() {
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current = null;
		}
		if (urlRef.current) {
			URL.revokeObjectURL(urlRef.current);
			urlRef.current = null;
		}
		setPreviewingId(null);
		setLoadingId(null);
	}
	(0, import_react.useEffect)(() => {
		let alive = true;
		setLoading(true);
		stopPreview();
		getTtsVoices(model).then((r) => {
			if (!alive) return;
			setVoices(r.voices);
			setPinned(r.current || r.default || "");
		}).catch((e) => {
			if (alive) pushToast("error", `${t("apikeys_voice.load_failed")}: ${e.message}`);
		}).finally(() => {
			if (alive) setLoading(false);
		});
		return () => {
			alive = false;
		};
	}, [model]);
	(0, import_react.useEffect)(() => stopPreview, []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		function onDown(e) {
			if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
		}
		document.addEventListener("mousedown", onDown);
		return () => document.removeEventListener("mousedown", onDown);
	}, [open]);
	async function preview(voiceId) {
		if (previewingId === voiceId || loadingId === voiceId) {
			stopPreview();
			return;
		}
		stopPreview();
		setLoadingId(voiceId);
		try {
			const blob = await fetchTtsPreview({
				model,
				voice: voiceId,
				language: previewLang
			});
			const url = URL.createObjectURL(blob);
			urlRef.current = url;
			const audio = new Audio(url);
			audioRef.current = audio;
			audio.onended = () => stopPreview();
			audio.onerror = () => stopPreview();
			setLoadingId(null);
			setPreviewingId(voiceId);
			await audio.play();
		} catch (e) {
			pushToast("error", `${t("apikeys_voice.preview_failed")}: ${e.message}`);
			stopPreview();
		}
	}
	async function save(voiceId) {
		setSaving(true);
		setOpen(false);
		if (healthActive) window.dispatchEvent(new CustomEvent("jarvis:provider-selection-pending", { detail: {
			section: "tts",
			provider: providerId
		} }));
		try {
			const res = await saveTtsVoice(voiceId);
			setPinned(voiceId);
			if (healthActive) window.dispatchEvent(new CustomEvent("jarvis:provider-config-changed", { detail: {
				section: "tts",
				provider: providerId
			} }));
			const note = res.restart_required ? ` ${t("apikeys_model.restart_note")}` : res.applied_live ? ` ${t("apikeys_model.live_note")}` : "";
			pushToast("success", `${t("apikeys_voice.saved")}${note}`);
		} catch (e) {
			if (healthActive) window.dispatchEvent(new CustomEvent("jarvis:provider-switch-failed", { detail: {
				section: "tts",
				provider: providerId
			} }));
			pushToast("error", e.message);
		} finally {
			setSaving(false);
		}
	}
	const pinnedEntry = voices.find((v) => v.id === pinned);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: rootRef,
		className: "space-y-1.5",
		onClick: (e) => e.stopPropagation(),
		onDoubleClick: (e) => e.stopPropagation(),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs uppercase tracking-wide text-muted-foreground",
					children: t("apikeys_voice.heading")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-flex items-center gap-1",
					role: "group",
					"aria-label": t("apikeys_voice.preview_language"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: t("apikeys_voice.preview_in")
					}), [
						"de",
						"en",
						"es"
					].map((lng) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setPreviewLang(lng),
						"aria-pressed": previewLang === lng,
						className: cn("rounded-full border px-1.5 py-0.5 text-xs uppercase tracking-wide transition-colors", previewLang === lng ? "border-primary/40 bg-primary/20 text-primary" : "border-border bg-muted text-muted-foreground hover:text-foreground"),
						children: lng
					}, lng))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-label": t("apikeys_voice.voice_label"),
					"aria-expanded": open,
					onClick: () => setOpen((o) => !o),
					disabled: saving,
					className: cn("flex min-w-0 flex-1 items-center justify-between gap-2 rounded-md border bg-background px-3 py-2 text-left transition-colors", open ? "border-primary/50 ring-1 ring-primary/20" : "border-input hover:border-primary/40"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex min-w-0 items-center gap-1.5",
						children: [pinnedEntry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageChip, { code: pinnedEntry.language }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("truncate text-xs", !pinned && "text-muted-foreground"),
							children: pinned || t("apikeys_voice.choose_voice")
						})]
					}), saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 shrink-0 animate-spin text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform", open && "rotate-180") })]
				}), pinned && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewButton, {
					active: previewingId === pinned,
					loading: loadingId === pinned,
					onClick: () => void preview(pinned),
					label: t("apikeys_voice.preview")
				})]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-md border border-border bg-popover",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "max-h-56 overflow-y-auto p-1 scrollbar-jarvis",
					children: [voices.map((v) => {
						const isPinned = v.id === pinned;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("flex items-center rounded hover:bg-primary/10", isPinned && "bg-primary/20"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewButton, {
								active: previewingId === v.id,
								loading: loadingId === v.id,
								onClick: () => void preview(v.id),
								label: t("apikeys_voice.preview"),
								className: "ml-1"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void save(v.id),
								className: "flex min-w-0 flex-1 items-center justify-between gap-2 px-2 py-1.5 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: cn("flex min-w-0 items-center gap-1.5 truncate text-xs", isPinned && "font-medium text-primary"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageChip, { code: v.language }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate font-mono",
										children: v.id
									})]
								}), isPinned && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3 shrink-0 text-primary" })]
							})]
						}) }, v.id);
					}), !voices.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "px-2 py-2 text-xs text-muted-foreground",
						children: loading ? t("apikeys_model.loading") : t("apikeys_voice.no_voices")
					})]
				}), voices.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border px-2.5 py-1 text-xs text-muted-foreground",
					children: t("apikeys_voice.count_hint").replace("{0}", String(voices.length))
				})]
			})
		]
	});
}
function PreviewButton({ active, loading, onClick, label, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		"aria-label": label,
		title: label,
		"aria-busy": loading || void 0,
		className: cn("shrink-0 rounded p-1 text-muted-foreground transition-colors hover:text-primary", (active || loading) && "text-primary", className),
		children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "h-3 w-3 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3 w-3" })
	});
}
var PROVIDER_DEFAULT = "";
function RealtimeOptionsControl({ providerId, healthActive = false }) {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const [models, setModels] = (0, import_react.useState)([]);
	const [voices, setVoices] = (0, import_react.useState)([]);
	const [model, setModel] = (0, import_react.useState)(PROVIDER_DEFAULT);
	const [voice, setVoice] = (0, import_react.useState)(PROVIDER_DEFAULT);
	const [previewAvailable, setPreviewAvailable] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [loadError, setLoadError] = (0, import_react.useState)(false);
	const [reloadNonce, setReloadNonce] = (0, import_react.useState)(0);
	const [savingField, setSavingField] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let alive = true;
		setLoading(true);
		setLoadError(false);
		getRealtimeOptions(providerId).then((r) => {
			if (!alive) return;
			setModels(Array.isArray(r?.models) ? r.models : []);
			setVoices(Array.isArray(r?.voices) ? r.voices : []);
			setModel(r?.current_model || PROVIDER_DEFAULT);
			setVoice(r?.current_voice || PROVIDER_DEFAULT);
			setPreviewAvailable(r?.preview_available === true);
		}).catch(() => {
			if (alive) setLoadError(true);
		}).finally(() => {
			if (alive) setLoading(false);
		});
		return () => {
			alive = false;
		};
	}, [providerId, reloadNonce]);
	(0, import_react.useEffect)(() => {
		const modelKey = `brain.providers.${providerId}.model`;
		const voiceKey = `brain.providers.${providerId}.voice`;
		function onConfigReloaded(event) {
			const detail = event.detail;
			const keys = Array.isArray(detail?.changed_keys) ? detail.changed_keys : [];
			if (keys.includes(modelKey) || keys.includes(voiceKey)) setReloadNonce((value) => value + 1);
		}
		function onRealtimeSwitched() {
			setReloadNonce((value) => value + 1);
		}
		window.addEventListener("jarvis:config-reloaded", onConfigReloaded);
		window.addEventListener("jarvis:realtime-switched", onRealtimeSwitched);
		return () => {
			window.removeEventListener("jarvis:config-reloaded", onConfigReloaded);
			window.removeEventListener("jarvis:realtime-switched", onRealtimeSwitched);
		};
	}, [providerId]);
	async function handleChange(field, next) {
		const prev = field === "model" ? model : voice;
		if (field === "model") setModel(next);
		else setVoice(next);
		setSavingField(field);
		if (healthActive) window.dispatchEvent(new CustomEvent("jarvis:provider-selection-pending", { detail: {
			section: "realtime",
			provider: providerId
		} }));
		try {
			await saveRealtimeOptions(providerId, field === "model" ? { model: next } : { voice: next });
			if (healthActive) window.dispatchEvent(new CustomEvent("jarvis:provider-config-changed", { detail: {
				section: "realtime",
				provider: providerId
			} }));
		} catch (e) {
			if (field === "model") setModel(prev);
			else setVoice(prev);
			if (healthActive) window.dispatchEvent(new CustomEvent("jarvis:provider-switch-failed", { detail: {
				section: "realtime",
				provider: providerId
			} }));
			pushToast("error", e.message);
		} finally {
			setSavingField(null);
		}
	}
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "status",
		"aria-live": "polite",
		className: "flex items-center gap-2 py-1 text-xs text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			className: "h-3.5 w-3.5 animate-spin",
			"aria-hidden": "true"
		}), t("apikeys_view.realtime_options_loading")]
	});
	if (loadError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "alert",
		className: "flex items-center justify-between gap-3 rounded-md border border-destructive/30 bg-destructive/10 px-2.5 py-2 text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex min-w-0 items-center gap-2 text-destructive",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
				className: "h-3.5 w-3.5 shrink-0",
				"aria-hidden": "true"
			}), t("apikeys_view.realtime_options_error")]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setReloadNonce((value) => value + 1),
			className: "shrink-0 rounded-md border border-destructive/30 px-2 py-1 font-medium text-destructive hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
			children: t("apikeys_view.realtime_options_retry")
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		onClick: (e) => e.stopPropagation(),
		onDoubleClick: (e) => e.stopPropagation(),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RealtimeModelRow, {
			label: t("apikeys_view.realtime_model_label"),
			value: model,
			options: models,
			saving: savingField === "model",
			onChange: (next) => void handleChange("model", next)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RealtimeVoiceRow, {
			providerId,
			label: t("apikeys_view.realtime_voice_label"),
			value: voice,
			model,
			options: voices,
			saving: savingField === "voice",
			previewAvailable,
			onChange: (next) => void handleChange("voice", next)
		})]
	});
}
function RealtimeModelRow({ label, value, options, saving, onChange }) {
	const t = useT();
	const [open, setOpen] = (0, import_react.useState)(false);
	const rootRef = (0, import_react.useRef)(null);
	const panelId = (0, import_react.useId)();
	const managed = options.length === 1 && options[0].id === "auto";
	const currentEntry = options.find((option) => option.id === value);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		function onPointerDown(event) {
			if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
		}
		function onKeyDown(event) {
			if (event.key === "Escape") setOpen(false);
		}
		document.addEventListener("mousedown", onPointerDown);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("mousedown", onPointerDown);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [open]);
	if (managed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "w-14 shrink-0 pt-1.5 text-xs uppercase tracking-wide text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"aria-label": label,
			className: "min-w-0 flex-1 rounded-control border border-border bg-background/40 px-2.5 py-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 flex-1 truncate font-medium",
					children: options[0].label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-[4px] border border-border px-1.5 text-micro font-semibold uppercase leading-[18px] tracking-[0.06em] text-muted-foreground",
					children: t("apikeys_view.realtime_model_managed")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-xs leading-snug text-muted-foreground",
				children: t("apikeys_view.realtime_model_managed_hint")
			})]
		})]
	});
	function pick(next) {
		setOpen(false);
		if (next !== value) onChange(next);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: rootRef,
		className: "relative flex items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-14 shrink-0 text-xs uppercase tracking-wide text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"aria-label": label,
				"aria-expanded": open,
				"aria-controls": panelId,
				disabled: saving,
				onClick: () => setOpen((current) => !current),
				className: cn("flex min-w-0 flex-1 items-center justify-between gap-2 rounded-md border bg-background px-2.5 py-1.5 text-left text-xs disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", open ? "border-primary/50 ring-1 ring-primary/20" : "border-input hover:border-primary/40"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("truncate", !value && "text-muted-foreground"),
					children: value ? currentEntry?.label || value : t("apikeys_view.realtime_provider_default")
				}), saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					className: "h-3 w-3 shrink-0 animate-spin",
					"aria-hidden": "true"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					className: cn("h-3 w-3 shrink-0 text-muted-foreground transition-transform", open && "rotate-180"),
					"aria-hidden": "true"
				})]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				id: panelId,
				className: "absolute left-16 right-0 top-full z-30 mt-1 max-h-56 overflow-y-auto rounded-md border border-border bg-popover p-1 scrollbar-jarvis",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelOption, {
					label: t("apikeys_view.realtime_provider_default"),
					selected: !value,
					onClick: () => pick(PROVIDER_DEFAULT)
				}), options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelOption, {
					label: option.label,
					selected: option.id === value,
					onClick: () => pick(option.id)
				}, option.id))]
			})
		]
	});
}
function ModelOption({ label, selected, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("flex w-full items-center justify-between gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary", selected && "bg-primary/20 font-medium text-primary"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: label
		}), selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
			className: "h-3 w-3 shrink-0",
			"aria-hidden": "true"
		})]
	}) });
}
function RealtimeVoiceRow({ providerId, label, value, model, options, saving, previewAvailable, onChange }) {
	const t = useT();
	const uiLang = useUiLanguage();
	const pushToast = useEventStore((s) => s.pushToast);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [previewLang, setPreviewLang] = (0, import_react.useState)(uiLang === "de" ? "de" : uiLang === "es" ? "es" : "en");
	const [previewingId, setPreviewingId] = (0, import_react.useState)(null);
	const [loadingId, setLoadingId] = (0, import_react.useState)(null);
	const rootRef = (0, import_react.useRef)(null);
	const panelId = (0, import_react.useId)();
	const audioRef = (0, import_react.useRef)(null);
	const urlRef = (0, import_react.useRef)(null);
	const previewGenerationRef = (0, import_react.useRef)(0);
	function stopPreview() {
		previewGenerationRef.current += 1;
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current = null;
		}
		if (urlRef.current) {
			URL.revokeObjectURL(urlRef.current);
			urlRef.current = null;
		}
		setPreviewingId(null);
		setLoadingId(null);
	}
	(0, import_react.useEffect)(() => stopPreview, []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		function onDown(e) {
			if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
		}
		function onKeyDown(e) {
			if (e.key === "Escape") setOpen(false);
		}
		document.addEventListener("mousedown", onDown);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("mousedown", onDown);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [open]);
	async function preview(voiceId) {
		if (previewingId === voiceId || loadingId === voiceId) {
			stopPreview();
			return;
		}
		stopPreview();
		const generation = previewGenerationRef.current;
		setLoadingId(voiceId);
		try {
			const blob = await fetchRealtimeVoicePreview({
				providerId,
				voice: voiceId,
				language: previewLang,
				model
			});
			if (previewGenerationRef.current !== generation) return;
			const url = URL.createObjectURL(blob);
			urlRef.current = url;
			const audio = new Audio(url);
			audioRef.current = audio;
			audio.onended = () => {
				if (previewGenerationRef.current === generation) stopPreview();
			};
			audio.onerror = () => {
				if (previewGenerationRef.current === generation) stopPreview();
			};
			setLoadingId(null);
			setPreviewingId(voiceId);
			await audio.play();
		} catch (e) {
			if (previewGenerationRef.current !== generation) return;
			pushToast("error", `${t("apikeys_voice.preview_failed")}: ${e.message}`);
			stopPreview();
		}
	}
	function pick(next) {
		setOpen(false);
		if (next !== value) onChange(next);
	}
	const currentEntry = options.find((o) => o.id === value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: rootRef,
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-14 shrink-0 text-xs uppercase tracking-wide text-muted-foreground",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-label": label,
					"aria-expanded": open,
					"aria-controls": panelId,
					disabled: saving,
					onClick: () => setOpen((o) => !o),
					className: cn("flex min-w-0 flex-1 items-center justify-between gap-2 rounded-md border bg-background px-2 py-1 text-left text-xs transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", open ? "border-primary/50 ring-1 ring-primary/20" : "border-input hover:border-primary/40"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("truncate", !value && "text-muted-foreground"),
						children: value ? currentEntry?.label || value : t("apikeys_view.realtime_provider_default")
					}), saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 shrink-0 animate-spin text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("h-3 w-3 shrink-0 text-muted-foreground transition-transform", open && "rotate-180") })]
				}),
				previewAvailable && value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewButton, {
					active: previewingId === value,
					loading: loadingId === value,
					onClick: () => void preview(value),
					label: t("apikeys_voice.preview")
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			id: panelId,
			className: "overflow-hidden rounded-md border border-border bg-popover",
			children: [
				previewAvailable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-end gap-1 border-b border-border px-2.5 py-1",
					role: "group",
					"aria-label": t("apikeys_voice.preview_language"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: t("apikeys_voice.preview_in")
					}), [
						"de",
						"en",
						"es"
					].map((lng) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setPreviewLang(lng),
						"aria-pressed": previewLang === lng,
						className: cn("rounded-full border px-1.5 py-0.5 text-xs uppercase tracking-wide transition-colors", previewLang === lng ? "border-primary/40 bg-primary/20 text-primary" : "border-border bg-muted text-muted-foreground hover:text-foreground"),
						children: lng
					}, lng))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "max-h-56 overflow-y-auto p-1 scrollbar-jarvis",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("flex items-center rounded hover:bg-primary/10", !value && "bg-primary/20"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => pick(PROVIDER_DEFAULT),
							className: "flex min-w-0 flex-1 items-center justify-between gap-2 px-2 py-1.5 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("truncate text-xs", !value && "font-medium text-primary"),
								children: t("apikeys_view.realtime_provider_default")
							}), !value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3 shrink-0 text-primary" })]
						})
					}) }), options.map((v) => {
						const isPinned = v.id === value;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("flex items-center rounded hover:bg-primary/10", isPinned && "bg-primary/20"),
							children: [previewAvailable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewButton, {
								active: previewingId === v.id,
								loading: loadingId === v.id,
								onClick: () => void preview(v.id),
								label: t("apikeys_voice.preview"),
								className: "ml-1"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => pick(v.id),
								className: "flex min-w-0 flex-1 items-center justify-between gap-2 px-2 py-1.5 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("truncate text-xs", isPinned && "font-medium text-primary"),
									children: v.label
								}), isPinned && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3 shrink-0 text-primary" })]
							})]
						}) }, v.id);
					})]
				}),
				options.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border px-2.5 py-1 text-xs text-muted-foreground",
					children: t("apikeys_voice.count_hint").replace("{0}", String(options.length))
				})
			]
		})]
	});
}
const LOCAL_VOICE_SETUP_STAGES = [
	"uv",
	"python",
	"packages",
	"engine",
	"models",
	"voice",
	"llm",
	"selftest"
];
var BASE = "/api/providers/local-voice";
async function readJson(res) {
	const body = await res.json().catch(() => ({}));
	if (!res.ok) throw new Error(body.detail ?? `HTTP ${res.status}`);
	return body;
}
async function fetchLocalVoiceStatus() {
	return readJson(await fetch(`${BASE}/status`));
}
async function startLocalVoiceSetup() {
	return readJson(await fetch(`${BASE}/setup`, { method: "POST" }));
}
async function runLocalVoiceSelftest() {
	return readJson(await fetch(`${BASE}/selftest`, { method: "POST" }));
}
async function saveLocalVoiceSettings(change) {
	return readJson(await fetch(`${BASE}/settings`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(change)
	}));
}
function localVoiceIsBusy(status) {
	if (!status) return false;
	return status.setup.running || status.selftest_running || status.phase === "installing" || status.phase === "starting";
}
function formatSeconds(value, locale) {
	return value.toLocaleString(locale, { maximumFractionDigits: 2 });
}
function latencyFigure(latency, locale) {
	const { low_s: low, high_s: high } = latency;
	if (low === null || high === null) return null;
	if (low === high) return formatSeconds(low, locale);
	return `${formatSeconds(low, locale)}–${formatSeconds(high, locale)}`;
}
function stageKey(stage) {
	if (LOCAL_VOICE_SETUP_STAGES.includes(stage)) return stage;
	if (stage === "process") return "process";
	if (stage.startsWith("tts")) return "voice";
	if (stage === "start" || stage === "vad" || stage === "turn" || stage === "stt") return "speech";
	return "";
}
function percentOf(progress) {
	if (!Number.isFinite(progress)) return 0;
	return Math.max(0, Math.min(100, Math.round(progress * 100)));
}
var BUSY_POLL_MS = 2500;
var IDLE_POLL_MS = 2e4;
var AUTO_MODEL = "__auto__";
function LocalVoicePanel({ onChanged }) {
	const t = useT();
	const locale = useUiLanguage();
	const [status, setStatus] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const busy = localVoiceIsBusy(status);
	const wasBusy = (0, import_react.useRef)(false);
	const accept = (0, import_react.useCallback)((next) => {
		const nowBusy = localVoiceIsBusy(next);
		const finished = wasBusy.current && !nowBusy;
		wasBusy.current = nowBusy;
		setStatus(next);
		if (finished) onChanged();
	}, [onChanged]);
	const refresh = (0, import_react.useCallback)(async () => {
		try {
			accept(await fetchLocalVoiceStatus());
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		}
	}, [accept]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const tick = async () => {
			if (!cancelled) await refresh();
		};
		tick();
		const timer = window.setInterval(tick, busy ? BUSY_POLL_MS : IDLE_POLL_MS);
		return () => {
			cancelled = true;
			window.clearInterval(timer);
		};
	}, [busy, refresh]);
	const act = async (action) => {
		setError(null);
		try {
			accept(await action());
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		}
	};
	const save = async (change) => {
		setSaving(true);
		await act(() => saveLocalVoiceSettings(change));
		setSaving(false);
		onChanged();
	};
	const modelOptions = (0, import_react.useMemo)(() => {
		if (!status) return [];
		const auto = {
			value: AUTO_MODEL,
			label: t("apikeys_view.local_voice_llm_auto"),
			hint: status.llm_source === "config" ? void 0 : status.llm_model
		};
		const names = new Set(status.llm_choices);
		if (status.llm_source === "config") names.add(status.llm_model);
		return [auto, ...[...names].sort().map((name) => ({
			value: name,
			label: name
		}))];
	}, [status, t]);
	const voiceOptions = (0, import_react.useMemo)(() => (status?.voices ?? []).map((voice) => ({
		value: voice,
		label: t(`apikeys_view.local_voice_voice_${voice}`)
	})), [status?.voices, t]);
	if (!status) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-t border-border pt-3 text-xs text-muted-foreground",
		"data-testid": "local-voice-panel",
		children: error ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			className: "h-3.5 w-3.5 animate-spin",
			"aria-label": t("apikeys_view.local_voice_loading")
		})
	});
	const phaseLabel = t(`apikeys_view.local_voice_phase_${status.phase}`);
	const moving = status.phase === "installing" || status.phase === "starting";
	const stage = stageKey(status.stage);
	const stageLabel = stage ? t(`apikeys_view.local_voice_stage_${stage}`) : "";
	const showSetup = status.supported && !status.setup.running && (!status.installed || Boolean(status.setup.error));
	const figure = latencyFigure(status.expected_latency, locale);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 border-t border-border pt-3 text-xs",
		"data-testid": "local-voice-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2",
				"data-testid": "local-voice-phase",
				"data-phase": status.phase,
				children: [status.phase === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" }) : moving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 animate-spin text-muted-foreground" }) : status.phase === "failed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 space-y-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-foreground",
						children: phaseLabel
					}), status.reason && status.phase !== "installing" && (status.phase !== "not_installed" || !status.supported) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: status.reason
					})]
				})]
			}),
			moving && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				"data-testid": "local-voice-progress",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-2 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: stageLabel || status.reason
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [percentOf(status.progress), " %"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						role: "progressbar",
						"aria-label": phaseLabel,
						"aria-valuenow": percentOf(status.progress),
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						className: "h-1.5 w-full overflow-hidden rounded-full bg-foreground/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-foreground/70 transition-all duration-500 motion-reduce:transition-none",
							style: { width: `${Math.max(2, percentOf(status.progress))}%` }
						})
					}),
					status.phase === "installing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: t("apikeys_view.local_voice_setup_hint")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted-foreground",
						children: t("apikeys_view.local_voice_machine_label")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "text-foreground",
						"data-testid": "local-voice-machine",
						children: t(`apikeys_view.local_voice_machine_${status.machine_class}`)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted-foreground",
						children: t("apikeys_view.local_voice_latency_label")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "text-foreground",
						"data-testid": "local-voice-latency",
						children: figure === null ? t("apikeys_view.local_voice_latency_selftest") : `${figure} s · ${t(`apikeys_view.local_voice_basis_${status.expected_latency.basis}`)}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted-foreground",
						children: t("apikeys_view.local_voice_llm_label")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedSelect, {
							value: status.llm_source === "config" ? status.llm_model : AUTO_MODEL,
							options: modelOptions,
							onValueChange: (value) => void save({ llm_model: value === AUTO_MODEL ? "" : value }),
							ariaLabel: t("apikeys_view.local_voice_llm_label"),
							disabled: saving || status.setup.running,
							testId: "local-voice-llm"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted-foreground",
						children: t("apikeys_view.local_voice_voice_label")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedSelect, {
							value: status.voice,
							options: voiceOptions,
							onValueChange: (value) => void save({ voice: value }),
							ariaLabel: t("apikeys_view.local_voice_voice_label"),
							disabled: saving || status.setup.running,
							testId: "local-voice-voice"
						})
					})
				]
			}),
			status.llm_error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: status.llm_error
			}) : status.llm_installed === false && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				"data-testid": "local-voice-llm-missing",
				children: t("apikeys_view.local_voice_llm_missing")
			}),
			!status.os_verified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2 text-muted-foreground",
				"data-testid": "local-voice-unverified",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("apikeys_view.local_voice_unverified") })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelftestSummary, {
				selftest: status.selftest,
				running: status.selftest_running
			}),
			status.setup.warnings.map((warning) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: warning
			}, warning)),
			status.setup.error && status.phase !== "failed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-destructive",
				children: status.setup.error
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-destructive",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [showSetup && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "secondary",
					className: "gap-2",
					onClick: () => void act(startLocalVoiceSetup),
					"data-testid": "local-voice-setup",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), status.setup.error ? t("apikeys_view.local_voice_setup_retry") : t("apikeys_view.local_voice_setup_cta")]
				}), status.installed && !status.setup.running && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "secondary",
					className: "gap-2",
					onClick: () => void act(runLocalVoiceSelftest),
					disabled: status.selftest_running,
					"data-testid": "local-voice-selftest",
					children: [status.selftest_running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3.5 w-3.5" }), status.selftest_running ? t("apikeys_view.local_voice_selftest_running") : t("apikeys_view.local_voice_selftest_cta")]
				})]
			})
		]
	});
}
function SelftestSummary({ selftest, running }) {
	const t = useT();
	if (running) return null;
	if (!selftest) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: t("apikeys_view.local_voice_selftest_none")
	});
	const languages = Object.entries(selftest.languages);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		"data-testid": "local-voice-selftest-result",
		"data-ok": selftest.ok,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("font-medium", selftest.ok ? "text-foreground" : "text-destructive"),
				children: selftest.ok ? t("apikeys_view.local_voice_selftest_passed") : t("apikeys_view.local_voice_selftest_failed")
			}),
			selftest.reason && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: selftest.reason
			}),
			languages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-0.5 text-muted-foreground",
				children: languages.map(([language, result]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "tabular-nums",
					children: [
						language.toUpperCase(),
						" · ",
						result.voice ?? "?",
						" ·",
						" ",
						t("apikeys_view.local_voice_selftest_voice_ms").replace("{0}", String(result.synth_ms ?? "?")),
						" ",
						"· ",
						t("apikeys_view.local_voice_selftest_stt_ms").replace("{0}", String(result.stt_ms ?? "?"))
					]
				}, language))
			}),
			selftest.llm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "tabular-nums text-muted-foreground",
				children: [t("apikeys_view.local_voice_selftest_llm_ms").replace("{0}", String(selftest.llm.ms ?? "?")), selftest.llm.error ? ` · ${selftest.llm.error}` : ""]
			}),
			selftest.stale && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				"data-testid": "local-voice-selftest-stale",
				children: t("apikeys_view.local_voice_selftest_stale")
			})
		]
	});
}
var CONTROL_SELECTOR = "input, label, button, a, select, textarea, summary, [data-agent-card-control]";
function isRowControlTarget(target) {
	return Boolean(target && target.closest?.(CONTROL_SELECTOR));
}
function useRowGestures({ expanded, onToggle, onActivate }) {
	const select = (0, import_react.useCallback)(() => {
		if (!expanded) {
			onToggle?.();
			onActivate?.();
			return;
		}
		if (onActivate) {
			onActivate();
			return;
		}
		onToggle?.();
	}, [
		expanded,
		onToggle,
		onActivate
	]);
	return {
		onClick: (0, import_react.useCallback)((e) => {
			if (isRowControlTarget(e.target)) return;
			if (e.detail >= 2) return;
			select();
		}, [select]),
		select
	};
}
const useProviderTestStore = create((set) => ({
	results: {},
	record: (providerId, result) => set((s) => ({ results: {
		...s.results,
		[providerId]: result
	} })),
	forget: (providerId) => set((s) => {
		if (!(providerId in s.results)) return s;
		const next = { ...s.results };
		delete next[providerId];
		return { results: next };
	})
}));
function verificationOf(result) {
	if (!result) return null;
	if (result.status === "ok") return "ok";
	if (result.status === "not_configured") return null;
	return "failed";
}
function consentKey(providerId) {
	return `jarvis.experimentalConsent.${providerId}`;
}
function hasExperimentalConsent(providerId) {
	try {
		return window.localStorage.getItem(consentKey(providerId)) === "1";
	} catch {
		return false;
	}
}
function rememberExperimentalConsent(providerId) {
	try {
		window.localStorage.setItem(consentKey(providerId), "1");
	} catch {}
}
const LOCAL_MODE_KEY = "jarvis.providers.localMode";
function parseLocalMode(raw) {
	return raw === "1" ? true : raw === "0" ? false : null;
}
function readLocalMode() {
	try {
		return parseLocalMode(window.localStorage.getItem("jarvis.providers.localMode")) ?? false;
	} catch {
		return false;
	}
}
function writeLocalMode(value) {
	try {
		window.localStorage.setItem(LOCAL_MODE_KEY, value ? "1" : "0");
	} catch {}
}
function runsOnOwnHardware(provider) {
	return provider.billing === "local";
}
function filterForLocalMode(items, enabled, isActive = (item) => item.active === true) {
	if (!enabled) return {
		visible: items,
		hiddenCount: 0,
		keptActiveHosted: false
	};
	const visible = items.filter((p) => runsOnOwnHardware(p) || isActive(p));
	return {
		visible,
		hiddenCount: items.length - visible.length,
		keptActiveHosted: visible.some((p) => isActive(p) && !runsOnOwnHardware(p))
	};
}
create((set) => ({
	enabled: readLocalMode(),
	setEnabled: (value) => {
		writeLocalMode(value);
		set({ enabled: value });
	}
}));
function makeProviderCategories(t) {
	return {
		brain: {
			tab: t("apikeys_view.tab_brain"),
			title: t("apikeys_view.tier_brain"),
			description: t("apikeys_view.cat_brain_desc"),
			icon: Brain
		},
		tts: {
			tab: t("apikeys_view.tab_tts"),
			title: t("apikeys_view.tier_tts"),
			description: t("apikeys_view.cat_tts_desc"),
			icon: Volume2
		},
		stt: {
			tab: t("apikeys_view.tab_stt"),
			title: t("apikeys_view.tier_stt"),
			description: t("apikeys_view.cat_stt_desc"),
			icon: Mic
		},
		realtime: {
			tab: t("apikeys_view.tab_realtime"),
			title: t("apikeys_view.tier_realtime"),
			description: t("apikeys_view.cat_realtime_desc"),
			icon: Radio
		},
		"computer-use": {
			tab: t("apikeys_view.tab_computer_use"),
			title: t("apikeys_view.tier_computer_use"),
			description: t("apikeys_view.cat_computer_use_desc"),
			icon: Terminal
		},
		dictation: {
			tab: t("apikeys_view.tab_dictation"),
			title: t("apikeys_view.tier_dictation"),
			description: t("apikeys_view.cat_dictation_desc"),
			icon: WandSparkles
		}
	};
}
function useTierHealth(providers) {
	const { health: rawHealth } = useSectionHealth();
	return (0, import_react.useMemo)(() => {
		const visible = { ...rawHealth };
		const activeSubjects = {
			brain: providers.find((provider) => provider.tier === "brain" && provider.active)?.id,
			tts: providers.find((provider) => provider.tier === "tts" && provider.active)?.id,
			stt: providers.find((provider) => provider.tier === "stt" && provider.active)?.id,
			realtime: providers.find((provider) => provider.tier === "realtime" && provider.active)?.id,
			"computer-use": providers.find((provider) => provider.tier === "brain" && provider.computer_use_active)?.id
		};
		for (const [section, subjectId] of Object.entries(activeSubjects)) {
			const matching = sectionHealthForSubject(rawHealth[section], subjectId);
			if (matching) visible[section] = matching;
			else delete visible[section];
		}
		return visible;
	}, [providers, rawHealth]);
}
function LocalModeNotice({ hiddenCount, keptActiveHosted, onDisable }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": "local-mode-notice",
		"data-hidden-count": hiddenCount,
		className: "mb-3 flex items-start gap-2.5 rounded-surface border border-border bg-card px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, {
			"aria-hidden": "true",
			className: "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "min-w-0 text-xs leading-relaxed text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-foreground",
					children: t("apikeys_view.local_mode_label")
				}),
				" ",
				"· ",
				t("apikeys_view.local_mode_notice").replace("{0}", String(hiddenCount)),
				keptActiveHosted && ` ${t("apikeys_view.local_mode_notice_active")}`,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onDisable,
					className: "font-medium text-foreground-strong underline-offset-2 hover:underline",
					children: t("apikeys_view.local_mode_show_all")
				})
			]
		})]
	});
}
function CategoryHero({ icon: Icon, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 flex min-w-0 items-center gap-2 pt-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				"aria-hidden": "true",
				className: "h-4 w-4 shrink-0 text-muted-foreground"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "shrink-0 font-display text-sm font-semibold tracking-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: "text-border",
				children: "·"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "min-w-0 truncate text-xs text-muted-foreground",
				title: description,
				children: description
			})
		]
	});
}
function ProviderCategory({ meta, tier, providers, loading, error, onChanged, onActivateOptimistic, health, intro, localMode = false, onDisableLocalMode, wideGrid = false }) {
	const t = useT();
	const { visible: tierProviders, hiddenCount, keptActiveHosted } = filterForLocalMode(providers.filter((p) => p.tier === tier && p.brain_switchable !== false), localMode);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "tabpanel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryHero, {
				icon: meta.icon,
				title: meta.title,
				description: meta.description
			}),
			localMode && hiddenCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalModeNotice, {
				hiddenCount,
				keptActiveHosted,
				onDisable: () => onDisableLocalMode?.()
			}),
			intro,
			loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
					" ",
					t("apikeys_view.loading_providers")
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2 rounded-md bg-secondary p-4 text-sm text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [error === "backend_unreachable" ? t("apikeys_view.backend_unavailable") : `${t("apikeys_view.load_error")} (${error}).`, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => onChanged(),
					className: "ml-2 underline",
					children: t("apikeys_view.retry")
				})] })]
			}),
			!loading && !error && tierProviders.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: t("apikeys_view.no_providers_in_tier")
			}),
			!loading && !error && tierProviders.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TierSection, {
				providers: tierProviders,
				onChanged,
				onActivateOptimistic,
				health,
				wideGrid
			})
		]
	});
}
function TierSection({ providers, onChanged, onActivateOptimistic, health, wideGrid = false }) {
	const tierHasActive = providers.some((p) => p.active);
	const [leadId] = (0, import_react.useState)(() => providers.find((p) => p.active)?.id ?? null);
	const rank = (p) => p.id === leadId ? 2 : Number(p.configured || p.active);
	const sorted = [...providers].sort((a, b) => rank(b) - rank(a));
	const [expandedId, setExpandedId] = (0, import_react.useState)(() => leadId ?? sorted[0]?.id ?? null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		"data-testid": "provider-list",
		className: cn(wideGrid ? "grid items-start gap-3" : "divide-y divide-border/70 overflow-hidden rounded-surface border border-border bg-card"),
		style: wideGrid ? { gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 34rem), 1fr))" } : void 0,
		children: sorted.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: wideGrid ? "min-w-0 overflow-hidden rounded-surface border border-border bg-card" : void 0,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderCard, {
				descriptor: p,
				onChanged,
				onActivateOptimistic,
				autoActivateOnSave: !tierHasActive,
				health: p.active ? sectionHealthForSubject(health, p.id) : void 0,
				expanded: expandedId === p.id,
				onToggleExpanded: () => setExpandedId((current) => current === p.id ? null : p.id)
			})
		}, p.id))
	});
}
function ProviderCard({ descriptor, onChanged, onActivateOptimistic, autoActivateOnSave, health, expanded = true, onToggleExpanded, configuration, hideCredentialControls = false, billingOverride, billingPending = false }) {
	const t = useT();
	const [activating, setActivating] = (0, import_react.useState)(false);
	const [consentPending, setConsentPending] = (0, import_react.useState)(false);
	const pushToast = useEventStore((s) => s.pushToast);
	const assistantName = useEventStore((s) => s.assistantName);
	const recordVerdict = useProviderTestStore((s) => s.record);
	const cardError = descriptor.active && health?.status === "error";
	const cardErrorDetail = health?.detail?.trim() || "";
	const isCodexAuth = descriptor.auth_mode === "codex";
	const isCodexBrain = isCodexAuth && descriptor.tier === "brain";
	const isSubscriptionLoginOnly = isCodexAuth && descriptor.billing === "subscription" && descriptor.secret_keys.length === 0;
	const isBrainSwitchable = descriptor.tier !== "brain" || descriptor.brain_switchable !== false;
	async function verifyPolishProvider() {
		let result;
		try {
			result = await testProvider(descriptor.id);
		} catch (e) {
			console.debug("polish provider verification failed to run", e);
			return;
		}
		recordVerdict(descriptor.id, result);
		if (result.status === "ok") return;
		pushToast("warning", t("apikeys_view.polish_verify_failed").replace("{0}", descriptor.label).replace("{1}", result.detail || result.status));
		onChanged();
	}
	function switchToast(key, restartRequired = false) {
		const line = t(key).replace("{0}", descriptor.label);
		return restartRequired ? `${line}${t("apikeys_view.switch_note_next_start")}` : line;
	}
	async function activate(assumeConfigured = false) {
		if (descriptor.configuration_surface === "live") return;
		if (descriptor.active) return;
		if (!isBrainSwitchable) {
			pushToast("warning", t("apikeys_view.agents_only_toast").replace("{0}", descriptor.label).replace("{1}", agentsBrand(assistantName)));
			return;
		}
		if (isCodexBrain && !descriptor.codex_brain_ready) {
			pushToast("warning", t("apikeys_codex.brain_needs_openai_key"));
			return;
		}
		if (!assumeConfigured && !descriptor.configured && descriptor.codex_status?.reason_code !== "plan_unsupported") {
			const codexReason = descriptor.codex_status?.reason_code;
			if (codexReason === "busy" || codexReason === "login_in_progress") {
				pushToast("info", t(CODEX_STATUS_KEY_BY_REASON[codexReason]));
				return;
			}
			pushToast("warning", descriptor.auth_mode === "codex" ? isSubscriptionLoginOnly ? t(codexReason && CODEX_STATUS_KEY_BY_REASON[codexReason] || "apikeys_codex.subscription_login_required") : t("apikeys_codex.needs_codex_full").replace("{0}", descriptor.label) : descriptor.auth_mode === "antigravity" ? t("apikeys_antigravity.needs_login_full").replace("{0}", descriptor.label) : t("apikeys_codex.needs_key_full").replace("{0}", descriptor.label));
			return;
		}
		if (![
			"brain",
			"tts",
			"stt",
			"computer-use",
			"dictation"
		].includes(descriptor.tier) && descriptor.experimental && !hasExperimentalConsent(descriptor.id)) {
			setConsentPending(true);
			return;
		}
		onActivateOptimistic(descriptor.tier, descriptor.id);
		setActivating(true);
		try {
			if (descriptor.tier === "brain") {
				await switchBrainProvider(descriptor.id);
				pushToast("success", switchToast("apikeys_view.switch_done_brain"));
				window.dispatchEvent(new CustomEvent("jarvis:brain-switched"));
			} else if (descriptor.tier === "tts") {
				pushToast("success", switchToast("apikeys_view.switch_done_tts", (await switchTtsProvider(descriptor.id)).restart_required));
				window.dispatchEvent(new CustomEvent("jarvis:tts-switched"));
			} else if (descriptor.tier === "stt") {
				pushToast("success", switchToast("apikeys_view.switch_done_stt", (await switchSttProvider(descriptor.id)).restart_required));
				window.dispatchEvent(new CustomEvent("jarvis:stt-switched"));
			} else if (descriptor.tier === "computer-use") {
				await switchComputerUseProvider(descriptor.id);
				pushToast("success", switchToast("apikeys_view.switch_done_computer_use"));
				window.dispatchEvent(new CustomEvent("jarvis:computer-use-switched"));
			} else if (descriptor.tier === "dictation") {
				await switchDictationPolishProvider(descriptor.polish_family || descriptor.id);
				pushToast("success", switchToast("apikeys_view.switch_done_dictation"));
				window.dispatchEvent(new CustomEvent("jarvis:dictation-polish-switched"));
				verifyPolishProvider();
			} else {
				requestRealtimeTransportOffer();
				pushToast("success", switchToast("apikeys_view.switch_done_realtime", (await switchRealtimeProvider(descriptor.id, descriptor.experimental === true)).restart_required));
				window.dispatchEvent(new CustomEvent("jarvis:realtime-switched"));
			}
			onChanged();
		} catch (e) {
			pushToast("error", e.message);
			onChanged();
			window.dispatchEvent(new CustomEvent("jarvis:provider-switch-failed", { detail: {
				section: descriptor.tier,
				provider: descriptor.id
			} }));
		} finally {
			setActivating(false);
		}
	}
	const rowGestures = useRowGestures({
		expanded,
		onToggle: onToggleExpanded,
		onActivate: isBrainSwitchable && !isCodexBrain && !descriptor.active && descriptor.configured && !activating ? () => void activate() : void 0
	});
	async function handleSavedActivate() {
		if (!autoActivateOnSave) return;
		if (descriptor.active) return;
		await activate(true);
	}
	const consentDialog = consentPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-scrim/60 p-4",
		onClick: (event) => {
			event.stopPropagation();
			setConsentPending(false);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card-outline max-w-lg space-y-4 bg-background p-5",
			onClick: (event) => event.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-semibold",
					children: descriptor.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted-foreground",
					children: t(isSubscriptionLoginOnly ? "apikeys_view.experimental_subscription_consent" : "apikeys_view.experimental_consent")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-outline px-3 py-1.5 text-sm",
						onClick: (event) => {
							event.stopPropagation();
							setConsentPending(false);
						},
						children: t("common.cancel")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn-primary px-3 py-1.5 text-sm",
						onClick: (event) => {
							event.stopPropagation();
							rememberExperimentalConsent(descriptor.id);
							setConsentPending(false);
							activate();
						},
						children: t("common.yes")
					})]
				})
			]
		})
	}) : null;
	const summary = t(`provider_billing.${billingOverride ?? descriptor.billing}`);
	const collapsible = Boolean(onToggleExpanded);
	const rowTitle = descriptor.active && !descriptor.configured ? t("apikeys_view.needs_credentials") : descriptor.active ? t("apikeys_view.active_tooltip") : !isBrainSwitchable ? t("apikeys_view.agents_only_short").replace("{0}", agentsBrand(assistantName)) : descriptor.configured ? t("apikeys_view.click_to_activate") : descriptor.auth_mode === "codex" ? t("apikeys_view.needs_codex") : descriptor.auth_mode === "antigravity" ? t("apikeys_view.needs_login") : t("apikeys_view.needs_key");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [consentDialog, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": `provider-card-${descriptor.id}`,
		"data-expanded": expanded ? "true" : "false",
		className: cn("relative transition-colors", cardError ? "bg-destructive/[0.04] before:absolute before:inset-y-2 before:left-0 before:w-[3px] before:rounded-r before:bg-destructive" : descriptor.active ? "bg-primary/[0.035] before:absolute before:inset-y-2 before:left-0 before:w-[3px] before:rounded-r before:bg-foreground/70" : ""),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: collapsible ? "button" : void 0,
			tabIndex: collapsible ? 0 : void 0,
			"aria-expanded": collapsible ? expanded : void 0,
			"aria-controls": collapsible ? `provider-body-${descriptor.id}` : void 0,
			"data-testid": `provider-row-${descriptor.id}`,
			onClick: rowGestures.onClick,
			onKeyDown: (e) => {
				if (!collapsible) return;
				if (e.target !== e.currentTarget) return;
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					rowGestures.select();
				}
			},
			title: rowTitle,
			className: cn("flex items-center gap-3 px-3.5 py-3 outline-none", collapsible && "cursor-pointer hover:bg-secondary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring", !isBrainSwitchable && "opacity-80"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderLogo, {
					providerId: descriptor.id,
					label: descriptor.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate font-display text-sm font-semibold tracking-tight",
								children: descriptor.label
							}),
							!descriptor.active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { descriptor }),
							descriptor.recommended && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
								tone: "accent",
								title: descriptor.recommended_model ? t("apikeys_view.recommended_tooltip").replace("{0}", descriptor.recommended_model) : void 0,
								children: t("apikeys_view.recommended")
							}),
							descriptor.experimental && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
								tone: "neutral",
								"data-testid": `provider-experimental-${descriptor.id}`,
								title: t("apikeys_view.experimental_note"),
								children: t("apikeys_view.experimental")
							}),
							descriptor.caution && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
								tone: "warn",
								title: descriptor.caution,
								children: t("apikeys_view.not_recommended")
							}),
							descriptor.optional && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
								tone: "neutral",
								"data-testid": `provider-optional-${descriptor.id}`,
								title: t("apikeys_view.optional_tooltip"),
								children: t("apikeys_view.optional")
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 truncate text-xs text-muted-foreground",
						children: [
							summary,
							billingPending ? ` · ${t("live.billing_pending")}` : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: ` · ${descriptor.id}`
							})
						]
					})]
				}),
				descriptor.configuration_surface !== "live" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActiveControl, {
					descriptor: isCodexBrain ? {
						...descriptor,
						configured: Boolean(descriptor.codex_brain_ready)
					} : descriptor,
					activating,
					onActivate: activate,
					disabled: !isBrainSwitchable || isCodexBrain && !descriptor.codex_brain_ready,
					disabledReason: !isBrainSwitchable ? t("apikeys_view.agents_only_short").replace("{0}", agentsBrand(assistantName)) : isCodexBrain && !descriptor.codex_brain_ready ? t("apikeys_codex.brain_needs_openai_key") : void 0
				}),
				collapsible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					"aria-hidden": "true",
					className: cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform motion-reduce:transition-none", expanded && "rotate-180")
				})
			]
		}), expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			id: `provider-body-${descriptor.id}`,
			"data-testid": `provider-body-${descriptor.id}`,
			className: "space-y-3 border-t border-border bg-background px-3.5 pb-3.5 pl-[3.75rem] pt-3",
			children: [
				cardError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-testid": `provider-health-error-${descriptor.id}`,
					role: "status",
					className: "flex items-start gap-2 rounded-control border border-destructive/40 bg-destructive/[0.07] px-3 py-2 text-xs leading-relaxed text-destructive",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 break-words",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: t("apikeys_view.health_error")
						}), cardErrorDetail ? ` — ${cardErrorDetail}` : ""]
					})]
				}),
				!hideCredentialControls && (configuration && descriptor.configured ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-testid": `provider-key-${descriptor.id}`,
					className: "space-y-2 rounded-lg border border-border px-3 py-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-1.5 text-sm font-medium text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, {
							"aria-hidden": "true",
							className: "h-3.5 w-3.5 text-muted-foreground"
						}), t("live.shared_key_ready")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthWidget, {
						descriptor,
						onChanged,
						onSavedActivate: handleSavedActivate
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthWidget, {
					descriptor,
					onChanged,
					onSavedActivate: handleSavedActivate
				})),
				configuration,
				!isBrainSwitchable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-control bg-secondary px-3 py-2 text-xs leading-relaxed text-foreground",
					children: t("apikeys_view.agents_only_note").replace("{0}", agentBrand(assistantName))
				}),
				(descriptor.tier === "brain" && isBrainSwitchable || (descriptor.tier === "tts" || descriptor.tier === "stt") && descriptor.active && descriptor.configured) && (descriptor.id === "openrouter-tts" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenRouterTtsControls, {
					providerId: descriptor.id,
					recommendedModel: descriptor.recommended_model,
					healthActive: descriptor.active
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainModelSelector, {
					providerId: descriptor.id,
					recommendedModel: descriptor.recommended_model,
					healthSection: descriptor.tier,
					healthActive: descriptor.active,
					fixedCatalog: Boolean(descriptor.local_runtime)
				})),
				(descriptor.tier === "tts" || descriptor.tier === "stt") && descriptor.configured && !descriptor.active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: t("apikeys_view.model_picker_activate_hint")
				}),
				descriptor.tier === "realtime" && descriptor.configuration_surface !== "live" && (descriptor.configured || descriptor.codex_status?.reason_code === "busy") && (descriptor.managed_server ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
						className: "cursor-pointer",
						children: t("apikeys_view.managed_protocol_options")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RealtimeOptionsControl, {
							providerId: descriptor.id,
							healthActive: descriptor.active
						})
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RealtimeOptionsControl, {
					providerId: descriptor.id,
					healthActive: descriptor.active
				})),
				!hideCredentialControls && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border pt-2.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderTestControl, {
						providerId: descriptor.id,
						providerLabel: descriptor.label,
						section: descriptor.tier,
						active: descriptor.active
					})
				})
			]
		})]
	})] });
}
var TEST_STATUS_TONE = {
	ok: {
		dot: "bg-muted-foreground",
		text: "text-muted-foreground"
	},
	not_configured: {
		dot: "bg-muted-foreground/50",
		text: "text-muted-foreground"
	},
	bad_key: {
		dot: "bg-foreground",
		text: "text-foreground"
	},
	no_credits: {
		dot: "bg-foreground",
		text: "text-foreground"
	},
	rate_limited: {
		dot: "bg-foreground",
		text: "text-foreground"
	},
	model_unavailable: {
		dot: "bg-foreground",
		text: "text-foreground"
	},
	unreachable: {
		dot: "bg-destructive",
		text: "text-destructive"
	},
	error: {
		dot: "bg-destructive",
		text: "text-destructive"
	}
};
function ProviderTestControl({ providerId, providerLabel, section, active }) {
	const t = useT();
	const [running, setRunning] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const activeRef = (0, import_react.useRef)(active);
	activeRef.current = active;
	function publish(next) {
		window.dispatchEvent(new CustomEvent("jarvis:provider-tested", { detail: {
			section,
			provider: providerId,
			provider_label: providerLabel,
			active: activeRef.current,
			result: next
		} }));
	}
	const recordVerdict = useProviderTestStore((s) => s.record);
	async function run() {
		setRunning(true);
		setResult(null);
		try {
			const next = await testProvider(providerId);
			setResult(next);
			recordVerdict(providerId, next);
			publish(next);
		} catch (e) {
			const next = {
				provider: providerId,
				status: "error",
				detail: e.message,
				latency_ms: 0,
				integration_ok: false
			};
			setResult(next);
			recordVerdict(providerId, next);
			publish(next);
		} finally {
			setRunning(false);
		}
	}
	const tone = result ? TEST_STATUS_TONE[result.status] : null;
	const note = result ? result.integration_ok ? t("apikeys_test.integration_ok_note") : t("apikeys_test.integration_bad_note") : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center justify-between gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			variant: "ghost",
			onClick: (e) => {
				e.stopPropagation();
				run();
			},
			disabled: running,
			className: "h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground",
			children: [running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlugZap, { className: "h-3.5 w-3.5" }), running ? t("apikeys_test.running") : t("apikeys_test.button")]
		}), result && tone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			"data-testid": `provider-test-result-${providerId}`,
			className: cn("inline-flex items-center gap-1.5 text-xs", tone.text),
			title: [
				note,
				result.detail,
				result.latency_ms ? `${Math.round(result.latency_ms)} ms` : ""
			].filter(Boolean).join("\n"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					className: cn("h-[7px] w-[7px] rounded-full", tone.dot)
				}),
				t(`apikeys_test.status_${result.status}`),
				result.status === "ok" && result.latency_ms ? ` · ${Math.round(result.latency_ms)} ms` : ""
			]
		})]
	});
}
function ActiveControl({ descriptor, activating, onActivate, disabled = false, disabledReason }) {
	const t = useT();
	const labelTitle = descriptor.active && !descriptor.configured ? t("apikeys_view.needs_credentials") : descriptor.active ? t("apikeys_view.activate_tooltip_active") : disabled ? disabledReason ?? t("apikeys_view.activate_tooltip_blocked") : descriptor.configured ? t("apikeys_view.activate_tooltip_activate") : descriptor.codex_status?.reason_code ? t(CODEX_STATUS_KEY_BY_REASON[descriptor.codex_status.reason_code] ?? "apikeys_view.needs_credentials") : t("apikeys_view.needs_credentials");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		onClick: (e) => e.stopPropagation(),
		className: cn("inline-flex h-7 shrink-0 select-none items-center gap-2 whitespace-nowrap rounded-control px-2.5 text-xs transition-colors focus-within:ring-2 focus-within:ring-ring", disabled ? "cursor-not-allowed" : "cursor-pointer", descriptor.active ? "font-medium text-foreground" : descriptor.configured ? "border border-border bg-background text-muted-foreground hover:border-border-strong hover:text-foreground" : "border border-dashed border-border text-muted-foreground hover:text-foreground"),
		title: labelTitle,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "radio",
				name: `active-${descriptor.tier}`,
				checked: descriptor.active,
				onChange: () => onActivate(),
				disabled: activating || disabled,
				className: "sr-only"
			}),
			descriptor.active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: cn("h-[7px] w-[7px] rounded-full bg-secondary", activating && "animate-pulse motion-reduce:animate-none")
			}),
			activating ? t("apikeys_view.provider_activating") : descriptor.active ? descriptor.configured ? t("apikeys_view.provider_active") : t(PROVIDER_STATE_CHIPS[providerStateChip(descriptor)].key) : t("apikeys_view.provider_set_active")
		]
	});
}
function BaseUrlField({ descriptor, onChanged }) {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const [value, setValue] = (0, import_react.useState)(descriptor.base_url ?? "");
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setValue(descriptor.base_url ?? "");
	}, [descriptor.base_url]);
	const dirty = value.trim() !== (descriptor.base_url ?? "");
	async function save() {
		setSaving(true);
		try {
			const stored = await saveProviderBaseUrl(descriptor.id, value.trim() || null);
			setValue(stored ?? "");
			pushToast("success", stored ? t("apikeys_base_url.saved") : t("apikeys_base_url.cleared"));
			onChanged();
		} catch (e) {
			pushToast("error", e instanceof Error ? e.message : String(e));
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "text-xs text-muted-foreground",
				children: t("apikeys_base_url.label")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "url",
					value,
					onChange: (e) => setValue(e.target.value),
					placeholder: descriptor.default_base_url ?? t("apikeys_base_url.placeholder_required"),
					className: "h-8 w-full rounded-md border border-border bg-background px-2 text-xs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					onClick: save,
					disabled: saving || !dirty,
					children: saving ? t("apikeys_base_url.saving") : t("apikeys_base_url.save")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-relaxed text-muted-foreground",
				children: descriptor.default_base_url ? t("apikeys_base_url.hint_default") : t("apikeys_base_url.hint_required")
			})
		]
	});
}
function LocalRuntimePanel({ descriptor, onChanged }) {
	const t = useT();
	const status = descriptor.local_runtime;
	const [progress, setProgress] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const running = progress?.state === "running";
	const [gpuProgress, setGpuProgress] = (0, import_react.useState)(null);
	const [gpuError, setGpuError] = (0, import_react.useState)(null);
	const gpuRunning = gpuProgress?.state === "running";
	(0, import_react.useEffect)(() => {
		if (!gpuRunning) return;
		let cancelled = false;
		const timer = window.setInterval(async () => {
			try {
				const next = await gpuLibrariesInstallStatus();
				if (cancelled) return;
				setGpuProgress(next);
				if (next.state === "done" || next.state === "error") {
					window.clearInterval(timer);
					onChanged();
				}
			} catch (err) {
				if (cancelled) return;
				window.clearInterval(timer);
				setGpuError(err instanceof Error ? err.message : String(err));
				setGpuProgress(null);
			}
		}, 3e3);
		return () => {
			cancelled = true;
			window.clearInterval(timer);
		};
	}, [gpuRunning, onChanged]);
	(0, import_react.useEffect)(() => {
		if (!running) return;
		let cancelled = false;
		const timer = window.setInterval(async () => {
			try {
				const next = await localInstallStatus(descriptor.id);
				if (cancelled) return;
				setProgress(next);
				if (next.state === "done" || next.state === "error") {
					window.clearInterval(timer);
					onChanged();
				}
			} catch (err) {
				if (cancelled) return;
				window.clearInterval(timer);
				setError(err instanceof Error ? err.message : String(err));
				setProgress(null);
			}
		}, 3e3);
		return () => {
			cancelled = true;
			window.clearInterval(timer);
		};
	}, [
		running,
		descriptor.id,
		onChanged
	]);
	if (!status) return null;
	const start = async () => {
		setError(null);
		try {
			setProgress(await startLocalInstall(descriptor.id));
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		}
	};
	const startGpu = async () => {
		setGpuError(null);
		try {
			setGpuProgress(await startGpuLibrariesInstall());
		} catch (err) {
			setGpuError(err instanceof Error ? err.message : String(err));
		}
	};
	const failed = progress?.state === "error";
	const gpuFailed = gpuProgress?.state === "error";
	const accelerator = status.accelerator ?? null;
	const showAccelerator = accelerator !== null && accelerator.reason !== "not_requested" && accelerator.reason !== "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2 border-t border-border pt-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2 text-xs",
				children: [status.ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: progress?.message ?? status.detail
				})]
			}),
			showAccelerator && accelerator && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2 text-xs",
				"data-testid": "local-accelerator",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: cn("mt-0.5 h-3.5 w-3.5 shrink-0", accelerator.effective === "cpu" && accelerator.installable ? "text-foreground" : "text-muted-foreground") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: gpuProgress?.message ?? accelerator.detail
				})]
			}),
			showAccelerator && accelerator?.installable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: "secondary",
				onClick: startGpu,
				disabled: gpuRunning,
				className: "gap-2",
				"data-testid": "install-gpu-libraries",
				children: [gpuRunning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), gpuRunning ? t("apikeys_view.gpu_libraries_installing") : gpuFailed ? t("apikeys_view.local_install_retry") : t("apikeys_view.gpu_libraries_install_cta")]
			}),
			gpuRunning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: t("apikeys_view.gpu_libraries_install_hint")
			}),
			gpuError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-destructive",
				children: gpuError
			}),
			!status.ready && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: "secondary",
				onClick: start,
				disabled: running,
				className: "gap-2",
				children: [running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), running ? t("apikeys_view.local_installing") : failed ? t("apikeys_view.local_install_retry") : t("apikeys_view.local_install_cta")]
			}),
			running && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: t("apikeys_view.local_install_hint")
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-destructive",
				children: error
			})
		]
	});
}
function managedRuntimeBadge(runtime, installReady) {
	if (runtime === null) return null;
	const ours = runtime.owned || installReady;
	const serving = (runtime.pool?.in_use ?? 0) > 0;
	const canTakeACall = runtime.ready !== false && (runtime.available !== false || serving);
	if (runtime.reachable && ours) {
		if (canTakeACall) return {
			key: "apikeys_view.managed_server_running",
			tone: "ok"
		};
		return runtime.ready === false ? {
			key: "apikeys_view.managed_server_starting",
			tone: "warn"
		} : {
			key: "apikeys_view.managed_server_no_capacity",
			tone: "warn"
		};
	}
	if (runtime.reachable) return {
		key: "apikeys_view.managed_server_port_conflict",
		tone: "warn"
	};
	if (runtime.owned) return {
		key: "apikeys_view.managed_server_starting",
		tone: "warn"
	};
	if ((runtime.boot?.failed_streak ?? 0) >= 2) return {
		key: "apikeys_view.managed_server_crash_loop",
		tone: "warn"
	};
	return {
		key: "apikeys_view.managed_server_stopped",
		tone: "muted"
	};
}
function ManagedServerPanel({ descriptor, onChanged }) {
	const t = useT();
	const status = descriptor.managed_server;
	const [preflight, setPreflight] = (0, import_react.useState)(null);
	const [progress, setProgress] = (0, import_react.useState)(null);
	const [runtime, setRuntime] = (0, import_react.useState)(null);
	const [catalog, setCatalog] = (0, import_react.useState)(null);
	const [selectedBrain, setSelectedBrain] = (0, import_react.useState)("");
	const [selectedVoice, setSelectedVoice] = (0, import_react.useState)("");
	const [voiceQuery, setVoiceQuery] = (0, import_react.useState)("");
	const [setupBusy, setSetupBusy] = (0, import_react.useState)(false);
	const [setupNote, setSetupNote] = (0, import_react.useState)(null);
	const [libraryBusy, setLibraryBusy] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [checking, setChecking] = (0, import_react.useState)(false);
	const [lifecycleBusy, setLifecycleBusy] = (0, import_react.useState)(false);
	const [confirmRemove, setConfirmRemove] = (0, import_react.useState)(false);
	const running = Boolean(progress?.running);
	(0, import_react.useEffect)(() => {
		if (!running) return;
		let cancelled = false;
		const timer = window.setInterval(async () => {
			try {
				const next = await managedServerStatus();
				if (cancelled) return;
				setProgress(next.progress);
				setRuntime(next.runtime ?? null);
				if (!next.progress.running) {
					window.clearInterval(timer);
					if (next.progress.phase === "error") setError(next.progress.error || "install failed");
					onChanged();
				}
			} catch (err) {
				if (cancelled) return;
				window.clearInterval(timer);
				setError(err instanceof Error ? err.message : String(err));
				setProgress(null);
			}
		}, 3e3);
		return () => {
			cancelled = true;
			window.clearInterval(timer);
		};
	}, [running, onChanged]);
	const installed = Boolean(status?.ready);
	(0, import_react.useEffect)(() => {
		if (running || !installed) return;
		let cancelled = false;
		let timer;
		const read = async () => {
			let delay = 2e4;
			try {
				const next = await managedServerStatus();
				if (!cancelled) setRuntime(next.runtime ?? null);
				if (next.runtime?.boot?.starting || next.runtime?.ready === false || setupBusy || lifecycleBusy) delay = 1500;
			} catch {
				if (!cancelled) setRuntime(null);
				delay = 5e3;
			} finally {
				if (!cancelled) timer = window.setTimeout(read, delay + Math.random() * 500);
			}
		};
		read();
		return () => {
			cancelled = true;
			window.clearTimeout(timer);
		};
	}, [
		running,
		installed,
		setupBusy,
		lifecycleBusy
	]);
	if (!status) return null;
	const anythingOnDisk = Object.values(status.components ?? {}).some(Boolean);
	const check = async () => {
		setError(null);
		setChecking(true);
		try {
			setPreflight(await managedServerPreflight());
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		} finally {
			setChecking(false);
		}
	};
	const startInstall = async () => {
		setError(null);
		try {
			const first = await managedServerInstall(preflight?.brain_fixable ? "ollama" : preflight?.brain?.kind, selectedBrain, selectedVoice);
			setProgress(first);
			if (!first.running && first.phase === "error" && first.error) setError(first.error);
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		}
	};
	const remove = async () => {
		if (!confirmRemove) {
			setConfirmRemove(true);
			return;
		}
		setConfirmRemove(false);
		setError(null);
		try {
			await managedServerUninstall();
			setPreflight(null);
			setProgress(null);
			setRuntime(null);
			onChanged();
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		}
	};
	const startServer = async () => {
		setError(null);
		setLifecycleBusy(true);
		try {
			setRuntime(await managedServerStart());
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		} finally {
			setLifecycleBusy(false);
		}
	};
	const loadCatalog = (0, import_react.useCallback)(async () => {
		try {
			const next = await managedServerModelCatalog();
			setCatalog(next);
			setSelectedBrain((current) => current || next.brain.current || next.brain.models.find((choice) => choice.recommended && choice.fits)?.id || next.brain.models.find((choice) => choice.fits)?.id || "");
			setSelectedVoice((current) => current || next.current || next.models.find((choice) => choice.recommended && choice.selectable)?.id || next.models.find((choice) => choice.selectable)?.id || "");
		} catch (err) {
			setCatalog(null);
			setError(err instanceof Error ? err.message : String(err));
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (running) return;
		loadCatalog();
	}, [running, loadCatalog]);
	const downloadBrain = async (model) => {
		await startModelPull("ollama", model);
		for (;;) {
			const pull = await modelPullStatus("ollama", model);
			if (pull.state === "done") return;
			if (pull.state === "error") throw new Error(pull.message || "model download failed");
			setSetupNote(`${model}: ${Math.round(pull.percent ?? 0)}%`);
			await new Promise((resolve) => window.setTimeout(resolve, 2500));
		}
	};
	const applySetup = async (brainModel = selectedBrain, downloadFirst = false, voiceModel = selectedVoice) => {
		if (!brainModel || !voiceModel) return;
		setError(null);
		setSetupNote(t("apikeys_view.managed_setup_testing"));
		setSetupBusy(true);
		try {
			const choice = catalog?.brain.models.find((item) => item.id === brainModel);
			if (downloadFirst || choice && !choice.installed) await downloadBrain(brainModel);
			const result = await managedServerSetup(brainModel, voiceModel);
			if (!descriptor.active) await switchRealtimeProvider(descriptor.id, descriptor.experimental === true);
			await putVoiceMode("realtime");
			window.dispatchEvent(new CustomEvent("jarvis:realtime-switched"));
			const latency = result.smoke.first_audio_ms;
			setSelectedBrain(brainModel);
			setSelectedVoice(voiceModel);
			setSetupNote(latency === null ? t("apikeys_view.managed_setup_complete") : t("apikeys_view.managed_setup_complete_ms").replace("{0}", String(latency)));
			await loadCatalog();
			onChanged();
		} catch (err) {
			setSetupNote(null);
			setError(err instanceof Error ? err.message : String(err));
		} finally {
			setSetupBusy(false);
			setLibraryBusy(null);
		}
	};
	const applyCatalogModel = async (model, installedModel) => {
		setLibraryBusy(model);
		setSelectedBrain(model);
		if (!installed) {
			try {
				if (!installedModel) await downloadBrain(model);
				setSetupNote(t("apikeys_view.managed_catalog_selected"));
				await loadCatalog();
			} catch (err) {
				setError(err instanceof Error ? err.message : String(err));
			} finally {
				setLibraryBusy(null);
			}
			return;
		}
		await applySetup(model, !installedModel);
	};
	const applyVoiceChoice = async (choice) => {
		if (!choice.selectable || !selectedBrain) return;
		setSelectedVoice(choice.id);
		setError(null);
		setSetupNote(null);
		if (!installed) {
			setSetupNote(t("apikeys_view.managed_catalog_selected"));
			return;
		}
		if (choice.runtime_ready === false) {
			setSetupBusy(true);
			try {
				const first = await managedServerInstall(void 0, selectedBrain, choice.id);
				setProgress(first);
				if (!first.running && first.phase === "error" && first.error) setError(first.error);
			} catch (err) {
				setError(err instanceof Error ? err.message : String(err));
			} finally {
				setSetupBusy(false);
			}
			return;
		}
		await applySetup(selectedBrain, false, choice.id);
	};
	const stopServer = async () => {
		setError(null);
		setLifecycleBusy(true);
		try {
			setRuntime(await managedServerStop());
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		} finally {
			setLifecycleBusy(false);
		}
	};
	const runtimeBadge = managedRuntimeBadge(runtime, status.ready);
	const failed = progress?.phase === "error";
	const normalizedVoiceQuery = voiceQuery.trim().toLocaleLowerCase();
	const voiceResults = (catalog?.models ?? []).filter((choice) => {
		if (!normalizedVoiceQuery) return true;
		return [
			choice.label,
			choice.backend,
			choice.model,
			choice.note,
			choice.license ?? "",
			...choice.languages ?? []
		].join(" ").toLocaleLowerCase().includes(normalizedVoiceQuery);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2 border-t border-border pt-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2 text-xs",
				children: [status.ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: running ? progress?.detail ?? status.sentence : status.sentence
				})]
			}),
			!running && installed && runtimeBadge && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-xs",
				"data-testid": "managed-server-runtime",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						className: cn("h-1.5 w-1.5 shrink-0 rounded-full", runtimeBadge.tone === "ok" ? "bg-muted-foreground" : runtimeBadge.tone === "warn" ? "animate-pulse bg-foreground motion-reduce:animate-none" : "bg-muted-foreground/40")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn(runtimeBadge.tone === "warn" ? "text-foreground" : "text-muted-foreground"),
						children: t(runtimeBadge.key)
					}),
					runtimeBadge.key === "apikeys_view.managed_server_starting" && runtime?.boot?.starting && runtime.boot.stage_label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: typeof runtime.boot.remaining_s === "number" && runtime.boot.remaining_s > 0 ? `${runtime.boot.stage_label} · ${t("apikeys_view.managed_server_starting_eta").replace("{0}", String(Math.max(10, Math.round(runtime.boot.remaining_s / 10) * 10)))}` : runtime.boot.stage_label
					}),
					runtime && !runtime.reachable && !runtime.owned && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: startServer,
						disabled: lifecycleBusy,
						className: "h-6 gap-1.5 px-2 text-xs",
						children: [lifecycleBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3 w-3" }), t("apikeys_view.managed_start_cta")]
					}),
					runtime?.owned && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: stopServer,
						disabled: lifecycleBusy,
						className: "h-6 gap-1.5 px-2 text-xs",
						children: [lifecycleBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "h-3 w-3" }), t("apikeys_view.managed_stop_cta")]
					})
				]
			}),
			setupNote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				"aria-live": "polite",
				children: setupNote
			}),
			!running && catalog && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				"data-testid": "managed-model-picker",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						role: "status",
						children: t(descriptor.active ? "apikeys_view.managed_selected" : "apikeys_view.managed_not_selected")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5 text-xs font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-3.5 w-3.5 text-muted-foreground" }), t("apikeys_view.managed_hearing_title")]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs",
										children: catalog.hearing.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs leading-snug text-muted-foreground",
										children: t("apikeys_view.managed_hearing_note")
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5 text-xs font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-3.5 w-3.5 text-muted-foreground" }), t("apikeys_view.managed_thinking_title")]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedSelect, {
									ariaLabel: t("apikeys_view.managed_thinking_title"),
									value: selectedBrain,
									onValueChange: setSelectedBrain,
									disabled: setupBusy,
									className: "h-8 px-2 text-xs",
									options: catalog.brain.models.map((choice) => ({
										value: choice.id,
										label: `${choice.label} · ~${choice.size_gb} GB${choice.recommended ? ` · ${t("apikeys_view.managed_brain_recommended")}` : ""}${choice.fits ? "" : ` · ${t("apikeys_view.managed_brain_no_fit")}`}`,
										disabled: !choice.fits
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5 text-xs font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-3.5 w-3.5 text-muted-foreground" }), t("apikeys_view.managed_speaking_title")]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedSelect, {
									ariaLabel: t("apikeys_view.managed_speaking_title"),
									value: selectedVoice,
									onValueChange: setSelectedVoice,
									disabled: setupBusy,
									className: "h-8 px-2 text-xs",
									options: catalog.models.map((choice) => ({
										value: choice.id,
										label: `${choice.label}${choice.recommended ? ` · ${t("apikeys_view.managed_brain_recommended")}` : ""}${!choice.selectable ? ` · ${t("apikeys_view.managed_voice_unavailable")}` : choice.runtime_ready === false ? ` · ${t("apikeys_view.managed_voice_install_required")}` : ""}`,
										disabled: !choice.selectable
									}))
								})]
							})
						]
					}),
					installed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => void applySetup(),
						disabled: setupBusy || !selectedBrain || !selectedVoice,
						className: "gap-2",
						children: [setupBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-3.5 w-3.5" }), t("apikeys_view.managed_apply_test")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "group text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
							className: "inline-flex cursor-pointer list-none items-center gap-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
								"aria-hidden": "true",
								className: "h-3 w-3 -rotate-90 transition-transform group-open:rotate-0 motion-reduce:transition-none"
							}), t("apikeys_view.managed_full_catalog")]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LibraryBrowser, {
							providerId: "ollama",
							onPull: (model) => void applyCatalogModel(model, false),
							onInstalledSelect: (model) => void applyCatalogModel(model, true),
							disabled: setupBusy,
							pullingModel: libraryBusy,
							actionLabel: t("apikeys_view.managed_download_test"),
							installedActionLabel: t("apikeys_view.managed_use_test")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						"data-testid": "managed-voice-catalog",
						className: "group text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
							className: "inline-flex cursor-pointer list-none items-center gap-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
								"aria-hidden": "true",
								className: "h-3 w-3 -rotate-90 transition-transform group-open:rotate-0 motion-reduce:transition-none"
							}), t("apikeys_view.managed_voice_catalog_title")]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "relative block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									"aria-hidden": "true",
									className: "pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "search",
									value: voiceQuery,
									onChange: (event) => setVoiceQuery(event.target.value),
									placeholder: t("apikeys_view.managed_voice_catalog_search"),
									"aria-label": t("apikeys_view.managed_voice_catalog_search"),
									className: "h-8 w-full rounded-md border border-border bg-background pl-8 pr-2 text-xs"
								})]
							}), voiceResults.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-1 py-2 text-xs text-muted-foreground",
								children: t("apikeys_view.managed_voice_catalog_empty")
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "max-h-80 space-y-1.5 overflow-y-auto pr-1",
								children: voiceResults.map((choice) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-testid": `managed-voice-row-${choice.id}`,
									className: cn("flex items-start justify-between gap-3 rounded-md border px-2.5 py-2", choice.id === selectedVoice ? "border-border-strong bg-primary/[0.05]" : "border-border bg-background"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center gap-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs font-medium",
														children: choice.label
													}),
													choice.frontier && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded-full bg-secondary px-1.5 py-px text-xs font-semibold text-foreground-strong",
														children: t("apikeys_view.managed_voice_frontier")
													}),
													choice.streaming && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded-full border border-border px-1.5 py-px text-xs text-muted-foreground",
														children: t("apikeys_view.managed_voice_streaming")
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: cn("rounded-full border px-1.5 py-px text-xs", choice.selectable ? "border-muted-foreground/30 bg-muted-foreground/10 text-muted-foreground" : "bg-secondary text-foreground"),
														children: t(choice.selectable ? "apikeys_view.managed_voice_compatible" : "apikeys_view.managed_voice_integration_pending")
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "break-all font-mono text-xs text-muted-foreground",
												children: choice.model
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs leading-snug text-muted-foreground",
												children: choice.note
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center gap-1 text-xs text-muted-foreground",
												children: [
													(choice.languages ?? []).slice(0, 12).map((language) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded bg-muted px-1 py-px ",
														children: language
													}, language)),
													(choice.languages?.length ?? 0) > 12 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["+", (choice.languages?.length ?? 0) - 12] }),
													choice.release_date && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· ", choice.release_date] }),
													choice.license && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· ", choice.license] }),
													(choice.size_gb ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
														"· ~",
														choice.size_gb,
														" GB"
													] }),
													choice.source_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														href: choice.source_url,
														target: "_blank",
														rel: "noreferrer",
														className: "font-medium text-foreground-strong hover:underline",
														children: t("apikeys_view.managed_voice_source")
													})
												]
											})
										]
									}), choice.selectable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: choice.id === selectedVoice ? "secondary" : "outline",
										disabled: setupBusy || !selectedBrain,
										onClick: () => void applyVoiceChoice(choice),
										className: "h-7 shrink-0 gap-1 px-2 text-xs",
										children: [setupBusy && choice.id === selectedVoice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-3 w-3" }), t(choice.runtime_ready === false ? "apikeys_view.managed_voice_install_test" : "apikeys_view.managed_use_test")]
									})]
								}, choice.id))
							})]
						})]
					})
				]
			}),
			running && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1.5 w-full overflow-hidden rounded bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded bg-secondary transition-all",
						style: { width: `${Math.max(2, progress?.percent ?? 0)}%` }
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: t("apikeys_view.managed_hint")
				})]
			}),
			!status.ready && !running && !preflight && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: "secondary",
				onClick: check,
				disabled: checking,
				className: "gap-2",
				children: [checking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), failed ? t("apikeys_view.managed_retry") : t("apikeys_view.managed_check_cta")]
			}),
			!status.ready && !running && preflight && !preflight.ok && !preflight.brain_fixable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-foreground",
					children: preflight.blocker
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "list-disc space-y-0.5 pl-4 text-muted-foreground",
					children: preflight.actions.map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: action }, action))
				})]
			}),
			!status.ready && !running && preflight && (preflight.ok || preflight.brain_fixable) && preflight.tier && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-0.5 text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							preflight.tier.label,
							" · ",
							t("apikeys_view.managed_download_size"),
							" ",
							"~",
							preflight.tier.download_gb,
							" GB ·",
							" ",
							t("apikeys_view.managed_latency"),
							" ",
							preflight.tier.expected_latency
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: preflight.stack_sentence }),
						preflight.brain && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: preflight.brain.note }),
						!preflight.ok && preflight.brain_fixable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-foreground",
							children: t("apikeys_view.managed_brain_setup_note")
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: startInstall,
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), t("apikeys_view.managed_install_cta")]
				})]
			}),
			anythingOnDisk && !running && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: "ghost",
				onClick: remove,
				className: cn("gap-2 text-muted-foreground hover:text-destructive", confirmRemove && "text-destructive"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3.5 w-3.5" }), confirmRemove ? t("apikeys_view.managed_uninstall_confirm") : t("apikeys_view.managed_uninstall")]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-destructive",
				children: error
			})
		]
	});
}
function OllamaRuntimePanel({ providerId, onChanged, alwaysVisible = false }) {
	const t = useT();
	const [status, setStatus] = (0, import_react.useState)(null);
	const [progress, setProgress] = (0, import_react.useState)(null);
	const [confirmInstall, setConfirmInstall] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const installing = Boolean(progress?.running);
	const refresh = (0, import_react.useCallback)(async () => {
		try {
			const next = await ollamaRuntime(providerId);
			if (!next.status || !next.install) return null;
			setStatus(next.status);
			setProgress(next.install);
			return next;
		} catch {
			return null;
		}
	}, [providerId]);
	(0, import_react.useEffect)(() => {
		refresh();
	}, [refresh]);
	(0, import_react.useEffect)(() => {
		if (!installing) return;
		let cancelled = false;
		const timer = window.setInterval(async () => {
			const next = await refresh();
			if (cancelled || next === null) return;
			if (!next.install.running) {
				window.clearInterval(timer);
				if (next.install.phase === "error") setError(next.install.error || "install failed");
				onChanged();
			}
		}, 3e3);
		return () => {
			cancelled = true;
			window.clearInterval(timer);
		};
	}, [
		installing,
		refresh,
		onChanged
	]);
	const install = async () => {
		if (!confirmInstall) {
			setConfirmInstall(true);
			return;
		}
		setConfirmInstall(false);
		setError(null);
		try {
			const first = await ollamaRuntimeInstall(providerId);
			setProgress(first);
			if (!first.running && first.phase === "error" && first.error) setError(first.error);
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		}
	};
	const start = async () => {
		setError(null);
		setBusy(true);
		try {
			const next = await ollamaRuntimeStart(providerId);
			if (next) setStatus(next);
			onChanged();
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		} finally {
			setBusy(false);
		}
	};
	if (status === null) return null;
	if (status.running && !installing) {
		if (!alwaysVisible) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-2 text-xs",
			"data-testid": "ollama-runtime-panel",
			"data-state": "running",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: "mt-1 h-2 w-2 shrink-0 rounded-full bg-muted-foreground"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground",
				children: status.detail || t("apikeys_view.ollama_running_line").replace("{0}", status.version || "")
			})]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2 border-t border-border pt-3",
		"data-testid": "ollama-runtime-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: installing ? progress?.detail ?? status.detail : status.detail
				})]
			}),
			installing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1.5 w-full overflow-hidden rounded bg-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded bg-secondary transition-all",
					style: { width: `${Math.max(2, progress?.percent ?? 0)}%` }
				})
			}),
			!installing && !status.installed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: install,
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), confirmInstall ? t("apikeys_view.ollama_install_confirm") : t("apikeys_view.ollama_install_cta")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: t("apikeys_view.ollama_install_hint")
				})]
			}),
			!installing && status.installed && !status.running && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: "secondary",
				onClick: start,
				disabled: busy,
				className: "gap-2",
				children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3.5 w-3.5" }), t("apikeys_view.ollama_start_cta")]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-destructive",
				children: error
			})
		]
	});
}
function LibraryBrowser({ providerId, onPull, onInstalledSelect, disabled, pullingModel, actionLabel, installedActionLabel }) {
	const t = useT();
	const [query, setQuery] = (0, import_react.useState)("");
	const [results, setResults] = (0, import_react.useState)(null);
	const [searching, setSearching] = (0, import_react.useState)(false);
	const [libraryError, setLibraryError] = (0, import_react.useState)(null);
	const [openModel, setOpenModel] = (0, import_react.useState)(null);
	const [tags, setTags] = (0, import_react.useState)({});
	const [tagsError, setTagsError] = (0, import_react.useState)(null);
	const [loadingTags, setLoadingTags] = (0, import_react.useState)(false);
	const [browsing, setBrowsing] = (0, import_react.useState)(false);
	const runSearch = (0, import_react.useCallback)(async (q) => {
		setSearching(true);
		try {
			const answer = await searchModelLibrary(providerId, q);
			setResults(answer.models);
			setLibraryError(answer.error);
		} catch (err) {
			setResults([]);
			setLibraryError(err instanceof Error ? err.message : String(err));
		} finally {
			setSearching(false);
		}
	}, [providerId]);
	(0, import_react.useEffect)(() => {
		if (!browsing) return;
		const timer = window.setTimeout(() => void runSearch(query.trim()), 350);
		return () => window.clearTimeout(timer);
	}, [
		browsing,
		query,
		runSearch
	]);
	const toggleModel = async (name) => {
		if (openModel === name) {
			setOpenModel(null);
			return;
		}
		setOpenModel(name);
		setTagsError(null);
		if (tags[name]) return;
		setLoadingTags(true);
		try {
			const answer = await modelLibraryTags(providerId, name);
			if (answer.error) setTagsError(answer.error);
			setTags((prev) => ({
				...prev,
				[name]: answer.tags
			}));
		} catch (err) {
			setTagsError(err instanceof Error ? err.message : String(err));
		} finally {
			setLoadingTags(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2 border-t border-border pt-2",
		"data-testid": "model-library",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-1.5 text-xs font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-3.5 w-3.5 text-muted-foreground" }), t("apikeys_model_pull.library_title")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: query,
						onFocus: () => setBrowsing(true),
						onChange: (e) => {
							setQuery(e.target.value);
							setBrowsing(true);
						},
						placeholder: t("apikeys_model_pull.custom_placeholder"),
						className: "h-8 w-full rounded-md border border-border bg-background pl-7 pr-2 text-xs"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					disabled: disabled || pullingModel !== null || !query.trim(),
					onClick: () => onPull(query),
					children: actionLabel ?? t("apikeys_model_pull.download")
				})]
			}),
			browsing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [
					searching && !results && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: t("apikeys_model_pull.library_searching")
					}),
					libraryError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-foreground",
						children: libraryError
					}),
					results && results.length === 0 && !libraryError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: t("apikeys_model_pull.library_no_results")
					}),
					(results ?? []).map((model) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-testid": `library-row-${model.name}`,
						className: "rounded border border-border bg-background",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full items-start justify-between gap-2 px-2 py-1.5 text-left",
							onClick: () => void toggleModel(model.name),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "truncate text-xs font-medium",
										children: [model.name, model.installed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-1.5 text-xs font-normal text-muted-foreground",
											children: t("apikeys_model_pull.installed")
										})]
									}),
									model.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs leading-snug text-muted-foreground",
										children: model.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-0.5 flex flex-wrap gap-1",
										children: [model.capabilities.map((cap) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-secondary px-1 py-px text-xs font-medium text-foreground-strong",
											children: cap
										}, cap)), model.sizes.slice(0, 6).map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-muted px-1 py-px text-xs font-medium text-muted-foreground",
											children: size
										}, size))]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform", openModel === model.name && "rotate-180") })]
						}), openModel === model.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-h-56 space-y-1 overflow-y-auto border-t border-border px-2 py-1.5",
							children: [
								loadingTags && !tags[model.name] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: t("apikeys_model_pull.library_loading_versions")
								}),
								tagsError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-foreground",
									children: tagsError
								}),
								(tags[model.name] ?? []).map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-testid": `library-tag-${tag.id}`,
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "truncate text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono",
													children: tag.id
												}),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-muted-foreground",
													children: [tag.size_gb ? t("apikeys_model_pull.size").replace("{0}", String(tag.size_gb)) : t("apikeys_model_pull.library_size_unknown"), tag.context ? ` · ${t("apikeys_model_pull.library_context").replace("{0}", tag.context)}` : ""]
												})
											]
										}), tag.fit === "tight" && tag.fit_note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs leading-snug text-foreground",
											children: tag.fit_note
										})]
									}), tag.cloud ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "shrink-0 text-xs text-muted-foreground",
										children: t("apikeys_model_pull.library_hosted")
									}) : tag.installed && onInstalledSelect ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "secondary",
										className: "h-6 shrink-0 gap-1 px-2 text-xs",
										disabled: disabled || pullingModel !== null,
										onClick: () => onInstalledSelect(tag.id),
										children: [pullingModel === tag.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }), installedActionLabel ?? t("apikeys_model_pull.installed")]
									}) : tag.installed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex shrink-0 items-center gap-1 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }), t("apikeys_model_pull.installed")]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "secondary",
										className: "h-6 shrink-0 gap-1 px-2 text-xs",
										disabled: disabled || pullingModel !== null,
										onClick: () => onPull(tag.id),
										children: [pullingModel === tag.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3 w-3" }), actionLabel ?? t("apikeys_model_pull.download")]
									})]
								}, tag.id))
							]
						})]
					}, model.name))
				]
			})
		]
	});
}
function AuthWidget({ descriptor, onChanged, onSavedActivate }) {
	const t = useT();
	const isSubscriptionBilled = descriptor.billing === "subscription" && descriptor.secret_keys.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			descriptor.experimental && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-testid": `provider-experimental-note-${descriptor.id}`,
				className: "text-xs leading-relaxed text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: isSubscriptionBilled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("apikeys_view.subscription_realtime_description") }),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("apikeys_view.experimental_subscription_fallback") })
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("apikeys_view.experimental_note") }) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalRuntimePanel, {
				descriptor,
				onChanged
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManagedServerPanel, {
				descriptor,
				onChanged
			}),
			descriptor.voice_engine && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalVoicePanel, { onChanged }),
			descriptor.supports_base_url && descriptor.managed_server && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "group text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
					className: "inline-flex cursor-pointer list-none items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
						"aria-hidden": "true",
						className: "h-3 w-3 -rotate-90 transition-transform group-open:rotate-0 motion-reduce:transition-none"
					}), t("apikeys_view.managed_advanced_connection")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaseUrlField, {
						descriptor,
						onChanged
					})
				})]
			}),
			descriptor.supports_base_url && !descriptor.managed_server && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaseUrlField, {
				descriptor,
				onChanged
			}),
			descriptor.supports_model_pull && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OllamaRuntimePanel, {
				providerId: descriptor.id,
				onChanged,
				alwaysVisible: true
			}),
			descriptor.auth_mode === "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: descriptor.secret_keys.length > 0 ? t("apikeys_view.local_optional_key_hint") : t("apikeys_view.local_no_credentials_hint")
			}), descriptor.secret_keys.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApiKeyForm, {
				secretKey: k,
				dashboardUrl: descriptor.dashboard_url,
				configured: Boolean(descriptor.secrets_set[k]),
				effectiveConfigured: Boolean(descriptor.secrets_effective?.[k]),
				coveredNote: descriptor.configuration_surface === "live" ? t("live.shared_key_help") : descriptor.credential_note ?? null,
				coveredEditLabel: descriptor.configuration_surface === "live" ? t("live.manage_key") : void 0,
				sharedWith: descriptor.secret_shared_with?.[k] ?? [],
				credentialHelp: descriptor.credential_help,
				onChanged,
				onSavedActivate
			}, k))] }),
			descriptor.auth_mode === "codex" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodexAuthWidget, {
				descriptor,
				onChanged
			}),
			descriptor.auth_mode === "antigravity" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AntigravityAuthWidget, {
				descriptor,
				onChanged
			}),
			descriptor.auth_mode === "api_key" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [descriptor.secret_keys.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApiKeyForm, {
				secretKey: k,
				dashboardUrl: descriptor.dashboard_url,
				configured: Boolean(descriptor.secrets_set[k]),
				effectiveConfigured: Boolean(descriptor.secrets_effective?.[k]),
				coveredNote: descriptor.configuration_surface === "live" ? t("live.shared_key_help") : descriptor.credential_note ?? null,
				coveredEditLabel: descriptor.configuration_surface === "live" ? t("live.manage_key") : void 0,
				sharedWith: descriptor.secret_shared_with?.[k] ?? [],
				credentialHelp: descriptor.credential_help,
				testAfterSave: descriptor.tier === "dictation" ? void 0 : {
					id: descriptor.id,
					label: descriptor.label,
					section: descriptor.tier,
					active: descriptor.active
				},
				onChanged,
				onSavedActivate
			}, k)), descriptor.alt_credential && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AltCredentialNote, { alt: descriptor.alt_credential })] })
		]
	});
}
const CODEX_STATUS_KEY_BY_REASON = {
	ready: "apikeys_codex.status_ready",
	login_required: "apikeys_codex.status_login_required",
	login_in_progress: "apikeys_codex.status_login_in_progress",
	lifecycle_unavailable: "apikeys_codex.status_lifecycle_unavailable",
	not_installed: "apikeys_codex.status_not_installed",
	setup_invalid: "apikeys_codex.status_setup_invalid",
	plan_unsupported: "apikeys_codex.status_plan_unsupported",
	busy: "apikeys_codex.status_busy"
};
var CODEX_NO_INSTALL_PROMPT_REASONS = new Set([
	"busy",
	"login_in_progress",
	"lifecycle_unavailable"
]);
function CodexAuthWidget({ descriptor, onChanged }) {
	const t = useT();
	const [pending, setPending] = (0, import_react.useState)(null);
	const [loginPolling, setLoginPolling] = (0, import_react.useState)(false);
	const pushToast = useEventStore((s) => s.pushToast);
	const status = descriptor.codex_status;
	const installCommand = descriptor.install_hint ?? "npm i -g @openai/codex";
	const subscriptionOnly = descriptor.secret_keys.length === 0;
	const loginReady = Boolean(status?.connected && (!subscriptionOnly || status.mode === "chatgpt"));
	const subscriptionStatusKey = !status ? "apikeys_codex.status_loading" : status.reason_code && status.reason_code !== "login_required" ? CODEX_STATUS_KEY_BY_REASON[status.reason_code] ?? "apikeys_codex.status_loading" : !status.installed ? "apikeys_codex.status_not_installed" : "apikeys_codex.status_login_required";
	(0, import_react.useEffect)(() => {
		if (!loginPolling) return;
		if (loginReady) {
			window.dispatchEvent(new CustomEvent("jarvis:realtime-switched"));
			return;
		}
		let stopped = false;
		const deadline = Date.now() + 5 * 6e4;
		let timer = null;
		const poll = () => {
			if (stopped) return;
			onChanged();
			if (Date.now() < deadline) timer = window.setTimeout(poll, 5e3);
			else setLoginPolling(false);
		};
		timer = window.setTimeout(poll, 1e3);
		return () => {
			stopped = true;
			if (timer !== null) window.clearTimeout(timer);
		};
	}, [
		loginPolling,
		loginReady,
		onChanged
	]);
	async function handleCopy() {
		setPending("copy");
		try {
			const copied = await robustCopy(installCommand);
			pushToast(copied ? "success" : "warning", copied ? t("apikeys_codex.install_command_copied") : installCommand);
		} finally {
			setPending(null);
		}
	}
	async function handleLogin() {
		setPending("login");
		try {
			await startCodexLogin(subscriptionOnly);
			pushToast("info", t("apikeys_codex.login_started"));
			onChanged();
			setLoginPolling(true);
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setPending(null);
		}
	}
	async function handleLogout() {
		setPending("logout");
		setLoginPolling(false);
		try {
			await codexLogout(subscriptionOnly);
			pushToast("info", t("apikeys_codex.disconnected"));
			onChanged();
			window.dispatchEvent(new CustomEvent("jarvis:realtime-switched"));
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setPending(null);
		}
	}
	if (loginReady && status) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-testid": "codex-connected",
			className: "flex flex-wrap items-center gap-2 rounded-md border border-muted-foreground/30 bg-muted-foreground/[0.06] px-3 py-2 text-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 break-words text-foreground",
					children: subscriptionOnly ? t("apikeys_codex.connected_chatgpt") : status.message ?? t("apikeys_codex.connected_chatgpt")
				}),
				status.version && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
					className: "rounded bg-muted px-1.5 py-0.5 font-mono",
					children: status.version
				}),
				status.mode === "chatgpt" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "chip-yellow",
					children: "CHATGPT-LOGIN"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: handleLogout,
					disabled: pending !== null,
					className: "ml-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), t("apikeys_codex.disconnect")]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md border border-border bg-background p-3 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: subscriptionOnly ? t(subscriptionStatusKey) : status?.message ?? t("apikeys_codex.status_loading") }), status?.version && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "rounded bg-muted px-1.5 py-0.5 font-mono",
						children: status.version
					})]
				}), subscriptionOnly && (status?.reason_code === "setup_invalid" || status?.reason_code === "not_installed" || status?.reason_code === "plan_unsupported" || status?.reason_code === "lifecycle_unavailable") && status.message && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-testid": "codex-setup-detail",
					className: "mt-2 break-words border-t border-border pt-2 font-mono text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mr-1 font-sans",
						children: t("apikeys_codex.setup_detail_label")
					}), status.message]
				})]
			}),
			!status?.installed && !CODEX_NO_INSTALL_PROMPT_REASONS.has(status?.reason_code ?? "") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
					className: "min-w-[220px] flex-1 rounded-md border border-border bg-muted px-3 py-1.5 font-mono text-xs",
					children: installCommand
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: handleCopy,
					disabled: pending === "copy",
					children: [pending === "copy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" }), t("apikeys_codex.copy_command")]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: handleLogin,
						disabled: pending !== null || loginPolling || status?.reason_code === "login_in_progress" || status?.reason_code === "lifecycle_unavailable" || !status?.installed && status?.reason_code !== "busy",
						title: status?.reason_code === "login_in_progress" ? t("apikeys_codex.status_login_in_progress") : status?.reason_code === "lifecycle_unavailable" ? t("apikeys_codex.status_lifecycle_unavailable") : void 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-3.5 w-3.5" }), t("apikeys_codex.connect_chatgpt")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "https://help.openai.com/en/articles/11381614",
							target: "_blank",
							rel: "noreferrer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "h-3.5 w-3.5" }), t("apikeys_codex.install_codex")]
						})
					}),
					(status?.reason_code === "plan_unsupported" || status?.reason_code === "setup_invalid") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: handleLogout,
						disabled: pending !== null,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), t("apikeys_codex.disconnect")]
					})
				]
			})
		]
	});
}
function AntigravityAuthWidget({ descriptor, onChanged }) {
	const t = useT();
	const [pending, setPending] = (0, import_react.useState)(null);
	const pushToast = useEventStore((s) => s.pushToast);
	const status = descriptor.antigravity_status;
	const installCommand = descriptor.install_hint ?? "curl -fsSL https://antigravity.google/cli/install.sh | bash";
	async function handleCopy() {
		setPending("copy");
		try {
			const copied = await robustCopy(installCommand);
			pushToast(copied ? "success" : "warning", copied ? "Install command copied" : installCommand);
		} finally {
			setPending(null);
		}
	}
	async function handleLogin() {
		setPending("login");
		try {
			await loginAntigravity();
			pushToast("info", t("apikeys_antigravity.login_started"));
			[
				1500,
				4e3,
				8e3,
				15e3,
				25e3
			].forEach((ms) => window.setTimeout(onChanged, ms));
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setPending(null);
		}
	}
	async function handleLogout() {
		setPending("logout");
		try {
			await logoutAntigravity();
			pushToast("info", t("apikeys_antigravity.disconnected"));
			onChanged();
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setPending(null);
		}
	}
	if (status?.connected) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-testid": "antigravity-connected",
			className: "flex flex-wrap items-center gap-2 rounded-md border border-muted-foreground/30 bg-muted-foreground/[0.06] px-3 py-2 text-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 break-words text-foreground",
					children: status.user_email ? t("apikeys_antigravity.connected_as").replace("{0}", status.user_email) : status.message || t("apikeys_antigravity.connected")
				}),
				status.version && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
					className: "rounded bg-muted px-1.5 py-0.5 font-mono",
					children: status.version
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "chip-yellow",
					children: "GOOGLE-LOGIN"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: handleLogout,
					disabled: pending !== null,
					className: "ml-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), "Disconnect"]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-md border border-border bg-background p-3 text-xs text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: status?.message ?? t("apikeys_antigravity.status_loading") }), status?.version && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "rounded bg-muted px-1.5 py-0.5 font-mono",
						children: status.version
					})]
				})
			}),
			!status?.installed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
					className: "min-w-[220px] flex-1 rounded-md border border-border bg-muted px-3 py-1.5 font-mono text-xs",
					children: installCommand
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: handleCopy,
					disabled: pending === "copy",
					children: [pending === "copy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" }), "Copy command"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: handleLogin,
					disabled: pending !== null || !status?.installed,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-3.5 w-3.5" }), "Connect with Google"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "https://antigravity.google",
						target: "_blank",
						rel: "noreferrer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "h-3.5 w-3.5" }), "Install Antigravity"]
					})
				})]
			})
		]
	});
}
var STATE_CHIP_TONE = {
	active: {
		wrap: "rounded-[4px] border border-border-strong px-1.5 text-micro font-semibold text-foreground-strong",
		dot: null
	},
	ready: {
		wrap: "text-muted-foreground",
		dot: "bg-muted-foreground"
	},
	missing: {
		wrap: "text-destructive",
		dot: "bg-destructive"
	},
	neutral: {
		wrap: "text-muted-foreground",
		dot: "bg-muted-foreground/50"
	}
};
function StateChip({ tone, title, children }) {
	const meta = STATE_CHIP_TONE[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		title,
		className: cn("inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs leading-5", meta.wrap),
		children: [meta.dot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": "true",
			className: cn("h-[7px] w-[7px] rounded-full", meta.dot)
		}), children]
	});
}
function Tag({ tone, title, children, ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		...rest,
		title,
		className: cn("inline-flex shrink-0 items-center rounded-[4px] border px-1.5 text-micro font-semibold leading-[18px] tracking-[0.06em]", tone === "accent" && "border-border-strong text-foreground-strong", tone === "neutral" && "border-border text-muted-foreground", tone === "warn" && "border-border-strong text-foreground"),
		children
	});
}
const PROVIDER_STATE_CHIPS = {
	active: {
		tone: "active",
		key: "apikeys_view.state_active"
	},
	ready: {
		tone: "ready",
		key: "apikeys_view.state_ready"
	},
	key_saved: {
		tone: "neutral",
		key: "apikeys_view.state_key_saved"
	},
	no_key: {
		tone: "neutral",
		key: "apikeys_view.state_no_key"
	},
	not_working: {
		tone: "missing",
		key: "apikeys_view.state_not_working"
	},
	not_installed: {
		tone: "missing",
		key: "apikeys_view.state_not_installed"
	},
	local: {
		tone: "neutral",
		key: "apikeys_view.state_local"
	},
	checking: {
		tone: "neutral",
		key: "apikeys_view.state_checking"
	},
	unavailable: {
		tone: "neutral",
		key: "apikeys_view.state_unavailable"
	},
	blocked: {
		tone: "missing",
		key: "apikeys_view.state_blocked"
	},
	missing: {
		tone: "missing",
		key: "apikeys_view.state_missing"
	},
	not_connected: {
		tone: "neutral",
		key: "apikeys_view.state_not_connected"
	},
	open: {
		tone: "neutral",
		key: "apikeys_view.state_open"
	}
};
function providerStateChip(descriptor, verification = null) {
	if (descriptor.active && descriptor.configured) return "active";
	if (descriptor.auth_mode === "codex") {
		const status = descriptor.codex_status;
		if (status?.reason_code === "busy") return "checking";
		if (status?.reason_code === "lifecycle_unavailable") return "unavailable";
		if (status?.reason_code === "plan_unsupported") return "blocked";
		if (!status?.installed) return "missing";
		return descriptor.configured ? "ready" : "not_connected";
	}
	if (descriptor.auth_mode === "antigravity") {
		const status = descriptor.antigravity_status;
		if (!status?.installed) return "missing";
		return status.connected ? "ready" : "not_connected";
	}
	if (verification === "failed") return "not_working";
	if (verification === "ok" && descriptor.configured) return "ready";
	if (descriptor.local_runtime) return descriptor.local_runtime.ready ? "ready" : "not_installed";
	if (descriptor.managed_server) return descriptor.managed_server.ready ? "ready" : "not_installed";
	if (descriptor.voice_engine) return descriptor.voice_engine.installed ? "ready" : "not_installed";
	if (descriptor.auth_mode === "none") return "local";
	return descriptor.configured ? "key_saved" : "no_key";
}
function StatusBadge({ descriptor }) {
	const t = useT();
	const tested = useProviderTestStore((s) => s.results[descriptor.id]);
	const chip = PROVIDER_STATE_CHIPS[providerStateChip(descriptor, verificationOf(tested))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateChip, {
		tone: chip.tone,
		title: tested?.detail || void 0,
		children: t(chip.key)
	});
}
export { Cpu as a, useTierHealth as i, ProviderTestControl as n, makeProviderCategories as r, ProviderCategory as t };
