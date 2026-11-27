import "./AgenticTerminal-CvzA6BhK.js";
import "./ProviderLogo-BxoN_q6P.js";
import "./RosterRail-GTU8l98S.js";
import { Bc as require_jsx_runtime, nc as useLocaleChunk, tl as __toESM } from "./index-BOzhgzD7.js";
import "./petStage-CMRGLgJ7.js";
import "./codeEditor-BpQSQnN9.js";
import "./AgentMark-Bw7Rhl-a.js";
import "./combobox-BL3mwl7r.js";
import "./select-vogX_D37.js";
import "./AgentSwatch-CHRK4Jk4.js";
import "./appearance-CnI1Xhkn.js";
import "./CompanionMark-BvabJfVP.js";
import "./figureRecipe-BRnaWN-p.js";
import "./data-v-6nxr7Q.js";
import "./societyDisplayName-iRYNmFrn.js";
import "./RuntimeBadge-BWtE1Tji.js";
import "./arcadeGames-ChImpaOT.js";
import "./retroGame-GmSLy6cP.js";
import "./badge-yXLOnH3Y.js";
import "./react-three-fiber.esm-Dp0xg4g-.js";
import "./AgentFollower-D67i_Nkd.js";
import "./ToyFigure-DQYSgl5W.js";
import "./useCanvasAwake-5sZXDaXU.js";
import "./toyFigureModel-CWYjWDfN.js";
import "./wardrobe-CURtphLT.js";
import { OfficeStage } from "./OfficeStage-CjxHR5hW.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function JarvisAgentsView({ onSelectAgent, onOpenAgents, onCreateAgent, onOpenGroup, active = true }) {
	if (!useLocaleChunk("society")) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-full min-h-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficeStage, {
			active,
			onOpenLedger: onOpenAgents,
			onSelectAgent,
			onCreateAgent,
			onOpenGroup
		})
	});
}
export { JarvisAgentsView };
