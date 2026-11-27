var API_BASE = "/api/missions";
function paidOfferQueryKey(missionId) {
	return [
		"missions",
		"paid-offer",
		missionId
	];
}
async function fetchPaidOffer(missionId) {
	return requestJson(`${API_BASE}/${encodeURIComponent(missionId)}/paid-offer`);
}
async function decideCapacity(missionId, decision, offer) {
	return requestJson(`${API_BASE}/${encodeURIComponent(missionId)}/capacity-decision`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			decision,
			provider: offer?.provider ?? null,
			model: offer?.model ?? null
		})
	});
}
const MISSION_BILLING_KEY = ["mission-billing"];
function isMissionBilling(body) {
	return !!body && typeof body === "object" && typeof body.paid_api_fallback === "boolean" && typeof body.subscription_mode === "boolean";
}
async function fetchMissionBilling() {
	const res = await fetch("/api/mission-billing", { cache: "no-store" });
	if (res.status === 404) return null;
	const body = await res.json().catch(() => null);
	if (!res.ok) {
		const detail = body && typeof body === "object" && "detail" in body ? body.detail : null;
		throw new Error(typeof detail === "string" ? detail : `HTTP ${res.status}`);
	}
	return isMissionBilling(body) ? body : null;
}
async function saveMissionBilling(paidApiFallback) {
	const body = await requestJson("/api/mission-billing", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ paid_api_fallback: paidApiFallback })
	});
	if (!isMissionBilling(body)) throw new Error("Unexpected answer from the server");
	return body;
}
async function requestJson(url, init) {
	const res = await fetch(url, init);
	const body = await res.json().catch(() => null);
	if (!res.ok) {
		const detail = body && typeof body === "object" && "detail" in body ? body.detail : null;
		throw new Error(typeof detail === "string" ? detail : `HTTP ${res.status}`);
	}
	return body;
}
export { paidOfferQueryKey as a, fetchPaidOffer as i, decideCapacity as n, saveMissionBilling as o, fetchMissionBilling as r, MISSION_BILLING_KEY as t };
