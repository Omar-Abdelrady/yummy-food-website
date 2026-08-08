import {
  BadgeCheck,
  Factory,
  Package,
  ScanLine,
  Settings2,
  Ship,
  Tags,
  Truck,
} from "lucide-react";

/**
 * Whitelisted icon renderers.
 *
 * Content stores an icon *name*, not a component, so the content layer stays
 * serialisable and CMS-ready. Resolving through a fixed map means an unknown
 * name from a future CMS can only fall back to a default — it can never reach
 * into the icon library arbitrarily.
 *
 * The map holds render *functions* rather than component references, so
 * nothing is treated as a newly-created component type on each render. A
 * component identity that changes between renders would remount the subtree
 * and throw away any animation state attached to it.
 */
const renderers = {
  // Services
  Factory: (p: IconProps) => <Factory {...p} />,
  Tags: (p: IconProps) => <Tags {...p} />,
  Settings2: (p: IconProps) => <Settings2 {...p} />,
  Ship: (p: IconProps) => <Ship {...p} />,
  Truck: (p: IconProps) => <Truck {...p} />,
  // Company values
  ScanLine: (p: IconProps) => <ScanLine {...p} />,
  Package: (p: IconProps) => <Package {...p} />,
  BadgeCheck: (p: IconProps) => <BadgeCheck {...p} />,
} as const;

interface IconProps {
  className?: string;
  strokeWidth?: number;
  "aria-hidden"?: boolean;
}

interface ServiceIconProps {
  /** Icon name from the content layer. Unknown names fall back to `Factory`. */
  name: string;
  className?: string;
  strokeWidth?: number;
}

export function ServiceIcon({
  name,
  className,
  strokeWidth = 1.55,
}: ServiceIconProps) {
  const render =
    renderers[name as keyof typeof renderers] ?? renderers.Factory;
  return render({ className, strokeWidth, "aria-hidden": true });
}
