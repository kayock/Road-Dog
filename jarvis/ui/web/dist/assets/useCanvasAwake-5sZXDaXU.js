import { Xc as require_react, tl as __toESM } from "./index-BOzhgzD7.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
const CanvasActivity = (0, import_react.createContext)(true);
function useCanvasAwake(hostRef) {
	const active = (0, import_react.useContext)(CanvasActivity);
	const [awake, setAwake] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const host = hostRef.current;
		if (!host) return;
		if (typeof IntersectionObserver === "undefined") return;
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) setAwake(entry.isIntersecting);
		}, { threshold: .05 });
		observer.observe(host);
		return () => observer.disconnect();
	}, [hostRef]);
	return active && awake;
}
export { useCanvasAwake as n, CanvasActivity as t };
