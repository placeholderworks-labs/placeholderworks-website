import { ArrowRight } from "lucide-react";
import { Section } from "@/components/Section";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/Button";
import { Products } from "@/sections/Products";
import { ROUTE_BY_PATH } from "@/lib/routes";
import { WHATSAPP_URL } from "@/lib/contact";
import { DOMAINS, MODALITIES } from "@/lib/services";

/**
 * Everything we build: by modality, then by domain, then the products. The home page shows a few of these; the depth lives here.
 */

export function Services() {
  return (
    <PageLayout route={ROUTE_BY_PATH.get("/services")!}>
      <Section id="modalities" eyebrow="By modality" index="01" rule={false}>
        <div className="border-t border-line">
          {MODALITIES.map((m) => (
            <article key={m.n} className="group border-b border-line py-12">
              <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
                <div className="flex gap-6">
                  <span className="font-mono text-sm text-fg-3 transition-colors duration-150 group-hover:text-accent">
                    {m.n}
                  </span>
                  <div>
                    <h2 className="text-display text-fg">{m.name}</h2>
                    <p className="mt-4 text-body text-fg-2">{m.line}</p>
                  </div>
                </div>

                <dl className="border-t border-line">
                  {m.services.map((s) => (
                    <div
                      key={s.name}
                      className="grid gap-2 border-b border-line py-5 sm:grid-cols-[14rem_1fr] sm:gap-8"
                    >
                      <dt className="font-medium text-fg">{s.name}</dt>
                      <dd className="text-body text-fg-2">{s.body}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="domains" eyebrow="By domain" index="02">
        <h2 className="max-w-[20ch] text-title text-fg">
          The same building blocks, shaped to your industry.
        </h2>

        <div className="mt-16 border-t border-line">
          {DOMAINS.map((d) => (
            <div
              key={d.name}
              className="grid gap-3 border-b border-line py-7 transition-colors duration-150 hover:bg-bg-1 md:grid-cols-[16rem_1fr_auto] md:items-baseline md:gap-10 md:px-4"
            >
              <h3 className="text-subtitle text-fg">{d.name}</h3>
              <p className="text-body text-fg-2">{d.build}</p>
              <p className="flex gap-2">
                {d.via.map((v) => (
                  <span
                    key={v}
                    className="mono-ui border border-line px-2 py-1 text-fg-3"
                  >
                    {v}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>

      </Section>

      <Products index="03" />

      <Section id="start" rule tight>
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <p className="measure text-subtitle text-fg">
            Your domain isn't listed? Our agents and chatbots are configured per
            use case, so tell us yours.
          </p>
          <Button
            variant="primary"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Talk now
            <ArrowRight size={16} aria-hidden />
          </Button>
        </div>
      </Section>
    </PageLayout>
  );
}
