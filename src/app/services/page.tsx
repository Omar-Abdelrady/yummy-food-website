import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { CTA } from "@/components/sections/CTA";
import { getServices } from "@/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Food manufacturing, private label, OEM contract manufacturing, export and distribution from Yummy Food's plant in Badr City, Egypt.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const services = getServices();

  return (
    <>
      <PageHeader
        eyebrow="Capabilities"
        title="What we do for other brands."
        highlight={["other", "brands."]}
        lede="Much of what leaves Badr City each month carries someone else's name. These are the five ways we work — each one ends in a conversation, not a checkout."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="bg-white pb-24 pt-16 lg:pb-32 lg:pt-20">
        <Container>
          {/* Deliberately asymmetric: a uniform 5-up row reads as a feature
              list, whereas weighted cards read as capabilities. The first two
              carry the highest margin, so they get the larger cells. */}
          <Stagger className="grid gap-5 lg:grid-cols-6">
            {services.map((service, i) => {
              const featured = i < 2;

              return (
                <StaggerItem
                  key={service.slug}
                  className={cn("h-full", featured ? "lg:col-span-3" : "lg:col-span-2")}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className={cn(
                      "group relative flex h-full flex-col overflow-hidden rounded-xl3 border p-8 transition-all duration-500 ease-brand hover:-translate-y-1.5 lg:p-10",
                      featured
                        ? "border-transparent bg-ink text-white hover:shadow-[0_36px_80px_-32px_rgba(11,11,12,0.55)]"
                        : "border-ink/8 bg-beige/60 hover:border-gold-400/45 hover:bg-white hover:shadow-[0_28px_60px_-32px_rgba(11,11,12,0.25)]",
                    )}
                  >
                    {featured ? (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_5%,rgba(201,162,39,0.22),transparent_62%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                      />
                    ) : null}

                    <div className="relative flex h-full flex-col">
                      <span
                        className={cn(
                          "inline-flex size-12 items-center justify-center rounded-full border transition-colors duration-500",
                          featured
                            ? "border-gold-400/25 bg-gold-500/10 text-gold-300 group-hover:border-gold-400/55"
                            : "border-gold-400/25 bg-white text-gold-700 group-hover:border-gold-400/60",
                        )}
                      >
                        <ServiceIcon
                          name={service.icon}
                          className="size-5"
                          />
                      </span>

                      <h2
                        className={cn(
                          "mt-7 flex items-start justify-between gap-4 font-display font-semibold",
                          featured ? "text-d4 text-white" : "text-xl text-ink",
                        )}
                      >
                        {service.title}
                        <ArrowUpRight
                          className={cn(
                            "mt-1 size-5 shrink-0 opacity-0 transition-all duration-500 ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100",
                            featured ? "text-gold-300" : "text-gold-600",
                          )}
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                      </h2>

                      <p
                        className={cn(
                          "mt-2 text-sm font-medium",
                          featured ? "text-gold-300/85" : "text-gold-700",
                        )}
                      >
                        {service.tagline}
                      </p>

                      <p
                        className={cn(
                          "mt-5 text-[0.9375rem] leading-relaxed",
                          featured ? "text-warm-300" : "text-warm-500",
                        )}
                      >
                        {service.excerpt}
                      </p>

                      {featured ? (
                        <ul className="mt-8 flex flex-col gap-2.5 border-t border-white/10 pt-6">
                          {service.capabilities.slice(0, 3).map((capability) => (
                            <li
                              key={capability}
                              className="flex gap-3 text-sm text-warm-300"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-2 size-1 shrink-0 rounded-full bg-gold-400"
                              />
                              {capability}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      <CTA
        eyebrow="Start a conversation"
        title="Tell us what you need made."
        highlight={["what", "you", "need", "made."]}
        lede="Format, volume, market and launch date. We will tell you plainly whether the timeline is real before anyone signs anything."
      />
    </>
  );
}
