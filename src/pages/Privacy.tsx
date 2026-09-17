import { LegalPage, type Clause } from "@/components/LegalPage";
import { ROUTE_BY_PATH } from "@/lib/routes";

const BODY =
  "[PLACEHOLDER] Replace with reviewed text. Do not ship generated policy language — it reads as binding while describing practices the company may not follow.";

const CLAUSES: readonly Clause[] = [
  { heading: "Who we are", body: BODY },
  { heading: "Information we collect", body: BODY },
  { heading: "How we use information", body: BODY },
  { heading: "Legal bases for processing", body: BODY },
  { heading: "Cookies and analytics", body: BODY },
  { heading: "Sharing and third parties", body: BODY },
  { heading: "International transfers", body: BODY },
  { heading: "Data retention", body: BODY },
  { heading: "Security", body: BODY },
  { heading: "Your rights", body: BODY },
  { heading: "Children's privacy", body: BODY },
  { heading: "Changes to this policy", body: BODY },
  { heading: "Contact us", body: BODY },
];

export function Privacy() {
  return (
    <LegalPage
      route={ROUTE_BY_PATH.get("/privacy")!}
      updated="[YYYY-MM-DD]"
      clauses={CLAUSES}
    />
  );
}
