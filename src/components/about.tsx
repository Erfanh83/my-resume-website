import Image from "next/image";

import { withBase } from "@/lib/paths";

import type { Content } from "@/lib/content";
import { Reveal } from "./ui/reveal";
import { Term } from "./ui/term";

export function About({ c }: { c: Content }) {
  return (
    <section id="about" className="scroll-mt-24 py-24 sm:py-32" aria-label={c.about.title}>
      <div className="shell">
        {/* Portrait and narrative sit side by side and end together.
            Everything that used to hang below one column now runs full
            width underneath, so no ragged gap opens beside the short one. */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5 lg:self-stretch">
            <div className="relative h-full">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl bg-signal/[0.06] blur-2xl"
              />
              <Image
                src={withBase("/portrait.webp")}
                alt={c.about.photoAlt}
                width={1024}
                height={1536}
                sizes="(max-width: 1023px) 92vw, 40vw"
                /* Fills the column so the two halves always end level,
                   whatever the narrative's length. */
                className="h-full max-h-[34rem] w-full rounded-2xl border border-line object-cover object-top lg:max-h-none"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="label flex items-center gap-3 text-signal">
                <span aria-hidden="true" className="h-px w-8 bg-signal/45" />
                {c.about.eyebrow}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.25rem)] font-extrabold">
                {c.about.title}
              </h2>
            </Reveal>

            <div className="mt-7 space-y-5">
              {c.about.paragraphs.map((para, i) => (
                <Reveal key={para.slice(0, 24)} delay={80 + i * 80}>
                  <p className="text-pretty text-[1.0625rem] leading-relaxed text-slate">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Three equal panels, full width — languages, interests, research. */}
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          <Reveal className="bg-ink-2 p-6 sm:p-7">
            <h3 className="label text-slate-dim">{c.about.languagesTitle}</h3>
            <dl className="mt-5 space-y-3">
              {c.about.languages.map((lang) => (
                <div key={lang.name} className="flex items-baseline justify-between gap-4">
                  <dt className="text-[0.95rem] text-chalk">{lang.name}</dt>
                  <dd className="text-sm text-slate-dim">{lang.level}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={90} className="bg-ink-2 p-6 sm:p-7">
            <h3 className="label text-slate-dim">{c.about.researchTitle}</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {c.about.research.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line bg-ink-3 px-3 py-1.5 text-sm text-slate"
                >
                  <Term>{item}</Term>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={180} className="bg-ink-2 p-6 sm:p-7">
            <h3 className="label text-slate-dim">{c.about.interestsTitle}</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {c.about.interests.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line px-3 py-1.5 text-sm text-slate"
                >
                  <Term>{item}</Term>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
