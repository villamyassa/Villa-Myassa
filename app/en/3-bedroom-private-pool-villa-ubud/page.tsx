import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "3-Bedroom Private Pool Villa in Ubud, Bali | Villa Myassa",
  description:
    "Discover Villa Myassa, a private 3-bedroom villa with pool in Singakerta, Ubud, Bali. Sleeps up to 6 guests with 3.5 bathrooms, tropical garden, air conditioning, Wi-Fi and fully equipped kitchen.",
  alternates: {
    canonical:
      "https://www.villamyassa.com/en/3-bedroom-private-pool-villa-ubud",
  },
};

const AIRBNB_URL =
  "https://www.airbnb.fr/rooms/1505417552730386824";

const gallery = [
  {
    src: "/photos/001-hero-piscine.jpg",
    alt: "Villa Myassa private swimming pool in Ubud, Bali",
  },
  {
    src: "/photos/002-salon.jpg",
    alt: "Villa Myassa contemporary living room in Ubud",
  },
  {
    src: "/photos/003-suite1.jpg",
    alt: "Bedroom at Villa Myassa, 3-bedroom villa in Ubud",
  },
  {
    src: "/photos/004-suite2.jpg",
    alt: "Second bedroom at Villa Myassa in Singakerta, Ubud",
  },
  {
    src: "/photos/005-suite3.jpg",
    alt: "Third bedroom at Villa Myassa private villa in Bali",
  },
  {
    src: "/photos/005-cuisine.jpg",
    alt: "Fully equipped kitchen at Villa Myassa in Ubud",
  },
  {
    src: "/photos/008-jardin.jpg",
    alt: "Tropical garden at Villa Myassa in Ubud, Bali",
  },
  {
    src: "/photos/006-facade-nuit.jpg",
    alt: "Villa Myassa exterior at night in Ubud, Bali",
  },
];

export default function PrivatePoolVillaUbudPage() {
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
            3-Bedroom Private Pool Villa in Ubud, Bali
          </h1>

          <p className="mt-6 text-xl leading-relaxed text-neutral-700">
            Villa Myassa is a contemporary private villa in Singakerta, Ubud,
            offering three bedrooms, a private swimming pool and a peaceful
            tropical setting for up to six guests.
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
              href="/en"
              className="rounded-full border border-neutral-300 px-6 py-3 font-semibold"
            >
              View Villa Myassa
            </Link>
          </div>
        </header>

        <section className="mt-12 overflow-hidden rounded-3xl">
          <Image
            src="/photos/001-hero-piscine.jpg"
            alt="Villa Myassa private pool villa in Ubud, Bali"
            width={1600}
            height={1000}
            priority
            className="h-auto w-full object-cover"
          />
        </section>

        <section className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard title="3 Bedrooms" text="Queen-size beds" />
          <InfoCard title="Up to 6 Guests" text="Families or groups" />
          <InfoCard title="3.5 Bathrooms" text="En-suite bathrooms" />
          <InfoCard title="Private Pool" text="Tropical outdoor living" />
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold md:text-4xl">
            A private villa near Ubud for families and groups
          </h2>

          <div className="mt-6 space-y-5 text-lg leading-relaxed text-neutral-700">
            <p>
              Villa Myassa combines contemporary architecture with the
              atmosphere of Bali&apos;s tropical landscape. Located in
              Singakerta, south of central Ubud, the villa offers a quieter base
              while keeping Ubud&apos;s cultural attractions, restaurants, cafés
              and shops within easy reach.
            </p>

            <p>
              Each of the three bedrooms includes a queen-size bed, air
              conditioning, Smart TV and an en-suite bathroom. The villa is
              designed for groups of up to six guests who want the privacy and
              space of an entire villa.
            </p>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold md:text-4xl">
            Explore Villa Myassa
          </h2>

          <p className="mt-4 max-w-3xl text-lg text-neutral-700">
            Discover the private pool, bedrooms, living spaces, kitchen and
            tropical garden of Villa Myassa.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {gallery.map((image, index) => (
              <figure
                key={image.src}
                className={
                  index === 0
                    ? "overflow-hidden rounded-3xl md:col-span-2"
                    : "overflow-hidden rounded-3xl"
                }
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover"
                />
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold md:text-4xl">
            Private pool and tropical outdoor spaces
          </h2>

          <div className="mt-6 space-y-5 text-lg leading-relaxed text-neutral-700">
            <p>
              The private swimming pool is at the heart of Villa Myassa. Guests
              can relax beside the water, enjoy the tropical garden or spend
              time in the villa&apos;s outdoor living areas.
            </p>

            <p>
              The open-plan living and dining spaces connect naturally with the
              outdoors, creating the relaxed indoor-outdoor lifestyle that makes
              a private Bali villa especially appealing.
            </p>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold md:text-4xl">Villa amenities</h2>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Private swimming pool",
              "3 air-conditioned bedrooms",
              "3.5 bathrooms",
              "High-speed Wi-Fi",
              "Smart TVs",
              "Fully equipped kitchen",
              "Indoor and outdoor living areas",
              "Free on-site parking",
              "Tropical garden",
              "Dining space for six guests",
            ].map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-neutral-200 p-5 text-lg"
              >
                ✓ {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold md:text-4xl">
            Frequently asked questions
          </h2>

          <div className="mt-8 space-y-5">
            <Faq
              question="How many guests can stay at Villa Myassa?"
              answer="Villa Myassa accommodates up to six guests in three bedrooms."
            />

            <Faq
              question="Does Villa Myassa have a private pool?"
              answer="Yes. Villa Myassa has a private swimming pool reserved exclusively for guests staying at the villa."
            />

            <Faq
              question="Where is Villa Myassa located?"
              answer="Villa Myassa is located in Singakerta, in the Ubud area of Bali, Indonesia."
            />

            <Faq
              question="Is Villa Myassa suitable for families?"
              answer="Yes. With three bedrooms, a private pool, kitchen and spacious living areas, the villa is suitable for families and small groups."
            />
          </div>
        </section>

        <section className="mt-20 rounded-3xl bg-neutral-100 p-8 text-center md:p-12">
          <h2 className="text-3xl font-bold">Planning a stay in Ubud?</h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-700">
            Check Villa Myassa&apos;s current availability and guest information
            on Airbnb.
          </p>

          <a
            href={AIRBNB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-block rounded-full bg-black px-7 py-3 font-semibold text-white"
          >
            View Villa Myassa on Airbnb
          </a>
        </section>
      </section>
    </main>
  );
}

function InfoCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-5">
      <p className="text-xl font-bold">{title}</p>
      <p className="mt-1 text-neutral-600">{text}</p>
    </div>
  );
}

function Faq({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-6">
      <h3 className="text-xl font-bold">{question}</h3>
      <p className="mt-3 leading-relaxed text-neutral-700">{answer}</p>
    </div>
  );
}
