/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    clientSegmentCache: true,
  },
  serverExternalPackages: [
    "@sparticuz/chromium",
    "@sparticuz/chromium-min",
    "puppeteer-core"
  ],
};

module.exports = nextConfig;
