"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
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
const BOOKING_URL =
  "https://www.booking.com/hotel/id/villa-myassa-by-balisuperhost.html";
const DIRECT_URL =
  "https://villamyassa.guestybookings.com/en/properties/68be42d2e105720013f38336";
const TRIP_URL =
  "https://fr.trip.com/hotels/detail/?cityEnName=Bali&cityId=723&hotelId=131766860&checkIn=2025-10-29&checkOut=2025-10-30&adult=2&children=0&crn=1&ages=&curr=USD&barcurr=USD&hoteluniquekey=H4sIAAAAAAAA_-NaxsTFJMEkNZ-J49S2SQfZhBgNLH4LOmrG9B8qDVvo4Hn2zJkzPkKLHQJ4ZjCe2fLKbiOjLdf1xQV7sx12MLKdYLzBtIDpLFD4FAsrxzYJCZZLLFsYo6uVslMrlaxMdJRKMktyUpWslELCHJV0lFJSi5OBHCArMTe_NK8EyDY21DMyAwqUJFZ4poC1JCfmJJfmJJakhlQWALWa6ShlFjuXFGUWBKXmZpaUpAJVpSXmFKeCxINSi4EyyWBBJT-gMUVQgcz8PIh2AxSxsMSc0lSIC4AWuqVC7TCsjX3EwhQd-4mF4RcLQxMrQxcrwyRWVo73UhJMu1jZIsN8XcNdpeQNDQwMTA2NTU11DRItLVIMksx0TSwsjc0sdC0NjE1NNDavePxjkbGR7ClGKUNzM0NzIzNzYwNLIwO9VDOgurzI8gxvby8PxiA2RyMnM1OzKBsuZk-XIMGeL2e_Sf-3tpdiDg12UTTQWil8IUXGQQskZwiTC2QAgw_2kXoTFvwwTJNxSGJNK9J1C8rYK1zA2MDI2MXILcDowRjBWAHirWJk2MDIuIPxPwwwvmIEmQ4Ata6V8u0BAAA&masterhotelid_tracelogid=100051355-0a98d0b6-489368-90354&detailFilters=17%7C1%7E17%7E1*31%7C131766860%7E31%7E131766860*80%7C1%7C1%7E80%7E1*29%7C1%7E29%7E1%7C2&hotelType=normal&display=inctotal&subStamp=1840&isCT=true&locale=fr-FR";

const WA_NUMBER_INTL = "33688647659";
const WA_TEXT_DEFAULT =
  "Bonjour, je souhaite des informations sur la Villa Myassa (dates, tarifs, etc.).";

