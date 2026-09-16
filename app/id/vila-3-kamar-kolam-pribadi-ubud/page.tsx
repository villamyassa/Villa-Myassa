import type { Metadata } from "next";
import LocalizedVillaSeoPage from "@/components/LocalizedVillaSeoPage";

export const metadata: Metadata = {
  title: "Vila 3 Kamar dengan Kolam Pribadi di Ubud, Bali | Villa Myassa",
  description: "Temukan Villa Myassa, vila pribadi 3 kamar dengan kolam renang di Singakerta, Ubud, Bali. Hingga 6 tamu, 3,5 kamar mandi, taman tropis, AC, Wi-Fi, dan dapur lengkap.",
  alternates: {
    canonical: "https://www.villamyassa.com/id/vila-3-kamar-kolam-pribadi-ubud",
    languages: {
      en: "https://www.villamyassa.com/en/3-bedroom-private-pool-villa-ubud",
      fr: "https://www.villamyassa.com/fr/villa-3-chambres-piscine-privee-ubud",
      id: "https://www.villamyassa.com/id/vila-3-kamar-kolam-pribadi-ubud",
      zh: "https://www.villamyassa.com/zh/3-bedroom-private-pool-villa-ubud",
    },
  },
};

export default function Page() {
  return <LocalizedVillaSeoPage lang="id" />;
}
