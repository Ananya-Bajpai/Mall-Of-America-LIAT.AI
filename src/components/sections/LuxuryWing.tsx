"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { DeckSection } from "@/components/deck/DeckSection";
import { mall } from "@/lib/data/mall-of-america";

export function LuxuryWing() {
  const luxury = mall.flagshipTenants.filter((t) => t.category === "luxury");

  return (
    <DeckSection id="luxury" tone="paper" className="text-[var(--color-ink)]">
      <div className="relative z-10 w-full max-w-[var(--max-content)] mx-auto px-[var(--gutter)]">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-6">
            <div className="eyebrow !text-[var(--color-ink)]/60 mb-6">Elevated</div>
            <h2
              className="font-display font-light leading-[1.02]"
              style={{ fontSize: "var(--text-display-lg)" }}
            >
              The quiet wing. <br />
              <span className="italic">Where brand meets patron.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-lg leading-relaxed text-[var(--color-ink)]/70">
              Luxury at Mall of America isn&apos;t an afterthought — it&apos;s a
              curated, appointment-ready wing designed for high-intent shoppers
              who fly in specifically to visit.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-[var(--color-ink)]/80">
              <li className="flex justify-between border-b border-[var(--color-ink)]/10 pb-3">
                <span>Avg. luxury basket</span>
                <span className="font-medium">$1,240</span>
              </li>
              <li className="flex justify-between border-b border-[var(--color-ink)]/10 pb-3">
                <span>International shopper share</span>
                <span className="font-medium">38%</span>
              </li>
              <li className="flex justify-between border-b border-[var(--color-ink)]/10 pb-3">
                <span>Private appointment requests YoY</span>
                <span className="font-medium">+41%</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--color-ink)]/10 border-y border-[var(--color-ink)]/10">
          {luxury.map((tenant, i) => (
            <motion.div
              key={tenant.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative aspect-[4/3] overflow-hidden bg-[var(--color-paper)]"
            >
              {tenant.image && (
                <Image
                  src={tenant.image}
                  alt={tenant.name}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/75 via-[var(--color-ink)]/15 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 font-display text-xl md:text-2xl tracking-wide text-[var(--color-paper)]">
                {tenant.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DeckSection>
  );
}
