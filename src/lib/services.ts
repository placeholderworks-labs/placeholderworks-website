/**
 * The service catalogue, grouped by how people reach the system, then read by
 * industry. The Services page shows all of it; the home page features a few
 * modalities by id (see `FEATURED`).
 */

export interface Modality {
  n: string;
  name: string;
  line: string;
  services: { name: string; body: string }[];
}

/**
 * Grouped by how people reach the system (CLAUDE.md §6: depth surfaces
 * progressively, deeper in).
 */
export const MODALITIES: Modality[] = [
  {
    n: "01",
    name: "Voice",
    line: "Agents that pick up, talk and act.",
    services: [
      {
        name: "Real-time calling agents",
        body: "Inbound and outbound calling agents for any use case, integrated with your own telephony.",
      },
      {
        name: "Live support with call transfer",
        body: "Real-time customer support on the phone that transfers the call live to a person on your team the moment it needs one.",
      },
      {
        name: "Voice bots that take action",
        body: "Voice chatbots that carry out what the caller asks, not just answer it, in any domain.",
      },
      {
        name: "Voice Agent Dashboard",
        body: "Live analytics for every voice agent, and one place to configure new use cases such as abandoned cart calls.",
      },
    ],
  },
  {
    n: "02",
    name: "WhatsApp & web",
    line: "Conversations that get work done.",
    services: [
      {
        name: "Real-time WhatsApp chatbots",
        body: "Chatbots that answer instantly inside WhatsApp, configured for your use case.",
      },
      {
        name: "CRM and ERP automation via WhatsApp",
        body: "Read and update your CRM and ERP from a WhatsApp chat, without opening another tool.",
      },
      {
        name: "Website bots and agents",
        body: "Bots and agents on your website that handle the work your team does by hand today.",
      },
      {
        name: "Customer care, connected",
        body: "Real-time chatbots wired into your customer care services, so a customer reaches a person when they need one.",
      },
    ],
  },
  {
    n: "03",
    name: "Email & workforce",
    line: "The inbox and the back office, automated.",
    services: [
      {
        name: "Email automation",
        body: "Replies, follow-ups and routine correspondence sent by the system instead of by your team.",
      },
      {
        name: "Auto email classifiers",
        body: "Incoming email sorted and routed to the right place automatically.",
      },
      {
        name: "Internal workforce automation",
        body: "Agents that take over repetitive internal work, so it no longer depends on manual effort.",
      },
    ],
  },
  {
    n: "04",
    name: "Video",
    line: "One long video in, a channel of shorts out.",
    services: [
      {
        name: "EasyShorts, as a service",
        body: "Any YouTube video turned into as many shorts as you want, chosen on research into what goes viral, edited, captioned, set to background music and published to YouTube automatically.",
      },
    ],
  },
  {
    n: "05",
    name: "Apps",
    line: "Products with AI at the core, where your users already are.",
    services: [
      {
        name: "Your app inside ChatGPT",
        body: "We publish your product as an app inside ChatGPT, so people can use it from the conversation. We built one for Adam Vacations.",
      },
      {
        name: "AI native apps",
        body: "Apps built with AI integrated from the start. Kasolit, a Blinkit-style app for reaching local customers, is one we built.",
      },
    ],
  },
  {
    n: "06",
    name: "Evals & QA",
    line: "Proof before anything ships.",
    services: [
      {
        name: "Eval engines",
        body: "Evals in any modality, voice, chat, image or text, showing which model outperforms where and which fits your use case. This is what Eval Labs runs.",
      },
      {
        name: "QA automation engines",
        body: "Engines that automate your QA testing, so every release is checked without someone clicking through it.",
      },
    ],
  },
];

export interface Domain {
  name: string;
  build: string;
  via: string[];
}

/** The same building blocks, read by industry. */
export const DOMAINS: Domain[] = [
  {
    name: "Real estate & rentals",
    build: "WhatsApp chatbots for real-time flat hunting, and rent data products like RentaLease.",
    via: ["WhatsApp", "Web"],
  },
  {
    name: "Travel & hospitality",
    build: "Your travel app inside ChatGPT, as we built for Adam Vacations, and calling agents for booking questions.",
    via: ["Apps", "Voice"],
  },
  {
    name: "E-commerce & retail",
    build: "Abandoned cart calling, and order updates and support on WhatsApp.",
    via: ["Voice", "WhatsApp"],
  },
  {
    name: "Local commerce",
    build: "AI native apps that connect local sellers with nearby customers, like Kasolit.",
    via: ["Apps"],
  },
  {
    name: "Customer support",
    build: "Calling agents with live transfer, and chatbots that hand off to your team.",
    via: ["Voice", "Chat"],
  },
  {
    name: "Media & creators",
    build: "Shorts cut from long videos on research into what goes viral, then captioned and published on their own.",
    via: ["Video"],
  },
  {
    name: "Education",
    build: "Enquiry lines on voice and WhatsApp that answer students and parents at any hour.",
    via: ["Voice", "WhatsApp"],
  },
  {
    name: "Sales & operations",
    build: "Email classifiers, CRM and ERP updates from WhatsApp, and workforce automation.",
    via: ["Email", "WhatsApp"],
  },
  {
    name: "Product & engineering",
    build: "Model evals before you choose, QA engines before you release, and apps inside ChatGPT.",
    via: ["Evals", "Apps"],
  },
];

/**
 * A 16:9 demo. Drop the file in `public/videos/` and set `src` (and ideally
 * `poster`). With only a `poster` the slot shows that still; with neither it
 * renders as a marked placeholder frame.
 */
export interface Video {
  title: string;
  src?: string;
  poster?: string;
}

export interface Featured {
  modality: string;
  name: string;
  body: string;
  video: Video;
}

/**
 * The home page's featured services, each shown working on video. These are
 * the only videos on the site; the rest of the catalogue is /services.
 */
export const FEATURED: Featured[] = [
  {
    modality: "Apps",
    name: "Your app inside ChatGPT",
    body: "We publish your product as an app inside ChatGPT, so people can use it from the conversation. We built one for Adam Vacations.",
    // Poster only until the video lands: the slot shows the still.
    video: {
      title: "ChatGPT × Placeholderworks",
      poster: "/videos/chatgpt-x-placeholderworks.webp",
    },
  },
  {
    modality: "WhatsApp",
    name: "Real-time WhatsApp chatbots",
    body: "Chatbots that answer instantly inside WhatsApp, configured for your use case, and connected to your CRM, your ERP and your customer care team.",
    // Poster only until the video lands: the slot shows the still.
    video: {
      title: "WhatsApp × Placeholderworks",
      poster: "/videos/whatsapp-x-placeholderworks.webp",
    },
  },
  {
    modality: "Voice",
    name: "Real-time calling agents",
    body: "Inbound and outbound calling agents for any use case, integrated with your own telephony.",
    // Poster only until the video lands: the slot shows the still.
    video: {
      title: "Calling Agent × Placeholderworks",
      poster: "/videos/calling-agent-x-placeholderworks.webp",
    },
  },
];
