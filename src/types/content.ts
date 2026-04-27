export type HeatLevel = 0 | 1 | 2 | 3 | 4;
export type ProjectStatus = "live" | "building";
export type ProjectHosting = "self-hosted" | "cloud";
export type ServiceState = "up" | "warn" | "off";

export interface HeroFact {
  label: string;
  value: string;
  muted?: string;
}

export interface TimelineEntry {
  years: string;
  subtitle: string;
  title: string;
  org?: string;
  body: string;
  tags: string[];
  active?: boolean;
}

export interface StackItem {
  name: string;
  years: string;
  level: number;
}

export interface StackColumn {
  heading: string;
  items: StackItem[];
}

export interface Project {
  index: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  hosting: ProjectHosting;
  /** Public URL of the project. Use "#" or omit for projects with no live URL yet. */
  url?: string;
  glyph: string;
  thumbLabel: string;
}

export interface OssRepo {
  owner: string;
  repo: string;
  href: string;
  tagline: string;
  body: string;
  heatmap: HeatLevel[];
  language: string;
  role: string;
  footUrl: string;
}

export interface HostRow {
  label: string;
  value: string;
}

export interface HostGauge {
  label: string;
  percent: number;
}

export interface HostInfo {
  name: string;
  rows: HostRow[];
  gauges: HostGauge[];
}

export interface Service {
  name: string;
  desc: string;
  uptime: string;
  port: string;
  state: ServiceState;
  /** Public URL — when set, the service name links out. */
  href?: string;
}

export interface NowItem {
  leader: string;
  body: string;
}

export interface NowSideBlock {
  label: string;
  value: string;
  muted?: string;
  percent?: number;
}

export interface ContactLink {
  label: string;
  display: string;
  href: string;
  external?: boolean;
  disabled?: boolean;
}
