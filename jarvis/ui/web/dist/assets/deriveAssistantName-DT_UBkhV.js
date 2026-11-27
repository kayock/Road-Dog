import { Xc as require_react, tl as __toESM } from "./index-BOzhgzD7.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useAutostart() {
	const [config, setConfig] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const refetch = (0, import_react.useCallback)(async () => {
		setError(null);
		try {
			const res = await fetch("/api/settings/autostart");
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			setConfig(await res.json());
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		refetch();
	}, [refetch]);
	return {
		config,
		loading,
		error,
		refetch,
		setEnabled: (0, import_react.useCallback)(async (enabled) => {
			const res = await fetch("/api/settings/autostart", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					enabled,
					persist: true
				})
			});
			const body = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(body.detail ?? `HTTP ${res.status}`);
			const result = body;
			setConfig(result);
			return result;
		}, [])
	};
}
var WAKE_PREFIXES = new Set([
	"hey",
	"hi",
	"ok",
	"okay",
	"hello",
	"hallo",
	"yo",
	"hej"
]);
function deriveAssistantName(phrase) {
	const tokens = (phrase || "").toLowerCase().replace(/[^0-9a-zäöüß]+/g, " ").trim().split(/\s+/).filter(Boolean);
	if (tokens.length === 0) return "";
	let core = [...tokens];
	while (core.length > 0 && WAKE_PREFIXES.has(core[0])) core.shift();
	if (core.length === 0) core = tokens;
	return core.map((tok) => tok.charAt(0).toUpperCase() + tok.slice(1)).join(" ");
}
export { useAutostart as n, deriveAssistantName as t };
