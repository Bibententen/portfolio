"use client";

// Client island: filter state and its shareable query string live in the browser.
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState, useSyncExternalStore } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import type { ProjectSummary } from "@/lib/mdx";

function tagKey(tag: string) {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function subscribeToUrl(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

function readUrl() {
  return window.location.search;
}

export function ProjectGrid({
  projects,
  tags,
}: Readonly<{ projects: readonly ProjectSummary[]; tags: readonly string[] }>) {
  const router = useRouter();
  const queryString = useSyncExternalStore(subscribeToUrl, readUrl, () => "");
  const querySelected = useMemo(
    () => new Set(new URLSearchParams(queryString).getAll("tag")),
    [queryString],
  );
  const [selectedOverride, setSelectedOverride] = useState<
    readonly string[] | null
  >(null);
  const selected = useMemo(
    () => new Set(selectedOverride ?? querySelected),
    [querySelected, selectedOverride],
  );

  const filteredProjects = useMemo(() => {
    if (selected.size === 0) return projects;
    return projects.filter((project) =>
      project.tags.some((tag) => selected.has(tagKey(tag))),
    );
  }, [projects, selected]);

  function toggleTag(tag: string) {
    const key = tagKey(tag);
    const next = new Set(selected);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    const params = new URLSearchParams(queryString);
    params.delete("tag");
    [...next].forEach((value) => params.append("tag", value));
    const query = params.toString();
    setSelectedOverride([...next]);
    router.replace(query ? `/projects?${query}` : "/projects", {
      scroll: false,
    });
  }

  function clearFilters() {
    setSelectedOverride([]);
    router.replace("/projects", { scroll: false });
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2" aria-label="Project filters">
        {tags.map((tag) => {
          const active = selected.has(tagKey(tag));
          return (
            <button
              key={tag}
              type="button"
              className={`inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] border px-3 py-2 text-sm ${active ? "border-accent bg-accent text-on-accent" : "border-border bg-bg text-muted hover:bg-surface hover:text-text"}`}
              aria-pressed={active}
              onClick={() => toggleTag(tag)}
            >
              {active ? (
                <Check aria-hidden="true" size={16} strokeWidth={2.2} />
              ) : null}
              {tag}
            </button>
          );
        })}
      </div>

      {filteredProjects.length > 0 ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="border-border bg-surface mt-8 rounded-[var(--radius-card)] border p-6">
          <p>No projects match that combination — clear filters</p>
          <button
            className="text-link mt-3"
            type="button"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
