import type { Metadata } from "next";
import LocalizedVillaSeoPage from "@/components/LocalizedVillaSeoPage";

export const metadata: Metadata = {
  title: "Villa 3 chambres avec piscine privée à Ubud, Bali | Villa Myassa",
  description: "Découvrez Villa Myassa, villa privée 3 chambres avec piscine à Singakerta, Ubud, Bali. Jusqu’à 6 personnes, 3,5 salles de bain, jardin tropical, climatisation, Wi-Fi et cuisine équipée.",
  alternates: {
    canonical: "https://www.villamyassa.com/fr/villa-3-chambres-piscine-privee-ubud",
    languages: {
      en: "https://www.villamyassa.com/en/3-bedroom-private-pool-villa-ubud",
      fr: "https://www.villamyassa.com/fr/villa-3-chambres-piscine-privee-ubud",
      id: "https://www.villamyassa.com/id/vila-3-kamar-kolam-pribadi-ubud",
      zh: "https://www.villamyassa.com/zh/3-bedroom-private-pool-villa-ubud",
    },
  },
};

export default function Page() {
  return <LocalizedVillaSeoPage lang="fr" />;
}
