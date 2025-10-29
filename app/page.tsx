"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const IMAGES_ALL: GalleryItem[] = GALLERY_FILES.map((f, i) => ({
  src: `${PUBLIC_PREFIX}/${f}`,
  alt: toAlt(f),
  featured: i === 0,
}));

/* -------------------------------------------------------
   2) DONNÉES / I18N
------------------------------------------------------- */

type Lang = "fr" | "en" | "id" | "zh";

const tr = (table: Record<Lang, string>, l: Lang) => table[l];

const BESTAY_URL =
  "https://villamyassa.guestybookings.com/en/properties/68be42d2e105720013f38336";
const WA_NUMBER_INTL = "33688647659";
const WA_TEXT_DEFAULT =
  "Bonjour, je souhaite des informations sur la Villa Myassa (dates, tarifs, etc.).";

const DATA_BASE = {
  nom: "Villa Myassa",
  baseline: {
    fr: "Villa contemporaine avec piscine privée au cœur d’Ubud – BALI",
    en: "Contemporary villa with private pool in the heart of Ubud – BALI",
    id: "Vila kontemporer dengan kolam renang pribadi di pusat Ubud – BALI",
    zh: "位于乌布中心的现代别墅，配有私人泳池 – 巴厘岛",
  } as Record<Lang, string>,
  localisation: {
    fr: "Singakerta, Ubud — Gianyar, Bali (Indonésie)",
    en: "Singakerta, Ubud — Gianyar, Bali (Indonesia)",
    id: "Singakerta, Ubud — Gianyar, Bali (Indonesia)",
    zh: "Singakerta，乌布—吉安市，巴厘岛（印度尼西亚）",
  } as Record<Lang, string>,
  capacite: {
    fr: "3 chambres (lits queen)",
    en: "3 bedrooms (queen beds)",
    id: "3 kamar (ranjang queen)",
    zh: "3 间卧室（大床）",
  } as Record<Lang, string>,
  chambres: {
    fr: "3.5 salles de bain",
    en: "3.5 bathrooms",
    id: "3.5 kamar mandi",
    zh: "3.5 间浴室",
  } as Record<Lang, string>,
  distance: {
    fr: "Jungle d’Ubud (Singakerta)",
    en: "Ubud jungle (Singakerta)",
    id: "Hutan Ubud (Singakerta)",
    zh: "乌布丛林（Singakerta）",
  } as Record<Lang, string>,
  email: "contact@villamyassa.com",
  images: IMAGES_ALL,
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
      "TV / Smart TV di kamar",
      "Kamar mandi dalam",
      "Brankas",
      "Kelambu nyamuk",
    ],
    zh: [
      "私人泳池",
      "空调",
      "高速 Wi-Fi",
      "免费停车",
      "全套厨房（烤箱、灶台、冰箱、烤面包机、电热水壶）",
      "卧室配备电视 / 智能电视",
      "独立卫浴",
      "保险箱",
      "蚊帐",
    ],
  } as Record<Lang, string[]>,
  description: {
    fr: `Bienvenue à la Villa Myassa à Singakerta, où le design contemporain rencontre le paysage enchanteur de la jungle d'Ubud. ...`,
    en: `Welcome to Villa Myassa in Singakerta, where contemporary design meets the enchanting landscape of Ubud’s jungle. ...`,
    id: `Selamat datang di Villa Myassa di Singakerta, di mana desain kontemporer bertemu suasana hutan Ubud yang memukau. ...`,
    zh: `欢迎来到位于 Singakerta 的 Villa Myassa，这里现代设计与乌布丛林的迷人景致相互融合。...`,
  } as Record<Lang, string>,
};

