import type { NextConfig } from "next";

/**
 * Default target is Vercel, which runs the Next server — so no static export,
 * and `next/image` keeps its real optimisation pipeline.
 *
 * The sub-path options below stay opt-in via env var so the same config can
 * also produce a static bundle for a sub-path host (GitHub Pages) without
 * being edited:
 *
 *   NEXT_PUBLIC_BASE_PATH=/repo STATIC_EXPORT=1 npm run build
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        // Emits ./out as plain HTML/CSS/JS. Every route already prerenders, so
        // nothing needs changing to satisfy this.
        output: "export" as const,
        // No server to resize on request in a static bundle.
        images: {
          unoptimized: true,
          remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
        },
        // A static host resolves /about to /about/index.html; without this the
        // export emits /about.html and internal links 404.
        trailingSlash: true,
      }
    : {}),

  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
