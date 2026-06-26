import { createLedBoardSvg } from "@/app/lib/led-board-svg";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const durationParam = searchParams.get("duration");
  const svg = createLedBoardSvg({
    text: searchParams.get("text") ?? undefined,
    duration: durationParam ? Number(durationParam) : undefined,
    title: searchParams.get("title") ?? undefined,
  });

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
