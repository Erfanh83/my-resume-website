/**
 * next/link and next/image prefix basePath on their own, but a plain <a> does
 * not — and the language switch and resume link are deliberately plain anchors
 * so they trigger a full document load. Those have to be prefixed by hand.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBase(path: string): string {
  if (!basePath) return path;
  return path === "/" ? `${basePath}/` : `${basePath}${path}`;
}

/**
 * Absolute origin the site is published under. Metadata (canonical links,
 * hreflang, Open Graph) has to be absolute to be useful to a crawler, and a
 * relative path starting with "/" would drop the sub-path GitHub Pages serves
 * this repo from.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://erfanh83.github.io/my-resume-website/";
