/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    clientSegmentCache: true,
  },
  serverExternalPackages: [
    "@sparticuz/chromium",
    "chrome-aws-lambda",
    "puppeteer-core"
  ],
};

module.exports = nextConfig;