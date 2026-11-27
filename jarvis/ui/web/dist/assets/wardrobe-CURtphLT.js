import { o as CATALOG } from "./figureRecipe-BRnaWN-p.js";
import { f as toyLookFor, m as OUTFITS, n as HAIR_STYLES, u as hashString } from "./toyFigureModel-CWYjWDfN.js";
var STORAGE_KEY = "jarvis.office.player.v1";
function playerRecipe(profile) {
	const recipe = {
		...profile.recipe,
		outfit: profile.recipe.outfit ?? "tee"
	};
	return profile.hairStyle ? {
		...recipe,
		hairStyle: profile.hairStyle
	} : recipe;
}
function playerLook(profile) {
	return toyLookFor(playerRecipe(profile), "office-player");
}
const WARDROBE_BASES = CATALOG.bases.filter((b) => b.archetype === "biped" && !b.styles.includes("custom")).map((b) => b.base);
function defaultProfile() {
	return {
		name: "",
		recipe: {
			contract: 1,
			archetype: "biped",
			base: WARDROBE_BASES.includes("toon") ? "toon" : WARDROBE_BASES[0] ?? "chibi",
			parts: {},
			palette: {
				primary: "#3f9d5a",
				secondary: "#2b4a8b",
				hair: "#6b3f2a",
				shoes: "#f2f2ee"
			}
		}
	};
}
function isRecipe(value) {
	const r = value;
	return !!r && r.contract === 1 && r.archetype === "biped" && typeof r.base === "string" && WARDROBE_BASES.includes(r.base) && typeof r.parts === "object" && r.parts !== null;
}
function loadProfile() {
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return defaultProfile();
		const parsed = JSON.parse(raw);
		const fallback = defaultProfile();
		return {
			name: typeof parsed.name === "string" ? parsed.name.slice(0, 40) : fallback.name,
			recipe: isRecipe(parsed.recipe) ? parsed.recipe : fallback.recipe,
			hairStyle: HAIR_STYLES.includes(parsed.hairStyle) ? parsed.hairStyle : void 0
		};
	} catch (error) {
		console.debug("Office player profile unavailable", error);
		return defaultProfile();
	}
}
function saveProfile(profile) {
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
	} catch (error) {
		console.debug("Office player profile not saved", error);
	}
}
const HAIR_COLOURS = [
	"#1d1d24",
	"#2a1d15",
	"#4a3020",
	"#6b4226",
	"#9e5d47",
	"#c0392b",
	"#d9b36c",
	"#e8dcc0",
	"#8a8d93",
	"#d6d6d6"
];
function outfitById(id) {
	return OUTFITS.find((o) => o.id === id) ?? OUTFITS[OUTFITS.length - 1];
}
function dressIn(recipe, outfit, colourwayIndex = 0) {
	const look = toyLookFor(recipe, "");
	const ways = outfitById(outfit).colourways;
	const way = ways[(colourwayIndex % ways.length + ways.length) % ways.length];
	return {
		...recipe,
		outfit,
		inner: way.inner,
		hairStyle: look.hairStyle,
		palette: {
			...recipe.palette,
			primary: way.primary,
			secondary: way.secondary,
			accent: way.accent,
			shoes: way.shoes
		}
	};
}
function colourwayIndexOf(recipe) {
	const look = toyLookFor(recipe, "");
	const same = (a, b) => a.toLowerCase() === b.toLowerCase();
	return outfitById(look.outfit).colourways.findIndex((w) => same(w.primary, look.shirt) && same(w.secondary, look.pants) && same(w.accent, look.shirtAccent) && same(w.inner, look.inner) && same(w.shoes, look.shoes));
}
function pinLook(recipe) {
	const look = toyLookFor(recipe, "");
	if (recipe.outfit === look.outfit) return {
		...recipe,
		hairStyle: look.hairStyle
	};
	return {
		...recipe,
		outfit: look.outfit,
		inner: look.inner,
		hairStyle: look.hairStyle,
		palette: {
			...recipe.palette,
			primary: look.shirt,
			secondary: look.pants,
			accent: look.shirtAccent,
			shoes: look.shoes
		}
	};
}
function withHair(recipe, hairStyle) {
	return {
		...recipe,
		hairStyle
	};
}
function withHairColour(recipe, hair) {
	const pinned = pinLook(recipe);
	return {
		...pinned,
		palette: {
			...pinned.palette,
			hair
		}
	};
}
function withSkin(recipe, skin) {
	const pinned = pinLook(recipe);
	return {
		...pinned,
		palette: {
			...pinned.palette,
			skin
		}
	};
}
function withEyewear(recipe, eyewear) {
	return {
		...recipe,
		eyewear
	};
}
function randomLook(recipe, seed) {
	const h = hashString(seed);
	const at = (list, salt) => list[(Math.imul(h ^ salt, 2654435761) >>> 0) % list.length];
	const outfit = at(OUTFITS, 17);
	const hairStyles = [
		"short",
		"slick",
		"sidepart",
		"buzz",
		"curly",
		"long",
		"ponytail",
		"bun",
		"spiky"
	];
	const dressed = dressIn(recipe, outfit.id, (h >>> 8) % outfit.colourways.length);
	const eyewear = at([
		"none",
		"none",
		"none",
		"glasses",
		"shades"
	], 51);
	return {
		...dressed,
		hairStyle: at(hairStyles, 34),
		eyewear,
		palette: {
			...dressed.palette,
			hair: at(HAIR_COLOURS, 68)
		}
	};
}
export { pinLook as a, withHair as c, loadProfile as d, playerLook as f, outfitById as i, withHairColour as l, saveProfile as m, colourwayIndexOf as n, randomLook as o, playerRecipe as p, dressIn as r, withEyewear as s, HAIR_COLOURS as t, withSkin as u };
