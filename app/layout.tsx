import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.villamyassa.com"),
  title: "Villa Myassa — Ubud, Bali | Private Pool Villa",
  description:
    "Contemporary 3BR villa with private pool in Ubud, Bali. 3.5 bathrooms. Book on Bestay.",
  alternates: {
    canonical: "/",
    languages: {
      fr: "/?lang=fr",
      en: "/?lang=en",
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Villa Myassa — Ubud, Bali | Private Pool Villa",
    description:
      "Contemporary 3BR villa with private pool in Ubud, Bali.",
    images: [{ url: "/photos/001-hero-piscine.jpg", width: 1600, height: 900 }],
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Villa Myassa — Ubud, Bali",
    description:
      "Contemporary 3BR villa with private pool in Ubud, Bali.",
    images: ["/photos/001-hero-piscine.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        {/* Preload hero for faster LCP */}
        <link
          rel="preload"
          as="image"
          href="/photos/001-hero-piscine.jpg"
          imagesrcset="/photos/001-hero-piscine.jpg 1600w"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
