import type { ReactNode } from "react";

export type Tone = "ink" | "ink-soft" | "paper";

export type SlideBg =
  | { kind: "video"; src: string; overlay?: string }
  | { kind: "image"; src: string; alt: string; overlay?: string }
  | { kind: "none" };

export type SlideStat = {
  value: string;
  label: string;
  detail?: string;
};

export type SlideMetric = {
  label: string;
  value: string;
};

export type SlideGridCard = {
  id: string;
  eyebrow?: string;
  title: string;
  body?: string;
  image?: string;
  stat?: string;
  href?: string;
  cta?: string;
};

export type SlideBase = {
  id: string;
  tone?: Tone;
};

export type CoverSlideData = SlideBase & {
  kind: "cover";
  eyebrow: string;
  headline: ReactNode;
  body?: ReactNode;
  stats?: SlideStat[];
  metrics?: SlideMetric[];
  bg?: SlideBg;
};

export type DataWallSlideData = SlideBase & {
  kind: "dataWall";
  eyebrow: string;
  headline: ReactNode;
  stats: SlideStat[];
};

export type BannerSlideData = SlideBase & {
  kind: "banner";
  eyebrow?: string;
  image: string;
  alt: string;
  captionTitle?: ReactNode;
  captionBody?: string;
};

export type GridSlideData = SlideBase & {
  kind: "grid";
  eyebrow: string;
  headline: ReactNode;
  columns: 2 | 3 | 4;
  cards: SlideGridCard[];
};

export type AttractionSlideData = SlideBase & {
  kind: "attraction";
  eyebrow: string;
  name: string;
  stat?: string;
  description: string;
  image: string;
};

export type TenantWallSlideData = SlideBase & {
  kind: "tenantWall";
  eyebrow: string;
  headline: ReactNode;
  items: string[];
  /** "logos" renders each item as a large wordmark tile. "chips" renders pills (default). */
  variant?: "logos" | "chips";
};

export type Slide =
  | CoverSlideData
  | DataWallSlideData
  | BannerSlideData
  | GridSlideData
  | AttractionSlideData
  | TenantWallSlideData;

export type Chapter = {
  id: string;
  index: number;
  label: string;
  tagline: string;
  tone: Tone;
  tile: { image: string; alt: string; isVideo?: boolean };
  slides: Slide[];
};

export type DeckPosition = {
  chapterIdx: number;
  slideIdx: number;
};
