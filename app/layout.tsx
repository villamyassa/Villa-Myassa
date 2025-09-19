// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

const SITE = "https://www.villamyassa.com";
const TITLE = "Villa Myassa – Ubud, Bali | Villa contemporaine avec piscine privée";
const DESC =
  "Villa Myassa à Ubud (Singakerta), Bali : 3 chambres, 3.5 salles de bain, piscine privée, gazebo, cuisine équipée. Idéal familles & amis. Réservez sur Bestay, Airbnb, Booking.com ou en direct.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESC,
  alternates: {
    canonical: "/",
    languages: {
      // home multilingue via param ?lang=
      "fr": "/?lang=fr",
      "en": "/?lang=en",
      "id": "/?lang=id",
      "fr-FR": "/?lang=fr",
      "en-US": "/?lang=en",
      "id-ID": "/?lang=id",
      // pages SEO dédiées
      "fr;/fr/villa-ubud-piscine-privee": "/fr/villa-ubud-piscine-privee",
      "en;/en/ubud-villa-private-pool": "/en/ubud-villa-private-pool",
      "id;/id/vila-ubud-kolam-renang-pribadi": "/id/vila-ubud-kolam-renang-pribadi",
    },
  },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Villa Myassa",
    title: TITLE,
    description: DESC,
    images: [
      {
        url: "/photos/001-hero-piscine.jpg",
        width: 1200,
        height: 630,
        alt: "Villa Myassa Ubud Bali – Piscine privée",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/photos/001-hero-piscine.jpg"],
  },
  robots: { index: true, follow: true },
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>

      {/* Organization JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Villa Myassa",
            url: SITE,
            logo: `${SITE}/photos/001-hero-piscine.jpg`,
            sameAs: [
              "https://www.tiktok.com/@villa.myassa",
              "https://www.instagram.com/villa_myassa_luxe_bali/",
              "https://bestay.co/villa/villa-myassa",
              "https://www.airbnb.com/rooms/1505417552730386824",
              "https://www.booking.com/hotel/id/villa-myassa-by-balisuperhost.html",
            ],
          }),
        }}
      />
    </html>
  );
}
