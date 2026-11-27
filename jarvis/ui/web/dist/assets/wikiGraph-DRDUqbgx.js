import { Xc as require_react, Zc as __commonJSMin, tl as __toESM } from "./index-BOzhgzD7.js";
var require_ReactPropTypesSecret = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
}));
var require_factoryWithThrowingShims = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ReactPropTypesSecret = require_ReactPropTypesSecret();
	function emptyFunction() {}
	function emptyFunctionWithReset() {}
	emptyFunctionWithReset.resetWarningCache = emptyFunction;
	module.exports = function() {
		function shim(props, propName, componentName, location, propFullName, secret) {
			if (secret === ReactPropTypesSecret) return;
			var err = /* @__PURE__ */ new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
			err.name = "Invariant Violation";
			throw err;
		}
		shim.isRequired = shim;
		function getShim() {
			return shim;
		}
		var ReactPropTypes = {
			array: shim,
			bigint: shim,
			bool: shim,
			func: shim,
			number: shim,
			object: shim,
			string: shim,
			symbol: shim,
			any: shim,
			arrayOf: getShim,
			element: shim,
			elementType: shim,
			instanceOf: getShim,
			node: shim,
			objectOf: getShim,
			oneOf: getShim,
			oneOfType: getShim,
			shape: getShim,
			exact: getShim,
			checkPropTypes: emptyFunctionWithReset,
			resetWarningCache: emptyFunction
		};
		ReactPropTypes.PropTypes = ReactPropTypes;
		return ReactPropTypes;
	};
}));
var require_prop_types = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_factoryWithThrowingShims()();
}));
function _iterableToArrayLimit$3(arr, i$1) {
	var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
	if (null != _i) {
		var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1;
		try {
			if (_x = (_i = _i.call(arr)).next, 0 === i$1) {
				if (Object(_i) !== _i) return;
				_n = !1;
			} else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i$1); _n = !0);
		} catch (err) {
			_d = !0, _e = err;
		} finally {
			try {
				if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
			} finally {
				if (_d) throw _e;
			}
		}
		return _arr;
	}
}
function _defineProperty$1(obj, key, value) {
	key = _toPropertyKey$1(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _slicedToArray$3(arr, i$1) {
	return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i$1) || _unsupportedIterableToArray$3(arr, i$1) || _nonIterableRest$3();
}
function _toConsumableArray$1(arr) {
	return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$3(arr) || _nonIterableSpread$1();
}
function _arrayWithoutHoles$1(arr) {
	if (Array.isArray(arr)) return _arrayLikeToArray$3(arr);
}
function _arrayWithHoles$3(arr) {
	if (Array.isArray(arr)) return arr;
}
function _iterableToArray$1(iter) {
	if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray$3(o$1, minLen) {
	if (!o$1) return;
	if (typeof o$1 === "string") return _arrayLikeToArray$3(o$1, minLen);
	var n$1 = Object.prototype.toString.call(o$1).slice(8, -1);
	if (n$1 === "Object" && o$1.constructor) n$1 = o$1.constructor.name;
	if (n$1 === "Map" || n$1 === "Set") return Array.from(o$1);
	if (n$1 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n$1)) return _arrayLikeToArray$3(o$1, minLen);
}
function _arrayLikeToArray$3(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i$1 = 0, arr2 = new Array(len); i$1 < len; i$1++) arr2[i$1] = arr[i$1];
	return arr2;
}
function _nonIterableSpread$1() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest$3() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive$1(input, hint) {
	if (typeof input !== "object" || input === null) return input;
	var prim = input[Symbol.toPrimitive];
	if (prim !== void 0) {
		var res = prim.call(input, hint || "default");
		if (typeof res !== "object") return res;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey$1(arg) {
	var key = _toPrimitive$1(arg, "string");
	return typeof key === "symbol" ? key : String(key);
}
var omit = function omit$1(obj, keys) {
	var keySet = new Set(keys);
	return Object.assign.apply(Object, [{}].concat(_toConsumableArray$1(Object.entries(obj).filter(function(_ref2) {
		var key = _slicedToArray$3(_ref2, 1)[0];
		return !keySet.has(key);
	}).map(function(_ref4) {
		var _ref5 = _slicedToArray$3(_ref4, 2), key = _ref5[0], val = _ref5[1];
		return _defineProperty$1({}, key, val);
	}))));
};
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function _arrayLikeToArray$2(r$1, a$2) {
	(null == a$2 || a$2 > r$1.length) && (a$2 = r$1.length);
	for (var e$1 = 0, n$1 = Array(a$2); e$1 < a$2; e$1++) n$1[e$1] = r$1[e$1];
	return n$1;
}
function _arrayWithHoles$2(r$1) {
	if (Array.isArray(r$1)) return r$1;
}
function _arrayWithoutHoles(r$1) {
	if (Array.isArray(r$1)) return _arrayLikeToArray$2(r$1);
}
function _iterableToArray(r$1) {
	if ("undefined" != typeof Symbol && null != r$1[Symbol.iterator] || null != r$1["@@iterator"]) return Array.from(r$1);
}
function _iterableToArrayLimit$2(r$1, l$1) {
	var t$1 = null == r$1 ? null : "undefined" != typeof Symbol && r$1[Symbol.iterator] || r$1["@@iterator"];
	if (null != t$1) {
		var e$1, n$1, i$1, u$1, a$2 = [], f$1 = true, o$1 = false;
		try {
			if (i$1 = (t$1 = t$1.call(r$1)).next, 0 === l$1);
			else for (; !(f$1 = (e$1 = i$1.call(t$1)).done) && (a$2.push(e$1.value), a$2.length !== l$1); f$1 = !0);
		} catch (r$2) {
			o$1 = true, n$1 = r$2;
		} finally {
			try {
				if (!f$1 && null != t$1.return && (u$1 = t$1.return(), Object(u$1) !== u$1)) return;
			} finally {
				if (o$1) throw n$1;
			}
		}
		return a$2;
	}
}
function _nonIterableRest$2() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray$2(r$1, e$1) {
	return _arrayWithHoles$2(r$1) || _iterableToArrayLimit$2(r$1, e$1) || _unsupportedIterableToArray$2(r$1, e$1) || _nonIterableRest$2();
}
function _toConsumableArray(r$1) {
	return _arrayWithoutHoles(r$1) || _iterableToArray(r$1) || _unsupportedIterableToArray$2(r$1) || _nonIterableSpread();
}
function _unsupportedIterableToArray$2(r$1, a$2) {
	if (r$1) {
		if ("string" == typeof r$1) return _arrayLikeToArray$2(r$1, a$2);
		var t$1 = {}.toString.call(r$1).slice(8, -1);
		return "Object" === t$1 && r$1.constructor && (t$1 = r$1.constructor.name), "Map" === t$1 || "Set" === t$1 ? Array.from(r$1) : "Arguments" === t$1 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t$1) ? _arrayLikeToArray$2(r$1, a$2) : void 0;
	}
}
function index$4(kapsuleComponent) {
	var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$wrapperElementTy = _ref.wrapperElementType, wrapperElementType = _ref$wrapperElementTy === void 0 ? "div" : _ref$wrapperElementTy, _ref$nodeMapper = _ref.nodeMapper, nodeMapper = _ref$nodeMapper === void 0 ? function(node) {
		return node;
	} : _ref$nodeMapper, _ref$methodNames = _ref.methodNames, methodNames = _ref$methodNames === void 0 ? [] : _ref$methodNames, _ref$initPropNames = _ref.initPropNames, initPropNames = _ref$initPropNames === void 0 ? [] : _ref$initPropNames;
	return /* @__PURE__ */ (0, import_react.forwardRef)(function(props, ref) {
		var domEl = (0, import_react.useRef)();
		var comp = (0, import_react.useMemo)(function() {
			return kapsuleComponent(Object.fromEntries(initPropNames.filter(function(p$1) {
				return props.hasOwnProperty(p$1);
			}).map(function(prop) {
				return [prop, props[prop]];
			})));
		}, []);
		useEffectOnce(function() {
			comp(nodeMapper(domEl.current));
		}, import_react.useLayoutEffect);
		useEffectOnce(function() {
			return comp._destructor instanceof Function ? comp._destructor : void 0;
		});
		var _call = (0, import_react.useCallback)(function(method) {
			for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
			return comp[method] instanceof Function ? comp[method].apply(comp, args) : void 0;
		}, [comp]);
		var prevPropsRef = (0, import_react.useRef)({});
		Object.keys(omit(props, [].concat(_toConsumableArray(methodNames), _toConsumableArray(initPropNames)))).filter(function(p$1) {
			return prevPropsRef.current[p$1] !== props[p$1];
		}).forEach(function(p$1) {
			return _call(p$1, props[p$1]);
		});
		prevPropsRef.current = props;
		(0, import_react.useImperativeHandle)(ref, function() {
			return Object.fromEntries(methodNames.map(function(method) {
				return [method, function() {
					for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
					return _call.apply(void 0, [method].concat(args));
				}];
			}));
		}, [_call]);
		return /* @__PURE__ */ import_react.createElement(wrapperElementType, { ref: domEl });
	});
}
function useEffectOnce(effect) {
	var useEffectFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : import_react.useEffect;
	var destroyFunc = (0, import_react.useRef)();
	var effectCalled = (0, import_react.useRef)(false);
	var renderAfterCalled = (0, import_react.useRef)(false);
	var _useState2 = _slicedToArray$2((0, import_react.useState)(0), 2);
	_useState2[0];
	var setVal = _useState2[1];
	if (effectCalled.current) renderAfterCalled.current = true;
	useEffectFn(function() {
		if (!effectCalled.current) {
			destroyFunc.current = effect();
			effectCalled.current = true;
		}
		setVal(function(val) {
			return val + 1;
		});
		return function() {
			if (!renderAfterCalled.current) return;
			if (destroyFunc.current) destroyFunc.current();
		};
	}, []);
}
var namespaces_default = {
	svg: "http://www.w3.org/2000/svg",
	xhtml: "http://www.w3.org/1999/xhtml",
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace",
	xmlns: "http://www.w3.org/2000/xmlns/"
};
function namespace_default(name) {
	var prefix = name += "", i$1 = prefix.indexOf(":");
	if (i$1 >= 0 && (prefix = name.slice(0, i$1)) !== "xmlns") name = name.slice(i$1 + 1);
	return namespaces_default.hasOwnProperty(prefix) ? {
		space: namespaces_default[prefix],
		local: name
	} : name;
}
function creatorInherit(name) {
	return function() {
		var document$1 = this.ownerDocument, uri = this.namespaceURI;
		return uri === "http://www.w3.org/1999/xhtml" && document$1.documentElement.namespaceURI === "http://www.w3.org/1999/xhtml" ? document$1.createElement(name) : document$1.createElementNS(uri, name);
	};
}
function creatorFixed(fullname) {
	return function() {
		return this.ownerDocument.createElementNS(fullname.space, fullname.local);
	};
}
function creator_default(name) {
	var fullname = namespace_default(name);
	return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}
function none() {}
function selector_default(selector) {
	return selector == null ? none : function() {
		return this.querySelector(selector);
	};
}
function select_default$1(select) {
	if (typeof select !== "function") select = selector_default(select);
	for (var groups = this._groups, m$2 = groups.length, subgroups = new Array(m$2), j$1 = 0; j$1 < m$2; ++j$1) for (var group = groups[j$1], n$1 = group.length, subgroup = subgroups[j$1] = new Array(n$1), node, subnode, i$1 = 0; i$1 < n$1; ++i$1) if ((node = group[i$1]) && (subnode = select.call(node, node.__data__, i$1, group))) {
		if ("__data__" in node) subnode.__data__ = node.__data__;
		subgroup[i$1] = subnode;
	}
	return new Selection(subgroups, this._parents);
}
function array(x$2) {
	return x$2 == null ? [] : Array.isArray(x$2) ? x$2 : Array.from(x$2);
}
function empty() {
	return [];
}
function selectorAll_default(selector) {
	return selector == null ? empty : function() {
		return this.querySelectorAll(selector);
	};
}
function arrayAll(select) {
	return function() {
		return array(select.apply(this, arguments));
	};
}
function selectAll_default(select) {
	if (typeof select === "function") select = arrayAll(select);
	else select = selectorAll_default(select);
	for (var groups = this._groups, m$2 = groups.length, subgroups = [], parents = [], j$1 = 0; j$1 < m$2; ++j$1) for (var group = groups[j$1], n$1 = group.length, node, i$1 = 0; i$1 < n$1; ++i$1) if (node = group[i$1]) {
		subgroups.push(select.call(node, node.__data__, i$1, group));
		parents.push(node);
	}
	return new Selection(subgroups, parents);
}
function matcher_default(selector) {
	return function() {
		return this.matches(selector);
	};
}
function childMatcher(selector) {
	return function(node) {
		return node.matches(selector);
	};
}
var find$1 = Array.prototype.find;
function childFind(match) {
	return function() {
		return find$1.call(this.children, match);
	};
}
function childFirst() {
	return this.firstElementChild;
}
function selectChild_default(match) {
	return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}
var filter = Array.prototype.filter;
function children() {
	return Array.from(this.children);
}
function childrenFilter(match) {
	return function() {
		return filter.call(this.children, match);
	};
}
function selectChildren_default(match) {
	return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}
function filter_default(match) {
	if (typeof match !== "function") match = matcher_default(match);
	for (var groups = this._groups, m$2 = groups.length, subgroups = new Array(m$2), j$1 = 0; j$1 < m$2; ++j$1) for (var group = groups[j$1], n$1 = group.length, subgroup = subgroups[j$1] = [], node, i$1 = 0; i$1 < n$1; ++i$1) if ((node = group[i$1]) && match.call(node, node.__data__, i$1, group)) subgroup.push(node);
	return new Selection(subgroups, this._parents);
}
function sparse_default(update$1) {
	return new Array(update$1.length);
}
function enter_default() {
	return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
}
function EnterNode(parent, datum$1) {
	this.ownerDocument = parent.ownerDocument;
	this.namespaceURI = parent.namespaceURI;
	this._next = null;
	this._parent = parent;
	this.__data__ = datum$1;
}
EnterNode.prototype = {
	constructor: EnterNode,
	appendChild: function(child) {
		return this._parent.insertBefore(child, this._next);
	},
	insertBefore: function(child, next) {
		return this._parent.insertBefore(child, next);
	},
	querySelector: function(selector) {
		return this._parent.querySelector(selector);
	},
	querySelectorAll: function(selector) {
		return this._parent.querySelectorAll(selector);
	}
};
function constant_default$1(x$2) {
	return function() {
		return x$2;
	};
}
function bindIndex(parent, group, enter, update$1, exit, data) {
	var i$1 = 0, node, groupLength = group.length, dataLength = data.length;
	for (; i$1 < dataLength; ++i$1) if (node = group[i$1]) {
		node.__data__ = data[i$1];
		update$1[i$1] = node;
	} else enter[i$1] = new EnterNode(parent, data[i$1]);
	for (; i$1 < groupLength; ++i$1) if (node = group[i$1]) exit[i$1] = node;
}
function bindKey(parent, group, enter, update$1, exit, data, key) {
	var i$1, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
	for (i$1 = 0; i$1 < groupLength; ++i$1) if (node = group[i$1]) {
		keyValues[i$1] = keyValue = key.call(node, node.__data__, i$1, group) + "";
		if (nodeByKeyValue.has(keyValue)) exit[i$1] = node;
		else nodeByKeyValue.set(keyValue, node);
	}
	for (i$1 = 0; i$1 < dataLength; ++i$1) {
		keyValue = key.call(parent, data[i$1], i$1, data) + "";
		if (node = nodeByKeyValue.get(keyValue)) {
			update$1[i$1] = node;
			node.__data__ = data[i$1];
			nodeByKeyValue.delete(keyValue);
		} else enter[i$1] = new EnterNode(parent, data[i$1]);
	}
	for (i$1 = 0; i$1 < groupLength; ++i$1) if ((node = group[i$1]) && nodeByKeyValue.get(keyValues[i$1]) === node) exit[i$1] = node;
}
function datum(node) {
	return node.__data__;
}
function data_default$3(value, key) {
	if (!arguments.length) return Array.from(this, datum);
	var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
	if (typeof value !== "function") value = constant_default$1(value);
	for (var m$2 = groups.length, update$1 = new Array(m$2), enter = new Array(m$2), exit = new Array(m$2), j$1 = 0; j$1 < m$2; ++j$1) {
		var parent = parents[j$1], group = groups[j$1], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j$1, parents)), dataLength = data.length, enterGroup = enter[j$1] = new Array(dataLength), updateGroup = update$1[j$1] = new Array(dataLength);
		bind(parent, group, enterGroup, updateGroup, exit[j$1] = new Array(groupLength), data, key);
		for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) if (previous = enterGroup[i0]) {
			if (i0 >= i1) i1 = i0 + 1;
			while (!(next = updateGroup[i1]) && ++i1 < dataLength);
			previous._next = next || null;
		}
	}
	update$1 = new Selection(update$1, parents);
	update$1._enter = enter;
	update$1._exit = exit;
	return update$1;
}
function arraylike(data) {
	return typeof data === "object" && "length" in data ? data : Array.from(data);
}
function exit_default() {
	return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
}
function join_default(onenter, onupdate, onexit) {
	var enter = this.enter(), update$1 = this, exit = this.exit();
	if (typeof onenter === "function") {
		enter = onenter(enter);
		if (enter) enter = enter.selection();
	} else enter = enter.append(onenter + "");
	if (onupdate != null) {
		update$1 = onupdate(update$1);
		if (update$1) update$1 = update$1.selection();
	}
	if (onexit == null) exit.remove();
	else onexit(exit);
	return enter && update$1 ? enter.merge(update$1).order() : update$1;
}
function merge_default(context) {
	var selection$1 = context.selection ? context.selection() : context;
	for (var groups0 = this._groups, groups1 = selection$1._groups, m0 = groups0.length, m1 = groups1.length, m$2 = Math.min(m0, m1), merges = new Array(m0), j$1 = 0; j$1 < m$2; ++j$1) for (var group0 = groups0[j$1], group1 = groups1[j$1], n$1 = group0.length, merge = merges[j$1] = new Array(n$1), node, i$1 = 0; i$1 < n$1; ++i$1) if (node = group0[i$1] || group1[i$1]) merge[i$1] = node;
	for (; j$1 < m0; ++j$1) merges[j$1] = groups0[j$1];
	return new Selection(merges, this._parents);
}
function order_default() {
	for (var groups = this._groups, j$1 = -1, m$2 = groups.length; ++j$1 < m$2;) for (var group = groups[j$1], i$1 = group.length - 1, next = group[i$1], node; --i$1 >= 0;) if (node = group[i$1]) {
		if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
		next = node;
	}
	return this;
}
function sort_default(compare) {
	if (!compare) compare = ascending;
	function compareNode(a$2, b$1) {
		return a$2 && b$1 ? compare(a$2.__data__, b$1.__data__) : !a$2 - !b$1;
	}
	for (var groups = this._groups, m$2 = groups.length, sortgroups = new Array(m$2), j$1 = 0; j$1 < m$2; ++j$1) {
		for (var group = groups[j$1], n$1 = group.length, sortgroup = sortgroups[j$1] = new Array(n$1), node, i$1 = 0; i$1 < n$1; ++i$1) if (node = group[i$1]) sortgroup[i$1] = node;
		sortgroup.sort(compareNode);
	}
	return new Selection(sortgroups, this._parents).order();
}
function ascending(a$2, b$1) {
	return a$2 < b$1 ? -1 : a$2 > b$1 ? 1 : a$2 >= b$1 ? 0 : NaN;
}
function call_default() {
	var callback = arguments[0];
	arguments[0] = this;
	callback.apply(null, arguments);
	return this;
}
function nodes_default() {
	return Array.from(this);
}
function node_default() {
	for (var groups = this._groups, j$1 = 0, m$2 = groups.length; j$1 < m$2; ++j$1) for (var group = groups[j$1], i$1 = 0, n$1 = group.length; i$1 < n$1; ++i$1) {
		var node = group[i$1];
		if (node) return node;
	}
	return null;
}
function size_default$3() {
	let size = 0;
	for (const node of this) ++size;
	return size;
}
function empty_default() {
	return !this.node();
}
function each_default(callback) {
	for (var groups = this._groups, j$1 = 0, m$2 = groups.length; j$1 < m$2; ++j$1) for (var group = groups[j$1], i$1 = 0, n$1 = group.length, node; i$1 < n$1; ++i$1) if (node = group[i$1]) callback.call(node, node.__data__, i$1, group);
	return this;
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
function attrConstant(name, value) {
	return function() {
		this.setAttribute(name, value);
	};
}
function attrConstantNS(fullname, value) {
	return function() {
		this.setAttributeNS(fullname.space, fullname.local, value);
	};
}
function attrFunction(name, value) {
	return function() {
		var v$1 = value.apply(this, arguments);
		if (v$1 == null) this.removeAttribute(name);
		else this.setAttribute(name, v$1);
	};
}
function attrFunctionNS(fullname, value) {
	return function() {
		var v$1 = value.apply(this, arguments);
		if (v$1 == null) this.removeAttributeNS(fullname.space, fullname.local);
		else this.setAttributeNS(fullname.space, fullname.local, v$1);
	};
}
function attr_default(name, value) {
	var fullname = namespace_default(name);
	if (arguments.length < 2) {
		var node = this.node();
		return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
	}
	return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}
function window_default(node) {
	return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}
function styleRemove(name) {
	return function() {
		this.style.removeProperty(name);
	};
}
function styleConstant(name, value, priority) {
	return function() {
		this.style.setProperty(name, value, priority);
	};
}
function styleFunction(name, value, priority) {
	return function() {
		var v$1 = value.apply(this, arguments);
		if (v$1 == null) this.style.removeProperty(name);
		else this.style.setProperty(name, v$1, priority);
	};
}
function style_default(name, value, priority) {
	return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
	return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
}
function propertyRemove(name) {
	return function() {
		delete this[name];
	};
}
function propertyConstant(name, value) {
	return function() {
		this[name] = value;
	};
}
function propertyFunction(name, value) {
	return function() {
		var v$1 = value.apply(this, arguments);
		if (v$1 == null) delete this[name];
		else this[name] = v$1;
	};
}
function property_default(name, value) {
	return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}
function classArray(string) {
	return string.trim().split(/^|\s+/);
}
function classList(node) {
	return node.classList || new ClassList(node);
}
function ClassList(node) {
	this._node = node;
	this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
	add: function(name) {
		if (this._names.indexOf(name) < 0) {
			this._names.push(name);
			this._node.setAttribute("class", this._names.join(" "));
		}
	},
	remove: function(name) {
		var i$1 = this._names.indexOf(name);
		if (i$1 >= 0) {
			this._names.splice(i$1, 1);
			this._node.setAttribute("class", this._names.join(" "));
		}
	},
	contains: function(name) {
		return this._names.indexOf(name) >= 0;
	}
};
function classedAdd(node, names$1) {
	var list = classList(node), i$1 = -1, n$1 = names$1.length;
	while (++i$1 < n$1) list.add(names$1[i$1]);
}
function classedRemove(node, names$1) {
	var list = classList(node), i$1 = -1, n$1 = names$1.length;
	while (++i$1 < n$1) list.remove(names$1[i$1]);
}
function classedTrue(names$1) {
	return function() {
		classedAdd(this, names$1);
	};
}
function classedFalse(names$1) {
	return function() {
		classedRemove(this, names$1);
	};
}
function classedFunction(names$1, value) {
	return function() {
		(value.apply(this, arguments) ? classedAdd : classedRemove)(this, names$1);
	};
}
function classed_default(name, value) {
	var names$1 = classArray(name + "");
	if (arguments.length < 2) {
		var list = classList(this.node()), i$1 = -1, n$1 = names$1.length;
		while (++i$1 < n$1) if (!list.contains(names$1[i$1])) return false;
		return true;
	}
	return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names$1, value));
}
function textRemove() {
	this.textContent = "";
}
function textConstant(value) {
	return function() {
		this.textContent = value;
	};
}
function textFunction(value) {
	return function() {
		var v$1 = value.apply(this, arguments);
		this.textContent = v$1 == null ? "" : v$1;
	};
}
function text_default(value) {
	return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}
function htmlRemove() {
	this.innerHTML = "";
}
function htmlConstant(value) {
	return function() {
		this.innerHTML = value;
	};
}
function htmlFunction(value) {
	return function() {
		var v$1 = value.apply(this, arguments);
		this.innerHTML = v$1 == null ? "" : v$1;
	};
}
function html_default(value) {
	return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}
