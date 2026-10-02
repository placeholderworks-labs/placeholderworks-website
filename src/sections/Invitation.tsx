import { ArrowRight } from "lucide-react";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { WHATSAPP_URL } from "@/lib/contact";

/**
 * The invitation (CLAUDE.md §6). No form: one action that opens a WhatsApp
 * chat with the opening message already written.
 */
export function Invitation() {
  return (
    <Section id="contact" index="06" eyebrow="Invitation" tight>
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-24">
        <div>
          <h2 className="text-title text-fg">Let's discuss a problem.</h2>
          <p className="measure mt-6 text-body text-fg-2">
            Tell us what's slow, manual, or stuck. If there's an AI system worth
            building, we'll say so honestly, and then we can build it.
          </p>
        </div>

        <div>
          <Button
            variant="primary"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Talk now
            <ArrowRight size={16} aria-hidden />
          </Button>
        </div>
      </div>
    </Section>
  );
}
