"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { CinematicSlideData } from "@/lib/deck/types";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = {
  slide: CinematicSlideData;
  /** Called when the cinematic finishes (video ended or fallback duration elapsed). */
  onComplete?: () => void;
};

/**
 * Full-bleed transitional cinematic. Plays the MP4 if it resolves; otherwise the
 * poster runs as a slow Ken Burns push and auto-advances after fallbackDurationMs.
 * Click anywhere or press → / Space to skip ahead.
 */
export function CinematicSlide({ slide, onComplete }: Props) {
  const reduced = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackMs = slide.fallbackDurationMs ?? 4500;
  const showVideo = !!slide.video && !videoFailed;

  // Fallback auto-advance (when video isn't available or fails to load)
  useEffect(() => {
    if (showVideo) return;
    if (!onComplete) return;
    const t = setTimeout(onComplete, reduced ? 600 : fallbackMs);
    return () => clearTimeout(t);
  }, [showVideo, onComplete, fallbackMs, reduced]);

  return (
    <button
      type="button"
      onClick={() => onComplete?.()}
      aria-label={`${slide.alt}. Click to skip cinematic.`}
      className="relative h-full w-full cursor-pointer overflow-hidden bg-[var(--color-ink)] text-left"
    >
      {showVideo ? (
        <video
          ref={videoRef}
          src={slide.video}
          poster={slide.poster}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={onComplete}
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <motion.div
          key={slide.poster}
          initial={{ scale: 1.0, opacity: 0 }}
          animate={
            reduced
              ? { scale: 1, opacity: 1 }
              : { scale: 1.08, opacity: 1 }
          }
          transition={{
            opacity: { duration: 0.6, ease },
            scale: { duration: fallbackMs / 1000, ease: "linear" },
          }}
          className="absolute inset-0"
        >
          <Image
            src={slide.poster}
            alt={slide.alt}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </motion.div>
      )}

      {/* Cinematic letterbox + bottom-darken for text legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-ink)]/30 via-transparent to-[var(--color-ink)]/85"
      />

      <div className="relative z-10 flex h-full w-full flex-col justify-end px-[var(--gutter)] pb-[clamp(5rem,12vh,8rem)]">
        <div className="mx-auto w-full max-w-[var(--max-content)]">
          {slide.eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 1.2 }}
              className="eyebrow mb-4 text-[var(--color-paper)]"
            >
              {slide.eyebrow}
            </motion.div>
          )}
          {slide.title && (
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 1.5 }}
              className="font-display font-light leading-[0.95] text-[var(--color-paper)]"
              style={{ fontSize: "var(--text-display-lg)" }}
            >
              {slide.title}
            </motion.h2>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.6, ease, delay: 2.2 }}
            className="mt-6 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[var(--color-paper)]/70"
          >
            <span>Skip</span>
            <ChevronRight size={14} />
          </motion.div>
        </div>
      </div>
    </button>
  );
}
