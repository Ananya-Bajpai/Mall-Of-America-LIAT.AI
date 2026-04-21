"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { deck } from "@/lib/deck/chapters";
import { cn } from "@/lib/utils";

type Props = {
  currentChapterIdx: number;
  onJump: (ci: number) => void;
};

const ease = [0.16, 1, 0.3, 1] as const;

export function ChapterDropdown({ currentChapterIdx, onJump }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Skip chapter 0 (main menu) — that's the home button's job.
  const chapters = deck.chapters.slice(1);
  const active = deck.chapters[currentChapterIdx];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="group flex items-center gap-2 rounded-full border border-current/20 bg-current/5 px-4 py-2 text-[11px] tracking-[0.22em] uppercase backdrop-blur-md transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
      >
        <span className="font-mono text-[10px] opacity-60">
          {String(currentChapterIdx).padStart(2, "0")}
        </span>
        <span className="whitespace-nowrap">{active.label}</span>
        <ChevronDown
          size={14}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.2, ease }}
            role="menu"
            className="absolute right-0 top-[calc(100%+10px)] z-50 min-w-[260px] rounded-md border border-[var(--color-line)] bg-[var(--color-ink)]/95 p-2 shadow-2xl backdrop-blur-xl"
          >
            {chapters.map((c) => {
              const isActive = c.index === currentChapterIdx;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    onJump(c.index);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-baseline gap-4 rounded px-3 py-2.5 text-left transition-colors",
                    isActive
                      ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                      : "text-[var(--color-paper)] hover:bg-[var(--color-ink-soft)]",
                  )}
                >
                  <span className="font-mono text-[10px] text-[var(--color-stone)]">
                    {String(c.index).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="font-display text-base leading-tight">
                      {c.label}
                    </div>
                    <div className="mt-0.5 text-[10px] tracking-[0.15em] uppercase text-[var(--color-stone)]">
                      {c.tagline}
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
