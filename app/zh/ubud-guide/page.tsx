import type { Metadata } from "next";
import LocalizedUbudGuidePage from "@/components/LocalizedUbudGuidePage";

export const metadata: Metadata = {
  title: "乌布旅行指南 | Villa Myassa 巴厘岛周边景点",
  description: "从 Villa Myassa 探索乌布：德格拉朗梯田、猴林、象窟、Campuhan Ridge Walk、瀑布、寺庙、ATV 探险、餐厅等。",
  alternates: {
    canonical: "https://www.villamyassa.com/zh/ubud-guide",
    languages: {
      en: "https://www.villamyassa.com/en/ubud-guide",
      fr: "https://www.villamyassa.com/fr/guide-ubud",
      id: "https://www.villamyassa.com/id/panduan-ubud",
      zh: "https://www.villamyassa.com/zh/ubud-guide",
    },
  },
};

export default function Page() {
  return <LocalizedUbudGuidePage lang="zh" />;
}
