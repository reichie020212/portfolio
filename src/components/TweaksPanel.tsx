"use client";

import { useEffect, useState } from "react";
import { applyTheme, readTheme, type Theme } from "@/lib/theme";

interface MessageData {
  type?: string;
}

function isMessageData(d: unknown): d is MessageData {
  return typeof d === "object" && d !== null && "type" in (d as Record<string, unknown>);
}

function postToHost(msg: unknown): void {
  try {
    window.parent.postMessage(msg, "*");
  } catch {}
}

export function TweaksPanel() {
  const [visible, setVisible] = useState(false);
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    setThemeState(readTheme());

    const onMessage = (e: MessageEvent) => {
      if (!isMessageData(e.data)) return;
      if (e.data.type === "__activate_edit_mode") setVisible(true);
      else if (e.data.type === "__deactivate_edit_mode") setVisible(false);
    };
    window.addEventListener("message", onMessage);

    const onExternalTheme = () => {
      const current =
        (document.documentElement.getAttribute("data-theme") as Theme | null) ?? "dark";
      setThemeState(current);
    };
    window.addEventListener("rb:theme-change", onExternalTheme);

    postToHost({ type: "__edit_mode_available" });

    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("rb:theme-change", onExternalTheme);
    };
  }, []);

  const pick = (next: Theme) => {
    applyTheme(next);
    setThemeState(next);
    postToHost({ type: "__edit_mode_set_keys", edits: { theme: next } });
    window.dispatchEvent(new CustomEvent("rb:theme-change"));
  };

  return (
    <div
      className={visible ? "tweaks on" : "tweaks"}
      id="tweaks"
      role="region"
      aria-label="Tweaks"
    >
      <span className="title">TWEAKS</span>
      <span className="sep" aria-hidden="true" />
      <span style={{ color: "var(--fg-dim)" }}>theme</span>
      <button
        type="button"
        id="twkDark"
        aria-pressed={theme === "dark"}
        onClick={() => pick("dark")}
      >
        dark
      </button>
      <button
        type="button"
        id="twkLight"
        aria-pressed={theme === "light"}
        onClick={() => pick("light")}
      >
        light
      </button>
    </div>
  );
}
