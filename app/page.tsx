"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Villa Myassa – app/page.tsx
 * - 4 languages (FR / EN / ID / ZH) with full descriptions
 * - Booking dropdown correctly positioned UNDER the button (desktop + mobile)
 * - Carousel with 3s fade for all photos
 * - Social icons (TikTok / Instagram) using public/logos assets
 * - Flag selector (public/flags/*.svg) with subtle gray background + border
 * - Sections: 3D Tour, Gallery, Features, Location, Contact
 */

type Lang = "fr" | "en" | "id" | "zh";

const BESTAY_URL = "https://bestay.co/villa/villa-myassa";
const AIRBNB_URL =
  "https://www.airbnb.com/rooms/1505417552730386824";
const BOOKING_URL =
  "https://www.booking.com/hotel/id/villa-myassa-by-balisuperhost.html";
const DIRECT_URL =
  "https://villamyassa.guestybookings.com/en/properties/68be42d2e105720013f38336";
const TRIP_URL =
  "https://fr.trip.com/hotels/detail/?cityEnName=Bali&cityId=723&hotelId=131766860&checkIn=2025-10-29&checkOut=2025-10-30&adult=2&children=0&crn=1&ages=&curr=USD&barcurr=USD&hoteluniquekey=H4sIAAAAAAAA_-NaxsTFJMEkNZ-J49S2SQfZhBgNLH4LOmrG9B8qDVvo4Hn2zJkzPkKLHQJ4ZjCe2fLKbiOjLdf1xQV7sx12MLKdYLzBtIDpLFD4FAsrxzYJCZZLLFsYo6uVslMrlaxMdJRKMktyUpWslELCHJV0lFJSi5OBHCArMTe_NK8EyDY21DMyAwqUJFZ4poC1JCfmJJfmJJakhlQWALWa6ShlFjuXFGUWBKXmZpaUpAJVpSXmFKeCxINSi4EyyWBBJT-gMUVQgcz8PIh2AxSxsMSc0lSIC4AWuqVC7TCsjX3EwhQd-4mF4RcLQxMrQxcrwyRWVo73UhJMu1jZIsN8XcNdpeQNDQwMTA2NTU11DRItLVIMksx0TSwsjc0sdC0NjE1NNDavePxjkbGR7ClGKUNzM0NzIzNzYwNLIwO9VDOgurzI8gxvby8PxiA2RyMnM1OzKBsuZk-XIMGeL2e_Sf-3tpdiDg12UTTQWil8IUXGQQskZwiTC2QAgw_2kXoTFvwwTJNxSGJNK9J1C8rYK1zA2MDI2MXILcDowRjBWAHirWJk2MDIuIPxPwwwvmIEmQ4Ata6V8u0BAAA&masterhotelid_tracelogid=100051355-0a98d0b6-489368-90354&detailFilters=17%7C1%7E17%7E1*31%7C131766860%7E31%7E131766860*80%7C1%7C1%7E80%7E1*29%7C1%7E29%7E1%7C2&hotelType=normal&display=inctotal&subStamp=1840&isCT=true&locale=fr-FR";
const WINGON_URL =
  "https://www.wingontravel.com/hotel/detail-bali-131766860/villa-myassa-by-balisuperhost/";
const MARRIOTT_URL =
  "https://homes-and-villas.marriott.com/en/properties/40580237-ubud-villa-myassa-3br-in-ubud-w-pool-and-garden";

const MATTERPORT_URL = "https://discover.matterport.com/space/xrHbRBnPwdy";

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
];

const toAlt = (name: string) =>
  name
    .replace(/^[0-9]+-/, "")
    .replace(/[-_]/g, " ")
    .replace(/\.(jpg|jpeg|png|webp)$/i, "");

const PUBLIC_PREFIX = "/photos";
const IMAGES = GALLERY_FILES.map((f, i) => ({
  src: `${PUBLIC_PREFIX}/${f}`,
  alt: toAlt(f),
  featured: i === 0,
}));

const FLAGS: Record<Lang, string> = {
  fr: "/flags/fr.svg",
  en: "/flags/en.svg",
  id: "/flags/id.svg",
  zh: "/flags/zh.svg",
};

const SOCIALS = [
  {
    href: "https://www.tiktok.com/@villa.myassa",
    icon: "/logos/tiktok.png",
    alt: "TikTok",
  },
  {
    href: "https://www.instagram.com/villa_myassa_luxe_bali",
    icon: "/logos/instagram.png",
    alt: "Instagram",
  },
];

