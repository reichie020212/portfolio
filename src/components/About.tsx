import Image from "next/image";
import { facts } from "@/lib/content";
import { SectionHead } from "./SectionHead";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading">
      <SectionHead idx="01" title="about" meta="cat ~/about.md" headingId="about-heading" />

      <div className="about-grid">
        <div className="avatar">
          <span className="label2">redick.jpg</span>
          <div className="photo">
            <Image
              src="/redick.jpg"
              alt="Portrait of Redick Butay"
              width={346}
              height={346}
              sizes="(max-width: 780px) 232px, 232px"
              priority={false}
            />
          </div>
          <span className="label">346×346 · jpeg</span>
        </div>

        <div className="about-copy">
          <h3>
            Hi, I&apos;m Red<span className="sl">.</span>
          </h3>
          <p className="prose">
            Software developer since <strong>2018</strong>. I work mostly inside the{" "}
            <strong>Odoo</strong> ecosystem, building line-of-business systems — hospital records, school enrollment, social-protection registries — and translating the tangled workflows behind them into something a clerk can actually click through. <strong>Django</strong> for the bespoke pieces; <strong>PostgreSQL</strong> keeping it all honest.
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
