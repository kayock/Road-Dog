async function addCustomConnector(request) {
	const res = await fetch("/api/marketplace/connectors", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			name: request.name.trim(),
			url: request.url.trim(),
			auth: request.auth,
			header_name: request.headerName?.trim() || null
		})
	});
	if (!res.ok) {
		const detail = (await res.json().catch(() => ({}))).detail;
		if (Array.isArray(detail) && detail[0]?.msg) throw new Error(String(detail[0].msg));
		throw new Error(typeof detail === "string" ? detail : `HTTP ${res.status}`);
	}
	return res.json();
}
async function removeAddedPlugin(pluginId) {
	const res = await fetch(`/api/marketplace/community/plugins/${encodeURIComponent(pluginId)}`, { method: "DELETE" });
	if (!res.ok) {
		const detail = (await res.json().catch(() => ({}))).detail;
		throw new Error(typeof detail === "string" ? detail : `HTTP ${res.status}`);
	}
}
var pendingFocus = null;
function requestPluginFocus(pluginId) {
	pendingFocus = pluginId;
}
function takePluginFocus() {
	const id = pendingFocus;
	pendingFocus = null;
	return id;
}
export { takePluginFocus as i, removeAddedPlugin as n, requestPluginFocus as r, addCustomConnector as t };
