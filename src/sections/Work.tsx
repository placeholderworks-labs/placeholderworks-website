import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

interface Deployment {
  n: string;
  sector: string;
  title: string;
  challenge: string;
  built: string;
  metrics: { value: string; label: string }[];
}

/**
 * Work / case studies (CLAUDE.md §6, §9): evidence, not marketing cards.
 * All specifics are clearly-marked [PLACEHOLDER] — never invent clients,
 * outcomes, or metrics. Real projects drop straight into this structure.
 */
const DEPLOYMENTS: Deployment[] = [
  {
    n: "01",
    sector: "[PLACEHOLDER — Sector]",
    title: "[PLACEHOLDER — Project name]",
    challenge:
      "[PLACEHOLDER — The problem the client faced, in one or two plain sentences.]",
    built:
      "[PLACEHOLDER — What we designed, built, integrated, and deployed to solve it.]",
    metrics: [
      { value: "[PLACEHOLDER]", label: "Primary result" },
      { value: "[PLACEHOLDER]", label: "Efficiency" },
      { value: "[PLACEHOLDER]", label: "Time to production" },
    ],
  },
  {
    n: "02",
    sector: "[PLACEHOLDER — Sector]",
    title: "[PLACEHOLDER — Project name]",
    challenge:
      "[PLACEHOLDER — The problem the client faced, in one or two plain sentences.]",
    built:
      "[PLACEHOLDER — What we designed, built, integrated, and deployed to solve it.]",
    metrics: [
      { value: "[PLACEHOLDER]", label: "Primary result" },
      { value: "[PLACEHOLDER]", label: "Adoption" },
      { value: "[PLACEHOLDER]", label: "Cost impact" },
    ],
  },
  {
    n: "03",
    sector: "[PLACEHOLDER — Sector]",
    title: "[PLACEHOLDER — Project name]",
    challenge:
      "[PLACEHOLDER — The problem the client faced, in one or two plain sentences.]",
    built:
      "[PLACEHOLDER — What we designed, built, integrated, and deployed to solve it.]",
    metrics: [
      { value: "[PLACEHOLDER]", label: "Primary result" },
      { value: "[PLACEHOLDER]", label: "Reliability" },
      { value: "[PLACEHOLDER]", label: "Scale" },
    ],
  },
];

export function Work() {
  return (
    <Section id="work" eyebrow="Evidence">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="max-w-[16ch] text-title text-fg">
          Selected deployments.
        </h2>
        <p className="measure text-body text-fg-2">
          The work speaks plainly: real systems, in production, doing real work.
          Numbers here are placeholders until each project's results are
          confirmed — we don't publish figures we can't stand behind.
        </p>
      </div>

      <div className="mt-16 border-t border-line">
        {DEPLOYMENTS.map((d) => (
          <Reveal key={d.n}>
            <article className="group border-b border-line py-12">
              <div className="grid gap-8 lg:grid-cols-[8rem_1fr] lg:gap-12">
                <div className="font-mono text-5xl font-medium leading-none text-fg-3 transition-colors duration-500 group-hover:text-accent md:text-6xl">
                  {d.n}
                </div>

                <div>
                  <p className="eyebrow text-fg-3">{d.sector}</p>
                  <h3 className="mt-3 text-display text-fg">{d.title}</h3>

                  <div className="mt-8 grid gap-8 md:grid-cols-2">
                    <div>
                      <p className="eyebrow mb-2 text-fg-3">Challenge</p>
                      <p className="text-body text-fg-2">{d.challenge}</p>
                    </div>
                    <div>
                      <p className="eyebrow mb-2 text-fg-3">What we built</p>
                      <p className="text-body text-fg-2">{d.built}</p>
                    </div>
                  </div>

                  <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-md bg-line sm:grid-cols-3">
                    {d.metrics.map((m, i) => (
                      <div key={i} className="bg-bg-1 p-6">
                        <dt className="eyebrow mb-2 text-fg-3">{m.label}</dt>
                        <dd className="font-mono text-lg text-fg">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
