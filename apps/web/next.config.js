/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["@prisma/client", "bycrptjs"],
  },
  reactStrictMode: true,
  transpilePackages: ["ui"],
  images: {
    domains: ["localhost", "picsum.photos", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
