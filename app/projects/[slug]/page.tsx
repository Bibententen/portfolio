import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Prose } from "@/components/Prose";
import { TechChip } from "@/components/TechChip";
import { mdxComponents } from "@/lib/mdx-components";
import { getAllProjects } from "@/lib/mdx";
import { canonicalMetadata, projectJsonLd } from "@/lib/seo";

export const dynamic = "error";

type ProjectPageProps = Readonly<{ params: Promise<{ slug: string }> }>;

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getAllProjects().find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.outcome,
    ...canonicalMetadata(`/projects/${project.slug}`),
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getAllProjects().find((item) => item.slug === slug);
  if (!project) notFound();

  const projects = getAllProjects();
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = index > 0 ? projects[index - 1] : undefined;
  const next = index < projects.length - 1 ? projects[index + 1] : undefined;

  return (
    <main id="main" className="site-container page-shell">
      <header className="max-w-3xl">
        <p className="eyebrow">Case study</p>
        <h1 className="display mt-4">{project.title}</h1>
        <p className="text-muted mt-5 text-xl">{project.outcome}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <TechChip key={item}>{item}</TechChip>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            className="bg-accent text-on-accent hover:bg-accent-hover rounded-[var(--radius-control)] px-4 py-3 font-medium"
            href={project.repo}
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
          </a>
          {project.notebook ? (
            <a
              className="border-border hover:bg-surface rounded-[var(--radius-control)] border px-4 py-3 font-medium"
              href={`${project.repo}/${encodeURIComponent(project.notebook)}`}
              target="_blank"
              rel="noreferrer"
            >
              Open notebook
            </a>
          ) : null}
        </div>
      </header>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectJsonLd(project)),
        }}
      />

      <section className="section-space" aria-labelledby="glance-heading">
        <h2 id="glance-heading" className="heading-2">
          At a glance
        </h2>
        <dl className="border-border mt-6 grid overflow-hidden rounded-[var(--radius-card)] border sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-border border-b p-5 sm:border-r lg:border-b-0">
            <dt className="mono text-muted text-sm">Problem type</dt>
            <dd className="mt-3 font-medium">{project.glance.problemType}</dd>
          </div>
          <div className="border-border border-b p-5 lg:border-r lg:border-b-0">
            <dt className="mono text-muted text-sm">Dataset</dt>
            <dd className="mt-3 font-medium">{project.glance.dataset}</dd>
          </div>
          <div className="border-border border-b p-5 sm:border-r sm:border-b-0 lg:border-r">
            <dt className="mono text-muted text-sm">Best model / tool</dt>
            <dd className="mt-3 font-medium">{project.glance.bestModel}</dd>
          </div>
          <div className="p-5">
            <dt className="mono text-muted text-sm">Headline</dt>
            <dd className="mt-3 font-medium">{project.glance.headline}</dd>
          </div>
        </dl>
      </section>

      {project.cover ? (
        <figure className="section-space project-figure">
          <Image
            src={project.cover}
            alt={project.coverAlt ?? ""}
            width={1420}
            height={808}
          />
          <figcaption className="mono text-muted mt-3 text-sm">
            {project.coverAlt}
          </figcaption>
        </figure>
      ) : null}

      <Prose className="section-space">
        <MDXRemote source={project.content} components={mdxComponents} />
      </Prose>

      <nav
        className="section-space border-border grid gap-4 border-t pt-6 sm:grid-cols-2"
        aria-label="Project navigation"
      >
        {previous ? (
          <Link
            className="border-border hover:bg-surface rounded-[var(--radius-card)] border p-5"
            href={`/projects/${previous.slug}`}
          >
            <span className="mono text-muted text-sm">Previous project</span>
            <span className="mt-2 block font-medium">{previous.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            className="border-border hover:bg-surface rounded-[var(--radius-card)] border p-5 text-left sm:text-right"
            href={`/projects/${next.slug}`}
          >
            <span className="mono text-muted text-sm">Next project</span>
            <span className="mt-2 block font-medium">{next.title}</span>
          </Link>
        ) : null}
      </nav>
    </main>
  );
}
