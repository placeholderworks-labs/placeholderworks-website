import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { SECTIONS } from "@/lib/sections";
import { scrollToId } from "@/hooks/useLenis";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

const LINKS = SECTIONS.filter((s) => s.nav);

/**
 * Minimal floating nav (CLAUDE.md §7). Transparent over the hero, condenses to
 * a glass bar on scroll. Anchors scroll smoothly via Lenis but keep real hrefs
 * so they work without JS. Full-screen menu on mobile.
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
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line/70 bg-bg-0/70 py-3 backdrop-blur-xl"
          : "border-b border-transparent py-5"
      )}
    >
      <div className="relative z-50 mx-auto flex max-w-6xl items-center justify-between px-6 md:px-10 lg:px-16">
        <a
          href="#opening"
          onClick={go("opening")}
          className="text-[0.95rem] font-semibold tracking-tight text-fg"
        >
          Placeholder<span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {LINKS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={go(s.id)}
              className="text-sm text-fg-2 transition-colors duration-200 hover:text-fg"
            >
              {s.label}
            </a>
          ))}
          <Button variant="primary" href="#contact" onClick={go("contact")}>
            Start a conversation
          </Button>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center text-fg md:hidden"
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
            className="fixed inset-0 top-0 z-40 flex flex-col justify-center gap-2 bg-bg-0/95 px-8 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {LINKS.map((s, i) => (
              <motion.a
                key={s.id}
                href={`#${s.id}`}
                onClick={go(s.id)}
                className="flex items-baseline gap-4 border-b border-line/60 py-5 text-3xl font-medium text-fg"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
              >
                <span className="eyebrow text-fg-3">{s.index}</span>
                {s.label}
              </motion.a>
            ))}
            <div className="mt-8">
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
