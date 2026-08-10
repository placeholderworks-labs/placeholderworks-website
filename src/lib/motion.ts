import type { Variants } from "motion/react";

/**
 * Shared motion language — one place, reused everywhere (CLAUDE.md §4).
 * Easing and durations are the locked values; only transform/opacity animate.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Container that staggers its children into view. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

/** The Apple-style enter: fade up a short distance. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/** Quieter fade for supporting elements. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

/** Per-word/line reveal for kinetic headlines. */
export const lineReveal: Variants = {
  hidden: { opacity: 0, y: "0.55em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/** Default viewport config for whileInView reveals. */
export const inView = { once: true, amount: 0.35 } as const;
