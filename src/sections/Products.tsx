import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/Section";

interface Product {
  n: string;
  name: string;
  /** What kind of thing it is, in the mono label above the name. */
  kind: string;
  summary: string;
  does: string[];
  link?: { href: string; label: string };
}

/**
 * Products that are built and running. Every line here is a feature that
 * exists; nothing is a roadmap item dressed up as shipped.
 */
const PRODUCTS: Product[] = [
  {
    n: "01",
    name: "WhatsApp Chatbot",
    kind: "Real-time chatbot · Any use case",
    summary:
      "A real-time WhatsApp chatbot you can point at any use case. One deployment is flat hunting in metro cities, where it powers RentaLease.",
    does: [
      "Answers in real time, inside WhatsApp",
      "Configured per use case, per business",
      "Connects to your CRM, ERP and customer care team",
    ],
  },
  {
    n: "02",
    name: "RentaLease",
    kind: "Real estate · Delhi NCR",
    summary:
      "The real rent map of Delhi NCR, live in Gurgaon. Tenants drop the rent they actually pay, so renters see real neighbourhood rents instead of broker quotes.",
    does: [
      "Zero brokerage, no signup, free for tenants",
      "Flatmate, room and PG pins with direct contact",
      "Rent trends by area and BHK, plus a commute view",
    ],
    link: { href: "https://rentalease.in", label: "rentalease.in" },
  },
  {
    n: "03",
    name: "EasyShorts",
    kind: "Video · Product and service",
    summary:
      "Give it any YouTube video and it makes as many shorts as you want, chosen on research into what goes viral, then edits and publishes them for you.",
    does: [
      "Picks the moments, edits automatically",
      "Adds captions and background music",
      "Publishes to YouTube on its own",
    ],
  },
  {
    n: "04",
    name: "Voice Agent Dashboard",
    kind: "Voice · Analytics and control",
    summary:
      "One place to watch your voice agents while they are live, and to set them up for any use case, from abandoned cart calls to support lines.",
    does: [
      "Live analytics for every voice agent",
      "Configure a new use case without a rebuild",
      "Abandoned cart calling, support and more",
    ],
  },
  {
    n: "05",
    name: "Eval Labs",
    kind: "Evals · Voice, chat, image, text",
    summary:
      "Run evals in any modality and see which model outperforms where, so the model you ship is the one that fits your use case.",
    does: [
      "Evals across voice, chat, image and text",
      "Side by side model comparison",
      "A clear answer for your use case",
    ],
  },
];

export function Products({ index = "03" }: { index?: string }) {
  return (
    <Section id="products" index={index} eyebrow="Products">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <h2 className="max-w-[16ch] text-title text-fg">
          Products, already running.
        </h2>
        <p className="measure text-body text-fg-2">
          The same engineering we bring to client work, packaged as products.
          Use them as they are, or have us shape one around your business.
        </p>
      </div>

      <div className="mt-16 border-t border-line">
        {PRODUCTS.map((p) => (
          <article key={p.n} className="group border-b border-line py-12">
            <div className="grid gap-8 lg:grid-cols-[8rem_1.1fr_1fr] lg:gap-12">
              <div className="font-mono text-5xl font-medium leading-none text-fg-3 transition-colors duration-150 group-hover:text-accent md:text-6xl">
                {p.n}
              </div>

              <div>
                <p className="eyebrow text-fg-3">{p.kind}</p>
                <h3 className="mt-3 text-display text-fg">{p.name}</h3>
                <p className="measure mt-6 text-body text-fg-2">{p.summary}</p>
                {p.link && (
                  <a
                    href={p.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono-ui mt-6 inline-flex items-center gap-2 border-b border-line pb-1 text-fg-2 transition-colors hover:border-fg hover:text-fg"
                  >
                    {p.link.label}
                    <ArrowUpRight size={14} aria-hidden />
                  </a>
                )}
              </div>

              <div className="lg:pt-10">
                <p className="eyebrow mb-4">What it does</p>
                <ul className="border-t border-line">
                  {p.does.map((d) => (
                    <li
                      key={d}
                      className="border-b border-line py-3 text-body text-fg-2"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-10 font-mono text-sm text-fg-3">
        More are on their way.
      </p>
    </Section>
  );
}
