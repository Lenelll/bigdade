import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Set by `next upgrade --agent=security` (16.4.0 -> 16.4.5, 2026-11-08).
    agentUpgrade: "security",
  },
  images: {
    // Artwork lives in /public. Product image hosts are added in Phase 4.
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
