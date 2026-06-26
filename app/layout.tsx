import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "svg-tree",
  description: "README-ready SVG trees for GitHub commit activity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
