import { Xc as require_react, tl as __toESM } from "./index-BOzhgzD7.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function readFence(children) {
	const element = import_react.Children.toArray(children).find((child) => (0, import_react.isValidElement)(child));
	if (!(0, import_react.isValidElement)(element)) return null;
	return {
		language: /language-(\S+)/.exec(element.props.className ?? "")?.[1].toLowerCase() ?? "",
		code: String(element.props.children ?? "").replace(/\n$/, "")
	};
}
function visualFenceLanguage(language, code) {
	const tag = language.toLowerCase();
	if ([
		"html",
		"htm",
		"text/html"
	].includes(tag)) return "html";
	if (["svg", "image/svg+xml"].includes(tag)) return "svg";
	if (tag !== "" && tag !== "xml") return null;
	const source = code.trim().replace(/^<\?xml\s[^?]*\?>\s*/i, "");
	if (/^<svg(?:\s[^>]*)?>[\s\S]*<\/svg>$/i.test(source)) return "svg";
	if (tag === "" && /^(?:<!doctype html>\s*)?<html(?:\s[^>]*)?>[\s\S]*<\/html>$/i.test(source)) return "html";
	return null;
}
export { visualFenceLanguage as n, readFence as t };
