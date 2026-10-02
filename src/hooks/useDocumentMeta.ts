import { useEffect } from "react";
import { SITE_NAME, SITE_URL } from "@/lib/routes";

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
 * Keeps the document head in step with the current route.
 *
 * The site is client-rendered from one `index.html`, so every route would
 * otherwise share the home page's title and description. The canonical link
 * matters more than usual here: `netlify.toml` serves `/*` as `index.html`
 * with status 200, so an unknown path returns a page rather than a 404, and
 * without a canonical every typo'd URL looks like duplicate content.
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
    const full =
      path === "/" ? `${SITE_NAME} — ${title}` : `${title} — ${SITE_NAME}`;
    document.title = full;

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
