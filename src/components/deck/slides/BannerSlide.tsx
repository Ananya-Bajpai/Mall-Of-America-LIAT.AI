"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SlideRoot } from "./SlideRoot";
import type { BannerSlideData } from "@/lib/deck/types";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = { slide: BannerSlideData };

export function BannerSlide({ slide }: Props) {
  return (
    <SlideRoot tone={slide.tone ?? "ink"} contentClassName="!p-0">
      <div className="relative flex h-full w-full">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/92 via-[var(--color-ink)]/30 to-[var(--color-ink)]/55" />
        </motion.div>

        <div className="relative z-10 flex h-full w-full flex-col justify-end px-[var(--gutter)] pt-[clamp(5rem,12vh,8rem)] pb-[clamp(5rem,10vh,7rem)]">
          <div className="mx-auto flex w-full max-w-[var(--max-content)] flex-col">
            {slide.eyebrow && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.3 }}
                className="eyebrow mb-6"
              >
                {slide.eyebrow}
              </motion.div>
            )}
            {slide.captionTitle && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.4 }}
                className="font-display font-light leading-[1.02] max-w-4xl text-[var(--color-paper)]"
                style={{ fontSize: "var(--text-display-lg)" }}
              >
                {slide.captionTitle}
              </motion.h2>
            )}
            {slide.captionBody && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.55 }}
                className="mt-6 max-w-xl text-base md:text-lg font-light leading-relaxed text-[var(--color-paper)]/80"
              >
                {slide.captionBody}
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </SlideRoot>
  );
}
