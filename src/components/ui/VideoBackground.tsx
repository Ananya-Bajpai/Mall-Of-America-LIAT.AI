"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** MP4 source. If omitted, gradient placeholder renders instead (pre-asset state). */
  src?: string;
  poster?: string;
  className?: string;
  overlayClassName?: string;
  /** Pause when scrolled out of view to save CPU */
  pauseOffscreen?: boolean;
};

export function VideoBackground({
  src,
  poster,
  className,
  overlayClassName,
  pauseOffscreen = true,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!pauseOffscreen || !videoRef.current) return;
    const v = videoRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(v);
    return () => observer.disconnect();
  }, [pauseOffscreen]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {src ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      ) : (
        /* Placeholder for when real video asset isn't in place yet.
           Uses a layered gradient + radial glow for a cinematic feel. */
        <div
          aria-hidden
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(ellipse at 20% 30%, rgba(201, 169, 106, 0.25) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(214, 69, 69, 0.2) 0%, transparent 60%), linear-gradient(135deg, #0a0a0b 0%, #131315 50%, #0a0a0b 100%)",
          }}
        />
      )}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-[var(--color-ink)]/40 via-[var(--color-ink)]/20 to-[var(--color-ink)]/80",
          overlayClassName,
        )}
      />
    </div>
  );
}
