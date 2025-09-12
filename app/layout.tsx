// app/layout.tsx
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata = {
  title: "Villa Myassa — Ubud, Bali | Private Pool Villa",
  description:
    "Modern villa with private pool in the heart of Ubud – BALI. 3 bedrooms, 3.5 bathrooms. Book on Bestay.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
