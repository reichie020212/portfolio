"use client";

// Full protocol (postMessage listeners + host wiring) lands in the next chunk.
// This stub renders the DOM node so layout is complete.
export function TweaksPanel() {
  return (
    <div className="tweaks" id="tweaks" role="region" aria-label="Tweaks">
      <span className="title">TWEAKS</span>
      <span className="sep" aria-hidden="true" />
      <span style={{ color: "var(--fg-dim)" }}>theme</span>
      <button type="button" id="twkDark" aria-pressed="true">
        dark
      </button>
      <button type="button" id="twkLight" aria-pressed="false">
        light
      </button>
    </div>
  );
}
