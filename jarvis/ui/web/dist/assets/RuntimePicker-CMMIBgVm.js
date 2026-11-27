import { Bc as require_jsx_runtime, Ln as cn, Oc as useQuery, Xc as require_react, ji as LoaderCircle, oc as useT, tl as __toESM, zc as useQueryClient } from "./index-BOzhgzD7.js";
import { p as AGENT_RUNTIMES } from "./useModelMenuData-TwmHE5pI.js";
import { n as RuntimeMark } from "./RuntimeBadge-BWtE1Tji.js";
async function json(url, init) {
	const res = await fetch(url, init);
	if (!res.ok) {
		const body = await res.json().catch(() => null);
		throw new Error(typeof body?.detail === "string" ? body.detail : `HTTP ${res.status}`);
	}
	return await res.json();
}
function fetchAgentRuntimes(refresh = false) {
	return json(`/api/agent-runtimes${refresh ? "?refresh=true" : ""}`);
}
async function ensureAgentRuntime(runtime) {
	return (await json(`/api/agent-runtimes/${encodeURIComponent(runtime)}/ensure`, { method: "POST" })).job;
}
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
const AGENT_RUNTIMES_QUERY_KEY = ["agent-runtimes"];
function useAgentRuntimes() {
	return useQuery({
		queryKey: AGENT_RUNTIMES_QUERY_KEY,
		queryFn: () => fetchAgentRuntimes(),
		staleTime: 6e4,
		refetchInterval: (query) => query.state.data?.runtimes?.some((row) => row.job?.state === "running") ? 2e3 : false
	});
}
function fill(text, ...values) {
	return values.reduce((out, value, index) => out.replace(`{${index}}`, value), text);
}
function statusesByName(data) {
	const rows = Array.isArray(data?.runtimes) ? data.runtimes : [];
	return new Map(rows.map((row) => [row.runtime, row]));
}
function setupState(status) {
	if (!status) return "pending";
	if (status.job?.state === "running") return "setting_up";
	if (status.ready) return "ready";
	return status.job?.state === "failed" ? "failed" : "pending";
}
function useEnsureRuntime() {
	const client = useQueryClient();
	const [error, setError] = (0, import_react.useState)(null);
	return {
		ensure: (0, import_react.useCallback)(async (runtime) => {
			setError(null);
			try {
				await ensureAgentRuntime(runtime);
			} catch (exc) {
				setError(exc instanceof Error ? exc.message : String(exc));
			}
			await client.invalidateQueries({ queryKey: AGENT_RUNTIMES_QUERY_KEY });
		}, [client]),
		error
	};
}
function RuntimeSetupNote({ status, onRetry, error }) {
	const t = useT();
	const state = setupState(status);
	if (state === "ready" && status?.untested) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs text-muted-foreground",
		"data-testid": "runtime-untested",
		children: fill(t("society.runtime.untested_hint"), t(`society.runtime.${status.runtime}`))
	});
	if (state === "ready" || !status) return null;
	const label = t(`society.runtime.${status.runtime}`);
	const failure = error ?? (state === "failed" ? status.job?.message || status.job?.log_tail.at(-1) || status.problem : null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
		"data-testid": "runtime-setup",
		children: [
			state === "setting_up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
				className: "size-3 animate-spin",
				"aria-hidden": true
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fill(t(state === "setting_up" ? "society.runtime.setting_up_hint" : "society.runtime.auto_setup_hint"), label) }),
			failure ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				role: "alert",
				className: "w-full text-destructive",
				children: fill(t("society.runtime.setup_failed"), failure)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onRetry,
				className: "rounded-full border border-border px-2 py-0.5 text-xs text-foreground hover:bg-secondary",
				children: t("society.runtime.retry")
			})] }) : null
		]
	});
}
function RuntimeChoice({ value, onChange, disabled = false }) {
	const t = useT();
	const runtimes = useAgentRuntimes();
	const byName = statusesByName(runtimes.data);
	const { ensure, error } = useEnsureRuntime();
	const chosen = value === "jarvis" ? void 0 : byName.get(value);
	const chosenState = value === "jarvis" ? "ready" : setupState(chosen);
	const id = (0, import_react.useId)();
	const cards = (0, import_react.useRef)({});
	const asked = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const loaded = Boolean(runtimes.data);
	(0, import_react.useEffect)(() => {
		if (value === "jarvis" || !loaded || chosenState !== "pending" || asked.current.has(value)) return;
		asked.current.add(value);
		ensure(value);
	}, [
		value,
		loaded,
		chosenState,
		ensure
	]);
	function onKeyDown(event, runtime) {
		const step = {
			ArrowRight: 1,
			ArrowDown: 1,
			ArrowLeft: -1,
			ArrowUp: -1
		}[event.key];
		if (!step) return;
		event.preventDefault();
		const next = AGENT_RUNTIMES[(AGENT_RUNTIMES.indexOf(runtime) + step + AGENT_RUNTIMES.length) % AGENT_RUNTIMES.length];
		onChange(next);
		cards.current[next]?.focus();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2",
		"data-testid": "runtime-choice",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-2",
				role: "radiogroup",
				"aria-label": t("society.runtime.title"),
				"aria-describedby": `${id}-hint`,
				children: AGENT_RUNTIMES.map((runtime) => {
					const label = t(`society.runtime.${runtime}`);
					const state = runtime === "jarvis" ? null : setupState(byName.get(runtime));
					const untested = state === "ready" && Boolean(byName.get(runtime)?.untested);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						ref: (node) => {
							cards.current[runtime] = node;
						},
						type: "button",
						role: "radio",
						"aria-checked": value === runtime,
						"aria-label": label,
						"aria-describedby": `${id}-state-${runtime}`,
						tabIndex: value === runtime ? 0 : -1,
						disabled,
						onClick: () => onChange(runtime),
						onKeyDown: (event) => onKeyDown(event, runtime),
						className: cn("flex flex-col items-start gap-1 rounded-lg border p-2.5 text-left transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", value === runtime ? "border-border-strong bg-secondary text-foreground" : "border-border text-muted-foreground hover:bg-secondary"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 text-sm font-medium text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuntimeMark, {
								runtime,
								label
							}), label]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							id: `${id}-state-${runtime}`,
							className: "inline-flex items-center gap-1 text-[11px] leading-snug",
							children: [state === "setting_up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								className: "size-3 animate-spin",
								"aria-hidden": true
							}) : null, t(state === null ? "society.runtime.built_in" : state === "ready" ? untested ? "society.runtime.ready_untested" : "society.runtime.ready" : state === "setting_up" ? "society.runtime.setting_up" : "society.runtime.auto_setup")]
						})]
					}, runtime);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				id: `${id}-hint`,
				className: "text-xs text-muted-foreground",
				children: t(`society.runtime.${value}_hint`)
			}),
			value !== "jarvis" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuntimeSetupNote, {
				status: chosen,
				error,
				onRetry: () => void ensure(value)
			}) : null
		]
	});
}
function RuntimeStatusRow({ runtime }) {
	const t = useT();
	const runtimes = useAgentRuntimes();
	const { ensure, error } = useEnsureRuntime();
	const status = runtime === "jarvis" ? void 0 : statusesByName(runtimes.data).get(runtime);
	const label = t(`society.runtime.${runtime}`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": "runtime-status",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuntimeMark, {
				runtime,
				label
			}), fill(t("society.runtime.runs_on"), label)]
		}), runtime !== "jarvis" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuntimeSetupNote, {
			status,
			error,
			onRetry: () => void ensure(runtime)
		}) : null]
	});
}
export { RuntimeStatusRow as n, useAgentRuntimes as r, RuntimeChoice as t };
