import type { Content } from "@/lib/content";
import { SectionHead } from "./section-head";
import { Term } from "./ui/term";
import { Reveal } from "./ui/reveal";

export function Stack({ c }: { c: Content }) {
  return (
    <section id="stack" className="scroll-mt-24 py-24 sm:py-32" aria-label={c.stack.title}>
      <div className="shell">
        <SectionHead eyebrow={c.stack.eyebrow} title={c.stack.title} lede={c.stack.lede} />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {c.stack.groups.map((group, i) => (
            <Reveal key={group.id} delay={i * 80} className="bg-ink-2 p-6 sm:p-7">
              <h3 className="label text-signal">{group.title}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-ink-3 px-3 py-1.5 text-sm text-slate transition-colors duration-200 hover:border-signal/30 hover:text-chalk"
                  >
                    <Term>{item}</Term>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
