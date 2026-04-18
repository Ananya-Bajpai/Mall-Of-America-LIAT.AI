"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { DeckSection } from "@/components/deck/DeckSection";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { mall } from "@/lib/data/mall-of-america";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export function HeroOpening() {
  return (
    <DeckSection id="hero" fullBleed className="min-h-screen flex items-end">
      <VideoBackground
        /* TODO: swap with real MP4 once asset is exported */
        overlayClassName="bg-gradient-to-b from-[var(--color-ink)]/20 via-transparent to-[var(--color-ink)]/95"
      />

      <div className="relative z-10 w-full max-w-[var(--max-content)] mx-auto px-[var(--gutter)] pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.2 }}
          className="eyebrow mb-6"
        >
          {mall.location}
        </motion.div>

        <h1 className="font-display font-light leading-[0.95] text-[var(--color-paper)] max-w-5xl">
          {mall.name.split(" ").map((word, i) => (
            <motion.span
              key={i}
              className="inline-block overflow-hidden mr-[0.25em]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.9,
                ease: easeOutExpo,
                delay: 0.3 + i * 0.1,
              }}
              style={{ fontSize: "var(--text-display-xl)" }}
            >
              <span className="inline-block">{word}</span>
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.9 }}
          className="mt-8 max-w-2xl text-lg md:text-xl text-[var(--color-paper)]/80 font-light leading-relaxed"
        >
          {mall.positioning}
        </motion.p>

        {/* Hero stat band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOutExpo, delay: 1.2 }}
          className="mt-16 grid grid-cols-3 gap-6 md:gap-12 max-w-3xl border-t border-[var(--color-line)] pt-8"
        >
          {mall.heroStats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-3xl md:text-5xl font-light tracking-tight text-[var(--color-paper)]">
                {stat.value}
              </div>
              <div className="mt-2 text-[10px] md:text-xs tracking-[0.2em] uppercase text-[var(--color-stone)]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-stone)]">
          Scroll
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-[var(--color-accent)]"
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </DeckSection>
  );
}
