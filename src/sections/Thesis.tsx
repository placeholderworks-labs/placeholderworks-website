import { Section } from "@/components/Section";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * The big idea (CLAUDE.md §6): we build and deploy — we don't just advise.
 * One confident editorial statement, generous whitespace, quiet supporting line.
 *
 * The heading enacts its own argument. It opens with the industry's line in
 * black and ours greyed behind it; as the reader arrives, the weight transfers
 * across — theirs recedes, ours takes the page. One crossfade, no in-between
 * state, and it resets on the way back up so it can be read twice.
 */
export function Thesis() {
  const { ref, inView } = useInView<HTMLHeadingElement>();
  const reduced = useReducedMotion();

  // Reduced motion gets the resting state outright — the end of the argument,
  // not the setup, which is the version that has to stand on its own.
  const shifted = reduced || inView;

  return (
    <Section id="thesis" index="01" eyebrow="The difference" rule={false}>
      <h2 ref={ref} className="text-display">
        <span
          className={cn(
            "transition-colors duration-700 ease-out",
            shifted ? "text-fg-3" : "text-fg"
          )}
        >
          Plenty of firms will advise you on AI.
        </span>
        <br />
        <span
          className={cn(
            "transition-colors duration-700 ease-out",
            shifted ? "text-fg" : "text-fg-3"
          )}
        >
          We're the ones who build it, ship it, and keep it running.
        </span>
      </h2>

      <p className="measure mt-12 text-body text-fg-2">
        Advice is cheap and demos are easy. The hard part is everything after:
        integrating with real systems, handling edge cases, controlling cost and
        latency, and standing behind it in production. That's the part we own.
      </p>

      <div className="mt-16 grid border-b border-r border-line sm:grid-cols-3">
        {[
          ["idea", "system"],
          ["prototype", "production"],
          ["pilot", "scale"],
        ].map(([from, to]) => (
          <p
            key={from}
            className="flex items-baseline gap-3 border-l border-t border-line px-5 py-6 font-mono text-sm"
          >
            <span className="text-fg-3">{from}</span>
            <span aria-hidden className="text-accent">
              &rarr;
            </span>
            <span className="text-fg">{to}</span>
          </p>
        ))}
      </div>
    </Section>
  );
}
