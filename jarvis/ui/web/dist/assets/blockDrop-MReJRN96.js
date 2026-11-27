import "./retroGame-GmSLy6cP.js";
import { n as drawSparks, o as sparkPool, r as emitSpark, s as stepSparks, t as drawDigits } from "./games2Kit-Bo4ay0BU.js";
const COLS = 10;
const ROWS = 22;
const HIDDEN = 2;
const DAS = .17;
const ARR = .05;
const LOCK_DELAY = .5;
const MAX_LOCK_RESETS = 15;
const CLEAR_TIME = .3;
var SOFT_DROP_INTERVAL = .035;
const LINE_SCORES = [
	0,
	100,
	300,
	500,
	800
];
const PIECE_I = 0;
const PIECE_O = 1;
const PIECE_T = 2;
const PIECE_S = 3;
const PIECE_Z = 4;
const PIECE_J = 5;
const PIECE_L = 6;
const PIECE_COUNT = 7;
var BASE_CELLS = [
	[
		0,
		1,
		1,
		1,
		2,
		1,
		3,
		1
	],
	[
		0,
		0,
		1,
		0,
		0,
		1,
		1,
		1
	],
	[
		1,
		0,
		0,
		1,
		1,
		1,
		2,
		1
	],
	[
		1,
		0,
		2,
		0,
		0,
		1,
		1,
		1
	],
	[
		0,
		0,
		1,
		0,
		1,
		1,
		2,
		1
	],
	[
		0,
		0,
		0,
		1,
		1,
		1,
		2,
		1
	],
	[
		2,
		0,
		0,
		1,
		1,
		1,
		2,
		1
	]
];
var BOX = [
	4,
	2,
	3,
	3,
	3,
	3,
	3
];
const SHAPES = BASE_CELLS.map((base, kind) => {
	const n = BOX[kind];
	const states = [Int8Array.from(base)];
	for (let r = 1; r < 4; r += 1) {
		const prev = states[r - 1];
		const next = new Int8Array(8);
		for (let i = 0; i < 4; i += 1) {
			next[i * 2] = kind === 1 ? prev[i * 2] : n - 1 - prev[i * 2 + 1];
			next[i * 2 + 1] = kind === 1 ? prev[i * 2 + 1] : prev[i * 2];
		}
		states.push(next);
	}
	return states;
});
var KICKS = [
	0,
	0,
	-1,
	0,
	1,
	0,
	0,
	-1,
	-1,
	-1,
	1,
	-1
];
var KICKS_I = [
	0,
	0,
	-1,
	0,
	1,
	0,
	-2,
	0,
	2,
	0,
	0,
	-1,
	0,
	-2
];
const WIDTH = 200;
const HEIGHT = 236;
var CELL = 11;
var WELL_X = 8;
var WELL_Y = 8;
var PANEL_X = 128;
var PANEL_W = 64;
var COLORS = [
	"#4fd8ff",
	"#ffd84a",
	"#b06bff",
	"#5dea6a",
	"#ff5a6e",
	"#4a7dff",
	"#ff9a3d"
];
var STACK_GREY = "#5b6177";
function gravityInterval(level) {
	const l = Math.min(20, Math.max(1, level));
	return Math.pow(.8 - (l - 1) * .007, l - 1);
}
function fits(s, kind, rot, x, y) {
	const shape = SHAPES[kind][rot];
	for (let i = 0; i < 4; i += 1) {
		const cx = x + shape[i * 2];
		const cy = y + shape[i * 2 + 1];
		if (cx < 0 || cx >= 10 || cy < 0 || cy >= 22) return false;
		if (s.cells[cy * 10 + cx] !== 0) return false;
	}
	return true;
}
function refill(s, random) {
	while (s.queue.length < 7) {
		const bag = s.bag;
		for (let i = 0; i < 7; i += 1) bag[i] = i;
		for (let i = 6; i > 0; i -= 1) {
			const j = Math.floor(random() * (i + 1));
			const t = bag[i];
			bag[i] = bag[j];
			bag[j] = t;
		}
		for (let i = 0; i < 7; i += 1) s.queue.push(bag[i]);
	}
}
function spawnPiece(s, random) {
	const kind = s.queue.shift() ?? 2;
	refill(s, random);
	s.piece = kind;
	s.rot = 0;
	s.px = kind === 1 ? 4 : 3;
	s.py = 1;
	s.gravityTimer = 0;
	s.lockTimer = 0;
	s.lockResets = 0;
	s.lowestRow = s.py;
	if (!fits(s, kind, 0, s.px, s.py)) {
		s.active = false;
		s.over = true;
		return;
	}
	s.active = true;
}
function createBlockDrop(random) {
	const s = {
		cells: new Uint8Array(220),
		active: false,
		piece: 0,
		rot: 0,
		px: 0,
		py: 0,
		queue: [],
		bag: [
			0,
			0,
			0,
			0,
			0,
			0,
			0
		],
		gravityTimer: 0,
		lockTimer: 0,
		lockResets: 0,
		lowestRow: 0,
		shiftDir: 0,
		shiftTimer: 0,
		clearing: 0,
		clearRows: [],
		score: 0,
		lines: 0,
		level: 1,
		over: false,
		ticks: 0,
		sparks: sparkPool(90),
		kick: 0,
		popupValue: 0,
		popupRow: 0,
		popupTime: 0,
		levelGlow: 0
	};
	refill(s, random);
	spawnPiece(s, random);
	return s;
}
function grounded(s) {
	return !fits(s, s.piece, s.rot, s.px, s.py + 1);
}
function touchLock(s, wasGrounded) {
	if ((wasGrounded || grounded(s)) && s.lockResets < 15) {
		s.lockTimer = 0;
		s.lockResets += 1;
	}
}
function tryShift(s, dx) {
	if (!fits(s, s.piece, s.rot, s.px + dx, s.py)) return false;
	const was = grounded(s);
	s.px += dx;
	touchLock(s, was);
	return true;
}
function tryRotate(s) {
	if (s.piece === 1) return true;
	const next = (s.rot + 1) % 4;
	const kicks = s.piece === 0 ? KICKS_I : KICKS;
	const was = grounded(s);
	for (let i = 0; i < kicks.length; i += 2) {
		const x = s.px + kicks[i];
		const y = s.py + kicks[i + 1];
		if (fits(s, s.piece, next, x, y)) {
			s.rot = next;
			s.px = x;
			s.py = y;
			touchLock(s, was);
			return true;
		}
	}
	return false;
}
function dropDistance(s) {
	let d = 0;
	while (fits(s, s.piece, s.rot, s.px, s.py + d + 1)) d += 1;
	return d;
}
function lockPiece(s, random) {
	const shape = SHAPES[s.piece][s.rot];
	let allHidden = true;
	for (let i = 0; i < 4; i += 1) {
		const cy = s.py + shape[i * 2 + 1];
		s.cells[cy * 10 + s.px + shape[i * 2]] = s.piece + 1;
		if (cy >= 2) allHidden = false;
	}
	s.active = false;
	if (allHidden) {
		s.over = true;
		return;
	}
	s.clearRows.length = 0;
	for (let y = 0; y < 22; y += 1) {
		let full = true;
		for (let x = 0; x < 10; x += 1) if (s.cells[y * 10 + x] === 0) {
			full = false;
			break;
		}
		if (full) s.clearRows.push(y);
	}
	const n = s.clearRows.length;
	if (n === 0) {
		spawnPiece(s, random);
		return;
	}
	const points = LINE_SCORES[n] * s.level;
	s.score += points;
	s.lines += n;
	const level = Math.max(s.level, 1 + Math.floor(s.lines / 10));
	if (level > s.level) s.levelGlow = 1;
	s.level = level;
	s.clearing = CLEAR_TIME;
	s.popupValue = points;
	s.popupRow = s.clearRows[0];
	s.popupTime = 1.1;
	for (let r = 0; r < n; r += 1) {
		const py = WELL_Y + (s.clearRows[r] - 2) * CELL + CELL / 2;
		for (let i = 0; i < 12; i += 1) {
			const px = WELL_X + random() * 10 * CELL;
			emitSpark(s.sparks, px, py, (random() - .5) * 90, -30 - random() * 90, .4 + random() * .4, n === 4 ? 3 : 2, n === 4 ? COLORS[Math.floor(random() * 7)] : "#ffffff");
		}
	}
}
function collapseRows(s) {
	let write = 21;
	for (let read = 21; read >= 0; read -= 1) {
		if (s.clearRows.includes(read)) continue;
		if (write !== read) s.cells.copyWithin(write * 10, read * 10, read * 10 + 10);
		write -= 1;
	}
	for (; write >= 0; write -= 1) s.cells.fill(0, write * 10, write * 10 + 10);
	s.clearRows.length = 0;
}
function handleShift(s, input, dt) {
	if (input.pressed.left) {
		s.shiftDir = -1;
		s.shiftTimer = 0;
		tryShift(s, -1);
	} else if (input.pressed.right) {
		s.shiftDir = 1;
		s.shiftTimer = 0;
		tryShift(s, 1);
	} else if (s.shiftDir === -1 && !input.left || s.shiftDir === 1 && !input.right) {
		s.shiftDir = s.shiftDir === -1 ? input.right ? 1 : 0 : input.left ? -1 : 0;
		s.shiftTimer = 0;
	} else if (s.shiftDir !== 0) {
		s.shiftTimer += dt;
		while (s.shiftTimer >= DAS) {
			if (!tryShift(s, s.shiftDir)) {
				s.shiftTimer = DAS;
				break;
			}
			s.shiftTimer -= ARR;
		}
	}
}
function stepBlockDrop(s, input, dt, random) {
	s.ticks += 1;
	stepSparks(s.sparks, dt, 160);
	s.kick = Math.max(0, s.kick - dt);
	s.popupTime = Math.max(0, s.popupTime - dt);
	s.levelGlow = Math.max(0, s.levelGlow - dt * .8);
	if (s.over) return;
	if (s.clearing > 0) {
		s.clearing -= dt;
		if (s.clearing <= 0) {
			s.clearing = 0;
			collapseRows(s);
			spawnPiece(s, random);
		}
		return;
	}
	if (!s.active) {
		spawnPiece(s, random);
		if (!s.active) return;
	}
	if (input.pressed.up || input.pressed.a) tryRotate(s);
	handleShift(s, input, dt);
	if (input.pressed.b) {
		const d = dropDistance(s);
		s.py += d;
		s.score += d * 2;
		s.kick = .12;
		lockPiece(s, random);
		return;
	}
	const soft = input.down;
	const interval = soft ? Math.min(gravityInterval(s.level), SOFT_DROP_INTERVAL) : gravityInterval(s.level);
	s.gravityTimer += dt;
	while (s.gravityTimer >= interval) {
		if (!fits(s, s.piece, s.rot, s.px, s.py + 1)) {
			s.gravityTimer = 0;
			break;
		}
		s.gravityTimer -= interval;
		s.py += 1;
		if (soft) s.score += 1;
		if (s.py > s.lowestRow) {
			s.lowestRow = s.py;
			s.lockResets = 0;
			s.lockTimer = 0;
		}
	}
	if (grounded(s)) {
		s.lockTimer += dt;
		if (s.lockTimer >= .499999999) lockPiece(s, random);
	}
}
function drawCell(ctx, x, y, size, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, size, size);
	ctx.fillStyle = "rgba(255,255,255,0.38)";
	ctx.fillRect(x, y, size, 1);
	ctx.fillRect(x, y, 1, size);
	ctx.fillStyle = "rgba(0,0,0,0.35)";
	ctx.fillRect(x, y + size - 1, size, 1);
	ctx.fillRect(x + size - 1, y, 1, size);
	if (size >= 8) {
		ctx.fillStyle = "rgba(255,255,255,0.55)";
		ctx.fillRect(x + 2, y + 2, 2, 2);
	}
}
function drawPreview(ctx, kind, cx, cy, size) {
	const shape = SHAPES[kind][0];
	let minX = 9, maxX = -9, minY = 9, maxY = -9;
	for (let i = 0; i < 4; i += 1) {
		minX = Math.min(minX, shape[i * 2]);
		maxX = Math.max(maxX, shape[i * 2]);
		minY = Math.min(minY, shape[i * 2 + 1]);
		maxY = Math.max(maxY, shape[i * 2 + 1]);
	}
	const ox = Math.round(cx - (maxX - minX + 1) * size / 2);
	const oy = Math.round(cy - (maxY - minY + 1) * size / 2);
	for (let i = 0; i < 4; i += 1) drawCell(ctx, ox + (shape[i * 2] - minX) * size, oy + (shape[i * 2 + 1] - minY) * size, size - 1, COLORS[kind]);
}
function panelBox(ctx, x, y, w, h) {
	ctx.fillStyle = "#0b1433";
	ctx.fillRect(x, y, w, h);
	ctx.strokeStyle = "#2a4a8f";
	ctx.lineWidth = 1;
	ctx.strokeRect(x + .5, y + .5, w - 1, h - 1);
}
var ATTRACT_ROWS = [
	"J.........",
	"JJJ....LOO",
	"ZZTT.LLLOO",
	"SZZT.ITTTS",
	"SSZT.IJTSS",
	"OOTT.IJJJS"
];
var KIND_OF = {
	I: 0,
	O: 1,
	T: 2,
	S: 3,
	Z: 4,
	J: 5,
	L: 6
};
function drawWell(ctx, s, info) {
	const wellW = 10 * CELL, wellH = 20 * CELL;
	ctx.fillStyle = "#070c1f";
	ctx.fillRect(WELL_X, WELL_Y, wellW, wellH);
	ctx.fillStyle = "rgba(124,196,255,0.06)";
	for (let x = 1; x < 10; x += 1) ctx.fillRect(WELL_X + x * CELL, WELL_Y, 1, wellH);
	for (let y = 1; y < 20; y += 1) ctx.fillRect(WELL_X, WELL_Y + y * CELL, wellW, 1);
	ctx.strokeStyle = s.levelGlow > 0 ? `rgba(124,196,255,${.45 + s.levelGlow * .55})` : "rgba(63,162,255,0.45)";
	ctx.lineWidth = s.levelGlow > 0 ? 2 : 1;
	ctx.strokeRect(WELL_X - 1.5, WELL_Y - 1.5, wellW + 3, wellH + 3);
	if (info.idle && s.ticks === 0) {
		const top = 22 - ATTRACT_ROWS.length;
		for (let r = 0; r < ATTRACT_ROWS.length; r += 1) for (let x = 0; x < 10; x += 1) {
			const ch = ATTRACT_ROWS[r][x];
			if (ch === ".") continue;
			drawCell(ctx, WELL_X + x * CELL, WELL_Y + (top + r - 2) * CELL, CELL - 1, COLORS[KIND_OF[ch]]);
		}
		const bob = info.reduced ? 0 : Math.round(Math.sin(info.time * 2) * 3);
		for (let i = 0; i < 4; i += 1) drawCell(ctx, WELL_X + 4 * CELL, WELL_Y + (7 + i) * CELL + bob, CELL - 1, COLORS[0]);
		ctx.strokeStyle = "rgba(79,216,255,0.35)";
		for (let i = 0; i < 4; i += 1) ctx.strokeRect(WELL_X + 4 * CELL + .5, WELL_Y + (top + 2 + i - 2) * CELL + .5, CELL - 2, CELL - 2);
		return;
	}
	const p = s.clearing > 0 ? 1 - s.clearing / CLEAR_TIME : 0;
	for (let y = 2; y < 22; y += 1) {
		const clearingRow = s.clearing > 0 && s.clearRows.includes(y);
		for (let x = 0; x < 10; x += 1) {
			const v = s.cells[y * 10 + x];
			if (v === 0) continue;
			const px = WELL_X + x * CELL, py = WELL_Y + (y - 2) * CELL;
			if (clearingRow) {
				if (info.reduced) {
					ctx.globalAlpha = 1 - p;
					drawCell(ctx, px, py, CELL - 1, COLORS[v - 1]);
					ctx.globalAlpha = 1;
				} else {
					const h = Math.max(1, Math.round((CELL - 1) * (1 - p)));
					const reach = p * 6;
					ctx.fillStyle = Math.abs(x + .5 - 10 / 2) < reach ? "#ffffff" : COLORS[v - 1];
					ctx.fillRect(px, py + Math.round((CELL - 1 - h) / 2), CELL - 1, h);
				}
				continue;
			}
			drawCell(ctx, px, py, CELL - 1, s.over ? STACK_GREY : COLORS[v - 1]);
		}
	}
	if (s.active && !s.over) {
		const shape = SHAPES[s.piece][s.rot];
		const ghost = s.py + dropDistance(s);
		ctx.strokeStyle = COLORS[s.piece];
		ctx.globalAlpha = .45;
		ctx.lineWidth = 1;
		for (let i = 0; i < 4; i += 1) {
			const gy = ghost + shape[i * 2 + 1];
			if (gy < 2) continue;
			ctx.strokeRect(WELL_X + (s.px + shape[i * 2]) * CELL + .5, WELL_Y + (gy - 2) * CELL + .5, CELL - 2, CELL - 2);
		}
		ctx.globalAlpha = 1;
		const settle = grounded(s) ? Math.min(1, s.lockTimer / LOCK_DELAY) : 0;
		for (let i = 0; i < 4; i += 1) {
			const cy = s.py + shape[i * 2 + 1];
			if (cy < 2) continue;
			drawCell(ctx, WELL_X + (s.px + shape[i * 2]) * CELL, WELL_Y + (cy - 2) * CELL, CELL - 1, COLORS[s.piece]);
			if (settle > 0) {
				ctx.fillStyle = `rgba(7,12,31,${settle * .35})`;
				ctx.fillRect(WELL_X + (s.px + shape[i * 2]) * CELL, WELL_Y + (cy - 2) * CELL, CELL - 1, CELL - 1);
			}
		}
	}
	if (s.over) {
		ctx.fillStyle = "rgba(7,12,31,0.45)";
		ctx.fillRect(WELL_X, WELL_Y, wellW, wellH);
	}
}
function drawPanel(ctx, s, info) {
	const attract = info.idle && s.ticks === 0;
	panelBox(ctx, PANEL_X, WELL_Y, PANEL_W, 46);
	ctx.fillStyle = "#7cc4ff";
	ctx.beginPath();
	ctx.moveTo(PANEL_X + 4, WELL_Y + 4);
	ctx.lineTo(PANEL_X + 10, WELL_Y + 4);
	ctx.lineTo(PANEL_X + 7, WELL_Y + 8);
	ctx.closePath();
	ctx.fill();
	drawPreview(ctx, attract ? 2 : s.queue[0], PANEL_X + PANEL_W / 2, WELL_Y + 25, 10);
	panelBox(ctx, PANEL_X, WELL_Y + 50, 31, 30);
	panelBox(ctx, PANEL_X + 33, WELL_Y + 50, 31, 30);
	drawPreview(ctx, attract ? 6 : s.queue[1], PANEL_X + 15.5, WELL_Y + 65, 6);
	drawPreview(ctx, attract ? 3 : s.queue[2], PANEL_X + 48.5, WELL_Y + 65, 6);
	panelBox(ctx, PANEL_X, WELL_Y + 88, PANEL_W, 26);
	drawDigits(ctx, s.score, PANEL_X + PANEL_W - 5, WELL_Y + 94, 14, "#ffffff", "right", 600);
	panelBox(ctx, PANEL_X, WELL_Y + 120, PANEL_W, 20);
	ctx.strokeStyle = "#ffd84a";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(PANEL_X + 5, WELL_Y + 131);
	ctx.lineTo(PANEL_X + 9, WELL_Y + 127);
	ctx.lineTo(PANEL_X + 13, WELL_Y + 131);
	ctx.moveTo(PANEL_X + 5, WELL_Y + 135);
	ctx.lineTo(PANEL_X + 9, WELL_Y + 131);
	ctx.lineTo(PANEL_X + 13, WELL_Y + 135);
	ctx.stroke();
	drawDigits(ctx, s.level, PANEL_X + PANEL_W - 5, WELL_Y + 124, 12, "#ffd84a", "right");
	panelBox(ctx, PANEL_X, WELL_Y + 144, PANEL_W, 20);
	ctx.fillStyle = "#5dea6a";
	for (let i = 0; i < 3; i += 1) ctx.fillRect(PANEL_X + 5, WELL_Y + 149 + i * 4, 9, 2);
	drawDigits(ctx, s.lines, PANEL_X + PANEL_W - 5, WELL_Y + 148, 12, "#5dea6a", "right");
	panelBox(ctx, PANEL_X, WELL_Y + 170, PANEL_W, 8);
	ctx.fillStyle = "#3fa2ff";
	ctx.fillRect(PANEL_X + 2, WELL_Y + 172, Math.round((PANEL_W - 4) * (s.lines % 10 / 10)), 4);
	for (let i = 0; i < 4; i += 1) {
		drawCell(ctx, PANEL_X + 8 + i * 13, WELL_Y + 200, 11, COLORS[(i + 2) % 7]);
		if (i % 2 === 0) drawCell(ctx, PANEL_X + 8 + i * 13, WELL_Y + 188, 11, COLORS[(i + 5) % 7]);
	}
}
function drawBlockDrop(ctx, s, info) {
	ctx.fillStyle = "#050916";
	ctx.fillRect(0, 0, 200, 236);
	ctx.save();
	if (!info.reduced && s.kick > 0) ctx.translate(0, Math.round(s.kick / .12 * 2));
	drawWell(ctx, s, info);
	drawSparks(ctx, s.sparks);
	if (s.popupTime > 0 && s.popupValue > 0 && !s.over) {
		const rise = info.reduced ? 0 : (1.1 - s.popupTime) * 14;
		ctx.globalAlpha = Math.min(1, s.popupTime * 2);
		drawDigits(ctx, `+${s.popupValue}`, WELL_X + 10 * CELL / 2, WELL_Y + (s.popupRow - 2) * CELL - 10 - rise, 12, "#ffffff", "center", 600);
		ctx.globalAlpha = 1;
	}
	ctx.restore();
	drawPanel(ctx, s, info);
}
var blockDrop_default = {
	id: "block-drop",
	width: 200,
	height: 236,
	create: (random) => createBlockDrop(random),
	step: (state, input, dt, random) => stepBlockDrop(state, input, dt, random),
	draw: (ctx, state, info) => drawBlockDrop(ctx, state, info),
	status: (state) => ({
		score: state.score,
		level: state.level,
		over: state.over
	})
};
export { ARR, CLEAR_TIME, COLS, DAS, HEIGHT, HIDDEN, LINE_SCORES, LOCK_DELAY, MAX_LOCK_RESETS, PIECE_COUNT, PIECE_I, PIECE_J, PIECE_L, PIECE_O, PIECE_S, PIECE_T, PIECE_Z, ROWS, SHAPES, WIDTH, createBlockDrop, blockDrop_default as default, drawBlockDrop, dropDistance, fits, gravityInterval, spawnPiece, stepBlockDrop, tryRotate, tryShift };
