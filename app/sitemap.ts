import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/mdx";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/about", "/projects", "/contact", "/resume"].map(
    (pathname) => ({
      url: absoluteUrl(pathname),
      changeFrequency: "monthly" as const,
    }),
  );
  const projectRoutes = getAllProjects().map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    changeFrequency: "yearly" as const,
  }));
  return [...staticRoutes, ...projectRoutes];
}