const DATA_BASE = {
  nom: "Villa Myassa",
  baseline: {
    fr: "Villa contemporaine avec piscine privée au cœur d’Ubud – BALI",
    en: "Contemporary villa with private pool in the heart of Ubud – BALI",
    id: "Vila kontemporer dengan kolam renang pribadi di jantung Ubud – BALI",
  },
  localisation: {
    fr: "Singakerta, Ubud — Gianyar, Bali (Indonésie)",
    en: "Singakerta, Ubud — Gianyar, Bali (Indonesia)",
    id: "Singakerta, Ubud — Gianyar, Bali (Indonesia)",
  },
  capacite: {
    fr: "3 chambres (lits queen)",
    en: "3 bedrooms (queen beds)",
    id: "3 kamar tidur (queen)",
  },
  chambres: { fr: "3.5 salles de bain", en: "3.5 bathrooms", id: "3.5 kamar mandi" },
  distance: { fr: "Jungle d’Ubud (Singakerta)", en: "Ubud jungle (Singakerta)", id: "Hutan Ubud (Singakerta)" },
  email: "contact@villamyassa.com",
  images: IMAGES,
  mapsEmbed: `<iframe src="https://www.google.com/maps?q=F66R%2BH95%20Singakerta%2C%20Gianyar%20Regency%2C%20Bali%2080571%2C%20Ubud%2C%20Indonesia&output=embed" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
  adresse: "F66R+H95 Singakerta, Gianyar Regency, Bali 80571, Ubud, Indonesia",
  virtualTour: {
    url: "https://discover.matterport.com/space/xrHbRBnPwdy",
    cover: "/photos/virtual-tour-cover.jpg",
  },
  pointsForts: {
    fr: [
      "Piscine privée",
      "Climatisation",
      "Wifi haut débit",
      "Parking gratuit sur place",
      "Cuisine toute équipée (four, plaques, réfrigérateur, grille-pain, bouilloire)",
      "TV / Smart TV dans les chambres",
      "Salles de bain attenantes",
      "Coffre-fort",
      "Moustiquaires",
    ],
    en: [
      "Private pool",
      "Air conditioning",
      "High-speed Wi-Fi",
      "Free on-site parking",
      "Full kitchen (oven, cooktop, fridge, toaster, kettle)",
      "TV / Smart TV in bedrooms",
      "En-suite bathrooms",
      "Safe",
      "Mosquito nets",
    ],
    id: [
      "Kolam renang pribadi",
      "AC",
      "Wi-Fi cepat",
      "Parkir gratis di lokasi",
      "Dapur lengkap (oven, kompor, kulkas, pemanggang roti, ketel)",
      "TV/Smart TV di kamar",
      "Kamar mandi dalam",
      "Brankas",
      "Kelambu nyamuk",
    ],
  },
  description: {
    fr: `Bienvenue à la Villa Myassa à Singakerta, où le design contemporain rencontre le paysage enchanteur de la jungle d'Ubud. Dès l'entrée, une élégante fontaine se jette dans un paisible bassin avec pas japonais, créant un chemin captivant qui donnera le ton à votre séjour extraordinaire.

Les trois chambres raffinées de la Villa Myassa disposent chacune d'un lit queen-size, d'une Smart TV, de la climatisation et d'une salle de bain attenante. La chambre principale vous enchantera avec sa moustiquaire à baldaquin et sa baignoire extérieure, la deuxième chambre vous rafraîchira avec sa douche extérieure, tandis que la troisième chambre offre une expérience de bain semi-extérieure.

La Villa Myassa allie harmonieusement intérieur et extérieur avec ses espaces ouverts et aérés, naturellement rafraîchis par une ventilation transversale et des ventilateurs de plafond. Une magnifique carte balinaise en bois agrémente le confortable salon, idéal pour se réunir ou se détendre. La salle à manger peut accueillir confortablement six personnes, tandis que la cuisine moderne avec îlot central invite les convives à concocter des repas mémorables.

Sortez de la Villa Myassa et pénétrez dans votre oasis privée, où une piscine étincelante, couronnée d'une statue de Bouddha, vous attend. Le coin salon en contrebas (Sunken) offre une vue imprenable sur l'eau, tandis que deux chaises longues flottantes invitent à la détente. Installez-vous dans le gazebo balinais « bale bengong », drapé de rideaux blancs pour d'excellents massages. Deux chaises longues supplémentaires donnent sur le jardin luxuriant, tandis que la douche extérieure de la piscine complète ce paradis tropical.

L'emplacement privilégié de la Villa Myassa à Singakerta vous place aux portes de la scène culturelle dynamique d'Ubud. Explorez la célèbre Forêt des Singes, visitez le palais historique d'Ubud, plongez dans la scène artistique locale et découvrez d'innombrables restaurants et boutiques, le tout à proximité de votre sanctuaire privé.

Réservez dès aujourd'hui votre escapade tropicale à la Villa Myassa et découvrez l'alliance de l'élégance moderne et de la magie mystique de la jungle balinaise.`,
    en: `Welcome to Villa Myassa in Singakerta, where contemporary design meets the enchanting landscape of Ubud’s jungle. From the entrance, an elegant fountain flows into a serene pond with stepping stones, setting the tone for an extraordinary stay.

Each of the three refined bedrooms features a queen-size bed, Smart TV, air conditioning, and an en-suite bathroom. The master delights with a canopy mosquito net and an outdoor bathtub; the second bedroom offers a refreshing outdoor shower, and the third features a semi-open bathing experience.

Villa Myassa blends indoors and outdoors with open, airy spaces, naturally cooled by cross-ventilation and ceiling fans. A beautiful carved wooden map of Bali anchors the cozy lounge, perfect for gathering or relaxing. The dining area seats six comfortably, while the modern kitchen with island invites memorable meals.

Step into your private oasis: a sparkling pool crowned by a Buddha statue, a sunken lounge overlooking the water, and two floating loungers for pure relaxation. Unwind in the balé bengong gazebo draped with white curtains—perfect for massages. Two additional sun loungers face the lush garden, while the outdoor pool shower completes this tropical haven.

Our privileged location places you at the gateway to Ubud’s cultural scene—Monkey Forest, Ubud Palace, art galleries, and countless cafés and boutiques—just minutes from your private sanctuary.

Book your tropical escape at Villa Myassa today and experience the harmony of modern elegance and the mystical magic of Bali’s jungle.`,
    id: `Selamat datang di Villa Myassa di Singakerta, di mana desain kontemporer berpadu dengan lanskap hutan Ubud. Dari pintu masuk, air mancur elegan mengalir ke kolam tenang dengan batu pijakan—menciptakan suasana menginap yang istimewa.

Setiap dari tiga kamar tidur dilengkapi tempat tidur queen, Smart TV, AC, dan kamar mandi dalam. Kamar utama memiliki kelambu kanopi dan bathtub luar; kamar kedua dengan shower luar; kamar ketiga semi-terbuka.

Villa Myassa memadukan area dalam dan luar yang lapang, sejuk alami oleh ventilasi silang dan kipas langit-langit. Peta Bali ukir kayu menghiasi ruang keluarga yang nyaman. Ruang makan untuk enam orang dan dapur modern dengan island mengundang momen memasak yang berkesan.

Melangkah ke oasis pribadi Anda: kolam renang berkilau dengan patung Buddha, sunken lounge menghadap air, serta dua floating lounger. Bersantai di balé bengong dengan tirai putih—sempurna untuk pijat. Dua sun lounger tambahan menghadap taman, dan shower kolam luar melengkapi suasana tropis.

Lokasi kami menempatkan Anda dekat Monkey Forest, Istana Ubud, galeri seni, kafe dan butik—hanya beberapa menit dari tempat peristirahatan privat Anda.

Pesan liburan tropis Anda di Villa Myassa sekarang dan rasakan harmoni keanggunan modern dan pesona mistis hutan Bali.`,
  },
};

