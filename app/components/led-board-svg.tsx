import { createLedBoardSvg, type LedBoardSvgOptions } from "../lib/led-board-svg";

export function LedBoardSvg(options: LedBoardSvgOptions) {
  const svg = createLedBoardSvg(options);

  return (
    <div
      className="h-auto w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
