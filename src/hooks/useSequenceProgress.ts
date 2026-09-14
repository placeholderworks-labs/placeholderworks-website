import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Sticky offset — keep in step with the `top-*` on the pinned element. */
const TOP = 96;
/** Extra scroll the section holds for, in viewports. The "beat". */
const HOLD = 1.15;
/**
 * The fill occupies only the middle of that hold, so the section arrives at
 * rest before the rail starts and stays at rest once it is full. Those two
 * pauses are what make the sequence read as deliberate rather than as a hitch.
 */
const FROM = 0.12;
const TO = 0.82;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Scroll position as progress through an ordered sequence (CLAUDE.md §4).
 *
 * The section pins briefly and page scroll walks the sequence: the rail fills
 * left to right, and where the row is too wide to fit — phones — the row
 * itself travels left to right by the same amount. One progress number drives
 * both, so nothing has to be swiped; scrolling the page is the only input.
 *
 * That number is written straight to the DOM as `--p` rather than held in
 * state, so scrolling re-renders nothing — CSS derives each segment's fill
 * from it. The only state is how many steps have been reached, which changes
 * at most `count` times across a pass.
 */
export function useSequenceProgress(count: number) {
  /** The scroll runway. Taller than its content; that surplus is the hold. */
  const trackRef = useRef<HTMLDivElement>(null);
  /** What actually sticks. */
  const contentRef = useRef<HTMLDivElement>(null);
  /** Carries `--p`, and is the thing that travels sideways when it overflows. */
  const listRef = useRef<HTMLOListElement>(null);

  const [filled, setFilled] = useState(count);
  const reduced = useReducedMotion();

  const frame = useRef(0);
  const lastFilled = useRef(count);

  const apply = useCallback(
    (p: number) => {
      const list = listRef.current;
      if (!list) return;

      list.style.setProperty("--p", String(p));

      // Where the row overflows its container, walk it along by the same
      // progress. Where it fits, the overflow is zero and this does nothing —
      // so the wide layout needs no special case.
      const max = list.scrollWidth - list.clientWidth;
      if (max > 0) list.scrollLeft = max * p;

      const next = Math.ceil(p * count);
      if (next !== lastFilled.current) {
        lastFilled.current = next;
        setFilled(next);
      }
    },
    [count]
  );

  /** Size the runway: its content, plus the hold. Layout write — not per-scroll. */
  const size = useCallback((hold: boolean) => {
    const track = trackRef.current;
    const content = contentRef.current;
    if (!track || !content) return;

    track.style.height = hold
      ? `${content.offsetHeight + window.innerHeight * HOLD}px`
      : "";
  }, []);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const content = contentRef.current;
    if (!track || !content) return;

    const range = track.offsetHeight - content.offsetHeight;
    const through =
      range > 0 ? (TOP - track.getBoundingClientRect().top) / range : 1;

    apply(clamp01((through - FROM) / (TO - FROM)));
  }, [apply]);

  useLayoutEffect(() => {
    const list = listRef.current;

    if (reduced) {
      // No hold, no listeners. The sequence reads complete, and because
      // nothing is driving it sideways any more, the row hands scrolling
      // back to the reader.
      size(false);
      if (list) list.style.overflowX = "auto";
      apply(1);
      lastFilled.current = count;
      setFilled(count);
      return;
    }

    if (list) list.style.overflowX = "hidden";

    // Coalesce bursts of scroll events into one read+write per frame.
    const onScroll = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        measure();
      });
    };

    const onLayout = () => {
      size(true);
      measure();
    };

    onLayout();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onLayout);

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = 0;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onLayout);
    };
  }, [reduced, measure, size, apply, count]);

  return { trackRef, contentRef, listRef, filled, reduced };
}
