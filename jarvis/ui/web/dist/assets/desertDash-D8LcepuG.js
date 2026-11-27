import { t as RETRO_STEP } from "./retroGame-GmSLy6cP.js";
import { a as mixRgb, i as hexRgb, n as drawSparks, o as sparkPool, r as emitSpark, s as stepSparks, t as drawDigits } from "./games2Kit-Bo4ay0BU.js";
const WIDTH = 320;
const HEIGHT = 180;
var GROUND_Y = 150;
const RUNNER_X = 36;
const JUMP_SPEED = 400;
const GRAVITY_HELD = 1150;
const GRAVITY = 2300;
const JUMP_CUT = 220;
var DIVE_GRAVITY = 5200;
var JUMP_BUFFER = .1;
const START_SPEED = 160;
const MAX_SPEED = 440;
const SPEED_RAMP = 3.2;
var SCORE_SCALE = 10;
const REACTION = .18;
var DAY_CYCLE = 150;
const STAND_HIT = {
	x0: 5,
	x1: 15,
	h: 17
};
const DUCK_HIT = {
	x0: 3,
	x1: 20,
	h: 9
};
const KINDS = [
	{
		w: 9,
		hx0: 1,
		hx1: 8,
		bottom: 0,
		top: 17,
		bird: false,
		duck: false,
		minScore: 0,
		minSpeed: 0,
		weight: 4
	},
	{
		w: 11,
		hx0: 1,
		hx1: 10,
		bottom: 0,
		top: 27,
		bird: false,
		duck: false,
		minScore: 0,
		minSpeed: 0,
		weight: 3
	},
	{
		w: 20,
		hx0: 1,
		hx1: 19,
		bottom: 0,
		top: 17,
		bird: false,
		duck: false,
		minScore: 60,
		minSpeed: 0,
		weight: 2
	},
	{
		w: 22,
		hx0: 1,
		hx1: 21,
		bottom: 0,
		top: 27,
		bird: false,
		duck: false,
		minScore: 200,
		minSpeed: 220,
		weight: 2
	},
	{
		w: 31,
		hx0: 1,
		hx1: 30,
		bottom: 0,
		top: 17,
		bird: false,
		duck: false,
		minScore: 400,
		minSpeed: 260,
		weight: 1
	},
	{
		w: 16,
		hx0: 2,
		hx1: 14,
		bottom: 3,
		top: 11,
		bird: true,
		duck: false,
		minScore: 300,
		minSpeed: 0,
		weight: 2
	},
	{
		w: 16,
		hx0: 2,
		hx1: 14,
		bottom: 12,
		top: 20,
		bird: true,
		duck: true,
		minScore: 300,
		minSpeed: 0,
		weight: 2
	}
];
var JUMP_PROFILE = (() => {
	const heights = [];
	let y = 0, vy = 400;
	for (let i = 0; i < 400; i += 1) {
		vy -= (vy > 0 ? GRAVITY_HELD : GRAVITY) * RETRO_STEP;
		y += vy * RETRO_STEP;
		if (y <= 0) break;
		heights.push(y);
	}
	return heights;
})();
const AIRTIME = (JUMP_PROFILE.length + 1) * RETRO_STEP;
const JUMP_APEX = Math.max(...JUMP_PROFILE);
function jumpWindow(height) {
	let first = -1, last = -1;
	for (let i = 0; i < JUMP_PROFILE.length; i += 1) if (JUMP_PROFILE[i] > height) {
		if (first < 0) first = i;
		last = i;
	}
	if (first < 0) return null;
	return {
		rise: (first + 1) * RETRO_STEP,
		fall: (last + 1) * RETRO_STEP
	};
}
function clearable(kind, speed) {
	if (kind.duck) return DUCK_HIT.h < kind.bottom;
	const win = jumpWindow(kind.top);
	if (!win) return false;
	const overlap = (kind.hx1 - kind.hx0 + STAND_HIT.x1 - STAND_HIT.x0) / speed;
	return win.fall - win.rise >= overlap + RETRO_STEP * 2;
}
function minGap(speed) {
	return speed * (AIRTIME + REACTION);
}
function speedAt(time) {
	return Math.min(440, 160 + SPEED_RAMP * time);
}
function createDesert(random) {
	const stars = new Float32Array(96);
	for (let i = 0; i < 48; i += 1) {
		stars[i * 2] = random() * 320;
		stars[i * 2 + 1] = random() * 95;
	}
	const obstacles = [];
	for (let i = 0; i < 8; i += 1) obstacles.push({
		active: false,
		kind: 0,
		x: 0
	});
	return {
		y: 0,
		vy: 0,
		onGround: true,
		ducking: false,
		jumpHeld: false,
		jumpBuffer: 0,
		speed: 160,
		distance: 0,
		time: 0,
		score: 0,
		over: false,
		obstacles,
		nextGap: 320 * .6,
		milestone: 0,
		milestoneGlow: 0,
		dustTimer: 0,
		sparks: sparkPool(40),
		stars,
		ticks: 0
	};
}
function pickKind(s, random) {
	let total = 0;
	for (let i = 0; i < KINDS.length; i += 1) if (allowed(KINDS[i], s)) total += KINDS[i].weight;
	let roll = random() * total;
	for (let i = 0; i < KINDS.length; i += 1) {
		if (!allowed(KINDS[i], s)) continue;
		roll -= KINDS[i].weight;
		if (roll < 0) return i;
	}
	return 0;
}
function allowed(kind, s) {
	return s.score >= kind.minScore && s.speed >= kind.minSpeed && clearable(kind, s.speed);
}
function spawnObstacle(s, random) {
	let slot = null;
	for (const o of s.obstacles) if (!o.active) {
		slot = o;
		break;
	}
	const kind = pickKind(s, random);
	const gap = minGap(s.speed) * (1 + random() * .9) + random() * 40;
	if (slot) {
		slot.active = true;
		slot.kind = kind;
		slot.x = 324 + Math.min(0, s.nextGap);
	}
	s.nextGap = KINDS[kind].w + gap;
	return gap;
}
function hitbox(s) {
	return s.ducking ? DUCK_HIT : STAND_HIT;
}
function collides(s, o) {
	const k = KINDS[o.kind];
	const box = hitbox(s);
	const rx0 = 36 + box.x0, rx1 = 36 + box.x1;
	const ox0 = o.x + k.hx0, ox1 = o.x + k.hx1;
	return rx1 > ox0 && rx0 < ox1 && s.y + box.h > k.bottom && s.y < k.top;
}
function dust(s, count, random) {
	for (let i = 0; i < count; i += 1) emitSpark(s.sparks, 42 + random() * 6, GROUND_Y - 1, -s.speed * .3 - random() * 30, -10 - random() * 30, .25 + random() * .25, 2, "#e8c896");
}
function stepDesert(s, input, dt, random) {
	s.ticks += 1;
	stepSparks(s.sparks, dt, 90);
	if (s.over) return;
	s.time += dt;
	s.speed = speedAt(s.time);
	s.distance += s.speed * dt;
	s.score = Math.floor(s.distance / SCORE_SCALE);
	s.milestoneGlow = Math.max(0, s.milestoneGlow - dt);
	if (s.score >= s.milestone + 500) {
		s.milestone += 500;
		s.milestoneGlow = 1;
	}
	const jumpPressed = input.pressed.a || input.pressed.up;
	const jumpDown = input.a || input.up;
	if (jumpPressed) s.jumpBuffer = JUMP_BUFFER;
	else s.jumpBuffer = Math.max(0, s.jumpBuffer - dt);
	if (s.onGround) if (s.jumpBuffer > 0) {
		s.onGround = false;
		s.ducking = false;
		s.vy = 400;
		s.jumpHeld = jumpDown;
		s.jumpBuffer = 0;
	} else s.ducking = input.down;
	if (!s.onGround) {
		if (s.jumpHeld && !jumpDown) {
			s.jumpHeld = false;
			if (s.vy > 220) s.vy = 220;
		}
		const g = input.down ? DIVE_GRAVITY : s.vy > 0 && s.jumpHeld ? GRAVITY_HELD : GRAVITY;
		s.vy -= g * dt;
		s.y += s.vy * dt;
		if (s.y <= 0) {
			s.y = 0;
			s.vy = 0;
			s.onGround = true;
			s.jumpHeld = false;
			s.ducking = input.down;
			dust(s, 5, random);
		}
	}
	s.dustTimer -= dt;
	if (s.onGround && s.dustTimer <= 0) {
		s.dustTimer = .09;
		dust(s, 1, random);
	}
	const shift = s.speed * dt;
	for (const o of s.obstacles) {
		if (!o.active) continue;
		o.x -= shift;
		if (o.x + KINDS[o.kind].w < -4) o.active = false;
	}
	s.nextGap -= shift;
	if (s.nextGap <= 0) spawnObstacle(s, random);
	for (const o of s.obstacles) if (o.active && collides(s, o)) {
		s.over = true;
		for (let i = 0; i < 14; i += 1) {
			const a = random() * Math.PI * 2, v = 30 + random() * 70;
			emitSpark(s.sparks, 46, GROUND_Y - s.y - 10, Math.cos(a) * v, Math.sin(a) * v - 30, .4 + random() * .4, 2, "#ff9a3d");
		}
		return;
	}
}
var pal = (skyTop, skyBottom, far, near, ground, detail, cactus) => ({
	skyTop: hexRgb(skyTop),
	skyBottom: hexRgb(skyBottom),
	far: hexRgb(far),
	near: hexRgb(near),
	ground: hexRgb(ground),
	detail: hexRgb(detail),
	cactus: hexRgb(cactus)
});
var DAY = pal("#6ec6ff", "#ffe9b8", "#e9b97a", "#d99a55", "#f0c27b", "#b8844a", "#2f8f4e");
var DUSK = pal("#4b3a78", "#ff8a5c", "#b8705a", "#8f4f43", "#c98a5e", "#7a4a3a", "#2a6a48");
var NIGHT = pal("#070b24", "#1d2457", "#2b2f5c", "#222650", "#3a3a66", "#262850", "#2a6a5a");
var WHITE = hexRgb("#ffffff");
var GOLD = hexRgb("#ffd23f");
var DAWN = pal("#3f6fb8", "#ffb8a0", "#c99a8a", "#a8766a", "#d8a888", "#8a6a5a", "#2a7a52");
var SKY_KEYS = [
	[0, DAY],
	[.24, DAY],
	[.34, DUSK],
	[.44, NIGHT],
	[.68, NIGHT],
	[.78, DAWN],
	[.88, DAY],
	[1, DAY]
];
function skyAt(phase) {
	let i = 0;
	while (i < SKY_KEYS.length - 2 && phase >= SKY_KEYS[i + 1][0]) i += 1;
	const [t0, a] = SKY_KEYS[i];
	const [t1, b] = SKY_KEYS[i + 1];
	const raw = t1 > t0 ? (phase - t0) / (t1 - t0) : 0;
	const k = raw * raw * (3 - 2 * raw);
	const dark = (p) => p === NIGHT ? 1 : p === DUSK ? .45 : p === DAWN ? .35 : 0;
	return {
		a,
		b,
		k,
		night: dark(a) + (dark(b) - dark(a)) * k
	};
}
function duneLayer(ctx, scroll, base, amp, freq, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.moveTo(0, GROUND_Y);
	for (let x = 0; x <= 320; x += 8) {
		const wx = x + scroll;
		const y = base - (Math.sin(wx * freq) * amp + Math.sin(wx * freq * 2.7 + 1.3) * amp * .35);
		ctx.lineTo(x, y);
	}
	ctx.lineTo(320, GROUND_Y);
	ctx.closePath();
	ctx.fill();
}
function drawCactus(ctx, x, w, h, color) {
	const top = GROUND_Y - h;
	const stem = Math.max(3, Math.round(w * .4));
	const sx = Math.round(x + (w - stem) / 2);
	ctx.fillStyle = color;
	ctx.fillRect(sx, top + 1, stem, h - 1);
	ctx.fillRect(sx + 1, top, stem - 2, 1);
	const armY = top + Math.round(h * .35);
	ctx.fillRect(Math.round(x), armY + 2, sx - Math.round(x), 2);
	ctx.fillRect(Math.round(x), armY - 2, 2, 5);
	ctx.fillRect(sx + stem, armY + 5, Math.round(x + w) - sx - stem, 2);
	ctx.fillRect(Math.round(x + w) - 2, armY + 1, 2, 6);
	ctx.fillStyle = "rgba(255,255,255,0.18)";
	ctx.fillRect(sx + 1, top + 2, 1, h - 4);
}
function drawObstacle(ctx, kindIndex, x, cactus, time, reduced) {
	const k = KINDS[kindIndex];
	if (k.bird) {
		const y = GROUND_Y - k.top;
		const flap = reduced ? 0 : Math.floor(time * 8) % 2;
		ctx.fillStyle = "#5a3a2a";
		ctx.fillRect(Math.round(x + 4), Math.round(y + 3), 9, 4);
		ctx.fillRect(Math.round(x + 1), Math.round(y + 2), 4, 3);
		ctx.fillStyle = "#ffb000";
		ctx.fillRect(Math.round(x - 1), Math.round(y + 3), 2, 1);
		ctx.fillStyle = "#5a3a2a";
		ctx.fillRect(Math.round(x + 13), Math.round(y + 4), 3, 2);
		if (flap === 0) ctx.fillRect(Math.round(x + 6), Math.round(y - 2), 4, 5);
		else ctx.fillRect(Math.round(x + 6), Math.round(y + 6), 4, 4);
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(Math.round(x + 2), Math.round(y + 3), 1, 1);
		return;
	}
	switch (kindIndex) {
		case 0:
			drawCactus(ctx, x, 9, 18, cactus);
			break;
		case 1:
			drawCactus(ctx, x, 11, 28, cactus);
			break;
		case 2:
			drawCactus(ctx, x, 9, 18, cactus);
			drawCactus(ctx, x + 11, 9, 15, cactus);
			break;
		case 3:
			drawCactus(ctx, x, 11, 28, cactus);
			drawCactus(ctx, x + 13, 9, 18, cactus);
			break;
		default:
			drawCactus(ctx, x, 9, 16, cactus);
			drawCactus(ctx, x + 11, 9, 18, cactus);
			drawCactus(ctx, x + 22, 9, 14, cactus);
	}
}
function drawFox(ctx, s, legFrame, dead) {
	const x = 36;
	const fur = "#ff9a3d", cream = "#ffe6c0", dark = "#2a1a0a";
	if (s.ducking && s.onGround && !dead) {
		const top$1 = GROUND_Y - 11;
		ctx.fillStyle = fur;
		ctx.fillRect(x - 3, top$1 + 3, 6, 3);
		ctx.fillRect(x + 2, top$1 + 3, 14, 6);
		ctx.fillRect(x + 14, top$1 + 1, 8, 6);
		ctx.fillRect(x + 11, top$1, 5, 2);
		ctx.fillStyle = cream;
		ctx.fillRect(x - 3, top$1 + 3, 2, 2);
		ctx.fillRect(x + 20, top$1 + 4, 3, 2);
		ctx.fillRect(x + 6, top$1 + 7, 8, 2);
		ctx.fillStyle = dark;
		ctx.fillRect(x + 18, top$1 + 3, 1, 1);
		ctx.fillRect(x + 23, top$1 + 4, 1, 1);
		ctx.fillStyle = fur;
		ctx.fillRect(x + 4 + legFrame * 2, top$1 + 9, 2, 2);
		ctx.fillRect(x + 12 - legFrame * 2, top$1 + 9, 2, 2);
		return;
	}
	const top = GROUND_Y - 20 - Math.round(s.y);
	ctx.fillStyle = fur;
	ctx.fillRect(x, top + 8, 5, 4);
	ctx.fillRect(x + 4, top + 8, 9, 7);
	ctx.fillRect(x + 8, top + 2, 8, 7);
	ctx.fillRect(x + 9, top - 2, 2, 4);
	ctx.fillRect(x + 13, top - 2, 2, 4);
	ctx.fillStyle = cream;
	ctx.fillRect(x, top + 8, 2, 3);
	ctx.fillRect(x + 7, top + 11, 5, 3);
	ctx.fillRect(x + 14, top + 5, 3, 3);
	ctx.fillRect(x + 10, top - 1, 1, 2);
	ctx.fillRect(x + 14, top - 1, 1, 2);
	ctx.fillStyle = dark;
	ctx.fillRect(x + 17, top + 5, 1, 1);
	if (dead) {
		ctx.fillRect(x + 11, top + 3, 1, 1);
		ctx.fillRect(x + 13, top + 3, 1, 1);
		ctx.fillRect(x + 12, top + 4, 1, 1);
		ctx.fillRect(x + 11, top + 5, 1, 1);
		ctx.fillRect(x + 13, top + 5, 1, 1);
	} else ctx.fillRect(x + 12, top + 4, 1, 2);
	ctx.fillStyle = fur;
	if (!s.onGround) {
		ctx.fillRect(x + 5, top + 15, 2, 3);
		ctx.fillRect(x + 10, top + 15, 2, 3);
	} else {
		ctx.fillRect(x + 5, top + 15, 2, legFrame === 0 ? 5 : 3);
		ctx.fillRect(x + 10, top + 15, 2, legFrame === 0 ? 3 : 5);
	}
}
function drawDesert(ctx, s, info) {
	const attract = info.idle && s.ticks === 0;
	const scroll = attract ? info.reduced ? 0 : info.time * 24 : s.distance;
	const sky = skyAt((s.time / DAY_CYCLE % 1 + 1) % 1);
	const c = (pick) => mixRgb(pick(sky.a), pick(sky.b), sky.k);
	const grad = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
	grad.addColorStop(0, c((p) => p.skyTop));
	grad.addColorStop(1, c((p) => p.skyBottom));
	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, 320, 180);
	if (sky.night > .05) {
		ctx.fillStyle = "#ffffff";
		for (let i = 0; i < s.stars.length; i += 2) {
			const twinkle = info.reduced ? 1 : .6 + .4 * Math.sin(info.time * 2 + i);
			ctx.globalAlpha = sky.night * twinkle * .9;
			const sx = ((s.stars[i] - scroll * .02) % 320 + 320) % 320;
			ctx.fillRect(Math.round(sx), Math.round(s.stars[i + 1]), 1, 1);
		}
		ctx.globalAlpha = 1;
	}
	const sunAlpha = 1 - sky.night;
	if (sunAlpha > .02) {
		ctx.globalAlpha = sunAlpha;
		ctx.fillStyle = "#fff4c2";
		ctx.beginPath();
		ctx.arc(250, 36 + sky.night * 70, 14, 0, Math.PI * 2);
		ctx.fill();
		ctx.globalAlpha = 1;
	}
	if (sky.night > .02) {
		ctx.globalAlpha = sky.night;
		ctx.fillStyle = "#f2f0ff";
		ctx.beginPath();
		ctx.arc(70, 34, 9, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = c((p) => p.skyTop);
		ctx.beginPath();
		ctx.arc(74, 31, 8, 0, Math.PI * 2);
		ctx.fill();
		ctx.globalAlpha = 1;
	}
	duneLayer(ctx, scroll * .12, 112, 9, .011, c((p) => p.far));
	duneLayer(ctx, scroll * .35, 132, 7, .02, c((p) => p.near));
	ctx.fillStyle = c((p) => p.ground);
	ctx.fillRect(0, GROUND_Y, 320, 180 - GROUND_Y);
	ctx.fillStyle = c((p) => p.detail);
	ctx.fillRect(0, GROUND_Y, 320, 1);
	const first = Math.floor(scroll / 13);
	for (let i = first; i < first + Math.ceil(320 / 13) + 2; i += 1) {
		const h = (Math.imul(i, 2654435761) >>> 0) / 4294967296;
		const px = Math.round(i * 13 - scroll + h * 9);
		const py = GROUND_Y + 3 + Math.floor(h * 24);
		ctx.fillRect(px, py, h > .7 ? 3 : 1, 1);
	}
	const cactus = c((p) => p.cactus);
	if (attract) {
		drawCactus(ctx, 170, 11, 28, cactus);
		drawCactus(ctx, 250, 9, 18, cactus);
	} else for (const o of s.obstacles) if (o.active) drawObstacle(ctx, o.kind, o.x, cactus, info.time, info.reduced);
	drawFox(ctx, s, attract ? info.reduced ? 0 : Math.floor(info.time * 8) % 2 : Math.floor(s.distance / 14) % 2, s.over);
	drawSparks(ctx, s.sparks);
	const color = s.milestoneGlow > 0 ? mixRgb(WHITE, GOLD, s.milestoneGlow) : "#ffffff";
	ctx.fillStyle = "rgba(0,0,0,0.25)";
	ctx.fillRect(268, 4, 48, 13);
	drawDigits(ctx, String(s.score).padStart(5, "0"), 313, 5, 10, color, "right", 600);
}
var desertDash_default = {
	id: "desert-dash",
	width: 320,
	height: 180,
	create: (random) => createDesert(random),
	step: (state, input, dt, random) => stepDesert(state, input, dt, random),
	draw: (ctx, state, info) => drawDesert(ctx, state, info),
	status: (state) => ({
		score: state.score,
		over: state.over
	})
};
export { AIRTIME, DUCK_HIT, GRAVITY, GRAVITY_HELD, HEIGHT, JUMP_APEX, JUMP_CUT, JUMP_SPEED, KINDS, MAX_SPEED, REACTION, RUNNER_X, SPEED_RAMP, STAND_HIT, START_SPEED, WIDTH, clearable, collides, createDesert, desertDash_default as default, drawDesert, jumpWindow, minGap, pickKind, spawnObstacle, speedAt, stepDesert };
