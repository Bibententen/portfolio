import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ProjectSummary } from "@/lib/mdx";
import { TechChip } from "@/components/TechChip";

export function ProjectCard({
  project,
}: Readonly<{ project: ProjectSummary }>) {
  return (
    <article className="border-border bg-bg overflow-hidden rounded-[var(--radius-card)] border">
      {project.cover ? (
        <Image
          className="project-thumbnail-image"
          src={project.cover}
          alt={project.coverAlt ?? ""}
          width={1420}
          height={808}
        />
      ) : (
        <div className="project-thumbnail" aria-hidden="true">
          <span className="project-thumbnail-bar" />
          <span className="project-thumbnail-bar project-thumbnail-bar-short" />
          <span className="project-thumbnail-dot" />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl leading-tight font-semibold">
            {project.title}
          </h3>
          <ArrowUpRight
            aria-hidden="true"
            className="text-accent mt-1 shrink-0"
            size={20}
            strokeWidth={1.8}
          />
        </div>
        <p className="text-muted mt-3">{project.outcome}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <TechChip key={tag}>{tag}</TechChip>
          ))}
        </div>
        <Link
          className="text-link mt-5 inline-flex"
          href={`/projects/${project.slug}`}
        >
          Read case study
          <span className="sr-only">: {project.title}</span>
        </Link>
      </div>
    </article>
  );
}