const LTEXT = (lang: Lang) => ({
  nav: {
    gallery: lang === "fr" ? "Galerie" : lang === "en" ? "Gallery" : "Galeri",
    features: lang === "fr" ? "Atouts" : lang === "en" ? "Highlights" : "Fasilitas",
    location: lang === "fr" ? "Localisation" : lang === "en" ? "Location" : "Lokasi",
    contact: lang === "fr" ? "Contact" : "Contact",
    tour: lang === "fr" ? "Visite 3D" : lang === "en" ? "3D Tour" : "Tur 3D",
    book: lang === "fr" ? "Réserver" : lang === "en" ? "Book" : "Pesan",
  },
  hero: {
    capacity: DATA_BASE.capacite[lang],
    baths: DATA_BASE.chambres[lang],
    area: DATA_BASE.distance[lang],
  },
  description: {
    title: lang === "fr" ? "Description" : lang === "en" ? "Description" : "Deskripsi",
    more: lang === "fr" ? "LIRE PLUS" : lang === "en" ? "READ MORE" : "LIHAT SELENGKAPNYA",
    less: lang === "fr" ? "LIRE MOINS" : lang === "en" ? "READ LESS" : "LIHAT LEBIH SEDIKIT",
  },
  tour: {
    title: lang === "fr" ? "Visite 3D (360°)" : lang === "en" ? "3D Virtual Tour (360°)" : "Tur Virtual 3D (360°)",
    subtitle:
      lang === "fr"
        ? "Cliquez sur l’image — la visite s’ouvre dans un onglet."
        : lang === "en"
        ? "Click the image — the tour opens in a new tab."
        : "Klik gambar — tur akan terbuka di tab baru.",
    button: lang === "fr" ? "Cliquer pour ouvrir la visite" : lang === "en" ? "Click to open the tour" : "Klik untuk membuka tur",
  },
  features: {
    title: lang === "fr" ? "Atouts & Équipements" : lang === "en" ? "Highlights & Amenities" : "Fasilitas",
    subtitle:
      lang === "fr"
        ? "Tout ce dont vous avez besoin pour un séjour réussi"
        : lang === "en"
        ? "Everything you need for a great stay"
        : "Semua yang Anda butuhkan untuk menginap nyaman",
  },
  location: {
    title: lang === "fr" ? "Localisation" : lang === "en" ? "Location" : "Lokasi",
  },
  contact: {
    title: lang === "fr" ? "Contact" : "Contact",
    yourName: lang === "fr" ? "Votre nom" : lang === "en" ? "Your name" : "Nama Anda",
    yourEmail: lang === "fr" ? "Votre email" : lang === "en" ? "Your email" : "Email Anda",
    yourMessage: lang === "fr" ? "Votre message" : lang === "en" ? "Your message" : "Pesan Anda",
    sendEmail: lang === "fr" ? "Envoyer par email" : lang === "en" ? "Send by email" : "Kirim lewat email",
    openMailer: lang === "fr" ? "Ouvrir votre messagerie" : lang === "en" ? "Open your mail app" : "Buka aplikasi email",
    emailLabel: lang === "fr" ? "Email" : "Email",
  },
});

