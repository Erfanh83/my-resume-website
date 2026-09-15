import type { Content, DeployStatus } from "@/lib/content";
import { Reveal } from "./ui/reveal";

/**
 * The page's signature element: every client site, with its real
 * current state. Status is information carried from the CV, not
 * decoration — two are live, two are in final QA, two are being built.
 */
export function DeploymentBoard({ c }: { c: Content }) {
  const order: Record<DeployStatus, number> = { live: 0, qa: 1, build: 2 };
  const rows = [...c.sites].sort((a, b) => order[a.status] - order[b.status]);

  return (
    <section className="pb-20 pt-4 sm:pb-24" aria-label={c.board.title}>
      <div className="shell">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-line bg-ink-2/70 backdrop-blur-sm">
        {/* Board head */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line px-5 py-4 sm:px-7 sm:py-5">
          <h2 className="label flex items-center gap-2.5 text-chalk">
            <span className="status-dot-live h-1.5 w-1.5 rounded-full bg-signal text-signal" />
            {c.board.title}
          </h2>
          <p className="max-w-md text-[0.8rem] leading-snug text-slate-dim">{c.board.note}</p>
        </div>

        {/* Column heads — desktop only; the mobile layout labels inline. */}
        <div className="label hidden grid-cols-12 gap-4 border-b border-line px-7 py-3 text-slate-dim md:grid">
          <span className="col-span-5">{c.board.columns.project}</span>
          <span className="col-span-4">{c.board.columns.type}</span>
          <span className="col-span-3 text-end">{c.board.columns.status}</span>
        </div>

        <ul className="divide-y divide-line">
          {rows.map((site) => {
            const live = site.status === "live";
            const Row = live ? "a" : "div";

            return (
              <li key={site.id}>
                <Row
                  {...(live
                    ? {
                        href: site.url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        "aria-label": `${site.name} — ${c.board.visit}`,
                      }
                    : {})}
                  className={`group grid grid-cols-1 items-center gap-x-4 gap-y-2 px-5 py-4 transition-colors duration-200 sm:px-7 md:grid-cols-12 md:py-4 ${
                    live ? "hover:bg-signal/[0.045]" : ""
                  }`}
                >
                  {/* Project */}
                  <div className="md:col-span-5">
                    <span className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      <span className="font-display text-lg font-bold tracking-tight">
                        {site.name}
                      </span>
                      {site.domain ? (
                        <span
                          dir="ltr"
                          className="font-mono text-[0.78rem] text-signal-dim decoration-signal/40 underline-offset-4 group-hover:underline"
                        >
                          {site.domain}
                        </span>
                      ) : null}
                    </span>
                  </div>

                  {/* Type */}
                  <div className="text-sm text-slate md:col-span-4">
                    {site.kind}
                    {site.location ? (
                      <span className="text-slate-dim"> · {site.location}</span>
                    ) : null}
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-3 md:col-span-3 md:justify-end">
                    <StatusPill status={site.status} label={c.board.status[site.status]} />
                    {live ? (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 15 15"
                        fill="none"
                        aria-hidden="true"
                        className="shrink-0 text-signal opacity-0 transition-opacity duration-200 group-hover:opacity-100 rtl:-scale-x-100"
                      >
                        <path
                          d="M3.5 11.5L11.5 3.5M11.5 3.5H5.5M11.5 3.5V9.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : null}
                  </div>
                </Row>
              </li>
            );
          })}
          </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatusPill({ status, label }: { status: DeployStatus; label: string }) {
  const styles: Record<DeployStatus, string> = {
    live: "border-signal/30 bg-signal-deep/60 text-signal",
    qa: "border-amber/30 bg-amber-deep/60 text-amber",
    build: "border-line bg-ink-3 text-slate",
  };

  return (
    <span
      className={`label inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 ${styles[status]}`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full bg-current ${
          status === "live" ? "status-dot-live" : ""
        } ${status === "build" ? "opacity-50" : ""}`}
      />
      {label}
    </span>
  );
}
