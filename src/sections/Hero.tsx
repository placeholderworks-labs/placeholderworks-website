import { motion } from "motion/react";
import { Button } from "@/components/Button";
import { EASE } from "@/lib/motion";
import { scrollToId } from "@/hooks/useLenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const IMG = "/images/liquid-glass.png";

/**
 * Opening scene (CLAUDE.md §6), built around one liquid-glass image:
 *  - Layer 1: a blurred drifting background fill (never leaves the bg empty).
 *  - Layer 2: the crisp image. On mobile it fills the viewport (object-cover);
 *    on desktop it's rotated horizontal (270°), enlarged, bleeding off the
 *    top-right, and sweeps a "C" down the right side with a scale pop mid-path.
 *  - Layer 3: a readability scrim under the left-aligned text.
 *
 * The PNG is RGBA with a real transparent background, so it needs no edge mask.
 * Blur is applied statically — only transform/opacity animate — and every motion
 * is frozen under reduced motion.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const d = (s: number) => (reduced ? 0 : s);

  return (
    <section
      id="opening"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden lg:items-center"
    >
      {/* Layer 1 — blurred background fill, slow orbit (transform only) */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-30"
        style={{
          backgroundImage: `url('${IMG}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(60px)",
          opacity: 0.65,
        }}
        initial={{ scale: 1.6 }}
        animate={
          reduced
            ? { scale: 1.6 }
            : {
                scale: [1.6, 1.68, 1.6],
                x: ["0%", "3%", "-2%", "0%"],
                y: ["0%", "-2%", "2%", "0%"],
              }
        }
        transition={
          reduced
            ? undefined
            : { duration: 40, ease: "easeInOut", repeat: Infinity }
        }
      />

      {/* Layer 2 — the crisp "living" image. Mobile: full-bleed fill. Desktop:
          rotated 270°, enlarged, sweeping a "C" down the right side. */}
      <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
        {/* Mobile: fills the viewport behind the text */}
        <motion.img
          src={IMG}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-80 will-change-transform lg:hidden"
          initial={{ scale: 1.06 }}
          animate={reduced ? { scale: 1.06 } : { scale: [1.06, 1.12, 1.06] }}
          transition={
            reduced
              ? undefined
              : {
                  duration: 20,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                }
          }
        />
        {/* Desktop: rotated horizontal, bleeding off the top-right, C-motion */}
        <motion.img
          src={IMG}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute right-[-10%] top-[-12%] hidden w-[74%] max-w-none will-change-transform lg:block"
          initial={{ rotate: 270, scale: 1.04 }}
          animate={
            reduced
              ? { rotate: 270, scale: 1.04 }
              : {
                  rotate: 270,
                  x: ["4%", "-4%", "4%"],
                  y: ["-7%", "0%", "7%"],
                  scale: [1.03, 1.1, 1.03],
                }
          }
          transition={
            reduced
              ? undefined
              : {
                  duration: 20,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                }
          }
        />
      </div>

      {/* Layer 3 — readability scrim: vertical on mobile, horizontal on desktop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-bg-0 via-bg-0/80 to-bg-0/20 lg:bg-gradient-to-r lg:from-bg-0 lg:via-bg-0/85 lg:to-transparent"
      />

      {/* Text */}
      <div className="mx-auto flex w-full max-w-6xl px-6 pb-20 pt-28 md:px-10 lg:px-16 lg:pb-0 lg:pt-0">
        <div className="max-w-xl">
          <motion.h1
            className="max-w-[15ch] text-hero text-fg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: d(0.05) }}
          >
            We build AI that makes it{" "}
            <span className="accent-text">to production.</span>
          </motion.h1>

          <motion.p
            className="measure mt-8 text-subtitle text-fg-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: d(0.18) }}
          >
            Strategy, engineering, and deployment under one roof — we design,
            build, integrate, and ship AI systems that do real work.
          </motion.p>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: d(0.3) }}
          >
            <Button
              variant="primary"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact");
              }}
            >
              Start a conversation
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
