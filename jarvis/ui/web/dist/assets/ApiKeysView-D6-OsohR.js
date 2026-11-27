import { t as Check } from "./check-vbwKkbPq.js";
import { t as ChevronRight } from "./chevron-right-BjVJ-R2c.js";
import { a as fetchAgentUsage, c as groupFor, d as setActiveAgentAccount, f as startLoginFlow, g as ClipboardPaste, i as fetchAgentAccounts, l as loginAgentAccount, n as createAgentAccount, p as submitLoginFlowCode, r as deleteAgentAccount, s as getLoginFlow, t as cancelLoginFlow, u as renameAgentAccount } from "./agentAccountsApi-BSjGK707.js";
import { n as ProviderTestControl } from "./ProviderTierSection-BgNdnN0l.js";
import { t as CreditCard } from "./credit-card-BNX9a4vc.js";
import { t as EyeOff } from "./eye-off-DCMC9NUY.js";
import { t as FlaskConical } from "./flask-conical-BH493MkU.js";
import { t as Gauge } from "./gauge-CZtFz7IZ.js";
import { t as ProviderLogo } from "./ProviderLogo-BxoN_q6P.js";
import { t as Lock } from "./lock-ByyvnTXx.js";
import { t as LogIn } from "./log-in-BJs4e2l4.js";
import { t as LogOut } from "./log-out-CV5z6kDy.js";
import { t as PencilLine } from "./pencil-line-iI9lAOdU.js";
import { t as Pencil } from "./pencil-CD-5mlhp.js";
import { $n as logoutClaude, Bc as require_jsx_runtime, Bi as Eye, Bn as codexLogout, Cn as Portal, Et as openExternalUrl, F as robustCopy, Fr as useProviders, Gs as fill, Gt as takeApiKeysAnchor, Ht as MISSION_BILLING_ANCHOR, I as robustPaste, Ir as useSectionHealth, Kt as takeRequestedApiKeysTab, Ln as cn, Nr as testAgentCli, Oc as useQuery, Pi as KeyRound, Qn as logoutAntigravity, Sc as spreadDelay, Sn as Overlay, Sr as startCodexLogin, Tn as Title, To as recheckAgent, Ui as Download, Vi as ExternalLink, Vn as deleteSecret, Vt as APIKEYS_TAB_EVENT, Wi as Copy, Ws as useRestartApp, Xc as require_react, Xn as loginClaude, Yn as loginAntigravity, Zn as loginGrokBuild, bi as Plus, bn as Content, er as logoutGrokBuild, fs as fetchAgentChatCatalog, hs as fetchProviderModels, ji as LoaderCircle, jr as switchSubagentProvider, li as TriangleAlert, ln as Button, mr as postSecret, nc as useLocaleChunk, oc as useT, si as X, tl as __toESM, ui as Trash2, wc as useEventStore, wn as Root, xc as requestConnect, xn as Description, xr as setCodexBinaryPath, yi as RefreshCw, zc as useQueryClient } from "./index-BOzhgzD7.js";
import "./combobox-BL3mwl7r.js";
import { t as BrandedSelect } from "./select-vogX_D37.js";
import { t as Switch } from "./switch-hmH-TV55.js";
import { a as saveAgentProviderPrefs, n as EMPTY_AGENT_PROVIDER_PREFS, o as toggled, r as fetchAgentProviderPrefs, s as useSavedHiddenModels, t as AGENT_PROVIDER_PREFS_KEY } from "./agentProviderPrefs-3Ey03m7Z.js";
import { n as keyMatchesSecret } from "./ApiKeyForm-DwgnNKoR.js";
import { t as Input } from "./input-DXuNAC9g.js";
import { t as PageHeader } from "./PageHeader-DcwsywY0.js";
import { t as Textarea } from "./textarea-DCOpWmsX.js";
import { o as saveMissionBilling, r as fetchMissionBilling, t as MISSION_BILLING_KEY } from "./api-DUhJTX6A.js";
import { n as SettingsField, r as settingsInputCls, t as SettingsBlock } from "./SettingsBlock-Lvn1e90l.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function SettingsSection({ title, icon, headerAction, plain = false, children, className, ...props }) {
	const headingId = (0, import_react.useId)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-labelledby": headingId,
		...props,
		className: cn("space-y-2.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-7 items-center justify-between gap-4 px-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				id: headingId,
				className: "flex min-h-7 min-w-0 items-center gap-2 text-sm font-normal text-foreground/70",
				children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: title
				})]
			}), headerAction ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-w-7 shrink-0 items-center justify-end gap-1",
				children: headerAction
			}) : null]
		}), plain ? children : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsGroup, { children })]
	});
}
function SettingsGroup({ divided = true, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		...props,
		className: cn("relative overflow-hidden rounded-xl border border-border/60 bg-card/40 text-foreground", divided && "[&>*+*]:border-t [&>*+*]:border-border/50", className)
	});
}
function SettingsRow({ title, description, status, control, children, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		...props,
		"data-slot": "settings-row",
		className: cn("px-4 py-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(10rem,auto)] sm:items-center sm:gap-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 space-y-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "flex min-h-5 items-center gap-1.5 text-sm font-medium text-foreground",
						children: title
					}),
					description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xl text-xs leading-normal text-muted-foreground/80",
						children: description
					}) : null,
					status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-0.5 text-xs text-muted-foreground",
						children: status
					}) : null
				]
			}), control ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex w-full min-w-0 shrink-0 items-center gap-2 sm:w-auto sm:justify-end",
				children: control
			}) : null]
		}), children ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pt-3",
			children
		}) : null]
	});
}
function MasterDetail({ list, detail, testId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsGroup, {
		divided: false,
		"data-testid": testId,
		className: "md:grid md:h-[calc(100dvh-17.5rem)] md:min-h-[24rem] md:grid-cols-[17rem_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-b border-border/60 bg-secondary/30 md:min-h-0 md:overflow-y-auto md:border-b-0 md:border-r scrollbar-jarvis",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "divide-y divide-border/50",
				children: list
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-w-0 md:min-h-0 md:overflow-y-auto scrollbar-jarvis",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-6 p-4",
				children: detail
			})
		})]
	});
}
function ListRow({ icon, name, version, status, dot, selected, dimmed, onSelect, trailing, testId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": testId,
		className: cn("group flex min-h-[4.5rem] items-center gap-3 px-4 py-3 transition-colors", selected ? "bg-secondary" : "hover:bg-secondary/50"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("relative flex min-w-0 flex-1 items-start gap-3 rounded-md text-left transition-opacity", dimmed && !selected && "opacity-60 group-hover:opacity-100"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "absolute inset-0 cursor-pointer rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring",
					onClick: onSelect,
					"aria-label": name,
					"aria-pressed": selected
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pointer-events-none mt-0.5 flex shrink-0",
					children: icon
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "pointer-events-none min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex min-w-0 items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-sm font-medium text-foreground",
							children: name
						}), version ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "max-w-24 shrink-0 truncate text-xs text-muted-foreground",
							children: version
						}) : null]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-0.5 flex items-start gap-1.5 text-xs leading-normal text-muted-foreground/80",
						children: [dot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-[1.45em] shrink-0 items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								className: cn("h-1.5 w-1.5 rounded-full", dot === "error" ? "bg-destructive" : "bg-warning")
							})
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "line-clamp-2 [overflow-wrap:anywhere]",
							children: status
						})]
					})]
				})
			]
		}), trailing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex h-5 shrink-0 items-center",
			children: trailing
		}) : null]
	});
}
function Segmented({ value, options, onChange, label, disabled, testId, size = "sm" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "radiogroup",
		"aria-label": label,
		"data-testid": testId,
		className: "inline-flex shrink-0 rounded-lg border border-border/60 bg-card/40 p-0.5",
		children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			role: "radio",
			"aria-checked": value === option.value,
			disabled: disabled || option.disabled,
			onClick: () => value !== option.value && onChange(option.value),
			className: cn(size === "xs" ? "h-6 rounded-md px-2 text-xs font-medium transition-colors" : "h-7 rounded-md px-3 text-sm font-medium transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", value === option.value ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"),
			children: option.label
		}, option.value))
	});
}
function ModelList({ header, action, children, testId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsGroup, {
		divided: false,
		"data-testid": testId,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-10 items-center justify-between gap-4 border-b border-border/50 px-4 py-2 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: header }), action]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "max-h-[22rem] overflow-y-auto py-1 scrollbar-jarvis",
			children
		})]
	});
}
function ModelListRow({ name, id, note, control, muted, onClick, selected, disabled }) {
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: cn("flex min-w-0 flex-1 items-baseline gap-2", muted && "opacity-60"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate text-sm text-foreground",
				children: name
			}), id && id !== name ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
				className: "truncate text-xs text-muted-foreground",
				children: id
			}) : null]
		}),
		note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden shrink-0 text-xs text-muted-foreground sm:inline",
			children: note
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex h-5 shrink-0 items-center",
			children: control
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: onClick ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		role: "radio",
		"aria-checked": Boolean(selected),
		"aria-label": name,
		disabled,
		onClick,
		className: cn("flex w-full items-center gap-3 px-4 py-2 text-left transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring disabled:cursor-not-allowed", selected ? "bg-secondary/70" : "hover:bg-secondary/40"),
		children: body
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center gap-3 px-4 py-2",
		children: body
	}) });
}
function DetailHeader({ icon, name, version }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-7 items-center justify-between gap-4 px-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "flex min-w-0 items-center gap-2 text-sm font-normal text-foreground/70",
			children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: name
			})]
		}), version ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
			className: "truncate text-xs text-muted-foreground",
			children: version
		}) : null]
	});
}
function LiveSubscriptionAccount({ group, accountId, loading, disabled, voiceStatus, onAccountChange, onConnected }) {
	const t = useT();
	const restart = useRestartApp();
	const selectedId = accountId || group?.active_account || "";
	const account = group?.accounts.find((entry) => entry.id === selectedId);
	const connected = account?.connected && account.mode === "subscription";
	const [flow, setFlow] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [code, setCode] = (0, import_react.useState)("");
	const [cliMissing, setCliMissing] = (0, import_react.useState)(false);
	const [installing, setInstalling] = (0, import_react.useState)(false);
	const [installNeedsRestart, setInstallNeedsRestart] = (0, import_react.useState)(false);
	const installController = (0, import_react.useRef)(null);
	const flowRef = (0, import_react.useRef)(null);
	const onConnectedRef = (0, import_react.useRef)(onConnected);
	onConnectedRef.current = onConnected;
	const generation = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		generation.current += 1;
		setFlow(null);
		setError("");
		setCode("");
		setBusy(false);
		setCliMissing(false);
		setInstalling(false);
		setInstallNeedsRestart(false);
		return () => {
			generation.current += 1;
			installController.current?.abort();
			installController.current = null;
			const current = flowRef.current;
			flowRef.current = null;
			if (current && !current.finished) cancelLoginFlow(current.flow_id).catch(() => {});
		};
	}, [selectedId]);
	function accept(next) {
		flowRef.current = next;
		setFlow(next);
		if (next.status === "success") onConnectedRef.current();
	}
	(0, import_react.useEffect)(() => {
		if (!flow || flow.finished) return;
		let disposed = false;
		const current = generation.current;
		const cancel$1 = requestConnect(() => {
			getLoginFlow(flow.flow_id).then((next) => {
				if (disposed || generation.current !== current) return;
				flowRef.current = next;
				setFlow(next);
				if (next.status === "success") onConnectedRef.current();
			}).catch(() => {
				if (disposed || generation.current !== current) return;
				setError(t("live.subscription_login_failed"));
				setFlow(null);
			});
		}, spreadDelay(1500));
		return () => {
			disposed = true;
			cancel$1();
		};
	}, [flow, t]);
	async function signIn(afterInstall = false, signal) {
		if (!selectedId || busy) return;
		const current = generation.current;
		setBusy(true);
		setError("");
		try {
			const response = await fetch("/api/live/login-helper", {
				cache: "no-store",
				signal
			});
			if (generation.current !== current || signal?.aborted) return;
			if (response.status === 404) {
				const existing = await recheckAgent("codex");
				if (generation.current !== current || signal?.aborted) return;
				if (existing.installed === false) {
					setCliMissing(true);
					setInstallNeedsRestart(true);
					return;
				}
				if (existing.installed !== true) throw new Error("Invalid local CLI status");
			} else {
				if (!response.ok) throw new Error("Sign-in helper status unavailable");
				const status = await response.json();
				if (generation.current !== current || signal?.aborted) return;
				if (status.status === "missing" && status.installed === false) {
					setCliMissing(true);
					setInstallNeedsRestart(false);
					if (afterInstall) setError(t("live.subscription_install_failed"));
					return;
				}
				if (status.status !== "ready" || status.installed !== true) throw new Error("Invalid sign-in helper status");
			}
			setCliMissing(false);
			const next = await startLoginFlow(selectedId);
			if (generation.current !== current || signal?.aborted) {
				if (!next.finished) await cancelLoginFlow(next.flow_id);
				return;
			}
			accept(next);
		} catch {
			if (generation.current === current) setError(t(afterInstall && signal?.aborted ? "live.subscription_install_failed" : "live.subscription_login_failed"));
		} finally {
			if (generation.current === current) setBusy(false);
		}
	}
	async function install() {
		if (busy || !selectedId || installController.current) return;
		const current = generation.current;
		const controller = new AbortController();
		installController.current = controller;
		setInstalling(true);
		setInstallNeedsRestart(false);
		setError("");
		const timeout = window.setTimeout(() => controller.abort(), 19e4);
		try {
			const response = await fetch("/api/live/login-helper", {
				method: "POST",
				signal: controller.signal
			});
			if (generation.current !== current || controller.signal.aborted) return;
			if (response.status === 404) {
				setInstallNeedsRestart(true);
				return;
			}
			if (!response.ok) throw new Error("Sign-in helper installation failed");
			if ((await response.json()).status !== "ready") throw new Error("Sign-in helper is not ready");
			if (generation.current !== current || controller.signal.aborted) return;
			await signIn(true, controller.signal);
		} catch {
			if (generation.current === current) setError(t("live.subscription_install_failed"));
		} finally {
			window.clearTimeout(timeout);
			if (installController.current === controller) installController.current = null;
			if (generation.current === current) setInstalling(false);
		}
	}
	function cancelInstall() {
		generation.current += 1;
		installController.current?.abort();
		installController.current = null;
		setInstalling(false);
		setBusy(false);
		setError("");
	}
	async function submit() {
		if (!flow || !code.trim() || busy) return;
		const current = generation.current;
		setBusy(true);
		setError("");
		try {
			const next = await submitLoginFlowCode(flow.flow_id, code.trim());
			if (generation.current === current) {
				accept(next);
				setCode("");
			}
		} catch {
			if (generation.current === current) setError(t("live.subscription_login_failed"));
		} finally {
			if (generation.current === current) setBusy(false);
		}
	}
	async function cancel() {
		if (!flow || busy) return;
		generation.current += 1;
		setBusy(true);
		try {
			await cancelLoginFlow(flow.flow_id);
			flowRef.current = null;
			setFlow(null);
		} catch {
			setError(t("live.subscription_login_failed"));
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-medium text-foreground",
							children: t("live.subscription_account")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							role: "status",
							className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								className: connected ? "h-1.5 w-1.5 rounded-full bg-success" : "h-1.5 w-1.5 rounded-full bg-border-strong"
							}), loading ? t("live.loading") : connected ? t("live.subscription_connected") : t("live.subscription_sign_in_required")]
						}),
						connected && voiceStatus === "unavailable" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-warning",
							children: t("live.subscription_voice_unavailable")
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedSelect, {
					className: "w-60",
					value: accountId,
					disabled: disabled || loading || busy || installing,
					ariaLabel: t("live.subscription_account"),
					onValueChange: onAccountChange,
					options: [{
						value: "",
						label: t("live.subscription_active_account")
					}, ...(group?.accounts ?? []).map((entry) => ({
						value: entry.id,
						label: entry.label
					}))]
				})]
			}),
			(!flow || flow.finished) && !connected ? cliMissing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "status",
						className: "text-xs leading-relaxed text-muted-foreground",
						children: t("live.subscription_install_required")
					}),
					installing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							role: "status",
							className: "flex items-center gap-2 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), t("live.subscription_installing")]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "sm",
							onClick: cancelInstall,
							children: t("common.cancel")
						})]
					}) : installNeedsRestart ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "status",
							className: "text-xs text-muted-foreground",
							children: t("settings_view.wake_word.restart_required")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							disabled: restart.restarting,
							onClick: () => void restart.restart(),
							children: restart.buttonLabel
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						disabled: disabled || busy || !selectedId,
						onClick: () => void install(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), t("live.subscription_install")]
					}),
					!installing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						disabled: disabled || busy,
						onClick: () => void signIn(),
						children: t("common.retry")
					}) : null
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				disabled: disabled || busy || !selectedId,
				onClick: () => void signIn(),
				children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, {}), t("live.subscription_sign_in")]
			}) : null,
			flow && !flow.finished ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 border-t border-border pt-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						role: "status",
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), t("agent_accounts.flow.waiting_browser")]
					}),
					flow.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => {
							openExternalUrl(flow.url).then((opened) => {
								if (!opened) setError(t("live.subscription_browser_failed"));
							});
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {}), t("agent_accounts.flow.open")]
					}) : null,
					flow.code_expected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "min-w-0 flex-1 space-y-1 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("agent_accounts.flow.code_placeholder") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: code,
								onChange: (event) => setCode(event.target.value),
								autoComplete: "off",
								spellCheck: false,
								className: "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							disabled: busy || !code.trim(),
							onClick: () => void submit(),
							children: t("agent_accounts.flow.submit")
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						disabled: busy,
						onClick: () => void cancel(),
						children: t("agent_accounts.flow.cancel")
					})
				]
			}) : null,
			flow?.status === "failed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-xs text-destructive",
				children: t("live.subscription_login_failed")
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-xs text-destructive",
				children: error
			}) : null
		]
	});
}
async function read(url, signal) {
	const response = await fetch(url, {
		cache: "no-store",
		signal
	});
	if (!response.ok) throw new Error(`GPT-Live: HTTP ${response.status}`);
	return response.json();
}
const liveProfileQuery = {
	queryKey: ["live-profile"],
	queryFn: ({ signal }) => read("/api/live/profile", signal)
};
async function saveLiveProfile(profile) {
	const response = await fetch("/api/live/profile", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			...profile,
			configured: true
		})
	});
	if (!response.ok) throw new Error((await response.json()).detail ?? `HTTP ${response.status}`);
}
var capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);
function LiveProfile({ onSaved, onAuthModeChange, selectedAuthMode, keyField } = {}) {
	const t = useT();
	const queryClient = useQueryClient();
	const restart = useRestartApp();
	const profile = useQuery(liveProfileQuery);
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [showInstructions, setShowInstructions] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const storedValue = draft ?? profile.data?.profile;
	const authMode = selectedAuthMode ?? storedValue?.auth_mode ?? "api_key";
	const supportsSubscription = profile.data?.profile.auth_mode !== void 0 && profile.data.subscription !== void 0;
	const value = storedValue && selectedAuthMode && (supportsSubscription || selectedAuthMode === "chatgpt_subscription") ? {
		...storedValue,
		auth_mode: selectedAuthMode
	} : storedValue;
	const subscription = authMode === "chatgpt_subscription";
	const accounts = useQuery({
		queryKey: ["live-subscription-accounts"],
		queryFn: fetchAgentAccounts,
		enabled: subscription && supportsSubscription,
		staleTime: 3e4,
		retry: false
	});
	const group = accounts.data?.platforms.find((entry) => entry.platform === "codex");
	const accountId = value?.subscription_account_id || group?.active_account || "";
	const account = group?.accounts.find((entry) => entry.id === accountId);
	const options = useQuery({
		queryKey: subscription ? [
			"live-options",
			authMode,
			accountId
		] : ["live-options"],
		queryFn: ({ signal }) => read(subscription ? `/api/live/options?auth_mode=chatgpt_subscription&account_id=${encodeURIComponent(accountId)}` : "/api/live/options", signal),
		enabled: Boolean(value) && (!subscription || supportsSubscription && Boolean(account?.connected && account.mode === "subscription")),
		staleTime: 3e5,
		retry: false
	});
	const profileLoaded = Boolean(value);
	const billingPending = authMode !== (profile.data?.profile.auth_mode ?? "api_key");
	(0, import_react.useEffect)(() => {
		if (profileLoaded) onAuthModeChange?.(authMode, billingPending);
	}, [
		authMode,
		billingPending,
		onAuthModeChange,
		profileLoaded
	]);
	(0, import_react.useEffect)(() => {
		const credentialsChanged = () => {
			queryClient.invalidateQueries({ queryKey: ["live-profile"] });
		};
		window.addEventListener("jarvis:secret-configured", credentialsChanged);
		return () => window.removeEventListener("jarvis:secret-configured", credentialsChanged);
	}, [queryClient]);
	if (!value) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "status",
		className: "px-1 text-sm text-muted-foreground",
		children: profile.error?.message ?? t("live.loading")
	});
	const update = (patch) => {
		setDraft({
			...value,
			...patch
		});
		setMessage("");
		setError("");
	};
	const saved = profile.data?.profile;
	const dirty = saved && JSON.stringify(value) !== JSON.stringify(saved);
	const sameCredentials = authMode === (saved?.auth_mode ?? "api_key") && (!subscription || (value.subscription_account_id ?? "") === (saved?.subscription_account_id ?? ""));
	const ready = Boolean(profile.data?.active && saved?.configured && sameCredentials);
	const credentialReady = subscription ? Boolean(supportsSubscription && account?.connected && account.mode === "subscription" && !accounts.isError) : Boolean(profile.data?.key_ready);
	const voice = subscription ? value.subscription_voice ?? "cove" : value.voice;
	const backendModel = subscription ? value.subscription_backend_model ?? "" : value.backend_model;
	const reasoningEffort = subscription ? value.subscription_reasoning_effort ?? "medium" : value.reasoning_effort;
	const models = options.data?.models ?? [];
	const selectedModel = models.find((model) => model.id === backendModel);
	const efforts = subscription && selectedModel?.efforts ? ["", ...selectedModel.efforts.filter(Boolean)] : options.data?.efforts ?? ["", reasoningEffort];
	const effortAvailable = !subscription || efforts.includes(reasoningEffort);
	const modelOptions = models.map((model) => ({
		value: model.id,
		label: model.label,
		hint: model.label === model.id ? void 0 : model.id
	}));
	if (!subscription && backendModel && !modelOptions.some((model) => model.value === backendModel)) modelOptions.unshift({
		value: backendModel,
		label: backendModel,
		hint: ""
	});
	async function refresh() {
		await Promise.all([queryClient.invalidateQueries({ queryKey: ["live-profile"] }), queryClient.invalidateQueries({ queryKey: ["voice-mode"] })]);
		window.dispatchEvent(new CustomEvent("jarvis:realtime-switched"));
		onSaved?.();
	}
	const choose = (patch) => {
		const next = {
			...value,
			...patch
		};
		setDraft(next);
		if (ready && credentialReady && !saving && (effortAvailable || patch.subscription_reasoning_effort !== void 0)) save(next);
	};
	const chooseModel = (selected) => {
		if (!subscription) {
			choose({ backend_model: selected });
			return;
		}
		const model = models.find((entry) => entry.id === selected);
		choose({
			subscription_backend_model: selected,
			subscription_reasoning_effort: reasoningEffort && model?.efforts && !model.efforts.includes(reasoningEffort) ? model.default_effort && model.efforts.includes(model.default_effort) ? model.default_effort : "" : reasoningEffort
		});
	};
	async function save(next) {
		const chosen = next ?? value;
		if (!chosen) return;
		if (chosen.auth_mode === "chatgpt_subscription" && !supportsSubscription) return;
		setSaving(true);
		setMessage("");
		setError("");
		try {
			await saveLiveProfile(chosen);
			await refresh();
			setDraft(null);
			setMessage(t("live.saved"));
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : String(cause));
		} finally {
			setSaving(false);
		}
	}
	async function useForAgents() {
		setSaving(true);
		setError("");
		try {
			const response = await fetch("/api/live/use-key-for-agent", { method: "POST" });
			if (!response.ok) throw new Error((await response.json()).detail);
			window.dispatchEvent(new CustomEvent("jarvis:subagent-switched"));
			await refresh();
			setMessage(t("live.agent_saved"));
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : String(cause));
		} finally {
			setSaving(false);
		}
	}
	const showSave = !ready || dirty;
	const statusText = billingPending ? t("live.billing_pending") : ready && !dirty ? t("live.ready") : credentialReady ? t("providers_page.voice_save_hint") : t(subscription ? "live.subscription_sign_in" : "live.key_required");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-label": "GPT-Live",
		className: "space-y-6",
		"data-testid": "live-profile",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-7 items-center justify-between gap-4 px-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex min-w-0 items-center gap-2 text-sm font-normal text-foreground/70",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderLogo, {
							providerId: "openai-live",
							label: "OpenAI",
							size: "sm",
							className: "h-5 w-5"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: "GPT-Live"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						"data-testid": ready && !dirty ? "live-profile-saved" : "live-profile-status",
						className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							className: ready && !dirty ? "h-1.5 w-1.5 rounded-full bg-success" : "h-1.5 w-1.5 rounded-full bg-warning"
						}), statusText]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsGroup, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
						title: t("providers_page.access_title"),
						control: selectedAuthMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted-foreground",
							children: subscription ? t("providers_page.access_subscription") : t("providers_page.access_api_key")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
							size: "xs",
							value: authMode,
							disabled: saving,
							label: t("live.billing_method"),
							testId: "live-access",
							onChange: (mode) => update({ auth_mode: mode }),
							options: [{
								value: "chatgpt_subscription",
								label: t("providers_page.access_subscription")
							}, {
								value: "api_key",
								label: t("providers_page.access_api_key")
							}]
						})
					}),
					!subscription && keyField,
					subscription && !supportsSubscription ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
						title: t("live.subscription_mode"),
						status: t("settings_view.wake_word.restart_required"),
						control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							disabled: restart.restarting,
							onClick: () => void restart.restart(),
							children: restart.buttonLabel
						})
					}) : null,
					subscription && supportsSubscription ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveSubscriptionAccount, {
							group,
							accountId: value.subscription_account_id ?? "",
							loading: accounts.isPending,
							disabled: saving,
							voiceStatus: profile.data?.subscription?.account_id === accountId ? profile.data.subscription.voice_status : "unverified",
							onAccountChange: (subscription_account_id) => update({ subscription_account_id }),
							onConnected: () => {
								queryClient.invalidateQueries({ queryKey: ["live-subscription-accounts"] });
								queryClient.invalidateQueries({ queryKey: ["live-profile"] });
								queryClient.invalidateQueries({ queryKey: ["live-options", "chatgpt_subscription"] });
							}
						}), accounts.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							className: "mt-2 text-xs text-destructive",
							children: t("live.subscription_accounts_failed")
						}) : null]
					}) : null
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSection, {
				title: t("live.conversation_heading"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
					title: t("live.voice"),
					control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedSelect, {
						className: "w-60",
						value: voice,
						disabled: saving || subscription && !options.data,
						onValueChange: (selected) => choose(subscription ? { subscription_voice: selected } : { voice: selected }),
						ariaLabel: t("live.voice"),
						options: (options.data?.voices ?? (subscription ? [] : [voice])).map((voice$1) => ({
							value: voice$1,
							label: capitalize(voice$1)
						}))
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsSection, {
				title: t("live.thinking_heading"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
						title: t("live.thinking_model"),
						control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedSelect, {
							className: "w-60",
							value: backendModel,
							disabled: saving || subscription && !options.data,
							onValueChange: chooseModel,
							ariaLabel: t("live.thinking_model"),
							placeholder: t("live.choose_model"),
							searchPlaceholder: t("live.search_models"),
							options: modelOptions
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
						title: t("live.reasoning"),
						control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandedSelect, {
							className: "w-60",
							value: reasoningEffort,
							disabled: saving,
							onValueChange: (selected) => choose(subscription ? { subscription_reasoning_effort: selected } : { reasoning_effort: selected }),
							ariaLabel: t("live.reasoning"),
							options: efforts.map((effort) => ({
								value: effort,
								label: effort ? capitalize(effort) : t("live.model_default")
							}))
						})
					}),
					!subscription && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
						title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "live-web-search",
							children: t("live.web_search")
						}),
						control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							id: "live-web-search",
							checked: value.web_search,
							disabled: saving,
							onCheckedChange: (web_search) => choose({ web_search }),
							"aria-label": t("live.web_search")
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsSection, {
				title: t("providers_page.instructions_title"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
					title: t("providers_page.instructions_row"),
					status: value.instructions.trim() || value.backend_instructions.trim() ? t("providers_page.instructions_set") : t("providers_page.instructions_none"),
					control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						"data-testid": "live-instructions-toggle",
						onClick: () => setShowInstructions((open) => !open),
						children: showInstructions ? t("providers_page.instructions_hide") : t("providers_page.instructions_edit")
					})
				}), showInstructions ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 px-4 py-3 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs text-muted-foreground",
								children: t("live.conversation_prompt")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 3,
								value: value.instructions,
								onChange: (event) => update({ instructions: event.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs text-muted-foreground",
								children: t("live.backend_prompt")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 3,
								value: value.backend_instructions,
								onChange: (event) => update({ backend_instructions: event.target.value })
							})]
						}),
						!subscription ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "space-y-1.5 md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs text-muted-foreground",
								children: t("live.custom_model")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: value.backend_model,
								onChange: (event) => update({ backend_model: event.target.value })
							})]
						}) : null
					]
				}) : null]
			}),
			(showSave || options.isError || error || message || !subscription && sameCredentials && saved?.configured && !profile.data?.agent_configured) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-end gap-3 px-1",
				children: [
					options.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "mr-auto text-xs text-destructive",
						children: t("live.options_failed")
					}) : null,
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "mr-auto text-xs text-destructive",
						children: error
					}) : null,
					message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "status",
						className: "mr-auto text-xs text-muted-foreground",
						children: message
					}) : null,
					!subscription && sameCredentials && saved?.configured && !profile.data?.agent_configured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						disabled: saving,
						onClick: () => void useForAgents(),
						children: t("live.use_for_agents")
					}),
					showSave ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						disabled: saving || !backendModel.trim() || !credentialReady || !effortAvailable || subscription && (!options.data || options.isError || !models.some((model) => model.id === backendModel)),
						onClick: () => void save(),
						children: [saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), ready ? t("live.save_changes") : t("live.save")]
					}) : null
				]
			})
		]
	});
}
var SUBSCRIPTION_STATUS_URL = {
	codex: "/api/codex/status",
	claude_cli: "/api/claude/status",
	antigravity: "/api/antigravity/status",
	grok_build: "/api/grok-build/status"
};
function subscriptionStatusUrl(kind) {
	return SUBSCRIPTION_STATUS_URL[kind];
}
function subscriptionConnected(status) {
	return Boolean(status?.connected) && status?.mode !== "api_key";
}
function subscriptionAccount(status) {
	if (!status) return null;
	const email = status.user_email ?? null;
	const plan = "account_label" in status ? status.account_label ?? null : null;
	return [email, plan && "subscription_type" in status ? plan : null].filter(Boolean).join(" · ") || null;
}
var REFRESH_EVENTS = [
	"jarvis:secret-configured",
	"jarvis:brain-switched",
	"jarvis:agent-switched",
	"jarvis:realtime-switched",
	"jarvis:provider-tested"
];
function useProviderFamilies() {
	const [families, setFamilies] = (0, import_react.useState)(null);
	const [subscriptions, setSubscriptions] = (0, import_react.useState)({});
	const [agents, setAgents] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [checkedAt, setCheckedAt] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const seq = (0, import_react.useRef)(0);
	const reload = (0, import_react.useCallback)(async () => {
		const mine = ++seq.current;
		setLoading(true);
		const json = async (url) => {
			try {
				const res = await fetch(url, { cache: "no-store" });
				return res.ok ? await res.json() : null;
			} catch {
				return null;
			}
		};
		const familyRequest = async () => {
			try {
				const res = await fetch("/api/providers/families", { cache: "no-store" });
				if (res.status === 404) return "missing";
				return res.ok ? await res.json() : null;
			} catch {
				return null;
			}
		};
		const kinds = Object.keys(SUBSCRIPTION_STATUS_URL);
		const [familyData, agentData, ...statuses] = await Promise.all([
			familyRequest(),
			json("/api/jarvis-agent/status"),
			...kinds.map((kind) => json(SUBSCRIPTION_STATUS_URL[kind]))
		]);
		if (mine !== seq.current) return;
		if (familyData && familyData !== "missing") {
			setFamilies(familyData.families);
			setError(null);
		} else setError(familyData === "missing" ? "restart_required" : "families_unavailable");
		setAgents(agentData);
		setSubscriptions(Object.fromEntries(kinds.map((kind, i) => [kind, statuses[i]])));
		setCheckedAt(Date.now());
		setLoading(false);
	}, []);
	(0, import_react.useEffect)(() => {
		reload();
		let timer;
		const onChange = () => {
			window.clearTimeout(timer);
			timer = window.setTimeout(() => void reload(), 250);
		};
		for (const name of REFRESH_EVENTS) window.addEventListener(name, onChange);
		return () => {
			window.clearTimeout(timer);
			for (const name of REFRESH_EVENTS) window.removeEventListener(name, onChange);
		};
	}, [reload]);
	return {
		families,
		subscriptions,
		agents,
		error,
		checkedAt,
		loading,
		reload
	};
}
async function pollUntilConnected(url, onTick, { maxMs = 12e4, intervalMs = 2500 } = {}) {
	const deadline = Date.now() + maxMs;
	while (Date.now() < deadline) {
		await new Promise((resolve) => setTimeout(resolve, intervalMs));
		await onTick();
		try {
			const res = await fetch(url, { cache: "no-store" });
			if (res.ok && subscriptionConnected(await res.json())) return true;
		} catch {}
	}
	return false;
}
function announce(slot, action) {
	window.dispatchEvent(new CustomEvent("jarvis:secret-configured", { detail: {
		key: slot,
		action
	} }));
}
function KeyField({ slot, present, providerLabel, dashboardUrl, title, description, onChanged, testId = "provider-key" }) {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [value, setValue] = (0, import_react.useState)("");
	const [reveal, setReveal] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(false);
	const showInput = !present || editing;
	const format = value.trim() ? keyMatchesSecret(slot, value) : null;
	async function save() {
		const trimmed = value.trim();
		if (!trimmed) return;
		setBusy("save");
		try {
			await postSecret(slot, trimmed, "everywhere");
			setValue("");
			setEditing(false);
			setReveal(false);
			announce(slot, "set");
			pushToast("success", t("providers_page.key_saved_toast").replace("{0}", providerLabel));
			await onChanged?.();
		} catch (cause) {
			pushToast("error", cause.message);
		} finally {
			setBusy(null);
		}
	}
	async function remove() {
		setBusy("delete");
		try {
			await deleteSecret(slot);
			announce(slot, "delete");
			pushToast("info", t("providers_page.key_removed_toast").replace("{0}", providerLabel));
			await onChanged?.();
		} catch (cause) {
			pushToast("error", cause.message);
		} finally {
			setBusy(null);
			setConfirmDelete(false);
		}
	}
	const getKey = dashboardUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => void openExternalUrl(dashboardUrl),
		className: "inline-flex items-center gap-1 text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline",
		children: [t("providers_page.get_key"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
			"aria-hidden": "true",
			className: "h-3 w-3"
		})]
	}) : null;
	const control = showInput ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex w-full items-center gap-2 sm:w-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-w-0 flex-1 sm:w-72 sm:flex-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: reveal ? "text" : "password",
					autoComplete: "off",
					spellCheck: false,
					"data-testid": `${testId}-input`,
					"aria-label": title ?? t("providers_page.key_label"),
					placeholder: t("providers_page.key_placeholder").replace("{0}", providerLabel),
					value,
					onChange: (event) => setValue(event.target.value),
					onKeyDown: (event) => {
						if (event.key === "Enter") save();
						if (event.key === "Escape" && present) {
							setEditing(false);
							setValue("");
						}
					},
					className: "h-8 pr-9 font-mono text-sm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setReveal((on) => !on),
					"aria-label": t(reveal ? "providers_page.key_hide" : "providers_page.key_show"),
					className: "absolute right-1 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded text-muted-foreground hover:text-foreground",
					children: reveal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" })
				})]
			}),
			editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "ghost",
				onClick: () => {
					setEditing(false);
					setValue("");
				},
				children: t("common.cancel")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				"data-testid": `${testId}-save`,
				disabled: !value.trim() || busy !== null,
				onClick: () => void save(),
				children: [busy === "save" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), t("providers_page.key_save")]
			})
		]
	}) : confirmDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size: "sm",
		variant: "ghost",
		onClick: () => setConfirmDelete(false),
		children: t("common.cancel")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		size: "sm",
		variant: "destructive",
		"data-testid": `${testId}-remove-confirm`,
		disabled: busy !== null,
		onClick: () => void remove(),
		children: [busy === "delete" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), t("providers_page.key_remove")]
	})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size: "sm",
		variant: "outline",
		"data-testid": `${testId}-replace`,
		onClick: () => setEditing(true),
		children: t("providers_page.key_replace")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size: "icon",
		variant: "ghost",
		className: "h-8 w-8 text-muted-foreground",
		"aria-label": t("providers_page.key_remove"),
		title: t("providers_page.key_remove"),
		"data-testid": `${testId}-remove`,
		onClick: () => setConfirmDelete(true),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
		"data-testid": testId,
		title: title ?? t("providers_page.key_label"),
		description,
		status: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex flex-wrap items-center gap-x-2 gap-y-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						className: present ? "h-1.5 w-1.5 rounded-full bg-success" : "h-1.5 w-1.5 rounded-full bg-border-strong"
					}), confirmDelete ? t("providers_page.key_remove_confirm") : present ? t("providers_page.key_saved_short") : t("providers_page.key_missing_short")]
				}),
				getKey,
				format && !format.match && format.detected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					role: "status",
					className: "inline-flex items-center gap-1 text-warning",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
						"aria-hidden": "true",
						className: "h-3.5 w-3.5"
					}), t("providers_page.key_format_warning").replace("{0}", format.detected.label).replace("{1}", providerLabel)]
				})
			]
		}),
		control
	});
}
function usd(value) {
	return Number.isInteger(value) ? `$${value}` : `$${value.toFixed(2)}`;
}
function MissionBilling({ providerName }) {
	const t = useT();
	const client = useQueryClient();
	const statusId = (0, import_react.useId)();
	const switchRef = (0, import_react.useRef)(null);
	const query = useQuery({
		queryKey: MISSION_BILLING_KEY,
		queryFn: fetchMissionBilling,
		staleTime: 3e4
	});
	const billing = query.data ?? null;
	const [pending, setPending] = (0, import_react.useState)(null);
	const [confirming, setConfirming] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [dialogError, setDialogError] = (0, import_react.useState)(null);
	const loaded = billing !== null;
	const reveal = (0, import_react.useCallback)(() => {
		if (!takeApiKeysAnchor("mission-billing")) return;
		document.getElementById(MISSION_BILLING_ANCHOR)?.scrollIntoView?.({
			block: "center",
			behavior: "smooth"
		});
		switchRef.current?.focus({ preventScroll: true });
	}, []);
	(0, import_react.useEffect)(() => {
		if (!loaded) return;
		reveal();
		window.addEventListener(APIKEYS_TAB_EVENT, reveal);
		return () => window.removeEventListener(APIKEYS_TAB_EVENT, reveal);
	}, [loaded, reveal]);
	if (query.isSuccess && billing === null) return null;
	const saveError = (cause) => fill(t("mission_billing.save_error"), { detail: cause.message || String(cause) });
	async function turnOff() {
		setError(null);
		setPending("off");
		try {
			client.setQueryData(MISSION_BILLING_KEY, await saveMissionBilling(false));
		} catch (cause) {
			setError(saveError(cause));
		} finally {
			setPending(null);
		}
	}
	async function confirmOn() {
		setDialogError(null);
		setPending("on");
		try {
			client.setQueryData(MISSION_BILLING_KEY, await saveMissionBilling(true));
			setConfirming(false);
		} catch (cause) {
			setDialogError(saveError(cause));
		} finally {
			setPending(null);
		}
	}
	const priced = billing?.paid_provider?.price_known ? billing.paid_provider : null;
	const named = priced ? providerName(priced.provider) : null;
	const providerLabel = named?.label ?? priced?.provider ?? "";
	const on = billing !== null && billing.paid_api_fallback && pending !== "off";
	const canTurnOn = billing !== null && billing.subscription_mode && priced !== null;
	const caps = billing ? {
		mission_cap: usd(billing.per_mission_cap_usd),
		daily_cap: usd(billing.daily_cap_usd)
	} : {
		mission_cap: "",
		daily_cap: ""
	};
	let status;
	if (query.isError) status = fill(t("mission_billing.load_error"), { detail: query.error.message });
	else if (!billing) status = t("providers_page.checking");
	else {
		const parts = [!billing.subscription_mode ? t("mission_billing.state_key_only") : on ? priced ? fill(t("mission_billing.state_on"), {
			provider: providerLabel,
			...caps
		}) : t("mission_billing.state_on_no_key") : priced ? t("mission_billing.state_off") : t("mission_billing.state_no_key")];
		const spent = billing.spent_last_24h_usd;
		if (spent > 0) parts.push(fill(t("mission_billing.spent"), { amount: spent < .01 ? t("mission_billing.less_than_cent") : usd(Number(spent.toFixed(2))) }));
		status = parts.join(" · ");
	}
	const title = t("mission_billing.title");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsSection, {
		id: MISSION_BILLING_ANCHOR,
		title: t("mission_billing.section"),
		"data-testid": "mission-billing",
		className: "scroll-mt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
			title,
			status: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "block space-y-0.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					id: statusId,
					className: query.isError ? "block text-destructive" : "block",
					children: status
				}), error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					role: "alert",
					className: "block text-destructive",
					children: error
				}) : null]
			}),
			control: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [pending === "off" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
				"aria-hidden": "true",
				className: "h-4 w-4 animate-spin text-muted-foreground"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
				ref: switchRef,
				"data-testid": "mission-billing-switch",
				checked: on,
				disabled: billing === null || pending !== null || !on && !canTurnOn,
				onCheckedChange: (next) => {
					if (next) {
						setError(null);
						setDialogError(null);
						setConfirming(true);
					} else turnOff();
				},
				"aria-label": title,
				"aria-describedby": statusId
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
			open: confirming,
			onOpenChange: (open) => {
				if (!open && pending === null) setConfirming(false);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 z-[80] bg-scrim/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
				"data-testid": "mission-billing-confirm",
				onOpenAutoFocus: (event) => {
					event.preventDefault();
					event.currentTarget.querySelector("[data-billing-cancel]")?.focus();
				},
				className: "fixed left-1/2 top-1/2 z-[90] max-h-[calc(100dvh-2rem)] w-[min(440px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-border bg-popover p-6 text-popover-foreground shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warning/10 text-warning",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, {
								className: "h-[18px] w-[18px]",
								"aria-hidden": true
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
								className: "text-base font-semibold",
								children: t("mission_billing.confirm_title")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
								className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
								children: t("mission_billing.confirm_intro")
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground",
						children: [
							priced ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fill(t("mission_billing.confirm_billing"), { provider: providerLabel }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-testid": "mission-billing-provider",
									className: "flex min-w-0 items-center gap-2.5 rounded-xl border border-border bg-muted/40 px-3 py-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderLogo, {
											providerId: named?.logoId ?? priced.provider,
											label: providerLabel,
											size: "sm",
											className: "h-5 w-5 shrink-0"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate font-medium text-foreground",
											children: providerLabel
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											className: "ml-auto min-w-0 truncate font-mono text-xs text-muted-foreground",
											children: priced.model
										})
									]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-warning",
								children: t("mission_billing.confirm_no_key")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fill(t("mission_billing.confirm_caps"), caps) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("mission_billing.confirm_off") }),
							dialogError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								role: "alert",
								className: "text-destructive",
								children: dialogError
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "outline",
							"data-billing-cancel": true,
							disabled: pending !== null,
							onClick: () => setConfirming(false),
							children: t("common.cancel")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							size: "sm",
							"data-testid": "mission-billing-confirm-on",
							disabled: pending !== null || !canTurnOn,
							onClick: () => void confirmOn(),
							children: [pending === "on" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								className: "animate-spin",
								"aria-hidden": true
							}), t("mission_billing.confirm_action")]
						})]
					})
				]
			})] })
		})]
	});
}
var BAR_CLASS = {
	normal: "bg-foreground/70",
	warning: "bg-foreground",
	critical: "bg-destructive"
};
var PERCENT_CLASS = {
	normal: "text-foreground",
	warning: "text-foreground",
	critical: "text-destructive"
};
function windowLabel(minutes) {
	if (minutes < 60) return `${minutes} min`;
	if (minutes < 1440) return `${Math.round(minutes / 60)} h`;
	return `${Math.round(minutes / 1440)} d`;
}
function durationLabel(ms) {
	const totalMinutes = Math.max(0, Math.round(ms / 6e4));
	if (totalMinutes < 60) return `${totalMinutes} min`;
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	if (hours < 24) return minutes ? `${hours} h ${minutes} min` : `${hours} h`;
	const days = Math.floor(hours / 24);
	const restHours = hours % 24;
	return restHours ? `${days} d ${restHours} h` : `${days} d`;
}
function useWindowLabel() {
	const t = useT();
	return (window$1) => {
		if (window$1.kind === "weekly_scoped") {
			const base = t("agent_accounts.usage.kind.weekly");
			return window$1.scope_label ? `${base} · ${window$1.scope_label}` : base;
		}
		if (window$1.kind === "session") {
			if (window$1.window_minutes && window$1.window_minutes !== 300) return `${windowLabel(window$1.window_minutes)} · ${t("agent_accounts.usage.kind.rolling")}`;
			return t("agent_accounts.usage.kind.session");
		}
		if (window$1.kind === "weekly") return t("agent_accounts.usage.kind.weekly");
		if (window$1.kind === "monthly") return t("agent_accounts.usage.kind.monthly");
		if (window$1.window_minutes) return `${windowLabel(window$1.window_minutes)} · ${t("agent_accounts.usage.kind.rolling")}`;
		return window$1.raw_label || t("agent_accounts.usage.kind.other");
	};
}
function Meter({ window: usageWindow, now }) {
	const t = useT();
	const label = useWindowLabel()(usageWindow);
	const severity = usageWindow.severity in BAR_CLASS ? usageWindow.severity : "normal";
	const percent = Math.max(0, Math.min(100, usageWindow.percent));
	const resetsInMs = usageWindow.resets_at ? new Date(usageWindow.resets_at).getTime() - now : null;
	const countdown = resetsInMs !== null && Number.isFinite(resetsInMs) && resetsInMs > 0 ? `${t("agent_accounts.usage.resets_in")} ${durationLabel(resetsInMs)}` : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 truncate text-micro font-medium uppercase tracking-wide text-muted-foreground",
					children: [label, countdown && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-1.5 normal-case tracking-normal opacity-80",
						children: ["· ", countdown]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("shrink-0 text-xs font-semibold tabular-nums", PERCENT_CLASS[severity]),
					children: [
						Math.round(percent),
						"% ",
						t("agent_accounts.usage.used")
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-right text-micro tabular-nums text-muted-foreground",
				children: [
					Math.round(100 - percent),
					"% ",
					t("agent_accounts.usage.remaining")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "progressbar",
				"aria-label": label,
				"aria-valuenow": Math.round(percent),
				"aria-valuemin": 0,
				"aria-valuemax": 100,
				className: "h-1.5 w-full overflow-hidden rounded-full bg-foreground/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("h-full rounded-full transition-all duration-500", BAR_CLASS[severity]),
					style: { width: `${Math.max(percent, percent > 0 ? 2 : 0)}%` }
				})
			})
		]
	});
}
function AccountUsageMeters({ usage, now }) {
	const t = useT();
	if (!usage) return null;
	if (usage.status === "signed_out") return null;
	if (usage.status !== "ok" || usage.windows.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "pl-6 text-micro leading-relaxed text-muted-foreground",
		children: usage.status === "unsupported" ? t("agent_accounts.usage.state.unsupported") : t("agent_accounts.usage.state.unavailable")
	});
	const live = usage.source === "live";
	const ageMs = usage.as_of ? now - usage.as_of * 1e3 : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ml-6 space-y-2 rounded-xl border border-border/60 bg-background/40 px-3 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "h-3 w-3 shrink-0 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-micro font-semibold uppercase tracking-wider text-muted-foreground",
					children: t("agent_accounts.usage.title")
				}),
				usage.plan && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 rounded-full border border-border bg-secondary/60 px-1.5 py-px text-micro font-medium text-muted-foreground",
					children: usage.plan
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ml-auto flex shrink-0 items-center gap-1 text-micro text-muted-foreground",
					title: usage.as_of ? (/* @__PURE__ */ new Date(usage.as_of * 1e3)).toLocaleString() : void 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						className: cn("h-1.5 w-1.5 rounded-full", live ? "bg-muted-foreground" : "bg-muted-foreground/50")
					}), live ? t("agent_accounts.usage.live") : ageMs !== null && ageMs > 0 ? `${t("agent_accounts.usage.as_of")} ${durationLabel(ageMs)}` : t("agent_accounts.usage.cached")]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-1.5",
			children: usage.windows.map((window$1, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
				window: window$1,
				now
			}, `${window$1.kind}:${window$1.scope_label ?? ""}:${index}`))
		})]
	});
}
function LoginFlowBox({ flow, onFlow, onClose, onRetry, onFallback }) {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const [code, setCode] = (0, import_react.useState)("");
	const [sending, setSending] = (0, import_react.useState)(false);
	const failed = flow.status === "failed" || flow.status === "cancelled";
	async function copyUrl() {
		if (!flow.url) return;
		if (await robustCopy(flow.url)) pushToast("success", t("agent_accounts.flow.copied"));
		else pushToast("error", t("agent_accounts.flow.copy_failed"));
	}
	async function pasteCode() {
		const text = await robustPaste();
		if (text) setCode(text.trim());
	}
	async function submit() {
		const value = code.trim();
		if (!value || sending) return;
		setSending(true);
		try {
			onFlow(await submitLoginFlowCode(flow.flow_id, value));
			setCode("");
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setSending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": `login-flow-${flow.account_id}`,
		className: "ml-6 space-y-2 rounded-xl border border-border bg-background p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					!flow.finished && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 shrink-0 animate-spin text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("min-w-0 flex-1 break-words text-micro", failed ? "text-foreground" : "text-muted-foreground"),
						children: flow.status === "starting" ? t("agent_accounts.flow.starting") : flow.status === "awaiting_input" && !flow.code_expected ? t("agent_accounts.flow.waiting_browser") : flow.message || t("agent_accounts.flow.starting")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						"aria-label": t("agent_accounts.flow.cancel"),
						title: t("agent_accounts.flow.cancel"),
						className: "shrink-0 rounded-md p-1 text-muted-foreground hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
					})
				]
			}),
			flow.url && !failed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							"data-testid": "login-flow-url",
							className: "min-w-0 flex-1 truncate rounded-md border border-border bg-background px-2 py-1 font-mono text-micro text-muted-foreground",
							title: flow.url,
							children: flow.url
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => void copyUrl(),
							className: "inline-flex shrink-0 items-center gap-1 rounded-lg border border-border px-2 py-1 text-micro hover:border-border-strong",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3 w-3" }), t("agent_accounts.flow.copy")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => void openExternalUrl(flow.url),
							className: "inline-flex shrink-0 items-center gap-1 rounded-lg border border-border px-2 py-1 text-micro hover:border-border-strong",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" }), t("agent_accounts.flow.open")]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-micro text-muted-foreground",
					children: t("agent_accounts.flow.link_hint")
				})]
			}),
			flow.code_expected && !flow.finished && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: code,
						onChange: (e) => setCode(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") submit();
						},
						placeholder: t("agent_accounts.flow.code_placeholder"),
						"aria-label": t("agent_accounts.flow.code_placeholder"),
						spellCheck: false,
						autoComplete: "off",
						className: "min-w-0 flex-1 rounded-lg border border-border bg-background px-2 py-1.5 font-mono text-xs"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void pasteCode(),
						"aria-label": t("agent_accounts.flow.paste"),
						title: t("agent_accounts.flow.paste"),
						className: "shrink-0 rounded-lg border border-border p-1.5 hover:border-border-strong",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardPaste, { className: "h-3.5 w-3.5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void submit(),
						disabled: !code.trim() || sending,
						className: "shrink-0 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground disabled:opacity-50",
						children: t("agent_accounts.flow.submit")
					})
				]
			}),
			failed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onRetry,
					className: "rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground",
					children: t("agent_accounts.flow.retry")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onFallback,
					className: "rounded-lg border border-border px-3 py-1.5 text-xs hover:border-border-strong",
					children: t("agent_accounts.flow.fallback")
				})]
			}),
			flow.tail && !flow.finished && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "text-micro text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
					className: "cursor-pointer select-none",
					children: t("agent_accounts.flow.show_cli")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-1 max-h-32 overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-background p-2",
					children: flow.tail
				})]
			})
		]
	});
}
var ACCOUNT_PLATFORM = {
	claude_cli: "claude",
	codex: "codex",
	grok_build: "grok-build"
};
function usedPercent(usage) {
	if (!usage || usage.status !== "ok" || usage.windows.length === 0) return null;
	const top = usage.windows.reduce((a, b) => b.percent > a.percent ? b : a);
	return {
		percent: Math.round(top.percent),
		critical: top.severity === "critical" || top.percent >= 100
	};
}
function SubscriptionAccounts({ kind }) {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const platform = ACCOUNT_PLATFORM[kind];
	const [data, setData] = (0, import_react.useState)(null);
	const [usage, setUsage] = (0, import_react.useState)({});
	const [openId, setOpenId] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [adding, setAdding] = (0, import_react.useState)(false);
	const [label, setLabel] = (0, import_react.useState)("");
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	const [signInFor, setSignInFor] = (0, import_react.useState)(null);
	const reload = (0, import_react.useCallback)(async () => {
		try {
			setData(await fetchAgentAccounts());
		} catch (cause) {
			pushToast("error", cause.message);
		}
	}, [pushToast]);
	const loadUsage = (0, import_react.useCallback)(async () => {
		try {
			const body = await fetchAgentUsage();
			if (!body) return;
			setUsage(Object.fromEntries(body.accounts.map((entry) => [entry.account_id, entry])));
		} catch (cause) {
			console.debug("account usage unavailable", cause);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (!platform) return;
		reload();
		loadUsage();
		const usageTimer = window.setInterval(() => void loadUsage(), 6e4);
		const clock = window.setInterval(() => setNow(Date.now()), 3e4);
		return () => {
			window.clearInterval(usageTimer);
			window.clearInterval(clock);
		};
	}, [
		platform,
		reload,
		loadUsage
	]);
	if (!platform) return null;
	const group = groupFor(data, platform);
	const accounts = group?.accounts ?? [];
	async function run(key, action) {
		setBusy(key);
		try {
			const next = await action();
			if (next) setData(next);
			else await reload();
		} catch (cause) {
			pushToast("error", cause.message);
		} finally {
			setBusy(null);
		}
	}
	async function add() {
		const name = label.trim();
		if (!name || !platform) return;
		const before = new Set(accounts.map((account) => account.id));
		setBusy("add");
		try {
			const next = await createAgentAccount(platform, name);
			setData(next);
			const created = groupFor(next, platform)?.accounts.find((account) => !before.has(account.id));
			setLabel("");
			setAdding(false);
			if (created) {
				setOpenId(created.id);
				setSignInFor(created.id);
			}
		} catch (cause) {
			pushToast("error", cause.message);
		} finally {
			setBusy(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-2.5",
		"data-testid": `subscription-accounts-${kind}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-7 items-center justify-between gap-4 px-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "flex items-center gap-2 text-sm font-normal text-foreground/70",
				children: [t("providers_page.accounts_section"), accounts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: accounts.length
				}) : null]
			}), !adding ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: "ghost",
				className: "h-7 text-xs",
				"data-testid": "subscription-account-add",
				onClick: () => setAdding(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), t("agent_accounts.add")]
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsGroup, { children: [
			accounts.map((account) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountLine, {
				account,
				active: account.id === group?.active_account,
				usage: usage[account.id],
				now,
				open: openId === account.id,
				onToggle: () => setOpenId((id) => id === account.id ? null : account.id),
				busy,
				run,
				autoSignIn: signInFor === account.id,
				onAutoSignInStarted: () => setSignInFor(null)
			}, account.id)),
			accounts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-3 text-xs text-muted-foreground",
				children: t("agent_accounts.loading")
			}) : null,
			adding ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						autoFocus: true,
						value: label,
						onChange: (event) => setLabel(event.target.value),
						onKeyDown: (event) => {
							if (event.key === "Enter") add();
							if (event.key === "Escape") setAdding(false);
						},
						placeholder: t("agent_accounts.name_placeholder"),
						"aria-label": t("agent_accounts.name_placeholder"),
						className: "h-8 min-w-0 flex-1 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => setAdding(false),
						children: t("agent_accounts.cancel")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						disabled: !label.trim() || busy === "add",
						onClick: () => void add(),
						children: [busy === "add" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), t("agent_accounts.add_confirm")]
					})
				]
			}) : null
		] })]
	});
}
function AccountLine({ account, active, usage, now, open, onToggle, busy, run, autoSignIn, onAutoSignInStarted }) {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const [flow, setFlow] = (0, import_react.useState)(null);
	const [renaming, setRenaming] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(account.label);
	const pending = busy?.endsWith(account.id) ?? false;
	const used = usedPercent(usage);
	const plan = usage?.plan ?? account.tier;
	const signIn = (0, import_react.useCallback)(async () => {
		try {
			setFlow(await startLoginFlow(account.id));
		} catch (cause) {
			pushToast("error", cause.message);
		}
	}, [account.id, pushToast]);
	(0, import_react.useEffect)(() => {
		if (!autoSignIn) return;
		onAutoSignInStarted();
		signIn();
	}, [
		autoSignIn,
		onAutoSignInStarted,
		signIn
	]);
	const runRef = (0, import_react.useRef)(run);
	runRef.current = run;
	(0, import_react.useEffect)(() => {
		if (!flow || flow.finished) return;
		const flowId = flow.flow_id;
		const timer = window.setInterval(() => {
			(async () => {
				try {
					const next = await getLoginFlow(flowId);
					if (!next.finished) setFlow(next);
					else if (next.status === "success") {
						pushToast("success", `${account.label}: ${t("agent_accounts.flow.success")}`);
						setFlow(null);
						await runRef.current(`flow:${account.id}`, async () => {});
					} else setFlow(next);
				} catch {
					setFlow(null);
				}
			})();
		}, 1200);
		return () => window.clearInterval(timer);
	}, [
		flow,
		account.id,
		account.label,
		pushToast,
		t
	]);
	async function rename() {
		const name = draft.trim();
		setRenaming(false);
		if (!name || name === account.label) return;
		await run(`rename:${account.id}`, () => renameAgentAccount(account.id, name));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": `subscription-account-row-${account.id}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			"aria-expanded": open,
			onClick: onToggle,
			className: "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					"aria-hidden": "true",
					className: cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform motion-reduce:transition-none", open && "rotate-90")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex min-w-0 items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("truncate text-sm font-medium", account.connected ? "text-foreground" : "text-muted-foreground"),
								children: account.email || account.label
							}),
							active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 rounded border border-border px-1.5 py-px text-[10px] font-medium uppercase tracking-wide text-muted-foreground",
								children: t("providers_page.account_active")
							}) : null,
							account.warning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								title: account.warning,
								className: "inline-flex shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
									"aria-label": account.warning,
									className: "h-3.5 w-3.5 text-warning"
								})
							}) : null
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-0.5 block truncate text-xs text-muted-foreground",
						children: [[account.label, plan].filter(Boolean).join(" · "), !account.connected ? ` · ${t("agent_accounts.not_signed_in")}` : ""]
					})]
				}),
				used ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("shrink-0 text-sm tabular-nums", used.critical ? "text-destructive" : "text-muted-foreground"),
					children: [used.percent, "%"]
				}) : null
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 px-4 pb-4 pl-11",
			children: [
				account.warning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-warning",
					children: account.warning
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountUsageMeters, {
					usage,
					now
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						!active && account.connected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							disabled: pending,
							onClick: () => void run(`active:${account.id}`, () => setActiveAgentAccount(account.platform, account.id)),
							children: t("providers_page.account_use")
						}) : null,
						!account.connected && !flow ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							disabled: pending,
							onClick: () => void signIn(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, {}), t("agent_accounts.sign_in")]
						}) : null,
						!account.builtin ? renaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							autoFocus: true,
							value: draft,
							onChange: (event) => setDraft(event.target.value),
							onBlur: () => void rename(),
							onKeyDown: (event) => {
								if (event.key === "Enter") rename();
								if (event.key === "Escape") setRenaming(false);
							},
							"aria-label": t("agent_accounts.rename"),
							className: "h-8 w-48 text-sm"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "ghost",
							className: "text-muted-foreground",
							onClick: () => {
								setDraft(account.label);
								setRenaming(true);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}), t("agent_accounts.rename")]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "ghost",
							className: "text-muted-foreground hover:text-destructive",
							disabled: pending,
							onClick: () => void run(`delete:${account.id}`, () => deleteAgentAccount(account.id)),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), t("agent_accounts.remove")]
						})] }) : null
					]
				}),
				flow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginFlowBox, {
					flow,
					onFlow: setFlow,
					onClose: () => {
						if (!flow.finished) cancelLoginFlow(flow.flow_id).catch(() => void 0);
						setFlow(null);
					},
					onRetry: () => void signIn(),
					onFallback: () => {
						setFlow(null);
						run(`login:${account.id}`, async () => {
							const { message } = await loginAgentAccount(account.id);
							pushToast("info", message);
						});
					}
				}) : null
			]
		}) : null]
	});
}
function subscriptionRow(rows) {
	return rows.find((row) => row.billing === "subscription" || row.billing === "subscription_or_api");
}
function apiRow(rows) {
	return rows.find((row) => row.billing === "api") ?? rows.find((row) => row.billing === "subscription_or_api");
}
function accessReady(access, family, state) {
	if (access === "local") return true;
	if (access === "subscription") return Boolean(state?.subscriptionOn);
	return family.key_present || Boolean(state?.viaProject);
}
function familyAccess(family, allRows, prefs, state) {
	const rows = allRows.filter((row) => family.agent_ids.includes(row.jarvis));
	const localRows = family.local ? rows.filter((row) => row.billing === "local") : [];
	const subRow = family.subscription ? subscriptionRow(rows) : void 0;
	const keyRow = !family.local && family.key_slot ? apiRow(rows) : void 0;
	const dual = Boolean(subRow && keyRow && subRow.jarvis === keyRow.jarvis);
	const choices = family.local ? ["local"] : [...subRow ? ["subscription"] : [], ...keyRow ? ["api_key"] : []];
	const disabled = new Set(prefs.disabled);
	let access = choices[0] ?? "api_key";
	if (subRow && keyRow) if (dual) access = prefs.api_only.includes(keyRow.jarvis) ? "api_key" : "subscription";
	else {
		const subOn = !disabled.has(subRow.jarvis);
		if (subOn !== !disabled.has(keyRow.jarvis)) access = subOn ? "subscription" : "api_key";
		else if (state?.subscriptionOn) access = "subscription";
		else access = accessReady("api_key", family, state) ? "api_key" : "subscription";
	}
	const chosen = access === "local" ? localRows : [access === "subscription" ? subRow : keyRow].filter(Boolean);
	const ready = chosen.length > 0 && accessReady(access, family, state);
	const on = ready && chosen.some((row) => !disabled.has(row.jarvis));
	return {
		family,
		subRow,
		keyRow,
		localRows,
		dual,
		choices,
		access,
		rows: chosen,
		ready,
		on
	};
}
function allIds(fa) {
	return [...new Set([
		fa.subRow,
		fa.keyRow,
		...fa.localRows
	].filter(Boolean).map((row) => row.jarvis))];
}
function onPatch(fa, on, prefs) {
	if (!on) return { disabled: toggled(prefs.disabled, allIds(fa), false) };
	const chosen = fa.rows.map((row) => row.jarvis);
	const others = allIds(fa).filter((id) => !chosen.includes(id));
	return { disabled: toggled(toggled(prefs.disabled, others, false), chosen, true) };
}
function accessPatch(fa, access, prefs) {
	if (fa.dual && fa.keyRow) {
		const id = fa.keyRow.jarvis;
		return {
			api_only: toggled(prefs.api_only, [id], access !== "api_key"),
			disabled: toggled(prefs.disabled, [id], true)
		};
	}
	const target = access === "subscription" ? fa.subRow : fa.keyRow;
	const other = access === "subscription" ? fa.keyRow : fa.subRow;
	if (!target) return {};
	return { disabled: toggled(toggled(prefs.disabled, other ? [other.jarvis] : [], false), [target.jarvis], true) };
}
function nextDefault(entries, current, prefer) {
	const live = entries.filter((fa) => fa.on).flatMap((fa) => fa.rows);
	if (live.some((row) => row.jarvis === current)) return null;
	return entries.find((fa) => fa.family.id === prefer && fa.on)?.rows[0] ?? live[0] ?? null;
}
function withPatch(prefs, patch) {
	return {
		...prefs,
		...patch
	};
}
const FAMILY_USES = [
	"voice",
	"agents",
	"speech",
	"hearing",
	"dictation"
];
var USE_TIER = {
	voice: "realtime",
	speech: "tts",
	hearing: "stt",
	dictation: "dictation"
};
var HEALTH_SECTIONS = {
	voice: "realtime",
	agents: "subagents",
	speech: "tts",
	hearing: "stt",
	dictation: "dictation"
};
function familyState(family, ctx) {
	const members = ctx.providers.filter((p) => family.provider_ids.includes(p.id));
	const subscription = family.subscription ? ctx.subscriptions[family.subscription.kind] ?? null : null;
	const subscriptionOn = subscriptionConnected(subscription);
	const viaProject = !family.key_present && members.some((m) => Boolean(m.credential_note) && m.configured);
	const agentRows = (ctx.agents?.mapping ?? []).filter((row) => family.agent_ids.includes(row.jarvis));
	const uses = [];
	const canDo = [];
	for (const use of FAMILY_USES) {
		if (use === "agents") {
			if (agentRows.length) canDo.push(use);
			if (agentRows.some((row) => row.is_active_brain)) uses.push(use);
			continue;
		}
		const tier = USE_TIER[use];
		const cards = members.filter((m) => m.tier === tier);
		if (cards.length) canDo.push(use);
		if (cards.some((m) => m.active)) uses.push(use);
	}
	const memberIds = new Set([
		...family.provider_ids,
		...family.hidden_ids,
		...family.agent_ids
	]);
	let failing = null;
	for (const use of uses) {
		const entry = ctx.health[HEALTH_SECTIONS[use]];
		if (entry?.status === "error" && entry.subject_id && memberIds.has(entry.subject_id)) {
			failing = entry.detail || entry.reason;
			break;
		}
	}
	return {
		members,
		subscription,
		subscriptionOn,
		account: subscriptionOn ? subscriptionAccount(subscription) : null,
		keyOn: family.key_present,
		viaProject,
		connected: subscriptionOn || family.key_present || viaProject || family.local,
		uses,
		canDo,
		failing
	};
}
var CLI = {
	codex: {
		name: "Codex",
		login: () => startCodexLogin(),
		logout: () => codexLogout(),
		test: "/api/codex/test",
		where: "browser"
	},
	claude_cli: {
		name: "Claude",
		login: loginClaude,
		logout: logoutClaude,
		test: "/api/claude/test",
		where: "terminal"
	},
	antigravity: {
		name: "Antigravity",
		login: loginAntigravity,
		logout: logoutAntigravity,
		test: "/api/antigravity/test",
		where: "browser"
	},
	grok_build: {
		name: "Grok",
		login: loginGrokBuild,
		logout: logoutGrokBuild,
		test: "/api/grok-build/test",
		where: "browser"
	}
};
function shortVersion(raw) {
	if (!raw) return null;
	const match = raw.match(/\d+\.\d+(?:\.\d+)?/);
	return match ? `v${match[0]}` : raw;
}
var SOCIETY_CATALOG_KEY = [
	"agent-chat",
	"catalog",
	"society"
];
function useAgentProviders(entriesFor, primary, onChanged) {
	const t = useT();
	const client = useQueryClient();
	const pushToast = useEventStore((s) => s.pushToast);
	const prefsQuery = useQuery({
		queryKey: AGENT_PROVIDER_PREFS_KEY,
		queryFn: fetchAgentProviderPrefs,
		staleTime: 3e4
	});
	const prefs = prefsQuery.data ?? EMPTY_AGENT_PROVIDER_PREFS;
	const [busy, setBusy] = (0, import_react.useState)(null);
	async function makeDefault(row, label, quiet = false) {
		window.dispatchEvent(new CustomEvent("jarvis:provider-selection-pending", { detail: {
			section: "subagents",
			provider: row.jarvis
		} }));
		try {
			const result = await switchSubagentProvider(row.jarvis);
			if (!quiet || result.restart_required) pushToast("success", t(result.restart_required ? "providers_page.default_switched_restart" : "providers_page.default_switched").replace("{0}", label));
			window.dispatchEvent(new CustomEvent("jarvis:agent-switched"));
		} catch (cause) {
			window.dispatchEvent(new CustomEvent("jarvis:provider-switch-failed", { detail: {
				section: "subagents",
				provider: row.jarvis
			} }));
			pushToast("error", cause.message);
		}
	}
	async function save(familyId, patch) {
		if (busy) return;
		setBusy(familyId);
		try {
			const saved = await saveAgentProviderPrefs(patch);
			client.setQueryData(AGENT_PROVIDER_PREFS_KEY, saved);
			useSavedHiddenModels.setState({ hidden: saved.hidden_models });
			client.invalidateQueries({ queryKey: SOCIETY_CATALOG_KEY });
			client.invalidateQueries({ queryKey: ["society", "providers"] });
			const next = nextDefault(entriesFor(withPatch(prefs, saved)), primary, familyId);
			if (next) await makeDefault(next, next.label ?? next.jarvis, true);
			await onChanged();
		} catch (cause) {
			pushToast("error", cause.message);
		} finally {
			setBusy(null);
		}
	}
	async function chooseDefault(row, label) {
		if (busy) return;
		setBusy(row.jarvis);
		try {
			await makeDefault(row, label);
			await onChanged();
		} finally {
			setBusy(null);
		}
	}
	return {
		prefs,
		ready: prefsQuery.isSuccess,
		busy,
		save,
		chooseDefault
	};
}
function AgentsTab({ data, providers, health, onProvidersChanged }) {
	const t = useT();
	const { families, subscriptions, agents, reload } = data;
	const refresh = async () => {
		onProvidersChanged();
		await reload();
	};
	const states = (0, import_react.useMemo)(() => {
		const ctx = {
			providers,
			subscriptions,
			agents,
			health
		};
		return Object.fromEntries((families ?? []).map((f) => [f.id, familyState(f, ctx)]));
	}, [
		families,
		providers,
		subscriptions,
		agents,
		health
	]);
	const mapping = agents?.mapping ?? [];
	const listed = (0, import_react.useMemo)(() => {
		const rank = (f) => f.local ? 2 : f.subscription ? 0 : 1;
		return (families ?? []).filter((f) => mapping.some((row) => f.agent_ids.includes(row.jarvis)) && (f.subscription || f.key_slot || f.local)).sort((a, b) => rank(a) - rank(b));
	}, [families, mapping]);
	const entriesFor = (prefs) => listed.map((f) => familyAccess(f, mapping, prefs, states[f.id]));
	const control = useAgentProviders(entriesFor, agents?.brain_primary ?? "", refresh);
	const entries = entriesFor(control.prefs);
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (selectedId || !entries.length) return;
		setSelectedId((entries.find((fa) => fa.rows.some((row) => row.is_active_brain)) ?? entries.find((fa) => fa.on) ?? entries[0]).family.id);
	}, [entries, selectedId]);
	const selected = entries.find((fa) => fa.family.id === selectedId) ?? null;
	const providerName = (0, import_react.useCallback)((provider) => {
		const family = (families ?? []).find((f) => f.id === provider || f.agent_ids.includes(provider) || f.provider_ids.includes(provider));
		return family ? {
			label: displayName(family),
			logoId: logoOf(family)
		} : null;
	}, [families]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-10",
		"data-testid": "apikeys-agents",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSection, {
			title: t("providers_page.agent_providers_title"),
			plain: true,
			"data-testid": "agents-providers",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MasterDetail, {
				testId: "agent-provider-list",
				list: entries.map((fa) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderListRow, {
					entry: fa,
					state: states[fa.family.id],
					selected: fa.family.id === selectedId,
					onSelect: () => setSelectedId(fa.family.id),
					control
				}, fa.family.id)),
				detail: selected && states[selected.family.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderDetail, {
					entry: selected,
					state: states[selected.family.id],
					control,
					onChanged: refresh
				}, selected.family.id) : null
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionBilling, { providerName })]
	});
}
function displayName(family) {
	return family.label;
}
function logoOf(family) {
	return family.logo_id;
}
function entryStatus(entry, state, t) {
	if (entry.access === "local") return t("providers_page.status_local");
	if (entry.access === "subscription") {
		if (!state?.subscription) return t("providers_page.subscription_unknown");
		if (state.subscriptionOn) return state.account ? t("providers_page.status_subscription_as").replace("{0}", state.account) : t("providers_page.status_subscription");
		if (!state.subscription.installed) return t("providers_page.not_installed");
		return t("providers_page.not_signed_in");
	}
	if (entry.family.key_present) return t("providers_page.status_key");
	if (state?.viaProject) return t("providers_page.status_project");
	return t("providers_page.key_missing_short");
}
function ProviderListRow({ entry, state, selected, onSelect, control }) {
	const t = useT();
	const family = entry.family;
	const name = displayName(family);
	const label = t("providers_page.agents_use_for").replace("{0}", name);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListRow, {
		testId: `agent-provider-${family.id}`,
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderLogo, {
			providerId: logoOf(family),
			label: name,
			size: "sm",
			className: "h-5 w-5"
		}),
		name,
		version: entry.access === "subscription" ? shortVersion(state?.subscription?.version) : null,
		status: entryStatus(entry, state, t),
		dot: state?.failing ? "error" : null,
		selected,
		dimmed: !entry.on,
		onSelect,
		trailing: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked: entry.on,
			disabled: !entry.ready || !control.ready || control.busy !== null,
			onCheckedChange: (on) => void control.save(family.id, onPatch(entry, on, control.prefs)),
			"aria-label": label,
			title: entry.ready ? label : t("providers_page.agents_needs_access")
		})
	});
}
function ProviderDetail({ entry, state, control, onChanged }) {
	const t = useT();
	const family = entry.family;
	const name = displayName(family);
	const subscription = entry.access === "subscription";
	const keyed = entry.access === "api_key";
	const testCard = keyed ? TEST_TIER_ORDER.map((tier) => state.members.find((m) => m.tier === tier && m.auth_mode === "api_key")).find(Boolean) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": `agent-provider-detail-${family.id}`,
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailHeader, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderLogo, {
						providerId: logoOf(family),
						label: name,
						size: "sm",
						className: "h-5 w-5"
					}),
					name,
					version: subscription ? shortVersion(state.subscription?.version) : null
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsSectionCard, { children: [
					entry.choices.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
						title: t("providers_page.access_title"),
						control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
							size: "xs",
							testId: "agent-provider-access",
							label: t("providers_page.access_title"),
							value: entry.access,
							disabled: !control.ready || control.busy !== null,
							onChange: (access) => void control.save(family.id, accessPatch(entry, access, control.prefs)),
							options: entry.choices.map((choice) => ({
								value: choice,
								label: t(`providers_page.access_${choice}`)
							}))
						})
					}),
					subscription && family.subscription && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubscriptionAccountRow, {
						family,
						state,
						onChanged
					}),
					keyed && family.key_slot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyField, {
						slot: family.key_slot,
						present: family.key_present,
						providerLabel: family.label,
						dashboardUrl: family.dashboard_url,
						description: state.viaProject && !family.key_present ? t("providers_page.status_project") : void 0,
						onChanged
					}),
					entry.access === "local" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, { title: t("providers_page.local_title") }),
					entry.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultRow, {
						row,
						label: family.local ? row.label ?? family.label : name,
						entry,
						control
					}, row.jarvis)),
					keyed && family.key_present && testCard && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
						title: t("providers_page.key_test_label"),
						control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderTestControl, {
							providerId: testCard.id,
							providerLabel: testCard.label,
							section: testCard.tier,
							active: testCard.active
						})
					})
				] })]
			}),
			entry.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentModels, {
				providerId: row.jarvis,
				title: entry.rows.length > 1 ? `${t("providers_page.models_title")} · ${row.label ?? row.jarvis}` : t("providers_page.models_title"),
				control,
				familyId: family.id
			}, row.jarvis)),
			subscription && family.subscription && state.subscription?.installed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsSection, {
				title: t("providers_page.runtime"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BinaryPathRow, {
					kind: family.subscription.kind,
					path: "binary_path" in state.subscription ? state.subscription.binary_path ?? "" : "",
					onChanged
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
					title: t("providers_page.cli_check"),
					control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CliTest, {
						endpoint: CLI[family.subscription.kind].test,
						onChanged
					})
				})]
			}),
			subscription && family.subscription && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubscriptionAccounts, { kind: family.subscription.kind }),
			keyed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeparateKeys, {
				family,
				onChanged
			})
		]
	});
}
function SubscriptionAccountRow({ family, state, onChanged }) {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const kind = family.subscription.kind;
	const cli = CLI[kind];
	const installed = state.subscription?.installed ?? false;
	const card = state.members.find((m) => m.id === family.subscription.provider_id);
	const [pending, setPending] = (0, import_react.useState)(null);
	async function connect() {
		setPending("login");
		try {
			await cli.login();
			pushToast("info", t(cli.where === "browser" ? "providers_page.login_started_browser" : "providers_page.login_started_terminal"));
			setPending("waiting");
			await onChanged();
			if (await pollUntilConnected(subscriptionStatusUrl(kind), onChanged)) pushToast("success", t("providers_page.login_done").replace("{0}", cli.name));
		} catch (cause) {
			pushToast("error", cause.message);
		} finally {
			setPending(null);
		}
	}
	async function disconnect() {
		setPending("logout");
		try {
			await cli.logout();
			pushToast("info", t("providers_page.logout_done").replace("{0}", cli.name));
			await onChanged();
		} catch (cause) {
			pushToast("error", cause.message);
		} finally {
			setPending(null);
		}
	}
	const line = !state.subscription ? t("providers_page.subscription_unknown") : state.subscriptionOn ? state.account ? t("providers_page.authenticated_as").replace("{0}", state.account) : t("providers_page.authenticated") : !installed ? card?.install_hint || t("providers_page.subscription_install") : t("providers_page.not_signed_in");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
		"data-testid": `subscription-account-${kind}`,
		title: t("providers_page.account"),
		status: pending === "waiting" ? t(cli.where === "browser" ? "providers_page.login_waiting_browser" : "providers_page.login_waiting_terminal") : line,
		control: state.subscriptionOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			variant: "outline",
			"data-testid": "subscription-disconnect",
			disabled: pending !== null,
			onClick: () => void disconnect(),
			children: [pending === "logout" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {}), t("providers_page.disconnect")]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			"data-testid": "subscription-connect",
			disabled: pending !== null || !installed,
			onClick: () => void connect(),
			children: [pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, {}), t("providers_page.connect")]
		})
	});
}
function DefaultRow({ row, label, entry, control }) {
	const t = useT();
	const isDefault = row.is_active_brain && entry.on;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
		"data-testid": `agent-default-row-${row.jarvis}`,
		title: t("providers_page.default_title"),
		status: !entry.ready ? t("providers_page.agents_needs_access") : void 0,
		control: isDefault ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1.5 text-sm font-medium text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				"aria-hidden": "true",
				className: "h-4 w-4 text-accent"
			}), t("providers_page.default_on")]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			variant: "outline",
			"data-testid": `agent-make-default-${row.jarvis}`,
			disabled: !entry.on || control.busy !== null,
			onClick: () => void control.chooseDefault(row, label),
			children: [control.busy === row.jarvis && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), t("providers_page.default_make")]
		})
	});
}
function AgentModels({ providerId, title, control, familyId }) {
	const t = useT();
	const row = useQuery({
		queryKey: SOCIETY_CATALOG_KEY,
		queryFn: () => fetchAgentChatCatalog("society"),
		staleTime: 6e4
	}).data?.providers.find((p) => p.id === providerId);
	const live = useQuery({
		queryKey: [
			"society",
			"model-menu",
			"live",
			providerId
		],
		queryFn: async () => (await fetchProviderModels(providerId)).map((model) => ({
			id: model.id,
			label: model.label ?? model.name ?? model.id
		})),
		enabled: row?.models_source === "live",
		staleTime: 10 * 6e4,
		retry: false
	});
	if (!row) return null;
	const models = [...new Map((row.models_source === "live" && live.data?.length ? live.data : row.curated_models).filter((model) => model.id).map((model) => [model.id, model])).values()];
	const hidden = new Set(control.prefs.hidden_models[providerId] ?? []);
	const shown = models.filter((model) => !hidden.has(model.id)).length;
	const loading = row.models_source === "live" && live.isPending;
	const setHidden = (ids) => void control.save(familyId, { hidden_models: {
		...control.prefs.hidden_models,
		[providerId]: ids
	} });
	const busy = !control.ready || control.busy !== null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSection, {
		title,
		plain: true,
		"data-testid": `agent-models-${providerId}`,
		children: models.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-xs text-muted-foreground",
			children: loading ? t("providers_page.models_loading") : t("providers_page.models_none")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelList, {
			header: t("providers_page.models_count").replace("{0}", String(shown)).replace("{1}", String(models.length)),
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "ghost",
				className: "h-7 text-xs",
				disabled: busy,
				onClick: () => setHidden(shown === 0 ? [] : models.map((model) => model.id)),
				children: shown === 0 ? t("providers_page.models_show_all") : t("providers_page.models_hide_all")
			}),
			children: models.map((model) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelListRow, {
				name: model.label || model.id,
				id: model.id,
				note: model.note ?? (model.efforts?.length ? t("providers_page.models_reasoning") : null),
				muted: hidden.has(model.id),
				control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: !hidden.has(model.id),
					disabled: busy,
					onCheckedChange: (on) => setHidden(toggled([...hidden], [model.id], on)),
					"aria-label": model.label || model.id
				})
			}, model.id))
		})
	});
}
function SettingsSectionCard({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-xl border border-border/60 bg-card/40 [&>*+*]:border-t [&>*+*]:border-border/50",
		children
	});
}
function BinaryPathRow({ kind, path, onChanged }) {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const editable = kind === "codex";
	const [draft, setDraft] = (0, import_react.useState)(path);
	(0, import_react.useEffect)(() => setDraft(path), [path]);
	async function commit() {
		const next = draft.trim();
		if (!editable || next === path) return;
		try {
			await setCodexBinaryPath(next);
			await onChanged();
		} catch (cause) {
			pushToast("error", cause.message);
			setDraft(path);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
		title: t("providers_page.binary_path"),
		control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value: draft,
			readOnly: !editable,
			spellCheck: false,
			"aria-label": t("providers_page.binary_path"),
			onChange: (event) => setDraft(event.target.value),
			onBlur: () => void commit(),
			onKeyDown: (event) => {
				if (event.key === "Enter") commit();
			},
			className: cn("h-8 font-mono text-sm sm:w-72", !editable && "text-muted-foreground")
		})
	});
}
function CliTest({ endpoint, onChanged }) {
	const t = useT();
	const [running, setRunning] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	async function run() {
		setRunning(true);
		setError(null);
		try {
			setResult(await testAgentCli(endpoint));
			await onChanged();
		} catch (cause) {
			setResult(null);
			setError(cause.message);
		} finally {
			setRunning(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex min-w-0 items-center gap-3",
		children: [(result || error) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			role: "status",
			title: error ?? result?.message,
			className: cn("max-w-[16rem] truncate text-xs", error || result && !result.ok ? "text-destructive" : "text-muted-foreground"),
			children: error ?? result?.message
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			variant: "outline",
			disabled: running,
			onClick: () => void run(),
			children: [running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, {}), t("providers_page.test")]
		})]
	});
}
var TEST_TIER_ORDER = [
	"brain",
	"realtime",
	"tts",
	"stt",
	"dictation"
];
function SeparateKeys({ family, onChanged }) {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const [merging, setMerging] = (0, import_react.useState)(null);
	if (family.separate_keys.length === 0) return null;
	async function merge(slot) {
		setMerging(slot);
		try {
			await deleteSecret(slot);
			window.dispatchEvent(new CustomEvent("jarvis:secret-configured", { detail: {
				key: slot,
				action: "delete"
			} }));
			pushToast("info", t("providers_page.separate_merged_toast").replace("{0}", family.label));
			await onChanged();
		} catch (cause) {
			pushToast("error", cause.message);
		} finally {
			setMerging(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSection, {
		title: t("providers_page.separate_title"),
		children: family.separate_keys.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {
			"data-testid": `provider-separate-key-${entry.slot}`,
			title: t(`providers_page.separate_${entry.surface}`),
			control: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: "outline",
				disabled: merging !== null || !family.key_present,
				title: family.key_present ? void 0 : t("providers_page.separate_needs_main"),
				onClick: () => void merge(entry.slot),
				children: [merging === entry.slot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), t("providers_page.separate_merge")]
			})
		}, entry.slot))
	});
}
function useBrowserLock() {
	const [enabled, setEnabledState] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const refetch = (0, import_react.useCallback)(async () => {
		setError(null);
		try {
			const res = await fetch("/api/settings/browser-login");
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const data = await res.json();
			setEnabledState(Boolean(data.enabled));
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		refetch();
	}, [refetch]);
	return {
		enabled,
		loading,
		error,
		refetch,
		setEnabled: (0, import_react.useCallback)(async (next) => {
			const res = await fetch("/api/settings/browser-login", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ enabled: next })
			});
			const body = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(body.detail ?? `HTTP ${res.status}`);
			setEnabledState(Boolean(body.enabled));
			return body;
		}, [])
	};
}
function useJarvisApi() {
	const [data, setData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const refetch = (0, import_react.useCallback)(async () => {
		setError(null);
		try {
			const res = await fetch("/api/control/api-key");
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			setData(await res.json());
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		refetch();
	}, [refetch]);
	return {
		data,
		loading,
		error,
		refetch,
		rotate: (0, import_react.useCallback)(async () => {
			const res = await fetch("/api/control/api-key/rotate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ confirm: true })
			});
			const body = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(body.detail ?? `HTTP ${res.status}`);
			const result = body;
			setData({
				key: result.key,
				masked: result.masked
			});
			return result;
		}, []),
		setKey: (0, import_react.useCallback)(async (value) => {
			const res = await fetch("/api/control/api-key", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					value,
					confirm: true
				})
			});
			const body = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(body.detail ?? `HTTP ${res.status}`);
			setData({
				key: value.trim(),
				masked: body.masked ?? "…"
			});
		}, [])
	};
}
var MIN_CUSTOM_KEY_LENGTH = 12;
var CUSTOM_KEY_RE = /^[A-Za-z0-9._~-]+$/;
function JarvisApiGroup() {
	const t = useT();
	const { data, loading, error, rotate, setKey } = useJarvisApi();
	const browserLock = useBrowserLock();
	const pushToast = useEventStore((s) => s.pushToast);
	const [revealed, setRevealed] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [confirmRotate, setConfirmRotate] = (0, import_react.useState)(false);
	const [confirmLock, setConfirmLock] = (0, import_react.useState)(false);
	const [lockBusy, setLockBusy] = (0, import_react.useState)(false);
	const [formOpen, setFormOpen] = (0, import_react.useState)(false);
	const [newKey, setNewKey] = (0, import_react.useState)("");
	const [repeatKey, setRepeatKey] = (0, import_react.useState)("");
	const [formErrorKey, setFormErrorKey] = (0, import_react.useState)(null);
	const [serverError, setServerError] = (0, import_react.useState)(null);
	const key = data?.key ?? "";
	const display = revealed ? key : data?.masked ?? "…";
	(0, import_react.useEffect)(() => {
		if (!confirmRotate && !confirmLock) return;
		const onKeyDown = (e) => {
			if (e.key === "Escape") {
				setConfirmRotate(false);
				setConfirmLock(false);
			}
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [confirmRotate, confirmLock]);
	async function applyBrowserLock(next) {
		setLockBusy(true);
		try {
			await browserLock.setEnabled(next);
			setConfirmLock(false);
			pushToast("success", next ? t("settings_view.jarvis_api.browser_lock_on_toast") : t("settings_view.jarvis_api.browser_lock_off_toast"));
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setLockBusy(false);
		}
	}
	function onToggleBrowserLock(next) {
		if (next) {
			setConfirmLock(true);
			return;
		}
		applyBrowserLock(false);
	}
	async function onCopy() {
		if (!key) return;
		const ok = await robustCopy(key);
		pushToast(ok ? "success" : "error", ok ? t("settings_view.jarvis_api.copied_toast") : t("settings_view.jarvis_api.copy_failed_toast"));
	}
	async function onRotate() {
		setBusy(true);
		try {
			await rotate();
			setRevealed(false);
			setConfirmRotate(false);
			pushToast("success", t("settings_view.jarvis_api.regenerated_toast"));
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setBusy(false);
		}
	}
	function closeForm() {
		setFormOpen(false);
		setNewKey("");
		setRepeatKey("");
		setFormErrorKey(null);
		setServerError(null);
	}
	async function onSubmitCustomKey(event) {
		event.preventDefault();
		const value = newKey.trim();
		setServerError(null);
		if (value.length < MIN_CUSTOM_KEY_LENGTH) {
			setFormErrorKey("settings_view.jarvis_api.custom_too_short");
			return;
		}
		if (!CUSTOM_KEY_RE.test(value)) {
			setFormErrorKey("settings_view.jarvis_api.custom_charset");
			return;
		}
		if (value !== repeatKey.trim()) {
			setFormErrorKey("settings_view.jarvis_api.custom_mismatch");
			return;
		}
		setFormErrorKey(null);
		setBusy(true);
		try {
			await setKey(value);
			setRevealed(false);
			closeForm();
			pushToast("success", t("settings_view.jarvis_api.custom_saved_toast"));
		} catch (e) {
			setServerError(e.message);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsBlock, {
		icon: KeyRound,
		title: t("settings_view.jarvis_api.title"),
		description: t("settings_view.jarvis_api.description"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "min-w-0 flex-1 truncate rounded-lg bg-muted px-3 py-2 font-mono text-xs",
								children: display
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								disabled: loading || !key,
								onClick: () => setRevealed((v) => !v),
								children: revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "mr-1 h-3.5 w-3.5" }), t("settings_view.jarvis_api.hide")] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "mr-1 h-3.5 w-3.5" }), t("settings_view.jarvis_api.show")] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								disabled: loading || !key,
								onClick: onCopy,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "mr-1 h-3.5 w-3.5" }), t("settings_view.jarvis_api.copy_button")]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: t("settings_view.jarvis_api.unlock_hint")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3 rounded-lg border border-border bg-card p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-medium",
									children: t("settings_view.jarvis_api.browser_lock_title")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-xs text-muted-foreground",
									children: t("settings_view.jarvis_api.browser_lock_description")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: browserLock.enabled ?? false,
								disabled: browserLock.loading || lockBusy,
								"aria-label": t("settings_view.jarvis_api.browser_lock_title"),
								onCheckedChange: onToggleBrowserLock
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							disabled: busy || loading,
							onClick: () => {
								setServerError(null);
								setFormOpen((v) => !v);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PencilLine, { className: "mr-1 h-3.5 w-3.5" }), t("settings_view.jarvis_api.custom_button")]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "ghost",
							disabled: busy || loading,
							onClick: () => setConfirmRotate(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "mr-1 h-3.5 w-3.5" }), t("settings_view.jarvis_api.regenerate_button")]
						})]
					}),
					formOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "space-y-3 rounded-xl border border-border bg-background p-4",
						onSubmit: onSubmitCustomKey,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: t("settings_view.jarvis_api.custom_hint")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsField, {
								label: t("settings_view.jarvis_api.custom_new_label"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									autoComplete: "new-password",
									className: "h-9 w-full rounded-md border border-border-strong bg-input px-3 text-base text-foreground placeholder:text-foreground-faint transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
									disabled: busy,
									onChange: (e) => setNewKey(e.target.value),
									type: "password",
									value: newKey
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsField, {
								label: t("settings_view.jarvis_api.custom_repeat_label"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									autoComplete: "new-password",
									className: "h-9 w-full rounded-md border border-border-strong bg-input px-3 text-base text-foreground placeholder:text-foreground-faint transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
									disabled: busy,
									onChange: (e) => setRepeatKey(e.target.value),
									type: "password",
									value: repeatKey
								})
							}),
							(formErrorKey || serverError) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-destructive",
								role: "alert",
								children: formErrorKey ? t(formErrorKey) : serverError
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									type: "button",
									disabled: busy,
									onClick: closeForm,
									children: t("common.cancel")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									type: "submit",
									disabled: busy || !newKey || !repeatKey,
									children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1 h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "mr-1 h-3.5 w-3.5" }), t("settings_view.jarvis_api.custom_submit")]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: t("settings_view.jarvis_api.usage_hint")
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-destructive",
						children: error
					})
				]
			}),
			confirmLock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-scrim/60 backdrop-blur-sm",
				onClick: (e) => {
					if (e.target === e.currentTarget) setConfirmLock(false);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-4 w-full max-w-md rounded-lg bg-popover shadow-float p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5 text-muted-foreground" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-semibold",
								children: t("settings_view.jarvis_api.browser_lock_confirm_title")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: t("settings_view.jarvis_api.browser_lock_confirm_body")
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex justify-end gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								disabled: lockBusy,
								onClick: () => setConfirmLock(false),
								children: t("common.cancel")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								disabled: lockBusy || !key,
								onClick: onCopy,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "mr-1.5 h-4 w-4" }), t("settings_view.jarvis_api.copy_button")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								disabled: lockBusy,
								onClick: () => void applyBrowserLock(true),
								children: [lockBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "mr-1.5 h-4 w-4" }), t("settings_view.jarvis_api.browser_lock_confirm_button")]
							})
						]
					})]
				})
			}),
			confirmRotate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-scrim/60 backdrop-blur-sm",
				onClick: (e) => {
					if (e.target === e.currentTarget) setConfirmRotate(false);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-4 w-full max-w-md rounded-lg bg-popover shadow-float p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5 text-destructive" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-semibold",
								children: t("settings_view.jarvis_api.regenerate_confirm_title")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: t("settings_view.jarvis_api.regenerate_confirm_body")
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							disabled: busy,
							onClick: () => setConfirmRotate(false),
							children: t("common.cancel")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "destructive",
							size: "sm",
							disabled: busy,
							onClick: onRotate,
							children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "mr-1.5 h-4 w-4" }), t("settings_view.jarvis_api.regenerate_confirm_button")]
						})]
					})]
				})
			})
		]
	});
}
var TABS = ["agents", "voice"];
var TAB_STORAGE_KEY = "jarvis.apikeys.tab";
var isTab = (value) => value !== null && TABS.includes(value);
function rememberTab(tab) {
	try {
		localStorage.setItem(TAB_STORAGE_KEY, tab);
	} catch {}
}
function initialTab() {
	const asked = takeRequestedApiKeysTab();
	if (isTab(asked)) {
		rememberTab(asked);
		return asked;
	}
	try {
		const saved = localStorage.getItem(TAB_STORAGE_KEY);
		if (saved && TABS.includes(saved)) return saved;
	} catch {}
	return "agents";
}
function ApiKeysView() {
	const t = useT();
	const stringsReady = useLocaleChunk("providers");
	const { providers, refetch } = useProviders();
	const families = useProviderFamilies();
	const { health } = useSectionHealth();
	const [tab, setTab] = (0, import_react.useState)(initialTab);
	const choose = (next) => {
		setTab(next);
		rememberTab(next);
	};
	(0, import_react.useEffect)(() => {
		const onRequest = () => {
			const asked = takeRequestedApiKeysTab();
			if (isTab(asked)) {
				setTab(asked);
				rememberTab(asked);
			}
		};
		window.addEventListener(APIKEYS_TAB_EVENT, onRequest);
		return () => window.removeEventListener(APIKEYS_TAB_EVENT, onRequest);
	}, []);
	if (!stringsReady) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "status",
		"aria-busy": "true",
		className: "flex h-full items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			"aria-hidden": "true",
			className: "h-5 w-5 animate-spin text-muted-foreground"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		"data-tour": "apikeys-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shrink-0 px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("apikeys_view.title"),
				description: t("providers_page.subtitle"),
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "ghost",
					className: "text-muted-foreground",
					"data-testid": "providers-refresh",
					disabled: families.loading,
					onClick: () => {
						refetch();
						families.reload();
					},
					children: [families.loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckedAgo, { at: families.checkedAt })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabSwitch, {
					value: tab,
					onChange: choose
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-testid": "api-keys-provider-scroll",
			className: "min-h-0 flex-1 overflow-y-auto scrollbar-jarvis px-8 pb-10 pt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "tabpanel",
				id: "apikeys-panel",
				"aria-labelledby": `apikeys-tab-${tab}`,
				className: "profile-rise w-full",
				children: [
					tab === "voice" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceTab, {
						data: families,
						onSaved: refetch
					}),
					tab === "agents" && (families.error === "restart_required" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RestartNeeded, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentsTab, {
						data: families,
						providers,
						health,
						onProvidersChanged: refetch
					})),
					tab === "agents" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JarvisApiGroup, {})
					})
				]
			}, tab)
		})]
	});
}
function TabSwitch({ value, onChange }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "tablist",
		"aria-label": t("apikeys_view.title"),
		"data-testid": "api-keys-category-tabs",
		className: "inline-flex rounded-lg border border-border/60 bg-card/40 p-0.5",
		children: TABS.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			role: "tab",
			id: `apikeys-tab-${tab}`,
			"aria-selected": value === tab,
			"aria-controls": "apikeys-panel",
			onClick: () => onChange(tab),
			className: cn("h-7 rounded-md px-3 text-sm font-medium transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", value === tab ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"),
			children: t(`providers_page.tab_${tab}`)
		}, tab))
	});
}
function VoiceTab({ data, onSaved }) {
	const openai = data.families?.find((family) => family.id === "openai");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-testid": "apikeys-voice",
		className: "mx-auto w-full max-w-3xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsGroup, {
			divided: false,
			className: "p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveProfile, {
				onSaved,
				keyField: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyField, {
					slot: openai?.key_slot ?? "openai_api_key",
					present: openai?.key_present ?? false,
					providerLabel: "OpenAI",
					dashboardUrl: openai?.dashboard_url,
					onChanged: () => void data.reload(),
					testId: "voice-key"
				})
			})
		})
	});
}
function CheckedAgo({ at }) {
	const t = useT();
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		const timer = window.setInterval(() => setNow(Date.now()), 3e4);
		return () => window.clearInterval(timer);
	}, []);
	if (at === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: t("providers_page.checking") });
	const minutes = Math.floor(Math.max(0, now - at) / 6e4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: minutes < 1 ? t("providers_page.checked_now") : t("providers_page.checked_minutes").replace("{0}", String(minutes)) });
}
function RestartNeeded() {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const [restarting, setRestarting] = (0, import_react.useState)(false);
	async function restart() {
		setRestarting(true);
		try {
			const response = await fetch("/api/settings/restart-app", { method: "POST" });
			if (response.status === 409) {
				pushToast("warning", t("topbar.restart_missions_running"));
				setRestarting(false);
				return;
			}
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
		} catch (cause) {
			pushToast("error", cause.message);
			setRestarting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "status",
		"data-testid": "providers-restart-needed",
		className: "flex items-center gap-4 rounded-xl border border-border/60 bg-card/40 px-4 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
				"aria-hidden": "true",
				className: "h-4 w-4 shrink-0 text-muted-foreground"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-foreground",
					children: t("providers_page.restart_title")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-xs text-muted-foreground",
					children: t("providers_page.restart_desc")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				disabled: restarting,
				onClick: () => void restart(),
				children: [restarting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), t("providers_page.restart_action")]
			})
		]
	});
}
export { ApiKeysView };
