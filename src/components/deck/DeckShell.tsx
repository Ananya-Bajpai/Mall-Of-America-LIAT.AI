"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDeckState } from "@/lib/hooks/useDeckState";
import { useSwipe } from "@/lib/hooks/useSwipe";
import { SlideStage } from "./SlideStage";
import { DeckTopBar } from "./DeckTopBar";
import { DeckBottomBar } from "./DeckBottomBar";
import { MainMenu } from "./MainMenu";

const IDLE_MS = 3500;

export function DeckShell() {
  const {
    pos,
    chapter,
    slide,
    isMainMenu,
    canPrev,
    canNext,
    next,
    prev,
    jumpToChapter,
    openMainMenu,
  } = useDeckState();

  const [chromeVisible, setChromeVisible] = useState(true);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-hide chrome on desktop after IDLE_MS of inactivity. Always visible on touch devices.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasPointer = window.matchMedia?.("(hover: hover)").matches ?? false;
    if (!hasPointer) {
      setChromeVisible(true);
      return;
    }

    const bump = () => {
      setChromeVisible(true);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setChromeVisible(false), IDLE_MS);
    };
    bump();
    window.addEventListener("mousemove", bump);
    window.addEventListener("keydown", bump);
    window.addEventListener("touchstart", bump, { passive: true });
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      window.removeEventListener("mousemove", bump);
      window.removeEventListener("keydown", bump);
      window.removeEventListener("touchstart", bump);
    };
  }, []);

  useSwipe(containerRef, {
    onSwipeLeft: next,
    onSwipeRight: prev,
  });

  // Chrome shouldn't show on main menu — menu has its own affordances.
  const showChrome = !isMainMenu && chromeVisible;
  const slideKey = `${pos.chapterIdx}:${pos.slideIdx}`;
  const chapterTone = chapter.tone;

  return (
    <div
      ref={containerRef}
      className="relative h-dvh w-screen overflow-hidden bg-[var(--color-ink)]"
    >
      <AnimatePresence mode="wait">
        {isMainMenu ? (
          <motion.div
            key="main-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <MainMenu onJumpChapter={jumpToChapter} />
          </motion.div>
        ) : (
          <motion.div
            key="deck-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <SlideStage slide={slide} slideKey={slideKey} onAdvance={next} />
          </motion.div>
        )}
      </AnimatePresence>

      <DeckTopBar
        visible={showChrome}
        tone={chapterTone}
        currentChapterIdx={pos.chapterIdx}
        onHome={openMainMenu}
        onJumpChapter={jumpToChapter}
      />

      <DeckBottomBar
        visible={showChrome}
        tone={chapterTone}
        chapterLabel={chapter.label}
        slideIdx={pos.slideIdx}
        slideCount={chapter.slides.length}
        canPrev={canPrev}
        canNext={canNext}
        onPrev={prev}
        onNext={next}
      />
    </div>
  );
}
