const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WikiGraph3D-BBfVW1Tr.js","assets/index-BOzhgzD7.js","assets/index-CA6QM4ps.css","assets/extends-rAidceeD.js","assets/wikiGraph-DRDUqbgx.js","assets/ordinal-BcDMmRjO.js","assets/three.module-CsntsSp5.js"])))=>i.map(i=>d[i]);
import { t as LocateFixed } from "./locate-fixed-3-Tbi-pC.js";
import { Bc as require_jsx_runtime, Ln as cn, Oc as useQuery, W as useGraphDimension, Xc as require_react, cc as __vitePreload, di as Square, ja as useThemeValue, na as createLucideIcon, oc as useT, sc as useUiLanguage, tl as __toESM, wc as useEventStore } from "./index-BOzhgzD7.js";
import { A as pointer_default, C as Tween, D as now, E as Timer, F as selectorAll_default, I as selector_default, L as namespace_default, M as selection_default, N as styleValue, O as timer, P as matcher_default, R as index, S as Group, T as isObject_default, _ as index$3, a as endpointId, b as index$1, c as nodeSizeScore, d as Paired_default, f as radial_default, g as center_default, h as link_default, i as edgeDetails, j as select_default, k as dispatch_default, l as sizeChanged, m as simulation_default, n as NODE_COLOUR, o as escapeTooltipText, p as manyBody_default, r as clampCenterToView, s as nodeDetails, u as toGraphData, v as tinycolor, w as debounce_default, x as Easing, y as index$2, z as require_prop_types } from "./wikiGraph-DRDUqbgx.js";
import { a as color, n as number_default, r as rgb_default, t as string_default } from "./string-ByKlHLQg.js";
import { a as min, n as ordinal, o as max } from "./ordinal-BcDMmRjO.js";
import { _ as uniqueEdges, a as cleanTitle, c as groupOfKind, g as traceKindShape, i as WIKI_GROUPS, l as isHollowShape, n as GROUP_LABEL_KEY, r as GROUP_SHAPE, s as degreeOf, t as KindGlyph } from "./KindGlyph-BCcFbsIV.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Box = createLucideIcon("Box", [
	["path", {
		d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
		key: "hh9hay"
	}],
	["path", {
		d: "m3.3 7 8.7 5 8.7-5",
		key: "g66t2b"
	}],
	["path", {
		d: "M12 22V12",
		key: "d0xqtd"
	}]
]);
const nonpassive = { passive: false };
const nonpassivecapture = {
	capture: true,
	passive: false
};
function nopropagation$1(event) {
	event.stopImmediatePropagation();
}
function noevent_default$1(event) {
	event.preventDefault();
	event.stopImmediatePropagation();
}
function nodrag_default(view) {
	var root = view.document.documentElement, selection = select_default(view).on("dragstart.drag", noevent_default$1, nonpassivecapture);
	if ("onselectstart" in root) selection.on("selectstart.drag", noevent_default$1, nonpassivecapture);
	else {
		root.__noselect = root.style.MozUserSelect;
		root.style.MozUserSelect = "none";
	}
}
function yesdrag(view, noclick) {
	var root = view.document.documentElement, selection = select_default(view).on("dragstart.drag", null);
	if (noclick) {
		selection.on("click.drag", noevent_default$1, nonpassivecapture);
		setTimeout(function() {
			selection.on("click.drag", null);
		}, 0);
	}
	if ("onselectstart" in root) selection.on("selectstart.drag", null);
	else {
		root.style.MozUserSelect = root.__noselect;
		delete root.__noselect;
	}
}
var constant_default$1 = (x) => () => x;
function DragEvent(type, { sourceEvent, subject, target, identifier, active, x, y, dx, dy, dispatch }) {
	Object.defineProperties(this, {
		type: {
			value: type,
			enumerable: true,
			configurable: true
		},
		sourceEvent: {
			value: sourceEvent,
			enumerable: true,
			configurable: true
		},
		subject: {
			value: subject,
			enumerable: true,
			configurable: true
		},
		target: {
			value: target,
			enumerable: true,
			configurable: true
		},
		identifier: {
			value: identifier,
			enumerable: true,
			configurable: true
		},
		active: {
			value: active,
			enumerable: true,
			configurable: true
		},
		x: {
			value: x,
			enumerable: true,
			configurable: true
		},
		y: {
			value: y,
			enumerable: true,
			configurable: true
		},
		dx: {
			value: dx,
			enumerable: true,
			configurable: true
		},
		dy: {
			value: dy,
			enumerable: true,
			configurable: true
		},
		_: { value: dispatch }
	});
}
DragEvent.prototype.on = function() {
	var value = this._.on.apply(this._, arguments);
	return value === this._ ? this : value;
};
function defaultFilter$1(event) {
	return !event.ctrlKey && !event.button;
}
function defaultContainer() {
	return this.parentNode;
}
function defaultSubject(event, d) {
	return d == null ? {
		x: event.x,
		y: event.y
	} : d;
}
function defaultTouchable$1() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function drag_default() {
	var filter = defaultFilter$1, container = defaultContainer, subject = defaultSubject, touchable = defaultTouchable$1, gestures = {}, listeners = dispatch_default("start", "drag", "end"), active = 0, mousedownx, mousedowny, mousemoving, touchending, clickDistance2 = 0;
	function drag(selection) {
		selection.on("mousedown.drag", mousedowned).filter(touchable).on("touchstart.drag", touchstarted).on("touchmove.drag", touchmoved, nonpassive).on("touchend.drag touchcancel.drag", touchended).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	function mousedowned(event, d) {
		if (touchending || !filter.call(this, event, d)) return;
		var gesture = beforestart(this, container.call(this, event, d), event, d, "mouse");
		if (!gesture) return;
		select_default(event.view).on("mousemove.drag", mousemoved, nonpassivecapture).on("mouseup.drag", mouseupped, nonpassivecapture);
		nodrag_default(event.view);
		nopropagation$1(event);
		mousemoving = false;
		mousedownx = event.clientX;
		mousedowny = event.clientY;
		gesture("start", event);
	}
	function mousemoved(event) {
		noevent_default$1(event);
		if (!mousemoving) {
			var dx = event.clientX - mousedownx, dy = event.clientY - mousedowny;
			mousemoving = dx * dx + dy * dy > clickDistance2;
		}
		gestures.mouse("drag", event);
	}
	function mouseupped(event) {
		select_default(event.view).on("mousemove.drag mouseup.drag", null);
		yesdrag(event.view, mousemoving);
		noevent_default$1(event);
		gestures.mouse("end", event);
	}
	function touchstarted(event, d) {
		if (!filter.call(this, event, d)) return;
		var touches = event.changedTouches, c = container.call(this, event, d), n = touches.length, i, gesture;
		for (i = 0; i < n; ++i) if (gesture = beforestart(this, c, event, d, touches[i].identifier, touches[i])) {
			nopropagation$1(event);
			gesture("start", event, touches[i]);
		}
	}
	function touchmoved(event) {
		var touches = event.changedTouches, n = touches.length, i, gesture;
		for (i = 0; i < n; ++i) if (gesture = gestures[touches[i].identifier]) {
			noevent_default$1(event);
			gesture("drag", event, touches[i]);
		}
	}
	function touchended(event) {
		var touches = event.changedTouches, n = touches.length, i, gesture;
		if (touchending) clearTimeout(touchending);
		touchending = setTimeout(function() {
			touchending = null;
		}, 500);
		for (i = 0; i < n; ++i) if (gesture = gestures[touches[i].identifier]) {
			nopropagation$1(event);
			gesture("end", event, touches[i]);
		}
	}
	function beforestart(that, container$1, event, d, identifier, touch) {
		var dispatch = listeners.copy(), p = pointer_default(touch || event, container$1), dx, dy, s;
		if ((s = subject.call(that, new DragEvent("beforestart", {
			sourceEvent: event,
			target: drag,
			identifier,
			active,
			x: p[0],
			y: p[1],
			dx: 0,
			dy: 0,
			dispatch
		}), d)) == null) return;
		dx = s.x - p[0] || 0;
		dy = s.y - p[1] || 0;
		return function gesture(type, event$1, touch$1) {
			var p0 = p, n;
			switch (type) {
				case "start":
					gestures[identifier] = gesture, n = active++;
					break;
				case "end": delete gestures[identifier], --active;
				case "drag":
					p = pointer_default(touch$1 || event$1, container$1), n = active;
					break;
			}
			dispatch.call(type, that, new DragEvent(type, {
				sourceEvent: event$1,
				subject: s,
				target: drag,
				identifier,
				active: n,
				x: p[0] + dx,
				y: p[1] + dy,
				dx: p[0] - p0[0],
				dy: p[1] - p0[1],
				dispatch
			}), d);
		};
	}
	drag.filter = function(_) {
		return arguments.length ? (filter = typeof _ === "function" ? _ : constant_default$1(!!_), drag) : filter;
	};
	drag.container = function(_) {
		return arguments.length ? (container = typeof _ === "function" ? _ : constant_default$1(_), drag) : container;
	};
	drag.subject = function(_) {
		return arguments.length ? (subject = typeof _ === "function" ? _ : constant_default$1(_), drag) : subject;
	};
	drag.touchable = function(_) {
		return arguments.length ? (touchable = typeof _ === "function" ? _ : constant_default$1(!!_), drag) : touchable;
	};
	drag.on = function() {
		var value = listeners.on.apply(listeners, arguments);
		return value === listeners ? drag : value;
	};
	drag.clickDistance = function(_) {
		return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
	};
	return drag;
}
var degrees = 180 / Math.PI;
var identity$1 = {
	translateX: 0,
	translateY: 0,
	rotate: 0,
	skewX: 0,
	scaleX: 1,
	scaleY: 1
};
function decompose_default(a, b, c, d, e, f) {
	var scaleX, scaleY, skewX;
	if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
	if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
	if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
	if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
	return {
		translateX: e,
		translateY: f,
		rotate: Math.atan2(b, a) * degrees,
		skewX: Math.atan(skewX) * degrees,
		scaleX,
		scaleY
	};
}
var svgNode;
function parseCss(value) {
	const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
	return m.isIdentity ? identity$1 : decompose_default(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
	if (value == null) return identity$1;
	if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgNode.setAttribute("transform", value);
	if (!(value = svgNode.transform.baseVal.consolidate())) return identity$1;
	value = value.matrix;
	return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
}
function interpolateTransform(parse, pxComma, pxParen, degParen) {
	function pop(s) {
		return s.length ? s.pop() + " " : "";
	}
	function translate(xa, ya, xb, yb, s, q) {
		if (xa !== xb || ya !== yb) {
			var i = s.push("translate(", null, pxComma, null, pxParen);
			q.push({
				i: i - 4,
				x: number_default(xa, xb)
			}, {
				i: i - 2,
				x: number_default(ya, yb)
			});
		} else if (xb || yb) s.push("translate(" + xb + pxComma + yb + pxParen);
	}
	function rotate(a, b, s, q) {
		if (a !== b) {
			if (a - b > 180) b += 360;
			else if (b - a > 180) a += 360;
			q.push({
				i: s.push(pop(s) + "rotate(", null, degParen) - 2,
				x: number_default(a, b)
			});
		} else if (b) s.push(pop(s) + "rotate(" + b + degParen);
	}
	function skewX(a, b, s, q) {
		if (a !== b) q.push({
			i: s.push(pop(s) + "skewX(", null, degParen) - 2,
			x: number_default(a, b)
		});
		else if (b) s.push(pop(s) + "skewX(" + b + degParen);
	}
	function scale(xa, ya, xb, yb, s, q) {
		if (xa !== xb || ya !== yb) {
			var i = s.push(pop(s) + "scale(", null, ",", null, ")");
			q.push({
				i: i - 4,
				x: number_default(xa, xb)
			}, {
				i: i - 2,
				x: number_default(ya, yb)
			});
		} else if (xb !== 1 || yb !== 1) s.push(pop(s) + "scale(" + xb + "," + yb + ")");
	}
	return function(a, b) {
		var s = [], q = [];
		a = parse(a), b = parse(b);
		translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
		rotate(a.rotate, b.rotate, s, q);
		skewX(a.skewX, b.skewX, s, q);
		scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
		a = b = null;
		return function(t$1) {
			var i = -1, n = q.length, o;
			while (++i < n) s[(o = q[i]).i] = o.x(t$1);
			return s.join("");
		};
	};
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
var epsilon2 = 1e-12;
function cosh(x) {
	return ((x = Math.exp(x)) + 1 / x) / 2;
}
function sinh(x) {
	return ((x = Math.exp(x)) - 1 / x) / 2;
}
function tanh(x) {
	return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}
var zoom_default$1 = (function zoomRho(rho, rho2, rho4) {
	function zoom(p0, p1) {
		var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
		if (d2 < epsilon2) {
			S = Math.log(w1 / w0) / rho;
			i = function(t$1) {
				return [
					ux0 + t$1 * dx,
					uy0 + t$1 * dy,
					w0 * Math.exp(rho * t$1 * S)
				];
			};
		} else {
			var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0);
			S = (Math.log(Math.sqrt(b1 * b1 + 1) - b1) - r0) / rho;
			i = function(t$1) {
				var s = t$1 * S, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
				return [
					ux0 + u * dx,
					uy0 + u * dy,
					w0 * coshr0 / cosh(rho * s + r0)
				];
			};
		}
		i.duration = S * 1e3 * rho / Math.SQRT2;
		return i;
	}
	zoom.rho = function(_) {
		var _1 = Math.max(.001, +_), _2 = _1 * _1;
		return zoomRho(_1, _2, _2 * _2);
	};
	return zoom;
})(Math.SQRT2, 2, 4);
function timeout_default(callback, delay, time) {
	var t$1 = new Timer();
	delay = delay == null ? 0 : +delay;
	t$1.restart((elapsed) => {
		t$1.stop();
		callback(elapsed + delay);
	}, delay, time);
	return t$1;
}
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var emptyOn = dispatch_default("start", "end", "cancel", "interrupt");
var emptyTween = [];
function schedule_default(node, name, id$1, index$5, group, timing) {
	var schedules = node.__transition;
	if (!schedules) node.__transition = {};
	else if (id$1 in schedules) return;
	create(node, id$1, {
		name,
		index: index$5,
		group,
		on: emptyOn,
		tween: emptyTween,
		time: timing.time,
		delay: timing.delay,
		duration: timing.duration,
		ease: timing.ease,
		timer: null,
		state: 0
	});
}
function init(node, id$1) {
	var schedule = get(node, id$1);
	if (schedule.state > 0) throw new Error("too late; already scheduled");
	return schedule;
}
function set(node, id$1) {
	var schedule = get(node, id$1);
	if (schedule.state > 3) throw new Error("too late; already running");
	return schedule;
}
function get(node, id$1) {
	var schedule = node.__transition;
	if (!schedule || !(schedule = schedule[id$1])) throw new Error("transition not found");
	return schedule;
}
function create(node, id$1, self) {
	var schedules = node.__transition, tween;
	schedules[id$1] = self;
	self.timer = timer(schedule, 0, self.time);
	function schedule(elapsed) {
		self.state = 1;
		self.timer.restart(start$1, self.delay, self.time);
		if (self.delay <= elapsed) start$1(elapsed - self.delay);
	}
	function start$1(elapsed) {
		var i, j, n, o;
		if (self.state !== 1) return stop();
		for (i in schedules) {
			o = schedules[i];
			if (o.name !== self.name) continue;
			if (o.state === 3) return timeout_default(start$1);
			if (o.state === 4) {
				o.state = 6;
				o.timer.stop();
				o.on.call("interrupt", node, node.__data__, o.index, o.group);
				delete schedules[i];
			} else if (+i < id$1) {
				o.state = 6;
				o.timer.stop();
				o.on.call("cancel", node, node.__data__, o.index, o.group);
				delete schedules[i];
			}
		}
		timeout_default(function() {
			if (self.state === 3) {
				self.state = 4;
				self.timer.restart(tick, self.delay, self.time);
				tick(elapsed);
			}
		});
		self.state = 2;
		self.on.call("start", node, node.__data__, self.index, self.group);
		if (self.state !== 2) return;
		self.state = 3;
		tween = new Array(n = self.tween.length);
		for (i = 0, j = -1; i < n; ++i) if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) tween[++j] = o;
		tween.length = j + 1;
	}
	function tick(elapsed) {
		var t$1 = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = 5, 1), i = -1, n = tween.length;
		while (++i < n) tween[i].call(node, t$1);
		if (self.state === 5) {
			self.on.call("end", node, node.__data__, self.index, self.group);
			stop();
		}
	}
	function stop() {
		self.state = 6;
		self.timer.stop();
		delete schedules[id$1];
		for (var i in schedules) return;
		delete node.__transition;
	}
}
function interrupt_default(node, name) {
	var schedules = node.__transition, schedule, active, empty = true, i;
	if (!schedules) return;
	name = name == null ? null : name + "";
	for (i in schedules) {
		if ((schedule = schedules[i]).name !== name) {
			empty = false;
			continue;
		}
		active = schedule.state > 2 && schedule.state < 5;
		schedule.state = 6;
		schedule.timer.stop();
		schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
		delete schedules[i];
	}
	if (empty) delete node.__transition;
}
function interrupt_default$1(name) {
	return this.each(function() {
		interrupt_default(this, name);
	});
}
function tweenRemove(id$1, name) {
	var tween0, tween1;
	return function() {
		var schedule = set(this, id$1), tween = schedule.tween;
		if (tween !== tween0) {
			tween1 = tween0 = tween;
			for (var i = 0, n = tween1.length; i < n; ++i) if (tween1[i].name === name) {
				tween1 = tween1.slice();
				tween1.splice(i, 1);
				break;
			}
		}
		schedule.tween = tween1;
	};
}
function tweenFunction(id$1, name, value) {
	var tween0, tween1;
	if (typeof value !== "function") throw new Error();
	return function() {
		var schedule = set(this, id$1), tween = schedule.tween;
		if (tween !== tween0) {
			tween1 = (tween0 = tween).slice();
			for (var t$1 = {
				name,
				value
			}, i = 0, n = tween1.length; i < n; ++i) if (tween1[i].name === name) {
				tween1[i] = t$1;
				break;
			}
			if (i === n) tween1.push(t$1);
		}
		schedule.tween = tween1;
	};
}
function tween_default(name, value) {
	var id$1 = this._id;
	name += "";
	if (arguments.length < 2) {
		var tween = get(this.node(), id$1).tween;
		for (var i = 0, n = tween.length, t$1; i < n; ++i) if ((t$1 = tween[i]).name === name) return t$1.value;
		return null;
	}
	return this.each((value == null ? tweenRemove : tweenFunction)(id$1, name, value));
}
function tweenValue(transition$1, name, value) {
	var id$1 = transition$1._id;
	transition$1.each(function() {
		var schedule = set(this, id$1);
		(schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
	});
	return function(node) {
		return get(node, id$1).value[name];
	};
}
function interpolate_default(a, b) {
	var c;
	return (typeof b === "number" ? number_default : b instanceof color ? rgb_default : (c = color(b)) ? (b = c, rgb_default) : string_default)(a, b);
}
function attrRemove(name) {
	return function() {
		this.removeAttribute(name);
	};
}
function attrRemoveNS(fullname) {
	return function() {
		this.removeAttributeNS(fullname.space, fullname.local);
	};
}
function attrConstant(name, interpolate, value1) {
	var string00, string1 = value1 + "", interpolate0;
	return function() {
		var string0 = this.getAttribute(name);
		return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
	};
}
function attrConstantNS(fullname, interpolate, value1) {
	var string00, string1 = value1 + "", interpolate0;
	return function() {
		var string0 = this.getAttributeNS(fullname.space, fullname.local);
		return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
	};
}
function attrFunction(name, interpolate, value) {
	var string00, string10, interpolate0;
	return function() {
		var string0, value1 = value(this), string1;
		if (value1 == null) return void this.removeAttribute(name);
		string0 = this.getAttribute(name);
		string1 = value1 + "";
		return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
	};
}
function attrFunctionNS(fullname, interpolate, value) {
	var string00, string10, interpolate0;
	return function() {
		var string0, value1 = value(this), string1;
		if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
		string0 = this.getAttributeNS(fullname.space, fullname.local);
		string1 = value1 + "";
		return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
	};
}
function attr_default(name, value) {
	var fullname = namespace_default(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate_default;
	return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname) : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
}
function attrInterpolate(name, i) {
	return function(t$1) {
		this.setAttribute(name, i.call(this, t$1));
	};
}
function attrInterpolateNS(fullname, i) {
	return function(t$1) {
		this.setAttributeNS(fullname.space, fullname.local, i.call(this, t$1));
	};
}
function attrTweenNS(fullname, value) {
	var t0, i0;
	function tween() {
		var i = value.apply(this, arguments);
		if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
		return t0;
	}
	tween._value = value;
	return tween;
}
function attrTween(name, value) {
	var t0, i0;
	function tween() {
		var i = value.apply(this, arguments);
		if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
		return t0;
	}
	tween._value = value;
	return tween;
}
function attrTween_default(name, value) {
	var key = "attr." + name;
	if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	if (value == null) return this.tween(key, null);
	if (typeof value !== "function") throw new Error();
	var fullname = namespace_default(name);
	return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}
function delayFunction(id$1, value) {
	return function() {
		init(this, id$1).delay = +value.apply(this, arguments);
	};
}
function delayConstant(id$1, value) {
	return value = +value, function() {
		init(this, id$1).delay = value;
	};
}
function delay_default(value) {
	var id$1 = this._id;
	return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id$1, value)) : get(this.node(), id$1).delay;
}
function durationFunction(id$1, value) {
	return function() {
		set(this, id$1).duration = +value.apply(this, arguments);
	};
}
function durationConstant(id$1, value) {
	return value = +value, function() {
		set(this, id$1).duration = value;
	};
}
function duration_default(value) {
	var id$1 = this._id;
	return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id$1, value)) : get(this.node(), id$1).duration;
}
function easeConstant(id$1, value) {
	if (typeof value !== "function") throw new Error();
	return function() {
		set(this, id$1).ease = value;
	};
}
function ease_default(value) {
	var id$1 = this._id;
	return arguments.length ? this.each(easeConstant(id$1, value)) : get(this.node(), id$1).ease;
}
function easeVarying(id$1, value) {
	return function() {
		var v = value.apply(this, arguments);
		if (typeof v !== "function") throw new Error();
		set(this, id$1).ease = v;
	};
}
function easeVarying_default(value) {
	if (typeof value !== "function") throw new Error();
	return this.each(easeVarying(this._id, value));
}
function filter_default(match) {
	if (typeof match !== "function") match = matcher_default(match);
	for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) if ((node = group[i]) && match.call(node, node.__data__, i, group)) subgroup.push(node);
	return new Transition(subgroups, this._parents, this._name, this._id);
}
function merge_default(transition$1) {
	if (transition$1._id !== this._id) throw new Error();
	for (var groups0 = this._groups, groups1 = transition$1._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) if (node = group0[i] || group1[i]) merge[i] = node;
	for (; j < m0; ++j) merges[j] = groups0[j];
	return new Transition(merges, this._parents, this._name, this._id);
}
function start(name) {
	return (name + "").trim().split(/^|\s+/).every(function(t$1) {
		var i = t$1.indexOf(".");
		if (i >= 0) t$1 = t$1.slice(0, i);
		return !t$1 || t$1 === "start";
	});
}
function onFunction(id$1, name, listener) {
	var on0, on1, sit = start(name) ? init : set;
	return function() {
		var schedule = sit(this, id$1), on = schedule.on;
		if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
		schedule.on = on1;
	};
}
function on_default(name, listener) {
	var id$1 = this._id;
	return arguments.length < 2 ? get(this.node(), id$1).on.on(name) : this.each(onFunction(id$1, name, listener));
}
function removeFunction(id$1) {
	return function() {
		var parent = this.parentNode;
		for (var i in this.__transition) if (+i !== id$1) return;
		if (parent) parent.removeChild(this);
	};
}
function remove_default() {
	return this.on("end.remove", removeFunction(this._id));
}
function select_default$1(select) {
	var name = this._name, id$1 = this._id;
	if (typeof select !== "function") select = selector_default(select);
	for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
		if ("__data__" in node) subnode.__data__ = node.__data__;
		subgroup[i] = subnode;
		schedule_default(subgroup[i], name, id$1, i, subgroup, get(node, id$1));
	}
	return new Transition(subgroups, this._parents, name, id$1);
}
function selectAll_default(select) {
	var name = this._name, id$1 = this._id;
	if (typeof select !== "function") select = selectorAll_default(select);
	for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) if (node = group[i]) {
		for (var children = select.call(node, node.__data__, i, group), child, inherit$1 = get(node, id$1), k = 0, l = children.length; k < l; ++k) if (child = children[k]) schedule_default(child, name, id$1, k, children, inherit$1);
		subgroups.push(children);
		parents.push(node);
	}
	return new Transition(subgroups, parents, name, id$1);
}
var Selection = selection_default.prototype.constructor;
function selection_default$1() {
	return new Selection(this._groups, this._parents);
}
function styleNull(name, interpolate) {
	var string00, string10, interpolate0;
	return function() {
		var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
		return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
	};
}
function styleRemove(name) {
	return function() {
		this.style.removeProperty(name);
	};
}
function styleConstant(name, interpolate, value1) {
	var string00, string1 = value1 + "", interpolate0;
	return function() {
		var string0 = styleValue(this, name);
		return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
	};
}
function styleFunction(name, interpolate, value) {
	var string00, string10, interpolate0;
	return function() {
		var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
		if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
		return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
	};
}
function styleMaybeRemove(id$1, name) {
	var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
	return function() {
		var schedule = set(this, id$1), on = schedule.on, listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : void 0;
		if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);
		schedule.on = on1;
	};
}
function style_default(name, value, priority) {
	var i = (name += "") === "transform" ? interpolateTransformCss : interpolate_default;
	return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove(name)) : typeof value === "function" ? this.styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant(name, i, value), priority).on("end.style." + name, null);
}
function styleInterpolate(name, i, priority) {
	return function(t$1) {
		this.style.setProperty(name, i.call(this, t$1), priority);
	};
}
function styleTween(name, value, priority) {
	var t$1, i0;
	function tween() {
		var i = value.apply(this, arguments);
		if (i !== i0) t$1 = (i0 = i) && styleInterpolate(name, i, priority);
		return t$1;
	}
	tween._value = value;
	return tween;
}
function styleTween_default(name, value, priority) {
	var key = "style." + (name += "");
	if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	if (value == null) return this.tween(key, null);
	if (typeof value !== "function") throw new Error();
	return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}
