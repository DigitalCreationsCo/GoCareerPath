/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  experimental: {
    clientSegmentCache: true,
  },
  serverExternalPackages: [
    "@sparticuz/chromium",
    "puppeteer-core"
  ],
};

module.exports = nextConfig;
