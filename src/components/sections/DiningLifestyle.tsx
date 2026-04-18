"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { DeckSection } from "@/components/deck/DeckSection";
import { mall } from "@/lib/data/mall-of-america";

export function DiningLifestyle() {
  return (
    <DeckSection id="dining" tone="ink-soft">
      <div className="relative z-10 w-full max-w-[var(--max-content)] mx-auto px-[var(--gutter)]">
        <div className="max-w-3xl">
          <div className="eyebrow mb-6">Culinary</div>
          <h2
            className="font-display font-light leading-[1.05] text-[var(--color-paper)]"
            style={{ fontSize: "var(--text-display-lg)" }}
          >
            Food isn&apos;t <br />
            the amenity. <br />
            <span className="text-[var(--color-accent)]">It&apos;s the reason.</span>
          </h2>
          <p className="mt-8 text-lg text-[var(--color-paper)]/70 leading-relaxed">
            {mall.dining.totalRestaurants} restaurants — chef-driven concepts,
            local Twin Cities favorites, fine dining, and global flavors. Average
            dwell time extends by 90 minutes when visitors dine on-site.
          </p>
        </div>

        {/* Dining hero banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 relative overflow-hidden border border-[var(--color-line)] aspect-[21/9]"
        >
          <Image
            src="/images/dining-hero.png"
            alt="Dining at Mall of America"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/75 via-[var(--color-ink)]/20 to-[var(--color-ink)]/40" />
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 gap-px bg-[var(--color-line)] border border-[var(--color-line)]">
          {mall.dining.highlights.map((highlight, i) => {
            const [name, ...rest] = highlight.split(" — ");
            return (
              <motion.div
                key={highlight}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.06, duration: 0.6 }}
                className="bg-[var(--color-ink-soft)] p-8 lg:p-10 flex items-baseline justify-between gap-6 hover:bg-[var(--color-ink-muted)] transition-colors"
              >
                <div>
                  <div className="font-display text-2xl md:text-3xl text-[var(--color-paper)]">
                    {name}
                  </div>
                  <div className="mt-2 text-sm text-[var(--color-stone)]">
                    {rest.join(" — ")}
                  </div>
                </div>
                <div className="font-mono text-xs text-[var(--color-stone)]">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DeckSection>
  );
}
