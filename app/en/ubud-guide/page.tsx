
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ubud Travel Guide | Things to Do Near Villa Myassa, Bali",
  description:
    "Explore Ubud from Villa Myassa with our local guide to temples, rice terraces, waterfalls, cultural attractions, restaurants and day trips around Bali.",
  alternates: {
    canonical: "https://www.villamyassa.com/en/ubud-guide",
  },
  openGraph: {
    title: "Ubud Travel Guide | Villa Myassa Bali",
    description:
      "Discover the best things to do in and around Ubud while staying at Villa Myassa in Singakerta, Bali.",
    url: "https://www.villamyassa.com/en/ubud-guide",
    siteName: "Villa Myassa",
    type: "website",
  },
};

const AIRBNB_URL =
  "https://www.airbnb.fr/rooms/1505417552730386824";

const futureGuides = [
  {
    title: "Best Things to Do in Ubud",
    description:
      "A practical guide to the cultural attractions, nature and experiences that make Ubud one of Bali's most popular destinations.",
    category: "Ubud",
  },
  {
    title: "Ubud Monkey Forest Visitor Guide",
    description:
      "What to know before visiting the Sacred Monkey Forest Sanctuary in central Ubud.",
    category: "Attractions",
  },
  {
    title: "Best Rice Terraces Near Ubud",
    description:
      "Discover beautiful rice landscapes around Ubud and ideas for combining them with a day of sightseeing.",
    category: "Nature",
  },
  {
    title: "Best Waterfalls Near Ubud",
    description:
      "A future guide to waterfalls around central Bali, including practical tips for planning a day trip.",
    category: "Nature",
  },
  {
    title: "Temples to Visit Around Ubud",
    description:
      "Explore some of the cultural and spiritual sites that can be included in an Ubud itinerary.",
    category: "Culture",
  },
  {
    title: "Ubud in 3 Days",
    description:
      "A suggested three-day itinerary combining culture, nature, food and time to relax at the villa.",
    category: "Itinerary",
  },
  {
    title: "Ubud with Kids",
    description:
      "Ideas for families looking for suitable activities and experiences around Ubud.",
    category: "Family",
  },
  {
    title: "Best Day Trips from Ubud",
    description:
      "Ideas for discovering more of Bali while using Villa Myassa as your base in Ubud.",
    category: "Day Trips",
  },
  {
    title: "Where to Eat Around Ubud",
    description:
      "A future selection of restaurants, cafés and places to eat around the Ubud area.",
    category: "Food",
  },
];

