"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn, EASE, navigation } from "@/lib/utils";

/**
 * Fixed glass header.
 *
 * Two states: transparent-ish at the top of a page (so the hero reads full
 * height), and an opaque glass bar once scrolled — which is what keeps nav
 * labels legible over the gallery and product imagery further down.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Only commit a change, so mounting at scrollY 0 does not trigger a
    // second render just to store the value it already has.
    const onScroll = () => {
      const next = window.scrollY > 24;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The drawer is closed by the links themselves (see `onClick` below) rather
  // than by an effect watching `pathname` — closing is a consequence of the
  // click, so it belongs in the event handler.

  // Lock background scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[var(--header-h)] transition-all duration-500 ease-brand",
          scrolled
            ? "glass-light border-b border-ink/6 shadow-[0_1px_30px_-12px_rgba(11,11,12,0.18)]"
            : "border-b border-transparent bg-white/45 backdrop-blur-sm",
        )}
      >
        <Container className="flex h-full items-center justify-between gap-8">
          <Logo compact />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "group relative inline-flex h-10 items-center rounded-full px-4 text-sm font-medium transition-colors duration-300",
                      isActive(item.href)
                        ? "text-ink"
                        : "text-warm-500 hover:text-ink",
                    )}
                  >
                    {item.label}
                    {/* Gold underline: full width when active, grows on hover. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-4 bottom-1.5 h-px origin-left rule-gold transition-transform duration-500 ease-brand",
                        isActive(item.href)
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              href="/contact"
              size="sm"
              className="hidden sm:inline-flex"
              icon={<ArrowRight className="size-4" strokeWidth={1.8} />}
            >
              Get in touch
            </Button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex size-11 items-center justify-center rounded-full border border-ink/10 bg-white/70 text-ink transition-colors duration-300 hover:border-gold-400/60 lg:hidden"
            >
              {open ? (
                <X className="size-5" strokeWidth={1.7} />
              ) : (
                <Menu className="size-5" strokeWidth={1.7} />
              )}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              aria-label="Mobile"
              initial={{ y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.42, ease: EASE }}
              className="absolute inset-x-3 top-[calc(var(--header-h)+0.5rem)] rounded-xl3 border border-white/12 bg-charcoal/95 p-3 shadow-[0_40px_80px_-30px_rgba(11,11,12,0.7)] backdrop-blur-xl"
            >
              <ul className="flex flex-col">
                {navigation.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.06 + i * 0.05,
                      ease: EASE,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-xl2 px-4 py-4 text-lg font-medium transition-colors duration-300",
                        isActive(item.href)
                          ? "bg-white/8 text-gold-300"
                          : "text-white/85 hover:bg-white/5",
                      )}
                    >
                      {item.label}
                      <ArrowRight
                        className="size-4 text-white/35"
                        strokeWidth={1.6}
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="p-3 pt-4">
                <Button
                  href="/contact"
                  variant="onDark"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Get in touch
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
