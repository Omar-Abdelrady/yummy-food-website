"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import type { ProcessStep } from "@/content";

/**
 * Service process timeline.
 *
 * Vertical rather than the horizontal treatment used on the homepage: service
 * steps carry a paragraph each, and a five-column horizontal layout would
 * squeeze them into unreadable columns. Same scroll-drawn gold connector, so
 * the two still read as one system.
 */
export function ServiceProcess({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative overflow-hidden bg-ink py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_20%_0%,rgba(201,162,39,0.15),transparent_60%)]"
      />

      <Container className="relative">
        <SectionHeading
          tone="dark"
          eyebrow="How it works"
          title="Five steps, in this order, every time."
          highlight={["every", "time."]}
          lede="No stage is skipped to hit a date. If something cannot be done properly, we say so at step one rather than discovering it at step four."
        />

        <div ref={ref} className="relative mt-16 lg:mt-20">
          {/* Connector */}
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-6 top-8 w-px bg-white/12 lg:left-8"
          >
            <motion.div
              className="w-full origin-top bg-linear-to-b from-gold-400 via-gold-500 to-gold-500/0"
              style={reduced ? { scaleY: 1 } : { scaleY }}
            />
          </div>

          <ol className="flex flex-col gap-10 lg:gap-12">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.step} delay={i * 0.06}>
                <div className="flex gap-6 lg:gap-10">
                  <span className="relative z-10 mt-0.5 flex size-12 shrink-0 items-center justify-center rounded-full border border-gold-400/30 bg-charcoal font-display text-sm font-semibold text-gold-300 lg:size-16">
                    {step.step}
                  </span>

                  <div className="pb-1 lg:max-w-3xl">
                    <h3 className="font-display text-xl font-semibold text-white lg:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-warm-300">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
