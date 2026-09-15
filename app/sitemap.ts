import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.villamyassa.com";

  const languages = {
    en: `${base}/en`,
    fr: `${base}/fr`,
    id: `${base}/id`,
    zh: `${base}/zh`,
  };

  return [
    {
      url: `${base}/en`,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages,
      },
    },
    {
      url: `${base}/fr`,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages,
      },
    },
    {
      url: `${base}/id`,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages,
      },
    },
    {
      url: `${base}/zh`,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages,
      },
    },
    {
      url: `${base}/en/3-bedroom-private-pool-villa-ubud`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
