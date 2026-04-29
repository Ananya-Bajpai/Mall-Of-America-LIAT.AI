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

/**
 * Full-bleed cinematic transition slide. Plays a video if `video` is set and the file
 * resolves; otherwise renders the `poster` image with a slow Ken Burns animation.
 * Auto-advances when the video ends, when the Ken Burns animation completes, or on click.
 */
export type CinematicSlideData = SlideBase & {
  kind: "cinematic";
  /** Optional MP4 source. If absent or 404, component falls back to poster + Ken Burns. */
  video?: string;
  /** Poster image — required. Doubles as the Ken Burns visual when video is unavailable. */
  poster: string;
  /** Alt text for the poster (also used as accessible label for the slide). */
  alt: string;
  /** Eyebrow word above the title (e.g., "01 — The Stage"). */
  eyebrow?: string;
  /** Title overlay that fades in toward the end of the cinematic. Optional. */
  title?: ReactNode;
  /** How long the Ken Burns fallback runs before auto-advancing. Default 4s. */
  fallbackDurationMs?: number;
};

export type Slide =
  | CoverSlideData
  | DataWallSlideData
  | BannerSlideData
  | GridSlideData
  | AttractionSlideData
  | TenantWallSlideData
  | CinematicSlideData;

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
