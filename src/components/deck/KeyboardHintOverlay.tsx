"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard, X } from "lucide-react";

const shortcuts = [
  { keys: ["→", "Space"], label: "Next slide" },
  { keys: ["←"], label: "Previous slide" },
  { keys: ["↓"], label: "Next chapter" },
  { keys: ["↑"], label: "Previous chapter" },
  { keys: ["1–8"], label: "Jump to chapter" },
  { keys: ["H"], label: "Home / main menu" },
  { keys: ["F"], label: "Fullscreen" },
  { keys: ["?"], label: "This help" },
];

export function KeyboardHintOverlay() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target;
      if (
        t instanceof HTMLInputElement ||
        t instanceof HTMLTextAreaElement ||
        (t instanceof HTMLElement && t.isContentEditable)
      ) {
        return;
      }
      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Keyboard shortcuts"
        title="Keyboard shortcuts (?)"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-current/20 bg-current/5 backdrop-blur-md transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
      >
        <Keyboard size={15} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--color-ink)]/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[min(480px,92vw)] rounded-lg border border-[var(--color-line)] bg-[var(--color-ink)] p-8 text-[var(--color-paper)] shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 text-[var(--color-stone)] hover:text-[var(--color-paper)]"
              >
                <X size={16} />
              </button>
              <div className="eyebrow mb-5">Keyboard shortcuts</div>
              <ul className="space-y-3">
                {shortcuts.map((s) => (
                  <li key={s.label} className="flex items-center justify-between gap-6 text-sm">
                    <span className="text-[var(--color-paper)]/80">{s.label}</span>
                    <div className="flex gap-2">
                      {s.keys.map((k) => (
                        <kbd
                          key={k}
                          className="rounded border border-[var(--color-line)] bg-[var(--color-ink-soft)] px-2 py-1 font-mono text-[11px] text-[var(--color-paper)]"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
