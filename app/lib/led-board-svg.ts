export type LedBoardSvgOptions = {
  text?: string;
  duration?: number;
  title?: string;
};

const cols = 96;
const rows = 13;
const dotGap = 8;
const dotStartX = 8;
const dotStartY = 10;
const defaultText = "LED BOARD SVG";
const defaultTitle = "LED board SVG";

const ledColors = {
  start: "#7dd3fc",
  middle: "#ffffff",
  end: "#38bdf8",
  hazeA: "#7dd3fc",
  hazeB: "#bae6fd",
};

const boardBackground = {
  outer: "#05070a",
  top: "#171b20",
  middle: "#07090d",
  bottom: "#11151b",
  offDot: "#3d444c",
  border: "#2f3741",
};

const dots = Array.from({ length: cols * rows }, (_, index) => ({
  x: dotStartX + (index % cols) * dotGap,
  y: dotStartY + Math.floor(index / cols) * dotGap,
}));

function escapeSvgText(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function sanitizeText(value: string | undefined) {
  const text = value?.trim() || defaultText;

  return text.slice(0, 120);
}

function sanitizeDuration(value: number | undefined) {
  if (!Number.isFinite(value)) {
    return 11;
  }

  return Math.min(60, Math.max(4, Number(value)));
}

function renderDots(kind: "off" | "on", offDot: string) {
  const radius = kind === "off" ? "2.35" : "3";
  const attrs =
    kind === "off"
      ? `fill="${offDot}" opacity="0.7"`
      : 'fill="url(#led-light)"';

  return dots
    .map(
      (dot) =>
        `<circle cx="${dot.x}" cy="${dot.y}" r="${radius}" ${attrs} />`,
    )
    .join("");
}

export function createLedBoardSvg(options: LedBoardSvgOptions = {}) {
  const text = escapeSvgText(sanitizeText(options.text));
  const title = escapeSvgText(options.title?.trim() || defaultTitle);
  const duration = sanitizeDuration(options.duration);

  return `<svg role="img" aria-labelledby="led-board-title led-board-description" viewBox="0 0 760 112" xmlns="http://www.w3.org/2000/svg">
  <title id="led-board-title">${title}</title>
  <desc id="led-board-description">A scrolling dot-matrix electric signboard SVG.</desc>
  <defs>
    <linearGradient id="led-board-bg" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="${boardBackground.top}" />
      <stop offset="52%" stop-color="${boardBackground.middle}" />
      <stop offset="100%" stop-color="${boardBackground.bottom}" />
    </linearGradient>
    <linearGradient id="led-light" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%" stop-color="${ledColors.start}" />
      <stop offset="45%" stop-color="${ledColors.middle}" />
      <stop offset="100%" stop-color="${ledColors.end}" />
    </linearGradient>
    <filter id="led-soft-glow" x="-20%" y="-120%" width="140%" height="340%">
      <feGaussianBlur stdDeviation="2.2" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="led-text-haze" x="-20%" y="-140%" width="140%" height="380%">
      <feGaussianBlur stdDeviation="3.8" />
    </filter>
    <clipPath id="led-window">
      <rect x="0" y="0" width="760" height="112" />
    </clipPath>
    <mask id="led-text-mask" maskUnits="userSpaceOnUse">
      <rect width="760" height="112" fill="black" />
      <text x="780" y="66" fill="white" font-family="Hiragino Kaku Gothic ProN, Yu Gothic, Meiryo, ui-sans-serif, system-ui, sans-serif" font-size="58" font-weight="800" letter-spacing="2" dominant-baseline="middle">
        ${text}
        <animate attributeName="x" from="780" to="-1560" dur="${duration}s" repeatCount="indefinite" />
      </text>
    </mask>
  </defs>
  <rect width="760" height="112" fill="${boardBackground.outer}" />
  <rect x="1" y="1" width="758" height="110" rx="2" fill="url(#led-board-bg)" />
  <g>${renderDots("off", boardBackground.offDot)}</g>
  <g clip-path="url(#led-window)">
    <text x="780" y="66" fill="${ledColors.hazeA}" font-family="Hiragino Kaku Gothic ProN, Yu Gothic, Meiryo, ui-sans-serif, system-ui, sans-serif" font-size="58" font-weight="800" letter-spacing="2" dominant-baseline="middle" filter="url(#led-text-haze)" opacity="0.42">
      ${text}
      <animate attributeName="x" from="780" to="-1560" dur="${duration}s" repeatCount="indefinite" />
    </text>
    <text x="784" y="66" fill="${ledColors.hazeB}" font-family="Hiragino Kaku Gothic ProN, Yu Gothic, Meiryo, ui-sans-serif, system-ui, sans-serif" font-size="58" font-weight="800" letter-spacing="2" dominant-baseline="middle" filter="url(#led-text-haze)" opacity="0.36">
      ${text}
      <animate attributeName="x" from="784" to="-1556" dur="${duration}s" repeatCount="indefinite" />
    </text>
  </g>
  <g mask="url(#led-text-mask)" filter="url(#led-soft-glow)">${renderDots("on", boardBackground.offDot)}</g>
  <rect x="1" y="1" width="758" height="110" rx="2" fill="none" stroke="${boardBackground.border}" />
</svg>`;
}
