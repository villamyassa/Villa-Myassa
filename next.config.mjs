/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true }, // on désactive l’optimiseur Next
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/fr/villa-ubud-piscine-privee",
        destination: "/fr",
        statusCode: 301,
      },
      {
        source: "/en/ubud-villa-private-pool",
        destination: "/en",
        statusCode: 301,
      },
      {
        source: "/id/vila-ubud-kolam-renang-pribadi",
        destination: "/id",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
