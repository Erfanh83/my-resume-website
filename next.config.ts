import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

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

  experimental: {
    /* Each locale has its own root layout, so there is no app/layout.tsx for
       a plain not-found.tsx to render inside — the dev server refuses it.
       global-not-found.tsx carries its own <html> and needs no layout. */
    globalNotFound: true,
  },
};

export default function config(phase: string): NextConfig {
  /* The site root is a redirect file that scripts/postexport.mjs writes into
     out/ after a build, so `next dev` has nothing at "/". Mirror it here, for
     the dev server only — a static export cannot carry redirects. */
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...nextConfig,
      async redirects() {
        return [{ source: "/", destination: "/en/", permanent: false }];
      },
    };
  }
  return nextConfig;
}
