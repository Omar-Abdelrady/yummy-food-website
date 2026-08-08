"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Manufacturing process.
 *
 * Process transparency is the highest-trust content a manufacturer owns — it
 * says "we have nothing to hide" and doubles as capability proof for OEM
 * clients. Placed before the statistics so the numbers land as a consequence of
 * demonstrated capability rather than as an unsupported boast.
 *
 * The connector line draws itself as you scroll, which makes a static list feel
 * engineered. Horizontal on desktop (a production line), vertical on mobile
 * (a timeline) — the same content, read the way each viewport reads best.
 */
const steps = [
  {
    step: "01",
    title: "Milling & blending",
    body: "Flour arrives and is checked for extraction rate, moisture and gluten before it is allowed into the blend.",
  },
  {
    step: "02",
    title: "Mixing & sheeting",
    body: "Dough is hydrated to a recorded ratio, then rolled down through successive rollers to the target sheet thickness.",
  },
  {
    step: "03",
    title: "Steaming",
    body: "The cut noodle is steamed to gelatinise the starch — the step that decides whether it rehydrates in three minutes or eight.",
  },
  {
    step: "04",
    title: "Frying or air-drying",
    body: "Instant lines fry to a controlled moisture level. The handmade range skips oil entirely and is hung to air-dry.",
  },
  {
    step: "05",
    title: "Seasoning & sealing",
    body: "Seasoning is dosed, packs are filled, and every seal is checked for integrity before the batch code is applied.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scaleY = scaleX;

  return (
    <section className="relative bg-white py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="How it's made"
          title="Five steps, recorded at every one."
          highlight={["recorded"]}
          lede="Nothing here is proprietary. What separates a good noodle from an inconsistent one is whether the numbers get written down."
        />

        <div ref={ref} className="relative mt-16 lg:mt-24">
          {/* Connector — horizontal on desktop */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-6 hidden h-px bg-ink/10 lg:block"
          >
            <motion.div
              className="h-full origin-left rule-gold"
              style={reduced ? { scaleX: 1 } : { scaleX }}
            />
          </div>

          {/* Connector — vertical on mobile */}
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-6 top-6 w-px bg-ink/10 lg:hidden"
          >
            <motion.div
              className="w-full origin-top bg-gradient-to-b from-gold-500 to-gold-500/0"
              style={reduced ? { scaleY: 1 } : { scaleY }}
            />
          </div>

          <ol className="grid gap-10 lg:grid-cols-5 lg:gap-6">
            {steps.map((step, i) => (
              <Reveal
                as="li"
                key={step.step}
                delay={i * 0.08}
                className="relative flex gap-6 pl-0 lg:block"
              >
                {/* Node */}
                <div className="relative z-10 shrink-0">
                  {/* No idle pulse here: five rings pulsing at once reads as an
                      alert state. The scroll-drawn connector already carries the
                      motion for this section. */}
                  <span className="relative flex size-12 items-center justify-center rounded-full border border-ink/10 bg-white font-display text-sm font-semibold text-gold-700 shadow-[0_2px_10px_rgba(11,11,12,0.06)]">
                    {step.step}
                  </span>
                </div>

                <div className="pb-2 lg:mt-8 lg:pb-0 lg:pr-6">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-warm-500">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
