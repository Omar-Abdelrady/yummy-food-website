import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { getFeaturedServices } from "@/content";

/**
 * Featured services.
 *
 * Products answer "what do you sell?". Services answer "what can you do for
 * *me*?" — the higher-margin question, and the one a private-label or OEM
 * visitor arrived with. Surfacing three on the homepage captures the B2B
 * visitor who never intended to browse a product catalogue at all.
 */
export function FeaturedServices() {
  const services = getFeaturedServices(3);

  return (
    <section className="relative overflow-hidden bg-charcoal py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_15%_0%,rgba(201,162,39,0.15),transparent_60%)]"
      />

      <Container className="relative">
        <SectionHeading
          tone="dark"
          eyebrow="What we do"
          title="We also make noodles that carry someone else's name."
          highlight={["someone", "else's", "name."]}
          lede="Private label, OEM contract manufacturing and export — the work that leaves Badr City each month under a brand that is not ours."
          action={
            <Button
              href="/services"
              variant="outlineDark"
              icon={<ArrowRight className="size-4" strokeWidth={1.8} />}
            >
              All services
            </Button>
          }
        />

        <Stagger className="mt-16 grid gap-4 md:grid-cols-3 lg:mt-20 lg:gap-6">
          {services.map((service) => {
            return (
              <StaggerItem key={service.slug} className="h-full">
                <Link
                  href={`/services/${service.slug}`}
                  className="group glass-dark flex h-full flex-col rounded-xl3 p-8 transition-all duration-500 ease-brand hover:-translate-y-1.5 hover:border-gold-400/40 hover:bg-white/10 lg:p-9"
                >
                  <span className="inline-flex size-12 items-center justify-center rounded-full border border-gold-400/25 bg-gold-500/10 text-gold-300 transition-colors duration-500 group-hover:border-gold-400/55">
                    <ServiceIcon
                      name={service.icon}
                      className="size-5"
                      />
                  </span>

                  <h3 className="mt-7 flex items-start justify-between gap-4 font-display text-xl font-semibold text-white">
                    {service.title}
                    <ArrowUpRight
                      className="mt-1 size-5 shrink-0 text-gold-300 opacity-0 transition-all duration-500 ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </h3>

                  <p className="mt-2 text-sm font-medium text-gold-300/85">
                    {service.tagline}
                  </p>

                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-warm-300">
                    {service.excerpt}
                  </p>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
