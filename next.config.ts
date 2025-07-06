import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@yz13/ui"],
  compress: true,
  experimental: {
    inlineCss: true
  }
};

export default nextConfig;
