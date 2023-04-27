/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_RESOUCE_URL: process.env.NEXT_RESOUCE_URL,
  },
};

module.exports = nextConfig;
