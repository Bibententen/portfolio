import { ImageResponse } from "next/og";

export const alt = "Duy (Charlie) Pham — Data Analyst";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#fbfcfd",
        color: "#191d22",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "72px",
      }}
    >
      <div
        style={{
          color: "#007c7d",
          display: "flex",
          fontFamily: "monospace",
          fontSize: 28,
        }}
      >
        Data Analyst
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: -3,
          }}
        >
          Duy (Charlie) Pham
        </div>
        <div style={{ color: "#58616b", display: "flex", fontSize: 30 }}>
          Messy operational data → pipelines, dashboards and models.
        </div>
      </div>
      <div
        style={{
          borderTop: "1px solid #dfe2e6",
          color: "#58616b",
          display: "flex",
          fontFamily: "monospace",
          fontSize: 22,
          paddingTop: 20,
        }}
      >
        Sydney, NSW · Full Australian work rights to March 2029
      </div>
    </div>,
    { ...size },
  );
}
