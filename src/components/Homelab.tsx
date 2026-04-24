import { hostInfo, services } from "@/lib/content";
import type { ServiceState } from "@/types/content";
import { SectionHead } from "./SectionHead";

function svcClass(state: ServiceState): string {
  if (state === "warn") return "svc warn";
  if (state === "off") return "svc off";
  return "svc";
}

export function Homelab() {
  return (
    <section id="homelab" aria-labelledby="homelab-heading">
      <SectionHead
        idx="06"
        title="homelab"
        meta="systemctl --user list-units --state=running"
      />
      <h2 id="homelab-heading" style={{ position: "absolute", left: "-9999px" }}>
        Homelab
      </h2>

      <div className="lab-wrap">
        <aside className="lab-host" aria-label="Host overview">
          <h3>
            <span className="dot" aria-hidden="true" />
            {hostInfo.name}
          </h3>
          <dl>
            {hostInfo.rows.map((row) => (
              <div key={row.label} style={{ display: "contents" }}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
          <div className="gauges">
            {hostInfo.gauges.map((g) => (
              <div key={g.label} className="g">
                <div className="row">
                  <span>{g.label}</span>
                  <span>{g.percent}%</span>
                </div>
                <div className="bar">
                  <i style={{ width: `${g.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div className="lab-services">
          {services.map((s) => (
            <div key={s.name} className={svcClass(s.state)}>
              <div className="name">
                <span className="dot" aria-hidden="true" />
                {s.name}
              </div>
              <div className="desc">{s.desc}</div>
              <div className="meta">
                <span className="up">● {s.uptime}</span>
                <span>{s.port}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
