function clamp(value, lo, hi) {
	return value < lo ? lo : value > hi ? hi : value;
}
function sparkPool(capacity) {
	const list = [];
	for (let i = 0; i < capacity; i += 1) list.push({
		x: 0,
		y: 0,
		vx: 0,
		vy: 0,
		life: 0,
		max: 1,
		size: 1,
		color: "#fff"
	});
	return {
		list,
		next: 0
	};
}
function emitSparks(pool, x, y, count, speed, color, random, life = .5, size = 2) {
	for (let i = 0; i < count; i += 1) {
		const p = pool.list[pool.next];
		pool.next = (pool.next + 1) % pool.list.length;
		const a = random() * Math.PI * 2;
		const v = speed * (.3 + random() * .7);
		p.x = x;
		p.y = y;
		p.vx = Math.cos(a) * v;
		p.vy = Math.sin(a) * v;
		p.max = life * (.6 + random() * .4);
		p.life = p.max;
		p.size = size;
		p.color = color;
	}
}
function stepSparks(pool, dt, gravity = 0, drag = .15) {
	const keep = Math.pow(drag, dt);
	for (const p of pool.list) {
		if (p.life <= 0) continue;
		p.life -= dt;
		p.vx *= keep;
		p.vy = p.vy * keep + gravity * dt;
		p.x += p.vx * dt;
		p.y += p.vy * dt;
	}
}
function drawSparks(ctx, pool) {
	for (const p of pool.list) {
		if (p.life <= 0) continue;
		ctx.globalAlpha = clamp(p.life / p.max, 0, 1);
		ctx.fillStyle = p.color;
		const s = p.size;
		ctx.fillRect(Math.round(p.x - s / 2), Math.round(p.y - s / 2), s, s);
	}
	ctx.globalAlpha = 1;
}
function drawScanlines(ctx, width, height, alpha = .12) {
	ctx.globalAlpha = alpha;
	ctx.fillStyle = "#000";
	for (let y = 1; y < height; y += 3) ctx.fillRect(0, y, width, 1);
	ctx.globalAlpha = 1;
}
export { sparkPool as a, emitSparks as i, drawScanlines as n, stepSparks as o, drawSparks as r, clamp as t };
