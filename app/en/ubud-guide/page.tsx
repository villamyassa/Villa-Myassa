import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ubud Travel Guide | Things to Do Near Villa Myassa, Bali",
  description:
    "Explore Ubud from Villa Myassa: Tegallalang Rice Terraces, Monkey Forest, Goa Gajah, Campuhan Ridge Walk, waterfalls, temples, ATV quad adventures, restaurants and more.",
  alternates: {
    canonical: "https://www.villamyassa.com/en/ubud-guide",
    languages: {
      en: "https://www.villamyassa.com/en/ubud-guide",
      fr: "https://www.villamyassa.com/fr/guide-ubud",
      id: "https://www.villamyassa.com/id/panduan-ubud",
      zh: "https://www.villamyassa.com/zh/ubud-guide",
      "x-default": "https://www.villamyassa.com/en/ubud-guide",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Ubud Travel Guide | Villa Myassa Bali",
    description:
      "Discover the best things to do around Ubud while staying at Villa Myassa in Singakerta, Bali.",
    url: "https://www.villamyassa.com/en/ubud-guide",
    siteName: "Villa Myassa",
    type: "website",
  },
};

const AIRBNB_URL =
  "https://www.airbnb.fr/rooms/1505417552730386824";

const discoveries = [
  {
    title: "Culture & Temples",
    description:
      "Discover Balinese traditions, temples, historical sites, art and cultural attractions around Ubud.",
    image: "/ubud-guide/culture-temples.jpg",
  },
  {
    title: "Rice Terraces & Rural Landscapes",
    description:
      "Explore Bali's rice fields, traditional villages and tropical countryside around Ubud.",
    image: "/ubud-guide/9957A069-7B9D-4533-B989-1FF659AA19AC.png",
  },
  {
    title: "Waterfalls",
    description:
      "Plan nature-focused excursions to waterfalls and tropical scenery around central Bali.",
    image: "/ubud-guide/waterfalls.jpg",
  },
  {
    title: "Food & Restaurants",
    description:
      "Find ideas for cafés, restaurants and local dining experiences around Ubud.",
    image: "/ubud-guide/food-restaurants.jpg",
  },
  {
    title: "Family Activities",
    description:
      "Ideas for families travelling with children and looking for activities around Ubud.",
    image: "/ubud-guide/family-activities.jpg",
  },
  {
    title: "ATV & Quad Adventures",
    description:
      "Experience off-road quad tours through rice fields, jungle trails, rivers and traditional villages around Ubud.",
    image: "/ubud-guide/atv-quad-ubud.jpg",
  },
];

const attractions = [
  {
    title: "Ubud Monkey Forest",
    description:
      "One of the best-known attractions in central Ubud and a popular stop for first-time visitors.",
    image: "/ubud-guide/monkey-forest-ubud.jpg",
  },
  {
    title: "Tegallalang Rice Terraces",
    description:
      "The famous terraced rice landscape north of Ubud, surrounded by palms and tropical vegetation.",
    image: "/ubud-guide/tegallalang-rice-terraces.jpg",
  },
  {
    title: "Campuhan Ridge Walk",
    description:
      "A scenic walking route close to central Ubud, popular for tropical landscapes and panoramic views.",
    image: "/ubud-guide/campuhan-ridge-walk.jpg",
  },
  {
    title: "Goa Gajah",
    description:
      "A historic archaeological and religious site near Ubud, also known as the Elephant Cave.",
    image: "/ubud-guide/goa-gajah.jpg",
  },
  {
    title: "Ubud Palace",
    description:
      "A landmark in central Ubud associated with the town's royal and cultural heritage.",
    image: "/ubud-guide/ubud-palace.jpg",
  },
  {
    title: "Ubud Art & Markets",
    description:
      "Explore Ubud's art, crafts, galleries, markets and independent shops.",
    image: "/ubud-guide/ubud-art-markets.jpg",
  },
];

