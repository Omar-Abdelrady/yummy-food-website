/**
 * Content model.
 *
 * Every field name here is deliberately CMS-shaped (`slug`, `title`, `excerpt`,
 * `order`, `featured`, `seo`) so that swapping the local data modules for a
 * headless CMS is a change to `src/content/index.ts` only — the repository
 * functions become `async`, and no component prop signature changes.
 */

export type CategorySlug = "instant-noodles" | "cup-noodles" | "dried-noodles";

export interface Seo {
  title?: string;
  description?: string;
}

export interface NutritionFacts {
  /** Per 100 g, as printed on the pack. */
  energy?: string;
  protein?: string;
  fat?: string;
  carbohydrates?: string;
  sodiumChloride?: string;
}

export interface ProductSpecs {
  netWeight: string;
  shelfLife: string;
  packaging: string;
  cartonQuantity: string;
  flavour: string;
  storage: string;
  origin: string;
  ingredients?: string;
  nutrition?: NutritionFacts;
  barcode?: string;
}

export interface Product {
  slug: string;
  name: string;
  /** Name as printed on pack in Chinese — heritage/authenticity signal. */
  nameZh?: string;
  /** Name as printed on pack in Arabic — domestic + regional market signal. */
  nameAr?: string;
  category: CategorySlug;
  /** Short label above the product name, e.g. "Classic Range". */
  tier?: string;
  tagline: string;
  /** One-line description used on cards. */
  excerpt: string;
  /** Long-form body, one string per paragraph. */
  description: string[];
  image: string;
  gallery: string[];
  features: string[];
  specs: ProductSpecs;
  /** Slugs of related products; falls back to same-category siblings. */
  related?: string[];
  featured?: boolean;
  order: number;
  seo?: Seo;
}

export interface Category {
  slug: CategorySlug;
  title: string;
  shortTitle: string;
  excerpt: string;
  description: string;
  image: string;
  order: number;
}

export interface ProcessStep {
  step: string;
  title: string;
  body: string;
}

export interface Benefit {
  title: string;
  body: string;
}

export interface Service {
  slug: string;
  title: string;
  /** Lucide icon name, resolved through a whitelist map at render time. */
  icon: string;
  tagline: string;
  excerpt: string;
  heroHeadline: string;
  heroSubline: string;
  description: string[];
  capabilities: string[];
  process: ProcessStep[];
  benefits: Benefit[];
  featured?: boolean;
  order: number;
  seo?: Seo;
}

export interface Stat {
  value: number;
  /** Rendered before the number, e.g. "+". */
  prefix?: string;
  /** Rendered after the number, e.g. "%" or "K". */
  suffix?: string;
  label: string;
  detail: string;
}

export interface Certification {
  name: string;
  abbreviation: string;
  body: string;
  /**
   * `true` when the claim is evidenced by the supplied packaging
   * (Halal seal, GS1 barcode, EOS registration number).
   * Aspirational entries are marked `false` so the client can confirm
   * or remove them before launch, rather than shipping a false claim.
   */
  verified: boolean;
}

export interface Value {
  title: string;
  body: string;
  icon: string;
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  bio: string;
}

export interface Company {
  legalName: string;
  tradeName: string;
  subBrand: string;
  subBrandMeaning: string;
  tagline: string;
  founded: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    country: string;
    full: string;
    mapQuery: string;
  };
  phones: string[];
  emails: { label: string; value: string }[];
  hours: { days: string; time: string }[];
  social: { label: string; href: string; icon: string }[];
  registration: { label: string; value: string }[];
}
