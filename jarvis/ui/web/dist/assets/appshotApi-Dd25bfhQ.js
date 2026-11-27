async function request(url, init) {
	const response = await fetch(url, init);
	const body = await response.json().catch(() => null);
	if (!response.ok) {
		const detail = body && typeof body === "object" && "detail" in body && typeof body.detail === "string" ? body.detail : "";
		throw new Error(detail || `Appshot request failed (${response.status}).`);
	}
	return body;
}
function fetchAppshotSettings() {
	return request("/api/appshot/settings");
}
function saveAppshotSettings(patch) {
	return request("/api/appshot/settings", {
		method: "PUT",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(patch)
	});
}
function fetchLatestAppshot() {
	return request("/api/appshot/latest");
}
function latestAppshotImageUrl(id, revision = 0) {
	const v = revision ? `${id}-${revision}` : id;
	return `/api/appshot/latest/image?id=${encodeURIComponent(id)}&v=${encodeURIComponent(v)}`;
}
function takeAppshot(delaySeconds = 0, scope = "window") {
	return request("/api/appshot/take", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			delay_s: delaySeconds,
			scope
		})
	});
}
function forgetAppshots() {
	return request("/api/appshot", { method: "DELETE" });
}
function fetchPendingAppshot() {
	return request("/api/appshot/pending");
}
async function claimPendingAppshot(meta) {
	const response = await fetch("/api/appshot/pending/claim", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ id: meta.id })
	});
	if (!response.ok) return null;
	const blob = await response.blob();
	const stamp = (/* @__PURE__ */ new Date(meta.taken_at * 1e3)).toISOString().replace(/[-:]/g, "").replace(/\..*$/, "").replace("T", "-");
	const extension = blob.type === "image/png" ? "png" : "jpg";
	return new File([blob], `appshot-${stamp}.${extension}`, { type: blob.type || "image/jpeg" });
}
function formatAppshotHotkey(hotkey, isMac) {
	if (!hotkey) return "";
	if (hotkey === "alt+alt") return isMac ? "⌥ + ⌥" : "Alt + Alt";
	return hotkey.split("+").map((part) => {
		const key = part.trim();
		if (key === "ctrl") return isMac ? "⌃" : "Ctrl";
		if (key === "alt") return isMac ? "⌥" : "Alt";
		if (key === "shift") return isMac ? "⇧" : "Shift";
		if (key === "right_alt") return isMac ? "⌥" : "AltGr";
		if (key === "win" || key === "cmd" || key === "super") return isMac ? "⌘" : "Win";
		return key.length === 1 ? key.toUpperCase() : key.charAt(0).toUpperCase() + key.slice(1);
	}).join(" + ");
}
async function openAppshotEditorWindow(id) {
	try {
		const response = await fetch("/api/appshot/open-editor", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ id })
		});
		if (!response.ok) return false;
		return (await response.json().catch(() => null))?.window === true;
	} catch {
		return false;
	}
}
const CARD_SECONDS_CHOICES = [
	3,
	6,
	10,
	30,
	60,
	300,
	0
];
const KEEP_NEWEST_CHOICES = [
	0,
	10,
	20,
	50,
	100
];
function fetchAppshotLibrary() {
	return request("/api/appshot/library");
}
function appshotLibraryImageUrl(item, thumb = false) {
	const params = new URLSearchParams({
		variant: item.variant,
		v: String(item.edited_at || item.taken_at)
	});
	if (thumb) params.set("thumb", "1");
	return `/api/appshot/library/${encodeURIComponent(item.id)}/image?${params.toString()}`;
}
function appshotLibraryFileName(item) {
	return item.path.split(/[\\/]/).pop() || `appshot-${item.id}.png`;
}
function openAppshotLibraryItem(item) {
	return request(`/api/appshot/library/${encodeURIComponent(item.id)}/open`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ variant: item.variant })
	});
}
function deleteAppshotLibraryItem(item) {
	return request(`/api/appshot/library/${encodeURIComponent(item.id)}?variant=${encodeURIComponent(item.variant)}`, { method: "DELETE" });
}
function clearAppshotLibrary() {
	return request("/api/appshot/library", { method: "DELETE" });
}
function fetchAppshotRecording(signal) {
	return request("/api/appshot/recording", {
		signal,
		cache: "no-store"
	});
}
function controlAppshotRecording(action) {
	return request(`/api/appshot/recording/${action}`, { method: "POST" });
}
function appshotRecordingUrl(id) {
	return `/api/appshot/recording/${encodeURIComponent(id)}/video`;
}
function requestRecordingPermission() {
	return request("/api/permissions/screen_recording/request?dry_run=false", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ feature: "appshot" })
	});
}
const RECORDING_SPEEDS = [
	.5,
	1,
	1.5,
	2
];
function exportAppshotRecording(id, clip) {
	return request(`/api/appshot/recording/${encodeURIComponent(id)}/export`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(clip)
	});
}
function saveAppshotRecording(id) {
	return request(`/api/appshot/recording/${encodeURIComponent(id)}/save`, { method: "POST" });
}
export { saveAppshotRecording as C, requestRecordingPermission as S, takeAppshot as T, forgetAppshots as _, appshotLibraryImageUrl as a, openAppshotEditorWindow as b, clearAppshotLibrary as c, exportAppshotRecording as d, fetchAppshotLibrary as f, fetchPendingAppshot as g, fetchLatestAppshot as h, appshotLibraryFileName as i, controlAppshotRecording as l, fetchAppshotSettings as m, KEEP_NEWEST_CHOICES as n, appshotRecordingUrl as o, fetchAppshotRecording as p, RECORDING_SPEEDS as r, claimPendingAppshot as s, CARD_SECONDS_CHOICES as t, deleteAppshotLibraryItem as u, formatAppshotHotkey as v, saveAppshotSettings as w, openAppshotLibraryItem as x, latestAppshotImageUrl as y };
