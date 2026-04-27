import { timeline } from "@/lib/content";
import { SectionHead } from "./SectionHead";

export function Timeline() {
  return (
    <section id="timeline" aria-labelledby="timeline-heading">
      <SectionHead
        idx="04"
        title="timeline"
        meta="git log --oneline --graph"
        headingId="timeline-heading"
      />

      <div className="timeline">
        {timeline.map((entry) => (
          <div key={entry.title + entry.years} className={entry.active ? "tl-item active" : "tl-item"}>
            <div className="when">
              <b>{entry.years}</b>
              <br />
              {entry.subtitle}
            </div>
            <div className="what">
              <h3>
                {entry.title}
                {entry.org && <span className="at"> {entry.org}</span>}
              </h3>
              <p>{entry.body}</p>
              <div className="tags">
                {entry.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
