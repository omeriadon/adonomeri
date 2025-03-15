/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Good to keep for catching bugs
  experimental: {
    // optimizeCss: true, // Already in use, works fine
    optimizePackageImports: ['react-icons', 'framer-motion', 'bootstrap-icons'], // Speeds up imports
  },
};

module.exports = nextConfig;