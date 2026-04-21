"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { VideoBackground } from "@/components/ui/VideoBackground";
import type { SlideBg, Tone } from "@/lib/deck/types";

const toneClass: Record<Tone, string> = {
  ink: "bg-[var(--color-ink)] text-[var(--color-paper)]",
  "ink-soft": "bg-[var(--color-ink-soft)] text-[var(--color-paper)]",
  paper: "bg-[var(--color-paper)] text-[var(--color-ink)]",
};

type Props = {
  tone?: Tone;
  bg?: SlideBg;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
};

/**
 * Base frame for every slide. Handles tone color, optional media background,
 * chrome-aware padding (top/bottom reserved for DeckTopBar / DeckBottomBar).
 */
export function SlideRoot({ tone = "ink", bg, className, contentClassName, children }: Props) {
  const toneBg = toneClass[tone];
  return (
    <div className={cn("relative h-full w-full overflow-hidden", toneBg, className)}>
      {bg?.kind === "video" && (
        <VideoBackground src={bg.src} overlayClassName={bg.overlay} pauseOffscreen={false} />
      )}
      {bg?.kind === "image" && (
        <div className="absolute inset-0">
          <Image src={bg.src} alt={bg.alt} fill sizes="100vw" priority className="object-cover" />
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-b from-[var(--color-ink)]/40 via-[var(--color-ink)]/20 to-[var(--color-ink)]/80",
              bg.overlay,
            )}
          />
        </div>
      )}
      <div
        className={cn(
          "relative z-10 flex h-full w-full flex-col",
          "px-[var(--gutter)] pt-[clamp(5rem,12vh,8rem)] pb-[clamp(5rem,10vh,7rem)]",
          contentClassName,
        )}
      >
        <div className="mx-auto flex h-full w-full max-w-[var(--max-content)] flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
