"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Waves,
  Car,
  CalendarDays,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  Rotate3D,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/* -------------------------------------------------------
   PHOTOS (dans /public/photos)
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
  name
    .replace(/^[0-9]+-/, "")
    .replace(/[-_]/g, " ")
    .replace(/\.(jpg|jpeg|png|webp)$/i, "");

const PUBLIC_PREFIX = "/photos";
type GalleryItem = { src: string; alt: string; featured?: boolean };

const IMAGES: GalleryItem[] = GALLERY_FILES.map((f, i) => ({
  src: `${PUBLIC_PREFIX}/${f}`,
  alt: toAlt(f),
  featured: i === 0,
}));

/* -------------------------------------------------------
   TEXTES FR / EN
------------------------------------------------------- */

type Lang = "fr" | "en";

const TEXT = {
  fr: {
    siteTitle: "Villa Myassa, Ubud, BALI",
    baseline: "Villa contemporaine avec piscine privée au cœur d’Ubud – BALI",
    locationLine: "Singakerta, Ubud — Gianyar, Bali (Indonésie)",
    capacity: "3 chambres (lits queen)",
    baths: "3.5 salles de bain",
    distance: "Jungle d’Ubud (Singakerta)",
    nav: {
      tour: "Visite 3D",
      gallery: "Galerie",
      highlights: "Atouts",
      location: "Localisation",
      contact: "Contact",
    },
    heroNote: "Note (si dispo) – ex. 4.9/5",
    askDates: "Demander les dates",
    seeGallery: "Voir la galerie",
    reserveOnBestay: "Réserver sur Bestay",
    descriptionTitle: "Description",
    readMore: "LIRE PLUS",
    readLess: "LIRE MOINS",
    tourTitle: "Visite 3D (360°)",
    tourSubtitle:
      "Cliquez sur l’image – la visite s’ouvre dans un onglet, et Bestay dans un second.",
    tourCta: "Cliquer pour ouvrir la visite",
    tourHelp1: "Si votre navigateur bloque l’ouverture d’un des onglets, ouvrez manuellement",
    tourHelp2: "la visite Matterport",
    tourHelp3: "ou",
    tourHelp4: "la page Bestay",
    highlightsTitle: "Atouts & Équipements",
    highlightsSubtitle: "Tout ce dont vous avez besoin pour un séjour réussi",
    highlightList: [
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
    locationTitle: "Localisation",
    nearby: "Plages / points d’intérêt à proximité (à compléter)",
    access: "Accès / parking (à compléter)",
    contactTitle: "Contact",
    emailLabel: "Email",
    emailOpen: "Ouvrir votre messagerie",
    footer: (year: number) =>
      `© ${year} Villa Myassa — www.villamyassa.com — Tous droits réservés.`,
    description: `Bienvenue à la Villa Myassa à Singakerta, où le design contemporain rencontre le paysage enchanteur de la jungle d'Ubud. Dès l'entrée, une élégante fontaine se jette dans un paisible bassin avec pas japonais, créant un chemin captivant qui donnera le ton à votre séjour extraordinaire.

Les trois chambres raffinées de la Villa Myassa disposent chacune d'un lit queen-size, d'une Smart TV, de la climatisation et d'une salle de bain attenante. La chambre principale vous enchantera avec sa moustiquaire à baldaquin et sa baignoire extérieure, la deuxième chambre vous rafraîchira avec sa douche extérieure, tandis que la troisième chambre offre une expérience de bain semi-extérieure.

La Villa Myassa allie harmonieusement intérieur et extérieur avec ses espaces ouverts et aérés, naturellement rafraîchis par une ventilation transversale et des ventilateurs de plafond. Une magnifique carte balinaise en bois agrémente le confortable salon, idéal pour se réunir ou se détendre. La salle à manger peut accueillir confortablement six personnes, tandis que la cuisine moderne avec îlot central invite les convives à concocter des repas mémorables.

Sortez de la Villa Myassa et pénétrez dans votre oasis privée, où une piscine étincelante, couronnée d'une statue de Bouddha, vous attend. Le coin salon en contrebas (Sunken) offre une vue imprenable sur l'eau, tandis que deux chaises longues flottantes invitent à la détente. Installez-vous dans le gazebo balinais « bale bengong », drapé de rideaux blancs pour d'excellents massages. Deux chaises longues supplémentaires donnent sur le jardin luxuriant, tandis que la douche extérieure de la piscine complète ce paradis tropical.

L'emplacement privilégié de la Villa Myassa à Singakerta vous place aux portes de la scène culturelle dynamique d'Ubud. Explorez la célèbre Forêt des Singes, visitez le palais historique d'Ubud, plongez dans la scène artistique locale et découvrez d'innombrables restaurants et boutiques, le tout à proximité de votre sanctuaire privé.

Réservez dès aujourd'hui votre escapade tropicale à la Villa Myassa et découvrez l'alliance de l'élégance moderne et de la magie mystique de la jungle balinaise.`,
  },
  en: {
    siteTitle: "Villa Myassa, Ubud, BALI",
    baseline: "Contemporary villa with private pool in the heart of Ubud – BALI",
    locationLine: "Singakerta, Ubud — Gianyar, Bali (Indonesia)",
    capacity: "3 bedrooms (queen beds)",
    baths: "3.5 bathrooms",
    distance: "Ubud jungle (Singakerta)",
    nav: {
      tour: "3D Tour",
      gallery: "Gallery",
      highlights: "Highlights",
      location: "Location",
      contact: "Contact",
    },
    heroNote: "Rating (if available) – e.g. 4.9/5",
    askDates: "Ask for dates",
    seeGallery: "See gallery",
    reserveOnBestay: "Book on Bestay",
    descriptionTitle: "Description",
    readMore: "READ MORE",
    readLess: "READ LESS",
    tourTitle: "3D Virtual Tour (360°)",
    tourSubtitle:
      "Click the image — the tour opens in a new tab, and Bestay in another.",
    tourCta: "Click to open the tour",
    tourHelp1: "If your browser blocks one of the tabs, open",
    tourHelp2: "the Matterport tour",
    tourHelp3: "or",
    tourHelp4: "the Bestay page",
    highlightsTitle: "Highlights & Amenities",
    highlightsSubtitle: "Everything you need for a great stay",
    highlightList: [
      "Private pool",
      "Air conditioning",
      "High-speed Wi-Fi",
      "Free on-site parking",
      "Fully-equipped kitchen (oven, hob, fridge, toaster, kettle)",
      "TV / Smart TV in bedrooms",
      "En-suite bathrooms",
      "Safe",
      "Mosquito nets",
    ],
    locationTitle: "Location",
    nearby: "Nearby beaches / points of interest (to be completed)",
    access: "Access / parking (to be completed)",
    contactTitle: "Contact",
    emailLabel: "Email",
    emailOpen: "Open your mail app",
    footer: (year: number) =>
      `© ${year} Villa Myassa — www.villamyassa.com — All rights reserved.`,
    description: `Welcome to Villa Myassa in Singakerta, where contemporary design meets the enchanting landscape of Ubud’s jungle. As you enter, an elegant fountain flows into a serene pond with stepping stones, setting the tone for an extraordinary stay.

Each of the villa’s three refined bedrooms features a queen-size bed, Smart TV, air conditioning, and an en-suite bathroom. The master bedroom delights with a canopy mosquito net and outdoor bathtub; the second bedroom offers a refreshing outdoor shower; and the third provides a semi-outdoor bathing experience.

Villa Myassa blends indoor and outdoor living through breezy open spaces naturally cooled by cross-ventilation and ceiling fans. A beautiful wooden map of Bali adorns the cozy lounge, ideal for gathering or unwinding. The dining area comfortably seats six, while the modern kitchen with island invites you to craft memorable meals.

Step outside into your private oasis: a sparkling pool crowned by a Buddha statue awaits. The sunken lounge overlooks the water, two floating loungers invite you to relax, and the traditional Balinese bale bengong—draped in white curtains—is perfect for massages. Two additional loungers face the lush garden, and an outdoor shower completes this tropical haven.

Villa Myassa’s prime location in Singakerta places you at the doorstep of Ubud’s vibrant cultural scene: explore the famous Monkey Forest, visit Ubud Palace, dive into the local arts, and discover countless restaurants and shops—all close to your private sanctuary.

Book your tropical escape at Villa Myassa today and experience the harmony of modern elegance and the mystical magic of Bali’s jungle.`,
  },
} as const;

/* -------------------------------------------------------
   DONNÉES INVARIANTES
------------------------------------------------------- */
const LINKS = {
  email: "contact@villamyassa.com",
  bestay: "https://bestay.co/villa/villa-myassa",
  tour: "https://discover.matterport.com/space/xrHbRBnPwdy",
  mapEmbed: `<iframe src="https://www.google.com/maps?q=F66R%2BH95%20Singakerta%2C%20Gianyar%20Regency%2C%20Bali%2080571%2C%20Ubud%2C%20Indonesia&output=embed" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
  address: "F66R+H95 Singakerta, Gianyar Regency, Bali 80571, Ubud, Indonesia",
  tourCover: "/photos/virtual-tour-cover.jpg",
};

/* -------------------------------------------------------
   UI HELPERS
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
  <section id={id} className="py-20 scroll-mt-24">
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
      <div className="mt-10">{children}</div>
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
   PAGE
------------------------------------------------------- */
export default function Page() {
  // language state (persist in localStorage)
  const [lang, setLang] = useState<Lang>("fr");
  useEffect(() => {
    const saved = localStorage.getItem("villa_lang") as Lang | null;
    if (saved === "fr" || saved === "en") setLang(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("villa_lang", lang);
  }, [lang]);

  const T = useMemo(() => TEXT[lang], [lang]);

  const hero = (IMAGES.find((i) => i.featured) ?? IMAGES[0]) as {
    src: string;
    alt: string;
  };

  const images = IMAGES;
  const [lbIndex, setLbIndex] = useState<number | null>(null);

  const closeLb = () => setLbIndex(null);
  const openLb = (i: number) => setLbIndex(i);
  const prevLb = () =>
    setLbIndex((i) => (i === null ? i : (i + images.length - 1) % images.length));
  const nextLb = () =>
    setLbIndex((i) => (i === null ? i : (i + 1) % images.length));

  // Lightbox keyboard + body lock
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
        ? encodeURIComponent(`Demande d’informations – Villa Myassa`)
        : encodeURIComponent(`Availability inquiry – Villa Myassa`);
    const body =
      lang === "fr"
        ? encodeURIComponent(
            `Bonjour,\n\nJe souhaite me renseigner au sujet de la Villa Myassa.\n\nNom:\nEmail:\nMessage:`
          )
        : encodeURIComponent(
            `Hello,\n\nI'd like to inquire about Villa Myassa.\n\nName:\nEmail:\nMessage:`
          );
    window.location.href = `mailto:${LINKS.email}?subject=${subject}&body=${body}`;
  };

  // Open tour + Bestay
  const openVirtualTour = () => {
    window.open(LINKS.tour, "_blank", "noopener,noreferrer");
    setTimeout(() => {
      window.open(LINKS.bestay, "_blank", "noopener,noreferrer");
    }, 50);
  };

  // 3D cover with fallback
  const coverSrc =
    (LINKS.tourCover?.startsWith("/") ? LINKS.tourCover : `${PUBLIC_PREFIX}/${LINKS.tourCover}`) ||
    hero.src;

  // Description “read more”
  const paragraphs = T.description
    .trim()
    .split(/\n\s*\n/)
    .map((p) => p.trim());
  const firstTwo = paragraphs.slice(0, 2);
  const rest = paragraphs.slice(2);
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="container mx-auto px-4 max-w-6xl h-16 flex items-center justify-between">
          {/* Title */}
          <a href="#accueil" className="select-none">
            <span className="block text-2xl md:text-3xl font-extrabold tracking-tight font-serif leading-none">
              {T.siteTitle}
            </span>
          </a>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#visite-3d" className="hover:underline">
              {T.nav.tour}
            </a>
            <a href="#galerie" className="hover:underline">
              {T.nav.gallery}
            </a>
            <a href="#atouts" className="hover:underline">
              {T.nav.highlights}
            </a>
            <a href="#localisation" className="hover:underline">
              {T.nav.location}
            </a>
            <a href="#contact" className="hover:underline">
              {T.nav.contact}
            </a>
          </nav>

          {/* Right side: Book + language switch */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center rounded-xl border overflow-hidden">
              <button
                onClick={() => setLang("fr")}
                aria-label="Français"
                className={`px-2 py-1 text-xs flex items-center gap-1 ${
                  lang === "fr" ? "bg-black text-white" : "bg-white"
                }`}
              >
                <span>🇫🇷</span> FR
              </button>
              <button
                onClick={() => setLang("en")}
                aria-label="English"
                className={`px-2 py-1 text-xs flex items-center gap-1 border-l ${
                  lang === "en" ? "bg-black text-white" : "bg-white"
                }`}
              >
                <span>🇬🇧</span> EN
              </button>
            </div>

            <Button asChild>
              <a href={LINKS.bestay} target="_blank" rel="noreferrer" aria-label="Book on Bestay">
                <CalendarDays className="mr-2 h-4 w-4" />
                {lang === "fr" ? "Réserver" : "Book"}
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero image only */}
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
            <span className="inline-flex items-center gap-2 text-sm bg-white px-3 py-1 rounded-full border">
              <Star className="h-4 w-4" /> {T.heroNote}
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">{T.baseline}</h1>
            <p className="mt-3 text-base md:text-lg text-neutral-700">
              {T.capacity} • {T.baths} • {T.distance}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" onClick={handleMailto}>
                {T.askDates}
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#galerie">{T.seeGallery}</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={LINKS.bestay} target="_blank" rel="noreferrer">
                  {T.reserveOnBestay}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <Section id="description" title={T.descriptionTitle}>
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
                      {showMore ? T.readLess : T.readMore}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* 3D Tour */}
      <Section id="visite-3d" title={T.tourTitle} subtitle={T.tourSubtitle}>
        <div
          role="button"
          tabIndex={0}
          onClick={openVirtualTour}
          onKeyDown={(e) => ((e as any).key === "Enter" || (e as any).key === " ") && openVirtualTour()}
          className="group relative w-full cursor-pointer overflow-hidden rounded-2xl outline-none focus:ring-2 focus:ring-black/20"
          aria-label="Open 3D tour"
        >
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] max-h-[620px]">
            <img
              src={coverSrc || hero.src}
              onError={(e) => {
                e.currentTarget.src = hero.src;
              }}
              alt="3D tour cover"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">
                <Rotate3D className="h-4 w-4" />
                <PlayCircle className="h-4 w-4" />
                {T.tourCta}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs text-neutral-600">
          {T.tourHelp1}{" "}
          <a className="underline" href={LINKS.tour} target="_blank" rel="noopener noreferrer">
            {T.tourHelp2}
          </a>{" "}
          {T.tourHelp3}{" "}
          <a className="underline" href={LINKS.bestay} target="_blank" rel="noopener noreferrer">
            {T.tourHelp4}
          </a>
          .
        </p>
      </Section>

      {/* Gallery */}
      <Section id="galerie" title={T.nav.gallery}>
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
            aria-label="Close"
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
            aria-label="Previous image"
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
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 p-3 text-white"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>
      )}

      {/* Highlights */}
      <Section id="atouts" title={T.highlightsTitle} subtitle={T.highlightsSubtitle}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {T.highlightList.map((p, i) => (
            <Card key={i} className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  {p}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      {/* Location */}
      <Section id="localisation" title={T.locationTitle} subtitle={T.locationLine}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="rounded-2xl order-2 lg:order-1">
            <CardContent className="py-6">
              <ul className="grid gap-2 py-4">
                <li className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" /> {LINKS.address}
                </li>
                <li className="flex items-center gap-2">
                  <Waves className="h-5 w-5" /> {T.nearby}
                </li>
                <li className="flex items-center gap-2">
                  <Car className="h-5 w-5" /> {T.access}
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="rounded-2xl order-1 lg:order-2">
            <CardContent className="p-0">
              <div dangerouslySetInnerHTML={{ __html: LINKS.mapEmbed }} />
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Contact (sans téléphone) */}
      <Section id="contact" title={T.contactTitle}>
        <Card className="rounded-2xl">
          <CardContent className="py-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-3">
                <Input placeholder="Name / Nom" />
                <Input placeholder="Email" type="email" />
                <Textarea placeholder="Message" rows={5} />
                <div className="flex gap-3">
                  <Button onClick={handleMailto}>
                    {lang === "fr" ? "Envoyer par email" : "Send by email"}
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={`mailto:${LINKS.email}`}>{T.emailOpen}</a>
                  </Button>
                </div>
              </div>
              <div className="text-sm text-neutral-600">
                <p>
                  {T.emailLabel} :{" "}
                  <a className="underline" href={`mailto:${LINKS.email}`}>
                    {LINKS.email}
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Footer */}
      <footer className="py-10 border-t">
        <div className="container mx-auto px-4 max-w-6xl text-sm text-neutral-500">
          {T.footer(new Date().getFullYear())}
        </div>
      </footer>
    </div>
  );
}
