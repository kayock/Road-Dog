import { Bc as require_jsx_runtime, Ho as useHomeStore, Ln as cn, Xc as require_react, oc as useT, qi as ChevronDown, tl as __toESM, wc as useEventStore } from "./index-BOzhgzD7.js";
import { t as AgentSwatch } from "./AgentSwatch-CHRK4Jk4.js";
import { u as useSocietyRoster } from "./data-v-6nxr7Q.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
const SIDEBAR_AGENTS_MAX = 3;
function SidebarAgents() {
	const t = useT();
	const setActive = useEventStore((s) => s.setActiveSection);
	const onFrontPage = useEventStore((s) => s.activeSection === "chats");
	const openId = useHomeStore((s) => s.agentChatId);
	const openAgentChat = useHomeStore((s) => s.openAgentChat);
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	const roster = useSocietyRoster();
	const all = (0, import_react.useMemo)(() => roster.data && !roster.data.sample ? rankAgents(roster.data.agents) : [], [roster.data]);
	if (all.length === 0) return null;
	const shown = expanded ? all : all.slice(0, 3);
	const hidden = all.length - 3;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-5 px-2",
		"aria-label": t("nav.agents"),
		"data-testid": "sidebar-agents",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "px-3 pb-1.5 text-sm text-muted-foreground",
				children: t("nav.agents")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-px",
				children: shown.map((agent) => {
					const active = onFrontPage && openId === agent.agentId;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							openAgentChat(agent.agentId);
							setActive("chats");
						},
						title: agent.name,
						"aria-current": active ? "page" : void 0,
						"data-testid": "sidebar-agent-row",
						className: cn("flex h-8 w-full items-center gap-3 rounded-lg px-3 text-left text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", active ? "jarvis-nav-active bg-secondary text-foreground-strong" : "text-foreground hover:bg-secondary"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "-ml-0.5 flex h-5 w-5 shrink-0 items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentSwatch, {
									agent,
									size: 20
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 flex-1 truncate",
								children: agent.name
							}),
							agent.state === "working" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "h-1.5 w-1.5 shrink-0 rounded-full bg-accent animate-jarvis-pulse"
							})
						]
					}) }, agent.agentId);
				})
			}),
			hidden > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setExpanded((v) => !v),
				"aria-expanded": expanded,
				"data-testid": "sidebar-agents-more",
				className: "flex h-8 w-full items-center gap-3 rounded-lg px-3 text-left text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
						"aria-hidden": true,
						strokeWidth: 1.75,
						className: cn("h-[18px] w-[18px] shrink-0 transition-transform", expanded && "rotate-180")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-0 flex-1 truncate text-sm",
						children: t(expanded ? "sidebar.show_less" : "sidebar.show_all")
					}),
					!expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "shrink-0 text-sm tabular-nums text-foreground-faint",
						children: ["+", hidden]
					})
				]
			})
		]
	});
}
function rankAgents(agents) {
	return agents.filter((a) => a.tier !== "lead" && a.lifecycle !== "archived").sort((a, b) => (b.stats?.runs ?? 0) - (a.stats?.runs ?? 0) || (b.stats?.lastActiveMs ?? 0) - (a.stats?.lastActiveMs ?? 0) || (b.createdMs ?? 0) - (a.createdMs ?? 0));
}
function mostUsedAgents(agents) {
	return rankAgents(agents).slice(0, 3);
}
export { rankAgents as i, SidebarAgents as n, mostUsedAgents as r, SIDEBAR_AGENTS_MAX as t };
