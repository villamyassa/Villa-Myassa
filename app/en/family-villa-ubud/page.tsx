import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Family Villa in Ubud | 3 Bedrooms + Private Pool | Villa Myassa",
  description:
    "Looking for a family villa in Ubud? Villa Myassa offers 3 bedrooms, 3.5 bathrooms, a private pool, kitchen and tropical garden for up to 6 guests.",
  alternates: {
    canonical: "https://www.villamyassa.com/en/family-villa-ubud",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Family Villa in Ubud | Villa Myassa Bali",
    description:
      "A private 3-bedroom villa with pool in Ubud for families and small groups of up to 6 guests.",
    url: "https://www.villamyassa.com/en/family-villa-ubud",
    siteName: "Villa Myassa",
    type: "website",
    images: ["/photos/001-hero-piscine.jpg"],
  },
};

const AIRBNB_URL = "https://www.airbnb.fr/rooms/1505417552730386824";

const highlights = [
  ["3 bedrooms", "Queen-size beds and private sleeping spaces"],
  ["Up to 6 guests", "Space for a family or small group"],
  ["Private pool", "Your own pool and tropical outdoor area"],
  ["Full kitchen", "Useful for breakfast, snacks and family meals"],
];

const familyIdeas = [
  {
    title: "Monkey Forest",
    text: "A well-known Ubud attraction that can be combined with a day in central Ubud.",
    image: "/ubud-guide/monkey-forest-ubud.jpg",
  },
  {
    title: "Rice terraces",
    text: "Explore Bali's green landscapes and traditional rice-growing scenery around Ubud.",
    image: "/ubud-guide/tegallalang-rice-terraces.jpg",
  },
  {
    title: "Culture and temples",
    text: "Discover Balinese culture, temples, crafts and local traditions during your stay.",
    image: "/ubud-guide/culture-temples.jpg",
  },
];

export default function FamilyVillaUbudPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mb-6">
          <Link
            href="/en"
            className="text-sm text-neutral-500 underline hover:text-black"
          >
            ← Back to Villa Myassa
          </Link>
        </div>

        <header className="max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500">
            Villa Myassa · Singakerta · Ubud · Bali
          </p>

          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            Family Villa in Ubud with 3 Bedrooms and a Private Pool
          </h1>

          <p className="mt-6 text-xl leading-relaxed text-neutral-700">
            Villa Myassa is a private villa in the Ubud area designed for up to
            six guests. With three bedrooms, 3.5 bathrooms, a private swimming
            pool, a fully equipped kitchen and indoor-outdoor living spaces, it
            gives families more space and privacy than a standard hotel stay.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={AIRBNB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-black px-6 py-3 font-semibold text-white"
            >
              Check availability on Airbnb
            </a>

            <Link
              href="/en/3-bedroom-private-pool-villa-ubud"
              className="rounded-full border border-neutral-300 px-6 py-3 font-semibold"
            >
              Explore the villa
            </Link>

            <Link
              href="/en/ubud-guide"
              className="rounded-full border border-neutral-300 px-6 py-3 font-semibold"
            >
              Explore Ubud
            </Link>
          </div>
        </header>

        <section className="mt-12 overflow-hidden rounded-3xl">
          <Image
            src="/photos/001-hero-piscine.jpg"
            alt="Villa Myassa family villa with private pool in Ubud, Bali"
            width={1600}
            height={1000}
            priority
            className="h-auto w-full object-cover"
          />
        </section>

        <section className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(([title, text]) => (
            <div
              key={title}
              className="rounded-2xl border border-neutral-200 bg-white p-5"
            >
              <p className="text-xl font-bold">{title}</p>
              <p className="mt-1 text-neutral-600">{text}</p>
            </div>
          ))}
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold md:text-4xl">
            Why families choose a private villa in Ubud
          </h2>

          <div className="mt-6 space-y-5 text-lg leading-relaxed text-neutral-700">
            <p>
              A private villa gives everyone room to spend time together while
              still having separate bedrooms. At Villa Myassa, the living
              spaces, kitchen, private pool and tropical garden make it easy to
              slow down between days exploring Ubud and central Bali.
            </p>

            <p>
              The villa is in Singakerta, south of central Ubud. This location
              offers a quieter setting while keeping Ubud&apos;s restaurants,
              cafés, culture and attractions within reach.
            </p>
          </div>
        </section>

        <section className="mt-20 grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl">
            <Image
              src="/photos/002-salon.jpg"
              alt="Living room at Villa Myassa family villa in Ubud"
              width={1200}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center rounded-3xl bg-neutral-50 p-7 md:p-10">
            <h2 className="text-3xl font-bold">
              Space for family time and private time
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-neutral-700">
              Villa Myassa has three air-conditioned bedrooms with queen-size
              beds, 3.5 bathrooms, Smart TVs, Wi-Fi and a fully equipped
              kitchen. The layout works well for parents, older children,
              relatives or friends travelling together.
            </p>
          </div>
        </section>

        <section className="mt-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
            Family trip ideas
          </p>

          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            Things to do around Ubud during your stay
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {familyIdeas.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-3xl border border-neutral-200"
              >
                <div className="relative aspect-[16/10]">
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
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <Link
            href="/en/ubud-guide"
            className="mt-6 inline-flex font-semibold underline"
          >
            See our Ubud travel guide →
          </Link>
        </section>

        <section className="mt-20 rounded-3xl border border-neutral-200 p-7 md:p-10">
          <h2 className="text-3xl font-bold md:text-4xl">
            A practical base for a family stay in Bali
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "Private swimming pool",
              "Three air-conditioned bedrooms",
              "3.5 bathrooms",
              "High-speed Wi-Fi",
              "Fully equipped kitchen",
              "Indoor and outdoor living areas",
              "Free on-site parking",
              "Tropical garden",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-neutral-50 p-5 text-lg"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-3xl bg-neutral-100 p-8 text-center md:p-12">
          <h2 className="text-3xl font-bold">
            Planning a family trip to Ubud?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-700">
            See current availability, booking details and verified guest reviews
            for Villa Myassa on Airbnb.
          </p>
          <a
            href={AIRBNB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex rounded-full bg-black px-7 py-3 font-semibold text-white"
          >
            View Villa Myassa on Airbnb
          </a>
        </section>
      </section>
    </main>
  );
}
