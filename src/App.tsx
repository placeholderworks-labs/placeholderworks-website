import { MotionConfig } from "motion/react";
import { useLenis } from "@/hooks/useLenis";
import { useActiveSection } from "@/hooks/useActiveSection";
import { SECTION_IDS } from "@/lib/sections";
import { Nav } from "@/components/Nav";
import { Spine } from "@/components/Spine";
import { Hero } from "@/sections/Hero";
import { Thesis } from "@/sections/Thesis";
import { Process } from "@/sections/Process";
import { Capabilities } from "@/sections/Capabilities";
import { Work } from "@/sections/Work";
import { Invitation } from "@/sections/Invitation";
import { Footer } from "@/sections/Footer";

export default function App() {
  useLenis();
  const active = useActiveSection(SECTION_IDS);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#thesis"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-bg-2 focus:px-4 focus:py-2 focus:text-fg"
      >
        Skip to content
      </a>

      <Nav />
      <Spine activeId={active} />

      <main>
        <Hero />
        <Thesis />
        <Process />
        <Capabilities />
        <Work />
        <Invitation />
      </main>

      <Footer />

      <div className="grain" />
    </MotionConfig>
  );
}
