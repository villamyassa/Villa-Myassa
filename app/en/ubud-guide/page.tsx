import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ubud Travel Guide | Things to Do Near Villa Myassa, Bali",
  description:
    "Explore Ubud from Villa Myassa: Tegallalang Rice Terraces, Monkey Forest, Goa Gajah, Campuhan Ridge Walk, waterfalls, temples, ATV quad adventures, restaurants and more.",
  alternates: {
    canonical: "https://www.villamyassa.com/en/ubud-guide",
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
    title: "Tegallalang Rice Terraces",
    description:
      "Explore the famous Tegallalang Rice Terraces, one of the most iconic landscapes in the Ubud region.",
    image: "/ubud-guide/tegallalang-rice-terraces.jpg",
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

const guides = [
  {
    category: "UBUD",
    title: "Best Things to Do in Ubud",
    image: "/ubud-guide/culture-temples.jpg",
  },
  {
    category: "ATTRACTIONS",
    title: "Ubud Monkey Forest Visitor Guide",
    image: "/ubud-guide/monkey-forest-ubud.jpg",
  },
  {
    category: "NATURE",
    title: "Tegallalang Rice Terraces Guide",
    image: "/ubud-guide/tegallalang-rice-terraces.jpg",
  },
  {
    category: "NATURE",
    title: "Best Waterfalls Near Ubud",
    image: "/ubud-guide/waterfalls.jpg",
  },
  {
    category: "CULTURE",
    title: "Temples to Visit Around Ubud",
    image: "/ubud-guide/culture-temples.jpg",
  },
  {
    category: "ADVENTURE",
    title: "ATV & Quad Adventures Near Ubud",
    image: "/ubud-guide/atv-quad-ubud.jpg",
  },
];

export default function UbudGuidePage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/ubud-guide/hero-ubud-bali.jpg"
            alt="Ubud Bali landscape with rice terraces and Balinese temple"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-black/10" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-14 md:py-24">
          <Link
            href="/en"
            className="text-sm font-medium text-neutral-700 underline"
          >
            ← Back to Villa Myassa
          </Link>

          <div className="mt-8 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-600">
              Villa Myassa · Ubud · Bali
            </p>

            <h1 className="mt-3 text-5xl font-extrabold leading-tight md:text-7xl">
              Ubud Travel Guide
            </h1>

            <p className="mt-5 text-lg leading-relaxed md:text-xl">
              Discover Ubud and central Bali from Villa Myassa. Explore temples,
              Tegallalang Rice Terraces, waterfalls, Monkey Forest, restaurants,
              family activities and ATV adventures.
            </p>

            <p className="mt-4 max-w-xl leading-relaxed text-neutral-700">
              Villa Myassa is located in Singakerta in the Ubud area, offering
              a peaceful base for exploring Bali while enjoying the privacy of
              a three-bedroom villa with a private pool.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/en/3-bedroom-private-pool-villa-ubud"
                className="rounded-full bg-black px-6 py-3 font-semibold text-white"
              >
                Discover Villa Myassa
              </Link>

              <a
                href={AIRBNB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-6 py-3 font-semibold text-black shadow-sm"
              >
                Check availability on Airbnb
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        {/* DISCOVER */}
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

        {/* POPULAR PLACES */}
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

        {/* UPCOMING GUIDES */}
        <section className="mt-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
            Villa Myassa Guides
          </p>

          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            Upcoming Ubud travel guides
          </h2>

          <p className="mt-4 max-w-3xl text-lg text-neutral-600">
            This section will grow with detailed guides to help visitors plan
            their stay in Ubud and discover Bali from Villa Myassa.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <article
                key={guide.title}
                className="overflow-hidden rounded-3xl border border-neutral-200"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    {guide.category}
                  </p>

                  <h3 className="mt-2 text-xl font-bold">
                    {guide.title}
                  </h3>

                  <p className="mt-4 text-sm font-semibold text-neutral-400">
                    Guide coming soon
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* VILLA CTA */}
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

        {/* FINAL CTA */}
        <section className="relative mt-20 overflow-hidden rounded-3xl bg-black px-6 py-12 text-center text-white md:px-12">
          <h2 className="text-3xl font-bold">
            Planning your stay in Ubud?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-300">
            Explore Villa Myassa and check current availability for your Bali
            stay.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
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
