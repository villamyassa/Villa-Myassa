/* app/layout.tsx — Server Component (OK pour export metadata) */
import type { Metadata } from "next";
import "./globals.css";

const site = "https://www.villamyassa.com/";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: "Villa Myassa — Ubud, Bali | Private Pool Villa",
  description:
    "Villa contemporaine avec piscine privée au cœur d’Ubud – BALI. 3 chambres, 3.5 sdb. Réservez sur Bestay.",
  alternates: {
    canonical: site,
    languages: {
      fr: `${site}?lang=fr`,
      en: `${site}?lang=en`,
    },
  },
  openGraph: {
    type: "website",
    url: site,
    title: "Villa Myassa — Ubud, Bali | Private Pool Villa",
    description:
      "Villa contemporaine avec piscine privée au cœur d’Ubud – BALI. 3 chambres, 3.5 sdb. Réservez sur Bestay.",
    images: [
      {
        url: "/photos/001-hero-piscine.jpg",
        width: 1200,
        height: 630,
        alt: "Villa Myassa – Piscine privée",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Villa Myassa — Ubud, Bali | Private Pool Villa",
    description:
      "Villa contemporaine avec piscine privée au cœur d’Ubud – BALI. 3 chambres, 3.5 sdb.",
    images: ["/photos/001-hero-piscine.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-neutral-900">{children}</body>
    </html>
  );
}
