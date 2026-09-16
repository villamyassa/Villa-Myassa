import type { Metadata } from "next";
import LocalizedVillaSeoPage from "@/components/LocalizedVillaSeoPage";

export const metadata: Metadata = {
  title: "乌布三卧室私人泳池别墅 | Villa Myassa 巴厘岛",
  description: "探索位于巴厘岛乌布 Singakerta 的 Villa Myassa：三卧室私人泳池别墅，最多可住 6 人，设有 3.5 间浴室、热带花园、空调、高速 Wi-Fi 和设备齐全的厨房。",
  alternates: {
    canonical: "https://www.villamyassa.com/zh/3-bedroom-private-pool-villa-ubud",
    languages: {
      en: "https://www.villamyassa.com/en/3-bedroom-private-pool-villa-ubud",
      fr: "https://www.villamyassa.com/fr/villa-3-chambres-piscine-privee-ubud",
      id: "https://www.villamyassa.com/id/vila-3-kamar-kolam-pribadi-ubud",
      zh: "https://www.villamyassa.com/zh/3-bedroom-private-pool-villa-ubud",
    },
  },
};

export default function Page() {
  return <LocalizedVillaSeoPage lang="zh" />;
}
