import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Redick Butay — Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#2a2b31";
const FG = "#ebe9e6";
const DIM = "#9a958f";
const ACCENT = "#d9534b";
const OK = "#7ac07a";
const LINE = "#3d3f46";

const MONO =
  'ui-monospace, "SF Mono", "Menlo", "Consolas", monospace';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: BG,
          color: FG,
          fontFamily: MONO,
          padding: "64px 80px",
          justifyContent: "space-between",
        }}
      >
        {/* header row */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: DIM }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, background: OK, display: "flex" }} />
          <span>redick.butay</span>
          <div style={{ display: "flex", marginLeft: "auto", fontSize: 22, color: DIM }}>
            <span>~/portfolio</span>
          </div>
        </div>

        {/* main block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 30, color: DIM }}>
            <span style={{ color: OK }}>red</span>
            <span>@</span>
            <span style={{ color: ACCENT }}>homelab</span>
            <span>:~$</span>
            <span style={{ color: FG }}>whoami</span>
          </div>
          <div style={{ display: "flex", fontSize: 104, letterSpacing: -2, lineHeight: 1.02 }}>
            <span>Software</span>
          </div>
          <div style={{ display: "flex", fontSize: 104, letterSpacing: -2, lineHeight: 1.02 }}>
            <span>developer</span>
            <span style={{ color: ACCENT }}>.</span>
          </div>
        </div>

        {/* footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            color: DIM,
            borderTop: `1px solid ${LINE}`,
            paddingTop: 18,
          }}
        >
          <span>Odoo</span>
          <span style={{ color: LINE }}>·</span>
          <span>Django</span>
          <span style={{ color: LINE }}>·</span>
          <span>Next.js</span>
          <span style={{ color: LINE }}>·</span>
          <span>self-hosted</span>
          <span style={{ marginLeft: "auto", color: FG }}>Redick Butay</span>
        </div>
      </div>
    ),
    size,
  );
}
