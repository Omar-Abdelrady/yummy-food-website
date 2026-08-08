import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { socialIcons } from "@/components/ui/SocialIcons";
import { company, getCategories, getServices } from "@/content";
import { navigation } from "@/lib/utils";

/**
 * The footer is where the verification visitor lands to confirm the company is
 * real, so it leads with the full legal entity name and the physical plant
 * address. That does more for trust than any hero headline above it.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const categories = getCategories();
  const services = getServices();

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      {/* Warm gold wash from below — stops the black reading as flat. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] bg-[radial-gradient(70%_100%_at_50%_100%,rgba(201,162,39,0.13),transparent_70%)]"
      />

      <Container className="relative py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Identity */}
          <div className="lg:col-span-4">
            <Logo tone="dark" />
            <p className="mt-6 max-w-[34ch] text-[0.9375rem] leading-relaxed text-warm-300">
              Instant, cup and dried noodles manufactured in Badr City, Egypt.
              Halal certified, packaged in four languages, export-ready from
              three independent production lines.
            </p>

            <p
              lang="zh"
              className="mt-6 text-2xl font-medium tracking-[0.2em] text-gold-300/70"
            >
              {company.subBrand}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-warm-500">
              {company.subBrandMeaning}
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-gold-300">
              Quick links
            </h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products */}
          <div className="lg:col-span-2">
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-gold-300">
              Products
            </h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              {categories.map((category) => (
                <li key={category.slug}>
                  <FooterLink href={`/products?category=${category.slug}`}>
                    {category.title}
                  </FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href="/products">All products</FooterLink>
              </li>
            </ul>

            <h2 className="mt-10 text-xs font-medium uppercase tracking-[0.2em] text-gold-300">
              Services
            </h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              {services.slice(0, 3).map((service) => (
                <li key={service.slug}>
                  <FooterLink href={`/services/${service.slug}`}>
                    {service.title}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-gold-300">
              Contact
            </h2>

            <address className="mt-6 flex flex-col gap-4 not-italic">
              <p className="flex gap-3 text-[0.9375rem] leading-relaxed text-warm-300">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-gold-400"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <span>
                  {company.address.line1}, {company.address.line2}
                  <br />
                  {company.address.city}, {company.address.country}
                </span>
              </p>

              <p className="flex gap-3 text-[0.9375rem] text-warm-300">
                <Phone
                  className="mt-0.5 size-4 shrink-0 text-gold-400"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <span className="flex flex-col gap-1">
                  {company.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="transition-colors duration-300 hover:text-gold-300"
                    >
                      {phone}
                    </a>
                  ))}
                </span>
              </p>

              <p className="flex gap-3 text-[0.9375rem] text-warm-300">
                <Mail
                  className="mt-0.5 size-4 shrink-0 text-gold-400"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <span className="flex flex-col gap-1">
                  {company.emails.slice(0, 2).map((email) => (
                    <a
                      key={email.value}
                      href={`mailto:${email.value}`}
                      className="transition-colors duration-300 hover:text-gold-300"
                    >
                      {email.value}
                    </a>
                  ))}
                </span>
              </p>
            </address>

            <div className="mt-7">
              <h3 className="text-xs uppercase tracking-[0.18em] text-warm-500">
                Working hours
              </h3>
              <ul className="mt-3 flex flex-col gap-1.5 text-sm text-warm-300">
                {company.hours.map((entry) => (
                  <li key={entry.days} className="flex justify-between gap-6">
                    <span>{entry.days}</span>
                    <span className="text-warm-400">{entry.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="mt-7 flex items-center gap-2.5">
              {company.social.map((item) => {
                const Icon =
                  socialIcons[item.icon as keyof typeof socialIcons];
                if (!Icon) return null;
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${company.tradeName} on ${item.label}`}
                      className="inline-flex size-10 items-center justify-center rounded-full border border-white/12 text-warm-300 transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:border-gold-400/50 hover:text-gold-300"
                    >
                      <Icon className="size-4" strokeWidth={1.6} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-warm-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {company.registration.map((entry) => (
              <span key={entry.label}>
                {entry.label} {entry.value}
              </span>
            ))}
            <span className="text-gold-400">Made in Egypt</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-[0.9375rem] text-warm-300 transition-colors duration-300 hover:text-gold-300"
    >
      {children}
      <ArrowUpRight
        className="size-3.5 opacity-0 transition-all duration-300 ease-brand group-hover:translate-x-0.5 group-hover:opacity-100"
        strokeWidth={1.7}
        aria-hidden="true"
      />
    </Link>
  );
}
