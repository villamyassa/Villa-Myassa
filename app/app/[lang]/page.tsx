import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VillaPage, { type Lang } from "../VillaPage";

const LANGS: Lang[] = ["fr", "en", "id", "zh"];

function isLang(value: string): value is Lang {
  return LANGS.includes(value as Lang);
}

const SEO: Record<
  Lang,
  {
    title: string;
    description: string;
  }
> = {
  fr: {
    title: "Villa Myassa Ubud | Villa privée 3 chambres avec piscine à Bali",
    description:
      "Découvrez Villa Myassa à Singakerta, Ubud : villa privée de 3 chambres avec piscine, jardin tropical et équipements haut de gamme à Bali.",
  },

  en: {
    title: "Villa Myassa Ubud | 3-Bedroom Private Pool Villa in Bali",
    description:
      "Discover Villa Myassa in Singakerta, Ubud: a private 3-bedroom villa with pool, tropical garden and premium amenities in Bali.",
  },

  id: {
    title: "Villa Myassa Ubud | Vila 3 Kamar dengan Kolam Renang Pribadi di Bali",
    description:
      "Temukan Villa Myassa di Singakerta, Ubud: vila pribadi 3 kamar tidur dengan kolam renang, taman tropis, dan fasilitas lengkap di Bali.",
  },

  zh: {
    title: "Villa Myassa Ubud | 巴厘岛乌布三卧室私人泳池别墅",
    description:
      "探索位于巴厘岛乌布 Singakerta 的 Villa Myassa：三卧室私人别墅，配有私人泳池、热带花园和完善设施。",
  },
};

export function generateStaticParams() {
  return LANGS.map((lang) => ({
    lang,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Metadata {
  if (!isLang(params.lang)) {
    return {};
  }

  const lang = params.lang;
  const seo = SEO[lang];

  return {
    title: seo.title,
    description: seo.description,

    alternates: {
      canonical: `https://www.villamyassa.com/${lang}`,
      languages: {
        fr: "https://www.villamyassa.com/fr",
        en: "https://www.villamyassa.com/en",
        id: "https://www.villamyassa.com/id",
        zh: "https://www.villamyassa.com/zh",
        "x-default": "https://www.villamyassa.com/en",
      },
    },

    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://www.villamyassa.com/${lang}`,
      siteName: "Villa Myassa",
      type: "website",
    },
  };
}

export default function LanguagePage({
  params,
}: {
  params: { lang: string };
}) {
  if (!isLang(params.lang)) {
    notFound();
  }

  return <VillaPage lang={params.lang} />;
}
