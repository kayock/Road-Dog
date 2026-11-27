import { n as retroFont } from "./retroGame-GmSLy6cP.js";
import { a as sparkPool, i as emitSparks, n as drawScanlines, o as stepSparks, r as drawSparks, t as clamp } from "./games1Kit-CBZSeRQO.js";
const WIDTH = 320;
const HEIGHT = 240;
const TOP = 8;
const BOTTOM = 232;
const PADDLE_W = 6;
const PADDLE_H = 34;
const PLAYER_X = 14;
const CPU_X = 300;
const BALL = 5;
var HALF = 5 / 2;
const PLAYER_SPEED = 230;
var POINTER_SPEED = 420;
const SERVE_SPEED = 150;
const HIT_SPEEDUP = 10;
const MAX_BALL_SPEED = 380;
var MAX_BOUNCE = 1;
var SPIN_ACCEL = 140;
var MIN_HORIZONTAL = .55;
const WIN_POINTS = 7;
const SERVE_DELAY = 1.1;
const MATCH_PAUSE = 2.2;
var TRAIL = 6;
function cpuSkill(level) {
	const k = level - 1;
	return {
		reaction: Math.max(.07, .22 - .025 * k),
		speed: Math.min(285, 118 + 22 * k),
		error: Math.max(4, 16 - 2.5 * k),
		predicts: level >= 3
	};
}
function centreBall(s) {
	s.ballX = 320 / 2;
	s.ballY = 240 / 2;
	s.vx = 0;
	s.vy = 0;
	s.spin = 0;
	for (let i = 0; i < TRAIL; i += 1) {
		s.trail[i * 2] = s.ballX;
		s.trail[i * 2 + 1] = s.ballY;
	}
}
function createDuel() {
	const s = {
		playerY: 240 / 2,
		playerVy: 0,
		cpuY: 240 / 2,
		cpuVy: 0,
		cpuTarget: 240 / 2,
		cpuThink: 0,
		cpuError: 0,
		ballX: 320 / 2,
		ballY: 240 / 2,
		vx: 0,
		vy: 0,
		spin: 0,
		speed: 150,
		serving: true,
		serveTimer: SERVE_DELAY,
		serveDir: 1,
		rally: 0,
		playerPoints: 0,
		cpuPoints: 0,
		level: 1,
		score: 0,
		over: false,
		matchPause: 0,
		pointerTarget: null,
		lastPointerY: null,
		flashSide: 0,
		flash: 0,
		shake: 0,
		time: 0,
		trail: new Float32Array(TRAIL * 2),
		trailHead: 0,
		sparks: sparkPool(120)
	};
	centreBall(s);
	return s;
}
function serve(s, random) {
	s.serving = false;
	s.rally = 0;
	s.speed = 150 + (s.level - 1) * 8;
	s.ballX = 320 / 2;
	s.ballY = 240 / 2 + (random() - .5) * 80;
	const angle = (random() * 2 - 1) * .45;
	s.vx = Math.cos(angle) * s.speed * s.serveDir;
	s.vy = Math.sin(angle) * s.speed;
	s.spin = 0;
	s.cpuError = (random() * 2 - 1) * cpuSkill(s.level).error;
}
function predictY(s) {
	if (s.vx <= 0) return s.ballY;
	const t = (300 - HALF - s.ballX) / s.vx;
	const lo = 8 + HALF, span = 232 - HALF - lo;
	let y = s.ballY + s.vy * t - lo;
	const period = span * 2;
	y = (y % period + period) % period;
	if (y > span) y = period - y;
	return y + lo;
}
function stepCpu(s, dt) {
	const skill = cpuSkill(s.level);
	s.cpuThink -= dt;
	if (s.cpuThink <= 0) {
		s.cpuThink = skill.reaction;
		s.cpuTarget = !s.serving && s.vx > 0 ? (skill.predicts ? predictY(s) : s.ballY) + s.cpuError : 240 / 2;
	}
	const away = s.serving || s.vx <= 0;
	const max = skill.speed * (away ? .5 : 1) * dt;
	const before = s.cpuY;
	const diff = s.cpuTarget - s.cpuY;
	if (Math.abs(diff) > 2) s.cpuY += clamp(diff, -max, max);
	s.cpuY = clamp(s.cpuY, 25, 232 - 34 / 2);
	s.cpuVy = dt > 0 ? (s.cpuY - before) / dt : 0;
}
function stepPlayer(s, input, dt) {
	const before = s.playerY;
	const dir = (input.down ? 1 : 0) - (input.up ? 1 : 0);
	if (dir !== 0) {
		s.pointerTarget = null;
		s.playerY += dir * 230 * dt;
	}
	const pointer = input.pointer;
	if (pointer && pointer.y !== s.lastPointerY) s.pointerTarget = pointer.y;
	s.lastPointerY = pointer ? pointer.y : null;
	if (dir === 0 && s.pointerTarget !== null) {
		const step = POINTER_SPEED * dt;
		s.playerY += clamp(s.pointerTarget - s.playerY, -step, step);
	}
	s.playerY = clamp(s.playerY, 25, 232 - 34 / 2);
	s.playerVy = dt > 0 ? (s.playerY - before) / dt : 0;
}
function returnBall(s, byPlayer, paddleY, paddleVy, random) {
	s.rally += 1;
	s.speed = Math.min(380, s.speed + 10);
	const angle = clamp((s.ballY - paddleY) / (34 / 2 + HALF), -1, 1) * MAX_BOUNCE;
	const dir = byPlayer ? 1 : -1;
	s.vx = Math.cos(angle) * s.speed * dir;
	s.vy = Math.sin(angle) * s.speed + paddleVy * .2;
	s.spin = clamp(paddleVy / 250, -1, 1);
	s.ballX = byPlayer ? 20 + HALF : 300 - HALF;
	if (byPlayer) s.cpuError = (random() * 2 - 1) * cpuSkill(s.level).error;
	emitSparks(s.sparks, s.ballX, s.ballY, 6 + Math.min(10, s.rally), 90, byPlayer ? "#9aa3ff" : "#ff8f6b", random, .35, 2);
}
function normaliseBall(s) {
	const len = Math.hypot(s.vx, s.vy);
	if (len < 1e-6) return;
	let ux = s.vx / len, uy = s.vy / len;
	if (Math.abs(ux) < MIN_HORIZONTAL) {
		ux = Math.sign(ux || 1) * MIN_HORIZONTAL;
		uy = Math.sign(uy || 1) * Math.sqrt(1 - MIN_HORIZONTAL * MIN_HORIZONTAL);
	}
	s.vx = ux * s.speed;
	s.vy = uy * s.speed;
}
function pointScored(s, byPlayer, random) {
	emitSparks(s.sparks, clamp(s.ballX, 0, 320), s.ballY, 24, 140, byPlayer ? "#9aa3ff" : "#ff8f6b", random, .7, 2);
	if (byPlayer) {
		s.playerPoints += 1;
		s.score += 100 + 10 * s.rally;
		s.flashSide = 1;
	} else {
		s.cpuPoints += 1;
		s.flashSide = -1;
		s.shake = .3;
	}
	s.flash = 1;
	s.rally = 0;
	s.serving = true;
	s.serveTimer = SERVE_DELAY;
	s.serveDir = byPlayer ? 1 : -1;
	centreBall(s);
	if (s.playerPoints >= 7) {
		s.score += 1e3 * s.level;
		s.level += 1;
		s.matchPause = MATCH_PAUSE;
		s.serveDir = -1;
		for (let i = 0; i < 4; i += 1) emitSparks(s.sparks, 320 * (.2 + i * .2), 240 / 2, 12, 150, i % 2 ? "#f5f5f0" : "#9aa3ff", random, 1, 2);
	} else if (s.cpuPoints >= 7) s.over = true;
}
function moveBall(s, dt, random) {
	const n = Math.max(1, Math.ceil(Math.hypot(s.vx, s.vy) * dt / 2));
	const h = dt / n;
	for (let k = 0; k < n; k += 1) {
		s.vy += s.spin * SPIN_ACCEL * h;
		s.ballX += s.vx * h;
		s.ballY += s.vy * h;
		if (s.ballY < 8 + HALF) {
			s.ballY = 8 + HALF;
			s.vy = Math.abs(s.vy);
			s.spin *= .5;
			emitSparks(s.sparks, s.ballX, 8, 3, 50, "#f5f5f0", random, .25, 1);
		} else if (s.ballY > 232 - HALF) {
			s.ballY = 232 - HALF;
			s.vy = -Math.abs(s.vy);
			s.spin *= .5;
			emitSparks(s.sparks, s.ballX, 232, 3, 50, "#f5f5f0", random, .25, 1);
		}
		const reach = 34 / 2 + HALF;
		if (s.vx < 0 && s.ballX - HALF <= 20 && s.ballX - HALF >= 12 && Math.abs(s.ballY - s.playerY) <= reach) returnBall(s, true, s.playerY, s.playerVy, random);
		else if (s.vx > 0 && s.ballX + HALF >= 300 && s.ballX + HALF <= 308 && Math.abs(s.ballY - s.cpuY) <= reach) returnBall(s, false, s.cpuY, s.cpuVy, random);
		if (s.ballX < -10) {
			pointScored(s, false, random);
			return;
		}
		if (s.ballX > 330) {
			pointScored(s, true, random);
			return;
		}
	}
}
function stepDuel(s, input, dt, random) {
	s.time += dt;
	s.flash = Math.max(0, s.flash - dt * 2.5);
	s.shake = Math.max(0, s.shake - dt);
	stepSparks(s.sparks, dt, 40);
	if (s.over) return;
	stepPlayer(s, input, dt);
	if (s.matchPause > 0) {
		s.matchPause -= dt;
		stepCpu(s, dt);
		if (s.matchPause <= 0) {
			s.matchPause = 0;
			s.playerPoints = 0;
			s.cpuPoints = 0;
			s.serving = true;
			s.serveTimer = SERVE_DELAY;
		}
		return;
	}
	if (s.serving) {
		s.serveTimer -= dt;
		if (s.serveTimer <= 0 || input.pressed.a) serve(s, random);
	}
	stepCpu(s, dt);
	if (s.serving) return;
	s.spin *= Math.pow(.5, dt);
	normaliseBall(s);
	moveBall(s, dt, random);
	s.trailHead = (s.trailHead + 1) % TRAIL;
	s.trail[s.trailHead * 2] = s.ballX;
	s.trail[s.trailHead * 2 + 1] = s.ballY;
}
var DIGITS = [
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9"
];
var PLAYER_COLOUR = "#9aa3ff";
var CPU_COLOUR = "#ff8f6b";
var LINE = "#e8e4d8";
function drawPaddle(ctx, x, y, colour) {
	const top = Math.round(y - 34 / 2);
	ctx.globalAlpha = .22;
	ctx.fillStyle = colour;
	ctx.fillRect(x - 2, top - 2, 10, 38);
	ctx.globalAlpha = 1;
	ctx.fillRect(x, top, 6, 34);
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(x + 1, top + 1, 1, 32);
}
function drawDuel(ctx, s, info) {
	ctx.save();
	if (!info.reduced && s.shake > 0) {
		const m = s.shake * 6;
		ctx.translate(Math.round(Math.sin(s.time * 77) * m), Math.round(Math.cos(s.time * 61) * m));
	}
	ctx.fillStyle = "#0a0b10";
	ctx.fillRect(-8, -8, 336, 256);
	if (!info.reduced && s.flash > 0 && s.flashSide !== 0) {
		ctx.globalAlpha = s.flash * .16;
		ctx.fillStyle = s.flashSide > 0 ? PLAYER_COLOUR : CPU_COLOUR;
		ctx.fillRect(s.flashSide > 0 ? 320 / 2 : 0, 0, 320 / 2, 240);
		ctx.globalAlpha = 1;
	}
	ctx.fillStyle = LINE;
	ctx.fillRect(0, 6, 320, 2);
	ctx.fillRect(0, 232, 320, 2);
	ctx.globalAlpha = .35;
	for (let y = 12; y < 228; y += 12) ctx.fillRect(320 / 2 - 1, y, 2, 6);
	ctx.font = retroFont(28, 600);
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillStyle = PLAYER_COLOUR;
	ctx.fillText(DIGITS[Math.min(9, s.playerPoints)], 320 / 2 - 36, 16);
	ctx.fillStyle = CPU_COLOUR;
	ctx.fillText(DIGITS[Math.min(9, s.cpuPoints)], 196, 16);
	ctx.globalAlpha = .6;
	const pips = Math.min(10, s.level);
	for (let i = 0; i < pips; i += 1) ctx.fillRect(196 - pips * 2 + i * 4, 50, 2, 2);
	ctx.globalAlpha = 1;
	drawPaddle(ctx, 14, s.playerY, PLAYER_COLOUR);
	drawPaddle(ctx, 300, s.cpuY, CPU_COLOUR);
	const tint = s.spin > .15 ? PLAYER_COLOUR : s.spin < -.15 ? CPU_COLOUR : "#f5f5f0";
	if (!s.serving && s.matchPause <= 0) {
		for (let i = 1; i < TRAIL; i += 1) {
			const j = (s.trailHead - i + TRAIL) % TRAIL;
			ctx.globalAlpha = .28 * (1 - i / TRAIL);
			ctx.fillStyle = tint;
			ctx.fillRect(Math.round(s.trail[j * 2] - HALF), Math.round(s.trail[j * 2 + 1] - HALF), 5, 5);
		}
		ctx.globalAlpha = 1;
	}
	if (s.matchPause <= 0) {
		ctx.fillStyle = "#f5f5f0";
		ctx.fillRect(Math.round(s.ballX - HALF), Math.round(s.ballY - HALF), 5, 5);
		if (s.serving && !info.idle) {
			ctx.strokeStyle = s.serveDir > 0 ? PLAYER_COLOUR : CPU_COLOUR;
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.arc(s.ballX, s.ballY, 8, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * clamp(s.serveTimer / SERVE_DELAY, 0, 1));
			ctx.stroke();
		}
	}
	drawSparks(ctx, s.sparks);
	ctx.restore();
	drawScanlines(ctx, 320, 240, .1);
}
var paddleDuel_default = {
	id: "paddle-duel",
	width: 320,
	height: 240,
	pointer: true,
	create: () => createDuel(),
	step: stepDuel,
	draw: drawDuel,
	status: (s) => ({
		score: s.score,
		level: s.level,
		over: s.over,
		won: false
	})
};
export { BALL, BOTTOM, CPU_X, HEIGHT, HIT_SPEEDUP, MATCH_PAUSE, MAX_BALL_SPEED, PADDLE_H, PADDLE_W, PLAYER_SPEED, PLAYER_X, SERVE_DELAY, SERVE_SPEED, TOP, WIDTH, WIN_POINTS, cpuSkill, paddleDuel_default as default, predictY, serve };
