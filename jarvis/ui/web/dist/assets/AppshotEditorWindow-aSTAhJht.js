import { t as Film } from "./film-DSw5PVCO.js";
import { t as Pause } from "./pause-3aM4bP8F.js";
import { t as Play } from "./play-B4Hl_QRo.js";
import { Bc as require_jsx_runtime, Gs as fill, Ln as cn, R as ToastLayer, Xc as require_react, Ys as loadLocaleChunk, ji as LoaderCircle, ln as Button, na as createLucideIcon, nc as useLocaleChunk, oc as useT, ot as useCapabilities, si as X, tl as __toESM, vi as RotateCcw, wc as useEventStore } from "./index-BOzhgzD7.js";
import "./switch-hmH-TV55.js";
import { C as saveAppshotRecording, d as exportAppshotRecording, o as appshotRecordingUrl, r as RECORDING_SPEEDS } from "./appshotApi-Dd25bfhQ.js";
import { t as QuickTooltip } from "./tooltip-R5sCoxZW.js";
import { AppshotEditor } from "./AppshotEditor-C3ni06r0.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var SkipBack = createLucideIcon("SkipBack", [["polygon", {
	points: "19 20 9 12 19 4 19 20",
	key: "o2sva"
}], ["line", {
	x1: "5",
	x2: "5",
	y1: "19",
	y2: "5",
	key: "1ocqjk"
}]]);
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var SkipForward = createLucideIcon("SkipForward", [["polygon", {
	points: "5 4 15 12 5 20 5 4",
	key: "16p6eg"
}], ["line", {
	x1: "19",
	x2: "19",
	y1: "5",
	y2: "19",
	key: "futhcm"
}]]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var MIN_CLIP_S = .5;
var MAX_THUMBS = 14;
var FRAME_S = 1 / 30;
function formatVideoTime(seconds, precise = true) {
	const s = Math.max(0, seconds);
	const hours = Math.floor(s / 3600);
	const minutes = Math.floor(s % 3600 / 60);
	const whole = Math.floor(s % 60);
	if (hours) return `${hours}:${String(minutes).padStart(2, "0")}:${String(whole).padStart(2, "0")}`;
	const tenth = precise ? `.${Math.floor(s * 10 % 10)}` : "";
	return `${minutes}:${String(whole).padStart(2, "0")}${tenth}`;
}
function moveTrimEdge(trim, edge, at, duration) {
	const min = Math.min(MIN_CLIP_S, duration);
	if (edge === "start") return {
		...trim,
		start: Math.max(0, Math.min(at, trim.end - min))
	};
	return {
		...trim,
		end: Math.min(duration, Math.max(at, trim.start + min))
	};
}
function AppshotVideoEditor({ recordingId, onClose }) {
	const t = useT();
	const ready = useLocaleChunk("appshot_editor");
	const label = (key) => ready ? t(`appshot_editor.${key}`) : "";
	const native = useCapabilities().data?.native_file_actions ?? false;
	const pushToast = useEventStore((s) => s.pushToast);
	const src = appshotRecordingUrl(recordingId);
	const videoRef = (0, import_react.useRef)(null);
	const trackRef = (0, import_react.useRef)(null);
	const [load, setLoad] = (0, import_react.useState)("loading");
	const [duration, setDuration] = (0, import_react.useState)(0);
	const [size, setSize] = (0, import_react.useState)([0, 0]);
	const [time, setTime] = (0, import_react.useState)(0);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [speed, setSpeed] = (0, import_react.useState)(1);
	const [trim, setTrim] = (0, import_react.useState)({
		start: 0,
		end: 0
	});
	const trimRef = (0, import_react.useRef)(trim);
	trimRef.current = trim;
	const [drag, setDrag] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const thumbs = useFilmStrip(src, load === "ready" ? duration : 0, size);
	const trimmed = duration > 0 && (trim.start > .05 || trim.end < duration - .05);
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		let frame = 0;
		const step = () => {
			const video = videoRef.current;
			if (!video) return;
			const { end } = trimRef.current;
			if (video.currentTime >= end - .01) {
				video.pause();
				video.currentTime = end;
				setTime(end);
				return;
			}
			setTime(video.currentTime);
			frame = requestAnimationFrame(step);
		};
		frame = requestAnimationFrame(step);
		return () => cancelAnimationFrame(frame);
	}, [playing]);
	(0, import_react.useEffect)(() => {
		if (videoRef.current) videoRef.current.playbackRate = speed;
	}, [speed]);
	const seek = (0, import_react.useCallback)((at) => {
		const video = videoRef.current;
		if (!video || !duration) return;
		const clamped = Math.max(0, Math.min(at, duration));
		video.currentTime = clamped;
		setTime(clamped);
	}, [duration]);
	const toggle = (0, import_react.useCallback)(() => {
		const video = videoRef.current;
		if (!video || load !== "ready") return;
		if (!video.paused) {
			video.pause();
			return;
		}
		const { start, end } = trimRef.current;
		if (video.currentTime >= end - .05 || video.currentTime < start) video.currentTime = start;
		video.play().catch(() => void 0);
	}, [load]);
	const save = (0, import_react.useCallback)(async () => {
		if (load !== "ready" || saving) return;
		setSaving(true);
		try {
			const { id } = !trimmed && speed === 1 ? { id: recordingId } : await exportAppshotRecording(recordingId, {
				start_s: trim.start,
				end_s: trim.end,
				speed
			});
			if (native) {
				const { path, filename } = await saveAppshotRecording(id);
				pushToast("success", fill(t("appshot_editor.saved_to"), { 0: path }), {
					filePath: path,
					filename
				});
			} else {
				const link = document.createElement("a");
				link.href = appshotRecordingUrl(id);
				link.download = `recording-${id.slice(0, 6)}.mp4`;
				link.click();
			}
		} catch (error) {
			pushToast("error", fill(t("appshot_editor.save_failed"), { 0: error.message }));
		} finally {
			setSaving(false);
		}
	}, [
		load,
		native,
		pushToast,
		recordingId,
		saving,
		speed,
		t,
		trim,
		trimmed
	]);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			const target = event.target;
			if (target instanceof Element && target.closest("input, textarea, [contenteditable]")) return;
			const video = videoRef.current;
			const now = video?.currentTime ?? time;
			const key = event.key;
			if ((event.ctrlKey || event.metaKey) && key.toLowerCase() === "s") {
				event.preventDefault();
				save();
				return;
			}
			if (event.ctrlKey || event.metaKey || event.altKey) return;
			if ((() => {
				switch (key) {
					case " ":
					case "k":
					case "K":
						toggle();
						return true;
					case "ArrowLeft":
						seek(now - (event.shiftKey ? 5 : 1));
						return true;
					case "ArrowRight":
						seek(now + (event.shiftKey ? 5 : 1));
						return true;
					case ",":
						video?.pause();
						seek(now - FRAME_S);
						return true;
					case ".":
						video?.pause();
						seek(now + FRAME_S);
						return true;
					case "Home":
						seek(trimRef.current.start);
						return true;
					case "End":
						seek(trimRef.current.end);
						return true;
					case "i":
					case "I":
						setTrim((current) => moveTrimEdge(current, "start", now, duration));
						return true;
					case "o":
					case "O":
						setTrim((current) => moveTrimEdge(current, "end", now, duration));
						return true;
					case "Escape":
						onClose();
						return true;
					default: return false;
				}
			})()) event.preventDefault();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		duration,
		onClose,
		save,
		seek,
		time,
		toggle
	]);
	const timeAt = (0, import_react.useCallback)((clientX) => {
		const track = trackRef.current;
		if (!track || !duration) return 0;
		const box = track.getBoundingClientRect();
		return Math.max(0, Math.min(1, (clientX - box.left) / box.width)) * duration;
	}, [duration]);
	const onTrackDown = (event, kind) => {
		if (event.button !== 0 || load !== "ready") return;
		event.preventDefault();
		event.stopPropagation();
		event.currentTarget.setPointerCapture?.(event.pointerId);
		setDrag({ kind });
		const at = timeAt(event.clientX);
		if (kind === "scrub") seek(at);
	};
	const onTrackMove = (event) => {
		if (!drag) return;
		const at = timeAt(event.clientX);
		if (drag.kind === "scrub") {
			seek(at);
			return;
		}
		const next = moveTrimEdge(trimRef.current, drag.kind, at, duration);
		setTrim(next);
		seek(drag.kind === "start" ? next.start : next.end);
	};
	const onTrackUp = () => setDrag(null);
	const pct = (seconds) => duration ? `${seconds / duration * 100}%` : "0%";
	const clipLength = Math.max(0, trim.end - trim.start) / speed;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-full w-full flex-col overflow-hidden bg-popover text-popover-foreground",
		"data-testid": "appshot-video-editor",
		"data-native": native,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-12 shrink-0 items-center gap-2 border-b border-border px-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-2 pl-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, {
								className: "h-4 w-4 shrink-0 text-muted-foreground",
								"aria-hidden": true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-[13px] font-semibold",
								children: label("video_title")
							}),
							size[0] > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-md bg-foreground/[0.06] px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-muted-foreground",
								children: [
									size[0],
									" × ",
									size[1]
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pywebview-drag-region h-full min-w-4 flex-1",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
								content: `${label("video_save_hint")} (Ctrl+S)`,
								side: "bottom",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => void save(),
									disabled: load !== "ready" || saving,
									"data-testid": "appshot-video-save",
									className: "flex h-7 items-center gap-1.5 rounded-lg bg-accent px-3.5 text-[13px] font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-50",
									children: [saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
										className: "h-3.5 w-3.5 animate-spin",
										"aria-hidden": true
									}), saving ? label("video_saving") : label("save")]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-0.5 h-5 w-px shrink-0 bg-border",
								"aria-hidden": true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
								content: `${label("close")} (Esc)`,
								side: "bottom",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: onClose,
									"aria-label": label("close"),
									"data-testid": "appshot-video-close",
									className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
										className: "h-4 w-4",
										"aria-hidden": true
									})
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative flex min-h-0 flex-1 items-center justify-center bg-background/70 p-5",
				children: load === "failed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex max-w-sm flex-col items-center gap-3 text-center",
					"data-testid": "appshot-video-failed",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base text-muted-foreground",
						children: label("video_gone")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						size: "sm",
						onClick: onClose,
						children: label("close")
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						ref: videoRef,
						src,
						preload: "auto",
						playsInline: true,
						onClick: toggle,
						onLoadedMetadata: (event) => {
							const video = event.currentTarget;
							const length = Number.isFinite(video.duration) ? video.duration : 0;
							setDuration(length);
							setSize([video.videoWidth, video.videoHeight]);
							setTrim({
								start: 0,
								end: length
							});
							video.playbackRate = speed;
							setLoad("ready");
						},
						onError: () => setLoad("failed"),
						onPlay: () => setPlaying(true),
						onPause: () => setPlaying(false),
						onSeeked: (event) => setTime(event.currentTarget.currentTime),
						className: cn("max-h-full max-w-full cursor-pointer rounded-xl bg-black shadow-2xl ring-1 ring-border transition-opacity duration-200", load === "ready" ? "opacity-100" : "opacity-0"),
						"data-testid": "appshot-video"
					}),
					load === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 flex items-center justify-center gap-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							className: "h-4 w-4 animate-spin",
							"aria-hidden": true
						}), label("video_loading")]
					}),
					load === "ready" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: toggle,
						"aria-label": label("video_play"),
						tabIndex: -1,
						className: cn("absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white shadow-xl ring-1 ring-white/20 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-black/60", playing ? "pointer-events-none scale-90 opacity-0" : "opacity-100"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
							className: "ml-1 h-7 w-7 fill-current",
							"aria-hidden": true
						})
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shrink-0 space-y-3 border-t border-border px-4 pb-3 pt-3.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						ref: trackRef,
						role: "slider",
						"aria-label": label("video_timeline"),
						"aria-valuemin": 0,
						"aria-valuemax": Math.round(duration * 10) / 10,
						"aria-valuenow": Math.round(time * 10) / 10,
						tabIndex: -1,
						onPointerDown: (event) => onTrackDown(event, "scrub"),
						onPointerMove: onTrackMove,
						onPointerUp: onTrackUp,
						onPointerCancel: onTrackUp,
						className: cn("relative h-14 select-none overflow-hidden rounded-xl border border-border bg-foreground/[0.05]", load === "ready" ? "cursor-pointer" : "pointer-events-none opacity-60"),
						"data-testid": "appshot-video-timeline",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 flex",
								children: thumbs.map((thumb, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full min-w-0 flex-1 overflow-hidden border-r border-black/20 last:border-r-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: thumb,
										alt: "",
										draggable: false,
										className: "h-full w-full object-cover animate-in fade-in-0 duration-300"
									})
								}, index))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute inset-y-0 left-0 bg-black/55",
								style: { width: pct(trim.start) }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute inset-y-0 right-0 bg-black/55",
								style: { width: `calc(100% - ${pct(trim.end)})` }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute inset-y-0 rounded-[10px] border-2 border-accent",
								style: {
									left: pct(trim.start),
									width: `calc(${pct(trim.end)} - ${pct(trim.start)})`
								}
							}),
							["start", "end"].map((edge) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								role: "separator",
								"aria-label": `${label(edge === "start" ? "video_trim_start" : "video_trim_end")} (${edge === "start" ? "I" : "O"})`,
								onPointerDown: (event) => onTrackDown(event, edge),
								onPointerMove: onTrackMove,
								onPointerUp: onTrackUp,
								onPointerCancel: onTrackUp,
								className: cn("absolute inset-y-0 z-10 flex w-3.5 cursor-ew-resize items-center justify-center bg-accent transition-[filter] hover:brightness-110", edge === "start" ? "rounded-l-[10px]" : "-translate-x-full rounded-r-[10px]"),
								style: { left: pct(edge === "start" ? trim.start : trim.end) },
								"data-testid": `appshot-video-trim-${edge}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-5 w-[3px] rounded-full bg-accent-foreground/80",
									"aria-hidden": true
								})
							}, edge)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("pointer-events-none absolute inset-y-0 z-20 w-0", drag?.kind === "scrub" ? "" : "transition-[left] duration-75 ease-linear"),
								style: { left: pct(time) },
								"data-testid": "appshot-video-playhead",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.35)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-[5px] -top-0.5 h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.35)]" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[1fr_auto_1fr] items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 items-baseline gap-1.5 text-[13px] tabular-nums",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: formatVideoTime(time)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: ["/ ", formatVideoTime(duration)]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
										content: `${label("video_to_start")} (Home)`,
										side: "top",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => seek(trim.start),
											disabled: load !== "ready",
											"aria-label": label("video_to_start"),
											className: "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground disabled:opacity-40",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipBack, {
												className: "h-4 w-4 fill-current",
												"aria-hidden": true
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
										content: `${label(playing ? "video_pause" : "video_play")} (Space)`,
										side: "top",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: toggle,
											disabled: load !== "ready",
											"aria-label": label(playing ? "video_pause" : "video_play"),
											"data-testid": "appshot-video-play",
											className: "flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background shadow-md transition-transform hover:scale-105 active:scale-95 disabled:opacity-40",
											children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {
												className: "h-[18px] w-[18px] fill-current",
												"aria-hidden": true
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
												className: "ml-0.5 h-[18px] w-[18px] fill-current",
												"aria-hidden": true
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
										content: `${label("video_to_end")} (End)`,
										side: "top",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => seek(trim.end),
											disabled: load !== "ready",
											"aria-label": label("video_to_end"),
											className: "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground disabled:opacity-40",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, {
												className: "h-4 w-4 fill-current",
												"aria-hidden": true
											})
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 items-center justify-end gap-2",
								children: [
									trimmed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
										content: label("video_trim_reset"),
										side: "top",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setTrim({
												start: 0,
												end: duration
											}),
											"aria-label": label("video_trim_reset"),
											"data-testid": "appshot-video-trim-reset",
											className: "flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
												className: "h-3.5 w-3.5",
												"aria-hidden": true
											})
										})
									}),
									(trimmed || speed !== 1) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden whitespace-nowrap text-[12px] tabular-nums text-muted-foreground sm:inline",
										"data-testid": "appshot-video-clip-length",
										children: fill(label("video_clip_length"), { 0: formatVideoTime(clipLength, false) })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-0.5 rounded-xl border border-border bg-foreground/[0.04] p-0.5",
										role: "group",
										"aria-label": label("video_speed"),
										"data-testid": "appshot-video-speed",
										children: RECORDING_SPEEDS.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setSpeed(value),
											"aria-pressed": speed === value,
											className: cn("h-6 rounded-lg px-2 text-[12px] font-medium tabular-nums transition-colors", speed === value ? "bg-accent text-accent-foreground shadow-sm" : "text-muted-foreground hover:bg-foreground/10 hover:text-foreground"),
											children: [value, "×"]
										}, value))
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-[11px] text-muted-foreground/80",
						children: label("video_shortcuts")
					})
				]
			})
		]
	});
}
function useFilmStrip(src, duration, size) {
	const [thumbs, setThumbs] = (0, import_react.useState)([]);
	const count = (0, import_react.useMemo)(() => {
		if (!duration || !size[0] || !size[1]) return 0;
		return Math.max(4, Math.min(MAX_THUMBS, Math.round(duration / 2) + 4));
	}, [duration, size]);
	(0, import_react.useEffect)(() => {
		setThumbs([]);
		if (!count) return;
		let cancelled = false;
		const video = document.createElement("video");
		video.muted = true;
		video.preload = "auto";
		video.src = src;
		const canvas = document.createElement("canvas");
		const height = 96;
		canvas.height = height;
		canvas.width = Math.max(1, Math.round(height * size[0] / size[1]));
		const ctx = canvas.getContext("2d");
		const grab = (at) => new Promise((resolve, reject) => {
			const done = () => {
				video.removeEventListener("seeked", done);
				video.removeEventListener("error", fail);
				try {
					ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
					resolve(canvas.toDataURL("image/jpeg", .72));
				} catch (error) {
					reject(error);
				}
			};
			const fail = () => reject(/* @__PURE__ */ new Error("seek failed"));
			video.addEventListener("seeked", done);
			video.addEventListener("error", fail);
			video.currentTime = at;
		});
		(async () => {
			try {
				await new Promise((resolve, reject) => {
					if (video.readyState >= 1) resolve();
					video.addEventListener("loadedmetadata", () => resolve(), { once: true });
					video.addEventListener("error", () => reject(/* @__PURE__ */ new Error("load failed")), { once: true });
				});
				for (let i = 0; i < count && !cancelled; i += 1) {
					const frame = await grab((i + .5) * duration / count);
					if (!cancelled) setThumbs((current) => [...current, frame]);
				}
			} catch {}
		})();
		return () => {
			cancelled = true;
			video.removeAttribute("src");
			video.load();
		};
	}, [
		count,
		duration,
		size,
		src
	]);
	return thumbs.length ? [...thumbs, ...Array(Math.max(0, count - thumbs.length)).fill("")].map((thumb) => thumb || TRANSPARENT) : [];
}
var TRANSPARENT = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
const APPSHOT_EDITOR_VIEW = "appshot-editor";
function appshotIdFromUrl(search) {
	const id = new URLSearchParams(search).get("appshot") ?? "";
	return /^[0-9a-f]{8,64}$/.test(id) ? id : "";
}
function recordingIdFromUrl(search) {
	const id = new URLSearchParams(search).get("recording") ?? "";
	return /^[0-9a-f]{32}$/.test(id) ? id : "";
}
function isAppshotEditorWindow(search) {
	return new URLSearchParams(search).get("view") === APPSHOT_EDITOR_VIEW;
}
function rememberEditorTarget(kind, id) {
	const url = new URL(window.location.href);
	url.searchParams.delete("appshot");
	url.searchParams.delete("recording");
	if (id) url.searchParams.set(kind, id);
	const next = `${url.pathname}${url.search}${url.hash}`;
	if (next !== `${window.location.pathname}${window.location.search}${window.location.hash}`) window.history.replaceState(null, "", next);
}
var browserDeps = {
	returnCard: (id, flyFrom) => fetch("/api/appshot/latest/card", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(flyFrom ? {
			id,
			fly_from: flyFrom
		} : { id })
	}),
	closeWindow: () => fetch("/api/window/reattach", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ view: APPSHOT_EDITOR_VIEW })
	})
};
function AppshotEditorWindow({ deps = browserDeps }) {
	const [appshotId, setAppshotId] = (0, import_react.useState)(() => appshotIdFromUrl(window.location.search));
	const [recordingId, setRecordingId] = (0, import_react.useState)(() => appshotIdFromUrl(window.location.search) ? "" : recordingIdFromUrl(window.location.search));
	const [session, setSession] = (0, import_react.useState)(0);
	const closing = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		loadLocaleChunk("appshot_editor").catch(() => void 0);
		window.__jarvisOpenAppshot = (id) => {
			const valid = appshotIdFromUrl(`?appshot=${encodeURIComponent(id)}`);
			if (!valid) return false;
			closing.current = false;
			rememberEditorTarget("appshot", valid);
			setRecordingId("");
			setAppshotId(valid);
			setSession((n) => n + 1);
			return true;
		};
		window.__jarvisOpenRecording = (id) => {
			const valid = recordingIdFromUrl(`?recording=${encodeURIComponent(id)}`);
			if (!valid) return false;
			closing.current = false;
			rememberEditorTarget("recording", valid);
			setAppshotId("");
			setRecordingId(valid);
			setSession((n) => n + 1);
			return true;
		};
		return () => {
			delete window.__jarvisOpenAppshot;
			delete window.__jarvisOpenRecording;
		};
	}, []);
	const close = (0, import_react.useCallback)((exit) => {
		if (closing.current) return;
		closing.current = true;
		deps.returnCard(appshotId, exit?.flyFrom).catch(() => void 0).finally(() => {
			setAppshotId("");
			rememberEditorTarget("appshot", "");
			deps.closeWindow().catch(() => void 0);
		});
	}, [appshotId, deps]);
	const closeVideo = (0, import_react.useCallback)(() => {
		if (closing.current) return;
		closing.current = true;
		setRecordingId("");
		rememberEditorTarget("recording", "");
		deps.closeWindow().catch(() => void 0);
	}, [deps]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 overflow-hidden bg-popover",
		"data-testid": "appshot-editor-window",
		children: [
			appshotId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppshotEditor, {
				appshotId,
				onClose: close,
				variant: "window"
			}, session),
			!appshotId && recordingId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppshotVideoEditor, {
				recordingId,
				onClose: closeVideo
			}, session),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastLayer, {})
		]
	});
}
export { APPSHOT_EDITOR_VIEW, AppshotEditorWindow, appshotIdFromUrl, isAppshotEditorWindow, recordingIdFromUrl };
