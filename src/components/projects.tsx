"use client";

import { useState } from "react";

import type { Content } from "@/lib/content";
import { SectionHead } from "./section-head";
import { Term } from "./ui/term";
import { Reveal } from "./ui/reveal";

type Filter = "all" | "web" | "ai";

export function Projects({ c }: { c: Content }) {
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: c.projects.filters.all, count: c.projects.items.length },
    {
      id: "web",
      label: c.projects.filters.web,
      count: c.projects.items.filter((p) => p.group === "web").length,
    },
    {
      id: "ai",
      label: c.projects.filters.ai,
      count: c.projects.items.filter((p) => p.group === "ai").length,
    },
  ];

  const shown =
    filter === "all" ? c.projects.items : c.projects.items.filter((p) => p.group === filter);

  return (
    <section
      id="projects"
      className="scroll-mt-24 py-24 sm:py-32"
      aria-label={c.projects.title}
    >
      <div className="shell">
        <SectionHead
          eyebrow={c.projects.eyebrow}
          title={c.projects.title}
          lede={c.projects.lede}
        />

        <Reveal>
          <div
            role="tablist"
            aria-label={c.projects.eyebrow}
            className="mt-10 flex flex-wrap gap-2"
          >
            {filters.map((f) => {
              const selected = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setFilter(f.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
                    selected
                      ? "border-signal/40 bg-signal-deep/60 text-signal"
                      : "border-line text-slate hover:border-signal/25 hover:text-chalk"
                  }`}
                >
                  {f.label}
                  <span className="font-mono text-[0.7rem] opacity-60">{f.count}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((project, i) => (
            <Reveal
              key={project.id}
              delay={Math.min(i, 5) * 70}
              className="group flex h-full flex-col rounded-2xl border border-line bg-ink-2 p-6 transition-colors duration-300 hover:border-signal/30"
            >
              <span
                className={`label w-fit rounded-full border px-2.5 py-1.5 ${
                  project.group === "web"
                    ? "border-signal/25 bg-signal-deep/50 text-signal"
                    : "border-line bg-ink-3 text-slate"
                }`}
              >
                {project.group === "web" ? c.projects.filters.web : c.projects.filters.ai}
              </span>

              <h3 className="mt-4 font-display text-xl font-bold">{project.title}</h3>
              <p className="mt-3 flex-1 text-[0.925rem] leading-relaxed text-slate">
                {project.blurb}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-ink-3 px-2.5 py-1 font-mono text-[0.7rem] text-slate-dim"
                  >
                    <Term>{tag}</Term>
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
