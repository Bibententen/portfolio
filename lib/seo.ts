import type { Metadata } from "next";
import { env } from "@/lib/env";
import type { Project } from "@/lib/mdx";

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, env.NEXT_PUBLIC_SITE_URL).toString();
}

export function canonicalMetadata(
  pathname: string,
): Pick<Metadata, "alternates"> {
  return { alternates: { canonical: absoluteUrl(pathname) } };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Duy (Charlie) Pham",
    alternateName: "Charlie Pham",
    jobTitle: "Data Analyst",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sydney",
      addressRegion: "NSW",
      addressCountry: "AU",
    },
    sameAs: [
      "https://linkedin.com/in/duy-pham-15722a1b9",
      "https://github.com/Bibententen",
    ],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Macquarie University" },
    knowsAbout: [
      "Python",
      "SQL",
      "Snowflake",
      "Neo4j",
      "Apache Spark",
      "Airflow",
      "Tableau",
      "Power BI",
      "Excel",
      "ETL",
    ],
    url: absoluteUrl("/"),
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.outcome,
    url: absoluteUrl(`/projects/${project.slug}`),
    sameAs: project.repo,
    keywords: project.tags.join(", "),
  };
}
