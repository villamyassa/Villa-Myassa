import type { Metadata } from "next";
import Image from "next/image";

const TRIP_URL =
  "https://www.trip.com/hotels/bali-hotel-detail-131766860/villa-myassa-by-balisuperhost/?utm_source=china_social&utm_medium=social&utm_campaign=china_launch";
const AIRBNB_URL =
  "https://www.airbnb.fr/rooms/1505417552730386824?utm_source=china_social&utm_medium=social&utm_campaign=china_launch";
const AGODA_URL =
  "https://www.agoda.com/villa-myassa-by-balisuperhost/hotel/badung-id.html";
const BOOKING_URL =
  "https://www.booking.com/hotel/id/villa-myassa-by-balisuperhost.html";

export const metadata: Metadata = {
  title: "Villa Myassa 乌布｜中国旅客预订入口",
  description:
    "Villa Myassa 乌布三卧室私人泳池别墅：中国旅客可通过 Trip.com、Agoda、Booking.com 或 Airbnb 查看实时价格与可订日期。",
  robots: { index: false, follow: true },
};

export default function ChinaBookingPage() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <section className="mx-auto max-w-3xl px-4 py-10 md:py-16">
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-neutral-200">
          <div className="relative aspect-[16/10]">
            <Image
              src="/photos/001-hero-piscine.jpg"
              alt="Villa Myassa 乌布私人泳池别墅"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="p-6 md:p-9">
            <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
              Villa Myassa · Singakerta · 乌布 · 巴厘岛
            </p>
            <h1 className="mt-2 text-3xl font-extrabold md:text-5xl">
              乌布三卧室私人泳池别墅
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-700">
              3 间卧室 · 3.5 间浴室 · 私人泳池 · 热带花园 · 设备齐全的厨房 · 最多 6 位宾客
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={TRIP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-between rounded-2xl bg-black px-5 py-4 font-semibold text-white"
              >
                <span>Trip.com（携程集团）</span>
                <span>查看价格 →</span>
              </a>
              <a
                href={AGODA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-between rounded-2xl border border-neutral-300 bg-white px-5 py-4 font-semibold"
              >
                <span>Agoda</span><span>查看 →</span>
              </a>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-between rounded-2xl border border-neutral-300 bg-white px-5 py-4 font-semibold"
              >
                <span>Booking.com</span><span>查看 →</span>
              </a>
              <a
                href={AIRBNB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-between rounded-2xl border border-neutral-300 bg-white px-5 py-4 font-semibold"
              >
                <span>Airbnb</span><span>查看 →</span>
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
              {["私人泳池", "3 间卧室", "最多 6 位", "乌布地区"].map((item) => (
                <div key={item} className="rounded-2xl bg-neutral-100 p-4 text-center font-semibold">
                  {item}
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-sm leading-relaxed text-neutral-500">
              在小红书或微信视频号看到 Villa Myassa？收藏本页，方便比较不同平台的实时价格与可订日期。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
