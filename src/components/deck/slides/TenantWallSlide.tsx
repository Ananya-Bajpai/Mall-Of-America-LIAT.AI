"use client";

import { motion } from "framer-motion";
import { SlideRoot } from "./SlideRoot";
import type { TenantWallSlideData } from "@/lib/deck/types";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = { slide: TenantWallSlideData };

export function TenantWallSlide({ slide }: Props) {
  return (
    <SlideRoot tone={slide.tone ?? "ink"}>
      <div className="flex flex-1 flex-col">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="eyebrow mb-5"
          >
            {slide.eyebrow}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="font-display font-light leading-[1.05]"
            style={{ fontSize: "var(--text-display-lg)" }}
          >
            {slide.headline}
          </motion.h2>
        </div>

        <div className="mt-auto pt-12 md:pt-16 flex flex-wrap gap-3 md:gap-4">
          {slide.items.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease, delay: 0.35 + i * 0.05 }}
              className="px-5 py-3 border border-[var(--color-line)] rounded-full text-sm md:text-base text-[var(--color-paper)]/85 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </SlideRoot>
  );
}
