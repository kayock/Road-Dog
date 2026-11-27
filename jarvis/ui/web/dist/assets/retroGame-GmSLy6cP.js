const RETRO_STEP = 1 / 60;
const RETRO_FONT = "'Pixelify Sans', ui-monospace, monospace";
function retroFont(px, weight = 400) {
	return `${weight} ${px}px ${RETRO_FONT}`;
}
export { retroFont as n, RETRO_STEP as t };
