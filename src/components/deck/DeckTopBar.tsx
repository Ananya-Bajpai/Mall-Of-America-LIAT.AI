"use client";

import { motion } from "framer-motion";
import { mall } from "@/lib/data/mall-of-america";
import { ChapterDropdown } from "./ChapterDropdown";
import { FullscreenToggle } from "./FullscreenToggle";
import { KeyboardHintOverlay } from "./KeyboardHintOverlay";
import type { Tone } from "@/lib/deck/types";
import { cn } from "@/lib/utils";

type Props = {
  visible: boolean;
  tone: Tone;
  currentChapterIdx: number;
  onHome: () => void;
  onJumpChapter: (ci: number) => void;
};

export function DeckTopBar({
  visible,
  tone,
  currentChapterIdx,
  onHome,
  onJumpChapter,
}: Props) {
  const dark = tone !== "paper";
  return (
    <motion.header
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-4 md:px-8 md:py-6",
        dark ? "text-[var(--color-paper)]" : "text-[var(--color-ink)]",
      )}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <button
        type="button"
        onClick={onHome}
        aria-label="Back to main menu"
        title="Home (H)"
        className="pointer-events-auto font-display text-xs tracking-[0.3em] uppercase transition-colors hover:text-[var(--color-accent)]"
      >
        {mall.shortName}
      </button>

      <div className="pointer-events-auto flex items-center gap-2 md:gap-3">
        <ChapterDropdown
          currentChapterIdx={currentChapterIdx}
          onJump={onJumpChapter}
        />
        <FullscreenToggle />
        <KeyboardHintOverlay />
      </div>
    </motion.header>
  );
}
