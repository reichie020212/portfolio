import type {
  BlogPost,
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
  { label: "stack", value: "Odoo · Django · Next.js · PostgreSQL" },
  { label: "location", value: "Philippines", muted: "// UTC+8" },
];

export const heroChips = [
  { label: "open to work", accent: true as const },
  { label: "odoo/19" },
  { label: "django" },
  { label: "next.js" },
  { label: "self-hosted" },
  { label: "open-source" },
];

export const facts = [
  { number: "8", suffix: "+", label: "years shipping" },
  { number: "2", suffix: "", label: "oss contributions" },
  { number: "8", suffix: "", label: "services self-hosted" },
];

export const timeline: TimelineEntry[] = [
  {
    years: "2024 → now",
    subtitle: "present",
    title: "Software Developer",
    org: "@ current role",
    body:
      "Leading Odoo 19 implementations — hospital + school management systems, custom modules, data migrations. Running an on-prem server stack on the side.",
    tags: ["odoo/19", "postgres", "docker", "linux"],
    active: true,
  },
  {
    years: "2022 → 2024",
    subtitle: "oss era",
    title: "OpenSPP & OpenG2P contributor",
    body:
      "Contributed to social-protection platforms used by governments. Module work, bug hunts, review cycles on large Odoo codebases.",
    tags: ["odoo", "openspp", "openg2p"],
  },
  {
    years: "2020 → 2022",
    subtitle: "full-stack",
    title: "Django + Next.js builds",
    body:
      "Side projects like TypingSpeed and StoryTelling — learning how to ship a polished frontend on top of a backend I actually enjoyed writing.",
    tags: ["django", "next.js", "typescript"],
  },
  {
    years: "2018",
    subtitle: "day zero",
    title: "First real commits",
    body:
      "Started developing. Picked Python because it read like English and never really looked back.",
    tags: ["python", "curiosity"],
  },
];

