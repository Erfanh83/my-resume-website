import type { Content } from "@/lib/content";
import { toLocaleDigits, type Locale } from "@/lib/i18n";
import { SectionHead } from "./section-head";
import { Reveal } from "./ui/reveal";

export function Capabilities({ c, locale }: { c: Content; locale: Locale }) {
  return (
    <section className="py-24 sm:py-32" aria-label={c.capabilities.title}>
      <div className="shell">
        <SectionHead
          eyebrow={c.capabilities.eyebrow}
          title={c.capabilities.title}
          lede={c.capabilities.lede}
        />

        {/* Three stages of one pipeline, so they read left to right as a sequence. */}
        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {c.capabilities.items.map((item, i) => (
            <Reveal
              key={item.id}
              as="li"
              delay={i * 110}
              className="flex flex-col bg-ink-2 p-6 sm:p-8"
            >
              <span className="label text-slate-dim">
                {toLocaleDigits(String(i + 1).padStart(2, "0"), locale)}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-slate">{item.body}</p>

              <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                {item.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-slate">
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-signal"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
