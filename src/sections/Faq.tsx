import { Plus } from "lucide-react";
import { Section } from "@/components/Section";

const FAQS = [
  {
    q: "What do you build?",
    a: "AI that runs in production: real-time calling and voice agents, WhatsApp and website chatbots, email and workflow automation, AI native apps, apps inside ChatGPT, and eval and QA engines.",
  },
  {
    q: "Is it only chatbots?",
    a: "No. If a piece of work can be automated, we build the system that does it, whether that is sorting email, updating your CRM or ERP from WhatsApp, testing your releases or publishing your videos.",
  },
  {
    q: "Will it work with the systems we already use?",
    a: "Yes. We integrate with your telephony, your CRM and ERP, WhatsApp and your customer care team, so the AI works inside your operation rather than beside it.",
  },
  {
    q: "Can a voice agent hand a call over to a person?",
    a: "Yes. Our calling agents transfer a call live to someone on your team the moment it needs a human.",
  },
  {
    q: "Do you have ready products, or is everything custom?",
    a: "Both. Our WhatsApp chatbot, EasyShorts, the Voice Agent Dashboard and Eval Labs are ready to use, and we build custom systems around your business.",
  },
  {
    q: "How do you choose which AI model to use?",
    a: "We test before we choose. Eval Labs runs evals across voice, chat, image and text, and shows which model performs best for your use case.",
  },
  {
    q: "Which countries do you work with?",
    a: "All of them. We are based in India and work with clients everywhere.",
  },
];

/**
 * Native `<details>` rather than a JS accordion: it opens without scripting,
 * is keyboard operable for free, and is findable by the browser's own in-page
 * search. The only animated thing is the marker rotation, which is CSS.
 *
 * Heading above, questions full width below: side by side, the heading's
 * column sat empty for the whole length of the list.
 */
export function Faq() {
  return (
    <Section id="faq" index="05" eyebrow="Questions">
      <h2 className="max-w-[20ch] text-title text-fg">Asked before you ask.</h2>

      <div className="mt-16 border-t border-line">
        {FAQS.map((f) => (
          <details key={f.q} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-7 text-subtitle text-fg transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
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
    </Section>
  );
}
