import type { Metadata } from "next";
import Script from "next/script";
import { Archivo, Source_Serif_4 } from "next/font/google";
import { RevealObserver } from "@/components/site/reveal-observer";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import {
  BUSINESS_ADDRESS,
  BUSINESS_NAME,
  SITE_URL,
} from "@/lib/constants";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

const body = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-texto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Burger Premium | Hamburgueria artesanal em Botafogo (DEMO)",
    template: "%s | Burger Premium",
  },
  description:
    "Demonstração de site para hamburgueria: cardápio, combos e pedido pelo WhatsApp. Marca fictícia para apresentação.",
  alternates: { canonical: "/" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Burger Premium",
    description:
      "Blend da casa, pão brioche e batata rústica. Monte o pedido e envie pelo WhatsApp.",
    url: SITE_URL,
    siteName: BUSINESS_NAME,
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: BUSINESS_NAME,
  description:
    "Hamburgueria artesanal em Botafogo, no Rio de Janeiro. Marca fictícia para demonstração.",
  url: SITE_URL,
  servesCuisine: "Hambúrguer",
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS_ADDRESS.split(" - ")[0],
    addressLocality: "Rio de Janeiro",
    addressRegion: "RJ",
    addressCountry: "BR",
  },
  openingHours: "Tu-Su 12:00-23:00",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marca "js" antes da primeira pintura: os estados de animação só valem com script. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <SiteHeader />
        <main id="conteudo">{children}</main>
        <SiteFooter />
        <RevealObserver />
        <Script
          id="ld-restaurant"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(restaurantSchema)}
        </Script>
      </body>
    </html>
  );
}
