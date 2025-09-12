"use client";

import { useState, useEffect } from "react";
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
   2) DONNÉES AFFICHÉES
------------------------------------------------------- */

const DATA = {
  nom: "Villa Myassa",
  baseline: "Villa contemporaine avec piscine privée au cœur d’Ubud – BALI",
  localisation: "Singakerta, Ubud — Gianyar, Bali (Indonésie)",
  capacite: "3 chambres (lits queen)",
  chambres: "3.5 salles de bain",
  sallesDeBain: "3.5 sdb",
  distance: "Jungle d’Ubud (Singakerta)",
  email: "contact@villamyassa.com",
  pointsForts: [
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
  images: IMAGES,

  description: `Bienvenue à la Villa Myassa à Singakerta, où le design contemporain rencontre le paysage enchanteur de la jungle d'Ubud. Dès l'entrée, une élégante fontaine se jette dans un paisible bassin avec pas japonais, créant un chemin captivant qui donnera le ton à votre séjour extraordinaire.

Les trois chambres raffinées de la Villa Myassa disposent chacune d'un lit queen-size, d'une Smart TV, de la climatisation et d'une salle de bain attenante. La chambre principale vous enchantera avec sa moustiquaire à baldaquin et sa baignoire extérieure, la deuxième chambre vous rafraîchira avec sa douche extérieure, tandis que la troisième chambre offre une expérience de bain semi-extérieure.

La Villa Myassa allie harmonieusement intérieur et extérieur avec ses espaces ouverts et aérés, naturellement rafraîchis par une ventilation transversale et des ventilateurs de plafond. Une magnifique carte balinaise en bois agrémente le confortable salon, idéal pour se réunir ou se détendre. La salle à manger peut accueillir confortablement six personnes, tandis que la cuisine moderne avec îlot central invite les convives à concocter des repas mémorables.

Sortez de la Villa Myassa et pénétrez dans votre oasis privée, où une piscine étincelante, couronnée d'une statue de Bouddha, vous attend. Le coin salon en contrebas (Sunken) offre une vue imprenable sur l'eau, tandis que deux chaises longues flottantes invitent à la détente. Installez-vous dans le gazebo balinais « bale bengong », drapé de rideaux blancs pour d'excellents massages. Deux chaises longues supplémentaires donnent sur le jardin luxuriant, tandis que la douche extérieure de la piscine complète ce paradis tropical.

L'emplacement privilégié de la Villa Myassa à Singakerta vous place aux portes de la scène culturelle dynamique d'Ubud. Explorez la célèbre Forêt des Singes, visitez le palais historique d'Ubud, plongez dans la scène artistique locale et découvrez d'innombrables restaurants et boutiques, le tout à proximité de votre sanctuaire privé.

Réservez dès aujourd'hui votre escapade tropicale à la Villa Myassa et découvrez l'alliance de l'élégance moderne et de la magie mystique de la jungle balinaise.`,

  adresse: "F66R+H95 Singakerta, Gianyar Regency, Bali 80571, Ubud, Indonesia",
  mapsEmbed: `<iframe src="https://www.google.com/maps?q=F66R%2BH95%20Singakerta%2C%20Gianyar%20Regency%2C%20Bali%2080571%2C%20Ubud%2C%20Indonesia&output=embed" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,

  virtualTour: {
    url: "https://discover.matterport.com/space/xrHbRBnPwdy",
    fallbackUrl: "https://bestay.co/villa/villa-myassa",
    cover: "/photos/virtual-tour-cover.jpg",
  },
};

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
   4) PAGE
------------------------------------------------------- */

export default function Page() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const hero = (DATA.images.find((i) => i.featured) ?? DATA.images[0]) as {
    src: string;
    alt: string;
  };

  const images = DATA.images;
  const [lbIndex, setLbIndex] = useState<number | null>(null);

  const closeLb = () => setLbIndex(null);
  const openLb = (i: number) => setLbIndex(i);
  const prevLb = () =>
    setLbIndex((i) => (i === null ? i : (i + images.length - 1) % images.length));
  const nextLb = () =>
    setLbIndex((i) => (i === null ? i : (i + 1) % images.length));

  // Bloquer le scroll + raccourcis clavier dans la lightbox
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
    const subject = encodeURIComponent(`Demande d’informations – ${DATA.nom}`);
    const body = encodeURIComponent(
      `Bonjour,\n\nJe souhaite me renseigner au sujet de ${DATA.nom}.\n\nNom: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`
    );
    window.location.href = `mailto:${DATA.email}?subject=${subject}&body=${body}`;
  };

  // Ouvre Matterport + Bestay dans deux onglets
  const openVirtualTour = () => {
    window.open(DATA.virtualTour.url, "_blank", "noopener,noreferrer");
    setTimeout(() => {
      window.open(DATA.virtualTour.fallbackUrl, "_blank", "noopener,noreferrer");
    }, 50);
  };

  // Source vignette 3D
  const coverSrc =
    (DATA.virtualTour.cover?.startsWith("/")
      ? DATA.virtualTour.cover
      : `${PUBLIC_PREFIX}/${DATA.virtualTour.cover}`) || hero.src;

  // Description "Lire plus"
  const paragraphs = DATA.description.trim().split(/\n\s*\n/).map((p) => p.trim());
  const firstTwo = paragraphs.slice(0, 2);
  const rest = paragraphs.slice(2);
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="container mx-auto px-4 max-w-6xl h-16 flex items-center justify-between">
          {/* Titre plus gros + style */}
          <a href="#accueil" className="select-none">
            <span className="block text-2xl md:text-3xl font-extrabold tracking-tight font-serif leading-none">
              Villa Myassa, <span className="italic">Ubud</span>, <span className="uppercase">BALI</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#visite-3d" className="hover:underline">Visite 3D</a>
            <a href="#galerie" className="hover:underline">Galerie</a>
            <a href="#atouts" className="hover:underline">Atouts</a>
            {/* Tarifs & Disponibilités supprimés */}
            <a href="#localisation" className="hover:underline">Localisation</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild>
              <a
                href="https://bestay.co/villa/villa-myassa"
                target="_blank"
                rel="noreferrer"
                aria-label="Réserver sur Bestay"
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                Réserver
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero sans overlay, texte en dessous */}
      <section id="accueil">
        <div className="w-full">
          <img
            src={hero.src}
            alt={hero.alt}
            className="w-full h-[60vh] md:h-[70vh] object-cover"
          />
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
              <Star className="h-4 w-4" /> Note (si dispo) – ex. 4.9/5
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
              {DATA.baseline}
            </h1>
            <p className="mt-3 text-base md:text-lg text-neutral-700">
              {DATA.capacite} • {DATA.chambres} • {DATA.distance}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" onClick={handleMailto}>
                Demander les dates
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#galerie">Voir la galerie</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://bestay.co/villa/villa-myassa" target="_blank" rel="noreferrer">
                  Réserver sur Bestay
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description (LIRE PLUS) — avant la Visite 3D */}
      <Section id="description" title="Description">
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
                      {showMore ? "LIRE MOINS" : "LIRE PLUS"}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Visite 3D */}
      <Section
        id="visite-3d"
        title="Visite 3D (360°)"
        subtitle="Cliquez sur l’image – la visite s’ouvre dans un onglet, et Bestay dans un second."
      >
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
                Cliquer pour ouvrir la visite
              </span>
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs text-neutral-600">
          Si votre navigateur bloque l’ouverture d’un des onglets, ouvrez manuellement{" "}
          <a className="underline" href={DATA.virtualTour.url} target="_blank" rel="noopener noreferrer">
            la visite Matterport
          </a>{" "}
          ou{" "}
          <a className="underline" href={DATA.virtualTour.fallbackUrl} target="_blank" rel="noopener noreferrer">
            la page Bestay
          </a>
          .
        </p>
      </Section>

      {/* Galerie */}
      <Section id="galerie" title="Galerie">
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
            onClick={(e) => { e.stopPropagation(); prevLb(); }}
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
            onClick={(e) => { e.stopPropagation(); nextLb(); }}
            aria-label="Image suivante"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 p-3 text-white"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>
      )}

      {/* Atouts */}
      <Section id="atouts" title="Atouts & Équipements" subtitle="Tout ce dont vous avez besoin pour un séjour réussi">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DATA.pointsForts.map((p, i) => (
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

      {/* Localisation */}
      <Section id="localisation" title="Localisation" subtitle={DATA.localisation}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="rounded-2xl order-2 lg:order-1">
            <CardContent className="py-6">
              <ul className="grid gap-2 py-4">
                <li className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" /> {DATA.adresse}
                </li>
                <li className="flex items-center gap-2">
                  <Waves className="h-5 w-5" /> Plages / points d’intérêt à proximité (à compléter)
                </li>
                <li className="flex items-center gap-2">
                  <Car className="h-5 w-5" /> Accès / parking (à compléter)
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="rounded-2xl order-1 lg:order-2">
            <CardContent className="p-0">
              <div dangerouslySetInnerHTML={{ __html: DATA.mapsEmbed }} />
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact">
        <Card className="rounded-2xl">
          <CardContent className="py-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-3">
                <Input
                  placeholder="Votre nom"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <Input
                  placeholder="Votre email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <Textarea
                  placeholder="Votre message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <div className="flex gap-3">
                  <Button onClick={handleMailto}>Envoyer par email</Button>
                  <Button variant="outline" asChild>
                    <a href={`mailto:${DATA.email}`}>Ouvrir votre messagerie</a>
                  </Button>
                </div>
              </div>
              <div className="text-sm text-neutral-600">
                <p>
                  Email : <a className="underline" href={`mailto:${DATA.email}`}>{DATA.email}</a>
                </p>
                {/* Téléphone supprimé */}
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Footer */}
      <footer className="py-10 border-t">
        <div className="container mx-auto px-4 max-w-6xl text-sm text-neutral-500">
          © {new Date().getFullYear()} {DATA.nom} — www.villamyassa.com — Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
