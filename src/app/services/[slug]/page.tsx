import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { CTA } from "@/components/sections/CTA";
import { ServiceProcess } from "@/components/services/ServiceProcess";
import { company, getServiceBySlug, getServiceSlugs, getServices } from "@/content";
import { contactLink, site } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const title = service.seo?.title ?? service.title;
  const description = service.seo?.description ?? service.excerpt;

  return {
    title,
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${title} — ${company.tradeName}`,
      description,
      url: `${site.url}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const others = getServices().filter((s) => s.slug !== service.slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.excerpt,
    serviceType: service.title,
    provider: {
      "@type": "Organization",
      name: company.legalName,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${company.address.line1}, ${company.address.line2}`,
        addressLocality: company.address.city,
        addressCountry: "EG",
      },
    },
    areaServed: ["EG", "Middle East", "East Africa", "Europe"],
  };

  return (
    <>
      {/* Hero */}
      <PageHeader
        eyebrow={service.title}
        title={service.heroHeadline}
        lede={service.heroSubline}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      >
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button
            href={contactLink(service.slug)}
            size="lg"
            icon={<ArrowRight className="size-[1.05rem]" strokeWidth={1.8} />}
          >
            Start a conversation
          </Button>
          <Button href="/services" variant="secondary" size="lg">
            All services
          </Button>
        </div>
      </PageHeader>

      {/* Description + capabilities */}
      <section className="bg-white py-24 lg:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <span className="inline-flex size-14 items-center justify-center rounded-full border border-gold-400/30 bg-gold-50 text-gold-700">
                <ServiceIcon name={service.icon} className="size-6" strokeWidth={1.5} />
              </span>

              <h2 className="mt-8 text-d3 font-semibold text-ink">
                {service.tagline}
              </h2>

              <div className="mt-8 flex flex-col gap-6">
                {service.description.map((paragraph, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <p className="text-lede leading-relaxed text-warm-500">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl3 border border-ink/8 bg-beige/60 p-8 lg:p-9">
                <Eyebrow>What&rsquo;s included</Eyebrow>
                <Stagger as="ul" className="mt-8 flex flex-col gap-4">
                  {service.capabilities.map((capability) => (
                    <StaggerItem as="li" key={capability}>
                      <span className="flex gap-3.5">
                        <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-gold-500/12 text-gold-700">
                          <Check
                            className="size-3"
                            strokeWidth={2.6}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="text-[0.9375rem] leading-relaxed text-warm-500">
                          {capability}
                        </span>
                      </span>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Process — the trust engine of the page */}
      <ServiceProcess steps={service.process} />

      {/* Benefits — the sales argument. Deliberately after process, never
          before: a reader will not accept the argument until they understand
          the mechanism. */}
      <section className="bg-white py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow="Benefits"
            title="What you actually get."
            highlight={["actually", "get."]}
          />

          <Stagger className="mt-16 grid gap-5 sm:grid-cols-2">
            {service.benefits.map((benefit) => (
              <StaggerItem key={benefit.title} className="h-full">
                <article className="group h-full rounded-xl3 border border-ink/8 bg-beige/50 p-8 transition-all duration-500 ease-brand hover:-translate-y-1 hover:border-gold-400/45 hover:bg-white hover:shadow-[0_26px_60px_-30px_rgba(11,11,12,0.24)]">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-warm-500">
                    {benefit.body}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Other services */}
      <section className="bg-beige py-20 lg:py-24">
        <Container>
          <Eyebrow>Also available</Eyebrow>
          <Stagger className="mt-10 flex flex-wrap gap-3">
            {others.map((other) => (
              <StaggerItem key={other.slug}>
                <Button href={`/services/${other.slug}`} variant="secondary">
                  {other.title}
                </Button>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <CTA
        eyebrow={service.title}
        title="Let's scope it properly."
        highlight={["scope", "it", "properly."]}
        lede={`Tell us the format, the volume and the market. We will tell you plainly what we can hold and what we cannot — before anyone commits.`}
        primaryLabel="Contact us"
        primaryHref={contactLink(service.slug)}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
