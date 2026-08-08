"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";
import { cn, EASE } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  /** Seconds between words. */
  gap?: number;
  /** Words wrapped in this list render in brand gold. */
  highlight?: string[];
}

/**
 * Word-by-word mask reveal for display headlines.
 *
 * Each word sits in an `overflow-hidden` wrapper and slides up from below the
 * baseline — a mask reveal rather than a fade, which is what makes it read as
 * typography rather than as an animation effect.
 *
 * Words are inline-block so native line wrapping still works at every viewport;
 * the reveal never breaks the responsive type scale.
 */
export function TextReveal({
  text,
  className,
  as: Component = "h2",
  delay = 0,
  gap = 0.045,
  highlight = [],
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  const highlighted = new Set(
    highlight.map((w) => w.toLowerCase().replace(/[.,]/g, "")),
  );

  const isHighlighted = (word: string) =>
    highlighted.has(word.toLowerCase().replace(/[.,]/g, ""));

  if (reduced) {
    return (
      <Component className={className}>
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className={isHighlighted(word) ? "text-gold-gradient" : undefined}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </Component>
    );
  }

  return (
    <Component className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: gap, delayChildren: delay } },
        }}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            /* pb/-mb gives descenders room so the mask never clips a "g" or "y". */
            className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom"
          >
            <motion.span
              className={cn(
                "inline-block",
                isHighlighted(word) && "text-gold-gradient",
              )}
              variants={{
                hidden: { y: "110%" },
                visible: {
                  y: 0,
                  transition: { duration: 0.85, ease: EASE },
                },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? <span>&nbsp;</span> : null}
          </span>
        ))}
      </motion.span>
    </Component>
  );
}
