import { Bc as require_jsx_runtime, Lc as QueryClientContext, Xc as require_react, Yt as PetSprite, ha as usePetById, tl as __toESM } from "./index-BOzhgzD7.js";
import { t as PetStageContext } from "./petStage-CMRGLgJ7.js";
import { C as partDepth, D as smoothPath, O as symbolViewBox, T as resolveFill, _ as skinHighlight, b as FACE_SLOTS, h as skinEffect, k as wornAccessories, l as angleVector, r as companionEyeColors, v as ACCESSORY_CATALOG } from "./appearance-CnI1Xhkn.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var STARS = [
	[
		12,
		10,
		.7
	],
	[
		27,
		8.5,
		.5
	],
	[
		31,
		17,
		.8
	],
	[
		9,
		21,
		.55
	],
	[
		17,
		27,
		.75
	],
	[
		25,
		25,
		.45
	],
	[
		33,
		27,
		.55
	],
	[
		14,
		33,
		.5
	],
	[
		22,
		33.5,
		.65
	],
	[
		20,
		13.5,
		.4
	],
	[
		7,
		15,
		.4
	]
];
var SPARKLES = [
	[
		6.5,
		7,
		1
	],
	[
		34.5,
		11,
		.8
	],
	[
		33,
		34,
		.9
	]
];
var GLINT = "M0 -3.2 L0.75 -0.75 L3.2 0 L0.75 0.75 L0 3.2 L-0.75 0.75 L-3.2 0 L-0.75 -0.75Z";
var FLOW_PERIOD = 40;
function Stops({ colors, cyclic = false }) {
	const ring = cyclic ? [...colors, colors[0]] : colors;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: ring.map((color, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
		offset: index / (ring.length - 1),
		stopColor: color
	}, index)) });
}
function SkinDefs({ id, skin }) {
	const [x1, y1, x2, y2] = angleVector(skin.angle);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: skin.pattern === "radial" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("radialGradient", {
		id,
		cx: "0.38",
		cy: "0.34",
		r: "0.78",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stops, { colors: skin.colors })
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("linearGradient", {
		id,
		x1,
		y1,
		x2,
		y2,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stops, { colors: skin.colors })
	}) });
}
function SkinGlow({ id, skin, body }) {
	if (skinEffect(skin) !== "glow") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		"data-skin-glow": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("filter", {
			id: `${id}-glow`,
			x: "-60%",
			y: "-60%",
			width: "220%",
			height: "220%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", { stdDeviation: 2.4 })
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			className: "agent-skin-glow",
			filter: `url(#${id}-glow)`,
			children: body(skinHighlight(skin.colors))
		})]
	});
}
function SkinOverlay({ id, skin, body }) {
	const effect = skinEffect(skin);
	if (effect === "none" || effect === "glow") return null;
	if (effect === "sparkle") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		"data-skin-effect": "sparkle",
		fill: skinHighlight(skin.colors),
		stroke: skin.colors[skin.colors.length - 1],
		strokeWidth: .35,
		strokeLinejoin: "round",
		children: SPARKLES.map(([x, y, k], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			transform: `translate(${x} ${y}) scale(${k})`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				className: "agent-skin-glint",
				d: GLINT,
				style: { animationDelay: `${-index * 1.1}s` }
			})
		}, index))
	});
	const maskId = `${id}-mask`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		"data-skin-effect": effect,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mask", {
			id: maskId,
			maskUnits: "userSpaceOnUse",
			x: -20,
			y: -20,
			width: 80,
			height: 84,
			children: body("#ffffff")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			mask: `url(#${maskId})`,
			children: [
				effect === "stars" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					className: "agent-skin-stars",
					fill: "#ffffff",
					children: STARS.map(([x, y, r], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: x,
						cy: y,
						r,
						style: { animationDelay: `${-index * .43}s` }
					}, index))
				}),
				effect === "shimmer" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: `${id}-shine`,
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "#ffffff",
							stopOpacity: "0"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0.5",
							stopColor: "#ffffff",
							stopOpacity: "0.75"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#ffffff",
							stopOpacity: "0"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					transform: "skewX(-22)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						className: "agent-skin-shine",
						x: -14,
						y: -10,
						width: 13,
						height: 64,
						fill: `url(#${id}-shine)`
					})
				})] }),
				effect === "flow" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("linearGradient", {
					id: `${id}-flow`,
					gradientUnits: "userSpaceOnUse",
					x1: 0,
					y1: 0,
					x2: FLOW_PERIOD,
					y2: 0,
					spreadMethod: "repeat",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stops, {
						colors: skin.colors,
						cyclic: true
					})
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					transform: `rotate(${skin.angle - 90} 20 20)`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						className: "agent-skin-flow",
						x: -60,
						y: -60,
						width: 160,
						height: 160,
						fill: `url(#${id}-flow)`
					})
				})] })
			]
		})]
	});
}
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function roundedOutline(shape) {
	const points = [];
	for (let i = 0; i < 52; i++) {
		const angle = i / 52 * Math.PI * 2 - Math.PI / 2;
		const c = Math.cos(angle);
		const s = Math.sin(angle);
		const power = shape === "pill" ? 8 : 5;
		const divisor = Math.pow(Math.abs(c) ** power + Math.abs(s / (shape === "pill" ? .72 : 1)) ** power, 1 / power) || 1;
		const radius = (shape === "pill" ? 16 : 16.2) / divisor;
		points.push(`${i === 0 ? "M" : "L"}${(20 + radius * c).toFixed(2)} ${(20 + radius * s).toFixed(2)}`);
	}
	return points.join(" ") + "Z";
}
var ROUNDED_OUTLINES = {
	squircle: roundedOutline("squircle"),
	pill: roundedOutline("pill")
};
function SymbolBody({ shape, color, grow = 0 }) {
	const edge = (base) => base + grow * 2 > 0 ? {
		stroke: color,
		strokeWidth: base + grow * 2,
		strokeLinejoin: "round"
	} : {};
	switch (shape) {
		case "squircle":
		case "pill": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: ROUNDED_OUTLINES[shape],
			fill: color,
			...edge(0)
		});
		case "triangle": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M20 5.5 L36 33.5 L4 33.5 Z",
			fill: color,
			...edge(5)
		});
		case "hexagon": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M20 3.5 L34.5 11.75 L34.5 28.25 L20 36.5 L5.5 28.25 L5.5 11.75 Z",
			fill: color,
			...edge(3)
		});
		case "cloud": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M11 32 a7.5 7.5 0 0 1 -1 -14.9 A9.5 9.5 0 0 1 29 12.5 A7 7 0 0 1 30 32 Z",
			fill: color,
			...edge(0)
		});
		case "drop": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M20 3 C20 3 6 20 6 27 a14 13.5 0 0 0 28 0 C34 20 20 3 20 3 Z",
			fill: color,
			...edge(0)
		});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: 20,
			cy: 20,
			fill: color,
			r: 16.2,
			...edge(0)
		});
	}
}
function SymbolThinkingDots({ color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		className: "agent-symbol-thoughts",
		fill: color,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: 10,
				cy: 22,
				r: 3
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: 20,
				cy: 22,
				r: 4
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: 30,
				cy: 22,
				r: 3
			})
		]
	});
}
function SmokePuffs({ c, size, fill, id }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		"data-smoke": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("filter", {
			id,
			x: "-50%",
			y: "-50%",
			width: "200%",
			height: "200%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", { stdDeviation: .45 * size })
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			className: "agent-acc-smoke",
			fill,
			filter: `url(#${id})`,
			children: [
				0,
				1,
				2,
				3
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: c[0],
				cy: c[1],
				r: 1.35 * size,
				style: { animationDelay: `${-i * .8}s` }
			}, i))
		})]
	});
}
function AccessoryPartShape({ part, color, gradientId }) {
	const fill = part.gradient ? `url(#${gradientId})` : resolveFill(part.fill, color);
	const spin = "c" in part && part.rot ? `rotate(${part.rot} ${part.c[0]} ${part.c[1]})` : void 0;
	switch (part.t) {
		case "sphere": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx: part.c[0],
			cy: part.c[1],
			rx: part.r[0],
			ry: part.r[1],
			fill,
			transform: spin
		});
		case "dome": {
			const [cx, cy] = part.c;
			const [rx, ry] = part.r;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `M${cx - rx} ${cy} A${rx} ${ry} 0 0 1 ${cx + rx} ${cy}Z`,
				fill,
				transform: spin
			});
		}
		case "box": {
			const [w, h] = part.s;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: part.c[0] - w / 2,
				y: part.c[1] - h / 2,
				width: w,
				height: h,
				rx: Math.min(part.round, w / 2, h / 2),
				fill,
				transform: spin
			});
		}
		case "cyl": {
			const [cx, cy] = part.c;
			const [rb, rt] = part.r;
			const h = part.h / 2;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `M${cx - rb} ${cy + h} L${cx + rb} ${cy + h} L${cx + rt} ${cy - h} L${cx - rt} ${cy - h}Z`,
				fill,
				transform: spin
			});
		}
		case "torus": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx: part.c[0],
			cy: part.c[1],
			rx: part.R,
			ry: Math.max(part.R * Math.abs(Math.cos(part.tilt * Math.PI / 180)), .15),
			fill: "none",
			stroke: fill,
			strokeWidth: part.r * 2,
			transform: spin
		});
		case "poly": return part.smooth ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: smoothPath(part.pts, true),
			fill
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: part.pts.map((p) => p.join(",")).join(" "),
			fill
		});
		case "tube": {
			const flat = part.pts.map((p) => [p[0], p[1]]);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: part.smooth ? smoothPath(flat, false) : `M${flat.map((p) => p.join(" ")).join(" L")}`,
				fill: "none",
				stroke: fill,
				strokeWidth: part.w,
				strokeLinecap: "round",
				strokeLinejoin: "round"
			});
		}
		case "region": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: part.pts.map((p) => p.join(",")).join(" "),
			fill
		});
		case "rim": return null;
		case "smoke": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmokePuffs, {
			c: part.c,
			size: part.size,
			fill,
			id: `${gradientId}-blur`
		});
	}
}
function DecoratedPart({ part, color, gradientId }) {
	let node = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessoryPartShape, {
		part,
		color,
		gradientId
	});
	if (part.gradient) node = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
		id: gradientId,
		x1: "0",
		y1: "0",
		x2: "0",
		y2: "1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
			offset: "0",
			stopColor: part.gradient[0]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
			offset: "1",
			stopColor: part.gradient[1]
		})]
	}) }), node] });
	if (part.anim) node = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		className: `agent-acc-${part.anim}`,
		children: node
	});
	if (part.opacity !== void 0) node = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		opacity: part.opacity,
		children: node
	});
	return node;
}
function AccessoryItemShapes({ item, shape, color, regions, uid }) {
	const parts = item.parts.filter((part) => part.t !== "rim" && part.only !== "3d" && part.t === "region" === regions);
	if (!parts.length) return null;
	const [anchorX, y, anchorK] = ACCESSORY_CATALOG.shapes[shape].anchors[item.slot];
	const k = anchorK * (item.scale ?? 1);
	const x = anchorX + (ACCESSORY_CATALOG.slotFlatShift[item.slot] ?? 0);
	const ordered = regions ? parts : [...parts].sort((a, b) => partDepth(a) - partDepth(b));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		"data-accessory": item.id,
		transform: `translate(${x} ${y}) scale(${k})`,
		children: ordered.map((part, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecoratedPart, {
			part,
			color,
			gradientId: `${uid}-${item.id}-${index}`
		}, index))
	});
}
function ExpressiveEye({ side, cx, cy, rx, ry }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		className: `ae-eye ae-${side}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				className: "ae-open",
				cx,
				cy,
				rx,
				ry
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				className: "ae-happy",
				d: `M${cx - 2.6} ${cy + 1}Q${cx} ${cy - 2.9} ${cx + 2.6} ${cy + 1}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				className: "ae-shut",
				d: `M${cx - 2.4} ${cy}H${cx + 2.4}`
			})
		]
	});
}
function AgentSymbol({ shape, color, size, eyes = "lines", thinking = false, accessories, expressive = false, skin }) {
	const eyeY = shape === "cloud" || shape === "triangle" ? 23 : shape === "drop" ? 25 : 17.2;
	const ink = companionEyeColors(color);
	const maskId = `agent-body-${(0, import_react.useId)().replace(/[^a-zA-Z0-9_-]/g, "")}`;
	const worn = (0, import_react.useMemo)(() => wornAccessories(accessories), [accessories]);
	const viewBox = (0, import_react.useMemo)(() => symbolViewBox(shape, worn), [shape, worn]);
	const draw = (items, regions = false) => items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessoryItemShapes, {
		item,
		shape,
		color,
		regions,
		uid: maskId
	}, item.id));
	const faceTransform = `translate(2 -0.6) rotate(-14 20 ${eyeY})`;
	const onFace = worn.filter((item) => FACE_SLOTS.has(item.slot));
	const skinId = `${maskId}-skin`;
	const body = (fill) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SymbolBody, {
		shape,
		color: fill
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		"aria-hidden": true,
		focusable: "false",
		"data-agent-symbol": shape,
		"data-expressive": expressive ? "true" : void 0,
		"data-thinking": thinking ? "true" : void 0,
		width: size,
		height: size,
		style: {
			width: size,
			height: size,
			flexShrink: 0
		},
		viewBox,
		className: "society-agent-symbol block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "agent-symbol-character",
			children: [
				draw(worn.filter((item) => item.slot === "back")),
				worn.flatMap((item) => item.parts.map((part, index) => {
					if (part.t !== "rim" || part.only === "3d") return null;
					const [, anchorY, anchorK] = ACCESSORY_CATALOG.shapes[shape].anchors[item.slot];
					const clipId = `${maskId}-rim-${index}`;
					const bottom = part.maxY === void 0 ? 90 : anchorY + part.maxY * anchorK;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						"data-accessory-rim": item.id,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", {
							id: clipId,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: -30,
								y: -30,
								width: 100,
								height: bottom + 30
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
							clipPath: `url(#${clipId})`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SymbolBody, {
								shape,
								color: resolveFill(part.fill, color),
								grow: part.w
							})
						})]
					}, `${item.id}-rim-${index}`);
				})),
				skin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkinDefs, {
					id: skinId,
					skin
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkinGlow, {
					id: skinId,
					skin,
					body
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					"data-agent-body": true,
					"data-skin": skin ? skin.effect : void 0,
					children: body(skin ? `url(#${skinId})` : color)
				}),
				skin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkinOverlay, {
					id: skinId,
					skin,
					body
				}),
				worn.some((item) => item.regions) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mask", {
					id: maskId,
					maskUnits: "userSpaceOnUse",
					x: -20,
					y: -20,
					width: 80,
					height: 84,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SymbolBody, {
						shape,
						color: "#ffffff"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					mask: `url(#${maskId})`,
					children: draw(worn, true)
				})] }),
				draw(worn.filter((item) => item.slot === "outfit" || item.slot === "neck")),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "agent-symbol-gaze",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
						"data-agent-eyes": true,
						fill: ink.eye,
						transform: faceTransform,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
							className: "agent-symbol-lids",
							children: expressive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpressiveEye, {
								side: "l",
								cx: 15.2,
								cy: eyeY,
								rx: eyes === "lines" ? 1.8 : 2.4,
								ry: eyes === "lines" ? 3.5 : 2.7
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpressiveEye, {
								side: "r",
								cx: 24.8,
								cy: eyeY,
								rx: eyes === "lines" ? 1.8 : 2.4,
								ry: eyes === "lines" ? 3.5 : 2.7
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
								cx: 15.4,
								cy: eyeY,
								rx: eyes === "lines" ? 1.45 : 2,
								ry: eyes === "lines" ? 3.1 : 2.3
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
								cx: 24.6,
								cy: eyeY,
								rx: eyes === "lines" ? 1.45 : 2,
								ry: eyes === "lines" ? 3.1 : 2.3
							})] })
						})
					}), onFace.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
						transform: faceTransform,
						children: draw(onFace)
					})]
				}),
				draw(worn.filter((item) => item.slot === "head" || item.slot === "held"))
			]
		}), thinking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SymbolThinkingDots, { color })]
	});
}
function CompanionMark(props) {
	const { appearance, size, thinking = false, expressive = false } = props;
	const shape = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentSymbol, {
		...appearance,
		size,
		thinking,
		expressive
	});
	const client = (0, import_react.useContext)(QueryClientContext);
	if (!appearance.pet || !client) return shape;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetFace, {
		...props,
		petId: appearance.pet,
		fallback: shape
	});
}
function PetFace({ petId, size, thinking = false, state, fallback }) {
	const pet = usePetById(petId);
	const staged = (0, import_react.useContext)(PetStageContext);
	if (pet === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": true,
		className: "inline-block shrink-0",
		style: {
			width: size,
			height: size
		}
	});
	if (pet === null) return fallback;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "agent-pet-face inline-flex shrink-0",
		"data-agent-pet": pet.id,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetSprite, {
			pet,
			state: state ?? staged ?? (thinking ? "working" : "idle"),
			px: size
		})
	});
}
export { AgentSymbol as n, SymbolThinkingDots as r, CompanionMark as t };
