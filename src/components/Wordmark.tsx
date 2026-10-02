/**
 * The closing wordmark: the brand set edge to edge, immediately above the
 * footer, as the last thing the page says.
 *
 * It is SVG rather than CSS type because the brief is that it *fills*
 * horizontally: `textLength` pinned to the viewBox width makes the line span
 * the box exactly at every breakpoint, and `lengthAdjust="spacing"` absorbs
 * the difference in the tracking rather than stretching the glyphs — so it
 * still fills correctly while Geist Mono is loading and the fallback is on
 * screen. The box scales with its container, so there is no breakpoint guess.
 *
 * aria-hidden: the footer names us in text directly below, and the mark is
 * the same word again at size — a screen reader should hear it once.
 */
export function Wordmark() {
  return (
    <div className="border-t border-line bg-bg-0 px-6 pb-10 pt-12 md:px-10 md:pb-14 md:pt-16 lg:px-16">
      <svg
        viewBox="0 24 1300 160"
        className="block w-full font-mono"
        aria-hidden="true"
        focusable="false"
      >
        <text
          x="0"
          y="160"
          textLength="1300"
          lengthAdjust="spacing"
          fontSize="166"
          fontWeight="600"
          className="fill-fg"
        >
          {/* Brackets drop to tertiary so the name carries the weight — at
              this size grey is a hierarchy, not a contrast problem. */}
          <tspan className="fill-fg-3">&lt;</tspan>
          PLACEHOLDER
          <tspan className="fill-fg-3">&gt;</tspan>
        </text>
      </svg>
    </div>
  );
}
