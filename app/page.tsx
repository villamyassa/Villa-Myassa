"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Waves,
  Car,
  CalendarDays,
  X,
  ChevronLeft,
  ChevronRight,
  Rotate3D,
  PlayCircle,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

/* -------------------------------------------------------
   1) PHOTOS (dans /public/photos)
------------------------------------------------------- */

const GALLERY_FILES = [
  "001-hero-piscine.jpg",
  "002-salon.jpg",
  "005-cuisine.jpg",
  "003-suite1.jpg",
  "004-suite2.jpg",
  "005-suite3.jpg",
  "006-salle-de-bain.jpg",
  "007-salle-de-bain2.jpg",
  "008-salle-de-bain3.jpg",
  "008-jardin.jpg",
  "009-jardin-2.jpg",
  "011-photo-11.jpg",
  "012-photo-12.jpg",
  "013-photo-13.jpg",
  "014-photo-14.jpg",
  "015-photo-15.jpg",
  "016-photo-16.jpg",
  "017-photo-17.jpg",
  "020-photo-20.jpg",
  "022-photo-22.jpg",
  "024-photo-24.jpg",
  "026-photo-26.jpg",
  "029-photo-29.jpg",
] as const;

const toAlt = (name: string) =>
  name.replace(/^[0-9]+-/, "").replace(/[-_]/g, " ").replace(/\.(jpg|jpeg|png|webp)$/i, "");

const PUBLIC_PREFIX = "/photos";

type GalleryItem = { src: string; alt: string; featured?: boolean };

const IMAGES: GalleryItem[] = GALLERY_FILES.map((f, i) => ({
  src: `${PUBLIC_PREFIX}/${f}`,
  alt: toAlt(f),
  featured: i === 0,
}));

/* -------------------------------------------------------
   2) DONNÉES / I18N
------------------------------------------------------- */

type Lang = "fr" | "en" | "id";

const BESTAY_URL = "https://bestay.co/villa/villa-myassa";
const AIRBNB_URL = "https://www.airbnb.com/rooms/1505417552730386824";
const DIRECT_URL = "https://villamyassa.guestybookings.com/en/properties/68be42d2e105720013f38336";
const BOOKING_URL = "https://www.booking.com/hotel/id/villa-myassa-by-balisuperhost.html";

const WA_NUMBER_INTL = "33688647659";
const WA_TEXT_DEFAULT =
  "Bonjour, je souhaite des informations sur la Villa Myassa (dates, tarifs, etc.).";

// Réseaux sociaux
const INSTAGRAM_URL = "https://www.instagram.com/villa_myassa_luxe_bali";
const TIKTOK_URL = "https://www.tiktok.com/@villa.myassa";

/* -------------------------------------------------------
   HEADER
------------------------------------------------------- */

export default function Page() {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("lang") : null;
    if (saved === "fr" || saved === "en" || saved === "id") setLang(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem("lang", lang);
  }, [lang]);

  const hero = (IMAGES.find((i) => i.featured) ?? IMAGES[0]) as { src: string; alt: string };

  const waHrefTop = `https://wa.me/${WA_NUMBER_INTL}?text=${encodeURIComponent(WA_TEXT_DEFAULT)}`;

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="container mx-auto px-4 max-w-6xl h-20 flex items-center justify-between">
          {/* Titre centré */}
          <a href="#accueil" className="flex-1 text-center select-none">
            <span className="block text-xl md:text-2xl font-extrabold tracking-tight font-serif leading-tight">
              Villa Myassa, <span className="italic">Ubud</span>,{" "}
              <span className="uppercase">BALI</span>
            </span>
          </a>

          {/* Langues + Réserver + Réseaux sociaux */}
          <div className="flex items-center gap-2 flex-1 justify-end">
            {/* Langues */}
            <div className="flex items-center gap-1">
              <button
                aria-label="Français"
                className={`h-8 px-2 rounded-md border text-xs ${
                  lang === "fr" ? "bg-black text-white" : "bg-white"
                }`}
                onClick={() => setLang("fr")}
              >
                🇫🇷 FR
              </button>
              <button
                aria-label="English"
                className={`h-8 px-2 rounded-md border text-xs ${
                  lang === "en" ? "bg-black text-white" : "bg-white"
                }`}
                onClick={() => setLang("en")}
              >
                🇬🇧 EN
              </button>
              <button
                aria-label="Bahasa Indonesia"
                className={`h-8 px-2 rounded-md border text-xs ${
                  lang === "id" ? "bg-black text-white" : "bg-white"
                }`}
                onClick={() => setLang("id")}
              >
                🇮🇩 ID
              </button>
            </div>

            {/* Bouton Réserver */}
            <Button asChild>
              <a href={BESTAY_URL} target="_blank" rel="noreferrer">
                <CalendarDays className="mr-2 h-4 w-4" />
                Réserver
              </a>
            </Button>

            {/* Réseaux sociaux */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="h-8 w-8 flex items-center justify-center"
            >
              <Image
                src="/logos/instagram.png"
                alt="Instagram"
                width={24}
                height={24}
                className="rounded"
              />
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="h-8 w-8 flex items-center justify-center"
            >
              <Image src="/logos/tiktok.png" alt="TikTok" width={24} height={24} />
            </a>

            {/* WhatsApp */}
            <a
              href={waHrefTop}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="hidden md:inline-flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white hover:scale-105 transition"
              title="WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="accueil">
        <img src={hero.src} alt={hero.alt} className="w-full h-[60vh] md:h-[70vh] object-cover" />
      </section>
    </div>
  );
}
