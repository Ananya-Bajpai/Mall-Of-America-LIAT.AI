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

/** A single clickable region on a hotspot image. Coords are 0–100 percent of image. */
export type Hotspot = {
  id: string;
  /** Center X position as percent (0–100) */
  x: number;
  /** Center Y position as percent (0–100) */
  y: number;
  label: string;
  /** Optional caption shown when hovered/active. */
  detail?: string;
  /** Optional stat displayed in the modal/popover (e.g., "$1.2B annual sales"). */
  stat?: string;
};

export type HotspotSlideData = SlideBase & {
  kind: "hotspot";
  eyebrow: string;
  headline: ReactNode;
  /** Wide image (ideally 21:9). */
  image: string;
  alt: string;
  hotspots: Hotspot[];
};

/** Single item in a Gallery slide. */
export type GalleryItem = {
  id: string;
  image: string;
  alt: string;
  title: string;
  caption?: string;
};

export type GallerySlideData = SlideBase & {
  kind: "gallery";
  eyebrow: string;
  headline: ReactNode;
  items: GalleryItem[];
};

/** A single comparison row — left = subject, right = baseline. */
export type ComparisonRow = {
  label: string;
  subject: string;
  baseline: string;
  /** Optional emphasis multiplier copy (e.g., "4× more"). */
  multiplier?: string;
};

export type ComparisonSlideData = SlideBase & {
  kind: "comparison";
  eyebrow: string;
  headline: ReactNode;
  subjectLabel: string;
  baselineLabel: string;
  rows: ComparisonRow[];
};

export type VideoLightboxItem = {
  id: string;
  poster: string;
  /** Optional video source. If missing, click opens the poster in a fullscreen image lightbox. */
  video?: string;
  title: string;
  stat?: string;
  description: string;
};

export type VideoLightboxSlideData = SlideBase & {
  kind: "videoLightbox";
  eyebrow: string;
  headline: ReactNode;
  items: VideoLightboxItem[];
};

export type TimelineMoment = {
  id: string;
  date: string;
  title: string;
  description: string;
  /** Optional poster image — falls back to a CSS gradient if absent. */
  image?: string;
};

export type TimelineSlideData = SlideBase & {
  kind: "timeline";
  eyebrow: string;
  headline: ReactNode;
  moments: TimelineMoment[];
};

/** A clickable region on the property floorplan SVG (chapter id to jump to). */
export type MapRegion = {
  /** SVG path's `d` attribute. */
  d: string;
  /** Chapter id to jump to. */
  chapterId: string;
  label: string;
  /** Center anchor for the label, in viewBox units. */
  labelX: number;
  labelY: number;
};

export type MapSlideData = SlideBase & {
  kind: "map";
  eyebrow: string;
  headline: ReactNode;
  regions: MapRegion[];
};

export type ActivationPath = "lease" | "sponsor" | "event";

export type ActivationVenue = {
  id: string;
  pathFor: ActivationPath;
  /** Image showing the venue with a clean white logo zone. */
  plate: string;
  alt: string;
  name: string;
  /** Logo placement zone in % of image (the white rectangle in the plate). */
  zone: { x: number; y: number; width: number; height: number };
  /** CSS mix-blend-mode for the composited logo (e.g., "screen" for LED, "multiply" for fabric). */
  blendMode: "screen" | "multiply" | "normal";
  reach: string;
  comp: string;
  leadTime: string;
  ctaSubject: string;
};

export type ActivationBuilderSlideData = SlideBase & {
  kind: "activationBuilder";
  eyebrow: string;
  headline: ReactNode;
  venues: ActivationVenue[];
};

export type Slide =
  | CoverSlideData
  | DataWallSlideData
  | BannerSlideData
  | GridSlideData
  | AttractionSlideData
  | TenantWallSlideData
  | CinematicSlideData
  | HotspotSlideData
  | GallerySlideData
  | ComparisonSlideData
  | VideoLightboxSlideData
  | TimelineSlideData
  | MapSlideData
  | ActivationBuilderSlideData;

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
