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

const SITE_URL = "https://mall-of-america-deck-one.vercel.app";
const TITLE = "Mall of America — A Destination Unlike Any Other";
const DESCRIPTION =
  "An interactive sales experience for Mall of America — 5.6M sq ft, 40M+ annual visitors, 520+ stores, and a world-class entertainment platform. Built for leasing, sponsorship, and event-booking conversations.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Mall of America Sales Deck",
  authors: [{ name: "Ananya Bajpai" }],
  keywords: [
    "Mall of America",
    "sales deck",
    "leasing",
    "sponsorship",
    "events",
    "retail",
    "Bloomington",
    "Minnesota",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Mall of America Sales Deck",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Mall of America — interactive sales deck",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
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
