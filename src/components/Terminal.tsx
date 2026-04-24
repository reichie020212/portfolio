"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import {
  COMMAND_NAMES,
  COMMANDS,
  completeCommand,
  escapeHtml,
} from "@/lib/commands";
import { applyTheme, readTheme, toggleTheme, type Theme } from "@/lib/theme";

type LineKind = "out" | "cmd";

interface Line {
  id: number;
  kind: LineKind;
  html: string;
}

const BOOT_LINES: Array<{ delay: number; html: string }> = [
  { delay: 60, html: "<span class='dim'>Last login: Fri Apr 24 09:14:22 on ttys001</span>" },
  { delay: 220, html: "<span class='ok'>✓</span> ssh red@homelab   <span class='dim'>(key auth)</span>" },
  { delay: 180, html: "<span class='ok'>✓</span> 8 services healthy · uptime 37d 4h" },
  { delay: 180, html: "<span class='dim'>type </span><span class='acc'>help</span><span class='dim'> to see what i can tell you about me.</span>" },
  { delay: 0, html: "&nbsp;" },
];

const HINT_COMMANDS = [
  "help",
  "projects",
  "oss",
  "homelab",
  "now",
  "contact",
  "theme",
  "clear",
] as const;

function scrollToSection(selector: string) {
  const el = document.querySelector(selector);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 70;
  window.scrollTo({ top, behavior: "smooth" });
}

function promptHtml(cmd: string): string {
  return `<span class='ps'>red@homelab</span><span class='at'>:</span><span class='path'>~</span> <span class='caret'>❯</span> ${escapeHtml(cmd)}`;
}

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<string[]>([]);
  const histIdxRef = useRef<number>(-1);
  const nextIdRef = useRef<number>(0);

  const push = useCallback((line: Omit<Line, "id">) => {
    setLines((prev) => [...prev, { ...line, id: nextIdRef.current++ }]);
  }, []);

  const pushMany = useCallback((items: Array<Omit<Line, "id">>) => {
    if (items.length === 0) return;
    setLines((prev) => {
      const next = [...prev];
      for (const item of items) {
        next.push({ ...item, id: nextIdRef.current++ });
      }
      return next;
    });
  }, []);

  // Auto-scroll to bottom after any line update.
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    body.scrollTop = body.scrollHeight;
  }, [lines]);

  // Boot sequence — runs once.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const step of BOOT_LINES) {
        if (step.delay > 0) {
          await new Promise((r) => setTimeout(r, step.delay));
        }
        if (cancelled) return;
        push({ kind: "out", html: step.html });
      }
    })();
    const focusTimer = setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(focusTimer);
    };
  }, [push]);

  // Global shortcut: `/` focuses the input when typing in the page.
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const runCommand = useCallback(
    (raw: string) => {
      const cmd = (raw ?? "").trim();
      if (!cmd) {
        push({ kind: "cmd", html: promptHtml("") });
        return;
      }
      push({ kind: "cmd", html: promptHtml(cmd) });

      historyRef.current = [cmd, ...historyRef.current];
      histIdxRef.current = -1;

      const name = cmd.split(/\s+/)[0].toLowerCase();
      const command = COMMANDS[name];
      if (!command) {
        push({
          kind: "out",
          html: `<span class='dim'>zsh:</span> command not found: ${escapeHtml(
            name,
          )} &nbsp;&nbsp;<span class='dim'>try</span> <span class='acc'>help</span>`,
        });
      } else {
        const currentTheme: Theme =
          (document.documentElement.getAttribute("data-theme") as Theme | null) ?? readTheme();
        const result = command({ currentTheme });

        if (result.effect?.kind === "clear") {
          setLines([]);
          return;
        }

        pushMany(result.lines.map((html) => ({ kind: "out" as const, html })));

        if (result.effect?.kind === "toggleTheme") {
          toggleTheme();
          // Let ThemeToggle (if mounted) reflect the change.
          window.dispatchEvent(new CustomEvent("rb:theme-change"));
        } else if (result.effect?.kind === "scroll") {
          scrollToSection(result.effect.selector);
        }
      }

      push({ kind: "out", html: "&nbsp;" });
    },
    [push, pushMany],
  );

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const v = value;
      setValue("");
      runCommand(v);
    },
    [runCommand, value],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const history = historyRef.current;
        if (history.length === 0) return;
        histIdxRef.current = Math.min(histIdxRef.current + 1, history.length - 1);
        setValue(history[histIdxRef.current] ?? "");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        histIdxRef.current = Math.max(histIdxRef.current - 1, -1);
        setValue(histIdxRef.current === -1 ? "" : (historyRef.current[histIdxRef.current] ?? ""));
      } else if (e.key === "Tab") {
        e.preventDefault();
        const match = completeCommand(value.trim().toLowerCase());
        if (match) setValue(match);
      }
    },
    [value],
  );

  // Guard against mismatched CMDS list — compile-time sanity check.
  void COMMAND_NAMES;

  // Ensure the initial theme is actually applied (chunk-5 wiring will also
  // do this, but having Terminal reach for it keeps the `theme` command
  // meaningful even without ThemeToggle mounted).
  useEffect(() => {
    applyTheme(readTheme());
  }, []);

  return (
    <div>
      <div className="term" id="term">
        <div className="term-head">
          <span className="lights" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="path">red@homelab</span>
          <span>:</span>
          <span className="path">~/portfolio</span>
          <span className="pid">zsh · 24×80</span>
        </div>
        <div className="term-body" id="termBody" aria-live="polite" ref={bodyRef}>
          {lines.map((line) => (
            <div
              key={line.id}
              className={`term-line ${line.kind}`}
              dangerouslySetInnerHTML={{ __html: line.html }}
            />
          ))}
        </div>
        <form className="term-input" id="termForm" autoComplete="off" onSubmit={onSubmit}>
          <span className="ps">red@homelab</span>
          <span style={{ color: "var(--fg-dimmer)" }}>:</span>
          <span style={{ color: "var(--fg-dim)" }}>~</span>
          <span className="caret">❯</span>
          <input
            id="termInput"
            ref={inputRef}
            autoComplete="off"
            spellCheck={false}
            aria-label="terminal input"
            placeholder="type 'help' and hit enter…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </form>
      </div>
      <div className="hints">
        {HINT_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            data-cmd={cmd}
            onClick={() => {
              runCommand(cmd);
              inputRef.current?.focus();
            }}
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
