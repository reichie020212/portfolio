import type {
  ContactLink,
  HeroFact,
  HostInfo,
  NowItem,
  NowSideBlock,
  OssRepo,
  Project,
  Service,
  StackColumn,
  TimelineEntry,
} from "@/types/content";

export const heroFacts: HeroFact[] = [
  { label: "name", value: 'Redick "Red" Butay' },
  { label: "role", value: "Software Developer", muted: "// full-stack, backend-leaning" },
  { label: "since", value: "2018", muted: "// ~8 yrs shipping" },
  { label: "stack", value: "Odoo · Django · Next.js · React · PostgreSQL" },
  { label: "location", value: "Bulacan, PH", muted: "// UTC+8" },
];

export const heroChips = [
  { label: "open to work", accent: true as const },
  { label: "odoo" },
  { label: "django" },
  { label: "next.js" },
  { label: "react" },
  { label: "self-hosted" },
];

export const facts = [
  { number: "8", suffix: "+", label: "years shipping" },
  { number: "2", suffix: "", label: "oss contributions" },
  { number: "7", suffix: "", label: "services self-hosted" },
];

export const timeline: TimelineEntry[] = [
  {
    years: "2022 → now",
    subtitle: "present",
    title: "Software Developer",
    org: "@ Newlogic Philippines",
    body:
      "Building enterprise-grade Odoo solutions for clients across industries — custom modules, integrations, and bespoke workflows on top of the Odoo platform. Designed a GIS module with dynamic vector drawing, raster switching, search, and GeoJSON layers on an interactive map.",
    tags: ["odoo", "owl.js", "python", "postgis", "leaflet"],
    active: true,
  },
  {
    years: "2021 → 2022",
    subtitle: "automation era",
    title: "Application Development Senior Analyst",
    org: "@ Accenture",
    body:
      "Python + Docker automation tooling. Maintained Java / Spring + Angular apps with Camunda and LaunchDarkly. Trained ML models for internal projects; set up Keycloak with custom Java SMS auth.",
    tags: ["python", "docker", "java", "angular", "ml", "keycloak"],
  },
  {
    years: "2020 → 2021",
    subtitle: "infra fundamentals",
    title: "Fullstack Software Developer",
    org: "@ Golden Legacy Financing",
    body:
      "R&D on Keycloak, Docker, and WikiJS. Managed company SSL certificates and ran the web servers (NGINX, Apache).",
    tags: ["keycloak", "docker", "nginx", "wiki.js", "ssl"],
  },
  {
    years: "2018 → 2020",
    subtitle: "django + cloud",
    title: "Software Developer",
    org: "@ Philsmile Inc.",
    body:
      "Full-stack Python / Django with REST APIs, deployed on AWS — EC2, S3, RDS, CloudFront, Route 53, Auto Scaling. Integrated PayMongo, BDO Checkout, and BPI for online payments. Mentored new hires.",
    tags: ["django", "rest", "aws", "payments", "postgres"],
  },
  {
    years: "2017 → 2018",
    subtitle: "day zero",
    title: "Associate Software Developer",
    org: "@ Accenture",
    body:
      "First role out of university — tester and support engineer on enterprise application teams. Picked Python because it read like English and never really looked back.",
    tags: ["python", "qa", "curiosity"],
  },
];

export const stack: StackColumn[] = [
  {
    heading: "// core",
    items: [
      { name: "Python", years: "8y", level: 95 },
      { name: "Odoo (v15–v19)", years: "4y", level: 78 },
      { name: "OWL.js", years: "4y", level: 70 },
      { name: "Django", years: "5y", level: 82 },
      { name: "PostgreSQL", years: "6y", level: 78 },
    ],
  },
  {
    heading: "// frontend",
    items: [
      { name: "HTML / CSS", years: "8y", level: 85 },
      { name: "TypeScript", years: "1y", level: 45 },
      { name: "Next.js", years: "<1y", level: 30 },
      { name: "React", years: "<1y", level: 30 },
      { name: "Angular", years: "<1y", level: 25 },
    ],
  },
  {
    heading: "// infra",
    items: [
      { name: "Git", years: "8y", level: 90 },
      { name: "Linux", years: "7y", level: 88 },
      { name: "Docker", years: "5y", level: 80 },
      { name: "Nginx", years: "4y", level: 70 },
      { name: "GitHub Actions", years: "3y", level: 65 },
    ],
  },
  {
    heading: "// cloud",
    items: [
      { name: "AWS", years: "3y", level: 60 },
      { name: "Let's Encrypt", years: "3y", level: 60 },
      { name: "Cloudflare", years: "<1y", level: 30 },
      { name: "Mailpit", years: "<1y", level: 25 },
    ],
  },
  {
    heading: "// also",
    items: [
      { name: "GIS / Leaflet", years: "1y", level: 45 },
      { name: "Keycloak / SSO", years: "2y", level: 55 },
      { name: "n8n workflows", years: "<1y", level: 30 },
      { name: "LLM tooling", years: "<1y", level: 30 },
    ],
  },
];

