import { projects } from "@/lib/content";
import { SectionHead } from "./SectionHead";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading">
      <SectionHead
        idx="04"
        title="projects"
        meta="ls ~/projects | head"
        headingId="projects-heading"
      />

      <div className="proj-grid">
        {projects.map((p) => (
          <article key={p.slug} className="proj">
            <div className="proj-head">
              <span className="idx">{p.index}</span>
              <span>{p.slug}</span>
              <span className={p.status === "building" ? "status building" : "status"}>
                <span className="dot" aria-hidden="true" />
                {p.status === "building" ? "building" : "live"}
              </span>
            </div>
            <div
              className="proj-thumb"
              role="img"
              aria-label={`${p.title} thumbnail placeholder`}
            >
              <div className="glyph" aria-hidden="true">
                {p.glyph}
              </div>
              <span className="label">{p.thumbLabel}</span>
            </div>
            <div className="proj-body">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="tags">
                {p.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
