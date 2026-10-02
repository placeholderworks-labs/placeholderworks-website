/**
 * Every way to reach us, defined once. The footer is the only place these are
 * listed; everything else links through the constants rather than repeating
 * the details on the page.
 */
export const EMAIL = "contact@placeholderworks.com";

/** WhatsApp Business (+91 87966 77380), digits only as wa.me needs it. */
const WHATSAPP_NUMBER = "918796677380";

const WHATSAPP_MESSAGE = "Hi, I have a requirement for my business. Can we talk?";

/** A WhatsApp chat link with `text` already written into the message box. */
export function whatsappUrl(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** The "Start a conversation" chat, opening with the standard message. */
export const WHATSAPP_URL = whatsappUrl(WHATSAPP_MESSAGE);

export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/placeholderworks" },
  { label: "X", href: "https://x.com/placeholderwrks" },
  { label: "Instagram", href: "https://instagram.com/placeholderwrks" },
] as const;
