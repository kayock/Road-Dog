import { t as Check } from "./check-vbwKkbPq.js";
import { t as Store } from "./store-DvnTMCAH.js";
import { t as Github } from "./github-BU95hQ1Y.js";
import { t as LogOut } from "./log-out-CV5z6kDy.js";
import { t as ShieldCheck } from "./shield-check-CO1F4Nzq.js";
import { Bc as require_jsx_runtime, Dc as useMutation, Et as openExternalUrl, F as robustCopy, Gs as fill, Ln as cn, Oc as useQuery, Vi as ExternalLink, Wi as Copy, Xc as require_react, ji as LoaderCircle, li as TriangleAlert, ln as Button, nc as useLocaleChunk, oc as useT, qi as ChevronDown, si as X, tl as __toESM, zc as useQueryClient } from "./index-BOzhgzD7.js";
const PUBLISH_IDENTITY_KEY = ["marketplace-publish-identity"];
async function fetchIdentity() {
	const res = await fetch("/api/marketplace/publish/identity", { cache: "no-store" });
	if (!res.ok) throw new Error(`Identity request failed (${res.status})`);
	return res.json();
}
function usePublishIdentity() {
	return useQuery({
		queryKey: PUBLISH_IDENTITY_KEY,
		queryFn: fetchIdentity
	});
}
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var GITHUB_DEVICE_URL = "https://github.com/login/device";
function useGithubSignIn() {
	const queryClient = useQueryClient();
	const [flow, setFlow] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [justConnected, setJustConnected] = (0, import_react.useState)(false);
	const start = useMutation({
		mutationFn: async () => {
			const res = await fetch("/api/marketplace/publish/signin/start", { method: "POST" });
			if (!res.ok) {
				const detail = await res.json().then((b) => b.detail).catch(() => void 0);
				throw new Error(detail ?? `Sign-in start failed (${res.status})`);
			}
			return res.json();
		},
		onSuccess: (f) => {
			setFlow(f);
			setError(null);
			setJustConnected(false);
		},
		onError: (err) => setError(err.message)
	});
	const signOut = useMutation({
		mutationFn: async () => {
			const res = await fetch("/api/marketplace/publish/identity", { method: "DELETE" });
			if (!res.ok) throw new Error(`Sign-out failed (${res.status})`);
			return res.json();
		},
		onSuccess: () => {
			setJustConnected(false);
			queryClient.invalidateQueries({ queryKey: PUBLISH_IDENTITY_KEY });
		}
	});
	(0, import_react.useEffect)(() => {
		if (!flow) return;
		const intervalMs = Math.max(2, flow.interval ?? 5) * 1e3;
		const timer = setInterval(async () => {
			try {
				const res = await fetch(`/api/marketplace/publish/signin/poll/${flow.flow_id}`, { cache: "no-store" });
				if (res.status === 404) {
					setFlow(null);
					return;
				}
				const data = await res.json();
				if (data.status === "connected") {
					setFlow(null);
					setJustConnected(true);
					queryClient.invalidateQueries({ queryKey: PUBLISH_IDENTITY_KEY });
				} else if (data.status === "error") {
					setFlow(null);
					setError(data.error ?? "sign-in failed");
				}
			} catch {}
		}, intervalMs);
		return () => clearInterval(timer);
	}, [flow, queryClient]);
	const cancel = (0, import_react.useCallback)(() => {
		if (!flow) return;
		fetch(`/api/marketplace/publish/signin/${flow.flow_id}`, { method: "DELETE" }).catch(() => void 0);
		setFlow(null);
	}, [flow]);
	return {
		flow,
		error,
		justConnected,
		starting: start.isPending,
		signingOut: signOut.isPending,
		start: () => start.mutate(),
		cancel,
		signOut: () => signOut.mutate(),
		clearError: () => setError(null)
	};
}
function codeHalves(code) {
	const idx = code.indexOf("-");
	if (idx === -1) return [code, ""];
	return [code.slice(0, idx), code.slice(idx + 1)];
}
function PublisherAvatar({ login, url, size = 28, className }) {
	const [failed, setFailed] = (0, import_react.useState)(false);
	const initial = (login ?? "?").slice(0, 1).toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("relative grid shrink-0 place-items-center overflow-hidden rounded-full", "bg-gradient-to-br from-primary/70 to-primary/30 text-primary-foreground", "ring-2 ring-background", className),
		style: {
			width: size,
			height: size
		},
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-micro font-bold",
			children: initial
		}), url && !failed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: url,
			alt: "",
			onError: () => setFailed(true),
			className: "absolute inset-0 h-full w-full object-cover"
		})]
	});
}
function DeviceCodeTicket({ flow, onCancel }) {
	const t = useT();
	const [copied, setCopied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!copied) return;
		const timer = setTimeout(() => setCopied(false), 2e3);
		return () => clearTimeout(timer);
	}, [copied]);
	const [left, right] = codeHalves(flow.user_code);
	const verifyUrl = flow.verification_uri ?? GITHUB_DEVICE_URL;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative isolate overflow-hidden rounded-2xl border border-border-strong bg-gradient-to-br from-primary/10 via-card to-card p-5",
		"data-testid": "device-code-ticket",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute -z-10 -right-16 -top-16 h-48 w-48 rounded-full bg-secondary blur-3xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-micro font-semibold text-muted-foreground",
				children: t("marketplace.identity_code_label")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 font-mono text-3xl font-semibold tracking-[0.2em] text-foreground",
					"data-testid": "device-code",
					"aria-label": flow.user_code,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: left }), right && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-primary/60",
						children: "–"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: right })] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: async () => {
						if (await robustCopy(flow.user_code)) setCopied(true);
					},
					className: "grid h-9 w-9 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
					title: copied ? t("marketplace.identity_copied") : t("marketplace.identity_copy_code"),
					"aria-label": t("marketplace.identity_copy_code"),
					children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs leading-relaxed text-muted-foreground",
				children: t("marketplace.identity_code_hint")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => openExternalUrl(verifyUrl),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "mr-1.5 h-3.5 w-3.5" }),
							t("marketplace.identity_open_github"),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "ml-1.5 h-3 w-3" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: onCancel,
						children: t("marketplace.identity_cancel")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-auto flex items-center gap-2 text-micro text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative flex h-2 w-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-secondary" })]
						}), t("marketplace.identity_waiting")]
					})
				]
			})
		]
	});
}
function GithubSignInDialog({ onClose }) {
	const t = useT();
	useLocaleChunk("marketplace");
	const identity = usePublishIdentity();
	const signIn = useGithubSignIn();
	const startedRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (event.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onClose]);
	(0, import_react.useEffect)(() => {
		if (startedRef.current) return;
		if (identity.data?.signed_in) return;
		startedRef.current = true;
		signIn.start();
	}, [identity.data?.signed_in]);
	const signedIn = identity.data?.signed_in === true;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": t("marketplace.identity_dialog_title"),
		"data-testid": "github-signin-dialog",
		className: "fixed inset-0 z-[70] flex items-center justify-center bg-background p-6 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-start gap-3 border-b border-border px-5 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-foreground text-background",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-base font-semibold tracking-tight text-foreground",
								children: t("marketplace.identity_dialog_title")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: t("marketplace.identity_dialog_subtitle")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: onClose,
							"aria-label": t("marketplace.close"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 px-5 py-5",
					children: [
						signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-xl bg-secondary p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublisherAvatar, {
									login: identity.data?.login,
									url: identity.data?.avatar_url,
									size: 40
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-foreground",
										children: fill(t("marketplace.identity_signed_in_as"), { login: identity.data?.login ?? "" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: t("marketplace.identity_signed_in_hint")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5 text-muted-foreground" })
							]
						}) : signIn.flow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeviceCodeTicket, {
							flow: signIn.flow,
							onCancel: signIn.cancel
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-xl bg-secondary p-4 text-sm text-muted-foreground",
							children: [signIn.starting || identity.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: () => signIn.start(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "mr-1.5 h-3.5 w-3.5" }), t("marketplace.identity_sign_in")]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("marketplace.identity_requesting") })]
						}),
						signIn.error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-start gap-2 rounded-lg bg-secondary px-3 py-2 text-xs text-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), signIn.error]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "grid gap-2 text-xs text-muted-foreground sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2 rounded-lg border border-border bg-background p-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" }), t("marketplace.identity_fact_scope")]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2 rounded-lg border border-border bg-background p-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" }), t("marketplace.identity_fact_name")]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2 rounded-lg border border-border bg-background p-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" }), t("marketplace.identity_fact_keyring")]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
					className: "flex items-center justify-end gap-2 border-t border-border px-5 py-3",
					children: signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: onClose,
						children: t("marketplace.identity_done")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: onClose,
						children: t("marketplace.close")
					})
				})
			]
		})
	});
}
function PublisherChip({ onMine, onSignIn }) {
	const t = useT();
	const ready = useLocaleChunk("marketplace");
	const identity = usePublishIdentity();
	const signIn = useGithubSignIn();
	const [open, setOpen] = (0, import_react.useState)(false);
	const menuRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onDown = (event) => {
			if (!menuRef.current?.contains(event.target)) setOpen(false);
		};
		window.addEventListener("mousedown", onDown);
		return () => window.removeEventListener("mousedown", onDown);
	}, [open]);
	const data = identity.data;
	if (data && !data.enabled) return null;
	if (identity.isLoading || !ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
		className: "h-4 w-4 animate-spin text-muted-foreground",
		"aria-hidden": true
	});
	if (!data?.signed_in) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		size: "sm",
		variant: "outline",
		onClick: onSignIn,
		"data-testid": "publisher-chip-signed-out",
		title: data?.unreachable ? t("marketplace.identity_unreachable") : void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "mr-1.5 h-3.5 w-3.5" }), t("marketplace.identity_sign_in")]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		ref: menuRef,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setOpen((o) => !o),
			"aria-haspopup": "menu",
			"aria-expanded": open,
			"data-testid": "publisher-chip",
			className: cn("flex h-8 items-center gap-2 rounded-full border border-border bg-card pl-1 pr-2.5", "text-xs font-medium text-foreground backdrop-blur transition-colors hover:border-border-strong"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublisherAvatar, {
					login: data.login,
					url: data.avatar_url,
					size: 24
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "max-w-[10rem] truncate",
					children: ["@", data.login]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3 w-3 text-muted-foreground" })
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "menu",
			className: "absolute right-0 top-full z-50 mt-1.5 w-56 overflow-hidden rounded-xl border border-border bg-popover p-1 text-popover-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-2.5 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "truncate text-xs font-semibold text-foreground",
						children: ["@", data.login]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-micro text-muted-foreground",
						children: t("marketplace.identity_menu_hint")
					})]
				}),
				onMine && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "menuitem",
					onClick: () => {
						setOpen(false);
						onMine();
					},
					className: "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs text-foreground transition-colors hover:bg-secondary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-3.5 w-3.5 text-muted-foreground" }), t("marketplace.identity_menu_mine")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "menuitem",
					onClick: () => {
						setOpen(false);
						signIn.signOut();
					},
					disabled: signIn.signingOut,
					className: "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs text-foreground transition-colors hover:bg-secondary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5 text-muted-foreground" }), t("marketplace.identity_sign_out")]
				})
			]
		})]
	});
}
function PublishIdentityCard({ identity, loading, blurb, compact = false }) {
	const t = useT();
	useLocaleChunk("marketplace");
	const signIn = useGithubSignIn();
	const signedIn = identity?.signed_in === true;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn(!compact && "rounded-xl border border-border bg-card p-4"),
		"data-testid": "publish-identity",
		"data-signed-in": signedIn ? "yes" : "no",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublisherAvatar, {
						login: identity?.login,
						url: identity?.avatar_url,
						size: 32
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-8 w-8 place-items-center rounded-full bg-foreground text-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold text-foreground",
								children: t("marketplace.identity_label")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									fill(t("marketplace.identity_signed_in_as"), { login: identity?.login ?? "" }),
									" — ",
									blurb ?? t("marketplace.identity_publishes_under")
								] }) : t("marketplace.identity_sign_in_blurb")
							}),
							identity?.unreachable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-micro text-muted-foreground",
								children: t("marketplace.identity_unreachable")
							})
						]
					}),
					loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin text-muted-foreground" }) : signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => signIn.signOut(),
						disabled: signIn.signingOut,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mr-1.5 h-3.5 w-3.5" }), t("marketplace.identity_sign_out")]
					}) : signIn.flow ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => signIn.start(),
						disabled: signIn.starting,
						children: [signIn.starting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "mr-1.5 h-3.5 w-3.5" }), t("marketplace.identity_sign_in")]
					})
				]
			}),
			signIn.flow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeviceCodeTicket, {
					flow: signIn.flow,
					onCancel: signIn.cancel
				})
			}),
			signIn.error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 flex items-start gap-2 rounded-md bg-secondary px-2 py-1.5 text-xs text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), signIn.error]
			})
		]
	});
}
var ShareError = class extends Error {
	constructor(message, status, field = null) {
		super(message);
		this.status = status;
		this.field = field;
	}
};
const shareDraftKey = (agentId) => [
	"society",
	"share-template",
	agentId
];
const MARKETPLACE_ISSUE_FORM_URL = "https://github.com/RoadDog/marketplace/issues/new?template=publish.yml";
async function readError(res) {
	const detail = (await res.json().catch(() => ({}))).detail;
	if (typeof detail === "string") return new ShareError(detail, res.status);
	return new ShareError(detail?.error ?? detail?.detail ?? `Request failed (${res.status})`, res.status, detail?.field ?? null);
}
var agentUrl = (agentId) => `/api/society/agents/${encodeURIComponent(agentId)}/template`;
async function fetchShareDraft(agentId) {
	const res = await fetch(agentUrl(agentId), { cache: "no-store" });
	if (!res.ok) throw await readError(res);
	return res.json();
}
async function saveShareDraft(agentId, edits) {
	const res = await fetch(agentUrl(agentId), {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(edits)
	});
	if (!res.ok) throw await readError(res);
	return res.json();
}
async function publishShareDraft(agentId) {
	const res = await fetch(`${agentUrl(agentId)}/publish`, { method: "POST" });
	if (!res.ok) throw await readError(res);
	return res.json();
}
async function installAgentTemplate(template) {
	const res = await fetch("/api/society/templates/install", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ template })
	});
	if (!res.ok) throw await readError(res);
	return res.json();
}
async function fetchLiveStatus(name, version) {
	const params = new URLSearchParams({
		name,
		version,
		force: "true"
	});
	const res = await fetch(`/api/marketplace/publish/status?${params}`, { cache: "no-store" });
	if (!res.ok) return false;
	const body = await res.json();
	return Boolean(body.live);
}
function readFileText(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result ?? ""));
		reader.onerror = () => reject(reader.error ?? /* @__PURE__ */ new Error("the file could not be read"));
		reader.readAsText(file);
	});
}
function templateFileName(listing) {
	return `${listing.name || "agent"}.agent.json`;
}
function downloadTemplate(fileName, json) {
	const blob = new Blob([json], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = fileName;
	document.body.appendChild(link);
	link.click();
	link.remove();
	window.setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
export { fetchShareDraft as a, readFileText as c, templateFileName as d, GithubSignInDialog as f, usePublishIdentity as g, PublisherChip as h, fetchLiveStatus as i, saveShareDraft as l, PublisherAvatar as m, ShareError as n, installAgentTemplate as o, PublishIdentityCard as p, downloadTemplate as r, publishShareDraft as s, MARKETPLACE_ISSUE_FORM_URL as t, shareDraftKey as u };
