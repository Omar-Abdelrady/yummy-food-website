import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark" | "gold" | "glass";
}

const tones = {
  light: "border-ink/10 bg-white/90 text-ink",
  dark: "border-white/12 bg-ink/85 text-white",
  gold: "border-gold-400/35 bg-gold-50 text-gold-700",
  glass: "glass-dark text-white",
};

export function Badge({ children, className, tone = "light" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.14em] backdrop-blur-md",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
