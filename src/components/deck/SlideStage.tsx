"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Slide } from "@/lib/deck/types";
import { CoverSlide } from "./slides/CoverSlide";
import { DataWallSlide } from "./slides/DataWallSlide";
import { BannerSlide } from "./slides/BannerSlide";
import { GridSlide } from "./slides/GridSlide";
import { AttractionSlide } from "./slides/AttractionSlide";
import { TenantWallSlide } from "./slides/TenantWallSlide";
import { CinematicSlide } from "./slides/CinematicSlide";
import { HotspotSlide } from "./slides/HotspotSlide";
import { GallerySlide } from "./slides/GallerySlide";
import { ComparisonSlide } from "./slides/ComparisonSlide";
import { VideoLightboxSlide } from "./slides/VideoLightboxSlide";
import { TimelineSlide } from "./slides/TimelineSlide";
import { MapSlide } from "./slides/MapSlide";
import { ActivationBuilderSlide } from "./slides/ActivationBuilderSlide";

type Props = {
  slide: Slide;
  /** Composite key ensures AnimatePresence swaps on chapter OR slide change. */
  slideKey: string;
  /** Called when an interactive slide finishes (e.g. cinematic ends). */
  onAdvance?: () => void;
  /** For map slides: jump to a specific chapter. */
  onJumpChapter?: (idx: number) => void;
};

function renderSlide(
  slide: Slide,
  onAdvance?: () => void,
  onJumpChapter?: (idx: number) => void,
) {
  switch (slide.kind) {
    case "cover":
      return <CoverSlide slide={slide} />;
    case "dataWall":
      return <DataWallSlide slide={slide} />;
    case "banner":
      return <BannerSlide slide={slide} />;
    case "grid":
      return <GridSlide slide={slide} />;
    case "attraction":
      return <AttractionSlide slide={slide} />;
    case "tenantWall":
      return <TenantWallSlide slide={slide} />;
    case "cinematic":
      return <CinematicSlide slide={slide} onComplete={onAdvance} />;
    case "hotspot":
      return <HotspotSlide slide={slide} />;
    case "gallery":
      return <GallerySlide slide={slide} />;
    case "comparison":
      return <ComparisonSlide slide={slide} />;
    case "videoLightbox":
      return <VideoLightboxSlide slide={slide} />;
    case "timeline":
      return <TimelineSlide slide={slide} />;
    case "map":
      return (
        <MapSlide slide={slide} onJumpChapter={onJumpChapter ?? (() => {})} />
      );
    case "activationBuilder":
      return <ActivationBuilderSlide slide={slide} />;
  }
}

export function SlideStage({ slide, slideKey, onAdvance, onJumpChapter }: Props) {
  const reduced = useReducedMotion();
  return (
    <div className="fixed inset-0 z-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={slideKey}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{
            duration: reduced ? 0.15 : 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-0"
        >
          {renderSlide(slide, onAdvance, onJumpChapter)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
