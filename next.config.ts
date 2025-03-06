import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [], // Add any external domains here if needed
    unoptimized: false, // Enable image optimization
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Optimize for common screen sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Optimize thumbnail sizes
  },
  // Enable compression
  compress: true,
};

export default nextConfig;
