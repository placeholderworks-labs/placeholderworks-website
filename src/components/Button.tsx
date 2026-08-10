import { useRef, type MouseEventHandler, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn, clamp } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Variant = "primary" | "secondary" | "tertiary";

interface ButtonProps {
  variant?: Variant;
  /** Renders an anchor when set, otherwise a native button. */
  href?: string;
  type?: "button" | "submit" | "reset";
  magnetic?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler;
  target?: string;
  rel?: string;
  "aria-label"?: string;
  children: ReactNode;
}

const BASE =
  "group inline-flex items-center justify-center gap-2 min-h-11 text-[0.95rem] font-medium leading-none select-none transition-colors duration-200 will-change-transform disabled:opacity-40 disabled:pointer-events-none";

function variantClasses(variant: Variant): string {
  switch (variant) {
    case "primary":
      // The single comfortable pill — an intentional Apple signal, used only
      // for the primary action (not "pills everywhere"). Crimson→violet gradient
      // fill; a soft text-shadow keeps the near-white label legible over the
      // lighter crimson end.
      return "rounded-full accent-gradient text-accent-fg px-6 py-3 [text-shadow:0_1px_6px_rgba(8,9,10,0.35)] hover:[filter:brightness(1.08)]";
    case "secondary":
      return "rounded-md bg-bg-1 text-fg border border-line px-5 py-3 hover:bg-bg-2 hover:border-fg-3/50";
    case "tertiary":
      return "relative text-fg-2 hover:text-fg px-1 py-2 after:absolute after:left-1 after:right-1 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100";
  }
}

/**
 * CTA with a coherent hierarchy (CLAUDE.md §7). The primary is magnetic on
 * fine-pointer devices and gets a subtle physical scale on hover/press; all of
 * it is disabled under reduced motion.
 */
export function Button({
  variant = "secondary",
  href,
  type = "button",
  magnetic,
  disabled,
  className,
  onClick,
  target,
  rel,
  children,
  ...aria
}: ButtonProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });

  const enableMagnetic =
    (magnetic ?? variant === "primary") &&
    !reduced &&
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches;

  const handleMove: MouseEventHandler = (e) => {
    if (!enableMagnetic || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(clamp((e.clientX - (r.left + r.width / 2)) * 0.35, -6, 6));
    my.set(clamp((e.clientY - (r.top + r.height / 2)) * 0.35, -6, 6));
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const physical = variant !== "tertiary" && !reduced;
  const shared = {
    className: cn(BASE, variantClasses(variant), className),
    style: enableMagnetic ? { x, y } : undefined,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    whileHover: physical ? { scale: 1.02 } : undefined,
    whileTap: physical ? { scale: 0.98 } : undefined,
    ...aria,
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        {...shared}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...shared}
    >
      {children}
    </motion.button>
  );
}
