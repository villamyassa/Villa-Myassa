import Image from "next/image";
import Link from "next/link";

type Lang = "fr" | "id" | "zh";

const AIRBNB_URL = "https://www.airbnb.fr/rooms/1505417552730386824";

const routes: Record<Lang, { home: string; villa: string }> = {
  fr: { home: "/fr", villa: "/fr/villa-3-chambres-piscine-privee-ubud" },
  id: { home: "/id", villa: "/id/vila-3-kamar-kolam-pribadi-ubud" },
  zh: { home: "/zh", villa: "/zh/3-bedroom-private-pool-villa-ubud" },
};

const copy = {
  fr: {
    back: "Retour à Villa Myassa",
    eyebrow: "Villa Myassa · Ubud · Bali",
    title: "Guide d’Ubud",
    intro: "Découvrez Ubud et le centre de Bali depuis Villa Myassa : temples, rizières, cascades, Monkey Forest, restaurants, activités en famille et aventures en quad.",
    intro2: "Villa Myassa se trouve à Singakerta, dans la région d’Ubud, et constitue une base paisible pour explorer Bali tout en profitant de l’intimité d’une villa trois chambres avec piscine privée.",
    discoverVilla: "Découvrir Villa Myassa",
    airbnb: "Voir les disponibilités sur Airbnb",
    exploreEyebrow: "Explorer Ubud",
    exploreTitle: "Que découvrir autour de Villa Myassa",
    exploreP: "Ubud réunit culture balinaise, paysages tropicaux, temples, aventure, gastronomie et nature.",
    discovery: [
      ["Culture & Temples", "Découvrez les traditions balinaises, temples, sites historiques, art et attractions culturelles autour d’Ubud.", "/ubud-guide/culture-temples.jpg"],
      ["Rizières & paysages ruraux", "Explorez les rizières de Bali, les villages traditionnels et la campagne tropicale autour d’Ubud.", "/ubud-guide/9957A069-7B9D-4533-B989-1FF659AA19AC.png"],
      ["Cascades", "Préparez des excursions nature vers les cascades et paysages tropicaux du centre de Bali.", "/ubud-guide/waterfalls.jpg"],
      ["Restaurants & gastronomie", "Trouvez des idées de cafés, restaurants et expériences culinaires locales autour d’Ubud.", "/ubud-guide/food-restaurants.jpg"],
      ["Activités en famille", "Des idées pour les familles voyageant avec des enfants et recherchant des activités autour d’Ubud.", "/ubud-guide/family-activities.jpg"],
      ["Aventures ATV & Quad", "Partez en quad à travers rizières, pistes de jungle, rivières et villages traditionnels autour d’Ubud.", "/ubud-guide/atv-quad-ubud.jpg"],
    ],
    start: "À voir en priorité",
    popularTitle: "Lieux et expériences populaires dans la région d’Ubud",
    popularP: "Découvrez quelques-uns des sites et expériences les plus connus d’Ubud pour commencer à organiser votre séjour.",
    attractions: [
      ["Ubud Monkey Forest", "L’une des attractions les plus connues du centre d’Ubud et une étape populaire lors d’un premier séjour.", "/ubud-guide/monkey-forest-ubud.jpg"],
      ["Rizières de Tegallalang", "Le célèbre paysage de rizières en terrasses au nord d’Ubud, entouré de palmiers et de végétation tropicale.", "/ubud-guide/tegallalang-rice-terraces.jpg"],
      ["Campuhan Ridge Walk", "Une promenade panoramique près du centre d’Ubud, appréciée pour ses paysages tropicaux et ses vues dégagées.", "/ubud-guide/campuhan-ridge-walk.jpg"],
      ["Goa Gajah", "Un site historique, archéologique et religieux près d’Ubud, également appelé la Grotte de l’Éléphant.", "/ubud-guide/goa-gajah.jpg"],
      ["Palais d’Ubud", "Un monument emblématique du centre d’Ubud lié à l’histoire royale et culturelle de la ville.", "/ubud-guide/ubud-palace.jpg"],
      ["Art & marchés d’Ubud", "Découvrez l’art, l’artisanat, les galeries, les marchés et boutiques indépendantes d’Ubud.", "/ubud-guide/ubud-art-markets.jpg"],
    ],
    stayTitle: "Séjournez dans une villa privée tout en explorant Ubud",
    stayP: "Villa Myassa propose trois chambres, une piscine privée, un jardin tropical, une cuisine et des espaces de vie intérieurs-extérieurs pour jusqu’à six personnes.",
    viewVilla: "Voir notre villa 3 chambres avec piscine privée à Ubud",
    ctaTitle: "Vous préparez votre séjour à Ubud ?",
    ctaP: "Découvrez Villa Myassa et consultez les disponibilités actuelles pour votre séjour à Bali.",
    ctaVilla: "Découvrir la villa",
    ctaAirbnb: "Voir sur Airbnb",
  },
  id: {
    back: "Kembali ke Villa Myassa",
    eyebrow: "Villa Myassa · Ubud · Bali",
    title: "Panduan Wisata Ubud",
    intro: "Jelajahi Ubud dan Bali tengah dari Villa Myassa: pura, sawah terasering, air terjun, Monkey Forest, restoran, aktivitas keluarga, dan petualangan ATV.",
    intro2: "Villa Myassa berada di Singakerta, kawasan Ubud, dan menjadi tempat menginap yang tenang untuk menjelajahi Bali sambil menikmati privasi vila tiga kamar dengan kolam renang pribadi.",
    discoverVilla: "Jelajahi Villa Myassa",
    airbnb: "Cek ketersediaan di Airbnb",
    exploreEyebrow: "Jelajahi Ubud",
    exploreTitle: "Hal yang dapat ditemukan di sekitar Villa Myassa",
    exploreP: "Ubud memadukan budaya Bali, lanskap tropis, pura, petualangan, kuliner, dan alam.",
    discovery: [
      ["Budaya & Pura", "Temukan tradisi Bali, pura, situs bersejarah, seni, dan atraksi budaya di sekitar Ubud.", "/ubud-guide/culture-temples.jpg"],
      ["Sawah & lanskap pedesaan", "Jelajahi sawah Bali, desa tradisional, dan pedesaan tropis di sekitar Ubud.", "/ubud-guide/9957A069-7B9D-4533-B989-1FF659AA19AC.png"],
      ["Air terjun", "Rencanakan perjalanan ke air terjun dan pemandangan tropis di Bali tengah.", "/ubud-guide/waterfalls.jpg"],
      ["Kuliner & restoran", "Temukan ide kafe, restoran, dan pengalaman kuliner lokal di sekitar Ubud.", "/ubud-guide/food-restaurants.jpg"],
      ["Aktivitas keluarga", "Pilihan aktivitas untuk keluarga yang bepergian dengan anak-anak di sekitar Ubud.", "/ubud-guide/family-activities.jpg"],
      ["Petualangan ATV & Quad", "Jelajahi sawah, jalur hutan, sungai, dan desa tradisional dengan tur ATV di sekitar Ubud.", "/ubud-guide/atv-quad-ubud.jpg"],
    ],
    start: "Mulai dari sini",
    popularTitle: "Tempat dan pengalaman populer di kawasan Ubud",
    popularP: "Temukan beberapa atraksi dan pengalaman paling terkenal di Ubud untuk mulai merencanakan perjalanan Anda.",
    attractions: [
      ["Ubud Monkey Forest", "Salah satu atraksi paling terkenal di pusat Ubud dan populer bagi pengunjung pertama kali.", "/ubud-guide/monkey-forest-ubud.jpg"],
      ["Tegallalang Rice Terraces", "Lanskap sawah terasering terkenal di utara Ubud, dikelilingi palem dan vegetasi tropis.", "/ubud-guide/tegallalang-rice-terraces.jpg"],
      ["Campuhan Ridge Walk", "Jalur jalan kaki indah dekat pusat Ubud dengan pemandangan tropis dan panorama terbuka.", "/ubud-guide/campuhan-ridge-walk.jpg"],
      ["Goa Gajah", "Situs sejarah, arkeologi, dan keagamaan dekat Ubud yang juga dikenal sebagai Elephant Cave.", "/ubud-guide/goa-gajah.jpg"],
      ["Ubud Palace", "Landmark di pusat Ubud yang berkaitan dengan sejarah kerajaan dan budaya kota.", "/ubud-guide/ubud-palace.jpg"],
      ["Seni & Pasar Ubud", "Jelajahi seni, kerajinan, galeri, pasar, dan toko independen di Ubud.", "/ubud-guide/ubud-art-markets.jpg"],
    ],
    stayTitle: "Menginap di vila pribadi sambil menjelajahi Ubud",
    stayP: "Villa Myassa memiliki tiga kamar tidur, kolam renang pribadi, taman tropis, dapur, dan ruang hidup indoor-outdoor untuk hingga enam tamu.",
    viewVilla: "Lihat vila 3 kamar dengan kolam renang pribadi di Ubud",
    ctaTitle: "Merencanakan menginap di Ubud?",
    ctaP: "Jelajahi Villa Myassa dan cek ketersediaan terbaru untuk perjalanan Anda ke Bali.",
    ctaVilla: "Jelajahi vila",
    ctaAirbnb: "Lihat di Airbnb",
  },
  zh: {
    back: "返回 Villa Myassa",
    eyebrow: "Villa Myassa · 乌布 · 巴厘岛",
    title: "乌布旅行指南",
    intro: "从 Villa Myassa 出发探索乌布和巴厘岛中部：寺庙、梯田、瀑布、猴林、餐厅、家庭活动与 ATV 探险。",
    intro2: "Villa Myassa 位于乌布地区的 Singakerta，是探索巴厘岛的宁静住宿基地，同时可享受三卧室私人泳池别墅的私密空间。",
    discoverVilla: "探索 Villa Myassa",
    airbnb: "在 Airbnb 查看可订日期",
    exploreEyebrow: "探索乌布",
    exploreTitle: "Villa Myassa 周边值得体验的内容",
    exploreP: "乌布融合了巴厘文化、热带风景、寺庙、冒险、美食与自然。",
    discovery: [
      ["文化与寺庙", "探索乌布周边的巴厘传统、寺庙、历史遗址、艺术与文化景点。", "/ubud-guide/culture-temples.jpg"],
      ["梯田与乡村风景", "探索巴厘岛的稻田、传统村落和乌布周边的热带乡村。", "/ubud-guide/9957A069-7B9D-4533-B989-1FF659AA19AC.png"],
      ["瀑布", "安排前往巴厘岛中部瀑布和热带自然风景的行程。", "/ubud-guide/waterfalls.jpg"],
      ["美食与餐厅", "寻找乌布周边的咖啡馆、餐厅和当地用餐体验。", "/ubud-guide/food-restaurants.jpg"],
      ["家庭活动", "适合带孩子家庭的乌布周边活动灵感。", "/ubud-guide/family-activities.jpg"],
      ["ATV 与四轮摩托探险", "穿越稻田、丛林小径、河流和传统村落，体验乌布周边的越野行程。", "/ubud-guide/atv-quad-ubud.jpg"],
    ],
    start: "从这里开始",
    popularTitle: "乌布地区热门地点与体验",
    popularP: "了解乌布一些最知名的景点和体验，开始规划您的行程。",
    attractions: [
      ["乌布猴林", "乌布市中心最知名的景点之一，也是首次到访者的热门选择。", "/ubud-guide/monkey-forest-ubud.jpg"],
      ["德格拉朗梯田", "乌布北部著名的梯田景观，周围环绕着棕榈树和热带植被。", "/ubud-guide/tegallalang-rice-terraces.jpg"],
      ["Campuhan Ridge Walk", "靠近乌布市中心的景观步道，以热带风光和开阔视野闻名。", "/ubud-guide/campuhan-ridge-walk.jpg"],
      ["象窟 Goa Gajah", "乌布附近重要的历史、考古和宗教遗址，也被称为 Elephant Cave。", "/ubud-guide/goa-gajah.jpg"],
      ["乌布皇宫", "乌布市中心与当地王室和文化历史相关的重要地标。", "/ubud-guide/ubud-palace.jpg"],
      ["乌布艺术与市场", "探索乌布的艺术、手工艺、画廊、市场和独立商店。", "/ubud-guide/ubud-art-markets.jpg"],
    ],
    stayTitle: "入住私人别墅，轻松探索乌布",
    stayP: "Villa Myassa 设有三间卧室、私人泳池、热带花园、厨房和室内外生活空间，可供最多六位宾客入住。",
    viewVilla: "查看乌布三卧室私人泳池别墅",
    ctaTitle: "正在计划乌布之旅？",
    ctaP: "探索 Villa Myassa，并查看您的巴厘岛之旅当前可订日期。",
    ctaVilla: "探索别墅",
    ctaAirbnb: "在 Airbnb 查看",
  },
} as const;

