"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { DeckSection } from "@/components/deck/DeckSection";
import { mall } from "@/lib/data/mall-of-america";

export function RetailShowcase() {
  return (
    <DeckSection id="retail" tone="ink">
      <div className="relative z-10 w-full max-w-[var(--max-content)] mx-auto px-[var(--gutter)]">
        <div className="max-w-3xl">
          <div className="eyebrow mb-6">520+ Brands</div>
          <h2
            className="font-display font-light leading-[1.05] text-[var(--color-paper)]"
            style={{ fontSize: "var(--text-display-lg)" }}
          >
            The brands that define culture. Under one roof.
          </h2>
          <p className="mt-8 text-lg text-[var(--color-paper)]/70 leading-relaxed">
            From Apple&apos;s flagship to emerging direct-to-consumer pop-ups,
            Mall of America is where discovery happens. Tenants aren&apos;t renting
            square footage — they&apos;re buying into the Upper Midwest&apos;s largest,
            most engaged shopping audience.
          </p>
        </div>

        {/* Flagship banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 relative overflow-hidden border border-[var(--color-line)] aspect-[21/9]"
        >
          <Image
            src="/images/retail-flagship.png"
            alt="Flagship retail at Mall of America"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/85 via-[var(--color-ink)]/20 to-transparent" />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 max-w-md">
            <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--color-accent)] mb-2">
              Flagship Anchors
            </div>
            <div className="font-display text-2xl md:text-3xl text-[var(--color-paper)] leading-tight">
              Apple. Nike. LEGO. The brands tenants benchmark against.
            </div>
          </div>
        </motion.div>

        {/* Category breakdown */}
        <div className="mt-20 grid md:grid-cols-4 gap-px bg-[var(--color-line)] border border-[var(--color-line)]">
          {mall.retailCategories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[var(--color-ink)] p-8 lg:p-10 hover:bg-[var(--color-ink-muted)] transition-colors duration-500"
            >
              <div className="font-display text-4xl md:text-5xl text-[var(--color-accent)] mb-2">
                {cat.count}
              </div>
              <div className="text-sm uppercase tracking-[0.15em] text-[var(--color-paper)] font-medium">
                {cat.name}
              </div>
              <div className="mt-4 text-sm text-[var(--color-stone)] leading-relaxed">
                {cat.note}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tenant marquee */}
        <div className="mt-20">
          <div className="eyebrow mb-6">Featured Tenants</div>
          <div className="flex flex-wrap gap-3">
            {mall.flagshipTenants.map((tenant, i) => (
              <motion.div
                key={tenant.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="px-5 py-3 border border-[var(--color-line)] rounded-full text-sm text-[var(--color-paper)]/80 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
              >
                {tenant.name}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DeckSection>
  );
}
