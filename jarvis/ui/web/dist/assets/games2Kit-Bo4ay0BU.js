import { n as retroFont } from "./retroGame-GmSLy6cP.js";
function sparkPool(capacity) {
	const pool = [];
	for (let i = 0; i < capacity; i += 1) pool.push({
		x: 0,
		y: 0,
		vx: 0,
		vy: 0,
		life: 0,
		max: 1,
		size: 1,
		color: "#ffffff"
	});
	return pool;
}
function emitSpark(pool, x, y, vx, vy, life, size, color) {
	if (pool.length === 0) return;
	let slot = pool[0];
	for (let i = 0; i < pool.length; i += 1) {
		const s = pool[i];
		if (s.life <= 0) {
			slot = s;
			break;
		}
		if (s.life < slot.life) slot = s;
	}
	slot.x = x;
	slot.y = y;
	slot.vx = vx;
	slot.vy = vy;
	slot.life = life;
	slot.max = life;
	slot.size = size;
	slot.color = color;
}
function stepSparks(pool, dt, gravity) {
	for (let i = 0; i < pool.length; i += 1) {
		const s = pool[i];
		if (s.life <= 0) continue;
		s.life -= dt;
		s.vy += gravity * dt;
		s.x += s.vx * dt;
		s.y += s.vy * dt;
	}
}
function drawSparks(ctx, pool) {
	for (let i = 0; i < pool.length; i += 1) {
		const s = pool[i];
		if (s.life <= 0) continue;
		ctx.globalAlpha = Math.max(0, Math.min(1, s.life / s.max));
		ctx.fillStyle = s.color;
		const half = s.size / 2;
		ctx.fillRect(Math.round(s.x - half), Math.round(s.y - half), s.size, s.size);
	}
	ctx.globalAlpha = 1;
}
function drawDigits(ctx, value, x, y, px, color, align = "left", weight = 400) {
	ctx.font = retroFont(px, weight);
	ctx.textAlign = align;
	ctx.textBaseline = "top";
	ctx.fillStyle = color;
	ctx.fillText(typeof value === "number" ? String(Math.floor(value)) : value, x, y);
}
function hexRgb(hex) {
	const n = parseInt(hex.slice(1), 16);
	return [
		n >> 16 & 255,
		n >> 8 & 255,
		n & 255
	];
}
function mixRgb(a, b, t) {
	const k = Math.max(0, Math.min(1, t));
	return `rgb(${Math.round(a[0] + (b[0] - a[0]) * k)},${Math.round(a[1] + (b[1] - a[1]) * k)},${Math.round(a[2] + (b[2] - a[2]) * k)})`;
}
export { mixRgb as a, hexRgb as i, drawSparks as n, sparkPool as o, emitSpark as r, stepSparks as s, drawDigits as t };
