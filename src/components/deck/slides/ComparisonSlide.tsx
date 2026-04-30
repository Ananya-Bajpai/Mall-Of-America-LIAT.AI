"use client";

import { motion } from "framer-motion";
import { SlideRoot } from "./SlideRoot";
import type { ComparisonSlideData } from "@/lib/deck/types";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = { slide: ComparisonSlideData };

export function ComparisonSlide({ slide }: Props) {
  return (
    <SlideRoot tone={slide.tone ?? "ink"}>
      <div className="flex flex-1 flex-col justify-center">
        <div className="max-w-3xl mb-5 md:mb-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="eyebrow mb-3"
          >
            {slide.eyebrow}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="font-display font-light leading-[1.05]"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            {slide.headline}
          </motion.h2>
        </div>

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.35 }}
          className="mb-4 grid grid-cols-[1fr_clamp(7rem,16vw,10.5rem)_clamp(5.5rem,12vw,8.5rem)] gap-x-6 md:gap-x-10 border-b border-[var(--color-line)] pb-3 text-[10px] tracking-[0.25em] uppercase opacity-60"
        >
          <span></span>
          <span className="text-right text-[var(--color-accent)]">
            {slide.subjectLabel}
          </span>
          <span className="text-right">{slide.baselineLabel}</span>
        </motion.div>

        {/* Rows */}
        <div className="flex flex-col">
          {slide.rows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.5 + i * 0.08 }}
              className="grid grid-cols-[1fr_clamp(7rem,16vw,10.5rem)_clamp(5.5rem,12vw,8.5rem)] items-baseline gap-x-6 md:gap-x-10 border-b border-[var(--color-line)]/60 py-2.5 md:py-3.5"
            >
              <div>
                <div className="text-sm md:text-base text-[var(--color-paper)]/85">
                  {row.label}
                </div>
                {row.multiplier && (
                  <div className="mt-1 text-[10px] md:text-xs tracking-[0.2em] uppercase text-[var(--color-accent)]">
                    {row.multiplier}
                  </div>
                )}
              </div>
              <div
                className="font-display font-light text-right text-[var(--color-accent)] leading-none tabular-nums"
                style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)" }}
              >
                {row.subject}
              </div>
              <div
                className="font-display font-light text-right text-[var(--color-paper)]/55 leading-none tabular-nums"
                style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)" }}
              >
                {row.baseline}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideRoot>
  );
}
