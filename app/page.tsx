"use client";

import { useState, useEffect } from "react";

// Liste d'images pour le carrousel
const IMAGES = [
  "/photos/photo1.jpg",
  "/photos/photo2.jpg",
  "/photos/photo3.jpg",
  "/photos/photo4.jpg",
  "/photos/photo5.jpg",
];

export default function HomePage() {
  const [lang, setLang] = useState<"fr" | "en" | "id" | "zh">("fr");
  const [slide, setSlide] = useState(0);

  // Défilement automatique des photos avec fondu
  useEffect(() => {
    const fade = setInterval(() => {
      setSlide((s) => (s + 1) % IMAGES.length);
    }, 3000);
    return () => clearInterval(fade);
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Image de fond / carrousel */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {IMAGES.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Slide ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === slide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 bg-black/40 text-white text-center">
        {/* Titre principal */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6">
          Villa Myassa, Ubud, Bali
        </h1>

        {/* Sélecteur de langue avec drapeaux */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => setLang("fr")}
            className={`flex items-center gap-1 border rounded-md px-2 py-1 ${
              lang === "fr" ? "bg-white text-black" : "bg-transparent"
            }`}
          >
            <img src="/flags/fr.svg" alt="Français" className="h-4 w-6" />
            <span>FR</span>
          </button>

          <button
            onClick={() => setLang("en")}
            className={`flex items-center gap-1 border rounded-md px-2 py-1 ${
              lang === "en" ? "bg-white text-black" : "bg-transparent"
            }`}
          >
            <img src="/flags/en.svg" alt="English" className="h-4 w-6" />
            <span>EN</span>
          </button>

          <button
            onClick={() => setLang("id")}
            className={`flex items-center gap-1 border rounded-md px-2 py-1 ${
              lang === "id" ? "bg-white text-black" : "bg-transparent"
            }`}
          >
            <img src="/flags/id.svg" alt="Bahasa Indonesia" className="h-4 w-6" />
            <span>ID</span>
          </button>

          <button
            onClick={() => setLang("zh")}
            className={`flex items-center gap-1 border rounded-md px-2 py-1 ${
              lang === "zh" ? "bg-white text-black" : "bg-transparent"
            }`}
          >
            <img src="/flags/zh.svg" alt="中文" className="h-4 w-6" />
            <span>ZH</span>
          </button>
        </div>

        {/* Bouton réserver */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://bestay.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
          >
            Réserver sur Bestay
          </a>

          <a
            href="https://www.booking.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
          >
            Booking.com
          </a>

          <a
            href="https://www.airbnb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
          >
            Airbnb
          </a>

          <a
            href="https://fr.trip.com/hotels/detail/?cityEnName=Bali&cityId=723&hotelId=131766860"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
          >
            Trip.com
          </a>

          <a
            href="https://www.wingontravel.com/hotel/detail-bali-131766860/villa-myassa-by-balisuperhost/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
          >
            Wingon Travel
          </a>
        </div>
      </div>
    </div>
  );
}
