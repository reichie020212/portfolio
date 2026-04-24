import { stack } from "@/lib/content";
import { SectionHead } from "./SectionHead";

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-heading">
      <SectionHead idx="03" title="stack" meta="~/.config/toolbelt" headingId="stack-heading" />

      <div className="stack-grid">
        {stack.map((col) => (
          <div key={col.heading} className="stack-col">
            <h3>{col.heading}</h3>
            <ul>
              {col.items.map((item) => (
                <li key={item.name}>
                  <span>{item.name}</span>
                  <span className="yr">{item.years}</span>
                  <span className="bar">
                    <i style={{ width: `${item.level}%` }} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
