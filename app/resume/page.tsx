import type { Metadata } from "next";
import { canonicalMetadata } from "@/lib/seo";

export const dynamic = "error";

export const metadata: Metadata = {
  title: "Data Analyst CV",
  description: "Download Charlie Pham's current Data Analyst CV.",
  ...canonicalMetadata("/resume"),
};

export default function ResumePage() {
  return (
    <main id="main" className="site-container page-shell">
      <p className="eyebrow">CV</p>
      <h1 className="display mt-4">Data Analyst CV</h1>
      <p className="text-muted mt-6 max-w-2xl text-xl">
        A focused CV covering data analysis, business intelligence, reporting
        automation and data engineering experience.
      </p>
      <a
        className="bg-accent text-on-accent hover:bg-accent-hover rounded-[var(--radius-control)] px-4 py-3 font-medium"
        href="/Charlie_Pham_CV.pdf"
        download
      >
        Download CV PDF
      </a>
    </main>
  );
}
