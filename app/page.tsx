"use client";

import { useMemo, useState } from "react";

const baseUrl = "https://led-borad-svg.vercel.app";
const colors = [
  { name: "cyan", start: "#7dd3fc", middle: "#ffffff", end: "#38bdf8" },
  { name: "pink", start: "#ffb3f4", middle: "#ffffff", end: "#f0abfc" },
  { name: "amber", start: "#fbbf24", middle: "#fff7ad", end: "#fb923c" },
  { name: "green", start: "#86efac", middle: "#f0fdf4", end: "#22c55e" },
  { name: "red", start: "#fca5a5", middle: "#fff1f2", end: "#ef4444" },
  { name: "white", start: "#dbeafe", middle: "#ffffff", end: "#f8fafc" },
] as const;
const backgrounds = [
  { name: "black", top: "#171b20", middle: "#07090d", bottom: "#11151b" },
  { name: "navy", top: "#111827", middle: "#061121", bottom: "#0f172a" },
  { name: "charcoal", top: "#2a2a2a", middle: "#151515", bottom: "#242424" },
  { name: "brown", top: "#3a2615", middle: "#1f140b", bottom: "#2d1b0f" },
  { name: "transparent", top: "#ffffff", middle: "#f4f4f5", bottom: "#ffffff" },
] as const;

export default function Home() {
  const [text, setText] = useState("LED BOARD SVG");
  const [duration, setDuration] = useState(11);
  const [color, setColor] = useState<(typeof colors)[number]["name"]>("cyan");
  const [bg, setBg] = useState<(typeof backgrounds)[number]["name"]>("black");

  const svgUrl = useMemo(() => {
    const params = new URLSearchParams({
      text,
      duration: String(duration),
      color,
      bg,
    });

    return `${baseUrl}/api/led-board?${params.toString()}`;
  }, [bg, color, duration, text]);

  const markdown = `![LED Board](${svgUrl})`;

  return (
    <main className="min-h-screen bg-white p-4 text-zinc-950">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        <img
          src={svgUrl}
          alt="LED board preview"
          className="block h-auto w-full"
        />

        <label className="flex flex-col gap-1 text-sm">
          text
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="border border-zinc-300 px-3 py-2 font-mono text-sm"
          />
        </label>

        <div className="flex flex-col gap-2 text-sm">
          color
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
            {colors.map((item) => (
              <button
                key={item.name}
                type="button"
                aria-pressed={color === item.name}
                onClick={() => setColor(item.name)}
                className={`flex flex-col gap-2 border p-2 text-left font-mono text-xs ${
                  color === item.name
                    ? "border-zinc-950"
                    : "border-zinc-300"
                }`}
              >
                <span className="h-8 w-full bg-zinc-950 p-1">
                  <span
                    className="block h-full w-full"
                    style={{
                      background: `linear-gradient(90deg, ${item.start}, ${item.middle}, ${item.end})`,
                      boxShadow: `0 0 10px ${item.start}, 0 0 18px ${item.end}`,
                    }}
                  />
                </span>
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          background
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
            {backgrounds.map((item) => (
              <button
                key={item.name}
                type="button"
                aria-pressed={bg === item.name}
                onClick={() => setBg(item.name)}
                className={`flex flex-col gap-2 border p-2 text-left font-mono text-xs ${
                  bg === item.name ? "border-zinc-950" : "border-zinc-300"
                }`}
              >
                <span
                  className="h-8 w-full border border-zinc-200"
                  style={{
                    background: `linear-gradient(180deg, ${item.top}, ${item.middle}, ${item.bottom})`,
                  }}
                />
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <label className="flex flex-col gap-1 text-sm">
          duration
          <input
            type="number"
            min="4"
            max="60"
            value={duration}
            onChange={(event) => setDuration(Number(event.target.value))}
            className="w-28 border border-zinc-300 px-3 py-2 font-mono text-sm"
          />
        </label>

        <div className="flex flex-col gap-1 text-sm">
          url
          <input
            readOnly
            value={svgUrl}
            className="border border-zinc-300 px-3 py-2 font-mono text-sm"
          />
        </div>

        <div className="flex flex-col gap-1 text-sm">
          markdown
          <textarea
            readOnly
            value={markdown}
            rows={3}
            className="resize-none border border-zinc-300 px-3 py-2 font-mono text-sm"
          />
        </div>
      </div>
    </main>
  );
}
