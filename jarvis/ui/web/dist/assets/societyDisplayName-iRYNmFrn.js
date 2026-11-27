import { Tc as NEUTRAL_ASSISTANT_NAME } from "./index-BOzhgzD7.js";
function societyDisplayName(agent, assistantName) {
	if (agent.tier === "lead") return (assistantName || "").trim() || "Assistant";
	return agent.name;
}
export { societyDisplayName as t };
