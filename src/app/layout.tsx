import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Teko } from "next/font/google";
import Script from "next/script";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import {
  BUSINESS_ADDRESS,
  BUSINESS_CITY,
  BUSINESS_HOURS,
  BUSINESS_NAME,
  BUSINESS_TAGLINE,
  SITE_URL,
} from "@/lib/constants";
import "./globals.css";

const fontDisplay = Teko({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const fontBody = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Burger Premium | Hamburgueria artesanal",
    template: "%s | Burger Premium",
  },
  description:
    "Burger Premium: hamburgueria artesanal DEMO com delivery rapido, combos exclusivos e pedido facil pelo WhatsApp.",
  openGraph: {
    title: "Burger Premium | Hamburgueria artesanal",
    description:
      "Combos premium, blend da casa e batata rustica. Peça direto pelo WhatsApp.",
    url: SITE_URL,
    siteName: "Burger Premium",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Burger Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Burger Premium | Hamburgueria artesanal",
    description:
      "Combos premium, blend da casa e batata rustica. Peça direto pelo WhatsApp.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: BUSINESS_NAME,
    url: SITE_URL,
    description: BUSINESS_TAGLINE,
    servesCuisine: ["Hamburgueria", "Artesanal"],
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_ADDRESS,
      addressLocality: BUSINESS_CITY,
      addressCountry: "BR",
    },
    openingHours: BUSINESS_HOURS,
  };

  return (
    <html lang="pt-BR">
      <body
        className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} antialiased`}
      >
        <SiteHeader />
        <main className="min-h-screen">{children}</main>
        <SiteFooter />
        <Script
          id="restaurant-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
