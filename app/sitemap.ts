import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.villamyassa.com";

  const homeLanguages = {
    en: `${base}/en`,
    fr: `${base}/fr`,
    id: `${base}/id`,
    zh: `${base}/zh`,
    "x-default": `${base}/en`,
  };

  const villaLanguages = {
    en: `${base}/en/3-bedroom-private-pool-villa-ubud`,
    fr: `${base}/fr/villa-3-chambres-piscine-privee-ubud`,
    id: `${base}/id/vila-3-kamar-kolam-pribadi-ubud`,
    zh: `${base}/zh/3-bedroom-private-pool-villa-ubud`,
    "x-default": `${base}/en/3-bedroom-private-pool-villa-ubud`,
  };

  const guideLanguages = {
    en: `${base}/en/ubud-guide`,
    fr: `${base}/fr/guide-ubud`,
    id: `${base}/id/panduan-ubud`,
    zh: `${base}/zh/ubud-guide`,
    "x-default": `${base}/en/ubud-guide`,
  };

  const page = (
    url: string,
    priority: number,
    languages: Record<string, string>
  ): MetadataRoute.Sitemap[number] => ({
    url,
    changeFrequency: "weekly",
    priority,
    alternates: { languages },
  });

  return [
    page(`${base}/en`, 1, homeLanguages),
    page(`${base}/fr`, 0.9, homeLanguages),
    page(`${base}/id`, 0.8, homeLanguages),
    page(`${base}/zh`, 0.8, homeLanguages),

    page(`${base}/en/3-bedroom-private-pool-villa-ubud`, 0.9, villaLanguages),
    {
      url: `${base}/en/family-villa-ubud`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    page(`${base}/fr/villa-3-chambres-piscine-privee-ubud`, 0.9, villaLanguages),
    page(`${base}/id/vila-3-kamar-kolam-pribadi-ubud`, 0.9, villaLanguages),
    page(`${base}/zh/3-bedroom-private-pool-villa-ubud`, 0.9, villaLanguages),

    page(`${base}/en/ubud-guide`, 0.8, guideLanguages),
    page(`${base}/fr/guide-ubud`, 0.8, guideLanguages),
    page(`${base}/id/panduan-ubud`, 0.8, guideLanguages),
    page(`${base}/zh/ubud-guide`, 0.8, guideLanguages),
  ];
}
