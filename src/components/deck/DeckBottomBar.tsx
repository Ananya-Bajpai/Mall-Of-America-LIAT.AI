"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Tone } from "@/lib/deck/types";
import { cn } from "@/lib/utils";

type Props = {
  visible: boolean;
  tone: Tone;
  chapterLabel: string;
  slideIdx: number;
  slideCount: number;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export function DeckBottomBar({
  visible,
  tone,
  chapterLabel,
  slideIdx,
  slideCount,
  canPrev,
  canNext,
  onPrev,
  onNext,
}: Props) {
  const dark = tone !== "paper";

  return (
    <motion.footer
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 flex items-center justify-between px-4 py-4 md:px-8 md:py-6",
        dark ? "text-[var(--color-paper)]" : "text-[var(--color-ink)]",
      )}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <div className="flex items-baseline gap-3 text-[11px] tracking-[0.2em] uppercase">
        <span className="font-display text-sm normal-case tracking-normal opacity-70">
          {chapterLabel}
        </span>
        <span className="opacity-40">·</span>
        <span className="font-mono">
          {String(slideIdx + 1).padStart(2, "0")} / {String(slideCount).padStart(2, "0")}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          aria-label="Previous slide"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-current/20 bg-current/5 backdrop-blur-md transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-current/20 disabled:hover:text-current"
        >
          <ArrowLeft size={16} />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          aria-label="Next slide"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-current/20 bg-current/5 backdrop-blur-md transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-current/20 disabled:hover:text-current"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.footer>
  );
}
