"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { SlideRoot } from "./SlideRoot";
import type { Hotspot, HotspotSlideData } from "@/lib/deck/types";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = { slide: HotspotSlideData };

export function HotspotSlide({ slide }: Props) {
  const [active, setActive] = useState<Hotspot | null>(null);

  return (
    <SlideRoot tone={slide.tone ?? "ink"}>
      <div className="flex flex-1 flex-col">
        <div className="max-w-3xl mb-6">
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
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.6, ease, delay: 0.4 }}
            className="mt-3 text-xs md:text-sm tracking-[0.2em] uppercase"
          >
            Tap each anchor to learn more
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.35 }}
          className="relative w-full flex-1 overflow-hidden rounded-sm border border-[var(--color-line)] bg-[var(--color-ink)]"
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/60 via-transparent to-transparent" />

          {slide.hotspots.map((h, i) => (
            <button
              key={h.id}
              type="button"
              onClick={() => setActive(h)}
              aria-label={`${h.label} hotspot`}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease, delay: 0.6 + i * 0.08 }}
                className="relative flex h-10 w-10 items-center justify-center"
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-30" />
                <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-ink)] text-[var(--color-accent)] transition-transform group-hover:scale-110">
                  <Plus size={14} strokeWidth={2.5} />
                </span>
              </motion.span>
              <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-[var(--color-ink)]/95 px-2 py-1 text-[10px] tracking-[0.18em] uppercase text-[var(--color-paper)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {h.label}
              </span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-ink)]/80 backdrop-blur-sm"
              onClick={() => setActive(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md rounded-sm border border-[var(--color-line)] bg-[var(--color-ink)] p-8 text-[var(--color-paper)]"
              >
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="absolute right-4 top-4 rounded-full p-1 text-[var(--color-paper)]/70 hover:text-[var(--color-accent)]"
                >
                  <X size={18} />
                </button>
                <div className="eyebrow mb-3 text-[var(--color-accent)]">
                  Anchor brand
                </div>
                <h3 className="font-display text-2xl md:text-3xl leading-tight">
                  {active.label}
                </h3>
                {active.stat && (
                  <div
                    className="mt-4 font-display font-light text-[var(--color-accent)]"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                  >
                    {active.stat}
                  </div>
                )}
                {active.detail && (
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-paper)]/80">
                    {active.detail}
                  </p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SlideRoot>
  );
}
