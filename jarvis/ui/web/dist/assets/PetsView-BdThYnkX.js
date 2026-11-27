import { t as Check } from "./check-vbwKkbPq.js";
import { t as EyeOff } from "./eye-off-DCMC9NUY.js";
import { t as FileJson } from "./file-json-sGKKbS0x.js";
import { t as ImageUp } from "./image-up-JXfip9X_.js";
import { t as PawPrint } from "./paw-print-2IImm041.js";
import { t as SlidersHorizontal } from "./sliders-horizontal-Bjpys59J.js";
import { Bc as require_jsx_runtime, Bi as Eye, Ca as previewPetScale, Cn as Portal, Da as PET_STATES, Ea as NO_PET_ID, Ln as cn, Sn as Overlay, Ta as MAX_FRAMES_PER_STATE, Tn as Title, Ui as Download, Ws as useRestartApp, Xc as require_react, Xt as integerScaleFor, Yt as PetSprite, Zt as useReducedMotion, _a as useSavePetSettings, ba as PET_TEMPLATE_URL, bi as Plus, bn as Content, c as PetControlStripPreview, f as useOverlayStyle, ga as usePets, ji as LoaderCircle, ln as Button, ma as useDeletePet, oc as useT, pa as useCreatePet, si as X, tl as __toESM, ui as Trash2, va as useSelectPet, wa as FRAME_SIZES, wc as useEventStore, wn as Root, xa as PetsRequestError, xn as Description, ya as useSetPetVisible, yn as Close } from "./index-BOzhgzD7.js";
import { u as useKeybinds } from "./useHotkey-DslvxXH_.js";
import { t as Switch } from "./switch-hmH-TV55.js";
import { i as formatCombo, r as KeybindRow } from "./KeybindRow-CsBDhzH4.js";
import { t as Input } from "./input-DXuNAC9g.js";
import { t as PageHeader } from "./PageHeader-DcwsywY0.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var MAX_NAME = 40;
var MAX_DESCRIPTION = 140;
var MAX_SHEET_BYTES = 2 * 1024 * 1024;
var DEFAULT_FRAME_SIZE = 48;
function fieldForDetail(detail) {
	const text = detail.toLowerCase();
	if (text.includes("manifest") || text.includes("pet.json")) return "manifest";
	if (text.includes("description")) return "description";
	if (/\bname\b/.test(text)) return "name";
	return "sheet";
}
function isPng(file) {
	return file.type === "image/png" || file.name.toLowerCase().endsWith(".png");
}
function isJson(file) {
	return file.type === "application/json" || file.name.toLowerCase().endsWith(".json");
}
function CreatePetDialog({ open, onOpenChange, onCreated }) {
	const t = useT();
	const create = useCreatePet();
	const formId = (0, import_react.useId)();
	const sheetInput = (0, import_react.useRef)(null);
	const manifestInput = (0, import_react.useRef)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [sheet, setSheet] = (0, import_react.useState)(null);
	const [sheetUrl, setSheetUrl] = (0, import_react.useState)(null);
	const [frameSize, setFrameSize] = (0, import_react.useState)(DEFAULT_FRAME_SIZE);
	const [manifest, setManifest] = (0, import_react.useState)(null);
	const [errors, setErrors] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setName("");
		setDescription("");
		setSheet(null);
		setFrameSize(DEFAULT_FRAME_SIZE);
		setManifest(null);
		setErrors({});
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (!sheet) {
			setSheetUrl(null);
			return;
		}
		const url = URL.createObjectURL(sheet);
		setSheetUrl(url);
		return () => URL.revokeObjectURL(url);
	}, [sheet]);
	function pickSheet(file) {
		if (!file) return;
		if (!isPng(file)) {
			setErrors((e) => ({
				...e,
				sheet: t("pets.create_dialog.error_not_png")
			}));
			return;
		}
		if (file.size > MAX_SHEET_BYTES) {
			setErrors((e) => ({
				...e,
				sheet: t("pets.create_dialog.error_too_big")
			}));
			return;
		}
		setErrors((e) => ({
			...e,
			sheet: void 0
		}));
		setSheet(file);
	}
	function pickManifest(file) {
		if (!file) return;
		if (!isJson(file)) {
			setErrors((e) => ({
				...e,
				manifest: t("pets.create_dialog.error_manifest")
			}));
			return;
		}
		setErrors((e) => ({
			...e,
			manifest: void 0
		}));
		setManifest(file);
	}
	async function submit(event) {
		event.preventDefault();
		const trimmed = name.trim();
		const next = {};
		if (!trimmed) next.name = t("pets.create_dialog.error_name");
		if (!sheet) next.sheet = t("pets.create_dialog.error_no_sheet");
		if (next.name || next.sheet) {
			setErrors(next);
			return;
		}
		setErrors({});
		try {
			const manifestText = manifest ? await manifest.text() : null;
			onCreated(await create.mutateAsync({
				sheet,
				name: trimmed,
				description: description.trim(),
				frameSize,
				manifest: manifestText
			}));
			onOpenChange(false);
		} catch (error) {
			const message = error.message;
			if (error instanceof PetsRequestError && error.status === 400) setErrors({ [fieldForDetail(message)]: message });
			else setErrors({ sheet: message });
		}
	}
	const busy = create.isPending;
	const errorId = (field) => `${formId}-${field}-error`;
	const fieldError = (field) => errors[field] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		id: errorId(field),
		role: "alert",
		className: "mt-1.5 text-sm text-destructive",
		children: errors[field]
	}) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		open,
		onOpenChange: (next) => !busy && onOpenChange(next),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 z-[80] bg-scrim/75 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
			"data-testid": "create-pet-dialog",
			className: "fixed inset-0 z-[80] m-auto flex h-fit max-h-[min(90dvh,760px)] w-[min(560px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-float outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 motion-reduce:animate-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-4 border-b border-border px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
							className: "text-lg font-semibold text-foreground-strong",
							children: t("pets.create_dialog.title")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
							className: "mt-0.5 text-sm text-muted-foreground",
							children: t("pets.create_dialog.description")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
						disabled: busy,
						"aria-label": t("common.close"),
						className: "grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							className: "h-4 w-4",
							"aria-hidden": true
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					id: formId,
					noValidate: true,
					onSubmit: (event) => void submit(event),
					className: "min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-5 scrollbar-jarvis",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: `${formId}-name`,
									className: "text-sm font-medium text-foreground",
									children: t("pets.create_dialog.name_label")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-foreground-faint",
									children: `${name.length}/${MAX_NAME}`
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: `${formId}-name`,
								"data-testid": "create-pet-name",
								className: "mt-1.5",
								value: name,
								maxLength: MAX_NAME,
								placeholder: t("pets.create_dialog.name_placeholder"),
								"aria-invalid": errors.name ? true : void 0,
								"aria-describedby": errors.name ? errorId("name") : void 0,
								onChange: (event) => setName(event.target.value)
							}),
							fieldError("name")
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: `${formId}-description`,
									className: "text-sm font-medium text-foreground",
									children: t("pets.create_dialog.description_label")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-foreground-faint",
									children: `${description.length}/${MAX_DESCRIPTION}`
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: `${formId}-description`,
								"data-testid": "create-pet-description",
								className: "mt-1.5",
								value: description,
								maxLength: MAX_DESCRIPTION,
								placeholder: t("pets.create_dialog.description_placeholder"),
								"aria-invalid": errors.description ? true : void 0,
								"aria-describedby": errors.description ? errorId("description") : void 0,
								onChange: (event) => setDescription(event.target.value)
							}),
							fieldError("description")
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-foreground",
								children: t("pets.create_dialog.sheet_label")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1.5 flex items-center gap-4 rounded-lg border border-dashed border-border-strong p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-md bg-secondary",
									children: sheetUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: sheetUrl,
										alt: t("pets.create_dialog.sheet_preview_alt"),
										className: "max-h-full max-w-full object-contain [image-rendering:pixelated]"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUp, {
										className: "h-6 w-6 text-muted-foreground",
										"aria-hidden": true
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										sheet && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-medium text-foreground",
											children: sheet.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: t("pets.create_dialog.sheet_hint")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											variant: "outline",
											size: "sm",
											className: "mt-2",
											onClick: () => sheetInput.current?.click(),
											children: sheet ? t("pets.create_dialog.sheet_change") : t("pets.create_dialog.sheet_choose")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											ref: sheetInput,
											type: "file",
											accept: "image/png",
											className: "sr-only",
											tabIndex: -1,
											"data-testid": "create-pet-sheet",
											"aria-label": t("pets.create_dialog.sheet_label"),
											onChange: (event) => {
												pickSheet(event.target.files?.[0]);
												event.target.value = "";
											}
										})
									]
								})]
							}),
							fieldError("sheet")
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							id: `${formId}-frame`,
							className: "text-sm font-medium text-foreground",
							children: t("pets.create_dialog.frame_size_label")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							role: "radiogroup",
							"aria-labelledby": `${formId}-frame`,
							className: "mt-1.5 inline-flex rounded-lg border border-border bg-background p-0.5",
							children: FRAME_SIZES.map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								role: "radio",
								"aria-checked": frameSize === size,
								"data-testid": `create-pet-frame-${size}`,
								onClick: () => setFrameSize(size),
								className: cn("rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", frameSize === size ? "bg-secondary text-foreground-strong" : "text-muted-foreground hover:text-foreground"),
								children: t("pets.create_dialog.frame_size_option").replaceAll("{0}", String(size))
							}, size))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-secondary/60 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-foreground",
										children: t("pets.create_dialog.layout_title")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: PET_TEMPLATE_URL,
										download: "pet-template.png",
										"data-testid": "create-pet-template",
										className: "inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
											className: "h-3.5 w-3.5",
											"aria-hidden": true
										}), t("pets.create_dialog.template_download")]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: t("pets.create_dialog.layout_body").replace("{0}", String(8))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
									className: "mt-3 flex flex-wrap gap-1.5",
									"data-testid": "create-pet-rows",
									children: PET_STATES.map((state, row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-foreground-faint",
											children: row + 1
										}), t(`pets.states.${state}`)]
									}, state))
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-foreground",
								children: t("pets.create_dialog.manifest_label")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-xs text-muted-foreground",
								children: t("pets.create_dialog.manifest_hint")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap items-center gap-2",
								children: [manifest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex min-w-0 items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-sm text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileJson, {
										className: "h-3.5 w-3.5 shrink-0 text-muted-foreground",
										"aria-hidden": true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: manifest.name
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: () => setManifest(null),
									children: t("pets.create_dialog.manifest_remove")
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => manifestInput.current?.click(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileJson, { "aria-hidden": true }), t("pets.create_dialog.manifest_choose")]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: manifestInput,
									type: "file",
									accept: ".json,application/json",
									className: "sr-only",
									tabIndex: -1,
									"data-testid": "create-pet-manifest",
									"aria-label": t("pets.create_dialog.manifest_label"),
									onChange: (event) => {
										pickManifest(event.target.files?.[0]);
										event.target.value = "";
									}
								})]
							}),
							fieldError("manifest")
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end gap-2 border-t border-border px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						disabled: busy,
						onClick: () => onOpenChange(false),
						children: t("common.cancel")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						form: formId,
						disabled: busy,
						"data-testid": "create-pet-submit",
						children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							className: "animate-spin",
							"aria-hidden": true
						}), busy ? t("pets.create_dialog.creating") : t("pets.create_dialog.create")]
					})]
				})
			]
		})] })
	});
}
var STATE_CYCLE_MS = 2500;
var HERO_SPRITE_PX = 168;
var TILE_SPRITE_PX = 96;
var SCALE_MIN = .5;
var SCALE_MAX = 2;
var SCALE_STEP = .01;
function useStateCycle(enabled) {
	const [index, setIndex] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!enabled) {
			setIndex(0);
			return;
		}
		const timer = window.setInterval(() => setIndex((current) => (current + 1) % PET_STATES.length), STATE_CYCLE_MS);
		return () => window.clearInterval(timer);
	}, [enabled]);
	return index;
}
function PetsView() {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const pets = usePets();
	const overlay = useOverlayStyle();
	const keybinds = useKeybinds();
	const select = useSelectPet();
	const setVisible = useSetPetVisible();
	const remove = useDeletePet();
	const restartApp = useRestartApp();
	const [customizeOpen, setCustomizeOpen] = (0, import_react.useState)(false);
	const [createOpen, setCreateOpen] = (0, import_react.useState)(false);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const [switchingStyle, setSwitchingStyle] = (0, import_react.useState)(false);
	const [needsRestart, setNeedsRestart] = (0, import_react.useState)(false);
	const data = pets.data;
	const activePet = data && data.active !== "none" ? data.pets.find((pet) => pet.id === data.active) ?? null : null;
	const styleIsPet = overlay.config?.style === "pet";
	const shortcut = keybinds.config?.keybinds?.pet_toggle ?? "";
	const describe = (pet) => {
		const key = `pets.builtin.${pet.id}.description`;
		const localized = pet.builtin ? t(key) : key;
		return localized !== key ? localized : pet.description;
	};
	async function setPetEnabled(enabled) {
		setSwitchingStyle(true);
		try {
			if ((await overlay.saveStyle(enabled ? "pet" : "jarvis_bar")).applied_live) pushToast("success", t(enabled ? "pets.style_saved" : "pets.style_off_saved"));
			else setNeedsRestart(true);
		} catch (error) {
			pushToast("error", error.message);
		} finally {
			setSwitchingStyle(false);
		}
	}
	function choose(petId) {
		if (!data || data.active === petId || select.isPending) return;
		select.mutate(petId, { onError: (error) => pushToast("error", t("pets.save_error").replace("{0}", error.message)) });
	}
	function toggleVisible() {
		if (!data) return;
		setVisible.mutate(!data.visible, { onError: (error) => pushToast("error", t("pets.save_error").replace("{0}", error.message)) });
	}
	function confirmDelete() {
		const pet = pendingDelete;
		if (!pet) return;
		remove.mutate(pet.id, {
			onSuccess: () => pushToast("success", t("pets.deleted").replace("{0}", pet.name)),
			onError: (error) => pushToast("error", t("pets.save_error").replace("{0}", error.message)),
			onSettled: () => setPendingDelete(null)
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": "pets-view",
		className: "flex h-full flex-col overflow-y-auto bg-background px-8 pb-10 scrollbar-jarvis",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-[1400px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PawPrint, {}),
						title: t("pets.title"),
						description: shortcut ? t("pets.subtitle").replace("{0}", formatCombo(shortcut)) : t("pets.subtitle_no_shortcut"),
						actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [styleIsPet && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								"data-testid": "pets-visibility",
								disabled: !data || setVisible.isPending,
								onClick: toggleVisible,
								children: [data?.visible === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { "aria-hidden": true }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { "aria-hidden": true }), data?.visible === false ? t("pets.show") : t("pets.hide")]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium text-foreground",
									children: t("pets.enabled_label")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									"data-testid": "pets-enabled",
									checked: styleIsPet,
									disabled: !overlay.config || switchingStyle,
									"aria-label": t("pets.enabled_label"),
									onCheckedChange: (next) => void setPetEnabled(next)
								})]
							})]
						})
					}),
					overlay.config && !styleIsPet && !needsRestart && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-testid": "pets-style-notice",
						className: "mb-5 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PawPrint, {
								className: "h-6 w-6 shrink-0 text-accent",
								"aria-hidden": true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-base font-medium text-foreground",
									children: t("pets.style_notice_title")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-sm text-muted-foreground",
									children: t("pets.style_notice_body").replace("{0}", t(`settings_view.overlay_style.options.${overlay.config.style}`))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								"data-testid": "pets-use-pet",
								disabled: switchingStyle,
								onClick: () => void setPetEnabled(true),
								children: [switchingStyle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									className: "animate-spin",
									"aria-hidden": true
								}), t("pets.use_pet")]
							})
						]
					}),
					needsRestart && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-testid": "pets-restart-notice",
						className: "mb-5 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "min-w-0 flex-1 text-base text-foreground",
							children: t("pets.restart_hint")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							"data-testid": "pets-restart",
							disabled: restartApp.restarting,
							onClick: () => void restartApp.restart(),
							children: [restartApp.restarting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								className: "animate-spin",
								"aria-hidden": true
							}), restartApp.buttonLabel]
						})]
					}),
					pets.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-5",
						role: "alert",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base text-destructive",
							children: t("pets.load_error").replace("{0}", pets.error.message)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							className: "mt-3",
							onClick: () => void pets.refetch(),
							children: t("common.retry")
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivePetCard, {
							pet: activePet,
							loading: !data,
							description: activePet ? describe(activePet) : t("pets.none_description"),
							customizeOpen,
							onToggleCustomize: () => setCustomizeOpen((open) => !open),
							children: customizeOpen && data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomizePanel, {
								scale: data.scale,
								bubble: data.bubble,
								stripAlways: data.strip_always,
								keybinds
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 mt-8 flex items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-semibold text-foreground-strong",
								children: t("pets.my_pets")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								"data-testid": "pets-create",
								disabled: !data,
								onClick: () => setCreateOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { "aria-hidden": true }), t("pets.create")]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							"data-testid": "pets-grid",
							className: "grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]",
							children: !data ? [
								0,
								1,
								2,
								3
							].map((index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								"aria-hidden": true,
								className: "h-[196px] animate-pulse rounded-xl border border-border bg-foreground/5"
							}, index)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetTile, {
								id: NO_PET_ID,
								name: t("pets.none_name"),
								description: t("pets.none_description"),
								selected: data.active === NO_PET_ID,
								disabled: select.isPending,
								onSelect: () => choose(NO_PET_ID),
								selectedLabel: t("pets.selected"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetControlStripPreview, {
									size: "sm",
									companion: true
								})
							}) }), data.pets.map((pet) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetTile, {
								id: pet.id,
								name: pet.name,
								description: describe(pet),
								selected: data.active === pet.id,
								disabled: select.isPending,
								onSelect: () => choose(pet.id),
								selectedLabel: t("pets.selected"),
								onDelete: pet.builtin ? void 0 : () => setPendingDelete(pet),
								deleteLabel: t("pets.delete_named").replace("{0}", pet.name),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetSprite, {
									pet,
									state: "idle",
									scale: integerScaleFor(pet.frame_size, TILE_SPRITE_PX)
								})
							}) }, pet.id))] })
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatePetDialog, {
				open: createOpen,
				onOpenChange: setCreateOpen,
				onCreated: (pet) => {
					pushToast("success", t("pets.created").replace("{0}", pet.name));
					choose(pet.id);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeletePetDialog, {
				pet: pendingDelete,
				busy: remove.isPending,
				onCancel: () => setPendingDelete(null),
				onConfirm: confirmDelete
			})
		]
	});
}
function ActivePetCard({ pet, loading, description, customizeOpen, onToggleCustomize, children }) {
	const t = useT();
	const reduced = useReducedMotion() ?? false;
	const state = PET_STATES[useStateCycle(Boolean(pet) && !reduced)];
	const stateLabel = t(`pets.states.${state}`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-testid": "pets-active-card",
		"aria-label": t("pets.preview_title"),
		className: "grid gap-5 rounded-xl border border-border bg-card p-5 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-3 rounded-lg bg-secondary/60 px-4 py-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-[180px] w-full place-items-center",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						className: "h-5 w-5 animate-spin text-muted-foreground",
						"aria-hidden": true
					}) : pet ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetSprite, {
						pet,
						state,
						scale: integerScaleFor(pet.frame_size, HERO_SPRITE_PX),
						label: `${pet.name}: ${stateLabel}`
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: t("pets.none_description")
					})
				}),
				pet && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-testid": "pets-state-label",
					className: "rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-muted-foreground",
					children: stateLabel
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetControlStripPreview, { companion: true })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: t("pets.preview_title")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 truncate text-lg font-semibold text-foreground-strong",
							children: loading ? "\xA0" : pet ? pet.name : t("pets.none_name")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: loading ? "" : description
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: customizeOpen ? "secondary" : "outline",
					size: "sm",
					"data-testid": "pets-customize",
					"aria-expanded": customizeOpen,
					disabled: loading,
					onClick: onToggleCustomize,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { "aria-hidden": true }), t("pets.customize")]
				})]
			}), children]
		})]
	});
}
function CustomizePanel({ scale, bubble, stripAlways, keybinds }) {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const save = useSavePetSettings();
	const [size, setSize] = (0, import_react.useState)(scale);
	const dragging = (0, import_react.useRef)(false);
	const slider = (0, import_react.useRef)(null);
	const preview = (0, import_react.useRef)({
		inFlight: null,
		next: null,
		sent: false
	});
	(0, import_react.useEffect)(() => {
		if (!dragging.current) setSize(scale);
	}, [scale]);
	function previewSize(next) {
		const queue = preview.current;
		queue.next = Math.round(next * 100) / 100;
		if (queue.inFlight) return;
		const pump = async () => {
			while (queue.next !== null) {
				const value = queue.next;
				queue.next = null;
				queue.sent = true;
				try {
					await previewPetScale(value);
				} catch {}
			}
		};
		queue.inFlight = pump().finally(() => {
			queue.inFlight = null;
		});
	}
	function startDrag() {
		window.addEventListener("pointerup", () => {
			if (slider.current) commitSize(Number(slider.current.value));
		}, { once: true });
	}
	function changeSize(next) {
		dragging.current = true;
		setSize(next);
		previewSize(next);
	}
	async function commitSize(next) {
		dragging.current = false;
		const rounded = Math.round(next * 100) / 100;
		const queue = preview.current;
		queue.next = null;
		const previewed = queue.sent;
		queue.sent = false;
		if (queue.inFlight) await queue.inFlight;
		if (rounded === scale && !previewed) return;
		save.mutate({ scale: rounded }, { onError: (error) => {
			setSize(scale);
			pushToast("error", t("pets.save_error").replace("{0}", error.message));
		} });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": "pets-customize-panel",
		className: "mt-4 divide-y divide-border rounded-lg border border-border bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "pets-size",
							className: "text-sm font-medium text-foreground",
							children: t("pets.size_label")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-sm text-foreground-strong",
							children: `${Math.round(size * 100)}%`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs text-muted-foreground",
						children: t("pets.size_hint")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "pets-size",
						ref: slider,
						type: "range",
						"data-testid": "pets-size",
						min: SCALE_MIN,
						max: SCALE_MAX,
						step: SCALE_STEP,
						value: size,
						onChange: (event) => changeSize(Number(event.target.value)),
						onPointerDown: startDrag,
						onKeyUp: (event) => void commitSize(Number(event.currentTarget.value)),
						onBlur: (event) => {
							if (dragging.current) commitSize(Number(event.currentTarget.value));
						},
						className: "mt-3 w-full accent-primary disabled:opacity-50"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-4 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-foreground",
						children: t("pets.bubble_label")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs text-muted-foreground",
						children: t("pets.bubble_hint")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: bubble,
					disabled: save.isPending,
					"aria-label": t("pets.bubble_label"),
					"data-testid": "pets-bubble",
					onCheckedChange: (next) => save.mutate({ bubble: next }, { onError: (error) => pushToast("error", t("pets.save_error").replace("{0}", error.message)) })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-4 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-foreground",
						children: t("pets.strip_label")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs text-muted-foreground",
						children: t("pets.strip_hint")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: stripAlways,
					disabled: save.isPending,
					"aria-label": t("pets.strip_label"),
					"data-testid": "pets-strip-always",
					onCheckedChange: (next) => save.mutate({ strip_always: next }, { onError: (error) => pushToast("error", t("pets.save_error").replace("{0}", error.message)) })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeybindRow, {
					action: "pet_toggle",
					label: t("settings_view.keybinds.pet_toggle_label"),
					config: keybinds.config,
					loading: keybinds.loading,
					onSave: keybinds.saveKeybind
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-xs text-muted-foreground",
					children: t("pets.shortcut_hint")
				})]
			})
		]
	});
}
function PetTile({ id, name, description, selected, disabled, selectedLabel, onSelect, onDelete, deleteLabel, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			"data-testid": `pet-tile-${id}`,
			"aria-pressed": selected,
			disabled: disabled && !selected,
			onClick: onSelect,
			className: cn("flex h-full w-full flex-col rounded-xl border bg-card p-3 text-left transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", selected ? "border-accent ring-1 ring-accent" : "border-border hover:border-border-strong"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-28 w-full place-items-center overflow-hidden rounded-lg bg-secondary/60",
					children
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex min-w-0 items-center gap-2 pr-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate text-base font-medium text-foreground",
						children: name
					}), selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex shrink-0 items-center gap-1 text-xs font-medium text-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							className: "h-3.5 w-3.5",
							"aria-hidden": true
						}), selectedLabel]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 line-clamp-2 text-sm text-muted-foreground",
					children: description
				})
			]
		}), onDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"data-testid": `pet-delete-${id}`,
			"aria-label": deleteLabel,
			title: deleteLabel,
			onClick: onDelete,
			className: "absolute bottom-3 right-3 grid h-7 w-7 place-items-center rounded-md text-muted-foreground opacity-70 transition-colors hover:bg-secondary hover:text-destructive hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
				className: "h-4 w-4",
				"aria-hidden": true
			})
		})]
	});
}
function DeletePetDialog({ pet, busy, onCancel, onConfirm }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		open: pet !== null,
		onOpenChange: (open) => !open && !busy && onCancel(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 z-[80] bg-scrim/75 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
			"data-testid": "delete-pet-dialog",
			className: "fixed inset-0 z-[80] m-auto h-fit w-[min(400px,calc(100vw-32px))] rounded-2xl border border-border bg-popover p-6 text-popover-foreground shadow-float outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 motion-reduce:animate-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					className: "text-base font-semibold text-foreground-strong",
					children: t("pets.delete_title").replace("{0}", pet?.name ?? "")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
					className: "mt-1.5 text-sm text-muted-foreground",
					children: t("pets.delete_body")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						disabled: busy,
						onClick: onCancel,
						children: t("common.cancel")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "destructive",
						"data-testid": "delete-pet-confirm",
						disabled: busy,
						onClick: onConfirm,
						children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							className: "animate-spin",
							"aria-hidden": true
						}), t("pets.delete")]
					})]
				})
			]
		})] })
	});
}
export { PetsView };
