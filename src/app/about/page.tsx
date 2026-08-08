import type { Metadata } from "next";
import Image from "next/image";
import { Check, Compass, Factory, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Parallax } from "@/components/motion/Parallax";
import { Counter } from "@/components/motion/Counter";
import { CTA } from "@/components/sections/CTA";
import { Certifications } from "@/components/sections/Certifications";
import {
  capacityFacts,
  company,
  factoryHighlights,
  mission,
  qualityStandards,
  stats,
  storyParagraphs,
  team,
  values,
  vision,
} from "@/content";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Kang Shi Fu Yummy Food Ltd, Co. manufactures noodles from Plot 11, First Industrial Zone, Badr City. Our story, factory, capacity, quality standards and certifications.",
  alternates: { canonical: "/about" },
};

/**
 * About.
 *
 * Ordered for the verification visitor — someone checking, ten minutes before a
 * meeting, whether this company is real. Story leads for narrative, but the
 * proof blocks (factory, capacity, quality, certificates) are visually heavier
 * so the eye is pulled to evidence rather than to prose.
 */
export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A manufacturer, not a marketer."
        highlight={["not", "a", "marketer."]}
        lede={`${company.legalName} has produced noodles from Plot 11 in Badr City's First Industrial Zone since ${company.founded} — for our own label, and just as often for someone else's.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Story */}
      <section className="bg-white py-24 lg:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow>Our story</Eyebrow>
              <h2 className="mt-6 text-d3 font-semibold text-ink">
                We had to build the plant twice.
              </h2>

              <Reveal delay={0.12} className="mt-10">
                <div className="relative aspect-4/5 overflow-hidden rounded-xl3 bg-beige">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(110%_90%_at_50%_108%,rgba(201,162,39,0.24),transparent_60%)]"
                  />
                  <Parallax distance={30} className="absolute -inset-y-[10%] inset-x-0">
                    <Image
                      src="/products/noodles-1kg.png"
                      alt="Yummy Food bulk pack showing the printed nutrition and traceability panel"
                      fill
                      sizes="(min-width:1024px) 40vw, 90vw"
                      className="object-contain p-10"
                    />
                  </Parallax>
                  <div className="absolute bottom-5 left-5">
                    <Badge>Made in Egypt</Badge>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <div className="flex flex-col gap-6">
                {storyParagraphs.map((paragraph, i) => (
                  <Reveal key={i} delay={i * 0.07}>
                    <p className="text-lede leading-relaxed text-warm-500">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>

              {/* Mission & vision */}
              <div className="mt-12 grid gap-5 sm:grid-cols-2">
                {[
                  { icon: Target, label: "Mission", body: mission },
                  { icon: Compass, label: "Vision", body: vision },
                ].map((item, i) => (
                  <Reveal key={item.label} delay={0.1 + i * 0.08}>
                    <article className="h-full rounded-xl3 border border-ink/8 bg-beige/60 p-7">
                      <span className="inline-flex size-11 items-center justify-center rounded-full border border-gold-400/30 bg-white text-gold-700">
                        <item.icon
                          className="size-[1.15rem]"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                      </span>
                      <h3 className="mt-6 font-display text-lg font-semibold text-ink">
                        {item.label}
                      </h3>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-warm-500">
                        {item.body}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden bg-ink py-24 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_85%_0%,rgba(201,162,39,0.15),transparent_60%)]"
        />
        <Container className="relative">
          <SectionHeading
            tone="dark"
            eyebrow="What we value"
            title="Four commitments we can be held to."
            highlight={["held", "to."]}
            lede="Written as things that can be checked, rather than as things that sound good."
          />

          <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              return (
                <StaggerItem key={value.title} className="h-full">
                  <article className="glass-dark h-full rounded-xl3 p-7 transition-all duration-500 ease-brand hover:-translate-y-1 hover:border-gold-400/35 hover:bg-white/10">
                    <span className="inline-flex size-11 items-center justify-center rounded-full border border-gold-400/25 bg-gold-500/10 text-gold-300">
                      <ServiceIcon
                        name={value.icon}
                        className="size-[1.15rem]"
                        strokeWidth={1.6}
                        />
                    </span>
                    <h3 className="mt-6 font-display text-lg font-semibold text-white">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-warm-300">
                      {value.body}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* Factory */}
      <section className="bg-white py-24 lg:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="The factory"
                title="Plot 11, First Industrial Zone."
                highlight={["First", "Industrial", "Zone."]}
                lede="Badr City sits 60 km from Cairo and within road reach of three ports — which is why an Egyptian plant can quote Gulf and East African buyers on days rather than weeks."
              />
            </div>

            <div className="lg:col-span-7">
              <Stagger as="ul" className="flex flex-col gap-px overflow-hidden rounded-xl3 border border-ink/8 bg-ink/8">
                {factoryHighlights.map((highlight) => (
                  <StaggerItem as="li" key={highlight} className="bg-white">
                    <span className="flex gap-4 p-6">
                      <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-gold-500/12 text-gold-700">
                        <Check
                          className="size-3.5"
                          strokeWidth={2.4}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="leading-relaxed text-warm-500">
                        {highlight}
                      </span>
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Container>
      </section>

      {/* Capacity */}
      <section className="relative overflow-hidden bg-beige-deep py-24 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(201,162,39,0.16),transparent_62%)]"
        />
        <Container className="relative">
          <SectionHeading
            eyebrow="Manufacturing capacity"
            title="What the plant can actually hold."
            highlight={["actually", "hold."]}
            lede="Figures at standard utilisation, not theoretical maximums — the numbers we are willing to be held to on a delivery date."
          />

          {/* Headline stats */}
          <ul className="mt-16 grid gap-px overflow-hidden rounded-xl3 border border-ink/8 bg-ink/8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal
                as="li"
                key={stat.label}
                delay={i * 0.08}
                className="bg-beige-deep p-8"
              >
                <p className="font-display text-[clamp(2.5rem,4vw,3.5rem)] font-semibold leading-none tracking-tight text-ink">
                  <Counter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </p>
                <h3 className="mt-4 font-display text-base font-semibold text-ink">
                  {stat.label}
                </h3>
                <p className="mt-1.5 text-sm text-warm-500">{stat.detail}</p>
              </Reveal>
            ))}
          </ul>

          {/* Line-by-line */}
          <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capacityFacts.map((fact) => (
              <StaggerItem key={fact.label} className="h-full">
                <article className="h-full rounded-xl3 border border-ink/8 bg-white p-7">
                  <span className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-warm-400">
                    {fact.label}
                  </span>
                  <p className="mt-3 font-display text-2xl font-semibold text-ink">
                    {fact.value}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-warm-500">
                    {fact.note}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Quality standards */}
      <section className="bg-white py-24 lg:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Quality standards"
                title="Six places a batch can be stopped."
                highlight={["stopped."]}
                lede="Quality is not a final inspection. It is six separate opportunities to catch a problem before it reaches a carton."
              />
              <Reveal delay={0.2} className="mt-10">
                <span className="inline-flex size-14 items-center justify-center rounded-full border border-gold-400/30 bg-gold-50 text-gold-700">
                  <Factory
                    className="size-6"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Stagger as="ol" className="flex flex-col gap-4">
                {qualityStandards.map((standard, i) => (
                  <StaggerItem as="li" key={standard.title}>
                    <article className="group rounded-xl3 border border-ink/8 bg-beige/50 p-7 transition-all duration-500 ease-brand hover:-translate-y-1 hover:border-gold-400/45 hover:bg-white">
                      <div className="flex gap-5">
                        <span className="font-display text-sm font-semibold text-gold-600">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="font-display text-lg font-semibold text-ink">
                            {standard.title}
                          </h3>
                          <p className="mt-2.5 leading-relaxed text-warm-500">
                            {standard.body}
                          </p>
                        </div>
                      </div>
                    </article>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Container>
      </section>

      {/* Certificates — reused verbatim from the homepage, one source of truth */}
      <Certifications />

      {/* Team */}
      <section className="bg-beige py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow="The team"
            title="Who you will actually be dealing with."
            highlight={["actually"]}
            lede="A small team, which is why an enquiry reaches the person who can answer it rather than a queue."
          />

          <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <StaggerItem key={member.name} className="h-full">
                <article className="group h-full rounded-xl3 border border-ink/8 bg-white p-7 transition-all duration-500 ease-brand hover:-translate-y-1 hover:border-gold-400/45 hover:shadow-[0_26px_60px_-30px_rgba(11,11,12,0.24)]">
                  {/* Monogram stands in for photography until the client
                      supplies portraits — a placeholder headshot would read as
                      stock, which is worse than none. */}
                  <span
                    aria-hidden="true"
                    className="inline-flex size-14 items-center justify-center rounded-full bg-linear-to-br from-gold-700 via-gold-500 to-gold-300 font-display text-lg font-semibold text-white"
                  >
                    {member.initials}
                  </span>
                  <h3 className="mt-6 font-display text-lg font-semibold text-ink">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-gold-700">
                    {member.role}
                  </p>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-warm-500">
                    {member.bio}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <CTA
        eyebrow="Visit us"
        title="Come and see the plant."
        highlight={["see", "the", "plant."]}
        lede="Buyers and auditors are welcome at Plot 11. The fastest way to answer every question on this page is to walk the line."
        primaryLabel="Arrange a visit"
        primaryHref="/contact?subject=other"
      />
    </>
  );
}
