import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/sections/Footer";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import type { RouteMeta } from "@/lib/routes";

interface PageLayoutProps {
  route: RouteMeta;
  noindex?: boolean;
  children?: ReactNode;
}

/**
 * The shell every page below the home page shares: nav, an editorial header
 * band, the page body, footer.
 *
 * The header band is `bg-ink` because the nav's unscrolled state is white type
 * on a transparent ground — designed to sit over the hero's dark band. Give a
 * sub-page a white ground at scroll-zero and the nav vanishes into it. Keeping
 * one dark band at the top of every page preserves both the nav's contrast and
 * the rule in §4 that the dark band is where the identity lives.
 */
export function PageLayout({ route, noindex, children }: PageLayoutProps) {
  useDocumentMeta({
    title: route.title,
    description: route.description,
    path: route.path,
    noindex,
  });

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-fg focus:px-4 focus:py-2 focus:text-bg-0"
      >
        Skip to content
      </a>

      <Nav />

      <header className="on-ink">
        <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-36 md:px-10 md:pb-24 md:pt-44 lg:px-16">
          <p className="eyebrow mb-8 text-white/50">{route.eyebrow}</p>
          <h1 className="max-w-[16ch] text-display text-white">
            {route.heading}
          </h1>
          <p className="measure mt-8 text-body text-white/70">{route.lede}</p>
        </div>
      </header>

      <main id="content">{children}</main>

      <Footer />
    </MotionConfig>
  );
}
