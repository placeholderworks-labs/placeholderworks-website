import { useCallback, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/Button";
import { HeroLockup } from "@/components/HeroLockup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useGridBlips } from "@/hooks/useGridBlips";
import { scrollToId } from "@/lib/utils";
import { WHATSAPP_URL } from "@/lib/contact";

/** The dark band is exactly this many grid rows tall. */
const ROWS = 7;

/**
 * Cell size in px, identical on every breakpoint. Small enough that seven rows
 * only occupy 245px, which keeps the headline high on the page on phones as
 * well as desktops — the band must never push the opening statement down.
 */
const CELL = 35;

/**
 * Enough columns to cover a 2560px screen, plus one. The page is prerendered,
 * so the grid cannot wait for a measurement: a count that changed after load
 * would re-flow every cell and shift the band. Instead it fills column by
 * column into its fixed rows, and whatever runs past the band's right edge is
 * simply clipped.
 */
const COLS = Math.ceil(2560 / CELL) + 1;

/**
 * Where our clients have come from. Only four marks, so each pass of the
 * strip sets them twice, otherwise one pass is narrower than a desktop row and
 * the loop shows a gap.
 */
const PROOF = [
  // w/h are each file's intrinsic size, so the browser reserves the right box
  // before the image arrives. CSS still sets the displayed height.
  { name: "RentaLease", src: "/images/logos/rentalease.svg", w: 100, h: 100, cls: "h-10", label: true },
  { name: "Google", src: "/images/logos/google.svg", w: 272, h: 92, cls: "h-7" },
  { name: "Adam Vacations", src: "/images/logos/adam-vacations.png", w: 480, h: 148, cls: "h-10" },
  { name: "Chitkara University", src: "/images/logos/chitkara-university.svg", w: 180, h: 61, cls: "h-10" },
];
const PASS = [...PROOF, ...PROOF];

/** Client strip is hidden for now. Flip to true to bring it back. */
const SHOW_PROOF = false;

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

  // Column-major fill, so the cells on screen are always the first
  // (visible columns × ROWS). Blips draw only from those, or most of them
  // would light up off the edge on a phone. Read per tick, so a resize needs
  // no listener.
  const visibleCells = useCallback(() => {
    const width = bandRef.current?.clientWidth ?? 0;
    return Math.min(COLS, Math.ceil(width / CELL)) * ROWS;
  }, []);

  useGridBlips(gridRef, !reduced, visibleCells);

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
            gridAutoFlow: "column",
            gridAutoColumns: `${CELL}px`,
            gridTemplateRows: `repeat(${ROWS}, ${CELL}px)`,
          }}
        >
          {Array.from({ length: ROWS * COLS }, (_, i) => (
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
          <HeroLockup />

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
          <h1 className="max-w-[12ch] text-hero text-fg">
            We build AI that makes it{" "}
            <span className="text-accent">to production.</span>
          </h1>

          <div className="lg:pt-3">
            <p className="measure text-subtitle text-fg-2">
              Strategy, engineering, and deployment under one roof. We design,
              build, integrate, and ship AI systems that do real work.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Button
                variant="primary"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
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
      {SHOW_PROOF && (
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10 lg:px-16">
          <p className="eyebrow mb-6">Our clients come from</p>
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
                  {PASS.map((logo, i) => (
                    <li
                      key={i}
                      // Within a pass the second set is a repeat as well.
                      aria-hidden={i >= PROOF.length || undefined}
                      className="flex min-h-24 w-56 shrink-0 items-center justify-center gap-3 border-l border-line px-6"
                    >
                      <img
                        src={logo.src}
                        alt={logo.label ? "" : logo.name}
                        width={logo.w}
                        height={logo.h}
                        loading="lazy"
                        decoding="async"
                        className={`${logo.cls} w-auto max-w-full object-contain`}
                      />
                      {logo.label && (
                        <span className="text-lg font-semibold tracking-tight text-fg">
                          {logo.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
