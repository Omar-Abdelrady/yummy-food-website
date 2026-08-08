import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { getCategoriesWithCounts } from "@/content";
import { asset } from "@/lib/utils";

/**
 * Product categories, organised by format.
 *
 * A wholesale buyer thinks in formats — sachet, cup, dried — because format
 * determines the production line, the machinery and the carton logistics.
 * Categorising this way speaks their language and, as a side effect, signals
 * three production lines rather than one.
 */
export function Categories() {
  const categories = getCategoriesWithCounts();

  return (
    <section className="relative bg-white py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Categories"
          title="Three formats, three independent lines."
          lede="Each format runs on its own line, so a mixed order does not queue behind itself."
        />

        <Stagger className="mt-16 grid gap-6 md:grid-cols-3 lg:mt-20">
          {categories.map((category) => (
            <StaggerItem key={category.slug} className="h-full">
              <Link
                href={`/products?category=${category.slug}`}
                className="group relative flex h-full flex-col justify-end overflow-hidden rounded-xl3 bg-charcoal p-7 transition-all duration-500 ease-brand hover:-translate-y-1.5 hover:shadow-[0_34px_70px_-30px_rgba(11,11,12,0.5)] lg:p-8"
              >
                {/* Media plate. The pack sits behind the copy, dimmed, so the
                    card reads as a doorway rather than as a product tile. */}
                <div className="absolute inset-0">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(90%_70%_at_70%_18%,rgba(201,162,39,0.28),transparent_62%)]"
                  />
                  <Image
                    src={asset(category.image)}
                    alt=""
                    fill
                    sizes="(min-width:768px) 33vw, 90vw"
                    className="object-contain p-10 opacity-45 transition-all duration-[800ms] ease-brand group-hover:scale-[1.07] group-hover:opacity-70"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-transparent"
                  />
                </div>

                <div className="relative flex min-h-[19rem] flex-col justify-end lg:min-h-[22rem]">
                  <span className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-gold-300">
                    {category.count}{" "}
                    {category.count === 1 ? "product" : "products"}
                  </span>

                  <h3 className="mt-3 flex items-start justify-between gap-4 text-d4 font-semibold text-white">
                    {category.title}
                    <ArrowUpRight
                      className="mt-1 size-5 shrink-0 text-gold-300 opacity-0 transition-all duration-500 ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </h3>

                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-warm-300">
                    {category.excerpt}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
