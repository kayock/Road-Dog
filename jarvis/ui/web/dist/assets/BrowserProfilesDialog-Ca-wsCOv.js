import { t as Globe } from "./globe-DYHt2aUm.js";
import { t as Plug } from "./plug-U1VLH2_U.js";
import { t as RotateCw } from "./rotate-cw-B2KgOpkU.js";
import { t as UserRound } from "./user-round-Us5q_CPD.js";
import { Bc as require_jsx_runtime, Cn as Portal, Ln as cn, Sn as Overlay, Tn as Title, Xc as require_react, bi as Plus, bn as Content, nc as useLocaleChunk, oc as useT, qi as ChevronDown, si as X, tl as __toESM, wn as Root, xn as Description, yn as Close, zc as useQueryClient } from "./index-BOzhgzD7.js";
import { a as createBrowserProfile, c as removeBrowserProfile, d as useBrowserProfiles, i as bindAgentBrowserProfile, l as shareBrowserProfile, n as BROWSER_PROFILE_CHANGED_EVENT, o as pairBrowserProfile, r as BrowserProfileError, s as parseBrowserDomains, t as BROWSER_PROFILES_QUERY, u as updateBrowserProfile } from "./browserProfiles-BEtUsO2L.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var button = "inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
var primaryButton = "inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
var input = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
var choiceCard = "flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-background p-3 hover:bg-secondary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:disabled]:cursor-default";
function useProfileAction() {
	const t = useT();
	const [pending, setPending] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const [failed, setFailed] = (0, import_react.useState)(false);
	async function run(action) {
		setPending(true);
		setMessage("");
		setFailed(false);
		try {
			await action();
			setMessage(t("society.browser_profiles.saved"));
		} catch (error) {
			setFailed(true);
			setMessage(t(error instanceof BrowserProfileError && error.status === 409 ? "society.browser_profiles.busy_error" : "society.browser_profiles.save_error"));
		} finally {
			setPending(false);
		}
	}
	return {
		pending,
		run,
		feedback: message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			role: failed ? "alert" : "status",
			className: cn("text-xs", failed ? "text-destructive" : "text-muted-foreground"),
			children: message
		}) : null
	};
}
function KindIcon({ kind }) {
	const Icon = kind === "chrome" ? Plug : kind === "own" ? UserRound : Globe;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": true,
		className: "mt-0.5 grid size-7 shrink-0 place-items-center rounded-md bg-secondary text-muted-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 15 })
	});
}
function Choice({ name, checked, disabled, onSelect, kind, title, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: choiceCard,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "radio",
				name,
				className: "mt-2 accent-primary",
				checked,
				disabled,
				onChange: onSelect
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindIcon, { kind }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "grid gap-0.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: hint
				})]
			})
		]
	});
}
function profileHint(profile, t) {
	return profile.kind === "chrome" ? t("society.browser_profiles.chrome_profile_hint").replace("{0}", profile.allowed_domains.join(", ")) : t("society.browser_profiles.managed_profile_hint");
}
function AgentChoice({ agentId, data, onSaved }) {
	const t = useT();
	const name = (0, import_react.useId)();
	const binding = data.bindings[agentId];
	const current = binding?.mode === "profile" && binding.profile_id ? `profile:${binding.profile_id}` : binding?.mode ?? "inherit";
	const action = useProfileAction();
	const agent = data.agents.find((item) => item.agent_id === agentId);
	const defaultProfile = data.profiles.find((profile) => profile.id === data.default_profile_id);
	const missing = binding?.mode === "profile" && !data.profiles.some((profile) => profile.id === binding.profile_id) || binding?.mode === "inherit" && !!data.default_profile_id && !defaultProfile;
	const others = data.profiles.filter((profile) => !profile.is_default || current === `profile:${profile.id}`);
	const choose = (mode, profileId = null) => void action.run(async () => {
		onSaved(await bindAgentBrowserProfile(agentId, mode, profileId));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-3 rounded-xl border border-border bg-secondary/30 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-semibold",
				children: t("society.browser_profiles.agent_title").replace("{0}", agent?.name ?? agentId)
			}),
			missing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-xs text-destructive",
				children: t("society.browser_profiles.agent_needs_choice")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "radiogroup",
				"aria-label": t("society.browser_profiles.agent_title").replace("{0}", agent?.name ?? agentId),
				className: "grid gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
						name,
						kind: "managed",
						checked: current === "inherit" && !missing,
						disabled: action.pending || !defaultProfile,
						onSelect: () => choose("inherit"),
						title: t("society.browser_profiles.use_shared"),
						hint: defaultProfile ? t("society.browser_profiles.use_shared_hint").replace("{0}", defaultProfile.name) : t("society.browser_profiles.no_shared")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
						name,
						kind: "own",
						checked: current === "own",
						disabled: action.pending,
						onSelect: () => choose("own"),
						title: t("society.browser_profiles.own"),
						hint: t("society.browser_profiles.own_hint")
					}),
					others.map((profile) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
						name,
						kind: profile.kind,
						checked: current === `profile:${profile.id}`,
						disabled: action.pending,
						onSelect: () => choose("profile", profile.id),
						title: profile.name,
						hint: profileHint(profile, t)
					}, profile.id))
				]
			}),
			action.feedback
		]
	});
}
function PairingPanel({ profileId, connected }) {
	const t = useT();
	const action = useProfileAction();
	const [pairing, setPairing] = (0, import_react.useState)(null);
	const [expired, setExpired] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!pairing) return;
		const timer = window.setTimeout(() => {
			setPairing(null);
			setExpired(true);
		}, pairing.expires_in * 1e3);
		return () => window.clearTimeout(timer);
	}, [pairing]);
	(0, import_react.useEffect)(() => {
		if (connected) setPairing(null);
	}, [connected]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		open: !connected,
		className: "group grid gap-3 rounded-lg border border-border p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
			className: "flex cursor-pointer list-none items-center justify-between text-sm font-semibold",
			children: [t(connected ? "society.browser_profiles.reconnect_chrome" : "society.browser_profiles.connect_chrome"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
				size: 14,
				"aria-hidden": true,
				className: "transition-transform group-open:rotate-180"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "list-decimal space-y-2 pl-5 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "font-medium text-foreground underline underline-offset-2",
								href: "/api/society/browser/extension.zip",
								download: true,
								children: t("society.browser_profiles.download")
							}),
							" ",
							t("society.browser_profiles.unpack")
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("society.browser_profiles.install") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("society.browser_profiles.pair_hint") })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: button,
					disabled: action.pending,
					onClick: () => void action.run(async () => {
						setPairing(await pairBrowserProfile(profileId));
						setExpired(false);
					}),
					children: t("society.browser_profiles.generate_code")
				}) }),
				pairing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2 rounded-md border border-border bg-background p-3 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("society.browser_profiles.server") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "break-all select-all",
							children: pairing.server_url
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("society.browser_profiles.code") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "select-all text-xl font-semibold tracking-widest",
							"aria-label": t("society.browser_profiles.code"),
							children: pairing.pairing_code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: t("society.browser_profiles.code_expiry").replace("{0}", String(Math.ceil(pairing.expires_in / 60)))
						})
					]
				}),
				expired && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "status",
					className: "text-xs text-muted-foreground",
					children: t("society.browser_profiles.code_expired")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						t("society.browser_profiles.extension_preview"),
						" ",
						t("society.browser_profiles.chrome_limits")
					]
				}),
				action.feedback
			]
		})]
	});
}
function DomainsField({ kind, domains, setDomains }) {
	const t = useT();
	const id = (0, import_react.useId)();
	const field = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-1 text-xs font-medium",
		htmlFor: id,
		children: [t("society.browser_profiles.domains"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			id,
			className: input,
			required: kind === "chrome",
			autoComplete: "off",
			placeholder: "x.com, github.com",
			value: domains,
			onChange: (event) => setDomains(event.target.value),
			"aria-describedby": `${id}-hint`
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		id: `${id}-hint`,
		className: "text-xs text-muted-foreground",
		children: t(kind === "chrome" ? "society.browser_profiles.domains_hint" : "society.browser_profiles.managed_domains_hint")
	})] });
	if (kind === "chrome") return field;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		open: !!domains.trim(),
		className: "grid gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
			className: "cursor-pointer text-xs font-medium text-muted-foreground",
			children: t("society.browser_profiles.limit_sites")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 grid gap-1",
			children: field
		})]
	});
}
function NameField({ name, setName }) {
	const t = useT();
	const id = (0, import_react.useId)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-1 text-xs font-medium",
		htmlFor: id,
		children: [t("society.browser_profiles.name"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			id,
			className: input,
			required: true,
			maxLength: 80,
			autoComplete: "off",
			value: name,
			onChange: (event) => setName(event.target.value)
		})]
	});
}
function UsedBy({ profile, data }) {
	const t = useT();
	const names = data.agents.filter((agent) => profile.agent_ids.includes(agent.agent_id)).map((agent) => agent.name);
	if (profile.is_default && data.agents.length > 0 && names.length === data.agents.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: t("society.browser_profiles.used_by_all") });
	if (!names.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: t(profile.is_default ? "society.browser_profiles.used_by_new" : "society.browser_profiles.used_by_none") });
	const shown = names.length > 3 ? t("society.browser_profiles.used_by_more").replace("{0}", names.slice(0, 3).join(", ")).replace("{1}", String(names.length - 3)) : names.join(", ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: t("society.browser_profiles.used_by").replace("{0}", shown) });
}
function ProfileUsage({ profile, data, onSaved }) {
	const t = useT();
	const [agents, setAgents] = (0, import_react.useState)(profile.agent_ids);
	const [confirming, setConfirming] = (0, import_react.useState)(false);
	const action = useProfileAction();
	const changed = agents.length !== profile.agent_ids.length || agents.some((id) => !profile.agent_ids.includes(id));
	const removed = profile.agent_ids.some((id) => !agents.includes(id));
	if (profile.is_default) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-1 border-t border-border pt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
			className: "text-sm font-semibold",
			children: t("society.browser_profiles.usage_title")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: t("society.browser_profiles.default_usage")
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-3 border-t border-border pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "text-sm font-semibold",
				children: t("society.browser_profiles.usage_title")
			}),
			confirming ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 rounded-md border border-border bg-secondary/40 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs",
					children: t("society.browser_profiles.make_default_confirm").replace("{0}", profile.name)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: primaryButton,
						disabled: action.pending,
						onClick: () => void action.run(async () => {
							onSaved(await shareBrowserProfile(profile.id, {
								scope: "all",
								agent_ids: []
							}));
						}),
						children: t("society.browser_profiles.confirm_make_default")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: button,
						disabled: action.pending,
						onClick: () => setConfirming(false),
						children: t("society.browser_profiles.cancel")
					})]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: button,
				disabled: action.pending,
				onClick: () => setConfirming(true),
				children: t("society.browser_profiles.make_default")
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-2",
				onSubmit: (event) => {
					event.preventDefault();
					action.run(async () => onSaved(await shareBrowserProfile(profile.id, {
						scope: "selected",
						agent_ids: agents
					})));
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: t("society.browser_profiles.pick_agents")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "grid max-h-44 gap-2 overflow-y-auto rounded-md border border-border p-3",
						disabled: action.pending,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "sr-only",
								children: t("society.browser_profiles.pick_agents")
							}),
							data.agents.map((agent) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									className: "accent-primary",
									checked: agents.includes(agent.agent_id),
									onChange: (event) => {
										setAgents((current) => event.target.checked ? [...current, agent.agent_id] : current.filter((id) => id !== agent.agent_id));
									}
								}), agent.name]
							}, agent.agent_id)),
							!data.agents.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: t("society.browser_profiles.no_agents")
							})
						]
					}),
					removed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: t("society.browser_profiles.pick_agents_hint")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: button,
						disabled: action.pending || !changed,
						children: t("society.browser_profiles.save_agents")
					}) })
				]
			}),
			action.feedback
		]
	});
}
function ProfileEditor({ profile, data, onSaved, onRemoved }) {
	const t = useT();
	const [name, setName] = (0, import_react.useState)(profile.name);
	const [domains, setDomains] = (0, import_react.useState)(profile.allowed_domains.join(", "));
	const [removing, setRemoving] = (0, import_react.useState)(false);
	const details = useProfileAction();
	const removal = useProfileAction();
	const parsed = parseBrowserDomains(domains);
	const dirty = name.trim() !== profile.name || parsed.join(",") !== profile.allowed_domains.join(",");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 border-t border-border p-4",
		children: [
			profile.kind === "chrome" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PairingPanel, {
				profileId: profile.id,
				connected: profile.connected
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-3",
				onSubmit: (event) => {
					event.preventDefault();
					details.run(async () => onSaved(await updateBrowserProfile(profile.id, {
						name: name.trim(),
						allowed_domains: parsed
					})));
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NameField, {
						name,
						setName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DomainsField, {
						kind: profile.kind,
						domains,
						setDomains
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: button,
						type: "submit",
						disabled: details.pending || !dirty || !name.trim() || profile.kind === "chrome" && !parsed.length,
						children: t("society.browser_profiles.save_details")
					}) }),
					details.feedback
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileUsage, {
				profile,
				data,
				onSaved
			}, profile.agent_ids.join(",")),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border pt-3",
				children: removing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: t(profile.is_default ? "society.browser_profiles.remove_default_hint" : "society.browser_profiles.remove_hint")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: cn(button, "text-destructive"),
								disabled: removal.pending,
								onClick: () => void removal.run(async () => {
									onSaved(await removeBrowserProfile(profile.id));
									onRemoved();
								}),
								children: t("society.browser_profiles.confirm_remove")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: button,
								disabled: removal.pending,
								onClick: () => setRemoving(false),
								children: t("society.browser_profiles.cancel")
							})]
						}),
						removal.feedback
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-xs text-destructive underline underline-offset-2",
					onClick: () => setRemoving(true),
					children: t("society.browser_profiles.remove")
				})
			})
		]
	});
}
function ProfileCard({ profile, data, open, onToggle, onSaved, onRemoved }) {
	const t = useT();
	const panel = (0, import_react.useId)();
	const badge = (text, tone = "bg-secondary text-muted-foreground") => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("rounded-full px-2 py-0.5 text-[11px] font-medium", tone),
		children: text
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl border border-border bg-background",
		"data-testid": `browser-profile-${profile.id}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "flex w-full items-start gap-3 rounded-xl p-4 text-left hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
			"aria-expanded": open,
			"aria-controls": panel,
			onClick: onToggle,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindIcon, { kind: profile.kind }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "grid min-w-0 flex-1 gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-sm font-semibold",
								children: profile.name
							}),
							profile.is_default && badge(t("society.browser_profiles.default"), "bg-primary/10 text-primary"),
							badge(t(profile.kind === "chrome" ? "society.browser_profiles.kind_chrome" : "society.browser_profiles.kind_managed")),
							profile.kind === "chrome" && badge(t(profile.connected ? "society.browser_profiles.status_connected" : "society.browser_profiles.status_disconnected"), profile.connected ? "bg-success/10 text-success" : "bg-warning/10 text-warning")
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsedBy, {
							profile,
							data
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex shrink-0 items-center gap-1 text-xs text-muted-foreground",
					children: [t(open ? "society.browser_profiles.done" : "society.browser_profiles.manage"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
						size: 14,
						"aria-hidden": true,
						className: cn("transition-transform", open && "rotate-180")
					})]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			id: panel,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileEditor, {
				profile,
				data,
				onSaved,
				onRemoved
			}, `${profile.id}:${profile.name}:${profile.allowed_domains.join(",")}:${profile.is_default}`)
		})]
	});
}
function NewProfile({ initialKind, onCreated, onCancel }) {
	const t = useT();
	const kindName = (0, import_react.useId)();
	const [kind, setKind] = (0, import_react.useState)(initialKind);
	const [name, setName] = (0, import_react.useState)("");
	const [domains, setDomains] = (0, import_react.useState)("");
	const action = useProfileAction();
	const parsed = parseBrowserDomains(domains);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-3 rounded-xl border border-primary/40 p-4",
		onSubmit: (event) => {
			event.preventDefault();
			action.run(async () => onCreated(await createBrowserProfile({
				name: name.trim(),
				kind,
				allowed_domains: parsed
			})));
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-semibold",
				children: t("society.browser_profiles.new_title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "radiogroup",
				"aria-label": t("society.browser_profiles.kind"),
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
					name: kindName,
					kind: "managed",
					checked: kind === "managed",
					disabled: action.pending,
					onSelect: () => setKind("managed"),
					title: t("society.browser_profiles.new_managed"),
					hint: t("society.browser_profiles.new_managed_hint")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
					name: kindName,
					kind: "chrome",
					checked: kind === "chrome",
					disabled: action.pending,
					onSelect: () => setKind("chrome"),
					title: t("society.browser_profiles.new_chrome"),
					hint: t("society.browser_profiles.new_chrome_hint")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NameField, {
				name,
				setName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DomainsField, {
				kind,
				domains,
				setDomains
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: primaryButton,
					disabled: action.pending || !name.trim() || kind === "chrome" && !parsed.length,
					children: t("society.browser_profiles.create")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: button,
					disabled: action.pending,
					onClick: onCancel,
					children: t("society.browser_profiles.cancel")
				})]
			}),
			action.feedback
		]
	});
}
function HowItWorks() {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "group rounded-lg border border-border px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
			className: "flex cursor-pointer list-none items-center justify-between text-sm font-medium",
			children: [t("society.browser_profiles.how_title"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
				size: 14,
				"aria-hidden": true,
				className: "transition-transform group-open:rotate-180"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-3 grid gap-2 text-xs text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						className: "text-foreground",
						children: [t("society.browser_profiles.use_shared"), ":"]
					}),
					" ",
					t("society.browser_profiles.how_shared")
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						className: "text-foreground",
						children: [t("society.browser_profiles.how_sign_in_title"), ":"]
					}),
					" ",
					t("society.browser_profiles.how_sign_in")
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						className: "text-foreground",
						children: [t("society.browser_profiles.own"), ":"]
					}),
					" ",
					t("society.browser_profiles.how_own")
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						className: "text-foreground",
						children: [t("society.browser_profiles.kind_chrome"), ":"]
					}),
					" ",
					t("society.browser_profiles.how_chrome")
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("society.browser_profiles.persistence") })
			]
		})]
	});
}
function BrowserProfilesDialog({ agentId, onClose, connectChrome = false }) {
	const t = useT();
	useLocaleChunk("society");
	const queryClient = useQueryClient();
	const query = useBrowserProfiles();
	const [openId, setOpenId] = (0, import_react.useState)(void 0);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [setupDismissed, setSetupDismissed] = (0, import_react.useState)(false);
	const data = query.data;
	const firstChrome = data?.profiles.find((profile) => profile.kind === "chrome");
	const showCreate = creating || connectChrome && !!data && !firstChrome && !setupDismissed;
	const expanded = openId === void 0 ? connectChrome ? firstChrome?.id ?? null : null : openId;
	const onSaved = (snapshot) => {
		const previous = queryClient.getQueryData(BROWSER_PROFILES_QUERY);
		const changedProfiles = new Set(previous?.profiles.filter((profile) => {
			const next = snapshot.profiles.find((entry) => entry.id === profile.id);
			return !next || next.allowed_domains.join(",") !== profile.allowed_domains.join(",");
		}).map((profile) => profile.id));
		const agentIds = snapshot.agents.filter(({ agent_id }) => {
			const before = previous?.bindings[agent_id];
			const after = snapshot.bindings[agent_id];
			return before?.effective_profile_id !== after?.effective_profile_id || before?.effective_profile_id != null && changedProfiles.has(before.effective_profile_id);
		}).map(({ agent_id }) => agent_id);
		queryClient.setQueryData(BROWSER_PROFILES_QUERY, snapshot);
		if (agentIds.length) {
			window.dispatchEvent(new CustomEvent(BROWSER_PROFILE_CHANGED_EVENT, { detail: { agentIds } }));
			queryClient.invalidateQueries({ queryKey: ["society", "browser-open"] });
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		open: true,
		onOpenChange: (open) => {
			if (!open) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 z-[150] bg-scrim/60 backdrop-blur-sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
			className: "fixed left-1/2 top-1/2 z-[151] flex max-h-[90dvh] w-[min(42rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-border bg-background text-foreground shadow-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4 border-b border-border p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
						className: "font-display text-lg font-semibold",
						children: t("society.browser_profiles.title")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
						className: "text-sm text-muted-foreground",
						children: t("society.browser_profiles.intro")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
					className: button,
					"aria-label": t("society.browser_profiles.close"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 overflow-y-auto p-5",
				children: [
					connectChrome && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "note",
						className: "rounded-lg border border-border bg-secondary/30 p-4 text-sm",
						children: t("society.browser_profiles.google_signin_recovery")
					}),
					query.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "status",
						className: "text-sm text-muted-foreground",
						children: t("society.browser_profiles.loading")
					}),
					query.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "text-sm text-destructive",
						children: t("society.browser_profiles.load_error")
					}),
					data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						agentId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentChoice, {
							agentId,
							data,
							onSaved
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "grid gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-semibold",
										children: t("society.browser_profiles.profiles")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: button,
											disabled: query.isFetching,
											onClick: () => void query.refetch(),
											"aria-label": t("society.browser_profiles.refresh"),
											title: t("society.browser_profiles.refresh"),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { size: 14 })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: button,
											disabled: showCreate,
											onClick: () => setCreating(true),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), t("society.browser_profiles.new")]
										})]
									})]
								}),
								showCreate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewProfile, {
									initialKind: connectChrome ? "chrome" : "managed",
									onCancel: () => {
										setCreating(false);
										setSetupDismissed(true);
									},
									onCreated: async (profile) => {
										await queryClient.invalidateQueries({ queryKey: BROWSER_PROFILES_QUERY });
										setOpenId(profile.id);
										setCreating(false);
										setSetupDismissed(true);
									}
								}),
								!data.profiles.length && !showCreate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "rounded-lg border border-dashed border-border p-5 text-sm text-muted-foreground",
									children: t("society.browser_profiles.empty")
								}),
								data.profiles.map((profile) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileCard, {
									profile,
									data,
									open: expanded === profile.id,
									onToggle: () => setOpenId(expanded === profile.id ? null : profile.id),
									onSaved,
									onRemoved: () => setOpenId(null)
								}, profile.id))
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorks, {})
					] })
				]
			})]
		})] })
	});
}
export { BrowserProfilesDialog as default };
