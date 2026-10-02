import { LegalPage, type Clause } from "@/components/LegalPage";
import { ROUTE_BY_PATH } from "@/lib/routes";

const BODY =
  "[PLACEHOLDER] Replace with reviewed text. Do not ship generated contract language — it reads as binding while describing terms the company has not agreed to.";

const CLAUSES: readonly Clause[] = [
  { heading: "Agreement to terms", body: BODY },
  { heading: "Who may use the services", body: BODY },
  { heading: "Scope of services", body: BODY },
  { heading: "Client responsibilities", body: BODY },
  { heading: "Fees and payment", body: BODY },
  { heading: "Intellectual property", body: BODY },
  { heading: "Confidentiality", body: BODY },
  { heading: "Acceptable use", body: BODY },
  { heading: "Disclaimers", body: BODY },
  { heading: "Limitation of liability", body: BODY },
  { heading: "Indemnification", body: BODY },
  { heading: "Term and termination", body: BODY },
  { heading: "Governing law and disputes", body: BODY },
  { heading: "Changes to these terms", body: BODY },
  { heading: "Contact us", body: BODY },
];

export function Terms() {
  return (
    <LegalPage
      route={ROUTE_BY_PATH.get("/terms")!}
      updated="[YYYY-MM-DD]"
      clauses={CLAUSES}
    />
  );
}
