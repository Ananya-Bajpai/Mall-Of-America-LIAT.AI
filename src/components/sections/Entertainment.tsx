"use client";

import { motion } from "framer-motion";
import { DeckSection } from "@/components/deck/DeckSection";
import { mall } from "@/lib/data/mall-of-america";

export function Entertainment() {
  return (
    <DeckSection id="entertainment" tone="ink">
      <div className="relative z-10 w-full max-w-[var(--max-content)] mx-auto px-[var(--gutter)]">
        <div className="max-w-4xl">
          <div className="eyebrow mb-6">The Differentiator</div>
          <h2
            className="font-display font-light leading-[0.98] text-[var(--color-paper)]"
            style={{ fontSize: "var(--text-display-lg)" }}
          >
            Other malls have shops. <br />
            <span className="text-[var(--color-accent)] italic">We have a day.</span>
          </h2>
          <p className="mt-8 text-lg text-[var(--color-paper)]/70 leading-relaxed max-w-2xl">
            The reason average dwell is 3.5 hours — triple the U.S. mall average —
            is entertainment built at destination scale. Every attraction below
            is a reason to choose Mall of America over every other option in the region.
          </p>
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-6">
          {mall.attractions.map((attraction, i) => (
            <motion.div
              key={attraction.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden border border-[var(--color-line)] hover:border-[var(--color-accent)] transition-colors"
            >
              {/* Placeholder gradient — swap with AI-generated or real imagery */}
              <div
                className="aspect-[16/10] w-full"
                style={{
                  background: `linear-gradient(${135 + i * 20}deg, rgba(201,169,106,${0.15 + (i % 3) * 0.1}) 0%, rgba(19,19,21,1) 60%), radial-gradient(at ${20 + i * 10}% ${30 + i * 5}%, rgba(214,69,69,0.2), transparent 50%)`,
                }}
              />
              <div className="p-8">
                <div className="flex items-start justify-between gap-6">
                  <h3 className="font-display text-2xl md:text-3xl text-[var(--color-paper)] group-hover:text-[var(--color-accent)] transition-colors">
                    {attraction.name}
                  </h3>
                  {attraction.stat && (
                    <div className="font-mono text-xs text-[var(--color-stone)] whitespace-nowrap mt-2">
                      {attraction.stat}
                    </div>
                  )}
                </div>
                <p className="mt-4 text-[var(--color-paper)]/70 leading-relaxed">
                  {attraction.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DeckSection>
  );
}
