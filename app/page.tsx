'use client'

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, Mail, Phone, Waves, Car, CalendarDays, CheckCircle2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
// --- Galerie : liste de fichiers (dans /public/) ---
export const GALLERY_FILES = [
  "001-hero-piscine.jpg",
  "011-photo-11.jpg",
  "012-photo-12.jpg",
  "013-photo-13.jpg",
  "014-photo-14.jpg",
  "015-photo-15.jpg",
  "016-photo-16.jpg",
  "017-photo-17.jpg",
  "002-salon.jpg",
  "020-photo-20.jpg",
  "022-photo-22.jpg",
  "024-photo-24.jpg",
  "026-photo-26.jpg",
  "005-cuisine.jpg",
  "029-photo-29.jpg",
  "003-suite1.jpg",
  "004-suite2.jpg",
  "005-suite3.jpg",
  "006-salle-de-bain.jpg",
  "007-salle-de-bain2.jpg",
  "008-salle-de-bain3.jpg",
  "008-jardin.jpg",
  "009-jardin-2.jpg",
] as const;

// alt automatique lisible
const toAlt = (name: string) =>
  name.replace(/^[0-9]+-/, "").replace(/[-_]/g, " ").replace(/\.(jpg|jpeg|png|webp)$/i, "");

// on génère le tableau attendu par la galerie
const IMAGES = GALLERY_FILES.map((f, i) => ({
  src: `/${f}`,            // fichiers dans /public/
  alt: toAlt(f),
  featured: i === 0,       // la 1re = image "héro"
}));

