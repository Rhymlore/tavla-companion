/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  assetPrefix: '/',
  output: 'export',
};

module.exports = nextConfig;