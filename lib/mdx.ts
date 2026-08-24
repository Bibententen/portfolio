import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  projectFrontmatterSchema,
  type ProjectFrontmatter,
} from "@/content/schema";

const projectDirectory = path.join(process.cwd(), "content", "projects");
const projectOrder = [
  "melbourne-rental-prediction",
  "customer-clustering",
  "prostate-cancer-classification",
  "tweet-text-pipeline",
  "coffee-sales-excel",
] as const;

export type Project = ProjectFrontmatter & { content: string };
export type ProjectSummary = Omit<Project, "content">;

function readProjectFile(filename: string): Project {
  const source = fs.readFileSync(path.join(projectDirectory, filename), "utf8");
  const parsed = matter(source);
  const frontmatter = projectFrontmatterSchema.parse(parsed.data);
  const expectedSlug = filename.replace(/\.mdx$/, "");
  if (frontmatter.slug !== expectedSlug) {
    throw new Error(
      `Project slug ${frontmatter.slug} does not match filename ${expectedSlug}.mdx`,
    );
  }
  return { ...frontmatter, content: parsed.content.trim() };
}

export function getAllProjects(): Project[] {
  const files = fs
    .readdirSync(projectDirectory)
    .filter((file) => file.endsWith(".mdx"));
  const projects = files.map(readProjectFile);
  return projects.sort(
    (a, b) =>
      projectOrder.indexOf(a.slug as (typeof projectOrder)[number]) -
      projectOrder.indexOf(b.slug as (typeof projectOrder)[number]),
  );
}

export function getProjectBySlug(slug: string): Project {
  const project = getAllProjects().find((item) => item.slug === slug);
  if (!project) throw new Error(`Project not found: ${slug}`);
  return project;
}
