import Image from "next/image";
import Link from "next/link";

type Lang = "fr" | "id" | "zh";

const AIRBNB_URL = "https://www.airbnb.fr/rooms/1505417552730386824";
const TRIP_URL = "https://www.trip.com/hotels/bali-hotel-detail-131766860/villa-myassa-by-balisuperhost/";
const AGODA_URL = "https://www.agoda.com/villa-myassa-by-balisuperhost/hotel/badung-id.html";
const BOOKING_URL = "https://www.booking.com/hotel/id/villa-myassa-by-balisuperhost.html";
const BESTAY_URL = "https://villamyassa.guestybookings.com/en/properties/68be42d2e105720013f38336";
const BESTAY_HERO_IMAGE =
  "https://assets.guesty.com/image/upload/listing_images_s3/production/property-photos/37f7ddd453308192cf43238e05e134856084c1d6589fdb95/68be42d2e105720013f38336/c4dd9bc1-3641-4e-7nNBl";

const routes: Record<Lang, { home: string; guide: string }> = {
  fr: { home: "/fr", guide: "/fr/guide-ubud" },
  id: { home: "/id", guide: "/id/panduan-ubud" },
  zh: { home: "/zh", guide: "/zh/ubud-guide" },
};

const copy = {
  fr: {
    back: "Retour à Villa Myassa",
    eyebrow: "Villa Myassa · Singakerta · Ubud · Bali",
    title: "Villa privée 3 chambres avec piscine à Ubud, Bali",
    intro:
      "Villa Myassa est une villa contemporaine privée à Singakerta, Ubud, avec trois chambres, une piscine privée et un cadre tropical paisible pouvant accueillir jusqu’à six personnes.",
    airbnb: "Voir les disponibilités sur Airbnb",
    viewVilla: "Voir Villa Myassa",
    cards: [
      ["3 chambres", "Lits queen-size"],
      ["Jusqu’à 6 personnes", "Familles ou groupes"],
      ["3,5 salles de bain", "Salles de bain attenantes"],
      ["Piscine privée", "Vie extérieure tropicale"],
    ],
    section1: "Une villa privée près d’Ubud pour familles et groupes",
    section1p: [
      "Villa Myassa associe une architecture contemporaine à l’atmosphère du paysage tropical balinais. Située à Singakerta, au sud du centre d’Ubud, la villa offre un environnement plus calme tout en gardant les attractions culturelles, restaurants, cafés et boutiques d’Ubud facilement accessibles.",
      "Chacune des trois chambres comprend un lit queen-size, la climatisation, une Smart TV et une salle de bain attenante. La villa est pensée pour des groupes jusqu’à six personnes recherchant l’intimité et l’espace d’une villa entière.",
    ],
    explore: "Découvrez Villa Myassa",
    exploreP: "Découvrez la piscine privée, les chambres, les espaces de vie, la cuisine et le jardin tropical de Villa Myassa.",
    poolTitle: "Piscine privée et espaces extérieurs tropicaux",
    poolP: [
      "La piscine privée est au cœur de Villa Myassa. Les voyageurs peuvent se détendre au bord de l’eau, profiter du jardin tropical ou passer du temps dans les espaces de vie extérieurs de la villa.",
      "Les espaces ouverts du salon et de la salle à manger se prolongent naturellement vers l’extérieur, créant ce mode de vie intérieur-extérieur détendu qui fait tout le charme d’une villa privée à Bali.",
    ],
    amenitiesTitle: "Équipements de la villa",
    amenities: ["Piscine privée", "3 chambres climatisées", "3,5 salles de bain", "Wi-Fi haut débit", "Smart TV", "Cuisine entièrement équipée", "Espaces de vie intérieurs et extérieurs", "Parking gratuit sur place", "Jardin tropical", "Espace repas pour six personnes"],
    staffTitle: "Personnel et services de la villa",
    staffP: "L’annonce Airbnb actuelle de Villa Myassa mentionne un villa manager dédié, un hôte sur place, un service de ménage quotidien ainsi que du personnel pour le jardin et la piscine. Des services supplémentaires comme les transferts aéroport, chauffeurs, petit-déjeuner, repas privés, massages et activités peuvent être organisés séparément, selon disponibilité et avec supplément.",
    staffCards: [["Villa Manager", "Assistance dédiée"], ["Hôte de villa", "Aide locale aux voyageurs"], ["Ménage", "Service quotidien"], ["Piscine & jardin", "Entretien régulier"]],
    feedback: "Avis voyageurs · Airbnb",
    reviews: "avis voyageurs vérifiés",
    reviewP: "Cette note est affichée sur l’annonce Airbnb de Villa Myassa et a été vérifiée en septembre 2026. Comme les notes évoluent avec les nouveaux séjours, Airbnb reste la référence pour le score le plus récent et les avis vérifiés.",
    readReviews: "Lire les avis vérifiés sur Airbnb",
    faqTitle: "Questions fréquentes",
    faqs: [
      ["Combien de personnes peuvent séjourner à Villa Myassa ?", "Villa Myassa peut accueillir jusqu’à six personnes dans trois chambres."],
      ["Villa Myassa possède-t-elle une piscine privée ?", "Oui. Villa Myassa dispose d’une piscine privée réservée exclusivement aux voyageurs séjournant dans la villa."],
      ["Où se trouve Villa Myassa ?", "Villa Myassa est située à Singakerta, dans la région d’Ubud à Bali, en Indonésie."],
      ["Villa Myassa convient-elle aux familles ?", "Oui. Avec trois chambres, une piscine privée, une cuisine et de grands espaces de vie, la villa convient aux familles et petits groupes."],
      ["Le ménage est-il inclus ?", "Oui. L’annonce Airbnb actuelle indique qu’un ménage quotidien est inclus, avec l’assistance d’un hôte et l’entretien du jardin et de la piscine."],
    ],
    ctaTitle: "Vous préparez un séjour à Ubud ?",
    ctaP: "Consultez les disponibilités, les informations de réservation et les avis voyageurs de Villa Myassa sur Airbnb ou découvrez la villa sur Bestay.",
    ctaAirbnb: "Voir Villa Myassa sur Airbnb",
    ctaBestay: "Voir Villa Myassa sur Bestay",
    guide: "Guide d’Ubud",
  },
  id: {
    back: "Kembali ke Villa Myassa",
    eyebrow: "Villa Myassa · Singakerta · Ubud · Bali",
    title: "Vila Pribadi 3 Kamar dengan Kolam Renang di Ubud, Bali",
    intro:
      "Villa Myassa adalah vila pribadi kontemporer di Singakerta, Ubud, dengan tiga kamar tidur, kolam renang pribadi, dan suasana tropis yang tenang untuk hingga enam tamu.",
    airbnb: "Cek ketersediaan di Airbnb",
    viewVilla: "Lihat Villa Myassa",
    cards: [["3 kamar tidur", "Tempat tidur queen"], ["Hingga 6 tamu", "Keluarga atau grup"], ["3,5 kamar mandi", "Kamar mandi dalam"], ["Kolam renang pribadi", "Ruang luar tropis"]],
    section1: "Vila pribadi dekat Ubud untuk keluarga dan grup",
    section1p: [
      "Villa Myassa memadukan arsitektur kontemporer dengan suasana tropis Bali. Berlokasi di Singakerta, di selatan pusat Ubud, vila ini menawarkan suasana yang lebih tenang sambil tetap mudah menjangkau tempat budaya, restoran, kafe, dan toko di Ubud.",
      "Setiap kamar tidur dilengkapi tempat tidur queen, AC, Smart TV, dan kamar mandi dalam. Vila ini dirancang untuk hingga enam tamu yang menginginkan privasi dan ruang dari sebuah vila utuh.",
    ],
    explore: "Jelajahi Villa Myassa",
    exploreP: "Lihat kolam renang pribadi, kamar tidur, ruang keluarga, dapur, dan taman tropis Villa Myassa.",
    poolTitle: "Kolam renang pribadi dan area luar tropis",
    poolP: [
      "Kolam renang pribadi menjadi pusat pengalaman di Villa Myassa. Tamu dapat bersantai di tepi kolam, menikmati taman tropis, atau menghabiskan waktu di area luar vila.",
      "Ruang keluarga dan ruang makan berkonsep terbuka menyatu secara alami dengan area luar, menciptakan gaya hidup indoor-outdoor santai yang menjadi daya tarik vila pribadi di Bali.",
    ],
    amenitiesTitle: "Fasilitas vila",
    amenities: ["Kolam renang pribadi", "3 kamar ber-AC", "3,5 kamar mandi", "Wi-Fi berkecepatan tinggi", "Smart TV", "Dapur lengkap", "Area hidup dalam dan luar ruangan", "Parkir gratis di lokasi", "Taman tropis", "Ruang makan untuk enam tamu"],
    staffTitle: "Staf dan layanan vila",
    staffP: "Daftar Airbnb Villa Myassa saat ini mencantumkan villa manager khusus, villa host, housekeeping harian, serta staf kebun dan kolam. Layanan tambahan seperti antar-jemput bandara, pengemudi, sarapan, private dining, pijat, dan aktivitas dapat diatur terpisah, tergantung ketersediaan dan biaya tambahan.",
    staffCards: [["Villa Manager", "Dukungan khusus"], ["Villa Host", "Bantuan lokal untuk tamu"], ["Housekeeping", "Layanan harian"], ["Kolam & kebun", "Perawatan rutin"]],
    feedback: "Ulasan tamu · Airbnb",
    reviews: "ulasan tamu terverifikasi",
    reviewP: "Nilai ini ditampilkan pada daftar Airbnb Villa Myassa dan diperiksa pada September 2026. Karena rating dapat berubah seiring ulasan baru, Airbnb tetap menjadi acuan untuk skor terbaru dan ulasan terverifikasi.",
    readReviews: "Baca ulasan tamu terverifikasi di Airbnb",
    faqTitle: "Pertanyaan yang sering diajukan",
    faqs: [
      ["Berapa banyak tamu yang dapat menginap di Villa Myassa?", "Villa Myassa dapat menampung hingga enam tamu dalam tiga kamar tidur."],
      ["Apakah Villa Myassa memiliki kolam renang pribadi?", "Ya. Villa Myassa memiliki kolam renang pribadi khusus untuk tamu vila."],
      ["Di mana lokasi Villa Myassa?", "Villa Myassa berada di Singakerta, kawasan Ubud, Bali, Indonesia."],
      ["Apakah Villa Myassa cocok untuk keluarga?", "Ya. Dengan tiga kamar tidur, kolam renang pribadi, dapur, dan ruang hidup yang luas, vila cocok untuk keluarga dan grup kecil."],
      ["Apakah housekeeping tersedia?", "Ya. Daftar Airbnb saat ini menyebut housekeeping harian termasuk, bersama dukungan villa host serta staf kebun dan kolam."],
    ],
    ctaTitle: "Merencanakan menginap di Ubud?",
    ctaP: "Cek ketersediaan terbaru, informasi pemesanan, dan ulasan Villa Myassa di Airbnb atau lihat vila di Bestay.",
    ctaAirbnb: "Lihat Villa Myassa di Airbnb",
    ctaBestay: "Lihat Villa Myassa di Bestay",
    guide: "Panduan Ubud",
  },
  zh: {
    back: "返回 Villa Myassa",
    eyebrow: "Villa Myassa · Singakerta · 乌布 · 巴厘岛",
    title: "巴厘岛乌布三卧室私人泳池别墅",
    intro: "Villa Myassa 位于乌布 Singakerta，是一座现代私人别墅，设有三间卧室、私人泳池和宁静的热带环境，可供最多六位宾客入住。",
    airbnb: "在 Airbnb 查看可订日期",
    viewVilla: "查看 Villa Myassa",
    cards: [["3 间卧室", "大床"], ["最多 6 位宾客", "适合家庭或小团体"], ["3.5 间浴室", "独立卫浴"], ["私人泳池", "热带户外生活"]],
    section1: "适合家庭和小团体的乌布私人别墅",
    section1p: [
      "Villa Myassa 将现代建筑与巴厘岛热带环境相结合。别墅位于乌布市中心以南的 Singakerta，环境更安静，同时可方便前往乌布的文化景点、餐厅、咖啡馆和商店。",
      "三间卧室均配有大床、空调、智能电视和独立卫浴。整栋别墅适合最多六位宾客，提供更完整的私密性与空间。",
    ],
    explore: "探索 Villa Myassa",
    exploreP: "浏览 Villa Myassa 的私人泳池、卧室、起居空间、厨房和热带花园。",
    poolTitle: "私人泳池与热带户外空间",
    poolP: [
      "私人泳池是 Villa Myassa 的核心空间。宾客可在水边放松、享受热带花园，或在别墅的户外生活区度过悠闲时光。",
      "开放式客厅和餐厅自然连接户外，营造出轻松的室内外生活方式，这也是巴厘岛私人别墅最具吸引力的体验之一。",
    ],
    amenitiesTitle: "别墅设施",
    amenities: ["私人泳池", "3 间空调卧室", "3.5 间浴室", "高速 Wi-Fi", "智能电视", "设备齐全的厨房", "室内与户外生活区", "免费停车", "热带花园", "六人用餐区"],
    staffTitle: "别墅工作人员与服务",
    staffP: "Villa Myassa 当前 Airbnb 房源信息包括专属别墅经理、别墅管家、每日客房清洁，以及花园和泳池维护人员。机场接送、司机、早餐、私人餐饮、按摩和活动等额外服务可另行安排，视供应情况而定，并可能产生额外费用。",
    staffCards: [["别墅经理", "专属协助"], ["别墅管家", "本地宾客支持"], ["客房清洁", "每日服务"], ["泳池与花园", "定期维护"]],
    feedback: "宾客评价 · Airbnb",
    reviews: "Airbnb 已验证宾客评价",
    reviewP: "该评分显示于 Villa Myassa 的 Airbnb 房源，并于 2026 年 9 月核对。由于评分会随着新评价而变化，Airbnb 是查看最新评分和已验证宾客评价的参考来源。",
    readReviews: "在 Airbnb 阅读已验证宾客评价",
    faqTitle: "常见问题",
    faqs: [
      ["Villa Myassa 最多可入住多少人？", "Villa Myassa 的三间卧室最多可容纳六位宾客。"],
      ["Villa Myassa 有私人泳池吗？", "有。Villa Myassa 设有仅供入住宾客使用的私人泳池。"],
      ["Villa Myassa 位于哪里？", "Villa Myassa 位于印度尼西亚巴厘岛乌布地区的 Singakerta。"],
      ["Villa Myassa 适合家庭入住吗？", "适合。三间卧室、私人泳池、厨房和宽敞的起居空间非常适合家庭和小团体。"],
      ["Villa Myassa 提供客房清洁吗？", "提供。当前 Airbnb 房源说明包括每日客房清洁、别墅管家支持以及花园和泳池维护。"],
    ],
    ctaTitle: "正在计划乌布之旅？",
    ctaP: "可在 Airbnb 查看 Villa Myassa 的最新可订日期、预订信息和宾客评价，或在 Bestay 查看别墅。",
    ctaAirbnb: "在 Airbnb 查看 Villa Myassa",
    ctaBestay: "在 Bestay 查看 Villa Myassa",
    guide: "乌布旅行指南",
  },
} as const;

