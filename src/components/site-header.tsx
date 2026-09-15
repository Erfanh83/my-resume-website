"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Content } from "@/lib/content";
import { localeNames, locales, type Locale } from "@/lib/i18n";
import { withBase } from "@/lib/paths";
import { ThemeToggle } from "./theme-toggle";

const SECTION_IDS = ["work", "experience", "projects", "stack", "about", "contact"] as const;

export function SiteHeader({ locale, c }: { locale: Locale; c: Content }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const lastY = useRef(0);
  const pathname = usePathname();

  /* Scroll state: solid background, reading progress, and hide-on-scroll-down
     so the header gets out of the way while reading and returns on intent. */
  useEffect(() => {
    let frame = 0;

    const read = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;

      setScrolled(y > 16);
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
      setHidden(y > 320 && y > lastY.current);
      lastY.current = y;
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Active section: whichever heading last passed under the header.
     Measured directly rather than through observer margins, which drift
     when sections differ wildly in height. */
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      const line = 140;
      let current = "";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Lock the page behind the mobile sheet. */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  /* Jump to the top without leaving the page — the wordmark is an anchor,
     not a route change, so it must not reload the document. */
  const toTop = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
    history.replaceState(null, "", window.location.pathname);
  }, []);

  const links = SECTION_IDS.map((id) => ({ id, label: c.nav[id] }));

  return (
    <>
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:start-4 focus-visible:z-[70] focus-visible:rounded-full focus-visible:bg-signal focus-visible:px-5 focus-visible:py-2.5 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-ink"
      >
        {c.nav.skipToContent}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled || menuOpen
            ? "border-b border-line bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-3 sm:h-20 sm:gap-6">
          {/* Wordmark — always Latin, in the Latin face, on both locales. */}
          <a
            href="#"
            onClick={toTop}
            aria-label={c.nav.backToTop}
            className="group flex shrink-0 items-center gap-2.5"
          >
            <span className="latin relative flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-ink-2 font-display text-[0.8rem] font-extrabold tracking-tight text-signal transition-colors duration-300 group-hover:border-signal/45">
              EH
            </span>
            <span className="hidden font-display text-[0.95rem] font-bold tracking-tight sm:block ltr:tracking-[0.02em]">
              {c.nav.wordmark}
            </span>
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden items-center lg:flex"
            aria-label={c.nav.sectionsLabel}
          >
            {links.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-sm transition-colors duration-200 ${
                    isActive ? "text-signal" : "text-slate hover:text-chalk"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-center bg-signal transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ThemeToggle toLight={c.nav.themeToLight} toDark={c.nav.themeToDark} />

            <LocaleSwitch locale={locale} pathname={pathname} label={c.nav.languageLabel} />

            <a
              href={withBase("/resume.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-signal px-4 py-2 text-sm font-semibold text-ink transition-transform duration-200 hover:scale-[1.04] sm:block"
            >
              {c.nav.resume}
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? c.nav.close : c.nav.menu}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-chalk transition-colors duration-200 hover:border-signal/40 lg:hidden"
            >
              <span aria-hidden="true" className="relative block h-3.5 w-4">
                <span
                  className={`absolute inset-x-0 h-[1.5px] bg-current transition-all duration-300 ${
                    menuOpen ? "top-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-current transition-opacity duration-200 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute inset-x-0 h-[1.5px] bg-current transition-all duration-300 ${
                    menuOpen ? "bottom-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Reading progress — a real indicator of position, not an ornament. */}
        <div
          aria-hidden="true"
          className={`h-px origin-[left_center] bg-signal transition-opacity duration-300 rtl:origin-[right_center] ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
          style={{ transform: `scaleX(${progress})` }}
        />
      </header>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 bg-ink/97 backdrop-blur-2xl transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <nav
          aria-label={c.nav.sectionsLabel}
          className="shell flex h-full flex-col justify-center gap-0 overflow-y-auto overscroll-contain pb-10 pt-20"
        >
          {links.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
              style={{ transitionDelay: menuOpen ? `${i * 45 + 90}ms` : "0ms" }}
              className={`group flex items-center justify-between border-b border-line py-4 font-display text-2xl font-bold transition-all duration-500 sm:text-3xl ${
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              } ${active === link.id ? "text-signal" : ""}`}
            >
              {link.label}
              <span
                aria-hidden="true"
                className="latin text-slate-dim transition-colors duration-200 group-hover:text-signal"
              >
                →
              </span>
            </a>
          ))}

          <a
            href={withBase("/resume.pdf")}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={menuOpen ? 0 : -1}
            style={{ transitionDelay: menuOpen ? `${links.length * 45 + 90}ms` : "0ms" }}
            className={`mt-8 w-fit rounded-full bg-signal px-6 py-3 font-semibold text-ink transition-all duration-500 ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            {c.nav.resume}
          </a>

          <a
            href="mailto:ehamzei40@gmail.com"
            tabIndex={menuOpen ? 0 : -1}
            className="latin mt-6 text-sm text-slate-dim"
          >
            ehamzei40@gmail.com
          </a>
        </nav>
      </div>
    </>
  );
}

/**
 * Segmented EN | FA control.
 *
 * Deliberately plain anchors, not next/link: each locale renders its own root
 * layout (<html lang> and dir live there), and the App Router cannot swap one
 * root layout for another during a soft navigation. A full document load is
 * the only way lang, dir, fonts and the theme script all land correctly — and
 * a language switch happens once a visit, so the reload costs nothing.
 */
function LocaleSwitch({
  locale,
  pathname,
  label,
}: {
  locale: Locale;
  pathname: string;
  label: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center gap-0.5 rounded-full border border-line bg-ink-2 p-0.5"
    >
      {locales.map((l) => {
        const isCurrent = l === locale;
        return (
          <a
            key={l}
            href={withBase(pathname.replace(`/${locale}`, `/${l}`) || `/${l}`)}
            hrefLang={l}
            lang={l}
            aria-current={isCurrent ? "true" : undefined}
            aria-label={localeNames[l].native}
            className={`rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors duration-200 ${
              isCurrent
                ? "bg-signal text-ink"
                : "text-slate-dim hover:text-chalk"
            }`}
          >
            <span className="latin">{localeNames[l].short}</span>
          </a>
        );
      })}
    </div>
  );
}
