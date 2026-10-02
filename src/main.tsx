import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./styles/index.css";
import App from "./App";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Built pages arrive prerendered (scripts/prerender.mjs), so React attaches to
// the HTML already there. The dev server serves an empty #root instead.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