export const projects: Project[] = [
  {
    index: "[01]",
    slug: "hospital-mgmt",
    title: "Hospital Management System",
    description:
      "End-to-end clinical + administrative workflows: patient records, appointments, billing, pharmacy, and reporting — all inside a custom Odoo 19 module suite.",
    tags: ["odoo/19", "python", "postgres", "owl.js"],
    status: "live",
    hosting: "self-hosted",
    url: "https://hospital.buildbyred.dev/",
    glyph: "+H",
    thumbLabel: "hospital.png · 16:9 placeholder",
    thumbSrc: "/projects/hospital.png",
    thumbAlt: "Camadin Doctor's Hospital landing page",
  },
  {
    index: "[02]",
    slug: "hospital-mgmt-wiki",
    title: "Hospital Management System — WikiJS",
    description:
      "Operator + clinician documentation for the hospital build. Workflows, screenshots, troubleshooting — searchable, versioned, kept next to the system it documents.",
    tags: ["wiki.js", "markdown", "docs"],
    status: "live",
    hosting: "self-hosted",
    url: "https://wiki-hospital.buildbyred.dev/",
    glyph: "HW",
    thumbLabel: "hospital-wiki.png · 16:9 placeholder",
    thumbSrc: "/projects/hospital-wiki.png",
    thumbAlt: "Hospital Management System Wiki.js home page",
  },
  {
    index: "[03]",
    slug: "school-mgmt",
    title: "School Management System",
    description:
      "Enrollment, grading, scheduling, and finance for schools. Re-uses lessons from the hospital build to ship a tighter admin UX.",
    tags: ["odoo/19", "python", "owl.js"],
    status: "live",
    hosting: "self-hosted",
    url: "https://school.buildbyred.dev/",
    glyph: "§",
    thumbLabel: "school.png · 16:9 placeholder",
    thumbSrc: "/projects/school.png",
    thumbAlt: "Camadin School portal landing page",
  },
  {
    index: "[04]",
    slug: "school-mgmt-wiki",
    title: "School Management System — WikiJS",
    description:
      "Documentation companion for the school system — admin walkthroughs, registrar SOPs, and changelog entries that stay close to the code.",
    tags: ["wiki.js", "markdown", "docs"],
    status: "live",
    hosting: "self-hosted",
    url: "https://wiki-school.buildbyred.dev/",
    glyph: "§W",
    thumbLabel: "school-wiki.png · 16:9 placeholder",
    thumbSrc: "/projects/school-wiki.png",
    thumbAlt: "School Management System Wiki.js home page",
  },
  {
    index: "[05]",
    slug: "my-blog",
    title: "My Blog",
    description:
      "Self-hosted single-author publication — MDX posts authored from an admin console, drawer-style previews via intercepted routes, plus likes, bookmarks, and comments backed by libsql + Drizzle.",
    tags: ["next.js", "mdx", "libsql", "drizzle", "auth.js"],
    status: "live",
    hosting: "self-hosted",
    url: "https://blog.buildbyred.dev/",
    glyph: "✎",
    thumbLabel: "blog.png · 16:9 placeholder",
    thumbSrc: "/projects/blog.png",
    thumbAlt: "blog index with article cards and drawer-style post preview",
  },
  {
    index: "[06]",
    slug: "baby-grey",
    title: "Baby Grey's Website",
    description:
      "A small site for a small human. Personal project — slowly turning into the front door for everything I host on baby-grey.click.",
    tags: ["next.js", "typescript"],
    status: "live",
    hosting: "self-hosted",
    url: "https://baby-grey.click",
    glyph: "♥",
    thumbLabel: "baby-grey.png · 16:9 placeholder",
    thumbSrc: "/projects/baby-grey.png",
    thumbAlt: "Baby Grey's Website hero with portrait and intro copy",
  },
  {
    index: "[07]",
    slug: "typingspeed",
    title: "TypingSpeed",
    description:
      "A minimal, distraction-free typing tester. WPM tracking, custom texts, a dashboard of historical runs.",
    tags: ["next.js", "typescript", "react"],
    status: "building",
    hosting: "cloud",
    url: "#",
    glyph: ">_",
    thumbLabel: "typingspeed.png · 16:9 placeholder",
  },
  {
    index: "[08]",
    slug: "storytelling",
    title: "StoryTelling",
    description:
      "A small writing + reading app — branching chapters, collaborative edits, a reading mode built for long-form text.",
    tags: ["next.js", "typescript", "tailwind"],
    status: "building",
    hosting: "cloud",
    url: "#",
    glyph: "¶",
    thumbLabel: "storytelling.png · 16:9 placeholder",
  },
  {
    index: "[09]",
    slug: "skydodger",
    title: "SkyDodger",
    description:
      "An arcade-style canvas game built for fun. Reflex training disguised as a coffee break.",
    tags: ["next.js", "canvas", "game"],
    status: "building",
    hosting: "cloud",
    url: "#",
    glyph: "▲",
    thumbLabel: "skydodger.png · 16:9 placeholder",
  },
  {
    index: "[10]",
    slug: "reactiontime",
    title: "ReactionTime",
    description:
      "A reaction-time tester with leaderboards and per-session graphs. Tiny app, tight feedback loop.",
    tags: ["next.js", "typescript", "chart.js"],
    status: "building",
    hosting: "cloud",
    url: "#",
    glyph: "⚡",
    thumbLabel: "reactiontime.png · 16:9 placeholder",
  },
  {
    index: "[11]",
    slug: "pos-system",
    title: "POS System",
    description:
      "Offline-first point-of-sale across mobile and web. React Native + Expo on the device (BLE thermal printers, WatermelonDB local store) and a Next.js admin dashboard, both syncing through a shared tRPC + WebSocket layer.",
    tags: ["react-native", "expo", "next.js", "typescript", "trpc"],
    status: "building",
    hosting: "cloud",
    url: "#",
    glyph: "₱",
    thumbLabel: "pos.png · 16:9 placeholder",
  },
  {
    index: "[12]",
    slug: "ecommerce",
    title: "E-commerce",
    description:
      "Storefront + admin for a small online shop — Next.js front, Django REST Framework back with a PostgreSQL store, payments via PayMongo.",
    tags: ["next.js", "django", "drf", "paymongo"],
    status: "building",
    hosting: "cloud",
    url: "#",
    glyph: "⌘",
    thumbLabel: "ecommerce.png · 16:9 placeholder",
  },
];

