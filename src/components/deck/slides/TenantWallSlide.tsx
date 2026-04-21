"use client";

import { motion } from "framer-motion";
import { SlideRoot } from "./SlideRoot";
import { cn } from "@/lib/utils";
import type { TenantWallSlideData } from "@/lib/deck/types";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = { slide: TenantWallSlideData };

/** Brand → domain for Clearbit logo CDN. Keep in sync with flagshipTenants. */
const BRAND_DOMAINS: Record<string, string> = {
  Apple: "apple.com",
  Nike: "nike.com",
  LEGO: "lego.com",
  Uniqlo: "uniqlo.com",
  Zara: "zara.com",
  Sephora: "sephora.com",
  lululemon: "lululemon.com",
  Aritzia: "aritzia.com",
};

export function TenantWallSlide({ slide }: Props) {
  const variant = slide.variant ?? "chips";

  return (
    <SlideRoot tone={slide.tone ?? "ink"}>
      <div className="flex flex-1 flex-col justify-center">
        <div className="max-w-3xl mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="eyebrow mb-5"
          >
            {slide.eyebrow}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="font-display font-light leading-[1.05]"
            style={{ fontSize: "var(--text-display-lg)" }}
          >
            {slide.headline}
          </motion.h2>
        </div>

        {variant === "logos" ? (
          <LogoWall items={slide.items} />
        ) : (
          <ChipWall items={slide.items} />
        )}
      </div>
    </SlideRoot>
  );
}

function LogoWall({ items }: { items: string[] }) {
  const cols =
    items.length <= 6
      ? "grid-cols-2 md:grid-cols-3"
      : "grid-cols-2 md:grid-cols-4";

  return (
    <div
      className={cn(
        "grid gap-px border bg-[var(--color-line)] border-[var(--color-line)]",
        cols,
      )}
    >
      {items.map((item, i) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease, delay: 0.3 + i * 0.05 }}
          className="group relative flex h-[clamp(118px,15vh,170px)] items-center justify-center overflow-hidden bg-[var(--color-ink)] transition-colors duration-500 hover:bg-[var(--color-ink-soft)]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-accent)_0%,transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-[0.08]"
          />
          <LogoTile name={item} />
        </motion.div>
      ))}
    </div>
  );
}

function LogoTile({ name }: { name: string }) {
  const domain = BRAND_DOMAINS[name];
  return (
    <div className="relative flex flex-col items-center justify-center gap-3 px-3">
      {domain ? (
        <div className="flex h-[clamp(38px,6vh,52px)] w-[clamp(90px,12vw,130px)] items-center justify-center rounded bg-white px-3 py-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://logo.clearbit.com/${domain}`}
            alt={`${name} logo`}
            loading="lazy"
            className="max-h-full max-w-full object-contain"
            onError={(e) => {
              e.currentTarget.parentElement?.classList.add("hidden");
            }}
          />
        </div>
      ) : null}
      <span className="font-display text-[11px] md:text-xs tracking-[0.18em] uppercase text-[var(--color-paper)]/85 transition-colors duration-500 group-hover:text-[var(--color-accent)]">
        {name}
      </span>
    </div>
  );
}

function ChipWall({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-3 md:gap-4">
      {items.map((item, i) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease, delay: 0.35 + i * 0.05 }}
          className="px-5 py-3 border border-[var(--color-line)] rounded-full text-sm md:text-base text-[var(--color-paper)]/85 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
}
