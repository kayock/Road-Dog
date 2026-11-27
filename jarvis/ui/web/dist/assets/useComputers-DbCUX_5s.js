import { Dc as useMutation, Oc as useQuery, Xc as require_react, tl as __toESM, zc as useQueryClient } from "./index-BOzhgzD7.js";
var ComputerApiError = class extends Error {
	kind;
	status;
	constructor(message, status, kind) {
		super(message);
		this.name = "ComputerApiError";
		this.status = status;
		this.kind = kind;
	}
};
var BASE = "/api/computers";
async function request(path, init) {
	const res = await fetch(`${BASE}${path}`, {
		...init,
		headers: init?.body ? { "Content-Type": "application/json" } : void 0
	});
	if (!res.ok) {
		let message = `${res.status} ${res.statusText}`;
		let kind = null;
		try {
			const detail = (await res.json()).detail;
			if (typeof detail === "string") message = detail;
			else if (detail && typeof detail === "object") {
				const d = detail;
				if (typeof d.message === "string") message = d.message;
				if (typeof d.kind === "string") kind = d.kind;
			}
		} catch {}
		throw new ComputerApiError(message, res.status, kind);
	}
	return await res.json();
}
var post = (body) => ({
	method: "POST",
	body: body === void 0 ? void 0 : JSON.stringify(body)
});
const pairedServersApi = {
	list: () => request("/pairing/servers").then((r) => r.servers),
	add: (host, code) => request("/pairing/servers", post({
		host,
		code
	})),
	check: (id) => request(`/pairing/servers/${encodeURIComponent(id)}/check`, post()),
	open: (id) => request(`/pairing/servers/${encodeURIComponent(id)}/open`, post()),
	remove: (id) => request(`/pairing/servers/${encodeURIComponent(id)}`, { method: "DELETE" }),
	code: () => request("/pairing/code", post()),
	clients: () => request("/pairing/clients").then((r) => r.clients),
	revoke: (id) => request(`/pairing/clients/${encodeURIComponent(id)}`, { method: "DELETE" })
};
const computersApi = {
	list: () => request("").then((r) => r.computers),
	providers: () => request("/providers").then((r) => r.providers),
	test: (input) => request("/test", post(input)),
	setCredentials: (id, input) => request(`/${encodeURIComponent(id)}/credentials`, {
		method: "PUT",
		body: JSON.stringify(input)
	}),
	identity: () => request("/identity"),
	add: (input) => request("", post(input)),
	checkAll: () => request("/check-all", post()).then((r) => r.computers),
	check: (id) => request(`/${encodeURIComponent(id)}/check`, post()),
	update: (id, patch) => request(`/${encodeURIComponent(id)}`, {
		method: "PATCH",
		body: JSON.stringify(patch)
	}),
	remove: (id, destroyVm = false) => request(`/${encodeURIComponent(id)}${destroyVm ? "?destroy_vm=true" : ""}`, { method: "DELETE" }),
	run: (id, command, timeoutS = 60) => request(`/${encodeURIComponent(id)}/run`, post({
		command,
		timeout_s: timeoutS
	})),
	installKey: (id, password) => request(`/${encodeURIComponent(id)}/install-key`, post({ password })),
	trustHostKey: (id) => request(`/${encodeURIComponent(id)}/trust-host-key`, post()),
	power: (id, action) => request(`/${encodeURIComponent(id)}/power`, post({ action })),
	cloudProviders: () => request("/cloud").then((r) => r.providers),
	saveCloudToken: (provider, token) => request(`/cloud/${provider}/token`, {
		method: "PUT",
		body: JSON.stringify({ token })
	}),
	forgetCloudToken: (provider) => request(`/cloud/${provider}/token`, { method: "DELETE" }),
	cloudServers: (provider) => request(`/cloud/${provider}/servers`).then((r) => r.servers),
	importCloudServer: (provider, body) => request(`/cloud/${provider}/import`, post(body)),
	localStatus: () => request("/local"),
	createLocalVm: (input) => request("/local", post(input)),
	sshHosts: () => request("/ssh-hosts").then((r) => r.hosts),
	tailscale: () => request("/tailscale"),
	addRoute: (id, route) => request(`/${encodeURIComponent(id)}/routes`, post(route)),
	orderRoutes: (id, routeIds) => request(`/${encodeURIComponent(id)}/routes/order`, {
		method: "PUT",
		body: JSON.stringify({ route_ids: routeIds })
	}),
	removeRoute: (id, routeId) => request(`/${encodeURIComponent(id)}/routes/${encodeURIComponent(routeId)}`, { method: "DELETE" }),
	placement: () => request("/placement"),
	setPlacement: (patch) => request("/placement", {
		method: "PUT",
		body: JSON.stringify(patch)
	}),
	pickPlacement: () => request("/placement/pick", post()).then((r) => r.computer_id),
	shareGithub: (id) => request(`/${encodeURIComponent(id)}/github`, post()),
	unshareGithub: (id) => request(`/${encodeURIComponent(id)}/github`, { method: "DELETE" })
};
const readinessApi = {
	get: (id) => request(`/${encodeURIComponent(id)}/readiness`),
	install: (id, items) => request(`/${encodeURIComponent(id)}/install`, post({ items })),
	job: (id) => request(`/${encodeURIComponent(id)}/install`).then((r) => r.install),
	copyLogin: (id, agent) => request(`/${encodeURIComponent(id)}/copy-login`, post({ agent })),
	saveClaudeToken: (id, token) => request(`/${encodeURIComponent(id)}/claude-token`, post({ token }))
};
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
const computerKeys = {
	all: ["computers"],
	list: () => ["computers", "list"],
	sshHosts: () => ["computers", "ssh-hosts"],
	tailscale: () => ["computers", "tailscale"],
	placement: () => ["computers", "placement"],
	identity: () => ["computers", "identity"],
	cloud: () => ["computers", "cloud"],
	cloudServers: (p) => [
		"computers",
		"cloud",
		p,
		"servers"
	],
	local: () => ["computers", "local"]
};
var MOVING_POLL_MS = 4e3;
function isMoving(rows) {
	return Boolean(rows?.some((c) => c.busy || c.health.status === "provisioning"));
}
function useComputers() {
	return useQuery({
		queryKey: computerKeys.list(),
		queryFn: computersApi.list,
		refetchInterval: (query) => isMoving(query.state.data) ? MOVING_POLL_MS : false
	});
}
function useIdentity() {
	return useQuery({
		queryKey: computerKeys.identity(),
		queryFn: computersApi.identity,
		staleTime: Infinity
	});
}
function useProviderCatalog() {
	return useQuery({
		queryKey: ["computers", "providers"],
		queryFn: computersApi.providers,
		staleTime: 5 * 6e4,
		retry: false
	});
}
function useCloudServers(provider, enabled) {
	return useQuery({
		queryKey: computerKeys.cloudServers(provider),
		queryFn: () => computersApi.cloudServers(provider),
		enabled,
		retry: false
	});
}
function useLocalStatus(enabled = true) {
	return useQuery({
		queryKey: computerKeys.local(),
		queryFn: computersApi.localStatus,
		enabled,
		retry: false
	});
}
function useUpsertComputer() {
	const qc = useQueryClient();
	return (computer) => {
		qc.setQueryData(computerKeys.list(), (rows) => {
			const list = rows ?? [];
			const index = list.findIndex((c) => c.id === computer.id);
			if (index === -1) return [...list, computer];
			const next = list.slice();
			next[index] = computer;
			return next;
		});
	};
}
function useCheckComputer() {
	const upsert = useUpsertComputer();
	return useMutation({
		mutationFn: computersApi.check,
		onSuccess: upsert
	});
}
function useCheckAll() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: computersApi.checkAll,
		onSuccess: (rows) => qc.setQueryData(computerKeys.list(), rows)
	});
}
function useUpdateComputer() {
	return useMutation({
		mutationFn: ({ id, patch }) => computersApi.update(id, patch),
		onSuccess: useUpsertComputer()
	});
}
function useRouteMutations() {
	const upsert = useUpsertComputer();
	const qc = useQueryClient();
	const settle = (computer) => {
		upsert(computer);
		qc.invalidateQueries({ queryKey: computerKeys.tailscale() });
	};
	return {
		add: useMutation({
			mutationFn: ({ id, route }) => computersApi.addRoute(id, route),
			onSuccess: settle
		}),
		order: useMutation({
			mutationFn: ({ id, routeIds }) => computersApi.orderRoutes(id, routeIds),
			onSuccess: settle
		}),
		remove: useMutation({
			mutationFn: ({ id, routeId }) => computersApi.removeRoute(id, routeId),
			onSuccess: settle
		})
	};
}
function useSshHosts(enabled) {
	return useQuery({
		queryKey: computerKeys.sshHosts(),
		queryFn: computersApi.sshHosts,
		enabled,
		staleTime: 3e4
	});
}
function useTailscale(enabled = true) {
	return useQuery({
		queryKey: computerKeys.tailscale(),
		queryFn: computersApi.tailscale,
		enabled,
		staleTime: 6e4,
		retry: false
	});
}
function usePlacement() {
	return useQuery({
		queryKey: computerKeys.placement(),
		queryFn: computersApi.placement,
		retry: false
	});
}
function useSetPlacement() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: computersApi.setPlacement,
		onSuccess: (settings) => qc.setQueryData(computerKeys.placement(), settings)
	});
}
function useGithubShare() {
	return useMutation({
		mutationFn: ({ id, share }) => share ? computersApi.shareGithub(id) : computersApi.unshareGithub(id),
		onSuccess: useUpsertComputer()
	});
}
function useRemoveComputer() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, destroyVm }) => computersApi.remove(id, destroyVm),
		onSuccess: (_result, { id }) => {
			qc.setQueryData(computerKeys.list(), (rows) => (rows ?? []).filter((c) => c.id !== id));
			qc.invalidateQueries({ queryKey: computerKeys.cloud() });
		}
	});
}
function useComputerChoices() {
	return useComputerChoiceList().computers;
}
function useComputerChoiceList() {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let alive = true;
		try {
			computersApi.list().then((list) => {
				if (alive && Array.isArray(list)) setRows(list);
			}).catch(() => void 0).finally(() => {
				if (alive) setLoaded(true);
			});
		} catch {
			setLoaded(true);
		}
		return () => {
			alive = false;
		};
	}, []);
	return {
		computers: rows,
		loaded
	};
}
export { readinessApi as C, pairedServersApi as S, useTailscale as _, useComputerChoiceList as a, ComputerApiError as b, useGithubShare as c, usePlacement as d, useProviderCatalog as f, useSshHosts as g, useSetPlacement as h, useCloudServers as i, useIdentity as l, useRouteMutations as m, useCheckAll as n, useComputerChoices as o, useRemoveComputer as p, useCheckComputer as r, useComputers as s, computerKeys as t, useLocalStatus as u, useUpdateComputer as v, computersApi as x, useUpsertComputer as y };
