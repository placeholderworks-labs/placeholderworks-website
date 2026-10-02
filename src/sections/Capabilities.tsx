import { ArrowRight } from "lucide-react";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { ServiceVideo } from "@/components/ServiceVideo";
import { FEATURED } from "@/lib/services";

/** Breadth, deeper in. Each of these has its own entry on /services. */
const BREADTH = [
  "Calling agents",
  "Live call transfer",
  "Voice bots that act",
  "Website bots & agents",
  "CRM & ERP via WhatsApp",
  "Email classifiers",
  "Workforce automation",
  "AI native apps",
  "Shorts automation",
  "Eval engines",
  "QA automation",
  "Voice analytics",
];

/**
 * The home page's services: a few shown working, each with its demo at full
 * width, and the rest a click away on /services.
 */
export function Capabilities() {
  return (
    <Section id="services" index="03" eyebrow="What we build">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <h2 className="max-w-[20ch] text-title text-fg">
          If it can be automated, we build it.
        </h2>
        <p className="measure text-body text-fg-2">
          We match the technology to the problem, not the other way around, and
          we stay until it runs in production.
        </p>
      </div>

      <p className="eyebrow mt-16 mb-6">Featured</p>
      <div className="border-t border-line">
        {FEATURED.map((s, i) => (
          <article key={s.name} className="border-b border-line py-14">
            {/* Stacked, not side by side: beside the copy the title only had
                half the row and a name like "Real-time WhatsApp chatbots"
                broke over three lines. */}
            <p className="eyebrow mb-4 flex gap-4">
              <span className="text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-fg-3">{s.modality}</span>
            </p>
            <h3 className="text-display text-fg max-sm:text-[clamp(1.75rem,8.5vw,2.25rem)]">{s.name}</h3>
            <p className="measure mt-6 text-body text-fg-2">{s.body}</p>

            <div className="mt-10">
              <ServiceVideo video={s.video} />
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

        <div className="mt-10">
          <Button variant="secondary" href="/services">
            Every service, by modality and domain
            <ArrowRight size={16} aria-hidden />
          </Button>
        </div>
      </div>
    </Section>
  );
}
