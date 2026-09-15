import { withBase } from "@/lib/paths";

/* Root-level 404. Lives outside [locale], so it stays language-neutral and
   carries its own styles — the theme script and stylesheet belong to the
   locale tree and never run here. */
export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <style>{`
          :root { color-scheme: light dark; --nf-bg:#f3f6f2; --nf-fg:#0c1410; --nf-mut:#4f5f55; --nf-ac:#00854a; --nf-on:#ffffff; }
          @media (prefers-color-scheme: dark) {
            :root { --nf-bg:#050905; --nf-fg:#e8f0e8; --nf-mut:#93a593; --nf-ac:#00ff88; --nf-on:#050905; }
          }
          body { margin:0; min-height:100vh; display:grid; place-items:center; padding:1.5rem;
                 background:var(--nf-bg); color:var(--nf-fg);
                 font-family:system-ui,-apple-system,"Segoe UI",sans-serif; }
          main { text-align:center; max-width:30rem; }
          .code { color:var(--nf-ac); letter-spacing:.18em; font-size:.75rem; margin:0; }
          h1 { font-size:clamp(1.75rem,6vw,2.5rem); margin:1rem 0; line-height:1.15; }
          p.sub { color:var(--nf-mut); margin:0 0 2rem; }
          a.home { display:inline-block; background:var(--nf-ac); color:var(--nf-on);
                   padding:.85rem 1.6rem; border-radius:999px; font-weight:600; text-decoration:none; }
        `}</style>
      </head>
      <body>
        <main>
          <p className="code">404</p>
          <h1>This page does not exist.</h1>
          <p className="sub">این صفحه وجود ندارد.</p>
          <a href={withBase("/en/")} className="home">
            Go home / صفحه اصلی
          </a>
        </main>
      </body>
    </html>
  );
}
