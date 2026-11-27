import "./TraceTimeline-hpw2Rng1.js";
import { t as Check } from "./check-vbwKkbPq.js";
import { t as CircleAlert } from "./circle-alert-BujlF6G8.js";
import { t as ListChecks } from "./list-checks-CnMmSU5J.js";
import { t as PhoneCall } from "./phone-call-DKeNHYKm.js";
import { t as PlugZap } from "./plug-zap-Bf7gZfvH.js";
import { t as ScrollText } from "./scroll-text-Bn3SGBDY.js";
import { r as ShieldQuestion } from "./WorkTrace-CQMphqAB.js";
import { Bc as require_jsx_runtime, Ci as Phone, F as robustCopy, Ln as cn, Pi as KeyRound, Qi as ArrowLeft, Wi as Copy, Xc as require_react, ci as Volume2, ji as LoaderCircle, ln as Button, oc as useT, tl as __toESM, wc as useEventStore } from "./index-BOzhgzD7.js";
import "./lib-BoWxqGgd.js";
import "./petStage-CMRGLgJ7.js";
import "./toolDiff-CkONUaSH.js";
import "./visualFence-DOGBhazZ.js";
import "./McpLogo-Xry4yg3E.js";
import "./VoiceWorkTrace-CbMeKDQm.js";
import { t as Switch } from "./switch-hmH-TV55.js";
import "./DictationButton-Bx-A0TOD.js";
import "./ThinkingTrace-CiOesUk4.js";
import "./PageHeader-DcwsywY0.js";
import { n as SettingsField, r as settingsInputCls } from "./SettingsBlock-Lvn1e90l.js";
import { t as ViewHeader } from "./ChatsView-vmGpziEG.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var CALL_STATUS_STYLE = {
	ringing: "bg-foreground/10 text-foreground",
	in_progress: "bg-primary/10 text-primary",
	completed: "bg-muted-foreground/10 text-muted-foreground",
	failed: "bg-destructive/10 text-destructive",
	no_audio: "bg-muted text-muted-foreground"
};
async function fetchJson(url, init) {
	const res = await fetch(url, init);
	if (!res.ok) {
		const txt = await res.text().catch(() => "");
		let detail = txt;
		try {
			const parsed = JSON.parse(txt);
			detail = parsed.error ?? parsed.detail ?? txt;
		} catch {}
		throw new Error(detail || `HTTP ${res.status}`);
	}
	return res.json();
}
function TelephonyPanel() {
	const t = useT();
	const [status, setStatus] = (0, import_react.useState)(null);
	const [config, setConfig] = (0, import_react.useState)(null);
	const [calls, setCalls] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError(null);
		try {
			const [statusRes, configRes, callsRes] = await Promise.all([
				fetchJson("/api/telephony/status"),
				fetchJson("/api/telephony/config"),
				fetchJson("/api/telephony/calls?limit=20")
			]);
			setStatus(statusRes);
			setConfig(configRes);
			setCalls(callsRes.calls ?? []);
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-sm text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
				" ",
				t("common.loading")
			]
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1 break-words",
				children: [
					t("telephony_view.load_error"),
					" (",
					error,
					").",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => void load(),
						className: "ml-2 underline",
						children: t("common.retry")
					})
				]
			})]
		}),
		!loading && !error && status && config && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				!status.available && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotAvailableNotice, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusCard, { status }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CredentialsCard, {
					status,
					config,
					onSaved: () => void load()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CallsCard, {
					calls,
					onReload: () => void load()
				})
			]
		}),
		!loading && !error && status && !status.configured && status.available && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-xs text-muted-foreground",
			children: t("telephony_view.not_configured_hint")
		})
	] });
}
function TelephonyView() {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewHeader, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 text-primary" }),
			title: t("telephony_view.title"),
			subtitle: t("telephony_view.subtitle")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto scrollbar-jarvis p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TelephonyPanel, {})
		})]
	});
}
function TelephonySetupView() {
	const t = useT();
	const setActive = useEventStore((s) => s.setActiveSection);
	const [status, setStatus] = (0, import_react.useState)(null);
	const [scripts, setScripts] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError(null);
		try {
			const [statusRes, scriptsRes] = await Promise.all([fetchJson("/api/telephony/status"), fetchJson("/api/telephony/scripts")]);
			setStatus(statusRes);
			setScripts(scriptsRes.scripts ?? []);
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewHeader, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollText, { className: "h-4 w-4 text-primary" }),
			title: t("telephony_setup.title"),
			subtitle: t("telephony_setup.subtitle")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto scrollbar-jarvis p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActive("apikeys"),
						className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }),
							" ",
							t("telephony_setup.back")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupGuideCard, { status }),
					loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
							" ",
							t("common.loading")
						]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1 break-words",
							children: [
								t("telephony_view.load_error"),
								" (",
								error,
								").",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => void load(),
									className: "ml-2 underline",
									children: t("common.retry")
								})
							]
						})]
					}),
					!loading && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScriptsCard, { scripts })
				]
			})
		})]
	});
}
function SetupGuideCard({ status }) {
	const t = useT();
	const steps = [
		1,
		2,
		3,
		4,
		5
	].map((n) => ({
		title: t(`telephony_setup.step${n}_title`),
		body: t(`telephony_setup.step${n}_body`)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card-outline space-y-4 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-sm font-semibold tracking-tight",
					children: t("telephony_setup.guide_title")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground break-words",
				children: t("telephony_setup.intro")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-3",
				children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary",
						children: i + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-medium",
							children: s.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xs text-muted-foreground break-words",
							children: s.body
						})]
					})]
				}, i))
			}),
			status && (status.public_base_url || status.webhook_url) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1.5 border-t border-border/60 pt-3 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted-foreground",
						children: t("telephony_setup.public_url")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyValue, {
							value: status.public_base_url,
							label: t("telephony_setup.public_url"),
							emptyLabel: t("telephony_view.status.not_set")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted-foreground",
						children: t("telephony_setup.webhook")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyValue, {
							value: status.webhook_url,
							label: t("telephony_setup.webhook"),
							emptyLabel: t("telephony_view.status.not_set")
						})
					})
				]
			})
		]
	});
}
function NotAvailableNotice() {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-4 rounded-lg border border-dashed border-border bg-card/40 p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary/40",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldQuestion, { className: "h-4 w-4 text-muted-foreground" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-medium",
					children: t("telephony_view.unavailable_title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-xs text-muted-foreground break-words",
					children: t("telephony_view.unavailable_body")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
					className: "mt-2 inline-block rounded border border-border bg-background px-2 py-1 font-mono text-xs break-all",
					children: "pip install \"road-dog[telephony]\""
				})
			]
		})]
	});
}
function CopyValue({ value, label, emptyLabel, testId }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const pushToast = useEventStore((s) => s.pushToast);
	async function copy() {
		if (!value) return;
		if (await robustCopy(value)) {
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1500);
		} else pushToast("warning", value);
	}
	if (!value) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "italic text-muted-foreground/60",
		children: emptyLabel ?? "—"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex min-w-0 max-w-full items-start gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
			"data-testid": testId,
			title: label ? `${label}: ${value}` : value,
			className: "min-w-0 break-all font-mono text-xs text-foreground",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => void copy(),
			title: label,
			className: "mt-0.5 shrink-0 text-muted-foreground transition-colors hover:text-primary",
			children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3 w-3" })
		})]
	});
}
function StatusCard({ status }) {
	const t = useT();
	const reachable = status.configured && status.twilio_reachable;
	const reachLabel = !status.configured ? t("telephony_view.status.not_configured") : status.twilio_reachable ? t("telephony_view.status.reachable") : t("telephony_view.status.unreachable");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-4 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneCall, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-0 flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: t("telephony_view.status.title")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
						ok: reachable,
						configured: status.configured
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("mt-1 h-2 w-2 shrink-0 rounded-full", reachable ? "bg-muted-foreground" : "bg-muted-foreground") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 break-words text-foreground",
					children: [reachLabel, status.twilio_error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-1 break-words text-destructive",
						children: [
							"(",
							status.twilio_error,
							")"
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted-foreground",
						children: t("telephony_view.status.account_sid")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "min-w-0 text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyValue, {
							value: status.account_sid_masked,
							label: t("telephony_view.status.account_sid"),
							emptyLabel: t("telephony_view.status.not_set"),
							testId: "status-account-sid"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted-foreground",
						children: t("telephony_view.status.phone_number")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "min-w-0 text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyValue, {
							value: status.phone_number,
							label: t("telephony_view.status.phone_number"),
							emptyLabel: t("telephony_view.status.not_set"),
							testId: "status-phone-number"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted-foreground",
						children: t("telephony_view.status.public_url")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "min-w-0 text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyValue, {
							value: status.public_base_url,
							label: t("telephony_view.status.public_url"),
							emptyLabel: t("telephony_view.status.not_set"),
							testId: "status-public-url"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted-foreground",
						children: t("telephony_view.status.webhook_url")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "min-w-0 text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyValue, {
							value: status.webhook_url,
							label: t("telephony_view.status.webhook_url"),
							emptyLabel: t("telephony_view.status.not_set"),
							testId: "status-webhook-url"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted-foreground",
						children: t("telephony_view.status.voice")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
						className: "min-w-0 break-words text-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "mr-1 inline h-3 w-3 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								"data-testid": "status-tts-voice",
								children: status.tts_voice || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [
									" ",
									"(",
									status.tts_provider || "—",
									")"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted-foreground",
						children: t("telephony_view.status.active_calls")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "text-foreground",
						children: status.active_calls
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted-foreground",
						children: t("telephony_view.status.max_seconds")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
						className: "text-foreground",
						children: [status.max_call_seconds, "s"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted-foreground",
						children: t("telephony_view.status.enabled")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "text-foreground",
						children: status.enabled ? t("common.yes") : t("common.no")
					})
				]
			})
		]
	});
}
function StatusBadge({ ok, configured }) {
	const t = useT();
	if (!configured) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "shrink-0 rounded-full bg-muted px-2 py-0.5 text-micro uppercase tracking-wider text-muted-foreground",
		children: t("telephony_view.status.badge_setup")
	});
	if (ok) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "shrink-0 rounded-full bg-muted-foreground/10 px-2 py-0.5 text-micro uppercase tracking-wider text-muted-foreground",
		children: t("telephony_view.status.badge_live")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "shrink-0 rounded-full bg-destructive/10 px-2 py-0.5 text-micro uppercase tracking-wider text-destructive",
		children: t("telephony_view.status.badge_error")
	});
}
function CredentialsCard({ status, config, onSaved }) {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const setActive = useEventStore((s) => s.setActiveSection);
	const [enabled, setEnabled] = (0, import_react.useState)(config.enabled);
	const [accountSid, setAccountSid] = (0, import_react.useState)(config.account_sid);
	const [authToken, setAuthToken] = (0, import_react.useState)("");
	const [phoneNumber, setPhoneNumber] = (0, import_react.useState)(config.phone_number);
	const [publicBaseUrl, setPublicBaseUrl] = (0, import_react.useState)(config.public_base_url);
	const [greeting, setGreeting] = (0, import_react.useState)(config.greeting);
	const [languageCode, setLanguageCode] = (0, import_react.useState)(config.language_code);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [testing, setTesting] = (0, import_react.useState)(false);
	const [selfTesting, setSelfTesting] = (0, import_react.useState)(false);
	const [testResult, setTestResult] = (0, import_react.useState)(null);
	const [selfTestResult, setSelfTestResult] = (0, import_react.useState)(null);
	async function save() {
		setSaving(true);
		try {
			await fetchJson("/api/telephony/config", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					enabled,
					phone_number: phoneNumber.trim(),
					public_base_url: publicBaseUrl.trim(),
					greeting,
					language_code: languageCode.trim(),
					max_call_seconds: config.max_call_seconds
				})
			});
			if (authToken.trim() || accountSid.trim() !== config.account_sid) await fetchJson("/api/telephony/credentials", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					account_sid: accountSid.trim(),
					auth_token: authToken.trim()
				})
			});
			setAuthToken("");
			pushToast("success", t("telephony_view.creds.saved"));
			window.dispatchEvent(new CustomEvent("jarvis:secret-configured"));
			onSaved();
		} catch (e) {
			pushToast("error", e.message);
		} finally {
			setSaving(false);
		}
	}
	async function testConnection() {
		setTesting(true);
		setTestResult(null);
		try {
			const res = await fetchJson("/api/telephony/test", { method: "POST" });
			setTestResult(res);
			pushToast(res.reachable ? "success" : "warning", res.reachable ? t("telephony_view.creds.test_ok") : res.error || t("telephony_view.creds.test_failed"));
		} catch (e) {
			setTestResult({
				ok: false,
				reachable: false,
				error: e.message
			});
			pushToast("error", e.message);
		} finally {
			setTesting(false);
		}
	}
	async function selfTestVoice() {
		setSelfTesting(true);
		setSelfTestResult(null);
		try {
			const res = await fetchJson("/api/telephony/selftest", { method: "POST" });
			setSelfTestResult(res);
			pushToast(res.ok ? "success" : "warning", res.ok ? t("telephony_view.creds.selftest_ok") : res.error || t("telephony_view.creds.selftest_failed"));
		} catch (e) {
			setSelfTestResult({
				ok: false,
				transcript: "",
				response_text: "",
				audio_bytes: 0,
				error: e.message
			});
			pushToast("error", e.message);
		} finally {
			setSelfTesting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-4 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-0 flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: t("telephony_view.creds.title")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex shrink-0 items-center gap-2 text-xs text-muted-foreground",
						children: [t("telephony_view.creds.enable"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: enabled,
							onCheckedChange: setEnabled
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsField, {
						label: t("telephony_view.creds.account_sid"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: accountSid,
							onChange: (e) => setAccountSid(e.target.value),
							placeholder: "AC...",
							className: cn(settingsInputCls, "font-mono")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsField, {
						label: t("telephony_view.creds.auth_token"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							value: authToken,
							onChange: (e) => setAuthToken(e.target.value),
							placeholder: status.auth_token_set ? t("telephony_view.creds.auth_token_set") : t("telephony_view.creds.auth_token_placeholder"),
							className: cn(settingsInputCls, "font-mono")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsField, {
						label: t("telephony_view.creds.phone_number"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: phoneNumber,
							onChange: (e) => setPhoneNumber(e.target.value),
							placeholder: "+49301234567",
							className: cn(settingsInputCls, "font-mono")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsField, {
						label: t("telephony_view.creds.public_url"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: publicBaseUrl,
							onChange: (e) => setPublicBaseUrl(e.target.value),
							placeholder: "https://jarvis.example.com",
							className: cn(settingsInputCls, "font-mono")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsField, {
						label: t("telephony_view.creds.language"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: languageCode,
							onChange: (e) => setLanguageCode(e.target.value),
							placeholder: "de-DE",
							className: settingsInputCls
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsField, {
						label: t("telephony_view.creds.greeting"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: greeting,
							onChange: (e) => setGreeting(e.target.value),
							placeholder: t("telephony_view.creds.greeting_placeholder"),
							className: settingsInputCls
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: () => void save(),
						disabled: saving,
						children: saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
							" ",
							t("common.saving")
						] }) : t("common.save")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => void testConnection(),
						disabled: testing,
						children: [testing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlugZap, { className: "h-3.5 w-3.5" }), t("telephony_view.creds.test_connection")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => void selfTestVoice(),
						disabled: selfTesting,
						children: [selfTesting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-3.5 w-3.5" }), t("telephony_view.creds.self_test")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => setActive("telephony-setup"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollText, { className: "h-3.5 w-3.5" }), t("telephony_view.creds.setup_script")]
					})
				]
			}),
			testResult && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-testid": "test-result",
				className: cn("rounded-md border p-3 text-xs break-words", testResult.reachable ? "border-muted-foreground/30 bg-muted-foreground/5 text-muted-foreground" : "border-destructive/30 bg-destructive/5 text-destructive"),
				children: testResult.reachable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [t("telephony_view.creds.test_reachable"), testResult.account_status && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ml-1 font-mono break-all",
					children: [
						"(",
						testResult.account_status,
						")"
					]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "break-words",
					children: testResult.error || t("telephony_view.creds.test_failed")
				})
			}),
			selfTestResult && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-testid": "selftest-result",
				className: "space-y-2 rounded-md border border-border bg-background/40 p-3 text-xs",
				children: selfTestResult.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "break-words text-destructive",
					children: selfTestResult.error
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [t("telephony_view.creds.transcript"), ":"]
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-testid": "selftest-transcript",
							className: "whitespace-pre-wrap break-words text-foreground",
							children: selfTestResult.transcript || "—"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [t("telephony_view.creds.response"), ":"]
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-testid": "selftest-response",
							className: "whitespace-pre-wrap break-words text-foreground",
							children: selfTestResult.response_text || "—"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-mono text-micro text-muted-foreground",
						children: [
							t("telephony_view.creds.audio_bytes"),
							": ",
							selfTestResult.audio_bytes
						]
					})
				] })
			})
		]
	});
}
function ScriptsCard({ scripts }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card-outline space-y-3 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollText, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-sm font-semibold tracking-tight",
					children: t("telephony_view.scripts.title")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground break-words",
				children: t("telephony_view.scripts.subtitle")
			}),
			scripts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs italic text-muted-foreground/60",
				children: t("telephony_view.scripts.empty")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: scripts.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScriptRow, { script: s }, s.name))
			})
		]
	});
}
function ScriptRow({ script }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const pushToast = useEventStore((s) => s.pushToast);
	async function copy() {
		if (await robustCopy(script.command)) {
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1500);
		} else pushToast("warning", script.command);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-md border border-border/60 bg-background/40 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium break-words",
						children: script.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs text-muted-foreground break-words",
						children: script.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 font-mono text-micro text-muted-foreground/70 break-all",
						children: script.path
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => void copy(),
				className: "shrink-0 text-muted-foreground transition-colors hover:text-primary",
				title: "Copy command",
				children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
			className: "mt-2 block whitespace-pre-wrap break-all rounded border border-border bg-muted/30 px-3 py-2 font-mono text-xs",
			children: script.command
		})]
	});
}
function CallsCard({ calls, onReload }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-4 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneCall, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: t("telephony_view.calls.title")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: onReload,
					className: "shrink-0",
					children: t("common.retry")
				})
			]
		}), calls.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs italic text-muted-foreground/60",
			children: t("telephony_view.calls.empty")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: calls.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("flex items-center gap-3 py-2.5 text-xs", i > 0 && "border-t border-border"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 break-all font-medium text-foreground",
					children: [
						c.from || "—",
						" → ",
						c.to || "—"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CallStatusBadge, { status: c.status }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "shrink-0 text-muted-foreground",
					children: [
						c.turns,
						" ",
						t("telephony_view.calls.turns")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ml-auto shrink-0 whitespace-nowrap text-right text-muted-foreground",
					children: [c.started_at || "—", c.duration_s != null ? ` · ${c.duration_s}s` : ""]
				})
			]
		}, c.call_sid)) })]
	});
}
function CallStatusBadge({ status }) {
	const t = useT();
	const style = CALL_STATUS_STYLE[status] ?? "bg-muted text-muted-foreground";
	const label = t(`telephony_view.call_status.${status}`);
	const display = label.startsWith("telephony_view.call_status.") ? status : label;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-micro uppercase tracking-wider", style),
		children: display
	});
}
export { TelephonyPanel, TelephonySetupView, TelephonyView };
