import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Villa Myassa — Ubud, Bali | Private Pool Villa",
  description:
    "Villa contemporaine avec piscine privée au cœur d’Ubud – BALI. 3 chambres, 3.5 sdb. Réservez sur Bestay.",
  metadataBase: new URL("https://www.villamyassa.com"),
  openGraph: {
    title: "Villa Myassa — Ubud, Bali | Private Pool Villa",
    description:
      "Villa contemporaine avec piscine privée au cœur d’Ubud – BALI. 3 chambres, 3.5 sdb. Réservez sur Bestay.",
    url: "https://www.villamyassa.com",
    siteName: "Villa Myassa",
    images: ["/photos/001-hero-piscine.jpg"],
    locale: "fr_FR",
    type: "website",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
