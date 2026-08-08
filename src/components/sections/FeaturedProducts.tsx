import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { getFeaturedProducts } from "@/content";

/**
 * Proof by artefact.
 *
 * Three hero SKUs — one per format — prove the range is real without dumping
 * the catalogue onto the homepage. The card is the site's most-repeated
 * component, so the quality of this row sets the perceived production value of
 * everything that follows it.
 */
export function FeaturedProducts() {
  const products = getFeaturedProducts(3);

  return (
    <section className="relative bg-beige py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Selected range"
          title="Ten products. Three formats. One production record."
          highlight={["One", "production", "record."]}
          lede="Instant sachets, sealed cups and air-dried handmade noodles — every one of them batch-coded and printed in four languages."
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

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {products.map((product, i) => (
            <StaggerItem key={product.slug} className="h-full">
              <ProductCard product={product} priority={i === 0} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
