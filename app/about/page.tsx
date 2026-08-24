import type { Metadata } from "next";
import { Prose } from "@/components/Prose";
import { SkillMatrix } from "@/components/SkillMatrix";
import { TimelineItem } from "@/components/TimelineItem";
import {
  certifications,
  education,
  experience,
  skillGroups,
} from "@/content/profile";
import { canonicalMetadata } from "@/lib/seo";

export const dynamic = "error";

export const metadata: Metadata = {
  title: "About",
  description:
    "Experience, education, certifications and skills for Duy (Charlie) Pham.",
  ...canonicalMetadata("/about"),
};

export default function AboutPage() {
  return (
    <main id="main" className="site-container page-shell">
      <header>
        <p className="eyebrow">About</p>
        <h1 className="display mt-4">About</h1>
      </header>

      <Prose className="section-space">
        <p>
          I am a Sydney-based data analyst. Most of my day-to-day is the
          unglamorous half of analytics: pulling data out of databases and flat
          files with SQL and Python, working out why two sources disagree, and
          turning a vague business question into something a query can actually
          answer. At Cisco I have spent the last year automating billing and
          invoice processing that used to be done by hand across 30 accounts.
        </p>
        <p>
          Before that I worked on a Neo4j graph migration at FPT Information
          Systems, built demand-clustering models for supply chain planning, and
          ran operational reporting for LG Electronics&apos; logistics team. I
          hold a Master of Business Analytics from Macquarie University. I am
          looking for data analyst roles across Australia or remote.
        </p>
      </Prose>

      <section
        className="section-space border-border bg-surface rounded-[var(--radius-card)] border p-6 md:p-8"
        aria-labelledby="work-rights-heading"
      >
        <p className="eyebrow">Work rights</p>
        <h2 id="work-rights-heading" className="heading-2 mt-2">
          Ready to work in Australia
        </h2>
        <p className="text-muted mt-4 max-w-2xl">
          Temporary Graduate visa (subclass 485). Unrestricted Australian work
          rights until 12 March 2029. No immediate sponsorship required to
          start; open to employer sponsorship for the longer term.
        </p>
      </section>

      <section className="section-space" aria-labelledby="experience-heading">
        <p className="eyebrow">Experience</p>
        <h2 id="experience-heading" className="heading-2 mt-2">
          Work history
        </h2>
        <div className="mt-6">
          {experience.map((item) => (
            <TimelineItem key={`${item.company}-${item.dates}`} {...item} />
          ))}
        </div>
      </section>

      <section className="section-space" aria-labelledby="education-heading">
        <p className="eyebrow">Education</p>
        <h2 id="education-heading" className="heading-2 mt-2">
          Formal study
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {education.map((item) => (
            <article
              className="border-border rounded-[var(--radius-card)] border p-5"
              key={item.qualification}
            >
              <h3 className="text-xl font-semibold">{item.qualification}</h3>
              <p className="text-muted mt-2">{item.institution}</p>
              <p className="mono text-muted mt-4 text-sm">{item.dates}</p>
              <p className="text-accent mt-3 font-medium">{item.result}</p>
              {item.detail ? (
                <p className="text-muted mt-3 text-sm">{item.detail}</p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section
        className="section-space"
        aria-labelledby="certifications-heading"
      >
        <p className="eyebrow">Certifications</p>
        <h2 id="certifications-heading" className="heading-2 mt-2">
          Continuing learning
        </h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-3">
          {certifications.map((certification) => (
            <li
              className="border-border rounded-[var(--radius-card)] border p-5"
              key={certification.name}
            >
              <h3 className="font-semibold">{certification.name}</h3>
              <p className="text-muted mt-2">{certification.issuer}</p>
              <p className="mono text-muted mt-4 text-sm">
                {certification.date}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="section-space"
        aria-labelledby="skills-matrix-heading"
      >
        <p className="eyebrow">Skills</p>
        <h2 id="skills-matrix-heading" className="heading-2 mt-2">
          Tools and practice
        </h2>
        <div className="mt-6">
          <SkillMatrix groups={skillGroups} />
        </div>
      </section>
    </main>
  );
}
