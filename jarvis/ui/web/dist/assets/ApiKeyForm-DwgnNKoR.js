import { t as EyeOff } from "./eye-off-DCMC9NUY.js";
import { Bc as require_jsx_runtime, Bi as Eye, Ki as CircleCheck, Ln as cn, Pr as testProvider, Vi as ExternalLink, Vn as deleteSecret, Xc as require_react, li as TriangleAlert, ln as Button, mr as postSecret, oc as useT, tl as __toESM, ui as Trash2, wc as useEventStore } from "./index-BOzhgzD7.js";
function detectKeyFormat(value) {
	const v = value.trim();
	if (!v) return null;
	if (v.startsWith("{") && /"type"\s*:\s*"service_account"/.test(v)) return {
		kind: "vertex-service-account",
		label: "Vertex AI service account",
		note: "This is a Vertex AI service-account file, not an AI Studio key — it bills a separate Google Cloud project."
	};
	if (/^sk-ant-/.test(v)) return {
		kind: "anthropic",
		label: "Anthropic API key"
	};
	if (/^sk-or-/.test(v)) return {
		kind: "openrouter",
		label: "OpenRouter API key"
	};
	if (/^nvapi-/.test(v)) return {
		kind: "nvidia",
		label: "NVIDIA API key"
	};
	if (/^sk_car_/.test(v)) return {
		kind: "cartesia",
		label: "Cartesia API key"
	};
	if (/^sk_/.test(v)) return {
		kind: "elevenlabs",
		label: "ElevenLabs API key"
	};
	if (/^gsk_/.test(v)) return {
		kind: "groq",
		label: "Groq API key"
	};
	if (/^xai-/.test(v)) return {
		kind: "xai",
		label: "xAI (Grok) API key"
	};
	if (/^AIza/.test(v)) return {
		kind: "google-aistudio",
		label: "Google AI Studio key",
		note: "This shape works on Google AI Studio. Vertex AI refuses it — Vertex takes only an express-mode key (AQ.) or a Cloud project via [google].vertex_project."
	};
	if (/^AQ\./.test(v)) return {
		kind: "google-express",
		label: "Google API key (AI Studio or Vertex express)",
		note: "AI Studio and Vertex AI express keys share this format — the card you save it under decides the endpoint, and for a Gemini card Sam detects it automatically."
	};
	if (/^sk-/.test(v)) return {
		kind: "openai",
		label: "OpenAI API key"
	};
	return {
		kind: "unknown",
		label: "Unrecognized key format"
	};
}
function expectedKindForSecret(secretKey) {
	switch (secretKey) {
		case "gemini_api_key":
		case "realtime_gemini_api_key":
		case "jarvis_agent_gemini_api_key": return "google-aistudio";
		case "vertex_api_key":
		case "google_vertex_api_key":
		case "realtime_vertex_api_key":
		case "jarvis_agent_vertex_api_key": return "google-vertex";
		case "anthropic_api_key":
		case "jarvis_agent_anthropic_api_key": return "anthropic";
		case "openai_api_key":
		case "codex_openai_api_key":
		case "realtime_openai_api_key":
		case "jarvis_agent_openai_api_key": return "openai";
		case "openrouter_api_key":
		case "jarvis_agent_openrouter_api_key": return "openrouter";
		case "nvidia_api_key":
		case "jarvis_agent_nvidia_api_key": return "nvidia";
		case "grok_api_key":
		case "realtime_grok_api_key":
		case "jarvis_agent_grok_api_key": return "xai";
		case "cartesia_api_key": return "cartesia";
		case "elevenlabs_api_key": return "elevenlabs";
		case "groq_api_key": return "groq";
		default: return null;
	}
}
var COMPATIBLE_KINDS = {
	"google-aistudio": new Set(["google-express"]),
	"google-vertex": new Set(["google-express"])
};
function keyMatchesSecret(secretKey, value) {
	const detected = detectKeyFormat(value);
	const expected = expectedKindForSecret(secretKey);
	if (!detected || expected === null) return {
		match: true,
		detected,
		expected
	};
	if (detected.kind === "unknown") return {
		match: true,
		detected,
		expected
	};
	if (COMPATIBLE_KINDS[expected]?.has(detected.kind)) return {
		match: true,
		detected,
		expected
	};
	return {
		match: detected.kind === expected,
		detected,
		expected
	};
}
function keyFormatConfirmed(result) {
	const { detected, expected, match } = result;
	if (!match || !detected || expected === null) return false;
	if (detected.kind === expected) return true;
	return Boolean(COMPATIBLE_KINDS[expected]?.has(detected.kind));
}
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function announceSecretChange(secretKey, action) {
	window.dispatchEvent(new CustomEvent("jarvis:secret-configured", { detail: {
		key: secretKey,
		action
	} }));
}
function ApiKeyForm({ secretKey, dashboardUrl, configured, credentialHelp, effectiveConfigured, coveredNote, coveredEditLabel, sharedWith, testAfterSave, onChanged, onSavedActivate }) {
	const t = useT();
	const [value, setValue] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [reveal, setReveal] = (0, import_react.useState)(false);
	const coveredByShared = !configured && Boolean(effectiveConfigured);
	const [editing, setEditing] = (0, import_react.useState)(!configured && !effectiveConfigured);
	const [confirmingDelete, setConfirmingDelete] = (0, import_react.useState)(false);
	const [scopeChoice, setScopeChoice] = (0, import_react.useState)(null);
	const pushToast = useEventStore((s) => s.pushToast);
	const fmt = value.trim() ? keyMatchesSecret(secretKey, value) : null;
	async function handleSave(scope) {
		const trimmed = value.trim();
		if (!trimmed) return;
		setPending(true);
		try {
			const result = await postSecret(secretKey, trimmed, scope);
			if (result?.choice_required) {
				setScopeChoice(result);
				return;
			}
			setScopeChoice(null);
			pushToast("success", t("apikeys_view.key_saved_toast").replace("{0}", secretKey));
			setValue("");
			setEditing(false);
			onChanged?.();
			onSavedActivate?.();
			for (const slot of new Set([secretKey, ...result?.written ?? []])) announceSecretChange(slot, "set");
			if (testAfterSave) verifySavedKey(testAfterSave);
		} catch (e) {
			pushToast("error", `${t("common.save_failed")}: ${e.message}`);
		} finally {
			setPending(false);
		}
	}
	async function verifySavedKey(target) {
		let verdict;
		try {
			verdict = await testProvider(target.id);
		} catch (e) {
			verdict = {
				provider: target.id,
				status: "error",
				detail: e.message,
				latency_ms: 0,
				integration_ok: false
			};
		}
		window.dispatchEvent(new CustomEvent("jarvis:provider-tested", { detail: {
			section: target.section,
			provider: target.id,
			provider_label: target.label,
			active: target.active,
			result: verdict
		} }));
		if (verdict.status === "ok") pushToast("success", t("apikeys_view.key_verified_toast").replace("{0}", target.label));
		else pushToast("warning", t("apikeys_view.key_check_failed_toast").replace("{0}", target.label).replace("{1}", verdict.detail || verdict.status));
	}
	async function handleDelete() {
		if ((sharedWith?.length ?? 0) > 0 && !confirmingDelete) {
			setConfirmingDelete(true);
			return;
		}
		setConfirmingDelete(false);
		setPending(true);
		try {
			await deleteSecret(secretKey);
			pushToast("info", t("apikeys_view.key_removed_toast").replace("{0}", secretKey));
			setEditing(true);
			onChanged?.();
			announceSecretChange(secretKey, "delete");
		} catch (e) {
			pushToast("error", `${t("common.delete_failed")}: ${e.message}`);
		} finally {
			setPending(false);
		}
	}
	let dashboardHost = "";
	if (dashboardUrl) try {
		dashboardHost = new URL(dashboardUrl).hostname.replace(/^www\./, "");
	} catch {}
	const dashboardLink = dashboardUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: dashboardUrl,
		target: "_blank",
		rel: "noreferrer",
		className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground-strong",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" }),
			" ",
			dashboardHost ? t("apikeys_view.get_key_at").replace("{0}", dashboardHost) : t("apikeys_view.get_key_here")
		]
	}) : null;
	const familyLabel = scopeChoice?.family_label ?? "";
	const scopeQuestion = scopeChoice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": "secret-scope-choice",
		className: "space-y-2 rounded-control border border-border bg-background px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs leading-relaxed text-foreground",
			children: scopeChoice.choice_kind === "family_vs_dedicated" ? t("apikeys_view.scope_family_question").replace("{0}", familyLabel).replace("{1}", (scopeChoice.conflicting_labels ?? []).join(", ")) : t("apikeys_view.scope_dedicated_question").replace("{0}", familyLabel)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: () => void handleSave("everywhere"),
					disabled: pending,
					className: "h-8 rounded-control",
					children: t("apikeys_view.scope_everywhere").replace("{0}", familyLabel)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => void handleSave("here"),
					disabled: pending,
					className: "h-8 rounded-control",
					children: scopeChoice.choice_kind === "family_vs_dedicated" ? t("apikeys_view.scope_keep_dedicated") : t("apikeys_view.scope_here")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: () => setScopeChoice(null),
					className: "h-8",
					children: t("common.cancel")
				})
			]
		})]
	}) : null;
	const sharedDeleteConfirm = confirmingDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2 rounded-control border border-destructive/40 bg-destructive/[0.06] px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "flex items-start gap-1.5 text-xs text-destructive",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-3 w-3 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				t("apikeys_view.shared_delete_prefix"),
				" ",
				(sharedWith ?? []).join(", "),
				".",
				" ",
				t("apikeys_view.shared_delete_suffix")
			] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "destructive",
				onClick: handleDelete,
				disabled: pending,
				children: t("apikeys_view.delete_anyway")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "ghost",
				onClick: () => setConfirmingDelete(false),
				children: t("common.cancel")
			})]
		})]
	}) : null;
	if (configured && !editing) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-9 min-w-0 items-center gap-2.5 rounded-control border border-border bg-background pl-3 pr-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
						"aria-hidden": "true",
						className: "h-3.5 w-3.5 shrink-0 text-muted-foreground"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 text-xs font-medium text-foreground",
						children: t("apikeys_view.key_saved_label")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "min-w-0 flex-1 truncate font-mono text-xs tracking-[0.2em] text-muted-foreground",
						children: "•".repeat(12)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => setEditing(true),
						title: t("apikeys_view.replace_tooltip"),
						className: "h-7 px-2 text-xs text-muted-foreground hover:text-foreground",
						children: t("apikeys_view.replace")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: handleDelete,
						disabled: pending,
						"aria-label": `Delete ${secretKey}`,
						title: t("apikeys_view.delete_key_tooltip"),
						className: "h-7 w-7 p-0 text-muted-foreground hover:text-destructive",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
					})
				]
			}),
			sharedDeleteConfirm,
			dashboardLink
		]
	});
	if (coveredByShared && !editing) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-relaxed text-muted-foreground",
				children: coveredNote || t("apikeys_view.shared_key_covered")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "ghost",
				onClick: () => setEditing(true),
				children: coveredEditLabel || t("apikeys_view.add_dedicated_key")
			}),
			dashboardLink
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			credentialHelp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-relaxed text-muted-foreground",
				children: credentialHelp
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: reveal ? "text" : "password",
							"aria-label": `Enter ${secretKey}`,
							value,
							onChange: (e) => setValue(e.target.value),
							placeholder: t("apikeys_view.paste_key_placeholder"),
							className: cn("h-9 w-full rounded-control border border-input bg-background px-3 pr-9 font-mono text-xs", "focus:outline-none focus:ring-2 focus:ring-border-strong"),
							onKeyDown: (e) => {
								if (e.key === "Enter" && !scopeChoice) handleSave();
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setReveal((r) => !r),
							className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
							"aria-label": t(reveal ? "apikeys_view.hide_key" : "apikeys_view.reveal_key"),
							title: t(reveal ? "apikeys_view.hide_key" : "apikeys_view.reveal_key"),
							children: reveal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: () => void handleSave(),
						disabled: pending || !value.trim() || Boolean(scopeChoice),
						className: "h-9 rounded-control",
						children: pending ? "…" : t("common.save")
					}),
					(configured || coveredByShared) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => setEditing(false),
						className: "h-9 rounded-control",
						children: t("common.cancel")
					})
				]
			}),
			scopeQuestion,
			fmt && !fmt.match && fmt.detected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-start gap-1 text-xs text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-3 w-3 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("apikeys_view.format_mismatch").replace("{0}", fmt.detected.label) })]
				}), fmt.detected.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: fmt.detected.note
				})]
			}),
			fmt && keyFormatConfirmed(fmt) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-start gap-1 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 h-3 w-3 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("apikeys_view.format_match_hint") })]
			}),
			fmt && fmt.match && fmt.detected?.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: fmt.detected.note
			}),
			dashboardLink
		]
	});
}
export { keyMatchesSecret as n, ApiKeyForm as t };
