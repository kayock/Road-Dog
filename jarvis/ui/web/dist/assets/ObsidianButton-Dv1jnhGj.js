import { Bc as require_jsx_runtime, Vi as ExternalLink, Xc as require_react, ln as Button, oc as useT, tl as __toESM, wc as useEventStore } from "./index-BOzhgzD7.js";
import { t as buildObsidianUrl } from "./obsidian-L_mA5p20.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
const FALLBACK_TOAST_DELAY_MS = 800;
function ObsidianButton({ vaultRoot, vaultRelPath, size = "sm", label }) {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const handleClick = (0, import_react.useCallback)(() => {
		const url = buildObsidianUrl(vaultRoot, vaultRelPath);
		try {
			window.location.assign(url);
		} catch {
			pushToast("warning", `${t("obsidian_button.trigger_failed")}: ${vaultRelPath || "Vault"}`);
			return;
		}
		window.setTimeout(() => {
			if (vaultRelPath) pushToast("info", `${t("obsidian_button.handed_over")}: ${vaultRelPath} ${t("obsidian_button.not_installed_hint")}`);
			else pushToast("info", `${t("obsidian_button.vault_handed_over")} ${t("obsidian_button.not_installed_hint")}`);
		}, 800);
	}, [
		pushToast,
		t,
		vaultRelPath,
		vaultRoot
	]);
	const buttonLabel = label ?? (vaultRelPath ? t("obsidian_button.open_in_obsidian") : t("obsidian_button.open_vault_in_obsidian"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		type: "button",
		variant: "outline",
		size,
		onClick: handleClick,
		className: "gap-1.5",
		title: vaultRelPath || vaultRoot,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
			className: "h-3.5 w-3.5",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: buttonLabel })]
	});
}
export { FALLBACK_TOAST_DELAY_MS, ObsidianButton };
