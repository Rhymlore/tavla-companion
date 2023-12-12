/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
      loader: 'default',
      path: '/',
  },
  assetPrefix: '/',
  output: 'export',
};

module.exports = nextConfig;