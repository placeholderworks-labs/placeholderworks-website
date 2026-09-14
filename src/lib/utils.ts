/** Tiny classname joiner — filters falsy values. Keeps us off extra deps. */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Scroll to a section by id. Native smooth scroll — `scroll-behavior` is set
 * in the base layer and reverts to `auto` under prefers-reduced-motion, so
 * this honours the user's setting for free. Sections carry `scroll-mt-*` so
 * the fixed header doesn't cover the heading.
 *
 * Anchors keep real hrefs alongside this, so navigation works without JS.
 */
export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ block: "start" });
}
