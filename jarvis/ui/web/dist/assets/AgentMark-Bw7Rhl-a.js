import { Bc as require_jsx_runtime, Ln as cn, Xc as require_react, fi as SquareTerminal, tl as __toESM } from "./index-BOzhgzD7.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var AGENT_LOGOS = {
	antigravity: {
		url: "/provider-logos/antigravity.svg",
		ground: "ink"
	},
	claude: {
		url: "/provider-logos/claude.svg",
		ground: "ink"
	},
	codex: {
		url: "/provider-logos/openai.svg",
		ground: "ink"
	},
	cursor: {
		url: "/agent-logos/cursor.svg",
		ground: "ink"
	},
	"deepseek-harness": {
		url: "/agent-logos/deepseek.svg",
		ground: "ink"
	},
	glm: {
		url: "/agent-logos/zai.svg",
		ground: "any"
	},
	"grok-build": {
		url: "/provider-logos/grok.svg",
		ground: "ink"
	},
	kimi: {
		url: "/agent-logos/kimi.svg",
		ground: "dark"
	},
	opencode: {
		url: "/agent-logos/opencode.svg",
		ground: "dark"
	}
};
function agentLogoAsset(agent) {
	return AGENT_LOGOS[agent] ?? null;
}
function AgentMark({ agent, label, className, size = "md", variant = "boxed", logoUrl }) {
	const [failedLogo, setFailedLogo] = (0, import_react.useState)(null);
	const asset = logoUrl ? {
		url: logoUrl,
		ground: "any"
	} : AGENT_LOGOS[agent];
	const failed = failedLogo != null && failedLogo === asset?.url;
	const monogram = label.trim().slice(0, 2).toUpperCase() || "?";
	const plain = variant === "plain";
	const drawn = agent !== "shell" && asset && !failed;
	const inked = drawn && asset.ground === "ink";
	const canvased = drawn && asset.ground === "dark";
	const sizeClass = plain ? size === "sm" ? "h-4 w-4" : "h-5 w-5" : size === "sm" ? "h-7 w-7 rounded-[5px]" : size === "lg" ? "h-11 w-11 rounded-control" : "h-9 w-9 rounded-control";
	const glyphClass = plain ? "h-full w-full" : size === "sm" ? "h-3.5 w-3.5" : size === "lg" ? "h-6 w-6" : "h-5 w-5";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-testid": `agent-mark-${agent}`,
		"data-logo": drawn ? asset.url : void 0,
		"data-ground": asset?.ground ?? "none",
		"aria-hidden": "true",
		className: cn("inline-flex shrink-0 items-center justify-center overflow-hidden text-micro font-bold tracking-tight text-muted-foreground", plain ? canvased ? "rounded-[4px] bg-scrim/95 p-px" : "opacity-70" : canvased ? "border border-border bg-scrim/95" : "border border-border bg-background", sizeClass, className),
		children: agent === "shell" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareTerminal, { className: plain || size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4" }) : inked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("block bg-foreground", glyphClass),
			style: {
				WebkitMaskImage: `url("${asset.url}")`,
				maskImage: `url("${asset.url}")`,
				WebkitMaskRepeat: "no-repeat",
				maskRepeat: "no-repeat",
				WebkitMaskPosition: "center",
				maskPosition: "center",
				WebkitMaskSize: "contain",
				maskSize: "contain"
			}
		}) : drawn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: asset.url,
			alt: "",
			className: cn("block object-contain", glyphClass),
			onError: () => setFailedLogo(asset.url)
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono",
			children: monogram
		})
	});
}
export { agentLogoAsset as n, AgentMark as t };
