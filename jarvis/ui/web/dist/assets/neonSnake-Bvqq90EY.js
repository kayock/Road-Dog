import { a as sparkPool, i as emitSparks, n as drawScanlines, o as stepSparks, r as drawSparks, t as clamp } from "./games1Kit-CBZSeRQO.js";
const COLS = 32;
const ROWS = 24;
const CELL = 10;
var WIDTH = 320;
var HEIGHT = 240;
const RIGHT = 0;
const DOWN = 1;
const LEFT = 2;
const UP = 3;
var DIR_X = [
	1,
	0,
	-1,
	0
];
var DIR_Y = [
	0,
	1,
	0,
	-1
];
const START_LENGTH = 4;
const MAX_QUEUED_TURNS = 2;
const FOODS_PER_LEVEL = 5;
const BONUS_EVERY = 4;
const BONUS_S = 6;
var SAFE_RADIUS = 4;
var SAFE_AHEAD = 8;
var MAX_OBSTACLES = 48;
const EMPTY = 0;
const SNAKE = 1;
const WALL = 2;
function moveInterval(s) {
	return Math.max(.05, .13 - (s.body.length - 4) * .002 - (s.level - 1) * .004);
}
function cellOf(x, y) {
	return y * 32 + x;
}
function createSnake(random) {
	const s = {
		body: [],
		grid: new Uint8Array(768),
		dir: 0,
		queue: [],
		grow: 0,
		clock: 0,
		food: -1,
		bonus: -1,
		bonusTime: 0,
		obstacles: [],
		eaten: 0,
		score: 0,
		level: 1,
		over: false,
		won: false,
		time: 0,
		flash: 0,
		flashColor: "#5dff9c",
		shake: 0,
		sparks: sparkPool(96)
	};
	const y = Math.floor(24 / 2);
	for (let i = 0; i < 4; i += 1) {
		const c = cellOf(8 - i, y);
		s.body.push(c);
		s.grid[c] = 1;
	}
	s.food = freeCell(s, random, false);
	return s;
}
function isFree(s, cell, guard) {
	if (s.grid[cell] !== 0 || cell === s.food || cell === s.bonus) return false;
	if (!guard) return true;
	const head = s.body[0];
	const hx = head % 32, hy = Math.floor(head / 32);
	const x = cell % 32, y = Math.floor(cell / 32);
	if (Math.abs(x - hx) + Math.abs(y - hy) <= SAFE_RADIUS) return false;
	for (let q = -1; q < s.queue.length; q += 1) {
		const d = q < 0 ? s.dir : s.queue[q];
		const dx = x - hx, dy = y - hy;
		for (let k = 1; k <= SAFE_AHEAD; k += 1) if (dx === DIR_X[d] * k && dy === DIR_Y[d] * k) return false;
	}
	return true;
}
function freeCell(s, random, guard) {
	const total = 768;
	for (let i = 0; i < 64; i += 1) {
		const c = Math.floor(random() * total);
		if (isFree(s, c, guard)) return c;
	}
	const start = Math.floor(random() * total);
	for (let i = 0; i < total; i += 1) {
		const c = (start + i) % total;
		if (isFree(s, c, guard)) return c;
	}
	return -1;
}
function queueTurn(s, d) {
	const last = s.queue.length > 0 ? s.queue[s.queue.length - 1] : s.dir;
	if (d === last || d === (last + 2) % 4 || s.queue.length >= 2) return;
	s.queue.push(d);
}
function centre(cell) {
	return [cell % 32 * 10 + 10 / 2, Math.floor(cell / 32) * 10 + 10 / 2];
}
function crash(s, random) {
	s.over = true;
	s.flash = 1;
	s.flashColor = "#ff3d5a";
	s.shake = .35;
	for (let i = 0; i < s.body.length; i += 3) {
		const cx = s.body[i] % 32 * 10 + 10 / 2, cy = Math.floor(s.body[i] / 32) * 10 + 10 / 2;
		emitSparks(s.sparks, cx, cy, 3, 70, i === 0 ? "#ffffff" : "#ff5d7a", random, .8, 2);
	}
}
function levelUp(s, random) {
	s.level += 1;
	s.flash = .8;
	s.flashColor = "#5dff9c";
	const add = Math.min(2 + s.level, MAX_OBSTACLES - s.obstacles.length);
	for (let i = 0; i < add; i += 1) {
		const c = freeCell(s, random, true);
		if (c < 0) break;
		s.grid[c] = 2;
		s.obstacles.push(c);
		const x = c % 32 * 10 + 10 / 2, y = Math.floor(c / 32) * 10 + 10 / 2;
		emitSparks(s.sparks, x, y, 4, 40, "#ff4fd8", random, .5, 2);
	}
}
function eatFood(s, random) {
	const [x, y] = centre(s.food);
	emitSparks(s.sparks, x, y, 10, 90, "#ff4d6d", random, .5, 2);
	s.score += 10 * s.level;
	s.grow += 1;
	s.eaten += 1;
	s.food = -1;
	if (s.eaten % 5 === 0) levelUp(s, random);
	s.food = freeCell(s, random, false);
	if (s.food < 0) {
		s.over = true;
		s.won = true;
		return;
	}
	if (s.eaten % 4 === 0 && s.bonus < 0) {
		s.bonus = freeCell(s, random, false);
		s.bonusTime = 6;
	}
}
function eatBonus(s, random) {
	const [x, y] = centre(s.bonus);
	emitSparks(s.sparks, x, y, 18, 120, "#ffd23f", random, .7, 2);
	s.score += (50 + Math.round(s.bonusTime * 10)) * s.level;
	s.grow += 2;
	s.bonus = -1;
	s.bonusTime = 0;
}
function advance(s, random) {
	const d = s.queue.length > 0 ? s.queue.shift() : s.dir;
	s.dir = d;
	const head = s.body[0];
	const nx = head % 32 + DIR_X[d], ny = Math.floor(head / 32) + DIR_Y[d];
	if (nx < 0 || ny < 0 || nx >= 32 || ny >= 24) {
		crash(s, random);
		return;
	}
	const next = cellOf(nx, ny);
	const tail = s.body[s.body.length - 1];
	const tailLeaves = s.grow === 0;
	const hit = s.grid[next];
	if (hit === 2 || hit === 1 && !(tailLeaves && next === tail)) {
		crash(s, random);
		return;
	}
	if (tailLeaves) {
		s.body.pop();
		s.grid[tail] = 0;
	} else s.grow -= 1;
	s.body.unshift(next);
	s.grid[next] = 1;
	if (next === s.food) eatFood(s, random);
	else if (next === s.bonus) eatBonus(s, random);
}
function stepSnake(s, input, dt, random) {
	s.time += dt;
	s.flash = Math.max(0, s.flash - dt * 2.5);
	s.shake = Math.max(0, s.shake - dt);
	stepSparks(s.sparks, dt);
	if (s.over) return;
	const p = input.pressed;
	if (p.up) queueTurn(s, 3);
	if (p.down) queueTurn(s, 1);
	if (p.left) queueTurn(s, 2);
	if (p.right) queueTurn(s, 0);
	if (s.bonus >= 0) {
		s.bonusTime -= dt;
		if (s.bonusTime <= 0) {
			const [x, y] = centre(s.bonus);
			emitSparks(s.sparks, x, y, 6, 30, "#8a6a10", random, .4, 2);
			s.bonus = -1;
			s.bonusTime = 0;
		}
	}
	s.clock += dt;
	const every = moveInterval(s);
	if (s.clock >= every) {
		s.clock -= every;
		advance(s, random);
	}
}
var SHADES = 16;
var LIVE_SHADES = [];
var DEAD_SHADES = [];
for (let i = 0; i < SHADES; i += 1) {
	const t = i / (SHADES - 1);
	const mix = (a, b) => Math.round(a + (b - a) * t);
	LIVE_SHADES.push(`rgb(${mix(93, 16)},${mix(255, 150)},${mix(156, 140)})`);
	DEAD_SHADES.push(`rgb(${mix(255, 90)},${mix(93, 30)},${mix(122, 50)})`);
}
function drawGrid(ctx) {
	ctx.fillStyle = "#04070c";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	ctx.strokeStyle = "rgba(34,224,122,0.08)";
	ctx.lineWidth = 1;
	ctx.beginPath();
	for (let x = 10; x < WIDTH; x += 10) {
		ctx.moveTo(x + .5, 0);
		ctx.lineTo(x + .5, HEIGHT);
	}
	for (let y = 10; y < HEIGHT; y += 10) {
		ctx.moveTo(0, y + .5);
		ctx.lineTo(WIDTH, y + .5);
	}
	ctx.stroke();
	ctx.strokeStyle = "rgba(93,255,156,0.45)";
	ctx.strokeRect(.5, .5, WIDTH - 1, HEIGHT - 1);
}
function drawObstacles(ctx, s) {
	for (const c of s.obstacles) {
		const x = c % 32 * 10, y = Math.floor(c / 32) * 10;
		ctx.fillStyle = "#7a1060";
		ctx.fillRect(x, y, 10, 10);
		ctx.fillStyle = "#ff4fd8";
		ctx.fillRect(x + 1, y + 1, 8, 8);
		ctx.fillStyle = "#3a0630";
		ctx.fillRect(x + 3, y + 3, 4, 4);
		ctx.fillStyle = "#ffb3f0";
		ctx.fillRect(x + 1, y + 1, 8, 1);
	}
}
function drawFruit(ctx, s, info) {
	if (s.food >= 0) {
		const x = s.food % 32 * 10, y = Math.floor(s.food / 32) * 10;
		const pulse = info.reduced ? 0 : Math.round(Math.sin(info.time * 6) + 1);
		ctx.globalAlpha = .25;
		ctx.fillStyle = "#ff4d6d";
		ctx.fillRect(x - 1 - pulse, y - 1 - pulse, 12 + pulse * 2, 12 + pulse * 2);
		ctx.globalAlpha = 1;
		ctx.fillRect(x + 2, y + 3, 6, 6);
		ctx.fillRect(x + 3, y + 2, 4, 8);
		ctx.fillStyle = "#ffc2cc";
		ctx.fillRect(x + 3, y + 4, 2, 2);
		ctx.fillStyle = "#5dff9c";
		ctx.fillRect(x + 5, y, 2, 2);
	}
	if (s.bonus >= 0) {
		const [cx, cy] = centre(s.bonus);
		const ending = s.bonusTime < 1.5;
		if (ending && !info.reduced && Math.floor(s.time * 8) % 2 === 1) return;
		ctx.globalAlpha = ending && info.reduced ? .5 : 1;
		ctx.fillStyle = "#ffd23f";
		ctx.beginPath();
		ctx.moveTo(cx, cy - 5);
		ctx.lineTo(cx + 5, cy);
		ctx.lineTo(cx, cy + 5);
		ctx.lineTo(cx - 5, cy);
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = "#fff6c8";
		ctx.fillRect(cx - 1, cy - 3, 2, 2);
		ctx.strokeStyle = "#ffd23f";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(cx, cy, 8, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * clamp(s.bonusTime / 6, 0, 1));
		ctx.stroke();
		ctx.globalAlpha = 1;
	}
}
function drawSnake(ctx, s) {
	const shades = s.over ? DEAD_SHADES : LIVE_SHADES;
	const n = s.body.length;
	for (let i = n - 1; i >= 0; i -= 1) {
		const c = s.body[i];
		const x = c % 32 * 10, y = Math.floor(c / 32) * 10;
		ctx.fillStyle = shades[Math.min(SHADES - 1, Math.floor(i / Math.max(1, n - 1) * (SHADES - 1)))];
		ctx.fillRect(x + 1, y + 1, 8, 8);
		if (i + 1 < n) {
			const nc = s.body[i + 1];
			const dx = nc % 32 - c % 32, dy = Math.floor(nc / 32) - Math.floor(c / 32);
			if (Math.abs(dx) + Math.abs(dy) === 1) ctx.fillRect(x + 1 + dx * 2, y + 1 + dy * 2, 8, 8);
		}
	}
	const head = s.body[0];
	const hx = head % 32 * 10, hy = Math.floor(head / 32) * 10;
	ctx.globalAlpha = .3;
	ctx.fillStyle = shades[0];
	ctx.fillRect(hx - 2, hy - 2, 14, 14);
	ctx.globalAlpha = 1;
	ctx.fillStyle = s.over ? "#ffffff" : "#d9ffe9";
	ctx.fillRect(hx + 1, hy + 1, 8, 8);
	ctx.fillStyle = shades[0];
	ctx.fillRect(hx + 2, hy + 2, 6, 6);
	ctx.fillStyle = "#04070c";
	const d = s.dir;
	const fx = DIR_X[d], fy = DIR_Y[d];
	const ex = hx + 10 / 2 + fx * 2 - 1, ey = hy + 10 / 2 + fy * 2 - 1;
	ctx.fillRect(ex + fy * 2, ey + fx * 2, 2, 2);
	ctx.fillRect(ex - fy * 2, ey - fx * 2, 2, 2);
}
function drawSnakeGame(ctx, s, info) {
	ctx.save();
	if (!info.reduced && s.shake > 0) {
		const m = s.shake * 8;
		ctx.translate(Math.round(Math.sin(s.time * 90) * m), Math.round(Math.cos(s.time * 70) * m));
	}
	drawGrid(ctx);
	drawObstacles(ctx, s);
	drawFruit(ctx, s, info);
	drawSnake(ctx, s);
	drawSparks(ctx, s.sparks);
	ctx.restore();
	if (!info.reduced && s.flash > 0) {
		ctx.globalAlpha = s.flash * .22;
		ctx.fillStyle = s.flashColor;
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.globalAlpha = 1;
	}
	drawScanlines(ctx, WIDTH, HEIGHT, .1);
}
var neonSnake_default = {
	id: "neon-snake",
	width: WIDTH,
	height: HEIGHT,
	create: createSnake,
	step: stepSnake,
	draw: drawSnakeGame,
	status: (s) => ({
		score: s.score,
		level: s.level,
		over: s.over,
		won: s.won
	})
};
export { BONUS_EVERY, BONUS_S, CELL, COLS, DOWN, EMPTY, FOODS_PER_LEVEL, LEFT, MAX_QUEUED_TURNS, RIGHT, ROWS, SNAKE, START_LENGTH, UP, WALL, cellOf, neonSnake_default as default, moveInterval, queueTurn };
