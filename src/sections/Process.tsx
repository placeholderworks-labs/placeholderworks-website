import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

interface Step {
  n: string;
  title: string;
  body: string;
}

/** Numbering is earned here — this is a real, ordered sequence. */
const STEPS: Step[] = [
  {
    n: "01",
    title: "Discovery",
    body: "We start with the problem and the constraints, not the model. What breaks today, what 'better' is worth, and where the data actually lives.",
  },
  {
    n: "02",
    title: "Design",
    body: "We shape the system — architecture, data flow, evaluations, and the smallest thing that proves real value before we scale it.",
  },
  {
    n: "03",
    title: "Build",
    body: "Custom applications, agents, and LLM integrations, engineered and reviewed like software that has to last — because it does.",
  },
  {
    n: "04",
    title: "Integration",
    body: "We wire it into your stack, your data, and your workflows, so the AI meets the systems and the people who already do the work.",
  },
  {
    n: "05",
    title: "Production",
    body: "We deploy, monitor, and harden. Latency, cost, safety, and failure modes are handled before launch — not discovered after it.",
  },
  {
    n: "06",
    title: "Iteration",
    body: "We measure against the evals, learn from real usage, and keep improving what's live. Shipping is the start, not the finish.",
  },
];

/**
 * How we work (CLAUDE.md §6) — ownership of implementation, end to end.
 * Editorial numbered list with hairline separators, not a card grid.
 */
export function Process() {
  return (
    <Section id="process" eyebrow="How we work">
      <div className="grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,20rem)_1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="text-title text-fg">
            From the problem to something running in production.
          </h2>
          <p className="measure mt-6 text-body text-fg-2">
            One team owns the whole path. No handoff between the people who
            advise and the people who build.
          </p>
        </div>

        <ol className="border-t border-line">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.04}>
              <li className="group grid grid-cols-[3rem_1fr] items-start gap-5 border-b border-line py-8 transition-colors duration-300 md:gap-8">
                <span className="font-mono text-sm text-fg-3 transition-colors duration-300 group-hover:text-accent">
                  {step.n}
                </span>
                <div>
                  <h3 className="text-subtitle text-fg">{step.title}</h3>
                  <p className="measure mt-3 text-body text-fg-2">{step.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
