"use client";

import { motion } from "framer-motion";
import { SlideRoot } from "./SlideRoot";
import { PropertyMap } from "../PropertyMap";
import { deck } from "@/lib/deck/chapters";
import type { MapSlideData } from "@/lib/deck/types";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = {
  slide: MapSlideData;
  onJumpChapter: (idx: number) => void;
};

export function MapSlide({ slide, onJumpChapter }: Props) {
  const chapterIndex: Record<string, number> = {};
  deck.chapters.forEach((c) => (chapterIndex[c.id] = c.index));

  return (
    <SlideRoot tone={slide.tone ?? "ink"}>
      <div className="flex flex-1 flex-col">
        <div className="max-w-3xl mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="eyebrow mb-4"
          >
            {slide.eyebrow}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="font-display font-light leading-[1.05]"
            style={{ fontSize: "var(--text-display-md)" }}
          >
            {slide.headline}
          </motion.h2>
        </div>
        <div className="relative flex-1">
          <PropertyMap
            onJumpChapter={onJumpChapter}
            chapterIndex={chapterIndex}
          />
        </div>
      </div>
    </SlideRoot>
  );
}
