import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/Section";
import { PageLayout } from "@/components/PageLayout";
import { ROUTE_BY_PATH } from "@/lib/routes";

/**
 * Dummy content. Swap `href` for a real post path once posts exist — at that
 * point each one becomes its own route and belongs in `sitemap.xml` too.
 */
const POSTS = [
  {
    date: "[YYYY-MM-DD]",
    readingTime: "[N] min",
    title: "[PLACEHOLDER] Post title — a claim, not a topic.",
    excerpt: "[PLACEHOLDER] Two lines on what the post argues and who should read it.",
    href: "[PLACEHOLDER_URL]",
  },
  {
    date: "[YYYY-MM-DD]",
    readingTime: "[N] min",
    title: "[PLACEHOLDER] Post title — a claim, not a topic.",
    excerpt: "[PLACEHOLDER] Two lines on what the post argues and who should read it.",
    href: "[PLACEHOLDER_URL]",
  },
  {
    date: "[YYYY-MM-DD]",
    readingTime: "[N] min",
    title: "[PLACEHOLDER] Post title — a claim, not a topic.",
    excerpt: "[PLACEHOLDER] Two lines on what the post argues and who should read it.",
    href: "[PLACEHOLDER_URL]",
  },
  {
    date: "[YYYY-MM-DD]",
    readingTime: "[N] min",
    title: "[PLACEHOLDER] Post title — a claim, not a topic.",
    excerpt: "[PLACEHOLDER] Two lines on what the post argues and who should read it.",
    href: "[PLACEHOLDER_URL]",
  },
];

export function Blogs() {
  return (
    <PageLayout route={ROUTE_BY_PATH.get("/blogs")!}>
      <Section id="posts" eyebrow="Latest" index="01" rule={false}>
        <ul className="border-t border-line">
          {POSTS.map((p, i) => (
            <li key={i}>
              <a
                href={p.href}
                className="group grid gap-4 border-b border-line py-10 transition-colors hover:bg-bg-1 md:grid-cols-[10rem_1fr_auto] md:items-baseline md:gap-10"
              >
                <span className="font-mono text-xs text-fg-3">
                  <time dateTime={p.date}>{p.date}</time>
                  <span aria-hidden> · </span>
                  {p.readingTime}
                </span>
                <div>
                  <h2 className="text-subtitle text-fg transition-colors group-hover:text-accent">
                    {p.title}
                  </h2>
                  <p className="measure mt-3 text-body text-fg-2">{p.excerpt}</p>
                </div>
                <ArrowUpRight
                  size={18}
                  aria-hidden
                  className="hidden text-fg-3 transition-colors group-hover:text-accent md:block"
                />
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </PageLayout>
  );
}
