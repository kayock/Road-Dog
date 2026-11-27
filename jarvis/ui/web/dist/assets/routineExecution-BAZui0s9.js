import { na as createLucideIcon } from "./index-BOzhgzD7.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Send = createLucideIcon("Send", [["path", {
	d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
	key: "1ffxy3"
}], ["path", {
	d: "m21.854 2.147-10.94 10.939",
	key: "12cjpa"
}]]);
var envelope = /^Scheduled routine ([^\s.]+)\. Follow your CURRENT standing instructions(?: and permissions)?\.\r?\n(?:This execution has its own background chat with bypass permissions\.\r?\n)?Use your memory and conversation archive for prior results\. For information watches, check sources and dates, remember last-seen items, and report only meaningful new findings\.\r?\n\r?\n/;
function routineTask(text) {
	const match = envelope.exec(text);
	return match ? text.slice(match[0].length).trim() : null;
}
function routineTaskId(text) {
	return envelope.exec(text)?.[1] ?? null;
}
function legacyRoutineEvents(events, target) {
	const legacy = target.legacy;
	if (!legacy) return [];
	const matches = [];
	for (let index = 0; index < events.length; index += 1) {
		const message = events[index];
		if (message.kind !== "user_message" || routineTaskId(String(message.payload.text ?? "")) !== legacy.taskId) continue;
		if (legacy.messageId && legacy.messageId !== `u-${message.seq || message.ts_ms}`) continue;
		let next = index + 1;
		while (next < events.length && events[next].kind !== "user_message") next += 1;
		const span = events.slice(index + 1, next);
		const turn = span.find((event) => event.kind === "turn_started");
		if (!turn?.payload.turn_id) continue;
		const own = span.filter((event) => event.payload.turn_id === turn.payload.turn_id);
		if (!legacy.messageId) if (legacy.startedMs !== void 0) {
			if (message.ts_ms < legacy.startedMs - 2e3) continue;
			if (legacy.finishedMs === void 0 || message.ts_ms > legacy.finishedMs + 2e3) continue;
		} else {
			const finished = own.find((event) => event.kind === "turn_finished");
			if (!finished || legacy.finishedMs === void 0 || Math.abs(finished.ts_ms - legacy.finishedMs) > 5e3) continue;
		}
		matches.push([message, ...own]);
	}
	return matches.length === 1 ? matches[0] : [];
}
export { Send as i, routineTask as n, routineTaskId as r, legacyRoutineEvents as t };
