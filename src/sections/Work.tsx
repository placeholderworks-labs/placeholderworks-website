import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/Section";
import { ServiceVideo } from "@/components/ServiceVideo";
import { DEPLOYMENTS } from "@/lib/work";

interface WorkProps {
  /** On the Portfolio page the section is the page, so it drops the step. */
  index?: string;
  rule?: boolean;
}

export function Work({ index = "04", rule = true }: WorkProps) {
  return (
    <Section id="work" index={index} eyebrow="Evidence" rule={rule}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="max-w-[16ch] text-title text-fg">
          Shipped for clients.
        </h2>
        <p className="measure text-body text-fg-2">
          Real systems, live today. We list what is running and leave out any
          figure we can't stand behind.
        </p>
      </div>

      <div className="mt-16 border-t border-line">
        {DEPLOYMENTS.map((d) => (
          <article key={d.client} className="border-b border-line py-14">
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
              <div>
                <p className="eyebrow text-fg-3">{d.sector}</p>
                <h3 className="mt-3 text-display text-fg">{d.client}</h3>
              </div>
              <a
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-ui inline-flex items-center gap-2 border-b border-line pb-1 text-fg-2 transition-colors hover:border-fg hover:text-fg"
              >
                {d.site}
                <ArrowUpRight size={14} aria-hidden />
              </a>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-16">
              <div>
                <p className="eyebrow mb-3 text-fg-3">Challenge</p>
                <p className="text-body text-fg-2">{d.challenge}</p>
              </div>
              <div>
                <p className="eyebrow mb-3 text-accent">What we built</p>
                <p className="text-body text-fg-2">{d.built}</p>
              </div>
            </div>

            <div className="mt-12">
              <ServiceVideo video={d.video} />
            </div>

            {/* Three cells side by side need ~640px before a mono label like
                BROKERAGE stops clipping; below that each fact is one short row,
                label left and value right, so the block stays compact. */}
            <dl className="mt-px grid grid-cols-1 gap-px bg-line sm:grid-cols-3">
              {d.facts.map((f) => (
                <div
                  key={f.label}
                  className="flex items-baseline justify-between gap-6 bg-bg-1 px-5 py-4 sm:block sm:p-6"
                >
                  <dt className="eyebrow text-fg-3 sm:mb-2">{f.label}</dt>
                  <dd className="text-right font-mono text-sm text-fg sm:text-left sm:text-lg">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </Section>
  );
}
