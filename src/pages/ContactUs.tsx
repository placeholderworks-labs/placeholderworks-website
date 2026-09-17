import { PageLayout } from "@/components/PageLayout";
import { Invitation } from "@/sections/Invitation";
import { ROUTE_BY_PATH } from "@/lib/routes";

/**
 * The contact page reuses the home page's `Invitation` section outright rather
 * than growing a second form: one set of fields, one validation rule, one
 * success state, one endpoint to point at `[CONTACT_ENDPOINT]` when it exists.
 */
export function ContactUs() {
  return (
    <PageLayout route={ROUTE_BY_PATH.get("/contact-us")!}>
      <Invitation />
    </PageLayout>
  );
}
