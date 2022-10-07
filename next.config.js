/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["media.cntraveler.com"],
  },
};

module.exports = nextConfig;
