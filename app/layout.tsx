// app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const SITE = "https://www.villamyassa.com";
const TITLE =
  "Villa Myassa – Ubud, Bali | Villa contemporaine avec piscine privée";
const DESC =
  "Villa Myassa à Ubud (Singakerta), Bali : 3 chambres, 3.5 salles de bain, piscine privée, gazebo, cuisine équipée. Idéal familles & amis. Réservez Bestay, Airbnb, Booking.com ou en direct.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESC,
  alternates: {
    canonical: "/",
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
      <body>
        {/* Header visible partout (sticky + z-index) */}
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-end text-sm">
            <nav className="hidden md:flex items-center gap-3">
              <Link href="/" aria-label="Français" className="flex items-center gap-2 hover:opacity-80">
                <span role="img" aria-hidden>🇫🇷</span>
                <span>FR</span>
              </Link>
              <span className="opacity-40 select-none">|</span>
              <Link href="/en" aria-label="English" className="flex items-center gap-2 hover:opacity-80">
                <span role="img" aria-hidden>🇬🇧</span>
                <span>EN</span>
              </Link>
            </nav>
          </div>
        </header>

        {/* Sélecteur flottant spécial mobile (au cas où un autre header masque les drapeaux) */}
        <div className="fixed bottom-4 right-4 z-[60] md:hidden">
          <div className="flex items-center gap-2 rounded-full border bg-white/90 px-3 py-2 shadow-lg backdrop-blur">
            <Link href="/" aria-label="Français" className="flex items-center gap-1">
              <span role="img" aria-hidden>🇫🇷</span><span className="sr-only">FR</span>
            </Link>
            <span className="opacity-40 select-none">|</span>
            <Link href="/en" aria-label="English" className="flex items-center gap-1">
              <span role="img" aria-hidden>🇬🇧</span><span className="sr-only">EN</span>
            </Link>
          </div>
        </div>

        {children}

        {/* Organization JSON-LD (d’origine) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            }),
          }}
        />
      </body>
    </html>
  );
}
