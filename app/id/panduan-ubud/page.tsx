import type { Metadata } from "next";
import LocalizedUbudGuidePage from "@/components/LocalizedUbudGuidePage";

export const metadata: Metadata = {
  title: "Panduan Wisata Ubud | Tempat Menarik Dekat Villa Myassa, Bali",
  description: "Jelajahi Ubud dari Villa Myassa: Tegallalang Rice Terraces, Monkey Forest, Goa Gajah, Campuhan Ridge Walk, air terjun, pura, ATV, restoran, dan lainnya.",
  alternates: {
    canonical: "https://www.villamyassa.com/id/panduan-ubud",
    languages: {
      en: "https://www.villamyassa.com/en/ubud-guide",
      fr: "https://www.villamyassa.com/fr/guide-ubud",
      id: "https://www.villamyassa.com/id/panduan-ubud",
      zh: "https://www.villamyassa.com/zh/ubud-guide",
    },
  },
};

export default function Page() {
  return <LocalizedUbudGuidePage lang="id" />;
}
