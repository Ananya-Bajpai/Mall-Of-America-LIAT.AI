"use client";

import { motion } from "framer-motion";
import { DeckSection } from "@/components/deck/DeckSection";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { mall } from "@/lib/data/mall-of-america";

export function EventsPlatform() {
  return (
    <DeckSection id="events" tone="ink" fullBleed className="py-24 md:py-32">
      <VideoBackground
        overlayClassName="bg-gradient-to-b from-[var(--color-ink)]/95 via-[var(--color-ink)]/80 to-[var(--color-ink)]/95"
      />

      <div className="relative z-10 w-full max-w-[var(--max-content)] mx-auto px-[var(--gutter)]">
        <div className="max-w-3xl">
          <div className="eyebrow mb-6">Global Platform</div>
          <h2
            className="font-display font-light leading-[1.02] text-[var(--color-paper)]"
            style={{ fontSize: "var(--text-display-lg)" }}
          >
            Not a mall. <br />
            A stage for <br />
            <span className="italic text-[var(--color-accent)]">cultural moments.</span>
          </h2>
          <p className="mt-8 text-lg text-[var(--color-paper)]/70 leading-relaxed">
            When a brand, artist, or team wants to reach the Midwest with scale,
            they come here. Four broadcast-ready venues. Turnkey production.
            A permanent audience.
          </p>
        </div>

        {/* Venue grid */}
        <div className="mt-20 grid md:grid-cols-2 gap-6">
          {mall.venues.map((venue, i) => (
            <motion.div
              key={venue.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="border border-[var(--color-line)] p-8 lg:p-10 bg-[var(--color-ink)]/60 backdrop-blur-sm"
            >
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="font-display text-2xl md:text-3xl text-[var(--color-paper)]">
                  {venue.name}
                </h3>
                <div className="font-mono text-xs text-[var(--color-accent)]">
                  {venue.capacity}
                </div>
              </div>
              <p className="text-[var(--color-paper)]/70 leading-relaxed">
                {venue.useCase}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Recent highlights marquee */}
        <div className="mt-20">
          <div className="eyebrow mb-6">Recent Highlights</div>
          <div className="flex flex-wrap gap-3">
            {mall.eventsHighlights.map((h) => (
              <div
                key={h}
                className="px-5 py-3 border border-[var(--color-accent)]/40 rounded-full text-sm text-[var(--color-paper)]/90 bg-[var(--color-accent)]/5"
              >
                {h}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DeckSection>
  );
}
