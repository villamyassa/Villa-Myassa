import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Villa Myassa – Ubud, Bali",
  description: "Villa Myassa à Ubud, Bali — location avec piscine privée",
  alternates: {
    canonical: "https://www.villamyassa.com/",
    languages: {
      fr: "https://www.villamyassa.com/fr",
      en: "https://www.villamyassa.com/en",
      id: "https://www.villamyassa.com/id",
      zh: "https://www.villamyassa.com/zh",
    },
  },
  openGraph: {
    title: "Villa Myassa – Ubud, Bali",
    description: "Villa Myassa à Ubud, Bali — location avec piscine privée",
    url: "https://www.villamyassa.com",
    type: "website",
    images: [
      {
        url: "https://www.villamyassa.com/photos/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Villa Myassa – Ubud, Bali",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-center p-4 shadow-sm bg-white">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
            <Link href="/" className="text-3xl font-bold text-gray-900">
              Villa Myassa, <em>Ubud</em>, BALI
            </Link>
            <nav className="flex flex-wrap justify-center gap-4 mt-2 md:mt-0">
              <Link href="#gallery">Galerie</Link>
              <Link href="#features">Atouts</Link>
              <Link href="#location">Localisation</Link>
              <Link href="#contact">Contact</Link>
            </nav>
          </div>

          {/* 🌍 Drapeaux de langue (visibles et fixes dans le header) */}
          <div className="flex items-center gap-2 mt-3 md:mt-0">
            <Link href="/?lang=fr">
              <Image
                src="/flags/fr.svg"
                alt="Français"
                width={28}
                height={20}
                className="hover:scale-110 transition-transform"
              />
            </Link>
            <Link href="/?lang=en">
              <Image
                src="/flags/en.svg"
                alt="English"
                width={28}
                height={20}
                className="hover:scale-110 transition-transform"
              />
            </Link>
            <Link href="/?lang=id">
              <Image
                src="/flags/id.svg"
                alt="Bahasa Indonesia"
                width={28}
                height={20}
                className="hover:scale-110 transition-transform"
              />
            </Link>
            <Link href="/?lang=zh">
              <Image
                src="/flags/zh.svg"
                alt="中文"
                width={28}
                height={20}
                className="hover:scale-110 transition-transform"
              />
            </Link>
          </div>
        </header>

        {/* CONTENU PRINCIPAL */}
        <main className="min-h-screen">{children}</main>

        {/* FOOTER */}
        <footer className="text-center text-sm text-gray-500 py-6">
          © {new Date().getFullYear()} Villa Myassa – Ubud, Bali. Tous droits réservés.
        </footer>
      </body>
    </html>
  );
}
