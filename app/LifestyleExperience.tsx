"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Lang = "fr" | "en" | "id" | "zh";

const BOOK_URL =
  "https://www.airbnb.fr/rooms/1505417552730386824";

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    title: string;
    intro: string;
    floatingTitle: string;
    floatingText: string;
    slowTitle: string;
    slowText: string;
    videoTitle: string;
    videoText: string;
    book: string;
    note: string;
  }
> = {
  fr: {
    eyebrow: "L'expérience Villa Myassa",
    title: "Matins paisibles, piscine privée & petit-déjeuner flottant",
    intro:
      "À Villa Myassa, le séjour se vit autant dans la villa qu'autour de la piscine : petit-déjeuner flottant, moments de détente, bain fleuri et instants au calme dans le jardin tropical.",
    floatingTitle: "Floating breakfast",
    floatingText:
      "Commencez la journée dans la piscine avec un petit-déjeuner flottant préparé pour transformer un simple matin à Bali en vrai moment de vacances.",
    slowTitle: "Slow living à Ubud",
    slowText:
      "Profitez du balé bengong, d'un bain fleuri, de la piscine et des espaces ouverts de la villa pour ralentir et savourer l'atmosphère d'Ubud.",
    videoTitle: "Villa Myassa en mouvement",
    videoText:
      "Découvrez l'ambiance de la villa à travers notre nouveau shooting vidéo. Les vidéos se chargent uniquement lorsque vous lancez la lecture afin de préserver la rapidité du site.",
    book: "Voir sur Airbnb",
    note: "Le floating breakfast est disponible sur demande et peut entraîner un supplément.",
  },
  en: {
    eyebrow: "The Villa Myassa Experience",
    title: "Slow mornings, private pool & floating breakfast",
    intro:
      "At Villa Myassa, the experience extends beyond the villa itself: floating breakfast, poolside moments, flower baths and peaceful time in the tropical garden.",
    floatingTitle: "Floating breakfast",
    floatingText:
      "Start the day in the pool with a floating breakfast designed to turn a simple Bali morning into a memorable holiday moment.",
    slowTitle: "Slow living in Ubud",
    slowText:
      "Enjoy the balé bengong, a flower bath, the private pool and the villa's open spaces while taking in Ubud's calm tropical atmosphere.",
    videoTitle: "Experience Villa Myassa in motion",
    videoText:
      "Discover the atmosphere of the villa through our new lifestyle videos. Videos load only when played to keep the site fast on mobile.",
    book: "View on Airbnb",
    note: "Floating breakfast is available on request and may incur an additional charge.",
  },
  id: {
    eyebrow: "Pengalaman Villa Myassa",
    title: "Pagi yang tenang, kolam pribadi & floating breakfast",
    intro:
      "Di Villa Myassa, pengalaman liburan hadir di setiap sudut: floating breakfast, waktu santai di kolam, flower bath, dan suasana tenang di taman tropis.",
    floatingTitle: "Floating breakfast",
    floatingText:
      "Mulai pagi Anda di kolam renang dengan floating breakfast untuk menciptakan momen liburan Bali yang istimewa.",
    slowTitle: "Slow living di Ubud",
    slowText:
      "Nikmati balé bengong, flower bath, kolam pribadi, dan ruang terbuka vila dalam suasana tropis Ubud yang tenang.",
    videoTitle: "Rasakan Villa Myassa lewat video",
    videoText:
      "Lihat suasana vila melalui video lifestyle terbaru kami. Video hanya dimuat saat diputar agar situs tetap cepat di ponsel.",
    book: "Lihat di Airbnb",
    note: "Floating breakfast tersedia berdasarkan permintaan dan dapat dikenakan biaya tambahan.",
  },
  zh: {
    eyebrow: "Villa Myassa 度假体验",
    title: "悠闲清晨、私人泳池与漂浮早餐",
    intro:
      "Villa Myassa 的体验不止于住宿本身：漂浮早餐、泳池时光、花瓣浴，以及热带花园中的悠闲片刻。",
    floatingTitle: "漂浮早餐",
    floatingText:
      "在私人泳池中享用漂浮早餐，让普通的巴厘岛清晨变成难忘的度假时刻。",
    slowTitle: "乌布慢生活",
    slowText:
      "在 balé bengong 凉亭、花瓣浴、私人泳池和开放式空间中，感受乌布宁静的热带氛围。",
    videoTitle: "用视频感受 Villa Myassa",
    videoText:
      "通过全新的生活方式短片感受别墅氛围。视频仅在播放时加载，以保持手机端访问速度。",
    book: "在 Airbnb 查看",
    note: "漂浮早餐可按需安排，并可能产生额外费用。",
  },
};

