"use client";

import { motion } from "framer-motion";
import { SlideRoot } from "./SlideRoot";
import { StatCounter } from "@/components/ui/StatCounter";
import { cn } from "@/lib/utils";
import type { CoverSlideData } from "@/lib/deck/types";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = { slide: CoverSlideData };

export function CoverSlide({ slide }: Props) {
  const hasStats = !!slide.stats && slide.stats.length > 0;
  const hasMetrics = !!slide.metrics && slide.metrics.length > 0;

  return (
    <SlideRoot tone={slide.tone ?? "ink"} bg={slide.bg}>
      <div className="flex flex-1 flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="eyebrow mb-6"
        >
          {slide.eyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.25 }}
          className="font-display font-light leading-[0.98] max-w-5xl"
          style={{ fontSize: "clamp(2.75rem, 6.5vw, 6rem)" }}
        >
          {slide.headline}
        </motion.h1>

        {slide.body && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.45 }}
            className="mt-7 max-w-2xl text-base md:text-lg lg:text-xl font-light leading-relaxed opacity-80"
          >
            {slide.body}
          </motion.p>
        )}

        {hasStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.6 }}
            className={cn(
              "mt-10 grid gap-6 md:gap-10 max-w-4xl border-t border-[var(--color-line)] pt-6",
              slide.stats!.length === 4
                ? "grid-cols-2 md:grid-cols-4"
                : slide.stats!.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-3",
            )}
          >
            {slide.stats!.map((stat) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                label={stat.label}
                detail={stat.detail}
              />
            ))}
          </motion.div>
        )}

        {hasMetrics && (
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.6 }}
            className="mt-8 max-w-xl space-y-3 text-sm opacity-80"
          >
            {slide.metrics!.map((m) => (
              <li
                key={m.label}
                className="flex justify-between border-b border-current/10 pb-3"
              >
                <span>{m.label}</span>
                <span className="font-medium">{m.value}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </SlideRoot>
  );
}
