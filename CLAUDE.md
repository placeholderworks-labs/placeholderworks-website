# CLAUDE.md — Placeholder (AI Services Landing Page)

> Company name is **"Placeholder"** until decided. Use it verbatim wherever a name is needed.

---

## 1. Project & Stack

This repo is a **single-page marketing / landing site** for an AI **services** company —
an AI engineering and implementation partner, not a SaaS product. It is a
business-development experience whose primary conversion is **starting a conversation
about an AI project**.

**Stack (do not swap without reason):**

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** — tokens defined in CSS via `@theme` (see §4)
- **GSAP + ScrollTrigger** — scroll-driven narrative sequences
- **Motion** (`motion` package) — component enter/exit + micro-interactions
- **Lenis** — smooth scroll (makes sections feel continuous)
- **shadcn/ui** — pull in only the primitives actually used (dialog, input, label). These are copied into the repo, not a runtime dependency.
- **lucide-react** — icons

Do **not** introduce additional UI libraries, animation libraries, or CSS frameworks.
Reuse what's here. Prefer composition over new dependencies.

**Commands** (fill in once scaffolded):

```
pnpm dev        # local dev server
pnpm build      # production build
pnpm preview    # preview production build
pnpm lint       # eslint
```

**Structure:**

```
src/
  components/      # reusable, presentational
  sections/        # one file per narrative section (§6)
  hooks/           # useLenis, useScrollProgress, etc.
  lib/             # utils, gsap setup, motion variants
  styles/          # index.css with @theme tokens
  App.tsx
```

**Placeholders & data:** Never fabricate metrics, clients, logos, partners,
awards, or testimonials. When a real value isn't provided, use a clearly marked
`[PLACEHOLDER]` and structure the section so real content drops in later.
Contact form should POST to `[CONTACT_ENDPOINT]`.

---

## 2. What We Are

An AI engineering and implementation partner. We identify, design, build, integrate,
and **deploy** AI solutions that solve real business problems. We take AI from idea to
production — we build, we don't merely advise.

The impression to create: **"These people can actually build and deploy this."**
Not: "another company selling an AI tool."

Capabilities we can draw on (show *depth*, never dump as a list): AI strategy, generative
AI, custom AI applications, agents/agentic systems, LLM integrations, RAG, automation,
voice AI, enterprise integrations, data/knowledge systems, evals & monitoring, AI infra.

Always connect technical capability to business value: revenue, efficiency, customer
experience, automation, decision-making, operational scale, productivity, cost, speed,
quality.

We are **not** a SaaS product. Do not design around pricing tiers, free trials, sign-up
flows, dashboards, or feature-comparison tables.

---

## 3. Design Mission

Polished, intentional, premium, technical, distinctive, confident. Closer to a **digital
editorial experience** than a corporate site: dark-first, strong typography, generous
whitespace, cinematic but restrained motion, narrative scrolling.

Goal: **simple at first glance, extraordinary when experienced.** "Extraordinary" comes
from better composition, typography, spacing, transitions, and details — not more
gradients, effects, or 3D.

Guiding order: **Restraint > decoration · Story > template · Typography > clutter ·
Craft > trends · Clarity > complexity.**

---

## 4. Design System (locked decisions)

These are the actual values. Swap only deliberately, in one place.

**Color** — dark-first, never pure black. Background scale (darkest → raised surface):

```
--bg-0:  #08090A   /* page */
--bg-1:  #0D0E10   /* raised surface */
--bg-2:  #131416   /* hover / active surface */
--line:  #1E2023   /* hairline borders */

--fg:    #ECEBE7   /* primary text, warm off-white — NOT #FFFFFF */
--fg-2:  #9A9B9E   /* secondary */
--fg-3:  #626366   /* tertiary */

--accent:        #C558B0   /* solid mid — flat UI, marks, focus ring (AA on bg-0) */
--accent-fg:     #F5F1EF   /* text on accent (near-white) */
--accent-from:   #C92F47   /* crimson — gradient start (tuned for AA under white) */
--accent-to:     #7C3AED   /* violet — gradient end */
--accent-gradient: linear-gradient(120deg, var(--accent-from), var(--accent-to))
```

The accent is a deliberate **crimson→violet mix** (client direction). Apply it as a
**gradient on prominent fills** — primary CTA, the signature spine, the hero accent
word — and as the **solid mid-tone** (`--accent`) everywhere flat: text links,
hairline rules, focus ring, marks. It still signals **primary actions, active states,
and key highlights** only — never decorative. Keep it to this one accent family.

**Typography** — one coherent pairing:

```
--font-sans: "Geist", system-ui, sans-serif;   /* everything */
--font-mono: "Geist Mono", monospace;           /* technical accents, labels, metrics */
```

Headlines: large, short, editorial, confident; scale fluidly with the viewport
(`clamp()`). A strong headline should fill space without feeling empty. No third font.

**Radius & elevation:** tight and quiet. `--r-sm: 4px`, `--r-md: 8px`, `--r-lg: 12px`.
Default to hairline borders + tonal surface changes over shadows. Depth via subtle
gradients, blur, transparency, and very subtle grain — not stacked shadows.

**Motion:** durations 200–600ms; easing `cubic-bezier(0.22, 1, 0.36, 1)`. Animate
`transform`/`opacity` only. Reuse shared Motion variants from `lib/`. Motion serves the
narrative; it is never ambient decoration.

