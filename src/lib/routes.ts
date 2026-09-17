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
export const SITE_NAME = "Placeholder";

export const ROUTES: readonly RouteMeta[] = [
  {
    path: "/services",
    label: "Services",
    title: "Services",
    description:
      "What we build: AI strategy, custom applications, agents, LLM integrations, and the work of getting them into production.",
    eyebrow: "What we do",
    heading: "Services",
    lede: "[PLACEHOLDER] One or two sentences framing how the work is scoped, and what a client is actually buying.",
    group: "company",
  },
  {
    path: "/portfolio",
    label: "Portfolio",
    title: "Portfolio",
    description:
      "Selected work: the problem, the system we built, and what changed once it was running.",
    eyebrow: "Evidence",
    heading: "Portfolio",
    lede: "[PLACEHOLDER] One or two sentences on the kind of problems shown here and how results are measured.",
    group: "company",
  },
  {
    path: "/blogs",
    label: "Blog",
    title: "Blog",
    description:
      "Notes on building and deploying AI systems — architecture, evaluation, and what production actually demands.",
    eyebrow: "Writing",
    heading: "Blog",
    lede: "[PLACEHOLDER] One or two sentences on what gets written about here and who it is for.",
    group: "company",
  },
  {
    path: "/faq",
    label: "FAQ",
    title: "FAQ",
    description:
      "Common questions about how we scope, price, staff and deliver AI engagements.",
    eyebrow: "Questions",
    heading: "Frequently asked",
    lede: "[PLACEHOLDER] One or two sentences setting expectations, and where to go if a question is not answered here.",
    group: "company",
  },
  {
    path: "/contact-us",
    label: "Contact",
    title: "Contact",
    description:
      "Start a conversation about an AI project — tell us the problem and we will tell you what we would build.",
    eyebrow: "Invitation",
    heading: "Start a conversation.",
    lede: "Tell us what breaks today and what better would be worth. No form-filling ritual — a sentence or two about the problem is enough to begin.",
    group: "company",
  },
  {
    path: "/privacy",
    label: "Privacy",
    title: "Privacy Policy",
    description:
      "How Placeholder collects, uses, stores and shares personal information.",
    eyebrow: "Legal",
    heading: "Privacy Policy",
    lede: "[PLACEHOLDER] Replace with the reviewed policy. Nothing on this page is legal text yet.",
    group: "legal",
  },
  {
    path: "/terms",
    label: "Terms",
    title: "Terms of Service",
    description:
      "The terms governing use of the Placeholder website and services.",
    eyebrow: "Legal",
    heading: "Terms of Service",
    lede: "[PLACEHOLDER] Replace with the reviewed terms. Nothing on this page is legal text yet.",
    group: "legal",
  },
] as const;

export const ROUTE_BY_PATH = new Map(ROUTES.map((r) => [r.path, r]));

export const COMPANY_ROUTES = ROUTES.filter((r) => r.group === "company");
export const LEGAL_ROUTES = ROUTES.filter((r) => r.group === "legal");
