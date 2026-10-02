import { scrollToId } from "@/lib/utils";
import { SECTIONS } from "@/lib/sections";
import { Link } from "@/components/Link";
import { usePath, navigate } from "@/lib/router";
import { COMPANY_ROUTES, LEGAL_ROUTES } from "@/lib/routes";
import { EMAIL, SOCIALS } from "@/lib/contact";

const NAV = SECTIONS.filter((s) => s.nav);
const YEAR = 2026; // build-time constant; update on release

/**
 * Minimal footer (CLAUDE.md §7, §18): contact, essential nav, social, legal.
 * The only place on the site that lists the contact details.
 */
export function Footer() {
  const home = usePath() === "/";

  /** Same rule as the nav: anchors on the home page, `/#id` from a sub-page. */
  const hrefFor = (id: string) => (home ? `#${id}` : `/#${id}`);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (home) scrollToId(id);
    else navigate(`/#${id}`);
  };

  return (
    <footer className="border-t border-line bg-bg-1">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-20 lg:px-16">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
          <div>
            <a
              href={hrefFor("opening")}
              onClick={go("opening")}
              className="text-2xl font-semibold tracking-tight text-fg"
            >
              Placeholderworks<span className="text-accent">.</span>
            </a>
            <p className="measure mt-4 text-body text-fg-2">
              We build and deploy AI systems that do real work.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-6 inline-block font-mono text-sm text-fg-2 underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {EMAIL}
            </a>
          </div>

          <div className="flex flex-wrap gap-x-16 gap-y-10">
            <nav aria-label="Footer">
              <p className="eyebrow mb-4 text-fg-3">Explore</p>
              <ul className="flex flex-col gap-3">
                {NAV.map((s) => (
                  <li key={s.id}>
                    <a
                      href={hrefFor(s.id)}
                      onClick={go(s.id)}
                      className="text-sm text-fg-2 transition-colors hover:text-fg"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Pages">
              <p className="eyebrow mb-4 text-fg-3">Company</p>
              <ul className="flex flex-col gap-3">
                {COMPANY_ROUTES.map((r) => (
                  <li key={r.path}>
                    <Link
                      href={r.path}
                      className="text-sm text-fg-2 transition-colors hover:text-fg"
                    >
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="eyebrow mb-4 text-fg-3">Elsewhere</p>
              <ul className="flex flex-col gap-3">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-fg-2 transition-colors hover:text-fg"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 font-mono text-xs text-fg-3 sm:flex-row sm:items-center sm:justify-between">
          <span>© {YEAR} Placeholderworks. All rights reserved.</span>
          <span className="flex gap-6">
            {LEGAL_ROUTES.map((r) => (
              <Link
                key={r.path}
                href={r.path}
                className="transition-colors hover:text-fg-2"
              >
                {r.label}
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
