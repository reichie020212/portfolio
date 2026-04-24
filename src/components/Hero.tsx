import { heroChips, heroFacts } from "@/lib/content";
import { Terminal } from "./Terminal";

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <div className="hero-grid">
        <div>
          <div className="prompt">
            <b>redick</b>
            <span>@</span>
            <i>homelab</i>
            :<span>~</span>$ whoami
          </div>
          <h1 id="hero-heading">
            Software
            <br />
            developer<span className="u">.</span>
            <span className="cursor" aria-hidden="true" />
          </h1>
          <p className="sub prose">
            I build line-of-business systems with <strong>Odoo</strong> and{" "}
            <strong>Django</strong>, then go home and break things on my headless server for fun. Shipping since 2018.
          </p>

          <dl className="kv">
            {heroFacts.map((f) => (
              <div key={f.label} style={{ display: "contents" }}>
                <dt>{f.label}</dt>
                <dd>
                  {f.value}
                  {f.muted && <span className="muted"> {f.muted}</span>}
                </dd>
              </div>
            ))}
            <dt>status</dt>
            <dd>
              <span style={{ color: "var(--ok)" }}>● available</span> for contract work
            </dd>
          </dl>

          <div className="chips">
            {heroChips.map((c) => (
              <span key={c.label} className={c.accent ? "tag accent" : "tag"}>
                {c.accent && <span className="dot" aria-hidden="true" />}
                {c.label}
              </span>
            ))}
          </div>
        </div>

        <Terminal />
      </div>
    </section>
  );
}
