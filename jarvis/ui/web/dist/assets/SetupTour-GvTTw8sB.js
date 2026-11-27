import { t as Check } from "./check-vbwKkbPq.js";
import { t as ChevronRight } from "./chevron-right-BjVJ-R2c.js";
import { n as providerFamily, t as ProviderLogo } from "./ProviderLogo-BxoN_q6P.js";
import { t as Lock } from "./lock-ByyvnTXx.js";
import { Ar as switchSttProvider, Bc as require_jsx_runtime, Dr as switchComputerUseProvider, Er as switchBrainProvider, Fr as useProviders, Gs as fill, Ln as cn, Mr as switchTtsProvider, Q as useWakeWord, Qi as ArrowLeft, Qs as setUiLanguage, Rr as putVoiceMode, Wi as Copy, Xc as require_react, Yc as require_react_dom, Zi as ArrowRight, ji as LoaderCircle, jr as switchSubagentProvider, kr as switchRealtimeProvider, ln as Button, n as TOUR_LAYER_ATTR, nc as useLocaleChunk, oc as useT, sc as useUiLanguage, tl as __toESM, wc as useEventStore } from "./index-BOzhgzD7.js";
import { d as validateCombo, u as useKeybinds } from "./useHotkey-DslvxXH_.js";
import "./controls-3r-tbmGH.js";
import { t as Switch } from "./switch-hmH-TV55.js";
import { SectionWalk, a as GuidePetFigure, i as QuietAction, n as isWizardStep, r as resumeStep, t as WIZARD_STEP_IDS } from "./SectionWalk-C2JR2EqL.js";
import { n as useAutostart, t as deriveAssistantName } from "./deriveAssistantName-DT_UBkhV.js";
import { a as validationText, i as formatCombo, o as useChordCapture } from "./KeybindRow-CsBDhzH4.js";
import { t as ApiKeyForm } from "./ApiKeyForm-DwgnNKoR.js";
var import_react_dom = require_react_dom();
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
async function json(res) {
	if (!res.ok) {
		const body = await res.json().catch(() => ({}));
		throw new Error(body.detail ?? `HTTP ${res.status}`);
	}
	return await res.json();
}
async function getStarterPlans() {
	return json(await fetch("/api/setup/starter-plans", { cache: "no-store" }));
}
async function selectStarterPlan(planId) {
	await json(await fetch(`/api/setup/starter-plans/${encodeURIComponent(planId)}`, { method: "POST" }));
}
var APPLY_ORDER = [
	"brain",
	"computer-use",
	"subagent",
	"tts",
	"stt",
	"realtime"
];
async function applyStarterPlan(plan) {
	const out = {
		applied: [],
		failed: [],
		modeSet: false
	};
	for (const surface of APPLY_ORDER) {
		const provider = plan.assignments[surface];
		if (!provider) continue;
		try {
			switch (surface) {
				case "brain":
					await switchBrainProvider(provider);
					break;
				case "computer-use":
					await switchComputerUseProvider(provider);
					break;
				case "subagent":
					await switchSubagentProvider(provider);
					break;
				case "tts":
					await switchTtsProvider(provider);
					break;
				case "stt":
					await switchSttProvider(provider);
					break;
				case "realtime":
					await switchRealtimeProvider(provider);
					break;
			}
			out.applied.push(surface);
		} catch (e) {
			out.failed.push({
				surface,
				error: e instanceof Error ? e.message : String(e)
			});
		}
	}
	try {
		await putVoiceMode(plan.mode);
		out.modeSet = true;
	} catch (e) {
		out.failed.push({
			surface: "voice-mode",
			error: e instanceof Error ? e.message : String(e)
		});
	}
	window.dispatchEvent(new CustomEvent("jarvis:provider-config-changed"));
	return out;
}
function primarySlot(p) {
	return p.secret_keys[0] ?? null;
}
function slotConfigured(p) {
	const slot = primarySlot(p);
	if (!slot) return p.configured;
	return Boolean(p.secrets_set[slot]);
}
function slotEffective(p) {
	const slot = primarySlot(p);
	if (!slot) return p.configured;
	return Boolean(p.secrets_effective?.[slot] ?? p.secrets_set[slot]);
}
function startableProviders(providers) {
	return providers.filter((p) => p.tier === "brain" && p.auth_mode === "api_key" && p.brain_switchable !== false).filter((p) => (p.secret_keys?.length ?? 0) > 0).sort((a, b) => {
		const ra = a.recommended ? 0 : 1;
		const rb = b.recommended ? 0 : 1;
		if (ra !== rb) return ra - rb;
		return (slotConfigured(a) ? 0 : 1) - (slotConfigured(b) ? 0 : 1);
	});
}
function planKeysComplete(plan, startable) {
	return plan.key_slots.length > 0 && plan.key_slots.every((s) => startable.some((p) => primarySlot(p) === s.slot && slotEffective(p)));
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
const PROVIDER_ROWS = [
	{
		id: "claude",
		label: "Claude",
		logoId: "claude-cli",
		keyFamily: "claude",
		subscription: {
			statusUrl: "/api/claude/status",
			loginUrl: "/api/claude/login",
			plans: "Claude Pro · Max",
			isReady: (s) => Boolean(s.connected && s.mode === "subscription")
		}
	},
	{
		id: "openai",
		label: "OpenAI",
		logoId: "openai-codex",
		keyFamily: "openai",
		subscription: {
			statusUrl: "/api/codex/status",
			loginUrl: "/api/codex/login",
			plans: "ChatGPT Plus · Pro",
			isReady: (s) => Boolean(s.connected)
		}
	},
	{
		id: "google",
		label: "Google Gemini",
		logoId: "gemini",
		keyFamily: "gemini",
		subscription: {
			statusUrl: "/api/antigravity/status",
			loginUrl: "/api/antigravity/login",
			plans: "Google AI Pro · Ultra",
			isReady: (s) => Boolean(s.connected && s.mode !== "api_key")
		}
	},
	{
		id: "grok",
		label: "xAI Grok",
		logoId: "grok",
		keyFamily: "xai",
		subscription: {
			statusUrl: "/api/grok-build/status",
			loginUrl: "/api/grok-build/login",
			plans: "SuperGrok · X Premium+",
			isReady: (s) => Boolean(s.connected && s.mode === "subscription")
		}
	}
];
var LOGIN_POLL_MS = 2500;
var LOGIN_POLL_MAX_MS = 18e4;
async function readStatus(url) {
	try {
		const res = await fetch(url);
		if (!res.ok) return null;
		return await res.json();
	} catch {
		return null;
	}
}
function useSubscription(spec) {
	const [phase, setPhase] = (0, import_react.useState)("checking");
	const [status, setStatus] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [installCommand, setInstallCommand] = (0, import_react.useState)(null);
	const alive = (0, import_react.useRef)(true);
	const apply = (0, import_react.useCallback)((next) => {
		if (!alive.current) return false;
		setStatus(next);
		return Boolean(next && spec.isReady(next));
	}, [spec]);
	(0, import_react.useEffect)(() => {
		alive.current = true;
		readStatus(spec.statusUrl).then((s) => {
			const ready = apply(s);
			if (alive.current) setPhase(ready ? "ready" : "idle");
		});
		return () => {
			alive.current = false;
		};
	}, [spec.statusUrl, apply]);
	return {
		phase,
		status,
		error,
		installCommand,
		connect: (0, import_react.useCallback)(async () => {
			setError(null);
			setPhase("starting");
			try {
				const res = await fetch(spec.loginUrl, { method: "POST" });
				const body = await res.json().catch(() => ({}));
				if (!res.ok) {
					const detail = body.detail;
					if (detail && typeof detail === "object" && "install_command" in detail) setInstallCommand(String(detail.install_command));
					else setError(typeof detail === "string" ? detail : `HTTP ${res.status}`);
					if (alive.current) setPhase("idle");
					return;
				}
			} catch (e) {
				setError(e.message);
				if (alive.current) setPhase("idle");
				return;
			}
			setInstallCommand(null);
			setPhase("waiting");
			const deadline = Date.now() + LOGIN_POLL_MAX_MS;
			while (alive.current && Date.now() < deadline) {
				await new Promise((r) => setTimeout(r, LOGIN_POLL_MS));
				if (apply(await readStatus(spec.statusUrl))) {
					setPhase("ready");
					return;
				}
			}
			if (alive.current) setPhase("idle");
		}, [spec, apply]),
		checkAgain: (0, import_react.useCallback)(async () => {
			setPhase("checking");
			const fresh = await readStatus(spec.statusUrl);
			const ready = apply(fresh);
			if (!alive.current) return;
			if (ready || fresh?.installed) setInstallCommand(null);
			setPhase(ready ? "ready" : "idle");
		}, [spec.statusUrl, apply])
	};
}
function Mark({ providerId, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderLogo, {
		providerId,
		label,
		className: "h-5 w-5 rounded-none bg-transparent"
	});
}
function ReadyMark() {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5 text-xs font-medium text-success",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
			"aria-hidden": true,
			className: "h-3.5 w-3.5"
		}), t("first_run.connect.ready")]
	});
}
function KeyPanel({ provider, onChanged }) {
	const slot = primarySlot(provider);
	if (!slot) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-t border-border px-4 pb-4 pt-3",
		"data-testid": `setup-key-panel-${provider.id}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApiKeyForm, {
			secretKey: slot,
			dashboardUrl: provider.dashboard_url,
			configured: slotConfigured(provider),
			effectiveConfigured: slotEffective(provider),
			credentialHelp: provider.credential_help,
			onChanged
		})
	});
}
function KeyToggle({ open, onClick, testId }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		size: "sm",
		variant: "ghost",
		onClick,
		"aria-expanded": open,
		"data-testid": testId,
		className: "text-muted-foreground",
		children: [t("first_run.connect.api_key"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
			"aria-hidden": true,
			className: cn("transition-transform", open && "rotate-90")
		})]
	});
}
function ProviderRow({ spec, keyProvider, onReady, onKeyChanged }) {
	const t = useT();
	const sub = useSubscription(spec.subscription);
	const [keyOpen, setKeyOpen] = (0, import_react.useState)(false);
	const signedIn = sub.phase === "ready";
	const keySaved = Boolean(keyProvider && slotEffective(keyProvider));
	(0, import_react.useEffect)(() => {
		onReady(spec.id, signedIn);
	}, [
		spec.id,
		signedIn,
		onReady
	]);
	const parts = [];
	if (signedIn) parts.push(sub.status?.user_email ? fill(t("first_run.connect.signed_in_as"), { account: sub.status.user_email }) : t("first_run.connect.signed_in"));
	if (keySaved) parts.push(t("first_run.connect.key_saved"));
	const detail = sub.phase === "waiting" ? t("first_run.connect.finish_in_browser") : parts.length > 0 ? parts.join(" · ") : keyProvider ? fill(t("first_run.connect.plans_or_key"), { plans: spec.subscription.plans }) : spec.subscription.plans;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-popover",
		"data-testid": `setup-sub-${spec.id}`,
		"data-state": sub.phase,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3 px-4 py-3.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						providerId: spec.logoId,
						label: spec.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-foreground",
							children: spec.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 truncate text-xs text-muted-foreground",
							children: detail
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center gap-1.5",
						children: [keyProvider && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyToggle, {
							open: keyOpen,
							onClick: () => setKeyOpen((o) => !o),
							testId: `setup-sub-${spec.id}-key`
						}), signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadyMark, {}) : sub.phase === "checking" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "px-2 text-xs text-muted-foreground",
							children: t("first_run.connect.checking")
						}) : sub.phase === "waiting" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 px-2 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								"aria-hidden": true,
								className: "h-3.5 w-3.5 animate-spin"
							}), t("first_run.connect.waiting")]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => void sub.connect(),
							disabled: sub.phase === "starting",
							"data-testid": `setup-sub-${spec.id}-connect`,
							children: [sub.phase === "starting" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								"aria-hidden": true,
								className: "animate-spin"
							}), t("first_run.connect.sign_in")]
						})]
					})
				]
			}),
			sub.installCommand && !signedIn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 px-4 pb-3.5 pl-12",
				"data-testid": `setup-sub-${spec.id}-install`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: t("first_run.connect.install_first")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandBlock, { command: sub.installCommand }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => void sub.checkAgain(),
						children: t("first_run.connect.check_again")
					})
				]
			}),
			sub.error && !signedIn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 pb-3 pl-12 text-xs text-destructive",
				children: sub.error
			}),
			keyOpen && keyProvider && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyPanel, {
				provider: keyProvider,
				onChanged: onKeyChanged
			})
		]
	});
}
function KeyOnlyRow({ provider, onKeyChanged }) {
	const t = useT();
	const [open, setOpen] = (0, import_react.useState)(false);
	const saved = slotEffective(provider);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-popover",
		"data-testid": `setup-key-row-${provider.id}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 px-4 py-3.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
					providerId: provider.id,
					label: provider.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-foreground",
						children: provider.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 truncate text-xs text-muted-foreground",
						children: saved ? t("first_run.connect.key_saved") : t("first_run.connect.key_only")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyToggle, {
						open,
						onClick: () => setOpen((o) => !o),
						testId: `setup-key-row-${provider.id}-key`
					}), saved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadyMark, {})]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyPanel, {
			provider,
			onChanged: onKeyChanged
		})]
	});
}
function CommandBlock({ command }) {
	const t = useT();
	const [copied, setCopied] = (0, import_react.useState)(false);
	async function copy() {
		try {
			await navigator.clipboard.writeText(command);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1500);
		} catch {}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary px-3 py-2 font-mono text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0 select-all truncate",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mr-2 text-muted-foreground",
				children: "$"
			}), command]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => void copy(),
			"aria-label": t("first_run.connect.copy"),
			className: "shrink-0 rounded p-1 text-muted-foreground transition-colors hover:bg-surface-raised hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
			children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				"aria-hidden": true,
				className: "h-3.5 w-3.5"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				"aria-hidden": true,
				className: "h-3.5 w-3.5"
			})
		})]
	});
}
function useKeyActivation(providers) {
	const [plans, setPlans] = (0, import_react.useState)([]);
	const [savedSlot, setSavedSlot] = (0, import_react.useState)(null);
	const [connecting, setConnecting] = (0, import_react.useState)(false);
	const [connected, setConnected] = (0, import_react.useState)(null);
	const [partial, setPartial] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		getStarterPlans().then((res) => {
			if (!cancelled) setPlans(res.plans);
		}).catch(() => {});
		const onSaved = (event) => {
			const detail = event.detail;
			if (detail?.action === "set" && typeof detail.key === "string") setSavedSlot(detail.key);
		};
		window.addEventListener("jarvis:secret-configured", onSaved);
		return () => {
			cancelled = true;
			window.removeEventListener("jarvis:secret-configured", onSaved);
		};
	}, []);
	const withKey = providers.filter((p) => (p.secret_keys?.length ?? 0) > 0 && slotEffective(p));
	const startableNow = startableProviders(providers);
	const liveVoice = plans.some((p) => p.mode === "realtime" && planKeysComplete(p, startableNow));
	const localBrain = providers.some((p) => p.tier === "brain" && p.active && (p.secret_keys?.length ?? 0) === 0);
	const hasKey = startableNow.some(slotEffective) || localBrain;
	(0, import_react.useEffect)(() => {
		if (!savedSlot || connecting || connected) return;
		if (!providers.some((p) => p.secret_keys?.includes(savedSlot) && slotEffective(p))) return;
		const startable = startableProviders(providers);
		const plan = plans.find((p) => p.key_slots.some((s) => s.slot === savedSlot) && planKeysComplete(p, startable));
		let cancelled = false;
		setConnecting(true);
		(async () => {
			try {
				if (plan) {
					await selectStarterPlan(plan.id).catch(() => void 0);
					const outcome = await applyStarterPlan(plan);
					if (cancelled) return;
					if (outcome.failed.length > 0) setPartial(outcome.failed.map((f) => f.surface).join(", "));
					setConnected(plan.label);
				} else {
					const brain = startable.find((p) => p.secret_keys.includes(savedSlot) && slotEffective(p));
					if (brain && !startable.some((p) => p.active)) await switchBrainProvider(brain.id);
					if (cancelled) return;
					setConnected(brain?.label ?? withKey.find((p) => p.secret_keys.includes(savedSlot))?.label ?? savedSlot);
				}
			} catch (e) {
				if (!cancelled) setPartial(e instanceof Error ? e.message : String(e));
			} finally {
				if (!cancelled) setConnecting(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [
		savedSlot,
		providers,
		plans
	]);
	return {
		hasKey,
		connecting,
		connected,
		partial,
		liveVoice
	};
}
function ConnectStep({ onConnectedChange }) {
	const t = useT();
	const { providers, refetch } = useProviders();
	const activation = useKeyActivation(providers);
	const startable = (0, import_react.useMemo)(() => startableProviders(providers), [providers]);
	const [ready, setReady] = (0, import_react.useState)({});
	const [moreOpen, setMoreOpen] = (0, import_react.useState)(false);
	const onReady = (0, import_react.useCallback)((id, ok) => {
		setReady((prev) => prev[id] === ok ? prev : {
			...prev,
			[id]: ok
		});
	}, []);
	const onKeyChanged = (0, import_react.useCallback)(() => void refetch(), [refetch]);
	const anything = Object.values(ready).some(Boolean) || activation.hasKey;
	(0, import_react.useEffect)(() => {
		onConnectedChange(anything);
	}, [anything, onConnectedChange]);
	const rowFamilies = new Set(PROVIDER_ROWS.map((r) => r.keyFamily));
	const keyFor = (family) => startable.find((p) => providerFamily(p.id) === family);
	const others = startable.filter((p) => !rowFamilies.has(providerFamily(p.id) ?? ""));
	const { connecting, connected, partial, liveVoice, hasKey } = activation;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [
			PROVIDER_ROWS.map((spec) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderRow, {
				spec,
				keyProvider: keyFor(spec.keyFamily),
				onReady,
				onKeyChanged
			}, spec.id)),
			others.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pt-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setMoreOpen((o) => !o),
					"aria-expanded": moreOpen,
					"data-testid": "setup-more-providers",
					className: "group flex items-center gap-1 rounded text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
						"aria-hidden": true,
						className: cn("h-3.5 w-3.5 transition-transform", moreOpen && "rotate-90")
					}), t("first_run.connect.more")]
				}), moreOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 space-y-1.5",
					children: others.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyOnlyRow, {
						provider: p,
						onKeyChanged
					}, p.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5 pt-3 text-xs leading-relaxed text-muted-foreground",
				"data-testid": "setup-key-status",
				children: [
					connecting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("first_run.connect.key_connecting") }) : connected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fill(t("first_run.connect.key_connected"), { provider: connected }) }) : null,
					partial && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-warning",
						children: fill(t("first_run.connect.key_partial"), { parts: partial })
					}),
					hasKey && !connecting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-testid": "setup-key-live",
						children: liveVoice ? t("first_run.connect.live_ready") : t("first_run.connect.live_missing")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-start gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
							"aria-hidden": true,
							className: "mt-0.5 h-3 w-3 shrink-0"
						}), t("first_run.connect.key_security")]
					})
				]
			})
		]
	});
}
var LANGS = [
	"en",
	"de",
	"es",
	"zh"
];
var LANG_SWITCH_LABEL = {
	en: "EN",
	de: "DE",
	es: "ES",
	zh: "中文"
};
function SetupWizard({ step, preview, onStep, onSkip, onFinish }) {
	const t = useT();
	const titleId = (0, import_react.useId)();
	const index = WIZARD_STEP_IDS.indexOf(step);
	const next = WIZARD_STEP_IDS[index + 1];
	const prev = index > 0 ? WIZARD_STEP_IDS[index - 1] : null;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		[TOUR_LAYER_ATTR]: "",
		className: "fixed inset-0 z-[110] grid place-items-center overflow-y-auto bg-black/50 p-4 backdrop-blur-[2px]",
		"data-testid": "setup-window-backdrop",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": titleId,
			"data-testid": "setup-card",
			"data-step": step,
			className: "flex max-h-[calc(100vh-32px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-float",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "shrink-0 space-y-4 px-6 pb-4 pt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuidePetFigure, {
							state: "success",
							px: 34
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							id: titleId,
							className: "text-lg font-semibold tracking-tight text-foreground",
							children: t("first_run.window.title")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSwitch, { className: "ml-auto" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepPills, {
					current: index,
					onPick: (i) => onStep(WIZARD_STEP_IDS[i])
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 overflow-y-auto border-t border-border bg-background/60 px-6 py-6",
				children: [
					step === "name" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NameStep, { onContinue: () => onStep("connect") }),
					step === "connect" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectStepFrame, {
						onBack: () => prev && onStep(prev),
						onContinue: (anything) => anything ? onStep(next ?? "voice") : onSkip(next ?? "voice")
					}),
					step === "voice" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceStep, {
						preview,
						onBack: () => prev && onStep(prev),
						onFinish
					})
				]
			})]
		})
	}), document.body);
}
function StepPills({ current, onPick }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "grid auto-cols-fr grid-flow-col gap-1 rounded-xl bg-secondary p-1 ring-1 ring-border",
		"aria-label": t("first_run.window.progress"),
		"data-testid": "setup-steps",
		children: WIZARD_STEP_IDS.map((id, i) => {
			const done = i < current;
			const here = i === current;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "min-w-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: !done,
					onClick: () => onPick(i),
					"aria-current": here ? "step" : void 0,
					"data-testid": `setup-pill-${id}`,
					className: cn("flex w-full min-w-0 items-center gap-2 rounded-lg px-2.5 py-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring max-sm:justify-center", done && "cursor-pointer hover:bg-popover", !done && "cursor-default", here && "bg-popover shadow-sm ring-1 ring-border"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: cn("grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs font-medium ring-1", done ? "bg-accent text-accent-foreground ring-accent" : here ? "bg-accent-soft text-accent ring-accent" : "bg-popover text-muted-foreground ring-border"),
						children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }) : i + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("min-w-0 truncate text-sm font-medium max-sm:hidden", here ? "text-foreground" : "text-muted-foreground"),
						children: t(`first_run.${id}.pill`)
					})]
				})
			}, id);
		})
	});
}
function LanguageSwitch({ className }) {
	const t = useT();
	const lang = useUiLanguage();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex items-center gap-0.5 rounded-full border border-border p-0.5", className),
		role: "radiogroup",
		"aria-label": t("first_run.window.language"),
		children: LANGS.map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			role: "radio",
			"aria-checked": lang === code,
			onClick: () => setUiLanguage(code),
			"data-testid": `onboarding-lang-${code}`,
			className: cn("rounded-full px-2.5 py-0.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", lang === code ? "bg-secondary font-medium text-foreground" : "text-muted-foreground hover:text-foreground"),
			children: LANG_SWITCH_LABEL[code]
		}, code))
	});
}
function StepHead({ title, lede }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "text-2xl font-semibold tracking-tight text-foreground",
		"data-testid": "setup-step-title",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-2.5 text-sm leading-relaxed text-muted-foreground",
		children: lede
	})] });
}
function StepFooter({ left, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6 flex flex-wrap items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: left }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-2",
			children
		})]
	});
}
function BackAction({ onClick }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QuietAction, {
		onClick,
		className: "inline-flex items-center gap-1 text-sm",
		testId: "setup-back",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
			"aria-hidden": true,
			className: "h-3.5 w-3.5"
		}), t("first_run.back")]
	});
}
function NameStep({ onContinue }) {
	const t = useT();
	const { config, saveWakeWord } = useWakeWord();
	const saved = deriveAssistantName(config?.phrase ?? "");
	const [typed, setTyped] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const value = typed ?? saved;
	const name = deriveAssistantName(value);
	async function submit() {
		if (!name) return;
		if (name !== saved) {
			setSaving(true);
			setError(null);
			try {
				const engine = config?.engine && config.engine !== "custom_onnx" ? config.engine : "auto";
				await saveWakeWord({
					phrase: value.trim(),
					engine
				});
			} catch (e) {
				setError(e.message);
				setSaving(false);
				return;
			}
			setSaving(false);
		}
		onContinue();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: (event) => {
			event.preventDefault();
			submit();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHead, {
				title: t("first_run.name.title"),
				lede: t("first_run.name.lede")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				autoFocus: true,
				value,
				onChange: (event) => setTyped(event.target.value),
				placeholder: t("first_run.name.placeholder"),
				"aria-label": t("first_run.name.label"),
				maxLength: 40,
				spellCheck: false,
				autoComplete: "off",
				"data-testid": "setup-name-input",
				className: "mt-5 h-12 w-full rounded-lg border border-border-strong bg-input px-4 text-lg text-foreground placeholder:text-foreground-faint focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-destructive",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "submit",
				disabled: !name || saving,
				"data-testid": "onboarding-primary",
				children: [
					saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						"aria-hidden": true,
						className: "animate-spin"
					}),
					t("first_run.continue"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "aria-hidden": true })
				]
			}) })
		]
	});
}
function ConnectStepFrame({ onBack, onContinue }) {
	const t = useT();
	const [anything, setAnything] = (0, import_react.useState)(false);
	const onConnectedChange = (0, import_react.useCallback)((any) => setAnything(any), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHead, {
			title: t("first_run.connect.title"),
			lede: t("first_run.connect.lede")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectStep, { onConnectedChange })
		}),
		!anything && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-xs leading-relaxed text-muted-foreground",
			"data-testid": "setup-connect-nothing",
			children: t("first_run.connect.nothing_yet")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepFooter, {
			left: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackAction, { onClick: onBack }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: anything ? "default" : "outline",
				onClick: () => onContinue(anything),
				"data-testid": "onboarding-primary",
				children: [anything ? t("first_run.continue") : t("first_run.connect.later"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "aria-hidden": true })]
			})
		})
	] });
}
function SettingRow({ title, detail, control, testId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-4 px-4 py-3.5",
		"data-testid": testId,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-foreground",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-xs leading-relaxed text-muted-foreground",
				children: detail
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shrink-0",
			children: control
		})]
	});
}
function Keycaps({ combo }) {
	const keys = formatCombo(combo).split(" + ").filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex items-center gap-1",
		"data-testid": "setup-voice-keys",
		children: keys.map((key, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
			className: "min-w-6 rounded-md border border-border-strong bg-secondary px-1.5 py-0.5 text-center font-mono text-xs text-foreground shadow-[inset_0_-1px_0_hsl(var(--border-strong))]",
			children: key
		}, `${key}-${i}`))
	});
}
function CallShortcutRow() {
	const t = useT();
	const { config, saveKeybind } = useKeybinds();
	const saved = config?.keybinds?.call?.trim() ?? "";
	const [capturing, setCapturing] = (0, import_react.useState)(false);
	const [live, setLive] = (0, import_react.useState)(null);
	const [message, setMessage] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const others = (0, import_react.useMemo)(() => {
		const out = {};
		for (const [action, combo] of Object.entries(config?.keybinds ?? {})) if (action !== "call" && combo) out[action] = combo;
		return out;
	}, [config]);
	async function commit(combo) {
		setCapturing(false);
		const next = combo.trim().toLowerCase();
		const check = validateCombo(next, others);
		if (check.status === "error") {
			setLive(null);
			setMessage(validationText(check, t) ?? t("first_run.voice.call_refused"));
			return;
		}
		if (next === saved) {
			setLive(null);
			return;
		}
		setSaving(true);
		try {
			await saveKeybind("call", next);
			setMessage(t("first_run.voice.call_saved"));
		} catch (e) {
			setMessage(e.message);
		} finally {
			setLive(null);
			setSaving(false);
		}
	}
	useChordCapture(capturing, {
		onPreview: setLive,
		onCommit: (combo) => void commit(combo),
		onCancel: () => {
			setLive(null);
			setCapturing(false);
		}
	});
	const shown = live ?? saved;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow, {
		testId: "setup-voice-call",
		title: t("first_run.voice.call_title"),
		detail: capturing ? t("first_run.voice.call_recording") : message ?? (saved ? t("first_run.voice.call_detail") : t("first_run.voice.call_none")),
		control: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => {
				setMessage(null);
				setLive(null);
				setCapturing((c) => !c);
			},
			disabled: !config || saving,
			"data-keybind-recording": capturing ? "true" : void 0,
			"aria-label": t("first_run.voice.call_change"),
			"data-testid": "setup-voice-call-field",
			className: cn("flex min-h-9 min-w-28 items-center justify-center gap-2 rounded-lg border px-2.5 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50", capturing ? "border-accent bg-accent-soft" : "border-border-strong bg-background hover:bg-secondary"),
			children: [shown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keycaps, { combo: shown }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-muted-foreground",
				children: t("first_run.voice.call_press")
			}), saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
				"aria-hidden": true,
				className: "h-3.5 w-3.5 animate-spin text-muted-foreground"
			})]
		})
	});
}
function VoiceStep({ preview, onBack, onFinish }) {
	const t = useT();
	const { config, setWakeActivation } = useWakeWord();
	const autostart = useAutostart();
	const assistantName = useEventStore((s) => s.assistantName);
	const [listening, setListening] = (0, import_react.useState)(null);
	const [wakeNote, setWakeNote] = (0, import_react.useState)(null);
	const [startAtLogin, setStartAtLogin] = (0, import_react.useState)(null);
	const phrase = config?.phrase.trim() ?? "";
	const name = deriveAssistantName(phrase) || assistantName;
	const on = listening ?? Boolean(config?.enabled && phrase);
	const loginOn = startAtLogin ?? Boolean(autostart.config?.enabled);
	(0, import_react.useEffect)(() => {
		if (config) setListening(null);
	}, [config]);
	async function toggleListening(next) {
		setListening(next);
		setWakeNote(null);
		try {
			const result = await setWakeActivation(next);
			if (!result.persisted && result.message) setWakeNote(result.message);
			else if (result.restart_required) setWakeNote(t("first_run.voice.after_restart"));
		} catch (e) {
			setListening(!next);
			setWakeNote(e.message);
		}
	}
	async function toggleLogin(next) {
		setStartAtLogin(next);
		try {
			await autostart.setEnabled(next);
		} catch {
			setStartAtLogin(!next);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepHead, {
			title: t("first_run.voice.title"),
			lede: t("first_run.voice.lede")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 divide-y divide-border overflow-hidden rounded-lg border border-border bg-popover",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow, {
					testId: "setup-voice-wake",
					title: phrase ? fill(t("first_run.voice.wake_title"), { phrase: `Hey ${name}` }) : t("first_run.voice.no_word"),
					detail: on ? t("first_run.voice.wake_on") : t("first_run.voice.wake_off"),
					control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: on,
						disabled: !phrase,
						onCheckedChange: (v) => void toggleListening(v),
						"aria-label": t("first_run.voice.wake_switch"),
						"data-testid": "setup-voice-wake-switch"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CallShortcutRow, {}),
				autostart.config?.supported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow, {
					testId: "setup-voice-login",
					title: t("first_run.voice.login_title"),
					detail: t("first_run.voice.login_detail"),
					control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: loginOn,
						onCheckedChange: (v) => void toggleLogin(v),
						"aria-label": t("first_run.voice.login_title"),
						"data-testid": "onboarding-autostart"
					})
				})
			]
		}),
		wakeNote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 px-1 text-xs text-muted-foreground",
			children: wakeNote
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-xs leading-relaxed text-muted-foreground",
			children: preview ? t("first_run.voice.preview_note") : t("first_run.voice.restart_note")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepFooter, {
			left: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackAction, { onClick: onBack }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: onFinish,
				"data-testid": "onboarding-start",
				children: [t("first_run.voice.start"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { "aria-hidden": true })]
			})
		})
	] });
}
function SetupTour({ onb, preview, onFinished, startAt }) {
	const ready = useLocaleChunk("onboarding");
	const [stepId, setStepId] = (0, import_react.useState)(() => preview ? startAt ?? "name" : resumeStep(onb.state?.current_step ?? null));
	const [skipped, setSkipped] = (0, import_react.useState)(() => onb.state?.skipped_steps ?? []);
	const goTo = (0, import_react.useCallback)((target, nextSkipped) => {
		setStepId(target);
		if (!preview) onb.saveStep(target, nextSkipped);
	}, [onb, preview]);
	const skipTo = (0, import_react.useCallback)((target) => {
		const nextSkipped = skipped.includes(stepId) ? skipped : [...skipped, stepId];
		setSkipped(nextSkipped);
		goTo(target, nextSkipped);
	}, [
		skipped,
		stepId,
		goTo
	]);
	if (!ready) return null;
	if (!isWizardStep(stepId)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionWalk, { onDone: onFinished });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupWizard, {
		step: stepId,
		preview,
		onStep: (target) => goTo(target, skipped.filter((id) => id !== stepId)),
		onSkip: skipTo,
		onFinish: () => goTo("tour", skipped)
	});
}
export { SetupTour };
