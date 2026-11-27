import { Bc as require_jsx_runtime, Xc as require_react, tl as __toESM } from "./index-BOzhgzD7.js";
import { D as CapsuleGeometry, Da as Vector3, I as ConeGeometry, N as Color, Rn as MeshStandardMaterial, Wi as SphereGeometry, X as CylinderGeometry, ca as TorusGeometry, jn as MeshBasicMaterial, x as BoxGeometry } from "./three.module-CsntsSp5.js";
import { a as useFrame } from "./react-three-fiber.esm-Dp0xg4g-.js";
import { a as TOY, c as copyPose, d as poseFor, l as createPose, o as TOY_HEIGHT, p as walkCadence, s as blendPose } from "./toyFigureModel-CWYjWDfN.js";
var tempNormal = /* @__PURE__ */ new Vector3();
function getUv(faceDirVector, normal, uvAxis, projectionAxis, radius, sideLength) {
	const totArcLength = 2 * Math.PI * radius / 4;
	const centerLength = Math.max(sideLength - 2 * radius, 0);
	const halfArc = Math.PI / 4;
	tempNormal.copy(normal);
	tempNormal[projectionAxis] = 0;
	tempNormal.normalize();
	const arcUvRatio = .5 * totArcLength / (totArcLength + centerLength);
	const arcAngleRatio = 1 - tempNormal.angleTo(faceDirVector) / halfArc;
	if (Math.sign(tempNormal[uvAxis]) === 1) return arcAngleRatio * arcUvRatio;
	else return centerLength / (totArcLength + centerLength) + arcUvRatio + arcUvRatio * (1 - arcAngleRatio);
}
var RoundedBoxGeometry = class extends BoxGeometry {
	constructor(width = 1, height = 1, depth = 1, segments = 2, radius = .1) {
		segments = segments * 2 + 1;
		radius = Math.min(width / 2, height / 2, depth / 2, radius);
		super(1, 1, 1, segments, segments, segments);
		if (segments === 1) return;
		const geometry2 = this.toNonIndexed();
		this.index = null;
		this.attributes.position = geometry2.attributes.position;
		this.attributes.normal = geometry2.attributes.normal;
		this.attributes.uv = geometry2.attributes.uv;
		const position = new Vector3();
		const normal = new Vector3();
		const box = new Vector3(width, height, depth).divideScalar(2).subScalar(radius);
		const positions = this.attributes.position.array;
		const normals = this.attributes.normal.array;
		const uvs = this.attributes.uv.array;
		const faceTris = positions.length / 6;
		const faceDirVector = new Vector3();
		const halfSegmentSize = .5 / segments;
		for (let i = 0, j = 0; i < positions.length; i += 3, j += 2) {
			position.fromArray(positions, i);
			normal.copy(position);
			normal.x -= Math.sign(normal.x) * halfSegmentSize;
			normal.y -= Math.sign(normal.y) * halfSegmentSize;
			normal.z -= Math.sign(normal.z) * halfSegmentSize;
			normal.normalize();
			positions[i + 0] = box.x * Math.sign(position.x) + normal.x * radius;
			positions[i + 1] = box.y * Math.sign(position.y) + normal.y * radius;
			positions[i + 2] = box.z * Math.sign(position.z) + normal.z * radius;
			normals[i + 0] = normal.x;
			normals[i + 1] = normal.y;
			normals[i + 2] = normal.z;
			switch (Math.floor(i / faceTris)) {
				case 0:
					faceDirVector.set(1, 0, 0);
					uvs[j + 0] = getUv(faceDirVector, normal, "z", "y", radius, depth);
					uvs[j + 1] = 1 - getUv(faceDirVector, normal, "y", "z", radius, height);
					break;
				case 1:
					faceDirVector.set(-1, 0, 0);
					uvs[j + 0] = 1 - getUv(faceDirVector, normal, "z", "y", radius, depth);
					uvs[j + 1] = 1 - getUv(faceDirVector, normal, "y", "z", radius, height);
					break;
				case 2:
					faceDirVector.set(0, 1, 0);
					uvs[j + 0] = 1 - getUv(faceDirVector, normal, "x", "z", radius, width);
					uvs[j + 1] = getUv(faceDirVector, normal, "z", "x", radius, depth);
					break;
				case 3:
					faceDirVector.set(0, -1, 0);
					uvs[j + 0] = 1 - getUv(faceDirVector, normal, "x", "z", radius, width);
					uvs[j + 1] = 1 - getUv(faceDirVector, normal, "z", "x", radius, depth);
					break;
				case 4:
					faceDirVector.set(0, 0, 1);
					uvs[j + 0] = 1 - getUv(faceDirVector, normal, "x", "y", radius, width);
					uvs[j + 1] = 1 - getUv(faceDirVector, normal, "y", "x", radius, height);
					break;
				case 5:
					faceDirVector.set(0, 0, -1);
					uvs[j + 0] = getUv(faceDirVector, normal, "x", "y", radius, width);
					uvs[j + 1] = 1 - getUv(faceDirVector, normal, "y", "x", radius, height);
					break;
			}
		}
	}
};
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var HD = TOY.head;
var FORE_RADIUS = TOY.armRadius - .006;
var GEO = {
	sphere: new SphereGeometry(1, 40, 28),
	lowSphere: new SphereGeometry(1, 16, 12),
	dome: new SphereGeometry(1, 40, 18, 0, Math.PI * 2, 0, Math.PI * .56),
	pelvis: new RoundedBoxGeometry(TOY.pelvis.w, TOY.pelvis.h, TOY.pelvis.d, 3, .05),
	chest: new RoundedBoxGeometry(TOY.torso.w, TOY.torso.h - .02, TOY.torso.d, 3, .08),
	thigh: new CapsuleGeometry(TOY.legRadius, .12, 4, 10),
	shin: new CapsuleGeometry(.056, .1, 4, 10),
	upperArm: new CapsuleGeometry(TOY.armRadius, TOY.upperArm - .04, 6, 16),
	foreArm: new CapsuleGeometry(FORE_RADIUS, TOY.foreArm - .05, 6, 16),
	sleeve: new CylinderGeometry(TOY.armRadius + .011, TOY.armRadius + .016, .075, 24),
	cuff: new CylinderGeometry(FORE_RADIUS + .007, FORE_RADIUS + .007, .024, 24),
	shoe: new RoundedBoxGeometry(.13, .075, TOY.heel + TOY.toe + .01, 3, .034),
	sole: new RoundedBoxGeometry(.136, .022, TOY.heel + TOY.toe + .018, 2, .01),
	smile: new TorusGeometry(.042, .009, 6, 14, Math.PI),
	spike: new ConeGeometry(.065, .16, 6),
	brim: new RoundedBoxGeometry(.3, .022, .17, 2, .01),
	hairBand: new SphereGeometry(1, 40, 14, Math.PI * .92, Math.PI * 1.16, Math.PI * .46, Math.PI * .3),
	wedge: new ConeGeometry(1, 1, 3, 1, false, Math.PI),
	box: new BoxGeometry(1, 1, 1),
	collar: new CylinderGeometry(.085, .097, 1, 24),
	pocket: new RoundedBoxGeometry(.2, .07, .02, 2, .01),
	lens: new TorusGeometry(.047, .008, 8, 24)
};
var materials = /* @__PURE__ */ new Map();
function matte(color, roughness = .82, metalness = 0) {
	const key = `${color}|${roughness}|${metalness}`;
	let m = materials.get(key);
	if (!m) {
		m = new MeshStandardMaterial({
			color,
			roughness,
			metalness
		});
		materials.set(key, m);
	}
	return m;
}
var EYE = new MeshStandardMaterial({
	color: "#16161b",
	roughness: .35,
	metalness: 0
});
var CATCHLIGHT = new MeshBasicMaterial({ color: "#ffffff" });
var MOUTH = matte("#5b2b28", .7);
var SOLE_LIGHT = "#f4f4f2";
var METAL = matte("#c7c9cc", .3, .8);
var FRAME = matte("#1a1a1e", .4);
var SHADES = matte("#101014", .15, .2);
function mix(a, b, k) {
	return `#${new Color(a).lerp(new Color(b), k).getHexString()}`;
}
function isLight(hex) {
	const c = new Color(hex);
	return .299 * c.r + .587 * c.g + .114 * c.b > .6;
}
function faceZ(x, y, inset = 0) {
	const u = x / HD.rx;
	const v = (y - HD.y) / HD.ry;
	return HD.rz * Math.sqrt(Math.max(0, 1 - u * u - v * v)) - inset;
}
function Face({ look }) {
	const skin = matte(look.skin);
	const blush = matte(mix(look.skin, "#ff6f7d", .38));
	const brow = matte(look.hairStyle === "bald" ? mix(look.skin, "#2a1a12", .55) : mix(look.hair, "#1a1210", .35));
	const eyeY = HD.y - .03;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		[-1, 1].map((sx) => {
			const x = sx * .1;
			const z = faceZ(x, eyeY, .012);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.sphere,
				material: EYE,
				position: [
					x,
					eyeY,
					z
				],
				rotation: [
					0,
					sx * .4,
					0
				],
				scale: [
					.034,
					.043,
					.02
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.lowSphere,
				material: CATCHLIGHT,
				position: [
					x + .011,
					eyeY + .014,
					z + .017
				],
				scale: .009
			})] }, sx);
		}),
		[-1, 1].map((sx) => {
			const x = sx * .1;
			const y = eyeY + .056;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.sphere,
				material: brow,
				position: [
					x,
					y,
					faceZ(x, y, .006)
				],
				rotation: [
					0,
					sx * .4,
					sx * -.12
				],
				scale: [
					.036,
					.0095,
					.012
				]
			}, `w${sx}`);
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: GEO.sphere,
			material: skin,
			position: [
				0,
				HD.y - .085,
				faceZ(0, HD.y - .085, .006)
			],
			scale: [
				.026,
				.021,
				.02
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: GEO.smile,
			material: MOUTH,
			position: [
				0,
				HD.y - .115,
				faceZ(0, HD.y - .115, .004)
			],
			rotation: [
				-.25,
				0,
				Math.PI
			]
		}),
		look.blush && [-1, 1].map((sx) => {
			const x = sx * .145;
			const y = HD.y - .085;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.sphere,
				material: blush,
				position: [
					x,
					y,
					faceZ(x, y, .008)
				],
				rotation: [
					0,
					sx * .5,
					0
				],
				scale: [
					.04,
					.024,
					.012
				]
			}, `b${sx}`);
		}),
		[-1, 1].map((sx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: GEO.sphere,
			material: skin,
			position: [
				sx * (HD.rx - .012),
				HD.y - .02,
				-.01
			],
			scale: [
				.03,
				.058,
				.045
			],
			castShadow: true
		}, `e${sx}`))
	] });
}
var FRINGE = [
	[
		-.2,
		.075,
		-.55
	],
	[
		-.105,
		.098,
		-.25
	],
	[
		0,
		.105,
		0
	],
	[
		.105,
		.098,
		.25
	],
	[
		.2,
		.075,
		.55
	]
];
function HairCap({ color, grow = 0, fringe = true }) {
	const material = matte(color);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: GEO.dome,
			material,
			position: [
				0,
				HD.y + .01,
				-.005
			],
			rotation: [
				-.5,
				0,
				0
			],
			scale: [
				HD.rx + .018 + grow,
				HD.ry + .03 + grow,
				HD.rz + .03 + grow
			],
			castShadow: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: GEO.hairBand,
			material,
			position: [
				0,
				HD.y - .005,
				-.004
			],
			scale: [
				HD.rx + .009 + grow,
				HD.ry + .008 + grow,
				HD.rz + .012 + grow
			],
			castShadow: true
		}),
		fringe && FRINGE.map(([x, dy, rz], i) => {
			const y = HD.y + dy;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.sphere,
				material,
				position: [
					x,
					y,
					faceZ(x, y, .012)
				],
				rotation: [
					.35,
					0,
					rz
				],
				scale: [
					.085,
					.05,
					.036
				],
				castShadow: true
			}, i);
		})
	] });
}
var SPIKES = [
	[
		0,
		.6,
		.1,
		.75,
		0
	],
	[
		-.12,
		.6,
		.04,
		.35,
		.45
	],
	[
		.12,
		.6,
		.04,
		.35,
		-.45
	],
	[
		0,
		.62,
		-.05,
		-.2,
		0
	],
	[
		-.21,
		.52,
		-.04,
		-.1,
		.95
	],
	[
		.21,
		.52,
		-.04,
		-.1,
		-.95
	],
	[
		-.09,
		.57,
		-.13,
		-.6,
		.35
	],
	[
		.09,
		.57,
		-.13,
		-.6,
		-.35
	]
];
var CURLS = (() => {
	const out = [[
		0,
		1,
		0
	]];
	for (const [theta, count, offset] of [[
		.5,
		6,
		0
	], [
		1,
		8,
		.4
	]]) for (let i = 0; i < count; i += 1) {
		const phi = offset + i / count * Math.PI * 2;
		const x = Math.sin(theta) * Math.sin(phi);
		const z = Math.sin(theta) * Math.cos(phi);
		if (z > .55 && theta > .8) continue;
		out.push([
			x,
			Math.cos(theta),
			z
		]);
	}
	return out;
})();
function HairUnderHat({ color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: GEO.hairBand,
		material: matte(color),
		position: [
			0,
			HD.y - .005,
			-.004
		],
		scale: [
			HD.rx + .016,
			HD.ry + .014,
			HD.rz + .016
		],
		castShadow: true
	});
}
function Hair({ style, look }) {
	const hair = matte(look.hair);
	switch (style) {
		case "bald": return null;
		case "short": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HairCap, { color: look.hair });
		case "spiky": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HairCap, { color: look.hair }), SPIKES.map(([x, y, z, rx, rz], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: GEO.spike,
			material: hair,
			position: [
				x,
				y,
				z
			],
			rotation: [
				rx,
				0,
				rz
			],
			castShadow: true
		}, i))] });
		case "bun": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HairCap, { color: look.hair }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: GEO.sphere,
			material: hair,
			position: [
				0,
				HD.y + HD.ry + .02,
				-.1
			],
			scale: .1,
			castShadow: true
		})] });
		case "curly": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HairCap, {
			color: look.hair,
			grow: .01
		}), CURLS.map(([x, y, z], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: GEO.lowSphere,
			material: hair,
			castShadow: true,
			position: [
				x * HD.rx * .92,
				HD.y + y * HD.ry * .92 + .02,
				z * HD.rz * .72
			],
			scale: .085
		}, i))] });
		case "long": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HairCap, { color: look.hair }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.sphere,
				material: hair,
				position: [
					0,
					HD.y - .1,
					-.15
				],
				scale: [
					.29,
					.3,
					.125
				],
				castShadow: true
			}),
			[-1, 1].map((sx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.sphere,
				material: hair,
				position: [
					sx * .285,
					HD.y - .1,
					-.03
				],
				scale: [
					.07,
					.19,
					.1
				],
				castShadow: true
			}, sx))
		] });
		case "slick": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HairCap, {
			color: look.hair,
			fringe: false
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: GEO.sphere,
			material: matte(look.hair, .45),
			position: [
				0,
				HD.y + HD.ry - .075,
				.12
			],
			rotation: [
				-.75,
				0,
				0
			],
			scale: [
				.19,
				.06,
				.11
			],
			castShadow: true
		})] });
		case "sidepart": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HairCap, {
			color: look.hair,
			fringe: false
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: GEO.sphere,
			material: hair,
			position: [
				-.04,
				HD.y + .2,
				faceZ(-.04, HD.y + .2, .04)
			],
			rotation: [
				.55,
				0,
				.22
			],
			scale: [
				.22,
				.07,
				.08
			],
			castShadow: true
		})] });
		case "buzz": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HairCap, {
			color: mix(look.hair, look.skin, .3),
			grow: -.014,
			fringe: false
		});
		case "ponytail": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HairCap, { color: look.hair }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.lowSphere,
				material: matte(look.shirtAccent),
				position: [
					0,
					HD.y + .06,
					-(HD.rz + .025)
				],
				scale: .035
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.sphere,
				material: hair,
				position: [
					0,
					HD.y - .08,
					-(HD.rz + .035)
				],
				rotation: [
					.18,
					0,
					0
				],
				scale: [
					.06,
					.15,
					.055
				],
				castShadow: true
			})
		] });
		case "beanie": {
			const knit = matte(look.shirtAccent, .95);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HairUnderHat, { color: look.hair }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: GEO.dome,
					material: knit,
					position: [
						0,
						HD.y + .01,
						0
					],
					rotation: [
						-.15,
						0,
						0
					],
					scale: [
						HD.rx + .025,
						HD.ry + .045,
						HD.rz + .028
					],
					castShadow: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: GEO.lowSphere,
					material: knit,
					position: [
						0,
						HD.y + HD.ry + .07,
						-.03
					],
					scale: .06,
					castShadow: true
				}),
				[-1, 1].map((sx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: GEO.lowSphere,
					material: hair,
					position: [
						sx * .27,
						HD.y - .02,
						.06
					],
					scale: [
						.05,
						.07,
						.06
					]
				}, sx))
			] });
		}
		case "cap": {
			const cap = matte(look.shirtAccent, .7);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HairUnderHat, { color: look.hair }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: GEO.dome,
					material: cap,
					position: [
						0,
						HD.y + .03,
						0
					],
					rotation: [
						-.12,
						0,
						0
					],
					scale: [
						HD.rx + .045,
						HD.ry + 0,
						HD.rz + .05
					],
					castShadow: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: GEO.brim,
					material: cap,
					position: [
						0,
						HD.y + .07,
						HD.rz + .06
					],
					rotation: [
						.14,
						0,
						0
					],
					castShadow: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: GEO.lowSphere,
					material: cap,
					position: [
						0,
						HD.y + HD.ry + .01,
						-.02
					],
					scale: .022
				})
			] });
		}
	}
}
var DRESS_SHOES = new Set([
	"suit",
	"blazer",
	"leather"
]);
var CUFFED = new Set(["suit", "blazer"]);
function garment(look, color) {
	if (look.uniform) return matte(color, .78);
	if (look.outfit === "leather" && color === look.shirt) return matte(color, .32, .12);
	if (look.outfit === "quarterzip" || look.outfit === "turtleneck" || look.outfit === "hoodie") return matte(color, .95);
	return matte(color);
}
var FRONT = TOY.torso.d / 2;
function VOpening({ look, width, depth, lapel, tie, bow = false, lapelColour }) {
	const top = .285;
	const angle = Math.atan2(width / 2, depth);
	const edge = Math.hypot(width / 2, depth);
	const shade = lapelColour ? matte(lapelColour, .35) : garment(look, mix(look.shirt, "#000000", look.outfit === "leather" ? .25 : .14));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			0,
			top - depth / 2,
			FRONT - .012
		],
		rotation: [
			-.22,
			0,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.wedge,
				material: matte(look.inner),
				rotation: [
					0,
					0,
					Math.PI
				],
				scale: [
					width / Math.sqrt(3),
					depth,
					.03
				]
			}),
			[-1, 1].map((sx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.box,
				material: shade,
				castShadow: true,
				position: [
					sx * (width / 4 + lapel * .45),
					0,
					.02
				],
				rotation: [
					0,
					0,
					-sx * angle
				],
				scale: [
					lapel,
					edge + .02,
					.012
				]
			}, sx)),
			bow && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					depth / 2 - .02,
					.024
				],
				children: [[-1, 1].map((sx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: GEO.wedge,
					material: matte(look.shirtAccent, .5),
					position: [
						sx * .018,
						0,
						0
					],
					rotation: [
						0,
						0,
						sx * Math.PI / 2
					],
					scale: [
						.014,
						.03,
						.008
					]
				}, sx)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: GEO.box,
					material: matte(look.shirtAccent, .5),
					scale: [
						.012,
						.014,
						.012
					]
				})]
			}),
			tie && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					0,
					.022
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: GEO.box,
					material: matte(look.shirtAccent, .5),
					position: [
						0,
						depth / 2 - .018,
						0
					],
					scale: [
						.03,
						.024,
						.014
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: GEO.box,
					material: matte(look.shirtAccent, .5),
					position: [
						0,
						-.012,
						0
					],
					scale: [
						.028,
						depth - .05,
						.01
					]
				})]
			})
		]
	});
}
function Buttons({ count, color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: Array.from({ length: count }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: GEO.lowSphere,
		material: matte(color, .4),
		position: [
			0,
			.105 - i * .04,
			FRONT + .004 - i * .006
		],
		scale: [
			.011,
			.011,
			.006
		]
	}, i)) });
}
function OutfitDetails({ look }) {
	const accent = matte(look.shirtAccent);
	const dark = mix(look.shirt, "#000000", .35);
	switch (look.outfit) {
		case "suit": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VOpening, {
				look,
				width: .13,
				depth: .17,
				lapel: .034,
				tie: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Buttons, {
				count: 2,
				color: dark
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.box,
				material: accent,
				position: [
					.09,
					.2,
					FRONT + .002
				],
				scale: [
					.04,
					.014,
					.01
				]
			})
		] });
		case "blazer": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VOpening, {
				look,
				width: .14,
				depth: .16,
				lapel: .034,
				tie: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Buttons, {
				count: 1,
				color: mix(look.shirtAccent, "#000000", .2)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.box,
				material: accent,
				position: [
					.09,
					.2,
					FRONT + .002
				],
				scale: [
					.04,
					.014,
					.01
				]
			})
		] });
		case "leather": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VOpening, {
				look,
				width: .16,
				depth: .17,
				lapel: .05,
				tie: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.box,
				material: METAL,
				position: [
					-.055,
					.075,
					FRONT + .003
				],
				scale: [
					.008,
					.1,
					.008
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.box,
				material: METAL,
				position: [
					.085,
					.11,
					FRONT + .002
				],
				scale: [
					.05,
					.006,
					.008
				]
			})
		] });
		case "vest": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VOpening, {
				look,
				width: .1,
				depth: .09,
				lapel: .022,
				tie: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.box,
				material: METAL,
				position: [
					0,
					.12,
					FRONT + .002
				],
				scale: [
					.007,
					.13,
					.008
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.box,
				material: accent,
				position: [
					.075,
					.2,
					FRONT + .002
				],
				scale: [
					.04,
					.02,
					.008
				]
			})
		] });
		case "turtleneck": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: GEO.collar,
			material: garment(look, look.shirt),
			position: [
				0,
				.29,
				0
			],
			scale: [
				1,
				.075,
				1
			],
			castShadow: true
		});
		case "quarterzip": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.collar,
				material: garment(look, look.shirt),
				position: [
					0,
					.285,
					0
				],
				scale: [
					1.04,
					.055,
					1.04
				],
				castShadow: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.box,
				material: METAL,
				position: [
					0,
					.25,
					FRONT - .01
				],
				rotation: [
					-.45,
					0,
					0
				],
				scale: [
					.008,
					.09,
					.01
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.box,
				material: METAL,
				position: [
					.012,
					.21,
					FRONT + .004
				],
				scale: [
					.012,
					.022,
					.006
				]
			})
		] });
		case "hoodie": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.sphere,
				material: garment(look, look.shirt),
				position: [
					0,
					.275,
					-.07
				],
				scale: [
					.15,
					.065,
					.085
				],
				castShadow: true
			}),
			[-1, 1].map((sx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.box,
				material: accent,
				position: [
					sx * .035,
					.22,
					FRONT - .002
				],
				rotation: [
					-.3,
					0,
					0
				],
				scale: [
					.009,
					.075,
					.009
				]
			}, sx)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.pocket,
				material: garment(look, dark),
				position: [
					0,
					.075,
					FRONT - .006
				]
			})
		] });
		case "tee":
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: GEO.sphere,
			material: accent,
			position: [
				0,
				.16,
				FRONT - .004
			],
			scale: [
				.05,
				.05,
				.012
			]
		});
	}
}
function PocketFlap({ x, y, colour, button }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			x,
			y,
			FRONT + .003
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: GEO.box,
			material: matte(mix(colour, "#000000", .12), .8),
			scale: [
				.07,
				.022,
				.008
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: GEO.lowSphere,
			material: matte(button, .35, .5),
			position: [
				0,
				-.004,
				.006
			],
			scale: [
				.0085,
				.0085,
				.005
			]
		})]
	});
}
function UniformDetails({ look, u }) {
	const metal = matte(u.buttons, .32, .6);
	const pockets = (lower) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [[-1, 1].map((sx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PocketFlap, {
		x: sx * .072,
		y: .15,
		colour: u.coat,
		button: u.buttons
	}, `c${sx}`)), lower && [-1, 1].map((sx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PocketFlap, {
		x: sx * .075,
		y: .07,
		colour: u.coat,
		button: u.buttons
	}, `l${sx}`))] });
	const belt = u.belt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			0,
			.045,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: GEO.box,
			material: matte(u.belt, .6),
			position: [
				0,
				0,
				FRONT + .002
			],
			scale: [
				TOY.torso.w - .02,
				.026,
				.01
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: GEO.box,
			material: metal,
			position: [
				0,
				0,
				FRONT + .008
			],
			scale: [
				.032,
				.03,
				.006
			]
		})]
	});
	switch (u.cut) {
		case "shirt": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VOpening, {
				look,
				width: .07,
				depth: .06,
				lapel: .026,
				tie: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.box,
				material: matte(u.tie, .5),
				position: [
					0,
					.262,
					FRONT + .004
				],
				rotation: [
					-.3,
					0,
					0
				],
				scale: [
					.03,
					.024,
					.014
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.box,
				material: matte(u.tie, .5),
				position: [
					0,
					.17,
					FRONT + .006
				],
				scale: [
					.028,
					.16,
					.008
				]
			}),
			pockets(false),
			belt
		] });
		case "field": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.collar,
				material: garment(look, u.coat),
				position: [
					0,
					.287,
					0
				],
				scale: [
					1.05,
					.06,
					1.05
				],
				castShadow: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.box,
				material: garment(look, mix(u.coat, "#000000", .1)),
				position: [
					.008,
					.15,
					FRONT + .004
				],
				scale: [
					.026,
					.25,
					.008
				]
			}),
			Array.from({ length: 4 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.lowSphere,
				material: metal,
				position: [
					.008,
					.23 - i * .055,
					FRONT + .009
				],
				scale: [
					.007,
					.007,
					.004
				]
			}, i)),
			pockets(true),
			u.tapes && [-1, 1].map((sx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.box,
				material: matte(u.tapes, .9),
				position: [
					sx * .072,
					.185,
					FRONT + .003
				],
				scale: [
					.068,
					.013,
					.006
				]
			}, sx)),
			belt
		] });
		case "service": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VOpening, {
				look,
				width: .13,
				depth: .15,
				lapel: .034,
				tie: true
			}),
			Array.from({ length: 4 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.lowSphere,
				material: metal,
				position: [
					0,
					.125 - i * .032,
					FRONT + .006
				],
				scale: [
					.01,
					.01,
					.006
				]
			}, i)),
			pockets(true),
			[-1, 1].map((sx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.lowSphere,
				material: metal,
				position: [
					sx * .085,
					.255,
					FRONT - .02
				],
				scale: [
					.011,
					.011,
					.005
				]
			}, sx)),
			belt
		] });
		case "mess":
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VOpening, {
				look,
				width: .17,
				depth: .2,
				lapel: .04,
				tie: false,
				bow: true,
				lapelColour: u.lapels
			}),
			[
				0,
				1,
				2
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.lowSphere,
				material: metal,
				position: [
					0,
					.205 - i * .035,
					FRONT + .004
				],
				scale: [
					.007,
					.007,
					.004
				]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.box,
				material: matte("#121318", .5),
				position: [
					0,
					.06,
					FRONT - .002
				],
				scale: [
					.15,
					.05,
					.01
				]
			}),
			[-1, 1].map((sx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.lowSphere,
				material: metal,
				position: [
					sx * .1,
					.1,
					FRONT + .004
				],
				scale: [
					.011,
					.011,
					.006
				]
			}, sx)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.box,
				material: metal,
				position: [
					0,
					.1,
					FRONT + .006
				],
				scale: [
					.19,
					.0035,
					.004
				]
			}),
			u.cuffBraid && [-1, 1].map((sx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.box,
				material: matte(u.cuffBraid, .4, .5),
				position: [
					sx * .088,
					.17,
					FRONT + .004
				],
				rotation: [
					0,
					0,
					sx * -.36
				],
				scale: [
					.005,
					.2,
					.004
				]
			}, `e${sx}`))
		] });
	}
}
function Eyewear({ look }) {
	if (look.eyewear === "none") return null;
	const eyeY = HD.y - .03;
	const shades = look.eyewear === "shades";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [[-1, 1].map((sx) => {
		const x = sx * .1;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				x,
				eyeY,
				faceZ(x, eyeY) + .012
			],
			rotation: [
				0,
				sx * .4,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.lens,
				material: FRAME
			}), shades && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.sphere,
				material: SHADES,
				scale: [
					.046,
					.046,
					.006
				]
			})]
		}, sx);
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: GEO.box,
		material: FRAME,
		position: [
			0,
			eyeY + .012,
			faceZ(0, eyeY) + .01
		],
		scale: [
			.06,
			.01,
			.01
		]
	})] });
}
function Arm({ side, look, shoulder, elbow, holding, sleeve }) {
	const skin = matte(look.skin);
	const sleeveColour = look.outfit === "vest" && !look.uniform ? look.inner : look.shirt;
	const cloth = garment(look, sleeveColour);
	const long = look.outfit !== "tee" || !!look.uniform;
	const braid = look.uniform?.cuffBraid;
	const cuff = braid ? matte(braid, .4, .5) : look.uniform ? garment(look, mix(sleeveColour, "#000000", .1)) : CUFFED.has(look.outfit) ? matte(look.inner) : garment(look, mix(sleeveColour, "#000000", .08));
	const hand = -TOY.foreArm - .006;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: shoulder,
		position: [
			side * TOY.shoulderX,
			TOY.shoulderY,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.sphere,
				material: cloth,
				position: [
					-side * .008,
					-.004,
					0
				],
				scale: [
					TOY.armRadius + .012,
					TOY.armRadius + .008,
					TOY.armRadius + .012
				],
				castShadow: true
			}),
			!long && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.sleeve,
				material: cloth,
				position: [
					0,
					-.045,
					0
				],
				castShadow: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.upperArm,
				material: long ? cloth : skin,
				position: [
					0,
					-TOY.upperArm / 2,
					0
				],
				castShadow: true
			}),
			sleeve && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				position: [
					side * (TOY.armRadius + .001),
					-.088,
					0
				],
				rotation: [
					0,
					side * Math.PI / 2,
					0
				],
				children: sleeve
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: elbow,
				position: [
					0,
					-TOY.upperArm,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: GEO.foreArm,
						material: long ? cloth : skin,
						position: [
							0,
							-TOY.foreArm / 2 + .01,
							0
						],
						castShadow: true
					}),
					long && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: GEO.cuff,
						material: cuff,
						position: [
							0,
							hand + .052,
							0
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: GEO.sphere,
						material: skin,
						position: [
							0,
							hand,
							.004
						],
						scale: [
							TOY.handRadius * .82,
							TOY.handRadius * 1.08,
							TOY.handRadius * .95
						],
						castShadow: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: GEO.lowSphere,
						material: skin,
						position: [
							-side * .03,
							hand + .018,
							.034
						],
						rotation: [
							.5,
							0,
							side * .45
						],
						scale: [
							.02,
							.03,
							.02
						],
						castShadow: true
					}),
					holding && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
						position: [
							0,
							hand - .01,
							.03
						],
						children: holding
					})
				]
			})
		]
	});
}
function Leg({ side, look, hip, knee, ankle }) {
	const pants = matte(look.pants);
	const stripe = look.uniform?.stripe ? matte(look.uniform.stripe, .4, .5) : null;
	const dress = DRESS_SHOES.has(look.outfit) && !isLight(look.shoes);
	const sole = matte(dress ? mix(look.shoes, "#000000", .45) : isLight(look.shoes) ? mix(look.shoes, "#9a9aa0", .25) : SOLE_LIGHT);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: hip,
		position: [
			side * TOY.hipX,
			TOY.hipUp,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.thigh,
				material: pants,
				position: [
					0,
					-TOY.thigh / 2,
					0
				],
				castShadow: true
			}),
			stripe && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: GEO.box,
				material: stripe,
				position: [
					side * (TOY.legRadius - .002),
					-TOY.thigh / 2,
					0
				],
				scale: [
					.006,
					TOY.thigh + .06,
					.018
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: knee,
				position: [
					0,
					-TOY.thigh,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: GEO.shin,
						material: pants,
						position: [
							0,
							-TOY.shin / 2 + .005,
							0
						],
						castShadow: true
					}),
					stripe && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: GEO.box,
						material: stripe,
						position: [
							side * .054,
							-TOY.shin / 2 + .005,
							0
						],
						scale: [
							.006,
							TOY.shin + .04,
							.018
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						ref: ankle,
						position: [
							0,
							-TOY.shin,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							geometry: GEO.shoe,
							material: matte(look.shoes, dress ? .3 : .6),
							position: [
								0,
								-TOY.sole + .0425,
								(TOY.toe - TOY.heel) / 2
							],
							castShadow: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							geometry: GEO.sole,
							material: sole,
							position: [
								0,
								-TOY.sole + .011,
								(TOY.toe - TOY.heel) / 2
							],
							castShadow: true
						})]
					})
				]
			})
		]
	});
}
var BLEND_S = .2;
var MAX_DT = .1;
var SHOULDER_REST = {
	x: .15,
	y: .288,
	slope: .22
};
function ToyFigure({ look, drive, paused, heightM = TOY_HEIGHT, seatHeight = .52, holding, regalia, mannequin = false }) {
	const holds = (0, import_react.useRef)(false);
	holds.current = !!holding;
	const scale = heightM / TOY_HEIGHT;
	const pelvis = (0, import_react.useRef)(null);
	const torso = (0, import_react.useRef)(null);
	const head = (0, import_react.useRef)(null);
	const lShoulder = (0, import_react.useRef)(null);
	const rShoulder = (0, import_react.useRef)(null);
	const lElbow = (0, import_react.useRef)(null);
	const rElbow = (0, import_react.useRef)(null);
	const lHip = (0, import_react.useRef)(null);
	const rHip = (0, import_react.useRef)(null);
	const lKnee = (0, import_react.useRef)(null);
	const rKnee = (0, import_react.useRef)(null);
	const lAnkle = (0, import_react.useRef)(null);
	const rAnkle = (0, import_react.useRef)(null);
	const state = (0, import_react.useMemo)(() => ({
		time: Math.random() * 10,
		phase: 0,
		mode: null,
		blend: 1,
		from: createPose(),
		target: createPose(),
		current: createPose(),
		opts: {
			seatHeight: .52,
			phase: 0
		},
		settled: false
	}), []);
	useFrame((_, rawDt) => {
		const s = state;
		const dt = Math.min(rawDt, MAX_DT);
		const { mode, speed } = drive.current;
		const rigSpeed = Math.max(0, speed) / scale;
		const modeChanged = mode !== s.mode;
		if (paused && !modeChanged && s.settled) return;
		if (!paused) {
			s.time += dt;
			if (mode === "walk") s.phase += dt * walkCadence(rigSpeed);
		}
		if (modeChanged) {
			if (s.mode === null) s.blend = 1;
			else {
				copyPose(s.current, s.from);
				s.blend = 0;
			}
			s.mode = mode;
		}
		s.opts.seatHeight = seatHeight / scale;
		s.opts.phase = s.phase;
		poseFor(mode, s.time, rigSpeed, s.opts, s.target);
		if (s.blend < 1) {
			s.blend = Math.min(1, s.blend + dt / BLEND_S);
			const k = s.blend * s.blend * (3 - 2 * s.blend);
			blendPose(s.from, s.target, k, s.current);
		} else copyPose(s.target, s.current);
		s.settled = s.blend >= 1;
		if (holds.current) {
			s.current.rightShoulder[0] = -1.05;
			s.current.rightShoulder[1] = 0;
			s.current.rightShoulder[2] = .1;
			s.current.rightElbow = -.7;
		}
		apply(s.current);
	});
	function apply(p) {
		pelvis.current?.position.set(0, p.hipY, p.hipZ);
		if (torso.current) {
			torso.current.position.y = TOY.hipUp + p.bob;
			torso.current.rotation.set(p.torsoPitch, p.torsoYaw, p.torsoRoll);
		}
		head.current?.rotation.set(p.headPitch, p.headYaw, p.headRoll);
		lShoulder.current?.rotation.set(p.leftShoulder[0], p.leftShoulder[1], p.leftShoulder[2]);
		rShoulder.current?.rotation.set(p.rightShoulder[0], p.rightShoulder[1], p.rightShoulder[2]);
		if (lElbow.current) lElbow.current.rotation.x = p.leftElbow;
		if (rElbow.current) rElbow.current.rotation.x = p.rightElbow;
		if (lHip.current) lHip.current.rotation.x = p.leftHip;
		if (rHip.current) rHip.current.rotation.x = p.rightHip;
		if (lKnee.current) lKnee.current.rotation.x = p.leftKnee;
		if (rKnee.current) rKnee.current.rotation.x = p.rightKnee;
		if (lAnkle.current) lAnkle.current.rotation.x = p.leftAnkle;
		if (rAnkle.current) rAnkle.current.rotation.x = p.rightAnkle;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		scale,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			ref: pelvis,
			position: [
				0,
				TOY.thigh + TOY.shin + TOY.sole - TOY.hipUp,
				0
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: GEO.pelvis,
					material: look.uniform && (look.uniform.cut === "field" || look.uniform.cut === "service") ? garment(look, look.shirt) : matte(look.pants),
					position: [
						0,
						TOY.pelvis.h / 2,
						0
					],
					castShadow: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leg, {
					side: 1,
					look,
					hip: lHip,
					knee: lKnee,
					ankle: lAnkle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leg, {
					side: -1,
					look,
					hip: rHip,
					knee: rKnee,
					ankle: rAnkle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					ref: torso,
					position: [
						0,
						TOY.hipUp,
						0
					],
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							geometry: GEO.chest,
							material: garment(look, look.shirt),
							position: [
								0,
								.02 + (TOY.torso.h - .02) / 2,
								0
							],
							castShadow: true
						}),
						look.uniform ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UniformDetails, {
							look,
							u: look.uniform
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutfitDetails, { look }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							geometry: GEO.lowSphere,
							material: matte(look.skin),
							position: [
								0,
								TOY.neckY - .01,
								0
							],
							scale: [
								.07,
								.04,
								.07
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arm, {
							side: 1,
							look,
							shoulder: lShoulder,
							elbow: lElbow,
							sleeve: regalia?.sleeve
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arm, {
							side: -1,
							look,
							shoulder: rShoulder,
							elbow: rElbow,
							holding,
							sleeve: regalia?.sleeve
						}),
						regalia?.shoulder && [1, -1].map((side) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
							position: [
								side * SHOULDER_REST.x,
								SHOULDER_REST.y,
								0
							],
							rotation: [
								0,
								side === 1 ? 0 : Math.PI,
								-SHOULDER_REST.slope
							],
							children: regalia.shoulder
						}, side)),
						regalia?.chest,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
							ref: head,
							position: [
								0,
								TOY.neckY,
								0
							],
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									geometry: GEO.sphere,
									material: matte(look.skin),
									position: [
										0,
										HD.y,
										0
									],
									scale: [
										HD.rx,
										HD.ry,
										HD.rz
									],
									castShadow: true
								}),
								!mannequin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, { look }),
								!mannequin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyewear, { look }),
								mannequin ? null : regalia?.hat ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HairUnderHat, { color: look.hair }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hair, {
									style: look.hairStyle,
									look
								}),
								regalia?.hat
							]
						})
					]
				})
			]
		})
	});
}
export { RoundedBoxGeometry as n, ToyFigure as t };
