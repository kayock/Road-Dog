import { n as WorkTrace } from "./WorkTrace-CQMphqAB.js";
import { Bc as require_jsx_runtime, Xc as require_react, oc as useT, tl as __toESM } from "./index-BOzhgzD7.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function toolBlock(step, name, input) {
	return {
		kind: "tool",
		callId: step.id,
		name,
		input,
		output: step.error ?? step.result ?? (step.status === "active" ? null : ""),
		isError: step.status === "error",
		durationMs: step.durationMs ?? null,
		startedMs: step.startedTs,
		approval: step.denied ? {
			approvalId: "",
			summary: step.error ?? "",
			decision: "deny"
		} : null
	};
}
function stepsToBlocks(steps, live, label) {
	const blocks = [];
	for (const step of steps) {
		if (step.kind === "brain") continue;
		if (step.kind === "tool") blocks.push(toolBlock(step, step.detail || label(step.labelKey), step.args));
		else if (step.kind === "note" && step.status === "error") blocks.push(toolBlock(step, label(step.labelKey), step.detail ? { text: step.detail } : {}));
		else if (step.kind === "thought" || step.kind === "note") blocks.push({
			kind: "reasoning",
			id: step.id,
			text: step.detail ?? "",
			durationMs: step.durationMs ?? null,
			live: live && step.status === "active",
			startedMs: step.startedTs
		});
		else if (step.kind === "computer") blocks.push(toolBlock(step, "computer_use", step.detail ? { target: step.detail } : {}));
		else blocks.push(toolBlock(step, "spawn_worker", step.detail ? { task: step.detail } : {}));
	}
	return blocks;
}
function VoiceWorkTrace({ steps, live = false, durationMs, className }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkTrace, {
		blocks: (0, import_react.useMemo)(() => stepsToBlocks(steps, live, t), [
			steps,
			live,
			t
		]),
		status: live ? "running" : "done",
		startedMs: steps[0]?.startedTs ?? Date.now(),
		durationMs: durationMs ?? null,
		className,
		companion: true
	});
}
export { stepsToBlocks as n, VoiceWorkTrace as t };
