"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SlideRoot } from "./SlideRoot";
import { cn } from "@/lib/utils";
import type { TimelineSlideData } from "@/lib/deck/types";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = { slide: TimelineSlideData };

export function TimelineSlide({ slide }: Props) {
  const [idx, setIdx] = useState(0);
  const moment = slide.moments[idx];

  const setSafeIdx = (n: number) =>
    setIdx(Math.max(0, Math.min(slide.moments.length - 1, n)));

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
        </div>

        {/* Featured frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
          className="relative w-full flex-1 overflow-hidden rounded-sm border border-[var(--color-line)] bg-[var(--color-ink)]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease }}
              className="absolute inset-0"
            >
              {moment.image ? (
                <Image
                  src={moment.image}
                  alt={moment.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div
                  aria-hidden
                  className="h-full w-full"
                  style={{
                    background:
                      "radial-gradient(ellipse at 30% 40%, rgba(201, 169, 106, 0.35) 0%, transparent 60%), radial-gradient(ellipse at 75% 70%, rgba(214, 69, 69, 0.25) 0%, transparent 65%), linear-gradient(135deg, #0a0a0b 0%, #1a1a1d 50%, #0a0a0b 100%)",
                  }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/95 via-[var(--color-ink)]/30 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Featured caption */}
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={moment.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease }}
              >
                <div className="font-mono text-xs md:text-sm tracking-[0.25em] text-[var(--color-accent)]">
                  {moment.date}
                </div>
                <div
                  className="mt-2 font-display font-light leading-tight text-[var(--color-paper)]"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                >
                  {moment.title}
                </div>
                <p className="mt-3 max-w-xl text-sm md:text-base text-[var(--color-paper)]/80">
                  {moment.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Scrubber */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.55 }}
          className="mt-6 flex items-center gap-4"
        >
          <button
            type="button"
            onClick={() => setSafeIdx(idx - 1)}
            disabled={idx === 0}
            aria-label="Previous moment"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-paper)]/85 transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:opacity-30 disabled:hover:border-[var(--color-line)] disabled:hover:text-[var(--color-paper)]/85"
          >
            <ArrowLeft size={16} />
          </button>

          <div className="flex flex-1 items-center gap-1">
            {slide.moments.map((m, i) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Jump to ${m.title}`}
                className="group relative flex flex-1 flex-col items-start gap-1 py-2"
              >
                <span
                  className={cn(
                    "h-px w-full transition-all",
                    i === idx
                      ? "bg-[var(--color-accent)]"
                      : "bg-[var(--color-line)] group-hover:bg-[var(--color-paper)]/50",
                  )}
                />
                <span
                  className={cn(
                    "text-[10px] tracking-[0.18em] uppercase transition-colors",
                    i === idx
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-paper)]/50 group-hover:text-[var(--color-paper)]/80",
                  )}
                >
                  {m.date}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setSafeIdx(idx + 1)}
            disabled={idx === slide.moments.length - 1}
            aria-label="Next moment"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-paper)]/85 transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:opacity-30 disabled:hover:border-[var(--color-line)] disabled:hover:text-[var(--color-paper)]/85"
          >
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </SlideRoot>
  );
}