// i18n UI strings + description
const LTEXT = (lang: Lang) => ({
  nav: {
    tour: { fr: "Visite 3D", en: "3D Tour", id: "Tur 3D", zh: "3D 参观" }[lang],
    gallery: { fr: "Galerie", en: "Gallery", id: "Galeri", zh: "画廊" }[lang],
    features: { fr: "Atouts", en: "Highlights", id: "Fasilitas", zh: "亮点" }[lang],
    location: { fr: "Localisation", en: "Location", id: "Lokasi", zh: "位置" }[lang],
    contact: { fr: "Contact", en: "Contact", id: "Kontak", zh: "联系" }[lang],
    book: { fr: "Réserver", en: "Book", id: "Pesan", zh: "预订" }[lang],
  },
  baseline: {
    fr: "Villa contemporaine avec piscine privée au cœur d’Ubud – BALI",
    en: "Contemporary villa with private pool in the heart of Ubud – BALI",
    id: "Vila kontemporer dengan kolam renang pribadi di jantung Ubud – BALI",
    zh: "位于乌布中心的现代别墅，带私人泳池 – 巴厘",
  }[lang],
  hero: {
    capacity: {
      fr: "3 chambres (lits queen)",
      en: "3 bedrooms (queen beds)",
      id: "3 kamar tidur (queen)",
      zh: "3 间卧室（大床）",
    }[lang],
    baths: {
      fr: "3.5 salles de bain",
      en: "3.5 bathrooms",
      id: "3.5 kamar mandi",
      zh: "3.5 间浴室",
    }[lang],
    area: {
      fr: "Jungle d’Ubud (Singakerta)",
      en: "Ubud jungle (Singakerta)",
      id: "Hutan Ubud (Singakerta)",
      zh: "乌布丛林（新加尔凯尔塔）",
    }[lang],
  },
  reserve: { fr: "Choisir une plateforme", en: "Choose a platform", id: "Pilih platform", zh: "选择预订平台" }[lang],
  choose: { fr: "Plateformes", en: "Platforms", id: "Platform", zh: "平台" }[lang],
  tourSec: {
    title: { fr: "Visite 3D (360°)", en: "3D Virtual Tour (360°)", id: "Tur 3D (360°)", zh: "3D 全景参观" }[lang],
    subtitle: {
      fr: "Cliquez pour ouvrir la visite Matterport dans un nouvel onglet.",
      en: "Click to open the Matterport tour in a new tab.",
      id: "Klik untuk membuka tur Matterport di tab baru.",
      zh: "单击在新标签页打开 Matterport 全景参观。",
    }[lang],
  },
  descriptionTitle: { fr: "Description", en: "Description", id: "Deskripsi", zh: "简介" }[lang],
  featuresTitle: {
    fr: "Atouts & Équipements",
    en: "Highlights & Amenities",
    id: "Fasilitas Unggulan",
    zh: "亮点与设施",
  }[lang],
  featuresSubtitle: {
    fr: "Tout ce dont vous avez besoin pour un séjour réussi",
    en: "Everything you need for a great stay",
    id: "Semua kebutuhan untuk liburan nyaman",
    zh: "满足美好入住的一切",
  }[lang],
  locationTitle: { fr: "Localisation", en: "Location", id: "Lokasi", zh: "位置" }[lang],
  contactTitle: { fr: "Contact", en: "Contact", id: "Kontak", zh: "联系" }[lang],
});

