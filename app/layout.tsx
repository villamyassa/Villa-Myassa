// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

/**
 * Petit composant client qui "branche" des gestionnaires de clic
 * sur les pastilles de langue existantes (FR / EN) même si ce ne sont pas des <a>.
 * Aucun changement visuel : on ajoute juste le comportement de lien.
 */
function LangFixer() {
  // marquage "use client" implicite via composant inline
  // (Next 13/14 : un composant utilisé dans le RSC ne devient pas client,
  // on force en utilisant un effet via <script> ci-dessous)
  return (
    <script
      // s'exécute après hydratation
      dangerouslySetInnerHTML={{
        __html: `
(function () {
  try {
    var toPath = function (code) {
      if (code === 'FR') return '/';
      if (code === 'EN') return '/en';
      return null;
    };

    var enhance = function () {
      var nodes = Array.from(document.querySelectorAll('*'))
        .filter(function (el) {
          if (el.tagName === 'A') return false;                // déjà un lien
          var txt = (el.textContent || '').trim().toUpperCase();
          // On cible uniquement les pastilles de langue
          var isLang = (txt === 'FR' || txt === 'EN');
          // Évite les éléments invisibles
          var visible = !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
          return isLang && visible;
        });

      nodes.forEach(function (el) {
        var code = (el.textContent || '').trim().toUpperCase();
        var href = toPath(code);
        if (!href) return;

        if (!el.dataset.langFixBound) {
          el.dataset.langFixBound = '1';
          el.style.cursor = 'pointer';
          el.setAttribute('role', 'link');
          el.setAttribute('tabindex', '0');

          var go = function (e) {
            // évite de déclencher si déjà à l'intérieur d'un vrai lien
            var insideLink = e.target.closest && e.target.closest('a');
            if (insideLink) return;
            window.location.assign(href);
          };

          el.addEventListener('click', go);
          el.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(e); }
          });
        }
      });
    };

    // première passe
    enhance();

    // Surveille les changements de DOM (si tes pastilles se montent après)
    var mo = new MutationObserver(function () { enhance(); });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  } catch (e) { /* no-op */ }
})();
        `,
      }}
    />
  );
}

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
        {/* ⛔️ AUCUN drapeau ajouté en haut à droite */}
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

        {/* Active les pastilles FR/EN déjà présentes dans ton UI */}
        <LangFixer />
      </body>
    </html>
  );
}
