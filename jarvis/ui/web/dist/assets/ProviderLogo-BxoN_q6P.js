import { t as Server } from "./server-UsFxH5G7.js";
import { Bc as require_jsx_runtime, Ln as cn, na as createLucideIcon, tl as __toESM } from "./index-BOzhgzD7.js";
import { C as claude_default, E as antigravity_default, S as contabo_default, T as aws_default, _ as groq_default, a as oracle_default, b as elevenlabs_default, c as openai_default, d as linode_default, f as ionos_default, g as hermes_default, h as hetzner_default, i as ovhcloud_default, l as ollama_default, m as hostinger_default, n as vultr_default, o as openrouter_default, p as inworld_default, r as raspberrypi_default, s as openclaw_default, t as xai_default, u as nvidia_default, v as google_cloud_default, w as cartesia_default, x as digitalocean_default, y as gemini_default } from "./xai-CmmNaoW9.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var HardDrive = createLucideIcon("HardDrive", [
	["line", {
		x1: "22",
		x2: "2",
		y1: "12",
		y2: "12",
		key: "1y58io"
	}],
	["path", {
		d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
		key: "oot6mr"
	}],
	["line", {
		x1: "6",
		x2: "6.01",
		y1: "16",
		y2: "16",
		key: "sgf278"
	}],
	["line", {
		x1: "10",
		x2: "10.01",
		y1: "16",
		y2: "16",
		key: "1l4acy"
	}]
]);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var PROVIDER_FAMILY_LOGOS = {
	antigravity: {
		file: "antigravity.svg",
		render: "colour"
	},
	aws: {
		file: "aws.svg",
		render: "mono"
	},
	cartesia: {
		file: "cartesia.svg",
		render: "own"
	},
	digitalocean: {
		file: "digitalocean.svg",
		render: "mono"
	},
	claude: {
		file: "claude.svg",
		render: "colour"
	},
	contabo: {
		file: "contabo.svg",
		render: "mono"
	},
	elevenlabs: {
		file: "elevenlabs.svg",
		render: "mono"
	},
	hermes: {
		file: "hermes.svg",
		render: "mono"
	},
	openclaw: {
		file: "openclaw.svg",
		render: "colour"
	},
	gemini: {
		file: "gemini.svg",
		render: "colour"
	},
	"google-cloud": {
		file: "google-cloud.svg",
		render: "colour"
	},
	groq: {
		file: "groq.svg",
		render: "mono"
	},
	hetzner: {
		file: "hetzner.svg",
		render: "mono"
	},
	hostinger: {
		file: "hostinger.svg",
		render: "mono"
	},
	inworld: {
		file: "inworld.png",
		render: "own"
	},
	ionos: {
		file: "ionos.svg",
		render: "mono"
	},
	linode: {
		file: "linode.svg",
		render: "mono"
	},
	nvidia: {
		file: "nvidia.svg",
		render: "colour"
	},
	ollama: {
		file: "ollama.svg",
		render: "mono"
	},
	openai: {
		file: "openai.svg",
		render: "mono"
	},
	openrouter: {
		file: "openrouter.svg",
		render: "mono"
	},
	oracle: {
		file: "oracle.svg",
		render: "mono"
	},
	ovhcloud: {
		file: "ovhcloud.svg",
		render: "mono"
	},
	raspberrypi: {
		file: "raspberrypi.svg",
		render: "mono"
	},
	vultr: {
		file: "vultr.svg",
		render: "mono"
	},
	xai: {
		file: "xai.svg",
		render: "mono"
	}
};
var BUNDLED = {
	"../../assets/providers/antigravity.svg": antigravity_default,
	"../../assets/providers/aws.svg": aws_default,
	"../../assets/providers/cartesia.svg": cartesia_default,
	"../../assets/providers/claude.svg": claude_default,
	"../../assets/providers/contabo.svg": contabo_default,
	"../../assets/providers/digitalocean.svg": digitalocean_default,
	"../../assets/providers/elevenlabs.svg": elevenlabs_default,
	"../../assets/providers/gemini.svg": gemini_default,
	"../../assets/providers/google-cloud.svg": google_cloud_default,
	"../../assets/providers/groq.svg": groq_default,
	"../../assets/providers/hermes.svg": hermes_default,
	"../../assets/providers/hetzner.svg": hetzner_default,
	"../../assets/providers/hostinger.svg": hostinger_default,
	"../../assets/providers/inworld.png": inworld_default,
	"../../assets/providers/ionos.svg": ionos_default,
	"../../assets/providers/linode.svg": linode_default,
	"../../assets/providers/nvidia.svg": nvidia_default,
	"../../assets/providers/ollama.svg": ollama_default,
	"../../assets/providers/openai.svg": openai_default,
	"../../assets/providers/openclaw.svg": openclaw_default,
	"../../assets/providers/openrouter.svg": openrouter_default,
	"../../assets/providers/oracle.svg": oracle_default,
	"../../assets/providers/ovhcloud.svg": ovhcloud_default,
	"../../assets/providers/raspberrypi.svg": raspberrypi_default,
	"../../assets/providers/vultr.svg": vultr_default,
	"../../assets/providers/xai.svg": xai_default
};
function assetUrl(file) {
	return BUNDLED[`../../assets/providers/${file}`];
}
function providerFamily(providerId) {
	const id = providerId.toLowerCase();
	if (id.includes("vertex")) return "google-cloud";
	if (id.includes("antigravity") || id === "agy-cli") return "antigravity";
	if (id.includes("gemini")) return "gemini";
	if (id.includes("codex") || id.startsWith("openai")) return "openai";
	if (id.includes("claude")) return "claude";
	if (id.includes("grok")) return "xai";
	if (id.includes("openrouter")) return "openrouter";
	if (id.includes("groq")) return "groq";
	if (id.includes("ollama")) return "ollama";
	if (id.includes("elevenlabs")) return "elevenlabs";
	if (id.includes("cartesia")) return "cartesia";
	if (id.includes("inworld")) return "inworld";
	if (id.includes("nvidia") || id.includes("nemotron")) return "nvidia";
	if (id === "hermes" || id === "hermes-cli") return "hermes";
	if (id === "openclaw" || id === "openclaw-cli") return "openclaw";
	if (id.includes("hostinger")) return "hostinger";
	if (id.includes("hetzner")) return "hetzner";
	if (id.includes("digitalocean")) return "digitalocean";
	const hosting = {
		vultr: "vultr",
		linode: "linode",
		aws_lightsail: "aws",
		contabo: "contabo",
		ionos: "ionos",
		ovhcloud: "ovhcloud",
		oracle_cloud: "oracle",
		raspberry_pi: "raspberrypi"
	};
	if (id in hosting) return hosting[id];
	return null;
}
function localGlyph(providerId) {
	const id = providerId.toLowerCase();
	if (id === "local-voice") return "device";
	if (id.startsWith("local-") || id === "generic" || id === "home_server" || id === "strato") return "server";
	if (id === "multipass") return "device";
	if (id.includes("faster-whisper") || id.includes("piper")) return "device";
	return null;
}
function ProviderLogo({ providerId, label, className, size = "md" }) {
	const family = providerFamily(providerId);
	const entry = family ? PROVIDER_FAMILY_LOGOS[family] : void 0;
	const url = entry ? assetUrl(entry.file) : void 0;
	const local = localGlyph(providerId);
	const monogram = label.trim().slice(0, 1).toUpperCase() || "?";
	const small = size === "sm";
	const markClass = small ? "h-3.5 w-3.5" : "h-5 w-5";
	const glyphClass = small ? "h-3.5 w-3.5" : "h-4 w-4";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": "true",
		"data-testid": `provider-logo-${providerId}`,
		"data-family": family ?? void 0,
		className: cn(small ? "inline-flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden rounded-full" : "inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-secondary", className),
		children: url && entry?.render === "mono" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("block bg-foreground", markClass),
			style: {
				WebkitMaskImage: `url("${url}")`,
				maskImage: `url("${url}")`,
				WebkitMaskRepeat: "no-repeat",
				maskRepeat: "no-repeat",
				WebkitMaskPosition: "center",
				maskPosition: "center",
				WebkitMaskSize: "contain",
				maskSize: "contain"
			}
		}) : url && entry?.render === "own" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: url,
			alt: "",
			className: "block h-full w-full object-cover"
		}) : url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: url,
			alt: "",
			className: cn("block object-contain", markClass)
		}) : local === "server" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: cn("text-muted-foreground", glyphClass) }) : local === "device" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, { className: cn("text-muted-foreground", glyphClass) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("font-display font-semibold text-muted-foreground", small ? "text-micro" : "text-meta"),
			children: monogram
		})
	});
}
export { providerFamily as n, HardDrive as r, ProviderLogo as t };
