import { t as BookOpen } from "./book-open-DEmwG-44.js";
import { t as Bot } from "./bot-G9U5SeGm.js";
import { t as CalendarDays } from "./calendar-days-CAmDZtdd.js";
import { n as ChevronLeft, t as Settings2 } from "./settings-2-t5q4s6iR.js";
import { t as ChevronRight } from "./chevron-right-BjVJ-R2c.js";
import { t as Globe } from "./globe-DYHt2aUm.js";
import { t as ProviderLogo } from "./ProviderLogo-BxoN_q6P.js";
import { t as Mail } from "./mail-DCnORFMV.js";
import { t as PhoneCall } from "./phone-call-DKeNHYKm.js";
import { t as Share2 } from "./share-2-CsCsArqL.js";
import { t as TrendingUp } from "./trending-up-DGj-rBJk.js";
import { t as Users } from "./users-WSH2xBOP.js";
import { Bc as require_jsx_runtime, Cn as Portal, Di as Mic, Fi as Info, Gr as BoardIcon, L as saveOrDownload, Ln as cn, Sn as Overlay, Tn as Title, Ui as Download, Wi as Copy, Xc as require_react, bn as Content, ki as MessagesSquare, ln as Button, na as createLucideIcon, oc as useT, ot as useCapabilities, sc as useUiLanguage, si as X, tl as __toESM, wc as useEventStore, wn as Root, xn as Description, yn as Close } from "./index-BOzhgzD7.js";
import { n as OFFICIAL_REPO_URL, r as PRODUCT_NAME, t as OFFICIAL_REPO_LABEL } from "./branding-DNImmT_K.js";
import { t as QuickTooltip } from "./tooltip-R5sCoxZW.js";
import { t as PageHeader } from "./PageHeader-DcwsywY0.js";
import { n as TabBar } from "./SectionTabBar-Cj6UhxEH.js";
import { _ as weeklyTotals, a as chatProviderLabel, c as hourTotals, d as minutesSaved, f as peakSlot, g as weekdayTotals, h as usageMix, i as calendarWeeks, l as intensityLevels, m as trendPercent, n as actionsOf, o as compactNumber, p as plural, r as agentLabel, s as formatDay, t as useBoardInsights, u as milestoneProgress, v as wordsOf, y as wordsPerMinute } from "./useBoardInsights-CQoS3BE-.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Award = createLucideIcon("Award", [["path", {
	d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
	key: "1yiouv"
}], ["circle", {
	cx: "12",
	cy: "8",
	r: "6",
	key: "1vp47v"
}]]);
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Flame = createLucideIcon("Flame", [["path", {
	d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
	key: "96xj49"
}]]);
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var TrendingDown = createLucideIcon("TrendingDown", [["polyline", {
	points: "22 17 13.5 8.5 8.5 13.5 2 7",
	key: "1r2t7k"
}], ["polyline", {
	points: "16 17 22 17 22 11",
	key: "11uiuu"
}]]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function resolveUrl(url, baseUrl) {
	if (url.match(/^[a-z]+:\/\//i)) return url;
	if (url.match(/^\/\//)) return window.location.protocol + url;
	if (url.match(/^[a-z]+:/i)) return url;
	const doc = document.implementation.createHTMLDocument();
	const base = doc.createElement("base");
	const a = doc.createElement("a");
	doc.head.appendChild(base);
	doc.body.appendChild(a);
	if (baseUrl) base.href = baseUrl;
	a.href = url;
	return a.href;
}
const uuid = (() => {
	let counter = 0;
	const random = () => `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4);
	return () => {
		counter += 1;
		return `u${random()}${counter}`;
	};
})();
function toArray(arrayLike) {
	const arr = [];
	for (let i = 0, l = arrayLike.length; i < l; i++) arr.push(arrayLike[i]);
	return arr;
}
var styleProps = null;
function getStyleProperties(options = {}) {
	if (styleProps) return styleProps;
	if (options.includeStyleProperties) {
		styleProps = options.includeStyleProperties;
		return styleProps;
	}
	styleProps = toArray(window.getComputedStyle(document.documentElement));
	return styleProps;
}
function px(node, styleProperty) {
	const val = (node.ownerDocument.defaultView || window).getComputedStyle(node).getPropertyValue(styleProperty);
	return val ? parseFloat(val.replace("px", "")) : 0;
}
function getNodeWidth(node) {
	const leftBorder = px(node, "border-left-width");
	const rightBorder = px(node, "border-right-width");
	return node.clientWidth + leftBorder + rightBorder;
}
function getNodeHeight(node) {
	const topBorder = px(node, "border-top-width");
	const bottomBorder = px(node, "border-bottom-width");
	return node.clientHeight + topBorder + bottomBorder;
}
function getImageSize(targetNode, options = {}) {
	return {
		width: options.width || getNodeWidth(targetNode),
		height: options.height || getNodeHeight(targetNode)
	};
}
function getPixelRatio() {
	let ratio;
	let FINAL_PROCESS;
	try {
		FINAL_PROCESS = process;
	} catch (e) {}
	const val = FINAL_PROCESS && FINAL_PROCESS.env ? FINAL_PROCESS.env.devicePixelRatio : null;
	if (val) {
		ratio = parseInt(val, 10);
		if (Number.isNaN(ratio)) ratio = 1;
	}
	return ratio || window.devicePixelRatio || 1;
}
var canvasDimensionLimit = 16384;
function checkCanvasDimensions(canvas) {
	if (canvas.width > canvasDimensionLimit || canvas.height > canvasDimensionLimit) if (canvas.width > canvasDimensionLimit && canvas.height > canvasDimensionLimit) if (canvas.width > canvas.height) {
		canvas.height *= canvasDimensionLimit / canvas.width;
		canvas.width = canvasDimensionLimit;
	} else {
		canvas.width *= canvasDimensionLimit / canvas.height;
		canvas.height = canvasDimensionLimit;
	}
	else if (canvas.width > canvasDimensionLimit) {
		canvas.height *= canvasDimensionLimit / canvas.width;
		canvas.width = canvasDimensionLimit;
	} else {
		canvas.width *= canvasDimensionLimit / canvas.height;
		canvas.height = canvasDimensionLimit;
	}
}
function canvasToBlob(canvas, options = {}) {
	if (canvas.toBlob) return new Promise((resolve) => {
		canvas.toBlob(resolve, options.type ? options.type : "image/png", options.quality ? options.quality : 1);
	});
	return new Promise((resolve) => {
		const binaryString = window.atob(canvas.toDataURL(options.type ? options.type : void 0, options.quality ? options.quality : void 0).split(",")[1]);
		const len = binaryString.length;
		const binaryArray = new Uint8Array(len);
		for (let i = 0; i < len; i += 1) binaryArray[i] = binaryString.charCodeAt(i);
		resolve(new Blob([binaryArray], { type: options.type ? options.type : "image/png" }));
	});
}
function createImage(url) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			img.decode().then(() => {
				requestAnimationFrame(() => resolve(img));
			});
		};
		img.onerror = reject;
		img.crossOrigin = "anonymous";
		img.decoding = "async";
		img.src = url;
	});
}
async function svgToDataURL(svg) {
	return Promise.resolve().then(() => new XMLSerializer().serializeToString(svg)).then(encodeURIComponent).then((html) => `data:image/svg+xml;charset=utf-8,${html}`);
}
async function nodeToDataURL(node, width, height) {
	const xmlns = "http://www.w3.org/2000/svg";
	const svg = document.createElementNS(xmlns, "svg");
	const foreignObject = document.createElementNS(xmlns, "foreignObject");
	svg.setAttribute("width", `${width}`);
	svg.setAttribute("height", `${height}`);
	svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
	foreignObject.setAttribute("width", "100%");
	foreignObject.setAttribute("height", "100%");
	foreignObject.setAttribute("x", "0");
	foreignObject.setAttribute("y", "0");
	foreignObject.setAttribute("externalResourcesRequired", "true");
	svg.appendChild(foreignObject);
	foreignObject.appendChild(node);
	return svgToDataURL(svg);
}
const isInstanceOfElement = (node, instance) => {
	if (node instanceof instance) return true;
	const nodePrototype = Object.getPrototypeOf(node);
	if (nodePrototype === null) return false;
	return nodePrototype.constructor.name === instance.name || isInstanceOfElement(nodePrototype, instance);
};
function formatCSSText(style) {
	const content = style.getPropertyValue("content");
	return `${style.cssText} content: '${content.replace(/'|"/g, "")}';`;
}
function formatCSSProperties(style, options) {
	return getStyleProperties(options).map((name) => {
		return `${name}: ${style.getPropertyValue(name)}${style.getPropertyPriority(name) ? " !important" : ""};`;
	}).join(" ");
}
function getPseudoElementStyle(className, pseudo, style, options) {
	const selector = `.${className}:${pseudo}`;
	const cssText = style.cssText ? formatCSSText(style) : formatCSSProperties(style, options);
	return document.createTextNode(`${selector}{${cssText}}`);
}
function clonePseudoElement(nativeNode, clonedNode, pseudo, options) {
	const style = window.getComputedStyle(nativeNode, pseudo);
	const content = style.getPropertyValue("content");
	if (content === "" || content === "none") return;
	const className = uuid();
	try {
		clonedNode.className = `${clonedNode.className} ${className}`;
	} catch (err) {
		return;
	}
	const styleElement = document.createElement("style");
	styleElement.appendChild(getPseudoElementStyle(className, pseudo, style, options));
	clonedNode.appendChild(styleElement);
}
function clonePseudoElements(nativeNode, clonedNode, options) {
	clonePseudoElement(nativeNode, clonedNode, ":before", options);
	clonePseudoElement(nativeNode, clonedNode, ":after", options);
}
var WOFF = "application/font-woff";
var JPEG = "image/jpeg";
var mimes = {
	woff: WOFF,
	woff2: WOFF,
	ttf: "application/font-truetype",
	eot: "application/vnd.ms-fontobject",
	png: "image/png",
	jpg: JPEG,
	jpeg: JPEG,
	gif: "image/gif",
	tiff: "image/tiff",
	svg: "image/svg+xml",
	webp: "image/webp"
};
function getExtension(url) {
	const match = /\.([^./]*?)$/g.exec(url);
	return match ? match[1] : "";
}
function getMimeType(url) {
	return mimes[getExtension(url).toLowerCase()] || "";
}
function getContentFromDataUrl(dataURL) {
	return dataURL.split(/,/)[1];
}
function isDataUrl(url) {
	return url.search(/^(data:)/) !== -1;
}
function makeDataUrl(content, mimeType) {
	return `data:${mimeType};base64,${content}`;
}
async function fetchAsDataURL(url, init, process$1) {
	const res = await fetch(url, init);
	if (res.status === 404) throw new Error(`Resource "${res.url}" not found`);
	const blob = await res.blob();
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = reject;
		reader.onloadend = () => {
			try {
				resolve(process$1({
					res,
					result: reader.result
				}));
			} catch (error) {
				reject(error);
			}
		};
		reader.readAsDataURL(blob);
	});
}
var cache = {};
function getCacheKey(url, contentType, includeQueryParams) {
	let key = url.replace(/\?.*/, "");
	if (includeQueryParams) key = url;
	if (/ttf|otf|eot|woff2?/i.test(key)) key = key.replace(/.*\//, "");
	return contentType ? `[${contentType}]${key}` : key;
}
async function resourceToDataURL(resourceUrl, contentType, options) {
	const cacheKey = getCacheKey(resourceUrl, contentType, options.includeQueryParams);
	if (cache[cacheKey] != null) return cache[cacheKey];
	if (options.cacheBust) resourceUrl += (/\?/.test(resourceUrl) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime();
	let dataURL;
	try {
		dataURL = makeDataUrl(await fetchAsDataURL(resourceUrl, options.fetchRequestInit, ({ res, result }) => {
			if (!contentType) contentType = res.headers.get("Content-Type") || "";
			return getContentFromDataUrl(result);
		}), contentType);
	} catch (error) {
		dataURL = options.imagePlaceholder || "";
		let msg = `Failed to fetch resource: ${resourceUrl}`;
		if (error) msg = typeof error === "string" ? error : error.message;
		if (msg) console.warn(msg);
	}
	cache[cacheKey] = dataURL;
	return dataURL;
}
async function cloneCanvasElement(canvas) {
	const dataURL = canvas.toDataURL();
	if (dataURL === "data:,") return canvas.cloneNode(false);
	return createImage(dataURL);
}
async function cloneVideoElement(video, options) {
	if (video.currentSrc) {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		canvas.width = video.clientWidth;
		canvas.height = video.clientHeight;
		ctx === null || ctx === void 0 || ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
		return createImage(canvas.toDataURL());
	}
	const poster = video.poster;
	return createImage(await resourceToDataURL(poster, getMimeType(poster), options));
}
async function cloneIFrameElement(iframe, options) {
	var _a;
	try {
		if ((_a = iframe === null || iframe === void 0 ? void 0 : iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.body) return await cloneNode(iframe.contentDocument.body, options, true);
	} catch (_b) {}
	return iframe.cloneNode(false);
}
async function cloneSingleNode(node, options) {
	if (isInstanceOfElement(node, HTMLCanvasElement)) return cloneCanvasElement(node);
	if (isInstanceOfElement(node, HTMLVideoElement)) return cloneVideoElement(node, options);
	if (isInstanceOfElement(node, HTMLIFrameElement)) return cloneIFrameElement(node, options);
	return node.cloneNode(isSVGElement(node));
}
var isSlotElement = (node) => node.tagName != null && node.tagName.toUpperCase() === "SLOT";
var isSVGElement = (node) => node.tagName != null && node.tagName.toUpperCase() === "SVG";
async function cloneChildren(nativeNode, clonedNode, options) {
	var _a, _b;
	if (isSVGElement(clonedNode)) return clonedNode;
	let children = [];
	if (isSlotElement(nativeNode) && nativeNode.assignedNodes) children = toArray(nativeNode.assignedNodes());
	else if (isInstanceOfElement(nativeNode, HTMLIFrameElement) && ((_a = nativeNode.contentDocument) === null || _a === void 0 ? void 0 : _a.body)) children = toArray(nativeNode.contentDocument.body.childNodes);
	else children = toArray(((_b = nativeNode.shadowRoot) !== null && _b !== void 0 ? _b : nativeNode).childNodes);
	if (children.length === 0 || isInstanceOfElement(nativeNode, HTMLVideoElement)) return clonedNode;
	await children.reduce((deferred, child) => deferred.then(() => cloneNode(child, options)).then((clonedChild) => {
		if (clonedChild) clonedNode.appendChild(clonedChild);
	}), Promise.resolve());
	return clonedNode;
}
function cloneCSSStyle(nativeNode, clonedNode, options) {
	const targetStyle = clonedNode.style;
	if (!targetStyle) return;
	const sourceStyle = window.getComputedStyle(nativeNode);
	if (sourceStyle.cssText) {
		targetStyle.cssText = sourceStyle.cssText;
		targetStyle.transformOrigin = sourceStyle.transformOrigin;
	} else getStyleProperties(options).forEach((name) => {
		let value = sourceStyle.getPropertyValue(name);
		if (name === "font-size" && value.endsWith("px")) value = `${Math.floor(parseFloat(value.substring(0, value.length - 2))) - .1}px`;
		if (isInstanceOfElement(nativeNode, HTMLIFrameElement) && name === "display" && value === "inline") value = "block";
		if (name === "d" && clonedNode.getAttribute("d")) value = `path(${clonedNode.getAttribute("d")})`;
		targetStyle.setProperty(name, value, sourceStyle.getPropertyPriority(name));
	});
}
function cloneInputValue(nativeNode, clonedNode) {
	if (isInstanceOfElement(nativeNode, HTMLTextAreaElement)) clonedNode.innerHTML = nativeNode.value;
	if (isInstanceOfElement(nativeNode, HTMLInputElement)) clonedNode.setAttribute("value", nativeNode.value);
}
function cloneSelectValue(nativeNode, clonedNode) {
	if (isInstanceOfElement(nativeNode, HTMLSelectElement)) {
		const clonedSelect = clonedNode;
		const selectedOption = Array.from(clonedSelect.children).find((child) => nativeNode.value === child.getAttribute("value"));
		if (selectedOption) selectedOption.setAttribute("selected", "");
	}
}
function decorate(nativeNode, clonedNode, options) {
	if (isInstanceOfElement(clonedNode, Element)) {
		cloneCSSStyle(nativeNode, clonedNode, options);
		clonePseudoElements(nativeNode, clonedNode, options);
		cloneInputValue(nativeNode, clonedNode);
		cloneSelectValue(nativeNode, clonedNode);
	}
	return clonedNode;
}
async function ensureSVGSymbols(clone, options) {
	const uses = clone.querySelectorAll ? clone.querySelectorAll("use") : [];
	if (uses.length === 0) return clone;
	const processedDefs = {};
	for (let i = 0; i < uses.length; i++) {
		const id = uses[i].getAttribute("xlink:href");
		if (id) {
			const exist = clone.querySelector(id);
			const definition = document.querySelector(id);
			if (!exist && definition && !processedDefs[id]) processedDefs[id] = await cloneNode(definition, options, true);
		}
	}
	const nodes = Object.values(processedDefs);
	if (nodes.length) {
		const ns = "http://www.w3.org/1999/xhtml";
		const svg = document.createElementNS(ns, "svg");
		svg.setAttribute("xmlns", ns);
		svg.style.position = "absolute";
		svg.style.width = "0";
		svg.style.height = "0";
		svg.style.overflow = "hidden";
		svg.style.display = "none";
		const defs = document.createElementNS(ns, "defs");
		svg.appendChild(defs);
		for (let i = 0; i < nodes.length; i++) defs.appendChild(nodes[i]);
		clone.appendChild(svg);
	}
	return clone;
}
async function cloneNode(node, options, isRoot) {
	if (!isRoot && options.filter && !options.filter(node)) return null;
	return Promise.resolve(node).then((clonedNode) => cloneSingleNode(clonedNode, options)).then((clonedNode) => cloneChildren(node, clonedNode, options)).then((clonedNode) => decorate(node, clonedNode, options)).then((clonedNode) => ensureSVGSymbols(clonedNode, options));
}
var URL_REGEX = /url\((['"]?)([^'"]+?)\1\)/g;
var URL_WITH_FORMAT_REGEX = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g;
var FONT_SRC_REGEX = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function toRegex(url) {
	const escaped = url.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
	return new RegExp(`(url\\(['"]?)(${escaped})(['"]?\\))`, "g");
}
function parseURLs(cssText) {
	const urls = [];
	cssText.replace(URL_REGEX, (raw, quotation, url) => {
		urls.push(url);
		return raw;
	});
	return urls.filter((url) => !isDataUrl(url));
}
async function embed(cssText, resourceURL, baseURL, options, getContentFromUrl) {
	try {
		const resolvedURL = baseURL ? resolveUrl(resourceURL, baseURL) : resourceURL;
		const contentType = getMimeType(resourceURL);
		let dataURL;
		if (getContentFromUrl) dataURL = makeDataUrl(await getContentFromUrl(resolvedURL), contentType);
		else dataURL = await resourceToDataURL(resolvedURL, contentType, options);
		return cssText.replace(toRegex(resourceURL), `$1${dataURL}$3`);
	} catch (error) {}
	return cssText;
}
function filterPreferredFontFormat(str, { preferredFontFormat }) {
	return !preferredFontFormat ? str : str.replace(FONT_SRC_REGEX, (match) => {
		while (true) {
			const [src, , format] = URL_WITH_FORMAT_REGEX.exec(match) || [];
			if (!format) return "";
			if (format === preferredFontFormat) return `src: ${src};`;
		}
	});
}
function shouldEmbed(url) {
	return url.search(URL_REGEX) !== -1;
}
async function embedResources(cssText, baseUrl, options) {
	if (!shouldEmbed(cssText)) return cssText;
	const filteredCSSText = filterPreferredFontFormat(cssText, options);
	return parseURLs(filteredCSSText).reduce((deferred, url) => deferred.then((css) => embed(css, url, baseUrl, options)), Promise.resolve(filteredCSSText));
}
async function embedProp(propName, node, options) {
	var _a;
	const propValue = (_a = node.style) === null || _a === void 0 ? void 0 : _a.getPropertyValue(propName);
	if (propValue) {
		const cssString = await embedResources(propValue, null, options);
		node.style.setProperty(propName, cssString, node.style.getPropertyPriority(propName));
		return true;
	}
	return false;
}
async function embedBackground(clonedNode, options) {
	await embedProp("background", clonedNode, options) || await embedProp("background-image", clonedNode, options);
	await embedProp("mask", clonedNode, options) || await embedProp("-webkit-mask", clonedNode, options) || await embedProp("mask-image", clonedNode, options) || await embedProp("-webkit-mask-image", clonedNode, options);
}
async function embedImageNode(clonedNode, options) {
	const isImageElement = isInstanceOfElement(clonedNode, HTMLImageElement);
	if (!(isImageElement && !isDataUrl(clonedNode.src)) && !(isInstanceOfElement(clonedNode, SVGImageElement) && !isDataUrl(clonedNode.href.baseVal))) return;
	const url = isImageElement ? clonedNode.src : clonedNode.href.baseVal;
	const dataURL = await resourceToDataURL(url, getMimeType(url), options);
	await new Promise((resolve, reject) => {
		clonedNode.onload = resolve;
		clonedNode.onerror = options.onImageErrorHandler ? (...attributes) => {
			try {
				resolve(options.onImageErrorHandler(...attributes));
			} catch (error) {
				reject(error);
			}
		} : reject;
		const image = clonedNode;
		if (image.decode) image.decode = resolve;
		if (image.loading === "lazy") image.loading = "eager";
		if (isImageElement) {
			clonedNode.srcset = "";
			clonedNode.src = dataURL;
		} else clonedNode.href.baseVal = dataURL;
	});
}
async function embedChildren(clonedNode, options) {
	const deferreds = toArray(clonedNode.childNodes).map((child) => embedImages(child, options));
	await Promise.all(deferreds).then(() => clonedNode);
}
async function embedImages(clonedNode, options) {
	if (isInstanceOfElement(clonedNode, Element)) {
		await embedBackground(clonedNode, options);
		await embedImageNode(clonedNode, options);
		await embedChildren(clonedNode, options);
	}
}
function applyStyle(node, options) {
	const { style } = node;
	if (options.backgroundColor) style.backgroundColor = options.backgroundColor;
	if (options.width) style.width = `${options.width}px`;
	if (options.height) style.height = `${options.height}px`;
	const manual = options.style;
	if (manual != null) Object.keys(manual).forEach((key) => {
		style[key] = manual[key];
	});
	return node;
}
var cssFetchCache = {};
async function fetchCSS(url) {
	let cache$1 = cssFetchCache[url];
	if (cache$1 != null) return cache$1;
	cache$1 = {
		url,
		cssText: await (await fetch(url)).text()
	};
	cssFetchCache[url] = cache$1;
	return cache$1;
}
async function embedFonts(data, options) {
	let cssText = data.cssText;
	const regexUrl = /url\(["']?([^"')]+)["']?\)/g;
	const loadFonts = (cssText.match(/url\([^)]+\)/g) || []).map(async (loc) => {
		let url = loc.replace(regexUrl, "$1");
		if (!url.startsWith("https://")) url = new URL(url, data.url).href;
		return fetchAsDataURL(url, options.fetchRequestInit, ({ result }) => {
			cssText = cssText.replace(loc, `url(${result})`);
			return [loc, result];
		});
	});
	return Promise.all(loadFonts).then(() => cssText);
}
function parseCSS(source) {
	if (source == null) return [];
	const result = [];
	let cssText = source.replace(/(\/\*[\s\S]*?\*\/)/gi, "");
	const keyframesRegex = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
	while (true) {
		const matches = keyframesRegex.exec(cssText);
		if (matches === null) break;
		result.push(matches[0]);
	}
	cssText = cssText.replace(keyframesRegex, "");
	const importRegex = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi;
	const unifiedRegex = new RegExp("((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", "gi");
	while (true) {
		let matches = importRegex.exec(cssText);
		if (matches === null) {
			matches = unifiedRegex.exec(cssText);
			if (matches === null) break;
			else importRegex.lastIndex = unifiedRegex.lastIndex;
		} else unifiedRegex.lastIndex = importRegex.lastIndex;
		result.push(matches[0]);
	}
	return result;
}
async function getCSSRules(styleSheets, options) {
	const ret = [];
	const deferreds = [];
	styleSheets.forEach((sheet) => {
		if ("cssRules" in sheet) try {
			toArray(sheet.cssRules || []).forEach((item, index) => {
				if (item.type === CSSRule.IMPORT_RULE) {
					let importIndex = index + 1;
					const url = item.href;
					const deferred = fetchCSS(url).then((metadata) => embedFonts(metadata, options)).then((cssText) => parseCSS(cssText).forEach((rule) => {
						try {
							sheet.insertRule(rule, rule.startsWith("@import") ? importIndex += 1 : sheet.cssRules.length);
						} catch (error) {
							console.error("Error inserting rule from remote css", {
								rule,
								error
							});
						}
					})).catch((e) => {
						console.error("Error loading remote css", e.toString());
					});
					deferreds.push(deferred);
				}
			});
		} catch (e) {
			const inline = styleSheets.find((a) => a.href == null) || document.styleSheets[0];
			if (sheet.href != null) deferreds.push(fetchCSS(sheet.href).then((metadata) => embedFonts(metadata, options)).then((cssText) => parseCSS(cssText).forEach((rule) => {
				inline.insertRule(rule, inline.cssRules.length);
			})).catch((err) => {
				console.error("Error loading remote stylesheet", err);
			}));
			console.error("Error inlining remote css file", e);
		}
	});
	return Promise.all(deferreds).then(() => {
		styleSheets.forEach((sheet) => {
			if ("cssRules" in sheet) try {
				toArray(sheet.cssRules || []).forEach((item) => {
					ret.push(item);
				});
			} catch (e) {
				console.error(`Error while reading CSS rules from ${sheet.href}`, e);
			}
		});
		return ret;
	});
}
function getWebFontRules(cssRules) {
	return cssRules.filter((rule) => rule.type === CSSRule.FONT_FACE_RULE).filter((rule) => shouldEmbed(rule.style.getPropertyValue("src")));
}
async function parseWebFontRules(node, options) {
	if (node.ownerDocument == null) throw new Error("Provided element is not within a Document");
	return getWebFontRules(await getCSSRules(toArray(node.ownerDocument.styleSheets), options));
}
function normalizeFontFamily(font) {
	return font.trim().replace(/["']/g, "");
}
function getUsedFonts(node) {
	const fonts = /* @__PURE__ */ new Set();
	function traverse(node$1) {
		(node$1.style.fontFamily || getComputedStyle(node$1).fontFamily).split(",").forEach((font) => {
			fonts.add(normalizeFontFamily(font));
		});
		Array.from(node$1.children).forEach((child) => {
			if (child instanceof HTMLElement) traverse(child);
		});
	}
	traverse(node);
	return fonts;
}
async function getWebFontCSS(node, options) {
	const rules = await parseWebFontRules(node, options);
	const usedFonts = getUsedFonts(node);
	return (await Promise.all(rules.filter((rule) => usedFonts.has(normalizeFontFamily(rule.style.fontFamily))).map((rule) => {
		const baseUrl = rule.parentStyleSheet ? rule.parentStyleSheet.href : null;
		return embedResources(rule.cssText, baseUrl, options);
	}))).join("\n");
}
async function embedWebFonts(clonedNode, options) {
	const cssText = options.fontEmbedCSS != null ? options.fontEmbedCSS : options.skipFonts ? null : await getWebFontCSS(clonedNode, options);
	if (cssText) {
		const styleNode = document.createElement("style");
		const sytleContent = document.createTextNode(cssText);
		styleNode.appendChild(sytleContent);
		if (clonedNode.firstChild) clonedNode.insertBefore(styleNode, clonedNode.firstChild);
		else clonedNode.appendChild(styleNode);
	}
}
async function toSvg(node, options = {}) {
	const { width, height } = getImageSize(node, options);
	const clonedNode = await cloneNode(node, options, true);
	await embedWebFonts(clonedNode, options);
	await embedImages(clonedNode, options);
	applyStyle(clonedNode, options);
	return await nodeToDataURL(clonedNode, width, height);
}
async function toCanvas(node, options = {}) {
	const { width, height } = getImageSize(node, options);
	const img = await createImage(await toSvg(node, options));
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");
	const ratio = options.pixelRatio || getPixelRatio();
	const canvasWidth = options.canvasWidth || width;
	const canvasHeight = options.canvasHeight || height;
	canvas.width = canvasWidth * ratio;
	canvas.height = canvasHeight * ratio;
	if (!options.skipAutoScale) checkCanvasDimensions(canvas);
	canvas.style.width = `${canvasWidth}`;
	canvas.style.height = `${canvasHeight}`;
	if (options.backgroundColor) {
		context.fillStyle = options.backgroundColor;
		context.fillRect(0, 0, canvas.width, canvas.height);
	}
	context.drawImage(img, 0, 0, canvas.width, canvas.height);
	return canvas;
}
async function toBlob(node, options = {}) {
	return await canvasToBlob(await toCanvas(node, options));
}
const REPO_URL = OFFICIAL_REPO_URL;
const REPO_LABEL = OFFICIAL_REPO_LABEL;
function withTimeout(p, ms, label) {
	return Promise.race([p, new Promise((_, reject) => setTimeout(() => reject(/* @__PURE__ */ new Error(`${label}: timeout after ${ms} ms`)), ms))]);
}
async function renderCardBlob(node) {
	if (typeof document !== "undefined" && document.fonts?.ready) try {
		await withTimeout(document.fonts.ready, 4e3, "share-image fonts");
	} catch {}
	const blob = await withTimeout(toBlob(node, {
		pixelRatio: Math.max(2, Math.round(globalThis.devicePixelRatio || 1)),
		cacheBust: true,
		backgroundColor: "#0b0b0f"
	}), 12e3, "share-image");
	if (!blob) throw new Error("share-image: empty blob");
	return blob;
}
async function copyImageToClipboard(image) {
	if (typeof ClipboardItem !== "undefined" && typeof navigator !== "undefined" && navigator.clipboard?.write) try {
		const item = new ClipboardItem({ "image/png": image });
		await navigator.clipboard.write([item]);
		return "copied";
	} catch {}
	return "unsupported";
}
function buildShareText(stats) {
	const nf = (n) => n.toLocaleString("en-US");
	return `I've spoken ${nf(stats.userWords)} words to my ${PRODUCT_NAME} across ${nf(stats.sessionCount)} conversations — ${stats.conversationHours.toFixed(1)} h of voice. Build your own:`;
}
async function shareToX(image, text) {
	if (image instanceof Blob) {
		const file = new File([image], "jarvis-stats.png", { type: "image/png" });
		if (navigator.canShare?.({ files: [file] }) && typeof navigator.share === "function") try {
			await navigator.share({
				files: [file],
				text: `${text} ${REPO_URL}`
			});
			return "shared";
		} catch (error) {
			if (error?.name === "AbortError") return "dismissed";
		}
	}
	const intentUrl = `https://twitter.com/intent/tweet?${new URLSearchParams({
		text,
		url: REPO_URL
	}).toString()}`;
	let win = null;
	const candidate = globalThis.open?.("", "_blank") ?? null;
	if (candidate) try {
		candidate.opener = null;
		candidate.location.replace(intentUrl);
		win = candidate;
	} catch {
		try {
			candidate.close();
		} catch {}
	}
	const copy = copyImageToClipboard(image);
	await Promise.resolve(image);
	const copyResult = await copy;
	if (win) return copyResult === "copied" ? "composer" : "composer_without_image";
	return copyResult === "copied" ? "blocked" : "blocked_without_image";
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var INK = "#07080a";
var AMBER = "#f5f4ef";
var CYAN = "#8a8a92";
var MONO = "\"JetBrains Mono\", ui-monospace, \"SF Mono\", Menlo, monospace";
const ShareCard = (0, import_react.forwardRef)(function ShareCard$1({ userWords, jarvisWords, conversationHours, sessionCount, longestStreak, handle }, ref) {
	const t = useT();
	const nf = (n) => n.toLocaleString();
	const SEGMENTS = 28;
	const filled = Math.max(2, Math.min(SEGMENTS, Math.round(longestStreak / 30 * SEGMENTS)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		"data-testid": "share-card",
		style: {
			position: "relative",
			width: 1080,
			height: 1080,
			boxSizing: "border-box",
			background: INK,
			color: "#fff",
			fontFamily: MONO,
			overflow: "hidden"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
				position: "absolute",
				inset: 0,
				background: "radial-gradient(60% 50% at 18% 8%, rgba(245,244,239,0.16), transparent 60%),radial-gradient(55% 45% at 92% 100%, rgba(138,138,146,0.14), transparent 60%)"
			} }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
				position: "absolute",
				inset: 0,
				backgroundImage: "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
				backgroundSize: "60px 60px"
			} }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bracket, { pos: "tl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bracket, { pos: "tr" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bracket, { pos: "bl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bracket, { pos: "br" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					position: "relative",
					height: "100%",
					boxSizing: "border-box",
					padding: 96,
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 20
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									width: 64,
									height: 64,
									borderRadius: "50%",
									border: `1.5px solid ${AMBER}`,
									background: "rgba(245,244,239,0.06)",
									boxShadow: "0 0 24px -6px rgba(245,244,239,0.5)"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/jarvis-mark-256.png",
									width: 38,
									height: 38,
									alt: "",
									style: { display: "block" }
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: 26,
									fontWeight: 700,
									letterSpacing: "0.34em",
									color: "rgba(255,255,255,0.92)"
								},
								children: t("board_view.share.card.brand")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								fontSize: 18,
								letterSpacing: "0.26em",
								color: AMBER
							},
							children: "// ALL-TIME"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 16,
								fontSize: 26,
								fontWeight: 500,
								letterSpacing: "0.32em",
								textTransform: "uppercase",
								color: AMBER
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
								width: 40,
								height: 2,
								background: AMBER
							} }), t("board_view.share.card.hero_label")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								marginTop: 14,
								fontSize: 232,
								fontWeight: 800,
								lineHeight: .9,
								letterSpacing: "-0.04em",
								color: "#fff",
								textShadow: "0 0 60px rgba(245,244,239,0.22)"
							},
							children: nf(userWords)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
							marginTop: 22,
							height: 16,
							backgroundImage: `repeating-linear-gradient(90deg, ${AMBER} 0 2px, transparent 2px 26px)`,
							opacity: .55
						} }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								marginTop: 40,
								display: "flex",
								flexDirection: "column",
								gap: 14
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									fontSize: 38,
									color: "rgba(255,255,255,0.92)"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontWeight: 800,
											color: CYAN
										},
										children: nf(jarvisWords)
									}),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: "rgba(255,255,255,0.62)" },
										children: t("board_view.share.card.jarvis_suffix")
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: 32,
									color: "rgba(255,255,255,0.5)",
									letterSpacing: "0.02em"
								},
								children: t("board_view.share.card.talk_line").replace("{0}", conversationHours.toFixed(1)).replace("{1}", nf(sessionCount))
							})]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							gap: 30
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								gap: 14
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: 20,
									letterSpacing: "0.24em",
									textTransform: "uppercase",
									color: "rgba(255,255,255,0.55)"
								},
								children: t("board_view.share.card.streak").replace("{0}", nf(longestStreak))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "flex",
									gap: 5
								},
								children: Array.from({ length: SEGMENTS }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
									flex: 1,
									height: 16,
									background: i < filled ? AMBER : "rgba(255,255,255,0.09)"
								} }, i))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								borderTop: "1px solid rgba(255,255,255,0.1)",
								paddingTop: 26,
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								fontSize: 24,
								color: "rgba(255,255,255,0.55)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { color: AMBER },
								children: "▮ "
							}), REPO_LABEL] }), handle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { color: "rgba(255,255,255,0.7)" },
								children: `@${handle}`
							})]
						})]
					})
				]
			})
		]
	});
});
function Bracket({ pos }) {
	const size = 56;
	const off = 52;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
		position: "absolute",
		width: size,
		height: size,
		opacity: .85,
		...{
			tl: {
				top: off,
				left: off,
				borderTop: `2px solid ${AMBER}`,
				borderLeft: `2px solid ${AMBER}`
			},
			tr: {
				top: off,
				right: off,
				borderTop: `2px solid ${AMBER}`,
				borderRight: `2px solid ${AMBER}`
			},
			bl: {
				bottom: off,
				left: off,
				borderBottom: `2px solid ${AMBER}`,
				borderLeft: `2px solid ${AMBER}`
			},
			br: {
				bottom: off,
				right: off,
				borderBottom: `2px solid ${AMBER}`,
				borderRight: `2px solid ${AMBER}`
			}
		}[pos]
	} });
}
var KEY = "board.share.handle";
function read() {
	try {
		return localStorage.getItem(KEY) ?? "";
	} catch {
		return "";
	}
}
function useShareHandle() {
	const [handle, setHandleState] = (0, import_react.useState)(read);
	return [handle, (0, import_react.useCallback)((value) => {
		const cleaned = value.trim().replace(/^@+/, "");
		setHandleState(cleaned);
		try {
			if (cleaned) localStorage.setItem(KEY, cleaned);
			else localStorage.removeItem(KEY);
		} catch {}
	}, [])];
}
var PREVIEW = 320;
var SCALE = PREVIEW / 1080;
function ShareDialog({ open, onOpenChange, stats }) {
	const t = useT();
	const native = useCapabilities().data?.native_file_actions ?? false;
	const pushToast = useEventStore((s) => s.pushToast);
	const cardRef = (0, import_react.useRef)(null);
	const saveCard = async () => {
		const filename = "jarvis-stats.png";
		const savedPath = await saveOrDownload({
			filename,
			blob: await ensureBlob(),
			native
		});
		if (savedPath) pushToast("success", `${t("session_detail.saved_to_downloads")} ${savedPath}`, {
			filePath: savedPath,
			filename
		});
	};
	const [handle, setHandle] = useShareHandle();
	const [status, setStatus] = (0, import_react.useState)({ kind: "idle" });
	const blobRef = (0, import_react.useRef)(null);
	const blobPromiseRef = (0, import_react.useRef)(null);
	function ensureBlob() {
		if (blobRef.current) return Promise.resolve(blobRef.current);
		if (blobPromiseRef.current) return blobPromiseRef.current;
		const el = cardRef.current;
		if (!el) return Promise.reject(/* @__PURE__ */ new Error("share: card not mounted"));
		const p = renderCardBlob(el).then((b) => {
			blobRef.current = b;
			return b;
		});
		blobPromiseRef.current = p;
		return p;
	}
	(0, import_react.useEffect)(() => {
		if (open) setStatus({ kind: "idle" });
	}, [open]);
	(0, import_react.useEffect)(() => {
		blobRef.current = null;
		blobPromiseRef.current = null;
		if (!open) return;
		const id = setTimeout(() => {
			ensureBlob().catch(() => {});
		}, 250);
		return () => clearTimeout(id);
	}, [
		open,
		handle,
		stats.userWords,
		stats.jarvisWords,
		stats.conversationHours,
		stats.sessionCount,
		stats.longestStreak
	]);
	const busy = status.kind === "busy";
	async function run(action) {
		if (!cardRef.current) return;
		setStatus({
			kind: "busy",
			msgKey: "board_view.share.status_generating"
		});
		try {
			await action();
		} catch {
			setStatus({
				kind: "error",
				msgKey: "board_view.share.status_error"
			});
		}
	}
	const onCopy = () => run(async () => {
		if (await copyImageToClipboard(blobRef.current ?? ensureBlob()) === "copied") setStatus({
			kind: "ok",
			msgKey: "board_view.share.status_copied"
		});
		else {
			await saveCard();
			setStatus({
				kind: "ok",
				msgKey: "board_view.share.status_copy_unsupported"
			});
		}
	});
	const onSave = () => run(async () => {
		await saveCard();
		setStatus({
			kind: "ok",
			msgKey: "board_view.share.status_saved"
		});
	});
	const onShareX = () => run(async () => {
		switch (await shareToX(blobRef.current ?? ensureBlob(), buildShareText(stats))) {
			case "shared":
				setStatus({
					kind: "ok",
					msgKey: "board_view.share.status_shared"
				});
				break;
			case "dismissed":
				setStatus({ kind: "idle" });
				break;
			case "composer":
				setStatus({
					kind: "ok",
					msgKey: "board_view.share.status_composer"
				});
				break;
			case "composer_without_image":
				setStatus({
					kind: "error",
					msgKey: "board_view.share.status_composer_without_image"
				});
				break;
			case "blocked":
				setStatus({
					kind: "error",
					msgKey: "board_view.share.status_blocked"
				});
				break;
			case "blocked_without_image":
				setStatus({
					kind: "error",
					msgKey: "board_view.share.status_blocked_without_image"
				});
				break;
			default: setStatus({
				kind: "error",
				msgKey: "board_view.share.status_error"
			});
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 z-50 bg-scrim/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
			className: "fixed left-1/2 top-1/2 z-50 w-[min(440px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-popover p-5 shadow-float data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
			"data-testid": "share-dialog",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
						className: "font-display text-sm font-semibold",
						children: t("board_view.share.title")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
						className: "text-xs text-muted-foreground",
						children: t("board_view.share.subtitle")
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
						className: "rounded-md p-1 text-muted-foreground transition-colors hover:bg-sheen/[0.06] hover:text-foreground",
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-4 overflow-hidden rounded-xl border border-sheen/[0.06]",
					style: {
						width: PREVIEW,
						height: PREVIEW
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							width: 1080,
							height: 1080,
							transform: `scale(${SCALE})`,
							transformOrigin: "top left"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareCard, {
							...stats,
							handle
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					style: {
						position: "fixed",
						left: -99999,
						top: 0,
						pointerEvents: "none"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareCard, {
						ref: cardRef,
						...stats,
						handle
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mb-3 block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1 block text-xs text-muted-foreground",
						children: t("board_view.share.handle_label")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center rounded-lg border border-sheen/[0.08] bg-sheen/[0.03] px-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted-foreground",
							children: "@"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: handle,
							onChange: (e) => setHandle(e.target.value),
							placeholder: t("board_view.share.handle_placeholder"),
							className: "w-full bg-transparent px-1.5 py-1.5 text-sm outline-none",
							"data-testid": "share-handle-input"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" }),
							label: t("board_view.share.copy_image"),
							onClick: onCopy,
							disabled: busy,
							testId: "share-copy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }),
							label: t("board_view.share.save_png"),
							onClick: onSave,
							disabled: busy,
							testId: "share-save"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButton, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-3.5 w-3.5" }),
							label: t("board_view.share.share_on_x"),
							onClick: onShareX,
							disabled: busy,
							primary: true,
							testId: "share-x"
						})
					]
				}),
				status.kind !== "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("mt-3 text-xs", status.kind === "error" ? "text-destructive" : "text-muted-foreground"),
					"data-testid": "share-status",
					children: t(status.msgKey)
				})
			]
		})] })
	});
}
function ActionButton({ icon, label, onClick, disabled, primary, testId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		disabled,
		"data-testid": testId,
		className: cn("inline-flex flex-col items-center justify-center gap-1 rounded-lg border px-2 py-2.5 text-xs font-medium transition-colors", primary ? "border-primary/40 bg-primary/[0.10] text-primary hover:bg-primary/[0.16]" : "border-sheen/[0.08] bg-sheen/[0.03] hover:border-primary/40 hover:bg-primary/[0.06]", disabled && "opacity-50"),
		children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
	});
}
function InsightCard({ className, children, testId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		"data-testid": testId,
		className: cn("flex min-w-0 flex-col rounded-lg border border-border bg-card p-5", className),
		children
	});
}
function Eyebrow({ children, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children
		}), hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
			content: hint,
			side: "top",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
				className: "h-3.5 w-3.5 text-foreground-faint",
				"aria-label": hint
			})
		})]
	});
}
function BigNumber({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("text-2xl font-semibold tabular-nums leading-none text-foreground-strong", className),
		children
	});
}
function CardTitleRow({ title, fact, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4 flex flex-wrap items-start justify-between gap-x-4 gap-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold text-foreground-strong",
				children: title
			}), children]
		}), fact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pt-1.5 text-xs font-medium uppercase tracking-[0.08em] text-foreground tabular-nums",
			children: fact
		})]
	});
}
function Hairline() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-4 h-px bg-border" });
}
function SkeletonBlock({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("animate-pulse rounded-md bg-foreground/10", className) });
}
const HEAT_LEVEL_CLASS = {
	0: "bg-sheen/[0.07]",
	1: "bg-accent/25",
	2: "bg-accent/45",
	3: "bg-accent/70",
	4: "bg-accent"
};
function SpeedGauge({ wpm, typingWpm, centerTop, centerBottom }) {
	const scale = Math.max(200, Math.ceil(wpm * 1.15 / 50) * 50);
	const r = 70;
	const cx = 90;
	const cy = 86;
	const point = (fraction, radius = r) => {
		const angle = Math.PI * (1 - Math.min(1, Math.max(0, fraction)));
		return {
			x: cx + radius * Math.cos(angle),
			y: cy - radius * Math.sin(angle)
		};
	};
	const arc = (fraction) => {
		const end = point(fraction);
		return `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
	};
	const tickInner = point(typingWpm / scale, r - 13);
	const tickOuter = point(typingWpm / scale, r + 13);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 180 100",
		className: "w-full max-w-[240px]",
		role: "img",
		"aria-label": `${centerTop} ${centerBottom}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: arc(1),
				fill: "none",
				stroke: "rgb(var(--sheen-rgb) / 0.08)",
				strokeWidth: 16,
				strokeLinecap: "round"
			}),
			wpm > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: arc(wpm / scale),
				fill: "none",
				stroke: "hsl(var(--accent))",
				strokeWidth: 16,
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: tickInner.x,
				y1: tickInner.y,
				x2: tickOuter.x,
				y2: tickOuter.y,
				stroke: "hsl(var(--foreground))",
				strokeOpacity: .55,
				strokeWidth: 1.5
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: cx,
				y: cy - 18,
				textAnchor: "middle",
				className: "fill-foreground-strong",
				fontSize: 20,
				fontWeight: 600,
				children: centerTop
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: cx,
				y: cy - 2,
				textAnchor: "middle",
				className: "fill-muted-foreground",
				fontSize: 10,
				children: centerBottom
			})
		]
	});
}
var PAGE_WEEKS = 22;
function StreakCalendar({ days }) {
	const t = useT();
	const lang = useUiLanguage();
	const weeks = (0, import_react.useMemo)(() => calendarWeeks(days), [days]);
	const level = (0, import_react.useMemo)(() => intensityLevels(days.map(actionsOf)), [days]);
	const lastStart = Math.max(0, weeks.length - PAGE_WEEKS);
	const [start, setStart] = (0, import_react.useState)(lastStart);
	const page = weeks.slice(start, start + PAGE_WEEKS);
	const today = days[days.length - 1]?.date;
	const monthName = (0, import_react.useMemo)(() => {
		const fmt = new Intl.DateTimeFormat(lang, { month: "short" });
		return (m) => fmt.format(new Date(2024, m, 1));
	}, [lang]);
	const weekdayNames = (0, import_react.useMemo)(() => {
		const fmt = new Intl.DateTimeFormat(lang, { weekday: "short" });
		return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(2024, 0, 1 + i)));
	}, [lang]);
	const dayLabel = (0, import_react.useMemo)(() => {
		const fmt = new Intl.DateTimeFormat(lang, {
			weekday: "short",
			day: "numeric",
			month: "short"
		});
		return (iso) => fmt.format(/* @__PURE__ */ new Date(`${iso}T00:00:00`));
	}, [lang]);
	const describe = (day) => {
		const actions = actionsOf(day);
		if (actions === 0 && day.agent_turns === 0) return `${dayLabel(day.date)} — ${t("board_insights.calendar.nothing")}`;
		const parts = [t("board_insights.calendar.started").replace("{0}", actions.toLocaleString())];
		const words = wordsOf(day);
		if (words > 0) parts.push(t("board_insights.calendar.words").replace("{0}", words.toLocaleString()));
		return `${dayLabel(day.date)} — ${parts.join(" · ")}`;
	};
	const navButton = "flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-sheen/[0.06] hover:text-foreground disabled:pointer-events-none disabled:opacity-30";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-3",
		"data-testid": "board-streak-calendar",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid items-center gap-1",
			style: { gridTemplateColumns: `2.25rem repeat(${PAGE_WEEKS}, minmax(0, 1fr))` },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: navButton,
					onClick: () => setStart((s) => Math.max(0, s - PAGE_WEEKS)),
					disabled: start === 0,
					"aria-label": t("board_insights.calendar.older"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
				}),
				page.map((week, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative h-4 text-xs text-muted-foreground",
					children: week.monthStart !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute left-0 top-0 whitespace-nowrap",
						children: monthName(week.monthStart)
					})
				}, i)),
				Array.from({ length: 7 }, (_, row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: row % 2 === 0 ? weekdayNames[row] : "",
					cells: page.map((week) => week.days[row]),
					level,
					describe,
					today
				}, row))
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("board_insights.calendar.less") }),
					[
						0,
						1,
						2,
						3,
						4
					].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-3 w-3 rounded-[3px]", HEAT_LEVEL_CLASS[l]) }, l)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("board_insights.calendar.more") })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: navButton,
				onClick: () => setStart((s) => Math.min(lastStart, s + PAGE_WEEKS)),
				disabled: start >= lastStart,
				"aria-label": t("board_insights.calendar.newer"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
			})]
		})]
	});
}
function Row({ label, cells, level, describe, today }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "truncate pr-1 text-xs text-muted-foreground",
		children: label
	}), cells.map((day, i) => day ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
		content: describe(day),
		side: "top",
		className: "block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("block aspect-square w-full max-w-[22px] rounded-[4px]", HEAT_LEVEL_CLASS[level(actionsOf(day))], day.date === today && "ring-1 ring-foreground/50 ring-offset-1 ring-offset-card") })
	}, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block aspect-square w-full max-w-[22px]" }, i))] });
}
function UsageTab({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-4 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeedCard, { data }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeSavedCard, { data }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordsCard, { data })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageMixCard, { data }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StreakCard, { data })]
		})]
	});
}
function SpeedCard({ data }) {
	const t = useT();
	const typing = data.reference.typing_wpm;
	const wpm = wordsPerMinute(data.dictation.words, data.dictation.seconds);
	const ratio = typing > 0 ? wpm / typing : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InsightCard, {
		testId: "board-speed-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BigNumber, { children: wpm > 0 ? Math.round(wpm).toLocaleString() : "—" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
					hint: t("board_insights.speed.hint").replace("{0}", String(typing)),
					children: t("board_insights.speed.label")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto flex flex-col items-center pt-4",
				children: wpm > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeedGauge, {
					wpm,
					typingWpm: typing,
					centerTop: `${ratio.toFixed(1)}×`,
					centerBottom: t("board_insights.speed.vs_typing")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 flex items-center gap-1.5 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "h-3 w-px bg-foreground/60"
					}), t("board_insights.speed.typing_mark").replace("{0}", String(typing))]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-6 text-center text-sm text-muted-foreground",
					children: t("board_insights.speed.empty")
				})
			})
		]
	});
}
function TimeSavedCard({ data }) {
	const t = useT();
	const typing = data.reference.typing_wpm;
	const hours = minutesSaved(data.dictation.words, data.dictation.seconds, typing) / 60;
	const spokenHours = data.dictation.seconds / 3600;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InsightCard, {
		testId: "board-time-saved-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BigNumber, { children: data.dictation.words > 0 ? hours >= 10 ? `${Math.round(hours).toLocaleString()} h` : `${hours.toFixed(1)} h` : "—" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
					hint: t("board_insights.saved.hint").replace("{0}", String(typing)),
					children: t("board_insights.saved.label")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hairline, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "flex flex-col gap-3 text-base",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FactRow, {
						value: data.dictation.dictations.toLocaleString(),
						label: t("board_insights.saved.dictations")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FactRow, {
						value: `${spokenHours >= 10 ? Math.round(spokenHours) : spokenHours.toFixed(1)} h`,
						label: t("board_insights.saved.spoken")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FactRow, {
						value: `${Math.round(typing > 0 ? data.dictation.words / typing / 60 : 0).toLocaleString()} h`,
						label: t("board_insights.saved.typing_would_take")
					})
				]
			})
		]
	});
}
function FactRow({ value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "truncate text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "shrink-0 font-medium tabular-nums text-foreground-strong",
			children: value
		})]
	});
}
function WordsCard({ data }) {
	const t = useT();
	const dictated = data.dictation.words;
	const spoken = data.voice.user_words;
	const total = dictated + spoken;
	const novels = data.reference.novel_words > 0 ? total / data.reference.novel_words : 0;
	const trend = trendPercent(data.trend.words_30d, data.trend.words_prev_30d);
	const dictatedShare = total > 0 ? dictated / total : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InsightCard, {
		testId: "board-words-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BigNumber, { children: total.toLocaleString() }), trend !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
					content: t("board_insights.words.trend_hint"),
					side: "top",
					className: "shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-xs font-medium tabular-nums text-foreground",
						children: [trend >= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-3.5 w-3.5" }), t("board_insights.words.trend").replace("{0}", `${trend > 0 ? "+" : ""}${trend}`)]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
					hint: t("board_insights.words.novel_hint").replace("{0}", data.reference.novel_words.toLocaleString()),
					children: t("board_insights.words.label")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hairline, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-base text-foreground",
				children: total === 0 ? t("board_insights.words.empty") : novels >= 1 ? t("board_insights.words.novels").replace("{0}", novels.toFixed(1)) : t("board_insights.words.novel_share").replace("{0}", String(Math.max(1, Math.round(novels * 100))))
			}),
			total > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-7 gap-1 overflow-hidden rounded-md text-xs font-medium",
					children: [dictated > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitSegment, {
						icon: Mic,
						label: t("board_insights.words.dictated"),
						share: dictatedShare,
						className: "bg-accent text-accent-foreground"
					}), spoken > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitSegment, {
						icon: PhoneCall,
						label: t("board_insights.words.spoken"),
						share: 1 - dictatedShare,
						className: "bg-accent/30 text-foreground"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex justify-between text-xs tabular-nums text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: dictated.toLocaleString() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: spoken.toLocaleString() })]
				})]
			})
		]
	});
}
function SplitSegment({ icon: Icon, label, share, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex min-w-[28px] items-center gap-1.5 overflow-hidden rounded-md px-2", className),
		style: {
			flexGrow: share,
			flexBasis: 0
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "h-3.5 w-3.5 shrink-0",
			"aria-label": label
		}), share >= .15 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: label
		})]
	});
}
var MIX_ICON = {
	dictations: Mic,
	agent_sessions: Bot,
	chat_messages: MessagesSquare,
	voice_sessions: PhoneCall
};
function UsageMixCard({ data }) {
	const t = useT();
	const rows = usageMix(data);
	const total = rows.reduce((s, r) => s + r.count, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InsightCard, {
		testId: "board-usage-mix",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitleRow, {
			title: t("board_insights.mix.title"),
			fact: t("board_insights.mix.active_days").replace("{0}", data.streak.active_days.toLocaleString())
		}), total === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: t("board_insights.mix.empty")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-1 flex-col justify-center gap-3",
			children: rows.map((row) => {
				const Icon = MIX_ICON[row.key];
				const pct = Math.round(row.share * 100);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: cn("flex items-center gap-3", row.count === 0 && "opacity-50"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "h-5 w-5 shrink-0 text-muted-foreground",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-9 w-[38%] shrink-0 overflow-hidden rounded-md bg-sheen/[0.05]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-y-0 left-0 rounded-md bg-accent",
								style: { width: row.count > 0 ? `${Math.max(row.share * 100, 18)}%` : "0%" }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("absolute inset-y-0 left-2.5 flex items-center text-sm font-semibold tabular-nums", row.count > 0 ? "text-accent-foreground" : "text-muted-foreground"),
								children: pct < 1 && row.count > 0 ? "<1%" : `${pct}%`
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 truncate text-sm font-medium uppercase tracking-[0.06em] text-foreground",
							children: plural(t, `board_insights.mix.${row.key}`, row.count)
						})
					]
				}, row.key);
			})
		})]
	});
}
function StreakCard({ data }) {
	const t = useT();
	const current = data.streak.current_days;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InsightCard, {
		testId: "board-streak-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitleRow, {
			title: current > 0 ? plural(t, "board_insights.streak.title", current) : t("board_insights.streak.none"),
			fact: plural(t, "board_insights.streak.longest", data.streak.longest_days)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StreakCalendar, { days: data.days })]
	});
}
const BOARD_CATEGORY_KEYS = [
	"agents",
	"browser",
	"mail",
	"community",
	"knowledge",
	"system"
];
const CATEGORY_META = {
	agents: {
		icon: Bot,
		accent: "text-primary",
		bar: "bg-primary",
		glow: ""
	},
	browser: {
		icon: Globe,
		accent: "text-sky-400",
		bar: "bg-sky-400",
		glow: ""
	},
	mail: {
		icon: Mail,
		accent: "text-rose-400",
		bar: "bg-rose-400",
		glow: ""
	},
	community: {
		icon: Users,
		accent: "text-violet-400",
		bar: "bg-violet-400",
		glow: ""
	},
	knowledge: {
		icon: BookOpen,
		accent: "text-muted-foreground",
		bar: "bg-muted-foreground",
		glow: ""
	},
	system: {
		icon: Settings2,
		accent: "text-zinc-400",
		bar: "bg-zinc-400",
		glow: ""
	}
};
function categoryLabelKey(key) {
	return `board_view.category.${key}`;
}
function AgentsTab({ data }) {
	const t = useT();
	const lang = useUiLanguage();
	const best = data.records.best_agent_day;
	const sessions30 = data.agents.items.reduce((s, a) => s + a.sessions_30d, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-4 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: t("board_insights.agents.stat_sessions"),
					value: data.agents.sessions.toLocaleString()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: t("board_insights.agents.stat_sessions_30d"),
					value: sessions30.toLocaleString()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: t("board_insights.agents.stat_tokens"),
					value: compactNumber(data.agents.tokens)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: t("board_insights.agents.stat_busiest"),
					value: best ? best.value.toLocaleString() : "—",
					sub: best ? formatDay(best.date, lang) : void 0
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodingAgentsCard, { data }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-col gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatsCard, { data }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoriesCard, { data })]
			})]
		})]
	});
}
function StatCard({ label, value, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InsightCard, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BigNumber, { children: value }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: label })
		}),
		sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 text-sm text-muted-foreground",
			children: sub
		})
	] });
}
function CodingAgentsCard({ data }) {
	const t = useT();
	const lang = useUiLanguage();
	const [range, setRange] = (0, import_react.useState)("30d");
	const sessionsOf = (a) => range === "30d" ? a.sessions_30d : a.sessions;
	const turnsOf = (a) => range === "30d" ? a.turns_30d : a.turns;
	const rows = [...data.agents.items].sort((a, b) => sessionsOf(b) - sessionsOf(a));
	const total = rows.reduce((s, a) => s + sessionsOf(a), 0);
	const max = Math.max(1, ...rows.map(sessionsOf));
	const relative = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InsightCard, {
		testId: "board-coding-agents",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitleRow, {
				title: t("board_insights.agents.title"),
				fact: plural(t, "board_insights.agents.used", rows.filter((a) => sessionsOf(a) > 0).length),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: t("board_insights.agents.subtitle")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBar, {
				className: "mb-2",
				tabs: [{
					id: "30d",
					label: t("board_insights.agents.range_30d")
				}, {
					id: "all",
					label: t("board_insights.agents.range_all")
				}],
				active: range,
				onChange: (id) => setRange(id)
			}),
			rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-6 text-sm text-muted-foreground",
				children: t("board_insights.agents.empty")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full table-fixed text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "text-left text-xs uppercase tracking-[0.06em] text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 font-medium",
							children: t("board_insights.agents.col_agent")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-[32%] py-2 font-medium",
							children: t("board_insights.agents.col_share")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-[13%] py-2 text-right font-medium",
							children: t("board_insights.agents.col_sessions")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-[13%] py-2 text-right font-medium",
							children: t("board_insights.agents.col_turns")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "hidden w-[17%] py-2 text-right font-medium md:table-cell",
							children: t("board_insights.agents.col_last")
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((agent) => {
					const sessions = sessionsOf(agent);
					const pct = total ? Math.round(sessions / total * 100) : 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: cn("border-t border-border", sessions === 0 && "opacity-50"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-w-0 items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderLogo, {
										providerId: agent.agent,
										label: agentLabel(agent.agent)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate font-medium text-foreground-strong",
										children: agentLabel(agent.agent)
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 pr-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-2 flex-1 overflow-hidden rounded-full bg-sheen/[0.06]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full bg-accent",
											style: { width: sessions > 0 ? `${Math.max(sessions / max * 100, 3)}%` : "0%" }
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "w-9 text-right text-xs tabular-nums text-muted-foreground",
										children: [pct, "%"]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 text-right tabular-nums text-foreground-strong",
								children: sessions.toLocaleString()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 text-right tabular-nums text-muted-foreground",
								children: compactNumber(turnsOf(agent))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "hidden py-2.5 text-right text-muted-foreground md:table-cell",
								children: agent.last_ms ? relativeDays(agent.last_ms, relative) : "—"
							})
						]
					}, agent.agent);
				}) })]
			})
		]
	});
}
function ChatsCard({ data }) {
	const t = useT();
	const rows = data.chats.providers.slice(0, 6);
	const max = Math.max(1, ...rows.map((r) => r.messages));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InsightCard, {
		testId: "board-chats",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitleRow, {
			title: t("board_insights.chats.title"),
			fact: plural(t, "board_insights.chats.messages", data.chats.messages)
		}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: t("board_insights.chats.empty")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-2.5",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-2.5 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderLogo, {
						providerId: row.provider,
						label: chatProviderLabel(row.provider),
						size: "sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-24 shrink-0 truncate text-foreground",
						children: chatProviderLabel(row.provider)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 flex-1 overflow-hidden rounded-full bg-sheen/[0.06]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-accent/70",
							style: { width: row.messages > 0 ? `${Math.max(row.messages / max * 100, 3)}%` : "0%" }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-10 text-right tabular-nums text-foreground-strong",
						children: row.messages.toLocaleString()
					})
				]
			}, row.provider))
		})]
	});
}
function CategoriesCard({ data }) {
	const t = useT();
	const counts = new Map(data.categories.categories.map((c) => [c.category, c.count]));
	const total = data.categories.total;
	const rows = BOARD_CATEGORY_KEYS.map((key) => ({
		key,
		count: counts.get(key) ?? 0
	})).filter((r) => r.count > 0).sort((a, b) => b.count - a.count);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InsightCard, {
		testId: "board-categories",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitleRow, {
			title: t("board_insights.categories.title"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: t("board_insights.categories.subtitle")
			})
		}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: t("board_insights.categories.empty")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-2",
			children: rows.map(({ key, count }) => {
				const Icon = CATEGORY_META[key].icon;
				const pct = total ? Math.round(count / total * 100) : 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2.5 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "h-4 w-4 shrink-0 text-muted-foreground",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex-1 truncate text-foreground",
							children: t(categoryLabelKey(key))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-muted-foreground",
							children: count.toLocaleString()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "w-10 text-right text-xs tabular-nums text-foreground-strong",
							children: [pct, "%"]
						})
					]
				}, key);
			})
		})]
	});
}
function relativeDays(ms, fmt) {
	const startOfToday = /* @__PURE__ */ new Date();
	startOfToday.setHours(0, 0, 0, 0);
	const then = new Date(ms);
	then.setHours(0, 0, 0, 0);
	const days = Math.round((then.getTime() - startOfToday.getTime()) / 864e5);
	return fmt.format(days, "day");
}
var WEEKS_SHOWN = 26;
function RhythmTab({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PunchCard, { data }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeeklyVolumeCard, { data }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordsCard, { data })]
		})]
	});
}
function useWeekdayNames(style) {
	const lang = useUiLanguage();
	return (0, import_react.useMemo)(() => {
		const fmt = new Intl.DateTimeFormat(lang, { weekday: style });
		return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(2024, 0, 1 + i)));
	}, [lang, style]);
}
function hourLabel(hour, lang) {
	return new Date(2024, 0, 1, hour).toLocaleTimeString(lang, { hour: "numeric" });
}
function PunchCard({ data }) {
	const t = useT();
	const lang = useUiLanguage();
	const shortDays = useWeekdayNames("short");
	const longDays = useWeekdayNames("long");
	const punch = data.punch_card;
	const level = (0, import_react.useMemo)(() => intensityLevels(punch.flat()), [punch]);
	const peak = peakSlot(punch);
	const hours = hourTotals(punch);
	const maxHour = Math.max(1, ...hours);
	const weekdays = weekdayTotals(punch);
	const topDay = weekdays.indexOf(Math.max(...weekdays));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InsightCard, {
		testId: "board-punch-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitleRow, {
			title: t("board_insights.rhythm.title"),
			fact: peak ? t("board_insights.rhythm.peak").replace("{0}", longDays[peak.weekday]).replace("{1}", hourLabel(peak.hour, lang)) : void 0,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: t("board_insights.rhythm.subtitle")
			})
		}), !peak ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-6 text-sm text-muted-foreground",
			children: t("board_insights.rhythm.empty")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-w-[640px] items-center gap-1",
				style: { gridTemplateColumns: "3rem repeat(24, minmax(0, 1fr)) 4.5rem" },
				children: [
					punch.map((row, weekday) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PunchRow, {
						label: shortDays[weekday],
						values: row,
						level,
						total: weekdays[weekday],
						highlight: weekday === topDay,
						describe: (hour, value) => `${longDays[weekday]}, ${hourLabel(hour, lang)} — ${value.toLocaleString()}`
					}, weekday)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
					hours.map((value, hour) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-12 items-end",
						"aria-hidden": true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full rounded-t-[3px] bg-accent/60",
							style: { height: `${Math.max(value / maxHour * 100, value > 0 ? 4 : 0)}%` }
						})
					}, hour)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
					hours.map((_, hour) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-center text-xs tabular-nums text-muted-foreground",
						children: hour % 3 === 0 ? String(hour).padStart(2, "0") : ""
					}, hour)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
				]
			})
		})]
	});
}
function PunchRow({ label, values, level, total, highlight, describe }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("text-xs", highlight ? "font-semibold text-foreground-strong" : "text-muted-foreground"),
			children: label
		}),
		values.map((value, hour) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickTooltip, {
			content: describe(hour, value),
			side: "top",
			className: "block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("block h-6 w-full rounded-[4px]", HEAT_LEVEL_CLASS[level(value)]) })
		}, hour)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-right text-xs tabular-nums text-muted-foreground",
			children: total.toLocaleString()
		})
	] });
}
function WeeklyVolumeCard({ data }) {
	const t = useT();
	const lang = useUiLanguage();
	const weeks = weeklyTotals(data.days, WEEKS_SHOWN, 8);
	const max = Math.max(1, ...weeks.map((w) => w.words));
	const best = weeks.reduce((b, w) => w.words > b ? w.words : b, 0);
	const monthFmt = new Intl.DateTimeFormat(lang, { month: "short" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InsightCard, {
		testId: "board-weekly-volume",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitleRow, {
			title: t("board_insights.weekly.title"),
			fact: best > 0 ? t("board_insights.weekly.best").replace("{0}", best.toLocaleString()) : void 0,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: t("board_insights.weekly.subtitle")
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-44 items-end gap-1",
			children: weeks.map((week, i) => {
				const date = week.start ? /* @__PURE__ */ new Date(`${week.start}T00:00:00`) : null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QuickTooltip, {
					content: `${week.start ? formatDay(week.start, lang) : ""} — ${t("board_insights.weekly.tooltip").replace("{0}", week.words.toLocaleString()).replace("{1}", week.agentSessions.toLocaleString())}`,
					side: "top",
					className: "flex h-full flex-1 flex-col justify-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("w-full rounded-t-[4px]", i === weeks.length - 1 ? "bg-accent/45" : "bg-accent"),
						style: { height: `${Math.max(week.words / max * 100, week.words > 0 ? 2 : 0)}%` }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1.5 h-4 text-center text-xs text-muted-foreground",
						children: date && date.getDate() <= 7 ? monthFmt.format(date) : ""
					})]
				}, i);
			})
		})]
	});
}
function RecordsCard({ data }) {
	const t = useT();
	const lang = useUiLanguage();
	const totalWords = data.dictation.words + data.voice.user_words;
	const { previous, next } = milestoneProgress(totalWords);
	const progress = next > previous ? (totalWords - previous) / (next - previous) : 0;
	const bestWords = data.records.best_words_day;
	const bestAgents = data.records.best_agent_day;
	const todayWords = data.days.length ? wordsOf(data.days[data.days.length - 1]) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InsightCard, {
		testId: "board-records",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitleRow, { title: t("board_insights.records.title") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "flex flex-col divide-y divide-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordRow, {
						icon: Award,
						label: t("board_insights.records.best_words"),
						value: bestWords ? bestWords.value.toLocaleString() : "—",
						sub: bestWords ? formatDay(bestWords.date, lang) : void 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordRow, {
						icon: Bot,
						label: t("board_insights.records.best_agents"),
						value: bestAgents ? bestAgents.value.toLocaleString() : "—",
						sub: bestAgents ? formatDay(bestAgents.date, lang) : void 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordRow, {
						icon: Flame,
						label: t("board_insights.records.longest_streak"),
						value: plural(t, "board_insights.records.days", data.streak.longest_days)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordRow, {
						icon: CalendarDays,
						label: t("board_insights.records.active_days"),
						value: data.streak.active_days.toLocaleString(),
						sub: data.streak.first_day ? t("board_insights.records.since").replace("{0}", formatDay(data.streak.first_day, lang)) : void 0
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto pt-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-baseline justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-foreground-strong",
							children: t("board_insights.records.next_milestone").replace("{0}", next.toLocaleString())
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-muted-foreground",
							children: t("board_insights.records.to_go").replace("{0}", Math.max(0, next - totalWords).toLocaleString())
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 overflow-hidden rounded-full bg-sheen/[0.06]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-accent",
							style: { width: `${Math.min(100, progress * 100)}%` }
						})
					}),
					todayWords > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: t("board_insights.records.today").replace("{0}", todayWords.toLocaleString())
					})
				]
			})
		]
	});
}
function RecordRow({ icon: Icon, label, value, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex items-center gap-3 py-2.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "h-4 w-4 shrink-0 text-muted-foreground",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate text-sm text-foreground",
					children: label
				}), sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate text-xs text-muted-foreground",
					children: sub
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 text-base font-semibold tabular-nums text-foreground-strong",
				children: value
			})
		]
	});
}
var TAB_STORAGE_KEY = "jarvis.board.tab";
function readStoredTab() {
	try {
		const value = window.localStorage.getItem(TAB_STORAGE_KEY);
		if (value === "usage" || value === "agents" || value === "rhythm") return value;
	} catch {}
	return "usage";
}
function BoardView() {
	const t = useT();
	const insights = useBoardInsights();
	const [tab, setTabState] = (0, import_react.useState)(readStoredTab);
	const [shareOpen, setShareOpen] = (0, import_react.useState)(false);
	const data = insights.data;
	const setTab = (next) => {
		setTabState(next);
		try {
			window.localStorage.setItem(TAB_STORAGE_KEY, next);
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto w-full max-w-[1280px] px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardIcon, {}),
					title: t("board_view.title"),
					description: t("board_insights.description"),
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => setShareOpen(true),
						disabled: !data,
						"data-testid": "board-share-button",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-4 w-4" }), t("board_view.share.button")]
					}),
					tabs: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBar, {
						tabs: [
							{
								id: "usage",
								label: t("board_insights.tabs.usage")
							},
							{
								id: "agents",
								label: t("board_insights.tabs.agents")
							},
							{
								id: "rhythm",
								label: t("board_insights.tabs.rhythm")
							}
						],
						active: tab,
						onChange: (id) => setTab(id)
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto scrollbar-jarvis",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto w-full max-w-[1280px] px-6 py-6 lg:px-8",
					children: insights.error && !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsightCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: t("board_view.load_error")
					}) }) : !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardSkeleton, {}) : tab === "usage" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageTab, { data }) : tab === "agents" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentsTab, { data }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RhythmTab, { data })
				})
			}),
			data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareDialog, {
				open: shareOpen,
				onOpenChange: setShareOpen,
				stats: {
					userWords: data.dictation.words + data.voice.user_words,
					jarvisWords: data.voice.jarvis_words,
					conversationHours: data.voice.seconds / 3600,
					sessionCount: data.voice.sessions,
					longestStreak: data.streak.longest_days
				}
			})
		]
	});
}
function BoardSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		"data-testid": "board-skeleton",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-4 lg:grid-cols-3",
			children: [
				0,
				1,
				2
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InsightCard, {
				className: "h-56",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "h-7 w-24" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "mt-3 h-3 w-36" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "mt-auto h-20 w-full" })
				]
			}, i))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]",
			children: [0, 1].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InsightCard, {
				className: "h-72",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "h-6 w-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonBlock, { className: "mt-auto h-44 w-full" })]
			}, i))
		})]
	});
}
export { BoardView };