/* -------------------------------------------------------
   3) COMPOSANTS UI
------------------------------------------------------- */

const Section = ({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="py-12 md:py-16 scroll-mt-24">
    <div className="container mx-auto px-4 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="text-neutral-500 mt-2 max-w-2xl">{subtitle}</p>}
      </motion.div>
      <div className="mt-8">{children}</div>
    </div>
  </section>
);

const GalleryCard = ({
  item,
  onOpen = () => {},
}: {
  item: { src: string; alt: string };
  onOpen?: () => void;
}) => (
  <div className="relative overflow-hidden rounded-2xl shadow-sm group">
    <button
      type="button"
      onClick={onOpen}
      className="relative block w-full h-64 sm:h-60 lg:h-64 focus:outline-none focus:ring-2 focus:ring-white/60"
      aria-label={`Voir ${item.alt} en plein écran`}
    >
      <img
        src={item.src}
        alt={item.alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </button>
  </div>
);

/* -------------------------------------------------------
   4) PAGE
------------------------------------------------------- */

export default function Page() {
  // ---- Lang
  const [lang, setLang] = useState<Lang>("fr");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("lang") : null;
    if (saved === "fr" || saved === "en" || saved === "id") setLang(saved);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem("lang", lang);
  }, [lang]);
  const L = useMemo(() => LTEXT(lang), [lang]);

  // ---- Form
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // ---- Responsive helper
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsDesktop("matches" in e ? e.matches : (e as MediaQueryList).matches);
    handler(mql);
    mql.addEventListener("change", handler as any);
    return () => mql.removeEventListener("change", handler as any);
  }, []);

  const images = DATA_BASE.images;

  /* ---------- HERO SLIDER — cross-fade Framer Motion (sans clignotement) ---------- */
  useEffect(() => {
    images.forEach((im) => {
      const img = new Image();
      img.src = im.src;
    });
  }, [images]);

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(id);
  }, [images.length]);
  /* ------------------------------------------------------------------------------- */

  // ---- Lightbox
  const [lbIndex, setLbIndex] = useState<number | null>(null);
  const closeLb = () => setLbIndex(null);
  const openLb = (i: number) => setLbIndex(i);
  const prevLb = () =>
    setLbIndex((i) => (i === null ? i : (i + images.length - 1) % images.length));
  const nextLb = () =>
    setLbIndex((i) => (i === null ? i : (i + 1) % images.length));

  useEffect(() => {
    if (lbIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") prevLb();
      if (e.key === "ArrowRight") nextLb();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lbIndex, images.length]);

  const handleMailto = () => {
    const subject =
      lang === "fr"
        ? `Demande d’informations – ${DATA_BASE.nom}`
        : lang === "en"
        ? `Information request – ${DATA_BASE.nom}`
        : `Permintaan informasi – ${DATA_BASE.nom}`;
    const body =
      lang === "fr"
        ? `Bonjour,\n\nJe souhaite me renseigner au sujet de ${DATA_BASE.nom}.\n\nNom: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`
        : lang === "en"
        ? `Hello,\n\nI'd like information about ${DATA_BASE.nom}.\n\nName: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`
        : `Halo,\n\nSaya ingin informasi tentang ${DATA_BASE.nom}.\n\nNama: ${form.name}\nEmail: ${form.email}\nPesan: ${form.message}`;
    window.location.href = `mailto:${DATA_BASE.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  // Virtual tour — uniquement Matterport
  const openVirtualTour = () => {
    window.open(DATA_BASE.virtualTour.url, "_blank", "noopener,noreferrer");
  };
  const coverSrc =
    (DATA_BASE.virtualTour.cover?.startsWith("/")
      ? DATA_BASE.virtualTour.cover
      : `${PUBLIC_PREFIX}/${DATA_BASE.virtualTour.cover}`) || images[0].src;

  // Description "Lire plus"
  const description = DATA_BASE.description[lang];
  const paragraphs = description.trim().split(/\n\s*\n/).map((p) => p.trim());
  const firstTwo = paragraphs.slice(0, 2);
  const rest = paragraphs.slice(2);
  const [showMore, setShowMore] = useState(false);

  // WhatsApp & Social
  const waHref = `https://wa.me/${WA_NUMBER_INTL}?text=${encodeURIComponent(WA_TEXT_DEFAULT)}`;

  // --------- Réserver : Desktop DROPDOWN ----------
  const [desktopBookingOpen, setDesktopBookingOpen] = useState(false);
  const desktopRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isDesktop) return; // seulement desktop
    const onDocClick = (e: MouseEvent) => {
      if (!desktopRef.current) return;
      if (!desktopRef.current.contains(e.target as Node)) setDesktopBookingOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [isDesktop]);

  // --------- Réserver : Mobile SHEET (plein écran) ----------
  const [mobileBookingOpen, setMobileBookingOpen] = useState(false);
  const openMobileBooking = () => setMobileBookingOpen(true);
  const closeMobileBooking = () => setMobileBookingOpen(false);

  // Liste unique des plateformes (logo + libellé + href)
  const BOOK_PLATFORMS = [
    { href: BESTAY_URL, label: "Bestay (site partenaire)", icon: "/logos/bestay.svg" },
    { href: AIRBNB_URL, label: "Airbnb", icon: "/logos/airbnb.svg" },
    { href: BOOKING_URL, label: "Booking.com", icon: "/logos/booking.svg" },
    { href: TRIP_URL, label: "Trip.com", icon: "/logos/trip.svg" }, // ⬅️ ajouté
    { href: DIRECT_URL, label: "Réservation directe", icon: "/logos/direct.svg" },
  ] as const;

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Desktop / paysage : titre centré */}
          <div className="hidden md:flex h-20 items-center justify-center">
            <h1 className="text-4xl lg:text-5xl font-extrabold font-serif text-center leading-tight">
              Villa Myassa, <span className="italic">Ubud</span>, <span className="uppercase">BALI</span>
            </h1>
          </div>

          {/* MOBILE PORTRAIT : 2 lignes */}
          <div className="md:hidden py-2">
            {/* Ligne 1 : Titre centré, très grand */}
            <div className="flex items-center justify-center">
              <h1 className="text-[24px] font-extrabold font-serif text-center leading-tight">
                Villa Myassa, <span className="italic">Ubud</span>, <span className="uppercase">BALI</span>
              </h1>
            </div>

            {/* Ligne 2 : Langue → Réserver → TikTok → Instagram */}
            <div className="mt-2 flex items-center justify-center gap-2">
              <select
                className="h-9 rounded-md border px-2 text-xs bg-white"
                value={lang}
                onChange={(e) => setLang(e.target.value as Lang)}
                aria-label="Choisir la langue"
              >
                <option value="fr">🇫🇷 FR</option>
                <option value="en">🇬🇧 EN</option>
                <option value="id">🇮🇩 ID</option>
              </select>

              {/* MOBILE : ouvre le SHEET */}
              <Button className="h-9 px-3 text-xs" onClick={openMobileBooking}>
                <CalendarDays className="mr-2 h-4 w-4" />
                {L.nav.book}
              </Button>

              <a
                href="https://www.tiktok.com/@villa.myassa"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border hover:bg-neutral-50"
                aria-label="TikTok"
                title="TikTok"
              >
                <img src="/logos/tiktok.png" alt="TikTok" className="h-4 w-4 object-contain" />
              </a>
              <a
                href="https://www.instagram.com/villa_myassa_luxe_bali/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border hover:bg-neutral-50"
                aria-label="Instagram"
                title="Instagram"
              >
                <img src="/logos/instagram.png" alt="Instagram" className="h-4 w-4 object-contain" />
              </a>
            </div>
          </div>

          {/* Desktop / paysage : nav + sélecteurs + réseaux */}
          <div className="hidden md:flex h-16 items-center justify-between">
            <nav className="flex items-center gap-6 text-sm">
              <a href="#visite-3d" className="hover:underline">{L.nav.tour}</a>
              <a href="#galerie" className="hover:underline">{L.nav.gallery}</a>
              <a href="#atouts" className="hover:underline">{L.nav.features}</a>
              <a href="#localisation" className="hover:underline">{L.nav.location}</a>
              <a href="#contact" className="hover:underline">{L.nav.contact}</a>
            </nav>

            <div className="flex items-center gap-2">
              <select
                className="h-10 rounded-md border px-2 text-sm bg-white"
                value={lang}
                onChange={(e) => setLang(e.target.value as Lang)}
                aria-label="Choisir la langue"
              >
                <option value="fr">🇫🇷 FR</option>
                <option value="en">🇬🇧 EN</option>
                <option value="id">🇮🇩 ID</option>
              </select>

              {/* DESKTOP : bouton + dropdown ancré */}
              <div className="relative" ref={desktopRef}>
                <Button onClick={() => setDesktopBookingOpen((v) => !v)} aria-expanded={desktopBookingOpen}>
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {L.nav.book}
                </Button>
                {desktopBookingOpen && (
                  <div
                    className="absolute top-full right-0 z-50 mt-2 w-80 rounded-xl border bg-white p-3 shadow-xl"
                    role="menu"
                    aria-label="Choisir une plateforme"
                    onClick={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                  >
                    <div className="text-xs font-medium text-neutral-600 mb-2">
                      Choisir une plateforme
                    </div>
                    <ul className="grid gap-1">
                      {BOOK_PLATFORMS.map((it, i) => (
                        <li key={i}>
                          <a
                            className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-neutral-50 active:bg-neutral-100"
                            href={it.href}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => setDesktopBookingOpen(false)}
                          >
                            <span className="inline-flex items-center gap-2">
                              <img src={it.icon} alt="" className="h-5 w-5 object-contain" />
                              <span className="text-sm">{it.label}</span>
                            </span>
                            <span aria-hidden>↗</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <a
                href="https://www.tiktok.com/@villa.myassa"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border hover:bg-neutral-50"
                aria-label="TikTok"
                title="TikTok"
              >
                <img src="/logos/tiktok.png" alt="TikTok" className="h-5 w-5 object-contain" />
              </a>
              <a
                href="https://www.instagram.com/villa_myassa_luxe_bali/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border hover:bg-neutral-50"
                aria-label="Instagram"
                title="Instagram"
              >
                <img src="/logos/instagram.png" alt="Instagram" className="h-5 w-5 object-contain" />
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white hover:scale-105 transition"
                title="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ====== MOBILE BOOKING SHEET ====== */}
      {mobileBookingOpen && (
        <div
          className="fixed inset-0 z-[1000] bg-black/40 flex items-end md:hidden"
          onClick={closeMobileBooking}
          role="dialog"
          aria-modal="true"
          aria-label="Choisir une plateforme de réservation"
        >
          <div
            className="w-full rounded-t-2xl bg-white p-4 shadow-2xl max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Choisir une plateforme</h3>
              <button
                aria-label="Fermer"
                className="h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-neutral-100"
                onClick={closeMobileBooking}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-2 grid gap-1">
              {BOOK_PLATFORMS.map((it, i) => (
                <li key={i}>
                  <a
                    className="flex items-center justify-between rounded-lg px-2 py-3 active:bg-neutral-100"
                    href={it.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={closeMobileBooking}
                  >
                    <span className="inline-flex items-center gap-3">
                      <img src={it.icon} alt="" className="h-6 w-6 object-contain" loading="lazy" />
                      <span className="text-base">{it.label}</span>
                    </span>
                    <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Hero SLIDER (AnimatePresence pour cross-fade sans clignotement) */}
      <section id="accueil">
        <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.img
              key={images[idx].src}
              src={images[idx].src}
              alt={images[idx].alt}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              loading="eager"
              decoding="async"
            />
          </AnimatePresence>
        </div>

        {/* Baseline + CTA */}
        <div className="container mx-auto px-4 max-w-6xl py-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="mt-1 text-2xl md:text-3xl font-extrabold leading-tight">
              {DATA_BASE.baseline[lang]}
            </p>
            <p className="mt-3 text-base md:text-lg text-neutral-700">
              {LTEXT(lang).hero.capacity} • {LTEXT(lang).hero.baths} • {LTEXT(lang).hero.area}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="outline" size="lg" asChild>
                <a href="#galerie">{LTEXT(lang).nav.gallery}</a>
              </Button>

              {/* MOBILE : ouvre le SHEET */}
              <Button size="lg" className="md:hidden" onClick={openMobileBooking}>
                {L.nav.book}
              </Button>
              {/* DESKTOP : lien direct (comme avant) */}
              <Button size="lg" asChild className="hidden md:inline-flex">
                <a href={BESTAY_URL} target="_blank" rel="noreferrer">
                  {L.nav.book}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <Section id="description" title={LTEXT(lang).description.title}>
        <Card className="rounded-2xl">
          <CardContent className="py-6">
            <div className="prose max-w-none leading-relaxed">
              {firstTwo.map((p, i) => (
                <p key={i} className="mb-4">
                  {p}
                </p>
              ))}
              {rest.length > 0 && (
                <>
                  <div
                    className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
                      showMore ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                    aria-hidden={!showMore}
                  >
                    {rest.map((p, i) => (
                      <p key={`rest-${i}`} className="mb-4">
                        {p}
                      </p>
                    ))}
                  </div>
                  <div className="mt-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowMore((v) => !v)}
                      aria-expanded={showMore}
                    >
                      {showMore ? LTEXT(lang).description.less : LTEXT(lang).description.more}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Visite 3D */}
      <Section id="visite-3d" title={LTEXT(lang).tour.title} subtitle={LTEXT(lang).tour.subtitle}>
        <div
          role="button"
          tabIndex={0}
          onClick={openVirtualTour}
          onKeyDown={(e) => ((e as any).key === "Enter" || (e as any).key === " ") && openVirtualTour()}
          className="group relative w-full cursor-pointer overflow-hidden rounded-2xl outline-none focus:ring-2 focus:ring-black/20"
          aria-label="Ouvrir la visite 3D"
        >
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] max-h-[620px]">
            <img
              src={coverSrc || images[0].src}
              onError={(e) => {
                e.currentTarget.src = images[0].src;
              }}
              alt="Visite 3D de la villa"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">
                <Rotate3D className="h-4 w-4" />
                <PlayCircle className="h-4 w-4" />
                {LTEXT(lang).tour.button}
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* Galerie */}
      <Section id="galerie" title={LTEXT(lang).nav.gallery}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <GalleryCard key={i} item={img} onOpen={() => openLb(i)} />
          ))}
        </div>
      </Section>

      {/* Lightbox */}
      {lbIndex !== null && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[999] bg-black/90" onClick={closeLb}>
          <button
            type="button"
            onClick={closeLb}
            aria-label="Fermer"
            className="absolute top-4 right-4 rounded-full bg-white/10 hover:bg-white/20 p-2 text-white"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevLb();
            }}
            aria-label="Image précédente"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 p-3 text-white"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <img
              src={images[lbIndex].src}
              alt={images[lbIndex].alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92vh] max-w-[92vw] rounded-2xl shadow-2xl"
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextLb();
            }}
            aria-label="Image suivante"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 p-3 text-white"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>
      )}

      {/* Atouts */}
      <Section id="atouts" title={LTEXT(lang).features.title} subtitle={LTEXT(lang).features.subtitle}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DATA_BASE.pointsForts[lang].map((p, i) => (
            <Card key={i} className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">{p}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      {/* Localisation */}
      <Section id="localisation" title={LTEXT(lang).location.title} subtitle={DATA_BASE.localisation[lang]}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="rounded-2xl order-2 lg:order-1">
            <CardContent className="py-6">
              <ul className="grid gap-2 py-2">
                <li className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" /> {DATA_BASE.adresse}
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="rounded-2xl order-1 lg:order-2">
            <CardContent className="p-0">
              <div dangerouslySetInnerHTML={{ __html: DATA_BASE.mapsEmbed }} />
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title={LTEXT(lang).contact.title}>
        <Card className="rounded-2xl">
          <CardContent className="py-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-3">
                <Input
                  placeholder={LTEXT(lang).contact.yourName}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <Input
                  placeholder={LTEXT(lang).contact.yourEmail}
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <Textarea
                  placeholder={LTEXT(lang).contact.yourMessage}
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleMailto}>{LTEXT(lang).contact.sendEmail}</Button>
                  <Button variant="outline" asChild>
                    <a href={`mailto:${DATA_BASE.email}`}>{LTEXT(lang).contact.openMailer}</a>
                  </Button>
                </div>
              </div>
              <div className="text-sm text-neutral-600">
                <p>
                  {LTEXT(lang).contact.emailLabel} :{" "}
                  <a className="underline" href={`mailto:${DATA_BASE.email}`}>
                    {DATA_BASE.email}
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* WhatsApp floating bubble */}
      <a
        href={waHref}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-4 right-4 z-[1000] inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-500 text-white shadow-lg hover:scale-105 transition"
        title="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* Footer */}
      <footer className="py-10 border-t mt-10">
        <div className="container mx-auto px-4 max-w-6xl text-sm text-neutral-500">
          © {new Date().getFullYear()} {DATA_BASE.nom} — www.villamyassa.com — Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
