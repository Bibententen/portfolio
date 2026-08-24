import Link from "next/link";
import { Hero } from "@/components/Hero";
import { MetricStat } from "@/components/MetricStat";
import { ProjectCard } from "@/components/ProjectCard";
import { TechChip } from "@/components/TechChip";
import { TimelineItem } from "@/components/TimelineItem";
import { experience, homeSkills, profile } from "@/content/profile";
import { getAllProjects } from "@/lib/mdx";

export const dynamic = "error";

export default function HomePage() {
  const projects = getAllProjects()
    .filter((project) => project.featured)
    .slice(0, 3);
  const currentRole = experience[0];

  return (
    <main id="main" className="site-container page-shell">
      <Hero />

      <section className="section-space" aria-labelledby="metrics-heading">
        <h2 id="metrics-heading" className="sr-only">
          Selected metrics
        </h2>
        <div className="divide-border border-border grid divide-y overflow-hidden rounded-[var(--radius-card)] border md:grid-cols-3 md:divide-x md:divide-y-0">
          <MetricStat
            number="95%"
            label="of manual billing activity automated at Cisco"
          />
          <MetricStat
            number="30"
            label="Cisco accounts brought into the automated workflow"
          />
          <MetricStat
            number="3rd / 20"
            label="Kaggle competition ranking, Melbourne rental model"
          />
        </div>
      </section>

      <section
        className="section-space"
        aria-labelledby="selected-work-heading"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="selected-work-heading" className="heading-2 mt-2">
              Evidence over claims
            </h2>
          </div>
          <Link className="text-link" href="/projects">
            View all projects →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section
        className="section-space border-border border-y py-6"
        aria-labelledby="skills-heading"
      >
        <div className="flex flex-wrap items-center gap-2">
          <h2 id="skills-heading" className="sr-only">
            Top skills
          </h2>
          {homeSkills.map((skill) => (
            <TechChip key={skill}>{skill}</TechChip>
          ))}
        </div>
      </section>

      <section
        className="section-space"
        aria-labelledby="experience-preview-heading"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Experience</p>
            <h2 id="experience-preview-heading" className="heading-2 mt-2">
              Current role
            </h2>
          </div>
          <Link className="text-link" href="/about">
            Full history →
          </Link>
        </div>
        <div className="mt-6">
          <TimelineItem {...currentRole} />
        </div>
      </section>

      <section className="section-space" aria-labelledby="closing-heading">
        <div className="border-border bg-surface rounded-[var(--radius-card)] border p-6 md:p-8">
          <h2 id="closing-heading" className="heading-2">
            I am open to data analyst roles across Australia or remote.
          </h2>
          <div className="text-link mt-5 flex flex-wrap gap-x-5 gap-y-2">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.linkedin}>LinkedIn</a>
            <a href={profile.github}>GitHub</a>
          </div>
        </div>
      </section>
    </main>
  );
}