function raise() {
	if (this.nextSibling) this.parentNode.appendChild(this);
}
function raise_default() {
	return this.each(raise);
}
function lower() {
	if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default() {
	return this.each(lower);
}
function append_default(name) {
	var create = typeof name === "function" ? name : creator_default(name);
	return this.select(function() {
		return this.appendChild(create.apply(this, arguments));
	});
}
function constantNull() {
	return null;
}
function insert_default(name, before) {
	var create = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
	return this.select(function() {
		return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
	});
}
function remove$1() {
	var parent = this.parentNode;
	if (parent) parent.removeChild(this);
}
function remove_default$3() {
	return this.each(remove$1);
}
function selection_cloneShallow() {
	var clone = this.cloneNode(false), parent = this.parentNode;
	return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
	var clone = this.cloneNode(true), parent = this.parentNode;
	return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function clone_default(deep) {
	return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}
function datum_default(value) {
	return arguments.length ? this.property("__data__", value) : this.node().__data__;
}
function contextListener(listener) {
	return function(event) {
		listener.call(this, event, this.__data__);
	};
}
function parseTypenames$1(typenames) {
	return typenames.trim().split(/^|\s+/).map(function(t$1) {
		var name = "", i$1 = t$1.indexOf(".");
		if (i$1 >= 0) name = t$1.slice(i$1 + 1), t$1 = t$1.slice(0, i$1);
		return {
			type: t$1,
			name
		};
	});
}
function onRemove(typename) {
	return function() {
		var on = this.__on;
		if (!on) return;
		for (var j$1 = 0, i$1 = -1, m$2 = on.length, o$1; j$1 < m$2; ++j$1) if (o$1 = on[j$1], (!typename.type || o$1.type === typename.type) && o$1.name === typename.name) this.removeEventListener(o$1.type, o$1.listener, o$1.options);
		else on[++i$1] = o$1;
		if (++i$1) on.length = i$1;
		else delete this.__on;
	};
}
function onAdd(typename, value, options) {
	return function() {
		var on = this.__on, o$1, listener = contextListener(value);
		if (on) {
			for (var j$1 = 0, m$2 = on.length; j$1 < m$2; ++j$1) if ((o$1 = on[j$1]).type === typename.type && o$1.name === typename.name) {
				this.removeEventListener(o$1.type, o$1.listener, o$1.options);
				this.addEventListener(o$1.type, o$1.listener = listener, o$1.options = options);
				o$1.value = value;
				return;
			}
		}
		this.addEventListener(typename.type, listener, options);
		o$1 = {
			type: typename.type,
			name: typename.name,
			value,
			listener,
			options
		};
		if (!on) this.__on = [o$1];
		else on.push(o$1);
	};
}
function on_default(typename, value, options) {
	var typenames = parseTypenames$1(typename + ""), i$1, n$1 = typenames.length, t$1;
	if (arguments.length < 2) {
		var on = this.node().__on;
		if (on) {
			for (var j$1 = 0, m$2 = on.length, o$1; j$1 < m$2; ++j$1) for (i$1 = 0, o$1 = on[j$1]; i$1 < n$1; ++i$1) if ((t$1 = typenames[i$1]).type === o$1.type && t$1.name === o$1.name) return o$1.value;
		}
		return;
	}
	on = value ? onAdd : onRemove;
	for (i$1 = 0; i$1 < n$1; ++i$1) this.each(on(typenames[i$1], value, options));
	return this;
}
function dispatchEvent(node, type, params) {
	var window$1 = window_default(node), event = window$1.CustomEvent;
	if (typeof event === "function") event = new event(type, params);
	else {
		event = window$1.document.createEvent("Event");
		if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
		else event.initEvent(type, false, false);
	}
	node.dispatchEvent(event);
}
function dispatchConstant(type, params) {
	return function() {
		return dispatchEvent(this, type, params);
	};
}
function dispatchFunction(type, params) {
	return function() {
		return dispatchEvent(this, type, params.apply(this, arguments));
	};
}
function dispatch_default$1(type, params) {
	return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
}
function* iterator_default() {
	for (var groups = this._groups, j$1 = 0, m$2 = groups.length; j$1 < m$2; ++j$1) for (var group = groups[j$1], i$1 = 0, n$1 = group.length, node; i$1 < n$1; ++i$1) if (node = group[i$1]) yield node;
}
var root$1 = [null];
function Selection(groups, parents) {
	this._groups = groups;
	this._parents = parents;
}
function selection() {
	return new Selection([[document.documentElement]], root$1);
}
function selection_selection() {
	return this;
}
Selection.prototype = selection.prototype = {
	constructor: Selection,
	select: select_default$1,
	selectAll: selectAll_default,
	selectChild: selectChild_default,
	selectChildren: selectChildren_default,
	filter: filter_default,
	data: data_default$3,
	enter: enter_default,
	exit: exit_default,
	join: join_default,
	merge: merge_default,
	selection: selection_selection,
	order: order_default,
	sort: sort_default,
	call: call_default,
	nodes: nodes_default,
	node: node_default,
	size: size_default$3,
	empty: empty_default,
	each: each_default,
	attr: attr_default,
	style: style_default,
	property: property_default,
	classed: classed_default,
	text: text_default,
	html: html_default,
	raise: raise_default,
	lower: lower_default,
	append: append_default,
	insert: insert_default,
	remove: remove_default$3,
	clone: clone_default,
	datum: datum_default,
	on: on_default,
	dispatch: dispatch_default$1,
	[Symbol.iterator]: iterator_default
};
var selection_default = selection;
function select_default(selector) {
	return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root$1);
}
function sourceEvent_default(event) {
	let sourceEvent;
	while (sourceEvent = event.sourceEvent) event = sourceEvent;
	return event;
}
function pointer_default(event, node) {
	event = sourceEvent_default(event);
	if (node === void 0) node = event.currentTarget;
	if (node) {
		var svg = node.ownerSVGElement || node;
		if (svg.createSVGPoint) {
			var point = svg.createSVGPoint();
			point.x = event.clientX, point.y = event.clientY;
			point = point.matrixTransform(node.getScreenCTM().inverse());
			return [point.x, point.y];
		}
		if (node.getBoundingClientRect) {
			var rect = node.getBoundingClientRect();
			return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
		}
	}
	return [event.pageX, event.pageY];
}
var noop = { value: () => {} };
function dispatch() {
	for (var i$1 = 0, n$1 = arguments.length, _$1 = {}, t$1; i$1 < n$1; ++i$1) {
		if (!(t$1 = arguments[i$1] + "") || t$1 in _$1 || /[\s.]/.test(t$1)) throw new Error("illegal type: " + t$1);
		_$1[t$1] = [];
	}
	return new Dispatch(_$1);
}
function Dispatch(_$1) {
	this._ = _$1;
}
function parseTypenames(typenames, types) {
	return typenames.trim().split(/^|\s+/).map(function(t$1) {
		var name = "", i$1 = t$1.indexOf(".");
		if (i$1 >= 0) name = t$1.slice(i$1 + 1), t$1 = t$1.slice(0, i$1);
		if (t$1 && !types.hasOwnProperty(t$1)) throw new Error("unknown type: " + t$1);
		return {
			type: t$1,
			name
		};
	});
}
Dispatch.prototype = dispatch.prototype = {
	constructor: Dispatch,
	on: function(typename, callback) {
		var _$1 = this._, T$1 = parseTypenames(typename + "", _$1), t$1, i$1 = -1, n$1 = T$1.length;
		if (arguments.length < 2) {
			while (++i$1 < n$1) if ((t$1 = (typename = T$1[i$1]).type) && (t$1 = get(_$1[t$1], typename.name))) return t$1;
			return;
		}
		if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
		while (++i$1 < n$1) if (t$1 = (typename = T$1[i$1]).type) _$1[t$1] = set(_$1[t$1], typename.name, callback);
		else if (callback == null) for (t$1 in _$1) _$1[t$1] = set(_$1[t$1], typename.name, null);
		return this;
	},
	copy: function() {
		var copy = {}, _$1 = this._;
		for (var t$1 in _$1) copy[t$1] = _$1[t$1].slice();
		return new Dispatch(copy);
	},
	call: function(type, that) {
		if ((n$1 = arguments.length - 2) > 0) for (var args = new Array(n$1), i$1 = 0, n$1, t$1; i$1 < n$1; ++i$1) args[i$1] = arguments[i$1 + 2];
		if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
		for (t$1 = this._[type], i$1 = 0, n$1 = t$1.length; i$1 < n$1; ++i$1) t$1[i$1].value.apply(that, args);
	},
	apply: function(type, that, args) {
		if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
		for (var t$1 = this._[type], i$1 = 0, n$1 = t$1.length; i$1 < n$1; ++i$1) t$1[i$1].value.apply(that, args);
	}
};
function get(type, name) {
	for (var i$1 = 0, n$1 = type.length, c$2; i$1 < n$1; ++i$1) if ((c$2 = type[i$1]).name === name) return c$2.value;
}
function set(type, name, callback) {
	for (var i$1 = 0, n$1 = type.length; i$1 < n$1; ++i$1) if (type[i$1].name === name) {
		type[i$1] = noop, type = type.slice(0, i$1).concat(type.slice(i$1 + 1));
		break;
	}
	if (callback != null) type.push({
		name,
		value: callback
	});
	return type;
}
var dispatch_default = dispatch;
var frame = 0, timeout = 0, interval = 0, pokeDelay = 1e3, taskHead, taskTail, clockLast = 0, clockNow = 0, clockSkew = 0, clock = typeof performance === "object" && performance.now ? performance : Date, setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f$1) {
	setTimeout(f$1, 17);
};
function now$2() {
	return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
	clockNow = 0;
}
function Timer() {
	this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
	constructor: Timer,
	restart: function(callback, delay, time) {
		if (typeof callback !== "function") throw new TypeError("callback is not a function");
		time = (time == null ? now$2() : +time) + (delay == null ? 0 : +delay);
		if (!this._next && taskTail !== this) {
			if (taskTail) taskTail._next = this;
			else taskHead = this;
			taskTail = this;
		}
		this._call = callback;
		this._time = time;
		sleep();
	},
	stop: function() {
		if (this._call) {
			this._call = null;
			this._time = Infinity;
			sleep();
		}
	}
};
function timer(callback, delay, time) {
	var t$1 = new Timer();
	t$1.restart(callback, delay, time);
	return t$1;
}
function timerFlush() {
	now$2();
	++frame;
	var t$1 = taskHead, e$1;
	while (t$1) {
		if ((e$1 = clockNow - t$1._time) >= 0) t$1._call.call(void 0, e$1);
		t$1 = t$1._next;
	}
	--frame;
}
function wake() {
	clockNow = (clockLast = clock.now()) + clockSkew;
	frame = timeout = 0;
	try {
		timerFlush();
	} finally {
		frame = 0;
		nap();
		clockNow = 0;
	}
}
function poke() {
	var now$3 = clock.now(), delay = now$3 - clockLast;
	if (delay > pokeDelay) clockSkew -= delay, clockLast = now$3;
}
function nap() {
	var t0, t1 = taskHead, t2, time = Infinity;
	while (t1) if (t1._call) {
		if (time > t1._time) time = t1._time;
		t0 = t1, t1 = t1._next;
	} else {
		t2 = t1._next, t1._next = null;
		t1 = t0 ? t0._next = t2 : taskHead = t2;
	}
	taskTail = t0;
	sleep(time);
}
function sleep(time) {
	if (frame) return;
	if (timeout) timeout = clearTimeout(timeout);
	if (time - clockNow > 24) {
		if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
		if (interval) interval = clearInterval(interval);
	} else {
		if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
		frame = 1, setFrame(wake);
	}
}
var _freeGlobal_default = typeof global == "object" && global && global.Object === Object && global;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var _root_default = _freeGlobal_default || freeSelf || Function("return this")();
var _Symbol_default = _root_default.Symbol;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var nativeObjectToString$1 = objectProto.toString;
var symToStringTag$1 = _Symbol_default ? _Symbol_default.toStringTag : void 0;
function getRawTag(value) {
	var isOwn = hasOwnProperty.call(value, symToStringTag$1), tag = value[symToStringTag$1];
	try {
		value[symToStringTag$1] = void 0;
		var unmasked = true;
	} catch (e$1) {}
	var result = nativeObjectToString$1.call(value);
	if (unmasked) if (isOwn) value[symToStringTag$1] = tag;
	else delete value[symToStringTag$1];
	return result;
}
var _getRawTag_default = getRawTag;
var nativeObjectToString = Object.prototype.toString;
function objectToString(value) {
	return nativeObjectToString.call(value);
}
var _objectToString_default = objectToString;
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = _Symbol_default ? _Symbol_default.toStringTag : void 0;
function baseGetTag(value) {
	if (value == null) return value === void 0 ? undefinedTag : nullTag;
	return symToStringTag && symToStringTag in Object(value) ? _getRawTag_default(value) : _objectToString_default(value);
}
var _baseGetTag_default = baseGetTag;
function isObjectLike(value) {
	return value != null && typeof value == "object";
}
var isObjectLike_default = isObjectLike;
var symbolTag = "[object Symbol]";
function isSymbol(value) {
	return typeof value == "symbol" || isObjectLike_default(value) && _baseGetTag_default(value) == symbolTag;
}
var isSymbol_default = isSymbol;
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
	var index$5 = string.length;
	while (index$5-- && reWhitespace.test(string.charAt(index$5)));
	return index$5;
}
var _trimmedEndIndex_default = trimmedEndIndex;
var reTrimStart = /^\s+/;
function baseTrim(string) {
	return string ? string.slice(0, _trimmedEndIndex_default(string) + 1).replace(reTrimStart, "") : string;
}
var _baseTrim_default = baseTrim;
function isObject(value) {
	var type = typeof value;
	return value != null && (type == "object" || type == "function");
}
var isObject_default = isObject;
var NAN = NaN;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
	if (typeof value == "number") return value;
	if (isSymbol_default(value)) return NAN;
	if (isObject_default(value)) {
		var other = typeof value.valueOf == "function" ? value.valueOf() : value;
		value = isObject_default(other) ? other + "" : other;
	}
	if (typeof value != "string") return value === 0 ? value : +value;
	value = _baseTrim_default(value);
	var isBinary = reIsBinary.test(value);
	return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var toNumber_default = toNumber;
