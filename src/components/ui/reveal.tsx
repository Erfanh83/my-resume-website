import type { CSSProperties, ElementType, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger, in milliseconds. Mapped onto the scroll range in globals.css. */
  delay?: number;
  className?: string;
  as?: ElementType;
}

/**
 * Fades its children in as they scroll into view.
 *
 * A server component on purpose: the effect is a CSS scroll-driven animation
 * (see [data-reveal] in globals.css), so it ships no JavaScript, hydrates
 * nothing, and never hides content while the page is still loading. Browsers
 * without scroll timelines simply show everything.
 */
export function Reveal({ children, delay = 0, className, as }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;

  /* ~100ms of stagger becomes 8% of the entry range, capped so late items in
     a long list still finish revealing before they are fully on screen. */
  const style = delay
    ? ({ "--reveal-offset": `${Math.min(delay * 0.08, 32)}%` } as CSSProperties)
    : undefined;

  return (
    <Tag data-reveal="" style={style} className={className}>
      {children}
    </Tag>
  );
}
