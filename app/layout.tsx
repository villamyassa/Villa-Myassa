import type { Metadata } from "next";
import { headers } from "next/headers";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import MobileDescriptionToggle from "@/components/MobileDescriptionToggle";
import LocalizedSeoDiscoveryCard from "@/components/LocalizedSeoDiscoveryCard";
import BookingRedirect from "@/components/BookingRedirect";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["500", "600", "700"],
  display: "swap",
});

const VALID_LANGS = ["fr", "en", "id", "zh"];

function getLanguageFromPath(pathname: string | null) {
  if (!pathname) return "en";

  const firstPart = pathname.split("/").filter(Boolean)[0];

  if (VALID_LANGS.includes(firstPart)) {
    return firstPart;
  }

  return "en";
}

export const metadata: Metadata = {
  metadataBase: new URL("https://www.villamyassa.com"),
  title: "Villa Myassa Ubud | 3-Bedroom Private Pool Villa in Bali",
  description:
    "Villa Myassa is a private 3-bedroom villa with pool and tropical garden in Singakerta, Ubud, Bali.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = headers().get("x-pathname");
  const lang = getLanguageFromPath(pathname);

  return (
    <html lang={lang}>
      <head>
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '25598835056413193');
              fbq('track', 'PageView');
            `,
          }}
        />

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=25598835056413193&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>

      <body className={`${manrope.variable} ${cormorant.variable}`}>
        {children}
        <LocalizedSeoDiscoveryCard />
        <MobileDescriptionToggle />
        <BookingRedirect />
      </body>
    </html>
  );
}
