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

/**
 * Drapeau rectangle centré dans le cercle (fond gris + liseré sur le cercle)
 * Fallback automatique si /flags/xx.svg n'existe pas (teste /public/flags/xx.svg).
 */
const FlagImg = ({
  code,
  alt,
  className = "",
}: {
  code: Lang;
  alt: string;
  className?: string;
}) => {
  const [src, setSrc] = useState<string>(`/flags/${code}.svg`);
  return (
    <img
      src={src}
      alt={alt}
      className={`block w-[74%] h-auto rounded-[2px] object-contain ${className}`}
      onError={(e) => {
        const img = e.currentTarget as HTMLImageElement;
        if (img.dataset.fallback !== "1") {
          img.dataset.fallback = "1";
          setSrc(`/public/flags/${code}.svg`);
        }
      }}
    />
  );
};

const tr = (table: Record<Lang, string>, l: Lang) => table[l];

/** Lien Bestay par défaut du CTA principal */
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
    zh: "Singakerta，乌布—Gianyar，巴厘岛（印度尼西亚）",
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
      "TV / Smart TV di kamar tidur",
      "Kamar mandi dalam",
      "Brankas",
      "Kelambu nyamuk",
    ],
    zh: [
      "私人泳池",
      "空调",
      "高速 Wi-Fi",
      "免费停车位",
      "全套厨房（烤箱、灶台、冰箱、吐司机、电热水壶）",
      "卧室配备电视/智能电视",
      "卧室独立卫浴",
      "保险箱",
      "蚊帐",
    ],
  } as Record<Lang, string[]>,
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

Our privileged location in Singakerta places you at the gateway to Ubud’s vibrant cultural scene—Monkey Forest, Ubud Palace, art galleries, and countless cafés and boutiques—just minutes from your private sanctuary.

Book your tropical escape at Villa Myassa today and experience the harmony of modern elegance and the mystical magic of Bali’s jungle.`,
    id: `Selamat datang di Villa Myassa di Singakerta—perpaduan desain kontemporer dan suasana hutan Ubud yang memikat. Dari pintu masuk, air mancur elegan mengalir ke kolam yang tenang dengan pijakan batu, menghadirkan nuansa istimewa sejak awal masa inap Anda.

Tiga kamar tidur yang menawan dilengkapi ranjang queen, Smart TV, AC, dan kamar mandi dalam. Kamar utama memanjakan dengan kelambu kanopi dan bak mandi luar-ruang; kamar kedua memiliki shower luar-ruang yang menyegarkan, sementara kamar ketiga menawarkan pengalaman mandi semi-terbuka.

Ruang-ruang terbuka yang lapang menyatukan area dalam dan luar, sejuk alami berkat ventilasi silang dan kipas plafon. Peta Bali ukir kayu memperindah ruang keluarga yang nyaman—tempat berkumpul atau bersantai. Ruang makan menampung enam orang, dan dapur modern dengan pulau dapur siap untuk memasak bersama.

Di luar, oasis pribadi menanti: kolam renang berkilau dengan patung Buddha, sunken lounge yang menghadap air, serta dua sun lounger terapung untuk relaksasi total. Nikmati balé bengong berhias tirai putih—sempurna untuk pijat. Dua kursi berjemur tambahan menghadap taman rindang, dan shower kolam luar-ruang melengkapi suasana tropis ini.

Lokasi kami di Singakerta hanya beberapa menit dari pusat budaya Ubud—Monkey Forest, Istana Ubud, galeri seni, serta kafe dan butik yang tak terhitung jumlahnya—semuanya dekat dari surga pribadi Anda.

Pesan pelarian tropis Anda di Villa Myassa hari ini dan rasakan harmoni elegansi modern serta pesona mistis hutan Bali.`,
    zh: `欢迎来到位于 Singakerta 的 Villa Myassa——现代设计与乌布丛林的迷人景致在这里相遇。自入口处起，优雅的喷泉流入静谧水池，配以踏脚石，预示着一次不凡的入住体验。

别墅设有三间精致卧室，均配备大床、智能电视、空调与独立卫浴。主卧设有浪漫的帐幔与室外浴缸；第二卧配有清爽的室外淋浴；第三卧提供半露天的沐浴体验。

别墅以通透的开放式布局自然衔接室内外空间，交叉通风与吊扇带来舒适清凉。客厅点缀木雕巴厘地图，温馨雅致，适合小憩与相聚；餐区可舒适容纳六人，带中岛的现代厨房让烹饪与交流更加愉悦。

