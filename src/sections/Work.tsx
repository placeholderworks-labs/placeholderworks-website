import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/Section";
import { ServiceVideo } from "@/components/ServiceVideo";
import type { Video } from "@/lib/services";

interface Deployment {
  client: string;
  sector: string;
  href: string;
  site: string;
  challenge: string;
  built: string;
  /** 16:9 walkthrough; see `Video` for how to drop the file in. */
  video: Video;
  /** Plain facts about what is running. Never invented figures (§9). */
  facts: { label: string; value: string }[];
}

/**
 * Work / case studies (CLAUDE.md §6, §9): evidence, not marketing cards.
 * Facts only; a result figure goes in once it is measured and cleared.
 */
const DEPLOYMENTS: Deployment[] = [
  {
    client: "Adam Vacations",
    sector: "Travel",
    href: "https://www.adamvacations.com",
    site: "adamvacations.com",
    challenge:
      "A flight booking business, reachable only through its own website and its customer care team.",
    built:
      "Their app inside ChatGPT. We built and published Adam Vacations as a ChatGPT app, so travellers can use it straight from the conversation.",
    video: {
      title: "Adam Vacations, running inside ChatGPT",
      src: "/videos/adamlaunch.mp4",
      poster: "/videos/adam-vacations-x-placeholderworks.jpg",
    },
    facts: [
      { label: "Sector", value: "Travel" },
      { label: "Covers", value: "Flights" },
      { label: "Platform", value: "ChatGPT app" },
    ],
  },
  {
    client: "RentaLease",
    sector: "Real estate · Delhi NCR",
    href: "https://rentalease.in",
    site: "rentalease.in",
    challenge:
      "Rents in Indian cities are quoted by brokers, often inflated to cover a month's commission. Someone moving to Gurgaon had no way to know what people in a sector or society really pay.",
    built:
      "A zero-brokerage rent map built on anonymous pins from sitting tenants, with flatmate, room and PG pins, rent trends by area and BHK, a commute view, alerts for new matches, and a real-time WhatsApp chatbot for flat hunting.",
    video: {
      title: "RentaLease launch: zero brokerage rent map",
      src: "/videos/rentalease-launch.mp4",
      poster: "/videos/rentalease-x-placeholderworks.jpg",
    },
    facts: [
      { label: "Live in", value: "Gurgaon" },
      { label: "Brokerage", value: "Zero" },
      { label: "Signup", value: "None" },
    ],
  },
];

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
