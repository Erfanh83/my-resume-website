import type { NextConfig } from "next";

/**
 * GitHub Pages serves this repo under /my-resume-website/, so the build has to
 * carry that prefix. Set NEXT_PUBLIC_BASE_PATH to "" (or drop it) to build for
 * a host that serves from the root instead.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /* Static HTML in out/ — GitHub Pages runs no Node process. */
  output: "export",
  trailingSlash: true,

  basePath,
  assetPrefix: basePath || undefined,

  images: {
    /* The optimizer needs a server. The photographs are pre-compressed to
       WebP by `npm run images` instead — see scripts/images.mjs. */
    unoptimized: true,
  },
};

export default nextConfig;
