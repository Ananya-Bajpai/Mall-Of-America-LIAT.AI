"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SlideRoot } from "./SlideRoot";
import { cn } from "@/lib/utils";
import type { GallerySlideData } from "@/lib/deck/types";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = { slide: GallerySlideData };

export function GallerySlide({ slide }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = slide.items[activeIdx];

  return (
    <SlideRoot tone={slide.tone ?? "ink-soft"}>
      <div className="flex flex-1 flex-col">
        <div className="max-w-3xl mb-8 md:mb-10">
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[3fr_1fr]">
          {/* Main image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.35 }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-[var(--color-line)] bg-[var(--color-ink)]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease }}
                className="absolute inset-0"
              >
                <Image
                  src={active.image}
                  alt={active.alt}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/85 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 max-w-md">
                  <div className="font-display text-2xl md:text-3xl text-[var(--color-paper)] leading-tight">
                    {active.title}
                  </div>
                  {active.caption && (
                    <p className="mt-2 text-sm text-[var(--color-paper)]/75">
                      {active.caption}
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Thumbnail rail */}
          <div className="flex flex-row gap-3 md:flex-col">
            {slide.items.map((item, i) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setActiveIdx(i)}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease, delay: 0.45 + i * 0.06 }}
                aria-label={`Show ${item.title}`}
                className={cn(
                  "relative flex-1 overflow-hidden rounded-sm border-2 transition-all aspect-square md:aspect-[4/3]",
                  activeIdx === i
                    ? "border-[var(--color-accent)] opacity-100"
                    : "border-[var(--color-line)] opacity-55 hover:opacity-90",
                )}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 768px) 15vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-ink)]/95 to-transparent p-2">
                  <div className="font-display text-[10px] md:text-xs leading-tight text-[var(--color-paper)]">
                    {item.title}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </SlideRoot>
  );
}
