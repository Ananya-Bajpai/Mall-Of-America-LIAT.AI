"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export type MapAnchor = {
  id: string;
  label: string;
  chapterId: string;
  cx: number;
  cy: number;
  width: number;
  height: number;
  shape?: "rect" | "ellipse";
};

const ANCHORS: MapAnchor[] = [
  {
    id: "center",
    label: "Nickelodeon Universe",
    chapterId: "entertainment",
    cx: 50,
    cy: 50,
    width: 26,
    height: 26,
    shape: "ellipse",
  },
  {
    id: "north",
    label: "Rotunda · Events",
    chapterId: "events",
    cx: 50,
    cy: 18,
    width: 30,
    height: 14,
  },
  {
    id: "east",
    label: "Retail",
    chapterId: "retail",
    cx: 82,
    cy: 50,
    width: 14,
    height: 30,
  },
  {
    id: "south",
    label: "Dining",
    chapterId: "dining",
    cx: 50,
    cy: 82,
    width: 30,
    height: 14,
  },
  {
    id: "west",
    label: "Luxury",
    chapterId: "luxury",
    cx: 18,
    cy: 50,
    width: 14,
    height: 30,
  },
  {
    id: "northwest",
    label: "The Stage",
    chapterId: "why",
    cx: 22,
    cy: 22,
    width: 14,
    height: 9,
  },
  {
    id: "northeast",
    label: "Partner",
    chapterId: "partner",
    cx: 78,
    cy: 22,
    width: 14,
    height: 9,
  },
];

type Props = {
  onJumpChapter: (chapterIdx: number) => void;
  chapterIndex: Record<string, number>;
  className?: string;
};

export function PropertyMap({ onJumpChapter, chapterIndex, className }: Props) {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Mall of America property map. Click any wing to jump to that chapter."
    >
      <defs>
        <pattern id="grid" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
          <path
            d="M 5 0 L 0 0 0 5"
            fill="none"
            stroke="rgba(212, 165, 89, 0.05)"
            strokeWidth="0.2"
          />
        </pattern>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(212, 165, 89, 0.35)" />
          <stop offset="100%" stopColor="rgba(212, 165, 89, 0)" />
        </radialGradient>
      </defs>

      <rect width="100" height="100" fill="url(#grid)" />

      <g stroke="rgba(212, 165, 89, 0.18)" strokeWidth="0.4" fill="none">
        <line x1="50" y1="32" x2="50" y2="68" />
        <line x1="32" y1="50" x2="68" y2="50" />
        <line x1="29" y1="29" x2="40" y2="40" />
        <line x1="71" y1="29" x2="60" y2="40" />
      </g>

      <ellipse cx="50" cy="50" rx="20" ry="20" fill="url(#centerGlow)" />

      {ANCHORS.map((anchor, i) => {
        const idx = chapterIndex[anchor.chapterId];
        if (idx === undefined) return null;
        const isCenter = anchor.shape === "ellipse";
        return (
          <motion.g
            key={anchor.id}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: reduced ? 0.2 : 0.55,
              ease,
              delay: reduced ? 0 : 0.4 + i * 0.05,
            }}
            style={{ transformOrigin: `${anchor.cx}px ${anchor.cy}px` }}
            className="cursor-pointer"
            onClick={() => onJumpChapter(idx)}
            tabIndex={0}
            role="button"
            aria-label={`Jump to ${anchor.label} chapter`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onJumpChapter(idx);
              }
            }}
          >
            {isCenter ? (
              <ellipse
                cx={anchor.cx}
                cy={anchor.cy}
                rx={anchor.width / 2}
                ry={anchor.height / 2}
                fill="rgba(212, 165, 89, 0.12)"
                stroke="rgba(212, 165, 89, 0.5)"
                strokeWidth="0.4"
                className="transition-all duration-300 hover:fill-[rgba(212,165,89,0.22)] hover:stroke-[var(--color-accent)]"
              />
            ) : (
              <rect
                x={anchor.cx - anchor.width / 2}
                y={anchor.cy - anchor.height / 2}
                width={anchor.width}
                height={anchor.height}
                fill="rgba(245, 244, 240, 0.04)"
                stroke="rgba(212, 165, 89, 0.4)"
                strokeWidth="0.3"
                className="transition-all duration-300 hover:fill-[rgba(212,165,89,0.18)] hover:stroke-[var(--color-accent)]"
              />
            )}
            <text
              x={anchor.cx}
              y={anchor.cy + 0.5}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={isCenter ? "2.3" : "1.9"}
              fontWeight="300"
              fill="rgba(245, 244, 240, 0.85)"
              className="font-display pointer-events-none select-none transition-colors"
              style={{ letterSpacing: "0.12em" }}
            >
              {anchor.label.toUpperCase()}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
