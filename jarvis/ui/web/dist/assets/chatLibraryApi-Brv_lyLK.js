var BASE = "/api/chat-library";
var ChatLibraryError = class extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
		this.name = "ChatLibraryError";
	}
};
async function request(path, init) {
	const response = await fetch(`${BASE}${path}`, {
		headers: init?.body ? { "Content-Type": "application/json" } : void 0,
		...init
	});
	if (!response.ok) {
		let detail = response.statusText;
		try {
			const body = await response.json();
			if (body && typeof body.detail === "string") detail = body.detail;
		} catch {}
		throw new ChatLibraryError(detail, response.status);
	}
	if (response.status === 204) return void 0;
	return await response.json();
}
async function openProject(path, name) {
	return request("/projects", {
		method: "POST",
		body: JSON.stringify({
			path,
			name
		})
	});
}
async function patchProject(projectId, changes) {
	return request(`/projects/${encodeURIComponent(projectId)}`, {
		method: "PATCH",
		body: JSON.stringify(changes)
	});
}
async function deleteProject(projectId) {
	return (await request(`/projects/${encodeURIComponent(projectId)}`, { method: "DELETE" })).removed;
}
async function revealProject(projectId) {
	return (await request(`/projects/${encodeURIComponent(projectId)}/reveal`, { method: "POST" })).opened;
}
function fetchProjectLaunchers(projectId) {
	return request(`/projects/${encodeURIComponent(projectId)}/launchers`);
}
async function openProjectIn(projectId, target) {
	return (await request(`/projects/${encodeURIComponent(projectId)}/open-in`, {
		method: "POST",
		body: JSON.stringify({ target })
	})).opened;
}
async function reorderProjects(projectIds) {
	return (await request("/projects/order", {
		method: "PUT",
		body: JSON.stringify({ project_ids: projectIds })
	})).projects;
}
export { openProjectIn as a, revealProject as c, openProject as i, deleteProject as n, patchProject as o, fetchProjectLaunchers as r, reorderProjects as s, ChatLibraryError as t };
