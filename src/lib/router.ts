import { useSyncExternalStore } from "react";

/**
 * A router, in the smallest form this site needs (CLAUDE.md §1 — prefer
 * composition over new dependencies). Seven static pages and a home page do
 * not justify a routing library; they justify the History API and a listener.
 *
 * The companion `<Link>` in `components/Link.tsx` keeps a real `href`, so
 * middle-click, cmd-click, "open in new tab" and crawling all behave exactly
 * as they would on a plain static site.
 */

export const NAVIGATE = "app:navigate";

/** Trailing slashes are cosmetic; one canonical spelling keeps matching sane. */
export function normalize(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(NAVIGATE, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(NAVIGATE, onChange);
  };
}

const read = () => normalize(window.location.pathname);

/**
 * The path being prerendered. `scripts/prerender.mjs` sets it before each
 * render, since there is no `window.location` at build time.
 */
let serverPath = "/";
export function setServerPath(path: string) {
  serverPath = normalize(path);
}

/**
 * During hydration React reads the server snapshot, so in the browser it must
 * be the real path: a prerendered /services hydrating as "/" would mismatch
 * and throw the page away.
 */
const readServer = () =>
  typeof window === "undefined" ? serverPath : read();

/** The current path, re-rendering the tree whenever it changes. */
export function usePath(): string {
  return useSyncExternalStore(subscribe, read, readServer);
}

export function navigate(to: string, replace = false) {
  const url = new URL(to, window.location.origin);
  const same =
    normalize(url.pathname) === read() && url.hash === window.location.hash;

  if (!same) {
    window.history[replace ? "replaceState" : "pushState"]({}, "", url);
  }
  // Dispatch even when the URL is unchanged: a repeat click on the current
  // section should still re-run the scroll effect.
  window.dispatchEvent(new Event(NAVIGATE));
}
