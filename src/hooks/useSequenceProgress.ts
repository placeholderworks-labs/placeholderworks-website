import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Sticky offset — keep in step with the `top-*` on the pinned element. */
const TOP = 96;
/**
 * Extra scroll the section holds for, in viewports. The "beat".
 *
 * Six rails share this, so it only means anything read per segment: at 2.5 the
 * sweep below works out to roughly three wheel notches per rail, which is what
 * lets a single rail be watched filling rather than glimpsed.
 */
const HOLD = 2.5;
/**
 * The fill occupies only the middle of that hold, so the section arrives at
 * rest before the rail starts and stays at rest once it is full. Those two
 * pauses are what make the sequence read as deliberate rather than as a hitch.
 *
 * They are fractions of HOLD, so they have to shrink as it grows: a tenth of
 * 2.5 viewports is a dead couple of notches at each end, which is the opposite
 * failure — a page that feels stuck. At 0.06 the pause stays near 120px
 * whatever the viewport, and the room that reclaims goes to the sweep.
 */
const FROM = 0.06;
const TO = 0.94;
/**
 * Damping time constant, ms. A wheel notch moves the page ~100px in one jump,
 * and tracked 1:1 the rail jumps with it. This eases the rail toward where the
 * scroll already is — ~95% of the gap in 3×TAU, so it comes to rest inside the
 * 150–350ms band §4 sets for feedback.
 *
 * It eases the indicator, never the page: the wheel still moves the document
 * by exactly what the user asked for.
 */
const TAU = 90;
/** Close enough: snap and stop, so the ends land exactly on 0 and 1. */
const EPS = 0.0005;
/** Ignore longer gaps — coming back to a backgrounded tab must not teleport. */
const MAX_DT = 64;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Scroll position as progress through an ordered sequence (CLAUDE.md §4).
 *
 * The section pins and page scroll walks the sequence: the rail fills left to
 * right, and where the row is too wide to fit — phones — the row itself travels
 * left to right by the same amount. One progress number drives both, so nothing
 * has to be swiped; scrolling the page is the only input.
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
  /** Where the scroll says the fill should be, and where it actually is. */
  const target = useRef(1);
  const current = useRef(1);
  const stamp = useRef(0);
  /** Row overflow. Measured on layout — reading it per frame forces reflow. */
  const extent = useRef(0);

  const apply = useCallback(
    (p: number) => {
      const list = listRef.current;
      if (!list) return;

      list.style.setProperty("--p", String(p));

      // Where the row overflows its container, walk it along by the same
      // progress. Where it fits, the extent is zero and this does nothing —
      // so the wide layout needs no special case.
      if (extent.current > 0) list.scrollLeft = extent.current * p;

      const next = Math.ceil(p * count);
      if (next !== lastFilled.current) {
        lastFilled.current = next;
        setFilled(next);
      }
    },
    [count]
  );

  /** Where the scroll says we are. One rect read; called once per frame. */
  const read = useCallback(() => {
    const track = trackRef.current;
    const content = contentRef.current;
    if (!track || !content) return;

    const range = track.offsetHeight - content.offsetHeight;
    const through =
      range > 0 ? (TOP - track.getBoundingClientRect().top) / range : 1;

    target.current = clamp01((through - FROM) / (TO - FROM));
  }, []);

  /**
   * Ease `current` toward `target`, one read and one write per frame.
   *
   * Exponential rather than a spring: it is frame-rate independent through
   * `dt`, and it never overshoots — which matters because `filled` is a ceil()
   * of the same number, and an overshoot would flick a step's colour on and
   * straight back off at every boundary.
   */
  const tick = useCallback<FrameRequestCallback>(
    (now) => {
      const dt = Math.min(MAX_DT, now - stamp.current);
      stamp.current = now;

      read();

      const to = target.current;
      const next = to - (to - current.current) * Math.exp(-dt / TAU);

      if (Math.abs(to - next) < EPS) {
        current.current = to;
        apply(to);
        frame.current = 0; // Settled. Nothing scheduled, nothing running.
        return;
      }

      current.current = next;
      apply(next);
      frame.current = requestAnimationFrame(tick);
    },
    [apply, read]
  );

  /** Scroll only has to wake the loop; the loop does its own reading. */
  const start = useCallback(() => {
    if (frame.current) return;
    stamp.current = performance.now();
    frame.current = requestAnimationFrame(tick);
  }, [tick]);

  /** Jump to wherever the page already is — for mount and resize, not scroll. */
  const snap = useCallback(() => {
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = 0;
    read();
    current.current = target.current;
    apply(target.current);
  }, [apply, read]);

  /** Size the runway, and re-read the row. Layout write — not per-scroll. */
  const size = useCallback((hold: boolean) => {
    const track = trackRef.current;
    const content = contentRef.current;
    const list = listRef.current;
    if (!track || !content) return;

    track.style.height = hold
      ? `${content.offsetHeight + window.innerHeight * HOLD}px`
      : "";

    if (list) extent.current = list.scrollWidth - list.clientWidth;
  }, []);

  useLayoutEffect(() => {
    const list = listRef.current;

    if (reduced) {
      // No hold, no listeners, no loop. The sequence reads complete, and with
      // the extent cleared nothing is driving the row sideways any more, so
      // scrolling it is handed back to the reader.
      size(false);
      if (list) list.style.overflowX = "auto";
      extent.current = 0;
      target.current = 1;
      current.current = 1;
      apply(1);
      lastFilled.current = count;
      setFilled(count);
      return;
    }

    if (list) list.style.overflowX = "hidden";

    const onScroll = () => start();

    const onLayout = () => {
      size(true);
      snap();
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
  }, [reduced, size, snap, start, apply, count]);

  return { trackRef, contentRef, listRef, filled, reduced };
}
