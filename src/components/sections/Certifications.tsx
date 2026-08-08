import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { certifications } from "@/content";

/**
 * Certifications.
 *
 * For an export buyer this is a gate, not a nicety — no certificates, no
 * purchase order. That is why it gets a full section rather than being shrunk
 * into a footer logo strip.
 *
 * Entries evidenced by the supplied packaging (halal seal, EOS registration
 * number, GS1 barcode) are marked verified. The rest are rendered without that
 * mark so the page never asserts a certificate we have not seen.
 */
export function Certifications() {
  return (
    <section className="relative bg-white py-24 lg:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Compliance"
              title="Certification is part of the product."
              highlight={["part", "of", "the", "product."]}
              lede="For most of our buyers this page is a gate rather than a detail. Certificates are issued with every shipment, not on request."
            />
          </div>

          <div className="lg:col-span-7">
            <Stagger className="grid gap-4 sm:grid-cols-2">
              {certifications.map((cert) => (
                <StaggerItem key={cert.abbreviation} className="h-full">
                  <article className="group relative h-full overflow-hidden rounded-xl3 border border-ink/8 bg-beige/60 p-7 transition-all duration-500 ease-brand hover:-translate-y-1 hover:border-gold-400/45 hover:bg-white hover:shadow-[0_26px_60px_-30px_rgba(11,11,12,0.25)]">
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-gold-700">
                        {cert.abbreviation}
                      </span>

                      {cert.verified ? (
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/35 bg-gold-50 px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.14em] text-gold-700"
                          title="Evidenced on current production packaging"
                        >
                          <Check
                            className="size-3"
                            strokeWidth={2.4}
                            aria-hidden="true"
                          />
                          On pack
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                      {cert.name}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-warm-500">
                      {cert.body}
                    </p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Container>
    </section>
  );
}
