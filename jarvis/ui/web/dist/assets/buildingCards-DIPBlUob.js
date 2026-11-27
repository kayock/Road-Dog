const BUILDING_CARDS = {
	plugins: {
		place: "plugins",
		model: "plugin-docks",
		nameKey: "place_plugins",
		taglineKey: "drawer_plugins_hint",
		doesKey: "card_plugins_does",
		howKey: "card_plugins_how",
		section: "plugins",
		hub: "plugins"
	},
	foundry: {
		place: "foundry",
		model: "agent-foundry",
		nameKey: "place_foundry",
		taglineKey: "drawer_foundry_hint",
		doesKey: "card_foundry_does",
		howKey: "card_foundry_how",
		section: "agents",
		hub: null,
		builds: true
	},
	skills: {
		place: "skills",
		model: "skill-forge",
		nameKey: "place_skills",
		taglineKey: "drawer_skills_hint",
		doesKey: "card_skills_does",
		howKey: "card_skills_how",
		section: "skills",
		hub: "skills"
	},
	mcp: {
		place: "mcp",
		model: "relay-tower",
		nameKey: "place_mcp",
		taglineKey: "drawer_mcp_hint",
		doesKey: "card_mcp_does",
		howKey: "card_mcp_how",
		section: "mcps",
		hub: "mcp"
	},
	cli: {
		place: "cli",
		model: "terminal-cantina",
		nameKey: "place_cli",
		taglineKey: "drawer_cli_hint",
		doesKey: "card_cli_does",
		howKey: "card_cli_how",
		section: "clis",
		hub: "cli"
	},
	comms: {
		place: "comms",
		model: "signal-office",
		nameKey: "place_comms",
		taglineKey: "drawer_comms_hint",
		doesKey: "card_comms_does",
		howKey: "card_comms_how",
		section: null,
		hub: "comms"
	},
	desktop: {
		place: "desktop",
		model: "control-room",
		nameKey: "place_desktop",
		taglineKey: "drawer_desktop_hint",
		doesKey: "card_desktop_does",
		howKey: "card_desktop_how",
		section: "settings",
		hub: "desktop"
	},
	web: {
		place: "web",
		model: "observatory",
		nameKey: "place_web",
		taglineKey: "drawer_web_hint",
		doesKey: "card_web_does",
		howKey: "card_web_how",
		section: null,
		hub: "web"
	},
	models: {
		place: "models",
		model: "model-boilerhouse",
		nameKey: "place_models",
		taglineKey: "drawer_models_hint",
		doesKey: "card_models_does",
		howKey: "card_models_how",
		section: null,
		hub: null
	},
	civic: {
		place: "civic",
		model: "town-hall",
		nameKey: "place_civic",
		taglineKey: "drawer_civic_hint",
		doesKey: "card_civic_does",
		howKey: "card_civic_how",
		section: "board",
		hub: null
	},
	gallery: {
		place: "gallery",
		model: "gallery-hall",
		nameKey: "place_gallery",
		taglineKey: "drawer_gallery_hint",
		doesKey: "card_gallery_does",
		howKey: "card_gallery_how",
		section: "visualization",
		hub: null
	},
	archive: {
		place: "archive",
		model: "memory-house",
		nameKey: "place_archive",
		taglineKey: "drawer_memory_hint",
		doesKey: "card_archive_does",
		howKey: "card_archive_how",
		section: "memory",
		hub: null
	}
};
function isBuildingPlace(place) {
	return place in BUILDING_CARDS;
}
export { isBuildingPlace as n, BUILDING_CARDS as t };