const TEXT = (l: Lang) => ({
  nav: {
    gallery: tr({ fr: "Galerie", en: "Gallery", id: "Galeri", zh: "相册" }, l),
    features: tr({ fr: "Atouts", en: "Highlights", id: "Keunggulan", zh: "亮点" }, l),
    location: tr({ fr: "Localisation", en: "Location", id: "Lokasi", zh: "位置" }, l),
    contact: tr({ fr: "Contact", en: "Contact", id: "Kontak", zh: "联系" }, l),
    tour: tr({ fr: "Visite 3D", en: "3D Tour", id: "Tur 3D", zh: "3D 虚拟参观" }, l),
    book: tr({ fr: "Réserver", en: "Book", id: "Pesan", zh: "预订" }, l),
  },
  description: {
    title: tr({ fr: "Description", en: "Description", id: "Deskripsi", zh: "简介" }, l),
    more: tr({ fr: "LIRE PLUS", en: "READ MORE", id: "BACA LEBIH", zh: "展开" }, l),
    less: tr({ fr: "LIRE MOINS", en: "READ LESS", id: "SINGKAT", zh: "收起" }, l),
  },
  tour: {
    title: tr({ fr: "Visite 3D (360°)", en: "3D Virtual Tour (360°)", id: "Tur Virtual 3D (360°)", zh: "3D 虚拟参观（360°）" }, l),
    subtitle: tr(
      {
        fr: "Cliquez sur l’image — la visite s’ouvre dans un onglet.",
        en: "Click the image — the tour opens in a new tab.",
        id: "Klik gambar — tur akan terbuka di tab baru.",
        zh: "点击图片—虚拟参观将在新标签打开。",
      },
      l
    ),
    button: tr({ fr: "Cliquer pour ouvrir la visite", en: "Click to open the tour", id: "Klik untuk membuka tur", zh: "点击打开参观" }, l),
  },
  features: {
    title: tr({ fr: "Atouts & Équipements", en: "Highlights & Amenities", id: "Keunggulan & Fasilitas", zh: "亮点与设施" }, l),
    subtitle: tr(
      { fr: "Tout ce dont vous avez besoin pour un séjour réussi", en: "Everything you need for a great stay", id: "Semua yang Anda butuhkan", zh: "旅居所需，应有尽有" },
      l
    ),
  },
  location: { title: tr({ fr: "Localisation", en: "Location", id: "Lokasi", zh: "位置" }, l) },
  contact: {
    title: tr({ fr: "Contact", en: "Contact", id: "Kontak", zh: "联系" }, l),
    yourName: tr({ fr: "Votre nom", en: "Your name", id: "Nama Anda", zh: "姓名" }, l),
    yourEmail: tr({ fr: "Votre email", en: "Your email", id: "Email Anda", zh: "邮箱" }, l),
    yourMessage: tr({ fr: "Votre message", en: "Your message", id: "Pesan Anda", zh: "留言" }, l),
    sendEmail: tr({ fr: "Envoyer par email", en: "Send by email", id: "Kirim email", zh: "通过邮件发送" }, l),
    openMailer: tr({ fr: "Ouvrir votre messagerie", en: "Open your mail app", id: "Buka aplikasi email", zh: "打开邮件应用" }, l),
    emailLabel: tr({ fr: "Email", en: "Email", id: "Email", zh: "邮箱" }, l),
  },
  reserve: tr({ fr: "Réserver", en: "Book", id: "Pesan", zh: "预订" }, l),
  choose: tr(
    { fr: "Choisir une plateforme", en: "Choose a platform", id: "Pilih platform", zh: "选择预订平台" },
    l
  ),
  bookNow: tr({ fr: "Réserver maintenant", en: "Book now", id: "Pesan sekarang", zh: "立即预订" }, l),
});

