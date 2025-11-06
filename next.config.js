/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    clientSegmentCache: true,
  },
  // transpilePackages: ['md-pdf-md', 'puppeteer', 'puppeteer-core'],
};

module.exports = nextConfig;
