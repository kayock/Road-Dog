import { $r as EditorContextKeys, As as isEqual, Cd as dispose, Ct as MarkerSeverity, Is as ResourceMap, Ju as Range, Rd as localize, St as IMarkerService, Wl as RunOnceScheduler, Xs as IContextKeyService, Yr as IThemeService, _n as ILanguageFeatureDebounceService, as as IConfigurationService, at as registerEditorFeature, cs as EditorAction, gd as StopWatch, go as ILanguageFeaturesService, hn as toMultilineTokens2, hs as registerEditorContribution, mn as ISemanticTokensStylingService, ms as registerEditorCommand, oc as IModelService, of as isCancellationError, ps as registerEditorAction, qu as Selection, rd as CancellationTokenSource, s as editor, sf as onUnexpectedError, us as EditorCommand, vd as Disposable, yd as DisposableStore, zd as localize2 } from "./editor.api-DMQ2fqLq.js";
import { a as isSemanticTokens, c as CopyPasteController, d as DefaultPasteProvidersFeature, f as DefaultTextPasteOrDropEditProvider, i as hasDocumentSemanticTokensProvider, l as changePasteTypeCommandId, n as isSemanticColoringEnabled, o as isSemanticTokensEdits, p as HierarchicalKind, r as getDocumentSemanticTokens, t as SEMANTIC_HIGHLIGHTING_SETTING_ID, u as pasteWidgetVisibleCtx } from "./toggleHighContrast-DP7NF7KJ.js";
var MoveCaretCommand = class {
	constructor(selection, isMovingLeft) {
		this._selection = selection;
		this._isMovingLeft = isMovingLeft;
	}
	getEditOperations(model, builder) {
		if (this._selection.startLineNumber !== this._selection.endLineNumber || this._selection.isEmpty()) return;
		const lineNumber = this._selection.startLineNumber;
		const startColumn = this._selection.startColumn;
		const endColumn = this._selection.endColumn;
		if (this._isMovingLeft && startColumn === 1) return;
		if (!this._isMovingLeft && endColumn === model.getLineMaxColumn(lineNumber)) return;
		if (this._isMovingLeft) {
			const rangeBefore = new Range(lineNumber, startColumn - 1, lineNumber, startColumn);
			const charBefore = model.getValueInRange(rangeBefore);
			builder.addEditOperation(rangeBefore, null);
			builder.addEditOperation(new Range(lineNumber, endColumn, lineNumber, endColumn), charBefore);
		} else {
			const rangeAfter = new Range(lineNumber, endColumn, lineNumber, endColumn + 1);
			const charAfter = model.getValueInRange(rangeAfter);
			builder.addEditOperation(rangeAfter, null);
			builder.addEditOperation(new Range(lineNumber, startColumn, lineNumber, startColumn), charAfter);
		}
	}
	computeCursorState(model, helper) {
		if (this._isMovingLeft) return new Selection(this._selection.startLineNumber, this._selection.startColumn - 1, this._selection.endLineNumber, this._selection.endColumn - 1);
		else return new Selection(this._selection.startLineNumber, this._selection.startColumn + 1, this._selection.endLineNumber, this._selection.endColumn + 1);
	}
};
var MoveCaretAction = class extends EditorAction {
	constructor(left, opts) {
		super(opts);
		this.left = left;
	}
	run(accessor, editor$1) {
		if (!editor$1.hasModel()) return;
		const commands = [];
		const selections = editor$1.getSelections();
		for (const selection of selections) commands.push(new MoveCaretCommand(selection, this.left));
		editor$1.pushUndoStop();
		editor$1.executeCommands(this.id, commands);
		editor$1.pushUndoStop();
	}
};
var MoveCaretLeftAction = class extends MoveCaretAction {
	constructor() {
		super(true, {
			id: "editor.action.moveCarretLeftAction",
			label: localize2(861, "Move Selected Text Left"),
			precondition: EditorContextKeys.writable
		});
	}
};
var MoveCaretRightAction = class extends MoveCaretAction {
	constructor() {
		super(false, {
			id: "editor.action.moveCarretRightAction",
			label: localize2(862, "Move Selected Text Right"),
			precondition: EditorContextKeys.writable
		});
	}
};
registerEditorAction(MoveCaretLeftAction);
registerEditorAction(MoveCaretRightAction);
var pasteAsCommandId = "editor.action.pasteAs";
registerEditorContribution(CopyPasteController.ID, CopyPasteController, 0);
registerEditorFeature(DefaultPasteProvidersFeature);
registerEditorCommand(new class extends EditorCommand {
	constructor() {
		super({
			id: changePasteTypeCommandId,
			precondition: pasteWidgetVisibleCtx,
			kbOpts: {
				weight: 100,
				primary: 2137
			}
		});
	}
	runEditorCommand(_accessor, editor$1) {
		return CopyPasteController.get(editor$1)?.changePasteType();
	}
}());
registerEditorCommand(new class extends EditorCommand {
	constructor() {
		super({
			id: "editor.hidePasteWidget",
			precondition: pasteWidgetVisibleCtx,
			kbOpts: {
				weight: 100,
				primary: 9
			}
		});
	}
	runEditorCommand(_accessor, editor$1) {
		CopyPasteController.get(editor$1)?.clearWidgets();
	}
}());
registerEditorAction(class PasteAsAction extends EditorAction {
	static #_ = this.argsSchema = { oneOf: [{
		type: "object",
		required: ["kind"],
		properties: { kind: {
			type: "string",
			description: localize(967, "The kind of the paste edit to try pasting with.\nIf there are multiple edits for this kind, the editor will show a picker. If there are no edits of this kind, the editor will show an error message.")
		} }
	}, {
		type: "object",
		required: ["preferences"],
		properties: { preferences: {
			type: "array",
			description: localize(968, "List of preferred paste edit kind to try applying.\nThe first edit matching the preferences will be applied."),
			items: { type: "string" }
		} }
	}] };
	constructor() {
		super({
			id: pasteAsCommandId,
			label: localize2(969, "Paste As..."),
			precondition: EditorContextKeys.writable,
			metadata: {
				description: "Paste as",
				args: [{
					name: "args",
					schema: PasteAsAction.argsSchema
				}]
			},
			canTriggerInlineEdits: true
		});
	}
	run(_accessor, editor$1, args) {
		let preference;
		if (args) {
			if ("kind" in args) preference = { only: new HierarchicalKind(args.kind) };
			else if ("preferences" in args) preference = { preferences: args.preferences.map((kind) => new HierarchicalKind(kind)) };
		}
		return CopyPasteController.get(editor$1)?.pasteAs(preference);
	}
});
registerEditorAction(class extends EditorAction {
	constructor() {
		super({
			id: "editor.action.pasteAsText",
			label: localize2(970, "Paste as Text"),
			precondition: EditorContextKeys.writable,
			canTriggerInlineEdits: true
		});
	}
	run(_accessor, editor$1) {
		return CopyPasteController.get(editor$1)?.pasteAs({ providerId: DefaultTextPasteOrDropEditProvider.id });
	}
});
var __decorate$1 = function(decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param$1 = function(paramIndex, decorator) {
	return function(target, key) {
		decorator(target, key, paramIndex);
	};
};
var MarkerSelectionStatus = class MarkerSelectionStatus$1 extends Disposable {
	static #_ = this.ID = "editor.contrib.markerSelectionStatus";
	constructor(_editor, contextKeyService, _markerService) {
		super();
		this._editor = _editor;
		this._markerService = _markerService;
		this._ctxHasDiagnostics = EditorContextKeys.selectionHasDiagnostics.bindTo(contextKeyService);
		this._store.add(this._editor.onDidChangeCursorSelection(() => this._update()));
		this._store.add(this._editor.onDidChangeModel(() => this._update()));
		this._store.add(this._markerService.onMarkerChanged((e) => {
			const model = this._editor.getModel();
			if (model && e.some((uri) => isEqual(uri, model.uri))) this._update();
		}));
		this._update();
	}
	dispose() {
		this._ctxHasDiagnostics.reset();
		super.dispose();
	}
	_update() {
		const model = this._editor.getModel();
		const selection = this._editor.getSelection();
		if (!model || !selection) {
			this._ctxHasDiagnostics.reset();
			return;
		}
		const hasIntersecting = this._markerService.read({
			resource: model.uri,
			severities: MarkerSeverity.Error | MarkerSeverity.Warning | MarkerSeverity.Info
		}).some((marker) => Range.areIntersecting({
			startLineNumber: marker.startLineNumber,
			startColumn: marker.startColumn,
			endLineNumber: marker.endLineNumber,
			endColumn: marker.endColumn
		}, selection));
		this._ctxHasDiagnostics.set(hasIntersecting);
	}
};
MarkerSelectionStatus = __decorate$1([__param$1(1, IContextKeyService), __param$1(2, IMarkerService)], MarkerSelectionStatus);
registerEditorContribution(MarkerSelectionStatus.ID, MarkerSelectionStatus, 1);
var __decorate = function(decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = function(paramIndex, decorator) {
	return function(target, key) {
		decorator(target, key, paramIndex);
	};
};
var ModelSemanticColoring_1;
var DocumentSemanticTokensFeature = class DocumentSemanticTokensFeature$1 extends Disposable {
	constructor(semanticTokensStylingService, modelService, themeService, configurationService, languageFeatureDebounceService, languageFeaturesService) {
		super();
		this._watchers = new ResourceMap();
		this._providerChangeListeners = this._register(new DisposableStore());
		const provider = languageFeaturesService.documentSemanticTokensProvider;
		const register = (model) => {
			this._watchers.get(model.uri)?.dispose();
			this._watchers.set(model.uri, new ModelSemanticColoring(model, semanticTokensStylingService, themeService, languageFeatureDebounceService, languageFeaturesService));
		};
		const deregister = (model, modelSemanticColoring) => {
			modelSemanticColoring.dispose();
			this._watchers.delete(model.uri);
		};
		const handleSettingOrThemeChange = () => {
			for (const model of modelService.getModels()) {
				const curr = this._watchers.get(model.uri);
				if (isSemanticColoringEnabled(model, themeService, configurationService)) {
					if (!curr) register(model);
				} else if (curr) deregister(model, curr);
			}
		};
		const bindProviderChangeListeners = () => {
			this._providerChangeListeners.clear();
			for (const p of provider.allNoModel()) if (typeof p.onDidChange === "function") this._providerChangeListeners.add(p.onDidChange(() => {
				for (const watcher of this._watchers.values()) watcher.handleProviderDidChange(p);
			}));
		};
		modelService.getModels().forEach((model) => {
			if (isSemanticColoringEnabled(model, themeService, configurationService)) register(model);
		});
		this._register(modelService.onModelAdded((model) => {
			if (isSemanticColoringEnabled(model, themeService, configurationService)) register(model);
		}));
		this._register(modelService.onModelRemoved((model) => {
			const curr = this._watchers.get(model.uri);
			if (curr) deregister(model, curr);
		}));
		this._register(configurationService.onDidChangeConfiguration((e) => {
			if (e.affectsConfiguration("editor.semanticHighlighting")) handleSettingOrThemeChange();
		}));
		this._register(themeService.onDidColorThemeChange(handleSettingOrThemeChange));
		bindProviderChangeListeners();
		this._register(provider.onDidChange(() => {
			bindProviderChangeListeners();
			for (const watcher of this._watchers.values()) watcher.handleRegistryChange();
		}));
	}
	dispose() {
		dispose(this._watchers.values());
		this._watchers.clear();
		super.dispose();
	}
};
DocumentSemanticTokensFeature = __decorate([
	__param(0, ISemanticTokensStylingService),
	__param(1, IModelService),
	__param(2, IThemeService),
	__param(3, IConfigurationService),
	__param(4, ILanguageFeatureDebounceService),
	__param(5, ILanguageFeaturesService)
], DocumentSemanticTokensFeature);
var ModelSemanticColoring = class ModelSemanticColoring$1 extends Disposable {
	static #_ = ModelSemanticColoring_1 = this;
	static #_2 = this.REQUEST_MIN_DELAY = 300;
	static #_3 = this.REQUEST_MAX_DELAY = 2e3;
	constructor(model, _semanticTokensStylingService, themeService, languageFeatureDebounceService, languageFeaturesService) {
		super();
		this._semanticTokensStylingService = _semanticTokensStylingService;
		this._relevantProviders = /* @__PURE__ */ new Set();
		this._isDisposed = false;
		this._model = model;
		this._provider = languageFeaturesService.documentSemanticTokensProvider;
		this._debounceInformation = languageFeatureDebounceService.for(this._provider, "DocumentSemanticTokens", {
			min: ModelSemanticColoring_1.REQUEST_MIN_DELAY,
			max: ModelSemanticColoring_1.REQUEST_MAX_DELAY
		});
		this._fetchDocumentSemanticTokens = this._register(new RunOnceScheduler(() => this._fetchDocumentSemanticTokensNow(), ModelSemanticColoring_1.REQUEST_MIN_DELAY));
		this._currentDocumentResponse = null;
		this._currentDocumentRequestCancellationTokenSource = null;
		this._providersChangedDuringRequest = false;
		this._updateRelevantProviders();
		this._register(this._model.onDidChangeContent(() => {
			if (!this._fetchDocumentSemanticTokens.isScheduled()) this._fetchDocumentSemanticTokens.schedule(this._debounceInformation.get(this._model));
		}));
		this._register(this._model.onDidChangeAttached(() => {
			if (!this._fetchDocumentSemanticTokens.isScheduled()) this._fetchDocumentSemanticTokens.schedule(this._debounceInformation.get(this._model));
		}));
		this._register(this._model.onDidChangeLanguage(() => {
			if (this._currentDocumentResponse) {
				this._currentDocumentResponse.dispose();
				this._currentDocumentResponse = null;
			}
			if (this._currentDocumentRequestCancellationTokenSource) {
				this._currentDocumentRequestCancellationTokenSource.cancel();
				this._currentDocumentRequestCancellationTokenSource = null;
			}
			this._setDocumentSemanticTokens(null, null, null, []);
			this._updateRelevantProviders();
			this._fetchDocumentSemanticTokens.schedule(0);
		}));
		this._register(themeService.onDidColorThemeChange((_) => {
			this._setDocumentSemanticTokens(null, null, null, []);
			this._fetchDocumentSemanticTokens.schedule(this._debounceInformation.get(this._model));
		}));
		this._fetchDocumentSemanticTokens.schedule(0);
	}
	handleRegistryChange() {
		this._updateRelevantProviders();
		this._fetchDocumentSemanticTokens.schedule(this._debounceInformation.get(this._model));
	}
	handleProviderDidChange(provider) {
		if (!this._relevantProviders.has(provider)) return;
		if (this._currentDocumentRequestCancellationTokenSource) {
			this._providersChangedDuringRequest = true;
			return;
		}
		this._fetchDocumentSemanticTokens.schedule(0);
	}
	_updateRelevantProviders() {
		this._relevantProviders = new Set(this._provider.all(this._model));
	}
	dispose() {
		if (this._currentDocumentResponse) {
			this._currentDocumentResponse.dispose();
			this._currentDocumentResponse = null;
		}
		if (this._currentDocumentRequestCancellationTokenSource) {
			this._currentDocumentRequestCancellationTokenSource.cancel();
			this._currentDocumentRequestCancellationTokenSource = null;
		}
		this._setDocumentSemanticTokens(null, null, null, []);
		this._isDisposed = true;
		super.dispose();
	}
	_fetchDocumentSemanticTokensNow() {
		if (this._currentDocumentRequestCancellationTokenSource) return;
		if (!hasDocumentSemanticTokensProvider(this._provider, this._model)) {
			if (this._currentDocumentResponse) this._model.tokenization.setSemanticTokens(null, false);
			return;
		}
		if (!this._model.isAttachedToEditor()) return;
		const cancellationTokenSource = new CancellationTokenSource();
		const lastProvider = this._currentDocumentResponse ? this._currentDocumentResponse.provider : null;
		const lastResultId = this._currentDocumentResponse ? this._currentDocumentResponse.resultId || null : null;
		const request = getDocumentSemanticTokens(this._provider, this._model, lastProvider, lastResultId, cancellationTokenSource.token);
		this._currentDocumentRequestCancellationTokenSource = cancellationTokenSource;
		this._providersChangedDuringRequest = false;
		const pendingChanges = [];
		const contentChangeListener = this._model.onDidChangeContent((e) => {
			pendingChanges.push(e);
		});
		const sw = new StopWatch(false);
		request.then((res) => {
			this._debounceInformation.update(this._model, sw.elapsed());
			this._currentDocumentRequestCancellationTokenSource = null;
			contentChangeListener.dispose();
			if (!res) this._setDocumentSemanticTokens(null, null, null, pendingChanges);
			else {
				const { provider, tokens } = res;
				const styling = this._semanticTokensStylingService.getStyling(provider);
				this._setDocumentSemanticTokens(provider, tokens || null, styling, pendingChanges);
			}
		}, (err) => {
			if (!(err && (isCancellationError(err) || typeof err.message === "string" && err.message.indexOf("busy") !== -1))) onUnexpectedError(err);
			this._currentDocumentRequestCancellationTokenSource = null;
			contentChangeListener.dispose();
			if (pendingChanges.length > 0 || this._providersChangedDuringRequest) {
				if (!this._fetchDocumentSemanticTokens.isScheduled()) this._fetchDocumentSemanticTokens.schedule(this._debounceInformation.get(this._model));
			}
		});
	}
	static _copy(src, srcOffset, dest, destOffset, length) {
		length = Math.min(length, dest.length - destOffset, src.length - srcOffset);
		for (let i = 0; i < length; i++) dest[destOffset + i] = src[srcOffset + i];
	}
	_setDocumentSemanticTokens(provider, tokens, styling, pendingChanges) {
		const currentResponse = this._currentDocumentResponse;
		const rescheduleIfNeeded = () => {
			if ((pendingChanges.length > 0 || this._providersChangedDuringRequest) && !this._fetchDocumentSemanticTokens.isScheduled()) this._fetchDocumentSemanticTokens.schedule(this._debounceInformation.get(this._model));
		};
		if (this._currentDocumentResponse) {
			this._currentDocumentResponse.dispose();
			this._currentDocumentResponse = null;
		}
		if (this._isDisposed) {
			if (provider && tokens) provider.releaseDocumentSemanticTokens(tokens.resultId);
			return;
		}
		if (!provider || !styling) {
			this._model.tokenization.setSemanticTokens(null, false);
			return;
		}
		if (!tokens) {
			this._model.tokenization.setSemanticTokens(null, true);
			rescheduleIfNeeded();
			return;
		}
		if (isSemanticTokensEdits(tokens)) {
			const resultId = tokens.resultId;
			const rejectInvalidEdits = (requestFullRefresh) => {
				provider.releaseDocumentSemanticTokens(resultId);
				this._model.tokenization.setSemanticTokens(null, true);
				if (requestFullRefresh) this._fetchDocumentSemanticTokens.schedule(0);
			};
			if (!currentResponse) {
				rejectInvalidEdits(false);
				return;
			}
			if (tokens.edits.length === 0) tokens = {
				resultId: tokens.resultId,
				data: currentResponse.data
			};
			else {
				let deltaLength = 0;
				for (const edit of tokens.edits) deltaLength += (edit.data ? edit.data.length : 0) - edit.deleteCount;
				const srcData = currentResponse.data;
				const destDataLength = srcData.length + deltaLength;
				if (destDataLength < 0) {
					styling.warnInvalidEditDeleteCount(currentResponse.resultId, resultId, srcData.length, deltaLength);
					rejectInvalidEdits(true);
					return;
				}
				const destData = new Uint32Array(destDataLength);
				let srcLastStart = srcData.length;
				let destLastStart = destData.length;
				for (let i = tokens.edits.length - 1; i >= 0; i--) {
					const edit = tokens.edits[i];
					if (edit.start > srcData.length) {
						styling.warnInvalidEditStart(currentResponse.resultId, resultId, i, edit.start, srcData.length);
						rejectInvalidEdits(true);
						return;
					}
					const copyCount = srcLastStart - (edit.start + edit.deleteCount);
					if (copyCount > 0) {
						ModelSemanticColoring_1._copy(srcData, srcLastStart - copyCount, destData, destLastStart - copyCount, copyCount);
						destLastStart -= copyCount;
					}
					if (edit.data) {
						ModelSemanticColoring_1._copy(edit.data, 0, destData, destLastStart - edit.data.length, edit.data.length);
						destLastStart -= edit.data.length;
					}
					srcLastStart = edit.start;
				}
				if (srcLastStart > 0) ModelSemanticColoring_1._copy(srcData, 0, destData, 0, srcLastStart);
				tokens = {
					resultId: tokens.resultId,
					data: destData
				};
			}
		}
		if (isSemanticTokens(tokens)) {
			this._currentDocumentResponse = new SemanticTokensResponse(provider, tokens.resultId, tokens.data);
			const result = toMultilineTokens2(tokens, styling, this._model.getLanguageId());
			if (pendingChanges.length > 0) for (const change of pendingChanges) for (const area of result) for (const singleChange of change.changes) area.applyEdit(singleChange.range, singleChange.text);
			this._model.tokenization.setSemanticTokens(result, true);
		} else this._model.tokenization.setSemanticTokens(null, true);
		rescheduleIfNeeded();
	}
};
ModelSemanticColoring = ModelSemanticColoring_1 = __decorate([
	__param(1, ISemanticTokensStylingService),
	__param(2, IThemeService),
	__param(3, ILanguageFeatureDebounceService),
	__param(4, ILanguageFeaturesService)
], ModelSemanticColoring);
var SemanticTokensResponse = class {
	constructor(provider, resultId, data) {
		this.provider = provider;
		this.resultId = resultId;
		this.data = data;
	}
	dispose() {
		this.provider.releaseDocumentSemanticTokens(this.resultId);
	}
};
registerEditorFeature(DocumentSemanticTokensFeature);
function createTrustedTypesPolicy(policyName, policyOptions) {
	const monacoEnvironment = globalThis.MonacoEnvironment;
	if (monacoEnvironment?.createTrustedTypesPolicy) try {
		return monacoEnvironment.createTrustedTypesPolicy(policyName, policyOptions);
	} catch (err) {
		console.error(err);
		return;
	}
	try {
		return globalThis.trustedTypes?.createPolicy(policyName, policyOptions);
	} catch (err) {
		console.error(err);
		return;
	}
}
var ttPolicy;
if (typeof self === "object" && self.constructor && self.constructor.name === "DedicatedWorkerGlobalScope" && globalThis.workerttPolicy !== void 0) ttPolicy = globalThis.workerttPolicy;
else ttPolicy = createTrustedTypesPolicy("defaultWorkerFactory", { createScriptURL: (value) => value });
function getWorker(descriptor) {
	const label = descriptor.label;
	const monacoEnvironment = globalThis.MonacoEnvironment;
	if (monacoEnvironment) {
		if (typeof monacoEnvironment.getWorker === "function") return monacoEnvironment.getWorker("workerMain.js", label);
		if (typeof monacoEnvironment.getWorkerUrl === "function") {
			const workerUrl = monacoEnvironment.getWorkerUrl("workerMain.js", label);
			return new Worker(ttPolicy ? ttPolicy.createScriptURL(workerUrl) : workerUrl, {
				name: label,
				type: "module"
			});
		}
	}
	if (descriptor.createWorker) return descriptor.createWorker();
	throw new Error(`You must define a function MonacoEnvironment.getWorkerUrl or MonacoEnvironment.getWorker`);
}
function createWebWorker(opts) {
	const worker = Promise.resolve(getWorker({
		label: opts.label ?? "monaco-editor-worker",
		moduleId: opts.moduleId,
		createWorker: opts.createWorker
	})).then((w) => {
		w.postMessage("ignore");
		w.postMessage(opts.createData);
		return w;
	});
	return editor.createWebWorker({
		worker,
		host: opts.host,
		keepIdleModels: opts.keepIdleModels
	});
}
export { createWebWorker as t };
