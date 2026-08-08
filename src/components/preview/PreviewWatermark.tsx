/**
 * Repeating "DESIGN PREVIEW" watermark.
 *
 * A server component with no state, no effects and no client JS — the markup is
 * identical on server and client, so it cannot cause a hydration mismatch.
 *
 * The tile is an inline SVG data URI rather than an image file or a grid of DOM
 * nodes: it introduces no dependency, no network request, and a single painted
 * layer instead of hundreds of elements, so it costs nothing at scroll time.
 *
 * The site alternates white, beige and ink sections, so a blend mode is not
 * usable here: `mix-blend-overlay` cancels itself out against light grounds and
 * the mark disappears. Instead two offset tiles are stacked — a dark mark and a
 * light one — each at a very low alpha. On a light section the dark tile is the
 * one you perceive; on ink it is the light tile. The result reads as the same
 * faint watermark everywhere without ever becoming legible enough to interfere.
 */

/** Rotated text tile. 300×300 with -30° rotation gives a clean diagonal repeat. */
const tile = (fill: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
    <text x="150" y="150"
      fill="${fill}"
      font-family="Inter Tight, Inter, system-ui, sans-serif"
      font-size="19"
      font-weight="600"
      letter-spacing="5"
      text-anchor="middle"
      transform="rotate(-30 150 150)">DESIGN PREVIEW</text>
  </svg>`,
  )}`;

const DARK_TILE = tile("#0b0b0c");
const LIGHT_TILE = tile("#ffffff");

export function PreviewWatermark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-80 print:hidden"
    >
      {/* Reads on the white and beige sections. */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: `url("${DARK_TILE}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
        }}
      />
      {/* Reads on the ink and charcoal sections. Offset by half a tile so the
          two never stack on the same glyphs and muddy each other. */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: `url("${LIGHT_TILE}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
          backgroundPosition: "150px 150px",
        }}
      />
    </div>
  );
}
