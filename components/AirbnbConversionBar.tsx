"use client";

import { usePathname } from "next/navigation";

const AIRBNB_URL = "https://www.airbnb.fr/rooms/1505417552730386824";
const TRIP_URL = "https://www.trip.com/hotels/bali-hotel-detail-131766860/villa-myassa-by-balisuperhost/";

const COPY = {
  fr: {
    eyebrow: "Réservation Airbnb",
    title: "Voir les disponibilités",
    detail: "3 chambres · piscine privée · jusqu’à 6 voyageurs",
  },
  en: {
    eyebrow: "Airbnb booking",
    title: "Check availability",
    detail: "3 bedrooms · private pool · up to 6 guests",
  },
  id: {
    eyebrow: "Pemesanan Airbnb",
    title: "Cek ketersediaan",
    detail: "3 kamar · kolam pribadi · hingga 6 tamu",
  },
  zh: {
    eyebrow: "中国旅客预订",
    title: "查看实时价格与可订日期",
    detail: "Trip.com（携程集团） · 3 间卧室 · 私人泳池",
  },
} as const;

type Lang = keyof typeof COPY;

export default function AirbnbConversionBar() {
  const pathname = usePathname();
  const first = pathname.split("/").filter(Boolean)[0] as Lang | undefined;
  const lang: Lang = first && first in COPY ? first : "en";
  const t = COPY[lang];
  const bookingUrl = lang === "zh" ? TRIP_URL : AIRBNB_URL;
  const bookingLabel = lang === "zh" ? "Trip.com" : "Airbnb";

  return (
    <div className="fixed inset-x-3 bottom-[max(0.25rem,env(safe-area-inset-bottom))] z-[55] md:hidden">
      <a
        href={bookingUrl}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={t.title}
        className="mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-neutral-200 bg-white/95 p-3 shadow-xl backdrop-blur"
      >
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
            {t.eyebrow}
          </p>
          <p className="mt-0.5 text-sm font-bold text-neutral-950">{t.title}</p>
          <p className="mt-0.5 truncate text-xs text-neutral-600">{t.detail}</p>
        </div>
        <span className="shrink-0 rounded-full border border-[#bdddd3]/70 bg-[#d7eee7]/75 px-4 py-2 text-sm font-semibold text-[#3a5b50] shadow-[0_8px_24px_rgba(79,124,109,0.08)]">
          {bookingLabel}
        </span>
      </a>
    </div>
  );
}
