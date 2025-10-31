// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const SITE = "https://www.villamyassa.com";
const TITLE =
  "Villa Myassa – Ubud, Bali | Villa contemporaine avec piscine privée";
const DESC =
  "Villa Myassa à Ubud (Singakerta), Bali : 3 chambres, 3.5 salles de bain, piscine privée, gazebo, cuisine équipée. Idéal familles & amis. Réservez Bestay, Airbnb, Booking.com ou en direct.";
const OG_IMAGE = `${SITE}/photos/001-hero-piscine.jpg`; // vérifie que ce fichier existe dans /public/photos/

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: TITLE,
    template: "%s | Villa Myassa",
  },
  description: DESC,
  alternates: {
    canonical: "/",
    languages: {
      fr: "/",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Villa Myassa",
    title: TITLE,
    description: DESC,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // --- JSON-LD: hébergement touristique ---
  const schemaLodging = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Villa Myassa",
    url: SITE,
    description:
      "Villa Myassa est une maison d'hôtes de charme à Ubud, Bali, offrant un séjour paisible dans un cadre tropical.",
    image: OG_IMAGE,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Singakerta, Ubud, Bali",
      addressCountry: "ID",
    },
    telephone: "+62 812 3456 7890",
    email: "contact@villamyassa.com",
    geo: { "@type": "GeoCoordinates", latitude: -8.539, longitude: 115.263 },
    sameAs: [
      "https://www.tiktok.com/@villa.myassa",
      "https://www.instagram.com/villa_myassa_luxe_bali/",
      "https://bestay.co/villa/villa-myassa",
      "https://www.airbnb.com/rooms/1505417552730386824",
      "https://www.booking.com/hotel/id/villa-myassa-by-balisuperhost.html",
    ],
  };

  // --- JSON-LD: organisation générale ---
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Villa Myassa",
    url: SITE,
    sameAs: [
      "https://www.tiktok.com/@villa.myassa",
      "https://www.instagram.com/villa_myassa_luxe_bali/",
      "https://bestay.co/villa/villa-myassa",
      "https://www.airbnb.com/rooms/1505417552730386824",
      "https://www.booking.com/hotel/id/villa-myassa-by-balisuperhost.html",
    ],
  };

  return (
    <html lang="fr">
      <head>
        {/* Hreflang pour FR / EN / x-default */}
        <link rel="alternate" hrefLang="fr" href={`${SITE}/`} />
        <link rel="alternate" hrefLang="en" href={`${SITE}/en`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE}/`} />

        {/* Données structurées JSON-LD */}
        <Script
          id="schema-lodging"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLodging) }}
        />
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>

      <body>{children}</body>
    </html>
  );
}
