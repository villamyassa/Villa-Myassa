// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const SITE_URL = "https://www.villamyassa.com";
const OG_IMAGE = `${SITE_URL}/photos/001-hero-piscine.jpg`;

// ⚠️ REMPLACE ces IDs par les tiens
const META_PIXEL_ID = "YOUR_META_PIXEL_ID";
const TIKTOK_PIXEL_ID = "YOUR_TIKTOK_PIXEL_ID";

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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            try {
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            } catch(e) { console.warn('Meta Pixel init error', e); }
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`} alt="" />
        </noscript>

        {/* TikTok Pixel */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject = t; var tt = w[t] = w[t] || [];
              tt.methods = ["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie"];
              tt.setAndDefer = function(t,e){ t[e] = function(){ t.push([e].concat(Array.prototype.slice.call(arguments,0))) } };
              for (var i = 0; i < tt.methods.length; i++) tt.setAndDefer(tt, tt.methods[i]);
              tt.load = function(e, n){ var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
                tt._i = tt._i || {}; tt._i[e] = []; tt._i[e]._u = i; tt._t = tt._t || {}; tt._t[e] = +new Date;
                var o = document.createElement("script"); o.type = "text/javascript"; o.async = !0; o.src = i + "?sdkid=" + e + "&lib=" + t;
                var a = document.getElementsByTagName("script")[0]; a.parentNode.insertBefore(o, a)
              };
              tt.load('${TIKTOK_PIXEL_ID}');
              tt.page();
            }(window, document, 'ttq');
            try { ttq.track('ViewContent'); } catch(e) { console.warn('TikTok Pixel error', e); }
          `}
        </Script>

        {/* Expose helpers for lib/analytics.ts (optionnel) */}
        <Script id="analytics-globals" strategy="afterInteractive">
          {`
            window.__vm_fbq = (...args) => { try { window.fbq && window.fbq(...args); } catch(e) {} };
            window.__vm_ttq = (...args) => { try { window.ttq && window.ttq[args[0]] ? window.ttq[args[0]](...args.slice(1)) : (window.ttq && window.ttq.track && window.ttq.track(args[0], ...args.slice(1))); } catch(e) {} };
          `}
        </Script>
      </head>
      <body className="antialiased bg-white text-neutral-900">{children}</body>
    </html>
  );
}
