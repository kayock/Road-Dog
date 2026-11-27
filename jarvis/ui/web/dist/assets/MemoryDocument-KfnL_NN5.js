import { Bc as require_jsx_runtime, Ln as cn, oc as useT, tl as __toESM } from "./index-BOzhgzD7.js";
import { r as ChatMarkdown, t as memoryDiff } from "./toolDiff-CkONUaSH.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function readableMemory(text) {
	return text.replace(/^\uFEFF/, "").replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, "").replace(/^<!-- memory-entry: [^\r\n]* -->\r?\n?/gm, "").replace(/\n{3,}/g, "\n\n").trim();
}
function MemoryMarkdown({ text }) {
	const t = useT();
	const content = readableMemory(text);
	return content ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatMarkdown, {
		text: content,
		className: "text-sm leading-7 [overflow-wrap:anywhere]"
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: t("society.profile_card.empty_file")
	});
}
function MemoryChanges({ before, after, patch }) {
	const t = useT();
	const files = memoryDiff("society_wiki_note", {}, {
		before: readableMemory(before),
		after: readableMemory(after)
	}) ?? [];
	const groups = [];
	const lines = patch ? patch.map((line) => ({
		kind: line.startsWith("@@") ? "gap" : line.startsWith("+") ? "add" : line.startsWith("-") ? "del" : "ctx",
		text: line.startsWith("@@") ? "…" : line.slice(1)
	})) : files.flatMap((file) => file.lines);
	for (const line of lines) {
		const previous = groups.at(-1);
		if (previous?.kind === line.kind) previous.lines.push(line.text);
		else groups.push({
			kind: line.kind,
			lines: [line.text]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-label": t("work_trace.diff"),
		className: "space-y-1",
		children: groups.map((group, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-change": group.kind,
			className: cn("flex gap-3 rounded-md px-3 py-2", group.kind === "add" && "diff-line-add", group.kind === "del" && "diff-line-del", group.kind === "ctx" && "text-muted-foreground"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "w-3 shrink-0 font-mono",
				children: group.kind === "add" ? "+" : group.kind === "del" ? "−" : ""
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatMarkdown, {
					text: group.lines.join("\n"),
					className: "text-sm leading-7 [overflow-wrap:anywhere]"
				})
			})]
		}, index))
	});
}
export { MemoryMarkdown as n, MemoryChanges as t };
