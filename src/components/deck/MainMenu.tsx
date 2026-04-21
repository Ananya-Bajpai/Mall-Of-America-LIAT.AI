"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { mall } from "@/lib/data/mall-of-america";
import { deck } from "@/lib/deck/chapters";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = {
  onJumpChapter: (ci: number) => void;
};

export function MainMenu({ onJumpChapter }: Props) {
  // Chapters 1..n — the cover chapter (0) is this screen itself.
  const chapters = deck.chapters.slice(1);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)]">
      <VideoBackground
        src="/videos/hero.mp4"
        overlayClassName="bg-gradient-to-b from-[var(--color-ink)]/20 via-[var(--color-ink)]/55 to-[var(--color-ink)]/92"
        pauseOffscreen={false}
      />

      <div className="relative z-10 flex h-full w-full flex-col">
        {/* Top band: brand */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="flex items-center justify-between px-4 py-4 md:px-8 md:py-6"
        >
          <div className="font-display text-xs tracking-[0.3em] uppercase">
            {mall.shortName}
          </div>
          <div className="hidden sm:block text-[10px] tracking-[0.25em] uppercase text-[var(--color-paper)]/60">
            Interactive sales deck
          </div>
        </motion.div>

        {/* Middle: headline block */}
        <div className="flex flex-1 flex-col justify-center px-[var(--gutter)] pt-[clamp(1.5rem,5vh,3rem)] pb-[clamp(1.5rem,5vh,3rem)]">
          <div className="mx-auto w-full max-w-[var(--max-content)]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.25 }}
              className="eyebrow mb-5"
            >
              {mall.location}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.35 }}
              className="font-display font-light leading-[0.95]"
              style={{ fontSize: "var(--text-display-xl)" }}
            >
              {mall.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.55 }}
              className="mt-6 max-w-2xl text-base md:text-lg lg:text-xl font-light leading-relaxed text-[var(--color-paper)]/80"
            >
              {mall.positioning}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.7 }}
              className="mt-8 flex flex-wrap items-center gap-6 md:gap-10"
            >
              <button
                type="button"
                onClick={() => onJumpChapter(1)}
                className="group inline-flex items-center gap-3 rounded-full border border-[var(--color-accent)]/60 bg-[var(--color-accent)]/10 px-6 py-3 text-sm tracking-[0.15em] uppercase text-[var(--color-accent)] backdrop-blur-md transition hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)]"
              >
                <span>Begin the tour</span>
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
              <div className="flex gap-8 md:gap-10">
                {mall.heroStats.map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-2xl md:text-3xl font-light leading-none">
                      {s.value}
                    </div>
                    <div className="mt-1 text-[10px] tracking-[0.2em] uppercase text-[var(--color-paper)]/60">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom band: chapter tiles */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.85 }}
          aria-label="Chapter index"
          className="mx-auto w-full max-w-[var(--max-content)] px-[var(--gutter)] pb-[clamp(1.5rem,4vh,2.5rem)]"
        >
          <div className="eyebrow mb-4 text-[var(--color-paper)]/60">
            Chapters
          </div>
          <ul className="grid grid-cols-2 gap-2 md:gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {chapters.map((c, i) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => onJumpChapter(c.index)}
                  className={cn(
                    "group relative block h-full w-full overflow-hidden rounded-sm border border-[var(--color-paper)]/10 bg-[var(--color-ink)]/40 backdrop-blur-md text-left transition-colors hover:border-[var(--color-accent)]",
                    "aspect-[4/5]",
                  )}
                  style={{
                    transitionDelay: `${i * 30}ms`,
                  }}
                >
                  {c.tile.isVideo ? null : (
                    <Image
                      src={c.tile.image}
                      alt={c.tile.alt}
                      fill
                      sizes="(min-width: 1024px) 15vw, (min-width: 640px) 25vw, 50vw"
                      className="object-cover opacity-70 transition-all duration-[1200ms] ease-out group-hover:opacity-95 group-hover:scale-[1.04]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/95 via-[var(--color-ink)]/40 to-[var(--color-ink)]/10 transition-opacity group-hover:from-[var(--color-ink)]/85" />
                  <div className="relative z-10 flex h-full flex-col justify-end p-3 md:p-4">
                    <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-accent)]">
                      {String(c.index).padStart(2, "0")}
                    </div>
                    <div className="mt-1 font-display text-sm md:text-base leading-tight text-[var(--color-paper)] group-hover:text-[var(--color-accent)] transition-colors">
                      {c.label}
                    </div>
                    <div className="mt-1 text-[10px] md:text-[11px] text-[var(--color-paper)]/60 leading-snug">
                      {c.tagline}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </motion.nav>
      </div>
    </div>
  );
}
