import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectGrid } from "@/components/ProjectGrid";
import { getAllProjects, type ProjectSummary } from "@/lib/mdx";
import { canonicalMetadata } from "@/lib/seo";

export const dynamic = "error";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Data analysis, machine learning, big data and dashboard projects by Duy (Charlie) Pham.",
  ...canonicalMetadata("/projects"),
};

function toSummary(project: ProjectSummary): ProjectSummary {
  return project;
}

export default function ProjectsPage() {
  const projects = getAllProjects().map(toSummary);
  const tags = [...new Set(projects.flatMap((project) => project.tags))];

  return (
    <main id="main" className="site-container page-shell">
      <header>
        <p className="eyebrow">Projects</p>
        <h1 className="display mt-4">Work built to answer a question</h1>
        <p className="text-muted mt-6 max-w-2xl text-xl">
          A selection of modelling, data processing, segmentation and dashboard
          work.
        </p>
      </header>
      <section className="section-space" aria-labelledby="project-list-heading">
        <h2 id="project-list-heading" className="sr-only">
          Project list and filters
        </h2>
        <Suspense
          fallback={<p className="text-muted">Loading project filters…</p>}
        >
          <ProjectGrid projects={projects} tags={tags} />
        </Suspense>
      </section>
    </main>
  );
}