---

## 5. Narrative

The page should feel continuous and take the visitor somewhere — not stacked, unrelated
blocks. Arc:

```
Opening statement → Big idea → Supporting evidence →
Capability / how we work → Proof (work) → Invitation
```

Every section earns its place by telling one thing: a belief, a problem, a
transformation, a capability, evidence, or an invitation. Use scroll-triggered reveals,
pinned sequences, and progressive text — always subordinate to readability and
performance.

By the end, a visitor understands: who we are · what we can build · what problems we
solve · why to trust us · what working with us looks like · how to start a conversation.

---

## 6. Sections (intent, not a fixed template)

Think in scenes, not `Hero/Features/Testimonials/Pricing/Footer`.

- **Opening** — full-viewport. Establishes identity as an opening scene (atmospheric
  motion or large kinetic type), not necessarily headline + two buttons. Kinetic
  typography allowed here and sparingly elsewhere; animate words/lines to reinforce
  meaning, not everywhere.
- **Big idea** — the core positioning: *we build and deploy, we don't just advise.*
- **How we work** — problem → discovery → design → build → integration → production →
  iteration. Show ownership of implementation.
- **Capabilities** — framed as **problem → solution → outcome**, never a grid of
  buzzword cards. Technical detail can surface progressively, deeper in.
- **Work / case studies** — evidence, not marketing cards. Editorial layout, metrics
  woven into the story, before/after narrative, progressive technical reveals.
  (Use `[PLACEHOLDER]` structures — never invent results.)
- **Invitation** — a contact experience that reads as "let's discuss a problem," not a
  generic "Contact Us."

---

## 7. Navigation, Components, CTAs, Forms, Footer

- **Nav:** minimal. Small logo, few links, floating/contextual; never competes with the
  story. Let content drive exploration.
- **Components:** visually quiet. Reach for whitespace, type, alignment, tonal change,
  and borders **before** cards. Use a card only when it genuinely aids comprehension —
  not every block wrapped in a rounded rectangle.
- **Glass/transparency:** selective enhancement only (dark translucent surface, subtle
  blur, soft border). Not everywhere, no glowing borders.
- **CTAs:** clear hierarchy (primary / secondary / tertiary); never five equal buttons.
  Primary action encourages starting a conversation. Concise, confident copy — avoid
  "Learn More / Get Started / Click Here" unless truly apt.
- **Forms:** part of the brand experience. Minimal fields, strong type, excellent focus
  states, subtle validation, thoughtful success state with personality but total
  clarity.
- **Footer:** minimal — contact, essential nav, social, legal, brand mark. No giant
  sitemap.

---

## 8. Copy

Confident, concise, intelligent, specific, outcome-oriented, human. State what we do,
who we help, what we build, and what changes after we build it. The visuals can be
experimental; **the copy stays clear.**

Banned filler: "leverage cutting-edge technology," "transform your business with AI,"
"unlock the power of AI," "the future is here," "revolutionize your workflow" — unless
backed by genuine specifics.

---

## 9. Hard Rules (consolidated — do not violate)

**Never fabricate** clients, logos, partners, awards, certifications, metrics,
testimonials, or results. Use `[PLACEHOLDER]`.

**Never default to generic-AI-website patterns:** glowing
blobs, heavy glassmorphism, SaaS dashboards, three-column feature grids, endless rounded
cards, gradient text everywhere, floating pills, "AI-powered" badges, fake stats, stock
photos of people at laptops, decorative UI with no purpose, excessive shadows/rounding,
empty hero with meaningless copy. If a draft looks like a generic site generator made
it, rethink it.

**Inspiration, not imitation:** the aesthetic direction is dark editorial, narrative
scrolling, cinematic restraint, large confident type, case studies as stories. Extract
principles and build an original identity. Never copy any specific company's messaging,
wording, logo, colors, structure, animations, clients, or motifs.

---

## 10. Accessibility & Performance (non-negotiable)

- Semantic HTML, keyboard navigation, visible focus states, screen-reader labels,
  sufficient contrast, adequate touch targets.
- Honor `prefers-reduced-motion` — ship a genuinely less-animated experience, and ensure
  the site works fully without JS-driven motion.
- Responsive by intent for mobile / tablet / desktop / large — recompose for mobile,
  don't just shrink desktop.
- Optimize images/video (responsive sources, posters, lazy-load, compression). Animate
  transforms/opacity only; avoid layout-triggering animation. Watch bundle size and font
  loading.

---

## 11. Before Building & Final Review

**Before a major section:** know the objective, the main message, and the primary
action; establish narrative, type, spacing, and hierarchy; decide where motion adds
value — *then* implement. Don't emit a standard component layout by reflex. Inspect
existing components/tokens/utilities first and reuse them.

**Ship checklist:**

- Feels premium, original, and clearly like an AI **engineering** company (not SaaS).
- Type hierarchy obvious; headlines strong; no filler text; type carries the design.
- Page breathes; layout intentional; nothing fights for attention.
- Motion communicates; scrolling rewards; transitions smooth; works without animation.
- Background has subtle depth; contrast comfortable; surfaces differentiated without
  card-clutter.
- Buttons responsive; hover/focus polished; forms pleasant; loading/error/success
  states designed.
- Clear that we **build and deploy**; value to a client is obvious; path to a
  conversation is clear.
- Mobile feels intentional, not cramped; narrative still works; motion performant.