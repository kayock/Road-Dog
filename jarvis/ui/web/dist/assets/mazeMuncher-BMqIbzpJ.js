import "./retroGame-GmSLy6cP.js";
import { n as drawSparks, o as sparkPool, r as emitSpark, s as stepSparks, t as drawDigits } from "./games2Kit-Bo4ay0BU.js";
const MAZE = [
	"#####################",
	"#.........#.........#",
	"#o##.####.#.####.##o#",
	"#...................#",
	"#.##.#.#######.#.##.#",
	"#....#....#....#....#",
	"####.####.#.####.####",
	"####.#.........#.####",
	"####.#.###-###.#.####",
	"T......#PPPPP#......T",
	"####.#.#######.#.####",
	"####.#.........#.####",
	"####.#.#######.#.####",
	"#.........#.........#",
	"#.##.####.#.####.##.#",
	"#o.#...... ......#.o#",
	"##.#.#.#######.#.#.##",
	"#....#....#....#....#",
	"#.#######.#.#######.#",
	"#...................#",
	"#####################"
];
const MAZE_W = 21;
const MAZE_H = 21;
const UP = 0;
const LEFT = 1;
const DOWN = 2;
const RIGHT = 3;
const NONE = -1;
var DX = [
	0,
	-1,
	0,
	1
];
var DY = [
	-1,
	0,
	1,
	0
];
var OPPOSITE = [
	2,
	3,
	0,
	1
];
const PLAYER_START_X = 10;
const PLAYER_START_Y = 15;
const EXIT_X = 10;
const EXIT_Y = 7;
var PEN_Y = 9;
var PEN_X = [
	10,
	10,
	9,
	11
];
const BONUS_X = 10;
const BONUS_Y = 11;
var TUNNEL_ROW = 9;
const DOT_POINTS = 10;
const ORB_POINTS = 50;
const CHAIN_POINTS = [
	200,
	400,
	800,
	1600
];
const BONUS_POINTS = [
	100,
	300,
	500,
	700,
	1e3,
	2e3,
	3e3,
	5e3
];
const START_LIVES = 3;
const READY_TIME = 1.6;
const DYING_TIME = 1.4;
const CLEAR_TIME = 2;
var EAT_PAUSE = .5;
var BONUS_TIME = 9;
var SCHEDULE = [
	7,
	20,
	7,
	20,
	5,
	20,
	5,
	Infinity
];
var RELEASE_TIME = [
	0,
	1,
	5,
	9
];
var RELEASE_DOTS = [
	0,
	0,
	25,
	50
];
var CORNER_X = [
	19,
	1,
	20,
	0
];
var CORNER_Y = [
	-2,
	-2,
	22,
	22
];
var EPS = 1e-6;
function tileAt(tx, ty) {
	if (ty < 0 || ty >= 21) return "#";
	const x = (tx % 21 + 21) % 21;
	return MAZE[ty][x];
}
function isOpen(tx, ty) {
	const c = tileAt(tx, ty);
	return c !== "#" && c !== "P" && c !== "-";
}
function openDir(m, dir) {
	return isOpen(Math.round(m.x) + DX[dir], Math.round(m.y) + DY[dir]);
}
function atCentre(m) {
	return Math.abs(m.x - Math.round(m.x)) < EPS && Math.abs(m.y - Math.round(m.y)) < EPS;
}
function wrapX(m) {
	if (m.x < -.5) m.x += 21;
	else if (m.x > 20.5) m.x -= 21;
}
function levelSpeed(level) {
	return Math.min(1.3, 1 + (level - 1) * .06);
}
function frightDuration(level) {
	return Math.max(1.5, 7 - (level - 1) * 1.1);
}
function fillDots(s) {
	let n = 0;
	for (let y = 0; y < 21; y += 1) for (let x = 0; x < 21; x += 1) {
		const c = MAZE[y][x];
		const v = c === "." ? 1 : c === "o" ? 2 : 0;
		s.dots[y * 21 + x] = v;
		if (v) n += 1;
	}
	s.dotsLeft = n;
	s.totalDots = n;
	s.bonusShown = 0;
	s.bonusTimer = 0;
}
function resetRound(s) {
	const p = s.player;
	p.x = 10;
	p.y = 15;
	p.dir = -1;
	p.want = 1;
	p.chew = 0;
	for (const b of s.bugs) {
		b.frightened = false;
		if (b.index === 0) {
			b.x = 10;
			b.y = 7;
			b.dir = 1;
			b.mode = "active";
		} else {
			b.x = PEN_X[b.index];
			b.y = PEN_Y;
			b.dir = 0;
			b.mode = "pen";
		}
	}
	s.modeIndex = 0;
	s.modeTimer = 0;
	s.frightTimer = 0;
	s.chain = 0;
	s.eatPause = 0;
	s.roundTime = 0;
	s.dotsThisRound = 0;
	s.bonusTimer = 0;
	s.phase = "ready";
	s.phaseTimer = READY_TIME;
}
function createMaze() {
	const s = {
		dots: new Uint8Array(441),
		dotsLeft: 0,
		totalDots: 0,
		player: {
			x: 0,
			y: 0,
			dir: -1,
			want: 1,
			chew: 0
		},
		bugs: [
			0,
			1,
			2,
			3
		].map((index) => ({
			index,
			x: 0,
			y: 0,
			dir: 0,
			mode: "pen",
			frightened: false
		})),
		score: 0,
		lives: 3,
		level: 1,
		over: false,
		phase: "ready",
		phaseTimer: READY_TIME,
		modeIndex: 0,
		modeTimer: 0,
		frightTimer: 0,
		chain: 0,
		eatPause: 0,
		roundTime: 0,
		dotsThisRound: 0,
		bonusTimer: 0,
		bonusShown: 0,
		popups: [
			0,
			1,
			2
		].map(() => ({
			x: 0,
			y: 0,
			value: 0,
			time: 0
		})),
		sparks: sparkPool(48),
		ticks: 0
	};
	fillDots(s);
	resetRound(s);
	return s;
}
function scatterPhase(s) {
	return s.modeIndex % 2 === 0;
}
function bugTarget(s, b, out) {
	if (b.mode === "eaten") {
		out.x = 10;
		out.y = 7;
		return;
	}
	const p = s.player;
	const px = Math.round(p.x), py = Math.round(p.y);
	const pd = p.dir >= 0 ? p.dir : p.want >= 0 ? p.want : 1;
	if (scatterPhase(s)) {
		out.x = CORNER_X[b.index];
		out.y = CORNER_Y[b.index];
		return;
	}
	switch (b.index) {
		case 0:
			out.x = px;
			out.y = py;
			return;
		case 1:
			out.x = px + DX[pd] * 4;
			out.y = py + DY[pd] * 4;
			return;
		case 2: {
			const ax = px + DX[pd] * 2, ay = py + DY[pd] * 2;
			const h = s.bugs[0];
			out.x = ax * 2 - Math.round(h.x);
			out.y = ay * 2 - Math.round(h.y);
			return;
		}
		default: {
			const dx = b.x - p.x, dy = b.y - p.y;
			if (dx * dx + dy * dy > 64) {
				out.x = px;
				out.y = py;
			} else {
				out.x = CORNER_X[3];
				out.y = CORNER_Y[3];
			}
		}
	}
}
var target = {
	x: 0,
	y: 0
};
function chooseBugDir(s, b, random) {
	if (b.mode === "eaten" && Math.round(b.x) === 10 && Math.round(b.y) === 7) return -1;
	const back = b.dir >= 0 ? OPPOSITE[b.dir] : -1;
	let count = 0;
	for (let d = 0; d < 4; d += 1) if (d !== back && openDir(b, d)) count += 1;
	if (count === 0) return back >= 0 && openDir(b, back) ? back : -1;
	if (b.frightened) {
		let pick = Math.floor(random() * count);
		for (let d = 0; d < 4; d += 1) {
			if (d === back || !openDir(b, d)) continue;
			if (pick === 0) return d;
			pick -= 1;
		}
	}
	bugTarget(s, b, target);
	let best = -1, bestDist = Infinity;
	const bx = Math.round(b.x), by = Math.round(b.y);
	for (let d = 0; d < 4; d += 1) {
		if (d === back || !openDir(b, d)) continue;
		const dx = bx + DX[d] - target.x, dy = by + DY[d] - target.y;
		const dist = dx * dx + dy * dy;
		if (dist < bestDist) {
			bestDist = dist;
			best = d;
		}
	}
	return best;
}
function choosePlayerDir(p) {
	if (p.want >= 0 && openDir(p, p.want)) return p.want;
	if (p.dir >= 0 && openDir(p, p.dir)) return p.dir;
	return -1;
}
function advance(s, m, dist, bug, random) {
	let moved = 0;
	for (let guard = 0; dist > EPS && guard < 8; guard += 1) {
		if (atCentre(m)) {
			m.x = Math.round(m.x);
			m.y = Math.round(m.y);
			const dir = bug ? chooseBugDir(s, bug, random) : choosePlayerDir(m);
			if (dir < 0) {
				if (!bug) m.dir = -1;
				return moved;
			}
			m.dir = dir;
		}
		const horizontal = DX[m.dir] !== 0;
		const sign = DX[m.dir] + DY[m.dir];
		const along = horizontal ? m.x : m.y;
		const next = sign > 0 ? Math.floor(along + EPS) + 1 : Math.ceil(along - EPS) - 1;
		const gap = Math.abs(next - along);
		const stepLen = Math.min(dist, gap);
		if (horizontal) m.x = gap - stepLen < EPS ? next : m.x + sign * stepLen;
		else m.y = gap - stepLen < EPS ? next : m.y + sign * stepLen;
		dist -= stepLen;
		moved += stepLen;
		wrapX(m);
	}
	return moved;
}
function glide(m, tx, ty, dist) {
	const dx = tx - m.x, dy = ty - m.y;
	const len = Math.hypot(dx, dy);
	if (len <= dist) {
		m.x = tx;
		m.y = ty;
		return true;
	}
	m.x += dx / len * dist;
	m.y += dy / len * dist;
	if (Math.abs(dx) > Math.abs(dy)) m.dir = dx < 0 ? 1 : 3;
	else m.dir = dy < 0 ? 0 : 2;
	return false;
}
function inTunnel(m) {
	return Math.round(m.y) === TUNNEL_ROW && (m.x < 3.5 || m.x > 16.5);
}
function popup(s, x, y, value) {
	let slot = s.popups[0];
	for (const p of s.popups) if (p.time < slot.time) slot = p;
	slot.x = x;
	slot.y = y;
	slot.value = value;
	slot.time = 1;
}
function burst(s, x, y, color, count, random) {
	for (let i = 0; i < count; i += 1) {
		const a = random() * Math.PI * 2, v = 20 + random() * 50;
		emitSpark(s.sparks, tileCx(x), tileCy(y), Math.cos(a) * v, Math.sin(a) * v, .35 + random() * .35, 2, color);
	}
}
function held(input, dir) {
	return dir === 0 ? input.up : dir === 1 ? input.left : dir === 2 ? input.down : input.right;
}
function readInput(p, input) {
	const pr = input.pressed;
	if (pr.up) p.want = 0;
	else if (pr.left) p.want = 1;
	else if (pr.down) p.want = 2;
	else if (pr.right) p.want = 3;
	else if (p.want >= 0 && !held(input, p.want)) {
		for (let d = 0; d < 4; d += 1) if (held(input, d)) {
			p.want = d;
			break;
		}
	}
	if (p.dir >= 0 && p.want === OPPOSITE[p.dir]) p.dir = p.want;
}
function eatDots(s, random) {
	const p = s.player;
	const tx = (Math.round(p.x) % 21 + 21) % 21, ty = Math.round(p.y);
	const i = ty * 21 + tx;
	const v = s.dots[i];
	if (v !== 0) {
		s.dots[i] = 0;
		s.dotsLeft -= 1;
		s.dotsThisRound += 1;
		if (v === 2) {
			s.score += 50;
			s.frightTimer = frightDuration(s.level);
			s.chain = 0;
			for (const b of s.bugs) {
				if (b.mode !== "active") continue;
				b.frightened = true;
				if (b.dir >= 0) b.dir = OPPOSITE[b.dir];
			}
			burst(s, tx, ty, "#ffd23f", 10, random);
		} else s.score += 10;
		const eaten = s.totalDots - s.dotsLeft;
		if (s.bonusShown < 2 && eaten >= Math.floor(s.totalDots * (s.bonusShown === 0 ? .3 : .7))) {
			s.bonusShown += 1;
			s.bonusTimer = BONUS_TIME;
		}
		if (s.dotsLeft === 0) {
			s.phase = "clear";
			s.phaseTimer = 2;
		}
	}
	if (s.bonusTimer > 0 && Math.abs(p.x - 10) < .6 && Math.abs(p.y - 11) < .6) {
		const points = BONUS_POINTS[Math.min(s.level - 1, BONUS_POINTS.length - 1)];
		s.score += points;
		s.bonusTimer = 0;
		popup(s, 10, 11, points);
		burst(s, 10, 11, bonusColor(s.level), 12, random);
	}
}
function moveBug(s, b, dt, random) {
	const k = levelSpeed(s.level);
	switch (b.mode) {
		case "pen":
			if (s.roundTime >= RELEASE_TIME[b.index] / k || s.dotsThisRound >= RELEASE_DOTS[b.index]) b.mode = "leaving";
			return;
		case "leaving": {
			const step = 3.5 * dt;
			if (Math.abs(b.x - 10) > EPS) {
				glide(b, 10, b.y, step);
				return;
			}
			if (glide(b, 10, 7, step)) {
				b.mode = "active";
				b.dir = 1;
				b.frightened = false;
			}
			return;
		}
		case "entering":
			if (glide(b, 10, PEN_Y, 6 * dt)) b.mode = "leaving";
			return;
		case "eaten":
			advance(s, b, 14 * dt, b, random);
			if (Math.abs(b.x - 10) < .15 && Math.abs(b.y - 7) < .15) {
				b.x = 10;
				b.y = 7;
				b.mode = "entering";
			}
			return;
		default: advance(s, b, (inTunnel(b) ? 3.6 : b.frightened ? 4.2 : 6.8 * k) * dt, b, random);
	}
}
function collide(s, random) {
	const p = s.player;
	for (const b of s.bugs) {
		if (b.mode !== "active") continue;
		if (Math.abs(b.x - p.x) > .6 || Math.abs(b.y - p.y) > .6) continue;
		if (b.frightened) {
			const points = CHAIN_POINTS[Math.min(s.chain, CHAIN_POINTS.length - 1)];
			s.chain += 1;
			s.score += points;
			b.frightened = false;
			b.mode = "eaten";
			s.eatPause = EAT_PAUSE;
			popup(s, b.x, b.y, points);
			burst(s, b.x, b.y, "#3de8ff", 10, random);
		} else {
			s.lives -= 1;
			s.phase = "dying";
			s.phaseTimer = DYING_TIME;
			return;
		}
	}
}
function stepMaze(s, input, dt, random) {
	s.ticks += 1;
	stepSparks(s.sparks, dt, 0);
	for (const p$1 of s.popups) p$1.time = Math.max(0, p$1.time - dt);
	if (s.over) return;
	readInput(s.player, input);
	if (s.phase !== "play") {
		s.phaseTimer -= dt;
		if (s.phase === "dying" && s.phaseTimer < 1.4 * .25 && s.phaseTimer + dt >= 1.4 * .25) burst(s, s.player.x, s.player.y, "#ffd23f", 16, random);
		if (s.phaseTimer > 0) return;
		if (s.phase === "dying") {
			if (s.lives <= 0) {
				s.over = true;
				return;
			}
			resetRound(s);
		} else if (s.phase === "clear") {
			s.level += 1;
			fillDots(s);
			resetRound(s);
		} else s.phase = "play";
		return;
	}
	if (s.eatPause > 0) {
		s.eatPause -= dt;
		return;
	}
	s.roundTime += dt;
	if (s.bonusTimer > 0) s.bonusTimer = Math.max(0, s.bonusTimer - dt);
	if (s.frightTimer > 0) {
		s.frightTimer -= dt;
		if (s.frightTimer <= 0) {
			s.frightTimer = 0;
			for (const b of s.bugs) b.frightened = false;
		}
	} else {
		s.modeTimer += dt;
		if (s.modeTimer >= SCHEDULE[s.modeIndex]) {
			s.modeTimer = 0;
			s.modeIndex = Math.min(SCHEDULE.length - 1, s.modeIndex + 1);
			for (const b of s.bugs) if (b.mode === "active" && b.dir >= 0) b.dir = OPPOSITE[b.dir];
		}
	}
	const p = s.player;
	p.chew += advance(s, p, 7.2 * levelSpeed(s.level) * dt, null, random);
	eatDots(s, random);
	if (s.phase !== "play") return;
	collide(s, random);
	if (s.phase !== "play" || s.eatPause > 0) return;
	for (const b of s.bugs) moveBug(s, b, dt, random);
	collide(s, random);
}
const TILE = 10;
var OY = 14;
const WIDTH = 210;
const HEIGHT = 210 + OY * 2;
function tileCx(x) {
	return x * 10 + 10 / 2;
}
function tileCy(y) {
	return OY + y * 10 + 10 / 2;
}
var WALL_SEGMENTS = (() => {
	const out = [];
	const solid = (x, y) => x < 0 || x >= 21 || y < 0 || y >= 21 || MAZE[y][x] === "#";
	const inset = 2;
	for (let y = 0; y < 21; y += 1) for (let x = 0; x < 21; x += 1) {
		if (MAZE[y][x] !== "#") continue;
		const l = x * 10, t = OY + y * 10, r = l + 10, b = t + 10;
		if (!solid(x, y - 1)) out.push(l, t + inset, r, t + inset);
		if (!solid(x, y + 1)) out.push(l, b - inset, r, b - inset);
		if (!solid(x - 1, y)) out.push(l + inset, t, l + inset, b);
		if (!solid(x + 1, y)) out.push(r - inset, t, r - inset, b);
	}
	return out;
})();
var BUG_COLORS = [
	"#ff4d5e",
	"#ff7ad9",
	"#3de8ff",
	"#ffa13d"
];
var BONUS_COLORS = [
	"#ff4d5e",
	"#ffa13d",
	"#ffd23f",
	"#5dea6a",
	"#3de8ff",
	"#4a7dff",
	"#b06bff",
	"#ffffff"
];
function bonusColor(level) {
	return BONUS_COLORS[Math.min(level - 1, BONUS_COLORS.length - 1)];
}
function drawGem(ctx, cx, cy, r, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.moveTo(cx, cy - r);
	ctx.lineTo(cx + r, cy - r * .2);
	ctx.lineTo(cx, cy + r);
	ctx.lineTo(cx - r, cy - r * .2);
	ctx.closePath();
	ctx.fill();
	ctx.fillStyle = "rgba(255,255,255,0.6)";
	ctx.beginPath();
	ctx.moveTo(cx, cy - r);
	ctx.lineTo(cx + r * .4, cy - r * .2);
	ctx.lineTo(cx, cy + r * .2);
	ctx.lineTo(cx - r * .4, cy - r * .2);
	ctx.closePath();
	ctx.fill();
}
function drawChomper(ctx, cx, cy, r, dir, open) {
	const facing = dir === 0 ? -Math.PI / 2 : dir === 1 ? Math.PI : dir === 2 ? Math.PI / 2 : 0;
	ctx.fillStyle = "#ffd23f";
	ctx.beginPath();
	if (open >= Math.PI - .01) return;
	ctx.moveTo(cx, cy);
	ctx.arc(cx, cy, r, facing + open, facing + Math.PI * 2 - open);
	ctx.closePath();
	ctx.fill();
	const ex = cx + Math.cos(facing - Math.PI / 2 - .5) * r * .5;
	const ey = cy + Math.sin(facing - Math.PI / 2 - .5) * r * .5;
	ctx.fillStyle = "#2b1f05";
	ctx.fillRect(Math.round(ex - 1), Math.round(ey - 1), 2, 2);
}
function drawBug(ctx, s, b, info) {
	const bob = b.mode === "pen" && !info.reduced ? Math.sin(info.time * 5 + b.index * 2) * 1.5 : 0;
	const cx = tileCx(b.x), cy = tileCy(b.y) + bob;
	const lookX = b.dir >= 0 ? DX[b.dir] : 0, lookY = b.dir >= 0 ? DY[b.dir] : 0;
	if (b.mode !== "eaten" && b.mode !== "entering") {
		let body = BUG_COLORS[b.index];
		if (b.frightened) {
			const left = s.frightTimer;
			body = "#2a3cc8";
			if (left < 2) {
				if (info.reduced) {
					const k = 1 - left / 2;
					body = `rgb(${Math.round(42 + 180 * k)},${Math.round(60 + 160 * k)},${Math.round(200 + 40 * k)})`;
				} else if (Math.floor(left * 5) % 2 === 0) body = "#e8ecff";
			}
		}
		const legPhase = info.reduced ? 0 : Math.floor((info.time * 10 + b.index) % 2);
		ctx.strokeStyle = body;
		ctx.lineWidth = 1;
		ctx.beginPath();
		for (let i = -1; i <= 1; i += 1) {
			const lx = cx + i * 3, kick = (i + legPhase) % 2 === 0 ? 1 : 0;
			ctx.moveTo(lx, cy + 3);
			ctx.lineTo(lx + (i === 0 ? 0 : i), cy + 5 + kick);
		}
		ctx.moveTo(cx - 2, cy - 4);
		ctx.lineTo(cx - 3, cy - 6);
		ctx.moveTo(cx + 2, cy - 4);
		ctx.lineTo(cx + 3, cy - 6);
		ctx.stroke();
		ctx.fillStyle = body;
		ctx.beginPath();
		ctx.arc(cx, cy, 4.5, Math.PI, 0);
		ctx.lineTo(cx + 4.5, cy + 3);
		ctx.lineTo(cx - 4.5, cy + 3);
		ctx.closePath();
		ctx.fill();
		ctx.fillRect(Math.round(cx - 3.5), Math.round(cy - 7), 1, 1);
		ctx.fillRect(Math.round(cx + 2.5), Math.round(cy - 7), 1, 1);
		if (b.frightened) {
			ctx.strokeStyle = "#ffe0f0";
			ctx.beginPath();
			ctx.moveTo(cx - 3, cy + 1);
			ctx.lineTo(cx - 1.5, cy);
			ctx.lineTo(cx, cy + 1);
			ctx.lineTo(cx + 1.5, cy);
			ctx.lineTo(cx + 3, cy + 1);
			ctx.stroke();
			ctx.fillStyle = "#ffe0f0";
			ctx.fillRect(Math.round(cx - 2), Math.round(cy - 3), 1, 1);
			ctx.fillRect(Math.round(cx + 1), Math.round(cy - 3), 1, 1);
			return;
		}
	}
	ctx.fillStyle = "#0b0f22";
	ctx.fillRect(Math.round(cx - 3.5), Math.round(cy - 2.5), 7, 3);
	ctx.fillStyle = "#e8fbff";
	ctx.fillRect(Math.round(cx - 3 + lookX), Math.round(cy - 2 + lookY * .5), 2, 2);
	ctx.fillRect(Math.round(cx + 1 + lookX), Math.round(cy - 2 + lookY * .5), 2, 2);
}
function drawMaze(ctx, s, info) {
	ctx.fillStyle = "#03040c";
	ctx.fillRect(0, 0, 210, 238);
	ctx.fillStyle = "#0a0f3a";
	for (let y = 0; y < 21; y += 1) for (let x = 0; x < 21; x += 1) if (MAZE[y][x] === "#") ctx.fillRect(x * 10, OY + y * 10, 10, 10);
	let wall = "#3b6bff";
	if (s.phase === "clear") {
		const k = info.reduced ? .6 : .5 + .5 * Math.sin((2 - s.phaseTimer) * Math.PI * 3);
		wall = `rgb(${Math.round(59 + 196 * k)},${Math.round(107 + 148 * k)},255)`;
	}
	ctx.strokeStyle = wall;
	ctx.lineWidth = 1;
	ctx.beginPath();
	for (let i = 0; i < WALL_SEGMENTS.length; i += 4) {
		ctx.moveTo(WALL_SEGMENTS[i] + .5, WALL_SEGMENTS[i + 1] + .5);
		ctx.lineTo(WALL_SEGMENTS[i + 2] + .5, WALL_SEGMENTS[i + 3] + .5);
	}
	ctx.stroke();
	ctx.fillStyle = "#ff7ad9";
	ctx.fillRect(100, OY + 80 + 4, 10, 2);
	ctx.fillStyle = "#ffe6b0";
	const orbR = info.reduced ? 3.5 : 3 + Math.sin(info.time * 6) * .8;
	for (let y = 0; y < 21; y += 1) for (let x = 0; x < 21; x += 1) {
		const v = s.dots[y * 21 + x];
		if (v === 1) ctx.fillRect(x * 10 + 4, OY + y * 10 + 4, 2, 2);
		else if (v === 2) {
			ctx.beginPath();
			ctx.arc(tileCx(x), tileCy(y), orbR, 0, Math.PI * 2);
			ctx.fill();
		}
	}
	if (s.bonusTimer > 0) drawGem(ctx, tileCx(10), tileCy(11), 4, bonusColor(s.level));
	ctx.save();
	ctx.beginPath();
	ctx.rect(0, OY, 210, 210);
	ctx.clip();
	const p = s.player;
	if (s.phase === "dying") {
		const k = 1 - Math.max(0, s.phaseTimer - DYING_TIME * .25) / (DYING_TIME * .75);
		if (s.phaseTimer > 1.4 * .25) drawChomper(ctx, tileCx(p.x), tileCy(p.y), 4.5, 0, .2 + k * (Math.PI - .2));
	} else if (!s.over) {
		const chew = info.idle || info.reduced ? info.idle && !info.reduced ? info.time * 2 : .25 : p.chew;
		const open = .08 + Math.abs(Math.sin(chew * Math.PI)) * .6;
		drawChomper(ctx, tileCx(p.x), tileCy(p.y), 4.5, p.dir >= 0 ? p.dir : p.want >= 0 ? p.want : 1, open);
	}
	if (s.phase !== "dying" && s.phase !== "clear") for (const b of s.bugs) drawBug(ctx, s, b, info);
	ctx.restore();
	drawSparks(ctx, s.sparks);
	for (const pop of s.popups) {
		if (pop.time <= 0) continue;
		ctx.globalAlpha = Math.min(1, pop.time * 2);
		drawDigits(ctx, pop.value, tileCx(pop.x), tileCy(pop.y) - 4 - (info.reduced ? 0 : (1 - pop.time) * 6), 8, "#3de8ff", "center", 600);
	}
	ctx.globalAlpha = 1;
	drawDigits(ctx, s.score, 4, 2, 10, "#ffffff", "left", 600);
	drawGem(ctx, 186, 7, 4, bonusColor(s.level));
	drawDigits(ctx, s.level, 206, 2, 10, "#ffd23f", "right");
	const spare = s.phase === "dying" ? s.lives : s.lives - 1;
	for (let i = 0; i < Math.max(0, spare); i += 1) drawChomper(ctx, 8 + i * 12, 231, 4, 1, .5);
	for (let i = 0; i < Math.min(s.level, 6); i += 1) drawGem(ctx, 202 - i * 11, 231, 3.5, bonusColor(s.level - i));
	if (s.phase === "ready" && !info.idle) {
		ctx.strokeStyle = "rgba(255,210,63,0.6)";
		ctx.lineWidth = 1;
		ctx.beginPath();
		const r = info.reduced ? 8 : 7 + s.phaseTimer % .8 * 4;
		ctx.arc(tileCx(p.x), tileCy(p.y), r, 0, Math.PI * 2);
		ctx.stroke();
	}
}
var mazeMuncher_default = {
	id: "maze-muncher",
	width: 210,
	height: 238,
	create: () => createMaze(),
	step: (state, input, dt, random) => stepMaze(state, input, dt, random),
	draw: (ctx, state, info) => drawMaze(ctx, state, info),
	status: (state) => ({
		score: state.score,
		lives: state.lives,
		level: state.level,
		over: state.over
	})
};
export { BONUS_POINTS, BONUS_X, BONUS_Y, CHAIN_POINTS, CLEAR_TIME, DOT_POINTS, DOWN, DYING_TIME, EXIT_X, EXIT_Y, HEIGHT, LEFT, MAZE, MAZE_H, MAZE_W, NONE, ORB_POINTS, PLAYER_START_X, PLAYER_START_Y, READY_TIME, RIGHT, START_LIVES, TILE, UP, WIDTH, bugTarget, createMaze, mazeMuncher_default as default, drawMaze, frightDuration, isOpen, levelSpeed, stepMaze };
