import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Baiduspider", allow: "/" },
    ],
    sitemap: "https://www.villamyassa.com/sitemap.xml",
    host: "https://www.villamyassa.com",
  };
}
