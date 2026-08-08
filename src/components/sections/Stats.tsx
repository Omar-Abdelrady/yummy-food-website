import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { stats } from "@/content";

/**
 * Company statistics.
 *
 * The most efficient "we are bigger than you think" device on the site: four
 * numbers are skimmable in under two seconds, which matches the ~20 seconds a
 * buyer actually spends on a homepage before deciding whether to dig further.
 *
 * The counter animation earns attention without being childish because the
 * curve is a plain ease-out that lands exactly on the value — no overshoot, no
 * bounce, nothing that would read as a loading state on a number.
 */
export function Stats() {
  return (
    <section className="relative overflow-hidden bg-beige-deep py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(201,162,39,0.16),transparent_62%)]"
      />

      <Container className="relative">
        <Reveal direction="none" duration={0.5}>
          <Eyebrow>By the numbers</Eyebrow>
        </Reveal>

        {/* Deliberately not a <dl>: the Reveal wrapper would sit between the
            list and its <dt>/<dd> children and break the association. A plain
            list of figures carries the same meaning without lying to a screen
            reader about the structure. */}
        <ul className="mt-14 grid gap-px overflow-hidden rounded-xl3 border border-ink/8 bg-ink/8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal
              as="li"
              key={stat.label}
              delay={i * 0.09}
              className="bg-beige-deep p-8 lg:p-10"
            >
              <p className="font-display text-[clamp(2.75rem,4.4vw,4rem)] font-semibold leading-none tracking-tight text-ink">
                <Counter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </p>
              <h3 className="mt-5 font-display text-base font-semibold text-ink">
                {stat.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-warm-500">
                {stat.detail}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
