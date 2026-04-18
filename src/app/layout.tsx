import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  title: "Mall of America — A Destination Unlike Any Other",
  description:
    "An interactive sales experience for Mall of America: 5.6M sq ft, 40M+ annual visitors, 500+ stores, and a world-class entertainment platform.",
  openGraph: {
    title: "Mall of America — A Destination Unlike Any Other",
    description:
      "Interactive sales deck for tenants, sponsors, and event partners.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${display.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
