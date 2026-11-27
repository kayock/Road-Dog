import { Bc as require_jsx_runtime, Xc as require_react, Zt as useReducedMotion, oc as useT, tl as __toESM } from "./index-BOzhgzD7.js";
import { o as reportWorldAction } from "./progressionApi-DG7iMoRa.js";
import { a as loadRetroGame, n as arcadeGame } from "./arcadeGames-ChImpaOT.js";
import { t as RETRO_STEP } from "./retroGame-GmSLy6cP.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
const RETRO_BUTTONS = [
	"left",
	"right",
	"up",
	"down",
	"a",
	"b"
];
var KEY_BUTTONS = {
	ArrowLeft: "left",
	KeyA: "left",
	ArrowRight: "right",
	KeyD: "right",
	ArrowUp: "up",
	KeyW: "up",
	ArrowDown: "down",
	KeyS: "down",
	Space: "a",
	KeyJ: "a",
	KeyZ: "a",
	ShiftLeft: "b",
	ShiftRight: "b",
	KeyK: "b",
	KeyX: "b"
};
function keyButton(code) {
	return KEY_BUTTONS[code] ?? null;
}
var PAD_A = 0;
var PAD_B = [1, 2];
var PAD_START = 9;
var PAD_UP = 12;
var PAD_DOWN = 13;
var PAD_LEFT = 14;
var PAD_RIGHT = 15;
function noButtons() {
	return {
		left: false,
		right: false,
		up: false,
		down: false,
		a: false,
		b: false
	};
}
function createInputTracker() {
	return {
		keys: noButtons(),
		touch: noButtons(),
		pad: noButtons(),
		edges: noButtons(),
		padStart: false,
		pointer: {
			x: 0,
			y: 0,
			down: false,
			clicked: false
		},
		pointerOn: false,
		input: {
			...noButtons(),
			pressed: noButtons(),
			pointer: null
		},
		stepPointer: {
			x: 0,
			y: 0,
			down: false,
			clicked: false
		}
	};
}
function isHeld(t, b) {
	return t.keys[b] || t.touch[b] || t.pad[b];
}
function setHeld(t, source, b, down) {
	if (source[b] === down) return;
	const before = isHeld(t, b);
	source[b] = down;
	if (down && !before) t.edges[b] = true;
}
function pressKey(t, code, repeat = false) {
	const b = keyButton(code);
	if (!b) return false;
	if (repeat) t.keys[b] = true;
	else setHeld(t, t.keys, b, true);
	return true;
}
function releaseKey(t, code) {
	const b = keyButton(code);
	if (!b) return false;
	t.keys[b] = false;
	return true;
}
function setTouch(t, b, down) {
	setHeld(t, t.touch, b, down);
}
function padPressed(pad, index) {
	return !!pad.buttons[index]?.pressed;
}
function readGamepad(t, pad) {
	if (!pad) {
		for (const b of RETRO_BUTTONS) t.pad[b] = false;
		t.padStart = false;
		return false;
	}
	const x = pad.axes[0] ?? 0;
	const y = pad.axes[1] ?? 0;
	setHeld(t, t.pad, "left", padPressed(pad, PAD_LEFT) || x < -.35);
	setHeld(t, t.pad, "right", padPressed(pad, PAD_RIGHT) || x > .35);
	setHeld(t, t.pad, "up", padPressed(pad, PAD_UP) || y < -.35);
	setHeld(t, t.pad, "down", padPressed(pad, PAD_DOWN) || y > .35);
	setHeld(t, t.pad, "a", padPressed(pad, PAD_A));
	setHeld(t, t.pad, "b", padPressed(pad, PAD_B[0]) || padPressed(pad, PAD_B[1]));
	const start = padPressed(pad, PAD_START);
	const edge = start && !t.padStart;
	t.padStart = start;
	return edge;
}
function firstGamepad(pads) {
	if (!pads) return null;
	for (const pad of pads) if (pad && pad.connected !== false) return pad;
	return null;
}
function setPointer(t, x, y, down) {
	if (down && !t.pointer.down) t.pointer.clicked = true;
	t.pointer.x = x;
	t.pointer.y = y;
	t.pointer.down = down;
	t.pointerOn = true;
}
function leavePointer(t) {
	t.pointer.down = false;
	t.pointerOn = false;
}
function clearEdges(t) {
	for (const b of RETRO_BUTTONS) t.edges[b] = false;
	t.pointer.clicked = false;
}
function hasStartGesture(t) {
	return t.edges.a || t.pointer.clicked;
}
function releaseAll(t) {
	for (const b of RETRO_BUTTONS) {
		t.keys[b] = false;
		t.touch[b] = false;
	}
	t.pointer.down = false;
	clearEdges(t);
}
function takeInput(t, withPointer) {
	const input = t.input;
	for (const b of RETRO_BUTTONS) {
		input[b] = isHeld(t, b);
		input.pressed[b] = t.edges[b];
		t.edges[b] = false;
	}
	if (withPointer && (t.pointerOn || t.pointer.clicked)) {
		const p = t.stepPointer;
		p.x = t.pointer.x;
		p.y = t.pointer.y;
		p.down = t.pointer.down;
		p.clicked = t.pointer.clicked;
		input.pointer = p;
	} else input.pointer = null;
	t.pointer.clicked = false;
	return input;
}
function dpadDirections(dx, dy, radius) {
	const off = {
		left: false,
		right: false,
		up: false,
		down: false
	};
	if (!(radius > 0) || Math.hypot(dx, dy) < radius * .25) return off;
	const tan = Math.tan(Math.PI / 8);
	const ax = Math.abs(dx);
	const ay = Math.abs(dy);
	if (ax > ay * tan) {
		off.left = dx < 0;
		off.right = dx > 0;
	}
	if (ay > ax * tan) {
		off.up = dy < 0;
		off.down = dy > 0;
	}
	return off;
}
function toLogical(clientX, clientY, rect, width, height) {
	if (!(rect.width > 0) || !(rect.height > 0)) return null;
	const x = (clientX - rect.left) / rect.width * width;
	const y = (clientY - rect.top) / rect.height * height;
	if (x < 0 || y < 0 || x > width || y > height) return null;
	return {
		x: Math.min(x, width - 1e-6),
		y: Math.min(y, height - 1e-6)
	};
}
function screenScale(availWidth, availHeight, width, height, dpr = 1) {
	if (!(availWidth > 0) || !(availHeight > 0) || !(width > 0) || !(height > 0)) return 1;
	const ratio = dpr > 0 && Number.isFinite(dpr) ? dpr : 1;
	const fit = Math.min(availWidth / width, availHeight / height);
	const whole = Math.floor(fit * ratio + 1e-6);
	return whole >= 2 ? whole / ratio : fit;
}
function createRetroClock() {
	return { acc: 0 };
}
function stepsDue(clock, elapsed, step = RETRO_STEP, maxSteps = 5) {
	if (Number.isFinite(elapsed) && elapsed > 0) clock.acc += elapsed;
	const due = Math.floor((clock.acc + 1e-9) / step);
	if (due > maxSteps) {
		clock.acc = 0;
		return maxSteps;
	}
	clock.acc = Math.max(0, clock.acc - due * step);
	return due;
}
function resetClock(clock) {
	clock.acc = 0;
}
function bestKey(gameId) {
	return `jarvis.office.arcade.${gameId}.best`;
}
var memory = /* @__PURE__ */ new Map();
function browserStorage() {
	try {
		return typeof window === "undefined" ? null : window.localStorage;
	} catch {
		return null;
	}
}
function clean(score) {
	return Number.isFinite(score) && score > 0 ? Math.floor(score) : 0;
}
function readBest(gameId, storage = browserStorage()) {
	const key = bestKey(gameId);
	let stored = 0;
	if (storage) try {
		stored = clean(Number(storage.getItem(key)));
	} catch {}
	return Math.max(stored, memory.get(key) ?? 0);
}
function saveBest(gameId, score, storage = browserStorage()) {
	const value = clean(score);
	if (value <= readBest(gameId, storage)) return false;
	const key = bestKey(gameId);
	memory.set(key, value);
	if (storage) try {
		storage.setItem(key, String(value));
	} catch {}
	return true;
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var RESTART_GUARD_MS = 600;
var HUD_POLL_MS = 100;
var PLACEHOLDER = {
	width: 320,
	height: 240
};
var FALLBACK_LOOK = {
	body: "#1d1a3a",
	trim: "#0e0c1f",
	marquee: "#120f2a",
	marqueeText: "#facc15",
	accent: "#2dff5a"
};
function sameHud(a, b) {
	return a.score === b.score && a.lives === b.lives && a.level === b.level;
}
function readPads() {
	if (typeof navigator === "undefined" || typeof navigator.getGamepads !== "function") return null;
	try {
		return navigator.getGamepads();
	} catch {
		return null;
	}
}
function useCoarsePointer() {
	const query = "(pointer: coarse)";
	const [coarse, setCoarse] = (0, import_react.useState)(() => typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia(query).matches);
	(0, import_react.useEffect)(() => {
		if (typeof window.matchMedia !== "function") return;
		const media = window.matchMedia(query);
		const change = () => setCoarse(media.matches);
		media.addEventListener?.("change", change);
		return () => media.removeEventListener?.("change", change);
	}, []);
	return coarse;
}
function RetroArcadeOverlay({ gameId, onClose, loadGame = loadRetroGame }) {
	const t = useT();
	const info = arcadeGame(gameId);
	const title = info?.title ?? gameId;
	const look = info?.look ?? FALLBACK_LOOK;
	const reduced = useReducedMotion() ?? false;
	const coarse = useCoarsePointer();
	const dialog = (0, import_react.useRef)(null);
	const stage = (0, import_react.useRef)(null);
	const canvas = (0, import_react.useRef)(null);
	const run = (0, import_react.useRef)(null);
	const tracker = (0, import_react.useRef)(createInputTracker());
	const startRequest = (0, import_react.useRef)(false);
	const reducedRef = (0, import_react.useRef)(reduced);
	reducedRef.current = reduced;
	const closeRef = (0, import_react.useRef)(onClose);
	closeRef.current = onClose;
	const loaderRef = (0, import_react.useRef)(loadGame);
	loaderRef.current = loadGame;
	const [game, setGame] = (0, import_react.useState)(null);
	const [attempt, setAttempt] = (0, import_react.useState)(0);
	const [phase, setPhaseState] = (0, import_react.useState)("loading");
	const phaseRef = (0, import_react.useRef)("loading");
	const [hud, setHud] = (0, import_react.useState)({ score: 0 });
	const [best, setBest] = (0, import_react.useState)(() => readBest(gameId));
	const [result, setResult] = (0, import_react.useState)(null);
	const [scale, setScale] = (0, import_react.useState)(1);
	const setPhase = (0, import_react.useCallback)((next) => {
		phaseRef.current = next;
		setPhaseState(next);
	}, []);
	(0, import_react.useEffect)(() => {
		let alive = true;
		setPhase("loading");
		loaderRef.current(gameId).then((loaded) => {
			if (!alive) return;
			run.current = {
				game: loaded,
				state: loaded.create(Math.random)
			};
			setGame(loaded);
			setResult(null);
			setPhase("ready");
		}, (error) => {
			if (!alive) return;
			console.warn("[arcade] game failed to load", gameId, error);
			setPhase("error");
		});
		return () => {
			alive = false;
		};
	}, [
		gameId,
		attempt,
		setPhase
	]);
	const pause = (0, import_react.useCallback)(() => {
		releaseAll(tracker.current);
		if (phaseRef.current === "playing") setPhase("paused");
	}, [setPhase]);
	(0, import_react.useEffect)(() => {
		const clock = createRetroClock();
		let raf = 0;
		let last = -1;
		let opened = -1;
		let overAt = 0;
		const finish = (score, won, now) => {
			const previous = readBest(gameId);
			const newBest = saveBest(gameId, score);
			const kept = Math.max(previous, score);
			if (score > 0) reportWorldAction(newBest ? "arcade_record" : "arcade_round");
			setBest(kept);
			setResult({
				score,
				best: kept,
				newBest,
				won
			});
			overAt = now;
			clearEdges(tracker.current);
			setPhase("over");
		};
		const begin = (now) => {
			const current = run.current;
			if (!current) return;
			if (phaseRef.current === "over") {
				if (now - overAt < RESTART_GUARD_MS) return;
				current.state = current.game.create(Math.random);
				setResult(null);
			}
			resetClock(clock);
			clearEdges(tracker.current);
			setPhase("playing");
		};
		const frame = (now) => {
			raf = requestAnimationFrame(frame);
			if (opened < 0) opened = now;
			const elapsed = last < 0 ? 0 : (now - last) / 1e3;
			last = now;
			const current = run.current;
			const phase$1 = phaseRef.current;
			if (!current || phase$1 === "loading" || phase$1 === "error") return;
			const input = tracker.current;
			const pads = readPads();
			const startPressed = pads ? readGamepad(input, firstGamepad(pads)) : false;
			try {
				if (phase$1 === "playing") if (startPressed) pause();
				else {
					const steps = stepsDue(clock, elapsed);
					for (let i = 0; i < steps; i++) {
						current.game.step(current.state, takeInput(input, !!current.game.pointer), RETRO_STEP, Math.random);
						const status = current.game.status(current.state);
						if (status.over) {
							finish(Math.max(0, Math.floor(status.score)), !!status.won, now);
							break;
						}
					}
				}
				else {
					const wants = startRequest.current || startPressed || hasStartGesture(input);
					startRequest.current = false;
					clearEdges(input);
					if (wants) begin(now);
				}
				const ctx = canvas.current?.getContext("2d") ?? null;
				if (ctx) {
					ctx.imageSmoothingEnabled = false;
					const shown = phaseRef.current;
					current.game.draw(ctx, current.state, {
						time: (now - opened) / 1e3,
						reduced: reducedRef.current,
						idle: shown === "ready" || shown === "paused"
					});
				}
			} catch (error) {
				console.warn("[arcade] game crashed", gameId, error);
				run.current = null;
				setPhase("error");
			}
		};
		raf = requestAnimationFrame(frame);
		return () => cancelAnimationFrame(raf);
	}, [
		gameId,
		pause,
		setPhase
	]);
	const togglePause = (0, import_react.useCallback)(() => {
		if (phaseRef.current === "playing") pause();
		else if (phaseRef.current === "paused") startRequest.current = true;
	}, [pause]);
	(0, import_react.useEffect)(() => {
		const swallow = (event) => {
			event.preventDefault();
			event.stopPropagation();
		};
		const down = (event) => {
			if (event.ctrlKey || event.metaKey || event.altKey) return;
			const code = event.code;
			if (event.key === "Escape" || code === "KeyE") {
				swallow(event);
				if (!event.repeat) closeRef.current();
			} else if (code === "KeyP") {
				swallow(event);
				if (!event.repeat) togglePause();
			} else if (code === "Enter" || code === "NumpadEnter") {
				swallow(event);
				if (!event.repeat) startRequest.current = true;
			} else if (pressKey(tracker.current, code, event.repeat)) swallow(event);
		};
		const up = (event) => {
			releaseKey(tracker.current, event.code);
		};
		const visibility = () => {
			if (document.hidden) pause();
		};
		window.addEventListener("keydown", down, true);
		window.addEventListener("keyup", up, true);
		window.addEventListener("blur", pause);
		document.addEventListener("visibilitychange", visibility);
		return () => {
			window.removeEventListener("keydown", down, true);
			window.removeEventListener("keyup", up, true);
			window.removeEventListener("blur", pause);
			document.removeEventListener("visibilitychange", visibility);
		};
	}, [pause, togglePause]);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => {
			const current = run.current;
			if (!current || phaseRef.current === "loading" || phaseRef.current === "error") return;
			try {
				const status = current.game.status(current.state);
				const next = {
					score: Math.max(0, Math.floor(status.score)),
					lives: status.lives,
					level: status.level
				};
				setHud((h) => sameHud(h, next) ? h : next);
			} catch {}
		}, HUD_POLL_MS);
		return () => window.clearInterval(id);
	}, []);
	(0, import_react.useEffect)(() => () => {
		const current = run.current;
		if (!current) return;
		try {
			saveBest(gameId, current.game.status(current.state).score);
		} catch {}
	}, [gameId]);
	(0, import_react.useLayoutEffect)(() => {
		const previous = document.activeElement;
		dialog.current?.focus({ preventScroll: true });
		return () => {
			if (previous instanceof HTMLElement && previous.isConnected) previous.focus({ preventScroll: true });
		};
	}, []);
	const width = game?.width ?? PLACEHOLDER.width;
	const height = game?.height ?? PLACEHOLDER.height;
	(0, import_react.useEffect)(() => {
		const el = stage.current;
		if (!el) return;
		const measure = () => {
			const next = screenScale(el.clientWidth, el.clientHeight, width, height, window.devicePixelRatio || 1);
			setScale((s) => Math.abs(s - next) < 1e-6 ? s : next);
		};
		measure();
		if (typeof ResizeObserver !== "undefined") {
			const observer = new ResizeObserver(measure);
			observer.observe(el);
			return () => observer.disconnect();
		}
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, [width, height]);
	const pointerAt = (event, down) => {
		const el = canvas.current;
		if (!el || !game?.pointer) return;
		const at = toLogical(event.clientX, event.clientY, el.getBoundingClientRect(), width, height);
		if (at) setPointer(tracker.current, at.x, at.y, down);
		else leavePointer(tracker.current);
	};
	const style = {
		"--cab-body": look.body,
		"--cab-trim": look.trim,
		"--cab-marquee": look.marquee,
		"--cab-marquee-text": look.marqueeText,
		"--cab-accent": look.accent
	};
	const screenStyle = {
		width: `${width * scale}px`,
		height: `${height * scale}px`,
		"--retro-px": `${scale}px`
	};
	const key = info?.key ?? "";
	const shownBest = Math.max(best, hud.score);
	const requestStart = () => {
		startRequest.current = true;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "retro-cab-backdrop",
		"data-office-ui": true,
		onPointerDown: (event) => {
			if (event.target === event.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: dialog,
			className: "retro-cab",
			style,
			role: "dialog",
			"data-state": "open",
			"aria-modal": "true",
			"aria-label": title,
			"data-phase": phase,
			"data-reduced": reduced ? "true" : "false",
			tabIndex: -1,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "retro-cab-marquee",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "retro-cab-close",
					onClick: onClose,
					"aria-label": t("society.office.close"),
					children: "×"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "retro-cab-bezel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "retro-cab-hud",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								t("society.arcade.score"),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: hud.score })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								t("society.arcade.best"),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: shownBest })
							] }),
							hud.lives !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								t("society.arcade.lives"),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: hud.lives })
							] }),
							hud.level !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								t("society.arcade.level"),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: hud.level })
							] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						ref: stage,
						className: "retro-cab-stage",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "retro-cab-screen",
							style: screenStyle,
							"data-scan": scale >= 2 ? "on" : "off",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
									ref: canvas,
									width,
									height,
									"data-pointer": game?.pointer ? "true" : "false",
									onPointerDown: (event) => {
										if (!game?.pointer) return;
										event.currentTarget.setPointerCapture?.(event.pointerId);
										pointerAt(event, true);
									},
									onPointerMove: (event) => pointerAt(event, event.buttons !== 0),
									onPointerUp: (event) => pointerAt(event, false),
									onPointerCancel: () => leavePointer(tracker.current),
									onPointerLeave: () => leavePointer(tracker.current)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "retro-cab-crt",
									"aria-hidden": true
								}),
								phase === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "retro-cab-card",
									role: "status",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("society.arcade.loading") })
								}),
								phase === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "retro-cab-card",
									role: "alert",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("society.arcade.load_failed") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "retro-cab-retry",
										onClick: () => setAttempt((n) => n + 1),
										children: t("society.arcade.retry")
									})]
								}),
								phase === "ready" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "retro-cab-card",
									onClick: requestStart,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: title }),
										key && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "retro-cab-tagline",
											children: t(`society.arcade.games.${key}.tagline`)
										}),
										key && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "retro-cab-how",
											children: t(`society.arcade.games.${key}.how`)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "retro-cab-blink",
											children: t(coarse ? "society.arcade.tap_start" : "society.arcade.press_start")
										})
									]
								}),
								phase === "paused" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "retro-cab-card",
									onClick: requestStart,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("society.arcade.paused") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(coarse ? "society.arcade.tap_resume" : "society.arcade.resume_hint") })]
								}),
								phase === "over" && result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "retro-cab-card",
									onClick: requestStart,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t(result.won ? "society.arcade.you_win" : "society.arcade.game_over") }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											t("society.arcade.score"),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: result.score }),
											" · ",
											t("society.arcade.best"),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: result.best })
										] }),
										result.newBest && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "retro-cab-newbest",
											children: t("society.arcade.new_best")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "retro-cab-blink",
											children: t(coarse ? "society.arcade.tap_again" : "society.arcade.play_again")
										})
									]
								})
							]
						})
					}),
					coarse ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchPad, {
						tracker: tracker.current,
						onPause: togglePause,
						pauseLabel: t("society.arcade.pause"),
						labels: {
							up: t("society.arcade.pad_up"),
							down: t("society.arcade.pad_down"),
							left: t("society.arcade.pad_left"),
							right: t("society.arcade.pad_right")
						}
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "retro-cab-keys",
						children: t("society.arcade.keys_hint")
					})
				]
			})]
		})
	});
}
var DIRECTIONS = [
	"up",
	"down",
	"left",
	"right"
];
function TouchPad({ tracker, onPause, pauseLabel, labels }) {
	const dpadPointer = (0, import_react.useRef)(null);
	const steer = (event) => {
		const rect = event.currentTarget.getBoundingClientRect();
		const dirs = dpadDirections(event.clientX - (rect.left + rect.width / 2), event.clientY - (rect.top + rect.height / 2), rect.width / 2);
		for (const d of DIRECTIONS) setTouch(tracker, d, dirs[d]);
	};
	const releaseDpad = (event) => {
		if (event.pointerId !== dpadPointer.current) return;
		dpadPointer.current = null;
		for (const d of DIRECTIONS) setTouch(tracker, d, false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "retro-cab-touch",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "retro-cab-dpad",
				role: "group",
				onPointerDown: (event) => {
					if (dpadPointer.current !== null) return;
					event.preventDefault();
					dpadPointer.current = event.pointerId;
					event.currentTarget.setPointerCapture?.(event.pointerId);
					steer(event);
				},
				onPointerMove: (event) => {
					if (event.pointerId === dpadPointer.current) steer(event);
				},
				onPointerUp: releaseDpad,
				onPointerCancel: releaseDpad,
				onLostPointerCapture: releaseDpad,
				children: DIRECTIONS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "retro-cab-dpad-arm",
					"data-dir": d,
					role: "img",
					"aria-label": labels[d]
				}, d))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "retro-cab-pause",
				"aria-label": pauseLabel,
				onClick: onPause,
				children: "❚❚"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "retro-cab-buttons",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchButton, {
					tracker,
					button: "b"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchButton, {
					tracker,
					button: "a"
				})]
			})
		]
	});
}
function TouchButton({ tracker, button }) {
	const held = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const release = (event) => {
		if (!held.current.delete(event.pointerId)) return;
		if (held.current.size === 0) setTouch(tracker, button, false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "retro-cab-btn",
		"data-button": button,
		"aria-label": button.toUpperCase(),
		onPointerDown: (event) => {
			event.preventDefault();
			event.currentTarget.setPointerCapture?.(event.pointerId);
			held.current.add(event.pointerId);
			setTouch(tracker, button, true);
		},
		onPointerUp: release,
		onPointerCancel: release,
		onLostPointerCapture: release,
		onContextMenu: (event) => event.preventDefault(),
		children: button.toUpperCase()
	});
}
export { RetroArcadeOverlay };
