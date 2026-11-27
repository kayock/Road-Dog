import { Ec as create } from "./index-BOzhgzD7.js";
const EMPTY_AGENT_PROVIDER_PREFS = {
	disabled: [],
	api_only: [],
	hidden_models: {}
};
const AGENT_PROVIDER_PREFS_KEY = ["agent-provider-prefs"];
async function fetchAgentProviderPrefs() {
	const res = await fetch("/api/society/provider-prefs", { cache: "no-store" });
	if (res.status === 404) return EMPTY_AGENT_PROVIDER_PREFS;
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return await res.json();
}
async function saveAgentProviderPrefs(patch) {
	const res = await fetch("/api/society/provider-prefs", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(patch)
	});
	if (!res.ok) {
		const detail = await res.json().catch(() => null);
		throw new Error(detail && typeof detail.detail === "string" && detail.detail || `HTTP ${res.status}`);
	}
	return await res.json();
}
const useSavedHiddenModels = create(() => ({ hidden: null }));
function offeredModels(row, models, keep = "", saved = null) {
	const ids = saved ? saved[row.id] : row.hidden_models;
	if (!ids?.length) return models;
	const hidden = new Set(ids);
	hidden.delete(keep);
	const shown = models.filter((model) => !hidden.has(model.id));
	return shown.length === models.length ? models : shown;
}
function toggled(list, ids, on) {
	const drop = new Set(ids);
	const kept = list.filter((id) => !drop.has(id));
	return on ? kept : [...kept, ...ids];
}
export { saveAgentProviderPrefs as a, offeredModels as i, EMPTY_AGENT_PROVIDER_PREFS as n, toggled as o, fetchAgentProviderPrefs as r, useSavedHiddenModels as s, AGENT_PROVIDER_PREFS_KEY as t };
