/* eslint-disable react-refresh/only-export-components -- build-time entry, never hot-reloaded */
/**
 * Build-time render. `scripts/prerender.mjs` calls `render` once per route and
 * writes the result into that route's index.html, so every page ships with its
 * content and head in the HTML rather than an empty #root.
 */
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { setServerPath } from "./lib/router";
import { headFor, headHtml, INDEXABLE } from "./lib/seo";

export { INDEXABLE };

export function render(path: string) {
  setServerPath(path);
  const html = renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
  return { html, head: headHtml(headFor(path)) };
}
