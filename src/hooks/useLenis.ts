import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, initGsap } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

/** Live singleton so anchor links can drive the same scroll instance. */
let instance: Lenis | null = null;

/**
 * Smooth-scroll to a section by id. Uses Lenis when active; otherwise falls
 * back to a native jump (which is what we want under reduced motion / no-JS).
 */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) {
    instance.scrollTo(el, { offset: 0, duration: 1.1 });
  } else {
    el.scrollIntoView({ behavior: "auto", block: "start" });
  }
}

/**
 * Smooth scroll via Lenis, driven off GSAP's ticker so ScrollTrigger stays in
 * sync. When the user prefers reduced motion we skip Lenis entirely and let the
 * browser scroll natively — the site must work fully without JS-driven motion.
 */
export function useLenis() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    initGsap();
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    instance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      instance = null;
    };
  }, [reduced]);
}
