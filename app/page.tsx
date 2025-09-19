// app/id/vila-ubud-kolam-renang-pribadi/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vila di Ubud dengan kolam renang pribadi – Villa Myassa, Bali",
  description:
    "Villa Myassa di Ubud, Bali: 3 kamar tidur, kolam renang pribadi, bale bengong untuk pijat, dapur lengkap. Dekat Monkey Forest, kafe, dan yoga.",
  alternates: {
    canonical: "/id/vila-ubud-kolam-renang-pribadi",
    languages: {
      "fr": "/fr/villa-ubud-piscine-privee",
      "en": "/en/ubud-villa-private-pool",
      "id": "/id/vila-ubud-kolam-renang-pribadi",
    },
  },
};

export default function Page() {
  const SITE = "https://www.villamyassa.com";
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE },
      { "@type": "ListItem", position: 2, name: "Vila di Ubud dengan kolam renang pribadi", item: `${SITE}/id/vila-ubud-kolam-renang-pribadi` },
    ],
  };

  return (
    <main className="container mx-auto max-w-3xl px-4 py-12 prose">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <h1>Vila di Ubud dengan kolam renang pribadi</h1>
      <p>
        <strong>Villa Myassa</strong> memadukan desain modern dan suasana tropis di Singakerta,
        hanya beberapa menit dari pusat Ubud. Nikmati <strong>kolam renang pribadi</strong>,
        sunken lounge, dan <em>balé bengong</em> — cocok untuk pijat di vila.
      </p>
      <h2>Fasilitas</h2>
      <ul>
        <li>3 kamar tidur queen, kamar mandi dalam, AC, Smart TV</li>
        <li>Kolam renang pribadi, 2 sun lounger mengapung, sunken lounge</li>
        <li>Dapur lengkap (oven, kompor, kulkas, pemanggang roti, ketel)</li>
        <li>Wi-Fi cepat, brankas, kelambu nyamuk, parkir gratis</li>
      </ul>
      <h2>Lokasi</h2>
      <p>Dekat Monkey Forest, Istana Ubud, kafe, spa, dan studio yoga, namun tetap tenang.</p>
      <h2>Reservasi</h2>
      <p>Pesan melalui Bestay, Airbnb, Booking.com, atau langsung untuk tarif terbaik.</p>
      <p>
        <a href="/?lang=id#galerie">Lihat galeri</a> • <a href="/?lang=id#visite-3d">Tur 3D</a> •{" "}
        <a href="/?lang=id#contact">Kontak</a>
      </p>
    </main>
  );
}
