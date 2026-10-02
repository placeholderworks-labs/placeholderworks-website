import { useEffect, type RefObject } from "react";

/**
 * The cycle, in order. PLACEHOLDERWORKS is both the rest state and the longest word
 * in the set — which is what lets the cell box be fixed: reserving room for it
 * costs nothing the resting mark did not already occupy, and the closing
 * bracket can then hug each word with a transform instead of a width.
 */
export const WORDS = [
  "DESIGN",
  "ARCHITECT",
  "BUILD",
  "DEPLOY",
] as const;

export const BRAND = WORDS[0];
export const MAX_LEN = BRAND.length;

/* -- Timing ---------------------------------------------------------------
   Deliberately slower than it wants to be. The grid blips underneath run on a
   1800ms interval; holds here are co-prime with that so the two rhythms in one
   245px band never lock into a beat. The lockup is at rest ~71% of the time. */

/** Per-cell dissolve and reconstruct. */
const OUT = 200;
const IN = 320;

/**
 * Per-cell offset: the word dissolves tail-first and rebuilds head-first.
 * Scaled to the sixteen-cell brand so a full transition still takes ~970ms,
 * which keeps the lockup at rest ~71% of the cycle.
 */
const STAGGER = 15;

/** One glyph swap per this many ms while a cell is scrambling. */
const SWAP_MS = 70;

/** Point in the IN phase where the real letter lands instead of a fragment. */
const SETTLE_AT = 0.7;

const OUT_SPAN = OUT + (MAX_LEN - 1) * STAGGER;
const TOTAL = OUT_SPAN + IN + (MAX_LEN - 1) * STAGGER;

/* The brand dwells; the verbs flick past. Neither is a multiple of the grid's
   1800ms, so the two rhythms in the band still never lock into a beat. */
const HOLD_BRAND = 8400;
const HOLD_WORD = 800;

/** The first impression is the static brand, not a word already in motion. */
const FIRST_DELAY = 2400;

/** How often a paused cycle re-checks whether the pointer has left. */
const PAUSED_POLL = 600;

/** Hold the closing bracket until the trailing cells have gone blank. */
const SHRINK_DELAY = 160;

/**
 * Fragments to scramble through. ASCII only, and that is a hard rule: box
 * drawing and block characters are the obvious choice for "geometric" but
 * Geist Mono does not carry them, so each one would fall back to another face
 * at another advance width and tear the 1ch grid mid-animation.
 *
 * `<` and `>` are excluded — the brackets are the fixed frame of the mark, and
 * strays inside it muddy the one thing that has to stay legible.
 */
const POOL = "/\\|_-=+[]{}()^~";

/**
 * Cycles the hero wordmark through WORDS, one character at a time.
 *
 * Follows the house idiom (see useGridBlips): the caller owns the gate, the
 * hook owns the DOM. Everything is written imperatively — textContent,
 * transform, opacity, and one custom property — so React never re-renders for
 * the life of the page. Cells are read out of the ref on every tick rather
 * than captured, since a remount swaps the nodes without re-running this.
 *
 * Nothing here animates a layout property: the cell box is fixed at MAX_LEN
 * and the closing bracket moves on a transform.
 */
