import type { Metadata } from "next";
import "./globals.css";

const SITE = "https://www.villamyassa.com";
const TITLE = "Villa Myassa – Ubud, Bali | Villa contemporaine avec piscine privée";
const DESC =
  "Villa Myassa à Ubud (Singakerta), Bali : 3 chambres, 3.5 salles de bain, piscine privée, gazebo, cuisine équipée. Idéal familles & amis. Réservez Bestay, Airbnb, Booking.com ou en direct.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESC,
  alternates: {
    canonical: "/",
    languages: {
      "fr": "/?lang=fr",
      "en": "/?lang=en",
      "id": "/?lang=id",
      "zh": "/?lang=zh",
    },
  },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Villa Myassa",
    title: TITLE,
    description: DESC,
    images: [{ url: "/photos/001-hero-piscine.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/photos/001-hero-piscine.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      {/* PAS DE HEADER ICI */}
      <body>
        <main>{children}</main>
        {/* (Optionnel) footer global si tu en veux un global :
        <footer className="text-center text-sm text-neutral-500 py-6">
          © {new Date().getFullYear()} Villa Myassa – Ubud, Bali.
        </footer> */}
      </body>
    </html>
  );
}
