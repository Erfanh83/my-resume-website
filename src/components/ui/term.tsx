import { isLatinText } from "@/lib/i18n";

/**
 * A single term that may be Latin ("Next.js") or Persian ("طراحی واکنش‌گرا"),
 * inside copy that could be either. Latin terms get their own LTR run and
 * the Latin face, so they do not inherit Vazirmatn or flip the line.
 */
export function Term({ children, className }: { children: string; className?: string }) {
  const latin = isLatinText(children);

  return (
    <span
      {...(latin ? { lang: "en", dir: "ltr" } : {})}
      className={`${latin ? "latin" : ""} ${className ?? ""}`.trim() || undefined}
    >
      {children}
    </span>
  );
}
