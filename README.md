# Placeholder — landing site

Single-page, dark-editorial marketing site for an AI engineering &
implementation partner. Built to the brief in [CLAUDE.md](CLAUDE.md), with the
Apple-level UI craft from [frontend.md](frontend.md).

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (tokens defined in [src/styles/index.css](src/styles/index.css) via `@theme`)
- Motion — component reveals & micro-interactions
- GSAP + ScrollTrigger — wired to Lenis for scroll-synced sequences
- Lenis — smooth scroll
- lucide-react — icons

## Commands

```bash
pnpm dev        # local dev server
pnpm build      # typecheck + production build
pnpm preview    # preview the production build
pnpm lint       # eslint
```

## Structure

```
src/
  components/   # Button, Nav, Spine, Section, Reveal, AnimatedText
  sections/     # one file per narrative scene (Opening → Invitation, Footer)
  hooks/        # useLenis, useScrollProgress, useActiveSection, useReducedMotion
  lib/          # motion variants, gsap setup, section map, utils
  styles/       # index.css — @theme design tokens + base layer
  App.tsx
```

## Before going live

Replace the clearly-marked placeholders — never ship invented data:

- `[CONTACT_ENDPOINT]` in [src/sections/Invitation.tsx](src/sections/Invitation.tsx) — the form POSTs here (until set, it simulates a successful submit).
- `[PLACEHOLDER@EMAIL]`, social/legal `[PLACEHOLDER_URL]` in the footer.
- The `[PLACEHOLDER]` case-study fields in [src/sections/Work.tsx](src/sections/Work.tsx).
- The company name `Placeholder` throughout, once decided.

## Accessibility & motion

Honors `prefers-reduced-motion` (entrance choreography is dropped and the site
reads as a static document), keyboard-navigable with visible focus, and works
without JS-driven motion.
