"use client";

import { motion } from "framer-motion";
import { SlideRoot } from "./SlideRoot";
import type { DataWallSlideData } from "@/lib/deck/types";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = { slide: DataWallSlideData };

export function DataWallSlide({ slide }: Props) {
  return (
    <SlideRoot tone={slide.tone ?? "ink-soft"}>
      <div className="flex flex-1 flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="eyebrow mb-6"
        >
          {slide.eyebrow}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="font-display font-light leading-[1.05] max-w-4xl"
          style={{ fontSize: "var(--text-display-lg)" }}
        >
          {slide.headline}
        </motion.h2>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 md:gap-14">
          {slide.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.35 + i * 0.06 }}
            >
              <div
                className="font-display font-light tracking-tight leading-none"
                style={{ fontSize: "var(--text-display-md)" }}
              >
                {stat.value}
              </div>
              <div className="mt-3 text-[10px] md:text-xs tracking-[0.2em] uppercase text-[var(--color-stone)]">
                {stat.label}
              </div>
              {stat.detail && (
                <div className="mt-2 text-sm opacity-70 max-w-xs">{stat.detail}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </SlideRoot>
  );
}
