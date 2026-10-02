import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { navigate } from "@/lib/router";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/**
 * An anchor that routes in-app for same-origin paths and otherwise gets out of
 * the way — external links, `mailto:`, and any click carrying a modifier key
 * or a non-primary button fall through to the browser.
 */
export function Link({ href, onClick, ...rest }: LinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    if (rest.target === "_blank" || !href.startsWith("/")) return;

    e.preventDefault();
    navigate(href);
  };

  return <a href={href} onClick={handleClick} {...rest} />;
}
