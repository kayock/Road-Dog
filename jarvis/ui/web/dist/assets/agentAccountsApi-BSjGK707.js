import { na as createLucideIcon } from "./index-BOzhgzD7.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ClipboardPaste = createLucideIcon("ClipboardPaste", [
	["path", {
		d: "M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z",
		key: "1pp7kr"
	}],
	["path", {
		d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M16 4h2a2 2 0 0 1 2 2v2M11 14h10",
		key: "2ik1ml"
	}],
	["path", {
		d: "m17 10 4 4-4 4",
		key: "vp2hj1"
	}]
]);
async function fetchAgentUsage(refresh = false) {
	const res = await fetch(`/api/agent-accounts/usage${refresh ? "?refresh=true" : ""}`, { cache: "no-store" });
	if (res.status === 404) return null;
	if (!res.ok) throw new Error(await detail(res));
	return await res.json();
}
async function detail(res) {
	try {
		const body = await res.json();
		if (body?.detail) return body.detail;
	} catch {}
	return `request failed: ${res.status}`;
}
async function send(url, init) {
	const res = await fetch(url, init);
	if (!res.ok) throw new Error(await detail(res));
	return await res.json();
}
async function fetchAgentAccounts() {
	const res = await fetch("/api/agent-accounts", { cache: "no-store" });
	if (!res.ok) throw new Error(await detail(res));
	return await res.json();
}
function createAgentAccount(platform, label) {
	return send("/api/agent-accounts", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			platform,
			label
		})
	});
}
function setActiveAgentAccount(platform, accountId) {
	return send("/api/agent-accounts/active", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			platform,
			account_id: accountId
		})
	});
}
function loginAgentAccount(accountId) {
	return send(`/api/agent-accounts/${encodeURIComponent(accountId)}/login`, { method: "POST" });
}
async function startLoginFlow(accountId) {
	return (await send(`/api/agent-accounts/${encodeURIComponent(accountId)}/login-flow`, { method: "POST" })).flow;
}
async function getLoginFlow(flowId) {
	return (await send(`/api/agent-accounts/login-flow/${encodeURIComponent(flowId)}`, {
		method: "GET",
		cache: "no-store"
	})).flow;
}
async function submitLoginFlowCode(flowId, code) {
	return (await send(`/api/agent-accounts/login-flow/${encodeURIComponent(flowId)}/code`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ code })
	})).flow;
}
async function cancelLoginFlow(flowId) {
	return (await send(`/api/agent-accounts/login-flow/${encodeURIComponent(flowId)}`, { method: "DELETE" })).flow;
}
function renameAgentAccount(accountId, label) {
	return send(`/api/agent-accounts/${encodeURIComponent(accountId)}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ label })
	});
}
function deleteAgentAccount(accountId, removeFiles = false) {
	const qs = removeFiles ? "?remove_files=true" : "";
	return send(`/api/agent-accounts/${encodeURIComponent(accountId)}${qs}`, { method: "DELETE" });
}
function groupFor(data, platform) {
	return data?.platforms?.find((group) => group.platform === platform);
}
function switchSeat(platform, accountId) {
	return send("/api/agentic-ide/accounts/switch", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			agent: platform,
			account_id: accountId
		})
	});
}
async function fetchAutoSwitch() {
	const res = await fetch("/api/agentic-ide/accounts/auto-switch", { cache: "no-store" });
	if (res.status === 404) return null;
	if (!res.ok) throw new Error(await detail(res));
	return await res.json();
}
function updateAutoSwitch(change) {
	return send("/api/agentic-ide/accounts/auto-switch", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(change)
	});
}
export { fetchAgentUsage as a, groupFor as c, setActiveAgentAccount as d, startLoginFlow as f, ClipboardPaste as g, updateAutoSwitch as h, fetchAgentAccounts as i, loginAgentAccount as l, switchSeat as m, createAgentAccount as n, fetchAutoSwitch as o, submitLoginFlowCode as p, deleteAgentAccount as r, getLoginFlow as s, cancelLoginFlow as t, renameAgentAccount as u };
