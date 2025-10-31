// app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

/* =======================
   Petits drapeaux inline (SVG)
   ======================= */
function FlagFR(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 3 2" width="20" height="14" {...props}>
      <rect width="1" height="2" x="0" y="0" fill="#0055A4" />
      <rect width="1" height="2" x="1" y="0" fill="#ffffff" />
      <rect width="1" height="2" x="2" y="0" fill="#EF4135" />
    </svg>
  );
}

// Union Jack simplifié (assez fidèle pour une icône)
function FlagUK(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 30" width="20" height="14" {...props}>
      <clipPath id="s">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="t">
        <path d="M30,15 h30 v15 z v-30 z H0 v15 z" />
      </clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          stroke="#C8102E"
          strokeWidth="4"
          clipPath="url(#t)"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

/* =======================
   META (ton code d’origine)
   ======================= */
const SITE = "https://www.villamyassa.com";
const TITLE =
  "Villa Myassa – Ubud, Bali | Villa contemporaine avec piscine privée";
const DESC =
  "Villa Myassa à Ubud (Singakerta), Bali : 3 chambres, 3.5 salles de bain, piscine privée, gazebo, cuisine équipée. Idéal familles & amis. Réservez Bestay, Airbnb, Booking.com ou en direct.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/" },
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

/* =======================
   Layout
   ======================= */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {/* --- CONTENU EXISTANT --- */}
        {children}

        {/* --- Sélecteur de langue FIXE avec DRAPEAUX (FR/EN) --- */}
        <div
          aria-label="Sélecteur de langue"
          className="fixed bottom-4 right-4 z-[100] rounded-full border bg-white/95 px-2 py-2 shadow-lg backdrop-blur"
        >
          <nav className="flex items-center gap-2">
            <Link
              href="/"
              aria-label="Français"
              className="inline-flex items-center gap-1 rounded-full border px-2 py-1 hover:bg-gray-50"
            >
              <FlagFR />
              <span className="text-sm font-medium">FR</span>
            </Link>
            <Link
              href="/en"
              aria-label="English"
              className="inline-flex items-center gap-1 rounded-full border px-2 py-1 hover:bg-gray-50"
            >
              <FlagUK />
              <span className="text-sm font-medium">EN</span>
            </Link>
          </nav>
        </div>

        {/* --- Organization JSON-LD (d’origine) --- */}
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
