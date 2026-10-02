import { LegalPage, MailLink, SiteLink, type Clause } from "@/components/LegalPage";
import { ROUTE_BY_PATH } from "@/lib/routes";
import { EMAIL } from "@/lib/contact";

const CLAUSES: readonly Clause[] = [
  {
    heading: "Who we are",
    body: (
      <>
        <p>
          This Privacy Policy explains how Placeholderworks handles information
          when you visit <SiteLink />.
        </p>
        <p>
          We are an Applied AI engineering company based in India. We build AI that
          makes it to production, and we work with clients in every country, so
          this policy applies wherever you visit from.
        </p>
      </>
    ),
  },
  {
    heading: "What we collect",
    body: (
      <>
        <p>
          Our website exists to show what we build. It has no forms, and nothing
          on it asks for your name, phone number or other personal details.
        </p>
        <p>
          When you want to talk to us about a project, the website takes you to
          WhatsApp. Anything you send there is information you choose to share
          with us.
        </p>
        <p>
          Beyond that, we collect information in two ways: through cookies set
          by our website, and through your email address if you subscribe to our
          newsletter.
        </p>
      </>
    ),
  },
  {
    heading: "Cookies",
    body: (
      <p>
        Cookies are small files a website stores in your browser. Our website
        uses them to collect data that helps us understand who is interested in
        our work.
      </p>
    ),
  },
  {
    heading: "How we use it",
    body: (
      <>
        <p>
          We use cookie data to understand our leads and to plan our marketing.
        </p>
        <p>
          We use your email address only to send you the newsletter you
          subscribed to, and for no other purpose.
        </p>
      </>
    ),
  },
  {
    heading: "Who we share it with",
    body: (
      <p>
        We keep your data with us. We do not sell it, rent it or share it with
        anyone else.
      </p>
    ),
  },
  {
    heading: "Marketing emails",
    body: (
      <>
        <p>
          We send marketing emails only to people who subscribe to our
          newsletter. If you never subscribe, you will not receive them.
        </p>
        <p>
          You can unsubscribe from our emails at any time, and we will stop
          sending them.
        </p>
      </>
    ),
  },
  {
    heading: "How long we keep it",
    body: (
      <p>
        We keep your data until you unsubscribe, or until you email us asking
        not to receive anything further. After that, we no longer keep it.
      </p>
    ),
  },
  {
    heading: "Correcting or deleting your data",
    body: (
      <p>
        If any of your data is wrong, or you want it removed, email us and tell
        us what you would like changed or deleted. We will correct or delete it.
      </p>
    ),
  },
  {
    heading: "Contact us",
    body: (
      <p>
        For anything about your privacy or this policy, email{" "}
        <MailLink email={EMAIL} />.
      </p>
    ),
  },
];

export function Privacy() {
  return (
    <LegalPage
      route={ROUTE_BY_PATH.get("/privacy")!}
      updated="3 October 2026"
      clauses={CLAUSES}
    />
  );
}
