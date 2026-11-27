import { Bc as require_jsx_runtime, Dc as useMutation, Jt as PetMark, Ln as cn, Oc as useQuery, Qi as ArrowLeft, Xc as require_react, ln as Button, oc as useT, sc as useUiLanguage, tl as __toESM, wc as useEventStore, yi as RefreshCw, zc as useQueryClient } from "./index-BOzhgzD7.js";
import { t as PageHeader } from "./PageHeader-DcwsywY0.js";
import { n as TabBar } from "./SectionTabBar-Cj6UhxEH.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
const SOUL_QUERY_KEY = ["soul"];
async function request(url, init) {
	const res = await fetch(url, init);
	const body = await res.json().catch(() => ({}));
	if (!res.ok) {
		const detail = body.detail;
		throw new Error(typeof detail === "string" ? detail : `HTTP ${res.status}`);
	}
	return body;
}
function useSoulProfile() {
	return useQuery({
		queryKey: SOUL_QUERY_KEY,
		queryFn: () => request("/api/soul"),
		retry: false
	});
}
function fileOf(profile, id) {
	return profile?.files.find((f) => f.id === id);
}
function useSaveSoul() {
	const client = useQueryClient();
	return useMutation({
		mutationFn: (content) => request("/api/soul/file", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ content })
		}),
		onSuccess: (profile) => client.setQueryData(SOUL_QUERY_KEY, profile)
	});
}
function useSaveInstructions() {
	const client = useQueryClient();
	return useMutation({
		mutationFn: (content) => request("/api/settings/agent-instructions", content.trim() ? {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ content })
		} : { method: "DELETE" }),
		onSuccess: () => client.invalidateQueries({ queryKey: SOUL_QUERY_KEY })
	});
}
function useForgetNote() {
	const client = useQueryClient();
	return useMutation({
		mutationFn: ({ target, id }) => request(`/api/soul/entries/${encodeURIComponent(target)}/${encodeURIComponent(id)}`, { method: "DELETE" }),
		onSuccess: (profile) => client.setQueryData(SOUL_QUERY_KEY, profile)
	});
}
var DAY_MS = 864e5;
function parseLedgerTime(ts) {
	if (!ts) return null;
	const normalized = ts.replace(/([+-]\d{2})(\d{2})$/, "$1:$2");
	const ms = Date.parse(normalized);
	return Number.isNaN(ms) ? null : ms;
}
function relativeDay(ms, lang, now = Date.now()) {
	if (ms === null) return null;
	const startOf = (t) => {
		const d = new Date(t);
		d.setHours(0, 0, 0, 0);
		return d.getTime();
	};
	const days = Math.round((startOf(now) - startOf(ms)) / DAY_MS);
	if (days >= 0 && days <= 30) return new Intl.RelativeTimeFormat(lang, { numeric: "auto" }).format(-days, "day");
	return new Date(ms).toLocaleDateString(lang, {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function whenShort(ms, lang, now = Date.now()) {
	if (ms === null) return null;
	if (new Date(ms).toDateString() === new Date(now).toDateString()) return new Date(ms).toLocaleTimeString(lang, {
		hour: "2-digit",
		minute: "2-digit"
	});
	return relativeDay(ms, lang, now);
}
function newest(times) {
	const known = times.filter((t) => typeof t === "number");
	return known.length ? Math.max(...known) : null;
}
function plural(t, key, count, lang) {
	const n = lang ? count.toLocaleString(lang) : String(count);
	return t(`${key}_${count === 1 ? "one" : "other"}`).replace("{0}", n);
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function vibeOf(profile) {
	return (fileOf(profile, "soul")?.character.who ?? []).find((r) => isVibe(r.label))?.text.trim() || null;
}
function isVibe(label) {
	return /^(vibe|stimmung|vibra)$/i.test(label.trim());
}
function Intro({ profile }) {
	const t = useT();
	const lang = useUiLanguage();
	const vibe = vibeOf(profile);
	const remembered = fileOf(profile, "memory")?.entries.length ?? 0;
	const changed = relativeDay(newest(profile.files.map((f) => f.updated_ms)), lang);
	const facts = [plural(t, "assistant_view.fact_memory", remembered, lang), changed ? t("assistant_view.fact_changed").replace("{0}", changed) : null].filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": "assistant-intro",
		className: "flex items-center gap-8 pt-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shrink-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PetMark, {
				size: 96,
				reactive: true,
				label: profile.name
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-testid": "assistant-vibe",
				className: cn("text-xl font-medium leading-8 tracking-tight", vibe ? "text-foreground-strong" : "text-muted-foreground"),
				children: vibe ?? t("assistant_view.vibe_missing")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					"data-testid": "assistant-learning",
					title: t(profile.learning ? "assistant_view.learning_on_hint" : "assistant_view.learning_off_hint"),
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: cn("h-1.5 w-1.5 rounded-full", profile.learning ? "bg-success" : "bg-foreground-faint")
					}), t(profile.learning ? "assistant_view.learning_on" : "assistant_view.learning_off")]
				}), facts.map((fact) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "text-foreground-faint",
						children: "·"
					}), fact]
				}, fact))]
			})]
		})]
	});
}
function Section({ title, action, children, testId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-testid": testId,
		"aria-label": title,
		className: "border-t border-border pt-7",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-baseline justify-between gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold text-foreground-strong",
				children: title
			}), action]
		}), children]
	});
}
function TextAction({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		...props,
		className: cn("rounded-sm text-sm font-medium text-muted-foreground transition-colors", "hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:pointer-events-none disabled:opacity-40", className)
	});
}
function SpecRow({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-base leading-7 text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-w-0 max-w-reading text-base leading-7 text-foreground",
			children
		})]
	});
}
function plain(text) {
	return text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/(^|\s)_(.+?)_(?=\s|$)/g, "$1$2").trim();
}
function Rules({ rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-col gap-2.5",
		children: rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [row.label && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-medium text-foreground-strong",
			children: [plain(row.label), ": "]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-foreground",
			children: plain(row.text)
		})] }, i))
	});
}
function CharacterSection({ soul, onEdit }) {
	const t = useT();
	const who = (soul?.character.who ?? []).filter((r) => !isVibe(r.label));
	const tone = soul?.character.tone ?? [];
	const limits = soul?.character.limits ?? [];
	const empty = who.length + tone.length + limits.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		testId: "assistant-character",
		title: t("assistant_view.character_title"),
		action: soul?.exists ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextAction, {
			onClick: onEdit,
			children: t("assistant_view.edit")
		}) : void 0,
		children: empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-base text-muted-foreground",
			children: t(soul?.exists ? "assistant_view.character_empty" : "assistant_view.character_missing")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "divide-y divide-border",
			children: [
				who.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpecRow, {
					label: plain(row.label) || t("assistant_view.who_label"),
					children: plain(row.text)
				}, `who-${i}`)),
				tone.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpecRow, {
					label: t("assistant_view.tone_title"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rules, { rows: tone })
				}),
				limits.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpecRow, {
					label: t("assistant_view.limits_title"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rules, { rows: limits })
				})
			]
		})
	});
}
function splitDated(text) {
	const m = /^(\d{4}-\d{2}-\d{2}) \([^)]*\): ([\s\S]*)$/.exec(text);
	if (!m) return {
		body: text,
		dateMs: null
	};
	const [y, mo, d] = m[1].split("-").map(Number);
	return {
		body: m[2],
		dateMs: new Date(y, mo - 1, d).getTime()
	};
}
function NoteList({ target, entries, canForget, emptyText }) {
	const t = useT();
	const lang = useUiLanguage();
	const pushToast = useEventStore((s) => s.pushToast);
	const forget = useForgetNote();
	if (entries.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-testid": `assistant-notes-empty-${target}`,
		className: "py-5 text-base text-muted-foreground",
		children: emptyText
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		"data-testid": `assistant-notes-${target}`,
		className: "divide-y divide-border",
		children: entries.map((entry) => {
			const { body, dateMs } = splitDated(entry.text);
			const date = relativeDay(dateMs, lang);
			const busy = forget.isPending && forget.variables?.id === entry.id;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "group flex items-start gap-8 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "min-w-0 flex-1 whitespace-pre-line text-base leading-7 text-foreground",
					children: body
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 flex-col items-end gap-1 pt-0.5 text-right",
					children: [(entry.explicit || date) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-foreground-faint",
						children: [entry.explicit ? t("assistant_view.explicit") : null, date].filter(Boolean).join(" · ")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextAction, {
						disabled: !canForget || busy,
						title: canForget ? void 0 : t("assistant_view.forget_needs_loop"),
						"aria-label": `${t("assistant_view.forget")}: ${body.slice(0, 60)}`,
						onClick: () => forget.mutate({
							target,
							id: entry.id
						}, {
							onSuccess: () => pushToast("success", t("assistant_view.forget_done")),
							onError: (e) => pushToast("error", e.message)
						}),
						className: "opacity-0 hover:text-destructive focus-visible:opacity-100 group-hover:opacity-100",
						children: t("assistant_view.forget")
					})]
				})]
			}, entry.id);
		})
	});
}
function MemorySection({ profile }) {
	const t = useT();
	const [tab, setTab] = (0, import_react.useState)("memory");
	const lists = {
		memory: fileOf(profile, "memory")?.entries ?? [],
		user: fileOf(profile, "user")?.entries ?? [],
		soul: fileOf(profile, "soul")?.learned ?? []
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		testId: "assistant-memory",
		title: t("assistant_view.memory_title"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBar, {
			active: tab,
			onChange: (id) => setTab(id),
			tabs: [
				{
					id: "memory",
					label: t("assistant_view.tab_memory"),
					count: lists.memory.length
				},
				{
					id: "user",
					label: t("assistant_view.tab_user"),
					count: lists.user.length
				},
				{
					id: "soul",
					label: t("assistant_view.tab_self"),
					count: lists.soul.length
				}
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteList, {
			target: tab,
			entries: lists[tab],
			canForget: profile.learning,
			emptyText: t(`assistant_view.empty_${tab}`)
		}, tab)]
	});
}
function useFileMeta() {
	const t = useT();
	const lang = useUiLanguage();
	return (file) => {
		if (!file.exists) return t("assistant_view.file_missing");
		const size = "entries" in file ? plural(t, "assistant_view.file_notes", file.entries.length, lang) : plural(t, "assistant_view.file_chars", file.chars, lang);
		const when = relativeDay(file.updated_ms, lang);
		return when ? `${size} · ${when}` : size;
	};
}
function withoutComments(text) {
	let out = "";
	let at = 0;
	for (;;) {
		const start = text.indexOf("<!--", at);
		if (start < 0) return out + text.slice(at);
		out += text.slice(at, start);
		const end = text.indexOf("-->", start + 4);
		if (end < 0) return out;
		at = end + 3;
	}
}
function clean(line) {
	return withoutComments(line).replace(/\*\*(.+?)\*\*/g, "$1").replace(/(^|\s)_([^_]+)_(?=[\s.,;:!?]|$)/g, "$1$2").replace(/^_|_$/g, "").trim();
}
function previewLines(file, max = 4) {
	if ("entries" in file) return file.entries.slice(0, max).map((e) => splitDated(e.text).body.replace(/\s+/g, " ").trim());
	const out = [];
	let paragraph = [];
	const flush = () => {
		if (paragraph.length) out.push(paragraph.join(" "));
		paragraph = [];
	};
	for (const raw of file.content.split("\n")) {
		const trimmed = raw.trim();
		if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("<!--") && trimmed.endsWith("-->")) flush();
		else if (/^[-*]\s+/.test(trimmed)) {
			flush();
			const item = clean(trimmed.replace(/^[-*]\s+/, ""));
			if (item) out.push(item);
		} else {
			const text = clean(trimmed);
			if (text) paragraph.push(text);
		}
		if (out.length >= max) break;
	}
	flush();
	return out.slice(0, max);
}
function FilePreview({ file, onOpen }) {
	const t = useT();
	const meta = useFileMeta();
	const lines = file.exists ? previewLines(file, 3) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		"data-testid": `assistant-file-${file.id}`,
		onClick: () => onOpen(file.id),
		className: cn("group flex h-[15.5rem] w-full flex-col rounded-xl border border-border bg-card p-5 text-left transition-colors", "hover:border-border-strong focus-visible:border-accent focus-visible:outline-none"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate text-base font-semibold text-foreground-strong",
					children: file.filename
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 text-sm tabular-nums text-foreground-faint",
					children: meta(file)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-0.5 text-sm text-muted-foreground",
				children: t(`assistant_view.file_role_${file.id}`)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 min-h-0 flex-1 overflow-hidden border-t border-border pt-3 [mask-image:linear-gradient(to_bottom,black_75%,transparent)]",
				children: lines.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-1.5",
					children: lines.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "line-clamp-2 text-sm leading-6 text-foreground/80",
						children: line
					}, i))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-6 text-foreground-faint",
					children: t(`assistant_view.file_empty_${file.id}`)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-3 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground",
				children: t(file.editable ? "assistant_view.file_open_edit" : "assistant_view.file_open_read")
			})
		]
	});
}
function FilesSection({ files, onOpen }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		testId: "assistant-files",
		title: t("assistant_view.files_title"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "-mt-2 mb-4 text-base text-muted-foreground",
			children: t("assistant_view.files_hint")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-4",
			children: files.map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreview, {
				file,
				onOpen
			}) }, file.id))
		})]
	});
}
function Editor({ file }) {
	const t = useT();
	const pushToast = useEventStore((s) => s.pushToast);
	const saveSoul = useSaveSoul();
	const saveInstructions = useSaveInstructions();
	const [draft, setDraft] = (0, import_react.useState)(file.content);
	(0, import_react.useEffect)(() => setDraft(file.content), [file.content]);
	const isSoul = file.id === "soul";
	const saving = saveSoul.isPending || saveInstructions.isPending;
	const dirty = draft !== file.content;
	const template = file.id === "instructions" ? file.template : "";
	const canSave = dirty && !saving && (!isSoul || draft.trim().length > 0);
	const onSave = () => {
		const done = {
			onSuccess: () => pushToast("success", t(!isSoul && !draft.trim() ? "assistant_view.cleared" : "assistant_view.saved")),
			onError: (e) => pushToast("error", e.message)
		};
		if (isSoul) saveSoul.mutate(draft, done);
		else saveInstructions.mutate(draft, done);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "sr-only",
				htmlFor: "assistant-file-editor",
				children: t("assistant_view.editor_label").replace("{0}", file.filename)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				id: "assistant-file-editor",
				"data-testid": "assistant-file-editor",
				value: draft,
				onChange: (e) => setDraft(e.target.value),
				onKeyDown: (e) => {
					if ((e.ctrlKey || e.metaKey) && e.key === "s") {
						e.preventDefault();
						if (canSave) onSave();
					}
				},
				spellCheck: false,
				placeholder: t(isSoul ? "assistant_view.soul_placeholder" : "assistant_view.instructions_placeholder"),
				className: "h-[42vh] min-h-[280px] w-full resize-none rounded-xl border border-border bg-card px-6 py-5 font-mono text-sm leading-6 text-foreground placeholder:text-foreground-faint transition-colors focus-visible:border-border-strong focus-visible:outline-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-x-6 gap-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "min-w-0 max-w-[34rem] text-sm text-muted-foreground",
					children: dirty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: t("assistant_view.unsaved")
					}) : t(isSoul ? "assistant_view.soul_note" : "assistant_view.instructions_note")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-5",
					children: [
						template && !draft.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextAction, {
							onClick: () => setDraft(template),
							children: t("assistant_view.load_template")
						}),
						!isSoul && file.exists && draft.trim() && !dirty && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextAction, {
							onClick: () => setDraft(""),
							children: t("assistant_view.clear")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextAction, {
							disabled: !dirty || saving,
							onClick: () => setDraft(file.content),
							children: t("assistant_view.revert")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							disabled: !canSave,
							onClick: onSave,
							"data-testid": "assistant-file-save",
							children: saving ? t("assistant_view.saving") : t("assistant_view.save")
						})
					]
				})]
			})
		]
	});
}
function isNotebook(file) {
	return file.id === "memory" || file.id === "user";
}
function FilePage({ file, name, canForget, onBack }) {
	const t = useT();
	const meta = useFileMeta();
	let body;
	if (isNotebook(file)) body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteList, {
		target: file.id,
		entries: file.entries,
		canForget,
		emptyText: t(`assistant_view.empty_${file.id}`)
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-4 text-sm text-muted-foreground",
		children: t("assistant_view.notebook_note")
	})] });
	else if (file.exists || file.id === "instructions") body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editor, { file }, file.id);
	else body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-base text-muted-foreground",
		children: t("assistant_view.character_missing")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-testid": `assistant-page-${file.id}`,
		className: "flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TextAction, {
				onClick: onBack,
				"data-testid": "assistant-back",
				className: "inline-flex items-center gap-1.5 self-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					"aria-hidden": true,
					className: "h-4 w-4"
				}), name]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 mt-5 flex items-end justify-between gap-6 border-b border-border pb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "truncate text-xl font-semibold text-foreground-strong",
						children: file.filename
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-base text-muted-foreground",
						children: t(`assistant_view.file_role_${file.id}`)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 text-sm tabular-nums text-foreground-faint",
					children: meta(file)
				})]
			}),
			body
		]
	});
}
var KNOWN_OPS = new Set([
	"add",
	"replace",
	"remove"
]);
var KNOWN_PLACES = new Set([
	"soul",
	"memory",
	"user"
]);
function RecentSection({ activity }) {
	const t = useT();
	const lang = useUiLanguage();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		testId: "assistant-recent",
		title: t("assistant_view.recent_title"),
		children: activity.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-base text-muted-foreground",
			children: t("assistant_view.recent_empty")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "divide-y divide-border",
			children: activity.map((item, i) => {
				const op = KNOWN_OPS.has(item.operation) ? item.operation : "add";
				const place = KNOWN_PLACES.has(item.target) ? t(`assistant_view.place_${item.target}`) : item.target;
				const said = item.evidence && item.evidence !== "[withheld]" ? item.evidence : "";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpecRow, {
					label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: whenShort(parseLedgerTime(item.ts), lang) ?? "–"
					}),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn(op === "remove" && "text-muted-foreground line-through decoration-foreground-faint"),
							children: splitDated(item.text).body || "–"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: t(`assistant_view.op_${op}`).replace("{0}", place)
						}),
						said && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm italic leading-6 text-muted-foreground",
							children: t("assistant_view.said").replace("{0}", said)
						})
					]
				}, `${item.ts}-${i}`);
			})
		})
	});
}
var COLUMN = "w-full";
function headerLine(t, profile) {
	if (!profile) return void 0;
	if (profile.named && profile.wake_phrase) return t("assistant_view.header_named").replace("{0}", profile.product).replace("{1}", profile.wake_phrase);
	return t("assistant_view.header_unnamed").replace("{0}", profile.product);
}
function AssistantProfileView() {
	const t = useT();
	const { data, isLoading, error, refetch, isRefetching } = useSoulProfile();
	const [open, setOpen] = (0, import_react.useState)(null);
	const scrollRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo?.({ top: 0 });
	}, [open]);
	const openFile = open && data ? data.files.find((f) => f.id === open) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: scrollRef,
		className: "flex h-full flex-col overflow-y-auto bg-background px-8 pb-12 scrollbar-jarvis",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: COLUMN,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
					title: data?.name ?? t("nav.agent_instructions"),
					description: headerLine(t, data),
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "icon",
						variant: "ghost",
						className: "text-muted-foreground",
						onClick: () => void refetch(),
						disabled: isRefetching,
						title: t("assistant_view.reload"),
						"aria-label": t("assistant_view.reload"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn(isRefetching && "animate-spin") })
					})
				}),
				isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileSkeleton, { label: t("common.loading") }),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "alert",
					className: "border-t border-border pt-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base font-medium text-foreground-strong",
							children: t("assistant_view.error_title")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-base text-muted-foreground",
							children: error.message
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextAction, {
							className: "mt-3",
							onClick: () => void refetch(),
							children: t("assistant_view.retry")
						})
					]
				}),
				data && openFile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePage, {
					file: openFile,
					name: data.name,
					canForget: data.learning,
					onBack: () => setOpen(null)
				}),
				data && !openFile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Intro, { profile: data }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilesSection, {
							files: data.files,
							onOpen: setOpen
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterSection, {
							soul: fileOf(data, "soul"),
							onEdit: () => setOpen("soul")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemorySection, { profile: data }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecentSection, { activity: data.activity })
					]
				})
			]
		})
	});
}
function ProfileSkeleton({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "status",
		"aria-busy": "true",
		"aria-label": label,
		className: "flex flex-col gap-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-8 pt-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 w-24 shrink-0 animate-pulse rounded-full bg-secondary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-11/12 animate-pulse rounded-md bg-secondary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-2/3 animate-pulse rounded-md bg-secondary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3.5 w-56 max-w-full animate-pulse rounded-full bg-secondary" })
				]
			})]
		}), [0, 1].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-border pt-7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-28 animate-pulse rounded-md bg-secondary" }), [
				0,
				1,
				2
			].map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-24 animate-pulse rounded-full bg-secondary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 flex-1 animate-pulse rounded-full bg-secondary" })]
			}, j))]
		}, i))]
	});
}
export { AssistantProfileView };
