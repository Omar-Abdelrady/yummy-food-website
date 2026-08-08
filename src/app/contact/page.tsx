import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { socialIcons } from "@/components/ui/SocialIcons";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { company } from "@/content";
import { site } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Yummy Food in Badr City, Egypt — enquiries for products, private label, OEM manufacturing, export and distribution. We reply within one business day.",
  alternates: { canonical: "/contact" },
};

/**
 * Contact.
 *
 * Details on the left, form on the right: the eye reaches the form last, after
 * the address, phone number and hours have already established that there is a
 * real company at the other end of it.
 */
export default function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    company.address.mapQuery,
  )}&output=embed`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${site.url}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: company.legalName,
      telephone: company.phones[0],
      email: company.emails[0].value,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${company.address.line1}, ${company.address.line2}`,
        addressLocality: company.address.city,
        addressCountry: "EG",
      },
      openingHours: "Su-Th 09:00-17:00",
    },
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk."
        highlight={["talk."]}
        lede="Tell us the format, the volume and the market. Enquiries reach the person who can answer them — usually within one business day."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="bg-white pb-24 pt-16 lg:pb-32 lg:pt-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Details */}
            <div className="lg:col-span-5">
              <Eyebrow>Direct channels</Eyebrow>

              <div className="mt-10 flex flex-col gap-8">
                <ContactBlock icon={MapPin} label="Plant & head office">
                  <address className="not-italic leading-relaxed text-warm-500">
                    {company.address.line1}
                    <br />
                    {company.address.line2}
                    <br />
                    {company.address.city}, {company.address.country}
                  </address>
                </ContactBlock>

                <ContactBlock icon={Phone} label="Telephone">
                  <ul className="flex flex-col gap-1.5">
                    {company.phones.map((phone) => (
                      <li key={phone}>
                        <a
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="text-warm-500 transition-colors duration-300 hover:text-gold-700"
                        >
                          {phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </ContactBlock>

                <ContactBlock icon={Mail} label="Email">
                  <ul className="flex flex-col gap-2.5">
                    {company.emails.map((email) => (
                      <li key={email.value}>
                        <a
                          href={`mailto:${email.value}`}
                          className="group flex flex-col"
                        >
                          <span className="text-xs uppercase tracking-[0.14em] text-warm-400">
                            {email.label}
                          </span>
                          <span className="text-warm-500 transition-colors duration-300 group-hover:text-gold-700">
                            {email.value}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </ContactBlock>

                <ContactBlock icon={Clock} label="Working hours">
                  <ul className="flex flex-col gap-1.5">
                    {company.hours.map((entry) => (
                      <li
                        key={entry.days}
                        className="flex justify-between gap-6 text-warm-500"
                      >
                        <span>{entry.days}</span>
                        <span className="text-warm-400">{entry.time}</span>
                      </li>
                    ))}
                  </ul>
                </ContactBlock>
              </div>

              {/* Social */}
              <div className="mt-10 border-t border-ink/8 pt-8">
                <h2 className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-warm-400">
                  Follow us
                </h2>
                <ul className="mt-4 flex items-center gap-2.5">
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
                          className="inline-flex size-11 items-center justify-center rounded-full border border-ink/10 text-warm-500 transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:border-gold-400/60 hover:text-gold-700"
                        >
                          <Icon className="size-4" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <Suspense
                fallback={
                  <div
                    className="min-h-[36rem] rounded-xl3 border border-ink/8 bg-beige/40"
                    aria-hidden="true"
                  />
                }
              >
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>

      {/* Map — the strongest single trust signal on the site. Lazy-loaded so it
          costs nothing until it is scrolled into view. */}
      <section aria-labelledby="find-us" className="bg-beige pb-24 lg:pb-32">
        <Container>
          <h2 id="find-us" className="sr-only">
            Find us
          </h2>
          <Reveal>
            <div className="relative aspect-4/3 overflow-hidden rounded-xl3 border border-ink/8 bg-beige-deep sm:aspect-21/9">
              <iframe
                src={mapSrc}
                title={`Map showing ${company.tradeName} at ${company.address.full}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 size-full border-0"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}

function ContactBlock({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-5">
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-gold-400/30 bg-gold-50 text-gold-700">
        <Icon className="size-[1.15rem]" strokeWidth={1.6} aria-hidden="true" />
      </span>
      <div>
        <h2 className="font-display text-base font-semibold text-ink">
          {label}
        </h2>
        <div className="mt-2.5">{children}</div>
      </div>
    </div>
  );
}
