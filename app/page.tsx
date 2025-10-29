"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CalendarDays, MessageCircle } from "lucide-react";

/* ---------------------------------------------------------
   LANGUES & TRADUCTIONS
---------------------------------------------------------- */
type Lang = "fr" | "en" | "id" | "zh";

const tr = (table: Record<Lang, string>, l: Lang) => table[l];

const TEXT = (l: Lang) => ({
  reserve: tr({ fr: "Réserver", en: "Book", id: "Pesan", zh: "预订" }, l),
  choose: tr(
    {
      fr: "Choisir une plateforme",
      en: "Choose a platform",
      id: "Pilih platform",
      zh: "选择预订平台",
    },
    l
  ),
  gallery: tr({ fr: "Galerie", en: "Gallery", id: "Galeri", zh: "相册" }, l),
  features: tr({ fr: "Équipements", en: "Amenities", id: "Fasilitas", zh: "设施" }, l),
  contact: tr({ fr: "Contact", en: "Contact", id: "Kontak", zh: "联系" }, l),
  bookNow: tr(
    { fr: "Réserver maintenant", en: "Book now", id: "Pesan sekarang", zh: "立即预订" },
    l
  ),
});

/* ---------------------------------------------------------
   DONNÉES DE BASE
---------------------------------------------------------- */
const DATA = {
  nom: "Villa Myassa",
  baseline: {
    fr: "Villa contemporaine avec piscine privée à Ubud – Bali",
    en: "Contemporary villa with private pool in Ubud – Bali",
    id: "Vila kontemporer dengan kolam renang pribadi di Ubud – Bali",
    zh: "现代别墅，配有私人泳池，位于巴厘岛乌布",
  } as Record<Lang, string>,
  email: "contact@villamyassa.com",
  localisation: "Singakerta, Ubud — Bali, Indonésie",
};

/* ---------------------------------------------------------
   LIENS DE RÉSERVATION
---------------------------------------------------------- */
const BOOK_LINKS = [
  {
    name: "Bestay",
    logo: "/logos/bestay.svg",
    url: "https://villamyassa.guestybookings.com/en/properties/68be42d2e105720013f38336",
  },
  {
    name: "Airbnb",
    logo: "/logos/airbnb.svg",
    url: "https://www.airbnb.com/rooms/1505417552730386824",
  },
  {
    name: "Booking.com",
    logo: "/logos/booking.svg",
    url: "https://www.booking.com/hotel/id/villa-myassa-by-balisuperhost.html",
  },
  {
    name: "Trip.com",
    logo: "/logos/trip.svg", // place ici le carré officiel si tu l'as ajouté
    url: "https://fr.trip.com/hotels/detail/?cityEnName=Bali&cityId=723&hotelId=131766860",
  },
  {
    name: "WingOnTravel",
    logo: "/logos/wingontravel.svg",
    url: "https://www.wingontravel.com/hotel/detail-bali-131766860/villa-myassa-by-balisuperhost/",
  },
];

/* ---------------------------------------------------------
   IMAGES SLIDESHOW
---------------------------------------------------------- */
const IMAGES = [
  "/photos/001-hero-piscine.jpg",
  "/photos/002-salon.jpg",
  "/photos/003-suite1.jpg",
  "/photos/004-suite2.jpg",
  "/photos/005-suite3.jpg",
];

