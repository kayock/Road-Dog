import { c as sprite, i as drawSprite, n as drawNumber, o as emitBurst, r as drawParticles, s as makeParticles, t as clamp, u as stepParticles } from "./games3Kit-Cb6PLO-y.js";
const WIDTH = 224;
const HEIGHT = 256;
const CELL = 16;
const HOME_ROW = 1;
const START_ROW = 13;
const START_X = 224 / 2;
const RIVER_TOP = 2;
const RIVER_BOTTOM = 6;
const ROAD_TOP = 8;
const ROAD_BOTTOM = 12;
const HOP_S = .1;
const LIFE_TIME = 30;
var DEATH_S = 1.2;
var LEVEL_S = 2;
var FROG_HALF = 6;
const BAY_X = [
	24,
	68,
	112,
	156,
	200
];
var BAY_CATCH = 9;
var FLY_BONUS = 200;
var BAY_POINTS = 50;
var LEVEL_POINTS = 1e3;
var MARGIN = 96;
const LANES = [
	{
		row: 2,
		kind: "log",
		speed: 34,
		period: 336,
		offsets: [
			0,
			112,
			224
		],
		lens: [
			64,
			64,
			64
		]
	},
	{
		row: 3,
		kind: "turtle",
		speed: -40,
		period: 320,
		offsets: [
			0,
			80,
			160,
			240
		],
		lens: [
			32,
			32,
			32,
			32
		],
		dives: [
			false,
			true,
			false,
			false
		]
	},
	{
		row: 4,
		kind: "log",
		speed: 52,
		period: 400,
		offsets: [0, 200],
		lens: [96, 96]
	},
	{
		row: 5,
		kind: "log",
		speed: 28,
		period: 336,
		offsets: [
			0,
			112,
			224
		],
		lens: [
			48,
			48,
			48
		]
	},
	{
		row: 6,
		kind: "turtle",
		speed: -32,
		period: 336,
		offsets: [
			0,
			112,
			224
		],
		lens: [
			48,
			48,
			48
		],
		dives: [
			false,
			false,
			true
		]
	},
	{
		row: 8,
		kind: "truck",
		speed: -30,
		period: 336,
		offsets: [0, 168],
		lens: [32, 32]
	},
	{
		row: 9,
		kind: "racer",
		speed: 72,
		period: 336,
		offsets: [0, 168],
		lens: [16, 16]
	},
	{
		row: 10,
		kind: "car",
		speed: -40,
		period: 336,
		offsets: [
			0,
			112,
			224
		],
		lens: [
			16,
			16,
			16
		]
	},
	{
		row: 11,
		kind: "dozer",
		speed: 28,
		period: 336,
		offsets: [
			0,
			112,
			224
		],
		lens: [
			16,
			16,
			16
		]
	},
	{
		row: 12,
		kind: "car",
		speed: -34,
		period: 320,
		offsets: [
			0,
			80,
			160,
			240
		],
		lens: [
			16,
			16,
			16,
			16
		]
	}
];
var LANE_OF_ROW = Array.from({ length: 16 }, (_, row) => LANES.findIndex((l) => l.row === row));
var DIVE_CYCLE = 5;
var DIVE_SINK = 3;
var DIVE_UNDER = 3.6;
var DIVE_RISE = 4.8;
function levelFactor(level) {
	return Math.min(2.2, 1 + .2 * (level - 1));
}
function mod(a, m) {
	return (a % m + m) % m;
}
function itemX(lane, i, shift) {
	const def = LANES[lane];
	return mod(def.offsets[i] + shift, def.period) - MARGIN;
}
function diveState(lane, i, clock) {
	if (!LANES[lane].dives?.[i]) return 0;
	const t = mod(clock + i * 1.3, DIVE_CYCLE);
	return t < DIVE_SINK ? 0 : t < DIVE_UNDER ? 1 : t < DIVE_RISE ? 2 : 1;
}
function platformAt(state, row, x) {
	const lane = LANE_OF_ROW[row];
	if (lane < 0) return false;
	const def = LANES[lane];
	for (let i = 0; i < def.offsets.length; i += 1) {
		const x0 = itemX(lane, i, state.shifts[lane]);
		if (x >= x0 + 1 && x <= x0 + def.lens[i] - 1 && diveState(lane, i, state.diveClock) !== 2) return true;
	}
	return false;
}
function vehicleAt(state, row, x) {
	const lane = LANE_OF_ROW[row];
	if (lane < 0) return false;
	const def = LANES[lane];
	for (let i = 0; i < def.offsets.length; i += 1) {
		const x0 = itemX(lane, i, state.shifts[lane]);
		if (x + FROG_HALF > x0 + 1 && x - FROG_HALF < x0 + def.lens[i] - 1) return true;
	}
	return false;
}
function isRiver(row) {
	return row >= 2 && row <= 6;
}
function isRoad(row) {
	return row >= 8 && row <= 12;
}
function respawn(state) {
	state.phase = "play";
	state.x = 112;
	state.row = 13;
	state.facing = 0;
	state.hop.active = false;
	state.queued = -1;
	state.bestRow = 13;
	state.timeLeft = 30;
}
function create(random) {
	const state = {
		phase: "play",
		timer: 0,
		elapsed: 0,
		score: 0,
		lives: 3,
		level: 1,
		x: 112,
		row: 13,
		facing: 0,
		hop: {
			active: false,
			t: 0,
			fromX: 0,
			fromRow: 0,
			toX: 0,
			toRow: 0
		},
		queued: -1,
		bestRow: 13,
		timeLeft: 30,
		bays: new Uint8Array(5),
		flyBay: -1,
		flyLeft: 0,
		flyTimer: 6 + random() * 5,
		shifts: LANES.map((l) => Math.floor(random() * l.period)),
		diveClock: 0,
		deathKind: "splat",
		particles: makeParticles(80),
		popups: Array.from({ length: 3 }, () => ({
			active: false,
			x: 0,
			y: 0,
			t: 0,
			value: 0
		}))
	};
	respawn(state);
	return state;
}
function popup(state, x, y, value) {
	const p = state.popups.find((q) => !q.active) ?? state.popups[0];
	p.active = true;
	p.x = x;
	p.y = y;
	p.t = 1.2;
	p.value = value;
}
function die(state, kind, random) {
	state.phase = "dying";
	state.timer = DEATH_S;
	state.deathKind = kind;
	state.lives = Math.max(0, state.lives - 1);
	state.hop.active = false;
	state.queued = -1;
	const cy = state.row * 16 + 16 / 2;
	if (kind === "splash") emitBurst(state.particles, state.x, cy, 16, 50, "#9fd8ff", random, .7);
	else emitBurst(state.particles, state.x, cy, 14, 45, "#7ed957", random, .6);
}
function startHop(state, dir) {
	state.facing = dir;
	let toRow = state.row, toX = state.x;
	if (dir === 0) toRow = Math.max(1, state.row - 1);
	else if (dir === 2) toRow = Math.min(13, state.row + 1);
	else toX = state.x + (dir === 1 ? 16 : -16);
	if (!isRiver(state.row)) toX = clamp(toX, 16 / 2, 224 - 16 / 2);
	if (toRow === state.row && toX === state.x) return;
	const h = state.hop;
	h.active = true;
	h.t = 0;
	h.fromX = state.x;
	h.fromRow = state.row;
	h.toX = toX;
	h.toRow = toRow;
}
function pressedDirection(input) {
	const p = input.pressed;
	return p.up ? 0 : p.right ? 1 : p.down ? 2 : p.left ? 3 : -1;
}
function reachHome(state, random) {
	const bay = BAY_X.findIndex((bx) => Math.abs(state.x - bx) <= BAY_CATCH);
	if (bay < 0 || state.bays[bay]) {
		die(state, "splat", random);
		return;
	}
	state.bays[bay] = 1;
	let points = BAY_POINTS + 10 * Math.floor(state.timeLeft);
	if (state.flyBay === bay) {
		points += FLY_BONUS;
		state.flyBay = -1;
		state.flyTimer = 6 + random() * 6;
	}
	state.score += points;
	popup(state, BAY_X[bay], 18, points);
	emitBurst(state.particles, BAY_X[bay], 24, 12, 40, "#ffe66b", random, .6);
	if (state.bays.every((b) => b === 1)) {
		state.score += LEVEL_POINTS;
		state.phase = "levelup";
		state.timer = LEVEL_S;
		state.hop.active = false;
		state.flyBay = -1;
	} else respawn(state);
}
function survives(state, random) {
	if (isRoad(state.row) && vehicleAt(state, state.row, state.x)) {
		die(state, "splat", random);
		return false;
	}
	if (isRiver(state.row)) {
		if (state.x < 2 || state.x > 222) {
			die(state, "splash", random);
			return false;
		}
		if (!platformAt(state, state.row, state.x)) {
			die(state, "splash", random);
			return false;
		}
	}
	return true;
}
function land(state, random) {
	const h = state.hop;
	h.active = false;
	state.x = h.toX;
	state.row = h.toRow;
	if (state.row < state.bestRow) {
		state.score += 10 * (state.bestRow - state.row);
		state.bestRow = state.row;
	}
	if (state.row === 1) {
		reachHome(state, random);
		return;
	}
	if (!survives(state, random)) return;
	if (state.queued >= 0) {
		const dir = state.queued;
		state.queued = -1;
		startHop(state, dir);
	}
}
function laneSpeed(lane, level) {
	return LANES[lane].speed * levelFactor(level);
}
function step(state, input, dt, random) {
	stepParticles(state.particles, dt, 30);
	if (state.phase === "over") return;
	state.elapsed += dt;
	state.diveClock += dt;
	for (let i = 0; i < LANES.length; i += 1) state.shifts[i] = mod(state.shifts[i] + laneSpeed(i, state.level) * dt, LANES[i].period);
	for (const p of state.popups) if (p.active && (p.t -= dt) <= 0) p.active = false;
	if (state.phase === "dying") {
		state.timer -= dt;
		if (state.timer <= 0) if (state.lives <= 0) state.phase = "over";
		else respawn(state);
		return;
	}
	if (state.phase === "levelup") {
		state.timer -= dt;
		if (state.timer <= 0) {
			state.level += 1;
			state.bays.fill(0);
			state.flyTimer = 6 + random() * 5;
			respawn(state);
		}
		return;
	}
	if (state.flyBay >= 0) {
		state.flyLeft -= dt;
		if (state.flyLeft <= 0) {
			state.flyBay = -1;
			state.flyTimer = 6 + random() * 6;
		}
	} else if ((state.flyTimer -= dt) <= 0) {
		let empty = 0;
		for (const b of state.bays) if (!b) empty += 1;
		let pick = Math.floor(random() * empty);
		for (let i = 0; i < 5 && empty > 0; i += 1) if (!state.bays[i] && pick-- === 0) {
			state.flyBay = i;
			state.flyLeft = 4.5;
		}
		state.flyTimer = 6 + random() * 6;
	}
	state.timeLeft -= dt;
	if (state.timeLeft <= 0) {
		state.timeLeft = 0;
		die(state, "time", random);
		return;
	}
	const dir = pressedDirection(input);
	const h = state.hop;
	if (h.active) {
		if (dir >= 0) state.queued = dir;
		if (isRiver(h.fromRow)) {
			const drift = laneSpeed(LANE_OF_ROW[h.fromRow], state.level) * dt;
			h.fromX += drift;
			h.toX += drift;
		}
		h.t += dt;
		if (h.t >= .1) land(state, random);
		return;
	}
	if (dir >= 0) {
		startHop(state, dir);
		if (h.active) return;
	}
	if (isRiver(state.row)) state.x += laneSpeed(LANE_OF_ROW[state.row], state.level) * dt;
	survives(state, random);
}
function status(state) {
	return {
		score: state.score,
		lives: state.lives,
		level: state.level,
		over: state.phase === "over"
	};
}
function rotateRows(rows, turns) {
	let out = rows.slice();
	for (let t = 0; t < turns; t += 1) {
		const n = out.length;
		const next = [];
		for (let y = 0; y < n; y += 1) {
			let line = "";
			for (let x = 0; x < n; x += 1) line += out[n - 1 - x][y];
			next.push(line);
		}
		out = next;
	}
	return out;
}
var FROG_SIT = [
	".###....###.",
	".#.#....#.#.",
	"..########..",
	".##########.",
	"#.########.#",
	"#.########.#",
	"##.######.##",
	"..########..",
	".##.####.##.",
	"##........##",
	"#..........#",
	"............"
];
var FROG_LEAP = [
	"#.###..###.#",
	"#.#.#..#.#.#",
	".#.######.#.",
	"..########..",
	"..########..",
	"...######...",
	"...######...",
	"..########..",
	"..##.##.##..",
	".##......##.",
	".#........#.",
	"#..........#"
];
var FROG = [
	0,
	1,
	2,
	3
].map((turns) => [sprite(rotateRows(FROG_SIT, turns)), sprite(rotateRows(FROG_LEAP, turns))]);
var SPLAT = sprite([
	"#...#..#...#",
	".#..####..#.",
	"..########..",
	".##.####.##.",
	"#.########.#",
	"..##.##.##..",
	".#..#..#..#.",
	"#..........#"
]);
var FLY = sprite([
	".#.#.",
	"#####",
	".###.",
	"..#.."
]);
var CAR = sprite([
	"..########......",
	".##########.....",
	"################",
	"################",
	".##########.....",
	"..########......"
]);
var RACER = sprite([
	"....######......",
	"..##########....",
	"################",
	"################",
	"..##########....",
	"....######......"
]);
var DOZER = sprite([
	"#..#########....",
	"#.###########...",
	"#.############..",
	"#.############..",
	"#.###########...",
	"#..#########...."
]);
var LIFE_ICON = sprite([
	".#..#.",
	"######",
	"######",
	"#....#"
]);
var BANK_ROWS = [7, 13];
var LANE_COLOR = {
	car: "#4fc3ff",
	racer: "#ff5fb8",
	dozer: "#ffcc33"
};
function drawShift(state, lane, attract, time) {
	return attract ? state.shifts[lane] + LANES[lane].speed * time : state.shifts[lane];
}
function drawVehicle(ctx, kind, x, y, len, flip) {
	if (kind === "truck") {
		ctx.fillStyle = "#d9d4c7";
		ctx.fillRect(x + (flip ? 0 : 8), y + 2, len - 8, 12);
		ctx.fillStyle = "#e0523d";
		ctx.fillRect(x + (flip ? len - 8 : 0), y + 3, 8, 10);
		ctx.fillStyle = "#0b0b12";
		ctx.fillRect(x + (flip ? len - 5 : 1), y + 4, 3, 8);
		ctx.fillRect(x + 4, y + 1, 4, 1);
		ctx.fillRect(x + len - 8, y + 1, 4, 1);
		ctx.fillRect(x + 4, y + 14, 4, 1);
		ctx.fillRect(x + len - 8, y + 14, 4, 1);
		return;
	}
	ctx.fillStyle = "#0b0b12";
	ctx.fillRect(x + 3, y + 1, 3, 14);
	ctx.fillRect(x + 10, y + 1, 3, 14);
	ctx.fillStyle = LANE_COLOR[kind] ?? "#fff";
	drawSprite(ctx, kind === "racer" ? RACER : kind === "dozer" ? DOZER : CAR, x, y + 5, 1, flip);
	ctx.fillStyle = "#fff8d0";
	ctx.fillRect(flip ? x : x + len - 1, y + 7, 1, 2);
}
function draw(ctx, state, info) {
	const attract = info.idle && state.elapsed === 0;
	const clock = attract ? info.time : state.diveClock;
	const motion = info.reduced ? 0 : info.time;
	ctx.fillStyle = "#06070d";
	ctx.fillRect(0, 0, 224, 256);
	ctx.fillStyle = "#0b2a5c";
	ctx.fillRect(0, 32, 224, 80);
	ctx.fillStyle = "#1d4f96";
	for (let row = 2; row <= 6; row += 1) {
		const drift = Math.floor(mod(motion * 6 + row * 13, 32));
		for (let x = -32 + drift; x < 224; x += 32) ctx.fillRect(x, row * 16 + 5 + row % 2 * 6, 6, 1);
	}
	ctx.fillStyle = "#1f5e2b";
	ctx.fillRect(0, 14, 224, 18);
	ctx.fillStyle = "#2f8a3e";
	for (let x = 0; x < 224; x += 4) ctx.fillRect(x, 14 + (x % 8 === 0 ? 0 : 1), 2, 1);
	for (let i = 0; i < 5; i += 1) {
		const bx = BAY_X[i] - 10;
		ctx.fillStyle = "#0b2a5c";
		ctx.fillRect(bx, 16, 20, 16);
		if (state.bays[i]) {
			ctx.fillStyle = "#b6f36b";
			drawSprite(ctx, FROG[2][0], BAY_X[i] - 6, 18);
		} else if (state.flyBay === i) {
			ctx.fillStyle = "#ffe66b";
			const flap = info.reduced ? 0 : Math.floor(info.time * 10) % 2;
			drawSprite(ctx, FLY, BAY_X[i] - 2, 22 - flap);
		}
	}
	for (const row of BANK_ROWS) {
		ctx.fillStyle = "#3d2f6e";
		ctx.fillRect(0, row * 16, 224, 16);
		ctx.fillStyle = "#56449a";
		for (let x = 2; x < 224; x += 8) ctx.fillRect(x + row % 2 * 4, row * 16 + 4, 2, 2);
		for (let x = 6; x < 224; x += 8) ctx.fillRect(x - row % 2 * 4, row * 16 + 11, 2, 2);
	}
	ctx.fillStyle = "#14141c";
	ctx.fillRect(0, 128, 224, 80);
	ctx.fillStyle = "#4b4b5c";
	for (let row = 9; row <= 12; row += 1) for (let x = 4; x < 224; x += 16) ctx.fillRect(x, row * 16, 8, 1);
	for (let lane = 0; lane < LANES.length; lane += 1) {
		const def = LANES[lane];
		const shift = drawShift(state, lane, attract, info.time);
		const y = def.row * 16;
		for (let i = 0; i < def.offsets.length; i += 1) {
			const x = Math.round(itemX(lane, i, shift));
			const len = def.lens[i];
			if (x >= 224 || x + len <= 0) continue;
			if (def.kind === "log") {
				ctx.fillStyle = "#8a5a2b";
				ctx.fillRect(x + 1, y + 2, len - 2, 12);
				ctx.fillStyle = "#b07a40";
				ctx.fillRect(x + 1, y + 3, len - 2, 2);
				ctx.fillStyle = "#5c3a1a";
				for (let g = x + 6; g < x + len - 6; g += 11) ctx.fillRect(g, y + 8, 5, 1);
				ctx.fillRect(x + 1, y + 2, 2, 12);
				ctx.fillStyle = "#d9a86a";
				ctx.fillRect(x + len - 3, y + 3, 2, 10);
			} else if (def.kind === "turtle") {
				const dive = diveState(lane, i, clock);
				for (let t = 0; t < len; t += 16) {
					const tx = x + t;
					if (dive === 2) {
						ctx.fillStyle = "#1d4f96";
						ctx.fillRect(tx + 4, y + 7, 8, 1);
						continue;
					}
					ctx.fillStyle = dive === 1 ? "#6e3a2c" : "#c0463a";
					ctx.fillRect(tx + 3, y + 3, 10, 10);
					ctx.fillRect(tx + 2, y + 5, 12, 6);
					ctx.fillStyle = dive === 1 ? "#4a6a3a" : "#7ed957";
					ctx.fillRect(def.speed < 0 ? tx : tx + 14, y + 6, 2, 4);
					ctx.fillStyle = "#e8b04a";
					ctx.fillRect(tx + 6, y + 6, 4, 4);
				}
			} else drawVehicle(ctx, def.kind, x, y, len, def.speed < 0);
		}
	}
	if (state.phase === "dying") {
		const cy = state.row * 16;
		if (state.deathKind === "splash") {
			ctx.strokeStyle = "#9fd8ff";
			ctx.lineWidth = 1;
			const grow = clamp(1 - state.timer / DEATH_S, 0, 1);
			for (let ring = 0; ring < 2; ring += 1) {
				ctx.beginPath();
				ctx.arc(state.x, cy + 16 / 2, 2 + grow * 8 + ring * 4, 0, Math.PI * 2);
				ctx.stroke();
			}
		} else {
			ctx.fillStyle = "#7ed957";
			drawSprite(ctx, SPLAT, state.x - 6, cy + 4);
		}
	} else if (state.phase === "play") {
		const h = state.hop;
		let fx = state.x, fy = state.row * 16, leap = 0;
		if (h.active) {
			const k = clamp(h.t / HOP_S, 0, 1);
			fx = h.fromX + (h.toX - h.fromX) * k;
			fy = (h.fromRow + (h.toRow - h.fromRow) * k) * 16 - (info.reduced ? 0 : Math.sin(k * Math.PI) * 3);
			leap = 1;
		}
		ctx.fillStyle = "#0a1a0a";
		ctx.fillRect(Math.round(fx) - 4, state.row * 16 + 13, 8, 1);
		ctx.fillStyle = "#7ed957";
		drawSprite(ctx, FROG[state.facing][leap], fx - 6, fy + 2);
	}
	drawParticles(ctx, state.particles);
	ctx.fillStyle = "#ffe66b";
	for (const p of state.popups) if (p.active) drawNumber(ctx, p.value, p.x, p.y - (info.reduced ? 0 : (1.2 - p.t) * 6), 1, "center");
	ctx.fillStyle = "#e9ffe0";
	drawNumber(ctx, state.score, 6, 4, 2);
	ctx.fillStyle = "#b6f36b";
	drawNumber(ctx, state.level, 218, 4, 2, "right");
	ctx.fillStyle = "#7ed957";
	for (let i = 0; i < Math.min(state.lives, 6); i += 1) drawSprite(ctx, LIFE_ICON, 6 + i * 9, 230);
	const frac = clamp(state.timeLeft / 30, 0, 1);
	const low = state.timeLeft < 8;
	ctx.fillStyle = "#1c2a1c";
	ctx.fillRect(40, 245, 178, 6);
	ctx.globalAlpha = low && !info.reduced && state.phase === "play" ? .65 + .35 * Math.sin(info.time * 6) : 1;
	ctx.fillStyle = low ? "#ff5a4a" : "#7ed957";
	ctx.fillRect(218 - Math.round(178 * frac), 245, Math.round(178 * frac), 6);
	ctx.globalAlpha = 1;
	ctx.fillStyle = low ? "#ff5a4a" : "#b6f36b";
	drawNumber(ctx, Math.ceil(state.timeLeft), 6, 244, 2);
	if (state.phase === "levelup") {
		ctx.fillStyle = "#ffe66b";
		drawNumber(ctx, state.level + 1, 224 / 2, 113, 3, "center");
	}
}
var roadHopper_default = {
	id: "road-hopper",
	width: 224,
	height: 256,
	create,
	step,
	draw,
	status
};
export { BAY_X, CELL, HEIGHT, HOME_ROW, HOP_S, LANES, LIFE_TIME, RIVER_BOTTOM, RIVER_TOP, ROAD_BOTTOM, ROAD_TOP, START_ROW, START_X, WIDTH, roadHopper_default as default, diveState, isRiver, itemX, levelFactor, platformAt, vehicleAt };
