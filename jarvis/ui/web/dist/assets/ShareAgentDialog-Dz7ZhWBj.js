const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/CodeBlock-Bx1Ui95q.js","assets/CodeBlock-BucrVDj0.js","assets/index-BOzhgzD7.js","assets/index-CA6QM4ps.css","assets/check-vbwKkbPq.js"])))=>i.map(i=>d[i]);
import "./CodingThreadLink-DIqtFuRz.js";
import "./TraceTimeline-hpw2Rng1.js";
import { t as Check } from "./check-vbwKkbPq.js";
import "./ThreadTimeline-CItnaA8w.js";
import { n as CloudUpload } from "./store-DvnTMCAH.js";
import { t as FileJson } from "./file-json-sGKKbS0x.js";
import "./AgentComposer-DoSrpnSm.js";
import { t as Github } from "./github-BU95hQ1Y.js";
import "./ProviderLogo-BxoN_q6P.js";
import { t as Lock } from "./lock-ByyvnTXx.js";
import { t as ShieldCheck } from "./shield-check-CO1F4Nzq.js";
import { Bc as require_jsx_runtime, Cn as Portal, Dc as useMutation, Et as openExternalUrl, F as robustCopy, Gs as fill, Ln as cn, Oc as useQuery, Sn as Overlay, Tn as Title, Ui as Download, Vi as ExternalLink, Wi as Copy, Xc as require_react, bn as Content, cc as __vitePreload, ji as LoaderCircle, li as TriangleAlert, ln as Button, mi as Sparkles, nc as useLocaleChunk, oc as useT, si as X, tl as __toESM, wn as Root, xn as Description, zc as useQueryClient } from "./index-BOzhgzD7.js";
import "./lib-BoWxqGgd.js";
import "./petStage-CMRGLgJ7.js";
import "./toolDiff-CkONUaSH.js";
import "./visualFence-DOGBhazZ.js";
import "./McpLogo-Xry4yg3E.js";
import "./AgentMark-Bw7Rhl-a.js";
import "./combobox-BL3mwl7r.js";
import "./select-vogX_D37.js";
import "./switch-hmH-TV55.js";
import "./useModelMenuData-TwmHE5pI.js";
import "./agentProviderPrefs-3Ey03m7Z.js";
import { t as AgentSwatch } from "./AgentSwatch-CHRK4Jk4.js";
import "./appearance-CnI1Xhkn.js";
import "./CompanionMark-BvabJfVP.js";
import "./figureRecipe-BRnaWN-p.js";
import "./data-v-6nxr7Q.js";
import "./DictationButton-Bx-A0TOD.js";
import "./societyDisplayName-iRYNmFrn.js";
import "./RuntimeBadge-BWtE1Tji.js";
import "./RuntimePicker-CMMIBgVm.js";
import { useSocietyChatStore } from "./AgentChatPanel-D5tfhvzP.js";
import { a as fetchShareDraft, d as templateFileName, f as GithubSignInDialog, g as usePublishIdentity, i as fetchLiveStatus, l as saveShareDraft, m as PublisherAvatar, n as ShareError, r as downloadTemplate, s as publishShareDraft, t as MARKETPLACE_ISSUE_FORM_URL, u as shareDraftKey } from "./agentShare-CZH1gogG.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var CodeBlock = (0, import_react.lazy)(() => __vitePreload(() => import("./CodeBlock-Bx1Ui95q.js"), __vite__mapDeps([0,1,2,3,4])).then((m) => ({ default: m.CodeBlock })));
var POLISH_TIMEOUT_MS = 240 * 1e3;
var SAVE_DEBOUNCE_MS = 600;
function formFrom(draft) {
	return {
		summary: draft.listing.description,
		listingName: draft.listing.name,
		version: draft.listing.version,
		categories: draft.listing.categories.join(", ")
	};
}
function editsFrom(form) {
	return {
		summary: form.summary,
		listing_name: form.listingName.trim().toLowerCase(),
		version: form.version.trim(),
		categories: form.categories.split(",").map((c) => c.trim().toLowerCase()).filter(Boolean).slice(0, 10)
	};
}
function ShareAgentDialog({ agent, onClose }) {
	const t = useT();
	useLocaleChunk("society");
	useLocaleChunk("marketplace");
	const client = useQueryClient();
	const key = shareDraftKey(agent.agentId);
	const [waitingSince, setWaitingSince] = (0, import_react.useState)(null);
	const draftQuery = useQuery({
		queryKey: key,
		queryFn: () => fetchShareDraft(agent.agentId),
		refetchInterval: waitingSince !== null ? 2500 : false
	});
	const draft = draftQuery.data;
	const [form, setForm] = (0, import_react.useState)(null);
	const dirty = (0, import_react.useRef)(false);
	const polishedBefore = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (draft && (!dirty.current || form === null)) setForm(formFrom(draft));
	}, [draft]);
	const save = useMutation({
		mutationFn: (edits) => saveShareDraft(agent.agentId, edits),
		onSuccess: (fresh) => {
			dirty.current = false;
			client.setQueryData(key, fresh);
		}
	});
	(0, import_react.useEffect)(() => {
		if (!form || !dirty.current) return;
		const timer = window.setTimeout(() => save.mutate(editsFrom(form)), SAVE_DEBOUNCE_MS);
		return () => window.clearTimeout(timer);
	}, [form]);
	(0, import_react.useEffect)(() => {
		if (waitingSince === null || !draft) return;
		const signature = `${draft.polished_by}|${draft.listing.description}|${draft.template.instructions.length}`;
		if (polishedBefore.current !== null && signature !== polishedBefore.current) {
			dirty.current = false;
			setForm(formFrom(draft));
			setWaitingSince(null);
		} else if (Date.now() - waitingSince > POLISH_TIMEOUT_MS) setWaitingSince(null);
	}, [draft, waitingSince]);
	const edit = (patch) => {
		dirty.current = true;
		setForm((current) => current ? {
			...current,
			...patch
		} : current);
	};
	const json = (0, import_react.useMemo)(() => draft ? JSON.stringify(draft.submission, null, 2) : "", [draft]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		open: true,
		onOpenChange: (open) => open ? void 0 : onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 z-50 bg-scrim/60 backdrop-blur-sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
			"data-testid": "share-agent-dialog",
			className: "fixed left-1/2 top-1/2 z-50 flex max-h-[92dvh] w-[min(1040px,calc(100vw-24px))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-border bg-popover text-foreground shadow-float focus:outline-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex shrink-0 items-center gap-3 border-b border-border px-5 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentSwatch, {
							agent,
							size: 40
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
								className: "truncate font-display text-base font-semibold tracking-tight",
								children: fill(t("society.share.title"), { agent: agent.name })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
								className: "text-xs text-muted-foreground",
								children: t("society.share.subtitle")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": t("society.card.close"),
							onClick: onClose,
							className: "rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})
					]
				}),
				draftQuery.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 px-5 py-10 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), t("society.share.loading")]
				}),
				draftQuery.error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					role: "alert",
					className: "flex items-center gap-2 px-5 py-10 text-sm text-destructive",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 shrink-0" }), draftQuery.error.message]
				}),
				draft && form && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid min-h-0 flex-1 overflow-y-auto md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "min-h-0 space-y-5 px-5 py-4 md:overflow-y-auto",
						"aria-label": t("society.share.public_version"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolishBar, {
								agent,
								draft,
								waiting: waitingSince !== null,
								onSent: () => {
									polishedBefore.current = `${draft.polished_by}|${draft.listing.description}|${draft.template.instructions.length}`;
									setWaitingSince(Date.now());
								},
								onReset: () => {
									dirty.current = false;
									save.mutate({ reset: true });
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mb-1 flex items-baseline justify-between text-xs font-medium text-foreground",
									children: [t("society.share.summary"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "tabular-nums text-muted-foreground",
										children: [form.summary.length, "/500"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: form.summary,
									maxLength: 500,
									rows: 3,
									onChange: (e) => edit({ summary: e.target.value }),
									placeholder: t("society.share.summary_placeholder"),
									"data-testid": "share-summary",
									className: "w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-faint-foreground focus:border-border-strong"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-[minmax(0,1fr)_7rem] gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mb-1 block text-xs font-medium text-foreground",
										children: t("society.share.listing_name")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: form.listingName,
										onChange: (e) => edit({ listingName: e.target.value }),
										spellCheck: false,
										className: "h-9 w-full rounded-md border border-border bg-background px-3 font-mono text-xs text-foreground outline-none focus:border-border-strong"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mb-1 block text-xs font-medium text-foreground",
										children: t("society.share.version")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: form.version,
										onChange: (e) => edit({ version: e.target.value }),
										spellCheck: false,
										className: "h-9 w-full rounded-md border border-border bg-background px-3 font-mono text-xs tabular-nums text-foreground outline-none focus:border-border-strong"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-xs font-medium text-foreground",
									children: t("society.share.categories")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: form.categories,
									onChange: (e) => edit({ categories: e.target.value }),
									placeholder: t("society.share.categories_placeholder"),
									className: "h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-faint-foreground focus:border-border-strong"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacyCheck, { findings: draft.findings })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "flex min-h-[18rem] flex-col border-t border-border bg-background/40 px-5 py-4 md:min-h-0 md:border-l md:border-t-0",
						"aria-label": t("society.share.template"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateCode, {
							fileName: templateFileName(draft.listing),
							json,
							saving: save.isPending
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublishBar, {
					agentId: agent.agentId,
					draft,
					json,
					saving: save.isPending || dirty.current
				})] })
			]
		})] })
	});
}
function PolishBar({ agent, draft, waiting, onSent, onReset }) {
	const t = useT();
	const activeSessionId = useSocietyChatStore((s) => s.activeSessionId);
	const send = useSocietyChatStore((s) => s.send);
	const [error, setError] = (0, import_react.useState)(null);
	const chatReady = Boolean(agent.chatSessionId) && activeSessionId === agent.chatSessionId;
	const ask = async () => {
		setError(null);
		const result = await send(t("society.share.polish_prompt"));
		if (result === "failed" || result === "stale") setError(t("society.share.polish_failed"));
		else onSent();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-lg border border-border bg-card px-3 py-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-foreground",
							children: draft.polished_by ? fill(t("society.share.polished_by"), { agent: draft.polished_by }) : fill(t("society.share.polish_title"), { agent: agent.name })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xs leading-relaxed text-muted-foreground",
							children: waiting ? fill(t("society.share.polish_waiting"), { agent: agent.name }) : chatReady ? fill(t("society.share.polish_hint"), { agent: agent.name }) : t("society.share.polish_unavailable")
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							className: "mt-1 text-xs text-destructive",
							children: error
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 flex-col items-end gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => void ask(),
						disabled: !chatReady || waiting,
						"data-testid": "share-polish",
						children: [waiting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-1.5 h-3.5 w-3.5" }), fill(t("society.share.polish_cta"), { agent: agent.name })]
					}), draft.polished_by && !waiting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onReset,
						className: "text-micro text-muted-foreground underline-offset-2 hover:text-foreground hover:underline",
						children: t("society.share.reset")
					})]
				})
			]
		})
	});
}
var FINDING_ORDER = [
	"secret",
	"email",
	"phone",
	"path",
	"address"
];
function PrivacyCheck({ findings }) {
	const t = useT();
	const sorted = [...findings].sort((a, b) => FINDING_ORDER.indexOf(a.kind) - FINDING_ORDER.indexOf(b.kind));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		"data-testid": "share-privacy",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg border border-border bg-card px-3 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-2 text-sm font-medium text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-muted-foreground" }), sorted.length === 0 ? t("society.share.privacy_clean") : fill(t("society.share.privacy_removed"), { count: sorted.length })]
			}), sorted.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs leading-relaxed text-muted-foreground",
				children: t("society.share.privacy_clean_hint")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-1",
				children: sorted.map((finding, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-baseline gap-2 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 rounded bg-secondary px-1.5 py-0.5 text-micro font-medium text-foreground",
						children: t(`society.share.finding_${finding.kind}`)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-0 truncate",
						children: fill(t("society.share.finding_where"), {
							hint: finding.hint,
							field: t(`society.share.field_${finding.field}`)
						})
					})]
				}, `${finding.kind}-${finding.hint}-${index}`))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg bg-secondary px-3 py-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-2 text-xs font-medium text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3.5 w-3.5 text-muted-foreground" }), t("society.share.never_title")]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs leading-relaxed text-muted-foreground",
				children: t("society.share.never_body")
			})]
		})]
	});
}
function TemplateCode({ fileName, json, saving }) {
	const t = useT();
	const [copied, setCopied] = (0, import_react.useState)(false);
	const copy = () => void robustCopy(json).then((ok) => {
		if (!ok) return;
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1500);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border bg-muted/40",
		"data-testid": "share-template-code",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex shrink-0 items-center gap-2 border-b border-border/60 bg-muted/30 px-3 py-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileJson, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 flex-1 truncate font-mono text-xs text-foreground",
					children: fileName
				}),
				saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					className: "h-3 w-3 animate-spin text-muted-foreground",
					"aria-label": t("society.card.saving")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: copy,
					className: "flex items-center gap-1 rounded px-1.5 py-1 text-micro text-muted-foreground hover:bg-muted hover:text-foreground",
					children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3 w-3" }), copied ? t("society.share.copied") : t("society.share.copy")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => downloadTemplate(fileName, json),
					className: "flex items-center gap-1 rounded px-1.5 py-1 text-micro text-muted-foreground hover:bg-muted hover:text-foreground",
					"data-testid": "share-export",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3 w-3" }), t("society.share.export")]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 overflow-auto [&_pre]:!whitespace-pre-wrap [&_pre]:[overflow-wrap:anywhere]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "m-0 px-3 py-2 text-xs text-foreground/90",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: json })
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
					language: "json",
					code: json,
					chrome: false
				})
			})
		})]
	});
}
function PublishBar({ agentId, draft, json, saving }) {
	const t = useT();
	const client = useQueryClient();
	const identity = usePublishIdentity();
	const [signInOpen, setSignInOpen] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const [live, setLive] = (0, import_react.useState)(false);
	const signedIn = Boolean(identity.data?.signed_in);
	const enabled = identity.data?.enabled !== false;
	const publish = useMutation({
		mutationFn: () => publishShareDraft(agentId),
		onSuccess: (done) => {
			setResult(done);
			client.invalidateQueries({ queryKey: shareDraftKey(agentId) });
			client.invalidateQueries({ queryKey: ["marketplace-community"] });
		}
	});
	(0, import_react.useEffect)(() => {
		if (!result || live) return;
		let cancelled = false;
		const tick = async () => {
			const isLive = await fetchLiveStatus(result.name, result.version).catch(() => false);
			if (!cancelled && isLive) {
				setLive(true);
				client.invalidateQueries({ queryKey: ["marketplace-community"] });
			}
		};
		tick();
		const timer = window.setInterval(() => void tick(), 15e3);
		return () => {
			cancelled = true;
			window.clearInterval(timer);
		};
	}, [
		result,
		live,
		client
	]);
	const failure = publish.error instanceof ShareError ? publish.error : null;
	const browserFallback = failure?.field === "browser_fallback";
	const fileByHand = () => {
		robustCopy(json);
		openExternalUrl(MARKETPLACE_ISSUE_FORM_URL);
	};
	if (result) {
		const url = result.issue_url ?? result.pr_url ?? result.url ?? null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
			className: "shrink-0 space-y-2 border-t border-border bg-card px-5 py-3",
			"data-testid": "share-published",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary", live ? "text-foreground-strong" : "text-foreground"),
						children: live ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-foreground",
							children: live ? fill(t("society.share.live_title"), {
								entry: result.name,
								version: result.version
							}) : fill(t("society.share.submitted_title"), {
								entry: result.name,
								version: result.version
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: live ? t("society.share.live_body") : t("society.share.submitted_body")
						})]
					}),
					url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => openExternalUrl(url),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "mr-1.5 h-3.5 w-3.5" }), t("society.share.view_submission")]
					})
				]
			}), result.install?.cli && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
				className: "block rounded-md border border-border bg-muted px-2.5 py-1.5 font-mono text-xs text-foreground",
				children: result.install.cli
			})]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "shrink-0 space-y-2 border-t border-border bg-card px-5 py-3",
		children: [
			draft.errors.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				role: "alert",
				className: "flex items-start gap-2 text-xs text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), draft.errors[0]]
			}),
			failure && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				role: "alert",
				className: "flex items-start gap-2 text-xs text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), browserFallback ? t("society.share.fallback_hint") : failure.message]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "min-w-0 flex-1 text-xs leading-relaxed text-muted-foreground",
						children: draft.published ? fill(t("society.share.published_before"), { version: draft.published.version }) : t("society.share.publish_hint")
					}),
					browserFallback && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: fileByHand,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "mr-1.5 h-3.5 w-3.5" }), t("society.share.fallback_cta")]
					}),
					!enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: t("society.share.publish_disabled")
					}) : !signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => setSignInOpen(true),
						disabled: identity.isLoading,
						"data-testid": "share-sign-in",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "mr-1.5 h-3.5 w-3.5" }), t("society.share.sign_in")]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublisherAvatar, {
									login: identity.data?.login,
									url: identity.data?.avatar_url,
									size: 20
								}),
								"@",
								identity.data?.login
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: () => publish.mutate(),
							disabled: publish.isPending || saving || draft.errors.length > 0,
							"data-testid": "share-publish",
							children: [publish.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "mr-1.5 h-3.5 w-3.5" }), t("society.share.publish")]
						})]
					})
				]
			}),
			signInOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GithubSignInDialog, { onClose: () => setSignInOpen(false) })
		]
	});
}
var ShareAgentDialog_default = ShareAgentDialog;
export { ShareAgentDialog, ShareAgentDialog_default as default };
