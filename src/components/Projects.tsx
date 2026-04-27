import { projects } from "@/lib/content";
import type { Project } from "@/types/content";
import { SectionHead } from "./SectionHead";

function hostingLabel(hosting: Project["hosting"]): string {
  return hosting === "self-hosted" ? "self-hosted" : "cloud";
}

function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading">
      <SectionHead
        idx="06"
        title="projects"
        meta="ls ~/projects | head"
        headingId="projects-heading"
      />

      <div className="proj-grid">
        {projects.map((p) => {
          const hasUrl = Boolean(p.url) && p.url !== "#";
          return (
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
                {hasUrl ? (
                  <a
                    className="proj-link"
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ↗ {displayUrl(p.url!)}
                  </a>
                ) : (
                  <span className="proj-link muted">
                    {"// no live url yet"}
                  </span>
                )}
                <div className="tags">
                  <span
                    className={
                      p.hosting === "self-hosted" ? "tag accent" : "tag"
                    }
                  >
                    {hostingLabel(p.hosting)}
                  </span>
                  {p.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
