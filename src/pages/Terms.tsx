import { LegalPage, INLINE_LINK, MailLink, SiteLink, type Clause } from "@/components/LegalPage";
import { Link } from "@/components/Link";
import { ROUTE_BY_PATH } from "@/lib/routes";
import { EMAIL } from "@/lib/contact";

const CLAUSES: readonly Clause[] = [
  {
    heading: "About these terms",
    body: (
      <>
        <p>
          These Terms & Conditions apply to your use of <SiteLink />, the
          website of Placeholderworks.
        </p>
        <p>
          We are an Applied AI engineering company based in India, working with clients
          in every country.
        </p>
      </>
    ),
  },
  {
    heading: "Our services",
    body: (
      <>
        <p>We build AI that makes it to production.</p>
        <p>
          We work with businesses to design, build, integrate and deploy AI
          systems, taking them from the first idea to a system running in
          production.
        </p>
      </>
    ),
  },
  {
    heading: "What this website is for",
    body: (
      <p>
        This website is where we show what we have built and what we are
        building. It is here so you can see our work and decide whether you
        would like to talk to us.
      </p>
    ),
  },
  {
    heading: "Talking to us about a project",
    body: (
      <p>
        When you want to discuss a project, the website takes you to WhatsApp
        with a message ready to send. From there, the conversation is directly
        with us.
      </p>
    ),
  },
  {
    heading: "Your privacy",
    body: (
      <p>
        How we handle information is set out in our{" "}
        <Link href="/privacy" className={INLINE_LINK}>
          Privacy Policy
        </Link>
        .
      </p>
    ),
  },
  {
    heading: "Contact us",
    body: (
      <p>
        For any question about these terms, email <MailLink email={EMAIL} />.
      </p>
    ),
  },
];

export function Terms() {
  return (
    <LegalPage
      route={ROUTE_BY_PATH.get("/terms")!}
      updated="3 October 2026"
      clauses={CLAUSES}
    />
  );
}
