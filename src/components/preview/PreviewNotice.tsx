"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { EASE } from "@/lib/utils";

/**
 * Client preview notice.
 *
 * A presentation-layer overlay only — it is mounted once in the root layout and
 * touches nothing in the site itself. Removing it before production is a
 * one-line deletion in `layout.tsx`.
 *
 * Design decisions, all inherited from the existing system rather than invented:
 *   – `glass-dark` is the site's own glass utility (6% white, 20px blur, 10%
 *     white hairline border), so the pill is made of the same material as the
 *     Why-Us and Featured-Services cards.
 *   – `rounded-xl3` and `--ease-brand` are the site's radius and easing tokens.
 *   – Gold is used as accent and light only, never as a fill — the same rule the
 *     rest of the site follows, and what keeps this from reading as a warning.
 *
 * Positioning avoids the hero's scroll indicator, which is centred at
 * `bottom-8` on desktop. This sits at the right on `lg` so the two never
 * collide, and returns to centre on mobile where the indicator is hidden.
 */
export function PreviewNotice() {
  const reduced = useReducedMotion();

  return (
    <motion.aside
      // `status` rather than `alert`: this is ambient context, not an
      // interruption, so it must not steal focus or preempt a screen reader.
      role="status"
      aria-label="Client preview mode"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.1, ease: EASE }}
      className="
        pointer-events-none fixed inset-x-3 bottom-3 z-[90]
        flex justify-center
        sm:inset-x-0 sm:bottom-5
        lg:justify-end lg:pr-6
      "
    >
      {/* Deliberately NOT the site's `glass-dark` utility. That utility is 6%
          white, tuned for the ink and charcoal sections it is used on; over the
          white and beige sections this pill floats above, it becomes a pale
          wash and white text on it fails contrast. This carries its own ink
          ground at 82% so the glass reads identically on every section, while
          keeping the same blur, hairline border and radius as the rest of the
          system. */}
      <div
        className="
          group pointer-events-auto
          flex max-w-[30rem] items-start gap-3 rounded-xl3
          border border-white/12 bg-ink/82 px-4 py-3
          shadow-[0_18px_50px_-18px_rgba(11,11,12,0.7)]
          backdrop-blur-xl backdrop-saturate-150
          transition-all duration-500 ease-brand
          hover:border-gold-400/35 hover:bg-ink/88
          sm:gap-3.5 sm:px-5 sm:py-3.5
        "
      >
        <span
          aria-hidden="true"
          className="
            mt-0.5 inline-flex size-7 shrink-0 items-center justify-center
            rounded-full border border-gold-400/25 bg-gold-500/10 text-gold-300
            transition-colors duration-500 group-hover:border-gold-400/50
          "
        >
          <Sparkles className="size-3.5" strokeWidth={1.7} />
        </span>

        <div className="min-w-0">
          <p className="font-display text-[0.8125rem] font-semibold leading-tight tracking-tight text-white">
            Interactive Design Preview
          </p>
          <p className="mt-1 text-[0.6875rem] leading-relaxed text-warm-300 sm:text-xs">
            This preview is provided for evaluation purposes only. Final website
            files and production deployment will be delivered after project
            approval.
          </p>
        </div>
      </div>
    </motion.aside>
  );
}
