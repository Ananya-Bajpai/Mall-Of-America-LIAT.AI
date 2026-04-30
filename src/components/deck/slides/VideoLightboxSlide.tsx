"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { SlideRoot } from "./SlideRoot";
import { Lightbox, type LightboxContent } from "../Lightbox";
import type { VideoLightboxSlideData } from "@/lib/deck/types";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = { slide: VideoLightboxSlideData };

export function VideoLightboxSlide({ slide }: Props) {
  const [active, setActive] = useState<LightboxContent | null>(null);

  return (
    <SlideRoot tone={slide.tone ?? "ink"}>
      <div className="flex flex-1 flex-col">
        <div className="max-w-3xl mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="eyebrow mb-4"
          >
            {slide.eyebrow}
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

        <div className="grid flex-1 grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
          {slide.items.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() =>
                setActive({
                  title: item.title,
                  stat: item.stat,
                  description: item.description,
                  poster: item.poster,
                  alt: item.title,
                  video: item.video,
                })
              }
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.35 + i * 0.06 }}
              aria-label={`Watch ${item.title}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-[var(--color-line)] bg-[var(--color-ink)]"
            >
              <Image
                src={item.poster}
                alt={item.title}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/90 via-[var(--color-ink)]/30 to-transparent transition-opacity duration-500 group-hover:from-[var(--color-ink)]/75" />

              {/* Play affordance */}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--color-paper)]/70 bg-[var(--color-ink)]/40 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)]">
                  <Play
                    size={20}
                    className="ml-0.5 text-[var(--color-paper)] transition-colors group-hover:text-[var(--color-ink)]"
                    strokeWidth={1.5}
                    fill="currentColor"
                  />
                </span>
              </span>

              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="font-display text-base md:text-lg leading-tight text-[var(--color-paper)] group-hover:text-[var(--color-accent)] transition-colors">
                  {item.title}
                </div>
                {item.stat && (
                  <div className="mt-1 text-[10px] tracking-[0.2em] uppercase text-[var(--color-paper)]/65">
                    {item.stat}
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox content={active} onClose={() => setActive(null)} />
    </SlideRoot>
  );
}
