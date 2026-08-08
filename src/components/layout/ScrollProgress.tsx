"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Hairline gold progress bar under the header.
 *
 * Not decoration: on a long corporate page it tells a skimming buyer how much
 * proof is left, which measurably reduces early bounce. Spring-smoothed so it
 * glides rather than jitters on trackpad scroll.
 *
 * Left visible under reduced motion — it is an indicator, not an animation, and
 * `scaleX` on a 2px bar causes no vestibular discomfort.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed left-0 top-[var(--header-h)] z-50 h-[2px] w-full origin-left bg-gradient-to-r from-gold-700 via-gold-400 to-gold-300"
    />
  );
}
