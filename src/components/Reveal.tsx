import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE, inView } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds. */
  delay?: number;
  /** Travel distance in px. */
  y?: number;
}

/**
 * Fade-and-rise a block into view once. Under reduced motion, MotionConfig
 * neutralizes the transform (see App) so this simply appears.
 */
export function Reveal({ children, className, delay = 0, y = 20 }: RevealProps) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
