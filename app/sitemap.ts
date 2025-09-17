// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.villamyassa.com";
  const now = new Date();
  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    // Sections d'une page (bonus pour certains crawlers)
    { url: `${base}#visite-3d`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}#galerie`,   lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}#atouts`,    lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}#localisation`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}#contact`,   lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
