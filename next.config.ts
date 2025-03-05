import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [], // Add any external domains here if needed
    unoptimized: true // For local images in public folder
  }
};

export default nextConfig;
