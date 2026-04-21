"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SlideRoot } from "./SlideRoot";
import type { AttractionSlideData } from "@/lib/deck/types";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = { slide: AttractionSlideData };

export function AttractionSlide({ slide }: Props) {
  return (
    <SlideRoot tone={slide.tone ?? "ink"} contentClassName="!p-0">
      <div className="grid h-full w-full grid-cols-1 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease }}
          className="relative lg:col-span-7 min-h-[42vh] lg:min-h-0"
        >
          <Image
            src={slide.image}
            alt={slide.name}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-ink)]/70 via-[var(--color-ink)]/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[var(--color-ink)]/70" />
        </motion.div>

        <div className="relative lg:col-span-5 flex flex-col justify-center px-[var(--gutter)] py-[clamp(3rem,8vh,5rem)] lg:py-[clamp(5rem,10vh,7rem)]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="eyebrow mb-5"
          >
            {slide.eyebrow}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="font-display font-light leading-[1.02] text-[var(--color-paper)]"
            style={{ fontSize: "var(--text-display-md)" }}
          >
            {slide.name}
          </motion.h2>

          {slide.stat && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.45 }}
              className="mt-5 font-mono text-xs tracking-[0.2em] uppercase text-[var(--color-accent)]"
            >
              {slide.stat}
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.55 }}
            className="mt-6 text-base md:text-lg font-light leading-relaxed text-[var(--color-paper)]/80 max-w-md"
          >
            {slide.description}
          </motion.p>
        </div>
      </div>
    </SlideRoot>
  );
}
