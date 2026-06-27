"use client";

import { useMemo, useState } from "react";

const baseUrl = "https://led-borad-svg.vercel.app";

export default function Home() {
  const [text, setText] = useState("LED BOARD SVG");
  const [duration, setDuration] = useState(11);

  const svgUrl = useMemo(() => {
    const params = new URLSearchParams({
      text,
      duration: String(duration),
    });

    return `${baseUrl}/api/led-board?${params.toString()}`;
  }, [duration, text]);

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
