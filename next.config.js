/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true, // Comment out or remove
    optimizePackageImports: ['react-icons', 'framer-motion', 'bootstrap-icons'],
  },
};

module.exports = nextConfig;