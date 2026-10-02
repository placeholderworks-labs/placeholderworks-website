# Placeholderworks

Marketing site for [Placeholderworks](https://placeholderworks.com), an AI engineering and implementation company. We build AI that makes it to production.

Design and content rules live in [CLAUDE.md](CLAUDE.md). Read it before changing the UI.

## Stack

- Vite, React 19, TypeScript
- Tailwind CSS v4, with design tokens in [src/styles/index.css](src/styles/index.css) via `@theme`
- Motion for interaction feedback, lucide-react for icons
- Geist and Geist Mono, self-hosted through Fontsource

## Getting started

```bash
pnpm install
pnpm dev        # local dev server
pnpm build      # type-check, build, prerender every route to dist/
pnpm preview    # serve the production build
pnpm lint       # eslint
```

## Structure

```
src/
  sections/     home page scenes: Hero, Thesis, Process, Capabilities,
                Work, Faq, Invitation, Footer (plus Products, used on /services)
  pages/        Services, Portfolio, Privacy, Terms, NotFound
  components/   shared UI: Nav, Section, Button, ServiceVideo, Wordmark
  hooks/        hero grid, word cycle, sequence progress, reduced motion
  lib/          content and config (see below), router, SEO head, motion
  styles/       index.css: tokens and base styles
  entry-server.tsx   build-time render, used by the prerender step
scripts/
  prerender.mjs writes each route's HTML, 404.html and sitemap.xml
public/         images, logos, videos, robots.txt, llms.txt
```

## Editing content

| What | Where |
| --- | --- |
| Email, WhatsApp number and message, socials | [src/lib/contact.ts](src/lib/contact.ts) |
| Services by modality and domain, home page featured services | [src/lib/services.ts](src/lib/services.ts) |
| Client case studies (Evidence and Portfolio) | [src/lib/work.ts](src/lib/work.ts) |
| Products | [src/sections/Products.tsx](src/sections/Products.tsx) |
| FAQ | [src/sections/Faq.tsx](src/sections/Faq.tsx) |
| Page titles, descriptions and headings | [src/lib/routes.ts](src/lib/routes.ts) |
| Social previews, canonical URLs, structured data | [src/lib/seo.ts](src/lib/seo.ts) |
| Privacy Policy and Terms | [src/pages/Privacy.tsx](src/pages/Privacy.tsx), [src/pages/Terms.tsx](src/pages/Terms.tsx) |

**Videos.** Put the file in `public/videos/`, then set `src` (and `poster`) on that slot's `video` entry. A slot with only a `poster` shows the still image; a slot with neither shows a marked placeholder. All three keep the same 16:9 box.

**Facts, not claims.** Never add client names, logos, metrics or results that are not real and cleared.

## SEO and AI discovery

Every route is prerendered at build time, so crawlers, AI agents and link previews get the full page and its own head without running JavaScript; the browser then hydrates it.

- **Head per page** ([src/lib/seo.ts](src/lib/seo.ts)): title, description, self-referencing canonical, Open Graph and Twitter tags, and JSON-LD (Organization and WebSite everywhere; BreadcrumbList on subpages; Service list on /services; VideoObject for the launch videos).
- **sitemap.xml**: generated from [src/lib/routes.ts](src/lib/routes.ts) on every build, with each page's lastmod taken from git. Add a route there and it is prerendered and listed automatically.
- **404s**: unknown paths get `404.html` with a real 404 status. Retired URLs (`/faq`, `/blogs`, `/contact-us`) 301 to their home page sections.
- [public/robots.txt](public/robots.txt): allows search engines and AI crawlers, declares content signals, links the sitemap.
- [public/llms.txt](public/llms.txt): plain-text company summary for AI assistants; update it when services, products or client work change.

Code that runs during render must not touch `window` or `document` (use effects), or the prerender step fails.

## Deployment

Configured for both Vercel ([vercel.json](vercel.json)) and Netlify ([netlify.toml](netlify.toml)): `pnpm build`, serve `dist/` with clean URLs (`/services` is `services.html`), the redirects above, long caching for hashed assets, and security headers including a Content-Security-Policy. Node 20.11 or newer is required for the build.

## Accessibility

Semantic HTML, keyboard navigation with visible focus, and AA contrast throughout. `prefers-reduced-motion` turns off all ambient motion, and the site works fully without it.
