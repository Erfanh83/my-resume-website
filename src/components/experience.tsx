import type { Content } from "@/lib/content";
import { SectionHead } from "./section-head";
import { Reveal } from "./ui/reveal";

export function Experience({ c }: { c: Content }) {
  return (
    <section
      id="experience"
      className="scroll-mt-24 py-24 sm:py-32"
      aria-label={c.experience.title}
    >
      <div className="shell">
        <SectionHead
          eyebrow={c.experience.eyebrow}
          title={c.experience.title}
          lede={c.experience.lede}
        />

        <ol className="mt-14 space-y-px overflow-hidden rounded-2xl border border-line bg-line">
          {c.experience.entries.map((entry, i) => (
            <Reveal key={entry.id} as="li" delay={i * 90} className="bg-ink-2">
              <article className="grid gap-x-8 gap-y-4 p-6 sm:p-8 lg:grid-cols-12">
                {/* Period rail */}
                <div className="lg:col-span-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className={`label rounded-full border px-2.5 py-1.5 ${
                        entry.kind === "education"
                          ? "border-line bg-ink-3 text-slate"
                          : "border-signal/25 bg-signal-deep/50 text-signal"
                      }`}
                    >
                      {entry.kind === "education"
                        ? c.experience.educationLabel
                        : c.experience.workLabel}
                    </span>
                    {entry.current ? (
                      <span className="label inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber-deep/60 px-2.5 py-1.5 text-amber">
                        <span className="status-dot-live h-1.5 w-1.5 rounded-full bg-amber" />
                        {c.experience.currentLabel}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 font-mono text-sm text-slate">{entry.period}</p>
                  <p className="mt-1 text-sm text-slate-dim">{entry.place}</p>
                </div>

                {/* Body */}
                <div className="lg:col-span-8">
                  <h3 className="font-display text-xl font-bold sm:text-2xl">{entry.role}</h3>
                  <p className="mt-1.5 text-[0.95rem] text-signal-dim">{entry.org}</p>
                  <ul className="mt-5 space-y-2.5">
                    {entry.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-slate"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-signal/70"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
