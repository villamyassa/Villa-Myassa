// app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

/* ===== Drapeaux SVG inline (stables) ===== */
function FlagFR(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 3 2" width="18" height="12" aria-hidden {...props}>
      <rect width="1" height="2" x="0" y="0" fill="#0055A4" />
      <rect width="1" height="2" x="1" y="0" fill="#ffffff" />
      <rect width="1" height="2" x="2" y="0" fill="#EF4135" />
    </svg>
  );
}
function FlagUK(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 30" width="18" height="12" aria-hidden {...props}>
      <clipPath id="uk-s"><path d="M0,0v30h60V0z"/></clipPath>
      <clipPath id="uk-t"><path d="M30,15h30v15zV0H0v15z"/></clipPath>
      <g clipPath="url(#uk-s)">
        <path d="M0,0v30h60V0z" fill="#012169"/>
        <path d="M0,0L60,30M60,0L0,30" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0L60,30M60,0L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#uk-t)"/>
        <path d="M30,0v30M0,15h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0v30M0,15h60" stroke="#C8102E" strokeWidth="6"/>
      </g>
    </svg>
  );
}
function FlagID(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 3 2" width="18" height="12" aria-hidden {...props}>
      <rect width="3" height="1" y="0" fill="#CE1126"/>
      <rect width="3" height="1" y="1" fill="#ffffff"/>
    </svg>
  );
}
function FlagCN(props: React.SVGProps<SVGSVGElement>) {
  // simplifié mais clair pour une icône
  return (
    <svg viewBox="0 0 30 20" width="18" height="12" aria-hidden {...props}>
      <rect width="30" height="20" fill="#DE2910"/>
      <polygon points="5,3 6,6 3,4 7,4 4,6" fill="#FFDE00"/>
      <polygon points="10,4 10.8,4.8 9.7,4.7 10.7,4.2 10.3,5.3" fill="#FFDE00"/>
      <polygon points="11.5,5.5 12.3,6.3 11.2,6.2 12.2,5.7 11.8,6.8" fill="#FFDE00"/>
      <polygon points="11.6,7.5 12.4,8.3 11.3,8.2 12.3,7.7 11.9,8.8" fill="#FFDE00"/>
      <polygon points="10,8.8 10.8,9.6 9.7,9.5 10.7,9 10.3,10.1" fill="#FFDE00"/>
    </svg>
  );
}

/* ===== META (ton code d’origine) ===== */
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

/* ===== Layout ===== */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      {/* padding top pour que le header fixe ne recouvre pas le haut du contenu */}
      <body className="pt-14">
        {/* Header FIXE avec 4 drapeaux — mobile + desktop */}
        <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="mx-auto max-w-6xl px-4 py-2">
            <nav className="flex items-center justify-end gap-2 sm:gap-3 text-sm">
              <Link
                href="/"
                aria-label="Français"
                className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 hover:bg-gray-50"
              >
                <FlagFR />
                <span>FR</span>
              </Link>
              <Link
                href="/en"
                aria-label="English"
                className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 hover:bg-gray-50"
              >
                <FlagUK />
                <span>EN</span>
              </Link>
              <Link
                href="/id"
                aria-label="Bahasa Indonesia"
                className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 hover:bg-gray-50"
              >
                <FlagID />
                <span>ID</span>
              </Link>
              <Link
                href="/zh"
                aria-label="中文"
                className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 hover:bg-gray-50"
              >
                <FlagCN />
                <span>ZH</span>
              </Link>
            </nav>
          </div>
        </header>

        {/* Contenu du site */}
        {children}

        {/* Organization JSON-LD (inchangé) */}
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
