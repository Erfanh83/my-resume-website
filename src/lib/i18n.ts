export const locales = ["en", "fa"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Text direction for a locale. Persian is right-to-left. */
export function dirOf(locale: Locale): "ltr" | "rtl" {
  return locale === "fa" ? "rtl" : "ltr";
}

/** The other locale — the one the language switch points at. */
export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "fa" : "en";
}

export const localeNames: Record<Locale, { native: string; short: string }> = {
  en: { native: "English", short: "EN" },
  fa: { native: "فارسی", short: "FA" },
};

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/**
 * Renders numerals in the reader's own script. Persian pages showing
 * Latin "01 / 02 / 03" is the giveaway of a half-translated site.
 */
export function toLocaleDigits(value: string | number, locale: Locale): string {
  const text = String(value);
  if (locale !== "fa") return text;
  return text.replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
}

const PERSIAN_RANGE = /[؀-ۿ]/;

/**
 * True when a string carries no Arabic-script characters — a technology
 * name like "Next.js" sitting inside Persian copy. Those need the Latin
 * face and an LTR run of their own, or they render in Vazirmatn's
 * fallback glyphs and break the line's direction.
 */
export function isLatinText(value: string): boolean {
  return !PERSIAN_RANGE.test(value);
}
