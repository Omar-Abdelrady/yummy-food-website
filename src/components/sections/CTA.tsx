import { ArrowRight, Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { company } from "@/content";

interface CTAProps {
  eyebrow?: string;
  title?: string;
  highlight?: string[];
  lede?: string;
  primaryLabel?: string;
  primaryHref?: string;
}

/**
 * Closing call to action.
 *
 * Every page must terminate in a decision. Rendered full-bleed on ink and kept
 * deliberately sparse so it reads as a threshold rather than as one more
 * section — the visual break is what signals "the page is over, choose".
 *
 * Props are defaulted rather than required so the same component closes the
 * homepage, the product detail pages and the service detail pages with copy
 * appropriate to each, instead of three near-identical components.
 */
export function CTA({
  eyebrow = "Next step",
  title = "Let's talk about your next order.",
  highlight = ["next", "order."],
  lede = "Tell us the format, the volume and the market. We will tell you plainly whether the timeline is real — usually within one business day.",
  primaryLabel = "Contact us",
  primaryHref = "/contact",
}: CTAProps) {
  return (
    <section className="relative overflow-hidden bg-ink py-24 lg:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_110%,rgba(201,162,39,0.24),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="grain-layer pointer-events-none absolute inset-0 opacity-[0.13]"
      />

      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal direction="none" duration={0.5}>
            <span className="inline-flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-gold-300">
              <span aria-hidden="true" className="h-px w-8 rule-gold" />
              {eyebrow}
            </span>
          </Reveal>

          <TextReveal
            as="h2"
            text={title}
            highlight={highlight}
            className="mt-8 text-d2 font-semibold text-white"
          />

          <Reveal delay={0.14}>
            <p className="mt-7 max-w-[52ch] text-lede text-warm-300">{lede}</p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
              <Button
                href={primaryHref}
                variant="onDark"
                size="lg"
                icon={<ArrowRight className="size-[1.05rem]" strokeWidth={1.8} />}
              >
                {primaryLabel}
              </Button>
              <Button href="/products" variant="outlineDark" size="lg">
                Browse the range
              </Button>
            </div>
          </Reveal>

          {/* Direct channels. A buyer who is ready should not have to use a form. */}
          <Reveal delay={0.3}>
            <div className="mt-14 flex flex-col items-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:gap-10">
              <a
                href={`mailto:${company.emails[1].value}`}
                className="group inline-flex items-center gap-2.5 text-sm text-warm-300 transition-colors duration-300 hover:text-gold-300"
              >
                <Mail
                  className="size-4 text-gold-400"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                {company.emails[1].value}
              </a>
              <a
                href={`tel:${company.phones[0].replace(/\s/g, "")}`}
                className="group inline-flex items-center gap-2.5 text-sm text-warm-300 transition-colors duration-300 hover:text-gold-300"
              >
                <Phone
                  className="size-4 text-gold-400"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                {company.phones[0]}
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
