import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  eyebrow?: string;
  /** Zero-padded step shown alongside the eyebrow, e.g. "02". */
  index?: string;
  className?: string;
  /** Constrain and center content; set false for full-bleed sections. */
  contained?: boolean;
  /** Hairline rule across the top of the section. */
  rule?: boolean;
  children: ReactNode;
}

/**
 * Semantic section shell. On white the page needs more separation than it did
 * on dark, where the surface change carried some of that load — so the rhythm
 * is generous and a hairline rule marks each boundary.
 *
 * The eyebrow is a mono label, deliberately without the accent dash that used
 * to prefix it: repeated across nine sections that read as clutter on white.
 */
export function Section({
  id,
  eyebrow,
  index,
  className,
  contained = true,
  rule = true,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-20 py-28 md:py-36 lg:py-44",
        rule && "border-t border-line",
        className
      )}
    >
      <div
        className={cn(
          contained && "mx-auto w-full max-w-6xl px-6 md:px-10 lg:px-16"
        )}
      >
        {eyebrow && (
          <p className="eyebrow mb-10 flex items-baseline gap-4">
            {index && <span className="text-accent">{index}</span>}
            {eyebrow}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
