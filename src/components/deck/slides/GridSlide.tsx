"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SlideRoot } from "./SlideRoot";
import { cn } from "@/lib/utils";
import type { GridSlideData } from "@/lib/deck/types";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = { slide: GridSlideData };

const columnsClass: Record<GridSlideData["columns"], string> = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};

export function GridSlide({ slide }: Props) {
  const imageHeavy = slide.cards.some((c) => c.image);
  const isLightTone = slide.tone === "paper";

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

        <div
          className={cn(
            "grid gap-px border",
            isLightTone
              ? "bg-[var(--color-ink)]/10 border-[var(--color-ink)]/10"
              : "bg-[var(--color-line)] border-[var(--color-line)]",
            columnsClass[slide.columns],
          )}
        >
          {slide.cards.map((card, i) => {
            const isInteractive = !!card.href;
            const Tag = isInteractive ? motion.a : motion.div;
            return (
              <Tag
                key={card.id}
                href={card.href}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease, delay: 0.35 + i * 0.06 }}
                className={cn(
                  "group relative flex flex-col transition-colors duration-500",
                  imageHeavy
                    ? "aspect-[4/3] overflow-hidden"
                    : "p-6 lg:p-8",
                  isLightTone
                    ? "bg-[var(--color-paper)] text-[var(--color-ink)]"
                    : "bg-[var(--color-ink)] hover:bg-[var(--color-ink-soft)]",
                  isInteractive && "cursor-pointer",
                )}
              >
                {card.image && (
                  <>
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/80 via-[var(--color-ink)]/15 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 font-display text-xl md:text-2xl text-[var(--color-paper)]">
                      {card.title}
                    </div>
                  </>
                )}
                {!card.image && (
                  <>
                    {card.eyebrow && (
                      <div
                        className={cn(
                          "font-display font-light leading-none mb-2",
                          isLightTone
                            ? "text-[var(--color-ink)]"
                            : "text-[var(--color-accent)]",
                        )}
                        style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
                      >
                        {card.eyebrow}
                      </div>
                    )}
                    <h3 className="font-display text-lg md:text-xl leading-tight group-hover:text-[var(--color-accent)] transition-colors">
                      {card.title}
                    </h3>
                    {card.body && (
                      <p
                        className={cn(
                          "mt-3 text-sm leading-relaxed flex-1",
                          isLightTone ? "opacity-70" : "text-[var(--color-stone)]",
                        )}
                      >
                        {card.body}
                      </p>
                    )}
                    {card.cta && (
                      <div className="mt-5 flex items-center gap-2 text-sm text-[var(--color-accent)] group-hover:gap-4 transition-all">
                        <span>{card.cta}</span>
                        <ArrowUpRight size={16} />
                      </div>
                    )}
                  </>
                )}
              </Tag>
            );
          })}
        </div>
      </div>
    </SlideRoot>
  );
}
