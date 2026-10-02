import { useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { BRAND, MAX_LEN, useWordCycle } from "@/hooks/useWordCycle";

/**
 * Cell contents are a module constant, and that is load-bearing twice over.
 * React only rewrites textContent when the children prop changes between
 * renders, so constant children mean the hook's imperative writes are never
 * clobbered — and the brand is painted correctly on first paint instead of
 * sitting blank until the fonts resolve.
 */
const CELLS = Array.from({ length: MAX_LEN }, (_, i) => BRAND[i] ?? "");

/**
 * The hero identity: mark, cycling wordmark, discipline badge.
 *
 * The three are one component rather than three because the closing bracket
 * and the badge both ride the same `--wm-shift` custom property, which needs a
 * common ancestor to be set on.
 *
 * With the cycle disabled — reduced motion, or the band scrolled away — this
 * renders its own resting state: a static <PLACEHOLDERWORKS> at the same size, in
 * the same box, pixel-identical to the animated mark between words. There is
 * no separate reduced-motion branch because there does not need to be one.
 */
export function HeroLockup() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  // "0px" instead of the default -40%: the band sits at the very top of the
  // page, and the cycle should run while it is on screen, not once it is half
  // way up. useInView already toggles back off on the way out.
  const { ref: viewRef, inView } = useInView<HTMLDivElement>("0px");

  useWordCycle(rootRef, cellsRef, !reduced && inView);

  return (
    <div
      ref={(node) => {
        rootRef.current = node;
        viewRef.current = node;
      }}
      data-wm="brand"
      className="wm flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-4"
    >
      <span className="flex items-center gap-3 text-wordmark">
        {/* Transparent PNG: the crimson mark alone, straight on the band. */}
        <img
          src="/images/favicon.png"
          alt=""
          width={48}
          height={48}
          className="h-10 w-10 shrink-0 md:h-12 md:w-12"
        />

        {/* aria-hidden covers the mark only — the badge below is real content.
            pointer-events-auto is what makes the hover pause reachable; the
            parent band deliberately lets the pointer through to the grid. */}
        <span aria-hidden className="pointer-events-auto">
          <span className="text-white/50">&lt;</span>
          <span ref={cellsRef} className="wm-cells">
            {CELLS.map((ch, i) => (
              <span key={i} className="wm-cell">
                {ch}
              </span>
            ))}
          </span>
          <span className="wm-tail text-white/50">&gt;</span>
        </span>

        {/* The name, once, for anyone who cannot see the cycle. Never a live
            region: a wordmark that announces itself every few seconds forever
            would be unusable. */}
        <span className="sr-only">Placeholderworks</span>
      </span>

      <span className="wm-badge mono-ui border border-white/25 px-2 py-1 text-white/60">
        Applied AI Engineering
      </span>
    </div>
  );
}
