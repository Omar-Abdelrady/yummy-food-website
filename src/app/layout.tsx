import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { company } from "@/content";
import { site } from "@/lib/utils";
import "./globals.css";

/* Self-hosted via next/font — no external request, no layout shift. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${company.tradeName} — Noodle Manufacturing in Egypt`,
    template: `%s — ${company.tradeName}`,
  },
  description: site.description,
  applicationName: company.tradeName,
  authors: [{ name: company.legalName }],
  generator: "Next.js",
  keywords: [
    "noodle manufacturer Egypt",
    "instant noodles manufacturer",
    "cup noodles supplier",
    "private label noodles",
    "OEM noodle manufacturing",
    "halal instant noodles",
    "noodle export Egypt",
    "Badr City food manufacturing",
    "dried noodles supplier",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: company.tradeName,
    locale: "en_US",
    url: site.url,
    title: `${company.tradeName} — Noodle Manufacturing in Egypt`,
    description: site.description,
    images: [
      {
        url: "/products/spicy-beef-noodles.png",
        width: 1200,
        height: 630,
        alt: `${company.tradeName} instant noodle packaging`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.tradeName} — Noodle Manufacturing in Egypt`,
    description: site.description,
    images: ["/products/spicy-beef-noodles.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Food Manufacturing",
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "light",
};

/**
 * Organization structured data. Gives search engines the legal entity, the
 * plant address and the contact channels as facts rather than as scraped text —
 * which is what produces a knowledge panel for a company nobody has heard of.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: company.tradeName,
  legalName: company.legalName,
  url: site.url,
  logo: `${site.url}/products/yummy-food-logo.png`,
  image: `${site.url}/products/spicy-beef-noodles.png`,
  description: site.description,
  foundingDate: company.founded,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${company.address.line1}, ${company.address.line2}`,
    addressLocality: company.address.city,
    addressCountry: "EG",
  },
  contactPoint: company.emails.map((email) => ({
    "@type": "ContactPoint",
    contactType: email.label,
    email: email.value,
    telephone: company.phones[0],
    availableLanguage: ["en", "ar", "zh"],
  })),
  sameAs: company.social.map((s) => s.href),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>

        <Header />
        <ScrollProgress />

        <main id="main">{children}</main>

        <Footer />

        <script
          type="application/ld+json"
          // Static, developer-authored object — no user input reaches this.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </body>
    </html>
  );
}
