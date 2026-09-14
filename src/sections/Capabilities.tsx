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
    outcome: "Trusted answers in seconds, with citations back to the source.",
  },
  {
    problem: "A core workflow eats hours of repetitive, manual judgment.",
    build:
      "Agentic automation that runs the process end to end, keeping humans on the decisions that actually matter.",
    outcome: "Cycle times drop and the team moves to higher-value work.",
  },
  {
    problem: "You have models in notebooks and nothing in production.",
    build:
      "Evaluation, monitoring, and deployment infrastructure so AI ships safely and stays reliable under load.",
    outcome: "A repeatable path from prototype to production you can trust.",
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
    <Section id="capabilities" index="03" eyebrow="Capabilities">
      <h2 className="max-w-[20ch] text-title text-fg">
        We match the technology to the problem — not the other way around.
      </h2>

      <div className="mt-16 border-t border-line">
        {CAPABILITIES.map((cap, i) => (
          <article key={i} className="border-b border-line py-12">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
              <h3 className="text-subtitle text-fg">{cap.problem}</h3>
              <div className="grid gap-8 sm:grid-cols-2 lg:gap-12">
                <div>
                  <p className="eyebrow mb-3">What we build</p>
                  <p className="text-body text-fg-2">{cap.build}</p>
                </div>
                <div>
                  <p className="eyebrow mb-3 text-accent">Outcome</p>
                  <p className="text-body text-fg-2">{cap.outcome}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16">
        <p className="eyebrow mb-6">Also across</p>
        <div className="grid grid-cols-2 border-b border-r border-line sm:grid-cols-3 lg:grid-cols-4">
          {BREADTH.map((b) => (
            <p
              key={b}
              className="border-l border-t border-line px-5 py-5 font-mono text-xs text-fg-2"
            >
              {b}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
