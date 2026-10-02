/**
 * Everything a crawler reads in a page's <head>, per route.
 *
 * Social link previews (LinkedIn, X, WhatsApp, Slack…) and AI crawlers do not
 * run JavaScript, so this is written into each page's HTML at build time by
 * `scripts/prerender.mjs`. In the browser, `useDocumentMeta` keeps the title,
 * description and canonical in step as the reader navigates.
 */
import {
  HOME_META,
  ROUTES,
  ROUTE_BY_PATH,
  SITE_NAME,
  SITE_URL,
} from "@/lib/routes";
import { EMAIL, SOCIALS, TELEPHONE } from "@/lib/contact";
import { MODALITIES } from "@/lib/services";
import { DEPLOYMENTS } from "@/lib/work";

/** 1200×630, cut from public/placeholderbanner.png. */
const OG_IMAGE = {
  url: `${SITE_URL}/placeholderbanner-og.jpg`,
  type: "image/jpeg",
  width: 1200,
  height: 630,
};
const X_HANDLE = "@placeholderwrks";

const ORG_ID = `${SITE_URL}/#org`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export interface Head {
  title: string;
  description: string;
  /** Absolute canonical URL; absent on noindex pages. */
  url?: string;
  noindex: boolean;
  jsonLd?: object;
}

/** Brand first on the home page, last everywhere else. */
export function fullTitle(path: string, title: string): string {
  return path === "/" ? `${SITE_NAME} | ${title}` : `${title} | ${SITE_NAME}`;
}

export function absolute(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

const organization = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/favicon.png`,
    width: 512,
    height: 512,
  },
  image: OG_IMAGE.url,
  description:
    "AI engineering and implementation company that builds and deploys calling agents, WhatsApp chatbots, apps inside ChatGPT and workflow automation.",
  email: EMAIL,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: TELEPHONE,
    email: EMAIL,
    availableLanguage: ["en"],
  },
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  areaServed: "Worldwide",
  knowsAbout: [
    "AI calling agents",
    "Voice AI",
    "WhatsApp chatbots",
    "ChatGPT apps",
    "Workflow automation",
    "CRM and ERP automation",
    "LLM evaluation",
    "QA automation",
  ],
  sameAs: SOCIALS.map((s) => s.href),
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "en",
  publisher: { "@id": ORG_ID },
};

const videos = DEPLOYMENTS.filter((d) => d.video.src).map((d) => ({
  "@type": "VideoObject",
  name: d.video.title,
  description: d.built,
  thumbnailUrl: d.video.poster ? `${SITE_URL}${d.video.poster}` : OG_IMAGE.url,
  contentUrl: `${SITE_URL}${d.video.src}`,
  uploadDate: d.videoMeta.uploaded,
  duration: d.videoMeta.duration,
  publisher: { "@id": ORG_ID },
}));

function breadcrumbs(path: string, name: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name, item: absolute(path) },
    ],
  };
}

const services = {
  "@type": "ItemList",
  name: "AI services",
  itemListElement: MODALITIES.flatMap((m) => m.services).map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.name,
      description: s.body,
      provider: { "@id": ORG_ID },
      areaServed: "Worldwide",
    },
  })),
};

function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/** The head for a path, or the 404 head for anything not a real route. */
export function headFor(path: string): Head {
  if (path === "/") {
    return {
      title: fullTitle("/", HOME_META.title),
      description: HOME_META.description,
      url: SITE_URL,
      noindex: false,
      jsonLd: graph(organization, website, ...videos),
    };
  }

  const route = ROUTE_BY_PATH.get(path);
  if (!route) {
    return {
      title: fullTitle(path, "Page not found"),
      description: "That page does not exist.",
      noindex: true,
    };
  }

  const nodes: object[] = [organization, website, breadcrumbs(path, route.label)];
  if (path === "/services") nodes.push(services);
  if (path === "/portfolio") nodes.push(...videos);

  return {
    title: fullTitle(path, route.title),
    description: route.description,
    url: absolute(path),
    noindex: false,
    jsonLd: graph(...nodes),
  };
}

/** Every indexable path, home first. */
export const INDEXABLE = ["/", ...ROUTES.map((r) => r.path)];

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** The head as HTML, for the prerender step. */
export function headHtml(head: Head): string {
  const meta = (attr: "name" | "property", key: string, value: string) =>
    `<meta ${attr}="${key}" content="${esc(value)}" />`;

  const lines = [
    `<title>${esc(head.title)}</title>`,
    meta("name", "description", head.description),
    meta("name", "robots", head.noindex ? "noindex, follow" : "index, follow"),
  ];

  if (head.url) {
    lines.push(
      `<link rel="canonical" href="${head.url}" />`,
      meta("property", "og:type", "website"),
      meta("property", "og:site_name", SITE_NAME),
      meta("property", "og:locale", "en_US"),
      meta("property", "og:url", head.url),
      meta("property", "og:title", head.title),
      meta("property", "og:description", head.description),
      meta("property", "og:image", OG_IMAGE.url),
      meta("property", "og:image:secure_url", OG_IMAGE.url),
      meta("property", "og:image:type", OG_IMAGE.type),
      meta("property", "og:image:width", String(OG_IMAGE.width)),
      meta("property", "og:image:height", String(OG_IMAGE.height)),
      meta("property", "og:image:alt", SITE_NAME),
      meta("name", "twitter:card", "summary_large_image"),
      meta("name", "twitter:site", X_HANDLE),
      meta("name", "twitter:title", head.title),
      meta("name", "twitter:description", head.description),
      meta("name", "twitter:image", OG_IMAGE.url),
      meta("name", "twitter:image:alt", SITE_NAME)
    );
  }

  if (head.jsonLd) {
    // `<` is escaped so no string in the data can close the script element.
    const json = JSON.stringify(head.jsonLd).replace(/</g, "\\u003c");
    lines.push(`<script type="application/ld+json">${json}</script>`);
  }

  return lines.join("\n    ");
}
