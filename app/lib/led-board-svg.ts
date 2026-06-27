export type LedBoardSvgOptions = {
  text?: string;
  duration?: number;
  color?: LedBoardColor;
  bg?: LedBoardBackground;
  title?: string;
};

export type LedBoardColor = "cyan" | "pink" | "amber" | "green" | "red" | "white";
export type LedBoardBackground =
  | "black"
  | "navy"
  | "charcoal"
  | "brown"
  | "transparent";

const cols = 96;
const rows = 13;
const dotGap = 8;
const dotStartX = 8;
const dotStartY = 10;
const defaultText = "LED BOARD SVG";
const defaultTitle = "LED board SVG";

const palettes: Record<
  LedBoardColor,
  {
    start: string;
    middle: string;
    end: string;
    hazeA: string;
    hazeB: string;
  }
> = {
  cyan: {
    start: "#7dd3fc",
    middle: "#ffffff",
    end: "#38bdf8",
    hazeA: "#7dd3fc",
    hazeB: "#bae6fd",
  },
  pink: {
    start: "#ffb3f4",
    middle: "#ffffff",
    end: "#f0abfc",
    hazeA: "#ff9df2",
    hazeB: "#f5d0fe",
  },
  amber: {
    start: "#fbbf24",
    middle: "#fff7ad",
    end: "#fb923c",
    hazeA: "#f59e0b",
    hazeB: "#fde68a",
  },
  green: {
    start: "#86efac",
    middle: "#f0fdf4",
    end: "#22c55e",
    hazeA: "#4ade80",
    hazeB: "#bbf7d0",
  },
  red: {
    start: "#fca5a5",
    middle: "#fff1f2",
    end: "#ef4444",
    hazeA: "#f87171",
    hazeB: "#fecaca",
  },
  white: {
    start: "#dbeafe",
    middle: "#ffffff",
    end: "#f8fafc",
    hazeA: "#e0f2fe",
    hazeB: "#ffffff",
  },
};

const backgrounds: Record<
  LedBoardBackground,
  {
    outer: string;
    top: string;
    middle: string;
    bottom: string;
    offDot: string;
    border: string;
  }
> = {
  black: {
    outer: "#05070a",
    top: "#171b20",
    middle: "#07090d",
    bottom: "#11151b",
    offDot: "#3d444c",
    border: "#2f3741",
  },
  navy: {
    outer: "#020617",
    top: "#111827",
    middle: "#061121",
    bottom: "#0f172a",
    offDot: "#334155",
    border: "#1e3a5f",
  },
  charcoal: {
    outer: "#111111",
    top: "#2a2a2a",
    middle: "#151515",
    bottom: "#242424",
    offDot: "#4b5563",
    border: "#3f3f46",
  },
  brown: {
    outer: "#1c1007",
    top: "#3a2615",
    middle: "#1f140b",
    bottom: "#2d1b0f",
    offDot: "#5c4736",
    border: "#5a3a1f",
  },
  transparent: {
    outer: "transparent",
    top: "#171b20",
    middle: "#07090d",
    bottom: "#11151b",
    offDot: "#3d444c",
    border: "#2f3741",
  },
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

function sanitizeColor(value: string | undefined): LedBoardColor {
  if (
    value === "cyan" ||
    value === "pink" ||
    value === "amber" ||
    value === "green" ||
    value === "red" ||
    value === "white"
  ) {
    return value;
  }

  return "cyan";
}

function sanitizeBackground(value: string | undefined): LedBoardBackground {
  if (
    value === "black" ||
    value === "navy" ||
    value === "charcoal" ||
    value === "brown" ||
    value === "transparent"
  ) {
    return value;
  }

  return "black";
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
  const colors = palettes[sanitizeColor(options.color)];
  const bg = backgrounds[sanitizeBackground(options.bg)];

  return `<svg role="img" aria-labelledby="led-board-title led-board-description" viewBox="0 0 760 112" xmlns="http://www.w3.org/2000/svg">
  <title id="led-board-title">${title}</title>
  <desc id="led-board-description">A scrolling dot-matrix electric signboard SVG.</desc>
  <defs>
    <linearGradient id="led-board-bg" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="${bg.top}" />
      <stop offset="52%" stop-color="${bg.middle}" />
      <stop offset="100%" stop-color="${bg.bottom}" />
    </linearGradient>
    <linearGradient id="led-light" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%" stop-color="${colors.start}" />
      <stop offset="45%" stop-color="${colors.middle}" />
      <stop offset="100%" stop-color="${colors.end}" />
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
  <rect width="760" height="112" fill="${bg.outer}" />
  <rect x="1" y="1" width="758" height="110" rx="2" fill="url(#led-board-bg)" />
  <g>${renderDots("off", bg.offDot)}</g>
  <g clip-path="url(#led-window)">
    <text x="780" y="66" fill="${colors.hazeA}" font-family="Hiragino Kaku Gothic ProN, Yu Gothic, Meiryo, ui-sans-serif, system-ui, sans-serif" font-size="58" font-weight="800" letter-spacing="2" dominant-baseline="middle" filter="url(#led-text-haze)" opacity="0.42">
      ${text}
      <animate attributeName="x" from="780" to="-1560" dur="${duration}s" repeatCount="indefinite" />
    </text>
    <text x="784" y="66" fill="${colors.hazeB}" font-family="Hiragino Kaku Gothic ProN, Yu Gothic, Meiryo, ui-sans-serif, system-ui, sans-serif" font-size="58" font-weight="800" letter-spacing="2" dominant-baseline="middle" filter="url(#led-text-haze)" opacity="0.36">
      ${text}
      <animate attributeName="x" from="784" to="-1556" dur="${duration}s" repeatCount="indefinite" />
    </text>
  </g>
  <g mask="url(#led-text-mask)" filter="url(#led-soft-glow)">${renderDots("on", bg.offDot)}</g>
  <rect x="1" y="1" width="758" height="110" rx="2" fill="none" stroke="${bg.border}" />
</svg>`;
}
