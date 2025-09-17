// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://www.villamyassa.com";
const OG_IMAGE = `${SITE_URL}/photos/001-hero-piscine.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Villa Myassa | Ubud, Bali — Private Pool Villa (3BR)",
  description:
    "Villa contemporaine à Ubud, Bali : 3 chambres, 3,5 salles de bain, piscine privée, balé bengong. Visite 3D et réservation Bestay.",
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
      "en-US": "/",
      "id-ID": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Villa Myassa",
    title: "Villa Myassa | Ubud, Bali — Private Pool Villa (3BR)",
    description:
      "3BR villa with private pool in Ubud, Bali. Sunken lounge, outdoor bath, near Monkey Forest. 3D tour + booking.",
    locale: "fr_FR",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Villa Myassa — private pool in Ubud, Bali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Villa Myassa | Ubud, Bali — Private Pool Villa",
    description:
      "Villa à Ubud avec piscine privée. 3 chambres, 3,5 SDB. Visite 3D + réservation Bestay.",
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  // Si tu veux vérifier Search Console via meta :
  // verification: { google: "TON_TOKEN_GOOGLE_SEARCH_CONSOLE" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="antialiased bg-white text-neutral-900">
        {children}
      </body>
    </html>
  );
}
