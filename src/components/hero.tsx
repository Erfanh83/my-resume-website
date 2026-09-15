import Image from "next/image";

import { withBase } from "@/lib/paths";

import type { Content } from "@/lib/content";
import { Reveal } from "./ui/reveal";

export function Hero({ c }: { c: Content }) {
  return (
    <section
      id="home"
      className="relative overflow-hidden pb-16 pt-[16rem] sm:pt-[19rem] lg:pb-24 lg:pt-36"
      aria-label={c.hero.headline.join(" ")}
    >
      {/* Ambient ground */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute -top-40 start-1/4 h-[32rem] w-[32rem] rounded-full bg-signal/[0.06] blur-[120px]" />
        <div className="hero-grid absolute inset-0" />
      </div>

      {/* The photograph itself — no frame, no card. A band across the top of a
          phone, the inline-end half of a desktop, masked so it dissolves into
          the page rather than sitting on it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[23rem] sm:h-[26rem] lg:inset-y-0 lg:start-auto lg:end-0 lg:h-auto lg:w-[58%] xl:w-[54%]"
      >
        <Image
          src={withBase("/hero.webp")}
          alt=""
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 58vw"
          className="hero-photo object-cover object-[50%_12%] lg:object-[46%_22%]"
        />
        {/* Picks up the green already in the photograph and lets it carry
            outward into the section. */}
        <div className="absolute inset-0 bg-signal/[0.04] mix-blend-plus-lighter" />
      </div>

      <div className="shell relative">
        <div className="lg:max-w-[60%]">
          <Reveal>
            <p className="label inline-flex items-center gap-2.5 rounded-full border border-signal/25 bg-signal-deep/50 px-3.5 py-2 text-signal backdrop-blur-sm">
              <span
                aria-hidden="true"
                className="status-dot-live h-1.5 w-1.5 rounded-full bg-signal"
              />
              {c.hero.availability}
            </p>
          </Reveal>

          <h1 className="mt-6 font-display text-[clamp(2.4rem,6.6vw,4.75rem)] font-extrabold">
            {c.hero.headline.map((line, i) => (
              <Reveal
                key={line}
                delay={90 + i * 110}
                className="block overflow-hidden pb-[0.08em]"
              >
                <span className={i === c.hero.headline.length - 1 ? "text-signal" : undefined}>
                  {line}
                </span>
              </Reveal>
            ))}
          </h1>

          <Reveal delay={420}>
            <p className="mt-6 max-w-xl text-pretty text-[1.0625rem] leading-relaxed text-slate">
              {c.hero.lede}
            </p>
          </Reveal>

          <Reveal delay={500}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-2.5 rounded-full bg-signal px-6 py-3.5 font-semibold text-ink transition-transform duration-200 hover:scale-[1.03]"
              >
                {c.hero.primaryCta}
                {/* Points along the reading direction in both locales. */}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                >
                  <path
                    d="M2.5 7.5h10M8.5 3.5l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/40 px-6 py-3.5 font-medium text-chalk backdrop-blur-sm transition-colors duration-200 hover:border-signal/45 hover:text-signal"
              >
                {c.hero.secondaryCta}
              </a>
            </div>
          </Reveal>

          <Reveal delay={560}>
            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
              {c.hero.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-ink-2/90 px-4 py-4 backdrop-blur-sm sm:px-5 sm:py-5"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl font-extrabold text-signal">
                      {stat.value}
                    </span>
                    <span className="mt-1.5 block text-[0.78rem] leading-snug text-slate-dim">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
