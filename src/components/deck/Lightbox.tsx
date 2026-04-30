"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export type LightboxContent = {
  title: string;
  description?: string;
  stat?: string;
  poster: string;
  alt: string;
  /** Optional video; if absent, lightbox shows the poster fullscreen. */
  video?: string;
};

type Props = {
  content: LightboxContent | null;
  onClose: () => void;
};

/**
 * Fullscreen modal that plays a video with poster fallback. If `video` is missing
 * or fails to load, the poster image takes over with a Ken Burns push.
 */
export function Lightbox({ content, onClose }: Props) {
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reset video-failed state when content changes
  useEffect(() => {
    setVideoFailed(false);
  }, [content?.poster]);

  // Esc key + body-scroll lock
  useEffect(() => {
    if (!content) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey, true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = prev;
    };
  }, [content, onClose]);

  return (
    <AnimatePresence>
      {content && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-ink)]/95 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl px-6"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-[var(--color-line)] bg-[var(--color-ink)]">
              {content.video && !videoFailed ? (
                <video
                  ref={videoRef}
                  src={content.video}
                  poster={content.poster}
                  autoPlay
                  controls
                  playsInline
                  preload="auto"
                  onError={() => setVideoFailed(true)}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 8, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={content.poster}
                    alt={content.alt}
                    fill
                    sizes="(min-width: 1024px) 1200px, 100vw"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/85 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="font-display text-2xl md:text-3xl text-[var(--color-paper)] leading-tight">
                  {content.title}
                </div>
                {content.stat && (
                  <div className="mt-1 text-sm tracking-[0.2em] uppercase text-[var(--color-accent)]">
                    {content.stat}
                  </div>
                )}
                {content.description && (
                  <p className="mt-3 max-w-xl text-sm md:text-base text-[var(--color-paper)]/80">
                    {content.description}
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-2 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-ink)]/90 text-[var(--color-paper)] backdrop-blur transition-colors hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)]"
            >
              <X size={18} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
