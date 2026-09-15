import type { Content } from "@/lib/content";
import { localeNames, locales, type Locale } from "@/lib/i18n";
import { withBase } from "@/lib/paths";

export function SiteFooter({ c, locale }: { c: Content; locale: Locale }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-10">
      <div className="shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate">
            © {year} {c.footer.rights}
          </p>
          <p className="mt-1 text-[0.8rem] text-slate-dim">{c.footer.builtWith}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          {/* Both languages stay reachable from the footer, crawler included. */}
          <div className="flex items-center gap-1">
            {locales.map((l) => (
              <a
                key={l}
                href={withBase(`/${l}`)}
                hrefLang={l}
                aria-current={l === locale ? "true" : undefined}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors duration-200 ${
                  l === locale ? "text-signal" : "text-slate-dim hover:text-chalk"
                }`}
              >
                {localeNames[l].native}
              </a>
            ))}
          </div>

          <a
            href="mailto:ehamzei40@gmail.com"
            className="text-sm text-slate-dim transition-colors duration-200 hover:text-signal"
          >
            ehamzei40@gmail.com
          </a>

          <a
            href="#home"
            className="inline-flex items-center gap-2 text-sm text-slate-dim transition-colors duration-200 hover:text-signal"
          >
            {c.footer.backToTop}
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
