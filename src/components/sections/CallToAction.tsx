"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DeckSection } from "@/components/deck/DeckSection";
import { mall } from "@/lib/data/mall-of-america";

export function CallToAction() {
  return (
    <DeckSection id="cta" tone="ink" className="flex items-center">
      <div className="relative z-10 w-full max-w-[var(--max-content)] mx-auto px-[var(--gutter)]">
        <div className="text-center max-w-4xl mx-auto">
          <div className="eyebrow mb-6">Next Steps</div>
          <h2
            className="font-display font-light leading-[1.02] text-[var(--color-paper)]"
            style={{ fontSize: "var(--text-display-lg)" }}
          >
            Three ways <br />
            <span className="italic text-[var(--color-accent)]">to partner.</span>
          </h2>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-px bg-[var(--color-line)] border border-[var(--color-line)]">
          {mall.ctaPaths.map((path, i) => (
            <motion.a
              key={path.id}
              href={path.href}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-[var(--color-ink)] hover:bg-[var(--color-ink-soft)] p-10 lg:p-12 flex flex-col transition-colors duration-500 min-h-[380px]"
            >
              <div className="text-xs tracking-[0.2em] uppercase text-[var(--color-stone)] mb-4">
                {path.kicker}
              </div>
              <h3 className="font-display text-3xl md:text-4xl text-[var(--color-paper)] leading-tight group-hover:text-[var(--color-accent)] transition-colors">
                {path.title}
              </h3>
              <p className="mt-6 text-[var(--color-paper)]/70 leading-relaxed flex-1">
                {path.description}
              </p>
              <div className="mt-8 flex items-center gap-2 text-sm text-[var(--color-accent)] group-hover:gap-4 transition-all">
                <span>{path.cta}</span>
                <ArrowUpRight size={16} />
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-24 pt-8 border-t border-[var(--color-line)] flex flex-col md:flex-row justify-between gap-4 text-xs text-[var(--color-stone)]">
          <div>
            © {new Date().getFullYear()} {mall.name} · {mall.location}
          </div>
          <div className="font-mono">
            Built as an interactive sales experience · Not a static deck
          </div>
        </div>
      </div>
    </DeckSection>
  );
}