/* ---------------------------------------------------------
   PAGE
---------------------------------------------------------- */
export default function Page() {
  const [lang, setLang] = useState<Lang>("fr");
  const L = useMemo(() => TEXT(lang), [lang]);

  // Carrousel auto 3s + fondu (typé navigateur)
  const [slide, setSlide] = useState(0);
  const fadeRef = useRef<number | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % IMAGES.length);
    }, 3000);
    fadeRef.current = id;

    return () => {
      if (fadeRef.current !== null) {
        window.clearInterval(fadeRef.current);
        fadeRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        {/* Mobile portrait : 2 lignes */}
        <div className="flex flex-col items-center py-3 sm:hidden">
          {/* Ligne 1 : Titre centré */}
          <div className="text-center font-extrabold text-[8vw] leading-tight">
            Villa Myassa, <span className="italic">Ubud</span>, <span className="uppercase">Bali</span>
          </div>

          {/* Ligne 2 : Langues + Réserver + réseaux */}
          <div className="mt-2 flex items-center justify-center gap-2">
            {(["fr", "en", "id", "zh"] as Lang[]).map((c) => (
              <button
                key={c}
                onClick={() => setLang(c)}
                className={`px-2 py-1 text-xs border rounded ${
                  lang === c ? "bg-black text-white" : "bg-white"
                }`}
              >
                {c.toUpperCase()}
              </button>
            ))}

            {/* Menu Réserver */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-8 px-3 bg-black text-white rounded-full">
                  <CalendarDays className="mr-1 h-4 w-4" /> {L.reserve}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-72 p-2 bg-white rounded-xl shadow-2xl">
                <div className="px-3 py-2 text-xs text-neutral-500">{L.choose}</div>
                {BOOK_LINKS.map((b) => (
                  <DropdownMenuItem
                    key={b.name}
                    onClick={() => window.open(b.url, "_blank", "noopener,noreferrer")}
                    className="flex items-center gap-3 py-2"
                  >
                    <Image src={b.logo} alt={b.name} width={22} height={22} />
                    <span className="text-sm">{b.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Réseaux sociaux */}
            <a href="https://www.tiktok.com/@villa.myassa" target="_blank" rel="noreferrer">
              <Image src="/logos/tiktok.png" alt="TikTok" width={24} height={24} />
            </a>
            <a href="https://www.instagram.com/villa_myassa_luxe_bali" target="_blank" rel="noreferrer">
              <Image src="/logos/instagram.png" alt="Instagram" width={24} height={24} />
            </a>
          </div>
        </div>

        {/* Desktop / paysage : titre large + bouton en dessous (si besoin tu peux adapter) */}
        <div className="hidden sm:block">
          <div className="container mx-auto px-4 max-w-6xl py-4 text-center">
            <div className="font-extrabold text-4xl md:text-5xl">
              Villa Myassa, <span className="italic">Ubud</span>, <span className="uppercase">Bali</span>
            </div>

            <div className="mt-3 flex items-center justify-center gap-3">
              {(["fr", "en", "id", "zh"] as Lang[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setLang(c)}
                  className={`h-8 px-2 text-xs border rounded ${
                    lang === c ? "bg-black text-white" : "bg-white"
                  }`}
                >
                  {c.toUpperCase()}
                </button>
              ))}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="h-9 px-4 bg-black text-white rounded-full">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {L.reserve}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-80 p-2 bg-white rounded-xl shadow-2xl">
                  <div className="px-3 py-2 text-xs text-neutral-500">{L.choose}</div>
                  {BOOK_LINKS.map((b) => (
                    <DropdownMenuItem
                      key={b.name}
                      onClick={() => window.open(b.url, "_blank", "noopener,noreferrer")}
                      className="flex items-center gap-3 py-2"
                    >
                      <Image src={b.logo} alt={b.name} width={22} height={22} />
                      <span className="text-sm">{b.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <a href="https://www.tiktok.com/@villa.myassa" target="_blank" rel="noreferrer">
                <Image src="/logos/tiktok.png" alt="TikTok" width={26} height={26} />
              </a>
              <a href="https://www.instagram.com/villa_myassa_luxe_bali" target="_blank" rel="noreferrer">
                <Image src="/logos/instagram.png" alt="Instagram" width={26} height={26} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* SLIDESHOW HERO */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        {IMAGES.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt="Villa Myassa"
            fill
            className={`object-cover transition-opacity duration-700 ${
              i === slide ? "opacity-100" : "opacity-0"
            }`}
            priority={i === 0}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </section>

      {/* DESCRIPTION */}
      <section className="max-w-4xl mx-auto p-6">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-4"
        >
          {DATA.baseline[lang]}
        </motion.h1>
        <p className="text-neutral-700">{DATA.localisation}</p>
        <a
          href={BOOK_LINKS[0].url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex mt-6 px-4 py-2 rounded-full bg-black text-white text-sm"
        >
          {L.bookNow}
        </a>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-3">{L.contact}</h2>
        <p>
          Email:{" "}
          <a href={`mailto:${DATA.email}`} className="underline">
            {DATA.email}
          </a>
        </p>
      </section>

      {/* WHATSAPP */}
      <a
        href="https://wa.me/33688647659"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 bg-green-500 text-white rounded-full p-3 shadow-lg"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* FOOTER */}
      <footer className="text-center text-sm text-neutral-500 py-8 border-t mt-10">
        © {new Date().getFullYear()} Villa Myassa — All rights reserved
      </footer>
    </div>
  );
}
