import "./globals.css";
export const metadata = {
  title: "Villa Myassa — Ubud, Bali",
  description: "Villa contemporaine avec piscine privée au cœur d’Ubud. 3 chambres, 3,5 sdb. Réservez vos dates."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
