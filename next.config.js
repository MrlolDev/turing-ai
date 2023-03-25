/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    TURING_API: process.env.TURING_API,
  },
};

module.exports = nextConfig;
