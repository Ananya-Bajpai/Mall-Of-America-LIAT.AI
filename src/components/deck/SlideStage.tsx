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

type Props = {
  slide: Slide;
  /** Composite key ensures AnimatePresence swaps on chapter OR slide change. */
  slideKey: string;
  /** Called when an interactive slide finishes (e.g. cinematic ends). */
  onAdvance?: () => void;
};

function renderSlide(slide: Slide, onAdvance?: () => void) {
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
  }
}

export function SlideStage({ slide, slideKey, onAdvance }: Props) {
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
          {renderSlide(slide, onAdvance)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
