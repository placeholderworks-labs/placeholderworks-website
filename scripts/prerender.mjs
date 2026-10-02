/**
 * Prerender every route to static HTML, after `vite build` (client) and
 * `vite build --ssr` (server entry).
 *
 * Crawlers, AI agents and social link previews read each page's HTML without
 * running JavaScript, so each one gets its content, its own head (title,
 * description, canonical, Open Graph, JSON-LD) and the font preloads. The
 * browser then hydrates that HTML instead of building the page from nothing.
 *
 * Output, all in dist/:
 *   index.html, services.html, portfolio.html, …  one per route; Vercel
 *     (cleanUrls) and Netlify (pretty URLs) serve /services from services.html
 *   404.html     served with a real 404 status for any unknown path
 *   sitemap.xml  generated from the same route list, lastmod from git
 */
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = resolve(import.meta.dirname, "..");
const DIST = resolve(ROOT, "dist");
const SSR = resolve(ROOT, "dist-ssr");
const SITE_URL = "https://placeholderworks.com";

const { render, INDEXABLE } = await import(
  pathToFileURL(resolve(SSR, "entry-server.js")).href
);

const template = readFileSync(resolve(DIST, "index.html"), "utf8");
if (!template.includes("<!--head:start-->") || !template.includes("<!--app-html-->")) {
  throw new Error("index.html is missing the prerender markers");
}

/**
 * Preload the two Latin font files the first screen needs (Geist for the
 * headline, Geist Mono for the hero mark), so text paints in its real face
 * without waiting for the stylesheet to be parsed first.
 */
const fonts = readdirSync(resolve(DIST, "assets"))
  .filter((f) => /^geist(-mono)?-latin-wght-normal-.*\.woff2$/.test(f))
  .map(
    (f) =>
      `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`
  );

function page(path) {
  const { html, head } = render(path);
  return template
    .replace(
      /<!--head:start-->[\s\S]*?<!--head:end-->/,
      [head, ...fonts].join("\n    ")
    )
    .replace("<!--app-html-->", html);
}

const fileFor = (path) => (path === "/" ? "index.html" : `${path.slice(1)}.html`);

for (const path of INDEXABLE) {
  writeFileSync(resolve(DIST, fileFor(path)), page(path));
}
// Any path that is not a route renders the NotFound page (noindex).
writeFileSync(resolve(DIST, "404.html"), page("/404"));

/**
 * Sitemap, from the same route list. lastmod is the last commit touching the
 * files that make up each page, so it only moves when the page does. Without
 * git history (a shallow clone) it falls back to the build date.
 */
const SOURCES = {
  "/": ["src/App.tsx", "src/sections", "src/lib/services.ts", "src/lib/work.ts"],
  "/services": ["src/pages/Services.tsx", "src/lib/services.ts", "src/sections/Products.tsx"],
  "/portfolio": ["src/pages/Portfolio.tsx", "src/sections/Work.tsx", "src/lib/work.ts"],
  "/privacy": ["src/pages/Privacy.tsx"],
  "/terms": ["src/pages/Terms.tsx"],
};
const today = new Date().toISOString().slice(0, 10);

function lastmod(path) {
  try {
    const out = execFileSync(
      "git",
      ["log", "-1", "--format=%cs", "--", ...(SOURCES[path] ?? ["src"])],
      { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
    ).trim();
    return out || today;
  } catch {
    return today;
  }
}

const urls = INDEXABLE.map(
  (path) =>
    `  <url>\n    <loc>${path === "/" ? SITE_URL : SITE_URL + path}</loc>\n    <lastmod>${lastmod(path)}</lastmod>\n  </url>`
).join("\n");

writeFileSync(
  resolve(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

rmSync(SSR, { recursive: true, force: true });
console.log(`prerendered ${INDEXABLE.length} pages + 404.html, sitemap.xml`);
