import type { ReactNode } from "react";
import { Section } from "@/components/Section";
import { PageLayout } from "@/components/PageLayout";
import type { RouteMeta } from "@/lib/routes";

export interface Clause {
  heading: string;
  /** One or more paragraphs. */
  body: ReactNode;
}

export const INLINE_LINK =
  "text-fg underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent";

/** The website's name, always linked wherever the documents mention it. */
export function SiteLink() {
  return (
    <a href="https://placeholderworks.com" className={INLINE_LINK}>
      placeholderworks.com
    </a>
  );
}

export function MailLink({ email }: { email: string }) {
  return (
    <a href={`mailto:${email}`} className={INLINE_LINK}>
      {email}
    </a>
  );
}

/**
 * The shared skeleton behind Privacy and Terms. The clause text is written
 * only from what the company has supplied; nothing beyond that is drafted.
 */
export function LegalPage({
  route,
  updated,
  clauses,
}: {
  route: RouteMeta;
  updated: string;
  clauses: readonly Clause[];
}) {
  return (
    <PageLayout route={route}>
      <Section id="document" rule={false}>
        <div className="grid gap-12 lg:grid-cols-[14rem_1fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-3">Last updated</p>
            <p className="font-mono text-sm text-fg-2">{updated}</p>

            <nav aria-label="On this page" className="mt-10 hidden lg:block">
              <p className="eyebrow mb-3">Contents</p>
              <ol className="flex flex-col gap-2">
                {clauses.map((c, i) => (
                  <li key={i}>
                    <a
                      href={`#clause-${i + 1}`}
                      className="font-mono text-xs text-fg-3 transition-colors hover:text-accent"
                    >
                      {String(i + 1).padStart(2, "0")} {c.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="border-t border-line">
            {clauses.map((c, i) => (
              <section
                key={i}
                id={`clause-${i + 1}`}
                className="scroll-mt-28 border-b border-line py-10"
              >
                <div className="flex gap-6">
                  <span className="mt-1 font-mono text-sm text-fg-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-subtitle text-fg">{c.heading}</h2>
                    <div className="measure mt-4 flex flex-col gap-4 text-body text-fg-2">
                      {c.body}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
