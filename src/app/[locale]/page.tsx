import { notFound } from "next/navigation";

import { About } from "@/components/about";
import { Capabilities } from "@/components/capabilities";
import { DeploymentBoard } from "@/components/deployment-board";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Rule } from "@/components/section-head";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Stack } from "@/components/stack";
import { Work } from "@/components/work";
import { Workspace } from "@/components/workspace";
import { getContent } from "@/lib/content";
import { isLocale } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const c = getContent(locale);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: locale === "fa" ? "محمد عرفان حمزه‌ای" : "Mohammad Erfan Hamzei",
    jobTitle: locale === "fa" ? "توسعه‌دهنده فول‌استک" : "Full-Stack Developer",
    email: "mailto:ehamzei40@gmail.com",
    telephone: "+989362646244",
    address: { "@type": "PostalAddress", addressLocality: "Hamedan", addressCountry: "IR" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "University of Tehran" },
    sameAs: ["https://www.linkedin.com/in/erfan-hamzei"],
    knowsAbout: [
      "Full-Stack Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "Django",
      "Computer Vision",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Static, author-controlled object — no user input reaches this.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <SiteHeader locale={locale} c={c} />

      <main id="main" tabIndex={-1}>
        <Hero c={c} />

        {/* The board is its own section now — it used to sit inside the hero,
            where the full-bleed photograph would have run behind it. */}
        <DeploymentBoard c={c} />

        <Rule />
        <Capabilities c={c} locale={locale} />
        <Rule />
        <Work c={c} />
        <Rule />
        <Experience c={c} />

        {/* Photographic breather between the two densest sections. */}
        <Workspace c={c} locale={locale} />

        <Projects c={c} />
        <Rule />
        <Stack c={c} />
        <Rule />
        <About c={c} />
        <Rule />
        <Contact c={c} />
      </main>

      <SiteFooter c={c} locale={locale} />
    </>
  );
}
