import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { SECTIONS } from "@/lib/sections";
import { scrollToId } from "@/lib/utils";
import { fade } from "@/lib/motion";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

const LINKS = SECTIONS.filter((s) => s.nav);

/**
 * Minimal nav (CLAUDE.md §7). Mono links in hairline cells, sitting over the
 * hero's dark band; on scroll it inverts to solid white with a bottom rule.
 * Anchors keep real hrefs so they work without JS.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        scrolled
          ? "border-b border-line bg-bg-0 py-3"
          : "border-b border-transparent py-5"
      )}
    >
      <div className="relative z-50 mx-auto flex max-w-6xl items-center justify-between px-6 md:px-10 lg:px-16">
        {/* The identity lives in the hero band below, so this slot carries a
            Home control instead of a second wordmark. Accent fill: white on
            crimson is 5.2:1, so it holds AA over the band and over white.
            Hover inverts against whichever ground is behind it. */}
        <a
          href="#opening"
          onClick={go("opening")}
          className={cn(
            "mono-ui border border-accent bg-accent px-4 py-3 text-accent-fg transition-colors",
            scrolled
              ? "hover:border-fg hover:bg-fg"
              : "hover:border-white hover:bg-white hover:text-fg"
          )}
        >
          Home
        </a>

        <nav className="hidden items-center md:flex" aria-label="Primary">
          <ul className="flex items-center">
            {LINKS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={go(s.id)}
                  className={cn(
                    "mono-ui -mr-px block border px-4 py-3 transition-colors",
                    scrolled
                      ? "border-line text-fg-2 hover:bg-fg hover:text-bg-0"
                      : "border-white/25 text-white/70 hover:bg-white hover:text-fg"
                  )}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          {/* White cell. Over the band the white fill is the contrast; once the
              nav turns white it would disappear, so there it keeps the hairline
              the other links use and reads as the last cell in the row. */}
          <a
            href="#contact"
            onClick={go("contact")}
            className={cn(
              "mono-ui ml-6 inline-flex items-center gap-2 border px-4 py-3 transition-colors",
              scrolled
                ? "border-line bg-bg-0 text-fg hover:border-fg hover:bg-fg hover:text-bg-0"
                : "border-white bg-white text-fg hover:bg-transparent hover:text-white"
            )}
          >
            Contact
            <ArrowUpRight size={14} aria-hidden />
          </a>
        </nav>

        <button
          type="button"
          className={cn(
            "flex h-11 w-11 items-center justify-center transition-colors md:hidden",
            scrolled || open ? "text-fg" : "text-white"
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 top-0 z-40 flex flex-col justify-center gap-0 bg-bg-0 px-6 md:hidden"
            variants={fade}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {LINKS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={go(s.id)}
                className="flex items-baseline gap-5 border-b border-line py-6 text-3xl font-semibold tracking-tight text-fg"
              >
                <span className="eyebrow text-accent">{s.index}</span>
                {s.label}
              </a>
            ))}
            <div className="mt-10">
              <Button variant="primary" href="#contact" onClick={go("contact")}>
                Start a conversation
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
