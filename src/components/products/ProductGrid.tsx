"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Category, Product } from "@/content";
import { cn, EASE } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  categories: (Category & { count: number })[];
}

/**
 * Filterable product grid.
 *
 * Filtering is client-side and instant: a ten-item catalogue must never make a
 * buyer wait or navigate. The initial filter is read from `?category=` so the
 * footer and homepage category cards can deep-link straight into a filtered
 * view, and the URL stays shareable.
 *
 * Layout animation is `AnimatePresence` + `layout`, so cards move to their new
 * positions rather than snapping — the detail that makes filtering feel
 * designed rather than merely functional.
 */
export function ProductGrid({ products, categories }: ProductGridProps) {
  const searchParams = useSearchParams();
  const initial = searchParams.get("category") ?? "all";
  const reduced = useReducedMotion();

  const [active, setActive] = useState<string>(
    categories.some((c) => c.slug === initial) ? initial : "all",
  );

  const filters = useMemo(
    () => [
      { slug: "all", label: "All products", count: products.length },
      ...categories.map((c) => ({
        slug: c.slug,
        label: c.shortTitle,
        count: c.count,
      })),
    ],
    [categories, products.length],
  );

  const visible = useMemo(
    () =>
      active === "all"
        ? products
        : products.filter((p) => p.category === active),
    [active, products],
  );

  return (
    <>
      {/* Filters */}
      <div
        role="group"
        aria-label="Filter products by category"
        className="flex flex-wrap gap-2"
      >
        {filters.map((filter) => {
          const isActive = active === filter.slug;
          return (
            <button
              key={filter.slug}
              type="button"
              onClick={() => setActive(filter.slug)}
              aria-pressed={isActive}
              className={cn(
                "group relative inline-flex h-11 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-all duration-400 ease-brand",
                isActive
                  ? "border-transparent bg-ink text-white"
                  : "border-ink/12 bg-white text-warm-500 hover:border-gold-400/60 hover:text-ink",
              )}
            >
              {filter.label}
              <span
                className={cn(
                  "text-xs tabular-nums transition-colors duration-300",
                  isActive ? "text-gold-300" : "text-warm-300",
                )}
              >
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div
        layout={!reduced}
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((product, i) => (
            <motion.div
              key={product.slug}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{
                duration: 0.45,
                delay: reduced ? 0 : Math.min(i * 0.05, 0.3),
                ease: EASE,
              }}
              className="h-full"
            >
              <ProductCard product={product} priority={i < 3} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Live region so filtering is announced to screen readers. */}
      <p aria-live="polite" className="sr-only">
        Showing {visible.length}{" "}
        {visible.length === 1 ? "product" : "products"}.
      </p>
    </>
  );
}
