"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { mall, type SectionId } from "@/lib/data/mall-of-america";
import { cn } from "@/lib/utils";

export function DeckNavigation() {
  const [active, setActive] = useState<SectionId>("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const jumpTo = useCallback((id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  }, []);

  /** Returns the index of the section currently dominant in the viewport,
   *  computed from live scroll position. Deterministic — never skips a section. */
  const getCurrentIdx = useCallback(() => {
    const probe = window.scrollY + window.innerHeight * 0.35;
    let idx = 0;
    for (let i = 0; i < mall.sections.length; i++) {
      const el = document.getElementById(mall.sections[i].id);
      if (el && el.offsetTop <= probe) idx = i;
    }
    return idx;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
      setActive(mall.sections[getCurrentIdx()].id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [getCurrentIdx]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const idx = getCurrentIdx();
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === "j") {
        e.preventDefault();
        jumpTo(mall.sections[Math.min(mall.sections.length - 1, idx + 1)].id);
      } else if (e.key === "ArrowUp" || e.key === "PageUp" || e.key === "k") {
        e.preventDefault();
        jumpTo(mall.sections[Math.max(0, idx - 1)].id);
      } else if (e.key === "Escape") {
        setMenuOpen(false);
      } else if (e.key === "m") {
        setMenuOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [getCurrentIdx, jumpTo]);

  return (
    <>
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-[var(--color-accent)] origin-left"
        style={{ transform: `scaleX(${progress})` }}
      />

      {/* Top-left brand mark */}
      <div className="fixed top-6 left-6 md:top-8 md:left-10 z-40 pointer-events-none">
        <div className="font-display text-sm tracking-[0.3em] uppercase text-[var(--color-paper)] mix-blend-difference">
          {mall.shortName}
        </div>
      </div>

      {/* Top-right menu button */}
      <button
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        className="fixed top-5 right-5 md:top-7 md:right-9 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-ink)]/60 backdrop-blur-md text-[var(--color-paper)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
      >
        {menuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Dot nav (desktop) — right-anchored, labels float left without disturbing dots */}
      <nav
        aria-label="Section navigation"
        className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-6"
      >
        {mall.sections.map((section) => {
          const isActive = active === section.id;
          return (
            <button
              key={section.id}
              onClick={() => jumpTo(section.id)}
              aria-label={`Go to ${section.label}`}
              aria-current={isActive ? "true" : undefined}
              className="group relative flex h-3 w-3 items-center justify-center"
            >
              {/* Label: absolutely positioned so it never shifts the dot */}
              <span
                className={cn(
                  "pointer-events-none absolute right-6 whitespace-nowrap font-sans text-[11px] tracking-[0.2em] uppercase transition-all duration-300",
                  isActive
                    ? "opacity-100 text-[var(--color-paper)] translate-x-0"
                    : "opacity-0 translate-x-2 text-[var(--color-stone)] group-hover:opacity-70 group-hover:translate-x-0",
                )}
              >
                {section.label}
              </span>
              {/* Dot — always centered in a fixed 12×12 hit area */}
              <span
                className={cn(
                  "block rounded-full border transition-all duration-300",
                  isActive
                    ? "h-2.5 w-2.5 border-[var(--color-accent)] bg-[var(--color-accent)]"
                    : "h-1.5 w-1.5 border-[var(--color-stone)] bg-transparent group-hover:border-[var(--color-paper)]",
                )}
              />
            </button>
          );
        })}
      </nav>

      {/* Overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[var(--color-ink)]/95 backdrop-blur-xl"
          >
            <div className="flex h-full w-full flex-col items-start justify-center px-8 md:px-20 gap-2 max-w-[var(--max-content)] mx-auto">
              <div className="eyebrow mb-8">Navigate</div>
              {mall.sections.map((section, i) => (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.05,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => jumpTo(section.id)}
                  className="group flex items-baseline gap-6 text-left"
                >
                  <span className="font-mono text-xs text-[var(--color-stone)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "font-display text-4xl md:text-6xl leading-[1.1] transition-colors",
                      active === section.id
                        ? "text-[var(--color-accent)]"
                        : "text-[var(--color-paper)] group-hover:text-[var(--color-accent-bright)]",
                    )}
                  >
                    {section.label}
                  </span>
                </motion.button>
              ))}
              <div className="mt-12 text-xs text-[var(--color-stone)] font-mono">
                Use ↑ ↓ to navigate · M to toggle menu · ESC to close
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
