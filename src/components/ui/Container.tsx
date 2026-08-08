import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** `wide` for gallery/hero bleed, `narrow` for long-form reading measure. */
  size?: "default" | "wide" | "narrow";
}

const sizes = {
  default: "max-w-[1280px]",
  wide: "max-w-[1520px]",
  narrow: "max-w-[860px]",
};

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-12",
        sizes[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
