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
pnpm build      # type-check and production build to dist/
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
  lib/          content and config (see below), router, motion variants
  styles/       index.css: tokens and base styles
public/         images, logos, videos, robots.txt, sitemap.xml, llms.txt
```

## Editing content

| What | Where |
| --- | --- |
| Email, WhatsApp number and message, socials | [src/lib/contact.ts](src/lib/contact.ts) |
| Services by modality and domain, home page featured services | [src/lib/services.ts](src/lib/services.ts) |
| Client case studies (Evidence and Portfolio) | [src/sections/Work.tsx](src/sections/Work.tsx) |
| Products | [src/sections/Products.tsx](src/sections/Products.tsx) |
| FAQ | [src/sections/Faq.tsx](src/sections/Faq.tsx) |
| Page titles, descriptions and headings | [src/lib/routes.ts](src/lib/routes.ts) |
| Privacy Policy and Terms | [src/pages/Privacy.tsx](src/pages/Privacy.tsx), [src/pages/Terms.tsx](src/pages/Terms.tsx) |

**Videos.** Put the file in `public/videos/`, then set `src` (and `poster`) on that slot's `video` entry. A slot with only a `poster` shows the still image; a slot with neither shows a marked placeholder. All three keep the same 16:9 box.

**Facts, not claims.** Never add client names, logos, metrics or results that are not real and cleared.

## SEO and AI discovery

- [public/robots.txt](public/robots.txt): allows search engines and AI crawlers, links the sitemap
- [public/sitemap.xml](public/sitemap.xml): keep in step with [src/lib/routes.ts](src/lib/routes.ts)
- [public/llms.txt](public/llms.txt): plain-text company summary for AI assistants; update it when services, products or client work change

## Deployment

Configured for both Vercel ([vercel.json](vercel.json)) and Netlify ([netlify.toml](netlify.toml)). Each runs `pnpm build`, serves `dist/`, and falls back to `index.html` for any path that is not a real file, so client-side routes load directly. Static files such as `robots.txt`, `sitemap.xml` and `llms.txt` are served as they are.

## Accessibility

Semantic HTML, keyboard navigation with visible focus, and AA contrast throughout. `prefers-reduced-motion` turns off all ambient motion, and the site works fully without it.
