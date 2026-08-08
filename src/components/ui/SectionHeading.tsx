import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}

/**
 * Small metadata label that opens a section. The gold rule to its left is the
 * site's most repeated brand gesture — it does the work a logo would, without
 * repeating the logo.
 */
export function Eyebrow({ children, className, tone = "light" }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.22em]",
        tone === "light" ? "text-warm-500" : "text-warm-300",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-8 rule-gold" />
      {children}
    </span>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  /** Words rendered in the gold gradient. Match the casing in `title`. */
  highlight?: string[];
  lede?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  /** Rendered to the right of the heading on desktop — usually a link. */
  action?: ReactNode;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  highlight = [],
  lede,
  align = "left",
  tone = "light",
  className,
  action,
  as = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        action && "lg:flex-row lg:items-end lg:justify-between lg:gap-12",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-5",
          align === "center" ? "items-center" : "items-start",
          action && "lg:max-w-[62%]",
        )}
      >
        {eyebrow ? (
          <Reveal direction="none" duration={0.5}>
            <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
          </Reveal>
        ) : null}

        <TextReveal
          as={as}
          text={title}
          highlight={highlight}
          className={cn(
            "text-d2 font-semibold",
            tone === "light" ? "text-ink" : "text-white",
          )}
        />

        {lede ? (
          <Reveal delay={0.12}>
            <p
              className={cn(
                "text-lede max-w-[54ch]",
                tone === "light" ? "text-warm-500" : "text-warm-300",
              )}
            >
              {lede}
            </p>
          </Reveal>
        ) : null}
      </div>

      {action ? (
        <Reveal delay={0.2} className="shrink-0">
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}
