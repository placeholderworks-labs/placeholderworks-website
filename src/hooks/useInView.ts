import { useEffect, useRef, useState } from "react";

/**
 * True while the element sits above a line across the viewport.
 *
 * `bottomMargin` shrinks the observer's viewport from the bottom, which moves
 * the trigger line up: "-40%" fires once the element reaches the top 60% of
 * the screen. The flag goes back to false on the way up, so a scroll-driven
 * state change can be seen more than once.
 *
 * Deliberately a threshold, not a scroll position: nothing runs per frame, and
 * there is no in-between state to render.
 */
export function useInView<T extends HTMLElement>(bottomMargin = "-40%") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: `0px 0px ${bottomMargin} 0px` }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [bottomMargin]);

  return { ref, inView };
}
