import { motion, useTransform } from "motion/react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { SECTIONS } from "@/lib/sections";

/**
 * Signature element — the "deployment line". A hairline spine runs down the
 * page and fills with amber as you scroll, visualizing the core positioning:
 * taking AI from idea to production. The mono label tracks the active phase.
 * Decorative, so it's aria-hidden and desktop-only; the narrative reads fine
 * without it (and under reduced motion it renders as a static drawn spine).
 */
export function Spine({ activeId }: { activeId: string }) {
  const progress = useScrollProgress();
  const fillHeight = useTransform(progress, (v) => `${v * 100}%`);
  const active = SECTIONS.find((s) => s.id === activeId) ?? SECTIONS[0];

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-6 top-0 z-40 hidden h-screen flex-col items-center lg:left-10 xl:flex"
    >
      <div className="mt-28 mb-5 rotate-180 eyebrow whitespace-nowrap text-fg-3 [writing-mode:vertical-rl]">
        {active.index}
        <span className="mx-2 text-fg-3/50">/</span>
        {active.label}
      </div>

      <div className="relative mb-28 w-px flex-1 bg-line">
        <motion.div
          className="absolute inset-x-0 top-0 w-px origin-top"
          style={{
            height: fillHeight,
            backgroundImage:
              "linear-gradient(to bottom, var(--accent-from), var(--accent-to))",
          }}
        />
        <motion.div
          className="absolute -left-[3px] h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_rgba(124,58,237,0.6)]"
          style={{ top: fillHeight }}
        />
      </div>
    </div>
  );
}
