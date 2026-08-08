import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getCategoryTitle, type Product } from "@/content";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

interface ProductCardProps {
  product: Product;
  className?: string;
  /** First row on a page gets `priority` so the LCP image is not lazy. */
  priority?: boolean;
  sizes?: string;
}

/**
 * The site's most-repeated component, so its quality sets the perceived
 * production value of everything else.
 *
 * Interaction stack, all on one 500ms brand curve:
 *   – card lifts 6px and gains a warm shadow
 *   – image scales 1.06 inside a clipped, rounded frame
 *   – a gold hairline traces the card border
 *   – the arrow affordance fades in and travels
 *
 * The whole card is one link. The arrow is decorative, not a second tab stop.
 */
export function ProductCard({
  product,
  className,
  priority = false,
  sizes = "(min-width:1280px) 400px, (min-width:768px) 45vw, 90vw",
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl3 border border-ink/8 bg-white",
        "transition-all duration-500 ease-brand",
        "hover:-translate-y-1.5 hover:border-gold-400/45 hover:shadow-[0_30px_70px_-30px_rgba(11,11,12,0.28),0_0_0_1px_rgba(201,162,39,0.14)]",
        className,
      )}
    >
      {/* Media */}
      <div className="relative aspect-[4/3.35] overflow-hidden bg-beige">
        {/* Warm radial ground so the cut-out pack does not float on flat colour. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_105%,rgba(201,162,39,0.16),transparent_62%)]"
        />
        <Image
          src={product.image}
          alt={`${product.name} packaging`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-contain p-7 transition-transform duration-[700ms] ease-brand group-hover:scale-[1.06] sm:p-9"
        />

        <div className="absolute left-5 top-5 z-10 flex flex-col items-start gap-2">
          <Badge>{getCategoryTitle(product.category)}</Badge>
          {product.tier ? (
            <Badge tone="gold" className="hidden sm:inline-flex">
              {product.tier}
            </Badge>
          ) : null}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 border-t border-ink/6 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          {/* min-h reserves two lines so a wrapping name does not shorten the
              body and misalign the metadata row across a grid of cards. */}
          <h3 className="text-d4 min-h-[2.3em] font-semibold text-ink transition-colors duration-300 group-hover:text-gold-700">
            {product.name}
          </h3>
          <span
            aria-hidden="true"
            className="mt-1 shrink-0 text-gold-600 opacity-0 transition-all duration-500 ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
          >
            <ArrowUpRight className="size-5" strokeWidth={1.6} />
          </span>
        </div>

        {product.nameZh ? (
          <p
            lang="zh"
            className="text-sm tracking-wide text-warm-400"
          >
            {product.nameZh}
            {product.nameAr ? (
              <>
                {/* The separator stays outside the RTL span — inside it, the
                    bidi algorithm flips it to the wrong side of the phrase. */}
                <span aria-hidden="true" className="mx-2">
                  ·
                </span>
                <span lang="ar" dir="rtl">
                  {product.nameAr}
                </span>
              </>
            ) : null}
          </p>
        ) : null}

        <p className="mt-auto text-[0.9375rem] leading-relaxed text-warm-500">
          {product.excerpt}
        </p>

        <span className="mt-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-warm-400">
          {product.specs.netWeight}
          <span aria-hidden="true" className="size-1 rounded-full bg-warm-300" />
          {product.specs.shelfLife.replace(" from production date", "")}
        </span>
      </div>
    </Link>
  );
}
