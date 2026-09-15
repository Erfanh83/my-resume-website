import type { Content } from "./types";

export const en: Content = {
  meta: {
    title: "Mohammad Erfan Hamzei — Full-Stack Developer",
    description:
      "Full-stack developer in Hamedan with five years of freelance experience. I design, build, and deploy production websites with React, Next.js, TypeScript, and Django — and build computer-vision systems alongside.",
    keywords:
      "Full-Stack Developer, React, Next.js, TypeScript, Tailwind CSS, Django, REST API, Web Development, Hamedan, Tehran, Computer Vision, Deep Learning",
  },

  nav: {
    work: "Work",
    experience: "Experience",
    projects: "Projects",
    stack: "Stack",
    about: "About",
    contact: "Contact",
    resume: "Resume",
    menu: "Open menu",
    close: "Close menu",
    wordmark: "Erfan Hamzei",
    switchTo: "Switch to Persian",
    skipToContent: "Skip to content",
    backToTop: "Back to top",
    sectionsLabel: "Sections",
    themeToLight: "Switch to light mode",
    themeToDark: "Switch to dark mode",
    languageLabel: "Language",
  },

  hero: {
    availability: "Available for freelance work",
    headline: ["I build websites", "that go live", "and stay live."],
    lede:
      "Five years freelance, from Hamedan. I take a business from first sketch to a deployed, fast, search-friendly site — interface, backend, database, and the server it runs on. One person, whole pipeline.",
    primaryCta: "See the work",
    secondaryCta: "Start a project",
    stats: [
      { value: "5", label: "Years freelancing" },
      { value: "6", label: "Client sites" },
      { value: "2", label: "Research posts" },
    ],
    portraitAlt: "Mohammad Erfan Hamzei",
    locationLabel: "Hamedan",
  },

  board: {
    title: "Deployment board",
    note: "Every client site I am responsible for right now, and exactly where it stands.",
    columns: { project: "Project", type: "Type", status: "Status" },
    status: {
      live: "Live",
      qa: "Final QA",
      build: "In build",
    },
    visit: "Open site",
  },

  capabilities: {
    eyebrow: "How I work",
    title: "One developer, the whole build.",
    lede:
      "Most clients do not want to coordinate a designer, a frontend contractor, a backend contractor, and a sysadmin. I cover the whole path and stay responsible for it after launch.",
    items: [
      {
        id: "interface",
        title: "Interface",
        body:
          "The part your customers actually touch. Built to feel fast on a phone over a slow connection, not just on a designer's monitor.",
        points: [
          "React and Next.js with TypeScript",
          "Tailwind CSS design systems",
          "Responsive down to small phones",
          "Persian and English, RTL and LTR",
        ],
      },
      {
        id: "backend",
        title: "Backend and data",
        body:
          "Authentication, admin panels, search, and the REST APIs that connect them. Built to survive real traffic and real data, not demo data.",
        points: [
          "Django and Django REST Framework",
          "REST API design and integration",
          "Database modelling and migrations",
          "Admin dashboards for non-technical staff",
        ],
      },
      {
        id: "ship",
        title: "Launch and upkeep",
        body:
          "A site that is not deployed is not finished. I handle the last mile — the server, the domain, the search ranking, and everything after.",
        points: [
          "Deployment and domain configuration",
          "SEO structure and page speed work",
          "Testing and pre-launch QA",
          "Ongoing maintenance and changes",
        ],
      },
    ],
  },

  work: {
    eyebrow: "Client work",
    title: "Real businesses. Real domains.",
    lede:
      "Cafés, retail brands, and companies who needed a site that works — and a developer who still answers the phone after launch.",
    liveHeading: "Live now",
    pipelineHeading: "In the pipeline",
    visit: "Open site",
    privateNote: "Not public yet — walkthrough available on request.",
  },

  workspace: {
    eyebrow: "Where the work happens",
    title:
      "A desk in Hamedan, two screens, and somebody's business waiting on the other end.",
    photoAlt: "A desk at night: a laptop and monitor with code on screen, a cup of tea, glasses on a notebook",
  },

  sites: [
    {
      id: "afkarino",
      name: "Afkarino",
      domain: "afkarino.com",
      url: "https://afkarino.com",
      kind: "Business",
      status: "live",
      summary:
        "A complete production business site: a modern responsive interface, a structure built for search engines, and a flow that gets a visitor to the point without friction.",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "SEO"],
    },
    {
      id: "hebemys",
      name: "Hebemys Café",
      domain: "hebemys.com",
      url: "https://hebemys.com",
      kind: "Café",
      status: "live",
      summary:
        "A café site built around the menu and the room. Tuned for accessibility, load speed, and a layout that holds up on every screen from a wide desktop to a phone held one-handed.",
      stack: ["React", "Responsive UI", "Accessibility", "Performance"],
    },
    {
      id: "casablanca",
      name: "Casablanca Café",
      kind: "Café",
      location: "Hamedan",
      status: "qa",
      summary:
        "Full design and development for a café brand in Hamedan. Currently in final testing and deployment.",
      stack: ["Next.js", "Tailwind CSS", "Menu system"],
    },
    {
      id: "hakim",
      name: "Hakim Eyewear",
      kind: "Retail",
      status: "qa",
      summary:
        "A product-focused site for an eyewear brand, built to put the frames first. Being finalised for production now.",
      stack: ["React", "Product catalogue", "Responsive UI"],
    },
    {
      id: "nika",
      name: "Nika Company",
      kind: "Corporate",
      status: "build",
      summary:
        "A corporate site introducing the company's services, business information, and contact channels.",
      stack: ["Next.js", "TypeScript", "Structured content"],
    },
    {
      id: "binhayat",
      name: "Binhayat",
      kind: "Business",
      status: "build",
      summary:
        "A business site built around services, brand presentation, and direct customer contact.",
      stack: ["React", "Tailwind CSS", "Contact flows"],
    },
  ],

  experience: {
    eyebrow: "Track record",
    title: "Where I have been.",
    lede:
      "Five years of client work, running alongside two research posts at Iran's leading technical universities.",
    workLabel: "Work",
    educationLabel: "Education",
    currentLabel: "Current",
    entries: [
      {
        id: "freelance",
        kind: "work",
        role: "Freelance Full-Stack Developer",
        org: "Independent",
        place: "Hamedan, Iran — remote",
        period: "2021 — Present",
        current: true,
        points: [
          "Designed and built production websites and web applications for businesses, cafés, companies, and personal brands.",
          "Delivered complete frontend and backend solutions with React, Next.js, TypeScript, Tailwind CSS, Django, and REST APIs.",
          "Ran the full lifecycle: interface build, backend, database integration, API work, testing, optimisation, deployment, and maintenance.",
          "Worked directly with clients, turning business requirements into scalable web products without a project manager in between.",
        ],
      },
      {
        id: "sharif",
        kind: "work",
        role: "AI Research Assistant",
        org: "Electronics Research Institute, Sharif University of Technology",
        place: "Tehran, Iran",
        period: "Sep 2023 — Sep 2024",
        points: [
          "Contributed to machine learning and computer vision research projects.",
          "Developed and evaluated models for real-world object detection and recognition.",
        ],
      },
      {
        id: "ut-ra",
        kind: "work",
        role: "Research Assistant",
        org: "University of Tehran",
        place: "Tehran, Iran",
        period: "Sep 2022 — Sep 2023",
        points: [
          "Supported faculty research in image processing and data analysis.",
          "Took part in the academic development of AI-focused applications.",
        ],
      },
      {
        id: "bsc",
        kind: "education",
        role: "B.Sc. Geomatics Engineering",
        org: "University of Tehran",
        place: "Tehran, Iran",
        period: "Sep 2022 — 2026",
        points: [
          "Completed the bachelor's programme and graduated in 2026.",
          "Coursework and research centred on image processing, spatial data, and computer vision.",
        ],
      },
    ],
  },

  projects: {
    eyebrow: "Projects",
    title: "Things I built to find out if they would work.",
    lede:
      "Full applications and machine learning systems, built outside client work — where the web side and the vision side meet.",
    filters: { all: "All", web: "Web", ai: "AI & Vision" },
    items: [
      {
        id: "kariab",
        group: "web",
        title: "Kariab — job portal",
        blurb:
          "A full recruitment platform: authentication, job posting and filtering, advanced search, profile management, and an admin dashboard — built on Django and REST APIs, and architected for real, messy, growing data.",
        tags: ["Django", "REST API", "Auth", "Admin dashboard"],
      },
      {
        id: "cafe-sites",
        group: "web",
        title: "Café websites — Hamedan",
        blurb:
          "A run of responsive sites for cafés in Hamedan, each with menu presentation, business details, and location features. Built with React and Next.js, with interface, page speed, and search structure as fixed requirements.",
        tags: ["React", "Next.js", "SEO", "Responsive"],
      },
      {
        id: "portfolio",
        group: "web",
        title: "Personal portfolio",
        blurb:
          "The earlier version of this site, hand-built with HTML5, CSS3, Bootstrap, and JavaScript to showcase projects, skills, and résumé — mobile-first and search-optimised.",
        tags: ["HTML5", "CSS3", "Bootstrap", "JavaScript"],
      },
      {
        id: "mini",
        group: "web",
        title: "Mini applications",
        blurb:
          "Smaller builds used to test ideas quickly: to-do apps, blogs, and interface experiments in React, plus image tools built on Real-ESRGAN and LaMa object removal.",
        tags: ["React", "Real-ESRGAN", "LaMa"],
      },
      {
        id: "yolo",
        group: "ai",
        title: "Object detection with YOLO",
        blurb:
          "Detection pipelines on YOLOv5 and YOLOv8, plus experimental YOLOv10 and YOLOv11 — applied to vehicle classification, safety helmet detection, and smart surveillance, fine-tuned on custom datasets for real-time accuracy.",
        tags: ["YOLOv5/v8", "PyTorch", "Custom datasets"],
      },
      {
        id: "ocr",
        group: "ai",
        title: "Persian OCR",
        blurb:
          "A Tesseract and OpenCV pipeline for Persian text: licence plate recognition, Iranian national ID cards, and scanned official documents — with preprocessing built specifically for noisy, low-resolution scans.",
        tags: ["Tesseract", "OpenCV", "Persian text"],
      },
      {
        id: "face",
        group: "ai",
        title: "Face recognition & emotion",
        blurb:
          "Real-time facial recognition on FaceNet and Dlib, using landmark detection for alignment and PF-ViT for emotional state — built for smart authentication and live emotion monitoring.",
        tags: ["FaceNet", "Dlib", "PF-ViT"],
      },
      {
        id: "telegram",
        group: "ai",
        title: "AI Telegram bot",
        blurb:
          "One Telegram interface wrapping the whole toolkit: object detection, OCR, face recognition, and emotion analysis. Send an image, get an answer back immediately.",
        tags: ["Telegram API", "Python", "Multi-model"],
      },
      {
        id: "restore",
        group: "ai",
        title: "Image restoration",
        blurb:
          "Recovering detail in low-resolution and blurred faces with CodeFormer, Real-ESRGAN, and GFPGAN — for old photo restoration, surveillance frames, and profile images.",
        tags: ["CodeFormer", "Real-ESRGAN", "GFPGAN"],
      },
      {
        id: "tts",
        group: "ai",
        title: "Text to speech",
        blurb:
          "A speech system on Bark and VITS that reads Persian and English with control over emotion and intonation — aimed at voice assistants, audiobooks, and accessibility tools.",
        tags: ["Bark", "VITS", "Persian & English"],
      },
    ],
  },

  stack: {
    eyebrow: "Stack",
    title: "What I reach for.",
    lede: "The tools I use daily, grouped by the job they do.",
    groups: [
      {
        id: "frontend",
        title: "Frontend",
        items: [
          "React.js",
          "Next.js",
          "TypeScript",
          "JavaScript (ES6+)",
          "Tailwind CSS",
          "HTML5 / CSS3",
          "Bootstrap 5",
          "Responsive design",
        ],
      },
      {
        id: "backend",
        title: "Backend",
        items: [
          "Django",
          "Django REST Framework",
          "REST API design",
          "Python",
          "Database modelling",
          "Authentication",
        ],
      },
      {
        id: "delivery",
        title: "Delivery",
        items: [
          "Deployment",
          "SEO structure",
          "Performance tuning",
          "Git & GitHub",
          "Linux",
          "Maintenance",
        ],
      },
      {
        id: "ai",
        title: "AI & vision",
        items: [
          "PyTorch",
          "TensorFlow",
          "OpenCV",
          "YOLO family",
          "Tesseract OCR",
          "FaceNet / Dlib",
        ],
      },
      {
        id: "languages",
        title: "Languages",
        items: ["Python", "JavaScript", "TypeScript", "C++", "MATLAB"],
      },
    ],
  },

  about: {
    eyebrow: "About",
    title: "Hello — I'm Erfan.",
    paragraphs: [
      "I have been building websites for clients since 2021, which is longer than I have had a degree. What started as freelance work for small businesses became the thing I do: taking a business that needs to exist online and getting it there properly — designed, built, deployed, and maintained.",
      "Alongside that I studied Geomatics Engineering at the University of Tehran and spent two years as a research assistant, one of them at Sharif University's Electronics Research Institute, working on computer vision and deep learning. That side of my work is real, not decorative — detection pipelines, Persian OCR, face recognition, image restoration, speech synthesis.",
      "The two halves feed each other. Research taught me to be precise about whether something actually works. Client work taught me that it also has to ship, load fast, and keep running long after I hand it over.",
    ],
    photoAlt: "Mohammad Erfan Hamzei, photographed against a dark background",
    interestsTitle: "Away from the screen",
    interests: [
      "Football",
      "Volleyball",
      "The gym",
      "Music",
      "Film & series",
      "Reading research",
    ],
    languagesTitle: "Languages",
    languages: [
      { name: "Persian", level: "Native" },
      { name: "English", level: "Intermediate" },
    ],
    researchTitle: "Research interests",
    research: [
      "Deep learning",
      "Machine learning",
      "Artificial intelligence",
      "Image processing",
      "Computer vision",
      "Web development",
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: "Tell me what you need built.",
    lede:
      "A café menu site, a company site, or a full application with a backend — send me the idea and I will tell you honestly what it takes.",
    links: [
      {
        id: "email",
        label: "Email",
        value: "ehamzei40@gmail.com",
        href: "mailto:ehamzei40@gmail.com",
      },
      {
        id: "phone",
        label: "Phone",
        value: "+98 936 264 6244",
        href: "tel:+989362646244",
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        value: "erfan hamzei",
        href: "https://www.linkedin.com/in/erfan-hamzei",
      },
      { id: "location", label: "Based in", value: "Hamedan, Iran" },
    ],
    formTitle: "Send a message",
    formLede: "I read everything that arrives here and reply within a day.",
    fields: {
      name: "Your name",
      email: "Email address",
      subject: "What is it about?",
      message: "Tell me about the project",
    },
    errors: {
      name: "Enter your name so I know who I am replying to.",
      email: "Enter an email address I can reply to.",
      subject: "Add a short subject.",
      message: "Describe what you need — a couple of sentences is enough.",
      send: "The message did not send. Email me directly at ehamzei40@gmail.com.",
      config:
        "The contact form is not connected yet. Email me directly at ehamzei40@gmail.com.",
    },
    send: "Send message",
    sending: "Sending",
    sent: "Message sent",
    sentNote: "Thanks — I will get back to you within a day.",
  },

  footer: {
    rights: "Mohammad Erfan Hamzei. All rights reserved.",
    builtWith: "Built with Next.js, TypeScript, and Tailwind CSS.",
    backToTop: "Back to top",
  },
};
