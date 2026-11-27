import { t as Cloud } from "./cloud-BsupiYNR.js";
import { t as CreditCard } from "./credit-card-BNX9a4vc.js";
import { t as Database } from "./database-i6bvtqwq.js";
import { t as GitBranch } from "./git-branch-CqSUH7rn.js";
import { t as Rocket } from "./rocket-BN1uCWd_.js";
import { t as Terminal } from "./terminal-CG2JP6MB.js";
import { Bc as require_jsx_runtime, Ln as cn, na as createLucideIcon, tl as __toESM } from "./index-BOzhgzD7.js";
import { C as cliVendor, S as CLI_VENDOR_LOGOS, _ as firebase_default, a as render_default, b as azure_default, c as netlify_default, d as heroku_default, f as google_default, g as fly_default, h as github_default, i as stripe_default, l as neon_default, m as gitlab_default, n as twilio_default, o as railway_default, p as google_cloud_default, r as supabase_default, s as planetscale_default, t as vercel_default, u as kubernetes_default, v as docker_default, x as aws_default, y as cloudflare_default } from "./vercel-ce92EA18.js";
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Boxes = createLucideIcon("Boxes", [
	["path", {
		d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",
		key: "lc1i9w"
	}],
	["path", {
		d: "m7 16.5-4.74-2.85",
		key: "1o9zyk"
	}],
	["path", {
		d: "m7 16.5 5-3",
		key: "va8pkn"
	}],
	["path", {
		d: "M7 16.5v5.17",
		key: "jnp8gn"
	}],
	["path", {
		d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",
		key: "8zsnat"
	}],
	["path", {
		d: "m17 16.5-5-3",
		key: "8arw3v"
	}],
	["path", {
		d: "m17 16.5 4.74-2.85",
		key: "8rfmw"
	}],
	["path", {
		d: "M17 16.5v5.17",
		key: "k6z78m"
	}],
	["path", {
		d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",
		key: "1xygjf"
	}],
	["path", {
		d: "M12 8 7.26 5.15",
		key: "1vbdud"
	}],
	["path", {
		d: "m12 8 4.74-2.85",
		key: "3rx089"
	}],
	["path", {
		d: "M12 13.5V8",
		key: "1io7kd"
	}]
]);
/**
* @license lucide-react v0.445.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Briefcase = createLucideIcon("Briefcase", [["path", {
	d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
	key: "jecpp"
}], ["rect", {
	width: "20",
	height: "14",
	x: "2",
	y: "6",
	rx: "2",
	key: "i6l2r4"
}]]);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var CATEGORY_GLYPHS = {
	cloud: Cloud,
	paas: Rocket,
	baas: Database,
	git: GitBranch,
	payments: CreditCard,
	container: Boxes,
	workspace: Briefcase,
	self: Terminal,
	other: Terminal
};
var BUNDLED = {
	"../../assets/clis/aws.svg": aws_default,
	"../../assets/clis/azure.svg": azure_default,
	"../../assets/clis/cloudflare.svg": cloudflare_default,
	"../../assets/clis/docker.svg": docker_default,
	"../../assets/clis/firebase.svg": firebase_default,
	"../../assets/clis/fly.svg": fly_default,
	"../../assets/clis/github.svg": github_default,
	"../../assets/clis/gitlab.svg": gitlab_default,
	"../../assets/clis/google-cloud.svg": google_cloud_default,
	"../../assets/clis/google.svg": google_default,
	"../../assets/clis/heroku.svg": heroku_default,
	"../../assets/clis/kubernetes.svg": kubernetes_default,
	"../../assets/clis/neon.svg": neon_default,
	"../../assets/clis/netlify.svg": netlify_default,
	"../../assets/clis/planetscale.svg": planetscale_default,
	"../../assets/clis/railway.svg": railway_default,
	"../../assets/clis/render.svg": render_default,
	"../../assets/clis/stripe.svg": stripe_default,
	"../../assets/clis/supabase.svg": supabase_default,
	"../../assets/clis/twilio.svg": twilio_default,
	"../../assets/clis/vercel.svg": vercel_default
};
function CategoryGlyph({ category, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CATEGORY_GLYPHS[category] ?? Terminal, { className });
}
function CliLogo({ cliName, category, className, size = "md" }) {
	const vendor = cliVendor(cliName);
	const entry = vendor ? CLI_VENDOR_LOGOS[vendor] : void 0;
	const url = entry ? BUNDLED[`../../assets/clis/${entry.file}`] : void 0;
	const tile = {
		sm: "h-7 w-7 rounded-md",
		md: "h-9 w-9 rounded-lg",
		lg: "h-12 w-12 rounded-xl"
	}[size];
	const mark = {
		sm: "h-4 w-4",
		md: "h-5 w-5",
		lg: "h-7 w-7"
	}[size];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": "true",
		"data-testid": `cli-logo-${cliName}`,
		"data-vendor": vendor ?? void 0,
		className: cn("inline-flex shrink-0 items-center justify-center overflow-hidden border border-border bg-background", tile, className),
		children: url && entry?.render === "mono" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("block bg-foreground/85", mark),
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
		}) : url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: url,
			alt: "",
			className: cn("block object-contain", mark)
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryGlyph, {
			category,
			className: cn("text-muted-foreground", mark)
		})
	});
}
export { CliLogo as t };
