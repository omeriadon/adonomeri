/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable optimizations
  swcMinify: true,
  
  // Optimize font loading
  optimizeFonts: true,

  // Configure PostCSS optimizations
  experimental: {
    // Optimize CSS modules
    optimizeCss: true,
    // Faster script loading
    optimizePackageImports: ['react-icons', 'framer-motion', 'bootstrap-icons']
  }
}

module.exports = nextConfig
