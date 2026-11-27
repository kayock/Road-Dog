import { Bc as require_jsx_runtime, Xc as require_react, Zc as __commonJSMin, tl as __toESM } from "./index-BOzhgzD7.js";
import { $t as Layers, Da as Vector3, Ea as Vector2, Fi as Scene, Lr as RGBAFormat, M as Clock, T as Camera, Ta as VSMShadowMap, _a as UnsignedByteType, _r as OrthographicCamera, a as ACESFilmicToneMapping, i as three_module_exports, r as WebGLRenderer, tr as NoToneMapping, v as BasicShadowMap, vi as Raycaster, vr as PCFShadowMap, xr as PerspectiveCamera, yr as PCFSoftShadowMap } from "./three.module-CsntsSp5.js";
/**
* @license React
* react-reconciler-constants.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_reconciler_constants_production_min = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.ConcurrentRoot = 1;
	exports.ContinuousEventPriority = 4;
	exports.DefaultEventPriority = 16;
	exports.DiscreteEventPriority = 1;
}));
var require_constants = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_reconciler_constants_production_min();
}));
var import_react = /* @__PURE__ */ __toESM(require_react());
function createStore$1(createState) {
	let state;
	const listeners = /* @__PURE__ */ new Set();
	const setState = (partial, replace) => {
		const nextState = typeof partial === "function" ? partial(state) : partial;
		if (nextState !== state) {
			const previousState = state;
			state = replace ? nextState : Object.assign({}, state, nextState);
			listeners.forEach((listener) => listener(state, previousState));
		}
	};
	const getState = () => state;
	const subscribeWithSelector = (listener, selector = getState, equalityFn = Object.is) => {
		console.warn("[DEPRECATED] Please use `subscribeWithSelector` middleware");
		let currentSlice = selector(state);
		function listenerToAdd() {
			const nextSlice = selector(state);
			if (!equalityFn(currentSlice, nextSlice)) {
				const previousSlice = currentSlice;
				listener(currentSlice = nextSlice, previousSlice);
			}
		}
		listeners.add(listenerToAdd);
		return () => listeners.delete(listenerToAdd);
	};
	const subscribe = (listener, selector, equalityFn) => {
		if (selector || equalityFn) return subscribeWithSelector(listener, selector, equalityFn);
		listeners.add(listener);
		return () => listeners.delete(listener);
	};
	const destroy = () => listeners.clear();
	const api = {
		setState,
		getState,
		subscribe,
		destroy
	};
	state = createState(setState, getState, api);
	return api;
}
var useIsomorphicLayoutEffect$2 = typeof window === "undefined" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent) ? import_react.useEffect : import_react.useLayoutEffect;
function create(createState) {
	const api = typeof createState === "function" ? createStore$1(createState) : createState;
	const useStore$1 = (selector = api.getState, equalityFn = Object.is) => {
		const [, forceUpdate] = (0, import_react.useReducer)((c) => c + 1, 0);
		const state = api.getState();
		const stateRef = (0, import_react.useRef)(state);
		const selectorRef = (0, import_react.useRef)(selector);
		const equalityFnRef = (0, import_react.useRef)(equalityFn);
		const erroredRef = (0, import_react.useRef)(false);
		const currentSliceRef = (0, import_react.useRef)();
		if (currentSliceRef.current === void 0) currentSliceRef.current = selector(state);
		let newStateSlice;
		let hasNewStateSlice = false;
		if (stateRef.current !== state || selectorRef.current !== selector || equalityFnRef.current !== equalityFn || erroredRef.current) {
			newStateSlice = selector(state);
			hasNewStateSlice = !equalityFn(currentSliceRef.current, newStateSlice);
		}
		useIsomorphicLayoutEffect$2(() => {
			if (hasNewStateSlice) currentSliceRef.current = newStateSlice;
			stateRef.current = state;
			selectorRef.current = selector;
			equalityFnRef.current = equalityFn;
			erroredRef.current = false;
		});
		const stateBeforeSubscriptionRef = (0, import_react.useRef)(state);
		useIsomorphicLayoutEffect$2(() => {
			const listener = () => {
				try {
					const nextState = api.getState();
					const nextStateSlice = selectorRef.current(nextState);
					if (!equalityFnRef.current(currentSliceRef.current, nextStateSlice)) {
						stateRef.current = nextState;
						currentSliceRef.current = nextStateSlice;
						forceUpdate();
					}
				} catch (error$1) {
					erroredRef.current = true;
					forceUpdate();
				}
			};
			const unsubscribe = api.subscribe(listener);
			if (api.getState() !== stateBeforeSubscriptionRef.current) listener();
			return unsubscribe;
		}, []);
		const sliceToReturn = hasNewStateSlice ? newStateSlice : currentSliceRef.current;
		(0, import_react.useDebugValue)(sliceToReturn);
		return sliceToReturn;
	};
	Object.assign(useStore$1, api);
	useStore$1[Symbol.iterator] = function() {
		console.warn("[useStore, api] = create() is deprecated and will be removed in v4");
		const items = [useStore$1, api];
		return { next() {
			const done = items.length <= 0;
			return {
				value: items.shift(),
				done
			};
		} };
	};
	return useStore$1;
}
var isPromise = (promise) => typeof promise === "object" && typeof promise.then === "function";
var globalCache = [];
function shallowEqualArrays(arrA, arrB, equal = (a, b) => a === b) {
	if (arrA === arrB) return true;
	if (!arrA || !arrB) return false;
	const len = arrA.length;
	if (arrB.length !== len) return false;
	for (let i$1 = 0; i$1 < len; i$1++) if (!equal(arrA[i$1], arrB[i$1])) return false;
	return true;
}
function query(fn, keys = null, preload$1 = false, config = {}) {
	if (keys === null) keys = [fn];
	for (const entry$1 of globalCache) if (shallowEqualArrays(keys, entry$1.keys, entry$1.equal)) {
		if (preload$1) return void 0;
		if (Object.prototype.hasOwnProperty.call(entry$1, "error")) throw entry$1.error;
		if (Object.prototype.hasOwnProperty.call(entry$1, "response")) {
			if (config.lifespan && config.lifespan > 0) {
				if (entry$1.timeout) clearTimeout(entry$1.timeout);
				entry$1.timeout = setTimeout(entry$1.remove, config.lifespan);
			}
			return entry$1.response;
		}
		if (!preload$1) throw entry$1.promise;
	}
	const entry = {
		keys,
		equal: config.equal,
		remove: () => {
			const index = globalCache.indexOf(entry);
			if (index !== -1) globalCache.splice(index, 1);
		},
		promise: (isPromise(fn) ? fn : fn(...keys)).then((response) => {
			entry.response = response;
			if (config.lifespan && config.lifespan > 0) entry.timeout = setTimeout(entry.remove, config.lifespan);
		}).catch((error$1) => entry.error = error$1)
	};
	globalCache.push(entry);
	if (!preload$1) throw entry.promise;
}
var suspend = (fn, keys, config) => query(fn, keys, false, config);
var preload = (fn, keys, config) => void query(fn, keys, true, config);
var clear = (keys) => {
	if (keys === void 0 || keys.length === 0) globalCache.splice(0, globalCache.length);
	else {
		const entry = globalCache.find((entry$1) => shallowEqualArrays(keys, entry$1.keys, entry$1.equal));
		if (entry) entry.remove();
	}
};
/**
* @license React
* scheduler.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_scheduler_production_min$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	function f$1(a, b) {
		var c = a.length;
		a.push(b);
		a: for (; 0 < c;) {
			var d = c - 1 >>> 1, e = a[d];
			if (0 < g$2(e, b)) a[d] = b, a[c] = e, c = d;
			else break a;
		}
	}
	function h$1(a) {
		return 0 === a.length ? null : a[0];
	}
	function k$2(a) {
		if (0 === a.length) return null;
		var b = a[0], c = a.pop();
		if (c !== b) {
			a[0] = c;
			a: for (var d = 0, e = a.length, w = e >>> 1; d < w;) {
				var m = 2 * (d + 1) - 1, C = a[m], n = m + 1, x = a[n];
				if (0 > g$2(C, c)) n < e && 0 > g$2(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m] = c, d = m);
				else if (n < e && 0 > g$2(x, c)) a[d] = x, a[n] = c, d = n;
				else break a;
			}
		}
		return b;
	}
	function g$2(a, b) {
		var c = a.sortIndex - b.sortIndex;
		return 0 !== c ? c : a.id - b.id;
	}
	if ("object" === typeof performance && "function" === typeof performance.now) {
		var l$1 = performance;
		exports.unstable_now = function() {
			return l$1.now();
		};
	} else {
		var p$2 = Date, q$1 = p$2.now();
		exports.unstable_now = function() {
			return p$2.now() - q$1;
		};
	}
	var r$1 = [], t$1 = [], u$2 = 1, v$1 = null, y$1 = 3, z$1 = !1, A$1 = !1, B$1 = !1, D$2 = "function" === typeof setTimeout ? setTimeout : null, E$2 = "function" === typeof clearTimeout ? clearTimeout : null, F$1 = "undefined" !== typeof setImmediate ? setImmediate : null;
	"undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
	function G$1(a) {
		for (var b = h$1(t$1); null !== b;) {
			if (null === b.callback) k$2(t$1);
			else if (b.startTime <= a) k$2(t$1), b.sortIndex = b.expirationTime, f$1(r$1, b);
			else break;
			b = h$1(t$1);
		}
	}
	function H$1(a) {
		B$1 = !1;
		G$1(a);
		if (!A$1) if (null !== h$1(r$1)) A$1 = !0, I$1(J$1);
		else {
			var b = h$1(t$1);
			null !== b && K$1(H$1, b.startTime - a);
		}
	}
	function J$1(a, b) {
		A$1 = !1;
		B$1 && (B$1 = !1, E$2(L$1), L$1 = -1);
		z$1 = !0;
		var c = y$1;
		try {
			G$1(b);
			for (v$1 = h$1(r$1); null !== v$1 && (!(v$1.expirationTime > b) || a && !M$2());) {
				var d = v$1.callback;
				if ("function" === typeof d) {
					v$1.callback = null;
					y$1 = v$1.priorityLevel;
					var e = d(v$1.expirationTime <= b);
					b = exports.unstable_now();
					"function" === typeof e ? v$1.callback = e : v$1 === h$1(r$1) && k$2(r$1);
					G$1(b);
				} else k$2(r$1);
				v$1 = h$1(r$1);
			}
			if (null !== v$1) var w = !0;
			else {
				var m = h$1(t$1);
				null !== m && K$1(H$1, m.startTime - b);
				w = !1;
			}
			return w;
		} finally {
			v$1 = null, y$1 = c, z$1 = !1;
		}
	}
	var N$1 = !1, O$1 = null, L$1 = -1, P$1 = 5, Q$1 = -1;
	function M$2() {
		return exports.unstable_now() - Q$1 < P$1 ? !1 : !0;
	}
	function R$1() {
		if (null !== O$1) {
			var a = exports.unstable_now();
			Q$1 = a;
			var b = !0;
			try {
				b = O$1(!0, a);
			} finally {
				b ? S$1() : (N$1 = !1, O$1 = null);
			}
		} else N$1 = !1;
	}
	var S$1;
	if ("function" === typeof F$1) S$1 = function() {
		F$1(R$1);
	};
	else if ("undefined" !== typeof MessageChannel) {
		var T$2 = new MessageChannel(), U$1 = T$2.port2;
		T$2.port1.onmessage = R$1;
		S$1 = function() {
			U$1.postMessage(null);
		};
	} else S$1 = function() {
		D$2(R$1, 0);
	};
	function I$1(a) {
		O$1 = a;
		N$1 || (N$1 = !0, S$1());
	}
	function K$1(a, b) {
		L$1 = D$2(function() {
			a(exports.unstable_now());
		}, b);
	}
	exports.unstable_IdlePriority = 5;
	exports.unstable_ImmediatePriority = 1;
	exports.unstable_LowPriority = 4;
	exports.unstable_NormalPriority = 3;
	exports.unstable_Profiling = null;
	exports.unstable_UserBlockingPriority = 2;
	exports.unstable_cancelCallback = function(a) {
		a.callback = null;
	};
	exports.unstable_continueExecution = function() {
		A$1 || z$1 || (A$1 = !0, I$1(J$1));
	};
	exports.unstable_forceFrameRate = function(a) {
		0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P$1 = 0 < a ? Math.floor(1e3 / a) : 5;
	};
	exports.unstable_getCurrentPriorityLevel = function() {
		return y$1;
	};
	exports.unstable_getFirstCallbackNode = function() {
		return h$1(r$1);
	};
	exports.unstable_next = function(a) {
		switch (y$1) {
			case 1:
			case 2:
			case 3:
				var b = 3;
				break;
			default: b = y$1;
		}
		var c = y$1;
		y$1 = b;
		try {
			return a();
		} finally {
			y$1 = c;
		}
	};
	exports.unstable_pauseExecution = function() {};
	exports.unstable_requestPaint = function() {};
	exports.unstable_runWithPriority = function(a, b) {
		switch (a) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: a = 3;
		}
		var c = y$1;
		y$1 = a;
		try {
			return b();
		} finally {
			y$1 = c;
		}
	};
	exports.unstable_scheduleCallback = function(a, b, c) {
		var d = exports.unstable_now();
		"object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
		switch (a) {
			case 1:
				var e = -1;
				break;
			case 2:
				e = 250;
				break;
			case 5:
				e = 1073741823;
				break;
			case 4:
				e = 1e4;
				break;
			default: e = 5e3;
		}
		e = c + e;
		a = {
			id: u$2++,
			callback: b,
			priorityLevel: a,
			startTime: c,
			expirationTime: e,
			sortIndex: -1
		};
		c > d ? (a.sortIndex = c, f$1(t$1, a), null === h$1(r$1) && a === h$1(t$1) && (B$1 ? (E$2(L$1), L$1 = -1) : B$1 = !0, K$1(H$1, c - d))) : (a.sortIndex = e, f$1(r$1, a), A$1 || z$1 || (A$1 = !0, I$1(J$1)));
		return a;
	};
	exports.unstable_shouldYield = M$2;
	exports.unstable_wrapCallback = function(a) {
		var b = y$1;
		return function() {
			var c = y$1;
			y$1 = b;
			try {
				return a.apply(this, arguments);
			} finally {
				y$1 = c;
			}
		};
	};
}));
var require_scheduler$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_scheduler_production_min$1();
}));
var require_react_reconciler_production_min = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* @license React
	* react-reconciler.production.min.js
	*
	* Copyright (c) Facebook, Inc. and its affiliates.
	*
	* This source code is licensed under the MIT license found in the
	* LICENSE file in the root directory of this source tree.
	*/
	module.exports = function $$$reconciler($$$hostConfig) {
		var exports$1 = {};
		var aa = require_react(), ba = require_scheduler$1(), ca = Object.assign;
		function n(a) {
			for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
			return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
		}
		var ea = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, fa = Symbol.for("react.element"), ha = Symbol.for("react.portal"), ia = Symbol.for("react.fragment"), ja = Symbol.for("react.strict_mode"), ka = Symbol.for("react.profiler"), la = Symbol.for("react.provider"), ma = Symbol.for("react.context"), na = Symbol.for("react.forward_ref"), oa = Symbol.for("react.suspense"), pa = Symbol.for("react.suspense_list"), qa = Symbol.for("react.memo"), ra = Symbol.for("react.lazy");
		var sa = Symbol.for("react.offscreen");
		var ta = Symbol.iterator;
		function ua(a) {
			if (null === a || "object" !== typeof a) return null;
			a = ta && a[ta] || a["@@iterator"];
			return "function" === typeof a ? a : null;
		}
		function va(a) {
			if (null == a) return null;
			if ("function" === typeof a) return a.displayName || a.name || null;
			if ("string" === typeof a) return a;
			switch (a) {
				case ia: return "Fragment";
				case ha: return "Portal";
				case ka: return "Profiler";
				case ja: return "StrictMode";
				case oa: return "Suspense";
				case pa: return "SuspenseList";
			}
			if ("object" === typeof a) switch (a.$$typeof) {
				case ma: return (a.displayName || "Context") + ".Consumer";
				case la: return (a._context.displayName || "Context") + ".Provider";
				case na:
					var b = a.render;
					a = a.displayName;
					a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
					return a;
				case qa: return b = a.displayName || null, null !== b ? b : va(a.type) || "Memo";
				case ra:
					b = a._payload;
					a = a._init;
					try {
						return va(a(b));
					} catch (c) {}
			}
			return null;
		}
		function xa(a) {
			var b = a.type;
			switch (a.tag) {
				case 24: return "Cache";
				case 9: return (b.displayName || "Context") + ".Consumer";
				case 10: return (b._context.displayName || "Context") + ".Provider";
				case 18: return "DehydratedFragment";
				case 11: return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
				case 7: return "Fragment";
				case 5: return b;
				case 4: return "Portal";
				case 3: return "Root";
				case 6: return "Text";
				case 16: return va(b);
				case 8: return b === ja ? "StrictMode" : "Mode";
				case 22: return "Offscreen";
				case 12: return "Profiler";
				case 21: return "Scope";
				case 13: return "Suspense";
				case 19: return "SuspenseList";
				case 25: return "TracingMarker";
				case 1:
				case 0:
				case 17:
				case 2:
				case 14:
				case 15:
					if ("function" === typeof b) return b.displayName || b.name || null;
					if ("string" === typeof b) return b;
			}
			return null;
		}
		function ya(a) {
			var b = a, c = a;
			if (a.alternate) for (; b.return;) b = b.return;
			else {
				a = b;
				do
					b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
				while (a);
			}
			return 3 === b.tag ? c : null;
		}
		function za(a) {
			if (ya(a) !== a) throw Error(n(188));
		}
		function Aa(a) {
			var b = a.alternate;
			if (!b) {
				b = ya(a);
				if (null === b) throw Error(n(188));
				return b !== a ? null : a;
			}
			for (var c = a, d = b;;) {
				var e = c.return;
				if (null === e) break;
				var f$2 = e.alternate;
				if (null === f$2) {
					d = e.return;
					if (null !== d) {
						c = d;
						continue;
					}
					break;
				}
				if (e.child === f$2.child) {
					for (f$2 = e.child; f$2;) {
						if (f$2 === c) return za(e), a;
						if (f$2 === d) return za(e), b;
						f$2 = f$2.sibling;
					}
					throw Error(n(188));
				}
				if (c.return !== d.return) c = e, d = f$2;
				else {
					for (var g$3 = !1, h$2 = e.child; h$2;) {
						if (h$2 === c) {
							g$3 = !0;
							c = e;
							d = f$2;
							break;
						}
						if (h$2 === d) {
							g$3 = !0;
							d = e;
							c = f$2;
							break;
						}
						h$2 = h$2.sibling;
					}
					if (!g$3) {
						for (h$2 = f$2.child; h$2;) {
							if (h$2 === c) {
								g$3 = !0;
								c = f$2;
								d = e;
								break;
							}
							if (h$2 === d) {
								g$3 = !0;
								d = f$2;
								c = e;
								break;
							}
							h$2 = h$2.sibling;
						}
						if (!g$3) throw Error(n(189));
					}
				}
				if (c.alternate !== d) throw Error(n(190));
			}
			if (3 !== c.tag) throw Error(n(188));
			return c.stateNode.current === c ? a : b;
		}
		function Ba(a) {
			a = Aa(a);
			return null !== a ? Ca(a) : null;
		}
		function Ca(a) {
			if (5 === a.tag || 6 === a.tag) return a;
			for (a = a.child; null !== a;) {
				var b = Ca(a);
				if (null !== b) return b;
				a = a.sibling;
			}
			return null;
		}
		function Da(a) {
			if (5 === a.tag || 6 === a.tag) return a;
			for (a = a.child; null !== a;) {
				if (4 !== a.tag) {
					var b = Da(a);
					if (null !== b) return b;
				}
				a = a.sibling;
			}
			return null;
		}
		var Ea = Array.isArray, Fa = $$$hostConfig.getPublicInstance, Ga = $$$hostConfig.getRootHostContext, Ha = $$$hostConfig.getChildHostContext, Ia = $$$hostConfig.prepareForCommit, Ja = $$$hostConfig.resetAfterCommit, Ka = $$$hostConfig.createInstance, La = $$$hostConfig.appendInitialChild, Ma = $$$hostConfig.finalizeInitialChildren, Na = $$$hostConfig.prepareUpdate, Oa = $$$hostConfig.shouldSetTextContent, Pa = $$$hostConfig.createTextInstance, Qa = $$$hostConfig.scheduleTimeout, Ra = $$$hostConfig.cancelTimeout, Sa = $$$hostConfig.noTimeout, Ta = $$$hostConfig.isPrimaryRenderer, Ua = $$$hostConfig.supportsMutation, Va = $$$hostConfig.supportsPersistence, p$3 = $$$hostConfig.supportsHydration, Wa = $$$hostConfig.getInstanceFromNode, Xa = $$$hostConfig.preparePortalMount, Ya = $$$hostConfig.getCurrentEventPriority, Za = $$$hostConfig.detachDeletedInstance, $a = $$$hostConfig.supportsMicrotasks, ab = $$$hostConfig.scheduleMicrotask, bb = $$$hostConfig.supportsTestSelectors, cb = $$$hostConfig.findFiberRoot, db = $$$hostConfig.getBoundingRect, eb = $$$hostConfig.getTextContent, fb = $$$hostConfig.isHiddenSubtree, gb = $$$hostConfig.matchAccessibilityRole, hb = $$$hostConfig.setFocusIfFocusable, ib = $$$hostConfig.setupIntersectionObserver, jb = $$$hostConfig.appendChild, kb = $$$hostConfig.appendChildToContainer, lb = $$$hostConfig.commitTextUpdate, mb = $$$hostConfig.commitMount, nb = $$$hostConfig.commitUpdate, ob = $$$hostConfig.insertBefore, pb = $$$hostConfig.insertInContainerBefore, qb = $$$hostConfig.removeChild, rb = $$$hostConfig.removeChildFromContainer, sb = $$$hostConfig.resetTextContent, tb = $$$hostConfig.hideInstance, ub = $$$hostConfig.hideTextInstance, vb = $$$hostConfig.unhideInstance, wb = $$$hostConfig.unhideTextInstance, xb = $$$hostConfig.clearContainer, yb = $$$hostConfig.cloneInstance, zb = $$$hostConfig.createContainerChildSet, Ab = $$$hostConfig.appendChildToContainerChildSet, Bb = $$$hostConfig.finalizeContainerChildren, Cb = $$$hostConfig.replaceContainerChildren, Db = $$$hostConfig.cloneHiddenInstance, Eb = $$$hostConfig.cloneHiddenTextInstance, Fb = $$$hostConfig.canHydrateInstance, Gb = $$$hostConfig.canHydrateTextInstance, Hb = $$$hostConfig.canHydrateSuspenseInstance, Ib = $$$hostConfig.isSuspenseInstancePending, Jb = $$$hostConfig.isSuspenseInstanceFallback, Kb = $$$hostConfig.registerSuspenseInstanceRetry, Lb = $$$hostConfig.getNextHydratableSibling, Mb = $$$hostConfig.getFirstHydratableChild, Nb = $$$hostConfig.getFirstHydratableChildWithinContainer, Ob = $$$hostConfig.getFirstHydratableChildWithinSuspenseInstance, Pb = $$$hostConfig.hydrateInstance, Qb = $$$hostConfig.hydrateTextInstance, Rb = $$$hostConfig.hydrateSuspenseInstance, Sb = $$$hostConfig.getNextHydratableInstanceAfterSuspenseInstance, Tb = $$$hostConfig.commitHydratedContainer, Ub = $$$hostConfig.commitHydratedSuspenseInstance, Vb = $$$hostConfig.clearSuspenseBoundary, Wb = $$$hostConfig.clearSuspenseBoundaryFromContainer, Xb = $$$hostConfig.shouldDeleteUnhydratedTailInstances, Yb = $$$hostConfig.didNotMatchHydratedContainerTextInstance, Zb = $$$hostConfig.didNotMatchHydratedTextInstance, $b;
		function ac(a) {
			if (void 0 === $b) try {
				throw Error();
			} catch (c) {
				var b = c.stack.trim().match(/\n( *(at )?)/);
				$b = b && b[1] || "";
			}
			return "\n" + $b + a;
		}
		var bc = !1;
		function cc(a, b) {
			if (!a || bc) return "";
			bc = !0;
			var c = Error.prepareStackTrace;
			Error.prepareStackTrace = void 0;
			try {
				if (b) if (b = function() {
					throw Error();
				}, Object.defineProperty(b.prototype, "props", { set: function() {
					throw Error();
				} }), "object" === typeof Reflect && Reflect.construct) {
					try {
						Reflect.construct(b, []);
					} catch (l$2) {
						var d = l$2;
					}
					Reflect.construct(a, [], b);
				} else {
					try {
						b.call();
					} catch (l$2) {
						d = l$2;
					}
					a.call(b.prototype);
				}
				else {
					try {
						throw Error();
					} catch (l$2) {
						d = l$2;
					}
					a();
				}
			} catch (l$2) {
				if (l$2 && d && "string" === typeof l$2.stack) {
					for (var e = l$2.stack.split("\n"), f$2 = d.stack.split("\n"), g$3 = e.length - 1, h$2 = f$2.length - 1; 1 <= g$3 && 0 <= h$2 && e[g$3] !== f$2[h$2];) h$2--;
					for (; 1 <= g$3 && 0 <= h$2; g$3--, h$2--) if (e[g$3] !== f$2[h$2]) {
						if (1 !== g$3 || 1 !== h$2) do
							if (g$3--, h$2--, 0 > h$2 || e[g$3] !== f$2[h$2]) {
								var k$3 = "\n" + e[g$3].replace(" at new ", " at ");
								a.displayName && k$3.includes("<anonymous>") && (k$3 = k$3.replace("<anonymous>", a.displayName));
								return k$3;
							}
						while (1 <= g$3 && 0 <= h$2);
						break;
					}
				}
			} finally {
				bc = !1, Error.prepareStackTrace = c;
			}
			return (a = a ? a.displayName || a.name : "") ? ac(a) : "";
		}
		var dc = Object.prototype.hasOwnProperty, ec = [], fc = -1;
		function gc(a) {
			return { current: a };
		}
		function x(a) {
			0 > fc || (a.current = ec[fc], ec[fc] = null, fc--);
		}
		function y$2(a, b) {
			fc++;
			ec[fc] = a.current;
			a.current = b;
		}
		var hc = {}, A$2 = gc(hc), B$2 = gc(!1), ic = hc;
		function jc(a, b) {
			var c = a.type.contextTypes;
			if (!c) return hc;
			var d = a.stateNode;
			if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
			var e = {}, f$2;
			for (f$2 in c) e[f$2] = b[f$2];
			d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
			return e;
		}
		function C(a) {
			a = a.childContextTypes;
			return null !== a && void 0 !== a;
		}
		function kc() {
			x(B$2);
			x(A$2);
		}
		function lc(a, b, c) {
			if (A$2.current !== hc) throw Error(n(168));
			y$2(A$2, b);
			y$2(B$2, c);
		}
		function mc(a, b, c) {
			var d = a.stateNode;
			b = b.childContextTypes;
			if ("function" !== typeof d.getChildContext) return c;
			d = d.getChildContext();
			for (var e in d) if (!(e in b)) throw Error(n(108, xa(a) || "Unknown", e));
			return ca({}, c, d);
		}
		function nc(a) {
			a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || hc;
			ic = A$2.current;
			y$2(A$2, a);
			y$2(B$2, B$2.current);
			return !0;
		}
		function oc(a, b, c) {
			var d = a.stateNode;
			if (!d) throw Error(n(169));
			c ? (a = mc(a, b, ic), d.__reactInternalMemoizedMergedChildContext = a, x(B$2), x(A$2), y$2(A$2, a)) : x(B$2);
			y$2(B$2, c);
		}
		var qc = Math.clz32 ? Math.clz32 : pc, rc = Math.log, sc = Math.LN2;
		function pc(a) {
			a >>>= 0;
			return 0 === a ? 32 : 31 - (rc(a) / sc | 0) | 0;
		}
		var tc = 64, uc = 4194304;
		function vc(a) {
			switch (a & -a) {
				case 1: return 1;
				case 2: return 2;
				case 4: return 4;
				case 8: return 8;
				case 16: return 16;
				case 32: return 32;
				case 64:
				case 128:
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072:
				case 262144:
				case 524288:
				case 1048576:
				case 2097152: return a & 4194240;
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432:
				case 67108864: return a & 130023424;
				case 134217728: return 134217728;
				case 268435456: return 268435456;
				case 536870912: return 536870912;
				case 1073741824: return 1073741824;
				default: return a;
			}
		}
		function wc(a, b) {
			var c = a.pendingLanes;
			if (0 === c) return 0;
			var d = 0, e = a.suspendedLanes, f$2 = a.pingedLanes, g$3 = c & 268435455;
			if (0 !== g$3) {
				var h$2 = g$3 & ~e;
				0 !== h$2 ? d = vc(h$2) : (f$2 &= g$3, 0 !== f$2 && (d = vc(f$2)));
			} else g$3 = c & ~e, 0 !== g$3 ? d = vc(g$3) : 0 !== f$2 && (d = vc(f$2));
			if (0 === d) return 0;
			if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f$2 = b & -b, e >= f$2 || 16 === e && 0 !== (f$2 & 4194240))) return b;
			0 !== (d & 4) && (d |= c & 16);
			b = a.entangledLanes;
			if (0 !== b) for (a = a.entanglements, b &= d; 0 < b;) c = 31 - qc(b), e = 1 << c, d |= a[c], b &= ~e;
			return d;
		}
		function xc(a, b) {
			switch (a) {
				case 1:
				case 2:
				case 4: return b + 250;
				case 8:
				case 16:
				case 32:
				case 64:
				case 128:
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072:
				case 262144:
				case 524288:
				case 1048576:
				case 2097152: return b + 5e3;
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432:
				case 67108864: return -1;
				case 134217728:
				case 268435456:
				case 536870912:
				case 1073741824: return -1;
				default: return -1;
			}
		}
		function yc(a, b) {
			for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f$2 = a.pendingLanes; 0 < f$2;) {
				var g$3 = 31 - qc(f$2), h$2 = 1 << g$3, k$3 = e[g$3];
				if (-1 === k$3) {
					if (0 === (h$2 & c) || 0 !== (h$2 & d)) e[g$3] = xc(h$2, b);
				} else k$3 <= b && (a.expiredLanes |= h$2);
				f$2 &= ~h$2;
			}
		}
		function zc(a) {
			a = a.pendingLanes & -1073741825;
			return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
		}
		function Ac(a) {
			for (var b = [], c = 0; 31 > c; c++) b.push(a);
			return b;
		}
		function Bc(a, b, c) {
			a.pendingLanes |= b;
			536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
			a = a.eventTimes;
			b = 31 - qc(b);
			a[b] = c;
		}
		function Cc(a, b) {
			var c = a.pendingLanes & ~b;
			a.pendingLanes = b;
			a.suspendedLanes = 0;
			a.pingedLanes = 0;
			a.expiredLanes &= b;
			a.mutableReadLanes &= b;
			a.entangledLanes &= b;
			b = a.entanglements;
			var d = a.eventTimes;
			for (a = a.expirationTimes; 0 < c;) {
				var e = 31 - qc(c), f$2 = 1 << e;
				b[e] = 0;
				d[e] = -1;
				a[e] = -1;
				c &= ~f$2;
			}
		}
		function Dc(a, b) {
			var c = a.entangledLanes |= b;
			for (a = a.entanglements; c;) {
				var d = 31 - qc(c), e = 1 << d;
				e & b | a[d] & b && (a[d] |= b);
				c &= ~e;
			}
		}
		var D$3 = 0;
		function Ec(a) {
			a &= -a;
			return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
		}
		var Fc = ba.unstable_scheduleCallback, Gc = ba.unstable_cancelCallback, Hc = ba.unstable_shouldYield, Ic = ba.unstable_requestPaint, E$3 = ba.unstable_now, Jc = ba.unstable_ImmediatePriority, Kc = ba.unstable_UserBlockingPriority, Lc = ba.unstable_NormalPriority, Mc = ba.unstable_IdlePriority, Nc = null, Oc = null;
		function Pc(a) {
			if (Oc && "function" === typeof Oc.onCommitFiberRoot) try {
				Oc.onCommitFiberRoot(Nc, a, void 0, 128 === (a.current.flags & 128));
			} catch (b) {}
		}
		function Qc(a, b) {
			return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
		}
		var Rc = "function" === typeof Object.is ? Object.is : Qc, Sc = null, Tc = !1, Uc = !1;
		function Vc(a) {
			null === Sc ? Sc = [a] : Sc.push(a);
		}
		function Wc(a) {
			Tc = !0;
			Vc(a);
		}
		function Xc() {
			if (!Uc && null !== Sc) {
				Uc = !0;
				var a = 0, b = D$3;
				try {
					var c = Sc;
					for (D$3 = 1; a < c.length; a++) {
						var d = c[a];
						do
							d = d(!0);
						while (null !== d);
					}
					Sc = null;
					Tc = !1;
				} catch (e) {
					throw null !== Sc && (Sc = Sc.slice(a + 1)), Fc(Jc, Xc), e;
				} finally {
					D$3 = b, Uc = !1;
				}
			}
			return null;
		}
		var Yc = ea.ReactCurrentBatchConfig;
		function Zc(a, b) {
			if (Rc(a, b)) return !0;
			if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return !1;
			var c = Object.keys(a), d = Object.keys(b);
			if (c.length !== d.length) return !1;
			for (d = 0; d < c.length; d++) {
				var e = c[d];
				if (!dc.call(b, e) || !Rc(a[e], b[e])) return !1;
			}
			return !0;
		}
		function $c(a) {
			switch (a.tag) {
				case 5: return ac(a.type);
				case 16: return ac("Lazy");
				case 13: return ac("Suspense");
				case 19: return ac("SuspenseList");
				case 0:
				case 2:
				case 15: return a = cc(a.type, !1), a;
				case 11: return a = cc(a.type.render, !1), a;
				case 1: return a = cc(a.type, !0), a;
				default: return "";
			}
		}
		function ad(a, b) {
			if (a && a.defaultProps) {
				b = ca({}, b);
				a = a.defaultProps;
				for (var c in a) void 0 === b[c] && (b[c] = a[c]);
				return b;
			}
			return b;
		}
		var bd = gc(null), cd = null, dd = null, ed = null;
		function fd() {
			ed = dd = cd = null;
		}
		function gd(a, b, c) {
			Ta ? (y$2(bd, b._currentValue), b._currentValue = c) : (y$2(bd, b._currentValue2), b._currentValue2 = c);
		}
		function hd(a) {
			var b = bd.current;
			x(bd);
			Ta ? a._currentValue = b : a._currentValue2 = b;
		}
		function id(a, b, c) {
			for (; null !== a;) {
				var d = a.alternate;
				(a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
				if (a === c) break;
				a = a.return;
			}
		}
		function jd(a, b) {
			cd = a;
			ed = dd = null;
			a = a.dependencies;
			null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (kd = !0), a.firstContext = null);
		}
		function ld(a) {
			var b = Ta ? a._currentValue : a._currentValue2;
			if (ed !== a) if (a = {
				context: a,
				memoizedValue: b,
				next: null
			}, null === dd) {
				if (null === cd) throw Error(n(308));
				dd = a;
				cd.dependencies = {
					lanes: 0,
					firstContext: a
				};
			} else dd = dd.next = a;
			return b;
		}
		var md = null, nd = !1;
		function od(a) {
			a.updateQueue = {
				baseState: a.memoizedState,
				firstBaseUpdate: null,
				lastBaseUpdate: null,
				shared: {
					pending: null,
					interleaved: null,
					lanes: 0
				},
				effects: null
			};
		}
		function pd(a, b) {
			a = a.updateQueue;
			b.updateQueue === a && (b.updateQueue = {
				baseState: a.baseState,
				firstBaseUpdate: a.firstBaseUpdate,
				lastBaseUpdate: a.lastBaseUpdate,
				shared: a.shared,
				effects: a.effects
			});
		}
		function qd(a, b) {
			return {
				eventTime: a,
				lane: b,
				tag: 0,
				payload: null,
				callback: null,
				next: null
			};
		}
		function rd(a, b) {
			var c = a.updateQueue;
			null !== c && (c = c.shared, null !== F$2 && 0 !== (a.mode & 1) && 0 === (G$2 & 2) ? (a = c.interleaved, null === a ? (b.next = b, null === md ? md = [c] : md.push(c)) : (b.next = a.next, a.next = b), c.interleaved = b) : (a = c.pending, null === a ? b.next = b : (b.next = a.next, a.next = b), c.pending = b));
		}
		function sd(a, b, c) {
			b = b.updateQueue;
			if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
				var d = b.lanes;
				d &= a.pendingLanes;
				c |= d;
				b.lanes = c;
				Dc(a, c);
			}
		}
		function td(a, b) {
			var c = a.updateQueue, d = a.alternate;
			if (null !== d && (d = d.updateQueue, c === d)) {
				var e = null, f$2 = null;
				c = c.firstBaseUpdate;
				if (null !== c) {
					do {
						var g$3 = {
							eventTime: c.eventTime,
							lane: c.lane,
							tag: c.tag,
							payload: c.payload,
							callback: c.callback,
							next: null
						};
						null === f$2 ? e = f$2 = g$3 : f$2 = f$2.next = g$3;
						c = c.next;
					} while (null !== c);
					null === f$2 ? e = f$2 = b : f$2 = f$2.next = b;
				} else e = f$2 = b;
				c = {
					baseState: d.baseState,
					firstBaseUpdate: e,
					lastBaseUpdate: f$2,
					shared: d.shared,
					effects: d.effects
				};
				a.updateQueue = c;
				return;
			}
			a = c.lastBaseUpdate;
			null === a ? c.firstBaseUpdate = b : a.next = b;
			c.lastBaseUpdate = b;
		}
		function ud(a, b, c, d) {
			var e = a.updateQueue;
			nd = !1;
			var f$2 = e.firstBaseUpdate, g$3 = e.lastBaseUpdate, h$2 = e.shared.pending;
			if (null !== h$2) {
				e.shared.pending = null;
				var k$3 = h$2, l$2 = k$3.next;
				k$3.next = null;
				null === g$3 ? f$2 = l$2 : g$3.next = l$2;
				g$3 = k$3;
				var m = a.alternate;
				null !== m && (m = m.updateQueue, h$2 = m.lastBaseUpdate, h$2 !== g$3 && (null === h$2 ? m.firstBaseUpdate = l$2 : h$2.next = l$2, m.lastBaseUpdate = k$3));
			}
			if (null !== f$2) {
				var v$2 = e.baseState;
				g$3 = 0;
				m = l$2 = k$3 = null;
				h$2 = f$2;
				do {
					var r$2 = h$2.lane, z$2 = h$2.eventTime;
					if ((d & r$2) === r$2) {
						null !== m && (m = m.next = {
							eventTime: z$2,
							lane: 0,
							tag: h$2.tag,
							payload: h$2.payload,
							callback: h$2.callback,
							next: null
						});
						a: {
							var q$2 = a, N$2 = h$2;
							r$2 = b;
							z$2 = c;
							switch (N$2.tag) {
								case 1:
									q$2 = N$2.payload;
									if ("function" === typeof q$2) {
										v$2 = q$2.call(z$2, v$2, r$2);
										break a;
									}
									v$2 = q$2;
									break a;
								case 3: q$2.flags = q$2.flags & -65537 | 128;
								case 0:
									q$2 = N$2.payload;
									r$2 = "function" === typeof q$2 ? q$2.call(z$2, v$2, r$2) : q$2;
									if (null === r$2 || void 0 === r$2) break a;
									v$2 = ca({}, v$2, r$2);
									break a;
								case 2: nd = !0;
							}
						}
						null !== h$2.callback && 0 !== h$2.lane && (a.flags |= 64, r$2 = e.effects, null === r$2 ? e.effects = [h$2] : r$2.push(h$2));
					} else z$2 = {
						eventTime: z$2,
						lane: r$2,
						tag: h$2.tag,
						payload: h$2.payload,
						callback: h$2.callback,
						next: null
					}, null === m ? (l$2 = m = z$2, k$3 = v$2) : m = m.next = z$2, g$3 |= r$2;
					h$2 = h$2.next;
					if (null === h$2) if (h$2 = e.shared.pending, null === h$2) break;
					else r$2 = h$2, h$2 = r$2.next, r$2.next = null, e.lastBaseUpdate = r$2, e.shared.pending = null;
				} while (1);
				null === m && (k$3 = v$2);
				e.baseState = k$3;
				e.firstBaseUpdate = l$2;
				e.lastBaseUpdate = m;
				b = e.shared.interleaved;
				if (null !== b) {
					e = b;
					do
						g$3 |= e.lane, e = e.next;
					while (e !== b);
				} else null === f$2 && (e.shared.lanes = 0);
				vd |= g$3;
				a.lanes = g$3;
				a.memoizedState = v$2;
			}
		}
		function wd(a, b, c) {
			a = b.effects;
			b.effects = null;
			if (null !== a) for (b = 0; b < a.length; b++) {
				var d = a[b], e = d.callback;
				if (null !== e) {
					d.callback = null;
					d = c;
					if ("function" !== typeof e) throw Error(n(191, e));
					e.call(d);
				}
			}
		}
		var xd = new aa.Component().refs;
		function yd(a, b, c, d) {
			b = a.memoizedState;
			c = c(d, b);
			c = null === c || void 0 === c ? b : ca({}, b, c);
			a.memoizedState = c;
			0 === a.lanes && (a.updateQueue.baseState = c);
		}
		var Bd = {
			isMounted: function(a) {
				return (a = a._reactInternals) ? ya(a) === a : !1;
			},
			enqueueSetState: function(a, b, c) {
				a = a._reactInternals;
				var d = H$2(), e = zd(a), f$2 = qd(d, e);
				f$2.payload = b;
				void 0 !== c && null !== c && (f$2.callback = c);
				rd(a, f$2);
				b = Ad(a, e, d);
				null !== b && sd(b, a, e);
			},
			enqueueReplaceState: function(a, b, c) {
				a = a._reactInternals;
				var d = H$2(), e = zd(a), f$2 = qd(d, e);
				f$2.tag = 1;
				f$2.payload = b;
				void 0 !== c && null !== c && (f$2.callback = c);
				rd(a, f$2);
				b = Ad(a, e, d);
				null !== b && sd(b, a, e);
			},
			enqueueForceUpdate: function(a, b) {
				a = a._reactInternals;
				var c = H$2(), d = zd(a), e = qd(c, d);
				e.tag = 2;
				void 0 !== b && null !== b && (e.callback = b);
				rd(a, e);
				b = Ad(a, d, c);
				null !== b && sd(b, a, d);
			}
		};
		function Cd(a, b, c, d, e, f$2, g$3) {
			a = a.stateNode;
			return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f$2, g$3) : b.prototype && b.prototype.isPureReactComponent ? !Zc(c, d) || !Zc(e, f$2) : !0;
		}
		function Dd(a, b, c) {
			var d = !1, e = hc;
			var f$2 = b.contextType;
			"object" === typeof f$2 && null !== f$2 ? f$2 = ld(f$2) : (e = C(b) ? ic : A$2.current, d = b.contextTypes, f$2 = (d = null !== d && void 0 !== d) ? jc(a, e) : hc);
			b = new b(c, f$2);
			a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
			b.updater = Bd;
			a.stateNode = b;
			b._reactInternals = a;
			d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f$2);
			return b;
		}
		function Ed(a, b, c, d) {
			a = b.state;
			"function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
			"function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
			b.state !== a && Bd.enqueueReplaceState(b, b.state, null);
		}
		function Fd(a, b, c, d) {
			var e = a.stateNode;
			e.props = c;
			e.state = a.memoizedState;
			e.refs = xd;
			od(a);
			var f$2 = b.contextType;
			"object" === typeof f$2 && null !== f$2 ? e.context = ld(f$2) : (f$2 = C(b) ? ic : A$2.current, e.context = jc(a, f$2));
			e.state = a.memoizedState;
			f$2 = b.getDerivedStateFromProps;
			"function" === typeof f$2 && (yd(a, b, f$2, c), e.state = a.memoizedState);
			"function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Bd.enqueueReplaceState(e, e.state, null), ud(a, c, e, d), e.state = a.memoizedState);
			"function" === typeof e.componentDidMount && (a.flags |= 4194308);
		}
		var Gd = [], Hd = 0, Id = null, Jd = 0, Kd = [], Ld = 0, Md = null, Nd = 1, Od = "";
		function Pd(a, b) {
			Gd[Hd++] = Jd;
			Gd[Hd++] = Id;
			Id = a;
			Jd = b;
		}
		function Qd(a, b, c) {
			Kd[Ld++] = Nd;
			Kd[Ld++] = Od;
			Kd[Ld++] = Md;
			Md = a;
			var d = Nd;
			a = Od;
			var e = 32 - qc(d) - 1;
			d &= ~(1 << e);
			c += 1;
			var f$2 = 32 - qc(b) + e;
			if (30 < f$2) {
				var g$3 = e - e % 5;
				f$2 = (d & (1 << g$3) - 1).toString(32);
				d >>= g$3;
				e -= g$3;
				Nd = 1 << 32 - qc(b) + e | c << e | d;
				Od = f$2 + a;
			} else Nd = 1 << f$2 | c << e | d, Od = a;
		}
		function Rd(a) {
			null !== a.return && (Pd(a, 1), Qd(a, 1, 0));
		}
		function Sd(a) {
			for (; a === Id;) Id = Gd[--Hd], Gd[Hd] = null, Jd = Gd[--Hd], Gd[Hd] = null;
			for (; a === Md;) Md = Kd[--Ld], Kd[Ld] = null, Od = Kd[--Ld], Kd[Ld] = null, Nd = Kd[--Ld], Kd[Ld] = null;
		}
		var Td = null, Ud = null, I$2 = !1, Vd = !1, Wd = null;
		function Xd(a, b) {
			var c = Yd(5, null, null, 0);
			c.elementType = "DELETED";
			c.stateNode = b;
			c.return = a;
			b = a.deletions;
			null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
		}
		function Zd(a, b) {
			switch (a.tag) {
				case 5: return b = Fb(b, a.type, a.pendingProps), null !== b ? (a.stateNode = b, Td = a, Ud = Mb(b), !0) : !1;
				case 6: return b = Gb(b, a.pendingProps), null !== b ? (a.stateNode = b, Td = a, Ud = null, !0) : !1;
				case 13:
					b = Hb(b);
					if (null !== b) {
						var c = null !== Md ? {
							id: Nd,
							overflow: Od
						} : null;
						a.memoizedState = {
							dehydrated: b,
							treeContext: c,
							retryLane: 1073741824
						};
						c = Yd(18, null, null, 0);
						c.stateNode = b;
						c.return = a;
						a.child = c;
						Td = a;
						Ud = null;
						return !0;
					}
					return !1;
				default: return !1;
			}
		}
		function $d(a) {
			return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
		}
		function ae(a) {
			if (I$2) {
				var b = Ud;
				if (b) {
					var c = b;
					if (!Zd(a, b)) {
						if ($d(a)) throw Error(n(418));
						b = Lb(c);
						var d = Td;
						b && Zd(a, b) ? Xd(d, c) : (a.flags = a.flags & -4097 | 2, I$2 = !1, Td = a);
					}
				} else {
					if ($d(a)) throw Error(n(418));
					a.flags = a.flags & -4097 | 2;
					I$2 = !1;
					Td = a;
				}
			}
		}
		function be(a) {
			for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag;) a = a.return;
			Td = a;
		}
		function ce(a) {
			if (!p$3 || a !== Td) return !1;
			if (!I$2) return be(a), I$2 = !0, !1;
			if (3 !== a.tag && (5 !== a.tag || Xb(a.type) && !Oa(a.type, a.memoizedProps))) {
				var b = Ud;
				if (b) {
					if ($d(a)) {
						for (a = Ud; a;) a = Lb(a);
						throw Error(n(418));
					}
					for (; b;) Xd(a, b), b = Lb(b);
				}
			}
			be(a);
			if (13 === a.tag) {
				if (!p$3) throw Error(n(316));
				a = a.memoizedState;
				a = null !== a ? a.dehydrated : null;
				if (!a) throw Error(n(317));
				Ud = Sb(a);
			} else Ud = Td ? Lb(a.stateNode) : null;
			return !0;
		}
		function de() {
			p$3 && (Ud = Td = null, Vd = I$2 = !1);
		}
		function ee(a) {
			null === Wd ? Wd = [a] : Wd.push(a);
		}
		function fe(a, b, c) {
			a = c.ref;
			if (null !== a && "function" !== typeof a && "object" !== typeof a) {
				if (c._owner) {
					c = c._owner;
					if (c) {
						if (1 !== c.tag) throw Error(n(309));
						var d = c.stateNode;
					}
					if (!d) throw Error(n(147, a));
					var e = d, f$2 = "" + a;
					if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f$2) return b.ref;
					b = function(a$1) {
						var b$1 = e.refs;
						b$1 === xd && (b$1 = e.refs = {});
						null === a$1 ? delete b$1[f$2] : b$1[f$2] = a$1;
					};
					b._stringRef = f$2;
					return b;
				}
				if ("string" !== typeof a) throw Error(n(284));
				if (!c._owner) throw Error(n(290, a));
			}
			return a;
		}
		function ge(a, b) {
			a = Object.prototype.toString.call(b);
			throw Error(n(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
		}
		function he(a) {
			var b = a._init;
			return b(a._payload);
		}
		function ie(a) {
			function b(b$1, c$1) {
				if (a) {
					var d$1 = b$1.deletions;
					null === d$1 ? (b$1.deletions = [c$1], b$1.flags |= 16) : d$1.push(c$1);
				}
			}
			function c(c$1, d$1) {
				if (!a) return null;
				for (; null !== d$1;) b(c$1, d$1), d$1 = d$1.sibling;
				return null;
			}
			function d(a$1, b$1) {
				for (a$1 = /* @__PURE__ */ new Map(); null !== b$1;) null !== b$1.key ? a$1.set(b$1.key, b$1) : a$1.set(b$1.index, b$1), b$1 = b$1.sibling;
				return a$1;
			}
			function e(a$1, b$1) {
				a$1 = je(a$1, b$1);
				a$1.index = 0;
				a$1.sibling = null;
				return a$1;
			}
			function f$2(b$1, c$1, d$1) {
				b$1.index = d$1;
				if (!a) return b$1.flags |= 1048576, c$1;
				d$1 = b$1.alternate;
				if (null !== d$1) return d$1 = d$1.index, d$1 < c$1 ? (b$1.flags |= 2, c$1) : d$1;
				b$1.flags |= 2;
				return c$1;
			}
			function g$3(b$1) {
				a && null === b$1.alternate && (b$1.flags |= 2);
				return b$1;
			}
			function h$2(a$1, b$1, c$1, d$1) {
				if (null === b$1 || 6 !== b$1.tag) return b$1 = ke(c$1, a$1.mode, d$1), b$1.return = a$1, b$1;
				b$1 = e(b$1, c$1);
				b$1.return = a$1;
				return b$1;
			}
			function k$3(a$1, b$1, c$1, d$1) {
				var f$3 = c$1.type;
				if (f$3 === ia) return m(a$1, b$1, c$1.props.children, d$1, c$1.key);
				if (null !== b$1 && (b$1.elementType === f$3 || "object" === typeof f$3 && null !== f$3 && f$3.$$typeof === ra && he(f$3) === b$1.type)) return d$1 = e(b$1, c$1.props), d$1.ref = fe(a$1, b$1, c$1), d$1.return = a$1, d$1;
				d$1 = le(c$1.type, c$1.key, c$1.props, null, a$1.mode, d$1);
				d$1.ref = fe(a$1, b$1, c$1);
				d$1.return = a$1;
				return d$1;
			}
			function l$2(a$1, b$1, c$1, d$1) {
				if (null === b$1 || 4 !== b$1.tag || b$1.stateNode.containerInfo !== c$1.containerInfo || b$1.stateNode.implementation !== c$1.implementation) return b$1 = me(c$1, a$1.mode, d$1), b$1.return = a$1, b$1;
				b$1 = e(b$1, c$1.children || []);
				b$1.return = a$1;
				return b$1;
			}
			function m(a$1, b$1, c$1, d$1, f$3) {
				if (null === b$1 || 7 !== b$1.tag) return b$1 = ne(c$1, a$1.mode, d$1, f$3), b$1.return = a$1, b$1;
				b$1 = e(b$1, c$1);
				b$1.return = a$1;
				return b$1;
			}
			function v$2(a$1, b$1, c$1) {
				if ("string" === typeof b$1 && "" !== b$1 || "number" === typeof b$1) return b$1 = ke("" + b$1, a$1.mode, c$1), b$1.return = a$1, b$1;
				if ("object" === typeof b$1 && null !== b$1) {
					switch (b$1.$$typeof) {
						case fa: return c$1 = le(b$1.type, b$1.key, b$1.props, null, a$1.mode, c$1), c$1.ref = fe(a$1, null, b$1), c$1.return = a$1, c$1;
						case ha: return b$1 = me(b$1, a$1.mode, c$1), b$1.return = a$1, b$1;
						case ra:
							var d$1 = b$1._init;
							return v$2(a$1, d$1(b$1._payload), c$1);
					}
					if (Ea(b$1) || ua(b$1)) return b$1 = ne(b$1, a$1.mode, c$1, null), b$1.return = a$1, b$1;
					ge(a$1, b$1);
				}
				return null;
			}
			function r$2(a$1, b$1, c$1, d$1) {
				var e$1 = null !== b$1 ? b$1.key : null;
				if ("string" === typeof c$1 && "" !== c$1 || "number" === typeof c$1) return null !== e$1 ? null : h$2(a$1, b$1, "" + c$1, d$1);
				if ("object" === typeof c$1 && null !== c$1) {
					switch (c$1.$$typeof) {
						case fa: return c$1.key === e$1 ? k$3(a$1, b$1, c$1, d$1) : null;
						case ha: return c$1.key === e$1 ? l$2(a$1, b$1, c$1, d$1) : null;
						case ra: return e$1 = c$1._init, r$2(a$1, b$1, e$1(c$1._payload), d$1);
					}
					if (Ea(c$1) || ua(c$1)) return null !== e$1 ? null : m(a$1, b$1, c$1, d$1, null);
					ge(a$1, c$1);
				}
				return null;
			}
			function z$2(a$1, b$1, c$1, d$1, e$1) {
				if ("string" === typeof d$1 && "" !== d$1 || "number" === typeof d$1) return a$1 = a$1.get(c$1) || null, h$2(b$1, a$1, "" + d$1, e$1);
				if ("object" === typeof d$1 && null !== d$1) {
					switch (d$1.$$typeof) {
						case fa: return a$1 = a$1.get(null === d$1.key ? c$1 : d$1.key) || null, k$3(b$1, a$1, d$1, e$1);
						case ha: return a$1 = a$1.get(null === d$1.key ? c$1 : d$1.key) || null, l$2(b$1, a$1, d$1, e$1);
						case ra:
							var f$3 = d$1._init;
							return z$2(a$1, b$1, c$1, f$3(d$1._payload), e$1);
					}
					if (Ea(d$1) || ua(d$1)) return a$1 = a$1.get(c$1) || null, m(b$1, a$1, d$1, e$1, null);
					ge(b$1, d$1);
				}
				return null;
			}
			function q$2(e$1, g$4, h$3, k$4) {
				for (var l$3 = null, m$1 = null, w = g$4, u$3 = g$4 = 0, t$2 = null; null !== w && u$3 < h$3.length; u$3++) {
					w.index > u$3 ? (t$2 = w, w = null) : t$2 = w.sibling;
					var q$3 = r$2(e$1, w, h$3[u$3], k$4);
					if (null === q$3) {
						null === w && (w = t$2);
						break;
					}
					a && w && null === q$3.alternate && b(e$1, w);
					g$4 = f$2(q$3, g$4, u$3);
					null === m$1 ? l$3 = q$3 : m$1.sibling = q$3;
					m$1 = q$3;
					w = t$2;
				}
				if (u$3 === h$3.length) return c(e$1, w), I$2 && Pd(e$1, u$3), l$3;
				if (null === w) {
					for (; u$3 < h$3.length; u$3++) w = v$2(e$1, h$3[u$3], k$4), null !== w && (g$4 = f$2(w, g$4, u$3), null === m$1 ? l$3 = w : m$1.sibling = w, m$1 = w);
					I$2 && Pd(e$1, u$3);
					return l$3;
				}
				for (w = d(e$1, w); u$3 < h$3.length; u$3++) t$2 = z$2(w, e$1, u$3, h$3[u$3], k$4), null !== t$2 && (a && null !== t$2.alternate && w.delete(null === t$2.key ? u$3 : t$2.key), g$4 = f$2(t$2, g$4, u$3), null === m$1 ? l$3 = t$2 : m$1.sibling = t$2, m$1 = t$2);
				a && w.forEach(function(a$1) {
					return b(e$1, a$1);
				});
				I$2 && Pd(e$1, u$3);
				return l$3;
			}
			function N$2(e$1, g$4, h$3, k$4) {
				var l$3 = ua(h$3);
				if ("function" !== typeof l$3) throw Error(n(150));
				h$3 = l$3.call(h$3);
				if (null == h$3) throw Error(n(151));
				for (var w = l$3 = null, m$1 = g$4, u$3 = g$4 = 0, q$3 = null, t$2 = h$3.next(); null !== m$1 && !t$2.done; u$3++, t$2 = h$3.next()) {
					m$1.index > u$3 ? (q$3 = m$1, m$1 = null) : q$3 = m$1.sibling;
					var V = r$2(e$1, m$1, t$2.value, k$4);
					if (null === V) {
						null === m$1 && (m$1 = q$3);
						break;
					}
					a && m$1 && null === V.alternate && b(e$1, m$1);
					g$4 = f$2(V, g$4, u$3);
					null === w ? l$3 = V : w.sibling = V;
					w = V;
					m$1 = q$3;
				}
				if (t$2.done) return c(e$1, m$1), I$2 && Pd(e$1, u$3), l$3;
				if (null === m$1) {
					for (; !t$2.done; u$3++, t$2 = h$3.next()) t$2 = v$2(e$1, t$2.value, k$4), null !== t$2 && (g$4 = f$2(t$2, g$4, u$3), null === w ? l$3 = t$2 : w.sibling = t$2, w = t$2);
					I$2 && Pd(e$1, u$3);
					return l$3;
				}
				for (m$1 = d(e$1, m$1); !t$2.done; u$3++, t$2 = h$3.next()) t$2 = z$2(m$1, e$1, u$3, t$2.value, k$4), null !== t$2 && (a && null !== t$2.alternate && m$1.delete(null === t$2.key ? u$3 : t$2.key), g$4 = f$2(t$2, g$4, u$3), null === w ? l$3 = t$2 : w.sibling = t$2, w = t$2);
				a && m$1.forEach(function(a$1) {
					return b(e$1, a$1);
				});
				I$2 && Pd(e$1, u$3);
				return l$3;
			}
			function da(a$1, d$1, f$3, h$3) {
				"object" === typeof f$3 && null !== f$3 && f$3.type === ia && null === f$3.key && (f$3 = f$3.props.children);
				if ("object" === typeof f$3 && null !== f$3) {
					switch (f$3.$$typeof) {
						case fa:
							a: {
								for (var k$4 = f$3.key, l$3 = d$1; null !== l$3;) {
									if (l$3.key === k$4) {
										k$4 = f$3.type;
										if (k$4 === ia) {
											if (7 === l$3.tag) {
												c(a$1, l$3.sibling);
												d$1 = e(l$3, f$3.props.children);
												d$1.return = a$1;
												a$1 = d$1;
												break a;
											}
										} else if (l$3.elementType === k$4 || "object" === typeof k$4 && null !== k$4 && k$4.$$typeof === ra && he(k$4) === l$3.type) {
											c(a$1, l$3.sibling);
											d$1 = e(l$3, f$3.props);
											d$1.ref = fe(a$1, l$3, f$3);
											d$1.return = a$1;
											a$1 = d$1;
											break a;
										}
										c(a$1, l$3);
										break;
									} else b(a$1, l$3);
									l$3 = l$3.sibling;
								}
								f$3.type === ia ? (d$1 = ne(f$3.props.children, a$1.mode, h$3, f$3.key), d$1.return = a$1, a$1 = d$1) : (h$3 = le(f$3.type, f$3.key, f$3.props, null, a$1.mode, h$3), h$3.ref = fe(a$1, d$1, f$3), h$3.return = a$1, a$1 = h$3);
							}
							return g$3(a$1);
						case ha:
							a: {
								for (l$3 = f$3.key; null !== d$1;) {
									if (d$1.key === l$3) if (4 === d$1.tag && d$1.stateNode.containerInfo === f$3.containerInfo && d$1.stateNode.implementation === f$3.implementation) {
										c(a$1, d$1.sibling);
										d$1 = e(d$1, f$3.children || []);
										d$1.return = a$1;
										a$1 = d$1;
										break a;
									} else {
										c(a$1, d$1);
										break;
									}
									else b(a$1, d$1);
									d$1 = d$1.sibling;
								}
								d$1 = me(f$3, a$1.mode, h$3);
								d$1.return = a$1;
								a$1 = d$1;
							}
							return g$3(a$1);
						case ra: return l$3 = f$3._init, da(a$1, d$1, l$3(f$3._payload), h$3);
					}
					if (Ea(f$3)) return q$2(a$1, d$1, f$3, h$3);
					if (ua(f$3)) return N$2(a$1, d$1, f$3, h$3);
					ge(a$1, f$3);
				}
				return "string" === typeof f$3 && "" !== f$3 || "number" === typeof f$3 ? (f$3 = "" + f$3, null !== d$1 && 6 === d$1.tag ? (c(a$1, d$1.sibling), d$1 = e(d$1, f$3), d$1.return = a$1, a$1 = d$1) : (c(a$1, d$1), d$1 = ke(f$3, a$1.mode, h$3), d$1.return = a$1, a$1 = d$1), g$3(a$1)) : c(a$1, d$1);
			}
			return da;
		}
		var oe = ie(!0), pe = ie(!1), qe = {}, re = gc(qe), se = gc(qe), te = gc(qe);
		function ue(a) {
			if (a === qe) throw Error(n(174));
			return a;
		}
		function ve(a, b) {
			y$2(te, b);
			y$2(se, a);
			y$2(re, qe);
			a = Ga(b);
			x(re);
			y$2(re, a);
		}
		function we() {
			x(re);
			x(se);
			x(te);
		}
		function xe(a) {
			var b = ue(te.current), c = ue(re.current);
			b = Ha(c, a.type, b);
			c !== b && (y$2(se, a), y$2(re, b));
		}
		function ye(a) {
			se.current === a && (x(re), x(se));
		}
		var J$2 = gc(0);
		function ze(a) {
			for (var b = a; null !== b;) {
				if (13 === b.tag) {
					var c = b.memoizedState;
					if (null !== c && (c = c.dehydrated, null === c || Ib(c) || Jb(c))) return b;
				} else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
					if (0 !== (b.flags & 128)) return b;
				} else if (null !== b.child) {
					b.child.return = b;
					b = b.child;
					continue;
				}
				if (b === a) break;
				for (; null === b.sibling;) {
					if (null === b.return || b.return === a) return null;
					b = b.return;
				}
				b.sibling.return = b.return;
				b = b.sibling;
			}
			return null;
		}
		var Ae = [];
		function Be() {
			for (var a = 0; a < Ae.length; a++) {
				var b = Ae[a];
				Ta ? b._workInProgressVersionPrimary = null : b._workInProgressVersionSecondary = null;
			}
			Ae.length = 0;
		}
		var Ce = ea.ReactCurrentDispatcher, De = ea.ReactCurrentBatchConfig, Ee = 0, K$2 = null, L$2 = null, M$3 = null, Fe = !1, Ge = !1, He = 0, Ie = 0;
		function O$2() {
			throw Error(n(321));
		}
		function Je(a, b) {
			if (null === b) return !1;
			for (var c = 0; c < b.length && c < a.length; c++) if (!Rc(a[c], b[c])) return !1;
			return !0;
		}
		function Ke(a, b, c, d, e, f$2) {
			Ee = f$2;
			K$2 = b;
			b.memoizedState = null;
			b.updateQueue = null;
			b.lanes = 0;
			Ce.current = null === a || null === a.memoizedState ? Le : Me;
			a = c(d, e);
			if (Ge) {
				f$2 = 0;
				do {
					Ge = !1;
					He = 0;
					if (25 <= f$2) throw Error(n(301));
					f$2 += 1;
					M$3 = L$2 = null;
					b.updateQueue = null;
					Ce.current = Ne;
					a = c(d, e);
				} while (Ge);
			}
			Ce.current = Oe;
			b = null !== L$2 && null !== L$2.next;
			Ee = 0;
			M$3 = L$2 = K$2 = null;
			Fe = !1;
			if (b) throw Error(n(300));
			return a;
		}
		function Pe() {
			var a = 0 !== He;
			He = 0;
			return a;
		}
		function Qe() {
			var a = {
				memoizedState: null,
				baseState: null,
				baseQueue: null,
				queue: null,
				next: null
			};
			null === M$3 ? K$2.memoizedState = M$3 = a : M$3 = M$3.next = a;
			return M$3;
		}
		function Re() {
			if (null === L$2) {
				var a = K$2.alternate;
				a = null !== a ? a.memoizedState : null;
			} else a = L$2.next;
			var b = null === M$3 ? K$2.memoizedState : M$3.next;
			if (null !== b) M$3 = b, L$2 = a;
			else {
				if (null === a) throw Error(n(310));
				L$2 = a;
				a = {
					memoizedState: L$2.memoizedState,
					baseState: L$2.baseState,
					baseQueue: L$2.baseQueue,
					queue: L$2.queue,
					next: null
				};
				null === M$3 ? K$2.memoizedState = M$3 = a : M$3 = M$3.next = a;
			}
			return M$3;
		}
		function Se(a, b) {
			return "function" === typeof b ? b(a) : b;
		}
		function Te(a) {
			var b = Re(), c = b.queue;
			if (null === c) throw Error(n(311));
			c.lastRenderedReducer = a;
			var d = L$2, e = d.baseQueue, f$2 = c.pending;
			if (null !== f$2) {
				if (null !== e) {
					var g$3 = e.next;
					e.next = f$2.next;
					f$2.next = g$3;
				}
				d.baseQueue = e = f$2;
				c.pending = null;
			}
			if (null !== e) {
				f$2 = e.next;
				d = d.baseState;
				var h$2 = g$3 = null, k$3 = null, l$2 = f$2;
				do {
					var m = l$2.lane;
					if ((Ee & m) === m) null !== k$3 && (k$3 = k$3.next = {
						lane: 0,
						action: l$2.action,
						hasEagerState: l$2.hasEagerState,
						eagerState: l$2.eagerState,
						next: null
					}), d = l$2.hasEagerState ? l$2.eagerState : a(d, l$2.action);
					else {
						var v$2 = {
							lane: m,
							action: l$2.action,
							hasEagerState: l$2.hasEagerState,
							eagerState: l$2.eagerState,
							next: null
						};
						null === k$3 ? (h$2 = k$3 = v$2, g$3 = d) : k$3 = k$3.next = v$2;
						K$2.lanes |= m;
						vd |= m;
					}
					l$2 = l$2.next;
				} while (null !== l$2 && l$2 !== f$2);
				null === k$3 ? g$3 = d : k$3.next = h$2;
				Rc(d, b.memoizedState) || (kd = !0);
				b.memoizedState = d;
				b.baseState = g$3;
				b.baseQueue = k$3;
				c.lastRenderedState = d;
			}
			a = c.interleaved;
			if (null !== a) {
				e = a;
				do
					f$2 = e.lane, K$2.lanes |= f$2, vd |= f$2, e = e.next;
				while (e !== a);
			} else null === e && (c.lanes = 0);
			return [b.memoizedState, c.dispatch];
		}
		function Ue(a) {
			var b = Re(), c = b.queue;
			if (null === c) throw Error(n(311));
			c.lastRenderedReducer = a;
			var d = c.dispatch, e = c.pending, f$2 = b.memoizedState;
			if (null !== e) {
				c.pending = null;
				var g$3 = e = e.next;
				do
					f$2 = a(f$2, g$3.action), g$3 = g$3.next;
				while (g$3 !== e);
				Rc(f$2, b.memoizedState) || (kd = !0);
				b.memoizedState = f$2;
				null === b.baseQueue && (b.baseState = f$2);
				c.lastRenderedState = f$2;
			}
			return [f$2, d];
		}
		function Ve() {}
		function We(a, b) {
			var c = K$2, d = Re(), e = b(), f$2 = !Rc(d.memoizedState, e);
			f$2 && (d.memoizedState = e, kd = !0);
			d = d.queue;
			Xe(Ye.bind(null, c, d, a), [a]);
			if (d.getSnapshot !== b || f$2 || null !== M$3 && M$3.memoizedState.tag & 1) {
				c.flags |= 2048;
				Ze(9, $e.bind(null, c, d, e, b), void 0, null);
				if (null === F$2) throw Error(n(349));
				0 !== (Ee & 30) || af(c, b, e);
			}
			return e;
		}
		function af(a, b, c) {
			a.flags |= 16384;
			a = {
				getSnapshot: b,
				value: c
			};
			b = K$2.updateQueue;
			null === b ? (b = {
				lastEffect: null,
				stores: null
			}, K$2.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
		}
		function $e(a, b, c, d) {
			b.value = c;
			b.getSnapshot = d;
			bf(b) && Ad(a, 1, -1);
		}
		function Ye(a, b, c) {
			return c(function() {
				bf(b) && Ad(a, 1, -1);
			});
		}
		function bf(a) {
			var b = a.getSnapshot;
			a = a.value;
			try {
				var c = b();
				return !Rc(a, c);
			} catch (d) {
				return !0;
			}
		}
		function cf(a) {
			var b = Qe();
			"function" === typeof a && (a = a());
			b.memoizedState = b.baseState = a;
			a = {
				pending: null,
				interleaved: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Se,
				lastRenderedState: a
			};
			b.queue = a;
			a = a.dispatch = df.bind(null, K$2, a);
			return [b.memoizedState, a];
		}
		function Ze(a, b, c, d) {
			a = {
				tag: a,
				create: b,
				destroy: c,
				deps: d,
				next: null
			};
			b = K$2.updateQueue;
			null === b ? (b = {
				lastEffect: null,
				stores: null
			}, K$2.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
			return a;
		}
		function ef() {
			return Re().memoizedState;
		}
		function ff(a, b, c, d) {
			var e = Qe();
			K$2.flags |= a;
			e.memoizedState = Ze(1 | b, c, void 0, void 0 === d ? null : d);
		}
		function gf(a, b, c, d) {
			var e = Re();
			d = void 0 === d ? null : d;
			var f$2 = void 0;
			if (null !== L$2) {
				var g$3 = L$2.memoizedState;
				f$2 = g$3.destroy;
				if (null !== d && Je(d, g$3.deps)) {
					e.memoizedState = Ze(b, c, f$2, d);
					return;
				}
			}
			K$2.flags |= a;
			e.memoizedState = Ze(1 | b, c, f$2, d);
		}
		function hf(a, b) {
			return ff(8390656, 8, a, b);
		}
		function Xe(a, b) {
			return gf(2048, 8, a, b);
		}
		function jf(a, b) {
			return gf(4, 2, a, b);
		}
		function kf(a, b) {
			return gf(4, 4, a, b);
		}
		function lf(a, b) {
			if ("function" === typeof b) return a = a(), b(a), function() {
				b(null);
			};
			if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
				b.current = null;
			};
		}
		function mf(a, b, c) {
			c = null !== c && void 0 !== c ? c.concat([a]) : null;
			return gf(4, 4, lf.bind(null, b, a), c);
		}
		function nf() {}
		function of(a, b) {
			var c = Re();
			b = void 0 === b ? null : b;
			var d = c.memoizedState;
			if (null !== d && null !== b && Je(b, d[1])) return d[0];
			c.memoizedState = [a, b];
			return a;
		}
		function pf(a, b) {
			var c = Re();
			b = void 0 === b ? null : b;
			var d = c.memoizedState;
			if (null !== d && null !== b && Je(b, d[1])) return d[0];
			a = a();
			c.memoizedState = [a, b];
			return a;
		}
		function qf(a, b) {
			var c = D$3;
			D$3 = 0 !== c && 4 > c ? c : 4;
			a(!0);
			var d = De.transition;
			De.transition = {};
			try {
				a(!1), b();
			} finally {
				D$3 = c, De.transition = d;
			}
		}
		function rf() {
			return Re().memoizedState;
		}
		function sf(a, b, c) {
			var d = zd(a);
			c = {
				lane: d,
				action: c,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			tf(a) ? uf(b, c) : (vf(a, b, c), c = H$2(), a = Ad(a, d, c), null !== a && wf(a, b, d));
		}
		function df(a, b, c) {
			var d = zd(a), e = {
				lane: d,
				action: c,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			if (tf(a)) uf(b, e);
			else {
				vf(a, b, e);
				var f$2 = a.alternate;
				if (0 === a.lanes && (null === f$2 || 0 === f$2.lanes) && (f$2 = b.lastRenderedReducer, null !== f$2)) try {
					var g$3 = b.lastRenderedState, h$2 = f$2(g$3, c);
					e.hasEagerState = !0;
					e.eagerState = h$2;
					if (Rc(h$2, g$3)) return;
				} catch (k$3) {}
				c = H$2();
				a = Ad(a, d, c);
				null !== a && wf(a, b, d);
			}
		}
		function tf(a) {
			var b = a.alternate;
			return a === K$2 || null !== b && b === K$2;
		}
		function uf(a, b) {
			Ge = Fe = !0;
			var c = a.pending;
			null === c ? b.next = b : (b.next = c.next, c.next = b);
			a.pending = b;
		}
		function vf(a, b, c) {
			null !== F$2 && 0 !== (a.mode & 1) && 0 === (G$2 & 2) ? (a = b.interleaved, null === a ? (c.next = c, null === md ? md = [b] : md.push(b)) : (c.next = a.next, a.next = c), b.interleaved = c) : (a = b.pending, null === a ? c.next = c : (c.next = a.next, a.next = c), b.pending = c);
		}
		function wf(a, b, c) {
			if (0 !== (c & 4194240)) {
				var d = b.lanes;
				d &= a.pendingLanes;
				c |= d;
				b.lanes = c;
				Dc(a, c);
			}
		}
		var Oe = {
			readContext: ld,
			useCallback: O$2,
			useContext: O$2,
			useEffect: O$2,
			useImperativeHandle: O$2,
			useInsertionEffect: O$2,
			useLayoutEffect: O$2,
			useMemo: O$2,
			useReducer: O$2,
			useRef: O$2,
			useState: O$2,
			useDebugValue: O$2,
			useDeferredValue: O$2,
			useTransition: O$2,
			useMutableSource: O$2,
			useSyncExternalStore: O$2,
			useId: O$2,
			unstable_isNewReconciler: !1
		}, Le = {
			readContext: ld,
			useCallback: function(a, b) {
				Qe().memoizedState = [a, void 0 === b ? null : b];
				return a;
			},
			useContext: ld,
			useEffect: hf,
			useImperativeHandle: function(a, b, c) {
				c = null !== c && void 0 !== c ? c.concat([a]) : null;
				return ff(4194308, 4, lf.bind(null, b, a), c);
			},
			useLayoutEffect: function(a, b) {
				return ff(4194308, 4, a, b);
			},
			useInsertionEffect: function(a, b) {
				return ff(4, 2, a, b);
			},
			useMemo: function(a, b) {
				var c = Qe();
				b = void 0 === b ? null : b;
				a = a();
				c.memoizedState = [a, b];
				return a;
			},
			useReducer: function(a, b, c) {
				var d = Qe();
				b = void 0 !== c ? c(b) : b;
				d.memoizedState = d.baseState = b;
				a = {
					pending: null,
					interleaved: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: a,
					lastRenderedState: b
				};
				d.queue = a;
				a = a.dispatch = sf.bind(null, K$2, a);
				return [d.memoizedState, a];
			},
			useRef: function(a) {
				var b = Qe();
				a = { current: a };
				return b.memoizedState = a;
			},
			useState: cf,
			useDebugValue: nf,
			useDeferredValue: function(a) {
				var b = cf(a), c = b[0], d = b[1];
				hf(function() {
					var b$1 = De.transition;
					De.transition = {};
					try {
						d(a);
					} finally {
						De.transition = b$1;
					}
				}, [a]);
				return c;
			},
			useTransition: function() {
				var a = cf(!1), b = a[0];
				a = qf.bind(null, a[1]);
				Qe().memoizedState = a;
				return [b, a];
			},
			useMutableSource: function() {},
			useSyncExternalStore: function(a, b, c) {
				var d = K$2, e = Qe();
				if (I$2) {
					if (void 0 === c) throw Error(n(407));
					c = c();
				} else {
					c = b();
					if (null === F$2) throw Error(n(349));
					0 !== (Ee & 30) || af(d, b, c);
				}
				e.memoizedState = c;
				var f$2 = {
					value: c,
					getSnapshot: b
				};
				e.queue = f$2;
				hf(Ye.bind(null, d, f$2, a), [a]);
				d.flags |= 2048;
				Ze(9, $e.bind(null, d, f$2, c, b), void 0, null);
				return c;
			},
			useId: function() {
				var a = Qe(), b = F$2.identifierPrefix;
				if (I$2) {
					var c = Od;
					var d = Nd;
					c = (d & ~(1 << 32 - qc(d) - 1)).toString(32) + c;
					b = ":" + b + "R" + c;
					c = He++;
					0 < c && (b += "H" + c.toString(32));
					b += ":";
				} else c = Ie++, b = ":" + b + "r" + c.toString(32) + ":";
				return a.memoizedState = b;
			},
			unstable_isNewReconciler: !1
		}, Me = {
			readContext: ld,
			useCallback: of,
			useContext: ld,
			useEffect: Xe,
			useImperativeHandle: mf,
			useInsertionEffect: jf,
			useLayoutEffect: kf,
			useMemo: pf,
			useReducer: Te,
			useRef: ef,
			useState: function() {
				return Te(Se);
			},
			useDebugValue: nf,
			useDeferredValue: function(a) {
				var b = Te(Se), c = b[0], d = b[1];
				Xe(function() {
					var b$1 = De.transition;
					De.transition = {};
					try {
						d(a);
					} finally {
						De.transition = b$1;
					}
				}, [a]);
				return c;
			},
			useTransition: function() {
				return [Te(Se)[0], Re().memoizedState];
			},
			useMutableSource: Ve,
			useSyncExternalStore: We,
			useId: rf,
			unstable_isNewReconciler: !1
		}, Ne = {
			readContext: ld,
			useCallback: of,
			useContext: ld,
			useEffect: Xe,
			useImperativeHandle: mf,
			useInsertionEffect: jf,
			useLayoutEffect: kf,
			useMemo: pf,
			useReducer: Ue,
			useRef: ef,
			useState: function() {
				return Ue(Se);
			},
			useDebugValue: nf,
			useDeferredValue: function(a) {
				var b = Ue(Se), c = b[0], d = b[1];
				Xe(function() {
					var b$1 = De.transition;
					De.transition = {};
					try {
						d(a);
					} finally {
						De.transition = b$1;
					}
				}, [a]);
				return c;
			},
			useTransition: function() {
				return [Ue(Se)[0], Re().memoizedState];
			},
			useMutableSource: Ve,
			useSyncExternalStore: We,
			useId: rf,
			unstable_isNewReconciler: !1
		};
		function xf(a, b) {
			try {
				var c = "", d = b;
				do
					c += $c(d), d = d.return;
				while (d);
				var e = c;
			} catch (f$2) {
				e = "\nError generating stack: " + f$2.message + "\n" + f$2.stack;
			}
			return {
				value: a,
				source: b,
				stack: e
			};
		}
		function yf(a, b) {
			try {
				console.error(b.value);
			} catch (c) {
				setTimeout(function() {
					throw c;
				});
			}
		}
		var zf = "function" === typeof WeakMap ? WeakMap : Map;
		function Af(a, b, c) {
			c = qd(-1, c);
			c.tag = 3;
			c.payload = { element: null };
			var d = b.value;
			c.callback = function() {
				Bf || (Bf = !0, Cf = d);
				yf(a, b);
			};
			return c;
		}
		function Df(a, b, c) {
			c = qd(-1, c);
			c.tag = 3;
			var d = a.type.getDerivedStateFromError;
			if ("function" === typeof d) {
				var e = b.value;
				c.payload = function() {
					return d(e);
				};
				c.callback = function() {
					yf(a, b);
				};
			}
			var f$2 = a.stateNode;
			null !== f$2 && "function" === typeof f$2.componentDidCatch && (c.callback = function() {
				yf(a, b);
				"function" !== typeof d && (null === Ef ? Ef = new Set([this]) : Ef.add(this));
				var c$1 = b.stack;
				this.componentDidCatch(b.value, { componentStack: null !== c$1 ? c$1 : "" });
			});
			return c;
		}
		function Ff(a, b, c) {
			var d = a.pingCache;
			if (null === d) {
				d = a.pingCache = new zf();
				var e = /* @__PURE__ */ new Set();
				d.set(b, e);
			} else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
			e.has(c) || (e.add(c), a = Gf.bind(null, a, b, c), b.then(a, a));
		}
		function Hf(a) {
			do {
				var b;
				if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? !0 : !1 : !0;
				if (b) return a;
				a = a.return;
			} while (null !== a);
			return null;
		}
		function If(a, b, c, d, e) {
			if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = qd(-1, 1), b.tag = 2, rd(c, b))), c.lanes |= 1), a;
			a.flags |= 65536;
			a.lanes = e;
			return a;
		}
		function Jf(a) {
			a.flags |= 4;
		}
		function Kf(a, b) {
			if (null !== a && a.child === b.child) return !0;
			if (0 !== (b.flags & 16)) return !1;
			for (a = b.child; null !== a;) {
				if (0 !== (a.flags & 12854) || 0 !== (a.subtreeFlags & 12854)) return !1;
				a = a.sibling;
			}
			return !0;
		}
		var Lf, Mf, Nf, Of;
		if (Ua) Lf = function(a, b) {
			for (var c = b.child; null !== c;) {
				if (5 === c.tag || 6 === c.tag) La(a, c.stateNode);
				else if (4 !== c.tag && null !== c.child) {
					c.child.return = c;
					c = c.child;
					continue;
				}
				if (c === b) break;
				for (; null === c.sibling;) {
					if (null === c.return || c.return === b) return;
					c = c.return;
				}
				c.sibling.return = c.return;
				c = c.sibling;
			}
		}, Mf = function() {}, Nf = function(a, b, c, d, e) {
			a = a.memoizedProps;
			if (a !== d) {
				var f$2 = b.stateNode, g$3 = ue(re.current);
				c = Na(f$2, c, a, d, e, g$3);
				(b.updateQueue = c) && Jf(b);
			}
		}, Of = function(a, b, c, d) {
			c !== d && Jf(b);
		};
		else if (Va) {
			Lf = function(a, b, c, d) {
				for (var e = b.child; null !== e;) {
					if (5 === e.tag) {
						var f$2 = e.stateNode;
						c && d && (f$2 = Db(f$2, e.type, e.memoizedProps, e));
						La(a, f$2);
					} else if (6 === e.tag) f$2 = e.stateNode, c && d && (f$2 = Eb(f$2, e.memoizedProps, e)), La(a, f$2);
					else if (4 !== e.tag) {
						if (22 === e.tag && null !== e.memoizedState) f$2 = e.child, null !== f$2 && (f$2.return = e), Lf(a, e, !0, !0);
						else if (null !== e.child) {
							e.child.return = e;
							e = e.child;
							continue;
						}
					}
					if (e === b) break;
					for (; null === e.sibling;) {
						if (null === e.return || e.return === b) return;
						e = e.return;
					}
					e.sibling.return = e.return;
					e = e.sibling;
				}
			};
			var Pf = function(a, b, c, d) {
				for (var e = b.child; null !== e;) {
					if (5 === e.tag) {
						var f$2 = e.stateNode;
						c && d && (f$2 = Db(f$2, e.type, e.memoizedProps, e));
						Ab(a, f$2);
					} else if (6 === e.tag) f$2 = e.stateNode, c && d && (f$2 = Eb(f$2, e.memoizedProps, e)), Ab(a, f$2);
					else if (4 !== e.tag) {
						if (22 === e.tag && null !== e.memoizedState) f$2 = e.child, null !== f$2 && (f$2.return = e), Pf(a, e, !0, !0);
						else if (null !== e.child) {
							e.child.return = e;
							e = e.child;
							continue;
						}
					}
					if (e === b) break;
					for (; null === e.sibling;) {
						if (null === e.return || e.return === b) return;
						e = e.return;
					}
					e.sibling.return = e.return;
					e = e.sibling;
				}
			};
			Mf = function(a, b) {
				var c = b.stateNode;
				if (!Kf(a, b)) {
					a = c.containerInfo;
					var d = zb(a);
					Pf(d, b, !1, !1);
					c.pendingChildren = d;
					Jf(b);
					Bb(a, d);
				}
			};
			Nf = function(a, b, c, d, e) {
				var f$2 = a.stateNode, g$3 = a.memoizedProps;
				if ((a = Kf(a, b)) && g$3 === d) b.stateNode = f$2;
				else {
					var h$2 = b.stateNode, k$3 = ue(re.current), l$2 = null;
					g$3 !== d && (l$2 = Na(h$2, c, g$3, d, e, k$3));
					a && null === l$2 ? b.stateNode = f$2 : (f$2 = yb(f$2, l$2, c, g$3, d, b, a, h$2), Ma(f$2, c, d, e, k$3) && Jf(b), b.stateNode = f$2, a ? Jf(b) : Lf(f$2, b, !1, !1));
				}
			};
			Of = function(a, b, c, d) {
				c !== d ? (a = ue(te.current), c = ue(re.current), b.stateNode = Pa(d, a, c, b), Jf(b)) : b.stateNode = a.stateNode;
			};
		} else Mf = function() {}, Nf = function() {}, Of = function() {};
		function Qf(a, b) {
			if (!I$2) switch (a.tailMode) {
				case "hidden":
					b = a.tail;
					for (var c = null; null !== b;) null !== b.alternate && (c = b), b = b.sibling;
					null === c ? a.tail = null : c.sibling = null;
					break;
				case "collapsed":
					c = a.tail;
					for (var d = null; null !== c;) null !== c.alternate && (d = c), c = c.sibling;
					null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
			}
		}
		function P$2(a) {
			var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
			if (b) for (var e = a.child; null !== e;) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
			else for (e = a.child; null !== e;) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
			a.subtreeFlags |= d;
			a.childLanes = c;
			return b;
		}
		function Rf(a, b, c) {
			var d = b.pendingProps;
			Sd(b);
			switch (b.tag) {
				case 2:
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14: return P$2(b), null;
				case 1: return C(b.type) && kc(), P$2(b), null;
				case 3:
					d = b.stateNode;
					we();
					x(B$2);
					x(A$2);
					Be();
					d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
					if (null === a || null === a.child) ce(b) ? Jf(b) : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== Wd && (Sf(Wd), Wd = null));
					Mf(a, b);
					P$2(b);
					return null;
				case 5:
					ye(b);
					c = ue(te.current);
					var e = b.type;
					if (null !== a && null != b.stateNode) Nf(a, b, e, d, c), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
					else {
						if (!d) {
							if (null === b.stateNode) throw Error(n(166));
							P$2(b);
							return null;
						}
						a = ue(re.current);
						if (ce(b)) {
							if (!p$3) throw Error(n(175));
							a = Pb(b.stateNode, b.type, b.memoizedProps, c, a, b, !Vd);
							b.updateQueue = a;
							null !== a && Jf(b);
						} else {
							var f$2 = Ka(e, d, c, a, b);
							Lf(f$2, b, !1, !1);
							b.stateNode = f$2;
							Ma(f$2, e, d, c, a) && Jf(b);
						}
						null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
					}
					P$2(b);
					return null;
				case 6:
					if (a && null != b.stateNode) Of(a, b, a.memoizedProps, d);
					else {
						if ("string" !== typeof d && null === b.stateNode) throw Error(n(166));
						a = ue(te.current);
						c = ue(re.current);
						if (ce(b)) {
							if (!p$3) throw Error(n(176));
							a = b.stateNode;
							d = b.memoizedProps;
							if (c = Qb(a, d, b, !Vd)) {
								if (e = Td, null !== e) switch (f$2 = 0 !== (e.mode & 1), e.tag) {
									case 3:
										Yb(e.stateNode.containerInfo, a, d, f$2);
										break;
									case 5: Zb(e.type, e.memoizedProps, e.stateNode, a, d, f$2);
								}
							}
							c && Jf(b);
						} else b.stateNode = Pa(d, a, c, b);
					}
					P$2(b);
					return null;
				case 13:
					x(J$2);
					d = b.memoizedState;
					if (I$2 && null !== Ud && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) {
						for (a = Ud; a;) a = Lb(a);
						de();
						b.flags |= 98560;
						return b;
					}
					if (null !== d && null !== d.dehydrated) {
						d = ce(b);
						if (null === a) {
							if (!d) throw Error(n(318));
							if (!p$3) throw Error(n(344));
							a = b.memoizedState;
							a = null !== a ? a.dehydrated : null;
							if (!a) throw Error(n(317));
							Rb(a, b);
						} else de(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
						P$2(b);
						return null;
					}
					null !== Wd && (Sf(Wd), Wd = null);
					if (0 !== (b.flags & 128)) return b.lanes = c, b;
					d = null !== d;
					c = !1;
					null === a ? ce(b) : c = null !== a.memoizedState;
					d && !c && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (J$2.current & 1) ? 0 === Q$2 && (Q$2 = 3) : Tf()));
					null !== b.updateQueue && (b.flags |= 4);
					P$2(b);
					return null;
				case 4: return we(), Mf(a, b), null === a && Xa(b.stateNode.containerInfo), P$2(b), null;
				case 10: return hd(b.type._context), P$2(b), null;
				case 17: return C(b.type) && kc(), P$2(b), null;
				case 19:
					x(J$2);
					e = b.memoizedState;
					if (null === e) return P$2(b), null;
					d = 0 !== (b.flags & 128);
					f$2 = e.rendering;
					if (null === f$2) if (d) Qf(e, !1);
					else {
						if (0 !== Q$2 || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a;) {
							f$2 = ze(a);
							if (null !== f$2) {
								b.flags |= 128;
								Qf(e, !1);
								a = f$2.updateQueue;
								null !== a && (b.updateQueue = a, b.flags |= 4);
								b.subtreeFlags = 0;
								a = c;
								for (d = b.child; null !== d;) c = d, e = a, c.flags &= 14680066, f$2 = c.alternate, null === f$2 ? (c.childLanes = 0, c.lanes = e, c.child = null, c.subtreeFlags = 0, c.memoizedProps = null, c.memoizedState = null, c.updateQueue = null, c.dependencies = null, c.stateNode = null) : (c.childLanes = f$2.childLanes, c.lanes = f$2.lanes, c.child = f$2.child, c.subtreeFlags = 0, c.deletions = null, c.memoizedProps = f$2.memoizedProps, c.memoizedState = f$2.memoizedState, c.updateQueue = f$2.updateQueue, c.type = f$2.type, e = f$2.dependencies, c.dependencies = null === e ? null : {
									lanes: e.lanes,
									firstContext: e.firstContext
								}), d = d.sibling;
								y$2(J$2, J$2.current & 1 | 2);
								return b.child;
							}
							a = a.sibling;
						}
						null !== e.tail && E$3() > Uf && (b.flags |= 128, d = !0, Qf(e, !1), b.lanes = 4194304);
					}
					else {
						if (!d) if (a = ze(f$2), null !== a) {
							if (b.flags |= 128, d = !0, a = a.updateQueue, null !== a && (b.updateQueue = a, b.flags |= 4), Qf(e, !0), null === e.tail && "hidden" === e.tailMode && !f$2.alternate && !I$2) return P$2(b), null;
						} else 2 * E$3() - e.renderingStartTime > Uf && 1073741824 !== c && (b.flags |= 128, d = !0, Qf(e, !1), b.lanes = 4194304);
						e.isBackwards ? (f$2.sibling = b.child, b.child = f$2) : (a = e.last, null !== a ? a.sibling = f$2 : b.child = f$2, e.last = f$2);
					}
					if (null !== e.tail) return b = e.tail, e.rendering = b, e.tail = b.sibling, e.renderingStartTime = E$3(), b.sibling = null, a = J$2.current, y$2(J$2, d ? a & 1 | 2 : a & 1), b;
					P$2(b);
					return null;
				case 22:
				case 23: return Vf(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (Wf & 1073741824) && (P$2(b), Ua && b.subtreeFlags & 6 && (b.flags |= 8192)) : P$2(b), null;
				case 24: return null;
				case 25: return null;
			}
			throw Error(n(156, b.tag));
		}
		var Xf = ea.ReactCurrentOwner, kd = !1;
		function R$2(a, b, c, d) {
			b.child = null === a ? pe(b, null, c, d) : oe(b, a.child, c, d);
		}
		function Yf(a, b, c, d, e) {
			c = c.render;
			var f$2 = b.ref;
			jd(b, e);
			d = Ke(a, b, c, d, f$2, e);
			c = Pe();
			if (null !== a && !kd) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zf(a, b, e);
			I$2 && c && Rd(b);
			b.flags |= 1;
			R$2(a, b, d, e);
			return b.child;
		}
		function $f(a, b, c, d, e) {
			if (null === a) {
				var f$2 = c.type;
				if ("function" === typeof f$2 && !ag(f$2) && void 0 === f$2.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f$2, bg(a, b, f$2, d, e);
				a = le(c.type, null, d, b, b.mode, e);
				a.ref = b.ref;
				a.return = b;
				return b.child = a;
			}
			f$2 = a.child;
			if (0 === (a.lanes & e)) {
				var g$3 = f$2.memoizedProps;
				c = c.compare;
				c = null !== c ? c : Zc;
				if (c(g$3, d) && a.ref === b.ref) return Zf(a, b, e);
			}
			b.flags |= 1;
			a = je(f$2, d);
			a.ref = b.ref;
			a.return = b;
			return b.child = a;
		}
		function bg(a, b, c, d, e) {
			if (null !== a && Zc(a.memoizedProps, d) && a.ref === b.ref) if (kd = !1, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (kd = !0);
			else return b.lanes = a.lanes, Zf(a, b, e);
			return cg(a, b, c, d, e);
		}
		function dg(a, b, c) {
			var d = b.pendingProps, e = d.children, f$2 = null !== a ? a.memoizedState : null;
			if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, y$2(eg, Wf), Wf |= c;
			else if (0 !== (c & 1073741824)) b.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, d = null !== f$2 ? f$2.baseLanes : c, y$2(eg, Wf), Wf |= d;
			else return a = null !== f$2 ? f$2.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = {
				baseLanes: a,
				cachePool: null
			}, b.updateQueue = null, y$2(eg, Wf), Wf |= a, null;
			else null !== f$2 ? (d = f$2.baseLanes | c, b.memoizedState = null) : d = c, y$2(eg, Wf), Wf |= d;
			R$2(a, b, e, c);
			return b.child;
		}
		function fg(a, b) {
			var c = b.ref;
			if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
		}
		function cg(a, b, c, d, e) {
			var f$2 = C(c) ? ic : A$2.current;
			f$2 = jc(b, f$2);
			jd(b, e);
			c = Ke(a, b, c, d, f$2, e);
			d = Pe();
			if (null !== a && !kd) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zf(a, b, e);
			I$2 && d && Rd(b);
			b.flags |= 1;
			R$2(a, b, c, e);
			return b.child;
		}
		function gg(a, b, c, d, e) {
			if (C(c)) {
				var f$2 = !0;
				nc(b);
			} else f$2 = !1;
			jd(b, e);
			if (null === b.stateNode) null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2), Dd(b, c, d), Fd(b, c, d, e), d = !0;
			else if (null === a) {
				var g$3 = b.stateNode, h$2 = b.memoizedProps;
				g$3.props = h$2;
				var k$3 = g$3.context, l$2 = c.contextType;
				"object" === typeof l$2 && null !== l$2 ? l$2 = ld(l$2) : (l$2 = C(c) ? ic : A$2.current, l$2 = jc(b, l$2));
				var m = c.getDerivedStateFromProps, v$2 = "function" === typeof m || "function" === typeof g$3.getSnapshotBeforeUpdate;
				v$2 || "function" !== typeof g$3.UNSAFE_componentWillReceiveProps && "function" !== typeof g$3.componentWillReceiveProps || (h$2 !== d || k$3 !== l$2) && Ed(b, g$3, d, l$2);
				nd = !1;
				var r$2 = b.memoizedState;
				g$3.state = r$2;
				ud(b, d, g$3, e);
				k$3 = b.memoizedState;
				h$2 !== d || r$2 !== k$3 || B$2.current || nd ? ("function" === typeof m && (yd(b, c, m, d), k$3 = b.memoizedState), (h$2 = nd || Cd(b, c, h$2, d, r$2, k$3, l$2)) ? (v$2 || "function" !== typeof g$3.UNSAFE_componentWillMount && "function" !== typeof g$3.componentWillMount || ("function" === typeof g$3.componentWillMount && g$3.componentWillMount(), "function" === typeof g$3.UNSAFE_componentWillMount && g$3.UNSAFE_componentWillMount()), "function" === typeof g$3.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g$3.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k$3), g$3.props = d, g$3.state = k$3, g$3.context = l$2, d = h$2) : ("function" === typeof g$3.componentDidMount && (b.flags |= 4194308), d = !1);
			} else {
				g$3 = b.stateNode;
				pd(a, b);
				h$2 = b.memoizedProps;
				l$2 = b.type === b.elementType ? h$2 : ad(b.type, h$2);
				g$3.props = l$2;
				v$2 = b.pendingProps;
				r$2 = g$3.context;
				k$3 = c.contextType;
				"object" === typeof k$3 && null !== k$3 ? k$3 = ld(k$3) : (k$3 = C(c) ? ic : A$2.current, k$3 = jc(b, k$3));
				var z$2 = c.getDerivedStateFromProps;
				(m = "function" === typeof z$2 || "function" === typeof g$3.getSnapshotBeforeUpdate) || "function" !== typeof g$3.UNSAFE_componentWillReceiveProps && "function" !== typeof g$3.componentWillReceiveProps || (h$2 !== v$2 || r$2 !== k$3) && Ed(b, g$3, d, k$3);
				nd = !1;
				r$2 = b.memoizedState;
				g$3.state = r$2;
				ud(b, d, g$3, e);
				var q$2 = b.memoizedState;
				h$2 !== v$2 || r$2 !== q$2 || B$2.current || nd ? ("function" === typeof z$2 && (yd(b, c, z$2, d), q$2 = b.memoizedState), (l$2 = nd || Cd(b, c, l$2, d, r$2, q$2, k$3) || !1) ? (m || "function" !== typeof g$3.UNSAFE_componentWillUpdate && "function" !== typeof g$3.componentWillUpdate || ("function" === typeof g$3.componentWillUpdate && g$3.componentWillUpdate(d, q$2, k$3), "function" === typeof g$3.UNSAFE_componentWillUpdate && g$3.UNSAFE_componentWillUpdate(d, q$2, k$3)), "function" === typeof g$3.componentDidUpdate && (b.flags |= 4), "function" === typeof g$3.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g$3.componentDidUpdate || h$2 === a.memoizedProps && r$2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g$3.getSnapshotBeforeUpdate || h$2 === a.memoizedProps && r$2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = q$2), g$3.props = d, g$3.state = q$2, g$3.context = k$3, d = l$2) : ("function" !== typeof g$3.componentDidUpdate || h$2 === a.memoizedProps && r$2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g$3.getSnapshotBeforeUpdate || h$2 === a.memoizedProps && r$2 === a.memoizedState || (b.flags |= 1024), d = !1);
			}
			return hg(a, b, c, d, f$2, e);
		}
		function hg(a, b, c, d, e, f$2) {
			fg(a, b);
			var g$3 = 0 !== (b.flags & 128);
			if (!d && !g$3) return e && oc(b, c, !1), Zf(a, b, f$2);
			d = b.stateNode;
			Xf.current = b;
			var h$2 = g$3 && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
			b.flags |= 1;
			null !== a && g$3 ? (b.child = oe(b, a.child, null, f$2), b.child = oe(b, null, h$2, f$2)) : R$2(a, b, h$2, f$2);
			b.memoizedState = d.state;
			e && oc(b, c, !0);
			return b.child;
		}
		function ig(a) {
			var b = a.stateNode;
			b.pendingContext ? lc(a, b.pendingContext, b.pendingContext !== b.context) : b.context && lc(a, b.context, !1);
			ve(a, b.containerInfo);
		}
		function jg(a, b, c, d, e) {
			de();
			ee(e);
			b.flags |= 256;
			R$2(a, b, c, d);
			return b.child;
		}
		var kg = {
			dehydrated: null,
			treeContext: null,
			retryLane: 0
		};
		function lg(a) {
			return {
				baseLanes: a,
				cachePool: null
			};
		}
		function mg(a, b, c) {
			var d = b.pendingProps, e = J$2.current, f$2 = !1, g$3 = 0 !== (b.flags & 128), h$2;
			(h$2 = g$3) || (h$2 = null !== a && null === a.memoizedState ? !1 : 0 !== (e & 2));
			if (h$2) f$2 = !0, b.flags &= -129;
			else if (null === a || null !== a.memoizedState) e |= 1;
			y$2(J$2, e & 1);
			if (null === a) {
				ae(b);
				a = b.memoizedState;
				if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : Jb(a) ? b.lanes = 8 : b.lanes = 1073741824, null;
				e = d.children;
				a = d.fallback;
				return f$2 ? (d = b.mode, f$2 = b.child, e = {
					mode: "hidden",
					children: e
				}, 0 === (d & 1) && null !== f$2 ? (f$2.childLanes = 0, f$2.pendingProps = e) : f$2 = ng(e, d, 0, null), a = ne(a, d, c, null), f$2.return = b, a.return = b, f$2.sibling = a, b.child = f$2, b.child.memoizedState = lg(c), b.memoizedState = kg, a) : og(b, e);
			}
			e = a.memoizedState;
			if (null !== e) {
				h$2 = e.dehydrated;
				if (null !== h$2) {
					if (g$3) {
						if (b.flags & 256) return b.flags &= -257, pg(a, b, c, Error(n(422)));
						if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
						f$2 = d.fallback;
						e = b.mode;
						d = ng({
							mode: "visible",
							children: d.children
						}, e, 0, null);
						f$2 = ne(f$2, e, c, null);
						f$2.flags |= 2;
						d.return = b;
						f$2.return = b;
						d.sibling = f$2;
						b.child = d;
						0 !== (b.mode & 1) && oe(b, a.child, null, c);
						b.child.memoizedState = lg(c);
						b.memoizedState = kg;
						return f$2;
					}
					if (0 === (b.mode & 1)) b = pg(a, b, c, null);
					else if (Jb(h$2)) b = pg(a, b, c, Error(n(419)));
					else if (d = 0 !== (c & a.childLanes), kd || d) {
						d = F$2;
						if (null !== d) {
							switch (c & -c) {
								case 4:
									f$2 = 2;
									break;
								case 16:
									f$2 = 8;
									break;
								case 64:
								case 128:
								case 256:
								case 512:
								case 1024:
								case 2048:
								case 4096:
								case 8192:
								case 16384:
								case 32768:
								case 65536:
								case 131072:
								case 262144:
								case 524288:
								case 1048576:
								case 2097152:
								case 4194304:
								case 8388608:
								case 16777216:
								case 33554432:
								case 67108864:
									f$2 = 32;
									break;
								case 536870912:
									f$2 = 268435456;
									break;
								default: f$2 = 0;
							}
							d = 0 !== (f$2 & (d.suspendedLanes | c)) ? 0 : f$2;
							0 !== d && d !== e.retryLane && (e.retryLane = d, Ad(a, d, -1));
						}
						Tf();
						b = pg(a, b, c, Error(n(421)));
					} else Ib(h$2) ? (b.flags |= 128, b.child = a.child, b = qg.bind(null, a), Kb(h$2, b), b = null) : (c = e.treeContext, p$3 && (Ud = Ob(h$2), Td = b, I$2 = !0, Wd = null, Vd = !1, null !== c && (Kd[Ld++] = Nd, Kd[Ld++] = Od, Kd[Ld++] = Md, Nd = c.id, Od = c.overflow, Md = b)), b = og(b, b.pendingProps.children), b.flags |= 4096);
					return b;
				}
				if (f$2) return d = rg(a, b, d.children, d.fallback, c), f$2 = b.child, e = a.child.memoizedState, f$2.memoizedState = null === e ? lg(c) : {
					baseLanes: e.baseLanes | c,
					cachePool: null
				}, f$2.childLanes = a.childLanes & ~c, b.memoizedState = kg, d;
				c = sg(a, b, d.children, c);
				b.memoizedState = null;
				return c;
			}
			if (f$2) return d = rg(a, b, d.children, d.fallback, c), f$2 = b.child, e = a.child.memoizedState, f$2.memoizedState = null === e ? lg(c) : {
				baseLanes: e.baseLanes | c,
				cachePool: null
			}, f$2.childLanes = a.childLanes & ~c, b.memoizedState = kg, d;
			c = sg(a, b, d.children, c);
			b.memoizedState = null;
			return c;
		}
		function og(a, b) {
			b = ng({
				mode: "visible",
				children: b
			}, a.mode, 0, null);
			b.return = a;
			return a.child = b;
		}
		function sg(a, b, c, d) {
			var e = a.child;
			a = e.sibling;
			c = je(e, {
				mode: "visible",
				children: c
			});
			0 === (b.mode & 1) && (c.lanes = d);
			c.return = b;
			c.sibling = null;
			null !== a && (d = b.deletions, null === d ? (b.deletions = [a], b.flags |= 16) : d.push(a));
			return b.child = c;
		}
		function rg(a, b, c, d, e) {
			var f$2 = b.mode;
			a = a.child;
			var g$3 = a.sibling, h$2 = {
				mode: "hidden",
				children: c
			};
			0 === (f$2 & 1) && b.child !== a ? (c = b.child, c.childLanes = 0, c.pendingProps = h$2, b.deletions = null) : (c = je(a, h$2), c.subtreeFlags = a.subtreeFlags & 14680064);
			null !== g$3 ? d = je(g$3, d) : (d = ne(d, f$2, e, null), d.flags |= 2);
			d.return = b;
			c.return = b;
			c.sibling = d;
			b.child = c;
			return d;
		}
		function pg(a, b, c, d) {
			null !== d && ee(d);
			oe(b, a.child, null, c);
			a = og(b, b.pendingProps.children);
			a.flags |= 2;
			b.memoizedState = null;
			return a;
		}
		function tg(a, b, c) {
			a.lanes |= b;
			var d = a.alternate;
			null !== d && (d.lanes |= b);
			id(a.return, b, c);
		}
		function ug(a, b, c, d, e) {
			var f$2 = a.memoizedState;
			null === f$2 ? a.memoizedState = {
				isBackwards: b,
				rendering: null,
				renderingStartTime: 0,
				last: d,
				tail: c,
				tailMode: e
			} : (f$2.isBackwards = b, f$2.rendering = null, f$2.renderingStartTime = 0, f$2.last = d, f$2.tail = c, f$2.tailMode = e);
		}
		function vg(a, b, c) {
			var d = b.pendingProps, e = d.revealOrder, f$2 = d.tail;
			R$2(a, b, d.children, c);
			d = J$2.current;
			if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
			else {
				if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a;) {
					if (13 === a.tag) null !== a.memoizedState && tg(a, c, b);
					else if (19 === a.tag) tg(a, c, b);
					else if (null !== a.child) {
						a.child.return = a;
						a = a.child;
						continue;
					}
					if (a === b) break a;
					for (; null === a.sibling;) {
						if (null === a.return || a.return === b) break a;
						a = a.return;
					}
					a.sibling.return = a.return;
					a = a.sibling;
				}
				d &= 1;
			}
			y$2(J$2, d);
			if (0 === (b.mode & 1)) b.memoizedState = null;
			else switch (e) {
				case "forwards":
					c = b.child;
					for (e = null; null !== c;) a = c.alternate, null !== a && null === ze(a) && (e = c), c = c.sibling;
					c = e;
					null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
					ug(b, !1, e, c, f$2);
					break;
				case "backwards":
					c = null;
					e = b.child;
					for (b.child = null; null !== e;) {
						a = e.alternate;
						if (null !== a && null === ze(a)) {
							b.child = e;
							break;
						}
						a = e.sibling;
						e.sibling = c;
						c = e;
						e = a;
					}
					ug(b, !0, c, null, f$2);
					break;
				case "together":
					ug(b, !1, null, null, void 0);
					break;
				default: b.memoizedState = null;
			}
			return b.child;
		}
		function Zf(a, b, c) {
			null !== a && (b.dependencies = a.dependencies);
			vd |= b.lanes;
			if (0 === (c & b.childLanes)) return null;
			if (null !== a && b.child !== a.child) throw Error(n(153));
			if (null !== b.child) {
				a = b.child;
				c = je(a, a.pendingProps);
				b.child = c;
				for (c.return = b; null !== a.sibling;) a = a.sibling, c = c.sibling = je(a, a.pendingProps), c.return = b;
				c.sibling = null;
			}
			return b.child;
		}
		function wg(a, b, c) {
			switch (b.tag) {
				case 3:
					ig(b);
					de();
					break;
				case 5:
					xe(b);
					break;
				case 1:
					C(b.type) && nc(b);
					break;
				case 4:
					ve(b, b.stateNode.containerInfo);
					break;
				case 10:
					gd(b, b.type._context, b.memoizedProps.value);
					break;
				case 13:
					var d = b.memoizedState;
					if (null !== d) {
						if (null !== d.dehydrated) return y$2(J$2, J$2.current & 1), b.flags |= 128, null;
						if (0 !== (c & b.child.childLanes)) return mg(a, b, c);
						y$2(J$2, J$2.current & 1);
						a = Zf(a, b, c);
						return null !== a ? a.sibling : null;
					}
					y$2(J$2, J$2.current & 1);
					break;
				case 19:
					d = 0 !== (c & b.childLanes);
					if (0 !== (a.flags & 128)) {
						if (d) return vg(a, b, c);
						b.flags |= 128;
					}
					var e = b.memoizedState;
					null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
					y$2(J$2, J$2.current);
					if (d) break;
					else return null;
				case 22:
				case 23: return b.lanes = 0, dg(a, b, c);
			}
			return Zf(a, b, c);
		}
		function xg(a, b) {
			Sd(b);
			switch (b.tag) {
				case 1: return C(b.type) && kc(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
				case 3: return we(), x(B$2), x(A$2), Be(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
				case 5: return ye(b), null;
				case 13:
					x(J$2);
					a = b.memoizedState;
					if (null !== a && null !== a.dehydrated) {
						if (null === b.alternate) throw Error(n(340));
						de();
					}
					a = b.flags;
					return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
				case 19: return x(J$2), null;
				case 4: return we(), null;
				case 10: return hd(b.type._context), null;
				case 22:
				case 23: return Vf(), null;
				case 24: return null;
				default: return null;
			}
		}
		var yg = !1, zg = !1, Ag = "function" === typeof WeakSet ? WeakSet : Set, S$2 = null;
		function Bg(a, b) {
			var c = a.ref;
			if (null !== c) if ("function" === typeof c) try {
				c(null);
			} catch (d) {
				T$3(a, b, d);
			}
			else c.current = null;
		}
		function Cg(a, b, c) {
			try {
				c();
			} catch (d) {
				T$3(a, b, d);
			}
		}
		var Dg = !1;
		function Eg(a, b) {
			Ia(a.containerInfo);
			for (S$2 = b; null !== S$2;) if (a = S$2, b = a.child, 0 !== (a.subtreeFlags & 1028) && null !== b) b.return = a, S$2 = b;
			else for (; null !== S$2;) {
				a = S$2;
				try {
					var c = a.alternate;
					if (0 !== (a.flags & 1024)) switch (a.tag) {
						case 0:
						case 11:
						case 15: break;
						case 1:
							if (null !== c) {
								var d = c.memoizedProps, e = c.memoizedState, f$2 = a.stateNode;
								f$2.__reactInternalSnapshotBeforeUpdate = f$2.getSnapshotBeforeUpdate(a.elementType === a.type ? d : ad(a.type, d), e);
							}
							break;
						case 3:
							Ua && xb(a.stateNode.containerInfo);
							break;
						case 5:
						case 6:
						case 4:
						case 17: break;
						default: throw Error(n(163));
					}
				} catch (h$2) {
					T$3(a, a.return, h$2);
				}
				b = a.sibling;
				if (null !== b) {
					b.return = a.return;
					S$2 = b;
					break;
				}
				S$2 = a.return;
			}
			c = Dg;
			Dg = !1;
			return c;
		}
		function Fg(a, b, c) {
			var d = b.updateQueue;
			d = null !== d ? d.lastEffect : null;
			if (null !== d) {
				var e = d = d.next;
				do {
					if ((e.tag & a) === a) {
						var f$2 = e.destroy;
						e.destroy = void 0;
						void 0 !== f$2 && Cg(b, c, f$2);
					}
					e = e.next;
				} while (e !== d);
			}
		}
		function Gg(a, b) {
			b = b.updateQueue;
			b = null !== b ? b.lastEffect : null;
			if (null !== b) {
				var c = b = b.next;
				do {
					if ((c.tag & a) === a) {
						var d = c.create;
						c.destroy = d();
					}
					c = c.next;
				} while (c !== b);
			}
		}
		function Hg(a) {
			var b = a.ref;
			if (null !== b) {
				var c = a.stateNode;
				switch (a.tag) {
					case 5:
						a = Fa(c);
						break;
					default: a = c;
				}
				"function" === typeof b ? b(a) : b.current = a;
			}
		}
		function Ig(a, b, c) {
			if (Oc && "function" === typeof Oc.onCommitFiberUnmount) try {
				Oc.onCommitFiberUnmount(Nc, b);
			} catch (g$3) {}
			switch (b.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					a = b.updateQueue;
					if (null !== a && (a = a.lastEffect, null !== a)) {
						var d = a = a.next;
						do {
							var e = d, f$2 = e.destroy;
							e = e.tag;
							void 0 !== f$2 && (0 !== (e & 2) ? Cg(b, c, f$2) : 0 !== (e & 4) && Cg(b, c, f$2));
							d = d.next;
						} while (d !== a);
					}
					break;
				case 1:
					Bg(b, c);
					a = b.stateNode;
					if ("function" === typeof a.componentWillUnmount) try {
						a.props = b.memoizedProps, a.state = b.memoizedState, a.componentWillUnmount();
					} catch (g$3) {
						T$3(b, c, g$3);
					}
					break;
				case 5:
					Bg(b, c);
					break;
				case 4: Ua ? Jg(a, b, c) : Va && Va && (b = b.stateNode.containerInfo, c = zb(b), Cb(b, c));
			}
		}
		function Kg(a, b, c) {
			for (var d = b;;) if (Ig(a, d, c), null === d.child || Ua && 4 === d.tag) {
				if (d === b) break;
				for (; null === d.sibling;) {
					if (null === d.return || d.return === b) return;
					d = d.return;
				}
				d.sibling.return = d.return;
				d = d.sibling;
			} else d.child.return = d, d = d.child;
		}
		function Lg(a) {
			var b = a.alternate;
			null !== b && (a.alternate = null, Lg(b));
			a.child = null;
			a.deletions = null;
			a.sibling = null;
			5 === a.tag && (b = a.stateNode, null !== b && Za(b));
			a.stateNode = null;
			a.return = null;
			a.dependencies = null;
			a.memoizedProps = null;
			a.memoizedState = null;
			a.pendingProps = null;
			a.stateNode = null;
			a.updateQueue = null;
		}
		function Mg(a) {
			return 5 === a.tag || 3 === a.tag || 4 === a.tag;
		}
		function Ng(a) {
			a: for (;;) {
				for (; null === a.sibling;) {
					if (null === a.return || Mg(a.return)) return null;
					a = a.return;
				}
				a.sibling.return = a.return;
				for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag;) {
					if (a.flags & 2) continue a;
					if (null === a.child || 4 === a.tag) continue a;
					else a.child.return = a, a = a.child;
				}
				if (!(a.flags & 2)) return a.stateNode;
			}
		}
		function Og(a) {
			if (Ua) {
				a: {
					for (var b = a.return; null !== b;) {
						if (Mg(b)) break a;
						b = b.return;
					}
					throw Error(n(160));
				}
				var c = b;
				switch (c.tag) {
					case 5:
						b = c.stateNode;
						c.flags & 32 && (sb(b), c.flags &= -33);
						c = Ng(a);
						Pg(a, c, b);
						break;
					case 3:
					case 4:
						b = c.stateNode.containerInfo;
						c = Ng(a);
						Qg(a, c, b);
						break;
					default: throw Error(n(161));
				}
			}
		}
		function Qg(a, b, c) {
			var d = a.tag;
			if (5 === d || 6 === d) a = a.stateNode, b ? pb(c, a, b) : kb(c, a);
			else if (4 !== d && (a = a.child, null !== a)) for (Qg(a, b, c), a = a.sibling; null !== a;) Qg(a, b, c), a = a.sibling;
		}
		function Pg(a, b, c) {
			var d = a.tag;
			if (5 === d || 6 === d) a = a.stateNode, b ? ob(c, a, b) : jb(c, a);
			else if (4 !== d && (a = a.child, null !== a)) for (Pg(a, b, c), a = a.sibling; null !== a;) Pg(a, b, c), a = a.sibling;
		}
		function Jg(a, b, c) {
			for (var d = b, e = !1, f$2, g$3;;) {
				if (!e) {
					e = d.return;
					a: for (;;) {
						if (null === e) throw Error(n(160));
						f$2 = e.stateNode;
						switch (e.tag) {
							case 5:
								g$3 = !1;
								break a;
							case 3:
								f$2 = f$2.containerInfo;
								g$3 = !0;
								break a;
							case 4:
								f$2 = f$2.containerInfo;
								g$3 = !0;
								break a;
						}
						e = e.return;
					}
					e = !0;
				}
				if (5 === d.tag || 6 === d.tag) Kg(a, d, c), g$3 ? rb(f$2, d.stateNode) : qb(f$2, d.stateNode);
				else if (18 === d.tag) g$3 ? Wb(f$2, d.stateNode) : Vb(f$2, d.stateNode);
				else if (4 === d.tag) {
					if (null !== d.child) {
						f$2 = d.stateNode.containerInfo;
						g$3 = !0;
						d.child.return = d;
						d = d.child;
						continue;
					}
				} else if (Ig(a, d, c), null !== d.child) {
					d.child.return = d;
					d = d.child;
					continue;
				}
				if (d === b) break;
				for (; null === d.sibling;) {
					if (null === d.return || d.return === b) return;
					d = d.return;
					4 === d.tag && (e = !1);
				}
				d.sibling.return = d.return;
				d = d.sibling;
			}
		}
		function Rg(a, b) {
			if (Ua) {
				switch (b.tag) {
					case 0:
					case 11:
					case 14:
					case 15:
						Fg(3, b, b.return);
						Gg(3, b);
						Fg(5, b, b.return);
						return;
					case 1: return;
					case 5:
						var c = b.stateNode;
						if (null != c) {
							var d = b.memoizedProps;
							a = null !== a ? a.memoizedProps : d;
							var e = b.type, f$2 = b.updateQueue;
							b.updateQueue = null;
							null !== f$2 && nb(c, f$2, e, a, d, b);
						}
						return;
					case 6:
						if (null === b.stateNode) throw Error(n(162));
						c = b.memoizedProps;
						lb(b.stateNode, null !== a ? a.memoizedProps : c, c);
						return;
					case 3:
						p$3 && null !== a && a.memoizedState.isDehydrated && Tb(b.stateNode.containerInfo);
						return;
					case 12: return;
					case 13:
						Sg(b);
						return;
					case 19:
						Sg(b);
						return;
					case 17: return;
				}
				throw Error(n(163));
			}
			switch (b.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Fg(3, b, b.return);
					Gg(3, b);
					Fg(5, b, b.return);
					return;
				case 12: return;
				case 13:
					Sg(b);
					return;
				case 19:
					Sg(b);
					return;
				case 3:
					p$3 && null !== a && a.memoizedState.isDehydrated && Tb(b.stateNode.containerInfo);
					break;
				case 22:
				case 23: return;
			}
			a: if (Va) {
				switch (b.tag) {
					case 1:
					case 5:
					case 6: break a;
					case 3:
					case 4:
						b = b.stateNode;
						Cb(b.containerInfo, b.pendingChildren);
						break a;
				}
				throw Error(n(163));
			}
		}
		function Sg(a) {
			var b = a.updateQueue;
			if (null !== b) {
				a.updateQueue = null;
				var c = a.stateNode;
				null === c && (c = a.stateNode = new Ag());
				b.forEach(function(b$1) {
					var d = Tg.bind(null, a, b$1);
					c.has(b$1) || (c.add(b$1), b$1.then(d, d));
				});
			}
		}
		function Ug(a, b) {
			for (S$2 = b; null !== S$2;) {
				b = S$2;
				var c = b.deletions;
				if (null !== c) for (var d = 0; d < c.length; d++) {
					var e = c[d];
					try {
						var f$2 = a;
						Ua ? Jg(f$2, e, b) : Kg(f$2, e, b);
						var g$3 = e.alternate;
						null !== g$3 && (g$3.return = null);
						e.return = null;
					} catch (wa) {
						T$3(e, b, wa);
					}
				}
				c = b.child;
				if (0 !== (b.subtreeFlags & 12854) && null !== c) c.return = b, S$2 = c;
				else for (; null !== S$2;) {
					b = S$2;
					try {
						var h$2 = b.flags;
						h$2 & 32 && Ua && sb(b.stateNode);
						if (h$2 & 512) {
							var k$3 = b.alternate;
							if (null !== k$3) {
								var l$2 = k$3.ref;
								null !== l$2 && ("function" === typeof l$2 ? l$2(null) : l$2.current = null);
							}
						}
						if (h$2 & 8192) switch (b.tag) {
							case 13:
								if (null !== b.memoizedState) {
									var m = b.alternate;
									if (null === m || null === m.memoizedState) Vg = E$3();
								}
								break;
							case 22:
								var v$2 = null !== b.memoizedState, r$2 = b.alternate, z$2 = null !== r$2 && null !== r$2.memoizedState;
								c = b;
								if (Ua) {
									a: if (d = c, e = v$2, f$2 = null, Ua) for (var q$2 = d;;) {
										if (5 === q$2.tag) {
											if (null === f$2) {
												f$2 = q$2;
												var N$2 = q$2.stateNode;
												e ? tb(N$2) : vb(q$2.stateNode, q$2.memoizedProps);
											}
										} else if (6 === q$2.tag) {
											if (null === f$2) {
												var da = q$2.stateNode;
												e ? ub(da) : wb(da, q$2.memoizedProps);
											}
										} else if ((22 !== q$2.tag && 23 !== q$2.tag || null === q$2.memoizedState || q$2 === d) && null !== q$2.child) {
											q$2.child.return = q$2;
											q$2 = q$2.child;
											continue;
										}
										if (q$2 === d) break;
										for (; null === q$2.sibling;) {
											if (null === q$2.return || q$2.return === d) break a;
											f$2 === q$2 && (f$2 = null);
											q$2 = q$2.return;
										}
										f$2 === q$2 && (f$2 = null);
										q$2.sibling.return = q$2.return;
										q$2 = q$2.sibling;
									}
								}
								if (v$2 && !z$2 && 0 !== (c.mode & 1)) {
									S$2 = c;
									for (var t$2 = c.child; null !== t$2;) {
										for (c = S$2 = t$2; null !== S$2;) {
											d = S$2;
											var w = d.child;
											switch (d.tag) {
												case 0:
												case 11:
												case 14:
												case 15:
													Fg(4, d, d.return);
													break;
												case 1:
													Bg(d, d.return);
													var u$3 = d.stateNode;
													if ("function" === typeof u$3.componentWillUnmount) {
														var V = d.return;
														try {
															u$3.props = d.memoizedProps, u$3.state = d.memoizedState, u$3.componentWillUnmount();
														} catch (wa) {
															T$3(d, V, wa);
														}
													}
													break;
												case 5:
													Bg(d, d.return);
													break;
												case 22: if (null !== d.memoizedState) {
													Wg(c);
													continue;
												}
											}
											null !== w ? (w.return = d, S$2 = w) : Wg(c);
										}
										t$2 = t$2.sibling;
									}
								}
						}
						switch (h$2 & 4102) {
							case 2:
								Og(b);
								b.flags &= -3;
								break;
							case 6:
								Og(b);
								b.flags &= -3;
								Rg(b.alternate, b);
								break;
							case 4096:
								b.flags &= -4097;
								break;
							case 4100:
								b.flags &= -4097;
								Rg(b.alternate, b);
								break;
							case 4: Rg(b.alternate, b);
						}
					} catch (wa) {
						T$3(b, b.return, wa);
					}
					c = b.sibling;
					if (null !== c) {
						c.return = b.return;
						S$2 = c;
						break;
					}
					S$2 = b.return;
				}
			}
		}
		function Xg(a, b, c) {
			S$2 = a;
			Yg(a, b, c);
		}
		function Yg(a, b, c) {
			for (var d = 0 !== (a.mode & 1); null !== S$2;) {
				var e = S$2, f$2 = e.child;
				if (22 === e.tag && d) {
					var g$3 = null !== e.memoizedState || yg;
					if (!g$3) {
						var h$2 = e.alternate, k$3 = null !== h$2 && null !== h$2.memoizedState || zg;
						h$2 = yg;
						var l$2 = zg;
						yg = g$3;
						if ((zg = k$3) && !l$2) for (S$2 = e; null !== S$2;) g$3 = S$2, k$3 = g$3.child, 22 === g$3.tag && null !== g$3.memoizedState ? Zg(e) : null !== k$3 ? (k$3.return = g$3, S$2 = k$3) : Zg(e);
						for (; null !== f$2;) S$2 = f$2, Yg(f$2, b, c), f$2 = f$2.sibling;
						S$2 = e;
						yg = h$2;
						zg = l$2;
					}
					$g(a, b, c);
				} else 0 !== (e.subtreeFlags & 8772) && null !== f$2 ? (f$2.return = e, S$2 = f$2) : $g(a, b, c);
			}
		}
		function $g(a) {
			for (; null !== S$2;) {
				var b = S$2;
				if (0 !== (b.flags & 8772)) {
					var c = b.alternate;
					try {
						if (0 !== (b.flags & 8772)) switch (b.tag) {
							case 0:
							case 11:
							case 15:
								zg || Gg(5, b);
								break;
							case 1:
								var d = b.stateNode;
								if (b.flags & 4 && !zg) if (null === c) d.componentDidMount();
								else {
									var e = b.elementType === b.type ? c.memoizedProps : ad(b.type, c.memoizedProps);
									d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
								}
								var f$2 = b.updateQueue;
								null !== f$2 && wd(b, f$2, d);
								break;
							case 3:
								var g$3 = b.updateQueue;
								if (null !== g$3) {
									c = null;
									if (null !== b.child) switch (b.child.tag) {
										case 5:
											c = Fa(b.child.stateNode);
											break;
										case 1: c = b.child.stateNode;
									}
									wd(b, g$3, c);
								}
								break;
							case 5:
								var h$2 = b.stateNode;
								null === c && b.flags & 4 && mb(h$2, b.type, b.memoizedProps, b);
								break;
							case 6: break;
							case 4: break;
							case 12: break;
							case 13:
								if (p$3 && null === b.memoizedState) {
									var k$3 = b.alternate;
									if (null !== k$3) {
										var l$2 = k$3.memoizedState;
										if (null !== l$2) {
											var m = l$2.dehydrated;
											null !== m && Ub(m);
										}
									}
								}
								break;
							case 19:
							case 17:
							case 21:
							case 22:
							case 23: break;
							default: throw Error(n(163));
						}
						zg || b.flags & 512 && Hg(b);
					} catch (v$2) {
						T$3(b, b.return, v$2);
					}
				}
				if (b === a) {
					S$2 = null;
					break;
				}
				c = b.sibling;
				if (null !== c) {
					c.return = b.return;
					S$2 = c;
					break;
				}
				S$2 = b.return;
			}
		}
		function Wg(a) {
			for (; null !== S$2;) {
				var b = S$2;
				if (b === a) {
					S$2 = null;
					break;
				}
				var c = b.sibling;
				if (null !== c) {
					c.return = b.return;
					S$2 = c;
					break;
				}
				S$2 = b.return;
			}
		}
		function Zg(a) {
			for (; null !== S$2;) {
				var b = S$2;
				try {
					switch (b.tag) {
						case 0:
						case 11:
						case 15:
							var c = b.return;
							try {
								Gg(4, b);
							} catch (k$3) {
								T$3(b, c, k$3);
							}
							break;
						case 1:
							var d = b.stateNode;
							if ("function" === typeof d.componentDidMount) {
								var e = b.return;
								try {
									d.componentDidMount();
								} catch (k$3) {
									T$3(b, e, k$3);
								}
							}
							var f$2 = b.return;
							try {
								Hg(b);
							} catch (k$3) {
								T$3(b, f$2, k$3);
							}
							break;
						case 5:
							var g$3 = b.return;
							try {
								Hg(b);
							} catch (k$3) {
								T$3(b, g$3, k$3);
							}
					}
				} catch (k$3) {
					T$3(b, b.return, k$3);
				}
				if (b === a) {
					S$2 = null;
					break;
				}
				var h$2 = b.sibling;
				if (null !== h$2) {
					h$2.return = b.return;
					S$2 = h$2;
					break;
				}
				S$2 = b.return;
			}
		}
		var ah = 0, bh = 1, ch = 2, dh = 3, eh = 4;
		if ("function" === typeof Symbol && Symbol.for) {
			var fh = Symbol.for;
			ah = fh("selector.component");
			bh = fh("selector.has_pseudo_class");
			ch = fh("selector.role");
			dh = fh("selector.test_id");
			eh = fh("selector.text");
		}
		function gh(a) {
			var b = Wa(a);
			if (null != b) {
				if ("string" !== typeof b.memoizedProps["data-testname"]) throw Error(n(364));
				return b;
			}
			a = cb(a);
			if (null === a) throw Error(n(362));
			return a.stateNode.current;
		}
		function hh(a, b) {
			switch (b.$$typeof) {
				case ah:
					if (a.type === b.value) return !0;
					break;
				case bh:
					a: {
						b = b.value;
						a = [a, 0];
						for (var c = 0; c < a.length;) {
							var d = a[c++], e = a[c++], f$2 = b[e];
							if (5 !== d.tag || !fb(d)) {
								for (; null != f$2 && hh(d, f$2);) e++, f$2 = b[e];
								if (e === b.length) {
									b = !0;
									break a;
								} else for (d = d.child; null !== d;) a.push(d, e), d = d.sibling;
							}
						}
						b = !1;
					}
					return b;
				case ch:
					if (5 === a.tag && gb(a.stateNode, b.value)) return !0;
					break;
				case eh:
					if (5 === a.tag || 6 === a.tag) {
						if (a = eb(a), null !== a && 0 <= a.indexOf(b.value)) return !0;
					}
					break;
				case dh:
					if (5 === a.tag && (a = a.memoizedProps["data-testname"], "string" === typeof a && a.toLowerCase() === b.value.toLowerCase())) return !0;
					break;
				default: throw Error(n(365));
			}
			return !1;
		}
		function ih(a) {
			switch (a.$$typeof) {
				case ah: return "<" + (va(a.value) || "Unknown") + ">";
				case bh: return ":has(" + (ih(a) || "") + ")";
				case ch: return "[role=\"" + a.value + "\"]";
				case eh: return "\"" + a.value + "\"";
				case dh: return "[data-testname=\"" + a.value + "\"]";
				default: throw Error(n(365));
			}
		}
		function jh(a, b) {
			var c = [];
			a = [a, 0];
			for (var d = 0; d < a.length;) {
				var e = a[d++], f$2 = a[d++], g$3 = b[f$2];
				if (5 !== e.tag || !fb(e)) {
					for (; null != g$3 && hh(e, g$3);) f$2++, g$3 = b[f$2];
					if (f$2 === b.length) c.push(e);
					else for (e = e.child; null !== e;) a.push(e, f$2), e = e.sibling;
				}
			}
			return c;
		}
		function kh(a, b) {
			if (!bb) throw Error(n(363));
			a = gh(a);
			a = jh(a, b);
			b = [];
			a = Array.from(a);
			for (var c = 0; c < a.length;) {
				var d = a[c++];
				if (5 === d.tag) fb(d) || b.push(d.stateNode);
				else for (d = d.child; null !== d;) a.push(d), d = d.sibling;
			}
			return b;
		}
		var lh = Math.ceil, mh = ea.ReactCurrentDispatcher, nh = ea.ReactCurrentOwner, U$2 = ea.ReactCurrentBatchConfig, G$2 = 0, F$2 = null, W$1 = null, X$1 = 0, Wf = 0, eg = gc(0), Q$2 = 0, oh = null, vd = 0, ph = 0, qh = 0, rh = null, Y = null, Vg = 0, Uf = Infinity;
		function sh() {
			Uf = E$3() + 500;
		}
		var Bf = !1, Cf = null, Ef = null, th = !1, uh = null, vh = 0, wh = 0, xh = null, yh = -1, zh = 0;
		function H$2() {
			return 0 !== (G$2 & 6) ? E$3() : -1 !== yh ? yh : yh = E$3();
		}
		function zd(a) {
			if (0 === (a.mode & 1)) return 1;
			if (0 !== (G$2 & 2) && 0 !== X$1) return X$1 & -X$1;
			if (null !== Yc.transition) return 0 === zh && (a = tc, tc <<= 1, 0 === (tc & 4194240) && (tc = 64), zh = a), zh;
			a = D$3;
			return 0 !== a ? a : Ya();
		}
		function Ad(a, b, c) {
			if (50 < wh) throw wh = 0, xh = null, Error(n(185));
			var d = Ah(a, b);
			if (null === d) return null;
			Bc(d, b, c);
			if (0 === (G$2 & 2) || d !== F$2) d === F$2 && (0 === (G$2 & 2) && (ph |= b), 4 === Q$2 && Bh(d, X$1)), Z(d, c), 1 === b && 0 === G$2 && 0 === (a.mode & 1) && (sh(), Tc && Xc());
			return d;
		}
		function Ah(a, b) {
			a.lanes |= b;
			var c = a.alternate;
			null !== c && (c.lanes |= b);
			c = a;
			for (a = a.return; null !== a;) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
			return 3 === c.tag ? c.stateNode : null;
		}
		function Z(a, b) {
			var c = a.callbackNode;
			yc(a, b);
			var d = wc(a, a === F$2 ? X$1 : 0);
			if (0 === d) null !== c && Gc(c), a.callbackNode = null, a.callbackPriority = 0;
			else if (b = d & -d, a.callbackPriority !== b) {
				null != c && Gc(c);
				if (1 === b) 0 === a.tag ? Wc(Ch.bind(null, a)) : Vc(Ch.bind(null, a)), $a ? ab(function() {
					0 === G$2 && Xc();
				}) : Fc(Jc, Xc), c = null;
				else {
					switch (Ec(d)) {
						case 1:
							c = Jc;
							break;
						case 4:
							c = Kc;
							break;
						case 16:
							c = Lc;
							break;
						case 536870912:
							c = Mc;
							break;
						default: c = Lc;
					}
					c = Dh(c, Eh.bind(null, a));
				}
				a.callbackPriority = b;
				a.callbackNode = c;
			}
		}
		function Eh(a, b) {
			yh = -1;
			zh = 0;
			if (0 !== (G$2 & 6)) throw Error(n(327));
			var c = a.callbackNode;
			if (Fh() && a.callbackNode !== c) return null;
			var d = wc(a, a === F$2 ? X$1 : 0);
			if (0 === d) return null;
			if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Gh(a, d);
			else {
				b = d;
				var e = G$2;
				G$2 |= 2;
				var f$2 = Hh();
				if (F$2 !== a || X$1 !== b) sh(), Ih(a, b);
				do
					try {
						Jh();
						break;
					} catch (h$2) {
						Kh(a, h$2);
					}
				while (1);
				fd();
				mh.current = f$2;
				G$2 = e;
				null !== W$1 ? b = 0 : (F$2 = null, X$1 = 0, b = Q$2);
			}
			if (0 !== b) {
				2 === b && (e = zc(a), 0 !== e && (d = e, b = Lh(a, e)));
				if (1 === b) throw c = oh, Ih(a, 0), Bh(a, d), Z(a, E$3()), c;
				if (6 === b) Bh(a, d);
				else {
					e = a.current.alternate;
					if (0 === (d & 30) && !Mh(e) && (b = Gh(a, d), 2 === b && (f$2 = zc(a), 0 !== f$2 && (d = f$2, b = Lh(a, f$2))), 1 === b)) throw c = oh, Ih(a, 0), Bh(a, d), Z(a, E$3()), c;
					a.finishedWork = e;
					a.finishedLanes = d;
					switch (b) {
						case 0:
						case 1: throw Error(n(345));
						case 2:
							Nh(a, Y);
							break;
						case 3:
							Bh(a, d);
							if ((d & 130023424) === d && (b = Vg + 500 - E$3(), 10 < b)) {
								if (0 !== wc(a, 0)) break;
								e = a.suspendedLanes;
								if ((e & d) !== d) {
									H$2();
									a.pingedLanes |= a.suspendedLanes & e;
									break;
								}
								a.timeoutHandle = Qa(Nh.bind(null, a, Y), b);
								break;
							}
							Nh(a, Y);
							break;
						case 4:
							Bh(a, d);
							if ((d & 4194240) === d) break;
							b = a.eventTimes;
							for (e = -1; 0 < d;) {
								var g$3 = 31 - qc(d);
								f$2 = 1 << g$3;
								g$3 = b[g$3];
								g$3 > e && (e = g$3);
								d &= ~f$2;
							}
							d = e;
							d = E$3() - d;
							d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lh(d / 1960)) - d;
							if (10 < d) {
								a.timeoutHandle = Qa(Nh.bind(null, a, Y), d);
								break;
							}
							Nh(a, Y);
							break;
						case 5:
							Nh(a, Y);
							break;
						default: throw Error(n(329));
					}
				}
			}
			Z(a, E$3());
			return a.callbackNode === c ? Eh.bind(null, a) : null;
		}
		function Lh(a, b) {
			var c = rh;
			a.current.memoizedState.isDehydrated && (Ih(a, b).flags |= 256);
			a = Gh(a, b);
			2 !== a && (b = Y, Y = c, null !== b && Sf(b));
			return a;
		}
		function Sf(a) {
			null === Y ? Y = a : Y.push.apply(Y, a);
		}
		function Mh(a) {
			for (var b = a;;) {
				if (b.flags & 16384) {
					var c = b.updateQueue;
					if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
						var e = c[d], f$2 = e.getSnapshot;
						e = e.value;
						try {
							if (!Rc(f$2(), e)) return !1;
						} catch (g$3) {
							return !1;
						}
					}
				}
				c = b.child;
				if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
				else {
					if (b === a) break;
					for (; null === b.sibling;) {
						if (null === b.return || b.return === a) return !0;
						b = b.return;
					}
					b.sibling.return = b.return;
					b = b.sibling;
				}
			}
			return !0;
		}
		function Bh(a, b) {
			b &= ~qh;
			b &= ~ph;
			a.suspendedLanes |= b;
			a.pingedLanes &= ~b;
			for (a = a.expirationTimes; 0 < b;) {
				var c = 31 - qc(b), d = 1 << c;
				a[c] = -1;
				b &= ~d;
			}
		}
		function Ch(a) {
			if (0 !== (G$2 & 6)) throw Error(n(327));
			Fh();
			var b = wc(a, 0);
			if (0 === (b & 1)) return Z(a, E$3()), null;
			var c = Gh(a, b);
			if (0 !== a.tag && 2 === c) {
				var d = zc(a);
				0 !== d && (b = d, c = Lh(a, d));
			}
			if (1 === c) throw c = oh, Ih(a, 0), Bh(a, b), Z(a, E$3()), c;
			if (6 === c) throw Error(n(345));
			a.finishedWork = a.current.alternate;
			a.finishedLanes = b;
			Nh(a, Y);
			Z(a, E$3());
			return null;
		}
		function Oh(a) {
			null !== uh && 0 === uh.tag && 0 === (G$2 & 6) && Fh();
			var b = G$2;
			G$2 |= 1;
			var c = U$2.transition, d = D$3;
			try {
				if (U$2.transition = null, D$3 = 1, a) return a();
			} finally {
				D$3 = d, U$2.transition = c, G$2 = b, 0 === (G$2 & 6) && Xc();
			}
		}
		function Vf() {
			Wf = eg.current;
			x(eg);
		}
		function Ih(a, b) {
			a.finishedWork = null;
			a.finishedLanes = 0;
			var c = a.timeoutHandle;
			c !== Sa && (a.timeoutHandle = Sa, Ra(c));
			if (null !== W$1) for (c = W$1.return; null !== c;) {
				var d = c;
				Sd(d);
				switch (d.tag) {
					case 1:
						d = d.type.childContextTypes;
						null !== d && void 0 !== d && kc();
						break;
					case 3:
						we();
						x(B$2);
						x(A$2);
						Be();
						break;
					case 5:
						ye(d);
						break;
					case 4:
						we();
						break;
					case 13:
						x(J$2);
						break;
					case 19:
						x(J$2);
						break;
					case 10:
						hd(d.type._context);
						break;
					case 22:
					case 23: Vf();
				}
				c = c.return;
			}
			F$2 = a;
			W$1 = a = je(a.current, null);
			X$1 = Wf = b;
			Q$2 = 0;
			oh = null;
			qh = ph = vd = 0;
			Y = rh = null;
			if (null !== md) {
				for (b = 0; b < md.length; b++) if (c = md[b], d = c.interleaved, null !== d) {
					c.interleaved = null;
					var e = d.next, f$2 = c.pending;
					if (null !== f$2) {
						var g$3 = f$2.next;
						f$2.next = e;
						d.next = g$3;
					}
					c.pending = d;
				}
				md = null;
			}
			return a;
		}
		function Kh(a, b) {
			do {
				var c = W$1;
				try {
					fd();
					Ce.current = Oe;
					if (Fe) {
						for (var d = K$2.memoizedState; null !== d;) {
							var e = d.queue;
							null !== e && (e.pending = null);
							d = d.next;
						}
						Fe = !1;
					}
					Ee = 0;
					M$3 = L$2 = K$2 = null;
					Ge = !1;
					He = 0;
					nh.current = null;
					if (null === c || null === c.return) {
						Q$2 = 1;
						oh = b;
						W$1 = null;
						break;
					}
					a: {
						var f$2 = a, g$3 = c.return, h$2 = c, k$3 = b;
						b = X$1;
						h$2.flags |= 32768;
						if (null !== k$3 && "object" === typeof k$3 && "function" === typeof k$3.then) {
							var l$2 = k$3, m = h$2, v$2 = m.tag;
							if (0 === (m.mode & 1) && (0 === v$2 || 11 === v$2 || 15 === v$2)) {
								var r$2 = m.alternate;
								r$2 ? (m.updateQueue = r$2.updateQueue, m.memoizedState = r$2.memoizedState, m.lanes = r$2.lanes) : (m.updateQueue = null, m.memoizedState = null);
							}
							var z$2 = Hf(g$3);
							if (null !== z$2) {
								z$2.flags &= -257;
								If(z$2, g$3, h$2, f$2, b);
								z$2.mode & 1 && Ff(f$2, l$2, b);
								b = z$2;
								k$3 = l$2;
								var q$2 = b.updateQueue;
								if (null === q$2) {
									var N$2 = /* @__PURE__ */ new Set();
									N$2.add(k$3);
									b.updateQueue = N$2;
								} else q$2.add(k$3);
								break a;
							} else {
								if (0 === (b & 1)) {
									Ff(f$2, l$2, b);
									Tf();
									break a;
								}
								k$3 = Error(n(426));
							}
						} else if (I$2 && h$2.mode & 1) {
							var da = Hf(g$3);
							if (null !== da) {
								0 === (da.flags & 65536) && (da.flags |= 256);
								If(da, g$3, h$2, f$2, b);
								ee(k$3);
								break a;
							}
						}
						f$2 = k$3;
						4 !== Q$2 && (Q$2 = 2);
						null === rh ? rh = [f$2] : rh.push(f$2);
						k$3 = xf(k$3, h$2);
						h$2 = g$3;
						do {
							switch (h$2.tag) {
								case 3:
									h$2.flags |= 65536;
									b &= -b;
									h$2.lanes |= b;
									var t$2 = Af(h$2, k$3, b);
									td(h$2, t$2);
									break a;
								case 1:
									f$2 = k$3;
									var w = h$2.type, u$3 = h$2.stateNode;
									if (0 === (h$2.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u$3 && "function" === typeof u$3.componentDidCatch && (null === Ef || !Ef.has(u$3)))) {
										h$2.flags |= 65536;
										b &= -b;
										h$2.lanes |= b;
										var V = Df(h$2, f$2, b);
										td(h$2, V);
										break a;
									}
							}
							h$2 = h$2.return;
						} while (null !== h$2);
					}
					Ph(c);
				} catch (wa) {
					b = wa;
					W$1 === c && null !== c && (W$1 = c = c.return);
					continue;
				}
				break;
			} while (1);
		}
		function Hh() {
			var a = mh.current;
			mh.current = Oe;
			return null === a ? Oe : a;
		}
		function Tf() {
			if (0 === Q$2 || 3 === Q$2 || 2 === Q$2) Q$2 = 4;
			null === F$2 || 0 === (vd & 268435455) && 0 === (ph & 268435455) || Bh(F$2, X$1);
		}
		function Gh(a, b) {
			var c = G$2;
			G$2 |= 2;
			var d = Hh();
			F$2 === a && X$1 === b || Ih(a, b);
			do
				try {
					Qh();
					break;
				} catch (e) {
					Kh(a, e);
				}
			while (1);
			fd();
			G$2 = c;
			mh.current = d;
			if (null !== W$1) throw Error(n(261));
			F$2 = null;
			X$1 = 0;
			return Q$2;
		}
		function Qh() {
			for (; null !== W$1;) Rh(W$1);
		}
		function Jh() {
			for (; null !== W$1 && !Hc();) Rh(W$1);
		}
		function Rh(a) {
			var b = Sh(a.alternate, a, Wf);
			a.memoizedProps = a.pendingProps;
			null === b ? Ph(a) : W$1 = b;
			nh.current = null;
		}
		function Ph(a) {
			var b = a;
			do {
				var c = b.alternate;
				a = b.return;
				if (0 === (b.flags & 32768)) {
					if (c = Rf(c, b, Wf), null !== c) {
						W$1 = c;
						return;
					}
				} else {
					c = xg(c, b);
					if (null !== c) {
						c.flags &= 32767;
						W$1 = c;
						return;
					}
					if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
					else {
						Q$2 = 6;
						W$1 = null;
						return;
					}
				}
				b = b.sibling;
				if (null !== b) {
					W$1 = b;
					return;
				}
				W$1 = b = a;
			} while (null !== b);
			0 === Q$2 && (Q$2 = 5);
		}
		function Nh(a, b) {
			var c = D$3, d = U$2.transition;
			try {
				U$2.transition = null, D$3 = 1, Th(a, b, c);
			} finally {
				U$2.transition = d, D$3 = c;
			}
			return null;
		}
		function Th(a, b, c) {
			do
				Fh();
			while (null !== uh);
			if (0 !== (G$2 & 6)) throw Error(n(327));
			var d = a.finishedWork, e = a.finishedLanes;
			if (null === d) return null;
			a.finishedWork = null;
			a.finishedLanes = 0;
			if (d === a.current) throw Error(n(177));
			a.callbackNode = null;
			a.callbackPriority = 0;
			var f$2 = d.lanes | d.childLanes;
			Cc(a, f$2);
			a === F$2 && (W$1 = F$2 = null, X$1 = 0);
			0 === (d.subtreeFlags & 2064) && 0 === (d.flags & 2064) || th || (th = !0, Dh(Lc, function() {
				Fh();
				return null;
			}));
			f$2 = 0 !== (d.flags & 15990);
			if (0 !== (d.subtreeFlags & 15990) || f$2) {
				f$2 = U$2.transition;
				U$2.transition = null;
				var g$3 = D$3;
				D$3 = 1;
				var h$2 = G$2;
				G$2 |= 4;
				nh.current = null;
				Eg(a, d);
				Ug(a, d, e);
				Ja(a.containerInfo);
				a.current = d;
				Xg(d, a, e);
				Ic();
				G$2 = h$2;
				D$3 = g$3;
				U$2.transition = f$2;
			} else a.current = d;
			th && (th = !1, uh = a, vh = e);
			f$2 = a.pendingLanes;
			0 === f$2 && (Ef = null);
			Pc(d.stateNode, c);
			Z(a, E$3());
			if (null !== b) for (c = a.onRecoverableError, d = 0; d < b.length; d++) c(b[d]);
			if (Bf) throw Bf = !1, a = Cf, Cf = null, a;
			0 !== (vh & 1) && 0 !== a.tag && Fh();
			f$2 = a.pendingLanes;
			0 !== (f$2 & 1) ? a === xh ? wh++ : (wh = 0, xh = a) : wh = 0;
			Xc();
			return null;
		}
		function Fh() {
			if (null !== uh) {
				var a = Ec(vh), b = U$2.transition, c = D$3;
				try {
					U$2.transition = null;
					D$3 = 16 > a ? 16 : a;
					if (null === uh) var d = !1;
					else {
						a = uh;
						uh = null;
						vh = 0;
						if (0 !== (G$2 & 6)) throw Error(n(331));
						var e = G$2;
						G$2 |= 4;
						for (S$2 = a.current; null !== S$2;) {
							var f$2 = S$2, g$3 = f$2.child;
							if (0 !== (S$2.flags & 16)) {
								var h$2 = f$2.deletions;
								if (null !== h$2) {
									for (var k$3 = 0; k$3 < h$2.length; k$3++) {
										var l$2 = h$2[k$3];
										for (S$2 = l$2; null !== S$2;) {
											var m = S$2;
											switch (m.tag) {
												case 0:
												case 11:
												case 15: Fg(8, m, f$2);
											}
											var v$2 = m.child;
											if (null !== v$2) v$2.return = m, S$2 = v$2;
											else for (; null !== S$2;) {
												m = S$2;
												var r$2 = m.sibling, z$2 = m.return;
												Lg(m);
												if (m === l$2) {
													S$2 = null;
													break;
												}
												if (null !== r$2) {
													r$2.return = z$2;
													S$2 = r$2;
													break;
												}
												S$2 = z$2;
											}
										}
									}
									var q$2 = f$2.alternate;
									if (null !== q$2) {
										var N$2 = q$2.child;
										if (null !== N$2) {
											q$2.child = null;
											do {
												var da = N$2.sibling;
												N$2.sibling = null;
												N$2 = da;
											} while (null !== N$2);
										}
									}
									S$2 = f$2;
								}
							}
							if (0 !== (f$2.subtreeFlags & 2064) && null !== g$3) g$3.return = f$2, S$2 = g$3;
							else b: for (; null !== S$2;) {
								f$2 = S$2;
								if (0 !== (f$2.flags & 2048)) switch (f$2.tag) {
									case 0:
									case 11:
									case 15: Fg(9, f$2, f$2.return);
								}
								var t$2 = f$2.sibling;
								if (null !== t$2) {
									t$2.return = f$2.return;
									S$2 = t$2;
									break b;
								}
								S$2 = f$2.return;
							}
						}
						var w = a.current;
						for (S$2 = w; null !== S$2;) {
							g$3 = S$2;
							var u$3 = g$3.child;
							if (0 !== (g$3.subtreeFlags & 2064) && null !== u$3) u$3.return = g$3, S$2 = u$3;
							else b: for (g$3 = w; null !== S$2;) {
								h$2 = S$2;
								if (0 !== (h$2.flags & 2048)) try {
									switch (h$2.tag) {
										case 0:
										case 11:
										case 15: Gg(9, h$2);
									}
								} catch (wa) {
									T$3(h$2, h$2.return, wa);
								}
								if (h$2 === g$3) {
									S$2 = null;
									break b;
								}
								var V = h$2.sibling;
								if (null !== V) {
									V.return = h$2.return;
									S$2 = V;
									break b;
								}
								S$2 = h$2.return;
							}
						}
						G$2 = e;
						Xc();
						if (Oc && "function" === typeof Oc.onPostCommitFiberRoot) try {
							Oc.onPostCommitFiberRoot(Nc, a);
						} catch (wa) {}
						d = !0;
					}
					return d;
				} finally {
					D$3 = c, U$2.transition = b;
				}
			}
			return !1;
		}
		function Uh(a, b, c) {
			b = xf(c, b);
			b = Af(a, b, 1);
			rd(a, b);
			b = H$2();
			a = Ah(a, 1);
			null !== a && (Bc(a, 1, b), Z(a, b));
		}
		function T$3(a, b, c) {
			if (3 === a.tag) Uh(a, a, c);
			else for (; null !== b;) {
				if (3 === b.tag) {
					Uh(b, a, c);
					break;
				} else if (1 === b.tag) {
					var d = b.stateNode;
					if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ef || !Ef.has(d))) {
						a = xf(c, a);
						a = Df(b, a, 1);
						rd(b, a);
						a = H$2();
						b = Ah(b, 1);
						null !== b && (Bc(b, 1, a), Z(b, a));
						break;
					}
				}
				b = b.return;
			}
		}
		function Gf(a, b, c) {
			var d = a.pingCache;
			null !== d && d.delete(b);
			b = H$2();
			a.pingedLanes |= a.suspendedLanes & c;
			F$2 === a && (X$1 & c) === c && (4 === Q$2 || 3 === Q$2 && (X$1 & 130023424) === X$1 && 500 > E$3() - Vg ? Ih(a, 0) : qh |= c);
			Z(a, b);
		}
		function Vh(a, b) {
			0 === b && (0 === (a.mode & 1) ? b = 1 : (b = uc, uc <<= 1, 0 === (uc & 130023424) && (uc = 4194304)));
			var c = H$2();
			a = Ah(a, b);
			null !== a && (Bc(a, b, c), Z(a, c));
		}
		function qg(a) {
			var b = a.memoizedState, c = 0;
			null !== b && (c = b.retryLane);
			Vh(a, c);
		}
		function Tg(a, b) {
			var c = 0;
			switch (a.tag) {
				case 13:
					var d = a.stateNode;
					var e = a.memoizedState;
					null !== e && (c = e.retryLane);
					break;
				case 19:
					d = a.stateNode;
					break;
				default: throw Error(n(314));
			}
			null !== d && d.delete(b);
			Vh(a, c);
		}
		var Sh = function(a, b, c) {
			if (null !== a) if (a.memoizedProps !== b.pendingProps || B$2.current) kd = !0;
			else {
				if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return kd = !1, wg(a, b, c);
				kd = 0 !== (a.flags & 131072) ? !0 : !1;
			}
			else kd = !1, I$2 && 0 !== (b.flags & 1048576) && Qd(b, Jd, b.index);
			b.lanes = 0;
			switch (b.tag) {
				case 2:
					var d = b.type;
					null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
					a = b.pendingProps;
					var e = jc(b, A$2.current);
					jd(b, c);
					e = Ke(null, b, d, a, e, c);
					var f$2 = Pe();
					b.flags |= 1;
					"object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, C(d) ? (f$2 = !0, nc(b)) : f$2 = !1, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, od(b), e.updater = Bd, b.stateNode = e, e._reactInternals = b, Fd(b, d, a, c), b = hg(null, b, d, !0, f$2, c)) : (b.tag = 0, I$2 && f$2 && Rd(b), R$2(null, b, e, c), b = b.child);
					return b;
				case 16:
					d = b.elementType;
					a: {
						null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
						a = b.pendingProps;
						e = d._init;
						d = e(d._payload);
						b.type = d;
						e = b.tag = Wh(d);
						a = ad(d, a);
						switch (e) {
							case 0:
								b = cg(null, b, d, a, c);
								break a;
							case 1:
								b = gg(null, b, d, a, c);
								break a;
							case 11:
								b = Yf(null, b, d, a, c);
								break a;
							case 14:
								b = $f(null, b, d, ad(d.type, a), c);
								break a;
						}
						throw Error(n(306, d, ""));
					}
					return b;
				case 0: return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : ad(d, e), cg(a, b, d, e, c);
				case 1: return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : ad(d, e), gg(a, b, d, e, c);
				case 3:
					a: {
						ig(b);
						if (null === a) throw Error(n(387));
						d = b.pendingProps;
						f$2 = b.memoizedState;
						e = f$2.element;
						pd(a, b);
						ud(b, d, null, c);
						var g$3 = b.memoizedState;
						d = g$3.element;
						if (p$3 && f$2.isDehydrated) if (f$2 = {
							element: d,
							isDehydrated: !1,
							cache: g$3.cache,
							transitions: g$3.transitions
						}, b.updateQueue.baseState = f$2, b.memoizedState = f$2, b.flags & 256) {
							e = Error(n(423));
							b = jg(a, b, d, c, e);
							break a;
						} else if (d !== e) {
							e = Error(n(424));
							b = jg(a, b, d, c, e);
							break a;
						} else for (p$3 && (Ud = Nb(b.stateNode.containerInfo), Td = b, I$2 = !0, Wd = null, Vd = !1), c = pe(b, null, d, c), b.child = c; c;) c.flags = c.flags & -3 | 4096, c = c.sibling;
						else {
							de();
							if (d === e) {
								b = Zf(a, b, c);
								break a;
							}
							R$2(a, b, d, c);
						}
						b = b.child;
					}
					return b;
				case 5: return xe(b), null === a && ae(b), d = b.type, e = b.pendingProps, f$2 = null !== a ? a.memoizedProps : null, g$3 = e.children, Oa(d, e) ? g$3 = null : null !== f$2 && Oa(d, f$2) && (b.flags |= 32), fg(a, b), R$2(a, b, g$3, c), b.child;
				case 6: return null === a && ae(b), null;
				case 13: return mg(a, b, c);
				case 4: return ve(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = oe(b, null, d, c) : R$2(a, b, d, c), b.child;
				case 11: return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : ad(d, e), Yf(a, b, d, e, c);
				case 7: return R$2(a, b, b.pendingProps, c), b.child;
				case 8: return R$2(a, b, b.pendingProps.children, c), b.child;
				case 12: return R$2(a, b, b.pendingProps.children, c), b.child;
				case 10:
					a: {
						d = b.type._context;
						e = b.pendingProps;
						f$2 = b.memoizedProps;
						g$3 = e.value;
						gd(b, d, g$3);
						if (null !== f$2) if (Rc(f$2.value, g$3)) {
							if (f$2.children === e.children && !B$2.current) {
								b = Zf(a, b, c);
								break a;
							}
						} else for (f$2 = b.child, null !== f$2 && (f$2.return = b); null !== f$2;) {
							var h$2 = f$2.dependencies;
							if (null !== h$2) {
								g$3 = f$2.child;
								for (var k$3 = h$2.firstContext; null !== k$3;) {
									if (k$3.context === d) {
										if (1 === f$2.tag) {
											k$3 = qd(-1, c & -c);
											k$3.tag = 2;
											var l$2 = f$2.updateQueue;
											if (null !== l$2) {
												l$2 = l$2.shared;
												var m = l$2.pending;
												null === m ? k$3.next = k$3 : (k$3.next = m.next, m.next = k$3);
												l$2.pending = k$3;
											}
										}
										f$2.lanes |= c;
										k$3 = f$2.alternate;
										null !== k$3 && (k$3.lanes |= c);
										id(f$2.return, c, b);
										h$2.lanes |= c;
										break;
									}
									k$3 = k$3.next;
								}
							} else if (10 === f$2.tag) g$3 = f$2.type === b.type ? null : f$2.child;
							else if (18 === f$2.tag) {
								g$3 = f$2.return;
								if (null === g$3) throw Error(n(341));
								g$3.lanes |= c;
								h$2 = g$3.alternate;
								null !== h$2 && (h$2.lanes |= c);
								id(g$3, c, b);
								g$3 = f$2.sibling;
							} else g$3 = f$2.child;
							if (null !== g$3) g$3.return = f$2;
							else for (g$3 = f$2; null !== g$3;) {
								if (g$3 === b) {
									g$3 = null;
									break;
								}
								f$2 = g$3.sibling;
								if (null !== f$2) {
									f$2.return = g$3.return;
									g$3 = f$2;
									break;
								}
								g$3 = g$3.return;
							}
							f$2 = g$3;
						}
						R$2(a, b, e.children, c);
						b = b.child;
					}
					return b;
				case 9: return e = b.type, d = b.pendingProps.children, jd(b, c), e = ld(e), d = d(e), b.flags |= 1, R$2(a, b, d, c), b.child;
				case 14: return d = b.type, e = ad(d, b.pendingProps), e = ad(d.type, e), $f(a, b, d, e, c);
				case 15: return bg(a, b, b.type, b.pendingProps, c);
				case 17: return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : ad(d, e), null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2), b.tag = 1, C(d) ? (a = !0, nc(b)) : a = !1, jd(b, c), Dd(b, d, e), Fd(b, d, e, c), hg(null, b, d, !0, a, c);
				case 19: return vg(a, b, c);
				case 22: return dg(a, b, c);
			}
			throw Error(n(156, b.tag));
		};
		function Dh(a, b) {
			return Fc(a, b);
		}
		function Xh(a, b, c, d) {
			this.tag = a;
			this.key = c;
			this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
			this.index = 0;
			this.ref = null;
			this.pendingProps = b;
			this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
			this.mode = d;
			this.subtreeFlags = this.flags = 0;
			this.deletions = null;
			this.childLanes = this.lanes = 0;
			this.alternate = null;
		}
		function Yd(a, b, c, d) {
			return new Xh(a, b, c, d);
		}
		function ag(a) {
			a = a.prototype;
			return !(!a || !a.isReactComponent);
		}
		function Wh(a) {
			if ("function" === typeof a) return ag(a) ? 1 : 0;
			if (void 0 !== a && null !== a) {
				a = a.$$typeof;
				if (a === na) return 11;
				if (a === qa) return 14;
			}
			return 2;
		}
		function je(a, b) {
			var c = a.alternate;
			null === c ? (c = Yd(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
			c.flags = a.flags & 14680064;
			c.childLanes = a.childLanes;
			c.lanes = a.lanes;
			c.child = a.child;
			c.memoizedProps = a.memoizedProps;
			c.memoizedState = a.memoizedState;
			c.updateQueue = a.updateQueue;
			b = a.dependencies;
			c.dependencies = null === b ? null : {
				lanes: b.lanes,
				firstContext: b.firstContext
			};
			c.sibling = a.sibling;
			c.index = a.index;
			c.ref = a.ref;
			return c;
		}
		function le(a, b, c, d, e, f$2) {
			var g$3 = 2;
			d = a;
			if ("function" === typeof a) ag(a) && (g$3 = 1);
			else if ("string" === typeof a) g$3 = 5;
			else a: switch (a) {
				case ia: return ne(c.children, e, f$2, b);
				case ja:
					g$3 = 8;
					e |= 8;
					break;
				case ka: return a = Yd(12, c, b, e | 2), a.elementType = ka, a.lanes = f$2, a;
				case oa: return a = Yd(13, c, b, e), a.elementType = oa, a.lanes = f$2, a;
				case pa: return a = Yd(19, c, b, e), a.elementType = pa, a.lanes = f$2, a;
				case sa: return ng(c, e, f$2, b);
				default:
					if ("object" === typeof a && null !== a) switch (a.$$typeof) {
						case la:
							g$3 = 10;
							break a;
						case ma:
							g$3 = 9;
							break a;
						case na:
							g$3 = 11;
							break a;
						case qa:
							g$3 = 14;
							break a;
						case ra:
							g$3 = 16;
							d = null;
							break a;
					}
					throw Error(n(130, null == a ? a : typeof a, ""));
			}
			b = Yd(g$3, c, b, e);
			b.elementType = a;
			b.type = d;
			b.lanes = f$2;
			return b;
		}
		function ne(a, b, c, d) {
			a = Yd(7, a, d, b);
			a.lanes = c;
			return a;
		}
		function ng(a, b, c, d) {
			a = Yd(22, a, d, b);
			a.elementType = sa;
			a.lanes = c;
			a.stateNode = {};
			return a;
		}
		function ke(a, b, c) {
			a = Yd(6, a, null, b);
			a.lanes = c;
			return a;
		}
		function me(a, b, c) {
			b = Yd(4, null !== a.children ? a.children : [], a.key, b);
			b.lanes = c;
			b.stateNode = {
				containerInfo: a.containerInfo,
				pendingChildren: null,
				implementation: a.implementation
			};
			return b;
		}
		function Yh(a, b, c, d, e) {
			this.tag = b;
			this.containerInfo = a;
			this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
			this.timeoutHandle = Sa;
			this.callbackNode = this.pendingContext = this.context = null;
			this.callbackPriority = 0;
			this.eventTimes = Ac(0);
			this.expirationTimes = Ac(-1);
			this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
			this.entanglements = Ac(0);
			this.identifierPrefix = d;
			this.onRecoverableError = e;
			p$3 && (this.mutableSourceEagerHydrationData = null);
		}
		function Zh(a, b, c, d, e, f$2, g$3, h$2, k$3) {
			a = new Yh(a, b, c, h$2, k$3);
			1 === b ? (b = 1, !0 === f$2 && (b |= 8)) : b = 0;
			f$2 = Yd(3, null, null, b);
			a.current = f$2;
			f$2.stateNode = a;
			f$2.memoizedState = {
				element: d,
				isDehydrated: c,
				cache: null,
				transitions: null
			};
			od(f$2);
			return a;
		}
		function $h(a) {
			if (!a) return hc;
			a = a._reactInternals;
			a: {
				if (ya(a) !== a || 1 !== a.tag) throw Error(n(170));
				var b = a;
				do {
					switch (b.tag) {
						case 3:
							b = b.stateNode.context;
							break a;
						case 1: if (C(b.type)) {
							b = b.stateNode.__reactInternalMemoizedMergedChildContext;
							break a;
						}
					}
					b = b.return;
				} while (null !== b);
				throw Error(n(171));
			}
			if (1 === a.tag) {
				var c = a.type;
				if (C(c)) return mc(a, c, b);
			}
			return b;
		}
		function ai(a) {
			var b = a._reactInternals;
			if (void 0 === b) {
				if ("function" === typeof a.render) throw Error(n(188));
				a = Object.keys(a).join(",");
				throw Error(n(268, a));
			}
			a = Ba(b);
			return null === a ? null : a.stateNode;
		}
		function bi(a, b) {
			a = a.memoizedState;
			if (null !== a && null !== a.dehydrated) {
				var c = a.retryLane;
				a.retryLane = 0 !== c && c < b ? c : b;
			}
		}
		function ci(a, b) {
			bi(a, b);
			(a = a.alternate) && bi(a, b);
		}
		function di(a) {
			a = Ba(a);
			return null === a ? null : a.stateNode;
		}
		function ei() {
			return null;
		}
		exports$1.attemptContinuousHydration = function(a) {
			if (13 === a.tag) {
				Ad(a, 134217728, H$2());
				ci(a, 134217728);
			}
		};
		exports$1.attemptHydrationAtCurrentPriority = function(a) {
			if (13 === a.tag) {
				var b = H$2(), c = zd(a);
				Ad(a, c, b);
				ci(a, c);
			}
		};
		exports$1.attemptSynchronousHydration = function(a) {
			switch (a.tag) {
				case 3:
					var b = a.stateNode;
					if (b.current.memoizedState.isDehydrated) {
						var c = vc(b.pendingLanes);
						0 !== c && (Dc(b, c | 1), Z(b, E$3()), 0 === (G$2 & 6) && (sh(), Xc()));
					}
					break;
				case 13:
					var d = H$2();
					Oh(function() {
						return Ad(a, 1, d);
					});
					ci(a, 1);
			}
		};
		exports$1.batchedUpdates = function(a, b) {
			var c = G$2;
			G$2 |= 1;
			try {
				return a(b);
			} finally {
				G$2 = c, 0 === G$2 && (sh(), Tc && Xc());
			}
		};
		exports$1.createComponentSelector = function(a) {
			return {
				$$typeof: ah,
				value: a
			};
		};
		exports$1.createContainer = function(a, b, c, d, e, f$2, g$3) {
			return Zh(a, b, !1, null, c, d, e, f$2, g$3);
		};
		exports$1.createHasPseudoClassSelector = function(a) {
			return {
				$$typeof: bh,
				value: a
			};
		};
		exports$1.createHydrationContainer = function(a, b, c, d, e, f$2, g$3, h$2, k$3) {
			a = Zh(c, d, !0, a, e, f$2, g$3, h$2, k$3);
			a.context = $h(null);
			c = a.current;
			d = H$2();
			e = zd(c);
			f$2 = qd(d, e);
			f$2.callback = void 0 !== b && null !== b ? b : null;
			rd(c, f$2);
			a.current.lanes = e;
			Bc(a, e, d);
			Z(a, d);
			return a;
		};
		exports$1.createPortal = function(a, b, c) {
			var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
			return {
				$$typeof: ha,
				key: null == d ? null : "" + d,
				children: a,
				containerInfo: b,
				implementation: c
			};
		};
		exports$1.createRoleSelector = function(a) {
			return {
				$$typeof: ch,
				value: a
			};
		};
		exports$1.createTestNameSelector = function(a) {
			return {
				$$typeof: dh,
				value: a
			};
		};
		exports$1.createTextSelector = function(a) {
			return {
				$$typeof: eh,
				value: a
			};
		};
		exports$1.deferredUpdates = function(a) {
			var b = D$3, c = U$2.transition;
			try {
				return U$2.transition = null, D$3 = 16, a();
			} finally {
				D$3 = b, U$2.transition = c;
			}
		};
		exports$1.discreteUpdates = function(a, b, c, d, e) {
			var f$2 = D$3, g$3 = U$2.transition;
			try {
				return U$2.transition = null, D$3 = 1, a(b, c, d, e);
			} finally {
				D$3 = f$2, U$2.transition = g$3, 0 === G$2 && sh();
			}
		};
		exports$1.findAllNodes = kh;
		exports$1.findBoundingRects = function(a, b) {
			if (!bb) throw Error(n(363));
			b = kh(a, b);
			a = [];
			for (var c = 0; c < b.length; c++) a.push(db(b[c]));
			for (b = a.length - 1; 0 < b; b--) {
				c = a[b];
				for (var d = c.x, e = d + c.width, f$2 = c.y, g$3 = f$2 + c.height, h$2 = b - 1; 0 <= h$2; h$2--) if (b !== h$2) {
					var k$3 = a[h$2], l$2 = k$3.x, m = l$2 + k$3.width, v$2 = k$3.y, r$2 = v$2 + k$3.height;
					if (d >= l$2 && f$2 >= v$2 && e <= m && g$3 <= r$2) {
						a.splice(b, 1);
						break;
					} else if (!(d !== l$2 || c.width !== k$3.width || r$2 < f$2 || v$2 > g$3)) {
						v$2 > f$2 && (k$3.height += v$2 - f$2, k$3.y = f$2);
						r$2 < g$3 && (k$3.height = g$3 - v$2);
						a.splice(b, 1);
						break;
					} else if (!(f$2 !== v$2 || c.height !== k$3.height || m < d || l$2 > e)) {
						l$2 > d && (k$3.width += l$2 - d, k$3.x = d);
						m < e && (k$3.width = e - l$2);
						a.splice(b, 1);
						break;
					}
				}
			}
			return a;
		};
		exports$1.findHostInstance = ai;
		exports$1.findHostInstanceWithNoPortals = function(a) {
			a = Aa(a);
			a = null !== a ? Da(a) : null;
			return null === a ? null : a.stateNode;
		};
		exports$1.findHostInstanceWithWarning = function(a) {
			return ai(a);
		};
		exports$1.flushControlled = function(a) {
			var b = G$2;
			G$2 |= 1;
			var c = U$2.transition, d = D$3;
			try {
				U$2.transition = null, D$3 = 1, a();
			} finally {
				D$3 = d, U$2.transition = c, G$2 = b, 0 === G$2 && (sh(), Xc());
			}
		};
		exports$1.flushPassiveEffects = Fh;
		exports$1.flushSync = Oh;
		exports$1.focusWithin = function(a, b) {
			if (!bb) throw Error(n(363));
			a = gh(a);
			b = jh(a, b);
			b = Array.from(b);
			for (a = 0; a < b.length;) {
				var c = b[a++];
				if (!fb(c)) {
					if (5 === c.tag && hb(c.stateNode)) return !0;
					for (c = c.child; null !== c;) b.push(c), c = c.sibling;
				}
			}
			return !1;
		};
		exports$1.getCurrentUpdatePriority = function() {
			return D$3;
		};
		exports$1.getFindAllNodesFailureDescription = function(a, b) {
			if (!bb) throw Error(n(363));
			var c = 0, d = [];
			a = [gh(a), 0];
			for (var e = 0; e < a.length;) {
				var f$2 = a[e++], g$3 = a[e++], h$2 = b[g$3];
				if (5 !== f$2.tag || !fb(f$2)) {
					if (hh(f$2, h$2) && (d.push(ih(h$2)), g$3++, g$3 > c && (c = g$3)), g$3 < b.length) for (f$2 = f$2.child; null !== f$2;) a.push(f$2, g$3), f$2 = f$2.sibling;
				}
			}
			if (c < b.length) {
				for (a = []; c < b.length; c++) a.push(ih(b[c]));
				return "findAllNodes was able to match part of the selector:\n  " + (d.join(" > ") + "\n\nNo matching component was found for:\n  ") + a.join(" > ");
			}
			return null;
		};
		exports$1.getPublicRootInstance = function(a) {
			a = a.current;
			if (!a.child) return null;
			switch (a.child.tag) {
				case 5: return Fa(a.child.stateNode);
				default: return a.child.stateNode;
			}
		};
		exports$1.injectIntoDevTools = function(a) {
			a = {
				bundleType: a.bundleType,
				version: a.version,
				rendererPackageName: a.rendererPackageName,
				rendererConfig: a.rendererConfig,
				overrideHookState: null,
				overrideHookStateDeletePath: null,
				overrideHookStateRenamePath: null,
				overrideProps: null,
				overridePropsDeletePath: null,
				overridePropsRenamePath: null,
				setErrorHandler: null,
				setSuspenseHandler: null,
				scheduleUpdate: null,
				currentDispatcherRef: ea.ReactCurrentDispatcher,
				findHostInstanceByFiber: di,
				findFiberByHostInstance: a.findFiberByHostInstance || ei,
				findHostInstancesForRefresh: null,
				scheduleRefresh: null,
				scheduleRoot: null,
				setRefreshHandler: null,
				getCurrentFiber: null,
				reconcilerVersion: "18.0.0-fc46dba67-20220329"
			};
			if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) a = !1;
			else {
				var b = __REACT_DEVTOOLS_GLOBAL_HOOK__;
				if (b.isDisabled || !b.supportsFiber) a = !0;
				else {
					try {
						Nc = b.inject(a), Oc = b;
					} catch (c) {}
					a = b.checkDCE ? !0 : !1;
				}
			}
			return a;
		};
		exports$1.isAlreadyRendering = function() {
			return !1;
		};
		exports$1.observeVisibleRects = function(a, b, c, d) {
			if (!bb) throw Error(n(363));
			a = kh(a, b);
			var e = ib(a, c, d).disconnect;
			return { disconnect: function() {
				e();
			} };
		};
		exports$1.registerMutableSourceForHydration = function(a, b) {
			var c = b._getVersion;
			c = c(b._source);
			null == a.mutableSourceEagerHydrationData ? a.mutableSourceEagerHydrationData = [b, c] : a.mutableSourceEagerHydrationData.push(b, c);
		};
		exports$1.runWithPriority = function(a, b) {
			var c = D$3;
			try {
				return D$3 = a, b();
			} finally {
				D$3 = c;
			}
		};
		exports$1.shouldError = function() {
			return null;
		};
		exports$1.shouldSuspend = function() {
			return !1;
		};
		exports$1.updateContainer = function(a, b, c, d) {
			var e = b.current, f$2 = H$2(), g$3 = zd(e);
			c = $h(c);
			null === b.context ? b.context = c : b.pendingContext = c;
			b = qd(f$2, g$3);
			b.payload = { element: a };
			d = void 0 === d ? null : d;
			null !== d && (b.callback = d);
			rd(e, b);
			a = Ad(e, g$3, f$2);
			null !== a && sd(a, e, g$3);
			return g$3;
		};
		return exports$1;
	};
}));
var require_react_reconciler = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_reconciler_production_min();
}));
/**
* @license React
* scheduler.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_scheduler_production_min = /* @__PURE__ */ __commonJSMin(((exports) => {
	function f(a, b) {
		var c = a.length;
		a.push(b);
		a: for (; 0 < c;) {
			var d = c - 1 >>> 1, e = a[d];
			if (0 < g$1(e, b)) a[d] = b, a[c] = e, c = d;
			else break a;
		}
	}
	function h(a) {
		return 0 === a.length ? null : a[0];
	}
	function k$1(a) {
		if (0 === a.length) return null;
		var b = a[0], c = a.pop();
		if (c !== b) {
			a[0] = c;
			a: for (var d = 0, e = a.length, w = e >>> 1; d < w;) {
				var m = 2 * (d + 1) - 1, C = a[m], n = m + 1, x = a[n];
				if (0 > g$1(C, c)) n < e && 0 > g$1(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m] = c, d = m);
				else if (n < e && 0 > g$1(x, c)) a[d] = x, a[n] = c, d = n;
				else break a;
			}
		}
		return b;
	}
	function g$1(a, b) {
		var c = a.sortIndex - b.sortIndex;
		return 0 !== c ? c : a.id - b.id;
	}
	if ("object" === typeof performance && "function" === typeof performance.now) {
		var l = performance;
		exports.unstable_now = function() {
			return l.now();
		};
	} else {
		var p$1 = Date, q = p$1.now();
		exports.unstable_now = function() {
			return p$1.now() - q;
		};
	}
	var r = [], t = [], u$1 = 1, v = null, y = 3, z = !1, A = !1, B = !1, D$1 = "function" === typeof setTimeout ? setTimeout : null, E$1 = "function" === typeof clearTimeout ? clearTimeout : null, F = "undefined" !== typeof setImmediate ? setImmediate : null;
	"undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
	function G(a) {
		for (var b = h(t); null !== b;) {
			if (null === b.callback) k$1(t);
			else if (b.startTime <= a) k$1(t), b.sortIndex = b.expirationTime, f(r, b);
			else break;
			b = h(t);
		}
	}
	function H(a) {
		B = !1;
		G(a);
		if (!A) if (null !== h(r)) A = !0, I(J);
		else {
			var b = h(t);
			null !== b && K(H, b.startTime - a);
		}
	}
	function J(a, b) {
		A = !1;
		B && (B = !1, E$1(L), L = -1);
		z = !0;
		var c = y;
		try {
			G(b);
			for (v = h(r); null !== v && (!(v.expirationTime > b) || a && !M$1());) {
				var d = v.callback;
				if ("function" === typeof d) {
					v.callback = null;
					y = v.priorityLevel;
					var e = d(v.expirationTime <= b);
					b = exports.unstable_now();
					"function" === typeof e ? v.callback = e : v === h(r) && k$1(r);
					G(b);
				} else k$1(r);
				v = h(r);
			}
			if (null !== v) var w = !0;
			else {
				var m = h(t);
				null !== m && K(H, m.startTime - b);
				w = !1;
			}
			return w;
		} finally {
			v = null, y = c, z = !1;
		}
	}
	var N = !1, O = null, L = -1, P = 5, Q = -1;
	function M$1() {
		return exports.unstable_now() - Q < P ? !1 : !0;
	}
	function R() {
		if (null !== O) {
			var a = exports.unstable_now();
			Q = a;
			var b = !0;
			try {
				b = O(!0, a);
			} finally {
				b ? S() : (N = !1, O = null);
			}
		} else N = !1;
	}
	var S;
	if ("function" === typeof F) S = function() {
		F(R);
	};
	else if ("undefined" !== typeof MessageChannel) {
		var T$1 = new MessageChannel(), U = T$1.port2;
		T$1.port1.onmessage = R;
		S = function() {
			U.postMessage(null);
		};
	} else S = function() {
		D$1(R, 0);
	};
	function I(a) {
		O = a;
		N || (N = !0, S());
	}
	function K(a, b) {
		L = D$1(function() {
			a(exports.unstable_now());
		}, b);
	}
	exports.unstable_IdlePriority = 5;
	exports.unstable_ImmediatePriority = 1;
	exports.unstable_LowPriority = 4;
	exports.unstable_NormalPriority = 3;
	exports.unstable_Profiling = null;
	exports.unstable_UserBlockingPriority = 2;
	exports.unstable_cancelCallback = function(a) {
		a.callback = null;
	};
	exports.unstable_continueExecution = function() {
		A || z || (A = !0, I(J));
	};
	exports.unstable_forceFrameRate = function(a) {
		0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1e3 / a) : 5;
	};
	exports.unstable_getCurrentPriorityLevel = function() {
		return y;
	};
	exports.unstable_getFirstCallbackNode = function() {
		return h(r);
	};
	exports.unstable_next = function(a) {
		switch (y) {
			case 1:
			case 2:
			case 3:
				var b = 3;
				break;
			default: b = y;
		}
		var c = y;
		y = b;
		try {
			return a();
		} finally {
			y = c;
		}
	};
	exports.unstable_pauseExecution = function() {};
	exports.unstable_requestPaint = function() {};
	exports.unstable_runWithPriority = function(a, b) {
		switch (a) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: a = 3;
		}
		var c = y;
		y = a;
		try {
			return b();
		} finally {
			y = c;
		}
	};
	exports.unstable_scheduleCallback = function(a, b, c) {
		var d = exports.unstable_now();
		"object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
		switch (a) {
			case 1:
				var e = -1;
				break;
			case 2:
				e = 250;
				break;
			case 5:
				e = 1073741823;
				break;
			case 4:
				e = 1e4;
				break;
			default: e = 5e3;
		}
		e = c + e;
		a = {
			id: u$1++,
			callback: b,
			priorityLevel: a,
			startTime: c,
			expirationTime: e,
			sortIndex: -1
		};
		c > d ? (a.sortIndex = c, f(t, a), null === h(r) && a === h(t) && (B ? (E$1(L), L = -1) : B = !0, K(H, c - d))) : (a.sortIndex = e, f(r, a), A || z || (A = !0, I(J)));
		return a;
	};
	exports.unstable_shouldYield = M$1;
	exports.unstable_wrapCallback = function(a) {
		var b = y;
		return function() {
			var c = y;
			y = b;
			try {
				return a.apply(this, arguments);
			} finally {
				y = c;
			}
		};
	};
}));
var require_scheduler = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_scheduler_production_min();
}));
var import_constants$1 = require_constants();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var import_react_reconciler$1 = /* @__PURE__ */ __toESM(require_react_reconciler());
var import_scheduler$1 = require_scheduler();
var catalogue = {};
var extend = (objects) => void Object.assign(catalogue, objects);
function createRenderer(_roots, _getEventPriority) {
	function createInstance(type, { args = [], attach: attach$1, ...props }, root) {
		let name = `${type[0].toUpperCase()}${type.slice(1)}`;
		let instance;
		if (type === "primitive") {
			if (props.object === void 0) throw new Error("R3F: Primitives without 'object' are invalid!");
			const object = props.object;
			instance = prepare(object, {
				type,
				root,
				attach: attach$1,
				primitive: true
			});
		} else {
			const target = catalogue[name];
			if (!target) throw new Error(`R3F: ${name} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`);
			if (!Array.isArray(args)) throw new Error("R3F: The args prop must be an array!");
			instance = prepare(new target(...args), {
				type,
				root,
				attach: attach$1,
				memoizedProps: { args }
			});
		}
		if (instance.__r3f.attach === void 0) {
			if (instance.isBufferGeometry) instance.__r3f.attach = "geometry";
			else if (instance.isMaterial) instance.__r3f.attach = "material";
		}
		if (name !== "inject") applyProps$1(instance, props);
		return instance;
	}
	function appendChild(parentInstance, child) {
		let added = false;
		if (child) {
			var _child$__r3f, _parentInstance$__r3f;
			if ((_child$__r3f = child.__r3f) != null && _child$__r3f.attach) attach(parentInstance, child, child.__r3f.attach);
			else if (child.isObject3D && parentInstance.isObject3D) {
				parentInstance.add(child);
				added = true;
			}
			if (!added) (_parentInstance$__r3f = parentInstance.__r3f) == null || _parentInstance$__r3f.objects.push(child);
			if (!child.__r3f) prepare(child, {});
			child.__r3f.parent = parentInstance;
			updateInstance(child);
			invalidateInstance(child);
		}
	}
	function insertBefore(parentInstance, child, beforeChild) {
		let added = false;
		if (child) {
			var _child$__r3f2, _parentInstance$__r3f2;
			if ((_child$__r3f2 = child.__r3f) != null && _child$__r3f2.attach) attach(parentInstance, child, child.__r3f.attach);
			else if (child.isObject3D && parentInstance.isObject3D) {
				child.parent = parentInstance;
				child.dispatchEvent({ type: "added" });
				parentInstance.dispatchEvent({
					type: "childadded",
					child
				});
				const restSiblings = parentInstance.children.filter((sibling) => sibling !== child);
				const index = restSiblings.indexOf(beforeChild);
				parentInstance.children = [
					...restSiblings.slice(0, index),
					child,
					...restSiblings.slice(index)
				];
				added = true;
			}
			if (!added) (_parentInstance$__r3f2 = parentInstance.__r3f) == null || _parentInstance$__r3f2.objects.push(child);
			if (!child.__r3f) prepare(child, {});
			child.__r3f.parent = parentInstance;
			updateInstance(child);
			invalidateInstance(child);
		}
	}
	function removeRecursive(array, parent, dispose$1 = false) {
		if (array) [...array].forEach((child) => removeChild(parent, child, dispose$1));
	}
	function removeChild(parentInstance, child, dispose$1) {
		if (child) {
			var _parentInstance$__r3f3, _child$__r3f3, _child$__r3f5;
			if (child.__r3f) child.__r3f.parent = null;
			if ((_parentInstance$__r3f3 = parentInstance.__r3f) != null && _parentInstance$__r3f3.objects) parentInstance.__r3f.objects = parentInstance.__r3f.objects.filter((x) => x !== child);
			if ((_child$__r3f3 = child.__r3f) != null && _child$__r3f3.attach) detach(parentInstance, child, child.__r3f.attach);
			else if (child.isObject3D && parentInstance.isObject3D) {
				var _child$__r3f4;
				parentInstance.remove(child);
				if ((_child$__r3f4 = child.__r3f) != null && _child$__r3f4.root) removeInteractivity(findInitialRoot(child), child);
			}
			const isPrimitive = (_child$__r3f5 = child.__r3f) == null ? void 0 : _child$__r3f5.primitive;
			const shouldDispose = !isPrimitive && (dispose$1 === void 0 ? child.dispose !== null : dispose$1);
			if (!isPrimitive) {
				var _child$__r3f6;
				removeRecursive((_child$__r3f6 = child.__r3f) == null ? void 0 : _child$__r3f6.objects, child, shouldDispose);
				removeRecursive(child.children, child, shouldDispose);
			}
			delete child.__r3f;
			if (shouldDispose && child.dispose && child.type !== "Scene") {
				const callback = () => {
					try {
						child.dispose();
					} catch (e) {}
				};
				if (typeof IS_REACT_ACT_ENVIRONMENT === "undefined") (0, import_scheduler$1.unstable_scheduleCallback)(import_scheduler$1.unstable_IdlePriority, callback);
				else callback();
			}
			invalidateInstance(parentInstance);
		}
	}
	function switchInstance(instance, type, newProps, fiber) {
		var _instance$__r3f;
		const parent = (_instance$__r3f = instance.__r3f) == null ? void 0 : _instance$__r3f.parent;
		if (!parent) return;
		const newInstance = createInstance(type, newProps, instance.__r3f.root);
		if (instance.children) {
			for (const child of instance.children) if (child.__r3f) appendChild(newInstance, child);
			instance.children = instance.children.filter((child) => !child.__r3f);
		}
		instance.__r3f.objects.forEach((child) => appendChild(newInstance, child));
		instance.__r3f.objects = [];
		if (!instance.__r3f.autoRemovedBeforeAppend) removeChild(parent, instance);
		if (newInstance.parent) newInstance.__r3f.autoRemovedBeforeAppend = true;
		appendChild(parent, newInstance);
		if (newInstance.raycast && newInstance.__r3f.eventCount) findInitialRoot(newInstance).getState().internal.interaction.push(newInstance);
		[fiber, fiber.alternate].forEach((fiber$1) => {
			if (fiber$1 !== null) {
				fiber$1.stateNode = newInstance;
				if (fiber$1.ref) if (typeof fiber$1.ref === "function") fiber$1.ref(newInstance);
				else fiber$1.ref.current = newInstance;
			}
		});
	}
	const handleTextInstance = () => {};
	return {
		reconciler: (0, import_react_reconciler$1.default)({
			createInstance,
			removeChild,
			appendChild,
			appendInitialChild: appendChild,
			insertBefore,
			supportsMutation: true,
			isPrimaryRenderer: false,
			supportsPersistence: false,
			supportsHydration: false,
			noTimeout: -1,
			appendChildToContainer: (container, child) => {
				if (!child) return;
				const scene = container.getState().scene;
				if (!scene.__r3f) return;
				scene.__r3f.root = container;
				appendChild(scene, child);
			},
			removeChildFromContainer: (container, child) => {
				if (!child) return;
				removeChild(container.getState().scene, child);
			},
			insertInContainerBefore: (container, child, beforeChild) => {
				if (!child || !beforeChild) return;
				const scene = container.getState().scene;
				if (!scene.__r3f) return;
				insertBefore(scene, child, beforeChild);
			},
			getRootHostContext: () => null,
			getChildHostContext: (parentHostContext) => parentHostContext,
			finalizeInitialChildren(instance) {
				var _instance$__r3f2;
				const localState = (_instance$__r3f2 = instance == null ? void 0 : instance.__r3f) != null ? _instance$__r3f2 : {};
				return Boolean(localState.handlers);
			},
			prepareUpdate(instance, _type, oldProps, newProps) {
				var _instance$__r3f3;
				if (((_instance$__r3f3 = instance == null ? void 0 : instance.__r3f) != null ? _instance$__r3f3 : {}).primitive && newProps.object && newProps.object !== instance) return [true];
				else {
					const { args: argsNew = [], children: cN, ...restNew } = newProps;
					const { args: argsOld = [], children: cO, ...restOld } = oldProps;
					if (!Array.isArray(argsNew)) throw new Error("R3F: the args prop must be an array!");
					if (argsNew.some((value, index) => value !== argsOld[index])) return [true];
					const diff = diffProps(instance, restNew, restOld, true);
					if (diff.changes.length) return [false, diff];
					return null;
				}
			},
			commitUpdate(instance, [reconstruct, diff], type, _oldProps, newProps, fiber) {
				if (reconstruct) switchInstance(instance, type, newProps, fiber);
				else applyProps$1(instance, diff);
			},
			commitMount(instance, _type, _props, _int) {
				var _instance$__r3f4;
				const localState = (_instance$__r3f4 = instance.__r3f) != null ? _instance$__r3f4 : {};
				if (instance.raycast && localState.handlers && localState.eventCount) findInitialRoot(instance).getState().internal.interaction.push(instance);
			},
			getPublicInstance: (instance) => instance,
			prepareForCommit: () => null,
			preparePortalMount: (container) => prepare(container.getState().scene),
			resetAfterCommit: () => {},
			shouldSetTextContent: () => false,
			clearContainer: () => false,
			hideInstance(instance) {
				var _instance$__r3f5;
				const { attach: type, parent } = (_instance$__r3f5 = instance.__r3f) != null ? _instance$__r3f5 : {};
				if (type && parent) detach(parent, instance, type);
				if (instance.isObject3D) instance.visible = false;
				invalidateInstance(instance);
			},
			unhideInstance(instance, props) {
				var _instance$__r3f6;
				const { attach: type, parent } = (_instance$__r3f6 = instance.__r3f) != null ? _instance$__r3f6 : {};
				if (type && parent) attach(parent, instance, type);
				if (instance.isObject3D && props.visible == null || props.visible) instance.visible = true;
				invalidateInstance(instance);
			},
			createTextInstance: handleTextInstance,
			hideTextInstance: handleTextInstance,
			unhideTextInstance: handleTextInstance,
			getCurrentEventPriority: () => _getEventPriority ? _getEventPriority() : import_constants$1.DefaultEventPriority,
			beforeActiveInstanceBlur: () => {},
			afterActiveInstanceBlur: () => {},
			detachDeletedInstance: () => {},
			now: typeof performance !== "undefined" && is.fun(performance.now) ? performance.now : is.fun(Date.now) ? Date.now : () => 0,
			scheduleTimeout: is.fun(setTimeout) ? setTimeout : void 0,
			cancelTimeout: is.fun(clearTimeout) ? clearTimeout : void 0
		}),
		applyProps: applyProps$1
	};
}
var _window$document, _window$navigator;
var hasColorSpace = (object) => "colorSpace" in object || "outputColorSpace" in object;
var getColorManagement = () => {
	var _ColorManagement;
	return (_ColorManagement = catalogue.ColorManagement) != null ? _ColorManagement : null;
};
var isOrthographicCamera = (def) => def && def.isOrthographicCamera;
var isRef = (obj) => obj && obj.hasOwnProperty("current");
var useIsomorphicLayoutEffect = typeof window !== "undefined" && ((_window$document = window.document) != null && _window$document.createElement || ((_window$navigator = window.navigator) == null ? void 0 : _window$navigator.product) === "ReactNative") ? import_react.useLayoutEffect : import_react.useEffect;
function useMutableCallback(fn) {
	const ref = import_react.useRef(fn);
	useIsomorphicLayoutEffect(() => void (ref.current = fn), [fn]);
	return ref;
}
function Block({ set }) {
	useIsomorphicLayoutEffect(() => {
		set(new Promise(() => null));
		return () => set(false);
	}, [set]);
	return null;
}
var ErrorBoundary = class extends import_react.Component {
	constructor(...args) {
		super(...args);
		this.state = { error: false };
	}
	componentDidCatch(err) {
		this.props.set(err);
	}
	render() {
		return this.state.error ? null : this.props.children;
	}
};
ErrorBoundary.getDerivedStateFromError = () => ({ error: true });
var DEFAULT = "__default";
var DEFAULTS = /* @__PURE__ */ new Map();
var isDiffSet = (def) => def && !!def.memoized && !!def.changes;
function calculateDpr(dpr) {
	var _window$devicePixelRa;
	const target = typeof window !== "undefined" ? (_window$devicePixelRa = window.devicePixelRatio) != null ? _window$devicePixelRa : 2 : 1;
	return Array.isArray(dpr) ? Math.min(Math.max(dpr[0], target), dpr[1]) : dpr;
}
var getRootState = (obj) => {
	var _r3f;
	return (_r3f = obj.__r3f) == null ? void 0 : _r3f.root.getState();
};
function findInitialRoot(child) {
	let root = child.__r3f.root;
	while (root.getState().previousRoot) root = root.getState().previousRoot;
	return root;
}
var is = {
	obj: (a) => a === Object(a) && !is.arr(a) && typeof a !== "function",
	fun: (a) => typeof a === "function",
	str: (a) => typeof a === "string",
	num: (a) => typeof a === "number",
	boo: (a) => typeof a === "boolean",
	und: (a) => a === void 0,
	arr: (a) => Array.isArray(a),
	equ(a, b, { arrays = "shallow", objects = "reference", strict = true } = {}) {
		if (typeof a !== typeof b || !!a !== !!b) return false;
		if (is.str(a) || is.num(a) || is.boo(a)) return a === b;
		const isObj = is.obj(a);
		if (isObj && objects === "reference") return a === b;
		const isArr = is.arr(a);
		if (isArr && arrays === "reference") return a === b;
		if ((isArr || isObj) && a === b) return true;
		let i$1;
		for (i$1 in a) if (!(i$1 in b)) return false;
		if (isObj && arrays === "shallow" && objects === "shallow") {
			for (i$1 in strict ? b : a) if (!is.equ(a[i$1], b[i$1], {
				strict,
				objects: "reference"
			})) return false;
		} else for (i$1 in strict ? b : a) if (a[i$1] !== b[i$1]) return false;
		if (is.und(i$1)) {
			if (isArr && a.length === 0 && b.length === 0) return true;
			if (isObj && Object.keys(a).length === 0 && Object.keys(b).length === 0) return true;
			if (a !== b) return false;
		}
		return true;
	}
};
function buildGraph(object) {
	const data = {
		nodes: {},
		materials: {}
	};
	if (object) object.traverse((obj) => {
		if (obj.name) data.nodes[obj.name] = obj;
		if (obj.material && !data.materials[obj.material.name]) data.materials[obj.material.name] = obj.material;
	});
	return data;
}
function dispose(obj) {
	if (obj.dispose && obj.type !== "Scene") obj.dispose();
	for (const p$3 in obj) {
		p$3.dispose == null || p$3.dispose();
		delete obj[p$3];
	}
}
function prepare(object, state) {
	const instance = object;
	instance.__r3f = {
		type: "",
		root: null,
		previousAttach: null,
		memoizedProps: {},
		eventCount: 0,
		handlers: {},
		objects: [],
		parent: null,
		...state
	};
	return object;
}
function resolve(instance, key) {
	let target = instance;
	if (key.includes("-")) {
		const entries = key.split("-");
		const last = entries.pop();
		target = entries.reduce((acc, key$1) => acc[key$1], instance);
		return {
			target,
			key: last
		};
	} else return {
		target,
		key
	};
}
var INDEX_REGEX = /-\d+$/;
function attach(parent, child, type) {
	if (is.str(type)) {
		if (INDEX_REGEX.test(type)) {
			const { target: target$1, key: key$1 } = resolve(parent, type.replace(INDEX_REGEX, ""));
			if (!Array.isArray(target$1[key$1])) target$1[key$1] = [];
		}
		const { target, key } = resolve(parent, type);
		child.__r3f.previousAttach = target[key];
		target[key] = child;
	} else child.__r3f.previousAttach = type(parent, child);
}
function detach(parent, child, type) {
	var _child$__r3f, _child$__r3f2;
	if (is.str(type)) {
		const { target, key } = resolve(parent, type);
		const previous = child.__r3f.previousAttach;
		if (previous === void 0) delete target[key];
		else target[key] = previous;
	} else (_child$__r3f = child.__r3f) == null || _child$__r3f.previousAttach == null || _child$__r3f.previousAttach(parent, child);
	(_child$__r3f2 = child.__r3f) == null || delete _child$__r3f2.previousAttach;
}
function diffProps(instance, { children: cN, key: kN, ref: rN, ...props }, { children: cP, key: kP, ref: rP, ...previous } = {}, remove = false) {
	const localState = instance.__r3f;
	const entries = Object.entries(props);
	const changes = [];
	if (remove) {
		const previousKeys = Object.keys(previous);
		for (let i$1 = 0; i$1 < previousKeys.length; i$1++) if (!props.hasOwnProperty(previousKeys[i$1])) entries.unshift([previousKeys[i$1], DEFAULT + "remove"]);
	}
	entries.forEach(([key, value]) => {
		var _instance$__r3f;
		if ((_instance$__r3f = instance.__r3f) != null && _instance$__r3f.primitive && key === "object") return;
		if (is.equ(value, previous[key])) return;
		if (/^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/.test(key)) return changes.push([
			key,
			value,
			true,
			[]
		]);
		let entries$1 = [];
		if (key.includes("-")) entries$1 = key.split("-");
		changes.push([
			key,
			value,
			false,
			entries$1
		]);
		for (const prop in props) {
			const value$1 = props[prop];
			if (prop.startsWith(`${key}-`)) changes.push([
				prop,
				value$1,
				false,
				prop.split("-")
			]);
		}
	});
	const memoized = { ...props };
	if (localState != null && localState.memoizedProps && localState != null && localState.memoizedProps.args) memoized.args = localState.memoizedProps.args;
	if (localState != null && localState.memoizedProps && localState != null && localState.memoizedProps.attach) memoized.attach = localState.memoizedProps.attach;
	return {
		memoized,
		changes
	};
}
var __DEV__ = typeof process !== "undefined" && false;
function applyProps$1(instance, data) {
	var _instance$__r3f2;
	const localState = instance.__r3f;
	const root = localState == null ? void 0 : localState.root;
	const rootState = root == null ? void 0 : root.getState == null ? void 0 : root.getState();
	const { memoized, changes } = isDiffSet(data) ? data : diffProps(instance, data);
	const prevHandlers = localState == null ? void 0 : localState.eventCount;
	if (instance.__r3f) instance.__r3f.memoizedProps = memoized;
	for (let i$1 = 0; i$1 < changes.length; i$1++) {
		let [key, value, isEvent, keys] = changes[i$1];
		if (hasColorSpace(instance)) {
			const sRGBEncoding = 3001;
			const SRGBColorSpace = "srgb";
			const LinearSRGBColorSpace = "srgb-linear";
			if (key === "encoding") {
				key = "colorSpace";
				value = value === sRGBEncoding ? SRGBColorSpace : LinearSRGBColorSpace;
			} else if (key === "outputEncoding") {
				key = "outputColorSpace";
				value = value === sRGBEncoding ? SRGBColorSpace : LinearSRGBColorSpace;
			}
		}
		let currentInstance = instance;
		let targetProp = currentInstance[key];
		if (keys.length) {
			targetProp = keys.reduce((acc, key$1) => acc[key$1], instance);
			if (!(targetProp && targetProp.set)) {
				const [name, ...reverseEntries] = keys.reverse();
				currentInstance = reverseEntries.reverse().reduce((acc, key$1) => acc[key$1], instance);
				key = name;
			}
		}
		if (value === DEFAULT + "remove") if (currentInstance.constructor) {
			let ctor = DEFAULTS.get(currentInstance.constructor);
			if (!ctor) {
				ctor = new currentInstance.constructor();
				DEFAULTS.set(currentInstance.constructor, ctor);
			}
			value = ctor[key];
		} else value = 0;
		if (isEvent && localState) {
			if (value) localState.handlers[key] = value;
			else delete localState.handlers[key];
			localState.eventCount = Object.keys(localState.handlers).length;
		} else if (targetProp && targetProp.set && (targetProp.copy || targetProp instanceof Layers)) {
			if (Array.isArray(value)) if (targetProp.fromArray) targetProp.fromArray(value);
			else targetProp.set(...value);
			else if (targetProp.copy && value && value.constructor && (__DEV__ ? targetProp.constructor.name === value.constructor.name : targetProp.constructor === value.constructor)) targetProp.copy(value);
			else if (value !== void 0) {
				var _targetProp;
				const isColor = (_targetProp = targetProp) == null ? void 0 : _targetProp.isColor;
				if (!isColor && targetProp.setScalar) targetProp.setScalar(value);
				else if (targetProp instanceof Layers && value instanceof Layers) targetProp.mask = value.mask;
				else targetProp.set(value);
				if (!getColorManagement() && rootState && !rootState.linear && isColor) targetProp.convertSRGBToLinear();
			}
		} else {
			var _currentInstance$key;
			currentInstance[key] = value;
			if ((_currentInstance$key = currentInstance[key]) != null && _currentInstance$key.isTexture && currentInstance[key].format === 1023 && currentInstance[key].type === 1009 && rootState) {
				const texture = currentInstance[key];
				if (hasColorSpace(texture) && hasColorSpace(rootState.gl)) texture.colorSpace = rootState.gl.outputColorSpace;
				else texture.encoding = rootState.gl.outputEncoding;
			}
		}
		invalidateInstance(instance);
	}
	if (localState && localState.parent && instance.raycast && prevHandlers !== localState.eventCount) {
		const internal = findInitialRoot(instance).getState().internal;
		const index = internal.interaction.indexOf(instance);
		if (index > -1) internal.interaction.splice(index, 1);
		if (localState.eventCount) internal.interaction.push(instance);
	}
	if (!(changes.length === 1 && changes[0][0] === "onUpdate") && changes.length && (_instance$__r3f2 = instance.__r3f) != null && _instance$__r3f2.parent) updateInstance(instance);
	return instance;
}
function invalidateInstance(instance) {
	var _instance$__r3f3, _instance$__r3f3$root;
	const state = (_instance$__r3f3 = instance.__r3f) == null ? void 0 : (_instance$__r3f3$root = _instance$__r3f3.root) == null ? void 0 : _instance$__r3f3$root.getState == null ? void 0 : _instance$__r3f3$root.getState();
	if (state && state.internal.frames === 0) state.invalidate();
}
function updateInstance(instance) {
	instance.onUpdate == null || instance.onUpdate(instance);
}
function updateCamera(camera, size) {
	if (!camera.manual) {
		if (isOrthographicCamera(camera)) {
			camera.left = size.width / -2;
			camera.right = size.width / 2;
			camera.top = size.height / 2;
			camera.bottom = size.height / -2;
		} else camera.aspect = size.width / size.height;
		camera.updateProjectionMatrix();
		camera.updateMatrixWorld();
	}
}
function makeId(event) {
	return (event.eventObject || event.object).uuid + "/" + event.index + event.instanceId;
}
function getEventPriority() {
	var _globalScope$event;
	const globalScope = typeof self !== "undefined" && self || typeof window !== "undefined" && window;
	if (!globalScope) return import_constants$1.DefaultEventPriority;
	switch ((_globalScope$event = globalScope.event) == null ? void 0 : _globalScope$event.type) {
		case "click":
		case "contextmenu":
		case "dblclick":
		case "pointercancel":
		case "pointerdown":
		case "pointerup": return import_constants$1.DiscreteEventPriority;
		case "pointermove":
		case "pointerout":
		case "pointerover":
		case "pointerenter":
		case "pointerleave":
		case "wheel": return import_constants$1.ContinuousEventPriority;
		default: return import_constants$1.DefaultEventPriority;
	}
}
function releaseInternalPointerCapture(capturedMap, obj, captures, pointerId) {
	const captureData = captures.get(obj);
	if (captureData) {
		captures.delete(obj);
		if (captures.size === 0) {
			capturedMap.delete(pointerId);
			captureData.target.releasePointerCapture(pointerId);
		}
	}
}
function removeInteractivity(store, object) {
	const { internal } = store.getState();
	internal.interaction = internal.interaction.filter((o) => o !== object);
	internal.initialHits = internal.initialHits.filter((o) => o !== object);
	internal.hovered.forEach((value, key) => {
		if (value.eventObject === object || value.object === object) internal.hovered.delete(key);
	});
	internal.capturedMap.forEach((captures, pointerId) => {
		releaseInternalPointerCapture(internal.capturedMap, object, captures, pointerId);
	});
}
function createEvents(store) {
	function calculateDistance(event) {
		const { internal } = store.getState();
		const dx = event.offsetX - internal.initialClick[0];
		const dy = event.offsetY - internal.initialClick[1];
		return Math.round(Math.sqrt(dx * dx + dy * dy));
	}
	function filterPointerEvents(objects) {
		return objects.filter((obj) => [
			"Move",
			"Over",
			"Enter",
			"Out",
			"Leave"
		].some((name) => {
			var _r3f;
			return (_r3f = obj.__r3f) == null ? void 0 : _r3f.handlers["onPointer" + name];
		}));
	}
	function intersect(event, filter) {
		const state = store.getState();
		const duplicates = /* @__PURE__ */ new Set();
		const intersections = [];
		const eventsObjects = filter ? filter(state.internal.interaction) : state.internal.interaction;
		for (let i$1 = 0; i$1 < eventsObjects.length; i$1++) {
			const state$1 = getRootState(eventsObjects[i$1]);
			if (state$1) state$1.raycaster.camera = void 0;
		}
		if (!state.previousRoot) state.events.compute == null || state.events.compute(event, state);
		function handleRaycast(obj) {
			const state$1 = getRootState(obj);
			if (!state$1 || !state$1.events.enabled || state$1.raycaster.camera === null) return [];
			if (state$1.raycaster.camera === void 0) {
				var _state$previousRoot;
				state$1.events.compute == null || state$1.events.compute(event, state$1, (_state$previousRoot = state$1.previousRoot) == null ? void 0 : _state$previousRoot.getState());
				if (state$1.raycaster.camera === void 0) state$1.raycaster.camera = null;
			}
			return state$1.raycaster.camera ? state$1.raycaster.intersectObject(obj, true) : [];
		}
		let hits = eventsObjects.flatMap(handleRaycast).sort((a, b) => {
			const aState = getRootState(a.object);
			const bState = getRootState(b.object);
			if (!aState || !bState) return a.distance - b.distance;
			return bState.events.priority - aState.events.priority || a.distance - b.distance;
		}).filter((item) => {
			const id = makeId(item);
			if (duplicates.has(id)) return false;
			duplicates.add(id);
			return true;
		});
		if (state.events.filter) hits = state.events.filter(hits, state);
		for (const hit of hits) {
			let eventObject = hit.object;
			while (eventObject) {
				var _r3f2;
				if ((_r3f2 = eventObject.__r3f) != null && _r3f2.eventCount) intersections.push({
					...hit,
					eventObject
				});
				eventObject = eventObject.parent;
			}
		}
		if ("pointerId" in event && state.internal.capturedMap.has(event.pointerId)) {
			for (let captureData of state.internal.capturedMap.get(event.pointerId).values()) if (!duplicates.has(makeId(captureData.intersection))) intersections.push(captureData.intersection);
		}
		return intersections;
	}
	function handleIntersects(intersections, event, delta, callback) {
		const rootState = store.getState();
		if (intersections.length) {
			const localState = { stopped: false };
			for (const hit of intersections) {
				const { raycaster, pointer, camera, internal } = getRootState(hit.object) || rootState;
				const unprojectedPoint = new Vector3(pointer.x, pointer.y, 0).unproject(camera);
				const hasPointerCapture = (id) => {
					var _internal$capturedMap, _internal$capturedMap2;
					return (_internal$capturedMap = (_internal$capturedMap2 = internal.capturedMap.get(id)) == null ? void 0 : _internal$capturedMap2.has(hit.eventObject)) != null ? _internal$capturedMap : false;
				};
				const setPointerCapture = (id) => {
					const captureData = {
						intersection: hit,
						target: event.target
					};
					if (internal.capturedMap.has(id)) internal.capturedMap.get(id).set(hit.eventObject, captureData);
					else internal.capturedMap.set(id, new Map([[hit.eventObject, captureData]]));
					event.target.setPointerCapture(id);
				};
				const releasePointerCapture = (id) => {
					const captures = internal.capturedMap.get(id);
					if (captures) releaseInternalPointerCapture(internal.capturedMap, hit.eventObject, captures, id);
				};
				let extractEventProps = {};
				for (let prop in event) {
					let property = event[prop];
					if (typeof property !== "function") extractEventProps[prop] = property;
				}
				let raycastEvent = {
					...hit,
					...extractEventProps,
					pointer,
					intersections,
					stopped: localState.stopped,
					delta,
					unprojectedPoint,
					ray: raycaster.ray,
					camera,
					stopPropagation() {
						const capturesForPointer = "pointerId" in event && internal.capturedMap.get(event.pointerId);
						if (!capturesForPointer || capturesForPointer.has(hit.eventObject)) {
							raycastEvent.stopped = localState.stopped = true;
							if (internal.hovered.size && Array.from(internal.hovered.values()).find((i$1) => i$1.eventObject === hit.eventObject)) cancelPointer([...intersections.slice(0, intersections.indexOf(hit)), hit]);
						}
					},
					target: {
						hasPointerCapture,
						setPointerCapture,
						releasePointerCapture
					},
					currentTarget: {
						hasPointerCapture,
						setPointerCapture,
						releasePointerCapture
					},
					nativeEvent: event
				};
				callback(raycastEvent);
				if (localState.stopped === true) break;
			}
		}
		return intersections;
	}
	function cancelPointer(intersections) {
		const { internal } = store.getState();
		for (const hoveredObj of internal.hovered.values()) if (!intersections.length || !intersections.find((hit) => hit.object === hoveredObj.object && hit.index === hoveredObj.index && hit.instanceId === hoveredObj.instanceId)) {
			const instance = hoveredObj.eventObject.__r3f;
			const handlers = instance == null ? void 0 : instance.handlers;
			internal.hovered.delete(makeId(hoveredObj));
			if (instance != null && instance.eventCount) {
				const data = {
					...hoveredObj,
					intersections
				};
				handlers.onPointerOut == null || handlers.onPointerOut(data);
				handlers.onPointerLeave == null || handlers.onPointerLeave(data);
			}
		}
	}
	function pointerMissed(event, objects) {
		for (let i$1 = 0; i$1 < objects.length; i$1++) {
			const instance = objects[i$1].__r3f;
			instance == null || instance.handlers.onPointerMissed == null || instance.handlers.onPointerMissed(event);
		}
	}
	function handlePointer(name) {
		switch (name) {
			case "onPointerLeave":
			case "onPointerCancel": return () => cancelPointer([]);
			case "onLostPointerCapture": return (event) => {
				const { internal } = store.getState();
				if ("pointerId" in event && internal.capturedMap.has(event.pointerId)) requestAnimationFrame(() => {
					if (internal.capturedMap.has(event.pointerId)) {
						internal.capturedMap.delete(event.pointerId);
						cancelPointer([]);
					}
				});
			};
		}
		return function handleEvent(event) {
			const { onPointerMissed, internal } = store.getState();
			internal.lastEvent.current = event;
			const isPointerMove = name === "onPointerMove";
			const isClickEvent = name === "onClick" || name === "onContextMenu" || name === "onDoubleClick";
			const hits = intersect(event, isPointerMove ? filterPointerEvents : void 0);
			const delta = isClickEvent ? calculateDistance(event) : 0;
			if (name === "onPointerDown") {
				internal.initialClick = [event.offsetX, event.offsetY];
				internal.initialHits = hits.map((hit) => hit.eventObject);
			}
			if (isClickEvent && !hits.length) {
				if (delta <= 2) {
					pointerMissed(event, internal.interaction);
					if (onPointerMissed) onPointerMissed(event);
				}
			}
			if (isPointerMove) cancelPointer(hits);
			function onIntersect(data) {
				const eventObject = data.eventObject;
				const instance = eventObject.__r3f;
				const handlers = instance == null ? void 0 : instance.handlers;
				if (!(instance != null && instance.eventCount)) return;
				if (isPointerMove) {
					if (handlers.onPointerOver || handlers.onPointerEnter || handlers.onPointerOut || handlers.onPointerLeave) {
						const id = makeId(data);
						const hoveredItem = internal.hovered.get(id);
						if (!hoveredItem) {
							internal.hovered.set(id, data);
							handlers.onPointerOver == null || handlers.onPointerOver(data);
							handlers.onPointerEnter == null || handlers.onPointerEnter(data);
						} else if (hoveredItem.stopped) data.stopPropagation();
					}
					handlers.onPointerMove == null || handlers.onPointerMove(data);
				} else {
					const handler = handlers[name];
					if (handler) {
						if (!isClickEvent || internal.initialHits.includes(eventObject)) {
							pointerMissed(event, internal.interaction.filter((object) => !internal.initialHits.includes(object)));
							handler(data);
						}
					} else if (isClickEvent && internal.initialHits.includes(eventObject)) pointerMissed(event, internal.interaction.filter((object) => !internal.initialHits.includes(object)));
				}
			}
			handleIntersects(hits, event, delta, onIntersect);
		};
	}
	return { handlePointer };
}
var privateKeys = [
	"set",
	"get",
	"setSize",
	"setFrameloop",
	"setDpr",
	"events",
	"invalidate",
	"advance",
	"size",
	"viewport"
];
var isRenderer = (def) => !!(def != null && def.render);
var context = /* @__PURE__ */ import_react.createContext(null);
var createStore = (invalidate$1, advance$1) => {
	const rootState = create((set, get) => {
		const position = new Vector3();
		const defaultTarget = new Vector3();
		const tempTarget = new Vector3();
		function getCurrentViewport(camera = get().camera, target = defaultTarget, size = get().size) {
			const { width, height, top, left } = size;
			const aspect = width / height;
			if (target.isVector3) tempTarget.copy(target);
			else tempTarget.set(...target);
			const distance = camera.getWorldPosition(position).distanceTo(tempTarget);
			if (isOrthographicCamera(camera)) return {
				width: width / camera.zoom,
				height: height / camera.zoom,
				top,
				left,
				factor: 1,
				distance,
				aspect
			};
			else {
				const fov = camera.fov * Math.PI / 180;
				const h$2 = 2 * Math.tan(fov / 2) * distance;
				const w = h$2 * (width / height);
				return {
					width: w,
					height: h$2,
					top,
					left,
					factor: width / w,
					distance,
					aspect
				};
			}
		}
		let performanceTimeout = void 0;
		const setPerformanceCurrent = (current) => set((state$1) => ({ performance: {
			...state$1.performance,
			current
		} }));
		const pointer = new Vector2();
		return {
			set,
			get,
			gl: null,
			camera: null,
			raycaster: null,
			events: {
				priority: 1,
				enabled: true,
				connected: false
			},
			xr: null,
			scene: null,
			invalidate: (frames = 1) => invalidate$1(get(), frames),
			advance: (timestamp, runGlobalEffects) => advance$1(timestamp, runGlobalEffects, get()),
			legacy: false,
			linear: false,
			flat: false,
			controls: null,
			clock: new Clock(),
			pointer,
			mouse: pointer,
			frameloop: "always",
			onPointerMissed: void 0,
			performance: {
				current: 1,
				min: .5,
				max: 1,
				debounce: 200,
				regress: () => {
					const state$1 = get();
					if (performanceTimeout) clearTimeout(performanceTimeout);
					if (state$1.performance.current !== state$1.performance.min) setPerformanceCurrent(state$1.performance.min);
					performanceTimeout = setTimeout(() => setPerformanceCurrent(get().performance.max), state$1.performance.debounce);
				}
			},
			size: {
				width: 0,
				height: 0,
				top: 0,
				left: 0,
				updateStyle: false
			},
			viewport: {
				initialDpr: 0,
				dpr: 0,
				width: 0,
				height: 0,
				top: 0,
				left: 0,
				aspect: 0,
				distance: 0,
				factor: 0,
				getCurrentViewport
			},
			setEvents: (events) => set((state$1) => ({
				...state$1,
				events: {
					...state$1.events,
					...events
				}
			})),
			setSize: (width, height, updateStyle, top, left) => {
				const camera = get().camera;
				const size = {
					width,
					height,
					top: top || 0,
					left: left || 0,
					updateStyle
				};
				set((state$1) => ({
					size,
					viewport: {
						...state$1.viewport,
						...getCurrentViewport(camera, defaultTarget, size)
					}
				}));
			},
			setDpr: (dpr) => set((state$1) => {
				const resolved = calculateDpr(dpr);
				return { viewport: {
					...state$1.viewport,
					dpr: resolved,
					initialDpr: state$1.viewport.initialDpr || resolved
				} };
			}),
			setFrameloop: (frameloop = "always") => {
				const clock = get().clock;
				clock.stop();
				clock.elapsedTime = 0;
				if (frameloop !== "never") {
					clock.start();
					clock.elapsedTime = 0;
				}
				set(() => ({ frameloop }));
			},
			previousRoot: void 0,
			internal: {
				active: false,
				priority: 0,
				frames: 0,
				lastEvent: /* @__PURE__ */ import_react.createRef(),
				interaction: [],
				hovered: /* @__PURE__ */ new Map(),
				subscribers: [],
				initialClick: [0, 0],
				initialHits: [],
				capturedMap: /* @__PURE__ */ new Map(),
				subscribe: (ref, priority, store) => {
					const internal = get().internal;
					internal.priority = internal.priority + (priority > 0 ? 1 : 0);
					internal.subscribers.push({
						ref,
						priority,
						store
					});
					internal.subscribers = internal.subscribers.sort((a, b) => a.priority - b.priority);
					return () => {
						const internal$1 = get().internal;
						if (internal$1 != null && internal$1.subscribers) {
							internal$1.priority = internal$1.priority - (priority > 0 ? 1 : 0);
							internal$1.subscribers = internal$1.subscribers.filter((s) => s.ref !== ref);
						}
					};
				}
			}
		};
	});
	const state = rootState.getState();
	let oldSize = state.size;
	let oldDpr = state.viewport.dpr;
	let oldCamera = state.camera;
	rootState.subscribe(() => {
		const { camera, size, viewport, gl, set } = rootState.getState();
		if (size.width !== oldSize.width || size.height !== oldSize.height || viewport.dpr !== oldDpr) {
			var _size$updateStyle;
			oldSize = size;
			oldDpr = viewport.dpr;
			updateCamera(camera, size);
			gl.setPixelRatio(viewport.dpr);
			const updateStyle = (_size$updateStyle = size.updateStyle) != null ? _size$updateStyle : typeof HTMLCanvasElement !== "undefined" && gl.domElement instanceof HTMLCanvasElement;
			gl.setSize(size.width, size.height, updateStyle);
		}
		if (camera !== oldCamera) {
			oldCamera = camera;
			set((state$1) => ({ viewport: {
				...state$1.viewport,
				...state$1.viewport.getCurrentViewport(camera)
			} }));
		}
	});
	rootState.subscribe((state$1) => invalidate$1(state$1));
	return rootState;
};
var i;
var globalEffects = /* @__PURE__ */ new Set();
var globalAfterEffects = /* @__PURE__ */ new Set();
var globalTailEffects = /* @__PURE__ */ new Set();
function run(effects, timestamp) {
	if (!effects.size) return;
	for (const { callback } of effects.values()) callback(timestamp);
}
function flushGlobalEffects(type, timestamp) {
	switch (type) {
		case "before": return run(globalEffects, timestamp);
		case "after": return run(globalAfterEffects, timestamp);
		case "tail": return run(globalTailEffects, timestamp);
	}
}
var subscribers;
var subscription;
function render$1(timestamp, state, frame) {
	let delta = state.clock.getDelta();
	if (state.frameloop === "never" && typeof timestamp === "number") {
		delta = timestamp - state.clock.elapsedTime;
		state.clock.oldTime = state.clock.elapsedTime;
		state.clock.elapsedTime = timestamp;
	}
	subscribers = state.internal.subscribers;
	for (i = 0; i < subscribers.length; i++) {
		subscription = subscribers[i];
		subscription.ref.current(subscription.store.getState(), delta, frame);
	}
	if (!state.internal.priority && state.gl.render) state.gl.render(state.scene, state.camera);
	state.internal.frames = Math.max(0, state.internal.frames - 1);
	return state.frameloop === "always" ? 1 : state.internal.frames;
}
function createLoop(roots$1) {
	let running = false;
	let useFrameInProgress = false;
	let repeat;
	let frame;
	let state;
	function loop(timestamp) {
		frame = requestAnimationFrame(loop);
		running = true;
		repeat = 0;
		flushGlobalEffects("before", timestamp);
		useFrameInProgress = true;
		for (const root of roots$1.values()) {
			var _state$gl$xr;
			state = root.store.getState();
			if (state.internal.active && (state.frameloop === "always" || state.internal.frames > 0) && !((_state$gl$xr = state.gl.xr) != null && _state$gl$xr.isPresenting)) repeat += render$1(timestamp, state);
		}
		useFrameInProgress = false;
		flushGlobalEffects("after", timestamp);
		if (repeat === 0) {
			flushGlobalEffects("tail", timestamp);
			running = false;
			return cancelAnimationFrame(frame);
		}
	}
	function invalidate$1(state$1, frames = 1) {
		var _state$gl$xr2;
		if (!state$1) return roots$1.forEach((root) => invalidate$1(root.store.getState(), frames));
		if ((_state$gl$xr2 = state$1.gl.xr) != null && _state$gl$xr2.isPresenting || !state$1.internal.active || state$1.frameloop === "never") return;
		if (frames > 1) state$1.internal.frames = Math.min(60, state$1.internal.frames + frames);
		else if (useFrameInProgress) state$1.internal.frames = 2;
		else state$1.internal.frames = 1;
		if (!running) {
			running = true;
			requestAnimationFrame(loop);
		}
	}
	function advance$1(timestamp, runGlobalEffects = true, state$1, frame$1) {
		if (runGlobalEffects) flushGlobalEffects("before", timestamp);
		if (!state$1) for (const root of roots$1.values()) render$1(timestamp, root.store.getState());
		else render$1(timestamp, state$1, frame$1);
		if (runGlobalEffects) flushGlobalEffects("after", timestamp);
	}
	return {
		loop,
		invalidate: invalidate$1,
		advance: advance$1
	};
}
function useStore() {
	const store = import_react.useContext(context);
	if (!store) throw new Error("R3F: Hooks can only be used within the Canvas component!");
	return store;
}
function useThree(selector = (state) => state, equalityFn) {
	return useStore()(selector, equalityFn);
}
function useFrame(callback, renderPriority = 0) {
	const store = useStore();
	const subscribe = store.getState().internal.subscribe;
	const ref = useMutableCallback(callback);
	useIsomorphicLayoutEffect(() => subscribe(ref, renderPriority, store), [
		renderPriority,
		subscribe,
		store
	]);
	return null;
}
var memoizedLoaders = /* @__PURE__ */ new WeakMap();
function loadingFn(extensions, onProgress) {
	return function(Proto, ...input) {
		let loader = memoizedLoaders.get(Proto);
		if (!loader) {
			loader = new Proto();
			memoizedLoaders.set(Proto, loader);
		}
		if (extensions) extensions(loader);
		return Promise.all(input.map((input$1) => new Promise((res, reject) => loader.load(input$1, (data) => {
			if (data.scene) Object.assign(data, buildGraph(data.scene));
			res(data);
		}, onProgress, (error$1) => reject(/* @__PURE__ */ new Error(`Could not load ${input$1}: ${error$1 == null ? void 0 : error$1.message}`))))));
	};
}
function useLoader(Proto, input, extensions, onProgress) {
	const keys = Array.isArray(input) ? input : [input];
	const results = suspend(loadingFn(extensions, onProgress), [Proto, ...keys], { equal: is.equ });
	return Array.isArray(input) ? results : results[0];
}
useLoader.preload = function(Proto, input, extensions) {
	const keys = Array.isArray(input) ? input : [input];
	return preload(loadingFn(extensions), [Proto, ...keys]);
};
useLoader.clear = function(Proto, input) {
	return clear([Proto, ...Array.isArray(input) ? input : [input]]);
};
var roots = /* @__PURE__ */ new Map();
var { invalidate, advance } = createLoop(roots);
var { reconciler, applyProps } = createRenderer(roots, getEventPriority);
var shallowLoose = {
	objects: "shallow",
	strict: false
};
var createRendererInstance = (gl, canvas) => {
	const customRenderer = typeof gl === "function" ? gl(canvas) : gl;
	if (isRenderer(customRenderer)) return customRenderer;
	else return new WebGLRenderer({
		powerPreference: "high-performance",
		canvas,
		antialias: true,
		alpha: true,
		...gl
	});
};
function computeInitialSize(canvas, defaultSize) {
	const defaultStyle = typeof HTMLCanvasElement !== "undefined" && canvas instanceof HTMLCanvasElement;
	if (defaultSize) {
		const { width, height, top, left, updateStyle = defaultStyle } = defaultSize;
		return {
			width,
			height,
			top,
			left,
			updateStyle
		};
	} else if (typeof HTMLCanvasElement !== "undefined" && canvas instanceof HTMLCanvasElement && canvas.parentElement) {
		const { width, height, top, left } = canvas.parentElement.getBoundingClientRect();
		return {
			width,
			height,
			top,
			left,
			updateStyle: defaultStyle
		};
	} else if (typeof OffscreenCanvas !== "undefined" && canvas instanceof OffscreenCanvas) return {
		width: canvas.width,
		height: canvas.height,
		top: 0,
		left: 0,
		updateStyle: defaultStyle
	};
	return {
		width: 0,
		height: 0,
		top: 0,
		left: 0
	};
}
function createRoot(canvas) {
	const prevRoot = roots.get(canvas);
	const prevFiber = prevRoot == null ? void 0 : prevRoot.fiber;
	const prevStore = prevRoot == null ? void 0 : prevRoot.store;
	if (prevRoot) console.warn("R3F.createRoot should only be called once!");
	const logRecoverableError = typeof reportError === "function" ? reportError : console.error;
	const store = prevStore || createStore(invalidate, advance);
	const fiber = prevFiber || reconciler.createContainer(store, 1, null, false, null, "", logRecoverableError, null);
	if (!prevRoot) roots.set(canvas, {
		fiber,
		store
	});
	let onCreated;
	let configured = false;
	let lastCamera;
	return {
		configure(props = {}) {
			let { gl: glConfig, size: propsSize, scene: sceneOptions, events, onCreated: onCreatedCallback, shadows = false, linear = false, flat = false, legacy = false, orthographic = false, frameloop = "always", dpr = [1, 2], performance: performance$1, raycaster: raycastOptions, camera: cameraOptions, onPointerMissed } = props;
			let state = store.getState();
			let gl = state.gl;
			if (!state.gl) state.set({ gl: gl = createRendererInstance(glConfig, canvas) });
			let raycaster = state.raycaster;
			if (!raycaster) state.set({ raycaster: raycaster = new Raycaster() });
			const { params, ...options } = raycastOptions || {};
			if (!is.equ(options, raycaster, shallowLoose)) applyProps(raycaster, { ...options });
			if (!is.equ(params, raycaster.params, shallowLoose)) applyProps(raycaster, { params: {
				...raycaster.params,
				...params
			} });
			if (!state.camera || state.camera === lastCamera && !is.equ(lastCamera, cameraOptions, shallowLoose)) {
				lastCamera = cameraOptions;
				const isCamera = cameraOptions instanceof Camera;
				const camera = isCamera ? cameraOptions : orthographic ? new OrthographicCamera(0, 0, 0, 0, .1, 1e3) : new PerspectiveCamera(75, 0, .1, 1e3);
				if (!isCamera) {
					camera.position.z = 5;
					if (cameraOptions) {
						applyProps(camera, cameraOptions);
						if ("aspect" in cameraOptions || "left" in cameraOptions || "right" in cameraOptions || "bottom" in cameraOptions || "top" in cameraOptions) {
							camera.manual = true;
							camera.updateProjectionMatrix();
						}
					}
					if (!state.camera && !(cameraOptions != null && cameraOptions.rotation)) camera.lookAt(0, 0, 0);
				}
				state.set({ camera });
				raycaster.camera = camera;
			}
			if (!state.scene) {
				let scene;
				if (sceneOptions != null && sceneOptions.isScene) scene = sceneOptions;
				else {
					scene = new Scene();
					if (sceneOptions) applyProps(scene, sceneOptions);
				}
				state.set({ scene: prepare(scene) });
			}
			if (!state.xr) {
				var _gl$xr;
				const handleXRFrame = (timestamp, frame) => {
					const state$1 = store.getState();
					if (state$1.frameloop === "never") return;
					advance(timestamp, true, state$1, frame);
				};
				const handleSessionChange = () => {
					const state$1 = store.getState();
					state$1.gl.xr.enabled = state$1.gl.xr.isPresenting;
					state$1.gl.xr.setAnimationLoop(state$1.gl.xr.isPresenting ? handleXRFrame : null);
					if (!state$1.gl.xr.isPresenting) invalidate(state$1);
				};
				const xr = {
					connect() {
						const gl$1 = store.getState().gl;
						gl$1.xr.addEventListener("sessionstart", handleSessionChange);
						gl$1.xr.addEventListener("sessionend", handleSessionChange);
					},
					disconnect() {
						const gl$1 = store.getState().gl;
						gl$1.xr.removeEventListener("sessionstart", handleSessionChange);
						gl$1.xr.removeEventListener("sessionend", handleSessionChange);
					}
				};
				if (typeof ((_gl$xr = gl.xr) == null ? void 0 : _gl$xr.addEventListener) === "function") xr.connect();
				state.set({ xr });
			}
			if (gl.shadowMap) {
				const oldEnabled = gl.shadowMap.enabled;
				const oldType = gl.shadowMap.type;
				gl.shadowMap.enabled = !!shadows;
				if (is.boo(shadows)) gl.shadowMap.type = 2;
				else if (is.str(shadows)) {
					var _types$shadows;
					const types = {
						basic: 0,
						percentage: 1,
						soft: 2,
						variance: 3
					};
					gl.shadowMap.type = (_types$shadows = types[shadows]) != null ? _types$shadows : 2;
				} else if (is.obj(shadows)) Object.assign(gl.shadowMap, shadows);
				if (oldEnabled !== gl.shadowMap.enabled || oldType !== gl.shadowMap.type) gl.shadowMap.needsUpdate = true;
			}
			const ColorManagement = getColorManagement();
			if (ColorManagement) {
				if ("enabled" in ColorManagement) ColorManagement.enabled = !legacy;
				else if ("legacyMode" in ColorManagement) ColorManagement.legacyMode = legacy;
			}
			if (!configured) applyProps(gl, {
				outputEncoding: linear ? 3e3 : 3001,
				toneMapping: flat ? 0 : 4
			});
			if (state.legacy !== legacy) state.set(() => ({ legacy }));
			if (state.linear !== linear) state.set(() => ({ linear }));
			if (state.flat !== flat) state.set(() => ({ flat }));
			if (glConfig && !is.fun(glConfig) && !isRenderer(glConfig) && !is.equ(glConfig, gl, shallowLoose)) applyProps(gl, glConfig);
			if (events && !state.events.handlers) state.set({ events: events(store) });
			const size = computeInitialSize(canvas, propsSize);
			if (!is.equ(size, state.size, shallowLoose)) state.setSize(size.width, size.height, size.updateStyle, size.top, size.left);
			if (dpr && state.viewport.dpr !== calculateDpr(dpr)) state.setDpr(dpr);
			if (state.frameloop !== frameloop) state.setFrameloop(frameloop);
			if (!state.onPointerMissed) state.set({ onPointerMissed });
			if (performance$1 && !is.equ(performance$1, state.performance, shallowLoose)) state.set((state$1) => ({ performance: {
				...state$1.performance,
				...performance$1
			} }));
			onCreated = onCreatedCallback;
			configured = true;
			return this;
		},
		render(children) {
			if (!configured) this.configure();
			reconciler.updateContainer(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
				store,
				children,
				onCreated,
				rootElement: canvas
			}), fiber, null, () => void 0);
			return store;
		},
		unmount() {
			unmountComponentAtNode(canvas);
		}
	};
}
function Provider({ store, children, onCreated, rootElement }) {
	useIsomorphicLayoutEffect(() => {
		const state = store.getState();
		state.set((state$1) => ({ internal: {
			...state$1.internal,
			active: true
		} }));
		if (onCreated) onCreated(state);
		if (!store.getState().events.connected) state.events.connect == null || state.events.connect(rootElement);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(context.Provider, {
		value: store,
		children
	});
}
function unmountComponentAtNode(canvas, callback) {
	const root = roots.get(canvas);
	const fiber = root == null ? void 0 : root.fiber;
	if (fiber) {
		const state = root == null ? void 0 : root.store.getState();
		if (state) state.internal.active = false;
		reconciler.updateContainer(null, fiber, null, () => {
			if (state) setTimeout(() => {
				try {
					var _state$gl, _state$gl$renderLists, _state$gl2, _state$gl3;
					state.events.disconnect == null || state.events.disconnect();
					(_state$gl = state.gl) == null || (_state$gl$renderLists = _state$gl.renderLists) == null || _state$gl$renderLists.dispose == null || _state$gl$renderLists.dispose();
					(_state$gl2 = state.gl) == null || _state$gl2.forceContextLoss == null || _state$gl2.forceContextLoss();
					if ((_state$gl3 = state.gl) != null && _state$gl3.xr) state.xr.disconnect();
					dispose(state);
					roots.delete(canvas);
					if (callback) callback(canvas);
				} catch (e) {}
			}, 500);
		});
	}
}
function createPortal(children, container, state) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
		children,
		container,
		state
	}, container.uuid);
}
function Portal({ state = {}, children, container }) {
	const { events, size, ...rest } = state;
	const previousRoot = useStore();
	const [raycaster] = import_react.useState(() => new Raycaster());
	const [pointer] = import_react.useState(() => new Vector2());
	const inject = import_react.useCallback((rootState, injectState) => {
		const intersect = { ...rootState };
		Object.keys(rootState).forEach((key) => {
			if (privateKeys.includes(key) || rootState[key] !== injectState[key] && injectState[key]) delete intersect[key];
		});
		let viewport = void 0;
		if (injectState && size) {
			const camera = injectState.camera;
			viewport = rootState.viewport.getCurrentViewport(camera, new Vector3(), size);
			if (camera !== rootState.camera) updateCamera(camera, size);
		}
		return {
			...intersect,
			scene: container,
			raycaster,
			pointer,
			mouse: pointer,
			previousRoot,
			events: {
				...rootState.events,
				...injectState == null ? void 0 : injectState.events,
				...events
			},
			size: {
				...rootState.size,
				...size
			},
			viewport: {
				...rootState.viewport,
				...viewport
			},
			...rest
		};
	}, [state]);
	const [usePortalStore] = import_react.useState(() => {
		const previousState = previousRoot.getState();
		return create((set, get) => ({
			...previousState,
			scene: container,
			raycaster,
			pointer,
			mouse: pointer,
			previousRoot,
			events: {
				...previousState.events,
				...events
			},
			size: {
				...previousState.size,
				...size
			},
			...rest,
			set,
			get,
			setEvents: (events$1) => set((state$1) => ({
				...state$1,
				events: {
					...state$1.events,
					...events$1
				}
			}))
		}));
	});
	import_react.useEffect(() => {
		const unsub = previousRoot.subscribe((prev) => usePortalStore.setState((state$1) => inject(prev, state$1)));
		return () => {
			unsub();
		};
	}, [inject]);
	import_react.useEffect(() => {
		usePortalStore.setState((injectState) => inject(previousRoot.getState(), injectState));
	}, [inject]);
	import_react.useEffect(() => {
		return () => {
			usePortalStore.destroy();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: reconciler.createPortal(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(context.Provider, {
		value: usePortalStore,
		children
	}), usePortalStore, null) });
}
reconciler.injectIntoDevTools({
	bundleType: 0,
	rendererPackageName: "@react-three/fiber",
	version: "18.3.1"
});
import_react.unstable_act;
var DOM_EVENTS = {
	onClick: ["click", false],
	onContextMenu: ["contextmenu", false],
	onDoubleClick: ["dblclick", false],
	onWheel: ["wheel", true],
	onPointerDown: ["pointerdown", true],
	onPointerUp: ["pointerup", true],
	onPointerLeave: ["pointerleave", true],
	onPointerMove: ["pointermove", true],
	onPointerCancel: ["pointercancel", true],
	onLostPointerCapture: ["lostpointercapture", true]
};
function createPointerEvents(store) {
	const { handlePointer } = createEvents(store);
	return {
		priority: 1,
		enabled: true,
		compute(event, state, previous) {
			state.pointer.set(event.offsetX / state.size.width * 2 - 1, -(event.offsetY / state.size.height) * 2 + 1);
			state.raycaster.setFromCamera(state.pointer, state.camera);
		},
		connected: void 0,
		handlers: Object.keys(DOM_EVENTS).reduce((acc, key) => ({
			...acc,
			[key]: handlePointer(key)
		}), {}),
		update: () => {
			var _internal$lastEvent;
			const { events, internal } = store.getState();
			if ((_internal$lastEvent = internal.lastEvent) != null && _internal$lastEvent.current && events.handlers) events.handlers.onPointerMove(internal.lastEvent.current);
		},
		connect: (target) => {
			var _events$handlers;
			const { set, events } = store.getState();
			events.disconnect == null || events.disconnect();
			set((state) => ({ events: {
				...state.events,
				connected: target
			} }));
			Object.entries((_events$handlers = events.handlers) != null ? _events$handlers : []).forEach(([name, event]) => {
				const [eventName, passive] = DOM_EVENTS[name];
				target.addEventListener(eventName, event, { passive });
			});
		},
		disconnect: () => {
			const { set, events } = store.getState();
			if (events.connected) {
				var _events$handlers2;
				Object.entries((_events$handlers2 = events.handlers) != null ? _events$handlers2 : []).forEach(([name, event]) => {
					if (events && events.connected instanceof HTMLElement) {
						const [eventName] = DOM_EVENTS[name];
						events.connected.removeEventListener(eventName, event);
					}
				});
				set((state) => ({ events: {
					...state.events,
					connected: void 0
				} }));
			}
		}
	};
}
function g(n, t$2) {
	let o;
	return (...i$1) => {
		window.clearTimeout(o), o = window.setTimeout(() => n(...i$1), t$2);
	};
}
function j({ debounce: n, scroll: t$2, polyfill: o, offsetSize: i$1 } = {
	debounce: 0,
	scroll: !1,
	offsetSize: !1
}) {
	const a = o || (typeof window == "undefined" ? class {} : window.ResizeObserver);
	if (!a) throw new Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");
	const [c, h$2] = (0, import_react.useState)({
		left: 0,
		top: 0,
		width: 0,
		height: 0,
		bottom: 0,
		right: 0,
		x: 0,
		y: 0
	}), e = (0, import_react.useRef)({
		element: null,
		scrollContainers: null,
		resizeObserver: null,
		lastBounds: c,
		orientationHandler: null
	}), d = n ? typeof n == "number" ? n : n.scroll : null, f$2 = n ? typeof n == "number" ? n : n.resize : null, w = (0, import_react.useRef)(!1);
	(0, import_react.useEffect)(() => (w.current = !0, () => void (w.current = !1)));
	const [z$2, m, s] = (0, import_react.useMemo)(() => {
		const r$2 = () => {
			if (!e.current.element) return;
			const { left: y$2, top: C, width: H$2, height: O$2, bottom: S$2, right: x, x: B$2, y: R$2 } = e.current.element.getBoundingClientRect(), l$2 = {
				left: y$2,
				top: C,
				width: H$2,
				height: O$2,
				bottom: S$2,
				right: x,
				x: B$2,
				y: R$2
			};
			e.current.element instanceof HTMLElement && i$1 && (l$2.height = e.current.element.offsetHeight, l$2.width = e.current.element.offsetWidth), Object.freeze(l$2), w.current && !D(e.current.lastBounds, l$2) && h$2(e.current.lastBounds = l$2);
		};
		return [
			r$2,
			f$2 ? g(r$2, f$2) : r$2,
			d ? g(r$2, d) : r$2
		];
	}, [
		h$2,
		i$1,
		d,
		f$2
	]);
	function v$2() {
		e.current.scrollContainers && (e.current.scrollContainers.forEach((r$2) => r$2.removeEventListener("scroll", s, !0)), e.current.scrollContainers = null), e.current.resizeObserver && (e.current.resizeObserver.disconnect(), e.current.resizeObserver = null), e.current.orientationHandler && ("orientation" in screen && "removeEventListener" in screen.orientation ? screen.orientation.removeEventListener("change", e.current.orientationHandler) : "onorientationchange" in window && window.removeEventListener("orientationchange", e.current.orientationHandler));
	}
	function b() {
		e.current.element && (e.current.resizeObserver = new a(s), e.current.resizeObserver.observe(e.current.element), t$2 && e.current.scrollContainers && e.current.scrollContainers.forEach((r$2) => r$2.addEventListener("scroll", s, {
			capture: !0,
			passive: !0
		})), e.current.orientationHandler = () => {
			s();
		}, "orientation" in screen && "addEventListener" in screen.orientation ? screen.orientation.addEventListener("change", e.current.orientationHandler) : "onorientationchange" in window && window.addEventListener("orientationchange", e.current.orientationHandler));
	}
	const L$2 = (r$2) => {
		!r$2 || r$2 === e.current.element || (v$2(), e.current.element = r$2, e.current.scrollContainers = E(r$2), b());
	};
	return X(s, !!t$2), W(m), (0, import_react.useEffect)(() => {
		v$2(), b();
	}, [
		t$2,
		s,
		m
	]), (0, import_react.useEffect)(() => v$2, []), [
		L$2,
		c,
		z$2
	];
}
function W(n) {
	(0, import_react.useEffect)(() => {
		const t$2 = n;
		return window.addEventListener("resize", t$2), () => void window.removeEventListener("resize", t$2);
	}, [n]);
}
function X(n, t$2) {
	(0, import_react.useEffect)(() => {
		if (t$2) {
			const o = n;
			return window.addEventListener("scroll", o, {
				capture: !0,
				passive: !0
			}), () => void window.removeEventListener("scroll", o, !0);
		}
	}, [n, t$2]);
}
function E(n) {
	const t$2 = [];
	if (!n || n === document.body) return t$2;
	const { overflow: o, overflowX: i$1, overflowY: a } = window.getComputedStyle(n);
	return [
		o,
		i$1,
		a
	].some((c) => c === "auto" || c === "scroll") && t$2.push(n), [...t$2, ...E(n.parentElement)];
}
var k = [
	"x",
	"y",
	"top",
	"bottom",
	"left",
	"right",
	"width",
	"height"
], D = (n, t$2) => k.every((o) => n[o] === t$2[o]);
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __spreadValues = (a, b) => {
	for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
	if (__getOwnPropSymbols) {
		for (var prop of __getOwnPropSymbols(b)) if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
	}
	return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var _a, _b;
typeof window !== "undefined" && (((_a = window.document) == null ? void 0 : _a.createElement) || ((_b = window.navigator) == null ? void 0 : _b.product) === "ReactNative") ? import_react.useLayoutEffect : import_react.useEffect;
function traverseFiber(fiber, ascending, selector) {
	if (!fiber) return;
	if (selector(fiber) === true) return fiber;
	let child = ascending ? fiber.return : fiber.child;
	while (child) {
		const match = traverseFiber(child, ascending, selector);
		if (match) return match;
		child = ascending ? null : child.sibling;
	}
}
function wrapContext(context$1) {
	try {
		return Object.defineProperties(context$1, {
			_currentRenderer: {
				get() {
					return null;
				},
				set() {}
			},
			_currentRenderer2: {
				get() {
					return null;
				},
				set() {}
			}
		});
	} catch (_) {
		return context$1;
	}
}
var error = console.error;
console.error = function() {
	const message = [...arguments].join("");
	if ((message == null ? void 0 : message.startsWith("Warning:")) && message.includes("useContext")) {
		console.error = error;
		return;
	}
	return error.apply(this, arguments);
};
var FiberContext = wrapContext(import_react.createContext(null));
var FiberProvider = class extends import_react.Component {
	render() {
		return /* @__PURE__ */ import_react.createElement(FiberContext.Provider, { value: this._reactInternals }, this.props.children);
	}
};
function useFiber() {
	const root = import_react.useContext(FiberContext);
	if (root === null) throw new Error("its-fine: useFiber must be called within a <FiberProvider />!");
	const id = import_react.useId();
	return import_react.useMemo(() => {
		for (const maybeFiber of [root, root == null ? void 0 : root.alternate]) {
			if (!maybeFiber) continue;
			const fiber2 = traverseFiber(maybeFiber, false, (node) => {
				let state = node.memoizedState;
				while (state) {
					if (state.memoizedState === id) return true;
					state = state.next;
				}
			});
			if (fiber2) return fiber2;
		}
	}, [root, id]);
}
function useContextMap() {
	const fiber = useFiber();
	const [contextMap] = import_react.useState(() => /* @__PURE__ */ new Map());
	contextMap.clear();
	let node = fiber;
	while (node) {
		if (node.type && typeof node.type === "object") {
			const context$1 = node.type._context === void 0 && node.type.Provider === node.type ? node.type : node.type._context;
			if (context$1 && context$1 !== FiberContext && !contextMap.has(context$1)) contextMap.set(context$1, import_react.useContext(wrapContext(context$1)));
		}
		node = node.return;
	}
	return contextMap;
}
function useContextBridge() {
	const contextMap = useContextMap();
	return import_react.useMemo(() => Array.from(contextMap.keys()).reduce((Prev, context$1) => (props) => /* @__PURE__ */ import_react.createElement(Prev, null, /* @__PURE__ */ import_react.createElement(context$1.Provider, __spreadProps(__spreadValues({}, props), { value: contextMap.get(context$1) }))), (props) => /* @__PURE__ */ import_react.createElement(FiberProvider, __spreadValues({}, props))), [contextMap]);
}
require_constants();
require_react_reconciler();
require_scheduler();
var CanvasImpl = /* @__PURE__ */ import_react.forwardRef(function Canvas$1({ children, fallback, resize, style, gl, events = createPointerEvents, eventSource, eventPrefix, shadows, linear, flat, legacy, orthographic, frameloop, dpr, performance: performance$1, raycaster, camera, scene, onPointerMissed, onCreated, ...props }, forwardedRef) {
	import_react.useMemo(() => extend(three_module_exports), []);
	const Bridge = useContextBridge();
	const [containerRef, containerRect] = j({
		scroll: true,
		debounce: {
			scroll: 50,
			resize: 0
		},
		...resize
	});
	const canvasRef = import_react.useRef(null);
	const divRef = import_react.useRef(null);
	import_react.useImperativeHandle(forwardedRef, () => canvasRef.current);
	const handlePointerMissed = useMutableCallback(onPointerMissed);
	const [block, setBlock] = import_react.useState(false);
	const [error$1, setError] = import_react.useState(false);
	if (block) throw block;
	if (error$1) throw error$1;
	const root = import_react.useRef(null);
	useIsomorphicLayoutEffect(() => {
		const canvas = canvasRef.current;
		if (containerRect.width > 0 && containerRect.height > 0 && canvas) {
			if (!root.current) root.current = createRoot(canvas);
			root.current.configure({
				gl,
				events,
				shadows,
				linear,
				flat,
				legacy,
				orthographic,
				frameloop,
				dpr,
				performance: performance$1,
				raycaster,
				camera,
				scene,
				size: containerRect,
				onPointerMissed: (...args) => handlePointerMissed.current == null ? void 0 : handlePointerMissed.current(...args),
				onCreated: (state) => {
					state.events.connect == null || state.events.connect(eventSource ? isRef(eventSource) ? eventSource.current : eventSource : divRef.current);
					if (eventPrefix) state.setEvents({ compute: (event, state$1) => {
						const x = event[eventPrefix + "X"];
						const y$2 = event[eventPrefix + "Y"];
						state$1.pointer.set(x / state$1.size.width * 2 - 1, -(y$2 / state$1.size.height) * 2 + 1);
						state$1.raycaster.setFromCamera(state$1.pointer, state$1.camera);
					} });
					onCreated?.(state);
				}
			});
			root.current.render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bridge, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, {
				set: setError,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, { set: setBlock }),
					children: children != null ? children : null
				})
			}) }));
		}
	});
	import_react.useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) return () => unmountComponentAtNode(canvas);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: divRef,
		style: {
			position: "relative",
			width: "100%",
			height: "100%",
			overflow: "hidden",
			pointerEvents: eventSource ? "none" : "auto",
			...style
		},
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: containerRef,
			style: {
				width: "100%",
				height: "100%"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				style: { display: "block" },
				children: fallback
			})
		})
	});
});
var Canvas = /* @__PURE__ */ import_react.forwardRef(function CanvasWrapper(props, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiberProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanvasImpl, {
		...props,
		ref
	}) });
});
export { useFrame as a, extend as i, applyProps as n, useLoader as o, createPortal as r, useThree as s, Canvas as t };
