import { Bc as require_jsx_runtime, Ln as cn, U as useWebglSurface, Xc as require_react, Zt as useReducedMotion, oc as useT, tl as __toESM } from "./index-BOzhgzD7.js";
import { a as resolvePalette } from "./figureRecipe-BRnaWN-p.js";
import { s as useThree, t as Canvas } from "./react-three-fiber.esm-Dp0xg4g-.js";
import { t as ToyFigure } from "./ToyFigure-DQYSgl5W.js";
import { n as useCanvasAwake } from "./useCanvasAwake-5sZXDaXU.js";
import { t as LobbyStage } from "./LobbyStage-Cyt-y0V8.js";
import { f as toyLookFor, o as TOY_HEIGHT } from "./toyFigureModel-CWYjWDfN.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
const FRAME_MARGIN = 1.2;
function frameDistance({ spanM, fovDeg, aspect, zoom }) {
	const half = Math.max(spanM, .01) * .5 * FRAME_MARGIN;
	const tan = Math.tan(Math.min(Math.max(fovDeg, 1), 179) * Math.PI / 180 / 2);
	const safeAspect = aspect > 0 ? aspect : 1;
	const fitVertically = half / tan;
	const fitHorizontally = half / (tan * safeAspect);
	return Math.max(fitVertically, fitHorizontally) / (zoom > 0 ? zoom : 1);
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var FRAMED_HEIGHT_M = TOY_HEIGHT * 1.04;
var WAVE_MS = 1800;
var PITCH_LIMIT = 80 * Math.PI / 180;
var PITCH_FLOOR = 12 * Math.PI / 180;
var ZOOM_MIN = .55;
var ZOOM_MAX = 2.4;
var REST_VIEW = {
	yaw: -.45,
	pitch: .1,
	zoom: 1
};
function AgentFigureViewer({ recipe, clip = "idle", quiet = false, className }) {
	const t = useT();
	const hostRef = (0, import_react.useRef)(null);
	const { generation } = useWebglSurface(hostRef);
	const awake = useCanvasAwake(hostRef);
	const reduced = useReducedMotion() ?? false;
	const orbit = (0, import_react.useRef)({ ...REST_VIEW });
	const [orbitTick, setOrbitTick] = (0, import_react.useState)(0);
	const drag = (0, import_react.useRef)(null);
	const palette = (0, import_react.useMemo)(() => resolvePalette(recipe), [recipe]);
	const heightM = TOY_HEIGHT;
	const look = (0, import_react.useMemo)(() => recipe ? toyLookFor(recipe, "") : null, [recipe]);
	const onPointerDown = (0, import_react.useCallback)((e) => {
		if (e.button !== 0) return;
		drag.current = {
			x: e.clientX,
			y: e.clientY,
			id: e.pointerId
		};
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
		o.yaw += dx * .012;
		o.pitch = Math.max(-PITCH_FLOOR, Math.min(PITCH_LIMIT, o.pitch + dy * .01));
		setOrbitTick((n) => n + 1);
	}, []);
	const onPointerUp = (0, import_react.useCallback)((e) => {
		if (drag.current?.id === e.pointerId) drag.current = null;
	}, []);
	const onWheel = (0, import_react.useCallback)((e) => {
		const o = orbit.current;
		o.zoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, o.zoom * (1 - e.deltaY * .0012)));
		setOrbitTick((n) => n + 1);
	}, []);
	const onDoubleClick = (0, import_react.useCallback)(() => {
		orbit.current = { ...REST_VIEW };
		setOrbitTick((n) => n + 1);
	}, []);
	const frameloop = awake && !reduced ? "always" : "demand";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: hostRef,
		"data-testid": "agent-figure-viewer",
		className: cn("society-figure-stage relative h-full min-h-0 w-full select-none overflow-hidden touch-none", drag.current ? "cursor-grabbing" : "cursor-grab", className),
		style: { background: "radial-gradient(120% 90% at 50% 40%, hsl(var(--secondary)) 0%, hsl(var(--background)) 72%)" },
		onPointerDown,
		onPointerMove,
		onPointerUp,
		onPointerCancel: onPointerUp,
		onWheel,
		onDoubleClick,
		children: [look ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FigureErrorBoundary, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaletteTile, {
				palette,
				label: t("society.figure.unavailable")
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
				dpr: 1,
				frameloop,
				gl: {
					antialias: true,
					alpha: true,
					powerPreference: "low-power"
				},
				camera: {
					fov: 26,
					near: .1,
					far: 40,
					position: [
						0,
						heightM * .55,
						heightM * 2.5
					]
				},
				onCreated: ({ gl }) => {
					gl.setClearColor(0, 0);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FigureScene, {
						look,
						heightM,
						clip,
						quiet,
						paused: reduced || !awake,
						orbit,
						orbitTick
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HostSizeSync, {})]
			}, generation)
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaletteTile, {
			palette,
			label: t("society.figure.no_figure")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "pointer-events-none absolute inset-x-0 bottom-2 text-center text-xs text-muted-foreground",
			children: reduced ? t("society.figure.reduced_motion") : t("society.figure.drag_hint")
		})]
	});
}
var CLIP_MODES = [
	"idle",
	"walk",
	"work",
	"talk",
	"sit",
	"sleep",
	"celebrate",
	"wave"
];
function FigureScene({ look, heightM, clip, quiet, paused, orbit, orbitTick }) {
	const camera = useThree((s) => s.camera);
	const invalidate = useThree((s) => s.invalidate);
	const size = useThree((s) => s.size);
	const groupRef = (0, import_react.useRef)(null);
	const settled = CLIP_MODES.includes(clip) ? clip : "idle";
	const drive = (0, import_react.useRef)({
		mode: quiet ? settled : "wave",
		speed: 0
	});
	(0, import_react.useEffect)(() => {
		drive.current.mode = quiet ? settled : "wave";
		invalidate();
		if (quiet) return;
		const timer = setTimeout(() => {
			drive.current.mode = settled;
			invalidate();
		}, WAVE_MS);
		return () => clearTimeout(timer);
	}, [
		quiet,
		settled,
		invalidate
	]);
	(0, import_react.useEffect)(() => {
		const group = groupRef.current;
		const o = orbit.current;
		if (group) group.rotation.y = o.yaw;
		const mid = FRAMED_HEIGHT_M * .5;
		const lens = camera;
		const distance = frameDistance({
			spanM: FRAMED_HEIGHT_M,
			fovDeg: lens.fov,
			aspect: lens.aspect,
			zoom: o.zoom
		});
		camera.position.set(0, mid + Math.sin(o.pitch) * distance, Math.cos(o.pitch) * distance);
		camera.lookAt(0, mid, 0);
		camera.updateProjectionMatrix();
		invalidate();
	}, [
		orbitTick,
		camera,
		invalidate,
		orbit,
		size
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: groupRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToyFigure, {
			look,
			drive,
			paused,
			heightM
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LobbyStage, {
		heightM,
		paused
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
function PaletteTile({ palette, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full w-full flex-col items-center justify-center gap-3 p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "flex h-24 w-24 items-end justify-center rounded-2xl",
			style: { background: `linear-gradient(160deg, ${palette.primary}, ${palette.primary_shade})` },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 h-9 w-9 rounded-full",
				style: {
					background: palette.skin,
					boxShadow: `0 -10px 0 0 ${palette.hair}`
				}
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-[26ch] text-center text-xs text-muted-foreground",
			children: label
		})]
	});
}
var FigureErrorBoundary = class extends import_react.Component {
	state = { failed: false };
	static getDerivedStateFromError() {
		return { failed: true };
	}
	componentDidCatch(error, info) {
		console.warn("[society] figure viewer fell back to the palette tile:", error.message, info.componentStack);
	}
	render() {
		return this.state.failed ? this.props.fallback : this.props.children;
	}
};
var AgentFigureViewer_default = AgentFigureViewer;
export { AgentFigureViewer, AgentFigureViewer_default as default };
