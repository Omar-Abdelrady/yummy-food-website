import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "outlineDark";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-tight whitespace-nowrap transition-all duration-300 ease-brand disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  /* Gold gradient on ink. Gold is used as light, never as a flat fill. */
  primary:
    "bg-ink text-white shadow-[0_1px_2px_rgba(11,11,12,0.28),inset_0_1px_0_rgba(255,255,255,0.09)] hover:shadow-[0_14px_36px_-10px_rgba(201,162,39,0.55)]",
  secondary:
    "border border-ink/12 bg-white text-ink hover:border-gold-400/60 hover:bg-beige hover:shadow-[0_10px_30px_-14px_rgba(11,11,12,0.22)]",
  ghost: "text-ink hover:text-gold-600",
  onDark:
    "bg-white text-ink hover:shadow-[0_14px_36px_-10px_rgba(201,162,39,0.6)]",
  outlineDark:
    "glass-dark text-white hover:border-gold-400/50 hover:bg-white/12",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-sm",
  lg: "h-[3.25rem] px-7 text-[0.9375rem]",
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Trailing icon. Animates on hover via the parent `group`. */
  icon?: ReactNode;
}

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    icon,
    ...rest
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {icon ? (
        <span className="relative z-10 transition-transform duration-300 ease-brand group-hover:translate-x-0.5">
          {icon}
        </span>
      ) : null}
      {/* Gold sheen — above the ink fill, beneath the label. Deliberately kept
          in the gold-700/800 range: white-on-gold-400 would drop below 4.5:1,
          so the hover state uses deep gold rather than bright gold. */}
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-900 via-gold-700 to-gold-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </>
  );

  if (props.href !== undefined) {
    const { href, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonAsButton)}>
      {content}
    </button>
  );
}
