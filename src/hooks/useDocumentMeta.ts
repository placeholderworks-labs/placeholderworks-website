import { useEffect } from "react";
import { SITE_URL } from "@/lib/routes";
import { fullTitle } from "@/lib/seo";

/** Find a head tag by selector, or create and append it. */
function tag<T extends HTMLElement>(
  selector: string,
  make: () => T
): T {
  const found = document.head.querySelector<T>(selector);
  if (found) return found;
  const created = make();
  document.head.appendChild(created);
  return created;
}

/**
 * Keeps the document head in step as the reader navigates in the browser.
 *
 * Each page's first load already carries its full head, written at build time
 * by `scripts/prerender.mjs` from `lib/seo.ts`. Client-side navigation swaps
 * the page without a reload, so this updates the title, description,
 * canonical and robots tags to match.
 */
export function useDocumentMeta(opts: {
  title: string;
  description: string;
  path: string;
  /** Tell crawlers not to index this page (used by the 404). */
  noindex?: boolean;
}) {
  const { title, description, path, noindex = false } = opts;

  useEffect(() => {
    document.title = fullTitle(path, title);

    tag<HTMLMetaElement>('meta[name="description"]', () => {
      const m = document.createElement("meta");
      m.name = "description";
      return m;
    }).content = description;

    // A noindex page has no canonical URL to point at — `/404` is not a real
    // address, and canonicalising a mistyped URL to it would be worse than
    // saying nothing. Drop the tag instead.
    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (noindex) {
      canonical?.remove();
    } else {
      tag<HTMLLinkElement>('link[rel="canonical"]', () => {
        const l = document.createElement("link");
        l.rel = "canonical";
        return l;
      }).href = `${SITE_URL}${path === "/" ? "" : path}`;
    }

    const robots = tag<HTMLMetaElement>('meta[name="robots"]', () => {
      const m = document.createElement("meta");
      m.name = "robots";
      return m;
    });
    robots.content = noindex ? "noindex, follow" : "index, follow";
  }, [title, description, path, noindex]);
}
