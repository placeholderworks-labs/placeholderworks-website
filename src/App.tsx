import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/sections/Hero";
import { Thesis } from "@/sections/Thesis";
import { Process } from "@/sections/Process";
import { Capabilities } from "@/sections/Capabilities";
import { Work } from "@/sections/Work";
import { Faq } from "@/sections/Faq";
import { Invitation } from "@/sections/Invitation";
import { Wordmark } from "@/components/Wordmark";
import { Footer } from "@/sections/Footer";
import { usePath } from "@/lib/router";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { Services } from "@/pages/Services";
import { Portfolio } from "@/pages/Portfolio";
import { Privacy } from "@/pages/Privacy";
import { Terms } from "@/pages/Terms";
import { NotFound } from "@/pages/NotFound";

const PAGES: Record<string, () => React.ReactElement> = {
  "/services": Services,
  "/portfolio": Portfolio,
  "/privacy": Privacy,
  "/terms": Terms,
};

function Home() {
  useDocumentMeta({
    title: "Applied AI engineering & implementation",
    description:
      "Placeholderworks builds and deploys AI systems that solve real business problems, from idea to production.",
    path: "/",
  });

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#thesis"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-fg focus:px-4 focus:py-2 focus:text-bg-0"
      >
        Skip to content
      </a>

      <Nav />

      <main>
        <Hero />
        <Thesis />
        <Process />
        <Capabilities />
        <Work />
        <Faq />
        <Invitation />
      </main>

      <Wordmark />
      <Footer />
    </MotionConfig>
  );
}

export default function App() {
  const path = usePath();

  /**
   * Scroll behaviour on navigation. A new page starts at the top; a link
   * carrying a hash (`/#process` from a sub-page) lands on that section once
   * it has rendered. Instant, not smooth — a smooth scroll across a whole
   * document after a page change reads as a glitch, not as motion.
   */
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) {
      window.scrollTo(0, 0);
      return;
    }
    // One frame, so the incoming page is in the DOM before we look for it.
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [path]);

  if (path === "/") return <Home />;

  const Page = PAGES[path];
  return Page ? <Page /> : <NotFound />;
}
