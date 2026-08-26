// Server-rendered bar chart. SVG only — no client JS, no dependencies.
// Colours come from the design tokens via CSS variables so dark mode works.
// Data is looked up by string `id` (see lib/chart-data.ts) because MDX props
// in this pipeline only reliably pass strings and booleans.

import { barCharts, type BarDatum } from "@/lib/chart-data";

export function BarChart({
  id,
  title,
  unit = "",
}: Readonly<{ id: string; title: string; unit?: string }>) {
  const data: BarDatum[] = barCharts[id] ?? [];
  const width = 640;
  const height = 320;
  const padLeft = 72;
  const padBottom = 48;
  const padTop = 24;
  const padRight = 24;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;
  const max = Math.max(...data.map((d) => d.value), 1);
  const barW = Math.min(64, (plotW / data.length) * 0.62);

  if (data.length === 0) return null;

  return (
    <figure className="border-border bg-surface my-8 rounded-[var(--radius-card)] border p-6">
      <figcaption className="text-sm font-medium">{title}</figcaption>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={title}
        className="mt-4 h-auto w-full"
      >
        {/* gridlines */}
        {[0, 0.25, 0.5, 0.75, 1].map((f) => {
          const y = padTop + plotH * (1 - f);
          return (
            <g key={f}>
              <line
                x1={padLeft}
                y1={y}
                x2={width - padRight}
                y2={y}
                stroke="var(--color-border)"
                strokeWidth="1"
              />
              <text
                x={padLeft - 8}
                y={y + 4}
                textAnchor="end"
                className="fill-[var(--color-muted)] text-[11px]"
              >
                {(max * f).toFixed(0)}
              </text>
            </g>
          );
        })}
        {/* bars */}
        {data.map((d, i) => {
          const h = (d.value / max) * plotH;
          const x =
            padLeft +
            (plotW / data.length) * i +
            (plotW / data.length - barW) / 2;
          const y = padTop + plotH - h;
          return (
            <g key={d.label}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={h}
                rx="4"
                fill={
                  d.highlight ? "var(--color-accent)" : "var(--color-muted)"
                }
                opacity={d.highlight ? 0.9 : 0.35}
              />
              <text
                x={x + barW / 2}
                y={y - 6}
                textAnchor="middle"
                className="fill-[var(--color-text)] text-[12px] font-medium"
              >
                {d.valueLabel}
                {unit}
              </text>
              <text
                x={x + barW / 2}
                y={height - padBottom + 20}
                textAnchor="middle"
                className="fill-[var(--color-muted)] text-[11px]"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
