import { AnimatedText } from "@/components/AnimatedText";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

/**
 * The big idea (CLAUDE.md §6): we build and deploy — we don't just advise.
 * One confident editorial statement, generous whitespace, quiet supporting line.
 */
export function Thesis() {
  return (
    <Section id="thesis" eyebrow="The difference">
      <h2 className="text-display text-fg-2">
        Plenty of firms will advise you on AI.
        <br />
        <span className="text-fg">
          <AnimatedText text="We're the ones who build it, ship it, and keep it running." />
        </span>
      </h2>

      <Reveal delay={0.1}>
        <p className="measure mt-10 text-body text-fg-2">
          Advice is cheap and demos are easy. The hard part is everything after:
          integrating with real systems, handling edge cases, controlling cost
          and latency, and standing behind it in production. That's the part we
          own.
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="mt-12 font-mono text-sm tracking-tight text-fg-3">
          <span className="text-fg-2">idea</span> → system
          <span className="mx-3 text-line">·</span>
          <span className="text-fg-2">prototype</span> → production
          <span className="mx-3 text-line">·</span>
          <span className="text-fg-2">pilot</span> → scale
        </p>
      </Reveal>
    </Section>
  );
}
