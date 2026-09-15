import Image from "next/image";

import { withBase } from "@/lib/paths";

import type { Content } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { LocalTime } from "./local-time";
import { Reveal } from "./ui/reveal";

/**
 * A full-bleed photographic breather between the card-heavy sections.
 * The scrims are drawn from the ink token, so the band melts into the page
 * in either theme instead of sitting in it as a rectangle.
 */
export function Workspace({ c, locale }: { c: Content; locale: Locale }) {
  return (
    <section
      className="relative isolate flex min-h-[26rem] items-end overflow-hidden py-16 sm:min-h-[32rem] sm:py-20"
      aria-label={c.workspace.title}
    >
      <Image
        src={withBase("/desk.webp")}
        alt={c.workspace.photoAlt}
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />

      {/* Top and bottom fades, plus a wash toward the text side so the
          statement always has something quiet to sit on. */}
      <div aria-hidden="true" className="band-scrim absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-ink/85 via-ink/30 to-transparent rtl:bg-linear-to-l"
      />

      <div className="shell relative">
        <Reveal className="max-w-xl">
          <p className="label flex items-center gap-3 text-signal">
            <span aria-hidden="true" className="h-px w-8 bg-signal/45" />
            {c.workspace.eyebrow}
          </p>

          <p className="mt-5 text-balance font-display text-[clamp(1.5rem,3.4vw,2.35rem)] font-bold leading-[1.25]">
            {c.workspace.title}
          </p>

          <div className="mt-7 inline-flex items-center gap-4 rounded-full border border-line bg-ink/70 px-4 py-2.5 backdrop-blur-md">
            <span className="label flex items-center gap-2 text-slate">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              {c.hero.locationLabel}
            </span>
            <span aria-hidden="true" className="h-4 w-px bg-line" />
            <LocalTime locale={locale} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
