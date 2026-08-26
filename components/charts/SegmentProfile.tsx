// Server-rendered horizontal segment-comparison chart for cluster profiles.
// SVG only — no client JS, no dependencies.
// Data is looked up by string `id` (see lib/chart-data.ts).

import { segmentProfiles, type Segment } from "@/lib/chart-data";

export function SegmentProfile({
  id,
  title,
}: Readonly<{ id: string; title: string }>) {
  const segments: Segment[] = segmentProfiles[id] ?? [];
  if (segments.length === 0) return null;

  return (
    <figure className="border-border bg-surface my-8 rounded-[var(--radius-card)] border p-6">
      <figcaption className="text-sm font-medium">{title}</figcaption>
      <div className="mt-5 grid gap-6 sm:grid-cols-3">
        {segments.map((seg) => (
          <div
            key={seg.name}
            className={
              seg.highlight
                ? "border-accent rounded-[var(--radius-card)] border p-4"
                : "border-border rounded-[var(--radius-card)] border p-4"
            }
          >
            <p className="text-sm font-semibold">
              {seg.name}
              {seg.highlight ? (
                <span className="text-accent ml-2 text-xs font-medium">
                  target
                </span>
              ) : null}
            </p>
            <div className="mt-4 space-y-3">
              {seg.rows.map((r) => (
                <div key={r.label}>
                  <div className="text-muted flex justify-between text-xs">
                    <span>{r.label}</span>
                    <span className="tabular-nums">{r.value}</span>
                  </div>
                  <div className="border-border mt-1 h-2 overflow-hidden rounded-full border">
                    <div
                      className="bg-accent h-full rounded-full"
                      style={{ width: `${r.widthPct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}