var now$1 = function() {
	return _root_default.Date.now();
};
var now_default = now$1;
var FUNC_ERROR_TEXT = "Expected a function";
var nativeMax = Math.max, nativeMin = Math.min;
function debounce(func, wait, options) {
	var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
	if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
	wait = toNumber_default(wait) || 0;
	if (isObject_default(options)) {
		leading = !!options.leading;
		maxing = "maxWait" in options;
		maxWait = maxing ? nativeMax(toNumber_default(options.maxWait) || 0, wait) : maxWait;
		trailing = "trailing" in options ? !!options.trailing : trailing;
	}
	function invokeFunc(time) {
		var args = lastArgs, thisArg = lastThis;
		lastArgs = lastThis = void 0;
		lastInvokeTime = time;
		result = func.apply(thisArg, args);
		return result;
	}
	function leadingEdge(time) {
		lastInvokeTime = time;
		timerId = setTimeout(timerExpired, wait);
		return leading ? invokeFunc(time) : result;
	}
	function remainingWait(time) {
		var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
		return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
	}
	function shouldInvoke(time) {
		var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
		return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
	}
	function timerExpired() {
		var time = now_default();
		if (shouldInvoke(time)) return trailingEdge(time);
		timerId = setTimeout(timerExpired, remainingWait(time));
	}
	function trailingEdge(time) {
		timerId = void 0;
		if (trailing && lastArgs) return invokeFunc(time);
		lastArgs = lastThis = void 0;
		return result;
	}
	function cancel() {
		if (timerId !== void 0) clearTimeout(timerId);
		lastInvokeTime = 0;
		lastArgs = lastCallTime = lastThis = timerId = void 0;
	}
	function flush() {
		return timerId === void 0 ? result : trailingEdge(now_default());
	}
	function debounced() {
		var time = now_default(), isInvoking = shouldInvoke(time);
		lastArgs = arguments;
		lastThis = this;
		lastCallTime = time;
		if (isInvoking) {
			if (timerId === void 0) return leadingEdge(lastCallTime);
			if (maxing) {
				clearTimeout(timerId);
				timerId = setTimeout(timerExpired, wait);
				return invokeFunc(lastCallTime);
			}
		}
		if (timerId === void 0) timerId = setTimeout(timerExpired, wait);
		return result;
	}
	debounced.cancel = cancel;
	debounced.flush = flush;
	return debounced;
}
var debounce_default = debounce;
var Easing = Object.freeze({
	Linear: Object.freeze({
		None: function(amount) {
			return amount;
		},
		In: function(amount) {
			return amount;
		},
		Out: function(amount) {
			return amount;
		},
		InOut: function(amount) {
			return amount;
		}
	}),
	Quadratic: Object.freeze({
		In: function(amount) {
			return amount * amount;
		},
		Out: function(amount) {
			return amount * (2 - amount);
		},
		InOut: function(amount) {
			if ((amount *= 2) < 1) return .5 * amount * amount;
			return -.5 * (--amount * (amount - 2) - 1);
		}
	}),
	Cubic: Object.freeze({
		In: function(amount) {
			return amount * amount * amount;
		},
		Out: function(amount) {
			return --amount * amount * amount + 1;
		},
		InOut: function(amount) {
			if ((amount *= 2) < 1) return .5 * amount * amount * amount;
			return .5 * ((amount -= 2) * amount * amount + 2);
		}
	}),
	Quartic: Object.freeze({
		In: function(amount) {
			return amount * amount * amount * amount;
		},
		Out: function(amount) {
			return 1 - --amount * amount * amount * amount;
		},
		InOut: function(amount) {
			if ((amount *= 2) < 1) return .5 * amount * amount * amount * amount;
			return -.5 * ((amount -= 2) * amount * amount * amount - 2);
		}
	}),
	Quintic: Object.freeze({
		In: function(amount) {
			return amount * amount * amount * amount * amount;
		},
		Out: function(amount) {
			return --amount * amount * amount * amount * amount + 1;
		},
		InOut: function(amount) {
			if ((amount *= 2) < 1) return .5 * amount * amount * amount * amount * amount;
			return .5 * ((amount -= 2) * amount * amount * amount * amount + 2);
		}
	}),
	Sinusoidal: Object.freeze({
		In: function(amount) {
			return 1 - Math.sin((1 - amount) * Math.PI / 2);
		},
		Out: function(amount) {
			return Math.sin(amount * Math.PI / 2);
		},
		InOut: function(amount) {
			return .5 * (1 - Math.sin(Math.PI * (.5 - amount)));
		}
	}),
	Exponential: Object.freeze({
		In: function(amount) {
			return amount === 0 ? 0 : Math.pow(1024, amount - 1);
		},
		Out: function(amount) {
			return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount);
		},
		InOut: function(amount) {
			if (amount === 0) return 0;
			if (amount === 1) return 1;
			if ((amount *= 2) < 1) return .5 * Math.pow(1024, amount - 1);
			return .5 * (-Math.pow(2, -10 * (amount - 1)) + 2);
		}
	}),
	Circular: Object.freeze({
		In: function(amount) {
			return 1 - Math.sqrt(1 - amount * amount);
		},
		Out: function(amount) {
			return Math.sqrt(1 - --amount * amount);
		},
		InOut: function(amount) {
			if ((amount *= 2) < 1) return -.5 * (Math.sqrt(1 - amount * amount) - 1);
			return .5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
		}
	}),
	Elastic: Object.freeze({
		In: function(amount) {
			if (amount === 0) return 0;
			if (amount === 1) return 1;
			return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
		},
		Out: function(amount) {
			if (amount === 0) return 0;
			if (amount === 1) return 1;
			return Math.pow(2, -10 * amount) * Math.sin((amount - .1) * 5 * Math.PI) + 1;
		},
		InOut: function(amount) {
			if (amount === 0) return 0;
			if (amount === 1) return 1;
			amount *= 2;
			if (amount < 1) return -.5 * Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
			return .5 * Math.pow(2, -10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1;
		}
	}),
	Back: Object.freeze({
		In: function(amount) {
			var s$1 = 1.70158;
			return amount === 1 ? 1 : amount * amount * ((s$1 + 1) * amount - s$1);
		},
		Out: function(amount) {
			var s$1 = 1.70158;
			return amount === 0 ? 0 : --amount * amount * ((s$1 + 1) * amount + s$1) + 1;
		},
		InOut: function(amount) {
			var s$1 = 1.70158 * 1.525;
			if ((amount *= 2) < 1) return .5 * (amount * amount * ((s$1 + 1) * amount - s$1));
			return .5 * ((amount -= 2) * amount * ((s$1 + 1) * amount + s$1) + 2);
		}
	}),
	Bounce: Object.freeze({
		In: function(amount) {
			return 1 - Easing.Bounce.Out(1 - amount);
		},
		Out: function(amount) {
			if (amount < 1 / 2.75) return 7.5625 * amount * amount;
			else if (amount < 2 / 2.75) return 7.5625 * (amount -= 1.5 / 2.75) * amount + .75;
			else if (amount < 2.5 / 2.75) return 7.5625 * (amount -= 2.25 / 2.75) * amount + .9375;
			else return 7.5625 * (amount -= 2.625 / 2.75) * amount + .984375;
		},
		InOut: function(amount) {
			if (amount < .5) return Easing.Bounce.In(amount * 2) * .5;
			return Easing.Bounce.Out(amount * 2 - 1) * .5 + .5;
		}
	}),
	generatePow: function(power) {
		if (power === void 0) power = 4;
		power = power < Number.EPSILON ? Number.EPSILON : power;
		power = power > 1e4 ? 1e4 : power;
		return {
			In: function(amount) {
				return Math.pow(amount, power);
			},
			Out: function(amount) {
				return 1 - Math.pow(1 - amount, power);
			},
			InOut: function(amount) {
				if (amount < .5) return Math.pow(amount * 2, power) / 2;
				return (1 - Math.pow(2 - amount * 2, power)) / 2 + .5;
			}
		};
	}
});
var now = function() {
	return performance.now();
};
var Group = function() {
	function Group$1() {
		var tweens = [];
		for (var _i = 0; _i < arguments.length; _i++) tweens[_i] = arguments[_i];
		this._tweens = {};
		this._tweensAddedDuringUpdate = {};
		this.add.apply(this, tweens);
	}
	Group$1.prototype.getAll = function() {
		var _this = this;
		return Object.keys(this._tweens).map(function(tweenId) {
			return _this._tweens[tweenId];
		});
	};
	Group$1.prototype.removeAll = function() {
		this._tweens = {};
	};
	Group$1.prototype.add = function() {
		var _a;
		var tweens = [];
		for (var _i = 0; _i < arguments.length; _i++) tweens[_i] = arguments[_i];
		for (var _b = 0, tweens_1 = tweens; _b < tweens_1.length; _b++) {
			var tween = tweens_1[_b];
			(_a = tween._group) === null || _a === void 0 || _a.remove(tween);
			tween._group = this;
			this._tweens[tween.getId()] = tween;
			this._tweensAddedDuringUpdate[tween.getId()] = tween;
		}
	};
	Group$1.prototype.remove = function() {
		var tweens = [];
		for (var _i = 0; _i < arguments.length; _i++) tweens[_i] = arguments[_i];
		for (var _a = 0, tweens_2 = tweens; _a < tweens_2.length; _a++) {
			var tween = tweens_2[_a];
			tween._group = void 0;
			delete this._tweens[tween.getId()];
			delete this._tweensAddedDuringUpdate[tween.getId()];
		}
	};
	Group$1.prototype.allStopped = function() {
		return this.getAll().every(function(tween) {
			return !tween.isPlaying();
		});
	};
	Group$1.prototype.update = function(time, preserve) {
		if (time === void 0) time = now();
		if (preserve === void 0) preserve = true;
		var tweenIds = Object.keys(this._tweens);
		if (tweenIds.length === 0) return;
		while (tweenIds.length > 0) {
			this._tweensAddedDuringUpdate = {};
			for (var i$1 = 0; i$1 < tweenIds.length; i$1++) {
				var tween = this._tweens[tweenIds[i$1]];
				var autoStart = !preserve;
				if (tween && tween.update(time, autoStart) === false && !preserve) this.remove(tween);
			}
			tweenIds = Object.keys(this._tweensAddedDuringUpdate);
		}
	};
	return Group$1;
}();
var Interpolation = {
	Linear: function(v$1, k$1) {
		var m$2 = v$1.length - 1;
		var f$1 = m$2 * k$1;
		var i$1 = Math.floor(f$1);
		var fn = Interpolation.Utils.Linear;
		if (k$1 < 0) return fn(v$1[0], v$1[1], f$1);
		if (k$1 > 1) return fn(v$1[m$2], v$1[m$2 - 1], m$2 - f$1);
		return fn(v$1[i$1], v$1[i$1 + 1 > m$2 ? m$2 : i$1 + 1], f$1 - i$1);
	},
	Bezier: function(v$1, k$1) {
		var b$1 = 0;
		var n$1 = v$1.length - 1;
		var pw = Math.pow;
		var bn = Interpolation.Utils.Bernstein;
		for (var i$1 = 0; i$1 <= n$1; i$1++) b$1 += pw(1 - k$1, n$1 - i$1) * pw(k$1, i$1) * v$1[i$1] * bn(n$1, i$1);
		return b$1;
	},
	CatmullRom: function(v$1, k$1) {
		var m$2 = v$1.length - 1;
		var f$1 = m$2 * k$1;
		var i$1 = Math.floor(f$1);
		var fn = Interpolation.Utils.CatmullRom;
		if (v$1[0] === v$1[m$2]) {
			if (k$1 < 0) i$1 = Math.floor(f$1 = m$2 * (1 + k$1));
			return fn(v$1[(i$1 - 1 + m$2) % m$2], v$1[i$1], v$1[(i$1 + 1) % m$2], v$1[(i$1 + 2) % m$2], f$1 - i$1);
		} else {
			if (k$1 < 0) return v$1[0] - (fn(v$1[0], v$1[0], v$1[1], v$1[1], -f$1) - v$1[0]);
			if (k$1 > 1) return v$1[m$2] - (fn(v$1[m$2], v$1[m$2], v$1[m$2 - 1], v$1[m$2 - 1], f$1 - m$2) - v$1[m$2]);
			return fn(v$1[i$1 ? i$1 - 1 : 0], v$1[i$1], v$1[m$2 < i$1 + 1 ? m$2 : i$1 + 1], v$1[m$2 < i$1 + 2 ? m$2 : i$1 + 2], f$1 - i$1);
		}
	},
	Utils: {
		Linear: function(p0, p1, t$1) {
			return (p1 - p0) * t$1 + p0;
		},
		Bernstein: function(n$1, i$1) {
			var fc = Interpolation.Utils.Factorial;
			return fc(n$1) / fc(i$1) / fc(n$1 - i$1);
		},
		Factorial: (function() {
			var a$2 = [1];
			return function(n$1) {
				var s$1 = 1;
				if (a$2[n$1]) return a$2[n$1];
				for (var i$1 = n$1; i$1 > 1; i$1--) s$1 *= i$1;
				a$2[n$1] = s$1;
				return s$1;
			};
		})(),
		CatmullRom: function(p0, p1, p2, p3, t$1) {
			var v0 = (p2 - p0) * .5;
			var v1 = (p3 - p1) * .5;
			var t2 = t$1 * t$1;
			var t3 = t$1 * t2;
			return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t$1 + p1;
		}
	}
};
var Sequence = function() {
	function Sequence$1() {}
	Sequence$1.nextId = function() {
		return Sequence$1._nextId++;
	};
	Sequence$1._nextId = 0;
	return Sequence$1;
}();
var mainGroup = new Group();
var Tween = function() {
	function Tween$1(object, group) {
		this._isPaused = false;
		this._pauseStart = 0;
		this._valuesStart = {};
		this._valuesEnd = {};
		this._valuesStartRepeat = {};
		this._duration = 1e3;
		this._isDynamic = false;
		this._initialRepeat = 0;
		this._repeat = 0;
		this._yoyo = false;
		this._isPlaying = false;
		this._reversed = false;
		this._delayTime = 0;
		this._startTime = 0;
		this._easingFunction = Easing.Linear.None;
		this._interpolationFunction = Interpolation.Linear;
		this._chainedTweens = [];
		this._onStartCallbackFired = false;
		this._onEveryStartCallbackFired = false;
		this._id = Sequence.nextId();
		this._isChainStopped = false;
		this._propertiesAreSetUp = false;
		this._goToEnd = false;
		this._object = object;
		if (typeof group === "object") {
			this._group = group;
			group.add(this);
		} else if (group === true) {
			this._group = mainGroup;
			mainGroup.add(this);
		}
	}
	Tween$1.prototype.getId = function() {
		return this._id;
	};
	Tween$1.prototype.isPlaying = function() {
		return this._isPlaying;
	};
	Tween$1.prototype.isPaused = function() {
		return this._isPaused;
	};
	Tween$1.prototype.getDuration = function() {
		return this._duration;
	};
	Tween$1.prototype.to = function(target, duration) {
		if (duration === void 0) duration = 1e3;
		if (this._isPlaying) throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");
		this._valuesEnd = target;
		this._propertiesAreSetUp = false;
		this._duration = duration < 0 ? 0 : duration;
		return this;
	};
	Tween$1.prototype.duration = function(duration) {
		if (duration === void 0) duration = 1e3;
		this._duration = duration < 0 ? 0 : duration;
		return this;
	};
	Tween$1.prototype.dynamic = function(dynamic) {
		if (dynamic === void 0) dynamic = false;
		this._isDynamic = dynamic;
		return this;
	};
	Tween$1.prototype.start = function(time, overrideStartingValues) {
		if (time === void 0) time = now();
		if (overrideStartingValues === void 0) overrideStartingValues = false;
		if (this._isPlaying) return this;
		this._repeat = this._initialRepeat;
		if (this._reversed) {
			this._reversed = false;
			for (var property in this._valuesStartRepeat) {
				this._swapEndStartRepeatValues(property);
				this._valuesStart[property] = this._valuesStartRepeat[property];
			}
		}
		this._isPlaying = true;
		this._isPaused = false;
		this._onStartCallbackFired = false;
		this._onEveryStartCallbackFired = false;
		this._isChainStopped = false;
		this._startTime = time;
		this._startTime += this._delayTime;
		if (!this._propertiesAreSetUp || overrideStartingValues) {
			this._propertiesAreSetUp = true;
			if (!this._isDynamic) {
				var tmp = {};
				for (var prop in this._valuesEnd) tmp[prop] = this._valuesEnd[prop];
				this._valuesEnd = tmp;
			}
			this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat, overrideStartingValues);
		}
		return this;
	};
	Tween$1.prototype.startFromCurrentValues = function(time) {
		return this.start(time, true);
	};
	Tween$1.prototype._setupProperties = function(_object, _valuesStart, _valuesEnd, _valuesStartRepeat, overrideStartingValues) {
		for (var property in _valuesEnd) {
			var startValue = _object[property];
			var startValueIsArray = Array.isArray(startValue);
			var propType = startValueIsArray ? "array" : typeof startValue;
			var isInterpolationList = !startValueIsArray && Array.isArray(_valuesEnd[property]);
			if (propType === "undefined" || propType === "function") continue;
			if (isInterpolationList) {
				var endValues = _valuesEnd[property];
				if (endValues.length === 0) continue;
				var temp = [startValue];
				for (var i$1 = 0, l$1 = endValues.length; i$1 < l$1; i$1 += 1) {
					var value = this._handleRelativeValue(startValue, endValues[i$1]);
					if (isNaN(value)) {
						isInterpolationList = false;
						console.warn("Found invalid interpolation list. Skipping.");
						break;
					}
					temp.push(value);
				}
				if (isInterpolationList) _valuesEnd[property] = temp;
			}
			if ((propType === "object" || startValueIsArray) && startValue && !isInterpolationList) {
				_valuesStart[property] = startValueIsArray ? [] : {};
				var nestedObject = startValue;
				for (var prop in nestedObject) _valuesStart[property][prop] = nestedObject[prop];
				_valuesStartRepeat[property] = startValueIsArray ? [] : {};
				var endValues = _valuesEnd[property];
				if (!this._isDynamic) {
					var tmp = {};
					for (var prop in endValues) tmp[prop] = endValues[prop];
					_valuesEnd[property] = endValues = tmp;
				}
				this._setupProperties(nestedObject, _valuesStart[property], endValues, _valuesStartRepeat[property], overrideStartingValues);
			} else {
				if (typeof _valuesStart[property] === "undefined" || overrideStartingValues) _valuesStart[property] = startValue;
				if (!startValueIsArray) _valuesStart[property] *= 1;
				if (isInterpolationList) _valuesStartRepeat[property] = _valuesEnd[property].slice().reverse();
				else _valuesStartRepeat[property] = _valuesStart[property] || 0;
			}
		}
	};
	Tween$1.prototype.stop = function() {
		if (!this._isChainStopped) {
			this._isChainStopped = true;
			this.stopChainedTweens();
		}
		if (!this._isPlaying) return this;
		this._isPlaying = false;
		this._isPaused = false;
		if (this._onStopCallback) this._onStopCallback(this._object);
		return this;
	};
	Tween$1.prototype.end = function() {
		this._goToEnd = true;
		this.update(this._startTime + this._duration);
		return this;
	};
	Tween$1.prototype.pause = function(time) {
		if (time === void 0) time = now();
		if (this._isPaused || !this._isPlaying) return this;
		this._isPaused = true;
		this._pauseStart = time;
		return this;
	};
	Tween$1.prototype.resume = function(time) {
		if (time === void 0) time = now();
		if (!this._isPaused || !this._isPlaying) return this;
		this._isPaused = false;
		this._startTime += time - this._pauseStart;
		this._pauseStart = 0;
		return this;
	};
	Tween$1.prototype.stopChainedTweens = function() {
		for (var i$1 = 0, numChainedTweens = this._chainedTweens.length; i$1 < numChainedTweens; i$1++) this._chainedTweens[i$1].stop();
		return this;
	};
	Tween$1.prototype.group = function(group) {
		if (!group) {
			console.warn("tween.group() without args has been removed, use group.add(tween) instead.");
			return this;
		}
		group.add(this);
		return this;
	};
	Tween$1.prototype.remove = function() {
		var _a;
		(_a = this._group) === null || _a === void 0 || _a.remove(this);
		return this;
	};
	Tween$1.prototype.delay = function(amount) {
		if (amount === void 0) amount = 0;
		this._delayTime = amount;
		return this;
	};
	Tween$1.prototype.repeat = function(times) {
		if (times === void 0) times = 0;
		this._initialRepeat = times;
		this._repeat = times;
		return this;
	};
	Tween$1.prototype.repeatDelay = function(amount) {
		this._repeatDelayTime = amount;
		return this;
	};
	Tween$1.prototype.yoyo = function(yoyo) {
		if (yoyo === void 0) yoyo = false;
		this._yoyo = yoyo;
		return this;
	};
	Tween$1.prototype.easing = function(easingFunction) {
		if (easingFunction === void 0) easingFunction = Easing.Linear.None;
		this._easingFunction = easingFunction;
		return this;
	};
	Tween$1.prototype.interpolation = function(interpolationFunction) {
		if (interpolationFunction === void 0) interpolationFunction = Interpolation.Linear;
		this._interpolationFunction = interpolationFunction;
		return this;
	};
	Tween$1.prototype.chain = function() {
		var tweens = [];
		for (var _i = 0; _i < arguments.length; _i++) tweens[_i] = arguments[_i];
		this._chainedTweens = tweens;
		return this;
	};
	Tween$1.prototype.onStart = function(callback) {
		this._onStartCallback = callback;
		return this;
	};
	Tween$1.prototype.onEveryStart = function(callback) {
		this._onEveryStartCallback = callback;
		return this;
	};
	Tween$1.prototype.onUpdate = function(callback) {
		this._onUpdateCallback = callback;
		return this;
	};
	Tween$1.prototype.onRepeat = function(callback) {
		this._onRepeatCallback = callback;
		return this;
	};
	Tween$1.prototype.onComplete = function(callback) {
		this._onCompleteCallback = callback;
		return this;
	};
	Tween$1.prototype.onStop = function(callback) {
		this._onStopCallback = callback;
		return this;
	};
	Tween$1.prototype.update = function(time, autoStart) {
		var _this = this;
		var _a;
		if (time === void 0) time = now();
		if (autoStart === void 0) autoStart = Tween$1.autoStartOnUpdate;
		if (this._isPaused) return true;
		var property;
		if (!this._goToEnd && !this._isPlaying) if (autoStart) this.start(time, true);
		else return false;
		this._goToEnd = false;
		if (time < this._startTime) return true;
		if (this._onStartCallbackFired === false) {
			if (this._onStartCallback) this._onStartCallback(this._object);
			this._onStartCallbackFired = true;
		}
		if (this._onEveryStartCallbackFired === false) {
			if (this._onEveryStartCallback) this._onEveryStartCallback(this._object);
			this._onEveryStartCallbackFired = true;
		}
		var elapsedTime = time - this._startTime;
		var durationAndDelay = this._duration + ((_a = this._repeatDelayTime) !== null && _a !== void 0 ? _a : this._delayTime);
		var totalTime = this._duration + this._repeat * durationAndDelay;
		var calculateElapsedPortion = function() {
			if (_this._duration === 0) return 1;
			if (elapsedTime > totalTime) return 1;
			var timeIntoCurrentRepeat = elapsedTime - Math.trunc(elapsedTime / durationAndDelay) * durationAndDelay;
			var portion = Math.min(timeIntoCurrentRepeat / _this._duration, 1);
			if (portion === 0 && elapsedTime === _this._duration) return 1;
			return portion;
		};
		var elapsed = calculateElapsedPortion();
		var value = this._easingFunction(elapsed);
		this._updateProperties(this._object, this._valuesStart, this._valuesEnd, value);
		if (this._onUpdateCallback) this._onUpdateCallback(this._object, elapsed);
		if (this._duration === 0 || elapsedTime >= this._duration) if (this._repeat > 0) {
			var completeCount = Math.min(Math.trunc((elapsedTime - this._duration) / durationAndDelay) + 1, this._repeat);
			if (isFinite(this._repeat)) this._repeat -= completeCount;
			for (property in this._valuesStartRepeat) {
				if (!this._yoyo && typeof this._valuesEnd[property] === "string") this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
				if (this._yoyo) this._swapEndStartRepeatValues(property);
				this._valuesStart[property] = this._valuesStartRepeat[property];
			}
			if (this._yoyo) this._reversed = !this._reversed;
			this._startTime += durationAndDelay * completeCount;
			if (this._onRepeatCallback) this._onRepeatCallback(this._object);
			this._onEveryStartCallbackFired = false;
			return true;
		} else {
			if (this._onCompleteCallback) this._onCompleteCallback(this._object);
			for (var i$1 = 0, numChainedTweens = this._chainedTweens.length; i$1 < numChainedTweens; i$1++) this._chainedTweens[i$1].start(this._startTime + this._duration, false);
			this._isPlaying = false;
			return false;
		}
		return true;
	};
	Tween$1.prototype._updateProperties = function(_object, _valuesStart, _valuesEnd, value) {
		for (var property in _valuesEnd) {
			if (_valuesStart[property] === void 0) continue;
			var start = _valuesStart[property] || 0;
			var end = _valuesEnd[property];
			if (!Array.isArray(_object[property]) && Array.isArray(end)) _object[property] = this._interpolationFunction(end, value);
			else if (typeof end === "object" && end) this._updateProperties(_object[property], start, end, value);
			else {
				end = this._handleRelativeValue(start, end);
				if (typeof end === "number") _object[property] = start + (end - start) * value;
			}
		}
	};
	Tween$1.prototype._handleRelativeValue = function(start, end) {
		if (typeof end !== "string") return end;
		if (end.charAt(0) === "+" || end.charAt(0) === "-") return start + parseFloat(end);
		return parseFloat(end);
	};
	Tween$1.prototype._swapEndStartRepeatValues = function(property) {
		var tmp = this._valuesStartRepeat[property];
		var endValue = this._valuesEnd[property];
		if (typeof endValue === "string") this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(endValue);
		else this._valuesStartRepeat[property] = this._valuesEnd[property];
		this._valuesEnd[property] = tmp;
	};
	Tween$1.autoStartOnUpdate = false;
	return Tween$1;
}();
Sequence.nextId;
var TWEEN = mainGroup;
TWEEN.getAll.bind(TWEEN);
TWEEN.removeAll.bind(TWEEN);
TWEEN.add.bind(TWEEN);
TWEEN.remove.bind(TWEEN);
TWEEN.update.bind(TWEEN);
function _arrayLikeToArray$1(r$1, a$2) {
	(null == a$2 || a$2 > r$1.length) && (a$2 = r$1.length);
	for (var e$1 = 0, n$1 = Array(a$2); e$1 < a$2; e$1++) n$1[e$1] = r$1[e$1];
	return n$1;
}
function _arrayWithHoles$1(r$1) {
	if (Array.isArray(r$1)) return r$1;
}
function _classCallCheck(a$2, n$1) {
	if (!(a$2 instanceof n$1)) throw new TypeError("Cannot call a class as a function");
}
function _createClass(e$1, r$1, t$1) {
	return Object.defineProperty(e$1, "prototype", { writable: false }), e$1;
}
function _iterableToArrayLimit$1(r$1, l$1) {
	var t$1 = null == r$1 ? null : "undefined" != typeof Symbol && r$1[Symbol.iterator] || r$1["@@iterator"];
	if (null != t$1) {
		var e$1, n$1, i$1, u$1, a$2 = [], f$1 = true, o$1 = false;
		try {
			if (i$1 = (t$1 = t$1.call(r$1)).next, 0 === l$1);
			else for (; !(f$1 = (e$1 = i$1.call(t$1)).done) && (a$2.push(e$1.value), a$2.length !== l$1); f$1 = !0);
		} catch (r$2) {
			o$1 = true, n$1 = r$2;
		} finally {
			try {
				if (!f$1 && null != t$1.return && (u$1 = t$1.return(), Object(u$1) !== u$1)) return;
			} finally {
				if (o$1) throw n$1;
			}
		}
		return a$2;
	}
}
function _nonIterableRest$1() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray$1(r$1, e$1) {
	return _arrayWithHoles$1(r$1) || _iterableToArrayLimit$1(r$1, e$1) || _unsupportedIterableToArray$1(r$1, e$1) || _nonIterableRest$1();
}
function _unsupportedIterableToArray$1(r$1, a$2) {
	if (r$1) {
		if ("string" == typeof r$1) return _arrayLikeToArray$1(r$1, a$2);
		var t$1 = {}.toString.call(r$1).slice(8, -1);
		return "Object" === t$1 && r$1.constructor && (t$1 = r$1.constructor.name), "Map" === t$1 || "Set" === t$1 ? Array.from(r$1) : "Arguments" === t$1 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t$1) ? _arrayLikeToArray$1(r$1, a$2) : void 0;
	}
}
var Prop = /* @__PURE__ */ _createClass(function Prop$1(name, _ref) {
	var _ref$default = _ref["default"], defaultVal = _ref$default === void 0 ? null : _ref$default, _ref$triggerUpdate = _ref.triggerUpdate, triggerUpdate = _ref$triggerUpdate === void 0 ? true : _ref$triggerUpdate, _ref$onChange = _ref.onChange, onChange = _ref$onChange === void 0 ? function(newVal, state) {} : _ref$onChange;
	_classCallCheck(this, Prop$1);
	this.name = name;
	this.defaultVal = defaultVal;
	this.triggerUpdate = triggerUpdate;
	this.onChange = onChange;
});
function index$1(_ref2) {
	var _ref2$stateInit = _ref2.stateInit, stateInit = _ref2$stateInit === void 0 ? function() {
		return {};
	} : _ref2$stateInit, _ref2$props = _ref2.props, rawProps = _ref2$props === void 0 ? {} : _ref2$props, _ref2$methods = _ref2.methods, methods = _ref2$methods === void 0 ? {} : _ref2$methods, _ref2$aliases = _ref2.aliases, aliases = _ref2$aliases === void 0 ? {} : _ref2$aliases, _ref2$init = _ref2.init, initFn = _ref2$init === void 0 ? function() {} : _ref2$init, _ref2$update = _ref2.update, updateFn = _ref2$update === void 0 ? function() {} : _ref2$update;
	var props = Object.keys(rawProps).map(function(propName) {
		return new Prop(propName, rawProps[propName]);
	});
	return function KapsuleComp() {
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		var classMode = !!(this instanceof KapsuleComp ? this.constructor : void 0);
		var nodeElement = classMode ? args.shift() : void 0;
		var _args$ = args[0], options = _args$ === void 0 ? {} : _args$;
		var state = Object.assign({}, stateInit instanceof Function ? stateInit(options) : stateInit, { initialised: false });
		var changedProps = {};
		function comp(nodeElement$1) {
			initStatic(nodeElement$1, options);
			digest();
			return comp;
		}
		var initStatic = function initStatic$1(nodeElement$1, options$1) {
			initFn.call(comp, nodeElement$1, state, options$1);
			state.initialised = true;
		};
		var digest = debounce_default(function() {
			if (!state.initialised) return;
			updateFn.call(comp, state, changedProps);
			changedProps = {};
		}, 1);
		props.forEach(function(prop) {
			comp[prop.name] = getSetProp(prop);
			function getSetProp(_ref3) {
				var prop$1 = _ref3.name, _ref3$triggerUpdate = _ref3.triggerUpdate, redigest = _ref3$triggerUpdate === void 0 ? false : _ref3$triggerUpdate, _ref3$onChange = _ref3.onChange, onChange = _ref3$onChange === void 0 ? function(newVal, state$1) {} : _ref3$onChange, _ref3$defaultVal = _ref3.defaultVal, defaultVal = _ref3$defaultVal === void 0 ? null : _ref3$defaultVal;
				return function(_$1) {
					var curVal = state[prop$1];
					if (!arguments.length) return curVal;
					var val = _$1 === void 0 ? defaultVal : _$1;
					state[prop$1] = val;
					onChange.call(comp, val, state, curVal);
					!changedProps.hasOwnProperty(prop$1) && (changedProps[prop$1] = curVal);
					if (redigest) digest();
					return comp;
				};
			}
		});
		Object.keys(methods).forEach(function(methodName) {
			comp[methodName] = function() {
				var _methods$methodName;
				for (var _len2 = arguments.length, args$1 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args$1[_key2] = arguments[_key2];
				return (_methods$methodName = methods[methodName]).call.apply(_methods$methodName, [comp, state].concat(args$1));
			};
		});
		Object.entries(aliases).forEach(function(_ref4) {
			var _ref5 = _slicedToArray$1(_ref4, 2), alias = _ref5[0];
			return comp[alias] = comp[_ref5[1]];
		});
		comp.resetProps = function() {
			props.forEach(function(prop) {
				comp[prop.name](prop.defaultVal);
			});
			return comp;
		};
		comp.resetProps();
		state._rerender = digest;
		classMode && nodeElement && comp(nodeElement);
		return comp;
	};
}
var index$3 = (function(p$1) {
	return typeof p$1 === "function" ? p$1 : typeof p$1 === "string" ? function(obj) {
		return obj[p$1];
	} : function(obj) {
		return p$1;
	};
});
function _typeof$1(obj) {
	"@babel/helpers - typeof";
	return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj$1) {
		return typeof obj$1;
	} : function(obj$1) {
		return obj$1 && "function" == typeof Symbol && obj$1.constructor === Symbol && obj$1 !== Symbol.prototype ? "symbol" : typeof obj$1;
	}, _typeof$1(obj);
}
var trimLeft = /^\s+/;
var trimRight = /\s+$/;
function tinycolor(color, opts) {
	color = color ? color : "";
	opts = opts || {};
	if (color instanceof tinycolor) return color;
	if (!(this instanceof tinycolor)) return new tinycolor(color, opts);
	var rgb = inputToRGB(color);
	this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = Math.round(100 * this._a) / 100, this._format = opts.format || rgb.format;
	this._gradientType = opts.gradientType;
	if (this._r < 1) this._r = Math.round(this._r);
	if (this._g < 1) this._g = Math.round(this._g);
	if (this._b < 1) this._b = Math.round(this._b);
	this._ok = rgb.ok;
}
tinycolor.prototype = {
	isDark: function isDark() {
		return this.getBrightness() < 128;
	},
	isLight: function isLight() {
		return !this.isDark();
	},
	isValid: function isValid() {
		return this._ok;
	},
	getOriginalInput: function getOriginalInput() {
		return this._originalInput;
	},
	getFormat: function getFormat() {
		return this._format;
	},
	getAlpha: function getAlpha() {
		return this._a;
	},
	getBrightness: function getBrightness() {
		var rgb = this.toRgb();
		return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
	},
	getLuminance: function getLuminance() {
		var rgb = this.toRgb();
		var RsRGB = rgb.r / 255, GsRGB = rgb.g / 255, BsRGB = rgb.b / 255, R$1, G$1, B$1;
		if (RsRGB <= .03928) R$1 = RsRGB / 12.92;
		else R$1 = Math.pow((RsRGB + .055) / 1.055, 2.4);
		if (GsRGB <= .03928) G$1 = GsRGB / 12.92;
		else G$1 = Math.pow((GsRGB + .055) / 1.055, 2.4);
		if (BsRGB <= .03928) B$1 = BsRGB / 12.92;
		else B$1 = Math.pow((BsRGB + .055) / 1.055, 2.4);
		return .2126 * R$1 + .7152 * G$1 + .0722 * B$1;
	},
	setAlpha: function setAlpha(value) {
		this._a = boundAlpha(value);
		this._roundA = Math.round(100 * this._a) / 100;
		return this;
	},
	toHsv: function toHsv() {
		var hsv = rgbToHsv(this._r, this._g, this._b);
		return {
			h: hsv.h * 360,
			s: hsv.s,
			v: hsv.v,
			a: this._a
		};
	},
	toHsvString: function toHsvString() {
		var hsv = rgbToHsv(this._r, this._g, this._b);
		var h$1 = Math.round(hsv.h * 360), s$1 = Math.round(hsv.s * 100), v$1 = Math.round(hsv.v * 100);
		return this._a == 1 ? "hsv(" + h$1 + ", " + s$1 + "%, " + v$1 + "%)" : "hsva(" + h$1 + ", " + s$1 + "%, " + v$1 + "%, " + this._roundA + ")";
	},
	toHsl: function toHsl() {
		var hsl = rgbToHsl(this._r, this._g, this._b);
		return {
			h: hsl.h * 360,
			s: hsl.s,
			l: hsl.l,
			a: this._a
		};
	},
	toHslString: function toHslString() {
		var hsl = rgbToHsl(this._r, this._g, this._b);
		var h$1 = Math.round(hsl.h * 360), s$1 = Math.round(hsl.s * 100), l$1 = Math.round(hsl.l * 100);
		return this._a == 1 ? "hsl(" + h$1 + ", " + s$1 + "%, " + l$1 + "%)" : "hsla(" + h$1 + ", " + s$1 + "%, " + l$1 + "%, " + this._roundA + ")";
	},
	toHex: function toHex(allow3Char) {
		return rgbToHex(this._r, this._g, this._b, allow3Char);
	},
	toHexString: function toHexString(allow3Char) {
		return "#" + this.toHex(allow3Char);
	},
	toHex8: function toHex8(allow4Char) {
		return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
	},
	toHex8String: function toHex8String(allow4Char) {
		return "#" + this.toHex8(allow4Char);
	},
	toRgb: function toRgb() {
		return {
			r: Math.round(this._r),
			g: Math.round(this._g),
			b: Math.round(this._b),
			a: this._a
		};
	},
	toRgbString: function toRgbString() {
		return this._a == 1 ? "rgb(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ")" : "rgba(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ", " + this._roundA + ")";
	},
	toPercentageRgb: function toPercentageRgb() {
		return {
			r: Math.round(bound01(this._r, 255) * 100) + "%",
			g: Math.round(bound01(this._g, 255) * 100) + "%",
			b: Math.round(bound01(this._b, 255) * 100) + "%",
			a: this._a
		};
	},
	toPercentageRgbString: function toPercentageRgbString() {
		return this._a == 1 ? "rgb(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%)" : "rgba(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
	},
	toName: function toName() {
		if (this._a === 0) return "transparent";
		if (this._a < 1) return false;
		return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
	},
	toFilter: function toFilter(secondColor) {
		var hex8String = "#" + rgbaToArgbHex(this._r, this._g, this._b, this._a);
		var secondHex8String = hex8String;
		var gradientType = this._gradientType ? "GradientType = 1, " : "";
		if (secondColor) {
			var s$1 = tinycolor(secondColor);
			secondHex8String = "#" + rgbaToArgbHex(s$1._r, s$1._g, s$1._b, s$1._a);
		}
		return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
	},
	toString: function toString(format) {
		var formatSet = !!format;
		format = format || this._format;
		var formattedString = false;
		var hasAlpha = this._a < 1 && this._a >= 0;
		if (!formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name")) {
			if (format === "name" && this._a === 0) return this.toName();
			return this.toRgbString();
		}
		if (format === "rgb") formattedString = this.toRgbString();
		if (format === "prgb") formattedString = this.toPercentageRgbString();
		if (format === "hex" || format === "hex6") formattedString = this.toHexString();
		if (format === "hex3") formattedString = this.toHexString(true);
		if (format === "hex4") formattedString = this.toHex8String(true);
		if (format === "hex8") formattedString = this.toHex8String();
		if (format === "name") formattedString = this.toName();
		if (format === "hsl") formattedString = this.toHslString();
		if (format === "hsv") formattedString = this.toHsvString();
		return formattedString || this.toHexString();
	},
	clone: function clone() {
		return tinycolor(this.toString());
	},
	_applyModification: function _applyModification(fn, args) {
		var color = fn.apply(null, [this].concat([].slice.call(args)));
		this._r = color._r;
		this._g = color._g;
		this._b = color._b;
		this.setAlpha(color._a);
		return this;
	},
	lighten: function lighten() {
		return this._applyModification(_lighten, arguments);
	},
	brighten: function brighten() {
		return this._applyModification(_brighten, arguments);
	},
	darken: function darken() {
		return this._applyModification(_darken, arguments);
	},
	desaturate: function desaturate() {
		return this._applyModification(_desaturate, arguments);
	},
	saturate: function saturate() {
		return this._applyModification(_saturate, arguments);
	},
	greyscale: function greyscale() {
		return this._applyModification(_greyscale, arguments);
	},
	spin: function spin() {
		return this._applyModification(_spin, arguments);
	},
	_applyCombination: function _applyCombination(fn, args) {
		return fn.apply(null, [this].concat([].slice.call(args)));
	},
	analogous: function analogous() {
		return this._applyCombination(_analogous, arguments);
	},
	complement: function complement() {
		return this._applyCombination(_complement, arguments);
	},
	monochromatic: function monochromatic() {
		return this._applyCombination(_monochromatic, arguments);
	},
	splitcomplement: function splitcomplement() {
		return this._applyCombination(_splitcomplement, arguments);
	},
	triad: function triad() {
		return this._applyCombination(polyad, [3]);
	},
	tetrad: function tetrad() {
		return this._applyCombination(polyad, [4]);
	}
};
tinycolor.fromRatio = function(color, opts) {
	if (_typeof$1(color) == "object") {
		var newColor = {};
		for (var i$1 in color) if (color.hasOwnProperty(i$1)) if (i$1 === "a") newColor[i$1] = color[i$1];
		else newColor[i$1] = convertToPercentage(color[i$1]);
		color = newColor;
	}
	return tinycolor(color, opts);
};
function inputToRGB(color) {
	var rgb = {
		r: 0,
		g: 0,
		b: 0
	};
	var a$2 = 1;
	var s$1 = null;
	var v$1 = null;
	var l$1 = null;
	var ok = false;
	var format = false;
	if (typeof color == "string") color = stringInputToObject(color);
	if (_typeof$1(color) == "object") {
		if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
			rgb = rgbToRgb(color.r, color.g, color.b);
			ok = true;
			format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
		} else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
			s$1 = convertToPercentage(color.s);
			v$1 = convertToPercentage(color.v);
			rgb = hsvToRgb(color.h, s$1, v$1);
			ok = true;
			format = "hsv";
		} else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
			s$1 = convertToPercentage(color.s);
			l$1 = convertToPercentage(color.l);
			rgb = hslToRgb(color.h, s$1, l$1);
			ok = true;
			format = "hsl";
		}
		if (color.hasOwnProperty("a")) a$2 = color.a;
	}
	a$2 = boundAlpha(a$2);
	return {
		ok,
		format: color.format || format,
		r: Math.min(255, Math.max(rgb.r, 0)),
		g: Math.min(255, Math.max(rgb.g, 0)),
		b: Math.min(255, Math.max(rgb.b, 0)),
		a: a$2
	};
}
function rgbToRgb(r$1, g$1, b$1) {
	return {
		r: bound01(r$1, 255) * 255,
		g: bound01(g$1, 255) * 255,
		b: bound01(b$1, 255) * 255
	};
}
function rgbToHsl(r$1, g$1, b$1) {
	r$1 = bound01(r$1, 255);
	g$1 = bound01(g$1, 255);
	b$1 = bound01(b$1, 255);
	var max = Math.max(r$1, g$1, b$1), min = Math.min(r$1, g$1, b$1);
	var h$1, s$1, l$1 = (max + min) / 2;
	if (max == min) h$1 = s$1 = 0;
	else {
		var d$1 = max - min;
		s$1 = l$1 > .5 ? d$1 / (2 - max - min) : d$1 / (max + min);
		switch (max) {
			case r$1:
				h$1 = (g$1 - b$1) / d$1 + (g$1 < b$1 ? 6 : 0);
				break;
			case g$1:
				h$1 = (b$1 - r$1) / d$1 + 2;
				break;
			case b$1:
				h$1 = (r$1 - g$1) / d$1 + 4;
				break;
		}
		h$1 /= 6;
	}
	return {
		h: h$1,
		s: s$1,
		l: l$1
	};
}
function hslToRgb(h$1, s$1, l$1) {
	var r$1, g$1, b$1;
	h$1 = bound01(h$1, 360);
	s$1 = bound01(s$1, 100);
	l$1 = bound01(l$1, 100);
	function hue2rgb(p$2, q$2, t$1) {
		if (t$1 < 0) t$1 += 1;
		if (t$1 > 1) t$1 -= 1;
		if (t$1 < 1 / 6) return p$2 + (q$2 - p$2) * 6 * t$1;
		if (t$1 < 1 / 2) return q$2;
		if (t$1 < 2 / 3) return p$2 + (q$2 - p$2) * (2 / 3 - t$1) * 6;
		return p$2;
	}
	if (s$1 === 0) r$1 = g$1 = b$1 = l$1;
	else {
		var q$1 = l$1 < .5 ? l$1 * (1 + s$1) : l$1 + s$1 - l$1 * s$1;
		var p$1 = 2 * l$1 - q$1;
		r$1 = hue2rgb(p$1, q$1, h$1 + 1 / 3);
		g$1 = hue2rgb(p$1, q$1, h$1);
		b$1 = hue2rgb(p$1, q$1, h$1 - 1 / 3);
	}
	return {
		r: r$1 * 255,
		g: g$1 * 255,
		b: b$1 * 255
	};
}
function rgbToHsv(r$1, g$1, b$1) {
	r$1 = bound01(r$1, 255);
	g$1 = bound01(g$1, 255);
	b$1 = bound01(b$1, 255);
	var max = Math.max(r$1, g$1, b$1), min = Math.min(r$1, g$1, b$1);
	var h$1, s$1, v$1 = max;
	var d$1 = max - min;
	s$1 = max === 0 ? 0 : d$1 / max;
	if (max == min) h$1 = 0;
	else {
		switch (max) {
			case r$1:
				h$1 = (g$1 - b$1) / d$1 + (g$1 < b$1 ? 6 : 0);
				break;
			case g$1:
				h$1 = (b$1 - r$1) / d$1 + 2;
				break;
			case b$1:
				h$1 = (r$1 - g$1) / d$1 + 4;
				break;
		}
		h$1 /= 6;
	}
	return {
		h: h$1,
		s: s$1,
		v: v$1
	};
}
function hsvToRgb(h$1, s$1, v$1) {
	h$1 = bound01(h$1, 360) * 6;
	s$1 = bound01(s$1, 100);
	v$1 = bound01(v$1, 100);
	var i$1 = Math.floor(h$1), f$1 = h$1 - i$1, p$1 = v$1 * (1 - s$1), q$1 = v$1 * (1 - f$1 * s$1), t$1 = v$1 * (1 - (1 - f$1) * s$1), mod = i$1 % 6, r$1 = [
		v$1,
		q$1,
		p$1,
		p$1,
		t$1,
		v$1
	][mod], g$1 = [
		t$1,
		v$1,
		v$1,
		q$1,
		p$1,
		p$1
	][mod], b$1 = [
		p$1,
		p$1,
		t$1,
		v$1,
		v$1,
		q$1
	][mod];
	return {
		r: r$1 * 255,
		g: g$1 * 255,
		b: b$1 * 255
	};
}
function rgbToHex(r$1, g$1, b$1, allow3Char) {
	var hex = [
		pad2(Math.round(r$1).toString(16)),
		pad2(Math.round(g$1).toString(16)),
		pad2(Math.round(b$1).toString(16))
	];
	if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
	return hex.join("");
}
function rgbaToHex(r$1, g$1, b$1, a$2, allow4Char) {
	var hex = [
		pad2(Math.round(r$1).toString(16)),
		pad2(Math.round(g$1).toString(16)),
		pad2(Math.round(b$1).toString(16)),
		pad2(convertDecimalToHex(a$2))
	];
	if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
	return hex.join("");
}
function rgbaToArgbHex(r$1, g$1, b$1, a$2) {
	return [
		pad2(convertDecimalToHex(a$2)),
		pad2(Math.round(r$1).toString(16)),
		pad2(Math.round(g$1).toString(16)),
		pad2(Math.round(b$1).toString(16))
	].join("");
}
tinycolor.equals = function(color1, color2) {
	if (!color1 || !color2) return false;
	return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};
