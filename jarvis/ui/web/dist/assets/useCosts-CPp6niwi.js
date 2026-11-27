import { Oc as useQuery } from "./index-BOzhgzD7.js";
const EMPTY_FILTERS = {
	days: 30,
	providers: [],
	models: [],
	roles: [],
	surfaces: [],
	refs: [],
	billing: "all",
	search: ""
};
function hasActiveFilters(f) {
	return f.providers.length > 0 || f.models.length > 0 || f.roles.length > 0 || f.surfaces.length > 0 || f.refs.length > 0 || f.search.trim().length > 0;
}
function toParams(f) {
	const params = new URLSearchParams();
	params.set("days", String(f.days));
	if (f.sinceMs !== void 0) params.set("since_ms", String(Math.floor(f.sinceMs)));
	if (f.untilMs !== void 0) params.set("until_ms", String(Math.floor(f.untilMs)));
	for (const p of f.providers) params.append("provider", p);
	for (const m of f.models) params.append("model", m);
	for (const r of f.roles) params.append("role", r);
	for (const s of f.surfaces) params.append("surface", s);
	for (const r of f.refs) params.append("ref", r);
	if (f.billing !== "all") params.set("billing", f.billing);
	if (f.search.trim()) params.set("search", f.search.trim());
	return params;
}
async function getJson(url, signal) {
	const res = await fetch(url, { signal });
	if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
	return await res.json();
}
function costSummaryQueryOptions(filters) {
	const params = toParams(filters);
	return {
		queryKey: [
			"costs",
			"summary",
			params.toString()
		],
		queryFn: ({ signal }) => getJson(`/api/costs/summary?${params.toString()}`, signal),
		staleTime: 1e4
	};
}
function costDailyQueryOptions(filters) {
	const params = toParams(filters);
	return {
		queryKey: [
			"costs",
			"daily",
			params.toString()
		],
		queryFn: ({ signal }) => getJson(`/api/costs/daily?${params.toString()}`, signal),
		staleTime: 1e4
	};
}
function useCostSummary(filters, enabled = true) {
	return useQuery({
		...costSummaryQueryOptions(filters),
		enabled,
		refetchInterval: 12e4,
		placeholderData: (prev) => prev
	});
}
function useCostDaily(filters) {
	return useQuery({
		...costDailyQueryOptions(filters),
		placeholderData: (prev) => prev
	});
}
function useCostEntries(filters, sort, limit, offset) {
	const params = toParams(filters);
	params.set("sort", sort);
	params.set("limit", String(limit));
	params.set("offset", String(offset));
	return useQuery({
		queryKey: [
			"costs",
			"entries",
			params.toString()
		],
		queryFn: ({ signal }) => getJson(`/api/costs/entries?${params.toString()}`, signal),
		staleTime: 1e4,
		placeholderData: (prev) => prev
	});
}
function useCostPricing(days, enabled) {
	return useQuery({
		queryKey: [
			"costs",
			"pricing",
			days
		],
		queryFn: ({ signal }) => getJson(`/api/costs/pricing?days=${days}`, signal),
		enabled,
		staleTime: 5 * 6e4
	});
}
export { useCostEntries as a, useCostDaily as i, costSummaryQueryOptions as n, useCostPricing as o, hasActiveFilters as r, useCostSummary as s, EMPTY_FILTERS as t };