export const ossRepos: OssRepo[] = [
  {
    owner: "OpenSPP",
    repo: "openspp",
    href: "https://github.com/OpenSPP",
    tagline: "public sector",
    body:
      "Social protection platform built on top of Odoo — registries, beneficiary management, and program delivery tooling used by governments.",
    heatmap: [0, 1, 2, 1, 0, 2, 3, 4, 3, 2, 0, 1, 2, 3, 2, 1, 0, 2, 3, 2],
    language: "Python",
    role: "contributor",
    footUrl: "github.com/OpenSPP",
  },
  {
    owner: "OpenG2P",
    repo: "openg2p-program",
    href: "https://github.com/OpenG2P/openg2p-program",
    tagline: "g2p rails",
    body:
      "Program management module for OpenG2P — the open stack for government-to-person payments. Fixes, features, and review cycles on a large shared codebase.",
    heatmap: [1, 2, 0, 1, 3, 2, 4, 2, 0, 1, 2, 3, 4, 3, 1, 0, 2, 3, 2, 1],
    language: "Python",
    role: "contributor",
    footUrl: "github.com/OpenG2P",
  },
];

// TODO: wire real values from homelab monitoring; static snapshot for now.
export const hostInfo: HostInfo = {
  name: "baby-grey.click",
  rows: [
    { label: "host", value: "headless mac mini m4 pro" },
    { label: "os", value: "macOS" },
    { label: "runtime", value: "docker compose" },
    { label: "proxy", value: "cloudflare tunnel" },
    { label: "auth", value: "keycloak sso" },
  ],
  gauges: [
    { label: "cpu", percent: 24 },
    { label: "ram", percent: 63 },
    { label: "disk", percent: 41 },
  ],
};

