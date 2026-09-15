import type { Locale } from "@/lib/i18n";
import type { Content } from "./types";
import { en } from "./en";
import { fa } from "./fa";

const dictionaries: Record<Locale, Content> = { en, fa };

export function getContent(locale: Locale): Content {
  return dictionaries[locale];
}

export type { Content };
export * from "./types";
