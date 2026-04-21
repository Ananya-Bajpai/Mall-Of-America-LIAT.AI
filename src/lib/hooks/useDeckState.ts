"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { deck } from "@/lib/deck/chapters";
import type { DeckPosition } from "@/lib/deck/types";

const HOME: DeckPosition = { chapterIdx: 0, slideIdx: 0 };

function parseHash(hash: string): DeckPosition | null {
  const clean = hash.replace(/^#\/?/, "");
  if (!clean) return null;
  const [chapterId, slideStr] = clean.split("/");
  const chapterIdx = deck.chapters.findIndex((c) => c.id === chapterId);
  if (chapterIdx < 0) return null;
  const slideIdx = Math.max(
    0,
    Math.min(
      deck.chapters[chapterIdx].slides.length - 1,
      Number.parseInt(slideStr ?? "0", 10) || 0,
    ),
  );
  return { chapterIdx, slideIdx };
}

function toHash(pos: DeckPosition): string {
  if (pos.chapterIdx === 0) return "#/";
  const chapter = deck.chapters[pos.chapterIdx];
  return `#/${chapter.id}/${pos.slideIdx}`;
}

export function useDeckState() {
  const [pos, setPos] = useState<DeckPosition>(HOME);
  const posRef = useRef<DeckPosition>(HOME);
  posRef.current = pos;

  /** Jump to an exact position. Clamped safely. */
  const goto = useCallback((ci: number, si: number) => {
    const chapterIdx = Math.max(0, Math.min(deck.chapters.length - 1, ci));
    const slideIdx = Math.max(
      0,
      Math.min(deck.chapters[chapterIdx].slides.length - 1, si),
    );
    const next = { chapterIdx, slideIdx };
    setPos(next);
    if (typeof window !== "undefined") {
      const hash = toHash(next);
      if (window.location.hash !== hash) {
        history.pushState(null, "", hash);
      }
    }
  }, []);

  const openMainMenu = useCallback(() => goto(0, 0), [goto]);

  const jumpToChapter = useCallback(
    (ci: number) => goto(ci, 0),
    [goto],
  );

  const next = useCallback(() => {
    const p = posRef.current;
    const chapter = deck.chapters[p.chapterIdx];
    if (p.slideIdx < chapter.slides.length - 1) {
      goto(p.chapterIdx, p.slideIdx + 1);
    } else if (p.chapterIdx < deck.chapters.length - 1) {
      goto(p.chapterIdx + 1, 0);
    }
  }, [goto]);

  const prev = useCallback(() => {
    const p = posRef.current;
    if (p.slideIdx > 0) {
      goto(p.chapterIdx, p.slideIdx - 1);
    } else if (p.chapterIdx > 0) {
      const prevChapter = deck.chapters[p.chapterIdx - 1];
      goto(p.chapterIdx - 1, prevChapter.slides.length - 1);
    }
  }, [goto]);

  /** Hash sync on mount + hashchange/popstate. */
  useEffect(() => {
    const apply = () => {
      const parsed = parseHash(window.location.hash);
      if (parsed) {
        setPos(parsed);
      } else {
        setPos(HOME);
      }
    };
    apply();
    window.addEventListener("hashchange", apply);
    window.addEventListener("popstate", apply);
    return () => {
      window.removeEventListener("hashchange", apply);
      window.removeEventListener("popstate", apply);
    };
  }, []);

  /** Global keyboard bindings for navigation. Menu/fullscreen are handled by DeckShell. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        next();
        return;
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const p = posRef.current;
        jumpToChapter(Math.min(deck.chapters.length - 1, p.chapterIdx + 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const p = posRef.current;
        jumpToChapter(Math.max(0, p.chapterIdx - 1));
        return;
      }
      if (/^[1-9]$/.test(e.key)) {
        const idx = Number.parseInt(e.key, 10) - 1;
        if (idx < deck.chapters.length) {
          e.preventDefault();
          jumpToChapter(idx);
        }
        return;
      }
      if (e.key === "Home" || e.key.toLowerCase() === "h") {
        e.preventDefault();
        openMainMenu();
        return;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, jumpToChapter, openMainMenu]);

  const chapter = deck.chapters[pos.chapterIdx];
  const slide = chapter.slides[pos.slideIdx];
  const isMainMenu = pos.chapterIdx === 0;

  const totalChapters = deck.chapters.length;

  const canPrev = useMemo(
    () => pos.chapterIdx > 0 || pos.slideIdx > 0,
    [pos],
  );
  const canNext = useMemo(
    () =>
      pos.chapterIdx < deck.chapters.length - 1 ||
      pos.slideIdx < chapter.slides.length - 1,
    [pos, chapter],
  );

  return {
    pos,
    chapter,
    slide,
    isMainMenu,
    totalChapters,
    canPrev,
    canNext,
    next,
    prev,
    goto,
    jumpToChapter,
    openMainMenu,
  };
}
