// --- VERSION FINALE COMPILABLE (tout en un) ---
// (identique au dessus, mais avec le bloc Description correctement géré)

"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Waves, Car, CalendarDays, X, ChevronLeft, ChevronRight, Rotate3D, PlayCircle, MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/* ... (toutes les constantes et LTEXT identiques à la première moitié ci-dessus) ... */

// (Réinsère ici GALLERY_FILES, toAlt, IMAGES, DATA_BASE, LTEXT sans modification)

/* -------------------------------------------------------
   3) COMPOSANTS UI
------------------------------------------------------- */

const Section = ({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: React.ReactNode; }) => (
  <section id={id} className="py-12 md:py-16 scroll-mt-24">
    <div className="container mx-auto px-4 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="text-neutral-500 mt-2 max-w-2xl">{subtitle}</p>}
      </motion.div>
      <div className="mt-6 md:mt-8">{children}</div>
    </div>
  </section>
);

const GalleryCard = ({ item, onOpen = () => {} }: { item: { src: string; alt: string }; onOpen?: () => void; }) => (
  <div className="relative overflow-hidden rounded-2xl shadow-sm group">
    <button type="button" onClick={onOpen} className="relative block w-full h-64 sm:h-60 lg:h-64 focus:outline-none focus:ring-2 focus:ring-white/60" aria-label={`Voir ${item.alt} en plein écran`}>
      <img src={item.src} alt={item.alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
    </button>
  </div>
);

/* -------------------------------------------------------
   4) PAGE
------------------------------------------------------- */

export default function Page() {
  const [lang, setLang] = useState<Lang>("fr");
  useEffect(() => { const saved = typeof window !== "undefined" ? window.localStorage.getItem("lang") : null; if (saved === "fr" || saved === "en" || saved === "id") setLang(saved); }, []);
  useEffect(() => { if (typeof window !== "undefined") window.localStorage.setItem("lang", lang); }, [lang]);
  const L = useMemo(() => LTEXT(lang), [lang]);

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const hero = (DATA_BASE.images.find((i) => i.featured) ?? DATA_BASE.images[0]) as { src: string; alt: string; };
  const images = DATA_BASE.images;
  const [lbIndex, setLbIndex] = useState<number | null>(null);

  const closeLb = () => setLbIndex(null);
  const openLb = (i: number) => setLbIndex(i);
  const prevLb = () => setLbIndex((i) => (i === null ? i : (i + images.length - 1) % images.length));
  const nextLb = () => setLbIndex((i) => (i === null ? i : (i + 1) % images.length));

  useEffect(() => {
    if (lbIndex === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeLb(); if (e.key === "ArrowLeft") prevLb(); if (e.key === "ArrowRight") nextLb(); };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prevOverflow; window.removeEventListener("keydown", onKey); };
  }, [lbIndex, images.length]);

  const [showMore, setShowMore] = useState(false);

  const handleMailto = () => {
    const subject = lang === "fr" ? `Demande d’informations – ${DATA_BASE.nom}` : lang === "id" ? `Permintaan informasi – ${DATA_BASE.nom}` : `Information request – ${DATA_BASE.nom}`;
    const body = lang === "fr"
      ? `Bonjour,\n\nJe souhaite me renseigner au sujet de ${DATA_BASE.nom}.\n\nNom: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`
      : lang === "id"
      ? `Halo,\n\nSaya ingin menanyakan tentang ${DATA_BASE.nom}.\n\nNama: ${form.name}\nEmail: ${form.email}\nPesan: ${form.message}`
      : `Hello,\n\nI'd like information about ${DATA_BASE.nom}.\n\nName: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`;
    window.location.href = `mailto:${DATA_BASE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const openVirtualTour = () => {
    window.open(DATA_BASE.virtualTour.url, "_blank", "noopener,noreferrer");
    setTimeout(() => { window.open(DATA_BASE.virtualTour.fallbackUrl, "_blank", "noopener,noreferrer"); }, 50);
  };
  const coverSrc = (DATA_BASE.virtualTour.cover?.startsWith("/") ? DATA_BASE.virtualTour.cover : `${PUBLIC_PREFIX}/${DATA_BASE.virtualTour.cover}`) || hero.src;

  const description = (DATA_BASE.description as any)[lang] as string;
  const paragraphs = description.trim().split(/\n\s*\n/).map((p) => p.trim());
  const firstTwo = paragraphs.slice(0, 2);
  const rest = paragraphs.slice(2);

  const waHrefTop = `https://wa.me/${WA_NUMBER_INTL}?text=${encodeURIComponent(WA_TEXT_DEFAULT[lang])}`;
  const waHrefFloating = waHrefTop;

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header avec gestion paysage */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row landscape:flex-col md:items-center md:justify-between gap-2 md:gap-0 py-3 md:h-16">
          <div className="w-full md:w-auto overflow-hidden order-0">
            <a href="#accueil" className="select-none block w-full">
              <span className="block text-2xl sm:text-3xl md:text-3xl font-extrabold tracking-tight font-serif leading-none whitespace-nowrap text-center md:text-left landscape:text-center" title="Villa Myassa, Ubud, BALI">
                Villa Myassa, <span className="italic">Ubud</span>, <span className="uppercase">BALI</span>
              </span>
            </a>
          </div>

          <div className="w-full md:w-auto flex flex-col md:flex-row items-center md:items-center justify-center md:justify-end gap-2 order-1 landscape:gap-3">
            <nav className="hidden md:flex landscape:flex w-full md:w-auto items-center justify-center md:justify-end gap-4 text-sm">
              <a href="#visite-3d" className="hover:underline">{L.nav.tour}</a>
              <a href="#galerie" className="hover:underline">{L.nav.gallery}</a>
              <a href="#atouts" className="hover:underline">{L.nav.features}</a>
              <a href="#localisation" className="hover:underline">{L.nav.location}</a>
              <a href="#contact" className="hover:underline">{L.nav.contact}</a>
            </nav>

            <div className="w-full md:w-auto flex items-center justify-center md:justify-end gap-2 flex-wrap">
              <label className="sr-only" htmlFor="lang-select">Choisir la langue / Choose language / Pilih bahasa</label>
              <select id="lang-select" aria-label="Choisir la langue / Choose language / Pilih bahasa" className="h-9 rounded-md border px-2 text-sm bg-white" value={lang} onChange={(e) => setLang(e.target.value as Lang)}>
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

              <a href={waHrefTop} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hidden md:inline-flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white hover:scale-105 transition" title="WhatsApp">
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
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <h1 className="mt-1 text-4xl md:text-5xl font-extrabold leading-tight">
              {(DATA_BASE.baseline as any)[lang]}
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
                  <div className={`overflow-hidden transition-[max-height,opacity] duration-300 ${showMore ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`} aria-hidden={!showMore}>
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
        <div role="button" tabIndex={0} onClick={openVirtualTour} onKeyDown={(e) => ((e as any).key === "Enter" || (e as any).key === " ") && openVirtualTour()} className="group relative w-full cursor-pointer overflow-hidden rounded-2xl outline-none focus:ring-2 focus:ring-black/20" aria-label="Ouvrir la visite 3D">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] max-h-[620px]">
            <img src={coverSrc || hero.src} onError={(e) => { e.currentTarget.src = hero.src; }} alt="Visite 3D de la villa" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">
                <Rotate3D className="h-4 w-4" /><PlayCircle className="h-4 w-4" />{L.tour.button}
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
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[999] bg-black/90" onClick={() => closeLb()}>
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
      <Section id="localisation" title={L.location.title} subtitle={(DATA_BASE.localisation as any)[lang]}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="rounded-2xl order-2 lg:order-1">
            <CardContent className="py-5">
              <ul className="grid gap-2 py-2">
                <li className="flex items-center gap-2"><MapPin className="h-5 w-5" /> {DATA_BASE.adresse}</li>
                <li className="flex items-center gap-2"><Waves className="h-5 w-5" /> {lang === "fr" ? "Plages / points d’intérêt à proximité (à compléter)" : lang === "id" ? "Pantai / tempat menarik terdekat (akan dilengkapi)" : "Beaches / points of interest nearby (to be completed)"}</li>
                <li className="flex items-center gap-2"><Car className="h-5 w-5" /> {lang === "fr" ? "Accès / parking (à compléter)" : lang === "id" ? "Akses / parkir (akan dilengkapi)" : "Access / parking (to be completed)"}</li>
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
                  <Button variant="outline" asChild><a href={`mailto:${DATA_BASE.email}`}>Open your mail app</a></Button>
                </div>
              </div>
              <div className="text-sm text-neutral-600">
                <p> {L.contact.emailLabel} : <a className="underline" href={`mailto:${DATA_BASE.email}`}>{DATA_BASE.email}</a></p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* WhatsApp floating bubble */}
      <a href={waHrefFloating} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="fixed bottom-4 right-4 z-[1000] inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-500 text-white shadow-lg hover:scale-105 transition" title="WhatsApp">
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
