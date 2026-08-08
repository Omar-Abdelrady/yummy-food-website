import type { Category } from "./types";

/**
 * Categories are organised by *format* — sachet, cup, dried — rather than by
 * flavour. Format is what determines the production line, the machinery and the
 * carton logistics, so it is the axis a wholesale buyer actually thinks along.
 */
export const categories: Category[] = [
  {
    slug: "instant-noodles",
    title: "Instant Noodles",
    shortTitle: "Instant",
    excerpt: "Flow-wrapped sachets in the Classic Range, three flavours.",
    description:
      "Our highest-volume format. Flow-wrapped sachets with a separate seasoning pouch, printed in four languages and cartoned for distribution. Produced on a dedicated line at 600,000 units per day.",
    image: "/products/spicy-beef-noodles.png",
    order: 1,
  },
  {
    slug: "cup-noodles",
    title: "Cup Noodles",
    shortTitle: "Cup",
    excerpt: "Sealed paper cups, ready in three minutes with hot water.",
    description:
      "Single-serve paper cups with a sealed foil lid, seasoning sachet and fork insert. Designed for convenience retail, food service and travel channels where no bowl is available.",
    image: "/products/braised-beef-noodles-cup.png",
    order: 2,
  },
  {
    slug: "dried-noodles",
    title: "Dried Noodles",
    shortTitle: "Dried",
    excerpt: "Handmade-style WenZhou and egg noodles, 500 g retail packs.",
    description:
      "Air-dried, handmade-style noodles in the WenZhou tradition — no frying, no seasoning, no additives beyond flour, water and salt. Sold in 500 g retail packs to home cooks and food service.",
    image: "/products/wenzhou-noodles-yellow.png",
    order: 3,
  },
];
