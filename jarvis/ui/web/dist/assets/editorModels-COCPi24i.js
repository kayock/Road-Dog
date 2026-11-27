import { wc as useEventStore } from "./index-BOzhgzD7.js";
import { i as useCodeEditorStore } from "./codeEditor-BpQSQnN9.js";
var KINDS = {
	image: new Set([
		"png",
		"jpg",
		"jpeg",
		"gif",
		"webp",
		"bmp",
		"ico",
		"avif"
	]),
	pdf: new Set(["pdf"]),
	audio: new Set([
		"mp3",
		"wav",
		"ogg",
		"oga",
		"m4a",
		"aac",
		"flac",
		"weba",
		"opus"
	]),
	video: new Set([
		"mp4",
		"m4v",
		"webm",
		"ogv",
		"mov"
	]),
	document: new Set([
		"docx",
		"doc",
		"odt",
		"rtf",
		"xlsx",
		"xls",
		"ods",
		"pptx",
		"ppt",
		"odp",
		"epub"
	])
};
var extensionOf = (path) => {
	const name = (path.split("/").pop() ?? path).toLowerCase();
	const dot = name.lastIndexOf(".");
	return dot > 0 ? name.slice(dot + 1) : "";
};
function viewKindOf(path) {
	const extension = extensionOf(path);
	for (const kind of Object.keys(KINDS)) if (KINDS[kind].has(extension)) return kind;
	return null;
}
function renderKindOf(path) {
	const extension = extensionOf(path);
	if ([
		"md",
		"markdown",
		"mdx",
		"mdown",
		"mkd"
	].includes(extension)) return "markdown";
	if (["html", "htm"].includes(extension)) return "html";
	if (extension === "svg") return "svg";
	return null;
}
var SaveConflictError = class extends Error {
	constructor(message, currentVersion) {
		super(message);
		this.currentVersion = currentVersion;
		this.name = "SaveConflictError";
	}
};
var TrashUnavailableError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "TrashUnavailableError";
	}
};
var base = (workspaceId) => `/api/agentic-ide/workspaces/${encodeURIComponent(workspaceId)}`;
var query = (path) => new URLSearchParams({ path }).toString();
async function failure(res) {
	let detail = null;
	try {
		detail = (await res.json()).detail ?? null;
	} catch {}
	return {
		message: typeof detail === "string" ? detail : detail && typeof detail === "object" && typeof detail.message === "string" ? detail.message : `Request failed (${res.status}).`,
		detail
	};
}
async function send(url, init) {
	const res = await fetch(url, {
		cache: "no-store",
		...init
	});
	if (!res.ok) throw new Error((await failure(res)).message);
	return await res.json();
}
function json(method, body) {
	return {
		method,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	};
}
function loadTextFile(workspaceId, path, encoding) {
	const params = new URLSearchParams({ path });
	if (encoding) params.set("encoding", encoding);
	return send(`${base(workspaceId)}/text-file?${params.toString()}`);
}
async function fetchFileVersion(workspaceId, path) {
	return (await send(`${base(workspaceId)}/text-file/version?${query(path)}`)).version;
}
async function saveTextFile(workspaceId, request) {
	const res = await fetch(`${base(workspaceId)}/text-file`, json("PUT", {
		path: request.path,
		text: request.text,
		expected_version: request.expectedVersion,
		encoding: request.encoding,
		create: request.create ?? false
	}));
	if (res.status === 409) {
		const { message, detail } = await failure(res);
		throw new SaveConflictError(message, detail?.current_version ?? null);
	}
	if (!res.ok) throw new Error((await failure(res)).message);
	return await res.json();
}
async function fetchHeadText(workspaceId, path, ref = "") {
	const params = new URLSearchParams(ref ? {
		path,
		ref
	} : { path }).toString();
	return (await send(`${base(workspaceId)}/head-text?${params}`)).text;
}
function fetchFileList(workspaceId) {
	return send(`${base(workspaceId)}/file-list`);
}
function createEntry$1(workspaceId, path, kind) {
	return send(`${base(workspaceId)}/entries`, json("POST", {
		path,
		kind
	}));
}
function copyEntry(workspaceId, source, destination, unique = false) {
	return send(`${base(workspaceId)}/entries/copy`, json("POST", {
		source,
		destination,
		unique
	}));
}
function moveEntry(workspaceId, source, destination) {
	return send(`${base(workspaceId)}/entries/move`, json("POST", {
		source,
		destination
	}));
}
async function deleteEntry(workspaceId, path, permanent = false) {
	const res = await fetch(`${base(workspaceId)}/entries/delete`, json("POST", {
		path,
		permanent
	}));
	if (res.status === 409) {
		const { message, detail } = await failure(res);
		if (detail?.trash_unavailable) throw new TrashUnavailableError(message);
		throw new Error(message);
	}
	if (!res.ok) throw new Error((await failure(res)).message);
	return await res.json();
}
function fetchEditorState(workspaceId) {
	return send(`${base(workspaceId)}/editor-state`);
}
async function putEditorTabs(workspaceId, tabs, active, keepalive = false) {
	await send(`${base(workspaceId)}/editor-state/tabs`, {
		...json("PUT", {
			tabs,
			active
		}),
		keepalive
	});
}
async function putEditorBackup(workspaceId, backup, keepalive = false) {
	await send(`${base(workspaceId)}/editor-state/backup`, {
		...json("PUT", backup),
		keepalive
	});
}
async function deleteEditorBackup(workspaceId, path) {
	await send(`${base(workspaceId)}/editor-state/backup?${query(path)}`, { method: "DELETE" });
}
function searchWorkspace(workspaceId, search, signal) {
	const params = new URLSearchParams({
		q: search.query,
		regex: String(search.regex),
		case: String(search.caseSensitive),
		word: String(search.wholeWord),
		include: search.include,
		exclude: search.exclude
	});
	return send(`${base(workspaceId)}/search?${params.toString()}`, { signal });
}
function replaceInFiles(workspaceId, search, replacement, paths) {
	return send(`${base(workspaceId)}/search/replace`, json("POST", {
		query: search.query,
		replacement,
		regex: search.regex,
		case_sensitive: search.caseSensitive,
		whole_word: search.wholeWord,
		paths
	}));
}
async function pythonIntel(workspaceId, action, position, signal) {
	return (await send(`${base(workspaceId)}/python/${action}`, {
		...json("POST", position),
		signal
	})).result;
}
var api = null;
var entries = /* @__PURE__ */ new Map();
var heads = /* @__PURE__ */ new Map();
var viewStates = /* @__PURE__ */ new Map();
var headLoads = /* @__PURE__ */ new Map();
var saveEpochs = /* @__PURE__ */ new Map();
var bumpEpoch = (fileKey) => saveEpochs.set(fileKey, (saveEpochs.get(fileKey) ?? 0) + 1);
function setMonaco(monaco) {
	api = monaco;
}
var store = () => useCodeEditorStore.getState();
function languageFor(path) {
	if (!api) return "plaintext";
	const name = (path.split("/").pop() ?? path).toLowerCase();
	const dot = name.lastIndexOf(".");
	const extension = dot > 0 ? name.slice(dot) : "";
	const languages = api.languages.getLanguages();
	const byName = languages.find((language) => language.filenames?.some((entry) => entry.toLowerCase() === name));
	if (byName) return byName.id;
	const byExtension = extension && languages.find((language) => language.extensions?.some((entry) => entry.toLowerCase() === extension));
	return byExtension ? byExtension.id : "plaintext";
}
function languageName(id) {
	return (api?.languages.getLanguages().find((entry) => entry.id === id))?.aliases?.[0] ?? id;
}
function uriFor(workspaceId, path, scheme = "file") {
	return api.Uri.from({
		scheme,
		path: `/${encodeURIComponent(workspaceId)}/${path}`
	});
}
function eolSequence(eol) {
	return eol === "\r\n" ? api.editor.EndOfLineSequence.CRLF : api.editor.EndOfLineSequence.LF;
}
function syncDirty(fileKey) {
	const entry = entries.get(fileKey);
	const file = store().files[fileKey];
	if (!entry || !file) return;
	const dirty = entry.model.getAlternativeVersionId() !== entry.saved;
	if (dirty !== file.dirty) store().patchFile(fileKey, { dirty });
}
function createEntry(fileKey, file, text, eol, saved) {
	const model = api.editor.createModel(text, languageFor(file.path), uriFor(file.workspaceId, file.path));
	model.setEOL(eolSequence(eol));
	const entry = {
		model,
		saved: saved ? model.getAlternativeVersionId() : -1,
		listener: model.onDidChangeContent(() => {
			syncDirty(fileKey);
			scheduleBackup(fileKey);
		})
	};
	entries.set(fileKey, entry);
	return entry;
}
function fileOfUri(uri) {
	if (uri.scheme !== "file") return null;
	const match = /^\/([^/]+)\/(.+)$/.exec(uri.path);
	if (!match) return null;
	return {
		workspaceId: decodeURIComponent(match[1]),
		path: match[2]
	};
}
function fileUri(workspaceId, path) {
	return uriFor(workspaceId, path);
}
function modelOf(fileKey) {
	return entries.get(fileKey)?.model ?? null;
}
function rememberViewState(tabKey, state) {
	viewStates.set(tabKey, state);
}
function viewStateOf(tabKey) {
	return viewStates.get(tabKey) ?? null;
}
function disposeFile(fileKey) {
	const entry = entries.get(fileKey);
	if (entry) {
		entry.listener.dispose();
		entry.model.dispose();
		entries.delete(fileKey);
	}
	heads.get(fileKey)?.dispose();
	heads.delete(fileKey);
	headLoads.delete(fileKey);
	saveEpochs.delete(fileKey);
	for (const key of [...viewStates.keys()]) if (key.endsWith(`:${fileKey}`)) viewStates.delete(key);
}
useCodeEditorStore.subscribe((state, previous) => {
	for (const key of Object.keys(previous.files)) if (!state.files[key]) disposeFile(key);
});
function replaceFromDisk(entry, text, eol) {
	const { model } = entry;
	if (model.getValue() !== text) {
		model.pushEOL(eolSequence(eol));
		model.pushEditOperations([], [{
			range: model.getFullModelRange(),
			text
		}], () => null);
		model.pushStackElement();
	}
	entry.saved = model.getAlternativeVersionId();
}
function toast(message) {
	useEventStore.getState().pushToast("error", message);
}
var BACKUP_DELAY_MS = 400;
var KEEPALIVE_MAX_CHARS = 6e4;
var backupTimers = /* @__PURE__ */ new Map();
var backupChains = /* @__PURE__ */ new Map();
function inOrder(fileKey, task) {
	const next = (backupChains.get(fileKey) ?? Promise.resolve()).then(task, task).catch((error) => {
		console.warn("Editor backup request failed:", error.message);
	});
	backupChains.set(fileKey, next);
	next.finally(() => {
		if (backupChains.get(fileKey) === next) backupChains.delete(fileKey);
	});
}
var backedUp = /* @__PURE__ */ new Set();
var pendingRestores = /* @__PURE__ */ new Map();
function queueRestore(fileKey, backup) {
	pendingRestores.set(fileKey, backup);
	backedUp.add(fileKey);
}
function sendBackup(fileKey, keepalive = false) {
	backupTimers.delete(fileKey);
	const file = store().files[fileKey];
	const entry = entries.get(fileKey);
	if (!file || !entry) return;
	if (file.dirty) {
		backedUp.add(fileKey);
		const backup = {
			path: file.path,
			text: entry.model.getValue(),
			base_version: file.version,
			encoding: file.encoding
		};
		const send$1 = () => putEditorBackup(file.workspaceId, backup, keepalive && backup.text.length <= KEEPALIVE_MAX_CHARS);
		if (keepalive) send$1().catch((error) => console.warn("Editor backup failed:", error.message));
		else inOrder(fileKey, send$1);
	} else forgetBackup(fileKey);
}
function scheduleBackup(fileKey) {
	window.clearTimeout(backupTimers.get(fileKey));
	backupTimers.set(fileKey, window.setTimeout(() => sendBackup(fileKey), BACKUP_DELAY_MS));
}
function forgetBackup(fileKey, file = store().files[fileKey]) {
	window.clearTimeout(backupTimers.get(fileKey));
	backupTimers.delete(fileKey);
	if (!backedUp.delete(fileKey) || !file) return;
	const { workspaceId, path } = file;
	inOrder(fileKey, () => deleteEditorBackup(workspaceId, path));
}
function flushBackups() {
	for (const fileKey of [...backupTimers.keys()]) {
		window.clearTimeout(backupTimers.get(fileKey));
		sendBackup(fileKey, true);
	}
}
function applyRestore(fileKey, diskVersion) {
	const backup = pendingRestores.get(fileKey);
	const entry = entries.get(fileKey);
	if (!backup || !entry) return;
	pendingRestores.delete(fileKey);
	const { model } = entry;
	if (model.getValue() !== backup.text) {
		model.pushEditOperations([], [{
			range: model.getFullModelRange(),
			text: backup.text
		}], () => null);
		model.pushStackElement();
	}
	const changedOnDisk = backup.base_version !== diskVersion;
	store().patchFile(fileKey, {
		version: backup.base_version,
		deleted: diskVersion === null && backup.base_version !== null,
		conflict: changedOnDisk && diskVersion !== null ? { diskVersion } : null
	});
	syncDirty(fileKey);
}
async function loadFile(fileKey) {
	const file = store().files[fileKey];
	if (!file || !api) return;
	const kind = viewKindOf(file.path);
	if (kind) {
		store().patchFile(fileKey, { status: kind });
		return;
	}
	try {
		const loaded = await loadTextFile(file.workspaceId, file.path);
		if (!store().files[fileKey]) return;
		if (loaded.text === null) {
			store().patchFile(fileKey, {
				status: loaded.too_large ? "too_large" : "binary",
				version: loaded.version
			});
			return;
		}
		const existing = entries.get(fileKey);
		if (existing) replaceFromDisk(existing, loaded.text, loaded.eol);
		else createEntry(fileKey, file, loaded.text, loaded.eol, true);
		store().patchFile(fileKey, {
			status: "ready",
			error: "",
			version: loaded.version,
			encoding: loaded.encoding,
			eol: loaded.eol,
			mixedEol: loaded.mixed_eol ?? false,
			deleted: false,
			conflict: null,
			dirty: false
		});
		applyRestore(fileKey, loaded.version);
	} catch (error) {
		if (!store().files[fileKey]) return;
		if (await fetchFileVersion(file.workspaceId, file.path).then((version) => version === null, () => false) && store().files[fileKey] && !entries.has(fileKey)) {
			createEntry(fileKey, file, "", "\n", true);
			store().patchFile(fileKey, {
				status: "ready",
				error: "",
				version: null,
				deleted: true,
				dirty: false
			});
			applyRestore(fileKey, null);
			return;
		}
		if (store().files[fileKey]) store().patchFile(fileKey, {
			status: "error",
			error: error.message
		});
	}
}
function loadHead(fileKey) {
	const pending = headLoads.get(fileKey);
	if (pending) return pending;
	const load = (async () => {
		const file = store().files[fileKey];
		if (!file || !api) return null;
		let text = null;
		try {
			text = await fetchHeadText(file.workspaceId, file.path, store().diffBases[fileKey]?.ref);
		} catch (error) {
			toast(error.message);
		}
		if (!store().files[fileKey]) return null;
		const existing = heads.get(fileKey);
		if (existing) {
			if (existing.getValue() !== (text ?? "")) existing.setValue(text ?? "");
			return existing;
		}
		const model = api.editor.createModel(text ?? "", languageFor(file.path), uriFor(file.workspaceId, file.path, "jarvis-head"));
		heads.set(fileKey, model);
		return model;
	})().finally(() => headLoads.delete(fileKey));
	headLoads.set(fileKey, load);
	return load;
}
async function loadHeadText(fileKey) {
	const file = store().files[fileKey];
	if (!file) return null;
	try {
		return await fetchHeadText(file.workspaceId, file.path);
	} catch {
		return null;
	}
}
async function saveFile(fileKey, { overwrite = false, encoding } = {}) {
	const file = store().files[fileKey];
	const entry = entries.get(fileKey);
	if (!file || !entry || file.saving) return false;
	const expected = overwrite ? file.conflict?.diskVersion ?? null : file.version;
	const create = overwrite ? file.conflict?.diskVersion == null : file.deleted || file.version === null;
	const sent = entry.model.getAlternativeVersionId();
	bumpEpoch(fileKey);
	store().patchFile(fileKey, { saving: true });
	try {
		const saved = await saveTextFile(file.workspaceId, {
			path: file.path,
			text: entry.model.getValue(),
			expectedVersion: expected,
			encoding: encoding ?? file.encoding,
			create
		});
		entry.saved = sent;
		if (entry.model.getAlternativeVersionId() === sent) forgetBackup(fileKey);
		bumpEpoch(fileKey);
		store().patchFile(fileKey, {
			saving: false,
			version: saved.version,
			encoding: saved.encoding,
			mixedEol: false,
			eol: saved.eol,
			deleted: false,
			conflict: null,
			dirty: entry.model.getAlternativeVersionId() !== sent
		});
		return true;
	} catch (error) {
		bumpEpoch(fileKey);
		if (error instanceof SaveConflictError) store().patchFile(fileKey, {
			saving: false,
			conflict: { diskVersion: error.currentVersion }
		});
		else {
			store().patchFile(fileKey, { saving: false });
			toast(error.message);
		}
		return false;
	}
}
async function saveAll(workspaceId) {
	const dirty = Object.entries(store().files).filter(([, file]) => file.workspaceId === workspaceId && file.dirty);
	for (const [key] of dirty) await saveFile(key);
}
async function revertFile(fileKey, { follow = false } = {}) {
	const file = store().files[fileKey];
	const entry = entries.get(fileKey);
	if (!file || !entry) return;
	const before = entry.model.getAlternativeVersionId();
	try {
		const loaded = await loadTextFile(file.workspaceId, file.path);
		if (entries.get(fileKey) !== entry) return;
		if (loaded.text === null) {
			toast("The file on disk can no longer be edited here.");
			return;
		}
		if (follow && entry.model.getAlternativeVersionId() !== before) {
			store().patchFile(fileKey, { conflict: { diskVersion: loaded.version } });
			return;
		}
		replaceFromDisk(entry, loaded.text, loaded.eol);
		store().patchFile(fileKey, {
			version: loaded.version,
			encoding: loaded.encoding,
			eol: loaded.eol,
			deleted: false,
			conflict: null,
			dirty: false
		});
	} catch (error) {
		toast(error.message);
	}
}
async function reopenWithEncoding(fileKey, encoding) {
	const file = store().files[fileKey];
	const entry = entries.get(fileKey);
	if (!file || !entry) return;
	if (file.dirty) {
		toast("Save or discard the changes before reopening the file in another encoding.");
		return;
	}
	try {
		const loaded = await loadTextFile(file.workspaceId, file.path, encoding);
		if (loaded.text === null || entries.get(fileKey) !== entry) return;
		replaceFromDisk(entry, loaded.text, loaded.eol);
		store().patchFile(fileKey, {
			version: loaded.version,
			encoding: loaded.encoding,
			eol: loaded.eol,
			mixedEol: loaded.mixed_eol ?? false,
			dirty: false
		});
	} catch (error) {
		toast(error.message);
	}
}
function setLineEnding(fileKey, eol) {
	const entry = entries.get(fileKey);
	if (!entry || !api) return;
	entry.model.pushEOL(eolSequence(eol));
	store().patchFile(fileKey, {
		eol,
		mixedEol: false
	});
}
function discardFile(fileKey) {
	forgetBackup(fileKey);
	disposeFile(fileKey);
	if (store().files[fileKey]) store().patchFile(fileKey, {
		dirty: false,
		status: "loading"
	});
}
async function checkDisk(fileKey) {
	const before = store().files[fileKey];
	if (!before || before.saving || before.status === "loading" || before.status === "error") return;
	const epoch = saveEpochs.get(fileKey) ?? 0;
	let version;
	try {
		version = await fetchFileVersion(before.workspaceId, before.path);
	} catch {
		return;
	}
	const file = store().files[fileKey];
	if (!file || file.saving || (saveEpochs.get(fileKey) ?? 0) !== epoch) return;
	if (version === null) {
		if (!file.deleted) store().patchFile(fileKey, { deleted: true });
		return;
	}
	if (version === file.version && !file.deleted) return;
	if (file.status !== "ready") {
		await loadFile(fileKey);
		return;
	}
	if (!file.dirty) await revertFile(fileKey, { follow: true });
	else if (file.conflict?.diskVersion !== version) store().patchFile(fileKey, { conflict: { diskVersion: version } });
}
function moveModels(workspaceId, from, to) {
	if (!api) return;
	const prefix = `${workspaceId}\u0000`;
	for (const [fileKey, entry] of [...entries]) {
		if (!fileKey.startsWith(prefix)) continue;
		const path = fileKey.slice(prefix.length);
		if (path !== from && !path.startsWith(`${from}/`)) continue;
		const moved = to + path.slice(from.length);
		const text = entry.model.getValue();
		const eol = entry.model.getEOL() === "\r\n" ? "\r\n" : "\n";
		const dirty = entry.model.getAlternativeVersionId() !== entry.saved;
		forgetBackup(fileKey);
		disposeFile(fileKey);
		createEntry(`${prefix}${moved}`, {
			workspaceId,
			path: moved
		}, text, eol, !dirty);
		if (dirty) scheduleBackup(`${prefix}${moved}`);
	}
}
export { putEditorTabs as A, copyEntry as C, fetchFileList as D, fetchEditorState as E, replaceInFiles as M, searchWorkspace as N, fetchFileVersion as O, renderKindOf as P, TrashUnavailableError as S, deleteEntry as T, saveAll as _, flushBackups as a, setMonaco as b, loadFile as c, modelOf as d, moveModels as f, revertFile as g, reopenWithEncoding as h, fileUri as i, pythonIntel as j, moveEntry as k, loadHead as l, rememberViewState as m, discardFile as n, languageFor as o, queueRestore as p, fileOfUri as r, languageName as s, checkDisk as t, loadHeadText as u, saveFile as v, createEntry$1 as w, viewStateOf as x, setLineEnding as y };
