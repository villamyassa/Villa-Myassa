import type { Metadata } from "next";
import LocalizedVillaSeoPage from "@/components/LocalizedVillaSeoPage";

const PAGE_URL = "https://www.villamyassa.com/zh/3-bedroom-private-pool-villa-ubud";

export const metadata: Metadata = {
  title: "巴厘岛乌布私人泳池别墅｜3卧室家庭度假 Villa Myassa",
  description:
    "Villa Myassa 是巴厘岛乌布 Singakerta 的三卧室私人泳池别墅，适合家庭和朋友出行，最多 6 位宾客。设有 3.5 间浴室、热带花园、厨房、高速 Wi-Fi，可通过 Trip.com 或 Airbnb 预订。",
  keywords: [
    "巴厘岛别墅",
    "乌布别墅",
    "乌布私人泳池别墅",
    "巴厘岛私人泳池别墅",
    "乌布三卧室别墅",
    "巴厘岛家庭住宿",
    "乌布家庭别墅",
    "Villa Myassa",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: "https://www.villamyassa.com/en/3-bedroom-private-pool-villa-ubud",
      fr: "https://www.villamyassa.com/fr/villa-3-chambres-piscine-privee-ubud",
      id: "https://www.villamyassa.com/id/vila-3-kamar-kolam-pribadi-ubud",
      "zh-CN": PAGE_URL,
      "x-default": "https://www.villamyassa.com/en/3-bedroom-private-pool-villa-ubud",
    },
  },
  openGraph: {
    title: "巴厘岛乌布私人泳池别墅｜Villa Myassa",
    description:
      "乌布三卧室私人泳池别墅，适合家庭和朋友，最多 6 位宾客。Trip.com 与 Airbnb 可预订。",
    url: PAGE_URL,
    siteName: "Villa Myassa",
    type: "website",
    images: ["/photos/001-hero-piscine.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "巴厘岛乌布私人泳池别墅｜Villa Myassa",
    description: "三卧室、私人泳池、热带花园，适合最多 6 位宾客入住。",
    images: ["/photos/001-hero-piscine.jpg"],
  },
  robots: { index: true, follow: true },
};

const lodgingSchema = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Villa Myassa",
  url: PAGE_URL,
  image: [
    "https://www.villamyassa.com/photos/001-hero-piscine.jpg",
    "https://www.villamyassa.com/photos/002-salon.jpg",
    "https://www.villamyassa.com/photos/008-jardin.jpg",
  ],
  description:
    "巴厘岛乌布 Singakerta 的三卧室私人泳池别墅，适合家庭和朋友出行，最多可入住 6 位宾客。",
  address: {
    "@type": "PostalAddress",
    streetAddress: "F66R+H95 Singakerta",
    addressLocality: "Ubud",
    addressRegion: "Bali",
    postalCode: "80571",
    addressCountry: "ID",
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "私人泳池", value: true },
    { "@type": "LocationFeatureSpecification", name: "高速 Wi-Fi", value: true },
    { "@type": "LocationFeatureSpecification", name: "设备齐全的厨房", value: true },
    { "@type": "LocationFeatureSpecification", name: "免费停车", value: true },
    { "@type": "LocationFeatureSpecification", name: "空调", value: true },
  ],
  sameAs: [
    "https://www.airbnb.com/rooms/1505417552730386824",
    "https://www.trip.com/hotels/bali-hotel-detail-131766860/villa-myassa-by-balisuperhost/",
    "https://www.booking.com/hotel/id/villa-myassa-by-balisuperhost.html",
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingSchema) }}
      />
      <LocalizedVillaSeoPage lang="zh" />
    </>
  );
}
