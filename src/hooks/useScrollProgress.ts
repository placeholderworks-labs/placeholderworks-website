import { useScroll, useSpring, type MotionValue } from "motion/react";

/**
 * Whole-page scroll progress (0 → 1), spring-smoothed. Drives the signature
 * spine. Returns a MotionValue so consumers animate without re-rendering.
 */
export function useScrollProgress(): MotionValue<number> {
  const { scrollYProgress } = useScroll();
  return useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
}