export const stack: StackColumn[] = [
  {
    heading: "// core",
    items: [
      { name: "Python", years: "8y", level: 95 },
      { name: "Odoo", years: "6y", level: 90 },
      { name: "Django", years: "5y", level: 82 },
      { name: "PostgreSQL", years: "6y", level: 78 },
    ],
  },
  {
    heading: "// frontend",
    items: [
      { name: "TypeScript", years: "4y", level: 72 },
      { name: "Next.js", years: "3y", level: 68 },
      { name: "React", years: "4y", level: 70 },
      { name: "HTML / CSS", years: "8y", level: 85 },
    ],
  },
  {
    heading: "// infra",
    items: [
      { name: "Linux", years: "7y", level: 88 },
      { name: "Docker", years: "5y", level: 80 },
      { name: "Nginx / Caddy", years: "4y", level: 70 },
      { name: "Keycloak / SSO", years: "2y", level: 55 },
    ],
  },
  {
    heading: "// also",
    items: [
      { name: "n8n workflows", years: "2y", level: 60 },
      { name: "LLM tooling", years: "1y", level: 45 },
      { name: "Git", years: "8y", level: 90 },
      { name: "Vim / neovim", years: "5y", level: 70 },
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
    glyph: "+H",
    thumbLabel: "hospital.png · 16:9 placeholder",
  },
  {
    index: "[02]",
    slug: "school-mgmt",
    title: "School Management System",
    description:
      "Enrollment, grading, scheduling, and finance for schools. In active development — re-using lessons from the hospital build to ship a tighter admin UX.",
    tags: ["odoo/19", "python", "wip"],
    status: "building",
    glyph: "§",
    thumbLabel: "school.png · 16:9 placeholder",
  },
  {
    index: "[03]",
    slug: "typingspeed",
    title: "TypingSpeed",
    description:
      "A minimal, distraction-free typing tester. WPM tracking, custom texts, a dashboard of historical runs. Built to learn the Next.js app router properly.",
    tags: ["next.js", "typescript", "react"],
    status: "live",
    glyph: ">_",
    thumbLabel: "typingspeed.png · 16:9 placeholder",
  },
  {
    index: "[04]",
    slug: "storytelling",
    title: "StoryTelling",
    description:
      "A small writing + reading app — branching chapters, collaborative edits, a reading mode built for long-form text. My playground for Next.js + TS patterns.",
    tags: ["next.js", "typescript", "tailwind"],
    status: "live",
    glyph: "¶",
    thumbLabel: "storytelling.png · 16:9 placeholder",
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
  name: "homelab.local",
  rows: [
    { label: "host", value: "headless server" },
    { label: "os", value: "debian 12" },
    { label: "runtime", value: "docker compose" },
    { label: "proxy", value: "caddy · https" },
    { label: "auth", value: "keycloak sso" },
    { label: "uptime", value: "37d 4h" },
  ],
  gauges: [
    { label: "cpu", percent: 24 },
    { label: "ram", percent: 63 },
    { label: "disk", percent: 41 },
  ],
};

export const services: Service[] = [
  { name: "Nextcloud", desc: "Files, calendar & contacts — my personal cloud.", uptime: "up 12d", port: ":443", state: "up" },
  { name: "WikiJS", desc: "Personal wiki / second brain. Markdown-first.", uptime: "up 9d", port: ":3000", state: "up" },
  { name: "Hospital MS", desc: "Self-hosted staging for the Odoo build.", uptime: "up 2d", port: ":8069", state: "up" },
  { name: "OpenWebUI", desc: "Local LLM frontend — chat over my own models.", uptime: "up 5d", port: ":8080", state: "up" },
  { name: "AnythingLLM", desc: "RAG over my notes & docs. Local vectors.", uptime: "up 4d", port: ":3001", state: "up" },
  { name: "n8n", desc: "Workflow automation. Ties everything together.", uptime: "up 7d", port: ":5678", state: "up" },
  { name: "AppFlowy", desc: "Local-first notion alt. Sometimes flaky.", uptime: "up 1d", port: ":8000", state: "warn" },
  { name: "Keycloak", desc: "Single sign-on for every service above.", uptime: "up 37d", port: ":8443", state: "up" },
];

export const nowUpdated = "Apr 2026";

export const nowItems: NowItem[] = [
  { leader: "Shipping", body: "a School Management System on Odoo 19 — enrollment + grading modules this month." },
  { leader: "Reading", body: "through Odoo 19 internals to understand the new ORM improvements." },
  { leader: "Tinkering", body: "with local LLM workflows — piping AnythingLLM into n8n to auto-tag my notes." },
  { leader: "Refactoring", body: "my Caddyfile so every homelab service gets a real TLS cert instead of self-signed." },
  { leader: "Open", body: "to interesting contract work — Odoo, Django, or anything self-hostable." },
];

export const nowSide: NowSideBlock[] = [
  { label: "// focus this week", value: "grading module", muted: "· 4/7 tasks done", percent: 57 },
  { label: "// listening", value: "lofi + keyboard clacks" },
  { label: "// last commit", value: "2h ago", muted: "· hospital-mgmt" },
  { label: "// coffee", value: "cup 2 of 3" },
];

export const posts: BlogPost[] = [
  { date: "2026 · 03 · 14", tag: "[odoo]", title: "Shipping an Odoo 19 module without losing your weekend", readTime: "8 min", href: "#" },
  { date: "2026 · 02 · 02", tag: "[homelab]", title: "One Caddyfile to rule them all: TLS for every service", readTime: "6 min", href: "#" },
  { date: "2025 · 11 · 22", tag: "[llm]", title: "RAG over my wiki, without sending my notes to the cloud", readTime: "11 min", href: "#" },
  { date: "2025 · 09 · 05", tag: "[django]", title: "Why I still reach for Django first, in an AI-assisted world", readTime: "7 min", href: "#" },
  { date: "2025 · 06 · 17", tag: "[oss]", title: "Contributing to OpenSPP — what I learned reviewing giant PRs", readTime: "9 min", href: "#" },
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
  { label: "SIGNAL", display: "on request", href: "#", disabled: true },
];

export const navLinks = [
  { href: "#about", label: "about" },
  { href: "#timeline", label: "timeline" },
  { href: "#stack", label: "stack" },
  { href: "#projects", label: "projects" },
  { href: "#oss", label: "oss" },
  { href: "#homelab", label: "homelab" },
  { href: "#now", label: "now" },
  { href: "#blog", label: "blog" },
  { href: "#contact", label: "contact" },
];
