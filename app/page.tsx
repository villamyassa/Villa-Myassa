"use client";

import { useEffect, useMemo, useState } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
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

/* ----------------------------- 1) PHOTOS ----------------------------- */

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
  name
    .replace(/^[0-9]+-/, "")
    .replace(/[-_]/g, " ")
    .replace(/\.(jpg|jpeg|png|webp)$/i, "");

const SITE_ORIGIN = "https://www.villamyassa.com";
const PUBLIC_PREFIX = "/photos";
type GalleryItem = { src: string; alt: string; featured?: boolean };

const IMAGES: GalleryItem[] = GALLERY_FILES.map((f, i) => ({
  src: `${PUBLIC_PREFIX}/${f}`,
  alt: toAlt(f),
  featured: i === 0,
}));

/* ----------------------------- 2) DATA / I18N ----------------------------- */

type Lang = "fr" | "en" | "id";

const BESTAY_URL = "https://bestay.co/villa/villa-myassa";
const WA_NUMBER_INTL = "33688647659";

const WA_TEXT_DEFAULT: Record<Lang, string> = {
  fr: "Bonjour, je souhaite des informations sur la Villa Myassa (dates, tarifs, etc.).",
  en: "Hello, I’d like information about Villa Myassa (dates, rates, etc.).",
  id: "Halo, saya ingin informasi tentang Villa Myassa (tanggal, tarif, dll.).",
};

