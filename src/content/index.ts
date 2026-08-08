/**
 * Content repository — the CMS seam.
 *
 * Pages and sections import only from this module, never from the raw data
 * files. To move to a headless CMS, change the bodies of these functions to
 * fetch and make them `async`; every call site already treats the result as
 * opaque data, so no component prop signature changes.
 */

import { categories } from "./categories";
import { products } from "./products";
import { services } from "./services";
import type { Category, CategorySlug, Product, Service } from "./types";

export * from "./types";
export {
  capacityFacts,
  certifications,
  company,
  factoryHighlights,
  mission,
  qualityStandards,
  stats,
  storyParagraphs,
  team,
  values,
  vision,
} from "./company";

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

/* ---------------------------------- Products --------------------------------- */

export function getProducts(): Product[] {
  return [...products].sort(byOrder);
}

export function getFeaturedProducts(limit = 3): Product[] {
  return getProducts()
    .filter((p) => p.featured)
    .slice(0, limit);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return getProducts().filter((p) => p.category === category);
}

/**
 * Explicit `related` slugs win. Any that no longer resolve are dropped rather
 * than rendered as a broken card, and same-category siblings backfill the gap —
 * so the section is never short after a catalogue edit.
 */
export function getRelatedProducts(slug: string, limit = 3): Product[] {
  const product = getProductBySlug(slug);
  if (!product) return [];

  const explicit = (product.related ?? [])
    .map(getProductBySlug)
    .filter((p): p is Product => p !== undefined && p.slug !== slug);

  if (explicit.length >= limit) return explicit.slice(0, limit);

  const seen = new Set([slug, ...explicit.map((p) => p.slug)]);
  const siblings = getProductsByCategory(product.category).filter(
    (p) => !seen.has(p.slug),
  );
  const others = getProducts().filter(
    (p) => !seen.has(p.slug) && p.category !== product.category,
  );

  return [...explicit, ...siblings, ...others].slice(0, limit);
}

export function getProductSlugs(): string[] {
  return products.map((p) => p.slug);
}

/* --------------------------------- Categories -------------------------------- */

export function getCategories(): Category[] {
  return [...categories].sort(byOrder);
}

export function getCategoriesWithCounts(): (Category & { count: number })[] {
  return getCategories().map((c) => ({
    ...c,
    count: products.filter((p) => p.category === c.slug).length,
  }));
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryTitle(slug: CategorySlug): string {
  return getCategoryBySlug(slug)?.title ?? slug;
}

/* ---------------------------------- Services --------------------------------- */

export function getServices(): Service[] {
  return [...services].sort(byOrder);
}

export function getFeaturedServices(limit = 3): Service[] {
  return getServices()
    .filter((s) => s.featured)
    .slice(0, limit);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}

/* --------------------------------- Enquiries --------------------------------- */

/**
 * Options for the contact form's enquiry-type select. Derived from services so
 * a new service automatically becomes a routable enquiry type — one less place
 * to forget to update.
 */
export function getEnquiryTypes(): { value: string; label: string }[] {
  return [
    { value: "product", label: "Product enquiry" },
    ...getServices().map((s) => ({ value: s.slug, label: s.title })),
    { value: "distribution-partner", label: "Becoming a distributor" },
    { value: "other", label: "Something else" },
  ];
}