export default function LocalizedUbudGuidePage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/ubud-guide/hero-ubud-bali.png" alt={t.title} fill priority className="object-cover object-center" />
          <div className="absolute inset-0 bg-black/45 md:bg-gradient-to-r md:from-black/35 md:via-black/15 md:to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-8 text-white md:px-4 md:py-10">
          <Link href={routes[lang].home} className="text-sm font-bold text-white underline decoration-white/80 underline-offset-4 drop-shadow-md">← {t.back}</Link>
          <div className="mt-5 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-white drop-shadow-md">{t.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] text-white drop-shadow-lg sm:text-5xl md:text-7xl">{t.title}</h1>
            <p className="mt-5 text-lg font-bold leading-relaxed text-white drop-shadow-md md:text-xl">{t.intro}</p>
            <p className="mt-3 max-w-xl font-semibold leading-relaxed text-white drop-shadow-md">{t.intro2}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={routes[lang].villa} className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-black shadow-md transition hover:bg-neutral-100 sm:w-auto">{t.discoverVilla}</Link>
              <a href={AIRBNB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center rounded-full border border-white/70 bg-black/55 px-6 py-3 text-center font-semibold text-white shadow-md backdrop-blur-sm transition hover:bg-black/70 sm:w-auto">{t.airbnb}</a>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <section>
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">{t.exploreEyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">{t.exploreTitle}</h2>
          <p className="mt-3 max-w-4xl text-lg text-neutral-600">{t.exploreP}</p>
          <Cards items={t.discovery} />
        </section>

        <section className="mt-20 rounded-[2rem] bg-neutral-100 p-6 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">{t.start}</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">{t.popularTitle}</h2>
          <p className="mt-4 max-w-4xl text-lg text-neutral-600">{t.popularP}</p>
          <Cards items={t.attractions} />
        </section>

        <section className="mt-20 grid overflow-hidden rounded-3xl border border-neutral-200 md:grid-cols-2">
          <div className="relative min-h-[320px]"><Image src="/photos/008-jardin.jpg" alt="Villa Myassa" fill className="object-cover" /></div>
          <div className="flex flex-col justify-center p-8 md:p-12">
            <h2 className="text-3xl font-bold">{t.stayTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-neutral-600">{t.stayP}</p>
            <Link href={routes[lang].villa} className="mt-6 font-semibold underline">{t.viewVilla} →</Link>
            {lang === "zh" && (
              <Link href="/zh/family-villa-ubud" className="mt-3 font-semibold underline">
                查看适合家庭与朋友的乌布三卧室别墅 →
              </Link>
            )}
          </div>
        </section>

        <section className="relative mt-20 overflow-hidden rounded-3xl bg-black px-6 py-12 text-center text-white md:px-12">
          <h2 className="text-3xl font-bold">{t.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-300">{t.ctaP}</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link href={routes[lang].villa} className="rounded-full bg-white px-7 py-3 font-semibold text-black">{t.ctaVilla}</Link>
            <a href={AIRBNB_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/40 px-7 py-3 font-semibold">{t.ctaAirbnb}</a>
          </div>
        </section>
      </div>
    </main>
  );
}

function Cards({ items }: { items: readonly (readonly [string, string, string])[] }) {
  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map(([title, description, image]) => (
        <article key={title} className="overflow-hidden rounded-3xl border border-neutral-200 bg-white">
          <div className="relative aspect-[16/8]"><Image src={image} alt={title} fill className="object-cover" /></div>
          <div className="p-5"><h3 className="text-xl font-bold">{title}</h3><p className="mt-2 leading-relaxed text-neutral-600">{description}</p></div>
        </article>
      ))}
    </div>
  );
}