// Full long descriptions
const DESCRIPTIONS: Record<Lang, string> = {
  fr: `Bienvenue à la Villa Myassa à Singakerta, où le design contemporain rencontre le paysage enchanteur de la jungle d'Ubud. Dès l'entrée, une élégante fontaine se jette dans un paisible bassin avec pas japonais, créant un chemin captivant qui donnera le ton à votre séjour extraordinaire.

Les trois chambres raffinées de la Villa Myassa disposent chacune d'un lit queen-size, d'une Smart TV, de la climatisation et d'une salle de bain attenante. La chambre principale vous enchantera avec sa moustiquaire à baldaquin et sa baignoire extérieure, la deuxième chambre vous rafraîchira avec sa douche extérieure, tandis que la troisième chambre offre une expérience de bain semi-extérieure.

La Villa Myassa allie harmonieusement intérieur et extérieur avec ses espaces ouverts et aérés, naturellement rafraîchis par une ventilation transversale et des ventilateurs de plafond. Une magnifique carte balinaise en bois agrémente le confortable salon, idéal pour se réunir ou se détendre. La salle à manger peut accueillir confortablement six personnes, tandis que la cuisine moderne avec îlot central invite les convives à concocter des repas mémorables.

Sortez de la Villa Myassa et pénétrez dans votre oasis privée, où une piscine étincelante, couronnée d'une statue de Bouddha, vous attend. Le coin salon en contrebas (Sunken) offre une vue imprenable sur l'eau, tandis que deux chaises longues flottantes invitent à la détente. Installez-vous dans le gazebo balinais « balé bengong », drapé de rideaux blancs pour d'excellents massages. Deux chaises longues supplémentaires donnent sur le jardin luxuriant, tandis que la douche extérieure de la piscine complète ce paradis tropical.

L'emplacement privilégié de la Villa Myassa à Singakerta vous place aux portes de la scène culturelle dynamique d'Ubud. Explorez la célèbre Forêt des Singes, visitez le palais historique d'Ubud, plongez dans la scène artistique locale et découvrez d'innombrables restaurants et boutiques, le tout à proximité de votre sanctuaire privé.

Réservez dès aujourd'hui votre escapade tropicale à la Villa Myassa et découvrez l'alliance de l'élégance moderne et de la magie mystique de la jungle balinaise.`,
  en: `Welcome to Villa Myassa in Singakerta, where contemporary design meets the enchanting landscape of Ubud’s jungle. From the entrance, an elegant fountain flows into a serene pond with stepping stones, setting the tone for an extraordinary stay.

Each of the three refined bedrooms features a queen-size bed, Smart TV, air conditioning, and an en-suite bathroom. The master delights with a canopy mosquito net and an outdoor bathtub; the second bedroom offers a refreshing outdoor shower, and the third features a semi-open bathing experience.

Villa Myassa blends indoors and outdoors with open, airy spaces, naturally cooled by cross-ventilation and ceiling fans. A beautiful carved wooden map of Bali anchors the cozy lounge, perfect for gathering or relaxing. The dining area seats six comfortably, while the modern kitchen with an island invites memorable meals.

Step into your private oasis: a sparkling pool crowned by a Buddha statue, a sunken lounge overlooking the water, and two floating loungers for pure relaxation. Unwind in the balé bengong gazebo draped with white curtains—perfect for massages. Two additional sun loungers face the lush garden, while the outdoor pool shower completes this tropical haven.

Our privileged location in Singakerta places you at the gateway to Ubud’s vibrant cultural scene—Monkey Forest, Ubud Palace, art galleries, and countless cafés and boutiques—minutes from your private sanctuary.

Book your tropical escape at Villa Myassa today and experience the harmony of modern elegance and the mystical magic of Bali’s jungle.`,
  id: `Selamat datang di Villa Myassa di Singakerta, tempat desain kontemporer berpadu dengan lanskap hutan Ubud yang menawan. Dari pintu masuk, air mancur elegan mengalir ke kolam tenang dengan pijakan batu, menciptakan suasana untuk liburan luar biasa.

Tiga kamar tidur elegan masing‑masing dilengkapi tempat tidur queen, Smart TV, AC, dan kamar mandi dalam. Kamar utama memikat dengan kelambu kanopi dan bathtub luar; kamar kedua memiliki shower luar, dan kamar ketiga menawarkan pengalaman mandi semi‑terbuka.

Villa Myassa memadukan ruang dalam dan luar dengan area terbuka yang sejuk berkat ventilasi silang dan kipas langit‑langit. Peta Bali kayu ukir mempercantik ruang keluarga yang nyaman; meja makan untuk enam orang; dan dapur modern dengan pulau siap untuk memasak bersama.

Di luar, nikmati oasis pribadi: kolam renang berkilau dengan patung Buddha, sunken lounge menghadap air, serta dua kursi santai terapung. Bersantai di balé bengong berhias tirai putih—sempurna untuk pijat. Dua kursi berjemur tambahan menghadap taman rimbun, dan shower luar melengkapi surga tropis ini.

Lokasi istimewa di Singakerta menempatkan Anda di gerbang budaya Ubud—Monkey Forest, Istana Ubud, galeri seni, serta kafe dan butik—semuanya dekat dari vila.

Pesan liburan tropis Anda di Villa Myassa hari ini dan rasakan harmoni kemewahan modern dan pesona mistis hutan Bali.`,
  zh: `欢迎来到位于新加尔凯尔塔（Singakerta）的 Myassa 别墅，这里将现代设计与乌布丛林的迷人风景完美融合。自入口起，优雅的喷泉流入静谧的水池，踏石相连，为您的非凡之旅定下基调。

三间精致卧室均配备大床、智能电视、空调和独立卫浴。主卧设有帐幔防蚊和户外浴缸；第二卧室配户外淋浴；第三卧室提供半露天的沐浴体验。

别墅以通风开阔的格局将室内外无缝连接，交叉通风与吊扇带来自然清凉。客厅内雕刻木制巴厘岛地图点缀温馨氛围；餐区可舒适容纳 6 人；开放式厨房配备中岛，适合烹制美味共享。

走到户外，您的私密绿洲就在眼前：晶莹泳池配有佛像、临水下沉式休息区、两张漂浮躺椅供您尽情放松。白色帷幔装点的 balé bengong 凉亭非常适合按摩；花园旁另有日光躺椅；室外淋浴完善热带度假体验。

别墅地处新加尔凯尔塔黄金位置，距离乌布文化核心——猴林、乌布皇宫、艺术画廊和各式咖啡馆与精品店仅数分钟路程。

立即预订 Myassa 别墅，邂逅现代优雅与巴厘丛林神秘魅力的完美融合。`,
};

