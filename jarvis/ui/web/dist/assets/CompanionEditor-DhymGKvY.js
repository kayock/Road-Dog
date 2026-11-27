const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/CompanionPreview-DeLy23mS.js","assets/index-BOzhgzD7.js","assets/index-CA6QM4ps.css","assets/extends-rAidceeD.js","assets/Gltf-CGnHGMSX.js","assets/react-three-fiber.esm-Dp0xg4g-.js","assets/three.module-CsntsSp5.js","assets/AgentFollower-D67i_Nkd.js","assets/appearance-CnI1Xhkn.js","assets/useCanvasAwake-5sZXDaXU.js"])))=>i.map(i=>d[i]);
import { t as Check } from "./check-vbwKkbPq.js";
import { t as ImageUp } from "./image-up-JXfip9X_.js";
import { t as Lock } from "./lock-ByyvnTXx.js";
import { t as Save } from "./save-muG05xK1.js";
import { t as Shuffle } from "./shuffle-DXk0Yi_k.js";
import { Bc as require_jsx_runtime, Dc as useMutation, Ei as Minus, Oc as useQuery, Wi as Copy, Xc as require_react, Yt as PetSprite, bi as Plus, cc as __vitePreload, ga as usePets, mi as Sparkles, na as createLucideIcon, oc as useT, si as X, tl as __toESM, zc as useQueryClient } from "./index-BOzhgzD7.js";
import "./petStage-CMRGLgJ7.js";
import { t as Switch } from "./switch-hmH-TV55.js";
import { c as SKIN_PRESETS, d as parseDesignImport, f as sameSkin, g as skinFromImage, m as skinCss, n as COMPANION_SHAPES, o as SKIN_EFFECTS, p as skinBlend, s as SKIN_PATTERNS, t as COMPANION_COLORS, u as encodeDesignCode, w as randomAccessories, x as OFFERED_SLOTS, y as ACCESSORY_IDS_BY_SLOT } from "./appearance-CnI1Xhkn.js";
import { n as AgentSymbol, t as CompanionMark } from "./CompanionMark-BvabJfVP.js";
import { n as agentSubject, r as fetchProgression } from "./progressionApi-DG7iMoRa.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Import = createLucideIcon("Import", [
	["path", {
		d: "M12 3v12",
		key: "1x0j5s"
	}],
	["path", {
		d: "m8 11 4 4 4-4",
		key: "1dohi6"
	}],
	["path", {
		d: "M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4",
		key: "1ywtjm"
	}]
]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function lookOpen(looks, id) {
	const at = looks.unlocks?.[id];
	return at === void 0 || looks.level >= at;
}
function nextLook(looks) {
	if (!looks.unlocks) return void 0;
	return Object.entries(looks.unlocks).filter(([, at]) => at > looks.level).sort((a, b) => a[1] - b[1]).map(([id, level]) => ({
		id,
		level
	}))[0];
}
function useAgentLooks(agentId) {
	const snapshot = useQuery({
		queryKey: ["progression", "looks"],
		enabled: !!agentId,
		staleTime: 6e4,
		retry: false,
		queryFn: () => fetchProgression()
	});
	if (!agentId || !snapshot.data || Object.keys(snapshot.data.looks).length === 0) return {
		level: 1,
		unlocks: null
	};
	return {
		level: snapshot.data.subjects.find((row) => row.subjectId === agentSubject(agentId))?.level ?? 1,
		unlocks: snapshot.data.looks
	};
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var PICKER_SLOTS = [
	"outfit",
	"head",
	"face",
	"mouth",
	"neck",
	"back",
	"held"
].filter((slot) => OFFERED_SLOTS.includes(slot));
function AccessoryPicker({ value, onChange, agentId }) {
	const t = useT();
	const [slot, setSlot] = (0, import_react.useState)(PICKER_SLOTS[0] ?? "head");
	const looks = useAgentLooks(agentId);
	const worn = value.accessories;
	const wearable = (id) => lookOpen(looks, id) || Object.values(worn).includes(id);
	const upcoming = nextLook(looks);
	const choose = (id) => {
		const next = { ...worn };
		if (id) next[slot] = id;
		else delete next[slot];
		onChange(next);
	};
	const surprise = () => {
		const rolled = randomAccessories();
		onChange(Object.fromEntries(Object.entries(rolled).filter(([, id]) => id && wearable(id))));
	};
	const tile$1 = "relative grid h-[76px] w-[76px] place-items-center rounded-lg border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": "accessory-picker",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium",
					children: t("society.companion.accessories")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: surprise,
						className: "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, { size: 14 }), t("society.companion.randomize")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: !Object.keys(worn).length,
						onClick: () => onChange({}),
						className: "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground disabled:opacity-40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 }), t("society.companion.remove_all")]
					})]
				})]
			}),
			looks.unlocks && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-3 flex items-center gap-1.5 rounded-lg bg-secondary/60 px-3 py-2 text-xs text-muted-foreground",
				"data-testid": "look-progress",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
					size: 14,
					className: "shrink-0 text-primary",
					"aria-hidden": true
				}), upcoming ? t("society.companion.next_look").replace("{0}", String(looks.level)).replace("{1}", t(`society.companion.items.${upcoming.id}`)).replace("{2}", String(upcoming.level)) : t("society.companion.all_looks_open")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 flex flex-wrap gap-1.5",
				role: "tablist",
				"aria-label": t("society.companion.accessories"),
				children: PICKER_SLOTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "tab",
					"aria-selected": slot === s,
					onClick: () => setSlot(s),
					className: `relative rounded-full border px-2.5 py-1 text-xs ${slot === s ? "border-transparent bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:bg-secondary"}`,
					children: [t(`society.companion.slots.${s}`), worn[s] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current align-middle"
					})]
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				role: "group",
				"aria-label": t(`society.companion.slots.${slot}`),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": !worn[slot],
					"aria-label": t("society.companion.none"),
					title: t("society.companion.none"),
					onClick: () => choose(void 0),
					className: `${tile$1} text-xs text-muted-foreground ${!worn[slot] ? "border-foreground bg-secondary" : "border-border hover:bg-secondary"}`,
					children: t("society.companion.none")
				}), [...ACCESSORY_IDS_BY_SLOT[slot]].sort((a, b) => (looks.unlocks?.[a] ?? 0) - (looks.unlocks?.[b] ?? 0)).map((id) => {
					const name = t(`society.companion.items.${id}`);
					const active = worn[slot] === id;
					const open = wearable(id);
					const at = looks.unlocks?.[id];
					const label = open ? name : `${name} · ${t("society.companion.unlocks_at").replace("{0}", String(at))}`;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-pressed": active,
						"aria-label": label,
						title: label,
						disabled: !open,
						onClick: () => choose(id),
						"data-locked": open ? void 0 : "true",
						className: `${tile$1} ${active ? "border-foreground bg-secondary" : open ? "border-border hover:bg-secondary" : "cursor-not-allowed border-dashed border-border"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: open ? void 0 : "opacity-35 grayscale",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentSymbol, {
								shape: value.shape,
								color: value.color,
								eyes: value.eyes,
								skin: value.skin,
								accessories: {
									...worn,
									[slot]: id
								},
								size: 60
							})
						}), !open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "absolute bottom-1 left-1/2 inline-flex -translate-x-1/2 items-center gap-0.5 rounded-full bg-background/90 px-1.5 py-0.5 text-[10px] font-semibold text-foreground shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
								size: 9,
								"aria-hidden": true
							}), t("society.level.lv").replace("{0}", String(at))]
						})]
					}, id);
				})]
			})
		]
	});
}
var DESIGNS_KEY = ["society", "designs"];
async function fetchDesigns() {
	const res = await fetch("/api/society/designs", { cache: "no-store" });
	if (res.status === 404) return [];
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return (await res.json()).designs;
}
var chip = (on) => `rounded-full border px-2.5 py-1 text-xs ${on ? "border-transparent bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:bg-secondary"}`;
var tile = (on) => `relative aspect-square w-full rounded-full border border-border ring-offset-2 ring-offset-popover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${on ? "ring-2 ring-foreground" : ""}`;
function shade(color, amount) {
	const n = parseInt(color.slice(1), 16);
	const mix = (v) => Math.round(amount > 0 ? v + (255 - v) * amount : v * (1 + amount));
	return `#${[
		n >> 16 & 255,
		n >> 8 & 255,
		n & 255
	].map((v) => mix(v).toString(16).padStart(2, "0")).join("")}`;
}
function DesignPicker({ skin, color, onChange }) {
	const t = useT();
	const client = useQueryClient();
	const designs = useQuery({
		queryKey: DESIGNS_KEY,
		queryFn: fetchDesigns,
		staleTime: 6e4,
		retry: false
	});
	const [importing, setImporting] = (0, import_react.useState)(false);
	const [pasted, setPasted] = (0, import_react.useState)("");
	const [notice, setNotice] = (0, import_react.useState)("");
	const file = (0, import_react.useRef)(null);
	const wear = (next) => {
		setNotice("");
		onChange(next, next ? skinBlend(next.colors) : color);
	};
	const edit = (patch) => skin && wear({
		...skin,
		...patch
	});
	const save = useMutation({
		mutationFn: async (design) => {
			const res = await fetch("/api/society/designs", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(design)
			});
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			return await res.json();
		},
		onSuccess: () => {
			setNotice("saved");
			client.invalidateQueries({ queryKey: DESIGNS_KEY });
		},
		onError: () => setNotice("save_error")
	});
	const remove = useMutation({
		mutationFn: async (id) => {
			const res = await fetch(`/api/society/designs/${encodeURIComponent(id)}`, { method: "DELETE" });
			if (!res.ok && res.status !== 404) throw new Error(`HTTP ${res.status}`);
		},
		onSettled: () => void client.invalidateQueries({ queryKey: DESIGNS_KEY })
	});
	const applyImport = () => {
		const found = parseDesignImport(pasted);
		if (!found) {
			setNotice("import_error");
			return;
		}
		wear(found);
		setImporting(false);
		setPasted("");
	};
	const fromPicture = async (picked) => {
		if (!picked) return;
		try {
			const found = await skinFromImage(picked);
			if (found) wear({
				...found,
				name: picked.name.replace(/\.[^.]+$/, "").slice(0, 40)
			});
			else setNotice("image_error");
		} catch {
			setNotice("image_error");
		} finally {
			if (file.current) file.current.value = "";
		}
	};
	const copyCode = async () => {
		if (!skin) return;
		try {
			await navigator.clipboard.writeText(encodeDesignCode(skin));
			setNotice("copied");
		} catch {
			setImporting(true);
			setPasted(encodeDesignCode(skin));
		}
	};
	const saved = designs.data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		"data-testid": "design-picker",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-sm font-medium",
				children: t("society.companion.design.title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-xs text-muted-foreground",
				children: t("society.companion.design.hint")
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid w-full grid-cols-10 items-center gap-2",
				role: "group",
				"aria-label": t("society.companion.design.title"),
				children: [SKIN_PRESETS.map((preset) => {
					const label = t(`society.companion.design.presets.${preset.id}`);
					const look = {
						...preset.skin,
						name: label
					};
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						title: label,
						"aria-label": label,
						"aria-pressed": sameSkin(skin, look),
						onClick: () => wear(look),
						className: tile(sameSkin(skin, look)),
						style: { background: skinCss(look) }
					}, preset.id);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					title: t("society.companion.design.create"),
					"aria-label": t("society.companion.design.create"),
					onClick: () => wear({
						colors: [
							shade(color, .45),
							color,
							shade(color, -.45)
						],
						pattern: "linear",
						angle: 160,
						effect: "none",
						name: ""
					}),
					className: `${tile(false)} grid place-items-center bg-background text-muted-foreground hover:bg-secondary`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 })
				})]
			}),
			saved.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-1.5 block text-xs text-muted-foreground",
				children: t("society.companion.design.mine")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid w-full grid-cols-10 items-center gap-2",
				children: saved.map((design) => {
					const label = design.skin.name || t("society.companion.design.custom");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							title: label,
							"aria-label": label,
							"aria-pressed": sameSkin(skin, design.skin),
							onClick: () => wear(design.skin),
							className: tile(sameSkin(skin, design.skin)),
							style: { background: skinCss(design.skin) }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": t("society.companion.design.delete").replace("{0}", label),
							onClick: () => remove.mutate(design.id),
							className: "absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full border border-border bg-popover text-muted-foreground opacity-0 transition-opacity hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 10 })
						})]
					}, design.id);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: chip(importing),
						"aria-pressed": importing,
						onClick: () => {
							setImporting((v) => !v);
							setNotice("");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Import, {
							size: 12,
							className: "mr-1 inline"
						}), t("society.companion.design.import")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: chip(false),
						onClick: () => file.current?.click(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUp, {
							size: 12,
							className: "mr-1 inline"
						}), t("society.companion.design.from_image")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: file,
						type: "file",
						accept: "image/*",
						className: "hidden",
						"aria-hidden": true,
						tabIndex: -1,
						onChange: (e) => void fromPicture(e.target.files?.[0])
					}),
					skin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: chip(false),
						onClick: () => wear(void 0),
						children: t("society.companion.design.plain")
					})
				]
			}),
			importing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: pasted,
					onChange: (e) => setPasted(e.target.value),
					rows: 2,
					spellCheck: false,
					placeholder: t("society.companion.design.import_hint"),
					"aria-label": t("society.companion.design.import"),
					className: "w-full resize-none rounded-md border border-border bg-background px-2.5 py-1.5 font-mono text-xs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: chip(true),
						disabled: !pasted.trim(),
						onClick: applyImport,
						children: t("society.companion.design.import_apply")
					})
				})]
			}),
			skin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 rounded-lg border border-border p-3",
				"data-testid": "design-editor",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("society.companion.design.colors") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [
								skin.colors.map((stop, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "color",
									value: stop,
									"aria-label": `${t("society.companion.design.colors")} ${index + 1}`,
									onChange: (e) => edit({ colors: skin.colors.map((c, i) => i === index ? e.target.value : c) }),
									className: "h-8 w-9 rounded border border-border bg-background"
								}, index)),
								skin.colors.length > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": t("society.companion.design.remove_color"),
									onClick: () => edit({ colors: skin.colors.slice(0, -1) }),
									className: "grid h-8 w-8 place-items-center rounded border border-border hover:bg-secondary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 14 })
								}),
								skin.colors.length < 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": t("society.companion.design.add_color"),
									onClick: () => edit({ colors: [...skin.colors, skin.colors[skin.colors.length - 1]] }),
									className: "grid h-8 w-8 place-items-center rounded border border-border hover:bg-secondary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 })
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("society.companion.design.pattern") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1.5",
							role: "group",
							"aria-label": t("society.companion.design.pattern"),
							children: SKIN_PATTERNS.map((pattern) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": skin.pattern === pattern,
								onClick: () => edit({ pattern }),
								className: chip(skin.pattern === pattern),
								children: t(`society.companion.design.pattern_${pattern}`)
							}, pattern))
						})]
					}),
					skin.pattern === "linear" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center justify-between gap-3 text-sm",
						children: [t("society.companion.design.angle"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: 359,
							step: 1,
							value: skin.angle,
							onChange: (e) => edit({ angle: Number(e.target.value) }),
							className: "w-40 accent-primary"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("society.companion.design.effect") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1.5",
							role: "group",
							"aria-label": t("society.companion.design.effect"),
							children: SKIN_EFFECTS.map((effect) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": skin.effect === effect,
								onClick: () => edit({ effect }),
								className: chip(skin.effect === effect),
								children: t(`society.companion.design.effects.${effect}`)
							}, effect))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: skin.name,
								maxLength: 40,
								onChange: (e) => edit({ name: e.target.value.replace(/[\p{Cc}]/gu, "") }),
								placeholder: t("society.companion.design.name_placeholder"),
								"aria-label": t("society.companion.design.name"),
								className: "h-8 min-w-0 flex-1 rounded-md border border-border bg-background px-2.5 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: chip(false),
								disabled: save.isPending,
								onClick: () => save.mutate(skin),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
									size: 12,
									className: "mr-1 inline"
								}), t("society.companion.design.save")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: chip(false),
								onClick: () => void copyCode(),
								children: [notice === "copied" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									size: 12,
									className: "mr-1 inline"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									size: 12,
									className: "mr-1 inline"
								}), t(notice === "copied" ? "society.companion.design.copied" : "society.companion.design.copy_code")]
							})
						]
					})
				]
			}),
			notice && notice !== "copied" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: notice.endsWith("error") ? "alert" : "status",
				className: `text-xs ${notice.endsWith("error") ? "text-destructive" : "text-muted-foreground"}`,
				children: t(`society.companion.design.${notice}`)
			})
		]
	});
}
var gigi_companion_avatar_default = "/assets/gigi-companion-avatar-B8TFq57G.png";
var CompanionPreview = (0, import_react.lazy)(() => __vitePreload(() => import("./CompanionPreview-DeLy23mS.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9])).then((m) => ({ default: m.CompanionPreview })));
function CompanionEditor({ value, onChange, disabled = false, lead = false, preview3d = true, agentId }) {
	const t = useT();
	const update = (patch) => onChange({
		...value,
		..."color" in patch && !("skin" in patch) ? { skin: void 0 } : {},
		...patch
	});
	const petsQuery = usePets();
	const pets = petsQuery.data?.pets ?? [];
	const [kind, setKind] = (0, import_react.useState)(value.pet ? "pet" : "shape");
	const choose = (next) => {
		setKind(next);
		if (next === "shape" && value.pet) update({ pet: void 0 });
		if (next === "pet" && !value.pet && pets[0]) update({ pet: pets[0].id });
	};
	const firstPet = pets[0]?.id;
	(0, import_react.useEffect)(() => {
		if (kind === "pet" && !value.pet && firstPet) onChange({
			...value,
			pet: firstPet
		});
	}, [
		kind,
		value,
		firstPet,
		onChange
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
		disabled,
		className: "flex min-w-0 flex-col gap-5 p-4",
		"data-testid": "companion-editor",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-5 rounded-xl bg-secondary/50 p-5",
				children: [lead ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: gigi_companion_avatar_default,
					width: 88,
					height: 88,
					alt: ""
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanionMark, {
					appearance: value,
					size: 88
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-medium",
					children: t("society.companion.title")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: t("society.companion.hint")
				})] })]
			}),
			preview3d && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanionPreview, {
					appearance: value,
					lead
				})
			}),
			!lead && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("society.companion.look") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1.5",
					role: "group",
					"aria-label": t("society.companion.look"),
					children: ["shape", "pet"].map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": kind === option,
						onClick: () => choose(option),
						className: `rounded-full border px-2.5 py-1 text-xs ${kind === option ? "border-transparent bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:bg-secondary"}`,
						children: t(`society.companion.look_${option}`)
					}, option))
				})]
			}),
			!lead && kind === "pet" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-testid": "companion-pet-picker",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1 block text-sm font-medium",
						children: t("society.companion.pet")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs text-muted-foreground",
						children: pets.length || petsQuery.isLoading ? t("society.companion.pet_hint") : t("society.companion.no_pets")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: pets.map((pet) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							title: pet.name,
							"aria-label": pet.name,
							"aria-pressed": value.pet === pet.id,
							onClick: () => update({ pet: pet.id }),
							className: `grid h-14 w-14 place-items-center rounded-lg border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${value.pet === pet.id ? "border-foreground bg-secondary" : "border-border hover:bg-secondary"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetSprite, {
								pet,
								state: value.pet === pet.id ? "success" : "idle",
								px: 44
							})
						}, pet.id))
					})
				]
			}),
			!lead && kind === "shape" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-2 block text-sm font-medium",
					children: t("society.companion.shape")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: COMPANION_SHAPES.map((shape) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": t(`society.companion.shapes.${shape}`),
						"aria-pressed": value.shape === shape,
						onClick: () => update({ shape }),
						className: `grid h-12 w-12 place-items-center rounded-lg border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${value.shape === shape ? "border-foreground bg-secondary" : "border-border hover:bg-secondary"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentSymbol, {
							shape,
							color: value.color,
							eyes: value.eyes,
							accessories: value.accessories,
							skin: value.skin,
							size: 36
						})
					}, shape))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("society.companion.eyes") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1.5",
						role: "group",
						"aria-label": t("society.companion.eyes"),
						children: ["dots", "lines"].map((eyes) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": value.eyes === eyes,
							onClick: () => update({ eyes }),
							className: `rounded-full border px-2.5 py-1 text-xs ${value.eyes === eyes ? "border-transparent bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:bg-secondary"}`,
							children: t(`society.companion.${eyes}`)
						}, eyes))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessoryPicker, {
					value,
					onChange: (accessories) => update({ accessories }),
					agentId
				})
			] }),
			!lead && kind === "shape" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-2 block text-sm font-medium",
				children: t("society.companion.color")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid w-full grid-cols-12 items-center gap-2",
				children: [COMPANION_COLORS.map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": `${t("society.companion.color")} ${color}`,
					"aria-pressed": value.color === color,
					onClick: () => update({ color }),
					className: `aspect-square w-full rounded-full border border-border ring-offset-2 ring-offset-popover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${value.color === color ? "ring-2 ring-foreground" : ""}`,
					style: { background: color }
				}, color)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "color",
					"aria-label": t("society.companion.custom_color"),
					value: value.color,
					onChange: (e) => update({ color: e.target.value }),
					className: "aspect-square h-auto w-full rounded border border-border bg-background"
				})]
			})] }),
			!lead && kind === "shape" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesignPicker, {
				skin: value.skin,
				color: value.color,
				onChange: (skin, color) => update({
					skin,
					color
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center justify-between gap-3 text-sm",
				children: [t("society.companion.visible"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: value.enabled,
					onCheckedChange: (enabled) => update({ enabled }),
					"aria-label": t("society.companion.visible")
				})]
			})
		]
	});
}
export { CompanionEditor };
