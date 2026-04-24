import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { PRE_PAINT_THEME_SCRIPT } from "@/lib/theme";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description:
    "I build line-of-business systems with Odoo and Django, then go home and break things on my headless server for fun. Shipping since 2018.",
  openGraph: {
    title: SITE_NAME,
    description: "Odoo · Django · Next.js · self-hosting. Portfolio + terminal.",
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: "Odoo · Django · Next.js · self-hosting. Portfolio + terminal.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#2a2b31" },
    { media: "(prefers-color-scheme: light)", color: "#fafaf7" },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Redick Butay",
  givenName: "Redick",
  familyName: "Butay",
  alternateName: "Red",
  jobTitle: "Software Developer",
  url: SITE_URL,
  description:
    "Software developer specializing in Odoo, Django, and self-hosted systems.",
  sameAs: [
    "https://github.com/reichie020212",
    "https://www.linkedin.com/in/redick-butay-705616139/",
  ],
  email: "mailto:redickbutay02@gmail.com",
  knowsAbout: ["Odoo", "Django", "Next.js", "PostgreSQL", "Linux", "Docker"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: PRE_PAINT_THEME_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
