import { Dc as useMutation, Oc as useQuery, zc as useQueryClient } from "./index-BOzhgzD7.js";
function useOutputsList() {
	return useQuery({
		queryKey: ["outputs"],
		queryFn: async () => {
			const r = await fetch("/api/outputs");
			if (!r.ok) throw new Error(`HTTP ${r.status}`);
			const data = await r.json();
			return Array.isArray(data) ? data : data.sessions ?? [];
		},
		staleTime: 5e3,
		refetchInterval: 3e3
	});
}
function useCancelMission() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (missionId) => {
			const r = await fetch(`/api/missions/${encodeURIComponent(missionId)}/cancel`, { method: "POST" });
			if (!r.ok) throw new Error(`HTTP ${r.status}`);
			return await r.json();
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["outputs"] })
	});
}
function useRerunMission() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ missionId, confirmed = false }) => {
			const r = await fetch(`/api/missions/${encodeURIComponent(missionId)}/rerun`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ confirmed })
			});
			if (r.status === 409) {
				const data = await r.json().catch(() => ({}));
				if (data?.requires_confirm) throw {
					requiresConfirm: true,
					...data
				};
				throw new Error(data?.detail ?? "HTTP 409");
			}
			if (!r.ok) throw new Error(`HTTP ${r.status}`);
			return await r.json();
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["outputs"] })
	});
}
function usePlanForOutput(slug) {
	const qc = useQueryClient();
	return useQuery({
		queryKey: ["output-plan", slug],
		queryFn: async () => {
			const r = await fetch(`/api/outputs/${slug}/plan`);
			if (!r.ok) throw new Error(`HTTP ${r.status}`);
			return r.json();
		},
		enabled: !!slug,
		staleTime: 3e3,
		refetchInterval: () => {
			return qc.getQueryData(["outputs"])?.find((r) => r.slug === slug)?.status === "running" ? 3e3 : false;
		}
	});
}
function useArtifactsForOutput(slug) {
	return useQuery({
		queryKey: ["output-artifacts", slug],
		queryFn: async () => {
			const r = await fetch(`/api/outputs/${slug}/artifacts`);
			if (!r.ok) throw new Error(`HTTP ${r.status}`);
			return r.json();
		},
		enabled: !!slug,
		staleTime: 3e3,
		refetchInterval: 5e3
	});
}
function encodeArtifactPath(path) {
	return path.split("/").map(encodeURIComponent).join("/");
}
function useArtifactFile(slug, path) {
	return useQuery({
		queryKey: [
			"output-artifact-file",
			slug,
			path
		],
		queryFn: async () => {
			const r = await fetch(`/api/outputs/${slug}/files/${encodeArtifactPath(path ?? "")}/raw`);
			if (!r.ok) throw new Error(`HTTP ${r.status}`);
			return r.json();
		},
		enabled: !!slug && !!path,
		staleTime: 5e3
	});
}
function useOutputsCapabilities() {
	return useQuery({
		queryKey: ["outputs-capabilities"],
		queryFn: async () => {
			const r = await fetch("/api/outputs/capabilities");
			if (!r.ok) throw new Error(`HTTP ${r.status}`);
			return r.json();
		},
		staleTime: 6e4
	});
}
function artifactDownloadUrl(slug, path) {
	return `/api/outputs/${slug}/files/${encodeArtifactPath(path)}/download?disposition=attachment`;
}
function artifactInlineUrl(slug, path) {
	return `/api/outputs/${slug}/files/${encodeArtifactPath(path)}/download?disposition=inline`;
}
function artifactPageUrl(slug, path) {
	return `/api/outputs/${slug}/files/${encodeArtifactPath(path)}/page`;
}
var _INLINE_EXT = [
	".pdf",
	".html",
	".htm",
	".png",
	".jpg",
	".jpeg",
	".gif",
	".webp",
	".svg"
];
var _RENDERED_EXT = [
	".md",
	".markdown",
	".txt",
	".json",
	".jsonl",
	".csv",
	".yaml",
	".yml",
	".toml",
	".log",
	".py",
	".ts",
	".tsx",
	".js",
	".jsx",
	".css",
	".sh",
	".ps1"
];
function classifyArtifact(name) {
	const lower = name.toLowerCase();
	if (_INLINE_EXT.some((e) => lower.endsWith(e))) return "inline";
	if (_RENDERED_EXT.some((e) => lower.endsWith(e))) return "rendered";
	return "opaque";
}
function artifactOpenUrl(slug, path) {
	const kind = classifyArtifact(path);
	const enc = encodeArtifactPath(path);
	if (kind === "rendered") return `/api/outputs/${slug}/files/${enc}/view`;
	if (kind === "inline") return `/api/outputs/${slug}/files/${enc}/download?disposition=inline`;
	return null;
}
async function revealArtifact(slug, path) {
	const r = await fetch(`/api/outputs/${slug}/files/${encodeArtifactPath(path)}/reveal`, { method: "POST" });
	if (!r.ok) throw new Error(`HTTP ${r.status}`);
}
async function revealOutput(slug) {
	const r = await fetch(`/api/outputs/${encodeURIComponent(slug)}/open`, { method: "POST" });
	if (!r.ok) throw new Error(`HTTP ${r.status}`);
}
var DeleteOutputError = class extends Error {
	constructor(status) {
		super(`HTTP ${status}`);
		this.status = status;
	}
};
async function deleteOutput(slug, path) {
	const url = path === null ? `/api/outputs/${encodeURIComponent(slug)}` : `/api/outputs/${encodeURIComponent(slug)}/files/${encodeArtifactPath(path)}`;
	const r = await fetch(url, { method: "DELETE" });
	if (!r.ok) throw new DeleteOutputError(r.status);
	return await r.json();
}
function useOpeners() {
	return useQuery({
		queryKey: ["outputs-openers"],
		queryFn: async () => {
			const r = await fetch("/api/outputs/openers");
			if (!r.ok) throw new Error(`HTTP ${r.status}`);
			return (await r.json()).openers ?? [];
		},
		staleTime: 6e4
	});
}
function usePreferredOpener() {
	return useQuery({
		queryKey: ["outputs-preferred-opener"],
		queryFn: async () => {
			const r = await fetch("/api/outputs/preferred-opener");
			if (!r.ok) throw new Error(`HTTP ${r.status}`);
			return (await r.json()).opener ?? "";
		},
		staleTime: 3e4
	});
}
function useSetPreferredOpener() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (opener) => {
			const r = await fetch("/api/outputs/preferred-opener", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ opener })
			});
			if (!r.ok) throw new Error(`HTTP ${r.status}`);
			return await r.json();
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["outputs-preferred-opener"] })
	});
}
async function openArtifactWith(slug, path, opener) {
	const r = await fetch(`/api/outputs/${slug}/files/${encodeArtifactPath(path)}/open-with`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ opener })
	});
	if (!r.ok) throw new Error(`HTTP ${r.status}`);
}
export { usePreferredOpener as _, artifactPageUrl as a, revealArtifact as c, useArtifactsForOutput as d, useCancelMission as f, usePlanForOutput as g, useOutputsList as h, artifactOpenUrl as i, revealOutput as l, useOutputsCapabilities as m, artifactDownloadUrl as n, deleteOutput as o, useOpeners as p, artifactInlineUrl as r, openArtifactWith as s, DeleteOutputError as t, useArtifactFile as u, useRerunMission as v, useSetPreferredOpener as y };
