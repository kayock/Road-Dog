const SLOTS = [
	"uniform",
	"headwear",
	"decoration"
];
const REWARD_IDS = [
	"uniform_service_shirt",
	"uniform_field_jacket",
	"uniform_service_greens",
	"uniform_dress_blues",
	"uniform_mess_dress",
	"headwear_patrol_cap",
	"headwear_garrison_cap",
	"headwear_beret",
	"headwear_service_cap",
	"decoration_ribbon_bar",
	"decoration_ribbon_rack",
	"decoration_aiguillette",
	"decoration_medals"
];
const TITLE_IDS = [
	"private",
	"private_second_class",
	"private_first_class",
	"specialist",
	"corporal",
	"sergeant",
	"staff_sergeant",
	"sergeant_first_class",
	"master_sergeant",
	"first_sergeant",
	"sergeant_major",
	"command_sergeant_major",
	"sergeant_major_of_the_army",
	"second_lieutenant",
	"first_lieutenant",
	"captain",
	"major",
	"lieutenant_colonel",
	"colonel",
	"brigadier_general",
	"major_general",
	"lieutenant_general",
	"general",
	"general_of_the_army"
];
const RANK_INFO = {
	private: {
		grade: "E-1",
		tier: "enlisted"
	},
	private_second_class: {
		grade: "E-2",
		tier: "enlisted"
	},
	private_first_class: {
		grade: "E-3",
		tier: "enlisted"
	},
	specialist: {
		grade: "E-4",
		tier: "enlisted"
	},
	corporal: {
		grade: "E-4",
		tier: "nco"
	},
	sergeant: {
		grade: "E-5",
		tier: "nco"
	},
	staff_sergeant: {
		grade: "E-6",
		tier: "nco"
	},
	sergeant_first_class: {
		grade: "E-7",
		tier: "nco"
	},
	master_sergeant: {
		grade: "E-8",
		tier: "nco"
	},
	first_sergeant: {
		grade: "E-8",
		tier: "nco"
	},
	sergeant_major: {
		grade: "E-9",
		tier: "nco"
	},
	command_sergeant_major: {
		grade: "E-9",
		tier: "nco"
	},
	sergeant_major_of_the_army: {
		grade: "E-9",
		tier: "nco"
	},
	second_lieutenant: {
		grade: "O-1",
		tier: "officer"
	},
	first_lieutenant: {
		grade: "O-2",
		tier: "officer"
	},
	captain: {
		grade: "O-3",
		tier: "officer"
	},
	major: {
		grade: "O-4",
		tier: "officer"
	},
	lieutenant_colonel: {
		grade: "O-5",
		tier: "officer"
	},
	colonel: {
		grade: "O-6",
		tier: "officer"
	},
	brigadier_general: {
		grade: "O-7",
		tier: "general"
	},
	major_general: {
		grade: "O-8",
		tier: "general"
	},
	lieutenant_general: {
		grade: "O-9",
		tier: "general"
	},
	general: {
		grade: "O-10",
		tier: "general"
	},
	general_of_the_army: {
		grade: "O-11",
		tier: "general"
	}
};
function isRankId(value) {
	return typeof value === "string" && value in RANK_INFO;
}
function rankOf(title) {
	return isRankId(title) ? title : "private";
}
function rankAt(bands, level) {
	let rank = "private";
	for (const band of bands ?? []) if (level >= band.level && isRankId(band.title)) rank = band.title;
	return rank;
}
function slotOf(reward) {
	return reward.slice(0, reward.indexOf("_"));
}
function isRewardId(value) {
	return typeof value === "string" && REWARD_IDS.includes(value);
}
var num = (value, fallback = 0) => typeof value === "number" && Number.isFinite(value) ? value : fallback;
var str = (value) => typeof value === "string" ? value : "";
var kindOf = (value) => value === "agent" || value === "pet" ? value : "person";
function parseSnapshot(body) {
	const list = (value) => Array.isArray(value) ? value.filter((v) => !!v && typeof v === "object") : [];
	const titles = body.titles && typeof body.titles === "object" ? body.titles : {};
	const bands = (kind) => list(titles[kind]).map((b) => ({
		level: num(b.level, 1),
		title: str(b.title)
	}));
	return {
		subjects: list(body.subjects).map((row) => ({
			subjectId: str(row.subject_id),
			kind: kindOf(row.kind),
			xp: num(row.xp),
			level: num(row.level, 1),
			xpIntoLevel: num(row.xp_into_level),
			xpForNext: num(row.xp_for_next),
			title: str(row.title)
		})),
		petId: str(body.pet_id) || "gigi",
		recent: list(body.recent).map((row) => ({
			seq: num(row.seq),
			subjectId: str(row.subject_id),
			kind: kindOf(row.kind),
			source: str(row.source),
			xp: num(row.xp),
			levelBefore: num(row.level_before, 1),
			levelAfter: num(row.level_after, 1),
			tsMs: num(row.ts_ms)
		})),
		latestSeq: num(body.latest_seq),
		maxLevel: num(body.max_level, 50),
		levelXp: Array.isArray(body.level_xp) ? body.level_xp.map((v) => num(v)) : [0],
		rules: list(body.rules).map((row) => ({
			source: str(row.source),
			kind: kindOf(row.kind),
			xp: num(row.xp),
			trigger: row.trigger === "world" ? "world" : "server",
			cooldownS: num(row.cooldown_s),
			dailyCap: num(row.daily_cap)
		})),
		rewards: list(body.rewards).filter((row) => isRewardId(row.reward_id)).map((row) => {
			const levels = row.levels && typeof row.levels === "object" ? row.levels : {};
			const at = (kind) => typeof levels[kind] === "number" ? levels[kind] : null;
			return {
				rewardId: row.reward_id,
				slot: str(row.slot),
				levels: {
					person: at("person"),
					agent: at("agent"),
					pet: at("pet")
				}
			};
		}),
		titles: {
			person: bands("person"),
			agent: bands("agent"),
			pet: bands("pet")
		},
		looks: Object.fromEntries(list(body.looks).filter((row) => str(row.look_id)).map((row) => [str(row.look_id), num(row.agent, 1)]))
	};
}
function parseAwardEvent(payload) {
	if (!payload || typeof payload !== "object") return null;
	const p = payload;
	const subjectId = str(p.subject_id);
	if (!subjectId) return null;
	return {
		seq: num(p.seq),
		subjectId,
		kind: kindOf(p.subject_kind),
		source: str(p.xp_source),
		xp: num(p.xp),
		totalXp: num(p.total_xp),
		level: num(p.level, 1),
		previousLevel: num(p.previous_level, 1),
		title: str(p.title),
		unlocked: Array.isArray(p.unlocked) ? p.unlocked.filter(isRewardId) : [],
		unlockedLooks: Array.isArray(p.unlocked_looks) ? p.unlocked_looks.filter((v) => typeof v === "string") : []
	};
}
async function fetchProgression(afterSeq = 0) {
	const res = await fetch(`/api/progression${afterSeq > 0 ? `?after_seq=${afterSeq}` : ""}`);
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return parseSnapshot(await res.json());
}
async function reportWorldAction(action, ref = "") {
	try {
		await fetch("/api/progression/actions", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				action,
				ref
			})
		});
	} catch (error) {
		console.debug("Level action not reported", action, error);
	}
}
const agentSubject = (agentId) => `agent:${agentId}`;
const petSubject = (petId) => `pet:${petId}`;
const PERSON_SUBJECT = "person";
export { petSubject as a, REWARD_IDS as c, isRankId as d, rankAt as f, parseAwardEvent as i, SLOTS as l, slotOf as m, agentSubject as n, reportWorldAction as o, rankOf as p, fetchProgression as r, RANK_INFO as s, PERSON_SUBJECT as t, TITLE_IDS as u };
