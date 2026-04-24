"use client";

/**
 * Stub shell. Boot sequence, CMDS map, history, tab-completion, hint
 * buttons, and keyboard shortcuts are wired in the next chunk.
 */
export function Terminal() {
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
        <div className="term-body" id="termBody" aria-live="polite" />
        <form className="term-input" id="termForm" autoComplete="off">
          <span className="ps">red@homelab</span>
          <span style={{ color: "var(--fg-dimmer)" }}>:</span>
          <span style={{ color: "var(--fg-dim)" }}>~</span>
          <span className="caret">❯</span>
          <input
            id="termInput"
            autoComplete="off"
            spellCheck={false}
            aria-label="terminal input"
            placeholder="type 'help' and hit enter…"
          />
        </form>
      </div>
      <div className="hints">
        <button type="button" data-cmd="help">help</button>
        <button type="button" data-cmd="projects">projects</button>
        <button type="button" data-cmd="oss">oss</button>
        <button type="button" data-cmd="homelab">homelab</button>
        <button type="button" data-cmd="now">now</button>
        <button type="button" data-cmd="contact">contact</button>
        <button type="button" data-cmd="theme">theme</button>
        <button type="button" data-cmd="clear">clear</button>
      </div>
    </div>
  );
}
