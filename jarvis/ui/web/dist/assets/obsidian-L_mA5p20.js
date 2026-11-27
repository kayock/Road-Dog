async function fetchObsidianVaults(fetchImpl = fetch) {
	const res = await fetchImpl("/api/setup/obsidian/vaults");
	if (!res.ok) return [];
	const body = await res.json();
	return body.ok ? body.vaults ?? [] : [];
}
async function registerObsidianVault(mode, existingVaultPath, fetchImpl = fetch) {
	return await (await fetchImpl("/api/setup/obsidian/register", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			mode,
			existing_vault_path: existingVaultPath ?? null
		})
	})).json();
}
function buildObsidianUrl(vaultRoot, vaultRelPath = "") {
	const root = vaultRoot.replace(/[\\/]+$/, "");
	const separator = root.includes("\\") ? "\\" : "/";
	const relative = vaultRelPath.replace(/^[\\/]+/, "").replace(/[\\/]+/g, separator);
	const absolutePath = relative ? `${root}${separator}${relative}` : root;
	return `obsidian://open?path=${encodeURIComponent(absolutePath)}`;
}
export { fetchObsidianVaults as n, registerObsidianVault as r, buildObsidianUrl as t };