export default function UbudGuidePage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/ubud-guide/hero-ubud-bali.png"
            alt="Ubud Bali landscape with rice terraces and Balinese temple"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/45 md:bg-gradient-to-r md:from-black/35 md:via-black/15 md:to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-8 text-white md:px-4 md:py-10">
          <Link
            href="/en"
            className="text-sm font-bold text-white underline decoration-white/80 underline-offset-4 drop-shadow-md"
          >
            ← Back to Villa Myassa
          </Link>

          <div className="mt-5 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-white drop-shadow-md">
              Villa Myassa · Ubud · Bali
            </p>

            <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] text-white drop-shadow-lg sm:text-5xl md:text-7xl">
              Ubud Travel Guide
            </h1>

            <p className="mt-5 text-lg font-bold leading-relaxed text-white drop-shadow-md md:text-xl">
              Discover Ubud and central Bali from Villa Myassa. Explore temples,
              rice terraces, waterfalls, Monkey Forest, restaurants, family
              activities and ATV adventures.
            </p>

            <p className="mt-3 max-w-xl font-semibold leading-relaxed text-white drop-shadow-md">
              Villa Myassa is located in Singakerta in the Ubud area, offering
              a peaceful base for exploring Bali while enjoying the privacy of
              a three-bedroom villa with a private pool.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/en/3-bedroom-private-pool-villa-ubud"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-black shadow-md transition hover:bg-neutral-100 sm:w-auto"
              >
                Discover Villa Myassa
              </Link>

              <a
                href={AIRBNB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/70 bg-black/55 px-6 py-3 text-center font-semibold text-white shadow-md backdrop-blur-sm transition hover:bg-black/70 sm:w-auto"
              >
                Check availability on Airbnb
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <section>
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
            Explore Ubud
          </p>

          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            Things to discover around Villa Myassa
          </h2>

          <p className="mt-3 max-w-4xl text-lg text-neutral-600">
            Ubud combines Balinese culture, tropical landscapes, temples,
            adventure, food and nature.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {discoveries.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-3xl border border-neutral-200 bg-white"
              >
                <div className="relative aspect-[16/8]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold">{item.title}</h3>

                  <p className="mt-2 leading-relaxed text-neutral-600">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[2rem] bg-neutral-100 p-6 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
            Start here
          </p>

          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            Popular places and experiences in the Ubud area
          </h2>

          <p className="mt-4 max-w-4xl text-lg text-neutral-600">
            Discover some of Ubud&apos;s best-known attractions and experiences
            and start planning your stay.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {attractions.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-3xl bg-white"
              >
                <div className="relative aspect-[16/8]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold">{item.title}</h3>

                  <p className="mt-2 leading-relaxed text-neutral-600">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 grid overflow-hidden rounded-3xl border border-neutral-200 md:grid-cols-2">
          <div className="relative min-h-[320px]">
            <Image
              src="/photos/008-jardin.jpg"
              alt="Villa Myassa private pool and tropical garden in Ubud"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center p-8 md:p-12">
            <h2 className="text-3xl font-bold">
              Stay in a private villa while exploring Ubud
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-neutral-600">
              Villa Myassa offers three bedrooms, a private swimming pool,
              tropical garden, kitchen and indoor-outdoor living spaces for up
              to six guests.
            </p>

            <Link
              href="/en/3-bedroom-private-pool-villa-ubud"
              className="mt-6 font-semibold underline"
            >
              View our 3-bedroom private pool villa in Ubud →
            </Link>
          </div>
        </section>

        <section className="relative mt-20 overflow-hidden rounded-3xl bg-black px-6 py-12 text-center text-white md:px-12">
          <h2 className="text-3xl font-bold">
            Planning your stay in Ubud?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-300">
            Explore Villa Myassa and check current availability for your Bali
            stay.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/en/3-bedroom-private-pool-villa-ubud"
              className="rounded-full bg-white px-7 py-3 font-semibold text-black"
            >
              Explore the villa
            </Link>

            <a
              href={AIRBNB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/40 px-7 py-3 font-semibold"
            >
              View on Airbnb
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
