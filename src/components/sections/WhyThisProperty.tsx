"use client";

import { motion } from "framer-motion";
import { DeckSection } from "@/components/deck/DeckSection";
import { StatCounter } from "@/components/ui/StatCounter";
import { mall } from "@/lib/data/mall-of-america";

export function WhyThisProperty() {
  return (
    <DeckSection id="why" tone="ink-soft">
      <div className="relative z-10 w-full max-w-[var(--max-content)] mx-auto px-[var(--gutter)]">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="eyebrow mb-6">The Opportunity</div>
            <h2 className="font-display font-light leading-[1.05] text-[var(--color-paper)]"
                style={{ fontSize: "var(--text-display-lg)" }}>
              One third of North America is a day&apos;s drive away.
            </h2>
            <p className="mt-8 text-lg text-[var(--color-paper)]/70 leading-relaxed max-w-md">
              Mall of America doesn&apos;t just attract locals. It attracts a continent.
              Fifteen minutes from a top-16 international airport. Direct light-rail access.
              Zero weather risk, 365 days a year.
            </p>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-10 md:gap-14">
            {mall.reachStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <StatCounter value={stat.value} label={stat.label} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Demographics strip */}
        <div className="mt-24 border-t border-[var(--color-line)] pt-10">
          <div className="eyebrow mb-6">Audience</div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {Object.entries(mall.demographics).map(([key, value]) => (
              <div key={key}>
                <div className="font-display text-2xl md:text-3xl text-[var(--color-paper)]">
                  {value}
                </div>
                <div className="mt-1 text-[10px] tracking-[0.2em] uppercase text-[var(--color-stone)]">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DeckSection>
  );
}