const gallery = [
  "/photos/001-hero-piscine.jpg",
  "/photos/002-salon.jpg",
  "/photos/003-suite1.jpg",
  "/photos/004-suite2.jpg",
  "/photos/005-suite3.jpg",
  "/photos/005-cuisine.jpg",
  "/photos/008-jardin.jpg",
];

export default function LocalizedVillaSeoPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mb-6"><Link href={routes[lang].home} className="text-sm text-neutral-500 underline hover:text-black">← {t.back}</Link></div>
        <header className="max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500">{t.eyebrow}</p>
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">{t.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-neutral-700">{t.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {lang === "zh" ? (
              <>
                <a href={TRIP_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-black px-6 py-3 font-semibold text-white">在 Trip.com / 携程查看价格</a>
                <a href={AIRBNB_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-neutral-300 px-6 py-3 font-semibold">在 Airbnb 查看</a>
              </>
            ) : (
              <a href={AIRBNB_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-black px-6 py-3 font-semibold text-white">{t.airbnb}</a>
            )}
            <Link href={routes[lang].home} className="rounded-full border border-neutral-300 px-6 py-3 font-semibold">{t.viewVilla}</Link>
            <Link href={routes[lang].guide} className="rounded-full border border-neutral-300 px-6 py-3 font-semibold">{t.guide}</Link>
          </div>
        </header>

        <section className="mt-12 overflow-hidden rounded-3xl">
          <Image src={BESTAY_HERO_IMAGE} alt={t.title} width={1600} height={1000} priority unoptimized className="h-auto w-full object-cover" />
        </section>

        <section className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.cards.map(([title, text]) => <InfoCard key={title} title={title} text={text} />)}
        </section>

        {lang === "zh" && (
          <section className="mt-16 rounded-3xl border border-neutral-200 bg-neutral-50 p-7 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">中国旅客</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">中国旅客预订渠道</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-neutral-700">
              Villa Myassa 已在多家国际住宿平台上线。中国旅客可优先通过 Trip.com / 携程国际版查看实时价格与可订日期，也可使用 Agoda、Booking.com 或 Airbnb 完成预订。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={TRIP_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-black px-6 py-3 font-semibold text-white">Trip.com / 携程</a>
              <a href={AGODA_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold">Agoda</a>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold">Booking.com</a>
              <a href={AIRBNB_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold">Airbnb</a>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoCard title="适合家庭与朋友" text="3 间卧室，最多 6 位宾客" />
              <InfoCard title="私人泳池" text="独享泳池与热带花园" />
              <InfoCard title="机场接送" text="可向别墅团队另行咨询安排" />
              <InfoCard title="每日客房清洁" text="当前房源包含日常客房服务" />
            </div>
          </section>
        )}

        <TextSection title={t.section1} paragraphs={t.section1p} />

        <section className="mt-20">
          <h2 className="text-3xl font-bold md:text-4xl">{t.explore}</h2>
          <p className="mt-4 max-w-3xl text-lg text-neutral-700">{t.exploreP}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {gallery.map((src, index) => (
              <figure key={src} className={index === 0 ? "overflow-hidden rounded-3xl md:col-span-2" : "overflow-hidden rounded-3xl"}>
                <Image src={src} alt={`${t.explore} ${index + 1}`} width={1200} height={800} className="h-full w-full object-cover" />
              </figure>
            ))}
          </div>
        </section>

        <TextSection title={t.poolTitle} paragraphs={t.poolP} />

        <section className="mt-20">
          <h2 className="text-3xl font-bold md:text-4xl">{t.amenitiesTitle}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {t.amenities.map((item) => <li key={item} className="rounded-2xl border border-neutral-200 p-5 text-lg">✓ {item}</li>)}
          </ul>
        </section>

        <section className="mt-20 rounded-3xl bg-neutral-50 p-7 md:p-10">
          <h2 className="text-3xl font-bold md:text-4xl">{t.staffTitle}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-neutral-700">{t.staffP}</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{t.staffCards.map(([title, text]) => <InfoCard key={title} title={title} text={text} />)}</div>
        </section>

        <section className="mt-20 rounded-3xl border border-neutral-200 p-7 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">{t.feedback}</p>
          <div className="mt-3 flex flex-wrap items-end gap-x-4 gap-y-2"><h2 className="text-4xl font-extrabold md:text-5xl">4.92 / 5</h2><p className="pb-1 text-lg font-semibold text-neutral-700">{t.reviews}</p></div>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-700">{t.reviewP}</p>
          <a href={AIRBNB_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-black px-6 py-3 font-semibold text-white">{t.readReviews}</a>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold md:text-4xl">{t.faqTitle}</h2>
          <div className="mt-8 space-y-5">{t.faqs.map(([q, a]) => <Faq key={q} question={q} answer={a} />)}</div>
        </section>

        <section className="mt-20 rounded-3xl bg-neutral-100 p-8 text-center md:p-12">
          <h2 className="text-3xl font-bold">{t.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-700">{t.ctaP}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {lang === "zh" ? (
              <>
                <a href={TRIP_URL} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full bg-black px-7 py-3 font-semibold text-white">在 Trip.com / 携程查看价格</a>
                <a href={AIRBNB_URL} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full border border-neutral-300 bg-white px-7 py-3 font-semibold text-black">在 Airbnb 查看</a>
              </>
            ) : (
              <>
                <a href={AIRBNB_URL} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full bg-black px-7 py-3 font-semibold text-white">{t.ctaAirbnb}</a>
                <a href={BESTAY_URL} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full border border-neutral-300 bg-white px-7 py-3 font-semibold text-black">{t.ctaBestay}</a>
              </>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}

function TextSection({ title, paragraphs }: { title: string; paragraphs: readonly string[] }) {
  return <section className="mt-20"><h2 className="text-3xl font-bold md:text-4xl">{title}</h2><div className="mt-6 space-y-5 text-lg leading-relaxed text-neutral-700">{paragraphs.map((p) => <p key={p}>{p}</p>)}</div></section>;
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return <div className="rounded-2xl border border-neutral-200 bg-white p-5"><p className="text-xl font-bold">{title}</p><p className="mt-1 text-neutral-600">{text}</p></div>;
}

function Faq({ question, answer }: { question: string; answer: string }) {
  return <div className="rounded-2xl border border-neutral-200 p-6"><h3 className="text-xl font-bold">{question}</h3><p className="mt-3 leading-relaxed text-neutral-700">{answer}</p></div>;
}