function textConstant(value) {
	return function() {
		this.textContent = value;
	};
}
function textFunction(value) {
	return function() {
		var value1 = value(this);
		this.textContent = value1 == null ? "" : value1;
	};
}
function text_default(value) {
	return this.tween("text", typeof value === "function" ? textFunction(tweenValue(this, "text", value)) : textConstant(value == null ? "" : value + ""));
}
function textInterpolate(i) {
	return function(t$1) {
		this.textContent = i.call(this, t$1);
	};
}
function textTween(value) {
	var t0, i0;
	function tween() {
		var i = value.apply(this, arguments);
		if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
		return t0;
	}
	tween._value = value;
	return tween;
}
function textTween_default(value) {
	var key = "text";
	if (arguments.length < 1) return (key = this.tween(key)) && key._value;
	if (value == null) return this.tween(key, null);
	if (typeof value !== "function") throw new Error();
	return this.tween(key, textTween(value));
}
function transition_default$1() {
	var name = this._name, id0 = this._id, id1 = newId();
	for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) if (node = group[i]) {
		var inherit$1 = get(node, id0);
		schedule_default(node, name, id1, i, group, {
			time: inherit$1.time + inherit$1.delay + inherit$1.duration,
			delay: 0,
			duration: inherit$1.duration,
			ease: inherit$1.ease
		});
	}
	return new Transition(groups, this._parents, name, id1);
}
function end_default() {
	var on0, on1, that = this, id$1 = that._id, size = that.size();
	return new Promise(function(resolve, reject) {
		var cancel = { value: reject }, end = { value: function() {
			if (--size === 0) resolve();
		} };
		that.each(function() {
			var schedule = set(this, id$1), on = schedule.on;
			if (on !== on0) {
				on1 = (on0 = on).copy();
				on1._.cancel.push(cancel);
				on1._.interrupt.push(cancel);
				on1._.end.push(end);
			}
			schedule.on = on1;
		});
		if (size === 0) resolve();
	});
}
var id = 0;
function Transition(groups, parents, name, id$1) {
	this._groups = groups;
	this._parents = parents;
	this._name = name;
	this._id = id$1;
}
function transition(name) {
	return selection_default().transition(name);
}
function newId() {
	return ++id;
}
var selection_prototype = selection_default.prototype;
Transition.prototype = transition.prototype = {
	constructor: Transition,
	select: select_default$1,
	selectAll: selectAll_default,
	selectChild: selection_prototype.selectChild,
	selectChildren: selection_prototype.selectChildren,
	filter: filter_default,
	merge: merge_default,
	selection: selection_default$1,
	transition: transition_default$1,
	call: selection_prototype.call,
	nodes: selection_prototype.nodes,
	node: selection_prototype.node,
	size: selection_prototype.size,
	empty: selection_prototype.empty,
	each: selection_prototype.each,
	on: on_default,
	attr: attr_default,
	attrTween: attrTween_default,
	style: style_default,
	styleTween: styleTween_default,
	text: text_default,
	textTween: textTween_default,
	remove: remove_default,
	tween: tween_default,
	delay: delay_default,
	duration: duration_default,
	ease: ease_default,
	easeVarying: easeVarying_default,
	end: end_default,
	[Symbol.iterator]: selection_prototype[Symbol.iterator]
};
function cubicInOut(t$1) {
	return ((t$1 *= 2) <= 1 ? t$1 * t$1 * t$1 : (t$1 -= 2) * t$1 * t$1 + 2) / 2;
}
var defaultTiming = {
	time: null,
	delay: 0,
	duration: 250,
	ease: cubicInOut
};
function inherit(node, id$1) {
	var timing;
	while (!(timing = node.__transition) || !(timing = timing[id$1])) if (!(node = node.parentNode)) throw new Error(`transition ${id$1} not found`);
	return timing;
}
function transition_default(name) {
	var id$1, timing;
	if (name instanceof Transition) id$1 = name._id, name = name._name;
	else id$1 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
	for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) if (node = group[i]) schedule_default(node, name, id$1, i, group, timing || inherit(node, id$1));
	return new Transition(groups, this._parents, name, id$1);
}
selection_default.prototype.interrupt = interrupt_default$1;
selection_default.prototype.transition = transition_default;
var constant_default = (x) => () => x;
function ZoomEvent(type, { sourceEvent, target, transform: transform$1, dispatch }) {
	Object.defineProperties(this, {
		type: {
			value: type,
			enumerable: true,
			configurable: true
		},
		sourceEvent: {
			value: sourceEvent,
			enumerable: true,
			configurable: true
		},
		target: {
			value: target,
			enumerable: true,
			configurable: true
		},
		transform: {
			value: transform$1,
			enumerable: true,
			configurable: true
		},
		_: { value: dispatch }
	});
}
function Transform(k, x, y) {
	this.k = k;
	this.x = x;
	this.y = y;
}
Transform.prototype = {
	constructor: Transform,
	scale: function(k) {
		return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
	},
	translate: function(x, y) {
		return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
	},
	apply: function(point) {
		return [point[0] * this.k + this.x, point[1] * this.k + this.y];
	},
	applyX: function(x) {
		return x * this.k + this.x;
	},
	applyY: function(y) {
		return y * this.k + this.y;
	},
	invert: function(location) {
		return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
	},
	invertX: function(x) {
		return (x - this.x) / this.k;
	},
	invertY: function(y) {
		return (y - this.y) / this.k;
	},
	rescaleX: function(x) {
		return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
	},
	rescaleY: function(y) {
		return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
	},
	toString: function() {
		return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
	}
};
var identity = new Transform(1, 0, 0);
transform.prototype = Transform.prototype;
function transform(node) {
	while (!node.__zoom) if (!(node = node.parentNode)) return identity;
	return node.__zoom;
}
function nopropagation(event) {
	event.stopImmediatePropagation();
}
function noevent_default(event) {
	event.preventDefault();
	event.stopImmediatePropagation();
}
function defaultFilter(event) {
	return (!event.ctrlKey || event.type === "wheel") && !event.button;
}
function defaultExtent() {
	var e = this;
	if (e instanceof SVGElement) {
		e = e.ownerSVGElement || e;
		if (e.hasAttribute("viewBox")) {
			e = e.viewBox.baseVal;
			return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
		}
		return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
	}
	return [[0, 0], [e.clientWidth, e.clientHeight]];
}
function defaultTransform() {
	return this.__zoom || identity;
}
function defaultWheelDelta(event) {
	return -event.deltaY * (event.deltaMode === 1 ? .05 : event.deltaMode ? 1 : .002) * (event.ctrlKey ? 10 : 1);
}
function defaultTouchable() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function defaultConstrain(transform$1, extent, translateExtent) {
	var dx0 = transform$1.invertX(extent[0][0]) - translateExtent[0][0], dx1 = transform$1.invertX(extent[1][0]) - translateExtent[1][0], dy0 = transform$1.invertY(extent[0][1]) - translateExtent[0][1], dy1 = transform$1.invertY(extent[1][1]) - translateExtent[1][1];
	return transform$1.translate(dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1), dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1));
}
function zoom_default() {
	var filter = defaultFilter, extent = defaultExtent, constrain = defaultConstrain, wheelDelta = defaultWheelDelta, touchable = defaultTouchable, scaleExtent = [0, Infinity], translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]], duration = 250, interpolate = zoom_default$1, listeners = dispatch_default("start", "zoom", "end"), touchstarting, touchfirst, touchending, touchDelay = 500, wheelDelay = 150, clickDistance2 = 0, tapDistance = 10;
	function zoom(selection) {
		selection.property("__zoom", defaultTransform).on("wheel.zoom", wheeled, { passive: false }).on("mousedown.zoom", mousedowned).on("dblclick.zoom", dblclicked).filter(touchable).on("touchstart.zoom", touchstarted).on("touchmove.zoom", touchmoved).on("touchend.zoom touchcancel.zoom", touchended).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	zoom.transform = function(collection, transform$1, point, event) {
		var selection = collection.selection ? collection.selection() : collection;
		selection.property("__zoom", defaultTransform);
		if (collection !== selection) schedule(collection, transform$1, point, event);
		else selection.interrupt().each(function() {
			gesture(this, arguments).event(event).start().zoom(null, typeof transform$1 === "function" ? transform$1.apply(this, arguments) : transform$1).end();
		});
	};
	zoom.scaleBy = function(selection, k, p, event) {
		zoom.scaleTo(selection, function() {
			return this.__zoom.k * (typeof k === "function" ? k.apply(this, arguments) : k);
		}, p, event);
	};
	zoom.scaleTo = function(selection, k, p, event) {
		zoom.transform(selection, function() {
			var e = extent.apply(this, arguments), t0 = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p, p1 = t0.invert(p0), k1 = typeof k === "function" ? k.apply(this, arguments) : k;
			return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
		}, p, event);
	};
	zoom.translateBy = function(selection, x, y, event) {
		zoom.transform(selection, function() {
			return constrain(this.__zoom.translate(typeof x === "function" ? x.apply(this, arguments) : x, typeof y === "function" ? y.apply(this, arguments) : y), extent.apply(this, arguments), translateExtent);
		}, null, event);
	};
	zoom.translateTo = function(selection, x, y, p, event) {
		zoom.transform(selection, function() {
			var e = extent.apply(this, arguments), t$1 = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
			return constrain(identity.translate(p0[0], p0[1]).scale(t$1.k).translate(typeof x === "function" ? -x.apply(this, arguments) : -x, typeof y === "function" ? -y.apply(this, arguments) : -y), e, translateExtent);
		}, p, event);
	};
	function scale(transform$1, k) {
		k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
		return k === transform$1.k ? transform$1 : new Transform(k, transform$1.x, transform$1.y);
	}
	function translate(transform$1, p0, p1) {
		var x = p0[0] - p1[0] * transform$1.k, y = p0[1] - p1[1] * transform$1.k;
		return x === transform$1.x && y === transform$1.y ? transform$1 : new Transform(transform$1.k, x, y);
	}
	function centroid(extent$1) {
		return [(+extent$1[0][0] + +extent$1[1][0]) / 2, (+extent$1[0][1] + +extent$1[1][1]) / 2];
	}
	function schedule(transition$1, transform$1, point, event) {
		transition$1.on("start.zoom", function() {
			gesture(this, arguments).event(event).start();
		}).on("interrupt.zoom end.zoom", function() {
			gesture(this, arguments).event(event).end();
		}).tween("zoom", function() {
			var that = this, args = arguments, g = gesture(that, args).event(event), e = extent.apply(that, args), p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point, w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]), a = that.__zoom, b = typeof transform$1 === "function" ? transform$1.apply(that, args) : transform$1, i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
			return function(t$1) {
				if (t$1 === 1) t$1 = b;
				else {
					var l = i(t$1), k = w / l[2];
					t$1 = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k);
				}
				g.zoom(null, t$1);
			};
		});
	}
	function gesture(that, args, clean) {
		return !clean && that.__zooming || new Gesture(that, args);
	}
	function Gesture(that, args) {
		this.that = that;
		this.args = args;
		this.active = 0;
		this.sourceEvent = null;
		this.extent = extent.apply(that, args);
		this.taps = 0;
	}
	Gesture.prototype = {
		event: function(event) {
			if (event) this.sourceEvent = event;
			return this;
		},
		start: function() {
			if (++this.active === 1) {
				this.that.__zooming = this;
				this.emit("start");
			}
			return this;
		},
		zoom: function(key, transform$1) {
			if (this.mouse && key !== "mouse") this.mouse[1] = transform$1.invert(this.mouse[0]);
			if (this.touch0 && key !== "touch") this.touch0[1] = transform$1.invert(this.touch0[0]);
			if (this.touch1 && key !== "touch") this.touch1[1] = transform$1.invert(this.touch1[0]);
			this.that.__zoom = transform$1;
			this.emit("zoom");
			return this;
		},
		end: function() {
			if (--this.active === 0) {
				delete this.that.__zooming;
				this.emit("end");
			}
			return this;
		},
		emit: function(type) {
			var d = select_default(this.that).datum();
			listeners.call(type, this.that, new ZoomEvent(type, {
				sourceEvent: this.sourceEvent,
				target: zoom,
				type,
				transform: this.that.__zoom,
				dispatch: listeners
			}), d);
		}
	};
	function wheeled(event, ...args) {
		if (!filter.apply(this, arguments)) return;
		var g = gesture(this, args).event(event), t$1 = this.__zoom, k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t$1.k * Math.pow(2, wheelDelta.apply(this, arguments)))), p = pointer_default(event);
		if (g.wheel) {
			if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) g.mouse[1] = t$1.invert(g.mouse[0] = p);
			clearTimeout(g.wheel);
		} else if (t$1.k === k) return;
		else {
			g.mouse = [p, t$1.invert(p)];
			interrupt_default(this);
			g.start();
		}
		noevent_default(event);
		g.wheel = setTimeout(wheelidled, wheelDelay);
		g.zoom("mouse", constrain(translate(scale(t$1, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));
		function wheelidled() {
			g.wheel = null;
			g.end();
		}
	}
	function mousedowned(event, ...args) {
		if (touchending || !filter.apply(this, arguments)) return;
		var currentTarget = event.currentTarget, g = gesture(this, args, true).event(event), v = select_default(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true), p = pointer_default(event, currentTarget), x0 = event.clientX, y0 = event.clientY;
		nodrag_default(event.view);
		nopropagation(event);
		g.mouse = [p, this.__zoom.invert(p)];
		interrupt_default(this);
		g.start();
		function mousemoved(event$1) {
			noevent_default(event$1);
			if (!g.moved) {
				var dx = event$1.clientX - x0, dy = event$1.clientY - y0;
				g.moved = dx * dx + dy * dy > clickDistance2;
			}
			g.event(event$1).zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer_default(event$1, currentTarget), g.mouse[1]), g.extent, translateExtent));
		}
		function mouseupped(event$1) {
			v.on("mousemove.zoom mouseup.zoom", null);
			yesdrag(event$1.view, g.moved);
			noevent_default(event$1);
			g.event(event$1).end();
		}
	}
	function dblclicked(event, ...args) {
		if (!filter.apply(this, arguments)) return;
		var t0 = this.__zoom, p0 = pointer_default(event.changedTouches ? event.changedTouches[0] : event, this), p1 = t0.invert(p0), k1 = t0.k * (event.shiftKey ? .5 : 2), t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);
		noevent_default(event);
		if (duration > 0) select_default(this).transition().duration(duration).call(schedule, t1, p0, event);
		else select_default(this).call(zoom.transform, t1, p0, event);
	}
	function touchstarted(event, ...args) {
		if (!filter.apply(this, arguments)) return;
		var touches = event.touches, n = touches.length, g = gesture(this, args, event.changedTouches.length === n).event(event), started, i, t$1, p;
		nopropagation(event);
		for (i = 0; i < n; ++i) {
			t$1 = touches[i], p = pointer_default(t$1, this);
			p = [
				p,
				this.__zoom.invert(p),
				t$1.identifier
			];
			if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
			else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
		}
		if (touchstarting) touchstarting = clearTimeout(touchstarting);
		if (started) {
			if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() {
				touchstarting = null;
			}, touchDelay);
			interrupt_default(this);
			g.start();
		}
	}
	function touchmoved(event, ...args) {
		if (!this.__zooming) return;
		var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t$1, p, l;
		noevent_default(event);
		for (i = 0; i < n; ++i) {
			t$1 = touches[i], p = pointer_default(t$1, this);
			if (g.touch0 && g.touch0[2] === t$1.identifier) g.touch0[0] = p;
			else if (g.touch1 && g.touch1[2] === t$1.identifier) g.touch1[0] = p;
		}
		t$1 = g.that.__zoom;
		if (g.touch1) {
			var p0 = g.touch0[0], l0 = g.touch0[1], p1 = g.touch1[0], l1 = g.touch1[1], dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp, dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
			t$1 = scale(t$1, Math.sqrt(dp / dl));
			p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
			l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
		} else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
		else return;
		g.zoom("touch", constrain(translate(t$1, p, l), g.extent, translateExtent));
	}
	function touchended(event, ...args) {
		if (!this.__zooming) return;
		var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t$1;
		nopropagation(event);
		if (touchending) clearTimeout(touchending);
		touchending = setTimeout(function() {
			touchending = null;
		}, touchDelay);
		for (i = 0; i < n; ++i) {
			t$1 = touches[i];
			if (g.touch0 && g.touch0[2] === t$1.identifier) delete g.touch0;
			else if (g.touch1 && g.touch1[2] === t$1.identifier) delete g.touch1;
		}
		if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
		if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
		else {
			g.end();
			if (g.taps === 2) {
				t$1 = pointer_default(t$1, this);
				if (Math.hypot(touchfirst[0] - t$1[0], touchfirst[1] - t$1[1]) < tapDistance) {
					var p = select_default(this).on("dblclick.zoom");
					if (p) p.apply(this, arguments);
				}
			}
		}
	}
	zoom.wheelDelta = function(_) {
		return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant_default(+_), zoom) : wheelDelta;
	};
	zoom.filter = function(_) {
		return arguments.length ? (filter = typeof _ === "function" ? _ : constant_default(!!_), zoom) : filter;
	};
	zoom.touchable = function(_) {
		return arguments.length ? (touchable = typeof _ === "function" ? _ : constant_default(!!_), zoom) : touchable;
	};
	zoom.extent = function(_) {
		return arguments.length ? (extent = typeof _ === "function" ? _ : constant_default([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
	};
	zoom.scaleExtent = function(_) {
		return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
	};
	zoom.translateExtent = function(_) {
		return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
	};
	zoom.constrain = function(_) {
		return arguments.length ? (constrain = _, zoom) : constrain;
	};
	zoom.duration = function(_) {
		return arguments.length ? (duration = +_, zoom) : duration;
	};
	zoom.interpolate = function(_) {
		return arguments.length ? (interpolate = _, zoom) : interpolate;
	};
	zoom.on = function() {
		var value = listeners.on.apply(listeners, arguments);
		return value === listeners ? zoom : value;
	};
	zoom.clickDistance = function(_) {
		return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
	};
	zoom.tapDistance = function(_) {
		return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
	};
	return zoom;
}
function sum(values, valueof) {
	let sum$1 = 0;
	if (valueof === void 0) {
		for (let value of values) if (value = +value) sum$1 += value;
	} else {
		let index$5 = -1;
		for (let value of values) if (value = +valueof(value, ++index$5, values)) sum$1 += value;
	}
	return sum$1;
}
var FUNC_ERROR_TEXT = "Expected a function";
function throttle(func, wait, options) {
	var leading = true, trailing = true;
	if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
	if (isObject_default(options)) {
		leading = "leading" in options ? !!options.leading : leading;
		trailing = "trailing" in options ? !!options.trailing : trailing;
	}
	return debounce_default(func, wait, {
		"leading": leading,
		"maxWait": wait,
		"trailing": trailing
	});
}
var throttle_default = throttle;
function _arrayLikeToArray$2(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
function _arrayWithoutHoles$2(r) {
	if (Array.isArray(r)) return _arrayLikeToArray$2(r);
}
function _assertClassBrand(e, t$1, n) {
	if ("function" == typeof e ? e === t$1 : e.has(t$1)) return arguments.length < 3 ? t$1 : n;
	throw new TypeError("Private element is not present on this object");
}
function _checkPrivateRedeclaration(e, t$1) {
	if (t$1.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function _classCallCheck(a, n) {
	if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _classPrivateFieldGet2(s, a) {
	return s.get(_assertClassBrand(s, a));
}
function _classPrivateFieldInitSpec(e, t$1, a) {
	_checkPrivateRedeclaration(e, t$1), t$1.set(e, a);
}
function _classPrivateFieldSet2(s, a, r) {
	return s.set(_assertClassBrand(s, a), r), r;
}
function _defineProperties(e, r) {
	for (var t$1 = 0; t$1 < r.length; t$1++) {
		var o = r[t$1];
		o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey$2(o.key), o);
	}
}
function _createClass(e, r, t$1) {
	return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", { writable: false }), e;
}
function _iterableToArray$2(r) {
	if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _nonIterableSpread$2() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray$2(r) {
	return _arrayWithoutHoles$2(r) || _iterableToArray$2(r) || _unsupportedIterableToArray$2(r) || _nonIterableSpread$2();
}
function _toPrimitive$2(t$1, r) {
	if ("object" != typeof t$1 || !t$1) return t$1;
	var e = t$1[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t$1, r);
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return String(t$1);
}
function _toPropertyKey$2(t$1) {
	var i = _toPrimitive$2(t$1, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray$2(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray$2(r, a);
		var t$1 = {}.toString.call(r).slice(8, -1);
		return "Object" === t$1 && r.constructor && (t$1 = r.constructor.name), "Map" === t$1 || "Set" === t$1 ? Array.from(r) : "Arguments" === t$1 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t$1) ? _arrayLikeToArray$2(r, a) : void 0;
	}
}
var ENTROPY = 123;
var int2HexColor = function int2HexColor$1(num) {
	return "#".concat(Math.min(num, Math.pow(2, 24)).toString(16).padStart(6, "0"));
};
var rgb2Int = function rgb2Int$1(r, g, b) {
	return (r << 16) + (g << 8) + b;
};
var colorStr2Int = function colorStr2Int$1(str) {
	var _tinyColor$toRgb = tinycolor(str).toRgb(), r = _tinyColor$toRgb.r, g = _tinyColor$toRgb.g, b = _tinyColor$toRgb.b;
	return rgb2Int(r, g, b);
};
var checksum = function checksum$1(n, csBits) {
	return n * ENTROPY % Math.pow(2, csBits);
};
var _registry = /* @__PURE__ */ new WeakMap();
var _csBits = /* @__PURE__ */ new WeakMap();
var _default = /* @__PURE__ */ function() {
	function _default$1() {
		var csBits = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 6;
		_classCallCheck(this, _default$1);
		_classPrivateFieldInitSpec(this, _registry, void 0);
		_classPrivateFieldInitSpec(this, _csBits, void 0);
		_classPrivateFieldSet2(_csBits, this, csBits);
		this.reset();
	}
	return _createClass(_default$1, [
		{
			key: "reset",
			value: function reset() {
				_classPrivateFieldSet2(_registry, this, ["__reserved for background__"]);
			}
		},
		{
			key: "register",
			value: function register(obj) {
				if (_classPrivateFieldGet2(_registry, this).length >= Math.pow(2, 24 - _classPrivateFieldGet2(_csBits, this))) return null;
				var idx = _classPrivateFieldGet2(_registry, this).length;
				var color$1 = int2HexColor(idx + (checksum(idx, _classPrivateFieldGet2(_csBits, this)) << 24 - _classPrivateFieldGet2(_csBits, this)));
				_classPrivateFieldGet2(_registry, this).push(obj);
				return color$1;
			}
		},
		{
			key: "lookup",
			value: function lookup(color$1) {
				if (!color$1) return null;
				var n = typeof color$1 === "string" ? colorStr2Int(color$1) : rgb2Int.apply(void 0, _toConsumableArray$2(color$1));
				if (!n) return null;
				var idx = n & Math.pow(2, 24 - _classPrivateFieldGet2(_csBits, this)) - 1;
				var cs = n >> 24 - _classPrivateFieldGet2(_csBits, this) & Math.pow(2, _classPrivateFieldGet2(_csBits, this)) - 1;
				if (checksum(idx, _classPrivateFieldGet2(_csBits, this)) !== cs || idx >= _classPrivateFieldGet2(_registry, this).length) return null;
				return _classPrivateFieldGet2(_registry, this)[idx];
			}
		}
	]);
}();
var { abs: abs$1, cos: cos$1, sin: sin$1, acos: acos$1, atan2, sqrt: sqrt$1, pow } = Math;
function crt(v) {
	return v < 0 ? -pow(-v, 1 / 3) : pow(v, 1 / 3);
}
var pi$1 = Math.PI, tau = 2 * pi$1, quart = pi$1 / 2, epsilon = 1e-6, nMax = Number.MAX_SAFE_INTEGER || 9007199254740991, nMin = Number.MIN_SAFE_INTEGER || -9007199254740991, ZERO = {
	x: 0,
	y: 0,
	z: 0
};
var utils = {
	Tvalues: [
		-.06405689286260563,
		.06405689286260563,
		-.1911188674736163,
		.1911188674736163,
		-.3150426796961634,
		.3150426796961634,
		-.4337935076260451,
		.4337935076260451,
		-.5454214713888396,
		.5454214713888396,
		-.6480936519369755,
		.6480936519369755,
		-.7401241915785544,
		.7401241915785544,
		-.820001985973903,
		.820001985973903,
		-.8864155270044011,
		.8864155270044011,
		-.9382745520027328,
		.9382745520027328,
		-.9747285559713095,
		.9747285559713095,
		-.9951872199970213,
		.9951872199970213
	],
	Cvalues: [
		.12793819534675216,
		.12793819534675216,
		.1258374563468283,
		.1258374563468283,
		.12167047292780339,
		.12167047292780339,
		.1155056680537256,
		.1155056680537256,
		.10744427011596563,
		.10744427011596563,
		.09761865210411388,
		.09761865210411388,
		.08619016153195327,
		.08619016153195327,
		.0733464814110803,
		.0733464814110803,
		.05929858491543678,
		.05929858491543678,
		.04427743881741981,
		.04427743881741981,
		.028531388628933663,
		.028531388628933663,
		.0123412297999872,
		.0123412297999872
	],
	arcfn: function(t$1, derivativeFn) {
		const d = derivativeFn(t$1);
		let l = d.x * d.x + d.y * d.y;
		if (typeof d.z !== "undefined") l += d.z * d.z;
		return sqrt$1(l);
	},
	compute: function(t$1, points, _3d) {
		if (t$1 === 0) {
			points[0].t = 0;
			return points[0];
		}
		const order = points.length - 1;
		if (t$1 === 1) {
			points[order].t = 1;
			return points[order];
		}
		const mt = 1 - t$1;
		let p = points;
		if (order === 0) {
			points[0].t = t$1;
			return points[0];
		}
		if (order === 1) {
			const ret = {
				x: mt * p[0].x + t$1 * p[1].x,
				y: mt * p[0].y + t$1 * p[1].y,
				t: t$1
			};
			if (_3d) ret.z = mt * p[0].z + t$1 * p[1].z;
			return ret;
		}
		if (order < 4) {
			let mt2 = mt * mt, t2 = t$1 * t$1, a, b, c, d = 0;
			if (order === 2) {
				p = [
					p[0],
					p[1],
					p[2],
					ZERO
				];
				a = mt2;
				b = mt * t$1 * 2;
				c = t2;
			} else if (order === 3) {
				a = mt2 * mt;
				b = mt2 * t$1 * 3;
				c = mt * t2 * 3;
				d = t$1 * t2;
			}
			const ret = {
				x: a * p[0].x + b * p[1].x + c * p[2].x + d * p[3].x,
				y: a * p[0].y + b * p[1].y + c * p[2].y + d * p[3].y,
				t: t$1
			};
			if (_3d) ret.z = a * p[0].z + b * p[1].z + c * p[2].z + d * p[3].z;
			return ret;
		}
		const dCpts = JSON.parse(JSON.stringify(points));
		while (dCpts.length > 1) {
			for (let i = 0; i < dCpts.length - 1; i++) {
				dCpts[i] = {
					x: dCpts[i].x + (dCpts[i + 1].x - dCpts[i].x) * t$1,
					y: dCpts[i].y + (dCpts[i + 1].y - dCpts[i].y) * t$1
				};
				if (typeof dCpts[i].z !== "undefined") dCpts[i].z = dCpts[i].z + (dCpts[i + 1].z - dCpts[i].z) * t$1;
			}
			dCpts.splice(dCpts.length - 1, 1);
		}
		dCpts[0].t = t$1;
		return dCpts[0];
	},
	computeWithRatios: function(t$1, points, ratios, _3d) {
		const mt = 1 - t$1, r = ratios, p = points;
		let f1 = r[0], f2 = r[1], f3 = r[2], f4 = r[3], d;
		f1 *= mt;
		f2 *= t$1;
		if (p.length === 2) {
			d = f1 + f2;
			return {
				x: (f1 * p[0].x + f2 * p[1].x) / d,
				y: (f1 * p[0].y + f2 * p[1].y) / d,
				z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z) / d,
				t: t$1
			};
		}
		f1 *= mt;
		f2 *= 2 * mt;
		f3 *= t$1 * t$1;
		if (p.length === 3) {
			d = f1 + f2 + f3;
			return {
				x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x) / d,
				y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y) / d,
				z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z) / d,
				t: t$1
			};
		}
		f1 *= mt;
		f2 *= 1.5 * mt;
		f3 *= 3 * mt;
		f4 *= t$1 * t$1 * t$1;
		if (p.length === 4) {
			d = f1 + f2 + f3 + f4;
			return {
				x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x + f4 * p[3].x) / d,
				y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y + f4 * p[3].y) / d,
				z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z + f4 * p[3].z) / d,
				t: t$1
			};
		}
	},
	derive: function(points, _3d) {
		const dpoints = [];
		for (let p = points, d = p.length, c = d - 1; d > 1; d--, c--) {
			const list = [];
			for (let j = 0, dpt; j < c; j++) {
				dpt = {
					x: c * (p[j + 1].x - p[j].x),
					y: c * (p[j + 1].y - p[j].y)
				};
				if (_3d) dpt.z = c * (p[j + 1].z - p[j].z);
				list.push(dpt);
			}
			dpoints.push(list);
			p = list;
		}
		return dpoints;
	},
	between: function(v, m, M) {
		return m <= v && v <= M || utils.approximately(v, m) || utils.approximately(v, M);
	},
	approximately: function(a, b, precision) {
		return abs$1(a - b) <= (precision || epsilon);
	},
	length: function(derivativeFn) {
		const z = .5, len = utils.Tvalues.length;
		let sum$1 = 0;
		for (let i = 0, t$1; i < len; i++) {
			t$1 = z * utils.Tvalues[i] + z;
			sum$1 += utils.Cvalues[i] * utils.arcfn(t$1, derivativeFn);
		}
		return z * sum$1;
	},
	map: function(v, ds, de, ts, te) {
		const d1 = de - ds;
		return ts + (te - ts) * ((v - ds) / d1);
	},
	lerp: function(r, v1, v2) {
		const ret = {
			x: v1.x + r * (v2.x - v1.x),
			y: v1.y + r * (v2.y - v1.y)
		};
		if (v1.z !== void 0 && v2.z !== void 0) ret.z = v1.z + r * (v2.z - v1.z);
		return ret;
	},
	pointToString: function(p) {
		let s = p.x + "/" + p.y;
		if (typeof p.z !== "undefined") s += "/" + p.z;
		return s;
	},
	pointsToString: function(points) {
		return "[" + points.map(utils.pointToString).join(", ") + "]";
	},
	copy: function(obj) {
		return JSON.parse(JSON.stringify(obj));
	},
	angle: function(o, v1, v2) {
		const dx1 = v1.x - o.x, dy1 = v1.y - o.y, dx2 = v2.x - o.x, dy2 = v2.y - o.y;
		return atan2(dx1 * dy2 - dy1 * dx2, dx1 * dx2 + dy1 * dy2);
	},
	round: function(v, d) {
		const s = "" + v;
		const pos = s.indexOf(".");
		return parseFloat(s.substring(0, pos + 1 + d));
	},
	dist: function(p1, p2) {
		const dx = p1.x - p2.x, dy = p1.y - p2.y;
		return sqrt$1(dx * dx + dy * dy);
	},
	closest: function(LUT, point) {
		let mdist = pow(2, 63), mpos, d;
		LUT.forEach(function(p, idx) {
			d = utils.dist(point, p);
			if (d < mdist) {
				mdist = d;
				mpos = idx;
			}
		});
		return {
			mdist,
			mpos
		};
	},
	abcratio: function(t$1, n) {
		if (n !== 2 && n !== 3) return false;
		if (typeof t$1 === "undefined") t$1 = .5;
		else if (t$1 === 0 || t$1 === 1) return t$1;
		const bottom = pow(t$1, n) + pow(1 - t$1, n);
		return abs$1((bottom - 1) / bottom);
	},
	projectionratio: function(t$1, n) {
		if (n !== 2 && n !== 3) return false;
		if (typeof t$1 === "undefined") t$1 = .5;
		else if (t$1 === 0 || t$1 === 1) return t$1;
		const top = pow(1 - t$1, n);
		return top / (pow(t$1, n) + top);
	},
	lli8: function(x1, y1, x2, y2, x3, y3, x4, y4) {
		const nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4), ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4), d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
		if (d == 0) return false;
		return {
			x: nx / d,
			y: ny / d
		};
	},
	lli4: function(p1, p2, p3, p4) {
		const x1 = p1.x, y1 = p1.y, x2 = p2.x, y2 = p2.y, x3 = p3.x, y3 = p3.y, x4 = p4.x, y4 = p4.y;
		return utils.lli8(x1, y1, x2, y2, x3, y3, x4, y4);
	},
	lli: function(v1, v2) {
		return utils.lli4(v1, v1.c, v2, v2.c);
	},
	makeline: function(p1, p2) {
		return new Bezier(p1.x, p1.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2, p2.x, p2.y);
	},
	findbbox: function(sections) {
		let mx = nMax, my = nMax, MX = nMin, MY = nMin;
		sections.forEach(function(s) {
			const bbox = s.bbox();
			if (mx > bbox.x.min) mx = bbox.x.min;
			if (my > bbox.y.min) my = bbox.y.min;
			if (MX < bbox.x.max) MX = bbox.x.max;
			if (MY < bbox.y.max) MY = bbox.y.max;
		});
		return {
			x: {
				min: mx,
				mid: (mx + MX) / 2,
				max: MX,
				size: MX - mx
			},
			y: {
				min: my,
				mid: (my + MY) / 2,
				max: MY,
				size: MY - my
			}
		};
	},
	shapeintersections: function(s1, bbox1, s2, bbox2, curveIntersectionThreshold) {
		if (!utils.bboxoverlap(bbox1, bbox2)) return [];
		const intersections = [];
		const a1 = [
			s1.startcap,
			s1.forward,
			s1.back,
			s1.endcap
		];
		const a2 = [
			s2.startcap,
			s2.forward,
			s2.back,
			s2.endcap
		];
		a1.forEach(function(l1) {
			if (l1.virtual) return;
			a2.forEach(function(l2) {
				if (l2.virtual) return;
				const iss = l1.intersects(l2, curveIntersectionThreshold);
				if (iss.length > 0) {
					iss.c1 = l1;
					iss.c2 = l2;
					iss.s1 = s1;
					iss.s2 = s2;
					intersections.push(iss);
				}
			});
		});
		return intersections;
	},
	makeshape: function(forward, back, curveIntersectionThreshold) {
		const bpl = back.points.length;
		const fpl = forward.points.length;
		const start$1 = utils.makeline(back.points[bpl - 1], forward.points[0]);
		const end = utils.makeline(forward.points[fpl - 1], back.points[0]);
		const shape = {
			startcap: start$1,
			forward,
			back,
			endcap: end,
			bbox: utils.findbbox([
				start$1,
				forward,
				back,
				end
			])
		};
		shape.intersections = function(s2) {
			return utils.shapeintersections(shape, shape.bbox, s2, s2.bbox, curveIntersectionThreshold);
		};
		return shape;
	},
	getminmax: function(curve, d, list) {
		if (!list) return {
			min: 0,
			max: 0
		};
		let min$2 = nMax, max$2 = nMin, t$1, c;
		if (list.indexOf(0) === -1) list = [0].concat(list);
		if (list.indexOf(1) === -1) list.push(1);
		for (let i = 0, len = list.length; i < len; i++) {
			t$1 = list[i];
			c = curve.get(t$1);
			if (c[d] < min$2) min$2 = c[d];
			if (c[d] > max$2) max$2 = c[d];
		}
		return {
			min: min$2,
			mid: (min$2 + max$2) / 2,
			max: max$2,
			size: max$2 - min$2
		};
	},
	align: function(points, line) {
		const tx = line.p1.x, ty = line.p1.y, a = -atan2(line.p2.y - ty, line.p2.x - tx), d = function(v) {
			return {
				x: (v.x - tx) * cos$1(a) - (v.y - ty) * sin$1(a),
				y: (v.x - tx) * sin$1(a) + (v.y - ty) * cos$1(a)
			};
		};
		return points.map(d);
	},
	roots: function(points, line) {
		line = line || {
			p1: {
				x: 0,
				y: 0
			},
			p2: {
				x: 1,
				y: 0
			}
		};
		const order = points.length - 1;
		const aligned = utils.align(points, line);
		const reduce = function(t$1) {
			return 0 <= t$1 && t$1 <= 1;
		};
		if (order === 2) {
			const a$1 = aligned[0].y, b$1 = aligned[1].y, c$1 = aligned[2].y, d$1 = a$1 - 2 * b$1 + c$1;
			if (d$1 !== 0) {
				const m1 = -sqrt$1(b$1 * b$1 - a$1 * c$1), m2 = -a$1 + b$1;
				return [-(m1 + m2) / d$1, -(-m1 + m2) / d$1].filter(reduce);
			} else if (b$1 !== c$1 && d$1 === 0) return [(2 * b$1 - c$1) / (2 * b$1 - 2 * c$1)].filter(reduce);
			return [];
		}
		const pa = aligned[0].y, pb = aligned[1].y, pc = aligned[2].y, pd = aligned[3].y;
		let d = -pa + 3 * pb - 3 * pc + pd, a = 3 * pa - 6 * pb + 3 * pc, b = -3 * pa + 3 * pb, c = pa;
		if (utils.approximately(d, 0)) {
			if (utils.approximately(a, 0)) {
				if (utils.approximately(b, 0)) return [];
				return [-c / b].filter(reduce);
			}
			const q$1 = sqrt$1(b * b - 4 * a * c), a2 = 2 * a;
			return [(q$1 - b) / a2, (-b - q$1) / a2].filter(reduce);
		}
		a /= d;
		b /= d;
		c /= d;
		const p = (3 * b - a * a) / 3, p3 = p / 3, q = (2 * a * a * a - 9 * a * b + 27 * c) / 27, q2 = q / 2, discriminant = q2 * q2 + p3 * p3 * p3;
		let u1, v1, x1, x2, x3;
		if (discriminant < 0) {
			const mp3 = -p / 3, r = sqrt$1(mp3 * mp3 * mp3), t$1 = -q / (2 * r), phi = acos$1(t$1 < -1 ? -1 : t$1 > 1 ? 1 : t$1), t1 = 2 * crt(r);
			x1 = t1 * cos$1(phi / 3) - a / 3;
			x2 = t1 * cos$1((phi + tau) / 3) - a / 3;
			x3 = t1 * cos$1((phi + 2 * tau) / 3) - a / 3;
			return [
				x1,
				x2,
				x3
			].filter(reduce);
		} else if (discriminant === 0) {
			u1 = q2 < 0 ? crt(-q2) : -crt(q2);
			x1 = 2 * u1 - a / 3;
			x2 = -u1 - a / 3;
			return [x1, x2].filter(reduce);
		} else {
			const sd = sqrt$1(discriminant);
			u1 = crt(-q2 + sd);
			v1 = crt(q2 + sd);
			return [u1 - v1 - a / 3].filter(reduce);
		}
	},
	droots: function(p) {
		if (p.length === 3) {
			const a = p[0], b = p[1], c = p[2], d = a - 2 * b + c;
			if (d !== 0) {
				const m1 = -sqrt$1(b * b - a * c), m2 = -a + b;
				return [-(m1 + m2) / d, -(-m1 + m2) / d];
			} else if (b !== c && d === 0) return [(2 * b - c) / (2 * (b - c))];
			return [];
		}
		if (p.length === 2) {
			const a = p[0], b = p[1];
			if (a !== b) return [a / (a - b)];
			return [];
		}
		return [];
	},
	curvature: function(t$1, d1, d2, _3d, kOnly) {
		let num, dnm, adk, dk, k = 0, r = 0;
		const d = utils.compute(t$1, d1);
		const dd = utils.compute(t$1, d2);
		const qdsum = d.x * d.x + d.y * d.y;
		if (_3d) {
			num = sqrt$1(pow(d.y * dd.z - dd.y * d.z, 2) + pow(d.z * dd.x - dd.z * d.x, 2) + pow(d.x * dd.y - dd.x * d.y, 2));
			dnm = pow(qdsum + d.z * d.z, 3 / 2);
		} else {
			num = d.x * dd.y - d.y * dd.x;
			dnm = pow(qdsum, 3 / 2);
		}
		if (num === 0 || dnm === 0) return {
			k: 0,
			r: 0
		};
		k = num / dnm;
		r = dnm / num;
		if (!kOnly) {
			const pk = utils.curvature(t$1 - .001, d1, d2, _3d, true).k;
			const nk = utils.curvature(t$1 + .001, d1, d2, _3d, true).k;
			dk = (nk - k + (k - pk)) / 2;
			adk = (abs$1(nk - k) + abs$1(k - pk)) / 2;
		}
		return {
			k,
			r,
			dk,
			adk
		};
	},
	inflections: function(points) {
		if (points.length < 4) return [];
		const p = utils.align(points, {
			p1: points[0],
			p2: points.slice(-1)[0]
		}), a = p[2].x * p[1].y, b = p[3].x * p[1].y, c = p[1].x * p[2].y, d = p[3].x * p[2].y, v1 = 18 * (-3 * a + 2 * b + 3 * c - d), v2 = 18 * (3 * a - b - 3 * c), v3 = 18 * (c - a);
		if (utils.approximately(v1, 0)) {
			if (!utils.approximately(v2, 0)) {
				let t$1 = -v3 / v2;
				if (0 <= t$1 && t$1 <= 1) return [t$1];
			}
			return [];
		}
		const d2 = 2 * v1;
		if (utils.approximately(d2, 0)) return [];
		const trm = v2 * v2 - 4 * v1 * v3;
		if (trm < 0) return [];
		const sq = Math.sqrt(trm);
		return [(sq - v2) / d2, -(v2 + sq) / d2].filter(function(r) {
			return 0 <= r && r <= 1;
		});
	},
	bboxoverlap: function(b1, b2) {
		const dims = ["x", "y"], len = dims.length;
		for (let i = 0, dim, l, t$1, d; i < len; i++) {
			dim = dims[i];
			l = b1[dim].mid;
			t$1 = b2[dim].mid;
			d = (b1[dim].size + b2[dim].size) / 2;
			if (abs$1(l - t$1) >= d) return false;
		}
		return true;
	},
	expandbox: function(bbox, _bbox) {
		if (_bbox.x.min < bbox.x.min) bbox.x.min = _bbox.x.min;
		if (_bbox.y.min < bbox.y.min) bbox.y.min = _bbox.y.min;
		if (_bbox.z && _bbox.z.min < bbox.z.min) bbox.z.min = _bbox.z.min;
		if (_bbox.x.max > bbox.x.max) bbox.x.max = _bbox.x.max;
		if (_bbox.y.max > bbox.y.max) bbox.y.max = _bbox.y.max;
		if (_bbox.z && _bbox.z.max > bbox.z.max) bbox.z.max = _bbox.z.max;
		bbox.x.mid = (bbox.x.min + bbox.x.max) / 2;
		bbox.y.mid = (bbox.y.min + bbox.y.max) / 2;
		if (bbox.z) bbox.z.mid = (bbox.z.min + bbox.z.max) / 2;
		bbox.x.size = bbox.x.max - bbox.x.min;
		bbox.y.size = bbox.y.max - bbox.y.min;
		if (bbox.z) bbox.z.size = bbox.z.max - bbox.z.min;
	},
	pairiteration: function(c1, c2, curveIntersectionThreshold) {
		const c1b = c1.bbox(), c2b = c2.bbox(), r = 1e5, threshold = curveIntersectionThreshold || .5;
		if (c1b.x.size + c1b.y.size < threshold && c2b.x.size + c2b.y.size < threshold) return [(r * (c1._t1 + c1._t2) / 2 | 0) / r + "/" + (r * (c2._t1 + c2._t2) / 2 | 0) / r];
		let cc1 = c1.split(.5), cc2 = c2.split(.5), pairs = [
			{
				left: cc1.left,
				right: cc2.left
			},
			{
				left: cc1.left,
				right: cc2.right
			},
			{
				left: cc1.right,
				right: cc2.right
			},
			{
				left: cc1.right,
				right: cc2.left
			}
		];
		pairs = pairs.filter(function(pair) {
			return utils.bboxoverlap(pair.left.bbox(), pair.right.bbox());
		});
		let results = [];
		if (pairs.length === 0) return results;
		pairs.forEach(function(pair) {
			results = results.concat(utils.pairiteration(pair.left, pair.right, threshold));
		});
		results = results.filter(function(v, i) {
			return results.indexOf(v) === i;
		});
		return results;
	},
	getccenter: function(p1, p2, p3) {
		const dx1 = p2.x - p1.x, dy1 = p2.y - p1.y, dx2 = p3.x - p2.x, dy2 = p3.y - p2.y, dx1p = dx1 * cos$1(quart) - dy1 * sin$1(quart), dy1p = dx1 * sin$1(quart) + dy1 * cos$1(quart), dx2p = dx2 * cos$1(quart) - dy2 * sin$1(quart), dy2p = dx2 * sin$1(quart) + dy2 * cos$1(quart), mx1 = (p1.x + p2.x) / 2, my1 = (p1.y + p2.y) / 2, mx2 = (p2.x + p3.x) / 2, my2 = (p2.y + p3.y) / 2, mx1n = mx1 + dx1p, my1n = my1 + dy1p, mx2n = mx2 + dx2p, my2n = my2 + dy2p, arc = utils.lli8(mx1, my1, mx1n, my1n, mx2, my2, mx2n, my2n), r = utils.dist(arc, p1);
		let s = atan2(p1.y - arc.y, p1.x - arc.x), m = atan2(p2.y - arc.y, p2.x - arc.x), e = atan2(p3.y - arc.y, p3.x - arc.x), _;
		if (s < e) {
			if (s > m || m > e) s += tau;
			if (s > e) {
				_ = e;
				e = s;
				s = _;
			}
		} else if (e < m && m < s) {
			_ = e;
			e = s;
			s = _;
		} else e += tau;
		arc.s = s;
		arc.e = e;
		arc.r = r;
		return arc;
	},
	numberSort: function(a, b) {
		return a - b;
	}
};
var PolyBezier = class PolyBezier {
	constructor(curves) {
		this.curves = [];
		this._3d = false;
		if (!!curves) {
			this.curves = curves;
			this._3d = this.curves[0]._3d;
		}
	}
	valueOf() {
		return this.toString();
	}
	toString() {
		return "[" + this.curves.map(function(curve) {
			return utils.pointsToString(curve.points);
		}).join(", ") + "]";
	}
	addCurve(curve) {
		this.curves.push(curve);
		this._3d = this._3d || curve._3d;
	}
	length() {
		return this.curves.map(function(v) {
			return v.length();
		}).reduce(function(a, b) {
			return a + b;
		});
	}
	curve(idx) {
		return this.curves[idx];
	}
	bbox() {
		const c = this.curves;
		var bbox = c[0].bbox();
		for (var i = 1; i < c.length; i++) utils.expandbox(bbox, c[i].bbox());
		return bbox;
	}
	offset(d) {
		const offset = [];
		this.curves.forEach(function(v) {
			offset.push(...v.offset(d));
		});
		return new PolyBezier(offset);
	}
};
var { abs, min: min$1, max: max$1, cos, sin, acos, sqrt } = Math;
var pi = Math.PI;
var Bezier = class Bezier {
	constructor(coords) {
		let args = coords && coords.forEach ? coords : Array.from(arguments).slice();
		let coordlen = false;
		if (typeof args[0] === "object") {
			coordlen = args.length;
			const newargs = [];
			args.forEach(function(point$1) {
				[
					"x",
					"y",
					"z"
				].forEach(function(d) {
					if (typeof point$1[d] !== "undefined") newargs.push(point$1[d]);
				});
			});
			args = newargs;
		}
		let higher = false;
		const len = args.length;
		if (coordlen) {
			if (coordlen > 4) {
				if (arguments.length !== 1) throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");
				higher = true;
			}
		} else if (len !== 6 && len !== 8 && len !== 9 && len !== 12) {
			if (arguments.length !== 1) throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");
		}
		const _3d = this._3d = !higher && (len === 9 || len === 12) || coords && coords[0] && typeof coords[0].z !== "undefined";
		const points = this.points = [];
		for (let idx = 0, step = _3d ? 3 : 2; idx < len; idx += step) {
			var point = {
				x: args[idx],
				y: args[idx + 1]
			};
			if (_3d) point.z = args[idx + 2];
			points.push(point);
		}
		const order = this.order = points.length - 1;
		const dims = this.dims = ["x", "y"];
		if (_3d) dims.push("z");
		this.dimlen = dims.length;
		const aligned = utils.align(points, {
			p1: points[0],
			p2: points[order]
		});
		const baselength = utils.dist(points[0], points[order]);
		this._linear = aligned.reduce((t$1, p) => t$1 + abs(p.y), 0) < baselength / 50;
		this._lut = [];
		this._t1 = 0;
		this._t2 = 1;
		this.update();
	}
	static quadraticFromPoints(p1, p2, p3, t$1) {
		if (typeof t$1 === "undefined") t$1 = .5;
		if (t$1 === 0) return new Bezier(p2, p2, p3);
		if (t$1 === 1) return new Bezier(p1, p2, p2);
		return new Bezier(p1, Bezier.getABC(2, p1, p2, p3, t$1).A, p3);
	}
	static cubicFromPoints(S, B, E, t$1, d1) {
		if (typeof t$1 === "undefined") t$1 = .5;
		const abc = Bezier.getABC(3, S, B, E, t$1);
		if (typeof d1 === "undefined") d1 = utils.dist(B, abc.C);
		const d2 = d1 * (1 - t$1) / t$1;
		const selen = utils.dist(S, E), lx = (E.x - S.x) / selen, ly = (E.y - S.y) / selen, bx1 = d1 * lx, by1 = d1 * ly, bx2 = d2 * lx, by2 = d2 * ly;
		const e1 = {
			x: B.x - bx1,
			y: B.y - by1
		}, e2 = {
			x: B.x + bx2,
			y: B.y + by2
		}, A = abc.A, v1 = {
			x: A.x + (e1.x - A.x) / (1 - t$1),
			y: A.y + (e1.y - A.y) / (1 - t$1)
		}, v2 = {
			x: A.x + (e2.x - A.x) / t$1,
			y: A.y + (e2.y - A.y) / t$1
		};
		return new Bezier(S, {
			x: S.x + (v1.x - S.x) / t$1,
			y: S.y + (v1.y - S.y) / t$1
		}, {
			x: E.x + (v2.x - E.x) / (1 - t$1),
			y: E.y + (v2.y - E.y) / (1 - t$1)
		}, E);
	}
	static getUtils() {
		return utils;
	}
	getUtils() {
		return Bezier.getUtils();
	}
	static get PolyBezier() {
		return PolyBezier;
	}
	valueOf() {
		return this.toString();
	}
	toString() {
		return utils.pointsToString(this.points);
	}
	toSVG() {
		if (this._3d) return false;
		const p = this.points, s = [
			"M",
			p[0].x,
			p[0].y,
			this.order === 2 ? "Q" : "C"
		];
		for (let i = 1, last = p.length; i < last; i++) {
			s.push(p[i].x);
			s.push(p[i].y);
		}
		return s.join(" ");
	}
	setRatios(ratios) {
		if (ratios.length !== this.points.length) throw new Error("incorrect number of ratio values");
		this.ratios = ratios;
		this._lut = [];
	}
	verify() {
		const print = this.coordDigest();
		if (print !== this._print) {
			this._print = print;
			this.update();
		}
	}
	coordDigest() {
		return this.points.map(function(c, pos) {
			return "" + pos + c.x + c.y + (c.z ? c.z : 0);
		}).join("");
	}
	update() {
		this._lut = [];
		this.dpoints = utils.derive(this.points, this._3d);
		this.computedirection();
	}
	computedirection() {
		const points = this.points;
		this.clockwise = utils.angle(points[0], points[this.order], points[1]) > 0;
	}
	length() {
		return utils.length(this.derivative.bind(this));
	}
	static getABC(order = 2, S, B, E, t$1 = .5) {
		const u = utils.projectionratio(t$1, order), um = 1 - u, C = {
			x: u * S.x + um * E.x,
			y: u * S.y + um * E.y
		}, s = utils.abcratio(t$1, order);
		return {
			A: {
				x: B.x + (B.x - C.x) / s,
				y: B.y + (B.y - C.y) / s
			},
			B,
			C,
			S,
			E
		};
	}
	getABC(t$1, B) {
		B = B || this.get(t$1);
		let S = this.points[0];
		let E = this.points[this.order];
		return Bezier.getABC(this.order, S, B, E, t$1);
	}
	getLUT(steps) {
		this.verify();
		steps = steps || 100;
		if (this._lut.length === steps + 1) return this._lut;
		this._lut = [];
		steps++;
		this._lut = [];
		for (let i = 0, p, t$1; i < steps; i++) {
			t$1 = i / (steps - 1);
			p = this.compute(t$1);
			p.t = t$1;
			this._lut.push(p);
		}
		return this._lut;
	}
	on(point, error) {
		error = error || 5;
		const lut = this.getLUT(), hits = [];
		for (let i = 0, c, t$1 = 0; i < lut.length; i++) {
			c = lut[i];
			if (utils.dist(c, point) < error) {
				hits.push(c);
				t$1 += i / lut.length;
			}
		}
		if (!hits.length) return false;
		return t /= hits.length;
	}
	project(point) {
		const LUT = this.getLUT(), l = LUT.length - 1, closest = utils.closest(LUT, point), mpos = closest.mpos, t1 = (mpos - 1) / l, t2 = (mpos + 1) / l, step = .1 / l;
		let mdist = closest.mdist, t$1 = t1, ft = t$1, p;
		mdist += 1;
		for (let d; t$1 < t2 + step; t$1 += step) {
			p = this.compute(t$1);
			d = utils.dist(point, p);
			if (d < mdist) {
				mdist = d;
				ft = t$1;
			}
		}
		ft = ft < 0 ? 0 : ft > 1 ? 1 : ft;
		p = this.compute(ft);
		p.t = ft;
		p.d = mdist;
		return p;
	}
	get(t$1) {
		return this.compute(t$1);
	}
	point(idx) {
		return this.points[idx];
	}
	compute(t$1) {
		if (this.ratios) return utils.computeWithRatios(t$1, this.points, this.ratios, this._3d);
		return utils.compute(t$1, this.points, this._3d, this.ratios);
	}
	raise() {
		const p = this.points, np = [p[0]], k = p.length;
		for (let i = 1, pi$2, pim; i < k; i++) {
			pi$2 = p[i];
			pim = p[i - 1];
			np[i] = {
				x: (k - i) / k * pi$2.x + i / k * pim.x,
				y: (k - i) / k * pi$2.y + i / k * pim.y
			};
		}
		np[k] = p[k - 1];
		return new Bezier(np);
	}
	derivative(t$1) {
		return utils.compute(t$1, this.dpoints[0], this._3d);
	}
	dderivative(t$1) {
		return utils.compute(t$1, this.dpoints[1], this._3d);
	}
	align() {
		let p = this.points;
		return new Bezier(utils.align(p, {
			p1: p[0],
			p2: p[p.length - 1]
		}));
	}
	curvature(t$1) {
		return utils.curvature(t$1, this.dpoints[0], this.dpoints[1], this._3d);
	}
	inflections() {
		return utils.inflections(this.points);
	}
	normal(t$1) {
		return this._3d ? this.__normal3(t$1) : this.__normal2(t$1);
	}
	__normal2(t$1) {
		const d = this.derivative(t$1);
		const q = sqrt(d.x * d.x + d.y * d.y);
		return {
			t: t$1,
			x: -d.y / q,
			y: d.x / q
		};
	}
	__normal3(t$1) {
		const r1 = this.derivative(t$1), r2 = this.derivative(t$1 + .01), q1 = sqrt(r1.x * r1.x + r1.y * r1.y + r1.z * r1.z), q2 = sqrt(r2.x * r2.x + r2.y * r2.y + r2.z * r2.z);
		r1.x /= q1;
		r1.y /= q1;
		r1.z /= q1;
		r2.x /= q2;
		r2.y /= q2;
		r2.z /= q2;
		const c = {
			x: r2.y * r1.z - r2.z * r1.y,
			y: r2.z * r1.x - r2.x * r1.z,
			z: r2.x * r1.y - r2.y * r1.x
		};
		const m = sqrt(c.x * c.x + c.y * c.y + c.z * c.z);
		c.x /= m;
		c.y /= m;
		c.z /= m;
		const R = [
			c.x * c.x,
			c.x * c.y - c.z,
			c.x * c.z + c.y,
			c.x * c.y + c.z,
			c.y * c.y,
			c.y * c.z - c.x,
			c.x * c.z - c.y,
			c.y * c.z + c.x,
			c.z * c.z
		];
		return {
			t: t$1,
			x: R[0] * r1.x + R[1] * r1.y + R[2] * r1.z,
			y: R[3] * r1.x + R[4] * r1.y + R[5] * r1.z,
			z: R[6] * r1.x + R[7] * r1.y + R[8] * r1.z
		};
	}
	hull(t$1) {
		let p = this.points, _p = [], q = [], idx = 0;
		q[idx++] = p[0];
		q[idx++] = p[1];
		q[idx++] = p[2];
		if (this.order === 3) q[idx++] = p[3];
		while (p.length > 1) {
			_p = [];
			for (let i = 0, pt, l = p.length - 1; i < l; i++) {
				pt = utils.lerp(t$1, p[i], p[i + 1]);
				q[idx++] = pt;
				_p.push(pt);
			}
			p = _p;
		}
		return q;
	}
	split(t1, t2) {
		if (t1 === 0 && !!t2) return this.split(t2).left;
		if (t2 === 1) return this.split(t1).right;
		const q = this.hull(t1);
		const result = {
			left: this.order === 2 ? new Bezier([
				q[0],
				q[3],
				q[5]
			]) : new Bezier([
				q[0],
				q[4],
				q[7],
				q[9]
			]),
			right: this.order === 2 ? new Bezier([
				q[5],
				q[4],
				q[2]
			]) : new Bezier([
				q[9],
				q[8],
				q[6],
				q[3]
			]),
			span: q
		};
		result.left._t1 = utils.map(0, 0, 1, this._t1, this._t2);
		result.left._t2 = utils.map(t1, 0, 1, this._t1, this._t2);
		result.right._t1 = utils.map(t1, 0, 1, this._t1, this._t2);
		result.right._t2 = utils.map(1, 0, 1, this._t1, this._t2);
		if (!t2) return result;
		t2 = utils.map(t2, t1, 1, 0, 1);
		return result.right.split(t2).left;
	}
	extrema() {
		const result = {};
		let roots = [];
		this.dims.forEach(function(dim) {
			let mfn = function(v) {
				return v[dim];
			};
			let p = this.dpoints[0].map(mfn);
			result[dim] = utils.droots(p);
			if (this.order === 3) {
				p = this.dpoints[1].map(mfn);
				result[dim] = result[dim].concat(utils.droots(p));
			}
			result[dim] = result[dim].filter(function(t$1) {
				return t$1 >= 0 && t$1 <= 1;
			});
			roots = roots.concat(result[dim].sort(utils.numberSort));
		}.bind(this));
		result.values = roots.sort(utils.numberSort).filter(function(v, idx) {
			return roots.indexOf(v) === idx;
		});
		return result;
	}
	bbox() {
		const extrema = this.extrema(), result = {};
		this.dims.forEach(function(d) {
			result[d] = utils.getminmax(this, d, extrema[d]);
		}.bind(this));
		return result;
	}
	overlaps(curve) {
		const lbbox = this.bbox(), tbbox = curve.bbox();
		return utils.bboxoverlap(lbbox, tbbox);
	}
	offset(t$1, d) {
		if (typeof d !== "undefined") {
			const c = this.get(t$1), n = this.normal(t$1);
			const ret = {
				c,
				n,
				x: c.x + n.x * d,
				y: c.y + n.y * d
			};
			if (this._3d) ret.z = c.z + n.z * d;
			return ret;
		}
		if (this._linear) {
			const nv = this.normal(0);
			return [new Bezier(this.points.map(function(p) {
				const ret = {
					x: p.x + t$1 * nv.x,
					y: p.y + t$1 * nv.y
				};
				if (p.z && nv.z) ret.z = p.z + t$1 * nv.z;
				return ret;
			}))];
		}
		return this.reduce().map(function(s) {
			if (s._linear) return s.offset(t$1)[0];
			return s.scale(t$1);
		});
	}
	simple() {
		if (this.order === 3) {
			const a1 = utils.angle(this.points[0], this.points[3], this.points[1]);
			const a2 = utils.angle(this.points[0], this.points[3], this.points[2]);
			if (a1 > 0 && a2 < 0 || a1 < 0 && a2 > 0) return false;
		}
		const n1 = this.normal(0);
		const n2 = this.normal(1);
		let s = n1.x * n2.x + n1.y * n2.y;
		if (this._3d) s += n1.z * n2.z;
		return abs(acos(s)) < pi / 3;
	}
	reduce() {
		let i, t1 = 0, t2 = 0, step = .01, segment, pass1 = [], pass2 = [];
		let extrema = this.extrema().values;
		if (extrema.indexOf(0) === -1) extrema = [0].concat(extrema);
		if (extrema.indexOf(1) === -1) extrema.push(1);
		for (t1 = extrema[0], i = 1; i < extrema.length; i++) {
			t2 = extrema[i];
			segment = this.split(t1, t2);
			segment._t1 = t1;
			segment._t2 = t2;
			pass1.push(segment);
			t1 = t2;
		}
		pass1.forEach(function(p1) {
			t1 = 0;
			t2 = 0;
			while (t2 <= 1) for (t2 = t1 + step; t2 <= 1 + step; t2 += step) {
				segment = p1.split(t1, t2);
				if (!segment.simple()) {
					t2 -= step;
					if (abs(t1 - t2) < step) return [];
					segment = p1.split(t1, t2);
					segment._t1 = utils.map(t1, 0, 1, p1._t1, p1._t2);
					segment._t2 = utils.map(t2, 0, 1, p1._t1, p1._t2);
					pass2.push(segment);
					t1 = t2;
					break;
				}
			}
			if (t1 < 1) {
				segment = p1.split(t1, 1);
				segment._t1 = utils.map(t1, 0, 1, p1._t1, p1._t2);
				segment._t2 = p1._t2;
				pass2.push(segment);
			}
		});
		return pass2;
	}
	translate(v, d1, d2) {
		d2 = typeof d2 === "number" ? d2 : d1;
		const o = this.order;
		let d = this.points.map((_, i) => (1 - i / o) * d1 + i / o * d2);
		return new Bezier(this.points.map((p, i) => ({
			x: p.x + v.x * d[i],
			y: p.y + v.y * d[i]
		})));
	}
	scale(d) {
		const order = this.order;
		let distanceFn = false;
		if (typeof d === "function") distanceFn = d;
		if (distanceFn && order === 2) return this.raise().scale(distanceFn);
		const clockwise = this.clockwise;
		const points = this.points;
		if (this._linear) return this.translate(this.normal(0), distanceFn ? distanceFn(0) : d, distanceFn ? distanceFn(1) : d);
		const r1 = distanceFn ? distanceFn(0) : d;
		const r2 = distanceFn ? distanceFn(1) : d;
		const v = [this.offset(0, 10), this.offset(1, 10)];
		const np = [];
		const o = utils.lli4(v[0], v[0].c, v[1], v[1].c);
		if (!o) throw new Error("cannot scale this curve. Try reducing it first.");
		[0, 1].forEach(function(t$1) {
			const p = np[t$1 * order] = utils.copy(points[t$1 * order]);
			p.x += (t$1 ? r2 : r1) * v[t$1].n.x;
			p.y += (t$1 ? r2 : r1) * v[t$1].n.y;
		});
		if (!distanceFn) {
			[0, 1].forEach((t$1) => {
				if (order === 2 && !!t$1) return;
				const p = np[t$1 * order];
				const d$1 = this.derivative(t$1);
				const p2 = {
					x: p.x + d$1.x,
					y: p.y + d$1.y
				};
				np[t$1 + 1] = utils.lli4(p, p2, o, points[t$1 + 1]);
			});
			return new Bezier(np);
		}
		[0, 1].forEach(function(t$1) {
			if (order === 2 && !!t$1) return;
			var p = points[t$1 + 1];
			var ov = {
				x: p.x - o.x,
				y: p.y - o.y
			};
			var rc = distanceFn ? distanceFn((t$1 + 1) / order) : d;
			if (distanceFn && !clockwise) rc = -rc;
			var m = sqrt(ov.x * ov.x + ov.y * ov.y);
			ov.x /= m;
			ov.y /= m;
			np[t$1 + 1] = {
				x: p.x + rc * ov.x,
				y: p.y + rc * ov.y
			};
		});
		return new Bezier(np);
	}
	outline(d1, d2, d3, d4) {
		d2 = d2 === void 0 ? d1 : d2;
		if (this._linear) {
			const n = this.normal(0);
			const start$1 = this.points[0];
			const end = this.points[this.points.length - 1];
			let s, mid, e;
			if (d3 === void 0) {
				d3 = d1;
				d4 = d2;
			}
			s = {
				x: start$1.x + n.x * d1,
				y: start$1.y + n.y * d1
			};
			e = {
				x: end.x + n.x * d3,
				y: end.y + n.y * d3
			};
			mid = {
				x: (s.x + e.x) / 2,
				y: (s.y + e.y) / 2
			};
			const fline = [
				s,
				mid,
				e
			];
			s = {
				x: start$1.x - n.x * d2,
				y: start$1.y - n.y * d2
			};
			e = {
				x: end.x - n.x * d4,
				y: end.y - n.y * d4
			};
			mid = {
				x: (s.x + e.x) / 2,
				y: (s.y + e.y) / 2
			};
			const bline = [
				e,
				mid,
				s
			];
			const ls$1 = utils.makeline(bline[2], fline[0]);
			const le$1 = utils.makeline(fline[2], bline[0]);
			return new PolyBezier([
				ls$1,
				new Bezier(fline),
				le$1,
				new Bezier(bline)
			]);
		}
		const reduced = this.reduce(), len = reduced.length, fcurves = [];
		let bcurves = [], p, alen = 0, tlen = this.length();
		const graduated = typeof d3 !== "undefined" && typeof d4 !== "undefined";
		function linearDistanceFunction(s, e, tlen$1, alen$1, slen) {
			return function(v) {
				const f1 = alen$1 / tlen$1, f2 = (alen$1 + slen) / tlen$1, d = e - s;
				return utils.map(v, 0, 1, s + f1 * d, s + f2 * d);
			};
		}
		reduced.forEach(function(segment) {
			const slen = segment.length();
			if (graduated) {
				fcurves.push(segment.scale(linearDistanceFunction(d1, d3, tlen, alen, slen)));
				bcurves.push(segment.scale(linearDistanceFunction(-d2, -d4, tlen, alen, slen)));
			} else {
				fcurves.push(segment.scale(d1));
				bcurves.push(segment.scale(-d2));
			}
			alen += slen;
		});
		bcurves = bcurves.map(function(s) {
			p = s.points;
			if (p[3]) s.points = [
				p[3],
				p[2],
				p[1],
				p[0]
			];
			else s.points = [
				p[2],
				p[1],
				p[0]
			];
			return s;
		}).reverse();
		const fs = fcurves[0].points[0], fe = fcurves[len - 1].points[fcurves[len - 1].points.length - 1], bs = bcurves[len - 1].points[bcurves[len - 1].points.length - 1], be = bcurves[0].points[0], ls = utils.makeline(bs, fs), le = utils.makeline(fe, be);
		return new PolyBezier([ls].concat(fcurves).concat([le]).concat(bcurves));
	}
	outlineshapes(d1, d2, curveIntersectionThreshold) {
		d2 = d2 || d1;
		const outline = this.outline(d1, d2).curves;
		const shapes = [];
		for (let i = 1, len = outline.length; i < len / 2; i++) {
			const shape = utils.makeshape(outline[i], outline[len - i], curveIntersectionThreshold);
			shape.startcap.virtual = i > 1;
			shape.endcap.virtual = i < len / 2 - 1;
			shapes.push(shape);
		}
		return shapes;
	}
	intersects(curve, curveIntersectionThreshold) {
		if (!curve) return this.selfintersects(curveIntersectionThreshold);
		if (curve.p1 && curve.p2) return this.lineIntersects(curve);
		if (curve instanceof Bezier) curve = curve.reduce();
		return this.curveintersects(this.reduce(), curve, curveIntersectionThreshold);
	}
	lineIntersects(line) {
		const mx = min$1(line.p1.x, line.p2.x), my = min$1(line.p1.y, line.p2.y), MX = max$1(line.p1.x, line.p2.x), MY = max$1(line.p1.y, line.p2.y);
		return utils.roots(this.points, line).filter((t$1) => {
			var p = this.get(t$1);
			return utils.between(p.x, mx, MX) && utils.between(p.y, my, MY);
		});
	}
	selfintersects(curveIntersectionThreshold) {
		const reduced = this.reduce(), len = reduced.length - 2, results = [];
		for (let i = 0, result, left, right; i < len; i++) {
			left = reduced.slice(i, i + 1);
			right = reduced.slice(i + 2);
			result = this.curveintersects(left, right, curveIntersectionThreshold);
			results.push(...result);
		}
		return results;
	}
	curveintersects(c1, c2, curveIntersectionThreshold) {
		const pairs = [];
		c1.forEach(function(l) {
			c2.forEach(function(r) {
				if (l.overlaps(r)) pairs.push({
					left: l,
					right: r
				});
			});
		});
		let intersections = [];
		pairs.forEach(function(pair) {
			const result = utils.pairiteration(pair.left, pair.right, curveIntersectionThreshold);
			if (result.length > 0) intersections = intersections.concat(result);
		});
		return intersections;
	}
	arcs(errorThreshold) {
		errorThreshold = errorThreshold || .5;
		return this._iterate(errorThreshold, []);
	}
	_error(pc, np1, s, e) {
		const q = (e - s) / 4, c1 = this.get(s + q), c2 = this.get(e - q), ref = utils.dist(pc, np1), d1 = utils.dist(pc, c1), d2 = utils.dist(pc, c2);
		return abs(d1 - ref) + abs(d2 - ref);
	}
	_iterate(errorThreshold, circles) {
		let t_s = 0, t_e = 1, safety;
		do {
			safety = 0;
			t_e = 1;
			let np1 = this.get(t_s), np2, np3, arc, prev_arc;
			let curr_good = false, prev_good = false, done;
			let t_m = t_e, prev_e = 1, step = 0;
			do {
				prev_good = curr_good;
				prev_arc = arc;
				t_m = (t_s + t_e) / 2;
				step++;
				np2 = this.get(t_m);
				np3 = this.get(t_e);
				arc = utils.getccenter(np1, np2, np3);
				arc.interval = {
					start: t_s,
					end: t_e
				};
				curr_good = this._error(arc, np1, t_s, t_e) <= errorThreshold;
				done = prev_good && !curr_good;
				if (!done) prev_e = t_e;
				if (curr_good) {
					if (t_e >= 1) {
						arc.interval.end = prev_e = 1;
						prev_arc = arc;
						if (t_e > 1) {
							let d = {
								x: arc.x + arc.r * cos(arc.e),
								y: arc.y + arc.r * sin(arc.e)
							};
							arc.e += utils.angle({
								x: arc.x,
								y: arc.y
							}, d, this.get(1));
						}
						break;
					}
					t_e = t_e + (t_e - t_s) / 2;
				} else t_e = t_m;
			} while (!done && safety++ < 100);
			if (safety >= 100) break;
			prev_arc = prev_arc ? prev_arc : arc;
			circles.push(prev_arc);
			t_s = prev_e;
		} while (t_e < 1);
		return circles;
	}
};
function _arrayLikeToArray$1(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
function _arrayWithHoles$1(r) {
	if (Array.isArray(r)) return r;
}
function _arrayWithoutHoles$1(r) {
	if (Array.isArray(r)) return _arrayLikeToArray$1(r);
}
function _iterableToArray$1(r) {
	if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _iterableToArrayLimit$1(r, l) {
	var t$1 = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t$1) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t$1 = t$1.call(r)).next, 0 === l);
			else for (; !(f = (e = i.call(t$1)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r$1) {
			o = !0, n = r$1;
		} finally {
			try {
				if (!f && null != t$1.return && (u = t$1.return(), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _nonIterableRest$1() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread$1() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _objectWithoutProperties(e, t$1) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose(e, t$1);
	if (Object.getOwnPropertySymbols) {
		var s = Object.getOwnPropertySymbols(e);
		for (r = 0; r < s.length; r++) o = s[r], t$1.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose(r, e) {
	if (null == r) return {};
	var t$1 = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (e.includes(n)) continue;
		t$1[n] = r[n];
	}
	return t$1;
}
function _slicedToArray$1(r, e) {
	return _arrayWithHoles$1(r) || _iterableToArrayLimit$1(r, e) || _unsupportedIterableToArray$1(r, e) || _nonIterableRest$1();
}
function _toConsumableArray$1(r) {
	return _arrayWithoutHoles$1(r) || _iterableToArray$1(r) || _unsupportedIterableToArray$1(r) || _nonIterableSpread$1();
}
function _toPrimitive$1(t$1, r) {
	if ("object" != typeof t$1 || !t$1) return t$1;
	var e = t$1[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t$1, r);
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return String(t$1);
}
function _toPropertyKey$1(t$1) {
	var i = _toPrimitive$1(t$1, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray$1(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray$1(r, a);
		var t$1 = {}.toString.call(r).slice(8, -1);
		return "Object" === t$1 && r.constructor && (t$1 = r.constructor.name), "Map" === t$1 || "Set" === t$1 ? Array.from(r) : "Arguments" === t$1 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t$1) ? _arrayLikeToArray$1(r, a) : void 0;
	}
}
var index$4 = (function() {
	var list = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
	var keyAccessors = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
	var multiItem = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
	var flattenKeys = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
	var keys = (keyAccessors instanceof Array ? keyAccessors.length ? keyAccessors : [void 0] : [keyAccessors]).map(function(key) {
		return {
			keyAccessor: key,
			isProp: !(key instanceof Function)
		};
	});
	var indexedResult = list.reduce(function(res, item) {
		var iterObj = res;
		var itemVal = item;
		keys.forEach(function(_ref, idx) {
			var keyAccessor = _ref.keyAccessor, isProp = _ref.isProp;
			var key;
			if (isProp) {
				var _itemVal = itemVal, propVal = _itemVal[keyAccessor], rest = _objectWithoutProperties(_itemVal, [keyAccessor].map(_toPropertyKey$1));
				key = propVal;
				itemVal = rest;
			} else key = keyAccessor(itemVal, idx);
			if (idx + 1 < keys.length) {
				if (!iterObj.hasOwnProperty(key)) iterObj[key] = {};
				iterObj = iterObj[key];
			} else if (multiItem) {
				if (!iterObj.hasOwnProperty(key)) iterObj[key] = [];
				iterObj[key].push(itemVal);
			} else iterObj[key] = itemVal;
		});
		return res;
	}, {});
	if (multiItem instanceof Function) (function reduce(node) {
		var level = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
		if (level === keys.length) Object.keys(node).forEach(function(k) {
			return node[k] = multiItem(node[k]);
		});
		else Object.values(node).forEach(function(child) {
			return reduce(child, level + 1);
		});
	})(indexedResult);
	var result = indexedResult;
	if (flattenKeys) {
		result = [];
		(function flatten(node) {
			var accKeys = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
			if (accKeys.length === keys.length) result.push({
				keys: accKeys,
				vals: node
			});
			else Object.entries(node).forEach(function(_ref2) {
				var _ref3 = _slicedToArray$1(_ref2, 2), key = _ref3[0], val = _ref3[1];
				return flatten(val, [].concat(_toConsumableArray$1(accKeys), [key]));
			});
		})(indexedResult);
		if (keyAccessors instanceof Array && keyAccessors.length === 0 && result.length === 1) result[0].keys = [];
	}
	return result;
});
function styleInject(css, ref) {
	if (ref === void 0) ref = {};
	var insertAt = ref.insertAt;
	if (typeof document === "undefined") return;
	var head = document.head || document.getElementsByTagName("head")[0];
	var style = document.createElement("style");
	style.type = "text/css";
	if (insertAt === "top") if (head.firstChild) head.insertBefore(style, head.firstChild);
	else head.appendChild(style);
	else head.appendChild(style);
	if (style.styleSheet) style.styleSheet.cssText = css;
	else style.appendChild(document.createTextNode(css));
}
styleInject(".force-graph-container canvas {\n  display: block;\n  user-select: none;\n  outline: none;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.force-graph-container .clickable {\n  cursor: pointer;\n}\n\n.force-graph-container .grabbable {\n  cursor: move;\n  cursor: grab;\n  cursor: -moz-grab;\n  cursor: -webkit-grab;\n}\n\n.force-graph-container .grabbable:active {\n  cursor: grabbing;\n  cursor: -moz-grabbing;\n  cursor: -webkit-grabbing;\n}\n");
function _arrayLikeToArray(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
function _arrayWithHoles(r) {
	if (Array.isArray(r)) return r;
}
function _arrayWithoutHoles(r) {
	if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _construct(t$1, e, r) {
	if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
	var o = [null];
	o.push.apply(o, e);
	return new (t$1.bind.apply(t$1, o))();
}
function _defineProperty(e, r, t$1) {
	return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t$1,
		enumerable: true,
		configurable: true,
		writable: true
	}) : e[r] = t$1, e;
}
function _isNativeReflectConstruct() {
	try {
		var t$1 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t$2) {}
	return (_isNativeReflectConstruct = function() {
		return !!t$1;
	})();
}
function _iterableToArray(r) {
	if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _iterableToArrayLimit(r, l) {
	var t$1 = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t$1) {
		var e, n, i, u, a = [], f = true, o = false;
		try {
			if (i = (t$1 = t$1.call(r)).next, 0 === l);
			else for (; !(f = (e = i.call(t$1)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r$1) {
			o = true, n = r$1;
		} finally {
			try {
				if (!f && null != t$1.return && (u = t$1.return(), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _nonIterableRest() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
	var t$1 = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r$1) {
			return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
		})), t$1.push.apply(t$1, o);
	}
	return t$1;
}
function _objectSpread2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t$1 = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t$1), true).forEach(function(r$1) {
			_defineProperty(e, r$1, t$1[r$1]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t$1)) : ownKeys(Object(t$1)).forEach(function(r$1) {
			Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t$1, r$1));
		});
	}
	return e;
}
function _slicedToArray(r, e) {
	return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toConsumableArray(r) {
	return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t$1, r) {
	if ("object" != typeof t$1 || !t$1) return t$1;
	var e = t$1[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t$1, r);
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t$1);
}
function _toPropertyKey(t$1) {
	var i = _toPrimitive(t$1, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
		return typeof o$1;
	} : function(o$1) {
		return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
	}, _typeof(o);
}
function _unsupportedIterableToArray(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray(r, a);
		var t$1 = {}.toString.call(r).slice(8, -1);
		return "Object" === t$1 && r.constructor && (t$1 = r.constructor.name), "Map" === t$1 || "Set" === t$1 ? Array.from(r) : "Arguments" === t$1 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t$1) ? _arrayLikeToArray(r, a) : void 0;
	}
}
var autoColorScale = ordinal(Paired_default);
function autoColorObjects(objects, colorByAccessor, colorField) {
	if (!colorByAccessor || typeof colorField !== "string") return;
	objects.filter(function(obj) {
		return !obj[colorField];
	}).forEach(function(obj) {
		obj[colorField] = autoColorScale(colorByAccessor(obj));
	});
}
function getDagDepths(_ref, idAccessor) {
	var nodes = _ref.nodes, links = _ref.links;
	var _ref2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, _ref2$nodeFilter = _ref2.nodeFilter, nodeFilter = _ref2$nodeFilter === void 0 ? function() {
		return true;
	} : _ref2$nodeFilter, _ref2$onLoopError = _ref2.onLoopError, onLoopError = _ref2$onLoopError === void 0 ? function(loopIds) {
		throw "Invalid DAG structure! Found cycle in node path: ".concat(loopIds.join(" -> "), ".");
	} : _ref2$onLoopError;
	var graph = {};
	nodes.forEach(function(node) {
		return graph[idAccessor(node)] = {
			data: node,
			out: [],
			depth: -1,
			skip: !nodeFilter(node)
		};
	});
	links.forEach(function(_ref3) {
		var source = _ref3.source, target = _ref3.target;
		var sourceId = getNodeId(source);
		var targetId = getNodeId(target);
		if (!graph.hasOwnProperty(sourceId)) throw "Missing source node with id: ".concat(sourceId);
		if (!graph.hasOwnProperty(targetId)) throw "Missing target node with id: ".concat(targetId);
		var sourceNode = graph[sourceId];
		var targetNode = graph[targetId];
		sourceNode.out.push(targetNode);
		function getNodeId(node) {
			return _typeof(node) === "object" ? idAccessor(node) : node;
		}
	});
	var foundLoops = [];
	traverse(Object.values(graph));
	return Object.assign.apply(Object, [{}].concat(_toConsumableArray(Object.entries(graph).filter(function(_ref4) {
		return !_slicedToArray(_ref4, 2)[1].skip;
	}).map(function(_ref6) {
		var _ref7 = _slicedToArray(_ref6, 2), id$1 = _ref7[0], node = _ref7[1];
		return _defineProperty({}, id$1, node.depth);
	}))));
	function traverse(nodes$1) {
		var nodeStack = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
		var currentDepth = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
		var _loop = function _loop$1() {
			var node = nodes$1[i];
			if (nodeStack.indexOf(node) !== -1) {
				var loop = [].concat(_toConsumableArray(nodeStack.slice(nodeStack.indexOf(node))), [node]).map(function(d) {
					return idAccessor(d.data);
				});
				if (!foundLoops.some(function(foundLoop) {
					return foundLoop.length === loop.length && foundLoop.every(function(id$1, idx) {
						return id$1 === loop[idx];
					});
				})) {
					foundLoops.push(loop);
					onLoopError(loop);
				}
				return 1;
			}
			if (currentDepth > node.depth) {
				node.depth = currentDepth;
				traverse(node.out, [].concat(_toConsumableArray(nodeStack), [node]), currentDepth + (node.skip ? 0 : 1));
			}
		};
		for (var i = 0, l = nodes$1.length; i < l; i++) if (_loop()) continue;
	}
}
var DAG_LEVEL_NODE_RATIO = 2;
var notifyRedraw = function notifyRedraw$1(_, state) {
	return state.onNeedsRedraw && state.onNeedsRedraw();
};
var updDataPhotons = function updDataPhotons$1(_, state) {
	if (!state.isShadow) {
		var linkParticlesAccessor = index$2(state.linkDirectionalParticles);
		state.graphData.links.forEach(function(link) {
			var numPhotons = Math.round(Math.abs(linkParticlesAccessor(link)));
			if (numPhotons) link.__photons = _toConsumableArray(Array(numPhotons)).map(function() {
				return {};
			});
			else delete link.__photons;
		});
	}
};
var CanvasForceGraph = index$1({
	props: {
		graphData: {
			"default": {
				nodes: [],
				links: []
			},
			onChange: function onChange(_, state) {
				state.engineRunning = false;
				updDataPhotons(_, state);
			}
		},
		dagMode: { onChange: function onChange(dagMode, state) {
			!dagMode && (state.graphData.nodes || []).forEach(function(n) {
				n.fx = n.fy = void 0;
			});
		} },
		dagLevelDistance: {},
		dagNodeFilter: { "default": function _default$1(node) {
			return true;
		} },
		onDagError: { triggerUpdate: false },
		nodeRelSize: {
			"default": 4,
			triggerUpdate: false,
			onChange: notifyRedraw
		},
		nodeId: { "default": "id" },
		nodeVal: {
			"default": "val",
			triggerUpdate: false,
			onChange: notifyRedraw
		},
		nodeColor: {
			"default": "color",
			triggerUpdate: false,
			onChange: notifyRedraw
		},
		nodeAutoColorBy: {},
		nodeCanvasObject: {
			triggerUpdate: false,
			onChange: notifyRedraw
		},
		nodeCanvasObjectMode: {
			"default": function _default$1() {
				return "replace";
			},
			triggerUpdate: false,
			onChange: notifyRedraw
		},
		nodeVisibility: {
			"default": true,
			triggerUpdate: false,
			onChange: notifyRedraw
		},
		linkSource: { "default": "source" },
		linkTarget: { "default": "target" },
		linkVisibility: {
			"default": true,
			triggerUpdate: false,
			onChange: notifyRedraw
		},
		linkColor: {
			"default": "color",
			triggerUpdate: false,
			onChange: notifyRedraw
		},
		linkAutoColorBy: {},
		linkLineDash: {
			triggerUpdate: false,
			onChange: notifyRedraw
		},
		linkWidth: {
			"default": 1,
			triggerUpdate: false,
			onChange: notifyRedraw
		},
		linkCurvature: {
			"default": 0,
			triggerUpdate: false,
			onChange: notifyRedraw
		},
		linkCanvasObject: {
			triggerUpdate: false,
			onChange: notifyRedraw
		},
		linkCanvasObjectMode: {
			"default": function _default$1() {
				return "replace";
			},
			triggerUpdate: false,
			onChange: notifyRedraw
		},
		linkDirectionalArrowLength: {
			"default": 0,
			triggerUpdate: false,
			onChange: notifyRedraw
		},
		linkDirectionalArrowColor: {
			triggerUpdate: false,
			onChange: notifyRedraw
		},
		linkDirectionalArrowRelPos: {
			"default": .5,
			triggerUpdate: false,
			onChange: notifyRedraw
		},
		linkDirectionalParticles: {
			"default": 0,
			triggerUpdate: false,
			onChange: updDataPhotons
		},
		linkDirectionalParticleSpeed: {
			"default": .01,
			triggerUpdate: false
		},
		linkDirectionalParticleOffset: {
			"default": 0,
			triggerUpdate: false
		},
		linkDirectionalParticleWidth: {
			"default": 4,
			triggerUpdate: false
		},
		linkDirectionalParticleColor: { triggerUpdate: false },
		linkDirectionalParticleCanvasObject: { triggerUpdate: false },
		globalScale: {
			"default": 1,
			triggerUpdate: false
		},
		d3AlphaMin: {
			"default": 0,
			triggerUpdate: false
		},
		d3AlphaDecay: {
			"default": .0228,
			triggerUpdate: false,
			onChange: function onChange(alphaDecay, state) {
				state.forceLayout.alphaDecay(alphaDecay);
			}
		},
		d3AlphaTarget: {
			"default": 0,
			triggerUpdate: false,
			onChange: function onChange(alphaTarget, state) {
				state.forceLayout.alphaTarget(alphaTarget);
			}
		},
		d3VelocityDecay: {
			"default": .4,
			triggerUpdate: false,
			onChange: function onChange(velocityDecay, state) {
				state.forceLayout.velocityDecay(velocityDecay);
			}
		},
		warmupTicks: {
			"default": 0,
			triggerUpdate: false
		},
		cooldownTicks: {
			"default": Infinity,
			triggerUpdate: false
		},
		cooldownTime: {
			"default": 15e3,
			triggerUpdate: false
		},
		onUpdate: {
			"default": function _default$1() {},
			triggerUpdate: false
		},
		onFinishUpdate: {
			"default": function _default$1() {},
			triggerUpdate: false
		},
		onEngineTick: {
			"default": function _default$1() {},
			triggerUpdate: false
		},
		onEngineStop: {
			"default": function _default$1() {},
			triggerUpdate: false
		},
		onNeedsRedraw: { triggerUpdate: false },
		isShadow: {
			"default": false,
			triggerUpdate: false
		}
	},
	methods: {
		d3Force: function d3Force(state, forceName, forceFn) {
			if (forceFn === void 0) return state.forceLayout.force(forceName);
			state.forceLayout.force(forceName, forceFn);
			return this;
		},
		d3ReheatSimulation: function d3ReheatSimulation(state) {
			state.forceLayout.alpha(1);
			this.resetCountdown();
			return this;
		},
		resetCountdown: function resetCountdown(state) {
			state.cntTicks = 0;
			state.startTickTime = /* @__PURE__ */ new Date();
			state.engineRunning = true;
			return this;
		},
		isEngineRunning: function isEngineRunning(state) {
			return !!state.engineRunning;
		},
		tickFrame: function tickFrame(state) {
			!state.isShadow && layoutTick();
			paintLinks();
			!state.isShadow && paintArrows();
			!state.isShadow && paintPhotons();
			paintNodes();
			return this;
			function layoutTick() {
				if (state.engineRunning) if (++state.cntTicks > state.cooldownTicks || /* @__PURE__ */ new Date() - state.startTickTime > state.cooldownTime || state.d3AlphaMin > 0 && state.forceLayout.alpha() < state.d3AlphaMin) {
					state.engineRunning = false;
					state.onEngineStop();
				} else {
					state.forceLayout.tick();
					state.onEngineTick();
				}
			}
			function paintNodes() {
				var getVisibility = index$2(state.nodeVisibility);
				var getVal = index$2(state.nodeVal);
				var getColor = index$2(state.nodeColor);
				var getNodeCanvasObjectMode = index$2(state.nodeCanvasObjectMode);
				var ctx = state.ctx;
				var padAmount = state.isShadow / state.globalScale;
				var visibleNodes = state.graphData.nodes.filter(getVisibility);
				ctx.save();
				visibleNodes.forEach(function(node) {
					var nodeCanvasObjectMode = getNodeCanvasObjectMode(node);
					if (state.nodeCanvasObject && (nodeCanvasObjectMode === "before" || nodeCanvasObjectMode === "replace")) {
						state.nodeCanvasObject(node, ctx, state.globalScale);
						if (nodeCanvasObjectMode === "replace") {
							ctx.restore();
							return;
						}
					}
					var r = Math.sqrt(Math.max(0, getVal(node) || 1)) * state.nodeRelSize + padAmount;
					ctx.beginPath();
					ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
					ctx.fillStyle = getColor(node) || "rgba(31, 120, 180, 0.92)";
					ctx.fill();
					if (state.nodeCanvasObject && nodeCanvasObjectMode === "after") state.nodeCanvasObject(node, state.ctx, state.globalScale);
				});
				ctx.restore();
			}
			function paintLinks() {
				var getVisibility = index$2(state.linkVisibility);
				var getColor = index$2(state.linkColor);
				var getWidth = index$2(state.linkWidth);
				var getLineDash = index$2(state.linkLineDash);
				var getCurvature = index$2(state.linkCurvature);
				var getLinkCanvasObjectMode = index$2(state.linkCanvasObjectMode);
				var ctx = state.ctx;
				var padAmount = state.isShadow * 2;
				var visibleLinks = state.graphData.links.filter(getVisibility);
				visibleLinks.forEach(calcLinkControlPoints);
				var beforeCustomLinks = [], afterCustomLinks = [], defaultPaintLinks = visibleLinks;
				if (state.linkCanvasObject) {
					var replaceCustomLinks = [], otherCustomLinks = [];
					visibleLinks.forEach(function(d) {
						return ({
							before: beforeCustomLinks,
							after: afterCustomLinks,
							replace: replaceCustomLinks
						}[getLinkCanvasObjectMode(d)] || otherCustomLinks).push(d);
					});
					defaultPaintLinks = [].concat(_toConsumableArray(beforeCustomLinks), afterCustomLinks, otherCustomLinks);
					beforeCustomLinks = beforeCustomLinks.concat(replaceCustomLinks);
				}
				ctx.save();
				beforeCustomLinks.forEach(function(link) {
					return state.linkCanvasObject(link, ctx, state.globalScale);
				});
				ctx.restore();
				var linksPerColor = index$4(defaultPaintLinks, [
					getColor,
					getWidth,
					getLineDash
				]);
				ctx.save();
				Object.entries(linksPerColor).forEach(function(_ref) {
					var _ref2 = _slicedToArray(_ref, 2), color$1 = _ref2[0], linksPerWidth = _ref2[1];
					var lineColor = !color$1 || color$1 === "undefined" ? "rgba(0,0,0,0.15)" : color$1;
					Object.entries(linksPerWidth).forEach(function(_ref3) {
						var _ref4 = _slicedToArray(_ref3, 2), width = _ref4[0], linesPerLineDash = _ref4[1];
						var lineWidth = (width || 1) / state.globalScale + padAmount;
						Object.entries(linesPerLineDash).forEach(function(_ref5) {
							var _ref6 = _slicedToArray(_ref5, 2);
							_ref6[0];
							var links = _ref6[1];
							var lineDashSegments = getLineDash(links[0]);
							ctx.beginPath();
							links.forEach(function(link) {
								var start$1 = link.source;
								var end = link.target;
								if (!start$1 || !end || !start$1.hasOwnProperty("x") || !end.hasOwnProperty("x")) return;
								ctx.moveTo(start$1.x, start$1.y);
								var controlPoints = link.__controlPoints;
								if (!controlPoints) ctx.lineTo(end.x, end.y);
								else ctx[controlPoints.length === 2 ? "quadraticCurveTo" : "bezierCurveTo"].apply(ctx, _toConsumableArray(controlPoints).concat([end.x, end.y]));
							});
							ctx.strokeStyle = lineColor;
							ctx.lineWidth = lineWidth;
							ctx.setLineDash(lineDashSegments || []);
							ctx.stroke();
						});
					});
				});
				ctx.restore();
				ctx.save();
				afterCustomLinks.forEach(function(link) {
					return state.linkCanvasObject(link, ctx, state.globalScale);
				});
				ctx.restore();
				function calcLinkControlPoints(link) {
					var curvature = getCurvature(link);
					if (!curvature) {
						link.__controlPoints = null;
						return;
					}
					var start$1 = link.source;
					var end = link.target;
					if (!start$1 || !end || !start$1.hasOwnProperty("x") || !end.hasOwnProperty("x")) return;
					var l = Math.sqrt(Math.pow(end.x - start$1.x, 2) + Math.pow(end.y - start$1.y, 2));
					if (l > 0) {
						var a = Math.atan2(end.y - start$1.y, end.x - start$1.x);
						var d = l * curvature;
						var cp = {
							x: (start$1.x + end.x) / 2 + d * Math.cos(a - Math.PI / 2),
							y: (start$1.y + end.y) / 2 + d * Math.sin(a - Math.PI / 2)
						};
						link.__controlPoints = [cp.x, cp.y];
					} else {
						var _d = curvature * 70;
						link.__controlPoints = [
							end.x,
							end.y - _d,
							end.x + _d,
							end.y
						];
					}
				}
			}
			function paintArrows() {
				var ARROW_WH_RATIO = 1.6;
				var ARROW_VLEN_RATIO = .2;
				var getLength = index$2(state.linkDirectionalArrowLength);
				var getRelPos = index$2(state.linkDirectionalArrowRelPos);
				var getVisibility = index$2(state.linkVisibility);
				var getColor = index$2(state.linkDirectionalArrowColor || state.linkColor);
				var getNodeVal = index$2(state.nodeVal);
				var ctx = state.ctx;
				ctx.save();
				state.graphData.links.filter(getVisibility).forEach(function(link) {
					var arrowLength = getLength(link);
					if (!arrowLength || arrowLength < 0) return;
					var start$1 = link.source;
					var end = link.target;
					if (!start$1 || !end || !start$1.hasOwnProperty("x") || !end.hasOwnProperty("x")) return;
					var startR = Math.sqrt(Math.max(0, getNodeVal(start$1) || 1)) * state.nodeRelSize;
					var endR = Math.sqrt(Math.max(0, getNodeVal(end) || 1)) * state.nodeRelSize;
					var arrowRelPos = Math.min(1, Math.max(0, getRelPos(link)));
					var arrowColor = getColor(link) || "rgba(0,0,0,0.28)";
					var arrowHalfWidth = arrowLength / ARROW_WH_RATIO / 2;
					var bzLine = link.__controlPoints && _construct(Bezier, [start$1.x, start$1.y].concat(_toConsumableArray(link.__controlPoints), [end.x, end.y]));
					var getCoordsAlongLine = bzLine ? function(t$1) {
						return bzLine.get(t$1);
					} : function(t$1) {
						return {
							x: start$1.x + (end.x - start$1.x) * t$1 || 0,
							y: start$1.y + (end.y - start$1.y) * t$1 || 0
						};
					};
					var lineLen = bzLine ? bzLine.length() : Math.sqrt(Math.pow(end.x - start$1.x, 2) + Math.pow(end.y - start$1.y, 2));
					var posAlongLine = startR + arrowLength + (lineLen - startR - endR - arrowLength) * arrowRelPos;
					var arrowHead = getCoordsAlongLine(posAlongLine / lineLen);
					var arrowTail = getCoordsAlongLine((posAlongLine - arrowLength) / lineLen);
					var arrowTailVertex = getCoordsAlongLine((posAlongLine - arrowLength * (1 - ARROW_VLEN_RATIO)) / lineLen);
					var arrowTailAngle = Math.atan2(arrowHead.y - arrowTail.y, arrowHead.x - arrowTail.x) - Math.PI / 2;
					ctx.beginPath();
					ctx.moveTo(arrowHead.x, arrowHead.y);
					ctx.lineTo(arrowTail.x + arrowHalfWidth * Math.cos(arrowTailAngle), arrowTail.y + arrowHalfWidth * Math.sin(arrowTailAngle));
					ctx.lineTo(arrowTailVertex.x, arrowTailVertex.y);
					ctx.lineTo(arrowTail.x - arrowHalfWidth * Math.cos(arrowTailAngle), arrowTail.y - arrowHalfWidth * Math.sin(arrowTailAngle));
					ctx.fillStyle = arrowColor;
					ctx.fill();
				});
				ctx.restore();
			}
			function paintPhotons() {
				var getNumPhotons = index$2(state.linkDirectionalParticles);
				var getSpeed = index$2(state.linkDirectionalParticleSpeed);
				var getOffset = index$2(state.linkDirectionalParticleOffset);
				var getDiameter = index$2(state.linkDirectionalParticleWidth);
				var getVisibility = index$2(state.linkVisibility);
				var getColor = index$2(state.linkDirectionalParticleColor || state.linkColor);
				var ctx = state.ctx;
				ctx.save();
				state.graphData.links.filter(getVisibility).forEach(function(link) {
					var numCyclePhotons = getNumPhotons(link);
					if (!link.hasOwnProperty("__photons") || !link.__photons.length) return;
					var start$1 = link.source;
					var end = link.target;
					if (!start$1 || !end || !start$1.hasOwnProperty("x") || !end.hasOwnProperty("x")) return;
					var particleSpeed = getSpeed(link);
					var particleOffset = Math.abs(getOffset(link));
					var photons = link.__photons || [];
					var photonR = Math.max(0, getDiameter(link) / 2) / Math.sqrt(state.globalScale);
					ctx.fillStyle = getColor(link) || "rgba(0,0,0,0.28)";
					var bzLine = link.__controlPoints ? _construct(Bezier, [start$1.x, start$1.y].concat(_toConsumableArray(link.__controlPoints), [end.x, end.y])) : null;
					var cyclePhotonIdx = 0;
					var needsCleanup = false;
					photons.forEach(function(photon) {
						var singleHop = !!photon.__singleHop;
						if (!photon.hasOwnProperty("__progressRatio")) photon.__progressRatio = singleHop ? particleSpeed < 0 ? 1 : 0 : (cyclePhotonIdx + particleOffset) / numCyclePhotons;
						!singleHop && cyclePhotonIdx++;
						photon.__progressRatio += particleSpeed;
						if (photon.__progressRatio >= 1 || photon.__progressRatio < 0) if (!singleHop) {
							photon.__progressRatio = photon.__progressRatio % 1;
							photon.__progressRatio < 0 && photon.__progressRatio++;
						} else {
							needsCleanup = true;
							return;
						}
						var photonPosRatio = photon.__progressRatio;
						var coords = bzLine ? bzLine.get(photonPosRatio) : {
							x: start$1.x + (end.x - start$1.x) * photonPosRatio || 0,
							y: start$1.y + (end.y - start$1.y) * photonPosRatio || 0
						};
						if (state.linkDirectionalParticleCanvasObject) state.linkDirectionalParticleCanvasObject(coords.x, coords.y, link, ctx, state.globalScale);
						else {
							ctx.beginPath();
							ctx.arc(coords.x, coords.y, photonR, 0, 2 * Math.PI, false);
							ctx.fill();
						}
					});
					if (needsCleanup) link.__photons = link.__photons.filter(function(photon) {
						return !photon.__singleHop || photon.__progressRatio <= 1 && photon.__progressRatio >= 0;
					});
				});
				ctx.restore();
			}
		},
		emitParticle: function emitParticle(state, link) {
			if (link) {
				!link.__photons && (link.__photons = []);
				link.__photons.push({ __singleHop: true });
			}
			return this;
		}
	},
	stateInit: function stateInit() {
		return {
			forceLayout: simulation_default().force("link", link_default()).force("charge", manyBody_default()).force("center", center_default()).force("dagRadial", null).stop(),
			engineRunning: false
		};
	},
	init: function init$1(canvasCtx, state) {
		state.ctx = canvasCtx;
	},
	update: function update(state, changedProps) {
		state.engineRunning = false;
		state.onUpdate();
		if (state.nodeAutoColorBy !== null) autoColorObjects(state.graphData.nodes, index$2(state.nodeAutoColorBy), state.nodeColor);
		if (state.linkAutoColorBy !== null) autoColorObjects(state.graphData.links, index$2(state.linkAutoColorBy), state.linkColor);
		state.graphData.links.forEach(function(link) {
			link.source = link[state.linkSource];
			link.target = link[state.linkTarget];
		});
		state.forceLayout.stop().alpha(1).nodes(state.graphData.nodes);
		var linkForce = state.forceLayout.force("link");
		if (linkForce) linkForce.id(function(d) {
			return d[state.nodeId];
		}).links(state.graphData.links);
		var nodeDepths = state.dagMode && getDagDepths(state.graphData, function(node) {
			return node[state.nodeId];
		}, {
			nodeFilter: state.dagNodeFilter,
			onLoopError: state.onDagError || void 0
		});
		var maxDepth = Math.max.apply(Math, _toConsumableArray(Object.values(nodeDepths || [])));
		var dagLevelDistance = state.dagLevelDistance || state.graphData.nodes.length / (maxDepth || 1) * DAG_LEVEL_NODE_RATIO * (["radialin", "radialout"].indexOf(state.dagMode) !== -1 ? .7 : 1);
		if ([
			"lr",
			"rl",
			"td",
			"bu"
		].includes(changedProps.dagMode)) {
			var resetProp = ["lr", "rl"].includes(changedProps.dagMode) ? "fx" : "fy";
			state.graphData.nodes.filter(state.dagNodeFilter).forEach(function(node) {
				return delete node[resetProp];
			});
		}
		if ([
			"lr",
			"rl",
			"td",
			"bu"
		].includes(state.dagMode)) {
			var invert = ["rl", "bu"].includes(state.dagMode);
			var fixFn = function fixFn$1(node) {
				return (nodeDepths[node[state.nodeId]] - maxDepth / 2) * dagLevelDistance * (invert ? -1 : 1);
			};
			var _resetProp = ["lr", "rl"].includes(state.dagMode) ? "fx" : "fy";
			state.graphData.nodes.filter(state.dagNodeFilter).forEach(function(node) {
				return node[_resetProp] = fixFn(node);
			});
		}
		state.forceLayout.force("dagRadial", ["radialin", "radialout"].indexOf(state.dagMode) !== -1 ? radial_default(function(node) {
			var nodeDepth = nodeDepths[node[state.nodeId]] || -1;
			return (state.dagMode === "radialin" ? maxDepth - nodeDepth : nodeDepth) * dagLevelDistance;
		}).strength(function(node) {
			return state.dagNodeFilter(node) ? 1 : 0;
		}) : null);
		for (var i = 0; i < state.warmupTicks && !(state.d3AlphaMin > 0 && state.forceLayout.alpha() < state.d3AlphaMin); i++) state.forceLayout.tick();
		this.resetCountdown();
		state.onFinishUpdate();
	}
});
function linkKapsule(kapsulePropNames, kapsuleType) {
	var propNames = kapsulePropNames instanceof Array ? kapsulePropNames : [kapsulePropNames];
	var dummyK = new kapsuleType();
	dummyK._destructor && dummyK._destructor();
	return {
		linkProp: function linkProp(prop) {
			return {
				"default": dummyK[prop](),
				onChange: function onChange(v, state) {
					propNames.forEach(function(propName) {
						return state[propName][prop](v);
					});
				},
				triggerUpdate: false
			};
		},
		linkMethod: function linkMethod(method) {
			return function(state) {
				for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
				var returnVals = [];
				propNames.forEach(function(propName) {
					var kapsuleInstance = state[propName];
					var returnVal = kapsuleInstance[method].apply(kapsuleInstance, args);
					if (returnVal !== kapsuleInstance) returnVals.push(returnVal);
				});
				return returnVals.length ? returnVals[0] : this;
			};
		}
	};
}
var HOVER_CANVAS_THROTTLE_DELAY = 800;
var ZOOM2NODES_FACTOR = 4;
var DRAG_CLICK_TOLERANCE_PX = 5;
var bindFG = linkKapsule("forceGraph", CanvasForceGraph);
var bindBoth = linkKapsule(["forceGraph", "shadowGraph"], CanvasForceGraph);
var linkedProps = Object.assign.apply(Object, _toConsumableArray([
	"nodeColor",
	"nodeAutoColorBy",
	"nodeCanvasObject",
	"nodeCanvasObjectMode",
	"linkColor",
	"linkAutoColorBy",
	"linkLineDash",
	"linkWidth",
	"linkCanvasObject",
	"linkCanvasObjectMode",
	"linkDirectionalArrowLength",
	"linkDirectionalArrowColor",
	"linkDirectionalArrowRelPos",
	"linkDirectionalParticles",
	"linkDirectionalParticleSpeed",
	"linkDirectionalParticleOffset",
	"linkDirectionalParticleWidth",
	"linkDirectionalParticleColor",
	"linkDirectionalParticleCanvasObject",
	"dagMode",
	"dagLevelDistance",
	"dagNodeFilter",
	"onDagError",
	"d3AlphaMin",
	"d3AlphaDecay",
	"d3VelocityDecay",
	"warmupTicks",
	"cooldownTicks",
	"cooldownTime",
	"onEngineTick",
	"onEngineStop"
].map(function(p) {
	return _defineProperty({}, p, bindFG.linkProp(p));
})).concat(_toConsumableArray([
	"nodeRelSize",
	"nodeId",
	"nodeVal",
	"nodeVisibility",
	"linkSource",
	"linkTarget",
	"linkVisibility",
	"linkCurvature"
].map(function(p) {
	return _defineProperty({}, p, bindBoth.linkProp(p));
}))));
var linkedMethods = Object.assign.apply(Object, _toConsumableArray([
	"d3Force",
	"d3ReheatSimulation",
	"emitParticle"
].map(function(p) {
	return _defineProperty({}, p, bindFG.linkMethod(p));
})));
function adjustCanvasSize(state) {
	if (state.canvas) {
		var curWidth = state.canvas.width;
		var curHeight = state.canvas.height;
		if (curWidth === 300 && curHeight === 150) curWidth = curHeight = 0;
		var pxScale = window.devicePixelRatio;
		curWidth /= pxScale;
		curHeight /= pxScale;
		[state.canvas, state.shadowCanvas].forEach(function(canvas) {
			canvas.style.width = "".concat(state.width, "px");
			canvas.style.height = "".concat(state.height, "px");
			canvas.width = state.width * pxScale;
			canvas.height = state.height * pxScale;
			if (!curWidth && !curHeight) canvas.getContext("2d").scale(pxScale, pxScale);
		});
		var k = transform(state.canvas).k;
		state.zoom.translateBy(state.zoom.__baseElem, (state.width - curWidth) / 2 / k, (state.height - curHeight) / 2 / k);
		state.needsRedraw = true;
	}
}
function resetTransform(ctx) {
	var pxRatio = window.devicePixelRatio;
	ctx.setTransform(pxRatio, 0, 0, pxRatio, 0, 0);
}
function clearCanvas(ctx, width, height) {
	ctx.save();
	resetTransform(ctx);
	ctx.clearRect(0, 0, width, height);
	ctx.restore();
}
var forceGraph = index$1({
	props: _objectSpread2({
		width: {
			"default": window.innerWidth,
			onChange: function onChange(_, state) {
				return adjustCanvasSize(state);
			},
			triggerUpdate: false
		},
		height: {
			"default": window.innerHeight,
			onChange: function onChange(_, state) {
				return adjustCanvasSize(state);
			},
			triggerUpdate: false
		},
		graphData: {
			"default": {
				nodes: [],
				links: []
			},
			onChange: function onChange(d, state) {
				[d.nodes, d.links].every(function(arr) {
					return (arr || []).every(function(d$1) {
						return !d$1.hasOwnProperty("__indexColor");
					});
				}) && state.colorTracker.reset();
				[{
					type: "Node",
					objs: d.nodes
				}, {
					type: "Link",
					objs: d.links
				}].forEach(hexIndex);
				state.forceGraph.graphData(d);
				state.shadowGraph.graphData(d);
				function hexIndex(_ref4) {
					var type = _ref4.type;
					_ref4.objs.filter(function(d$1) {
						if (!d$1.hasOwnProperty("__indexColor")) return true;
						var cur = state.colorTracker.lookup(d$1.__indexColor);
						return !cur || !cur.hasOwnProperty("d") || cur.d !== d$1;
					}).forEach(function(d$1) {
						d$1.__indexColor = state.colorTracker.register({
							type,
							d: d$1
						});
					});
				}
			},
			triggerUpdate: false
		},
		backgroundColor: {
			onChange: function onChange(color$1, state) {
				state.canvas && color$1 && (state.canvas.style.background = color$1);
			},
			triggerUpdate: false
		},
		nodeLabel: {
			"default": "name",
			triggerUpdate: false
		},
		nodePointerAreaPaint: {
			onChange: function onChange(paintFn, state) {
				state.shadowGraph.nodeCanvasObject(!paintFn ? null : function(node, ctx, globalScale) {
					return paintFn(node, node.__indexColor, ctx, globalScale);
				});
				state.flushShadowCanvas && state.flushShadowCanvas();
			},
			triggerUpdate: false
		},
		linkPointerAreaPaint: {
			onChange: function onChange(paintFn, state) {
				state.shadowGraph.linkCanvasObject(!paintFn ? null : function(link, ctx, globalScale) {
					return paintFn(link, link.__indexColor, ctx, globalScale);
				});
				state.flushShadowCanvas && state.flushShadowCanvas();
			},
			triggerUpdate: false
		},
		linkLabel: {
			"default": "name",
			triggerUpdate: false
		},
		linkHoverPrecision: {
			"default": 4,
			triggerUpdate: false
		},
		minZoom: {
			"default": .01,
			onChange: function onChange(minZoom, state) {
				state.zoom.scaleExtent([minZoom, state.zoom.scaleExtent()[1]]);
			},
			triggerUpdate: false
		},
		maxZoom: {
			"default": 1e3,
			onChange: function onChange(maxZoom, state) {
				state.zoom.scaleExtent([state.zoom.scaleExtent()[0], maxZoom]);
			},
			triggerUpdate: false
		},
		enableNodeDrag: {
			"default": true,
			triggerUpdate: false
		},
		enableZoomInteraction: {
			"default": true,
			triggerUpdate: false
		},
		enablePanInteraction: {
			"default": true,
			triggerUpdate: false
		},
		enableZoomPanInteraction: {
			"default": true,
			triggerUpdate: false
		},
		enablePointerInteraction: {
			"default": true,
			onChange: function onChange(_, state) {
				state.hoverObj = null;
			},
			triggerUpdate: false
		},
		autoPauseRedraw: {
			"default": true,
			triggerUpdate: false
		},
		onNodeDrag: {
			"default": function _default$1() {},
			triggerUpdate: false
		},
		onNodeDragEnd: {
			"default": function _default$1() {},
			triggerUpdate: false
		},
		onNodeClick: { triggerUpdate: false },
		onNodeRightClick: { triggerUpdate: false },
		onNodeHover: { triggerUpdate: false },
		onLinkClick: { triggerUpdate: false },
		onLinkRightClick: { triggerUpdate: false },
		onLinkHover: { triggerUpdate: false },
		onBackgroundClick: { triggerUpdate: false },
		onBackgroundRightClick: { triggerUpdate: false },
		showPointerCursor: {
			"default": true,
			triggerUpdate: false
		},
		onZoom: { triggerUpdate: false },
		onZoomEnd: { triggerUpdate: false },
		onRenderFramePre: { triggerUpdate: false },
		onRenderFramePost: { triggerUpdate: false }
	}, linkedProps),
	aliases: { stopAnimation: "pauseAnimation" },
	methods: _objectSpread2({
		graph2ScreenCoords: function graph2ScreenCoords(state, x, y) {
			var t$1 = transform(state.canvas);
			return {
				x: x * t$1.k + t$1.x,
				y: y * t$1.k + t$1.y
			};
		},
		screen2GraphCoords: function screen2GraphCoords(state, x, y) {
			var t$1 = transform(state.canvas);
			return {
				x: (x - t$1.x) / t$1.k,
				y: (y - t$1.y) / t$1.k
			};
		},
		centerAt: function centerAt(state, x, y, transitionDuration) {
			if (!state.canvas) return null;
			if (x !== void 0 || y !== void 0) {
				var finalPos = Object.assign({}, x !== void 0 ? { x } : {}, y !== void 0 ? { y } : {});
				if (!transitionDuration) setCenter(finalPos);
				else state.tweenGroup.add(new Tween(getCenter()).to(finalPos, transitionDuration).easing(Easing.Quadratic.Out).onUpdate(setCenter).onComplete(function() {
					state.tweenGroup.remove(this);
				}).start());
				return this;
			}
			return getCenter();
			function getCenter() {
				var t$1 = transform(state.canvas);
				return {
					x: (state.width / 2 - t$1.x) / t$1.k,
					y: (state.height / 2 - t$1.y) / t$1.k
				};
			}
			function setCenter(_ref5) {
				var x$1 = _ref5.x, y$1 = _ref5.y;
				state.zoom.translateTo(state.zoom.__baseElem, x$1 === void 0 ? getCenter().x : x$1, y$1 === void 0 ? getCenter().y : y$1);
				state.needsRedraw = true;
			}
		},
		zoom: function zoom(state, k, transitionDuration) {
			if (!state.canvas) return null;
			if (k !== void 0) {
				if (!transitionDuration) setZoom(k);
				else state.tweenGroup.add(new Tween({ k: getZoom() }).to({ k }, transitionDuration).easing(Easing.Quadratic.Out).onUpdate(function(_ref6) {
					var k$1 = _ref6.k;
					return setZoom(k$1);
				}).onComplete(function() {
					state.tweenGroup.remove(this);
				}).start());
				return this;
			}
			return getZoom();
			function getZoom() {
				return transform(state.canvas).k;
			}
			function setZoom(k$1) {
				state.zoom.scaleTo(state.zoom.__baseElem, k$1);
				state.needsRedraw = true;
			}
		},
		zoomToFit: function zoomToFit(state) {
			var transitionDuration = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
			var padding = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 10;
			for (var _len = arguments.length, bboxArgs = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) bboxArgs[_key - 3] = arguments[_key];
			var bbox = this.getGraphBbox.apply(this, bboxArgs);
			if (bbox) {
				var center = {
					x: (bbox.x[0] + bbox.x[1]) / 2,
					y: (bbox.y[0] + bbox.y[1]) / 2
				};
				var zoomK = Math.max(1e-12, Math.min(0xe8d4a51000, (state.width - padding * 2) / (bbox.x[1] - bbox.x[0]), (state.height - padding * 2) / (bbox.y[1] - bbox.y[0])));
				this.centerAt(center.x, center.y, transitionDuration);
				this.zoom(zoomK, transitionDuration);
			}
			return this;
		},
		getGraphBbox: function getGraphBbox(state) {
			var nodeFilter = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : function() {
				return true;
			};
			var getVal = index$2(state.nodeVal);
			var getR = function getR$1(node) {
				return Math.sqrt(Math.max(0, getVal(node) || 1)) * state.nodeRelSize;
			};
			var nodesPos = state.graphData.nodes.filter(nodeFilter).map(function(node) {
				return {
					x: node.x,
					y: node.y,
					r: getR(node)
				};
			});
			return !nodesPos.length ? null : {
				x: [min(nodesPos, function(node) {
					return node.x - node.r;
				}), max(nodesPos, function(node) {
					return node.x + node.r;
				})],
				y: [min(nodesPos, function(node) {
					return node.y - node.r;
				}), max(nodesPos, function(node) {
					return node.y + node.r;
				})]
			};
		},
		pauseAnimation: function pauseAnimation(state) {
			if (state.animationFrameRequestId) {
				cancelAnimationFrame(state.animationFrameRequestId);
				state.animationFrameRequestId = null;
			}
			return this;
		},
		resumeAnimation: function resumeAnimation(state) {
			if (!state.animationFrameRequestId) this._animationCycle();
			return this;
		},
		_destructor: function _destructor() {
			this.pauseAnimation();
			this.graphData({
				nodes: [],
				links: []
			});
		}
	}, linkedMethods),
	stateInit: function stateInit() {
		return {
			lastSetZoom: 1,
			zoom: zoom_default(),
			forceGraph: new CanvasForceGraph(),
			shadowGraph: new CanvasForceGraph().cooldownTicks(0).nodeColor("__indexColor").linkColor("__indexColor").isShadow(true),
			colorTracker: new _default(),
			tweenGroup: new Group()
		};
	},
	init: function init$1(domNode, state) {
		var _this = this;
		domNode.innerHTML = "";
		var container = document.createElement("div");
		container.classList.add("force-graph-container");
		container.style.position = "relative";
		domNode.appendChild(container);
		state.canvas = document.createElement("canvas");
		if (state.backgroundColor) state.canvas.style.background = state.backgroundColor;
		container.appendChild(state.canvas);
		state.shadowCanvas = document.createElement("canvas");
		var ctx = state.canvas.getContext("2d");
		var shadowCtx = state.shadowCanvas.getContext("2d", { willReadFrequently: true });
		var pointerPos = {
			x: -0xe8d4a51000,
			y: -0xe8d4a51000
		};
		var getObjUnderPointer = function getObjUnderPointer$1() {
			var obj = null;
			var pxScale = window.devicePixelRatio;
			var px = pointerPos.x > 0 && pointerPos.y > 0 ? shadowCtx.getImageData(pointerPos.x * pxScale, pointerPos.y * pxScale, 1, 1) : null;
			px && (obj = state.colorTracker.lookup(px.data));
			return obj;
		};
		select_default(state.canvas).call(drag_default().subject(function() {
			if (!state.enableNodeDrag) return null;
			var obj = getObjUnderPointer();
			return obj && obj.type === "Node" ? obj.d : null;
		}).on("start", function(ev) {
			var obj = ev.subject;
			obj.__initialDragPos = {
				x: obj.x,
				y: obj.y,
				fx: obj.fx,
				fy: obj.fy
			};
			if (!ev.active) {
				obj.fx = obj.x;
				obj.fy = obj.y;
			}
			state.canvas.classList.add("grabbable");
		}).on("drag", function(ev) {
			var obj = ev.subject;
			var initPos = obj.__initialDragPos;
			var dragPos = ev;
			var k = transform(state.canvas).k;
			var translate = {
				x: initPos.x + (dragPos.x - initPos.x) / k - obj.x,
				y: initPos.y + (dragPos.y - initPos.y) / k - obj.y
			};
			["x", "y"].forEach(function(c) {
				return obj["f".concat(c)] = obj[c] = initPos[c] + (dragPos[c] - initPos[c]) / k;
			});
			if (!obj.__dragged && DRAG_CLICK_TOLERANCE_PX >= Math.sqrt(sum(["x", "y"].map(function(k$1) {
				return Math.pow(ev[k$1] - initPos[k$1], 2);
			})))) return;
			state.forceGraph.d3AlphaTarget(.3).resetCountdown();
			state.isPointerDragging = true;
			obj.__dragged = true;
			state.onNodeDrag(obj, translate);
		}).on("end", function(ev) {
			var obj = ev.subject;
			var initPos = obj.__initialDragPos;
			var translate = {
				x: obj.x - initPos.x,
				y: obj.y - initPos.y
			};
			if (initPos.fx === void 0) obj.fx = void 0;
			if (initPos.fy === void 0) obj.fy = void 0;
			delete obj.__initialDragPos;
			if (state.forceGraph.d3AlphaTarget()) state.forceGraph.d3AlphaTarget(0).resetCountdown();
			state.canvas.classList.remove("grabbable");
			state.isPointerDragging = false;
			if (obj.__dragged) {
				delete obj.__dragged;
				state.onNodeDragEnd(obj, translate);
			}
		}));
		state.zoom(state.zoom.__baseElem = select_default(state.canvas));
		state.zoom.__baseElem.on("dblclick.zoom", null);
		state.zoom.filter(function(ev) {
			return !ev.button && state.enableZoomPanInteraction && (ev.type !== "wheel" || index$2(state.enableZoomInteraction)(ev)) && (ev.type === "wheel" || index$2(state.enablePanInteraction)(ev));
		}).on("zoom", function(ev) {
			var t$1 = ev.transform;
			[ctx, shadowCtx].forEach(function(c) {
				resetTransform(c);
				c.translate(t$1.x, t$1.y);
				c.scale(t$1.k, t$1.k);
			});
			state.isPointerDragging = true;
			state.onZoom && state.onZoom(_objectSpread2(_objectSpread2({}, t$1), _this.centerAt()));
			state.needsRedraw = true;
		}).on("end", function(ev) {
			state.isPointerDragging = false;
			state.onZoomEnd && state.onZoomEnd(_objectSpread2(_objectSpread2({}, ev.transform), _this.centerAt()));
		});
		adjustCanvasSize(state);
		state.forceGraph.onNeedsRedraw(function() {
			return state.needsRedraw = true;
		}).onFinishUpdate(function() {
			if (transform(state.canvas).k === state.lastSetZoom && state.graphData.nodes.length) {
				state.zoom.scaleTo(state.zoom.__baseElem, state.lastSetZoom = ZOOM2NODES_FACTOR / Math.cbrt(state.graphData.nodes.length));
				state.needsRedraw = true;
			}
		});
		state.tooltip = new index$3(container);
		["pointermove", "pointerdown"].forEach(function(evType) {
			return container.addEventListener(evType, function(ev) {
				if (evType === "pointerdown") {
					state.isPointerPressed = true;
					state.pointerDownEvent = ev;
				}
				!state.isPointerDragging && ev.type === "pointermove" && state.onBackgroundClick && (ev.pressure > 0 || state.isPointerPressed) && (ev.pointerType === "mouse" || ev.movementX === void 0 || [ev.movementX, ev.movementY].some(function(m) {
					return Math.abs(m) > 1;
				})) && (state.isPointerDragging = true);
				var offset = getOffset(container);
				pointerPos.x = ev.pageX - offset.left;
				pointerPos.y = ev.pageY - offset.top;
				function getOffset(el) {
					var rect = el.getBoundingClientRect(), scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, scrollTop = window.pageYOffset || document.documentElement.scrollTop;
					return {
						top: rect.top + scrollTop,
						left: rect.left + scrollLeft
					};
				}
			}, { passive: true });
		});
		container.addEventListener("pointerup", function(ev) {
			if (!state.isPointerPressed) return;
			state.isPointerPressed = false;
			if (state.isPointerDragging) {
				state.isPointerDragging = false;
				return;
			}
			var cbEvents = [ev, state.pointerDownEvent];
			requestAnimationFrame(function() {
				if (ev.button === 0) if (state.hoverObj) {
					var fn = state["on".concat(state.hoverObj.type, "Click")];
					fn && fn.apply(void 0, [state.hoverObj.d].concat(cbEvents));
				} else state.onBackgroundClick && state.onBackgroundClick.apply(state, cbEvents);
				if (ev.button === 2) if (state.hoverObj) {
					var _fn = state["on".concat(state.hoverObj.type, "RightClick")];
					_fn && _fn.apply(void 0, [state.hoverObj.d].concat(cbEvents));
				} else state.onBackgroundRightClick && state.onBackgroundRightClick.apply(state, cbEvents);
			});
		}, { passive: true });
		container.addEventListener("contextmenu", function(ev) {
			if (!state.onBackgroundRightClick && !state.onNodeRightClick && !state.onLinkRightClick) return true;
			ev.preventDefault();
			return false;
		});
		state.forceGraph(ctx);
		state.shadowGraph(shadowCtx);
		var refreshShadowCanvas = throttle_default(function() {
			clearCanvas(shadowCtx, state.width, state.height);
			state.shadowGraph.linkWidth(function(l) {
				return index$2(state.linkWidth)(l) + state.linkHoverPrecision;
			});
			var t$1 = transform(state.canvas);
			state.shadowGraph.globalScale(t$1.k).tickFrame();
		}, HOVER_CANVAS_THROTTLE_DELAY);
		state.flushShadowCanvas = refreshShadowCanvas.flush;
		(this._animationCycle = function animate() {
			var doRedraw = !state.autoPauseRedraw || !!state.needsRedraw || state.forceGraph.isEngineRunning() || state.graphData.links.some(function(d) {
				return d.__photons && d.__photons.length;
			});
			state.needsRedraw = false;
			if (state.enablePointerInteraction) {
				var obj = !state.isPointerDragging ? getObjUnderPointer() : null;
				if (obj !== state.hoverObj) {
					var prevObj = state.hoverObj;
					var prevObjType = prevObj ? prevObj.type : null;
					var objType = obj ? obj.type : null;
					if (prevObjType && prevObjType !== objType) {
						var fn = state["on".concat(prevObjType, "Hover")];
						fn && fn(null, prevObj.d);
					}
					if (objType) {
						var _fn2 = state["on".concat(objType, "Hover")];
						_fn2 && _fn2(obj.d, prevObjType === objType ? prevObj.d : null);
					}
					state.tooltip.content(obj ? index$2(state["".concat(obj.type.toLowerCase(), "Label")])(obj.d) || null : null);
					state.canvas.classList[(obj && state["on".concat(objType, "Click")] || !obj && state.onBackgroundClick) && index$2(state.showPointerCursor)(obj === null || obj === void 0 ? void 0 : obj.d) ? "add" : "remove"]("clickable");
					state.hoverObj = obj;
				}
				doRedraw && refreshShadowCanvas();
			}
			if (doRedraw) {
				clearCanvas(ctx, state.width, state.height);
				var globalScale = transform(state.canvas).k;
				state.onRenderFramePre && state.onRenderFramePre(ctx, globalScale);
				state.forceGraph.globalScale(globalScale).tickFrame();
				state.onRenderFramePost && state.onRenderFramePost(ctx, globalScale);
			}
			state.tweenGroup.update();
			state.animationFrameRequestId = requestAnimationFrame(animate);
		})();
	},
	update: function updateFn(state) {}
});
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var commonPropTypes = {
	width: import_prop_types.default.number,
	height: import_prop_types.default.number,
	graphData: import_prop_types.default.shape({
		nodes: import_prop_types.default.arrayOf(import_prop_types.default.object).isRequired,
		links: import_prop_types.default.arrayOf(import_prop_types.default.object).isRequired
	}),
	backgroundColor: import_prop_types.default.string,
	nodeRelSize: import_prop_types.default.number,
	nodeId: import_prop_types.default.string,
	nodeLabel: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.func]),
	nodeVal: import_prop_types.default.oneOfType([
		import_prop_types.default.number,
		import_prop_types.default.string,
		import_prop_types.default.func
	]),
	nodeVisibility: import_prop_types.default.oneOfType([
		import_prop_types.default.bool,
		import_prop_types.default.string,
		import_prop_types.default.func
	]),
	nodeColor: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.func]),
	nodeAutoColorBy: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.func]),
	onNodeHover: import_prop_types.default.func,
	onNodeClick: import_prop_types.default.func,
	linkSource: import_prop_types.default.string,
	linkTarget: import_prop_types.default.string,
	linkLabel: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.func]),
	linkVisibility: import_prop_types.default.oneOfType([
		import_prop_types.default.bool,
		import_prop_types.default.string,
		import_prop_types.default.func
	]),
	linkColor: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.func]),
	linkAutoColorBy: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.func]),
	linkWidth: import_prop_types.default.oneOfType([
		import_prop_types.default.number,
		import_prop_types.default.string,
		import_prop_types.default.func
	]),
	linkCurvature: import_prop_types.default.oneOfType([
		import_prop_types.default.number,
		import_prop_types.default.string,
		import_prop_types.default.func
	]),
	linkDirectionalArrowLength: import_prop_types.default.oneOfType([
		import_prop_types.default.number,
		import_prop_types.default.string,
		import_prop_types.default.func
	]),
	linkDirectionalArrowColor: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.func]),
	linkDirectionalArrowRelPos: import_prop_types.default.oneOfType([
		import_prop_types.default.number,
		import_prop_types.default.string,
		import_prop_types.default.func
	]),
	linkDirectionalParticles: import_prop_types.default.oneOfType([
		import_prop_types.default.number,
		import_prop_types.default.string,
		import_prop_types.default.func
	]),
	linkDirectionalParticleSpeed: import_prop_types.default.oneOfType([
		import_prop_types.default.number,
		import_prop_types.default.string,
		import_prop_types.default.func
	]),
	linkDirectionalParticleOffset: import_prop_types.default.oneOfType([
		import_prop_types.default.number,
		import_prop_types.default.string,
		import_prop_types.default.func
	]),
	linkDirectionalParticleWidth: import_prop_types.default.oneOfType([
		import_prop_types.default.number,
		import_prop_types.default.string,
		import_prop_types.default.func
	]),
	linkDirectionalParticleColor: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.func]),
	onLinkHover: import_prop_types.default.func,
	onLinkClick: import_prop_types.default.func,
	dagMode: import_prop_types.default.oneOf([
		"td",
		"bu",
		"lr",
		"rl",
		"zin",
		"zout",
		"radialin",
		"radialout"
	]),
	dagLevelDistance: import_prop_types.default.number,
	dagNodeFilter: import_prop_types.default.func,
	onDagError: import_prop_types.default.func,
	d3AlphaMin: import_prop_types.default.number,
	d3AlphaDecay: import_prop_types.default.number,
	d3VelocityDecay: import_prop_types.default.number,
	warmupTicks: import_prop_types.default.number,
	cooldownTicks: import_prop_types.default.number,
	cooldownTime: import_prop_types.default.number,
	onEngineTick: import_prop_types.default.func,
	onEngineStop: import_prop_types.default.func,
	getGraphBbox: import_prop_types.default.func
};
var pointerBasedPropTypes = {
	zoomToFit: import_prop_types.default.func,
	onNodeRightClick: import_prop_types.default.func,
	onNodeDrag: import_prop_types.default.func,
	onNodeDragEnd: import_prop_types.default.func,
	onLinkRightClick: import_prop_types.default.func,
	linkHoverPrecision: import_prop_types.default.number,
	onBackgroundClick: import_prop_types.default.func,
	onBackgroundRightClick: import_prop_types.default.func,
	showPointerCursor: import_prop_types.default.oneOfType([import_prop_types.default.bool, import_prop_types.default.func]),
	enablePointerInteraction: import_prop_types.default.bool,
	enableNodeDrag: import_prop_types.default.bool
};
var threeBasedPropTypes = {
	showNavInfo: import_prop_types.default.bool,
	nodeOpacity: import_prop_types.default.number,
	nodeResolution: import_prop_types.default.number,
	nodeThreeObject: import_prop_types.default.oneOfType([
		import_prop_types.default.object,
		import_prop_types.default.string,
		import_prop_types.default.func
	]),
	nodeThreeObjectExtend: import_prop_types.default.oneOfType([
		import_prop_types.default.bool,
		import_prop_types.default.string,
		import_prop_types.default.func
	]),
	nodePositionUpdate: import_prop_types.default.func,
	linkOpacity: import_prop_types.default.number,
	linkResolution: import_prop_types.default.number,
	linkCurveRotation: import_prop_types.default.oneOfType([
		import_prop_types.default.number,
		import_prop_types.default.string,
		import_prop_types.default.func
	]),
	linkMaterial: import_prop_types.default.oneOfType([
		import_prop_types.default.object,
		import_prop_types.default.string,
		import_prop_types.default.func
	]),
	linkThreeObject: import_prop_types.default.oneOfType([
		import_prop_types.default.object,
		import_prop_types.default.string,
		import_prop_types.default.func
	]),
	linkThreeObjectExtend: import_prop_types.default.oneOfType([
		import_prop_types.default.bool,
		import_prop_types.default.string,
		import_prop_types.default.func
	]),
	linkPositionUpdate: import_prop_types.default.func,
	linkDirectionalArrowResolution: import_prop_types.default.number,
	linkDirectionalParticleResolution: import_prop_types.default.number,
	linkDirectionalParticleThreeObject: import_prop_types.default.oneOfType([
		import_prop_types.default.object,
		import_prop_types.default.string,
		import_prop_types.default.func
	]),
	forceEngine: import_prop_types.default.oneOf(["d3", "ngraph"]),
	ngraphPhysics: import_prop_types.default.object,
	numDimensions: import_prop_types.default.oneOf([
		1,
		2,
		3
	])
};
var ForceGraph2DPropTypes = Object.assign({}, commonPropTypes, pointerBasedPropTypes, {
	linkLineDash: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.number),
		import_prop_types.default.string,
		import_prop_types.default.func
	]),
	nodeCanvasObjectMode: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.func]),
	nodeCanvasObject: import_prop_types.default.func,
	nodePointerAreaPaint: import_prop_types.default.func,
	linkCanvasObjectMode: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.func]),
	linkCanvasObject: import_prop_types.default.func,
	linkPointerAreaPaint: import_prop_types.default.func,
	linkDirectionalParticleCanvasObject: import_prop_types.default.func,
	autoPauseRedraw: import_prop_types.default.bool,
	minZoom: import_prop_types.default.number,
	maxZoom: import_prop_types.default.number,
	enableZoomInteraction: import_prop_types.default.oneOfType([import_prop_types.default.bool, import_prop_types.default.func]),
	enablePanInteraction: import_prop_types.default.oneOfType([import_prop_types.default.bool, import_prop_types.default.func]),
	onZoom: import_prop_types.default.func,
	onZoomEnd: import_prop_types.default.func,
	onRenderFramePre: import_prop_types.default.func,
	onRenderFramePost: import_prop_types.default.func
});
Object.assign({}, commonPropTypes, pointerBasedPropTypes, threeBasedPropTypes, {
	enableNavigationControls: import_prop_types.default.bool,
	controlType: import_prop_types.default.oneOf([
		"trackball",
		"orbit",
		"fly"
	]),
	rendererConfig: import_prop_types.default.object,
	extraRenderers: import_prop_types.default.arrayOf(import_prop_types.default.shape({ render: import_prop_types.default.func.isRequired }))
});
Object.assign({}, commonPropTypes, threeBasedPropTypes, {
	nodeDesc: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.func]),
	linkDesc: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.func])
});
Object.assign({}, commonPropTypes, threeBasedPropTypes, {
	markerAttrs: import_prop_types.default.object,
	yOffset: import_prop_types.default.number,
	glScale: import_prop_types.default.number
});
var ForceGraph2D = index(forceGraph, { methodNames: [
	"emitParticle",
	"d3Force",
	"d3ReheatSimulation",
	"stopAnimation",
	"pauseAnimation",
	"resumeAnimation",
	"centerAt",
	"zoom",
	"zoomToFit",
	"getGraphBbox",
	"screen2GraphCoords",
	"graph2ScreenCoords"
] });
ForceGraph2D.displayName = "ForceGraph2D";
ForceGraph2D.propTypes = ForceGraph2DPropTypes;
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function GraphDimensionToggle({ className }) {
	const t$1 = useT();
	const { dimension, setDimension, webglSupported, webglState } = useGraphDimension();
	const segment = (value) => {
		const active = dimension === value;
		const blocked = value === "3d" && !webglSupported;
		const title = blocked ? t$1(webglState === "lost" ? "wiki_graph.dimension_lost" : "wiki_graph.dimension_unavailable") : t$1(value === "3d" ? "wiki_graph.dimension_3d_title" : "wiki_graph.dimension_2d_title");
		const Icon = value === "3d" ? Box : Square;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			role: "radio",
			"aria-checked": active,
			"aria-label": title,
			title,
			disabled: blocked,
			"data-testid": `graph-dimension-${value}`,
			"data-active": active ? "true" : "false",
			onClick: () => setDimension(value),
			className: cn("inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium tabular-nums transition-colors", active ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:text-foreground", blocked && "cursor-not-allowed opacity-40 hover:text-muted-foreground"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "h-3 w-3",
				"aria-hidden": true
			}), t$1(value === "3d" ? "wiki_graph.dimension_3d" : "wiki_graph.dimension_2d")]
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "radiogroup",
		"aria-label": t$1("wiki_graph.dimension_label"),
		"data-testid": "graph-dimension-toggle",
		"data-dimension": dimension,
		"data-webgl": webglSupported ? "true" : "false",
		"data-webgl-state": webglState,
		className: cn("inline-flex items-center gap-0.5 rounded-md border border-border bg-card/80 p-0.5 backdrop-blur", className),
		children: [segment("2d"), segment("3d")]
	});
}
var WikiGraph3D = (0, import_react.lazy)(() => __vitePreload(() => import("./WikiGraph3D-BBfVW1Tr.js"), __vite__mapDeps([0,1,2,3,4,5,6])).then((mod) => ({ default: mod.WikiGraph3D })));
var GRAPH_QUERY_KEY = ["wiki", "graph"];
async function fetchGraph() {
	const res = await fetch("/api/wiki/graph");
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json();
}
function sizeOf(node, isActive) {
	return nodeSizeScore(node.backlinkCount ?? 0, isActive);
}
var FALLBACK_PALETTE = {
	dark: {
		ink: "0 0% 98%",
		muted: "0 0% 63%",
		accent: "212 100% 62%",
		room: "0 0% 4%",
		rim: "0 0% 22%",
		broken: "0 72% 55%"
	},
	light: {
		ink: "0 0% 9%",
		muted: "0 0% 33%",
		accent: "212 92% 45%",
		room: "0 0% 100%",
		rim: "0 0% 74%",
		broken: "0 72% 45%"
	}
};
function readPalette(theme) {
	const fallback = FALLBACK_PALETTE[theme];
	if (typeof document === "undefined" || !document.body) return fallback;
	const css = getComputedStyle(document.body);
	const token = (name, otherwise) => {
		const value = css.getPropertyValue(name).trim();
		return /^\d/.test(value) ? value : otherwise;
	};
	return {
		ink: token("--foreground", fallback.ink),
		muted: token("--muted-foreground", fallback.muted),
		accent: token("--accent", fallback.accent),
		room: token("--background", fallback.room),
		rim: token("--border-strong", fallback.rim),
		broken: token("--destructive", fallback.broken)
	};
}
function hsl(triplet, alpha = 1) {
	return alpha >= 1 ? `hsl(${triplet})` : `hsl(${triplet} / ${alpha})`;
}
function focusOf(hover, selected) {
	return hover ?? selected ?? null;
}
function linkTouches(link, slug) {
	return endpointId(link.source) === slug || endpointId(link.target) === slug;
}
var CANVAS_FONT = "'Inter Variable', Inter, system-ui, sans-serif";
var GRAVITY = .035;
var ORPHAN_GRAVITY = .16;
function drawRadius(node, isActive) {
	return nodeSizeScore(node.backlinkCount ?? 0, isActive) * 2.6;
}
function paintedRadius(node, isActive, isHub, globalScale) {
	const floor = (isHub ? 6 : isActive ? 5 : 3.2) / Math.max(globalScale, .01);
	return Math.max(drawRadius(node, isActive), floor);
}
var ALWAYS_LABELLED = 10;
var LABEL_ALL_ZOOM = 2.4;
var HIDDEN_KINDS_KEY = "jarvis.wiki.map.hiddenKinds";
var DEFAULT_HIDDEN = ["system"];
function readHiddenKinds() {
	try {
		const raw = window.localStorage.getItem(HIDDEN_KINDS_KEY);
		if (raw) {
			const parsed = JSON.parse(raw);
			if (Array.isArray(parsed)) return new Set(parsed.filter((value) => WIKI_GROUPS.includes(String(value))));
		}
	} catch {}
	return new Set(DEFAULT_HIDDEN);
}
function writeHiddenKinds(hidden) {
	try {
		window.localStorage.setItem(HIDDEN_KINDS_KEY, JSON.stringify([...hidden]));
	} catch {}
}
function WikiGraph({ onNodeClick, highlightSlug }) {
	const assistantName = useEventStore((s) => s.assistantName);
	const uiLanguage = useUiLanguage();
	const t$1 = useT();
	const tRef = (0, import_react.useRef)(t$1);
	tRef.current = t$1;
	const tStable = (0, import_react.useCallback)((key) => tRef.current(key), [uiLanguage, assistantName]);
	const onNodeClickRef = (0, import_react.useRef)(onNodeClick);
	onNodeClickRef.current = onNodeClick;
	const selectNode = (0, import_react.useCallback)((slug) => {
		if (slug) onNodeClickRef.current(slug);
	}, []);
	const { dimension } = useGraphDimension();
	const isSpatial = dimension === "3d";
	const [resetTick, setResetTick] = (0, import_react.useState)(0);
	const { data, isLoading, isError } = useQuery({
		queryKey: GRAPH_QUERY_KEY,
		queryFn: fetchGraph,
		staleTime: 3e4
	});
	const [hiddenKinds, setHiddenKinds] = (0, import_react.useState)(readHiddenKinds);
	const toggleKind = (0, import_react.useCallback)((group) => {
		setHiddenKinds((prev) => {
			const next = new Set(prev);
			if (next.has(group)) next.delete(group);
			else next.add(group);
			writeHiddenKinds(next);
			return next;
		});
	}, []);
	const kindCounts = (0, import_react.useMemo)(() => {
		const counts = /* @__PURE__ */ new Map();
		for (const node of data?.ok ? data.nodes : []) {
			const group = groupOfKind(node.kind);
			counts.set(group, (counts.get(group) ?? 0) + 1);
		}
		return counts;
	}, [data]);
	const graphData = (0, import_react.useMemo)(() => {
		if (!data?.ok) return {
			nodes: [],
			links: []
		};
		const shown = data.nodes.filter((node) => !hiddenKinds.has(groupOfKind(node.kind)));
		const shownIds = new Set(shown.map((node) => node.id));
		const edges = uniqueEdges(data.edges).filter((edge) => shownIds.has(edge.source) && shownIds.has(edge.target));
		const weights = new Map(edges.map((edge) => [`${edge.source}\u0000${edge.target}`, edge.weight]));
		const out = toGraphData({
			...data,
			nodes: shown.map((node) => ({
				...node,
				title: cleanTitle(node.title, node.id)
			})),
			edges,
			broken: (data.broken ?? []).filter((edge) => shownIds.has(edge.source))
		});
		for (const link of out.links) link.weight = weights.get(`${link.source}\u0000${link.target}`) ?? 1;
		const radius = 60;
		out.nodes.forEach((node, idx) => {
			const angle = idx / Math.max(1, out.nodes.length) * Math.PI * 2;
			const jitter = idx * 31 % 13 - 6;
			const n = node;
			n.x = Math.cos(angle) * (radius + jitter);
			n.y = Math.sin(angle) * (radius + jitter);
		});
		return out;
	}, [data]);
	const nodeTitles = (0, import_react.useMemo)(() => new Map(graphData.nodes.map((node) => [node.id, node.title])), [graphData.nodes]);
	const structure = (0, import_react.useMemo)(() => {
		const neighbours = /* @__PURE__ */ new Map();
		const link = (a, b) => {
			const set$1 = neighbours.get(a) ?? /* @__PURE__ */ new Set();
			set$1.add(b);
			neighbours.set(a, set$1);
		};
		for (const edge of graphData.links) {
			const source = endpointId(edge.source);
			const target = endpointId(edge.target);
			link(source, target);
			link(target, source);
		}
		const degree = degreeOf(graphData.links.map((edge) => ({
			source: endpointId(edge.source),
			target: endpointId(edge.target)
		})));
		return {
			neighbours,
			degree,
			labelled: new Set([...degree.entries()].sort((a, b) => b[1] - a[1]).slice(0, ALWAYS_LABELLED).map(([id$1]) => id$1)),
			groups: new Map(graphData.nodes.map((node) => [node.id, groupOfKind(node.kind)])),
			maxDegree: Math.max(1, ...degree.values())
		};
	}, [graphData]);
	const structureRef = (0, import_react.useRef)(structure);
	structureRef.current = structure;
	const graphDataRef = (0, import_react.useRef)(graphData);
	graphDataRef.current = graphData;
	const hubSlug = data?.hub ?? null;
	const hubRef = (0, import_react.useRef)(hubSlug);
	hubRef.current = hubSlug;
	const theme = useThemeValue();
	const paletteRef = (0, import_react.useRef)(FALLBACK_PALETTE[theme]);
	(0, import_react.useEffect)(() => {
		paletteRef.current = readPalette(theme);
	}, [theme]);
	const [hoverSlug, setHoverSlug] = (0, import_react.useState)(null);
	const hoverRef = (0, import_react.useRef)(null);
	const graphRef = (0, import_react.useRef)(void 0);
	const wrapRef = (0, import_react.useRef)(null);
	const highlightRef = (0, import_react.useRef)(highlightSlug);
	highlightRef.current = highlightSlug;
	const [winSize, setWinSize] = (0, import_react.useState)(() => ({
		w: typeof window !== "undefined" ? Math.max(800, window.innerWidth - 600) : 800,
		h: typeof window !== "undefined" ? Math.max(600, window.innerHeight - 120) : 600
	}));
	(0, import_react.useEffect)(() => {
		let rafId = null;
		let observer = null;
		let stopped = false;
		const apply = (w, h) => {
			setWinSize((prev) => sizeChanged(prev, {
				w,
				h
			}) ? {
				w,
				h
			} : prev);
		};
		const poll = () => {
			if (stopped) return;
			const el = wrapRef.current;
			if (el) {
				const r = el.getBoundingClientRect();
				if (r.width > 0 && r.height > 0) {
					apply(Math.floor(r.width), Math.floor(r.height));
					if (!observer) {
						observer = new ResizeObserver(() => {
							const rr = el.getBoundingClientRect();
							if (rr.width > 0 && rr.height > 0) apply(Math.floor(rr.width), Math.floor(rr.height));
						});
						observer.observe(el);
					}
					return;
				}
			}
			rafId = window.requestAnimationFrame(poll);
		};
		poll();
		return () => {
			stopped = true;
			if (rafId !== null) window.cancelAnimationFrame(rafId);
			observer?.disconnect();
		};
	}, []);
	const panInteractedRef = (0, import_react.useRef)(false);
	const correctingRef = (0, import_react.useRef)(false);
	const programmaticUntilRef = (0, import_react.useRef)(0);
	const renderingRef = (0, import_react.useRef)(true);
	const engineRunningRef = (0, import_react.useRef)(true);
	const pointerInsideRef = (0, import_react.useRef)(false);
	const pointerDownRef = (0, import_react.useRef)(false);
	const pauseTimerRef = (0, import_react.useRef)(null);
	const forcesConfiguredRef = (0, import_react.useRef)(false);
	const renderControls = () => graphRef.current;
	const resumeRender = (0, import_react.useCallback)(() => {
		if (pauseTimerRef.current !== null) {
			window.clearTimeout(pauseTimerRef.current);
			pauseTimerRef.current = null;
		}
		if (renderingRef.current) return;
		renderingRef.current = true;
		renderControls()?.resumeAnimation?.();
	}, []);
	const pauseRenderIfIdle = (0, import_react.useCallback)(function pauseIfIdle() {
		if (pauseTimerRef.current !== null) {
			window.clearTimeout(pauseTimerRef.current);
			pauseTimerRef.current = null;
		}
		if (!renderingRef.current) return;
		if (engineRunningRef.current) return;
		if (pointerInsideRef.current || pointerDownRef.current) return;
		const pending = programmaticUntilRef.current - Date.now();
		if (pending > 0) {
			pauseTimerRef.current = window.setTimeout(pauseIfIdle, pending + 30);
			return;
		}
		renderingRef.current = false;
		renderControls()?.pauseAnimation?.();
	}, []);
	const fitToView = (0, import_react.useCallback)((duration, padding) => {
		const ref = graphRef.current;
		if (!ref) return;
		programmaticUntilRef.current = Date.now() + duration + 120;
		resumeRender();
		ref.zoomToFit(duration, padding);
	}, [resumeRender]);
	(0, import_react.useEffect)(() => {
		if (graphData.nodes.length === 0) return;
		const timer$1 = window.setTimeout(() => {
			if (!panInteractedRef.current) fitToView(400, 120);
		}, 2500);
		return () => window.clearTimeout(timer$1);
	}, [graphData.nodes.length, fitToView]);
	(0, import_react.useEffect)(() => {
		if (graphData.nodes.length === 0) return;
		const timer$1 = window.setTimeout(() => {
			panInteractedRef.current = false;
			fitToView(400, 80);
		}, 220);
		return () => window.clearTimeout(timer$1);
	}, [
		winSize.w,
		winSize.h,
		graphData.nodes.length,
		fitToView
	]);
	(0, import_react.useEffect)(() => {
		if (graphData.nodes.length === 0) return;
		forcesConfiguredRef.current = false;
		engineRunningRef.current = true;
		resumeRender();
	}, [graphData, resumeRender]);
	(0, import_react.useEffect)(() => {
		if (graphData.nodes.length === 0) return;
		resumeRender();
		const timer$1 = window.setTimeout(() => pauseRenderIfIdle(), 400);
		return () => window.clearTimeout(timer$1);
	}, [
		highlightSlug,
		theme,
		graphData.nodes.length,
		resumeRender,
		pauseRenderIfIdle
	]);
	const hasGraph = graphData.nodes.length > 0;
	(0, import_react.useEffect)(() => {
		const el = wrapRef.current;
		if (!el || !hasGraph) return;
		const onEnter = () => {
			pointerInsideRef.current = true;
			resumeRender();
		};
		const onLeave = () => {
			pointerInsideRef.current = false;
			pauseRenderIfIdle();
		};
		const onDown = () => {
			pointerDownRef.current = true;
			resumeRender();
		};
		const onUp = () => {
			pointerDownRef.current = false;
		};
		el.addEventListener("pointerenter", onEnter);
		el.addEventListener("pointerleave", onLeave);
		el.addEventListener("pointerdown", onDown);
		window.addEventListener("pointerup", onUp);
		el.addEventListener("wheel", resumeRender, { passive: true });
		return () => {
			el.removeEventListener("pointerenter", onEnter);
			el.removeEventListener("pointerleave", onLeave);
			el.removeEventListener("pointerdown", onDown);
			window.removeEventListener("pointerup", onUp);
			el.removeEventListener("wheel", resumeRender);
		};
	}, [
		hasGraph,
		resumeRender,
		pauseRenderIfIdle
	]);
	(0, import_react.useEffect)(() => () => {
		if (pauseTimerRef.current !== null) window.clearTimeout(pauseTimerRef.current);
	}, []);
	const handleResetView = (0, import_react.useCallback)(() => {
		setResetTick((tick) => tick + 1);
		const ref = graphRef.current;
		if (!ref) return;
		panInteractedRef.current = false;
		const anyRef = ref;
		const radius = Math.max(180, graphData.nodes.length * 28);
		graphData.nodes.forEach((node, idx) => {
			const angle = idx / Math.max(1, graphData.nodes.length) * Math.PI * 2;
			const n = node;
			n.x = Math.cos(angle) * radius;
			n.y = Math.sin(angle) * radius;
			n.fx = null;
			n.fy = null;
			n.vx = 0;
			n.vy = 0;
		});
		engineRunningRef.current = true;
		resumeRender();
		const sim = anyRef.d3Force?.("simulation");
		if (sim?.alpha && sim?.restart) sim.alpha(1).restart();
		window.setTimeout(() => fitToView(600, 100), 1500);
	}, [
		graphData.nodes,
		fitToView,
		resumeRender
	]);
	const clampViewToBounds = (0, import_react.useCallback)(() => {
		if (correctingRef.current) return;
		const ref = graphRef.current;
		if (!ref) return;
		const bbox = ref.getGraphBbox();
		if (!bbox) return;
		const center = ref.screen2GraphCoords(winSize.w / 2, winSize.h / 2);
		const target = clampCenterToView(center, ref.zoom(), bbox, {
			w: winSize.w,
			h: winSize.h
		});
		if (Math.abs(target.x - center.x) > .5 || Math.abs(target.y - center.y) > .5) {
			correctingRef.current = true;
			ref.centerAt(target.x, target.y, 0);
			correctingRef.current = false;
		}
	}, [winSize.w, winSize.h]);
	const handleZoom = (0, import_react.useCallback)(() => {
		if (Date.now() < programmaticUntilRef.current) return;
		panInteractedRef.current = true;
		clampViewToBounds();
	}, [clampViewToBounds]);
	const handleZoomEnd = (0, import_react.useCallback)(() => {
		if (Date.now() < programmaticUntilRef.current) return;
		clampViewToBounds();
	}, [clampViewToBounds]);
	const handleNodeDrag = (0, import_react.useCallback)(() => {
		panInteractedRef.current = true;
	}, []);
	const handleBackgroundClick = (0, import_react.useCallback)((event) => {
		if (event.detail >= 2) {
			panInteractedRef.current = false;
			handleResetView();
		}
	}, [handleResetView]);
	const configureForces = (0, import_react.useCallback)(() => {
		engineRunningRef.current = true;
		if (forcesConfiguredRef.current) return;
		const ref = graphRef.current;
		if (!ref) return;
		const anyRef = ref;
		const chargeForce = anyRef.d3Force?.("charge");
		if (chargeForce && typeof chargeForce.strength === "function") {
			chargeForce.strength(-210);
			if (typeof chargeForce.distanceMax === "function") chargeForce.distanceMax(460);
		}
		const linkForce = anyRef.d3Force?.("link");
		if (linkForce && typeof linkForce.distance === "function") {
			linkForce.distance(56);
			if (typeof linkForce.strength === "function") linkForce.strength(.5);
		}
		const centerForce = anyRef.d3Force?.("center");
		if (centerForce && typeof centerForce.strength === "function") centerForce.strength(.08);
		let gravityNodes = [];
		const gravity = Object.assign((alpha) => {
			const { degree } = structureRef.current;
			for (const node of gravityNodes) {
				const k = (degree.get(String(node.id ?? "")) ?? 0) > 0 ? GRAVITY : ORPHAN_GRAVITY;
				node.vx = (node.vx ?? 0) - (node.x ?? 0) * k * alpha;
				node.vy = (node.vy ?? 0) - (node.y ?? 0) * k * alpha;
			}
		}, { initialize: (nodes) => {
			gravityNodes = nodes;
		} });
		anyRef.d3Force?.("gravity", gravity);
		forcesConfiguredRef.current = true;
	}, []);
	const handleEngineStop = (0, import_react.useCallback)(() => {
		engineRunningRef.current = false;
		if (!panInteractedRef.current) fitToView(500, 80);
		pauseRenderIfIdle();
	}, [fitToView, pauseRenderIfIdle]);
	const nodeLabel = (0, import_react.useCallback)((node) => escapeTooltipText(nodeDetails(node, tStable)), [tStable]);
	const linkLabel = (0, import_react.useCallback)((link) => escapeTooltipText(edgeDetails(link, nodeTitles)), [nodeTitles]);
	const nodeVal = (0, import_react.useCallback)((node) => sizeOf(node, node.id === highlightRef.current), []);
	const nodeColor = (0, import_react.useCallback)((node) => node.colour ?? NODE_COLOUR.entity ?? "#8b95a7", []);
	const nodeCanvasObjectMode = (0, import_react.useCallback)(() => "replace", []);
	const nodePointerAreaPaint = (0, import_react.useCallback)((node, colour, ctx) => {
		ctx.beginPath();
		ctx.arc(node.x ?? 0, node.y ?? 0, drawRadius(node, node.id === highlightRef.current) + 2.5, 0, Math.PI * 2);
		ctx.fillStyle = colour;
		ctx.fill();
	}, []);
	const nodeCanvasObject = (0, import_react.useCallback)((node, ctx, globalScale) => {
		const x = node.x ?? 0;
		const y = node.y ?? 0;
		const id$1 = String(node.id ?? "");
		const palette = paletteRef.current;
		const { neighbours, degree, groups, maxDegree } = structureRef.current;
		const isActive = id$1 === highlightRef.current;
		const isHover = id$1 === hoverRef.current;
		const isHub = id$1 === hubRef.current;
		const focus = focusOf(hoverRef.current, highlightRef.current);
		const isNeighbour = focus !== null && (neighbours.get(focus)?.has(id$1) ?? false);
		const inFocus = focus === null || id$1 === focus || isNeighbour;
		const group = groups.get(id$1) ?? "other";
		const isBroken = node.kind === "broken";
		const shape = isBroken ? "dot" : GROUP_SHAPE[group];
		const radius = paintedRadius(node, isActive, isHub, globalScale);
		const weight = Math.min(1, (degree.get(id$1) ?? 0) / Math.max(4, maxDegree * .35));
		const alpha = inFocus ? .5 + weight * .5 : .12;
		const lit = isActive || isHover || hoverRef.current !== null && isNeighbour;
		ctx.save();
		if (isHub && inFocus) {
			ctx.beginPath();
			ctx.arc(x, y, radius + 2 + 5 / globalScale, 0, Math.PI * 2);
			ctx.strokeStyle = hsl(palette.accent, .4);
			ctx.lineWidth = 1 / globalScale;
			ctx.setLineDash([2 / globalScale, 2.5 / globalScale]);
			ctx.stroke();
			ctx.setLineDash([]);
		}
		if (isActive || isHover) {
			ctx.beginPath();
			ctx.arc(x, y, radius + 4.5, 0, Math.PI * 2);
			ctx.fillStyle = hsl(palette.accent, isActive ? .22 : .14);
			ctx.fill();
		}
		traceKindShape(ctx, shape, x, y, radius);
		const colour = isBroken ? hsl(palette.broken, inFocus ? .9 : .2) : lit || isHub ? hsl(palette.accent, inFocus ? 1 : .25) : hsl(palette.ink, alpha);
		if (isHollowShape(shape)) {
			ctx.strokeStyle = colour;
			ctx.lineWidth = Math.max(1.2, radius * .45);
			ctx.stroke();
		} else {
			ctx.fillStyle = colour;
			ctx.fill();
			ctx.strokeStyle = hsl(palette.room, .9);
			ctx.lineWidth = .8 / globalScale;
			ctx.stroke();
		}
		ctx.restore();
	}, []);
	const drawLabels = (0, import_react.useCallback)((ctx, globalScale) => {
		const palette = paletteRef.current;
		const { neighbours, degree, labelled } = structureRef.current;
		const hover = hoverRef.current;
		const selected = highlightRef.current;
		const focus = focusOf(hover, selected);
		const focusNeighbours = focus !== null ? neighbours.get(focus) : void 0;
		const candidates = [];
		for (const node of graphDataRef.current.nodes) {
			const id$1 = String(node.id ?? "");
			const isActive = id$1 === selected;
			const isHover = id$1 === hover;
			const isHub = id$1 === hubRef.current;
			const isNeighbour = focusNeighbours?.has(id$1) ?? false;
			if (!(focus === null || id$1 === focus || isNeighbour)) continue;
			let rank;
			if (isActive || isHover) rank = 0;
			else if (isHub) rank = 1;
			else if (isNeighbour) rank = 2;
			else if (labelled.has(id$1)) rank = 3;
			else if (globalScale >= LABEL_ALL_ZOOM) rank = 4;
			else continue;
			const text = node.title ?? id$1;
			if (text) candidates.push({
				node,
				rank,
				text
			});
		}
		candidates.sort((a, b) => a.rank - b.rank || (degree.get(String(b.node.id)) ?? 0) - (degree.get(String(a.node.id)) ?? 0));
		const placed = [];
		const pad = 3 / globalScale;
		ctx.save();
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.lineJoin = "round";
		for (const { node, rank, text } of candidates) {
			const x = node.x ?? 0;
			const y = node.y ?? 0;
			const id$1 = String(node.id ?? "");
			const strong = rank <= 1 || labelled.has(id$1);
			const fontSize = (strong ? 12 : 11) / globalScale;
			ctx.font = `${strong ? 500 : 400} ${fontSize}px ${CANVAS_FONT}`;
			const ty = y + paintedRadius(node, id$1 === selected, id$1 === hubRef.current, globalScale) + 4 / globalScale;
			const width = ctx.measureText(text).width;
			const box = [
				x - width / 2 - pad,
				ty - pad,
				x + width / 2 + pad,
				ty + fontSize * 1.2 + pad
			];
			if (placed.some(([l, t$2, r, b]) => box[0] < r && box[2] > l && box[1] < b && box[3] > t$2) && rank > 0) continue;
			placed.push(box);
			ctx.lineWidth = 3.5 / globalScale;
			ctx.strokeStyle = hsl(palette.room, .92);
			ctx.strokeText(text, x, ty);
			ctx.fillStyle = rank === 0 ? hsl(palette.ink) : strong ? hsl(palette.ink, .88) : hsl(palette.muted, .95);
			ctx.fillText(text, x, ty);
		}
		ctx.restore();
	}, []);
	const linkColor = (0, import_react.useCallback)((link) => {
		const palette = paletteRef.current;
		if (link.broken) return hsl(palette.broken, .5);
		const focus = focusOf(hoverRef.current, highlightRef.current);
		if (focus === null) return hsl(palette.ink, .14);
		return linkTouches(link, focus) ? hsl(palette.accent, .75) : hsl(palette.ink, .04);
	}, []);
	const linkWidth = (0, import_react.useCallback)((link) => {
		const weight = link.weight ?? 1;
		const base = .6 + Math.min(Math.log2(weight), 4) * .35;
		const focus = focusOf(hoverRef.current, highlightRef.current);
		return focus !== null && linkTouches(link, focus) ? base + .6 : base;
	}, []);
	const linkLineDash = (0, import_react.useCallback)((link) => link.broken ? [4, 4] : null, []);
	const linkArrowLength = (0, import_react.useCallback)((link) => {
		const focus = focusOf(hoverRef.current, highlightRef.current);
		return focus !== null && linkTouches(link, focus) ? 4 : 0;
	}, []);
	const linkArrowColor = (0, import_react.useCallback)((link) => {
		const palette = paletteRef.current;
		return link.broken ? hsl(palette.broken, .7) : hsl(palette.accent, .9);
	}, []);
	const linkParticles = (0, import_react.useCallback)((link) => hoverSlug !== null && linkTouches(link, hoverSlug) ? 2 : 0, [hoverSlug]);
	const linkParticleColor = (0, import_react.useCallback)(() => hsl(paletteRef.current.accent), []);
	const handleNodeHover = (0, import_react.useCallback)((node) => {
		const id$1 = node ? String(node.id ?? "") : null;
		if (hoverRef.current === id$1) return;
		hoverRef.current = id$1;
		setHoverSlug(id$1);
		if (wrapRef.current) wrapRef.current.style.cursor = id$1 ? "pointer" : "";
		resumeRender();
	}, [resumeRender]);
	const handleNodeClick = (0, import_react.useCallback)((node) => {
		selectNode(node.id ?? "");
	}, [selectNode]);
	const nodeListItems = (0, import_react.useMemo)(() => graphData.nodes.map((node) => {
		const isActive = node.id === highlightSlug;
		const renderRadius = isActive ? node.radius * 1.5 : node.radius;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			"data-testid": "wiki-graph-node",
			"data-node-id": node.id,
			"data-node-kind": node.kind,
			"data-node-radius": renderRadius,
			"data-node-active": isActive ? "true" : "false",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => selectNode(node.id),
				"aria-label": nodeDetails(node, tStable),
				children: node.title
			})
		}, node.id);
	}), [
		graphData.nodes,
		highlightSlug,
		selectNode,
		tStable
	]);
	const edgeListItems = (0, import_react.useMemo)(() => graphData.links.map((edge, index$5) => {
		const source = endpointId(edge.source);
		const target = endpointId(edge.target);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			"data-testid": "wiki-graph-edge",
			"data-edge-source": source,
			"data-edge-target": target,
			"data-edge-broken": edge.broken ? "true" : "false",
			children: [edgeDetails(edge, nodeTitles), edge.broken ? ` · ${tStable("wiki_graph.unresolved")}` : ""]
		}, `${source}:${target}:${index$5}`);
	}), [
		graphData.links,
		nodeTitles,
		tStable
	]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-testid": "wiki-graph-loading",
		className: "flex h-full items-center justify-center text-sm text-muted-foreground",
		children: t$1("wiki_graph.loading")
	});
	if (isError || !data?.ok) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-testid": "wiki-graph-error",
		className: "flex h-full items-center justify-center text-sm text-muted-foreground",
		children: t$1("wiki_graph.load_error")
	});
	if ((data.nodes ?? []).length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": "wiki-graph-empty",
		className: "flex h-full items-center justify-center px-8 text-center text-sm text-muted-foreground",
		children: [
			t$1("wiki_graph.empty_prefix"),
			assistantName,
			t$1("wiki_graph.empty_suffix")
		]
	});
	const legendGroups = WIKI_GROUPS.filter((group) => (kindCounts.get(group) ?? 0) > 0);
	const connectionCount = graphData.links.filter((link) => !link.broken).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapRef,
		"data-testid": "wiki-graph-wrap",
		className: cn("relative h-full w-full overflow-hidden", "[background-image:radial-gradient(hsl(var(--foreground)/0.07)_1px,transparent_1px)] [background-size:24px_24px]"),
		role: "group",
		"aria-label": t$1("wiki_graph.relationship_graph"),
		onPointerLeave: () => handleNodeHover(null),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute left-3 top-3 z-10 w-[188px] rounded-lg border border-border bg-popover/85 p-1.5 backdrop-blur",
				"data-testid": "wiki-graph-legend",
				role: "group",
				"aria-label": t$1("wiki_ui.legend_label"),
				children: [legendGroups.map((group) => {
					const hidden = hiddenKinds.has(group);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => toggleKind(group),
						"aria-pressed": !hidden,
						title: t$1(hidden ? "wiki_ui.legend_show" : "wiki_ui.legend_hide"),
						"data-testid": `wiki-graph-legend-${group}`,
						className: cn("flex h-7 w-full items-center gap-2 rounded-md px-2 text-sm transition-colors hover:bg-secondary", hidden ? "text-foreground-faint" : "text-foreground"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindGlyph, {
								group,
								className: cn("h-2.5 w-2.5", hidden ? "opacity-40" : "text-foreground")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("min-w-0 flex-1 truncate text-left", hidden && "line-through decoration-foreground-faint/60"),
								children: t$1(GROUP_LABEL_KEY[group])
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-foreground-faint",
								children: kindCounts.get(group) ?? 0
							})
						]
					}, group);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex items-center gap-2 border-t border-border px-2 pb-0.5 pt-2 text-xs text-foreground-faint",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "h-px w-4 bg-foreground/40",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: t$1("wiki_ui.legend_connections").replace("{0}", String(connectionCount))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-3 right-3 z-10 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraphDimensionToggle, { className: "h-8 bg-popover/85" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: handleResetView,
					"data-testid": "wiki-graph-reset-view",
					className: "inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-popover/85 px-2.5 text-sm font-medium text-muted-foreground backdrop-blur transition-colors hover:bg-secondary hover:text-foreground",
					title: t$1("wiki_graph.reset_view_title"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocateFixed, {
						className: "h-3.5 w-3.5",
						"aria-hidden": true
					}), t$1("wiki_graph.center")]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pointer-events-none absolute bottom-5 left-4 z-10 hidden whitespace-nowrap text-xs text-foreground-faint 2xl:block",
				children: t$1("wiki_ui.map_hint")
			}),
			graphData.nodes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-[5] flex items-center justify-center px-8 text-center text-sm text-muted-foreground",
				"data-testid": "wiki-graph-all-hidden",
				children: t$1("wiki_ui.map_all_hidden")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				"data-testid": "wiki-graph-node-list",
				className: "sr-only",
				children: nodeListItems
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				"data-testid": "wiki-graph-edge-list",
				className: "sr-only",
				children: edgeListItems
			}),
			isSpatial ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-testid": "wiki-graph-3d-loading",
					className: "flex h-full items-center justify-center text-sm text-muted-foreground",
					children: t$1("wiki_graph.loading_3d")
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WikiGraph3D, {
					graphData,
					width: winSize.w,
					height: winSize.h,
					highlightSlug,
					pivotSlug: data?.hub ?? null,
					onNodeClick: selectNode,
					resetSignal: resetTick,
					nodeLabel,
					linkLabel
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForceGraph2D, {
				ref: graphRef,
				graphData,
				width: winSize.w,
				height: winSize.h,
				backgroundColor: "rgba(0,0,0,0)",
				nodeId: "id",
				nodeLabel,
				enablePanInteraction: true,
				enableZoomInteraction: true,
				enableNodeDrag: true,
				minZoom: .1,
				maxZoom: 8,
				onZoom: handleZoom,
				onZoomEnd: handleZoomEnd,
				onNodeDrag: handleNodeDrag,
				onBackgroundClick: handleBackgroundClick,
				onNodeHover: handleNodeHover,
				autoPauseRedraw: false,
				nodeRelSize: 2,
				nodeVal,
				nodeColor,
				nodeCanvasObjectMode,
				nodeCanvasObject,
				nodePointerAreaPaint,
				onRenderFramePost: drawLabels,
				linkLabel,
				linkColor,
				linkWidth,
				linkLineDash,
				linkDirectionalArrowLength: linkArrowLength,
				linkDirectionalArrowRelPos: .82,
				linkDirectionalArrowColor: linkArrowColor,
				linkDirectionalParticles: linkParticles,
				linkDirectionalParticleSpeed: .006,
				linkDirectionalParticleWidth: 2.4,
				linkDirectionalParticleColor: linkParticleColor,
				cooldownTicks: 200,
				d3VelocityDecay: .6,
				d3AlphaDecay: .04,
				warmupTicks: 40,
				onEngineTick: configureForces,
				onEngineStop: handleEngineStop,
				onNodeClick: handleNodeClick
			})
		]
	});
}
var WikiGraph_default = WikiGraph;
export { WikiGraph, WikiGraph_default as default, edgeDetails, escapeTooltipText, nodeDetails };
