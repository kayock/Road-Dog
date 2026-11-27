import { Bc as require_jsx_runtime, tl as __toESM } from "./index-BOzhgzD7.js";
import { t as VoiceWorkTrace } from "./VoiceWorkTrace-CbMeKDQm.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function ThoughtTraceDisclosure({ trace }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceWorkTrace, {
		steps: trace.steps,
		durationMs: trace.durationMs
	});
}
export { ThoughtTraceDisclosure as t };
