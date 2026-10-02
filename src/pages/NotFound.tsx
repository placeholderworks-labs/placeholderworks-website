import { Section } from "@/components/Section";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/Button";
import { Link } from "@/components/Link";
import { COMPANY_ROUTES, type RouteMeta } from "@/lib/routes";

const ROUTE: RouteMeta = {
  path: "/404",
  label: "Not found",
  title: "Page not found",
  description: "That page does not exist.",
  eyebrow: "404",
  heading: "That page doesn't exist.",
  lede: "The link may be out of date, or the address mistyped. Everything the site does have is one click away.",
  group: "company",
};

/**
 * Rendered for any unmatched path. Marked `noindex` because `netlify.toml`
 * rewrites `/*` to `index.html` with status 200 — the response is a 200 no
 * matter what, so the meta tag is the only signal a crawler gets that this is
 * not a real page.
 */
export function NotFound() {
  return (
    <PageLayout route={ROUTE} noindex>
      <Section id="elsewhere" eyebrow="Try one of these" rule={false}>
        <ul className="grid border-b border-r border-line sm:grid-cols-2 lg:grid-cols-3">
          {COMPANY_ROUTES.map((r) => (
            <li key={r.path}>
              <Link
                href={r.path}
                className="flex h-full flex-col justify-between gap-8 border-l border-t border-line p-6 transition-colors hover:bg-bg-1"
              >
                <span className="font-mono text-xs text-fg-3">{r.path}</span>
                <span className="text-subtitle text-fg">{r.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <Button variant="primary" href="/">
            Back to the home page
          </Button>
        </div>
      </Section>
    </PageLayout>
  );
}
