/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    clientSegmentCache: true,
    serverExternalPackages: [
      'md-pdf-md',
      'shiki',
    ],
  },
};

module.exports = nextConfig;