import Image from "next/image";
import Link from "next/link";
import { company } from "@/content";
import { asset, cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  tone?: "light" | "dark";
  /** Hides the wordmark on small screens where space is tight. */
  compact?: boolean;
}

/**
 * The supplied logo is a gold leaf mark above a gold wordmark on white. On dark
 * surfaces the raster wordmark would be illegible, so we crop to the mark and
 * set the wordmark as live type — which also makes it selectable and searchable.
 */
export function Logo({ className, tone = "light", compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label={`${company.tradeName} — home`}
    >
      <span
        className={cn(
          "relative block size-11 shrink-0 overflow-hidden rounded-lg",
          /* On dark surfaces the mark keeps its own white ground rather than
             blending — a gold-on-white chip reads as a logo, whereas a blended
             gold mark on charcoal loses its edges entirely. */
          tone === "dark" && "bg-white",
        )}
      >
        <Image
          src={asset("/products/yummy-food-logo.png")}
          alt=""
          width={200}
          height={200}
          priority
          /* The source PNG is a square lockup with the wordmark in the lower
             third; scaling up and clipping isolates the leaf mark cleanly. */
          className={cn(
            "absolute left-1/2 top-1/2 w-[210%] -translate-x-1/2 -translate-y-[58%] transition-transform duration-500 ease-brand group-hover:scale-105",
            tone === "light" && "mix-blend-multiply",
          )}
        />
      </span>

      {/* Hidden only on the narrowest phones, where the hamburger and CTA
          would otherwise crowd it. The leaf mark alone still reads as the
          brand at that size. */}
      <span
        className={cn(
          "flex flex-col leading-none",
          compact && "hidden min-[380px]:flex",
        )}
      >
        <span
          className={cn(
            "font-display text-[0.9375rem] font-semibold uppercase tracking-[0.2em]",
            tone === "light" ? "text-ink" : "text-white",
          )}
        >
          Yummy
        </span>
        <span
          className={cn(
            "font-display text-[0.9375rem] font-semibold uppercase tracking-[0.2em]",
            tone === "light" ? "text-gold-600" : "text-gold-300",
          )}
        >
          Food
        </span>
      </span>
    </Link>
  );
}
