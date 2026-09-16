import type { Metadata } from "next";
import LocalizedUbudGuidePage from "@/components/LocalizedUbudGuidePage";

export const metadata: Metadata = {
  title: "Guide d’Ubud | Que faire près de Villa Myassa, Bali",
  description: "Explorez Ubud depuis Villa Myassa : rizières de Tegallalang, Monkey Forest, Goa Gajah, Campuhan Ridge Walk, cascades, temples, quad, restaurants et plus encore.",
  alternates: {
    canonical: "https://www.villamyassa.com/fr/guide-ubud",
    languages: {
      en: "https://www.villamyassa.com/en/ubud-guide",
      fr: "https://www.villamyassa.com/fr/guide-ubud",
      id: "https://www.villamyassa.com/id/panduan-ubud",
      zh: "https://www.villamyassa.com/zh/ubud-guide",
    },
  },
};

export default function Page() {
  return <LocalizedUbudGuidePage lang="fr" />;
}
