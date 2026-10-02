import { useEffect, type RefObject } from "react";

/** How often a new set of cells lights up. */
const INTERVAL = 1800;
/**
 * How long a cell stays lit before it starts fading back out. Must exceed the
 * cells' own fade-in (1.5s, set in Hero) or a blip would start receding before
 * it ever reached full strength.
 */
const HOLD = 1800;
/** Cells lit per tick, inclusive range. */
const MIN_PER_TICK = 2;
const MAX_PER_TICK = 3;

function randomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

/**
 * Ambient blips for the hero grid: a couple of random cells pulse on and off
 * so the band is alive on touch devices, where the hover fill never fires.
 *
 * Writes `data-blip` straight onto the DOM nodes rather than holding lit cells
 * in React state — state would re-render and diff the entire grid every tick,
 * where this touches two or three nodes. The cells' own colour transition does
 * the fading, so nothing animates on the JS side.
 *
 * Pass `enabled: false` under reduced motion; an unattended looping animation
 * has to honour that preference.
 */
export function useGridBlips(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
  /** How many of the grid's leading cells are on screen; defaults to all. */
  visible?: () => number
) {
  useEffect(() => {
    const grid = ref.current;
    if (!enabled || !grid) return;

    const pending = new Set<number>();

    const tick = () => {
      const cells = grid.children;
      const pool = Math.min(cells.length, visible?.() ?? cells.length);
      if (pool === 0) return;

      const count =
        MIN_PER_TICK + randomInt(MAX_PER_TICK - MIN_PER_TICK + 1);
      // A Set keeps the picks distinct, so "three cells" is really three.
      const picks = new Set<number>();
      while (picks.size < Math.min(count, pool)) {
        picks.add(randomInt(pool));
      }

      for (const index of picks) {
        const cell = cells[index] as HTMLElement | undefined;
        if (!cell) continue;
        cell.dataset.blip = "";

        const timer = window.setTimeout(() => {
          pending.delete(timer);
          delete cell.dataset.blip;
        }, HOLD);
        pending.add(timer);
      }
    };

    const interval = window.setInterval(tick, INTERVAL);
    tick();

    return () => {
      window.clearInterval(interval);
      for (const timer of pending) window.clearTimeout(timer);
      // Clear any cell still lit when we tear down, so a re-mount starts clean.
      for (const cell of Array.from(grid.children)) {
        delete (cell as HTMLElement).dataset.blip;
      }
    };
  }, [ref, enabled, visible]);
}
