import { t as Check } from "./check-vbwKkbPq.js";
import { t as ChevronRight } from "./chevron-right-BjVJ-R2c.js";
import { n as providerFamily, t as ProviderLogo } from "./ProviderLogo-BxoN_q6P.js";
import { t as Pause } from "./pause-3aM4bP8F.js";
import { t as Play } from "./play-B4Hl_QRo.js";
import { t as Users } from "./users-WSH2xBOP.js";
import { Ai as LockKeyhole, Bc as require_jsx_runtime, Hi as Ellipsis, Oc as useQuery, Pi as KeyRound, Xc as require_react, Zi as ArrowRight, bi as Plus, gi as Search, ji as LoaderCircle, ln as Button, oc as useT, tl as __toESM, ui as Trash2, zc as useQueryClient } from "./index-BOzhgzD7.js";
import { n as bundledPluginLogo } from "./pluginLogos-2ICNq49h.js";
import { c as IconButton, d as Panel, f as PanelHeader, g as StatusDot, n as BackLink, t as ActionMenu } from "./primitives-C1uNwbNH.js";
import { t as Input } from "./input-DXuNAC9g.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var ApiConnectionError = class extends Error {
	constructor(code, suggestions = []) {
		super(code);
		this.code = code;
		this.suggestions = suggestions;
	}
};
async function customApiRequest(path = "", init) {
	const response = await fetch(`/api/custom-apis${path}`, init);
	const data = await response.json();
	if (!response.ok) {
		if (data.detail?.code) throw new ApiConnectionError(data.detail.code, data.detail.suggestions ?? []);
		throw new Error(typeof data.detail === "string" ? data.detail : `HTTP ${response.status}`);
	}
	return data;
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var QUERY_KEY = ["api-connections"];
var jsonRequest = (method, body) => ({
	method,
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify(body)
});
function brandFor(name) {
	const value = name.toLowerCase().replace(/\b(api|documentation)\b/g, "").replace(/[^a-z0-9]/g, "");
	return value === "11labs" ? "elevenlabs" : value;
}
function ConnectionLogo({ name, brand = "", image = "", large = false }) {
	const id = brand || brandFor(name);
	const size = large ? "!h-14 !w-14 !rounded-xl" : "!h-11 !w-11 !rounded-xl";
	const bundled = bundledPluginLogo(id);
	if (providerFamily(id) === id) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderLogo, {
		providerId: id,
		label: name,
		className: size
	});
	if (bundled || image) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": true,
		className: `inline-flex shrink-0 items-center justify-center bg-secondary p-2 ${size}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: bundled || image,
			alt: "",
			className: "h-full w-full object-contain"
		})
	});
	const seed = [...name].reduce((hash, char) => hash * 31 + char.charCodeAt(0) >>> 0, 19);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": true,
		"data-testid": "generated-connection-mark",
		className: `inline-flex shrink-0 items-center justify-center bg-secondary text-muted-foreground ${size}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 32 32",
			className: "h-7 w-7",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "11",
				y: "11",
				width: "10",
				height: "10",
				rx: seed % 2 ? 3 : 1
			}), [
				0,
				1,
				2,
				3
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				transform: `rotate(${i * 90} 16 16)`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 11V6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "16",
					cy: "4.5",
					r: seed & 1 << i ? 2 : 1,
					fill: seed & 1 << i ? "currentColor" : "none"
				})]
			}, i))]
		})
	});
}
function useConnectionError() {
	const t = useT();
	return (error) => {
		if (error instanceof ApiConnectionError) {
			const key = `custom_apis.errors.${error.code}`;
			const translated = t(key);
			return translated === key ? t("custom_apis.failed") : translated;
		}
		return t("custom_apis.failed");
	};
}
function CustomApisView({ onBack }) {
	const t = useT();
	const errorText = useConnectionError();
	const queryClient = useQueryClient();
	const list = useQuery({
		queryKey: QUERY_KEY,
		queryFn: () => customApiRequest("/connections"),
		retry: false
	});
	const [editor, setEditor] = (0, import_react.useState)(null);
	const [details, setDetails] = (0, import_react.useState)(null);
	const [removing, setRemoving] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const refresh = () => queryClient.invalidateQueries({ queryKey: QUERY_KEY });
	async function remove(connection) {
		setBusy(connection.id);
		setError("");
		try {
			await customApiRequest(`/${connection.id}`, { method: "DELETE" });
			setRemoving(null);
			await refresh();
		} catch (e) {
			setError(errorText(e));
		} finally {
			setBusy(null);
		}
	}
	async function toggle(connection) {
		setBusy(connection.id);
		setError("");
		try {
			await customApiRequest(`/connections/${connection.id}`, jsonRequest("PATCH", { enabled: !connection.enabled }));
			await refresh();
		} catch (e) {
			setError(errorText(e));
		} finally {
			setBusy(null);
		}
	}
	if (details) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectionDetails, {
		connection: details,
		onBack: () => setDetails(null)
	});
	const isEmpty = list.data?.length === 0;
	if (editor !== null || isEmpty) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-6",
		"aria-label": t("custom_apis.title"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {
			label: isEmpty ? t("nav.plugins") : t("custom_apis.title"),
			onClick: isEmpty ? onBack : () => setEditor(null)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectionForm, {
			initial: typeof editor === "object" ? editor : null,
			onSaved: async () => {
				await refresh();
				setEditor(null);
			}
		}, typeof editor === "object" && editor ? editor.id : "new")]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "custom-api-connections space-y-5",
		"aria-label": t("custom_apis.title"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {
				label: t("nav.plugins"),
				onClick: onBack
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
				className: "custom-api-header",
				title: t("custom_apis.title"),
				subtitle: t("custom_apis.connections_subtitle"),
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => setEditor("new"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), t("custom_apis.add")]
				})
			}),
			list.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "status",
				className: "flex items-center gap-2 py-8 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), t("custom_apis.loading")]
			}),
			(error || list.error) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				role: "alert",
				className: "text-sm text-destructive",
				children: [
					error || errorText(list.error),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "underline",
						onClick: () => void list.refetch(),
						children: t("custom_apis.retry")
					})
				]
			}),
			!!list.data?.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border/60",
				"aria-label": t("custom_apis.title"),
				children: list.data.map((connection) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "px-4 py-4 sm:px-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "custom-api-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectionLogo, {
								name: connection.name,
								brand: connection.brand_id,
								image: connection.logo_data
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "min-w-0 flex-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								onClick: () => setDetails(connection),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-base font-semibold text-foreground-strong",
									children: connection.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-0.5 block truncate text-sm text-muted-foreground",
									children: [
										connection.action_count,
										" ",
										t("custom_apis.capabilities_count"),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "px-1.5 text-foreground-faint",
											children: "·"
										}),
										" ",
										connection.website.replace(/^https?:\/\//, "")
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "custom-api-status",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, {
									tone: !connection.enabled ? "off" : connection.status === "verified" ? "ok" : connection.status === "limited" ? "warn" : "off",
									label: t(!connection.enabled ? "custom_apis.paused" : connection.tools_ready ? `custom_apis.status_${connection.status}` : "custom_apis.saved")
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionMenu, {
								label: `${t("custom_apis.manage")} ${connection.name}`,
								actions: [
									{
										id: "edit",
										label: t("custom_apis.edit_key"),
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-4 w-4" }),
										onSelect: () => setEditor(connection)
									},
									{
										id: "pause",
										label: t(connection.enabled ? "custom_apis.pause" : "custom_apis.resume"),
										icon: connection.enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4" }),
										onSelect: () => void toggle(connection)
									},
									{
										id: "remove",
										label: t("custom_apis.delete"),
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }),
										separatorAbove: true,
										onSelect: () => setRemoving(connection.id)
									}
								],
								trigger: ({ toggle: openMenu }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
									label: `${t("custom_apis.manage")} ${connection.name}`,
									onClick: openMenu,
									disabled: busy === connection.id,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-4 w-4" })
								})
							})
						]
					}), removing === connection.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center justify-end gap-2 border-t border-border/60 pt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mr-auto text-sm text-muted-foreground",
								children: t("custom_apis.remove_confirm")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								disabled: busy !== null,
								onClick: () => setRemoving(null),
								children: t("common.cancel")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "destructive",
								disabled: busy !== null,
								onClick: () => void remove(connection),
								children: t("custom_apis.delete")
							})
						]
					})]
				}, connection.id))
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 px-1 text-sm leading-relaxed text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "mt-0.5 h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("custom_apis.inheritance") })]
			})
		]
	});
}
function ConnectionForm({ initial, onSaved }) {
	const t = useT();
	const errorText = useConnectionError();
	const [id] = (0, import_react.useState)(() => initial?.id ?? crypto.randomUUID().replaceAll("-", ""));
	const [name, setName] = (0, import_react.useState)(initial?.name ?? "");
	const [credential, setCredential] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	async function submit(event) {
		event.preventDefault();
		setError(null);
		setBusy(true);
		try {
			await customApiRequest("/connect", jsonRequest("POST", {
				id,
				name: name.trim(),
				...credential ? { credential } : {}
			}));
			setCredential("");
			await onSaved();
		} catch (e) {
			setError(e);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-md pb-3 pt-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-7 flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectionLogo, {
					name: name || "Sam connection",
					brand: initial?.brand_id,
					image: initial?.logo_data,
					large: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-semibold tracking-tight text-foreground-strong",
						children: t(initial ? "custom_apis.edit_key" : "custom_apis.add_title")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-relaxed text-muted-foreground",
						children: t(initial ? "custom_apis.edit_hint" : "custom_apis.simple_hint")
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (event) => void submit(event),
				className: "space-y-5",
				"aria-label": t("custom_apis.add_title"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "api-service-name",
							className: "text-sm font-medium text-foreground",
							children: t("custom_apis.service_name")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "api-service-name",
							required: true,
							readOnly: !!initial,
							disabled: busy,
							autoComplete: "off",
							maxLength: 100,
							placeholder: t("custom_apis.name_example"),
							value: name,
							onChange: (event) => setName(event.target.value),
							className: "h-11 rounded-lg bg-secondary/50 text-base",
							autoFocus: !initial
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "api-service-key",
							className: "text-sm font-medium text-foreground",
							children: t("custom_apis.key")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "api-service-key",
							type: "password",
							required: !initial,
							disabled: busy,
							autoComplete: "new-password",
							maxLength: 8192,
							placeholder: t(initial?.has_credential ? "custom_apis.key_saved" : "custom_apis.key_placeholder"),
							value: credential,
							onChange: (event) => setCredential(event.target.value),
							className: "h-11 rounded-lg bg-secondary/50 font-mono text-base"
						})]
					}),
					Boolean(error) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						role: "alert",
						className: "rounded-lg bg-destructive/10 px-3 py-2.5 text-sm text-destructive",
						children: [errorText(error), error instanceof ApiConnectionError && error.suggestions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: error.suggestions.map((suggestion) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "rounded-md bg-background px-2 py-1 text-foreground",
								onClick: () => {
									setName(suggestion);
									setError(null);
								},
								children: suggestion
							}, suggestion))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "h-11 w-full rounded-lg",
						disabled: busy || !name.trim() || !initial && !credential,
						children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), t("custom_apis.connecting")] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [t(initial ? "custom_apis.save_key" : "custom_apis.connect"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})] })
					}),
					busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "status",
						className: "text-center text-sm text-muted-foreground",
						children: t("custom_apis.discovering")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex gap-2.5 text-xs leading-relaxed text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("custom_apis.private_key") })]
			}),
			!initial && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7 border-t border-border/60 pt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm font-medium text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-muted-foreground" }), t("custom_apis.automatic")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
					children: t("custom_apis.automatic_hint")
				})]
			})
		]
	});
}
function ConnectionDetails({ connection, onBack }) {
	const t = useT();
	const [query, setQuery] = (0, import_react.useState)("");
	const actions = useQuery({
		queryKey: ["api-capabilities", connection.id],
		queryFn: () => customApiRequest(`/connections/${connection.id}/actions`),
		retry: false
	});
	const visible = (actions.data?.actions ?? []).filter((action) => action.description.toLowerCase().includes(query.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {
				label: t("custom_apis.title"),
				onClick: onBack
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectionLogo, {
					name: connection.name,
					brand: connection.brand_id,
					image: connection.logo_data,
					large: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold text-foreground-strong",
					children: connection.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						connection.action_count,
						" ",
						t("custom_apis.capabilities_count")
					]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted-foreground",
				children: t("custom_apis.capabilities_hint")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 rounded-lg bg-secondary px-3 py-2.5 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "search",
					"aria-label": t("custom_apis.search_capabilities"),
					placeholder: t("custom_apis.search_capabilities"),
					value: query,
					onChange: (event) => setQuery(event.target.value),
					className: "min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none"
				})]
			}),
			actions.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				className: "text-sm text-muted-foreground",
				children: t("custom_apis.loading")
			}),
			actions.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-sm text-destructive",
				children: t("custom_apis.failed")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border/60",
				children: visible.map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3 px-4 py-3 text-sm text-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5 shrink-0 text-foreground-faint" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: action.description }),
						action.risk_tier === "block" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-auto text-xs text-muted-foreground",
							children: t("custom_apis.blocked")
						})
					]
				}, action.id))
			}) }),
			connection.omitted_operations > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: t("custom_apis.partial_capabilities").replace("{count}", String(connection.omitted_operations))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3.5 w-3.5" }), t("custom_apis.inheritance")]
			})
		]
	});
}
export { ConnectionLogo, CustomApisView };
