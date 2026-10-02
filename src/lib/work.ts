import type { Video } from "@/lib/services";

export interface Deployment {
  client: string;
  sector: string;
  href: string;
  site: string;
  challenge: string;
  built: string;
  /** 16:9 walkthrough; see `Video` for how to drop the file in. */
  video: Video;
  /**
   * For the VideoObject schema: ISO 8601 duration and the date the video went
   * up on this site. Keep them true to the file.
   */
  videoMeta: { duration: string; uploaded: string };
  /** Plain facts about what is running. Never invented figures (§9). */
  facts: { label: string; value: string }[];
}

/**
 * Work / case studies (CLAUDE.md §6, §9): evidence, not marketing cards.
 * Facts only; a result figure goes in once it is measured and cleared.
 */
export const DEPLOYMENTS: Deployment[] = [
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
      poster: "/videos/adam-vacations-x-placeholderworks.webp",
    },
    videoMeta: { duration: "PT32S", uploaded: "2026-10-03" },
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
      poster: "/videos/rentalease-x-placeholderworks.webp",
    },
    videoMeta: { duration: "PT23S", uploaded: "2026-10-03" },
    facts: [
      { label: "Live in", value: "Gurgaon" },
      { label: "Brokerage", value: "Zero" },
      { label: "Signup", value: "None" },
    ],
  },
];
