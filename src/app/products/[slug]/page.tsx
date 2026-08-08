import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Package } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductGallery } from "@/components/products/ProductGallery";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TextReveal } from "@/components/motion/TextReveal";
import { CTA } from "@/components/sections/CTA";
import {
  company,
  getCategoryTitle,
  getProductBySlug,
  getProductSlugs,
  getRelatedProducts,
} from "@/content";
import { contactLink, site } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Prerenders every product at build time — no runtime data fetching. */
export function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const title = product.seo?.title ?? product.name;
  const description = product.seo?.description ?? product.excerpt;

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${title} — ${company.tradeName}`,
      description,
      url: `${site.url}/products/${product.slug}`,
      images: [{ url: product.image, alt: `${product.name} packaging` }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.slug, 3);
  const categoryTitle = getCategoryTitle(product.category);

  /**
   * Product structured data.
   *
   * Deliberately omits `offers`: this is a specification catalogue, not a
   * storefront, and advertising an offer without a price is both untrue and a
   * rich-result violation.
   */
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.excerpt,
    image: `${site.url}${product.image}`,
    category: categoryTitle,
    brand: { "@type": "Brand", name: company.tradeName },
    manufacturer: {
      "@type": "Organization",
      name: company.legalName,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${company.address.line1}, ${company.address.line2}`,
        addressLocality: company.address.city,
        addressCountry: "EG",
      },
    },
    weight: product.specs.netWeight,
    countryOfOrigin: "EG",
  };

  const keySpecs = [
    { label: "Net weight", value: product.specs.netWeight },
    { label: "Shelf life", value: product.specs.shelfLife },
    { label: "Carton", value: product.specs.cartonQuantity },
  ];

  const fullSpecs = [
    { label: "Net weight", value: product.specs.netWeight },
    { label: "Flavour", value: product.specs.flavour },
    { label: "Shelf life", value: product.specs.shelfLife },
    { label: "Packaging", value: product.specs.packaging },
    { label: "Carton quantity", value: product.specs.cartonQuantity },
    { label: "Storage", value: product.specs.storage },
    { label: "Origin", value: product.specs.origin },
    ...(product.specs.barcode
      ? [{ label: "Barcode", value: product.specs.barcode }]
      : []),
  ];

  const nutrition = product.specs.nutrition;

  return (
    <>
      {/* ---------------------------------------------------------------
          Overview — image left, decision-critical facts right
          --------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-beige pb-20 pt-[calc(var(--header-h)+2.5rem)] lg:pb-28 lg:pt-[calc(var(--header-h)+4rem)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_55%_at_80%_0%,rgba(232,199,102,0.3),transparent_62%)]"
        />

        <Container className="relative">
          {/* Breadcrumb */}
          <Reveal direction="none" duration={0.5}>
            <nav aria-label="Breadcrumb" className="mb-10">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-warm-500">
                <li>
                  <Link
                    href="/"
                    className="transition-colors duration-300 hover:text-gold-700"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-warm-300">
                  /
                </li>
                <li>
                  <Link
                    href={`/products?category=${product.category}`}
                    className="transition-colors duration-300 hover:text-gold-700"
                  >
                    {categoryTitle}
                  </Link>
                </li>
                <li aria-hidden="true" className="text-warm-300">
                  /
                </li>
                <li aria-current="page" className="text-ink">
                  {product.name}
                </li>
              </ol>
            </nav>
          </Reveal>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <ProductGallery
                images={[product.image, ...product.gallery]}
                name={product.name}
              />
            </div>

            <div className="lg:col-span-6">
              <Reveal direction="none" duration={0.5}>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{categoryTitle}</Badge>
                  {product.tier ? (
                    <Badge tone="gold">{product.tier}</Badge>
                  ) : null}
                </div>
              </Reveal>

              <TextReveal
                as="h1"
                text={product.name}
                className="mt-6 text-d2 font-semibold text-ink"
              />

              {/* On-pack names, in their own scripts. */}
              <Reveal delay={0.1}>
                <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg text-warm-400">
                  {product.nameZh ? (
                    <span lang="zh">{product.nameZh}</span>
                  ) : null}
                  {product.nameZh && product.nameAr ? (
                    <span aria-hidden="true" className="text-warm-300">
                      ·
                    </span>
                  ) : null}
                  {product.nameAr ? (
                    <span lang="ar" dir="rtl">
                      {product.nameAr}
                    </span>
                  ) : null}
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-7 text-lede font-medium text-ink">
                  {product.tagline}
                </p>
              </Reveal>

              <div className="mt-6 flex flex-col gap-5">
                {product.description.map((paragraph, i) => (
                  <Reveal key={i} delay={0.2 + i * 0.06}>
                    <p className="leading-relaxed text-warm-500">{paragraph}</p>
                  </Reveal>
                ))}
              </div>

              {/* The three facts every enquiry email opens with, answered up
                  front. This is the substitution for price and Add to Cart. */}
              <Reveal delay={0.3}>
                <dl className="mt-10 grid gap-px overflow-hidden rounded-xl3 border border-ink/8 bg-ink/8 sm:grid-cols-3">
                  {keySpecs.map((spec) => (
                    <div key={spec.label} className="bg-white p-5 lg:p-6">
                      <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-warm-400">
                        {spec.label}
                      </dt>
                      <dd className="mt-2.5 font-display text-base font-semibold leading-snug text-ink">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={0.36}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button
                    href={contactLink("product", product.slug)}
                    size="lg"
                    icon={
                      <ArrowRight className="size-[1.05rem]" strokeWidth={1.8} />
                    }
                  >
                    Enquire about this product
                  </Button>
                  <Button href="/products" variant="secondary" size="lg">
                    Back to range
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          Specifications & features
          --------------------------------------------------------------- */}
      <section className="bg-white py-24 lg:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Specs table */}
            <div className="lg:col-span-7">
              <Eyebrow>Specifications</Eyebrow>
              <h2 className="mt-6 text-d3 font-semibold text-ink">
                The full sheet.
              </h2>

              <dl className="mt-10 divide-y divide-ink/8 border-y border-ink/8">
                {fullSpecs.map((spec) => (
                  <div
                    key={spec.label}
                    className="grid gap-1 py-4 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-6 sm:py-5"
                  >
                    <dt className="text-sm font-medium text-warm-400">
                      {spec.label}
                    </dt>
                    <dd className="text-[0.9375rem] text-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              {product.specs.ingredients ? (
                <div className="mt-10">
                  <h3 className="font-display text-base font-semibold text-ink">
                    Ingredients
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-warm-500">
                    {product.specs.ingredients}
                  </p>
                </div>
              ) : null}

              {nutrition ? (
                <div className="mt-10">
                  <h3 className="font-display text-base font-semibold text-ink">
                    Nutrition
                    <span className="ml-2 text-sm font-normal text-warm-400">
                      per 100 g, as declared on pack
                    </span>
                  </h3>
                  <dl className="mt-5 grid gap-px overflow-hidden rounded-xl2 border border-ink/8 bg-ink/8 sm:grid-cols-3">
                    {[
                      { label: "Energy", value: nutrition.energy },
                      { label: "Protein", value: nutrition.protein },
                      { label: "Carbohydrates", value: nutrition.carbohydrates },
                      { label: "Fat", value: nutrition.fat },
                      {
                        label: "Sodium chloride",
                        value: nutrition.sodiumChloride,
                      },
                    ]
                      .filter((n) => n.value)
                      .map((n) => (
                        <div key={n.label} className="bg-beige/50 p-5">
                          <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-warm-400">
                            {n.label}
                          </dt>
                          <dd className="mt-2 font-display text-lg font-semibold text-ink">
                            {n.value}
                          </dd>
                        </div>
                      ))}
                  </dl>
                </div>
              ) : null}
            </div>

            {/* Features + packaging */}
            <div className="lg:col-span-5">
              <Eyebrow>Features</Eyebrow>
              <h2 className="mt-6 text-d3 font-semibold text-ink">
                What it gives you.
              </h2>

              <Stagger as="ul" className="mt-10 flex flex-col gap-4">
                {product.features.map((feature) => (
                  <StaggerItem as="li" key={feature}>
                    <span className="flex gap-3.5">
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-gold-500/12 text-gold-700">
                        <Check
                          className="size-3"
                          strokeWidth={2.6}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="text-[0.9375rem] leading-relaxed text-warm-500">
                        {feature}
                      </span>
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>

              {/* Packaging — the section that most makes the company read as
                  export-ready rather than merely brochure-ready. */}
              <div className="mt-12 rounded-xl3 border border-ink/8 bg-beige/60 p-7 lg:p-8">
                <span className="inline-flex size-11 items-center justify-center rounded-full border border-gold-400/30 bg-white text-gold-700">
                  <Package
                    className="size-[1.15rem]"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </span>
                <h3 className="mt-6 font-display text-lg font-semibold text-ink">
                  Packaging &amp; loading
                </h3>
                <dl className="mt-5 flex flex-col gap-4">
                  {[
                    { label: "Primary", value: product.specs.packaging },
                    { label: "Carton", value: product.specs.cartonQuantity },
                    {
                      label: "Pallet",
                      value:
                        "Configuration confirmed per order and destination",
                    },
                    {
                      label: "Loading",
                      value:
                        "Counted against the packing list and sealed on site, with photographs issued",
                    },
                  ].map((item) => (
                    <div key={item.label}>
                      <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-warm-400">
                        {item.label}
                      </dt>
                      <dd className="mt-1 text-[0.9375rem] leading-relaxed text-ink">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          Related — cross-sell without commerce
          --------------------------------------------------------------- */}
      {related.length ? (
        <section className="bg-beige py-24 lg:py-32">
          <Container>
            <SectionHeading
              eyebrow="Related"
              title="Others in the range."
              action={
                <Button
                  href="/products"
                  variant="secondary"
                  icon={<ArrowRight className="size-4" strokeWidth={1.8} />}
                >
                  All products
                </Button>
              }
            />

            <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {related.map((item) => (
                <StaggerItem key={item.slug} className="h-full">
                  <ProductCard product={item} />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>
      ) : null}

      <CTA
        eyebrow="Product enquiry"
        title="Request a sample or a spec sheet."
        highlight={["sample", "spec", "sheet."]}
        lede={`Tell us the market and the volume you are planning for ${product.name}, and we will come back with specifications, carton configurations and certificates.`}
        primaryLabel="Enquire now"
        primaryHref={contactLink("product", product.slug)}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
