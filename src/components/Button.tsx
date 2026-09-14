import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "tertiary";

interface ButtonProps {
  variant?: Variant;
  /** Renders an anchor when set, otherwise a native button. */
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler;
  target?: string;
  rel?: string;
  "aria-label"?: string;
  children: ReactNode;
}

const BASE =
  "mono-ui group inline-flex items-center justify-center gap-3 min-h-11 select-none " +
  "transition-colors duration-150 disabled:opacity-40 disabled:pointer-events-none";

function variantClasses(variant: Variant): string {
  switch (variant) {
    // The one solid fill on the page. Flat crimson — white on it is 5.2:1,
    // so the label needs no text-shadow to stay legible (the old gradient did).
    case "primary":
      return "bg-accent text-accent-fg px-7 py-4 hover:bg-fg";

    // Hairline rectangle — inverts to a solid fill on hover.
    case "secondary":
      return "border border-line text-fg px-7 py-4 hover:bg-fg hover:text-bg-0 hover:border-fg";

    // Underlined mono link — the quietest step in the hierarchy.
    case "tertiary":
      return "text-fg-2 hover:text-fg border-b border-line hover:border-fg pb-1";
  }
}

/**
 * CTA with a coherent hierarchy (CLAUDE.md §7): one solid fill, one hairline
 * rectangle, one underlined link. Sharp corners, mono uppercase label. No
 * transform animation — only a colour transition on hover, which is feedback
 * rather than decoration.
 */
export function Button({
  variant = "secondary",
  href,
  type = "button",
  disabled,
  className,
  onClick,
  target,
  rel,
  children,
  ...aria
}: ButtonProps) {
  const classes = cn(BASE, variantClasses(variant), className);

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={classes}
        {...aria}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      {...aria}
    >
      {children}
    </button>
  );
}
