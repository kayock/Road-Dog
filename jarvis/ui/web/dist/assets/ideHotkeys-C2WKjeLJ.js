import { D as appZoomChordMatches, an as parseChord } from "./index-BOzhgzD7.js";
const STICKY_ACTIONS = new Set([
	"spawn",
	"split",
	"focus-pane",
	"swap-pane",
	"maximize-pane",
	"balance",
	"toggle-voice",
	"workspace-index",
	"workspace-step"
]);
const DEFAULT_LEADER = "ctrl+b";
function isLeaderChord(event, combo = DEFAULT_LEADER) {
	if (!combo) return false;
	if (combo !== "ctrl+b") return appZoomChordMatches(event, combo);
	const isB = event.code === "KeyB" || !event.code && event.key.toLowerCase() === "b";
	return event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && isB;
}
function leaderPassthrough(combo = DEFAULT_LEADER) {
	const { mods, keys } = parseChord(combo);
	const letter = keys.length === 1 && /^[a-z]$/.test(keys[0]) ? keys[0] : null;
	if (!letter || !mods.has("ctrl") || mods.size !== 1) return null;
	return String.fromCharCode(letter.charCodeAt(0) - 96);
}
const RESERVED_ROOT_KEYS = new Set([
	"e",
	"f",
	"m",
	"n",
	"p",
	"q",
	"r",
	"v",
	"w",
	"z"
]);
var PREFERRED_AGENT_KEYS = {
	claude: "c",
	codex: "x",
	cursor: "u",
	opencode: "o",
	kimi: "k",
	glm: "l",
	"grok-build": "g",
	antigravity: "a",
	gemini: "i",
	"deepseek-harness": "d"
};
function assignAgentKeys(agents) {
	const taken = new Set(RESERVED_ROOT_KEYS);
	const assigned = /* @__PURE__ */ new Map();
	for (const agent of agents) {
		const preferred = PREFERRED_AGENT_KEYS[agent.name];
		if (preferred && !taken.has(preferred)) {
			assigned.set(agent.name, preferred);
			taken.add(preferred);
		}
	}
	for (const agent of agents) {
		if (assigned.has(agent.name)) continue;
		const letter = [...`${agent.name}${agent.label}abcdefghijklmnopqrstuvwxyz`.toLowerCase().replace(/[^a-z]/g, "")].find((char) => !taken.has(char));
		if (letter) {
			assigned.set(agent.name, letter);
			taken.add(letter);
		}
	}
	return agents.flatMap((agent) => {
		const key = assigned.get(agent.name);
		return key ? [{
			...agent,
			key
		}] : [];
	});
}
var ARROWS = {
	ArrowLeft: "left",
	ArrowRight: "right",
	ArrowUp: "up",
	ArrowDown: "down"
};
var SPLIT_FOR_ARROW = {
	left: "left",
	right: "right",
	up: "above",
	down: "down"
};
var MODIFIER_KEYS = new Set([
	"Shift",
	"Control",
	"Alt",
	"Meta",
	"AltGraph",
	"CapsLock",
	"OS"
]);
function letterOf(event) {
	const key = event.key.length === 1 ? event.key.toLowerCase() : "";
	return /^[a-z]$/.test(key) ? key : null;
}
function digitOf(event) {
	const match = /^(?:Digit|Numpad)([1-9])$/.exec(event.code) ?? /^([1-9])$/.exec(event.key);
	return match ? Number(match[1]) : null;
}
function resolveHotkey(step, event, agents) {
	if (MODIFIER_KEYS.has(event.key)) return { type: "ignore" };
	if (event.key === "Escape") return { type: "close" };
	const back = {
		type: "step",
		step: { menu: "root" }
	};
	if (event.key === "Backspace") return step.menu === "root" ? { type: "unknown" } : back;
	if (step.menu === "help") return back;
	if (event.ctrlKey || event.metaKey || event.altKey) return { type: "release" };
	const arrow = ARROWS[event.key];
	const letter = letterOf(event);
	if (step.menu === "direction") {
		if (arrow) return {
			type: "run",
			action: {
				kind: "spawn",
				agent: step.agent,
				direction: SPLIT_FOR_ARROW[arrow]
			}
		};
		if (event.key === "Enter" || event.key === " ") return {
			type: "run",
			action: {
				kind: "spawn",
				agent: step.agent,
				direction: null
			}
		};
		return back;
	}
	if (step.menu === "workspace") {
		const workspaceKeys = {
			n: { kind: "new-workspace" },
			t: { kind: "new-worktree-workspace" },
			r: { kind: "rename-workspace" },
			q: { kind: "close-workspace" },
			g: { kind: "git-panel" },
			o: { kind: "workspace-options" },
			p: { kind: "connect-project" }
		};
		if (letter && workspaceKeys[letter]) return {
			type: "run",
			action: workspaceKeys[letter]
		};
		if (arrow === "right" || arrow === "down") return {
			type: "run",
			action: {
				kind: "workspace-step",
				step: 1
			}
		};
		if (arrow === "left" || arrow === "up") return {
			type: "run",
			action: {
				kind: "workspace-step",
				step: -1
			}
		};
		const digit$1 = digitOf(event);
		if (digit$1) return {
			type: "run",
			action: {
				kind: "workspace-index",
				index: digit$1 - 1
			}
		};
		return back;
	}
	if (arrow) return {
		type: "run",
		action: {
			kind: event.shiftKey ? "swap-pane" : "focus-pane",
			direction: arrow
		}
	};
	if (event.key === "Tab") return {
		type: "run",
		action: {
			kind: "workspace-step",
			step: event.shiftKey ? -1 : 1
		}
	};
	if (event.key === "?") return {
		type: "step",
		step: { menu: "help" }
	};
	if (event.key === "+") return {
		type: "run",
		action: { kind: "agent-picker" }
	};
	if (event.key === "-") return {
		type: "run",
		action: {
			kind: "split",
			direction: "down"
		}
	};
	const digit = digitOf(event);
	if (digit) return {
		type: "run",
		action: {
			kind: "workspace-index",
			index: digit - 1
		}
	};
	if (letter && event.shiftKey) {
		const shifted = {
			n: { kind: "new-workspace" },
			w: { kind: "rename-workspace" },
			d: { kind: "close-workspace" }
		};
		return shifted[letter] ? {
			type: "run",
			action: shifted[letter]
		} : { type: "unknown" };
	}
	if (letter) {
		const command = {
			e: { kind: "balance" },
			f: { kind: "fork-pane" },
			m: { kind: "toggle-voice" },
			n: {
				kind: "workspace-step",
				step: 1
			},
			p: {
				kind: "workspace-step",
				step: -1
			},
			q: { kind: "close-pane" },
			r: { kind: "rename-pane" },
			v: {
				kind: "split",
				direction: "right"
			},
			w: { menu: "workspace" },
			z: { kind: "maximize-pane" }
		}[letter];
		if (command) return "menu" in command ? {
			type: "step",
			step: command
		} : {
			type: "run",
			action: command
		};
		const agent = agents.find((entry) => entry.key === letter);
		if (agent) return {
			type: "step",
			step: {
				menu: "direction",
				agent: agent.name,
				label: agent.label
			}
		};
	}
	return { type: "unknown" };
}
function modeBar(step, agents, leaderCaps = ["Ctrl", "B"]) {
	if (step.menu === "direction") return {
		badge: step.label.toUpperCase(),
		hints: [
			{
				keys: ["→"],
				label: "right"
			},
			{
				keys: ["←"],
				label: "left"
			},
			{
				keys: ["↑"],
				label: "above"
			},
			{
				keys: ["↓"],
				label: "below"
			},
			{
				keys: ["Enter"],
				label: "even grid"
			},
			{
				keys: ["⌫"],
				label: "back"
			}
		]
	};
	if (step.menu === "workspace") return {
		badge: "WORKSPACE",
		hints: [
			{
				keys: ["N"],
				label: "new"
			},
			{
				keys: ["T"],
				label: "worktree"
			},
			{
				keys: ["R"],
				label: "rename"
			},
			{
				keys: ["Q"],
				label: "close"
			},
			{
				keys: ["G"],
				label: "git"
			},
			{
				keys: ["O"],
				label: "options"
			},
			{
				keys: ["P"],
				label: "connect folder"
			},
			{
				keys: ["←→"],
				label: "switch"
			},
			{
				keys: ["⌫"],
				label: "back"
			}
		]
	};
	if (step.menu === "help") return {
		badge: "KEYS",
		hints: [{
			keys: ["any key"],
			label: "back"
		}]
	};
	return {
		badge: "PREFIX",
		hints: [
			...agents.map((agent) => ({
				keys: [agent.key.toUpperCase()],
				label: agent.label
			})),
			{
				keys: ["V", "-"],
				label: "split"
			},
			{
				keys: ["←↑→↓"],
				label: "move"
			},
			{
				keys: ["Z"],
				label: "zoom"
			},
			{
				keys: ["Q"],
				label: "close"
			},
			{
				keys: ["W"],
				label: "workspaces"
			},
			{
				keys: ["?"],
				label: "all keys"
			},
			{
				keys: [...leaderCaps],
				label: `send ${leaderCaps.join("+")}`
			}
		]
	};
}
function hotkeyHints(step, agents, leaderCaps = ["Ctrl", "B"]) {
	if (step.menu === "direction") return [{
		title: `Open ${step.label}`,
		hints: [
			{
				keys: ["→"],
				label: "To the right"
			},
			{
				keys: ["←"],
				label: "To the left"
			},
			{
				keys: ["↑"],
				label: "Above"
			},
			{
				keys: ["↓"],
				label: "Below"
			},
			{
				keys: ["Enter"],
				label: "Even grid"
			}
		]
	}];
	if (step.menu === "workspace") return [{
		title: "Workspace",
		hints: [
			{
				keys: ["N"],
				label: "New workspace"
			},
			{
				keys: ["T"],
				label: "New worktree workspace"
			},
			{
				keys: ["R"],
				label: "Rename workspace"
			},
			{
				keys: ["Q"],
				label: "Close workspace"
			},
			{
				keys: ["G"],
				label: "Git panel"
			},
			{
				keys: ["O"],
				label: "Workspace options"
			},
			{
				keys: ["P"],
				label: "Connect a project folder"
			},
			{
				keys: ["←", "→"],
				label: "Previous / next workspace"
			},
			{
				keys: ["1–9"],
				label: "Go to workspace 1–9"
			}
		]
	}];
	return [
		{
			title: "New pane",
			hints: [
				...agents.map((agent) => ({
					keys: [agent.key.toUpperCase()],
					label: `${agent.label}, then an arrow`
				})),
				{
					keys: ["V"],
					label: "Split right, same agent"
				},
				{
					keys: ["-"],
					label: "Split below, same agent"
				},
				{
					keys: ["+"],
					label: "Choose agent…"
				}
			]
		},
		{
			title: "Panes",
			hints: [
				{
					keys: ["←↑→↓"],
					label: "Focus neighbor"
				},
				{
					keys: ["Shift", "←↑→↓"],
					label: "Swap with neighbor"
				},
				{
					keys: ["Z"],
					label: "Maximize / restore"
				},
				{
					keys: ["R"],
					label: "Rename pane"
				},
				{
					keys: ["F"],
					label: "Fork pane"
				},
				{
					keys: ["Q"],
					label: "Close pane"
				},
				{
					keys: ["E"],
					label: "Even out layout"
				}
			]
		},
		{
			title: "Workspaces",
			hints: [
				{
					keys: ["W"],
					label: "Workspace menu…"
				},
				{
					keys: ["1–9"],
					label: "Go to workspace"
				},
				{
					keys: ["N", "P"],
					label: "Next / previous workspace"
				},
				{
					keys: ["Shift", "N"],
					label: "New workspace"
				},
				{
					keys: ["Shift", "W"],
					label: "Rename workspace"
				},
				{
					keys: ["Shift", "D"],
					label: "Close workspace"
				},
				{
					keys: ["M"],
					label: "Voice bubble"
				},
				{
					keys: [...leaderCaps],
					label: `Send ${leaderCaps.join("+")} to the pane`
				}
			]
		}
	];
}
function neighborInDirection(boxes, from, direction) {
	const box = boxes[from];
	if (!box) return null;
	const horizontal = direction === "left" || direction === "right";
	const sign = direction === "left" || direction === "up" ? -1 : 1;
	const centre = horizontal ? box.x + box.w / 2 : box.y + box.h / 2;
	const crossCentre = horizontal ? box.y + box.h / 2 : box.x + box.w / 2;
	let best = null;
	boxes.forEach((other, index) => {
		if (!other || index === from) return;
		const distance = ((horizontal ? other.x + other.w / 2 : other.y + other.h / 2) - centre) * sign;
		const overlap = horizontal ? Math.min(box.y + box.h, other.y + other.h) - Math.max(box.y, other.y) : Math.min(box.x + box.w, other.x + other.w) - Math.max(box.x, other.x);
		if (distance <= .001 || overlap <= .001) return;
		const cross = Math.abs((horizontal ? other.y + other.h / 2 : other.x + other.w / 2) - crossCentre);
		if (!best || distance < best.distance || distance === best.distance && cross < best.cross) best = {
			index,
			distance,
			cross
		};
	});
	return best ? best.index : null;
}
const PANE_COMMAND_EVENT = "jarvis:ide-pane-command";
const PANE_INPUT_EVENT = "jarvis:ide-pane-input";
export { hotkeyHints as a, modeBar as c, assignAgentKeys as i, neighborInDirection as l, PANE_INPUT_EVENT as n, isLeaderChord as o, STICKY_ACTIONS as r, leaderPassthrough as s, PANE_COMMAND_EVENT as t, resolveHotkey as u };
