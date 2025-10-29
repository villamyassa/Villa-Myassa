"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/** ─────────────────────────────────────────────────────────
 * Langues (tu peux élargir plus tard : "fr" | "en" | "id" | "zh")
 * ───────────────────────────────────────────────────────── */
type Lang = "fr" | "en" | "id" | "zh";

/** ─────────────────────────────────────────────────────────
 * Données de base
 * ───────────────────────────────────────────────────────── */
const BESTAY_URL =
  "https://villamyassa.guestybookings.com/en/properties/68be42d2e105720013f38336";
const AIRBNB_URL =
  "https://www.airbnb.com/rooms/1505417552730386824";
const BOOKING_URL =
  "https://www.booking.com/hotel/id/villa-myassa-by-balisuperhost.html";
const TRIP_URL =
  "https://fr.trip.com/hotels/detail/?cityEnName=Bali&cityId=723&hotelId=131766860";
const WINGONTRAVEL_URL =
  "https://www.wingontravel.com/hotel/detail-bali-131766860/villa-myassa-by-balisuperhost/";

const DATA = {
  name: "Villa Myassa",
  baseline: {
    fr: "Villa contemporaine avec piscine privée au cœur d’Ubud – BALI",
    en: "Contemporary villa with private pool in the heart of Ubud – BALI",
    id: "Vila kontemporer dengan kolam renang pribadi di pusat Ubud – BALI",
    zh: "位于乌布中心的现代别墅，带私人泳池 – 巴厘岛",
  },
  gallery: [
    "/photos/001-hero-piscine.jpg",
    "/photos/002-salon.jpg",
    "/photos/003-suite1.jpg",
    "/photos/004-suite2.jpg",
  ],
};

/** ─────────────────────────────────────────────────────────
 * Libellés i18n ultra-light
 * ───────────────────────────────────────────────────────── */
const L = (lang: Lang) => ({
  reserve: { fr: "Réserver", en: "Book", id: "Pesan", zh: "预订" }[lang],
  choose: {
    fr: "Choisir une plateforme",
    en: "Choose a platform",
    id: "Pilih platform",
    zh: "选择预订平台",
  } as string,
});

/** ─────────────────────────────────────────────────────────
 * Menu « Réserver » (centré sur mobile, clic = ouverture 1 clic)
 * ───────────────────────────────────────────────────────── */
function ReservationMenu({ lang = "fr" as Lang }) {
  const [open, setOpen] = useState(false);
  const label = useMemo(() => L(lang), [lang]);

  const items = [
    { name: "Bestay (site partenaire)", logo: "/logos/bestay.svg", url: BESTAY_URL },
    { name: "Airbnb", logo: "/logos/airbnb.svg", url: AIRBNB_URL },
    { name: "Booking.com", logo: "/logos/booking.svg", url: BOOKING_URL },
    { name: "Trip.com", logo: "/logos/trip.svg", url: TRIP_URL },
    { name: "WingOnTravel", logo: "/logos/wingontravel.svg", url: WINGONTRAVEL_URL },
    { name: "Réservation directe", logo: "/logos/direct.svg", url: BESTAY_URL },
  ];

  return (
    <div className="relative">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            onClick={() => setOpen(!open)}
            className="rounded-full px-4 h-10 bg-black text-white hover:bg-neutral-800"
          >
            <span className="inline-flex items-center gap-2">
              <Image
                src="/logos/direct.svg"
                alt="book"
                width={18}
                height={18}
                className="inline-block"
              />
              {label.reserve}
              <span className="ml-1">▾</span>
            </span>
          </Button>
        </DropdownMenuTrigger>

        {/* Centré sur mobile pour éviter d’être coupé à gauche */}
        <DropdownMenuContent
          align="center"
          className="w-72 md:w-80 bg-white shadow-2xl rounded-xl p-2"
        >
          <div className="px-3 py-2 text-xs text-neutral-500">{label.choose}</div>
          {items.map((p) => (
            <DropdownMenuItem
              key={p.name}
              onClick={() => window.open(p.url, "_blank", "noopener,noreferrer")}
              className="flex items-center gap-3 py-2"
            >
              <Image src={p.logo} alt={p.name} width={22} height={22} />
              <span className="text-sm text-neutral-900">{p.name}</span>
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 ml-auto text-neutral-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M10 7h7v7" />
              </svg>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

/** ─────────────────────────────────────────────────────────
 * Page
 * ───────────────────────────────────────────────────────── */
export default function Page() {
  const [lang, setLang] = useState<Lang>("fr");

  // image héro (1ère de la galerie)
  const hero = DATA.gallery[0];

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* ── Header ─────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="container mx-auto px-4 max-w-6xl h-16 flex items-center justify-between gap-3">
          {/* Titre à gauche */}
          <a href="#accueil" className="select-none">
            <span className="block text-2xl md:text-3xl font-extrabold tracking-tight font-serif leading-none">
              Villa Myassa, <span className="italic">Ubud</span>,{" "}
              <span className="uppercase">BALI</span>
            </span>
          </a>

          {/* Actions à droite */}
          <div className="flex items-center gap-2">
            {/* Switch langues minimal */}
            <div className="hidden sm:flex items-center gap-1 mr-1">
              {(["fr", "en", "id", "zh"] as Lang[]).map((code) => (
                <button
                  key={code}
                  aria-label={code}
                  onClick={() => setLang(code)}
                  className={`h-8 px-2 rounded-md border text-xs ${
                    lang === code ? "bg-black text-white" : "bg-white"
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Menu Réserver */}
            <ReservationMenu lang={lang} />
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────── */}
      <section id="accueil">
        <div className="w-full">
          <Image
            src={hero}
            alt="Piscine - Villa Myassa"
            width={1920}
            height={1080}
            className="w-full h-[58vh] md:h-[70vh] object-cover"
            priority
          />
        </div>

        <div className="container mx-auto px-4 max-w-6xl py-10">
          <h1 className="mt-1 text-4xl md:text-5xl font-extrabold leading-tight">
            {DATA.baseline[lang]}
          </h1>
          <p className="mt-3 text-base md:text-lg text-neutral-700">
            3 chambres • 3.5 salles de bain • Singakerta, Ubud (Bali)
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              className="border border-neutral-300"
              variant="outline"
              onClick={() => {
                const el = document.getElementById("galerie");
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Galerie
            </Button>
            <ReservationMenu lang={lang} />
          </div>
        </div>
      </section>

      {/* ── Galerie (mini) ─────────────────────────────── */}
      <section id="galerie" className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold">Galerie</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {DATA.gallery.map((src, i) => (
              <div key={i} className="overflow-hidden rounded-xl">
                <Image
                  src={src}
                  alt={`Photo ${i + 1} - Villa Myassa`}
                  width={800}
                  height={600}
                  className="h-40 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="py-10 border-t mt-6">
        <div className="container mx-auto px-4 max-w-6xl text-sm text-neutral-500">
          © {new Date().getFullYear()} {DATA.name} — www.villamyassa.com — Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
