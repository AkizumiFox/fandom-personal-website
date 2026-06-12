import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root so a stray lockfile in the home directory
    // can't make Turbopack treat ~ as the project root.
    root: __dirname
  },
  experimental: {
    // The persistent dev cache writes ~1GB to disk and thrashes
    // low-memory machines; on-demand compilation is fast enough here.
    turbopackFileSystemCacheForDev: false
  }
};

export default nextConfig;
