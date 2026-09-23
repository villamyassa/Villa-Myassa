import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const PAGE_URL = "https://www.villamyassa.com/zh/family-villa-ubud";
const TRIP_URL = "https://www.trip.com/hotels/bali-hotel-detail-131766860/villa-myassa-by-balisuperhost/";
const AIRBNB_URL = "https://www.airbnb.fr/rooms/1505417552730386824";

export const metadata: Metadata = {
  title: "巴厘岛乌布家庭别墅｜3卧室私人泳池 Villa Myassa",
  description:
    "计划和家人或朋友入住乌布？Villa Myassa 提供 3 间卧室、3.5 间浴室、私人泳池、厨房和热带花园，最多 6 位宾客，可通过 Trip.com 或 Airbnb 查看价格与可订日期。",
  keywords: [
    "乌布家庭别墅",
    "巴厘岛家庭别墅",
    "乌布三卧室别墅",
    "巴厘岛私人泳池别墅",
    "乌布亲子住宿",
    "巴厘岛家庭住宿",
    "Villa Myassa",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "zh-CN": PAGE_URL,
      en: "https://www.villamyassa.com/en/family-villa-ubud",
      "x-default": "https://www.villamyassa.com/en/family-villa-ubud",
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "乌布家庭别墅｜Villa Myassa 巴厘岛",
    description: "三卧室、私人泳池、厨房和热带花园，适合最多 6 位宾客。",
    url: PAGE_URL,
    siteName: "Villa Myassa",
    type: "website",
    images: ["/photos/001-hero-piscine.jpg"],
  },
};

const highlights = [
  ["3 间卧室", "大床、空调与独立休息空间"],
  ["最多 6 位宾客", "适合家庭或朋友共同出行"],
  ["私人泳池", "独享泳池与热带户外空间"],
  ["设备齐全的厨房", "方便早餐、简餐与家庭用餐"],
];

const ideas = [
  {
    title: "乌布猴林",
    text: "乌布最知名的景点之一，适合与市中心行程安排在同一天。",
    image: "/ubud-guide/monkey-forest-ubud.jpg",
  },
  {
    title: "德格拉朗梯田",
    text: "欣赏巴厘岛经典的梯田景观、棕榈树与热带乡村风光。",
    image: "/ubud-guide/tegallalang-rice-terraces.jpg",
  },
  {
    title: "巴厘文化与寺庙",
    text: "探索乌布周边的寺庙、传统艺术、手工艺与巴厘文化。",
    image: "/ubud-guide/culture-temples.jpg",
  },
];

export default function ChineseFamilyVillaPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mb-6">
          <Link href="/zh" className="text-sm text-neutral-500 underline hover:text-black">
            ← 返回 Villa Myassa
          </Link>
        </div>

        <header className="max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500">
            Villa Myassa · Singakerta · 乌布 · 巴厘岛
          </p>
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            乌布三卧室家庭别墅，配私人泳池
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-neutral-700">
            Villa Myassa 是一座适合家庭和朋友共同入住的私人别墅，最多可接待 6 位宾客。
            别墅设有三间卧室、3.5 间浴室、私人泳池、设备齐全的厨房以及室内外生活空间，
            比传统酒店更适合希望拥有独立空间与私密度的多人旅行。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={TRIP_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-black px-6 py-3 font-semibold text-white">
              在 Trip.com（携程集团）查看价格
            </a>
            <a href={AIRBNB_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-neutral-300 px-6 py-3 font-semibold">
              在 Airbnb 查看
            </a>
            <Link href="/zh/3-bedroom-private-pool-villa-ubud" className="rounded-full border border-neutral-300 px-6 py-3 font-semibold">
              查看别墅详情
            </Link>
          </div>
        </header>

        <section className="mt-12 overflow-hidden rounded-3xl">
          <Image
            src="/photos/001-hero-piscine.jpg"
            alt="巴厘岛乌布 Villa Myassa 家庭私人泳池别墅"
            width={1600}
            height={1000}
            priority
            className="h-auto w-full object-cover"
          />
        </section>

        <section className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-neutral-200 bg-white p-5">
              <p className="text-xl font-bold">{title}</p>
              <p className="mt-1 text-neutral-600">{text}</p>
            </div>
          ))}
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold md:text-4xl">为什么家庭和朋友适合选择乌布私人别墅</h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-neutral-700">
            <p>
              多人旅行时，私人别墅可以让大家一起用餐、游泳和休息，同时仍然拥有各自的卧室空间。
              Villa Myassa 的客厅、厨房、私人泳池和热带花园适合在探索乌布的行程之间放松休息。
            </p>
            <p>
              别墅位于 Singakerta，处于乌布市中心以南的较安静区域，同时可以前往乌布的餐厅、
              咖啡馆、文化景点和自然景观。机场接送、司机、早餐、按摩等额外服务可向别墅团队另行咨询安排。
            </p>
          </div>
        </section>

        <section className="mt-20 grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl">
            <Image src="/photos/002-salon.jpg" alt="Villa Myassa 乌布家庭别墅客厅" width={1200} height={900} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center rounded-3xl bg-neutral-50 p-7 md:p-10">
            <h2 className="text-3xl font-bold">适合一起旅行，也保留各自空间</h2>
            <p className="mt-5 text-lg leading-relaxed text-neutral-700">
              三间空调卧室均配有大床，别墅共有 3.5 间浴室，并提供高速 Wi-Fi、智能电视和设备齐全的厨房。
              对于父母与孩子、亲友同行或三对朋友共同旅行，这种布局更加灵活。
            </p>
          </div>
        </section>

        <section className="mt-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">乌布行程灵感</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">入住期间可以体验什么</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {ideas.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-3xl border border-neutral-200">
                <div className="relative aspect-[16/10]">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-neutral-600">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
          <Link href="/zh/ubud-guide" className="mt-6 inline-flex font-semibold underline">
            查看乌布旅行指南 →
          </Link>
        </section>

        <section className="mt-20 rounded-3xl border border-neutral-200 p-7 md:p-10">
          <h2 className="text-3xl font-bold md:text-4xl">适合多人入住的实用设施</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "私人泳池",
              "3 间空调卧室",
              "3.5 间浴室",
              "高速 Wi-Fi",
              "设备齐全的厨房",
              "室内与户外生活空间",
              "免费停车",
              "热带花园",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-neutral-50 p-5 text-lg">✓ {item}</div>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-3xl bg-neutral-100 p-8 text-center md:p-12">
          <h2 className="text-3xl font-bold">正在计划巴厘岛乌布家庭旅行？</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-700">
            查看 Villa Myassa 的实时价格、可订日期和预订信息。
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={TRIP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full bg-black px-7 py-3 font-semibold text-white">
              Trip.com（携程集团）
            </a>
            <a href={AIRBNB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-neutral-300 bg-white px-7 py-3 font-semibold text-black">
              Airbnb
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