/* Réservation — logos dans /public/logos/ */
const BOOK_LINKS = [
  { name: "Bestay", logo: "/logos/bestay.svg", url: BESTAY_URL },
  { name: "Airbnb", logo: "/logos/airbnb.svg", url: "https://www.airbnb.com/rooms/1505417552730386824" },
  { name: "Booking.com", logo: "/logos/booking.svg", url: "https://www.booking.com/hotel/id/villa-myassa-by-balisuperhost.html" },
  { name: "Trip.com", logo: "/logos/trip.svg", url: "https://fr.trip.com/hotels/detail/?cityEnName=Bali&cityId=723&hotelId=131766860" },
  { name: "WingOnTravel", logo: "/logos/wingontravel.svg", url: "https://www.wingontravel.com/hotel/detail-bali-131766860/villa-myassa-by-balisuperhost/" },
];

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
  <section id={id} className="py-14 md:py-16 scroll-mt-24">
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
      <div className="mt-8 md:mt-10">{children}</div>
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
    if (saved === "fr" || saved === "en" || saved === "id" || saved === "zh") setLang(saved as Lang);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem("lang", lang);
  }, [lang]);
  const L = useMemo(() => TEXT(lang), [lang]);

  // ---- Form
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // Hero image (featured)
  const hero = (DATA_BASE.images.find((i) => i.featured) ?? DATA_BASE.images[0]) as {
    src: string;
    alt: string;
  };

  // Slideshow (fondu toutes les 3s)
  const heroSlides = DATA_BASE.images.slice(0, 6).map((i) => i.src);
  const [slide, setSlide] = useState(0);
  const intervalRef = useRef<number | null>(null);
  useEffect(() => {
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % heroSlides.length);
    }, 3000);
    intervalRef.current = id;
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [heroSlides.length]);

  const images = DATA_BASE.images;
  const [lbIndex, setLbIndex] = useState<number | null>(null);

  const closeLb = () => setLbIndex(null);
  const openLb = (i: number) => setLbIndex(i);
  const prevLb = () =>
    setLbIndex((i) => (i === null ? i : (i + images.length - 1) % images.length));
  const nextLb = () =>
    setLbIndex((i) => (i === null ? i : (i + 1) % images.length));

  // ESC / ← →
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
        : lang === "id"
        ? `Permintaan informasi – ${DATA_BASE.nom}`
        : `咨询 — ${DATA_BASE.nom}`;
    const body =
      lang === "fr"
        ? `Bonjour,\n\nJe souhaite me renseigner au sujet de ${DATA_BASE.nom}.\n\nNom: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`
        : lang === "en"
        ? `Hello,\n\nI'd like information about ${DATA_BASE.nom}.\n\nName: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`
        : lang === "id"
        ? `Halo,\n\nSaya ingin informasi tentang ${DATA_BASE.nom}.\n\nNama: ${form.name}\nEmail: ${form.email}\nPesan: ${form.message}`
        : `您好，\n\n我想了解关于 ${DATA_BASE.nom} 的信息。\n\n姓名: ${form.name}\n邮箱: ${form.email}\n留言: ${form.message}`;
    window.location.href = `mailto:${DATA_BASE.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  // Virtual tour — n’ouvre QUE Matterport (plus Bestay)
  const openVirtualTour = () => {
    window.open(DATA_BASE.virtualTour.url, "_blank", "noopener,noreferrer");
  };
  const coverSrc =
    (DATA_BASE.virtualTour.cover?.startsWith("/")
      ? DATA_BASE.virtualTour.cover
      : `${PUBLIC_PREFIX}/${DATA_BASE.virtualTour.cover}`) || hero.src;

  // Description "Lire plus"
  const description = DATA_BASE.description[lang];
  const paragraphs = description.trim().split(/\n\s*\n/).map((p) => p.trim());
  const firstTwo = paragraphs.slice(0, 2);
  const rest = paragraphs.slice(2);
  const [showMore, setShowMore] = useState(false);

  // WhatsApp links
  const waHrefTop = `https://wa.me/${WA_NUMBER_INTL}?text=${encodeURIComponent(WA_TEXT_DEFAULT)}`;
  const waHrefFloating = waHrefTop;

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        {/* Mobile: 2 lignes */}
        <div className="flex flex-col items-center py-3 sm:hidden">
          <div className="text-center font-extrabold text-[8vw] leading-tight">
            Villa Myassa, <span className="italic">Ubud</span>, <span className="uppercase">Bali</span>
          </div>
          <div className="mt-2 flex items-center justify-center gap-2">
            {(["fr", "en", "id", "zh"] as Lang[]).map((c) => (
              <button
                key={c}
                aria-label={c.toUpperCase()}
                className={`h-8 px-2 rounded-md border text-xs ${
                  lang === c ? "bg-black text-white" : "bg-white"
                }`}
                onClick={() => setLang(c)}
              >
                {c.toUpperCase()}
              </button>
            ))}

            {/* Menu Réserver */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-8 px-3 rounded-full">
                  <CalendarDays className="mr-1 h-4 w-4" />
                  {L.reserve}
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

            {/* Réseaux */}
            <a href="https://www.tiktok.com/@villa.myassa" target="_blank" rel="noreferrer" aria-label="TikTok">
              <Image src="/logos/tiktok.png" alt="TikTok" width={24} height={24} />
            </a>
            <a
              href="https://www.instagram.com/villa_myassa_luxe_bali"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Image src="/logos/instagram.png" alt="Instagram" width={24} height={24} />
            </a>
          </div>
        </div>

        {/* Desktop / paysage */}
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
                  <Button className="h-9 px-4 rounded-full">
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

      {/* Hero slideshow */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        {heroSlides.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt="Villa Myassa"
            fill
            className={`object-cover transition-opacity duration-700 ${i === slide ? "opacity-100" : "opacity-0"}`}
            priority={i === 0}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </section>

      {/* Intro & CTA */}
      <section className="container mx-auto px-4 max-w-6xl py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl text-center mx-auto"
        >
          <h1 className="mt-1 text-4xl md:text-5xl font-extrabold leading-tight">
            {DATA_BASE.baseline[lang]}
          </h1>
          <p className="mt-3 text-base md:text-lg text-neutral-700">
            {DATA_BASE.capacite[lang]} • {DATA_BASE.chambres[lang]} • {DATA_BASE.distance[lang]}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button variant="outline" size="lg" asChild>
              <a href="#galerie">{TEXT(lang).nav.gallery}</a>
            </Button>

            {/* CTA “Réserver maintenant” = Bestay par défaut */}
            <Button size="lg" asChild>
              <a href={BESTAY_URL} target="_blank" rel="noreferrer">
                {TEXT(lang).bookNow}
              </a>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Description */}
      <Section id="description" title={TEXT(lang).description.title}>
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
                      {showMore ? TEXT(lang).description.less : TEXT(lang).description.more}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Visite 3D */}
      <Section id="visite-3d" title={TEXT(lang).tour.title} subtitle={TEXT(lang).tour.subtitle}>
        <div
          role="button"
          tabIndex={0}
          onClick={openVirtualTour}
          onKeyDown={(e) =>
            ((e as any).key === "Enter" || (e as any).key === " ") && openVirtualTour()
          }
          className="group relative w-full cursor-pointer overflow-hidden rounded-2xl outline-none focus:ring-2 focus:ring-black/20"
          aria-label="Ouvrir la visite 3D"
        >
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] max-h-[620px]">
            <img
              src={coverSrc || hero.src}
              onError={(e) => {
                e.currentTarget.src = hero.src;
              }}
              alt="Visite 3D de la villa"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">
                <Rotate3D className="h-4 w-4" />
                <PlayCircle className="h-4 w-4" />
                {TEXT(lang).tour.button}
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* Galerie */}
      <Section id="galerie" title={TEXT(lang).nav.gallery}>
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
      <Section id="atouts" title={TEXT(lang).features.title} subtitle={TEXT(lang).features.subtitle}>
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
      <Section id="localisation" title={TEXT(lang).location.title} subtitle={DATA_BASE.localisation[lang]}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="rounded-2xl order-2 lg:order-1">
            <CardContent className="py-6">
              <ul className="grid gap-2 py-4">
                <li className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" /> {DATA_BASE.adresse}
                </li>
                {/* Placeholders info locale si besoin */}
                <li className="flex items-center gap-2">
                  <Waves className="h-5 w-5" /> Ubud – Bali
                </li>
                <li className="flex items-center gap-2">
                  <Car className="h-5 w-5" /> {lang === "fr" ? "Accès / parking" : lang === "en" ? "Access / parking" : lang === "id" ? "Akses / parkir" : "交通 / 停车"}
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
      <Section id="contact" title={TEXT(lang).contact.title}>
        <Card className="rounded-2xl">
          <CardContent className="py-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-3">
                <Input
                  placeholder={TEXT(lang).contact.yourName}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <Input
                  placeholder={TEXT(lang).contact.yourEmail}
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <Textarea
                  placeholder={TEXT(lang).contact.yourMessage}
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleMailto}>{TEXT(lang).contact.sendEmail}</Button>
                  <Button variant="outline" asChild>
                    <a href={`mailto:${DATA_BASE.email}`}>{TEXT(lang).contact.openMailer}</a>
                  </Button>
                </div>
              </div>
              <div className="text-sm text-neutral-600">
                <p>
                  {TEXT(lang).contact.emailLabel} :{" "}
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
        href={waHrefFloating}
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
        <div className="container mx-auto px-4 max-w-6xl text-sm text-neutral-500 text-center">
          © {new Date().getFullYear()} {DATA_BASE.nom} — www.villamyassa.com — Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