tinycolor.random = function() {
	return tinycolor.fromRatio({
		r: Math.random(),
		g: Math.random(),
		b: Math.random()
	});
};
function _desaturate(color, amount) {
	amount = amount === 0 ? 0 : amount || 10;
	var hsl = tinycolor(color).toHsl();
	hsl.s -= amount / 100;
	hsl.s = clamp01(hsl.s);
	return tinycolor(hsl);
}
function _saturate(color, amount) {
	amount = amount === 0 ? 0 : amount || 10;
	var hsl = tinycolor(color).toHsl();
	hsl.s += amount / 100;
	hsl.s = clamp01(hsl.s);
	return tinycolor(hsl);
}
function _greyscale(color) {
	return tinycolor(color).desaturate(100);
}
function _lighten(color, amount) {
	amount = amount === 0 ? 0 : amount || 10;
	var hsl = tinycolor(color).toHsl();
	hsl.l += amount / 100;
	hsl.l = clamp01(hsl.l);
	return tinycolor(hsl);
}
function _brighten(color, amount) {
	amount = amount === 0 ? 0 : amount || 10;
	var rgb = tinycolor(color).toRgb();
	rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
	rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
	rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
	return tinycolor(rgb);
}
function _darken(color, amount) {
	amount = amount === 0 ? 0 : amount || 10;
	var hsl = tinycolor(color).toHsl();
	hsl.l -= amount / 100;
	hsl.l = clamp01(hsl.l);
	return tinycolor(hsl);
}
function _spin(color, amount) {
	var hsl = tinycolor(color).toHsl();
	var hue = (hsl.h + amount) % 360;
	hsl.h = hue < 0 ? 360 + hue : hue;
	return tinycolor(hsl);
}
function _complement(color) {
	var hsl = tinycolor(color).toHsl();
	hsl.h = (hsl.h + 180) % 360;
	return tinycolor(hsl);
}
function polyad(color, number) {
	if (isNaN(number) || number <= 0) throw new Error("Argument to polyad must be a positive number");
	var hsl = tinycolor(color).toHsl();
	var result = [tinycolor(color)];
	var step = 360 / number;
	for (var i$1 = 1; i$1 < number; i$1++) result.push(tinycolor({
		h: (hsl.h + i$1 * step) % 360,
		s: hsl.s,
		l: hsl.l
	}));
	return result;
}
function _splitcomplement(color) {
	var hsl = tinycolor(color).toHsl();
	var h$1 = hsl.h;
	return [
		tinycolor(color),
		tinycolor({
			h: (h$1 + 72) % 360,
			s: hsl.s,
			l: hsl.l
		}),
		tinycolor({
			h: (h$1 + 216) % 360,
			s: hsl.s,
			l: hsl.l
		})
	];
}
function _analogous(color, results, slices) {
	results = results || 6;
	slices = slices || 30;
	var hsl = tinycolor(color).toHsl();
	var part = 360 / slices;
	var ret = [tinycolor(color)];
	for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
		hsl.h = (hsl.h + part) % 360;
		ret.push(tinycolor(hsl));
	}
	return ret;
}
function _monochromatic(color, results) {
	results = results || 6;
	var hsv = tinycolor(color).toHsv();
	var h$1 = hsv.h, s$1 = hsv.s, v$1 = hsv.v;
	var ret = [];
	var modification = 1 / results;
	while (results--) {
		ret.push(tinycolor({
			h: h$1,
			s: s$1,
			v: v$1
		}));
		v$1 = (v$1 + modification) % 1;
	}
	return ret;
}
tinycolor.mix = function(color1, color2, amount) {
	amount = amount === 0 ? 0 : amount || 50;
	var rgb1 = tinycolor(color1).toRgb();
	var rgb2 = tinycolor(color2).toRgb();
	var p$1 = amount / 100;
	return tinycolor({
		r: (rgb2.r - rgb1.r) * p$1 + rgb1.r,
		g: (rgb2.g - rgb1.g) * p$1 + rgb1.g,
		b: (rgb2.b - rgb1.b) * p$1 + rgb1.b,
		a: (rgb2.a - rgb1.a) * p$1 + rgb1.a
	});
};
tinycolor.readability = function(color1, color2) {
	var c1 = tinycolor(color1);
	var c2 = tinycolor(color2);
	return (Math.max(c1.getLuminance(), c2.getLuminance()) + .05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + .05);
};
tinycolor.isReadable = function(color1, color2, wcag2) {
	var readability = tinycolor.readability(color1, color2);
	var wcag2Parms, out = false;
	wcag2Parms = validateWCAG2Parms(wcag2);
	switch (wcag2Parms.level + wcag2Parms.size) {
		case "AAsmall":
		case "AAAlarge":
			out = readability >= 4.5;
			break;
		case "AAlarge":
			out = readability >= 3;
			break;
		case "AAAsmall":
			out = readability >= 7;
			break;
	}
	return out;
};
tinycolor.mostReadable = function(baseColor, colorList, args) {
	var bestColor = null;
	var bestScore = 0;
	var readability;
	var includeFallbackColors, level, size;
	args = args || {};
	includeFallbackColors = args.includeFallbackColors;
	level = args.level;
	size = args.size;
	for (var i$1 = 0; i$1 < colorList.length; i$1++) {
		readability = tinycolor.readability(baseColor, colorList[i$1]);
		if (readability > bestScore) {
			bestScore = readability;
			bestColor = tinycolor(colorList[i$1]);
		}
	}
	if (tinycolor.isReadable(baseColor, bestColor, {
		level,
		size
	}) || !includeFallbackColors) return bestColor;
	else {
		args.includeFallbackColors = false;
		return tinycolor.mostReadable(baseColor, ["#fff", "#000"], args);
	}
};
var names = tinycolor.names = {
	aliceblue: "f0f8ff",
	antiquewhite: "faebd7",
	aqua: "0ff",
	aquamarine: "7fffd4",
	azure: "f0ffff",
	beige: "f5f5dc",
	bisque: "ffe4c4",
	black: "000",
	blanchedalmond: "ffebcd",
	blue: "00f",
	blueviolet: "8a2be2",
	brown: "a52a2a",
	burlywood: "deb887",
	burntsienna: "ea7e5d",
	cadetblue: "5f9ea0",
	chartreuse: "7fff00",
	chocolate: "d2691e",
	coral: "ff7f50",
	cornflowerblue: "6495ed",
	cornsilk: "fff8dc",
	crimson: "dc143c",
	cyan: "0ff",
	darkblue: "00008b",
	darkcyan: "008b8b",
	darkgoldenrod: "b8860b",
	darkgray: "a9a9a9",
	darkgreen: "006400",
	darkgrey: "a9a9a9",
	darkkhaki: "bdb76b",
	darkmagenta: "8b008b",
	darkolivegreen: "556b2f",
	darkorange: "ff8c00",
	darkorchid: "9932cc",
	darkred: "8b0000",
	darksalmon: "e9967a",
	darkseagreen: "8fbc8f",
	darkslateblue: "483d8b",
	darkslategray: "2f4f4f",
	darkslategrey: "2f4f4f",
	darkturquoise: "00ced1",
	darkviolet: "9400d3",
	deeppink: "ff1493",
	deepskyblue: "00bfff",
	dimgray: "696969",
	dimgrey: "696969",
	dodgerblue: "1e90ff",
	firebrick: "b22222",
	floralwhite: "fffaf0",
	forestgreen: "228b22",
	fuchsia: "f0f",
	gainsboro: "dcdcdc",
	ghostwhite: "f8f8ff",
	gold: "ffd700",
	goldenrod: "daa520",
	gray: "808080",
	green: "008000",
	greenyellow: "adff2f",
	grey: "808080",
	honeydew: "f0fff0",
	hotpink: "ff69b4",
	indianred: "cd5c5c",
	indigo: "4b0082",
	ivory: "fffff0",
	khaki: "f0e68c",
	lavender: "e6e6fa",
	lavenderblush: "fff0f5",
	lawngreen: "7cfc00",
	lemonchiffon: "fffacd",
	lightblue: "add8e6",
	lightcoral: "f08080",
	lightcyan: "e0ffff",
	lightgoldenrodyellow: "fafad2",
	lightgray: "d3d3d3",
	lightgreen: "90ee90",
	lightgrey: "d3d3d3",
	lightpink: "ffb6c1",
	lightsalmon: "ffa07a",
	lightseagreen: "20b2aa",
	lightskyblue: "87cefa",
	lightslategray: "789",
	lightslategrey: "789",
	lightsteelblue: "b0c4de",
	lightyellow: "ffffe0",
	lime: "0f0",
	limegreen: "32cd32",
	linen: "faf0e6",
	magenta: "f0f",
	maroon: "800000",
	mediumaquamarine: "66cdaa",
	mediumblue: "0000cd",
	mediumorchid: "ba55d3",
	mediumpurple: "9370db",
	mediumseagreen: "3cb371",
	mediumslateblue: "7b68ee",
	mediumspringgreen: "00fa9a",
	mediumturquoise: "48d1cc",
	mediumvioletred: "c71585",
	midnightblue: "191970",
	mintcream: "f5fffa",
	mistyrose: "ffe4e1",
	moccasin: "ffe4b5",
	navajowhite: "ffdead",
	navy: "000080",
	oldlace: "fdf5e6",
	olive: "808000",
	olivedrab: "6b8e23",
	orange: "ffa500",
	orangered: "ff4500",
	orchid: "da70d6",
	palegoldenrod: "eee8aa",
	palegreen: "98fb98",
	paleturquoise: "afeeee",
	palevioletred: "db7093",
	papayawhip: "ffefd5",
	peachpuff: "ffdab9",
	peru: "cd853f",
	pink: "ffc0cb",
	plum: "dda0dd",
	powderblue: "b0e0e6",
	purple: "800080",
	rebeccapurple: "663399",
	red: "f00",
	rosybrown: "bc8f8f",
	royalblue: "4169e1",
	saddlebrown: "8b4513",
	salmon: "fa8072",
	sandybrown: "f4a460",
	seagreen: "2e8b57",
	seashell: "fff5ee",
	sienna: "a0522d",
	silver: "c0c0c0",
	skyblue: "87ceeb",
	slateblue: "6a5acd",
	slategray: "708090",
	slategrey: "708090",
	snow: "fffafa",
	springgreen: "00ff7f",
	steelblue: "4682b4",
	tan: "d2b48c",
	teal: "008080",
	thistle: "d8bfd8",
	tomato: "ff6347",
	turquoise: "40e0d0",
	violet: "ee82ee",
	wheat: "f5deb3",
	white: "fff",
	whitesmoke: "f5f5f5",
	yellow: "ff0",
	yellowgreen: "9acd32"
};
var hexNames = tinycolor.hexNames = flip(names);
function flip(o$1) {
	var flipped = {};
	for (var i$1 in o$1) if (o$1.hasOwnProperty(i$1)) flipped[o$1[i$1]] = i$1;
	return flipped;
}
function boundAlpha(a$2) {
	a$2 = parseFloat(a$2);
	if (isNaN(a$2) || a$2 < 0 || a$2 > 1) a$2 = 1;
	return a$2;
}
function bound01(n$1, max) {
	if (isOnePointZero(n$1)) n$1 = "100%";
	var processPercent = isPercentage(n$1);
	n$1 = Math.min(max, Math.max(0, parseFloat(n$1)));
	if (processPercent) n$1 = parseInt(n$1 * max, 10) / 100;
	if (Math.abs(n$1 - max) < 1e-6) return 1;
	return n$1 % max / parseFloat(max);
}
function clamp01(val) {
	return Math.min(1, Math.max(0, val));
}
function parseIntFromHex(val) {
	return parseInt(val, 16);
}
function isOnePointZero(n$1) {
	return typeof n$1 == "string" && n$1.indexOf(".") != -1 && parseFloat(n$1) === 1;
}
function isPercentage(n$1) {
	return typeof n$1 === "string" && n$1.indexOf("%") != -1;
}
function pad2(c$2) {
	return c$2.length == 1 ? "0" + c$2 : "" + c$2;
}
function convertToPercentage(n$1) {
	if (n$1 <= 1) n$1 = n$1 * 100 + "%";
	return n$1;
}
function convertDecimalToHex(d$1) {
	return Math.round(parseFloat(d$1) * 255).toString(16);
}
function convertHexToDecimal(h$1) {
	return parseIntFromHex(h$1) / 255;
}
var matchers = function() {
	var CSS_UNIT = "(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)";
	var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
	var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
	return {
		CSS_UNIT: new RegExp(CSS_UNIT),
		rgb: /* @__PURE__ */ new RegExp("rgb" + PERMISSIVE_MATCH3),
		rgba: /* @__PURE__ */ new RegExp("rgba" + PERMISSIVE_MATCH4),
		hsl: /* @__PURE__ */ new RegExp("hsl" + PERMISSIVE_MATCH3),
		hsla: /* @__PURE__ */ new RegExp("hsla" + PERMISSIVE_MATCH4),
		hsv: /* @__PURE__ */ new RegExp("hsv" + PERMISSIVE_MATCH3),
		hsva: /* @__PURE__ */ new RegExp("hsva" + PERMISSIVE_MATCH4),
		hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
		hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
		hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
		hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
	};
}();
function isValidCSSUnit(color) {
	return !!matchers.CSS_UNIT.exec(color);
}
function stringInputToObject(color) {
	color = color.replace(trimLeft, "").replace(trimRight, "").toLowerCase();
	var named = false;
	if (names[color]) {
		color = names[color];
		named = true;
	} else if (color == "transparent") return {
		r: 0,
		g: 0,
		b: 0,
		a: 0,
		format: "name"
	};
	var match;
	if (match = matchers.rgb.exec(color)) return {
		r: match[1],
		g: match[2],
		b: match[3]
	};
	if (match = matchers.rgba.exec(color)) return {
		r: match[1],
		g: match[2],
		b: match[3],
		a: match[4]
	};
	if (match = matchers.hsl.exec(color)) return {
		h: match[1],
		s: match[2],
		l: match[3]
	};
	if (match = matchers.hsla.exec(color)) return {
		h: match[1],
		s: match[2],
		l: match[3],
		a: match[4]
	};
	if (match = matchers.hsv.exec(color)) return {
		h: match[1],
		s: match[2],
		v: match[3]
	};
	if (match = matchers.hsva.exec(color)) return {
		h: match[1],
		s: match[2],
		v: match[3],
		a: match[4]
	};
	if (match = matchers.hex8.exec(color)) return {
		r: parseIntFromHex(match[1]),
		g: parseIntFromHex(match[2]),
		b: parseIntFromHex(match[3]),
		a: convertHexToDecimal(match[4]),
		format: named ? "name" : "hex8"
	};
	if (match = matchers.hex6.exec(color)) return {
		r: parseIntFromHex(match[1]),
		g: parseIntFromHex(match[2]),
		b: parseIntFromHex(match[3]),
		format: named ? "name" : "hex"
	};
	if (match = matchers.hex4.exec(color)) return {
		r: parseIntFromHex(match[1] + "" + match[1]),
		g: parseIntFromHex(match[2] + "" + match[2]),
		b: parseIntFromHex(match[3] + "" + match[3]),
		a: convertHexToDecimal(match[4] + "" + match[4]),
		format: named ? "name" : "hex8"
	};
	if (match = matchers.hex3.exec(color)) return {
		r: parseIntFromHex(match[1] + "" + match[1]),
		g: parseIntFromHex(match[2] + "" + match[2]),
		b: parseIntFromHex(match[3] + "" + match[3]),
		format: named ? "name" : "hex"
	};
	return false;
}
function validateWCAG2Parms(parms) {
	var level, size;
	parms = parms || {
		level: "AA",
		size: "small"
	};
	level = (parms.level || "AA").toUpperCase();
	size = (parms.size || "small").toLowerCase();
	if (level !== "AA" && level !== "AAA") level = "AA";
	if (size !== "small" && size !== "large") size = "small";
	return {
		level,
		size
	};
}
var n, l, u, t, i, r, o, e, f, c$1, s, a$1, h, p, v, d = {}, w = [], _ = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, g = Array.isArray;
function m$1(n$1, l$1) {
	for (var u$1 in l$1) n$1[u$1] = l$1[u$1];
	return n$1;
}
function b(n$1) {
	n$1 && n$1.parentNode && n$1.parentNode.removeChild(n$1);
}
function k(l$1, u$1, t$1) {
	var i$1, r$1, o$1, e$1 = {};
	for (o$1 in u$1) "key" == o$1 ? i$1 = u$1[o$1] : "ref" == o$1 ? r$1 = u$1[o$1] : e$1[o$1] = u$1[o$1];
	if (arguments.length > 2 && (e$1.children = arguments.length > 3 ? n.call(arguments, 2) : t$1), "function" == typeof l$1 && null != l$1.defaultProps) for (o$1 in l$1.defaultProps) void 0 === e$1[o$1] && (e$1[o$1] = l$1.defaultProps[o$1]);
	return x$1(l$1, e$1, i$1, r$1, null);
}
function x$1(n$1, t$1, i$1, r$1, o$1) {
	var e$1 = {
		type: n$1,
		props: t$1,
		key: i$1,
		ref: r$1,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__c: null,
		constructor: void 0,
		__v: null == o$1 ? ++u : o$1,
		__i: -1,
		__u: 0
	};
	return null == o$1 && null != l.vnode && l.vnode(e$1), e$1;
}
function S(n$1) {
	return n$1.children;
}
function C(n$1, l$1) {
	this.props = n$1, this.context = l$1;
}
function $(n$1, l$1) {
	if (null == l$1) return n$1.__ ? $(n$1.__, n$1.__i + 1) : null;
	for (var u$1; l$1 < n$1.__k.length; l$1++) if (null != (u$1 = n$1.__k[l$1]) && null != u$1.__e) return u$1.__e;
	return "function" == typeof n$1.type ? $(n$1) : null;
}
function I(n$1) {
	if (n$1.__P && n$1.__d) {
		var u$1 = n$1.__v, t$1 = u$1.__e, i$1 = [], r$1 = [], o$1 = m$1({}, u$1);
		o$1.__v = u$1.__v + 1, l.vnode && l.vnode(o$1), q(n$1.__P, o$1, u$1, n$1.__n, n$1.__P.namespaceURI, 32 & u$1.__u ? [t$1] : null, i$1, null == t$1 ? $(u$1) : t$1, !!(32 & u$1.__u), r$1), o$1.__v = u$1.__v, o$1.__.__k[o$1.__i] = o$1, D(i$1, o$1, r$1), u$1.__e = u$1.__ = null, o$1.__e != t$1 && P(o$1);
	}
}
function P(n$1) {
	if (null != (n$1 = n$1.__) && null != n$1.__c) return n$1.__e = n$1.__c.base = null, n$1.__k.some(function(l$1) {
		if (null != l$1 && null != l$1.__e) return n$1.__e = n$1.__c.base = l$1.__e;
	}), P(n$1);
}
function A(n$1) {
	(!n$1.__d && (n$1.__d = !0) && i.push(n$1) && !H.__r++ || r != l.debounceRendering) && ((r = l.debounceRendering) || o)(H);
}
function H() {
	try {
		for (var n$1, l$1 = 1; i.length;) i.length > l$1 && i.sort(e), n$1 = i.shift(), l$1 = i.length, I(n$1);
	} finally {
		i.length = H.__r = 0;
	}
}
function L(n$1, l$1, u$1, t$1, i$1, r$1, o$1, e$1, f$1, c$2, s$1) {
	var a$2, h$1, p$1, v$1, y$2, _$1, g$1, m$2 = t$1 && t$1.__k || w, b$1 = l$1.length;
	for (f$1 = T(u$1, l$1, m$2, f$1, b$1), a$2 = 0; a$2 < b$1; a$2++) null != (p$1 = u$1.__k[a$2]) && (h$1 = -1 != p$1.__i && m$2[p$1.__i] || d, p$1.__i = a$2, _$1 = q(n$1, p$1, h$1, i$1, r$1, o$1, e$1, f$1, c$2, s$1), v$1 = p$1.__e, p$1.ref && h$1.ref != p$1.ref && (h$1.ref && J(h$1.ref, null, p$1), s$1.push(p$1.ref, p$1.__c || v$1, p$1)), null == y$2 && null != v$1 && (y$2 = v$1), (g$1 = !!(4 & p$1.__u)) || h$1.__k === p$1.__k ? (f$1 = j(p$1, f$1, n$1, g$1), g$1 && h$1.__e && (h$1.__e = null)) : "function" == typeof p$1.type && void 0 !== _$1 ? f$1 = _$1 : v$1 && (f$1 = v$1.nextSibling), p$1.__u &= -7);
	return u$1.__e = y$2, f$1;
}
function T(n$1, l$1, u$1, t$1, i$1) {
	var r$1, o$1, e$1, f$1, c$2, s$1 = u$1.length, a$2 = s$1, h$1 = 0;
	for (n$1.__k = new Array(i$1), r$1 = 0; r$1 < i$1; r$1++) null != (o$1 = l$1[r$1]) && "boolean" != typeof o$1 && "function" != typeof o$1 ? ("string" == typeof o$1 || "number" == typeof o$1 || "bigint" == typeof o$1 || o$1.constructor == String ? o$1 = n$1.__k[r$1] = x$1(null, o$1, null, null, null) : g(o$1) ? o$1 = n$1.__k[r$1] = x$1(S, { children: o$1 }, null, null, null) : void 0 === o$1.constructor && o$1.__b > 0 ? o$1 = n$1.__k[r$1] = x$1(o$1.type, o$1.props, o$1.key, o$1.ref ? o$1.ref : null, o$1.__v) : n$1.__k[r$1] = o$1, f$1 = r$1 + h$1, o$1.__ = n$1, o$1.__b = n$1.__b + 1, e$1 = null, -1 != (c$2 = o$1.__i = O(o$1, u$1, f$1, a$2)) && (a$2--, (e$1 = u$1[c$2]) && (e$1.__u |= 2)), null == e$1 || null == e$1.__v ? (-1 == c$2 && (i$1 > s$1 ? h$1-- : i$1 < s$1 && h$1++), "function" != typeof o$1.type && (o$1.__u |= 4)) : c$2 != f$1 && (c$2 == f$1 - 1 ? h$1-- : c$2 == f$1 + 1 ? h$1++ : (c$2 > f$1 ? h$1-- : h$1++, o$1.__u |= 4))) : n$1.__k[r$1] = null;
	if (a$2) for (r$1 = 0; r$1 < s$1; r$1++) null != (e$1 = u$1[r$1]) && 0 == (2 & e$1.__u) && (e$1.__e == t$1 && (t$1 = $(e$1)), K(e$1, e$1));
	return t$1;
}
function j(n$1, l$1, u$1, t$1) {
	var i$1, r$1;
	if ("function" == typeof n$1.type) {
		for (i$1 = n$1.__k, r$1 = 0; i$1 && r$1 < i$1.length; r$1++) i$1[r$1] && (i$1[r$1].__ = n$1, l$1 = j(i$1[r$1], l$1, u$1, t$1));
		return l$1;
	}
	n$1.__e != l$1 && (t$1 && (l$1 && n$1.type && !l$1.parentNode && (l$1 = $(n$1)), u$1.insertBefore(n$1.__e, l$1 || null)), l$1 = n$1.__e);
	do
		l$1 = l$1 && l$1.nextSibling;
	while (null != l$1 && 8 == l$1.nodeType);
	return l$1;
}
function O(n$1, l$1, u$1, t$1) {
	var i$1, r$1, o$1, e$1 = n$1.key, f$1 = n$1.type, c$2 = l$1[u$1], s$1 = null != c$2 && 0 == (2 & c$2.__u);
	if (null === c$2 && null == e$1 || s$1 && e$1 == c$2.key && f$1 == c$2.type) return u$1;
	if (t$1 > (s$1 ? 1 : 0)) {
		for (i$1 = u$1 - 1, r$1 = u$1 + 1; i$1 >= 0 || r$1 < l$1.length;) if (null != (c$2 = l$1[o$1 = i$1 >= 0 ? i$1-- : r$1++]) && 0 == (2 & c$2.__u) && e$1 == c$2.key && f$1 == c$2.type) return o$1;
	}
	return -1;
}
function z$1(n$1, l$1, u$1) {
	"-" == l$1[0] ? n$1.setProperty(l$1, null == u$1 ? "" : u$1) : n$1[l$1] = null == u$1 ? "" : "number" != typeof u$1 || _.test(l$1) ? u$1 : u$1 + "px";
}
function N(n$1, l$1, u$1, t$1, i$1) {
	var r$1, o$1;
	n: if ("style" == l$1) if ("string" == typeof u$1) n$1.style.cssText = u$1;
	else {
		if ("string" == typeof t$1 && (n$1.style.cssText = t$1 = ""), t$1) for (l$1 in t$1) u$1 && l$1 in u$1 || z$1(n$1.style, l$1, "");
		if (u$1) for (l$1 in u$1) t$1 && u$1[l$1] == t$1[l$1] || z$1(n$1.style, l$1, u$1[l$1]);
	}
	else if ("o" == l$1[0] && "n" == l$1[1]) r$1 = l$1 != (l$1 = l$1.replace(a$1, "$1")), o$1 = l$1.toLowerCase(), l$1 = o$1 in n$1 || "onFocusOut" == l$1 || "onFocusIn" == l$1 ? o$1.slice(2) : l$1.slice(2), n$1.l || (n$1.l = {}), n$1.l[l$1 + r$1] = u$1, u$1 ? t$1 ? u$1[s] = t$1[s] : (u$1[s] = h, n$1.addEventListener(l$1, r$1 ? v : p, r$1)) : n$1.removeEventListener(l$1, r$1 ? v : p, r$1);
	else {
		if ("http://www.w3.org/2000/svg" == i$1) l$1 = l$1.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
		else if ("width" != l$1 && "height" != l$1 && "href" != l$1 && "list" != l$1 && "form" != l$1 && "tabIndex" != l$1 && "download" != l$1 && "rowSpan" != l$1 && "colSpan" != l$1 && "role" != l$1 && "popover" != l$1 && l$1 in n$1) try {
			n$1[l$1] = null == u$1 ? "" : u$1;
			break n;
		} catch (n$2) {}
		"function" == typeof u$1 || (null == u$1 || !1 === u$1 && "-" != l$1[4] ? n$1.removeAttribute(l$1) : n$1.setAttribute(l$1, "popover" == l$1 && 1 == u$1 ? "" : u$1));
	}
}
function V(n$1) {
	return function(u$1) {
		if (this.l) {
			var t$1 = this.l[u$1.type + n$1];
			if (null == u$1[c$1]) u$1[c$1] = h++;
			else if (u$1[c$1] < t$1[s]) return;
			return t$1(l.event ? l.event(u$1) : u$1);
		}
	};
}
function q(n$1, u$1, t$1, i$1, r$1, o$1, e$1, f$1, c$2, s$1) {
	var a$2, h$1, p$1, v$1, y$2, d$1, _$1, k$1, x$2, M, $$1, I$1, P$1, A$1, H$1, T$1 = u$1.type;
	if (void 0 !== u$1.constructor) return null;
	128 & t$1.__u && (c$2 = !!(32 & t$1.__u), o$1 = [f$1 = u$1.__e = t$1.__e]), (a$2 = l.__b) && a$2(u$1);
	n: if ("function" == typeof T$1) try {
		if (k$1 = u$1.props, x$2 = T$1.prototype && T$1.prototype.render, M = (a$2 = T$1.contextType) && i$1[a$2.__c], $$1 = a$2 ? M ? M.props.value : a$2.__ : i$1, t$1.__c ? _$1 = (h$1 = u$1.__c = t$1.__c).__ = h$1.__E : (x$2 ? u$1.__c = h$1 = new T$1(k$1, $$1) : (u$1.__c = h$1 = new C(k$1, $$1), h$1.constructor = T$1, h$1.render = Q), M && M.sub(h$1), h$1.state || (h$1.state = {}), h$1.__n = i$1, p$1 = h$1.__d = !0, h$1.__h = [], h$1._sb = []), x$2 && null == h$1.__s && (h$1.__s = h$1.state), x$2 && null != T$1.getDerivedStateFromProps && (h$1.__s == h$1.state && (h$1.__s = m$1({}, h$1.__s)), m$1(h$1.__s, T$1.getDerivedStateFromProps(k$1, h$1.__s))), v$1 = h$1.props, y$2 = h$1.state, h$1.__v = u$1, p$1) x$2 && null == T$1.getDerivedStateFromProps && null != h$1.componentWillMount && h$1.componentWillMount(), x$2 && null != h$1.componentDidMount && h$1.__h.push(h$1.componentDidMount);
		else {
			if (x$2 && null == T$1.getDerivedStateFromProps && k$1 !== v$1 && null != h$1.componentWillReceiveProps && h$1.componentWillReceiveProps(k$1, $$1), u$1.__v == t$1.__v || !h$1.__e && null != h$1.shouldComponentUpdate && !1 === h$1.shouldComponentUpdate(k$1, h$1.__s, $$1)) {
				u$1.__v != t$1.__v && (h$1.props = k$1, h$1.state = h$1.__s, h$1.__d = !1), u$1.__e = t$1.__e, u$1.__k = t$1.__k, u$1.__k.some(function(n$2) {
					n$2 && (n$2.__ = u$1);
				}), w.push.apply(h$1.__h, h$1._sb), h$1._sb = [], h$1.__h.length && e$1.push(h$1);
				break n;
			}
			null != h$1.componentWillUpdate && h$1.componentWillUpdate(k$1, h$1.__s, $$1), x$2 && null != h$1.componentDidUpdate && h$1.__h.push(function() {
				h$1.componentDidUpdate(v$1, y$2, d$1);
			});
		}
		if (h$1.context = $$1, h$1.props = k$1, h$1.__P = n$1, h$1.__e = !1, I$1 = l.__r, P$1 = 0, x$2) h$1.state = h$1.__s, h$1.__d = !1, I$1 && I$1(u$1), a$2 = h$1.render(h$1.props, h$1.state, h$1.context), w.push.apply(h$1.__h, h$1._sb), h$1._sb = [];
		else do
			h$1.__d = !1, I$1 && I$1(u$1), a$2 = h$1.render(h$1.props, h$1.state, h$1.context), h$1.state = h$1.__s;
		while (h$1.__d && ++P$1 < 25);
		h$1.state = h$1.__s, null != h$1.getChildContext && (i$1 = m$1(m$1({}, i$1), h$1.getChildContext())), x$2 && !p$1 && null != h$1.getSnapshotBeforeUpdate && (d$1 = h$1.getSnapshotBeforeUpdate(v$1, y$2)), A$1 = null != a$2 && a$2.type === S && null == a$2.key ? E(a$2.props.children) : a$2, f$1 = L(n$1, g(A$1) ? A$1 : [A$1], u$1, t$1, i$1, r$1, o$1, e$1, f$1, c$2, s$1), h$1.base = u$1.__e, u$1.__u &= -161, h$1.__h.length && e$1.push(h$1), _$1 && (h$1.__E = h$1.__ = null);
	} catch (n$2) {
		if (u$1.__v = null, c$2 || null != o$1) if (n$2.then) {
			for (u$1.__u |= c$2 ? 160 : 128; f$1 && 8 == f$1.nodeType && f$1.nextSibling;) f$1 = f$1.nextSibling;
			o$1[o$1.indexOf(f$1)] = null, u$1.__e = f$1;
		} else {
			for (H$1 = o$1.length; H$1--;) b(o$1[H$1]);
			B(u$1);
		}
		else u$1.__e = t$1.__e, u$1.__k = t$1.__k, n$2.then || B(u$1);
		l.__e(n$2, u$1, t$1);
	}
	else null == o$1 && u$1.__v == t$1.__v ? (u$1.__k = t$1.__k, u$1.__e = t$1.__e) : f$1 = u$1.__e = G(t$1.__e, u$1, t$1, i$1, r$1, o$1, e$1, c$2, s$1);
	return (a$2 = l.diffed) && a$2(u$1), 128 & u$1.__u ? void 0 : f$1;
}
function B(n$1) {
	n$1 && (n$1.__c && (n$1.__c.__e = !0), n$1.__k && n$1.__k.some(B));
}
function D(n$1, u$1, t$1) {
	for (var i$1 = 0; i$1 < t$1.length; i$1++) J(t$1[i$1], t$1[++i$1], t$1[++i$1]);
	l.__c && l.__c(u$1, n$1), n$1.some(function(u$2) {
		try {
			n$1 = u$2.__h, u$2.__h = [], n$1.some(function(n$2) {
				n$2.call(u$2);
			});
		} catch (n$2) {
			l.__e(n$2, u$2.__v);
		}
	});
}
function E(n$1) {
	return "object" != typeof n$1 || null == n$1 || n$1.__b > 0 ? n$1 : g(n$1) ? n$1.map(E) : m$1({}, n$1);
}
function G(u$1, t$1, i$1, r$1, o$1, e$1, f$1, c$2, s$1) {
	var a$2, h$1, p$1, v$1, y$2, w$1, _$1, m$2 = i$1.props || d, k$1 = t$1.props, x$2 = t$1.type;
	if ("svg" == x$2 ? o$1 = "http://www.w3.org/2000/svg" : "math" == x$2 ? o$1 = "http://www.w3.org/1998/Math/MathML" : o$1 || (o$1 = "http://www.w3.org/1999/xhtml"), null != e$1) {
		for (a$2 = 0; a$2 < e$1.length; a$2++) if ((y$2 = e$1[a$2]) && "setAttribute" in y$2 == !!x$2 && (x$2 ? y$2.localName == x$2 : 3 == y$2.nodeType)) {
			u$1 = y$2, e$1[a$2] = null;
			break;
		}
	}
	if (null == u$1) {
		if (null == x$2) return document.createTextNode(k$1);
		u$1 = document.createElementNS(o$1, x$2, k$1.is && k$1), c$2 && (l.__m && l.__m(t$1, e$1), c$2 = !1), e$1 = null;
	}
	if (null == x$2) m$2 === k$1 || c$2 && u$1.data == k$1 || (u$1.data = k$1);
	else {
		if (e$1 = e$1 && n.call(u$1.childNodes), !c$2 && null != e$1) for (m$2 = {}, a$2 = 0; a$2 < u$1.attributes.length; a$2++) m$2[(y$2 = u$1.attributes[a$2]).name] = y$2.value;
		for (a$2 in m$2) y$2 = m$2[a$2], "dangerouslySetInnerHTML" == a$2 ? p$1 = y$2 : "children" == a$2 || a$2 in k$1 || "value" == a$2 && "defaultValue" in k$1 || "checked" == a$2 && "defaultChecked" in k$1 || N(u$1, a$2, null, y$2, o$1);
		for (a$2 in k$1) y$2 = k$1[a$2], "children" == a$2 ? v$1 = y$2 : "dangerouslySetInnerHTML" == a$2 ? h$1 = y$2 : "value" == a$2 ? w$1 = y$2 : "checked" == a$2 ? _$1 = y$2 : c$2 && "function" != typeof y$2 || m$2[a$2] === y$2 || N(u$1, a$2, y$2, m$2[a$2], o$1);
		if (h$1) c$2 || p$1 && (h$1.__html == p$1.__html || h$1.__html == u$1.innerHTML) || (u$1.innerHTML = h$1.__html), t$1.__k = [];
		else if (p$1 && (u$1.innerHTML = ""), L("template" == t$1.type ? u$1.content : u$1, g(v$1) ? v$1 : [v$1], t$1, i$1, r$1, "foreignObject" == x$2 ? "http://www.w3.org/1999/xhtml" : o$1, e$1, f$1, e$1 ? e$1[0] : i$1.__k && $(i$1, 0), c$2, s$1), null != e$1) for (a$2 = e$1.length; a$2--;) b(e$1[a$2]);
		c$2 || (a$2 = "value", "progress" == x$2 && null == w$1 ? u$1.removeAttribute("value") : null != w$1 && (w$1 !== u$1[a$2] || "progress" == x$2 && !w$1 || "option" == x$2 && w$1 != m$2[a$2]) && N(u$1, a$2, w$1, m$2[a$2], o$1), a$2 = "checked", null != _$1 && _$1 != u$1[a$2] && N(u$1, a$2, _$1, m$2[a$2], o$1));
	}
	return u$1;
}
function J(n$1, u$1, t$1) {
	try {
		if ("function" == typeof n$1) {
			var i$1 = "function" == typeof n$1.__u;
			i$1 && n$1.__u(), i$1 && null == u$1 || (n$1.__u = n$1(u$1));
		} else n$1.current = u$1;
	} catch (n$2) {
		l.__e(n$2, t$1);
	}
}
function K(n$1, u$1, t$1) {
	var i$1, r$1;
	if (l.unmount && l.unmount(n$1), (i$1 = n$1.ref) && (i$1.current && i$1.current != n$1.__e || J(i$1, null, u$1)), null != (i$1 = n$1.__c)) {
		if (i$1.componentWillUnmount) try {
			i$1.componentWillUnmount();
		} catch (n$2) {
			l.__e(n$2, u$1);
		}
		i$1.base = i$1.__P = null;
	}
	if (i$1 = n$1.__k) for (r$1 = 0; r$1 < i$1.length; r$1++) i$1[r$1] && K(i$1[r$1], u$1, t$1 || "function" != typeof n$1.type);
	t$1 || b(n$1.__e), n$1.__c = n$1.__ = n$1.__e = void 0;
}
function Q(n$1, l$1, u$1) {
	return this.constructor(n$1, u$1);
}
function R(u$1, t$1, i$1) {
	var r$1, o$1, e$1, f$1;
	t$1 == document && (t$1 = document.documentElement), l.__ && l.__(u$1, t$1), o$1 = (r$1 = "function" == typeof i$1) ? null : i$1 && i$1.__k || t$1.__k, e$1 = [], f$1 = [], q(t$1, u$1 = (!r$1 && i$1 || t$1).__k = k(S, null, [u$1]), o$1 || d, d, t$1.namespaceURI, !r$1 && i$1 ? [i$1] : o$1 ? null : t$1.firstChild ? n.call(t$1.childNodes) : null, e$1, !r$1 && i$1 ? i$1 : o$1 ? o$1.__e : t$1.firstChild, r$1, f$1), D(e$1, u$1, f$1);
}
function W(l$1, u$1, t$1) {
	var i$1, r$1, o$1, e$1, f$1 = m$1({}, l$1.props);
	for (o$1 in l$1.type && l$1.type.defaultProps && (e$1 = l$1.type.defaultProps), u$1) "key" == o$1 ? i$1 = u$1[o$1] : "ref" == o$1 ? r$1 = u$1[o$1] : f$1[o$1] = void 0 === u$1[o$1] && null != e$1 ? e$1[o$1] : u$1[o$1];
	return arguments.length > 2 && (f$1.children = arguments.length > 3 ? n.call(arguments, 2) : t$1), x$1(l$1.type, f$1, i$1 || l$1.key, r$1 || l$1.ref, null);
}
n = w.slice, l = { __e: function(n$1, l$1, u$1, t$1) {
	for (var i$1, r$1, o$1; l$1 = l$1.__;) if ((i$1 = l$1.__c) && !i$1.__) try {
		if ((r$1 = i$1.constructor) && null != r$1.getDerivedStateFromError && (i$1.setState(r$1.getDerivedStateFromError(n$1)), o$1 = i$1.__d), null != i$1.componentDidCatch && (i$1.componentDidCatch(n$1, t$1 || {}), o$1 = i$1.__d), o$1) return i$1.__E = i$1;
	} catch (l$2) {
		n$1 = l$2;
	}
	throw n$1;
} }, u = 0, t = function(n$1) {
	return null != n$1 && void 0 === n$1.constructor;
}, C.prototype.setState = function(n$1, l$1) {
	var u$1 = null != this.__s && this.__s != this.state ? this.__s : this.__s = m$1({}, this.state);
	"function" == typeof n$1 && (n$1 = n$1(m$1({}, u$1), this.props)), n$1 && m$1(u$1, n$1), null != n$1 && this.__v && (l$1 && this._sb.push(l$1), A(this));
}, C.prototype.forceUpdate = function(n$1) {
	this.__v && (this.__e = !0, n$1 && this.__h.push(n$1), A(this));
}, C.prototype.render = S, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n$1, l$1) {
	return n$1.__v.__b - l$1.__v.__b;
}, H.__r = 0, f = Math.random().toString(8), c$1 = "__d" + f, s = "__a" + f, a$1 = /(PointerCapture)$|Capture$/i, h = 0, p = V(!1), v = V(!0);
function _arrayLikeToArray(r$1, a$2) {
	(null == a$2 || a$2 > r$1.length) && (a$2 = r$1.length);
	for (var e$1 = 0, n$1 = Array(a$2); e$1 < a$2; e$1++) n$1[e$1] = r$1[e$1];
	return n$1;
}
function _arrayWithHoles(r$1) {
	if (Array.isArray(r$1)) return r$1;
}
function _defineProperty(e$1, r$1, t$1) {
	return (r$1 = _toPropertyKey(r$1)) in e$1 ? Object.defineProperty(e$1, r$1, {
		value: t$1,
		enumerable: true,
		configurable: true,
		writable: true
	}) : e$1[r$1] = t$1, e$1;
}
function _iterableToArrayLimit(r$1, l$1) {
	var t$1 = null == r$1 ? null : "undefined" != typeof Symbol && r$1[Symbol.iterator] || r$1["@@iterator"];
	if (null != t$1) {
		var e$1, n$1, i$1, u$1, a$2 = [], f$1 = true, o$1 = false;
		try {
			if (i$1 = (t$1 = t$1.call(r$1)).next, 0 === l$1);
			else for (; !(f$1 = (e$1 = i$1.call(t$1)).done) && (a$2.push(e$1.value), a$2.length !== l$1); f$1 = !0);
		} catch (r$2) {
			o$1 = true, n$1 = r$2;
		} finally {
			try {
				if (!f$1 && null != t$1.return && (u$1 = t$1.return(), Object(u$1) !== u$1)) return;
			} finally {
				if (o$1) throw n$1;
			}
		}
		return a$2;
	}
}
function _nonIterableRest() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e$1, r$1) {
	var t$1 = Object.keys(e$1);
	if (Object.getOwnPropertySymbols) {
		var o$1 = Object.getOwnPropertySymbols(e$1);
		r$1 && (o$1 = o$1.filter(function(r$2) {
			return Object.getOwnPropertyDescriptor(e$1, r$2).enumerable;
		})), t$1.push.apply(t$1, o$1);
	}
	return t$1;
}
function _objectSpread2(e$1) {
	for (var r$1 = 1; r$1 < arguments.length; r$1++) {
		var t$1 = null != arguments[r$1] ? arguments[r$1] : {};
		r$1 % 2 ? ownKeys(Object(t$1), true).forEach(function(r$2) {
			_defineProperty(e$1, r$2, t$1[r$2]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e$1, Object.getOwnPropertyDescriptors(t$1)) : ownKeys(Object(t$1)).forEach(function(r$2) {
			Object.defineProperty(e$1, r$2, Object.getOwnPropertyDescriptor(t$1, r$2));
		});
	}
	return e$1;
}
function _slicedToArray(r$1, e$1) {
	return _arrayWithHoles(r$1) || _iterableToArrayLimit(r$1, e$1) || _unsupportedIterableToArray(r$1, e$1) || _nonIterableRest();
}
function _toPrimitive(t$1, r$1) {
	if ("object" != typeof t$1 || !t$1) return t$1;
	var e$1 = t$1[Symbol.toPrimitive];
	if (void 0 !== e$1) {
		var i$1 = e$1.call(t$1, r$1);
		if ("object" != typeof i$1) return i$1;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r$1 ? String : Number)(t$1);
}
function _toPropertyKey(t$1) {
	var i$1 = _toPrimitive(t$1, "string");
	return "symbol" == typeof i$1 ? i$1 : i$1 + "";
}
function _typeof(o$1) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$2) {
		return typeof o$2;
	} : function(o$2) {
		return o$2 && "function" == typeof Symbol && o$2.constructor === Symbol && o$2 !== Symbol.prototype ? "symbol" : typeof o$2;
	}, _typeof(o$1);
}
function _unsupportedIterableToArray(r$1, a$2) {
	if (r$1) {
		if ("string" == typeof r$1) return _arrayLikeToArray(r$1, a$2);
		var t$1 = {}.toString.call(r$1).slice(8, -1);
		return "Object" === t$1 && r$1.constructor && (t$1 = r$1.constructor.name), "Map" === t$1 || "Set" === t$1 ? Array.from(r$1) : "Arguments" === t$1 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t$1) ? _arrayLikeToArray(r$1, a$2) : void 0;
	}
}
var _reactElement2VNode = function reactElement2VNode(el) {
	if (!(_typeof(el) === "object")) return el;
	var res = W(el);
	if (res.props) {
		var _res$props;
		res.props = _objectSpread2({}, res.props);
		if (res !== null && res !== void 0 && (_res$props = res.props) !== null && _res$props !== void 0 && _res$props.children) res.props.children = Array.isArray(res.props.children) ? res.props.children.map(_reactElement2VNode) : _reactElement2VNode(res.props.children);
	}
	return res;
};
var isReactRenderable = function isReactRenderable$1(o$1) {
	return t(W(o$1));
};
var render = function render$1(jsx, domEl) {
	delete domEl.__k;
	R(_reactElement2VNode(jsx), domEl);
};
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
styleInject(".float-tooltip-kap {\n  position: absolute;\n  width: max-content; /* prevent shrinking near right edge */\n  max-width: max(50%, 150px);\n  padding: 3px 5px;\n  border-radius: 3px;\n  font: 12px sans-serif;\n  color: #eee;\n  background: rgba(0,0,0,0.6);\n  pointer-events: none;\n}\n");
var index$2 = index$1({
	props: {
		content: { "default": false },
		offsetX: { triggerUpdate: false },
		offsetY: { triggerUpdate: false }
	},
	init: function init(domNode, state) {
		var _ref$style = (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}).style, style = _ref$style === void 0 ? {} : _ref$style;
		var el = select_default(!!domNode && _typeof(domNode) === "object" && !!domNode.node && typeof domNode.node === "function" ? domNode.node() : domNode);
		el.style("position") === "static" && el.style("position", "relative");
		state.tooltipEl = el.append("div").attr("class", "float-tooltip-kap");
		Object.entries(style).forEach(function(_ref2) {
			var _ref3 = _slicedToArray(_ref2, 2), k$1 = _ref3[0], v$1 = _ref3[1];
			return state.tooltipEl.style(k$1, v$1);
		});
		state.tooltipEl.style("left", "-10000px").style("display", "none");
		var evSuffix = "tooltip-".concat(Math.round(Math.random() * 0xe8d4a51000));
		state.mouseInside = false;
		el.on("mousemove.".concat(evSuffix), function(ev) {
			state.mouseInside = true;
			var mousePos = pointer_default(ev);
			var domNode$1 = el.node();
			var canvasWidth = domNode$1.offsetWidth;
			var canvasHeight = domNode$1.offsetHeight;
			var translate = [state.offsetX === null || state.offsetX === void 0 ? "-".concat(mousePos[0] / canvasWidth * 100, "%") : typeof state.offsetX === "number" ? "calc(-50% + ".concat(state.offsetX, "px)") : state.offsetX, state.offsetY === null || state.offsetY === void 0 ? canvasHeight > 130 && canvasHeight - mousePos[1] < 100 ? "calc(-100% - 6px)" : "21px" : typeof state.offsetY === "number" ? state.offsetY < 0 ? "calc(-100% - ".concat(Math.abs(state.offsetY), "px)") : "".concat(state.offsetY, "px") : state.offsetY];
			state.tooltipEl.style("left", mousePos[0] + "px").style("top", mousePos[1] + "px").style("transform", "translate(".concat(translate.join(","), ")"));
			state.content && state.tooltipEl.style("display", "inline");
		});
		el.on("mouseover.".concat(evSuffix), function() {
			state.mouseInside = true;
			state.content && state.tooltipEl.style("display", "inline");
		});
		el.on("mouseout.".concat(evSuffix), function() {
			state.mouseInside = false;
			state.tooltipEl.style("display", "none");
		});
	},
	update: function update$1(state) {
		state.tooltipEl.style("display", !!state.content && state.mouseInside ? "inline" : "none");
		if (!state.content) state.tooltipEl.text("");
		else if (state.content instanceof HTMLElement) {
			state.tooltipEl.text("");
			state.tooltipEl.append(function() {
				return state.content;
			});
		} else if (typeof state.content === "string") state.tooltipEl.html(state.content);
		else if (isReactRenderable(state.content)) {
			state.tooltipEl.text("");
			render(state.content, state.tooltipEl.node());
		} else {
			state.tooltipEl.style("display", "none");
			console.warn("Tooltip content is invalid, skipping.", state.content, state.content.toString());
		}
	}
});
function center_default(x$2, y$2, z$2) {
	var nodes, strength = 1;
	if (x$2 == null) x$2 = 0;
	if (y$2 == null) y$2 = 0;
	if (z$2 == null) z$2 = 0;
	function force() {
		var i$1, n$1 = nodes.length, node, sx = 0, sy = 0, sz = 0;
		for (i$1 = 0; i$1 < n$1; ++i$1) node = nodes[i$1], sx += node.x || 0, sy += node.y || 0, sz += node.z || 0;
		for (sx = (sx / n$1 - x$2) * strength, sy = (sy / n$1 - y$2) * strength, sz = (sz / n$1 - z$2) * strength, i$1 = 0; i$1 < n$1; ++i$1) {
			node = nodes[i$1];
			if (sx) node.x -= sx;
			if (sy) node.y -= sy;
			if (sz) node.z -= sz;
		}
	}
	force.initialize = function(_$1) {
		nodes = _$1;
	};
	force.x = function(_$1) {
		return arguments.length ? (x$2 = +_$1, force) : x$2;
	};
	force.y = function(_$1) {
		return arguments.length ? (y$2 = +_$1, force) : y$2;
	};
	force.z = function(_$1) {
		return arguments.length ? (z$2 = +_$1, force) : z$2;
	};
	force.strength = function(_$1) {
		return arguments.length ? (strength = +_$1, force) : strength;
	};
	return force;
}
function add_default$2(d$1) {
	const x$2 = +this._x.call(null, d$1);
	return add$2(this.cover(x$2), x$2, d$1);
}
function add$2(tree, x$2, d$1) {
	if (isNaN(x$2)) return tree;
	var parent, node = tree._root, leaf = { data: d$1 }, x0 = tree._x0, x1 = tree._x1, xm, xp, right, i$1, j$1;
	if (!node) return tree._root = leaf, tree;
	while (node.length) {
		if (right = x$2 >= (xm = (x0 + x1) / 2)) x0 = xm;
		else x1 = xm;
		if (parent = node, !(node = node[i$1 = +right])) return parent[i$1] = leaf, tree;
	}
	xp = +tree._x.call(null, node.data);
	if (x$2 === xp) return leaf.next = node, parent ? parent[i$1] = leaf : tree._root = leaf, tree;
	do {
		parent = parent ? parent[i$1] = new Array(2) : tree._root = new Array(2);
		if (right = x$2 >= (xm = (x0 + x1) / 2)) x0 = xm;
		else x1 = xm;
	} while ((i$1 = +right) === (j$1 = +(xp >= xm)));
	return parent[j$1] = node, parent[i$1] = leaf, tree;
}
function addAll$2(data) {
	if (!Array.isArray(data)) data = Array.from(data);
	const n$1 = data.length;
	const xz = new Float64Array(n$1);
	let x0 = Infinity, x1 = -Infinity;
	for (let i$1 = 0, x$2; i$1 < n$1; ++i$1) {
		if (isNaN(x$2 = +this._x.call(null, data[i$1]))) continue;
		xz[i$1] = x$2;
		if (x$2 < x0) x0 = x$2;
		if (x$2 > x1) x1 = x$2;
	}
	if (x0 > x1) return this;
	this.cover(x0).cover(x1);
	for (let i$1 = 0; i$1 < n$1; ++i$1) add$2(this, xz[i$1], data[i$1]);
	return this;
}
function cover_default$2(x$2) {
	if (isNaN(x$2 = +x$2)) return this;
	var x0 = this._x0, x1 = this._x1;
	if (isNaN(x0)) x1 = (x0 = Math.floor(x$2)) + 1;
	else {
		var z$2 = x1 - x0 || 1, node = this._root, parent, i$1;
		while (x0 > x$2 || x$2 >= x1) {
			i$1 = +(x$2 < x0);
			parent = new Array(2), parent[i$1] = node, node = parent, z$2 *= 2;
			switch (i$1) {
				case 0:
					x1 = x0 + z$2;
					break;
				case 1:
					x0 = x1 - z$2;
					break;
			}
		}
		if (this._root && this._root.length) this._root = node;
	}
	this._x0 = x0;
	this._x1 = x1;
	return this;
}
function data_default$2() {
	var data = [];
	this.visit(function(node) {
		if (!node.length) do
			data.push(node.data);
		while (node = node.next);
	});
	return data;
}
function extent_default$2(_$1) {
	return arguments.length ? this.cover(+_$1[0][0]).cover(+_$1[1][0]) : isNaN(this._x0) ? void 0 : [[this._x0], [this._x1]];
}
function half_default(node, x0, x1) {
	this.node = node;
	this.x0 = x0;
	this.x1 = x1;
}
function find_default$2(x$2, radius) {
	var data, x0 = this._x0, x1, x2, x3 = this._x1, halves = [], node = this._root, q$1, i$1;
	if (node) halves.push(new half_default(node, x0, x3));
	if (radius == null) radius = Infinity;
	else {
		x0 = x$2 - radius;
		x3 = x$2 + radius;
	}
	while (q$1 = halves.pop()) {
		if (!(node = q$1.node) || (x1 = q$1.x0) > x3 || (x2 = q$1.x1) < x0) continue;
		if (node.length) {
			var xm = (x1 + x2) / 2;
			halves.push(new half_default(node[1], xm, x2), new half_default(node[0], x1, xm));
			if (i$1 = +(x$2 >= xm)) {
				q$1 = halves[halves.length - 1];
				halves[halves.length - 1] = halves[halves.length - 1 - i$1];
				halves[halves.length - 1 - i$1] = q$1;
			}
		} else {
			var d$1 = Math.abs(x$2 - +this._x.call(null, node.data));
			if (d$1 < radius) {
				radius = d$1;
				x0 = x$2 - d$1;
				x3 = x$2 + d$1;
				data = node.data;
			}
		}
	}
	return data;
}
function remove_default$2(d$1) {
	if (isNaN(x$2 = +this._x.call(null, d$1))) return this;
	var parent, node = this._root, retainer, previous, next, x0 = this._x0, x1 = this._x1, x$2, xm, right, i$1, j$1;
	if (!node) return this;
	if (node.length) while (true) {
		if (right = x$2 >= (xm = (x0 + x1) / 2)) x0 = xm;
		else x1 = xm;
		if (!(parent = node, node = node[i$1 = +right])) return this;
		if (!node.length) break;
		if (parent[i$1 + 1 & 1]) retainer = parent, j$1 = i$1;
	}
	while (node.data !== d$1) if (!(previous = node, node = node.next)) return this;
	if (next = node.next) delete node.next;
	if (previous) return next ? previous.next = next : delete previous.next, this;
	if (!parent) return this._root = next, this;
	next ? parent[i$1] = next : delete parent[i$1];
	if ((node = parent[0] || parent[1]) && node === (parent[1] || parent[0]) && !node.length) if (retainer) retainer[j$1] = node;
	else this._root = node;
	return this;
}
function removeAll$2(data) {
	for (var i$1 = 0, n$1 = data.length; i$1 < n$1; ++i$1) this.remove(data[i$1]);
	return this;
}
function root_default$2() {
	return this._root;
}
function size_default$2() {
	var size = 0;
	this.visit(function(node) {
		if (!node.length) do
			++size;
		while (node = node.next);
	});
	return size;
}
function visit_default$2(callback) {
	var halves = [], q$1, node = this._root, child, x0, x1;
	if (node) halves.push(new half_default(node, this._x0, this._x1));
	while (q$1 = halves.pop()) if (!callback(node = q$1.node, x0 = q$1.x0, x1 = q$1.x1) && node.length) {
		var xm = (x0 + x1) / 2;
		if (child = node[1]) halves.push(new half_default(child, xm, x1));
		if (child = node[0]) halves.push(new half_default(child, x0, xm));
	}
	return this;
}
function visitAfter_default$2(callback) {
	var halves = [], next = [], q$1;
	if (this._root) halves.push(new half_default(this._root, this._x0, this._x1));
	while (q$1 = halves.pop()) {
		var node = q$1.node;
		if (node.length) {
			var child, x0 = q$1.x0, x1 = q$1.x1, xm = (x0 + x1) / 2;
			if (child = node[0]) halves.push(new half_default(child, x0, xm));
			if (child = node[1]) halves.push(new half_default(child, xm, x1));
		}
		next.push(q$1);
	}
	while (q$1 = next.pop()) callback(q$1.node, q$1.x0, q$1.x1);
	return this;
}
function defaultX$2(d$1) {
	return d$1[0];
}
function x_default$2(_$1) {
	return arguments.length ? (this._x = _$1, this) : this._x;
}
function binarytree(nodes, x$2) {
	var tree = new Binarytree(x$2 == null ? defaultX$2 : x$2, NaN, NaN);
	return nodes == null ? tree : tree.addAll(nodes);
}
function Binarytree(x$2, x0, x1) {
	this._x = x$2;
	this._x0 = x0;
	this._x1 = x1;
	this._root = void 0;
}
function leaf_copy$2(leaf) {
	var copy = { data: leaf.data }, next = copy;
	while (leaf = leaf.next) next = next.next = { data: leaf.data };
	return copy;
}
var treeProto$2 = binarytree.prototype = Binarytree.prototype;
treeProto$2.copy = function() {
	var copy = new Binarytree(this._x, this._x0, this._x1), node = this._root, nodes, child;
	if (!node) return copy;
	if (!node.length) return copy._root = leaf_copy$2(node), copy;
	nodes = [{
		source: node,
		target: copy._root = new Array(2)
	}];
	while (node = nodes.pop()) for (var i$1 = 0; i$1 < 2; ++i$1) if (child = node.source[i$1]) if (child.length) nodes.push({
		source: child,
		target: node.target[i$1] = new Array(2)
	});
	else node.target[i$1] = leaf_copy$2(child);
	return copy;
};
treeProto$2.add = add_default$2;
treeProto$2.addAll = addAll$2;
treeProto$2.cover = cover_default$2;
treeProto$2.data = data_default$2;
treeProto$2.extent = extent_default$2;
treeProto$2.find = find_default$2;
treeProto$2.remove = remove_default$2;
treeProto$2.removeAll = removeAll$2;
treeProto$2.root = root_default$2;
treeProto$2.size = size_default$2;
treeProto$2.visit = visit_default$2;
treeProto$2.visitAfter = visitAfter_default$2;
treeProto$2.x = x_default$2;
function add_default$1(d$1) {
	const x$2 = +this._x.call(null, d$1), y$2 = +this._y.call(null, d$1);
	return add$1(this.cover(x$2, y$2), x$2, y$2, d$1);
}
function add$1(tree, x$2, y$2, d$1) {
	if (isNaN(x$2) || isNaN(y$2)) return tree;
	var parent, node = tree._root, leaf = { data: d$1 }, x0 = tree._x0, y0 = tree._y0, x1 = tree._x1, y1 = tree._y1, xm, ym, xp, yp, right, bottom, i$1, j$1;
	if (!node) return tree._root = leaf, tree;
	while (node.length) {
		if (right = x$2 >= (xm = (x0 + x1) / 2)) x0 = xm;
		else x1 = xm;
		if (bottom = y$2 >= (ym = (y0 + y1) / 2)) y0 = ym;
		else y1 = ym;
		if (parent = node, !(node = node[i$1 = bottom << 1 | right])) return parent[i$1] = leaf, tree;
	}
	xp = +tree._x.call(null, node.data);
	yp = +tree._y.call(null, node.data);
	if (x$2 === xp && y$2 === yp) return leaf.next = node, parent ? parent[i$1] = leaf : tree._root = leaf, tree;
	do {
		parent = parent ? parent[i$1] = new Array(4) : tree._root = new Array(4);
		if (right = x$2 >= (xm = (x0 + x1) / 2)) x0 = xm;
		else x1 = xm;
		if (bottom = y$2 >= (ym = (y0 + y1) / 2)) y0 = ym;
		else y1 = ym;
	} while ((i$1 = bottom << 1 | right) === (j$1 = (yp >= ym) << 1 | xp >= xm));
	return parent[j$1] = node, parent[i$1] = leaf, tree;
}
function addAll$1(data) {
	var d$1, i$1, n$1 = data.length, x$2, y$2, xz = new Array(n$1), yz = new Array(n$1), x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
	for (i$1 = 0; i$1 < n$1; ++i$1) {
		if (isNaN(x$2 = +this._x.call(null, d$1 = data[i$1])) || isNaN(y$2 = +this._y.call(null, d$1))) continue;
		xz[i$1] = x$2;
		yz[i$1] = y$2;
		if (x$2 < x0) x0 = x$2;
		if (x$2 > x1) x1 = x$2;
		if (y$2 < y0) y0 = y$2;
		if (y$2 > y1) y1 = y$2;
	}
	if (x0 > x1 || y0 > y1) return this;
	this.cover(x0, y0).cover(x1, y1);
	for (i$1 = 0; i$1 < n$1; ++i$1) add$1(this, xz[i$1], yz[i$1], data[i$1]);
	return this;
}
function cover_default$1(x$2, y$2) {
	if (isNaN(x$2 = +x$2) || isNaN(y$2 = +y$2)) return this;
	var x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1;
	if (isNaN(x0)) {
		x1 = (x0 = Math.floor(x$2)) + 1;
		y1 = (y0 = Math.floor(y$2)) + 1;
	} else {
		var z$2 = x1 - x0 || 1, node = this._root, parent, i$1;
		while (x0 > x$2 || x$2 >= x1 || y0 > y$2 || y$2 >= y1) {
			i$1 = (y$2 < y0) << 1 | x$2 < x0;
			parent = new Array(4), parent[i$1] = node, node = parent, z$2 *= 2;
			switch (i$1) {
				case 0:
					x1 = x0 + z$2, y1 = y0 + z$2;
					break;
				case 1:
					x0 = x1 - z$2, y1 = y0 + z$2;
					break;
				case 2:
					x1 = x0 + z$2, y0 = y1 - z$2;
					break;
				case 3:
					x0 = x1 - z$2, y0 = y1 - z$2;
					break;
			}
		}
		if (this._root && this._root.length) this._root = node;
	}
	this._x0 = x0;
	this._y0 = y0;
	this._x1 = x1;
	this._y1 = y1;
	return this;
}
function data_default$1() {
	var data = [];
	this.visit(function(node) {
		if (!node.length) do
			data.push(node.data);
		while (node = node.next);
	});
	return data;
}
function extent_default$1(_$1) {
	return arguments.length ? this.cover(+_$1[0][0], +_$1[0][1]).cover(+_$1[1][0], +_$1[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function quad_default(node, x0, y0, x1, y1) {
	this.node = node;
	this.x0 = x0;
	this.y0 = y0;
	this.x1 = x1;
	this.y1 = y1;
}
function find_default$1(x$2, y$2, radius) {
	var data, x0 = this._x0, y0 = this._y0, x1, y1, x2, y2, x3 = this._x1, y3 = this._y1, quads = [], node = this._root, q$1, i$1;
	if (node) quads.push(new quad_default(node, x0, y0, x3, y3));
	if (radius == null) radius = Infinity;
	else {
		x0 = x$2 - radius, y0 = y$2 - radius;
		x3 = x$2 + radius, y3 = y$2 + radius;
		radius *= radius;
	}
	while (q$1 = quads.pop()) {
		if (!(node = q$1.node) || (x1 = q$1.x0) > x3 || (y1 = q$1.y0) > y3 || (x2 = q$1.x1) < x0 || (y2 = q$1.y1) < y0) continue;
		if (node.length) {
			var xm = (x1 + x2) / 2, ym = (y1 + y2) / 2;
			quads.push(new quad_default(node[3], xm, ym, x2, y2), new quad_default(node[2], x1, ym, xm, y2), new quad_default(node[1], xm, y1, x2, ym), new quad_default(node[0], x1, y1, xm, ym));
			if (i$1 = (y$2 >= ym) << 1 | x$2 >= xm) {
				q$1 = quads[quads.length - 1];
				quads[quads.length - 1] = quads[quads.length - 1 - i$1];
				quads[quads.length - 1 - i$1] = q$1;
			}
		} else {
			var dx = x$2 - +this._x.call(null, node.data), dy = y$2 - +this._y.call(null, node.data), d2 = dx * dx + dy * dy;
			if (d2 < radius) {
				var d$1 = Math.sqrt(radius = d2);
				x0 = x$2 - d$1, y0 = y$2 - d$1;
				x3 = x$2 + d$1, y3 = y$2 + d$1;
				data = node.data;
			}
		}
	}
	return data;
}
function remove_default$1(d$1) {
	if (isNaN(x$2 = +this._x.call(null, d$1)) || isNaN(y$2 = +this._y.call(null, d$1))) return this;
	var parent, node = this._root, retainer, previous, next, x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1, x$2, y$2, xm, ym, right, bottom, i$1, j$1;
	if (!node) return this;
	if (node.length) while (true) {
		if (right = x$2 >= (xm = (x0 + x1) / 2)) x0 = xm;
		else x1 = xm;
		if (bottom = y$2 >= (ym = (y0 + y1) / 2)) y0 = ym;
		else y1 = ym;
		if (!(parent = node, node = node[i$1 = bottom << 1 | right])) return this;
		if (!node.length) break;
		if (parent[i$1 + 1 & 3] || parent[i$1 + 2 & 3] || parent[i$1 + 3 & 3]) retainer = parent, j$1 = i$1;
	}
	while (node.data !== d$1) if (!(previous = node, node = node.next)) return this;
	if (next = node.next) delete node.next;
	if (previous) return next ? previous.next = next : delete previous.next, this;
	if (!parent) return this._root = next, this;
	next ? parent[i$1] = next : delete parent[i$1];
	if ((node = parent[0] || parent[1] || parent[2] || parent[3]) && node === (parent[3] || parent[2] || parent[1] || parent[0]) && !node.length) if (retainer) retainer[j$1] = node;
	else this._root = node;
	return this;
}
function removeAll$1(data) {
	for (var i$1 = 0, n$1 = data.length; i$1 < n$1; ++i$1) this.remove(data[i$1]);
	return this;
}
function root_default$1() {
	return this._root;
}
function size_default$1() {
	var size = 0;
	this.visit(function(node) {
		if (!node.length) do
			++size;
		while (node = node.next);
	});
	return size;
}
function visit_default$1(callback) {
	var quads = [], q$1, node = this._root, child, x0, y0, x1, y1;
	if (node) quads.push(new quad_default(node, this._x0, this._y0, this._x1, this._y1));
	while (q$1 = quads.pop()) if (!callback(node = q$1.node, x0 = q$1.x0, y0 = q$1.y0, x1 = q$1.x1, y1 = q$1.y1) && node.length) {
		var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
		if (child = node[3]) quads.push(new quad_default(child, xm, ym, x1, y1));
		if (child = node[2]) quads.push(new quad_default(child, x0, ym, xm, y1));
		if (child = node[1]) quads.push(new quad_default(child, xm, y0, x1, ym));
		if (child = node[0]) quads.push(new quad_default(child, x0, y0, xm, ym));
	}
	return this;
}
function visitAfter_default$1(callback) {
	var quads = [], next = [], q$1;
	if (this._root) quads.push(new quad_default(this._root, this._x0, this._y0, this._x1, this._y1));
	while (q$1 = quads.pop()) {
		var node = q$1.node;
		if (node.length) {
			var child, x0 = q$1.x0, y0 = q$1.y0, x1 = q$1.x1, y1 = q$1.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
			if (child = node[0]) quads.push(new quad_default(child, x0, y0, xm, ym));
			if (child = node[1]) quads.push(new quad_default(child, xm, y0, x1, ym));
			if (child = node[2]) quads.push(new quad_default(child, x0, ym, xm, y1));
			if (child = node[3]) quads.push(new quad_default(child, xm, ym, x1, y1));
		}
		next.push(q$1);
	}
	while (q$1 = next.pop()) callback(q$1.node, q$1.x0, q$1.y0, q$1.x1, q$1.y1);
	return this;
}
function defaultX$1(d$1) {
	return d$1[0];
}
function x_default$1(_$1) {
	return arguments.length ? (this._x = _$1, this) : this._x;
}
function defaultY$1(d$1) {
	return d$1[1];
}
function y_default$1(_$1) {
	return arguments.length ? (this._y = _$1, this) : this._y;
}
function quadtree(nodes, x$2, y$2) {
	var tree = new Quadtree(x$2 == null ? defaultX$1 : x$2, y$2 == null ? defaultY$1 : y$2, NaN, NaN, NaN, NaN);
	return nodes == null ? tree : tree.addAll(nodes);
}
function Quadtree(x$2, y$2, x0, y0, x1, y1) {
	this._x = x$2;
	this._y = y$2;
	this._x0 = x0;
	this._y0 = y0;
	this._x1 = x1;
	this._y1 = y1;
	this._root = void 0;
}
function leaf_copy$1(leaf) {
	var copy = { data: leaf.data }, next = copy;
	while (leaf = leaf.next) next = next.next = { data: leaf.data };
	return copy;
}
var treeProto$1 = quadtree.prototype = Quadtree.prototype;
treeProto$1.copy = function() {
	var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1), node = this._root, nodes, child;
	if (!node) return copy;
	if (!node.length) return copy._root = leaf_copy$1(node), copy;
	nodes = [{
		source: node,
		target: copy._root = new Array(4)
	}];
	while (node = nodes.pop()) for (var i$1 = 0; i$1 < 4; ++i$1) if (child = node.source[i$1]) if (child.length) nodes.push({
		source: child,
		target: node.target[i$1] = new Array(4)
	});
	else node.target[i$1] = leaf_copy$1(child);
	return copy;
};
treeProto$1.add = add_default$1;
treeProto$1.addAll = addAll$1;
treeProto$1.cover = cover_default$1;
treeProto$1.data = data_default$1;
treeProto$1.extent = extent_default$1;
treeProto$1.find = find_default$1;
treeProto$1.remove = remove_default$1;
treeProto$1.removeAll = removeAll$1;
treeProto$1.root = root_default$1;
treeProto$1.size = size_default$1;
treeProto$1.visit = visit_default$1;
treeProto$1.visitAfter = visitAfter_default$1;
treeProto$1.x = x_default$1;
treeProto$1.y = y_default$1;
function add_default(d$1) {
	const x$2 = +this._x.call(null, d$1), y$2 = +this._y.call(null, d$1), z$2 = +this._z.call(null, d$1);
	return add(this.cover(x$2, y$2, z$2), x$2, y$2, z$2, d$1);
}
function add(tree, x$2, y$2, z$2, d$1) {
	if (isNaN(x$2) || isNaN(y$2) || isNaN(z$2)) return tree;
	var parent, node = tree._root, leaf = { data: d$1 }, x0 = tree._x0, y0 = tree._y0, z0 = tree._z0, x1 = tree._x1, y1 = tree._y1, z1 = tree._z1, xm, ym, zm, xp, yp, zp, right, bottom, deep, i$1, j$1;
	if (!node) return tree._root = leaf, tree;
	while (node.length) {
		if (right = x$2 >= (xm = (x0 + x1) / 2)) x0 = xm;
		else x1 = xm;
		if (bottom = y$2 >= (ym = (y0 + y1) / 2)) y0 = ym;
		else y1 = ym;
		if (deep = z$2 >= (zm = (z0 + z1) / 2)) z0 = zm;
		else z1 = zm;
		if (parent = node, !(node = node[i$1 = deep << 2 | bottom << 1 | right])) return parent[i$1] = leaf, tree;
	}
	xp = +tree._x.call(null, node.data);
	yp = +tree._y.call(null, node.data);
	zp = +tree._z.call(null, node.data);
	if (x$2 === xp && y$2 === yp && z$2 === zp) return leaf.next = node, parent ? parent[i$1] = leaf : tree._root = leaf, tree;
	do {
		parent = parent ? parent[i$1] = new Array(8) : tree._root = new Array(8);
		if (right = x$2 >= (xm = (x0 + x1) / 2)) x0 = xm;
		else x1 = xm;
		if (bottom = y$2 >= (ym = (y0 + y1) / 2)) y0 = ym;
		else y1 = ym;
		if (deep = z$2 >= (zm = (z0 + z1) / 2)) z0 = zm;
		else z1 = zm;
	} while ((i$1 = deep << 2 | bottom << 1 | right) === (j$1 = (zp >= zm) << 2 | (yp >= ym) << 1 | xp >= xm));
	return parent[j$1] = node, parent[i$1] = leaf, tree;
}
function addAll(data) {
	if (!Array.isArray(data)) data = Array.from(data);
	const n$1 = data.length;
	const xz = new Float64Array(n$1);
	const yz = new Float64Array(n$1);
	const zz = new Float64Array(n$1);
	let x0 = Infinity, y0 = Infinity, z0 = Infinity, x1 = -Infinity, y1 = -Infinity, z1 = -Infinity;
	for (let i$1 = 0, d$1, x$2, y$2, z$2; i$1 < n$1; ++i$1) {
		if (isNaN(x$2 = +this._x.call(null, d$1 = data[i$1])) || isNaN(y$2 = +this._y.call(null, d$1)) || isNaN(z$2 = +this._z.call(null, d$1))) continue;
		xz[i$1] = x$2;
		yz[i$1] = y$2;
		zz[i$1] = z$2;
		if (x$2 < x0) x0 = x$2;
		if (x$2 > x1) x1 = x$2;
		if (y$2 < y0) y0 = y$2;
		if (y$2 > y1) y1 = y$2;
		if (z$2 < z0) z0 = z$2;
		if (z$2 > z1) z1 = z$2;
	}
	if (x0 > x1 || y0 > y1 || z0 > z1) return this;
	this.cover(x0, y0, z0).cover(x1, y1, z1);
	for (let i$1 = 0; i$1 < n$1; ++i$1) add(this, xz[i$1], yz[i$1], zz[i$1], data[i$1]);
	return this;
}
function cover_default(x$2, y$2, z$2) {
	if (isNaN(x$2 = +x$2) || isNaN(y$2 = +y$2) || isNaN(z$2 = +z$2)) return this;
	var x0 = this._x0, y0 = this._y0, z0 = this._z0, x1 = this._x1, y1 = this._y1, z1 = this._z1;
	if (isNaN(x0)) {
		x1 = (x0 = Math.floor(x$2)) + 1;
		y1 = (y0 = Math.floor(y$2)) + 1;
		z1 = (z0 = Math.floor(z$2)) + 1;
	} else {
		var t$1 = x1 - x0 || 1, node = this._root, parent, i$1;
		while (x0 > x$2 || x$2 >= x1 || y0 > y$2 || y$2 >= y1 || z0 > z$2 || z$2 >= z1) {
			i$1 = (z$2 < z0) << 2 | (y$2 < y0) << 1 | x$2 < x0;
			parent = new Array(8), parent[i$1] = node, node = parent, t$1 *= 2;
			switch (i$1) {
				case 0:
					x1 = x0 + t$1, y1 = y0 + t$1, z1 = z0 + t$1;
					break;
				case 1:
					x0 = x1 - t$1, y1 = y0 + t$1, z1 = z0 + t$1;
					break;
				case 2:
					x1 = x0 + t$1, y0 = y1 - t$1, z1 = z0 + t$1;
					break;
				case 3:
					x0 = x1 - t$1, y0 = y1 - t$1, z1 = z0 + t$1;
					break;
				case 4:
					x1 = x0 + t$1, y1 = y0 + t$1, z0 = z1 - t$1;
					break;
				case 5:
					x0 = x1 - t$1, y1 = y0 + t$1, z0 = z1 - t$1;
					break;
				case 6:
					x1 = x0 + t$1, y0 = y1 - t$1, z0 = z1 - t$1;
					break;
				case 7:
					x0 = x1 - t$1, y0 = y1 - t$1, z0 = z1 - t$1;
					break;
			}
		}
		if (this._root && this._root.length) this._root = node;
	}
	this._x0 = x0;
	this._y0 = y0;
	this._z0 = z0;
	this._x1 = x1;
	this._y1 = y1;
	this._z1 = z1;
	return this;
}
function data_default() {
	var data = [];
	this.visit(function(node) {
		if (!node.length) do
			data.push(node.data);
		while (node = node.next);
	});
	return data;
}
function extent_default(_$1) {
	return arguments.length ? this.cover(+_$1[0][0], +_$1[0][1], +_$1[0][2]).cover(+_$1[1][0], +_$1[1][1], +_$1[1][2]) : isNaN(this._x0) ? void 0 : [[
		this._x0,
		this._y0,
		this._z0
	], [
		this._x1,
		this._y1,
		this._z1
	]];
}
function octant_default(node, x0, y0, z0, x1, y1, z1) {
	this.node = node;
	this.x0 = x0;
	this.y0 = y0;
	this.z0 = z0;
	this.x1 = x1;
	this.y1 = y1;
	this.z1 = z1;
}
function find_default(x$2, y$2, z$2, radius) {
	var data, x0 = this._x0, y0 = this._y0, z0 = this._z0, x1, y1, z1, x2, y2, z2, x3 = this._x1, y3 = this._y1, z3 = this._z1, octs = [], node = this._root, q$1, i$1;
	if (node) octs.push(new octant_default(node, x0, y0, z0, x3, y3, z3));
	if (radius == null) radius = Infinity;
	else {
		x0 = x$2 - radius, y0 = y$2 - radius, z0 = z$2 - radius;
		x3 = x$2 + radius, y3 = y$2 + radius, z3 = z$2 + radius;
		radius *= radius;
	}
	while (q$1 = octs.pop()) {
		if (!(node = q$1.node) || (x1 = q$1.x0) > x3 || (y1 = q$1.y0) > y3 || (z1 = q$1.z0) > z3 || (x2 = q$1.x1) < x0 || (y2 = q$1.y1) < y0 || (z2 = q$1.z1) < z0) continue;
		if (node.length) {
			var xm = (x1 + x2) / 2, ym = (y1 + y2) / 2, zm = (z1 + z2) / 2;
			octs.push(new octant_default(node[7], xm, ym, zm, x2, y2, z2), new octant_default(node[6], x1, ym, zm, xm, y2, z2), new octant_default(node[5], xm, y1, zm, x2, ym, z2), new octant_default(node[4], x1, y1, zm, xm, ym, z2), new octant_default(node[3], xm, ym, z1, x2, y2, zm), new octant_default(node[2], x1, ym, z1, xm, y2, zm), new octant_default(node[1], xm, y1, z1, x2, ym, zm), new octant_default(node[0], x1, y1, z1, xm, ym, zm));
			if (i$1 = (z$2 >= zm) << 2 | (y$2 >= ym) << 1 | x$2 >= xm) {
				q$1 = octs[octs.length - 1];
				octs[octs.length - 1] = octs[octs.length - 1 - i$1];
				octs[octs.length - 1 - i$1] = q$1;
			}
		} else {
			var dx = x$2 - +this._x.call(null, node.data), dy = y$2 - +this._y.call(null, node.data), dz = z$2 - +this._z.call(null, node.data), d2 = dx * dx + dy * dy + dz * dz;
			if (d2 < radius) {
				var d$1 = Math.sqrt(radius = d2);
				x0 = x$2 - d$1, y0 = y$2 - d$1, z0 = z$2 - d$1;
				x3 = x$2 + d$1, y3 = y$2 + d$1, z3 = z$2 + d$1;
				data = node.data;
			}
		}
	}
	return data;
}
var distance = (x1, y1, z1, x2, y2, z2) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
function findAllWithinRadius(x$2, y$2, z$2, radius) {
	const result = [];
	const xMin = x$2 - radius;
	const yMin = y$2 - radius;
	const zMin = z$2 - radius;
	const xMax = x$2 + radius;
	const yMax = y$2 + radius;
	const zMax = z$2 + radius;
	this.visit((node, x1, y1, z1, x2, y2, z2) => {
		if (!node.length) do {
			const d$1 = node.data;
			if (distance(x$2, y$2, z$2, this._x(d$1), this._y(d$1), this._z(d$1)) <= radius) result.push(d$1);
		} while (node = node.next);
		return x1 > xMax || y1 > yMax || z1 > zMax || x2 < xMin || y2 < yMin || z2 < zMin;
	});
	return result;
}
function remove_default(d$1) {
	if (isNaN(x$2 = +this._x.call(null, d$1)) || isNaN(y$2 = +this._y.call(null, d$1)) || isNaN(z$2 = +this._z.call(null, d$1))) return this;
	var parent, node = this._root, retainer, previous, next, x0 = this._x0, y0 = this._y0, z0 = this._z0, x1 = this._x1, y1 = this._y1, z1 = this._z1, x$2, y$2, z$2, xm, ym, zm, right, bottom, deep, i$1, j$1;
	if (!node) return this;
	if (node.length) while (true) {
		if (right = x$2 >= (xm = (x0 + x1) / 2)) x0 = xm;
		else x1 = xm;
		if (bottom = y$2 >= (ym = (y0 + y1) / 2)) y0 = ym;
		else y1 = ym;
		if (deep = z$2 >= (zm = (z0 + z1) / 2)) z0 = zm;
		else z1 = zm;
		if (!(parent = node, node = node[i$1 = deep << 2 | bottom << 1 | right])) return this;
		if (!node.length) break;
		if (parent[i$1 + 1 & 7] || parent[i$1 + 2 & 7] || parent[i$1 + 3 & 7] || parent[i$1 + 4 & 7] || parent[i$1 + 5 & 7] || parent[i$1 + 6 & 7] || parent[i$1 + 7 & 7]) retainer = parent, j$1 = i$1;
	}
	while (node.data !== d$1) if (!(previous = node, node = node.next)) return this;
	if (next = node.next) delete node.next;
	if (previous) return next ? previous.next = next : delete previous.next, this;
	if (!parent) return this._root = next, this;
	next ? parent[i$1] = next : delete parent[i$1];
	if ((node = parent[0] || parent[1] || parent[2] || parent[3] || parent[4] || parent[5] || parent[6] || parent[7]) && node === (parent[7] || parent[6] || parent[5] || parent[4] || parent[3] || parent[2] || parent[1] || parent[0]) && !node.length) if (retainer) retainer[j$1] = node;
	else this._root = node;
	return this;
}
function removeAll(data) {
	for (var i$1 = 0, n$1 = data.length; i$1 < n$1; ++i$1) this.remove(data[i$1]);
	return this;
}
function root_default() {
	return this._root;
}
function size_default() {
	var size = 0;
	this.visit(function(node) {
		if (!node.length) do
			++size;
		while (node = node.next);
	});
	return size;
}
function visit_default(callback) {
	var octs = [], q$1, node = this._root, child, x0, y0, z0, x1, y1, z1;
	if (node) octs.push(new octant_default(node, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1));
	while (q$1 = octs.pop()) if (!callback(node = q$1.node, x0 = q$1.x0, y0 = q$1.y0, z0 = q$1.z0, x1 = q$1.x1, y1 = q$1.y1, z1 = q$1.z1) && node.length) {
		var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2, zm = (z0 + z1) / 2;
		if (child = node[7]) octs.push(new octant_default(child, xm, ym, zm, x1, y1, z1));
		if (child = node[6]) octs.push(new octant_default(child, x0, ym, zm, xm, y1, z1));
		if (child = node[5]) octs.push(new octant_default(child, xm, y0, zm, x1, ym, z1));
		if (child = node[4]) octs.push(new octant_default(child, x0, y0, zm, xm, ym, z1));
		if (child = node[3]) octs.push(new octant_default(child, xm, ym, z0, x1, y1, zm));
		if (child = node[2]) octs.push(new octant_default(child, x0, ym, z0, xm, y1, zm));
		if (child = node[1]) octs.push(new octant_default(child, xm, y0, z0, x1, ym, zm));
		if (child = node[0]) octs.push(new octant_default(child, x0, y0, z0, xm, ym, zm));
	}
	return this;
}
function visitAfter_default(callback) {
	var octs = [], next = [], q$1;
	if (this._root) octs.push(new octant_default(this._root, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1));
	while (q$1 = octs.pop()) {
		var node = q$1.node;
		if (node.length) {
			var child, x0 = q$1.x0, y0 = q$1.y0, z0 = q$1.z0, x1 = q$1.x1, y1 = q$1.y1, z1 = q$1.z1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2, zm = (z0 + z1) / 2;
			if (child = node[0]) octs.push(new octant_default(child, x0, y0, z0, xm, ym, zm));
			if (child = node[1]) octs.push(new octant_default(child, xm, y0, z0, x1, ym, zm));
			if (child = node[2]) octs.push(new octant_default(child, x0, ym, z0, xm, y1, zm));
			if (child = node[3]) octs.push(new octant_default(child, xm, ym, z0, x1, y1, zm));
			if (child = node[4]) octs.push(new octant_default(child, x0, y0, zm, xm, ym, z1));
			if (child = node[5]) octs.push(new octant_default(child, xm, y0, zm, x1, ym, z1));
			if (child = node[6]) octs.push(new octant_default(child, x0, ym, zm, xm, y1, z1));
			if (child = node[7]) octs.push(new octant_default(child, xm, ym, zm, x1, y1, z1));
		}
		next.push(q$1);
	}
	while (q$1 = next.pop()) callback(q$1.node, q$1.x0, q$1.y0, q$1.z0, q$1.x1, q$1.y1, q$1.z1);
	return this;
}
function defaultX(d$1) {
	return d$1[0];
}
function x_default(_$1) {
	return arguments.length ? (this._x = _$1, this) : this._x;
}
function defaultY(d$1) {
	return d$1[1];
}
function y_default(_$1) {
	return arguments.length ? (this._y = _$1, this) : this._y;
}
function defaultZ(d$1) {
	return d$1[2];
}
function z_default(_$1) {
	return arguments.length ? (this._z = _$1, this) : this._z;
}
function octree(nodes, x$2, y$2, z$2) {
	var tree = new Octree(x$2 == null ? defaultX : x$2, y$2 == null ? defaultY : y$2, z$2 == null ? defaultZ : z$2, NaN, NaN, NaN, NaN, NaN, NaN);
	return nodes == null ? tree : tree.addAll(nodes);
}
function Octree(x$2, y$2, z$2, x0, y0, z0, x1, y1, z1) {
	this._x = x$2;
	this._y = y$2;
	this._z = z$2;
	this._x0 = x0;
	this._y0 = y0;
	this._z0 = z0;
	this._x1 = x1;
	this._y1 = y1;
	this._z1 = z1;
	this._root = void 0;
}
function leaf_copy(leaf) {
	var copy = { data: leaf.data }, next = copy;
	while (leaf = leaf.next) next = next.next = { data: leaf.data };
	return copy;
}
var treeProto = octree.prototype = Octree.prototype;
treeProto.copy = function() {
	var copy = new Octree(this._x, this._y, this._z, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1), node = this._root, nodes, child;
	if (!node) return copy;
	if (!node.length) return copy._root = leaf_copy(node), copy;
	nodes = [{
		source: node,
		target: copy._root = new Array(8)
	}];
	while (node = nodes.pop()) for (var i$1 = 0; i$1 < 8; ++i$1) if (child = node.source[i$1]) if (child.length) nodes.push({
		source: child,
		target: node.target[i$1] = new Array(8)
	});
	else node.target[i$1] = leaf_copy(child);
	return copy;
};
treeProto.add = add_default;
treeProto.addAll = addAll;
treeProto.cover = cover_default;
treeProto.data = data_default;
treeProto.extent = extent_default;
treeProto.find = find_default;
treeProto.findAllWithinRadius = findAllWithinRadius;
treeProto.remove = remove_default;
treeProto.removeAll = removeAll;
treeProto.root = root_default;
treeProto.size = size_default;
treeProto.visit = visit_default;
treeProto.visitAfter = visitAfter_default;
treeProto.x = x_default;
treeProto.y = y_default;
treeProto.z = z_default;
function constant_default(x$2) {
	return function() {
		return x$2;
	};
}
function jiggle_default(random) {
	return (random() - .5) * 1e-6;
}
function index(d$1) {
	return d$1.index;
}
function find(nodeById, nodeId) {
	var node = nodeById.get(nodeId);
	if (!node) throw new Error("node not found: " + nodeId);
	return node;
}
function link_default(links) {
	var id = index, strength = defaultStrength, strengths, distance$1 = constant_default(30), distances, nodes, nDim, count, bias, random, iterations = 1;
	if (links == null) links = [];
	function defaultStrength(link) {
		return 1 / Math.min(count[link.source.index], count[link.target.index]);
	}
	function force(alpha) {
		for (var k$1 = 0, n$1 = links.length; k$1 < iterations; ++k$1) for (var i$1 = 0, link, source, target, x$2 = 0, y$2 = 0, z$2 = 0, l$1, b$1; i$1 < n$1; ++i$1) {
			link = links[i$1], source = link.source, target = link.target;
			x$2 = target.x + target.vx - source.x - source.vx || jiggle_default(random);
			if (nDim > 1) y$2 = target.y + target.vy - source.y - source.vy || jiggle_default(random);
			if (nDim > 2) z$2 = target.z + target.vz - source.z - source.vz || jiggle_default(random);
			l$1 = Math.sqrt(x$2 * x$2 + y$2 * y$2 + z$2 * z$2);
			l$1 = (l$1 - distances[i$1]) / l$1 * alpha * strengths[i$1];
			x$2 *= l$1, y$2 *= l$1, z$2 *= l$1;
			target.vx -= x$2 * (b$1 = bias[i$1]);
			if (nDim > 1) target.vy -= y$2 * b$1;
			if (nDim > 2) target.vz -= z$2 * b$1;
			source.vx += x$2 * (b$1 = 1 - b$1);
			if (nDim > 1) source.vy += y$2 * b$1;
			if (nDim > 2) source.vz += z$2 * b$1;
		}
	}
	function initialize() {
		if (!nodes) return;
		var i$1, n$1 = nodes.length, m$2 = links.length, nodeById = new Map(nodes.map((d$1, i$2) => [id(d$1, i$2, nodes), d$1])), link;
		for (i$1 = 0, count = new Array(n$1); i$1 < m$2; ++i$1) {
			link = links[i$1], link.index = i$1;
			if (typeof link.source !== "object") link.source = find(nodeById, link.source);
			if (typeof link.target !== "object") link.target = find(nodeById, link.target);
			count[link.source.index] = (count[link.source.index] || 0) + 1;
			count[link.target.index] = (count[link.target.index] || 0) + 1;
		}
		for (i$1 = 0, bias = new Array(m$2); i$1 < m$2; ++i$1) link = links[i$1], bias[i$1] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
		strengths = new Array(m$2), initializeStrength();
		distances = new Array(m$2), initializeDistance();
	}
	function initializeStrength() {
		if (!nodes) return;
		for (var i$1 = 0, n$1 = links.length; i$1 < n$1; ++i$1) strengths[i$1] = +strength(links[i$1], i$1, links);
	}
	function initializeDistance() {
		if (!nodes) return;
		for (var i$1 = 0, n$1 = links.length; i$1 < n$1; ++i$1) distances[i$1] = +distance$1(links[i$1], i$1, links);
	}
	force.initialize = function(_nodes, ...args) {
		nodes = _nodes;
		random = args.find((arg) => typeof arg === "function") || Math.random;
		nDim = args.find((arg) => [
			1,
			2,
			3
		].includes(arg)) || 2;
		initialize();
	};
	force.links = function(_$1) {
		return arguments.length ? (links = _$1, initialize(), force) : links;
	};
	force.id = function(_$1) {
		return arguments.length ? (id = _$1, force) : id;
	};
	force.iterations = function(_$1) {
		return arguments.length ? (iterations = +_$1, force) : iterations;
	};
	force.strength = function(_$1) {
		return arguments.length ? (strength = typeof _$1 === "function" ? _$1 : constant_default(+_$1), initializeStrength(), force) : strength;
	};
	force.distance = function(_$1) {
		return arguments.length ? (distance$1 = typeof _$1 === "function" ? _$1 : constant_default(+_$1), initializeDistance(), force) : distance$1;
	};
	return force;
}
var a = 1664525;
var c = 1013904223;
var m = 4294967296;
function lcg_default() {
	let s$1 = 1;
	return () => (s$1 = (a * s$1 + c) % m) / m;
}
var MAX_DIMENSIONS = 3;
function x(d$1) {
	return d$1.x;
}
function y(d$1) {
	return d$1.y;
}
function z(d$1) {
	return d$1.z;
}
var initialRadius = 10, initialAngleRoll = Math.PI * (3 - Math.sqrt(5)), initialAngleYaw = Math.PI * 20 / (9 + Math.sqrt(221));
function simulation_default(nodes, numDimensions) {
	numDimensions = numDimensions || 2;
	var nDim = Math.min(MAX_DIMENSIONS, Math.max(1, Math.round(numDimensions))), simulation, alpha = 1, alphaMin = .001, alphaDecay = 1 - Math.pow(alphaMin, 1 / 300), alphaTarget = 0, velocityDecay = .6, forces = /* @__PURE__ */ new Map(), stepper = timer(step), event = dispatch_default("tick", "end"), random = lcg_default();
	if (nodes == null) nodes = [];
	function step() {
		tick();
		event.call("tick", simulation);
		if (alpha < alphaMin) {
			stepper.stop();
			event.call("end", simulation);
		}
	}
	function tick(iterations) {
		var i$1, n$1 = nodes.length, node;
		if (iterations === void 0) iterations = 1;
		for (var k$1 = 0; k$1 < iterations; ++k$1) {
			alpha += (alphaTarget - alpha) * alphaDecay;
			forces.forEach(function(force) {
				force(alpha);
			});
			for (i$1 = 0; i$1 < n$1; ++i$1) {
				node = nodes[i$1];
				if (node.fx == null) node.x += node.vx *= velocityDecay;
				else node.x = node.fx, node.vx = 0;
				if (nDim > 1) if (node.fy == null) node.y += node.vy *= velocityDecay;
				else node.y = node.fy, node.vy = 0;
				if (nDim > 2) if (node.fz == null) node.z += node.vz *= velocityDecay;
				else node.z = node.fz, node.vz = 0;
			}
		}
		return simulation;
	}
	function initializeNodes() {
		for (var i$1 = 0, n$1 = nodes.length, node; i$1 < n$1; ++i$1) {
			node = nodes[i$1], node.index = i$1;
			if (node.fx != null) node.x = node.fx;
			if (node.fy != null) node.y = node.fy;
			if (node.fz != null) node.z = node.fz;
			if (isNaN(node.x) || nDim > 1 && isNaN(node.y) || nDim > 2 && isNaN(node.z)) {
				var radius = initialRadius * (nDim > 2 ? Math.cbrt(.5 + i$1) : nDim > 1 ? Math.sqrt(.5 + i$1) : i$1), rollAngle = i$1 * initialAngleRoll, yawAngle = i$1 * initialAngleYaw;
				if (nDim === 1) node.x = radius;
				else if (nDim === 2) {
					node.x = radius * Math.cos(rollAngle);
					node.y = radius * Math.sin(rollAngle);
				} else {
					node.x = radius * Math.sin(rollAngle) * Math.cos(yawAngle);
					node.y = radius * Math.cos(rollAngle);
					node.z = radius * Math.sin(rollAngle) * Math.sin(yawAngle);
				}
			}
			if (isNaN(node.vx) || nDim > 1 && isNaN(node.vy) || nDim > 2 && isNaN(node.vz)) {
				node.vx = 0;
				if (nDim > 1) node.vy = 0;
				if (nDim > 2) node.vz = 0;
			}
		}
	}
	function initializeForce(force) {
		if (force.initialize) force.initialize(nodes, random, nDim);
		return force;
	}
	initializeNodes();
	return simulation = {
		tick,
		restart: function() {
			return stepper.restart(step), simulation;
		},
		stop: function() {
			return stepper.stop(), simulation;
		},
		numDimensions: function(_$1) {
			return arguments.length ? (nDim = Math.min(MAX_DIMENSIONS, Math.max(1, Math.round(_$1))), forces.forEach(initializeForce), simulation) : nDim;
		},
		nodes: function(_$1) {
			return arguments.length ? (nodes = _$1, initializeNodes(), forces.forEach(initializeForce), simulation) : nodes;
		},
		alpha: function(_$1) {
			return arguments.length ? (alpha = +_$1, simulation) : alpha;
		},
		alphaMin: function(_$1) {
			return arguments.length ? (alphaMin = +_$1, simulation) : alphaMin;
		},
		alphaDecay: function(_$1) {
			return arguments.length ? (alphaDecay = +_$1, simulation) : +alphaDecay;
		},
		alphaTarget: function(_$1) {
			return arguments.length ? (alphaTarget = +_$1, simulation) : alphaTarget;
		},
		velocityDecay: function(_$1) {
			return arguments.length ? (velocityDecay = 1 - _$1, simulation) : 1 - velocityDecay;
		},
		randomSource: function(_$1) {
			return arguments.length ? (random = _$1, forces.forEach(initializeForce), simulation) : random;
		},
		force: function(name, _$1) {
			return arguments.length > 1 ? (_$1 == null ? forces.delete(name) : forces.set(name, initializeForce(_$1)), simulation) : forces.get(name);
		},
		find: function() {
			var args = Array.prototype.slice.call(arguments);
			var x$2 = args.shift() || 0, y$2 = (nDim > 1 ? args.shift() : null) || 0, z$2 = (nDim > 2 ? args.shift() : null) || 0, radius = args.shift() || Infinity;
			var i$1 = 0, n$1 = nodes.length, dx, dy, dz, d2, node, closest;
			radius *= radius;
			for (i$1 = 0; i$1 < n$1; ++i$1) {
				node = nodes[i$1];
				dx = x$2 - node.x;
				dy = y$2 - (node.y || 0);
				dz = z$2 - (node.z || 0);
				d2 = dx * dx + dy * dy + dz * dz;
				if (d2 < radius) closest = node, radius = d2;
			}
			return closest;
		},
		on: function(name, _$1) {
			return arguments.length > 1 ? (event.on(name, _$1), simulation) : event.on(name);
		}
	};
}
function manyBody_default() {
	var nodes, nDim, node, random, alpha, strength = constant_default(-30), strengths, distanceMin2 = 1, distanceMax2 = Infinity, theta2 = .81;
	function force(_$1) {
		var i$1, n$1 = nodes.length, tree = (nDim === 1 ? binarytree(nodes, x) : nDim === 2 ? quadtree(nodes, x, y) : nDim === 3 ? octree(nodes, x, y, z) : null).visitAfter(accumulate);
		for (alpha = _$1, i$1 = 0; i$1 < n$1; ++i$1) node = nodes[i$1], tree.visit(apply);
	}
	function initialize() {
		if (!nodes) return;
		var i$1, n$1 = nodes.length, node$1;
		strengths = new Array(n$1);
		for (i$1 = 0; i$1 < n$1; ++i$1) node$1 = nodes[i$1], strengths[node$1.index] = +strength(node$1, i$1, nodes);
	}
	function accumulate(treeNode) {
		var strength$1 = 0, q$1, c$2, weight = 0, x$2, y$2, z$2, i$1;
		var numChildren = treeNode.length;
		if (numChildren) {
			for (x$2 = y$2 = z$2 = i$1 = 0; i$1 < numChildren; ++i$1) if ((q$1 = treeNode[i$1]) && (c$2 = Math.abs(q$1.value))) strength$1 += q$1.value, weight += c$2, x$2 += c$2 * (q$1.x || 0), y$2 += c$2 * (q$1.y || 0), z$2 += c$2 * (q$1.z || 0);
			strength$1 *= Math.sqrt(4 / numChildren);
			treeNode.x = x$2 / weight;
			if (nDim > 1) treeNode.y = y$2 / weight;
			if (nDim > 2) treeNode.z = z$2 / weight;
		} else {
			q$1 = treeNode;
			q$1.x = q$1.data.x;
			if (nDim > 1) q$1.y = q$1.data.y;
			if (nDim > 2) q$1.z = q$1.data.z;
			do
				strength$1 += strengths[q$1.data.index];
			while (q$1 = q$1.next);
		}
		treeNode.value = strength$1;
	}
	function apply(treeNode, x1, arg1, arg2, arg3) {
		if (!treeNode.value) return true;
		var x2 = [
			arg1,
			arg2,
			arg3
		][nDim - 1];
		var x$2 = treeNode.x - node.x, y$2 = nDim > 1 ? treeNode.y - node.y : 0, z$2 = nDim > 2 ? treeNode.z - node.z : 0, w$1 = x2 - x1, l$1 = x$2 * x$2 + y$2 * y$2 + z$2 * z$2;
		if (w$1 * w$1 / theta2 < l$1) {
			if (l$1 < distanceMax2) {
				if (x$2 === 0) x$2 = jiggle_default(random), l$1 += x$2 * x$2;
				if (nDim > 1 && y$2 === 0) y$2 = jiggle_default(random), l$1 += y$2 * y$2;
				if (nDim > 2 && z$2 === 0) z$2 = jiggle_default(random), l$1 += z$2 * z$2;
				if (l$1 < distanceMin2) l$1 = Math.sqrt(distanceMin2 * l$1);
				node.vx += x$2 * treeNode.value * alpha / l$1;
				if (nDim > 1) node.vy += y$2 * treeNode.value * alpha / l$1;
				if (nDim > 2) node.vz += z$2 * treeNode.value * alpha / l$1;
			}
			return true;
		} else if (treeNode.length || l$1 >= distanceMax2) return;
		if (treeNode.data !== node || treeNode.next) {
			if (x$2 === 0) x$2 = jiggle_default(random), l$1 += x$2 * x$2;
			if (nDim > 1 && y$2 === 0) y$2 = jiggle_default(random), l$1 += y$2 * y$2;
			if (nDim > 2 && z$2 === 0) z$2 = jiggle_default(random), l$1 += z$2 * z$2;
			if (l$1 < distanceMin2) l$1 = Math.sqrt(distanceMin2 * l$1);
		}
		do
			if (treeNode.data !== node) {
				w$1 = strengths[treeNode.data.index] * alpha / l$1;
				node.vx += x$2 * w$1;
				if (nDim > 1) node.vy += y$2 * w$1;
				if (nDim > 2) node.vz += z$2 * w$1;
			}
		while (treeNode = treeNode.next);
	}
	force.initialize = function(_nodes, ...args) {
		nodes = _nodes;
		random = args.find((arg) => typeof arg === "function") || Math.random;
		nDim = args.find((arg) => [
			1,
			2,
			3
		].includes(arg)) || 2;
		initialize();
	};
	force.strength = function(_$1) {
		return arguments.length ? (strength = typeof _$1 === "function" ? _$1 : constant_default(+_$1), initialize(), force) : strength;
	};
	force.distanceMin = function(_$1) {
		return arguments.length ? (distanceMin2 = _$1 * _$1, force) : Math.sqrt(distanceMin2);
	};
	force.distanceMax = function(_$1) {
		return arguments.length ? (distanceMax2 = _$1 * _$1, force) : Math.sqrt(distanceMax2);
	};
	force.theta = function(_$1) {
		return arguments.length ? (theta2 = _$1 * _$1, force) : Math.sqrt(theta2);
	};
	return force;
}
function radial_default(radius, x$2, y$2, z$2) {
	var nodes, nDim, strength = constant_default(.1), strengths, radiuses;
	if (typeof radius !== "function") radius = constant_default(+radius);
	if (x$2 == null) x$2 = 0;
	if (y$2 == null) y$2 = 0;
	if (z$2 == null) z$2 = 0;
	function force(alpha) {
		for (var i$1 = 0, n$1 = nodes.length; i$1 < n$1; ++i$1) {
			var node = nodes[i$1], dx = node.x - x$2 || 1e-6, dy = (node.y || 0) - y$2 || 1e-6, dz = (node.z || 0) - z$2 || 1e-6, r$1 = Math.sqrt(dx * dx + dy * dy + dz * dz), k$1 = (radiuses[i$1] - r$1) * strengths[i$1] * alpha / r$1;
			node.vx += dx * k$1;
			if (nDim > 1) node.vy += dy * k$1;
			if (nDim > 2) node.vz += dz * k$1;
		}
	}
	function initialize() {
		if (!nodes) return;
		var i$1, n$1 = nodes.length;
		strengths = new Array(n$1);
		radiuses = new Array(n$1);
		for (i$1 = 0; i$1 < n$1; ++i$1) {
			radiuses[i$1] = +radius(nodes[i$1], i$1, nodes);
			strengths[i$1] = isNaN(radiuses[i$1]) ? 0 : +strength(nodes[i$1], i$1, nodes);
		}
	}
	force.initialize = function(initNodes, ...args) {
		nodes = initNodes;
		nDim = args.find((arg) => [
			1,
			2,
			3
		].includes(arg)) || 2;
		initialize();
	};
	force.strength = function(_$1) {
		return arguments.length ? (strength = typeof _$1 === "function" ? _$1 : constant_default(+_$1), initialize(), force) : strength;
	};
	force.radius = function(_$1) {
		return arguments.length ? (radius = typeof _$1 === "function" ? _$1 : constant_default(+_$1), initialize(), force) : radius;
	};
	force.x = function(_$1) {
		return arguments.length ? (x$2 = +_$1, force) : x$2;
	};
	force.y = function(_$1) {
		return arguments.length ? (y$2 = +_$1, force) : y$2;
	};
	force.z = function(_$1) {
		return arguments.length ? (z$2 = +_$1, force) : z$2;
	};
	return force;
}
function colors_default(specifier) {
	var n$1 = specifier.length / 6 | 0, colors = new Array(n$1), i$1 = 0;
	while (i$1 < n$1) colors[i$1] = "#" + specifier.slice(i$1 * 6, ++i$1 * 6);
	return colors;
}
var Paired_default = colors_default("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");
const NODE_COLOUR = {
	entity: "#6aa9ff",
	concept: "#b48cf2",
	project: "#ffb84d",
	session: "#5bd4a4"
};
const BROKEN_EDGE_COLOUR = "#f47fa4";
function colourForKind(kind) {
	return NODE_COLOUR[kind] ?? "#8b95a7";
}
function sizeChanged(prev, next, threshold = 2) {
	const dw = Math.abs(next.w - prev.w);
	const dh = Math.abs(next.h - prev.h);
	if (dw === 0 && dh === 0) return false;
	return dw >= threshold || dh >= threshold;
}
function clampCenterToView(center, zoom, bbox, view, minVisibleFraction = .25) {
	if (!Number.isFinite(zoom) || zoom <= 0) return center;
	const halfW = view.w / (2 * zoom);
	const halfH = view.h / (2 * zoom);
	const bboxW = bbox.x[1] - bbox.x[0];
	const bboxH = bbox.y[1] - bbox.y[0];
	const keepX = Math.min(view.w * minVisibleFraction / zoom, bboxW);
	const keepY = Math.min(view.h * minVisibleFraction / zoom, bboxH);
	const clampAxis = (c$2, lo, hi) => lo > hi ? (lo + hi) / 2 : Math.min(hi, Math.max(lo, c$2));
	return {
		x: clampAxis(center.x, bbox.x[0] - halfW + keepX, bbox.x[1] + halfW - keepX),
		y: clampAxis(center.y, bbox.y[0] - halfH + keepY, bbox.y[1] + halfH - keepY)
	};
}
function nodeRadius(backlinkCount) {
	return Math.max(8, Math.min(24, 8 + backlinkCount * 2));
}
function endpointId(endpoint) {
	if (typeof endpoint === "string" || typeof endpoint === "number") return String(endpoint);
	if (endpoint && typeof endpoint === "object" && "id" in endpoint) {
		const id = endpoint.id;
		return typeof id === "string" || typeof id === "number" ? String(id) : "";
	}
	return "";
}
function nodeSizeScore(backlinkCount, isActive) {
	const score = 1 + Math.min(Math.max(backlinkCount, 0), 8) * .2;
	return isActive ? score * 1.5 : score;
}
function countBacklinks(nodes, edges) {
	const known = new Set(nodes.map((n$1) => n$1.id));
	const counts = /* @__PURE__ */ new Map();
	for (const n$1 of nodes) counts.set(n$1.id, 0);
	for (const e$1 of edges) if (known.has(e$1.target)) counts.set(e$1.target, (counts.get(e$1.target) ?? 0) + 1);
	return counts;
}
function toGraphData(payload) {
	const backlinks = countBacklinks(payload.nodes, payload.edges);
	const nodes = payload.nodes.map((n$1) => {
		const count = backlinks.get(n$1.id) ?? 0;
		return {
			...n$1,
			backlinkCount: count,
			radius: nodeRadius(count),
			colour: colourForKind(n$1.kind)
		};
	});
	const links = [...payload.edges.map((e$1) => ({
		source: e$1.source,
		target: e$1.target,
		context: e$1.context,
		broken: false
	})), ...payload.broken.map((e$1) => ({
		source: e$1.source,
		target: e$1.target,
		context: "",
		broken: true
	}))];
	const known = new Set(nodes.map((n$1) => n$1.id));
	const phantomIds = /* @__PURE__ */ new Set();
	for (const link of links) for (const endpoint of [link.source, link.target]) if (typeof endpoint === "string" && !known.has(endpoint)) phantomIds.add(endpoint);
	for (const id of phantomIds) nodes.push({
		id,
		kind: "broken",
		title: id,
		backlinkCount: 0,
		radius: nodeRadius(0),
		colour: BROKEN_EDGE_COLOUR
	});
	return {
		nodes,
		links
	};
}
function escapeTooltipText(value) {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function nodeDetails(node, t$1) {
	const backlinks = node.backlinkCount ?? 0;
	const suffix = t$1(backlinks === 1 ? "wiki_graph.backlink_one" : "wiki_graph.backlink_many");
	return t$1("wiki_graph.node_details").replace("{0}", node.title).replace("{1}", node.kind).replace("{2}", String(backlinks)).replace("{3}", suffix);
}
function edgeDetails(edge, titles) {
	const sourceId = endpointId(edge.source);
	const targetId = endpointId(edge.target);
	const source = titles.get(sourceId) ?? sourceId;
	const target = titles.get(targetId) ?? targetId;
	const relationship = edge.context.trim();
	return `${source} → ${target}${relationship ? ` · ${relationship}` : ""}`;
}
export { pointer_default as A, Tween as C, now$2 as D, Timer as E, selectorAll_default as F, selector_default as I, namespace_default as L, selection_default as M, styleValue as N, timer as O, matcher_default as P, index$4 as R, Group as S, isObject_default as T, index$2 as _, endpointId as a, index$1 as b, nodeSizeScore as c, Paired_default as d, radial_default as f, center_default as g, link_default as h, edgeDetails as i, select_default as j, dispatch_default as k, sizeChanged as l, simulation_default as m, NODE_COLOUR as n, escapeTooltipText as o, manyBody_default as p, clampCenterToView as r, nodeDetails as s, BROKEN_EDGE_COLOUR as t, toGraphData as u, tinycolor as v, debounce_default as w, Easing as x, index$3 as y, require_prop_types as z };
