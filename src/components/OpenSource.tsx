import { ossRepos } from "@/lib/content";
import { SectionHead } from "./SectionHead";

const LEVEL_CLASS = ["", "l1", "l2", "l3", "l4"] as const;

export function OpenSource() {
  return (
    <section id="oss" aria-labelledby="oss-heading">
      <SectionHead
        idx="05"
        title="open-source"
        meta="git log --author=redick"
        headingId="oss-heading"
      />

      <div className="oss-grid">
        {ossRepos.map((r) => (
          <a key={r.repo} className="oss" href={r.href} target="_blank" rel="noopener noreferrer">
            <div className="oss-top">
              <div className="repo">
                <span className="owner">{r.owner}</span>
                <span className="slash">/</span>
                {r.repo}
              </div>
              <div className="stars">
                <span>
                  <b>★</b> {r.tagline}
                </span>
              </div>
            </div>
            <p>{r.body}</p>
            <div className="commits" title="contribution heatmap (illustrative)" aria-hidden="true">
              {r.heatmap.map((level, idx) => {
                const cls = LEVEL_CLASS[level];
                return <i key={idx} className={cls || undefined} />;
              })}
            </div>
            <div className="foot">
              <span>Language: {r.language}</span>
              <span>·</span>
              <span>Role: {r.role}</span>
              <span>·</span>
              <span>{r.footUrl}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
