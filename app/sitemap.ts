// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.villamyassa.com";
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/?lang=fr`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/?lang=en`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/?lang=id`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/fr/villa-ubud-piscine-privee`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/en/ubud-villa-private-pool`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/id/vila-ubud-kolam-renang-pribadi`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