走出屋外，私人天堂即刻呈现：晶莹泳池旁立有佛像，半下沉式休闲区面向水景，两张漂浮式躺椅带来彻底放松。白纱轻拢的巴厘式凉亭（balé bengong）非常适合按摩理疗；花园朝向另设两张日光躺椅，室外淋浴完善了这片热带绿洲。

别墅坐落于 Singakerta，毗邻乌布精彩的文化生活——猴林、乌布王宫、艺术画廊以及无数咖啡馆与精品小店均在数分钟车程内。出门即可享受热闹，回到家仍是一方私密静谧。

立即预订 Villa Myassa，感受现代优雅与巴厘丛林神秘魅力的和谐相遇。`,
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

/* Liens de réservation — logos dans /public/logos/ */
const BOOK_LINKS = [
  { name: "Bestay", logo: "/logos/bestay.svg", url: BESTAY_URL },
  { name: "Airbnb", logo: "/logos/airbnb.svg", url: "https://www.airbnb.com/rooms/1505417552730386824" },
  { name: "Booking.com", logo: "/logos/booking.svg", url: "https://www.booking.com/hotel/id/villa-myassa-by-balisuperhost.html" },

  // 🆕 Marriott – Homes & Villas
  {
    name: "Marriott Homes & Villas",
    logo: "/logos/marriott.svg",
    url: "https://homes-and-villas.marriott.com/en/properties/40580237-ubud-villa-myassa-3br-in-ubud-w-pool-and-garden",
  },

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
  // Langues
  const [lang, setLang] = useState<Lang>("fr");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("lang") : null;
    if (saved === "fr" || saved === "en" || saved === "id" || saved === "zh") setLang(saved as Lang);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem("lang", lang);
  }, [lang]);
  const L = useMemo(() => TEXT(lang), [lang]);

  // Formulaire contact
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // Carrousel (fondu 3s)
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

  // Lightbox galerie
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

  // Mailto
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

  // Virtual tour — seulement Matterport
  const openVirtualTour = () => {
    window.open(DATA_BASE.virtualTour.url, "_blank", "noopener,noreferrer");
  };

  // Description "Lire plus"
  const description = DATA_BASE.description[lang];
  const paragraphs = description.trim().split(/\n\s*\n/).map((p) => p.trim());
  const [showMore, setShowMore] = useState(false);

  // WhatsApp
  const waHref = `https://wa.me/${WA_NUMBER_INTL}?text=${encodeURIComponent(WA_TEXT_DEFAULT)}`;

  // NAV : pills + section active
  const navLinks = useMemo(
    () => [
      { id: "visite-3d", label: TEXT(lang).nav.tour },
      { id: "galerie", label: TEXT(lang).nav.gallery },
      { id: "atouts", label: TEXT(lang).nav.features },
      { id: "localisation", label: TEXT(lang).nav.location },
      { id: "contact", label: TEXT(lang).nav.contact },
    ],
    [lang]
  );
  const [activeSection, setActiveSection] = useState<string>("visite-3d");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    navLinks.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [navLinks]);

  /* Cercles de langues : fond gris + liseré pour toutes, ring noir sur actif */
  const circleBase =
    "inline-flex items-center justify-center rounded-full border bg-neutral-100 border-neutral-300";
  const circleActive = "ring-2 ring-black";

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur overflow-visible">
        {/* Décor latéral desktop */}
        <div className="hidden lg:block pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <img
            src="/decor/left.jpg"
            alt=""
            className="select-none absolute left-0 top-1/2 -translate-y-1/2 w-[22vw] max-w-[360px] rounded-md opacity-70 blur-[1px] object-cover"
            style={{
              maskImage: "linear-gradient(to right, black 80%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, black 80%, transparent)",
            }}
          />
          <img
            src="/decor/right.jpg"
            alt=""
            className="select-none absolute right-0 top-1/2 -translate-y-1/2 w-[22vw] max-w-[360px] rounded-md opacity-70 blur-[1px] object-cover"
            style={{
              maskImage: "linear-gradient(to left, black 80%, transparent)",
              WebkitMaskImage: "linear-gradient(to left, black 80%, transparent)",
            }}
          />
        </div>

        {/* Mobile */}
        <div className="relative z-10 flex flex-col items-center py-3 sm:hidden">
          <div className="text-center font-extrabold text-[8vw] leading-tight">
            Villa Myassa, <span className="italic">Ubud</span>, <span className="uppercase">Bali</span>
          </div>

          <div className="mt-2 flex items-center justify-center gap-2">
            {(["fr", "en", "id", "zh"] as Lang[]).map((c) => {
              const active = lang === c;
              return (
                <button
                  key={c}
                  aria-label={c.toUpperCase()}
                  className={`${circleBase} ${active ? circleActive : ""} h-8 w-8 p-[3px]`}
                  onClick={() => setLang(c)}
                  title={c.toUpperCase()}
                >
                  <FlagImg code={c} alt={c.toUpperCase()} />
                </button>
              );
            })}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-8 px-3 rounded-full">
                  <CalendarDays className="mr-1 h-4 w-4" />
                  {TEXT(lang).reserve}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-72 p-2 bg-white rounded-xl shadow-2xl">
                <div className="px-3 py-2 text-xs text-neutral-500">{TEXT(lang).choose}</div>
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

            <a href="https://www.tiktok.com/@villa.myassa" target="_blank" rel="noreferrer" aria-label="TikTok">
              <Image src="/logos/tiktok.png" alt="TikTok" width={24} height={24} />
            </a>
            <a href="https://www.instagram.com/villa_myassa_luxe_bali" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Image src="/logos/instagram.png" alt="Instagram" width={24} height={24} />
            </a>
          </div>
        </div>

        {/* Desktop */}
        <div className="relative z-10 hidden sm:block">
          <div className="container mx-auto px-4 max-w-6xl py-4 text-center">
            <div className="font-extrabold text-4xl md:text-5xl">
              Villa Myassa, <span className="italic">Ubud</span>, <span className="uppercase">Bali</span>
            </div>

            <div className="mt-3 flex items-center justify-center gap-4">
              {/* NAV pills */}
              <nav className="hidden md:flex items-center">
                <div className="flex items-center gap-2 bg-white/70 backdrop-blur border rounded-full p-1 shadow-sm">
                  {[
                    { id: "visite-3d", label: TEXT(lang).nav.tour },
                    { id: "galerie", label: TEXT(lang).nav.gallery },
                    { id: "atouts", label: TEXT(lang).nav.features },
                    { id: "localisation", label: TEXT(lang).nav.location },
                    { id: "contact", label: TEXT(lang).nav.contact },
                  ].map((n) => {
                    const active = activeSection === n.id;
                    return (
                      <a
                        key={n.id}
                        href={`#${n.id}`}
                        aria-current={active ? "page" : undefined}
                        className={[
                          "px-4 py-2 rounded-full text-sm font-medium transition outline-none",
                          "focus-visible:ring-2 focus-visible:ring-black",
                          active
                            ? "bg-black text-white shadow"
                            : "text-neutral-800 hover:bg-black/5",
                        ].join(" ")}
                      >
                        {n.label}
                      </a>
                    );
                  })}
                </div>
              </nav>

              {/* Langues */}
              <div className="flex items-center gap-2">
                {(["fr", "en", "id", "zh"] as Lang[]).map((c) => {
                  const active = lang === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setLang(c)}
                      aria-label={c.toUpperCase()}
                      className={`${circleBase} ${active ? circleActive : ""} h-9 w-9 p-[3px]`}
                      title={c.toUpperCase()}
                    >
                      <FlagImg code={c} alt={c.toUpperCase()} />
                    </button>
                  );
                })}
              </div>

              {/* Réserver */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="h-9 px-4 rounded-full">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {TEXT(lang).reserve}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-80 p-2 bg-white rounded-xl shadow-2xl">
                  <div className="px-3 py-2 text-xs text-neutral-500">{TEXT(lang).choose}</div>
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

      {/* Accroche + CTAs */}
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
              {paragraphs.slice(0, 2).map((p, i) => (
                <p key={i} className="mb-4">
                  {p}
                </p>
              ))}
              {paragraphs.length > 2 && (
                <>
                  <div
                    className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
                      showMore ? "max-h-[4000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                    aria-hidden={!showMore}
                  >
                    {paragraphs.slice(2).map((p, i) => (
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
              src={DATA_BASE.virtualTour.cover || heroSlides[0]}
              onError={(e) => {
                e.currentTarget.src = heroSlides[0];
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
                <li className="flex items-center gap-2">
                  <Waves className="h-5 w-5" /> Ubud – Bali
                </li>
                <li className="flex items-center gap-2">
                  <Car className="h-5 w-5" />{" "}
                  {lang === "fr"
                    ? "Accès / parking"
                    : lang === "en"
                    ? "Access / parking"
                    : lang === "id"
                    ? "Akses / parkir"
                    : "交通 / 停车"}
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
        <div className="container mx-auto px-4 max-w-6xl text-sm text-neutral-500 text-center">
          © {new Date().getFullYear()} {DATA_BASE.nom} — www.villamyassa.com — Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
