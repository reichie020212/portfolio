import type { Theme } from "@/lib/theme";

export type CommandEffect =
  | { kind: "clear" }
  | { kind: "scroll"; selector: string }
  | { kind: "toggleTheme" };

export interface CommandInput {
  currentTheme: Theme;
}

export interface CommandOutput {
  lines: string[];
  effect?: CommandEffect;
}

export type Command = (input: CommandInput) => CommandOutput;

export function escapeHtml(s: string): string {
  return String(s).replace(/[&<>]/g, (c) => {
    switch (c) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      default:
        return c;
    }
  });
}

function projectsOutput(): string[] {
  return [
    "<b>~/projects</b>",
    "&nbsp; [01] <span class='acc'>hospital-mgmt</span>        Odoo 19              <span class='ok'>● live</span>     <span class='dim'>self-hosted</span>",
    "&nbsp; [02] <span class='acc'>hospital-mgmt-wiki</span>   Wiki.js              <span class='ok'>● live</span>     <span class='dim'>self-hosted</span>",
    "&nbsp; [03] <span class='acc'>school-mgmt</span>          Odoo 19              <span class='ok'>● live</span>     <span class='dim'>self-hosted</span>",
    "&nbsp; [04] <span class='acc'>school-mgmt-wiki</span>     Wiki.js              <span class='ok'>● live</span>     <span class='dim'>self-hosted</span>",
    "&nbsp; [05] <span class='acc'>my-blog</span>              Markdown · static    <span class='ok'>● live</span>     <span class='dim'>self-hosted</span>",
    "&nbsp; [06] <span class='acc'>baby-grey</span>            Next.js + TS         <span class='ok'>● live</span>     <span class='dim'>self-hosted</span>",
    "&nbsp; [07] <span class='acc'>typingspeed</span>          Next.js + TS         <span style='color:var(--warn)'>● building</span> <span class='dim'>cloud</span>",
    "&nbsp; [08] <span class='acc'>storytelling</span>         Next.js + TS         <span style='color:var(--warn)'>● building</span> <span class='dim'>cloud</span>",
    "&nbsp; [09] <span class='acc'>skydodger</span>            Next.js + canvas     <span style='color:var(--warn)'>● building</span> <span class='dim'>cloud</span>",
    "&nbsp; [10] <span class='acc'>reactiontime</span>         Next.js + TS         <span style='color:var(--warn)'>● building</span> <span class='dim'>cloud</span>",
    "&nbsp; [11] <span class='acc'>pos-system</span>           Expo + Next.js       <span style='color:var(--warn)'>● building</span> <span class='dim'>cloud</span>",
    "&nbsp; [12] <span class='acc'>ecommerce</span>            Next.js + DRF        <span style='color:var(--warn)'>● building</span> <span class='dim'>cloud</span>",
  ];
}

