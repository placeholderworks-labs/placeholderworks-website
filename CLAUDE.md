# CLAUDE.md — Placeholderworks (AI Services Landing Page)

> Company name is **"Placeholderworks"** (domain placeholderworks.com). Use it verbatim wherever a name is needed.

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
editorial experience** than a corporate site: light and structural, strong typography,
generous whitespace, narrative scrolling. Sharp rectangles and hairline rules — the
page is built from a grid you can see, not from cards. Motion is restrained to the
point of near-absence: functional feedback only, never ambient.

Goal: **simple at first glance, extraordinary when experienced.** "Extraordinary" comes
from better composition, typography, spacing, transitions, and details — not more
gradients, effects, or 3D.

Guiding order: **Restraint > decoration · Story > template · Typography > clutter ·
Craft > trends · Clarity > complexity.**

---

## 4. Design System (locked decisions)

These are the actual values. Swap only deliberately, in one place.

**Color** — white page, with one dark band at the top carrying the nav and identity.
That band is the only dark surface; there is no mid-page darkness.

```
--bg-0:  #FFFFFF   /* page */
--bg-1:  #F4F4F2   /* raised surface / alternating band */
--bg-2:  #E8E8E5   /* hover / active surface */
--line:  #D8D8D4   /* hairline grid */

--ink:      #0A0A0B   /* the dark band ground */
--ink-line: #26262A   /* grid lines inside the dark band */

--fg:    #0A0A0B   /* primary text */
--fg-2:  #52525A   /* secondary */
--fg-3:  #8A8A92   /* tertiary — never small body copy */

--accent:    #C92F47   /* flat crimson */
--accent-fg: #FFFFFF   /* text on accent */
--danger:    #B3261E   /* form validation */
```

The accent is a **single flat crimson**, from the originally specified accent family
but with the gradient retired — gradients read as decoration in this system. It is
5.2:1 both on white and under white text, so it passes AA as a text colour *and* as a
fill, with no text-shadow patch needed. On `--ink` it falls to ~3.6:1, so inside the
dark band it is restricted to **fills, rules and marks — never small text**.

It signals **primary actions, active states, and key highlights** only — never
decorative. Keep it to this one accent. No gradients anywhere.

**Typography** — one coherent pairing:

```
--font-sans: "Geist", system-ui, sans-serif;   /* everything */
--font-mono: "Geist Mono", monospace;           /* technical accents, labels, metrics */
```

Headlines: large, short, editorial, confident; scale fluidly with the viewport
(`clamp()`). A strong headline should fill space without feeling empty. No third font.

**Radius & elevation:** **zero radius** — every surface is a sharp rectangle. The
radius token names are kept, set to `0`, so any stray `rounded-*` resolves to square.
Structure comes from **hairline borders and collapsed-border cells**, never from
shadows, blur, glass, or grain. There is no elevation system; there is a grid.

**Motion:** minimal by default. **No ambient or looping motion** — no parallax, no
smooth-scroll hijacking, no page-level scroll-progress indicator, no entrance
reveals. What remains is *functional feedback*: a state change the user caused
and needs to see (the mobile menu opening, the contact form reaching success), plus
colour transitions on hover and focus.

**Exception 1 — sequence progress.** Scroll position may drive a progress
indicator *within an explicitly ordered sequence* (the Process rail), because there
it reports the reader's position in that sequence rather than decorating the page.
It is not licence for scroll-driven motion generally. Such an indicator must: animate
`transform`/`opacity` only; never intercept, retime or redirect the scroll — the wheel
still moves the page by exactly what the user asked for; and render in its final,
complete, static state under `prefers-reduced-motion`, with no added page height at
all in that mode. Colour must not be the only carrier of the information.

The indicator **may** be damped — eased toward the scroll position rather than pinned
to it 1:1 — since a wheel notch arrives as one ~100px jump and an undamped rail jumps
with it. This is not retiming the scroll: the page still goes exactly where the wheel
sent it, and only the indicator glides after it. Keep the settle inside the 150–350ms
feedback band, use a curve that cannot overshoot, and make sure it comes to a complete
stop — an indicator still easing at rest is ambient motion by another name.

The sequence **may** hold the section still while it plays, by way of a sticky child
inside a taller runway. The hold buys legibility — without it the fill is over before
it registers — but it is strictly budgeted: **at most ~2.5 viewports** of extra height,
with the fill occupying only the middle of it so the section comes to rest before the
rail starts and stays at rest once it is full. Those two pauses are what separate a
deliberate beat from a page that feels stuck. Anything longer is hijacking.

