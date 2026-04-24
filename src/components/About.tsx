import { facts } from "@/lib/content";
import { SectionHead } from "./SectionHead";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading">
      <SectionHead idx="01" title="about" meta="cat ~/about.md" headingId="about-heading" />

      <div className="about-grid">
        <div
          className="avatar"
          role="img"
          aria-label="Placeholder avatar — drop a photo here"
          title="drop a photo here"
        >
          <span className="label2">avatar.png</span>
          <div className="pix">
            <div className="face" aria-hidden="true" />
            <div>[ photo goes here ]</div>
          </div>
          <span className="label">260×260 · placeholder</span>
        </div>

        <div className="about-copy">
          <h3>
            Hi, I&apos;m Red<span className="sl">.</span>
          </h3>
          <p className="prose">
            I&apos;ve been writing software since <strong>2018</strong>. My day job lives mostly inside the{" "}
            <strong>Odoo</strong> ecosystem — modeling messy business workflows into something a human can actually click through — with <strong>Django</strong> when I need something more bespoke.
          </p>
          <p className="prose" style={{ marginTop: 14 }}>
            Off the clock, I&apos;m a tech hobbyist. I keep a <strong>headless server</strong> humming at home and run a growing stack of self-hosted services on it. I like the part of this craft that&apos;s closer to gardening than to engineering: slowly shaping a system until it does exactly what you want, and nothing it shouldn&apos;t.
          </p>

          <div className="facts">
            {facts.map((f) => (
              <div key={f.label} className="fact">
                <div className="n">
                  <span className="u">{f.number}</span>
                  {f.suffix}
                </div>
                <div className="l">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
