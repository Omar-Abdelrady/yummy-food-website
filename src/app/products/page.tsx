import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CTA } from "@/components/sections/CTA";
import { getCategoriesWithCounts, getProducts } from "@/content";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Ten noodle products across three formats — instant sachets, sealed cup noodles and handmade air-dried noodles. Halal certified and packaged in four languages.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  const products = getProducts();
  const categories = getCategoriesWithCounts();

  return (
    <>
      <PageHeader
        eyebrow={`${products.length} products · ${categories.length} categories`}
        title="Our range."
        highlight={["range."]}
        lede="Instant sachets, sealed cups and air-dried handmade noodles — produced on three independent lines in Badr City, and specified the same way for every market."
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      <section className="bg-white pb-24 pt-16 lg:pb-32 lg:pt-20">
        <Container>
          {/* useSearchParams needs a Suspense boundary to keep the page static. */}
          <Suspense
            fallback={<div className="min-h-[60vh]" aria-hidden="true" />}
          >
            <ProductGrid products={products} categories={categories} />
          </Suspense>
        </Container>
      </section>

      <CTA
        eyebrow="Product enquiry"
        title="Need a spec sheet or a sample?"
        highlight={["spec", "sheet", "sample?"]}
        lede="Tell us which products you are evaluating and the market they are for. We will send specifications, carton configurations and certificates."
        primaryLabel="Request a sample"
        primaryHref="/contact?subject=product"
      />
    </>
  );
}
