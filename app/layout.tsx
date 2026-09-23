import type { Metadata } from "next";
import { headers } from "next/headers";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import MobileDescriptionToggle from "@/components/MobileDescriptionToggle";
import LocalizedSeoDiscoveryCard from "@/components/LocalizedSeoDiscoveryCard";
import BookingRedirect from "@/components/BookingRedirect";
import GoogleAdsTracking from "@/components/GoogleAdsTracking";
import MetaPixelTracking from "@/components/MetaPixelTracking";
import AirbnbConversionBar from "@/components/AirbnbConversionBar";
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

      <body className={`${manrope.variable} ${cormorant.variable}`}>
        {children}
        <LocalizedSeoDiscoveryCard />
        <MobileDescriptionToggle />
        <BookingRedirect />
        <GoogleAdsTracking />
        <MetaPixelTracking />
        <AirbnbConversionBar />
      </body>
    </html>
  );
}
