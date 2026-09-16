"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Lang = "fr" | "id" | "zh";

const COPY: Record<Lang, { title: string; text: string; villa: string; guide: string; note: string; villaHref: string; guideHref: string }> = {
  fr: {
    title: "Vous cherchez une villa 3 chambres avec piscine privée à Ubud ?",
    text: "Découvrez Villa Myassa plus en détail : piscine privée, trois chambres, jardin tropical, équipements, services et photos.",
    villa: "Découvrir Villa Myassa",
    guide: "Guide d’Ubud",
    note: "Explorez les activités à Ubud : rizières, temples, cascades, Monkey Forest, restaurants et aventures en quad.",
    villaHref: "/fr/villa-3-chambres-piscine-privee-ubud",
    guideHref: "/fr/guide-ubud",
  },
  id: {
    title: "Mencari vila 3 kamar dengan kolam renang pribadi di Ubud?",
    text: "Jelajahi Villa Myassa lebih lengkap: kolam renang pribadi, tiga kamar tidur, taman tropis, fasilitas, layanan, dan foto.",
    villa: "Jelajahi Villa Myassa",
    guide: "Panduan Ubud",
    note: "Temukan aktivitas di Ubud termasuk sawah terasering, pura, air terjun, Monkey Forest, restoran, dan petualangan ATV.",
    villaHref: "/id/vila-3-kamar-kolam-pribadi-ubud",
    guideHref: "/id/panduan-ubud",
  },
  zh: {
    title: "正在寻找乌布三卧室私人泳池别墅？",
    text: "进一步了解 Villa Myassa：私人泳池、三间卧室、热带花园、设施、服务和照片。",
    villa: "探索 Villa Myassa",
    guide: "乌布旅行指南",
    note: "探索乌布的梯田、寺庙、瀑布、猴林、餐厅和 ATV 探险等体验。",
    villaHref: "/zh/3-bedroom-private-pool-villa-ubud",
    guideHref: "/zh/ubud-guide",
  },
};

export default function LocalizedSeoDiscoveryCard() {
  const pathname = usePathname();
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  const first = pathname?.split("/").filter(Boolean)[0] as Lang | undefined;
  const lang = first && first in COPY ? first : null;

  useEffect(() => {
    if (!lang) return;
    const anchor = document.getElementById("description");
    if (!anchor?.parentElement) return;

    const existing = document.getElementById("localized-seo-discovery-card");
    if (existing) existing.remove();

    const node = document.createElement("div");
    node.id = "localized-seo-discovery-card";
    anchor.parentElement.insertBefore(node, anchor);
    setMountNode(node);

    return () => {
      node.remove();
      setMountNode(null);
    };
  }, [lang]);

  if (!lang || !mountNode) return null;
  const t = COPY[lang];

  return createPortal(
    <section className="container mx-auto px-4 max-w-6xl pb-6">
      <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 text-center md:p-8">
        <h2 className="text-2xl font-bold md:text-3xl">{t.title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-600">{t.text}</p>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={t.villaHref} className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 font-semibold text-white transition hover:bg-neutral-800">{t.villa}</Link>
          <Link href={t.guideHref} className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold text-black transition hover:bg-neutral-100">{t.guide}</Link>
        </div>
        <p className="mt-4 text-sm text-neutral-500">{t.note}</p>
      </div>
    </section>,
    mountNode
  );
}
