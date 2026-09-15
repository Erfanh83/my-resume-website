import { Reveal } from "./ui/reveal";

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "start",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "start" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "text-center" : undefined}>
      <p className="label flex items-center gap-3 text-signal">
        <span aria-hidden="true" className="h-px w-8 bg-signal/45" />
        {eyebrow}
      </p>
      <h2 className="mt-5 max-w-3xl text-balance font-display text-[clamp(2rem,4.6vw,3.25rem)] font-extrabold">
        {title}
      </h2>
      {lede ? (
        <p
          className={`mt-5 max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-slate ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}

/** Full-bleed hairline between sections. */
export function Rule() {
  return (
    <div className="shell">
      <div className="hairline" />
    </div>
  );
}
