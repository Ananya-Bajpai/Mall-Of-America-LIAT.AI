import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { SectionId } from "@/lib/data/mall-of-america";

type Props = {
  id: SectionId;
  children: ReactNode;
  className?: string;
  tone?: "ink" | "ink-soft" | "paper";
  fullBleed?: boolean;
};

const toneClass: Record<NonNullable<Props["tone"]>, string> = {
  ink: "bg-[var(--color-ink)] text-[var(--color-paper)]",
  "ink-soft": "bg-[var(--color-ink-soft)] text-[var(--color-paper)]",
  paper: "bg-[var(--color-paper)] text-[var(--color-ink)]",
};

export const DeckSection = forwardRef<HTMLElement, Props>(function DeckSection(
  { id, children, className, tone = "ink", fullBleed = false },
  ref,
) {
  return (
    <section
      ref={ref}
      id={id}
      data-section={id}
      className={cn(
        "relative w-full overflow-hidden",
        "min-h-screen",
        toneClass[tone],
        !fullBleed && "py-24 md:py-32",
        className,
      )}
    >
      {children}
    </section>
  );
});
