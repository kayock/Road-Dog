const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/neonSnake-Bvqq90EY.js","assets/games1Kit-CBZSeRQO.js","assets/brickBreaker-D1EMnElq.js","assets/paddleDuel-BMz9vrwW.js","assets/retroGame-GmSLy6cP.js","assets/blockDrop-MReJRN96.js","assets/games2Kit-Bo4ay0BU.js","assets/mazeMuncher-BMqIbzpJ.js","assets/desertDash-D8LcepuG.js","assets/pixelRaiders-BwDJR-17.js","assets/games3Kit-Cb6PLO-y.js","assets/roadHopper-6j7-7e08.js","assets/cityDefense-CTDFDVqL.js"])))=>i.map(i=>d[i]);
import { cc as __vitePreload } from "./index-BOzhgzD7.js";
const ARCADE_GAMES = [
	{
		id: "asteroid-run",
		title: "Asteroid Run",
		key: "asteroid_run",
		kind: "asteroid3d",
		look: {
			body: "#1d1a3a",
			trim: "#0e0c1f",
			marquee: "#120f2a",
			marqueeText: "#facc15",
			accent: "#2dff5a"
		}
	},
	{
		id: "neon-snake",
		title: "Neon Snake",
		key: "neon_snake",
		kind: "retro",
		look: {
			body: "#0f2a1e",
			trim: "#08140e",
			marquee: "#06180f",
			marqueeText: "#5dff9c",
			accent: "#22e07a"
		}
	},
	{
		id: "brick-breaker",
		title: "Brick Breaker",
		key: "brick_breaker",
		kind: "retro",
		look: {
			body: "#3a1420",
			trim: "#1c0910",
			marquee: "#22070f",
			marqueeText: "#ff7aa8",
			accent: "#ff3d7f"
		}
	},
	{
		id: "paddle-duel",
		title: "Paddle Duel",
		key: "paddle_duel",
		kind: "retro",
		look: {
			body: "#e8e4d8",
			trim: "#2a2a2e",
			marquee: "#151518",
			marqueeText: "#f5f5f0",
			accent: "#9aa3ff"
		}
	},
	{
		id: "block-drop",
		title: "Block Drop",
		key: "block_drop",
		kind: "retro",
		look: {
			body: "#14224a",
			trim: "#0a1126",
			marquee: "#0b1433",
			marqueeText: "#7cc4ff",
			accent: "#3fa2ff"
		}
	},
	{
		id: "maze-muncher",
		title: "Maze Muncher",
		key: "maze_muncher",
		kind: "retro",
		look: {
			body: "#2b1f05",
			trim: "#120d02",
			marquee: "#100c02",
			marqueeText: "#ffd23f",
			accent: "#ffb800"
		}
	},
	{
		id: "desert-dash",
		title: "Desert Dash",
		key: "desert_dash",
		kind: "retro",
		look: {
			body: "#5a3416",
			trim: "#2a180a",
			marquee: "#2b1607",
			marqueeText: "#ffb36b",
			accent: "#ff8a3d"
		}
	},
	{
		id: "pixel-raiders",
		title: "Pixel Raiders",
		key: "pixel_raiders",
		kind: "retro",
		look: {
			body: "#1a1035",
			trim: "#0c0719",
			marquee: "#0d0820",
			marqueeText: "#c58bff",
			accent: "#a855f7"
		}
	},
	{
		id: "road-hopper",
		title: "Road Hopper",
		key: "road_hopper",
		kind: "retro",
		look: {
			body: "#123a2e",
			trim: "#081a14",
			marquee: "#071b14",
			marqueeText: "#b6f36b",
			accent: "#7ed957"
		}
	},
	{
		id: "city-defense",
		title: "City Defense",
		key: "city_defense",
		kind: "retro",
		look: {
			body: "#3b0d0d",
			trim: "#1a0505",
			marquee: "#1c0404",
			marqueeText: "#ffcf5a",
			accent: "#ff4b2b"
		}
	}
];
var BY_ID = new Map(ARCADE_GAMES.map((g) => [g.id, g]));
function gameForCabinet(furnitureId) {
	return furnitureId.startsWith("cabinet-") ? BY_ID.get(furnitureId.slice(8)) ?? null : null;
}
function arcadeGame(id) {
	return BY_ID.get(id) ?? null;
}
const CABINET_PREFIX = "cabinet-";
function cabinetId(game) {
	return CABINET_PREFIX + game;
}
var LOADERS = {
	"neon-snake": () => __vitePreload(() => import("./neonSnake-Bvqq90EY.js"), __vite__mapDeps([0,1])),
	"brick-breaker": () => __vitePreload(() => import("./brickBreaker-D1EMnElq.js"), __vite__mapDeps([2,1])),
	"paddle-duel": () => __vitePreload(() => import("./paddleDuel-BMz9vrwW.js"), __vite__mapDeps([3,1,4])),
	"block-drop": () => __vitePreload(() => import("./blockDrop-MReJRN96.js"), __vite__mapDeps([5,6,4])),
	"maze-muncher": () => __vitePreload(() => import("./mazeMuncher-BMqIbzpJ.js"), __vite__mapDeps([7,6,4])),
	"desert-dash": () => __vitePreload(() => import("./desertDash-D8LcepuG.js"), __vite__mapDeps([8,6,4])),
	"pixel-raiders": () => __vitePreload(() => import("./pixelRaiders-BwDJR-17.js"), __vite__mapDeps([9,10])),
	"road-hopper": () => __vitePreload(() => import("./roadHopper-6j7-7e08.js"), __vite__mapDeps([11,10])),
	"city-defense": () => __vitePreload(() => import("./cityDefense-CTDFDVqL.js"), __vite__mapDeps([12,10]))
};
var loaded = /* @__PURE__ */ new Map();
function loadRetroGame(id) {
	let pending = loaded.get(id);
	if (!pending) {
		pending = LOADERS[id]().then((m) => m.default);
		pending.catch(() => loaded.delete(id));
		loaded.set(id, pending);
	}
	return pending;
}
export { loadRetroGame as a, gameForCabinet as i, arcadeGame as n, cabinetId as r, ARCADE_GAMES as t };
