/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["lexica-serve-encoded-images2.sharif.workers.dev"],
  },
  async redirects() {
    return [
      {
        source: "/discord",
        destination: "https://discord.gg/zxNMfJWgVj",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
