import type { Content } from "@/lib/content";
import { SectionHead } from "./section-head";
import { Term } from "./ui/term";
import { Reveal } from "./ui/reveal";

export function Stack({ c }: { c: Content }) {
  const count = c.stack.groups.length;

  /* The panels share one hairline grid, so an empty trailing cell would show
     as a solid block of line colour. The last panel stretches to close it. */
  const lastSpan = [
    count % 2 === 1 ? "sm:col-span-2" : "",
    count % 3 === 2 ? "lg:col-span-2" : count % 3 === 1 ? "lg:col-span-3" : "lg:col-span-1",
  ].join(" ");

  return (
    <section id="stack" className="render-lazy scroll-mt-24 py-24 sm:py-32" aria-label={c.stack.title}>
      <div className="shell">
        <SectionHead eyebrow={c.stack.eyebrow} title={c.stack.title} lede={c.stack.lede} />

        <div className="mt-14 grid gap-px overflow-clip rounded-2xl border border-line bg-line lift sm:grid-cols-2 lg:grid-cols-3">
          {c.stack.groups.map((group, i) => (
            <Reveal
              key={group.id}
              delay={i * 80}
              className={`bg-ink-2 p-6 sm:p-7 ${i === count - 1 ? lastSpan : ""}`}
            >
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
