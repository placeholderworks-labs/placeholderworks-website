import type { Variants } from "motion/react";

/**
 * Shared motion language (CLAUDE.md §4). Ambient and scroll-driven motion has
 * been removed from the site — what remains is functional feedback only: the
 * mobile menu opening and the contact form's success state. Both communicate
 * a state change, so both earn their animation.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Overlay/panel fade — mobile menu. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: EASE } },
};

/** State swap — form idle → success. */
export const swap: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};
