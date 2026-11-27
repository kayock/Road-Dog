function sprite(rows) {
	const runs = [];
	let w = 0;
	rows.forEach((row, y) => {
		w = Math.max(w, row.length);
		let start = -1;
		for (let x = 0; x <= row.length; x += 1) {
			const lit = x < row.length && row[x] === "#";
			if (lit && start < 0) start = x;
			if (!lit && start >= 0) {
				runs.push(start, y, x - start);
				start = -1;
			}
		}
	});
	return {
		w,
		h: rows.length,
		runs: Int16Array.from(runs)
	};
}
function drawSprite(ctx, s, x, y, scale = 1, flip = false) {
	const r = s.runs;
	const ox = Math.round(x), oy = Math.round(y);
	for (let i = 0; i < r.length; i += 3) {
		const rx = flip ? s.w - r[i] - r[i + 2] : r[i];
		ctx.fillRect(ox + rx * scale, oy + r[i + 1] * scale, r[i + 2] * scale, scale);
	}
}
var DIGITS = [
	[
		"###",
		"#.#",
		"#.#",
		"#.#",
		"###"
	],
	[
		".#.",
		"##.",
		".#.",
		".#.",
		"###"
	],
	[
		"###",
		"..#",
		"###",
		"#..",
		"###"
	],
	[
		"###",
		"..#",
		".##",
		"..#",
		"###"
	],
	[
		"#.#",
		"#.#",
		"###",
		"..#",
		"..#"
	],
	[
		"###",
		"#..",
		"###",
		"..#",
		"###"
	],
	[
		"###",
		"#..",
		"###",
		"#.#",
		"###"
	],
	[
		"###",
		"..#",
		".#.",
		".#.",
		".#."
	],
	[
		"###",
		"#.#",
		"###",
		"#.#",
		"###"
	],
	[
		"###",
		"#.#",
		"###",
		"..#",
		"###"
	]
].map(sprite);
function numberWidth(value, scale = 1) {
	let n = Math.max(0, Math.floor(value));
	let count = 1;
	while (n >= 10) {
		n = Math.floor(n / 10);
		count += 1;
	}
	return (count * 4 - 1) * scale;
}
function drawNumber(ctx, value, x, y, scale = 1, align = "left") {
	const n = Math.max(0, Math.floor(value));
	const width = numberWidth(n, scale);
	let right = align === "left" ? x + width : align === "center" ? x + width / 2 : x;
	let rest = n;
	do {
		const d = rest % 10;
		rest = Math.floor(rest / 10);
		right -= 3 * scale;
		drawSprite(ctx, DIGITS[d], right, y, scale);
		right -= scale;
	} while (rest > 0);
}
function clamp(v, lo, hi) {
	return v < lo ? lo : v > hi ? hi : v;
}
function makeParticles(count) {
	const pool = [];
	for (let i = 0; i < count; i += 1) pool.push({
		active: false,
		x: 0,
		y: 0,
		vx: 0,
		vy: 0,
		life: 0,
		max: 1,
		size: 1,
		color: "#fff"
	});
	return pool;
}
function emitBurst(pool, x, y, count, speed, color, random, life = .6, size = 1) {
	let cursor = 0;
	for (let n = 0; n < count; n += 1) {
		let slot = -1;
		for (; cursor < pool.length; cursor += 1) if (!pool[cursor].active) {
			slot = cursor;
			break;
		}
		if (slot < 0) {
			let least = Infinity;
			for (let i = 0; i < pool.length; i += 1) if (pool[i].life < least) {
				least = pool[i].life;
				slot = i;
			}
		}
		if (slot < 0) return;
		const p = pool[slot];
		const a = random() * Math.PI * 2;
		const v = speed * (.3 + random() * .7);
		p.active = true;
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
function stepParticles(pool, dt, gravity = 0) {
	for (const p of pool) {
		if (!p.active) continue;
		p.life -= dt;
		if (p.life <= 0) {
			p.active = false;
			continue;
		}
		p.vy += gravity * dt;
		p.x += p.vx * dt;
		p.y += p.vy * dt;
	}
}
function drawParticles(ctx, pool) {
	for (const p of pool) {
		if (!p.active) continue;
		ctx.globalAlpha = clamp(p.life / p.max, 0, 1);
		ctx.fillStyle = p.color;
		ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
	}
	ctx.globalAlpha = 1;
}
function starField(count, width, height, seed) {
	const stars = new Float32Array(count * 3);
	let a = seed >>> 0;
	const next = () => {
		a = Math.imul(a, 1664525) + 1013904223 >>> 0;
		return a / 4294967296;
	};
	for (let i = 0; i < count; i += 1) {
		stars[i * 3] = Math.floor(next() * width);
		stars[i * 3 + 1] = Math.floor(next() * height);
		stars[i * 3 + 2] = next();
	}
	return stars;
}
function drawStars(ctx, stars, time, reduced, color = "#cfd8ff") {
	ctx.fillStyle = color;
	for (let i = 0; i < stars.length; i += 3) {
		const phase = stars[i + 2];
		ctx.globalAlpha = reduced ? .35 + phase * .4 : .3 + .45 * (.5 + .5 * Math.sin(time * (.8 + phase * 1.6) + phase * 40));
		ctx.fillRect(stars[i], stars[i + 1], 1, 1);
	}
	ctx.globalAlpha = 1;
}
export { drawStars as a, sprite as c, drawSprite as i, starField as l, drawNumber as n, emitBurst as o, drawParticles as r, makeParticles as s, clamp as t, stepParticles as u };
