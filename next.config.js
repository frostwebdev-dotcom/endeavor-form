/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Compatible with @cloudflare/next-on-pages
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
