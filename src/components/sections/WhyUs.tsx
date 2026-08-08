import {
  BadgeCheck,
  Languages,
  ScanLine,
  Ship,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

/**
 * Why choose us.
 *
 * Differentiation has to be specific to beat every competitor's identical
 * "quality, trust, service" triad — so every card here is a fact taken off the
 * packaging rather than an adjective. Glass cards on a dark band give the
 * section its own identity, keeping the page from reading as one long scroll
 * of white blocks.
 */
const reasons = [
  {
    icon: BadgeCheck,
    title: "Halal, plant-wide",
    body: "Not a certified line inside an uncertified factory. One halal standard across every ingredient, every batch and every market we ship to.",
  },
  {
    icon: Languages,
    title: "Four languages on every pack",
    body: "Arabic, English, Chinese and Korean printed as standard. Most destinations need documentation from us, not a new print run.",
  },
  {
    icon: Timer,
    title: "Nine months, ambient",
    body: "Shelf life validated under the conditions our products are actually stored in — not under a laboratory ideal that fails in a warehouse.",
  },
  {
    icon: ScanLine,
    title: "Batch-coded, every unit",
    body: "A production date and lot code on every pack. Any carton in any market resolves back to a single shift and a single set of records.",
  },
  {
    icon: ShieldCheck,
    title: "Specification held in writing",
    body: "What we agree is what runs. Changes are re-approved, never quietly absorbed into the next batch.",
  },
  {
    icon: Ship,
    title: "Three regions in road reach",
    body: "Badr City reaches Alexandria, Ain Sokhna and Damietta by road — Mediterranean, Gulf and East African freight in days.",
  },
];

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_0%,rgba(201,162,39,0.16),transparent_60%),radial-gradient(50%_40%_at_10%_100%,rgba(201,162,39,0.1),transparent_60%)]"
      />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              tone="dark"
              eyebrow="Why Yummy Food"
              title="Built for buyers who cannot afford surprises."
              highlight={["cannot", "afford", "surprises."]}
              lede="Every claim on this page is printed on a pack we already ship. Ask us to prove any of them."
            />
          </div>

          <div className="lg:col-span-7">
            <Stagger className="grid gap-4 sm:grid-cols-2">
              {reasons.map((reason) => (
                <StaggerItem key={reason.title} className="h-full">
                  <article className="group glass-dark h-full rounded-xl3 p-7 transition-all duration-500 ease-brand hover:-translate-y-1 hover:border-gold-400/35 hover:bg-white/10">
                    <span className="inline-flex size-11 items-center justify-center rounded-full border border-gold-400/25 bg-gold-500/10 text-gold-300 transition-colors duration-500 group-hover:border-gold-400/50">
                      <reason.icon
                        className="size-[1.15rem]"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </span>

                    <h3 className="mt-6 font-display text-lg font-semibold text-white">
                      {reason.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-warm-300">
                      {reason.body}
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
