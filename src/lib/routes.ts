/**
 * The site's routes, in one place. The nav, the footer, the document head,
 * the prerendered pages and the generated `sitemap.xml` all read this list
 * (see `scripts/prerender.mjs`), so adding a route here is the whole job.
 */

export interface RouteMeta {
  /** Canonical path. No trailing slash. */
  path: string;
  /** Short label for nav and footer. */
  label: string;
  /**
   * Document title. The site name is appended (see `lib/seo.ts`). Lead with
   * what a buyer would search for, not the page's internal name.
   */
  title: string;
  /** Meta description. One sentence, written for a search result. */
  description: string;
  /** Mono label above the page heading. */
  eyebrow: string;
  /** The page's h1. */
  heading: string;
  /** Standfirst under the heading. */
  lede: string;
  /** Which footer column it belongs to. */
  group: "company" | "legal";
}

export const SITE_URL = "https://placeholderworks.com";
export const SITE_NAME = "Placeholderworks";

/** The home page's head. Its title puts the brand first; subpages put it last. */
export const HOME_META = {
  path: "/",
  title: "Applied AI engineering & implementation",
  description:
    "Placeholderworks builds and deploys AI systems that solve real business problems: calling agents, WhatsApp chatbots, apps inside ChatGPT, workflow automation, evals and QA.",
} as const;

export const ROUTES: readonly RouteMeta[] = [
  {
    path: "/services",
    label: "Services",
    title: "AI Calling Agents, WhatsApp Chatbots, ChatGPT Apps & Automation",
    description:
      "AI calling agents with telephony and live transfer, WhatsApp and website chatbots, CRM and ERP automation, ChatGPT app development, AI native apps, evals and QA automation.",
    eyebrow: "What we do",
    heading: "If it can be automated, we build it.",
    lede: "Every service below ends in a system running in production. Find yours by how people reach you, or by the industry you work in.",
    group: "company",
  },
  {
    path: "/portfolio",
    label: "Portfolio",
    title: "AI Case Studies: Adam Vacations ChatGPT App & RentaLease",
    description:
      "Client work in production: the Adam Vacations app inside ChatGPT, and RentaLease, a zero-brokerage rent map for Delhi NCR with a WhatsApp chatbot.",
    eyebrow: "Evidence",
    heading: "Portfolio",
    lede: "The projects we have shipped for clients: what was broken, what we built, and what is live now.",
    group: "company",
  },
  {
    path: "/privacy",
    label: "Privacy",
    title: "Privacy Policy",
    description:
      "What data Placeholderworks collects, why, and how to have it corrected or deleted.",
    eyebrow: "Legal",
    heading: "Privacy Policy",
    lede: "What we collect, why we collect it, and how to reach us about it.",
    group: "legal",
  },
  {
    path: "/terms",
    label: "Terms",
    title: "Terms & Conditions",
    description: "The terms that apply when you use the Placeholderworks website.",
    eyebrow: "Legal",
    heading: "Terms & Conditions",
    lede: "The terms that apply when you use this website.",
    group: "legal",
  },
] as const;

export const ROUTE_BY_PATH = new Map(ROUTES.map((r) => [r.path, r]));

export const COMPANY_ROUTES = ROUTES.filter((r) => r.group === "company");
export const LEGAL_ROUTES = ROUTES.filter((r) => r.group === "legal");
