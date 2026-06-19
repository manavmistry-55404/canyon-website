import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost:5900", "127.0.0.1:5900"],
  devIndicators: false,
  experimental: {
    optimizePackageImports: ["gsap"]
  }
};

export default nextConfig;