Read that budget per segment, not whole. The Process rail divides it six ways, and a
sequence that is comfortable end to end can still flick past any one segment too fast
to watch — which is the failure the hold exists to prevent, so the per-segment number
is the one to judge. The two rest pauses are the opposite: they are absolute, and a
beat does not get longer because the sequence did. Expressed as fractions of the hold
they must shrink as it grows, or the section reads as stalled at both ends.

Where the row is too wide for the viewport, that same progress **may** also walk the
row sideways, so the reader only ever scrolls in one direction and never has to swipe.
The vertical scroll is still worth exactly what the user spent — the horizontal travel
is the indicator, not a redirect. Whenever motion drives that travel, the row must be
inert to touch (or the two fight); so under `prefers-reduced-motion`, where nothing
drives it, hand scrolling back to the reader and make the row a focusable, labelled
scroll region. Content off the edge must never become unreachable.

**Exception 2 — the hero grid.** The cells in the dark band pulse a
couple at a time, at random. This exists because touch devices get no hover, which
left the signature element of the opening scene completely inert on a phone. It must
stay subordinate to the interaction — ambient uses `--color-accent-dim` at half
strength, hover uses full accent — must never drop overlapping text below its
contrast floor while lit, and is switched off entirely under
`prefers-reduced-motion` (see `useGridBlips`). It is not licence for ambient motion
anywhere else.

**Exception 3 — the client strip.** The `[PLACEHOLDER]` client row in the opening
scene scrolls continuously, because a strip of logos that never moves reads as a dead
image and the row is wider than a phone anyway. It must pause on hover and focus, and
under `prefers-reduced-motion` it stops and becomes a normal swipeable scroll region
so no logo is stranded off the edge (see `.marquee` in `styles/index.css`). The
duplicate copy that makes the loop seamless is `aria-hidden`.

**Exception 4 — the Thesis emphasis transfer.** The heading's two lines trade
weight — black to grey, grey to black — when the reader reaches them, so the
typography performs the pivot the sentence describes. It is a **threshold**, not a
scroll-linked value: one crossfade, nothing per frame, no intermediate state ever
held. It reverses on the way back up, and under `prefers-reduced-motion` the resting
state renders outright (see `useInView`).

**Exception 5 — the hero wordmark cycle.** The mark in the dark band cycles
`<PLACEHOLDERWORKS> → <DESIGN> → <ARCHITECT> → <BUILD> → <DEPLOY>`, each word
dissolving into ASCII fragments and reconstructing a character at a time (see
`useWordCycle`). It exists because the identity was the one inert thing in a band
whose entire character is motion — and because the verbs state the §2 positioning,
that we build and deploy, in the first seconds of the page. It is the most ambient
of these exceptions and so the most tightly budgeted: the cell row is fixed at the
width of the longest word and the closing bracket moves on a **transform**, so no
layout property is ever animated and the page can never shift; it holds far longer
than it moves (at rest ~71% of the time, on a period deliberately co-prime with the
grid blips so the two never beat against each other); it pauses under the pointer,
stops entirely when the band leaves the viewport, and never starts at all under
`prefers-reduced-motion`, where the mark simply renders `<PLACEHOLDERWORKS>`. The cycling
letters are `aria-hidden` with the name exposed once beside them — never a live
region.

Five exceptions is the ceiling now, and the line in this paragraph has already been
redrawn once. A sixth is not a budget to spend; re-read this whole section, and
expect the answer to be no.

Interaction feedback runs **150–350ms**; easing `cubic-bezier(0.22, 1, 0.36, 1)`.
The exceptions above run longer by design — an editorial crossfade at 700ms, a grid
cell releasing over 1.5s — because they are atmosphere and rhetoric, not a response
to a click. Outside those, animate `transform` and `opacity` only, reuse the shared
variants in `lib/motion.ts`, and if motion is not telling the user something changed,
it does not ship.

Each exception earns its place against a specific failure (a sequence that cannot be
read, a band inert to touch, a dead logo strip, an argument the type does not carry,
an identity that sat still in a band made of motion). None of them is licence for
ambient motion anywhere else.

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
- **Glass/transparency:** not used. Blur and translucency belonged to the dark theme;
  on white they muddy the grid. Surfaces are opaque, separated by hairlines.
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