import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has to be told about our custom type scale.
 *
 * Without this it classifies `text-d2` as a *colour* utility (the `text-*`
 * group), so a later `text-ink` in the same `cn()` call silently removes it and
 * the heading renders at body size. Registering the display sizes under
 * `font-size` keeps them in the size group, where `text-ink` cannot collide
 * with them.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["d1", "d2", "d3", "d4", "lede"] },
      ],
      // Same reasoning for the custom radii.
      rounded: [{ rounded: ["xl2", "xl3", "xl4"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared easing for the whole site. One curve keeps motion feeling authored. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Prefixes a `/public` asset path with the deployment base path.
 *
 * `next/image` applies `basePath` to its own generated URLs, but with
 * `images.unoptimized` it emits the raw `src` untouched — so on a sub-path
 * deployment (GitHub Pages) every image 404s unless the prefix is added here.
 * Returns the path unchanged when `NEXT_PUBLIC_BASE_PATH` is empty, so local
 * dev and root-domain hosting are unaffected.
 */
export function asset(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}

export const site = {
  name: "Yummy Food",
  /** Used for canonical URLs, sitemap and OG tags. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yummyfood-eg.com",
  description:
    "Yummy Food manufactures instant, cup and dried noodles in Badr City, Egypt. Halal certified, four-language packaging, export-ready from three independent production lines.",
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Recipes", href: "/recipes" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Builds a Contact deep-link that pre-fills the enquiry form, so a buyer never
 * re-types the product or service they were already looking at.
 */
export function contactLink(subject?: string, reference?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (reference) params.set("ref", reference);
  const query = params.toString();
  return query ? `/contact?${query}` : "/contact";
}
