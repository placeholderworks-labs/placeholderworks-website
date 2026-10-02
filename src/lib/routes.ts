/**
 * The site's routes, in one place. The nav, the footer, the document head and
 * `public/sitemap.xml` all describe the same set, so it is defined once here
 * and everything else reads from it — the way `sections.ts` does for the
 * home page's anchors.
 *
 * Keep `public/sitemap.xml` in step when this list changes.
 */

export interface RouteMeta {
  /** Canonical path. No trailing slash. */
  path: string;
  /** Short label for nav and footer. */
  label: string;
  /** Document title. The site name is appended by `useDocumentMeta`. */
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

export const ROUTES: readonly RouteMeta[] = [
  {
    path: "/services",
    label: "Services",
    title: "Services",
    description:
      "Voice and calling agents, WhatsApp and website chatbots, email and workflow automation, AI native apps, ChatGPT apps, evals and QA engines, organised by modality and by domain.",
    eyebrow: "What we do",
    heading: "If it can be automated, we build it.",
    lede: "Every service below ends in a system running in production. Find yours by how people reach you, or by the industry you work in.",
    group: "company",
  },
  {
    path: "/portfolio",
    label: "Portfolio",
    title: "Portfolio",
    description:
      "Client work: the problem, the system we built, and what is running today.",
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
