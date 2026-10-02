import { Section } from "@/components/Section";
import { PageLayout } from "@/components/PageLayout";
import { ROUTE_BY_PATH } from "@/lib/routes";

/**
 * Dummy content. Every string below is a [PLACEHOLDER] — replace the copy,
 * keep the problem → build → outcome framing (CLAUDE.md §6: capabilities are
 * never a grid of buzzword cards).
 */
const SERVICES = [
  {
    n: "01",
    problem: "[PLACEHOLDER] The problem this service solves, stated as the client would state it.",
    build: "[PLACEHOLDER] What we actually build — the system, not the category.",
    outcome: "[PLACEHOLDER] What changes once it is running, in the client's terms.",
  },
  {
    n: "02",
    problem: "[PLACEHOLDER] The problem this service solves, stated as the client would state it.",
    build: "[PLACEHOLDER] What we actually build — the system, not the category.",
    outcome: "[PLACEHOLDER] What changes once it is running, in the client's terms.",
  },
  {
    n: "03",
    problem: "[PLACEHOLDER] The problem this service solves, stated as the client would state it.",
    build: "[PLACEHOLDER] What we actually build — the system, not the category.",
    outcome: "[PLACEHOLDER] What changes once it is running, in the client's terms.",
  },
  {
    n: "04",
    problem: "[PLACEHOLDER] The problem this service solves, stated as the client would state it.",
    build: "[PLACEHOLDER] What we actually build — the system, not the category.",
    outcome: "[PLACEHOLDER] What changes once it is running, in the client's terms.",
  },
];

export function Services() {
  return (
    <PageLayout route={ROUTE_BY_PATH.get("/services")!}>
      <Section id="services" eyebrow="Engagements" index="01" rule={false}>
        <div className="border-t border-line">
          {SERVICES.map((s) => (
            <article key={s.n} className="border-b border-line py-12">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
                <div className="flex gap-6">
                  <span className="font-mono text-sm text-fg-3">{s.n}</span>
                  <h2 className="text-subtitle text-fg">{s.problem}</h2>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:gap-12">
                  <div>
                    <p className="eyebrow mb-3">What we build</p>
                    <p className="text-body text-fg-2">{s.build}</p>
                  </div>
                  <div>
                    <p className="eyebrow mb-3 text-accent">Outcome</p>
                    <p className="text-body text-fg-2">{s.outcome}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
