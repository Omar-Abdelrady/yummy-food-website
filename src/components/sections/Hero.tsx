"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { MouseGlow } from "@/components/motion/MouseGlow";
import { EASE } from "@/lib/utils";

/**
 * Layered hero composition.
 *
 * Three real product packs float at different depths and speeds — the "layered
 * hero composition" and "floating product package" requirements met with the
 * actual catalogue, so the visual richness doubles as a product tease rather
 * than abstract decoration.
 *
 * Depth is built from four stacked planes: gradient ground → grain → glow →
 * packs. Each pack has its own parallax rate, which is what produces the
 * sense of space; a single shared rate would read as one flat image moving.
 */

/**
 * Three packs at three depths. The sachet is the hero object — largest, lowest
 * parallax, front plane — with the cup and the dried pack set behind it at
 * progressively higher parallax rates. Differing rates are what create the
 * sense of space; a shared rate would read as one flat image drifting.
 */
const packs = [
  {
    src: "/products/braised-beef-noodles-cup.png",
    alt: "Yummy Food braised beef cup noodles",
    className:
      "left-[1%] top-[4%] w-[46%] sm:left-[3%] sm:w-[42%] lg:left-[-2%] lg:top-[2%] lg:w-[44%]",
    parallax: 92,
    float: "animate-float-slow",
    delay: 0.15,
    z: "z-20",
  },
  {
    src: "/products/spicy-beef-noodles.png",
    alt: "Yummy Food spicy beef instant noodles",
    className:
      "right-[-8%] top-[30%] w-[74%] sm:right-[-4%] sm:w-[68%] lg:right-[-6%] lg:top-[26%] lg:w-[72%]",
    parallax: 36,
    float: "animate-float-slower",
    delay: 0.05,
    z: "z-30",
  },
  {
    src: "/products/wenzhou-noodles-yellow.png",
    alt: "Yummy Food WenZhou handmade dried noodles",
    className: "hidden lg:block left-[40%] top-[-4%] w-[26%]",
    parallax: 148,
    float: "animate-float-slow",
    delay: 0.28,
    z: "z-10",
  },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Copy drifts up and fades as the hero leaves — a slow, expensive-feeling exit.
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      /* Height is capped rather than forced: on a short laptop viewport the
         CTAs and proof strip must stay above the fold, since they are the whole
         point of the first impression. */
      className="relative isolate overflow-hidden bg-beige pb-20 pt-[calc(var(--header-h)+2.5rem)] lg:min-h-[min(100vh,860px)] lg:pb-24 lg:pt-[calc(var(--header-h)+3rem)]"
    >
      {/* Plane 1 — gradient ground */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_78%_18%,rgba(232,199,102,0.42),transparent_58%),radial-gradient(70%_60%_at_10%_88%,rgba(201,162,39,0.2),transparent_62%)]"
      />
      {/* Plane 2 — grain, kills the flatness of a large gradient field */}
      <div
        aria-hidden="true"
        className="grain-layer pointer-events-none absolute inset-0 -z-10 opacity-[0.16] mix-blend-multiply"
      />
      {/* Plane 3 — cursor-tracked light */}
      <MouseGlow />

      <Container size="wide" className="relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <motion.div
            style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
            className="lg:col-span-6"
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <Eyebrow>Badr City · Egypt · Est. 2011</Eyebrow>
            </motion.div>

            {/* Line breaks are authored rather than left to wrapping — they are
                part of the composition. Each line is short enough to survive the
                fluid clamp down to 360px, so no line ever wraps against itself. */}
            <h1 className="mt-7 text-d1 font-semibold text-ink">
              {["Noodles", "engineered", "for the", "world."].map((line, i) => (
                <span
                  key={line}
                  className="block overflow-hidden pb-[0.1em] -mb-[0.1em]"
                >
                  <motion.span
                    className={
                      i >= 2 ? "block text-gold-gradient" : "block"
                    }
                    initial={reduced ? false : { y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 1,
                      delay: 0.1 + i * 0.09,
                      ease: EASE,
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42, ease: EASE }}
              className="mt-7 max-w-[46ch] text-lede text-warm-500"
            >
              Instant, cup and dried noodles manufactured on three independent
              lines in Badr City. Halal certified, batch-coded, and packaged in
              four languages — export-ready before the first container is booked.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.54, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Button
                href="/products"
                size="lg"
                icon={<ArrowRight className="size-[1.05rem]" strokeWidth={1.8} />}
              >
                Explore the range
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Talk to us
              </Button>
            </motion.div>

            {/* Proof strip — the 20-second buyer scan, answered immediately. */}
            <motion.dl
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
              className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-ink/10 pt-6"
            >
              {[
                { value: "10", label: "SKUs in production" },
                { value: "3", label: "Production lines" },
                { value: "4", label: "Languages on-pack" },
              ].map((item) => (
                // Flex + order lets the value sit above its label visually
                // while the <dt> still precedes the <dd> in the DOM.
                <div key={item.label} className="flex flex-col">
                  <dt className="order-2 mt-1 text-xs uppercase tracking-[0.14em] text-warm-400">
                    {item.label}
                  </dt>
                  <dd className="order-1 font-display text-3xl font-semibold text-ink">
                    {item.value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* Composition */}
          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/3.6] w-full sm:aspect-[4/3] lg:aspect-square">
              {packs.map((pack, i) => (
                <HeroPack
                  key={pack.src}
                  pack={pack}
                  progress={scrollYProgress}
                  reduced={Boolean(reduced)}
                  priority={i === 1}
                />
              ))}

              {/* Soft ground shadow so the packs sit in the space, not on it. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[12%] bottom-[6%] h-16 rounded-[50%] bg-ink/12 blur-2xl"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        style={reduced ? undefined : { opacity: copyOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-8 z-10 hidden justify-center lg:flex"
      >
        <span className="flex flex-col items-center gap-3">
          <span className="text-[0.6875rem] uppercase tracking-[0.24em] text-warm-400">
            Scroll
          </span>
          <span className="relative flex h-11 w-6 items-start justify-center overflow-hidden rounded-full border border-ink/15">
            <span className="animate-scroll-hint mt-2 block h-2 w-[3px] rounded-full bg-gold-500" />
          </span>
          <ArrowDown
            className="size-3.5 text-warm-400"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </span>
      </motion.div>
    </section>
  );
}

function HeroPack({
  pack,
  progress,
  reduced,
  priority,
}: {
  pack: (typeof packs)[number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
  priority: boolean;
}) {
  const y = useTransform(progress, [0, 1], [0, -pack.parallax]);

  return (
    <motion.div
      className={`absolute ${pack.className} ${pack.z}`}
      style={reduced ? undefined : { y }}
      initial={reduced ? false : { opacity: 0, y: 44, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: pack.delay, ease: EASE }}
    >
      <div className={reduced ? "" : pack.float}>
        <Image
          src={pack.src}
          alt={pack.alt}
          width={900}
          height={900}
          priority={priority}
          sizes="(min-width:1024px) 40vw, 55vw"
          className="h-auto w-full drop-shadow-[0_36px_60px_rgba(11,11,12,0.24)]"
        />
      </div>
    </motion.div>
  );
}
