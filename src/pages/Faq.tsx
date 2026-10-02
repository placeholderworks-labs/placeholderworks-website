import { Plus } from "lucide-react";
import { Section } from "@/components/Section";
import { PageLayout } from "@/components/PageLayout";
import { ROUTE_BY_PATH } from "@/lib/routes";
import { Link } from "@/components/Link";

/** Dummy content — replace the answers, keep the questions clients actually ask. */
const FAQS = [
  {
    q: "[PLACEHOLDER] How do engagements usually start?",
    a: "[PLACEHOLDER] Answer in two or three sentences. Be specific and concrete; vagueness here costs trust.",
  },
  {
    q: "[PLACEHOLDER] How long does a first production system take?",
    a: "[PLACEHOLDER] Answer in two or three sentences. Be specific and concrete; vagueness here costs trust.",
  },
  {
    q: "[PLACEHOLDER] How is the work priced?",
    a: "[PLACEHOLDER] Answer in two or three sentences. Be specific and concrete; vagueness here costs trust.",
  },
  {
    q: "[PLACEHOLDER] Who owns the code and the data?",
    a: "[PLACEHOLDER] Answer in two or three sentences. Be specific and concrete; vagueness here costs trust.",
  },
  {
    q: "[PLACEHOLDER] What happens after launch?",
    a: "[PLACEHOLDER] Answer in two or three sentences. Be specific and concrete; vagueness here costs trust.",
  },
  {
    q: "[PLACEHOLDER] Do you work with our existing team and stack?",
    a: "[PLACEHOLDER] Answer in two or three sentences. Be specific and concrete; vagueness here costs trust.",
  },
];

/**
 * Native `<details>` rather than a JS accordion: it opens without scripting,
 * is keyboard operable for free, and is findable by the browser's own in-page
 * search. The only scripted thing is the marker rotation, which is CSS.
 */
export function Faq() {
  return (
    <PageLayout route={ROUTE_BY_PATH.get("/faq")!}>
      <Section id="questions" eyebrow="Answers" index="01" rule={false}>
        <div className="border-t border-line">
          {FAQS.map((f, i) => (
            <details key={i} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-8 text-subtitle text-fg transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus
                  size={20}
                  aria-hidden
                  className="mt-1 shrink-0 text-fg-3 transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="measure pb-8 text-body text-fg-2">{f.a}</p>
            </details>
          ))}
        </div>

        <p className="mt-12 text-body text-fg-2">
          Not answered here?{" "}
          <Link
            href="/contact-us"
            className="text-fg underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            Ask us directly
          </Link>
          .
        </p>
      </Section>
    </PageLayout>
  );
}
