import { i as recipeKey } from "./figureRecipe-BRnaWN-p.js";
const OUTFITS = [
	{
		id: "leather",
		colourways: [
			{
				id: "black",
				primary: "#131316",
				secondary: "#1d2029",
				accent: "#9aa0a8",
				inner: "#1b1b1e",
				shoes: "#101012"
			},
			{
				id: "cognac",
				primary: "#5c3622",
				secondary: "#2a3346",
				accent: "#c9a227",
				inner: "#efe8dc",
				shoes: "#3b2418"
			},
			{
				id: "oxblood",
				primary: "#4a1a1f",
				secondary: "#1d2029",
				accent: "#9aa0a8",
				inner: "#1b1b1e",
				shoes: "#101012"
			}
		]
	},
	{
		id: "suit",
		colourways: [
			{
				id: "charcoal",
				primary: "#3a3d44",
				secondary: "#3a3d44",
				accent: "#8b1e2d",
				inner: "#f4f4f0",
				shoes: "#1a1414"
			},
			{
				id: "navy",
				primary: "#1f2a44",
				secondary: "#1f2a44",
				accent: "#c9a227",
				inner: "#eaf1fb",
				shoes: "#3b2418"
			},
			{
				id: "tuxedo",
				primary: "#141418",
				secondary: "#141418",
				accent: "#141418",
				inner: "#ffffff",
				shoes: "#0d0d0d"
			},
			{
				id: "linen",
				primary: "#cbb795",
				secondary: "#cbb795",
				accent: "#2f4a7a",
				inner: "#ffffff",
				shoes: "#6b4226"
			}
		]
	},
	{
		id: "blazer",
		colourways: [
			{
				id: "old_money",
				primary: "#23304f",
				secondary: "#dccfb3",
				accent: "#b8943e",
				inner: "#f2efe6",
				shoes: "#6b4226"
			},
			{
				id: "camel",
				primary: "#b08a5a",
				secondary: "#3b3f4a",
				accent: "#f2efe6",
				inner: "#ffffff",
				shoes: "#2a1d15"
			},
			{
				id: "forest",
				primary: "#2f4a3a",
				secondary: "#e3dccb",
				accent: "#c9a227",
				inner: "#f2efe6",
				shoes: "#4a2e22"
			}
		]
	},
	{
		id: "quarterzip",
		colourways: [
			{
				id: "oat",
				primary: "#d8cbb4",
				secondary: "#3b3f4a",
				accent: "#c7c9cc",
				inner: "#ffffff",
				shoes: "#f4f4f2"
			},
			{
				id: "navy",
				primary: "#1f2a44",
				secondary: "#c8b28e",
				accent: "#c7c9cc",
				inner: "#cfe0f5",
				shoes: "#3b2418"
			},
			{
				id: "forest",
				primary: "#2f4a3a",
				secondary: "#e3dccb",
				accent: "#c7c9cc",
				inner: "#ffffff",
				shoes: "#f4f4f2"
			}
		]
	},
	{
		id: "vest",
		colourways: [
			{
				id: "navy",
				primary: "#1f2a44",
				secondary: "#b9a27f",
				accent: "#e5674f",
				inner: "#cfe0f5",
				shoes: "#3b2418"
			},
			{
				id: "charcoal",
				primary: "#3b3f4a",
				secondary: "#2b2f38",
				accent: "#6fbf5a",
				inner: "#ffffff",
				shoes: "#f4f4f2"
			},
			{
				id: "black",
				primary: "#18181c",
				secondary: "#c8b28e",
				accent: "#f2c14e",
				inner: "#eaf1fb",
				shoes: "#2a1d15"
			}
		]
	},
	{
		id: "turtleneck",
		colourways: [
			{
				id: "black",
				primary: "#141416",
				secondary: "#3d5a80",
				accent: "#141416",
				inner: "#141416",
				shoes: "#9a9aa0"
			},
			{
				id: "camel",
				primary: "#b08a5a",
				secondary: "#2b2b33",
				accent: "#b08a5a",
				inner: "#b08a5a",
				shoes: "#3b2418"
			},
			{
				id: "cream",
				primary: "#eee6d6",
				secondary: "#3b3f4a",
				accent: "#eee6d6",
				inner: "#eee6d6",
				shoes: "#2a1d15"
			}
		]
	},
	{
		id: "hoodie",
		colourways: [
			{
				id: "grey",
				primary: "#8a8d93",
				secondary: "#2b2f38",
				accent: "#f2f2ee",
				inner: "#f2f2ee",
				shoes: "#f4f4f2"
			},
			{
				id: "black",
				primary: "#1c1c20",
				secondary: "#1c1c20",
				accent: "#d9d9d9",
				inner: "#1c1c20",
				shoes: "#f4f4f2"
			},
			{
				id: "navy",
				primary: "#23304f",
				secondary: "#8a8d93",
				accent: "#f2f2ee",
				inner: "#23304f",
				shoes: "#f4f4f2"
			},
			{
				id: "sage",
				primary: "#8fa58a",
				secondary: "#e3dccb",
				accent: "#f2f2ee",
				inner: "#8fa58a",
				shoes: "#f4f4f2"
			}
		]
	},
	{
		id: "tee",
		colourways: [
			{
				id: "white",
				primary: "#f2f2ee",
				secondary: "#3d5a80",
				accent: "#2b2b33",
				inner: "#f2f2ee",
				shoes: "#f4f4f2"
			},
			{
				id: "black",
				primary: "#1c1c20",
				secondary: "#2b2f38",
				accent: "#f2f2ee",
				inner: "#1c1c20",
				shoes: "#f4f4f2"
			},
			{
				id: "green",
				primary: "#3f9d5a",
				secondary: "#2b4a8b",
				accent: "#f2c14e",
				inner: "#3f9d5a",
				shoes: "#f2f2ee"
			},
			{
				id: "coral",
				primary: "#e5674f",
				secondary: "#2b2f38",
				accent: "#f2f2ee",
				inner: "#e5674f",
				shoes: "#f4f4f2"
			}
		]
	}
];
const OUTFIT_IDS = [
	"tee",
	"hoodie",
	"suit",
	"leather",
	"vest",
	"turtleneck",
	"blazer",
	"quarterzip"
];
const EYEWEAR = [
	"none",
	"glasses",
	"shades"
];
const SKIN_TONES = [
	"#f6d3b8",
	"#f1c4a0",
	"#e9b48e",
	"#d8a37c",
	"#c68a62",
	"#a8704c",
	"#8a5a3c",
	"#6b4430"
];
var HAIR_COLOURS = [
	"#2a1d15",
	"#3b2a20",
	"#6b4226",
	"#9e5d47",
	"#d9b36c",
	"#c9c9c9",
	"#1d1d24"
];
var SHIRT_COLOURS = [
	"#6fbf5a",
	"#3f7fd6",
	"#e5674f",
	"#f2c14e",
	"#8a63d2",
	"#2fb3a6",
	"#ef8fb3",
	"#2b2b33"
];
var PANTS_COLOURS = [
	"#2f4a7a",
	"#3b3f4a",
	"#23304f",
	"#5a4636",
	"#46505e"
];
var DEFAULT_SHOES = "#f4f4f2";
var HAIR_STYLE_WHEEL = [
	"short",
	"short",
	"short",
	"spiky",
	"spiky",
	"bun",
	"curly",
	"curly",
	"long",
	"long",
	"beanie",
	"cap",
	"cap",
	"bald"
];
function hashString(value) {
	let h = 2166136261;
	for (let i = 0; i < value.length; i += 1) {
		h ^= value.charCodeAt(i);
		h = Math.imul(h, 16777619) >>> 0;
	}
	return h >>> 0;
}
function pick(list, hash, salt) {
	return list[(Math.imul(hash ^ salt, 2654435761) >>> 0) % list.length];
}
function parseHex(hex) {
	const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
	if (!m) return null;
	const n = parseInt(m[1], 16);
	return [
		n >> 16 & 255,
		n >> 8 & 255,
		n & 255
	];
}
function validColour(value) {
	return value && parseHex(value) ? value : null;
}
function isNaturalSkin(hex) {
	const rgb = parseHex(hex);
	if (!rgb) return false;
	const [r, g, b] = rgb.map((c) => c / 255);
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const l = (max + min) / 2;
	if (max === min) return false;
	const d = max - min;
	const s = l > .5 ? d / (2 - max - min) : d / (max + min);
	let h = 0;
	if (max === r) h = (g - b) / d % 6;
	else if (max === g) h = (b - r) / d + 2;
	else h = (r - g) / d + 4;
	h *= 60;
	if (h < 0) h += 360;
	return h >= 8 && h <= 48 && s >= .15 && s <= .85 && l >= .2 && l <= .9;
}
function luminance(hex) {
	const rgb = parseHex(hex) ?? [
		200,
		160,
		130
	];
	return (.299 * rgb[0] + .587 * rgb[1] + .114 * rgb[2]) / 255;
}
function naturalSkinFor(hex) {
	const target = luminance(hex);
	let best = SKIN_TONES[0];
	let bestDist = Infinity;
	for (const tone of SKIN_TONES) {
		const dist = Math.abs(luminance(tone) - target);
		if (dist < bestDist) {
			best = tone;
			bestDist = dist;
		}
	}
	return best;
}
const HAIR_STYLES = [
	"short",
	"slick",
	"sidepart",
	"buzz",
	"spiky",
	"curly",
	"long",
	"ponytail",
	"bun",
	"beanie",
	"cap",
	"bald"
];
function chosenHair(recipe) {
	const value = recipe?.hairStyle;
	return typeof value === "string" && HAIR_STYLES.includes(value) ? value : null;
}
function chosenOutfit(recipe) {
	const value = recipe?.outfit;
	return typeof value === "string" && OUTFIT_IDS.includes(value) ? value : null;
}
var OFFICE_OUTFIT_WHEEL = [
	"suit",
	"suit",
	"blazer",
	"blazer",
	"vest",
	"vest",
	"quarterzip",
	"quarterzip",
	"turtleneck",
	"leather",
	"hoodie",
	"tee"
];
function officeLook(seed) {
	const outfit = pick(OFFICE_OUTFIT_WHEEL, seed, 94);
	const ways = OUTFITS.find((o) => o.id === outfit).colourways;
	return {
		outfit,
		way: pick(ways, seed, 111)
	};
}
function chosenEyewear(recipe) {
	const value = recipe?.eyewear;
	return typeof value === "string" && EYEWEAR.includes(value) ? value : "none";
}
var DEFAULT_INNER = "#f2f2ee";
function toyLookFor(recipe, identity) {
	const hash = hashString(identity || "toy");
	const palette = recipe?.palette ?? {};
	const rawSkin = validColour(palette.skin);
	const skin = rawSkin ? isNaturalSkin(rawSkin) ? rawSkin : naturalSkinFor(rawSkin) : pick(SKIN_TONES, hash, 81);
	const seed = recipe ? hashString(recipeKey({
		...recipe,
		hairStyle: void 0,
		outfit: void 0,
		inner: void 0,
		eyewear: void 0
	})) : hash;
	const explicit = chosenOutfit(recipe);
	const office = explicit ? null : officeLook(seed);
	return {
		skin,
		hair: validColour(palette.hair) ?? pick(HAIR_COLOURS, hash, 122),
		hairStyle: chosenHair(recipe) ?? pick(HAIR_STYLE_WHEEL, seed, 60),
		shirt: office?.way.primary ?? validColour(palette.primary) ?? pick(SHIRT_COLOURS, hash, 25),
		shirtAccent: office?.way.accent ?? validColour(palette.accent) ?? pick(SHIRT_COLOURS, hash, 45),
		pants: office?.way.secondary ?? validColour(palette.secondary) ?? pick(PANTS_COLOURS, hash, 68),
		inner: office?.way.inner ?? validColour(recipe?.inner) ?? DEFAULT_INNER,
		shoes: office?.way.shoes ?? validColour(palette.shoes) ?? DEFAULT_SHOES,
		blush: (hash & 3) !== 0,
		outfit: explicit ?? office.outfit,
		eyewear: chosenEyewear(recipe)
	};
}
const TOY_HEIGHT = 1.3;
const TOY = {
	pelvis: {
		w: .3,
		h: .14,
		d: .2
	},
	hipUp: .06,
	hipX: .085,
	thigh: .18,
	shin: .14,
	sole: .06,
	heel: .06,
	toe: .12,
	legRadius: .062,
	torso: {
		w: .34,
		h: .28,
		d: .22
	},
	neckY: .3,
	shoulderX: .2,
	shoulderY: .225,
	upperArm: .14,
	foreArm: .13,
	armRadius: .054,
	handRadius: .056,
	head: {
		rx: .31,
		ry: .29,
		rz: .25,
		y: .3
	},
	hairBack: .035
};
const TOY_LEG = TOY.thigh + TOY.shin + TOY.sole;
const SEAT_HEIGHT = {
	chair: .52,
	couch: .56,
	beanbag: .42,
	meeting: .5
};
const KEYBOARD = {
	y: .78,
	z: .38
};
function createPose() {
	return {
		hipY: TOY_LEG - TOY.hipUp,
		hipZ: 0,
		bob: 0,
		torsoPitch: 0,
		torsoYaw: 0,
		torsoRoll: 0,
		headPitch: 0,
		headYaw: 0,
		headRoll: 0,
		leftShoulder: [
			0,
			0,
			.1
		],
		rightShoulder: [
			0,
			0,
			-.1
		],
		leftElbow: 0,
		rightElbow: 0,
		leftHip: 0,
		rightHip: 0,
		leftKnee: 0,
		rightKnee: 0,
		leftAnkle: 0,
		rightAnkle: 0
	};
}
var SCALAR_KEYS = [
	"hipY",
	"hipZ",
	"bob",
	"torsoPitch",
	"torsoYaw",
	"torsoRoll",
	"headPitch",
	"headYaw",
	"headRoll",
	"leftElbow",
	"rightElbow",
	"leftHip",
	"rightHip",
	"leftKnee",
	"rightKnee",
	"leftAnkle",
	"rightAnkle"
];
function copyPose(src, out) {
	for (const key of SCALAR_KEYS) out[key] = src[key];
	for (let i = 0; i < 3; i += 1) {
		out.leftShoulder[i] = src.leftShoulder[i];
		out.rightShoulder[i] = src.rightShoulder[i];
	}
	return out;
}
function blendPose(a, b, k, out = createPose()) {
	const j = 1 - k;
	for (const key of SCALAR_KEYS) out[key] = a[key] * j + b[key] * k;
	for (let i = 0; i < 3; i += 1) {
		out.leftShoulder[i] = a.leftShoulder[i] * j + b.leftShoulder[i] * k;
		out.rightShoulder[i] = a.rightShoulder[i] * j + b.rightShoulder[i] * k;
	}
	return out;
}
var TAU = Math.PI * 2;
var clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
var smooth = (e0, e1, v) => {
	const x = clamp((v - e0) / (e1 - e0), 0, 1);
	return x * x * (3 - 2 * x);
};
function walkCadence(speed) {
	const s = Math.max(0, speed);
	return clamp(s / (.45 + .1 * Math.min(s, 5)), 1.2, 4.6);
}
function soleDrop(hip, knee, ankle) {
	const a1 = hip;
	const a2 = hip + knee;
	const a3 = a2 + ankle;
	const ankleY = -TOY.thigh * Math.cos(a1) - TOY.shin * Math.cos(a2);
	const c = Math.cos(a3);
	const s = Math.sin(a3);
	const heelY = ankleY - TOY.sole * c + TOY.heel * s;
	const toeY = ankleY - TOY.sole * c - TOY.toe * s;
	return Math.min(heelY, toeY);
}
function ground(p) {
	p.hipY = -Math.min(soleDrop(p.leftHip, p.leftKnee, p.leftAnkle), soleDrop(p.rightHip, p.rightKnee, p.rightAnkle)) - TOY.hipUp;
}
function standBase(p) {
	p.hipZ = 0;
	p.bob = 0;
	p.torsoPitch = 0;
	p.torsoYaw = 0;
	p.torsoRoll = 0;
	p.headPitch = 0;
	p.headYaw = 0;
	p.headRoll = 0;
	p.leftShoulder[0] = .05;
	p.leftShoulder[1] = 0;
	p.leftShoulder[2] = .1;
	p.rightShoulder[0] = .05;
	p.rightShoulder[1] = 0;
	p.rightShoulder[2] = -.1;
	p.leftElbow = -.15;
	p.rightElbow = -.15;
	p.leftHip = 0;
	p.rightHip = 0;
	p.leftKnee = 0;
	p.rightKnee = 0;
	p.leftAnkle = 0;
	p.rightAnkle = 0;
}
function seatBase(p, seatHeight) {
	standBase(p);
	p.hipY = seatHeight;
	p.hipZ = .05;
	p.torsoPitch = .14;
	p.leftHip = -Math.PI / 2 + .04;
	p.rightHip = -Math.PI / 2 + .04;
	p.leftKnee = Math.PI / 2 - .04;
	p.rightKnee = Math.PI / 2 - .04;
	p.leftShoulder[0] = -.55;
	p.leftShoulder[2] = .12;
	p.rightShoulder[0] = -.55;
	p.rightShoulder[2] = -.12;
	p.leftElbow = -.75;
	p.rightElbow = -.75;
}
var REACH = {
	shoulder: 0,
	elbow: 0
};
function reach(dy, dz) {
	const l1 = TOY.upperArm;
	const l2 = TOY.foreArm;
	const d = clamp(Math.hypot(dy, dz), Math.abs(l1 - l2) + .001, l1 + l2 - 1e-4);
	const toward = Math.atan2(-dz, -dy);
	const atShoulder = Math.acos(clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1));
	const atElbow = Math.acos(clamp((l1 * l1 + l2 * l2 - d * d) / (2 * l1 * l2), -1, 1));
	REACH.shoulder = toward + atShoulder;
	REACH.elbow = -(Math.PI - atElbow);
	return REACH;
}
var TYPE_ROLL = .1;
var TYPE_ROLL_COS = Math.cos(TYPE_ROLL);
function typeAt(p, t) {
	const cos = Math.cos(p.torsoPitch);
	const sin = Math.sin(p.torsoPitch);
	const shoulderY = p.hipY + TOY.hipUp + p.bob + TOY.shoulderY * cos;
	const shoulderZ = p.hipZ + TOY.shoulderY * sin;
	for (let side = 0; side < 2; side += 1) {
		const tap = .012 * Math.max(0, Math.sin(t * TAU * 3.1 + side * 2.1));
		const wy = KEYBOARD.y + .045 + tap - shoulderY;
		const wz = KEYBOARD.z - shoulderZ + .004 * Math.sin(t * TAU * 1.3 + side);
		const r = reach((wy * cos + wz * sin) / TYPE_ROLL_COS, -wy * sin + wz * cos);
		if (side === 0) {
			p.leftShoulder[0] = r.shoulder;
			p.leftShoulder[2] = -TYPE_ROLL;
			p.leftElbow = r.elbow;
		} else {
			p.rightShoulder[0] = r.shoulder;
			p.rightShoulder[2] = TYPE_ROLL;
			p.rightElbow = r.elbow;
		}
	}
}
function poseFor(mode, t, speed, opts, out = createPose()) {
	const p = out;
	const breathe = Math.sin(t * TAU * .28);
	switch (mode) {
		case "walk": {
			standBase(p);
			const s = Math.max(0, speed);
			const phase = (opts.phase ?? t * walkCadence(s)) * TAU;
			const move = smooth(0, .35, s);
			const run = smooth(2.6, 3.6, s);
			const swing = move * (.32 + .1 * Math.min(s, 3) + .2 * run);
			const sL = Math.sin(phase);
			const sR = -sL;
			p.leftHip = -swing * sL;
			p.rightHip = -swing * sR;
			const liftL = Math.max(0, Math.cos(phase));
			const liftR = Math.max(0, -Math.cos(phase));
			const kneeAmp = move * (.55 + .5 * run);
			p.leftKnee = .08 * move + kneeAmp * liftL;
			p.rightKnee = .08 * move + kneeAmp * liftR;
			p.leftAnkle = -(p.leftHip + p.leftKnee) * .75;
			p.rightAnkle = -(p.rightHip + p.rightKnee) * .75;
			const armSwing = move * (.35 + .35 * run);
			p.leftShoulder[0] = armSwing * sL;
			p.rightShoulder[0] = armSwing * sR;
			p.leftElbow = -.25 - 1 * run;
			p.rightElbow = -.25 - 1 * run;
			p.torsoPitch = move * (.05 + .02 * Math.min(s, 3)) + .16 * run;
			p.torsoYaw = .08 * move * sL;
			p.headPitch = -.6 * p.torsoPitch * run;
			p.bob = move * (.012 + .012 * run) * Math.abs(Math.cos(phase));
			ground(p);
			return p;
		}
		case "sit":
			seatBase(p, opts.seatHeight);
			p.bob = .004 * breathe;
			p.headYaw = .18 * Math.sin(t * .37);
			p.headPitch = .04 + .03 * Math.sin(t * .23);
			return p;
		case "work":
			seatBase(p, opts.seatHeight);
			p.hipZ = .08;
			p.torsoPitch = .3;
			p.bob = .003 * breathe;
			p.headPitch = -.14 + .02 * Math.sin(t * .5);
			p.headYaw = .05 * Math.sin(t * .31);
			typeAt(p, t);
			return p;
		case "sleep":
			seatBase(p, opts.seatHeight);
			p.torsoPitch = .26 + .012 * Math.sin(t * TAU * .2);
			p.torsoRoll = .08;
			p.headPitch = .42 + .03 * Math.sin(t * TAU * .2);
			p.headRoll = .3;
			p.leftShoulder[0] = -.3;
			p.rightShoulder[0] = -.3;
			p.leftElbow = -.6;
			p.rightElbow = -.6;
			p.leftHip += .05;
			p.rightHip += .08;
			p.leftShoulder[2] = .14;
			p.rightShoulder[2] = -.14;
			return p;
		case "wave":
			standBase(p);
			p.bob = .004 * breathe;
			p.rightShoulder[0] = -.25;
			p.rightShoulder[2] = -2.45 + .28 * Math.sin(t * TAU * 2.2);
			p.rightElbow = -.35;
			p.torsoRoll = .04;
			p.headRoll = -.08;
			p.headPitch = -.05;
			ground(p);
			return p;
		case "talk":
			standBase(p);
			p.bob = .004 * breathe;
			p.headPitch = .07 * Math.sin(t * TAU * 1.6) - .02;
			p.headYaw = .12 * Math.sin(t * .8);
			p.torsoYaw = .05 * Math.sin(t * .6);
			p.rightShoulder[0] = -.45 + .15 * Math.sin(t * TAU * .9);
			p.rightElbow = -1.1 + .3 * Math.sin(t * TAU * 1.3);
			p.leftShoulder[0] = -.2 + .1 * Math.sin(t * TAU * .7 + 1.2);
			p.leftElbow = -.7 + .2 * Math.sin(t * TAU * 1.1 + .5);
			ground(p);
			return p;
		case "celebrate": {
			standBase(p);
			const hop = Math.sin(t * TAU * 1.6);
			const air = Math.max(0, hop);
			const crouch = Math.max(0, -hop);
			p.leftHip = -.35 * crouch;
			p.rightHip = -.35 * crouch;
			p.leftKnee = .7 * crouch;
			p.rightKnee = .7 * crouch;
			p.leftAnkle = -.35 * crouch;
			p.rightAnkle = -.35 * crouch;
			p.leftShoulder[0] = -.2;
			p.rightShoulder[0] = -.2;
			p.leftShoulder[2] = 2.6 + .2 * Math.sin(t * TAU * 3.2);
			p.rightShoulder[2] = -2.6 - .2 * Math.sin(t * TAU * 3.2 + 1);
			p.leftElbow = -.2;
			p.rightElbow = -.2;
			p.headPitch = -.15;
			ground(p);
			p.hipY += .11 * air;
			return p;
		}
		case "idle":
		default:
			standBase(p);
			p.bob = .005 * breathe;
			p.torsoRoll = .025 * Math.sin(t * TAU * .18);
			p.headRoll = -.5 * p.torsoRoll;
			p.headYaw = .25 * Math.sin(t * .29) * Math.sin(t * .11);
			p.leftShoulder[0] = .04 * breathe;
			p.rightShoulder[0] = .04 * breathe;
			p.leftHip = -.02;
			p.rightHip = .02;
			ground(p);
			return p;
	}
}
export { TOY as a, copyPose as c, poseFor as d, toyLookFor as f, SKIN_TONES as i, createPose as l, OUTFITS as m, HAIR_STYLES as n, TOY_HEIGHT as o, walkCadence as p, SEAT_HEIGHT as r, blendPose as s, EYEWEAR as t, hashString as u };
