var REPORT_OVER_MS = 1e3;
var MIN_GAP_MS = 6e4;
var MAX_DETAIL = 200;
function fileOf(url) {
	if (!url) return "";
	return (url.split(/[?#]/)[0].split("/").pop() || "").slice(0, 60);
}
function describeLoaf(entry) {
	const parts = [];
	const scripts = [...entry.scripts ?? []].sort((a, b) => (b.duration ?? 0) - (a.duration ?? 0));
	const worst = scripts[0];
	if (worst) {
		const where = [worst.sourceFunctionName, fileOf(worst.sourceURL)].filter(Boolean).join("@");
		parts.push(`script=${where || "anonymous"} ${Math.round(worst.duration ?? 0)}ms`);
		if (worst.invokerType) parts.push(`via=${worst.invokerType}`);
		const forced = Math.round(worst.forcedStyleAndLayoutDuration ?? 0);
		if (forced > 0) parts.push(`forced-layout=${forced}ms`);
		if (scripts.length > 1) parts.push(`+${scripts.length - 1}more`);
	}
	const { startTime, duration, renderStart, styleAndLayoutStart } = entry;
	if (renderStart) {
		parts.push(`work=${Math.round(renderStart - startTime)}ms`);
		const renderEnd = startTime + duration;
		if (styleAndLayoutStart) {
			parts.push(`render=${Math.round(styleAndLayoutStart - renderStart)}ms`);
			parts.push(`layout=${Math.round(renderEnd - styleAndLayoutStart)}ms`);
		} else parts.push(`render=${Math.round(renderEnd - renderStart)}ms`);
	}
	if (entry.blockingDuration) parts.push(`blocking=${Math.round(entry.blockingDuration)}ms`);
	return parts.join(" ").slice(0, MAX_DETAIL);
}
function describe(entry) {
	if (entry.entryType === "long-animation-frame") return describeLoaf(entry);
	const attribution = entry.attribution;
	if (!attribution?.length) return "";
	const first = attribution[0];
	return [
		first.name,
		first.containerType,
		first.containerName
	].filter(Boolean).join("/").slice(0, 120);
}
function paneCount() {
	try {
		return document.querySelectorAll("[data-testid^='agentic-terminal-host-']").length;
	} catch {
		return 0;
	}
}
function watchUiStalls(report) {
	if (typeof PerformanceObserver === "undefined") return () => {};
	let lastReportAt = 0;
	let observer;
	try {
		observer = new PerformanceObserver((list) => {
			const blocking = list.getEntries().filter((e) => e.duration >= REPORT_OVER_MS);
			if (!blocking.length) return;
			const now = Date.now();
			if (now - lastReportAt < MIN_GAP_MS) return;
			const best = blocking.sort((a, b) => {
				const named = Number(b.entryType === "long-animation-frame") - Number(a.entryType === "long-animation-frame");
				return named !== 0 ? named : b.duration - a.duration;
			})[0];
			lastReportAt = now;
			report({
				blocked_ms: Math.round(best.duration),
				at: (location.hash || location.pathname || "").slice(0, 60),
				panes: paneCount(),
				detail: describe(best)
			});
		});
		let watching = 0;
		for (const type of ["long-animation-frame", "longtask"]) try {
			observer.observe({
				type,
				buffered: true
			});
			watching += 1;
		} catch {}
		if (watching === 0) throw new TypeError("no supported stall entry type");
	} catch {
		return () => {};
	}
	return () => {
		try {
			observer.disconnect();
		} catch {}
	};
}
export { watchUiStalls };
