import { TechChip } from "@/components/TechChip";

export function SkillMatrix({
  groups,
}: Readonly<{ groups: readonly (readonly [string, readonly string[]])[] }>) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {groups.map(([group, skills]) => (
        <section key={group} aria-labelledby={`skill-${group}`}>
          <h3 id={`skill-${group}`} className="text-xl font-semibold">
            {group}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <TechChip key={skill}>{skill}</TechChip>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
