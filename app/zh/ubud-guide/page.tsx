import type { Metadata } from "next";
import LocalizedUbudGuidePage from "@/components/LocalizedUbudGuidePage";

export const metadata: Metadata = {
  title: "乌布自由行攻略｜家庭旅行、景点与私人别墅 Villa Myassa",
  description: "为中国旅客准备的乌布旅行指南：德格拉朗梯田、猴林、象窟、Campuhan Ridge Walk、瀑布、寺庙、ATV、美食，以及适合家庭和朋友入住的私人泳池别墅。",
  alternates: {
    canonical: "https://www.villamyassa.com/zh/ubud-guide",
    languages: {
      en: "https://www.villamyassa.com/en/ubud-guide",
      fr: "https://www.villamyassa.com/fr/guide-ubud",
      id: "https://www.villamyassa.com/id/panduan-ubud",
      zh: "https://www.villamyassa.com/zh/ubud-guide",
      "zh-CN": "https://www.villamyassa.com/zh/ubud-guide",
      "x-default": "https://www.villamyassa.com/en/ubud-guide",
    },
  },
};

export default function Page() {
  return <LocalizedUbudGuidePage lang="zh" />;
}