export const services: Service[] = [
  {
    name: "Keycloak",
    desc: "Single sign-on for every service below.",
    uptime: "up",
    port: ":8443",
    state: "up",
    href: "https://auth.baby-grey.click",
  },
  {
    name: "NextCloud",
    desc: "Files, calendar & contacts — my personal cloud.",
    uptime: "up",
    port: ":443",
    state: "up",
    href: "https://nextcloud.baby-grey.click",
  },
  {
    name: "OpenWebUI",
    desc: "Local LLM frontend — chat over my own models.",
    uptime: "up",
    port: ":8080",
    state: "up",
    href: "https://ai.baby-grey.click",
  },
  {
    name: "AnythingLLM",
    desc: "RAG over my notes & docs. Local vectors.",
    uptime: "up",
    port: ":3001",
    state: "up",
    href: "https://llm.baby-grey.click",
  },
  {
    name: "n8n",
    desc: "Workflow automation. Ties everything together.",
    uptime: "up",
    port: ":5678",
    state: "up",
    href: "https://n8n.baby-grey.click",
  },
  {
    name: "AppFlowy",
    desc: "Local-first notion alt. Still being wired up.",
    uptime: "wip",
    port: ":8000",
    state: "warn",
  },
  {
    name: "OpenClaw",
    desc: "Self-hosted dashboard for the homelab.",
    uptime: "up",
    port: ":443",
    state: "up",
    href: "https://claw.baby-grey.click/",
  },
];

export const nowUpdated = "Apr 2026";

export const nowItems: NowItem[] = [
  { leader: "Shipping", body: "a School Management System on Odoo 19 — enrollment + grading modules this month." },
  { leader: "Reading", body: "through Odoo 19 internals to understand the new ORM improvements." },
  { leader: "Tinkering", body: "with local LLM workflows — piping AnythingLLM into n8n to auto-tag my notes." },
  {
    leader: "Self-hosting",
    body:
      "Keycloak, NextCloud, OpenWebUI, AnythingLLM, and n8n behind Cloudflare Tunnel on baby-grey.click — single SSO across everything.",
  },
  { leader: "Open", body: "to interesting contract work — Odoo, Django, or anything self-hostable." },
];

export const nowSide: NowSideBlock[] = [
  { label: "// focus this week", value: "grading module", muted: "· 4/7 tasks done", percent: 57 },
  { label: "// listening", value: "lofi + keyboard clacks" },
  { label: "// last commit", value: "2h ago", muted: "· hospital-mgmt" },
  { label: "// coffee", value: "cup 2 of 3" },
];

export const contactLinks: ContactLink[] = [
  { label: "EMAIL", display: "redickbutay02@gmail.com", href: "mailto:redickbutay02@gmail.com" },
  { label: "GITHUB", display: "github.com/reichie020212", href: "https://github.com/reichie020212", external: true },
  {
    label: "LINKEDIN",
    display: "linkedin.com/in/redick-butay",
    href: "https://www.linkedin.com/in/redick-butay-705616139/",
    external: true,
  },
];

export const navLinks = [
  { href: "#about", label: "about" },
  { href: "#resume", label: "resume" },
  { href: "#contact", label: "contact" },
  { href: "#timeline", label: "timeline" },
  { href: "#stack", label: "stack" },
  { href: "#projects", label: "projects" },
  { href: "#oss", label: "oss" },
  { href: "#homelab", label: "homelab" },
  { href: "#now", label: "now" },
];

export const resumeMeta = {
  pdf: "/resume.pdf",
  preview: "/resume-preview.png",
  previewWidth: 1190,
  previewHeight: 1684,
  fileLabel: "resume.pdf · 479 KB · 2 pages",
  downloadAs: "Redick-Butay-Resume.pdf",
  updated: "Apr 2026",
} as const;
