import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans, Vazirmatn } from "next/font/google";
import { notFound } from "next/navigation";

import "../globals.css";
import { getContent } from "@/lib/content";
import { themeInitScript } from "@/components/theme-toggle";
import { siteUrl } from "@/lib/paths";
import { dirOf, isLocale, locales, type Locale } from "@/lib/i18n";

/* Industrial signage face — carries every headline in English. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

/* Humanist-technical body face, from the same family as the mono. */
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

/* Data, statuses, domains, dates. */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500"],
});

/* Persian, all roles. */
const vazir = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazir",
  display: "swap",
  weight: ["300", "400", "500", "700", "800"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f6f2" },
    { media: "(prefers-color-scheme: dark)", color: "#050905" },
  ],
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const c = getContent(locale);

  return {
    /* Relative paths below resolve against this, so they carry no leading
       slash — a leading slash would resolve to the domain root and lose the
       /my-resume-website/ sub-path. */
    metadataBase: new URL(siteUrl),
    title: c.meta.title,
    description: c.meta.description,
    keywords: c.meta.keywords,
    authors: [{ name: "Mohammad Erfan Hamzei" }],
    alternates: {
      canonical: `${locale}/`,
      languages: { en: "en/", fa: "fa/" },
    },
    openGraph: {
      type: "website",
      locale: locale === "fa" ? "fa_IR" : "en_US",
      title: c.meta.title,
      description: c.meta.description,
      siteName: "Mohammad Erfan Hamzei",
    },
    twitter: {
      card: "summary_large_image",
      title: c.meta.title,
      description: c.meta.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typed: Locale = locale;

  return (
    <html
      lang={typed}
      dir={dirOf(typed)}
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} ${vazir.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-ink text-chalk antialiased">
        {/* Runs before any of the page below it paints, so the correct palette
            is in place and there is no flash of the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
      </body>
    </html>
  );
}
