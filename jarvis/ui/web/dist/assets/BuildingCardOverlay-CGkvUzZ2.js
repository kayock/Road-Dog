import { t as CliLogo } from "./CliLogo-BNSkt8v8.js";
import { t as BrandTile } from "./PluginsView-DTQo9Xqt.js";
import "./PluginsCommunity-DZgzaAG9.js";
import { t as Server } from "./server-UsFxH5G7.js";
import { Bc as require_jsx_runtime, Cn as Portal, Ec as create, Ln as cn, Oc as useQuery, Sn as Overlay, Tn as Title, U as useWebglSurface, Vi as ExternalLink, Xc as require_react, Y as ScrollArea, Zt as useReducedMotion, bi as Plus, bn as Content, ln as Button, mi as Sparkles, nc as useLocaleChunk, oc as useT, si as X, tl as __toESM, wc as useEventStore, wn as Root, xn as Description, yn as Close } from "./index-BOzhgzD7.js";
import "./lib-BoWxqGgd.js";
import { t as AgentMark } from "./AgentMark-Bw7Rhl-a.js";
import "./combobox-BL3mwl7r.js";
import "./select-vogX_D37.js";
import { t as Badge } from "./badge-yXLOnH3Y.js";
import { An as Mesh, Da as Vector3, Gn as NearestFilter, Lr as RGBAFormat, N as Color, Q as DataTexture, Rn as MeshStandardMaterial, b as Box3, jn as MeshBasicMaterial, zn as MeshToonMaterial } from "./three.module-CsntsSp5.js";
import { a as useFrame, s as useThree, t as Canvas } from "./react-three-fiber.esm-Dp0xg4g-.js";
import { t as useGLTF } from "./Gltf-CGnHGMSX.js";
import { n as useCanvasAwake } from "./useCanvasAwake-5sZXDaXU.js";
import { t as LobbyStage } from "./LobbyStage-Cyt-y0V8.js";
import { g as StatusDot } from "./primitives-C1uNwbNH.js";
import "./branding-DNImmT_K.js";
import { t as BUILDING_CARDS } from "./buildingCards-DIPBlUob.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function clone(source) {
	const sourceLookup = /* @__PURE__ */ new Map();
	const cloneLookup = /* @__PURE__ */ new Map();
	const clone$1 = source.clone();
	parallelTraverse(source, clone$1, function(sourceNode, clonedNode) {
		sourceLookup.set(clonedNode, sourceNode);
		cloneLookup.set(sourceNode, clonedNode);
	});
	clone$1.traverse(function(node) {
		if (!node.isSkinnedMesh) return;
		const clonedMesh = node;
		const sourceMesh = sourceLookup.get(node);
		const sourceBones = sourceMesh.skeleton.bones;
		clonedMesh.skeleton = sourceMesh.skeleton.clone();
		clonedMesh.bindMatrix.copy(sourceMesh.bindMatrix);
		clonedMesh.skeleton.bones = sourceBones.map(function(bone) {
			return cloneLookup.get(bone);
		});
		clonedMesh.bind(clonedMesh.skeleton, clonedMesh.bindMatrix);
	});
	return clone$1;
}
function parallelTraverse(a, b, callback) {
	callback(a, b);
	for (let i = 0; i < a.children.length; i++) parallelTraverse(a.children[i], b.children[i], callback);
}
var memory_house_default = "/assets/memory-house-CFcvkF-v.glb";
var agent_foundry_default = "/assets/agent-foundry-Ewf0oxOc.glb";
var control_room_default = "/assets/control-room-CFNdzn_u.glb";
var gallery_hall_default = "/assets/gallery-hall-B0IzLQgD.glb";
var model_boilerhouse_default = "/assets/model-boilerhouse-SwMa2QCs.glb";
var observatory_default = "/assets/observatory-B73kmjYI.glb";
var plugin_docks_default = "/assets/plugin-docks-BdEzeo8S.glb";
var relay_tower_default = "/assets/relay-tower-DXlmBtb_.glb";
var signal_office_default = "/assets/signal-office-B5C50J5Z.glb";
var skill_forge_default = "/assets/skill-forge-DxrNVkEf.glb";
var terminal_cantina_default = "/assets/terminal-cantina-BHiPUt-J.glb";
var town_hall_default = "/assets/town-hall-hTQMMbhZ.glb";
const ISLAND_SEED = 20260901;
const TileKind = {
	water: 0,
	sand: 1,
	grass: 2,
	meadow: 3,
	rock: 4,
	plaza: 5,
	path: 6,
	garden: 7,
	dock: 8,
	forest: 9,
	alpine: 10,
	snow: 11,
	heath: 12,
	dry: 13,
	farm: 14,
	marsh: 15,
	scree: 16,
	quarry: 17,
	pool: 18
};
const LEVEL_Y = [
	0,
	.35,
	1,
	1.8,
	2.8,
	4,
	5.5,
	7.4,
	9.8,
	12.6
];
const MAX_LEVEL = LEVEL_Y.length - 1;
const DOCK_Y = .55;
function hash2(x, z, seed) {
	let h = Math.imul(x, 374761393) + Math.imul(z, 668265263) + Math.imul(seed, 1442695041) | 0;
	h = Math.imul(h ^ h >>> 13, 1274126177);
	h ^= h >>> 16;
	return (h >>> 0) / 4294967296;
}
function lerp(a, b, t) {
	return a + (b - a) * t;
}
function clamp(v, lo, hi) {
	return v < lo ? lo : v > hi ? hi : v;
}
function smoothstep(e0, e1, x) {
	const t = clamp((x - e0) / (e1 - e0), 0, 1);
	return t * t * (3 - 2 * t);
}
function valueNoise(x, z, seed) {
	const x0 = Math.floor(x);
	const z0 = Math.floor(z);
	const fx = x - x0;
	const fz = z - z0;
	const sx = fx * fx * (3 - 2 * fx);
	const sz = fz * fz * (3 - 2 * fz);
	const a = hash2(x0, z0, seed);
	const b = hash2(x0 + 1, z0, seed);
	const c = hash2(x0, z0 + 1, seed);
	const d = hash2(x0 + 1, z0 + 1, seed);
	return lerp(lerp(a, b, sx), lerp(c, d, sx), sz);
}
function fbm(x, z, seed, octaves = 3) {
	let amp = .5;
	let freq = 1;
	let sum = 0;
	let norm = 0;
	for (let i = 0; i < octaves; i++) {
		sum += amp * valueNoise(x * freq, z * freq, seed + i * 101);
		norm += amp;
		amp *= .5;
		freq *= 2.1;
	}
	return sum / norm;
}
function tileToWorld(tx, tz) {
	return [(tx + .5 - 128) * 2, (tz + .5 - 128) * 2];
}
function worldToTile(x, z) {
	return [Math.floor(x / 2 + 128), Math.floor(z / 2 + 128)];
}
function inBounds(map, tx, tz) {
	return tx >= 0 && tz >= 0 && tx < map.size && tz < map.size;
}
function tileIndex(map, tx, tz) {
	return tz * map.size + tx;
}
function groundY(map, x, z) {
	const [tx, tz] = worldToTile(x, z);
	if (!inBounds(map, tx, tz)) return LEVEL_Y[0];
	const i = tileIndex(map, tx, tz);
	if (map.kind[i] === TileKind.dock) return DOCK_Y;
	return LEVEL_Y[map.level[i]];
}
const TOWN = {
	frame: {
		from: 12,
		to: 14
	},
	inner: {
		from: 15,
		to: 23
	},
	middle: {
		from: 24,
		to: 26
	},
	outer: {
		from: 27,
		to: 30
	},
	boulevard: {
		from: 31,
		to: 34
	},
	avenueHalf: 1,
	alley: {
		from: 13,
		to: 14
	}
};
const TOWN_EDGE_TILES = TOWN.boulevard.to;
function squareDist(kx, kz) {
	return Math.sqrt(Math.sqrt(kx * kx * kx * kx + kz * kz * kz * kz));
}
function townZone(kx, kz) {
	const ax = Math.abs(kx);
	const az = Math.abs(kz);
	const cheb = Math.max(ax, az);
	const d = squareDist(kx, kz);
	if (d >= 37) return "outside";
	if (d >= TOWN_EDGE_TILES) return "fringe";
	if (cheb <= 11) return "square";
	if (d >= TOWN.boulevard.from) return "boulevard";
	if (cheb >= TOWN.frame.from && cheb <= TOWN.frame.to) return "street";
	if (cheb >= TOWN.middle.from && cheb <= TOWN.middle.to) return "street";
	if (ax <= TOWN.avenueHalf || az <= TOWN.avenueHalf) return "street";
	if (ax >= TOWN.alley.from && ax <= TOWN.alley.to || az >= TOWN.alley.from && az <= TOWN.alley.to) return "alley";
	return "block";
}
function isPavedZone(zone) {
	return zone === "square" || zone === "street" || zone === "alley" || zone === "boulevard";
}
const BLOCK_TEMPLATES = [
	{
		x0: 2,
		x1: 12,
		z0: 15,
		z1: 23
	},
	{
		x0: 15,
		x1: 23,
		z0: 15,
		z1: 23
	},
	{
		x0: 15,
		x1: 23,
		z0: 2,
		z1: 12
	},
	{
		x0: 2,
		x1: 12,
		z0: 27,
		z1: 30
	},
	{
		x0: 27,
		x1: 30,
		z0: 2,
		z1: 12
	}
];
var QUADRANTS = [
	[1, -1],
	[-1, -1],
	[-1, 1],
	[1, 1]
];
function quadrantRect(t, sx, sz) {
	return {
		x0: Math.min(sx * t.x0, sx * t.x1),
		x1: Math.max(sx * t.x0, sx * t.x1),
		z0: Math.min(sz * t.z0, sz * t.z1),
		z1: Math.max(sz * t.z0, sz * t.z1)
	};
}
const FRONT_ROTATION = {
	south: 0,
	east: Math.PI / 2,
	north: Math.PI,
	west: -Math.PI / 2
};
function squareFront(edge, sx, sz) {
	if (edge === "x") return sx > 0 ? "west" : "east";
	return sz > 0 ? "north" : "south";
}
function cornerRotation(sx, sz) {
	return Math.atan2(-sx, -sz);
}
function isCornerTemplate(t) {
	return t.x0 >= TOWN.frame.from && t.z0 >= TOWN.frame.from;
}
const KIT_BLOCKS = {
	plugins: {
		template: 0,
		sx: -1,
		sz: -1,
		edge: "z"
	},
	skills: {
		template: 0,
		sx: 1,
		sz: -1,
		edge: "z"
	},
	mcp: {
		template: 1,
		sx: 1,
		sz: -1,
		edge: "z"
	},
	cli: {
		template: 2,
		sx: -1,
		sz: -1,
		edge: "x"
	},
	comms: {
		template: 0,
		sx: 1,
		sz: 1,
		edge: "z"
	},
	desktop: {
		template: 0,
		sx: -1,
		sz: 1,
		edge: "z"
	},
	gallery: {
		template: 2,
		sx: 1,
		sz: 1,
		edge: "x"
	},
	civic: {
		template: 2,
		sx: -1,
		sz: 1,
		edge: "x"
	},
	models: {
		template: 1,
		sx: -1,
		sz: -1,
		edge: "z"
	},
	web: {
		template: 1,
		sx: 1,
		sz: 1,
		edge: "z"
	}
};
function townBlocks() {
	const out = [];
	const halls = Object.entries(KIT_BLOCKS);
	BLOCK_TEMPLATES.forEach((t, template) => {
		const corner = isCornerTemplate(t);
		for (const [sx, sz] of QUADRANTS) {
			const hall = halls.find(([, lot]) => lot.template === template && lot.sx === sx && lot.sz === sz);
			out.push({
				rect: quadrantRect(t, sx, sz),
				kit: hall ? hall[0] : null,
				sx,
				sz,
				corner
			});
		}
	});
	return out;
}
function blockEdges(b) {
	return {
		nearX: b.sx > 0 ? b.rect.x0 : b.rect.x1,
		farX: b.sx > 0 ? b.rect.x1 : b.rect.x0,
		nearZ: b.sz > 0 ? b.rect.z0 : b.rect.z1,
		farZ: b.sz > 0 ? b.rect.z1 : b.rect.z0
	};
}
function rectMetres(r) {
	return {
		x0: r.x0 * 2,
		x1: (r.x1 + 1) * 2,
		z0: r.z0 * 2,
		z1: (r.z1 + 1) * 2
	};
}
var HALL_SETBACK_M = 1;
var CORNER_SETBACK_M = 3;
function cornerReach(w, d) {
	return (w + d) / (2 * Math.SQRT2);
}
function cornerAdvance(m, w, d) {
	const room = Math.min(m.x1 - m.x0, m.z1 - m.z0) / 2;
	return Math.max(0, Math.min(CORNER_SETBACK_M, (room - cornerReach(w, d)) * Math.SQRT2));
}
function hallPose(b, lot, w, d) {
	const m = rectMetres(b.rect);
	const cx = (m.x0 + m.x1) / 2;
	const cz = (m.z0 + m.z1) / 2;
	if (b.corner) {
		const rotation$1 = cornerRotation(b.sx, b.sz);
		const s = cornerAdvance(m, w, d);
		return {
			x: cx + Math.sin(rotation$1) * s,
			z: cz + Math.cos(rotation$1) * s,
			rotation: rotation$1
		};
	}
	const rotation = FRONT_ROTATION[squareFront(lot.edge, b.sx, b.sz)];
	const inset = HALL_SETBACK_M + d / 2;
	if (lot.edge === "z") return {
		x: cx,
		z: b.sz > 0 ? m.z0 + inset : m.z1 - inset,
		rotation
	};
	return {
		x: b.sx > 0 ? m.x0 + inset : m.x1 - inset,
		z: cz,
		rotation
	};
}
const KIT_FOOTPRINT_TILES = {
	plugins: {
		w: 8,
		d: 5
	},
	foundry: {
		w: 10,
		d: 7
	},
	skills: {
		w: 7,
		d: 5
	},
	mcp: {
		w: 5,
		d: 5
	},
	cli: {
		w: 7,
		d: 5
	},
	comms: {
		w: 7,
		d: 5
	},
	desktop: {
		w: 7,
		d: 5
	},
	gallery: {
		w: 7,
		d: 5
	},
	civic: {
		w: 7,
		d: 5
	},
	models: {
		w: 5,
		d: 5
	},
	web: {
		w: 5,
		d: 5
	}
};
const KIT_FACING = { foundry: Math.PI / 4 };
const SUMMIT_TILE = [63, 58];
function normalizeAngle(a) {
	let d = a % (2 * Math.PI);
	if (d > Math.PI) d -= 2 * Math.PI;
	if (d <= -Math.PI) d += 2 * Math.PI;
	return d;
}
function houseDefaultRotation(x, z) {
	return normalizeAngle(Math.atan2(-x, -z));
}
function kitPose(place) {
	if (place === "foundry") {
		const [x, z] = tileToWorld(SUMMIT_TILE[0], SUMMIT_TILE[1]);
		return {
			x,
			z,
			rotation: KIT_FACING.foundry ?? houseDefaultRotation(x, z)
		};
	}
	const lot = KIT_BLOCKS[place];
	const template = BLOCK_TEMPLATES[lot.template];
	const block = {
		rect: quadrantRect(template, lot.sx, lot.sz),
		kit: place,
		sx: lot.sx,
		sz: lot.sz,
		corner: isCornerTemplate(template)
	};
	const f = KIT_FOOTPRINT_TILES[place];
	return hallPose(block, lot, f.w * 2, f.d * 2);
}
const SPOKES = [
	{
		dir: [0, 1],
		toTiles: 62
	},
	{
		dir: [-1, 0],
		toTiles: 60
	},
	{
		dir: [1, 0],
		toTiles: 80
	}
];
const NORTH_ROAD = [
	{
		from: [142, 97],
		dir: [0, -1],
		length: 23
	},
	{
		from: [142, 74],
		dir: [-1, 0],
		length: 14
	},
	{
		from: [128, 74],
		dir: [0, -1],
		length: 8
	}
];
var PLACE_TILES = {
	market: [128, 128],
	hub: [128, 86],
	archive: [128, 62],
	harbor: [128, 192],
	workshop: [60, 128],
	lighthouse: [212, 128],
	gardens: [172, 176],
	solar: [88, 88],
	mine: [96, 68],
	plugins: kitTile("plugins"),
	foundry: [SUMMIT_TILE[0], SUMMIT_TILE[1]],
	skills: kitTile("skills"),
	mcp: kitTile("mcp"),
	cli: kitTile("cli"),
	comms: kitTile("comms"),
	desktop: kitTile("desktop"),
	web: kitTile("web"),
	models: kitTile("models"),
	civic: kitTile("civic"),
	gallery: kitTile("gallery")
};
const FOUNDRY_RAMP_MID_M = 9.5;
function kitTile(place) {
	const p = kitPose(place);
	return worldToTile(p.x, p.z);
}
var PLOT_HALF = {
	market: [0, 0],
	hub: [9, 4],
	archive: [7, 7],
	harbor: [8, 4],
	workshop: [9, 6],
	lighthouse: [4, 4],
	gardens: [9, 7],
	solar: [8, 7],
	mine: [5, 4],
	plugins: [0, 0],
	foundry: [10, 8],
	skills: [0, 0],
	mcp: [0, 0],
	cli: [0, 0],
	comms: [0, 0],
	desktop: [0, 0],
	web: [0, 0],
	models: [0, 0],
	civic: [0, 0],
	gallery: [0, 0]
};
var PLOT_LEVEL = {
	market: 3,
	hub: 4,
	archive: 5,
	harbor: 2,
	workshop: 3,
	lighthouse: 6,
	gardens: 2,
	solar: 4,
	mine: 4,
	plugins: 3,
	foundry: 9,
	skills: 3,
	mcp: 3,
	cli: 3,
	comms: 3,
	desktop: 3,
	web: 3,
	models: 3,
	civic: 3,
	gallery: 3
};
var BUILDING_HALF = {
	hub: [6, 3],
	archive: [4, 3],
	workshop: [6, 3],
	lighthouse: [1, 1]
};
var MINE_CLIFF = {
	dz: -8,
	hw: 8,
	hd: 3,
	level: 7
};
var MINE_ROAD = {
	fromX: 127,
	z: 68,
	length: 27
};
var SUMMIT_ROAD = [
	{
		from: [91, 68],
		dir: [-1, 0],
		length: 17
	},
	{
		from: [74, 68],
		dir: [0, -1],
		length: 5
	},
	{
		from: [74, 63],
		dir: [-1, 0],
		length: 6
	}
];
const DOCK_TILES = {
	from: 194,
	to: 208,
	halfWidth: 1
};
const REGIONS = {
	mountain: {
		x: -.5,
		z: -.5,
		r: .42
	},
	archiveHill: {
		x: 0,
		z: -.52,
		r: .2
	},
	highland: {
		x: .45,
		z: -.45,
		r: .38
	},
	cape: {
		x: .72,
		z: 0,
		r: .25
	},
	cove: {
		x: .5,
		z: .5,
		r: .34
	},
	lagoon: {
		x: .5,
		z: .54,
		r: .075
	},
	bay: {
		x: .05,
		z: .72,
		r: .2
	},
	orchard: {
		x: -.45,
		z: .5,
		r: .3
	},
	forest: {
		x: -.6,
		z: .02,
		r: .34
	},
	savanna: {
		x: .64,
		z: .2,
		r: .3
	},
	marsh: {
		x: -.62,
		z: .46,
		r: .2
	}
};
const ISLETS = [
	{
		x: .93,
		z: -.22,
		r: .032,
		level: 4
	},
	{
		x: .9,
		z: .24,
		r: .026,
		level: 3
	},
	{
		x: -.58,
		z: .8,
		r: .04,
		level: 5
	},
	{
		x: -.86,
		z: -.6,
		r: .03,
		level: 6
	}
];
function fillRect(map, cx, cz, hw, hd, fn) {
	for (let tz = cz - hd; tz <= cz + hd; tz++) for (let tx = cx - hw; tx <= cx + hw; tx++) if (inBounds(map, tx, tz)) fn(tileIndex(map, tx, tz), tx, tz);
}
function paintDisc(map, cx, cz, rMin, rMax, fn) {
	const r = Math.ceil(rMax);
	for (let tz = Math.floor(cz - r); tz <= Math.ceil(cz + r); tz++) for (let tx = Math.floor(cx - r); tx <= Math.ceil(cx + r); tx++) {
		if (!inBounds(map, tx, tz)) continue;
		const dist = Math.hypot(tx + .5 - cx, tz + .5 - cz);
		if (dist >= rMin && dist < rMax) fn(tileIndex(map, tx, tz), tx, tz);
	}
}
function paintLand(map, i, kind, level) {
	map.level[i] = level;
	map.kind[i] = kind;
	map.blocked[i] = kind === TileKind.rock || kind === TileKind.snow ? 1 : 0;
}
function paintWater(map, i) {
	map.kind[i] = TileKind.water;
	map.level[i] = 0;
	map.blocked[i] = 1;
}
function regionT(nx, nz, region) {
	return Math.hypot(nx - region.x, nz - region.z) / region.r;
}
function bump(nx, nz, region, power = 1.3) {
	const t = regionT(nx, nz, region);
	return t >= 1 ? 0 : Math.pow(1 - t, power);
}
function heightAt(nx, nz) {
	const d = Math.hypot(nx, nz * 1.04);
	let h = 1.2 + 2.4 * (1 - Math.pow(d, 1.8));
	h += 7.2 * bump(nx, nz, REGIONS.mountain, 1.4);
	h += 2.7 * bump(nx, nz, REGIONS.archiveHill, 1.1);
	h += 2 * bump(nx, nz, REGIONS.highland, 1);
	h += 4.4 * bump(nx, nz, REGIONS.cape, 1.2);
	h -= 1.7 * bump(nx, nz, REGIONS.cove, 1);
	h -= 1.3 * bump(nx, nz, REGIONS.bay, .8);
	h -= .7 * bump(nx, nz, REGIONS.orchard, 1);
	h += 1 * bump(nx, nz, REGIONS.forest, 1);
	h += (fbm(nx * 3.3 + 11, nz * 3.3 + 5, ISLAND_SEED + 7) - .5) * 1.5;
	const w = 1 - smoothstep(1, 1.55, squareDist(nx * 128, nz * 128) / 37);
	return lerp(h, 3, w);
}
function isLandAt(nx, nz) {
	let shape = Math.hypot(nx, nz * 1.04) + (fbm(nx * 1.8 + 3.1, nz * 1.8 + 7.7, ISLAND_SEED) - .5) * .34;
	shape -= .14 * bump(nx, nz, {
		x: .9,
		z: 0,
		r: .3
	}, 1);
	shape -= .06 * bump(nx, nz, REGIONS.mountain, 1);
	if (shape >= .86) return false;
	if (regionT(nx, nz, REGIONS.bay) < 1) return false;
	if (regionT(nx, nz, REGIONS.lagoon) < 1) return false;
	const cx = nx - REGIONS.lagoon.x;
	const cz = nz - REGIONS.lagoon.z;
	const along = (cx + cz) * Math.SQRT1_2;
	const across = Math.abs(cx - cz) * Math.SQRT1_2;
	if (along > 0 && along < .4 && across < .022) return false;
	return true;
}
function biomeKind(nx, nz, level) {
	if (level >= 8) return TileKind.snow;
	if (level >= 7) return TileKind.rock;
	const inMountain = regionT(nx, nz, REGIONS.mountain) < 1;
	const inCape = regionT(nx, nz, REGIONS.cape) < 1;
	const inHighland = regionT(nx, nz, REGIONS.highland) < 1;
	const inCove = regionT(nx, nz, REGIONS.cove) < .8;
	const inForest = regionT(nx, nz, REGIONS.forest) < .92;
	const inSavanna = regionT(nx, nz, REGIONS.savanna) < 1;
	const inMarsh = regionT(nx, nz, REGIONS.marsh) < 1;
	const inOrchard = regionT(nx, nz, REGIONS.orchard) < .85;
	const grain = fbm(nx * 6 + 31, nz * 6 + 17, ISLAND_SEED + 3);
	const patchwork = fbm(nx * 4.2 + 5, nz * 4.2 + 9, ISLAND_SEED + 31);
	if (level === 6) {
		if (inMountain || inCape) return grain > .42 ? TileKind.rock : TileKind.scree;
		return patchwork > .5 ? TileKind.heath : TileKind.alpine;
	}
	if (level === 5) {
		if (inMountain || inCape) return grain > .55 ? TileKind.rock : grain > .3 ? TileKind.scree : TileKind.alpine;
		if (inHighland) return patchwork > .52 ? TileKind.heath : TileKind.alpine;
		return TileKind.meadow;
	}
	if (level === 1) return inMarsh ? TileKind.marsh : TileKind.sand;
	if (level === 2) {
		if (inCove) return TileKind.sand;
		if (inMarsh) return TileKind.marsh;
		if (inSavanna) return TileKind.dry;
		if (inOrchard) return patchwork > .45 ? TileKind.farm : TileKind.meadow;
		return grain > .6 ? TileKind.meadow : TileKind.grass;
	}
	if (inForest && grain > .3) return TileKind.forest;
	if (inSavanna && level === 3) return grain > .7 ? TileKind.meadow : TileKind.dry;
	if (inOrchard && level === 3) return patchwork > .42 ? TileKind.farm : TileKind.meadow;
	if (inMountain && level === 4 && grain > .6) return TileKind.scree;
	if (level === 4) {
		if (inHighland) return patchwork > .55 ? TileKind.heath : grain > .5 ? TileKind.alpine : TileKind.meadow;
		return grain > .45 ? TileKind.meadow : TileKind.grass;
	}
	return grain > .58 ? TileKind.meadow : TileKind.grass;
}
function buildTerrain(map) {
	const C = 128;
	for (let tz = 0; tz < map.size; tz++) for (let tx = 0; tx < map.size; tx++) {
		const i = tileIndex(map, tx, tz);
		const nx = (tx + .5 - C) / C;
		const nz = (tz + .5 - C) / C;
		if (!isLandAt(nx, nz)) {
			paintWater(map, i);
			continue;
		}
		const level = clamp(Math.round(heightAt(nx, nz)), 1, MAX_LEVEL);
		let kind = biomeKind(nx, nz, level);
		if ((kind === TileKind.meadow || kind === TileKind.alpine) && fbm(nx * 9 + 3, nz * 9 + 41, 20260914) > .64 && hash2(tx, tz, 77) < .55) kind = TileKind.garden;
		paintLand(map, i, kind, level);
	}
	for (let tz = 0; tz < map.size; tz++) for (let tx = 0; tx < map.size; tx++) {
		const i = tileIndex(map, tx, tz);
		if (map.kind[i] !== TileKind.marsh) continue;
		const nx = (tx + .5 - C) / C;
		const nz = (tz + .5 - C) / C;
		if (fbm(nx * 16 + 2, nz * 16 + 6, 20260922) > .64) {
			map.kind[i] = TileKind.pool;
			map.level[i] = 0;
			map.blocked[i] = 1;
		}
	}
	const [mx, mz] = PLACE_TILES.mine;
	paintDisc(map, mx, mz, 0, 11, (i) => {
		if (map.kind[i] === TileKind.water || map.kind[i] === TileKind.snow) return;
		if (map.level[i] >= 7) return;
		paintLand(map, i, map.level[i] >= 4 ? TileKind.scree : TileKind.quarry, map.level[i]);
	});
	fillRect(map, mx, mz + MINE_CLIFF.dz, MINE_CLIFF.hw, MINE_CLIFF.hd, (i) => {
		if (map.kind[i] === TileKind.water) return;
		paintLand(map, i, TileKind.rock, MINE_CLIFF.level);
	});
	const lag = REGIONS.lagoon;
	paintDisc(map, C + lag.x * C, C + lag.z * C, 0, lag.r * C + 4.5, (i) => {
		if (map.kind[i] !== TileKind.water) paintLand(map, i, TileKind.sand, 1);
	});
	const bay = REGIONS.bay;
	paintDisc(map, C + bay.x * C, C + bay.z * C, 0, bay.r * C + 3.5, (i) => {
		if (map.kind[i] !== TileKind.water && map.level[i] > 1) paintLand(map, i, TileKind.sand, 1);
	});
	for (const islet of ISLETS) {
		const cx = C + islet.x * C;
		const cz = C + islet.z * C;
		const r = islet.r * C;
		paintDisc(map, cx, cz, 0, r, (i, tx, tz) => {
			const wobble = (hash2(tx, tz, 21) - .5) * .8;
			const dist = Math.hypot(tx + .5 - cx, tz + .5 - cz) + wobble;
			if (dist > r) return;
			if (dist < r * .45) paintLand(map, i, TileKind.grass, islet.level);
			else paintLand(map, i, TileKind.rock, Math.max(1, islet.level - (dist > r * .75 ? 2 : 1)));
		});
	}
	for (let t = 0; t < 14; t++) fillRect(map, C + 18 + t, C + 96 - Math.round(t * .55), 0, 1, (i) => {
		if (map.kind[i] === TileKind.water) paintLand(map, i, TileKind.rock, 2);
	});
}
function buildPlots(map) {
	for (const id of Object.keys(PLACE_TILES)) {
		const [px, pz] = PLACE_TILES[id];
		const [hw, hd] = PLOT_HALF[id];
		if (hw === 0 && hd === 0) continue;
		const kind = id === "gardens" ? TileKind.garden : id === "solar" ? TileKind.meadow : id === "lighthouse" ? TileKind.rock : id === "mine" ? TileKind.quarry : id === "foundry" ? TileKind.scree : TileKind.plaza;
		fillRect(map, px, pz, hw, hd, (i) => {
			if (map.kind[i] === TileKind.water) return;
			paintLand(map, i, kind, PLOT_LEVEL[id]);
			if (id === "lighthouse") map.blocked[i] = 0;
		});
	}
}
function gradeRoad(map, start, dir, length, startLevel) {
	let prev = startLevel;
	for (let s = 0; s <= length; s++) {
		const cx = start[0] + dir[0] * s;
		const cz = start[1] + dir[1] * s;
		if (!inBounds(map, cx, cz)) break;
		const ci = tileIndex(map, cx, cz);
		const lvl = clamp(map.kind[ci] === TileKind.water ? prev : map.level[ci], prev - 1, prev + 1);
		for (let w = -2; w <= 2; w++) {
			const tx = cx + dir[1] * w;
			const tz = cz + dir[0] * w;
			if (!inBounds(map, tx, tz)) continue;
			const i = tileIndex(map, tx, tz);
			if (map.kind[i] === TileKind.water) continue;
			if (Math.abs(w) <= 1) paintLand(map, i, TileKind.path, lvl);
			else if (Math.abs(map.level[i] - lvl) > 1) map.level[i] = lvl + Math.sign(map.level[i] - lvl);
		}
		prev = lvl;
	}
}
function gradeLegs(map, legs, startLevel) {
	let climb = startLevel;
	for (const leg of legs) {
		gradeRoad(map, leg.from, leg.dir, leg.length, climb);
		const end = [leg.from[0] + leg.dir[0] * leg.length, leg.from[1] + leg.dir[1] * leg.length];
		if (inBounds(map, end[0], end[1])) climb = map.level[tileIndex(map, end[0], end[1])];
	}
}
function buildVillage(map) {
	const C = 128;
	const reach = 38;
	for (let kz = -reach; kz <= reach; kz++) for (let kx = -reach; kx <= reach; kx++) {
		const tx = C + kx;
		const tz = C + kz;
		if (!inBounds(map, tx, tz)) continue;
		const i = tileIndex(map, tx, tz);
		if (map.kind[i] === TileKind.water) continue;
		const zone = townZone(kx, kz);
		if (zone === "outside" || zone === "fringe") continue;
		const lvl = map.level[i] === 4 ? 4 : 3;
		if (zone === "square") {
			const cheb = Math.max(Math.abs(kx), Math.abs(kz));
			const along = Math.abs(kx) === 11 ? kz : kx;
			paintLand(map, i, cheb === 11 && Math.abs(along) < 10 && Math.floor((along + 11) / 3) % 2 === 1 ? TileKind.garden : TileKind.plaza, lvl);
		} else if (isPavedZone(zone)) paintLand(map, i, TileKind.path, lvl);
		else paintLand(map, i, fbm(kx * .23 + 7, kz * .23 + 3, 20260942) > .58 ? TileKind.garden : TileKind.grass, lvl);
	}
	const [hx, hz] = PLACE_TILES.hub;
	for (let tz = hz + PLOT_HALF.hub[1] + 1; tz <= hz + PLOT_HALF.hub[1] + 4; tz++) fillRect(map, hx, tz, PLOT_HALF.hub[0], 0, (i) => paintLand(map, i, TileKind.plaza, 3));
	for (const spoke of SPOKES) {
		const from = TOWN_EDGE_TILES - 1;
		gradeRoad(map, [C + spoke.dir[0] * from, C + spoke.dir[1] * from], spoke.dir, spoke.toTiles - from, 3);
	}
	gradeLegs(map, NORTH_ROAD, 3);
	const junction = map.level[tileIndex(map, MINE_ROAD.fromX + 1, MINE_ROAD.z)];
	gradeRoad(map, [MINE_ROAD.fromX, MINE_ROAD.z], [-1, 0], MINE_ROAD.length, junction);
	gradeLegs(map, SUMMIT_ROAD, map.level[tileIndex(map, SUMMIT_ROAD[0].from[0] + 1, SUMMIT_ROAD[0].from[1])]);
	for (const id of Object.keys(BUILDING_HALF)) {
		const bh = BUILDING_HALF[id];
		if (!bh) continue;
		const [px, pz] = PLACE_TILES[id];
		fillRect(map, px, pz, bh[0], bh[1], (i) => {
			map.blocked[i] = 1;
			map.level[i] = PLOT_LEVEL[id];
		});
	}
	const [mx, mz] = PLACE_TILES.mine;
	fillRect(map, mx, mz - 3, 3, 1, (i) => map.blocked[i] = 1);
	for (let tz = DOCK_TILES.from; tz <= DOCK_TILES.to; tz++) for (let tx = C - DOCK_TILES.halfWidth; tx <= C + DOCK_TILES.halfWidth; tx++) {
		if (!inBounds(map, tx, tz)) continue;
		const i = tileIndex(map, tx, tz);
		map.kind[i] = TileKind.dock;
		map.level[i] = 1;
		map.blocked[i] = 0;
	}
	const lag = REGIONS.lagoon;
	const jx = Math.round(C + lag.x * C);
	const jz0 = Math.round(C + lag.z * C - lag.r * C) - 2;
	for (let tz = jz0; tz <= jz0 + 6; tz++) {
		if (!inBounds(map, jx, tz)) continue;
		const i = tileIndex(map, jx, tz);
		if (map.kind[i] !== TileKind.water && map.kind[i] !== TileKind.sand) continue;
		map.kind[i] = TileKind.dock;
		map.level[i] = 1;
		map.blocked[i] = 0;
	}
}
const HOUSE_W_TILES = 3.4;
const HOUSE_D_TILES = 2.4;
var LOT_W = 4;
var LOT_D = 3;
function lotOnBlock(x0, z0, x1, z1) {
	for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) if (townZone(x, z) !== "block") return false;
	return true;
}
function turnedCorners(x, z, w, d, rotation) {
	const hw = w / 2 + WALL_MARGIN_M;
	const hd = d / 2 + WALL_MARGIN_M;
	const fx = Math.sin(rotation);
	const fz = Math.cos(rotation);
	const tx = fz;
	const tz = -fx;
	const out = [];
	for (const sw of [-1, 1]) for (const sd of [-1, 1]) out.push([x + tx * hw * sw + fx * hd * sd, z + tz * hw * sw + fz * hd * sd]);
	return out;
}
function turnedBox(x, z, w, d, rotation) {
	const c = turnedCorners(x, z, w, d, rotation);
	return {
		x0: Math.min(...c.map((p) => p[0])),
		x1: Math.max(...c.map((p) => p[0])),
		z0: Math.min(...c.map((p) => p[1])),
		z1: Math.max(...c.map((p) => p[1]))
	};
}
function turnedOnBlock(x, z, w, d, rotation) {
	for (const [cx, cz] of turnedCorners(x, z, w, d, rotation)) {
		const [tx, tz] = worldToTile(cx, cz);
		if (townZone(tx - 128, tz - 128) !== "block") return false;
	}
	return true;
}
function boxesOverlap(a, b) {
	return a.x0 < b.x1 && b.x0 < a.x1 && a.z0 < b.z1 && b.z0 < a.z1;
}
function blockHouses(b, out) {
	const variants = [
		"solar-barrel",
		"garden-roof",
		"glass-loft"
	];
	const w = HOUSE_W_TILES * 2;
	const d = HOUSE_D_TILES * 2;
	const taken = [];
	const push = (x, z, rotation) => {
		const slot = out.length;
		out.push({
			slot,
			x,
			z,
			w: HOUSE_W_TILES,
			d: HOUSE_D_TILES,
			rotation,
			defaultRotation: rotation,
			variant: variants[slot % variants.length],
			seed: hash2(slot, 7, ISLAND_SEED)
		});
		taken.push(turnedBox(x, z, w, d, rotation));
	};
	const pushLot = (xa, xb, za, zb, rotation) => {
		if (!lotOnBlock(Math.min(xa, xb), Math.min(za, zb), Math.max(xa, xb), Math.max(za, zb))) return false;
		const x = xa + xb + 1;
		const z = za + zb + 1;
		const box = turnedBox(x, z, w, d, rotation);
		if (taken.some((t) => boxesOverlap(t, box))) return false;
		push(x, z, rotation);
		return true;
	};
	if (b.corner) for (const [x, z, rotation] of cornerRow(b, w, d)) push(x, z, rotation);
	const { nearX, farX, nearZ, farZ } = blockEdges(b);
	const dx = b.sx > 0 ? 1 : -1;
	const dz = b.sz > 0 ? 1 : -1;
	const spanX = Math.abs(farX - nearX);
	const spanZ = Math.abs(farZ - nearZ);
	const zFront = FRONT_ROTATION[squareFront("z", b.sx, b.sz)];
	const xFront = FRONT_ROTATION[squareFront("x", b.sx, b.sz)];
	let zRow = 0;
	for (let off = 0; off + LOT_W - 1 <= spanX - 1; off += LOT_W) if (pushLot(nearX + dx * off, nearX + dx * (off + LOT_W - 1), nearZ, nearZ + dz * (LOT_D - 1), zFront)) zRow++;
	for (let off = zRow > 0 ? LOT_D : 0; off + LOT_W - 1 <= spanZ - 1; off += LOT_W) pushLot(nearX, nearX + dx * (LOT_D - 1), nearZ + dz * off, nearZ + dz * (off + LOT_W - 1), xFront);
}
function cornerRow(b, w, d) {
	const rotation = cornerRotation(b.sx, b.sz);
	const m = rectMetres(b.rect);
	const cx = (m.x0 + m.x1) / 2;
	const cz = (m.z0 + m.z1) / 2;
	const tx = Math.cos(rotation);
	const tz = -Math.sin(rotation);
	const step = LOT_W * 2;
	const reach = Math.ceil(Math.max(m.x1 - m.x0, m.z1 - m.z0) * Math.SQRT2 / step);
	let best = [];
	for (const phase of [0, .5]) {
		const row = [];
		for (let k = -reach; k <= reach; k++) {
			const off = (k + phase) * step;
			const x = cx + tx * off;
			const z = cz + tz * off;
			if (turnedOnBlock(x, z, w, d, rotation)) row.push([
				x,
				z,
				rotation
			]);
		}
		if (row.length > best.length) best = row;
	}
	return best;
}
var houseCache = null;
function townHouses() {
	if (!houseCache) {
		const out = [];
		for (const b of townBlocks()) if (!b.kit) blockHouses(b, out);
		houseCache = out;
	}
	return houseCache.map((h) => ({ ...h }));
}
const WALL_MARGIN_M = .5;
function stampFootprint(layer, map, x, z, w, d, rotation, margin, value) {
	const hw = w / 2 + margin;
	const hd = d / 2 + margin;
	const cos = Math.cos(rotation);
	const sin = Math.sin(rotation);
	for (let lx = -hw; lx <= hw + 1e-9; lx += .5) for (let lz = -hd; lz <= hd + 1e-9; lz += .5) {
		const [tx, tz] = worldToTile(x + lx * cos + lz * sin, z - lx * sin + lz * cos);
		if (inBounds(map, tx, tz)) layer[tileIndex(map, tx, tz)] = value;
	}
}
function blockRectM(map, x0, z0, x1, z1) {
	const [tx0, tz0] = worldToTile(Math.min(x0, x1), Math.min(z0, z1));
	const [tx1, tz1] = worldToTile(Math.max(x0, x1) - 1e-6, Math.max(z0, z1) - 1e-6);
	for (let tz = tz0; tz <= tz1; tz++) for (let tx = tx0; tx <= tx1; tx++) if (inBounds(map, tx, tz)) map.blocked[tileIndex(map, tx, tz)] = 1;
}
function blockPost(map, x, z) {
	const [tx, tz] = worldToTile(x, z);
	if (!inBounds(map, tx, tz)) return;
	const i = tileIndex(map, tx, tz);
	if (map.kind[i] === TileKind.dock) return;
	map.blocked[i] = 1;
}
function doorstepTiles() {
	const out = /* @__PURE__ */ new Set();
	for (const h of townHouses()) {
		const ahead = h.d / 2 * 2 + WALL_MARGIN_M;
		for (const reach of [ahead, ahead + 2]) {
			const [tx, tz] = worldToTile(h.x + Math.sin(h.rotation) * reach, h.z + Math.cos(h.rotation) * reach);
			out.add(`${tx},${tz}`);
		}
	}
	return out;
}
function placeStreetFurniture(map) {
	const hedges = [];
	const lamps = [];
	const doorsteps = doorstepTiles();
	const C = 128;
	const post = (kx, kz, rotation, into) => {
		const [x, z] = tileToWorld(C + kx, C + kz);
		into.push({
			x,
			z,
			y: groundY(map, x, z),
			rotation
		});
	};
	for (const b of townBlocks()) {
		const { farX, farZ } = blockEdges(b);
		for (let kx = b.rect.x0; kx <= b.rect.x1; kx++) post(kx, farZ, 0, hedges);
		for (let kz = b.rect.z0; kz <= b.rect.z1; kz++) if (kz !== farZ) post(farX, kz, Math.PI / 2, hedges);
	}
	const lampRing = (row, step, phase) => {
		for (let k = -row + phase; k < row; k += step) {
			const ak = Math.abs(k);
			if (ak <= TOWN.avenueHalf + 1) continue;
			if (ak >= TOWN.alley.from - 1 && ak <= TOWN.alley.to + 1) continue;
			for (const [kx, kz] of [
				[k, -row],
				[k, row],
				[-row, k],
				[row, k]
			]) {
				const tx = C + kx;
				const tz = C + kz;
				if (!inBounds(map, tx, tz)) continue;
				const i = tileIndex(map, tx, tz);
				if (map.kind[i] !== TileKind.path || map.blocked[i]) continue;
				if (doorsteps.has(`${tx},${tz}`)) continue;
				post(kx, kz, 0, lamps);
			}
		}
	};
	lampRing(TOWN.frame.to, 5, 3);
	lampRing(TOWN.middle.to, 6, 2);
	lampRing(TOWN.boulevard.to - 1, 8, 4);
	for (const [kx, kz] of [
		[-11, -11],
		[11, -11],
		[-11, 11],
		[11, 11]
	]) post(kx, kz, 0, lamps);
	for (const spoke of SPOKES) for (let s = TOWN_EDGE_TILES + 3; s <= spoke.toTiles - 2; s += 8) for (const side of [-2.5, 2.5]) {
		const x = (spoke.dir[0] * s + spoke.dir[1] * side) * 2;
		const z = (spoke.dir[1] * s + spoke.dir[0] * side) * 2;
		const y = groundY(map, x, z);
		if (y <= LEVEL_Y[0]) continue;
		lamps.push({
			x,
			z,
			y,
			rotation: 0
		});
	}
	for (const leg of NORTH_ROAD) for (let s = 4; s < leg.length; s += 8) {
		const [x, z] = tileToWorld(leg.from[0] + leg.dir[0] * s + leg.dir[1] * 2, leg.from[1] + leg.dir[1] * s + leg.dir[0] * 2);
		lamps.push({
			x,
			z,
			y: groundY(map, x, z),
			rotation: 0
		});
	}
	for (let s = 4; s < MINE_ROAD.length; s += 8) {
		const [x, z] = tileToWorld(MINE_ROAD.fromX - s, MINE_ROAD.z + 2);
		lamps.push({
			x,
			z,
			y: groundY(map, x, z),
			rotation: 0
		});
	}
	for (let tz = DOCK_TILES.from + 2; tz <= DOCK_TILES.to; tz += 4) {
		const [x, z] = tileToWorld(128 + DOCK_TILES.halfWidth, tz);
		lamps.push({
			x: x + .7,
			z,
			y: DOCK_Y,
			rotation: 0
		});
	}
	return {
		hedges,
		lamps
	};
}
function placeFestoonPoles(map) {
	const poles = [];
	const r = 9.5 * 2;
	for (let k = 0; k < 8; k++) {
		const angle = (k + .5) / 8 * Math.PI * 2;
		const x = Math.sin(angle) * r;
		const z = -Math.cos(angle) * r;
		poles.push({
			x,
			z,
			y: groundY(map, x, z),
			rotation: angle
		});
		const [tx, tz] = worldToTile(x, z);
		if (inBounds(map, tx, tz)) map.blocked[tileIndex(map, tx, tz)] = 1;
	}
	return poles;
}
function placeCampfire(map) {
	const C = 128;
	const cx = Math.round(C + REGIONS.lagoon.x * C - REGIONS.lagoon.r * C - 9);
	const cz = Math.round(C + REGIONS.lagoon.z * C + 4);
	for (let r = 0; r < 12; r++) for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) {
		const tx = cx + dx;
		const tz = cz + dz;
		if (!inBounds(map, tx, tz)) continue;
		let ok = true;
		fillRect(map, tx, tz, 1, 1, (i) => {
			if (map.kind[i] !== TileKind.sand || map.blocked[i]) ok = false;
		});
		if (!ok) continue;
		fillRect(map, tx, tz, 1, 1, (i) => map.blocked[i] = 1);
		const [x$1, z$1] = tileToWorld(tx, tz);
		return {
			x: x$1,
			z: z$1,
			y: groundY(map, x$1, z$1),
			rotation: 0
		};
	}
	const [x, z] = tileToWorld(cx, cz);
	return {
		x,
		z,
		y: groundY(map, x, z),
		rotation: 0
	};
}
function placeReeds(map) {
	const reeds = [];
	for (let tz = 1; tz < map.size - 1; tz++) for (let tx = 1; tx < map.size - 1; tx++) {
		const i = tileIndex(map, tx, tz);
		if (map.kind[i] !== TileKind.marsh || map.blocked[i]) continue;
		let pool = false;
		for (const [dx, dz] of [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1]
		]) if (map.kind[tileIndex(map, tx + dx, tz + dz)] === TileKind.pool) pool = true;
		const density = pool ? .8 : .28;
		if (hash2(tx, tz, 20260962) > density) continue;
		const [x, z] = tileToWorld(tx, tz);
		reeds.push({
			x: x + (hash2(tx, tz, 62) - .5) * 1.4,
			z: z + (hash2(tx, tz, 63) - .5) * 1.4,
			y: LEVEL_Y[map.level[i]],
			rotation: hash2(tx, tz, 64) * Math.PI * 2
		});
	}
	return reeds;
}
function placeQuarterFurniture(map) {
	const panels = [];
	const greenhouses = [];
	const [sx, sz] = PLACE_TILES.solar;
	for (let row = -2; row <= 2; row++) for (let col = -3; col <= 3; col++) {
		const tx = sx + col * 2;
		const tz = sz + row * 3;
		const [x, z] = tileToWorld(tx, tz);
		panels.push({
			x,
			z,
			y: groundY(map, x, z),
			rotation: 0
		});
		if (inBounds(map, tx, tz)) map.blocked[tileIndex(map, tx, tz)] = 1;
	}
	const [gx, gz] = PLACE_TILES.gardens;
	for (let row = -1; row <= 1; row++) for (let col = -1; col <= 1; col += 2) {
		const tx = gx + col * 4;
		const tz = gz + row * 4;
		const [x, z] = tileToWorld(tx, tz);
		greenhouses.push({
			x,
			z,
			y: groundY(map, x, z),
			rotation: 0
		});
		fillRect(map, tx, tz, 1, 1, (i) => map.blocked[i] = 1);
	}
	return {
		panels,
		greenhouses
	};
}
function treeChoice(map, tx, tz) {
	const i = tileIndex(map, tx, tz);
	const k = map.kind[i];
	const level = map.level[i];
	const nx = (tx + .5 - 128) / 128;
	const nz = (tz + .5 - 128) / 128;
	const grain = hash2(tx, tz, 8);
	if (k === TileKind.forest) return {
		kind: grain < .72 ? "round" : "pine",
		density: .34
	};
	if (k === TileKind.alpine) return {
		kind: "pine",
		density: .08
	};
	if (k === TileKind.sand) {
		if (regionT(nx, nz, REGIONS.cove) >= 1) return null;
		return {
			kind: "palm",
			density: regionT(nx, nz, REGIONS.lagoon) < 1.9 ? .11 : .045
		};
	}
	if (k === TileKind.meadow) return {
		kind: level >= 5 ? "pine" : "round",
		density: .09
	};
	if (k === TileKind.heath) return {
		kind: "pine",
		density: .025
	};
	if (k === TileKind.dry) return {
		kind: "round",
		density: .018
	};
	if (k === TileKind.grass) return {
		kind: "round",
		density: Math.hypot(nx, nz) > .8 ? .5 : .05
	};
	return null;
}
function placeTrees(map) {
	const trees = [];
	const C = 128;
	for (let tz = 1; tz < map.size - 1; tz++) for (let tx = 1; tx < map.size - 1; tx++) {
		const i = tileIndex(map, tx, tz);
		if (map.blocked[i]) continue;
		const choice = treeChoice(map, tx, tz);
		if (!choice) continue;
		const zone = townZone(tx - C, tz - C);
		if (isPavedZone(zone)) continue;
		const density = zone === "block" ? .16 : zone === "fringe" ? Math.max(choice.density, .1) : choice.density;
		if (hash2(tx, tz, 20260956) > density) continue;
		let clear = true;
		for (let dz = -1; dz <= 1 && clear; dz++) for (let dx = -1; dx <= 1; dx++) {
			const j = tileIndex(map, tx + dx, tz + dz);
			const kk = map.kind[j];
			if (kk === TileKind.path || kk === TileKind.plaza || kk === TileKind.dock || map.blocked[j] && kk !== TileKind.water && kk !== TileKind.rock && kk !== TileKind.snow) {
				clear = false;
				break;
			}
		}
		if (!clear) continue;
		const [x, z] = tileToWorld(tx, tz);
		trees.push({
			x: x + (hash2(tx, tz, 3) - .5) * .8,
			z: z + (hash2(tx, tz, 4) - .5) * .8,
			y: LEVEL_Y[map.level[i]],
			size: hash2(tx, tz, 5),
			shade: hash2(tx, tz, 6),
			kind: choice.kind
		});
		map.blocked[i] = 1;
	}
	return trees;
}
function placeBoulders(map) {
	const boulders = [];
	const C = 128;
	for (let tz = 1; tz < map.size - 1; tz++) for (let tx = 1; tx < map.size - 1; tx++) {
		const i = tileIndex(map, tx, tz);
		const k = map.kind[i];
		if (k === TileKind.water || k === TileKind.pool || k === TileKind.path || k === TileKind.plaza || k === TileKind.dock) continue;
		if (townZone(tx - C, tz - C) !== "outside") continue;
		let density;
		if (k === TileKind.rock || k === TileKind.snow) density = .05;
		else if (k === TileKind.quarry) density = .09;
		else if (k === TileKind.scree) density = .06;
		else if (k === TileKind.alpine || k === TileKind.heath) density = .035;
		else if (k === TileKind.sand) density = .012;
		else density = .008;
		let cliff = false;
		for (const [dx, dz] of [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1]
		]) {
			const j = tileIndex(map, tx + dx, tz + dz);
			if (map.kind[j] !== TileKind.water && map.level[j] >= map.level[i] + 2) cliff = true;
		}
		if (cliff) density *= 3;
		if (hash2(tx, tz, 20260992) > density) continue;
		if (map.blocked[i] && k !== TileKind.rock && k !== TileKind.snow) continue;
		const [x, z] = tileToWorld(tx, tz);
		boulders.push({
			x: x + (hash2(tx, tz, 31) - .5) * 1.2,
			z: z + (hash2(tx, tz, 32) - .5) * 1.2,
			y: LEVEL_Y[map.level[i]],
			size: hash2(tx, tz, 33),
			seed: hash2(tx, tz, 34)
		});
		map.blocked[i] = 1;
	}
	return boulders;
}
const KIT_STAND_AHEAD_M = {
	plugins: 7.5,
	foundry: 13.5,
	skills: 7.5,
	mcp: 7,
	cli: 7.5,
	comms: 7.2,
	desktop: 7.2,
	gallery: 7.6,
	models: 7.2,
	civic: 8,
	web: 6.6
};
var KIT_FORECOURT_M = 10;
function kitPlace(id, pose = kitPose(id)) {
	const ahead = KIT_STAND_AHEAD_M[id];
	const step = (reach) => worldToTile(pose.x + Math.sin(pose.rotation) * reach, pose.z + Math.cos(pose.rotation) * reach);
	let tile = step(ahead);
	for (let reach = ahead; reach <= ahead + KIT_FORECOURT_M; reach += 2 / 2) {
		const t = step(reach);
		if (isPavedZone(townZone(t[0] - 128, t[1] - 128))) {
			tile = t;
			break;
		}
	}
	return {
		id,
		tile: PLACE_TILES[id],
		standTile: tile,
		facing: normalizeAngle(pose.rotation + Math.PI)
	};
}
function buildPlaces(map) {
	const C = 128;
	const place = (id, standTile, facing) => ({
		id,
		tile: PLACE_TILES[id],
		standTile,
		facing
	});
	const places = {
		market: place("market", [C - 4, C + 3], Math.atan2(4, -3)),
		hub: place("hub", [C, PLACE_TILES.hub[1] + 8], Math.PI),
		archive: place("archive", [C, PLACE_TILES.archive[1] + 5], Math.PI),
		harbor: place("harbor", [C, PLACE_TILES.harbor[1] - 2], 0),
		workshop: place("workshop", [PLACE_TILES.workshop[0] + 8, C], -Math.PI / 2),
		lighthouse: place("lighthouse", [PLACE_TILES.lighthouse[0] - 4, C], Math.PI / 2),
		gardens: place("gardens", [PLACE_TILES.gardens[0], PLACE_TILES.gardens[1]], 0),
		solar: place("solar", [PLACE_TILES.solar[0] + 1, PLACE_TILES.solar[1] + 9], Math.PI),
		mine: place("mine", [PLACE_TILES.mine[0] + 7, PLACE_TILES.mine[1]], -Math.PI / 2),
		plugins: kitPlace("plugins"),
		foundry: kitPlace("foundry"),
		skills: kitPlace("skills"),
		mcp: kitPlace("mcp"),
		cli: kitPlace("cli"),
		comms: kitPlace("comms"),
		desktop: kitPlace("desktop"),
		gallery: kitPlace("gallery"),
		models: kitPlace("models"),
		civic: kitPlace("civic"),
		web: kitPlace("web")
	};
	for (const p of Object.values(places)) {
		const [tx, tz] = p.standTile;
		if (inBounds(map, tx, tz)) {
			const i = tileIndex(map, tx, tz);
			map.blocked[i] = 0;
			if (map.kind[i] === TileKind.water) paintLand(map, i, TileKind.path, 1);
		}
	}
	return places;
}
const LONG_TABLE_RECT_M = {
	x0: -5.2,
	z0: 6.6,
	x1: 5.2,
	z1: 10.4
};
function blockSquareFurniture(map) {
	const C = 128;
	paintDisc(map, C, C, 0, 6 / 2, (i) => map.blocked[i] = 1);
	const t = LONG_TABLE_RECT_M;
	blockRectM(map, t.x0, t.z0, t.x1, t.z1);
}
function blockLandmarkFurniture(map) {
	const [hx, hz] = tileToWorld(...PLACE_TILES.hub);
	for (const ox of [-15.5, 15.5]) blockRectM(map, hx + ox - 3.5, hz - 3, hx + ox + 3.5, hz + 5);
	for (const px of [
		-10,
		-6,
		-2,
		2,
		6,
		10
	]) blockPost(map, hx + px, hz + 7.4);
	for (const px of [-13, 13]) blockRectM(map, hx + px - 1.2, hz + 6.3, hx + px + 1.2, hz + 8.7);
	blockRectM(map, hx - 4.2, hz + 12.1, hx + 4.2, hz + 14.3);
	for (const px of [-6.2, 6.2]) blockPost(map, hx + px, hz + 13.2);
	const [bx, bz] = tileToWorld(...PLACE_TILES.harbor);
	blockRectM(map, bx - 9, bz + .25, bx - 5, bz + 3.75);
	for (const px of [-3, 3]) blockPost(map, bx + px, bz + 8);
	const [lx, lz] = tileToWorld(...PLACE_TILES.lighthouse);
	const s = 1.3;
	blockRectM(map, lx + -7 * s, lz + 1.3 * s, lx + -3 * s, lz + 4.7 * s);
}
var cached = null;
function buildIsland() {
	if (cached) return cached;
	const size = 256;
	const map = {
		size,
		kind: new Uint8Array(size * size),
		level: new Uint8Array(size * size),
		blocked: new Uint8Array(size * size),
		blockedStatic: new Uint8Array(0)
	};
	buildTerrain(map);
	buildPlots(map);
	buildVillage(map);
	const houses = townHouses();
	const kitPoses = {
		plugins: kitPose("plugins"),
		foundry: kitPose("foundry"),
		skills: kitPose("skills"),
		mcp: kitPose("mcp"),
		cli: kitPose("cli"),
		comms: kitPose("comms"),
		desktop: kitPose("desktop"),
		gallery: kitPose("gallery"),
		models: kitPose("models"),
		civic: kitPose("civic"),
		web: kitPose("web")
	};
	stampTurnables(map, map.blocked, houses, kitPoses, 1);
	blockSquareFurniture(map);
	blockLandmarkFurniture(map);
	const { hedges, lamps } = placeStreetFurniture(map);
	for (const h of hedges) stampFootprint(map.blocked, map, h.x, h.z, HEDGE_SEGMENT_M[0], HEDGE_SEGMENT_M[1], h.rotation, .3, 1);
	for (const l of lamps) blockPost(map, l.x, l.z);
	const { panels, greenhouses } = placeQuarterFurniture(map);
	const festoonPoles = placeFestoonPoles(map);
	const campfire = placeCampfire(map);
	const trees = placeTrees(map);
	const boulders = placeBoulders(map);
	const reeds = placeReeds(map);
	const places = buildPlaces(map);
	map.blockedStatic = map.blocked.slice();
	stampTurnables(map, map.blockedStatic, houses, kitPoses, 0);
	cached = {
		map,
		content: {
			places,
			houses,
			trees,
			boulders,
			reeds,
			festoonPoles,
			campfire,
			hedges,
			lamps,
			panels,
			greenhouses,
			kitPoses
		}
	};
	applyBuildingYaws(cached, {});
	return cached;
}
function houseId(slot) {
	return `house:${slot}`;
}
function kitId(place) {
	return `kit:${place}`;
}
function defaultBuildingYaw(id) {
	if (id.startsWith("kit:")) return kitPose(id.slice(4)).rotation;
	const slot = Number(id.slice(6));
	return townHouses().find((h) => h.slot === slot)?.defaultRotation ?? 0;
}
const HEDGE_SEGMENT_M = [2.3, .8];
function stampTurnables(map, layer, houses, kitPoses, value) {
	for (const h of houses) stampFootprint(layer, map, h.x, h.z, h.w * 2, h.d * 2, h.rotation, WALL_MARGIN_M, value);
	for (const id of Object.keys(kitPoses)) {
		const p = kitPoses[id];
		const f = KIT_FOOTPRINT_TILES[id];
		stampFootprint(layer, map, p.x, p.z, f.w * 2, f.d * 2, p.rotation, WALL_MARGIN_M, value);
	}
	const belt = kitPoses.foundry;
	stampFootprint(layer, map, belt.x + Math.sin(belt.rotation) * FOUNDRY_RAMP_MID_M, belt.z + Math.cos(belt.rotation) * FOUNDRY_RAMP_MID_M, 6, 6, belt.rotation, WALL_MARGIN_M, value);
}
function applyBuildingYaws(island, yaws) {
	const { map, content } = island;
	for (const h of content.houses) h.rotation = yaws[houseId(h.slot)] ?? h.defaultRotation;
	for (const id of Object.keys(content.kitPoses)) {
		content.kitPoses[id].rotation = yaws[kitId(id)] ?? kitPose(id).rotation;
		content.places[id] = kitPlace(id, content.kitPoses[id]);
	}
	map.blocked.set(map.blockedStatic);
	stampTurnables(map, map.blocked, content.houses, content.kitPoses, 1);
	for (const p of Object.values(content.places)) {
		const [tx, tz] = p.standTile;
		if (inBounds(map, tx, tz)) map.blocked[tileIndex(map, tx, tz)] = 0;
	}
}
var KEY = "jarvis.world.poses.v1";
const SNAP_STEP_RAD = Math.PI / 12;
function read() {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return {};
		return normalizeOverrides(JSON.parse(raw)?.yaw);
	} catch {
		return {};
	}
}
function write(yaw) {
	try {
		localStorage.setItem(KEY, JSON.stringify({ yaw }));
	} catch {}
}
function normalizeOverrides(v) {
	if (!v || typeof v !== "object") return {};
	const out = {};
	for (const [k, val] of Object.entries(v)) {
		if (!/^(house:\d{1,2}|kit:[a-z]+)$/.test(k)) continue;
		if (typeof val !== "number" || !Number.isFinite(val)) continue;
		out[k] = normalizeAngle(val);
	}
	return out;
}
function settleYaw(id, raw, snapStep) {
	const fallback = defaultBuildingYaw(id);
	let yaw = normalizeAngle(raw);
	if (snapStep) yaw = normalizeAngle(Math.round(yaw / SNAP_STEP_RAD) * SNAP_STEP_RAD);
	if (Math.abs(normalizeAngle(yaw - fallback)) < .07) return fallback;
	return yaw;
}
var initial = typeof localStorage === "undefined" ? {} : read();
create((set, get) => ({
	yaw: initial,
	generation: 0,
	selected: null,
	rotating: false,
	setYaw: (id, raw, snapStep = false) => {
		const yaw = settleYaw(id, raw, snapStep);
		const next = { ...get().yaw };
		if (yaw === defaultBuildingYaw(id)) delete next[id];
		else next[id] = yaw;
		commit(next, set, get);
	},
	resetYaw: (id) => {
		if (!(id in get().yaw)) return;
		const next = { ...get().yaw };
		delete next[id];
		commit(next, set, get);
	},
	resetAll: () => {
		if (Object.keys(get().yaw).length === 0) return;
		commit({}, set, get);
	},
	select: (selected) => set({ selected }),
	setRotating: (rotating) => set({ rotating })
}));
function commit(yaw, set, get) {
	applyBuildingYaws(buildIsland(), yaw);
	set({
		yaw,
		generation: get().generation + 1
	});
	write(yaw);
}
const ZOOM_WIDTHS_M = [
	32,
	64,
	128,
	256,
	512
];
Math.PI / 180;
function clampTarget(x, z, half = 256) {
	return [Math.min(half, Math.max(-half, x)), Math.min(half, Math.max(-half, z))];
}
function stepZoom(level, direction) {
	return Math.min(ZOOM_WIDTHS_M.length - 1, Math.max(0, level + direction));
}
function normalizeYaw(deg) {
	if (!Number.isFinite(deg)) return 45;
	return round((deg % 360 + 360) % 360);
}
function clampPitch(deg) {
	if (!Number.isFinite(deg)) return 50;
	return round(Math.min(90, Math.max(0, deg)));
}
function stepYaw(yawDeg, direction) {
	const cur = normalizeYaw(yawDeg) / 45;
	const eps = .5 / 45;
	return normalizeYaw((direction > 0 ? Math.floor(cur + eps) + 1 : Math.ceil(cur - eps) - 1) * 45);
}
function round(v) {
	return Math.round(v * 1e6) / 1e6;
}
function focusFromSearch(search) {
	const raw = new URLSearchParams(search).get("world");
	if (!raw) return null;
	const parts = raw.split(",").map((v) => Number(v));
	if (parts.length < 2 || !parts.slice(0, 2).every(Number.isFinite)) return null;
	return {
		target: clampTarget(parts[0], parts[1]),
		zoom: parts.length > 2 && Number.isInteger(parts[2]) && parts[2] >= 0 && parts[2] <= 4 ? parts[2] : 1,
		yaw: parts.length > 3 ? normalizeYaw(parts[3]) : 45,
		pitch: parts.length > 4 ? clampPitch(parts[4]) : 50
	};
}
var initialFocus = typeof window !== "undefined" ? focusFromSearch(window.location.search) : null;
create((set, get) => ({
	target: initialFocus?.target ?? [0, 0],
	zoom: initialFocus?.zoom ?? 1,
	yaw: initialFocus?.yaw ?? 45,
	pitch: initialFocus?.pitch ?? 50,
	dragging: false,
	orbiting: false,
	heldKeys: /* @__PURE__ */ new Set(),
	aspect: 16 / 9,
	panBy: (dx, dz) => {
		const [x, z] = get().target;
		set({ target: clampTarget(x + dx, z + dz) });
	},
	jumpTo: (x, z) => set({ target: clampTarget(x, z) }),
	focusOn: (x, z, zoom) => set({
		target: clampTarget(x, z),
		zoom
	}),
	zoomStep: (direction) => set((s) => ({ zoom: stepZoom(s.zoom, direction) })),
	orbitBy: (dYaw, dPitch) => set((s) => ({
		yaw: normalizeYaw(s.yaw + dYaw),
		pitch: clampPitch(s.pitch + dPitch)
	})),
	turnYaw: (direction) => set((s) => ({ yaw: stepYaw(s.yaw, direction) })),
	resetView: () => set({
		yaw: 45,
		pitch: 50
	}),
	setDragging: (dragging) => set({ dragging }),
	setOrbiting: (orbiting) => set({ orbiting }),
	setAspect: (aspect) => set({ aspect }),
	keyDown: (code) => {
		const keys = get().heldKeys;
		if (keys.has(code)) return;
		const next = new Set(keys);
		next.add(code);
		set({ heldKeys: next });
	},
	keyUp: (code) => {
		const keys = get().heldKeys;
		if (!keys.has(code)) return;
		const next = new Set(keys);
		next.delete(code);
		set({ heldKeys: next });
	},
	clearKeys: () => set({ heldKeys: /* @__PURE__ */ new Set() })
}));
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
TileKind.water, TileKind.sand, TileKind.grass, TileKind.meadow, TileKind.rock, TileKind.plaza, TileKind.path, TileKind.garden, TileKind.dock, TileKind.forest, TileKind.alpine, TileKind.snow, TileKind.heath, TileKind.dry, TileKind.farm, TileKind.marsh, TileKind.scree, TileKind.quarry, TileKind.pool;
.72 * Math.PI, .62 * Math.PI;
const BUILDING = {
	wall: "#f7f3ea",
	wallShade: "#e6e0d2",
	trim: "#c9c2b2",
	glass: "#8ed2f0",
	glassEmissive: "#4fa8d6",
	solar: "#26375a",
	solarLine: "#3e5f95",
	gardenRoof: "#6fbf55",
	gardenRoofBush: "#4c9c3d",
	wood: "#b57f45",
	woodDark: "#8c5e2f",
	door: "#e0893b",
	hubAccent: "#2f6f8f",
	hubGlass: "#bfe7ff",
	pool: "#86d9ea",
	beacon: "#ffe08a",
	beaconCore: "#fff6d5",
	workshopRoof: "#d86a4a",
	archiveDome: "#5aa7c8",
	lighthouseStripe: "#e05a5a",
	metal: "#8b8f9c",
	buoy: "#e8563f",
	mineDark: "#10131a",
	ore: "#e8bd4c",
	rail: "#6d6f78"
};
const NATURE = {
	trunk: "#7a5230",
	canopyA: "#4faf49",
	canopyB: "#6cc35e",
	canopyLight: "#93da7c",
	bigCanopy: "#57b84f",
	bigCanopyLight: "#8fdc7a",
	pineA: "#2f7f45",
	pineB: "#3b9452",
	pineLight: "#5aae64",
	palmTrunk: "#a8794a",
	palmLeaf: "#4fb254",
	palmLeafLight: "#7ccf6c",
	boulderA: "#a19fab",
	boulderB: "#7e7c8a",
	hedge: "#3f8f3f",
	hedgeLight: "#57a94f",
	flower: "#ef8fb6",
	lampPost: "#5c5f6a",
	lampLight: "#ffe9b0",
	lampGlow: "#ffd68a",
	bulb: "#fff3c8",
	reed: "#7aa95e",
	reedHead: "#a8834b",
	fire: "#ff8f3a",
	fireCore: "#ffe37a",
	ember: "#ff5a2c",
	tableWood: "#c58d4f",
	bench: "#a9723a"
};
const CEREMONY = {
	muzzle: "#ffe9a8",
	stretcherPole: "#6b4a2a",
	stretcherCloth: "#c9c0ac",
	bearerCloth: "#4a4f5c",
	bearerTrim: "#2f333c",
	bearerLamp: "#ffd98a",
	stain: "#4a1418"
};
function createToonRamp() {
	const steps = [
		.58,
		.8,
		.94,
		1
	];
	const data = new Uint8Array(steps.length * 4);
	steps.forEach((v, i) => {
		const b = Math.round(v * 255);
		data.set([
			b,
			b,
			b,
			255
		], i * 4);
	});
	const tex = new DataTexture(data, steps.length, 1, RGBAFormat);
	tex.minFilter = NearestFilter;
	tex.magFilter = NearestFilter;
	tex.generateMipmaps = false;
	tex.needsUpdate = true;
	return tex;
}
({
	...BUILDING,
	...NATURE,
	...CEREMONY
});
const KIT_URLS = {
	"plugin-docks": plugin_docks_default,
	"skill-forge": skill_forge_default,
	"relay-tower": relay_tower_default,
	"terminal-cantina": terminal_cantina_default,
	"agent-foundry": agent_foundry_default,
	"signal-office": signal_office_default,
	"control-room": control_room_default,
	"gallery-hall": gallery_hall_default,
	"model-boilerhouse": model_boilerhouse_default,
	"town-hall": town_hall_default,
	observatory: observatory_default
};
var GLOW_STRENGTH = 1.5;
function restyle(root, ramp) {
	root.traverse((o) => {
		if (!(o instanceof Mesh)) return;
		const src = o.material;
		if (!(src instanceof MeshStandardMaterial)) return;
		const emissiveStrength = src.emissiveIntensity * Math.max(src.emissive.r, src.emissive.g, src.emissive.b);
		if (emissiveStrength >= GLOW_STRENGTH) o.material = new MeshBasicMaterial({ color: src.emissive.clone().multiplyScalar(1) });
		else o.material = new MeshToonMaterial({
			color: src.color.clone(),
			gradientMap: ramp,
			emissive: emissiveStrength > 0 ? src.emissive.clone() : new Color(0, 0, 0),
			emissiveIntensity: emissiveStrength > 0 ? Math.min(.6, src.emissiveIntensity) : 0
		});
		o.castShadow = true;
		o.receiveShadow = true;
	});
}
useGLTF.preload(plugin_docks_default);
useGLTF.preload(agent_foundry_default);
var MODEL_URLS = {
	...KIT_URLS,
	"memory-house": memory_house_default
};
var PITCH_MIN = 6 * Math.PI / 180;
var PITCH_MAX = 70 * Math.PI / 180;
var ZOOM_MIN = .6;
var ZOOM_MAX = 2.2;
var FOV = 30;
var IDLE_TURN = .12;
var REST_VIEW = {
	yaw: -.7,
	pitch: .42,
	zoom: 1
};
function BuildingViewer({ model, className }) {
	const t = useT();
	const hostRef = (0, import_react.useRef)(null);
	const { generation } = useWebglSurface(hostRef);
	const awake = useCanvasAwake(hostRef);
	const reduced = useReducedMotion() ?? false;
	const orbit = (0, import_react.useRef)({ ...REST_VIEW });
	const [orbitTick, setOrbitTick] = (0, import_react.useState)(0);
	const drag = (0, import_react.useRef)(null);
	const touchedAt = (0, import_react.useRef)(0);
	const onPointerDown = (0, import_react.useCallback)((e) => {
		if (e.button !== 0) return;
		drag.current = {
			x: e.clientX,
			y: e.clientY,
			id: e.pointerId
		};
		touchedAt.current = performance.now();
		e.currentTarget.setPointerCapture(e.pointerId);
	}, []);
	const onPointerMove = (0, import_react.useCallback)((e) => {
		const d = drag.current;
		if (!d || d.id !== e.pointerId) return;
		const dx = e.clientX - d.x;
		const dy = e.clientY - d.y;
		d.x = e.clientX;
		d.y = e.clientY;
		const o = orbit.current;
		o.yaw += dx * .01;
		o.pitch = Math.max(PITCH_MIN, Math.min(PITCH_MAX, o.pitch + dy * .008));
		touchedAt.current = performance.now();
		setOrbitTick((n) => n + 1);
	}, []);
	const onPointerUp = (0, import_react.useCallback)((e) => {
		if (drag.current?.id === e.pointerId) drag.current = null;
	}, []);
	const onWheel = (0, import_react.useCallback)((e) => {
		const o = orbit.current;
		o.zoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, o.zoom * (1 - e.deltaY * .0012)));
		touchedAt.current = performance.now();
		setOrbitTick((n) => n + 1);
	}, []);
	const onDoubleClick = (0, import_react.useCallback)(() => {
		orbit.current = { ...REST_VIEW };
		setOrbitTick((n) => n + 1);
	}, []);
	const frameloop = awake && !reduced ? "always" : "demand";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: hostRef,
		"data-testid": "building-viewer",
		className: cn("relative h-full min-h-0 w-full select-none overflow-hidden touch-none", drag.current ? "cursor-grabbing" : "cursor-grab", className),
		style: { background: "radial-gradient(120% 90% at 50% 40%, hsl(var(--secondary)) 0%, hsl(var(--background)) 72%)" },
		onPointerDown,
		onPointerMove,
		onPointerUp,
		onPointerCancel: onPointerUp,
		onWheel,
		onDoubleClick,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewerErrorBoundary, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Unavailable, { label: t("society.world.card_unavailable") }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
				dpr: 1,
				flat: true,
				frameloop,
				gl: {
					antialias: true,
					alpha: true,
					powerPreference: "low-power"
				},
				camera: {
					fov: FOV,
					near: .5,
					far: 400,
					position: [
						0,
						20,
						60
					]
				},
				onCreated: ({ gl }) => {
					gl.setClearColor(0, 0);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildingScene, {
						model,
						orbit,
						orbitTick,
						idle: !reduced && awake,
						touchedAt
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HostSizeSync, {})]
			}, generation)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "pointer-events-none absolute inset-x-0 bottom-2 text-center text-xs text-muted-foreground",
			children: reduced ? t("society.world.card_reduced_motion") : t("society.world.card_drag_hint")
		})]
	});
}
function BuildingScene({ model, orbit, orbitTick, idle, touchedAt }) {
	const { scene } = useGLTF(MODEL_URLS[model]);
	const camera = useThree((s) => s.camera);
	const invalidate = useThree((s) => s.invalidate);
	const groupRef = (0, import_react.useRef)(null);
	const ramp = (0, import_react.useMemo)(createToonRamp, []);
	const instance = (0, import_react.useMemo)(() => {
		const clone$1 = clone(scene);
		restyle(clone$1, ramp);
		return clone$1;
	}, [scene, ramp]);
	(0, import_react.useEffect)(() => () => {
		instance.traverse((o) => {
			if (o instanceof Mesh) o.material.dispose();
		});
		ramp.dispose();
	}, [instance, ramp]);
	const bounds = (0, import_react.useMemo)(() => {
		const box = new Box3().setFromObject(instance);
		const size = box.getSize(new Vector3());
		return {
			size,
			centre: box.getCenter(new Vector3()),
			radius: Math.max(size.x, size.z) * .5,
			top: box.max.y,
			bottom: box.min.y
		};
	}, [instance]);
	const place = (0, import_react.useCallback)(() => {
		const o = orbit.current;
		const group = groupRef.current;
		if (group) group.rotation.y = o.yaw;
		const distance = Math.hypot(bounds.radius, bounds.size.y * .5) * 1.12 / Math.sin(FOV * Math.PI / 360) / o.zoom;
		const mid = bounds.size.y * .42;
		camera.position.set(0, mid + Math.sin(o.pitch) * distance, Math.cos(o.pitch) * distance);
		camera.lookAt(0, mid, 0);
		camera.updateProjectionMatrix();
	}, [
		bounds,
		camera,
		orbit
	]);
	(0, import_react.useEffect)(() => {
		place();
		invalidate();
	}, [
		place,
		orbitTick,
		invalidate
	]);
	useFrame((_, dt) => {
		if (!idle) return;
		if (performance.now() - touchedAt.current < 2500) return;
		orbit.current.yaw += IDLE_TURN * Math.min(dt, .1);
		place();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: groupRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("primitive", {
			object: instance,
			position: [
				-bounds.centre.x,
				-bounds.bottom,
				-bounds.centre.z
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LobbyStage, {
		heightM: bounds.size.y,
		platformR: bounds.radius * 1.3,
		paused: !idle
	})] });
}
function HostSizeSync() {
	const gl = useThree((s) => s.gl);
	const setSize = useThree((s) => s.setSize);
	const invalidate = useThree((s) => s.invalidate);
	(0, import_react.useEffect)(() => {
		const wrapper = gl.domElement.parentElement;
		if (!wrapper || typeof ResizeObserver === "undefined") return;
		const sync = () => {
			const rect = wrapper.getBoundingClientRect();
			if (rect.width > 0 && rect.height > 0) {
				setSize(rect.width, rect.height);
				invalidate();
			}
		};
		sync();
		const observer = new ResizeObserver(sync);
		observer.observe(wrapper);
		return () => observer.disconnect();
	}, [
		gl,
		setSize,
		invalidate
	]);
	return null;
}
function Unavailable({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full w-full items-center justify-center p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-[28ch] text-center text-xs text-muted-foreground",
			children: label
		})
	});
}
var ViewerErrorBoundary = class extends import_react.Component {
	state = { failed: false };
	static getDerivedStateFromError() {
		return { failed: true };
	}
	componentDidCatch(error, info) {
		console.warn("[society] building viewer fell back:", error.message, info.componentStack);
	}
	render() {
		return this.state.failed ? this.props.fallback : this.props.children;
	}
};
async function fetchWorkspaceAgents() {
	const res = await fetch("/api/workspace/agents", { cache: "no-store" });
	if (!res.ok) throw new Error(`agents request failed: ${res.status}`);
	return await res.json();
}
async function getJson(url) {
	const res = await fetch(url, { cache: "no-store" });
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return await res.json();
}
function pluginTone(status) {
	if (status === "connected") return {
		tone: "ok",
		statusKey: "status_connected"
	};
	if (status === "needs_reauth" || status === "error") return {
		tone: "warn",
		statusKey: "status_attention"
	};
	return {
		tone: "off",
		statusKey: "status_available"
	};
}
async function loadPlugins() {
	const data = await getJson("/api/marketplace/plugins");
	const rows = (Array.isArray(data) ? data : data.plugins ?? []).map((p) => {
		const { tone, statusKey } = pluginTone(p.status);
		const plugin = {
			id: p.id,
			name: p.display_name,
			description: p.description,
			logoSlug: p.logo_slug,
			logoColor: p.logo_color ?? void 0,
			logoUrl: p.logo_url ?? void 0,
			status: p.status
		};
		return {
			id: p.id,
			name: p.display_name,
			description: p.description,
			meta: p.category,
			tone,
			statusKey,
			mark: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandTile, {
				plugin,
				size: "sm"
			})
		};
	});
	const byName = (a, b) => a.name.localeCompare(b.name);
	return [{
		labelKey: "plugin_group_connected",
		rows: rows.filter((r) => r.tone !== "off").sort(byName)
	}, {
		labelKey: "plugin_group_available",
		rows: rows.filter((r) => r.tone === "off").sort(byName)
	}];
}
var CLI_TONES = {
	connected: {
		tone: "ok",
		statusKey: "status_connected"
	},
	disconnected: {
		tone: "off",
		statusKey: "status_installed"
	},
	not_installed: {
		tone: "off",
		statusKey: "status_missing"
	},
	error: {
		tone: "error",
		statusKey: "status_attention"
	},
	checking: {
		tone: "busy",
		statusKey: "status_checking"
	}
};
async function loadClis() {
	const [seats, data] = await Promise.all([fetchWorkspaceAgents().catch(() => ({ agents: [] })), getJson("/api/clis")]);
	const byName = (a, b) => a.name.localeCompare(b.name);
	const seatRows = (seats.agents ?? []).map((a) => ({
		id: `seat:${a.name}`,
		name: a.display_name || a.name,
		description: "",
		meta: a.version ? `v${a.version.replace(/^v/i, "")}` : void 0,
		tone: a.installed ? "ok" : "off",
		statusKey: a.installed ? "status_installed" : "status_missing",
		mark: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentMark, {
			agent: a.name,
			label: a.display_name || a.name,
			size: "sm"
		})
	})).sort((a, b) => Number(b.tone === "ok") - Number(a.tone === "ok") || byName(a, b));
	const rows = (data.clis ?? []).map((c) => ({
		id: c.name,
		name: c.display_name || c.name,
		description: c.description,
		meta: c.version ? `v${c.version.replace(/^v/i, "")}` : void 0,
		...CLI_TONES[c.status],
		mark: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CliLogo, {
			cliName: c.name,
			category: c.category,
			size: "sm"
		})
	}));
	return [
		{
			labelKey: "cli_group_seats",
			rows: seatRows
		},
		{
			labelKey: "cli_group_connected",
			rows: rows.filter((r) => r.statusKey === "status_connected").sort(byName)
		},
		{
			labelKey: "cli_group_installed",
			rows: rows.filter((r) => r.statusKey === "status_installed" || r.tone === "error" || r.tone === "busy").sort(byName)
		},
		{
			labelKey: "cli_group_missing",
			rows: rows.filter((r) => r.statusKey === "status_missing").sort(byName)
		}
	];
}
function GlyphTile({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "grid h-7 w-7 shrink-0 place-items-center rounded-md border border-border/60 bg-secondary text-muted-foreground",
		children
	});
}
async function loadMcps() {
	const rows = ((await getJson("/api/mcps")).servers ?? []).map((s) => {
		const running = s.status === "running";
		const tools = Array.isArray(s.tools) ? s.tools.length : 0;
		return {
			id: s.name,
			name: s.display || s.name,
			description: s.description ?? "",
			meta: [s.transport ?? "stdio", tools ? `${tools} tools` : null].filter(Boolean).join(" · "),
			tone: running ? "ok" : s.enabled === false ? "off" : "off",
			statusKey: running ? "status_running" : "status_stopped",
			mark: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlyphTile, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, {
				className: "h-3.5 w-3.5",
				"aria-hidden": true
			}) })
		};
	});
	const byName = (a, b) => a.name.localeCompare(b.name);
	return [{
		labelKey: "mcp_group_stdio",
		rows: rows.filter((r) => !r.meta?.startsWith("http")).sort(byName)
	}, {
		labelKey: "mcp_group_http",
		rows: rows.filter((r) => r.meta?.startsWith("http")).sort(byName)
	}];
}
async function loadSkills() {
	const data = await getJson("/api/skills");
	const rows = (data.skills ?? []).map((s) => ({
		id: s.name,
		name: s.name,
		description: s.description ?? "",
		tone: s.state === "draft" ? "warn" : "ok",
		statusKey: s.state === "draft" ? "status_draft" : "status_ready",
		mark: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlyphTile, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
			className: "h-3.5 w-3.5",
			"aria-hidden": true
		}) }),
		meta: s.is_builtin ? void 0 : void 0
	}));
	const byName = (a, b) => a.name.localeCompare(b.name);
	const skills = data.skills ?? [];
	const state = (name) => skills.find((s) => s.name === name);
	return [
		{
			labelKey: "skills_group_draft",
			rows: rows.filter((r) => state(r.id)?.state === "draft").sort(byName)
		},
		{
			labelKey: "skills_group_custom",
			rows: rows.filter((r) => state(r.id)?.state !== "draft" && !state(r.id)?.is_builtin).sort(byName)
		},
		{
			labelKey: "skills_group_builtin",
			rows: rows.filter((r) => state(r.id)?.state !== "draft" && state(r.id)?.is_builtin).sort(byName)
		}
	];
}
var LOADERS = {
	plugins: loadPlugins,
	cli: loadClis,
	mcp: loadMcps,
	skills: loadSkills
};
function hasInside(place) {
	return place in LOADERS;
}
function BuildingInside({ place, className }) {
	const t = useT();
	const load = LOADERS[place];
	const inside = useQuery({
		queryKey: [
			"society",
			"building-inside",
			place
		],
		queryFn: load ?? (async () => []),
		enabled: Boolean(load),
		staleTime: 6e4
	});
	if (!load) return null;
	const groups = (inside.data ?? []).filter((g) => g.rows.length > 0);
	const total = groups.reduce((n, g) => n + g.rows.length, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-4", className),
		"data-testid": "building-card-inside",
		children: inside.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: t("society.world.drawer_loading")
		}) : inside.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-destructive",
			children: String(inside.error)
		}) : total === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: t("society.world.drawer_empty")
		}) : groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
			className: "mb-1 flex items-center gap-2 px-2 text-xs font-medium text-muted-foreground",
			children: [t(`society.world.${g.labelKey}`), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums",
				children: g.rows.length
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col",
			children: g.rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-secondary/60",
				children: [
					r.mark,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-sm font-medium text-foreground",
								children: r.name
							}), r.meta ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 font-mono text-xs text-muted-foreground",
								children: r.meta
							}) : null]
						}), r.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted-foreground",
							title: r.description,
							children: r.description
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 text-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, {
							tone: r.tone,
							label: t(`society.world.${r.statusKey}`),
							pulse: r.tone === "busy"
						})
					})
				]
			}, r.id))
		})] }, g.labelKey))
	});
}
function BuildingCardOverlay({ place, onClose, onCreateAgent }) {
	const t = useT();
	const ready = useLocaleChunk("society");
	const setActiveSection = useEventStore((s) => s.setActiveSection);
	const card = place ? BUILDING_CARDS[place] : null;
	const open = card !== null && ready;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		open,
		onOpenChange: (next) => next ? void 0 : onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 z-40 bg-scrim/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
			"data-testid": "building-card",
			className: "fixed inset-4 z-50 flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-float focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 motion-reduce:animate-none lg:inset-10",
			children: card ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex shrink-0 items-center gap-3 border-b border-border px-5 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
							className: "truncate font-display text-base font-semibold tracking-tight text-foreground",
							children: t(`society.world.${card.nameKey}`)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
							className: "truncate text-xs text-muted-foreground",
							children: t(`society.world.${card.taglineKey}`)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						children: t("society.world.card_kind_building")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
						"aria-label": t("society.world.drawer_close"),
						className: "rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-strong",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							className: "h-4 w-4",
							"aria-hidden": true
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-h-0 flex-1 grid-cols-[minmax(360px,1.35fr)_minmax(300px,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "relative min-h-0 border-r border-border",
					"aria-label": t(`society.world.${card.nameKey}`),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildingViewer, { model: card.model })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex min-h-0 flex-col",
					"aria-label": t("society.world.card_does_title"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
						className: "min-h-0 flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-5 p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
									children: t("society.world.card_does_title")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm leading-relaxed text-foreground",
									children: t(`society.world.${card.doesKey}`)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
									children: t("society.world.card_how_title")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm leading-relaxed text-foreground",
									children: t(`society.world.${card.howKey}`)
								})] }),
								place && hasInside(place) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
									children: t("society.world.card_inside_title")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildingInside, {
									place,
									className: "-mx-2"
								})] }) : null
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "flex shrink-0 items-center justify-end gap-2 border-t border-border px-5 py-3",
						children: [card.builds && onCreateAgent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							size: "sm",
							onClick: onCreateAgent,
							"data-testid": "building-card-create",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
								className: "mr-1.5 h-3.5 w-3.5",
								"aria-hidden": true
							}), t("society.world.card_create_agent")]
						}) : null, card.section ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "secondary",
							size: "sm",
							onClick: () => {
								if (card.section) setActiveSection(card.section);
								onClose();
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
								className: "mr-1.5 h-3.5 w-3.5",
								"aria-hidden": true
							}), t("society.world.card_open_section")]
						}) : null]
					})]
				})]
			})] }) : null
		})] })
	});
}
var BuildingCardOverlay_default = BuildingCardOverlay;
export { BuildingCardOverlay, BuildingCardOverlay_default as default };
