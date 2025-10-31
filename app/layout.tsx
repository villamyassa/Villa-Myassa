// app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

/* ========= Drapeaux SVG inline (stables) ========= */
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

/* ========= SEO (comme validé) ========= */
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

/* ========= Layout ========= */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {/* ❌ PAS de drapeaux en haut à droite */}
        {children}

        {/* ✅ Sélecteur de langue STABLE (toujours visible, mobile + desktop) */}
        <div
          className="fixed bottom-4 right-4 z-[100] rounded-full border bg-white/95 px-2 py-2 shadow-lg backdrop-blur"
          aria-label="Sélecteur de langue"
        >
          <nav className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1 rounded-full border px-2 py-1 text-sm font-medium hover:bg-gray-50"
              aria-label="Français"
            >
              <FlagFR /><span>FR</span>
            </Link>
            <Link
              href="/en"
              className="inline-flex items-center gap-1 rounded-full border px-2 py-1 text-sm font-medium hover:bg-gray-50"
              aria-label="English"
            >
              <FlagUK /><span>EN</span>
            </Link>
            <Link
              href="/id"
              className="inline-flex items-center gap-1 rounded-full border px-2 py-1 text-sm font-medium hover:bg-gray-50"
              aria-label="Bahasa Indonesia"
            >
              <FlagID /><span>ID</span>
            </Link>
            <Link
              href="/zh"
              className="inline-flex items-center gap-1 rounded-full border px-2 py-1 text-sm font-medium hover:bg-gray-50"
              aria-label="中文"
            >
              <FlagCN /><span>ZH</span>
            </Link>
          </nav>
        </div>

        {/* JSON-LD Organisation (inchangé) */}
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
