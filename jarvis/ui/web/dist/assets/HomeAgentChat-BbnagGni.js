import "./CodingThreadLink-DIqtFuRz.js";
import "./TraceTimeline-hpw2Rng1.js";
import "./ThreadTimeline-CItnaA8w.js";
import "./AgentComposer-DoSrpnSm.js";
import "./ProviderLogo-BxoN_q6P.js";
import { Bc as require_jsx_runtime, Gs as fill, Ho as useHomeStore, Qi as ArrowLeft, Xc as require_react, la as startNewTextChat, nc as useLocaleChunk, oc as useT, tl as __toESM, wc as useEventStore } from "./index-BOzhgzD7.js";
import "./lib-BoWxqGgd.js";
import "./petStage-CMRGLgJ7.js";
import "./toolDiff-CkONUaSH.js";
import "./visualFence-DOGBhazZ.js";
import "./McpLogo-Xry4yg3E.js";
import "./AgentMark-Bw7Rhl-a.js";
import "./combobox-BL3mwl7r.js";
import "./select-vogX_D37.js";
import "./switch-hmH-TV55.js";
import "./useModelMenuData-TwmHE5pI.js";
import "./agentProviderPrefs-3Ey03m7Z.js";
import { t as AgentSwatch } from "./AgentSwatch-CHRK4Jk4.js";
import "./appearance-CnI1Xhkn.js";
import "./CompanionMark-BvabJfVP.js";
import "./figureRecipe-BRnaWN-p.js";
import { u as useSocietyRoster } from "./data-v-6nxr7Q.js";
import "./DictationButton-Bx-A0TOD.js";
import "./societyDisplayName-iRYNmFrn.js";
import "./RuntimeBadge-BWtE1Tji.js";
import "./RuntimePicker-CMMIBgVm.js";
import { AgentChatPanel } from "./AgentChatPanel-D5tfhvzP.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function HomeAgentChat({ agentId }) {
	const t = useT();
	useLocaleChunk("society");
	const assistantName = useEventStore((s) => s.assistantName);
	const openAgentChat = useHomeStore((s) => s.openAgentChat);
	const roster = useSocietyRoster();
	const agents = roster.data && !roster.data.sample ? roster.data.agents : [];
	const agent = agents.find((a) => a.agentId === agentId) ?? null;
	(0, import_react.useEffect)(() => {
		if (roster.isSuccess && !agent) openAgentChat(null);
	}, [
		agent,
		openAgentChat,
		roster.isSuccess
	]);
	if (!agent) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "status",
		className: "flex min-h-0 flex-1 items-center justify-center text-sm text-muted-foreground",
		children: t("common.loading")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		"data-testid": "home-agent-chat",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex h-12 shrink-0 items-center gap-2.5 px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentSwatch, {
					agent,
					size: 22
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 truncate text-sm font-medium text-foreground-strong",
					children: agent.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => startNewTextChat(),
					"data-testid": "home-agent-chat-back",
					className: "ml-auto flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						"aria-hidden": true,
						className: "h-3.5 w-3.5"
					}), fill(t("home.back_to_assistant"), { name: assistantName })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-0 w-full flex-1 flex-col",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentChatPanel, {
				agent,
				roster: agents
			}, agent.agentId)
		})]
	});
}
export { HomeAgentChat as default };
