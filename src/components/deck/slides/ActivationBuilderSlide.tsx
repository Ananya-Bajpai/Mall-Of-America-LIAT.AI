"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { SlideRoot } from "./SlideRoot";
import { cn } from "@/lib/utils";
import type {
  ActivationBuilderSlideData,
  ActivationPath,
  ActivationVenue,
} from "@/lib/deck/types";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = { slide: ActivationBuilderSlideData };

const PATH_LABELS: Record<ActivationPath, { label: string; kicker: string }> = {
  lease: { label: "Lease a Flagship", kicker: "Retail · Pop-Up · F&B" },
  sponsor: { label: "Sponsor a Venue", kicker: "Brand integration" },
  event: { label: "Book the Property", kicker: "Concert · Activation · Event" },
};

const PRESET_BRANDS = ["Nike", "Apple", "Sephora", "Lululemon", "Aritzia"];

function brandToDomain(brand: string): string | null {
  const trimmed = brand.trim();
  if (!trimmed) return null;
  // Best-effort guess: drop spaces, lower-case, .com
  return `${trimmed.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`;
}

export function ActivationBuilderSlide({ slide }: Props) {
  const [path, setPath] = useState<ActivationPath>("sponsor");
  const [brandInput, setBrandInput] = useState<string>("");
  const [committedBrand, setCommittedBrand] = useState<string>("Nike");
  const [logoOk, setLogoOk] = useState<boolean>(true);

  // Whenever the committed brand changes, re-test the logo URL
  useEffect(() => {
    setLogoOk(true);
  }, [committedBrand]);

  // Pick the venue plate that matches the chosen path
  const venue: ActivationVenue =
    slide.venues.find((v) => v.pathFor === path) ?? slide.venues[0];

  const domain = brandToDomain(committedBrand);
  const logoUrl = domain ? `https://logo.clearbit.com/${domain}` : null;

  const commitBrand = () => {
    const next = brandInput.trim() || committedBrand;
    setCommittedBrand(next);
    setBrandInput("");
  };

  const ctaHref = `mailto:partnerships@mallofamerica.com?subject=${encodeURIComponent(
    `${venue.ctaSubject} — ${committedBrand}`,
  )}&body=${encodeURIComponent(
    `Path: ${PATH_LABELS[path].label}\nBrand: ${committedBrand}\nVenue: ${venue.name}\n\nI'd like to talk about activating at Mall of America.`,
  )}`;

  return (
    <SlideRoot tone={slide.tone ?? "ink"}>
      <div className="flex flex-1 flex-col">
        <div className="max-w-3xl mb-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="eyebrow mb-4 flex items-center gap-2"
          >
            <Sparkles size={12} className="text-[var(--color-accent)]" />
            <span>{slide.eyebrow}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="font-display font-light leading-[1.05]"
            style={{ fontSize: "var(--text-display-md)" }}
          >
            {slide.headline}
          </motion.h2>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-6 md:gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Controls */}
          <div className="flex flex-col gap-6">
            {/* Step 1 — pick path */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.35 }}
            >
              <div className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-paper)]/55 mb-3">
                01 · Pick your path
              </div>
              <div className="flex flex-col gap-2">
                {(Object.keys(PATH_LABELS) as ActivationPath[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPath(p)}
                    className={cn(
                      "group flex items-center justify-between gap-3 rounded-sm border px-4 py-3 text-left transition-all",
                      path === p
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)]/8 text-[var(--color-paper)]"
                        : "border-[var(--color-line)] text-[var(--color-paper)]/75 hover:border-[var(--color-paper)]/40",
                    )}
                  >
                    <div>
                      <div className="font-display text-base md:text-lg leading-tight">
                        {PATH_LABELS[p].label}
                      </div>
                      <div className="mt-0.5 text-[10px] tracking-[0.2em] uppercase text-[var(--color-paper)]/55">
                        {PATH_LABELS[p].kicker}
                      </div>
                    </div>
                    <ArrowRight
                      size={16}
                      className={cn(
                        "transition-transform",
                        path === p
                          ? "text-[var(--color-accent)] translate-x-0.5"
                          : "opacity-0 group-hover:opacity-100",
                      )}
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Step 2 — pick brand */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.5 }}
            >
              <div className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-paper)]/55 mb-3">
                02 · Drop your brand
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  commitBrand();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={brandInput}
                  onChange={(e) => setBrandInput(e.target.value)}
                  onBlur={commitBrand}
                  placeholder={committedBrand}
                  aria-label="Type a brand name"
                  className="flex-1 rounded-sm border border-[var(--color-line)] bg-transparent px-4 py-3 font-display text-base text-[var(--color-paper)] outline-none placeholder:text-[var(--color-paper)]/40 focus:border-[var(--color-accent)]"
                />
                <button
                  type="submit"
                  className="rounded-sm border border-[var(--color-accent)] bg-[var(--color-accent)]/10 px-4 text-xs tracking-[0.2em] uppercase text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)]"
                >
                  Apply
                </button>
              </form>
              <div className="mt-3 flex flex-wrap gap-2">
                {PRESET_BRANDS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setCommittedBrand(b)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-[11px] tracking-[0.15em] uppercase transition-colors",
                      committedBrand === b
                        ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                        : "border-[var(--color-line)] text-[var(--color-paper)]/65 hover:border-[var(--color-paper)]/40 hover:text-[var(--color-paper)]/85",
                    )}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Step 3 — reach card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.65 }}
            >
              <div className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-paper)]/55 mb-3">
                03 · Your activation
              </div>
              <div className="grid grid-cols-3 gap-3 rounded-sm border border-[var(--color-line)] p-4">
                <Stat label="Reach" value={venue.reach} />
                <Stat label="Comp tier" value={venue.comp} />
                <Stat label="Lead time" value={venue.leadTime} />
              </div>
              <a
                href={ctaHref}
                className="mt-4 inline-flex items-center gap-3 rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)] px-6 py-3 font-display text-sm tracking-[0.15em] uppercase text-[var(--color-ink)] transition-colors hover:bg-[var(--color-accent)]/85"
              >
                <span>Get a real plan in 48 hours</span>
                <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>

          {/* Preview pane */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.4 }}
            className="relative w-full overflow-hidden rounded-sm border border-[var(--color-line)] bg-[var(--color-ink)]"
            style={{ aspectRatio: "16 / 10" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={venue.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease }}
                className="absolute inset-0"
              >
                <Image
                  src={venue.plate}
                  alt={venue.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
                {/* Logo composite zone */}
                <div
                  className="absolute flex items-center justify-center overflow-hidden bg-white/95"
                  style={{
                    left: `${venue.zone.x}%`,
                    top: `${venue.zone.y}%`,
                    width: `${venue.zone.width}%`,
                    height: `${venue.zone.height}%`,
                    mixBlendMode: venue.blendMode,
                  }}
                >
                  <AnimatePresence mode="wait">
                    {logoUrl && logoOk ? (
                      <motion.img
                        key={committedBrand}
                        src={logoUrl}
                        alt={`${committedBrand} logo on ${venue.name}`}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45, ease }}
                        onError={() => setLogoOk(false)}
                        className="max-h-[80%] max-w-[80%] object-contain"
                      />
                    ) : (
                      <motion.span
                        key={`text-${committedBrand}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="font-display font-light text-black"
                        style={{ fontSize: "clamp(0.9rem, 2vw, 1.5rem)" }}
                      >
                        {committedBrand.toUpperCase()}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-ink)]/95 to-transparent p-4">
              <div className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-accent)]">
                {PATH_LABELS[path].label.toUpperCase()}
              </div>
              <div className="mt-1 font-display text-lg md:text-xl text-[var(--color-paper)]">
                {committedBrand} × {venue.name}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SlideRoot>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9px] tracking-[0.2em] uppercase text-[var(--color-paper)]/55 mb-1">
        {label}
      </div>
      <div
        className="font-display font-light text-[var(--color-paper)] leading-tight"
        style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.15rem)" }}
      >
        {value}
      </div>
    </div>
  );
}
