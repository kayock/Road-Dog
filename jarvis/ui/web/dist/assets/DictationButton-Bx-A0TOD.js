import { Bc as require_jsx_runtime, Di as Mic, Ln as cn, Xc as require_react, di as Square, fc as readVoiceInputLevel, oc as useT, tl as __toESM } from "./index-BOzhgzD7.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var BAR_COUNT = 18;
var STEP_MS = 60;
var REST = .14;
function formatElapsed(ms) {
	const total = Math.max(0, Math.floor(ms / 1e3));
	const minutes = Math.floor(total / 60);
	const seconds = total % 60;
	return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
function Waveform() {
	const barsRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const host = barsRef.current;
		if (!host) return;
		const bars = Array.from(host.children);
		const history = new Array(bars.length).fill(0);
		let frame = 0;
		let last = 0;
		let peak = 0;
		const tick = (now) => {
			peak = Math.max(peak, readVoiceInputLevel(now));
			if (now - last >= STEP_MS) {
				last = now;
				history.shift();
				history.push(peak);
				peak = 0;
				for (let i = 0; i < bars.length; i += 1) {
					const bar = bars[i];
					if (bar) bar.style.transform = `scaleY(${REST + (1 - REST) * (history[i] ?? 0)})`;
				}
			}
			frame = window.requestAnimationFrame(tick);
		};
		frame = window.requestAnimationFrame(tick);
		return () => window.cancelAnimationFrame(frame);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref: barsRef,
		"aria-hidden": true,
		"data-testid": "dictation-waveform",
		className: "flex h-4 items-center gap-[2px]",
		children: Array.from({ length: BAR_COUNT }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "h-full w-[2px] origin-center rounded-full bg-success transition-transform duration-75 ease-out",
			style: { transform: `scaleY(${REST})` }
		}, i))
	});
}
function DictationButton({ dictating, onToggle, disabled, startLabel, stopLabel, shape = "square", className }) {
	const t = useT();
	const startedRef = (0, import_react.useRef)(0);
	const [elapsed, setElapsed] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!dictating) {
			startedRef.current = 0;
			setElapsed(0);
			return;
		}
		startedRef.current = Date.now();
		setElapsed(0);
		const id = window.setInterval(() => setElapsed(Date.now() - startedRef.current), 500);
		return () => window.clearInterval(id);
	}, [dictating]);
	if (!dictating) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"data-jarvis-dictation-trigger": true,
		"data-testid": "dictation-button",
		onClick: onToggle,
		disabled,
		"aria-label": startLabel,
		title: startLabel,
		className: cn("inline-flex h-8 w-8 shrink-0 items-center justify-center text-muted-foreground transition-colors", "hover:bg-secondary hover:text-foreground disabled:opacity-50", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-strong", shape === "round" ? "rounded-full" : "rounded-lg", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, {
			className: "h-4 w-4",
			"aria-hidden": true
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "status",
		"aria-live": "polite",
		"data-testid": "dictation-status",
		className: cn("inline-flex h-8 shrink-0 items-center gap-2 rounded-full border border-success/35 bg-success/10 pl-3 pr-1", "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 motion-safe:duration-150", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: t("chats_view.dictation_listening")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "relative flex h-2 w-2 shrink-0",
				"aria-hidden": true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full rounded-full bg-success/60 motion-safe:animate-ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-success" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waveform, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-8 shrink-0 text-right font-mono text-micro tabular-nums text-muted-foreground",
				children: formatElapsed(elapsed)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"data-jarvis-dictation-trigger": true,
				"data-testid": "dictation-stop",
				onClick: onToggle,
				"aria-label": stopLabel,
				title: stopLabel,
				className: cn("inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success text-background transition-opacity", "hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success/50"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, {
					className: "h-2.5 w-2.5 fill-current",
					"aria-hidden": true
				})
			})
		]
	});
}
export { DictationButton as t };