const POINTS: Record<Lang, string[]> = {
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
    "High-speed Wi‑Fi",
    "Free on-site parking",
    "Full kitchen (oven, cooktop, fridge, toaster, kettle)",
    "TV / Smart TV in bedrooms",
    "En‑suite bathrooms",
    "Safe",
    "Mosquito nets",
  ],
  id: [
    "Kolam renang pribadi",
    "AC",
    "Wi‑Fi cepat",
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
    "高速 Wi‑Fi",
    "免费停车位",
    "全套厨房（烤箱、炉灶、冰箱、烤面包机、电热水壶）",
    "卧室配电视 / 智能电视",
    "独立卫浴",
    "保险箱",
    "防蚊帐",
  ],
};

function classNames(...arr: (string | boolean | undefined)[]) {
  return arr.filter(Boolean).join(" ");
}

export default function Page() {
  const [lang, setLang] = useState<Lang>("fr");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("lang") : null;
    if (saved === "fr" || saved === "en" || saved === "id" || saved === "zh") setLang(saved);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem("lang", lang);
  }, [lang]);

  const L = useMemo(() => LTEXT(lang), [lang]);

  // Carousel
  const [slide, setSlide] = useState(0);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    fadeRef.current = setInterval(() => setSlide((s) => (s + 1) % IMAGES.length), 3000);
    return () => {
      if (fadeRef.current) clearInterval(fadeRef.current);
    };
  }, []);

  // Booking dropdown
  const [openMenu, setOpenMenu] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpenMenu(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  const BOOK_LINKS = [
    { label: "Bestay", href: BESTAY_URL, icon: "/logos/bestay.svg" },
    { label: "Airbnb", href: AIRBNB_URL, icon: "/logos/airbnb.svg" },
    { label: "Booking.com", href: BOOKING_URL, icon: "/logos/booking.svg" },
    { label: "Marriott Homes & Villas", href: MARRIOTT_URL, icon: "/logos/marriott-hv.png" },
    { label: "Trip.com", href: "/logos/trip.png", external: TRIP_URL },
    { label: "WingOnTravel", href: WINGON_URL, icon: "/logos/wingon.png" },
    { label: "Direct", href: DIRECT_URL, icon: "/logos/direct.svg" },
  ].map((x) => ({
    ...x,
    href: (x as any).external || x.href,
  }));

  const hero = IMAGES[0];

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Title line (centered) */}
          <div className="flex flex-col items-center pt-4">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center">
              Villa Myassa, Ubud, BALI
            </h1>

            {/* Lang + Book + Socials */}
            <div className="mt-4 flex items-center gap-2 md:gap-4">
              {/* Flags */}
              <div className="flex items-center gap-2">
                {(Object.keys(FLAGS) as Lang[]).map((code) => (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    aria-label={code}
                    className={classNames(
                      "h-8 w-8 rounded-full border border-neutral-300 bg-neutral-100/60 backdrop-blur hover:bg-neutral-200 transition p-[2px]",
                      lang === code && "ring-2 ring-neutral-700"
                    )}
                  >
                    <img
                      src={FLAGS[code]}
                      alt={code}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Book dropdown */}
              <div className="relative inline-block" ref={wrapperRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenu((v) => !v);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-black text-white px-4 py-2 text-sm font-semibold shadow-md hover:opacity-90"
                >
                  <span className="i-lucide-calendar mr-1" />
                  {L.nav.book}
                </button>

                {openMenu && (
                  <div
                    className="absolute top-full md:right-0 left-1/2 -translate-x-1/2 md:translate-x-0 mt-2 w-[280px] rounded-xl border border-neutral-200 bg-white shadow-lg z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-3 py-2 text-xs text-neutral-500">{L.reserve}</div>
                    <ul className="max-h-[70vh] overflow-auto py-1">
                      {BOOK_LINKS.map((b, i) => (
                        <li key={i}>
                          <a
                            className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-50"
                            href={b.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {/* icon (if png/svg in /logos) */}
                            {b.icon ? (
                              <img src={b.icon} alt="" className="h-5 w-5 object-contain" />
                            ) : null}
                            <span className="text-sm">{b.label}</span>
                            <span className="ml-auto text-neutral-400">↗</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Socials */}
              <div className="ml-1 hidden md:flex items-center gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.alt}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white hover:bg-neutral-50"
                    aria-label={s.alt}
                  >
                    <img src={s.icon} alt={s.alt} className="h-5 w-5 object-contain" />
                  </a>
                ))}
              </div>
            </div>

            {/* Second line nav */}
            <nav className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {[
                { href: "#visite-3d", label: L.nav.tour },
                { href: "#galerie", label: L.nav.gallery },
                { href: "#atouts", label: L.nav.features },
                { href: "#localisation", label: L.nav.location },
                { href: "#contact", label: L.nav.contact },
              ].map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="px-4 py-2 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-sm shadow-sm"
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* HERO with fading carousel */}
      <section id="accueil" className="relative">
        <div className="relative w-full h-[58vh] md:h-[68vh] overflow-hidden">
          {IMAGES.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              className={classNames(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
                i === slide ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 max-w-6xl py-8">
          <h2 className="text-xl md:text-2xl font-semibold">{LTEXT(lang).baseline}</h2>
          <p className="text-neutral-700 mt-1 text-sm">
            {LTEXT(lang).hero.capacity} • {LTEXT(lang).hero.baths} • {LTEXT(lang).hero.area}
          </p>
        </div>
      </section>

      {/* Description */}
      <section id="description" className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h3 className="text-2xl md:text-3xl font-bold">{LTEXT(lang).descriptionTitle}</h3>
          <article className="prose prose-neutral max-w-none mt-6 whitespace-pre-line">
            {DESCRIPTIONS[lang]}
          </article>
        </div>
      </section>

      {/* 3D Tour */}
      <section id="visite-3d" className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h3 className="text-2xl md:text-3xl font-bold">{LTEXT(lang).tourSec.title}</h3>
          <p className="text-neutral-600 mt-2">{LTEXT(lang).tourSec.subtitle}</p>

          <a
            href={MATTERPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black text-white px-6 py-3 font-semibold shadow hover:opacity-90"
          >
            ↗ Matterport
          </a>
        </div>
      </section>

      {/* Gallery */}
      <section id="galerie" className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h3 className="text-2xl md:text-3xl font-bold">{LTEXT(lang).nav.gallery}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {IMAGES.map((img, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl shadow-sm">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="atouts" className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h3 className="text-2xl md:text-3xl font-bold">{LTEXT(lang).featuresTitle}</h3>
          <p className="text-neutral-600 mt-2">{LTEXT(lang).featuresSubtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {POINTS[lang].map((p, i) => (
              <div key={i} className="rounded-2xl border bg-white p-4 shadow-sm">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="localisation" className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h3 className="text-2xl md:text-3xl font-bold">{LTEXT(lang).locationTitle}</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="rounded-2xl border p-4">
              <ul className="space-y-2 text-sm">
                <li>F66R+H95 Singakerta, Gianyar Regency, Bali 80571, Ubud, Indonesia</li>
                <li>Ubud Monkey Forest • Ubud Palace • Art & Yoga • Cafés & Boutiques</li>
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden border">
              <iframe
                src="https://www.google.com/maps?q=F66R%2BH95%20Singakerta%2C%20Gianyar%20Regency%2C%20Bali%2080571%2C%20Ubud%2C%20Indonesia&output=embed"
                width="100%"
                height="380"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h3 className="text-2xl md:text-3xl font-bold">{LTEXT(lang).contactTitle}</h3>

          <div className="rounded-2xl border bg-white p-6 mt-6">
            <p className="text-sm">
              Email:{" "}
              <a className="underline" href="mailto:contact@villamyassa.com">
                contact@villamyassa.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* WhatsApp bubble */}
      <a
        href={"https://wa.me/33688647659?text=" + encodeURIComponent("Bonjour, je souhaite des informations sur la Villa Myassa (dates, tarifs, etc.).")}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        title="WhatsApp"
        className="fixed bottom-4 right-4 z-[1000] inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:scale-105 transition"
      >
        {/* simple WA icon */}
        <span className="text-xl">✆</span>
      </a>

      {/* Footer */}
      <footer className="py-10 border-t mt-10">
        <div className="container mx-auto px-4 max-w-6xl text-sm text-neutral-500">
          © {new Date().getFullYear()} Villa Myassa — www.villamyassa.com — Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}

