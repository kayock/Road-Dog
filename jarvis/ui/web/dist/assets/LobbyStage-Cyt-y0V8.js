import { Bc as require_jsx_runtime, Xc as require_react, tl as __toESM } from "./index-BOzhgzD7.js";
import { E as CanvasTexture, Gn as NearestFilter, N as Color, Ni as SRGBColorSpace, st as DoubleSide, wi as RepeatWrapping } from "./three.module-CsntsSp5.js";
import { a as useFrame } from "./react-three-fiber.esm-Dp0xg4g-.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function readToken(style, name, fallback) {
	const m = style.getPropertyValue(name).trim().match(/^([\d.]+)\s+([\d.]+)%\s+([\d.]+)%$/);
	const c = new Color();
	if (!m) return c.set(fallback);
	return c.setHSL(Number(m[1]) / 360, Number(m[2]) / 100, Number(m[3]) / 100, SRGBColorSpace);
}
function readTokens() {
	if (typeof document === "undefined") return {
		dark: true,
		room: new Color("#0a0a0a"),
		lift: new Color("#1f1f1f"),
		object: new Color("#171717"),
		line: new Color("#262626"),
		lineStrong: new Color("#383838"),
		accent: new Color("#3d8bff")
	};
	const root = document.documentElement;
	const style = getComputedStyle(root);
	return {
		dark: root.classList.contains("dark"),
		room: readToken(style, "--background", "#0a0a0a"),
		lift: readToken(style, "--secondary", "#1f1f1f"),
		object: readToken(style, "--card", "#171717"),
		line: readToken(style, "--border", "#262626"),
		lineStrong: readToken(style, "--border-strong", "#383838"),
		accent: readToken(style, "--accent", "#3d8bff")
	};
}
function useLobbyTokens() {
	const [tokens, setTokens] = (0, import_react.useState)(readTokens);
	(0, import_react.useEffect)(() => {
		if (typeof MutationObserver === "undefined") return;
		const observer = new MutationObserver(() => setTokens(readTokens()));
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"]
		});
		return () => observer.disconnect();
	}, []);
	return tokens;
}
function pixelTexture(canvas, repeatX, repeatY) {
	const texture = new CanvasTexture(canvas);
	texture.wrapS = RepeatWrapping;
	texture.wrapT = RepeatWrapping;
	texture.repeat.set(repeatX, repeatY);
	texture.magFilter = NearestFilter;
	texture.minFilter = NearestFilter;
	texture.colorSpace = SRGBColorSpace;
	return texture;
}
function makeTileTexture(t) {
	if (typeof document === "undefined") return null;
	const size = 64;
	const canvas = document.createElement("canvas");
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;
	ctx.fillStyle = t.lift.getStyle();
	ctx.fillRect(0, 0, size, size);
	ctx.strokeStyle = t.lineStrong.getStyle();
	ctx.lineWidth = 2;
	ctx.strokeRect(1, 1, size - 2, size - 2);
	return pixelTexture(canvas, 14, 14);
}
function makePoolTexture(t) {
	if (typeof document === "undefined") return null;
	const size = 64;
	const canvas = document.createElement("canvas");
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;
	const grad = ctx.createRadialGradient(size / 2, size / 2, 2, size / 2, size / 2, size / 2);
	const a = t.accent;
	const rgb = `${Math.round(a.r * 255)}, ${Math.round(a.g * 255)}, ${Math.round(a.b * 255)}`;
	grad.addColorStop(0, `rgba(${rgb}, ${t.dark ? .35 : .22})`);
	grad.addColorStop(.6, `rgba(${rgb}, ${t.dark ? .1 : .06})`);
	grad.addColorStop(1, `rgba(${rgb}, 0)`);
	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, size, size);
	const texture = new CanvasTexture(canvas);
	texture.magFilter = NearestFilter;
	texture.minFilter = NearestFilter;
	texture.colorSpace = SRGBColorSpace;
	return texture;
}
function LobbyStage({ heightM, paused, platformR }) {
	const h = heightM;
	const t = useLobbyTokens();
	const ringRef = (0, import_react.useRef)(null);
	const underRef = (0, import_react.useRef)(null);
	const tiles = (0, import_react.useMemo)(() => makeTileTexture(t), [t]);
	const pool = (0, import_react.useMemo)(() => makePoolTexture(t), [t]);
	(0, import_react.useEffect)(() => () => {
		tiles?.dispose();
		pool?.dispose();
	}, [tiles, pool]);
	useFrame(({ clock }) => {
		if (paused) return;
		const pulse = .7 + Math.sin(clock.elapsedTime * 1.4) * .25;
		if (ringRef.current) ringRef.current.emissiveIntensity = pulse;
		if (underRef.current) underRef.current.emissiveIntensity = pulse * .8;
	});
	const platR = platformR ?? h * 1.35;
	const platH = h * .3;
	const wallR = Math.max(h * 3, platR * 2.2);
	const wallH = h * 2.4;
	const pillarR = Math.max(h * 2.35, platR * 1.75);
	const accentHex = `#${t.accent.getHexString()}`;
	const glow = t.dark ? 1 : .7;
	const pillars = (0, import_react.useMemo)(() => {
		return [
			-1.25,
			-.45,
			.45,
			1.25
		].map((a) => ({
			x: Math.sin(a) * pillarR,
			z: -Math.cos(a) * pillarR,
			ry: -a
		}));
	}, [pillarR]);
	const panels = (0, import_react.useMemo)(() => {
		const n = 7;
		const span = 1.9;
		return Array.from({ length: n }, (_, i) => {
			const a = -span / 2 + span * i / (n - 1);
			return {
				x: Math.sin(a) * wallR,
				z: -Math.cos(a) * wallR,
				ry: -a,
				lifted: i % 2 === 0
			};
		});
	}, [wallR]);
	const panelW = wallR * 1.9 / 7 + h * .02;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			t.dark ? 11187138 : 16777215,
			t.dark ? 1710618 : 9079434,
			t.dark ? .9 : 1
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				2.2 * h,
				3.4 * h,
				2.8 * h
			],
			intensity: t.dark ? 1.6 : 1.8
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				-2.4 * h,
				1.6 * h,
				1.2 * h
			],
			intensity: .35
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				.6 * h,
				2.2 * h,
				-3 * h
			],
			intensity: t.dark ? 1.4 : .9,
			color: accentHex
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				-platH / 2,
				0
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					platR,
					platR,
					platH,
					48
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					attach: "material-0",
					color: t.lift
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					attach: "material-1",
					color: t.lift
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					attach: "material-2",
					color: t.line
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.001,
				0
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [platR, 48] }), tiles ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: tiles,
				color: 16777215
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: t.lift })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				-h * .02,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				platR * 1.03,
				platR * 1.03,
				h * .04,
				48
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: t.lineStrong })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.003,
				0
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
				platR * .86,
				platR * .9,
				64
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				ref: ringRef,
				color: accentHex,
				emissive: accentHex,
				emissiveIntensity: .7 * glow,
				side: 2
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				-platH + h * .03,
				0
			],
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
				platR * .98,
				h * .022,
				8,
				64
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				ref: underRef,
				color: accentHex,
				emissive: accentHex,
				emissiveIntensity: .6 * glow
			})]
		}),
		pool ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				.004,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [h * 1.9, h * 1.9] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				map: pool,
				transparent: true,
				depthWrite: false
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				.006,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [h * .26, 24] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: 0,
				transparent: true,
				opacity: t.dark ? .35 : .18,
				depthWrite: false
			})]
		}),
		panels.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				p.x,
				0,
				p.z
			],
			rotation: [
				0,
				p.ry,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					wallH / 2 - h * .25,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					panelW,
					wallH,
					h * .08
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: p.lifted ? t.lineStrong : t.lift })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					h * .12,
					h * .045
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					panelW * .92,
					h * .025,
					h * .01
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: accentHex,
					emissive: accentHex,
					emissiveIntensity: .8 * glow
				})]
			})]
		}, i)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				wallH - h * .22,
				0
			],
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
				wallR,
				h * .035,
				6,
				64,
				2
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: t.lineStrong })]
		}),
		pillars.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				p.x,
				0,
				p.z
			],
			rotation: [
				0,
				p.ry,
				0
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						h * 1.1 - h * .3,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						h * .16,
						h * 2.2,
						h * .16
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: t.lift })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						h * 1.1 - h * .3,
						h * .085
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						h * .04,
						h * 1.6,
						h * .01
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: accentHex,
						emissive: accentHex,
						emissiveIntensity: .9 * glow
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						-h * .3 - h * .05,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						h * .3,
						h * .1,
						h * .3
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: t.lineStrong })]
				})
			]
		}, i))
	] });
}
export { LobbyStage as t };
