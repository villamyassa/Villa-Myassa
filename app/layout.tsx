// app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

/* ====== DRAPEAUX SVG (inline, stables) ====== */
function FlagFR(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 3 2" width="20" height="14" {...props}>
      <rect width="1" height="2" x="0" y="0" fill="#0055A4" />
      <rect width="1" height="2" x="1" y="0" fill="#ffffff" />
      <rect width="1" height="2" x="2" y="0" fill="#EF4135" />
    </svg>
  );
}
function FlagUK(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 30" width="20" height="14" {...props}>
      <clipPath id="u-s"><path d="M0,0v30h60V0z"/></clipPath>
      <clipPath id="u-t"><path d="M30,15h30v15zV0H0v15z"/></clipPath>
      <g clipPath="url(#u-s)">
        <path d="M0,0v30h60V0z" fill="#012169"/>
        <path d="M0,0L60,30M60,0L0,30" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0L60,30M60,0L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#u-t)"/>
        <path d="M30,0v30M0,15h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0v30M0,15h60" stroke="#C8102E" strokeWidth="6"/>
      </g>
    </svg>
  );
}
function FlagID(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 3 2" width="20" height="14" {...props}>
      <rect width="3" height="1" y="0" fill="#CE1126"/>
      <rect width="3" height="1" y="1" fill="#ffffff"/>
    </svg>
  );
}
function FlagCN(props: React.SVGProps<SVGSVGElement>) {
  // Drapeau CN simplifié (étoiles minimalistes)
  return (
    <svg viewBox="0 0 30 20" width="20" height="14" {...props}>
      <rect width="30" height="20" fill="#DE2910"/>
      <polygon points="4,2 5,5 2,3 6,3 3,5" fill="#FFDE00"/>
      <polygon points="9,3.5 9.8,4.3 8.7,4.2 9.7,3.7 9.3,4.8" fill="#FFDE00"/>
      <polygon points="10.5,5 11.3,5.8 10.2,5.7 11.2,5.2 10.8,6.3" fill="#FFDE00"/>
      <polygon points="10.6,7 11.4,7.8 10.3,7.7 11.3,7.2 10.9,8.3" fill="#FFDE00"/>
      <polygon points="9,8.3 9.8,9.1 8.7,9 9.7,8.5 9.3,9.6" fill="#FFDE00"/>
    </svg>
  );
}

/* ====== META (inchangé) ====== */
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

/* ====== LAYOUT ====== */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}

        {/* Sélecteur de langue FIXE (FR / EN / ID / ZH) */}
        <div
          aria-label="Language selector"
          className="fixed bottom-4 right-4 z-[100] rounded-full border bg-white/95 px-2 py-2 shadow-lg backdrop-blur"
        >
          <nav className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1 rounded-full border px-2 py-1 hover:bg-gray-50"
              aria-label="Français"
            >
              <FlagFR />
              <span className="text-sm font-medium">FR</span>
            </Link>
            <Link
              href="/en"
              className="inline-flex items-center gap-1 rounded-full border px-2 py-1 hover:bg-gray-50"
              aria-label="English"
            >
              <FlagUK />
              <span className="text-sm font-medium">EN</span>
            </Link>
            <Link
              href="/id"
              className="inline-flex items-center gap-1 rounded-full border px-2 py-1 hover:bg-gray-50"
              aria-label="Bahasa Indonesia"
            >
              <FlagID />
              <span className="text-sm font-medium">ID</span>
            </Link>
            <Link
              href="/zh"
              className="inline-flex items-center gap-1 rounded-full border px-2 py-1 hover:bg-gray-50"
              aria-label="中文"
            >
              <FlagCN />
              <span className="text-sm font-medium">ZH</span>
            </Link>
          </nav>
        </div>

        {/* JSON-LD (inchangé) */}
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
