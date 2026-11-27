import { a as drawStars, c as sprite, i as drawSprite, l as starField, n as drawNumber, o as emitBurst, r as drawParticles, s as makeParticles, t as clamp, u as stepParticles } from "./games3Kit-Cb6PLO-y.js";
const WIDTH = 224;
const HEIGHT = 256;
const COLS = 11;
const ROWS = 5;
const CELL_W = 16;
const CELL_H = 16;
var ALIEN_H = 8;
const MARCH_X = 2;
const DROP_Y = 8;
var EDGE_MARGIN = 6;
var ROW_KIND = [
	0,
	1,
	1,
	2,
	2
];
var KIND_W = [
	8,
	10,
	12
];
const KIND_POINTS = [
	30,
	20,
	10
];
var KIND_COLOR = [
	"#ff7ae0",
	"#7ae8ff",
	"#9dff7a"
];
const PLAYER_Y = 216;
const PLAYER_W = 13;
var PLAYER_H = 8;
var PLAYER_SPEED = 80;
var PLAYER_START_X = Math.round(211 / 2);
const MAX_SHOTS = 2;
var SHOT_SPEED = 260;
var SHOT_COOLDOWN = .32;
var GROUND_Y = 230;
const MAX_BOMBS = 6;
const BUNKER_COUNT = 4;
const BUNKER_COLS = 11;
const BUNKER_ROWS = 8;
const BUNKER_CELL = 2;
const BUNKER_Y = 184;
const BUNKER_X = [
	0,
	1,
	2,
	3
].map((i) => Math.round(224 * (i + 1) / 5 - 22 / 2));
var BUNKER_SHAPE = [
	"..#######..",
	".#########.",
	"###########",
	"###########",
	"###########",
	"###########",
	"###.....###",
	"##.......##"
];
var SAUCER_W = 16;
var SAUCER_Y = 26;
var SAUCER_SPEED = 48;
var SAUCER_POINTS = [
	50,
	100,
	100,
	150,
	150,
	300
];
var DEATH_S = 1.4;
var CLEAR_S = 1.6;
var EXTRA_LIFE_EVERY = 2e3;
var MAX_LIVES = 5;
var ALIEN_SPRITES = [
	[sprite([
		"..####..",
		".######.",
		"##.##.##",
		"########",
		".#.##.#.",
		"#..##..#",
		".#....#.",
		"..#..#.."
	]), sprite([
		"..####..",
		".######.",
		"##.##.##",
		"########",
		".#.##.#.",
		".#.##.#.",
		"#..##..#",
		"#......#"
	])],
	[sprite([
		"#........#",
		".#..##..#.",
		"..######..",
		".##.##.##.",
		"##########",
		".#.####.#.",
		"#.#....#.#",
		".#......#."
	]), sprite([
		"..#....#..",
		"..#.##.#..",
		"..######..",
		".##.##.##.",
		"##########",
		"#.######.#",
		"..#....#..",
		".#.#..#.#."
	])],
	[sprite([
		".....##.....",
		"...######...",
		".##########.",
		"##.##..##.##",
		"############",
		".#.#.##.#.#.",
		"#.#......#.#",
		".#........#."
	]), sprite([
		".....##.....",
		"...######...",
		".##########.",
		"##.##..##.##",
		"############",
		"..#.#..#.#..",
		".#.#....#.#.",
		"#.#......#.#"
	])]
];
var BURST_SPRITE = sprite([
	"#..#..#.#..",
	".#..#.#..#.",
	"..#.....#..",
	"##.......##",
	"..#.....#..",
	".#..#.#..#.",
	"#..#...#..#"
]);
var PLAYER_SPRITE = sprite([
	"......#......",
	".....###.....",
	"....#####....",
	".###########.",
	"#############",
	"#############",
	"#.#.#.#.#.#.#",
	".#.#.#.#.#.#."
]);
var WRECK_SPRITES = [sprite([
	"..#.....#....",
	"....#.#...#..",
	"#..#####.....",
	"..#######.#..",
	".##.###.###..",
	"#############",
	"#.#.#.#.#.#.#",
	".#.#.#.#.#.#."
]), sprite([
	"#.....#....#.",
	"...#.....#...",
	"..#.##.#.....",
	"#.##.###.##..",
	".###.###.###.",
	"#############",
	".#.#.#.#.#.#.",
	"#.#.#.#.#.#.#"
])];
var SAUCER_SPRITE = sprite([
	".....######.....",
	"...##########...",
	"..############..",
	".##.##.##.##.##.",
	"################",
	"..###..##..###..",
	"...#........#..."
]);
var LIFE_SPRITE = sprite([
	"...#...",
	"..###..",
	"#######",
	"#######"
]);
function stepDelay(alive, wave) {
	return (.012 + .45 * clamp((alive - 1) / 54, 0, 1)) * Math.max(.55, 1 - .07 * (wave - 1));
}
function waveStartY(wave) {
	return 48 + Math.min(wave - 1, 7) * 8;
}
function maxBombs(wave) {
	return Math.min(6, 2 + Math.floor(wave / 2));
}
function resetBunkers(bunkers) {
	for (let b = 0; b < 4; b += 1) for (let r = 0; r < 8; r += 1) for (let c = 0; c < 11; c += 1) bunkers[(b * 8 + r) * 11 + c] = BUNKER_SHAPE[r][c] === "#" ? 1 : 0;
}
function bunkerCells(state, bunker) {
	let n = 0;
	const base = bunker * 8 * 11;
	for (let i = 0; i < 88; i += 1) n += state.bunkers[base + i];
	return n;
}
function startWave(state, random) {
	state.alive.fill(1);
	state.aliveCount = 55;
	state.fx = Math.round(48 / 2);
	state.fy = waveStartY(state.wave);
	state.dir = 1;
	state.frame = 0;
	state.stepTimer = stepDelay(state.aliveCount, state.wave);
	state.fireTimer = 1.2 + random();
	for (const s of state.shots) s.active = false;
	for (const b of state.bombs) b.active = false;
	resetBunkers(state.bunkers);
	state.saucer.active = false;
	state.saucerTimer = 14 + random() * 10;
}
function create(random) {
	const state = {
		phase: "play",
		timer: 0,
		elapsed: 0,
		score: 0,
		lives: 3,
		wave: 1,
		nextLifeAt: EXTRA_LIFE_EVERY,
		px: PLAYER_START_X,
		cooldown: 0,
		shots: Array.from({ length: 2 }, () => ({
			active: false,
			x: 0,
			y: 0
		})),
		bombs: Array.from({ length: 6 }, () => ({
			active: false,
			x: 0,
			y: 0,
			kind: 0,
			speed: 0
		})),
		alive: new Uint8Array(55),
		aliveCount: 0,
		fx: 0,
		fy: 0,
		dir: 1,
		stepTimer: 0,
		frame: 0,
		fireTimer: 0,
		bunkers: new Uint8Array(352),
		saucer: {
			active: false,
			x: 0,
			dir: 1,
			points: 0
		},
		saucerTimer: 0,
		bursts: Array.from({ length: 8 }, () => ({
			active: false,
			x: 0,
			y: 0,
			t: 0,
			color: "#fff"
		})),
		popups: Array.from({ length: 3 }, () => ({
			active: false,
			x: 0,
			y: 0,
			t: 0,
			value: 0
		})),
		particles: makeParticles(120),
		shake: 0
	};
	startWave(state, random);
	return state;
}
function alienX(state, row, col) {
	return state.fx + col * 16 + (16 - KIND_W[ROW_KIND[row]]) / 2;
}
function alienY(state, row) {
	return state.fy + row * 16;
}
function addScore(state, points) {
	state.score += points;
	if (state.score >= state.nextLifeAt) {
		state.nextLifeAt += EXTRA_LIFE_EVERY;
		state.lives = Math.min(MAX_LIVES, state.lives + 1);
	}
}
function spawnBurst(state, x, y, color) {
	const slot = state.bursts.find((b) => !b.active) ?? state.bursts[0];
	slot.active = true;
	slot.x = x;
	slot.y = y;
	slot.t = .2;
	slot.color = color;
}
function erode(state, bunker, cx, cy, down, random) {
	const base = bunker * 8 * 11;
	for (let dy = -1; dy <= 1; dy += 1) for (let dx = -1; dx <= 1; dx += 1) {
		const x = cx + dx, y = cy + dy;
		if (x < 0 || y < 0 || x >= 11 || y >= 8) continue;
		if (dx === 0 && dy === 0 || random() < .4) state.bunkers[base + y * 11 + x] = 0;
	}
	const deeper = cy + (down ? 2 : -2);
	if (deeper >= 0 && deeper < 8 && random() < .5) state.bunkers[base + deeper * 11 + cx] = 0;
	emitBurst(state.particles, BUNKER_X[bunker] + cx * 2, 184 + cy * 2, 4, 30, "#4dff88", random, .3);
}
function hitBunker(state, x, y, down, random) {
	if (y < 184 || y >= 200) return false;
	for (let b = 0; b < 4; b += 1) {
		const bx = BUNKER_X[b];
		if (x < bx || x >= bx + 22) continue;
		const cx = Math.floor((x - bx) / 2), cy = Math.floor((y - 184) / 2);
		if (state.bunkers[(b * 8 + cy) * 11 + cx]) {
			erode(state, b, cx, cy, down, random);
			return true;
		}
		return false;
	}
	return false;
}
function killAlien(state, row, col, random) {
	state.alive[row * 11 + col] = 0;
	state.aliveCount -= 1;
	const kind = ROW_KIND[row];
	addScore(state, KIND_POINTS[kind]);
	const x = alienX(state, row, col), y = alienY(state, row);
	spawnBurst(state, x + KIND_W[kind] / 2, y + ALIEN_H / 2, KIND_COLOR[kind]);
	emitBurst(state.particles, x + KIND_W[kind] / 2, y + ALIEN_H / 2, 10, 70, KIND_COLOR[kind], random, .45);
	if (state.aliveCount === 0) {
		state.phase = "clear";
		state.timer = CLEAR_S;
		for (const b of state.bombs) b.active = false;
		state.saucer.active = false;
	}
}
function alienAt(state, x, y) {
	const col = Math.floor((x - state.fx) / 16), row = Math.floor((y - state.fy) / 16);
	if (col < 0 || col >= 11 || row < 0 || row >= 5 || !state.alive[row * 11 + col]) return -1;
	const ax = alienX(state, row, col), ay = alienY(state, row);
	return x >= ax && x < ax + KIND_W[ROW_KIND[row]] && y >= ay && y < ay + ALIEN_H ? row * 11 + col : -1;
}
function killPlayer(state, random) {
	state.phase = "dying";
	state.timer = DEATH_S;
	state.lives = Math.max(0, state.lives - 1);
	state.shake = .4;
	for (const b of state.bombs) b.active = false;
	for (const s of state.shots) s.active = false;
	emitBurst(state.particles, state.px + 13 / 2, 220, 28, 90, "#63f3ff", random, .9);
	emitBurst(state.particles, state.px + 13 / 2, 220, 14, 60, "#fff6a8", random, .6);
}
function formationBounds(state, out) {
	let minCol = 11, maxCol = -1, maxRow = -1;
	for (let r = 0; r < 5; r += 1) for (let c = 0; c < 11; c += 1) {
		if (!state.alive[r * 11 + c]) continue;
		if (c < minCol) minCol = c;
		if (c > maxCol) maxCol = c;
		if (r > maxRow) maxRow = r;
	}
	out[0] = minCol;
	out[1] = maxCol;
	out[2] = maxRow;
	return maxCol >= 0;
}
var bounds = [
	0,
	0,
	0
];
function march(state, random) {
	if (!formationBounds(state, bounds)) return;
	const [minCol, maxCol, maxRow] = bounds;
	const left = state.fx + minCol * 16 + 1;
	const right = state.fx + (maxCol + 1) * 16 - 1;
	if (state.dir > 0 ? right + 2 > 224 - EDGE_MARGIN : left - 2 < EDGE_MARGIN) {
		state.fy += 8;
		state.dir = state.dir > 0 ? -1 : 1;
	} else state.fx += 2 * state.dir;
	state.frame = state.frame ? 0 : 1;
	const bottom = state.fy + maxRow * 16 + ALIEN_H;
	if (bottom > 184) for (let r = 0; r <= maxRow; r += 1) {
		const ay = alienY(state, r);
		if (ay + ALIEN_H <= 184) continue;
		for (let c = 0; c < 11; c += 1) {
			if (!state.alive[r * 11 + c]) continue;
			const ax = alienX(state, r, c);
			for (let y = ay; y < ay + ALIEN_H; y += 2) for (let x = ax; x < ax + KIND_W[ROW_KIND[r]]; x += 2) clearBunkerAt(state, x, y);
		}
	}
	if (bottom >= 216 && state.phase === "play") {
		killPlayer(state, random);
		state.lives = 0;
	}
}
function clearBunkerAt(state, x, y) {
	if (y < 184 || y >= 200) return;
	for (let b = 0; b < 4; b += 1) {
		const bx = BUNKER_X[b];
		if (x < bx || x >= bx + 22) continue;
		state.bunkers[(b * 8 + Math.floor((y - 184) / 2)) * 11 + Math.floor((x - bx) / 2)] = 0;
	}
}
function alienFire(state, random) {
	let active = 0;
	for (const b of state.bombs) if (b.active) active += 1;
	if (active >= maxBombs(state.wave)) return;
	const aimed = random() < .45;
	let col = -1;
	if (aimed) {
		let best = Infinity;
		const target = state.px + 13 / 2;
		for (let c = 0; c < 11; c += 1) {
			if (!columnAlive(state, c)) continue;
			const d = Math.abs(state.fx + c * 16 + 16 / 2 - target);
			if (d < best) {
				best = d;
				col = c;
			}
		}
	} else {
		let living = 0;
		for (let c = 0; c < 11; c += 1) if (columnAlive(state, c)) living += 1;
		let pick = Math.floor(random() * living);
		for (let c = 0; c < 11 && col < 0; c += 1) if (columnAlive(state, c) && pick-- === 0) col = c;
	}
	if (col < 0) return;
	let row = 4;
	while (row >= 0 && !state.alive[row * 11 + col]) row -= 1;
	const bomb = state.bombs.find((b) => !b.active);
	if (!bomb || row < 0) return;
	bomb.active = true;
	bomb.x = Math.round(state.fx + col * 16 + 16 / 2);
	bomb.y = alienY(state, row) + ALIEN_H;
	bomb.kind = aimed ? 1 : random() < .3 ? 2 : 0;
	bomb.speed = 70 + 6 * Math.min(state.wave, 8) + (bomb.kind === 2 ? 30 : 0);
}
function columnAlive(state, col) {
	for (let r = 0; r < 5; r += 1) if (state.alive[r * 11 + col]) return true;
	return false;
}
function stepShots(state, dt, random) {
	for (const shot of state.shots) {
		if (!shot.active) continue;
		const steps = Math.max(1, Math.ceil(SHOT_SPEED * dt / 2));
		const stepLen = SHOT_SPEED * dt / steps;
		for (let i = 0; i < steps && shot.active; i += 1) {
			shot.y -= stepLen;
			if (shot.y < 12) {
				shot.active = false;
				break;
			}
			if (hitBunker(state, shot.x, shot.y, false, random)) {
				shot.active = false;
				break;
			}
			const hit = alienAt(state, shot.x, shot.y);
			if (hit >= 0) {
				shot.active = false;
				killAlien(state, Math.floor(hit / 11), hit % 11, random);
				break;
			}
			const s = state.saucer;
			if (s.active && shot.x >= s.x && shot.x < s.x + SAUCER_W && shot.y >= SAUCER_Y && shot.y < SAUCER_Y + 7) {
				shot.active = false;
				s.active = false;
				addScore(state, s.points);
				const popup = state.popups.find((p) => !p.active) ?? state.popups[0];
				popup.active = true;
				popup.x = s.x + SAUCER_W / 2;
				popup.y = SAUCER_Y;
				popup.t = 1.2;
				popup.value = s.points;
				emitBurst(state.particles, s.x + SAUCER_W / 2, SAUCER_Y + 3, 18, 80, "#ff4f6d", random, .6);
				break;
			}
			for (const b of state.bombs) if (b.active && Math.abs(b.x - shot.x) <= 1.5 && shot.y >= b.y - 1 && shot.y <= b.y + 7) {
				b.active = false;
				shot.active = false;
				emitBurst(state.particles, shot.x, shot.y, 6, 40, "#ffffff", random, .3);
				break;
			}
		}
	}
}
function stepBombs(state, dt, random) {
	for (const b of state.bombs) {
		if (!b.active) continue;
		const steps = Math.max(1, Math.ceil(b.speed * dt / 2));
		const stepLen = b.speed * dt / steps;
		for (let i = 0; i < steps && b.active; i += 1) {
			b.y += stepLen;
			const tip = b.y + 6;
			if (tip >= GROUND_Y) {
				b.active = false;
				emitBurst(state.particles, b.x, GROUND_Y - 1, 4, 25, "#c58bff", random, .3);
				break;
			}
			if (hitBunker(state, b.x, tip, true, random)) {
				b.active = false;
				break;
			}
			if (state.phase === "play" && b.x >= state.px && b.x < state.px + 13 && tip >= 218 && b.y < 216 + PLAYER_H) {
				b.active = false;
				killPlayer(state, random);
				return;
			}
		}
	}
}
function step(state, input, dt, random) {
	if (state.phase === "over") {
		stepParticles(state.particles, dt, 40);
		return;
	}
	state.elapsed += dt;
	state.shake = Math.max(0, state.shake - dt);
	stepParticles(state.particles, dt, 40);
	for (const b of state.bursts) if (b.active && (b.t -= dt) <= 0) b.active = false;
	for (const p of state.popups) if (p.active && (p.t -= dt) <= 0) p.active = false;
	if (state.phase === "dying") {
		state.timer -= dt;
		if (state.timer <= 0) if (state.lives <= 0) state.phase = "over";
		else {
			state.phase = "play";
			state.px = PLAYER_START_X;
			state.cooldown = .4;
			state.fireTimer = Math.max(state.fireTimer, 1);
		}
		return;
	}
	if (state.phase === "clear") {
		stepShots(state, dt, random);
		state.timer -= dt;
		if (state.timer <= 0) {
			state.wave += 1;
			state.phase = "play";
			startWave(state, random);
		}
		return;
	}
	const move = (input.right ? 1 : 0) - (input.left ? 1 : 0);
	state.px = clamp(state.px + move * PLAYER_SPEED * dt, 4, 207);
	state.cooldown -= dt;
	if ((input.a || input.pressed.a) && state.cooldown <= 0) {
		const shot = state.shots.find((s$1) => !s$1.active);
		if (shot) {
			shot.active = true;
			shot.x = Math.round(state.px) + 6;
			shot.y = 215;
			state.cooldown = SHOT_COOLDOWN;
		}
	}
	stepShots(state, dt, random);
	if (state.phase !== "play") return;
	state.stepTimer -= dt;
	if (state.stepTimer <= 0) {
		march(state, random);
		state.stepTimer = stepDelay(state.aliveCount, state.wave);
		if (state.phase !== "play") return;
	}
	state.fireTimer -= dt;
	if (state.fireTimer <= 0) {
		alienFire(state, random);
		state.fireTimer = (.45 + random() * .9) * Math.max(.45, 1 - .08 * (state.wave - 1));
	}
	stepBombs(state, dt, random);
	if (state.phase !== "play") return;
	const s = state.saucer;
	if (s.active) {
		s.x += s.dir * SAUCER_SPEED * dt;
		if (s.x < -SAUCER_W - 2 || s.x > 226) s.active = false;
	} else {
		state.saucerTimer -= dt;
		if (state.saucerTimer <= 0 && state.aliveCount >= 8) {
			s.active = true;
			s.dir = random() < .5 ? 1 : -1;
			s.x = s.dir > 0 ? -SAUCER_W : 224;
			s.points = SAUCER_POINTS[Math.floor(random() * SAUCER_POINTS.length)];
			state.saucerTimer = 16 + random() * 14;
		}
	}
}
function status(state) {
	return {
		score: state.score,
		lives: state.lives,
		level: state.wave,
		over: state.phase === "over"
	};
}
var STARS = starField(40, 224, 200, 7);
function draw(ctx, state, info) {
	ctx.fillStyle = "#05030f";
	ctx.fillRect(0, 0, 224, 256);
	drawStars(ctx, STARS, info.time, info.reduced);
	ctx.save();
	if (state.shake > 0 && !info.reduced) ctx.translate(Math.round(Math.sin(info.time * 83) * state.shake * 5), Math.round(Math.cos(info.time * 71) * state.shake * 3));
	const frame = info.idle && state.elapsed === 0 ? Math.floor(info.time * 1.6) % 2 : state.frame;
	for (let r = 0; r < 5; r += 1) {
		const kind = ROW_KIND[r];
		ctx.fillStyle = KIND_COLOR[kind];
		const spr = ALIEN_SPRITES[kind][frame];
		for (let c = 0; c < 11; c += 1) if (state.alive[r * 11 + c]) drawSprite(ctx, spr, alienX(state, r, c), alienY(state, r));
	}
	for (const b of state.bursts) {
		if (!b.active) continue;
		ctx.fillStyle = b.color;
		drawSprite(ctx, BURST_SPRITE, b.x - 5, b.y - 3);
	}
	const s = state.saucer;
	if (s.active) {
		ctx.fillStyle = "#ff4f6d";
		drawSprite(ctx, SAUCER_SPRITE, s.x, SAUCER_Y);
		ctx.fillStyle = "#fff3a8";
		const lit = info.reduced ? 0 : Math.floor(info.time * 8) % 5;
		for (let i = 0; i < 5; i += 1) if (i === lit || info.reduced) ctx.fillRect(Math.round(s.x) + 1 + i * 3, SAUCER_Y + 3, 1, 1);
	}
	ctx.fillStyle = "#ffd35a";
	for (const p of state.popups) if (p.active) drawNumber(ctx, p.value, p.x, p.y + (info.reduced ? 0 : -(1.2 - p.t) * 6), 1, "center");
	ctx.fillStyle = "#4dff88";
	for (let b = 0; b < 4; b += 1) for (let r = 0; r < 8; r += 1) for (let c = 0; c < 11; c += 1) if (state.bunkers[(b * 8 + r) * 11 + c]) ctx.fillRect(BUNKER_X[b] + c * 2, 184 + r * 2, 2, 2);
	if (state.phase === "dying") {
		ctx.fillStyle = "#63f3ff";
		drawSprite(ctx, WRECK_SPRITES[info.reduced ? 0 : Math.floor(info.time * 6) % 2], state.px, 216);
	} else if (state.phase !== "over") {
		ctx.fillStyle = "#63f3ff";
		drawSprite(ctx, PLAYER_SPRITE, state.px, 216);
	}
	ctx.fillStyle = "#ffffff";
	for (const shot of state.shots) if (shot.active) ctx.fillRect(shot.x, Math.round(shot.y), 1, 5);
	for (const b of state.bombs) {
		if (!b.active) continue;
		const y = Math.round(b.y);
		if (b.kind === 1) {
			ctx.fillStyle = "#ffd35a";
			const phase = Math.floor(y / 3) % 2;
			for (let i = 0; i < 7; i += 1) ctx.fillRect(b.x - 1 + (i + phase) % 2 * 2, y + i, 1, 1);
		} else if (b.kind === 2) {
			ctx.fillStyle = "#ff7a5a";
			ctx.fillRect(b.x, y, 1, 7);
			ctx.fillRect(b.x - 1, y + 4, 3, 1);
		} else {
			ctx.fillStyle = "#f0e6ff";
			ctx.fillRect(b.x, y, 1, 6);
			ctx.fillRect(b.x - 1, y + 1 + Math.floor(y / 4) % 2 * 3, 3, 1);
		}
	}
	drawParticles(ctx, state.particles);
	ctx.restore();
	ctx.fillStyle = "#5c3dff";
	ctx.fillRect(0, GROUND_Y, 224, 1);
	ctx.fillStyle = "#e9e4ff";
	drawNumber(ctx, state.score, 6, 5, 2);
	ctx.fillStyle = "#c58bff";
	drawNumber(ctx, state.wave, 218, 5, 2, "right");
	ctx.fillStyle = "#63f3ff";
	for (let i = 0; i < Math.min(state.lives, MAX_LIVES); i += 1) drawSprite(ctx, LIFE_SPRITE, 6 + i * 10, GROUND_Y + 10);
	if (state.phase === "clear") {
		ctx.fillStyle = "#c58bff";
		drawNumber(ctx, state.wave + 1, 224 / 2, 110, 5, "center");
	}
}
var pixelRaiders_default = {
	id: "pixel-raiders",
	width: 224,
	height: 256,
	create,
	step,
	draw,
	status
};
export { BUNKER_CELL, BUNKER_COLS, BUNKER_COUNT, BUNKER_ROWS, BUNKER_X, BUNKER_Y, CELL_H, CELL_W, COLS, DROP_Y, HEIGHT, KIND_POINTS, MARCH_X, MAX_BOMBS, MAX_SHOTS, PLAYER_W, PLAYER_Y, ROWS, WIDTH, alienX, alienY, bunkerCells, pixelRaiders_default as default, march, stepDelay, waveStartY };
