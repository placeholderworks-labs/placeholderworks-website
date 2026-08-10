import { motion, type Variants } from "motion/react";
import { EASE, inView } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  /** Animate on mount ("load", e.g. the hero) or when scrolled into view. */
  trigger?: "load" | "inView";
  delayChildren?: number;
  stagger?: number;
}

const word: Variants = {
  hidden: { opacity: 0, y: "0.6em" },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

/**
 * Kinetic headline: each word rises out of a clipped line. Word-level (not
 * character) keeps it legible and purposeful (CLAUDE.md §6). Place inside a
 * real heading element so semantics stay intact.
 */
export function AnimatedText({
  text,
  className,
  trigger = "inView",
  delayChildren = 0,
  stagger = 0.08,
}: AnimatedTextProps) {
  const reduced = useReducedMotion();
  if (reduced) {
    // No entrance choreography under reduced motion — the text is simply there.
    return <span className={cn("inline-block", className)}>{text}</span>;
  }

  const words = text.split(" ");
  const control =
    trigger === "load"
      ? { initial: "hidden" as const, animate: "visible" as const }
      : {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: inView,
        };

  return (
    <motion.span
      className={cn("inline-block", className)}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      {...control}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span className="inline-block will-change-transform" variants={word}>
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </motion.span>
  );
}
