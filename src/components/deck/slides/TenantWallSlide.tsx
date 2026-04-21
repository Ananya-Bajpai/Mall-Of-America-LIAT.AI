"use client";

import { motion } from "framer-motion";
import { SlideRoot } from "./SlideRoot";
import { cn } from "@/lib/utils";
import type { TenantWallSlideData } from "@/lib/deck/types";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = { slide: TenantWallSlideData };

export function TenantWallSlide({ slide }: Props) {
  const variant = slide.variant ?? "chips";

  return (
    <SlideRoot tone={slide.tone ?? "ink"}>
      <div className="flex flex-1 flex-col">
        <div className="max-w-3xl mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="eyebrow mb-5"
          >
            {slide.eyebrow}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="font-display font-light leading-[1.05]"
            style={{ fontSize: "var(--text-display-lg)" }}
          >
            {slide.headline}
          </motion.h2>
        </div>

        {variant === "logos" ? (
          <LogoWall items={slide.items} />
        ) : (
          <ChipWall items={slide.items} />
        )}
      </div>
    </SlideRoot>
  );
}

function LogoWall({ items }: { items: string[] }) {
  // 2×4 desktop / 2×4 tablet / 2 col mobile — dense brand board.
  const cols =
    items.length <= 6
      ? "grid-cols-2 md:grid-cols-3"
      : items.length <= 8
        ? "grid-cols-2 md:grid-cols-4"
        : "grid-cols-2 md:grid-cols-4 lg:grid-cols-5";

  return (
    <div
      className={cn(
        "mt-auto grid gap-px border bg-[var(--color-line)] border-[var(--color-line)]",
        cols,
      )}
    >
      {items.map((item, i) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease, delay: 0.3 + i * 0.05 }}
          className="group relative flex aspect-[5/3] items-center justify-center overflow-hidden bg-[var(--color-ink)] transition-colors duration-500 hover:bg-[var(--color-ink-soft)]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-accent)_0%,transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-[0.08]"
          />
          <span
            className="relative font-display font-light tracking-tight text-[var(--color-paper)] transition-colors duration-500 group-hover:text-[var(--color-accent)]"
            style={{ fontSize: "clamp(1.4rem, 2.4vw, 2.15rem)" }}
          >
            {item}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function ChipWall({ items }: { items: string[] }) {
  return (
    <div className="mt-auto flex flex-wrap gap-3 md:gap-4">
      {items.map((item, i) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease, delay: 0.35 + i * 0.05 }}
          className="px-5 py-3 border border-[var(--color-line)] rounded-full text-sm md:text-base text-[var(--color-paper)]/85 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
}
