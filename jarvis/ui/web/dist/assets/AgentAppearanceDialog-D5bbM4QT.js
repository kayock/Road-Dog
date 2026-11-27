const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AgentFigureViewer-BUXn8Sq8.js","assets/index-BOzhgzD7.js","assets/index-CA6QM4ps.css","assets/react-three-fiber.esm-Dp0xg4g-.js","assets/three.module-CsntsSp5.js","assets/ToyFigure-DQYSgl5W.js","assets/toyFigureModel-CWYjWDfN.js","assets/figureRecipe-BRnaWN-p.js","assets/LobbyStage-Cyt-y0V8.js","assets/useCanvasAwake-5sZXDaXU.js"])))=>i.map(i=>d[i]);
import { Bc as require_jsx_runtime, Cn as Portal, Sn as Overlay, Tn as Title, Xc as require_react, bn as Content, cc as __vitePreload, ln as Button, oc as useT, si as X, tl as __toESM, wc as useEventStore, wn as Root, xn as Description, zc as useQueryClient } from "./index-BOzhgzD7.js";
import "./petStage-CMRGLgJ7.js";
import "./switch-hmH-TV55.js";
import { t as AgentSwatch } from "./AgentSwatch-CHRK4Jk4.js";
import { a as resolveCompanion } from "./appearance-CnI1Xhkn.js";
import "./CompanionMark-BvabJfVP.js";
import { a as resolvePalette, r as defaultRecipe, t as EDITABLE_CELLS } from "./figureRecipe-BRnaWN-p.js";
import { t as societyDisplayName } from "./societyDisplayName-iRYNmFrn.js";
import { CompanionEditor } from "./CompanionEditor-DhymGKvY.js";
import { f as toyLookFor, n as HAIR_STYLES } from "./toyFigureModel-CWYjWDfN.js";
import { a as pinLook, c as withHair } from "./wardrobe-CURtphLT.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var AgentFigureViewer = (0, import_react.lazy)(() => __vitePreload(() => import("./AgentFigureViewer-BUXn8Sq8.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9])).then((m) => ({ default: m.AgentFigureViewer })));
function CharacterEditor({ value, onChange, disabled }) {
	const t = useT();
	const look = toyLookFor(value, "");
	const colors = {
		...resolvePalette(value),
		skin: look.skin,
		hair: look.hair,
		primary: look.shirt,
		secondary: look.pants,
		accent: look.shirtAccent,
		shoes: look.shoes
	};
	const hair = look.hairStyle;
	const setCell = (cell, color) => {
		const pinned = pinLook(value);
		onChange({
			...pinned,
			palette: {
				...pinned.palette,
				[cell]: color
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
		disabled,
		className: "grid gap-4 p-4",
		"data-testid": "character-editor",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentFigureViewer, {
						recipe: value,
						quiet: true
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("society.office.hair_label") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					role: "group",
					"aria-label": t("society.office.hair_label"),
					children: HAIR_STYLES.map((style) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": hair === style,
						onClick: () => onChange(withHair(value, style)),
						className: `rounded-full border px-2.5 py-1 text-xs ${hair === style ? "border-transparent bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:bg-secondary"}`,
						children: t(`society.office.hair_${style}`)
					}, style))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3",
				children: EDITABLE_CELLS.map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center justify-between gap-2 text-sm",
					children: [t(`society.cell.${cell}`), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "color",
						value: colors[cell],
						onChange: (e) => setCell(cell, e.target.value),
						className: "h-8 w-10 rounded border border-border bg-background"
					})]
				}, cell))
			})
		]
	});
}
function AgentAppearanceDialog({ agent, sample, onClose }) {
	const t = useT();
	const client = useQueryClient();
	const displayName = societyDisplayName(agent, useEventStore((s) => s.assistantName));
	const [recipe, setRecipe] = (0, import_react.useState)(() => ({
		...agent.figure ?? defaultRecipe(),
		companion: resolveCompanion(agent.agentId, agent.figure?.companion)
	}));
	const [saved, setSaved] = (0, import_react.useState)(() => JSON.stringify(recipe));
	const [tab, setTab] = (0, import_react.useState)("companion");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(false);
	const [discard, setDiscard] = (0, import_react.useState)(false);
	const opener = (0, import_react.useRef)(document.activeElement instanceof HTMLElement ? document.activeElement : null);
	const dirty = JSON.stringify(recipe) !== saved;
	const close = () => {
		if (saving) return;
		if (dirty) setDiscard(true);
		else onClose();
	};
	const save = async () => {
		setSaving(true);
		setError(false);
		try {
			const response = await fetch(`/api/society/agents/${encodeURIComponent(agent.agentId)}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ avatar: recipe })
			});
			if (!response.ok) throw new Error(`appearance ${response.status}`);
			setSaved(JSON.stringify(recipe));
			setDiscard(false);
			await Promise.all([client.invalidateQueries({ queryKey: ["society", "roster"] }), client.invalidateQueries({ queryKey: ["mars"] })]);
		} catch {
			setError(true);
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		open: true,
		onOpenChange: (open) => {
			if (!open) close();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 z-50 bg-scrim/60 backdrop-blur-sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
			"data-testid": "agent-appearance-dialog",
			onCloseAutoFocus: (e) => {
				e.preventDefault();
				opener.current?.focus();
			},
			className: "fixed left-1/2 top-1/2 z-50 flex max-h-[90dvh] w-[min(640px,calc(100vw-24px))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-border bg-popover text-foreground shadow-float",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center gap-3 border-b border-border p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentSwatch, {
							agent: {
								...agent,
								figure: recipe
							},
							size: 48
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
								className: "font-semibold",
								children: displayName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
								className: "text-sm text-muted-foreground",
								children: t("society.companion.appearance")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": t("society.card.close"),
							onClick: close,
							className: "rounded p-2 hover:bg-secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex shrink-0 gap-2 border-b border-border p-3",
					role: "tablist",
					"aria-label": t("society.companion.appearance"),
					children: ["character", "companion"].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						role: "tab",
						"aria-selected": tab === value,
						onClick: () => setTab(value),
						className: `rounded-md px-3 py-2 text-sm ${tab === value ? "bg-secondary text-foreground" : "text-muted-foreground"}`,
						children: t(`society.companion.${value}`)
					}, value))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-h-0 overflow-y-auto",
					children: tab === "character" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterEditor, {
						value: recipe,
						onChange: setRecipe,
						disabled: saving || sample
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanionEditor, {
						value: resolveCompanion(agent.agentId, recipe.companion),
						onChange: (companion) => setRecipe((r) => ({
							...r,
							companion
						})),
						disabled: saving || sample,
						lead: agent.tier === "lead",
						agentId: agent.agentId
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "flex shrink-0 flex-wrap justify-end gap-2 border-t border-border p-4",
					children: [error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "w-full text-sm text-destructive",
						children: t("society.profile_card.save_error")
					}), discard ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mr-auto text-sm",
							role: "alert",
							children: t("society.profile_card.unsaved")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => setDiscard(false),
							children: t("society.profile_card.keep_editing")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: onClose,
							children: t("society.profile_card.discard")
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: close,
						disabled: saving,
						children: t("society.card.close")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => void save(),
						disabled: !dirty || saving || sample,
						children: t(saving ? "society.card.saving" : "society.card.save")
					})] })]
				})
			]
		})] })
	});
}
export { AgentAppearanceDialog };