const lifestylePhotos = [
  { src: "/lifestyle/DSCF7657.webp", alt: "Floating breakfast in the private pool at Villa Myassa" },
  { src: "/lifestyle/DSCF7662.webp", alt: "Flower bath experience at Villa Myassa in Ubud" },
  { src: "/lifestyle/DSCF7669.webp", alt: "Balinese gazebo and tropical lifestyle at Villa Myassa" },
  { src: "/lifestyle/DSCF7674.webp", alt: "Relaxing bedroom moment at Villa Myassa in Bali" },
];

export default function LifestyleExperience({ lang }: { lang: Lang }) {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const anchor = document.getElementById("visite-3d");
    if (!anchor?.parentElement) return;

    const node = document.createElement("div");
    node.id = "villa-myassa-experience";
    anchor.parentElement.insertBefore(node, anchor);
    setMountNode(node);

    return () => node.remove();
  }, []);

  if (!mountNode) return null;

  const t = COPY[lang];

  return createPortal(
    <section className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
      <div className="overflow-hidden rounded-[2rem] border border-[#dcebe6] bg-[rgba(247,252,250,0.82)] shadow-[0_24px_70px_rgba(82,118,105,0.08)] backdrop-blur-sm">
        <div className="grid lg:grid-cols-[1.08fr_.92fr]">
          <div className="relative min-h-[440px] sm:min-h-[560px] lg:min-h-[680px]">
            <img
              src="/lifestyle/DSCF7660.webp"
              alt="Floating breakfast experience in the private pool at Villa Myassa Ubud"
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#25463a]/55 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/85">
                {t.floatingTitle}
              </p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/95 md:text-base">
                {t.note}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#668d80]">
              {t.eyebrow}
            </p>
            <h2 className="mt-3 text-4xl leading-none md:text-5xl lg:text-6xl">
              {t.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-neutral-600 md:text-lg">
              {t.intro}
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-3xl border border-[#dcebe6] bg-white/65 p-5 backdrop-blur">
                <h3 className="text-2xl">{t.floatingTitle}</h3>
                <p className="mt-2 text-sm text-neutral-600">{t.floatingText}</p>
              </div>
              <div className="rounded-3xl border border-[#dcebe6] bg-white/65 p-5 backdrop-blur">
                <h3 className="text-2xl">{t.slowTitle}</h3>
                <p className="mt-2 text-sm text-neutral-600">{t.slowText}</p>
              </div>
            </div>

            <a
              href={BOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex min-h-12 w-fit items-center justify-center rounded-full border border-[#bdddd3]/70 bg-[#d7eee7]/75 px-7 py-3 font-semibold text-[#3a5b50] shadow-[0_8px_24px_rgba(79,124,109,0.08)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-[#c9e8de]"
            >
              {t.book}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
        {lifestylePhotos.map((photo, index) => (
          <figure
            key={photo.src}
            className={`overflow-hidden rounded-3xl ${index === 0 ? "col-span-2 lg:col-span-1" : ""}`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="aspect-[4/5] h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
            />
          </figure>
        ))}
      </div>

      <div className="mt-14 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#668d80]">
          Lifestyle video
        </p>
        <h2 className="mt-3 text-4xl md:text-5xl">{t.videoTitle}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-neutral-600">{t.videoText}</p>
      </div>

      <div className="mx-auto mt-8 grid max-w-4xl gap-5 sm:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem] border border-[#dcebe6] bg-white/70 p-2 shadow-[0_18px_50px_rgba(82,118,105,0.08)]">
          <video
            controls
            playsInline
            preload="metadata"
            poster="/lifestyle/reel-1-poster.webp"
            className="aspect-[9/16] w-full rounded-[1.6rem] object-cover"
          >
            <source src="/lifestyle/villa-myassa-experience-1.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-[#dcebe6] bg-white/70 p-2 shadow-[0_18px_50px_rgba(82,118,105,0.08)]">
          <video
            controls
            playsInline
            preload="metadata"
            poster="/lifestyle/reel-2-poster.webp"
            className="aspect-[9/16] w-full rounded-[1.6rem] object-cover"
          >
            <source src="/lifestyle/villa-myassa-experience-2.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>,
    mountNode
  );
}
