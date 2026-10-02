import { Section } from "@/components/Section";
import { PageLayout } from "@/components/PageLayout";
import { ROUTE_BY_PATH } from "@/lib/routes";

/**
 * Dummy content. CLAUDE.md §9 is absolute here: never invent a client, a logo
 * or a number. Metrics stay `[PLACEHOLDER]` until a real, cleared figure
 * replaces them.
 */
const WORK = [
  {
    n: "01",
    sector: "[PLACEHOLDER SECTOR]",
    title: "[PLACEHOLDER] One line on what was built and for whom.",
    challenge: "[PLACEHOLDER] What was breaking, and why the obvious fix did not work.",
    built: "[PLACEHOLDER] The system we designed, integrated and deployed.",
    metrics: [
      { label: "[METRIC]", value: "[PLACEHOLDER]" },
      { label: "[METRIC]", value: "[PLACEHOLDER]" },
      { label: "[METRIC]", value: "[PLACEHOLDER]" },
    ],
  },
  {
    n: "02",
    sector: "[PLACEHOLDER SECTOR]",
    title: "[PLACEHOLDER] One line on what was built and for whom.",
    challenge: "[PLACEHOLDER] What was breaking, and why the obvious fix did not work.",
    built: "[PLACEHOLDER] The system we designed, integrated and deployed.",
    metrics: [
      { label: "[METRIC]", value: "[PLACEHOLDER]" },
      { label: "[METRIC]", value: "[PLACEHOLDER]" },
      { label: "[METRIC]", value: "[PLACEHOLDER]" },
    ],
  },
  {
    n: "03",
    sector: "[PLACEHOLDER SECTOR]",
    title: "[PLACEHOLDER] One line on what was built and for whom.",
    challenge: "[PLACEHOLDER] What was breaking, and why the obvious fix did not work.",
    built: "[PLACEHOLDER] The system we designed, integrated and deployed.",
    metrics: [
      { label: "[METRIC]", value: "[PLACEHOLDER]" },
      { label: "[METRIC]", value: "[PLACEHOLDER]" },
      { label: "[METRIC]", value: "[PLACEHOLDER]" },
    ],
  },
];

export function Portfolio() {
  return (
    <PageLayout route={ROUTE_BY_PATH.get("/portfolio")!}>
      <Section id="portfolio" eyebrow="Selected work" index="01" rule={false}>
        <div className="border-t border-line">
          {WORK.map((d) => (
            <article key={d.n} className="border-b border-line py-12">
              <div className="grid gap-8 lg:grid-cols-[8rem_1fr] lg:gap-12">
                <div className="font-mono text-5xl font-medium leading-none text-fg-3 md:text-6xl">
                  {d.n}
                </div>
                <div>
                  <p className="eyebrow mb-4">{d.sector}</p>
                  <h2 className="measure text-subtitle text-fg">{d.title}</h2>

                  <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:gap-12">
                    <div>
                      <p className="eyebrow mb-3">Challenge</p>
                      <p className="text-body text-fg-2">{d.challenge}</p>
                    </div>
                    <div>
                      <p className="eyebrow mb-3 text-accent">What we built</p>
                      <p className="text-body text-fg-2">{d.built}</p>
                    </div>
                  </div>

                  <dl className="mt-10 grid grid-cols-1 gap-px bg-line sm:grid-cols-3">
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
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
