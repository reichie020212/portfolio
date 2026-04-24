import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2a2b31",
          color: "#d9534b",
          fontFamily:
            'ui-monospace, "SF Mono", "Menlo", "Consolas", monospace',
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: -1,
        }}
      >
        R
      </div>
    ),
    size,
  );
}
