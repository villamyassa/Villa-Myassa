// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://www.villamyassa.com";
const siteName = "Villa Myassa – Ubud, Bali";
const siteDesc =
  "Villa Myassa à Ubud (Bali) : 3 chambres, piscine privée, design contemporain, proche Monkey Forest et centre d’Ubud. Réservez votre séjour tropical.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s • Villa Myassa – Ubud, Bali",
  },
  description: siteDesc,
  alternates: {
    canonical: siteUrl,
    // Si plus tard tu crées de vraies pages par langue (/fr, /en, /id), mets-les ici :
    // languages: { "fr": `${siteUrl}/fr`, "en": `${siteUrl}/en`, "id": `${siteUrl}/id` },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteName,
    siteName: "Villa Myassa",
    description: siteDesc,
    images: [
      {
        url: "/photos/001-hero-piscine.jpg",
        width: 1200,
        height: 630,
        alt: "Villa Myassa – Piscine privée à Ubud, Bali",
      },
    ],
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDesc,
    images: ["/photos/001-hero-piscine.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  // peu utile aujourd’hui mais demandé : mots-clés
  keywords: [
    "villa Ubud",
    "villa Bali",
    "villa avec piscine Ubud",
    "location villa Ubud",
    "vacances Bali",
    "Villa Myassa",
    "private pool villa Ubud",
    "sewa vila Ubud",
  ],
  // pour les assistants IA (hints)
  other: {
    "x-robots-tag": "all",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
