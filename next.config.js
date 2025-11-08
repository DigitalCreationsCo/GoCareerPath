/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    clientSegmentCache: true,
  },
  serverExternalPackages: [
    "@sparticuz/chromium",
    "puppeteer-core"
  ],
};

module.exports = nextConfig;
