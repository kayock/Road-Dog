import { Oc as useQuery } from "./index-BOzhgzD7.js";
var BrowserProfileError = class extends Error {
	constructor(status) {
		super(`Browser profile request failed (${status})`);
		this.status = status;
	}
};
const BROWSER_PROFILES_QUERY = ["society", "browser-profiles"];
const BROWSER_PROFILE_CHANGED_EVENT = "jarvis:browser-profile-changed";
var base = "/api/society/browser/profiles";
async function request(url, method = "GET", value) {
	const response = await fetch(url, {
		method,
		...value === void 0 ? {} : {
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(value)
		}
	});
	if (!response.ok) throw new BrowserProfileError(response.status);
	return response.json();
}
function useBrowserProfiles() {
	return useQuery({
		queryKey: BROWSER_PROFILES_QUERY,
		queryFn: () => request(base),
		staleTime: 0,
		retry: false,
		refetchOnWindowFocus: false
	});
}
function createBrowserProfile(value) {
	return request(base, "POST", value);
}
function updateBrowserProfile(id, value) {
	return request(`${base}/${encodeURIComponent(id)}`, "PATCH", value);
}
function shareBrowserProfile(id, value) {
	return request(`${base}/${encodeURIComponent(id)}/sharing`, "PUT", value);
}
function bindAgentBrowserProfile(agentId, mode, profile_id) {
	return request(`/api/society/agents/${encodeURIComponent(agentId)}/browser/profile`, "PUT", {
		mode,
		profile_id
	});
}
function removeBrowserProfile(id) {
	return request(`${base}/${encodeURIComponent(id)}`, "DELETE");
}
function pairBrowserProfile(id) {
	return request(`${base}/${encodeURIComponent(id)}/pair`, "POST");
}
function parseBrowserDomains(value) {
	return [...new Set(value.split(/[\s,;]+/).map((domain) => domain.trim().toLowerCase()).filter(Boolean))];
}
export { createBrowserProfile as a, removeBrowserProfile as c, useBrowserProfiles as d, bindAgentBrowserProfile as i, shareBrowserProfile as l, BROWSER_PROFILE_CHANGED_EVENT as n, pairBrowserProfile as o, BrowserProfileError as r, parseBrowserDomains as s, BROWSER_PROFILES_QUERY as t, updateBrowserProfile as u };
