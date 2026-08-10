import { scrollToId } from "@/hooks/useLenis";
import { SECTIONS } from "@/lib/sections";

const NAV = SECTIONS.filter((s) => s.nav);
const SOCIAL = ["LinkedIn", "GitHub", "X"];
const YEAR = 2026; // build-time constant; update on release

/** Minimal footer (CLAUDE.md §7, §18): contact, essential nav, social, legal. */
export function Footer() {
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-20 lg:px-16">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
          <div>
            <a
              href="#opening"
              onClick={go("opening")}
              className="text-2xl font-semibold tracking-tight text-fg"
            >
              Placeholder<span className="text-accent">.</span>
            </a>
            <p className="measure mt-4 text-body text-fg-2">
              We build and deploy AI systems that do real work.
            </p>
            <a
              href="mailto:[PLACEHOLDER@EMAIL]"
              className="mt-6 inline-block font-mono text-sm text-fg-2 underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              [PLACEHOLDER@EMAIL]
            </a>
          </div>

          <div className="flex gap-16">
            <nav aria-label="Footer">
              <p className="eyebrow mb-4 text-fg-3">Explore</p>
              <ul className="flex flex-col gap-3">
                {NAV.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={go(s.id)}
                      className="text-sm text-fg-2 transition-colors hover:text-fg"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="eyebrow mb-4 text-fg-3">Elsewhere</p>
              <ul className="flex flex-col gap-3">
                {SOCIAL.map((s) => (
                  <li key={s}>
                    <a
                      href="[PLACEHOLDER_URL]"
                      className="text-sm text-fg-2 transition-colors hover:text-fg"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 font-mono text-xs text-fg-3 sm:flex-row sm:items-center sm:justify-between">
          <span>© {YEAR} Placeholder. All rights reserved.</span>
          <span className="flex gap-6">
            <a href="[PLACEHOLDER_URL]" className="transition-colors hover:text-fg-2">
              Privacy
            </a>
            <a href="[PLACEHOLDER_URL]" className="transition-colors hover:text-fg-2">
              Terms
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