const DATA = {
  nom: "Villa Myassa",
  baseline: "Villa contemporaine avec piscine privée au cœur d’Ubud",
  localisation: "Singakerta, Ubud — Gianyar, Bali (Indonésie)",
  capacite: "3 chambres (lits queen)",
  chambres: "3.5 salles de bain",
  sallesDeBain: "3.5 sdb",
  distance: "Jungle d’Ubud (Singakerta)",
  telephone: "(à compléter)",
  email: "contact@villamyassa.com",
  pointsForts: [
    "Piscine privée",
    "Climatisation",
    "Wifi haut débit",
    "Parking gratuit sur place",
    "Cuisine toute équipée (four, plaques, réfrigérateur, grille‑pain, bouilloire)",
    "TV / Smart TV dans les chambres",
    "Salles de bain attenantes",
    "Espace de travail adapté (bureau)",
    "Coffre‑fort",
    "Moustiquaires"
  images: IMAGES,


  description: `À l’entrée, une élégante fontaine menant à un bassin de poissons vous guide vers la villa, posée au cœur de la jungle d’Ubud. Les trois chambres, chacune équipée d’un lit queen‑size, d’une Smart TV, de la climatisation et d’une salle de bain attenante, offrent confort et intimité. Les espaces de vie s’ouvrent sur la piscine privée et un jardin apaisant — parfaits pour se détendre après une journée à explorer Ubud.`,
  tarifs: [
    { label: "Prix indicatif", prix: "À partir de Rp 2 941 990 / nuit", details: "Selon saisons et disponibilités" },
    { label: "Séjours moyens", prix: "Sur demande", details: "Nettoyage et linge inclus" },
    { label: "Long séjour", prix: "Sur demande", details: "Tarifs dégressifs possibles" }
  ],
  adresse: "F66R+H95 Singakerta, Gianyar Regency, Bali 80571, Ubud, Indonesia",
  mapsEmbed: `<iframe src="https://www.google.com/maps?q=F66R%2BH95%20Singakerta%2C%20Bali&output=embed" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
}

const Section = ({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: React.ReactNode }) => (
  <section id={id} className="py-20 scroll-mt-24">
    <div className="container mx-auto px-4 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="text-neutral-500 mt-2 max-w-2xl">{subtitle}</p>}
      </motion.div>
      <div className="mt-10">{children}</div>
    </div>
  </section>
)

const GalleryCard = ({ item }: { item: { src: string; alt: string; caption?: string } }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="relative overflow-hidden rounded-2xl shadow-sm group"
  >
    <div className="w-full h-64 relative">
      <Image src={item.src} alt={item.alt} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
    </div>
    {item.caption && (
      <div className="absolute inset-x-0 bottom-0 p-3">
        <div className="bg-black/45 backdrop-blur-sm rounded-xl px-3 py-1.5 text-sm text-white">{item.caption}</div>
      </div>
    )}
  </motion.div>
)

export default function Page() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const hero = (DATA.images.find((i: any) => (i as any).featured) || DATA.images[0]) as { src: string; alt: string }

  const handleMailto = () => {
    const subject = encodeURIComponent(`Demande d'informations — ${DATA.nom}`)
    const body = encodeURIComponent(`Bonjour,\n\nJe souhaite me renseigner au sujet de ${DATA.nom}.\n\nNom: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`)
    window.location.href = `mailto:${DATA.email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between h-16">
          <a href="#accueil" className="font-semibold text-lg">Villa Myassa</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#galerie" className="hover:underline">Galerie</a>
            <a href="#atouts" className="hover:underline">Atouts</a>
            <a href="#tarifs" className="hover:underline">Tarifs</a>
            <a href="#disponibilites" className="hover:underline">Disponibilités</a>
            <a href="#localisation" className="hover:underline">Localisation</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild href="#contact">
              <span className="inline-flex items-center"><CalendarDays className="mr-2 h-4 w-4" /> Réserver</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="accueil" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="h-[68vh] w-full relative">
            <Image src={hero.src} alt={hero.alt} fill className="object-cover" priority />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
        </div>
        <div className="container mx-auto px-4 max-w-6xl h-[68vh] flex items-end pb-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-sm bg-white/80 backdrop-blur px-3 py-1 rounded-full border">
              <Star className="h-4 w-4" /> Note (si dispo) — ex. 4.9/5
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight">
              {DATA.baseline}
            </h1>
            <p className="mt-3 text-base md:text-lg text-neutral-600">
              {DATA.capacite} • {DATA.chambres} • {DATA.distance}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" onClick={handleMailto}>Demander les dates</Button>
              <Button variant="outline" size="lg" asChild href="#galerie">Voir la galerie</Button>
              <Button variant="outline" size="lg" asChild href="https://bestay.co/villa/villa-myassa">Réserver sur Bestay</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Galerie */}
      <Section id="galerie" title="Galerie" subtitle={`Aperçu des espaces de ${DATA.nom}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DATA.images.map((img, i) => (<GalleryCard key={i} item={img} />))}
        </div>
      </Section>

      {/* Atouts */}
      <Section id="atouts" title="Atouts & Équipements" subtitle="Tout ce dont vous avez besoin pour un séjour réussi">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DATA.pointsForts.map((p, i) => (
            <Card key={i} className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> {p}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      {/* Description */}
      <Section id="description" title="Description">
        <Card className="rounded-2xl">
          <CardContent className="prose max-w-none leading-relaxed">
            <p className="whitespace-pre-line">{DATA.description}</p>
          </CardContent>
        </Card>
      </Section>

      {/* Tarifs */}
      <Section id="tarifs" title="Tarifs" subtitle="Indiquez vos grilles selon la saison">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DATA.tarifs.map((t, i) => (
            <Card key={i} className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl">{t.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{t.prix}</p>
                <p className="text-neutral-500">{t.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Disponibilités */}
      <Section id="disponibilites" title="Disponibilités">
        <Card className="rounded-2xl">
          <CardContent>
            <p className="text-neutral-600">Intégrez ici un calendrier (Google Calendar, Calendly, ou widget de réservation Bestay/Airbnb si disponible).</p>
          </CardContent>
        </Card>
      </Section>

      {/* Localisation */}
      <Section id="localisation" title="Localisation" subtitle={DATA.localisation}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="rounded-2xl order-2 lg:order-1">
            <CardContent>
              <ul className="grid gap-2 py-4">
                <li className="flex items-center gap-2"><MapPin className="h-5 w-5" /> {DATA.adresse}</li>
                <li className="flex items-center gap-2"><Waves className="h-5 w-5" /> Plages / points d'intérêt à proximité (à compléter)</li>
                <li className="flex items-center gap-2"><Car className="h-5 w-5" /> Accès / parking (à compléter)</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="rounded-2xl order-1 lg:order-2">
            <CardContent>
              <div dangerouslySetInnerHTML={{ __html: DATA.mapsEmbed }} />
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Règles & Annulation */}
      <Section id="rules" title="Règles de la maison & Accessibilité" subtitle="Informations essentielles pour préparer votre séjour">
        <Card className="rounded-2xl">
          <CardContent>
            <ul className="grid gap-2 py-4">
              <li><strong>Check‑in :</strong> à partir de 14:00 pour les villas 1–3 chambres (frais de check‑in tardif de IDR 200 000 après 20:00).</li>
              <li><strong>Check‑out :</strong> 11:00 par défaut (départs 11:00–18:00 = 50% du tarif nuit ; après 18:00 = 100%).</li>
              <li><strong>Transfert aéroport :</strong> service disponible ~500 000 IDR par voiture et par trajet.</li>
              <li><strong>Stationnement :</strong> parking sur place (selon disponibilité).</li>
            </ul>
            <p className="text-sm text-neutral-500">Pour des besoins spécifiques d’accessibilité, merci de nous contacter avant la réservation.</p>
          </CardContent>
        </Card>
      </Section>

      <Section id="cancellation" title="Politique d’annulation">
        <Card className="rounded-2xl">
          <CardContent className="prose max-w-none">
            <ul>
              <li><strong>60+ jours avant l’arrivée :</strong> remboursement intégral (moins ~3,5% de frais de transaction).</li>
              <li><strong>À moins de 60 jours :</strong> non‑remboursable.</li>
              <li><strong>Cas de force majeure :</strong> nous faisons de notre mieux pour proposer un report ou des aménagements (ex. deuil familial, catastrophes naturelles, maladie grave, problèmes de visa/immigration).</li>
            </ul>
            <p>Pour une réservation instantanée, vous pouvez passer par Bestay : <a className="underline" href="https://bestay.co/villa/villa-myassa" target="_blank">Page Villa Myassa</a>.</p>
          </CardContent>
        </Card>
      </Section>

      <footer className="py-10 border-t">
        <div className="container mx-auto px-4 max-w-6xl text-sm text-neutral-500">
          © {new Date().getFullYear()} {DATA.nom} — www.villamyassa.com — Tous droits réservés.
        </div>
      </footer>
    </div>
  )
}
