import { $c as __export, Bc as require_jsx_runtime, Xc as require_react, Zc as __commonJSMin, tl as __toESM } from "./index-BOzhgzD7.js";
import { a as html$2, c as hastToReact, i as ccount, n as stringify$1, o as svg, r as stringify, s as find, t as whitespace } from "./lib-B_8abcSJ.js";
var nameRe = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u;
var nameReJsx = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u;
var emptyOptions$3 = {};
function name(name$1, options) {
	return ((options || emptyOptions$3).jsx ? nameReJsx : nameRe).test(name$1);
}
var require_cjs$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
	var NEWLINE_REGEX = /\n/g;
	var WHITESPACE_REGEX = /^\s*/;
	var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
	var COLON_REGEX = /^:\s*/;
	var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
	var SEMICOLON_REGEX = /^[;\s]*/;
	var TRIM_REGEX = /^\s+|\s+$/g;
	var NEWLINE = "\n";
	var FORWARD_SLASH = "/";
	var ASTERISK = "*";
	var EMPTY_STRING = "";
	var TYPE_COMMENT = "comment";
	var TYPE_DECLARATION = "declaration";
	function index$1(style, options) {
		if (typeof style !== "string") throw new TypeError("First argument must be a string");
		if (!style) return [];
		options = options || {};
		var lineno = 1;
		var column = 1;
		function updatePosition(str) {
			var lines = str.match(NEWLINE_REGEX);
			if (lines) lineno += lines.length;
			var i = str.lastIndexOf(NEWLINE);
			column = ~i ? str.length - i : column + str.length;
		}
		function position$2() {
			var start = {
				line: lineno,
				column
			};
			return function(node$1) {
				node$1.position = new Position(start);
				whitespace$1();
				return node$1;
			};
		}
		function Position(start) {
			this.start = start;
			this.end = {
				line: lineno,
				column
			};
			this.source = options.source;
		}
		Position.prototype.content = style;
		function error(msg) {
			var err = /* @__PURE__ */ new Error(options.source + ":" + lineno + ":" + column + ": " + msg);
			err.reason = msg;
			err.filename = options.source;
			err.line = lineno;
			err.column = column;
			err.source = style;
			if (options.silent);
			else throw err;
		}
		function match(re) {
			var m = re.exec(style);
			if (!m) return;
			var str = m[0];
			updatePosition(str);
			style = style.slice(str.length);
			return m;
		}
		function whitespace$1() {
			match(WHITESPACE_REGEX);
		}
		function comments(rules) {
			var c;
			rules = rules || [];
			while (c = comment()) if (c !== false) rules.push(c);
			return rules;
		}
		function comment() {
			var pos = position$2();
			if (FORWARD_SLASH != style.charAt(0) || ASTERISK != style.charAt(1)) return;
			var i = 2;
			while (EMPTY_STRING != style.charAt(i) && (ASTERISK != style.charAt(i) || FORWARD_SLASH != style.charAt(i + 1))) ++i;
			i += 2;
			if (EMPTY_STRING === style.charAt(i - 1)) return error("End of comment missing");
			var str = style.slice(2, i - 2);
			column += 2;
			updatePosition(str);
			style = style.slice(i);
			column += 2;
			return pos({
				type: TYPE_COMMENT,
				comment: str
			});
		}
		function declaration() {
			var pos = position$2();
			var prop = match(PROPERTY_REGEX);
			if (!prop) return;
			comment();
			if (!match(COLON_REGEX)) return error("property missing ':'");
			var val = match(VALUE_REGEX);
			var ret = pos({
				type: TYPE_DECLARATION,
				property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
				value: val ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING)) : EMPTY_STRING
			});
			match(SEMICOLON_REGEX);
			return ret;
		}
		function declarations() {
			var decls = [];
			comments(decls);
			var decl;
			while (decl = declaration()) if (decl !== false) {
				decls.push(decl);
				comments(decls);
			}
			return decls;
		}
		whitespace$1();
		return declarations();
	}
	function trim(str) {
		return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
	}
	module.exports = index$1;
}));
var require_cjs$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = StyleToObject;
	var inline_style_parser_1 = __importDefault(require_cjs$2());
	function StyleToObject(style, iterator) {
		let styleObject = null;
		if (!style || typeof style !== "string") return styleObject;
		const declarations = (0, inline_style_parser_1.default)(style);
		const hasIterator = typeof iterator === "function";
		declarations.forEach((declaration) => {
			if (declaration.type !== "declaration") return;
			const { property, value } = declaration;
			if (hasIterator) iterator(property, value, declaration);
			else if (value) {
				styleObject = styleObject || {};
				styleObject[property] = value;
			}
		});
		return styleObject;
	}
}));
var require_utilities = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.camelCase = void 0;
	var CUSTOM_PROPERTY_REGEX = /^--[a-zA-Z0-9_-]+$/;
	var HYPHEN_REGEX = /-([a-z])/g;
	var NO_HYPHEN_REGEX = /^[^-]+$/;
	var VENDOR_PREFIX_REGEX = /^-(webkit|moz|ms|o|khtml)-/;
	var MS_VENDOR_PREFIX_REGEX = /^-(ms)-/;
	var skipCamelCase = function(property) {
		return !property || NO_HYPHEN_REGEX.test(property) || CUSTOM_PROPERTY_REGEX.test(property);
	};
	var capitalize = function(match, character) {
		return character.toUpperCase();
	};
	var trimHyphen = function(match, prefix) {
		return "".concat(prefix, "-");
	};
	var camelCase = function(property, options) {
		if (options === void 0) options = {};
		if (skipCamelCase(property)) return property;
		property = property.toLowerCase();
		if (options.reactCompat) property = property.replace(MS_VENDOR_PREFIX_REGEX, trimHyphen);
		else property = property.replace(VENDOR_PREFIX_REGEX, trimHyphen);
		return property.replace(HYPHEN_REGEX, capitalize);
	};
	exports.camelCase = camelCase;
}));
var require_cjs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var style_to_object_1 = (exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	})(require_cjs$1());
	var utilities_1 = require_utilities();
	function StyleToJS(style, options) {
		var output = {};
		if (!style || typeof style !== "string") return output;
		(0, style_to_object_1.default)(style, function(property, value) {
			if (property && value) output[(0, utilities_1.camelCase)(property, options)] = value;
		});
		return output;
	}
	StyleToJS.default = StyleToJS;
	module.exports = StyleToJS;
}));
const pointEnd = point$2("end");
const pointStart = point$2("start");
function point$2(type) {
	return point$3;
	function point$3(node$1) {
		const point$4 = node$1 && node$1.position && node$1.position[type] || {};
		if (typeof point$4.line === "number" && point$4.line > 0 && typeof point$4.column === "number" && point$4.column > 0) return {
			line: point$4.line,
			column: point$4.column,
			offset: typeof point$4.offset === "number" && point$4.offset > -1 ? point$4.offset : void 0
		};
	}
}
function position(node$1) {
	const start = pointStart(node$1);
	const end = pointEnd(node$1);
	if (start && end) return {
		start,
		end
	};
}
function stringifyPosition(value) {
	if (!value || typeof value !== "object") return "";
	if ("position" in value || "type" in value) return position$1(value.position);
	if ("start" in value || "end" in value) return position$1(value);
	if ("line" in value || "column" in value) return point$1(value);
	return "";
}
function point$1(point$3) {
	return index(point$3 && point$3.line) + ":" + index(point$3 && point$3.column);
}
function position$1(pos) {
	return point$1(pos && pos.start) + "-" + point$1(pos && pos.end);
}
function index(value) {
	return value && typeof value === "number" ? value : 1;
}
var VFileMessage = class extends Error {
	constructor(causeOrReason, optionsOrParentOrPlace, origin) {
		super();
		if (typeof optionsOrParentOrPlace === "string") {
			origin = optionsOrParentOrPlace;
			optionsOrParentOrPlace = void 0;
		}
		let reason = "";
		let options = {};
		let legacyCause = false;
		if (optionsOrParentOrPlace) if ("line" in optionsOrParentOrPlace && "column" in optionsOrParentOrPlace) options = { place: optionsOrParentOrPlace };
		else if ("start" in optionsOrParentOrPlace && "end" in optionsOrParentOrPlace) options = { place: optionsOrParentOrPlace };
		else if ("type" in optionsOrParentOrPlace) options = {
			ancestors: [optionsOrParentOrPlace],
			place: optionsOrParentOrPlace.position
		};
		else options = { ...optionsOrParentOrPlace };
		if (typeof causeOrReason === "string") reason = causeOrReason;
		else if (!options.cause && causeOrReason) {
			legacyCause = true;
			reason = causeOrReason.message;
			options.cause = causeOrReason;
		}
		if (!options.ruleId && !options.source && typeof origin === "string") {
			const index$2 = origin.indexOf(":");
			if (index$2 === -1) options.ruleId = origin;
			else {
				options.source = origin.slice(0, index$2);
				options.ruleId = origin.slice(index$2 + 1);
			}
		}
		if (!options.place && options.ancestors && options.ancestors) {
			const parent = options.ancestors[options.ancestors.length - 1];
			if (parent) options.place = parent.position;
		}
		const start = options.place && "start" in options.place ? options.place.start : options.place;
		this.ancestors = options.ancestors || void 0;
		this.cause = options.cause || void 0;
		this.column = start ? start.column : void 0;
		this.fatal = void 0;
		this.file = "";
		this.message = reason;
		this.line = start ? start.line : void 0;
		this.name = stringifyPosition(options.place) || "1:1";
		this.place = options.place || void 0;
		this.reason = this.message;
		this.ruleId = options.ruleId || void 0;
		this.source = options.source || void 0;
		this.stack = legacyCause && options.cause && typeof options.cause.stack === "string" ? options.cause.stack : "";
		this.actual = void 0;
		this.expected = void 0;
		this.note = void 0;
		this.url = void 0;
	}
};
VFileMessage.prototype.file = "";
VFileMessage.prototype.name = "";
VFileMessage.prototype.reason = "";
VFileMessage.prototype.message = "";
VFileMessage.prototype.stack = "";
VFileMessage.prototype.column = void 0;
VFileMessage.prototype.line = void 0;
VFileMessage.prototype.ancestors = void 0;
VFileMessage.prototype.cause = void 0;
VFileMessage.prototype.fatal = void 0;
VFileMessage.prototype.place = void 0;
VFileMessage.prototype.ruleId = void 0;
VFileMessage.prototype.source = void 0;
var import_cjs = /* @__PURE__ */ __toESM(require_cjs(), 1);
var own$3 = {}.hasOwnProperty;
var emptyMap = /* @__PURE__ */ new Map();
var cap = /[A-Z]/g;
var tableElements = new Set([
	"table",
	"tbody",
	"thead",
	"tfoot",
	"tr"
]);
var tableCellElement = new Set(["td", "th"]);
var docs = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function toJsxRuntime(tree, options) {
	if (!options || options.Fragment === void 0) throw new TypeError("Expected `Fragment` in options");
	const filePath = options.filePath || void 0;
	let create;
	if (options.development) {
		if (typeof options.jsxDEV !== "function") throw new TypeError("Expected `jsxDEV` in options when `development: true`");
		create = developmentCreate(filePath, options.jsxDEV);
	} else {
		if (typeof options.jsx !== "function") throw new TypeError("Expected `jsx` in production options");
		if (typeof options.jsxs !== "function") throw new TypeError("Expected `jsxs` in production options");
		create = productionCreate(filePath, options.jsx, options.jsxs);
	}
	const state = {
		Fragment: options.Fragment,
		ancestors: [],
		components: options.components || {},
		create,
		elementAttributeNameCase: options.elementAttributeNameCase || "react",
		evaluater: options.createEvaluater ? options.createEvaluater() : void 0,
		filePath,
		ignoreInvalidStyle: options.ignoreInvalidStyle || false,
		passKeys: options.passKeys !== false,
		passNode: options.passNode || false,
		schema: options.space === "svg" ? svg : html$2,
		stylePropertyNameCase: options.stylePropertyNameCase || "dom",
		tableCellAlignToStyle: options.tableCellAlignToStyle !== false
	};
	const result = one$1(state, tree, void 0);
	if (result && typeof result !== "string") return result;
	return state.create(tree, state.Fragment, { children: result || void 0 }, void 0);
}
function one$1(state, node$1, key) {
	if (node$1.type === "element") return element$1(state, node$1, key);
	if (node$1.type === "mdxFlowExpression" || node$1.type === "mdxTextExpression") return mdxExpression(state, node$1);
	if (node$1.type === "mdxJsxFlowElement" || node$1.type === "mdxJsxTextElement") return mdxJsxElement(state, node$1, key);
	if (node$1.type === "mdxjsEsm") return mdxEsm(state, node$1);
	if (node$1.type === "root") return root$2(state, node$1, key);
	if (node$1.type === "text") return text$5(state, node$1);
}
function element$1(state, node$1, key) {
	const parentSchema = state.schema;
	let schema = parentSchema;
	if (node$1.tagName.toLowerCase() === "svg" && parentSchema.space === "html") {
		schema = svg;
		state.schema = schema;
	}
	state.ancestors.push(node$1);
	const type = findComponentFromName(state, node$1.tagName, false);
	const props = createElementProps(state, node$1);
	let children = createChildren(state, node$1);
	if (tableElements.has(node$1.tagName)) children = children.filter(function(child) {
		return typeof child === "string" ? !whitespace(child) : true;
	});
	addNode(state, props, type, node$1);
	addChildren(props, children);
	state.ancestors.pop();
	state.schema = parentSchema;
	return state.create(node$1, type, props, key);
}
function mdxExpression(state, node$1) {
	if (node$1.data && node$1.data.estree && state.evaluater) {
		const expression = node$1.data.estree.body[0];
		expression.type;
		return state.evaluater.evaluateExpression(expression.expression);
	}
	crashEstree(state, node$1.position);
}
function mdxEsm(state, node$1) {
	if (node$1.data && node$1.data.estree && state.evaluater) return state.evaluater.evaluateProgram(node$1.data.estree);
	crashEstree(state, node$1.position);
}
function mdxJsxElement(state, node$1, key) {
	const parentSchema = state.schema;
	let schema = parentSchema;
	if (node$1.name === "svg" && parentSchema.space === "html") {
		schema = svg;
		state.schema = schema;
	}
	state.ancestors.push(node$1);
	const type = node$1.name === null ? state.Fragment : findComponentFromName(state, node$1.name, true);
	const props = createJsxElementProps(state, node$1);
	const children = createChildren(state, node$1);
	addNode(state, props, type, node$1);
	addChildren(props, children);
	state.ancestors.pop();
	state.schema = parentSchema;
	return state.create(node$1, type, props, key);
}
function root$2(state, node$1, key) {
	const props = {};
	addChildren(props, createChildren(state, node$1));
	return state.create(node$1, state.Fragment, props, key);
}
function text$5(_, node$1) {
	return node$1.value;
}
function addNode(state, props, type, node$1) {
	if (typeof type !== "string" && type !== state.Fragment && state.passNode) props.node = node$1;
}
function addChildren(props, children) {
	if (children.length > 0) {
		const value = children.length > 1 ? children : children[0];
		if (value) props.children = value;
	}
}
function productionCreate(_, jsx$1, jsxs$1) {
	return create;
	function create(_$1, type, props, key) {
		const fn = Array.isArray(props.children) ? jsxs$1 : jsx$1;
		return key ? fn(type, props, key) : fn(type, props);
	}
}
function developmentCreate(filePath, jsxDEV) {
	return create;
	function create(node$1, type, props, key) {
		const isStaticChildren = Array.isArray(props.children);
		const point$3 = pointStart(node$1);
		return jsxDEV(type, props, key, isStaticChildren, {
			columnNumber: point$3 ? point$3.column - 1 : void 0,
			fileName: filePath,
			lineNumber: point$3 ? point$3.line : void 0
		}, void 0);
	}
}
function createElementProps(state, node$1) {
	const props = {};
	let alignValue;
	let prop;
	for (prop in node$1.properties) if (prop !== "children" && own$3.call(node$1.properties, prop)) {
		const result = createProperty(state, prop, node$1.properties[prop]);
		if (result) {
			const [key, value] = result;
			if (state.tableCellAlignToStyle && key === "align" && typeof value === "string" && tableCellElement.has(node$1.tagName)) alignValue = value;
			else props[key] = value;
		}
	}
	if (alignValue) {
		const style = props.style || (props.style = {});
		style[state.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = alignValue;
	}
	return props;
}
function createJsxElementProps(state, node$1) {
	const props = {};
	for (const attribute of node$1.attributes) if (attribute.type === "mdxJsxExpressionAttribute") if (attribute.data && attribute.data.estree && state.evaluater) {
		const expression = attribute.data.estree.body[0];
		expression.type;
		const objectExpression = expression.expression;
		objectExpression.type;
		const property = objectExpression.properties[0];
		property.type;
		Object.assign(props, state.evaluater.evaluateExpression(property.argument));
	} else crashEstree(state, node$1.position);
	else {
		const name$1 = attribute.name;
		let value;
		if (attribute.value && typeof attribute.value === "object") if (attribute.value.data && attribute.value.data.estree && state.evaluater) {
			const expression = attribute.value.data.estree.body[0];
			expression.type;
			value = state.evaluater.evaluateExpression(expression.expression);
		} else crashEstree(state, node$1.position);
		else value = attribute.value === null ? true : attribute.value;
		props[name$1] = value;
	}
	return props;
}
function createChildren(state, node$1) {
	const children = [];
	let index$2 = -1;
	/* c8 ignore next */
	const countsByName = state.passKeys ? /* @__PURE__ */ new Map() : emptyMap;
	while (++index$2 < node$1.children.length) {
		const child = node$1.children[index$2];
		let key;
		if (state.passKeys) {
			const name$1 = child.type === "element" ? child.tagName : child.type === "mdxJsxFlowElement" || child.type === "mdxJsxTextElement" ? child.name : void 0;
			if (name$1) {
				const count = countsByName.get(name$1) || 0;
				key = name$1 + "-" + count;
				countsByName.set(name$1, count + 1);
			}
		}
		const result = one$1(state, child, key);
		if (result !== void 0) children.push(result);
	}
	return children;
}
function createProperty(state, prop, value) {
	const info = find(state.schema, prop);
	if (value === null || value === void 0 || typeof value === "number" && Number.isNaN(value)) return;
	if (Array.isArray(value)) value = info.commaSeparated ? stringify(value) : stringify$1(value);
	if (info.property === "style") {
		let styleObject = typeof value === "object" ? value : parseStyle(state, String(value));
		if (state.stylePropertyNameCase === "css") styleObject = transformStylesToCssCasing(styleObject);
		return ["style", styleObject];
	}
	return [state.elementAttributeNameCase === "react" && info.space ? hastToReact[info.property] || info.property : info.attribute, value];
}
function parseStyle(state, value) {
	try {
		return (0, import_cjs.default)(value, { reactCompat: true });
	} catch (error) {
		if (state.ignoreInvalidStyle) return {};
		const cause = error;
		const message = new VFileMessage("Cannot parse `style` attribute", {
			ancestors: state.ancestors,
			cause,
			ruleId: "style",
			source: "hast-util-to-jsx-runtime"
		});
		message.file = state.filePath || void 0;
		message.url = docs + "#cannot-parse-style-attribute";
		throw message;
	}
}
function findComponentFromName(state, name$1, allowExpression) {
	let result;
	if (!allowExpression) result = {
		type: "Literal",
		value: name$1
	};
	else if (name$1.includes(".")) {
		const identifiers = name$1.split(".");
		let index$2 = -1;
		let node$1;
		while (++index$2 < identifiers.length) {
			const prop = name(identifiers[index$2]) ? {
				type: "Identifier",
				name: identifiers[index$2]
			} : {
				type: "Literal",
				value: identifiers[index$2]
			};
			node$1 = node$1 ? {
				type: "MemberExpression",
				object: node$1,
				property: prop,
				computed: Boolean(index$2 && prop.type === "Literal"),
				optional: false
			} : prop;
		}
		result = node$1;
	} else result = name(name$1) && !/^[a-z]/.test(name$1) ? {
		type: "Identifier",
		name: name$1
	} : {
		type: "Literal",
		value: name$1
	};
	if (result.type === "Literal") {
		const name$2 = result.value;
		return own$3.call(state.components, name$2) ? state.components[name$2] : name$2;
	}
	if (state.evaluater) return state.evaluater.evaluateExpression(result);
	crashEstree(state);
}
function crashEstree(state, place) {
	const message = new VFileMessage("Cannot handle MDX estrees without `createEvaluater`", {
		ancestors: state.ancestors,
		place,
		ruleId: "mdx-estree",
		source: "hast-util-to-jsx-runtime"
	});
	message.file = state.filePath || void 0;
	message.url = docs + "#cannot-handle-mdx-estrees-without-createevaluater";
	throw message;
}
function transformStylesToCssCasing(domCasing) {
	const cssCasing = {};
	let from;
	for (from in domCasing) if (own$3.call(domCasing, from)) cssCasing[transformStyleToCssCasing(from)] = domCasing[from];
	return cssCasing;
}
function transformStyleToCssCasing(from) {
	let to = from.replace(cap, toDash);
	if (to.slice(0, 3) === "ms-") to = "-" + to;
	return to;
}
function toDash($0) {
	return "-" + $0.toLowerCase();
}
const urlAttributes = {
	action: ["form"],
	cite: [
		"blockquote",
		"del",
		"ins",
		"q"
	],
	data: ["object"],
	formAction: ["button", "input"],
	href: [
		"a",
		"area",
		"base",
		"link"
	],
	icon: ["menuitem"],
	itemId: null,
	manifest: ["html"],
	ping: ["a", "area"],
	poster: ["video"],
	src: [
		"audio",
		"embed",
		"iframe",
		"img",
		"input",
		"script",
		"source",
		"track",
		"video"
	]
};
var emptyOptions$2 = {};
function toString(value, options) {
	const settings = options || emptyOptions$2;
	return one(value, typeof settings.includeImageAlt === "boolean" ? settings.includeImageAlt : true, typeof settings.includeHtml === "boolean" ? settings.includeHtml : true);
}
function one(value, includeImageAlt, includeHtml) {
	if (node(value)) {
		if ("value" in value) return value.type === "html" && !includeHtml ? "" : value.value;
		if (includeImageAlt && "alt" in value && value.alt) return value.alt;
		if ("children" in value) return all(value.children, includeImageAlt, includeHtml);
	}
	if (Array.isArray(value)) return all(value, includeImageAlt, includeHtml);
	return "";
}
function all(values, includeImageAlt, includeHtml) {
	const result = [];
	let index$2 = -1;
	while (++index$2 < values.length) result[index$2] = one(values[index$2], includeImageAlt, includeHtml);
	return result.join("");
}
function node(value) {
	return Boolean(value && typeof value === "object");
}
var element = document.createElement("i");
function decodeNamedCharacterReference(value) {
	const characterReference$1 = "&" + value + ";";
	element.innerHTML = characterReference$1;
	const character = element.textContent;
	if (character.charCodeAt(character.length - 1) === 59 && value !== "semi") return false;
	return character === characterReference$1 ? false : character;
}
function splice(list$3, start, remove, items) {
	const end = list$3.length;
	let chunkStart = 0;
	let parameters;
	if (start < 0) start = -start > end ? 0 : end + start;
	else start = start > end ? end : start;
	remove = remove > 0 ? remove : 0;
	if (items.length < 1e4) {
		parameters = Array.from(items);
		parameters.unshift(start, remove);
		list$3.splice(...parameters);
	} else {
		if (remove) list$3.splice(start, remove);
		while (chunkStart < items.length) {
			parameters = items.slice(chunkStart, chunkStart + 1e4);
			parameters.unshift(start, 0);
			list$3.splice(...parameters);
			chunkStart += 1e4;
			start += 1e4;
		}
	}
}
function push(list$3, items) {
	if (list$3.length > 0) {
		splice(list$3, list$3.length, 0, items);
		return list$3;
	}
	return items;
}
var hasOwnProperty = {}.hasOwnProperty;
function combineExtensions(extensions) {
	const all$1 = {};
	let index$2 = -1;
	while (++index$2 < extensions.length) syntaxExtension(all$1, extensions[index$2]);
	return all$1;
}
function syntaxExtension(all$1, extension$1) {
	let hook;
	for (hook in extension$1) {
		const left = (hasOwnProperty.call(all$1, hook) ? all$1[hook] : void 0) || (all$1[hook] = {});
		const right = extension$1[hook];
		let code$3;
		if (right) for (code$3 in right) {
			if (!hasOwnProperty.call(left, code$3)) left[code$3] = [];
			const value = right[code$3];
			constructs(left[code$3], Array.isArray(value) ? value : value ? [value] : []);
		}
	}
}
function constructs(existing, list$3) {
	let index$2 = -1;
	const before = [];
	while (++index$2 < list$3.length) (list$3[index$2].add === "after" ? existing : before).push(list$3[index$2]);
	splice(existing, 0, 0, before);
}
function decodeNumericCharacterReference(value, base) {
	const code$3 = Number.parseInt(value, base);
	if (code$3 < 9 || code$3 === 11 || code$3 > 13 && code$3 < 32 || code$3 > 126 && code$3 < 160 || code$3 > 55295 && code$3 < 57344 || code$3 > 64975 && code$3 < 65008 || (code$3 & 65535) === 65535 || (code$3 & 65535) === 65534 || code$3 > 1114111) return "�";
	return String.fromCodePoint(code$3);
}
function normalizeIdentifier(value) {
	return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const asciiAlpha = regexCheck(/[A-Za-z]/);
const asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
const asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
function asciiControl(code$3) {
	return code$3 !== null && (code$3 < 32 || code$3 === 127);
}
const asciiDigit = regexCheck(/\d/);
const asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
const asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
function markdownLineEnding(code$3) {
	return code$3 !== null && code$3 < -2;
}
function markdownLineEndingOrSpace(code$3) {
	return code$3 !== null && (code$3 < 0 || code$3 === 32);
}
function markdownSpace(code$3) {
	return code$3 === -2 || code$3 === -1 || code$3 === 32;
}
const unicodePunctuation = regexCheck(/\p{P}|\p{S}/u);
const unicodeWhitespace = regexCheck(/\s/);
function regexCheck(regex) {
	return check;
	function check(code$3) {
		return code$3 !== null && code$3 > -1 && regex.test(String.fromCharCode(code$3));
	}
}
function normalizeUri(value) {
	const result = [];
	let index$2 = -1;
	let start = 0;
	let skip = 0;
	while (++index$2 < value.length) {
		const code$3 = value.charCodeAt(index$2);
		let replace$1 = "";
		if (code$3 === 37 && asciiAlphanumeric(value.charCodeAt(index$2 + 1)) && asciiAlphanumeric(value.charCodeAt(index$2 + 2))) skip = 2;
		else if (code$3 < 128) {
			if (!/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(code$3))) replace$1 = String.fromCharCode(code$3);
		} else if (code$3 > 55295 && code$3 < 57344) {
			const next = value.charCodeAt(index$2 + 1);
			if (code$3 < 56320 && next > 56319 && next < 57344) {
				replace$1 = String.fromCharCode(code$3, next);
				skip = 1;
			} else replace$1 = "�";
		} else replace$1 = String.fromCharCode(code$3);
		if (replace$1) {
			result.push(value.slice(start, index$2), encodeURIComponent(replace$1));
			start = index$2 + skip + 1;
			replace$1 = "";
		}
		if (skip) {
			index$2 += skip;
			skip = 0;
		}
	}
	return result.join("") + value.slice(start);
}
function factorySpace(effects, ok$2, type, max) {
	const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
	let size = 0;
	return start;
	function start(code$3) {
		if (markdownSpace(code$3)) {
			effects.enter(type);
			return prefix(code$3);
		}
		return ok$2(code$3);
	}
	function prefix(code$3) {
		if (markdownSpace(code$3) && size++ < limit) {
			effects.consume(code$3);
			return prefix;
		}
		effects.exit(type);
		return ok$2(code$3);
	}
}
const content = { tokenize: initializeContent };
function initializeContent(effects) {
	const contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
	let previous$2;
	return contentStart;
	function afterContentStartConstruct(code$3) {
		if (code$3 === null) {
			effects.consume(code$3);
			return;
		}
		effects.enter("lineEnding");
		effects.consume(code$3);
		effects.exit("lineEnding");
		return factorySpace(effects, contentStart, "linePrefix");
	}
	function paragraphInitial(code$3) {
		effects.enter("paragraph");
		return lineStart(code$3);
	}
	function lineStart(code$3) {
		const token = effects.enter("chunkText", {
			contentType: "text",
			previous: previous$2
		});
		if (previous$2) previous$2.next = token;
		previous$2 = token;
		return data(code$3);
	}
	function data(code$3) {
		if (code$3 === null) {
			effects.exit("chunkText");
			effects.exit("paragraph");
			effects.consume(code$3);
			return;
		}
		if (markdownLineEnding(code$3)) {
			effects.consume(code$3);
			effects.exit("chunkText");
			return lineStart;
		}
		effects.consume(code$3);
		return data;
	}
}
const document$1 = { tokenize: initializeDocument };
var containerConstruct = { tokenize: tokenizeContainer };
function initializeDocument(effects) {
	const self$1 = this;
	const stack = [];
	let continued = 0;
	let childFlow;
	let childToken;
	let lineStartOffset;
	return start;
	function start(code$3) {
		if (continued < stack.length) {
			const item = stack[continued];
			self$1.containerState = item[1];
			return effects.attempt(item[0].continuation, documentContinue, checkNewContainers)(code$3);
		}
		return checkNewContainers(code$3);
	}
	function documentContinue(code$3) {
		continued++;
		if (self$1.containerState._closeFlow) {
			self$1.containerState._closeFlow = void 0;
			if (childFlow) closeFlow();
			const indexBeforeExits = self$1.events.length;
			let indexBeforeFlow = indexBeforeExits;
			let point$3;
			while (indexBeforeFlow--) if (self$1.events[indexBeforeFlow][0] === "exit" && self$1.events[indexBeforeFlow][1].type === "chunkFlow") {
				point$3 = self$1.events[indexBeforeFlow][1].end;
				break;
			}
			exitContainers(continued);
			let index$2 = indexBeforeExits;
			while (index$2 < self$1.events.length) {
				self$1.events[index$2][1].end = { ...point$3 };
				index$2++;
			}
			splice(self$1.events, indexBeforeFlow + 1, 0, self$1.events.slice(indexBeforeExits));
			self$1.events.length = index$2;
			return checkNewContainers(code$3);
		}
		return start(code$3);
	}
	function checkNewContainers(code$3) {
		if (continued === stack.length) {
			if (!childFlow) return documentContinued(code$3);
			if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) return flowStart(code$3);
			self$1.interrupt = Boolean(childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack);
		}
		self$1.containerState = {};
		return effects.check(containerConstruct, thereIsANewContainer, thereIsNoNewContainer)(code$3);
	}
	function thereIsANewContainer(code$3) {
		if (childFlow) closeFlow();
		exitContainers(continued);
		return documentContinued(code$3);
	}
	function thereIsNoNewContainer(code$3) {
		self$1.parser.lazy[self$1.now().line] = continued !== stack.length;
		lineStartOffset = self$1.now().offset;
		return flowStart(code$3);
	}
	function documentContinued(code$3) {
		self$1.containerState = {};
		return effects.attempt(containerConstruct, containerContinue, flowStart)(code$3);
	}
	function containerContinue(code$3) {
		continued++;
		stack.push([self$1.currentConstruct, self$1.containerState]);
		return documentContinued(code$3);
	}
	function flowStart(code$3) {
		if (code$3 === null) {
			if (childFlow) closeFlow();
			exitContainers(0);
			effects.consume(code$3);
			return;
		}
		childFlow = childFlow || self$1.parser.flow(self$1.now());
		effects.enter("chunkFlow", {
			_tokenizer: childFlow,
			contentType: "flow",
			previous: childToken
		});
		return flowContinue(code$3);
	}
	function flowContinue(code$3) {
		if (code$3 === null) {
			writeToChild(effects.exit("chunkFlow"), true);
			exitContainers(0);
			effects.consume(code$3);
			return;
		}
		if (markdownLineEnding(code$3)) {
			effects.consume(code$3);
			writeToChild(effects.exit("chunkFlow"));
			continued = 0;
			self$1.interrupt = void 0;
			return start;
		}
		effects.consume(code$3);
		return flowContinue;
	}
	function writeToChild(token, endOfFile) {
		const stream = self$1.sliceStream(token);
		if (endOfFile) stream.push(null);
		token.previous = childToken;
		if (childToken) childToken.next = token;
		childToken = token;
		childFlow.defineSkip(token.start);
		childFlow.write(stream);
		if (self$1.parser.lazy[token.start.line]) {
			let index$2 = childFlow.events.length;
			while (index$2--) if (childFlow.events[index$2][1].start.offset < lineStartOffset && (!childFlow.events[index$2][1].end || childFlow.events[index$2][1].end.offset > lineStartOffset)) return;
			const indexBeforeExits = self$1.events.length;
			let indexBeforeFlow = indexBeforeExits;
			let seen;
			let point$3;
			while (indexBeforeFlow--) if (self$1.events[indexBeforeFlow][0] === "exit" && self$1.events[indexBeforeFlow][1].type === "chunkFlow") {
				if (seen) {
					point$3 = self$1.events[indexBeforeFlow][1].end;
					break;
				}
				seen = true;
			}
			exitContainers(continued);
			index$2 = indexBeforeExits;
			while (index$2 < self$1.events.length) {
				self$1.events[index$2][1].end = { ...point$3 };
				index$2++;
			}
			splice(self$1.events, indexBeforeFlow + 1, 0, self$1.events.slice(indexBeforeExits));
			self$1.events.length = index$2;
		}
	}
	function exitContainers(size) {
		let index$2 = stack.length;
		while (index$2-- > size) {
			const entry = stack[index$2];
			self$1.containerState = entry[1];
			entry[0].exit.call(self$1, effects);
		}
		stack.length = size;
	}
	function closeFlow() {
		childFlow.write([null]);
		childToken = void 0;
		childFlow = void 0;
		self$1.containerState._closeFlow = void 0;
	}
}
function tokenizeContainer(effects, ok$2, nok) {
	return factorySpace(effects, effects.attempt(this.parser.constructs.document, ok$2, nok), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function classifyCharacter(code$3) {
	if (code$3 === null || markdownLineEndingOrSpace(code$3) || unicodeWhitespace(code$3)) return 1;
	if (unicodePunctuation(code$3)) return 2;
}
function resolveAll(constructs$1, events, context) {
	const called = [];
	let index$2 = -1;
	while (++index$2 < constructs$1.length) {
		const resolve = constructs$1[index$2].resolveAll;
		if (resolve && !called.includes(resolve)) {
			events = resolve(events, context);
			called.push(resolve);
		}
	}
	return events;
}
const attention = {
	name: "attention",
	resolveAll: resolveAllAttention,
	tokenize: tokenizeAttention
};
function resolveAllAttention(events, context) {
	let index$2 = -1;
	let open;
	let group;
	let text$6;
	let openingSequence;
	let closingSequence;
	let use;
	let nextEvents;
	let offset;
	while (++index$2 < events.length) if (events[index$2][0] === "enter" && events[index$2][1].type === "attentionSequence" && events[index$2][1]._close) {
		open = index$2;
		while (open--) if (events[open][0] === "exit" && events[open][1].type === "attentionSequence" && events[open][1]._open && context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index$2][1]).charCodeAt(0)) {
			if ((events[open][1]._close || events[index$2][1]._open) && (events[index$2][1].end.offset - events[index$2][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index$2][1].end.offset - events[index$2][1].start.offset) % 3)) continue;
			use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index$2][1].end.offset - events[index$2][1].start.offset > 1 ? 2 : 1;
			const start = { ...events[open][1].end };
			const end = { ...events[index$2][1].start };
			movePoint(start, -use);
			movePoint(end, use);
			openingSequence = {
				type: use > 1 ? "strongSequence" : "emphasisSequence",
				start,
				end: { ...events[open][1].end }
			};
			closingSequence = {
				type: use > 1 ? "strongSequence" : "emphasisSequence",
				start: { ...events[index$2][1].start },
				end
			};
			text$6 = {
				type: use > 1 ? "strongText" : "emphasisText",
				start: { ...events[open][1].end },
				end: { ...events[index$2][1].start }
			};
			group = {
				type: use > 1 ? "strong" : "emphasis",
				start: { ...openingSequence.start },
				end: { ...closingSequence.end }
			};
			events[open][1].end = { ...openingSequence.start };
			events[index$2][1].start = { ...closingSequence.end };
			nextEvents = [];
			if (events[open][1].end.offset - events[open][1].start.offset) nextEvents = push(nextEvents, [[
				"enter",
				events[open][1],
				context
			], [
				"exit",
				events[open][1],
				context
			]]);
			nextEvents = push(nextEvents, [
				[
					"enter",
					group,
					context
				],
				[
					"enter",
					openingSequence,
					context
				],
				[
					"exit",
					openingSequence,
					context
				],
				[
					"enter",
					text$6,
					context
				]
			]);
			nextEvents = push(nextEvents, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + 1, index$2), context));
			nextEvents = push(nextEvents, [
				[
					"exit",
					text$6,
					context
				],
				[
					"enter",
					closingSequence,
					context
				],
				[
					"exit",
					closingSequence,
					context
				],
				[
					"exit",
					group,
					context
				]
			]);
			if (events[index$2][1].end.offset - events[index$2][1].start.offset) {
				offset = 2;
				nextEvents = push(nextEvents, [[
					"enter",
					events[index$2][1],
					context
				], [
					"exit",
					events[index$2][1],
					context
				]]);
			} else offset = 0;
			splice(events, open - 1, index$2 - open + 3, nextEvents);
			index$2 = open + nextEvents.length - offset - 2;
			break;
		}
	}
	index$2 = -1;
	while (++index$2 < events.length) if (events[index$2][1].type === "attentionSequence") events[index$2][1].type = "data";
	return events;
}
function tokenizeAttention(effects, ok$2) {
	const attentionMarkers$1 = this.parser.constructs.attentionMarkers.null;
	const previous$2 = this.previous;
	const before = classifyCharacter(previous$2);
	let marker;
	return start;
	function start(code$3) {
		marker = code$3;
		effects.enter("attentionSequence");
		return inside(code$3);
	}
	function inside(code$3) {
		if (code$3 === marker) {
			effects.consume(code$3);
			return inside;
		}
		const token = effects.exit("attentionSequence");
		const after = classifyCharacter(code$3);
		const open = !after || after === 2 && before || attentionMarkers$1.includes(code$3);
		const close = !before || before === 2 && after || attentionMarkers$1.includes(previous$2);
		token._open = Boolean(marker === 42 ? open : open && (before || !close));
		token._close = Boolean(marker === 42 ? close : close && (after || !open));
		return ok$2(code$3);
	}
}
function movePoint(point$3, offset) {
	point$3.column += offset;
	point$3.offset += offset;
	point$3._bufferIndex += offset;
}
const autolink = {
	name: "autolink",
	tokenize: tokenizeAutolink
};
function tokenizeAutolink(effects, ok$2, nok) {
	let size = 0;
	return start;
	function start(code$3) {
		effects.enter("autolink");
		effects.enter("autolinkMarker");
		effects.consume(code$3);
		effects.exit("autolinkMarker");
		effects.enter("autolinkProtocol");
		return open;
	}
	function open(code$3) {
		if (asciiAlpha(code$3)) {
			effects.consume(code$3);
			return schemeOrEmailAtext;
		}
		if (code$3 === 64) return nok(code$3);
		return emailAtext(code$3);
	}
	function schemeOrEmailAtext(code$3) {
		if (code$3 === 43 || code$3 === 45 || code$3 === 46 || asciiAlphanumeric(code$3)) {
			size = 1;
			return schemeInsideOrEmailAtext(code$3);
		}
		return emailAtext(code$3);
	}
	function schemeInsideOrEmailAtext(code$3) {
		if (code$3 === 58) {
			effects.consume(code$3);
			size = 0;
			return urlInside;
		}
		if ((code$3 === 43 || code$3 === 45 || code$3 === 46 || asciiAlphanumeric(code$3)) && size++ < 32) {
			effects.consume(code$3);
			return schemeInsideOrEmailAtext;
		}
		size = 0;
		return emailAtext(code$3);
	}
	function urlInside(code$3) {
		if (code$3 === 62) {
			effects.exit("autolinkProtocol");
			effects.enter("autolinkMarker");
			effects.consume(code$3);
			effects.exit("autolinkMarker");
			effects.exit("autolink");
			return ok$2;
		}
		if (code$3 === null || code$3 === 32 || code$3 === 60 || asciiControl(code$3)) return nok(code$3);
		effects.consume(code$3);
		return urlInside;
	}
	function emailAtext(code$3) {
		if (code$3 === 64) {
			effects.consume(code$3);
			return emailAtSignOrDot;
		}
		if (asciiAtext(code$3)) {
			effects.consume(code$3);
			return emailAtext;
		}
		return nok(code$3);
	}
	function emailAtSignOrDot(code$3) {
		return asciiAlphanumeric(code$3) ? emailLabel(code$3) : nok(code$3);
	}
	function emailLabel(code$3) {
		if (code$3 === 46) {
			effects.consume(code$3);
			size = 0;
			return emailAtSignOrDot;
		}
		if (code$3 === 62) {
			effects.exit("autolinkProtocol").type = "autolinkEmail";
			effects.enter("autolinkMarker");
			effects.consume(code$3);
			effects.exit("autolinkMarker");
			effects.exit("autolink");
			return ok$2;
		}
		return emailValue(code$3);
	}
	function emailValue(code$3) {
		if ((code$3 === 45 || asciiAlphanumeric(code$3)) && size++ < 63) {
			const next = code$3 === 45 ? emailValue : emailLabel;
			effects.consume(code$3);
			return next;
		}
		return nok(code$3);
	}
}
const blankLine = {
	partial: true,
	tokenize: tokenizeBlankLine
};
function tokenizeBlankLine(effects, ok$2, nok) {
	return start;
	function start(code$3) {
		return markdownSpace(code$3) ? factorySpace(effects, after, "linePrefix")(code$3) : after(code$3);
	}
	function after(code$3) {
		return code$3 === null || markdownLineEnding(code$3) ? ok$2(code$3) : nok(code$3);
	}
}
const blockQuote = {
	continuation: { tokenize: tokenizeBlockQuoteContinuation },
	exit: exit$1,
	name: "blockQuote",
	tokenize: tokenizeBlockQuoteStart
};
function tokenizeBlockQuoteStart(effects, ok$2, nok) {
	const self$1 = this;
	return start;
	function start(code$3) {
		if (code$3 === 62) {
			const state = self$1.containerState;
			if (!state.open) {
				effects.enter("blockQuote", { _container: true });
				state.open = true;
			}
			effects.enter("blockQuotePrefix");
			effects.enter("blockQuoteMarker");
			effects.consume(code$3);
			effects.exit("blockQuoteMarker");
			return after;
		}
		return nok(code$3);
	}
	function after(code$3) {
		if (markdownSpace(code$3)) {
			effects.enter("blockQuotePrefixWhitespace");
			effects.consume(code$3);
			effects.exit("blockQuotePrefixWhitespace");
			effects.exit("blockQuotePrefix");
			return ok$2;
		}
		effects.exit("blockQuotePrefix");
		return ok$2(code$3);
	}
}
function tokenizeBlockQuoteContinuation(effects, ok$2, nok) {
	const self$1 = this;
	return contStart;
	function contStart(code$3) {
		if (markdownSpace(code$3)) return factorySpace(effects, contBefore, "linePrefix", self$1.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code$3);
		return contBefore(code$3);
	}
	function contBefore(code$3) {
		return effects.attempt(blockQuote, ok$2, nok)(code$3);
	}
}
function exit$1(effects) {
	effects.exit("blockQuote");
}
const characterEscape = {
	name: "characterEscape",
	tokenize: tokenizeCharacterEscape
};
function tokenizeCharacterEscape(effects, ok$2, nok) {
	return start;
	function start(code$3) {
		effects.enter("characterEscape");
		effects.enter("escapeMarker");
		effects.consume(code$3);
		effects.exit("escapeMarker");
		return inside;
	}
	function inside(code$3) {
		if (asciiPunctuation(code$3)) {
			effects.enter("characterEscapeValue");
			effects.consume(code$3);
			effects.exit("characterEscapeValue");
			effects.exit("characterEscape");
			return ok$2;
		}
		return nok(code$3);
	}
}
const characterReference = {
	name: "characterReference",
	tokenize: tokenizeCharacterReference
};
function tokenizeCharacterReference(effects, ok$2, nok) {
	const self$1 = this;
	let size = 0;
	let max;
	let test;
	return start;
	function start(code$3) {
		effects.enter("characterReference");
		effects.enter("characterReferenceMarker");
		effects.consume(code$3);
		effects.exit("characterReferenceMarker");
		return open;
	}
	function open(code$3) {
		if (code$3 === 35) {
			effects.enter("characterReferenceMarkerNumeric");
			effects.consume(code$3);
			effects.exit("characterReferenceMarkerNumeric");
			return numeric;
		}
		effects.enter("characterReferenceValue");
		max = 31;
		test = asciiAlphanumeric;
		return value(code$3);
	}
	function numeric(code$3) {
		if (code$3 === 88 || code$3 === 120) {
			effects.enter("characterReferenceMarkerHexadecimal");
			effects.consume(code$3);
			effects.exit("characterReferenceMarkerHexadecimal");
			effects.enter("characterReferenceValue");
			max = 6;
			test = asciiHexDigit;
			return value;
		}
		effects.enter("characterReferenceValue");
		max = 7;
		test = asciiDigit;
		return value(code$3);
	}
	function value(code$3) {
		if (code$3 === 59 && size) {
			const token = effects.exit("characterReferenceValue");
			if (test === asciiAlphanumeric && !decodeNamedCharacterReference(self$1.sliceSerialize(token))) return nok(code$3);
			effects.enter("characterReferenceMarker");
			effects.consume(code$3);
			effects.exit("characterReferenceMarker");
			effects.exit("characterReference");
			return ok$2;
		}
		if (test(code$3) && size++ < max) {
			effects.consume(code$3);
			return value;
		}
		return nok(code$3);
	}
}
var nonLazyContinuation = {
	partial: true,
	tokenize: tokenizeNonLazyContinuation
};
const codeFenced = {
	concrete: true,
	name: "codeFenced",
	tokenize: tokenizeCodeFenced
};
function tokenizeCodeFenced(effects, ok$2, nok) {
	const self$1 = this;
	const closeStart = {
		partial: true,
		tokenize: tokenizeCloseStart
	};
	let initialPrefix = 0;
	let sizeOpen = 0;
	let marker;
	return start;
	function start(code$3) {
		return beforeSequenceOpen(code$3);
	}
	function beforeSequenceOpen(code$3) {
		const tail = self$1.events[self$1.events.length - 1];
		initialPrefix = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
		marker = code$3;
		effects.enter("codeFenced");
		effects.enter("codeFencedFence");
		effects.enter("codeFencedFenceSequence");
		return sequenceOpen(code$3);
	}
	function sequenceOpen(code$3) {
		if (code$3 === marker) {
			sizeOpen++;
			effects.consume(code$3);
			return sequenceOpen;
		}
		if (sizeOpen < 3) return nok(code$3);
		effects.exit("codeFencedFenceSequence");
		return markdownSpace(code$3) ? factorySpace(effects, infoBefore, "whitespace")(code$3) : infoBefore(code$3);
	}
	function infoBefore(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("codeFencedFence");
			return self$1.interrupt ? ok$2(code$3) : effects.check(nonLazyContinuation, atNonLazyBreak, after)(code$3);
		}
		effects.enter("codeFencedFenceInfo");
		effects.enter("chunkString", { contentType: "string" });
		return info(code$3);
	}
	function info(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("chunkString");
			effects.exit("codeFencedFenceInfo");
			return infoBefore(code$3);
		}
		if (markdownSpace(code$3)) {
			effects.exit("chunkString");
			effects.exit("codeFencedFenceInfo");
			return factorySpace(effects, metaBefore, "whitespace")(code$3);
		}
		if (code$3 === 96 && code$3 === marker) return nok(code$3);
		effects.consume(code$3);
		return info;
	}
	function metaBefore(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) return infoBefore(code$3);
		effects.enter("codeFencedFenceMeta");
		effects.enter("chunkString", { contentType: "string" });
		return meta(code$3);
	}
	function meta(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("chunkString");
			effects.exit("codeFencedFenceMeta");
			return infoBefore(code$3);
		}
		if (code$3 === 96 && code$3 === marker) return nok(code$3);
		effects.consume(code$3);
		return meta;
	}
	function atNonLazyBreak(code$3) {
		return effects.attempt(closeStart, after, contentBefore)(code$3);
	}
	function contentBefore(code$3) {
		effects.enter("lineEnding");
		effects.consume(code$3);
		effects.exit("lineEnding");
		return contentStart;
	}
	function contentStart(code$3) {
		return initialPrefix > 0 && markdownSpace(code$3) ? factorySpace(effects, beforeContentChunk, "linePrefix", initialPrefix + 1)(code$3) : beforeContentChunk(code$3);
	}
	function beforeContentChunk(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) return effects.check(nonLazyContinuation, atNonLazyBreak, after)(code$3);
		effects.enter("codeFlowValue");
		return contentChunk(code$3);
	}
	function contentChunk(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("codeFlowValue");
			return beforeContentChunk(code$3);
		}
		effects.consume(code$3);
		return contentChunk;
	}
	function after(code$3) {
		effects.exit("codeFenced");
		return ok$2(code$3);
	}
	function tokenizeCloseStart(effects$1, ok$3, nok$1) {
		let size = 0;
		return startBefore;
		function startBefore(code$3) {
			effects$1.enter("lineEnding");
			effects$1.consume(code$3);
			effects$1.exit("lineEnding");
			return start$1;
		}
		function start$1(code$3) {
			effects$1.enter("codeFencedFence");
			return markdownSpace(code$3) ? factorySpace(effects$1, beforeSequenceClose, "linePrefix", self$1.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code$3) : beforeSequenceClose(code$3);
		}
		function beforeSequenceClose(code$3) {
			if (code$3 === marker) {
				effects$1.enter("codeFencedFenceSequence");
				return sequenceClose(code$3);
			}
			return nok$1(code$3);
		}
		function sequenceClose(code$3) {
			if (code$3 === marker) {
				size++;
				effects$1.consume(code$3);
				return sequenceClose;
			}
			if (size >= sizeOpen) {
				effects$1.exit("codeFencedFenceSequence");
				return markdownSpace(code$3) ? factorySpace(effects$1, sequenceCloseAfter, "whitespace")(code$3) : sequenceCloseAfter(code$3);
			}
			return nok$1(code$3);
		}
		function sequenceCloseAfter(code$3) {
			if (code$3 === null || markdownLineEnding(code$3)) {
				effects$1.exit("codeFencedFence");
				return ok$3(code$3);
			}
			return nok$1(code$3);
		}
	}
}
function tokenizeNonLazyContinuation(effects, ok$2, nok) {
	const self$1 = this;
	return start;
	function start(code$3) {
		if (code$3 === null) return nok(code$3);
		effects.enter("lineEnding");
		effects.consume(code$3);
		effects.exit("lineEnding");
		return lineStart;
	}
	function lineStart(code$3) {
		return self$1.parser.lazy[self$1.now().line] ? nok(code$3) : ok$2(code$3);
	}
}
const codeIndented = {
	name: "codeIndented",
	tokenize: tokenizeCodeIndented
};
var furtherStart = {
	partial: true,
	tokenize: tokenizeFurtherStart
};
function tokenizeCodeIndented(effects, ok$2, nok) {
	const self$1 = this;
	return start;
	function start(code$3) {
		effects.enter("codeIndented");
		return factorySpace(effects, afterPrefix, "linePrefix", 5)(code$3);
	}
	function afterPrefix(code$3) {
		const tail = self$1.events[self$1.events.length - 1];
		return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? atBreak(code$3) : nok(code$3);
	}
	function atBreak(code$3) {
		if (code$3 === null) return after(code$3);
		if (markdownLineEnding(code$3)) return effects.attempt(furtherStart, atBreak, after)(code$3);
		effects.enter("codeFlowValue");
		return inside(code$3);
	}
	function inside(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("codeFlowValue");
			return atBreak(code$3);
		}
		effects.consume(code$3);
		return inside;
	}
	function after(code$3) {
		effects.exit("codeIndented");
		return ok$2(code$3);
	}
}
function tokenizeFurtherStart(effects, ok$2, nok) {
	const self$1 = this;
	return furtherStart$1;
	function furtherStart$1(code$3) {
		if (self$1.parser.lazy[self$1.now().line]) return nok(code$3);
		if (markdownLineEnding(code$3)) {
			effects.enter("lineEnding");
			effects.consume(code$3);
			effects.exit("lineEnding");
			return furtherStart$1;
		}
		return factorySpace(effects, afterPrefix, "linePrefix", 5)(code$3);
	}
	function afterPrefix(code$3) {
		const tail = self$1.events[self$1.events.length - 1];
		return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? ok$2(code$3) : markdownLineEnding(code$3) ? furtherStart$1(code$3) : nok(code$3);
	}
}
const codeText = {
	name: "codeText",
	previous: previous$1,
	resolve: resolveCodeText,
	tokenize: tokenizeCodeText
};
function resolveCodeText(events) {
	let tailExitIndex = events.length - 4;
	let headEnterIndex = 3;
	let index$2;
	let enter;
	if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
		index$2 = headEnterIndex;
		while (++index$2 < tailExitIndex) if (events[index$2][1].type === "codeTextData") {
			events[headEnterIndex][1].type = "codeTextPadding";
			events[tailExitIndex][1].type = "codeTextPadding";
			headEnterIndex += 2;
			tailExitIndex -= 2;
			break;
		}
	}
	index$2 = headEnterIndex - 1;
	tailExitIndex++;
	while (++index$2 <= tailExitIndex) if (enter === void 0) {
		if (index$2 !== tailExitIndex && events[index$2][1].type !== "lineEnding") enter = index$2;
	} else if (index$2 === tailExitIndex || events[index$2][1].type === "lineEnding") {
		events[enter][1].type = "codeTextData";
		if (index$2 !== enter + 2) {
			events[enter][1].end = events[index$2 - 1][1].end;
			events.splice(enter + 2, index$2 - enter - 2);
			tailExitIndex -= index$2 - enter - 2;
			index$2 = enter + 2;
		}
		enter = void 0;
	}
	return events;
}
function previous$1(code$3) {
	return code$3 !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function tokenizeCodeText(effects, ok$2, nok) {
	let sizeOpen = 0;
	let size;
	let token;
	return start;
	function start(code$3) {
		effects.enter("codeText");
		effects.enter("codeTextSequence");
		return sequenceOpen(code$3);
	}
	function sequenceOpen(code$3) {
		if (code$3 === 96) {
			effects.consume(code$3);
			sizeOpen++;
			return sequenceOpen;
		}
		effects.exit("codeTextSequence");
		return between(code$3);
	}
	function between(code$3) {
		if (code$3 === null) return nok(code$3);
		if (code$3 === 32) {
			effects.enter("space");
			effects.consume(code$3);
			effects.exit("space");
			return between;
		}
		if (code$3 === 96) {
			token = effects.enter("codeTextSequence");
			size = 0;
			return sequenceClose(code$3);
		}
		if (markdownLineEnding(code$3)) {
			effects.enter("lineEnding");
			effects.consume(code$3);
			effects.exit("lineEnding");
			return between;
		}
		effects.enter("codeTextData");
		return data(code$3);
	}
	function data(code$3) {
		if (code$3 === null || code$3 === 32 || code$3 === 96 || markdownLineEnding(code$3)) {
			effects.exit("codeTextData");
			return between(code$3);
		}
		effects.consume(code$3);
		return data;
	}
	function sequenceClose(code$3) {
		if (code$3 === 96) {
			effects.consume(code$3);
			size++;
			return sequenceClose;
		}
		if (size === sizeOpen) {
			effects.exit("codeTextSequence");
			effects.exit("codeText");
			return ok$2(code$3);
		}
		token.type = "codeTextData";
		return data(code$3);
	}
}
var SpliceBuffer = class {
	constructor(initial) {
		this.left = initial ? [...initial] : [];
		this.right = [];
	}
	get(index$2) {
		if (index$2 < 0 || index$2 >= this.left.length + this.right.length) throw new RangeError("Cannot access index `" + index$2 + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
		if (index$2 < this.left.length) return this.left[index$2];
		return this.right[this.right.length - index$2 + this.left.length - 1];
	}
	get length() {
		return this.left.length + this.right.length;
	}
	shift() {
		this.setCursor(0);
		return this.right.pop();
	}
	slice(start, end) {
		const stop = end === null || end === void 0 ? Number.POSITIVE_INFINITY : end;
		if (stop < this.left.length) return this.left.slice(start, stop);
		if (start > this.left.length) return this.right.slice(this.right.length - stop + this.left.length, this.right.length - start + this.left.length).reverse();
		return this.left.slice(start).concat(this.right.slice(this.right.length - stop + this.left.length).reverse());
	}
	splice(start, deleteCount, items) {
		const count = deleteCount || 0;
		this.setCursor(Math.trunc(start));
		const removed = this.right.splice(this.right.length - count, Number.POSITIVE_INFINITY);
		if (items) chunkedPush(this.left, items);
		return removed.reverse();
	}
	pop() {
		this.setCursor(Number.POSITIVE_INFINITY);
		return this.left.pop();
	}
	push(item) {
		this.setCursor(Number.POSITIVE_INFINITY);
		this.left.push(item);
	}
	pushMany(items) {
		this.setCursor(Number.POSITIVE_INFINITY);
		chunkedPush(this.left, items);
	}
	unshift(item) {
		this.setCursor(0);
		this.right.push(item);
	}
	unshiftMany(items) {
		this.setCursor(0);
		chunkedPush(this.right, items.reverse());
	}
	setCursor(n) {
		if (n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0) return;
		if (n < this.left.length) {
			const removed = this.left.splice(n, Number.POSITIVE_INFINITY);
			chunkedPush(this.right, removed.reverse());
		} else {
			const removed = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
			chunkedPush(this.left, removed.reverse());
		}
	}
};
function chunkedPush(list$3, right) {
	let chunkStart = 0;
	if (right.length < 1e4) list$3.push(...right);
	else while (chunkStart < right.length) {
		list$3.push(...right.slice(chunkStart, chunkStart + 1e4));
		chunkStart += 1e4;
	}
}
function subtokenize(eventsArray) {
	const jumps = {};
	let index$2 = -1;
	let event;
	let lineIndex;
	let otherIndex;
	let otherEvent;
	let parameters;
	let subevents;
	let more;
	const events = new SpliceBuffer(eventsArray);
	while (++index$2 < events.length) {
		while (index$2 in jumps) index$2 = jumps[index$2];
		event = events.get(index$2);
		if (index$2 && event[1].type === "chunkFlow" && events.get(index$2 - 1)[1].type === "listItemPrefix") {
			subevents = event[1]._tokenizer.events;
			otherIndex = 0;
			if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") otherIndex += 2;
			if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") while (++otherIndex < subevents.length) {
				if (subevents[otherIndex][1].type === "content") break;
				if (subevents[otherIndex][1].type === "chunkText") {
					subevents[otherIndex][1]._isInFirstContentOfListItem = true;
					otherIndex++;
				}
			}
		}
		if (event[0] === "enter") {
			if (event[1].contentType) {
				Object.assign(jumps, subcontent(events, index$2));
				index$2 = jumps[index$2];
				more = true;
			}
		} else if (event[1]._container) {
			otherIndex = index$2;
			lineIndex = void 0;
			while (otherIndex--) {
				otherEvent = events.get(otherIndex);
				if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
					if (otherEvent[0] === "enter") {
						if (lineIndex) events.get(lineIndex)[1].type = "lineEndingBlank";
						otherEvent[1].type = "lineEnding";
						lineIndex = otherIndex;
					}
				} else if (otherEvent[1].type === "linePrefix" || otherEvent[1].type === "listItemIndent") {} else break;
			}
			if (lineIndex) {
				event[1].end = { ...events.get(lineIndex)[1].start };
				parameters = events.slice(lineIndex, index$2);
				parameters.unshift(event);
				events.splice(lineIndex, index$2 - lineIndex + 1, parameters);
			}
		}
	}
	splice(eventsArray, 0, Number.POSITIVE_INFINITY, events.slice(0));
	return !more;
}
function subcontent(events, eventIndex) {
	const token = events.get(eventIndex)[1];
	const context = events.get(eventIndex)[2];
	let startPosition = eventIndex - 1;
	const startPositions = [];
	let tokenizer = token._tokenizer;
	if (!tokenizer) {
		tokenizer = context.parser[token.contentType](token.start);
		if (token._contentTypeTextTrailing) tokenizer._contentTypeTextTrailing = true;
	}
	const childEvents = tokenizer.events;
	const jumps = [];
	const gaps = {};
	let stream;
	let previous$2;
	let index$2 = -1;
	let current = token;
	let adjust = 0;
	let start = 0;
	const breaks = [start];
	while (current) {
		while (events.get(++startPosition)[1] !== current);
		startPositions.push(startPosition);
		if (!current._tokenizer) {
			stream = context.sliceStream(current);
			if (!current.next) stream.push(null);
			if (previous$2) tokenizer.defineSkip(current.start);
			if (current._isInFirstContentOfListItem) tokenizer._gfmTasklistFirstContentOfListItem = true;
			tokenizer.write(stream);
			if (current._isInFirstContentOfListItem) tokenizer._gfmTasklistFirstContentOfListItem = void 0;
		}
		previous$2 = current;
		current = current.next;
	}
	current = token;
	while (++index$2 < childEvents.length) if (childEvents[index$2][0] === "exit" && childEvents[index$2 - 1][0] === "enter" && childEvents[index$2][1].type === childEvents[index$2 - 1][1].type && childEvents[index$2][1].start.line !== childEvents[index$2][1].end.line) {
		start = index$2 + 1;
		breaks.push(start);
		current._tokenizer = void 0;
		current.previous = void 0;
		current = current.next;
	}
	tokenizer.events = [];
	if (current) {
		current._tokenizer = void 0;
		current.previous = void 0;
	} else breaks.pop();
	index$2 = breaks.length;
	while (index$2--) {
		const slice = childEvents.slice(breaks[index$2], breaks[index$2 + 1]);
		const start$1 = startPositions.pop();
		jumps.push([start$1, start$1 + slice.length - 1]);
		events.splice(start$1, 2, slice);
	}
	jumps.reverse();
	index$2 = -1;
	while (++index$2 < jumps.length) {
		gaps[adjust + jumps[index$2][0]] = adjust + jumps[index$2][1];
		adjust += jumps[index$2][1] - jumps[index$2][0] - 1;
	}
	return gaps;
}
const content$1 = {
	resolve: resolveContent,
	tokenize: tokenizeContent
};
var continuationConstruct = {
	partial: true,
	tokenize: tokenizeContinuation
};
function resolveContent(events) {
	subtokenize(events);
	return events;
}
function tokenizeContent(effects, ok$2) {
	let previous$2;
	return chunkStart;
	function chunkStart(code$3) {
		effects.enter("content");
		previous$2 = effects.enter("chunkContent", { contentType: "content" });
		return chunkInside(code$3);
	}
	function chunkInside(code$3) {
		if (code$3 === null) return contentEnd(code$3);
		if (markdownLineEnding(code$3)) return effects.check(continuationConstruct, contentContinue, contentEnd)(code$3);
		effects.consume(code$3);
		return chunkInside;
	}
	function contentEnd(code$3) {
		effects.exit("chunkContent");
		effects.exit("content");
		return ok$2(code$3);
	}
	function contentContinue(code$3) {
		effects.consume(code$3);
		effects.exit("chunkContent");
		previous$2.next = effects.enter("chunkContent", {
			contentType: "content",
			previous: previous$2
		});
		previous$2 = previous$2.next;
		return chunkInside;
	}
}
function tokenizeContinuation(effects, ok$2, nok) {
	const self$1 = this;
	return startLookahead;
	function startLookahead(code$3) {
		effects.exit("chunkContent");
		effects.enter("lineEnding");
		effects.consume(code$3);
		effects.exit("lineEnding");
		return factorySpace(effects, prefixed, "linePrefix");
	}
	function prefixed(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) return nok(code$3);
		const tail = self$1.events[self$1.events.length - 1];
		if (!self$1.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) return ok$2(code$3);
		return effects.interrupt(self$1.parser.constructs.flow, nok, ok$2)(code$3);
	}
}
function factoryDestination(effects, ok$2, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
	const limit = max || Number.POSITIVE_INFINITY;
	let balance = 0;
	return start;
	function start(code$3) {
		if (code$3 === 60) {
			effects.enter(type);
			effects.enter(literalType);
			effects.enter(literalMarkerType);
			effects.consume(code$3);
			effects.exit(literalMarkerType);
			return enclosedBefore;
		}
		if (code$3 === null || code$3 === 32 || code$3 === 41 || asciiControl(code$3)) return nok(code$3);
		effects.enter(type);
		effects.enter(rawType);
		effects.enter(stringType);
		effects.enter("chunkString", { contentType: "string" });
		return raw(code$3);
	}
	function enclosedBefore(code$3) {
		if (code$3 === 62) {
			effects.enter(literalMarkerType);
			effects.consume(code$3);
			effects.exit(literalMarkerType);
			effects.exit(literalType);
			effects.exit(type);
			return ok$2;
		}
		effects.enter(stringType);
		effects.enter("chunkString", { contentType: "string" });
		return enclosed(code$3);
	}
	function enclosed(code$3) {
		if (code$3 === 62) {
			effects.exit("chunkString");
			effects.exit(stringType);
			return enclosedBefore(code$3);
		}
		if (code$3 === null || code$3 === 60 || markdownLineEnding(code$3)) return nok(code$3);
		effects.consume(code$3);
		return code$3 === 92 ? enclosedEscape : enclosed;
	}
	function enclosedEscape(code$3) {
		if (code$3 === 60 || code$3 === 62 || code$3 === 92) {
			effects.consume(code$3);
			return enclosed;
		}
		return enclosed(code$3);
	}
	function raw(code$3) {
		if (!balance && (code$3 === null || code$3 === 41 || markdownLineEndingOrSpace(code$3))) {
			effects.exit("chunkString");
			effects.exit(stringType);
			effects.exit(rawType);
			effects.exit(type);
			return ok$2(code$3);
		}
		if (balance < limit && code$3 === 40) {
			effects.consume(code$3);
			balance++;
			return raw;
		}
		if (code$3 === 41) {
			effects.consume(code$3);
			balance--;
			return raw;
		}
		if (code$3 === null || code$3 === 32 || code$3 === 40 || asciiControl(code$3)) return nok(code$3);
		effects.consume(code$3);
		return code$3 === 92 ? rawEscape : raw;
	}
	function rawEscape(code$3) {
		if (code$3 === 40 || code$3 === 41 || code$3 === 92) {
			effects.consume(code$3);
			return raw;
		}
		return raw(code$3);
	}
}
function factoryLabel(effects, ok$2, nok, type, markerType, stringType) {
	const self$1 = this;
	let size = 0;
	let seen;
	return start;
	function start(code$3) {
		effects.enter(type);
		effects.enter(markerType);
		effects.consume(code$3);
		effects.exit(markerType);
		effects.enter(stringType);
		return atBreak;
	}
	function atBreak(code$3) {
		if (size > 999 || code$3 === null || code$3 === 91 || code$3 === 93 && !seen || code$3 === 94 && !size && "_hiddenFootnoteSupport" in self$1.parser.constructs) return nok(code$3);
		if (code$3 === 93) {
			effects.exit(stringType);
			effects.enter(markerType);
			effects.consume(code$3);
			effects.exit(markerType);
			effects.exit(type);
			return ok$2;
		}
		if (markdownLineEnding(code$3)) {
			effects.enter("lineEnding");
			effects.consume(code$3);
			effects.exit("lineEnding");
			return atBreak;
		}
		effects.enter("chunkString", { contentType: "string" });
		return labelInside(code$3);
	}
	function labelInside(code$3) {
		if (code$3 === null || code$3 === 91 || code$3 === 93 || markdownLineEnding(code$3) || size++ > 999) {
			effects.exit("chunkString");
			return atBreak(code$3);
		}
		effects.consume(code$3);
		if (!seen) seen = !markdownSpace(code$3);
		return code$3 === 92 ? labelEscape : labelInside;
	}
	function labelEscape(code$3) {
		if (code$3 === 91 || code$3 === 92 || code$3 === 93) {
			effects.consume(code$3);
			size++;
			return labelInside;
		}
		return labelInside(code$3);
	}
}
function factoryTitle(effects, ok$2, nok, type, markerType, stringType) {
	let marker;
	return start;
	function start(code$3) {
		if (code$3 === 34 || code$3 === 39 || code$3 === 40) {
			effects.enter(type);
			effects.enter(markerType);
			effects.consume(code$3);
			effects.exit(markerType);
			marker = code$3 === 40 ? 41 : code$3;
			return begin;
		}
		return nok(code$3);
	}
	function begin(code$3) {
		if (code$3 === marker) {
			effects.enter(markerType);
			effects.consume(code$3);
			effects.exit(markerType);
			effects.exit(type);
			return ok$2;
		}
		effects.enter(stringType);
		return atBreak(code$3);
	}
	function atBreak(code$3) {
		if (code$3 === marker) {
			effects.exit(stringType);
			return begin(marker);
		}
		if (code$3 === null) return nok(code$3);
		if (markdownLineEnding(code$3)) {
			effects.enter("lineEnding");
			effects.consume(code$3);
			effects.exit("lineEnding");
			return factorySpace(effects, atBreak, "linePrefix");
		}
		effects.enter("chunkString", { contentType: "string" });
		return inside(code$3);
	}
	function inside(code$3) {
		if (code$3 === marker || code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("chunkString");
			return atBreak(code$3);
		}
		effects.consume(code$3);
		return code$3 === 92 ? escape : inside;
	}
	function escape(code$3) {
		if (code$3 === marker || code$3 === 92) {
			effects.consume(code$3);
			return inside;
		}
		return inside(code$3);
	}
}
function factoryWhitespace(effects, ok$2) {
	let seen;
	return start;
	function start(code$3) {
		if (markdownLineEnding(code$3)) {
			effects.enter("lineEnding");
			effects.consume(code$3);
			effects.exit("lineEnding");
			seen = true;
			return start;
		}
		if (markdownSpace(code$3)) return factorySpace(effects, start, seen ? "linePrefix" : "lineSuffix")(code$3);
		return ok$2(code$3);
	}
}
const definition$1 = {
	name: "definition",
	tokenize: tokenizeDefinition
};
var titleBefore = {
	partial: true,
	tokenize: tokenizeTitleBefore
};
function tokenizeDefinition(effects, ok$2, nok) {
	const self$1 = this;
	let identifier;
	return start;
	function start(code$3) {
		effects.enter("definition");
		return before(code$3);
	}
	function before(code$3) {
		return factoryLabel.call(self$1, effects, labelAfter, nok, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(code$3);
	}
	function labelAfter(code$3) {
		identifier = normalizeIdentifier(self$1.sliceSerialize(self$1.events[self$1.events.length - 1][1]).slice(1, -1));
		if (code$3 === 58) {
			effects.enter("definitionMarker");
			effects.consume(code$3);
			effects.exit("definitionMarker");
			return markerAfter;
		}
		return nok(code$3);
	}
	function markerAfter(code$3) {
		return markdownLineEndingOrSpace(code$3) ? factoryWhitespace(effects, destinationBefore)(code$3) : destinationBefore(code$3);
	}
	function destinationBefore(code$3) {
		return factoryDestination(effects, destinationAfter, nok, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(code$3);
	}
	function destinationAfter(code$3) {
		return effects.attempt(titleBefore, after, after)(code$3);
	}
	function after(code$3) {
		return markdownSpace(code$3) ? factorySpace(effects, afterWhitespace, "whitespace")(code$3) : afterWhitespace(code$3);
	}
	function afterWhitespace(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("definition");
			self$1.parser.defined.push(identifier);
			return ok$2(code$3);
		}
		return nok(code$3);
	}
}
function tokenizeTitleBefore(effects, ok$2, nok) {
	return titleBefore$1;
	function titleBefore$1(code$3) {
		return markdownLineEndingOrSpace(code$3) ? factoryWhitespace(effects, beforeMarker)(code$3) : nok(code$3);
	}
	function beforeMarker(code$3) {
		return factoryTitle(effects, titleAfter, nok, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(code$3);
	}
	function titleAfter(code$3) {
		return markdownSpace(code$3) ? factorySpace(effects, titleAfterOptionalWhitespace, "whitespace")(code$3) : titleAfterOptionalWhitespace(code$3);
	}
	function titleAfterOptionalWhitespace(code$3) {
		return code$3 === null || markdownLineEnding(code$3) ? ok$2(code$3) : nok(code$3);
	}
}
const hardBreakEscape = {
	name: "hardBreakEscape",
	tokenize: tokenizeHardBreakEscape
};
function tokenizeHardBreakEscape(effects, ok$2, nok) {
	return start;
	function start(code$3) {
		effects.enter("hardBreakEscape");
		effects.consume(code$3);
		return after;
	}
	function after(code$3) {
		if (markdownLineEnding(code$3)) {
			effects.exit("hardBreakEscape");
			return ok$2(code$3);
		}
		return nok(code$3);
	}
}
const headingAtx = {
	name: "headingAtx",
	resolve: resolveHeadingAtx,
	tokenize: tokenizeHeadingAtx
};
function resolveHeadingAtx(events, context) {
	let contentEnd = events.length - 2;
	let contentStart = 3;
	let content$2;
	let text$6;
	if (events[contentStart][1].type === "whitespace") contentStart += 2;
	if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") contentEnd -= 2;
	if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
	if (contentEnd > contentStart) {
		content$2 = {
			type: "atxHeadingText",
			start: events[contentStart][1].start,
			end: events[contentEnd][1].end
		};
		text$6 = {
			type: "chunkText",
			start: events[contentStart][1].start,
			end: events[contentEnd][1].end,
			contentType: "text"
		};
		splice(events, contentStart, contentEnd - contentStart + 1, [
			[
				"enter",
				content$2,
				context
			],
			[
				"enter",
				text$6,
				context
			],
			[
				"exit",
				text$6,
				context
			],
			[
				"exit",
				content$2,
				context
			]
		]);
	}
	return events;
}
function tokenizeHeadingAtx(effects, ok$2, nok) {
	let size = 0;
	return start;
	function start(code$3) {
		effects.enter("atxHeading");
		return before(code$3);
	}
	function before(code$3) {
		effects.enter("atxHeadingSequence");
		return sequenceOpen(code$3);
	}
	function sequenceOpen(code$3) {
		if (code$3 === 35 && size++ < 6) {
			effects.consume(code$3);
			return sequenceOpen;
		}
		if (code$3 === null || markdownLineEndingOrSpace(code$3)) {
			effects.exit("atxHeadingSequence");
			return atBreak(code$3);
		}
		return nok(code$3);
	}
	function atBreak(code$3) {
		if (code$3 === 35) {
			effects.enter("atxHeadingSequence");
			return sequenceFurther(code$3);
		}
		if (code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("atxHeading");
			return ok$2(code$3);
		}
		if (markdownSpace(code$3)) return factorySpace(effects, atBreak, "whitespace")(code$3);
		effects.enter("atxHeadingText");
		return data(code$3);
	}
	function sequenceFurther(code$3) {
		if (code$3 === 35) {
			effects.consume(code$3);
			return sequenceFurther;
		}
		effects.exit("atxHeadingSequence");
		return atBreak(code$3);
	}
	function data(code$3) {
		if (code$3 === null || code$3 === 35 || markdownLineEndingOrSpace(code$3)) {
			effects.exit("atxHeadingText");
			return atBreak(code$3);
		}
		effects.consume(code$3);
		return data;
	}
}
const htmlBlockNames = [
	"address",
	"article",
	"aside",
	"base",
	"basefont",
	"blockquote",
	"body",
	"caption",
	"center",
	"col",
	"colgroup",
	"dd",
	"details",
	"dialog",
	"dir",
	"div",
	"dl",
	"dt",
	"fieldset",
	"figcaption",
	"figure",
	"footer",
	"form",
	"frame",
	"frameset",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"head",
	"header",
	"hr",
	"html",
	"iframe",
	"legend",
	"li",
	"link",
	"main",
	"menu",
	"menuitem",
	"nav",
	"noframes",
	"ol",
	"optgroup",
	"option",
	"p",
	"param",
	"search",
	"section",
	"summary",
	"table",
	"tbody",
	"td",
	"tfoot",
	"th",
	"thead",
	"title",
	"tr",
	"track",
	"ul"
];
const htmlRawNames = [
	"pre",
	"script",
	"style",
	"textarea"
];
const htmlFlow = {
	concrete: true,
	name: "htmlFlow",
	resolveTo: resolveToHtmlFlow,
	tokenize: tokenizeHtmlFlow
};
var blankLineBefore = {
	partial: true,
	tokenize: tokenizeBlankLineBefore
};
var nonLazyContinuationStart = {
	partial: true,
	tokenize: tokenizeNonLazyContinuationStart
};
function resolveToHtmlFlow(events) {
	let index$2 = events.length;
	while (index$2--) if (events[index$2][0] === "enter" && events[index$2][1].type === "htmlFlow") break;
	if (index$2 > 1 && events[index$2 - 2][1].type === "linePrefix") {
		events[index$2][1].start = events[index$2 - 2][1].start;
		events[index$2 + 1][1].start = events[index$2 - 2][1].start;
		events.splice(index$2 - 2, 2);
	}
	return events;
}
function tokenizeHtmlFlow(effects, ok$2, nok) {
	const self$1 = this;
	let marker;
	let closingTag;
	let buffer;
	let index$2;
	let markerB;
	return start;
	function start(code$3) {
		return before(code$3);
	}
	function before(code$3) {
		effects.enter("htmlFlow");
		effects.enter("htmlFlowData");
		effects.consume(code$3);
		return open;
	}
	function open(code$3) {
		if (code$3 === 33) {
			effects.consume(code$3);
			return declarationOpen;
		}
		if (code$3 === 47) {
			effects.consume(code$3);
			closingTag = true;
			return tagCloseStart;
		}
		if (code$3 === 63) {
			effects.consume(code$3);
			marker = 3;
			return self$1.interrupt ? ok$2 : continuationDeclarationInside;
		}
		if (asciiAlpha(code$3)) {
			effects.consume(code$3);
			buffer = String.fromCharCode(code$3);
			return tagName;
		}
		return nok(code$3);
	}
	function declarationOpen(code$3) {
		if (code$3 === 45) {
			effects.consume(code$3);
			marker = 2;
			return commentOpenInside;
		}
		if (code$3 === 91) {
			effects.consume(code$3);
			marker = 5;
			index$2 = 0;
			return cdataOpenInside;
		}
		if (asciiAlpha(code$3)) {
			effects.consume(code$3);
			marker = 4;
			return self$1.interrupt ? ok$2 : continuationDeclarationInside;
		}
		return nok(code$3);
	}
	function commentOpenInside(code$3) {
		if (code$3 === 45) {
			effects.consume(code$3);
			return self$1.interrupt ? ok$2 : continuationDeclarationInside;
		}
		return nok(code$3);
	}
	function cdataOpenInside(code$3) {
		if (code$3 === "CDATA[".charCodeAt(index$2++)) {
			effects.consume(code$3);
			if (index$2 === 6) return self$1.interrupt ? ok$2 : continuation;
			return cdataOpenInside;
		}
		return nok(code$3);
	}
	function tagCloseStart(code$3) {
		if (asciiAlpha(code$3)) {
			effects.consume(code$3);
			buffer = String.fromCharCode(code$3);
			return tagName;
		}
		return nok(code$3);
	}
	function tagName(code$3) {
		if (code$3 === null || code$3 === 47 || code$3 === 62 || markdownLineEndingOrSpace(code$3)) {
			const slash = code$3 === 47;
			const name$1 = buffer.toLowerCase();
			if (!slash && !closingTag && htmlRawNames.includes(name$1)) {
				marker = 1;
				return self$1.interrupt ? ok$2(code$3) : continuation(code$3);
			}
			if (htmlBlockNames.includes(buffer.toLowerCase())) {
				marker = 6;
				if (slash) {
					effects.consume(code$3);
					return basicSelfClosing;
				}
				return self$1.interrupt ? ok$2(code$3) : continuation(code$3);
			}
			marker = 7;
			return self$1.interrupt && !self$1.parser.lazy[self$1.now().line] ? nok(code$3) : closingTag ? completeClosingTagAfter(code$3) : completeAttributeNameBefore(code$3);
		}
		if (code$3 === 45 || asciiAlphanumeric(code$3)) {
			effects.consume(code$3);
			buffer += String.fromCharCode(code$3);
			return tagName;
		}
		return nok(code$3);
	}
	function basicSelfClosing(code$3) {
		if (code$3 === 62) {
			effects.consume(code$3);
			return self$1.interrupt ? ok$2 : continuation;
		}
		return nok(code$3);
	}
	function completeClosingTagAfter(code$3) {
		if (markdownSpace(code$3)) {
			effects.consume(code$3);
			return completeClosingTagAfter;
		}
		return completeEnd(code$3);
	}
	function completeAttributeNameBefore(code$3) {
		if (code$3 === 47) {
			effects.consume(code$3);
			return completeEnd;
		}
		if (code$3 === 58 || code$3 === 95 || asciiAlpha(code$3)) {
			effects.consume(code$3);
			return completeAttributeName;
		}
		if (markdownSpace(code$3)) {
			effects.consume(code$3);
			return completeAttributeNameBefore;
		}
		return completeEnd(code$3);
	}
	function completeAttributeName(code$3) {
		if (code$3 === 45 || code$3 === 46 || code$3 === 58 || code$3 === 95 || asciiAlphanumeric(code$3)) {
			effects.consume(code$3);
			return completeAttributeName;
		}
		return completeAttributeNameAfter(code$3);
	}
	function completeAttributeNameAfter(code$3) {
		if (code$3 === 61) {
			effects.consume(code$3);
			return completeAttributeValueBefore;
		}
		if (markdownSpace(code$3)) {
			effects.consume(code$3);
			return completeAttributeNameAfter;
		}
		return completeAttributeNameBefore(code$3);
	}
	function completeAttributeValueBefore(code$3) {
		if (code$3 === null || code$3 === 60 || code$3 === 61 || code$3 === 62 || code$3 === 96) return nok(code$3);
		if (code$3 === 34 || code$3 === 39) {
			effects.consume(code$3);
			markerB = code$3;
			return completeAttributeValueQuoted;
		}
		if (markdownSpace(code$3)) {
			effects.consume(code$3);
			return completeAttributeValueBefore;
		}
		return completeAttributeValueUnquoted(code$3);
	}
	function completeAttributeValueQuoted(code$3) {
		if (code$3 === markerB) {
			effects.consume(code$3);
			markerB = null;
			return completeAttributeValueQuotedAfter;
		}
		if (code$3 === null || markdownLineEnding(code$3)) return nok(code$3);
		effects.consume(code$3);
		return completeAttributeValueQuoted;
	}
	function completeAttributeValueUnquoted(code$3) {
		if (code$3 === null || code$3 === 34 || code$3 === 39 || code$3 === 47 || code$3 === 60 || code$3 === 61 || code$3 === 62 || code$3 === 96 || markdownLineEndingOrSpace(code$3)) return completeAttributeNameAfter(code$3);
		effects.consume(code$3);
		return completeAttributeValueUnquoted;
	}
	function completeAttributeValueQuotedAfter(code$3) {
		if (code$3 === 47 || code$3 === 62 || markdownSpace(code$3)) return completeAttributeNameBefore(code$3);
		return nok(code$3);
	}
	function completeEnd(code$3) {
		if (code$3 === 62) {
			effects.consume(code$3);
			return completeAfter;
		}
		return nok(code$3);
	}
	function completeAfter(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) return continuation(code$3);
		if (markdownSpace(code$3)) {
			effects.consume(code$3);
			return completeAfter;
		}
		return nok(code$3);
	}
	function continuation(code$3) {
		if (code$3 === 45 && marker === 2) {
			effects.consume(code$3);
			return continuationCommentInside;
		}
		if (code$3 === 60 && marker === 1) {
			effects.consume(code$3);
			return continuationRawTagOpen;
		}
		if (code$3 === 62 && marker === 4) {
			effects.consume(code$3);
			return continuationClose;
		}
		if (code$3 === 63 && marker === 3) {
			effects.consume(code$3);
			return continuationDeclarationInside;
		}
		if (code$3 === 93 && marker === 5) {
			effects.consume(code$3);
			return continuationCdataInside;
		}
		if (markdownLineEnding(code$3) && (marker === 6 || marker === 7)) {
			effects.exit("htmlFlowData");
			return effects.check(blankLineBefore, continuationAfter, continuationStart)(code$3);
		}
		if (code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("htmlFlowData");
			return continuationStart(code$3);
		}
		effects.consume(code$3);
		return continuation;
	}
	function continuationStart(code$3) {
		return effects.check(nonLazyContinuationStart, continuationStartNonLazy, continuationAfter)(code$3);
	}
	function continuationStartNonLazy(code$3) {
		effects.enter("lineEnding");
		effects.consume(code$3);
		effects.exit("lineEnding");
		return continuationBefore;
	}
	function continuationBefore(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) return continuationStart(code$3);
		effects.enter("htmlFlowData");
		return continuation(code$3);
	}
	function continuationCommentInside(code$3) {
		if (code$3 === 45) {
			effects.consume(code$3);
			return continuationDeclarationInside;
		}
		return continuation(code$3);
	}
	function continuationRawTagOpen(code$3) {
		if (code$3 === 47) {
			effects.consume(code$3);
			buffer = "";
			return continuationRawEndTag;
		}
		return continuation(code$3);
	}
	function continuationRawEndTag(code$3) {
		if (code$3 === 62) {
			const name$1 = buffer.toLowerCase();
			if (htmlRawNames.includes(name$1)) {
				effects.consume(code$3);
				return continuationClose;
			}
			return continuation(code$3);
		}
		if (asciiAlpha(code$3) && buffer.length < 8) {
			effects.consume(code$3);
			buffer += String.fromCharCode(code$3);
			return continuationRawEndTag;
		}
		return continuation(code$3);
	}
	function continuationCdataInside(code$3) {
		if (code$3 === 93) {
			effects.consume(code$3);
			return continuationDeclarationInside;
		}
		return continuation(code$3);
	}
	function continuationDeclarationInside(code$3) {
		if (code$3 === 62) {
			effects.consume(code$3);
			return continuationClose;
		}
		if (code$3 === 45 && marker === 2) {
			effects.consume(code$3);
			return continuationDeclarationInside;
		}
		return continuation(code$3);
	}
	function continuationClose(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("htmlFlowData");
			return continuationAfter(code$3);
		}
		effects.consume(code$3);
		return continuationClose;
	}
	function continuationAfter(code$3) {
		effects.exit("htmlFlow");
		return ok$2(code$3);
	}
}
function tokenizeNonLazyContinuationStart(effects, ok$2, nok) {
	const self$1 = this;
	return start;
	function start(code$3) {
		if (markdownLineEnding(code$3)) {
			effects.enter("lineEnding");
			effects.consume(code$3);
			effects.exit("lineEnding");
			return after;
		}
		return nok(code$3);
	}
	function after(code$3) {
		return self$1.parser.lazy[self$1.now().line] ? nok(code$3) : ok$2(code$3);
	}
}
function tokenizeBlankLineBefore(effects, ok$2, nok) {
	return start;
	function start(code$3) {
		effects.enter("lineEnding");
		effects.consume(code$3);
		effects.exit("lineEnding");
		return effects.attempt(blankLine, ok$2, nok);
	}
}
const htmlText = {
	name: "htmlText",
	tokenize: tokenizeHtmlText
};
function tokenizeHtmlText(effects, ok$2, nok) {
	const self$1 = this;
	let marker;
	let index$2;
	let returnState;
	return start;
	function start(code$3) {
		effects.enter("htmlText");
		effects.enter("htmlTextData");
		effects.consume(code$3);
		return open;
	}
	function open(code$3) {
		if (code$3 === 33) {
			effects.consume(code$3);
			return declarationOpen;
		}
		if (code$3 === 47) {
			effects.consume(code$3);
			return tagCloseStart;
		}
		if (code$3 === 63) {
			effects.consume(code$3);
			return instruction;
		}
		if (asciiAlpha(code$3)) {
			effects.consume(code$3);
			return tagOpen;
		}
		return nok(code$3);
	}
	function declarationOpen(code$3) {
		if (code$3 === 45) {
			effects.consume(code$3);
			return commentOpenInside;
		}
		if (code$3 === 91) {
			effects.consume(code$3);
			index$2 = 0;
			return cdataOpenInside;
		}
		if (asciiAlpha(code$3)) {
			effects.consume(code$3);
			return declaration;
		}
		return nok(code$3);
	}
	function commentOpenInside(code$3) {
		if (code$3 === 45) {
			effects.consume(code$3);
			return commentEnd;
		}
		return nok(code$3);
	}
	function comment(code$3) {
		if (code$3 === null) return nok(code$3);
		if (code$3 === 45) {
			effects.consume(code$3);
			return commentClose;
		}
		if (markdownLineEnding(code$3)) {
			returnState = comment;
			return lineEndingBefore(code$3);
		}
		effects.consume(code$3);
		return comment;
	}
	function commentClose(code$3) {
		if (code$3 === 45) {
			effects.consume(code$3);
			return commentEnd;
		}
		return comment(code$3);
	}
	function commentEnd(code$3) {
		return code$3 === 62 ? end(code$3) : code$3 === 45 ? commentClose(code$3) : comment(code$3);
	}
	function cdataOpenInside(code$3) {
		if (code$3 === "CDATA[".charCodeAt(index$2++)) {
			effects.consume(code$3);
			return index$2 === 6 ? cdata : cdataOpenInside;
		}
		return nok(code$3);
	}
	function cdata(code$3) {
		if (code$3 === null) return nok(code$3);
		if (code$3 === 93) {
			effects.consume(code$3);
			return cdataClose;
		}
		if (markdownLineEnding(code$3)) {
			returnState = cdata;
			return lineEndingBefore(code$3);
		}
		effects.consume(code$3);
		return cdata;
	}
	function cdataClose(code$3) {
		if (code$3 === 93) {
			effects.consume(code$3);
			return cdataEnd;
		}
		return cdata(code$3);
	}
	function cdataEnd(code$3) {
		if (code$3 === 62) return end(code$3);
		if (code$3 === 93) {
			effects.consume(code$3);
			return cdataEnd;
		}
		return cdata(code$3);
	}
	function declaration(code$3) {
		if (code$3 === null || code$3 === 62) return end(code$3);
		if (markdownLineEnding(code$3)) {
			returnState = declaration;
			return lineEndingBefore(code$3);
		}
		effects.consume(code$3);
		return declaration;
	}
	function instruction(code$3) {
		if (code$3 === null) return nok(code$3);
		if (code$3 === 63) {
			effects.consume(code$3);
			return instructionClose;
		}
		if (markdownLineEnding(code$3)) {
			returnState = instruction;
			return lineEndingBefore(code$3);
		}
		effects.consume(code$3);
		return instruction;
	}
	function instructionClose(code$3) {
		return code$3 === 62 ? end(code$3) : instruction(code$3);
	}
	function tagCloseStart(code$3) {
		if (asciiAlpha(code$3)) {
			effects.consume(code$3);
			return tagClose;
		}
		return nok(code$3);
	}
	function tagClose(code$3) {
		if (code$3 === 45 || asciiAlphanumeric(code$3)) {
			effects.consume(code$3);
			return tagClose;
		}
		return tagCloseBetween(code$3);
	}
	function tagCloseBetween(code$3) {
		if (markdownLineEnding(code$3)) {
			returnState = tagCloseBetween;
			return lineEndingBefore(code$3);
		}
		if (markdownSpace(code$3)) {
			effects.consume(code$3);
			return tagCloseBetween;
		}
		return end(code$3);
	}
	function tagOpen(code$3) {
		if (code$3 === 45 || asciiAlphanumeric(code$3)) {
			effects.consume(code$3);
			return tagOpen;
		}
		if (code$3 === 47 || code$3 === 62 || markdownLineEndingOrSpace(code$3)) return tagOpenBetween(code$3);
		return nok(code$3);
	}
	function tagOpenBetween(code$3) {
		if (code$3 === 47) {
			effects.consume(code$3);
			return end;
		}
		if (code$3 === 58 || code$3 === 95 || asciiAlpha(code$3)) {
			effects.consume(code$3);
			return tagOpenAttributeName;
		}
		if (markdownLineEnding(code$3)) {
			returnState = tagOpenBetween;
			return lineEndingBefore(code$3);
		}
		if (markdownSpace(code$3)) {
			effects.consume(code$3);
			return tagOpenBetween;
		}
		return end(code$3);
	}
	function tagOpenAttributeName(code$3) {
		if (code$3 === 45 || code$3 === 46 || code$3 === 58 || code$3 === 95 || asciiAlphanumeric(code$3)) {
			effects.consume(code$3);
			return tagOpenAttributeName;
		}
		return tagOpenAttributeNameAfter(code$3);
	}
	function tagOpenAttributeNameAfter(code$3) {
		if (code$3 === 61) {
			effects.consume(code$3);
			return tagOpenAttributeValueBefore;
		}
		if (markdownLineEnding(code$3)) {
			returnState = tagOpenAttributeNameAfter;
			return lineEndingBefore(code$3);
		}
		if (markdownSpace(code$3)) {
			effects.consume(code$3);
			return tagOpenAttributeNameAfter;
		}
		return tagOpenBetween(code$3);
	}
	function tagOpenAttributeValueBefore(code$3) {
		if (code$3 === null || code$3 === 60 || code$3 === 61 || code$3 === 62 || code$3 === 96) return nok(code$3);
		if (code$3 === 34 || code$3 === 39) {
			effects.consume(code$3);
			marker = code$3;
			return tagOpenAttributeValueQuoted;
		}
		if (markdownLineEnding(code$3)) {
			returnState = tagOpenAttributeValueBefore;
			return lineEndingBefore(code$3);
		}
		if (markdownSpace(code$3)) {
			effects.consume(code$3);
			return tagOpenAttributeValueBefore;
		}
		effects.consume(code$3);
		return tagOpenAttributeValueUnquoted;
	}
	function tagOpenAttributeValueQuoted(code$3) {
		if (code$3 === marker) {
			effects.consume(code$3);
			marker = void 0;
			return tagOpenAttributeValueQuotedAfter;
		}
		if (code$3 === null) return nok(code$3);
		if (markdownLineEnding(code$3)) {
			returnState = tagOpenAttributeValueQuoted;
			return lineEndingBefore(code$3);
		}
		effects.consume(code$3);
		return tagOpenAttributeValueQuoted;
	}
	function tagOpenAttributeValueUnquoted(code$3) {
		if (code$3 === null || code$3 === 34 || code$3 === 39 || code$3 === 60 || code$3 === 61 || code$3 === 96) return nok(code$3);
		if (code$3 === 47 || code$3 === 62 || markdownLineEndingOrSpace(code$3)) return tagOpenBetween(code$3);
		effects.consume(code$3);
		return tagOpenAttributeValueUnquoted;
	}
	function tagOpenAttributeValueQuotedAfter(code$3) {
		if (code$3 === 47 || code$3 === 62 || markdownLineEndingOrSpace(code$3)) return tagOpenBetween(code$3);
		return nok(code$3);
	}
	function end(code$3) {
		if (code$3 === 62) {
			effects.consume(code$3);
			effects.exit("htmlTextData");
			effects.exit("htmlText");
			return ok$2;
		}
		return nok(code$3);
	}
	function lineEndingBefore(code$3) {
		effects.exit("htmlTextData");
		effects.enter("lineEnding");
		effects.consume(code$3);
		effects.exit("lineEnding");
		return lineEndingAfter;
	}
	function lineEndingAfter(code$3) {
		return markdownSpace(code$3) ? factorySpace(effects, lineEndingAfterPrefix, "linePrefix", self$1.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code$3) : lineEndingAfterPrefix(code$3);
	}
	function lineEndingAfterPrefix(code$3) {
		effects.enter("htmlTextData");
		return returnState(code$3);
	}
}
const labelEnd = {
	name: "labelEnd",
	resolveAll: resolveAllLabelEnd,
	resolveTo: resolveToLabelEnd,
	tokenize: tokenizeLabelEnd
};
var resourceConstruct = { tokenize: tokenizeResource };
var referenceFullConstruct = { tokenize: tokenizeReferenceFull };
var referenceCollapsedConstruct = { tokenize: tokenizeReferenceCollapsed };
function resolveAllLabelEnd(events) {
	let index$2 = -1;
	const newEvents = [];
	while (++index$2 < events.length) {
		const token = events[index$2][1];
		newEvents.push(events[index$2]);
		if (token.type === "labelImage" || token.type === "labelLink" || token.type === "labelEnd") {
			const offset = token.type === "labelImage" ? 4 : 2;
			token.type = "data";
			index$2 += offset;
		}
	}
	if (events.length !== newEvents.length) splice(events, 0, events.length, newEvents);
	return events;
}
function resolveToLabelEnd(events, context) {
	let index$2 = events.length;
	let offset = 0;
	let token;
	let open;
	let close;
	let media;
	while (index$2--) {
		token = events[index$2][1];
		if (open) {
			if (token.type === "link" || token.type === "labelLink" && token._inactive) break;
			if (events[index$2][0] === "enter" && token.type === "labelLink") token._inactive = true;
		} else if (close) {
			if (events[index$2][0] === "enter" && (token.type === "labelImage" || token.type === "labelLink") && !token._balanced) {
				open = index$2;
				if (token.type !== "labelLink") {
					offset = 2;
					break;
				}
			}
		} else if (token.type === "labelEnd") close = index$2;
	}
	const group = {
		type: events[open][1].type === "labelLink" ? "link" : "image",
		start: { ...events[open][1].start },
		end: { ...events[events.length - 1][1].end }
	};
	const label = {
		type: "label",
		start: { ...events[open][1].start },
		end: { ...events[close][1].end }
	};
	const text$6 = {
		type: "labelText",
		start: { ...events[open + offset + 2][1].end },
		end: { ...events[close - 2][1].start }
	};
	media = [[
		"enter",
		group,
		context
	], [
		"enter",
		label,
		context
	]];
	media = push(media, events.slice(open + 1, open + offset + 3));
	media = push(media, [[
		"enter",
		text$6,
		context
	]]);
	media = push(media, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + offset + 4, close - 3), context));
	media = push(media, [
		[
			"exit",
			text$6,
			context
		],
		events[close - 2],
		events[close - 1],
		[
			"exit",
			label,
			context
		]
	]);
	media = push(media, events.slice(close + 1));
	media = push(media, [[
		"exit",
		group,
		context
	]]);
	splice(events, open, events.length, media);
	return events;
}
function tokenizeLabelEnd(effects, ok$2, nok) {
	const self$1 = this;
	let index$2 = self$1.events.length;
	let labelStart;
	let defined;
	while (index$2--) if ((self$1.events[index$2][1].type === "labelImage" || self$1.events[index$2][1].type === "labelLink") && !self$1.events[index$2][1]._balanced) {
		labelStart = self$1.events[index$2][1];
		break;
	}
	return start;
	function start(code$3) {
		if (!labelStart) return nok(code$3);
		if (labelStart._inactive) return labelEndNok(code$3);
		defined = self$1.parser.defined.includes(normalizeIdentifier(self$1.sliceSerialize({
			start: labelStart.end,
			end: self$1.now()
		})));
		effects.enter("labelEnd");
		effects.enter("labelMarker");
		effects.consume(code$3);
		effects.exit("labelMarker");
		effects.exit("labelEnd");
		return after;
	}
	function after(code$3) {
		if (code$3 === 40) return effects.attempt(resourceConstruct, labelEndOk, defined ? labelEndOk : labelEndNok)(code$3);
		if (code$3 === 91) return effects.attempt(referenceFullConstruct, labelEndOk, defined ? referenceNotFull : labelEndNok)(code$3);
		return defined ? labelEndOk(code$3) : labelEndNok(code$3);
	}
	function referenceNotFull(code$3) {
		return effects.attempt(referenceCollapsedConstruct, labelEndOk, labelEndNok)(code$3);
	}
	function labelEndOk(code$3) {
		return ok$2(code$3);
	}
	function labelEndNok(code$3) {
		labelStart._balanced = true;
		return nok(code$3);
	}
}
function tokenizeResource(effects, ok$2, nok) {
	return resourceStart;
	function resourceStart(code$3) {
		effects.enter("resource");
		effects.enter("resourceMarker");
		effects.consume(code$3);
		effects.exit("resourceMarker");
		return resourceBefore;
	}
	function resourceBefore(code$3) {
		return markdownLineEndingOrSpace(code$3) ? factoryWhitespace(effects, resourceOpen)(code$3) : resourceOpen(code$3);
	}
	function resourceOpen(code$3) {
		if (code$3 === 41) return resourceEnd(code$3);
		return factoryDestination(effects, resourceDestinationAfter, resourceDestinationMissing, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(code$3);
	}
	function resourceDestinationAfter(code$3) {
		return markdownLineEndingOrSpace(code$3) ? factoryWhitespace(effects, resourceBetween)(code$3) : resourceEnd(code$3);
	}
	function resourceDestinationMissing(code$3) {
		return nok(code$3);
	}
	function resourceBetween(code$3) {
		if (code$3 === 34 || code$3 === 39 || code$3 === 40) return factoryTitle(effects, resourceTitleAfter, nok, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(code$3);
		return resourceEnd(code$3);
	}
	function resourceTitleAfter(code$3) {
		return markdownLineEndingOrSpace(code$3) ? factoryWhitespace(effects, resourceEnd)(code$3) : resourceEnd(code$3);
	}
	function resourceEnd(code$3) {
		if (code$3 === 41) {
			effects.enter("resourceMarker");
			effects.consume(code$3);
			effects.exit("resourceMarker");
			effects.exit("resource");
			return ok$2;
		}
		return nok(code$3);
	}
}
function tokenizeReferenceFull(effects, ok$2, nok) {
	const self$1 = this;
	return referenceFull;
	function referenceFull(code$3) {
		return factoryLabel.call(self$1, effects, referenceFullAfter, referenceFullMissing, "reference", "referenceMarker", "referenceString")(code$3);
	}
	function referenceFullAfter(code$3) {
		return self$1.parser.defined.includes(normalizeIdentifier(self$1.sliceSerialize(self$1.events[self$1.events.length - 1][1]).slice(1, -1))) ? ok$2(code$3) : nok(code$3);
	}
	function referenceFullMissing(code$3) {
		return nok(code$3);
	}
}
function tokenizeReferenceCollapsed(effects, ok$2, nok) {
	return referenceCollapsedStart;
	function referenceCollapsedStart(code$3) {
		effects.enter("reference");
		effects.enter("referenceMarker");
		effects.consume(code$3);
		effects.exit("referenceMarker");
		return referenceCollapsedOpen;
	}
	function referenceCollapsedOpen(code$3) {
		if (code$3 === 93) {
			effects.enter("referenceMarker");
			effects.consume(code$3);
			effects.exit("referenceMarker");
			effects.exit("reference");
			return ok$2;
		}
		return nok(code$3);
	}
}
const labelStartImage = {
	name: "labelStartImage",
	resolveAll: labelEnd.resolveAll,
	tokenize: tokenizeLabelStartImage
};
function tokenizeLabelStartImage(effects, ok$2, nok) {
	const self$1 = this;
	return start;
	function start(code$3) {
		effects.enter("labelImage");
		effects.enter("labelImageMarker");
		effects.consume(code$3);
		effects.exit("labelImageMarker");
		return open;
	}
	function open(code$3) {
		if (code$3 === 91) {
			effects.enter("labelMarker");
			effects.consume(code$3);
			effects.exit("labelMarker");
			effects.exit("labelImage");
			return after;
		}
		return nok(code$3);
	}
	function after(code$3) {
		/* c8 ignore next 3 */
		return code$3 === 94 && "_hiddenFootnoteSupport" in self$1.parser.constructs ? nok(code$3) : ok$2(code$3);
	}
}
const labelStartLink = {
	name: "labelStartLink",
	resolveAll: labelEnd.resolveAll,
	tokenize: tokenizeLabelStartLink
};
function tokenizeLabelStartLink(effects, ok$2, nok) {
	const self$1 = this;
	return start;
	function start(code$3) {
		effects.enter("labelLink");
		effects.enter("labelMarker");
		effects.consume(code$3);
		effects.exit("labelMarker");
		effects.exit("labelLink");
		return after;
	}
	function after(code$3) {
		/* c8 ignore next 3 */
		return code$3 === 94 && "_hiddenFootnoteSupport" in self$1.parser.constructs ? nok(code$3) : ok$2(code$3);
	}
}
const lineEnding = {
	name: "lineEnding",
	tokenize: tokenizeLineEnding
};
function tokenizeLineEnding(effects, ok$2) {
	return start;
	function start(code$3) {
		effects.enter("lineEnding");
		effects.consume(code$3);
		effects.exit("lineEnding");
		return factorySpace(effects, ok$2, "linePrefix");
	}
}
const thematicBreak$2 = {
	name: "thematicBreak",
	tokenize: tokenizeThematicBreak
};
function tokenizeThematicBreak(effects, ok$2, nok) {
	let size = 0;
	let marker;
	return start;
	function start(code$3) {
		effects.enter("thematicBreak");
		return before(code$3);
	}
	function before(code$3) {
		marker = code$3;
		return atBreak(code$3);
	}
	function atBreak(code$3) {
		if (code$3 === marker) {
			effects.enter("thematicBreakSequence");
			return sequence(code$3);
		}
		if (size >= 3 && (code$3 === null || markdownLineEnding(code$3))) {
			effects.exit("thematicBreak");
			return ok$2(code$3);
		}
		return nok(code$3);
	}
	function sequence(code$3) {
		if (code$3 === marker) {
			effects.consume(code$3);
			size++;
			return sequence;
		}
		effects.exit("thematicBreakSequence");
		return markdownSpace(code$3) ? factorySpace(effects, atBreak, "whitespace")(code$3) : atBreak(code$3);
	}
}
const list$2 = {
	continuation: { tokenize: tokenizeListContinuation },
	exit: tokenizeListEnd,
	name: "list",
	tokenize: tokenizeListStart
};
var listItemPrefixWhitespaceConstruct = {
	partial: true,
	tokenize: tokenizeListItemPrefixWhitespace
};
var indentConstruct = {
	partial: true,
	tokenize: tokenizeIndent$1
};
function tokenizeListStart(effects, ok$2, nok) {
	const self$1 = this;
	const tail = self$1.events[self$1.events.length - 1];
	let initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
	let size = 0;
	return start;
	function start(code$3) {
		const kind = self$1.containerState.type || (code$3 === 42 || code$3 === 43 || code$3 === 45 ? "listUnordered" : "listOrdered");
		if (kind === "listUnordered" ? !self$1.containerState.marker || code$3 === self$1.containerState.marker : asciiDigit(code$3)) {
			if (!self$1.containerState.type) {
				self$1.containerState.type = kind;
				effects.enter(kind, { _container: true });
			}
			if (kind === "listUnordered") {
				effects.enter("listItemPrefix");
				return code$3 === 42 || code$3 === 45 ? effects.check(thematicBreak$2, nok, atMarker)(code$3) : atMarker(code$3);
			}
			if (!self$1.interrupt || code$3 === 49) {
				effects.enter("listItemPrefix");
				effects.enter("listItemValue");
				return inside(code$3);
			}
		}
		return nok(code$3);
	}
	function inside(code$3) {
		if (asciiDigit(code$3) && ++size < 10) {
			effects.consume(code$3);
			return inside;
		}
		if ((!self$1.interrupt || size < 2) && (self$1.containerState.marker ? code$3 === self$1.containerState.marker : code$3 === 41 || code$3 === 46)) {
			effects.exit("listItemValue");
			return atMarker(code$3);
		}
		return nok(code$3);
	}
	function atMarker(code$3) {
		effects.enter("listItemMarker");
		effects.consume(code$3);
		effects.exit("listItemMarker");
		self$1.containerState.marker = self$1.containerState.marker || code$3;
		return effects.check(blankLine, self$1.interrupt ? nok : onBlank, effects.attempt(listItemPrefixWhitespaceConstruct, endOfPrefix, otherPrefix));
	}
	function onBlank(code$3) {
		self$1.containerState.initialBlankLine = true;
		initialSize++;
		return endOfPrefix(code$3);
	}
	function otherPrefix(code$3) {
		if (markdownSpace(code$3)) {
			effects.enter("listItemPrefixWhitespace");
			effects.consume(code$3);
			effects.exit("listItemPrefixWhitespace");
			return endOfPrefix;
		}
		return nok(code$3);
	}
	function endOfPrefix(code$3) {
		self$1.containerState.size = initialSize + self$1.sliceSerialize(effects.exit("listItemPrefix"), true).length;
		return ok$2(code$3);
	}
}
function tokenizeListContinuation(effects, ok$2, nok) {
	const self$1 = this;
	self$1.containerState._closeFlow = void 0;
	return effects.check(blankLine, onBlank, notBlank);
	function onBlank(code$3) {
		self$1.containerState.furtherBlankLines = self$1.containerState.furtherBlankLines || self$1.containerState.initialBlankLine;
		return factorySpace(effects, ok$2, "listItemIndent", self$1.containerState.size + 1)(code$3);
	}
	function notBlank(code$3) {
		if (self$1.containerState.furtherBlankLines || !markdownSpace(code$3)) {
			self$1.containerState.furtherBlankLines = void 0;
			self$1.containerState.initialBlankLine = void 0;
			return notInCurrentItem(code$3);
		}
		self$1.containerState.furtherBlankLines = void 0;
		self$1.containerState.initialBlankLine = void 0;
		return effects.attempt(indentConstruct, ok$2, notInCurrentItem)(code$3);
	}
	function notInCurrentItem(code$3) {
		self$1.containerState._closeFlow = true;
		self$1.interrupt = void 0;
		return factorySpace(effects, effects.attempt(list$2, ok$2, nok), "linePrefix", self$1.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code$3);
	}
}
function tokenizeIndent$1(effects, ok$2, nok) {
	const self$1 = this;
	return factorySpace(effects, afterPrefix, "listItemIndent", self$1.containerState.size + 1);
	function afterPrefix(code$3) {
		const tail = self$1.events[self$1.events.length - 1];
		return tail && tail[1].type === "listItemIndent" && tail[2].sliceSerialize(tail[1], true).length === self$1.containerState.size ? ok$2(code$3) : nok(code$3);
	}
}
function tokenizeListEnd(effects) {
	effects.exit(this.containerState.type);
}
function tokenizeListItemPrefixWhitespace(effects, ok$2, nok) {
	const self$1 = this;
	return factorySpace(effects, afterPrefix, "listItemPrefixWhitespace", self$1.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
	function afterPrefix(code$3) {
		const tail = self$1.events[self$1.events.length - 1];
		return !markdownSpace(code$3) && tail && tail[1].type === "listItemPrefixWhitespace" ? ok$2(code$3) : nok(code$3);
	}
}
const setextUnderline = {
	name: "setextUnderline",
	resolveTo: resolveToSetextUnderline,
	tokenize: tokenizeSetextUnderline
};
function resolveToSetextUnderline(events, context) {
	let index$2 = events.length;
	let content$2;
	let text$6;
	let definition$2;
	while (index$2--) if (events[index$2][0] === "enter") {
		if (events[index$2][1].type === "content") {
			content$2 = index$2;
			break;
		}
		if (events[index$2][1].type === "paragraph") text$6 = index$2;
	} else {
		if (events[index$2][1].type === "content") events.splice(index$2, 1);
		if (!definition$2 && events[index$2][1].type === "definition") definition$2 = index$2;
	}
	const heading$2 = {
		type: "setextHeading",
		start: { ...events[content$2][1].start },
		end: { ...events[events.length - 1][1].end }
	};
	events[text$6][1].type = "setextHeadingText";
	if (definition$2) {
		events.splice(text$6, 0, [
			"enter",
			heading$2,
			context
		]);
		events.splice(definition$2 + 1, 0, [
			"exit",
			events[content$2][1],
			context
		]);
		events[content$2][1].end = { ...events[definition$2][1].end };
	} else events[content$2][1] = heading$2;
	events.push([
		"exit",
		heading$2,
		context
	]);
	return events;
}
function tokenizeSetextUnderline(effects, ok$2, nok) {
	const self$1 = this;
	let marker;
	return start;
	function start(code$3) {
		let index$2 = self$1.events.length;
		let paragraph$2;
		while (index$2--) if (self$1.events[index$2][1].type !== "lineEnding" && self$1.events[index$2][1].type !== "linePrefix" && self$1.events[index$2][1].type !== "content") {
			paragraph$2 = self$1.events[index$2][1].type === "paragraph";
			break;
		}
		if (!self$1.parser.lazy[self$1.now().line] && (self$1.interrupt || paragraph$2)) {
			effects.enter("setextHeadingLine");
			marker = code$3;
			return before(code$3);
		}
		return nok(code$3);
	}
	function before(code$3) {
		effects.enter("setextHeadingLineSequence");
		return inside(code$3);
	}
	function inside(code$3) {
		if (code$3 === marker) {
			effects.consume(code$3);
			return inside;
		}
		effects.exit("setextHeadingLineSequence");
		return markdownSpace(code$3) ? factorySpace(effects, after, "lineSuffix")(code$3) : after(code$3);
	}
	function after(code$3) {
		if (code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("setextHeadingLine");
			return ok$2(code$3);
		}
		return nok(code$3);
	}
}
const flow = { tokenize: initializeFlow };
function initializeFlow(effects) {
	const self$1 = this;
	const initial = effects.attempt(blankLine, atBlankEnding, effects.attempt(this.parser.constructs.flowInitial, afterConstruct, factorySpace(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(content$1, afterConstruct)), "linePrefix")));
	return initial;
	function atBlankEnding(code$3) {
		if (code$3 === null) {
			effects.consume(code$3);
			return;
		}
		effects.enter("lineEndingBlank");
		effects.consume(code$3);
		effects.exit("lineEndingBlank");
		self$1.currentConstruct = void 0;
		return initial;
	}
	function afterConstruct(code$3) {
		if (code$3 === null) {
			effects.consume(code$3);
			return;
		}
		effects.enter("lineEnding");
		effects.consume(code$3);
		effects.exit("lineEnding");
		self$1.currentConstruct = void 0;
		return initial;
	}
}
const resolver = { resolveAll: createResolver() };
const string = initializeFactory("string");
const text$3 = initializeFactory("text");
function initializeFactory(field) {
	return {
		resolveAll: createResolver(field === "text" ? resolveAllLineSuffixes : void 0),
		tokenize: initializeText
	};
	function initializeText(effects) {
		const self$1 = this;
		const constructs$1 = this.parser.constructs[field];
		const text$6 = effects.attempt(constructs$1, start, notText);
		return start;
		function start(code$3) {
			return atBreak(code$3) ? text$6(code$3) : notText(code$3);
		}
		function notText(code$3) {
			if (code$3 === null) {
				effects.consume(code$3);
				return;
			}
			effects.enter("data");
			effects.consume(code$3);
			return data;
		}
		function data(code$3) {
			if (atBreak(code$3)) {
				effects.exit("data");
				return text$6(code$3);
			}
			effects.consume(code$3);
			return data;
		}
		function atBreak(code$3) {
			if (code$3 === null) return true;
			const list$3 = constructs$1[code$3];
			let index$2 = -1;
			if (list$3) while (++index$2 < list$3.length) {
				const item = list$3[index$2];
				if (!item.previous || item.previous.call(self$1, self$1.previous)) return true;
			}
			return false;
		}
	}
}
function createResolver(extraResolver) {
	return resolveAllText;
	function resolveAllText(events, context) {
		let index$2 = -1;
		let enter;
		while (++index$2 <= events.length) if (enter === void 0) {
			if (events[index$2] && events[index$2][1].type === "data") {
				enter = index$2;
				index$2++;
			}
		} else if (!events[index$2] || events[index$2][1].type !== "data") {
			if (index$2 !== enter + 2) {
				events[enter][1].end = events[index$2 - 1][1].end;
				events.splice(enter + 2, index$2 - enter - 2);
				index$2 = enter + 2;
			}
			enter = void 0;
		}
		return extraResolver ? extraResolver(events, context) : events;
	}
}
function resolveAllLineSuffixes(events, context) {
	let eventIndex = 0;
	while (++eventIndex <= events.length) if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
		const data = events[eventIndex - 1][1];
		const chunks = context.sliceStream(data);
		let index$2 = chunks.length;
		let bufferIndex = -1;
		let size = 0;
		let tabs;
		while (index$2--) {
			const chunk = chunks[index$2];
			if (typeof chunk === "string") {
				bufferIndex = chunk.length;
				while (chunk.charCodeAt(bufferIndex - 1) === 32) {
					size++;
					bufferIndex--;
				}
				if (bufferIndex) break;
				bufferIndex = -1;
			} else if (chunk === -2) {
				tabs = true;
				size++;
			} else if (chunk === -1) {} else {
				index$2++;
				break;
			}
		}
		if (context._contentTypeTextTrailing && eventIndex === events.length) size = 0;
		if (size) {
			const token = {
				type: eventIndex === events.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
				start: {
					_bufferIndex: index$2 ? bufferIndex : data.start._bufferIndex + bufferIndex,
					_index: data.start._index + index$2,
					line: data.end.line,
					column: data.end.column - size,
					offset: data.end.offset - size
				},
				end: { ...data.end }
			};
			data.end = { ...token.start };
			if (data.start.offset === data.end.offset) Object.assign(data, token);
			else {
				events.splice(eventIndex, 0, [
					"enter",
					token,
					context
				], [
					"exit",
					token,
					context
				]);
				eventIndex += 2;
			}
		}
		eventIndex++;
	}
	return events;
}
var constructs_exports = /* @__PURE__ */ __export({
	attentionMarkers: () => attentionMarkers,
	contentInitial: () => contentInitial,
	disable: () => disable,
	document: () => document$2,
	flow: () => flow$1,
	flowInitial: () => flowInitial,
	insideSpan: () => insideSpan,
	string: () => string$1,
	text: () => text$4
}, 1);
const document$2 = {
	[42]: list$2,
	[43]: list$2,
	[45]: list$2,
	[48]: list$2,
	[49]: list$2,
	[50]: list$2,
	[51]: list$2,
	[52]: list$2,
	[53]: list$2,
	[54]: list$2,
	[55]: list$2,
	[56]: list$2,
	[57]: list$2,
	[62]: blockQuote
};
const contentInitial = { [91]: definition$1 };
const flowInitial = {
	[-2]: codeIndented,
	[-1]: codeIndented,
	[32]: codeIndented
};
const flow$1 = {
	[35]: headingAtx,
	[42]: thematicBreak$2,
	[45]: [setextUnderline, thematicBreak$2],
	[60]: htmlFlow,
	[61]: setextUnderline,
	[95]: thematicBreak$2,
	[96]: codeFenced,
	[126]: codeFenced
};
const string$1 = {
	[38]: characterReference,
	[92]: characterEscape
};
const text$4 = {
	[-5]: lineEnding,
	[-4]: lineEnding,
	[-3]: lineEnding,
	[33]: labelStartImage,
	[38]: characterReference,
	[42]: attention,
	[60]: [autolink, htmlText],
	[91]: labelStartLink,
	[92]: [hardBreakEscape, characterEscape],
	[93]: labelEnd,
	[95]: attention,
	[96]: codeText
};
const insideSpan = { null: [attention, resolver] };
const attentionMarkers = { null: [42, 95] };
const disable = { null: [] };
function createTokenizer(parser, initialize, from) {
	let point$3 = {
		_bufferIndex: -1,
		_index: 0,
		line: from && from.line || 1,
		column: from && from.column || 1,
		offset: from && from.offset || 0
	};
	const columnStart = {};
	const resolveAllConstructs = [];
	let chunks = [];
	let stack = [];
	const effects = {
		attempt: constructFactory(onsuccessfulconstruct),
		check: constructFactory(onsuccessfulcheck),
		consume,
		enter,
		exit: exit$2,
		interrupt: constructFactory(onsuccessfulcheck, { interrupt: true })
	};
	const context = {
		code: null,
		containerState: {},
		defineSkip,
		events: [],
		now,
		parser,
		previous: null,
		sliceSerialize,
		sliceStream,
		write
	};
	let state = initialize.tokenize.call(context, effects);
	if (initialize.resolveAll) resolveAllConstructs.push(initialize);
	return context;
	function write(slice) {
		chunks = push(chunks, slice);
		main();
		if (chunks[chunks.length - 1] !== null) return [];
		addResult(initialize, 0);
		context.events = resolveAll(resolveAllConstructs, context.events, context);
		return context.events;
	}
	function sliceSerialize(token, expandTabs) {
		return serializeChunks(sliceStream(token), expandTabs);
	}
	function sliceStream(token) {
		return sliceChunks(chunks, token);
	}
	function now() {
		const { _bufferIndex, _index, line, column, offset } = point$3;
		return {
			_bufferIndex,
			_index,
			line,
			column,
			offset
		};
	}
	function defineSkip(value) {
		columnStart[value.line] = value.column;
		accountForPotentialSkip();
	}
	function main() {
		let chunkIndex;
		while (point$3._index < chunks.length) {
			const chunk = chunks[point$3._index];
			if (typeof chunk === "string") {
				chunkIndex = point$3._index;
				if (point$3._bufferIndex < 0) point$3._bufferIndex = 0;
				while (point$3._index === chunkIndex && point$3._bufferIndex < chunk.length) go(chunk.charCodeAt(point$3._bufferIndex));
			} else go(chunk);
		}
	}
	function go(code$3) {
		state = state(code$3);
	}
	function consume(code$3) {
		if (markdownLineEnding(code$3)) {
			point$3.line++;
			point$3.column = 1;
			point$3.offset += code$3 === -3 ? 2 : 1;
			accountForPotentialSkip();
		} else if (code$3 !== -1) {
			point$3.column++;
			point$3.offset++;
		}
		if (point$3._bufferIndex < 0) point$3._index++;
		else {
			point$3._bufferIndex++;
			if (point$3._bufferIndex === chunks[point$3._index].length) {
				point$3._bufferIndex = -1;
				point$3._index++;
			}
		}
		context.previous = code$3;
	}
	function enter(type, fields) {
		const token = fields || {};
		token.type = type;
		token.start = now();
		context.events.push([
			"enter",
			token,
			context
		]);
		stack.push(token);
		return token;
	}
	function exit$2(type) {
		const token = stack.pop();
		token.end = now();
		context.events.push([
			"exit",
			token,
			context
		]);
		return token;
	}
	function onsuccessfulconstruct(construct, info) {
		addResult(construct, info.from);
	}
	function onsuccessfulcheck(_, info) {
		info.restore();
	}
	function constructFactory(onreturn, fields) {
		return hook;
		function hook(constructs$1, returnState, bogusState) {
			let listOfConstructs;
			let constructIndex;
			let currentConstruct;
			let info;
			return Array.isArray(constructs$1) ? handleListOfConstructs(constructs$1) : "tokenize" in constructs$1 ? handleListOfConstructs([constructs$1]) : handleMapOfConstructs(constructs$1);
			function handleMapOfConstructs(map$2) {
				return start;
				function start(code$3) {
					const left = code$3 !== null && map$2[code$3];
					const all$1 = code$3 !== null && map$2.null;
					return handleListOfConstructs([...Array.isArray(left) ? left : left ? [left] : [], ...Array.isArray(all$1) ? all$1 : all$1 ? [all$1] : []])(code$3);
				}
			}
			function handleListOfConstructs(list$3) {
				listOfConstructs = list$3;
				constructIndex = 0;
				if (list$3.length === 0) return bogusState;
				return handleConstruct(list$3[constructIndex]);
			}
			function handleConstruct(construct) {
				return start;
				function start(code$3) {
					info = store();
					currentConstruct = construct;
					if (!construct.partial) context.currentConstruct = construct;
					if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) return nok(code$3);
					return construct.tokenize.call(fields ? Object.assign(Object.create(context), fields) : context, effects, ok$2, nok)(code$3);
				}
			}
			function ok$2(code$3) {
				onreturn(currentConstruct, info);
				return returnState;
			}
			function nok(code$3) {
				info.restore();
				if (++constructIndex < listOfConstructs.length) return handleConstruct(listOfConstructs[constructIndex]);
				return bogusState;
			}
		}
	}
	function addResult(construct, from$1) {
		if (construct.resolveAll && !resolveAllConstructs.includes(construct)) resolveAllConstructs.push(construct);
		if (construct.resolve) splice(context.events, from$1, context.events.length - from$1, construct.resolve(context.events.slice(from$1), context));
		if (construct.resolveTo) context.events = construct.resolveTo(context.events, context);
	}
	function store() {
		const startPoint = now();
		const startPrevious = context.previous;
		const startCurrentConstruct = context.currentConstruct;
		const startEventsIndex = context.events.length;
		const startStack = Array.from(stack);
		return {
			from: startEventsIndex,
			restore
		};
		function restore() {
			point$3 = startPoint;
			context.previous = startPrevious;
			context.currentConstruct = startCurrentConstruct;
			context.events.length = startEventsIndex;
			stack = startStack;
			accountForPotentialSkip();
		}
	}
	function accountForPotentialSkip() {
		if (point$3.line in columnStart && point$3.column < 2) {
			point$3.column = columnStart[point$3.line];
			point$3.offset += columnStart[point$3.line] - 1;
		}
	}
}
function sliceChunks(chunks, token) {
	const startIndex = token.start._index;
	const startBufferIndex = token.start._bufferIndex;
	const endIndex = token.end._index;
	const endBufferIndex = token.end._bufferIndex;
	let view;
	if (startIndex === endIndex) view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
	else {
		view = chunks.slice(startIndex, endIndex);
		if (startBufferIndex > -1) {
			const head = view[0];
			if (typeof head === "string") view[0] = head.slice(startBufferIndex);
			else view.shift();
		}
		if (endBufferIndex > 0) view.push(chunks[endIndex].slice(0, endBufferIndex));
	}
	return view;
}
function serializeChunks(chunks, expandTabs) {
	let index$2 = -1;
	const result = [];
	let atTab;
	while (++index$2 < chunks.length) {
		const chunk = chunks[index$2];
		let value;
		if (typeof chunk === "string") value = chunk;
		else switch (chunk) {
			case -5:
				value = "\r";
				break;
			case -4:
				value = "\n";
				break;
			case -3:
				value = "\r\n";
				break;
			case -2:
				value = expandTabs ? " " : "	";
				break;
			case -1:
				if (!expandTabs && atTab) continue;
				value = " ";
				break;
			default: value = String.fromCharCode(chunk);
		}
		atTab = chunk === -2;
		result.push(value);
	}
	return result.join("");
}
function parse(options) {
	const parser = {
		constructs: combineExtensions([constructs_exports, ...(options || {}).extensions || []]),
		content: create(content),
		defined: [],
		document: create(document$1),
		flow: create(flow),
		lazy: {},
		string: create(string),
		text: create(text$3)
	};
	return parser;
	function create(initial) {
		return creator;
		function creator(from) {
			return createTokenizer(parser, initial, from);
		}
	}
}
function postprocess(events) {
	while (!subtokenize(events));
	return events;
}
var search = /[\0\t\n\r]/g;
function preprocess() {
	let column = 1;
	let buffer = "";
	let start = true;
	let atCarriageReturn;
	return preprocessor;
	function preprocessor(value, encoding, end) {
		const chunks = [];
		let match;
		let next;
		let startPosition;
		let endPosition;
		let code$3;
		value = buffer + (typeof value === "string" ? value.toString() : new TextDecoder(encoding || void 0).decode(value));
		startPosition = 0;
		buffer = "";
		if (start) {
			if (value.charCodeAt(0) === 65279) startPosition++;
			start = void 0;
		}
		while (startPosition < value.length) {
			search.lastIndex = startPosition;
			match = search.exec(value);
			endPosition = match && match.index !== void 0 ? match.index : value.length;
			code$3 = value.charCodeAt(endPosition);
			if (!match) {
				buffer = value.slice(startPosition);
				break;
			}
			if (code$3 === 10 && startPosition === endPosition && atCarriageReturn) {
				chunks.push(-3);
				atCarriageReturn = void 0;
			} else {
				if (atCarriageReturn) {
					chunks.push(-5);
					atCarriageReturn = void 0;
				}
				if (startPosition < endPosition) {
					chunks.push(value.slice(startPosition, endPosition));
					column += endPosition - startPosition;
				}
				switch (code$3) {
					case 0:
						chunks.push(65533);
						column++;
						break;
					case 9:
						next = Math.ceil(column / 4) * 4;
						chunks.push(-2);
						while (column++ < next) chunks.push(-1);
						break;
					case 10:
						chunks.push(-4);
						column = 1;
						break;
					default:
						atCarriageReturn = true;
						column = 1;
				}
			}
			startPosition = endPosition + 1;
		}
		if (end) {
			if (atCarriageReturn) chunks.push(-5);
			if (buffer) chunks.push(buffer);
			chunks.push(null);
		}
		return chunks;
	}
}
var characterEscapeOrReference = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function decodeString(value) {
	return value.replace(characterEscapeOrReference, decode);
}
function decode($0, $1, $2) {
	if ($1) return $1;
	if ($2.charCodeAt(0) === 35) {
		const head = $2.charCodeAt(1);
		const hex = head === 120 || head === 88;
		return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? 16 : 10);
	}
	return decodeNamedCharacterReference($2) || $0;
}
var own$2 = {}.hasOwnProperty;
function fromMarkdown(value, encoding, options) {
	if (encoding && typeof encoding === "object") {
		options = encoding;
		encoding = void 0;
	}
	return compiler(options)(postprocess(parse(options).document().write(preprocess()(value, encoding, true))));
}
function compiler(options) {
	const config = {
		transforms: [],
		canContainEols: [
			"emphasis",
			"fragment",
			"heading",
			"paragraph",
			"strong"
		],
		enter: {
			autolink: opener(link$2),
			autolinkProtocol: onenterdata,
			autolinkEmail: onenterdata,
			atxHeading: opener(heading$2),
			blockQuote: opener(blockQuote$1),
			characterEscape: onenterdata,
			characterReference: onenterdata,
			codeFenced: opener(codeFlow),
			codeFencedFenceInfo: buffer,
			codeFencedFenceMeta: buffer,
			codeIndented: opener(codeFlow, buffer),
			codeText: opener(codeText$1, buffer),
			codeTextData: onenterdata,
			data: onenterdata,
			codeFlowValue: onenterdata,
			definition: opener(definition$2),
			definitionDestinationString: buffer,
			definitionLabelString: buffer,
			definitionTitleString: buffer,
			emphasis: opener(emphasis$2),
			hardBreakEscape: opener(hardBreak$2),
			hardBreakTrailing: opener(hardBreak$2),
			htmlFlow: opener(html$3, buffer),
			htmlFlowData: onenterdata,
			htmlText: opener(html$3, buffer),
			htmlTextData: onenterdata,
			image: opener(image$2),
			label: buffer,
			link: opener(link$2),
			listItem: opener(listItem$2),
			listItemValue: onenterlistitemvalue,
			listOrdered: opener(list$3, onenterlistordered),
			listUnordered: opener(list$3),
			paragraph: opener(paragraph$2),
			reference: onenterreference,
			referenceString: buffer,
			resourceDestinationString: buffer,
			resourceTitleString: buffer,
			setextHeading: opener(heading$2),
			strong: opener(strong$2),
			thematicBreak: opener(thematicBreak$3)
		},
		exit: {
			atxHeading: closer(),
			atxHeadingSequence: onexitatxheadingsequence,
			autolink: closer(),
			autolinkEmail: onexitautolinkemail,
			autolinkProtocol: onexitautolinkprotocol,
			blockQuote: closer(),
			characterEscapeValue: onexitdata,
			characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
			characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
			characterReferenceValue: onexitcharacterreferencevalue,
			characterReference: onexitcharacterreference,
			codeFenced: closer(onexitcodefenced),
			codeFencedFence: onexitcodefencedfence,
			codeFencedFenceInfo: onexitcodefencedfenceinfo,
			codeFencedFenceMeta: onexitcodefencedfencemeta,
			codeFlowValue: onexitdata,
			codeIndented: closer(onexitcodeindented),
			codeText: closer(onexitcodetext),
			codeTextData: onexitdata,
			data: onexitdata,
			definition: closer(),
			definitionDestinationString: onexitdefinitiondestinationstring,
			definitionLabelString: onexitdefinitionlabelstring,
			definitionTitleString: onexitdefinitiontitlestring,
			emphasis: closer(),
			hardBreakEscape: closer(onexithardbreak),
			hardBreakTrailing: closer(onexithardbreak),
			htmlFlow: closer(onexithtmlflow),
			htmlFlowData: onexitdata,
			htmlText: closer(onexithtmltext),
			htmlTextData: onexitdata,
			image: closer(onexitimage),
			label: onexitlabel,
			labelText: onexitlabeltext,
			lineEnding: onexitlineending,
			link: closer(onexitlink),
			listItem: closer(),
			listOrdered: closer(),
			listUnordered: closer(),
			paragraph: closer(),
			referenceString: onexitreferencestring,
			resourceDestinationString: onexitresourcedestinationstring,
			resourceTitleString: onexitresourcetitlestring,
			resource: onexitresource,
			setextHeading: closer(onexitsetextheading),
			setextHeadingLineSequence: onexitsetextheadinglinesequence,
			setextHeadingText: onexitsetextheadingtext,
			strong: closer(),
			thematicBreak: closer()
		}
	};
	configure(config, (options || {}).mdastExtensions || []);
	const data = {};
	return compile;
	function compile(events) {
		let tree = {
			type: "root",
			children: []
		};
		const context = {
			stack: [tree],
			tokenStack: [],
			config,
			enter,
			exit: exit$2,
			buffer,
			resume,
			data
		};
		const listStack = [];
		let index$2 = -1;
		while (++index$2 < events.length) if (events[index$2][1].type === "listOrdered" || events[index$2][1].type === "listUnordered") if (events[index$2][0] === "enter") listStack.push(index$2);
		else index$2 = prepareList(events, listStack.pop(), index$2);
		index$2 = -1;
		while (++index$2 < events.length) {
			const handler = config[events[index$2][0]];
			if (own$2.call(handler, events[index$2][1].type)) handler[events[index$2][1].type].call(Object.assign({ sliceSerialize: events[index$2][2].sliceSerialize }, context), events[index$2][1]);
		}
		if (context.tokenStack.length > 0) {
			const tail = context.tokenStack[context.tokenStack.length - 1];
			(tail[1] || defaultOnError).call(context, void 0, tail[0]);
		}
		tree.position = {
			start: point(events.length > 0 ? events[0][1].start : {
				line: 1,
				column: 1,
				offset: 0
			}),
			end: point(events.length > 0 ? events[events.length - 2][1].end : {
				line: 1,
				column: 1,
				offset: 0
			})
		};
		index$2 = -1;
		while (++index$2 < config.transforms.length) tree = config.transforms[index$2](tree) || tree;
		return tree;
	}
	function prepareList(events, start, length) {
		let index$2 = start - 1;
		let containerBalance = -1;
		let listSpread = false;
		let listItem$3;
		let lineIndex;
		let firstBlankLineIndex;
		let atMarker;
		while (++index$2 <= length) {
			const event = events[index$2];
			switch (event[1].type) {
				case "listUnordered":
				case "listOrdered":
				case "blockQuote":
					if (event[0] === "enter") containerBalance++;
					else containerBalance--;
					atMarker = void 0;
					break;
				case "lineEndingBlank":
					if (event[0] === "enter") {
						if (listItem$3 && !atMarker && !containerBalance && !firstBlankLineIndex) firstBlankLineIndex = index$2;
						atMarker = void 0;
					}
					break;
				case "linePrefix":
				case "listItemValue":
				case "listItemMarker":
				case "listItemPrefix":
				case "listItemPrefixWhitespace": break;
				default: atMarker = void 0;
			}
			if (!containerBalance && event[0] === "enter" && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === "exit" && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
				if (listItem$3) {
					let tailIndex = index$2;
					lineIndex = void 0;
					while (tailIndex--) {
						const tailEvent = events[tailIndex];
						if (tailEvent[1].type === "lineEnding" || tailEvent[1].type === "lineEndingBlank") {
							if (tailEvent[0] === "exit") continue;
							if (lineIndex) {
								events[lineIndex][1].type = "lineEndingBlank";
								listSpread = true;
							}
							tailEvent[1].type = "lineEnding";
							lineIndex = tailIndex;
						} else if (tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent") {} else break;
					}
					if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) listItem$3._spread = true;
					listItem$3.end = Object.assign({}, lineIndex ? events[lineIndex][1].start : event[1].end);
					events.splice(lineIndex || index$2, 0, [
						"exit",
						listItem$3,
						event[2]
					]);
					index$2++;
					length++;
				}
				if (event[1].type === "listItemPrefix") {
					const item = {
						type: "listItem",
						_spread: false,
						start: Object.assign({}, event[1].start),
						end: void 0
					};
					listItem$3 = item;
					events.splice(index$2, 0, [
						"enter",
						item,
						event[2]
					]);
					index$2++;
					length++;
					firstBlankLineIndex = void 0;
					atMarker = true;
				}
			}
		}
		events[start][1]._spread = listSpread;
		return length;
	}
	function opener(create, and) {
		return open;
		function open(token) {
			enter.call(this, create(token), token);
			if (and) and.call(this, token);
		}
	}
	function buffer() {
		this.stack.push({
			type: "fragment",
			children: []
		});
	}
	function enter(node$1, token, errorHandler) {
		this.stack[this.stack.length - 1].children.push(node$1);
		this.stack.push(node$1);
		this.tokenStack.push([token, errorHandler || void 0]);
		node$1.position = {
			start: point(token.start),
			end: void 0
		};
	}
	function closer(and) {
		return close;
		function close(token) {
			if (and) and.call(this, token);
			exit$2.call(this, token);
		}
	}
	function exit$2(token, onExitError) {
		const node$1 = this.stack.pop();
		const open = this.tokenStack.pop();
		if (!open) throw new Error("Cannot close `" + token.type + "` (" + stringifyPosition({
			start: token.start,
			end: token.end
		}) + "): it’s not open");
		else if (open[0].type !== token.type) if (onExitError) onExitError.call(this, token, open[0]);
		else (open[1] || defaultOnError).call(this, token, open[0]);
		node$1.position.end = point(token.end);
	}
	function resume() {
		return toString(this.stack.pop());
	}
	function onenterlistordered() {
		this.data.expectingFirstListItemValue = true;
	}
	function onenterlistitemvalue(token) {
		if (this.data.expectingFirstListItemValue) {
			const ancestor = this.stack[this.stack.length - 2];
			ancestor.start = Number.parseInt(this.sliceSerialize(token), 10);
			this.data.expectingFirstListItemValue = void 0;
		}
	}
	function onexitcodefencedfenceinfo() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.lang = data$1;
	}
	function onexitcodefencedfencemeta() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.meta = data$1;
	}
	function onexitcodefencedfence() {
		if (this.data.flowCodeInside) return;
		this.buffer();
		this.data.flowCodeInside = true;
	}
	function onexitcodefenced() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.value = data$1.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
		this.data.flowCodeInside = void 0;
	}
	function onexitcodeindented() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.value = data$1.replace(/(\r?\n|\r)$/g, "");
	}
	function onexitdefinitionlabelstring(token) {
		const label = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.label = label;
		node$1.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
	}
	function onexitdefinitiontitlestring() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.title = data$1;
	}
	function onexitdefinitiondestinationstring() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.url = data$1;
	}
	function onexitatxheadingsequence(token) {
		const node$1 = this.stack[this.stack.length - 1];
		if (!node$1.depth) node$1.depth = this.sliceSerialize(token).length;
	}
	function onexitsetextheadingtext() {
		this.data.setextHeadingSlurpLineEnding = true;
	}
	function onexitsetextheadinglinesequence(token) {
		const node$1 = this.stack[this.stack.length - 1];
		node$1.depth = this.sliceSerialize(token).codePointAt(0) === 61 ? 1 : 2;
	}
	function onexitsetextheading() {
		this.data.setextHeadingSlurpLineEnding = void 0;
	}
	function onenterdata(token) {
		const siblings = this.stack[this.stack.length - 1].children;
		let tail = siblings[siblings.length - 1];
		if (!tail || tail.type !== "text") {
			tail = text$6();
			tail.position = {
				start: point(token.start),
				end: void 0
			};
			siblings.push(tail);
		}
		this.stack.push(tail);
	}
	function onexitdata(token) {
		const tail = this.stack.pop();
		tail.value += this.sliceSerialize(token);
		tail.position.end = point(token.end);
	}
	function onexitlineending(token) {
		const context = this.stack[this.stack.length - 1];
		if (this.data.atHardBreak) {
			const tail = context.children[context.children.length - 1];
			tail.position.end = point(token.end);
			this.data.atHardBreak = void 0;
			return;
		}
		if (!this.data.setextHeadingSlurpLineEnding && config.canContainEols.includes(context.type)) {
			onenterdata.call(this, token);
			onexitdata.call(this, token);
		}
	}
	function onexithardbreak() {
		this.data.atHardBreak = true;
	}
	function onexithtmlflow() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.value = data$1;
	}
	function onexithtmltext() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.value = data$1;
	}
	function onexitcodetext() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.value = data$1;
	}
	function onexitlink() {
		const node$1 = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			const referenceType = this.data.referenceType || "shortcut";
			node$1.type += "Reference";
			node$1.referenceType = referenceType;
			delete node$1.url;
			delete node$1.title;
		} else {
			delete node$1.identifier;
			delete node$1.label;
		}
		this.data.referenceType = void 0;
	}
	function onexitimage() {
		const node$1 = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			const referenceType = this.data.referenceType || "shortcut";
			node$1.type += "Reference";
			node$1.referenceType = referenceType;
			delete node$1.url;
			delete node$1.title;
		} else {
			delete node$1.identifier;
			delete node$1.label;
		}
		this.data.referenceType = void 0;
	}
	function onexitlabeltext(token) {
		const string$2 = this.sliceSerialize(token);
		const ancestor = this.stack[this.stack.length - 2];
		ancestor.label = decodeString(string$2);
		ancestor.identifier = normalizeIdentifier(string$2).toLowerCase();
	}
	function onexitlabel() {
		const fragment = this.stack[this.stack.length - 1];
		const value = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		this.data.inReference = true;
		if (node$1.type === "link") node$1.children = fragment.children;
		else node$1.alt = value;
	}
	function onexitresourcedestinationstring() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.url = data$1;
	}
	function onexitresourcetitlestring() {
		const data$1 = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.title = data$1;
	}
	function onexitresource() {
		this.data.inReference = void 0;
	}
	function onenterreference() {
		this.data.referenceType = "collapsed";
	}
	function onexitreferencestring(token) {
		const label = this.resume();
		const node$1 = this.stack[this.stack.length - 1];
		node$1.label = label;
		node$1.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
		this.data.referenceType = "full";
	}
	function onexitcharacterreferencemarker(token) {
		this.data.characterReferenceType = token.type;
	}
	function onexitcharacterreferencevalue(token) {
		const data$1 = this.sliceSerialize(token);
		const type = this.data.characterReferenceType;
		let value;
		if (type) {
			value = decodeNumericCharacterReference(data$1, type === "characterReferenceMarkerNumeric" ? 10 : 16);
			this.data.characterReferenceType = void 0;
		} else value = decodeNamedCharacterReference(data$1);
		const tail = this.stack[this.stack.length - 1];
		tail.value += value;
	}
	function onexitcharacterreference(token) {
		const tail = this.stack.pop();
		tail.position.end = point(token.end);
	}
	function onexitautolinkprotocol(token) {
		onexitdata.call(this, token);
		const node$1 = this.stack[this.stack.length - 1];
		node$1.url = this.sliceSerialize(token);
	}
	function onexitautolinkemail(token) {
		onexitdata.call(this, token);
		const node$1 = this.stack[this.stack.length - 1];
		node$1.url = "mailto:" + this.sliceSerialize(token);
	}
	function blockQuote$1() {
		return {
			type: "blockquote",
			children: []
		};
	}
	function codeFlow() {
		return {
			type: "code",
			lang: null,
			meta: null,
			value: ""
		};
	}
	function codeText$1() {
		return {
			type: "inlineCode",
			value: ""
		};
	}
	function definition$2() {
		return {
			type: "definition",
			identifier: "",
			label: null,
			title: null,
			url: ""
		};
	}
	function emphasis$2() {
		return {
			type: "emphasis",
			children: []
		};
	}
	function heading$2() {
		return {
			type: "heading",
			depth: 0,
			children: []
		};
	}
	function hardBreak$2() {
		return { type: "break" };
	}
	function html$3() {
		return {
			type: "html",
			value: ""
		};
	}
	function image$2() {
		return {
			type: "image",
			title: null,
			url: "",
			alt: null
		};
	}
	function link$2() {
		return {
			type: "link",
			title: null,
			url: "",
			children: []
		};
	}
	function list$3(token) {
		return {
			type: "list",
			ordered: token.type === "listOrdered",
			start: null,
			spread: token._spread,
			children: []
		};
	}
	function listItem$2(token) {
		return {
			type: "listItem",
			spread: token._spread,
			checked: null,
			children: []
		};
	}
	function paragraph$2() {
		return {
			type: "paragraph",
			children: []
		};
	}
	function strong$2() {
		return {
			type: "strong",
			children: []
		};
	}
	function text$6() {
		return {
			type: "text",
			value: ""
		};
	}
	function thematicBreak$3() {
		return { type: "thematicBreak" };
	}
}
function point(d) {
	return {
		line: d.line,
		column: d.column,
		offset: d.offset
	};
}
function configure(combined, extensions) {
	let index$2 = -1;
	while (++index$2 < extensions.length) {
		const value = extensions[index$2];
		if (Array.isArray(value)) configure(combined, value);
		else extension(combined, value);
	}
}
function extension(combined, extension$1) {
	let key;
	for (key in extension$1) if (own$2.call(extension$1, key)) switch (key) {
		case "canContainEols": {
			const right = extension$1[key];
			if (right) combined[key].push(...right);
			break;
		}
		case "transforms": {
			const right = extension$1[key];
			if (right) combined[key].push(...right);
			break;
		}
		case "enter":
		case "exit": {
			const right = extension$1[key];
			if (right) Object.assign(combined[key], right);
			break;
		}
	}
}
function defaultOnError(left, right) {
	if (left) throw new Error("Cannot close `" + left.type + "` (" + stringifyPosition({
		start: left.start,
		end: left.end
	}) + "): a different token (`" + right.type + "`, " + stringifyPosition({
		start: right.start,
		end: right.end
	}) + ") is open");
	else throw new Error("Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
		start: right.start,
		end: right.end
	}) + ") is still open");
}
function remarkParse(options) {
	const self$1 = this;
	self$1.parser = parser;
	function parser(doc) {
		return fromMarkdown(doc, {
			...self$1.data("settings"),
			...options,
			extensions: self$1.data("micromarkExtensions") || [],
			mdastExtensions: self$1.data("fromMarkdownExtensions") || []
		});
	}
}
function blockquote$1(state, node$1) {
	const result = {
		type: "element",
		tagName: "blockquote",
		properties: {},
		children: state.wrap(state.all(node$1), true)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function hardBreak$1(state, node$1) {
	const result = {
		type: "element",
		tagName: "br",
		properties: {},
		children: []
	};
	state.patch(node$1, result);
	return [state.applyData(node$1, result), {
		type: "text",
		value: "\n"
	}];
}
function code$2(state, node$1) {
	const value = node$1.value ? node$1.value + "\n" : "";
	const properties = {};
	const language = node$1.lang ? node$1.lang.split(/\s+/) : [];
	if (language.length > 0) properties.className = ["language-" + language[0]];
	let result = {
		type: "element",
		tagName: "code",
		properties,
		children: [{
			type: "text",
			value
		}]
	};
	if (node$1.meta) result.data = { meta: node$1.meta };
	state.patch(node$1, result);
	result = state.applyData(node$1, result);
	result = {
		type: "element",
		tagName: "pre",
		properties: {},
		children: [result]
	};
	state.patch(node$1, result);
	return result;
}
function strikethrough(state, node$1) {
	const result = {
		type: "element",
		tagName: "del",
		properties: {},
		children: state.all(node$1)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function emphasis$1(state, node$1) {
	const result = {
		type: "element",
		tagName: "em",
		properties: {},
		children: state.all(node$1)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function footnoteReference$1(state, node$1) {
	const clobberPrefix = typeof state.options.clobberPrefix === "string" ? state.options.clobberPrefix : "user-content-";
	const id = String(node$1.identifier).toUpperCase();
	const safeId = normalizeUri(id.toLowerCase());
	const index$2 = state.footnoteOrder.indexOf(id);
	let counter;
	let reuseCounter = state.footnoteCounts.get(id);
	if (reuseCounter === void 0) {
		reuseCounter = 0;
		state.footnoteOrder.push(id);
		counter = state.footnoteOrder.length;
	} else counter = index$2 + 1;
	reuseCounter += 1;
	state.footnoteCounts.set(id, reuseCounter);
	const link$2 = {
		type: "element",
		tagName: "a",
		properties: {
			href: "#" + clobberPrefix + "fn-" + safeId,
			id: clobberPrefix + "fnref-" + safeId + (reuseCounter > 1 ? "-" + reuseCounter : ""),
			dataFootnoteRef: true,
			ariaDescribedBy: ["footnote-label"]
		},
		children: [{
			type: "text",
			value: String(counter)
		}]
	};
	state.patch(node$1, link$2);
	const sup = {
		type: "element",
		tagName: "sup",
		properties: {},
		children: [link$2]
	};
	state.patch(node$1, sup);
	return state.applyData(node$1, sup);
}
function heading$1(state, node$1) {
	const result = {
		type: "element",
		tagName: "h" + node$1.depth,
		properties: {},
		children: state.all(node$1)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function html$1(state, node$1) {
	if (state.options.allowDangerousHtml) {
		const result = {
			type: "raw",
			value: node$1.value
		};
		state.patch(node$1, result);
		return state.applyData(node$1, result);
	}
}
function revert(state, node$1) {
	const subtype = node$1.referenceType;
	let suffix = "]";
	if (subtype === "collapsed") suffix += "[]";
	else if (subtype === "full") suffix += "[" + (node$1.label || node$1.identifier) + "]";
	if (node$1.type === "imageReference") return [{
		type: "text",
		value: "![" + node$1.alt + suffix
	}];
	const contents = state.all(node$1);
	const head = contents[0];
	if (head && head.type === "text") head.value = "[" + head.value;
	else contents.unshift({
		type: "text",
		value: "["
	});
	const tail = contents[contents.length - 1];
	if (tail && tail.type === "text") tail.value += suffix;
	else contents.push({
		type: "text",
		value: suffix
	});
	return contents;
}
function imageReference$1(state, node$1) {
	const id = String(node$1.identifier).toUpperCase();
	const definition$2 = state.definitionById.get(id);
	if (!definition$2) return revert(state, node$1);
	const properties = {
		src: normalizeUri(definition$2.url || ""),
		alt: node$1.alt
	};
	if (definition$2.title !== null && definition$2.title !== void 0) properties.title = definition$2.title;
	const result = {
		type: "element",
		tagName: "img",
		properties,
		children: []
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function image$1(state, node$1) {
	const properties = { src: normalizeUri(node$1.url) };
	if (node$1.alt !== null && node$1.alt !== void 0) properties.alt = node$1.alt;
	if (node$1.title !== null && node$1.title !== void 0) properties.title = node$1.title;
	const result = {
		type: "element",
		tagName: "img",
		properties,
		children: []
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function inlineCode$1(state, node$1) {
	const text$6 = {
		type: "text",
		value: node$1.value.replace(/\r?\n|\r/g, " ")
	};
	state.patch(node$1, text$6);
	const result = {
		type: "element",
		tagName: "code",
		properties: {},
		children: [text$6]
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function linkReference$1(state, node$1) {
	const id = String(node$1.identifier).toUpperCase();
	const definition$2 = state.definitionById.get(id);
	if (!definition$2) return revert(state, node$1);
	const properties = { href: normalizeUri(definition$2.url || "") };
	if (definition$2.title !== null && definition$2.title !== void 0) properties.title = definition$2.title;
	const result = {
		type: "element",
		tagName: "a",
		properties,
		children: state.all(node$1)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function link$1(state, node$1) {
	const properties = { href: normalizeUri(node$1.url) };
	if (node$1.title !== null && node$1.title !== void 0) properties.title = node$1.title;
	const result = {
		type: "element",
		tagName: "a",
		properties,
		children: state.all(node$1)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function listItem$1(state, node$1, parent) {
	const results = state.all(node$1);
	const loose = parent ? listLoose(parent) : listItemLoose(node$1);
	const properties = {};
	const children = [];
	if (typeof node$1.checked === "boolean") {
		const head = results[0];
		let paragraph$2;
		if (head && head.type === "element" && head.tagName === "p") paragraph$2 = head;
		else {
			paragraph$2 = {
				type: "element",
				tagName: "p",
				properties: {},
				children: []
			};
			results.unshift(paragraph$2);
		}
		if (paragraph$2.children.length > 0) paragraph$2.children.unshift({
			type: "text",
			value: " "
		});
		paragraph$2.children.unshift({
			type: "element",
			tagName: "input",
			properties: {
				type: "checkbox",
				checked: node$1.checked,
				disabled: true
			},
			children: []
		});
		properties.className = ["task-list-item"];
	}
	let index$2 = -1;
	while (++index$2 < results.length) {
		const child = results[index$2];
		if (loose || index$2 !== 0 || child.type !== "element" || child.tagName !== "p") children.push({
			type: "text",
			value: "\n"
		});
		if (child.type === "element" && child.tagName === "p" && !loose) children.push(...child.children);
		else children.push(child);
	}
	const tail = results[results.length - 1];
	if (tail && (loose || tail.type !== "element" || tail.tagName !== "p")) children.push({
		type: "text",
		value: "\n"
	});
	const result = {
		type: "element",
		tagName: "li",
		properties,
		children
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function listLoose(node$1) {
	let loose = false;
	if (node$1.type === "list") {
		loose = node$1.spread || false;
		const children = node$1.children;
		let index$2 = -1;
		while (!loose && ++index$2 < children.length) loose = listItemLoose(children[index$2]);
	}
	return loose;
}
function listItemLoose(node$1) {
	const spread = node$1.spread;
	return spread === null || spread === void 0 ? node$1.children.length > 1 : spread;
}
function list$1(state, node$1) {
	const properties = {};
	const results = state.all(node$1);
	let index$2 = -1;
	if (typeof node$1.start === "number" && node$1.start !== 1) properties.start = node$1.start;
	while (++index$2 < results.length) {
		const child = results[index$2];
		if (child.type === "element" && child.tagName === "li" && child.properties && Array.isArray(child.properties.className) && child.properties.className.includes("task-list-item")) {
			properties.className = ["contains-task-list"];
			break;
		}
	}
	const result = {
		type: "element",
		tagName: node$1.ordered ? "ol" : "ul",
		properties,
		children: state.wrap(results, true)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function paragraph$1(state, node$1) {
	const result = {
		type: "element",
		tagName: "p",
		properties: {},
		children: state.all(node$1)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function root$1(state, node$1) {
	const result = {
		type: "root",
		children: state.wrap(state.all(node$1))
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function strong$1(state, node$1) {
	const result = {
		type: "element",
		tagName: "strong",
		properties: {},
		children: state.all(node$1)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function table(state, node$1) {
	const rows = state.all(node$1);
	const firstRow = rows.shift();
	const tableContent = [];
	if (firstRow) {
		const head = {
			type: "element",
			tagName: "thead",
			properties: {},
			children: state.wrap([firstRow], true)
		};
		state.patch(node$1.children[0], head);
		tableContent.push(head);
	}
	if (rows.length > 0) {
		const body = {
			type: "element",
			tagName: "tbody",
			properties: {},
			children: state.wrap(rows, true)
		};
		const start = pointStart(node$1.children[1]);
		const end = pointEnd(node$1.children[node$1.children.length - 1]);
		if (start && end) body.position = {
			start,
			end
		};
		tableContent.push(body);
	}
	const result = {
		type: "element",
		tagName: "table",
		properties: {},
		children: state.wrap(tableContent, true)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function tableRow(state, node$1, parent) {
	const siblings = parent ? parent.children : void 0;
	const tagName = (siblings ? siblings.indexOf(node$1) : 1) === 0 ? "th" : "td";
	const align = parent && parent.type === "table" ? parent.align : void 0;
	const length = align ? align.length : node$1.children.length;
	let cellIndex = -1;
	const cells = [];
	while (++cellIndex < length) {
		const cell = node$1.children[cellIndex];
		const properties = {};
		const alignValue = align ? align[cellIndex] : void 0;
		if (alignValue) properties.align = alignValue;
		let result$1 = {
			type: "element",
			tagName,
			properties,
			children: []
		};
		if (cell) {
			result$1.children = state.all(cell);
			state.patch(cell, result$1);
			result$1 = state.applyData(cell, result$1);
		}
		cells.push(result$1);
	}
	const result = {
		type: "element",
		tagName: "tr",
		properties: {},
		children: state.wrap(cells, true)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function tableCell(state, node$1) {
	const result = {
		type: "element",
		tagName: "td",
		properties: {},
		children: state.all(node$1)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
var tab = 9;
var space = 32;
function trimLines(value) {
	const source = String(value);
	const search$1 = /\r?\n|\r/g;
	let match = search$1.exec(source);
	let last = 0;
	const lines = [];
	while (match) {
		lines.push(trimLine(source.slice(last, match.index), last > 0, true), match[0]);
		last = match.index + match[0].length;
		match = search$1.exec(source);
	}
	lines.push(trimLine(source.slice(last), last > 0, false));
	return lines.join("");
}
function trimLine(value, start, end) {
	let startIndex = 0;
	let endIndex = value.length;
	if (start) {
		let code$3 = value.codePointAt(startIndex);
		while (code$3 === tab || code$3 === space) {
			startIndex++;
			code$3 = value.codePointAt(startIndex);
		}
	}
	if (end) {
		let code$3 = value.codePointAt(endIndex - 1);
		while (code$3 === tab || code$3 === space) {
			endIndex--;
			code$3 = value.codePointAt(endIndex - 1);
		}
	}
	return endIndex > startIndex ? value.slice(startIndex, endIndex) : "";
}
function text$2(state, node$1) {
	const result = {
		type: "text",
		value: trimLines(String(node$1.value))
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function thematicBreak$1(state, node$1) {
	const result = {
		type: "element",
		tagName: "hr",
		properties: {},
		children: []
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
const handlers = {
	blockquote: blockquote$1,
	break: hardBreak$1,
	code: code$2,
	delete: strikethrough,
	emphasis: emphasis$1,
	footnoteReference: footnoteReference$1,
	heading: heading$1,
	html: html$1,
	imageReference: imageReference$1,
	image: image$1,
	inlineCode: inlineCode$1,
	linkReference: linkReference$1,
	link: link$1,
	listItem: listItem$1,
	list: list$1,
	paragraph: paragraph$1,
	root: root$1,
	strong: strong$1,
	table,
	tableCell,
	tableRow,
	text: text$2,
	thematicBreak: thematicBreak$1,
	toml: ignore,
	yaml: ignore,
	definition: ignore,
	footnoteDefinition: ignore
};
function ignore() {}
var env = typeof self === "object" ? self : globalThis;
var deserializer = ($, _) => {
	const as = (out, index$2) => {
		$.set(index$2, out);
		return out;
	};
	const unpair = (index$2) => {
		if ($.has(index$2)) return $.get(index$2);
		const [type, value] = _[index$2];
		switch (type) {
			case 0:
			case -1: return as(value, index$2);
			case 1: {
				const arr = as([], index$2);
				for (const index$3 of value) arr.push(unpair(index$3));
				return arr;
			}
			case 2: {
				const object = as({}, index$2);
				for (const [key, index$3] of value) object[unpair(key)] = unpair(index$3);
				return object;
			}
			case 3: return as(new Date(value), index$2);
			case 4: {
				const { source, flags } = value;
				return as(new RegExp(source, flags), index$2);
			}
			case 5: {
				const map$2 = as(/* @__PURE__ */ new Map(), index$2);
				for (const [key, index$3] of value) map$2.set(unpair(key), unpair(index$3));
				return map$2;
			}
			case 6: {
				const set = as(/* @__PURE__ */ new Set(), index$2);
				for (const index$3 of value) set.add(unpair(index$3));
				return set;
			}
			case 7: {
				const { name: name$1, message } = value;
				return as(new env[name$1](message), index$2);
			}
			case 8: return as(BigInt(value), index$2);
			case "BigInt": return as(Object(BigInt(value)), index$2);
			case "ArrayBuffer": return as(new Uint8Array(value).buffer, value);
			case "DataView": {
				const { buffer } = new Uint8Array(value);
				return as(new DataView(buffer), value);
			}
		}
		return as(new env[type](value), index$2);
	};
	return unpair;
};
const deserialize = (serialized) => deserializer(/* @__PURE__ */ new Map(), serialized)(0);
var EMPTY = "";
var { toString: toString$1 } = {};
var { keys } = Object;
var typeOf = (value) => {
	const type = typeof value;
	if (type !== "object" || !value) return [0, type];
	const asString = toString$1.call(value).slice(8, -1);
	switch (asString) {
		case "Array": return [1, EMPTY];
		case "Object": return [2, EMPTY];
		case "Date": return [3, EMPTY];
		case "RegExp": return [4, EMPTY];
		case "Map": return [5, EMPTY];
		case "Set": return [6, EMPTY];
		case "DataView": return [1, asString];
	}
	if (asString.includes("Array")) return [1, asString];
	if (asString.includes("Error")) return [7, asString];
	return [2, asString];
};
var shouldSkip = ([TYPE, type]) => TYPE === 0 && (type === "function" || type === "symbol");
var serializer = (strict, json, $, _) => {
	const as = (out, value) => {
		const index$2 = _.push(out) - 1;
		$.set(value, index$2);
		return index$2;
	};
	const pair = (value) => {
		if ($.has(value)) return $.get(value);
		let [TYPE, type] = typeOf(value);
		switch (TYPE) {
			case 0: {
				let entry = value;
				switch (type) {
					case "bigint":
						TYPE = 8;
						entry = value.toString();
						break;
					case "function":
					case "symbol":
						if (strict) throw new TypeError("unable to serialize " + type);
						entry = null;
						break;
					case "undefined": return as([-1], value);
				}
				return as([TYPE, entry], value);
			}
			case 1: {
				if (type) {
					let spread = value;
					if (type === "DataView") spread = new Uint8Array(value.buffer);
					else if (type === "ArrayBuffer") spread = new Uint8Array(value);
					return as([type, [...spread]], value);
				}
				const arr = [];
				const index$2 = as([TYPE, arr], value);
				for (const entry of value) arr.push(pair(entry));
				return index$2;
			}
			case 2: {
				if (type) switch (type) {
					case "BigInt": return as([type, value.toString()], value);
					case "Boolean":
					case "Number":
					case "String": return as([type, value.valueOf()], value);
				}
				if (json && "toJSON" in value) return pair(value.toJSON());
				const entries = [];
				const index$2 = as([TYPE, entries], value);
				for (const key of keys(value)) if (strict || !shouldSkip(typeOf(value[key]))) entries.push([pair(key), pair(value[key])]);
				return index$2;
			}
			case 3: return as([TYPE, value.toISOString()], value);
			case 4: {
				const { source, flags } = value;
				return as([TYPE, {
					source,
					flags
				}], value);
			}
			case 5: {
				const entries = [];
				const index$2 = as([TYPE, entries], value);
				for (const [key, entry] of value) if (strict || !(shouldSkip(typeOf(key)) || shouldSkip(typeOf(entry)))) entries.push([pair(key), pair(entry)]);
				return index$2;
			}
			case 6: {
				const entries = [];
				const index$2 = as([TYPE, entries], value);
				for (const entry of value) if (strict || !shouldSkip(typeOf(entry))) entries.push(pair(entry));
				return index$2;
			}
		}
		const { message } = value;
		return as([TYPE, {
			name: type,
			message
		}], value);
	};
	return pair;
};
const serialize$1 = (value, { json, lossy } = {}) => {
	const _ = [];
	return serializer(!(json || lossy), !!json, /* @__PURE__ */ new Map(), _)(value), _;
};
var esm_default = typeof structuredClone === "function" ? (any, options) => options && ("json" in options || "lossy" in options) ? deserialize(serialize$1(any, options)) : structuredClone(any) : (any, options) => deserialize(serialize$1(any, options));
function defaultFootnoteBackContent(_, rereferenceIndex) {
	const result = [{
		type: "text",
		value: "↩"
	}];
	if (rereferenceIndex > 1) result.push({
		type: "element",
		tagName: "sup",
		properties: {},
		children: [{
			type: "text",
			value: String(rereferenceIndex)
		}]
	});
	return result;
}
function defaultFootnoteBackLabel(referenceIndex, rereferenceIndex) {
	return "Back to reference " + (referenceIndex + 1) + (rereferenceIndex > 1 ? "-" + rereferenceIndex : "");
}
function footer(state) {
	const clobberPrefix = typeof state.options.clobberPrefix === "string" ? state.options.clobberPrefix : "user-content-";
	const footnoteBackContent = state.options.footnoteBackContent || defaultFootnoteBackContent;
	const footnoteBackLabel = state.options.footnoteBackLabel || defaultFootnoteBackLabel;
	const footnoteLabel = state.options.footnoteLabel || "Footnotes";
	const footnoteLabelTagName = state.options.footnoteLabelTagName || "h2";
	const footnoteLabelProperties = state.options.footnoteLabelProperties || { className: ["sr-only"] };
	const listItems = [];
	let referenceIndex = -1;
	while (++referenceIndex < state.footnoteOrder.length) {
		const definition$2 = state.footnoteById.get(state.footnoteOrder[referenceIndex]);
		if (!definition$2) continue;
		const content$2 = state.all(definition$2);
		const id = String(definition$2.identifier).toUpperCase();
		const safeId = normalizeUri(id.toLowerCase());
		let rereferenceIndex = 0;
		const backReferences = [];
		const counts = state.footnoteCounts.get(id);
		while (counts !== void 0 && ++rereferenceIndex <= counts) {
			if (backReferences.length > 0) backReferences.push({
				type: "text",
				value: " "
			});
			let children = typeof footnoteBackContent === "string" ? footnoteBackContent : footnoteBackContent(referenceIndex, rereferenceIndex);
			if (typeof children === "string") children = {
				type: "text",
				value: children
			};
			backReferences.push({
				type: "element",
				tagName: "a",
				properties: {
					href: "#" + clobberPrefix + "fnref-" + safeId + (rereferenceIndex > 1 ? "-" + rereferenceIndex : ""),
					dataFootnoteBackref: "",
					ariaLabel: typeof footnoteBackLabel === "string" ? footnoteBackLabel : footnoteBackLabel(referenceIndex, rereferenceIndex),
					className: ["data-footnote-backref"]
				},
				children: Array.isArray(children) ? children : [children]
			});
		}
		const tail = content$2[content$2.length - 1];
		if (tail && tail.type === "element" && tail.tagName === "p") {
			const tailTail = tail.children[tail.children.length - 1];
			if (tailTail && tailTail.type === "text") tailTail.value += " ";
			else tail.children.push({
				type: "text",
				value: " "
			});
			tail.children.push(...backReferences);
		} else content$2.push(...backReferences);
		const listItem$2 = {
			type: "element",
			tagName: "li",
			properties: { id: clobberPrefix + "fn-" + safeId },
			children: state.wrap(content$2, true)
		};
		state.patch(definition$2, listItem$2);
		listItems.push(listItem$2);
	}
	if (listItems.length === 0) return;
	return {
		type: "element",
		tagName: "section",
		properties: {
			dataFootnotes: true,
			className: ["footnotes"]
		},
		children: [
			{
				type: "element",
				tagName: footnoteLabelTagName,
				properties: {
					...esm_default(footnoteLabelProperties),
					id: "footnote-label"
				},
				children: [{
					type: "text",
					value: footnoteLabel
				}]
			},
			{
				type: "text",
				value: "\n"
			},
			{
				type: "element",
				tagName: "ol",
				properties: {},
				children: state.wrap(listItems, true)
			},
			{
				type: "text",
				value: "\n"
			}
		]
	};
}
const convert = (function(test) {
	if (test === null || test === void 0) return ok$1;
	if (typeof test === "function") return castFactory(test);
	if (typeof test === "object") return Array.isArray(test) ? anyFactory(test) : propertiesFactory(test);
	if (typeof test === "string") return typeFactory(test);
	throw new Error("Expected function, string, or object as test");
});
function anyFactory(tests) {
	const checks = [];
	let index$2 = -1;
	while (++index$2 < tests.length) checks[index$2] = convert(tests[index$2]);
	return castFactory(any);
	function any(...parameters) {
		let index$3 = -1;
		while (++index$3 < checks.length) if (checks[index$3].apply(this, parameters)) return true;
		return false;
	}
}
function propertiesFactory(check) {
	const checkAsRecord = check;
	return castFactory(all$1);
	function all$1(node$1) {
		const nodeAsRecord = node$1;
		let key;
		for (key in check) if (nodeAsRecord[key] !== checkAsRecord[key]) return false;
		return true;
	}
}
function typeFactory(check) {
	return castFactory(type);
	function type(node$1) {
		return node$1 && node$1.type === check;
	}
}
function castFactory(testFunction) {
	return check;
	function check(value, index$2, parent) {
		return Boolean(looksLikeANode(value) && testFunction.call(this, value, typeof index$2 === "number" ? index$2 : void 0, parent || void 0));
	}
}
function ok$1() {
	return true;
}
function looksLikeANode(value) {
	return value !== null && typeof value === "object" && "type" in value;
}
function color(d) {
	return d;
}
var empty = [];
const SKIP = "skip";
function visitParents(tree, test, visitor, reverse) {
	let check;
	if (typeof test === "function" && typeof visitor !== "function") {
		reverse = visitor;
		visitor = test;
	} else check = test;
	const is = convert(check);
	const step = reverse ? -1 : 1;
	factory(tree, void 0, [])();
	function factory(node$1, index$2, parents) {
		const value = node$1 && typeof node$1 === "object" ? node$1 : {};
		if (typeof value.type === "string") {
			const name$1 = typeof value.tagName === "string" ? value.tagName : typeof value.name === "string" ? value.name : void 0;
			Object.defineProperty(visit$1, "name", { value: "node (" + color(node$1.type + (name$1 ? "<" + name$1 + ">" : "")) + ")" });
		}
		return visit$1;
		function visit$1() {
			let result = empty;
			let subresult;
			let offset;
			let grandparents;
			if (!test || is(node$1, index$2, parents[parents.length - 1] || void 0)) {
				result = toResult(visitor(node$1, parents));
				if (result[0] === false) return result;
			}
			if ("children" in node$1 && node$1.children) {
				const nodeAsParent = node$1;
				if (nodeAsParent.children && result[0] !== "skip") {
					offset = (reverse ? nodeAsParent.children.length : -1) + step;
					grandparents = parents.concat(nodeAsParent);
					while (offset > -1 && offset < nodeAsParent.children.length) {
						const child = nodeAsParent.children[offset];
						subresult = factory(child, offset, grandparents)();
						if (subresult[0] === false) return subresult;
						offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
					}
				}
			}
			return result;
		}
	}
}
function toResult(value) {
	if (Array.isArray(value)) return value;
	if (typeof value === "number") return [true, value];
	return value === null || value === void 0 ? empty : [value];
}
function visit(tree, testOrVisitor, visitorOrReverse, maybeReverse) {
	let reverse;
	let test;
	let visitor;
	if (typeof testOrVisitor === "function" && typeof visitorOrReverse !== "function") {
		test = void 0;
		visitor = testOrVisitor;
		reverse = visitorOrReverse;
	} else {
		test = testOrVisitor;
		visitor = visitorOrReverse;
		reverse = maybeReverse;
	}
	visitParents(tree, test, overload, reverse);
	function overload(node$1, parents) {
		const parent = parents[parents.length - 1];
		const index$2 = parent ? parent.children.indexOf(node$1) : void 0;
		return visitor(node$1, index$2, parent);
	}
}
var own$1 = {}.hasOwnProperty;
var emptyOptions$1 = {};
function createState(tree, options) {
	const settings = options || emptyOptions$1;
	const definitionById = /* @__PURE__ */ new Map();
	const footnoteById = /* @__PURE__ */ new Map();
	const state = {
		all: all$1,
		applyData,
		definitionById,
		footnoteById,
		footnoteCounts: /* @__PURE__ */ new Map(),
		footnoteOrder: [],
		handlers: {
			...handlers,
			...settings.handlers
		},
		one: one$2,
		options: settings,
		patch,
		wrap: wrap$1
	};
	visit(tree, function(node$1) {
		if (node$1.type === "definition" || node$1.type === "footnoteDefinition") {
			const map$2 = node$1.type === "definition" ? definitionById : footnoteById;
			const id = String(node$1.identifier).toUpperCase();
			if (!map$2.has(id)) map$2.set(id, node$1);
		}
	});
	return state;
	function one$2(node$1, parent) {
		const type = node$1.type;
		const handle$1 = state.handlers[type];
		if (own$1.call(state.handlers, type) && handle$1) return handle$1(state, node$1, parent);
		if (state.options.passThrough && state.options.passThrough.includes(type)) {
			if ("children" in node$1) {
				const { children, ...shallow } = node$1;
				const result = esm_default(shallow);
				result.children = state.all(node$1);
				return result;
			}
			return esm_default(node$1);
		}
		return (state.options.unknownHandler || defaultUnknownHandler)(state, node$1, parent);
	}
	function all$1(parent) {
		const values = [];
		if ("children" in parent) {
			const nodes = parent.children;
			let index$2 = -1;
			while (++index$2 < nodes.length) {
				const result = state.one(nodes[index$2], parent);
				if (result) {
					if (index$2 && nodes[index$2 - 1].type === "break") {
						if (!Array.isArray(result) && result.type === "text") result.value = trimMarkdownSpaceStart(result.value);
						if (!Array.isArray(result) && result.type === "element") {
							const head = result.children[0];
							if (head && head.type === "text") head.value = trimMarkdownSpaceStart(head.value);
						}
					}
					if (Array.isArray(result)) values.push(...result);
					else values.push(result);
				}
			}
		}
		return values;
	}
}
function patch(from, to) {
	if (from.position) to.position = position(from);
}
function applyData(from, to) {
	let result = to;
	if (from && from.data) {
		const hName = from.data.hName;
		const hChildren = from.data.hChildren;
		const hProperties = from.data.hProperties;
		if (typeof hName === "string") if (result.type === "element") result.tagName = hName;
		else result = {
			type: "element",
			tagName: hName,
			properties: {},
			children: "children" in result ? result.children : [result]
		};
		if (result.type === "element" && hProperties) Object.assign(result.properties, esm_default(hProperties));
		if ("children" in result && result.children && hChildren !== null && hChildren !== void 0) result.children = hChildren;
	}
	return result;
}
function defaultUnknownHandler(state, node$1) {
	const data = node$1.data || {};
	const result = "value" in node$1 && !(own$1.call(data, "hProperties") || own$1.call(data, "hChildren")) ? {
		type: "text",
		value: node$1.value
	} : {
		type: "element",
		tagName: "div",
		properties: {},
		children: state.all(node$1)
	};
	state.patch(node$1, result);
	return state.applyData(node$1, result);
}
function wrap$1(nodes, loose) {
	const result = [];
	let index$2 = -1;
	if (loose) result.push({
		type: "text",
		value: "\n"
	});
	while (++index$2 < nodes.length) {
		if (index$2) result.push({
			type: "text",
			value: "\n"
		});
		result.push(nodes[index$2]);
	}
	if (loose && nodes.length > 0) result.push({
		type: "text",
		value: "\n"
	});
	return result;
}
function trimMarkdownSpaceStart(value) {
	let index$2 = 0;
	let code$3 = value.charCodeAt(index$2);
	while (code$3 === 9 || code$3 === 32) {
		index$2++;
		code$3 = value.charCodeAt(index$2);
	}
	return value.slice(index$2);
}
function toHast(tree, options) {
	const state = createState(tree, options);
	const node$1 = state.one(tree, void 0);
	const foot = footer(state);
	const result = Array.isArray(node$1) ? {
		type: "root",
		children: node$1
	} : node$1 || {
		type: "root",
		children: []
	};
	if (foot) {
		"children" in result;
		result.children.push({
			type: "text",
			value: "\n"
		}, foot);
	}
	return result;
}
function remarkRehype(destination, options) {
	if (destination && "run" in destination) return async function(tree, file) {
		const hastTree = toHast(tree, {
			file,
			...options
		});
		await destination.run(hastTree, file);
	};
	return function(tree, file) {
		return toHast(tree, {
			file,
			...destination || options
		});
	};
}
function bail(error) {
	if (error) throw error;
}
var require_extend = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var defineProperty = Object.defineProperty;
	var gOPD = Object.getOwnPropertyDescriptor;
	var isArray = function isArray$1(arr) {
		if (typeof Array.isArray === "function") return Array.isArray(arr);
		return toStr.call(arr) === "[object Array]";
	};
	var isPlainObject$1 = function isPlainObject$2(obj) {
		if (!obj || toStr.call(obj) !== "[object Object]") return false;
		var hasOwnConstructor = hasOwn.call(obj, "constructor");
		var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
		if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) return false;
		var key;
		for (key in obj);
		return typeof key === "undefined" || hasOwn.call(obj, key);
	};
	var setProperty = function setProperty$1(target, options) {
		if (defineProperty && options.name === "__proto__") defineProperty(target, options.name, {
			enumerable: true,
			configurable: true,
			value: options.newValue,
			writable: true
		});
		else target[options.name] = options.newValue;
	};
	var getProperty = function getProperty$1(obj, name$1) {
		if (name$1 === "__proto__") {
			if (!hasOwn.call(obj, name$1)) return;
			else if (gOPD) return gOPD(obj, name$1).value;
		}
		return obj[name$1];
	};
	module.exports = function extend$1() {
		var options, name$1, src, copy, copyIsArray, clone;
		var target = arguments[0];
		var i = 1;
		var length = arguments.length;
		var deep = false;
		if (typeof target === "boolean") {
			deep = target;
			target = arguments[1] || {};
			i = 2;
		}
		if (target == null || typeof target !== "object" && typeof target !== "function") target = {};
		for (; i < length; ++i) {
			options = arguments[i];
			if (options != null) for (name$1 in options) {
				src = getProperty(target, name$1);
				copy = getProperty(options, name$1);
				if (target !== copy) {
					if (deep && copy && (isPlainObject$1(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else clone = src && isPlainObject$1(src) ? src : {};
						setProperty(target, {
							name: name$1,
							newValue: extend$1(deep, clone, copy)
						});
					} else if (typeof copy !== "undefined") setProperty(target, {
						name: name$1,
						newValue: copy
					});
				}
			}
		}
		return target;
	};
}));
function isPlainObject(value) {
	if (typeof value !== "object" || value === null) return false;
	const prototype = Object.getPrototypeOf(value);
	return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}
function trough() {
	const fns = [];
	const pipeline = {
		run,
		use
	};
	return pipeline;
	function run(...values) {
		let middlewareIndex = -1;
		const callback = values.pop();
		if (typeof callback !== "function") throw new TypeError("Expected function as last argument, not " + callback);
		next(null, ...values);
		function next(error, ...output) {
			const fn = fns[++middlewareIndex];
			let index$2 = -1;
			if (error) {
				callback(error);
				return;
			}
			while (++index$2 < values.length) if (output[index$2] === null || output[index$2] === void 0) output[index$2] = values[index$2];
			values = output;
			if (fn) wrap(fn, next)(...output);
			else callback(null, ...output);
		}
	}
	function use(middelware) {
		if (typeof middelware !== "function") throw new TypeError("Expected `middelware` to be a function, not " + middelware);
		fns.push(middelware);
		return pipeline;
	}
}
function wrap(middleware, callback) {
	let called;
	return wrapped;
	function wrapped(...parameters) {
		const fnExpectsCallback = middleware.length > parameters.length;
		let result;
		if (fnExpectsCallback) parameters.push(done);
		try {
			result = middleware.apply(this, parameters);
		} catch (error) {
			const exception = error;
			if (fnExpectsCallback && called) throw exception;
			return done(exception);
		}
		if (!fnExpectsCallback) if (result && result.then && typeof result.then === "function") result.then(then, done);
		else if (result instanceof Error) done(result);
		else then(result);
	}
	function done(error, ...output) {
		if (!called) {
			called = true;
			callback(error, ...output);
		}
	}
	function then(value) {
		done(null, value);
	}
}
const minpath = {
	basename,
	dirname,
	extname,
	join,
	sep: "/"
};
function basename(path$1, extname$1) {
	if (extname$1 !== void 0 && typeof extname$1 !== "string") throw new TypeError("\"ext\" argument must be a string");
	assertPath$1(path$1);
	let start = 0;
	let end = -1;
	let index$2 = path$1.length;
	let seenNonSlash;
	if (extname$1 === void 0 || extname$1.length === 0 || extname$1.length > path$1.length) {
		while (index$2--) if (path$1.codePointAt(index$2) === 47) {
			if (seenNonSlash) {
				start = index$2 + 1;
				break;
			}
		} else if (end < 0) {
			seenNonSlash = true;
			end = index$2 + 1;
		}
		return end < 0 ? "" : path$1.slice(start, end);
	}
	if (extname$1 === path$1) return "";
	let firstNonSlashEnd = -1;
	let extnameIndex = extname$1.length - 1;
	while (index$2--) if (path$1.codePointAt(index$2) === 47) {
		if (seenNonSlash) {
			start = index$2 + 1;
			break;
		}
	} else {
		if (firstNonSlashEnd < 0) {
			seenNonSlash = true;
			firstNonSlashEnd = index$2 + 1;
		}
		if (extnameIndex > -1) if (path$1.codePointAt(index$2) === extname$1.codePointAt(extnameIndex--)) {
			if (extnameIndex < 0) end = index$2;
		} else {
			extnameIndex = -1;
			end = firstNonSlashEnd;
		}
	}
	if (start === end) end = firstNonSlashEnd;
	else if (end < 0) end = path$1.length;
	return path$1.slice(start, end);
}
function dirname(path$1) {
	assertPath$1(path$1);
	if (path$1.length === 0) return ".";
	let end = -1;
	let index$2 = path$1.length;
	let unmatchedSlash;
	while (--index$2) if (path$1.codePointAt(index$2) === 47) {
		if (unmatchedSlash) {
			end = index$2;
			break;
		}
	} else if (!unmatchedSlash) unmatchedSlash = true;
	return end < 0 ? path$1.codePointAt(0) === 47 ? "/" : "." : end === 1 && path$1.codePointAt(0) === 47 ? "//" : path$1.slice(0, end);
}
function extname(path$1) {
	assertPath$1(path$1);
	let index$2 = path$1.length;
	let end = -1;
	let startPart = 0;
	let startDot = -1;
	let preDotState = 0;
	let unmatchedSlash;
	while (index$2--) {
		const code$3 = path$1.codePointAt(index$2);
		if (code$3 === 47) {
			if (unmatchedSlash) {
				startPart = index$2 + 1;
				break;
			}
			continue;
		}
		if (end < 0) {
			unmatchedSlash = true;
			end = index$2 + 1;
		}
		if (code$3 === 46) {
			if (startDot < 0) startDot = index$2;
			else if (preDotState !== 1) preDotState = 1;
		} else if (startDot > -1) preDotState = -1;
	}
	if (startDot < 0 || end < 0 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) return "";
	return path$1.slice(startDot, end);
}
function join(...segments) {
	let index$2 = -1;
	let joined;
	while (++index$2 < segments.length) {
		assertPath$1(segments[index$2]);
		if (segments[index$2]) joined = joined === void 0 ? segments[index$2] : joined + "/" + segments[index$2];
	}
	return joined === void 0 ? "." : normalize(joined);
}
function normalize(path$1) {
	assertPath$1(path$1);
	const absolute = path$1.codePointAt(0) === 47;
	let value = normalizeString(path$1, !absolute);
	if (value.length === 0 && !absolute) value = ".";
	if (value.length > 0 && path$1.codePointAt(path$1.length - 1) === 47) value += "/";
	return absolute ? "/" + value : value;
}
function normalizeString(path$1, allowAboveRoot) {
	let result = "";
	let lastSegmentLength = 0;
	let lastSlash = -1;
	let dots = 0;
	let index$2 = -1;
	let code$3;
	let lastSlashIndex;
	while (++index$2 <= path$1.length) {
		if (index$2 < path$1.length) code$3 = path$1.codePointAt(index$2);
		else if (code$3 === 47) break;
		else code$3 = 47;
		if (code$3 === 47) {
			if (lastSlash === index$2 - 1 || dots === 1) {} else if (lastSlash !== index$2 - 1 && dots === 2) {
				if (result.length < 2 || lastSegmentLength !== 2 || result.codePointAt(result.length - 1) !== 46 || result.codePointAt(result.length - 2) !== 46) {
					if (result.length > 2) {
						lastSlashIndex = result.lastIndexOf("/");
						if (lastSlashIndex !== result.length - 1) {
							if (lastSlashIndex < 0) {
								result = "";
								lastSegmentLength = 0;
							} else {
								result = result.slice(0, lastSlashIndex);
								lastSegmentLength = result.length - 1 - result.lastIndexOf("/");
							}
							lastSlash = index$2;
							dots = 0;
							continue;
						}
					} else if (result.length > 0) {
						result = "";
						lastSegmentLength = 0;
						lastSlash = index$2;
						dots = 0;
						continue;
					}
				}
				if (allowAboveRoot) {
					result = result.length > 0 ? result + "/.." : "..";
					lastSegmentLength = 2;
				}
			} else {
				if (result.length > 0) result += "/" + path$1.slice(lastSlash + 1, index$2);
				else result = path$1.slice(lastSlash + 1, index$2);
				lastSegmentLength = index$2 - lastSlash - 1;
			}
			lastSlash = index$2;
			dots = 0;
		} else if (code$3 === 46 && dots > -1) dots++;
		else dots = -1;
	}
	return result;
}
function assertPath$1(path$1) {
	if (typeof path$1 !== "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(path$1));
}
const minproc = { cwd };
function cwd() {
	return "/";
}
function isUrl(fileUrlOrPath) {
	return Boolean(fileUrlOrPath !== null && typeof fileUrlOrPath === "object" && "href" in fileUrlOrPath && fileUrlOrPath.href && "protocol" in fileUrlOrPath && fileUrlOrPath.protocol && fileUrlOrPath.auth === void 0);
}
function urlToPath(path$1) {
	if (typeof path$1 === "string") path$1 = new URL(path$1);
	else if (!isUrl(path$1)) {
		const error = /* @__PURE__ */ new TypeError("The \"path\" argument must be of type string or an instance of URL. Received `" + path$1 + "`");
		error.code = "ERR_INVALID_ARG_TYPE";
		throw error;
	}
	if (path$1.protocol !== "file:") {
		const error = /* @__PURE__ */ new TypeError("The URL must be of scheme file");
		error.code = "ERR_INVALID_URL_SCHEME";
		throw error;
	}
	return getPathFromURLPosix(path$1);
}
function getPathFromURLPosix(url) {
	if (url.hostname !== "") {
		const error = /* @__PURE__ */ new TypeError("File URL host must be \"localhost\" or empty on darwin");
		error.code = "ERR_INVALID_FILE_URL_HOST";
		throw error;
	}
	const pathname = url.pathname;
	let index$2 = -1;
	while (++index$2 < pathname.length) if (pathname.codePointAt(index$2) === 37 && pathname.codePointAt(index$2 + 1) === 50) {
		const third = pathname.codePointAt(index$2 + 2);
		if (third === 70 || third === 102) {
			const error = /* @__PURE__ */ new TypeError("File URL path must not include encoded / characters");
			error.code = "ERR_INVALID_FILE_URL_PATH";
			throw error;
		}
	}
	return decodeURIComponent(pathname);
}
var order = [
	"history",
	"path",
	"basename",
	"stem",
	"extname",
	"dirname"
];
var VFile = class {
	constructor(value) {
		let options;
		if (!value) options = {};
		else if (isUrl(value)) options = { path: value };
		else if (typeof value === "string" || isUint8Array$1(value)) options = { value };
		else options = value;
		this.cwd = "cwd" in options ? "" : minproc.cwd();
		this.data = {};
		this.history = [];
		this.messages = [];
		this.value;
		this.map;
		this.result;
		this.stored;
		let index$2 = -1;
		while (++index$2 < order.length) {
			const field$1 = order[index$2];
			if (field$1 in options && options[field$1] !== void 0 && options[field$1] !== null) this[field$1] = field$1 === "history" ? [...options[field$1]] : options[field$1];
		}
		let field;
		for (field in options) if (!order.includes(field)) this[field] = options[field];
	}
	get basename() {
		return typeof this.path === "string" ? minpath.basename(this.path) : void 0;
	}
	set basename(basename$1) {
		assertNonEmpty(basename$1, "basename");
		assertPart(basename$1, "basename");
		this.path = minpath.join(this.dirname || "", basename$1);
	}
	get dirname() {
		return typeof this.path === "string" ? minpath.dirname(this.path) : void 0;
	}
	set dirname(dirname$1) {
		assertPath(this.basename, "dirname");
		this.path = minpath.join(dirname$1 || "", this.basename);
	}
	get extname() {
		return typeof this.path === "string" ? minpath.extname(this.path) : void 0;
	}
	set extname(extname$1) {
		assertPart(extname$1, "extname");
		assertPath(this.dirname, "extname");
		if (extname$1) {
			if (extname$1.codePointAt(0) !== 46) throw new Error("`extname` must start with `.`");
			if (extname$1.includes(".", 1)) throw new Error("`extname` cannot contain multiple dots");
		}
		this.path = minpath.join(this.dirname, this.stem + (extname$1 || ""));
	}
	get path() {
		return this.history[this.history.length - 1];
	}
	set path(path$1) {
		if (isUrl(path$1)) path$1 = urlToPath(path$1);
		assertNonEmpty(path$1, "path");
		if (this.path !== path$1) this.history.push(path$1);
	}
	get stem() {
		return typeof this.path === "string" ? minpath.basename(this.path, this.extname) : void 0;
	}
	set stem(stem) {
		assertNonEmpty(stem, "stem");
		assertPart(stem, "stem");
		this.path = minpath.join(this.dirname || "", stem + (this.extname || ""));
	}
	fail(causeOrReason, optionsOrParentOrPlace, origin) {
		const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);
		message.fatal = true;
		throw message;
	}
	info(causeOrReason, optionsOrParentOrPlace, origin) {
		const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);
		message.fatal = void 0;
		return message;
	}
	message(causeOrReason, optionsOrParentOrPlace, origin) {
		const message = new VFileMessage(causeOrReason, optionsOrParentOrPlace, origin);
		if (this.path) {
			message.name = this.path + ":" + message.name;
			message.file = this.path;
		}
		message.fatal = false;
		this.messages.push(message);
		return message;
	}
	toString(encoding) {
		if (this.value === void 0) return "";
		if (typeof this.value === "string") return this.value;
		return new TextDecoder(encoding || void 0).decode(this.value);
	}
};
function assertPart(part, name$1) {
	if (part && part.includes(minpath.sep)) throw new Error("`" + name$1 + "` cannot be a path: did not expect `" + minpath.sep + "`");
}
function assertNonEmpty(part, name$1) {
	if (!part) throw new Error("`" + name$1 + "` cannot be empty");
}
function assertPath(path$1, name$1) {
	if (!path$1) throw new Error("Setting `" + name$1 + "` requires `path` to be set too");
}
function isUint8Array$1(value) {
	return Boolean(value && typeof value === "object" && "byteLength" in value && "byteOffset" in value);
}
const CallableInstance = (function(property) {
	const proto = this.constructor.prototype;
	const value = proto[property];
	const apply = function() {
		return value.apply(apply, arguments);
	};
	Object.setPrototypeOf(apply, proto);
	return apply;
});
var import_extend = /* @__PURE__ */ __toESM(require_extend(), 1);
var own = {}.hasOwnProperty;
const unified = new class Processor extends CallableInstance {
	constructor() {
		super("copy");
		this.Compiler = void 0;
		this.Parser = void 0;
		this.attachers = [];
		this.compiler = void 0;
		this.freezeIndex = -1;
		this.frozen = void 0;
		this.namespace = {};
		this.parser = void 0;
		this.transformers = trough();
	}
	copy() {
		const destination = new Processor();
		let index$2 = -1;
		while (++index$2 < this.attachers.length) {
			const attacher = this.attachers[index$2];
			destination.use(...attacher);
		}
		destination.data((0, import_extend.default)(true, {}, this.namespace));
		return destination;
	}
	data(key, value) {
		if (typeof key === "string") {
			if (arguments.length === 2) {
				assertUnfrozen("data", this.frozen);
				this.namespace[key] = value;
				return this;
			}
			return own.call(this.namespace, key) && this.namespace[key] || void 0;
		}
		if (key) {
			assertUnfrozen("data", this.frozen);
			this.namespace = key;
			return this;
		}
		return this.namespace;
	}
	freeze() {
		if (this.frozen) return this;
		const self$1 = this;
		while (++this.freezeIndex < this.attachers.length) {
			const [attacher, ...options] = this.attachers[this.freezeIndex];
			if (options[0] === false) continue;
			if (options[0] === true) options[0] = void 0;
			const transformer = attacher.call(self$1, ...options);
			if (typeof transformer === "function") this.transformers.use(transformer);
		}
		this.frozen = true;
		this.freezeIndex = Number.POSITIVE_INFINITY;
		return this;
	}
	parse(file) {
		this.freeze();
		const realFile = vfile(file);
		const parser = this.parser || this.Parser;
		assertParser("parse", parser);
		return parser(String(realFile), realFile);
	}
	process(file, done) {
		const self$1 = this;
		this.freeze();
		assertParser("process", this.parser || this.Parser);
		assertCompiler("process", this.compiler || this.Compiler);
		return done ? executor(void 0, done) : new Promise(executor);
		function executor(resolve, reject) {
			const realFile = vfile(file);
			const parseTree = self$1.parse(realFile);
			self$1.run(parseTree, realFile, function(error, tree, file$1) {
				if (error || !tree || !file$1) return realDone(error);
				const compileTree = tree;
				const compileResult = self$1.stringify(compileTree, file$1);
				if (looksLikeAValue(compileResult)) file$1.value = compileResult;
				else file$1.result = compileResult;
				realDone(error, file$1);
			});
			function realDone(error, file$1) {
				if (error || !file$1) reject(error);
				else if (resolve) resolve(file$1);
				else done(void 0, file$1);
			}
		}
	}
	processSync(file) {
		let complete = false;
		let result;
		this.freeze();
		assertParser("processSync", this.parser || this.Parser);
		assertCompiler("processSync", this.compiler || this.Compiler);
		this.process(file, realDone);
		assertDone("processSync", "process", complete);
		return result;
		function realDone(error, file$1) {
			complete = true;
			bail(error);
			result = file$1;
		}
	}
	run(tree, file, done) {
		assertNode(tree);
		this.freeze();
		const transformers = this.transformers;
		if (!done && typeof file === "function") {
			done = file;
			file = void 0;
		}
		return done ? executor(void 0, done) : new Promise(executor);
		function executor(resolve, reject) {
			const realFile = vfile(file);
			transformers.run(tree, realFile, realDone);
			function realDone(error, outputTree, file$1) {
				const resultingTree = outputTree || tree;
				if (error) reject(error);
				else if (resolve) resolve(resultingTree);
				else done(void 0, resultingTree, file$1);
			}
		}
	}
	runSync(tree, file) {
		let complete = false;
		let result;
		this.run(tree, file, realDone);
		assertDone("runSync", "run", complete);
		return result;
		function realDone(error, tree$1) {
			bail(error);
			result = tree$1;
			complete = true;
		}
	}
	stringify(tree, file) {
		this.freeze();
		const realFile = vfile(file);
		const compiler$1 = this.compiler || this.Compiler;
		assertCompiler("stringify", compiler$1);
		assertNode(tree);
		return compiler$1(tree, realFile);
	}
	use(value, ...parameters) {
		const attachers = this.attachers;
		const namespace = this.namespace;
		assertUnfrozen("use", this.frozen);
		if (value === null || value === void 0) {} else if (typeof value === "function") addPlugin(value, parameters);
		else if (typeof value === "object") if (Array.isArray(value)) addList(value);
		else addPreset(value);
		else throw new TypeError("Expected usable value, not `" + value + "`");
		return this;
		function add(value$1) {
			if (typeof value$1 === "function") addPlugin(value$1, []);
			else if (typeof value$1 === "object") if (Array.isArray(value$1)) {
				const [plugin, ...parameters$1] = value$1;
				addPlugin(plugin, parameters$1);
			} else addPreset(value$1);
			else throw new TypeError("Expected usable value, not `" + value$1 + "`");
		}
		function addPreset(result) {
			if (!("plugins" in result) && !("settings" in result)) throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");
			addList(result.plugins);
			if (result.settings) namespace.settings = (0, import_extend.default)(true, namespace.settings, result.settings);
		}
		function addList(plugins) {
			let index$2 = -1;
			if (plugins === null || plugins === void 0) {} else if (Array.isArray(plugins)) while (++index$2 < plugins.length) {
				const thing = plugins[index$2];
				add(thing);
			}
			else throw new TypeError("Expected a list of plugins, not `" + plugins + "`");
		}
		function addPlugin(plugin, parameters$1) {
			let index$2 = -1;
			let entryIndex = -1;
			while (++index$2 < attachers.length) if (attachers[index$2][0] === plugin) {
				entryIndex = index$2;
				break;
			}
			if (entryIndex === -1) attachers.push([plugin, ...parameters$1]);
			else if (parameters$1.length > 0) {
				let [primary, ...rest] = parameters$1;
				const currentPrimary = attachers[entryIndex][1];
				if (isPlainObject(currentPrimary) && isPlainObject(primary)) primary = (0, import_extend.default)(true, currentPrimary, primary);
				attachers[entryIndex] = [
					plugin,
					primary,
					...rest
				];
			}
		}
	}
}().freeze();
function assertParser(name$1, value) {
	if (typeof value !== "function") throw new TypeError("Cannot `" + name$1 + "` without `parser`");
}
function assertCompiler(name$1, value) {
	if (typeof value !== "function") throw new TypeError("Cannot `" + name$1 + "` without `compiler`");
}
function assertUnfrozen(name$1, frozen) {
	if (frozen) throw new Error("Cannot call `" + name$1 + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
}
function assertNode(node$1) {
	if (!isPlainObject(node$1) || typeof node$1.type !== "string") throw new TypeError("Expected node, got `" + node$1 + "`");
}
function assertDone(name$1, asyncName, complete) {
	if (!complete) throw new Error("`" + name$1 + "` finished async. Use `" + asyncName + "` instead");
}
function vfile(value) {
	return looksLikeAVFile(value) ? value : new VFile(value);
}
function looksLikeAVFile(value) {
	return Boolean(value && typeof value === "object" && "message" in value && "messages" in value);
}
function looksLikeAValue(value) {
	return typeof value === "string" || isUint8Array(value);
}
function isUint8Array(value) {
	return Boolean(value && typeof value === "object" && "byteLength" in value && "byteOffset" in value);
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
require_react();
var emptyPlugins = [];
var emptyRemarkRehypeOptions = { allowDangerousHtml: true };
var safeProtocol = /^(https?|ircs?|mailto|xmpp)$/i;
var deprecations = [
	{
		from: "astPlugins",
		id: "remove-buggy-html-in-markdown-parser"
	},
	{
		from: "allowDangerousHtml",
		id: "remove-buggy-html-in-markdown-parser"
	},
	{
		from: "allowNode",
		id: "replace-allownode-allowedtypes-and-disallowedtypes",
		to: "allowElement"
	},
	{
		from: "allowedTypes",
		id: "replace-allownode-allowedtypes-and-disallowedtypes",
		to: "allowedElements"
	},
	{
		from: "disallowedTypes",
		id: "replace-allownode-allowedtypes-and-disallowedtypes",
		to: "disallowedElements"
	},
	{
		from: "escapeHtml",
		id: "remove-buggy-html-in-markdown-parser"
	},
	{
		from: "includeElementIndex",
		id: "#remove-includeelementindex"
	},
	{
		from: "includeNodeIndex",
		id: "change-includenodeindex-to-includeelementindex"
	},
	{
		from: "linkTarget",
		id: "remove-linktarget"
	},
	{
		from: "plugins",
		id: "change-plugins-to-remarkplugins",
		to: "remarkPlugins"
	},
	{
		from: "rawSourcePos",
		id: "#remove-rawsourcepos"
	},
	{
		from: "renderers",
		id: "change-renderers-to-components",
		to: "components"
	},
	{
		from: "source",
		id: "change-source-to-children",
		to: "children"
	},
	{
		from: "sourcePos",
		id: "#remove-sourcepos"
	},
	{
		from: "transformImageUri",
		id: "#add-urltransform",
		to: "urlTransform"
	},
	{
		from: "transformLinkUri",
		id: "#add-urltransform",
		to: "urlTransform"
	}
];
function Markdown(options) {
	const processor = createProcessor(options);
	const file = createFile(options);
	return post(processor.runSync(processor.parse(file), file), options);
}
function createProcessor(options) {
	const rehypePlugins = options.rehypePlugins || emptyPlugins;
	const remarkPlugins = options.remarkPlugins || emptyPlugins;
	const remarkRehypeOptions = options.remarkRehypeOptions ? {
		...options.remarkRehypeOptions,
		...emptyRemarkRehypeOptions
	} : emptyRemarkRehypeOptions;
	return unified().use(remarkParse).use(remarkPlugins).use(remarkRehype, remarkRehypeOptions).use(rehypePlugins);
}
function createFile(options) {
	const children = options.children || "";
	const file = new VFile();
	if (typeof children === "string") file.value = children;
	else "" + children;
	return file;
}
function post(tree, options) {
	const allowedElements = options.allowedElements;
	const allowElement = options.allowElement;
	const components = options.components;
	const disallowedElements = options.disallowedElements;
	const skipHtml = options.skipHtml;
	const unwrapDisallowed = options.unwrapDisallowed;
	const urlTransform = options.urlTransform || defaultUrlTransform;
	for (const deprecation of deprecations) if (Object.hasOwn(options, deprecation.from)) "" + deprecation.from + (deprecation.to ? "use `" + deprecation.to + "` instead" : "remove it") + deprecation.id;
	if (allowedElements && disallowedElements);
	if (options.className) tree = {
		type: "element",
		tagName: "div",
		properties: { className: options.className },
		children: tree.type === "root" ? tree.children : [tree]
	};
	visit(tree, transform);
	return toJsxRuntime(tree, {
		Fragment: import_jsx_runtime.Fragment,
		components,
		ignoreInvalidStyle: true,
		jsx: import_jsx_runtime.jsx,
		jsxs: import_jsx_runtime.jsxs,
		passKeys: true,
		passNode: true
	});
	function transform(node$1, index$2, parent) {
		if (node$1.type === "raw" && parent && typeof index$2 === "number") {
			if (skipHtml) parent.children.splice(index$2, 1);
			else parent.children[index$2] = {
				type: "text",
				value: node$1.value
			};
			return index$2;
		}
		if (node$1.type === "element") {
			let key;
			for (key in urlAttributes) if (Object.hasOwn(urlAttributes, key) && Object.hasOwn(node$1.properties, key)) {
				const value = node$1.properties[key];
				const test = urlAttributes[key];
				if (test === null || test.includes(node$1.tagName)) node$1.properties[key] = urlTransform(String(value || ""), key, node$1);
			}
		}
		if (node$1.type === "element") {
			let remove = allowedElements ? !allowedElements.includes(node$1.tagName) : disallowedElements ? disallowedElements.includes(node$1.tagName) : false;
			if (!remove && allowElement && typeof index$2 === "number") remove = !allowElement(node$1, index$2, parent);
			if (remove && parent && typeof index$2 === "number") {
				if (unwrapDisallowed && node$1.children) parent.children.splice(index$2, 1, ...node$1.children);
				else parent.children.splice(index$2, 1);
				return index$2;
			}
		}
	}
}
function defaultUrlTransform(value) {
	const colon = value.indexOf(":");
	const questionMark = value.indexOf("?");
	const numberSign = value.indexOf("#");
	const slash = value.indexOf("/");
	if (colon === -1 || slash !== -1 && colon > slash || questionMark !== -1 && colon > questionMark || numberSign !== -1 && colon > numberSign || safeProtocol.test(value.slice(0, colon))) return value;
	return "";
}
function escapeStringRegexp(string$2) {
	if (typeof string$2 !== "string") throw new TypeError("Expected a string");
	return string$2.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function findAndReplace(tree, list$3, options) {
	const ignored = convert((options || {}).ignore || []);
	const pairs = toPairs(list$3);
	let pairIndex = -1;
	while (++pairIndex < pairs.length) visitParents(tree, "text", visitor);
	function visitor(node$1, parents) {
		let index$2 = -1;
		let grandparent;
		while (++index$2 < parents.length) {
			const parent = parents[index$2];
			const siblings = grandparent ? grandparent.children : void 0;
			if (ignored(parent, siblings ? siblings.indexOf(parent) : void 0, grandparent)) return;
			grandparent = parent;
		}
		if (grandparent) return handler(node$1, parents);
	}
	function handler(node$1, parents) {
		const parent = parents[parents.length - 1];
		const find$1 = pairs[pairIndex][0];
		const replace$1 = pairs[pairIndex][1];
		let start = 0;
		const index$2 = parent.children.indexOf(node$1);
		let change = false;
		let nodes = [];
		find$1.lastIndex = 0;
		let match = find$1.exec(node$1.value);
		while (match) {
			const position$2 = match.index;
			const matchObject = {
				index: match.index,
				input: match.input,
				stack: [...parents, node$1]
			};
			let value = replace$1(...match, matchObject);
			if (typeof value === "string") value = value.length > 0 ? {
				type: "text",
				value
			} : void 0;
			if (value === false) find$1.lastIndex = position$2 + 1;
			else {
				if (start !== position$2) nodes.push({
					type: "text",
					value: node$1.value.slice(start, position$2)
				});
				if (Array.isArray(value)) nodes.push(...value);
				else if (value) nodes.push(value);
				start = position$2 + match[0].length;
				change = true;
			}
			if (!find$1.global) break;
			match = find$1.exec(node$1.value);
		}
		if (change) {
			if (start < node$1.value.length) nodes.push({
				type: "text",
				value: node$1.value.slice(start)
			});
			parent.children.splice(index$2, 1, ...nodes);
		} else nodes = [node$1];
		return index$2 + nodes.length;
	}
}
function toPairs(tupleOrList) {
	const result = [];
	if (!Array.isArray(tupleOrList)) throw new TypeError("Expected find and replace tuple or list of tuples");
	const list$3 = !tupleOrList[0] || Array.isArray(tupleOrList[0]) ? tupleOrList : [tupleOrList];
	let index$2 = -1;
	while (++index$2 < list$3.length) {
		const tuple = list$3[index$2];
		result.push([toExpression(tuple[0]), toFunction(tuple[1])]);
	}
	return result;
}
function toExpression(find$1) {
	return typeof find$1 === "string" ? new RegExp(escapeStringRegexp(find$1), "g") : find$1;
}
function toFunction(replace$1) {
	return typeof replace$1 === "function" ? replace$1 : function() {
		return replace$1;
	};
}
var inConstruct = "phrasing";
var notInConstruct = [
	"autolink",
	"link",
	"image",
	"label"
];
function gfmAutolinkLiteralFromMarkdown() {
	return {
		transforms: [transformGfmAutolinkLiterals],
		enter: {
			literalAutolink: enterLiteralAutolink,
			literalAutolinkEmail: enterLiteralAutolinkValue,
			literalAutolinkHttp: enterLiteralAutolinkValue,
			literalAutolinkWww: enterLiteralAutolinkValue
		},
		exit: {
			literalAutolink: exitLiteralAutolink,
			literalAutolinkEmail: exitLiteralAutolinkEmail,
			literalAutolinkHttp: exitLiteralAutolinkHttp,
			literalAutolinkWww: exitLiteralAutolinkWww
		}
	};
}
function gfmAutolinkLiteralToMarkdown() {
	return { unsafe: [
		{
			character: "@",
			before: "[+\\-.\\w]",
			after: "[\\-.\\w]",
			inConstruct,
			notInConstruct
		},
		{
			character: ".",
			before: "[Ww]",
			after: "[\\-.\\w]",
			inConstruct,
			notInConstruct
		},
		{
			character: ":",
			before: "[ps]",
			after: "\\/",
			inConstruct,
			notInConstruct
		}
	] };
}
function enterLiteralAutolink(token) {
	this.enter({
		type: "link",
		title: null,
		url: "",
		children: []
	}, token);
}
function enterLiteralAutolinkValue(token) {
	this.config.enter.autolinkProtocol.call(this, token);
}
function exitLiteralAutolinkHttp(token) {
	this.config.exit.autolinkProtocol.call(this, token);
}
function exitLiteralAutolinkWww(token) {
	this.config.exit.data.call(this, token);
	const node$1 = this.stack[this.stack.length - 1];
	node$1.type;
	node$1.url = "http://" + this.sliceSerialize(token);
}
function exitLiteralAutolinkEmail(token) {
	this.config.exit.autolinkEmail.call(this, token);
}
function exitLiteralAutolink(token) {
	this.exit(token);
}
function transformGfmAutolinkLiterals(tree) {
	findAndReplace(tree, [[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, findUrl], [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), findEmail]], { ignore: ["link", "linkReference"] });
}
function findUrl(_, protocol, domain$1, path$1, match) {
	let prefix = "";
	if (!previous(match)) return false;
	if (/^w/i.test(protocol)) {
		domain$1 = protocol + domain$1;
		protocol = "";
		prefix = "http://";
	}
	if (!isCorrectDomain(domain$1)) return false;
	const parts = splitUrl(domain$1 + path$1);
	if (!parts[0]) return false;
	const result = {
		type: "link",
		title: null,
		url: prefix + protocol + parts[0],
		children: [{
			type: "text",
			value: protocol + parts[0]
		}]
	};
	if (parts[1]) return [result, {
		type: "text",
		value: parts[1]
	}];
	return result;
}
function findEmail(_, atext, label, match) {
	if (!previous(match, true) || /[-\d_]$/.test(label)) return false;
	return {
		type: "link",
		title: null,
		url: "mailto:" + atext + "@" + label,
		children: [{
			type: "text",
			value: atext + "@" + label
		}]
	};
}
function isCorrectDomain(domain$1) {
	const parts = domain$1.split(".");
	if (parts.length < 2 || parts[parts.length - 1] && (/_/.test(parts[parts.length - 1]) || !/[a-zA-Z\d]/.test(parts[parts.length - 1])) || parts[parts.length - 2] && (/_/.test(parts[parts.length - 2]) || !/[a-zA-Z\d]/.test(parts[parts.length - 2]))) return false;
	return true;
}
function splitUrl(url) {
	const trailExec = /[!"&'),.:;<>?\]}]+$/.exec(url);
	if (!trailExec) return [url, void 0];
	url = url.slice(0, trailExec.index);
	let trail$1 = trailExec[0];
	let closingParenIndex = trail$1.indexOf(")");
	const openingParens = ccount(url, "(");
	let closingParens = ccount(url, ")");
	while (closingParenIndex !== -1 && openingParens > closingParens) {
		url += trail$1.slice(0, closingParenIndex + 1);
		trail$1 = trail$1.slice(closingParenIndex + 1);
		closingParenIndex = trail$1.indexOf(")");
		closingParens++;
	}
	return [url, trail$1];
}
function previous(match, email) {
	const code$3 = match.input.charCodeAt(match.index - 1);
	return (match.index === 0 || unicodeWhitespace(code$3) || unicodePunctuation(code$3)) && (!email || code$3 !== 47);
}
footnoteReference.peek = footnoteReferencePeek;
function enterFootnoteCallString() {
	this.buffer();
}
function enterFootnoteCall(token) {
	this.enter({
		type: "footnoteReference",
		identifier: "",
		label: ""
	}, token);
}
function enterFootnoteDefinitionLabelString() {
	this.buffer();
}
function enterFootnoteDefinition(token) {
	this.enter({
		type: "footnoteDefinition",
		identifier: "",
		label: "",
		children: []
	}, token);
}
function exitFootnoteCallString(token) {
	const label = this.resume();
	const node$1 = this.stack[this.stack.length - 1];
	node$1.type;
	node$1.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
	node$1.label = label;
}
function exitFootnoteCall(token) {
	this.exit(token);
}
function exitFootnoteDefinitionLabelString(token) {
	const label = this.resume();
	const node$1 = this.stack[this.stack.length - 1];
	node$1.type;
	node$1.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
	node$1.label = label;
}
function exitFootnoteDefinition(token) {
	this.exit(token);
}
function footnoteReferencePeek() {
	return "[";
}
function footnoteReference(node$1, _, state, info) {
	const tracker = state.createTracker(info);
	let value = tracker.move("[^");
	const exit$2 = state.enter("footnoteReference");
	const subexit = state.enter("reference");
	value += tracker.move(state.safe(state.associationId(node$1), {
		after: "]",
		before: value
	}));
	subexit();
	exit$2();
	value += tracker.move("]");
	return value;
}
function gfmFootnoteFromMarkdown() {
	return {
		enter: {
			gfmFootnoteCallString: enterFootnoteCallString,
			gfmFootnoteCall: enterFootnoteCall,
			gfmFootnoteDefinitionLabelString: enterFootnoteDefinitionLabelString,
			gfmFootnoteDefinition: enterFootnoteDefinition
		},
		exit: {
			gfmFootnoteCallString: exitFootnoteCallString,
			gfmFootnoteCall: exitFootnoteCall,
			gfmFootnoteDefinitionLabelString: exitFootnoteDefinitionLabelString,
			gfmFootnoteDefinition: exitFootnoteDefinition
		}
	};
}
function gfmFootnoteToMarkdown(options) {
	let firstLineBlank = false;
	if (options && options.firstLineBlank) firstLineBlank = true;
	return {
		handlers: {
			footnoteDefinition,
			footnoteReference
		},
		unsafe: [{
			character: "[",
			inConstruct: [
				"label",
				"phrasing",
				"reference"
			]
		}]
	};
	function footnoteDefinition(node$1, _, state, info) {
		const tracker = state.createTracker(info);
		let value = tracker.move("[^");
		const exit$2 = state.enter("footnoteDefinition");
		const subexit = state.enter("label");
		value += tracker.move(state.safe(state.associationId(node$1), {
			before: value,
			after: "]"
		}));
		subexit();
		value += tracker.move("]:");
		if (node$1.children && node$1.children.length > 0) {
			tracker.shift(4);
			value += tracker.move((firstLineBlank ? "\n" : " ") + state.indentLines(state.containerFlow(node$1, tracker.current()), firstLineBlank ? mapAll : mapExceptFirst));
		}
		exit$2();
		return value;
	}
}
function mapExceptFirst(line, index$2, blank) {
	return index$2 === 0 ? line : mapAll(line, index$2, blank);
}
function mapAll(line, index$2, blank) {
	return (blank ? "" : "    ") + line;
}
var constructsWithoutStrikethrough = [
	"autolink",
	"destinationLiteral",
	"destinationRaw",
	"reference",
	"titleQuote",
	"titleApostrophe"
];
handleDelete.peek = peekDelete;
function gfmStrikethroughFromMarkdown() {
	return {
		canContainEols: ["delete"],
		enter: { strikethrough: enterStrikethrough },
		exit: { strikethrough: exitStrikethrough }
	};
}
function gfmStrikethroughToMarkdown() {
	return {
		unsafe: [{
			character: "~",
			inConstruct: "phrasing",
			notInConstruct: constructsWithoutStrikethrough
		}],
		handlers: { delete: handleDelete }
	};
}
function enterStrikethrough(token) {
	this.enter({
		type: "delete",
		children: []
	}, token);
}
function exitStrikethrough(token) {
	this.exit(token);
}
function handleDelete(node$1, _, state, info) {
	const tracker = state.createTracker(info);
	const exit$2 = state.enter("strikethrough");
	let value = tracker.move("~~");
	value += state.containerPhrasing(node$1, {
		...tracker.current(),
		before: value,
		after: "~"
	});
	value += tracker.move("~~");
	exit$2();
	return value;
}
function peekDelete() {
	return "~";
}
function defaultStringLength(value) {
	return value.length;
}
function markdownTable(table$1, options) {
	const settings = options || {};
	const align = (settings.align || []).concat();
	const stringLength = settings.stringLength || defaultStringLength;
	const alignments = [];
	const cellMatrix = [];
	const sizeMatrix = [];
	const longestCellByColumn = [];
	let mostCellsPerRow = 0;
	let rowIndex = -1;
	while (++rowIndex < table$1.length) {
		const row$1 = [];
		const sizes$1 = [];
		let columnIndex$1 = -1;
		if (table$1[rowIndex].length > mostCellsPerRow) mostCellsPerRow = table$1[rowIndex].length;
		while (++columnIndex$1 < table$1[rowIndex].length) {
			const cell = serialize(table$1[rowIndex][columnIndex$1]);
			if (settings.alignDelimiters !== false) {
				const size = stringLength(cell);
				sizes$1[columnIndex$1] = size;
				if (longestCellByColumn[columnIndex$1] === void 0 || size > longestCellByColumn[columnIndex$1]) longestCellByColumn[columnIndex$1] = size;
			}
			row$1.push(cell);
		}
		cellMatrix[rowIndex] = row$1;
		sizeMatrix[rowIndex] = sizes$1;
	}
	let columnIndex = -1;
	if (typeof align === "object" && "length" in align) while (++columnIndex < mostCellsPerRow) alignments[columnIndex] = toAlignment(align[columnIndex]);
	else {
		const code$3 = toAlignment(align);
		while (++columnIndex < mostCellsPerRow) alignments[columnIndex] = code$3;
	}
	columnIndex = -1;
	const row = [];
	const sizes = [];
	while (++columnIndex < mostCellsPerRow) {
		const code$3 = alignments[columnIndex];
		let before = "";
		let after = "";
		if (code$3 === 99) {
			before = ":";
			after = ":";
		} else if (code$3 === 108) before = ":";
		else if (code$3 === 114) after = ":";
		let size = settings.alignDelimiters === false ? 1 : Math.max(1, longestCellByColumn[columnIndex] - before.length - after.length);
		const cell = before + "-".repeat(size) + after;
		if (settings.alignDelimiters !== false) {
			size = before.length + size + after.length;
			if (size > longestCellByColumn[columnIndex]) longestCellByColumn[columnIndex] = size;
			sizes[columnIndex] = size;
		}
		row[columnIndex] = cell;
	}
	cellMatrix.splice(1, 0, row);
	sizeMatrix.splice(1, 0, sizes);
	rowIndex = -1;
	const lines = [];
	while (++rowIndex < cellMatrix.length) {
		const row$1 = cellMatrix[rowIndex];
		const sizes$1 = sizeMatrix[rowIndex];
		columnIndex = -1;
		const line = [];
		while (++columnIndex < mostCellsPerRow) {
			const cell = row$1[columnIndex] || "";
			let before = "";
			let after = "";
			if (settings.alignDelimiters !== false) {
				const size = longestCellByColumn[columnIndex] - (sizes$1[columnIndex] || 0);
				const code$3 = alignments[columnIndex];
				if (code$3 === 114) before = " ".repeat(size);
				else if (code$3 === 99) if (size % 2) {
					before = " ".repeat(size / 2 + .5);
					after = " ".repeat(size / 2 - .5);
				} else {
					before = " ".repeat(size / 2);
					after = before;
				}
				else after = " ".repeat(size);
			}
			if (settings.delimiterStart !== false && !columnIndex) line.push("|");
			if (settings.padding !== false && !(settings.alignDelimiters === false && cell === "") && (settings.delimiterStart !== false || columnIndex)) line.push(" ");
			if (settings.alignDelimiters !== false) line.push(before);
			line.push(cell);
			if (settings.alignDelimiters !== false) line.push(after);
			if (settings.padding !== false) line.push(" ");
			if (settings.delimiterEnd !== false || columnIndex !== mostCellsPerRow - 1) line.push("|");
		}
		lines.push(settings.delimiterEnd === false ? line.join("").replace(/ +$/, "") : line.join(""));
	}
	return lines.join("\n");
}
function serialize(value) {
	return value === null || value === void 0 ? "" : String(value);
}
function toAlignment(value) {
	const code$3 = typeof value === "string" ? value.codePointAt(0) : 0;
	return code$3 === 67 || code$3 === 99 ? 99 : code$3 === 76 || code$3 === 108 ? 108 : code$3 === 82 || code$3 === 114 ? 114 : 0;
}
function blockquote(node$1, _, state, info) {
	const exit$2 = state.enter("blockquote");
	const tracker = state.createTracker(info);
	tracker.move("> ");
	tracker.shift(2);
	const value = state.indentLines(state.containerFlow(node$1, tracker.current()), map$1);
	exit$2();
	return value;
}
function map$1(line, _, blank) {
	return ">" + (blank ? "" : " ") + line;
}
function patternInScope(stack, pattern) {
	return listInScope(stack, pattern.inConstruct, true) && !listInScope(stack, pattern.notInConstruct, false);
}
function listInScope(stack, list$3, none) {
	if (typeof list$3 === "string") list$3 = [list$3];
	if (!list$3 || list$3.length === 0) return none;
	let index$2 = -1;
	while (++index$2 < list$3.length) if (stack.includes(list$3[index$2])) return true;
	return false;
}
function hardBreak(_, _1, state, info) {
	let index$2 = -1;
	while (++index$2 < state.unsafe.length) if (state.unsafe[index$2].character === "\n" && patternInScope(state.stack, state.unsafe[index$2])) return /[ \t]/.test(info.before) ? "" : " ";
	return "\\\n";
}
function longestStreak(value, substring) {
	const source = String(value);
	let index$2 = source.indexOf(substring);
	let expected = index$2;
	let count = 0;
	let max = 0;
	if (typeof substring !== "string") throw new TypeError("Expected substring");
	while (index$2 !== -1) {
		if (index$2 === expected) {
			if (++count > max) max = count;
		} else count = 1;
		expected = index$2 + substring.length;
		index$2 = source.indexOf(substring, expected);
	}
	return max;
}
function formatCodeAsIndented(node$1, state) {
	return Boolean(state.options.fences === false && node$1.value && !node$1.lang && /[^ \r\n]/.test(node$1.value) && !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(node$1.value));
}
function checkFence(state) {
	const marker = state.options.fence || "`";
	if (marker !== "`" && marker !== "~") throw new Error("Cannot serialize code with `" + marker + "` for `options.fence`, expected `` ` `` or `~`");
	return marker;
}
function code$1(node$1, _, state, info) {
	const marker = checkFence(state);
	const raw = node$1.value || "";
	const suffix = marker === "`" ? "GraveAccent" : "Tilde";
	if (formatCodeAsIndented(node$1, state)) {
		const exit$3 = state.enter("codeIndented");
		const value$1 = state.indentLines(raw, map);
		exit$3();
		return value$1;
	}
	const tracker = state.createTracker(info);
	const sequence = marker.repeat(Math.max(longestStreak(raw, marker) + 1, 3));
	const exit$2 = state.enter("codeFenced");
	let value = tracker.move(sequence);
	if (node$1.lang) {
		const subexit = state.enter(`codeFencedLang${suffix}`);
		value += tracker.move(state.safe(node$1.lang, {
			before: value,
			after: " ",
			encode: ["`"],
			...tracker.current()
		}));
		subexit();
	}
	if (node$1.lang && node$1.meta) {
		const subexit = state.enter(`codeFencedMeta${suffix}`);
		value += tracker.move(" ");
		value += tracker.move(state.safe(node$1.meta, {
			before: value,
			after: "\n",
			encode: ["`"],
			...tracker.current()
		}));
		subexit();
	}
	value += tracker.move("\n");
	if (raw) value += tracker.move(raw + "\n");
	value += tracker.move(sequence);
	exit$2();
	return value;
}
function map(line, _, blank) {
	return (blank ? "" : "    ") + line;
}
function checkQuote(state) {
	const marker = state.options.quote || "\"";
	if (marker !== "\"" && marker !== "'") throw new Error("Cannot serialize title with `" + marker + "` for `options.quote`, expected `\"`, or `'`");
	return marker;
}
function definition(node$1, _, state, info) {
	const quote = checkQuote(state);
	const suffix = quote === "\"" ? "Quote" : "Apostrophe";
	const exit$2 = state.enter("definition");
	let subexit = state.enter("label");
	const tracker = state.createTracker(info);
	let value = tracker.move("[");
	value += tracker.move(state.safe(state.associationId(node$1), {
		before: value,
		after: "]",
		...tracker.current()
	}));
	value += tracker.move("]: ");
	subexit();
	if (!node$1.url || /[\0- \u007F]/.test(node$1.url)) {
		subexit = state.enter("destinationLiteral");
		value += tracker.move("<");
		value += tracker.move(state.safe(node$1.url, {
			before: value,
			after: ">",
			...tracker.current()
		}));
		value += tracker.move(">");
	} else {
		subexit = state.enter("destinationRaw");
		value += tracker.move(state.safe(node$1.url, {
			before: value,
			after: node$1.title ? " " : "\n",
			...tracker.current()
		}));
	}
	subexit();
	if (node$1.title) {
		subexit = state.enter(`title${suffix}`);
		value += tracker.move(" " + quote);
		value += tracker.move(state.safe(node$1.title, {
			before: value,
			after: quote,
			...tracker.current()
		}));
		value += tracker.move(quote);
		subexit();
	}
	exit$2();
	return value;
}
function checkEmphasis(state) {
	const marker = state.options.emphasis || "*";
	if (marker !== "*" && marker !== "_") throw new Error("Cannot serialize emphasis with `" + marker + "` for `options.emphasis`, expected `*`, or `_`");
	return marker;
}
function encodeCharacterReference(code$3) {
	return "&#x" + code$3.toString(16).toUpperCase() + ";";
}
function encodeInfo(outside, inside, marker) {
	const outsideKind = classifyCharacter(outside);
	const insideKind = classifyCharacter(inside);
	if (outsideKind === void 0) return insideKind === void 0 ? marker === "_" ? {
		inside: true,
		outside: true
	} : {
		inside: false,
		outside: false
	} : insideKind === 1 ? {
		inside: true,
		outside: true
	} : {
		inside: false,
		outside: true
	};
	if (outsideKind === 1) return insideKind === void 0 ? {
		inside: false,
		outside: false
	} : insideKind === 1 ? {
		inside: true,
		outside: true
	} : {
		inside: false,
		outside: false
	};
	return insideKind === void 0 ? {
		inside: false,
		outside: false
	} : insideKind === 1 ? {
		inside: true,
		outside: false
	} : {
		inside: false,
		outside: false
	};
}
emphasis.peek = emphasisPeek;
function emphasis(node$1, _, state, info) {
	const marker = checkEmphasis(state);
	const exit$2 = state.enter("emphasis");
	const tracker = state.createTracker(info);
	const before = tracker.move(marker);
	let between = tracker.move(state.containerPhrasing(node$1, {
		after: marker,
		before,
		...tracker.current()
	}));
	const betweenHead = between.charCodeAt(0);
	const open = encodeInfo(info.before.charCodeAt(info.before.length - 1), betweenHead, marker);
	if (open.inside) between = encodeCharacterReference(betweenHead) + between.slice(1);
	const betweenTail = between.charCodeAt(between.length - 1);
	const close = encodeInfo(info.after.charCodeAt(0), betweenTail, marker);
	if (close.inside) between = between.slice(0, -1) + encodeCharacterReference(betweenTail);
	const after = tracker.move(marker);
	exit$2();
	state.attentionEncodeSurroundingInfo = {
		after: close.outside,
		before: open.outside
	};
	return before + between + after;
}
function emphasisPeek(_, _1, state) {
	return state.options.emphasis || "*";
}
function formatHeadingAsSetext(node$1, state) {
	let literalWithBreak = false;
	visit(node$1, function(node$2) {
		if ("value" in node$2 && /\r?\n|\r/.test(node$2.value) || node$2.type === "break") {
			literalWithBreak = true;
			return false;
		}
	});
	return Boolean((!node$1.depth || node$1.depth < 3) && toString(node$1) && (state.options.setext || literalWithBreak));
}
function heading(node$1, _, state, info) {
	const rank = Math.max(Math.min(6, node$1.depth || 1), 1);
	const tracker = state.createTracker(info);
	if (formatHeadingAsSetext(node$1, state)) {
		const exit$3 = state.enter("headingSetext");
		const subexit$1 = state.enter("phrasing");
		const value$1 = state.containerPhrasing(node$1, {
			...tracker.current(),
			before: "\n",
			after: "\n"
		});
		subexit$1();
		exit$3();
		return value$1 + "\n" + (rank === 1 ? "=" : "-").repeat(value$1.length - (Math.max(value$1.lastIndexOf("\r"), value$1.lastIndexOf("\n")) + 1));
	}
	const sequence = "#".repeat(rank);
	const exit$2 = state.enter("headingAtx");
	const subexit = state.enter("phrasing");
	tracker.move(sequence + " ");
	let value = state.containerPhrasing(node$1, {
		before: "# ",
		after: "\n",
		...tracker.current()
	});
	if (/^[\t ]/.test(value)) value = encodeCharacterReference(value.charCodeAt(0)) + value.slice(1);
	value = value ? sequence + " " + value : sequence;
	if (state.options.closeAtx) value += " " + sequence;
	subexit();
	exit$2();
	return value;
}
html.peek = htmlPeek;
function html(node$1) {
	return node$1.value || "";
}
function htmlPeek() {
	return "<";
}
image.peek = imagePeek;
function image(node$1, _, state, info) {
	const quote = checkQuote(state);
	const suffix = quote === "\"" ? "Quote" : "Apostrophe";
	const exit$2 = state.enter("image");
	let subexit = state.enter("label");
	const tracker = state.createTracker(info);
	let value = tracker.move("![");
	value += tracker.move(state.safe(node$1.alt, {
		before: value,
		after: "]",
		...tracker.current()
	}));
	value += tracker.move("](");
	subexit();
	if (!node$1.url && node$1.title || /[\0- \u007F]/.test(node$1.url)) {
		subexit = state.enter("destinationLiteral");
		value += tracker.move("<");
		value += tracker.move(state.safe(node$1.url, {
			before: value,
			after: ">",
			...tracker.current()
		}));
		value += tracker.move(">");
	} else {
		subexit = state.enter("destinationRaw");
		value += tracker.move(state.safe(node$1.url, {
			before: value,
			after: node$1.title ? " " : ")",
			...tracker.current()
		}));
	}
	subexit();
	if (node$1.title) {
		subexit = state.enter(`title${suffix}`);
		value += tracker.move(" " + quote);
		value += tracker.move(state.safe(node$1.title, {
			before: value,
			after: quote,
			...tracker.current()
		}));
		value += tracker.move(quote);
		subexit();
	}
	value += tracker.move(")");
	exit$2();
	return value;
}
function imagePeek() {
	return "!";
}
imageReference.peek = imageReferencePeek;
function imageReference(node$1, _, state, info) {
	const type = node$1.referenceType;
	const exit$2 = state.enter("imageReference");
	let subexit = state.enter("label");
	const tracker = state.createTracker(info);
	let value = tracker.move("![");
	const alt = state.safe(node$1.alt, {
		before: value,
		after: "]",
		...tracker.current()
	});
	value += tracker.move(alt + "][");
	subexit();
	const stack = state.stack;
	state.stack = [];
	subexit = state.enter("reference");
	const reference = state.safe(state.associationId(node$1), {
		before: value,
		after: "]",
		...tracker.current()
	});
	subexit();
	state.stack = stack;
	exit$2();
	if (type === "full" || !alt || alt !== reference) value += tracker.move(reference + "]");
	else if (type === "shortcut") value = value.slice(0, -1);
	else value += tracker.move("]");
	return value;
}
function imageReferencePeek() {
	return "!";
}
inlineCode.peek = inlineCodePeek;
function inlineCode(node$1, _, state) {
	let value = node$1.value || "";
	let sequence = "`";
	let index$2 = -1;
	while ((/* @__PURE__ */ new RegExp("(^|[^`])" + sequence + "([^`]|$)")).test(value)) sequence += "`";
	if (/[^ \r\n]/.test(value) && (/^[ \r\n]/.test(value) && /[ \r\n]$/.test(value) || /^`|`$/.test(value))) value = " " + value + " ";
	while (++index$2 < state.unsafe.length) {
		const pattern = state.unsafe[index$2];
		const expression = state.compilePattern(pattern);
		let match;
		if (!pattern.atBreak) continue;
		while (match = expression.exec(value)) {
			let position$2 = match.index;
			if (value.charCodeAt(position$2) === 10 && value.charCodeAt(position$2 - 1) === 13) position$2--;
			value = value.slice(0, position$2) + " " + value.slice(match.index + 1);
		}
	}
	return sequence + value + sequence;
}
function inlineCodePeek() {
	return "`";
}
function formatLinkAsAutolink(node$1, state) {
	const raw = toString(node$1);
	return Boolean(!state.options.resourceLink && node$1.url && !node$1.title && node$1.children && node$1.children.length === 1 && node$1.children[0].type === "text" && (raw === node$1.url || "mailto:" + raw === node$1.url) && /^[a-z][a-z+.-]+:/i.test(node$1.url) && !/[\0- <>\u007F]/.test(node$1.url));
}
link.peek = linkPeek;
function link(node$1, _, state, info) {
	const quote = checkQuote(state);
	const suffix = quote === "\"" ? "Quote" : "Apostrophe";
	const tracker = state.createTracker(info);
	let exit$2;
	let subexit;
	if (formatLinkAsAutolink(node$1, state)) {
		const stack = state.stack;
		state.stack = [];
		exit$2 = state.enter("autolink");
		let value$1 = tracker.move("<");
		value$1 += tracker.move(state.containerPhrasing(node$1, {
			before: value$1,
			after: ">",
			...tracker.current()
		}));
		value$1 += tracker.move(">");
		exit$2();
		state.stack = stack;
		return value$1;
	}
	exit$2 = state.enter("link");
	subexit = state.enter("label");
	let value = tracker.move("[");
	value += tracker.move(state.containerPhrasing(node$1, {
		before: value,
		after: "](",
		...tracker.current()
	}));
	value += tracker.move("](");
	subexit();
	if (!node$1.url && node$1.title || /[\0- \u007F]/.test(node$1.url)) {
		subexit = state.enter("destinationLiteral");
		value += tracker.move("<");
		value += tracker.move(state.safe(node$1.url, {
			before: value,
			after: ">",
			...tracker.current()
		}));
		value += tracker.move(">");
	} else {
		subexit = state.enter("destinationRaw");
		value += tracker.move(state.safe(node$1.url, {
			before: value,
			after: node$1.title ? " " : ")",
			...tracker.current()
		}));
	}
	subexit();
	if (node$1.title) {
		subexit = state.enter(`title${suffix}`);
		value += tracker.move(" " + quote);
		value += tracker.move(state.safe(node$1.title, {
			before: value,
			after: quote,
			...tracker.current()
		}));
		value += tracker.move(quote);
		subexit();
	}
	value += tracker.move(")");
	exit$2();
	return value;
}
function linkPeek(node$1, _, state) {
	return formatLinkAsAutolink(node$1, state) ? "<" : "[";
}
linkReference.peek = linkReferencePeek;
function linkReference(node$1, _, state, info) {
	const type = node$1.referenceType;
	const exit$2 = state.enter("linkReference");
	let subexit = state.enter("label");
	const tracker = state.createTracker(info);
	let value = tracker.move("[");
	const text$6 = state.containerPhrasing(node$1, {
		before: value,
		after: "]",
		...tracker.current()
	});
	value += tracker.move(text$6 + "][");
	subexit();
	const stack = state.stack;
	state.stack = [];
	subexit = state.enter("reference");
	const reference = state.safe(state.associationId(node$1), {
		before: value,
		after: "]",
		...tracker.current()
	});
	subexit();
	state.stack = stack;
	exit$2();
	if (type === "full" || !text$6 || text$6 !== reference) value += tracker.move(reference + "]");
	else if (type === "shortcut") value = value.slice(0, -1);
	else value += tracker.move("]");
	return value;
}
function linkReferencePeek() {
	return "[";
}
function checkBullet(state) {
	const marker = state.options.bullet || "*";
	if (marker !== "*" && marker !== "+" && marker !== "-") throw new Error("Cannot serialize items with `" + marker + "` for `options.bullet`, expected `*`, `+`, or `-`");
	return marker;
}
function checkBulletOther(state) {
	const bullet = checkBullet(state);
	const bulletOther = state.options.bulletOther;
	if (!bulletOther) return bullet === "*" ? "-" : "*";
	if (bulletOther !== "*" && bulletOther !== "+" && bulletOther !== "-") throw new Error("Cannot serialize items with `" + bulletOther + "` for `options.bulletOther`, expected `*`, `+`, or `-`");
	if (bulletOther === bullet) throw new Error("Expected `bullet` (`" + bullet + "`) and `bulletOther` (`" + bulletOther + "`) to be different");
	return bulletOther;
}
function checkBulletOrdered(state) {
	const marker = state.options.bulletOrdered || ".";
	if (marker !== "." && marker !== ")") throw new Error("Cannot serialize items with `" + marker + "` for `options.bulletOrdered`, expected `.` or `)`");
	return marker;
}
function checkRule(state) {
	const marker = state.options.rule || "*";
	if (marker !== "*" && marker !== "-" && marker !== "_") throw new Error("Cannot serialize rules with `" + marker + "` for `options.rule`, expected `*`, `-`, or `_`");
	return marker;
}
function list(node$1, parent, state, info) {
	const exit$2 = state.enter("list");
	const bulletCurrent = state.bulletCurrent;
	let bullet = node$1.ordered ? checkBulletOrdered(state) : checkBullet(state);
	const bulletOther = node$1.ordered ? bullet === "." ? ")" : "." : checkBulletOther(state);
	let useDifferentMarker = parent && state.bulletLastUsed ? bullet === state.bulletLastUsed : false;
	if (!node$1.ordered) {
		const firstListItem = node$1.children ? node$1.children[0] : void 0;
		if ((bullet === "*" || bullet === "-") && firstListItem && (!firstListItem.children || !firstListItem.children[0]) && state.stack[state.stack.length - 1] === "list" && state.stack[state.stack.length - 2] === "listItem" && state.stack[state.stack.length - 3] === "list" && state.stack[state.stack.length - 4] === "listItem" && state.indexStack[state.indexStack.length - 1] === 0 && state.indexStack[state.indexStack.length - 2] === 0 && state.indexStack[state.indexStack.length - 3] === 0) useDifferentMarker = true;
		if (checkRule(state) === bullet && firstListItem) {
			let index$2 = -1;
			while (++index$2 < node$1.children.length) {
				const item = node$1.children[index$2];
				if (item && item.type === "listItem" && item.children && item.children[0] && item.children[0].type === "thematicBreak") {
					useDifferentMarker = true;
					break;
				}
			}
		}
	}
	if (useDifferentMarker) bullet = bulletOther;
	state.bulletCurrent = bullet;
	const value = state.containerFlow(node$1, info);
	state.bulletLastUsed = bullet;
	state.bulletCurrent = bulletCurrent;
	exit$2();
	return value;
}
function checkListItemIndent(state) {
	const style = state.options.listItemIndent || "one";
	if (style !== "tab" && style !== "one" && style !== "mixed") throw new Error("Cannot serialize items with `" + style + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");
	return style;
}
function listItem(node$1, parent, state, info) {
	const listItemIndent = checkListItemIndent(state);
	let bullet = state.bulletCurrent || checkBullet(state);
	if (parent && parent.type === "list" && parent.ordered) bullet = (typeof parent.start === "number" && parent.start > -1 ? parent.start : 1) + (state.options.incrementListMarker === false ? 0 : parent.children.indexOf(node$1)) + bullet;
	let size = bullet.length + 1;
	if (listItemIndent === "tab" || listItemIndent === "mixed" && (parent && parent.type === "list" && parent.spread || node$1.spread)) size = Math.ceil(size / 4) * 4;
	const tracker = state.createTracker(info);
	tracker.move(bullet + " ".repeat(size - bullet.length));
	tracker.shift(size);
	const exit$2 = state.enter("listItem");
	const value = state.indentLines(state.containerFlow(node$1, tracker.current()), map$2);
	exit$2();
	return value;
	function map$2(line, index$2, blank) {
		if (index$2) return (blank ? "" : " ".repeat(size)) + line;
		return (blank ? bullet : bullet + " ".repeat(size - bullet.length)) + line;
	}
}
function paragraph(node$1, _, state, info) {
	const exit$2 = state.enter("paragraph");
	const subexit = state.enter("phrasing");
	const value = state.containerPhrasing(node$1, info);
	subexit();
	exit$2();
	return value;
}
const phrasing = convert([
	"break",
	"delete",
	"emphasis",
	"footnote",
	"footnoteReference",
	"image",
	"imageReference",
	"inlineCode",
	"inlineMath",
	"link",
	"linkReference",
	"mdxJsxTextElement",
	"mdxTextExpression",
	"strong",
	"text",
	"textDirective"
]);
function root(node$1, _, state, info) {
	return (node$1.children.some(function(d) {
		return phrasing(d);
	}) ? state.containerPhrasing : state.containerFlow).call(state, node$1, info);
}
function checkStrong(state) {
	const marker = state.options.strong || "*";
	if (marker !== "*" && marker !== "_") throw new Error("Cannot serialize strong with `" + marker + "` for `options.strong`, expected `*`, or `_`");
	return marker;
}
strong.peek = strongPeek;
function strong(node$1, _, state, info) {
	const marker = checkStrong(state);
	const exit$2 = state.enter("strong");
	const tracker = state.createTracker(info);
	const before = tracker.move(marker + marker);
	let between = tracker.move(state.containerPhrasing(node$1, {
		after: marker,
		before,
		...tracker.current()
	}));
	const betweenHead = between.charCodeAt(0);
	const open = encodeInfo(info.before.charCodeAt(info.before.length - 1), betweenHead, marker);
	if (open.inside) between = encodeCharacterReference(betweenHead) + between.slice(1);
	const betweenTail = between.charCodeAt(between.length - 1);
	const close = encodeInfo(info.after.charCodeAt(0), betweenTail, marker);
	if (close.inside) between = between.slice(0, -1) + encodeCharacterReference(betweenTail);
	const after = tracker.move(marker + marker);
	exit$2();
	state.attentionEncodeSurroundingInfo = {
		after: close.outside,
		before: open.outside
	};
	return before + between + after;
}
function strongPeek(_, _1, state) {
	return state.options.strong || "*";
}
function text$1(node$1, _, state, info) {
	return state.safe(node$1.value, info);
}
function checkRuleRepetition(state) {
	const repetition = state.options.ruleRepetition || 3;
	if (repetition < 3) throw new Error("Cannot serialize rules with repetition `" + repetition + "` for `options.ruleRepetition`, expected `3` or more");
	return repetition;
}
function thematicBreak(_, _1, state) {
	const value = (checkRule(state) + (state.options.ruleSpaces ? " " : "")).repeat(checkRuleRepetition(state));
	return state.options.ruleSpaces ? value.slice(0, -1) : value;
}
const handle = {
	blockquote,
	break: hardBreak,
	code: code$1,
	definition,
	emphasis,
	hardBreak,
	heading,
	html,
	image,
	imageReference,
	inlineCode,
	link,
	linkReference,
	list,
	listItem,
	paragraph,
	root,
	strong,
	text: text$1,
	thematicBreak
};
function gfmTableFromMarkdown() {
	return {
		enter: {
			table: enterTable,
			tableData: enterCell,
			tableHeader: enterCell,
			tableRow: enterRow
		},
		exit: {
			codeText: exitCodeText,
			table: exitTable,
			tableData: exit,
			tableHeader: exit,
			tableRow: exit
		}
	};
}
function enterTable(token) {
	const align = token._align;
	this.enter({
		type: "table",
		align: align.map(function(d) {
			return d === "none" ? null : d;
		}),
		children: []
	}, token);
	this.data.inTable = true;
}
function exitTable(token) {
	this.exit(token);
	this.data.inTable = void 0;
}
function enterRow(token) {
	this.enter({
		type: "tableRow",
		children: []
	}, token);
}
function exit(token) {
	this.exit(token);
}
function enterCell(token) {
	this.enter({
		type: "tableCell",
		children: []
	}, token);
}
function exitCodeText(token) {
	let value = this.resume();
	if (this.data.inTable) value = value.replace(/\\([\\|])/g, replace);
	const node$1 = this.stack[this.stack.length - 1];
	node$1.type;
	node$1.value = value;
	this.exit(token);
}
function replace($0, $1) {
	return $1 === "|" ? $1 : $0;
}
function gfmTableToMarkdown(options) {
	const settings = options || {};
	const padding = settings.tableCellPadding;
	const alignDelimiters = settings.tablePipeAlign;
	const stringLength = settings.stringLength;
	const around = padding ? " " : "|";
	return {
		unsafe: [
			{
				character: "\r",
				inConstruct: "tableCell"
			},
			{
				character: "\n",
				inConstruct: "tableCell"
			},
			{
				atBreak: true,
				character: "|",
				after: "[	 :-]"
			},
			{
				character: "|",
				inConstruct: "tableCell"
			},
			{
				atBreak: true,
				character: ":",
				after: "-"
			},
			{
				atBreak: true,
				character: "-",
				after: "[:|-]"
			}
		],
		handlers: {
			inlineCode: inlineCodeWithTable,
			table: handleTable,
			tableCell: handleTableCell,
			tableRow: handleTableRow
		}
	};
	function handleTable(node$1, _, state, info) {
		return serializeData(handleTableAsData(node$1, state, info), node$1.align);
	}
	function handleTableRow(node$1, _, state, info) {
		const value = serializeData([handleTableRowAsData(node$1, state, info)]);
		return value.slice(0, value.indexOf("\n"));
	}
	function handleTableCell(node$1, _, state, info) {
		const exit$2 = state.enter("tableCell");
		const subexit = state.enter("phrasing");
		const value = state.containerPhrasing(node$1, {
			...info,
			before: around,
			after: around
		});
		subexit();
		exit$2();
		return value;
	}
	function serializeData(matrix, align) {
		return markdownTable(matrix, {
			align,
			alignDelimiters,
			padding,
			stringLength
		});
	}
	function handleTableAsData(node$1, state, info) {
		const children = node$1.children;
		let index$2 = -1;
		const result = [];
		const subexit = state.enter("table");
		while (++index$2 < children.length) result[index$2] = handleTableRowAsData(children[index$2], state, info);
		subexit();
		return result;
	}
	function handleTableRowAsData(node$1, state, info) {
		const children = node$1.children;
		let index$2 = -1;
		const result = [];
		const subexit = state.enter("tableRow");
		while (++index$2 < children.length) result[index$2] = handleTableCell(children[index$2], node$1, state, info);
		subexit();
		return result;
	}
	function inlineCodeWithTable(node$1, parent, state) {
		let value = handle.inlineCode(node$1, parent, state);
		if (state.stack.includes("tableCell")) value = value.replace(/\|/g, "\\$&");
		return value;
	}
}
function gfmTaskListItemFromMarkdown() {
	return { exit: {
		taskListCheckValueChecked: exitCheck,
		taskListCheckValueUnchecked: exitCheck,
		paragraph: exitParagraphWithTaskListItem
	} };
}
function gfmTaskListItemToMarkdown() {
	return {
		unsafe: [{
			atBreak: true,
			character: "-",
			after: "[:|-]"
		}],
		handlers: { listItem: listItemWithTaskListItem }
	};
}
function exitCheck(token) {
	const node$1 = this.stack[this.stack.length - 2];
	node$1.type;
	node$1.checked = token.type === "taskListCheckValueChecked";
}
function exitParagraphWithTaskListItem(token) {
	const parent = this.stack[this.stack.length - 2];
	if (parent && parent.type === "listItem" && typeof parent.checked === "boolean") {
		const node$1 = this.stack[this.stack.length - 1];
		node$1.type;
		const head = node$1.children[0];
		if (head && head.type === "text") {
			const siblings = parent.children;
			let index$2 = -1;
			let firstParaghraph;
			while (++index$2 < siblings.length) {
				const sibling = siblings[index$2];
				if (sibling.type === "paragraph") {
					firstParaghraph = sibling;
					break;
				}
			}
			if (firstParaghraph === node$1) {
				head.value = head.value.slice(1);
				if (head.value.length === 0) node$1.children.shift();
				else if (node$1.position && head.position && typeof head.position.start.offset === "number") {
					head.position.start.column++;
					head.position.start.offset++;
					node$1.position.start = Object.assign({}, head.position.start);
				}
			}
		}
	}
	this.exit(token);
}
function listItemWithTaskListItem(node$1, parent, state, info) {
	const head = node$1.children[0];
	const checkable = typeof node$1.checked === "boolean" && head && head.type === "paragraph";
	const checkbox = "[" + (node$1.checked ? "x" : " ") + "] ";
	const tracker = state.createTracker(info);
	if (checkable) tracker.move(checkbox);
	let value = handle.listItem(node$1, parent, state, {
		...info,
		...tracker.current()
	});
	if (checkable) value = value.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, check);
	return value;
	function check($0) {
		return $0 + checkbox;
	}
}
function gfmFromMarkdown() {
	return [
		gfmAutolinkLiteralFromMarkdown(),
		gfmFootnoteFromMarkdown(),
		gfmStrikethroughFromMarkdown(),
		gfmTableFromMarkdown(),
		gfmTaskListItemFromMarkdown()
	];
}
function gfmToMarkdown(options) {
	return { extensions: [
		gfmAutolinkLiteralToMarkdown(),
		gfmFootnoteToMarkdown(options),
		gfmStrikethroughToMarkdown(),
		gfmTableToMarkdown(options),
		gfmTaskListItemToMarkdown()
	] };
}
var wwwPrefix = {
	tokenize: tokenizeWwwPrefix,
	partial: true
};
var domain = {
	tokenize: tokenizeDomain,
	partial: true
};
var path = {
	tokenize: tokenizePath,
	partial: true
};
var trail = {
	tokenize: tokenizeTrail,
	partial: true
};
var emailDomainDotTrail = {
	tokenize: tokenizeEmailDomainDotTrail,
	partial: true
};
var wwwAutolink = {
	name: "wwwAutolink",
	tokenize: tokenizeWwwAutolink,
	previous: previousWww
};
var protocolAutolink = {
	name: "protocolAutolink",
	tokenize: tokenizeProtocolAutolink,
	previous: previousProtocol
};
var emailAutolink = {
	name: "emailAutolink",
	tokenize: tokenizeEmailAutolink,
	previous: previousEmail
};
var text = {};
function gfmAutolinkLiteral() {
	return { text };
}
var code = 48;
while (code < 123) {
	text[code] = emailAutolink;
	code++;
	if (code === 58) code = 65;
	else if (code === 91) code = 97;
}
text[43] = emailAutolink;
text[45] = emailAutolink;
text[46] = emailAutolink;
text[95] = emailAutolink;
text[72] = [emailAutolink, protocolAutolink];
text[104] = [emailAutolink, protocolAutolink];
text[87] = [emailAutolink, wwwAutolink];
text[119] = [emailAutolink, wwwAutolink];
function tokenizeEmailAutolink(effects, ok$2, nok) {
	const self$1 = this;
	let dot;
	let data;
	return start;
	function start(code$3) {
		if (!gfmAtext(code$3) || !previousEmail.call(self$1, self$1.previous) || previousUnbalanced(self$1.events)) return nok(code$3);
		effects.enter("literalAutolink");
		effects.enter("literalAutolinkEmail");
		return atext(code$3);
	}
	function atext(code$3) {
		if (gfmAtext(code$3)) {
			effects.consume(code$3);
			return atext;
		}
		if (code$3 === 64) {
			effects.consume(code$3);
			return emailDomain;
		}
		return nok(code$3);
	}
	function emailDomain(code$3) {
		if (code$3 === 46) return effects.check(emailDomainDotTrail, emailDomainAfter, emailDomainDot)(code$3);
		if (code$3 === 45 || code$3 === 95 || asciiAlphanumeric(code$3)) {
			data = true;
			effects.consume(code$3);
			return emailDomain;
		}
		return emailDomainAfter(code$3);
	}
	function emailDomainDot(code$3) {
		effects.consume(code$3);
		dot = true;
		return emailDomain;
	}
	function emailDomainAfter(code$3) {
		if (data && dot && asciiAlpha(self$1.previous)) {
			effects.exit("literalAutolinkEmail");
			effects.exit("literalAutolink");
			return ok$2(code$3);
		}
		return nok(code$3);
	}
}
function tokenizeWwwAutolink(effects, ok$2, nok) {
	const self$1 = this;
	return wwwStart;
	function wwwStart(code$3) {
		if (code$3 !== 87 && code$3 !== 119 || !previousWww.call(self$1, self$1.previous) || previousUnbalanced(self$1.events)) return nok(code$3);
		effects.enter("literalAutolink");
		effects.enter("literalAutolinkWww");
		return effects.check(wwwPrefix, effects.attempt(domain, effects.attempt(path, wwwAfter), nok), nok)(code$3);
	}
	function wwwAfter(code$3) {
		effects.exit("literalAutolinkWww");
		effects.exit("literalAutolink");
		return ok$2(code$3);
	}
}
function tokenizeProtocolAutolink(effects, ok$2, nok) {
	const self$1 = this;
	let buffer = "";
	let seen = false;
	return protocolStart;
	function protocolStart(code$3) {
		if ((code$3 === 72 || code$3 === 104) && previousProtocol.call(self$1, self$1.previous) && !previousUnbalanced(self$1.events)) {
			effects.enter("literalAutolink");
			effects.enter("literalAutolinkHttp");
			buffer += String.fromCodePoint(code$3);
			effects.consume(code$3);
			return protocolPrefixInside;
		}
		return nok(code$3);
	}
	function protocolPrefixInside(code$3) {
		if (asciiAlpha(code$3) && buffer.length < 5) {
			buffer += String.fromCodePoint(code$3);
			effects.consume(code$3);
			return protocolPrefixInside;
		}
		if (code$3 === 58) {
			const protocol = buffer.toLowerCase();
			if (protocol === "http" || protocol === "https") {
				effects.consume(code$3);
				return protocolSlashesInside;
			}
		}
		return nok(code$3);
	}
	function protocolSlashesInside(code$3) {
		if (code$3 === 47) {
			effects.consume(code$3);
			if (seen) return afterProtocol;
			seen = true;
			return protocolSlashesInside;
		}
		return nok(code$3);
	}
	function afterProtocol(code$3) {
		return code$3 === null || asciiControl(code$3) || markdownLineEndingOrSpace(code$3) || unicodeWhitespace(code$3) || unicodePunctuation(code$3) ? nok(code$3) : effects.attempt(domain, effects.attempt(path, protocolAfter), nok)(code$3);
	}
	function protocolAfter(code$3) {
		effects.exit("literalAutolinkHttp");
		effects.exit("literalAutolink");
		return ok$2(code$3);
	}
}
function tokenizeWwwPrefix(effects, ok$2, nok) {
	let size = 0;
	return wwwPrefixInside;
	function wwwPrefixInside(code$3) {
		if ((code$3 === 87 || code$3 === 119) && size < 3) {
			size++;
			effects.consume(code$3);
			return wwwPrefixInside;
		}
		if (code$3 === 46 && size === 3) {
			effects.consume(code$3);
			return wwwPrefixAfter;
		}
		return nok(code$3);
	}
	function wwwPrefixAfter(code$3) {
		return code$3 === null ? nok(code$3) : ok$2(code$3);
	}
}
function tokenizeDomain(effects, ok$2, nok) {
	let underscoreInLastSegment;
	let underscoreInLastLastSegment;
	let seen;
	return domainInside;
	function domainInside(code$3) {
		if (code$3 === 46 || code$3 === 95) return effects.check(trail, domainAfter, domainAtPunctuation)(code$3);
		if (code$3 === null || markdownLineEndingOrSpace(code$3) || unicodeWhitespace(code$3) || code$3 !== 45 && unicodePunctuation(code$3)) return domainAfter(code$3);
		seen = true;
		effects.consume(code$3);
		return domainInside;
	}
	function domainAtPunctuation(code$3) {
		if (code$3 === 95) underscoreInLastSegment = true;
		else {
			underscoreInLastLastSegment = underscoreInLastSegment;
			underscoreInLastSegment = void 0;
		}
		effects.consume(code$3);
		return domainInside;
	}
	function domainAfter(code$3) {
		if (underscoreInLastLastSegment || underscoreInLastSegment || !seen) return nok(code$3);
		return ok$2(code$3);
	}
}
function tokenizePath(effects, ok$2) {
	let sizeOpen = 0;
	let sizeClose = 0;
	return pathInside;
	function pathInside(code$3) {
		if (code$3 === 40) {
			sizeOpen++;
			effects.consume(code$3);
			return pathInside;
		}
		if (code$3 === 41 && sizeClose < sizeOpen) return pathAtPunctuation(code$3);
		if (code$3 === 33 || code$3 === 34 || code$3 === 38 || code$3 === 39 || code$3 === 41 || code$3 === 42 || code$3 === 44 || code$3 === 46 || code$3 === 58 || code$3 === 59 || code$3 === 60 || code$3 === 63 || code$3 === 93 || code$3 === 95 || code$3 === 126) return effects.check(trail, ok$2, pathAtPunctuation)(code$3);
		if (code$3 === null || markdownLineEndingOrSpace(code$3) || unicodeWhitespace(code$3)) return ok$2(code$3);
		effects.consume(code$3);
		return pathInside;
	}
	function pathAtPunctuation(code$3) {
		if (code$3 === 41) sizeClose++;
		effects.consume(code$3);
		return pathInside;
	}
}
function tokenizeTrail(effects, ok$2, nok) {
	return trail$1;
	function trail$1(code$3) {
		if (code$3 === 33 || code$3 === 34 || code$3 === 39 || code$3 === 41 || code$3 === 42 || code$3 === 44 || code$3 === 46 || code$3 === 58 || code$3 === 59 || code$3 === 63 || code$3 === 95 || code$3 === 126) {
			effects.consume(code$3);
			return trail$1;
		}
		if (code$3 === 38) {
			effects.consume(code$3);
			return trailCharacterReferenceStart;
		}
		if (code$3 === 93) {
			effects.consume(code$3);
			return trailBracketAfter;
		}
		if (code$3 === 60 || code$3 === null || markdownLineEndingOrSpace(code$3) || unicodeWhitespace(code$3)) return ok$2(code$3);
		return nok(code$3);
	}
	function trailBracketAfter(code$3) {
		if (code$3 === null || code$3 === 40 || code$3 === 91 || markdownLineEndingOrSpace(code$3) || unicodeWhitespace(code$3)) return ok$2(code$3);
		return trail$1(code$3);
	}
	function trailCharacterReferenceStart(code$3) {
		return asciiAlpha(code$3) ? trailCharacterReferenceInside(code$3) : nok(code$3);
	}
	function trailCharacterReferenceInside(code$3) {
		if (code$3 === 59) {
			effects.consume(code$3);
			return trail$1;
		}
		if (asciiAlpha(code$3)) {
			effects.consume(code$3);
			return trailCharacterReferenceInside;
		}
		return nok(code$3);
	}
}
function tokenizeEmailDomainDotTrail(effects, ok$2, nok) {
	return start;
	function start(code$3) {
		effects.consume(code$3);
		return after;
	}
	function after(code$3) {
		return asciiAlphanumeric(code$3) ? nok(code$3) : ok$2(code$3);
	}
}
function previousWww(code$3) {
	return code$3 === null || code$3 === 40 || code$3 === 42 || code$3 === 95 || code$3 === 91 || code$3 === 93 || code$3 === 126 || markdownLineEndingOrSpace(code$3);
}
function previousProtocol(code$3) {
	return !asciiAlpha(code$3);
}
function previousEmail(code$3) {
	return !(code$3 === 47 || gfmAtext(code$3));
}
function gfmAtext(code$3) {
	return code$3 === 43 || code$3 === 45 || code$3 === 46 || code$3 === 95 || asciiAlphanumeric(code$3);
}
function previousUnbalanced(events) {
	let index$2 = events.length;
	let result = false;
	while (index$2--) {
		const token = events[index$2][1];
		if ((token.type === "labelLink" || token.type === "labelImage") && !token._balanced) {
			result = true;
			break;
		}
		if (token._gfmAutolinkLiteralWalkedInto) {
			result = false;
			break;
		}
	}
	if (events.length > 0 && !result) events[events.length - 1][1]._gfmAutolinkLiteralWalkedInto = true;
	return result;
}
var indent = {
	tokenize: tokenizeIndent,
	partial: true
};
function gfmFootnote() {
	return {
		document: { [91]: {
			name: "gfmFootnoteDefinition",
			tokenize: tokenizeDefinitionStart,
			continuation: { tokenize: tokenizeDefinitionContinuation },
			exit: gfmFootnoteDefinitionEnd
		} },
		text: {
			[91]: {
				name: "gfmFootnoteCall",
				tokenize: tokenizeGfmFootnoteCall
			},
			[93]: {
				name: "gfmPotentialFootnoteCall",
				add: "after",
				tokenize: tokenizePotentialGfmFootnoteCall,
				resolveTo: resolveToPotentialGfmFootnoteCall
			}
		}
	};
}
function tokenizePotentialGfmFootnoteCall(effects, ok$2, nok) {
	const self$1 = this;
	let index$2 = self$1.events.length;
	const defined = self$1.parser.gfmFootnotes || (self$1.parser.gfmFootnotes = []);
	let labelStart;
	while (index$2--) {
		const token = self$1.events[index$2][1];
		if (token.type === "labelImage") {
			labelStart = token;
			break;
		}
		if (token.type === "gfmFootnoteCall" || token.type === "labelLink" || token.type === "label" || token.type === "image" || token.type === "link") break;
	}
	return start;
	function start(code$3) {
		if (!labelStart || !labelStart._balanced) return nok(code$3);
		const id = normalizeIdentifier(self$1.sliceSerialize({
			start: labelStart.end,
			end: self$1.now()
		}));
		if (id.codePointAt(0) !== 94 || !defined.includes(id.slice(1))) return nok(code$3);
		effects.enter("gfmFootnoteCallLabelMarker");
		effects.consume(code$3);
		effects.exit("gfmFootnoteCallLabelMarker");
		return ok$2(code$3);
	}
}
function resolveToPotentialGfmFootnoteCall(events, context) {
	let index$2 = events.length;
	while (index$2--) if (events[index$2][1].type === "labelImage" && events[index$2][0] === "enter") {
		events[index$2][1];
		break;
	}
	events[index$2 + 1][1].type = "data";
	events[index$2 + 3][1].type = "gfmFootnoteCallLabelMarker";
	const call = {
		type: "gfmFootnoteCall",
		start: Object.assign({}, events[index$2 + 3][1].start),
		end: Object.assign({}, events[events.length - 1][1].end)
	};
	const marker = {
		type: "gfmFootnoteCallMarker",
		start: Object.assign({}, events[index$2 + 3][1].end),
		end: Object.assign({}, events[index$2 + 3][1].end)
	};
	marker.end.column++;
	marker.end.offset++;
	marker.end._bufferIndex++;
	const string$2 = {
		type: "gfmFootnoteCallString",
		start: Object.assign({}, marker.end),
		end: Object.assign({}, events[events.length - 1][1].start)
	};
	const chunk = {
		type: "chunkString",
		contentType: "string",
		start: Object.assign({}, string$2.start),
		end: Object.assign({}, string$2.end)
	};
	const replacement = [
		events[index$2 + 1],
		events[index$2 + 2],
		[
			"enter",
			call,
			context
		],
		events[index$2 + 3],
		events[index$2 + 4],
		[
			"enter",
			marker,
			context
		],
		[
			"exit",
			marker,
			context
		],
		[
			"enter",
			string$2,
			context
		],
		[
			"enter",
			chunk,
			context
		],
		[
			"exit",
			chunk,
			context
		],
		[
			"exit",
			string$2,
			context
		],
		events[events.length - 2],
		events[events.length - 1],
		[
			"exit",
			call,
			context
		]
	];
	events.splice(index$2, events.length - index$2 + 1, ...replacement);
	return events;
}
function tokenizeGfmFootnoteCall(effects, ok$2, nok) {
	const self$1 = this;
	const defined = self$1.parser.gfmFootnotes || (self$1.parser.gfmFootnotes = []);
	let size = 0;
	let data;
	return start;
	function start(code$3) {
		effects.enter("gfmFootnoteCall");
		effects.enter("gfmFootnoteCallLabelMarker");
		effects.consume(code$3);
		effects.exit("gfmFootnoteCallLabelMarker");
		return callStart;
	}
	function callStart(code$3) {
		if (code$3 !== 94) return nok(code$3);
		effects.enter("gfmFootnoteCallMarker");
		effects.consume(code$3);
		effects.exit("gfmFootnoteCallMarker");
		effects.enter("gfmFootnoteCallString");
		effects.enter("chunkString").contentType = "string";
		return callData;
	}
	function callData(code$3) {
		if (size > 999 || code$3 === 93 && !data || code$3 === null || code$3 === 91 || markdownLineEndingOrSpace(code$3)) return nok(code$3);
		if (code$3 === 93) {
			effects.exit("chunkString");
			const token = effects.exit("gfmFootnoteCallString");
			if (!defined.includes(normalizeIdentifier(self$1.sliceSerialize(token)))) return nok(code$3);
			effects.enter("gfmFootnoteCallLabelMarker");
			effects.consume(code$3);
			effects.exit("gfmFootnoteCallLabelMarker");
			effects.exit("gfmFootnoteCall");
			return ok$2;
		}
		if (!markdownLineEndingOrSpace(code$3)) data = true;
		size++;
		effects.consume(code$3);
		return code$3 === 92 ? callEscape : callData;
	}
	function callEscape(code$3) {
		if (code$3 === 91 || code$3 === 92 || code$3 === 93) {
			effects.consume(code$3);
			size++;
			return callData;
		}
		return callData(code$3);
	}
}
function tokenizeDefinitionStart(effects, ok$2, nok) {
	const self$1 = this;
	const defined = self$1.parser.gfmFootnotes || (self$1.parser.gfmFootnotes = []);
	let identifier;
	let size = 0;
	let data;
	return start;
	function start(code$3) {
		effects.enter("gfmFootnoteDefinition")._container = true;
		effects.enter("gfmFootnoteDefinitionLabel");
		effects.enter("gfmFootnoteDefinitionLabelMarker");
		effects.consume(code$3);
		effects.exit("gfmFootnoteDefinitionLabelMarker");
		return labelAtMarker;
	}
	function labelAtMarker(code$3) {
		if (code$3 === 94) {
			effects.enter("gfmFootnoteDefinitionMarker");
			effects.consume(code$3);
			effects.exit("gfmFootnoteDefinitionMarker");
			effects.enter("gfmFootnoteDefinitionLabelString");
			effects.enter("chunkString").contentType = "string";
			return labelInside;
		}
		return nok(code$3);
	}
	function labelInside(code$3) {
		if (size > 999 || code$3 === 93 && !data || code$3 === null || code$3 === 91 || markdownLineEndingOrSpace(code$3)) return nok(code$3);
		if (code$3 === 93) {
			effects.exit("chunkString");
			const token = effects.exit("gfmFootnoteDefinitionLabelString");
			identifier = normalizeIdentifier(self$1.sliceSerialize(token));
			effects.enter("gfmFootnoteDefinitionLabelMarker");
			effects.consume(code$3);
			effects.exit("gfmFootnoteDefinitionLabelMarker");
			effects.exit("gfmFootnoteDefinitionLabel");
			return labelAfter;
		}
		if (!markdownLineEndingOrSpace(code$3)) data = true;
		size++;
		effects.consume(code$3);
		return code$3 === 92 ? labelEscape : labelInside;
	}
	function labelEscape(code$3) {
		if (code$3 === 91 || code$3 === 92 || code$3 === 93) {
			effects.consume(code$3);
			size++;
			return labelInside;
		}
		return labelInside(code$3);
	}
	function labelAfter(code$3) {
		if (code$3 === 58) {
			effects.enter("definitionMarker");
			effects.consume(code$3);
			effects.exit("definitionMarker");
			if (!defined.includes(identifier)) defined.push(identifier);
			return factorySpace(effects, whitespaceAfter, "gfmFootnoteDefinitionWhitespace");
		}
		return nok(code$3);
	}
	function whitespaceAfter(code$3) {
		return ok$2(code$3);
	}
}
function tokenizeDefinitionContinuation(effects, ok$2, nok) {
	return effects.check(blankLine, ok$2, effects.attempt(indent, ok$2, nok));
}
function gfmFootnoteDefinitionEnd(effects) {
	effects.exit("gfmFootnoteDefinition");
}
function tokenizeIndent(effects, ok$2, nok) {
	const self$1 = this;
	return factorySpace(effects, afterPrefix, "gfmFootnoteDefinitionIndent", 5);
	function afterPrefix(code$3) {
		const tail = self$1.events[self$1.events.length - 1];
		return tail && tail[1].type === "gfmFootnoteDefinitionIndent" && tail[2].sliceSerialize(tail[1], true).length === 4 ? ok$2(code$3) : nok(code$3);
	}
}
function gfmStrikethrough(options) {
	let single = (options || {}).singleTilde;
	const tokenizer = {
		name: "strikethrough",
		tokenize: tokenizeStrikethrough,
		resolveAll: resolveAllStrikethrough
	};
	if (single === null || single === void 0) single = true;
	return {
		text: { [126]: tokenizer },
		insideSpan: { null: [tokenizer] },
		attentionMarkers: { null: [126] }
	};
	function resolveAllStrikethrough(events, context) {
		let index$2 = -1;
		while (++index$2 < events.length) if (events[index$2][0] === "enter" && events[index$2][1].type === "strikethroughSequenceTemporary" && events[index$2][1]._close) {
			let open = index$2;
			while (open--) if (events[open][0] === "exit" && events[open][1].type === "strikethroughSequenceTemporary" && events[open][1]._open && events[index$2][1].end.offset - events[index$2][1].start.offset === events[open][1].end.offset - events[open][1].start.offset) {
				events[index$2][1].type = "strikethroughSequence";
				events[open][1].type = "strikethroughSequence";
				const strikethrough$1 = {
					type: "strikethrough",
					start: Object.assign({}, events[open][1].start),
					end: Object.assign({}, events[index$2][1].end)
				};
				const text$6 = {
					type: "strikethroughText",
					start: Object.assign({}, events[open][1].end),
					end: Object.assign({}, events[index$2][1].start)
				};
				const nextEvents = [
					[
						"enter",
						strikethrough$1,
						context
					],
					[
						"enter",
						events[open][1],
						context
					],
					[
						"exit",
						events[open][1],
						context
					],
					[
						"enter",
						text$6,
						context
					]
				];
				const insideSpan$1 = context.parser.constructs.insideSpan.null;
				if (insideSpan$1) splice(nextEvents, nextEvents.length, 0, resolveAll(insideSpan$1, events.slice(open + 1, index$2), context));
				splice(nextEvents, nextEvents.length, 0, [
					[
						"exit",
						text$6,
						context
					],
					[
						"enter",
						events[index$2][1],
						context
					],
					[
						"exit",
						events[index$2][1],
						context
					],
					[
						"exit",
						strikethrough$1,
						context
					]
				]);
				splice(events, open - 1, index$2 - open + 3, nextEvents);
				index$2 = open + nextEvents.length - 2;
				break;
			}
		}
		index$2 = -1;
		while (++index$2 < events.length) if (events[index$2][1].type === "strikethroughSequenceTemporary") events[index$2][1].type = "data";
		return events;
	}
	function tokenizeStrikethrough(effects, ok$2, nok) {
		const previous$2 = this.previous;
		const events = this.events;
		let size = 0;
		return start;
		function start(code$3) {
			if (previous$2 === 126 && events[events.length - 1][1].type !== "characterEscape") return nok(code$3);
			effects.enter("strikethroughSequenceTemporary");
			return more(code$3);
		}
		function more(code$3) {
			const before = classifyCharacter(previous$2);
			if (code$3 === 126) {
				if (size > 1) return nok(code$3);
				effects.consume(code$3);
				size++;
				return more;
			}
			if (size < 2 && !single) return nok(code$3);
			const token = effects.exit("strikethroughSequenceTemporary");
			const after = classifyCharacter(code$3);
			token._open = !after || after === 2 && Boolean(before);
			token._close = !before || before === 2 && Boolean(after);
			return ok$2(code$3);
		}
	}
}
var EditMap = class {
	constructor() {
		this.map = [];
	}
	add(index$2, remove, add) {
		addImplementation(this, index$2, remove, add);
	}
	consume(events) {
		this.map.sort(function(a, b) {
			return a[0] - b[0];
		});
		/* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */
		if (this.map.length === 0) return;
		let index$2 = this.map.length;
		const vecs = [];
		while (index$2 > 0) {
			index$2 -= 1;
			vecs.push(events.slice(this.map[index$2][0] + this.map[index$2][1]), this.map[index$2][2]);
			events.length = this.map[index$2][0];
		}
		vecs.push(events.slice());
		events.length = 0;
		let slice = vecs.pop();
		while (slice) {
			for (const element$2 of slice) events.push(element$2);
			slice = vecs.pop();
		}
		this.map.length = 0;
	}
};
function addImplementation(editMap, at, remove, add) {
	let index$2 = 0;
	/* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */
	if (remove === 0 && add.length === 0) return;
	while (index$2 < editMap.map.length) {
		if (editMap.map[index$2][0] === at) {
			editMap.map[index$2][1] += remove;
			editMap.map[index$2][2].push(...add);
			return;
		}
		index$2 += 1;
	}
	editMap.map.push([
		at,
		remove,
		add
	]);
}
function gfmTableAlign(events, index$2) {
	let inDelimiterRow = false;
	const align = [];
	while (index$2 < events.length) {
		const event = events[index$2];
		if (inDelimiterRow) {
			if (event[0] === "enter") {
				if (event[1].type === "tableContent") align.push(events[index$2 + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
			} else if (event[1].type === "tableContent") {
				if (events[index$2 - 1][1].type === "tableDelimiterMarker") {
					const alignIndex = align.length - 1;
					align[alignIndex] = align[alignIndex] === "left" ? "center" : "right";
				}
			} else if (event[1].type === "tableDelimiterRow") break;
		} else if (event[0] === "enter" && event[1].type === "tableDelimiterRow") inDelimiterRow = true;
		index$2 += 1;
	}
	return align;
}
function gfmTable() {
	return { flow: { null: {
		name: "table",
		tokenize: tokenizeTable,
		resolveAll: resolveTable
	} } };
}
function tokenizeTable(effects, ok$2, nok) {
	const self$1 = this;
	let size = 0;
	let sizeB = 0;
	let seen;
	return start;
	function start(code$3) {
		let index$2 = self$1.events.length - 1;
		while (index$2 > -1) {
			const type = self$1.events[index$2][1].type;
			if (type === "lineEnding" || type === "linePrefix") index$2--;
			else break;
		}
		const tail = index$2 > -1 ? self$1.events[index$2][1].type : null;
		const next = tail === "tableHead" || tail === "tableRow" ? bodyRowStart : headRowBefore;
		if (next === bodyRowStart && self$1.parser.lazy[self$1.now().line]) return nok(code$3);
		return next(code$3);
	}
	function headRowBefore(code$3) {
		effects.enter("tableHead");
		effects.enter("tableRow");
		return headRowStart(code$3);
	}
	function headRowStart(code$3) {
		if (code$3 === 124) return headRowBreak(code$3);
		seen = true;
		sizeB += 1;
		return headRowBreak(code$3);
	}
	function headRowBreak(code$3) {
		if (code$3 === null) return nok(code$3);
		if (markdownLineEnding(code$3)) {
			if (sizeB > 1) {
				sizeB = 0;
				self$1.interrupt = true;
				effects.exit("tableRow");
				effects.enter("lineEnding");
				effects.consume(code$3);
				effects.exit("lineEnding");
				return headDelimiterStart;
			}
			return nok(code$3);
		}
		if (markdownSpace(code$3)) return factorySpace(effects, headRowBreak, "whitespace")(code$3);
		sizeB += 1;
		if (seen) {
			seen = false;
			size += 1;
		}
		if (code$3 === 124) {
			effects.enter("tableCellDivider");
			effects.consume(code$3);
			effects.exit("tableCellDivider");
			seen = true;
			return headRowBreak;
		}
		effects.enter("data");
		return headRowData(code$3);
	}
	function headRowData(code$3) {
		if (code$3 === null || code$3 === 124 || markdownLineEndingOrSpace(code$3)) {
			effects.exit("data");
			return headRowBreak(code$3);
		}
		effects.consume(code$3);
		return code$3 === 92 ? headRowEscape : headRowData;
	}
	function headRowEscape(code$3) {
		if (code$3 === 92 || code$3 === 124) {
			effects.consume(code$3);
			return headRowData;
		}
		return headRowData(code$3);
	}
	function headDelimiterStart(code$3) {
		self$1.interrupt = false;
		if (self$1.parser.lazy[self$1.now().line]) return nok(code$3);
		effects.enter("tableDelimiterRow");
		seen = false;
		if (markdownSpace(code$3)) return factorySpace(effects, headDelimiterBefore, "linePrefix", self$1.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code$3);
		return headDelimiterBefore(code$3);
	}
	function headDelimiterBefore(code$3) {
		if (code$3 === 45 || code$3 === 58) return headDelimiterValueBefore(code$3);
		if (code$3 === 124) {
			seen = true;
			effects.enter("tableCellDivider");
			effects.consume(code$3);
			effects.exit("tableCellDivider");
			return headDelimiterCellBefore;
		}
		return headDelimiterNok(code$3);
	}
	function headDelimiterCellBefore(code$3) {
		if (markdownSpace(code$3)) return factorySpace(effects, headDelimiterValueBefore, "whitespace")(code$3);
		return headDelimiterValueBefore(code$3);
	}
	function headDelimiterValueBefore(code$3) {
		if (code$3 === 58) {
			sizeB += 1;
			seen = true;
			effects.enter("tableDelimiterMarker");
			effects.consume(code$3);
			effects.exit("tableDelimiterMarker");
			return headDelimiterLeftAlignmentAfter;
		}
		if (code$3 === 45) {
			sizeB += 1;
			return headDelimiterLeftAlignmentAfter(code$3);
		}
		if (code$3 === null || markdownLineEnding(code$3)) return headDelimiterCellAfter(code$3);
		return headDelimiterNok(code$3);
	}
	function headDelimiterLeftAlignmentAfter(code$3) {
		if (code$3 === 45) {
			effects.enter("tableDelimiterFiller");
			return headDelimiterFiller(code$3);
		}
		return headDelimiterNok(code$3);
	}
	function headDelimiterFiller(code$3) {
		if (code$3 === 45) {
			effects.consume(code$3);
			return headDelimiterFiller;
		}
		if (code$3 === 58) {
			seen = true;
			effects.exit("tableDelimiterFiller");
			effects.enter("tableDelimiterMarker");
			effects.consume(code$3);
			effects.exit("tableDelimiterMarker");
			return headDelimiterRightAlignmentAfter;
		}
		effects.exit("tableDelimiterFiller");
		return headDelimiterRightAlignmentAfter(code$3);
	}
	function headDelimiterRightAlignmentAfter(code$3) {
		if (markdownSpace(code$3)) return factorySpace(effects, headDelimiterCellAfter, "whitespace")(code$3);
		return headDelimiterCellAfter(code$3);
	}
	function headDelimiterCellAfter(code$3) {
		if (code$3 === 124) return headDelimiterBefore(code$3);
		if (code$3 === null || markdownLineEnding(code$3)) {
			if (!seen || size !== sizeB) return headDelimiterNok(code$3);
			effects.exit("tableDelimiterRow");
			effects.exit("tableHead");
			return ok$2(code$3);
		}
		return headDelimiterNok(code$3);
	}
	function headDelimiterNok(code$3) {
		return nok(code$3);
	}
	function bodyRowStart(code$3) {
		effects.enter("tableRow");
		return bodyRowBreak(code$3);
	}
	function bodyRowBreak(code$3) {
		if (code$3 === 124) {
			effects.enter("tableCellDivider");
			effects.consume(code$3);
			effects.exit("tableCellDivider");
			return bodyRowBreak;
		}
		if (code$3 === null || markdownLineEnding(code$3)) {
			effects.exit("tableRow");
			return ok$2(code$3);
		}
		if (markdownSpace(code$3)) return factorySpace(effects, bodyRowBreak, "whitespace")(code$3);
		effects.enter("data");
		return bodyRowData(code$3);
	}
	function bodyRowData(code$3) {
		if (code$3 === null || code$3 === 124 || markdownLineEndingOrSpace(code$3)) {
			effects.exit("data");
			return bodyRowBreak(code$3);
		}
		effects.consume(code$3);
		return code$3 === 92 ? bodyRowEscape : bodyRowData;
	}
	function bodyRowEscape(code$3) {
		if (code$3 === 92 || code$3 === 124) {
			effects.consume(code$3);
			return bodyRowData;
		}
		return bodyRowData(code$3);
	}
}
function resolveTable(events, context) {
	let index$2 = -1;
	let inFirstCellAwaitingPipe = true;
	let rowKind = 0;
	let lastCell = [
		0,
		0,
		0,
		0
	];
	let cell = [
		0,
		0,
		0,
		0
	];
	let afterHeadAwaitingFirstBodyRow = false;
	let lastTableEnd = 0;
	let currentTable;
	let currentBody;
	let currentCell;
	const map$2 = new EditMap();
	while (++index$2 < events.length) {
		const event = events[index$2];
		const token = event[1];
		if (event[0] === "enter") {
			if (token.type === "tableHead") {
				afterHeadAwaitingFirstBodyRow = false;
				if (lastTableEnd !== 0) {
					flushTableEnd(map$2, context, lastTableEnd, currentTable, currentBody);
					currentBody = void 0;
					lastTableEnd = 0;
				}
				currentTable = {
					type: "table",
					start: Object.assign({}, token.start),
					end: Object.assign({}, token.end)
				};
				map$2.add(index$2, 0, [[
					"enter",
					currentTable,
					context
				]]);
			} else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
				inFirstCellAwaitingPipe = true;
				currentCell = void 0;
				lastCell = [
					0,
					0,
					0,
					0
				];
				cell = [
					0,
					index$2 + 1,
					0,
					0
				];
				if (afterHeadAwaitingFirstBodyRow) {
					afterHeadAwaitingFirstBodyRow = false;
					currentBody = {
						type: "tableBody",
						start: Object.assign({}, token.start),
						end: Object.assign({}, token.end)
					};
					map$2.add(index$2, 0, [[
						"enter",
						currentBody,
						context
					]]);
				}
				rowKind = token.type === "tableDelimiterRow" ? 2 : currentBody ? 3 : 1;
			} else if (rowKind && (token.type === "data" || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) {
				inFirstCellAwaitingPipe = false;
				if (cell[2] === 0) {
					if (lastCell[1] !== 0) {
						cell[0] = cell[1];
						currentCell = flushCell(map$2, context, lastCell, rowKind, void 0, currentCell);
						lastCell = [
							0,
							0,
							0,
							0
						];
					}
					cell[2] = index$2;
				}
			} else if (token.type === "tableCellDivider") if (inFirstCellAwaitingPipe) inFirstCellAwaitingPipe = false;
			else {
				if (lastCell[1] !== 0) {
					cell[0] = cell[1];
					currentCell = flushCell(map$2, context, lastCell, rowKind, void 0, currentCell);
				}
				lastCell = cell;
				cell = [
					lastCell[1],
					index$2,
					0,
					0
				];
			}
		} else if (token.type === "tableHead") {
			afterHeadAwaitingFirstBodyRow = true;
			lastTableEnd = index$2;
		} else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
			lastTableEnd = index$2;
			if (lastCell[1] !== 0) {
				cell[0] = cell[1];
				currentCell = flushCell(map$2, context, lastCell, rowKind, index$2, currentCell);
			} else if (cell[1] !== 0) currentCell = flushCell(map$2, context, cell, rowKind, index$2, currentCell);
			rowKind = 0;
		} else if (rowKind && (token.type === "data" || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) cell[3] = index$2;
	}
	if (lastTableEnd !== 0) flushTableEnd(map$2, context, lastTableEnd, currentTable, currentBody);
	map$2.consume(context.events);
	index$2 = -1;
	while (++index$2 < context.events.length) {
		const event = context.events[index$2];
		if (event[0] === "enter" && event[1].type === "table") event[1]._align = gfmTableAlign(context.events, index$2);
	}
	return events;
}
function flushCell(map$2, context, range, rowKind, rowEnd, previousCell) {
	const groupName = rowKind === 1 ? "tableHeader" : rowKind === 2 ? "tableDelimiter" : "tableData";
	const valueName = "tableContent";
	if (range[0] !== 0) {
		previousCell.end = Object.assign({}, getPoint(context.events, range[0]));
		map$2.add(range[0], 0, [[
			"exit",
			previousCell,
			context
		]]);
	}
	const now = getPoint(context.events, range[1]);
	previousCell = {
		type: groupName,
		start: Object.assign({}, now),
		end: Object.assign({}, now)
	};
	map$2.add(range[1], 0, [[
		"enter",
		previousCell,
		context
	]]);
	if (range[2] !== 0) {
		const relatedStart = getPoint(context.events, range[2]);
		const relatedEnd = getPoint(context.events, range[3]);
		const valueToken = {
			type: valueName,
			start: Object.assign({}, relatedStart),
			end: Object.assign({}, relatedEnd)
		};
		map$2.add(range[2], 0, [[
			"enter",
			valueToken,
			context
		]]);
		if (rowKind !== 2) {
			const start = context.events[range[2]];
			const end = context.events[range[3]];
			start[1].end = Object.assign({}, end[1].end);
			start[1].type = "chunkText";
			start[1].contentType = "text";
			if (range[3] > range[2] + 1) {
				const a = range[2] + 1;
				const b = range[3] - range[2] - 1;
				map$2.add(a, b, []);
			}
		}
		map$2.add(range[3] + 1, 0, [[
			"exit",
			valueToken,
			context
		]]);
	}
	if (rowEnd !== void 0) {
		previousCell.end = Object.assign({}, getPoint(context.events, rowEnd));
		map$2.add(rowEnd, 0, [[
			"exit",
			previousCell,
			context
		]]);
		previousCell = void 0;
	}
	return previousCell;
}
function flushTableEnd(map$2, context, index$2, table$1, tableBody) {
	const exits = [];
	const related = getPoint(context.events, index$2);
	if (tableBody) {
		tableBody.end = Object.assign({}, related);
		exits.push([
			"exit",
			tableBody,
			context
		]);
	}
	table$1.end = Object.assign({}, related);
	exits.push([
		"exit",
		table$1,
		context
	]);
	map$2.add(index$2 + 1, 0, exits);
}
function getPoint(events, index$2) {
	const event = events[index$2];
	const side = event[0] === "enter" ? "start" : "end";
	return event[1][side];
}
var tasklistCheck = {
	name: "tasklistCheck",
	tokenize: tokenizeTasklistCheck
};
function gfmTaskListItem() {
	return { text: { [91]: tasklistCheck } };
}
function tokenizeTasklistCheck(effects, ok$2, nok) {
	const self$1 = this;
	return open;
	function open(code$3) {
		if (self$1.previous !== null || !self$1._gfmTasklistFirstContentOfListItem) return nok(code$3);
		effects.enter("taskListCheck");
		effects.enter("taskListCheckMarker");
		effects.consume(code$3);
		effects.exit("taskListCheckMarker");
		return inside;
	}
	function inside(code$3) {
		if (markdownLineEndingOrSpace(code$3)) {
			effects.enter("taskListCheckValueUnchecked");
			effects.consume(code$3);
			effects.exit("taskListCheckValueUnchecked");
			return close;
		}
		if (code$3 === 88 || code$3 === 120) {
			effects.enter("taskListCheckValueChecked");
			effects.consume(code$3);
			effects.exit("taskListCheckValueChecked");
			return close;
		}
		return nok(code$3);
	}
	function close(code$3) {
		if (code$3 === 93) {
			effects.enter("taskListCheckMarker");
			effects.consume(code$3);
			effects.exit("taskListCheckMarker");
			effects.exit("taskListCheck");
			return after;
		}
		return nok(code$3);
	}
	function after(code$3) {
		if (markdownLineEnding(code$3)) return ok$2(code$3);
		if (markdownSpace(code$3)) return effects.check({ tokenize: spaceThenNonSpace }, ok$2, nok)(code$3);
		return nok(code$3);
	}
}
function spaceThenNonSpace(effects, ok$2, nok) {
	return factorySpace(effects, after, "whitespace");
	function after(code$3) {
		return code$3 === null ? nok(code$3) : ok$2(code$3);
	}
}
function gfm(options) {
	return combineExtensions([
		gfmAutolinkLiteral(),
		gfmFootnote(),
		gfmStrikethrough(options),
		gfmTable(),
		gfmTaskListItem()
	]);
}
var emptyOptions = {};
function remarkGfm(options) {
	const self$1 = this;
	const settings = options || emptyOptions;
	const data = self$1.data();
	const micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = []);
	const fromMarkdownExtensions = data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
	const toMarkdownExtensions = data.toMarkdownExtensions || (data.toMarkdownExtensions = []);
	micromarkExtensions.push(gfm(settings));
	fromMarkdownExtensions.push(gfmFromMarkdown());
	toMarkdownExtensions.push(gfmToMarkdown(settings));
}
export { SKIP as a, visit as i, Markdown as n, esm_default as o, defaultUrlTransform as r, remarkGfm as t };
