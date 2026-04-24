import { nowItems, nowSide, nowUpdated } from "@/lib/content";
import { SectionHead } from "./SectionHead";

export function Now() {
  return (
    <section id="now" aria-labelledby="now-heading">
      <SectionHead
        idx="07"
        title="now"
        meta="what i'm up to · inspired by /now"
        headingId="now-heading"
      />

      <div className="now-card">
        <div>
          <h3>Currently</h3>
          <div className="upd">last updated · {nowUpdated}</div>
          <ul className="now-list">
            {nowItems.map((item) => (
              <li key={item.leader}>
                <span className="bul" aria-hidden="true">
                  ▸
                </span>
                <span>
                  <b>{item.leader}</b> {item.body}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <aside className="now-side" aria-label="Side stats">
          {nowSide.map((block) => (
            <div key={block.label}>
              <div className="lbl">{block.label}</div>
              <div className="val">
                {block.value}
                {block.muted && <span className="muted"> {block.muted}</span>}
              </div>
              {typeof block.percent === "number" && (
                <div className="track" aria-hidden="true">
                  <i style={{ width: `${block.percent}%` }} />
                </div>
              )}
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
