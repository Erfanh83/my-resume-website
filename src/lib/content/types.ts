/** Where a client website currently stands. Drives the deployment board. */
export type DeployStatus = "live" | "qa" | "build";

export interface SiteEntry {
  id: string;
  name: string;
  /** Shown and linked only when the site is publicly reachable. */
  domain?: string;
  url?: string;
  kind: string;
  location?: string;
  status: DeployStatus;
  summary: string;
  stack: string[];
}

export interface Capability {
  id: string;
  title: string;
  body: string;
  points: string[];
}

export interface TimelineEntry {
  id: string;
  kind: "work" | "education";
  role: string;
  org: string;
  place: string;
  period: string;
  /** Marks the row that is still open-ended. */
  current?: boolean;
  points: string[];
}

export interface Project {
  id: string;
  group: "web" | "ai";
  title: string;
  blurb: string;
  tags: string[];
}

export interface StackGroup {
  id: string;
  title: string;
  items: string[];
}

export interface ContactLink {
  id: "email" | "phone" | "linkedin" | "location";
  label: string;
  value: string;
  href?: string;
}

export interface Content {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  nav: {
    work: string;
    experience: string;
    projects: string;
    stack: string;
    about: string;
    contact: string;
    wordmark: string;
    resume: string;
    menu: string;
    close: string;
    switchTo: string;
    skipToContent: string;
    backToTop: string;
    sectionsLabel: string;
    languageLabel: string;
    themeToLight: string;
    themeToDark: string;
  };
  hero: {
    availability: string;
    headline: string[];
    lede: string;
    primaryCta: string;
    secondaryCta: string;
    stats: { value: string; label: string }[];
    portraitAlt: string;
    locationLabel: string;
  };
  board: {
    title: string;
    note: string;
    columns: { project: string; type: string; status: string };
    status: Record<DeployStatus, string>;
    visit: string;
  };
  capabilities: {
    eyebrow: string;
    title: string;
    lede: string;
    items: Capability[];
  };
  work: {
    eyebrow: string;
    title: string;
    lede: string;
    liveHeading: string;
    pipelineHeading: string;
    visit: string;
    privateNote: string;
  };
  workspace: {
    eyebrow: string;
    title: string;
    photoAlt: string;
  };
  sites: SiteEntry[];
  experience: {
    eyebrow: string;
    title: string;
    lede: string;
    workLabel: string;
    educationLabel: string;
    currentLabel: string;
    entries: TimelineEntry[];
  };
  projects: {
    eyebrow: string;
    title: string;
    lede: string;
    filters: { all: string; web: string; ai: string };
    items: Project[];
  };
  stack: {
    eyebrow: string;
    title: string;
    lede: string;
    groups: StackGroup[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    photoAlt: string;
    interestsTitle: string;
    interests: string[];
    languagesTitle: string;
    languages: { name: string; level: string }[];
    researchTitle: string;
    research: string[];
  };
  contact: {
    eyebrow: string;
    title: string;
    lede: string;
    links: ContactLink[];
    formTitle: string;
    formLede: string;
    fields: {
      name: string;
      email: string;
      subject: string;
      message: string;
    };
    errors: {
      name: string;
      email: string;
      subject: string;
      message: string;
      send: string;
      config: string;
    };
    send: string;
    sending: string;
    sent: string;
    sentNote: string;
  };
  footer: {
    rights: string;
    builtWith: string;
    backToTop: string;
  };
}
