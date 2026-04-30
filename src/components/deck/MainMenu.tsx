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
        overlayClassName="bg-gradient-to-b from-[var(--color-ink)]/30 via-[var(--color-ink)]/65 to-[var(--color-ink)]/95"
        pauseOffscreen={false}
      />

      <div className="relative z-10 flex h-full w-full flex-col">
        {/* Top band: brand */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="flex items-center px-4 py-4 md:px-8 md:py-6"
        >
          <div className="font-display text-xs tracking-[0.3em] uppercase">
            {mall.shortName}
          </div>
        </motion.div>

        {/* Headline */}
        <div className="flex flex-1 flex-col px-[var(--gutter)] pb-[clamp(1.5rem,4vh,2.5rem)]">
          <div className="mx-auto flex w-full max-w-[var(--max-content)] flex-1 items-center">
            <div className="flex max-w-3xl flex-col">
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
                style={{ fontSize: "var(--text-display-lg)" }}
              >
                {mall.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.55 }}
                className="mt-5 max-w-xl text-base md:text-lg font-light leading-relaxed text-[var(--color-paper)]/80"
              >
                {mall.positioning}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.7 }}
                className="mt-7 flex flex-col items-start gap-5"
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
                <div className="flex gap-6 md:gap-8">
                  {mall.heroStats.map((s) => (
                    <div key={s.label}>
                      <div className="font-display text-xl md:text-2xl font-light leading-none">
                        {s.value}
                      </div>
                      <div className="mt-1 text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[var(--color-paper)]/60">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom band: chapter tile rail */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.85 }}
          aria-label="Chapter index"
          className="mx-auto w-full max-w-[var(--max-content)] px-[var(--gutter)] pb-[clamp(1rem,3vh,2rem)]"
        >
          <div className="eyebrow mb-3 text-[var(--color-paper)]/60">
            All chapters
          </div>
          <ul className="grid grid-cols-2 gap-2 md:gap-3 sm:grid-cols-3 lg:grid-cols-9">
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
                      sizes="(min-width: 1024px) 11vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover opacity-70 transition-all duration-[1200ms] ease-out group-hover:opacity-95 group-hover:scale-[1.04]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/95 via-[var(--color-ink)]/40 to-[var(--color-ink)]/10 transition-opacity group-hover:from-[var(--color-ink)]/85" />
                  <div className="relative z-10 flex h-full flex-col justify-end p-2 md:p-3">
                    <div className="font-mono text-[9px] tracking-[0.2em] text-[var(--color-accent)]">
                      {String(c.index).padStart(2, "0")}
                    </div>
                    <div className="mt-1 font-display text-xs md:text-sm leading-tight text-[var(--color-paper)] group-hover:text-[var(--color-accent)] transition-colors">
                      {c.label}
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
