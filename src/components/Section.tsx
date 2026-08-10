import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  eyebrow?: string;
  className?: string;
  /** Constrain and center content; set false for full-bleed sections. */
  contained?: boolean;
  children: ReactNode;
}

/**
 * Semantic section shell with the standard vertical rhythm (space-24+, so the
 * page breathes) and anchor scroll offset. Eyebrow uses the mono label style.
 */
export function Section({
  id,
  eyebrow,
  className,
  contained = true,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-24 md:py-32 lg:py-40",
        className
      )}
    >
      <div
        className={cn(
          contained && "mx-auto w-full max-w-6xl px-6 md:px-10 lg:px-16"
        )}
      >
        {eyebrow && (
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span
              aria-hidden
              className="inline-block h-px w-8 bg-accent/70"
            />
            {eyebrow}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
