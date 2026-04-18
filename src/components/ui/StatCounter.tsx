"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/hooks/useInView";

type Props = {
  value: string;
  label: string;
  detail?: string;
  align?: "left" | "center";
};

/**
 * Counts up the numeric portion of a value like "40M+", "5.6M", "$2B+".
 */
function parseValue(raw: string): { number: number; prefix: string; suffix: string; decimals: number } {
  const match = raw.match(/^([^\d.]*)([\d.]+)(.*)$/);
  if (!match) return { number: 0, prefix: "", suffix: raw, decimals: 0 };
  const [, prefix, numStr, suffix] = match;
  const decimals = (numStr.split(".")[1] || "").length;
  return { number: parseFloat(numStr), prefix, suffix, decimals };
}

export function StatCounter({ value, label, detail, align = "left" }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const [display, setDisplay] = useState("0");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    const { number, prefix, suffix, decimals } = parseValue(value);
    const duration = 1600;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = number * eased;
      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, value]);

  return (
    <div
      ref={ref}
      className={align === "center" ? "text-center" : "text-left"}
    >
      <div className="font-display text-5xl md:text-7xl font-light tracking-tight text-[var(--color-paper)]">
        {display}
      </div>
      <div className="mt-2 text-xs tracking-[0.2em] uppercase text-[var(--color-stone)]">
        {label}
      </div>
      {detail && (
        <div className="mt-3 text-sm text-[var(--color-stone-dark)] max-w-xs">
          {detail}
        </div>
      )}
    </div>
  );
}