const DATA_BASE = {
  nom: "Villa Myassa",
  baseline: {
    fr: "Villa contemporaine avec piscine privée au cœur d’Ubud – BALI",
    en: "Contemporary villa with private pool in the heart of Ubud – BALI",
    id: "Villa kontemporer dengan kolam renang pribadi di pusat Ubud – BALI",
  },
  localisation: {
    fr: "Singakerta, Ubud — Gianyar, Bali (Indonésie)",
    en: "Singakerta, Ubud — Gianyar, Bali (Indonesia)",
    id: "Singakerta, Ubud — Gianyar, Bali (Indonesia)",
  },
  capacite: {
    fr: "3 chambres (lits queen)",
    en: "3 bedrooms (queen beds)",
    id: "3 kamar tidur (kasur queen)",
  },
  chambres: { fr: "3.5 salles de bain", en: "3.5 bathrooms", id: "3,5 kamar mandi" },
  distance: { fr: "Jungle d’Ubud (Singakerta)", en: "Ubud jungle (Singakerta)", id: "Hutan Ubud (Singakerta)" },
  email: "contact@villamyassa.com",
  images: IMAGES,
  mapsEmbed: `<iframe src="https://www.google.com/maps?q=F66R%2BH95%20Singakerta%2C%20Gianyar%20Regency%2C%20Bali%2080571%2C%20Ubud%2C%20Indonesia&output=embed" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
  adresse: "F66R+H95 Singakerta, Gianyar Regency, Bali 80571, Ubud, Indonesia",
  virtualTour: {
    url: "https://discover.matterport.com/space/xrHbRBnPwdy",
    fallbackUrl: BESTAY_URL,
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
      "AC (penyejuk udara)",
      "Wi-Fi berkecepatan tinggi",
      "Parkir gratis di lokasi",
      "Dapur lengkap (oven, kompor, kulkas, pemanggang roti, ketel)",
      "TV / Smart TV di kamar tidur",
      "Kamar mandi dalam",
      "Brankas",
      "Kelambu nyamuk",
    ],
  },
  description: {
    fr: `Bienvenue à la Villa Myassa, **villa à Ubud** idéale pour des **vacances à Bali**. Située à Singakerta, dans un quartier paisible entouré de rizières et de jungle, notre **villa de Bali avec piscine privée** combine architecture contemporaine et chaleur balinaise — à quelques minutes du **centre d’Ubud** et de la célèbre **Monkey Forest**. Dès l’entrée, une élégante fontaine se jette dans un paisible bassin avec pas japonais, donnant le ton d’un séjour raffiné.

Les trois chambres raffinées de la Villa Myassa disposent chacune d’un lit queen-size, d’une Smart TV, de la climatisation et d’une salle de bain attenante. La chambre principale séduit avec sa moustiquaire à baldaquin et sa baignoire extérieure ; la deuxième chambre offre une douche extérieure ; la troisième propose une expérience semi-ouverte. Idéale pour des familles ou amis cherchant une **location de villa à Ubud** confortable et intime.

La Villa Myassa relie naturellement intérieur et extérieur : grands espaces ouverts, ventilation croisée et ventilateurs de plafond. Une carte de Bali finement sculptée orne le salon, parfait pour se réunir ou se détendre. La salle à manger accueille six convives, et la cuisine moderne avec îlot central facilite la préparation de repas après une journée à explorer Ubud, ses temples et ses cafés.

À l’extérieur, découvrez votre oasis privée : **piscine étincelante** surmontée d’une statue de Bouddha, **sunken lounge** face à l’eau et deux matelas flottants pour lézarder au soleil. Le **gazebo balinais (balé bengong)**, drapé de rideaux blancs, est idéal pour un massage. Deux bains de soleil supplémentaires bordent le jardin luxuriant ; la douche extérieure complète ce **havre tropical**.

Grâce à son emplacement privilégié, la **Villa Myassa Ubud** vous place près des meilleurs restaurants, studios de yoga, marchés artisanaux et rizières en terrasse de Tegallalang. Que vous souhaitiez une retraite zen, un voyage en couple ou des **vacances en famille à Bali**, notre villa est un point de départ parfait.

**Réservez** dès aujourd’hui votre escapade tropicale à la Villa Myassa et profitez d’une **villa à Ubud avec piscine privée**, élégante et sereine — le mélange idéal entre confort moderne et magie balinaise.`,
    en: `Welcome to Villa Myassa — a **villa in Ubud, Bali** designed for effortless tropical living. Tucked away in Singakerta among rice fields and jungle, this **Bali private pool villa** blends contemporary lines with Balinese warmth. You’re minutes from **central Ubud** and the famous **Monkey Forest**, making it a perfect base for a relaxing **Ubud villa rental**.

Each of the three refined bedrooms features a queen-size bed, Smart TV, air-conditioning and an en-suite bathroom. The master comes with a canopy mosquito net and an outdoor bathtub; the second bedroom has an outdoor shower; the third offers a semi-open bathing experience — ideal for friends or families seeking a comfortable **villa rental in Ubud**.

Indoors meet outdoors through breezy open spaces, natural cross-ventilation and ceiling fans. A carved wooden map of Bali anchors the lounge, while the dining area seats six and the modern island kitchen invites easy meals after exploring Ubud’s temples, cafés and yoga studios.

Step into your private oasis: a **sparkling pool** crowned by a Buddha statue, a **sunken lounge** overlooking the water, and two floating loungers for pure relaxation. Unwind in the **balé bengong gazebo** draped with white curtains — perfect for massages. Two additional sun loungers face the lush garden and an outdoor shower completes this **tropical haven**.

With its privileged location, **Villa Myassa Ubud** places you close to restaurants, markets and the Tegallalang rice terraces. Whether you’re planning a couple’s getaway or a **family holiday in Bali**, this **Ubud private-pool villa** is an elegant, serene choice. **Book** your tropical escape today.`,
    id: `Selamat datang di Villa Myassa — **vila di Ubud, Bali** yang nyaman untuk liburan tropis. Berada di Singakerta yang tenang, dikelilingi sawah dan hutan, **vila Ubud dengan kolam renang pribadi** ini memadukan desain kontemporer dan kehangatan Bali. Lokasi hanya beberapa menit dari **pusat Ubud** dan **Monkey Forest**, cocok sebagai **sewa vila Ubud** untuk keluarga maupun teman.

Tiga kamar tidur elegan masing-masing memiliki kasur queen, Smart TV, AC, dan kamar mandi dalam. Kamar utama dilengkapi kelambu kanopi serta bak mandi luar ruang; kamar kedua dengan shower luar ruang; dan kamar ketiga menghadirkan pengalaman semi-terbuka — pas untuk tamu yang mencari **vila sewa di Ubud** yang nyaman dan privat.

Ruang dalam dan luar menyatu melalui area terbuka yang lapang, ventilasi silang alami, serta kipas plafon. Peta Bali ukiran kayu mempercantik ruang keluarga; area makan untuk enam orang; dapur moden dengan island memudahkan memasak setelah menjelajah kafe, studio yoga, dan pura di Ubud.

Di luar, nikmati oasis pribadi: **kolam renang berkilau** berhias patung Buddha, **sunken lounge** menghadap air, serta dua matras apung untuk bersantai. Rebahkan diri di **balé bengong** dengan tirai putih — ideal untuk pijat. Dua kursi berjemur menghadap taman rimbun, sementara shower luar ruang melengkapi **surga tropis** ini.

Berkat lokasinya yang strategis, **Villa Myassa Ubud** dekat restoran, pasar, serta sawah terasering Tegallalang. Baik untuk pasangan maupun **liburan keluarga di Bali**, **vila dengan kolam renang pribadi** ini adalah pilihan tenang dan elegan. **Pesan** liburan tropis Anda hari ini.`,
  },
};

const LTEXT = (lang: Lang) => ({
  nav: {
    gallery: lang === "fr" ? "Galerie" : lang === "id" ? "Galeri" : "Gallery",
    features: lang === "fr" ? "Atouts" : lang === "id" ? "Keunggulan" : "Highlights",
    location: lang === "fr" ? "Localisation" : lang === "id" ? "Lokasi" : "Location",
    contact: lang === "fr" ? "Contact" : lang === "id" ? "Kontak" : "Contact",
    tour: lang === "fr" ? "Visite 3D" : lang === "id" ? "Tur 3D" : "3D Tour",
    book: lang === "fr" ? "Réserver" : lang === "id" ? "Pesan" : "Book",
  },
  hero: {
    capacity: DATA_BASE.capacite[lang],
    baths: DATA_BASE.chambres[lang],
    area: DATA_BASE.distance[lang],
  },
  description: {
    title: lang === "fr" ? "Description" : lang === "id" ? "Deskripsi" : "Description",
    more: lang === "fr" ? "LIRE PLUS" : lang === "id" ? "BACA LEBIH LANJUT" : "READ MORE",
    less: lang === "fr" ? "LIRE MOINS" : lang === "id" ? "SEMBUNYIKAN" : "READ LESS",
  },
  tour: {
    title: lang === "fr" ? "Visite 3D (360°)" : lang === "id" ? "Tur Virtual 3D (360°)" : "3D Virtual Tour (360°)",
    subtitle:
      lang === "fr"
        ? "Cliquez sur l’image — la visite s’ouvre dans un onglet, et Bestay dans un second."
        : lang === "id"
        ? "Klik gambar — tur akan terbuka di tab baru, dan Bestay di tab lainnya."
        : "Click the image — the tour opens in a new tab, and Bestay in another.",
    button:
      lang === "fr" ? "Cliquer pour ouvrir la visite" : lang === "id" ? "Klik untuk membuka tur" : "Click to open the tour",
    fallback1: lang === "fr" ? "la visite Matterport" : lang === "id" ? "tur Matterport" : "the Matterport tour",
    fallback2: lang === "fr" ? "la page Bestay" : lang === "id" ? "halaman Bestay" : "the Bestay page",
    fallbackText:
      lang === "fr"
        ? "Si votre navigateur bloque l’ouverture d’un des onglets, ouvrez manuellement "
        : lang === "id"
        ? "Jika peramban memblokir salah satu tab, buka secara manual "
        : "If your browser blocks one of the tabs, open ",
    fallbackText2: lang === "fr" ? " ou " : lang === "id" ? " atau " : " or ",
  },
  features: {
    title: lang === "fr" ? "Atouts & Équipements" : lang === "id" ? "Keunggulan & Fasilitas" : "Highlights & Amenities",
    subtitle:
      lang === "fr"
        ? "Tout ce dont vous avez besoin pour un séjour réussi"
        : lang === "id"
        ? "Semua yang Anda butuhkan untuk masa inap yang menyenangkan"
        : "Everything you need for a great stay",
  },
  location: { title: lang === "fr" ? "Localisation" : lang === "id" ? "Lokasi" : "Location" },
  contact: {
    title: lang === "fr" ? "Contact" : lang === "id" ? "Kontak" : "Contact",
    yourName: lang === "fr" ? "Votre nom" : lang === "id" ? "Nama Anda" : "Your name",
    yourEmail: lang === "fr" ? "Votre email" : lang === "id" ? "Email Anda" : "Your email",
    yourMessage: lang === "fr" ? "Votre message" : lang === "id" ? "Pesan Anda" : "Your message",
    sendEmail: lang === "fr" ? "Envoyer par email" : lang === "id" ? "Kirim via email" : "Send by email",
    openMailer: lang === "fr" ? "Ouvrir votre messagerie" : lang === "id" ? "Buka aplikasi email" : "Open your mail app",
    emailLabel: "Email",
  },
});

/* ----------------------------- 3) UI ----------------------------- */

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
      <div className="mt-6 md:mt-8">{children}</div>
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

/* ----------------------------- 4) PAGE ----------------------------- */

export default function Page() {
  // Lang
  const [lang, setLang] = useState<Lang>("fr");
  useEffect(() => {
    const saved =
      typeof window !== "undefined" ? window.localStorage.getItem("lang") : null;
    if (saved === "fr" || saved === "en" || saved === "id") setLang(saved);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem("lang", lang);
  }, [lang]);
  const L = useMemo(() => LTEXT(lang), [lang]);

  // Form
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const hero = (DATA_BASE.images.find((i) => i.featured) ?? DATA_BASE.images[0]) as {
    src: string;
    alt: string;
  };

  const images = DATA_BASE.images;
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
        : lang === "id"
        ? `Permintaan informasi – ${DATA_BASE.nom}`
        : `Information request – ${DATA_BASE.nom}`;
    const body =
      lang === "fr"
        ? `Bonjour,\n\nJe souhaite me renseigner au sujet de ${DATA_BASE.nom}.\n\nNom: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`
        : lang === "id"
        ? `Halo,\n\nSaya ingin menanyakan tentang ${DATA_BASE.nom}.\n\nNama: ${form.name}\nEmail: ${form.email}\nPesan: ${form.message}`
        : `Hello,\n\nI'd like information about ${DATA_BASE.nom}.\n\nName: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`;
    window.location.href = `mailto:${DATA_BASE.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  // Virtual tour
  const openVirtualTour = () => {
    window.open(DATA_BASE.virtualTour.url, "_blank", "noopener,noreferrer");
    setTimeout(() => {
      window.open(DATA_BASE.virtualTour.fallbackUrl, "_blank", "noopener,noreferrer");
    }, 50);
  };
  const coverSrc =
    (DATA_BASE.virtualTour.cover?.startsWith("/")
      ? DATA_BASE.virtualTour.cover
      : `${PUBLIC_PREFIX}/${DATA_BASE.virtualTour.cover}`) || hero.src;

  // Description
  const description = (DATA_BASE.description as any)[lang] as string;
  const paragraphs = description.trim().split(/\n\s*\n/).map((p) => p.trim());
  const firstTwo = paragraphs.slice(0, 2);
  const rest = paragraphs.slice(2);
  const [showMore, setShowMore] = useState(false);

  // WhatsApp
  const waHref = `https://wa.me/${WA_NUMBER_INTL}?text=${encodeURIComponent(
    WA_TEXT_DEFAULT[lang]
  )}`;

  /* ------------------- JSON-LD LodgingBusiness (sans alerte) ------------------- */
  const jsonLdLodging = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Villa Myassa",
    url: SITE_ORIGIN,
    image: [
      `${SITE_ORIGIN}/photos/001-hero-piscine.jpg`,
      `${SITE_ORIGIN}/photos/003-suite1.jpg`,
      `${SITE_ORIGIN}/photos/005-cuisine.jpg`,
    ],
    description: DATA_BASE.baseline[lang],
    address: {
      "@type": "PostalAddress",
      streetAddress: "F66R+H95 Singakerta",
      addressLocality: "Ubud",
      addressRegion: "Bali",
      postalCode: "80571",
      addressCountry: "ID",
    },
    hasMap:
      "https://www.google.com/maps?q=F66R%2BH95%20Singakerta%2C%20Gianyar%20Regency%2C%20Bali%2080571%2C%20Ubud%2C%20Indonesia",
    geo: { "@type": "GeoCoordinates", latitude: -8.534, longitude: 115.255 },
    email: "contact@villamyassa.com",
    numberOfRooms: 3,
    checkinTime: "15:00",
    checkoutTime: "11:00",
    priceRange: "$150 - $250",
    makesOffer: {
      "@type": "Offer",
      url: BESTAY_URL,
      priceCurrency: "USD",
    },
    amenityFeature: ((DATA_BASE.pointsForts as any)[lang] || []).map((f: string) => ({
      "@type": "LocationFeatureSpecification",
      name: f,
      value: true,
    })),
    sameAs: [BESTAY_URL],
  };

  const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name:
          lang === "fr"
            ? "La villa dispose-t-elle d’une piscine privée ?"
            : lang === "id"
            ? "Apakah vilanya memiliki kolam renang pribadi?"
            : "Does the villa have a private pool?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            lang === "fr"
              ? "Oui, la Villa Myassa possède une piscine privée avec sunken lounge et gazebo."
              : lang === "id"
              ? "Ya, Villa Myassa memiliki kolam renang pribadi dengan sunken lounge dan bale bengong."
              : "Yes, Villa Myassa features a private pool with a sunken lounge and a gazebo.",
        },
      },
      {
        "@type": "Question",
        name:
          lang === "fr"
            ? "Combien de chambres et salles de bain ?"
            : lang === "id"
            ? "Berapa jumlah kamar tidur dan kamar mandi?"
            : "How many bedrooms and bathrooms?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            lang === "fr"
              ? "3 chambres (lits queen) et 3,5 salles de bain, toutes attenantes."
              : lang === "id"
              ? "3 kamar tidur (kasur queen) dan 3,5 kamar mandi, semuanya en-suite."
              : "3 bedrooms (queen beds) and 3.5 bathrooms, all en-suite.",
        },
      },
      {
        "@type": "Question",
        name:
          lang === "fr"
            ? "Comment réserver la villa ?"
            : lang === "id"
            ? "Bagaimana cara memesan vila?"
            : "How do I book?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            lang === "fr"
              ? "Cliquez sur « Réserver » pour accéder à la page Bestay et vérifier les disponibilités."
              : lang === "id"
              ? "Klik “Pesan” untuk membuka halaman Bestay dan mengecek ketersediaan."
              : "Click “Book” to open the Bestay page and check availability.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* JSON-LD */}
      <Script id="jsonld-lodging" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLodging) }} />
      <Script id="jsonld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }} />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div
          className="container mx-auto px-4 max-w-6xl
                        flex flex-col md:flex-row landscape:flex-col
                        md:items-center md:justify-between gap-2 md:gap-0
                        py-3 md:h-16 landscape:h-auto"
        >
          {/* Titre */}
          <div className="w-full md:w-auto">
            <a href="#accueil" className="select-none block w-full">
              <span
                className="
                  block text-2xl sm:text-3xl md:text-3xl font-extrabold tracking-tight font-serif
                  leading-snug text-center md:text-left landscape:text-center
                  md:whitespace-nowrap landscape:whitespace-normal
                "
                title="Villa Myassa, Ubud, BALI"
              >
                Villa Myassa, <span className="italic">Ubud</span>,
                <span className="hidden landscape:inline"><br /></span>{" "}
                <span className="uppercase">BALI</span>
              </span>
            </a>
          </div>

          {/* Nav + actions */}
          <div className="w-full md:w-auto flex flex-col md:flex-row items-center md:items-center justify-center md:justify-end gap-2 landscape:gap-3">
            <nav className="hidden md:flex landscape:flex w-full md:w-auto items-center justify-center md:justify-end gap-4 text-sm">
              <a href="#visite-3d" className="hover:underline">{L.nav.tour}</a>
              <a href="#galerie" className="hover:underline">{L.nav.gallery}</a>
              <a href="#atouts" className="hover:underline">{L.nav.features}</a>
              <a href="#localisation" className="hover:underline">{L.nav.location}</a>
              <a href="#contact" className="hover:underline">{L.nav.contact}</a>
            </nav>

            <div className="w-full md:w-auto flex items-center justify-center md:justify-end gap-2 flex-wrap">
              <label className="sr-only" htmlFor="lang-select">Langue</label>
              <select
                id="lang-select"
                className="h-9 rounded-md border px-2 text-sm bg-white"
                value={lang}
                onChange={(e) => setLang(e.target.value as Lang)}
                aria-label="Choisir la langue"
              >
                <option value="fr">🇫🇷 Français</option>
                <option value="en">🇬🇧 English</option>
                <option value="id">🇮🇩 Bahasa Indonesia</option>
              </select>

              <Button asChild>
                <a href={BESTAY_URL} target="_blank" rel="noreferrer" aria-label={L.nav.book}>
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {L.nav.book}
                </a>
              </Button>

              <a
                href={waHref}
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
        </div>
      </header>

      {/* Hero */}
      <section id="accueil">
        <div className="w-full">
          <img src={hero.src} alt={hero.alt} className="w-full h-[60vh] md:h-[70vh] object-cover" />
        </div>

        <div className="container mx-auto px-4 max-w-6xl py-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="mt-1 text-4xl md:text-5xl font-extrabold leading-tight">
              {DATA_BASE.baseline[lang]}
            </h1>
            <p className="mt-3 text-base md:text-lg text-neutral-700">
              {L.hero.capacity} • {L.hero.baths} • {L.hero.area}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="outline" size="lg" asChild><a href="#galerie">{L.nav.gallery}</a></Button>
              <Button size="lg" asChild><a href={BESTAY_URL} target="_blank" rel="noreferrer">{L.nav.book}</a></Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <Section id="description" title={L.description.title}>
        <Card className="rounded-2xl">
          <CardContent className="py-5">
            <div className="prose max-w-none leading-relaxed">
              {firstTwo.map((p, i) => (<p key={i} className="mb-4">{p}</p>))}
              {rest.length > 0 && (
                <>
                  <div
                    className={`overflow-hidden transition-[max-height,opacity] duration-300 ${showMore ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
                    aria-hidden={!showMore}
                  >
                    {rest.map((p, i) => (<p key={`rest-${i}`} className="mb-4">{p}</p>))}
                  </div>
                  <div className="mt-2">
                    <Button variant="outline" onClick={() => setShowMore((v) => !v)} aria-expanded={showMore}>
                      {showMore ? L.description.less : L.description.more}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Visite 3D */}
      <Section id="visite-3d" title={L.tour.title} subtitle={L.tour.subtitle}>
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
              src={coverSrc || hero.src}
              onError={(e) => { e.currentTarget.src = hero.src; }}
              alt="Visite 3D de la villa"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">
                <Rotate3D className="h-4 w-4" />
                <PlayCircle className="h-4 w-4" />
                {L.tour.button}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs text-neutral-600">
          {L.tour.fallbackText}
          <a className="underline" href={DATA_BASE.virtualTour.url} target="_blank" rel="noopener noreferrer">{L.tour.fallback1}</a>
          {L.tour.fallbackText2}
          <a className="underline" href={DATA_BASE.virtualTour.fallbackUrl} target="_blank" rel="noopener noreferrer">{L.tour.fallback2}</a>.
        </p>
      </Section>

      {/* Galerie */}
      <Section id="galerie" title={L.nav.gallery}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, i) => (<GalleryCard key={i} item={img} onOpen={() => openLb(i)} />))}
        </div>
      </Section>

      {/* Lightbox */}
      {lbIndex !== null && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[999] bg-black/90" onClick={closeLb}>
          <button type="button" onClick={(e) => { e.stopPropagation(); closeLb(); }} aria-label="Fermer" className="absolute top-4 right-4 rounded-full bg-white/10 hover:bg-white/20 p-2 text-white">
            <X className="h-6 w-6" />
          </button>

          <button type="button" onClick={(e) => { e.stopPropagation(); prevLb(); }} aria-label="Image précédente" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 p-3 text-white">
            <ChevronLeft className="h-7 w-7" />
          </button>

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <img src={images[lbIndex].src} alt={images[lbIndex].alt} onClick={(e) => e.stopPropagation()} className="max-h-[92vh] max-w-[92vw] rounded-2xl shadow-2xl" />
          </div>

          <button type="button" onClick={(e) => { e.stopPropagation(); nextLb(); }} aria-label="Image suivante" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 p-3 text-white">
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>
      )}

      {/* Atouts */}
      <Section id="atouts" title={L.features.title} subtitle={L.features.subtitle}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(DATA_BASE.pointsForts as any)[lang].map((p: string, i: number) => (
            <Card key={i} className="rounded-2xl">
              <CardHeader><CardTitle className="text-lg flex items-center gap-2">{p}</CardTitle></CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      {/* Localisation */}
      <Section id="localisation" title={L.location.title} subtitle={DATA_BASE.localisation[lang]}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="rounded-2xl order-2 lg:order-1">
            <CardContent className="py-5">
              <ul className="grid gap-2 py-2">
                <li className="flex items-center gap-2"><MapPin className="h-5 w-5" /> {DATA_BASE.adresse}</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="rounded-2xl order-1 lg:order-2">
            <CardContent className="p-0"><div dangerouslySetInnerHTML={{ __html: DATA_BASE.mapsEmbed }} /></CardContent>
          </Card>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title={L.contact.title}>
        <Card className="rounded-2xl">
          <CardContent className="py-5">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-3">
                <Input placeholder={L.contact.yourName} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Input placeholder={L.contact.yourEmail} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <Textarea placeholder={L.contact.yourMessage} rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleMailto}>{L.contact.sendEmail}</Button>
                  <Button variant="outline" asChild><a href={`mailto:${DATA_BASE.email}`}>{L.contact.openMailer}</a></Button>
                </div>
              </div>
              <div className="text-sm text-neutral-600">
                <p>{L.contact.emailLabel} : <a className="underline" href={`mailto:${DATA_BASE.email}`}>{DATA_BASE.email}</a></p>
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
