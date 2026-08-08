import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "./Container";
import { Eyebrow } from "./SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  highlight?: string[];
  lede?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
  /** Extra bottom padding when the page below starts with a full-bleed block. */
  className?: string;
}

/**
 * Shared inner-page header.
 *
 * Every non-home page opens the same way, which is what makes the site feel
 * like one system rather than a set of separately designed pages. The beige
 * ground and gold wash echo the hero without competing with it.
 */
export function PageHeader({
  eyebrow,
  title,
  highlight = [],
  lede,
  crumbs,
  children,
  className,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-beige pb-16 pt-[calc(var(--header-h)+3rem)] lg:pb-20 lg:pt-[calc(var(--header-h)+5rem)]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_0%,rgba(232,199,102,0.34),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="grain-layer pointer-events-none absolute inset-0 opacity-[0.13] mix-blend-multiply"
      />

      <Container className="relative">
        {crumbs?.length ? (
          <Reveal direction="none" duration={0.5}>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-warm-500">
                {crumbs.map((crumb, i) => (
                  <li key={crumb.label} className="flex items-center gap-1.5">
                    {i > 0 ? (
                      <ChevronRight
                        className="size-3.5 text-warm-300"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    ) : null}
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="transition-colors duration-300 hover:text-gold-700"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-ink">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        ) : null}

        {eyebrow ? (
          <Reveal direction="none" duration={0.5}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
        ) : null}

        <TextReveal
          as="h1"
          text={title}
          highlight={highlight}
          className="mt-6 max-w-[18ch] text-d1 font-semibold text-ink"
        />

        {lede ? (
          <Reveal delay={0.14}>
            <p className="mt-7 max-w-[58ch] text-lede text-warm-500">{lede}</p>
          </Reveal>
        ) : null}

        {children ? <Reveal delay={0.2}>{children}</Reveal> : null}
      </Container>
    </section>
  );
}
