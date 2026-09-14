import { MotionConfig } from "motion/react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/sections/Hero";
import { Thesis } from "@/sections/Thesis";
import { Process } from "@/sections/Process";
import { Capabilities } from "@/sections/Capabilities";
import { Work } from "@/sections/Work";
import { Invitation } from "@/sections/Invitation";
import { Footer } from "@/sections/Footer";

export default function App() {
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
        <Invitation />
      </main>

      <Footer />
    </MotionConfig>
  );
}
