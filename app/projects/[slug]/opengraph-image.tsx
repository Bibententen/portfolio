import { ImageResponse } from "next/og";
import { getAllProjects } from "@/lib/mdx";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type OpenGraphProps = Readonly<{ params: Promise<{ slug: string }> }>;

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpenGraphImage({
  params,
}: OpenGraphProps) {
  const { slug } = await params;
  const project = getAllProjects().find((item) => item.slug === slug);
  const title = project?.title ?? "Project case study";
  const outcome =
    project?.outcome ?? "Data analysis, modelling and engineering work.";

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
        Case study
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            fontSize: 60,
            fontWeight: 600,
            letterSpacing: -2,
          }}
        >
          {title}
        </div>
        <div style={{ color: "#58616b", display: "flex", fontSize: 28 }}>
          {outcome}
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
        Duy (Charlie) Pham · Data Analyst
      </div>
    </div>,
    { ...size },
  );
}
