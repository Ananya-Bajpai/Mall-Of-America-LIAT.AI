"use client";

import { useEffect, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

export function FullscreenToggle() {
  const [isFull, setIsFull] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof document === "undefined") return;
    setSupported(!!document.documentElement.requestFullscreen);

    const onChange = () => setIsFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);

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
      if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const toggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isFull ? "Exit fullscreen" : "Enter fullscreen"}
      title={isFull ? "Exit fullscreen (F)" : "Fullscreen (F)"}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-current/20 bg-current/5 backdrop-blur-md transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
    >
      {isFull ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
    </button>
  );
}
