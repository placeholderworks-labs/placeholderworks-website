import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

interface Capability {
  problem: string;
  build: string;
  outcome: string;
}

/** Framed as problem → solution → outcome, never a buzzword grid (§6). */
const CAPABILITIES: Capability[] = [
  {
    problem:
      "Your team answers the same questions from scattered documents all day.",
    build:
      "A retrieval system (RAG) grounded in your own knowledge, wired into the tools where people already ask.",
    outcome:
      "Trusted answers in seconds, with citations back to the source.",
  },
  {
    problem: "A core workflow eats hours of repetitive, manual judgment.",
    build:
      "Agentic automation that runs the process end to end, keeping humans on the decisions that actually matter.",
    outcome:
      "Cycle times drop and the team moves to higher-value work.",
  },
  {
    problem: "You have models in notebooks and nothing in production.",
    build:
      "Evaluation, monitoring, and deployment infrastructure so AI ships safely and stays reliable under load.",
    outcome:
      "A repeatable path from prototype to production you can trust.",
  },
  {
    problem: "Customers wait on hold for answers a system could give instantly.",
    build:
      "Voice and conversational AI integrated with your operational systems, not bolted on beside them.",
    outcome: "Faster resolutions, available around the clock.",
  },
];

const BREADTH = [
  "AI strategy",
  "Generative AI",
  "Custom applications",
  "Agents",
  "LLM integration",
  "Enterprise integration",
  "Evals & monitoring",
  "AI infrastructure",
];

export function Capabilities() {
  return (
    <Section id="capabilities" eyebrow="Capabilities">
      <h2 className="max-w-[20ch] text-title text-fg">
        We match the technology to the problem — not the other way around.
      </h2>

      <div className="mt-16 flex flex-col gap-px bg-line">
        {CAPABILITIES.map((cap, i) => (
          <Reveal key={i}>
            <article className="bg-bg-0 py-10">
              <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
                <h3 className="text-subtitle text-fg">{cap.problem}</h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:gap-10">
                  <div>
                    <p className="eyebrow mb-2 text-fg-3">What we build</p>
                    <p className="text-body text-fg-2">{cap.build}</p>
                  </div>
                  <div>
                    <p className="eyebrow mb-2 text-accent">Outcome</p>
                    <p className="text-body text-fg-2">{cap.outcome}</p>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-12 flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs text-fg-3">
          <span className="text-fg-2">Also across:</span>
          {BREADTH.map((b, i) => (
            <span key={b}>
              {b}
              {i < BREADTH.length - 1 && (
                <span className="ml-3 text-line">·</span>
              )}
            </span>
          ))}
        </p>
      </Reveal>
    </Section>
  );
}
