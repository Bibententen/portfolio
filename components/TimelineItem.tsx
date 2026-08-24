export function TimelineItem({
  company,
  role,
  dates,
  location,
  bullets,
}: Readonly<{
  company: string;
  role: string;
  dates: string;
  location?: string;
  bullets: readonly string[];
}>) {
  return (
    <article className="timeline-item border-border border-t py-6 first:border-t-0">
      <div className="mono text-muted text-sm">
        <p>{dates}</p>
        {location ? <p className="mt-1">{location}</p> : null}
      </div>
      <div>
        <h3 className="text-xl font-semibold">{role}</h3>
        <p className="text-muted mt-1">{company}</p>
        <ul className="text-muted mt-4 list-disc space-y-2 pl-5">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
