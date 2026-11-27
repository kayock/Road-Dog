const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/CompanionEditor-DhymGKvY.js","assets/index-BOzhgzD7.js","assets/index-CA6QM4ps.css","assets/switch-hmH-TV55.js","assets/check-vbwKkbPq.js","assets/image-up-JXfip9X_.js","assets/lock-ByyvnTXx.js","assets/save-muG05xK1.js","assets/shuffle-DXk0Yi_k.js","assets/petStage-CMRGLgJ7.js","assets/CompanionMark-BvabJfVP.js","assets/appearance-CnI1Xhkn.js","assets/CompanionMark-kAm6WwP_.css","assets/progressionApi-DG7iMoRa.js"])))=>i.map(i=>d[i]);
import { t as ProviderLogo } from "./ProviderLogo-BxoN_q6P.js";
import { Bc as require_jsx_runtime, Cn as Portal, Ln as cn, Sn as Overlay, Tn as Title, Xc as require_react, bn as Content, cc as __vitePreload, ji as LoaderCircle, ln as Button, m as useCreateAgentDialog, oc as useT, si as X, tl as __toESM, wn as Root, xn as Description, yi as RefreshCw } from "./index-BOzhgzD7.js";
import { t as AgentMark } from "./AgentMark-Bw7Rhl-a.js";
import "./combobox-BL3mwl7r.js";
import { t as BrandedSelect } from "./select-vogX_D37.js";
import { C as accountChoice, a as blockedReasonKey, b as runtimeSeats, c as providerChoices, d as useModelAccess, i as accessModels, o as defaultModel, s as pickableOption, t as useModelMenuData, v as modelSeats, w as accountHint } from "./useModelMenuData-TwmHE5pI.js";
import "./agentProviderPrefs-3Ey03m7Z.js";
import { i as defaultCompanion } from "./appearance-CnI1Xhkn.js";
import "./figureRecipe-BRnaWN-p.js";
import { i as useCreateSocietyAgent, n as RuntimeProviderUnsupported, t as AgentNameTaken } from "./data-v-6nxr7Q.js";
import "./RuntimeBadge-BWtE1Tji.js";
import { r as useAgentRuntimes, t as RuntimeChoice } from "./RuntimePicker-CMMIBgVm.js";
import { t as Input } from "./input-DXuNAC9g.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function AccessChoice({ options, value, hint, disabled, onChange }) {
	const t = useT();
	const id = (0, import_react.useId)();
	const buttons = (0, import_react.useRef)([]);
	const open = options.filter((option) => !option.blocked);
	const focusKind = open.some((option) => option.kind === value) ? value : open[0]?.kind ?? "";
	function onKeyDown(event, kind) {
		const step = {
			ArrowRight: 1,
			ArrowDown: 1,
			ArrowLeft: -1,
			ArrowUp: -1
		}[event.key];
		if (!step || open.length < 2) return;
		event.preventDefault();
		const next = open[(open.findIndex((option) => option.kind === kind) + step + open.length) % open.length];
		onChange(next.kind);
		buttons.current[options.indexOf(next)]?.focus();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1.5 text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				id: `${id}-label`,
				children: t("society.create_agent.access_label")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 rounded-lg border border-border p-1",
				role: "radiogroup",
				"aria-labelledby": `${id}-label`,
				"aria-describedby": hint ? `${id}-hint` : void 0,
				"data-testid": "create-agent-access",
				children: options.map((entry, index) => {
					const checked = entry.kind === value && !entry.blocked;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						ref: (node) => {
							buttons.current[index] = node;
						},
						type: "button",
						role: "radio",
						"aria-checked": checked,
						"aria-describedby": entry.blocked ? `${id}-blocked-${entry.kind}` : void 0,
						tabIndex: entry.kind === focusKind && !entry.blocked ? 0 : -1,
						disabled: disabled || Boolean(entry.blocked),
						onClick: () => onChange(entry.kind),
						onKeyDown: (event) => onKeyDown(event, entry.kind),
						className: cn("min-w-0 flex-1 truncate rounded-md px-3 py-1.5 text-sm transition-colors disabled:opacity-50", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", checked ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground", entry.blocked && "line-through hover:bg-transparent hover:text-muted-foreground"),
						children: t(`society.create.kind_${entry.kind}`)
					}, entry.kind);
				})
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				id: `${id}-hint`,
				className: "text-xs text-muted-foreground",
				children: hint
			}) : null,
			options.filter((entry) => entry.blocked).map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				id: `${id}-blocked-${entry.kind}`,
				role: "note",
				className: "text-xs text-warning",
				"data-testid": `create-agent-access-blocked-${entry.kind}`,
				children: t(blockedReasonKey(entry.blocked ?? ""))
			}, entry.kind))
		]
	});
}
var CompanionEditor = (0, import_react.lazy)(() => __vitePreload(() => import("./CompanionEditor-DhymGKvY.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13])).then((m) => ({ default: m.CompanionEditor })));
var SEARCH_FROM = 12;
function list(value) {
	return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
}
function randomCompanion() {
	return defaultCompanion(`${Date.now()}:${Math.random()}`);
}
function CreateAgentDialogHost() {
	return useCreateAgentDialog((s) => s.open) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateAgentDialog, {}) : null;
}
function CreateAgentDialog() {
	const t = useT();
	const { finish, cancel } = useCreateAgentDialog.getState();
	const createAgent = useCreateSocietyAgent();
	const runtimes = useAgentRuntimes();
	const [name, setName] = (0, import_react.useState)("");
	const [runtime, setRuntime] = (0, import_react.useState)("jarvis");
	const [providerId, setProviderId] = (0, import_react.useState)("");
	const [access, rememberAccess] = useModelAccess();
	const [model, setModel] = (0, import_react.useState)("");
	const [account, setAccount] = (0, import_react.useState)("");
	const [accountProvider, setAccountProvider] = (0, import_react.useState)("");
	const [companion, setCompanion] = (0, import_react.useState)(randomCompanion);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const menu = useModelMenuData(null, void 0, account && accountProvider ? { [accountProvider]: account } : {}, { refreshOnMount: true });
	const external = runtime !== "jarvis";
	const defaultModelLabel = t("agent_chat.model_default");
	const data = runtimes.data;
	const supportedKey = list(data?.supported_providers).join(",");
	const gatewayKey = list(data?.subscription_providers).join(",");
	const loginKey = list(data?.login_providers).join(",");
	const accessKey = JSON.stringify(data?.access && typeof data.access === "object" ? data.access : {});
	const blockedKey = JSON.stringify(external && data?.access_blocked && typeof data.access_blocked === "object" ? data.access_blocked : {});
	const choices = (0, import_react.useMemo)(() => {
		const all = modelSeats(menu.options, Array.isArray(menu.providers) ? menu.providers : [], menu.live, defaultModelLabel);
		const split = (key) => key.split(",").filter(Boolean);
		return providerChoices(external ? runtimeSeats(all, split(supportedKey), split(gatewayKey), split(loginKey)) : all, JSON.parse(accessKey), external, JSON.parse(blockedKey));
	}, [
		menu.options,
		menu.providers,
		menu.live,
		defaultModelLabel,
		external,
		supportedKey,
		gatewayKey,
		loginKey,
		accessKey,
		blockedKey
	]);
	const chosen = choices.find((choice) => choice.id === providerId) ?? choices.find((choice) => pickableOption(choice)) ?? choices[0] ?? null;
	const option = pickableOption(chosen, chosen ? access[chosen.id] : void 0);
	const models = accessModels(option);
	const accounts = accountChoice(option?.seat ?? null);
	const modelValue = models.some((entry) => entry.id === model) ? model : defaultModel(option);
	const accountValue = option?.seat.provider.id === accountProvider && accounts.some((entry) => entry.id === account) ? account : "";
	(0, import_react.useEffect)(() => {
		setModel("");
	}, [`${chosen?.id ?? ""}|${option?.kind ?? ""}|${accountValue}`]);
	const needsProvider = external && !option;
	const accountBlocked = Boolean(account && accountProvider === option?.seat.provider.id && (accountValue !== account || menu.loading || menu.failed));
	const selectedModelsFailed = Boolean(option && menu.modelErrors?.includes(option.seat.provider.id));
	const canCreate = !saving && !needsProvider && !accountBlocked && !selectedModelsFailed && (!option || models.length > 0);
	async function submit() {
		if (!canCreate) return;
		setSaving(true);
		setError(null);
		try {
			finish(await createAgent({
				name,
				runtime,
				provider: option?.seat.provider.id,
				model: option ? modelValue : void 0,
				accountId: option ? accountValue || option.accountId : void 0,
				companion
			}));
		} catch (exc) {
			setError(exc instanceof AgentNameTaken ? t("society.create_agent.name_taken") : exc instanceof RuntimeProviderUnsupported ? t("society.runtime.provider_unsupported") : exc instanceof Error ? exc.message : String(exc));
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		open: true,
		onOpenChange: (next) => {
			if (!next && !saving) cancel();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 z-50 bg-scrim/60 backdrop-blur-sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
			"data-testid": "create-agent-dialog",
			className: "fixed left-1/2 top-1/2 z-50 flex max-h-[90dvh] w-[min(560px,calc(100vw-24px))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-border bg-popover text-foreground shadow-float",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-3 border-b border-border p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
						className: "font-semibold",
						children: t("society.create_agent.title")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
						className: "text-sm text-muted-foreground",
						children: t("society.create_agent.subtitle")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": t("society.card.close"),
					onClick: () => {
						if (!saving) cancel();
					},
					className: "rounded p-2 hover:bg-secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex min-h-0 flex-col",
				onSubmit: (event) => {
					event.preventDefault();
					submit();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-0 flex-col gap-5 overflow-y-auto p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1.5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: t("society.create_agent.name_label")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								autoFocus: true,
								value: name,
								maxLength: 40,
								onChange: (event) => setName(event.target.value),
								placeholder: t("society.create_agent.name_placeholder"),
								disabled: saving,
								"data-testid": "create-agent-name"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: t("society.create_agent.type_label")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuntimeChoice, {
									value: runtime,
									onChange: (next) => {
										setRuntime(next);
										setAccount("");
									},
									disabled: saving
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: t("society.create_agent.type_fixed")
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: t("society.create_agent.provider_label")
							}), chosen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedSelect, {
								value: chosen.id,
								onValueChange: (next) => {
									setProviderId(next);
									setAccount("");
								},
								ariaLabel: t("society.create_agent.provider_label"),
								disabled: saving,
								testId: "create-agent-provider",
								options: choices.map((choice) => ({
									value: choice.id,
									label: choice.label,
									icon: choice.mark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentMark, {
										agent: choice.mark,
										label: choice.label,
										logoUrl: choice.logoUrl,
										variant: "plain",
										size: "sm"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderLogo, {
										providerId: choice.logo,
										label: choice.label,
										size: "sm"
									})
								}))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: menu.loading ? t("society.create.catalog_loading") : t(external ? "society.create_agent.no_provider" : "society.create_agent.no_provider_jarvis")
							})]
						}),
						chosen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessChoice, {
							options: chosen.options,
							value: option?.kind ?? "",
							hint: option ? t(option.extraUsage ? "society.create_agent.access_extra_usage" : `society.create_agent.access_hint_${option.kind}`) : "",
							disabled: saving,
							onChange: (next) => {
								rememberAccess(chosen.id, next);
								setAccount("");
							}
						}) : null,
						chosen && option && accounts.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: t("society.create_agent.account_label")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedSelect, {
								value: accountValue,
								onValueChange: (next) => {
									setAccountProvider(option.seat.provider.id);
									setAccount(next);
									setModel("");
								},
								ariaLabel: t("society.create_agent.account_label"),
								disabled: saving,
								testId: "create-agent-account",
								options: [{
									value: "",
									label: t("society.create_agent.active_account")
								}, ...accounts.map((entry) => ({
									value: entry.id,
									label: entry.label,
									hint: accountHint(entry)
								}))]
							})]
						}) : null,
						chosen && option ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: t("society.create_agent.model_label")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: saving || menu.refreshing,
										onClick: () => void Promise.all([menu.refresh(), runtimes.refetch()]),
										"aria-label": t("society.chat.model_refresh"),
										title: t("society.chat.model_refresh"),
										className: "rounded p-1 text-muted-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
										children: menu.refreshing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											className: "h-3.5 w-3.5 animate-spin",
											"aria-hidden": true
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
											className: "h-3.5 w-3.5",
											"aria-hidden": true
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedSelect, {
									value: modelValue,
									onValueChange: setModel,
									ariaLabel: t("society.create_agent.model_label"),
									placeholder: t("agent_chat.no_models"),
									disabled: saving || accountBlocked || models.length === 0,
									testId: "create-agent-model",
									searchPlaceholder: models.length >= SEARCH_FROM ? t("society.create_agent.model_search") : void 0,
									options: models.map((entry) => ({
										value: entry.id,
										label: entry.label || entry.id || defaultModelLabel
									}))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: t("society.create_agent.model_hint")
								}),
								menu.refreshing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									role: "status",
									className: "text-xs text-muted-foreground",
									children: t("society.chat.models_loading")
								}) : null,
								menu.refreshFailed || selectedModelsFailed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									role: "alert",
									className: "text-xs text-destructive",
									children: t("society.chat.model_load_failed")
								}) : null
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: t("society.create_agent.companion_label")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "-mx-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
									fallback: null,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanionEditor, {
										value: companion,
										onChange: setCompanion,
										disabled: saving
									})
								})
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-border p-4",
					children: [
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							className: "mr-auto text-sm text-destructive",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							onClick: () => cancel(),
							disabled: saving,
							children: t("society.create_agent.cancel")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: !canCreate,
							"data-testid": "create-agent-submit",
							children: t(saving ? "society.create_agent.creating" : "society.create_agent.create")
						})
					]
				})]
			})]
		})] })
	});
}
export { CreateAgentDialogHost };