export function useWordCycle(
  rootRef: RefObject<HTMLElement | null>,
  cellsRef: RefObject<HTMLElement | null>,
  enabled: boolean
): void {
  useEffect(() => {
    const root = rootRef.current;
    const cells = cellsRef.current;
    if (!enabled || !root || !cells) return;

    let cancelled = false;
    let frame = 0;
    let paused = false;
    let index = 0;
    let cellW = 0;
    const timers = new Set<number>();

    const after = (ms: number, fn: () => void) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        if (!cancelled) fn();
      }, ms);
      timers.add(id);
    };

    /* The shift is consumed by the badge as well as the bracket, and the badge
       sets its own (much smaller) font-size — a `ch` value would resolve
       against that and land in the wrong place. Measure px. */
    const setShift = (len: number) =>
      root.style.setProperty("--wm-shift", `${-(MAX_LEN - len) * cellW}px`);

    const measure = () => {
      const first = cells.firstElementChild;
      cellW = first ? first.getBoundingClientRect().width : 0;
      setShift(WORDS[index].length);
    };

    const glyph = (i: number, t: number) =>
      POOL[(i * 31 + Math.floor(t / SWAP_MS) * 17) % POOL.length];

    const draw = (
      cell: HTMLElement,
      ch: string,
      op: number,
      sy: number,
      ty: number
    ) => {
      if (cell.textContent !== ch) cell.textContent = ch;

      const transform =
        sy === 1 && ty === 0
          ? ""
          : `translateY(${ty.toFixed(2)}px) scaleY(${sy.toFixed(3)})`;
      if (cell.style.transform !== transform) cell.style.transform = transform;

      // Floor at 0.6 — below that a fragment over a lit grid cell goes muddy
      // and the word reads as dropping out rather than rebuilding.
      const opacity = op >= 1 ? "" : op.toFixed(2);
      if (cell.style.opacity !== opacity) cell.style.opacity = opacity;
    };

    const paint = (from: string, to: string, t: number) => {
      const kids = cells.children;
      for (let i = 0; i < kids.length; i++) {
        const cell = kids[i] as HTMLElement;
        const fromCh = from[i] ?? "";
        const toCh = to[i] ?? "";
        const outAt = (MAX_LEN - 1 - i) * STAGGER;
        const inAt = OUT_SPAN + i * STAGGER;

        if (t < outAt) {
          draw(cell, fromCh, 1, 1, 0);
        } else if (t < outAt + OUT) {
          const p = (t - outAt) / OUT;
          draw(cell, fromCh ? glyph(i, t) : "", 1 - 0.4 * p, 1 - 0.14 * p, 2 * p);
        } else if (t < inAt) {
          draw(cell, "", 0.6, 0.86, 2);
        } else if (t < inAt + IN) {
          const p = (t - inAt) / IN;
          const ch = !toCh ? "" : p < SETTLE_AT ? glyph(i, t) : toCh;
          draw(cell, ch, 0.6 + 0.4 * p, 0.86 + 0.14 * p, 2 * (1 - p));
        } else {
          draw(cell, toCh, 1, 1, 0);
        }
      }
    };

    const hold = () => {
      after(WORDS[index] === BRAND ? HOLD_BRAND : HOLD_WORD, next);
    };

    const next = () => {
      // Checked at the hold boundary, never mid-transition: a word that froze
      // half-scrambled under the cursor would read as a bug, not a pause.
      if (paused) {
        after(PAUSED_POLL, next);
        return;
      }

      const from = WORDS[index];
      index = (index + 1) % WORDS.length;
      const to = WORDS[index];

      // Growing, the bracket leads and opens the space. Shrinking, it waits
      // for the trailing cells to empty so it never slides over a live letter.
      if (to.length >= from.length) setShift(to.length);
      else after(SHRINK_DELAY, () => setShift(to.length));

      let swapped = false;
      const start = performance.now();

      const tick = (now: number) => {
        if (cancelled) return;
        const t = now - start;

        // Colour turns over as the new word starts rebuilding, not before.
        if (!swapped && t >= OUT_SPAN) {
          swapped = true;
          root.dataset.wm = to === BRAND ? "brand" : "quiet";
        }

        if (t >= TOTAL) {
          frame = 0;
          paint(from, to, TOTAL);
          hold();
          return;
        }

        paint(from, to, t);
        frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
    };

    root.dataset.wm = "brand";
    measure();

    // The size is a fluid clamp, so 1ch changes on every resize.
    const observer = new ResizeObserver(measure);
    observer.observe(cells);

    // Hover pauses it (WCAG 2.2.2 — prefers-reduced-motion does not discharge
    // that). Same idea as .marquee pausing under the pointer.
    const hit = cells.parentElement ?? root;
    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };
    hit.addEventListener("pointerenter", onEnter);
    hit.addEventListener("pointerleave", onLeave);
    root.addEventListener("focusin", onEnter);
    root.addEventListener("focusout", onLeave);

    // Fonts load with `font-display: swap`, so 1ch is the fallback's advance
    // until Geist Mono lands. Measure after the swap or the first shift is
    // computed from the wrong metrics. The flag matters: StrictMode's first
    // cleanup runs before this promise settles, and a promise is the one
    // continuation the timer Set cannot cancel.
    const begin = () => {
      if (cancelled) return;
      measure();
      after(FIRST_DELAY, next);
    };
    if (document.fonts) document.fonts.ready.then(begin);
    else begin();

    return () => {
      cancelled = true;
      if (frame) cancelAnimationFrame(frame);
      timers.forEach((id) => window.clearTimeout(id));
      timers.clear();
      observer.disconnect();
      hit.removeEventListener("pointerenter", onEnter);
      hit.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("focusin", onEnter);
      root.removeEventListener("focusout", onLeave);

      // Restore the resting mark so a remount — or reduced motion switched on
      // mid-cycle — lands on a clean <PLACEHOLDERWORKS>.
      root.style.removeProperty("--wm-shift");
      root.dataset.wm = "brand";
      const kids = cells.children;
      for (let i = 0; i < kids.length; i++) {
        const cell = kids[i] as HTMLElement;
        cell.textContent = BRAND[i] ?? "";
        cell.style.cssText = "";
      }
    };
  }, [rootRef, cellsRef, enabled]);
}
