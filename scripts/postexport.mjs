// Two things the static export cannot produce on its own.
//
// 1. out/index.html — the site root. A server redirect (`redirects()` in
//    next.config) needs a server, so the entry point is a real HTML file that
//    forwards to the default locale. It also carries the hreflang pair, so a
//    crawler landing on the root still finds both languages.
// 2. out/.nojekyll — without it GitHub Pages runs Jekyll, which drops every
//    directory beginning with an underscore. That would delete _next/ and the
//    whole site would load unstyled.
import { writeFile, access } from "node:fs/promises";
import { join } from "node:path";

const OUT = "out";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const DEFAULT_LOCALE = "en";
const target = `${BASE}/${DEFAULT_LOCALE}/`;

await access(OUT).catch(() => {
  throw new Error(`${OUT}/ not found — run \`next build\` first.`);
});

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Mohammad Erfan Hamzei — Full-Stack Developer</title>
<link rel="canonical" href="${target}">
<link rel="alternate" hreflang="en" href="${BASE}/en/">
<link rel="alternate" hreflang="fa" href="${BASE}/fa/">
<link rel="alternate" hreflang="x-default" href="${target}">
<meta http-equiv="refresh" content="0; url=${target}">
<script>location.replace(${JSON.stringify(target)});</script>
<style>
  :root{color-scheme:light dark}
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#050905;color:#93a593;
       font-family:system-ui,sans-serif}
  @media (prefers-color-scheme:light){body{background:#f3f6f2;color:#4f5f55}}
  a{color:#00854a}
  @media (prefers-color-scheme:dark){a{color:#00ff88}}
</style>
</head>
<body>
<p>Redirecting to <a href="${target}">the portfolio</a>&hellip;</p>
</body>
</html>
`;

await writeFile(join(OUT, "index.html"), html, "utf8");
await writeFile(join(OUT, ".nojekyll"), "", "utf8");
console.log(`postexport: wrote ${OUT}/index.html -> ${target} and ${OUT}/.nojekyll`);
