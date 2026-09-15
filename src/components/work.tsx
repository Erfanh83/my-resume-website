import type { Content, SiteEntry } from "@/lib/content";
import { SectionHead } from "./section-head";
import { Term } from "./ui/term";
import { Reveal } from "./ui/reveal";

export function Work({ c }: { c: Content }) {
  const live = c.sites.filter((s) => s.status === "live");
  const pipeline = c.sites.filter((s) => s.status !== "live");

  return (
    <section id="work" className="scroll-mt-24 py-24 sm:py-32" aria-label={c.work.title}>
      <div className="shell">
        <SectionHead eyebrow={c.work.eyebrow} title={c.work.title} lede={c.work.lede} />

        {/* Shipped work gets the large treatment. */}
        <h3 className="label mt-16 flex items-center gap-3 text-signal">
          <span className="status-dot-live h-1.5 w-1.5 rounded-full bg-signal" />
          {c.work.liveHeading}
        </h3>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {live.map((site, i) => (
            <LiveCard key={site.id} site={site} c={c} delay={i * 120} />
          ))}
        </div>

        {/* In-progress work is listed, not dressed up as finished. */}
        <h3 className="label mt-16 flex items-center gap-3 text-amber">
          <span className="h-1.5 w-1.5 rounded-full bg-amber" />
          {c.work.pipelineHeading}
        </h3>

        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {pipeline.map((site, i) => (
            <Reveal key={site.id} delay={i * 90} className="bg-ink-2 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h4 className="font-display text-lg font-bold">{site.name}</h4>
                <span
                  className={`label rounded-full border px-2.5 py-1.5 ${
                    site.status === "qa"
                      ? "border-amber/30 bg-amber-deep/60 text-amber"
                      : "border-line bg-ink-3 text-slate"
                  }`}
                >
                  {c.board.status[site.status]}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-dim">
                {site.kind}
                {site.location ? ` · ${site.location}` : ""}
              </p>
              <p className="mt-3 text-[0.925rem] leading-relaxed text-slate">{site.summary}</p>
              <StackRow items={site.stack} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-5 text-sm text-slate-dim">{c.work.privateNote}</p>
        </Reveal>
      </div>
    </section>
  );
}

function LiveCard({ site, c, delay }: { site: SiteEntry; c: Content; delay: number }) {
  return (
    <Reveal delay={delay}>
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col rounded-2xl border border-line bg-ink-2 p-6 transition-colors duration-300 hover:border-signal/35 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="font-display text-2xl font-extrabold tracking-tight">{site.name}</h4>
            <p
              dir="ltr"
              className="mt-1.5 font-mono text-sm text-signal-dim decoration-signal/40 underline-offset-4 group-hover:underline"
            >
              {site.domain}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-signal transition-all duration-300 group-hover:border-signal/40 group-hover:bg-signal group-hover:text-ink"
          >
            <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
              <path
                d="M3.5 11.5L11.5 3.5M11.5 3.5H5.5M11.5 3.5V9.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <p className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-slate">{site.summary}</p>
        <StackRow items={site.stack} />
        <span className="sr-only">{c.work.visit}</span>
      </a>
    </Reveal>
  );
}

function StackRow({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-line bg-ink-3 px-2.5 py-1 font-mono text-[0.7rem] text-slate"
        >
          <Term>{item}</Term>
        </li>
      ))}
    </ul>
  );
}
