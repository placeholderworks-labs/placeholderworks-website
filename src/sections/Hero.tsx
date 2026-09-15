import { useLayoutEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useGridBlips } from "@/hooks/useGridBlips";
import { scrollToId } from "@/lib/utils";

/** The dark band is exactly this many grid rows tall. */
const ROWS = 7;

/**
 * Cell size in px, identical on every breakpoint. Small enough that seven rows
 * only occupy 245px, which keeps the headline high on the page on phones as
 * well as desktops — the band must never push the opening statement down.
 */
const CELL = 35;

/** Columns before the band has been measured — a typical laptop width. */
const INITIAL_COLS = 40;

/**
 * Columns needed to span `width`, plus one so a resize never leaves a bare
 * strip at the right edge.
 */
function columnsFor(width: number): number {
  return Math.ceil(width / CELL) + 1;
}

/** Structural proof band. Real logos drop straight into these cells (§9). */
const PROOF = [
  "[CLIENT LOGO]",
  "[CLIENT LOGO]",
  "[CLIENT LOGO]",
  "[CLIENT LOGO]",
  "[CLIENT LOGO]",
  "[CLIENT LOGO]",
];

/**
 * Opening scene (CLAUDE.md §6). A ruled dark band carrying the identity, a
 * hard cut to white, then the statement. Composition and type carry it; the
 * only motion is the grid, which responds to the pointer and pulses quietly
 * on its own where there is no pointer to respond to.
 */
export function Hero() {
  const bandRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Only render the columns actually on screen. A fixed wide count would put
  // most cells — and so most blips — outside the viewport on a phone.
  const [cols, setCols] = useState(INITIAL_COLS);

  // Layout effect, not a plain effect: measuring after paint would show a bare
  // strip at the right edge for one frame on screens wider than INITIAL_COLS.
  useLayoutEffect(() => {
    const band = bandRef.current;
    if (!band) return;

    const measure = () => setCols(columnsFor(band.clientWidth));
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(band);
    return () => observer.disconnect();
  }, []);

  useGridBlips(gridRef, !reduced);

  return (
    <section id="opening" className="scroll-mt-0">
      {/* ---- Dark band ---------------------------------------------------- */}
      {/* Height is driven by the grid itself, so the band always ends on a
          whole row rather than clipping one in half. */}
      <div
        ref={bandRef}
        className="on-ink relative overflow-hidden"
        style={{ height: ROWS * CELL }}
      >
        {/* Live grid. Decorative, so it is aria-hidden and unreachable by
            keyboard — the lit cells are atmosphere, never information.

            Two behaviours share these cells. On a pointer device the
            asymmetric timing is the effect: a cell fills almost instantly
            under the cursor, then takes 1.5s to let go, so trailing
            cells fade out behind it instead of blinking off. Touch devices
            get no hover at all, so useGridBlips pulses a couple of random
            cells at half strength to keep the band alive there too. */}
        <div
          ref={gridRef}
          aria-hidden
          className="absolute left-0 top-0 grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, ${CELL}px)`,
            gridTemplateRows: `repeat(${ROWS}, ${CELL}px)`,
          }}
        >
          {Array.from({ length: ROWS * cols }, (_, i) => (
            <div
              key={i}
              className="border-b border-r border-ink-line transition-colors duration-1500 ease-out hover:bg-accent hover:duration-75"
            />
          ))}
        </div>

        {/* Content sits above the grid but lets the pointer through, so the
            cells behind the wordmark still light up. Interactive children
            opt back in. */}
        <div className="pointer-events-none relative mx-auto flex h-full w-full max-w-6xl items-end justify-between gap-6 px-6 pb-8 md:px-10 md:pb-10 lg:px-16">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-3 text-2xl font-semibold tracking-tight md:text-3xl">
              {/* The PNG carries the ink ground, so on the band it reads as the
                  crimson mark alone. alt is empty — the wordmark beside it
                  already names us, and a second label would read twice. */}
              <img
                src="/images/favicon.png"
                alt=""
                width={40}
                height={40}
                className="h-9 w-9 shrink-0 md:h-10 md:w-10"
              />
              <span>
                {/* Brackets sit back so the name carries the weight. Accent is
                    only ~3.6:1 on ink, so it is never used for type here. */}
                <span className="text-white/50">&lt;</span>Placeholder
                <span className="text-white/50">&gt;</span>
              </span>
            </span>
            <span className="mono-ui border border-white/25 px-2 py-1 text-white/60">
              AI Engineering
            </span>
          </div>

          <a
            href="#thesis"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("thesis");
            }}
            className="mono-ui pointer-events-auto hidden items-center gap-3 text-white/60 transition-colors hover:text-white md:inline-flex"
          >
            Scroll
            <ArrowDown size={14} aria-hidden />
          </a>
        </div>
      </div>

      {/* ---- Hard cut to white -------------------------------------------- */}
      <div className="mx-auto w-full max-w-6xl px-6 py-24 md:px-10 md:py-32 lg:px-16">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <h1 className="text-hero text-fg">
            We build AI that makes it
            <span className="mt-2 block font-mono text-accent [font-size:0.42em] [letter-spacing:-0.01em]">
              [ to production ]
            </span>
          </h1>

          <div className="lg:pt-4">
            <p className="measure text-subtitle text-fg-2">
              Strategy, engineering, and deployment under one roof — we design,
              build, integrate, and ship AI systems that do real work.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Button
                variant="primary"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("contact");
                }}
              >
                Start a conversation
              </Button>
              <Button
                variant="tertiary"
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("work");
                }}
              >
                See the work
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Proof band — structure only, no invented clients (§9) --------- */}
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10 lg:px-16">
        <p className="eyebrow mb-6">Trusted by [PLACEHOLDER]</p>
        <div className="marquee border-y border-line">
          <div className="marquee-track">
            {/* Two passes of the same row. The second is the one that makes the
                loop seamless, so it is presentational and hidden from assistive
                tech — otherwise every client is announced twice. */}
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="flex"
                aria-hidden={copy === 1 || undefined}
              >
                {PROOF.map((label, i) => (
                  <li
                    key={i}
                    className="flex min-h-24 w-56 shrink-0 items-center justify-center border-l border-line px-4"
                  >
                    <span className="font-mono text-xs text-fg-3">{label}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
