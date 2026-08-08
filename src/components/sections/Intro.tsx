import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Parallax } from "@/components/motion/Parallax";
import { company } from "@/content";

/**
 * Company introduction.
 *
 * The hero makes a promise, so the visitor's immediate next question is "who is
 * this?". Answering in roughly forty words with a link out prevents the
 * wall-of-text About-on-Home that undermines otherwise premium sites.
 *
 * Layout is deliberately asymmetric — statement left, substance right — because
 * the editorial rhythm is what makes the page read as designed rather than
 * assembled from equal-weight blocks.
 */
export function Intro() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Statement */}
          <div className="lg:col-span-5">
            <Reveal direction="none" duration={0.5}>
              <Eyebrow>Who we are</Eyebrow>
            </Reveal>

            <TextReveal
              as="h2"
              text="We make noodles that travel well."
              highlight={["travel", "well."]}
              className="mt-7 text-d2 font-semibold text-ink"
            />

            <Reveal delay={0.15} className="mt-10 hidden lg:block">
              <div className="relative aspect-[5/4] overflow-hidden rounded-xl3 bg-beige">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(110%_90%_at_50%_110%,rgba(201,162,39,0.22),transparent_60%)]"
                />
                <Parallax distance={26} className="absolute inset-0">
                  <Image
                    src="/products/noodles-1kg.png"
                    alt="Yummy Food bulk noodle multi-pack, front and back panels"
                    fill
                    sizes="(min-width:1024px) 40vw, 90vw"
                    className="object-contain p-8"
                  />
                </Parallax>
              </div>
            </Reveal>
          </div>

          {/* Substance */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="flex flex-col gap-6 text-lede text-warm-500">
              <Reveal delay={0.08}>
                <p>
                  Yummy Food operates from Plot 11 in Badr City&rsquo;s First
                  Industrial Zone, producing instant sachets, cup noodles and
                  air-dried handmade noodles on three independent lines.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p>
                  Everything we make carries a production date and a batch code,
                  and every retail pack is printed in Arabic, English, Chinese
                  and Korean. We designed for export before we had any — which is
                  why entering a new market is a documentation exercise for us
                  rather than a packaging project.
                </p>
              </Reveal>
            </div>

            {/* Facts pulled straight from the pack — specificity beats adjectives. */}
            <Reveal delay={0.24}>
              <dl className="mt-12 grid gap-px overflow-hidden rounded-xl3 border border-ink/8 bg-ink/8 sm:grid-cols-2">
                {[
                  {
                    label: "Registered",
                    value: `No. ${company.registration[0].value}`,
                    detail: "Egyptian Organization for Standardization",
                  },
                  {
                    label: "Plant",
                    value: "Badr City",
                    detail: "First Industrial Zone, Plot 11",
                  },
                  {
                    label: "Shelf life",
                    value: "9 months",
                    detail: "Ambient, from production date",
                  },
                  {
                    label: "Certification",
                    value: "Halal",
                    detail: "Plant-wide, every batch",
                  },
                ].map((fact) => (
                  /* <div> is a permitted grouping element inside <dl>, so each
                     term keeps its description while the grid still gets a cell
                     to lay out. */
                  <div key={fact.label} className="bg-white p-6 lg:p-7">
                    <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-warm-400">
                      {fact.label}
                    </dt>
                    <dd className="mt-3 font-display text-xl font-semibold text-ink">
                      {fact.value}
                      <span className="mt-1.5 block text-sm font-normal text-warm-500">
                        {fact.detail}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10">
                <Button
                  href="/about"
                  variant="secondary"
                  size="lg"
                  icon={<ArrowRight className="size-[1.05rem]" strokeWidth={1.8} />}
                >
                  Our story
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
