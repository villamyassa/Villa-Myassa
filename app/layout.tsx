// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Villa Myassa — Ubud, Bali | Private Pool Villa",
  description:
    "Villa contemporaine avec piscine privée au cœur d’Ubud – BALI. 3 chambres, 3.5 sdb. Réservez sur Bestay.",
  openGraph: {
    title: "Villa Myassa — Ubud, Bali",
    description:
      "Villa contemporaine avec piscine privée au cœur d’Ubud – BALI. 3 chambres, 3.5 sdb. Réservez sur Bestay.",
    url: "https://www.villamyassa.com",
    type: "website",
  },
  metadataBase: new URL("https://www.villamyassa.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-neutral-900">{children}</body>
    </html>
  );
}