export default function UbudGuidePage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-20">
        <div className="mb-8">
          <Link
            href="/en"
            className="text-sm text-neutral-500 underline hover:text-black"
          >
            ← Back to Villa Myassa
          </Link>
        </div>

        <header className="max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500">
            Villa Myassa · Ubud · Bali
          </p>

          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            Ubud Travel Guide
          </h1>

          <p className="mt-6 text-xl leading-relaxed text-neutral-700">
            Discover Ubud and central Bali from Villa Myassa. Our guide brings
            together ideas for cultural visits, rice terraces, waterfalls,
            temples, restaurants, family activities and day trips.
          </p>

          <p className="mt-5 text-lg leading-relaxed text-neutral-600">
            Villa Myassa is located in Singakerta in the Ubud area, offering a
            peaceful base for exploring Bali while enjoying the privacy of a
            three-bedroom villa with a private pool.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
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
              className="rounded-full border border-neutral-300 px-6 py-3 font-semibold"
            >
              Check availability on Airbnb
            </a>
          </div>
        </header>

        <section className="mt-12 overflow-hidden rounded-3xl">
          <Image
            src="/photos/001-hero-piscine.jpg"
            alt="Villa Myassa private pool in Ubud Bali"
            width={1600}
            height={1000}
            priority
            className="h-auto w-full object-cover"
          />
        </section>

        <section className="mt-20">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
              Explore Ubud
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Things to discover around Villa Myassa
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-neutral-700">
              Ubud is known for its combination of Balinese culture, tropical
              landscapes, temples, art, food and wellness. Staying in the Ubud
              area makes it possible to combine sightseeing with slower moments
              at the villa.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <GuideCard
              title="Culture & Temples"
              text="Discover Balinese traditions, temples, historical sites, art and cultural attractions."
            />

            <GuideCard
              title="Rice Terraces"
              text="Explore some of the landscapes that make the Ubud region famous."
            />

            <GuideCard
              title="Waterfalls"
              text="Plan nature-focused excursions to waterfalls and tropical scenery around central Bali."
            />

            <GuideCard
              title="Food & Restaurants"
              text="Find ideas for cafés, restaurants and local dining experiences around Ubud."
            />

            <GuideCard
              title="Family Activities"
              text="Ideas for families travelling with children and looking for activities around Ubud."
            />

            <GuideCard
              title="Day Trips"
              text="Use Villa Myassa as a base for exploring more of Bali beyond Ubud."
            />
          </div>
        </section>

        <section className="mt-20 rounded-3xl bg-neutral-100 p-8 md:p-12">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
              Start here
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Popular places and experiences in the Ubud area
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-neutral-700">
              Future Villa Myassa guides will cover some of Ubud&apos;s
              best-known attractions and experiences in more detail, including
              practical information to help guests plan their stay.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Attraction
              title="Ubud Monkey Forest"
              text="One of the best-known attractions in central Ubud and a popular stop for first-time visitors."
            />

            <Attraction
              title="Tegallalang Rice Terraces"
              text="A well-known rice terrace landscape north of Ubud and a popular excursion from the area."
            />

            <Attraction
              title="Campuhan Ridge Walk"
              text="A scenic walking route close to central Ubud, popular for views and an easy outdoor activity."
            />

            <Attraction
              title="Goa Gajah"
              text="A historic site near Ubud, also known as the Elephant Cave."
            />

            <Attraction
              title="Ubud Palace"
              text="A central Ubud landmark linked to the town's royal and cultural heritage."
            />

            <Attraction
              title="Ubud Art & Markets"
              text="Ubud is known for art, crafts, galleries, markets and independent shops."
            />
          </div>
        </section>

        <section className="mt-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
            Villa Myassa Guides
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Upcoming Ubud travel guides
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-700">
            This section will grow with detailed articles designed to help
            visitors plan their stay in Ubud and discover Bali from Villa
            Myassa.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {futureGuides.map((guide) => (
              <article
                key={guide.title}
                className="rounded-3xl border border-neutral-200 p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  {guide.category}
                </p>

                <h3 className="mt-3 text-xl font-bold">{guide.title}</h3>

                <p className="mt-3 leading-relaxed text-neutral-600">
                  {guide.description}
                </p>

                <p className="mt-5 text-sm font-semibold text-neutral-400">
                  Guide coming soon
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-8 rounded-3xl border border-neutral-200 p-7 md:grid-cols-2 md:p-10">
          <div>
            <h2 className="text-3xl font-bold">
              Stay in a private villa while exploring Ubud
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-neutral-700">
              Villa Myassa offers three bedrooms, a private swimming pool,
              tropical garden, kitchen and indoor-outdoor living spaces for up
              to six guests.
            </p>

            <Link
              href="/en/3-bedroom-private-pool-villa-ubud"
              className="mt-6 inline-block font-semibold underline"
            >
              View our 3-bedroom private pool villa in Ubud →
            </Link>
          </div>

          <div className="overflow-hidden rounded-3xl">
            <Image
              src="/photos/008-jardin.jpg"
              alt="Tropical garden and pool at Villa Myassa in Ubud Bali"
              width={1000}
              height={700}
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        <section className="mt-20 rounded-3xl bg-black p-8 text-center text-white md:p-12">
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
              className="rounded-full border border-white/40 px-7 py-3 font-semibold text-white"
            >
              View on Airbnb
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}

function GuideCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-neutral-200 p-6">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 leading-relaxed text-neutral-600">{text}</p>
    </div>
  );
}

function Attraction({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-6">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 leading-relaxed text-neutral-600">{text}</p>
    </div>
  );
}
