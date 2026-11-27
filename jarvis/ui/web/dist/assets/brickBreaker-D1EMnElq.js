import { a as sparkPool, i as emitSparks, n as drawScanlines, o as stepSparks, r as drawSparks, t as clamp } from "./games1Kit-CBZSeRQO.js";
const WIDTH = 320;
const HEIGHT = 240;
const COLS = 12;
const ROWS = 8;
const BRICK_W = 24;
const BRICK_H = 10;
var GAP = 2;
const FIELD_X = (320 - (12 * (24 + GAP) - GAP)) / 2;
const FIELD_Y = 26;
const PADDLE_Y = 222;
const PADDLE_H = 6;
const PADDLE_W = 44;
const WIDE_W = 68;
var PADDLE_SPEED = 260;
const BALL_R = 3;
var SUBSTEP = 3 / 2;
const MAX_BALLS = 6;
var MAX_DROPS = 6;
const MAX_SPEED = 330;
var MAX_BOUNCE = 1.05;
var MIN_VERTICAL = .3;
const START_LIVES = 3;
const MAX_LIVES = 5;
const DROP_CHANCE = .16;
const DROP_SPEED = 55;
const WIDE_S = 14;
const SLOW_S = 10;
const SLOW_FACTOR = .65;
const LAYOUTS = [
	[
		"............",
		"333333333333",
		"222222222222",
		"222222222222",
		"111111111111",
		"111111111111",
		"111111111111",
		"............"
	],
	[
		".....33.....",
		"....2222....",
		"...222222...",
		"..11111111..",
		".1111111111.",
		"111111111111",
		"............",
		"............"
	],
	[
		"3.3.3.3.3.3.",
		".2.2.2.2.2.2",
		"1.1.1.1.1.1.",
		".1.1.1.1.1.1",
		"2.2.2.2.2.2.",
		".1.1.1.1.1.1",
		"............",
		"............"
	],
	[
		".....22.....",
		"....1331....",
		"...123321...",
		"..12333321..",
		"...123321...",
		"....1331....",
		".....22.....",
		"............"
	],
	[
		"333333333333",
		"3..........3",
		"3.22222222.3",
		"3.21111112.3",
		"3.21111112.3",
		"3.22222222.3",
		"3..........3",
		"3333....3333"
	],
	[
		"1111........",
		"..2222......",
		"....3333....",
		"......2222..",
		"........1111",
		"......2222..",
		"....3333....",
		"..2222......"
	]
];
function levelSpeed(level) {
	const board = (level - 1) % LAYOUTS.length;
	const loop = Math.floor((level - 1) / LAYOUTS.length);
	return Math.min(330, 140 + board * 8 + loop * 45);
}
function brickIndex(col, row) {
	return row * 12 + col;
}
function brickX(col) {
	return FIELD_X + col * (24 + GAP);
}
function brickY(row) {
	return 26 + row * (10 + GAP);
}
function liveBalls(s) {
	let n = 0;
	for (const b of s.balls) if (b.alive) n += 1;
	return n;
}
function resetBall(s) {
	for (const b$1 of s.balls) b$1.alive = false;
	const b = s.balls[0];
	b.alive = true;
	b.stuck = true;
	b.vx = 0;
	b.vy = 0;
	b.x = s.paddleX;
	b.y = 219;
	for (const d of s.drops) d.alive = false;
	s.wideTime = 0;
	s.slowTime = 0;
	s.combo = 0;
}
function loadLevel(s) {
	const layout = LAYOUTS[(s.level - 1) % LAYOUTS.length];
	s.left = 0;
	for (let r = 0; r < 8; r += 1) for (let c = 0; c < 12; c += 1) {
		const ch = layout[r][c];
		const hp = ch === "." ? 0 : Number(ch);
		s.bricks[brickIndex(c, r)] = hp;
		s.hitFlash[brickIndex(c, r)] = 0;
		if (hp > 0) s.left += 1;
	}
	s.speed = levelSpeed(s.level);
	resetBall(s);
}
function createBricks() {
	const s = {
		bricks: new Int8Array(96),
		hitFlash: new Float32Array(96),
		left: 0,
		paddleX: 320 / 2,
		paddleW: 44,
		wideTime: 0,
		slowTime: 0,
		balls: [],
		drops: [],
		speed: levelSpeed(1),
		combo: 0,
		lives: 3,
		level: 1,
		score: 0,
		over: false,
		pointerX: null,
		time: 0,
		shake: 0,
		flash: 0,
		flashColor: "#ffffff",
		sparks: sparkPool(160)
	};
	for (let i = 0; i < 6; i += 1) s.balls.push({
		alive: false,
		stuck: false,
		x: 0,
		y: 0,
		vx: 0,
		vy: 0
	});
	for (let i = 0; i < MAX_DROPS; i += 1) s.drops.push({
		alive: false,
		kind: "wide",
		x: 0,
		y: 0
	});
	loadLevel(s);
	return s;
}
function currentSpeed(s) {
	return Math.min(330, s.speed) * (s.slowTime > 0 ? SLOW_FACTOR : 1);
}
function aim(b, angle, speed) {
	b.vx = Math.sin(angle) * speed;
	b.vy = -Math.cos(angle) * speed;
}
function normalise(b, speed) {
	let len = Math.hypot(b.vx, b.vy);
	if (len < 1e-6) {
		b.vx = 0;
		b.vy = -1;
		len = 1;
	}
	let vx = b.vx / len, vy = b.vy / len;
	if (Math.abs(vy) < MIN_VERTICAL) {
		vy = vy < 0 ? -MIN_VERTICAL : MIN_VERTICAL;
		vx = Math.sign(vx || 1) * Math.sqrt(1 - MIN_VERTICAL * MIN_VERTICAL);
	}
	b.vx = vx * speed;
	b.vy = vy * speed;
}
var ROW_COLOURS = [
	"#ff3d7f",
	"#ff7a3d",
	"#ffc43d",
	"#9be15d",
	"#3de0c4",
	"#3da2ff",
	"#8a6bff",
	"#e05dff"
];
var ROW_LIGHT = [
	"#ff9cc0",
	"#ffb48c",
	"#ffe38c",
	"#cdf5a8",
	"#9cf2e3",
	"#9ccfff",
	"#c2b3ff",
	"#f2acff"
];
var ROW_DARK = [
	"#8a1640",
	"#8a3a14",
	"#8a6614",
	"#4a7a24",
	"#14806c",
	"#14548a",
	"#3e2a9a",
	"#7a1f8a"
];
var DROP_COLOURS = {
	wide: "#3da2ff",
	multi: "#ffc43d",
	slow: "#3de0c4",
	life: "#ff3d7f"
};
function spawnDrop(s, x, y, random) {
	const slot = s.drops.find((d) => !d.alive);
	if (!slot) return;
	const r = random();
	slot.kind = r < .32 ? "wide" : r < .62 ? "multi" : r < .9 ? "slow" : "life";
	slot.alive = true;
	slot.x = x;
	slot.y = y;
}
function hitBrick(s, i, random) {
	const hpBefore = s.bricks[i];
	s.bricks[i] = hpBefore - 1;
	s.hitFlash[i] = .12;
	const col = i % 12, row = Math.floor(i / 12);
	const cx = brickX(col) + 24 / 2, cy = brickY(row) + 10 / 2;
	if (s.bricks[i] > 0) {
		s.score += 10;
		emitSparks(s.sparks, cx, cy, 3, 50, "#ffffff", random, .25, 1);
		return;
	}
	s.score += 30 + 20 * hpBefore + 10 * Math.min(s.combo, 10);
	s.combo += 1;
	s.left -= 1;
	emitSparks(s.sparks, cx, cy, 12, 110, ROW_COLOURS[row], random, .55, 2);
	if (random() < .16) spawnDrop(s, cx, cy, random);
}
function collideBricks(s, b, random) {
	const pitchX = 24 + GAP, pitchY = 10 + GAP;
	const c0 = Math.max(0, Math.floor((b.x - 3 - FIELD_X) / pitchX));
	const c1 = Math.min(11, Math.floor((b.x + 3 - FIELD_X) / pitchX));
	const r0 = Math.max(0, Math.floor((b.y - 3 - 26) / pitchY));
	const r1 = Math.min(7, Math.floor((b.y + 3 - 26) / pitchY));
	for (let r = r0; r <= r1; r += 1) for (let c = c0; c <= c1; c += 1) {
		const i = brickIndex(c, r);
		if (s.bricks[i] <= 0) continue;
		const bx = brickX(c), by = brickY(r);
		const px = clamp(b.x, bx, bx + 24), py = clamp(b.y, by, by + 10);
		const dx = b.x - px, dy = b.y - py;
		if (dx * dx + dy * dy > 9) continue;
		if (Math.min(b.x + 3 - bx, bx + 24 - (b.x - 3)) < Math.min(b.y + 3 - by, by + 10 - (b.y - 3))) {
			const fromLeft = b.x < bx + 24 / 2;
			b.vx = fromLeft ? -Math.abs(b.vx) : Math.abs(b.vx);
			b.x = fromLeft ? bx - 3 : bx + 24 + 3;
		} else {
			const fromAbove = b.y < by + 10 / 2;
			b.vy = fromAbove ? -Math.abs(b.vy) : Math.abs(b.vy);
			b.y = fromAbove ? by - 3 : by + 10 + 3;
		}
		hitBrick(s, i, random);
		return true;
	}
	return false;
}
function moveBall(s, b, dt, random) {
	const n = Math.max(1, Math.ceil(Math.hypot(b.vx, b.vy) * dt / SUBSTEP));
	const h = dt / n;
	for (let k = 0; k < n; k += 1) {
		b.x += b.vx * h;
		b.y += b.vy * h;
		if (b.x < 3) {
			b.x = 3;
			b.vx = Math.abs(b.vx);
		} else if (b.x > 317) {
			b.x = 317;
			b.vx = -Math.abs(b.vx);
		}
		if (b.y < 3) {
			b.y = 3;
			b.vy = Math.abs(b.vy);
		}
		const half = s.paddleW / 2;
		if (b.vy > 0 && b.y + 3 >= 222 && b.y + 3 <= 228 && Math.abs(b.x - s.paddleX) <= half + 3) {
			aim(b, clamp((b.x - s.paddleX) / half, -1, 1) * MAX_BOUNCE, Math.hypot(b.vx, b.vy));
			b.y = 219;
			s.combo = 0;
			s.speed = Math.min(330, s.speed + 2);
			emitSparks(s.sparks, b.x, 222, 4, 60, "#ffd1e0", random, .25, 1);
		}
		if (collideBricks(s, b, random) && s.left === 0) return;
		if (b.y - 3 > 240) {
			b.alive = false;
			return;
		}
	}
}
function launch(b, s, random) {
	b.stuck = false;
	let angle = (random() - .5) * .8;
	if (Math.abs(angle) < .12) angle = angle < 0 ? -.12 : .12;
	aim(b, angle, currentSpeed(s));
}
function applyPower(s, kind, random) {
	s.score += 50;
	if (kind === "wide") s.wideTime = 14;
	else if (kind === "slow") s.slowTime = 10;
	else if (kind === "life") s.lives = Math.min(5, s.lives + 1);
	else {
		const source = s.balls.find((b) => b.alive);
		if (!source) return;
		if (source.stuck) launch(source, s, random);
		const speed = Math.hypot(source.vx, source.vy);
		const base = Math.atan2(source.vx, -source.vy);
		for (const turn of [-.4, .4]) {
			const slot = s.balls.find((b) => !b.alive);
			if (!slot) break;
			slot.alive = true;
			slot.stuck = false;
			slot.x = source.x;
			slot.y = source.y;
			aim(slot, base + turn, speed);
			normalise(slot, speed);
		}
	}
}
function loseLife(s) {
	s.lives -= 1;
	s.shake = .4;
	s.flash = .8;
	s.flashColor = "#ff3d5a";
	if (s.lives <= 0) {
		s.lives = 0;
		s.over = true;
		return;
	}
	s.speed = levelSpeed(s.level);
	resetBall(s);
}
function stepBricks(s, input, dt, random) {
	s.time += dt;
	s.shake = Math.max(0, s.shake - dt);
	s.flash = Math.max(0, s.flash - dt * 2);
	for (let i = 0; i < s.hitFlash.length; i += 1) if (s.hitFlash[i] > 0) s.hitFlash[i] -= dt;
	stepSparks(s.sparks, dt, 160);
	if (s.over) return;
	s.wideTime = Math.max(0, s.wideTime - dt);
	s.slowTime = Math.max(0, s.slowTime - dt);
	const dir = (input.right ? 1 : 0) - (input.left ? 1 : 0);
	s.paddleX += dir * PADDLE_SPEED * dt;
	const pointer = input.pointer;
	if (pointer && pointer.x !== s.pointerX) s.paddleX = pointer.x;
	s.pointerX = pointer ? pointer.x : null;
	const targetW = s.wideTime > 0 ? 68 : 44;
	s.paddleW += clamp(targetW - s.paddleW, -120 * dt, 120 * dt);
	s.paddleX = clamp(s.paddleX, s.paddleW / 2, 320 - s.paddleW / 2);
	const fire = input.pressed.a || (pointer?.clicked ?? false);
	const speed = currentSpeed(s);
	for (const b of s.balls) {
		if (!b.alive) continue;
		if (b.stuck) {
			b.x = s.paddleX;
			b.y = 219;
			if (fire) launch(b, s, random);
			continue;
		}
		normalise(b, speed);
		moveBall(s, b, dt, random);
		if (s.left === 0) break;
	}
	if (s.left === 0) {
		s.score += 500 * s.level;
		s.level += 1;
		s.flash = 1;
		s.flashColor = "#ffffff";
		emitSparks(s.sparks, 320 / 2, 240 / 2, 40, 160, "#ffc43d", random, .9, 2);
		loadLevel(s);
		return;
	}
	for (const d of s.drops) {
		if (!d.alive) continue;
		d.y += 55 * dt;
		if (d.y + 4 >= 222 && d.y - 4 <= 228 && Math.abs(d.x - s.paddleX) <= s.paddleW / 2 + 8) {
			d.alive = false;
			emitSparks(s.sparks, d.x, 222, 10, 90, DROP_COLOURS[d.kind], random, .5, 2);
			applyPower(s, d.kind, random);
		} else if (d.y - 4 > 240) d.alive = false;
	}
	if (liveBalls(s) === 0) loseLife(s);
}
function drawBricks(ctx, s) {
	for (let r = 0; r < 8; r += 1) for (let c = 0; c < 12; c += 1) {
		const i = brickIndex(c, r);
		const hp = s.bricks[i];
		if (hp <= 0) continue;
		const x = brickX(c), y = brickY(r);
		if (hp >= 3) {
			ctx.fillStyle = "#5c6378";
			ctx.fillRect(x, y, 24, 10);
			ctx.fillStyle = "#c9cfdd";
			ctx.fillRect(x, y, 24, 2);
			ctx.fillStyle = "#2c3040";
			ctx.fillRect(x, y + 10 - 1, 24, 1);
			ctx.fillStyle = "#9aa1b5";
			ctx.fillRect(x + 2, y + 4, 2, 2);
			ctx.fillRect(x + 24 - 4, y + 4, 2, 2);
		} else {
			ctx.fillStyle = ROW_COLOURS[r];
			ctx.fillRect(x, y, 24, 10);
			ctx.fillStyle = ROW_LIGHT[r];
			ctx.fillRect(x, y, 24, 2);
			ctx.fillStyle = ROW_DARK[r];
			ctx.fillRect(x, y + 10 - 2, 24, 2);
			if (hp === 2) {
				ctx.fillStyle = ROW_LIGHT[r];
				ctx.fillRect(x + 4, y + 4, 16, 2);
			}
		}
		if (s.hitFlash[i] > 0) {
			ctx.globalAlpha = clamp(s.hitFlash[i] / .12, 0, 1);
			ctx.fillStyle = "#ffffff";
			ctx.fillRect(x, y, 24, 10);
			ctx.globalAlpha = 1;
		}
	}
}
function drawPaddle(ctx, s) {
	const w = Math.round(s.paddleW), x = Math.round(s.paddleX - w / 2);
	const ends = s.wideTime > 0 ? "#3da2ff" : "#ff3d7f";
	ctx.globalAlpha = .25;
	ctx.fillStyle = ends;
	ctx.fillRect(x - 2, 220, w + 4, 10);
	ctx.globalAlpha = 1;
	ctx.fillStyle = "#ffd1e0";
	ctx.fillRect(x, 222, w, 6);
	ctx.fillStyle = ends;
	ctx.fillRect(x, 222, 6, 6);
	ctx.fillRect(x + w - 6, 222, 6, 6);
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(x + 6, 222, w - 12, 1);
	ctx.fillStyle = "#8a5566";
	ctx.fillRect(x, 227, w, 1);
}
function drawBalls(ctx, s) {
	const colour = s.slowTime > 0 ? "#9cf2e3" : "#ffffff";
	for (const b of s.balls) {
		if (!b.alive) continue;
		if (!b.stuck) {
			ctx.globalAlpha = .3;
			ctx.fillStyle = colour;
			ctx.fillRect(Math.round(b.x - b.vx * .03) - 2, Math.round(b.y - b.vy * .03) - 2, 4, 4);
			ctx.globalAlpha = 1;
		}
		ctx.fillStyle = colour;
		ctx.beginPath();
		ctx.arc(b.x, b.y, 3, 0, Math.PI * 2);
		ctx.fill();
	}
}
function drawDrop(ctx, d) {
	const x = Math.round(d.x), y = Math.round(d.y);
	ctx.fillStyle = DROP_COLOURS[d.kind];
	ctx.fillRect(x - 8, y - 4, 16, 8);
	ctx.fillRect(x - 9, y - 3, 18, 6);
	ctx.fillStyle = "#0b0611";
	if (d.kind === "wide") {
		ctx.fillRect(x - 5, y - 1, 10, 2);
		ctx.fillRect(x - 6, y - 2, 1, 4);
		ctx.fillRect(x + 5, y - 2, 1, 4);
	} else if (d.kind === "multi") {
		ctx.fillRect(x - 5, y - 1, 2, 2);
		ctx.fillRect(x - 1, y - 1, 2, 2);
		ctx.fillRect(x + 3, y - 1, 2, 2);
	} else if (d.kind === "slow") {
		ctx.fillRect(x - 3, y - 2, 2, 4);
		ctx.fillRect(x + 1, y - 2, 2, 4);
	} else {
		ctx.fillRect(x - 3, y - 2, 2, 2);
		ctx.fillRect(x + 1, y - 2, 2, 2);
		ctx.fillRect(x - 3, y - 1, 6, 2);
		ctx.fillRect(x - 1, y + 1, 2, 1);
	}
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(x - 7, y - 4, 14, 1);
}
function drawBrickGame(ctx, s, info) {
	ctx.save();
	if (!info.reduced && s.shake > 0) {
		const m = s.shake * 7;
		ctx.translate(Math.round(Math.sin(s.time * 83) * m), Math.round(Math.cos(s.time * 67) * m));
	}
	ctx.fillStyle = "#0b0611";
	ctx.fillRect(-8, -8, 336, 256);
	ctx.fillStyle = "#120a1c";
	for (let x = 0; x < 320; x += 40) ctx.fillRect(x, 0, 20, 240);
	ctx.globalAlpha = .6;
	ctx.fillStyle = "#ff3d7f";
	ctx.fillRect(0, 0, 1, 240);
	ctx.fillRect(319, 0, 1, 240);
	ctx.fillRect(0, 0, 320, 1);
	ctx.globalAlpha = 1;
	drawBricks(ctx, s);
	for (const d of s.drops) if (d.alive) drawDrop(ctx, d);
	drawPaddle(ctx, s);
	drawBalls(ctx, s);
	drawSparks(ctx, s.sparks);
	ctx.restore();
	if (!info.reduced && s.flash > 0) {
		ctx.globalAlpha = s.flash * .2;
		ctx.fillStyle = s.flashColor;
		ctx.fillRect(0, 0, 320, 240);
		ctx.globalAlpha = 1;
	}
	drawScanlines(ctx, 320, 240, .1);
}
var brickBreaker_default = {
	id: "brick-breaker",
	width: 320,
	height: 240,
	pointer: true,
	create: () => createBricks(),
	step: stepBricks,
	draw: drawBrickGame,
	status: (s) => ({
		score: s.score,
		lives: s.lives,
		level: s.level,
		over: s.over
	})
};
export { BALL_R, BRICK_H, BRICK_W, COLS, DROP_CHANCE, DROP_SPEED, FIELD_X, FIELD_Y, HEIGHT, LAYOUTS, MAX_BALLS, MAX_LIVES, MAX_SPEED, PADDLE_H, PADDLE_W, PADDLE_Y, ROWS, SLOW_FACTOR, SLOW_S, START_LIVES, WIDE_S, WIDE_W, WIDTH, brickIndex, brickX, brickY, currentSpeed, brickBreaker_default as default, levelSpeed, liveBalls, loadLevel, moveBall };
