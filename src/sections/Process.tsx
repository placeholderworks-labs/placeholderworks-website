import type { CSSProperties } from "react";
import {
  Blocks,
  DraftingCompass,
  Repeat,
  Search,
  ServerCog,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/Section";
import { useSequenceProgress } from "@/hooks/useSequenceProgress";
import { cn } from "@/lib/utils";

interface Step {
  n: string;
  title: string;
  body: string;
  /**
   * Lights with the rail. Decorative only — the title says what the step is,
   * so the mark is hidden from assistive tech rather than labelled.
   */
  icon: LucideIcon;
}

/** Numbering is earned here — this is a real, ordered sequence. */
const STEPS: Step[] = [
  {
    n: "001",
    title: "Discovery",
    body: "We start with the problem and the constraints, not the model.",
    icon: Search,
  },
  {
    n: "002",
    title: "Design",
    body: "Architecture, data flow, evals — and the smallest thing that proves value.",
    icon: DraftingCompass,
  },
  {
    n: "003",
    title: "Build",
    body: "Applications, agents and LLM integrations, engineered like software that has to last.",
    icon: Blocks,
  },
  {
    n: "004",
    title: "Integration",
    body: "Wired into your stack, your data, and the people already doing the work.",
    icon: Waypoints,
  },
  {
    n: "005",
    title: "Production",
    body: "Deployed and hardened. Latency, cost and failure modes handled before launch.",
    icon: ServerCog,
  },
  {
    n: "006",
    title: "Iteration",
    body: "Measured against the evals, improved from real usage. Shipping is the start.",
    icon: Repeat,
  },
];

/** Each card's rail fills only once the ones before it are full. */
const FILL = "scaleX(clamp(0, calc(var(--p) * var(--n) - var(--i)), 1))";

/**
 * How we work (CLAUDE.md §6) — ownership of implementation, end to end.
 *
 * The sequence is the point, so it runs left to right rather than stacking.
 * The section holds briefly and page scroll walks it: each card's rail fills
 * in turn, and on a phone — where six cards cannot fit — the row travels
 * sideways by the same progress, so the reader only ever scrolls down.
 *
 * Cards are separated rather than sharing collapsed borders, and stay aligned
 * across the row because each is a subgrid of the same three tracks.
 */
export function Process() {
  const { trackRef, contentRef, listRef, filled, reduced } =
    useSequenceProgress(STEPS.length);

  return (
    <Section id="process" index="02" eyebrow="How we work">
      <div ref={trackRef}>
        <div
          ref={contentRef}
          className="sticky top-24 flex min-h-[calc(100svh-6rem)] flex-col justify-center"
        >
          <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
            <h2 className="max-w-[18ch] text-title text-fg">
              From the problem to something running in production.
            </h2>
            <p className="max-w-sm text-body text-fg-2">
              One team owns the whole path. No handoff between the people who
              advise and the people who build.
            </p>
          </div>

          <ol
            ref={listRef}
            tabIndex={reduced ? 0 : undefined}
            aria-label={reduced ? "Our process, step by step" : undefined}
            style={{ "--p": 1, "--n": STEPS.length } as CSSProperties}
            className={cn(
              // Column gap only: a row gap would also open up the three bands
              // inside each card and break it into floating pieces.
              "mt-16 grid auto-cols-[76%] grid-flow-col grid-rows-[auto_auto_auto] gap-x-4 overflow-x-hidden",
              "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              // Wide enough to fit: a static grid, nothing travels.
              "md:auto-cols-auto md:grid-flow-row md:grid-cols-3 md:grid-rows-none md:gap-x-3 md:overflow-visible",
              "lg:grid-cols-6"
            )}
          >
            {STEPS.map((step, i) => {
              const active = i < filled;
              const Icon = step.icon;

              return (
                <li
                  key={step.n}
                  className="row-span-3 grid grid-rows-subgrid border border-line md:mb-3 lg:mb-0"
                >
                  <div className="px-4 pb-8 pt-5 lg:pb-10">
                    <span
                      className={cn(
                        "font-mono text-xs transition-colors duration-150",
                        active ? "text-accent" : "text-fg-3"
                      )}
                    >
                      <span aria-hidden>// </span>
                      {step.n}
                    </span>
                    <p
                      className={cn(
                        "mt-6 text-caption transition-colors duration-150 lg:mt-8",
                        active ? "text-fg-2" : "text-fg-3"
                      )}
                    >
                      {step.body}
                    </p>
                  </div>

                  <div
                    aria-hidden
                    className="h-[5px] bg-line"
                    style={{ "--i": i } as CSSProperties}
                  >
                    <div
                      className="h-full w-full origin-left bg-accent"
                      style={{ transform: FILL }}
                    />
                  </div>

                  {/* Mark, then name — both light with the rail below them, on
                      the same beat, so the step reads as one thing arriving. */}
                  <div className="px-4 pb-8 pt-5">
                    <Icon
                      aria-hidden
                      strokeWidth={1.5}
                      className={cn(
                        "size-5 transition-colors duration-150",
                        active ? "text-accent" : "text-fg-3"
                      )}
                    />
                    <h3
                      className={cn(
                        "mt-4 text-lg font-semibold tracking-tight transition-colors duration-150",
                        active ? "text-accent" : "text-fg-3"
                      )}
                    >
                      {step.title}
                    </h3>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Position in the row. Only needed while the row is travelling —
              once all six are visible at once, where you are is self-evident. */}
          <p className="mt-5 font-mono text-xs text-fg-3 md:hidden">
            <span className="text-accent">
              {String(Math.max(1, filled)).padStart(3, "0")}
            </span>
            <span aria-hidden> / </span>
            <span className="sr-only"> of </span>
            {String(STEPS.length).padStart(3, "0")}
          </p>
        </div>
      </div>
    </Section>
  );
}