export const COMMANDS: Record<string, Command> = {
  help: () => ({
    lines: [
      "<b>available commands</b>",
      "&nbsp; <span class='acc'>help</span>        this list",
      "&nbsp; <span class='acc'>about</span>       who i am",
      "&nbsp; <span class='acc'>projects</span>    things i've built",
      "&nbsp; <span class='acc'>oss</span>         open-source work",
      "&nbsp; <span class='acc'>stack</span>       tools i use",
      "&nbsp; <span class='acc'>homelab</span>     running services",
      "&nbsp; <span class='acc'>now</span>         what i'm currently doing",
      "&nbsp; <span class='acc'>resume</span>      view / download my resume",
      "&nbsp; <span class='acc'>blog</span>        link to my writing",
      "&nbsp; <span class='acc'>contact</span>     how to reach me",
      "&nbsp; <span class='acc'>theme</span>       toggle dark/light",
      "&nbsp; <span class='acc'>clear</span>       clear the screen",
      "&nbsp; <span class='dim'>(hint: tab/↑↓ for history)</span>",
    ],
  }),

  about: () => ({
    lines: [
      'name     Redick "Red" Butay',
      "role     Software Developer",
      "since    2018",
      "stack    Odoo · Django · Next.js · React · PostgreSQL",
      "bio      <span class='dim'>builds line-of-business systems by day,",
      "         tinkers with a headless mac mini by night.</span>",
    ],
  }),

  projects: () => ({
    lines: projectsOutput(),
    effect: { kind: "scroll", selector: "#projects" },
  }),

  oss: () => ({
    lines: [
      "<b>open-source contributions</b>",
      "&nbsp; <span class='acc'>OpenSPP/openspp</span>             social protection platform (Odoo)",
      "&nbsp; <span class='acc'>OpenG2P/openg2p-program</span>     g2p program management module",
    ],
    effect: { kind: "scroll", selector: "#oss" },
  }),

  stack: () => ({
    lines: [
      "core      python · odoo (v15-v19) · django · postgres",
      "front     typescript · next.js · react · angular",
      "infra     linux · docker · nginx · git",
      "cloud     aws · cloudflare · mailpit · let's encrypt",
      "also      n8n · llm · keycloak · gis",
    ],
    effect: { kind: "scroll", selector: "#stack" },
  }),

  homelab: () => ({
    lines: [
      "<b>baby-grey.click</b> · headless mac mini m4 pro · docker compose",
      "services: <span class='acc'>keycloak</span> nextcloud openwebui anythingllm n8n appflowy openclaw",
      "cpu: 24%   ram: 63%   disk: 41%",
    ],
    effect: { kind: "scroll", selector: "#homelab" },
  }),

  now: () => ({
    lines: [
      "currently shipping a school mgmt system · reading odoo 19 internals",
      "self-hosting keycloak/nextcloud/owui/anythingllm/n8n · open to contract work",
    ],
    effect: { kind: "scroll", selector: "#now" },
  }),

  resume: () => ({
    lines: [
      "<b>resume</b>",
      "&nbsp; <a href='/resume.pdf' target='_blank' rel='noopener noreferrer'>↗ open resume.pdf</a>",
      "&nbsp; <a href='/resume.pdf' download='Redick-Butay-Resume.pdf'>↓ download (479 KB · 2 pages)</a>",
    ],
    effect: { kind: "scroll", selector: "#resume" },
  }),

  blog: () => ({
    lines: [
      "<span class='dim'>my blog lives on a separate site.</span>",
      "&nbsp; <span class='acc'>→ blog url: placeholder (coming soon)</span>",
    ],
  }),

  contact: () => ({
    lines: [
      "email    <a href='mailto:redickbutay02@gmail.com'>redickbutay02@gmail.com</a>",
      "github   <a href='https://github.com/reichie020212' target='_blank' rel='noopener noreferrer'>github.com/reichie020212</a>",
      "linkedin <a href='https://www.linkedin.com/in/redick-butay-705616139/' target='_blank' rel='noopener noreferrer'>linkedin.com/in/redick-butay</a>",
    ],
    effect: { kind: "scroll", selector: "#contact" },
  }),

  theme: ({ currentTheme }) => {
    const next: Theme = currentTheme === "dark" ? "light" : "dark";
    return {
      lines: [`theme → <span class='acc'>${next}</span>`],
      effect: { kind: "toggleTheme" },
    };
  },

  clear: () => ({ lines: [], effect: { kind: "clear" } }),

  ls: () => ({
    lines: projectsOutput(),
    effect: { kind: "scroll", selector: "#projects" },
  }),

  whoami: () => ({ lines: ["red"] }),
  pwd: () => ({ lines: ["/home/red/portfolio"] }),
  date: () => ({ lines: [new Date().toString()] }),
  sudo: () => ({
    lines: [
      "<span class='acc'>nice try.</span> redick is not in the sudoers file. this incident will be reported.",
    ],
  }),
  exit: () => ({
    lines: ["<span class='dim'>detaching session…</span> (just kidding, scroll down)"],
  }),
};

export const COMMAND_NAMES: readonly string[] = Object.keys(COMMANDS);

export function completeCommand(prefix: string): string | null {
  if (!prefix) return null;
  const match = COMMAND_NAMES.find((k) => k.startsWith(prefix));
  return match ?? null;
}
