const NATIVE_DROP_EVENT = "jarvis-native-drop";
var NATIVE_DROP_TIMEOUT_MS = 2e3;
function inDesktopShell() {
	const host = window;
	return Boolean(host.__JARVIS_EMBEDDED_DESKTOP || host.pywebview);
}
function waitForNativeDrop(opts = {}) {
	if (!inDesktopShell()) return Promise.resolve(null);
	const timeoutMs = opts.timeoutMs ?? NATIVE_DROP_TIMEOUT_MS;
	return new Promise((resolve) => {
		let timer;
		const onEvent = (event) => {
			const detail = event.detail;
			const paths = Array.isArray(detail?.paths) ? detail.paths : [];
			const names = Array.isArray(detail?.names) ? detail.names : [];
			if (paths.length === 0) return;
			if (opts.name && names.length > 0 && !names.includes(opts.name)) return;
			window.removeEventListener(NATIVE_DROP_EVENT, onEvent);
			if (timer !== void 0) window.clearTimeout(timer);
			resolve({
				paths,
				names
			});
		};
		window.addEventListener(NATIVE_DROP_EVENT, onEvent);
		timer = window.setTimeout(() => {
			window.removeEventListener(NATIVE_DROP_EVENT, onEvent);
			resolve(null);
		}, timeoutMs);
	});
}
export { waitForNativeDrop as n, inDesktopShell as t };
