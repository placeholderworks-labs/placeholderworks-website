import { PageLayout } from "@/components/PageLayout";
import { Work } from "@/sections/Work";
import { ROUTE_BY_PATH } from "@/lib/routes";

/**
 * The portfolio is the evidence: the home page's Work section, whole, so the
 * case studies are written and kept in one place.
 */
export function Portfolio() {
  return (
    <PageLayout route={ROUTE_BY_PATH.get("/portfolio")!}>
      <Work index="01" rule={false} />
    </PageLayout>
  );
}
